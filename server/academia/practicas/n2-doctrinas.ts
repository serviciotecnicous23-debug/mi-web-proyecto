/**
 * Las prácticas de la materia Doctrinas fundamentales (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-doctrinas.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: cada posición sigue la lección palabra por palabra. En los cinco puntos que la declaración de fe
 * deja por confirmar (la perseverancia, las lenguas como señal, la sanidad en la expiación, el ministerio de la mujer y
 * el orden de los últimos tiempos) las prácticas solo piden reconocer las posiciones y que la del ministerio está por
 * confirmar: ninguna actividad da una de ellas por buena ni por mala.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_DOCTRINAS: PracticasMateria = {
  materia: "n2-doctrinas",
  mision: {
    titulo: "Las sanas palabras",
    intro: "Un amigo que acaba de creer te pide que le expliques lo que cree la iglesia: la Biblia, el Dios trino, Jesucristo, la salvación, el Espíritu Santo, la iglesia y la esperanza. Repasa las seis lecciones para tener cada respuesta lista, con fe y con amor.",
    cierre: "Ya puedes explicar las grandes verdades de la fe, artículo por artículo, y distinguir lo que todos creemos de los puntos que el ministerio todavía debe confirmar.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La Biblia y el Dios trino
    "n2-doctrinas-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quién inspiró toda la Escritura?", reverso: "Dios: toda la Escritura es inspirada por Él.", apoyo: "Toda la Escritura es inspirada por Dios" },
              { frente: "¿Cómo usó Dios a las personas que escribieron la Biblia?", reverso: "Con su estilo y su tiempo, pero el mensaje es suyo.", apoyo: "Dios usó a personas reales, con su estilo y su tiempo, pero el mensaje es suyo." },
              { frente: "¿Para qué es suficiente la Biblia?", reverso: "Para la fe y la conducta.", apoyo: "suficiente para la fe y la conducta" },
              { frente: "¿De qué es la Biblia la autoridad final?", reverso: "De todo lo que creemos y hacemos.", apoyo: "la autoridad final de todo lo que creemos y hacemos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué creemos que es la Biblia?", reverso: "La Palabra de Dios.", apoyo: "Creemos que la Biblia es la Palabra de Dios" },
              { frente: "¿En qué no tiene error la Biblia?", reverso: "En lo que enseña.", apoyo: "sin error en lo que enseña" },
              { frente: "¿Quién inspiró a los hombres de Dios que hablaron?", reverso: "El Espíritu Santo.", apoyo: "los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo" },
              { frente: "¿Para qué es útil toda la Escritura?", reverso: "Para enseñar, para redargüir, para corregir y para instruir en justicia.", apoyo: "útil para enseñar, para redargüir, para corregir, para instruir en justicia" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se une la Biblia con cada idea? Elige la relación de cada enlace.",
            nodos: [
              { id: "biblia", texto: "La Biblia", x: 50, y: 50 },
              { id: "dios", texto: "Dios", x: 50, y: 12 },
              { id: "ensena", texto: "Lo que enseña", x: 20, y: 88 },
              { id: "creemos", texto: "Lo que creemos y hacemos", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "biblia", a: "dios", relacion: "es inspirada por" },
              { de: "biblia", a: "ensena", relacion: "es sin error en" },
              { de: "biblia", a: "creemos", relacion: "es la autoridad final de" },
            ],
            distractores: ["tiene errores en", "es una opinión sobre"],
            apoyo: "Por eso es sin error en lo que enseña, suficiente para la fe y la conducta, y la autoridad final de todo lo que creemos y hacemos.",
            ref: "2 Timoteo 3:16-17",
            explica: "La Biblia es inspirada por Dios: por eso es sin error en lo que enseña y la autoridad final de todo lo que creemos y hacemos.",
          },
          {
            consigna: "¿Cómo nos llegó la Biblia? Elige la relación de cada enlace.",
            nodos: [
              { id: "personas", texto: "Personas reales", x: 25, y: 12 },
              { id: "espiritu", texto: "El Espíritu Santo", x: 75, y: 38 },
              { id: "mensaje", texto: "El mensaje de la Biblia", x: 25, y: 64 },
              { id: "dios", texto: "Dios", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "personas", a: "espiritu", relacion: "hablaron inspiradas por" },
              { de: "personas", a: "mensaje", relacion: "pusieron su estilo en" },
              { de: "mensaje", a: "dios", relacion: "viene de" },
            ],
            distractores: ["inventaron"],
            apoyo: "Dios usó a personas reales, con su estilo y su tiempo, pero el mensaje es suyo.",
            ref: "2 Pedro 1:20-21",
            explica: "Dios usó a personas reales, con su estilo y su tiempo, que hablaron inspiradas por el Espíritu Santo. Nadie inventó la Biblia: el mensaje es de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es lo que creemos sobre Dios o es un error? Lleva cada frase a su grupo.",
            grupos: ["Lo que creemos sobre Dios", "Un error sobre Dios"],
            frases: [
              { texto: "Hay un solo Dios verdadero", grupo: 0 },
              { texto: "Dios existe eternamente en tres personas", grupo: 0 },
              { texto: "El Padre, el Hijo y el Espíritu Santo son iguales en gloria", grupo: 0 },
              { texto: "El Padre, el Hijo y el Espíritu Santo son tres dioses", grupo: 1, explica: "No son tres dioses: hay un solo Dios verdadero." },
              { texto: "Dios es una sola persona que aparece de tres maneras", grupo: 1, explica: "No son tres maneras de aparecer de una misma persona: son tres personas." },
              { texto: "El Hijo tiene menos poder que el Padre", grupo: 1, explica: "Las tres personas son iguales en esencia, poder y gloria." },
            ],
            apoyo: "No son tres dioses ni tres maneras de aparecer de una misma persona: son el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria.",
            ref: "Deuteronomio 6:4; Mateo 28:19",
            explica: "Hay un solo Dios, que existe eternamente en tres personas iguales: el Padre, el Hijo y el Espíritu Santo.",
          },
          {
            consigna: "¿Lo enseña la Biblia sobre Dios o no lo enseña? Lleva cada frase a su grupo.",
            grupos: ["Lo enseña la Biblia sobre Dios", "No lo enseña la Biblia"],
            frases: [
              { texto: "Dios es eterno, santo y todopoderoso", grupo: 0 },
              { texto: "Dios es el Creador de todas las cosas", grupo: 0 },
              { texto: "Jesús mandó bautizar en el nombre del Padre, del Hijo y del Espíritu Santo", grupo: 0, explica: "Un solo nombre, tres personas." },
              { texto: "Hay muchos dioses verdaderos", grupo: 1, explica: "Israel confesaba cada día que Jehová uno es: hay un solo Dios verdadero." },
              { texto: "El Espíritu Santo es menor que el Padre y el Hijo", grupo: 1, explica: "Las tres personas son iguales en esencia, poder y gloria." },
              { texto: "El Padre, el Hijo y el Espíritu Santo son tres nombres de una sola persona", grupo: 1, explica: "No son tres maneras de aparecer de una misma persona: son tres personas." },
            ],
            apoyo: "Hay un solo Dios, eterno, santo y todopoderoso, Creador de todas las cosas.",
            ref: "Deuteronomio 6:4; Mateo 28:19; 2 Corintios 13:14",
            explica: "Hay un solo Dios verdadero, eterno y Creador, que existe en tres personas iguales: el Padre, el Hijo y el Espíritu Santo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Mateo 28:19",
            consigna: "Jesús mandó bautizar en un solo nombre. Toca las tres personas de ese nombre.",
            texto: "en el nombre del [[Padre]], y del [[Hijo]], y del [[Espíritu]] [[Santo]]",
            apoyo: "un solo nombre, tres personas",
            explica: "Jesús mandó bautizar en un solo nombre, el del Padre, del Hijo y del Espíritu Santo: un solo Dios en tres personas.",
          },
          {
            ref: "2 Corintios 13:14",
            consigna: "Pablo bendice con las tres personas. Toca el nombre de cada una.",
            texto: "La gracia del [[Señor]] [[Jesucristo]], el amor de [[Dios]], y la comunión del [[Espíritu]] [[Santo]]",
            apoyo: "Pablo bendice con las tres",
            explica: "En una sola bendición, Pablo nombra a las tres personas: el Señor Jesucristo, Dios y el Espíritu Santo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga de la iglesia te dice: Para mí la doctrina es lo de menos; lo que importa es amar a la gente.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: la doctrina solo divide, y con amar a la gente ya basta.", explica: "La doctrina no es un adorno ni se opone al amor: las sanas palabras se retienen con fe y con amor." },
              { texto: "No se oponen: Pablo pide retener las sanas palabras con fe y con amor.", bien: true, explica: "Une las dos cosas, como 2 Timoteo 1:13: las sanas palabras se retienen en la fe y el amor." },
              { texto: "Al revés: el amor es lo de menos, y lo que importa es saber doctrina.", explica: "Pablo no separa las dos cosas: la doctrina se retiene con fe y con amor." },
              { texto: "La doctrina es cosa de pastores; a los demás nos basta con ir a la iglesia.", explica: "Todo creyente tiene una teología: lo que cree sobre Dios guía cómo ora, cómo vive y cómo sirve." },
            ],
            apoyo: "La doctrina no es un adorno: son las sanas palabras que se retienen con fe y con amor.",
            ref: "2 Timoteo 1:13",
            explica: "La doctrina no es un adorno ni se opone al amor: las sanas palabras se retienen con fe y con amor.",
          },
          {
            caso: "Un compañero de trabajo te dice: Da igual lo que uno crea de Dios; lo que cuenta es ser buena persona.",
            pregunta: "¿Qué le respondes con respeto?",
            opciones: [
              { texto: "No da igual: lo que creemos de Dios guía cómo oramos, vivimos y servimos.", bien: true, explica: "Todo creyente tiene una teología: lo que cree sobre Dios guía cómo ora, cómo vive y cómo sirve." },
              { texto: "Tienes razón: lo que uno cree es algo privado y no cambia nada en la vida.", explica: "Lo que crees sobre Dios se nota en cómo vives: no se queda guardado." },
              { texto: "Si no crees lo mismo que yo, entonces no vale la pena que sigamos hablando.", explica: "Es una respuesta dura que cierra la puerta. Las sanas palabras se retienen con fe y con amor." },
              { texto: "Lo que uno cree importa solo el domingo; en el trabajo da lo mismo.", explica: "Lo que creemos sobre Dios guía toda la vida, también el trabajo." },
            ],
            apoyo: "lo que cree sobre Dios guía cómo ora, cómo vive y cómo sirve",
            ref: "2 Timoteo 1:13",
            explica: "La sana doctrina importa porque lo que creemos sobre Dios se nota en cómo vivimos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "la autoridad final de todo lo que creemos y hacemos",
            ref: "2 Timoteo 3:16-17",
            clave: {
              id: "pr-n2-doctrinas-1-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué la Biblia es la autoridad final de lo que creemos?",
              ideas: [
                { id: "palabra", peso: 50, texto: "Es la Palabra de Dios: toda la Escritura es inspirada por Dios.", formas: ["palabra de dios", "inspirad*", "dios (la|lo) inspiro"] },
                { id: "sin-error", peso: 50, texto: "Por eso es sin error en lo que enseña y suficiente para la fe y la conducta.", formas: ["sin error*", "no tiene error*", "no se equivoca", "suficiente", "no falla"] },
              ],
              modelo: "Porque la Biblia es la Palabra de Dios: toda la Escritura es inspirada por Dios. Por eso es sin error en lo que enseña y suficiente para la fe y la conducta.",
            },
          },
          {
            apoyo: "Dios usó a personas reales, con su estilo y su tiempo, pero el mensaje es suyo.",
            ref: "2 Pedro 1:20-21",
            clave: {
              id: "pr-n2-doctrinas-1-a6-2",
              tipo: "corta",
              pregunta: "¿Cómo puede ser la Biblia Palabra de Dios si la escribieron personas?",
              ideas: [
                { id: "personas", peso: 50, texto: "Dios usó a personas reales, con su estilo y su tiempo.", formas: ["personas reales", "us* a (personas|hombres)", "hombres de dios", "su estilo", "su tiempo"] },
                { id: "espiritu", peso: 50, texto: "Hablaron inspiradas por el Espíritu Santo: el mensaje es de Dios.", formas: ["inspirad*", "espiritu santo", "no (fue|vino) por voluntad humana", "no por voluntad humana"] },
              ],
              modelo: "Dios usó a personas reales, con su estilo y su tiempo, pero ellas hablaron inspiradas por el Espíritu Santo. Por eso el mensaje de la Biblia es de Dios y no de la voluntad humana.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Jesucristo, verdadero Dios y verdadero hombre
    "n2-doctrinas-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice Juan del Verbo en el principio?", reverso: "Que estaba con Dios y que era Dios.", apoyo: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios" },
              { frente: "¿Qué hizo el Verbo eterno, según Juan 1:14?", reverso: "Se hizo hombre y habitó entre nosotros.", apoyo: "Y ese Verbo eterno se hizo hombre" },
              { frente: "¿Cuántas personas es Jesucristo?", reverso: "Una sola: verdadero Dios y verdadero hombre.", apoyo: "Es verdadero Dios y verdadero hombre, en una sola persona." },
              { frente: "¿Por qué Jesús no es solo un buen maestro?", reverso: "Porque es Dios con nosotros.", apoyo: "Jesús no es solo un buen maestro: es Dios con nosotros." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De quién es Hijo eterno Jesucristo?", reverso: "De Dios: el Verbo era Dios.", apoyo: "Jesucristo es el Hijo eterno de Dios" },
              { frente: "¿Jesús fue solo un hombre muy bueno?", reverso: "No: es verdadero Dios y verdadero hombre.", apoyo: "Es verdadero Dios y verdadero hombre, en una sola persona." },
              { frente: "¿Qué quiere decir el nombre Emanuel?", reverso: "Dios con nosotros.", apoyo: "Emanuel, que traducido es: Dios con nosotros" },
              { frente: "¿Cuál es la pregunta más importante de la fe?", reverso: "La que Jesús hizo a sus discípulos: ¿quién decís que soy yo?", apoyo: "La pregunta más importante de la fe es la que Jesús hizo a sus discípulos" },
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
            consigna: "Sobre Jesucristo, Dios y hombre: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesucristo es verdadero Dios y verdadero hombre, en una sola persona.", verdad: true, explica: "Así lo dice el artículo 3: el Verbo era Dios y fue hecho carne.", apoyo: "Es verdadero Dios y verdadero hombre, en una sola persona.", ref: "Juan 1:1, 14" },
              { texto: "Jesús empezó a existir cuando nació de la virgen María.", verdad: false, explica: "Jesucristo es el Hijo eterno de Dios: en el principio ya era el Verbo, y el Verbo era Dios.", apoyo: "Jesucristo es el Hijo eterno de Dios", ref: "Juan 1:1" },
              { texto: "El Verbo eterno se hizo hombre y habitó entre nosotros.", verdad: true, explica: "Juan 1:14 lo dice: el Verbo fue hecho carne y habitó entre nosotros.", apoyo: "Y ese Verbo eterno se hizo hombre", ref: "Juan 1:14" },
            ],
          },
          {
            consigna: "Sobre Jesucristo, Dios y hombre: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús es dos personas: una que es Dios y otra que es hombre.", verdad: false, explica: "Jesucristo es verdadero Dios y verdadero hombre en una sola persona.", apoyo: "Es verdadero Dios y verdadero hombre, en una sola persona." },
              { texto: "Jesús solo parecía hombre, pero no lo era de verdad.", verdad: false, explica: "Jesús es verdadero hombre: el Verbo fue hecho carne y vivió como nosotros.", apoyo: "Verdadero hombre: el Verbo fue hecho carne.", ref: "Juan 1:14" },
              { texto: "Jesús no es solo un buen maestro: es Dios con nosotros.", verdad: true, explica: "Su nombre Emanuel dice quién es: Dios con nosotros.", apoyo: "Jesús no es solo un buen maestro: es Dios con nosotros.", ref: "Mateo 1:23" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena la obra de Jesucristo en el tiempo, de lo primero a lo último.",
            eventos: [
              { texto: "El Verbo era con Dios, y el Verbo era Dios", fecha: "En el principio" },
              { texto: "Fue concebido por el Espíritu Santo y nació de María", fecha: "Su nacimiento" },
              { texto: "Vivió sin pecado e hizo milagros", fecha: "Su vida en la tierra" },
              { texto: "Murió por nuestros pecados y fue sepultado", fecha: "Su muerte" },
              { texto: "Resucitó corporalmente", fecha: "Al tercer día" },
              { texto: "Subió al cielo y está a la diestra del Padre", fecha: "Después, hasta hoy" },
            ],
            apoyo: "Fue concebido por el Espíritu Santo y nació de la virgen María, vivió sin pecado, murió por nuestros pecados, resucitó corporalmente al tercer día, subió al cielo y está a la diestra del Padre, donde intercede por nosotros.",
            ref: "Juan 1:1, 14; 1 Corintios 15:3-4",
            explica: "El Hijo eterno ya era Dios en el principio; se hizo hombre, vivió sin pecado, murió, resucitó al tercer día y subió al cielo.",
          },
          {
            consigna: "Ordena lo que creemos de Jesucristo en el tiempo, de lo primero a lo último.",
            eventos: [
              { texto: "El Hijo eterno ya existía con Dios", fecha: "En el principio" },
              { texto: "El Verbo fue hecho carne y habitó entre nosotros", fecha: "Al hacerse hombre" },
              { texto: "Fue tentado como nosotros, pero no pecó", fecha: "Durante su vida" },
              { texto: "Murió en nuestro lugar", fecha: "En la cruz" },
              { texto: "Resucitó corporalmente", fecha: "Al tercer día" },
              { texto: "Intercede por nosotros a la diestra del Padre", fecha: "Hoy" },
            ],
            apoyo: "Murió en nuestro lugar y resucitó corporalmente. Después subió al cielo y está sentado a la diestra del Padre, donde intercede por nosotros.",
            ref: "Juan 1:14; Hebreos 4:15; 1 Corintios 15:3-4",
            explica: "El Hijo eterno se hizo hombre, vivió sin pecado, murió en nuestro lugar, resucitó al tercer día y hoy intercede por nosotros.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada verdad sobre Jesús con lo que la lección dice de ella.",
            pares: [
              ["Su concepción", "Por el Espíritu Santo, en la virgen María"],
              ["Su vida", "Tentado en todo como nosotros, pero sin pecado"],
              ["Su muerte", "Fue en nuestro lugar, por nuestros pecados"],
              ["Su resurrección", "Fue corporal, al tercer día"],
            ],
            apoyo: "Murió en nuestro lugar y resucitó corporalmente.",
            ref: "Mateo 1:20; Hebreos 4:15; 1 Corintios 15:3-4",
            explica: "Fue concebido por el Espíritu Santo, vivió sin pecado, murió en nuestro lugar y resucitó corporalmente al tercer día.",
          },
          {
            consigna: "Une cada verdad sobre Jesús con lo que la lección dice de ella.",
            pares: [
              ["Su nombre Jesús", "Dice su misión: salvará a su pueblo de sus pecados"],
              ["Su nombre Emanuel", "Dice quién es: Dios con nosotros"],
              ["Tentado en todo, pero sin pecado", "Puede compadecerse de nuestras debilidades"],
              ["El centro del evangelio", "Murió, fue sepultado y resucitó al tercer día"],
            ],
            apoyo: "Pablo resume el centro del evangelio",
            ref: "Mateo 1:21-23; Hebreos 4:15; 1 Corintios 15:3-4",
            explica: "Sus nombres dicen su misión y quién es; fue tentado sin pecar, por eso puede compadecerse de nuestras debilidades; y murió y resucitó por nosotros.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo de la iglesia te escribe: Estoy pasando por algo muy difícil y siento que nadie me entiende.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Jesús te entiende: fue tentado como nosotros, y hoy intercede por ti.", bien: true, explica: "Jesús puede compadecerse de nuestras debilidades y está a la diestra del Padre, donde intercede por nosotros." },
              { texto: "Jesús vivió hace mucho; hoy solo nos queda su ejemplo, no su ayuda.", explica: "Jesús resucitó y hoy intercede por nosotros: no solo nos dejó un ejemplo." },
              { texto: "Jesús nunca pasó por pruebas, así que no entiende lo que estás viviendo.", explica: "Jesús fue tentado en todo, como nosotros, pero sin pecado: por eso puede compadecerse." },
              { texto: "Jesús ya terminó su obra; hoy lo que hace por ti es esperar en el cielo.", explica: "Su muerte en nuestro lugar quedó hecha, y hoy intercede por nosotros a la diestra del Padre." },
            ],
            apoyo: "Después subió al cielo y está sentado a la diestra del Padre, donde intercede por nosotros.",
            ref: "Hebreos 4:15",
            explica: "Jesús puede compadecerse de nuestras debilidades, y hoy intercede por nosotros a la diestra del Padre.",
          },
          {
            caso: "Tu prima te dice: Jesús murió y resucitó hace mucho; ¿qué hace por nosotros ahora?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Está sentado a la diestra del Padre, y allí intercede por nosotros.", bien: true, explica: "Así lo dice la lección: subió al cielo y está a la diestra del Padre, donde intercede por nosotros." },
              { texto: "Nada: después de resucitar, Jesús ya no tiene que ver con nosotros.", explica: "Jesús resucitó, subió al cielo y hoy intercede por nosotros." },
              { texto: "Solo nos mira desde lejos; no podemos contar con Él hasta que vuelva.", explica: "No está lejos de nuestras luchas: intercede por nosotros y puede compadecerse de nuestras debilidades." },
              { texto: "Descansa: su obra se terminó en la cruz, y ahora solo espera allá.", explica: "Murió en nuestro lugar, y su obra sigue: hoy intercede por nosotros." },
            ],
            apoyo: "Subió al cielo y hoy intercede por nosotros.",
            explica: "Después de resucitar, Jesús subió al cielo y hoy intercede por nosotros a la diestra del Padre.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Es verdadero Dios y verdadero hombre, en una sola persona.",
            ref: "Juan 1:1, 14",
            clave: {
              id: "pr-n2-doctrinas-2-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que Jesucristo es verdadero Dios y verdadero hombre?",
              ideas: [
                { id: "dios", peso: 50, texto: "Es el Hijo eterno de Dios: en el principio el Verbo era Dios.", formas: ["verbo era dios", "el verbo era", "hijo eterno", "eterno", "en el principio", "emanuel"] },
                { id: "hombre", peso: 50, texto: "El Verbo fue hecho carne: nació de la virgen María y habitó entre nosotros.", formas: ["hecho carne", "se hizo (hombre|carne)", "naci* de la virgen", "naci* de maria", "virgen maria", "habito entre nosotros", "vivio como nosotros", "fue tentado"] },
              ],
              modelo: "Porque Jesucristo es el Hijo eterno de Dios: en el principio el Verbo era Dios. Y ese Verbo fue hecho carne: nació de la virgen María y habitó entre nosotros, en una sola persona.",
            },
          },
          {
            apoyo: "Jesús no es solo un buen maestro: es Dios con nosotros.",
            ref: "Mateo 1:23; Juan 1:14",
            clave: {
              id: "pr-n2-doctrinas-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué nos enseña el nombre Emanuel sobre quién es Jesús?",
              ideas: [
                { id: "dios", peso: 50, texto: "Emanuel quiere decir Dios con nosotros: Jesús es Dios.", formas: ["dios con nosotros", "es dios", "hijo eterno", "el verbo"] },
                { id: "hombre", peso: 50, texto: "Dios se hizo hombre y habitó entre nosotros.", formas: ["se hizo hombre", "hecho carne", "habito entre nosotros", "vivio (entre|con|como) nosotros", "naci*", "verdadero hombre", "hombre de verdad"] },
              ],
              modelo: "Emanuel quiere decir Dios con nosotros. Jesús es Dios, el Hijo eterno, y también se hizo hombre de verdad: nació de la virgen María y habitó entre nosotros.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. El pecado y la salvación
    "n2-doctrinas-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A imagen de quién creó Dios al ser humano?", reverso: "A su propia imagen: varón y hembra los creó.", apoyo: "Y creó Dios al hombre a su imagen" },
              { frente: "¿Quién lleva la imagen de Dios?", reverso: "Toda persona, hombre o mujer.", apoyo: "Toda persona, hombre o mujer, lleva esa imagen." },
              { frente: "¿Cómo entró el pecado en el mundo?", reverso: "Por la desobediencia de Adán.", apoyo: "Pero por la desobediencia de Adán" },
              { frente: "¿Qué dice Romanos 3:23 de todos los seres humanos?", reverso: "Que todos pecaron y están destituidos de la gloria de Dios.", apoyo: "por cuanto todos pecaron, y están destituidos de la gloria de Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué dignidad creó Dios al ser humano?", reverso: "Con una dignidad única: a su imagen.", apoyo: "Dios creó al ser humano con una dignidad única" },
              { frente: "¿Qué entró en el mundo por el pecado?", reverso: "La muerte.", apoyo: "el pecado entró en el mundo por un hombre, y por el pecado la muerte" },
              { frente: "¿Puede el ser humano salvarse a sí mismo?", reverso: "No: está separado de Dios y no puede.", apoyo: "El ser humano está separado de Dios y no puede salvarse a sí mismo." },
              { frente: "¿Qué hay que entender antes de la buena noticia?", reverso: "La mala noticia: qué pasó con el ser humano.", apoyo: "Para entender la buena noticia hay que entender primero la mala" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el ser humano está equivocada. Tócala.",
            frases: [
              "Dios creó al ser humano a su imagen.",
              "Solo el hombre lleva la imagen de Dios, no la mujer.",
              "Por la desobediencia de Adán, el pecado entró en el mundo.",
              "Todos pecaron y están destituidos de la gloria de Dios.",
            ],
            malo: 1,
            correccion: "Toda persona, hombre o mujer, lleva la imagen de Dios.",
            apoyo: "Toda persona, hombre o mujer, lleva esa imagen.",
            ref: "Génesis 1:27",
            explica: "Dios creó a su imagen al varón y a la hembra: toda persona tiene una dignidad única.",
          },
          {
            consigna: "Una de estas frases sobre el pecado está equivocada. Tócala.",
            frases: [
              "El pecado entró en el mundo por un hombre.",
              "Por el pecado entró la muerte.",
              "Algunas personas buenas nunca han pecado.",
              "El ser humano no puede salvarse a sí mismo.",
            ],
            malo: 2,
            correccion: "Nadie quedó fuera: todos pecaron.",
            apoyo: "Y nadie quedó fuera",
            ref: "Romanos 3:23",
            explica: "Todos pecaron y están separados de Dios; por eso nadie puede salvarse a sí mismo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña Efesios 2:8-9 sobre la salvación.",
            texto: "La salvación es un [[regalo]]: somos salvos por [[gracia]], por medio de la [[fe]] en Cristo.",
            distractores: ["premio", "esfuerzo", "obediencia"],
            errores: {
              premio: "Un premio se gana, y la salvación no se gana: se recibe.",
              esfuerzo: "No es por nuestro esfuerzo: es por gracia, el don de Dios.",
              obediencia: "La salvación se recibe por medio de la fe, no por obras, para que nadie se gloríe.",
            },
            apoyo: "La salvación es un regalo: por gracia, por medio de la fe en Cristo y no por obras",
            ref: "Efesios 2:8-9",
            explica: "La salvación es un regalo: Dios la da por gracia y la recibimos por medio de la fe en Cristo, no por obras.",
          },
          {
            consigna: "Completa lo que pasa con quien cree en Cristo.",
            texto: "La salvación no se gana: se [[recibe]]. Quien se arrepiente y cree en Cristo es perdonado, justificado y [[adoptado]] como hijo de Dios: [[nace]] de nuevo.",
            distractores: ["compra", "contratado", "mejora"],
            errores: {
              compra: "Un regalo no se compra: la salvación no se gana, se recibe.",
              contratado: "La lección dice adoptado: Dios lo recibe como hijo.",
              mejora: "Es un nuevo comienzo, no una mejora de la vida vieja.",
            },
            apoyo: "La salvación no se gana: se recibe.",
            ref: "Efesios 2:8-9; Juan 3:3",
            explica: "Quien se arrepiente y cree en Cristo recibe la salvación como un regalo: es perdonado, justificado y adoptado como hijo de Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la perseverancia, un punto por confirmar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las Asambleas de Dios enseñan que el que se aparta de la fe de manera definitiva puede perder la salvación.", verdad: true, explica: "Así lo presenta la lección: unos enseñan que sí puede, y citan advertencias como Hebreos 3:12.", apoyo: "Unos, como las Asambleas de Dios, enseñan que sí puede", ref: "Hebreos 3:12-14" },
              { texto: "La posición del ministerio sobre la perseverancia ya quedó confirmada.", verdad: false, explica: "Todavía no: es un punto de la declaración de fe por confirmar.", apoyo: "La posición del ministerio sobre la perseverancia es un punto de la declaración de fe por confirmar." },
              { texto: "Todos coinciden en que la seguridad de la salvación descansa en las promesas de Dios.", verdad: true, explica: "Es una de las dos cosas en que todos coinciden.", apoyo: "la seguridad de la salvación descansa en las promesas de Dios" },
              { texto: "La seguridad de la salvación descansa en lo que el creyente siente.", verdad: false, explica: "La seguridad se apoya en las promesas de Dios y no en los sentimientos: en eso todos coinciden.", apoyo: "Y el creyente puede tener seguridad, apoyada en las promesas de Dios y no en sus sentimientos", ref: "1 Juan 5:11-13" },
            ],
          },
          {
            consigna: "Sobre la perseverancia, un punto por confirmar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todos los creyentes enseñan lo mismo sobre si se puede perder la salvación.", verdad: false, explica: "Los creyentes difieren: unos enseñan que el que se aparta de manera definitiva puede perderla y otros, que quien nació de nuevo nunca la pierde.", apoyo: "Los creyentes difieren sobre si el que se aparta de la fe de manera definitiva puede perder la salvación." },
              { texto: "Algunos creyentes enseñan que quien nació de nuevo nunca pierde la salvación, y citan Juan 10:28.", verdad: true, explica: "Citan promesas como esta: «no perecerán jamás, ni nadie las arrebatará de mi mano».", apoyo: "Otros enseñan que quien nació de nuevo nunca la pierde", ref: "Juan 10:28-29" },
              { texto: "Todos coinciden en que la Biblia llama a cada creyente a permanecer firme en la fe.", verdad: true, explica: "Es la otra cosa en que todos coinciden.", apoyo: "la Biblia llama a cada creyente a permanecer firme en la fe" },
              { texto: "Las Asambleas de Dios enseñan que quien nació de nuevo nunca pierde la salvación.", verdad: false, explica: "Es al revés: las Asambleas de Dios enseñan que el que se aparta de la fe de manera definitiva sí puede perderla.", apoyo: "Unos, como las Asambleas de Dios, enseñan que sí puede", ref: "Hebreos 3:12-14" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de estudio te pregunta: ¿Un cristiano puede perder la salvación?",
            pregunta: "¿Qué le respondes según la lección?",
            opciones: [
              { texto: "Los creyentes difieren; la posición de nuestro ministerio está por confirmar.", bien: true, explica: "Así lo presenta la lección, con respeto. Y todos coinciden en que la seguridad descansa en las promesas de Dios y en que hay que permanecer firmes en la fe." },
              { texto: "Sí: el ministerio ya enseña que quien se aparta de la fe pierde la salvación.", explica: "La posición del ministerio sobre la perseverancia es un punto por confirmar: no se puede presentar como ya decidida." },
              { texto: "No: el ministerio ya enseña que quien nació de nuevo nunca pierde la salvación.", explica: "Tampoco está decidido así: la posición del ministerio es un punto por confirmar." },
              { texto: "Eso no importa: la Biblia no nos pide permanecer firmes en la fe.", explica: "Todos coinciden en que la Biblia llama a cada creyente a permanecer firme en la fe." },
            ],
            apoyo: "La posición del ministerio sobre la perseverancia es un punto de la declaración de fe por confirmar.",
            ref: "Juan 10:28-29; Hebreos 3:12-14",
            explica: "Sobre la perseverancia los creyentes difieren, y la posición del ministerio está por confirmar; todos coinciden en que la seguridad descansa en las promesas de Dios.",
          },
          {
            caso: "Una hermana de tu grupo te dice: Mi tío dice que el que nació de nuevo nunca pierde la salvación. ¿Eso creemos?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Lo enseñan algunos y otros no; el ministerio aún debe confirmar su posición.", bien: true, explica: "Unos enseñan que el que se aparta de manera definitiva puede perderla y otros que nunca la pierde; la posición del ministerio está por confirmar." },
              { texto: "Sí: es lo que enseña la Biblia, y quien lo niega no es cristiano.", explica: "La lección presenta las dos posiciones con respeto, y la del ministerio está por confirmar." },
              { texto: "No: el que peca una sola vez ya pierde la salvación y tiene que volver a empezar.", explica: "La lección no habla de un solo pecado: la pregunta es si el que se aparta de la fe de manera definitiva puede perder la salvación, y eso está por confirmar." },
              { texto: "Da igual lo que creas: la seguridad de la salvación está en lo que sientes.", explica: "La seguridad se apoya en las promesas de Dios, no en los sentimientos: en eso todos coinciden." },
            ],
            apoyo: "Otros enseñan que quien nació de nuevo nunca la pierde",
            ref: "Juan 10:28-29; Hebreos 3:12-14",
            explica: "Es una de las posiciones que la lección presenta con respeto; la del ministerio es un punto de la declaración de fe por confirmar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La salvación no se gana: se recibe.",
            ref: "Efesios 2:8-9",
            clave: {
              id: "pr-n2-doctrinas-3-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que la salvación es por gracia y no por obras?",
              ideas: [
                { id: "regalo", peso: 50, texto: "Es un regalo, un don de Dios: no se gana, se recibe.", formas: ["regalo", "don de dios", "es (un|el) don", "no se gana", "no la ganamos", "no (se|la) puede ganar"] },
                { id: "fe", peso: 50, texto: "Se recibe por medio de la fe en Cristo, para que nadie se gloríe.", formas: ["por medio de la fe", "por la fe", "mediante la fe", "fe en (cristo|jesus)", "cree* en (cristo|jesus)", "nadie se glori*"] },
              ],
              errores: [
                { id: "por-obras", texto: "La salvación no se gana con obras: es un regalo, por gracia.", formas: ["hay que ganarla", "se gana con", "ganarla con", "la ganamos con"], anula: "regalo" },
                { id: "fe-no-basta", texto: "La salvación se recibe por medio de la fe, no por obras.", formas: ["la fe no (alcanza|basta|sirve)", "no basta con la fe", "no alcanza con la fe"], anula: "fe" },
              ],
              modelo: "Porque la salvación es un regalo, un don de Dios: no se gana con obras, se recibe. La recibimos por medio de la fe en Cristo, para que nadie se gloríe.",
            },
          },
          {
            apoyo: "Quien se arrepiente y cree en Cristo es perdonado, justificado y adoptado como hijo de Dios.",
            ref: "Efesios 2:8-9; Juan 3:3",
            clave: {
              id: "pr-n2-doctrinas-3-a6-2",
              tipo: "corta",
              pregunta: "Si la salvación es un regalo, ¿cómo se recibe y qué hace Dios en quien la recibe?",
              ideas: [
                { id: "fe", peso: 50, texto: "Se recibe por medio de la fe: arrepintiéndose y creyendo en Cristo.", formas: ["por medio de la fe", "por la fe", "mediante la fe", "con fe", "cree* en (cristo|jesus)", "creyendo", "arrepent*", "se arrepiente"] },
                { id: "perdon", peso: 50, texto: "Lo perdona, lo justifica y lo adopta como hijo de Dios: nace de nuevo.", formas: ["perdon*", "justific*", "adopt*", "hijo de dios", "hija de dios", "nace* de nuevo"] },
              ],
              modelo: "Se recibe por medio de la fe: quien se arrepiente y cree en Cristo la recibe. Y Dios lo perdona, lo justifica y lo adopta como hijo de Dios; esa persona nace de nuevo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. El Espíritu Santo, sus dones y la sanidad
    "n2-doctrinas-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Es el Espíritu Santo una fuerza?", reverso: "No: es una persona divina.", apoyo: "El Espíritu Santo es una persona divina, no una fuerza." },
              { frente: "¿Cómo llama Jesús al Espíritu Santo?", reverso: "El Consolador.", apoyo: "Jesús lo llama el Consolador" },
              { frente: "¿De qué convencerá el Espíritu al mundo?", reverso: "De pecado, de justicia y de juicio.", apoyo: "convencerá al mundo de pecado, de justicia y de juicio" },
              { frente: "¿De qué da testimonio el Espíritu a nuestro espíritu?", reverso: "De que somos hijos de Dios.", apoyo: "El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace el Espíritu Santo en el que cree?", reverso: "Lo hace nacer de nuevo, vive en él y le da seguridad.", apoyo: "Hace nacer de nuevo al que cree, vive en él y le da seguridad" },
              { frente: "¿Qué es el Espíritu Santo, si no es una idea?", reverso: "Es Dios, una persona divina.", apoyo: "El Espíritu Santo no es una idea: es Dios que vive en ti." },
              { frente: "¿Qué lugar da la fe pentecostal a la obra del Espíritu?", reverso: "Un lugar especial.", apoyo: "La fe pentecostal da un lugar especial a la obra del Espíritu Santo." },
              { frente: "¿Qué prometió Jesús que recibirían con el Espíritu Santo?", reverso: "Poder para ser sus testigos.", apoyo: "recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos" },
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
            consigna: "Completa quién es el Espíritu Santo y qué hace en el creyente.",
            texto: "El Espíritu Santo es una [[persona]] divina. Jesús lo llama el [[Consolador]]. Hace nacer de nuevo al que cree, vive en él y le da [[seguridad]].",
            distractores: ["fuerza", "Ángel", "miedo"],
            errores: {
              fuerza: "El Espíritu Santo es una persona divina, no una fuerza.",
              Ángel: "Jesús lo llama el Consolador: es una persona divina, no un ángel.",
              miedo: "El Espíritu mismo da testimonio de que somos hijos de Dios: da seguridad.",
            },
            apoyo: "El Espíritu Santo es una persona divina, no una fuerza.",
            ref: "Juan 16:7-8; Romanos 8:16",
            explica: "El Espíritu Santo es una persona divina, el Consolador: hace nacer de nuevo al que cree, vive en él y le da seguridad.",
          },
          {
            consigna: "Completa lo que la lección dice del Espíritu Santo.",
            texto: "El Espíritu Santo no es una idea: es [[Dios]] que vive en ti. Hace nacer de nuevo al que cree y le da [[poder]].",
            distractores: ["energía", "miedo"],
            errores: {
              energía: "No es una energía ni una fuerza: es una persona divina, Dios que vive en ti.",
              miedo: "El Espíritu da poder y seguridad: da testimonio de que somos hijos de Dios.",
            },
            apoyo: "El Espíritu Santo no es una idea: es Dios que vive en ti.",
            ref: "Hechos 1:8; Romanos 8:16",
            explica: "El Espíritu Santo es Dios, una persona divina: hace nacer de nuevo al que cree, vive en él y le da poder.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se une el bautismo en el Espíritu con cada idea? Elige la relación de cada enlace.",
            nodos: [
              { id: "bautismo", texto: "El bautismo en el Espíritu", x: 50, y: 50 },
              { id: "creyente", texto: "Todo creyente", x: 50, y: 12 },
              { id: "poder", texto: "Poder para testificar y servir", x: 20, y: 88 },
              { id: "nacimiento", texto: "El nuevo nacimiento", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "bautismo", a: "creyente", relacion: "es una promesa para" },
              { de: "bautismo", a: "poder", relacion: "da al creyente" },
              { de: "bautismo", a: "nacimiento", relacion: "es distinto de" },
            ],
            distractores: ["es lo mismo que", "reemplaza a"],
            apoyo: "El bautismo en el Espíritu es una promesa para todo creyente, distinta del nuevo nacimiento y que puede seguirlo, y da poder para testificar y servir.",
            ref: "Hechos 1:8; Hechos 2:38-39",
            explica: "El bautismo en el Espíritu es una promesa para todo creyente, distinta del nuevo nacimiento, y da poder para testificar y servir.",
          },
          {
            consigna: "¿Cómo se unen los dones del Espíritu con cada idea? Elige la relación de cada enlace.",
            nodos: [
              { id: "dones", texto: "Los dones del Espíritu", x: 50, y: 50 },
              { id: "iglesia", texto: "La iglesia", x: 50, y: 12 },
              { id: "mundo", texto: "El mundo", x: 20, y: 88 },
              { id: "orden", texto: "Amor, Palabra y orden", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "dones", a: "iglesia", relacion: "edifican a" },
              { de: "dones", a: "mundo", relacion: "ayudan a alcanzar a" },
              { de: "dones", a: "orden", relacion: "se ejercen con" },
            ],
            distractores: ["ya no sirven para", "se ejercen sin"],
            apoyo: "Dios los da para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, bajo la autoridad de la Palabra y con orden",
            ref: "1 Corintios 12:7; 1 Corintios 14:40",
            explica: "Los dones siguen vigentes hoy: Dios los da para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, bajo la Palabra y con orden.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es lo que creemos o es un punto por confirmar? Lleva cada frase a su grupo.",
            grupos: ["Lo que creemos", "Un punto por confirmar"],
            frases: [
              { texto: "Dios sana hoy en respuesta a la oración de fe", grupo: 0 },
              { texto: "Los dones del Espíritu siguen vigentes hoy", grupo: 0 },
              { texto: "El bautismo en el Espíritu da poder para testificar y servir", grupo: 0 },
              { texto: "El bautismo en el Espíritu es una promesa para todo creyente", grupo: 0 },
              { texto: "Hablar en lenguas es la señal inicial y necesaria del bautismo en el Espíritu", grupo: 1, explica: "Así lo enseñan las Asambleas de Dios, y otras iglesias pentecostales difieren. La posición del ministerio está por confirmar." },
              { texto: "La sanidad está provista en la obra de Cristo en la cruz", grupo: 1, explica: "Así lo enseña el pentecostalismo clásico, y otros la presentan como una promesa en respuesta a la oración. Está por confirmar." },
            ],
            apoyo: "Las lenguas como señal y la sanidad en la expiación quedan por confirmar.",
            ref: "Hechos 2:4; 1 Corintios 12:30; Isaías 53:4-5",
            explica: "Creemos en el bautismo en el Espíritu, en los dones y en la sanidad divina; las lenguas como señal y la sanidad en la expiación quedan por confirmar.",
          },
          {
            consigna: "¿Lo creemos o está por confirmar? Lleva cada frase a su grupo.",
            grupos: ["Lo que creemos", "Un punto por confirmar"],
            frases: [
              { texto: "El Espíritu Santo es una persona divina, no una fuerza", grupo: 0 },
              { texto: "Buscar la sanidad de Dios no se opone a recibir atención médica", grupo: 0 },
              { texto: "Los dones se ejercen con amor y con orden", grupo: 0 },
              { texto: "El Espíritu Santo convence al mundo de pecado, de justicia y de juicio", grupo: 0 },
              { texto: "Las lenguas son una manifestación que se espera, sin ser la única señal", grupo: 1, explica: "Así lo enseñan otras iglesias pentecostales; las Asambleas de Dios enseñan que es la señal inicial y necesaria. Está por confirmar." },
              { texto: "La sanidad está incluida en la obra de Cristo en la cruz", grupo: 1, explica: "Así lo enseña el pentecostalismo clásico al leer Isaías 53; otros la presentan como una promesa en respuesta a la oración. Está por confirmar." },
            ],
            apoyo: "La posición del ministerio es un punto de la declaración de fe por confirmar.",
            ref: "1 Corintios 12:30; Isaías 53:4-5; Mateo 8:16-17",
            explica: "La materia presenta con respeto las posiciones sobre las lenguas como señal y sobre la sanidad en la expiación; la del ministerio está por confirmar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo de la iglesia te dice: Si no hablaste en lenguas, entonces no has sido bautizado en el Espíritu.",
            pregunta: "¿Qué le respondes según la lección?",
            opciones: [
              { texto: "Las iglesias pentecostales difieren en eso, y el ministerio aún debe confirmarlo.", bien: true, explica: "Así lo presenta la lección. Lo que sí creemos: el bautismo en el Espíritu es una promesa para todo creyente, y hay que buscarlo con fe." },
              { texto: "Tienes razón: el ministerio ya enseña que las lenguas son la señal necesaria.", explica: "La posición del ministerio sobre las lenguas como señal es un punto por confirmar: no se puede presentar como ya decidida." },
              { texto: "No es así: el ministerio ya enseña que las lenguas no tienen nada que ver con eso.", explica: "Tampoco está decidido así: la posición del ministerio sobre las lenguas como señal está por confirmar." },
              { texto: "Las lenguas ya no existen hoy: los dones del Espíritu terminaron con los apóstoles.", explica: "Los dones del Espíritu siguen vigentes hoy." },
            ],
            apoyo: "La posición del ministerio es un punto de la declaración de fe por confirmar.",
            ref: "Hechos 2:4; 1 Corintios 12:30",
            explica: "Si hablar en lenguas es la señal inicial y necesaria es un punto en que las iglesias pentecostales difieren; la posición del ministerio está por confirmar.",
          },
          {
            caso: "Una hermana te pregunta: ¿La sanidad está incluida en lo que Cristo hizo en la cruz?",
            pregunta: "¿Qué le respondes según la lección?",
            opciones: [
              { texto: "Unos lo enseñan por Isaías 53 y otros no; el ministerio aún debe confirmarlo.", bien: true, explica: "El pentecostalismo clásico lo enseña, otros la presentan como una promesa en respuesta a la oración, y la posición del ministerio está por confirmar." },
              { texto: "Sí: el ministerio ya lo confirmó, así que quien no se sana es porque no tiene fe.", explica: "La posición del ministerio sobre la sanidad en la expiación es un punto por confirmar." },
              { texto: "No: eso no lo enseña nadie, porque hoy Dios ya no sana a los enfermos.", explica: "El pentecostalismo clásico lo enseña, y Dios sana hoy en respuesta a la oración de fe." },
              { texto: "La Biblia no habla de sanidad; eso es algo que inventaron algunas iglesias.", explica: "Santiago enseña a orar por los enfermos, y Mateo aplica Isaías 53 a las sanidades de Jesús." },
            ],
            apoyo: "Otros la presentan como una promesa de Dios en respuesta a la oración.",
            ref: "Isaías 53:4-5; Mateo 8:16-17; Santiago 5:14-15",
            explica: "El pentecostalismo clásico enseña que la sanidad está provista en la cruz; otros la presentan como una promesa en respuesta a la oración. La posición del ministerio está por confirmar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El bautismo en el Espíritu es una promesa para todo creyente, distinta del nuevo nacimiento y que puede seguirlo, y da poder para testificar y servir.",
            ref: "Hechos 1:8; Hechos 2:38-39",
            clave: {
              id: "pr-n2-doctrinas-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué creemos sobre el bautismo en el Espíritu Santo?",
              ideas: [
                { id: "promesa", peso: 35, texto: "Es una promesa para todo creyente, que debe buscarlo con fe.", formas: ["promesa", "todo creyente", "todos los creyentes", "para todos", "buscar* con fe", "buscarlo"] },
                { id: "poder", peso: 35, texto: "Da poder para testificar y servir.", formas: ["poder", "testific*", "testigo*", "servir"] },
                { id: "distinto", peso: 30, texto: "Es distinto del nuevo nacimiento y puede seguirlo.", formas: ["distint*", "no es lo mismo", "no es igual", "puede seguir*", "otra experiencia"] },
              ],
              errores: [
                { id: "solo-algunos", texto: "El bautismo en el Espíritu es una promesa para todo creyente.", formas: ["solo para (algunos|pastores|lideres)", "no es para todos", "solo algunos"], anula: "promesa" },
                { id: "lo-mismo", texto: "El bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.", formas: ["es lo mismo que (nacer|el)", "es igual que (nacer|el)", "es igual al nuevo nacimiento"], anula: "distinto" },
              ],
              modelo: "Creemos que el bautismo en el Espíritu es una promesa para todo creyente, distinta del nuevo nacimiento y que puede seguirlo. Da poder para testificar y servir, y todo creyente debe buscarlo con fe.",
            },
          },
          {
            apoyo: "Dios los da para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, bajo la autoridad de la Palabra y con orden",
            ref: "1 Corintios 12:7; 1 Corintios 14:40",
            clave: {
              id: "pr-n2-doctrinas-4-a6-2",
              tipo: "corta",
              pregunta: "¿Para qué da Dios los dones del Espíritu y cómo se ejercen?",
              ideas: [
                { id: "para", peso: 50, texto: "Para edificar a la iglesia y alcanzar al mundo.", formas: ["edific*", "alcanz*", "provecho", "para la iglesia", "al mundo"] },
                { id: "como", peso: 50, texto: "Con amor, bajo la autoridad de la Palabra y con orden.", formas: ["con amor", "amor", "con orden", "orden", "autoridad de la palabra", "bajo la palabra", "decentemente"] },
              ],
              modelo: "Siguen vigentes hoy: Dios los da para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, bajo la autoridad de la Palabra y con orden.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. La santidad, las ordenanzas y la iglesia
    "n2-doctrinas-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es la voluntad de Dios para sus hijos?", reverso: "Su santificación.", apoyo: "la voluntad de Dios es vuestra santificación" },
              { frente: "¿En quién fue apartado para Dios el creyente?", reverso: "En Cristo: ya fue apartado para Dios.", apoyo: "En Cristo el creyente ya fue apartado para Dios" },
              { frente: "¿Por qué medios crece el creyente a la imagen de Cristo?", reverso: "Por la Palabra, la oración y la obediencia.", apoyo: "por la Palabra, la oración y la obediencia" },
              { frente: "¿La salvación termina en el perdón?", reverso: "No: abre una vida nueva, en santidad, dentro de una iglesia.", apoyo: "La salvación no termina en el perdón: abre una vida nueva, en santidad, dentro de una iglesia que tiene una misión." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo nos transforma el Espíritu del Señor?", reverso: "De gloria en gloria, a la imagen de Cristo.", apoyo: "somos transformados de gloria en gloria en la misma imagen, como por el Espíritu del Señor" },
              { frente: "¿Cuántas ordenanzas dejó el Señor?", reverso: "Dos: el bautismo en agua y la Santa Cena.", apoyo: "El Señor dejó dos ordenanzas." },
              { frente: "¿Qué es la iglesia?", reverso: "El cuerpo de Cristo, formado por todos los que han creído en Él.", apoyo: "La iglesia es el cuerpo de Cristo, formado por todos los que han creído en él" },
              { frente: "¿A qué es llamado todo creyente?", reverso: "A servir con sus dones.", apoyo: "Todo creyente es llamado a servir con sus dones" },
              { frente: "¿Qué dice la lección del pastorado de la mujer?", reverso: "Que si puede ejercerlo, o con qué límites, es un punto por confirmar.", apoyo: "Si la mujer puede ejercer el pastorado y la predicación, o con qué límites, es un punto de la declaración de fe por confirmar." },
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
            consigna: "Sobre la santificación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La voluntad de Dios para sus hijos es su santificación.", verdad: true, explica: "Así lo dice 1 Tesalonicenses 4:3: «la voluntad de Dios es vuestra santificación».", apoyo: "la voluntad de Dios es vuestra santificación", ref: "1 Tesalonicenses 4:3" },
              { texto: "Quien está en Cristo ya fue apartado para Dios.", verdad: true, explica: "En Cristo el creyente ya fue apartado para Dios, y desde ahí crece día a día.", apoyo: "En Cristo el creyente ya fue apartado para Dios" },
              { texto: "La santidad se logra de una vez, y después ya no hace falta crecer.", verdad: false, explica: "El creyente crece día a día a la imagen de Cristo, por la Palabra, la oración y la obediencia.", apoyo: "y día a día crece a su imagen", ref: "2 Corintios 3:18" },
            ],
          },
          {
            consigna: "Sobre la santificación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La salvación termina en el perdón; la santidad es algo opcional.", verdad: false, explica: "La salvación abre una vida nueva, en santidad: la voluntad de Dios es nuestra santificación.", apoyo: "La salvación no termina en el perdón: abre una vida nueva, en santidad, dentro de una iglesia que tiene una misión.", ref: "1 Tesalonicenses 4:3" },
              { texto: "El creyente crece a la imagen de Cristo por la Palabra, la oración y la obediencia.", verdad: true, explica: "Así crece día a día a la imagen de Cristo.", apoyo: "por la Palabra, la oración y la obediencia" },
              { texto: "Somos transformados a la imagen de Cristo por nuestra propia fuerza, sin el Espíritu.", verdad: false, explica: "Somos transformados de gloria en gloria como por el Espíritu del Señor.", apoyo: "somos transformados de gloria en gloria en la misma imagen, como por el Espíritu del Señor", ref: "2 Corintios 3:18" },
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
            consigna: "¿Es del bautismo en agua o de la Santa Cena? Lleva cada frase a su grupo.",
            grupos: ["El bautismo en agua", "La Santa Cena"],
            frases: [
              { texto: "Se hace por inmersión", grupo: 0 },
              { texto: "Es testimonio de que morimos al pecado y resucitamos a una vida nueva", grupo: 0 },
              { texto: "Somos sepultados con Cristo para andar en vida nueva", grupo: 0 },
              { texto: "Es memorial de la muerte del Señor", grupo: 1 },
              { texto: "Anuncia la muerte del Señor hasta que Él venga", grupo: 1 },
              { texto: "Cada uno se examina a sí mismo antes de participar", grupo: 1, explica: "Participan los creyentes que se examinan a sí mismos." },
            ],
            apoyo: "el bautismo en agua por inmersión, testimonio de la vida nueva, y la Santa Cena, memorial de su muerte hasta que él venga",
            ref: "Romanos 6:4; 1 Corintios 11:23-28",
            explica: "El bautismo en agua, por inmersión, es testimonio de la vida nueva; la Santa Cena es memorial de la muerte del Señor hasta que Él venga.",
          },
          {
            consigna: "¿De qué ordenanza se habla, del bautismo en agua o de la Santa Cena? Lleva cada frase a su grupo.",
            grupos: ["El bautismo en agua", "La Santa Cena"],
            frases: [
              { texto: "Es un testimonio de la vida nueva del creyente", grupo: 0 },
              { texto: "Muestra que el creyente murió al pecado", grupo: 0 },
              { texto: "Se practica sumergiendo en agua", grupo: 0, explica: "El bautismo en agua es por inmersión." },
              { texto: "Es comunión con el Señor y con su pueblo", grupo: 1 },
              { texto: "Jesús mandó: «haced esto en memoria de mí»", grupo: 1 },
              { texto: "Anuncia que el Señor va a volver", grupo: 1, explica: "La Santa Cena es anuncio de su venida." },
            ],
            apoyo: "Es comunión con él y con su pueblo, y anuncio de su venida",
            ref: "Romanos 6:4; 1 Corintios 11:23-26",
            explica: "El bautismo en agua es testimonio de que el creyente murió al pecado y anda en vida nueva; la Santa Cena es memorial, comunión y anuncio de la venida del Señor.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Romanos 6:4",
            consigna: "¿Qué nos pasa con Cristo en el bautismo y cómo andamos después? Toca esas palabras.",
            texto: "somos [[sepultados]] juntamente con él para muerte por el bautismo, a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en [[vida]] [[nueva]]",
            apoyo: "es un testimonio de que murieron al pecado y resucitaron a una vida nueva",
            explica: "El bautismo en agua es testimonio de que morimos al pecado con Cristo y resucitamos para andar en vida nueva.",
          },
          {
            ref: "1 Corintios 11:26",
            consigna: "¿Qué se anuncia en la Santa Cena y hasta cuándo? Toca una palabra para cada respuesta.",
            texto: "la [[muerte]] del Señor anunciáis hasta que él [[venga]]",
            apoyo: "La Santa Cena es memorial de la muerte del Señor",
            explica: "La Santa Cena anuncia la muerte del Señor hasta que Él venga: es memorial de su muerte y anuncio de su venida.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la iglesia con lo que la lección dice de ella.",
            pares: [
              ["La iglesia", "Es el cuerpo de Cristo, y Él mismo la sostiene"],
              ["Apóstoles, profetas, evangelistas, pastores y maestros", "Cristo los da para perfeccionar a los santos"],
              ["Todo creyente", "Es llamado a servir con sus dones"],
              ["Las puertas del Hades", "No prevalecerán contra la iglesia"],
            ],
            apoyo: "Todo creyente es llamado a servir con sus dones, y quienes dirigen deben cumplir los requisitos de carácter que pide la Palabra.",
            ref: "Mateo 16:18; Efesios 4:11-12",
            explica: "La iglesia es el cuerpo de Cristo; Cristo le da ministerios para capacitar a todos, y todo creyente es llamado a servir con sus dones.",
          },
          {
            consigna: "Une cada idea con lo que la lección dice de ella.",
            pares: [
              ["La iglesia local", "Se reúne para adorar, aprender la Palabra y orar"],
              ["La misión de la iglesia", "Anunciar el evangelio a toda criatura"],
              ["Los ministerios", "Capacitan a todos para servir"],
              ["La doctrina de la iglesia", "Se vive sirviendo dentro de ella"],
            ],
            apoyo: "La iglesia es el cuerpo de Cristo con la misión de anunciar el evangelio, y Cristo le da ministerios para capacitar a todos para servir.",
            ref: "Mateo 16:18; Efesios 4:11-12",
            explica: "La iglesia local se reúne y anuncia el evangelio, los ministerios capacitan a todos para servir, y la doctrina se vive sirviendo dentro de la iglesia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La doctrina de la iglesia se vive sirviendo dentro de ella.",
            ref: "Efesios 4:11-12",
            clave: {
              id: "pr-n2-doctrinas-5-a6-1",
              tipo: "corta",
              pregunta: "¿Qué tiene que ver la misión de la iglesia con tu vida como discípulo?",
              ideas: [
                { id: "servir", peso: 50, texto: "Todo creyente es llamado a servir con sus dones.", formas: ["servir", "sirv*", "con (mis|sus|nuestros|los) dones", "mis dones", "sus dones"] },
                { id: "mision", peso: 50, texto: "La iglesia anuncia el evangelio, y el discípulo es parte de ella.", formas: ["anunci* el evangelio", "evangelio", "toda criatura", "cuerpo de cristo", "soy parte", "somos parte"] },
              ],
              modelo: "La iglesia es el cuerpo de Cristo y tiene la misión de anunciar el evangelio a toda criatura. Como discípulo soy parte de ella: estoy llamado a servir con mis dones en mi iglesia local.",
            },
          },
          {
            apoyo: "a fin de perfeccionar a los santos para la obra del ministerio",
            ref: "Efesios 4:11-12",
            clave: {
              id: "pr-n2-doctrinas-5-a6-2",
              tipo: "corta",
              pregunta: "¿Para qué da Cristo a su iglesia apóstoles, profetas, evangelistas, pastores y maestros?",
              ideas: [
                { id: "perfeccionar", peso: 50, texto: "Para perfeccionar a los santos: capacitar a todos.", formas: ["perfeccion*", "capacit*", "prepar*", "equip*"] },
                { id: "servir", peso: 50, texto: "Para que todos sirvan en la obra del ministerio.", formas: ["obra del ministerio", "servir", "sirv*", "con sus dones"] },
              ],
              modelo: "Cristo los da a fin de perfeccionar a los santos, es decir, para capacitar a todos los creyentes para la obra del ministerio: así cada uno sirve con sus dones.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. La familia, el avivamiento y la esperanza
    "n2-doctrinas-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Entre quiénes instituyó Dios el matrimonio?", reverso: "Entre un hombre y una mujer.", apoyo: "Dios instituyó el matrimonio entre un hombre y una mujer" },
              { frente: "¿Qué clase de pacto es el matrimonio?", reverso: "Un pacto de amor y fidelidad para toda la vida.", apoyo: "Es un pacto de amor y fidelidad para toda la vida" },
              { frente: "¿Qué se hace en la familia?", reverso: "Se ama, se enseña la fe y se forma a los hijos.", apoyo: "Y la familia es el lugar donde se ama, se enseña la fe y se forma a los hijos." },
              { frente: "¿Qué es el avivamiento?", reverso: "La obra del Espíritu que despierta a la iglesia y alcanza a los perdidos.", apoyo: "la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor, y que alcanza con poder a los perdidos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace el hombre que se casa, según Génesis 2:24?", reverso: "Deja a su padre y a su madre y se une a su mujer.", apoyo: "dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne" },
              { frente: "¿Qué pide Hebreos 13:4 sobre el matrimonio?", reverso: "Que sea honroso en todos.", apoyo: "Honroso sea en todos el matrimonio" },
              { frente: "¿Cómo buscamos el avivamiento?", reverso: "Con oración, arrepentimiento y obediencia a la Palabra.", apoyo: "Lo buscamos con oración, arrepentimiento y obediencia a la Palabra." },
              { frente: "¿Cuál es la gran esperanza de la iglesia?", reverso: "Que Cristo vuelve.", apoyo: "la gran esperanza de la iglesia: Cristo vuelve" },
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
            consigna: "Completa lo que creemos sobre el matrimonio y la familia.",
            texto: "Dios instituyó el matrimonio entre un hombre y una mujer: es un [[pacto]] de amor y [[fidelidad]] para toda la vida. La familia es el lugar donde se ama y se [[enseña]] la fe.",
            distractores: ["contrato", "conveniencia", "esconde"],
            errores: {
              contrato: "La lección lo llama un pacto de amor y fidelidad para toda la vida.",
              conveniencia: "El matrimonio es un pacto de amor y fidelidad.",
              esconde: "La familia es el lugar donde se ama, se enseña la fe y se forma a los hijos.",
            },
            apoyo: "Es un pacto de amor y fidelidad para toda la vida",
            ref: "Génesis 2:24; Hebreos 13:4",
            explica: "Dios instituyó el matrimonio como un pacto de amor y fidelidad para toda la vida, y la familia como el lugar donde se enseña la fe.",
          },
          {
            consigna: "Completa lo que dice la lección del matrimonio y de la familia.",
            texto: "El hombre deja a su padre y a su madre, se [[une]] a su mujer, y los dos son una sola carne. En la familia se ama, se enseña la fe y se [[forma]] a los hijos.",
            distractores: ["separa", "descuida"],
            errores: {
              separa: "Dios lo dijo así: «se unirá a su mujer, y serán una sola carne».",
              descuida: "La familia es el lugar donde se forma a los hijos.",
            },
            apoyo: "Y la familia es el lugar donde se ama, se enseña la fe y se forma a los hijos.",
            ref: "Génesis 2:24",
            explica: "En el matrimonio el hombre y la mujer son una sola carne, y la familia es el lugar donde se ama, se enseña la fe y se forma a los hijos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la venida de Cristo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesucristo volverá personal y visiblemente.", verdad: true, explica: "Este mismo Jesús vendrá así como lo vieron ir al cielo.", apoyo: "Jesucristo volverá personal y visiblemente", ref: "Hechos 1:11" },
              { texto: "Cristo no volverá en persona: su venida es solo una forma de hablar.", verdad: false, explica: "Cristo volverá personal y visiblemente: su venida es la esperanza de la iglesia.", apoyo: "Cristo volverá personal y visiblemente.", ref: "Hechos 1:11" },
              { texto: "Cuando Cristo venga, los muertos en Cristo resucitarán primero.", verdad: true, explica: "Así lo dice 1 Tesalonicenses 4:16; y los creyentes que vivan serán transformados.", apoyo: "los muertos en Cristo resucitarán primero", ref: "1 Tesalonicenses 4:16-17" },
              { texto: "Cuando Cristo venga, los muertos en Cristo se quedarán en sus sepulcros.", verdad: false, explica: "Los muertos en Cristo resucitarán primero, y así estaremos siempre con el Señor.", apoyo: "los muertos en Cristo resucitarán primero", ref: "1 Tesalonicenses 4:16-17" },
            ],
          },
          {
            consigna: "Sobre el juicio final y la eternidad: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Habrá un juicio final: todos los que están en los sepulcros oirán su voz.", verdad: true, explica: "Así lo dice Juan 5:28: «vendrá hora cuando todos los que están en los sepulcros oirán su voz».", apoyo: "Habrá un juicio final", ref: "Juan 5:28-29" },
              { texto: "Al final, todos vivirán con Dios para siempre, lo hayan recibido o no.", verdad: false, explica: "Los que recibieron a Cristo vivirán para siempre con Dios; los que lo rechazaron sufrirán la separación eterna de Dios.", apoyo: "y los que lo rechazaron sufrirán la separación eterna de Dios", ref: "Juan 5:28-29" },
              { texto: "En los cielos nuevos y la tierra nueva ya no habrá muerte ni dolor.", verdad: true, explica: "Allí vivirán para siempre con Dios los que recibieron a Cristo.", apoyo: "Los que recibieron a Cristo vivirán para siempre con Dios en los cielos nuevos y la tierra nueva", ref: "Apocalipsis 21:4" },
              { texto: "Después de la muerte no habrá ningún juicio.", verdad: false, explica: "Habrá un juicio final: todos los que están en los sepulcros oirán su voz.", apoyo: "Habrá un juicio final", ref: "Juan 5:28-29" },
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
            ref: "Apocalipsis 21:4",
            consigna: "¿Qué ya no habrá en los cielos nuevos y la tierra nueva? Toca las cuatro cosas.",
            texto: "ya no habrá [[muerte]], ni habrá más [[llanto]], ni [[clamor]], ni [[dolor]]",
            apoyo: "Los que recibieron a Cristo vivirán para siempre con Dios en los cielos nuevos y la tierra nueva",
            explica: "Los que recibieron a Cristo vivirán para siempre con Dios, donde ya no habrá muerte, ni llanto, ni clamor, ni dolor.",
          },
          {
            ref: "1 Tesalonicenses 4:17",
            consigna: "¿Por cuánto tiempo y con quién estaremos? Toca una palabra para cada respuesta.",
            texto: "así estaremos [[siempre]] con el [[Señor]]",
            apoyo: "Su venida es la esperanza de la iglesia",
            explica: "Cuando Cristo venga, estaremos siempre con el Señor: esa es la esperanza de la iglesia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es lo que creemos o es un punto por confirmar? Lleva cada frase a su grupo.",
            grupos: ["Lo que creemos", "Un punto por confirmar"],
            frases: [
              { texto: "Cristo vuelve personal y visiblemente", grupo: 0, explica: "En esto todos coinciden." },
              { texto: "Habrá un juicio final", grupo: 0 },
              { texto: "Los muertos en Cristo resucitarán primero", grupo: 0 },
              { texto: "Los creyentes que vivan serán transformados", grupo: 0 },
              { texto: "La iglesia será arrebatada antes de la gran tribulación", grupo: 1, explica: "Así lo enseñan las Asambleas de Dios; otros creyentes entienden de otra manera el orden de estos acontecimientos." },
              { texto: "Habrá un reino de mil años de Cristo en la tierra", grupo: 1, explica: "Así lo enseñan las Asambleas de Dios al leer Apocalipsis 20; otros lo entienden de otra manera." },
            ],
            apoyo: "La posición del ministerio es un punto de la declaración de fe por confirmar; todos coinciden en que Cristo vuelve, personal y visiblemente.",
            ref: "Hechos 1:11; Apocalipsis 20:4",
            explica: "Creemos que Cristo vuelve y que habrá un juicio final; el orden de los últimos tiempos queda por confirmar.",
          },
          {
            consigna: "¿Lo creemos o es un punto por confirmar? Lleva cada frase a su grupo.",
            grupos: ["Lo que creemos", "Un punto por confirmar"],
            frases: [
              { texto: "Jesucristo volverá como lo vieron ir al cielo", grupo: 0 },
              { texto: "Los que recibieron a Cristo vivirán para siempre con Dios", grupo: 0 },
              { texto: "Los que rechazaron a Cristo sufrirán la separación eterna de Dios", grupo: 0 },
              { texto: "En los cielos nuevos y la tierra nueva ya no habrá muerte", grupo: 0 },
              { texto: "Los creyentes serán arrebatados antes de la gran tribulación", grupo: 1, explica: "Es lo que enseñan las Asambleas de Dios; otros creyentes entienden de otra manera el orden." },
              { texto: "El reino de mil años de Cristo será en la tierra", grupo: 1, explica: "Es lo que enseñan las Asambleas de Dios al leer Apocalipsis 20; está por confirmar." },
            ],
            apoyo: "El orden de los últimos tiempos queda por confirmar.",
            ref: "Hechos 1:11; Juan 5:28-29; Apocalipsis 20:4",
            explica: "La venida de Cristo, el juicio y la eternidad son lo que creemos; el orden de los últimos tiempos es un punto por confirmar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de trabajo te pregunta: ¿Ustedes creen que la iglesia se va antes de la gran tribulación?",
            pregunta: "¿Qué le respondes según la lección?",
            opciones: [
              { texto: "Unos lo enseñan así y otros no; en mi iglesia es un punto aún por confirmar.", bien: true, explica: "Así lo presenta la lección: las Asambleas de Dios lo enseñan, otros lo entienden de otra manera, y la posición del ministerio está por confirmar." },
              { texto: "Sí: eso ya lo confirmó el ministerio, y quien no lo crea no es cristiano.", explica: "La posición del ministerio es un punto por confirmar, y la lección presenta las posiciones con respeto." },
              { texto: "No: el ministerio ya decidió que eso no está en la Biblia, así que nadie lo cree.", explica: "Tampoco es así: la posición del ministerio está por confirmar." },
              { texto: "Nadie sabe nada de eso; ni siquiera es seguro que Cristo vaya a volver.", explica: "Todos coinciden en que Cristo vuelve, personal y visiblemente." },
            ],
            apoyo: "Otros creyentes entienden de otra manera el orden de estos acontecimientos.",
            ref: "1 Tesalonicenses 4:16-17; Apocalipsis 20:4",
            explica: "El orden de los últimos tiempos es un punto por confirmar; lo seguro es que Cristo vuelve, personal y visiblemente.",
          },
          {
            caso: "Tu sobrino de 15 años te dice: Me da miedo el fin del mundo; ¿qué es lo seguro que creemos?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Lo seguro es que Cristo vuelve, y para quien lo recibió es una esperanza.", bien: true, explica: "Todos coinciden en que Cristo vuelve, personal y visiblemente, y su venida es la esperanza de la iglesia." },
              { texto: "Lo seguro es el orden exacto de todo lo que va a pasar al final de los tiempos.", explica: "El orden de los últimos tiempos queda por confirmar; lo seguro es que Cristo vuelve." },
              { texto: "Nada es seguro: ni siquiera sabemos si Cristo va a volver algún día.", explica: "Todos coinciden en que Cristo vuelve, personal y visiblemente." },
              { texto: "Lo seguro es que vamos a sufrir; la venida de Cristo es algo que da miedo.", explica: "Su venida es la esperanza de la iglesia: así estaremos siempre con el Señor." },
            ],
            apoyo: "todos coinciden en que Cristo vuelve, personal y visiblemente",
            ref: "Hechos 1:11; 1 Tesalonicenses 4:16-17",
            explica: "Lo seguro es que Cristo vuelve y que su venida es la esperanza de la iglesia; el orden de los últimos tiempos queda por confirmar.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios instituyó el matrimonio entre un hombre y una mujer",
            ref: "Génesis 2:24; Hebreos 13:4",
            clave: {
              id: "pr-n2-doctrinas-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué creemos sobre el matrimonio?",
              ideas: [
                { id: "hombre-mujer", peso: 50, texto: "Dios lo instituyó entre un hombre y una mujer.", formas: ["un hombre y una mujer", "hombre y mujer", "hombre con (una|su) mujer", "se une a su mujer", "una sola carne"] },
                { id: "pacto", peso: 50, texto: "Es un pacto de amor y fidelidad para toda la vida.", formas: ["pacto", "fidelidad", "fiel*", "toda la vida", "para siempre"] },
              ],
              errores: [
                { id: "mismo-sexo", texto: "La lección enseña que Dios instituyó el matrimonio entre un hombre y una mujer.", formas: ["dos hombres", "dos mujeres", "mismo sexo"], anula: "hombre-mujer" },
                { id: "contrato", texto: "La lección lo llama un pacto de amor y fidelidad para toda la vida.", formas: ["se puede terminar", "hasta que se acabe el amor"], anula: "pacto" },
              ],
              modelo: "Creemos que Dios instituyó el matrimonio entre un hombre y una mujer, que serán una sola carne. Es un pacto de amor y fidelidad para toda la vida.",
            },
          },
          {
            apoyo: "Y la familia es el lugar donde se ama, se enseña la fe y se forma a los hijos.",
            ref: "Génesis 2:24",
            clave: {
              id: "pr-n2-doctrinas-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué es la familia, según lo que creemos?",
              ideas: [
                { id: "amar", peso: 50, texto: "Es el lugar donde se ama.", formas: ["se ama", "amar*", "amor", "nos amamos"] },
                { id: "fe", peso: 50, texto: "Es donde se enseña la fe y se forma a los hijos.", formas: ["ensen* la fe", "la fe", "form* a los hijos", "ensen* a los hijos"] },
              ],
              modelo: "Dios instituyó la familia como el lugar donde se ama, se enseña la fe y se forma a los hijos.",
            },
          },
        ],
      },
    ],
  },
};
