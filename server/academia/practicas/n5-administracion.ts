/**
 * Las prácticas de «Administración y gobierno de la iglesia» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-administracion.ts), con la guía de docs/academia-practicas.md.
 *
 * Quién puede ejercer cada cargo de la iglesia (también el ministerio de la mujer) es un punto de la declaración de fe por
 * confirmar: ninguna actividad lo pregunta, y los casos no ponen a nadie en un cargo de gobierno. Las formas de gobierno
 * se preguntan con la atribución de la lección (qué iglesias siguen cada una), sin decir cuál es la correcta: la buena
 * respuesta es siempre la de la lección, que cada iglesia se gobierna según sus estatutos y su declaración de fe. De los
 * ancianos o pastores y de los diáconos se preguntan solo sus funciones y el carácter que la lección cita (1 Timoteo 3:2;
 * 1 Timoteo 3:8-10; Hechos 6:3), sin separar los requisitos en grupos que se excluyan. En el dinero, las buenas opciones
 * son los controles de la lección. La lección legal es una guía general: se pregunta lo que dice, sin plazos ni trámites
 * que no nombra, y en los casos concretos la buena respuesta es consultar a un abogado o a un contador.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_ADMINISTRACION: PracticasMateria = {
  materia: "n5-administracion",
  mision: {
    titulo: "Todo decentemente y con orden",
    intro:
      "Tu pastor te pidió que ayudes a ordenar la vida de la iglesia antes de que empiece el nuevo año. Los líderes te van a preguntar por qué administrar es un servicio, cómo se gobiernan las iglesias, qué hacen los que guían y los que sirven, cómo manejar el dinero con transparencia, cómo planificar y comunicar, y qué pasos legales hacen falta. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes ayudar a ordenar la vida de la iglesia para que sirva a su misión: administrar como un don y una mayordomía, conocer cómo se gobierna cada iglesia, organizar a los que guían, a los que sirven y a los equipos, cuidar el dinero con cuentas claras, planificar en oración, comunicar con claridad y cumplir la ley con el consejo de un profesional. El orden bien entendido es una forma de amar a la iglesia.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Una iglesia en orden
    "n5-administracion-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A quiénes nombra Pablo entre los dones que Dios puso en la iglesia?", reverso: "A «los que administran».", apoyo: "Entre los dones que Dios puso en la iglesia, Pablo nombra a «los que administran»" },
              { frente: "¿Qué es administrar, según la lección?", reverso: "Cuidar lo que es de Dios: personas, tiempo, dinero y bienes.", apoyo: "Administrar es cuidar lo que es de Dios: personas, tiempo, dinero y bienes" },
              { frente: "Según 1 Corintios 14:33, ¿de qué no es Dios, y de qué sí?", reverso: "No es Dios de confusión, sino de paz.", apoyo: "Pablo recuerda que «Dios no es Dios de confusión, sino de paz»" },
              { frente: "¿Apaga el orden al Espíritu?", reverso: "No: el orden sirve para que todos sean edificados.", apoyo: "El orden no apaga al Espíritu: sirve para que todos sean edificados" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A qué llama Pedro a todos en 1 Pedro 4:10?", reverso: "A servir como buenos administradores de la multiforme gracia de Dios.", apoyo: "Pedro llama a todos a servir «como buenos administradores de la multiforme gracia de Dios»" },
              { frente: "¿Qué tres tareas son también un servicio que Dios da a su pueblo?", reverso: "Organizar, planificar y llevar cuentas claras.", apoyo: "Organizar, planificar y llevar cuentas claras también es un servicio que Dios da a su pueblo" },
              { frente: "¿Por qué una iglesia con buena predicación puede perder a la gente?", reverso: "Por el desorden: horarios que cambian, dinero sin cuentas claras y tareas que nadie sabe quién hace.", apoyo: "Una iglesia puede tener buena predicación y aun así perder a la gente por el desorden" },
              { frente: "¿Qué es el orden bien entendido?", reverso: "Una forma de amar a la iglesia.", apoyo: "El orden bien entendido es una forma de amar a la iglesia" },
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
            consigna: "Une cada idea con lo que enseña la lección sobre la administración.",
            pares: [
              ["Un don", "Dios puso en la iglesia a los que administran"],
              ["Una mayordomía", "Cuidar lo que es de Dios como buenos administradores"],
              ["Cuatro cosas que se cuidan", "Las personas, el tiempo, el dinero y los bienes"],
              ["La misión a la que sirve", "Hacer discípulos, cuidar a la iglesia y servir al prójimo"],
            ],
            apoyo: "Administrar es un don y una mayordomía: cuidar como buenos administradores las personas, el tiempo, el dinero y los bienes que son de Dios",
            ref: "1 Pedro 4:10",
            explica: "Administrar es un don, porque Dios puso en la iglesia a los que administran, y una mayordomía: cuidar como buenos administradores las personas, el tiempo, el dinero y los bienes que son de Dios, al servicio de la misión.",
          },
          {
            consigna: "Une cada pasaje o idea con lo que enseña la lección.",
            pares: [
              ["1 Corintios 12:28", "Pablo nombra a los que administran entre los dones"],
              ["1 Pedro 4:10", "Servir como buenos administradores de la multiforme gracia"],
              ["Lo que se cuida al administrar", "Personas, tiempo, dinero y bienes, que son de Dios"],
              ["Llevar cuentas claras", "También es un servicio que Dios da a su pueblo"],
            ],
            apoyo: "Administrar es cuidar lo que es de Dios: personas, tiempo, dinero y bienes",
            ref: "1 Corintios 12:28; 1 Pedro 4:10",
            explica: "Entre los dones, Pablo nombra a los que administran, y Pedro llama a todos a servir como buenos administradores de la multiforme gracia de Dios. Administrar es cuidar lo que es de Dios, y llevar cuentas claras también es un servicio.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es una administración que sirve o una que solo controla? Lleva cada frase a su grupo.",
            grupos: ["Administración que sirve", "Administración que solo controla"],
            frases: [
              { texto: "Hace fácil participar, servir y crecer", grupo: 0 },
              { texto: "Todos saben cómo se decide y cómo se usa el dinero", grupo: 0 },
              { texto: "Sus reglas existen para servir a la obra", grupo: 0 },
              { texto: "Sirve a la misión: hacer discípulos y servir al prójimo", grupo: 0 },
              { texto: "Pone reglas que le ponen trabas a la obra", grupo: 1 },
              { texto: "Controla por controlar", grupo: 1 },
              { texto: "Hace difícil participar y servir", grupo: 1 },
            ],
            apoyo: "No controla por controlar: las reglas existen para servir, no para ponerle trabas a la obra",
            explica: "Una administración que sirve sirve a la misión y a las personas, es transparente y no controla por controlar: sus reglas existen para servir, no para ponerle trabas a la obra.",
          },
          {
            consigna: "En un ministerio, ¿cada decisión muestra una administración que sirve o una que solo controla? Lleva cada frase a su grupo.",
            grupos: ["Administración que sirve", "Administración que solo controla"],
            frases: [
              { texto: "Explicar a todos cómo se usó el dinero de la actividad", grupo: 0 },
              { texto: "Hacer fácil que un hermano nuevo empiece a servir", grupo: 0 },
              { texto: "Poner horarios claros, para que todos puedan participar", grupo: 0 },
              { texto: "Pedir cinco firmas para prestar una silla", grupo: 1 },
              { texto: "Decidir a escondidas, sin que nadie sepa cómo", grupo: 1 },
              { texto: "Llenar de trámites el servicio, hasta que nadie quiera servir", grupo: 1 },
              { texto: "Poner reglas que solo sirven para controlar", grupo: 1 },
            ],
            apoyo: "Sirve a las personas: hace fácil participar, servir y crecer",
            explica: "Una administración que sirve hace fácil participar, servir y crecer, y es transparente: todos saben cómo se decide y cómo se usa el dinero. La que solo controla pone reglas que le ponen trabas a la obra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Pablo recuerda cómo es Dios. ¿De qué no es Dios, y de qué sí lo es? Toca las palabras que lo dicen.",
            texto: "Dios no es Dios de [[confusión]], sino de [[paz]]",
            apoyo: "Pablo recuerda que «Dios no es Dios de confusión, sino de paz»",
            ref: "1 Corintios 14:33",
            explica: "Dios no es Dios de confusión, sino de paz: por eso en su iglesia todo debe hacerse decentemente y con orden.",
          },
          {
            consigna: "Pablo concluye cómo debe hacerse todo en la iglesia. ¿Cómo? Toca las palabras que lo dicen.",
            texto: "pero hágase todo [[decentemente]] y con [[orden]]",
            apoyo: "y concluye: «pero hágase todo decentemente y con orden»",
            ref: "1 Corintios 14:40",
            explica: "Pablo concluye: «pero hágase todo decentemente y con orden». El orden no apaga al Espíritu: sirve para que todos sean edificados. Es el versículo de memoria de esta materia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El orden no apaga al Espíritu: sirve para que todos sean edificados",
            ref: "1 Corintios 14:40",
            situacion: "Tu pastor te pide que ordenes el ministerio de bienvenida. Los horarios cambian cada semana, nadie sabe quién hace cada tarea y algunos voluntarios ya se cansaron.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera reunión, un voluntario te dice: Dejemos todo como está; si ponemos orden, apagamos al Espíritu.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el orden no apaga al Espíritu: sirve para edificar a todos.", valor: 2, explica: "El orden no apaga al Espíritu: sirve para que todos sean edificados.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que cada uno siga sirviendo como pueda, sin orden.", valor: 0, explica: "Dios no es Dios de confusión, sino de paz: en su iglesia todo se hace decentemente y con orden.", siguiente: "e1b" },
                  { texto: "Que el orden importa, pero que lo verán cuando haya más gente.", valor: 1, explica: "Reconoces que el orden importa, pero el desorden ya estorba hoy: una iglesia puede perder a la gente por el desorden.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un mes después, una familia nueva deja de venir: ese domingo nadie la recibió en la puerta.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Ordenas con el equipo los horarios y las tareas.", valor: 2, explica: "Ordenar los horarios y las tareas también es amar a la iglesia: el orden bien entendido es una forma de amarla.", siguiente: "e2" },
                  { texto: "Le pides al pastor que predique mejor el domingo.", valor: 0, explica: "Una iglesia puede tener buena predicación y aun así perder a la gente por el desorden.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya tienen horarios fijos. Un líder propone que, para servir un domingo, cada voluntario llene tres formularios y espere un mes.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Pides reglas sencillas que hagan fácil servir.", valor: 2, explica: "Una administración que sirve hace fácil participar, servir y crecer: las reglas existen para servir." },
                  { texto: "Aceptas: mientras más reglas, más orden habrá.", valor: 0, explica: "No controla por controlar: las reglas existen para servir, no para ponerle trabas a la obra." },
                  { texto: "Aceptas los formularios, pero quitas la espera.", valor: 1, explica: "Quitar la espera ayuda, pero tres formularios siguen siendo una traba: la administración que sirve hace fácil servir." },
                ],
              },
              {
                id: "e3",
                narra: "El ministerio recibe una ofrenda para los refrigerios de los visitantes.",
                pregunta: "¿Cómo la manejas?",
                opciones: [
                  { texto: "Con cuentas claras, para que todos sepan cómo se usa.", valor: 2, explica: "Una administración que sirve es transparente: todos saben cómo se decide y cómo se usa el dinero." },
                  { texto: "La guardas tú y la gastas como mejor te parezca a ti.", valor: 0, explica: "Una buena administración es transparente: todos saben cómo se usa el dinero." },
                  { texto: "Llevas las cuentas, pero no se las muestras nunca a nadie.", valor: 1, explica: "Llevar cuentas está bien, pero una administración transparente deja que todos sepan cómo se usa el dinero." },
                ],
              },
            ],
          },
          {
            apoyo: "El orden bien entendido es una forma de amar a la iglesia",
            ref: "1 Corintios 14:33",
            situacion: "Te piden coordinar la visitación de los enfermos de tu iglesia. Nadie sabe a quién le toca visitar, y algunos enfermos pasan semanas sin recibir visita.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano del equipo te dice: Organizar las visitas es frío; que cada uno vaya cuando lo sienta.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el orden bien entendido es una forma de amar a la iglesia.", valor: 2, explica: "El orden bien entendido es una forma de amar a la iglesia: no apaga al Espíritu, sirve para que todos sean edificados.", siguiente: "e2" },
                  { texto: "Que tiene razón: el amor no necesita orden ni ninguna lista.", valor: 0, explica: "Dios no es Dios de confusión, sino de paz, y el orden bien entendido es una forma de amar a la iglesia.", siguiente: "e1b" },
                  { texto: "Que harás una lista de los enfermos, pero sin repartir las visitas.", valor: 1, explica: "La lista ayuda, pero todavía nadie sabe a quién le toca visitar: el desorden sigue estorbando el servicio.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa un mes, y una hermana enferma cuenta que nadie la visitó.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Ordenas con el equipo a quién le toca visitar cada semana.", valor: 2, explica: "Ordenar el servicio es una forma de amar a la iglesia: el orden sirve para que todos sean edificados.", siguiente: "e2" },
                  { texto: "Le dices que fue un descuido de todos, y sigues igual que antes.", valor: 0, explica: "Dios no es Dios de confusión, sino de paz: en su iglesia todo se hace decentemente y con orden.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya hay un plan de visitas. Alguien propone que cada visita la aprueben antes cinco líderes.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Pides una regla sencilla: un responsable y una lista.", valor: 2, explica: "Las reglas existen para servir, no para ponerle trabas a la obra." },
                  { texto: "Aceptas: controlar cada visita es lo más seguro para todos.", valor: 0, explica: "No controla por controlar: las reglas existen para servir, no para ponerle trabas a la obra." },
                  { texto: "Aceptas, pero que la aprueben solo dos de esos líderes.", valor: 1, explica: "Es menos traba, pero todavía hace difícil servir: la administración que sirve hace fácil participar." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del mes, el equipo pregunta cómo se decidió quién visita a quién.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les explicas cómo se decidió, para que todos lo sepan.", valor: 2, explica: "Una administración que sirve es transparente: todos saben cómo se decide." },
                  { texto: "Les dices que eso lo decides tú, y que no tienen por qué saberlo.", valor: 0, explica: "Una buena administración es transparente: todos saben cómo se decide y cómo se usa el dinero." },
                  { texto: "Les dices que se lo explicarás solo si alguien se queja.", valor: 1, explica: "Explicarlo está bien, pero en una administración transparente todos saben cómo se decide, sin esperar quejas." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Administrar es un don y una mayordomía: cuidar como buenos administradores las personas, el tiempo, el dinero y los bienes que son de Dios",
            ref: "1 Corintios 12:28; 1 Pedro 4:10",
            clave: {
              id: "pr-n5-administracion-1-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué la administración es un don y una mayordomía, y a qué sirve?",
              ideas: [
                { id: "don", peso: 35, texto: "Es un don: entre los dones que Dios puso en la iglesia, Pablo nombra a los que administran.", formas: ["los que administran", "dones", "dios (puso|pone|da|dio|regala|regalo) (a|en)", "servicio que dios da", "regalo de dios"] },
                { id: "mayordomia", peso: 35, texto: "Es una mayordomía: cuidar como buenos administradores lo que es de Dios: personas, tiempo, dinero y bienes.", formas: ["lo que es de dios", "buenos administradores", "personas tiempo dinero", "tiempo dinero bienes", "no es nuestro"] },
                { id: "mision", peso: 30, texto: "Sirve a la misión: hacer discípulos, cuidar a la iglesia y servir al prójimo.", formas: ["mision", "discipulos", "projimo"] },
              ],
              modelo: "Administrar es un don, porque entre los dones Pablo nombra a los que administran, y una mayordomía: cuidar como buenos administradores lo que es de Dios, las personas, el tiempo, el dinero y los bienes. Sirve a la misión: hacer discípulos y servir al prójimo.",
            },
          },
          {
            apoyo: "Organizar, planificar y llevar cuentas claras también es un servicio que Dios da a su pueblo",
            ref: "1 Corintios 12:28; 1 Pedro 4:10",
            clave: {
              id: "pr-n5-administracion-1-a6-2",
              tipo: "corta",
              pregunta: "Un alumno de la academia te dice que llevar cuentas y planificar no es algo espiritual. ¿Qué le explicas?",
              ideas: [
                { id: "servicio", peso: 50, texto: "Que organizar, planificar y llevar cuentas claras también es un servicio que Dios da a su pueblo: Pablo nombra entre los dones a los que administran.", formas: ["servicio", "los que administran", "dones", "(es|un|como) don", "dios (puso|pone|da|dio|regala) (a|en)"] },
                { id: "mayordomia", peso: 50, texto: "Que administrar es cuidar lo que es de Dios, como buenos administradores de la multiforme gracia de Dios: personas, tiempo, dinero y bienes.", formas: ["mayordom*", "lo que es de dios", "personas tiempo dinero", "tiempo dinero bienes", "no es nuestro", "buenos administradores", "multiforme", "administradores de la gracia"] },
              ],
              modelo: "Le explico que organizar, planificar y llevar cuentas claras también es un servicio que Dios da a su pueblo. Pedro nos llama a servir como buenos administradores de la multiforme gracia de Dios, cuidando lo que es de Dios: personas, tiempo, dinero y bienes.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Formas de gobierno de la iglesia
    "n5-administracion-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hicieron Pablo y Bernabé en las iglesias que nacieron en su viaje?", reverso: "Constituyeron ancianos en cada iglesia.", apoyo: "Pablo y Bernabé, en las iglesias que nacieron en su viaje, «constituyeron ancianos en cada iglesia»" },
              { frente: "¿Qué es el gobierno episcopal?", reverso: "Obispos que supervisan a varias iglesias y a sus pastores.", apoyo: "Episcopal: obispos que supervisan a varias iglesias y a sus pastores" },
              { frente: "¿Qué es el gobierno presbiteriano?", reverso: "Ancianos que gobiernan juntos en cada iglesia y en concilios regionales.", apoyo: "Presbiteriana: ancianos que gobiernan juntos en cada iglesia y en concilios regionales" },
              { frente: "¿Qué es el gobierno congregacional?", reverso: "La congregación toma las decisiones principales, y cada iglesia es autónoma.", apoyo: "Congregacional: la congregación toma las decisiones principales, y cada iglesia es autónoma" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué dejó Pablo a Tito en Creta?", reverso: "Para que estableciera ancianos en cada ciudad.", apoyo: "Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad (Tito 1:5)" },
              { frente: "En Hechos 15, ¿quiénes decidieron enviar la carta?", reverso: "Los apóstoles y los ancianos, con toda la iglesia.", apoyo: "«pareció bien a los apóstoles y a los ancianos, con toda la iglesia» enviar una carta con la decisión" },
              { frente: "¿Qué rasgos combinan muchas iglesias, también pentecostales?", reverso: "Un pastor que guía, un consejo que lo acompaña y una asamblea que aprueba ciertas decisiones.", apoyo: "Muchas iglesias, también pentecostales, combinan rasgos de estas formas: un pastor que guía, un consejo que lo acompaña y una asamblea que aprueba ciertas decisiones" },
              { frente: "¿Según qué se gobierna cada iglesia?", reverso: "Según sus estatutos y su declaración de fe.", apoyo: "Cada iglesia se gobierna según sus estatutos y su declaración de fe" },
              { frente: "¿Qué necesita la iglesia, cualquiera que sea su forma de gobierno?", reverso: "Líderes de buen carácter, decisiones claras, rendición de cuentas y la guía de la Palabra y del Espíritu.", apoyo: "Cualquiera que sea la forma de gobierno, la iglesia necesita líderes de buen carácter, decisiones claras, rendición de cuentas y la guía de la Palabra y del Espíritu Santo" },
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
            consigna: "¿Qué forma de gobierno describe cada frase: episcopal, presbiteriana o congregacional? Lleva cada frase a su grupo.",
            grupos: ["Episcopal", "Presbiteriana", "Congregacional"],
            frases: [
              { texto: "Obispos que supervisan a varias iglesias", grupo: 0 },
              { texto: "Un obispo supervisa a los pastores", grupo: 0 },
              { texto: "Ancianos que gobiernan juntos en cada iglesia", grupo: 1 },
              { texto: "Ancianos reunidos en concilios regionales", grupo: 1 },
              { texto: "Decide un consejo de ancianos", grupo: 1 },
              { texto: "La congregación toma las decisiones principales", grupo: 2 },
              { texto: "Cada iglesia es autónoma", grupo: 2 },
            ],
            apoyo: "A lo largo de la historia hubo tres formas de gobierno: la episcopal, con obispos; la presbiteriana, con ancianos y concilios; y la congregacional, con la congregación",
            explica: "La episcopal tiene obispos que supervisan a varias iglesias y a sus pastores; la presbiteriana, ancianos que gobiernan juntos y concilios regionales; y en la congregacional, la congregación toma las decisiones principales y cada iglesia es autónoma.",
          },
          {
            consigna: "Según la lección, ¿qué forma de gobierno siguen estas iglesias: episcopal, presbiteriana o congregacional? Lleva cada frase a su grupo.",
            grupos: ["Episcopal", "Presbiteriana", "Congregacional"],
            frases: [
              { texto: "La iglesia católica", grupo: 0 },
              { texto: "La iglesia ortodoxa", grupo: 0 },
              { texto: "La iglesia anglicana", grupo: 0 },
              { texto: "Las iglesias metodistas", grupo: 0 },
              { texto: "Las iglesias reformadas", grupo: 1 },
              { texto: "Las iglesias presbiterianas", grupo: 1 },
              { texto: "Las iglesias bautistas", grupo: 2 },
              { texto: "Muchas iglesias independientes", grupo: 2 },
            ],
            apoyo: "La siguen, entre otras, las iglesias católica, ortodoxa, anglicana y metodista",
            explica: "La episcopal la siguen, entre otras, las iglesias católica, ortodoxa, anglicana y metodista; la presbiteriana, las presbiterianas y reformadas; y la congregacional, las bautistas y muchas iglesias independientes.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En las iglesias que nacieron en su viaje, ¿a quiénes constituyeron Pablo y Bernabé? Toca la palabra que lo dice.",
            texto: "constituyeron [[ancianos]] en cada iglesia",
            apoyo: "Desde el principio, las iglesias tuvieron líderes reconocidos",
            ref: "Hechos 14:23",
            explica: "Pablo y Bernabé «constituyeron ancianos en cada iglesia», y Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad: desde el principio, las iglesias tuvieron líderes reconocidos.",
          },
          {
            consigna: "En Hechos 15, ¿a quiénes les pareció bien enviar la carta, junto con toda la iglesia? Toca las palabras que lo dicen.",
            texto: "pareció bien a los [[apóstoles]] y a los [[ancianos]], con toda la iglesia",
            apoyo: "Hubo líderes que guiaron y una iglesia que participó",
            ref: "Hechos 15:22",
            explica: "«pareció bien a los apóstoles y a los ancianos, con toda la iglesia» enviar una carta con la decisión: hubo líderes que guiaron y una iglesia que participó.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los ejemplos de gobierno del Nuevo Testamento: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Desde el principio, las iglesias tuvieron líderes reconocidos.", verdad: true, explica: "Pablo y Bernabé constituyeron ancianos en cada iglesia, y Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad.", apoyo: "Desde el principio, las iglesias tuvieron líderes reconocidos", ref: "Hechos 14:23" },
              { texto: "En Hechos 15, los apóstoles decidieron solos, sin los ancianos ni la iglesia.", verdad: false, explica: "«pareció bien a los apóstoles y a los ancianos, con toda la iglesia» enviar una carta con la decisión.", apoyo: "«pareció bien a los apóstoles y a los ancianos, con toda la iglesia» enviar una carta con la decisión", ref: "Hechos 15:22" },
              { texto: "Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad.", verdad: true, explica: "Así lo dice Tito 1:5: desde el principio, las iglesias tuvieron líderes reconocidos.", apoyo: "Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad (Tito 1:5)", ref: "Tito 1:5" },
            ],
          },
          {
            consigna: "Sobre cómo se gobernaron las primeras iglesias: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las primeras iglesias no tuvieron líderes reconocidos.", verdad: false, explica: "Desde el principio, las iglesias tuvieron líderes reconocidos: Pablo y Bernabé constituyeron ancianos en cada iglesia.", apoyo: "Desde el principio, las iglesias tuvieron líderes reconocidos", ref: "Hechos 14:23" },
              { texto: "En Hechos 15 hubo líderes que guiaron y una iglesia que participó.", verdad: true, explica: "Pareció bien a los apóstoles y a los ancianos, con toda la iglesia, enviar una carta con la decisión.", apoyo: "Hubo líderes que guiaron y una iglesia que participó", ref: "Hechos 15:22" },
              { texto: "Pablo y Bernabé dejaron sin ancianos a las iglesias que nacieron en su viaje.", verdad: false, explica: "En las iglesias que nacieron en su viaje, «constituyeron ancianos en cada iglesia».", apoyo: "Pablo y Bernabé, en las iglesias que nacieron en su viaje, «constituyeron ancianos en cada iglesia»", ref: "Hechos 14:23" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que dice la lección sobre conocer el gobierno de tu iglesia.",
            texto: "Conocer cómo se [[gobierna]] tu iglesia te ayuda a servir con orden y con [[unidad]].",
            distractores: ["oculta", "miedo"],
            errores: {
              oculta: "Se trata de conocer cómo se gobierna tu iglesia.",
              miedo: "Conocer cómo se gobierna tu iglesia te ayuda a servir con orden y con unidad.",
            },
            apoyo: "Conocer cómo se gobierna tu iglesia te ayuda a servir con orden y con unidad",
            explica: "Cada iglesia se gobierna según sus estatutos y su declaración de fe, y conocer cómo se gobierna te ayuda a servir con orden y con unidad.",
          },
          {
            consigna: "Completa cómo se gobierna cada iglesia.",
            texto: "Muchas iglesias [[combinan]] rasgos de las tres [[formas]] de gobierno, y cada iglesia se gobierna según sus [[estatutos]] y su declaración de fe.",
            distractores: ["rechazan", "biblias", "deseos"],
            errores: {
              rechazan: "Muchas iglesias, también pentecostales, combinan rasgos de las tres formas de gobierno.",
              biblias: "Son tres formas de gobierno: la episcopal, la presbiteriana y la congregacional.",
              deseos: "Cada iglesia se gobierna según sus estatutos y su declaración de fe.",
            },
            apoyo: "Cada iglesia se gobierna según sus estatutos y su declaración de fe",
            explica: "Muchas iglesias, también pentecostales, combinan rasgos de las tres formas: un pastor que guía, un consejo que lo acompaña y una asamblea que aprueba ciertas decisiones. Cada iglesia se gobierna según sus estatutos y su declaración de fe.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano que acaba de entrar al consejo de tu iglesia te dice: No sé quién decide aquí. ¿Lo decide el pastor, el consejo o la asamblea?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo dicen los estatutos y la declaración de fe de la iglesia.", bien: true, explica: "Cada iglesia se gobierna según sus estatutos y su declaración de fe: conocerlos ayuda a servir con orden y con unidad." },
              { texto: "Que todas las iglesias se gobiernan igual, así que no hace falta mirar.", explica: "Las iglesias han respondido de maneras distintas a lo largo de la historia: cada una se gobierna según sus estatutos." },
              { texto: "Que decide quien tenga más años en la iglesia, aunque no lo digan sus normas.", explica: "Cada iglesia se gobierna según sus estatutos y su declaración de fe." },
              { texto: "Que haga como en la iglesia de al lado, que tiene otra forma de gobierno.", explica: "Cada iglesia se gobierna según sus propios estatutos y su declaración de fe." },
            ],
            apoyo: "Cada iglesia se gobierna según sus estatutos y su declaración de fe",
            explica: "Las iglesias han respondido de maneras distintas a lo largo de la historia, y cada iglesia se gobierna según sus estatutos y su declaración de fe.",
          },
          {
            caso: "Una hermana que llegó hace poco te dice: En la iglesia donde crecí decidía un obispo, y aquí una asamblea aprueba ciertas decisiones. ¿Cuál de las dos está mal?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que las iglesias se gobiernan de maneras distintas, según sus estatutos.", bien: true, explica: "Las iglesias han respondido de maneras distintas a lo largo de la historia, y cada una se gobierna según sus estatutos y su declaración de fe." },
              { texto: "Que la de aquí está mal, porque solo un obispo puede decidir en una iglesia.", explica: "En Hechos 15 decidieron los apóstoles y los ancianos, con toda la iglesia; y las iglesias se gobiernan de maneras distintas." },
              { texto: "Que la de su infancia está mal, porque en la Biblia solo decide la asamblea.", explica: "En Hechos 15 hubo líderes que guiaron y una iglesia que participó; y cada iglesia se gobierna según sus estatutos." },
              { texto: "Que ninguna importa, ni siquiera si sus líderes rinden cuentas o no.", explica: "Cualquiera que sea la forma de gobierno, la iglesia necesita líderes de buen carácter, decisiones claras y rendición de cuentas." },
            ],
            apoyo: "Las iglesias han respondido de maneras distintas a lo largo de la historia",
            explica: "Las iglesias han respondido de maneras distintas a lo largo de la historia; cada una se gobierna según sus estatutos y su declaración de fe, y todas necesitan líderes de buen carácter, decisiones claras y rendición de cuentas.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "A lo largo de la historia hubo tres formas de gobierno: la episcopal, con obispos; la presbiteriana, con ancianos y concilios; y la congregacional, con la congregación",
            clave: {
              id: "pr-n5-administracion-2-a7-1",
              tipo: "corta",
              pregunta: "Describe las tres formas históricas de gobierno de la iglesia.",
              ideas: [
                { id: "episcopal", peso: 34, texto: "Episcopal: obispos que supervisan a varias iglesias y a sus pastores.", formas: ["obisp*", "supervis*"] },
                { id: "presbiteriana", peso: 33, texto: "Presbiteriana: ancianos que gobiernan juntos en cada iglesia y en concilios regionales.", formas: ["ancian*", "concilio*"] },
                { id: "congregacional", peso: 33, texto: "Congregacional: la congregación toma las decisiones principales, y cada iglesia es autónoma.", formas: ["congregacion (toma|decide|decid*|vota|aprueba|elige|gobierna)", "decide la congregacion", "autonom*", "decisiones principales"] },
              ],
              errores: [
                { id: "episcopal-ancianos", texto: "Los ancianos que gobiernan juntos son de la forma presbiteriana; la episcopal tiene obispos.", formas: ["episcopal (con|tiene|tienen|son|de|es|los|las|por|hay) ancian*"], anula: "presbiteriana" },
                { id: "presbiteriana-obispos", texto: "Los obispos que supervisan son de la forma episcopal; la presbiteriana tiene ancianos.", formas: ["presbiteriana (con|tiene|tienen|son|de|es|los|las|por|hay) obisp*"], anula: "episcopal" },
              ],
              modelo: "La episcopal tiene obispos que supervisan a varias iglesias y a sus pastores. La presbiteriana tiene ancianos que gobiernan juntos en cada iglesia y en concilios regionales. En la congregacional, la congregación toma las decisiones principales y cada iglesia es autónoma.",
            },
          },
          {
            apoyo: "Congregacional: la congregación toma las decisiones principales, y cada iglesia es autónoma",
            clave: {
              id: "pr-n5-administracion-2-a7-2",
              tipo: "corta",
              pregunta: "Un joven de tu iglesia te pregunta en qué se diferencian el gobierno episcopal y el congregacional. ¿Qué le explicas?",
              ideas: [
                { id: "episcopal", peso: 50, texto: "En el episcopal, obispos supervisan a varias iglesias y a sus pastores.", formas: ["obisp*", "supervis*"] },
                { id: "congregacional", peso: 50, texto: "En el congregacional, la congregación toma las decisiones principales, y cada iglesia es autónoma.", formas: ["congregacion (toma|decide|decid*|vota|aprueba|elige|gobierna)", "decide la congregacion", "autonom*", "decisiones principales"] },
              ],
              errores: [
                { id: "congregacional-obispos", texto: "Los obispos que supervisan son del gobierno episcopal; en el congregacional decide la congregación.", formas: ["congregacional (con|tiene|tienen|son|de|es|los|las|por|hay) obisp*"], anula: "episcopal" },
                { id: "episcopal-congregacion", texto: "En el gobierno episcopal supervisan los obispos; la congregación decide en el congregacional.", formas: ["episcopal (decide|decid*) la congregacion", "episcopal la congregacion (toma|decide)"], anula: "congregacional" },
              ],
              modelo: "En el gobierno episcopal, los obispos supervisan a varias iglesias y a sus pastores. En el congregacional, la congregación toma las decisiones principales, y cada iglesia es autónoma.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Ancianos, diáconos y equipos
    "n5-administracion-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hacen los ancianos o pastores?", reverso: "Enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño.", apoyo: "Los ancianos o pastores enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño" },
              { frente: "¿Cuál es el primer requisito de los ancianos o pastores?", reverso: "El carácter: ser irreprensibles, sobrios, prudentes y aptos para enseñar.", apoyo: "Su primer requisito es el carácter: ser irreprensibles, sobrios, prudentes y aptos para enseñar (1 Timoteo 3:2)" },
              { frente: "¿De qué se encargaron los siete en Hechos 6?", reverso: "De atender a las viudas, para que los apóstoles siguieran en la oración y la palabra.", apoyo: "En Hechos 6, los siete se encargaron de atender a las viudas para que los apóstoles siguieran en la oración y la palabra" },
              { frente: "¿Qué criterio de Hechos 6 sigue vigente?", reverso: "Personas de buen testimonio, llenas del Espíritu Santo y de sabiduría.", apoyo: "El criterio de Hechos 6 sigue vigente" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A quiénes saludó Pablo en Filipos, junto con todos los santos?", reverso: "A los obispos y diáconos.", apoyo: "Pablo saludó «a todos los santos en Cristo Jesús que están en Filipos, con los obispos y diáconos»" },
              { frente: "¿Qué pide Pablo de los diáconos en 1 Timoteo 3:8-10?", reverso: "Que sean honestos, sin doblez, y sometidos a prueba primero.", apoyo: "Pablo pide que los diáconos «deben ser honestos, sin doblez», y que sean sometidos a prueba primero" },
              { frente: "¿Con qué cinco cosas funciona bien un equipo de servicio?", reverso: "Un propósito escrito, un responsable, personas preparadas, normas de protección y gratitud.", apoyo: "Los equipos de servicio funcionan bien con un propósito escrito, un responsable, personas preparadas, normas de protección y gratitud" },
              { frente: "Según la lección, ¿para quién es cada servicio en la iglesia?", reverso: "Para el Señor, sea visible o escondido.", apoyo: "Cada servicio en la iglesia, visible o escondido, es para el Señor" },
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
            consigna: "¿Es tarea de los que guían o de los que sirven en lo práctico? Lleva cada frase a su grupo.",
            grupos: ["Los que guían: ancianos o pastores", "Los que sirven en lo práctico: diáconos"],
            frases: [
              { texto: "Enseñan la Palabra", grupo: 0 },
              { texto: "Toman decisiones", grupo: 0 },
              { texto: "Protegen al rebaño", grupo: 0 },
              { texto: "Atienden necesidades, como en Hechos 6", grupo: 1 },
              { texto: "Atienden a las viudas, como los siete de Hechos 6", grupo: 1 },
              { texto: "Sirven para que los apóstoles sigan en la oración y la palabra", grupo: 1 },
            ],
            apoyo: "Desde muy temprano hubo dos clases de servicio reconocido: los que guían y los que sirven en lo práctico",
            ref: "Filipenses 1:1",
            explica: "Los ancianos o pastores enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño; los diáconos atienden necesidades como en Hechos 6, donde los siete atendieron a las viudas para que los apóstoles siguieran en la oración y la palabra.",
          },
          {
            consigna: "En tu iglesia, ¿cada servicio es de los que guían o de los que sirven en lo práctico? Lleva cada frase a su grupo.",
            grupos: ["Los que guían: ancianos o pastores", "Los que sirven en lo práctico: diáconos"],
            frases: [
              { texto: "Enseñar la Palabra a la congregación", grupo: 0 },
              { texto: "Tomar decisiones para cuidar a la iglesia", grupo: 0 },
              { texto: "Proteger al rebaño de la iglesia", grupo: 0 },
              { texto: "Atender a las viudas que necesitan ayuda", grupo: 1 },
              { texto: "Encargarse de lo práctico, como en Hechos 6", grupo: 1 },
              { texto: "Atender una necesidad para que otros sigan en la palabra", grupo: 1 },
            ],
            apoyo: "Los ancianos enseñan, cuidan, deciden y protegen al rebaño, y los diáconos atienden necesidades como en Hechos 6",
            ref: "Hechos 6:3",
            explica: "Desde muy temprano hubo dos clases de servicio reconocido: los que guían, que enseñan, cuidan, deciden y protegen al rebaño, y los que sirven en lo práctico, que atienden necesidades como en Hechos 6.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que Pablo pide a los diáconos.",
            texto: "Pablo pide que los [[diáconos]] sean [[honestos]], sin doblez, y que sean sometidos a [[prueba]] primero.",
            distractores: ["visitantes", "famosos", "presión"],
            errores: {
              visitantes: "En 1 Timoteo 3:8-10, Pablo habla de los diáconos.",
              famosos: "Pablo pide que los diáconos sean honestos, sin doblez.",
              "presión": "Pablo pide que los diáconos sean sometidos a prueba primero.",
            },
            apoyo: "Pablo pide que los diáconos «deben ser honestos, sin doblez», y que sean sometidos a prueba primero",
            ref: "1 Timoteo 3:8-10",
            explica: "Pablo pide que los diáconos sean honestos, sin doblez, y que sean sometidos a prueba primero: para todos los que sirven, lo primero es el carácter.",
          },
          {
            consigna: "Completa el primer requisito de los ancianos o pastores.",
            texto: "El primer requisito de los ancianos o pastores es el [[carácter]]: ser irreprensibles, sobrios, [[prudentes]] y aptos para [[enseñar]].",
            distractores: ["dinero", "ricos", "mandar"],
            errores: {
              dinero: "El primer requisito de los ancianos o pastores es el carácter.",
              ricos: "Pablo pide que sean irreprensibles, sobrios, prudentes y aptos para enseñar.",
              mandar: "Pablo pide que sean aptos para enseñar.",
            },
            apoyo: "Su primer requisito es el carácter: ser irreprensibles, sobrios, prudentes y aptos para enseñar (1 Timoteo 3:2)",
            ref: "1 Timoteo 3:2",
            explica: "El primer requisito de los ancianos o pastores es el carácter: ser irreprensibles, sobrios, prudentes y aptos para enseñar (1 Timoteo 3:2). Para todos los que sirven, lo primero es el carácter.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los que guían y los que sirven: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo saludó a los santos de Filipos con los obispos y diáconos.", verdad: true, explica: "Desde muy temprano hubo dos clases de servicio reconocido: los que guían y los que sirven en lo práctico.", apoyo: "Pablo saludó «a todos los santos en Cristo Jesús que están en Filipos, con los obispos y diáconos»", ref: "Filipenses 1:1" },
              { texto: "En Hechos 6, los siete se encargaron de atender a las viudas.", verdad: true, explica: "Lo hicieron para que los apóstoles siguieran en la oración y la palabra.", apoyo: "En Hechos 6, los siete se encargaron de atender a las viudas para que los apóstoles siguieran en la oración y la palabra", ref: "Hechos 6:3" },
              { texto: "Una iglesia sana depende de una sola persona que lo hace todo.", verdad: false, explica: "Una iglesia sana no depende de una sola persona: tiene líderes que guían, diáconos que sirven y equipos que trabajan juntos.", apoyo: "Una iglesia sana no depende de una sola persona" },
            ],
          },
          {
            consigna: "Sobre las funciones de los que guían y de los que sirven: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En Hechos 6, los apóstoles dejaron la oración para atender a las viudas.", verdad: false, explica: "Los siete atendieron a las viudas para que los apóstoles siguieran en la oración y la palabra.", apoyo: "En Hechos 6, los siete se encargaron de atender a las viudas para que los apóstoles siguieran en la oración y la palabra", ref: "Hechos 6:3" },
              { texto: "Los ancianos o pastores enseñan la Palabra y protegen al rebaño.", verdad: true, explica: "Enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño (Hechos 20:28; 1 Pedro 5:2).", apoyo: "Los ancianos o pastores enseñan la Palabra, cuidan a la iglesia, toman decisiones y protegen al rebaño" },
              { texto: "Desde muy temprano, la iglesia tuvo un solo tipo de servicio reconocido.", verdad: false, explica: "Hubo dos clases de servicio reconocido: los que guían y los que sirven en lo práctico.", apoyo: "Desde muy temprano hubo dos clases de servicio reconocido", ref: "Filipenses 1:1" },
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
            apoyo: "Los equipos de servicio funcionan bien con un propósito escrito, un responsable, personas preparadas, normas de protección y gratitud",
            titulo: "Un equipo para los niños",
            relato: [
              "Tu pastor te pide reorganizar el equipo de niños. Hoy sirve quien llega ese domingo, nadie sabe quién es el responsable y el propósito del equipo nunca se escribió.",
              "Una familia que llegó hace dos semanas se ofrece a servir con los niños desde este domingo.",
              "Y los voluntarios que sirven desde hace años dicen que nadie les ha dado nunca las gracias.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero para ordenar el equipo?",
                opciones: [
                  { texto: "Escribir su propósito y nombrar un responsable que rinda cuentas.", bien: true, explica: "Cada equipo tiene un propósito escrito y un responsable que sabe a quién rinde cuentas." },
                  { texto: "Dejar que siga sirviendo quien llegue cada domingo, como hasta hoy.", explica: "Así nadie sabe quién es el responsable: cada equipo tiene un propósito escrito y un responsable." },
                  { texto: "Hacerlo todo tú, para que el equipo no tenga que depender de nadie.", explica: "Una iglesia sana no depende de una sola persona: tiene equipos que trabajan juntos." },
                ],
                apoyo: "Cada equipo tiene un responsable y sabe a quién rinde cuentas",
                explica: "Un equipo funciona bien con un propósito escrito y un responsable que sabe a quién rinde cuentas.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a la familia que quiere servir este domingo?",
                opciones: [
                  { texto: "Que gracias; primero conocerán su testimonio y los prepararán.", bien: true, explica: "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad." },
                  { texto: "Que empiecen este mismo domingo, porque al equipo le falta mucha gente.", explica: "Antes de darles responsabilidad, se conoce su testimonio y se las prepara." },
                  { texto: "Que no podrán servir con los niños, porque nadie conoce todavía a su familia.", explica: "No se les cierra la puerta: se conoce su testimonio y se las prepara antes de darles responsabilidad." },
                ],
                apoyo: "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad",
                explica: "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad.",
              },
              {
                tipo: "situacion",
                pregunta: "Un voluntario propone dejar las normas de protección, porque todos se conocen. ¿Qué decides?",
                opciones: [
                  { texto: "Que en los equipos con menores siempre se siguen las normas.", bien: true, explica: "En los equipos con menores se siguen siempre las normas de protección." },
                  { texto: "Que las sigan solo cuando llegue alguien nuevo al equipo de niños.", explica: "Las normas de protección se siguen siempre, no solo con los nuevos." },
                  { texto: "Que basta con confiar en los hermanos y dejar las normas en el papel.", explica: "En los equipos con menores se siguen siempre las normas de protección." },
                ],
                apoyo: "En los equipos con menores se siguen siempre las normas de protección",
                explica: "En los equipos con menores se siguen siempre las normas de protección, aunque todos se conozcan.",
              },
              {
                tipo: "explica",
                apoyo: "Se agradece y se reconoce a los voluntarios",
                clave: {
                  id: "pr-n5-administracion-3-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué harás con los voluntarios que nunca recibieron las gracias, y por qué?",
                  ideas: [
                    { id: "gracias", peso: 50, texto: "Agradecerles y reconocer su servicio.", formas: ["agradec*", "dar* gracias", "doy gracias", "reconoc*", "gratitud"] },
                    { id: "senor", peso: 50, texto: "Porque cada servicio en la iglesia, visible o escondido, es para el Señor.", formas: ["para el senor", "visible o escondido", "escondido", "para dios", "lo ve dios", "lo ve el senor"] },
                  ],
                  modelo: "Les daré las gracias y reconoceré su servicio, porque se agradece y se reconoce a los voluntarios. Cada servicio en la iglesia, visible o escondido, es para el Señor.",
                },
              },
            ],
          },
          {
            apoyo: "Cada equipo tiene un propósito escrito: alabanza, niños, bienvenida, visitación, medios, limpieza",
            titulo: "La bienvenida de los domingos",
            relato: [
              "Coordinas los equipos de servicio de tu iglesia. El equipo de bienvenida tiene muchos voluntarios, pero cada domingo faltan personas en la puerta y nadie sabe por qué.",
              "Al preguntar, descubres que el equipo no tiene un propósito escrito y que su responsable no sabe a quién rinde cuentas.",
              "Además, un hermano propone poner en la puerta al joven más simpático, aunque nadie conoce todavía su testimonio.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le falta primero a este equipo?",
                opciones: [
                  { texto: "Un propósito escrito y un responsable que rinda cuentas.", bien: true, explica: "Cada equipo tiene un propósito escrito y un responsable que sabe a quién rinde cuentas." },
                  { texto: "Más voluntarios, porque con más gente se resuelve todo el problema.", explica: "Ya tiene muchos voluntarios: lo que falta es un propósito escrito y un responsable." },
                  { texto: "Un líder que haga todo solo, para no depender de los voluntarios.", explica: "Una iglesia sana no depende de una sola persona: tiene equipos que trabajan juntos." },
                ],
                apoyo: "Cada equipo tiene un responsable y sabe a quién rinde cuentas",
                explica: "Un equipo funciona bien con un propósito escrito y un responsable que sabe a quién rinde cuentas.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con la propuesta de poner al joven más simpático?",
                opciones: [
                  { texto: "Escoger personas de buen testimonio y prepararlas antes.", bien: true, explica: "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad." },
                  { texto: "Ponerlo este domingo: en la puerta, la simpatía es lo que más importa.", explica: "Se escogen personas de buen testimonio, y se las prepara antes de darles responsabilidad." },
                  { texto: "Dejar siempre a los mismos de siempre, sin preparar nunca a nadie nuevo.", explica: "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad." },
                ],
                apoyo: "Se escogen personas de buen testimonio y se las prepara antes de darles responsabilidad",
                explica: "El criterio de Hechos 6 sigue vigente: personas de buen testimonio, llenas del Espíritu Santo y de sabiduría, preparadas antes de darles responsabilidad.",
              },
              {
                tipo: "situacion",
                pregunta: "Al terminar el primer mes, el equipo ya funciona. ¿Qué haces con los voluntarios?",
                opciones: [
                  { texto: "Les agradeces y reconoces su servicio, se vea o no se vea.", bien: true, explica: "Se agradece y se reconoce a los voluntarios: cada servicio, visible o escondido, es para el Señor." },
                  { texto: "Nada: servir es su deber, y no hace falta darles las gracias.", explica: "Se agradece y se reconoce a los voluntarios." },
                  { texto: "Agradeces solo a los que se ven en la puerta, y no a los demás.", explica: "Cada servicio en la iglesia, visible o escondido, es para el Señor." },
                ],
                apoyo: "Se agradece y se reconoce a los voluntarios",
                explica: "Se agradece y se reconoce a los voluntarios, porque cada servicio en la iglesia, visible o escondido, es para el Señor.",
              },
              {
                tipo: "explica",
                apoyo: "Los equipos de servicio funcionan bien con un propósito escrito, un responsable, personas preparadas, normas de protección y gratitud",
                clave: {
                  id: "pr-n5-administracion-3-a5-2",
                  tipo: "corta",
                  pregunta: "Escribe en dos o tres frases cómo organizarás el equipo de bienvenida.",
                  ideas: [
                    { id: "proposito", peso: 34, texto: "Un propósito escrito y un responsable que sabe a quién rinde cuentas.", formas: ["proposito", "por escrito", "responsable", "rind* cuentas", "rend* cuentas", "a quien rinde"] },
                    { id: "personas", peso: 33, texto: "Personas de buen testimonio, preparadas antes de darles responsabilidad.", formas: ["buen testimonio", "prepar*", "capacit*", "entren*"] },
                    { id: "gracias", peso: 33, texto: "Agradecer y reconocer a los voluntarios.", formas: ["agradec*", "dar* gracias", "doy gracias", "reconoc*", "gratitud"] },
                  ],
                  modelo: "Escribiré el propósito del equipo y nombraré un responsable que sepa a quién rinde cuentas. Escogeré personas de buen testimonio y las prepararé antes de darles responsabilidad. Y agradeceré y reconoceré a los voluntarios.",
                },
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
            apoyo: "para todos, lo primero es el carácter",
            ref: "1 Timoteo 3:2; 1 Timoteo 3:8-10",
            clave: {
              id: "pr-n5-administracion-3-a6-1",
              tipo: "corta",
              pregunta: "¿Qué carácter pide la Palabra a los que sirven? Di lo que pide para los ancianos o pastores y para los diáconos.",
              ideas: [
                { id: "ancianos", peso: 50, texto: "A los ancianos o pastores: ser irreprensibles, sobrios, prudentes y aptos para enseñar.", formas: ["irreprensible*", "sobrio*", "prudente*", "prudencia", "aptos para ensenar", "apto para ensenar", "capaces de ensenar"] },
                { id: "diaconos", peso: 50, texto: "A los diáconos: ser honestos, sin doblez, y ser sometidos a prueba primero.", formas: ["honest*", "sin doblez", "a prueba", "probados", "prueba primero"] },
              ],
              modelo: "A los ancianos o pastores la Palabra les pide ser irreprensibles, sobrios, prudentes y aptos para enseñar. A los diáconos, ser honestos, sin doblez, y que sean sometidos a prueba primero. Para todos, lo primero es el carácter.",
            },
          },
          {
            apoyo: "El criterio de Hechos 6 sigue vigente: personas «de buen testimonio, llenos del Espíritu Santo y de sabiduría»",
            ref: "Hechos 6:3",
            clave: {
              id: "pr-n5-administracion-3-a6-2",
              tipo: "corta",
              pregunta: "Tu equipo va a escoger a nuevos servidores. ¿Qué criterio de Hechos 6 les recuerdas, y qué es lo primero para todos los que sirven?",
              ideas: [
                { id: "hechos6", peso: 60, texto: "Personas de buen testimonio, llenas del Espíritu Santo y de sabiduría.", formas: ["buen testimonio", "llen* del espiritu", "espiritu santo", "sabiduria", "sabios"] },
                { id: "caracter", peso: 40, texto: "Para todos, lo primero es el carácter.", formas: ["caracter"] },
              ],
              modelo: "Les recuerdo el criterio de Hechos 6, que sigue vigente: personas de buen testimonio, llenas del Espíritu Santo y de sabiduría. Y para todos los que sirven, lo primero es el carácter.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. El dinero de la iglesia
    "n5-administracion-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo organizó Pablo la ofrenda para Jerusalén?", reverso: "Con orden: cada primer día de la semana, cada uno apartaba algo según había prosperado.", apoyo: "Pablo organizó la ofrenda para Jerusalén con orden" },
              { frente: "Según la lección, ¿qué es dar, y qué es administrar lo que se da?", reverso: "Dar es adoración, y administrar lo que se da es responsabilidad.", apoyo: "Dar es adoración, y administrar lo que se da es responsabilidad" },
              { frente: "¿Con quiénes enviaba Pablo la ofrenda?", reverso: "Con hermanos de confianza.", apoyo: "y enviaba a hermanos de confianza con ella (2 Corintios 8:16-23)" },
              { frente: "¿Qué hace la iglesia antes de un proyecto?", reverso: "Calcula los costos y ora.", apoyo: "Antes de un proyecto, la iglesia calcula los costos y ora" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué destruye más rápido la confianza en una iglesia?", reverso: "El dinero mal manejado.", apoyo: "Nada destruye tan rápido la confianza en una iglesia como el dinero mal manejado" },
              { frente: "¿Quiénes cuentan las ofrendas, y qué hacen al terminar?", reverso: "Al menos dos personas que no son parientes, y las dos firman el registro.", apoyo: "Las ofrendas las cuentan al menos dos personas que no son parientes, y las dos firman el registro" },
              { frente: "¿Dónde se deposita el dinero de la iglesia?", reverso: "Pronto, en la cuenta de la iglesia, nunca en una cuenta personal.", apoyo: "El dinero se deposita pronto en la cuenta de la iglesia, nunca en una cuenta personal" },
              { frente: "¿De qué protegen los controles a los líderes?", reverso: "De la sospecha.", apoyo: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha" },
              { frente: "¿Qué son las cuentas claras para la iglesia y para el mundo?", reverso: "Un testimonio.", apoyo: "Las cuentas claras son un testimonio para la iglesia y para el mundo" },
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
            consigna: "Pablo organizó la ofrenda para Jerusalén. ¿Cuándo, y según qué, debía cada uno apartar algo? Toca las palabras que lo dicen.",
            texto: "[[Cada primer día de la semana]] cada uno de vosotros ponga aparte algo, [[según haya prosperado]]",
            apoyo: "Pablo organizó la ofrenda para Jerusalén con orden",
            ref: "1 Corintios 16:2",
            explica: "Pablo organizó la ofrenda con orden: «Cada primer día de la semana cada uno de vosotros ponga aparte algo, según haya prosperado». Dar es adoración, y administrar lo que se da es responsabilidad.",
          },
          {
            consigna: "Pablo cuidaba la ofrenda que administraba. ¿Qué quería evitar? Toca las palabras que lo dicen.",
            texto: "evitando que [[nadie nos censure]] en cuanto a esta ofrenda abundante que administramos",
            apoyo: "Pablo cuidaba la ofrenda «evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos»",
            ref: "2 Corintios 8:20",
            explica: "Pablo cuidaba la ofrenda para que nadie pudiera censurarlo, y enviaba a hermanos de confianza con ella (2 Corintios 8:16-23).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se cuentan y se guardan las ofrendas.",
            texto: "Al menos dos personas que no son parientes [[cuentan]] la ofrenda y [[firman]] el registro, y el dinero se [[deposita]] pronto en la cuenta de la iglesia.",
            distractores: ["esconden", "rompen", "gasta"],
            errores: {
              esconden: "Las ofrendas las cuentan al menos dos personas que no son parientes.",
              rompen: "Las dos personas que cuentan la ofrenda firman el registro.",
              gasta: "El dinero se deposita pronto en la cuenta de la iglesia, nunca en una cuenta personal.",
            },
            apoyo: "Las ofrendas las cuentan al menos dos personas que no son parientes, y las dos firman el registro",
            explica: "Las ofrendas las cuentan al menos dos personas que no son parientes, las dos firman el registro, y el dinero se deposita pronto en la cuenta de la iglesia, nunca en una cuenta personal.",
          },
          {
            consigna: "Completa los controles de los gastos y de las cuentas.",
            texto: "Los gastos se aprueban por [[escrito]], se guardan los [[recibos]] y se presenta un [[informe]] financiero periódico a la iglesia o a su consejo.",
            distractores: ["teléfono", "chismes", "rumor"],
            errores: {
              "teléfono": "Los gastos se aprueban por escrito.",
              chismes: "Se guardan los recibos de los gastos.",
              rumor: "Se presenta un informe financiero periódico a la iglesia o a su consejo.",
            },
            apoyo: "Los gastos se aprueban por escrito y se guardan los recibos",
            explica: "Los gastos se aprueban por escrito y se guardan los recibos, se presenta un informe financiero periódico a la iglesia o a su consejo, y una vez al año personas que no manejan el dinero revisan las cuentas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La iglesia necesita un presupuesto aprobado, dos personas que cuentan y firman, depósitos en la cuenta de la iglesia, gastos aprobados con recibos, informes periódicos y una revisión anual",
            titulo: "La ofrenda del domingo",
            relato: [
              "Tu pastor te pide ayudar a ordenar las finanzas de la iglesia. Hasta hoy, el tesorero cuenta solo la ofrenda en su casa y la guarda en su cuenta personal hasta el lunes.",
              "Los gastos se pagan sin recibos, y la iglesia nunca ha visto un informe de sus cuentas.",
              "El tesorero es un hermano fiel, y se ofende: ¿Acaso desconfían de mí?",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo se contará la ofrenda desde ahora?",
                opciones: [
                  { texto: "La cuentan al menos dos personas que no son parientes, y firman.", bien: true, explica: "Las ofrendas las cuentan al menos dos personas que no son parientes, y las dos firman el registro." },
                  { texto: "La sigue contando el tesorero solo, porque es un hermano de confianza.", explica: "Las ofrendas las cuentan al menos dos personas: los controles no son desconfianza." },
                  { texto: "La cuentan el tesorero y su esposa, que conocen bien las cuentas.", explica: "Las dos personas que cuentan no son parientes." },
                ],
                apoyo: "Las ofrendas las cuentan al menos dos personas que no son parientes, y las dos firman el registro",
                explica: "Al menos dos personas que no son parientes cuentan la ofrenda, y las dos firman el registro.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Dónde quedará el dinero de la ofrenda?",
                opciones: [
                  { texto: "Se deposita pronto en la cuenta de la iglesia.", bien: true, explica: "El dinero se deposita pronto en la cuenta de la iglesia." },
                  { texto: "En la cuenta personal del tesorero, hasta el lunes.", explica: "El dinero nunca se deposita en una cuenta personal." },
                  { texto: "En una caja en la casa del tesorero, hasta fin de mes.", explica: "El dinero se deposita pronto en la cuenta de la iglesia." },
                ],
                apoyo: "El dinero se deposita pronto en la cuenta de la iglesia, nunca en una cuenta personal",
                explica: "El dinero se deposita pronto en la cuenta de la iglesia, nunca en una cuenta personal.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al tesorero que se ofende?",
                opciones: [
                  { texto: "Que los controles no son desconfianza: lo protegen a él.", bien: true, explica: "Los controles protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha." },
                  { texto: "Que sí desconfían de él, y que por eso le quitan las cuentas.", explica: "Los controles no son desconfianza." },
                  { texto: "Que tiene razón, y que mejor no cambian nada para no ofenderlo.", explica: "Nada protege tanto la confianza en una iglesia como las cuentas claras." },
                ],
                apoyo: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha",
                explica: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha.",
              },
              {
                tipo: "explica",
                apoyo: "Los gastos se aprueban por escrito y se guardan los recibos",
                clave: {
                  id: "pr-n5-administracion-4-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué otros controles propondrás para los gastos y las cuentas de la iglesia?",
                  ideas: [
                    { id: "gastos", peso: 34, texto: "Que los gastos se aprueben por escrito y se guarden los recibos.", formas: ["por escrito", "recibos", "comprobantes", "facturas"] },
                    { id: "informe", peso: 33, texto: "Que se presente un informe financiero periódico a la iglesia o a su consejo.", formas: ["informe*", "report*", "rend* cuentas", "rind* cuentas"] },
                    { id: "revision", peso: 33, texto: "Que una vez al año personas que no manejan el dinero revisen las cuentas.", formas: ["revis*", "auditor*", "una vez al ano", "cada ano", "que no manejan"] },
                  ],
                  modelo: "Propondré que los gastos se aprueben por escrito y se guarden los recibos, que se presente un informe financiero periódico a la iglesia o a su consejo, y que una vez al año personas que no manejan el dinero revisen las cuentas.",
                },
              },
            ],
          },
          {
            apoyo: "Antes de un proyecto, la iglesia calcula los costos y ora",
            ref: "Lucas 14:28",
            titulo: "Un salón para los niños",
            relato: [
              "Sirves en el consejo de tu iglesia, que quiere construir un salón para los niños. En una reunión, un hermano propone empezar la obra mañana mismo, con lo que haya en la caja.",
              "La iglesia no tiene un presupuesto aprobado para el año.",
              "Otro hermano dice: ¿Para qué tanto papel? Aquí todos somos hermanos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propones antes de empezar la obra?",
                opciones: [
                  { texto: "Calcular primero los costos y orar, como enseña Lucas 14:28.", bien: true, explica: "Jesús preguntó quién, queriendo edificar una torre, no se sienta primero y calcula los gastos: antes de un proyecto, la iglesia calcula los costos y ora." },
                  { texto: "Empezar mañana con lo que haya, y ver después cómo terminarla.", explica: "Antes de un proyecto se calculan los gastos, a ver si se tiene lo que se necesita para acabarlo." },
                  { texto: "Pedir un préstamo grande sin calcular nada, porque Dios proveerá.", explica: "Antes de un proyecto, la iglesia calcula los costos y ora." },
                ],
                apoyo: "Antes de un proyecto, la iglesia calcula los costos y ora",
                explica: "Jesús preguntó: «Porque ¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué control básico le falta a la iglesia para todo el año?",
                opciones: [
                  { texto: "Un presupuesto anual aprobado según los estatutos.", bien: true, explica: "La iglesia necesita un presupuesto anual aprobado según los estatutos." },
                  { texto: "Que el tesorero decida solo cada gasto que haga falta.", explica: "Los gastos se aprueban por escrito, dentro de un presupuesto anual aprobado según los estatutos." },
                  { texto: "Gastar primero y anotar al final del año lo gastado.", explica: "La iglesia necesita un presupuesto anual aprobado según los estatutos." },
                ],
                apoyo: "Un presupuesto anual aprobado según los estatutos",
                explica: "El primer control básico es un presupuesto anual aprobado según los estatutos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al hermano que dice que tanto papel sobra?",
                opciones: [
                  { texto: "Que las cuentas claras protegen a la iglesia y a sus líderes.", bien: true, explica: "Los controles protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha." },
                  { texto: "Que tiene razón: entre hermanos no hacen falta las cuentas claras.", explica: "Nada destruye tan rápido la confianza en una iglesia como el dinero mal manejado." },
                  { texto: "Que los papeles sirven para descubrir quién roba el dinero.", explica: "Los controles no son desconfianza: protegen a la iglesia y a sus líderes." },
                ],
                apoyo: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha",
                explica: "Las cuentas claras son un testimonio para la iglesia y para el mundo, y los controles protegen a todos.",
              },
              {
                tipo: "explica",
                apoyo: "Antes de un proyecto, se calculan los gastos y se ora",
                clave: {
                  id: "pr-n5-administracion-4-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en dos frases qué harán antes de empezar el salón, según Lucas 14:28.",
                  ideas: [
                    { id: "costos", peso: 50, texto: "Sentarse primero a calcular los costos, para ver si se tiene lo necesario para acabarlo.", formas: ["calcul*", "costos", "costo", "cuanto cuesta", "presupuesto", "gastos"] },
                    { id: "orar", peso: 50, texto: "Y orar antes de decidir.", formas: ["orar*", "oracion", "oremos", "oramos", "orando", "ore"] },
                  ],
                  modelo: "Antes de empezar el salón, nos sentaremos a calcular los costos para ver si tenemos lo que necesitamos para acabarlo. Y oraremos juntos como iglesia antes de decidir.",
                },
              },
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
            consigna: "Una de estas frases sobre la transparencia tiene un error. Tócala.",
            frases: [
              "Nada destruye tan rápido la confianza como el dinero mal manejado.",
              "Los controles son una muestra de desconfianza hacia los líderes.",
              "Los controles protegen a la iglesia del error y del robo.",
              "Las cuentas claras son un testimonio para la iglesia y para el mundo.",
            ],
            malo: 1,
            correccion: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y a los líderes de la sospecha.",
            apoyo: "Los controles no son desconfianza",
            explica: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha.",
          },
          {
            consigna: "Una de estas frases sobre cómo cuidaba Pablo la ofrenda tiene un error. Tócala.",
            frases: [
              "Pablo organizó la ofrenda para Jerusalén con orden.",
              "Pablo cuidaba la ofrenda para que nadie pudiera censurarlo.",
              "Pablo llevaba la ofrenda él solo, sin que nadie lo acompañara.",
              "Dar es adoración, y administrar lo que se da es responsabilidad.",
            ],
            malo: 2,
            correccion: "Pablo enviaba a hermanos de confianza con la ofrenda (2 Corintios 8:16-23).",
            apoyo: "y enviaba a hermanos de confianza con ella (2 Corintios 8:16-23)",
            ref: "2 Corintios 8:20-21",
            explica: "Pablo cuidaba la ofrenda «evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos», y enviaba a hermanos de confianza con ella.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha",
            ref: "2 Corintios 8:20-21",
            clave: {
              id: "pr-n5-administracion-4-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué la transparencia en el manejo del dinero protege a la iglesia y a sus líderes?",
              ideas: [
                { id: "iglesia", peso: 50, texto: "Los controles protegen a la iglesia del error y del robo.", formas: ["error*", "robo", "robos"] },
                { id: "lideres", peso: 50, texto: "Y protegen a los líderes de la sospecha.", formas: ["sospech*", "nadie sospech*", "nadie (los|lo|les|le|nos|me) (censure|censuren|acuse|acusen)", "libres de (culpa|acusaciones|dudas)"] },
              ],
              errores: [
                { id: "desconfianza", texto: "Los controles no son desconfianza.", formas: ["controles (son|es) (una|de|por) desconfianza", "porque (desconfiamos|desconfian|desconfia)"], anula: "lideres" },
                { id: "desconfianza-iglesia", texto: "Los controles protegen a la iglesia del error y del robo.", formas: ["controles (son|es) (una|de|por) desconfianza", "porque (desconfiamos|desconfian|desconfia)"], anula: "iglesia" },
              ],
              modelo: "Porque los controles no son desconfianza: protegen a la iglesia del error y del robo, y protegen a los líderes de la sospecha. Las cuentas claras son un testimonio para la iglesia y para el mundo.",
            },
          },
          {
            apoyo: "Una vez al año, personas que no manejan el dinero revisan las cuentas",
            ref: "2 Corintios 8:20-21",
            clave: {
              id: "pr-n5-administracion-4-a6-2",
              tipo: "corta",
              pregunta: "Un tesorero fiel te dice que no necesita que nadie revise sus cuentas, porque nunca ha robado. ¿Qué le respondes?",
              ideas: [
                { id: "proteger", peso: 50, texto: "Que los controles no son desconfianza: también lo protegen a él de la sospecha.", formas: ["no (son|es) desconfianza", "sospech*", "nadie sospech*", "(lo|te|le) proteg*", "proteg* a (el|ti|usted)"] },
                { id: "revision", peso: 50, texto: "Y que la revisión protege a la iglesia del error y del robo, aunque él sea fiel.", formas: ["error*", "del robo", "robos", "una vez al ano", "cada ano", "revision anual"] },
              ],
              errores: [
                { id: "desconfianza", texto: "Los controles no son desconfianza.", formas: ["(controles|revision|revisar) (son|es) (una|de|por) desconfianza", "porque (desconfiamos|desconfian|desconfia)"], anula: "proteger" },
              ],
              modelo: "Le respondo que los controles no son desconfianza: también lo protegen a él de la sospecha. Y que la revisión de las cuentas protege a la iglesia del error y del robo, aunque él sea fiel.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Planificar, organizar y comunicar
    "n5-administracion-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Nehemías cuando el rey le preguntó qué pedía?", reverso: "Oró al Dios de los cielos, y después presentó un pedido claro.", apoyo: "Cuando el rey le preguntó qué pedía, Nehemías dice: «Entonces oré al Dios de los cielos»" },
              { frente: "¿Cuántas metas se fijan para el año, y cómo?", reverso: "Pocas metas claras, con fechas.", apoyo: "Fijar pocas metas claras para el año, con fechas" },
              { frente: "¿Con quién se hacen los planes?", reverso: "Con el consejo del equipo, no a solas.", apoyo: "Los planes se hacen con el consejo del equipo, no a solas" },
              { frente: "Según Proverbios 16:9, ¿qué hace Jehová con el que piensa su camino?", reverso: "Endereza sus pasos: por eso todo plan se hace con humildad.", apoyo: "Y todo plan se hace con humildad" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué empezó Nehemías a reconstruir el muro?", reverso: "Con oración, preguntas y un plan, no con un discurso.", apoyo: "Nehemías no empezó a reconstruir el muro con un discurso, sino con oración, preguntas y un plan" },
              { frente: "¿Qué se evalúa en el ciclo de planificación?", reverso: "Cómo estamos: qué funciona y qué no.", apoyo: "Evaluar cómo estamos: qué funciona y qué no" },
              { frente: "¿Qué guardan las actas de una reunión?", reverso: "Qué se decidió, quién lo hará y para cuándo.", apoyo: "Reuniones con agenda y actas: qué se decidió, quién lo hará y para cuándo" },
              { frente: "¿Para qué libera tiempo un buen plan hecho en oración?", reverso: "Para lo más importante: las personas.", apoyo: "Un buen plan, hecho en oración, libera tiempo para lo más importante: las personas" },
              { frente: "¿Qué pasa con lo que no se comunica?", reverso: "No existe para la iglesia.", apoyo: "Lo que no se comunica, no existe para la iglesia" },
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
            consigna: "Ordena el ciclo de planificación como lo presenta la lección, del primer paso al último.",
            pasos: [
              "Orar y escuchar a Dios juntos",
              "Evaluar cómo estamos: qué funciona y qué no",
              "Fijar pocas metas claras para el año, con fechas",
              "Organizar: responsables, recursos y calendario",
              "Revisar cada cierto tiempo y ajustar",
            ],
            apoyo: "El ciclo es orar, evaluar, fijar pocas metas con fechas, organizar responsables y recursos, y revisar",
            ref: "Nehemías 2:4-5",
            explica: "El ciclo empieza orando y escuchando a Dios juntos; después se evalúa cómo estamos, se fijan pocas metas claras con fechas, se organizan los responsables, los recursos y el calendario, y se revisa cada cierto tiempo para ajustar.",
          },
          {
            consigna: "El equipo de jóvenes planifica su año. Ordena lo que hace, del primer paso al último.",
            pasos: [
              "Se reúnen a orar y escuchar a Dios juntos",
              "Ven qué funcionó el año pasado y qué no",
              "Escogen tres metas claras, cada una con su fecha",
              "Nombran responsables y arman el calendario",
              "A mitad de año revisan cómo van y ajustan",
            ],
            apoyo: "Aplicar un ciclo de planificación: orar, evaluar, fijar metas, organizar y revisar",
            ref: "Proverbios 15:22",
            explica: "Primero oran y escuchan a Dios juntos; después evalúan qué funciona y qué no, fijan pocas metas claras con fechas, organizan responsables, recursos y calendario, y revisan cada cierto tiempo para ajustar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la vida de la iglesia con cómo se organiza, según la lección.",
            pares: [
              ["El calendario anual", "Conocido por todos y con tiempo para preparar cada actividad"],
              ["Los voluntarios", "Invitados personalmente, preparados y agradecidos"],
              ["Las reuniones", "Con agenda y actas: qué se decidió, quién lo hará y para cuándo"],
              ["Los planes", "Se hacen con el consejo del equipo, no a solas"],
            ],
            apoyo: "Reuniones con agenda y actas: qué se decidió, quién lo hará y para cuándo",
            explica: "El calendario anual es conocido por todos y da tiempo para preparar cada actividad; los voluntarios se invitan personalmente, se preparan y se agradecen; las reuniones tienen agenda y actas; y los planes se hacen con el consejo del equipo, no a solas.",
          },
          {
            consigna: "Une cada problema con lo que enseña la lección para resolverlo.",
            pares: [
              ["Nadie sabía la fecha del retiro", "Un calendario anual conocido por todos"],
              ["Faltan voluntarios para el campamento", "Invitarlos personalmente y prepararlos para su tarea"],
              ["La reunión se fue en charlas sin orden", "Una agenda para la reunión"],
              ["Nadie recuerda quién iba a hacer qué", "Un acta: qué se decidió, quién lo hará y para cuándo"],
            ],
            apoyo: "Un calendario anual de la iglesia, conocido por todos y con tiempo para preparar cada actividad",
            explica: "La lección pide un calendario anual conocido por todos, voluntarios invitados personalmente y preparados para su tarea, y reuniones con agenda y actas: qué se decidió, quién lo hará y para cuándo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Planificar también es espiritual: Nehemías oró antes de presentar un plan claro",
            ref: "Nehemías 2:4-5",
            situacion: "Tu pastor te pide organizar con tu equipo el campamento de familias del verano. Faltan cuatro meses y todavía no hay nada decidido.",
            escenas: [
              {
                id: "e1",
                narra: "En la primera reunión del equipo, todos traen ideas al mismo tiempo.",
                pregunta: "¿Cómo empiezas?",
                opciones: [
                  { texto: "Oras con tu equipo, y juntos escuchan a Dios.", valor: 2, explica: "Planificar también es espiritual: el ciclo empieza por orar y escuchar a Dios juntos.", siguiente: "e2" },
                  { texto: "Escoges tú las mejores ideas y se las anuncias al equipo.", valor: 0, explica: "Los planes se hacen con el consejo del equipo, no a solas.", siguiente: "e1b" },
                  { texto: "Repartes las tareas de una vez, para no perder más tiempo.", valor: 1, explica: "Organizar es parte del ciclo, pero primero se ora, se evalúa y se fijan las metas.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "A la semana, dos del equipo dicen que no los escuchaste y que ya no quieren ayudar.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Les pides perdón y hacen el plan juntos, con su consejo.", valor: 2, explica: "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman».", siguiente: "e2" },
                  { texto: "Sigues tú solo: un plan sale mejor sin tantas opiniones de otros.", valor: 0, explica: "Los planes se hacen con el consejo del equipo, no a solas.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya oraron juntos y vieron qué funcionó el año pasado y qué no.",
                pregunta: "¿Qué hacen después?",
                opciones: [
                  { texto: "Fijas con el equipo pocas metas claras, con fechas.", valor: 2, explica: "El ciclo sigue así: fijar pocas metas claras para el año, con fechas." },
                  { texto: "Escribes veinte metas distintas, para que no falte nada.", valor: 0, explica: "El ciclo pide fijar pocas metas claras, con fechas." },
                  { texto: "Fijas metas claras, pero sin ponerles ninguna fecha.", valor: 1, explica: "Las metas claras ayudan, pero el ciclo pide ponerles fechas." },
                ],
              },
              {
                id: "e3",
                narra: "A mitad de camino, notas que una meta no se está cumpliendo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Revisas el plan con el equipo y lo ajustas con humildad.", valor: 2, explica: "El ciclo termina revisando cada cierto tiempo y ajustando; y todo plan se hace con humildad, porque Jehová endereza nuestros pasos." },
                  { texto: "Sigues igual: un plan que ya se aprobó no se cambia nunca.", valor: 0, explica: "El ciclo pide revisar cada cierto tiempo y ajustar." },
                  { texto: "Cancelas el campamento, porque el plan ya fracasó del todo.", valor: 0, explica: "Un plan no se abandona por una meta: se revisa cada cierto tiempo y se ajusta." },
                ],
              },
            ],
          },
          {
            apoyo: "Los planes se hacen con el consejo del equipo, no a solas",
            ref: "Proverbios 15:22",
            situacion: "Eres líder de líderes, y te piden planificar con tu equipo el año del ministerio de jóvenes.",
            escenas: [
              {
                id: "e1",
                narra: "Un líder te dice: No perdamos tiempo orando; ya sé lo que hay que hacer.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que planificar también es espiritual: primero oran juntos.", valor: 2, explica: "Planificar también es espiritual: Nehemías oró antes de presentar un plan claro.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que empiecen ya con la lista de sus ideas.", valor: 0, explica: "Nehemías no empezó con un discurso, sino con oración, preguntas y un plan.", siguiente: "e1b" },
                  { texto: "Que orarán al final, cuando el plan ya esté listo y escrito.", valor: 1, explica: "Orar está bien, pero el ciclo empieza por orar y escuchar a Dios juntos.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El plan sale rápido, pero el resto del equipo no lo siente suyo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a empezar: oran y escuchan el consejo del equipo.", valor: 2, explica: "Los planes se hacen con el consejo del equipo, no a solas.", siguiente: "e2" },
                  { texto: "Lo dejas así: ya está escrito y no queda tiempo para cambiarlo.", valor: 0, explica: "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman».", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya tienen pocas metas claras, cada una con su fecha.",
                pregunta: "¿Qué sigue en el ciclo?",
                opciones: [
                  { texto: "Organizar responsables, recursos y calendario.", valor: 2, explica: "Después de fijar las metas, se organiza: responsables, recursos y calendario." },
                  { texto: "Anunciar las metas y esperar que se cumplan solas.", valor: 0, explica: "Las metas se organizan con responsables, recursos y calendario." },
                  { texto: "Nombrar responsables, pero sin calendario ni recursos.", valor: 1, explica: "Los responsables ayudan, pero organizar también pide recursos y calendario." },
                ],
              },
              {
                id: "e3",
                narra: "Ya en marcha, un líder pregunta cada cuánto mirarán cómo van.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Revisar cada cierto tiempo y ajustar lo que haga falta.", valor: 2, explica: "El ciclo termina así: revisar cada cierto tiempo y ajustar." },
                  { texto: "No revisar nada hasta el año que viene, para no perder tiempo.", valor: 0, explica: "El ciclo pide revisar cada cierto tiempo y ajustar." },
                  { texto: "Revisarlo solo si alguien se queja de que algo va mal.", valor: 1, explica: "Revisar ayuda, pero el ciclo pide hacerlo cada cierto tiempo, no solo cuando hay quejas." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se comunica bien en la iglesia.",
            texto: "Los anuncios deben ser [[claros]] y a [[tiempo]], por los [[medios]] que la gente usa, y las decisiones importantes se explican con sus [[razones]].",
            distractores: ["largos", "ciegas", "chismes", "excusas"],
            errores: {
              largos: "Los anuncios deben ser claros.",
              ciegas: "Los anuncios deben llegar a tiempo.",
              chismes: "Se usan los medios que la gente usa.",
              excusas: "Las decisiones importantes se explican con sus razones.",
            },
            apoyo: "Los anuncios deben ser claros y a tiempo, por los medios que la gente usa, y las decisiones importantes se explican con sus razones",
            explica: "Lo que no se comunica, no existe para la iglesia: los anuncios son claros y a tiempo, por los medios que la gente usa, y las decisiones importantes se explican con sus razones.",
          },
          {
            consigna: "Completa lo que enseña la lección sobre comunicar lo que se decide.",
            texto: "Lo que la iglesia [[decide]] se comunica con [[claridad]], y los anuncios llegan a [[tiempo]] por los medios que la gente usa.",
            distractores: ["olvida", "enojo", "medias"],
            errores: {
              olvida: "Lo que se decide se comunica con claridad.",
              enojo: "Lo que se decide se comunica con claridad.",
              medias: "Los anuncios deben ser claros y a tiempo.",
            },
            apoyo: "lo que se decide se comunica con claridad",
            explica: "Lo que no se comunica, no existe para la iglesia: lo que se decide se comunica con claridad, y los anuncios llegan a tiempo y por los medios que la gente usa.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del consejo te dice: Ya decidimos cambiar el horario del culto. Basta con ponerlo en el tablero; no hace falta explicar por qué.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo anuncien a tiempo, por los medios que la gente usa, y con sus razones.", bien: true, explica: "Los anuncios deben ser claros y a tiempo, por los medios que la gente usa, y las decisiones importantes se explican con sus razones." },
              { texto: "Que está bien: con un aviso en el tablero del templo, todos se van a enterar solos.", explica: "Los anuncios llegan por los medios que la gente usa: lo que no se comunica, no existe para la iglesia." },
              { texto: "Que mejor no lo anuncien, y que cada uno lo descubra por sí mismo el domingo.", explica: "Lo que no se comunica, no existe para la iglesia." },
              { texto: "Que lo anuncien el día del cambio, para que no haya tiempo para quejas.", explica: "Los anuncios deben ser claros y a tiempo, y las decisiones importantes se explican con sus razones." },
            ],
            apoyo: "las decisiones importantes se explican con sus razones",
            explica: "Lo que no se comunica, no existe para la iglesia. Los anuncios deben ser claros y a tiempo, por los medios que la gente usa, y las decisiones importantes se explican con sus razones.",
          },
          {
            caso: "La hermana que prepara los anuncios te dice: Avisé del retiro solo en el boletín impreso, pero casi nadie lo lee, y nadie se inscribió.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que avise a tiempo por los medios que la gente usa, con un mensaje claro.", bien: true, explica: "Los anuncios deben ser claros y a tiempo, por los medios que la gente usa." },
              { texto: "Que no se preocupe: si nadie se inscribió, es que nadie quería ir.", explica: "Lo que no se comunica, no existe para la iglesia: quizá el aviso no les llegó." },
              { texto: "Que repita el aviso en el mismo boletín, aunque casi nadie lo lea nunca.", explica: "Los anuncios van por los medios que la gente usa." },
              { texto: "Que deje de avisar: quien quiera ir al retiro ya preguntará por su cuenta.", explica: "Lo que no se comunica, no existe para la iglesia." },
            ],
            apoyo: "Los anuncios deben ser claros y a tiempo, por los medios que la gente usa",
            explica: "Lo que no se comunica, no existe para la iglesia: los anuncios deben ser claros y a tiempo, por los medios que la gente usa.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un calendario anual de la iglesia, conocido por todos y con tiempo para preparar cada actividad",
            clave: {
              id: "pr-n5-administracion-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo organizarás el calendario, los voluntarios y las reuniones de tu ministerio?",
              ideas: [
                { id: "calendario", peso: 34, texto: "Un calendario anual, conocido por todos y con tiempo para preparar cada actividad.", formas: ["anual", "todo el ano", "conocido por todos", "todos (conozcan|sepan|conocen|saben|vean)", "con tiempo", "de antemano"] },
                { id: "voluntarios", peso: 33, texto: "Voluntarios invitados personalmente, preparados para su tarea y agradecidos.", formas: ["personalmente", "invit* a cada", "uno por uno", "capacit*", "agradec*", "dar* gracias", "voluntarios preparad*", "(los|las) preparar*"] },
                { id: "reuniones", peso: 33, texto: "Reuniones con agenda y actas: qué se decidió, quién lo hará y para cuándo.", formas: ["agenda", "acta*", "quien lo hara", "para cuando", "que se decidio"] },
              ],
              modelo: "Haré un calendario anual que todos conozcan, con tiempo para preparar cada actividad. Invitaré a los voluntarios personalmente, los prepararé y les daré las gracias. Y las reuniones tendrán agenda y actas: qué se decidió, quién lo hará y para cuándo.",
            },
          },
          {
            apoyo: "Reuniones con agenda y actas: qué se decidió, quién lo hará y para cuándo",
            clave: {
              id: "pr-n5-administracion-5-a7-2",
              tipo: "corta",
              pregunta: "Tu equipo terminó una reunión y nadie sabe qué se decidió. ¿Qué debió tener esa reunión, y qué deben decir sus actas?",
              ideas: [
                { id: "agenda", peso: 40, texto: "Una agenda.", formas: ["agenda", "orden del dia", "temas escritos"] },
                { id: "acta", peso: 60, texto: "Un acta con qué se decidió, quién lo hará y para cuándo.", formas: ["quien lo hara", "quien (hace|hara|encarga)", "para cuando", "responsable*", "fecha*", "plazo*"] },
              ],
              modelo: "Esa reunión debió tener una agenda. Y sus actas deben decir qué se decidió, quién lo hará y para cuándo, para que nadie se quede sin saber qué hacer.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Lo legal básico
    "n5-administracion-6": [
      {
        id: "a1",
        objetivo: 1,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo se constituyen muchas iglesias en los Estados Unidos?", reverso: "Como corporación sin fines de lucro.", apoyo: "Muchas iglesias se constituyen como corporación sin fines de lucro" },
              { frente: "En Texas, ¿cómo se forma esa corporación?", reverso: "Presentando un certificado de formación ante la Secretaría de Estado.", apoyo: "En Texas, eso se hace presentando un certificado de formación ante la Secretaría de Estado" },
              { frente: "¿Para qué se usa el EIN que da el IRS?", reverso: "Para las cuentas bancarias y para los empleados.", apoyo: "El número de identificación del empleador (EIN), que da el IRS, se usa para las cuentas bancarias y para los empleados" },
              { frente: "¿Qué guardan las actas de la iglesia?", reverso: "Lo que se decide en sus reuniones.", apoyo: "Los estatutos dicen cómo se gobierna la iglesia, y las actas guardan lo que se decide en sus reuniones" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué necesita un donante para deducir una donación de 250 dólares o más?", reverso: "Un reconocimiento escrito de la iglesia.", apoyo: "Para que un donante pueda deducir una donación de 250 dólares o más, necesita un reconocimiento escrito de la iglesia" },
              { frente: "¿Qué no pueden hacer los fondos de una iglesia exenta?", reverso: "Beneficiar a personas en particular.", apoyo: "Sus fondos no pueden beneficiar a personas en particular" },
              { frente: "En Texas, ¿quién debe reportar la sospecha de abuso de un menor?", reverso: "Toda persona, también los ministros.", apoyo: "En Texas, toda persona debe reportar la sospecha de abuso de un menor, también los ministros" },
              { frente: "¿Qué guía tributaria tiene el IRS para las iglesias?", reverso: "La Publicación 1828.", apoyo: "El IRS tiene una guía tributaria para iglesias y organizaciones religiosas, la Publicación 1828" },
              { frente: "¿Qué dicen los estatutos de la iglesia?", reverso: "Cómo se gobierna la iglesia.", apoyo: "Los estatutos dicen cómo se gobierna la iglesia" },
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
            consigna: "¿Qué enseñó Jesús que se da a César, y qué a Dios? Toca las palabras que lo dicen.",
            texto: "Dad, pues, a César [[lo que es de César]], y a Dios [[lo que es de Dios]]",
            apoyo: "La iglesia obedece las leyes del país mientras no la obliguen a desobedecer a Dios (Hechos 5:29)",
            ref: "Mateo 22:21",
            explica: "Jesús enseñó: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios». La iglesia obedece las leyes del país mientras no la obliguen a desobedecer a Dios.",
          },
          {
            consigna: "Pablo le pide a Tito que les recuerde algo a los creyentes. ¿A quiénes deben sujetarse? Toca las palabras que lo dicen.",
            texto: "Recuérdales que se sujeten a los [[gobernantes]] y [[autoridades]], que obedezcan, que estén dispuestos a toda buena obra",
            apoyo: "Pablo pide: «Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan, que estén dispuestos a toda buena obra»",
            ref: "Tito 3:1",
            explica: "Pablo pide que se sujeten a los gobernantes y autoridades, que obedezcan y que estén dispuestos a toda buena obra: obedecer las leyes también es parte del testimonio de la iglesia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada paso legal con lo que dice la lección.",
            pares: [
              ["El certificado de formación", "Se presenta en Texas ante la Secretaría de Estado"],
              ["Los estatutos", "Dicen cómo se gobierna la iglesia"],
              ["Las actas", "Guardan lo que se decide en las reuniones"],
              ["El EIN", "Lo da el IRS, para las cuentas bancarias y los empleados"],
              ["La sección 501(c)(3)", "La exención de impuestos de las iglesias que cumplen sus requisitos"],
            ],
            apoyo: "Los estatutos dicen cómo se gobierna la iglesia, y las actas guardan lo que se decide en sus reuniones",
            explica: "En Texas, la corporación se forma con un certificado de formación ante la Secretaría de Estado; los estatutos dicen cómo se gobierna la iglesia y las actas guardan lo que se decide; el EIN lo da el IRS; y las iglesias que cumplen la sección 501(c)(3) se consideran exentas.",
          },
          {
            consigna: "Une cada situación con lo que pide la lección.",
            pares: [
              ["Un donante da 300 dólares y quiere deducirlos", "Un reconocimiento escrito de la iglesia"],
              ["La iglesia contrata a un empleado", "Cumplir con los impuestos sobre la nómina"],
              ["Se sospecha el abuso de un menor", "Reportarlo: en Texas, toda persona debe hacerlo"],
              ["La iglesia alquila un local para sus actividades", "Seguros adecuados y contratos claros"],
              ["El consejo toma una decisión en su reunión", "Guardarla en las actas"],
            ],
            apoyo: "La iglesia necesita seguros adecuados y contratos claros para su propiedad y sus actividades",
            explica: "Para deducir 250 dólares o más hace falta un reconocimiento escrito; con empleados se cumple con la nómina; en Texas toda persona debe reportar la sospecha de abuso de un menor; la propiedad y las actividades piden seguros y contratos claros; y lo que se decide en las reuniones se guarda en las actas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo legal básico en los Estados Unidos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las iglesias que cumplen la sección 501(c)(3) se consideran exentas sin tener que pedirlo.", verdad: true, explica: "Se consideran exentas de impuestos sin tener que pedirlo, aunque muchas piden la carta que lo reconoce.", apoyo: "Las iglesias que cumplen los requisitos de la sección 501(c)(3) se consideran exentas de impuestos sin tener que pedirlo" },
              { texto: "Los fondos de una iglesia exenta pueden beneficiar a una persona en particular.", verdad: false, explica: "Sus fondos no pueden beneficiar a personas en particular.", apoyo: "Sus fondos no pueden beneficiar a personas en particular" },
              { texto: "En Texas, los ministros no tienen que reportar la sospecha de abuso de un menor.", verdad: false, explica: "En Texas, toda persona debe reportar la sospecha de abuso de un menor, también los ministros.", apoyo: "En Texas, toda persona debe reportar la sospecha de abuso de un menor, también los ministros" },
            ],
          },
          {
            consigna: "Sobre los trámites y las obligaciones de la iglesia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El EIN lo da el IRS, y se usa para las cuentas bancarias y para los empleados.", verdad: true, explica: "Así lo dice la lección: el número de identificación del empleador se usa para las cuentas bancarias y para los empleados.", apoyo: "El número de identificación del empleador (EIN), que da el IRS, se usa para las cuentas bancarias y para los empleados" },
              { texto: "Un donante puede deducir 250 dólares o más sin ningún reconocimiento de la iglesia.", verdad: false, explica: "Para deducir una donación de 250 dólares o más, el donante necesita un reconocimiento escrito de la iglesia.", apoyo: "Para que un donante pueda deducir una donación de 250 dólares o más, necesita un reconocimiento escrito de la iglesia" },
              { texto: "Si la iglesia tiene empleados, debe cumplir con los impuestos sobre la nómina.", verdad: true, explica: "Y la situación de los ministros tiene reglas especiales.", apoyo: "Si la iglesia tiene empleados, debe cumplir con los impuestos sobre la nómina" },
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
            apoyo: "Las leyes cambian y cada caso es distinto: para los trámites y las dudas, consulte a un abogado o a un contador con experiencia en iglesias",
            titulo: "Una iglesia que empieza en Texas",
            relato: [
              "Ayudas a un pastor que plantó una iglesia en Texas. Ya se reúnen cuarenta personas, pero la iglesia todavía no ha hecho ningún trámite.",
              "El pastor quiere constituir la iglesia, dar recibos a los que ofrendan y empezar a recibir un sueldo de la iglesia.",
              "Un amigo le dice: Copia los papeles de otra iglesia y listo; no gastes en abogados ni en contadores.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo se constituye en Texas una iglesia como corporación sin fines de lucro?",
                opciones: [
                  { texto: "Presentando un certificado de formación ante la Secretaría de Estado.", bien: true, explica: "En Texas, eso se hace presentando un certificado de formación ante la Secretaría de Estado." },
                  { texto: "Pidiendo al IRS el EIN, porque con ese número la iglesia ya queda constituida.", explica: "El EIN se usa para las cuentas bancarias y para los empleados: la corporación se forma con el certificado de formación." },
                  { texto: "Escribiendo unos estatutos en casa, sin presentar nada ante el estado.", explica: "Los estatutos dicen cómo se gobierna la iglesia, pero en Texas la corporación se forma presentando un certificado de formación." },
                ],
                apoyo: "En Texas, eso se hace presentando un certificado de formación ante la Secretaría de Estado",
                explica: "Muchas iglesias se constituyen como corporación sin fines de lucro; en Texas, eso se hace presentando un certificado de formación ante la Secretaría de Estado.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano ofrendó 500 dólares y quiere deducirlos. ¿Qué necesita de la iglesia?",
                opciones: [
                  { texto: "Un reconocimiento escrito de la iglesia por su donación.", bien: true, explica: "Para deducir una donación de 250 dólares o más, el donante necesita un reconocimiento escrito de la iglesia." },
                  { texto: "Nada: una donación a la iglesia se deduce sin ningún papel.", explica: "Para deducir 250 dólares o más hace falta un reconocimiento escrito de la iglesia." },
                  { texto: "Una carta del pastor que diga que es un buen miembro.", explica: "Lo que necesita es un reconocimiento escrito de su donación." },
                ],
                apoyo: "Para que un donante pueda deducir una donación de 250 dólares o más, necesita un reconocimiento escrito de la iglesia",
                explica: "Para que un donante pueda deducir una donación de 250 dólares o más, necesita un reconocimiento escrito de la iglesia.",
              },
              {
                tipo: "situacion",
                pregunta: "El pastor no sabe cómo tratar en sus impuestos el sueldo que recibirá. ¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que consulte a un contador: los ministros tienen reglas especiales.", bien: true, explica: "La situación de los ministros tiene reglas especiales, y para las dudas se consulta a un contador con experiencia en iglesias." },
                  { texto: "Que lo trate como un empleado cualquiera, porque las reglas son iguales para todos.", explica: "La situación de los ministros tiene reglas especiales." },
                  { texto: "Que no declare nada, porque el dinero de una iglesia nunca paga impuestos.", explica: "Si la iglesia tiene empleados, debe cumplir con los impuestos sobre la nómina, y los ministros tienen reglas especiales." },
                ],
                apoyo: "la situación de los ministros tiene reglas especiales",
                explica: "La situación de los ministros tiene reglas especiales: para los trámites y las dudas, se consulta a un abogado o a un contador con experiencia en iglesias.",
              },
              {
                tipo: "explica",
                apoyo: "Para los casos concretos se consulta a un abogado o a un contador",
                clave: {
                  id: "pr-n5-administracion-6-a5-1",
                  tipo: "corta",
                  pregunta: "Su amigo le dijo que copiara los papeles de otra iglesia. ¿Qué le aconsejas para los trámites y las dudas, y por qué?",
                  ideas: [
                    { id: "consulta", peso: 60, texto: "Que consulte a un abogado o a un contador con experiencia en iglesias.", formas: ["abogado*", "contador*", "profesional*", "experto*", "experiencia en iglesias"] },
                    { id: "razon", peso: 40, texto: "Porque las leyes cambian y cada caso es distinto.", formas: ["cambi*", "cada caso", "distint*", "diferente*", "guia general"] },
                  ],
                  errores: [
                    { id: "copiar", texto: "Cada caso es distinto: para los trámites y las dudas se consulta a un abogado o a un contador.", formas: ["copi* (los|sus) papeles y listo", "basta copiar", "no hace falta (un|ningun) (abogado|contador|profesional)", "no necesita (un|ningun) (abogado|contador|profesional)"], anula: "consulta" },
                  ],
                  modelo: "Le aconsejo no copiar los papeles: para los trámites y las dudas, que consulte a un abogado o a un contador con experiencia en iglesias, porque las leyes cambian y cada caso es distinto.",
                },
              },
            ],
          },
          {
            apoyo: "La iglesia necesita seguros adecuados y contratos claros para su propiedad y sus actividades",
            titulo: "El local y el campamento",
            relato: [
              "Sirves en el consejo de tu iglesia en Texas. La iglesia va a alquilar un local y prepara un campamento de jóvenes para el verano.",
              "El dueño del local ofrece un trato de palabra, sin nada escrito, y nadie sabe si el seguro de la iglesia cubre el campamento.",
              "Además, un miembro propone pagar con fondos de la iglesia las vacaciones de la familia del tesorero.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hace falta para el local y para el campamento?",
                opciones: [
                  { texto: "Contratos claros y seguros adecuados para el local y el campamento.", bien: true, explica: "La iglesia necesita seguros adecuados y contratos claros para su propiedad y sus actividades." },
                  { texto: "Confiar en la palabra del dueño: entre hermanos no hacen falta papeles.", explica: "La iglesia necesita contratos claros para su propiedad y sus actividades." },
                  { texto: "Hacer el campamento sin ningún seguro, porque Dios cuida a los jóvenes.", explica: "La iglesia necesita seguros adecuados para sus actividades." },
                ],
                apoyo: "La iglesia necesita seguros adecuados y contratos claros para su propiedad y sus actividades",
                explica: "La iglesia necesita seguros adecuados y contratos claros para su propiedad y sus actividades.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué respondes a la idea de pagar con fondos de la iglesia las vacaciones de la familia del tesorero?",
                opciones: [
                  { texto: "Que los fondos no pueden beneficiar a personas en particular.", bien: true, explica: "Los fondos de las iglesias exentas según la sección 501(c)(3) no pueden beneficiar a personas en particular." },
                  { texto: "Que está bien, porque el tesorero trabaja mucho y se lo merece.", explica: "Sus fondos no pueden beneficiar a personas en particular." },
                  { texto: "Que se puede, siempre que la familia del tesorero sea miembro.", explica: "Sus fondos no pueden beneficiar a personas en particular, aunque sean miembros." },
                ],
                apoyo: "Sus fondos no pueden beneficiar a personas en particular",
                explica: "Las iglesias que cumplen los requisitos de la sección 501(c)(3) se consideran exentas, y sus fondos no pueden beneficiar a personas en particular.",
              },
              {
                tipo: "situacion",
                pregunta: "Hay dudas sobre el contrato y sobre lo que cubre el seguro. ¿Qué haces?",
                opciones: [
                  { texto: "Consultar a un abogado con experiencia en iglesias.", bien: true, explica: "Para los trámites y las dudas, se consulta a un abogado o a un contador con experiencia en iglesias." },
                  { texto: "Firmar ya y leer el contrato después, cuando haya tiempo.", explica: "Para las dudas se consulta a un abogado antes, no después." },
                  { texto: "Buscar en internet y seguir la primera respuesta que salga.", explica: "Cada caso es distinto: para las dudas se consulta a un abogado o a un contador con experiencia en iglesias." },
                ],
                apoyo: "para los trámites y las dudas, consulte a un abogado o a un contador con experiencia en iglesias",
                explica: "Esta lección es una guía general: para los trámites y las dudas, se consulta a un abogado o a un contador con experiencia en iglesias.",
              },
              {
                tipo: "explica",
                apoyo: "Esta lección es una guía general, no un consejo legal ni contable",
                clave: {
                  id: "pr-n5-administracion-6-a5-2",
                  tipo: "corta",
                  pregunta: "¿Por qué esta lección no reemplaza el consejo de un abogado o de un contador?",
                  ideas: [
                    { id: "guia", peso: 50, texto: "Porque es una guía general, no un consejo legal ni contable.", formas: ["guia", "orient*", "general", "no es un consejo", "no es consejo", "consejo legal", "consejo contable"] },
                    { id: "cambian", peso: 50, texto: "Porque las leyes cambian y cada caso es distinto.", formas: ["cambi*", "cada caso", "distint*", "diferente*"] },
                  ],
                  modelo: "Porque la lección es una guía general, no un consejo legal ni contable. Las leyes cambian y cada caso es distinto: por eso se consulta a un abogado o a un contador con experiencia en iglesias.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La iglesia obedece las leyes del país mientras no la obliguen a desobedecer a Dios (Hechos 5:29)",
            ref: "Mateo 22:21",
            clave: {
              id: "pr-n5-administracion-6-a6-1",
              tipo: "corta",
              pregunta: "¿Cuál es la responsabilidad de la iglesia ante las leyes del país, y hasta dónde llega?",
              ideas: [
                { id: "obedece", peso: 50, texto: "La iglesia da a César lo que es de César: obedece las leyes del país.", formas: ["obedec*", "cumpl* (las|la) (leyes|ley)", "a cesar", "sujet*", "someter*", "respet* (las|la) (leyes|ley)"] },
                { id: "limite", peso: 50, texto: "Mientras no la obliguen a desobedecer a Dios (Hechos 5:29).", formas: ["desobedec* a dios", "mientras no", "obedecer a dios", "obedece antes a dios", "hechos 5", "contra dios", "contra la palabra", "voluntad de dios", "excepto", "salvo cuando", "menos cuando", "pecar"] },
              ],
              modelo: "La iglesia da a César lo que es de César y a Dios lo que es de Dios: obedece las leyes del país mientras no la obliguen a desobedecer a Dios, como en Hechos 5:29.",
            },
          },
          {
            apoyo: "La iglesia es del Señor, pero vive en un país con leyes. Obedecerlas también es parte de su testimonio",
            ref: "Mateo 22:21; Tito 3:1",
            clave: {
              id: "pr-n5-administracion-6-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la iglesia es del Señor y que por eso no tiene que cumplir las leyes del país. ¿Qué le respondes?",
              ideas: [
                { id: "obedece", peso: 40, texto: "Que la iglesia obedece las leyes del país: Jesús enseñó a dar a César lo que es de César.", formas: ["obedec*", "a cesar", "sujet*", "someter*", "respet* (las|la) (leyes|ley)", "cumpl* (las|la) (leyes|ley)"] },
                { id: "limite", peso: 30, texto: "Mientras no la obliguen a desobedecer a Dios.", formas: ["desobedec* a dios", "mientras no", "obedecer a dios", "obedece antes a dios", "hechos 5", "contra dios", "contra la palabra", "voluntad de dios", "excepto", "salvo cuando", "menos cuando", "pecar"] },
                { id: "testimonio", peso: 30, texto: "Obedecerlas también es parte de su testimonio.", formas: ["testimonio"] },
              ],
              errores: [
                { id: "no-cumplir", texto: "La iglesia obedece las leyes del país mientras no la obliguen a desobedecer a Dios.", formas: ["tiene razon", "no tiene que cumplir", "no debe cumplir", "no necesita cumplir"], anula: "obedece" },
              ],
              modelo: "Le respondo que la iglesia es del Señor, pero vive en un país con leyes: da a César lo que es de César y obedece las leyes mientras no la obliguen a desobedecer a Dios. Obedecerlas también es parte de su testimonio.",
            },
          },
        ],
      },
    ],
  },
};
