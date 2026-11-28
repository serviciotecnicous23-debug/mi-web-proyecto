/**
 * Las prácticas de la materia `evangelismo-misiones-4` (especialidad). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/evangelismo-misiones-4.ts), con la guía de docs/academia-practicas.md.
 * «Misión transcultural»: cruzar fronteras culturales (Pedro en casa de Cornelio), el modelo de la encarnación, el
 * evangelio y la cultura (el concilio de Jerusalén), la lengua del corazón, el misionero y su familia, y las naciones
 * que viven en la propia ciudad. Sin repetir lo de «Evangelismo personal» (Nivel 2) ni lo de «Evangelismo y
 * consolidación» (Nivel 3): aquí las situaciones son de quien sirve en las misiones.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_EVANGELISMO_MISIONES_4: PracticasMateria = {
  materia: "evangelismo-misiones-4",
  mision: {
    titulo: "Más allá del muro: el equipo de misiones",
    intro: "Tu iglesia va a formar un equipo de misiones y te pidió ayudar a prepararlo: unos servirán en un pueblo de otra cultura, lejos de casa, y otros entre las familias de otros países que viven en tu ciudad. Antes de salir tendrán que cruzar sus propios prejuicios, seguir el modelo de Cristo, que se hizo carne y habitó entre nosotros, distinguir el evangelio de sus costumbres, comunicarlo en la lengua del corazón y cuidar a los que van y a sus familias. Repasa las seis lecciones para que el equipo esté listo.",
    cierre: "Ya sabes cruzar fronteras con el evangelio: reconocer el muro de tu propio corazón, identificarte con la gente sin pecar y sin cambiar el mensaje, no imponer tus costumbres, comunicar para que la gente entienda, cuidar al misionero y a su familia, y amar a las naciones que viven en tu calle. Dios no hace acepción de personas: en toda nación se agrada del que le teme y hace justicia.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Cruzar fronteras culturales
    "evangelismo-misiones-4-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la cultura?", reverso: "La manera de vivir que comparte un pueblo: su lengua, sus costumbres, sus valores y su manera de entender el mundo.", apoyo: "La cultura es la manera de vivir que comparte un pueblo: su lengua, sus costumbres, sus valores y su manera de entender el mundo" },
              { frente: "¿Qué tres clases de cosas tiene toda cultura?", reverso: "Cosas buenas, cosas neutras y cosas que el evangelio corrige.", apoyo: "Tiene cosas buenas, cosas neutras y cosas que el evangelio corrige, y el misionero aprende a distinguirlas" },
              { frente: "¿Qué pide llevar el evangelio a otro pueblo?", reverso: "Cruzar la frontera de la propia cultura, como le pasó a Pedro.", apoyo: "Llevar el evangelio a otro pueblo pide cruzar esa frontera, como le pasó a Pedro" },
              { frente: "¿Qué enseñó Pablo en Atenas sobre el origen de los pueblos?", reverso: "Que Dios «de una sangre ha hecho todo el linaje de los hombres».", apoyo: "En Atenas, Pablo enseñó que Dios «de una sangre ha hecho todo el linaje de los hombres»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién era Cornelio?", reverso: "Un centurión romano.", apoyo: "En casa de Cornelio, un centurión romano, Pedro dijo" },
              { frente: "¿Qué le dijo Dios a Pedro en la visión, antes de enviarlo?", reverso: "«Lo que Dios limpió, no lo llames tú común».", apoyo: "Antes de enviarlo, Dios le mostró una visión y le dijo: «Lo que Dios limpió, no lo llames tú común»" },
              { frente: "¿Qué muro había aprendido Pedro desde niño?", reverso: "Que para un judío era abominable juntarse con un extranjero.", apoyo: "Pedro reconoció el muro que había aprendido desde niño" },
              { frente: "¿Dónde suele estar el primer muro que hay que cruzar?", reverso: "En nuestro propio corazón.", apoyo: "El primer muro que hay que cruzar suele estar en nuestro propio corazón" },
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
            consigna: "¿Se conserva, es neutro o el evangelio lo transforma? Lleva cada frase a su grupo.",
            grupos: ["Se conserva", "Es neutro", "El evangelio lo transforma"],
            frases: [
              { texto: "La hospitalidad con el que llega", grupo: 0 },
              { texto: "El respeto a los mayores", grupo: 0 },
              { texto: "La comida propia del pueblo", grupo: 1 },
              { texto: "La ropa que se usa en el lugar", grupo: 1 },
              { texto: "La música del lugar", grupo: 1 },
              { texto: "La manera de saludar", grupo: 1 },
              { texto: "La idolatría", grupo: 2 },
              { texto: "La injusticia", grupo: 2 },
            ],
            apoyo: "Tiene cosas buenas, cosas neutras y cosas que el evangelio corrige, y el misionero aprende a distinguirlas",
            explica: "Lo bueno de cada pueblo, como la hospitalidad o el respeto a los mayores, se conserva; la comida, la ropa, la música o la manera de saludar son neutras; y lo que contradice la Palabra, como la idolatría o la injusticia, el evangelio lo transforma.",
          },
          {
            consigna: "Un misionero observa un pueblo nuevo para él. ¿Lo que ve se conserva, es neutro o el evangelio lo transforma? Lleva cada frase a su grupo.",
            grupos: ["Se conserva", "Es neutro", "El evangelio lo transforma"],
            frases: [
              { texto: "Siempre invitan a comer al que llega de visita", grupo: 0 },
              { texto: "Los jóvenes honran a sus abuelos", grupo: 0 },
              { texto: "Se saludan con una inclinación", grupo: 1 },
              { texto: "Cantan con instrumentos del lugar", grupo: 1 },
              { texto: "Visten ropa de colores muy vivos", grupo: 1 },
              { texto: "Rinden culto a una imagen de piedra", grupo: 2, explica: "Es idolatría: contradice la Palabra." },
              { texto: "Los fuertes les quitan la tierra a los pobres", grupo: 2, explica: "Es injusticia: contradice la Palabra." },
            ],
            apoyo: "Lo que el evangelio transforma: lo que contradice la Palabra, como la idolatría o la injusticia",
            explica: "Recibir al que llega y honrar a los mayores es lo bueno que se conserva; el saludo, la música y la ropa son neutros; y rendir culto a una imagen o quitarle la tierra al pobre es idolatría e injusticia: el evangelio lo transforma.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué pide llevar el evangelio a otro pueblo.",
            texto: "Todos vivimos dentro de una [[cultura]]: una manera de hablar, de comer, de vestir, de saludar y de ver el mundo. Llevar el evangelio a otro pueblo pide [[cruzar]] esa [[frontera]], como le pasó a Pedro.",
            distractores: ["iglesia", "cerrar", "doctrina"],
            errores: {
              iglesia: "No todos vivimos dentro de una iglesia, pero todos vivimos dentro de una cultura: una manera de hablar, de comer y de ver el mundo.",
              cerrar: "Llevar el evangelio a otro pueblo pide cruzar la frontera de la propia cultura, no cerrarla.",
              doctrina: "Lo que se cruza es la frontera de la propia cultura, como le pasó a Pedro.",
            },
            apoyo: "Llevar el evangelio a otro pueblo pide cruzar esa frontera, como le pasó a Pedro",
            explica: "Todos vivimos dentro de una cultura. Llevar el evangelio a otro pueblo pide cruzar esa frontera, como le pasó a Pedro en casa de Cornelio.",
          },
          {
            consigna: "Completa qué es la cultura.",
            texto: "La cultura es la manera de vivir que comparte un [[pueblo]]: su [[lengua]], sus costumbres, sus [[valores]] y su manera de entender el mundo.",
            distractores: ["templo", "sangre", "vecinos"],
            errores: {
              templo: "La cultura es la manera de vivir que comparte un pueblo.",
              sangre: "Dios «de una sangre ha hecho todo el linaje de los hombres»: lo que distingue a un pueblo es su cultura, como su lengua.",
              vecinos: "La cultura de un pueblo es su lengua, sus costumbres, sus valores y su manera de entender el mundo.",
            },
            apoyo: "La cultura es la manera de vivir que comparte un pueblo: su lengua, sus costumbres, sus valores y su manera de entender el mundo",
            explica: "La cultura es la manera de vivir que comparte un pueblo: su lengua, sus costumbres, sus valores y su manera de entender el mundo. Tiene cosas buenas, neutras y otras que el evangelio corrige.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Hechos 10:34-35",
            consigna: "En casa de Cornelio, Pedro dijo de quién se agrada Dios en toda nación. ¿De quién? Toca las palabras que lo dicen.",
            texto: "En verdad comprendo que Dios no hace acepción de personas, sino que en toda nación se agrada [[del que le teme y hace justicia]]",
            apoyo: "Dios llevó a Pedro a cruzar el muro que lo separaba de los gentiles: no hace acepción de personas, y de una sangre hizo a todo el linaje de los hombres",
            explica: "Pedro comprendió que Dios no hace acepción de personas: en toda nación se agrada del que le teme y hace justicia. Es el versículo de memoria de esta materia.",
          },
          {
            ref: "Hechos 10:28",
            consigna: "Pedro reconoció el muro que había aprendido desde niño. ¿Qué le había mostrado Dios? Toca las palabras que lo dicen.",
            texto: "Vosotros sabéis cuán abominable es para un varón judío juntarse o acercarse a un extranjero; pero a mí me ha mostrado Dios que [[a ningún hombre llame común o inmundo]]",
            apoyo: "Pedro reconoció el muro que había aprendido desde niño",
            explica: "Para un varón judío era abominable juntarse o acercarse a un extranjero, pero Dios le mostró a Pedro que a ningún hombre llamara común o inmundo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cómo Dios llevó a Pedro a la casa de Cornelio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Antes de enviar a Pedro a casa de Cornelio, Dios le mostró una visión.", verdad: true, explica: "Antes de enviarlo, Dios le mostró una visión y le dijo: «Lo que Dios limpió, no lo llames tú común».", apoyo: "Antes de enviarlo, Dios le mostró una visión y le dijo: «Lo que Dios limpió, no lo llames tú común»", ref: "Hechos 10:15" },
              { texto: "Cornelio era un sacerdote judío de Jerusalén.", verdad: false, explica: "Cornelio era un centurión romano: Dios llevó a Pedro a cruzar el muro que lo separaba de los gentiles.", apoyo: "En casa de Cornelio, un centurión romano, Pedro dijo" },
              { texto: "Desde niño, Pedro había aprendido que un judío no debía juntarse con un extranjero.", verdad: true, explica: "Pedro reconoció ese muro: «Vosotros sabéis cuán abominable es para un varón judío juntarse o acercarse a un extranjero».", apoyo: "Pedro reconoció el muro que había aprendido desde niño", ref: "Hechos 10:28" },
            ],
          },
          {
            consigna: "Sobre Pedro en casa de Cornelio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En la visión, Dios le dijo a Pedro que llamara común lo que él había limpiado.", verdad: false, explica: "Dios le dijo: «Lo que Dios limpió, no lo llames tú común».", apoyo: "Antes de enviarlo, Dios le mostró una visión y le dijo: «Lo que Dios limpió, no lo llames tú común»", ref: "Hechos 10:15" },
              { texto: "Pedro comprendió que en toda nación Dios se agrada del que le teme y hace justicia.", verdad: true, explica: "Pedro dijo: «En verdad comprendo que Dios no hace acepción de personas, sino que en toda nación se agrada del que le teme y hace justicia».", apoyo: "En casa de Cornelio, un centurión romano, Pedro dijo: «En verdad comprendo que Dios no hace acepción de personas, sino que en toda nación se agrada del que le teme y hace justicia»", ref: "Hechos 10:34-35" },
              { texto: "Pedro se negó a cruzar el muro que lo separaba de los gentiles.", verdad: false, explica: "Dios llevó a Pedro a cruzar el muro que lo separaba de los gentiles, y Pedro entró en casa de Cornelio.", apoyo: "Dios llevó a Pedro a cruzar el muro que lo separaba de los gentiles: no hace acepción de personas, y de una sangre hizo a todo el linaje de los hombres" },
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
            apoyo: "El misionero reconoce sus prejuicios y cruza fronteras con el evangelio",
            ref: "Hechos 10:34-35",
            situacion: "Tu iglesia empezó a servir en un barrio donde viven familias de otro país, con otra lengua y otras costumbres. Este sábado vas con el equipo de misiones.",
            escenas: [
              {
                id: "e1",
                narra: "En el camino, un compañero comenta: Esa gente es muy distinta; no creo que el evangelio sea para ellos.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Dios no hace acepción de personas: el evangelio es para ellos.", valor: 2, explica: "Pedro lo comprendió en casa de Cornelio: Dios no hace acepción de personas, y en toda nación se agrada del que le teme y hace justicia.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que mejor buscan gente que se parezca más a ustedes.", valor: 0, explica: "Ese es un prejuicio que frena la misión: Dios no hace acepción de personas.", siguiente: "e1b" },
                  { texto: "Que de todos modos irán, aunque crees que no van a querer escuchar.", valor: 1, explica: "Ir está bien, pero el muro sigue en pie: todos los pueblos tienen la misma necesidad de Dios.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al llegar, una familia los recibe con cariño y les ofrece algo de comer.",
                pregunta: "¿Qué piensas ahora de lo que dijo tu compañero?",
                opciones: [
                  { texto: "Que era un prejuicio: todos tienen la misma necesidad de Dios.", valor: 2, explica: "Todos los pueblos tienen el mismo origen y la misma necesidad de Dios: el misionero reconoce sus prejuicios.", siguiente: "e2" },
                  { texto: "Que esta familia es una excepción, y los demás no van a cambiar.", valor: 0, explica: "El prejuicio sigue: Dios no hace acepción de personas, y en toda nación se agrada del que le teme.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "La familia les sirve una comida que nunca probaste, y te da desconfianza.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La recibes con gratitud: la comida es parte de lo neutro.", valor: 2, explica: "La comida es neutra, y la hospitalidad es de lo bueno de cada pueblo, que se conserva." },
                  { texto: "Pides solo un poco, para no ofenderlos, y la pruebas.", valor: 1, explica: "Cuidar de no ofender está bien; recuerda además que la comida es neutra y que su hospitalidad es buena." },
                  { texto: "La rechazas y les dices que la comida de tu país es mejor.", valor: 0, explica: "La comida es neutra: despreciarla es un prejuicio que frena la misión." },
                ],
              },
              {
                id: "e3",
                narra: "De regreso, piensas en lo que sentiste durante la visita.",
                pregunta: "¿Qué haces con lo que sentiste?",
                opciones: [
                  { texto: "Le pides a Dios que quite el muro de tu propio corazón.", valor: 2, explica: "El primer muro que hay que cruzar suele estar en nuestro propio corazón: el misionero reconoce sus prejuicios." },
                  { texto: "Lo olvidas, porque lo que sientes no tiene que ver con la misión.", valor: 0, explica: "Los prejuicios frenan la misión: el misionero los reconoce para poder cruzar fronteras con el evangelio." },
                  { texto: "Decides no volver más, para no sentirte incómodo otra vez.", valor: 0, explica: "El misionero reconoce sus prejuicios y cruza fronteras con el evangelio, como Pedro." },
                ],
              },
            ],
          },
          {
            apoyo: "El primer muro que hay que cruzar suele estar en nuestro propio corazón",
            ref: "Hechos 17:26-27",
            situacion: "Eres líder de jóvenes. Este mes van a visitar a unos estudiantes de otros países que viven cerca de la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven dice: Ellos tienen otras costumbres y otra religión; no van a querer saber nada de Dios.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que todos los pueblos tienen la misma necesidad de Dios.", valor: 2, explica: "Dios de una sangre hizo a todo el linaje de los hombres: todos tienen el mismo origen y la misma necesidad de Dios.", siguiente: "e2" },
                  { texto: "Que tal vez no quieran, pero igual vale la pena saludarlos.", valor: 1, explica: "Saludarlos está bien, pero no los juzgues antes: todos los pueblos tienen la misma necesidad de Dios.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que es mejor orar por ellos desde lejos.", valor: 0, explica: "Es un prejuicio que frena la misión: Dios no hace acepción de personas.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Otro joven agrega: Además, ellos no son como nosotros; vienen de otro origen.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que de una sangre Dios hizo a todo el linaje de los hombres.", valor: 2, explica: "En Atenas, Pablo enseñó que Dios «de una sangre ha hecho todo el linaje de los hombres».", siguiente: "e2" },
                  { texto: "Que es cierto, y que por eso conviene no acercarse mucho a ellos.", valor: 0, explica: "Todos los pueblos tienen el mismo origen y la misma necesidad de Dios.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la visita notas que se saludan y se visten de otra manera, y un joven del grupo se ríe.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le explicas que el saludo y la ropa son neutros, no peores.", valor: 2, explica: "La ropa y la manera de saludar son parte de lo neutro de una cultura." },
                  { texto: "No dices nada en ese momento, aunque tú no te ríes de ellos.", valor: 1, explica: "No reírte está bien; también conviene ayudarle a ver que la ropa y el saludo son neutros." },
                  { texto: "Te ríes tú también, para no quedar mal con los demás del grupo.", valor: 0, explica: "Burlarse de lo neutro de otra cultura es un prejuicio que frena la misión." },
                ],
              },
              {
                id: "e3",
                narra: "Esa noche te preguntas por qué te costó tanto acercarte a ellos.",
                pregunta: "¿Qué reconoces?",
                opciones: [
                  { texto: "Que tienes un prejuicio que Dios quiere quitarte.", valor: 2, explica: "El primer muro que hay que cruzar suele estar en nuestro propio corazón." },
                  { texto: "Que son ellos los que deben acercarse primero a ti.", valor: 0, explica: "Dios llevó a Pedro a cruzar el muro: el misionero es el que cruza la frontera." },
                  { texto: "Que es normal sentir eso, y que no hace falta hacer nada.", valor: 0, explica: "El misionero reconoce sus prejuicios y cruza fronteras con el evangelio." },
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
            apoyo: "Dios llevó a Pedro a cruzar el muro que lo separaba de los gentiles: no hace acepción de personas, y de una sangre hizo a todo el linaje de los hombres",
            ref: "Hechos 10:28",
            clave: {
              id: "pr-evangelismo-misiones-4-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué muro tuvo que cruzar Pedro para entrar en casa de Cornelio, y qué le enseñó Dios?",
              ideas: [
                { id: "muro", peso: 50, negativa: true, texto: "Pedro había aprendido desde niño que para un judío era abominable juntarse con un extranjero: ese era su prejuicio.", formas: ["desde nino", "abominable", "prejuicio*", "junt* extranjer*", "acerc* extranjer*", "junt* gentil*", "acerc* gentil*", "separaba de los gentiles", "no se junt*", "no (debia|podia|debian|podian) (juntarse|acercarse)", "impur*"] },
                { id: "acepcion", peso: 50, negativa: true, texto: "Dios le enseñó que no hace acepción de personas: a ningún hombre debía llamar común o inmundo.", formas: ["no hace acepcion", "sin acepcion", "ningun hombre", "comun o inmundo", "toda nacion", "lo que dios limpio", "no lo llames"] },
              ],
              errores: [
                { id: "sin-prejuicio", texto: "Pedro sí tenía un muro: había aprendido desde niño que un judío no se juntaba con un extranjero.", formas: ["no tenia prejuicio*", "no tenia ningun prejuicio*", "ningun prejuicio", "sin prejuicio*"], anula: "muro" },
                { id: "acepcion", texto: "Dios no hace acepción de personas.", formas: ["hace acepcion"], anula: "acepcion" },
              ],
              modelo: "Pedro tuvo que cruzar el muro que aprendió desde niño: para un judío era abominable juntarse con un extranjero. Dios le enseñó que no hace acepción de personas y que a ningún hombre llamara común o inmundo.",
            },
          },
          {
            apoyo: "Todos los pueblos tienen el mismo origen y la misma necesidad de Dios",
            ref: "Hechos 17:26-27",
            clave: {
              id: "pr-evangelismo-misiones-4-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano del equipo de misiones dice que cierta gente de otro país es inferior y que no vale la pena evangelizarla. ¿Qué le respondes?",
              ideas: [
                { id: "origen", peso: 35, texto: "De una sangre Dios hizo a todo el linaje de los hombres: todos tienen el mismo origen y la misma necesidad de Dios.", formas: ["una sangre", "misma sangre", "linaje", "mismo origen", "misma necesidad", "necesit* (a|de) dios", "necesidad de dios", "todos (somos|son) iguales", "nadie es inferior", "ninguno es inferior", "ningun pueblo es inferior"] },
                { id: "acepcion", peso: 35, negativa: true, texto: "Dios no hace acepción de personas: en toda nación se agrada del que le teme.", formas: ["no hace acepcion", "sin acepcion", "toda nacion", "ningun hombre", "comun o inmundo", "todas las naciones"] },
                { id: "prejuicio", peso: 30, texto: "Ese pensamiento es un prejuicio: un muro que suele estar en el propio corazón y que hay que cruzar.", formas: ["prejuicio*", "muro (de|del|en|que)", "propio corazon", "su corazon", "nuestro corazon", "tu corazon"] },
              ],
              errores: [
                { id: "inferior", texto: "Ningún pueblo es inferior: de una sangre Dios hizo a todo el linaje de los hombres.", formas: ["tiene razon", "si son inferiores", "si es inferior", "es (cierto|verdad) que (son|es) inferior*"], anula: "origen" },
                { id: "acepcion", texto: "Dios no hace acepción de personas.", formas: ["hace acepcion"], anula: "acepcion" },
              ],
              modelo: "Le respondo que ese pensamiento es un prejuicio. De una sangre Dios hizo a todo el linaje de los hombres: todos tienen la misma necesidad de Dios. Y Dios no hace acepción de personas, sino que en toda nación se agrada del que le teme.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El modelo de la encarnación
    "evangelismo-misiones-4-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Jesús, en vez de anunciar la salvación desde lejos?", reverso: "Vino, vivió en un pueblo, habló su lengua y compartió su vida.", apoyo: "Jesús no anunció la salvación desde lejos: vino, vivió en un pueblo, habló su lengua y compartió su vida" },
              { frente: "¿Qué es identificarse con la gente a la que se sirve?", reverso: "Aprender a vivir y a hablar como ella, sin pecar y sin cambiar el evangelio.", apoyo: "Identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio" },
              { frente: "¿Qué camino sigue el misionero, según Filipenses 2?", reverso: "El camino de humildad de Cristo, que tomó forma de siervo.", apoyo: "El misionero sigue ese camino de humildad" },
              { frente: "¿Qué muestra la historia de Rut, la moabita?", reverso: "Lo que es abrazar de corazón a otro pueblo.", apoyo: "Su historia muestra lo que es abrazar de corazón a otro pueblo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dice Juan 1:14 del Verbo?", reverso: "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", apoyo: "«Y aquel Verbo fue hecho carne, y habitó entre nosotros»" },
              { frente: "¿Qué forma tomó Cristo al despojarse a sí mismo?", reverso: "Forma de siervo.", apoyo: "que «se despojó a sí mismo, tomando forma de siervo»" },
              { frente: "¿Cómo se hizo Pablo a los judíos, para ganarlos?", reverso: "Como judío.", apoyo: "Pablo lo aplicó a su vida: «Me he hecho a los judíos como judío, para ganar a los judíos»" },
              { frente: "¿Cómo nos amó Cristo?", reverso: "No a distancia: vino a vivir con nosotros.", apoyo: "Cristo no nos amó a distancia: vino a vivir con nosotros" },
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
            consigna: "¿Cómo es Cristo el modelo del misionero? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cristo", texto: "Cristo", x: 50, y: 8 },
              { id: "siervo", texto: "Forma de siervo", x: 12, y: 42 },
              { id: "nosotros", texto: "Entre nosotros", x: 88, y: 42 },
              { id: "misionero", texto: "El misionero", x: 30, y: 86 },
              { id: "gente", texto: "La gente", x: 78, y: 86 },
            ],
            enlaces: [
              { de: "cristo", a: "siervo", relacion: "tomó" },
              { de: "cristo", a: "nosotros", relacion: "habitó" },
              { de: "misionero", a: "cristo", relacion: "sigue el camino de" },
              { de: "misionero", a: "gente", relacion: "se identifica con" },
            ],
            distractores: ["se aleja de", "manda desde lejos a"],
            apoyo: "La encarnación es el modelo de la misión: el Verbo se hizo carne y habitó entre nosotros, y Cristo se despojó a sí mismo tomando forma de siervo",
            ref: "Filipenses 2:5-7",
            explica: "El Verbo fue hecho carne y habitó entre nosotros, y Cristo se despojó a sí mismo tomando forma de siervo. El misionero sigue ese camino de humildad y se identifica con la gente.",
          },
          {
            consigna: "¿Qué hizo Jesús al venir a nosotros? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "jesus", texto: "Jesús", x: 50, y: 10 },
              { id: "pueblo", texto: "Un pueblo", x: 12, y: 50 },
              { id: "lengua", texto: "Su lengua", x: 88, y: 50 },
              { id: "vida", texto: "Su vida", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "jesus", a: "pueblo", relacion: "vivió en" },
              { de: "jesus", a: "lengua", relacion: "habló" },
              { de: "jesus", a: "vida", relacion: "compartió" },
            ],
            distractores: ["miró desde lejos", "evitó"],
            apoyo: "Jesús no anunció la salvación desde lejos: vino, vivió en un pueblo, habló su lengua y compartió su vida",
            ref: "Juan 1:14",
            explica: "«Y aquel Verbo fue hecho carne, y habitó entre nosotros»: Jesús no anunció la salvación desde lejos, sino que vivió en un pueblo, habló su lengua y compartió su vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "1 Corintios 9:20",
            consigna: "¿Cómo se hizo Pablo a los judíos, y para qué? Toca las palabras que lo dicen.",
            texto: "Me he hecho a los judíos [[como judío]], [[para ganar a los judíos]]",
            apoyo: "Identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio",
            explica: "Pablo se hizo a los judíos como judío, para ganar a los judíos: identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio.",
          },
          {
            ref: "Rut 1:16",
            consigna: "Rut, una moabita, se unió al pueblo de Noemí. ¿Qué dijo de ese pueblo? Toca las palabras que lo dicen.",
            texto: "[[Tu pueblo será mi pueblo]], y tu Dios mi Dios",
            apoyo: "Su historia muestra lo que es abrazar de corazón a otro pueblo",
            explica: "Rut le dijo a Noemí: «Tu pueblo será mi pueblo, y tu Dios mi Dios». Su historia muestra lo que es abrazar de corazón a otro pueblo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio",
            ref: "1 Corintios 9:20",
            titulo: "Los primeros meses en el pueblo",
            relato: [
              "Tu iglesia te envió a servir en un pueblo de otra cultura, lejos de tu ciudad. Allí se habla otra lengua y las familias viven de otra manera.",
              "Un compañero de otra misión te aconseja: Vive aparte, en la ciudad, y ven al pueblo solo para predicar; así no pierdes tiempo.",
              "Tú quieres seguir el ejemplo de Pablo, que se hizo a los judíos como judío.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Dónde decides vivir?",
                opciones: [
                  { texto: "Cerca de la gente, para compartir su vida.", bien: true, explica: "El misionero que se identifica vive cerca de la gente y comparte su vida, como Jesús, que vivió en un pueblo." },
                  { texto: "En la ciudad, y voy al pueblo solo a predicar.", explica: "Así se anuncia desde lejos: Jesús vino, vivió en un pueblo y compartió su vida." },
                  { texto: "Donde esté cómodo, porque el lugar no importa.", explica: "Identificarse empieza por vivir cerca de la gente y compartir su vida." },
                ],
                apoyo: "Vive cerca de la gente y comparte su vida",
                explica: "Jesús no anunció la salvación desde lejos: vino, vivió en un pueblo, habló su lengua y compartió su vida. El misionero sigue ese modelo.",
              },
              {
                tipo: "situacion",
                pregunta: "La lengua del pueblo es difícil, y aprenderla te tomará mucho tiempo. ¿Qué haces?",
                opciones: [
                  { texto: "La aprendo con paciencia, junto con sus costumbres.", bien: true, explica: "El misionero que se identifica aprende la lengua y las costumbres con paciencia." },
                  { texto: "Les pido que ellos aprendan la mía, para que me entiendan.", explica: "Identificarse es aprender a hablar como la gente a la que se sirve, y no al revés." },
                  { texto: "Predico siempre con un traductor, y no la aprendo.", explica: "Un traductor ayuda, pero el misionero que se identifica aprende la lengua con paciencia." },
                ],
                apoyo: "Aprende la lengua y las costumbres con paciencia",
                explica: "Como Pablo, que se hizo a los judíos como judío, el misionero aprende a vivir y a hablar como la gente a la que sirve.",
              },
              {
                tipo: "situacion",
                pregunta: "Un vecino te dice: Si quieres que te escuchen, deja de hablar de Jesús; aquí eso no gusta. ¿Qué haces?",
                opciones: [
                  { texto: "Sigo anunciando el mismo evangelio, en su lengua.", bien: true, explica: "Identificarse es vivir y hablar como la gente, sin pecar y sin cambiar el evangelio." },
                  { texto: "Cambio el mensaje por uno que les guste más a todos.", explica: "El misionero se identifica con la gente sin cambiar el evangelio." },
                  { texto: "Dejo de hablar de Jesús hasta que me acepten bien.", explica: "Identificarse no es callar el evangelio: es vivir y hablar como la gente, sin cambiar el mensaje." },
                ],
                apoyo: "Identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar y sin cambiar el evangelio",
                explica: "El misionero aprende a vivir y a hablar como la gente, pero sin pecar y sin cambiar el evangelio.",
              },
              {
                tipo: "explica",
                apoyo: "Como Pablo, que se hizo a los judíos como judío, el misionero se identifica con la gente: vive cerca, aprende la lengua, escucha y sirve con humildad, sin pecar y sin cambiar el evangelio",
                clave: {
                  id: "pr-evangelismo-misiones-4-2-a4-1",
                  tipo: "corta",
                  pregunta: "Escríbele a tu iglesia cómo te vas a identificar con la gente del pueblo, y qué cuidarás al hacerlo.",
                  ideas: [
                    { id: "cerca", peso: 50, texto: "Viviré cerca de la gente, aprenderé su lengua y sus costumbres, escucharé y serviré con humildad.", formas: ["cerca de (la|ellos|ellas|las|los)", "viv* (con|entre) (ellos|ellas)", "viv* con la gente", "compart* (su|sus) vida*", "aprend* (su|la) (lengua|idioma)", "aprend* (sus|las) costumbres", "escuch*", "humild*"] },
                    { id: "sin", peso: 50, negativa: true, texto: "Sin pecar y sin cambiar el evangelio.", formas: ["sin pecar", "sin cambiar", "no (cambiar|cambiare|cambio|cambiaria) el (evangelio|mensaje)", "no (pecar|pecare|peco)", "mismo evangelio", "mismo mensaje"] },
                  ],
                  errores: [
                    { id: "cambiar", texto: "El misionero se identifica sin cambiar el evangelio.", formas: ["cambi* el (evangelio|mensaje)", "adapt* el (evangelio|mensaje)"], anula: "sin" },
                  ],
                  modelo: "Voy a vivir cerca de la gente y compartir su vida. Aprenderé su lengua y sus costumbres con paciencia, escucharé antes de enseñar y serviré con humildad, pero sin pecar y sin cambiar el evangelio.",
                },
              },
            ],
          },
          {
            apoyo: "Escucha antes de enseñar y aprende de la gente",
            ref: "Filipenses 2:5-7",
            titulo: "Tu primer año en otro país",
            relato: [
              "Acabas de llegar como misionero a otro país, enviado por tu iglesia. La gente es amable, pero todo es distinto: la comida, los horarios y la manera de hablar.",
              "Los líderes de la iglesia del lugar te reciben con mucha ilusión. Tú traes muchas ideas y un plan grande para el primer año.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "En la primera reunión con los líderes del lugar, ¿qué haces?",
                opciones: [
                  { texto: "Escucho antes de enseñar y aprendo de ellos.", bien: true, explica: "El misionero que se identifica escucha antes de enseñar y aprende de la gente." },
                  { texto: "Les presento mi plan y les digo cómo deben hacerlo.", explica: "Así se sirve sintiéndose superior: el misionero escucha antes de enseñar." },
                  { texto: "Les digo qué está mal en su iglesia, para corregirlo.", explica: "El misionero sirve con humildad, sin sentirse superior, y escucha antes de enseñar." },
                ],
                apoyo: "Escucha antes de enseñar y aprende de la gente",
                explica: "Cristo se despojó a sí mismo tomando forma de siervo: el misionero llega a servir y a escuchar.",
              },
              {
                tipo: "situacion",
                pregunta: "Notas que la gente come a otra hora y de otra manera. ¿Qué haces?",
                opciones: [
                  { texto: "Aprendo a vivir como ellos, en lo que no es pecado.", bien: true, explica: "Identificarse es aprender a vivir y a hablar como la gente a la que se sirve, sin pecar." },
                  { texto: "Sigo con mis horarios, porque así lo hago en mi país.", explica: "Pablo se hizo a los judíos como judío: el misionero aprende a vivir como la gente." },
                  { texto: "Les explico que mi manera de comer es la correcta.", explica: "El misionero aprende las costumbres con paciencia y sirve sin sentirse superior." },
                ],
                apoyo: "Aprende la lengua y las costumbres con paciencia",
                explica: "Como Pablo, que se hizo a los judíos como judío, el misionero aprende a vivir como la gente, sin pecar y sin cambiar el evangelio.",
              },
              {
                tipo: "situacion",
                pregunta: "Pasan los meses: tu plan avanza despacio, pero la gente te busca para conversar. ¿Qué haces?",
                opciones: [
                  { texto: "Les doy tiempo, aunque el plan vaya más lento.", bien: true, explica: "El misionero ama a las personas, y no solo los proyectos." },
                  { texto: "Las atiendo poco, para que el plan no se retrase más.", explica: "El misionero ama a las personas, y no solo los proyectos." },
                  { texto: "Me voy a otro lugar donde el plan pueda avanzar más.", explica: "Cristo no nos amó a distancia: vino a vivir con nosotros." },
                ],
                apoyo: "Ama a las personas, y no solo los proyectos",
                explica: "Cristo no nos amó a distancia: vino a vivir con nosotros. El misionero ama a las personas, y no solo los proyectos.",
              },
              {
                tipo: "explica",
                apoyo: "Pablo lo aplicó a su vida: «Me he hecho a los judíos como judío, para ganar a los judíos»",
                clave: {
                  id: "pr-evangelismo-misiones-4-2-a4-2",
                  tipo: "corta",
                  pregunta: "Un amigo te pregunta por qué no vives aparte y solo vas a predicar. ¿Qué le respondes con el ejemplo de Pablo?",
                  ideas: [
                    { id: "pablo", peso: 50, texto: "Pablo se hizo a los judíos como judío, para ganar a los judíos.", formas: ["como judio", "se hizo como", "se hizo a los judios", "hacerme como", "me hago como", "para ganar*", "ganar a los judios"] },
                    { id: "identificar", peso: 50, texto: "Me identifico con la gente: vivo cerca, aprendo su lengua y comparto su vida, sin pecar y sin cambiar el evangelio.", formas: ["identific*", "viv* cerca", "cerca de la gente", "cerca de (ellos|ellas)", "compart* (su|sus) vida*", "aprend* (su|la) (lengua|idioma)", "como (ellos|ellas)", "como la gente"] },
                  ],
                  modelo: "Porque quiero hacer como Pablo, que se hizo a los judíos como judío para ganar a los judíos. Me identifico con la gente: vivo cerca, aprendo su lengua y comparto su vida, sin pecar y sin cambiar el evangelio.",
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
            consigna: "¿Sirve con humildad o se siente superior? Lleva cada frase a su grupo.",
            grupos: ["Sirve con humildad", "Se siente superior"],
            frases: [
              { texto: "Escucha antes de enseñar", grupo: 0 },
              { texto: "Aprende de la gente del lugar", grupo: 0 },
              { texto: "Ama a las personas, y no solo los proyectos", grupo: 0 },
              { texto: "Toma forma de siervo, como Cristo", grupo: 0 },
              { texto: "Llega a corregir todo desde el primer día", grupo: 1 },
              { texto: "Cree que su cultura vale más que la de ellos", grupo: 1 },
              { texto: "Solo se interesa por su proyecto", grupo: 1 },
            ],
            apoyo: "Sirve con humildad, sin sentirse superior",
            explica: "El misionero sigue el camino de humildad de Cristo: escucha antes de enseñar, aprende de la gente y ama a las personas, y no solo los proyectos, sin sentirse superior.",
          },
          {
            consigna: "¿Muestra la humildad de Cristo o no la muestra? Lleva cada frase a su grupo.",
            grupos: ["Muestra humildad", "No muestra humildad"],
            frases: [
              { texto: "Le pide a una anciana del pueblo que le enseñe su lengua", grupo: 0 },
              { texto: "Escucha a los líderes del lugar antes de proponer algo", grupo: 0 },
              { texto: "Visita a un enfermo, aunque eso retrase su proyecto", grupo: 0 },
              { texto: "Se ríe de cómo hablan los del pueblo", grupo: 1 },
              { texto: "Solo trata con los que le sirven para su proyecto", grupo: 1 },
              { texto: "Dice que en su país todo se hace mejor", grupo: 1 },
            ],
            apoyo: "El misionero sigue ese camino de humildad",
            explica: "Cristo se despojó a sí mismo tomando forma de siervo. El misionero lo sigue: aprende de la gente, escucha antes de enseñar y ama a las personas, y no solo los proyectos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una misionera de tu iglesia te escribe: Aquí me piden ayuda con cosas sencillas y pierdo tiempo; yo vine a hacer un gran proyecto.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que ame a las personas, y no solo los proyectos.", bien: true, explica: "El misionero ama a las personas, y no solo los proyectos: Cristo se despojó a sí mismo tomando forma de siervo." },
              { texto: "Que no los atienda, para que su proyecto avance rápido.", explica: "Así el proyecto vale más que la gente; el misionero ama a las personas, y no solo los proyectos." },
              { texto: "Que les explique que ella vino para cosas más grandes.", explica: "Eso es sentirse superior: el misionero sirve con humildad." },
              { texto: "Que vuelva a casa, porque allá no valoran su trabajo.", explica: "Cristo no nos amó a distancia: el misionero sirve cerca de la gente, con humildad." },
            ],
            apoyo: "Ama a las personas, y no solo los proyectos",
            explica: "Cristo se despojó a sí mismo tomando forma de siervo: el misionero sirve con humildad y ama a las personas, y no solo los proyectos.",
          },
          {
            caso: "Un joven del equipo misionero te dice: Yo vine a enseñarles; no tengo nada que aprender de esta gente.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que escuche antes de enseñar y aprenda de la gente.", bien: true, explica: "El misionero que se identifica escucha antes de enseñar y aprende de la gente." },
              { texto: "Que tiene razón: el que enseña no necesita aprender.", explica: "El misionero sirve con humildad: escucha antes de enseñar y aprende de la gente." },
              { texto: "Que enseñe con más fuerza, para que lo respeten desde ya.", explica: "Cristo tomó forma de siervo: el misionero sirve con humildad, sin sentirse superior." },
              { texto: "Que aprenda de ellos solo para corregirlos mejor después.", explica: "Aprender de la gente no es una estrategia para corregirla: es servir con humildad, sin sentirse superior." },
            ],
            apoyo: "Escucha antes de enseñar y aprende de la gente",
            explica: "El misionero sigue el camino de humildad de Cristo: escucha antes de enseñar, aprende de la gente y sirve sin sentirse superior.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La encarnación es el modelo de la misión: el Verbo se hizo carne y habitó entre nosotros, y Cristo se despojó a sí mismo tomando forma de siervo",
            ref: "Juan 1:14",
            clave: {
              id: "pr-evangelismo-misiones-4-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la encarnación de Cristo es el modelo de la misión?",
              ideas: [
                { id: "vino", peso: 50, texto: "El Verbo se hizo carne y habitó entre nosotros: Jesús no anunció la salvación desde lejos, sino que vivió en un pueblo, habló su lengua y compartió su vida.", formas: ["hecho carne", "hizo carne", "se hizo hombre", "habit* entre nosotros", "vivi* entre nosotros", "vino a vivir", "vivio en un pueblo", "hablo su lengua", "compartio su vida", "no (anuncio|amo|predico) desde lejos", "no nos amo a distancia", "no amo a distancia"] },
                { id: "siervo", peso: 50, texto: "Cristo se despojó a sí mismo tomando forma de siervo: el misionero sigue ese camino de humildad y se identifica con la gente.", formas: ["forma de siervo", "despoj*", "siervo", "humild*", "identific*"] },
              ],
              modelo: "Porque el Verbo fue hecho carne y habitó entre nosotros: Jesús no anunció la salvación desde lejos, sino que vivió en un pueblo y habló su lengua. Y se despojó a sí mismo tomando forma de siervo: el misionero sigue ese camino de humildad.",
            },
          },
          {
            apoyo: "Cristo no nos amó a distancia: vino a vivir con nosotros",
            ref: "Juan 1:14",
            clave: {
              id: "pr-evangelismo-misiones-4-2-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la misión se puede hacer toda desde lejos, sin ir a vivir con la gente. ¿Qué le respondes con el ejemplo de Cristo?",
              ideas: [
                { id: "cerca", peso: 50, texto: "Cristo no nos amó a distancia: el Verbo se hizo carne y vino a vivir con nosotros.", formas: ["hecho carne", "hizo carne", "se hizo hombre", "habit* entre nosotros", "vivi* entre nosotros", "vino a vivir", "vivio en un pueblo", "hablo su lengua", "compartio su vida", "no (anuncio|amo|predico) desde lejos", "no nos amo a distancia", "no amo a distancia"] },
                { id: "misionero", peso: 50, texto: "Por eso el misionero se identifica con la gente: vive cerca, aprende su lengua y comparte su vida.", formas: ["identific*", "viv* cerca", "cerca de la gente", "cerca de (ellos|ellas)", "viv* (con|entre) (ellos|ellas)", "aprend* (su|la) (lengua|idioma)", "compart* (su|sus) vida*"] },
              ],
              modelo: "Le respondo que Cristo no nos amó a distancia: el Verbo se hizo carne y vino a vivir con nosotros. Por eso el misionero se identifica con la gente: vive cerca de ella, aprende su lengua y comparte su vida.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. El evangelio y la cultura
    "evangelismo-misiones-4-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué riesgo tiene la misión, según la lección?", reverso: "Llevar, junto con el evangelio, las costumbres propias como si fueran parte de él.", apoyo: "Un riesgo de la misión es llevar, junto con el evangelio, las costumbres propias como si fueran parte de él" },
              { frente: "¿Qué se preguntó la iglesia en el concilio de Jerusalén?", reverso: "Si los gentiles debían hacerse judíos para seguir a Cristo.", apoyo: "La iglesia se preguntó si los gentiles debían hacerse judíos para seguir a Cristo" },
              { frente: "¿Qué propuso Jacobo en el concilio?", reverso: "Que no se inquietara a los gentiles que se convierten, y pedirles solo lo necesario.", apoyo: "Jacobo propuso «que no se inquiete a los gentiles que se convierten a Dios», y pedirles solo lo necesario" },
              { frente: "¿Qué es la medida de todas las culturas?", reverso: "La Escritura.", apoyo: "La Escritura es la medida de todas las culturas" },
            ],
          },
          {
            tarjetas: [
              { frente: "En Cristo, ¿qué pasa con las diferencias entre judío y griego?", reverso: "Ya no separan: todos son uno en Cristo Jesús.", apoyo: "En Cristo, las diferencias no separan" },
              { frente: "¿Puede una iglesia ser de cualquier cultura?", reverso: "Sí, sin dejar de ser de Cristo.", apoyo: "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo" },
              { frente: "¿Qué se hace con lo que manda o prohíbe la Biblia?", reverso: "Se obedece en toda cultura.", apoyo: "¿Lo manda o lo prohíbe la Biblia? Entonces se obedece en toda cultura" },
              { frente: "¿Qué se hace con lo que es solo una costumbre del misionero?", reverso: "No se impone.", apoyo: "¿Es solo una costumbre del misionero, como un estilo de música, de ropa o de culto? Entonces no se impone" },
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
            consigna: "Sobre el concilio de Jerusalén: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La iglesia se preguntó si los gentiles debían hacerse judíos para seguir a Cristo.", verdad: true, explica: "Esa fue la pregunta que resolvió el concilio de Jerusalén.", apoyo: "La iglesia se preguntó si los gentiles debían hacerse judíos para seguir a Cristo", ref: "Hechos 15:19-20" },
              { texto: "El concilio decidió que los gentiles tenían que adoptar las costumbres judías.", verdad: false, explica: "El concilio decidió no inquietar a los gentiles con las costumbres judías.", apoyo: "El concilio de Jerusalén decidió no inquietar a los gentiles con las costumbres judías" },
              { texto: "Jacobo propuso pedirles a los gentiles solo lo necesario.", verdad: true, explica: "Jacobo propuso «que no se inquiete a los gentiles que se convierten a Dios», y pedirles solo lo necesario.", apoyo: "Jacobo propuso «que no se inquiete a los gentiles que se convierten a Dios», y pedirles solo lo necesario", ref: "Hechos 15:19-20" },
            ],
          },
          {
            consigna: "Sobre el evangelio y la cultura: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El evangelio exige cambiar de cultura para poder seguir a Cristo.", verdad: false, explica: "El evangelio no exige cambiar de cultura, sino seguir a Cristo.", apoyo: "el evangelio no exige cambiar de cultura, sino seguir a Cristo" },
              { texto: "En Cristo ya no hay judío ni griego: todos son uno en él.", verdad: true, explica: "«Ya no hay judío ni griego», porque «todos vosotros sois uno en Cristo Jesús».", apoyo: "En Cristo, las diferencias no separan", ref: "Gálatas 3:28" },
              { texto: "Una iglesia deja de ser de Cristo si conserva su propia cultura.", verdad: false, explica: "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo.", apoyo: "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo" },
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
            consigna: "¿Es parte del evangelio o es solo una costumbre del misionero? Lleva cada frase a su grupo.",
            grupos: ["Parte del evangelio", "Costumbre del misionero"],
            frases: [
              { texto: "Seguir a Cristo", grupo: 0 },
              { texto: "Ser uno en Cristo con los de otra cultura", grupo: 0 },
              { texto: "Obedecer lo que manda la Biblia", grupo: 0 },
              { texto: "Un estilo de música para el culto", grupo: 1 },
              { texto: "La ropa que se usa para ir al culto", grupo: 1 },
              { texto: "El orden del culto de la iglesia que lo envió", grupo: 1 },
            ],
            apoyo: "el evangelio no exige cambiar de cultura, sino seguir a Cristo, y en él todos somos uno",
            explica: "El evangelio no exige cambiar de cultura, sino seguir a Cristo, y en él todos somos uno. Un estilo de música, de ropa o de culto es solo una costumbre del misionero: no se impone.",
          },
          {
            consigna: "Un misionero empieza una iglesia en otro país. ¿Lo pide en toda cultura o no lo impone? Lleva cada frase a su grupo.",
            grupos: ["Se pide en toda cultura", "No se impone"],
            frases: [
              { texto: "Que sigan a Cristo", grupo: 0 },
              { texto: "Que obedezcan lo que manda la Biblia", grupo: 0 },
              { texto: "Que dejen lo que la Biblia prohíbe", grupo: 0 },
              { texto: "Que canten con la música del país del misionero", grupo: 1 },
              { texto: "Que se vistan como en la iglesia del misionero", grupo: 1 },
              { texto: "Que el culto sea igual que en la iglesia del misionero", grupo: 1 },
            ],
            apoyo: "¿Es solo una costumbre del misionero, como un estilo de música, de ropa o de culto? Entonces no se impone",
            explica: "Lo que la Biblia manda o prohíbe se obedece en toda cultura; lo que es solo costumbre del misionero, como un estilo de música, de ropa o de culto, no se impone.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pregunta para distinguir con lo que se hace cuando la respuesta es sí.",
            pares: [
              ["¿Lo manda o lo prohíbe la Biblia?", "Se obedece en toda cultura"],
              ["¿Es solo una costumbre del misionero?", "No se impone"],
              ["¿Es una costumbre del pueblo que no contradice la Palabra?", "Se puede conservar, y aun usar para adorar a Dios"],
            ],
            apoyo: "Para distinguir, se pregunta si algo lo manda la Biblia, si es solo una costumbre del misionero o si es una costumbre del pueblo que no contradice la Palabra",
            explica: "Lo que manda o prohíbe la Biblia se obedece en toda cultura; lo que es solo costumbre del misionero no se impone; y la costumbre del pueblo que no contradice la Palabra se puede conservar, y aun usar para adorar a Dios.",
          },
          {
            consigna: "En una iglesia nueva de otra cultura, une cada caso con lo que se hace.",
            pares: [
              ["Una costumbre del pueblo que la Biblia prohíbe", "Se deja, como manda la Palabra"],
              ["El estilo de música que trajo el misionero", "No se le impone a la iglesia nueva"],
              ["Una costumbre del pueblo que no contradice la Palabra", "Se puede conservar, y aun usar para adorar a Dios"],
              ["La Escritura", "Es la medida de todas las culturas"],
            ],
            apoyo: "La Escritura es la medida de todas las culturas",
            explica: "Lo que la Biblia prohíbe se deja, aunque sea costumbre del pueblo; la costumbre del misionero no se impone; y la del pueblo que no contradice la Palabra se puede conservar. La Escritura es la medida de todas las culturas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el evangelio y las costumbres tiene un error. Tócala.",
            frases: [
              "Un riesgo de la misión es llevar las costumbres propias como si fueran el evangelio.",
              "Lo que manda o prohíbe la Biblia se obedece en toda cultura.",
              "Lo que es solo costumbre del misionero se le impone a la iglesia nueva.",
              "La Escritura es la medida de todas las culturas.",
            ],
            malo: 2,
            correccion: "Lo que es solo costumbre del misionero, como un estilo de música, de ropa o de culto, no se impone.",
            apoyo: "¿Es solo una costumbre del misionero, como un estilo de música, de ropa o de culto? Entonces no se impone",
            explica: "El misionero distingue: lo que la Biblia manda se obedece en toda cultura, y lo que es solo su costumbre no se impone.",
          },
          {
            consigna: "Una de estas frases sobre el evangelio y las costumbres del misionero tiene un error. Tócala.",
            frases: [
              "Un riesgo de la misión es confundir las costumbres propias con el evangelio.",
              "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo.",
              "El misionero debe llevar su estilo de culto, porque es parte del evangelio.",
              "En Cristo, las diferencias entre los pueblos no separan.",
            ],
            malo: 2,
            correccion: "Un estilo de culto es solo una costumbre del misionero: no es parte del evangelio, y no se impone.",
            apoyo: "Un riesgo de la misión es llevar, junto con el evangelio, las costumbres propias como si fueran parte de él",
            explica: "El evangelio no es de ninguna cultura, y es para todas: un estilo de música, de ropa o de culto es solo una costumbre del misionero.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La Escritura es la medida de todas las culturas",
            ref: "Hechos 15:19-20",
            titulo: "La iglesia nueva del valle",
            relato: [
              "Tu equipo misionero acompaña a una iglesia nueva en un pueblo de otra cultura. Los creyentes te traen preguntas sobre sus costumbres.",
              "En el pueblo se canta con tambores propios del lugar, y cuando nace un hijo, la familia invita a comer a todos los vecinos. También es costumbre pedirle protección a un ídolo antes de sembrar.",
              "Un hermano que vino contigo dice que en el culto solo se deben cantar los himnos de tu iglesia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen con los tambores del lugar en el culto?",
                opciones: [
                  { texto: "Se pueden usar para adorar a Dios: no contradicen la Palabra.", bien: true, explica: "Una costumbre del pueblo que no contradice la Palabra se puede conservar, y aun usar para adorar a Dios." },
                  { texto: "Se prohíben, porque no son los instrumentos de tu propia iglesia.", explica: "Eso es imponer la costumbre del misionero: un estilo de música no se impone." },
                  { texto: "Se usan, pero solo fuera del culto, para que no se mezclen con él.", explica: "Una costumbre del pueblo que no contradice la Palabra se puede usar aun para adorar a Dios." },
                ],
                apoyo: "¿Es una costumbre del pueblo que no contradice la Palabra? Entonces se puede conservar, y aun usar para adorar a Dios",
                explica: "Los tambores son una costumbre del pueblo que no contradice la Palabra: se pueden conservar, y aun usar para adorar a Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y la comida para todos los vecinos cuando nace un hijo?",
                opciones: [
                  { texto: "Se conserva: es una costumbre que no contradice la Palabra.", bien: true, explica: "Lo que es del pueblo y no contradice la Palabra se puede conservar." },
                  { texto: "Se cambia por una reunión como las de la iglesia del misionero.", explica: "Eso impone la costumbre del misionero: lo que no contradice la Palabra se puede conservar." },
                  { texto: "Se suspende hasta que el misionero diga si la aprueba o no.", explica: "La medida es la Escritura, no el gusto del misionero: lo que no contradice la Palabra se puede conservar." },
                ],
                apoyo: "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo",
                explica: "Invitar a los vecinos a comer es una costumbre del pueblo que no contradice la Palabra: se puede conservar. Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y pedirle protección al ídolo antes de sembrar?",
                opciones: [
                  { texto: "Se deja: la Biblia lo prohíbe, y eso se obedece en toda cultura.", bien: true, explica: "Lo que la Biblia manda o prohíbe se obedece en toda cultura." },
                  { texto: "Se conserva, porque es parte de su cultura y hay que respetarla siempre.", explica: "Ese es el otro extremo: aceptar todo lo de una cultura, también lo que contradice la Palabra." },
                  { texto: "Se deja solo si todo el pueblo está de acuerdo en que hay que dejarlo.", explica: "Lo que la Biblia prohíbe se obedece en toda cultura: la medida es la Escritura." },
                ],
                apoyo: "¿Lo manda o lo prohíbe la Biblia? Entonces se obedece en toda cultura",
                explica: "La Escritura es la medida de todas las culturas: lo que la Biblia prohíbe se obedece en toda cultura, aunque sea una costumbre del pueblo.",
              },
              {
                tipo: "explica",
                apoyo: "¿Es solo una costumbre del misionero, como un estilo de música, de ropa o de culto? Entonces no se impone",
                clave: {
                  id: "pr-evangelismo-misiones-4-3-a6-1",
                  tipo: "corta",
                  pregunta: "¿Qué le dices al hermano que quiere que en el culto solo se canten los himnos de tu iglesia?",
                  ideas: [
                    { id: "costumbre", peso: 50, negativa: true, texto: "Que un estilo de música es solo una costumbre del misionero: no se impone.", formas: ["no se impone", "no (debemos|podemos|tenemos) imponer*", "no hay que imponer*", "sin imponer*", "solo (una|es) costumbre", "costumbre del misionero", "costumbre de (nuestra|mi|tu) iglesia", "estilo de musica"] },
                    { id: "evangelio", peso: 50, texto: "El evangelio no exige cambiar de cultura, sino seguir a Cristo: la música del pueblo que no contradice la Palabra puede servir para adorar a Dios.", formas: ["no exige cambiar", "seguir a cristo", "adorar a dios", "no contradice", "cualquier cultura", "uno en cristo", "para adorar", "pueden usar*", "se pueden usar*"] },
                  ],
                  errores: [
                    { id: "imponer", texto: "Lo que es solo costumbre del misionero no se impone.", formas: ["hay que imponer*", "deb* imponer*", "se impone"], anula: "costumbre" },
                  ],
                  modelo: "Le digo que un estilo de música es solo una costumbre del misionero, y que no se impone. El evangelio no exige cambiar de cultura, sino seguir a Cristo, y los tambores del pueblo pueden servir para adorar a Dios.",
                },
              },
            ],
          },
          {
            apoyo: "Para distinguir, se pregunta si algo lo manda la Biblia, si es solo una costumbre del misionero o si es una costumbre del pueblo que no contradice la Palabra",
            ref: "Gálatas 3:28",
            titulo: "Las costumbres de la costa",
            relato: [
              "Te piden ayudar a una iglesia nueva en otro país. Sus creyentes vienen de un pueblo de la costa, con costumbres muy distintas a las tuyas.",
              "Allí, en toda reunión hablan primero los ancianos, y la gente se viste con telas de colores propias del lugar. También es costumbre que, cuando un hombre muere, sus hermanos se queden con la tierra de la viuda.",
              "Un misionero de otra iglesia les dijo que, para ser buenos cristianos, deben vestirse como en su país.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen con la costumbre de que los ancianos hablen primero?",
                opciones: [
                  { texto: "Se conserva: honrar a los mayores no contradice la Palabra.", bien: true, explica: "Una costumbre del pueblo que no contradice la Palabra se puede conservar." },
                  { texto: "Se cambia, para que las reuniones se hagan como en tu iglesia.", explica: "Eso es imponer la costumbre del misionero como si fuera el evangelio." },
                  { texto: "Se prohíbe, porque todo lo de su cultura le estorba a la fe.", explica: "El evangelio no exige cambiar de cultura, sino seguir a Cristo." },
                ],
                apoyo: "¿Es una costumbre del pueblo que no contradice la Palabra? Entonces se puede conservar, y aun usar para adorar a Dios",
                explica: "Que hablen primero los ancianos es una costumbre del pueblo que no contradice la Palabra: se puede conservar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y la ropa de colores del lugar?",
                opciones: [
                  { texto: "Se conserva: es su manera de vestir, y no va contra la Palabra.", bien: true, explica: "La ropa del lugar no contradice la Palabra; vestirse como en el país del misionero es solo una costumbre suya." },
                  { texto: "Se cambia por la ropa del país del misionero, como les dijeron.", explica: "Vestirse como en el país del misionero es solo una costumbre del misionero: no se impone." },
                  { texto: "Se usa en la casa, pero nunca para ir a las reuniones de la iglesia.", explica: "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo." },
                ],
                apoyo: "Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo",
                explica: "Lo que es solo costumbre del misionero no se impone: una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y que los hermanos del difunto se queden con la tierra de la viuda?",
                opciones: [
                  { texto: "Se deja: contradice la Palabra, aunque sea costumbre del pueblo.", bien: true, explica: "Lo que contradice la Palabra no se acepta, aunque sea de la cultura: la Escritura es la medida." },
                  { texto: "Se conserva, porque es su cultura y no hay que juzgarla nunca.", explica: "Ese es el otro extremo: aceptar todo lo de una cultura, también lo que contradice la Palabra." },
                  { texto: "Se deja solo si los hermanos del difunto están de acuerdo con eso.", explica: "La medida es la Escritura, no lo que decidan los hermanos del difunto." },
                ],
                apoyo: "El otro es aceptar todo lo de una cultura, también lo que contradice la Palabra",
                explica: "Quitarle la tierra a la viuda es una injusticia que contradice la Palabra. La Escritura es la medida de todas las culturas.",
              },
              {
                tipo: "explica",
                apoyo: "Para distinguir, se pregunta si algo lo manda la Biblia, si es solo una costumbre del misionero o si es una costumbre del pueblo que no contradice la Palabra",
                clave: {
                  id: "pr-evangelismo-misiones-4-3-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué tres preguntas usaste para decidir sobre esas costumbres?",
                  ideas: [
                    { id: "biblia", peso: 34, texto: "¿Lo manda o lo prohíbe la Biblia? Entonces se obedece en toda cultura.", formas: ["manda", "mandan", "prohib*", "obedec*"] },
                    { id: "misionero", peso: 33, texto: "¿Es solo una costumbre del misionero? Entonces no se impone.", formas: ["costumbre del misionero", "costumbres del misionero", "del misionero", "no se impone", "impon*"] },
                    { id: "pueblo", peso: 33, texto: "¿Es una costumbre del pueblo que no contradice la Palabra? Entonces se puede conservar.", formas: ["costumbre del pueblo", "costumbres del pueblo", "del pueblo", "no contradice", "conserv*"] },
                  ],
                  modelo: "Primero, si la Biblia lo manda o lo prohíbe: entonces se obedece en toda cultura. Segundo, si es solo una costumbre del misionero: entonces no se impone. Tercero, si es una costumbre del pueblo que no contradice la Palabra: entonces se puede conservar.",
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
            apoyo: "Un riesgo de la misión es llevar, junto con el evangelio, las costumbres propias como si fueran parte de él",
            ref: "Hechos 15:19-20",
            clave: {
              id: "pr-evangelismo-misiones-4-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué riesgo corre el misionero al llevar el evangelio a otro pueblo, y cómo distingue el evangelio de sus propias costumbres?",
              ideas: [
                { id: "riesgo", peso: 50, texto: "El riesgo es llevar sus costumbres propias como si fueran parte del evangelio, e imponerlas.", formas: ["como si fueran", "confund*", "impon* (sus|su|nuestras|las|mis) (costumbres|cultura)", "costumbres propias", "parte del evangelio", "mezcl*"] },
                { id: "distinguir", peso: 50, texto: "Lo que la Biblia manda o prohíbe se obedece en toda cultura; lo que es solo costumbre del misionero no se impone.", formas: ["manda la biblia", "biblia manda", "lo manda", "prohib*", "se obedece", "obedec*", "no se impone", "solo (una|es) costumbre", "no exige cambiar", "seguir a cristo"] },
              ],
              errores: [
                { id: "imponer", texto: "Lo que es solo una costumbre del misionero no se impone.", formas: ["hay que imponer*", "deb* imponer*"], anula: "distinguir" },
              ],
              modelo: "El riesgo es llevar sus costumbres propias como si fueran parte del evangelio. Para distinguir, se pregunta: lo que la Biblia manda o prohíbe se obedece en toda cultura, pero lo que es solo costumbre del misionero no se impone.",
            },
          },
          {
            apoyo: "El evangelio no es de ninguna cultura, y es para todas",
            ref: "Gálatas 3:28",
            clave: {
              id: "pr-evangelismo-misiones-4-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que los creyentes de otro país tienen que hacer el culto igual que nosotros para ser de verdad cristianos. ¿Qué le respondes?",
              ideas: [
                { id: "cultura", peso: 50, negativa: true, texto: "El evangelio no exige cambiar de cultura, sino seguir a Cristo: una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo.", formas: ["no exige cambiar", "no (tienen|necesitan|deben) cambiar", "no hace falta cambiar", "cualquier cultura", "sin dejar de ser", "seguir a cristo", "ninguna cultura", "para todas"] },
                { id: "costumbre", peso: 50, negativa: true, texto: "Un estilo de culto es solo una costumbre del misionero: no se impone.", formas: ["solo una costumbre", "solo (es|son) (una|costumbre*)", "costumbre del misionero", "costumbre de (nuestra|mi) iglesia", "nuestra costumbre", "nuestras costumbres", "no se impone", "no (podemos|debemos) imponer*", "no se (debe|puede) imponer*", "no hay que imponer*", "sin imponer*", "costumbre nuestra", "costumbres nuestras", "estilo de culto"] },
              ],
              errores: [
                { id: "igual", texto: "Lo que es solo costumbre del misionero no se impone.", formas: ["tienen que (hacer|ser) (igual|iguales|como)", "deben (hacer|ser) (igual|iguales|como)", "hay que imponer*", "deb* imponer*", "tiene razon"], anula: "costumbre" },
                { id: "cambiar", texto: "El evangelio no exige cambiar de cultura, sino seguir a Cristo.", formas: ["exige cambiar", "tienen que cambiar", "deben cambiar"], anula: "cultura" },
              ],
              modelo: "Le respondo que el evangelio no es de ninguna cultura y no exige cambiar de cultura, sino seguir a Cristo. Una iglesia puede ser de cualquier cultura sin dejar de ser de Cristo. Nuestro estilo de culto es solo una costumbre: no se impone.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La Biblia en la lengua del corazón
    "evangelismo-misiones-4-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué lengua le habla al corazón a una persona?", reverso: "La de su casa y de su infancia.", apoyo: "hay una lengua que le habla al corazón: la de su casa y de su infancia" },
              { frente: "¿Por qué viene la fe, según Romanos 10:17?", reverso: "Es «por el oír, y el oír, por la palabra de Dios».", apoyo: "«Así que la fe es por el oír, y el oír, por la palabra de Dios»" },
              { frente: "¿Qué hace falta para oír de verdad?", reverso: "Entender.", apoyo: "Y para oír de verdad, hace falta entender" },
              { frente: "¿Qué hacían al leer la ley al pueblo en tiempos de Esdras?", reverso: "La leían claramente y ponían el sentido.", apoyo: "Cuando se leyó la ley al pueblo en tiempos de Esdras, «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué fue la Biblia del Oso, publicada en 1569?", reverso: "La primera Biblia completa traducida al español desde los idiomas originales.", apoyo: "En 1569, Casiodoro de Reina publicó la primera Biblia completa traducida al español desde los idiomas originales, conocida como la Biblia del Oso" },
              { frente: "¿Qué publicó Cipriano de Valera en 1602?", reverso: "Su revisión de la Biblia de Casiodoro de Reina.", apoyo: "En 1602, Cipriano de Valera publicó su revisión" },
              { frente: "¿Qué es leer la Biblia en tu propia lengua?", reverso: "Un regalo que costó años de trabajo y sacrificio.", apoyo: "Leer la Biblia en tu lengua es un regalo que costó años de trabajo y sacrificio" },
              { frente: "¿Tienen ya todos los pueblos la Biblia completa en su lengua?", reverso: "No: todavía hay pueblos que no la tienen.", apoyo: "Todavía hay pueblos que no tienen la Biblia completa en su propia lengua" },
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
            consigna: "Completa qué lengua le habla al corazón.",
            texto: "Una persona puede entender un idioma aprendido, pero hay una lengua que le habla al [[corazón]]: la de su [[casa]] y de su [[infancia]].",
            distractores: ["orgullo", "escuela", "vejez"],
            errores: {
              orgullo: "La lengua de la casa y de la infancia le habla al corazón.",
              escuela: "Un idioma aprendido se puede entender, pero la lengua que le habla al corazón es la de su casa.",
              vejez: "Es la lengua de su casa y de su infancia.",
            },
            apoyo: "Una persona puede entender un idioma aprendido, pero hay una lengua que le habla al corazón: la de su casa y de su infancia",
            explica: "Una persona puede entender un idioma aprendido, pero la lengua que le habla al corazón es la de su casa y de su infancia: por eso el misionero comunica en ella.",
          },
          {
            consigna: "Completa por qué el misionero comunica en la lengua del corazón.",
            texto: "La fe es por el oír, y para oír de verdad hace falta [[entender]]: por eso el misionero comunica en la [[lengua]] del [[corazón]].",
            distractores: ["repetir", "música", "templo"],
            errores: {
              repetir: "Para oír de verdad hace falta entender, y no solo repetir.",
              "música": "El misionero comunica en la lengua del corazón: la de la casa y de la infancia.",
              templo: "La lengua que le habla al corazón es la de la casa y de la infancia, no la del templo.",
            },
            apoyo: "La fe es por el oír, y para oír hay que entender: como los que ponían el sentido para que el pueblo entendiera, el misionero comunica en la lengua del corazón",
            explica: "«Así que la fe es por el oír, y el oír, por la palabra de Dios», y para oír de verdad hace falta entender: por eso el misionero comunica en la lengua del corazón.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un misionero de tu iglesia te escribe: Aquí la gente entiende el idioma que aprendió en la escuela; ¿para qué aprender la lengua de sus casas?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la lengua de su casa y de su infancia les habla al corazón.", bien: true, explica: "Una persona puede entender un idioma aprendido, pero hay una lengua que le habla al corazón: la de su casa y de su infancia." },
              { texto: "Que tiene razón: si ya entienden algo, no hace falta aprender otra.", explica: "Entender un idioma aprendido no es lo mismo: la lengua de la casa y de la infancia les habla al corazón." },
              { texto: "Que use siempre un traductor, y así no pierde tiempo en aprenderla.", explica: "Un traductor ayuda, pero el misionero aprende la lengua de la gente, aunque cueste años." },
              { texto: "Que les pida que mejoren el idioma de la escuela para entenderlo.", explica: "El misionero es el que aprende la lengua de la gente: así comunica en la lengua del corazón." },
            ],
            apoyo: "Una persona puede entender un idioma aprendido, pero hay una lengua que le habla al corazón: la de su casa y de su infancia",
            explica: "Para oír de verdad hace falta entender. Por eso el misionero aprende la lengua de la gente, aunque cueste años: la de su casa y de su infancia les habla al corazón.",
          },
          {
            caso: "Un líder de jóvenes te dice: Las familias nuevas del barrio hablan otra lengua; si quieren oír el evangelio, que aprendan la nuestra.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la fe es por el oír, y para oír de verdad hay que entender.", bien: true, explica: "La fe es por el oír, y para oír de verdad hace falta entender: el evangelio se anuncia en la lengua que le habla al corazón." },
              { texto: "Que tiene razón: el que quiera oír el evangelio debe aprender nuestra lengua.", explica: "Para oír de verdad hay que entender: el misionero es el que aprende la lengua de la gente." },
              { texto: "Que las invite igual, aunque no entiendan nada de lo que se dice.", explica: "Invitarlas está bien, pero para oír de verdad hace falta entender." },
              { texto: "Que espere a que aprendan nuestra lengua antes de hablarles de Cristo.", explica: "La fe es por el oír, y para oír hay que entender: se les anuncia en su lengua." },
            ],
            apoyo: "Y para oír de verdad, hace falta entender",
            explica: "«Así que la fe es por el oír, y el oír, por la palabra de Dios». Y para oír de verdad hace falta entender: por eso el evangelio se anuncia en la lengua de cada pueblo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la Biblia en español tiene un error. Tócala.",
            frases: [
              "En 1569, Casiodoro de Reina publicó la primera Biblia completa traducida al español.",
              "Esa Biblia se tradujo desde los idiomas originales y se conoce como la Biblia del Oso.",
              "En 1602, Cipriano de Valera publicó su revisión.",
              "Hoy ya no queda ningún pueblo sin la Biblia completa en su lengua.",
            ],
            malo: 3,
            correccion: "Todavía hay pueblos que no tienen la Biblia completa en su propia lengua.",
            apoyo: "Todavía hay pueblos que no tienen la Biblia completa en su propia lengua",
            explica: "De ese trabajo de Reina y de Valera viene la Reina-Valera que leemos hoy, pero todavía hay pueblos que esperan la Biblia en su lengua.",
          },
          {
            consigna: "Una de estas frases sobre el valor de traducir la Biblia tiene un error. Tócala.",
            frases: [
              "Leer la Biblia en tu lengua es un regalo que costó años de trabajo y sacrificio.",
              "En 1602, Casiodoro de Reina publicó una revisión de su propia Biblia.",
              "La Reina-Valera que leemos hoy viene del trabajo de Reina y de Valera.",
              "Apoyar la traducción de la Biblia es parte de comunicar el mensaje.",
            ],
            malo: 1,
            correccion: "En 1602, el que publicó la revisión fue Cipriano de Valera; Casiodoro de Reina había publicado la Biblia en 1569.",
            apoyo: "La Biblia en español nació del trabajo de Casiodoro de Reina, que la publicó en 1569, y de la revisión de Cipriano de Valera en 1602",
            explica: "Casiodoro de Reina publicó la Biblia del Oso en 1569, y Cipriano de Valera su revisión en 1602. Leer la Biblia en tu lengua es un regalo que costó años de trabajo y sacrificio.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Comunicar bien es lograr que la gente entienda",
            ref: "Nehemías 8:8",
            situacion: "Te invitaron a compartir el evangelio con unos jóvenes del barrio que nunca fueron a una iglesia. Estás preparando lo que vas a decir.",
            escenas: [
              {
                id: "e1",
                narra: "Tu primer borrador está lleno de palabras que solo se usan en la iglesia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo cambias por palabras e historias que ellos entiendan.", valor: 2, explica: "El misionero usa palabras, ejemplos e historias que la gente entienda: así pone el sentido, como en tiempos de Esdras.", siguiente: "e2" },
                  { texto: "Lo dejas así, porque lo importante es decir las palabras correctas.", valor: 0, explica: "Comunicar bien es lograr que la gente entienda, y no solo decir las palabras.", siguiente: "e1b" },
                  { texto: "Lo dejas igual, pero agregas al final una lista con las palabras.", valor: 1, explica: "Explicar las palabras ayuda, pero es mejor usar desde el principio palabras e historias que entiendan.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al empezar, notas que los jóvenes se miran entre ellos sin entender.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Te detienes y lo explicas con un ejemplo de su vida.", valor: 2, explica: "Como en tiempos de Esdras, se pone el sentido para que la gente entienda.", siguiente: "e2" },
                  { texto: "Sigues igual, porque ya preparaste todo de esa manera.", valor: 0, explica: "Comunicar bien es lograr que la gente entienda.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Lees con ellos un pasaje de la Biblia.",
                pregunta: "¿Cómo lo lees?",
                opciones: [
                  { texto: "Claramente, y explicas el sentido para que lo entiendan.", valor: 2, explica: "En tiempos de Esdras «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura»." },
                  { texto: "Rápido, para que alcance el tiempo y leer más capítulos.", valor: 0, explica: "Leer mucho sin entender no ayuda: comunicar bien es lograr que la gente entienda." },
                  { texto: "Despacio, pero sin explicar nada de lo que acabas de leer.", valor: 1, explica: "Leer claramente está bien; además, se pone el sentido para que entiendan la lectura." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, quieres saber si te entendieron.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les pides que digan con sus palabras lo que entendieron.", valor: 2, explica: "El misionero comprueba lo que la gente entendió, y no solo lo que se dijo." },
                  { texto: "Das por hecho que entendieron, porque lo dijiste claro.", valor: 0, explica: "Hay que comprobar lo que la gente entendió, y no solo lo que se dijo." },
                  { texto: "Les preguntas si les gustó la reunión de hoy, y te despides.", valor: 1, explica: "Saber si les gustó ayuda, pero lo importante es comprobar lo que entendieron." },
                ],
              },
            ],
          },
          {
            apoyo: "Comprobar lo que la gente entendió, y no solo lo que se dijo",
            ref: "Nehemías 8:8",
            situacion: "Eres misionero en otro país y ya hablas la lengua del lugar. El pastor de una iglesia del pueblo te pide que enseñes el domingo.",
            escenas: [
              {
                id: "e1",
                narra: "Preparas la enseñanza con los ejemplos que usas siempre en tu país.",
                pregunta: "¿Qué haces con esos ejemplos?",
                opciones: [
                  { texto: "Buscas ejemplos e historias de la vida de ese pueblo.", valor: 2, explica: "Se usan palabras, ejemplos e historias que la gente entienda.", siguiente: "e2" },
                  { texto: "Los usas igual: si sirvieron en tu país, servirán también aquí.", valor: 0, explica: "Lo que se entiende en tu país puede no entenderse allí: se usan ejemplos e historias que la gente entienda.", siguiente: "e1b" },
                  { texto: "Usas algunos tuyos y otros del lugar, sin revisar si se entienden.", valor: 1, explica: "Los del lugar ayudan; también hay que revisar que la gente entienda cada ejemplo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Al contar uno de tus ejemplos, la gente se queda callada y confundida.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo cambias por una historia que conozcan, y sigues.", valor: 2, explica: "Comunicar bien es lograr que la gente entienda.", siguiente: "e2" },
                  { texto: "Lo repites igual, hasta que alguno de ellos lo entienda.", valor: 0, explica: "Repetir lo que no se entiende no ayuda: se usan ejemplos e historias que la gente entienda.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Mientras enseñas, una anciana te pregunta qué quiere decir una palabra que usaste.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le explicas el sentido con palabras sencillas.", valor: 2, explica: "Como en tiempos de Esdras, se pone el sentido para que la gente entienda." },
                  { texto: "Le dices que ya lo entenderá después, y sigues adelante.", valor: 0, explica: "Comunicar bien es lograr que la gente entienda." },
                  { texto: "Le pides que no interrumpa, para no perder el hilo.", valor: 0, explica: "Su pregunta te ayuda a comprobar lo que la gente entendió, y no solo lo que se dijo." },
                ],
              },
              {
                id: "e3",
                narra: "Después del culto, el pastor te pregunta cómo seguir enseñando cuando tú ya no estés.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Formar líderes del pueblo que enseñen la Biblia en su lengua.", valor: 2, explica: "Se apoya la traducción de la Biblia y la formación de líderes que la enseñen en su lengua." },
                  { texto: "Que esperen a que tú vuelvas, para que nadie se equivoque al enseñar.", valor: 0, explica: "La obra sigue con líderes que enseñen la Biblia en su propia lengua." },
                  { texto: "Que lean la Biblia en tu idioma, porque así se entiende mejor.", valor: 0, explica: "El misionero comunica en la lengua del corazón, y apoya que la Biblia se enseñe en la lengua del pueblo." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Leer la Biblia en tu lengua es un regalo que costó años de trabajo y sacrificio",
            ref: "Romanos 10:17",
            clave: {
              id: "pr-evangelismo-misiones-4-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué nos enseña la historia de la Biblia en español sobre el valor de traducir la Biblia?",
              ideas: [
                { id: "historia", peso: 50, texto: "Casiodoro de Reina publicó en 1569 la primera Biblia completa en español, desde los idiomas originales, y Cipriano de Valera publicó su revisión en 1602.", formas: ["1569", "1602", "casiodoro", "cipriano", "reina valera", "biblia del oso", "del oso", "idiomas originales"] },
                { id: "regalo", peso: 50, texto: "Leer la Biblia en la propia lengua es un regalo que costó años de trabajo y sacrificio, y todavía hay pueblos que la esperan.", formas: ["regalo", "anos de trabajo", "sacrificio", "cost* (anos|mucho|trabajo)", "todavia hay pueblos", "pueblos (que|sin)", "esperan", "propia lengua", "nuestra lengua"] },
              ],
              modelo: "Que traducir la Biblia vale mucho: Casiodoro de Reina publicó en 1569 la primera Biblia completa en español, desde los idiomas originales, y Cipriano de Valera la revisó en 1602. Leerla en nuestra lengua es un regalo que costó años de trabajo y sacrificio.",
            },
          },
          {
            apoyo: "Apoyar la traducción de la Biblia y la formación de líderes que la enseñen en su lengua",
            ref: "Romanos 10:17",
            clave: {
              id: "pr-evangelismo-misiones-4-4-a6-2",
              tipo: "corta",
              pregunta: "Tu iglesia piensa ofrendar para que la Biblia se traduzca a la lengua de un pueblo que todavía no la tiene. ¿Por qué vale la pena?",
              ideas: [
                { id: "entender", peso: 50, texto: "Porque la fe es por el oír, y para oír de verdad hay que entender: la lengua del corazón es la de su casa.", formas: ["por el oir", "entiend*", "entend*", "lengua del corazon", "habla al corazon", "su casa", "su infancia"] },
                { id: "regalo", peso: 50, texto: "Porque leer la Biblia en la propia lengua es un regalo que costó años de trabajo y sacrificio, como la Biblia en español.", formas: ["regalo", "anos de trabajo", "sacrificio", "cost* (anos|mucho|trabajo)", "biblia en (su|nuestra|propia) lengua", "casiodoro", "reina valera", "como la nuestra"] },
              ],
              modelo: "Vale la pena porque la fe es por el oír, y para oír hay que entender: la lengua del corazón es la de su casa. Además, leer la Biblia en la propia lengua es un regalo que costó años de trabajo y sacrificio, como la nuestra.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. El misionero y su familia
    "evangelismo-misiones-4-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empieza la misión?", reverso: "Con el llamado de Dios, confirmado por el equipo y la iglesia.", apoyo: "La misión empieza con el llamado de Dios, como la visión de Macedonia, confirmado por el equipo y la iglesia" },
              { frente: "¿En qué se prepara el misionero antes de ir?", reverso: "En la Palabra, la lengua, la cultura y la salud.", apoyo: "Prepararse antes de ir: la Palabra, la lengua, la cultura y la salud" },
              { frente: "¿Va el misionero solo, o enviado por alguien?", reverso: "Enviado por una iglesia, y no solo.", apoyo: "Ir enviado por una iglesia, y no solo" },
              { frente: "¿Qué necesita saber el misionero antes de ir?", reverso: "Que habrá pruebas.", apoyo: "El misionero necesita saber que habrá pruebas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es el choque cultural?", reverso: "Un tiempo de desconcierto que viven muchos misioneros al llegar a otra cultura.", apoyo: "Al llegar a otra cultura, muchos misioneros pasan por un tiempo de desconcierto" },
              { frente: "En el choque cultural, ¿qué llega después de que todo parece nuevo y atractivo?", reverso: "El cansancio, la frustración y la nostalgia.", apoyo: "después llegan el cansancio, la frustración y la nostalgia" },
              { frente: "¿Qué viene con el tiempo, en el choque cultural?", reverso: "La adaptación.", apoyo: "y con el tiempo viene la adaptación" },
              { frente: "¿Qué necesita el que va a la misión?", reverso: "Una iglesia que lo envíe, lo sostenga y lo reciba.", apoyo: "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba" },
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
            consigna: "Completa con qué empieza la misión.",
            texto: "La misión empieza con el [[llamado]] de Dios, como la visión de [[Macedonia]], confirmado por el [[equipo]] y la iglesia.",
            distractores: ["silencio", "Babilonia", "enemigo"],
            errores: {
              silencio: "La misión empieza con el llamado de Dios, como cuando Pablo vio en visión al varón macedonio.",
              Babilonia: "La visión de Pablo fue la de Macedonia: «Pasa a Macedonia y ayúdanos».",
              enemigo: "El llamado de Dios lo confirman el equipo y la iglesia.",
            },
            apoyo: "La misión empieza con el llamado de Dios, como la visión de Macedonia, confirmado por el equipo y la iglesia",
            explica: "Pablo vio en visión a un varón macedonio que le rogaba: «Pasa a Macedonia y ayúdanos». La misión empieza con el llamado de Dios, confirmado por el equipo y la iglesia.",
          },
          {
            consigna: "Completa cómo se prepara el misionero antes de ir.",
            texto: "Antes de ir, el misionero se prepara en la [[Palabra]], la [[lengua]], la cultura y la [[salud]], y va enviado por una iglesia, y no solo.",
            distractores: ["política", "moda", "fama"],
            errores: {
              "política": "Antes de ir, el misionero se prepara en la Palabra, la lengua, la cultura y la salud.",
              moda: "El misionero se prepara en la lengua del pueblo al que va.",
              fama: "Antes de ir, el misionero también cuida su salud.",
            },
            apoyo: "Prepararse antes de ir: la Palabra, la lengua, la cultura y la salud",
            explica: "Antes de ir, el misionero se prepara en la Palabra, la lengua, la cultura y la salud, y va enviado por una iglesia, y no solo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el llamado del misionero: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo vio en visión a un varón macedonio que le rogaba que fuera a ayudarlos.", verdad: true, explica: "El varón le rogaba: «Pasa a Macedonia y ayúdanos».", apoyo: "Pablo vio en visión a un varón macedonio que le rogaba: «Pasa a Macedonia y ayúdanos»", ref: "Hechos 16:9" },
              { texto: "El equipo de Pablo partió sin estar seguro de que Dios lo llamaba.", verdad: false, explica: "Partió «dando por cierto que Dios nos llamaba para que les anunciásemos el evangelio».", apoyo: "su equipo partió «dando por cierto que Dios nos llamaba para que les anunciásemos el evangelio»", ref: "Hechos 16:10" },
              { texto: "El llamado de Dios lo confirman el equipo y la iglesia.", verdad: true, explica: "La misión empieza con el llamado de Dios, confirmado por el equipo y la iglesia.", apoyo: "La misión empieza con el llamado de Dios, como la visión de Macedonia, confirmado por el equipo y la iglesia" },
            ],
          },
          {
            consigna: "Sobre la preparación del misionero: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo ocultó lo que costaba la misión, para no desanimar a nadie.", verdad: false, explica: "Pablo no ocultó lo que costaba: «en trabajo y fatiga, en muchos desvelos, en hambre y sed».", apoyo: "Pablo no ocultó lo que costaba", ref: "2 Corintios 11:27" },
              { texto: "Antes de ir, el misionero se prepara en la Palabra, la lengua, la cultura y la salud.", verdad: true, explica: "Prepararse antes de ir es parte de cuidar al misionero.", apoyo: "Prepararse antes de ir: la Palabra, la lengua, la cultura y la salud" },
              { texto: "Lo mejor es ir solo, sin depender de una iglesia que lo envíe.", verdad: false, explica: "El misionero va enviado por una iglesia, y no solo.", apoyo: "Ir enviado por una iglesia, y no solo" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena el camino del misionero que va a otra cultura, del primer paso al último.",
            eventos: [
              { texto: "Dios lo llama, y el equipo y la iglesia lo confirman", fecha: "Al empezar" },
              { texto: "Se prepara en la Palabra, la lengua, la cultura y la salud", fecha: "Antes de ir" },
              { texto: "Al llegar, todo le parece nuevo y atractivo", fecha: "Al principio" },
              { texto: "Llegan el cansancio, la frustración y la nostalgia", fecha: "Después" },
              { texto: "Viene la adaptación a la nueva cultura", fecha: "Con el tiempo" },
              { texto: "Vuelve, y su iglesia lo recibe y lo acompaña", fecha: "Al volver" },
            ],
            apoyo: "Ese proceso se llama choque cultural, y es normal",
            explica: "La misión empieza con el llamado de Dios, y el misionero se prepara antes de ir. Al llegar todo parece nuevo; después llegan el cansancio y la nostalgia, y con el tiempo viene la adaptación. Al volver, la iglesia lo recibe.",
          },
          {
            consigna: "Ordena lo que vive muchas veces un misionero en otra cultura, del primer momento al último.",
            eventos: [
              { texto: "Llega a otra cultura, enviado por su iglesia", fecha: "Al llegar" },
              { texto: "Todo le parece nuevo y atractivo", fecha: "Al principio" },
              { texto: "Siente cansancio, frustración y nostalgia", fecha: "Después" },
              { texto: "Se adapta poco a poco a su nueva vida", fecha: "Con el tiempo" },
              { texto: "Regresa, y su iglesia lo recibe y lo acompaña", fecha: "Al volver" },
            ],
            apoyo: "Al llegar a otra cultura, muchos misioneros pasan por un tiempo de desconcierto",
            explica: "Al principio todo parece nuevo y atractivo; después llegan el cansancio, la frustración y la nostalgia; y con el tiempo viene la adaptación. Ese proceso se llama choque cultural, y es normal.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una misionera de tu iglesia te escribe desde el campo: Al principio todo me encantaba; ahora estoy cansada, extraño mi casa y me frustro por todo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que es el choque cultural: es normal, y se supera con el tiempo.", bien: true, explica: "Al principio todo parece nuevo y atractivo; después llegan el cansancio, la frustración y la nostalgia; y con el tiempo viene la adaptación." },
              { texto: "Que eso muestra que Dios no la llamó, y que conviene que vuelva ya.", explica: "El choque cultural es normal: no muestra que Dios no la llamó." },
              { texto: "Que no lo cuente a nadie, para que la iglesia no piense que es débil.", explica: "El misionero necesita alguien a quien rendir cuentas y comunicación con la iglesia." },
              { texto: "Que se esfuerce más y deje de sentir nostalgia, porque es falta de fe.", explica: "La nostalgia es parte del choque cultural, que es normal y se supera con el tiempo." },
            ],
            apoyo: "Ese proceso se llama choque cultural, y es normal",
            explica: "Al llegar a otra cultura, muchos misioneros pasan por un tiempo de desconcierto: es el choque cultural, y con el tiempo viene la adaptación.",
          },
          {
            caso: "Un joven que se prepara para ir de misionero te dice: Allá todo va a ser hermoso; no creo que pase por pruebas.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Pablo no ocultó el costo: habrá trabajo y fatiga.", bien: true, explica: "Pablo no ocultó lo que costaba: «en trabajo y fatiga, en muchos desvelos, en hambre y sed». El misionero necesita saber que habrá pruebas." },
              { texto: "Que tiene razón: si Dios lo llama, no va a tener ninguna prueba.", explica: "Pablo fue llamado por Dios, y aun así no ocultó lo que costaba." },
              { texto: "Que mejor no piense en eso, para no perder el entusiasmo que tiene.", explica: "El misionero necesita saber que habrá pruebas, y prepararse para ellas." },
              { texto: "Que las pruebas solo les llegan a los misioneros que no tienen fe.", explica: "Pablo, que tenía fe, vivió en trabajo y fatiga y en muchos desvelos." },
            ],
            apoyo: "El misionero necesita saber que habrá pruebas",
            explica: "Ir a otro pueblo es una aventura de fe, pero también trae cansancio, soledad y pruebas para las que hay que prepararse.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba",
            ref: "Hechos 16:9-10",
            titulo: "Una familia que se prepara para ir",
            relato: [
              "Eres parte del comité de misiones de tu iglesia. Una pareja con dos hijos pequeños siente el llamado a servir en otro país, y la iglesia lo confirmó.",
              "Faltan seis meses para el viaje. La pareja quiere salir cuanto antes, y algunos hermanos opinan que la iglesia ya hizo su parte con despedirlos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propones para los meses antes del viaje?",
                opciones: [
                  { texto: "Que se preparen en la Palabra, la lengua, la cultura y la salud.", bien: true, explica: "Antes de ir, el misionero se prepara en la Palabra, la lengua, la cultura y la salud." },
                  { texto: "Que se vayan ya: con el llamado basta, y lo demás lo aprenden allá.", explica: "El llamado es el comienzo, pero hay que prepararse antes de ir." },
                  { texto: "Que se preparen solo los padres, porque los hijos no necesitan nada.", explica: "El cónyuge y los hijos también cruzan la frontera: a toda la familia se la prepara y se la cuida." },
                ],
                apoyo: "Prepararse antes de ir: la Palabra, la lengua, la cultura y la salud",
                explica: "La misión empieza con el llamado de Dios, y antes de ir el misionero se prepara en la Palabra, la lengua, la cultura y la salud.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué dices de los dos hijos pequeños?",
                opciones: [
                  { texto: "Que también cruzan la frontera: hay que cuidarlos.", bien: true, explica: "Se cuida al cónyuge y a los hijos, que también cruzan la frontera." },
                  { texto: "Que son pequeños y se acostumbran a todo sin ayuda.", explica: "Los hijos también cruzan la frontera: hay que cuidarlos." },
                  { texto: "Que eso le toca solo a la familia, y no a la iglesia.", explica: "La iglesia que envía también cuida al cónyuge y a los hijos." },
                ],
                apoyo: "Cuidar al cónyuge y a los hijos, que también cruzan la frontera",
                explica: "Cuidar al misionero incluye cuidar al cónyuge y a los hijos, que también cruzan la frontera.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a quien dice que la iglesia ya hizo su parte al despedirlos?",
                opciones: [
                  { texto: "Que la iglesia los envía, los sostiene y los recibe.", bien: true, explica: "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba." },
                  { texto: "Que es cierto: desde ahora la obra depende solo de ellos.", explica: "El misionero va enviado por una iglesia, y no solo." },
                  { texto: "Que basta con orar por ellos una vez, el día de la despedida.", explica: "La iglesia sostiene al misionero: descanso, alguien a quien rendir cuentas y comunicación." },
                ],
                apoyo: "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba",
                explica: "Volver también es parte del camino: la iglesia envía, sostiene, recibe y acompaña al misionero.",
              },
              {
                tipo: "explica",
                apoyo: "Tener descanso, alguien a quien rendir cuentas y comunicación con la iglesia",
                clave: {
                  id: "pr-evangelismo-misiones-4-5-a6-1",
                  tipo: "corta",
                  pregunta: "Propón cómo cuidará tu iglesia a esta familia mientras esté en el campo.",
                  ideas: [
                    { id: "descanso", peso: 34, texto: "Que tengan descanso.", formas: ["descans*", "vacacion*", "tiempo libre", "reposo"] },
                    { id: "cuentas", peso: 33, texto: "Que tengan a alguien a quien rendir cuentas, y comunicación con la iglesia.", formas: ["rendir cuentas", "rind* cuentas", "a quien rendir", "comunica*", "escrib*", "mensaje*", "videollamad*", "contacto", "hablar con ellos", "hablaremos con ellos"] },
                    { id: "familia", peso: 33, texto: "Que se cuide también al cónyuge y a los hijos.", formas: ["hijos", "conyuge", "esposa", "esposo", "los ninos", "su familia", "toda la familia"] },
                  ],
                  modelo: "La iglesia les dará tiempo de descanso, tendrán a alguien a quien rendir cuentas y mantendremos la comunicación con ellos. También cuidaremos al cónyuge y a los hijos, que cruzan la frontera con ellos.",
                },
              },
            ],
          },
          {
            apoyo: "Tener descanso, alguien a quien rendir cuentas y comunicación con la iglesia",
            ref: "2 Corintios 11:26-27",
            titulo: "Dos años sin descanso",
            relato: [
              "Un matrimonio de tu iglesia sirve desde hace dos años en otra cultura. Ya pasaron por lo más duro del choque cultural.",
              "En una videollamada te cuentan que no han tomado ni un día de descanso, que casi no hablan con nadie de la iglesia y que sus hijos extrañan mucho a sus amigos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué es lo primero que les aconsejas?",
                opciones: [
                  { texto: "Que tomen descanso: lo necesitan para seguir sirviendo.", bien: true, explica: "Cuidar al misionero incluye tener descanso." },
                  { texto: "Que sigan sin parar, porque la obra no puede esperar nada.", explica: "Cuidar al misionero incluye tener descanso, aunque haya mucho trabajo." },
                  { texto: "Que trabajen todavía más, para terminar pronto y volver.", explica: "Más trabajo sin descanso no cuida al misionero: también necesita descansar." },
                ],
                apoyo: "Tener descanso, alguien a quien rendir cuentas y comunicación con la iglesia",
                explica: "El misionero necesita descanso, alguien a quien rendir cuentas y comunicación con la iglesia.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué les propones para que no estén tan solos?",
                opciones: [
                  { texto: "Hablar seguido con la iglesia y tener a quién rendir cuentas.", bien: true, explica: "Cuidar al misionero es darle alguien a quien rendir cuentas y comunicación con la iglesia." },
                  { texto: "Que no molesten a la iglesia con sus problemas personales.", explica: "La iglesia que envía quiere saber cómo están: la comunicación es parte del cuidado." },
                  { texto: "Que se las arreglen solos, como hacen siempre los misioneros fuertes.", explica: "El misionero va enviado por una iglesia, y no solo." },
                ],
                apoyo: "Ir enviado por una iglesia, y no solo",
                explica: "El que va necesita una iglesia que lo envíe, lo sostenga y lo reciba.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y sus hijos, que extrañan a sus amigos?",
                opciones: [
                  { texto: "Cruzaron la frontera también: la iglesia los cuida.", bien: true, explica: "Se cuida al cónyuge y a los hijos, que también cruzan la frontera." },
                  { texto: "Los hijos se adaptan solos, sin necesidad de ninguna ayuda.", explica: "Los hijos también cruzan la frontera: hay que cuidarlos." },
                  { texto: "Lo que importa es el ministerio de los padres, no los hijos.", explica: "Cuidar al misionero incluye cuidar a su cónyuge y a sus hijos." },
                ],
                apoyo: "Cuidar al cónyuge y a los hijos, que también cruzan la frontera",
                explica: "El cónyuge y los hijos también cruzan la frontera, y la iglesia los cuida.",
              },
              {
                tipo: "explica",
                apoyo: "Volver también es parte del camino: la iglesia recibe y acompaña al misionero cuando regresa",
                clave: {
                  id: "pr-evangelismo-misiones-4-5-a6-2",
                  tipo: "corta",
                  pregunta: "¿Por qué este matrimonio necesita a su iglesia, y qué hace ella por ellos antes, durante y después?",
                  ideas: [
                    { id: "envia", peso: 34, texto: "La iglesia los envía: el misionero va enviado por una iglesia, y no solo.", formas: ["envi*", "mand*", "no (va|van|fueron|vayan) solos", "no estan solos", "nadie va solo", "nadie debe ir solo"] },
                    { id: "sostiene", peso: 33, texto: "Los sostiene en el campo: descanso, alguien a quien rendir cuentas y comunicación.", formas: ["sostien*", "sosten*", "apoy*", "descans*", "rendir cuentas", "comunica*", "cuid*"] },
                    { id: "recibe", peso: 33, texto: "Los recibe y los acompaña cuando regresan.", formas: ["recib*", "regres*", "vuelv*", "volver", "acompan*"] },
                  ],
                  modelo: "Porque el que va necesita una iglesia: ella los envía, para que no vayan solos; los sostiene con descanso, alguien a quien rendir cuentas y comunicación; y los recibe y los acompaña cuando regresan.",
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
            apoyo: "Ese proceso se llama choque cultural, y es normal",
            ref: "2 Corintios 11:26-27",
            clave: {
              id: "pr-evangelismo-misiones-4-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el choque cultural, y por qué etapas pasa muchas veces el misionero?",
              ideas: [
                { id: "normal", peso: 30, texto: "Es un tiempo de desconcierto al llegar a otra cultura, y es normal.", formas: ["desconcierto", "desconcert*", "es normal", "normal"] },
                { id: "crisis", peso: 35, texto: "Al principio todo parece nuevo y atractivo, y después llegan el cansancio, la frustración y la nostalgia.", formas: ["cansancio", "frustra*", "nostalgia", "extran*", "nuevo y atractivo", "atractiv*"] },
                { id: "adaptacion", peso: 35, texto: "Con el tiempo viene la adaptación.", formas: ["adapta*", "con el tiempo", "se supera"] },
              ],
              errores: [
                { id: "falta-fe", texto: "El choque cultural es normal: no es falta de fe ni muestra que Dios no llamó al misionero.", formas: ["falta de fe", "no (lo|la|los) llamo"], anula: "normal" },
              ],
              modelo: "El choque cultural es un tiempo de desconcierto al llegar a otra cultura, y es normal. Al principio todo parece nuevo y atractivo; después llegan el cansancio, la frustración y la nostalgia; y con el tiempo viene la adaptación.",
            },
          },
          {
            apoyo: "Pablo no ocultó lo que costaba",
            ref: "2 Corintios 11:26-27",
            clave: {
              id: "pr-evangelismo-misiones-4-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué desafíos de la vida en otro país debe conocer alguien que se prepara para ir de misionero?",
              ideas: [
                { id: "costo", peso: 50, texto: "Que habrá pruebas: Pablo no ocultó el costo, con trabajo, fatiga y desvelos.", formas: ["pruebas", "costo", "costaba", "trabajo y fatiga", "fatiga", "desvelos", "soledad", "cansancio", "sed"] },
                { id: "choque", peso: 50, texto: "Que pasará por el choque cultural, que es normal y se supera con el tiempo.", formas: ["choque cultural", "frustra*", "nostalgia", "adapta*", "desconcierto", "con el tiempo"] },
              ],
              modelo: "Debe saber que habrá pruebas: Pablo no ocultó el costo, con trabajo, fatiga y desvelos. También pasará por el choque cultural, con frustración y nostalgia, pero es normal y con el tiempo viene la adaptación.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Las naciones a la puerta de casa
    "evangelismo-misiones-4-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Hace falta tomar un avión para hacer misión transcultural?", reverso: "No: en muchas ciudades viven personas de muchos países y lenguas.", apoyo: "No hace falta tomar un avión para hacer misión transcultural: en muchas ciudades viven personas de muchos países y lenguas" },
              { frente: "¿Qué le da Dios al extranjero, según Deuteronomio 10:18-19?", reverso: "Pan y vestido.", apoyo: "Dios «ama también al extranjero dándole pan y vestido»" },
              { frente: "¿Por qué debía Israel amar al extranjero?", reverso: "Porque ellos fueron extranjeros en la tierra de Egipto.", apoyo: "«Amaréis, pues, al extranjero; porque extranjeros fuisteis en la tierra de Egipto»" },
              { frente: "Según Jesús, ¿qué es recibir al forastero?", reverso: "Recibirlo a él.", apoyo: "Jesús enseñó que recibir al forastero es recibirlo a él" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué les pidió Dios a los judíos que vivían lejos de su tierra, en Babilonia?", reverso: "Que procuraran la paz de la ciudad y rogaran por ella.", apoyo: "a los que vivían lejos de su tierra Dios les pidió buscar la paz de su ciudad" },
              { frente: "¿Dónde nacieron muchas iglesias hispanas de los Estados Unidos?", reverso: "Entre inmigrantes.", apoyo: "Muchas iglesias hispanas de los Estados Unidos nacieron entre inmigrantes" },
              { frente: "¿A quiénes pueden alcanzar hoy las iglesias hispanas?", reverso: "A inmigrantes de otras lenguas y culturas.", apoyo: "Hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas" },
              { frente: "¿Para qué se forman líderes de la misma cultura?", reverso: "Para que la obra continúe.", apoyo: "Formar líderes de esa misma cultura para que la obra continúe" },
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
            ref: "Deuteronomio 10:18-19",
            consigna: "Dios mandó a Israel amar al extranjero. ¿Por qué? Toca las palabras que lo dicen.",
            texto: "Amaréis, pues, al extranjero; [[porque extranjeros fuisteis en la tierra de Egipto]]",
            apoyo: "Dios ama al extranjero y mandó a su pueblo amarlo",
            explica: "Dios «ama también al extranjero dándole pan y vestido», y mandó a Israel amarlo, porque ellos fueron extranjeros en la tierra de Egipto.",
          },
          {
            ref: "Mateo 25:35",
            consigna: "Jesús habló de cuando fue forastero. ¿Qué hicieron con él? Toca las palabras que lo dicen.",
            texto: "fui forastero, y [[me recogisteis]]",
            apoyo: "Jesús enseñó que recibir al forastero es recibirlo a él",
            explica: "Jesús enseñó que recibir al forastero es recibirlo a él: «fui forastero, y me recogisteis».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con lo que enseña la lección sobre el extranjero.",
            pares: [
              ["Dios", "Ama al extranjero y le da pan y vestido"],
              ["Israel", "Debía amar al extranjero, porque lo fue en Egipto"],
              ["Jesús", "Enseñó que recibir al forastero es recibirlo a él"],
              ["Los judíos en Babilonia", "Debían procurar la paz de la ciudad"],
            ],
            apoyo: "Dios ama al extranjero y mandó a su pueblo amarlo",
            explica: "Dios ama al extranjero dándole pan y vestido, y mandó a Israel amarlo, porque fueron extranjeros en Egipto. Jesús enseñó que recibir al forastero es recibirlo a él, y a los que vivían en Babilonia Dios les pidió procurar la paz de la ciudad.",
          },
          {
            consigna: "Une cada texto bíblico con lo que enseña.",
            pares: [
              ["Deuteronomio 10:18-19", "Amar al extranjero, como Dios lo ama"],
              ["Mateo 25:35", "«fui forastero, y me recogisteis»"],
              ["Jeremías 29:7", "Procurar la paz de la ciudad y rogar por ella"],
            ],
            apoyo: "Jesús enseñó que recibir al forastero es recibirlo a él",
            explica: "Deuteronomio 10:18-19 manda amar al extranjero, porque Dios lo ama; en Mateo 25:35 Jesús dice: «fui forastero, y me recogisteis»; y en Jeremías 29:7 Dios pide procurar la paz de la ciudad y rogar por ella.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las naciones en nuestra ciudad: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para hacer misión transcultural siempre hay que viajar a otro país.", verdad: false, explica: "No hace falta tomar un avión para hacer misión transcultural: en muchas ciudades viven personas de muchos países y lenguas.", apoyo: "No hace falta tomar un avión para hacer misión transcultural" },
              { texto: "En muchas ciudades viven personas de muchos países y lenguas.", verdad: true, explica: "En muchas ciudades, las naciones están a la puerta de casa.", apoyo: "En muchas ciudades, las naciones están a la puerta de casa" },
              { texto: "Muchas iglesias hispanas de los Estados Unidos nacieron entre inmigrantes.", verdad: true, explica: "Así lo dice la lección, y hoy pueden alcanzar también a inmigrantes de otras lenguas y culturas.", apoyo: "Muchas iglesias hispanas de los Estados Unidos nacieron entre inmigrantes" },
            ],
          },
          {
            consigna: "Sobre los inmigrantes como campo misionero: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las iglesias hispanas solo pueden alcanzar a otros hispanos.", verdad: false, explica: "Hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas.", apoyo: "Hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas" },
              { texto: "El que vive lejos de su tierra también puede bendecir a su ciudad.", verdad: true, explica: "A los judíos que vivían en Babilonia, Dios les dijo: «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová».", apoyo: "El que vive en otra tierra también puede bendecir a su ciudad", ref: "Jeremías 29:7" },
              { texto: "Las familias de otro país que viven en tu calle no son un campo misionero.", verdad: false, explica: "Las naciones también viven en tu calle: la iglesia las conoce y las sirve.", apoyo: "Las naciones también viven en tu calle" },
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
            caso: "Un joven de tu iglesia te dice: Yo quisiera ser misionero, pero nunca voy a poder viajar a otro país.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no hace falta un avión: las naciones también viven en su calle.", bien: true, explica: "No hace falta tomar un avión para hacer misión transcultural: en muchas ciudades viven personas de muchos países y lenguas." },
              { texto: "Que entonces la misión no es para él, y que mejor ayude con dinero.", explica: "Ofrendar es bueno, pero no hace falta tomar un avión para hacer misión transcultural." },
              { texto: "Que espere a tener dinero para viajar, y que mientras tanto ore.", explica: "Orar es bueno, pero ya puede servir: en muchas ciudades viven personas de muchos países." },
              { texto: "Que la misión transcultural solo la hacen los que viven en el extranjero.", explica: "No hace falta tomar un avión: las naciones están a la puerta de casa." },
            ],
            apoyo: "No hace falta tomar un avión para hacer misión transcultural: en muchas ciudades viven personas de muchos países y lenguas",
            explica: "En muchas ciudades, las naciones están a la puerta de casa: la misión transcultural también se hace en la propia ciudad.",
          },
          {
            caso: "Un diácono de tu iglesia hispana te dice: Nosotros somos una iglesia de inmigrantes; nuestra misión es solo con los que hablan español.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que nacimos entre inmigrantes y podemos alcanzar a los de otras lenguas.", bien: true, explica: "Muchas iglesias hispanas nacieron entre inmigrantes, y hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas." },
              { texto: "Que tiene razón: cada iglesia debe quedarse con los de su propia lengua.", explica: "Las iglesias hispanas pueden alcanzar también a inmigrantes de otras lenguas y culturas." },
              { texto: "Que los de otras lenguas ya tienen sus iglesias, y no nos toca a nosotros.", explica: "Las naciones también viven en tu calle: la iglesia las conoce y las sirve." },
              { texto: "Que primero hay que alcanzar a todos los hispanos, y después ver.", explica: "Hoy las iglesias hispanas pueden ser también las que alcanzan a inmigrantes de otras lenguas." },
            ],
            apoyo: "Hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas",
            explica: "Muchas iglesias hispanas de los Estados Unidos nacieron entre inmigrantes. Hoy pueden ser también las que alcanzan a inmigrantes de otras lenguas y culturas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "En muchas ciudades, las naciones están a la puerta de casa: la iglesia las conoce, las sirve, hace amistad, les ofrece la Palabra en su lengua y forma líderes de su misma cultura",
            ref: "Jeremías 29:7",
            titulo: "Las familias del edificio de enfrente",
            relato: [
              "Frente a tu iglesia hay un edificio donde viven muchas familias recién llegadas de otro país. Hablan otra lengua, y casi nadie de la iglesia las conoce.",
              "El pastor te pide que prepares con el equipo de misiones un plan para alcanzarlas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Con qué empiezan el plan?",
                opciones: [
                  { texto: "Con conocerlas: de qué país vienen, qué lengua hablan y qué necesitan.", bien: true, explica: "Lo primero es conocer los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan." },
                  { texto: "Con un culto en español y una invitación pegada en la puerta del edificio.", explica: "Antes de invitar, la iglesia conoce a las familias: de dónde vienen, qué lengua hablan y qué necesitan." },
                  { texto: "Con esperar a que esas familias vengan solas a la iglesia algún domingo.", explica: "Las naciones están a la puerta de casa: la iglesia sale a conocerlas." },
                ],
                apoyo: "Conocer los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan",
                explica: "El plan empieza por conocer a los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan.",
              },
              {
                tipo: "situacion",
                pregunta: "Descubren que necesitan aprender el idioma del país y ayuda con trámites. ¿Qué hace la iglesia?",
                opciones: [
                  { texto: "Sirve primero: da clases de idioma y ayuda con los trámites.", bien: true, explica: "Se sirve primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias." },
                  { texto: "Les ofrece ayuda, pero solo si antes empiezan a venir a los cultos.", explica: "La iglesia sirve primero: la ayuda no espera a que vengan a los cultos." },
                  { texto: "Les dice que eso no es asunto de la iglesia, sino del gobierno.", explica: "Dios ama al extranjero dándole pan y vestido: la iglesia también lo sirve en lo que necesita." },
                ],
                apoyo: "Servir primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias",
                explica: "La iglesia que alcanza a otras culturas sirve primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias.",
              },
              {
                tipo: "situacion",
                pregunta: "Con el tiempo, varias familias ya son amigas y quieren conocer más de Dios. ¿Qué les ofrecen?",
                opciones: [
                  { texto: "Estudios bíblicos en su lengua, o con alguien que traduzca.", bien: true, explica: "La iglesia ofrece estudios bíblicos en su lengua, o con alguien que traduzca." },
                  { texto: "Un estudio rápido, para que se bauticen cuanto antes en la iglesia.", explica: "Lo que se les ofrece es la Palabra en su lengua, o con alguien que traduzca." },
                  { texto: "Una Biblia en español, para que cada familia la lea sola en su casa.", explica: "Se les ofrecen estudios bíblicos en su lengua, o con alguien que traduzca." },
                ],
                apoyo: "Ofrecer estudios bíblicos en su lengua, o con alguien que traduzca",
                explica: "Después de servir y hacer amistad, la iglesia ofrece estudios bíblicos en su lengua, o con alguien que traduzca.",
              },
              {
                tipo: "explica",
                apoyo: "Una iglesia que alcanza a otras culturas",
                clave: {
                  id: "pr-evangelismo-misiones-4-6-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas frases el plan del equipo para alcanzar a esas familias.",
                  ideas: [
                    { id: "servir", peso: 34, texto: "Conocerlas y servirlas primero: clases de idioma, ayuda con trámites, comidas y apoyo.", formas: ["conoc*", "serv*", "clases de idioma", "tramites", "comida*", "apoy*", "ayud*"] },
                    { id: "amistad", peso: 33, texto: "Hacer amistad y abrir la casa.", formas: ["amist*", "amig*", "abr* (la|nuestra|nuestras|mi|las) casa*", "invit* a (casa|comer)", "visit*"] },
                    { id: "palabra", peso: 33, texto: "Ofrecerles la Palabra en su lengua y formar líderes de su misma cultura.", formas: ["estudio* biblico*", "en su (lengua|idioma)", "traduzca", "traduct*", "lider*", "la palabra", "la biblia"] },
                  ],
                  modelo: "Primero vamos a conocer a las familias y servirlas con clases de idioma y ayuda con trámites. Después haremos amistad y abriremos nuestras casas. Les ofreceremos estudios bíblicos en su lengua y formaremos líderes de su misma cultura.",
                },
              },
            ],
          },
          {
            apoyo: "Formar líderes de esa misma cultura para que la obra continúe",
            ref: "Deuteronomio 10:18-19",
            titulo: "Un barrio que cambió",
            relato: [
              "En los últimos años llegaron a tu barrio muchas familias de otro país. Tu iglesia hispana, que también nació entre inmigrantes, quiere alcanzarlas.",
              "Un hermano propone repartir folletos en español el domingo y esperar a ver quién llega. Una hermana ya conoce a una de esas familias, porque sus hijos van a la misma escuela.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propuesta te parece mejor para empezar?",
                opciones: [
                  { texto: "Conocer a las familias, empezando por la de la hermana.", bien: true, explica: "Se empieza por conocer los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan." },
                  { texto: "Repartir los folletos en español y esperar a ver quién llega.", explica: "Antes de repartir folletos, la iglesia conoce a las familias: su país, su lengua y lo que necesitan." },
                  { texto: "Esperar a que aprendan español para invitarlas a la iglesia.", explica: "Las naciones también viven en tu calle: la iglesia sale a conocerlas, sin esperar." },
                ],
                apoyo: "Conocer los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan",
                explica: "El primer paso es conocer los grupos que viven cerca: de qué países vienen, qué lenguas hablan y qué necesitan.",
              },
              {
                tipo: "situacion",
                pregunta: "La familia que conoce la hermana necesita ayuda para llenar unos papeles. ¿Qué hacen?",
                opciones: [
                  { texto: "Les ayudan con los trámites: la iglesia sirve primero.", bien: true, explica: "Se sirve primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias." },
                  { texto: "Les dicen que primero vengan a la iglesia, y después verán.", explica: "La iglesia sirve primero: la ayuda no espera a que vengan." },
                  { texto: "Les dan la dirección de una oficina, porque eso no es de la iglesia.", explica: "Dios ama al extranjero dándole pan y vestido: la iglesia también sirve en lo que necesita." },
                ],
                apoyo: "Servir primero: clases de idioma, ayuda con trámites, comidas y apoyo a las familias",
                explica: "La iglesia que alcanza a otras culturas sirve primero, también con ayuda en los trámites.",
              },
              {
                tipo: "situacion",
                pregunta: "Pasan los meses y ya son amigos. ¿Qué paso sigue?",
                opciones: [
                  { texto: "Abrir la casa y ofrecerles un estudio bíblico en su lengua.", bien: true, explica: "Se hace amistad, se abre la casa y se ofrecen estudios bíblicos en su lengua, o con alguien que traduzca." },
                  { texto: "Dejar de visitarlos, porque ya los ayudaron bastante.", explica: "Servir es el comienzo: después vienen la amistad, la casa abierta y la Palabra en su lengua." },
                  { texto: "Darles un folleto en español y esperar a que vengan solos al culto.", explica: "La iglesia ofrece estudios bíblicos en su lengua, o con alguien que traduzca." },
                ],
                apoyo: "Hacer amistad y abrir la casa",
                explica: "Después de servir, la iglesia hace amistad, abre la casa y ofrece la Palabra en su lengua.",
              },
              {
                tipo: "explica",
                apoyo: "Formar líderes de esa misma cultura para que la obra continúe",
                clave: {
                  id: "pr-evangelismo-misiones-4-6-a6-2",
                  tipo: "corta",
                  pregunta: "Ya hay creyentes firmes entre esas familias. ¿Qué harás para que la obra continúe, y por qué?",
                  ideas: [
                    { id: "lideres", peso: 50, texto: "Formar líderes de esa misma cultura.", formas: ["lider*", "form* (a|lideres|maestros|creyentes)", "prepar* (a|lideres|maestros)", "discipul*", "ensen* a (otros|ellos)", "ensen* a su gente"] },
                    { id: "continue", peso: 50, texto: "Para que la obra continúe, en su lengua y entre su propia gente.", formas: ["contin*", "siga adelante", "sigan adelante", "permanez*", "en su (lengua|idioma)", "su misma cultura", "su propia gente"] },
                  ],
                  modelo: "Formaré líderes de esa misma cultura, para que enseñen la Palabra a su propia gente en su lengua. Así la obra continúa entre ellos aunque nosotros no estemos.",
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
            apoyo: "Dios ama al extranjero y mandó a su pueblo amarlo",
            ref: "Deuteronomio 10:18-19",
            clave: {
              id: "pr-evangelismo-misiones-4-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseña la Biblia sobre amar al extranjero? Di lo que enseñan Deuteronomio 10 y Mateo 25.",
              ideas: [
                { id: "dios", peso: 50, texto: "Dios ama al extranjero dándole pan y vestido, y mandó a Israel amarlo, porque fueron extranjeros en Egipto.", formas: ["(ama|amar|amarlo|amarlos|amamos|amemos|amaba|amaran|amareis|amen) (al|a|los) extranjer*", "pan y vestido", "egipto", "extranjeros fuisteis", "fueron extranjeros"] },
                { id: "jesus", peso: 50, texto: "Jesús enseñó que recibir al forastero es recibirlo a él.", formas: ["recib* (al|a|los) (forastero*|extranjero*)", "recibirlo a el", "recibimos a (jesus|cristo)", "recibir a (jesus|cristo)", "lo recibimos a el", "me recogisteis", "fui forastero", "recog*"] },
              ],
              modelo: "Dios ama al extranjero dándole pan y vestido, y mandó a Israel amarlo, porque ellos fueron extranjeros en Egipto. Y Jesús enseñó que recibir al forastero es recibirlo a él.",
            },
          },
          {
            apoyo: "Jesús enseñó que recibir al forastero es recibirlo a él",
            ref: "Mateo 25:35",
            clave: {
              id: "pr-evangelismo-misiones-4-6-a7-2",
              tipo: "corta",
              pregunta: "Un vecino de la iglesia dice que los extranjeros que llegan al barrio no son asunto de los cristianos. ¿Qué le respondes con la Biblia?",
              ideas: [
                { id: "dios", peso: 50, texto: "Dios ama al extranjero y mandó a su pueblo amarlo: le da pan y vestido.", formas: ["(ama|amar|amarlo|amarlos|amamos|amemos|amaba|amaran|amareis|amen) (al|a|los) extranjer*", "pan y vestido", "egipto", "extranjeros fuisteis", "fueron extranjeros", "mando a su pueblo"] },
                { id: "jesus", peso: 50, texto: "Jesús enseñó que recibir al forastero es recibirlo a él.", formas: ["recib* (al|a|los) (forastero*|extranjero*)", "recibirlo a el", "recibimos a (jesus|cristo)", "recibir a (jesus|cristo)", "lo recibimos a el", "me recogisteis", "fui forastero", "recog*"] },
              ],
              errores: [
                { id: "razon", texto: "Dios ama al extranjero y mandó a su pueblo amarlo.", formas: ["tiene razon"], anula: "dios" },
              ],
              modelo: "Le respondo que Dios ama al extranjero dándole pan y vestido, y mandó a su pueblo amarlo. Y Jesús enseñó que recibir al forastero es recibirlo a él: «fui forastero, y me recogisteis».",
            },
          },
        ],
      },
    ],
  },
};
