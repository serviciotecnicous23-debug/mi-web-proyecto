/**
 * Las prácticas de «Hermenéutica» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-hermeneutica.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_HERMENEUTICA: PracticasMateria = {
  materia: "n3-hermeneutica",
  mision: {
    titulo: "Obreros que usan bien la Palabra",
    intro: "Tu pastor te pidió acompañar a un grupo de servidores nuevos que empiezan a enseñar la Biblia en las células. Te traen muchas preguntas: qué es interpretar, cómo leer un versículo en su contexto, qué hacer con las palabras, las figuras y los géneros, cómo evitar los errores comunes y cómo llevar un pasaje a la vida. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar qué es la hermenéutica, leer cada texto en su contexto y según su género, entender sus palabras y sus figuras, examinar una enseñanza con las Escrituras como los de Berea y pasar del texto a la vida: estudiar, cumplir y enseñar, como Esdras.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Qué es la hermenéutica?
    "n3-hermeneutica-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la hermenéutica?", reverso: "El estudio de los principios que permiten interpretar bien un texto.", apoyo: "La hermenéutica es el estudio de los principios que permiten interpretar bien un texto" },
              { frente: "¿Qué hacía Jesús en el camino a Emaús, según Lucas?", reverso: "«les declaraba en todas las Escrituras lo que de él decían»", apoyo: "Lucas usa un verbo de la misma familia cuando cuenta que Jesús, en el camino a Emaús, «les declaraba en todas las Escrituras lo que de él decían»" },
              { frente: "¿Qué es la exégesis?", reverso: "Sacar del texto el sentido que su autor quiso darle.", apoyo: "Exégesis (del griego, sacar hacia fuera): sacar del texto el sentido que su autor quiso darle" },
              { frente: "¿Qué es la eiségesis?", reverso: "Poner en el texto lo que uno ya piensa o quiere oír.", apoyo: "Eiségesis (meter hacia dentro): poner en el texto lo que uno ya piensa o quiere oír" },
              { frente: "¿Cambia el sentido de un pasaje según quién lo lea?", reverso: "No: el sentido no cambia con el lector; lo que cambia son las aplicaciones.", apoyo: "Cada pasaje tiene el sentido que Dios y su autor humano quisieron darle, y ese sentido no cambia con el lector" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál practica el obrero fiel: la exégesis o la eiségesis?", reverso: "La exégesis: deja que el texto hable y se somete a lo que dice.", apoyo: "El obrero fiel practica la exégesis: deja que el texto hable y se somete a lo que dice" },
              { frente: "¿Cuál es la tarea de quien enseña la Palabra?", reverso: "Leerla bien y explicarla para que se entienda.", apoyo: "Esa es la tarea de quien enseña la Palabra: leerla bien y explicarla para que se entienda" },
              { frente: "¿Qué respondió el etíope a la pregunta de Felipe?", reverso: "«¿Y cómo podré, si alguno no me enseñare?»", apoyo: "El etíope respondió con sinceridad: «¿Y cómo podré, si alguno no me enseñare?»" },
              { frente: "¿Basta con leer para entender lo que Dios quiso decir?", reverso: "No: leer es el primer paso, y entender requiere aprender a interpretar.", apoyo: "Leer es el primer paso; entender lo que Dios quiso decir requiere aprender a interpretar" },
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
            consigna: "¿Es exégesis o eiségesis? Lleva cada frase a su grupo.",
            grupos: ["Es exégesis", "Es eiségesis"],
            frases: [
              { texto: "Sacar del texto el sentido que su autor quiso darle", grupo: 0 },
              { texto: "Dejar que el texto hable", grupo: 0 },
              { texto: "Someterse a lo que dice el texto", grupo: 0 },
              { texto: "Preguntar qué quiso decir el texto a sus primeros lectores", grupo: 0 },
              { texto: "Poner en el texto lo que uno ya piensa", grupo: 1 },
              { texto: "Hacerle decir al texto lo que uno quiere oír", grupo: 1 },
              { texto: "Meterle al texto un sentido propio", grupo: 1 },
              { texto: "Leer el pasaje con la respuesta ya decidida", grupo: 1, explica: "Quien ya decidió la respuesta pone en el texto lo que él piensa." },
            ],
            apoyo: "Exégesis (del griego, sacar hacia fuera): sacar del texto el sentido que su autor quiso darle",
            explica: "La exégesis saca del texto el sentido que su autor quiso darle; la eiségesis pone en el texto lo que uno ya piensa o quiere oír.",
          },
          {
            consigna: "¿Este maestro hace exégesis o eiségesis? Lleva cada frase a su grupo.",
            grupos: ["Hace exégesis", "Hace eiségesis"],
            frases: [
              { texto: "Lee el pasaje para descubrir qué quiso decir su autor", grupo: 0 },
              { texto: "Cambia su idea cuando el texto dice otra cosa", grupo: 0, explica: "El obrero fiel se somete a lo que dice el texto." },
              { texto: "Deja que el pasaje hable antes de dar su opinión", grupo: 0 },
              { texto: "Busca un versículo que diga lo que él ya pensaba", grupo: 1 },
              { texto: "Le hace decir al texto lo que la gente quiere oír", grupo: 1 },
              { texto: "Mete en el pasaje una idea suya que el autor no quiso dar", grupo: 1 },
            ],
            apoyo: "Eiségesis (meter hacia dentro): poner en el texto lo que uno ya piensa o quiere oír",
            explica: "El obrero fiel practica la exégesis: deja que el texto hable y se somete a lo que dice. La eiségesis mete en el texto lo que uno ya piensa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada distancia con lo que hay que recorrer en ella.",
            pares: [
              ["El idioma", "Hebreo, arameo y griego"],
              ["La cultura", "Costumbres, oficios, monedas, comidas y saludos"],
              ["La historia", "Imperios, reyes, guerras y la situación de cada iglesia"],
              ["La geografía", "Ciudades, caminos, montes y distancias"],
              ["El género", "No se lee igual un salmo que una ley"],
            ],
            apoyo: "Entre aquellos primeros lectores y nosotros hay distancias que se recorren con cuidado",
            explica: "La Biblia fue escrita en otros idiomas, en otras culturas y para situaciones concretas: por eso hay distancias que se recorren con cuidado.",
          },
          {
            consigna: "¿Qué distancia hay que recorrer en cada caso? Une cada ejemplo con su distancia.",
            pares: [
              ["El Nuevo Testamento se escribió en griego", "La distancia del idioma"],
              ["Una forma de saludar que no es la nuestra", "La distancia de la cultura"],
              ["La situación de la iglesia que recibió una carta", "La distancia de la historia"],
              ["Los montes y caminos que dan sentido a un relato", "La distancia de la geografía"],
              ["Una parábola no se lee igual que una visión", "La distancia del género"],
            ],
            apoyo: "La Biblia es Palabra de Dios para todos los tiempos, pero fue escrita en otros idiomas, en otras culturas y para situaciones concretas",
            explica: "Hace falta interpretar porque entre los primeros lectores y nosotros hay distancias de idioma, cultura, historia, geografía y género.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué hacen el Espíritu y el creyente con las Escrituras? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "espiritu", texto: "El Espíritu Santo", x: 25, y: 12 },
              { id: "escrituras", texto: "Las Escrituras", x: 75, y: 45 },
              { id: "creyente", texto: "El creyente", x: 25, y: 85 },
            ],
            enlaces: [
              { de: "espiritu", a: "escrituras", relacion: "inspiró" },
              { de: "espiritu", a: "creyente", relacion: "ilumina a" },
              { de: "creyente", a: "escrituras", relacion: "estudia con diligencia" },
            ],
            distractores: ["reemplaza el estudio de", "contradice"],
            apoyo: "El Espíritu Santo, que inspiró las Escrituras, ilumina al creyente para que las entienda y las reciba",
            ref: "2 Timoteo 2:15",
            explica: "El Espíritu inspiró las Escrituras e ilumina al creyente para que las entienda, sin reemplazar el estudio: el creyente las estudia con diligencia.",
          },
          {
            consigna: "¿Quién puede entender las cosas del Espíritu? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "jesus", texto: "Jesús", x: 25, y: 10 },
              { id: "discipulos", texto: "Sus discípulos", x: 75, y: 30 },
              { id: "escrituras", texto: "Las Escrituras", x: 25, y: 52 },
              { id: "natural", texto: "El hombre natural", x: 75, y: 72 },
              { id: "cosas", texto: "Las cosas del Espíritu", x: 25, y: 92 },
            ],
            enlaces: [
              { de: "jesus", a: "discipulos", relacion: "abrió el entendimiento a" },
              { de: "discipulos", a: "escrituras", relacion: "comprendieron" },
              { de: "natural", a: "cosas", relacion: "no puede entender" },
            ],
            distractores: ["entiende sin ayuda", "olvidaron"],
            apoyo: "Así obró Jesús con sus discípulos: «les abrió el entendimiento, para que comprendiesen las Escrituras»",
            ref: "Lucas 24:44-45; 1 Corintios 2:14",
            explica: "Jesús abrió el entendimiento a sus discípulos para que comprendieran las Escrituras; el hombre natural no puede entender las cosas del Espíritu.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu célula te dice: Yo no necesito estudiar la Biblia; el Espíritu me dice lo que significa cada versículo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "El Espíritu ilumina, pero no reemplaza el estudio: oración y diligencia van juntas.", bien: true, explica: "La iluminación del Espíritu no reemplaza el estudio: por eso la oración y la diligencia van juntas." },
              { texto: "Tienes razón: si el Espíritu ya te lo dice, estudiar la Biblia no te hace ninguna falta.", explica: "La iluminación no reemplaza el estudio ni trae un sentido nuevo que contradiga lo escrito." },
              { texto: "El Espíritu no tiene nada que ver: interpretar la Biblia es solo una técnica de estudio.", explica: "Interpretar no es solo una técnica: el Espíritu que inspiró las Escrituras ilumina al creyente." },
              { texto: "Estudia solo cuando el Espíritu no te diga nada del versículo.", explica: "La oración y la diligencia no van por turnos: van juntas." },
            ],
            apoyo: "La iluminación del Espíritu no reemplaza el estudio ni trae un sentido nuevo que contradiga lo escrito",
            ref: "2 Timoteo 2:15",
            explica: "El Espíritu ilumina al creyente para que entienda las Escrituras, pero no reemplaza el estudio: Pablo pidió a Timoteo que procurara con diligencia presentarse a Dios aprobado.",
          },
          {
            caso: "Una maestra de niños te dice: Yo preparo mis clases con buenos libros; orar antes de estudiar no me hace falta.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Ora y estudia: el Espíritu que inspiró la Biblia te ilumina para que la entiendas.", bien: true, explica: "Interpretar no es solo una técnica: el Espíritu ilumina al creyente, y la oración y la diligencia van juntas." },
              { texto: "Haces bien: con buenos libros y una buena técnica basta para entender la Biblia.", explica: "Interpretar no es solo una técnica: el Espíritu Santo ilumina al creyente para que entienda y reciba la Palabra." },
              { texto: "Deja los libros y solo ora: el Espíritu te dará el sentido sin que tengas que estudiar.", explica: "La iluminación del Espíritu no reemplaza el estudio." },
              { texto: "Ora solo cuando un pasaje sea difícil; para todo lo demás, el estudio ya te basta.", explica: "La oración y la diligencia van juntas siempre, no solo con los pasajes difíciles." },
            ],
            apoyo: "Interpretar no es solo una técnica",
            ref: "Lucas 24:45",
            explica: "El Espíritu Santo, que inspiró las Escrituras, ilumina al creyente para que las entienda: por eso la oración y la diligencia van juntas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Exégesis (del griego, sacar hacia fuera): sacar del texto el sentido que su autor quiso darle",
            clave: {
              id: "pr-n3-hermeneutica-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué diferencia hay entre la exégesis y la eiségesis?",
              ideas: [
                { id: "exegesis", peso: 50, texto: "La exégesis saca del texto el sentido que su autor quiso darle.", formas: ["saca* del texto", "sacar* el sentido", "sacar hacia fuera", "sentido que (su|el) autor", "lo que (el|su) autor quiso", "dej* que el texto hable", "dej* hablar al texto"] },
                { id: "eisegesis", peso: 50, texto: "La eiségesis pone en el texto lo que uno ya piensa o quiere oír.", formas: ["pon* en el texto", "pon* al texto", "mete* en el texto", "mete* al texto", "meter hacia dentro", "uno ya piensa", "lo que (uno|yo) (piensa|pienso)", "quier* oir", "(mis|sus|nuestras|propias) ideas"] },
              ],
              errores: [
                { id: "exegesis-al-reves", texto: "La exégesis saca del texto el sentido de su autor: la que pone en el texto lo que uno piensa es la eiségesis.", formas: ["exegesis pon*", "exegesis mete*", "exegesis es poner", "exegesis es meter"], anula: "exegesis" },
                { id: "eisegesis-al-reves", texto: "La eiségesis pone en el texto lo que uno piensa: la que saca del texto el sentido de su autor es la exégesis.", formas: ["eisege* saca*", "eisege* es sacar", "eisege* dej*"], anula: "eisegesis" },
              ],
              modelo: "La exégesis saca del texto el sentido que su autor quiso darle y deja que el texto hable. La eiségesis pone en el texto lo que uno ya piensa o quiere oír.",
            },
          },
          {
            apoyo: "La hermenéutica es el estudio de los principios que permiten interpretar bien un texto",
            clave: {
              id: "pr-n3-hermeneutica-1-a6-2",
              tipo: "corta",
              pregunta: "¿Qué es la hermenéutica, y por qué el obrero fiel practica la exégesis?",
              ideas: [
                { id: "hermeneutica", peso: 50, texto: "La hermenéutica es el estudio de los principios que permiten interpretar bien un texto.", formas: ["estudio de (los|sus) principios", "principios (para|que|de)", "interpret* bien", "entender bien", "explicar bien"] },
                { id: "exegesis", peso: 50, texto: "El obrero fiel practica la exégesis: deja que el texto hable y se somete a lo que dice.", formas: ["dej* que el texto hable", "dej* hablar al texto", "somet* a lo que dice", "somet* al texto", "saca* del texto", "sacar* el sentido", "sentido que (su|el) autor", "lo que (el|su) autor quiso"] },
              ],
              modelo: "La hermenéutica es el estudio de los principios que permiten interpretar bien un texto. El obrero fiel practica la exégesis porque deja que el texto hable y se somete a lo que dice.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El contexto: cada texto en su lugar
    "n3-hermeneutica-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el contexto?", reverso: "Todo lo que rodea a un texto y le da sentido.", apoyo: "El contexto es todo lo que rodea a un texto y le da sentido" },
              { frente: "¿Qué incluye el contexto inmediato?", reverso: "Los versículos de antes y de después, y el párrafo completo.", apoyo: "El contexto inmediato: los versículos de antes y de después, y el párrafo completo" },
              { frente: "¿Qué se mira en el círculo del libro?", reverso: "Su propósito, su estructura y su tema principal.", apoyo: "El libro: su propósito, su estructura y su tema principal" },
              { frente: "¿Dónde tiene su centro la historia de la salvación?", reverso: "En Cristo.", apoyo: "Toda la Biblia: la historia de la salvación, que tiene su centro en Cristo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dice el dicho sobre un texto fuera de contexto?", reverso: "Que es un pretexto.", apoyo: "Un texto fuera de contexto es un pretexto" },
              { frente: "¿Cuál es el primer paso de toda buena interpretación?", reverso: "Leer el capítulo completo.", apoyo: "Leer el capítulo completo es el primer paso de toda buena interpretación" },
              { frente: "¿Qué incluye el contexto histórico y cultural?", reverso: "El autor, los primeros lectores, la fecha, el lugar y la situación.", apoyo: "El contexto histórico y cultural: el autor, los primeros lectores, la fecha, el lugar y la situación que motivó el escrito" },
              { frente: "¿Qué puede pasar con un versículo separado de su lugar?", reverso: "Puede decir lo que Dios no dijo.", apoyo: "un versículo separado de su lugar puede decir lo que Dios no dijo" },
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
            consigna: "Une cada círculo del contexto con lo que se estudia en él.",
            pares: [
              ["El contexto inmediato", "Los versículos de antes y de después"],
              ["El libro", "Su propósito, su estructura y su tema principal"],
              ["Toda la Biblia", "La historia de la salvación, con su centro en Cristo"],
              ["El contexto histórico y cultural", "El autor, los lectores, la fecha, el lugar y la situación"],
            ],
            apoyo: "Se estudia como círculos que se van abriendo",
            explica: "El contexto se estudia como círculos que se van abriendo: los versículos cercanos, el libro, toda la Biblia y la situación histórica.",
          },
          {
            consigna: "¿Qué círculo del contexto estás mirando? Une cada caso con su círculo.",
            pares: [
              ["Lees los versículos 11 y 12 antes de Filipenses 4:13", "El contexto inmediato"],
              ["Buscas el tema principal de Filipenses", "El círculo del libro"],
              ["Ubicas el pasaje en la historia de la salvación", "Toda la Biblia"],
              ["Averiguas que Pablo escribió desde la prisión", "El contexto histórico"],
            ],
            apoyo: "Cada texto se entiende en su lugar: sus versículos cercanos, su libro, la Biblia entera y su situación histórica",
            explica: "Cada texto se entiende en su lugar: los versículos cercanos, el libro, la Biblia entera y la situación histórica.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Lo que Pablo puede «en Cristo que me fortalece» es vivir fiel y contento en la escasez y en la abundancia",
            ref: "Filipenses 4:11-13",
            situacion: "Eres líder de una célula de jóvenes. Antes de un partido importante, Andrés lee Filipenses 4:13 y dice que ese versículo le promete ganar el campeonato.",
            escenas: [
              {
                id: "e1",
                narra: "Andrés termina de leer y el grupo te mira, esperando lo que vas a decir.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Invitas al grupo a leer juntos los versículos 11 y 12.", valor: 2, explica: "Los versículos de antes cambian la lectura: leer el contexto es el primer paso de toda buena interpretación." },
                  { texto: "Le dices que lea el capítulo en su casa, y sigues con la reunión.", valor: 1, explica: "Leer el capítulo es el camino, pero el grupo se queda sin ver lo que dice el versículo en su lugar." },
                  { texto: "Le aseguras que el versículo le promete ganar el campeonato.", valor: 0, explica: "Así se cita a menudo, como la promesa de lograr cualquier meta, pero los versículos de antes dicen otra cosa." },
                ],
              },
              {
                id: "e2",
                narra: "Al leer, el grupo ve que Pablo aprendió a contentarse en toda situación, y tú les cuentas que escribía desde la prisión. Andrés pregunta qué significa entonces el versículo 13.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Pablo podía vivir fiel y contento en la escasez y en la abundancia.", valor: 2, explica: "Eso es lo que Pablo puede en Cristo que lo fortalece, según los versículos de antes." },
                  { texto: "Que en Cristo podemos lograr cualquier meta que nos propongamos en la vida.", valor: 0, explica: "Esa es la lectura que el contexto corrige: Pablo habla de contentarse en toda situación." },
                  { texto: "Que Dios nos ayuda en todo, aunque este versículo no sea para un partido.", valor: 1, explica: "Es cierto que Cristo fortalece, pero falta lo que el texto enseña: vivir contento en la escasez y en la abundancia." },
                ],
              },
              {
                id: "e3",
                narra: "Andrés se queda pensando y pregunta qué pasa si pierde el partido.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que Cristo lo fortalece para seguir fiel y contento aunque pierda.", valor: 2, explica: "Así se aplica el versículo en su contexto: Pablo aprendió a contentarse cualquiera que fuera su situación." },
                  { texto: "Que si pierde, será porque no creyó con suficiente fuerza en la promesa.", valor: 0, explica: "El versículo no promete ganar: enseña a vivir contento en la escasez y en la abundancia." },
                  { texto: "Que no piense en eso ahora y que juegue lo mejor que pueda.", valor: 1, explica: "Es un buen ánimo, pero no le muestra lo que el texto enseña para cuando pierde." },
                ],
              },
            ],
          },
          {
            apoyo: "Es verdad que el Señor está siempre con los suyos (Mateo 28:20), pero el pasaje trata algo más concreto: cómo restaurar al hermano que peca",
            ref: "Mateo 18:15-20",
            situacion: "Diriges la reunión de oración de tu célula. Esta noche solo llegaron dos hermanas, y Rosa dice: Qué bueno que somos dos; cuando oro sola en casa, el Señor no está conmigo.",
            escenas: [
              {
                id: "e1",
                narra: "Rosa lo dice convencida, porque así entiende Mateo 18:20.",
                pregunta: "¿Qué le respondes primero?",
                opciones: [
                  { texto: "Que el Señor está siempre con los suyos, también cuando ella ora sola.", valor: 2, explica: "Es verdad que el Señor está siempre con los suyos (Mateo 28:20)." },
                  { texto: "Que tiene razón: el Señor solo está presente cuando se juntan dos o tres.", valor: 0, explica: "El Señor está siempre con los suyos: Mateo 18:20 trata algo más concreto." },
                  { texto: "Que no se preocupe por eso ahora y que empiecen a orar ya.", valor: 1, explica: "Orar es bueno, pero Rosa se queda con una idea que el texto no enseña." },
                ],
              },
              {
                id: "e2",
                narra: "Rosa pregunta: Entonces, ¿de qué habla Mateo 18:20?",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Leen juntas los versículos 15 al 20 para ver de qué trata.", valor: 2, explica: "Leer los versículos de antes es el primer paso: el contexto le da sentido al texto." },
                  { texto: "Le dices que es un versículo para las reuniones pequeñas de oración.", valor: 0, explica: "Así suele recordarse, pero el pasaje trata de cómo restaurar al hermano que peca." },
                  { texto: "Le pides que lo busque en casa cuando tenga un poco de tiempo.", valor: 1, explica: "Estudiarlo en casa es bueno, pero esta era la ocasión de leerlo juntas en su contexto." },
                ],
              },
              {
                id: "e3",
                narra: "Al leer, Rosa ve que el pasaje habla de un hermano que peca.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que trata de cómo restaurarlo: a solas, con testigos y ante la iglesia.", valor: 2, explica: "Cuando la iglesia actúa así, de acuerdo y en el nombre de Jesús, él promete estar en medio de ellos." },
                  { texto: "Que enseña cuántas personas hacen falta para que Dios escuche.", valor: 0, explica: "El pasaje no trata de un número para orar, sino de restaurar al hermano que peca." },
                  { texto: "Que trata de corregir al hermano que peca, siempre delante de toda la iglesia.", valor: 1, explica: "Falta el camino: primero a solas, después con uno o dos testigos y, por último, delante de la iglesia." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Jeremías 29:11 en su contexto tiene un error. Tócala.",
            frases: [
              "Jeremías escribió una carta a los judíos llevados cautivos a Babilonia.",
              "Antes de la promesa, Dios habla de setenta años en Babilonia.",
              "Dios les mandó edificar casas, plantar huertos y procurar la paz de la ciudad.",
              "La promesa anunciaba que los cautivos saldrían muy pronto de Babilonia.",
            ],
            malo: 3,
            correccion: "La promesa era real, pero no anunciaba una salida rápida: setenta años eran casi una vida entera.",
            apoyo: "La promesa de «pensamientos de paz, y no de mal» era real, pero no anunciaba una salida rápida",
            ref: "Jeremías 29:10-11",
            explica: "Dios es fiel a sus propósitos de bien aun en medio de la prueba, y su tiempo no siempre es el nuestro.",
          },
          {
            consigna: "Una de estas frases sobre los tres ejemplos de la lección tiene un error. Tócala.",
            frases: [
              "Filipenses 4:13 habla de vivir contento en la escasez y en la abundancia.",
              "Los tres versículos se entienden mejor leídos solos, sin los de alrededor.",
              "Jeremías 29:11 está en una carta a los judíos cautivos en Babilonia.",
              "Mateo 18:20 está en la enseñanza sobre restaurar al hermano que peca.",
            ],
            malo: 1,
            correccion: "Cada texto se entiende en su lugar: leer el capítulo completo es el primer paso.",
            apoyo: "Leer el capítulo completo es el primer paso de toda buena interpretación",
            explica: "Un texto fuera de contexto es un pretexto: separado de su lugar, se le puede hacer decir a Dios lo que no dijo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que buscan las preguntas del contexto histórico.",
            texto: "Las preguntas del contexto histórico buscan al [[autor]], a los primeros [[lectores]], la [[fecha]], el lugar y la situación que motivó el escrito.",
            distractores: ["copista", "críticos", "tinta"],
            errores: {
              copista: "Se busca al autor: quién lo escribió y a quién.",
              "críticos": "Se busca a los primeros lectores: a quién se escribió.",
              tinta: "Se busca la fecha: cuándo y desde dónde se escribió.",
            },
            apoyo: "El contexto histórico y cultural: el autor, los primeros lectores, la fecha, el lugar y la situación que motivó el escrito",
            explica: "Las preguntas del contexto histórico buscan quién lo escribió y a quién, cuándo y desde dónde, y qué situación lo motivó.",
          },
          {
            consigna: "Completa lo que responden las preguntas del contexto en Filipenses.",
            texto: "Al preguntar desde dónde y para qué escribió Pablo, vemos que escribió desde la [[prisión]] y para agradecer una [[ofrenda]].",
            distractores: ["sinagoga", "victoria"],
            errores: {
              sinagoga: "Pablo escribe desde la prisión (Filipenses 1:13).",
              victoria: "Pablo no escribe por una victoria: escribe para agradecer una ofrenda (4:10, 18).",
            },
            apoyo: "Además, escribe desde la prisión (Filipenses 1:13) y para agradecer una ofrenda (4:10, 18)",
            ref: "Filipenses 1:13; 4:10, 18",
            explica: "Preguntar desde dónde y para qué se escribió una carta ilumina el texto: Pablo escribe desde la prisión y para agradecer una ofrenda.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El principio sigue en pie para el pueblo de Dios: él es fiel a sus propósitos de bien aun en medio de la prueba, y su tiempo no siempre es el nuestro",
            ref: "Jeremías 29:10-11",
            clave: {
              id: "pr-n3-hermeneutica-2-a6-1",
              tipo: "corta",
              pregunta: "¿Qué enseña Jeremías 29:11 cuando se lee en su contexto?",
              ideas: [
                { id: "cautivos", peso: 40, texto: "Fue una carta a los judíos cautivos en Babilonia, que esperarían setenta años.", formas: ["cautiv*", "babilonia", "setenta", "70", "exilio", "destierro"] },
                { id: "fiel", peso: 60, texto: "Dios es fiel a sus propósitos de bien aun en medio de la prueba, y su tiempo no siempre es el nuestro.", formas: ["fiel*", "proposito* de bien", "en medio de la prueba", "en la prueba", "su tiempo", "a su tiempo", "tiempo de dios"] },
              ],
              modelo: "Fue una carta a los judíos cautivos en Babilonia, que esperarían setenta años. Enseña que Dios es fiel a sus propósitos de bien aun en medio de la prueba, aunque su tiempo no siempre es el nuestro.",
            },
          },
          {
            apoyo: "Cuando la iglesia actúa así, de acuerdo y en el nombre de Jesús, él promete estar «en medio de ellos»",
            ref: "Mateo 18:15-20",
            clave: {
              id: "pr-n3-hermeneutica-2-a6-2",
              tipo: "corta",
              pregunta: "¿De qué trata Mateo 18:20 cuando se lee con los versículos de antes?",
              ideas: [
                { id: "restaurar", peso: 60, texto: "Trata de cómo restaurar al hermano que peca: primero a solas, después con uno o dos testigos y por último ante la iglesia.", formas: ["restaur*", "hermano que peca", "a solas", "testigos", "delante de la iglesia", "ante la iglesia", "correg* al hermano"] },
                { id: "presencia", peso: 40, texto: "Cuando la iglesia actúa así, de acuerdo y en el nombre de Jesús, él promete estar en medio de ellos.", formas: ["en medio de ellos", "de acuerdo", "en (el|su) nombre", "promete estar", "esta presente", "presencia"] },
              ],
              modelo: "Trata de cómo restaurar al hermano que peca: primero a solas, después con uno o dos testigos y por último delante de la iglesia. Cuando la iglesia actúa así, de acuerdo y en el nombre de Jesús, él promete estar en medio de ellos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Las palabras, las figuras y la cultura
    "n3-hermeneutica-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el mundo en Juan 3:16?", reverso: "La humanidad, a la que Dios amó tanto que dio a su Hijo.", apoyo: "En Juan 3:16 es la humanidad, a la que Dios amó tanto que dio a su Hijo" },
              { frente: "¿Qué es el mundo en 1 Juan 2:15?", reverso: "El sistema de valores que se opone a Dios.", apoyo: "es decir, el sistema de valores que se opone a Dios" },
              { frente: "¿Qué decide el sentido de una palabra?", reverso: "El contexto: la misma palabra puede tener sentidos distintos.", apoyo: "La misma palabra, en el mismo autor, tiene sentidos distintos: el contexto decide" },
              { frente: "¿Con qué se buscan los otros usos de una palabra?", reverso: "Con una concordancia; también se consulta un diccionario bíblico.", apoyo: "se buscan sus otros usos con una concordancia y se consulta un diccionario bíblico" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dos sentidos puede tener la palabra carne?", reverso: "El cuerpo humano o la naturaleza que se inclina al pecado.", apoyo: "Carne puede ser el cuerpo humano, como cuando el Verbo se hizo hombre (Juan 1:14), o la naturaleza que se inclina al pecado (Gálatas 5:16-17)" },
              { frente: "¿El sentido de una palabra se aprende por su uso en la frase o por su origen?", reverso: "Por su uso en la frase, no por su origen.", apoyo: "el sentido de una palabra se aprende por su uso en la frase, no por su origen" },
              { frente: "¿Qué ejemplo de palabra con dos sentidos da el comienzo de la lección?", reverso: "Banco: un asiento o el lugar donde se guarda el dinero.", apoyo: "banco puede ser un asiento o el lugar donde se guarda el dinero" },
              { frente: "¿Qué hacer cuando una palabra de la Biblia te parece clara?", reverso: "Mirar si se usa igual en otros pasajes.", apoyo: "Cuando una palabra de la Biblia te parezca clara, mira si se usa igual en otros pasajes" },
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
            consigna: "Completa lo que significa la palabra mundo en cada pasaje de Juan.",
            texto: "En Juan 3:16 el mundo es la [[humanidad]] que Dios amó; en 1 Juan 2:15 es el [[sistema]] de valores que se opone a Dios: el [[contexto]] decide.",
            distractores: ["tierra", "planeta", "lector"],
            errores: {
              tierra: "En Juan 3:16, el mundo es la humanidad, a la que Dios amó tanto que dio a su Hijo.",
              planeta: "En 1 Juan 2:15, el mundo es el sistema de valores que se opone a Dios.",
              lector: "La misma palabra tiene sentidos distintos, y el contexto decide cuál es.",
            },
            apoyo: "La misma palabra, en el mismo autor, tiene sentidos distintos: el contexto decide",
            ref: "Juan 3:16; 1 Juan 2:15-16",
            explica: "Juan usa la palabra mundo con dos sentidos: la humanidad que Dios amó y el sistema de valores que se opone a Dios. El contexto decide.",
          },
          {
            consigna: "Completa los dos sentidos de la palabra carne.",
            texto: "Carne puede ser el [[cuerpo]] humano o la naturaleza que se inclina al [[pecado]]; el sentido se aprende por el [[uso]] en la frase.",
            distractores: ["espíritu", "bien", "origen"],
            errores: {
              "espíritu": "Carne puede ser el cuerpo humano, como cuando el Verbo se hizo hombre (Juan 1:14).",
              bien: "En Gálatas 5:16-17, la carne es la naturaleza que se inclina al pecado.",
              origen: "El sentido de una palabra se aprende por su uso en la frase, no por su origen.",
            },
            apoyo: "el sentido de una palabra se aprende por su uso en la frase, no por su origen",
            ref: "Juan 1:14; Gálatas 5:16-17",
            explica: "Carne puede ser el cuerpo humano o la naturaleza que se inclina al pecado: el uso de la palabra en la frase decide.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada figura del lenguaje con su ejemplo de la Biblia.",
            pares: [
              ["Metáfora", "Jesús dijo que él es la puerta"],
              ["Símil", "El justo será como árbol plantado junto a corrientes de aguas"],
              ["Hipérbole", "Sacarse el ojo que hace caer"],
              ["Antropomorfismo", "Dios nos cubre bajo sus alas"],
              ["Pregunta retórica", "Si Dios es por nosotros, ¿quién contra nosotros?"],
            ],
            apoyo: "Los autores bíblicos, como todos, hablan con imágenes",
            explica: "La metáfora, el símil, la hipérbole, el antropomorfismo y la pregunta retórica son imágenes: se leen como figuras, como su autor quiso.",
          },
          {
            consigna: "Une cada figura del lenguaje con lo que hace.",
            pares: [
              ["Metáfora", "Dice que algo es otra cosa para mostrar un parecido"],
              ["Símil", "Compara con la palabra como"],
              ["Hipérbole", "Exagera a propósito para que la idea se grabe"],
              ["Antropomorfismo", "Describe a Dios con rasgos humanos o de la creación"],
              ["Pregunta retórica", "Pregunta para afirmar"],
            ],
            apoyo: "Leerlas como figuras no es quitarles fuerza: es entenderlas como su autor quiso",
            explica: "Reconocer la figura ayuda a entenderla como su autor quiso: leerla como figura no le quita fuerza.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas lecturas de las figuras de la Biblia tiene un error. Tócala.",
            frases: [
              "Jesús es la puerta: por él se entra a la salvación.",
              "Sacarse el ojo que hace caer es un llamado a cortar de raíz con el pecado.",
              "Dios nos cubre bajo sus alas: Dios tiene un cuerpo con alas, como un ave.",
              "Leer una imagen como figura no le quita fuerza.",
            ],
            malo: 2,
            correccion: "Es un antropomorfismo: describe a Dios con rasgos de la creación para que lo entendamos, aunque Dios es Espíritu.",
            apoyo: "Dios nos cubre bajo sus alas (Salmos 91:4), aunque Dios es Espíritu (Juan 4:24)",
            ref: "Salmos 91:4; Juan 4:24",
            explica: "Las alas de Dios son una imagen para que lo entendamos: Dios es Espíritu. Leerla al pie de la letra es leer mal una figura.",
          },
          {
            consigna: "Una de estas frases sobre leer literalmente tiene un error. Tócala.",
            frases: [
              "Leer literalmente es leer el texto en su sentido normal, el que su autor quiso darle.",
              "Con su pregunta de Romanos 8:31, Pablo muestra que duda de la respuesta.",
              "El sentido normal de un texto incluye sus figuras.",
              "Es un error leer al pie de la letra lo que es claramente una imagen.",
            ],
            malo: 1,
            correccion: "Es una pregunta retórica: Pablo pregunta para afirmar, no porque dude.",
            apoyo: "Pregunta retórica: pregunta para afirmar",
            ref: "Romanos 8:31",
            explica: "Interpretar literalmente es leer el texto como su autor quiso, y ese sentido incluye sus figuras: el error está en los extremos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una alumna de tu clase de jóvenes te dice: No entiendo por qué la samaritana se sorprendió tanto de que Jesús le pidiera agua.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Judíos y samaritanos no se trataban entre sí: había siglos de enemistad entre ellos.", bien: true, explica: "El evangelista lo explica, y ese trasfondo deja ver la grandeza de lo que hizo Jesús." },
              { texto: "Se sorprendió porque en Samaria casi no había agua y nadie se atrevía a pedirla.", explica: "El evangelista explica otra cosa: judíos y samaritanos no se tratan entre sí." },
              { texto: "Se sorprendió porque Jesús le habló con palabras muy difíciles de entender para ella.", explica: "La sorpresa vino del trasfondo: había siglos de enemistad entre los dos pueblos." },
              { texto: "No importa por qué: las costumbres de aquel tiempo no cambian en nada lo que leemos.", explica: "Conocer el trasfondo deja ver la grandeza de lo que hizo Jesús: cruzó esas barreras." },
            ],
            apoyo: "Había siglos de enemistad entre los dos pueblos",
            ref: "Juan 4:7-9",
            explica: "Conocer el trasfondo cultural deja ver la grandeza de lo que hizo Jesús: cruzó esas barreras para ofrecerle el agua viva.",
          },
          {
            caso: "Un servidor que prepara un estudio de Juan 4 te dice: ¿Para qué buscar las costumbres de aquel tiempo? Basta con leer lo que pasó.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Conocerlas deja ver más: Jesús cruzó las barreras de su tiempo para ofrecer el agua viva.", bien: true, explica: "Judíos y samaritanos no se trataban, y los discípulos se maravillaron de que hablara con una mujer." },
              { texto: "Tienes razón: las costumbres de aquel tiempo no tienen nada que ver con lo que dice el texto.", explica: "La cultura del texto ilumina su mensaje: el evangelista mismo explica una costumbre." },
              { texto: "Mejor busca las costumbres de hoy y léelas en el pasaje: así se entiende mucho más fácil.", explica: "Se busca la cultura del texto, no la nuestra: costumbres que no son las nuestras." },
              { texto: "Las costumbres solo sirven para leer el Antiguo Testamento; en los evangelios no hacen falta.", explica: "El encuentro con la samaritana, en el evangelio de Juan, se entiende mejor con su trasfondo." },
            ],
            apoyo: "Conocer ese trasfondo deja ver la grandeza de lo que hizo Jesús: cruzó esas barreras para ofrecerle el agua viva",
            ref: "Juan 4:9, 27",
            explica: "Judíos y samaritanos no se trataban, y los discípulos se maravillaron de que Jesús hablara con una mujer: conocer ese trasfondo deja ver su grandeza.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La misma palabra, en el mismo autor, tiene sentidos distintos: el contexto decide",
            ref: "Juan 3:16; 1 Juan 2:15",
            clave: {
              id: "pr-n3-hermeneutica-3-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué el contexto decide el sentido de la palabra mundo en los escritos de Juan?",
              ideas: [
                { id: "humanidad", peso: 35, texto: "En Juan 3:16, el mundo es la humanidad que Dios amó.", formas: ["humanidad", "las personas", "la gente", "seres humanos", "los hombres"] },
                { id: "sistema", peso: 35, texto: "En 1 Juan 2:15, el mundo es el sistema de valores que se opone a Dios.", formas: ["sistema", "valores", "se opone a dios", "contra dios", "deseos de la carne", "vanagloria"] },
                { id: "distintos", peso: 30, texto: "La misma palabra tiene sentidos distintos, y el contexto decide cuál.", formas: ["sentidos distintos", "distintos sentidos", "dos sentidos", "varios sentidos", "sentido distinto", "otro sentido", "contexto decide", "misma palabra"] },
              ],
              modelo: "Porque Juan usa la misma palabra con sentidos distintos. En Juan 3:16 el mundo es la humanidad que Dios amó, y en 1 Juan 2:15 es el sistema de valores que se opone a Dios: el contexto decide.",
            },
          },
          {
            apoyo: "Para saber cómo usa un autor una palabra, se buscan sus otros usos con una concordancia y se consulta un diccionario bíblico",
            clave: {
              id: "pr-n3-hermeneutica-3-a6-2",
              tipo: "corta",
              pregunta: "¿Cómo puedes saber qué quiere decir una palabra en un pasaje, como carne o mundo?",
              ideas: [
                { id: "frase", peso: 50, texto: "Se mira su uso en la frase y en el contexto, no su origen.", formas: ["uso en la frase", "en la frase", "en su contexto", "el contexto", "como se usa", "su uso"] },
                { id: "concordancia", peso: 50, texto: "Se buscan sus otros usos con una concordancia y se consulta un diccionario bíblico.", formas: ["concordancia", "diccionario", "otros usos", "otros pasajes", "se usa igual"] },
              ],
              modelo: "Miro cómo se usa la palabra en la frase y en su contexto, no su origen. También busco sus otros usos con una concordancia y consulto un diccionario bíblico.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Los géneros literarios
    "n3-hermeneutica-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la Biblia, si se la compara con un periódico?", reverso: "Una biblioteca con muchos géneros literarios.", apoyo: "La Biblia es una biblioteca con muchos géneros literarios, y cada uno pide ser leído según su forma" },
              { frente: "¿Quién es el protagonista principal de la narrativa bíblica?", reverso: "Dios: son relatos verdaderos en los que él es el protagonista.", apoyo: "Son relatos verdaderos en los que Dios es el protagonista principal" },
              { frente: "¿Cuál es el rasgo principal de la poesía bíblica?", reverso: "El paralelismo: la segunda línea repite, completa o contrasta la primera.", apoyo: "Su rasgo principal es el paralelismo: la segunda línea repite, completa o contrasta la primera" },
              { frente: "¿Qué son los proverbios?", reverso: "Principios generales, no promesas que se cumplen siempre de forma automática.", apoyo: "Los proverbios son principios generales, no promesas que se cumplen siempre de forma automática" },
              { frente: "¿Qué hay que preguntar antes de interpretar un pasaje?", reverso: "Qué clase de texto es.", apoyo: "Antes de interpretar un pasaje, pregunta qué clase de texto es" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué son los cuatro evangelios?", reverso: "Cuatro retratos de Jesús, cada uno con su propósito.", apoyo: "Los cuatro evangelios son cuatro retratos de Jesús, cada uno con su propósito" },
              { frente: "¿Qué son las epístolas?", reverso: "Cartas reales a iglesias o a personas con situaciones concretas.", apoyo: "Las epístolas son cartas reales a iglesias o a personas con situaciones concretas" },
              { frente: "¿Qué eran los profetas, ante todo?", reverso: "Mensajeros del pacto.", apoyo: "Los profetas eran, ante todo, mensajeros del pacto" },
              { frente: "¿Cuál es el mensaje central de la literatura apocalíptica?", reverso: "Dios reina, y Cristo vencerá.", apoyo: "Su mensaje central es claro: Dios reina, y Cristo vencerá" },
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
            consigna: "Une cada género de la Biblia con su rasgo.",
            pares: [
              ["La narrativa", "Cuenta hechos: relatos verdaderos con Dios como protagonista"],
              ["La poesía", "Usa el paralelismo, imágenes y emociones"],
              ["La sabiduría", "Enseña a vivir en el temor de Dios"],
              ["Las epístolas", "Cartas reales a iglesias o personas con situaciones concretas"],
              ["La literatura apocalíptica", "Visiones llenas de símbolos"],
            ],
            apoyo: "La Biblia tiene muchos géneros literarios (narrativa, ley, poesía, sabiduría, profecía, evangelio y parábola, epístola y apocalíptica), y cada uno se lee según sus rasgos",
            explica: "Cada género tiene sus rasgos: la narrativa cuenta hechos, la poesía usa el paralelismo, la sabiduría enseña a vivir, las epístolas son cartas y la apocalíptica presenta visiones.",
          },
          {
            consigna: "Une cada género con libros de la Biblia escritos en él.",
            pares: [
              ["La narrativa", "Los libros de Génesis a Ester, los evangelios y Hechos"],
              ["La poesía", "Los Salmos, Cantares y Lamentaciones"],
              ["La sabiduría", "Proverbios y Eclesiastés"],
              ["La literatura apocalíptica", "Partes de Daniel y de Zacarías, y Apocalipsis"],
            ],
            apoyo: "Los libros de sabiduría (Proverbios, Eclesiastés y Job) enseñan a vivir en el temor de Dios",
            explica: "La narrativa va de Génesis a Ester, con los evangelios y Hechos; la poesía está en los Salmos, Job, Cantares y Lamentaciones; la sabiduría, en Proverbios, Eclesiastés y Job; las visiones, en Daniel, Zacarías y Apocalipsis.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se lee la narrativa o así se lee la ley? Lleva cada frase a su grupo.",
            grupos: ["Así se lee la narrativa", "Así se lee la ley"],
            frases: [
              { texto: "Preguntar qué quiso mostrar el autor con lo que cuenta", grupo: 0 },
              { texto: "Recordar que lo que describe no siempre lo aprueba", grupo: 0, explica: "El pecado de David se cuenta con detalle, y el mismo relato dice que desagradó a Dios." },
              { texto: "Mirar lo que el mismo libro repite y aprueba", grupo: 0 },
              { texto: "Buscar el principio que revela el carácter de Dios", grupo: 1, explica: "Así lo hizo Pablo con la orden de no ponerle bozal al buey que trilla." },
              { texto: "Ver que en Jesús se cumplen los sacrificios y el culto", grupo: 1 },
              { texto: "Reconocer que muestra la santidad de Dios y su pacto con Israel", grupo: 1 },
            ],
            apoyo: "La narrativa enseña sobre todo por medio de lo que cuenta, y por eso hay que preguntar qué quiso mostrar el autor",
            ref: "2 Samuel 11:27; 1 Corintios 9:9-11",
            explica: "La narrativa enseña por lo que cuenta, aunque no aprueba todo lo que describe; en la ley se busca el principio que revela el carácter de Dios.",
          },
          {
            consigna: "¿Así se lee la poesía o así se lee la sabiduría? Lleva cada frase a su grupo.",
            grupos: ["Así se lee la poesía", "Así se lee la sabiduría"],
            frases: [
              { texto: "Fijarse en el paralelismo entre una línea y la siguiente", grupo: 0 },
              { texto: "Ver que dice lo mismo dos veces para que se grabe", grupo: 0 },
              { texto: "Dejar que use imágenes y exprese emociones", grupo: 0 },
              { texto: "Tomar cada proverbio como un principio general", grupo: 1 },
              { texto: "No esperar que un proverbio se cumpla de forma automática", grupo: 1 },
              { texto: "Discernir cuándo conviene callar y cuándo responder", grupo: 1, explica: "Por eso dos proverbios seguidos dicen no responder al necio y responderle: los dos son sabios." },
            ],
            apoyo: "La poesía usa imágenes y expresa emociones, y no se lee como un tratado",
            ref: "Salmos 19:1-2; Proverbios 26:4-5",
            explica: "La poesía se lee con su paralelismo, sus imágenes y sus emociones; los proverbios son principios generales, y el sabio discierne cuándo conviene cada uno.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Reclamé un proverbio como promesa y no se cumplió; creo que la Biblia me falló.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Los proverbios son principios generales, no promesas que se cumplen siempre solas.", bien: true, explica: "Así enseña la lección: el proverbio es un principio general; leerlo como promesa es ignorar su género." },
              { texto: "Tienes razón: si un proverbio no se cumple, es porque esa parte de la Biblia ya no vale.", explica: "La Biblia no falló: el error nace de leer un proverbio como una promesa." },
              { texto: "Reclámalo otra vez con más fe: todo proverbio se cumple si uno no duda.", explica: "Los proverbios no son promesas que se cumplen siempre de forma automática." },
              { texto: "Mejor no leas Proverbios: los libros de sabiduría son difíciles y no enseñan para hoy.", explica: "Los libros de sabiduría enseñan a vivir en el temor de Dios." },
            ],
            apoyo: "Los proverbios son principios generales, no promesas que se cumplen siempre de forma automática",
            ref: "Proverbios 26:4-5",
            explica: "Muchos errores nacen de leer un proverbio como una promesa: los proverbios son principios generales para vivir en el temor de Dios.",
          },
          {
            caso: "Una servidora del equipo de jóvenes te dice: En Hechos echaron suertes para reemplazar a Judas; así deberíamos elegir a nuestros líderes.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Hechos lo cuenta, pero después la iglesia escogió a sus servidores de otra manera.", bien: true, explica: "Lo que la narrativa describe no siempre es un ejemplo: se mira lo que enseña el resto de la Escritura (Hechos 6:3; 14:23)." },
              { texto: "Tienes razón: todo lo que la Biblia cuenta es un ejemplo que hay que seguir tal cual.", explica: "Lo que describe no siempre lo aprueba: hay que ver si se cuenta como ejemplo o solo como lo que pasó." },
              { texto: "Ese relato no cuenta algo que pasó de verdad, y la narrativa no enseña a la iglesia.", explica: "Son relatos verdaderos, y la narrativa enseña por medio de lo que cuenta." },
              { texto: "Echemos suertes para los cargos pequeños, y votemos para los grandes.", explica: "La pregunta no es el tamaño del cargo: después la iglesia escogió a sus servidores y a sus ancianos de otra manera." },
            ],
            apoyo: "Para saber si un hecho se cuenta como ejemplo que seguir o solo como lo que pasó, se mira lo que el mismo libro repite y aprueba, y lo que enseña el resto de la Escritura",
            ref: "Hechos 1:26; 6:3; 14:23",
            explica: "El reemplazo de Judas se hizo echando suertes, pero después la iglesia escogió a sus servidores y a sus ancianos de otra manera.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo leer las visiones tiene un error. Tócala.",
            frases: [
              "Partes de Daniel y de Zacarías presentan visiones llenas de símbolos.",
              "A veces el mismo texto explica sus símbolos.",
              "Los símbolos de las visiones se interpretan con la imaginación de cada lector.",
              "El mensaje central de esas visiones es que Dios reina y Cristo vencerá.",
            ],
            malo: 2,
            correccion: "Los símbolos no se interpretan con la imaginación: a veces el mismo texto los explica, y otras veces el resto de la Escritura.",
            apoyo: "Los símbolos no se interpretan con la imaginación",
            ref: "Apocalipsis 1:20",
            explica: "Jesús mismo explica que las siete estrellas son los ángeles de las siete iglesias; otras veces los símbolos se entienden con el Antiguo Testamento.",
          },
          {
            consigna: "Una de estas frases sobre cómo leer la profecía y las epístolas tiene un error. Tócala.",
            frases: [
              "Los profetas llamaban al pueblo a volver a Dios.",
              "Para leer a un profeta se pregunta a quién hablaba y en qué momento de la historia.",
              "Una epístola se lee completa, como una carta.",
              "Una epístola se entiende mejor sin preguntar a qué problema respondía.",
            ],
            malo: 3,
            correccion: "La enseñanza de una epístola se aplica mejor cuando se entiende a qué problema respondía.",
            apoyo: "Su enseñanza vale para la iglesia de todos los tiempos, y se aplica mejor cuando se entiende a qué problema respondía",
            explica: "Las epístolas son cartas reales con situaciones concretas: se leen completas y se procura reconstruir la situación a partir del mismo texto.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué eran los profetas y qué hacían.",
            texto: "Los profetas eran mensajeros del [[pacto]]: llamaban al pueblo a [[volver]] a Dios y denunciaban el [[pecado]] y la injusticia.",
            distractores: ["palacio", "olvidar", "perdón"],
            errores: {
              palacio: "Los profetas eran, ante todo, mensajeros del pacto.",
              olvidar: "Los profetas llamaban al pueblo a volver a Dios.",
              "perdón": "Los profetas denunciaban el pecado y la injusticia, y anunciaban juicio y esperanza.",
            },
            apoyo: "Los profetas eran, ante todo, mensajeros del pacto: llamaban al pueblo a volver a Dios, denunciaban el pecado y la injusticia, y anunciaban juicio y esperanza",
            explica: "Para leer a los profetas se pregunta a quién hablaba el profeta, en qué momento de la historia y qué cumplimiento muestra el Nuevo Testamento.",
          },
          {
            consigna: "Completa cómo se leen las parábolas.",
            texto: "Las parábolas son relatos [[breves]] sobre el reino; por lo general cada una tiene una idea [[central]] y responde a una [[situación]].",
            distractores: ["largos", "escondida", "leyenda"],
            errores: {
              largos: "Las parábolas son relatos breves con los que Jesús enseñó sobre el reino.",
              escondida: "Cada parábola tiene por lo general una idea central, o unas pocas, y no un mensaje escondido en cada detalle.",
              leyenda: "Las parábolas responden a una situación, como cuando los fariseos y los escribas murmuraban.",
            },
            apoyo: "Las parábolas son relatos breves con los que Jesús enseñó sobre el reino",
            ref: "Lucas 15:1-2",
            explica: "La oveja, la moneda y el hijo perdidos fueron la respuesta de Jesús cuando los fariseos y los escribas murmuraban porque recibía a los pecadores.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Antes de interpretar un pasaje, pregunta qué clase de texto es",
            clave: {
              id: "pr-n3-hermeneutica-4-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué hay que preguntar por el género antes de interpretar un pasaje?",
              ideas: [
                { id: "rasgos", peso: 50, texto: "Cada género se lee según sus rasgos: no se lee igual una poesía que un informe.", formas: ["sus rasgos", "segun su (genero|forma|tipo)", "cada (genero|uno|texto) se lee", "se lee (distinto|diferente)", "de (distinta|diferente|otra) manera", "clase de texto", "no se (lee|leen) igual", "no se (lee|leen) como"] },
                { id: "errores", peso: 50, texto: "Así se evitan muchos errores, como leer un proverbio como una promesa.", formas: ["evita* (muchos|los)", "evitar errores", "error*", "proverbio como promesa", "como promesa", "como (un|una) (informe|alegoria|mapa)"] },
              ],
              modelo: "Porque cada género se lee según sus rasgos: una poesía no se lee como un informe ni un proverbio como una promesa. Preguntar qué clase de texto es evita muchos errores.",
            },
          },
          {
            apoyo: "Muchos errores nacen de leer una poesía como un informe, un proverbio como una promesa, una parábola como una alegoría o una visión como un mapa",
            clave: {
              id: "pr-n3-hermeneutica-4-a7-2",
              tipo: "corta",
              pregunta: "¿Qué error nace de leer mal el género de un proverbio, y cuál el de una parábola?",
              ideas: [
                { id: "proverbio", peso: 50, texto: "Un proverbio se lee mal cuando se toma como una promesa que se cumple siempre de forma automática.", formas: ["como promesa", "proverbio* promesa", "promesa que se cumple", "forma automatica", "cumpl* siempre"] },
                { id: "parabola", peso: 50, texto: "Una parábola se lee mal cuando se toma como una alegoría, con un mensaje escondido en cada detalle.", formas: ["como alegoria", "alegori*", "cada detalle", "mensaje escondido", "sentido escondido"] },
              ],
              modelo: "Un proverbio se lee mal cuando se toma como una promesa que se cumple siempre de forma automática. Una parábola se lee mal cuando se toma como una alegoría, con un mensaje escondido en cada detalle.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Reglas sanas y errores comunes
    "n3-hermeneutica-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es la primera regla sana de interpretación?", reverso: "La Escritura interpreta a la Escritura.", apoyo: "La primera regla es que la Escritura interpreta a la Escritura" },
              { frente: "¿Sobre qué pasajes se edifican las doctrinas?", reverso: "Sobre los pasajes claros y repetidos de la Escritura.", apoyo: "Las doctrinas se edifican sobre los pasajes claros y repetidos de la Escritura" },
              { frente: "¿Quién es el centro de la Escritura?", reverso: "Cristo: toda la Biblia cuenta una sola historia de salvación.", apoyo: "La tercera es que Cristo es el centro de la Escritura" },
              { frente: "¿Qué quiere decir que la revelación es progresiva?", reverso: "Que lo que en el Antiguo Testamento era sombra se ve con claridad en el Nuevo.", apoyo: "Lo que en el Antiguo Testamento era sombra se ve con claridad en el Nuevo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo respondió Jesús al diablo, que le citó un salmo?", reverso: "Con otra parte de la Escritura, no con ideas propias.", apoyo: "Jesús no discutió con ideas propias: respondió con otra parte de la Escritura" },
              { frente: "¿Por qué ningún texto se interpreta en contra del resto de la Biblia?", reverso: "Porque toda ella procede del mismo Dios.", apoyo: "Ningún texto se interpreta en contra del resto de la Biblia, porque toda ella procede del mismo Dios" },
              { frente: "¿Dónde llega a su punto más alto la historia de la salvación?", reverso: "En la muerte y la resurrección de Jesús.", apoyo: "Toda la Biblia cuenta una sola historia de salvación, que llega a su punto más alto en la muerte y la resurrección de Jesús" },
              { frente: "¿Cómo se lee el Antiguo Testamento, y cómo el Nuevo?", reverso: "El Antiguo, a la luz de Cristo; el Nuevo se entiende mejor con el Antiguo.", apoyo: "Por eso el Antiguo se lee a la luz de Cristo, y el Nuevo se entiende mejor con el Antiguo" },
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
            consigna: "Sobre las reglas sanas de interpretación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Ningún texto se interpreta en contra del resto de la Biblia.", verdad: true, explica: "Toda la Biblia procede del mismo Dios: la Escritura interpreta a la Escritura.", apoyo: "Ningún texto se interpreta en contra del resto de la Biblia", ref: "Mateo 4:5-7" },
              { texto: "Una doctrina puede edificarse sobre un versículo difícil que admite varias explicaciones.", verdad: false, explica: "Lo claro ilumina lo oscuro: sería imprudente fundar una doctrina en un versículo como el de los que se bautizan por los muertos.", apoyo: "Las doctrinas se edifican sobre los pasajes claros y repetidos de la Escritura, no sobre un versículo difícil que admite varias explicaciones", ref: "1 Corintios 15:29" },
              { texto: "Toda la Biblia cuenta una sola historia de salvación.", verdad: true, explica: "Cristo es el centro: esa historia llega a su punto más alto en su muerte y su resurrección.", apoyo: "Toda la Biblia cuenta una sola historia de salvación", ref: "Lucas 24:44" },
            ],
          },
          {
            consigna: "Sobre las reglas sanas de interpretación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Antiguo Testamento se lee a la luz de Cristo.", verdad: true, explica: "Lo que en el Antiguo era sombra se ve con claridad en el Nuevo.", apoyo: "Por eso el Antiguo se lee a la luz de Cristo", ref: "Hebreos 1:1-2" },
              { texto: "El Nuevo Testamento se entiende igual de bien sin el Antiguo.", verdad: false, explica: "La revelación es progresiva: el Nuevo se entiende mejor con el Antiguo.", apoyo: "el Nuevo se entiende mejor con el Antiguo", ref: "Hebreos 1:1-2" },
              { texto: "Cristo es el centro de los evangelios, pero no del Antiguo Testamento.", verdad: false, explica: "Cristo es el centro de toda la Escritura: de él estaba escrito en la ley de Moisés, en los profetas y en los salmos.", apoyo: "Jesús enseñó que era necesario que se cumpliese todo lo que estaba escrito de él «en la ley de Moisés, en los profetas y en los salmos»", ref: "Lucas 24:44" },
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
            consigna: "¿Es una regla sana o un error común al interpretar? Lleva cada frase a su grupo.",
            grupos: ["Regla sana", "Error común"],
            frases: [
              { texto: "Interpretar la Escritura con la Escritura", grupo: 0 },
              { texto: "Edificar las doctrinas sobre pasajes claros y repetidos", grupo: 0 },
              { texto: "Leer el Antiguo Testamento a la luz de Cristo", grupo: 0 },
              { texto: "Sacar un versículo de su contexto", grupo: 1 },
              { texto: "Buscar en cada detalle un sentido escondido", grupo: 1, explica: "Eso es alegorizar: buscar un sentido que el autor no quiso dar." },
              { texto: "Fundar una doctrina en un solo versículo oscuro", grupo: 1 },
              { texto: "Tomar como mensaje de Dios lo primero que sale al abrir la Biblia", grupo: 1, explica: "Es la ruleta bíblica." },
              { texto: "Leer con los lentes de lo que queremos oír", grupo: 1 },
            ],
            apoyo: "Con esas reglas, y examinando con humildad como los de Berea, se evitan errores como sacar de contexto, alegorizar o edificar doctrinas sobre un texto oscuro",
            explica: "La Escritura interpreta a la Escritura, lo claro ilumina lo oscuro y Cristo es el centro; sacar de contexto, alegorizar y la ruleta bíblica son errores comunes.",
          },
          {
            consigna: "¿Qué error común es cada caso? Lleva cada frase a su grupo.",
            grupos: ["Sacar de contexto", "Alegorizar", "Leer con nuestras ideas"],
            frases: [
              { texto: "Usar un versículo suelto para lo que uno quiere", grupo: 0 },
              { texto: "Citar una frase de la Biblia sin leer el capítulo", grupo: 0 },
              { texto: "Ver en el mesonero del buen samaritano al apóstol Pablo", grupo: 1, explica: "Así explicó Agustín la parábola, pero no es lo que Jesús enseñó ahí." },
              { texto: "Buscar un sentido escondido en cada detalle de una parábola", grupo: 1 },
              { texto: "Leer el texto con los lentes de nuestra cultura", grupo: 2 },
              { texto: "Quedarse solo con lo que queremos oír", grupo: 2 },
              { texto: "Interpretar según nuestras preferencias", grupo: 2 },
            ],
            apoyo: "Alegorizar: buscar en cada detalle un sentido escondido que el autor no quiso dar",
            explica: "Sacar de contexto usa un versículo para lo que uno quiere; alegorizar busca sentidos que el autor no quiso dar; leer con nuestras ideas pone en el texto lo que queremos oír.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de tu célula te dice: Cuando necesito una respuesta, abro la Biblia al azar y lo primero que leo es el mensaje de Dios.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Eso es la ruleta bíblica: lee cada pasaje en su contexto y con el resto de la Escritura.", bien: true, explica: "Abrir la Biblia al azar y tomar lo primero que aparece como un mensaje de Dios es un error común." },
              { texto: "Hazlo siempre así: Dios dirige la página que se abre, y no hace falta que leas nada más.", explica: "La ruleta bíblica toma lo primero que aparece como un mensaje de Dios, sin su contexto." },
              { texto: "Está bien, pero ábrela tres veces seguidas para estar segura de cuál es el mensaje.", explica: "Repetir la ruleta no la corrige: se pregunta qué dice el contexto y qué enseña el resto de la Escritura." },
              { texto: "No busques respuestas en la Biblia: la Palabra no tiene nada que decir de tu vida diaria.", explica: "El error no es buscar a Dios en su Palabra, sino tomar un texto al azar, fuera de su contexto." },
            ],
            apoyo: "La ruleta bíblica: abrir la Biblia al azar y tomar lo primero que aparece como un mensaje de Dios",
            explica: "La ruleta bíblica es un error común: cada versículo se lee en su contexto y a la luz del resto de la Escritura.",
          },
          {
            caso: "Un maestro nuevo te dice: Voy a enseñar que en el buen samaritano el mesonero es Pablo y el mesón es la iglesia.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Enseña lo que Jesús respondió ahí: quién es el prójimo, y «Ve, y haz tú lo mismo».", bien: true, explica: "Jesús respondía a un intérprete de la ley que le preguntó quién es su prójimo, y terminó con una orden clara." },
              { texto: "Muy bien: así lo explicó Agustín, y todo eso es justo lo que Jesús quiso enseñar en la parábola.", explica: "Muchas de esas verdades se enseñan en otros pasajes, pero no son lo que Jesús enseñó aquí." },
              { texto: "Bien, y busca también qué significa cada detalle: en una parábola todo esconde un mensaje.", explica: "Alegorizar es buscar en cada detalle un sentido escondido que el autor no quiso dar." },
              { texto: "Mejor no enseñes esa parábola: es demasiado difícil para una clase.", explica: "No es demasiado difícil: Jesús terminó con una orden clara." },
            ],
            apoyo: "Muchas de esas verdades se enseñan en otros pasajes, pero no son lo que Jesús enseñó aquí",
            ref: "Lucas 10:25-37",
            explica: "Agustín explicó la parábola como una alegoría, pero Jesús respondía a quién es el prójimo y terminó con una orden clara.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Toda predicación, todo libro y toda profecía se examinan con la Palabra",
            ref: "Hechos 17:11",
            situacion: "Eres líder de una célula. Un predicador de visita enseñó que hay que bautizarse por los familiares muertos, y citó 1 Corintios 15:29. Dos hermanos de tu grupo quieren hacerlo.",
            escenas: [
              {
                id: "e1",
                narra: "Te preguntan si deben hacerlo, porque las palabras están en la Biblia.",
                pregunta: "¿Qué les dices primero?",
                opciones: [
                  { texto: "Que lo examinemos juntos con las Escrituras, como hacían los de Berea.", valor: 2, explica: "Los de Berea recibían la palabra con toda solicitud y escudriñaban cada día las Escrituras." },
                  { texto: "Que le pregunten al predicador de dónde sacó esa enseñanza.", valor: 1, explica: "Preguntar está bien, pero la enseñanza se examina con la Palabra, como hacían los de Berea." },
                  { texto: "Que sí: si las palabras están en la Biblia, la enseñanza tiene que ser verdad.", valor: 0, explica: "No basta con que las palabras estén en la Biblia: también el diablo las citó.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Leen juntos el capítulo 15. Ven que Pablo menciona a los que se bautizan por los muertos, pero no explica a qué práctica se refería.",
                pregunta: "¿A qué conclusión llegan?",
                opciones: [
                  { texto: "Que una doctrina no se funda en un versículo oscuro como ese.", valor: 2, explica: "Lo claro ilumina lo oscuro: no hay acuerdo sobre a qué práctica se refería, y sería imprudente fundar una doctrina en ese versículo." },
                  { texto: "Que, como no está claro, cada uno puede darle el sentido que quiera.", valor: 0, explica: "Nadie tiene derecho a darle el sentido que quiera: buscamos lo que Dios quiso decir." },
                  { texto: "Que mejor no se hable más del tema, para evitar discusiones.", valor: 1, explica: "Se evita la doctrina dudosa, pero el grupo no aprende la regla: lo claro ilumina lo oscuro." },
                ],
              },
              {
                id: "e3",
                narra: "Los dos hermanos aceptan esperar, pero quieren entender más.",
                pregunta: "¿Qué haces después?",
                opciones: [
                  { texto: "Lo examinas con tu pastor y con lo que los creyentes fieles han enseñado.", valor: 2, explica: "Lo que Dios quiso decir se examina con la iglesia, con los maestros que Dios le ha dado y con lo que los creyentes fieles han enseñado a lo largo de los siglos." },
                  { texto: "Les prestas un libro sobre el tema para que cada uno lo lea a solas en su casa.", valor: 1, explica: "Un libro puede ayudar, pero también se examina con la Palabra y con la iglesia." },
                  { texto: "Les dices que cada uno decida según lo que sienta en su corazón.", valor: 0, explica: "Nadie tiene derecho a darle a la Escritura el sentido que quiera." },
                ],
              },
            ],
          },
          {
            apoyo: "Cuando alguien te muestre un versículo para sostener algo extraño, no basta con que las palabras estén en la Biblia: también el diablo las citó",
            ref: "Mateo 4:5-7",
            situacion: "Eres líder de jóvenes. Kevin quiere lanzarse en patineta por una bajada muy peligrosa, y dice que el Salmo 91 promete que los ángeles lo guardarán.",
            escenas: [
              {
                id: "e1",
                narra: "Kevin te muestra el salmo en su teléfono y te pide que lo apoyes.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Le recuerdas que el diablo citó ese salmo, y lo que Jesús le respondió.", valor: 2, explica: "Jesús respondió con otra parte de la Escritura: «Escrito está también: No tentarás al Señor tu Dios»." },
                  { texto: "Le dices que no lo haga porque es peligroso, sin hablar del salmo.", valor: 1, explica: "El consejo es prudente, pero no examina con la Palabra el uso que hace del versículo." },
                  { texto: "Lo apoyas: si el versículo está en la Biblia, Dios lo tiene que guardar.", valor: 0, explica: "No basta con que las palabras estén en la Biblia: también el diablo las citó." },
                ],
              },
              {
                id: "e2",
                narra: "Kevin responde: Pero es la Biblia, ¿no?",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que ningún texto se interpreta en contra del resto de la Biblia.", valor: 2, explica: "Toda la Biblia procede del mismo Dios: la Escritura interpreta a la Escritura." },
                  { texto: "Que cada uno entiende la Biblia a su manera, y que haga lo que sienta.", valor: 0, explica: "Nadie tiene derecho a darle el sentido que quiera: buscamos lo que Dios quiso decir." },
                  { texto: "Que ore primero, y que después decida si se lanza o no.", valor: 1, explica: "Orar es bueno, pero hace falta ver qué enseña el resto de la Escritura sobre el tema." },
                ],
              },
              {
                id: "e3",
                narra: "Kevin decide no lanzarse y te pregunta cómo no caer otra vez en algo así.",
                pregunta: "¿Qué le enseñas?",
                opciones: [
                  { texto: "A examinar con las Escrituras lo que oye y lee, como los de Berea.", valor: 2, explica: "Los de Berea iban escudriñando cada día las Escrituras para ver si estas cosas eran así." },
                  { texto: "A preguntarte siempre a ti antes de creer algo que oiga.", valor: 1, explica: "Pedir consejo ayuda, pero cada creyente también examina con la Palabra, como los de Berea." },
                  { texto: "A no leer más los salmos, para que nadie lo vuelva a confundir con ellos.", valor: 0, explica: "El problema no fue el salmo, sino usarlo en contra del resto de la Escritura." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué hacían cada día los creyentes de Berea? Toca las palabras que lo dicen.",
            texto: "[[escudriñando]] cada día las [[Escrituras]] para ver si estas cosas eran así",
            apoyo: "Los creyentes de Berea son el modelo",
            ref: "Hechos 17:11",
            explica: "Los de Berea recibían la palabra con toda solicitud y escudriñaban cada día las Escrituras: ni siquiera la enseñanza de Pablo quedaba fuera de ese examen.",
          },
          {
            consigna: "¿Para qué escudriñaban las Escrituras los de Berea? Toca las palabras que lo dicen.",
            texto: "escudriñando cada día las Escrituras [[para ver si estas cosas eran así]]",
            apoyo: "Ni siquiera la enseñanza de Pablo quedaba fuera de ese examen",
            ref: "Hechos 17:11",
            explica: "Examinaban con la Palabra lo que oían, para ver si era así: toda predicación, todo libro y toda profecía se examinan con la Palabra.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La segunda es que lo claro ilumina lo oscuro",
            ref: "1 Corintios 15:29",
            clave: {
              id: "pr-n3-hermeneutica-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué quiere decir que lo claro ilumina lo oscuro? Da el ejemplo de la lección.",
              ideas: [
                { id: "claro", peso: 50, texto: "Las doctrinas se edifican sobre los pasajes claros y repetidos de la Escritura, no sobre un versículo difícil.", formas: ["pasajes claros", "claros y repetidos", "textos claros", "versiculos claros", "lo que (es|esta) claro"] },
                { id: "ejemplo", peso: 50, texto: "Por ejemplo, sería imprudente fundar una doctrina en el versículo de los que se bautizan por los muertos.", formas: ["bautiz* por los muertos", "por los muertos", "corintios 15", "15 29"] },
              ],
              modelo: "Quiere decir que las doctrinas se edifican sobre los pasajes claros y repetidos de la Escritura. Por ejemplo, sería imprudente fundar una doctrina en el versículo de los que se bautizan por los muertos.",
            },
          },
          {
            apoyo: "La primera regla es que la Escritura interpreta a la Escritura",
            ref: "Mateo 4:5-7",
            clave: {
              id: "pr-n3-hermeneutica-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir que la Escritura interpreta a la Escritura? Usa el ejemplo de la tentación de Jesús.",
              ideas: [
                { id: "resto", peso: 50, texto: "Ningún texto se interpreta en contra del resto de la Biblia, porque toda procede del mismo Dios.", formas: ["resto de la (biblia|escritura)", "mismo dios", "otra* parte* de la (escritura|biblia)", "otros (pasajes|textos|versiculos)", "en contra del resto"] },
                { id: "jesus", peso: 50, texto: "Cuando el diablo citó el Salmo 91, Jesús respondió con otra Escritura: Escrito está también.", formas: ["escrito esta", "no tentaras", "tentaras al senor", "respondi* con otra", "salmo 91", "con la escritura"] },
              ],
              modelo: "Quiere decir que ningún texto se interpreta en contra del resto de la Biblia, porque toda procede del mismo Dios. Cuando el diablo citó el Salmo 91, Jesús respondió con otra Escritura: Escrito está también.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Del texto a la vida
    "n3-hermeneutica-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué busca la exégesis, según Fee y Stuart?", reverso: "Lo que el texto significó para sus primeros lectores.", apoyo: "la exégesis, que busca lo que el texto significó para sus primeros lectores" },
              { frente: "¿Qué busca la hermenéutica en sentido estricto?", reverso: "Lo que el texto significa para nosotros hoy.", apoyo: "la hermenéutica en sentido estricto, que busca lo que significa para nosotros hoy" },
              { frente: "¿Qué puente ven muchos maestros entre esas dos tareas?", reverso: "El principio que el texto enseña.", apoyo: "Entre las dos, muchos maestros ven un puente: el principio que el texto enseña" },
              { frente: "¿De dónde debe salir el principio que vale para todos los tiempos?", reverso: "Del texto, y debe estar de acuerdo con el resto de la Escritura.", apoyo: "Debe salir del texto y estar de acuerdo con el resto de la Escritura" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la meta de toda interpretación?", reverso: "La obediencia.", apoyo: "La meta de toda interpretación es la obediencia" },
              { frente: "¿Para qué había preparado Esdras su corazón?", reverso: "Para inquirir la ley de Jehová, cumplirla y enseñarla en Israel.", apoyo: "De Esdras se dice que «había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos»" },
              { frente: "¿A quién se parece el que solo oye la Palabra?", reverso: "Al hombre que se mira en un espejo y luego olvida cómo era.", apoyo: "Quien solo oye se parece al hombre que se mira en un espejo y luego olvida cómo era" },
              { frente: "¿Dónde se aplica un pasaje hoy?", reverso: "En mi vida, en mi familia, en mi iglesia y en mi ministerio.", apoyo: "En mi vida, en mi familia, en mi iglesia y en mi ministerio, de manera concreta" },
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
            consigna: "Ordena las tres preguntas para pasar del texto a la vida, de la primera a la última.",
            pasos: [
              "¿Qué significó para sus primeros lectores?",
              "¿Qué principio enseña que vale para todos los tiempos?",
              "¿Cómo se aplica hoy, de manera concreta?",
            ],
            apoyo: "Del texto a la vida se pasa con tres preguntas: qué significó para sus primeros lectores, qué principio permanente enseña y cómo se aplica hoy",
            explica: "Primero se busca lo que el texto significó para sus primeros lectores; después, el principio que vale para todos los tiempos; y al final, cómo se aplica hoy.",
          },
          {
            consigna: "Ordena el camino de 1 Corintios 8, del sentido original a la aplicación de hoy.",
            pasos: [
              "En Corinto, algunos débiles se sentían manchados por la carne ofrecida a los ídolos",
              "El amor renuncia a algo permitido para no hacer caer a un hermano",
              "Hoy evito, delante de un hermano, una costumbre ligada a su vida pasada",
            ],
            apoyo: "Hoy casi nadie compra carne sacrificada a los ídolos, pero el principio sigue vigente",
            ref: "1 Corintios 8:9-13",
            explica: "El sentido original fue la carne ofrecida a los ídolos; el principio, que el amor renuncia a algo permitido por un hermano; la aplicación, evitar lo que a otro lo hace caer.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es la forma, según la costumbre, o es el principio? Lleva cada frase a su grupo.",
            grupos: ["La forma, según la costumbre", "El principio que no cambia"],
            frases: [
              { texto: "Saludarse con un ósculo santo", grupo: 0 },
              { texto: "Saludarse con un abrazo o un apretón de manos", grupo: 0 },
              { texto: "Dejar de comer carne ofrecida a los ídolos delante del débil", grupo: 0, explica: "Era la forma que tomaba el amor en Corinto: hoy casi nadie compra esa carne." },
              { texto: "El afecto fraternal y puro entre los creyentes", grupo: 1 },
              { texto: "Renunciar por amor a algo permitido para no hacer caer a otro", grupo: 1 },
            ],
            apoyo: "El principio es el afecto fraternal y puro entre los creyentes; la forma puede ser un beso, un abrazo o un apretón de manos, según la costumbre de cada lugar",
            ref: "Romanos 16:16; 1 Corintios 8:9",
            explica: "La forma cambia según la costumbre de cada lugar; el principio sigue vigente: el afecto fraternal y puro, y el amor que renuncia a algo permitido por un hermano.",
          },
          {
            consigna: "¿Distingue bien la forma y el principio, o cae en un extremo? Lleva cada frase a su grupo.",
            grupos: ["Distingue bien", "Cae en un extremo"],
            frases: [
              { texto: "Pregunta si el mandato se funda en la creación o en una costumbre", grupo: 0 },
              { texto: "Vive el principio con la forma propia de su lugar", grupo: 0 },
              { texto: "Pide el consejo de la iglesia ante un mandato difícil", grupo: 0 },
              { texto: "Obliga a todos a saludarse con un beso, como en Corinto", grupo: 1, explica: "Es aplicarlo todo al pie de la letra sin ver la distancia cultural." },
              { texto: "Llama cultural a un mandato solo porque le incomoda", grupo: 1, explica: "Así se desobedece lo que Dios sí manda." },
              { texto: "Aplica todo al pie de la letra sin ver la distancia cultural", grupo: 1 },
            ],
            apoyo: "La humildad, el estudio y el consejo de la iglesia guardan de los dos",
            explica: "Un extremo aplica todo al pie de la letra y obliga a lo que Dios no obliga; el otro llama cultural a lo que incomoda y desobedece lo que Dios sí manda.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Para qué tres cosas preparó Esdras su corazón? Toca las palabras que lo dicen.",
            texto: "había preparado su corazón para [[inquirir]] la ley de Jehová y para [[cumplirla]], y para [[enseñar]] en Israel sus estatutos y decretos",
            apoyo: "El orden es el camino del obrero: estudiar la Palabra, obedecerla él primero y después enseñarla a otros",
            ref: "Esdras 7:10",
            explica: "Esdras preparó su corazón para inquirir la ley, cumplirla y enseñarla: estudiar la Palabra, obedecerla él primero y después enseñarla.",
          },
          {
            consigna: "¿Qué pide Santiago que seamos? Toca las palabras que lo dicen.",
            texto: "sed [[hacedores de la palabra]], y no tan solamente oidores, engañándoos a vosotros mismos",
            apoyo: "La meta de toda interpretación es la obediencia",
            ref: "Santiago 1:22",
            explica: "Quien solo oye se engaña a sí mismo; quien persevera en la Palabra y la practica será bienaventurado en lo que hace.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El orden es el camino del obrero: estudiar la Palabra, obedecerla él primero y después enseñarla a otros",
            ref: "Esdras 7:10",
            situacion: "Eres maestro de una clase de adultos y el domingo te toca enseñar 1 Corintios 8. Es jueves y todavía no has abierto el pasaje.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes poco tiempo esta semana.",
                pregunta: "¿Cómo empiezas a preparar la clase?",
                opciones: [
                  { texto: "Lees el capítulo completo y te preguntas qué significó para los corintios.", valor: 2, explica: "Primero se busca lo que el texto significó para sus primeros lectores: es el trabajo del contexto, las palabras y el género." },
                  { texto: "Buscas un bosquejo ya hecho y lo lees con cuidado una vez.", valor: 1, explica: "Una ayuda puede servir, pero el camino del obrero empieza por estudiar él mismo la Palabra." },
                  { texto: "Decides primero lo que quieres decir y después buscas versículos que lo apoyen.", valor: 0, explica: "El principio debe salir del texto y estar de acuerdo con el resto de la Escritura." },
                ],
              },
              {
                id: "e2",
                narra: "Ya entiendes que en Corinto la carne del mercado se había ofrecido a los ídolos y que algunos débiles se sentían manchados al comerla.",
                pregunta: "¿Qué principio vas a enseñar?",
                opciones: [
                  { texto: "Que el amor renuncia a algo permitido para no hacer caer a un hermano.", valor: 2, explica: "Ese principio sale del texto y sigue vigente, aunque hoy casi nadie compre carne sacrificada a los ídolos." },
                  { texto: "Que comer carne es pecado para el creyente de hoy, en cualquier lugar.", valor: 0, explica: "Pablo enseña que un ídolo nada es: el problema era hacer caer al hermano débil." },
                  { texto: "Que hay que tener mucho cuidado con la carne que se compra en el mercado.", valor: 1, explica: "Se queda en la forma de aquel tiempo: el principio es el amor que no hace caer al hermano." },
                ],
              },
              {
                id: "e3",
                narra: "Mientras preparas, recuerdas que delante de un hermano nuevo sueles hacer algo que a él le recuerda su vida pasada.",
                pregunta: "¿Qué haces antes del domingo?",
                opciones: [
                  { texto: "Dejas de hacerlo delante de él: obedeces tú primero lo que vas a enseñar.", valor: 2, explica: "Es el orden de Esdras: estudiar la Palabra, obedecerla él primero y después enseñarla." },
                  { texto: "Lo sigues haciendo: lo importante es que la clase quede bien explicada.", valor: 0, explica: "La meta de toda interpretación es la obediencia: quien solo oye se engaña a sí mismo." },
                  { texto: "Lo dejas para después de la clase: primero enseñas y luego ya verás qué haces.", valor: 1, explica: "Esdras preparó su corazón para cumplir la ley y después enseñarla." },
                ],
              },
            ],
          },
          {
            apoyo: "Quien solo oye se parece al hombre que se mira en un espejo y luego olvida cómo era",
            ref: "Santiago 1:22-25",
            situacion: "Eres líder de célula. Esta semana estudiaron Santiago 1:22-25, y al final todos dicen que la reunión estuvo muy buena.",
            escenas: [
              {
                id: "e1",
                narra: "Ya se están despidiendo, y nadie habla de qué hará con lo que aprendió.",
                pregunta: "¿Qué haces antes de cerrar?",
                opciones: [
                  { texto: "Pides a cada uno un paso concreto para practicar lo aprendido.", valor: 2, explica: "La aplicación se hace de manera concreta: en la vida, en la familia, en la iglesia y en el ministerio." },
                  { texto: "Les recuerdas que fue una buena reunión y que lean el pasaje en casa.", valor: 1, explica: "Volver a leer ayuda, pero la meta de toda interpretación es la obediencia." },
                  { texto: "Cierras con una oración: ya entendieron el pasaje, y con eso basta.", valor: 0, explica: "Entender un pasaje no es el final del camino: Dios dio su Palabra para que la vivamos." },
                ],
              },
              {
                id: "e2",
                narra: "Una hermana te cuenta que entendió el pasaje, pero que todavía no lo practica.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que elija un principio que no practica y un paso concreto para esta semana.", valor: 2, explica: "Quien persevera en la Palabra y la practica será bienaventurado en lo que hace." },
                  { texto: "Que no se preocupe: entender el pasaje ya es suficiente.", valor: 0, explica: "Quien solo oye se parece al hombre que se mira en un espejo y luego olvida cómo era." },
                  { texto: "Que ore para que algún día Dios le dé las ganas de practicar lo que entendió.", valor: 1, explica: "Orar es bueno, pero Santiago pide ser hacedores de la palabra, no solo oidores." },
                ],
              },
              {
                id: "e3",
                narra: "La semana siguiente te piden que les enseñes a preparar sus propios estudios.",
                pregunta: "¿Qué les enseñas primero?",
                opciones: [
                  { texto: "A responder por escrito las tres preguntas del pasaje que van a leer.", valor: 2, explica: "Qué significó para sus primeros lectores, qué principio enseña y cómo se aplica hoy." },
                  { texto: "A leer muchos capítulos cada día, aunque no se detengan en ninguno.", valor: 1, explica: "Leer mucho es bueno, pero hace falta preguntar qué significó el texto, qué principio enseña y cómo se aplica." },
                  { texto: "A buscar lo que cada uno siente que el texto le dice, sin el contexto.", valor: 0, explica: "Primero se pregunta qué significó para sus primeros lectores: es el trabajo del contexto, las palabras y el género." },
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
            apoyo: "Para distinguir la forma del principio, se pregunta si el mandato se funda en la creación, en el carácter de Dios o en la obra de Cristo, que no cambian, o en una costumbre de aquel tiempo",
            ref: "Romanos 16:16",
            clave: {
              id: "pr-n3-hermeneutica-6-a6-1",
              tipo: "corta",
              pregunta: "¿Cómo se distingue la forma cultural de un mandato del principio que enseña? Usa el ejemplo del ósculo santo.",
              ideas: [
                { id: "funda", peso: 50, texto: "Se pregunta si el mandato se funda en la creación, en el carácter de Dios o en la obra de Cristo, o en una costumbre de aquel tiempo.", formas: ["se funda", "fund*", "creacion", "caracter de dios", "obra de cristo", "costumbre de aquel tiempo", "no cambian"] },
                { id: "osculo", peso: 50, texto: "En el ósculo santo, el principio es el afecto fraternal y puro; la forma puede ser un beso, un abrazo o un apretón de manos.", formas: ["afecto", "fraternal", "abrazo", "apreton de manos", "segun la costumbre", "cada lugar"] },
              ],
              modelo: "Se pregunta si el mandato se funda en la creación, en el carácter de Dios o en la obra de Cristo, o en una costumbre de aquel tiempo. En el ósculo santo, el principio es el afecto fraternal y puro; la forma puede ser un beso o un abrazo.",
            },
          },
          {
            apoyo: "Uno es aplicarlo todo al pie de la letra sin ver la distancia cultural, y entonces obligar a lo que Dios no obliga",
            clave: {
              id: "pr-n3-hermeneutica-6-a6-2",
              tipo: "corta",
              pregunta: "¿Cuáles son los dos extremos que hay que evitar al distinguir la forma del principio?",
              ideas: [
                { id: "letra", peso: 50, texto: "Aplicarlo todo al pie de la letra sin ver la distancia cultural, y obligar a lo que Dios no obliga.", formas: ["pie de la letra", "al pie", "literal*", "distancia cultural", "obligar a lo que"] },
                { id: "cultural", peso: 50, texto: "Llamar cultural a todo lo que incomoda, y desobedecer lo que Dios sí manda.", formas: ["llam* cultural", "cultural a todo", "incomod*", "molest*", "desobedec*"] },
              ],
              modelo: "Uno es aplicar todo al pie de la letra sin ver la distancia cultural, y obligar a lo que Dios no obliga. El otro es llamar cultural a todo lo que incomoda, y desobedecer lo que Dios sí manda.",
            },
          },
        ],
      },
    ],
  },
};
