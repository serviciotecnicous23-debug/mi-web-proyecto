/**
 * Las prácticas de la materia `ninez-4` (especialidad «Niñez»), «Protección de menores». Hechas solo con lo que dice cada
 * lección (server/academia/contenido/ninez-4.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia práctica: las buenas opciones son las normas que da la lección (la política escrita, la selección de los
 * voluntarios, la regla de los dos adultos, el registro con etiquetas, qué hacer cuando un niño cuenta algo, lo que no se
 * hace y el cuidado de después). Lo que pide la ley en Texas va como lo dice la lección, que es una guía general y no un
 * consejo legal: toda persona con causa razonable lo reporta de inmediato, y los profesionales, a más tardar 24 horas
 * después; ninguna actividad da otro plazo. Sin detalles crudos: el abuso se nombra con las palabras de la lección, y la
 * historia de Tamar se practica con lo que salió mal en la casa de David. No se repiten las actividades de «Cuidado y
 * consejería básica» (Nivel 3), «Ética cristiana y ministerial» (Nivel 4) ni de «Ministerio pastoral», que tocan el tema.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_NINEZ_4: PracticasMateria = {
  materia: "ninez-4",
  mision: {
    titulo: "Una iglesia segura para los pequeños",
    intro:
      "Tu pastor te pidió que ayudes a la iglesia a escribir su política de protección de menores y a ponerla en práctica cada domingo. Te van a preguntar por qué la iglesia protege a los niños, cómo se reconocen el abuso y sus señales, cómo se elige y se capacita a cada voluntario, qué reglas se cumplen en cada sala, qué hacer cuando un niño cuenta algo y lo que pide la ley en Texas, y cómo acompañar después al niño y a su familia. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes ayudar a tu iglesia a amar a los pequeños como los ama Jesús: con una política escrita, voluntarios seleccionados, reglas que llenan de luz cada domingo, un reporte de inmediato cuando hay causa razonable para creer que un niño sufre, y un acompañamiento paciente después. Reportar es el primer paso, no el último.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Por qué la iglesia protege a los niños
    "ninez-4-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué lleva cada niño, según Génesis 1:27?", reverso: "La imagen de Dios.", apoyo: "Cada niño lleva la imagen de Dios" },
              { frente: "¿De qué no depende el valor de un niño?", reverso: "De su edad ni de lo que pueda hacer.", apoyo: "Su valor no depende de su edad ni de lo que pueda hacer" },
              { frente: "¿Contra quién es una ofensa dañar a un niño?", reverso: "Contra el niño y contra su Creador.", apoyo: "Por eso dañar a un niño es una ofensa contra él y contra su Creador" },
              { frente: "¿Cómo habló Jesús de quien hace tropezar a uno de estos pequeños?", reverso: "Con mucha seriedad: pocas advertencias del Señor son tan fuertes.", apoyo: "Pocas advertencias del Señor son tan fuertes" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué no es la voluntad del Padre, según Mateo 18:14?", reverso: "Que se pierda uno de estos pequeños.", apoyo: "Y el Padre no quiere perder a ninguno" },
              { frente: "¿Qué le pide Dios a su pueblo en el Salmo 82?", reverso: "Que defienda al débil y al huérfano.", apoyo: "Dios le pide a su pueblo: «Defended al débil y al huérfano; Haced justicia al afligido y al menesteroso»" },
              { frente: "¿Por qué los niños están entre los más débiles de la iglesia?", reverso: "No pueden defenderse solos, y muchas veces no saben contar lo que les pasa.", apoyo: "Los niños están entre los más débiles de la iglesia: no pueden defenderse solos, y muchas veces no saben contar lo que les pasa" },
              { frente: "Proteger a los niños, ¿es desconfiar de los hermanos?", reverso: "No: es amar a los pequeños como los ama Jesús.", apoyo: "Proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños como los ama Jesús" },
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
            consigna: "Según Jesús, ¿qué no es la voluntad del Padre que está en los cielos? Toca las palabras que lo dicen.",
            texto: "no es la voluntad de vuestro Padre que está en los cielos, que [[se pierda uno de estos pequeños]]",
            apoyo: "Cuidar a los niños es parte de esa voluntad",
            ref: "Mateo 18:14",
            explica: "El Padre no quiere perder a ninguno: no es su voluntad que se pierda uno de estos pequeños. Cuidar a los niños es parte de esa voluntad.",
          },
          {
            consigna: "En el Salmo 82, Dios le pide algo a su pueblo. ¿A quiénes manda defender? Toca las palabras que lo dicen.",
            texto: "Defended al [[débil]] y al [[huérfano]]; Haced justicia al afligido y al menesteroso",
            apoyo: "Los niños están entre los más débiles de la iglesia",
            ref: "Salmos 82:3-4",
            explica: "Dios le pide a su pueblo: «Defended al débil y al huérfano». Los niños están entre los más débiles de la iglesia: no pueden defenderse solos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un mito o es la realidad sobre el abuso en las iglesias? Lleva cada frase a su grupo.",
            grupos: ["Es un mito", "Es la realidad"],
            frases: [
              { texto: "Eso no pasa en nuestra iglesia", grupo: 0 },
              { texto: "El abusador es un desconocido", grupo: 0 },
              { texto: "A un abusador se le nota", grupo: 0 },
              { texto: "Si pasara algo, el niño lo contaría", grupo: 0 },
              { texto: "El abuso también ha ocurrido en iglesias", grupo: 1 },
              { texto: "La mayoría de las veces, el abusador es alguien conocido", grupo: 1 },
              { texto: "Muchas veces el abusador es amable y respetado", grupo: 1 },
              { texto: "Muchos niños nunca cuentan lo que les pasa", grupo: 1 },
            ],
            apoyo: "Mito: eso no pasa en nuestra iglesia. Realidad: el abuso también ha ocurrido en iglesias",
            explica: "Son mitos pensar que eso no pasa en la iglesia, que el abusador es un desconocido, que se le nota o que el niño lo contaría. La realidad es que ha ocurrido en iglesias, la mayoría de las veces por alguien conocido y de confianza, muchas veces amable y respetado, y que muchos niños nunca lo cuentan.",
          },
          {
            consigna: "¿Es un mito o es lo que de verdad pasa? Lleva cada frase a su grupo.",
            grupos: ["Es un mito", "Es la realidad"],
            frases: [
              { texto: "Las reglas ofenden a los buenos voluntarios", grupo: 0 },
              { texto: "Quien daña a un niño es siempre un extraño", grupo: 0 },
              { texto: "Un abusador se reconoce a simple vista", grupo: 0 },
              { texto: "Un niño que sufre siempre lo cuenta", grupo: 0 },
              { texto: "El buen voluntario agradece las reglas", grupo: 1 },
              { texto: "Quien quiere dañar busca mucha confianza y pocas reglas", grupo: 1 },
              { texto: "Muchos niños callan por miedo, vergüenza o amenazas", grupo: 1 },
              { texto: "El abusador puede ser alguien servicial", grupo: 1 },
            ],
            apoyo: "Realidad: el buen voluntario las agradece, porque cuidan a los niños y también lo cuidan a él de una acusación falsa",
            explica: "El buen voluntario agradece las reglas, porque cuidan a los niños y también lo cuidan a él. Quien quiere dañar a un niño busca mucha confianza y pocas reglas, muchas veces es alguien amable y servicial, y muchos niños nunca lo cuentan.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un diácono de tu iglesia te dice: No hacen falta tantas reglas con los niños; aquí todos nos conocemos y nunca ha pasado nada.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que ha pasado en iglesias, la mayoría de las veces por alguien conocido.", bien: true, explica: "Es la realidad: el abuso también ha ocurrido en iglesias, y la mayoría de las veces es alguien que el niño conoce y en quien confía." },
              { texto: "Que tiene razón: donde todos se conocen, los niños ya están seguros.", explica: "Es un mito: quien quiere dañar a un niño busca los lugares donde hay mucha confianza y pocas reglas." },
              { texto: "Que basta con vigilar a los visitantes, porque el abusador es un extraño.", explica: "Es un mito: la mayoría de las veces el abusador es alguien que el niño conoce y en quien confía." },
              { texto: "Que si algo pasara, los niños se lo contarían enseguida a sus maestros.", explica: "Es un mito: muchos niños nunca lo cuentan, por miedo, por vergüenza o porque los amenazaron." },
            ],
            apoyo: "quien quiere dañar a un niño busca los lugares donde hay mucha confianza y pocas reglas",
            explica: "El abuso también ha ocurrido en iglesias, casi siempre donde nadie lo esperaba: quien quiere dañar a un niño busca los lugares donde hay mucha confianza y pocas reglas.",
          },
          {
            caso: "Una maestra nueva te dice: Si a un niño de mi clase le pasara algo malo, seguro que me lo contaría.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que muchos niños nunca lo cuentan, por miedo, vergüenza o amenazas.", bien: true, explica: "Es la realidad: muchos niños nunca lo cuentan, por miedo, por vergüenza o porque los amenazaron." },
              { texto: "Que tiene razón: un niño siempre le cuenta a su maestra lo que le pasa.", explica: "Es un mito: muchos niños nunca lo cuentan, y muchas veces no saben contar lo que les pasa." },
              { texto: "Que no se preocupe, porque a un abusador se le nota enseguida en la iglesia.", explica: "Es un mito: muchas veces el abusador es amable, servicial y respetado." },
              { texto: "Que eso solo pasa afuera, y que en la iglesia no hace falta estar atenta.", explica: "Es un mito: el abuso también ha ocurrido en iglesias." },
            ],
            apoyo: "Realidad: muchos niños nunca lo cuentan, por miedo, por vergüenza o porque los amenazaron",
            explica: "Muchos niños nunca cuentan lo que les pasa, y muchas veces no saben contarlo. Por eso la iglesia no deja la protección a la buena voluntad de cada uno.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Una iglesia que no tiene política da su primer paso. Ordena lo que hace, del primer paso al último.",
            pasos: [
              "Decidir: el pastor y el coordinador acuerdan tener una política escrita",
              "Formar un equipo: un maestro con experiencia, un padre y otro hermano",
              "Mirar lo que ya se hace: cómo se recibe a los niños y quién está en cada sala",
              "Buscar modelos: el protocolo de una alianza o el manual de otra iglesia",
              "Escribir la política, y que el liderazgo la apruebe",
              "Enseñarla a maestros y padres, y fijar una fecha para revisarla",
            ],
            apoyo: "Ejemplo resuelto: el primer paso de una iglesia que no tiene política",
            explica: "Primero se decide tener una política escrita y se forma un equipo; después se mira lo que ya se hace y se buscan modelos; luego se escribe y el liderazgo la aprueba; y al final se enseña a maestros y padres, con una fecha para revisarla cada año.",
          },
          {
            consigna: "Ordena cómo una iglesia arma su política de protección, del primer paso al último.",
            pasos: [
              "Se decide tener una política escrita, aunque nunca haya pasado nada",
              "Se invita a un equipo, mejor con alguien que trabaje con niños",
              "Se anota cómo se recibe a los niños y qué pasa a la salida",
              "Se lee el manual de otra iglesia, en lugar de empezar de cero",
              "Se redacta la política, y el liderazgo la aprueba",
              "Se presenta a todos los maestros y a los padres",
            ],
            apoyo: "Paso 4, buscar modelos: leen el protocolo de una alianza evangélica o el manual de otra iglesia, en lugar de empezar de cero",
            explica: "La iglesia decide tener una política aunque nunca haya pasado nada, forma un equipo, mira lo que ya se hace, busca modelos en lugar de empezar de cero, la escribe y la aprueba, y la enseña a todos los maestros y a los padres.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es una política de protección.",
            texto: "Una política de protección es un documento [[escrito]], que dice quién puede servir con niños, cómo se los cuida cada [[domingo]] y qué se hace si alguien [[sospecha]] algo.",
            distractores: ["privado", "mes", "olvida"],
            errores: {
              privado: "La política es un documento escrito, y se les enseña a todos los maestros y a los padres.",
              mes: "La política dice cómo se cuida a los niños cada domingo.",
              olvida: "La política dice qué se hace si alguien sospecha algo.",
            },
            apoyo: "Tiene una política de protección escrita: un documento que dice quién puede servir con niños, cómo se los cuida cada domingo y qué se hace si alguien sospecha algo",
            explica: "La política de protección es un documento escrito: dice quién puede servir con niños, cómo se los cuida cada domingo y qué se hace si alguien sospecha algo. Así la protección no queda a la buena voluntad de cada uno.",
          },
          {
            consigna: "Completa lo que dice la nota para el líder sobre la política.",
            texto: "Una política se escribe antes, como se pone un [[extintor]] antes del [[incendio]], y se [[revisa]] una vez al año con el pastor y los maestros.",
            distractores: ["letrero", "almuerzo", "esconde"],
            errores: {
              letrero: "La lección la compara con un extintor, que se pone antes del incendio.",
              almuerzo: "Como el extintor, la política se pone antes del incendio: antes de que pase algo.",
              esconde: "La política se revisa una vez al año con el pastor y los maestros.",
            },
            apoyo: "Se escribe antes, como se pone un extintor antes del incendio",
            explica: "Una iglesia no necesita haber tenido un caso para tener una política: se escribe antes, como se pone un extintor antes del incendio, y se revisa una vez al año con el pastor y los maestros.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Cada niño lleva la imagen de Dios",
            ref: "Mateo 18:6",
            clave: {
              id: "pr-ninez-4-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué proteger a los niños es parte del amor de Dios y de la tarea de la iglesia?",
              ideas: [
                { id: "imagen", peso: 35, texto: "Cada niño lleva la imagen de Dios: su valor no depende de su edad, y dañarlo es una ofensa contra su Creador.", formas: ["imagen de dios", "su imagen", "a imagen", "su valor", "valor no depende", "ofensa contra", "su creador", "el creador"] },
                { id: "jesus", peso: 35, texto: "Jesús advirtió con mucha seriedad contra quien hace tropezar a uno de estos pequeños, y el Padre no quiere que se pierda ninguno.", formas: ["tropez*", "tropiez*", "advirti*", "advierte", "advertencia*", "piedra de molino", "no quiere que se pierda", "no quiere perder", "voluntad del padre", "voluntad de dios"] },
                { id: "debil", peso: 30, texto: "Dios pide a su pueblo defender al débil, y los niños están entre los más débiles: no pueden defenderse solos.", formas: ["al debil", "los debiles", "mas debiles", "el debil", "defender al", "defiende al", "defenderlos", "no pueden defenderse", "no saben defenderse", "no se pueden defender", "defenderse solos", "defenderse", "indefens*"] },
              ],
              modelo: "Porque cada niño lleva la imagen de Dios y su valor no depende de su edad. Jesús advirtió con mucha seriedad contra quien hace tropezar a un pequeño, y el Padre no quiere que se pierda ninguno. Además, Dios pide a su pueblo defender al débil.",
            },
          },
          {
            apoyo: "Proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños como los ama Jesús",
            ref: "Mateo 18:14",
            clave: {
              id: "pr-ninez-4-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que proteger a los niños es desconfiar de los hermanos. ¿Qué le respondes, según la lección?",
              ideas: [
                { id: "amar", peso: 40, negativa: true, texto: "Proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños como los ama Jesús.", formas: ["amar a los (pequenos|ninos)", "es amar", "es amor", "como los ama", "los ama jesus", "jesus (los|nos) ama", "amarlos"] },
                { id: "imagen", peso: 30, texto: "Cada niño lleva la imagen de Dios: su valor no depende de su edad.", formas: ["imagen de dios", "su imagen", "a imagen", "su valor", "valor no depende", "su creador"] },
                { id: "debil", peso: 30, texto: "Los niños están entre los más débiles: no pueden defenderse solos, y Dios pide defender al débil.", formas: ["al debil", "los debiles", "mas debiles", "el debil", "no pueden defenderse", "no saben defenderse", "no se pueden defender", "defenderse solos", "defenderse", "defender al", "defiende al", "defenderlos", "no saben contar", "indefens*"] },
              ],
              errores: [
                { id: "desconfiar", texto: "Proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños.", formas: ["proteger (es|significa) desconfiar", "si es desconfiar", "tiene razon"], anula: "amar" },
              ],
              modelo: "Le respondo que proteger a los niños no es desconfiar de los hermanos: es amar a los pequeños como los ama Jesús. Cada niño lleva la imagen de Dios, y los niños están entre los más débiles de la iglesia: no pueden defenderse solos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Las formas y las señales del abuso
    "ninez-4-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el abuso físico?", reverso: "Golpes o daños en el cuerpo del niño que no son accidentes.", apoyo: "El abuso físico: golpes o daños en el cuerpo del niño que no son accidentes" },
              { frente: "¿Qué es el abuso emocional?", reverso: "Humillar, amenazar, rechazar o aterrorizar al niño de manera constante.", apoyo: "El abuso emocional: humillar, amenazar, rechazar o aterrorizar al niño de manera constante" },
              { frente: "¿Qué es la negligencia?", reverso: "No darle al niño lo que necesita para vivir y estar seguro.", apoyo: "La negligencia: no darle al niño lo que necesita para vivir y estar seguro" },
              { frente: "¿Qué debe saber el maestro, aunque no sea un investigador?", reverso: "Qué es el abuso, cómo se nota y cómo actúa quien quiere dañar a un niño.", apoyo: "El maestro no es un investigador, pero sí debe saber qué es el abuso, cómo se nota y cómo actúa quien quiere dañar a un niño" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿El abuso sexual exige que el adulto toque al niño?", reverso: "No: es cualquier contacto o conducta sexual de un adulto con un niño, aun sin tocarlo.", apoyo: "cualquier contacto o conducta sexual de un adulto, o de alguien mayor, con un niño, aun sin tocarlo" },
              { frente: "¿Qué cosas le faltan a un niño que sufre negligencia?", reverso: "La comida, el cuidado médico o la supervisión.", apoyo: "como la comida, el cuidado médico o la supervisión" },
              { frente: "¿Qué prueba una señal sola?", reverso: "Nada: un niño puede estar triste por muchas razones.", apoyo: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones" },
              { frente: "¿Cómo se llama en inglés el proceso con que se manipula a un niño?", reverso: "Grooming; en español, la preparación o la manipulación del niño.", apoyo: "En inglés este proceso se llama grooming; en español se habla de la preparación o la manipulación del niño" },
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
            consigna: "¿Es abuso físico, abuso emocional o negligencia? Lleva cada frase a su grupo.",
            grupos: ["Abuso físico", "Abuso emocional", "Negligencia"],
            frases: [
              { texto: "Golpes que no son accidentes", grupo: 0 },
              { texto: "Daños en el cuerpo del niño hechos a propósito", grupo: 0 },
              { texto: "Humillar al niño de manera constante", grupo: 1 },
              { texto: "Amenazarlo o aterrorizarlo una y otra vez", grupo: 1 },
              { texto: "Rechazar al niño de manera constante", grupo: 1 },
              { texto: "No darle la comida que necesita", grupo: 2 },
              { texto: "No darle el cuidado médico que necesita", grupo: 2 },
              { texto: "Dejarlo sin la supervisión que necesita", grupo: 2 },
            ],
            apoyo: "El abuso puede ser físico, emocional o sexual, o puede ser negligencia",
            explica: "El abuso físico son golpes o daños en el cuerpo que no son accidentes; el emocional es humillar, amenazar, rechazar o aterrorizar al niño de manera constante; y la negligencia es no darle lo que necesita para vivir y estar seguro.",
          },
          {
            consigna: "¿Qué forma de daño muestra cada ejemplo: abuso físico, abuso emocional o negligencia? Lleva cada frase a su grupo.",
            grupos: ["Abuso físico", "Abuso emocional", "Negligencia"],
            frases: [
              { texto: "Un golpe en el cuerpo que no fue un accidente", grupo: 0 },
              { texto: "Moretones que alguien le hizo, y no por accidente", grupo: 0 },
              { texto: "Burlarse de él y humillarlo siempre", grupo: 1 },
              { texto: "Asustarlo con amenazas todo el tiempo", grupo: 1 },
              { texto: "Dejarlo siempre con hambre", grupo: 2 },
              { texto: "No llevarlo al médico cuando lo necesita", grupo: 2 },
              { texto: "No cuidar que esté seguro", grupo: 2 },
            ],
            apoyo: "La negligencia: no darle al niño lo que necesita para vivir y estar seguro, como la comida, el cuidado médico o la supervisión",
            explica: "Los golpes o daños que no son accidentes son abuso físico; humillar o aterrorizar al niño de manera constante es abuso emocional; y no darle la comida, el cuidado médico o la supervisión que necesita es negligencia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las señales de que un niño sufre: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones.", verdad: true, explica: "Así lo dice la lección: una señal sola no prueba nada.", apoyo: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones" },
              { texto: "Varias señales juntas, o algo que el niño cuenta, son causa para actuar.", verdad: true, explica: "Varias señales juntas, o algo que el niño cuenta, son causa para actuar, como se ve en la lección 5.", apoyo: "Pero varias señales juntas, o algo que el niño cuenta, son causa para actuar" },
              { texto: "Si un niño alegre se vuelve muy callado, ya está probado que sufre un abuso.", verdad: false, explica: "Un cambio brusco de conducta puede ser una señal, pero una señal sola no prueba nada.", apoyo: "Cambios bruscos de conducta: un niño alegre que se vuelve triste, agresivo o muy callado" },
            ],
          },
          {
            consigna: "Sobre lo que puede indicar que un niño sufre: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El miedo a una persona en particular, o a irse a casa, puede ser una señal.", verdad: true, explica: "Es una de las señales que pueden indicar que algo pasa.", apoyo: "Miedo a una persona en particular, o miedo a irse a casa" },
              { texto: "Los moretones sin explicación son siempre accidentes del juego.", verdad: false, explica: "Las heridas o los moretones sin explicación, o con una explicación que no cuadra, pueden indicar que algo pasa.", apoyo: "Heridas o moretones sin explicación, o con una explicación que no cuadra" },
              { texto: "El hambre constante o la ropa siempre sucia pueden indicar que algo pasa.", verdad: true, explica: "Son señales que pueden indicar que un niño sufre, como la falta de cuidado médico.", apoyo: "Hambre constante, ropa siempre sucia o falta de cuidado médico" },
              { texto: "El maestro debe investigar cada señal por su cuenta hasta tener pruebas.", verdad: false, explica: "El maestro no es un investigador: no investiga, pero aprende a ver a tiempo.", apoyo: "El maestro no investiga, pero aprende a ver a tiempo" },
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
            caso: "Un maestro te dice: Daniel, de 8 años, era muy alegre; ahora está agresivo, llega siempre con hambre y llora porque no quiere irse a su casa.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que son varias señales juntas, y que eso es causa para actuar.", bien: true, explica: "Varias señales juntas son causa para actuar: un cambio brusco de conducta, el hambre constante y el miedo a irse a casa." },
              { texto: "Que una señal sola no prueba nada, así que no hay nada que hacer.", explica: "No es una sola señal: son varias juntas, y eso es causa para actuar." },
              { texto: "Que lo lleve aparte y le haga preguntas hasta que le cuente todo.", explica: "El maestro no es un investigador: aprende a ver a tiempo, y las señales son causa para actuar." },
              { texto: "Que es algo normal de su edad, y que con el tiempo se le va a pasar.", explica: "Un cambio brusco de conducta, el hambre constante y el miedo a irse a casa son señales que pueden indicar que algo pasa." },
            ],
            apoyo: "Pero varias señales juntas, o algo que el niño cuenta, son causa para actuar",
            explica: "Una señal sola no prueba nada, pero varias juntas son causa para actuar. El maestro no investiga, pero aprende a ver a tiempo.",
          },
          {
            caso: "Una ayudante te dice: Lucía estuvo un poco triste hoy en la clase. ¿Será que alguien le hace daño?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que una señal sola no prueba nada, porque hay muchas razones.", bien: true, explica: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones." },
              { texto: "Que sí: la tristeza ya prueba que alguien le está haciendo daño.", explica: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones." },
              { texto: "Que la interrogue hasta descubrir quién la pone tan triste.", explica: "El maestro no es un investigador, y una señal sola no prueba nada." },
              { texto: "Que no se fije en esas cosas, porque eso no le toca al maestro.", explica: "El maestro no investiga, pero aprende a ver a tiempo." },
            ],
            apoyo: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones",
            explica: "Una señal sola no prueba nada: un niño puede estar triste por muchas razones. Pero varias señales juntas, o algo que el niño cuenta, son causa para actuar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos con que actúa quien quiere dañar a un niño, como los presenta la lección.",
            pasos: [
              "Elige a un niño que está solo o que necesita atención",
              "Se gana la confianza del niño y de su familia",
              "Busca estar a solas con él",
              "Rompe los límites poco a poco",
              "Asegura el secreto",
            ],
            apoyo: "Quien quiere dañar a un niño sigue un proceso: lo elige, se gana su confianza y la de su familia, busca estar a solas con él, rompe los límites poco a poco y asegura el secreto",
            explica: "Primero elige a un niño; después se gana su confianza y la de su familia, busca estar a solas con él y rompe los límites poco a poco; al final asegura el secreto. Los adultos que lo conocen pueden cortarlo en los primeros pasos.",
          },
          {
            consigna: "Ordena estas conductas en el orden del proceso de manipulación, del primer paso al último.",
            pasos: [
              "Se fija en un niño que tiene problemas en casa",
              "Le hace regalos y favores, y ayuda a su familia con el transporte",
              "Le propone paseos y clases particulares, o le escribe en privado",
              "Empieza con juegos de contacto, cosquillas y bromas",
              "Le dice que es un secreto entre los dos",
            ],
            apoyo: "Los adultos que lo conocen pueden cortarlo en los primeros pasos, mucho antes de que haya abuso",
            explica: "Elige al niño, se gana su confianza y la de su familia con regalos y favores, busca estar a solas con él, rompe los límites poco a poco y asegura el secreto. Conocer el proceso permite cortarlo en los primeros pasos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "En inglés este proceso se llama grooming; en español se habla de la preparación o la manipulación del niño",
            ref: "Juan 3:20-21",
            titulo: "Las clases de guitarra",
            relato: [
              "Eres coordinador del ministerio de niños. Un voluntario de la alabanza, muy querido en la iglesia, se ofrece a darle clases particulares de guitarra a Tomás, de diez años, cuyos padres trabajan todo el día.",
              "Notas que solo a Tomás le trae regalos, que le escribe mensajes privados y que le pidió no contarles a sus padres de las clases.",
              "Nadie ha visto ningún abuso. Abres la política de protección y piensas qué hacer.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué ves en los hechos?",
                opciones: [
                  { texto: "Favoritismo, mensajes privados y un intento de estar a solas con él.", bien: true, explica: "Esos son los hechos: hay favoritismo, mensajes privados y un intento de quedarse a solas con el niño." },
                  { texto: "Un voluntario generoso, que solo quiere ayudar a un niño que pasa mucho tiempo solo.", explica: "Elegir a un niño que está solo y ganarse su confianza con regalos son pasos del proceso de manipulación." },
                  { texto: "Nada que importe, porque nadie ha visto un abuso todavía.", explica: "Los adultos que conocen el proceso pueden cortarlo en los primeros pasos, mucho antes de que haya abuso." },
                ],
                apoyo: "Paso 1, mirar los hechos: hay favoritismo, mensajes privados y un intento de quedarse a solas con ella",
                explica: "Lo primero es mirar los hechos: favoritismo, mensajes privados y un intento de quedarse a solas con el niño.",
              },
              {
                tipo: "situacion",
                pregunta: "Que le haya pedido a Tomás no contarles a sus padres, ¿qué paso del proceso es?",
                opciones: [
                  { texto: "Asegurar el secreto: el que hace lo malo busca que no se sepa.", bien: true, explica: "Quien quiere dañar a un niño asegura el secreto: le dice que es un secreto entre los dos." },
                  { texto: "Ganarse la confianza de su familia, para que lo dejen a solas con él.", explica: "Ganarse la confianza de la familia es otro paso; pedirle al niño que no cuente es asegurar el secreto." },
                  { texto: "Ninguno: es normal que un maestro guarde en privado sus clases.", explica: "Pedirle a un niño que no cuente es asegurar el secreto, y en el ministerio nada se hace a escondidas." },
                ],
                apoyo: "Asegura el secreto: le dice que es un secreto entre los dos, lo hace sentir culpable o lo amenaza",
                explica: "El que quiere dañar a un niño busca el secreto. Por eso las reglas de protección llenan de luz el ministerio: nada se hace a escondidas.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con las reglas?",
                opciones: [
                  { texto: "Le recuerdo la política: nada de mensajes privados con menores.", bien: true, explica: "Así se actúa con las reglas: nada de mensajes privados con menores, y ningún adulto se queda solo con un niño." },
                  { texto: "Lo dejo seguir así, para no ofender a un voluntario tan querido.", explica: "Reconocer una señal no es acusar: es aplicar las reglas a todos por igual. El buen voluntario no se ofende." },
                  { texto: "Hablo a solas con Tomás para averiguar qué pasa en esas clases.", explica: "El maestro no es un investigador: se actúa con las reglas, que valen para todos." },
                ],
                apoyo: "Reconocer una señal no es acusar a nadie: es aplicar las reglas a todos por igual",
                explica: "Reconocer una señal no es acusar a nadie: es aplicar las reglas a todos por igual. El buen voluntario no se ofende cuando se le recuerda la política.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces después de hablar con el voluntario?",
                opciones: [
                  { texto: "Escribo lo que pasó, con la fecha, y se lo informo al pastor.", bien: true, explica: "Es el paso de anotar y avisar: el coordinador escribe lo que pasó, con la fecha, y lo informa al pastor." },
                  { texto: "No anoto nada, para que no quede nada escrito en contra de él.", explica: "El coordinador escribe lo que pasó, con la fecha, y lo informa al pastor." },
                  { texto: "Se lo cuento a los hermanos de mi grupo, para que estén atentos.", explica: "Lo que pasó se anota con la fecha y se le informa al pastor." },
                ],
                apoyo: "Paso 4, anotar y avisar: el coordinador escribe lo que pasó, con la fecha, y lo informa al pastor",
                explica: "Después de actuar con las reglas, se anota lo que pasó con la fecha y se informa al pastor.",
              },
              {
                tipo: "explica",
                apoyo: "Paso 5, si hay más: si aparece una señal de abuso o la niña cuenta algo, se reporta a las autoridades, como se verá en la lección 5",
                clave: {
                  id: "pr-ninez-4-2-a6-1",
                  tipo: "corta",
                  pregunta: "¿Qué harás si aparece una señal de abuso o Tomás cuenta algo, y por qué conviene actuar ya con las reglas?",
                  ideas: [
                    { id: "reporta", peso: 50, texto: "Si aparece una señal de abuso o el niño cuenta algo, se reporta a las autoridades.", formas: ["report*", "denunci*", "autoridad*", "a la policia"] },
                    { id: "cortar", peso: 50, texto: "Porque los adultos que conocen el proceso pueden cortarlo en los primeros pasos, mucho antes de que haya abuso.", formas: ["cort*", "primeros pasos", "antes de que haya", "a tiempo", "llenan de luz", "a escondidas", "detener* (el|ese) proceso", "frenar*"] },
                  ],
                  modelo: "Si aparece una señal de abuso o Tomás cuenta algo, lo reportaré a las autoridades. Conviene actuar ya con las reglas, porque así se corta el proceso de manipulación en sus primeros pasos, mucho antes de que haya abuso.",
                },
              },
            ],
          },
          {
            apoyo: "Los adultos que lo conocen pueden cortarlo en los primeros pasos, mucho antes de que haya abuso",
            ref: "Efesios 5:11",
            titulo: "Los paseos del sábado",
            relato: [
              "Eres coordinadora del ministerio de niños. Una ayudante muy cariñosa invita a Valentina, de ocho años, que pasa mucho tiempo sola, a pasear los sábados.",
              "Además, le regala cosas solo a ella, le ofrece a su mamá llevarla y traerla de la iglesia, y le escribe por un teléfono que le dio.",
              "Todavía no hay ninguna señal de abuso, pero te preocupa lo que ves.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Que haya elegido a una niña que pasa mucho tiempo sola, ¿qué paso del proceso puede ser?",
                opciones: [
                  { texto: "Elegir a un niño, muchas veces uno que está solo o que necesita atención.", bien: true, explica: "Es el primer paso: elegir a un niño, muchas veces uno que está solo, que necesita atención o que tiene problemas en casa." },
                  { texto: "Asegurar el secreto, porque la niña no le cuenta nada a nadie de su familia.", explica: "Asegurar el secreto es el último paso; elegir a un niño que está solo es el primero." },
                  { texto: "Ninguno: es lindo que alguien se ocupe de una niña que está sola.", explica: "Quien quiere dañar a un niño muchas veces elige a uno que está solo o que necesita atención." },
                ],
                apoyo: "Elige a un niño: muchas veces uno que está solo, que necesita atención o que tiene problemas en casa",
                explica: "El proceso empieza cuando elige a un niño, muchas veces uno que está solo, que necesita atención o que tiene problemas en casa.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué muestran los regalos solo para ella y la ayuda a su mamá con el transporte?",
                opciones: [
                  { texto: "Que se gana la confianza de la niña y la de su familia.", bien: true, explica: "Se gana la confianza del niño y de su familia: regalos, favores, atención especial, ayuda con el transporte." },
                  { texto: "Que ya rompe los límites poco a poco con juegos y bromas.", explica: "Romper los límites es otro paso; los regalos y la ayuda con el transporte son para ganarse la confianza." },
                  { texto: "Que es una ayudante generosa, y que no hay nada que mirar.", explica: "Los regalos, los favores y la ayuda con el transporte pueden ser un paso del proceso: ganarse la confianza." },
                ],
                apoyo: "Se gana la confianza del niño y de su familia: regalos, favores, atención especial, ayuda con el transporte",
                explica: "Quien quiere dañar a un niño se gana su confianza y la de su familia, y después busca estar a solas con él.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces como coordinadora?",
                opciones: [
                  { texto: "Le recuerdo la política a la ayudante y lo anoto con la fecha.", bien: true, explica: "Se actúa con las reglas: nada de mensajes privados con menores y ningún adulto lleva solo a un niño; y se anota lo que pasó, con la fecha." },
                  { texto: "Espero a ver si pasa algo más grave antes de decir algo.", explica: "Los adultos que conocen el proceso pueden cortarlo en los primeros pasos, mucho antes de que haya abuso." },
                  { texto: "La acuso delante de todos, para que nadie la deje sola con niños.", explica: "Reconocer una señal no es acusar a nadie: es aplicar las reglas a todos por igual." },
                ],
                apoyo: "Paso 3, actuar con las reglas: el coordinador le recuerda la política: nada de mensajes privados con menores, y ningún adulto lleva solo a un niño",
                explica: "Ver no es acusar: se aplican las reglas a todos por igual, se anota lo que pasó y se informa al pastor.",
              },
              {
                tipo: "explica",
                apoyo: "El que hace lo malo aborrece la luz; por eso las reglas llenan de luz el ministerio y cortan ese proceso a tiempo",
                clave: {
                  id: "pr-ninez-4-2-a6-2",
                  tipo: "corta",
                  pregunta: "¿Por qué conviene actuar ya con la ayudante, aunque todavía no haya ninguna señal de abuso?",
                  ideas: [
                    { id: "cortar", peso: 50, texto: "Porque el proceso se puede cortar en los primeros pasos, mucho antes de que haya abuso.", formas: ["cort*", "primeros pasos", "antes de que haya", "a tiempo", "detener*", "frenar*", "evitar* que"] },
                    { id: "reglas", peso: 50, texto: "Porque ver no es acusar: es aplicar las reglas a todos por igual, y las reglas llenan de luz el ministerio.", formas: ["no es acusar", "aplicar las reglas", "aplica las reglas", "las reglas a todos", "por igual", "llenan de luz", "a escondidas", "recordar* la politica", "recuerd* la politica"] },
                  ],
                  modelo: "Porque los adultos que conocen el proceso pueden cortarlo en los primeros pasos, mucho antes de que haya abuso. Además, ver no es acusar: es aplicar las reglas a todos por igual, y las reglas llenan de luz el ministerio.",
                },
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
            apoyo: "Quien quiere dañar a un niño sigue un proceso: lo elige, se gana su confianza y la de su familia, busca estar a solas con él, rompe los límites poco a poco y asegura el secreto",
            ref: "Juan 3:20-21",
            clave: {
              id: "pr-ninez-4-2-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo actúa quien quiere dañar a un niño, y cómo cortan ese proceso las reglas de protección?",
              ideas: [
                { id: "confianza", peso: 35, texto: "Elige a un niño, se gana su confianza y la de su familia, y busca estar a solas con él.", formas: ["confianza", "a solas", "regalos", "favores", "atencion especial", "elige a un nino", "lo elige"] },
                { id: "secreto", peso: 30, texto: "Rompe los límites poco a poco y asegura el secreto.", formas: ["secreto", "limites", "poco a poco", "amenaz*", "culpable"] },
                { id: "luz", peso: 35, texto: "Las reglas llenan de luz el ministerio: nada se hace a escondidas, y el proceso se corta a tiempo.", formas: ["luz", "a escondidas", "a la vista", "primeros pasos", "a tiempo"] },
              ],
              modelo: "Quien quiere dañar a un niño lo elige, se gana su confianza y la de su familia y busca estar a solas con él. Después rompe los límites poco a poco y asegura el secreto. Las reglas llenan de luz el ministerio: nada se hace a escondidas, y el proceso se corta a tiempo.",
            },
          },
          {
            apoyo: "El que quiere dañar a un niño busca el secreto",
            ref: "Juan 3:20-21",
            clave: {
              id: "pr-ninez-4-2-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué el que quiere dañar a un niño busca el secreto, y qué hace la iglesia ante eso?",
              ideas: [
                { id: "aborrece", peso: 40, texto: "El que hace lo malo aborrece la luz y no viene a la luz, para que sus obras no sean reprendidas.", formas: ["aborrec*", "odia la luz", "no viene a la luz", "sus obras", "no sean reprendidas", "que no se (vea|vean|sepa|sepan|descubra)", "esconder*", "ocult*"] },
                { id: "reglas", peso: 35, texto: "Las reglas de protección llenan de luz el ministerio: nada se hace a escondidas.", formas: ["llenan de luz", "llena de luz", "a escondidas", "a la vista", "las reglas", "nada se hace", "nada se haga", "nada a escondidas", "pone* reglas"] },
                { id: "reprende", peso: 25, texto: "La iglesia no calla lo malo: lo reprende.", formas: ["reprend*", "no calla", "no se calla", "no callar", "no participa", "denunci*", "report*"] },
              ],
              modelo: "Porque el que hace lo malo aborrece la luz y no viene a la luz, para que sus obras no sean reprendidas. Por eso las reglas de protección llenan de luz el ministerio: nada se hace a escondidas. Y la iglesia no calla lo malo, sino que lo reprende.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La política y la selección de los voluntarios
    "ninez-4-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es la primera protección de un niño?", reverso: "Quién está a su lado.", apoyo: "La primera protección de un niño es quién está a su lado" },
              { frente: "¿En cuántas áreas ordena la protección Keeping Children Safe?", reverso: "En cuatro: la política, las personas, los procedimientos y la rendición de cuentas.", apoyo: "Los Estándares Internacionales de Protección Infantil Organizacional, de Keeping Children Safe, ordenan la protección en cuatro áreas" },
              { frente: "¿Qué es la política, la primera de las cuatro áreas?", reverso: "Un documento escrito y aprobado que dice cómo la iglesia protege a los niños.", apoyo: "La política: un documento escrito y aprobado que dice cómo la iglesia protege a los niños" },
              { frente: "Según 1 Timoteo 3:7, ¿qué testimonio también cuenta?", reverso: "El de los de afuera: lo que se sabe de la persona fuera de la iglesia.", apoyo: "Lo que se sabe de una persona fuera de la iglesia también cuenta" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es poner a alguien en un servicio sin conocerlo?", reverso: "Hacerlo con ligereza.", apoyo: "Poner a alguien en un servicio sin conocerlo es hacerlo con ligereza" },
              { frente: "¿Qué abarca el área de las personas?", reverso: "Quién puede servir con niños, cómo se lo selecciona y cómo se lo capacita.", apoyo: "Las personas: quién puede servir con niños, cómo se lo selecciona y cómo se lo capacita" },
              { frente: "¿Qué abarca el área de los procedimientos?", reverso: "Las reglas de cada domingo y lo que se hace si alguien sospecha algo.", apoyo: "Los procedimientos: las reglas de cada domingo y lo que se hace si alguien sospecha algo o un niño cuenta algo" },
              { frente: "¿Qué mira la rendición de cuentas?", reverso: "Quién revisa que se cumpla, y cada cuánto se revisa la política.", apoyo: "La rendición de cuentas: quién revisa que se cumpla, y cada cuánto se revisa la política" },
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
            consigna: "Une cada área de la política de protección con lo que abarca.",
            pares: [
              ["La política", "Un documento escrito y aprobado"],
              ["Las personas", "Quién sirve, y cómo se lo selecciona y se lo capacita"],
              ["Los procedimientos", "Las reglas de cada domingo y qué hacer si alguien sospecha"],
              ["La rendición de cuentas", "Quién revisa que se cumpla, y cada cuánto se revisa"],
            ],
            apoyo: "Una política de protección escrita ordena cuatro áreas: la política, las personas, los procedimientos y la rendición de cuentas",
            explica: "La política es el documento escrito y aprobado; las personas, quién sirve y cómo se lo selecciona y capacita; los procedimientos, las reglas de cada domingo y qué se hace si alguien sospecha algo; y la rendición de cuentas, quién revisa que se cumpla y cada cuánto se revisa.",
          },
          {
            consigna: "¿A qué área de la política pertenece cada decisión? Une cada decisión con su área.",
            pares: [
              ["La iglesia aprueba un documento sobre cómo protege a los niños", "La política"],
              ["Se decide cómo se selecciona y se capacita a cada maestro", "Las personas"],
              ["Se escribe qué hacer si un niño cuenta algo", "Los procedimientos"],
              ["Se fija quién revisa que se cumpla la política", "La rendición de cuentas"],
            ],
            apoyo: "Sirven de guía para armar la política de la iglesia",
            explica: "Aprobar el documento es parte de la política; seleccionar y capacitar, de las personas; qué hacer si un niño cuenta algo, de los procedimientos; y quién revisa que se cumpla, de la rendición de cuentas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los primeros pasos de la selección de un voluntario, del primero al último.",
            pasos: [
              "Asistir a la iglesia un tiempo, unos seis meses",
              "Llenar la solicitud con sus datos y dónde ha servido con niños",
              "Dar dos o tres referencias de personas que lo conocen",
              "Tener una entrevista con el coordinador",
              "Pasar la verificación de antecedentes",
              "Recibir la capacitación",
            ],
            apoyo: "Ejemplo resuelto: la selección de un voluntario, paso a paso",
            explica: "Primero asiste un tiempo; después llena la solicitud, da sus referencias y tiene la entrevista; luego se verifican sus antecedentes y recibe la capacitación. Después vienen el comienzo acompañado y la renovación.",
          },
          {
            consigna: "Ordena los últimos pasos de la selección de un voluntario, del primero al último.",
            pasos: [
              "Las referencias: dos o tres personas que lo conocen",
              "La entrevista sobre su fe, su experiencia y la política",
              "La consulta de sus antecedentes penales y del registro público",
              "La capacitación en la política y en las señales del abuso",
              "Unas semanas de servicio junto a un maestro con experiencia",
              "Repetir la verificación y la capacitación cada cierto tiempo",
            ],
            apoyo: "Paso 8, renovar: la verificación y la capacitación se repiten cada cierto tiempo, según la política",
            explica: "Después de las referencias y la entrevista vienen la verificación de antecedentes y la capacitación; luego, unas semanas junto a un maestro con experiencia; y cada cierto tiempo se repiten la verificación y la capacitación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Una buena impresión no reemplaza los pasos",
            ref: "Proverbios 14:15",
            situacion: "Eres coordinador del ministerio de niños. Andrés llegó a la iglesia hace un mes; es simpático y servicial, y quiere enseñar en la clase de niños.",
            escenas: [
              {
                id: "e1",
                narra: "Andrés te dice: En mi iglesia anterior enseñé a niños muchos años. ¿Puedo empezar este domingo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que primero asistirá un tiempo en la iglesia y llenará la solicitud.", valor: 2, explica: "Cada voluntario pasa por los mismos pasos: primero asiste un tiempo, muchas veces unos seis meses, y llena la solicitud.", siguiente: "e2" },
                  { texto: "Que sí: con tanta experiencia y su buena impresión ya es suficiente.", valor: 0, explica: "Una buena impresión no reemplaza los pasos: «el avisado mira bien sus pasos».", siguiente: "e1b" },
                  { texto: "Que pedirás una referencia a su iglesia anterior y después decidirás.", valor: 1, explica: "Las referencias son uno de los pasos, pero antes asiste un tiempo y llena la solicitud.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Andrés insiste: Yo soy de confianza; esos pasos son para la gente desconocida.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que todos pasan por los mismos pasos, también el hijo del pastor.", valor: 2, explica: "La selección no es una acusación: todos pasan por los mismos pasos, también el hijo del pastor y el maestro de muchos años.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que a él no le vas a pedir ninguno de esos pasos.", valor: 0, explica: "Todos pasan por los mismos pasos: una buena impresión no los reemplaza.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Pasaron seis meses. Andrés llenó la solicitud y quiere empezar.",
                pregunta: "¿Qué pasos siguen antes de que enseñe?",
                opciones: [
                  { texto: "Las referencias, la entrevista, la verificación y la capacitación.", valor: 2, explica: "Después de la solicitud vienen las referencias, la entrevista, la verificación de antecedentes y la capacitación." },
                  { texto: "Solo una entrevista: si te convence, puede empezar el domingo.", valor: 1, explica: "La entrevista es uno de los pasos, pero también hacen falta las referencias, la verificación de antecedentes y la capacitación." },
                  { texto: "Ninguno más: ya esperó bastante, y eso demuestra que es de toda confianza.", valor: 0, explica: "Asistir un tiempo es solo el primer paso: una buena impresión no reemplaza los pasos." },
                ],
              },
              {
                id: "e3",
                narra: "Andrés pasó todos esos pasos y recibió la capacitación.",
                pregunta: "¿Cómo empieza a servir?",
                opciones: [
                  { texto: "Unas semanas junto a un maestro con experiencia, que lo guía.", valor: 2, explica: "El comienzo es acompañado: sirve unas semanas junto a un maestro con experiencia." },
                  { texto: "Con otro voluntario que también empieza, para que se ayuden.", valor: 1, explica: "No estará solo, pero el comienzo acompañado es junto a un maestro con experiencia." },
                  { texto: "Solo, con la clase de los más pequeños, desde el primer domingo.", valor: 0, explica: "El comienzo es acompañado: sirve unas semanas junto a un maestro con experiencia." },
                ],
              },
            ],
          },
          {
            apoyo: "Cada voluntario pasa por los mismos pasos: asistir un tiempo, la solicitud, las referencias, la entrevista, la verificación de antecedentes, la capacitación, un comienzo acompañado y la renovación",
            ref: "1 Timoteo 5:22",
            situacion: "Eres coordinadora de niños en una iglesia de Texas. Raúl asiste hace un año y quiere servir con niños, y tú llevas su selección paso a paso.",
            escenas: [
              {
                id: "e1",
                narra: "Raúl entrega la solicitud, pero dejó en blanco la pregunta de si alguna vez fue acusado o condenado por dañar a un menor.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides que la responda: la solicitud se lo pregunta a todos.", valor: 2, explica: "La solicitud pide sus datos, dónde ha servido con niños y si alguna vez fue acusado o condenado por dañar a un menor." },
                  { texto: "La dejas así, para no incomodarlo con una pregunta tan delicada.", valor: 0, explica: "Esa pregunta es parte de la solicitud: todos pasan por los mismos pasos." },
                  { texto: "La pasas por alto ahora, y se lo preguntarás en la entrevista.", valor: 1, explica: "En la entrevista se conversa, pero la solicitud también pide esa respuesta." },
                ],
              },
              {
                id: "e2",
                narra: "Llega el paso de la verificación de antecedentes.",
                pregunta: "¿Qué consultas?",
                opciones: [
                  { texto: "Sus antecedentes y el registro público de delincuentes sexuales.", valor: 2, explica: "Se consultan sus antecedentes penales y el registro público de delincuentes sexuales; en Texas, el del Departamento de Seguridad Pública." },
                  { texto: "Sus antecedentes penales, y el registro lo dejas para otra ocasión.", valor: 1, explica: "Los antecedentes penales son parte del paso, pero también se consulta el registro público de delincuentes sexuales." },
                  { texto: "Nada: si sus referencias hablan bien de él, eso ya es suficiente.", valor: 0, explica: "Las referencias no reemplazan la verificación de antecedentes: una buena impresión no reemplaza los pasos." },
                ],
              },
              {
                id: "e3",
                narra: "El hermano de Raúl, de quince años, quiere ayudar, y Raúl propone que cuente como el segundo adulto de la sala.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que puede ayudar, pero no cuenta como uno de los dos adultos.", valor: 2, explica: "Los adolescentes pueden ayudar en la clase y aprender a servir, pero no cuentan como uno de los dos adultos de la sala, y nunca se quedan a solas con los niños." },
                  { texto: "Que sí: si es de confianza, puede ser el segundo adulto de la sala.", valor: 0, explica: "Los adolescentes no cuentan como uno de los dos adultos de la sala." },
                  { texto: "Que puede ayudar, y quedarse con los niños si Raúl sale un rato.", valor: 0, explica: "Los adolescentes nunca se quedan a solas con los niños." },
                ],
              },
              {
                id: "e4",
                narra: "Raúl ya sirve hace varios años, y nadie volvió a revisar su verificación ni su capacitación.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Las renuevas, como pide la política cada cierto tiempo.", valor: 2, explica: "La verificación y la capacitación se repiten cada cierto tiempo, según la política." },
                  { texto: "Le das otra capacitación, pero no repites la verificación.", valor: 1, explica: "Renovar la capacitación está bien, pero también se repite la verificación." },
                  { texto: "Nada: si ya las pasó una vez, no hace falta repetirlas nunca.", valor: 0, explica: "La verificación y la capacitación se repiten cada cierto tiempo, según la política." },
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
            consigna: "Completa lo que enseña la lección con 1 Timoteo 5:22.",
            texto: "Poner a alguien en un servicio sin [[conocerlo]] es hacerlo con [[ligereza]]: una buena impresión no reemplaza los pasos.",
            distractores: ["saludarlo", "cuidado"],
            errores: {
              saludarlo: "Pablo pidió no imponer las manos con ligereza: lo que falta es conocer a la persona.",
              cuidado: "Poner a alguien en un servicio sin conocerlo es hacerlo con ligereza, no con cuidado.",
            },
            apoyo: "Poner a alguien en un servicio sin conocerlo es hacerlo con ligereza",
            ref: "1 Timoteo 5:22",
            explica: "Pablo le pidió a Timoteo no imponer con ligereza las manos a ninguno: poner a alguien en un servicio sin conocerlo es hacerlo con ligereza, y una buena impresión no reemplaza los pasos.",
          },
          {
            consigna: "Completa a quién cuida la selección.",
            texto: "La selección no se deja llevar por las apariencias: todos pasan por los mismos pasos, y así se cuida a los [[niños]] y también a los que [[sirven]].",
            distractores: ["edificios", "acusan"],
            errores: {
              edificios: "La selección cuida a los niños: la primera protección de un niño es quién está a su lado.",
              acusan: "La selección cuida también a los que sirven: no es una acusación.",
            },
            apoyo: "Así se cuida a los niños, y también a los que sirven",
            explica: "La selección no es una acusación: todos pasan por los mismos pasos, también el hijo del pastor y el maestro de muchos años. Así se cuida a los niños, y también a los que sirven.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "El hijo del pastor, que quiere ayudar en la clase de niños, te dice: ¿Yo también tengo que pasar por todos esos pasos? Me conocen desde que nací.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que sí: todos pasan por los mismos pasos, y así también se lo cuida a él.", bien: true, explica: "Todos pasan por los mismos pasos, también el hijo del pastor: así se cuida a los niños, y también a los que sirven." },
              { texto: "Que no: al hijo del pastor ya lo conoce bien toda la iglesia desde niño.", explica: "Todos pasan por los mismos pasos, también el hijo del pastor y el maestro de muchos años." },
              { texto: "Que solo le harás la entrevista, porque los otros pasos son para extraños.", explica: "Cada voluntario pasa por los mismos pasos: una buena impresión no los reemplaza." },
              { texto: "Que sí, porque en la iglesia hay sospechas sobre él y hay que investigarlo.", explica: "La selección no es una acusación: todos pasan por los mismos pasos." },
            ],
            apoyo: "Todos pasan por los mismos pasos, también el hijo del pastor y el maestro de muchos años",
            explica: "La selección no es una acusación. Todos pasan por los mismos pasos, también el hijo del pastor y el maestro de muchos años: así se cuida a los niños, y también a los que sirven.",
          },
          {
            caso: "Una maestra con veinte años en la clase de niños te dice: Me siento ofendida; ¿ahora desconfían de mí y me piden la verificación?",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que la selección no es una acusación: cuida a los niños y también a ella.", bien: true, explica: "La selección no es una acusación: todos pasan por los mismos pasos, y así se cuida a los niños y también a los que sirven." },
              { texto: "Que tiene razón, y que a una maestra de tantos años no se le pedirá nada más.", explica: "Todos pasan por los mismos pasos, también el maestro de muchos años." },
              { texto: "Que es por si acaso, porque nunca se sabe quién podría tener la culpa.", explica: "La selección no es una acusación: todos pasan por los mismos pasos, sin sospechar de nadie en particular." },
              { texto: "Que es un simple trámite, y que puede firmarlo sin que nadie lo revise.", explica: "Cada paso se hace de verdad: la verificación y la capacitación se repiten cada cierto tiempo, según la política." },
            ],
            apoyo: "La selección no es una acusación",
            explica: "La selección no es una acusación: todos pasan por los mismos pasos, también el maestro de muchos años. Así se cuida a los niños, y también a los que sirven.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La primera protección de un niño es quién está a su lado",
            ref: "1 Timoteo 5:22",
            clave: {
              id: "pr-ninez-4-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la selección de los voluntarios cuida a los niños y también a los que sirven?",
              ideas: [
                { id: "lado", peso: 35, texto: "La primera protección de un niño es quién está a su lado: no se pone a nadie en un servicio con ligereza.", formas: ["a su lado", "primera proteccion", "ligereza", "sin conocer*", "conocer* (bien|antes)", "quien esta con"] },
                { id: "todos", peso: 35, texto: "La selección no es una acusación: todos pasan por los mismos pasos.", formas: ["no es una acusacion", "no es acusar", "no acusa", "todos pasan", "mismos pasos", "por igual"] },
                { id: "sirven", peso: 30, texto: "Así se cuida a los niños, y también a los que sirven.", formas: ["los que sirven", "quienes sirven", "al que sirve", "a los voluntarios", "al voluntario", "a los maestros", "al maestro"] },
              ],
              modelo: "Porque la primera protección de un niño es quién está a su lado, y no se pone a nadie en un servicio con ligereza. La selección no es una acusación: todos pasan por los mismos pasos. Así se cuida a los niños, y también a los que sirven.",
            },
          },
          {
            apoyo: "Una buena impresión no reemplaza los pasos",
            ref: "Proverbios 14:15",
            clave: {
              id: "pr-ninez-4-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que con una buena impresión basta para elegir a un maestro de niños. ¿Qué le explicas?",
              ideas: [
                { id: "impresion", peso: 40, negativa: true, texto: "Una buena impresión no reemplaza los pasos: el avisado mira bien sus pasos.", formas: ["no reemplaza", "no basta", "no alcanza", "no es suficiente", "avisado", "mira bien", "apariencia*", "simple todo lo cree"] },
                { id: "pasos", peso: 35, texto: "Cada voluntario pasa por los mismos pasos: la solicitud, las referencias, la entrevista, la verificación de antecedentes y la capacitación.", formas: ["solicitud", "referencias", "entrevista", "antecedentes", "verificacion", "capacitacion", "mismos pasos"] },
                { id: "cuida", peso: 25, texto: "Así se cuida a los niños, y también a los que sirven.", formas: ["los que sirven", "al que sirve", "a los voluntarios", "a los maestros", "al maestro", "cuida a los ninos", "protege a los ninos", "cuidar a los ninos", "proteger a los ninos"] },
              ],
              errores: [
                { id: "basta", texto: "Una buena impresión no reemplaza los pasos.", formas: ["basta con (una|la) buena impresion", "buena impresion basta", "buena impresion es suficiente", "tiene razon"], anula: "impresion" },
              ],
              modelo: "Le explico que una buena impresión no reemplaza los pasos: el avisado mira bien sus pasos. Todos pasan por los mismos: la solicitud, las referencias, la entrevista, la verificación de antecedentes y la capacitación. Así se cuida a los niños y también a los que sirven.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Las reglas de cada domingo
    "ninez-4-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice la regla de los dos adultos?", reverso: "Nunca hay un solo adulto a solas con un niño; en cada sala hay al menos dos.", apoyo: "La regla de los dos adultos: nunca hay un solo adulto a solas con un niño" },
              { frente: "¿Cómo van al baño los pequeños?", reverso: "En grupo, con un adulto que espera en la puerta.", apoyo: "El baño: los pequeños van en grupo con un adulto que espera en la puerta" },
              { frente: "¿Qué hizo el pueblo al reconstruir el muro, según Nehemías 4:9?", reverso: "Oró a Dios y puso guarda de día y de noche.", apoyo: "Cuando reconstruían el muro, el pueblo oró y vigiló" },
              { frente: "¿Qué lleva la ficha de salud de cada niño?", reverso: "Sus alergias y el teléfono de sus padres.", apoyo: "La salud y las emergencias: una ficha con las alergias y el teléfono de los padres" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pasa con una política que se queda en un cajón?", reverso: "No protege a nadie.", apoyo: "Una política que se queda en un cajón no protege a nadie" },
              { frente: "¿Cómo se cambian los pañales?", reverso: "A la vista de otro adulto.", apoyo: "los pañales se cambian a la vista de otro adulto" },
              { frente: "¿Qué hace el coordinador si un voluntario no cumple una regla?", reverso: "Se lo recuerda en privado; si lo repite, deja de servir hasta que la cumpla.", apoyo: "Cuando un voluntario no cumple una regla, el coordinador se lo recuerda en privado" },
              { frente: "¿Qué hay en cada sala para una emergencia?", reverso: "Un botiquín y un plan para salir de la sala contando a cada niño.", apoyo: "un botiquín y un plan para salir de la sala contando a cada niño" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Puertas abiertas o con ventana: lo que pasa en la sala se puede ver desde afuera",
            ref: "2 Corintios 8:21",
            situacion: "Eres maestra de la clase de los pequeños, y hoy sirves con otra maestra seleccionada. La sala está junto al templo, y se oye mucho ruido.",
            escenas: [
              {
                id: "e1",
                narra: "Tu compañera quiere cerrar la puerta y tapar su ventana con un cartel, para que no entre el ruido.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le propones dejar la ventana sin tapar, para que todo se vea desde afuera.", valor: 2, explica: "Puertas abiertas o con ventana: lo que pasa en la sala se puede ver desde afuera.", siguiente: "e2" },
                  { texto: "La dejas tapar la ventana: con dos maestras en la sala ya no hace falta más.", valor: 0, explica: "La regla de los dos adultos no reemplaza a las demás: lo que pasa en la sala se puede ver desde afuera.", siguiente: "e1b" },
                  { texto: "Cierran la puerta, pero la abren de vez en cuando para que se vea algo.", valor: 1, explica: "Abrirla a veces ayuda, pero la regla es puertas abiertas o con ventana: todo se hace a la vista de otros.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Un padre se acerca a la puerta y no puede ver a su hija.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Quitan el cartel de la ventana, para que se vea la sala.", valor: 2, explica: "Todo se hace a la vista de otros, honradamente delante del Señor y de los hombres.", siguiente: "e2" },
                  { texto: "Le piden que espere afuera y que confíe en las dos maestras.", valor: 0, explica: "En el ministerio de niños todo se hace a la vista de otros: lo que pasa en la sala se puede ver desde afuera.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Una niña pequeña necesita ir al baño.",
                pregunta: "¿Cómo va?",
                opciones: [
                  { texto: "En grupo con otros niños, y un adulto espera en la puerta.", valor: 2, explica: "Los pequeños van al baño en grupo con un adulto que espera en la puerta." },
                  { texto: "Con tu compañera, que entra sola con ella y cierra la puerta.", valor: 0, explica: "Nunca hay un solo adulto a solas con un niño: los pequeños van en grupo, con un adulto que espera en la puerta." },
                  { texto: "Con otra niña de su edad, sin ningún adulto que espere afuera.", valor: 1, explica: "Ir en grupo está bien, pero un adulto espera en la puerta." },
                ],
              },
              {
                id: "e3",
                narra: "Suena la alarma de incendio del edificio.",
                pregunta: "¿Qué hacen?",
                opciones: [
                  { texto: "Salen siguiendo el plan de la sala, contando a cada niño.", valor: 2, explica: "Cada sala tiene un plan para salir contando a cada niño." },
                  { texto: "Salen rápido, y al llegar afuera tratan de contar a los niños.", valor: 1, explica: "Salir rápido está bien, pero el plan es salir de la sala contando a cada niño." },
                  { texto: "Una sale primero a ver si es en serio, y la otra se queda esperando.", valor: 0, explica: "Hay un plan para salir de la sala contando a cada niño: se sigue el plan." },
                ],
              },
            ],
          },
          {
            apoyo: "en cada sala hay al menos dos adultos seleccionados, mejor si no son de la misma familia",
            ref: "Nehemías 4:9",
            situacion: "Eres coordinador de niños y organizas a los maestros del domingo. Tienes pocos voluntarios seleccionados.",
            escenas: [
              {
                id: "e1",
                narra: "Un matrimonio de maestros seleccionados se ofrece a dar juntos la clase de los de 9 a 11 años.",
                pregunta: "¿Cómo los organizas?",
                opciones: [
                  { texto: "Cada uno en una sala distinta, con otro adulto seleccionado.", valor: 2, explica: "En cada sala hay al menos dos adultos seleccionados, mejor si no son de la misma familia." },
                  { texto: "Juntos en la misma sala, porque son dos adultos seleccionados.", valor: 1, explica: "Cumplen la regla de los dos adultos, pero es mejor si no son de la misma familia." },
                  { texto: "Cada uno solo en una sala, para poder cubrir más clases ese día.", valor: 0, explica: "Nunca hay un solo adulto a solas con un niño: en cada sala hay al menos dos adultos seleccionados." },
                ],
              },
              {
                id: "e2",
                narra: "El domingo, un maestro avisa que llegará tarde, y su compañero queda solo con un niño que llegó temprano.",
                pregunta: "¿Qué hace su compañero?",
                opciones: [
                  { texto: "Se une con la sala de al lado hasta que llegue el otro maestro.", valor: 2, explica: "Si falta un maestro, la clase se une con otra sala, o se busca a otro adulto seleccionado; nunca se queda uno solo." },
                  { texto: "Le pide a un adulto del pasillo, que no fue seleccionado, que lo acompañe.", valor: 1, explica: "No se queda solo, pero se busca a otro adulto seleccionado." },
                  { texto: "Se queda solo con el niño en la sala, con la puerta cerrada, y espera.", valor: 0, explica: "Nunca hay un solo adulto a solas con un niño, y lo que pasa en la sala se puede ver desde afuera." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar la clase, dos niños se pelearon y uno tiene un rasguño en el brazo.",
                pregunta: "¿Qué hacen los maestros?",
                opciones: [
                  { texto: "Lo anotan, y se lo cuentan a los padres y también al coordinador.", valor: 2, explica: "Al final, los maestros anotan cualquier herida, pelea o cosa extraña, y se la cuentan a los padres y al coordinador." },
                  { texto: "Se lo cuentan a los padres al salir, pero no lo anotan en ningún lado.", valor: 1, explica: "Contarlo a los padres está bien, pero también se anota y se le cuenta al coordinador." },
                  { texto: "No dicen nada, para que los padres no se preocupen por algo tan pequeño.", valor: 0, explica: "Los maestros anotan cualquier herida, pelea o cosa extraña, y se la cuentan a los padres y al coordinador." },
                ],
              },
              {
                id: "e4",
                narra: "Un voluntario vuelve a quedarse a solas con un niño, aunque ya se lo recordaste en privado.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Deja de servir hasta que cumpla la regla, que vale para todos.", valor: 2, explica: "Si lo repite, deja de servir hasta que la cumpla. Las reglas valen para todos." },
                  { texto: "Se lo vuelves a recordar en privado, y lo dejas seguir sirviendo.", valor: 1, explica: "Recordárselo en privado es el primer paso; si lo repite, deja de servir hasta que cumpla la regla." },
                  { texto: "Lo dejas seguir, porque es un voluntario muy bueno y muy querido.", valor: 0, explica: "Las reglas valen para todos: si lo repite, deja de servir hasta que la cumpla." },
                ],
              },
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
            consigna: "Ordena en el tiempo lo que pasa un domingo en la clase de niños, del primer momento al último.",
            eventos: [
              { texto: "Los dos maestros oran juntos y revisan la sala", fecha: "Antes de abrir" },
              { texto: "Cada niño recibe una etiqueta con un número", fecha: "La llegada" },
              { texto: "Los dos maestros están siempre en la sala", fecha: "Durante la clase" },
              { texto: "Cada niño se entrega solo a quien tiene su número", fecha: "La salida" },
              { texto: "Los maestros anotan cualquier herida o pelea", fecha: "Al final" },
            ],
            apoyo: "Ejemplo resuelto: un domingo, paso a paso",
            explica: "Antes de abrir, los maestros oran y revisan la sala; a la llegada, cada niño recibe una etiqueta con un número, y quien lo trae, otra igual; durante la clase, los dos maestros están en la sala; a la salida, cada niño se entrega solo a quien tiene su número; y al final se anota cualquier herida o pelea.",
          },
          {
            consigna: "Ordena en el tiempo el registro y el cuidado de un domingo, del primer momento al último.",
            eventos: [
              { texto: "Se revisa la ventana de la puerta, el botiquín y la lista de alergias", fecha: "Antes de abrir" },
              { texto: "Quien trae al niño recibe una etiqueta con el mismo número", fecha: "La llegada" },
              { texto: "Si un niño va al baño, va con otros niños y un adulto en la puerta", fecha: "Durante la clase" },
              { texto: "El maestro pide la etiqueta antes de entregar a cada niño", fecha: "La salida" },
              { texto: "Se cuenta a los padres y al coordinador cualquier cosa extraña", fecha: "Al final" },
            ],
            apoyo: "La llegada: un adulto atiende el registro; cada niño recibe una etiqueta con un número, y quien lo trae recibe otra con el mismo número",
            explica: "Antes de abrir se revisa la sala; a la llegada, un adulto atiende el registro y quien trae al niño recibe una etiqueta con su número; durante la clase, el baño va en grupo; a la salida, el maestro entrega a cada niño solo a quien tiene su etiqueta; y al final se cuenta cualquier cosa extraña.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un tío de Samuel, que no tiene etiqueta, llega a la salida y te dice: Su mamá me pidió que lo recogiera hoy; ella está ocupada.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "No se lo entrego sin etiqueta, y llamo a sus padres por teléfono.", bien: true, explica: "Si alguien sin etiqueta quiere llevarse a un niño, no se le entrega; el maestro llama a los padres." },
              { texto: "Se lo entrego, porque Samuel lo conoce y lo saluda muy contento.", explica: "Cada niño se entrega solo a quien lo trajo o a quien sus padres autorizaron: el que no tiene etiqueta no se lo lleva." },
              { texto: "Se lo entrego si me deja escritos su nombre y su teléfono en un papel.", explica: "Un papel no reemplaza la etiqueta: si alguien sin etiqueta quiere llevarse a un niño, no se le entrega." },
              { texto: "Le pido que espere afuera, y dejo que Samuel salga solo a buscarlo.", explica: "El maestro entrega a cada niño solo a quien tiene la etiqueta con su número." },
            ],
            apoyo: "Si viene otra persona: si alguien sin etiqueta quiere llevarse a un niño, no se le entrega; el maestro llama a los padres",
            explica: "El registro cuida a cada niño: solo se entrega a quien tiene la etiqueta con su número. Si viene otra persona, no se le entrega, y el maestro llama a los padres.",
          },
          {
            caso: "Una madre nueva te dice al dejar a su hija: ¿Para qué tanta etiqueta? Yo la vengo a buscar siempre.",
            pregunta: "¿Qué le explicas?",
            opciones: [
              { texto: "Que la niña solo se entrega a quien tiene la etiqueta con su número.", bien: true, explica: "Cada niño recibe una etiqueta con un número, y quien lo trae recibe otra con el mismo número; a la salida se entrega solo a quien la tiene." },
              { texto: "Que tiene razón, y que ella puede llevársela sin mostrar nada.", explica: "Cada niño se entrega solo a quien tiene la etiqueta con su número: así se cuida a cada niño." },
              { texto: "Que la etiqueta es solo para contar cuántos niños vinieron hoy.", explica: "La etiqueta sirve para entregar a cada niño solo a quien tiene su número." },
              { texto: "Que la etiqueta es para los padres nuevos, y después ya no hará falta.", explica: "El registro vale para todos: cada niño se anota al llegar y se entrega solo a quien tiene su número." },
            ],
            apoyo: "El registro de entrada y salida: cada niño se anota al llegar, y solo se entrega a quien lo trajo o a quien sus padres autorizaron",
            explica: "Cada niño se anota al llegar y recibe una etiqueta con un número; quien lo trae recibe otra igual. A la salida, el maestro entrega a cada niño solo a quien tiene la etiqueta con su número.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un contacto apropiado con un niño o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Contacto apropiado", "Contacto que no es apropiado"],
            frases: [
              { texto: "Un abrazo de lado", grupo: 0 },
              { texto: "Chocar las manos", grupo: 0 },
              { texto: "Una mano en el hombro", grupo: 0 },
              { texto: "Un contacto que el niño no quiere", grupo: 1 },
              { texto: "Insistir en abrazar a un niño que se aparta", grupo: 1 },
              { texto: "Un contacto en las partes privadas del cuerpo", grupo: 1 },
            ],
            apoyo: "El contacto apropiado: un abrazo de lado, chocar las manos o una mano en el hombro",
            explica: "Un abrazo de lado, chocar las manos o una mano en el hombro son contactos apropiados; nunca un contacto que el niño no quiere, ni en las partes privadas del cuerpo.",
          },
          {
            consigna: "En los mensajes y las fotos, ¿es apropiado o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Apropiado en mensajes y fotos", "No es apropiado en mensajes y fotos"],
            frases: [
              { texto: "Escribirles a los padres del niño", grupo: 0 },
              { texto: "Escribir en un grupo donde hay otro adulto", grupo: 0 },
              { texto: "Publicar una foto con permiso de los padres y sin su nombre", grupo: 0 },
              { texto: "Escribirle en privado a un niño", grupo: 1 },
              { texto: "Publicar el nombre del niño y dónde vive", grupo: 1 },
              { texto: "Publicar fotos del niño sin el permiso de sus padres", grupo: 1 },
            ],
            apoyo: "La comunicación: ningún adulto se escribe en privado con un niño; los mensajes van a los padres o a un grupo donde hay otro adulto",
            explica: "Los mensajes van a los padres o a un grupo donde hay otro adulto, y ningún adulto se escribe en privado con un niño. Las fotos, solo con el permiso de los padres y sin publicar el nombre del niño ni dónde vive.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace la iglesia, como el pueblo de Nehemías.",
            texto: "Como el pueblo de Nehemías, la iglesia [[ora]] por los niños y también pone [[guardas]]: todo se hace a la [[vista]] de otros.",
            distractores: ["cobra", "excusas", "espalda"],
            errores: {
              cobra: "La iglesia ora por los niños, como el pueblo oró al reconstruir el muro.",
              excusas: "La iglesia ora y también pone guardas: las reglas que se cumplen cada domingo.",
              espalda: "En el ministerio de niños todo se hace a la vista de otros.",
            },
            apoyo: "La iglesia hace lo mismo: ora por los niños y también pone guardas",
            ref: "Nehemías 4:9",
            explica: "El pueblo oró y puso guarda de día y de noche: la iglesia ora por los niños y también pone guardas. Y, como Pablo, hace las cosas honradamente: todo se hace a la vista de otros.",
          },
          {
            consigna: "Completa las reglas de cada sala.",
            texto: "En cada sala hay al menos dos [[adultos]] seleccionados, y las puertas quedan [[abiertas]] o con [[ventana]]: lo que pasa se puede ver desde afuera.",
            distractores: ["niños", "cerradas", "candado"],
            errores: {
              "niños": "La regla habla de dos adultos seleccionados en cada sala.",
              cerradas: "Las puertas quedan abiertas o con ventana, para que se vea desde afuera.",
              candado: "Las puertas tienen ventana: lo que pasa en la sala se puede ver desde afuera.",
            },
            apoyo: "en cada sala hay al menos dos adultos seleccionados, mejor si no son de la misma familia",
            explica: "En cada sala hay al menos dos adultos seleccionados, mejor si no son de la misma familia, y las puertas quedan abiertas o con ventana: lo que pasa en la sala se puede ver desde afuera.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El contacto apropiado: un abrazo de lado, chocar las manos o una mano en el hombro; nunca un contacto que el niño no quiere, ni en las partes privadas del cuerpo",
            ref: "1 Tesalonicenses 5:22",
            clave: {
              id: "pr-ninez-4-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué contacto y qué comunicación con los niños son apropiados, y cuáles no lo son?",
              ideas: [
                { id: "contacto", peso: 35, texto: "Es apropiado un abrazo de lado, chocar las manos o una mano en el hombro.", formas: ["abrazo de lado", "abrazo lateral", "chocar las manos", "chocar manos", "choc* (la|las) mano*", "mano en el hombro"] },
                { id: "nunca", peso: 30, negativa: true, texto: "Nunca un contacto que el niño no quiere, ni en las partes privadas del cuerpo.", formas: ["no quiere", "no le gusta", "partes privadas", "partes intimas"] },
                { id: "mensajes", peso: 35, texto: "Ningún adulto se escribe en privado con un niño: los mensajes van a los padres o a un grupo donde hay otro adulto.", formas: ["a los padres", "a sus padres", "con los padres", "un grupo", "otro adulto"] },
              ],
              errores: [
                { id: "privado", texto: "Ningún adulto se escribe en privado con un niño.", formas: ["escrib* en privado", "escrib* por privado", "mensaj* privad* (a|con) (un|una|los|las) nin*"], anula: "mensajes" },
              ],
              modelo: "Es apropiado un abrazo de lado, chocar las manos o una mano en el hombro, pero nunca un contacto que el niño no quiere ni en las partes privadas. Ningún adulto le escribe en privado a un niño: los mensajes van a los padres o a un grupo con otro adulto.",
            },
          },
          {
            apoyo: "El que nunca se queda a solas con un niño está protegido de una acusación falsa",
            ref: "1 Tesalonicenses 5:22",
            clave: {
              id: "pr-ninez-4-4-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué las reglas del domingo también protegen al maestro?",
              ideas: [
                { id: "solas", peso: 40, texto: "El que nunca se queda a solas con un niño está protegido de una acusación falsa.", formas: ["acusacion falsa", "acusaciones falsas", "falsa acusacion", "falsas acusaciones", "lo acusen", "le acusen", "acusarlo", "acusen falsamente"] },
                { id: "vista", peso: 35, texto: "Todo se hace a la vista de otros, honradamente delante del Señor y de los hombres.", formas: ["a la vista", "vista de otros", "honradamente", "delante de los hombres", "desde afuera", "puertas abiertas", "con ventana", "dos adultos"] },
                { id: "todos", peso: 25, texto: "Las reglas valen para todos: absteneos de toda especie de mal.", formas: ["valen para todos", "para todos", "absteneos", "toda especie de mal", "especie de mal"] },
              ],
              modelo: "Porque el que nunca se queda a solas con un niño está protegido de una acusación falsa. Todo se hace a la vista de otros, honradamente delante del Señor y de los hombres, y las reglas valen para todos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Cuando un niño cuenta algo: lo que pide la ley en Texas
    "ninez-4-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace el adulto que escucha a un niño y lo reporta?", reverso: "Habla por él: abre su boca por el que no tiene voz.", apoyo: "El adulto que lo escucha y lo reporta habla por él" },
              { frente: "¿Por qué no muestras espanto ni enojo cuando un niño te cuenta algo?", reverso: "Porque el niño podría pensar que te enojaste con él.", apoyo: "aunque te duela, no muestres espanto ni enojo; el niño podría pensar que te enojaste con él" },
              { frente: "¿Qué le dices al niño que te contó un abuso?", reverso: "Que hizo bien en contarlo y que no es su culpa.", apoyo: "Paso 3, creerle y agradecerle: dile que hizo bien en contarlo y que no es su culpa" },
              { frente: "¿Quiénes hacen las preguntas sobre lo que pasó?", reverso: "Los investigadores.", apoyo: "las preguntas las hacen los investigadores" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué no le prometes al niño guardar el secreto?", reverso: "Porque lo vas a contar a las personas que pueden ayudarlo.", apoyo: "Paso 4, no prometer el secreto: dile que lo vas a contar solo a las personas que pueden ayudarlo" },
              { frente: "¿Qué anotas cuanto antes, después de escuchar al niño?", reverso: "Lo que dijo, con sus mismas palabras, la fecha y la hora.", apoyo: "Paso 6, escribir: anota cuanto antes lo que dijo, con sus mismas palabras, la fecha y la hora" },
              { frente: "¿Qué ejemplo da la lección de una pregunta que sugiere la respuesta?", reverso: "¿Fue tal persona?", apoyo: "no hagas muchas preguntas ni preguntas que sugieran la respuesta, como ¿fue tal persona?" },
              { frente: "¿Cómo escuchas al niño que te cuenta algo?", reverso: "Dejo que hable con sus palabras, sin interrumpirlo.", apoyo: "Paso 2, escuchar: deja que hable con sus palabras, sin interrumpirlo" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Paso 1, mantener la calma: aunque te duela, no muestres espanto ni enojo; el niño podría pensar que te enojaste con él",
            ref: "Proverbios 31:8-9",
            situacion: "Eres maestro de la clase de los de 8 a 10 años. Al final de la clase, Gabriel, de 9 años, se te acerca y te dice en voz baja que alguien de su familia le hace cosas que lo asustan.",
            escenas: [
              {
                id: "e1",
                narra: "Gabriel te mira nervioso, esperando lo que vas a decir.",
                pregunta: "¿Cómo reaccionas?",
                opciones: [
                  { texto: "Mantienes la calma y dejas que hable con sus propias palabras.", valor: 2, explica: "Aunque te duela, no muestres espanto ni enojo, y deja que hable con sus palabras, sin interrumpirlo.", siguiente: "e2" },
                  { texto: "Te asustas y le dices: ¡Qué horror! ¿Cómo pudo pasar algo así?", valor: 0, explica: "No muestres espanto ni enojo: el niño podría pensar que te enojaste con él.", siguiente: "e1b" },
                  { texto: "Mantienes la calma, pero lo interrumpes a cada rato para calmarlo.", valor: 1, explica: "La calma está bien, pero deja que hable con sus palabras, sin interrumpirlo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Gabriel baja la mirada y se queda callado.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Te calmas, le dices que hizo bien en contarlo y lo escuchas.", valor: 2, explica: "Creerle y agradecerle: dile que hizo bien en contarlo y que no es su culpa.", siguiente: "e2" },
                  { texto: "Le insistes con muchas preguntas, para que siga contando todo.", valor: 0, explica: "No hagas muchas preguntas: las preguntas las hacen los investigadores.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Gabriel cuenta un poco más, pero no dice quién fue.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que hizo bien en contarlo y que no es su culpa.", valor: 2, explica: "Creerle y agradecerle, sin interrogarlo: las preguntas las hacen los investigadores." },
                  { texto: "¿Fue tu tío? Dime si fue él, para saber qué hacer.", valor: 0, explica: "No hagas preguntas que sugieran la respuesta, como ¿fue tal persona?: las preguntas las hacen los investigadores." },
                  { texto: "Que no es su culpa, y le preguntas qué pasó exactamente.", valor: 1, explica: "Decirle que no es su culpa está bien, pero no lo interrogues: las preguntas las hacen los investigadores." },
                ],
              },
              {
                id: "e3",
                narra: "Gabriel te pide: No se lo digas a nadie, ¿me lo prometes?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no puedes prometerlo: lo sabrán solo quienes pueden ayudarlo.", valor: 2, explica: "No prometas el secreto: dile que lo vas a contar solo a las personas que pueden ayudarlo." },
                  { texto: "Que se lo prometes, para que siga confiando en ti como su maestro.", valor: 0, explica: "No prometas el secreto: dile que lo vas a contar solo a las personas que pueden ayudarlo." },
                  { texto: "Que se lo vas a contar a toda la clase, para que todos lo cuiden.", valor: 0, explica: "Lo cuentas solo a las personas que pueden ayudarlo: no se cuenta a otros que no necesitan saberlo." },
                ],
              },
            ],
          },
          {
            apoyo: "Paso 5, no interrogar: no hagas muchas preguntas ni preguntas que sugieran la respuesta, como ¿fue tal persona?; las preguntas las hacen los investigadores",
            ref: "Proverbios 31:8-9",
            situacion: "Eres ayudante en la clase de niños. Durante el refrigerio, Camila, de 7 años, te dice que no quiere volver a su casa, porque allí le pasa algo feo.",
            escenas: [
              {
                id: "e1",
                narra: "Camila empieza a contarte más, y a ti te duele mucho lo que oyes.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La escuchas con calma y dejas que hable con sus palabras.", valor: 2, explica: "Aunque te duela, no muestres espanto ni enojo: deja que hable con sus palabras, sin interrumpirla." },
                  { texto: "Te enojas mucho y le dices que eso es terrible.", valor: 0, explica: "No muestres espanto ni enojo: la niña podría pensar que te enojaste con ella." },
                  { texto: "La escuchas, pero la corriges cada vez que no se explica bien.", valor: 1, explica: "Escucharla está bien, pero deja que hable con sus palabras, sin interrumpirla." },
                ],
              },
              {
                id: "e2",
                narra: "Camila termina de hablar y te mira con miedo.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que hizo bien en contarlo y que no es su culpa.", valor: 2, explica: "Creerle y agradecerle: dile que hizo bien en contarlo y que no es su culpa." },
                  { texto: "Que tal vez entendió mal lo que le pasó en su casa.", valor: 0, explica: "Se le cree al niño: dile que hizo bien en contarlo y que no es su culpa." },
                  { texto: "Que le crees, y que mañana vas a pensar qué hacer.", valor: 1, explica: "Creerle está bien, pero lo que te contó se reporta de inmediato." },
                ],
              },
              {
                id: "e3",
                narra: "Camila vuelve con su grupo, y tú te quedas pensando en lo que te dijo.",
                pregunta: "¿Qué haces enseguida?",
                opciones: [
                  { texto: "Anotas lo que dijo, con sus palabras, la fecha y la hora.", valor: 2, explica: "Anota cuanto antes lo que dijo, con sus mismas palabras, la fecha y la hora." },
                  { texto: "Anotas un resumen con lo que tú entendiste de lo que pasó.", valor: 1, explica: "Anotar está bien, pero con sus mismas palabras, la fecha y la hora." },
                  { texto: "No anotas nada, para que no quede nada escrito sobre esto.", valor: 0, explica: "Anota cuanto antes lo que dijo, con sus mismas palabras, la fecha y la hora." },
                ],
              },
              {
                id: "e4",
                narra: "Ya lo anotaste todo.",
                pregunta: "¿Y ahora qué haces?",
                opciones: [
                  { texto: "Llamas enseguida a la línea de reporte y avisas al responsable.", valor: 2, explica: "Reporta de inmediato: llama a la línea de reporte y avisa al responsable del ministerio." },
                  { texto: "Llamas a la línea de reporte, y al ministerio le avisarás otro día.", valor: 1, explica: "Reportar está bien, pero también se avisa de inmediato al responsable del ministerio." },
                  { texto: "Se lo cuentas al pastor y esperas a que él decida qué hacer.", valor: 0, explica: "Contárselo al pastor no cumple con la ley, y no se espera a que el pastor decida: se reporta de inmediato." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de lo que pide la ley en Texas con lo que dice la lección.",
            pares: [
              ["Los profesionales, como los maestros y las enfermeras", "Lo reportan a más tardar 24 horas después de tener causa razonable"],
              ["Los pastores, los abogados y los consejeros", "También deben reportarlo, sin excepción"],
              ["No reportar a sabiendas", "Es un delito menor de clase A"],
              ["Quien reporta de buena fe", "Está protegido por la ley"],
            ],
            apoyo: "Los profesionales, como los maestros, las enfermeras, los médicos y los empleados de guarderías, deben reportarlo a más tardar 24 horas después de tener causa razonable para creerlo",
            explica: "Los profesionales lo reportan a más tardar 24 horas después de tener causa razonable para creerlo; la obligación vale sin excepción para los pastores, los abogados y los consejeros; no reportar a sabiendas es un delito menor de clase A; y la ley protege a quien reporta de buena fe.",
          },
          {
            consigna: "Une cada caso con lo que dice la lección sobre cómo y adónde se reporta en Texas.",
            pares: [
              ["Toda persona con causa razonable para creerlo", "Debe reportarlo de inmediato"],
              ["Si el niño corre peligro ahora", "Se llama al 911"],
              ["La Línea directa de Texas para reportar abuso", "Al 1-800-252-5400, a cualquier hora"],
              ["Contárselo solo al pastor", "No cumple con la ley"],
            ],
            apoyo: "Toda persona que tiene causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato",
            explica: "Toda persona con causa razonable para creerlo debe reportarlo de inmediato, a la Línea directa de Texas, al 1-800-252-5400, a cualquier hora; en una emergencia, o si el niño corre peligro ahora, se llama al 911. Contárselo al pastor no cumple con la ley.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que pide la ley en Texas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En Texas, también los pastores deben reportar, aunque reciban confidencias.", verdad: true, explica: "La obligación vale sin excepción también para quienes reciben confidencias, como los pastores, los abogados y los consejeros.", apoyo: "La obligación vale sin excepción también para quienes reciben confidencias, como los pastores, los abogados y los consejeros" },
              { texto: "Para reportar un abuso hace falta tener pruebas.", verdad: false, explica: "No hace falta tener pruebas: basta con tener causa razonable para creerlo. Investigar es tarea de las autoridades.", apoyo: "Y no hace falta tener pruebas: basta con tener causa razonable para creerlo" },
              { texto: "Un profesional puede pedirle a otro que haga el reporte por él.", verdad: false, explica: "Los profesionales deben reportarlo a más tardar 24 horas después de tener causa razonable para creerlo, y no pueden pedirle a otro que lo haga por ellos.", apoyo: "y no pueden pedirle a otro que lo haga por ellos" },
            ],
          },
          {
            consigna: "Sobre el reporte de un abuso en Texas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La ley protege a quien reporta de buena fe.", verdad: true, explica: "Así lo dice el Código de Familia de Texas, en la sección 261.106.", apoyo: "La ley protege a quien reporta de buena fe" },
              { texto: "Los profesionales deben reportarlo a más tardar 24 horas después de tener causa razonable.", verdad: true, explica: "Los profesionales, como los maestros, las enfermeras, los médicos y los empleados de guarderías, deben reportarlo a más tardar 24 horas después de tener causa razonable para creerlo.", apoyo: "deben reportarlo a más tardar 24 horas después de tener causa razonable para creerlo" },
              { texto: "Contárselo al pastor ya cumple con lo que pide la ley.", verdad: false, explica: "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades.", apoyo: "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades" },
              { texto: "La Línea directa de Texas atiende solo en horario de oficina.", verdad: false, explica: "Se reporta a la Línea directa de Texas, al 1-800-252-5400, a cualquier hora.", apoyo: "Se reporta a la Línea directa de Texas para reportar abuso, al 1-800-252-5400, a cualquier hora" },
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
            consigna: "Ante la sospecha de un abuso, ¿se hace o no se hace? Lleva cada frase a su grupo.",
            grupos: ["Se hace ante un abuso", "No se hace ante un abuso"],
            frases: [
              { texto: "Llamar a la línea de reporte", grupo: 0 },
              { texto: "Avisar al responsable del ministerio", grupo: 0 },
              { texto: "Llamar al 911 si el niño corre peligro ahora", grupo: 0 },
              { texto: "Buscar a otros niños para preguntarles", grupo: 1 },
              { texto: "Hablar antes con la persona acusada", grupo: 1 },
              { texto: "Esperar a que el pastor decida", grupo: 1 },
              { texto: "Arreglarlo en privado con una disculpa", grupo: 1 },
            ],
            apoyo: "No se investiga por cuenta propia, ni se busca a otros niños para preguntarles",
            explica: "Se llama a la línea de reporte, o al 911 si el niño corre peligro ahora, y se avisa al responsable del ministerio. No se busca a otros niños para preguntarles, no se habla antes con el acusado, no se espera a que el pastor decida y no se resuelve en privado.",
          },
          {
            consigna: "Después de que un niño cuenta algo, ¿se hace o no se hace? Lleva cada frase a su grupo.",
            grupos: ["Se hace ante un abuso", "No se hace ante un abuso"],
            frases: [
              { texto: "Reportar aunque no haya pruebas", grupo: 0 },
              { texto: "Avisar a la iglesia para proteger a los demás niños", grupo: 0 },
              { texto: "Dejar que investiguen las autoridades", grupo: 0 },
              { texto: "Contarlo a hermanos que no necesitan saberlo", grupo: 1 },
              { texto: "Hablar con la familia del acusado antes que las autoridades", grupo: 1 },
              { texto: "Cambiar el reporte por una disciplina de la iglesia", grupo: 1 },
              { texto: "Investigar por cuenta propia hasta tener pruebas", grupo: 1 },
            ],
            apoyo: "Avisar a la iglesia también es necesario, para proteger a los demás niños, pero no reemplaza el reporte",
            explica: "Se reporta aunque no haya pruebas, se avisa a la iglesia para proteger a los demás niños y la investigación queda para las autoridades. No se cuenta a quien no necesita saberlo, no se habla antes con el acusado ni con su familia, y una disciplina no reemplaza el reporte.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades",
            ref: "Romanos 13:3-4",
            titulo: "Lo que contó Daniela",
            relato: [
              "Eres maestra de niños en una iglesia de Texas. Después del culto, Daniela, de 10 años, te contó que un adulto conocido de su familia le hace daño y le pidió que guardara el secreto.",
              "La escuchaste con calma, le dijiste que hizo bien en contarlo y que no es su culpa, y anotaste sus palabras con la fecha y la hora.",
              "Daniela ya está con su grupo y no corre peligro en este momento. Ahora tienes que decidir qué hacer.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A quién le toca hacer el reporte?",
                opciones: [
                  { texto: "A mí: toda persona con causa razonable debe reportarlo.", bien: true, explica: "Toda persona que tiene causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato." },
                  { texto: "Al pastor: a mí solo me toca contárselo a él y esperar su decisión.", explica: "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades." },
                  { texto: "A sus padres, si ellos deciden que hay que hacerlo.", explica: "La obligación es de toda persona que tiene causa razonable para creerlo: no se espera a que otros decidan." },
                ],
                apoyo: "Toda persona que tiene causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato",
                explica: "En Texas, toda persona con causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato.",
              },
              {
                tipo: "situacion",
                pregunta: "Como Daniela no corre peligro ahora mismo, ¿adónde llamas?",
                opciones: [
                  { texto: "A la Línea directa de Texas, al 1-800-252-5400.", bien: true, explica: "Se reporta a la Línea directa de Texas para reportar abuso, al 1-800-252-5400, a cualquier hora; el 911 es para una emergencia." },
                  { texto: "A nadie todavía: primero hay que juntar las pruebas.", explica: "No hace falta tener pruebas: basta con tener causa razonable para creerlo." },
                  { texto: "Al adulto conocido, para escuchar también su versión.", explica: "No se habla con la persona acusada antes de que actúen las autoridades: podría poner al niño en peligro o borrar pruebas." },
                ],
                apoyo: "Se reporta a la Línea directa de Texas para reportar abuso, al 1-800-252-5400, a cualquier hora",
                explica: "La Línea directa de Texas atiende a cualquier hora, y cuando no es una emergencia también se puede reportar por internet. Si el niño corre peligro ahora, se llama al 911.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano te propone hablar primero con ese adulto, para estar seguros. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que no: podría poner a la niña en peligro o borrar pruebas.", bien: true, explica: "No se habla con la persona acusada ni con su familia antes de que actúen las autoridades." },
                  { texto: "Que sí: no hay que acusar a nadie sin escucharlo primero.", explica: "Investigar es tarea de las autoridades, y no se habla con el acusado antes de que actúen." },
                  { texto: "Que sí, pero en una reunión con el pastor y con la familia de él.", explica: "No se resuelve en privado con una reunión, y no se habla con el acusado ni con su familia antes de que actúen las autoridades." },
                ],
                apoyo: "No se habla con la persona acusada ni con su familia antes de que actúen las autoridades: podría poner al niño en peligro o borrar pruebas",
                explica: "Hablar antes con la persona acusada podría poner al niño en peligro o borrar pruebas: investigar es tarea de las autoridades.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya hiciste el reporte. ¿Qué haces con la iglesia?",
                opciones: [
                  { texto: "Aviso al responsable del ministerio, para proteger a los demás niños.", bien: true, explica: "Avisar a la iglesia también es necesario, para proteger a los demás niños, pero no reemplaza el reporte." },
                  { texto: "Lo cuento en la reunión de oración, para que todos los hermanos oren por ella.", explica: "No se cuenta a otros hermanos que no necesitan saberlo." },
                  { texto: "No le digo nada a nadie de la iglesia, ni siquiera al responsable.", explica: "Avisar a la iglesia también es necesario, para proteger a los demás niños." },
                ],
                apoyo: "Avisar a la iglesia también es necesario, para proteger a los demás niños, pero no reemplaza el reporte",
                explica: "Después del reporte se avisa al responsable del ministerio, para proteger a los demás niños, sin contarlo a quien no necesita saberlo.",
              },
              {
                tipo: "explica",
                apoyo: "Reportar un abuso no es traicionar a la iglesia: es dejar que el servidor de Dios haga su trabajo",
                clave: {
                  id: "pr-ninez-4-5-a6-1",
                  tipo: "corta",
                  pregunta: "Otra maestra te dice que reportar lo que contó Daniela es traicionar a la iglesia. ¿Qué le explicas?",
                  ideas: [
                    { id: "servidor", peso: 50, texto: "Reportar un abuso no es traicionar a la iglesia: es dejar que el servidor de Dios, la autoridad, haga su trabajo.", formas: ["servidor de dios", "haga su trabajo", "hagan su trabajo", "dios puso a las autoridades", "para (tu|nuestro|su) bien", "no es traicion*", "no es traicionar"] },
                    { id: "esconde", peso: 50, texto: "La iglesia que esconde un abuso para cuidar su nombre pierde su testimonio y deja solo al niño.", formas: ["pierde su testimonio", "testimonio", "deja solo al nino", "deja sola a la nina", "dejar sola", "deja sola", "esconde* un abuso", "cuidar su nombre", "nada hay oculto", "manifestado"] },
                  ],
                  errores: [
                    { id: "traicion", texto: "Reportar un abuso no es traicionar a la iglesia.", formas: ["si es traicion*", "es traicionar a la iglesia", "tiene razon"], anula: "servidor" },
                  ],
                  modelo: "Le explico que reportar un abuso no es traicionar a la iglesia: es dejar que el servidor de Dios haga su trabajo. La iglesia que esconde un abuso para cuidar su nombre pierde su testimonio y deja sola a la niña.",
                },
              },
            ],
          },
          {
            apoyo: "No esperes a tener pruebas: basta con tener causa razonable para creerlo",
            ref: "Proverbios 31:8-9",
            titulo: "Lo que anotó la maestra de Joel",
            relato: [
              "Eres coordinador de niños en una iglesia de Texas. Una maestra te muestra lo que anotó durante un mes sobre Joel, de 6 años: moretones sin explicación, mucha hambre y miedo a irse a su casa.",
              "El pastor está de viaje hasta la semana que viene, y otro líder te dice: Esperemos a que vuelva; además, no tenemos pruebas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Hace falta tener pruebas para reportar?",
                opciones: [
                  { texto: "No: basta con tener causa razonable para creerlo.", bien: true, explica: "No hace falta tener pruebas: basta con tener causa razonable para creerlo." },
                  { texto: "Sí: sin pruebas, el reporte sería una acusación falsa.", explica: "No hace falta tener pruebas, y la ley protege a quien reporta de buena fe." },
                  { texto: "Sí: primero hay que confirmar con Joel lo que le pasa.", explica: "No se investiga por cuenta propia: investigar es tarea de las autoridades." },
                ],
                apoyo: "Y no hace falta tener pruebas: basta con tener causa razonable para creerlo",
                explica: "No hace falta tener pruebas: basta con tener causa razonable para creerlo. Investigar es tarea de las autoridades.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Esperan a que vuelva el pastor?",
                opciones: [
                  { texto: "No: se reporta de inmediato, sin esperar a que el pastor decida.", bien: true, explica: "No se espera a tener pruebas, ni a que el pastor decida: se reporta de inmediato." },
                  { texto: "Sí: una decisión tan seria solo la puede tomar el pastor de la iglesia.", explica: "Contárselo al pastor no cumple con la ley, y no se espera a que el pastor decida." },
                  { texto: "Sí, y mientras tanto le preguntamos a Joel quién le hace esos moretones.", explica: "No se espera a que el pastor decida, y no se interroga al niño: las preguntas las hacen los investigadores." },
                ],
                apoyo: "No se espera a tener pruebas, ni a que el pastor decida",
                explica: "Toda persona con causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato, sin esperar a que el pastor decida.",
              },
              {
                tipo: "situacion",
                pregunta: "El otro líder propone preguntarles a los demás niños de la clase si saben algo. ¿Qué le dices?",
                opciones: [
                  { texto: "Que no, porque investigar es tarea de las autoridades.", bien: true, explica: "No se investiga por cuenta propia, ni se busca a otros niños para preguntarles." },
                  { texto: "Que sí: así juntamos pruebas antes de hacer el reporte.", explica: "No hace falta tener pruebas, y no se busca a otros niños para preguntarles." },
                  { texto: "Que sí, pero solo a los niños más grandes de la clase.", explica: "No se busca a otros niños para preguntarles: investigar es tarea de las autoridades." },
                ],
                apoyo: "No se investiga por cuenta propia, ni se busca a otros niños para preguntarles",
                explica: "Investigar es tarea de las autoridades: no se investiga por cuenta propia, ni se busca a otros niños para preguntarles.",
              },
              {
                tipo: "explica",
                apoyo: "Paso 7, reportar de inmediato: llama a la línea de reporte y avisa al responsable del ministerio",
                clave: {
                  id: "pr-ninez-4-5-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué vas a hacer ahora con lo que anotó la maestra sobre Joel?",
                  ideas: [
                    { id: "reportar", peso: 50, texto: "Reportarlo de inmediato a la Línea directa de Texas, al 1-800-252-5400, o al 911 si Joel corre peligro ahora.", formas: ["report*", "linea directa", "linea de reporte", "1 800 252 5400", "5400", "911", "denunci*", "llam* a la linea", "a las autoridades"] },
                    { id: "avisar", peso: 50, texto: "Avisar al responsable del ministerio, sin investigar por cuenta propia.", formas: ["avis* al responsable", "responsable del ministerio", "avis* a la iglesia", "avis* al ministerio", "avis* al pastor", "sin investigar", "no investig*", "tarea de las autoridades"] },
                  ],
                  errores: [
                    { id: "esperar", texto: "No se espera a tener pruebas, ni a que el pastor decida.", formas: ["esper* (a|al) (que|el) (vuelva|regrese|pastor)", "esper* (a|al) tener pruebas", "esper* pruebas", "esper* al pastor"], anula: "reportar" },
                  ],
                  modelo: "Voy a reportarlo de inmediato a la Línea directa de Texas, al 1-800-252-5400, sin esperar a que vuelva el pastor. Después aviso al responsable del ministerio, y no investigo por mi cuenta: eso es tarea de las autoridades.",
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
            apoyo: "Toda persona que tiene causa razonable para creer que un niño sufre abuso o negligencia debe reportarlo de inmediato",
            ref: "Proverbios 31:8-9",
            clave: {
              id: "pr-ninez-4-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué pide la ley de Texas a quien sospecha que un niño sufre abuso o negligencia?",
              ideas: [
                { id: "inmediato", peso: 40, texto: "Toda persona con causa razonable para creerlo debe reportarlo de inmediato.", formas: ["de inmediato", "inmediatamente", "enseguida", "en seguida", "cuanto antes", "lo antes posible", "sin esperar", "ya mismo"] },
                { id: "plazo", peso: 30, texto: "Los profesionales, como los maestros, deben reportarlo a más tardar 24 horas después de tener causa razonable.", formas: ["24 horas", "veinticuatro horas", "24 hrs", "24h", "24 h"] },
                { id: "pastores", peso: 30, negativa: true, texto: "La obligación vale sin excepción también para los pastores y para quienes reciben confidencias.", formas: ["sin excepcion", "no hay excepcion", "ninguna excepcion", "tambien (los|el) pastor*", "pastor* tambien", "incluso (los|el) pastor*", "ni siquiera (los|el) pastor*", "confidencias"] },
              ],
              errores: [
                { id: "otro-plazo", texto: "El plazo que da la lección para los profesionales es de 24 horas.", formas: ["48 horas", "cuarenta y ocho", "48 hrs", "48h", "48 h", "dos dias", "72 horas"], anula: "plazo" },
                { id: "pastor-exento", texto: "La obligación vale sin excepción también para los pastores.", formas: ["pastor* no (tienen|tiene|deben|debe) que report*", "pastor* no (tienen|tiene|deben|debe) report*", "excepto (los|el) pastor*", "menos (los|el) pastor*", "pastor* (estan|esta) exent*", "pastor* (son|es) una excepcion"], anula: "pastores" },
              ],
              modelo: "Debe reportarlo de inmediato a la Línea directa de Texas, al 1-800-252-5400, o al 911 en una emergencia. Los profesionales, como los maestros, a más tardar 24 horas después, y no hay excepción para los pastores.",
            },
          },
          {
            apoyo: "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades",
            ref: "Romanos 13:3-4",
            clave: {
              id: "pr-ninez-4-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Si sospecho un abuso, basta con decírselo al pastor. ¿Qué le explicas según la lección?",
              ideas: [
                { id: "autoridades", peso: 40, texto: "Contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades.", formas: ["no cumple", "a las autoridades", "las autoridades", "linea directa", "1 800 252 5400", "5400", "911", "linea de reporte"] },
                { id: "todos", peso: 30, texto: "Toda persona con causa razonable para creerlo debe reportarlo de inmediato, sin excepción para los pastores.", formas: ["toda persona", "cualquier persona", "de inmediato", "inmediatamente", "enseguida", "sin excepcion", "tambien los pastores", "yo (debo|tengo)", "uno mismo"] },
                { id: "pruebas", peso: 30, negativa: true, texto: "No hace falta tener pruebas: basta con tener causa razonable para creerlo.", formas: ["causa razonable", "sin pruebas", "no hace falta tener pruebas", "no hacen falta pruebas", "no (necesita|necesitas|necesito|necesitamos) pruebas"] },
              ],
              errores: [
                { id: "pastor-basta", texto: "Contárselo al pastor no reemplaza el reporte a las autoridades.", formas: ["basta con (decirselo|contarselo|decirle|contarle|avisarle) al pastor", "basta con el pastor", "tiene razon"], anula: "autoridades" },
              ],
              modelo: "Le explico que contárselo al pastor no cumple con la ley: el reporte se hace a las autoridades, a la Línea directa de Texas. Toda persona con causa razonable para creerlo debe reportarlo de inmediato, y no hace falta tener pruebas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Después del reporte: la víctima, su familia y la iglesia
    "ninez-4-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le dijo Absalón a Tamar?", reverso: "«Pues calla ahora, hermana mía; tu hermano es».", apoyo: "Su hermano Absalón le dijo: «Pues calla ahora, hermana mía; tu hermano es; no se angustie tu corazón por esto»" },
              { frente: "¿Qué hizo el rey David cuando oyó todo esto?", reverso: "Se enojó mucho, pero la Biblia no cuenta que hiciera algo.", apoyo: "pero la Biblia no cuenta que hiciera algo" },
              { frente: "¿Cómo quedó Tamar?", reverso: "Desconsolada, en casa de Absalón su hermano.", apoyo: "«Y se quedó Tamar desconsolada en casa de Absalón su hermano»" },
              { frente: "¿En qué terminó el silencio en la casa de David?", reverso: "En más violencia: dos años después, Absalón hizo matar a Amnón.", apoyo: "el silencio terminó en más violencia: dos años después, Absalón hizo matar a Amnón" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es reportar, según la lección?", reverso: "El primer paso, no el último.", apoyo: "Reportar es el primer paso, no el último" },
              { frente: "Después de un reporte, ¿qué queda?", reverso: "Un niño herido, una familia que sufre y una iglesia que necesita saber qué hacer.", apoyo: "Después quedan un niño herido, una familia que sufre y una iglesia que necesita saber qué hacer" },
              { frente: "¿A quién se cuidó en la casa de David porque era de la familia?", reverso: "Al agresor: «tu hermano es».", apoyo: "Se cuidó al agresor porque era de la familia: «tu hermano es»" },
              { frente: "¿Qué hace la iglesia, en lugar de quedarse en el enojo?", reverso: "Actúa.", apoyo: "no le quita importancia al daño y no se queda en el enojo. Actúa" },
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
            consigna: "¿Con qué palabras se cuidó al agresor porque era de la familia? Toca las palabras que lo dicen.",
            texto: "Pues calla ahora, hermana mía; [[tu hermano es]]; no se angustie tu corazón por esto",
            apoyo: "Se cuidó al agresor porque era de la familia: «tu hermano es»",
            ref: "2 Samuel 13:20",
            explica: "Absalón le dijo a Tamar «tu hermano es»: se cuidó al agresor porque era de la familia. La iglesia aprende de ese error: no protege al agresor porque es de la familia de la fe.",
          },
          {
            consigna: "¿Con qué palabras se le quitó importancia al daño? Toca las palabras que lo dicen.",
            texto: "Pues calla ahora, hermana mía; tu hermano es; [[no se angustie tu corazón por esto]]",
            apoyo: "Se le quitó importancia al daño: «no se angustie tu corazón por esto»",
            ref: "2 Samuel 13:20",
            explica: "Decirle «no se angustie tu corazón por esto» fue quitarle importancia al daño. La iglesia no le quita importancia al daño: actúa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es lo que salió mal en la casa de David o lo que hace la iglesia que aprende de ese error? Lleva cada frase a su grupo.",
            grupos: ["Lo que salió mal en la casa de David", "Lo que hace la iglesia que aprende"],
            frases: [
              { texto: "Hacer callar a la víctima", grupo: 0 },
              { texto: "Cuidar al agresor porque es de la familia", grupo: 0 },
              { texto: "Quitarle importancia al daño", grupo: 0 },
              { texto: "Enojarse, pero no actuar", grupo: 0 },
              { texto: "Creer al niño y a su familia", grupo: 1 },
              { texto: "Proteger al niño del contacto con el acusado", grupo: 1 },
              { texto: "Actuar, sin quedarse en el enojo", grupo: 1 },
            ],
            apoyo: "La iglesia aprende de ese error: no hace callar a la víctima, no protege al agresor porque es de la familia de la fe, no le quita importancia al daño y no se queda en el enojo",
            explica: "En la casa de David se hizo callar a Tamar, se cuidó al agresor, se le quitó importancia al daño y el rey se enojó pero no actuó. La iglesia aprende de ese error: cree al niño y a su familia, los protege y actúa.",
          },
          {
            consigna: "¿Repite el error de la casa de David o es lo que hace la iglesia que aprende? Lleva cada frase a su grupo.",
            grupos: ["Repite el error de la casa de David", "Lo que hace la iglesia que aprende"],
            frases: [
              { texto: "Decirle a la víctima que se calle", grupo: 0 },
              { texto: "Defender al agresor porque es un hermano", grupo: 0 },
              { texto: "Decir que el daño no es para tanto", grupo: 0 },
              { texto: "Dejar a la víctima sola y desconsolada", grupo: 0 },
              { texto: "Cuidar la privacidad del niño", grupo: 1 },
              { texto: "Ayudar a la familia a recibir ayuda profesional", grupo: 1 },
              { texto: "Actuar en vez de solo enojarse", grupo: 1 },
            ],
            apoyo: "En la casa de David se hizo callar a Tamar, se protegió al agresor, se le quitó importancia al daño y el rey se enojó pero no actuó",
            explica: "Hacer callar a la víctima, proteger al agresor, quitarle importancia al daño y dejarla sola repiten el error de la casa de David. La iglesia que aprende cuida la privacidad del niño, ayuda a la familia a recibir ayuda profesional y actúa.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que hace el liderazgo después de un reporte, del primer paso al último.",
            pasos: [
              "Proteger: el acusado deja todo servicio con menores",
              "Cooperar con las autoridades, sin investigar por su cuenta",
              "Acompañar: un líder de confianza visita a la familia",
              "Informar a la iglesia lo necesario, sin el nombre de la víctima",
              "Revisar la política: ¿qué regla falló o no se cumplió?",
              "Seguir cuidando al niño y a su familia como parte del rebaño",
            ],
            apoyo: "Ejemplo resuelto: lo que hace el liderazgo después de un reporte",
            explica: "Primero se protege: el acusado deja todo servicio con menores mientras las autoridades investigan; después se coopera con ellas, se acompaña a la familia y se informa a la iglesia con prudencia; luego se revisa la política, y el niño y su familia siguen siendo parte del rebaño.",
          },
          {
            consigna: "Ordena los pasos del liderazgo después de un reporte, del primero al último.",
            pasos: [
              "La persona acusada deja de servir con menores mientras investigan",
              "El liderazgo colabora con las autoridades",
              "Un líder de confianza le ofrece ayuda a la familia del niño",
              "Se le dice a la iglesia lo necesario, con consejo legal",
              "Se busca qué regla de la política falló",
              "El niño y su familia siguen siendo parte del rebaño",
            ],
            apoyo: "Paso 6, seguir cuidando: el niño y su familia siguen siendo parte del rebaño",
            explica: "El acusado deja todo servicio con menores, el liderazgo coopera con las autoridades sin hacer su propia investigación, un líder de confianza acompaña a la familia, se informa a la iglesia con prudencia, se revisa la política y el niño y su familia siguen siendo parte del rebaño.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Acompañarlos con paciencia: la sanidad lleva tiempo, y no se los presiona para que hablen ni para que perdonen pronto",
            ref: "Salmos 147:3",
            situacion: "Eres el líder de confianza que la iglesia envió a acompañar a la familia de Nicolás, de 8 años, después de que se reportó el abuso que sufrió. La persona acusada asistía a la misma iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "En tu primera visita, la mamá de Nicolás llora y se pregunta si la iglesia la culpa a ella.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la iglesia les cree, y que tendrán apoyo, no sospechas.", valor: 2, explica: "Creerles y no culparlos: el niño no tuvo la culpa, y la familia necesita apoyo, no sospechas." },
                  { texto: "Que quizás debió cuidar mejor a su hijo, y que por eso pasó esto.", valor: 0, explica: "No se culpa a la familia: necesita apoyo, no sospechas." },
                  { texto: "Que la acompañas en oración, pero que es mejor no hablar del tema.", valor: 1, explica: "Orar con ellos está bien, pero se les cree y se los apoya, sin sospechas." },
                ],
              },
              {
                id: "e2",
                narra: "El domingo, la familia quiere volver al culto, y la persona acusada sigue asistiendo.",
                pregunta: "¿Qué hace la iglesia?",
                opciones: [
                  { texto: "Cuida que no tengan contacto con el acusado en la iglesia.", valor: 2, explica: "Se los protege del contacto con la persona acusada, también dentro de la iglesia." },
                  { texto: "Les pide que se sienten cerca de él, para mostrar que hay paz.", valor: 0, explica: "Se los protege del contacto con la persona acusada, también dentro de la iglesia." },
                  { texto: "Les sugiere que vengan a otro culto, sin hacer nada más por ellos.", valor: 1, explica: "Evitar el encuentro ayuda, pero es la iglesia la que los protege del contacto con el acusado." },
                ],
              },
              {
                id: "e3",
                narra: "Un hermano te pregunta qué le pasó a la familia, porque quiere orar por ellos.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que puede orar por ellos, pero que su historia no se cuenta.", valor: 2, explica: "Se cuida su privacidad: su nombre y su historia no se cuentan." },
                  { texto: "Le cuentas lo que pasó, para que pueda orar con más detalle.", valor: 0, explica: "Su nombre y su historia no se cuentan." },
                  { texto: "Le dices el nombre del niño, pero sin contar nada más de lo que pasó.", valor: 0, explica: "Se cuida su privacidad: su nombre y su historia no se cuentan." },
                ],
              },
              {
                id: "e4",
                narra: "Pasaron dos meses. Nicolás todavía tiene miedo, y alguien le dice a la familia que perdone ya al acusado para sanar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Sigues a su lado con paciencia, sin presionarlos para que perdonen.", valor: 2, explica: "La sanidad lleva tiempo: no se los presiona para que hablen ni para que perdonen pronto." },
                  { texto: "Les pides que perdonen hoy mismo, para que todo quede atrás de una vez.", valor: 0, explica: "El perdón no se le exige con prisa a la víctima: la sanidad lleva tiempo." },
                  { texto: "No los presionas, pero dejas de visitarlos para darles espacio.", valor: 1, explica: "No presionarlos está bien, pero se sigue a su lado: visitarlos y orar con ellos." },
                ],
              },
            ],
          },
          {
            apoyo: "Ayudarlos a recibir ayuda profesional, de alguien con experiencia en el trauma de los niños",
            ref: "2 Corintios 1:3-4",
            situacion: "Eres coordinador de niños. Hace un mes se reportó el abuso que sufrió Elena, de 10 años, y te toca acompañarla a ella y a su familia.",
            escenas: [
              {
                id: "e1",
                narra: "Los padres de Elena te cuentan que la niña tiene pesadillas y no quiere hablar.",
                pregunta: "¿Qué les propones?",
                opciones: [
                  { texto: "Que la vea alguien con experiencia en el trauma de los niños.", valor: 2, explica: "Se los ayuda a recibir ayuda profesional, de alguien con experiencia en el trauma de los niños." },
                  { texto: "Que la animen a contarlo todo de una vez, para que se desahogue.", valor: 0, explica: "No se los presiona para que hablen: la sanidad lleva tiempo." },
                  { texto: "Que la iglesia ore por ella, y que con eso ya será suficiente.", valor: 1, explica: "Orar por ella es bueno, pero la iglesia no reemplaza la ayuda profesional: acompaña con la esperanza de un Dios que venda las heridas." },
                ],
              },
              {
                id: "e2",
                narra: "Elena quiere volver a la clase de niños.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Cuidas que pueda volver a una clase segura para ella.", valor: 2, explica: "Seguir a su lado es también cuidar que el niño pueda volver a una clase segura." },
                  { texto: "Le dices que mejor no vuelva, para evitar los comentarios.", valor: 0, explica: "El niño y su familia siguen siendo parte del rebaño: se cuida que pueda volver a una clase segura." },
                  { texto: "La dejas volver cuando quiera, sin revisar nada de la clase.", valor: 1, explica: "Que vuelva está bien, pero se cuida que la clase sea segura." },
                ],
              },
              {
                id: "e3",
                narra: "En la reunión de líderes, alguien propone contarle a la iglesia el nombre de Elena, para que todos oren.",
                pregunta: "¿Qué dices?",
                opciones: [
                  { texto: "Que se diga solo lo necesario, sin el nombre de la víctima.", valor: 2, explica: "Se le dice a la iglesia lo necesario, sin el nombre de la víctima y con consejo legal." },
                  { texto: "Que sí: así toda la iglesia sabrá por quién tiene que orar.", valor: 0, explica: "Su nombre y su historia no se cuentan." },
                  { texto: "Que no se le diga nada a la iglesia, ni siquiera lo necesario.", valor: 1, explica: "Su nombre no se cuenta, pero a la iglesia se le dice lo necesario, con prudencia y con consejo legal." },
                ],
              },
              {
                id: "e4",
                narra: "Pasó un año, y la familia de Elena sigue en la iglesia.",
                pregunta: "¿Qué hace el liderazgo?",
                opciones: [
                  { texto: "Sigue a su lado: los visita, ora con ellos y los cuida.", valor: 2, explica: "Seguir a su lado: visitarlos, orar con ellos y cuidar que el niño pueda volver a una clase segura. Siguen siendo parte del rebaño." },
                  { texto: "Deja de visitarlos: ya pasó mucho tiempo y todo quedó atrás.", valor: 0, explica: "La sanidad lleva tiempo: se sigue a su lado, visitándolos y orando con ellos." },
                  { texto: "Los saluda los domingos, pero ya no los visita ni ora con ellos.", valor: 1, explica: "Saludarlos está bien, pero seguir a su lado es visitarlos y orar con ellos." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra con lo que enseña la lección cuando alguien dañó a un niño.",
            pares: [
              ["El perdón", "Un paso del corazón delante de Dios, que no se exige con prisa"],
              ["La confianza", "Se gana con el tiempo y con hechos"],
              ["Las consecuencias", "La ley sigue su curso, aunque haya arrepentimiento"],
              ["La asistencia", "Muchas iglesias piden un acuerdo escrito para congregarse"],
            ],
            apoyo: "El perdón: es un paso del corazón delante de Dios, que no se le exige con prisa a la víctima",
            explica: "El perdón es un paso del corazón delante de Dios, que no se le exige con prisa a la víctima; la confianza se gana con el tiempo y con hechos; la ley sigue su curso, aunque haya arrepentimiento; y para congregarse, muchas iglesias piden un acuerdo escrito.",
          },
          {
            consigna: "Une cada palabra con un ejemplo de lo que enseña la lección.",
            pares: [
              ["El perdón", "No se le exige con prisa a la víctima"],
              ["La confianza", "Quien dañó a un niño no vuelve a servir con niños"],
              ["Las consecuencias", "Aunque se arrepienta, la ley sigue su curso"],
              ["El acuerdo escrito", "Nunca en las áreas de los niños ni en un servicio con menores"],
            ],
            apoyo: "El perdón no devuelve la confianza: quien dañó a un niño no vuelve a servir con niños, y la ley sigue su curso",
            explica: "El perdón no se le exige con prisa a la víctima, y no devuelve la confianza: quien dañó a un niño no vuelve a servir con niños, y la ley sigue su curso. Si quiere congregarse, el acuerdo escrito dice que nunca estará en las áreas de los niños ni en un servicio con menores.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La confianza: se gana con el tiempo y con hechos; quien dañó a un niño no vuelve a servir con niños",
            ref: "Isaías 1:17",
            clave: {
              id: "pr-ninez-4-6-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se distinguen el perdón, la confianza y las consecuencias cuando alguien dañó a un niño?",
              ideas: [
                { id: "perdon", peso: 34, negativa: true, texto: "El perdón es un paso del corazón delante de Dios, que no se le exige con prisa a la víctima.", formas: ["paso del corazon", "delante de dios", "no se le exige", "no se exige", "no se puede exigir", "sin prisa", "con prisa", "no (exigir|exigirle|presionar*)"] },
                { id: "confianza", peso: 33, negativa: true, texto: "La confianza se gana con el tiempo y con hechos: quien dañó a un niño no vuelve a servir con niños.", formas: ["con el tiempo", "con hechos", "se gana", "no vuelve a servir", "no (puede|debe) volver a servir", "nunca (vuelve|volvera|mas) a servir", "no sirve mas con"] },
                { id: "ley", peso: 33, texto: "Las consecuencias siguen: la ley sigue su curso, aunque haya arrepentimiento.", formas: ["sigue su curso", "la ley sigue", "aunque (haya|se) arrepent*", "la justicia sigue", "la ley (actua|continua)"] },
              ],
              errores: [
                { id: "confianza-vuelve", texto: "El perdón no devuelve la confianza: quien dañó a un niño no vuelve a servir con niños.", formas: ["perdon devuelve la confianza", "puede volver a servir", "vuelve a servir con ninos"], anula: "confianza" },
              ],
              modelo: "El perdón es un paso del corazón delante de Dios, que no se le exige con prisa a la víctima. La confianza se gana con el tiempo y con hechos: quien dañó a un niño no vuelve a servir con niños. Y la ley sigue su curso, aunque haya arrepentimiento.",
            },
          },
          {
            apoyo: "Las consecuencias: la ley sigue su curso, aunque haya arrepentimiento",
            ref: "Isaías 1:17",
            clave: {
              id: "pr-ninez-4-6-a7-2",
              tipo: "corta",
              pregunta: "Un hermano que dañó a un niño dice que se arrepintió y pide volver a enseñar en la clase de niños. ¿Qué le responde la iglesia, según la lección?",
              ideas: [
                { id: "noservir", peso: 40, negativa: true, texto: "Quien dañó a un niño no vuelve a servir con niños: el perdón no devuelve la confianza.", formas: ["no vuelve a servir", "no puede volver", "no (puede|debe|podra) (volver|ensenar|servir)", "nunca (vuelve|volvera|mas)", "no devuelve la confianza", "confianza se gana", "con hechos"] },
                { id: "ley", peso: 30, texto: "La ley sigue su curso, aunque haya arrepentimiento.", formas: ["sigue su curso", "la ley sigue", "la ley", "aunque (haya|se) arrepent*", "consecuencias"] },
                { id: "acuerdo", peso: 30, texto: "Si quiere congregarse, muchas iglesias le piden un acuerdo escrito: siempre acompañado y nunca en las áreas de los niños.", formas: ["acuerdo escrito", "un acuerdo", "acompan* por un adulto", "adulto designado", "areas de los ninos", "siempre acompan*"] },
              ],
              errores: [
                { id: "vuelve", texto: "Quien dañó a un niño no vuelve a servir con niños.", formas: ["puede volver a (ensenar|servir)", "vuelva a (ensenar|servir)", "dejarlo volver"], anula: "noservir" },
              ],
              modelo: "Que quien dañó a un niño no vuelve a servir con niños, porque el perdón no devuelve la confianza. La ley sigue su curso, aunque haya arrepentimiento. Y si quiere congregarse, muchas iglesias le piden un acuerdo escrito: siempre acompañado por un adulto designado y nunca en las áreas de los niños.",
            },
          },
        ],
      },
    ],
  },
};
