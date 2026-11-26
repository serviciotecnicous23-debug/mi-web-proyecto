/**
 * Las prácticas de «Métodos de estudio bíblico» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-metodos-estudio.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_METODOS_ESTUDIO: PracticasMateria = {
  materia: "n3-metodos-estudio",
  mision: {
    titulo: "Escudriñar cada día, como los de Berea",
    intro: "Tu pastor te pidió que ayudes a los nuevos líderes de célula a estudiar la Biblia por su cuenta. Te van a hacer muchas preguntas: cómo se observa un pasaje, cómo se interpreta y se aplica, qué herramientas usar y en qué orden, y qué plan seguir cada semana. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes guiar a otros a estudiar la Biblia con el método inductivo: observar qué dice, interpretar qué significa y aplicar qué pide; usar las herramientas en su orden, sin que reemplacen al texto; y seguir un plan constante, como quien medita de día y de noche.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El estudio inductivo de la Biblia
    "n3-metodos-estudio-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hacían cada día los de Berea con las Escrituras?", reverso: "Las escudriñaban, para ver si lo que oían era así.", apoyo: "iban «escudriñando cada día las Escrituras para ver si estas cosas eran así»" },
              { frente: "¿Qué quiere decir escudriñar?", reverso: "Examinar con cuidado, como quien busca algo valioso.", apoyo: "Escudriñar es examinar con cuidado, como quien busca algo valioso" },
              { frente: "¿Qué es estudiar la Biblia de forma inductiva?", reverso: "Ir de los detalles del texto a sus conclusiones.", apoyo: "Estudiar de forma inductiva es ir de los detalles del texto a sus conclusiones" },
              { frente: "¿Qué pasa si la única manera de leer es buscar versículos para una idea?", reverso: "La Biblia termina diciendo siempre lo que ya pensábamos.", apoyo: "si es la única manera de leer, la Biblia termina diciendo siempre lo que ya pensábamos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace un buen detective antes de llegar a una conclusión?", reverso: "Mira con cuidado todo lo que hay y se pregunta qué significa.", apoyo: "mira con cuidado todo lo que hay, se pregunta qué significa y solo entonces llega a una conclusión" },
              { frente: "¿Qué es lo contrario de estudiar de forma inductiva?", reverso: "Partir de una idea y buscar versículos que la apoyen.", apoyo: "Lo contrario es partir de una idea y buscar versículos que la apoyen" },
              { frente: "¿Cuándo tiene su lugar partir de una idea y buscar sus versículos?", reverso: "Cuando se repasa una doctrina ya aprendida.", apoyo: "Eso tiene su lugar cuando se repasa una doctrina ya aprendida" },
              { frente: "¿Con qué actitud se hace el estudio inductivo?", reverso: "Con la de los de Berea, que escudriñaban cada día las Escrituras.", apoyo: "con la actitud de los de Berea, que escudriñaban cada día las Escrituras" },
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
            consigna: "¿Va del texto a sus conclusiones o parte de una idea ya hecha? Lleva cada frase a su grupo.",
            grupos: ["Va del texto a sus conclusiones", "Parte de una idea ya hecha"],
            frases: [
              { texto: "Dejar que el pasaje diga lo que dice", grupo: 0 },
              { texto: "Mirar cada detalle antes de sacar enseñanzas", grupo: 0 },
              { texto: "Llegar a la conclusión al final, como un buen detective", grupo: 0 },
              { texto: "Decidir qué enseñar y luego buscar versículos que lo apoyen", grupo: 1 },
              { texto: "Escoger la conclusión antes de abrir la Biblia", grupo: 1 },
              { texto: "Buscar solo los versículos que dicen lo que ya pienso", grupo: 1 },
            ],
            apoyo: "Estudiar de forma inductiva es ir de los detalles del texto a sus conclusiones",
            ref: "Hechos 17:11",
            explica: "El estudio inductivo deja que el pasaje diga lo que dice antes de sacar enseñanzas; lo contrario es partir de una idea y buscar versículos que la apoyen.",
          },
          {
            consigna: "¿Es estudio inductivo o es buscar apoyo para lo que ya pienso? Lleva cada frase a su grupo.",
            grupos: ["Estudio inductivo", "Buscar apoyo a lo que ya pienso"],
            frases: [
              { texto: "Observar con calma todo lo que dice el pasaje", grupo: 0 },
              { texto: "Preguntarse qué significa cada detalle observado", grupo: 0 },
              { texto: "Sacar enseñanzas después de mirar los detalles", grupo: 0 },
              { texto: "Partir de una idea y después buscarle versículos", grupo: 1 },
              { texto: "Leer la Biblia para que me dé la razón", grupo: 1 },
              { texto: "Quedarme solo con los versículos que me convienen", grupo: 1 },
            ],
            apoyo: "dejar que el pasaje diga lo que dice antes de sacar enseñanzas",
            ref: "Hechos 17:11",
            explica: "Estudiar de forma inductiva es ir de los detalles del texto a sus conclusiones. Si solo buscamos versículos para una idea, la Biblia termina diciendo lo que ya pensábamos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se estudia un pasaje con el método inductivo, del primer paso al último.",
            pasos: ["Orar: pedirle a Dios que abra mis ojos", "Observar: ¿qué dice el texto?", "Interpretar: ¿qué significa?", "Aplicar: ¿qué hago con esto?"],
            apoyo: "El estudio inductivo va del texto a sus conclusiones en tres pasos: observar qué dice, interpretar qué significa y aplicar qué pide",
            ref: "Salmos 119:18",
            explica: "El estudio comienza con oración. Después se observa qué dice el texto, se interpreta qué significa y al final se aplica lo que pide.",
          },
          {
            consigna: "Esdras muestra el orden correcto. Ordena estos pasos, del primero al último.",
            pasos: [
              "Mirar con atención cada palabra, persona y lugar del texto",
              "Entender lo que el autor quiso decir a sus primeros lectores",
              "Responder a Dios con fe y obediencia",
              "Enseñar a otros lo que se estudió y se obedeció",
            ],
            apoyo: "Primero se estudia, después se obedece y al final se enseña",
            ref: "Esdras 7:10",
            explica: "Primero se observa y se interpreta el texto; después se obedece, y al final se enseña. Así lo hizo Esdras: inquirió la ley de Jehová, la cumplió y la enseñó.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los tres pasos tiene un error. Tócala.",
            frases: [
              "Observar es mirar con atención cada palabra, persona, lugar y detalle.",
              "Interpretar responde a la pregunta: ¿qué hago con esto?",
              "Aplicar es responder a Dios con fe y obediencia, de manera concreta.",
              "Los tres pasos son una manera ordenada de escuchar a Dios.",
            ],
            malo: 1,
            correccion: "Interpretar responde a la pregunta: ¿qué significa? La pregunta ¿qué hago con esto? es la de aplicar.",
            apoyo: "Interpretar: ¿qué significa? Entender lo que el autor quiso decir a sus primeros lectores",
            explica: "Observar pregunta qué dice el texto; interpretar, qué significa; y aplicar, qué hago con esto.",
          },
          {
            consigna: "Una de estas frases sobre saltarse un paso tiene un error. Tócala.",
            frases: [
              "Saltarse un paso del método trae dos males.",
              "El que observa sin aplicar se llena de datos y no cambia.",
              "El que aplica sin observar obedece justo lo que el texto dice.",
              "Con la práctica, los tres pasos se vuelven naturales.",
            ],
            malo: 2,
            correccion: "El que aplica sin observar termina obedeciendo lo que el texto no dice.",
            apoyo: "el que aplica sin observar termina obedeciendo lo que el texto no dice",
            ref: "Esdras 7:10",
            explica: "Saltarse un paso trae dos males: el que observa sin aplicar se llena de datos y no cambia; el que aplica sin observar obedece lo que el texto no dice.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se prepara un tiempo de estudio.",
            texto: "El estudio comienza con [[oración]], y el estudiante pone de su parte un tiempo [[fijo]] y un lugar [[tranquilo]].",
            distractores: ["prisa", "perdido", "ruidoso"],
            errores: {
              prisa: "El estudio comienza con oración: Dios abre los ojos del corazón.",
              perdido: "El estudiante pone de su parte un tiempo fijo para estudiar.",
              ruidoso: "Para estudiar hace falta un lugar tranquilo.",
            },
            apoyo: "El estudio comienza con oración",
            ref: "Salmos 119:18",
            explica: "El estudio comienza con oración, y el estudiante pone de su parte un tiempo fijo, un lugar tranquilo, su Biblia, un cuaderno y un lápiz.",
          },
          {
            consigna: "Completa el consejo de los buenos maestros de estudio bíblico.",
            texto: "Antes de estudiar un pasaje con detalle, lee el [[libro]] [[completo]], de una sentada si puedes: ver el [[conjunto]] evita perderse en los detalles.",
            distractores: ["versículo", "resumido", "final"],
            errores: {
              "versículo": "Antes de estudiar un pasaje con detalle, se lee el libro completo, no un solo versículo.",
              resumido: "El consejo es leer el libro completo, de una sentada si puedes.",
              final: "Lo que evita perderse en los detalles es ver el conjunto del libro.",
            },
            apoyo: "antes de estudiar un pasaje con detalle, lee el libro completo, de una sentada si puedes",
            explica: "Antes de estudiar un pasaje con detalle conviene leer el libro completo: ver el conjunto evita perderse en los detalles.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano nuevo de tu célula te dice: Quiero estudiar la Biblia, pero la abro donde caiga, cuando tengo un rato.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que escoja un tiempo y un lugar fijos, y empiece siempre orando.", bien: true, explica: "Es lo que enseña la lección: un tiempo y un lugar fijos, y empezar siempre con la oración del Salmo 119:18." },
              { texto: "Que siga así: lo importante es abrirla, no importa dónde ni cuándo.", explica: "El estudiante pone de su parte un tiempo fijo y un lugar tranquilo: el estudio necesita un plan." },
              { texto: "Que primero estudie con calma y que al terminar le pida a Dios luz.", explica: "El estudio comienza con oración: antes de leer, se le pide a Dios que abra los ojos." },
              { texto: "Que lea solo los versículos que ya conoce, para no perder el tiempo.", explica: "Así la Biblia termina diciendo lo que ya pensábamos: el estudio inductivo deja que el pasaje diga lo que dice." },
            ],
            apoyo: "Escoge un tiempo y un lugar fijos para estudiar la Biblia esta semana, y empieza siempre con la oración del Salmo 119:18",
            ref: "Salmos 119:18",
            explica: "El estudio se prepara: comienza con oración, y el estudiante pone de su parte un tiempo fijo, un lugar tranquilo, su Biblia y un cuaderno.",
          },
          {
            caso: "Una joven que acompañas en la fe te dice: Quiero estudiar la Biblia en serio. ¿Qué necesito preparar?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Oración, un tiempo fijo, un lugar tranquilo, tu Biblia y un cuaderno.", bien: true, explica: "Dios abre los ojos del corazón, y el estudiante pone de su parte un tiempo fijo, un lugar tranquilo, su Biblia y un cuaderno." },
              { texto: "Solo tu Biblia: anotar en un cuaderno lo que observas es perder el tiempo.", explica: "El cuaderno sirve para guardar tus observaciones de cada lección." },
              { texto: "Muchas ganas: con eso basta, aunque no tengas un día ni una hora fijos.", explica: "El estudiante pone de su parte un tiempo fijo y un lugar tranquilo." },
              { texto: "Un buen comentario: con él ya no hace falta orar ni observar el pasaje.", explica: "El estudio comienza con oración, y los tres pasos del método no se saltan." },
            ],
            apoyo: "el estudiante pone de su parte un tiempo fijo, un lugar tranquilo, su Biblia, un cuaderno y un lápiz",
            ref: "Salmos 119:18",
            explica: "El estudio comienza con oración. Dios abre los ojos del corazón, y el estudiante pone de su parte un tiempo fijo, un lugar tranquilo, su Biblia y un cuaderno.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Estudiar de forma inductiva es ir de los detalles del texto a sus conclusiones",
            ref: "Hechos 17:11",
            clave: {
              id: "pr-n3-metodos-estudio-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el estudio inductivo, y en qué se diferencia de leer buscando apoyo para lo que ya pensamos?",
              ideas: [
                { id: "texto", peso: 50, texto: "El estudio inductivo va de los detalles del texto a sus conclusiones: deja que el pasaje diga lo que dice.", formas: ["detalles del texto", "de los detalles", "a sus conclusiones", "a (la|las|una) conclusion*", "diga lo que dice", "dice el (texto|pasaje)", "dej* que el (texto|pasaje) (diga|hable)", "del texto a"] },
                { id: "idea", peso: 50, texto: "Lo contrario es partir de una idea y buscar versículos que la apoyen: así la Biblia termina diciendo lo que ya pensábamos.", formas: ["parti* de una idea", "parte de una idea", "busca* versiculos", "versiculos que (la|lo|las|los) (apoy*|confirm*)", "termin* diciendo", "lo que ya (pensabamos|pensamos|pienso|creo|creemos|pensaba|sabemos)"] },
              ],
              modelo: "El estudio inductivo va de los detalles del texto a sus conclusiones: deja que el pasaje diga lo que dice. Lo otro es partir de una idea y buscar versículos que la apoyen; así la Biblia termina diciendo lo que ya pensábamos.",
            },
          },
          {
            apoyo: "si es la única manera de leer, la Biblia termina diciendo siempre lo que ya pensábamos",
            ref: "Hechos 17:11",
            clave: {
              id: "pr-n3-metodos-estudio-1-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué no conviene leer la Biblia solo buscando versículos que apoyen lo que ya pensamos?",
              ideas: [
                { id: "pensabamos", peso: 50, texto: "Si es la única manera de leer, la Biblia termina diciendo siempre lo que ya pensábamos.", formas: ["termin* diciendo", "biblia (dice|diga|dira|termina) (siempre|solo)", "(dice|diga|dira) siempre lo que", "(confirma|confirmar) lo que", "solo (escuch*|oimos|oye*|vemos|ves|leemos) lo que", "(nuestra|mi|su) (idea|opinion)"] },
                { id: "inductivo", peso: 50, texto: "Hay que dejar que el pasaje diga lo que dice: ir de los detalles del texto a sus conclusiones.", formas: ["diga lo que dice", "dice el (texto|pasaje)", "dej* que el (pasaje|texto) (diga|hable)", "detalles del texto", "de los detalles", "a sus conclusiones", "antes de sacar", "escudri*"] },
              ],
              modelo: "Porque si es la única manera de leer, la Biblia termina diciendo siempre lo que ya pensábamos. Hay que dejar que el pasaje diga lo que dice e ir de los detalles del texto a sus conclusiones.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Observar: ver lo que dice el texto
    "n3-metodos-estudio-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A qué única pregunta responde la observación?", reverso: "¿Qué dice el texto?", apoyo: "La observación responde a una sola pregunta: ¿qué dice el texto?" },
              { frente: "Al preguntar quién, ¿qué busca el observador?", reverso: "Las personas que aparecen: quién habla, a quién y de quién.", apoyo: "¿Quién? Las personas que aparecen: quién habla, a quién y de quién" },
              { frente: "Al preguntar por qué, ¿qué busca el observador?", reverso: "La razón que da el mismo texto.", apoyo: "¿Por qué? La razón que da el mismo texto" },
              { frente: "¿Qué paso del estudio es el que más se salta?", reverso: "La observación: parece el más fácil, y de él depende todo lo demás.", apoyo: "Parece el paso más fácil, pero es el que más se salta, y de él depende todo lo demás" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es observar, según la lección?", reverso: "Detenerse, bajarse del carro y mirar con calma.", apoyo: "Observar es detenerse, bajarse del carro y mirar con calma" },
              { frente: "Al preguntar cuándo, ¿qué busca el observador?", reverso: "El momento: antes o después de qué, en qué tiempo.", apoyo: "¿Cuándo? El momento: antes o después de qué, en qué tiempo" },
              { frente: "Al preguntar dónde, ¿qué busca el observador?", reverso: "El lugar: una ciudad, un camino, una casa, una cárcel.", apoyo: "¿Dónde? El lugar: una ciudad, un camino, una casa, una cárcel" },
              { frente: "Al preguntar cómo, ¿qué busca el observador?", reverso: "La manera en que algo se hace o sucede.", apoyo: "¿Cómo? La manera en que algo se hace o sucede" },
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
            consigna: "Une cada pregunta del observador con lo que busca en el texto.",
            pares: [
              ["¿Quién?", "Las personas que aparecen en el texto"],
              ["¿Qué?", "Lo que pasa, lo que se dice, lo que se manda o se promete"],
              ["¿Cuándo?", "El momento: antes o después de qué"],
              ["¿Dónde?", "El lugar: una ciudad, un camino, una casa"],
              ["¿Por qué?", "La razón que da el mismo texto"],
            ],
            apoyo: "Hacer las preguntas de la observación: quién, qué, cuándo, dónde, por qué y cómo",
            explica: "El observador pregunta quién aparece, qué pasa, cuándo y dónde sucede, por qué (la razón que da el mismo texto) y cómo se hace.",
          },
          {
            consigna: "¿Qué pregunta del observador responde cada nota? Une cada nota con su pregunta.",
            pares: [
              ["Quién habla, a quién y de quién", "¿Quién?"],
              ["En qué tiempo pasó: antes o después de qué", "¿Cuándo?"],
              ["Una ciudad, un camino, una casa o una cárcel", "¿Dónde?"],
              ["La manera en que algo se hace o sucede", "¿Cómo?"],
              ["Lo que se manda o se promete", "¿Qué?"],
            ],
            apoyo: "quién, qué, cuándo, dónde, por qué y cómo",
            explica: "Cada pregunta busca algo distinto: quién (las personas), qué (lo que pasa o se dice), cuándo (el momento), dónde (el lugar) y cómo (la manera).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Marca un contraste, una comparación o es un conector? Lleva cada palabra a su grupo.",
            grupos: ["Un contraste", "Una comparación", "Un conector"],
            frases: [
              { texto: "Pero", grupo: 0 },
              { texto: "Sino", grupo: 0 },
              { texto: "En cambio", grupo: 0 },
              { texto: "Así como", grupo: 1 },
              { texto: "Semejante a", grupo: 1 },
              { texto: "Porque", grupo: 2 },
              { texto: "Para que", grupo: 2 },
              { texto: "Por tanto", grupo: 2 },
            ],
            apoyo: "Contrastes: palabras como pero, sino, en cambio",
            explica: "Pero, sino y en cambio marcan contrastes; así como y semejante a, comparaciones; porque, para que y por tanto son conectores.",
          },
          {
            consigna: "¿Qué marca cada conector: una causa, un propósito o una conclusión? Lleva cada frase a su grupo.",
            grupos: ["Una causa", "Un propósito", "Una conclusión"],
            frases: [
              { texto: "Porque", grupo: 0 },
              { texto: "«Porque por gracia sois salvos por medio de la fe»", grupo: 0, explica: "La lección dice que este porque da la razón." },
              { texto: "Para que", grupo: 1 },
              { texto: "«no por obras, para que nadie se gloríe»", grupo: 1, explica: "La lección dice que este para que marca un propósito." },
              { texto: "Así que", grupo: 2 },
              { texto: "Por tanto", grupo: 2 },
              { texto: "«Así que, hermanos, os ruego por las misericordias de Dios»", grupo: 2, explica: "Ese así que obliga a mirar atrás, a lo que Pablo explicó antes." },
            ],
            apoyo: "Conectores: porque (una causa), para que (un propósito), así que o por tanto (una conclusión)",
            explica: "Porque da una causa, la razón; para que marca un propósito; así que y por tanto llevan a una conclusión, como el así que de Romanos 12:1.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué palabra marca el contraste de Efesios 2:4? Tócala.",
            texto: "[[Pero]] Dios, que es rico en misericordia",
            apoyo: "Todo el pasaje gira alrededor de ese pero",
            ref: "Efesios 2:4",
            explica: "Antes, muertos en delitos y pecados; pero Dios, que es rico en misericordia: todo el pasaje gira alrededor de ese pero.",
          },
          {
            consigna: "¿Qué conector marca un propósito en Efesios 2:9? Toca las palabras que lo forman.",
            texto: "no por obras, [[para que]] nadie se gloríe",
            apoyo: "Conectores: porque (una causa), para que (un propósito)",
            ref: "Efesios 2:9",
            explica: "El conector para que marca un propósito: no por obras, para que nadie se gloríe.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Al observar Efesios 2:1-10 ya se ve su estructura. Ordénala, del principio al final del pasaje.",
            pasos: ["Antes, muertos en delitos y pecados", "Pero Dios, rico en misericordia", "Salvos por gracia, por medio de la fe", "Creados en Cristo para buenas obras"],
            apoyo: "Sin interpretar todavía, ya se ve la estructura: antes, muertos; pero Dios; salvos por gracia; para buenas obras",
            ref: "Efesios 2:1-10",
            explica: "Sin interpretar todavía, la estructura se ve así: antes, muertos (2:1); pero Dios (2:4); salvos por gracia (2:5 y 2:8); para buenas obras (2:10).",
          },
          {
            consigna: "Ordena cómo estudias un pasaje como Efesios 2:1-10, del primer paso al último.",
            pasos: ["Leer el pasaje con calma, sin prisa", "Anotar al menos diez observaciones", "Preguntar qué significa lo observado", "Decidir qué hacer con lo que entendí"],
            apoyo: "Escoge un pasaje corto y anota al menos diez observaciones antes de buscar ninguna explicación",
            ref: "Efesios 2:1-10",
            explica: "Primero se observa y se anota lo que dice el texto; solo después se pregunta qué significa y cómo se aplica.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo de estudio te dice: Ya leí Efesios 2:1-10. ¿Busco de una vez qué significa en un comentario?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que primero anote lo que dice el texto: al menos diez observaciones.", bien: true, explica: "La observación responde qué dice el texto antes de preguntar qué significa." },
              { texto: "Que sí: la observación es el paso más fácil, y se lo puede saltar.", explica: "Parece el paso más fácil, pero es el que más se salta, y de él depende todo lo demás." },
              { texto: "Que decida qué significa y después vuelva al texto a ver si cuadra.", explica: "Eso es partir de una idea: primero se observa qué dice el texto." },
              { texto: "Que lo lea otra vez, pero sin anotar nada, para no distraerse con eso.", explica: "Quien escribe lo que ve, ve más: las observaciones se anotan en el cuaderno." },
            ],
            apoyo: "Escoge un pasaje corto y anota al menos diez observaciones antes de buscar ninguna explicación",
            ref: "Efesios 2:1-10",
            explica: "Observar es responder qué dice el texto antes de preguntar qué significa, y anotar lo que se ve ayuda a ver más.",
          },
          {
            caso: "Una hermana de tu célula te dice: Ya subrayé Efesios 2. ¿Para qué voy a anotar lo que vi, si ya lo leí?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Quien escribe lo que ve, ve más, y lo anotado te servirá al enseñar.", bien: true, explica: "Es lo que enseña la lección: anotar las observaciones ayuda a ver más y sirve cuando enseñes." },
              { texto: "Tienes razón: con subrayar ya basta, y anotar solo te quita tiempo.", explica: "La lección pide anotar en el cuaderno: quien escribe lo que ve, ve más." },
              { texto: "Anota mejor lo que tú crees que significa, y no lo que dice el texto.", explica: "Al observar todavía no se pregunta qué significa: se anota lo que dice el texto." },
              { texto: "No anotes nada todavía; primero busca la explicación en un libro.", explica: "Lo primero es observar y anotar lo que dice el texto, antes de buscar ninguna explicación." },
            ],
            apoyo: "Quien escribe lo que ve, ve más, y lo que observó hoy le servirá cuando enseñe",
            ref: "Efesios 2:1-10",
            explica: "Las observaciones se anotan en el cuaderno: quien escribe lo que ve, ve más, y lo que observó hoy le servirá cuando enseñe.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Todo el pasaje gira alrededor de ese pero",
            ref: "Efesios 2:1-10",
            clave: {
              id: "pr-n3-metodos-estudio-2-a7-1",
              tipo: "corta",
              pregunta: "Al observar Efesios 2:1-10, ¿qué contraste y qué repetición encuentras?",
              ideas: [
                { id: "pero", peso: 50, texto: "El contraste: estabais muertos en vuestros delitos y pecados, pero Dios, que es rico en misericordia (2:4).", formas: ["pero dios", "el pero", "muert* pero", "rico en misericordia", "contraste muert*"] },
                { id: "gracia", peso: 50, texto: "La repetición: la frase por gracia sois salvos aparece dos veces (2:5 y 2:8), y la palabra gracia, tres.", formas: ["por gracia (sois|somos|son|eres) salvos", "gracia (aparece|aparecen|se|tres|dos)", "repet* gracia", "repit* gracia", "gracia (veces|vez)"] },
              ],
              modelo: "Encuentro un contraste en el versículo 4: estabais muertos, pero Dios, que es rico en misericordia. Y una repetición: la frase por gracia sois salvos aparece dos veces, y la palabra gracia, tres veces.",
            },
          },
          {
            apoyo: "En los versículos 8 a 10 aparecen los conectores",
            ref: "Efesios 2:8-10",
            clave: {
              id: "pr-n3-metodos-estudio-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué conectores encuentras al observar Efesios 2:8-10, y qué marca cada uno?",
              ideas: [
                { id: "porque", peso: 35, texto: "Porque da la razón: por gracia sois salvos por medio de la fe.", formas: ["porque (da|marca|es|indica) (la|una) (razon|causa)", "razon", "causa"] },
                { id: "para-que", peso: 35, texto: "Para que marca un propósito: para que nadie se gloríe.", formas: ["proposito", "para que nadie", "nadie se glori*", "finalidad"] },
                { id: "obras", peso: 30, texto: "El versículo 10 dice para qué fuimos creados en Cristo: para buenas obras.", formas: ["para buenas obras", "buenas obras", "creados en cristo", "para que fuimos creados"] },
              ],
              modelo: "Encuentro porque, que da la razón: por gracia sois salvos por medio de la fe. Luego para que, que marca un propósito: para que nadie se gloríe. Y el versículo 10 dice que fuimos creados para buenas obras.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Interpretar y aplicar con método
    "n3-metodos-estudio-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué se convierte cada observación al interpretar?", reverso: "En una pregunta, como ¿qué significa esta palabra?", apoyo: "Cada observación se convierte en una pregunta" },
              { frente: "¿Dónde se buscan primero las respuestas al interpretar?", reverso: "En el mismo pasaje y en su contexto.", apoyo: "Las respuestas se buscan primero en el mismo pasaje y en su contexto" },
              { frente: "¿Qué pasa si no puedes resumir un pasaje en una frase?", reverso: "Todavía no lo entendiste del todo.", apoyo: "Si no puedes resumirlo, todavía no lo entendiste del todo" },
              { frente: "¿Cuál es la meta del estudio?", reverso: "Conocer a Dios y obedecerle, no acumular datos.", apoyo: "La meta del estudio no es acumular datos, sino conocer a Dios y obedecerle" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde traen muchas Biblias las referencias cruzadas?", reverso: "Al margen o al pie de la página.", apoyo: "Las referencias cruzadas, que muchas Biblias traen al margen o al pie de la página" },
              { frente: "¿Por qué la Escritura se explica a sí misma?", reverso: "Porque toda ella es inspirada por Dios y útil para enseñar.", apoyo: "Toda la Escritura es inspirada por Dios y es «útil para enseñar»: por eso se explica a sí misma" },
              { frente: "¿Cómo es una aplicación fiel?", reverso: "Personal, concreta y medible.", apoyo: "Una aplicación fiel es personal, concreta y medible" },
              { frente: "¿Qué pide Santiago 1:22 a los que oyen la palabra?", reverso: "Que sean hacedores de la palabra, y no solo oidores.", apoyo: "sed hacedores de la palabra, y no tan solamente oidores" },
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
            consigna: "Completa cómo se buscan las respuestas al interpretar.",
            texto: "Cada observación se convierte en una [[pregunta]], y las respuestas se buscan primero en el mismo [[pasaje]] y en su [[contexto]].",
            distractores: ["doctrina", "comentario", "opinión"],
            errores: {
              doctrina: "Cada observación se convierte en una pregunta: ¿qué significa esta palabra?, ¿por qué el autor lo dice aquí?",
              comentario: "Las respuestas se buscan primero en el mismo pasaje y en su contexto.",
              "opinión": "Las respuestas se buscan en el mismo pasaje y en su contexto, no en la opinión de cada uno.",
            },
            apoyo: "Las respuestas se buscan primero en el mismo pasaje y en su contexto",
            explica: "Cada observación se convierte en una pregunta, como ¿qué significa esta palabra?, y las respuestas se buscan primero en el mismo pasaje y en su contexto.",
          },
          {
            consigna: "Completa un buen ejercicio para interpretar.",
            texto: "Un buen ejercicio es escribir la idea [[central]] del pasaje en una sola [[frase]], con tus [[palabras]].",
            distractores: ["secundaria", "página", "dudas"],
            errores: {
              secundaria: "Se escribe la idea central del pasaje, lo principal que enseña.",
              "página": "La idea central se escribe en una sola frase.",
              dudas: "La idea central se escribe con tus palabras.",
            },
            apoyo: "Un buen ejercicio es escribir la idea central del pasaje en una sola frase, con tus palabras",
            ref: "Efesios 2:1-10",
            explica: "Escribir la idea central en una sola frase, con tus palabras, muestra si entendiste: si no puedes resumirlo, todavía no lo entendiste del todo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pasaje con lo que dice, para que la Escritura explique la Escritura.",
            pares: [
              ["Romanos 3:24", "Los creyentes son justificados gratuitamente por su gracia"],
              ["Tito 3:5", "Dios nos salvó no por obras de justicia, sino por su misericordia"],
              ["2 Timoteo 3:16", "Toda la Escritura es inspirada por Dios y útil para enseñar"],
              ["Efesios 2:10", "Fuimos creados en Cristo Jesús para buenas obras"],
            ],
            apoyo: "La gracia de Efesios 2:8 se aclara con Romanos 3:24",
            ref: "Romanos 3:24; Tito 3:5",
            explica: "La gracia de Efesios 2:8 se aclara con Romanos 3:24 y Tito 3:5; y toda la Escritura es útil para enseñar: por eso se explica a sí misma.",
          },
          {
            consigna: "Une cada pregunta sobre las referencias cruzadas con su respuesta.",
            pares: [
              ["¿Dónde las traen muchas Biblias?", "Al margen o al pie de la página"],
              ["¿Adónde llevan?", "A otros pasajes que tratan lo mismo"],
              ["¿Con qué pasajes se aclara la gracia de Efesios 2:8?", "Con Romanos 3:24 y con Tito 3:5"],
              ["¿Por qué la Escritura se explica a sí misma?", "Porque toda ella es inspirada por Dios"],
            ],
            apoyo: "llevan a otros pasajes que tratan lo mismo",
            ref: "2 Timoteo 3:16-17",
            explica: "Las referencias cruzadas, al margen o al pie de la página, llevan a otros pasajes que tratan lo mismo: así la Escritura explica la Escritura.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una alumna de tu clase te dice: No entiendo bien qué es la gracia en Efesios 2:8. ¿Dónde busco?",
            pregunta: "¿Qué le aconsejas primero?",
            opciones: [
              { texto: "Que siga las referencias cruzadas, como Romanos 3:24 y Tito 3:5.", bien: true, explica: "Las referencias cruzadas llevan a otros pasajes que tratan lo mismo: la gracia de Efesios 2:8 se aclara con Romanos 3:24 y Tito 3:5." },
              { texto: "Que le pregunte a alguien qué siente cuando lee la palabra gracia.", explica: "La Escritura se explica a sí misma: se buscan otros pasajes que tratan lo mismo." },
              { texto: "Que lea un versículo al azar, porque cualquiera le va a servir igual.", explica: "Las referencias cruzadas llevan a pasajes que tratan lo mismo, no a cualquier versículo." },
              { texto: "Que lo deje así: Efesios 2:8 es difícil y no se puede entender.", explica: "Toda la Escritura es útil para enseñar: otros pasajes ayudan a entenderla." },
            ],
            apoyo: "La gracia de Efesios 2:8 se aclara con Romanos 3:24",
            ref: "Romanos 3:24; Tito 3:5",
            explica: "Las referencias cruzadas llevan a otros pasajes que tratan lo mismo: así la Escritura explica la Escritura.",
          },
          {
            caso: "Un compañero que prepara un estudio te dice: Mi Biblia trae unas citas pequeñas al margen. ¿Para qué sirven?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Son referencias cruzadas: llevan a pasajes que tratan lo mismo.", bien: true, explica: "Las referencias cruzadas llevan a otros pasajes que tratan lo mismo, para que la Escritura explique la Escritura." },
              { texto: "Son adornos de la imprenta: no hace falta que las mires nunca.", explica: "Muchas Biblias traen las referencias cruzadas al margen para ayudar a interpretar." },
              { texto: "Son las opiniones del editor sobre lo que significa cada versículo.", explica: "Las referencias cruzadas no son opiniones: llevan a otros pasajes que tratan lo mismo." },
              { texto: "Son para saltar a otro tema cuando el pasaje se vuelve aburrido.", explica: "Llevan a otros pasajes que tratan lo mismo, no a otro tema." },
            ],
            apoyo: "Las referencias cruzadas, que muchas Biblias traen al margen o al pie de la página, llevan a otros pasajes que tratan lo mismo",
            ref: "2 Timoteo 3:16-17",
            explica: "Toda la Escritura es inspirada por Dios y es «útil para enseñar»: por eso se explica a sí misma, y las referencias cruzadas ayudan a verlo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es una aplicación concreta y medible o es demasiado general? Lleva cada frase a su grupo.",
            grupos: ["Concreta y medible", "Demasiado general"],
            frases: [
              { texto: "Esta semana visito a la hermana enferma y le llevo algo de comer", grupo: 0 },
              { texto: "El sábado llamo a mi vecino para pedirle perdón", grupo: 0 },
              { texto: "Mañana le escribo a mi amigo para animarlo", grupo: 0 },
              { texto: "Voy a hacer más buenas obras", grupo: 1, explica: "La lección lo pone como ejemplo de una aplicación demasiado general." },
              { texto: "Voy a ser mejor cristiano", grupo: 1 },
              { texto: "Desde hoy voy a amar más a todos", grupo: 1 },
            ],
            apoyo: "Decir voy a hacer más buenas obras es demasiado general",
            ref: "Efesios 2:10",
            explica: "Una aplicación fiel es personal, concreta y medible, como esta: esta semana voy a visitar a la hermana que está enferma y a llevarle algo de comer.",
          },
          {
            consigna: "¿Es una de las cinco preguntas para aplicar o una pregunta para interpretar? Lleva cada frase a su grupo.",
            grupos: ["Pregunta para aplicar", "Pregunta para interpretar"],
            frases: [
              { texto: "¿Hay un pecado que debo dejar?", grupo: 0 },
              { texto: "¿Hay una promesa que debo creer?", grupo: 0 },
              { texto: "¿Hay un mandato que debo obedecer?", grupo: 0 },
              { texto: "¿Qué me enseña sobre Dios, para adorarlo?", grupo: 0 },
              { texto: "¿Qué significa esta palabra?", grupo: 1 },
              { texto: "¿Por qué el autor lo dice aquí?", grupo: 1 },
              { texto: "¿Qué relación tiene con lo que dijo antes?", grupo: 1 },
              { texto: "¿Qué quería que entendieran sus primeros lectores?", grupo: 1 },
            ],
            apoyo: "Para aplicar, se pregunta por un pecado, una promesa, un ejemplo, un mandato y una verdad sobre Dios",
            explica: "Para interpretar se pregunta qué significa y qué quería decir el autor; para aplicar, se pregunta por un pecado, una promesa, un ejemplo, un mandato y una verdad sobre Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Una aplicación fiel es personal, concreta y medible",
            ref: "Efesios 2:10",
            situacion: "Eres maestro de la escuela dominical. Hoy estudiaron Efesios 2:10, que dice que fuimos creados en Cristo Jesús para buenas obras, y llega la hora de aplicarlo.",
            escenas: [
              {
                id: "e1",
                narra: "Faltan diez minutos para terminar la clase.",
                pregunta: "¿Cómo cierras?",
                opciones: [
                  { texto: "Pides que cada uno decida una buena obra concreta para esta semana.", valor: 2, explica: "Una aplicación fiel es personal, concreta y medible: cada uno decide qué va a hacer esta semana.", siguiente: "e2" },
                  { texto: "Les pides a todos que se propongan hacer más buenas obras desde hoy.", valor: 1, explica: "La intención es buena, pero decir voy a hacer más buenas obras es demasiado general.", siguiente: "e2" },
                  { texto: "Repasas los datos del pasaje para que todos lo sepan de memoria.", valor: 0, explica: "La meta del estudio no es acumular datos, sino conocer a Dios y obedecerle.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Una alumna levanta la mano: Ya sé lo que dice el pasaje, pero ¿qué hago yo con esto?",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Aprovechas su pregunta para que cada uno decida algo concreto.", valor: 2, explica: "Es la pregunta que Dios espera que respondamos: ¿qué voy a hacer con lo que entendí?", siguiente: "e2" },
                  { texto: "Le dices que eso queda para otra clase, porque ya no hay tiempo.", valor: 0, explica: "Sin aplicar, el estudio se queda en datos: la meta es conocer a Dios y obedecerle.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un alumno dice: Esta semana voy a ser mejor persona.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le ayudas a decir qué va a hacer, para quién y qué día.", valor: 2, explica: "Así su aplicación queda personal, concreta y medible, como visitar esta semana a la hermana que está enferma." },
                  { texto: "Le das tú una tarea para la semana, sin preguntarle nada.", valor: 1, explica: "La tarea es concreta, pero no es suya: una aplicación fiel también es personal." },
                  { texto: "Lo felicitas y sigues: con la buena intención es suficiente.", valor: 0, explica: "Ser mejor persona es demasiado general: una aplicación fiel es concreta y medible." },
                ],
              },
              {
                id: "e3",
                narra: "Otra alumna dice que no sabe qué aplicar del pasaje.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Que revise el pasaje con las cinco preguntas de aplicación.", valor: 2, explica: "Se pregunta por un pecado que dejar, una promesa que creer, un ejemplo que seguir, un mandato que obedecer y lo que enseña sobre Dios, para adorarlo." },
                  { texto: "Que piense solo si hay un mandato que deba obedecer.", valor: 1, explica: "Es una de las cinco preguntas; con las cinco verá mejor lo que pide el pasaje." },
                  { texto: "Que no se preocupe: aplicar es lo de menos si entendió la clase.", valor: 0, explica: "Santiago lo dice así: «sed hacedores de la palabra, y no tan solamente oidores»." },
                ],
              },
            ],
          },
          {
            apoyo: "se decide algo personal, concreto y medible",
            ref: "Santiago 1:22",
            situacion: "Eres líder de una célula de jóvenes. Esta semana estudiaron juntos un pasaje, y quieres que lo pongan en práctica.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven comenta: Ya entendí el pasaje; con eso es suficiente.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la meta no es saber más, sino conocer a Dios y obedecerle.", valor: 2, explica: "La meta del estudio no es acumular datos, sino conocer a Dios y obedecerle: ser hacedores de la palabra, y no solo oidores." },
                  { texto: "Que está bien, y que la próxima semana van a ver cómo aplicarlo.", valor: 1, explica: "Después de entender llega la pregunta que Dios espera que respondamos: ¿qué voy a hacer con lo que entendí?" },
                  { texto: "Que tiene razón: entender bien el pasaje ya es lo mismo que obedecerlo.", valor: 0, explica: "Santiago pide ser hacedores de la palabra, y no tan solamente oidores." },
                ],
              },
              {
                id: "e2",
                narra: "Una joven dice: Mi aplicación es orar más.",
                pregunta: "¿Cómo la ayudas?",
                opciones: [
                  { texto: "Le preguntas cuándo y cuánto va a orar, para que se pueda medir.", valor: 2, explica: "Una aplicación fiel es personal, concreta y medible: así sabrá si la cumplió." },
                  { texto: "Le propones que ore más por los enfermos de la iglesia.", valor: 1, explica: "Va mejor, pero todavía falta cuándo y cuánto: una aplicación fiel es medible." },
                  { texto: "Le dices que orar más ya es una aplicación concreta y suficiente.", valor: 0, explica: "Orar más es bueno, pero así es demasiado general: una aplicación fiel es concreta y medible." },
                ],
              },
              {
                id: "e3",
                narra: "Al final de la reunión, cada uno va a escribir algo en su cuaderno.",
                pregunta: "¿Qué les pides que escriban?",
                opciones: [
                  { texto: "La idea central en una frase y una aplicación para esta semana.", valor: 2, explica: "Es lo que propone la lección: la idea central en una frase y una aplicación concreta para esta semana." },
                  { texto: "Solo la idea central del pasaje, bien resumida en una sola frase.", valor: 1, explica: "Resumir ayuda a interpretar, pero falta la aplicación: ¿qué voy a hacer con lo que entendí?" },
                  { texto: "Todos los datos que recuerden del pasaje, para no olvidarlos.", valor: 0, explica: "La meta del estudio no es acumular datos, sino conocer a Dios y obedecerle." },
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
            apoyo: "Un buen ejercicio es escribir la idea central del pasaje en una sola frase, con tus palabras",
            ref: "Efesios 2:1-10",
            clave: {
              id: "pr-n3-metodos-estudio-3-a7-1",
              tipo: "corta",
              pregunta: "Escribe con tus palabras, en una sola frase, la idea central de Efesios 2:1-10.",
              ideas: [
                { id: "vida", peso: 50, texto: "Dios, por su gracia, nos dio vida en Cristo cuando estábamos muertos.", formas: ["por su gracia", "por gracia", "nos dio vida", "dio vida", "estabamos muertos", "salv* por (gracia|su)", "gracia de dios"] },
                { id: "obras", peso: 50, texto: "Para que vivamos haciendo las buenas obras que él preparó.", formas: ["buenas obras", "obras que (el|dios) prepar*", "prepar* de antemano", "para que (vivamos|andemos|anduviesemos|hagamos)"] },
              ],
              errores: [
                { id: "obras-salvan", texto: "Dios nos salvó no por obras de justicia que hubiéramos hecho, sino por su misericordia; las buenas obras son las que él preparó para que vivamos en ellas.", formas: ["ganar* (la|nuestra|su) salvacion", "merec* (la|nuestra|su) salvacion", "salv* por obras", "salv* por (las|nuestras|buenas) obras", "salvacion por obras", "obras para (salvarnos|salvarse|ganar*|merecer*)"], anula: "obras" },
                { id: "obras-salvan-gracia", texto: "Los creyentes son justificados gratuitamente por su gracia.", formas: ["ganar* (la|nuestra|su) salvacion", "merec* (la|nuestra|su) salvacion", "salv* por obras", "salv* por (las|nuestras|buenas) obras", "salvacion por obras", "obras para (salvarnos|salvarse|ganar*|merecer*)"], anula: "vida" },
              ],
              modelo: "Dios, por su gracia, nos dio vida en Cristo cuando estábamos muertos en nuestros pecados, para que vivamos haciendo las buenas obras que él preparó de antemano.",
            },
          },
          {
            apoyo: "Cada observación se convierte en una pregunta",
            ref: "2 Timoteo 3:16-17",
            clave: {
              id: "pr-n3-metodos-estudio-3-a7-2",
              tipo: "corta",
              pregunta: "¿Qué preguntas le haces a un pasaje para interpretarlo, y dónde buscas primero las respuestas?",
              ideas: [
                { id: "preguntas", peso: 50, texto: "Cada observación se convierte en una pregunta: qué significa esta palabra, por qué el autor lo dice aquí, qué quería que entendieran sus primeros lectores.", formas: ["que significa", "por que el autor", "por que lo dice", "primeros lectores", "que relacion", "relacion tiene", "que quiso decir", "que queria"] },
                { id: "contexto", peso: 50, texto: "Las respuestas se buscan primero en el mismo pasaje y en su contexto.", formas: ["mismo pasaje", "su contexto", "el contexto", "en el pasaje", "mismo texto"] },
              ],
              modelo: "Le pregunto qué significa cada palabra, por qué el autor lo dice aquí y qué quería que entendieran sus primeros lectores. Las respuestas las busco primero en el mismo pasaje y en su contexto.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Las herramientas: versiones, concordancia y diccionario
    "n3-metodos-estudio-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo son las buenas traducciones de la Biblia?", reverso: "Fieles, aunque ninguna traducción es perfecta.", apoyo: "Ninguna traducción es perfecta, pero las buenas son fieles" },
              { frente: "¿Qué es una traducción de equivalencia formal?", reverso: "La que sigue de cerca las palabras y el orden del original.", apoyo: "Unas siguen de cerca las palabras y el orden del original: se llaman de equivalencia formal" },
              { frente: "¿Qué es una traducción de equivalencia dinámica?", reverso: "La que traduce el sentido con palabras de hoy.", apoyo: "Otras traducen el sentido con palabras de hoy: se llaman de equivalencia dinámica" },
              { frente: "¿Para qué ayuda comparar dos o tres versiones?", reverso: "Para ver matices.", apoyo: "Comparar dos o tres versiones ayuda a ver matices" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién publicó en 1569 la traducción de la que nació la Reina-Valera?", reverso: "Casiodoro de Reina.", apoyo: "La Reina-Valera nació de la traducción de Casiodoro de Reina, publicada en 1569" },
              { frente: "¿Por qué la llamaron la Biblia del Oso?", reverso: "Por el grabado de su portada.", apoyo: "conocida como la Biblia del Oso por el grabado de su portada" },
              { frente: "¿Quién revisó en 1602 la Biblia del Oso?", reverso: "Cipriano de Valera.", apoyo: "Cipriano de Valera la revisó en 1602" },
              { frente: "¿Qué revisión es la más usada en las iglesias evangélicas de habla hispana?", reverso: "La de 1960.", apoyo: "La revisión de 1960 es la más usada en las iglesias evangélicas de habla hispana" },
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
            consigna: "Une cada tipo de traducción o de uso con lo que enseña la lección.",
            pares: [
              ["Equivalencia formal", "Sigue de cerca las palabras y el orden del original"],
              ["Equivalencia dinámica", "Traduce el sentido con palabras de hoy"],
              ["Comparar dos o tres versiones", "Ayuda a ver matices"],
              ["Una traducción fiel", "Es donde se estudia la doctrina"],
            ],
            apoyo: "la doctrina se estudia en una traducción fiel y no en una paráfrasis libre",
            explica: "La formal sigue de cerca las palabras y el orden del original; la dinámica traduce el sentido con palabras de hoy. Comparar ayuda a ver matices, y la doctrina se estudia en una traducción fiel.",
          },
          {
            consigna: "Une cada versión o persona con lo que dice de ella la lección.",
            pares: [
              ["La Reina-Valera 1960", "Un ejemplo de equivalencia formal"],
              ["Dios Habla Hoy", "Un ejemplo de equivalencia dinámica"],
              ["Casiodoro de Reina", "Publicó su traducción en 1569: la Biblia del Oso"],
              ["Cipriano de Valera", "Revisó la traducción de Reina en 1602"],
            ],
            apoyo: "Otras traducen el sentido con palabras de hoy: se llaman de equivalencia dinámica, como Dios Habla Hoy",
            explica: "La Reina-Valera 1960 es de equivalencia formal y Dios Habla Hoy, de equivalencia dinámica. La Reina-Valera nació de la traducción de Casiodoro de Reina (1569), que Cipriano de Valera revisó en 1602.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa para qué sirve una concordancia.",
            texto: "Una concordancia sirve para encontrar un [[pasaje]] del que solo recuerdas una [[palabra]], y para estudiar cómo usa la [[Biblia]] un término.",
            distractores: ["mapa", "fecha", "iglesia"],
            errores: {
              mapa: "La concordancia sirve para encontrar un pasaje; los mapas los trae una Biblia de estudio.",
              fecha: "Con la concordancia se busca por palabras: encuentras un pasaje del que solo recuerdas una palabra.",
              iglesia: "La concordancia sirve para estudiar cómo usa la Biblia un término.",
            },
            apoyo: "Sirve para encontrar un pasaje del que solo recuerdas una palabra y para estudiar cómo usa la Biblia un término",
            ref: "Juan 5:39",
            explica: "Una concordancia es una lista alfabética de las palabras de la Biblia con todos los versículos donde aparecen: sirve para encontrar un pasaje y para estudiar un término.",
          },
          {
            consigna: "Completa lo que tiene de especial la concordancia de Strong.",
            texto: "La concordancia de Strong asigna un [[número]] a cada palabra [[hebrea]] o griega: así se puede ver qué palabra del [[original]] hay detrás de la traducción.",
            distractores: ["color", "latina", "comentario"],
            errores: {
              color: "La de Strong asigna un número a cada palabra hebrea o griega.",
              latina: "Strong numera cada palabra hebrea o griega.",
              comentario: "El número de Strong muestra qué palabra del original hay detrás de la traducción.",
            },
            apoyo: "además asigna un número a cada palabra hebrea o griega",
            ref: "Juan 5:39",
            explica: "La concordancia de Strong, que existe en español para la Reina-Valera 1960, asigna un número a cada palabra hebrea o griega: así, sin saber esos idiomas, se ve qué palabra del original hay detrás.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de tu célula te dice: Recuerdo un versículo que habla de escudriñar, pero no sé dónde está.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que busque esa palabra en una concordancia, con todos sus versículos.", bien: true, explica: "Una concordancia sirve para encontrar un pasaje del que solo recuerdas una palabra." },
              { texto: "Que busque esa palabra en un diccionario bíblico, que explica costumbres.", explica: "El diccionario explica personas, lugares, costumbres y palabras; los versículos donde aparece una palabra los trae la concordancia." },
              { texto: "Que lea la Biblia desde Génesis hasta encontrarlo: no hay otra forma.", explica: "Para eso está la concordancia: una lista alfabética de las palabras de la Biblia con todos los versículos donde aparecen." },
              { texto: "Que lo olvide: si no recuerda la cita exacta, ya no podrá encontrarlo.", explica: "La concordancia sirve justamente para encontrar un pasaje del que solo recuerdas una palabra." },
            ],
            apoyo: "Sirve para encontrar un pasaje del que solo recuerdas una palabra",
            ref: "Juan 5:39",
            explica: "Una concordancia es una lista alfabética de las palabras de la Biblia con todos los versículos donde aparecen: con una sola palabra se encuentra el pasaje.",
          },
          {
            caso: "Un joven que discipulas te dice: Quiero estudiar todas las veces que la Biblia usa la palabra gracia.",
            pregunta: "¿Qué le propones?",
            opciones: [
              { texto: "Que la busque en una concordancia y lea cada versículo en su contexto.", bien: true, explica: "Es lo que propone la lección: buscar en una concordancia todas las veces que aparece una palabra y leer cada versículo en su contexto." },
              { texto: "Que lea solo Efesios 2:8, porque ahí ya está todo lo que hay sobre la gracia.", explica: "La concordancia ayuda a estudiar cómo usa la Biblia un término en todos los versículos donde aparece." },
              { texto: "Que copie los versículos de la lista, sin leer lo que dice alrededor.", explica: "Cada versículo se lee en su contexto." },
              { texto: "Que pregunte en internet y se quede con la primera respuesta que vea.", explica: "Conviene usar las herramientas que dicen quién las escribió y de dónde sacan lo que enseñan." },
            ],
            apoyo: "Busca en una concordancia, o con el buscador de una Biblia digital, todas las veces que aparece una palabra que te interese, y lee cada versículo en su contexto",
            explica: "La concordancia sirve para estudiar cómo usa la Biblia un término: se buscan todas las veces que aparece y se lee cada versículo en su contexto.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Lo explica un diccionario bíblico o lo reúne una Biblia de estudio? Lleva cada frase a su grupo.",
            grupos: ["Lo explica un diccionario bíblico", "Lo reúne una Biblia de estudio"],
            frases: [
              { texto: "Qué era un denario", grupo: 0 },
              { texto: "Dónde quedaba Corinto", grupo: 0 },
              { texto: "Quiénes eran los fariseos", grupo: 0 },
              { texto: "Una introducción a cada libro", grupo: 1 },
              { texto: "Notas sobre el texto", grupo: 1 },
              { texto: "Mapas y referencias cruzadas", grupo: 1 },
            ],
            apoyo: "Un diccionario bíblico explica personas, lugares, costumbres, objetos y palabras de la Biblia",
            explica: "El diccionario bíblico explica personas, lugares, costumbres, objetos y palabras; la Biblia de estudio reúne introducciones a cada libro, notas, mapas y referencias cruzadas.",
          },
          {
            consigna: "¿Lo buscas en un diccionario bíblico o en una Biblia de estudio? Lleva cada frase a su grupo.",
            grupos: ["En un diccionario bíblico", "En una Biblia de estudio"],
            frases: [
              { texto: "Quién fue una persona de la Biblia", grupo: 0 },
              { texto: "Una costumbre de los tiempos de la Biblia", grupo: 0 },
              { texto: "Un objeto de la Biblia, como el denario", grupo: 0 },
              { texto: "Una palabra de la Biblia que no conoces", grupo: 0 },
              { texto: "La introducción al libro que vas a leer", grupo: 1 },
              { texto: "Las notas y los mapas junto al texto", grupo: 1 },
              { texto: "Las referencias cruzadas de un versículo", grupo: 1 },
            ],
            apoyo: "Una Biblia de estudio reúne introducciones a cada libro, notas, mapas y referencias cruzadas",
            explica: "El diccionario bíblico explica personas, lugares, costumbres, objetos y palabras; la Biblia de estudio reúne introducciones, notas, mapas y referencias cruzadas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el diccionario bíblico y la Biblia de estudio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las notas de una Biblia de estudio son palabras humanas.", verdad: true, explica: "Son ayudas muy valiosas, pero sus notas son palabras humanas.", apoyo: "Son ayudas muy valiosas, pero sus notas son palabras humanas" },
              { texto: "Una buena nota de estudio puede reemplazar al texto bíblico.", verdad: false, explica: "Las notas se leen con gratitud y con discernimiento, y nunca reemplazan al texto.", apoyo: "y nunca reemplazan al texto" },
              { texto: "Las notas de estudio se leen con gratitud y con discernimiento.", verdad: true, explica: "Así se leen las ayudas humanas: con gratitud y con discernimiento.", apoyo: "se leen con gratitud y con discernimiento" },
            ],
          },
          {
            consigna: "Sobre las ayudas para estudiar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Si una nota de estudio lo dice, ya no hace falta leer el texto.", verdad: false, explica: "Las notas nunca reemplazan al texto: todas las herramientas sirven al texto.", apoyo: "Todas sirven al texto y ninguna lo reemplaza" },
              { texto: "La investigación seria es una manera de honrar la verdad.", verdad: true, explica: "Lucas investigó con diligencia todas las cosas: la investigación seria no es enemiga de la fe.", apoyo: "La investigación seria no es enemiga de la fe; es una manera de honrar la verdad", ref: "Lucas 1:3" },
              { texto: "Conviene desconfiar de las aplicaciones que no dicen quién las escribió.", verdad: true, explica: "Usa las que dicen quién las escribió y de dónde sacan lo que enseñan.", apoyo: "Usa las que dicen quién las escribió y de dónde sacan lo que enseñan, y desconfía de las que no lo dicen" },
              { texto: "Estudiar con buenas herramientas es enemigo de la fe.", verdad: false, explica: "Dios ha puesto tesoros en su Palabra para que los busquemos, y buscarlos con buenas herramientas es una honra.", apoyo: "buscarlos con buenas herramientas es una honra", ref: "Proverbios 25:2" },
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
            apoyo: "Unas siguen de cerca las palabras y el orden del original: se llaman de equivalencia formal",
            ref: "Proverbios 25:2",
            clave: {
              id: "pr-n3-metodos-estudio-4-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia una traducción de equivalencia formal de una de equivalencia dinámica?",
              ideas: [
                { id: "formal", peso: 50, texto: "La de equivalencia formal sigue de cerca las palabras y el orden del original, como la Reina-Valera 1960.", formas: ["sigue* de cerca", "orden del original", "palabras del original", "palabras y el orden", "palabra por palabra", "cerca (las|el|del|al) (palabras|original|texto)"] },
                { id: "dinamica", peso: 50, texto: "La de equivalencia dinámica traduce el sentido con palabras de hoy, como Dios Habla Hoy.", formas: ["traduc* el sentido", "el sentido", "palabras de hoy", "dios habla hoy", "lenguaje actual", "lenguaje de hoy", "palabras actuales"] },
              ],
              errores: [
                { id: "formal-sentido", texto: "La de equivalencia formal sigue de cerca las palabras y el orden del original.", formas: ["formal traduc* el sentido", "formal (usa|traduce) palabras de hoy"], anula: "formal" },
                { id: "dinamica-cerca", texto: "La de equivalencia dinámica traduce el sentido con palabras de hoy.", formas: ["dinamica sigue* de cerca", "dinamica (sigue|respeta) el orden"], anula: "dinamica" },
              ],
              modelo: "La de equivalencia formal sigue de cerca las palabras y el orden del original, como la Reina-Valera 1960. La de equivalencia dinámica traduce el sentido con palabras de hoy, como Dios Habla Hoy.",
            },
          },
          {
            apoyo: "Comparar dos o tres versiones ayuda a ver matices, pero la doctrina se estudia en una traducción fiel y no en una paráfrasis libre",
            ref: "Proverbios 25:2",
            clave: {
              id: "pr-n3-metodos-estudio-4-a7-2",
              tipo: "corta",
              pregunta: "¿Para qué sirve comparar versiones de la Biblia, y en qué traducción se estudia la doctrina?",
              ideas: [
                { id: "matices", peso: 50, texto: "Comparar dos o tres versiones ayuda a ver matices.", formas: ["matices", "matiz", "ver (detalles|diferencias)", "ayuda a (ver|entender|notar)"] },
                { id: "fiel", peso: 50, texto: "La doctrina se estudia en una traducción fiel y no en una paráfrasis libre.", formas: ["traduccion fiel", "version fiel", "una fiel", "fiel", "fieles", "reina valera"] },
              ],
              errores: [
                { id: "parafrasis", texto: "La doctrina se estudia en una traducción fiel, no en una paráfrasis libre.", formas: ["estudia* en una parafrasis", "doctrina en una parafrasis", "doctrina con una parafrasis", "estudia* con una parafrasis"], anula: "fiel" },
              ],
              modelo: "Comparar dos o tres versiones ayuda a ver matices del texto. Pero la doctrina se estudia en una traducción fiel, como la Reina-Valera 1960, y no en una paráfrasis libre.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Mapas, historia y comentarios
    "n3-metodos-estudio-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué el hombre descendía de Jerusalén a Jericó?", reverso: "Porque Jerusalén está en los montes, y Jericó, muy por debajo del nivel del mar.", apoyo: "Jerusalén está en los montes de Judea, a unos 750 metros sobre el nivel del mar" },
              { frente: "¿Cómo era el camino de Jerusalén a Jericó?", reverso: "Unos 27 kilómetros por el desierto, entre barrancos: ideal para los ladrones.", apoyo: "El camino, de unos 27 kilómetros, bajaba por el desierto entre barrancos: un lugar ideal para los ladrones" },
              { frente: "¿De dónde salieron Bernabé y Saulo en el primer viaje?", reverso: "De Antioquía de Siria.", apoyo: "Salieron de Antioquía de Siria, navegaron a la isla de Chipre" },
              { frente: "¿Qué ayuda a ver seguir el recorrido de Pablo en un atlas?", reverso: "El costo y el alcance de la misión.", apoyo: "Seguir el recorrido en un atlas ayuda a ver el costo y el alcance de la misión" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A qué altura está Jerusalén?", reverso: "A unos 750 metros sobre el nivel del mar.", apoyo: "a unos 750 metros sobre el nivel del mar" },
              { frente: "¿Dónde está Jericó respecto del nivel del mar?", reverso: "A más de 250 metros por debajo de ese nivel.", apoyo: "y Jericó, a más de 250 metros por debajo de ese nivel" },
              { frente: "En el primer viaje, ¿a qué isla navegaron Bernabé y Saulo?", reverso: "A Chipre.", apoyo: "navegaron a la isla de Chipre" },
              { frente: "¿Cuándo se vuelve más vivo un relato, según la lección?", reverso: "Cuando se ve el terreno.", apoyo: "El relato se vuelve más vivo cuando se ve el terreno" },
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
            consigna: "Completa lo que muestra un atlas del camino de Jerusalén a Jericó.",
            texto: "Jerusalén está en los [[montes]] de Judea, a unos 750 metros sobre el nivel del mar. Jericó está a más de 250 metros por [[debajo]] de ese nivel: por eso el hombre [[descendía]] de Jerusalén a Jericó.",
            distractores: ["valles", "encima", "subía"],
            errores: {
              valles: "Jerusalén está en los montes de Judea, a unos 750 metros sobre el nivel del mar.",
              encima: "Jericó está a más de 250 metros por debajo del nivel del mar.",
              "subía": "Como Jericó está mucho más abajo, el hombre descendía de Jerusalén a Jericó.",
            },
            apoyo: "Un atlas muestra por qué descendía",
            ref: "Lucas 10:30",
            explica: "Jerusalén está en los montes de Judea, a unos 750 metros sobre el nivel del mar, y Jericó, a más de 250 metros por debajo: por eso el hombre descendía.",
          },
          {
            consigna: "Completa cómo era el camino de Jerusalén a Jericó.",
            texto: "El camino, de unos 27 kilómetros, bajaba por el [[desierto]] entre [[barrancos]]: un lugar ideal para los [[ladrones]].",
            distractores: ["río", "jardines", "pastores"],
            errores: {
              "río": "El camino bajaba por el desierto, entre barrancos.",
              jardines: "El camino bajaba por el desierto entre barrancos: un lugar ideal para los ladrones.",
              pastores: "Por el desierto y los barrancos, era un lugar ideal para los ladrones.",
            },
            apoyo: "El camino, de unos 27 kilómetros, bajaba por el desierto entre barrancos: un lugar ideal para los ladrones",
            ref: "Lucas 10:30",
            explica: "Un atlas muestra el terreno: el camino bajaba por el desierto entre barrancos, un lugar ideal para los ladrones. El relato se vuelve más vivo cuando se ve el terreno.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que muestra un atlas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jericó está más alto que Jerusalén.", verdad: false, explica: "Jerusalén está a unos 750 metros sobre el nivel del mar, y Jericó, a más de 250 metros por debajo de ese nivel.", apoyo: "y Jericó, a más de 250 metros por debajo de ese nivel", ref: "Lucas 10:30" },
              { texto: "El camino de Jerusalén a Jericó tenía unos 27 kilómetros.", verdad: true, explica: "El camino, de unos 27 kilómetros, bajaba por el desierto entre barrancos.", apoyo: "El camino, de unos 27 kilómetros, bajaba por el desierto entre barrancos", ref: "Lucas 10:30" },
              { texto: "Un relato se vuelve más vivo cuando se ve el terreno.", verdad: true, explica: "Por eso ayuda el atlas: muestra el terreno donde pasó el relato.", apoyo: "El relato se vuelve más vivo cuando se ve el terreno" },
            ],
          },
          {
            consigna: "Sobre el atlas y los viajes de Pablo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Para el primer viaje, Bernabé y Saulo salieron de Antioquía de Siria.", verdad: true, explica: "Salieron de Antioquía de Siria, navegaron a la isla de Chipre y siguieron por el sur de lo que hoy es Turquía.", apoyo: "Salieron de Antioquía de Siria", ref: "Hechos 13:2-4" },
              { texto: "Un atlas muestra en qué época se escribió cada libro de la Biblia.", verdad: false, explica: "El atlas muestra los lugares y las distancias; la línea de tiempo ubica cada libro en la historia.", apoyo: "El atlas muestra los lugares y las distancias de los relatos" },
              { texto: "La Biblia ocurrió en lugares reales, y conocerlos ilumina su mensaje.", verdad: true, explica: "Es difícil entender un viaje sin un mapa: conocer los lugares ilumina el mensaje.", apoyo: "La Biblia ocurrió en lugares reales y en tiempos reales, y conocerlos ilumina su mensaje" },
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
            consigna: "Ordena estas épocas de la historia bíblica, de la primera a la última.",
            pasos: ["Los patriarcas", "El éxodo", "Los jueces", "El reino unido de Saúl, David y Salomón", "El reino dividido", "El exilio en Babilonia"],
            apoyo: "Una línea de tiempo ubica cada libro en la historia",
            explica: "La línea de tiempo empieza con los patriarcas y sigue con el éxodo, los jueces, el reino unido de Saúl, David y Salomón, el reino dividido y el exilio en Babilonia.",
          },
          {
            consigna: "Ordena estas épocas de la historia bíblica, de la primera a la última.",
            pasos: ["El reino dividido", "El exilio en Babilonia", "El regreso del exilio", "Los siglos entre los dos testamentos", "El tiempo de Jesús bajo el Imperio romano", "La iglesia del primer siglo"],
            apoyo: "el tiempo de Jesús bajo el Imperio romano y la iglesia del primer siglo",
            explica: "Después del reino dividido vienen el exilio en Babilonia, el regreso, los siglos entre los dos testamentos, el tiempo de Jesús bajo el Imperio romano y la iglesia del primer siglo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano que prepara un estudio de Amós te dice: No entiendo por qué Amós denuncia tanto el lujo y la injusticia.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que lo ubique en su tiempo: profetizó en una época de prosperidad.", bien: true, explica: "Amós profetizó en días de Uzías, rey de Judá, y de Jeroboam, rey de Israel, en una época de prosperidad: eso explica por qué denuncia tanto el lujo y la injusticia." },
              { texto: "Que no se fije en eso: el tiempo de un libro no cambia su mensaje.", explica: "Una historia se entiende mejor sabiendo cuándo pasó: conocer el tiempo ilumina el mensaje." },
              { texto: "Que lo lea como si Amós hubiera escrito hoy, para su propia ciudad.", explica: "Amós habló en un tiempo real: saber en qué días profetizó explica por qué denuncia el lujo y la injusticia." },
              { texto: "Que busque la respuesta en un mapa, porque el tiempo no importa.", explica: "El atlas muestra los lugares; la línea de tiempo ubica cada libro en la historia." },
            ],
            apoyo: "en una época de prosperidad, explica por qué denuncia tanto el lujo y la injusticia",
            ref: "Amós 1:1",
            explica: "La línea de tiempo ubica cada libro en la historia: Amós profetizó en días de Uzías y de Jeroboam, en una época de prosperidad, y por eso denuncia tanto el lujo y la injusticia.",
          },
          {
            caso: "Una maestra de jóvenes te dice: Voy a enseñar un libro de la Biblia, pero no sé en qué tiempo pasó.",
            pregunta: "¿Qué le recomiendas?",
            opciones: [
              { texto: "Que use una línea de tiempo para ubicar el libro en la historia.", bien: true, explica: "Una línea de tiempo ubica cada libro en la historia, y conocer su tiempo ilumina su mensaje." },
              { texto: "Que no pierda tiempo en eso: la historia no ayuda a entender la Biblia.", explica: "La Biblia ocurrió en tiempos reales, y conocerlos ilumina su mensaje." },
              { texto: "Que suponga una época cualquiera, porque todas las épocas son iguales.", explica: "Cada libro tiene su lugar en la historia, de los patriarcas a la iglesia del primer siglo." },
              { texto: "Que busque el tiempo del libro en la concordancia, junto a cada palabra.", explica: "La concordancia trae las palabras y sus versículos; para ubicar un libro en la historia está la línea de tiempo." },
            ],
            apoyo: "Una línea de tiempo ubica cada libro en la historia",
            explica: "Es difícil entender una historia sin saber cuándo pasó: la línea de tiempo ubica cada libro en la historia bíblica.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Primero la Biblia y la oración; después tus observaciones; luego la concordancia, el diccionario y el atlas; al final, los comentarios",
            ref: "Hechos 17:11",
            situacion: "Eres líder de célula. El jueves vas a guiar el estudio del primer viaje de Pablo, en Hechos 13 y 14, y hoy empiezas a prepararlo.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes tu Biblia, tu cuaderno y un comentario que te prestaron.",
                pregunta: "¿Por dónde empiezas?",
                opciones: [
                  { texto: "Oras, lees el pasaje y anotas tus propias observaciones.", valor: 2, explica: "Primero la Biblia y la oración; después tus observaciones.", siguiente: "e2" },
                  { texto: "Buscas en el atlas la ruta del viaje antes de leer el pasaje.", valor: 1, explica: "El atlas ayuda a ver el costo y el alcance de la misión, pero va después de la Biblia, la oración y tus observaciones.", siguiente: "e2" },
                  { texto: "Lees primero el comentario, para saber qué buscar en el texto.", valor: 0, explica: "El comentario conviene usarlo después de haber observado e interpretado por cuenta propia, no antes.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al abrir Hechos 13, solo ves lo que dijo el comentario.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Cierras el comentario, oras y observas el pasaje por tu cuenta.", valor: 2, explica: "Así no repites lo que otro vio sin haber visto nada tú mismo.", siguiente: "e2" },
                  { texto: "Sigues con el comentario: ya tienes todo lo que vas a enseñar el jueves.", valor: 0, explica: "Las ayudas deben iluminar tu estudio, no reemplazarlo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya observaste e interpretaste el pasaje por tu cuenta.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Usas el atlas para el viaje y el diccionario para lo que no conoces.", valor: 2, explica: "Luego vienen la concordancia, el diccionario y el atlas: seguir el recorrido ayuda a ver el costo y el alcance de la misión." },
                  { texto: "Das el estudio así, sin abrir ninguna otra herramienta que te pueda ayudar.", valor: 1, explica: "Tu estudio propio vale mucho, pero el atlas y el diccionario iluminan el relato." },
                  { texto: "Copias lo que dice el comentario y lo lees tal cual en la célula.", valor: 0, explica: "Un comentario no reemplaza tu estudio: las ayudas iluminan tu estudio en lugar de reemplazarlo." },
                ],
              },
              {
                id: "e3",
                narra: "Al final abres el comentario, y en un punto no coincide con lo que dice el texto.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te quedas con el texto y examinas el comentario con la Escritura.", valor: 2, explica: "Ningún comentario tiene la autoridad de la Escritura: cuando un comentario y el texto no coinciden, se queda el texto." },
                  { texto: "Lo comparas con otro comentario que explique el texto en su contexto.", valor: 1, explica: "Comparar dos o más es bueno, pero lo que decide es el texto: cuando no coinciden, se queda el texto." },
                  { texto: "Enseñas lo del comentario, porque su autor sabe más que tú.", valor: 0, explica: "Los comentarios son como el consejo de hermanos sabios, pero ningún comentario tiene la autoridad de la Escritura." },
                ],
              },
            ],
          },
          {
            apoyo: "Se usan después del estudio propio y siempre se examinan con la Escritura",
            ref: "Lucas 10:30",
            situacion: "Eres maestro de jóvenes y vas a enseñar Lucas 10:30, el hombre que descendía de Jerusalén a Jericó.",
            escenas: [
              {
                id: "e1",
                narra: "Un compañero te dice: Para ahorrar tiempo, toma el comentario de Matthew Henry y listo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que primero vas a orar, leer el pasaje y anotar lo que observas.", valor: 2, explica: "El comentario conviene usarlo después de haber observado e interpretado por cuenta propia." },
                  { texto: "Que vas a leer dos comentarios en vez de uno, para estar más seguro.", valor: 1, explica: "Comparar dos o más comentarios es bueno, pero después de tu propio estudio, no antes." },
                  { texto: "Que sí: ese comentario ha acompañado a generaciones de predicadores.", valor: 0, explica: "Es un comentario valioso, pero usarlo antes de tu estudio te hace repetir lo que otro vio sin haber visto nada tú mismo." },
                ],
              },
              {
                id: "e2",
                narra: "Ya observaste el pasaje. Ahora quieres entender por qué el hombre descendía.",
                pregunta: "¿Qué herramienta abres?",
                opciones: [
                  { texto: "Un atlas: muestra los montes de Judea y Jericó, mucho más abajo.", valor: 2, explica: "El atlas muestra los lugares y las distancias: Jerusalén está a unos 750 metros sobre el nivel del mar, y Jericó, a más de 250 metros por debajo." },
                  { texto: "Una línea de tiempo, para ver en qué época de la historia pasó el relato.", valor: 1, explica: "La línea de tiempo ubica cada libro en la historia; para los lugares y las distancias sirve el atlas." },
                  { texto: "El comentario, porque seguro que lo explica todo mejor que un mapa.", valor: 0, explica: "Los comentarios van al final; los lugares y las distancias los muestra el atlas." },
                ],
              },
              {
                id: "e3",
                narra: "Al final lees el comentario, y dice algo que el texto no dice.",
                pregunta: "¿Qué enseñas en tu clase?",
                opciones: [
                  { texto: "Lo que dice el texto, tras examinar el comentario con la Escritura.", valor: 2, explica: "Cuando un comentario y el texto no coinciden, se queda el texto, y lo que dice el comentario se examina con la Escritura, como los de Berea." },
                  { texto: "Lo que dice el texto, sin detenerte a examinar lo que dice el comentario.", valor: 1, explica: "Quedarte con el texto es lo principal; pero conviene examinar con la Escritura lo que dice el comentario." },
                  { texto: "Lo que dice el comentario, porque es de un maestro con mucho estudio.", valor: 0, explica: "Ningún comentario tiene la autoridad de la Escritura." },
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
            apoyo: "Conviene usarlo después de haber observado e interpretado por cuenta propia, no antes",
            ref: "Hechos 17:11",
            clave: {
              id: "pr-n3-metodos-estudio-5-a7-1",
              tipo: "corta",
              pregunta: "¿En qué momento conviene usar un comentario bíblico, y por qué?",
              ideas: [
                { id: "despues", peso: 50, texto: "Después de haber observado e interpretado por cuenta propia, no antes.", formas: ["despues de haber (observado|estudiado|interpretado|leido)", "despues de (observar|estudiar|interpretar|leer|mi|tu|nuestro|nuestra|haberlo)", "por cuenta propia", "estudio propio", "al final", "despues del estudio"] },
                { id: "repetir", peso: 50, negativa: true, texto: "Para no repetir lo que otro vio sin haber visto nada uno mismo.", formas: ["repetir lo que otro", "lo que otro vio", "lo que otros (vieron|dicen|dijeron)", "sin haber visto", "(ver|vea|veas|veamos) (yo|uno|tu|nosotros) mismo", "visto nada"] },
              ],
              modelo: "Conviene usarlo después de haber observado e interpretado el pasaje por cuenta propia, no antes, para no repetir lo que otro vio sin haber visto nada uno mismo.",
            },
          },
          {
            apoyo: "cuando un comentario y el texto no coinciden, se queda el texto",
            ref: "Hechos 17:11",
            clave: {
              id: "pr-n3-metodos-estudio-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué haces cuando un comentario y el texto bíblico no coinciden, y por qué?",
              ideas: [
                { id: "texto", peso: 50, texto: "Se queda el texto.", formas: ["se queda el texto", "(quedo|quedarse|quedarme|quedamos) con (el|la) (texto|biblia|escritura|palabra)", "(gana|manda|vale|prevalece) (el|la) (texto|biblia|escritura)", "el texto (gana|manda|vale|prevalece)"] },
                { id: "autoridad", peso: 50, negativa: true, texto: "Porque ningún comentario tiene la autoridad de la Escritura.", formas: ["autoridad de la (escritura|biblia|palabra)", "autoridad", "palabras humanas", "palabra humana", "(examin*|compar*) con la (escritura|biblia|palabra)"] },
              ],
              errores: [
                { id: "comentario-autoridad", texto: "Ningún comentario tiene la autoridad de la Escritura.", formas: ["comentario tiene (la|mas) autoridad", "comentarios tienen (la|mas) autoridad", "comentario (vale|sabe) mas"], anula: "autoridad" },
              ],
              modelo: "Me quedo con el texto, porque ningún comentario tiene la autoridad de la Escritura. Los comentarios son como el consejo de hermanos sabios, pero se examinan con la Escritura.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Cuatro maneras de estudiar
    "n3-metodos-estudio-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es la manera más completa de estudiar la Biblia?", reverso: "Por libro: cada parte se ve a la luz del todo.", apoyo: "Así cada parte se ve a la luz del todo" },
              { frente: "En el estudio por tema, ¿dónde está el cuidado?", reverso: "En leer cada pasaje en su contexto y no armar una doctrina con frases sueltas.", apoyo: "El cuidado está en leer cada pasaje en su contexto y no armar una doctrina con frases sueltas" },
              { frente: "¿Qué se hace en el estudio por palabra?", reverso: "Se estudia una palabra importante en todos sus usos.", apoyo: "Se estudia una palabra importante en todos sus usos" },
              { frente: "¿Qué hace el estudio biográfico?", reverso: "Sigue a una persona por todos los pasajes donde aparece.", apoyo: "El estudio biográfico sigue a una persona por todos los pasajes donde aparece" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué palabra griega traduce gracia en el Nuevo Testamento?", reverso: "Charis, que en la concordancia de Strong lleva el número 5485.", apoyo: "la palabra griega charis, que en la concordancia de Strong lleva el número 5485" },
              { frente: "¿Qué quiere decir el sobrenombre Bernabé?", reverso: "Hijo de consolación.", apoyo: "Los apóstoles le pusieron ese sobrenombre, que «traducido es, Hijo de consolación»" },
              { frente: "¿Qué lecciones para la vida deja el estudio de Bernabé?", reverso: "La generosidad, el valor de recibir a otros y la paciencia con los que fallan.", apoyo: "Un estudio así deja lecciones para la vida: la generosidad, el valor de recibir a otros y la paciencia con los que fallan" },
              { frente: "¿Qué estudio cambia la vida, según la lección?", reverso: "El de cada semana, no el de un día de entusiasmo.", apoyo: "El estudio que cambia la vida no es el de un día de entusiasmo, sino el de cada semana" },
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
            consigna: "Une cada manera de estudiar con lo que se hace en ella.",
            pares: [
              ["Por libro", "Se lee el libro entero varias veces y se estudian sus pasajes uno por uno"],
              ["Por tema", "Se buscan con la concordancia los pasajes que tratan un tema"],
              ["Por palabra", "Se estudia una palabra importante en todos sus usos"],
              ["Biográfico", "Se sigue a una persona por todos los pasajes donde aparece"],
            ],
            apoyo: "Hay cuatro maneras de estudiar: por libro, la más completa; por tema, con la concordancia y cuidando el contexto; por palabra, siguiendo sus usos; y biográfica, siguiendo a una persona, como Bernabé",
            explica: "Por libro se lee todo el libro y se estudian sus pasajes; por tema, se buscan los pasajes de un tema; por palabra, se siguen sus usos; y el biográfico sigue a una persona.",
          },
          {
            consigna: "Une cada manera de estudiar con un ejemplo de la lección.",
            pares: [
              ["Por libro", "Ponerle un título a cada capítulo y a cada sección"],
              ["Por tema", "La oración o la generosidad, con cada pasaje en su contexto"],
              ["Por palabra", "Gracia, que traduce la palabra griega charis"],
              ["Biográfico", "Bernabé, en todos los pasajes donde aparece"],
            ],
            apoyo: "se le pone un título a cada capítulo y a cada sección",
            explica: "Por libro se pone un título a cada capítulo y sección; por tema se estudia, por ejemplo, la oración; por palabra, gracia (charis); y el biográfico sigue a Bernabé.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de jóvenes te dice: Quiero enseñar sobre la generosidad con frases sueltas de aquí y de allá.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que lo haga por tema, pero leyendo cada pasaje en su contexto.", bien: true, explica: "El estudio por tema es útil, pero el cuidado está en leer cada pasaje en su contexto y no armar una doctrina con frases sueltas." },
              { texto: "Que siga así: con frases sueltas se arma bien cualquier enseñanza.", explica: "El cuidado está en no armar una doctrina con frases sueltas: el estudio por tema se apoya en el estudio por libro." },
              { texto: "Que no enseñe temas: la Biblia solo se puede estudiar libro por libro.", explica: "El estudio por tema es una de las cuatro maneras de estudiar: se escoge un tema, como la generosidad, y se buscan sus pasajes." },
              { texto: "Que escoja una sola palabra y no lea nada de lo que la rodea.", explica: "Ver dónde aparece una palabra y qué la rodea muestra la riqueza de su sentido." },
            ],
            apoyo: "El cuidado está en leer cada pasaje en su contexto y no armar una doctrina con frases sueltas",
            explica: "Por tema se escoge un tema, se buscan con la concordancia los pasajes que lo tratan y se ordena lo que enseñan, leyendo cada pasaje en su contexto.",
          },
          {
            caso: "Una hermana de tu célula te dice: Quiero conocer bien un libro de la Biblia, entero. ¿Cómo lo estudio?",
            pregunta: "¿Qué manera de estudiar le propones?",
            opciones: [
              { texto: "Por libro: leerlo entero varias veces y estudiar sus pasajes.", bien: true, explica: "Es la manera más completa: así cada parte se ve a la luz del todo." },
              { texto: "Por palabra: buscar una sola palabra del libro en la concordancia.", explica: "El estudio por palabra sigue una palabra en todos sus usos; para conocer un libro entero conviene el estudio por libro." },
              { texto: "Biográfico: seguir a un solo personaje por toda la Biblia.", explica: "El biográfico sigue a una persona; para conocer un libro, el estudio por libro." },
              { texto: "Por tema: juntar frases sueltas de muchos libros sobre un asunto.", explica: "El estudio por tema se apoya en el estudio por libro, y no se arma con frases sueltas." },
            ],
            apoyo: "Es la manera más completa",
            explica: "El estudio por libro es la manera más completa: se lee el libro entero varias veces, se anotan su tema, su propósito y su estructura, y se estudian sus pasajes uno por uno.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Sigue a Bernabé en los pasajes donde aparece. Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Vende una heredad y pone el precio a los pies de los apóstoles", fecha: "Hechos 4:36-37" },
              { texto: "Lleva a Saulo a los apóstoles cuando los discípulos le temen", fecha: "Hechos 9:26-27" },
              { texto: "Anima a los nuevos creyentes en Antioquía y va a Tarso a buscar a Saulo", fecha: "Hechos 11:22-26" },
              { texto: "Se separa de Pablo porque quiere llevar otra vez a Juan Marcos", fecha: "Hechos 15:37-39" },
              { texto: "Pablo escribe que Marcos le es útil para el ministerio", fecha: "Años después: 2 Timoteo 4:11" },
            ],
            apoyo: "El estudio biográfico sigue a una persona por todos los pasajes donde aparece",
            explica: "Bernabé vende su heredad (Hechos 4), lleva a Saulo a los apóstoles (Hechos 9), anima a los de Antioquía y busca a Saulo (Hechos 11) y se separa de Pablo por Marcos (Hechos 15). Años después, Pablo escribe que Marcos le es útil.",
          },
          {
            consigna: "Ordena en el tiempo lo que muestran los pasajes de Bernabé, del primero al último.",
            eventos: [
              { texto: "Da a los apóstoles el precio de una heredad que vendió", fecha: "Hechos 4:36-37" },
              { texto: "Recibe a Saulo cuando los discípulos le tienen miedo", fecha: "Hechos 9:26-27" },
              { texto: "Lleno del Espíritu Santo y de fe, anima a los de Antioquía", fecha: "Hechos 11:22-26" },
              { texto: "Da a Juan Marcos una segunda oportunidad", fecha: "Hechos 15:37-39" },
              { texto: "Pablo dice de Marcos: «me es útil para el ministerio»", fecha: "Años después: 2 Timoteo 4:11" },
            ],
            apoyo: "Bernabé le dio una segunda oportunidad, y años después Pablo escribió de Marcos",
            explica: "Bernabé da el precio de su heredad (Hechos 4), recibe a Saulo (Hechos 9), anima a los de Antioquía (Hechos 11) y da a Marcos otra oportunidad (Hechos 15). Años después, Pablo dice que Marcos le es útil.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿De qué estaba lleno Bernabé cuando animó a los de Antioquía? Toca las palabras que lo dicen.",
            texto: "era varón bueno, y lleno del [[Espíritu Santo]] y de [[fe]]",
            apoyo: "En Antioquía animó a los nuevos creyentes, porque «era varón bueno, y lleno del Espíritu Santo y de fe»",
            ref: "Hechos 11:24",
            explica: "Bernabé animó a los nuevos creyentes en Antioquía porque «era varón bueno, y lleno del Espíritu Santo y de fe»."
          },
          {
            consigna: "¿Qué quiere decir el sobrenombre Bernabé? Toca las palabras que lo dicen.",
            texto: "traducido es, [[Hijo de consolación]]",
            apoyo: "Los apóstoles le pusieron ese sobrenombre, que «traducido es, Hijo de consolación»",
            ref: "Hechos 4:36",
            explica: "Los apóstoles le pusieron a Bernabé ese sobrenombre, que «traducido es, Hijo de consolación».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se arma un plan de estudio.",
            texto: "Arma tu plan de estudio para el próximo [[mes]]: un [[libro]] para leer completo y un estudio por tema, por palabra o por [[personaje]].",
            distractores: ["siglo", "versículo", "capricho"],
            errores: {
              siglo: "El plan es para el próximo mes: un tiempo cercano y concreto.",
              "versículo": "El plan lleva un libro para leer completo.",
              capricho: "Además del libro, el plan lleva un estudio por tema, por palabra o por personaje.",
            },
            apoyo: "Arma tu plan de estudio para el próximo mes: un libro para leer completo y un estudio por tema, por palabra o por personaje",
            explica: "El plan para el próximo mes lleva un libro para leer completo y, además, un estudio por tema, por palabra o por personaje.",
          },
          {
            consigna: "Completa qué clase de plan es el que transforma.",
            texto: "Lo que transforma es un plan [[constante]], como el de quien [[medita]] de día y de [[noche]].",
            distractores: ["ocasional", "duerme", "tarde"],
            errores: {
              ocasional: "Lo que transforma es un plan constante: el estudio de cada semana, no el de un día de entusiasmo.",
              duerme: "El bienaventurado del Salmo 1 medita en la ley de Dios.",
              tarde: "El Salmo 1 habla de quien medita de día y de noche.",
            },
            apoyo: "Lo que transforma es un plan constante, como el de quien medita de día y de noche",
            ref: "Salmos 1:2",
            explica: "El estudio que cambia la vida no es el de un día de entusiasmo, sino el de cada semana: un plan constante, como el de quien medita de día y de noche.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Arma tu plan de estudio para el próximo mes: un libro para leer completo y un estudio por tema, por palabra o por personaje",
            ref: "Salmos 1:2",
            clave: {
              id: "pr-n3-metodos-estudio-6-a7-1",
              tipo: "corta",
              pregunta: "Arma tu plan de estudio para el próximo mes: ¿qué libro vas a leer completo, cuándo vas a estudiar y qué otro estudio vas a hacer?",
              ideas: [
                { id: "libro", peso: 40, texto: "Un libro para leer completo.", formas: ["libro complet*", "complet*", "entero", "de principio a fin"] },
                { id: "tiempo", peso: 30, texto: "Un tiempo fijo cada semana.", formas: ["tiempo fijo", "hora fija", "cada (semana|dia|manana|noche|tarde)", "todos los (dias|lunes|martes|miercoles|jueves|viernes|sabados|domingos)", "(lunes|martes|miercoles|jueves|viernes|sabado|sabados|domingo|domingos)", "(por|en|de) la (manana|noche|tarde)", "a las"] },
                { id: "otro", peso: 30, texto: "Un estudio por tema, por palabra o por personaje.", formas: ["por tema", "por palabra", "por personaje", "biografic*", "un personaje", "una palabra", "un tema", "la vida de"] },
              ],
              modelo: "Voy a leer completo el libro de Marcos, cada mañana a las seis, con mi cuaderno. Y voy a hacer un estudio por personaje: la vida de Bernabé, en todos los pasajes donde aparece.",
            },
          },
          {
            apoyo: "Lo que transforma es un plan constante, como el de quien medita de día y de noche",
            ref: "Salmos 1:2",
            clave: {
              id: "pr-n3-metodos-estudio-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué clase de estudio cambia la vida, según la lección, y qué lleva un buen plan?",
              ideas: [
                { id: "constante", peso: 50, texto: "El de cada semana, no el de un día de entusiasmo: un plan constante, como el de quien medita de día y de noche.", formas: ["constan*", "cada semana", "de dia y de noche", "medit*", "todas las semanas", "cada dia", "todos los dias"] },
                { id: "plan", peso: 50, texto: "Un libro para leer completo, un tiempo fijo, un cuaderno y, de vez en cuando, un estudio por tema, por palabra o por personaje.", formas: ["libro complet*", "leer complet*", "tiempo fijo", "cuaderno", "por tema", "por palabra", "por personaje"] },
              ],
              modelo: "Cambia la vida el estudio constante, el de cada semana, como el de quien medita de día y de noche. Un buen plan lleva un libro para leer completo, un tiempo fijo, un cuaderno y un estudio por tema.",
            },
          },
        ],
      },
    ],
  },
};
