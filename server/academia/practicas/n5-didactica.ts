/**
 * Las prácticas de «Didáctica: cómo enseñar» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-didactica.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_DIDACTICA: PracticasMateria = {
  materia: "n5-didactica",
  mision: {
    titulo: "Enseñar como Esdras: tu clase y tus dos acompañados",
    intro: "Tu pastor te pidió dar una clase a los nuevos creyentes de la iglesia y acompañar después a dos de ellos, como pide el Nivel 5. Vas a recorrer todo el camino del maestro: prepararte tú primero, entender cómo aprenden tus alumnos, escribir el objetivo y el plan de la clase, escoger los métodos, evaluar con justicia y acompañar de cerca a cada uno. Repasa las seis lecciones para tener listo cada paso.",
    cierre: "Ya sabes enseñar como pide la Palabra: estudiar, obedecer y entonces enseñar; lograr que el otro aprenda; preparar la clase desde el objetivo; escoger métodos que hagan pensar, participar y practicar; evaluar con verdad y corregir con amor; y acompañar a cada alumno hasta que enseñe también a otros.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El maestro cristiano
    "n5-didactica-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Entre qué nombra Pablo la enseñanza, en Romanos 12:7?", reverso: "Entre los dones que Dios da a su iglesia.", apoyo: "Pablo nombra la enseñanza entre los dones que Dios da a su iglesia (Romanos 12:7)" },
              { frente: "¿Para qué dio Cristo maestros a su iglesia?", reverso: "Para preparar a los creyentes para la obra del ministerio.", apoyo: "Cristo dio maestros para preparar a los creyentes para la obra del ministerio (Efesios 4:11-12)" },
              { frente: "¿Por qué responde ante Dios quien enseña?", reverso: "Por lo que dice y por cómo vive.", apoyo: "Quien enseña responde ante Dios por lo que dice y por cómo vive" },
              { frente: "¿En qué orden obró Esdras con la ley de Jehová?", reverso: "Primero estudiar, después obedecer y entonces enseñar.", apoyo: "El orden importa: primero estudiar, después obedecer y entonces enseñar" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es enseñar, además de una tarea?", reverso: "Un servicio que se recibe de Dios y se ejerce para el bien de otros.", apoyo: "Enseñar no es solo una tarea: es un servicio que se recibe de Dios y se ejerce para el bien de otros" },
              { frente: "¿Cómo enseñó Jesús, el Maestro, en Juan 13?", reverso: "Lavando los pies de sus discípulos.", apoyo: "Jesús, el Maestro, enseñó lavando los pies de sus discípulos" },
              { frente: "¿A quiénes prepara esta materia?", reverso: "A quienes enseñan en la iglesia y a los futuros profesores y mentores de la academia.", apoyo: "Esta materia prepara a quienes enseñan en la iglesia y a los futuros profesores y mentores de la academia" },
              { frente: "¿Cuál es la primera lección que tus alumnos leen?", reverso: "Tu vida.", apoyo: "Tu vida es la primera lección que tus alumnos leen" },
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
            consigna: "Sobre la enseñanza como don y llamado: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo nombra la enseñanza entre los dones que Dios da a su iglesia.", verdad: true, explica: "Así es: en Romanos 12:7, la enseñanza está entre los dones que Dios da a su iglesia.", apoyo: "Pablo nombra la enseñanza entre los dones que Dios da a su iglesia (Romanos 12:7)", ref: "Romanos 12:7" },
              { texto: "Cristo dio maestros para que ellos solos hicieran toda la obra del ministerio.", verdad: false, explica: "Cristo dio maestros para preparar a los creyentes para la obra del ministerio.", apoyo: "Cristo dio maestros para preparar a los creyentes para la obra del ministerio (Efesios 4:11-12)", ref: "Efesios 4:11-12" },
              { texto: "Quien enseña responde ante Dios por lo que dice y por cómo vive.", verdad: true, explica: "Por eso Santiago advierte que no se hagan maestros muchos, porque recibirán mayor condenación.", apoyo: "Quien enseña responde ante Dios por lo que dice y por cómo vive", ref: "Santiago 3:1" },
            ],
          },
          {
            consigna: "Sobre el llamado a enseñar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Enseñar en la iglesia es solo una tarea más, como cualquier otra.", verdad: false, explica: "Enseñar no es solo una tarea: es un servicio que se recibe de Dios y se ejerce para el bien de otros.", apoyo: "Enseñar no es solo una tarea: es un servicio que se recibe de Dios y se ejerce para el bien de otros" },
              { texto: "Santiago advierte que los maestros recibirán mayor condenación.", verdad: true, explica: "Santiago dice: «Hermanos míos, no os hagáis maestros muchos de vosotros, sabiendo que recibiremos mayor condenación».", apoyo: "Santiago advierte: «Hermanos míos, no os hagáis maestros muchos de vosotros, sabiendo que recibiremos mayor condenación»", ref: "Santiago 3:1" },
              { texto: "Quien enseña responde ante Dios solo por lo que dice, no por cómo vive.", verdad: false, explica: "Quien enseña responde ante Dios por lo que dice y por cómo vive.", apoyo: "Quien enseña responde ante Dios por lo que dice y por cómo vive", ref: "Santiago 3:1" },
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
            consigna: "Une cada rasgo del carácter del maestro con lo que hace.",
            pares: [
              ["Ama a Dios y su Palabra", "Estudia antes de enseñar"],
              ["Vive lo que enseña", "Su ejemplo enseña más que sus palabras"],
              ["Ama a sus alumnos", "Los conoce, ora por ellos y tiene paciencia"],
              ["Es humilde", "Reconoce lo que no sabe y sigue aprendiendo"],
              ["Depende del Espíritu Santo", "Confía en el que enseña todas las cosas"],
            ],
            apoyo: "Vive lo que enseña: su ejemplo enseña más que sus palabras (1 Timoteo 4:12)",
            ref: "1 Timoteo 4:12",
            explica: "El maestro ama a Dios y su Palabra y estudia antes de enseñar; vive lo que enseña; ama a sus alumnos; es humilde y sigue aprendiendo; y depende del Espíritu Santo, que enseña todas las cosas.",
          },
          {
            consigna: "Une cada rasgo del maestro con un ejemplo de su vida.",
            pares: [
              ["Ama a Dios y su Palabra", "Estudia el pasaje con tiempo antes de la clase"],
              ["Vive lo que enseña", "Perdona en su casa como enseña a perdonar"],
              ["Ama a sus alumnos", "Sabe el nombre de cada uno y ora por ellos"],
              ["Es humilde", "Dice que no sabe algo y lo busca para la próxima clase"],
              ["Depende del Espíritu Santo", "Pide al Espíritu que enseñe a sus alumnos"],
            ],
            apoyo: "Es humilde: reconoce lo que no sabe y sigue aprendiendo",
            ref: "Juan 14:26",
            explica: "Cada ejemplo muestra un rasgo: estudia antes de enseñar, vive lo que enseña, conoce a sus alumnos y ora por ellos, reconoce lo que no sabe y depende del Espíritu Santo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el carácter del maestro tiene un error. Tócala.",
            frases: [
              "Ama a Dios y su Palabra: estudia antes de enseñar.",
              "Vive lo que enseña: sus palabras enseñan más que su ejemplo.",
              "Es humilde: reconoce lo que no sabe y sigue aprendiendo.",
              "Depende del Espíritu Santo, que enseña todas las cosas.",
            ],
            malo: 1,
            correccion: "Vive lo que enseña: su ejemplo enseña más que sus palabras.",
            apoyo: "Vive lo que enseña: su ejemplo enseña más que sus palabras (1 Timoteo 4:12)",
            ref: "1 Timoteo 4:12",
            explica: "El maestro vive lo que enseña, porque su ejemplo enseña más que sus palabras.",
          },
          {
            consigna: "Una de estas frases sobre el ejemplo del maestro tiene un error. Tócala.",
            frases: [
              "Jesús, el Maestro, enseñó lavando los pies de sus discípulos.",
              "El maestro ama a sus alumnos: los conoce, ora por ellos y tiene paciencia.",
              "La lección más fuerte de Jesús fue lo que dijo, no lo que hizo.",
              "Lo primero que se forma es el maestro mismo.",
            ],
            malo: 2,
            correccion: "La lección más fuerte de Jesús fue lo que hizo: les lavó los pies a sus discípulos.",
            apoyo: "La lección más fuerte fue lo que hizo",
            ref: "Juan 13:13-15",
            explica: "Jesús enseñó lavando los pies de sus discípulos: «Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa el ejemplo de Esdras para el maestro.",
            texto: "Como Esdras, el maestro primero [[estudia]] la Palabra, después la [[obedece]] y entonces la [[enseña]].",
            distractores: ["improvisa", "esconde", "olvida"],
            errores: {
              improvisa: "Como Esdras, el maestro primero estudia la Palabra: no la improvisa.",
              esconde: "Después de estudiar la Palabra, el maestro la obedece en su vida.",
              olvida: "Después de estudiarla y obedecerla, el maestro la enseña.",
            },
            apoyo: "Como Esdras, el maestro primero estudia la Palabra, después la obedece y entonces la enseña",
            ref: "Esdras 7:10",
            explica: "El orden importa: primero estudiar, después obedecer y entonces enseñar.",
          },
          {
            consigna: "Completa el versículo de memoria de esta materia.",
            texto: "«Porque Esdras había preparado su [[corazón]] para [[inquirir]] la ley de Jehová y para [[cumplirla]], y para enseñar en Israel sus estatutos y decretos»",
            distractores: ["orgullo", "cambiar", "olvidarla"],
            errores: {
              orgullo: "Esdras había preparado su corazón.",
              cambiar: "Esdras preparó su corazón para inquirir la ley de Jehová: para estudiarla.",
              olvidarla: "Después de inquirir la ley, Esdras se propuso cumplirla.",
            },
            apoyo: "El orden importa: primero estudiar, después obedecer y entonces enseñar",
            ref: "Esdras 7:10",
            explica: "Esdras preparó su corazón para inquirir la ley, para cumplirla y para enseñarla: primero estudiar, después obedecer y entonces enseñar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El orden importa: primero estudiar, después obedecer y entonces enseñar",
            ref: "Esdras 7:10",
            situacion: "Eres maestro de la escuela dominical de adultos. El domingo te toca enseñar sobre el perdón, y esta semana tuviste un fuerte desacuerdo con un hermano de la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Es lunes, y te sientas a preparar la clase.",
                pregunta: "¿Por dónde empiezas?",
                opciones: [
                  { texto: "Estudias con calma el pasaje que vas a enseñar.", valor: 2, explica: "Como Esdras, el maestro primero estudia la Palabra, después la obedece y entonces la enseña.", siguiente: "e2" },
                  { texto: "Buscas una clase ya hecha para leerla el domingo.", valor: 0, explica: "El maestro ama a Dios y su Palabra: estudia antes de enseñar.", siguiente: "e1b" },
                  { texto: "Preparas primero las láminas y dejas el pasaje para el sábado.", valor: 1, explica: "Los materiales ayudan, pero el maestro primero estudia la Palabra.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El sábado notas que la clase que encontraste no sigue el pasaje.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Estudias tú el pasaje antes de enseñarlo.", valor: 2, explica: "El maestro ama a Dios y su Palabra: estudia antes de enseñar.", siguiente: "e2" },
                  { texto: "La lees igual, porque ya no te queda tiempo.", valor: 0, explica: "Quien enseña responde ante Dios por lo que dice: primero se estudia la Palabra.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Al estudiar, el pasaje te muestra que todavía no has perdonado al hermano.",
                pregunta: "¿Qué haces con eso?",
                opciones: [
                  { texto: "Buscas al hermano y lo perdonas antes del domingo.", valor: 2, explica: "Después de estudiar viene obedecer, y entonces enseñar: tu vida es la primera lección que tus alumnos leen." },
                  { texto: "Oras por el asunto, pero dejas la conversación para otro mes.", valor: 1, explica: "Orar está bien, pero el orden de Esdras pide obedecer lo que estudiaste antes de enseñarlo." },
                  { texto: "Lo dejas así: la clase es para los alumnos, no para ti.", valor: 0, explica: "Quien enseña responde ante Dios por lo que dice y por cómo vive." },
                ],
              },
              {
                id: "e3",
                narra: "Llega el domingo, y te toca dar la clase.",
                pregunta: "¿Cómo la das?",
                opciones: [
                  { texto: "Enseñas lo que estudiaste y ya empezaste a vivir.", valor: 2, explica: "Vive lo que enseña: su ejemplo enseña más que sus palabras." },
                  { texto: "Hablas con mucha fuerza, para que no se note lo que te falta.", valor: 0, explica: "El maestro vive lo que enseña: su ejemplo enseña más que sus palabras." },
                  { texto: "Enseñas bien el pasaje, pero sin pedir la ayuda del Espíritu.", valor: 1, explica: "Enseñar bien el pasaje está bien, pero el maestro depende del Espíritu Santo, que enseña todas las cosas." },
                ],
              },
            ],
          },
          {
            apoyo: "Tu vida es la primera lección que tus alumnos leen",
            ref: "Esdras 7:10",
            situacion: "Te piden dar el estudio sobre la oración en la reunión de jóvenes del viernes. Al pensarlo, reconoces que tú mismo has descuidado tu tiempo de oración.",
            escenas: [
              {
                id: "e1",
                narra: "Tienes que responder a la invitación.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Aceptas, y empiezas por estudiar bien el tema.", valor: 2, explica: "Como Esdras, el maestro primero estudia la Palabra, después la obedece y entonces la enseña.", siguiente: "e2" },
                  { texto: "Aceptas, y buscas frases bonitas sobre la oración.", valor: 0, explica: "El maestro ama a Dios y su Palabra: estudia antes de enseñar.", siguiente: "e1b" },
                  { texto: "Aceptas, pero dejas el estudio para el mismo viernes.", valor: 1, explica: "Aceptar está bien, pero el orden importa: primero estudiar, después obedecer y entonces enseñar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El jueves notas que tu estudio son solo frases sueltas, sin el pasaje.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Estudias el pasaje antes de enseñarlo el viernes.", valor: 2, explica: "El maestro ama a Dios y su Palabra: estudia antes de enseñar.", siguiente: "e2" },
                  { texto: "Lo das así, porque los jóvenes no van a notar la diferencia.", valor: 0, explica: "Quien enseña responde ante Dios por lo que dice y por cómo vive.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Al estudiar, el pasaje te pide orar cada día, y tú no lo estás haciendo.",
                pregunta: "¿Qué haces antes del viernes?",
                opciones: [
                  { texto: "Vuelves a orar cada mañana, antes de enseñarlo.", valor: 2, explica: "Después de estudiar viene obedecer, y entonces enseñar: tu vida es la primera lección que tus alumnos leen." },
                  { texto: "Lo enseñas igual: lo importante es lo que vas a decir.", valor: 0, explica: "Quien enseña responde ante Dios por lo que dice y por cómo vive." },
                  { texto: "Te propones orar más, pero cuando pase la reunión.", valor: 1, explica: "La intención es buena, pero el orden importa: primero estudiar, después obedecer y entonces enseñar." },
                ],
              },
              {
                id: "e3",
                narra: "Llega el viernes, y antes de empezar el estudio te sientes nervioso.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras y le pides al Espíritu Santo que guíe la reunión.", valor: 2, explica: "El maestro depende del Espíritu Santo, que enseña todas las cosas." },
                  { texto: "Confías en tu facilidad de palabra, que siempre funciona.", valor: 0, explica: "El maestro no se apoya en su facilidad de palabra: depende del Espíritu Santo, que enseña todas las cosas." },
                  { texto: "Repasas tus notas una vez más, sin orar por la reunión.", valor: 1, explica: "Repasar ayuda, pero el maestro depende del Espíritu Santo, que enseña todas las cosas." },
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
            apoyo: "Enseñar no es solo una tarea: es un servicio que se recibe de Dios y se ejerce para el bien de otros",
            ref: "Romanos 12:7",
            clave: {
              id: "pr-n5-didactica-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la enseñanza es un don y un llamado, y no solo una tarea?",
              ideas: [
                { id: "don", peso: 40, texto: "Dios la da a su iglesia: Pablo la nombra entre los dones, y Cristo dio maestros.", formas: ["don", "dones", "regalo", "dio maestros", "dios (da|dio|regala)", "(da|dio) dios", "(viene|recib*) de dios", "llamado de dios", "dios llama"] },
                { id: "servicio", peso: 30, texto: "Es un servicio que se recibe de Dios y se ejerce para el bien de otros.", formas: ["servicio", "servir", "sirv*", "bien de otros", "bien de los demas", "para otros", "los demas", "prepar* a los creyentes", "obra del ministerio"] },
                { id: "responde", peso: 30, texto: "Quien enseña responde ante Dios por lo que dice y por cómo vive.", formas: ["respond* ante dios", "respond* a dios", "(rend*|rind*) cuentas", "mayor condenacion", "condenacion", "como vive", "responsab*"] },
              ],
              errores: [
                { id: "tarea", texto: "Enseñar no es solo una tarea: es un servicio que se recibe de Dios.", formas: ["es solo una tarea", "solo es una tarea", "es (una|un) (simple|sola|mera|mero) (tarea|trabajo)"], anula: "servicio" },
              ],
              modelo: "Porque Dios la da a su iglesia: Pablo la nombra entre los dones, y Cristo dio maestros para preparar a los creyentes. Es un servicio para el bien de otros, y quien enseña responde ante Dios por lo que dice y por cómo vive.",
            },
          },
          {
            apoyo: "Quien enseña responde ante Dios por lo que dice y por cómo vive",
            ref: "Santiago 3:1",
            clave: {
              id: "pr-n5-didactica-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano quiere enseñar en la escuela dominical solo porque le gusta hablar en público. ¿Qué le explicas sobre el llamado a enseñar?",
              ideas: [
                { id: "servicio", peso: 50, texto: "Que enseñar es un don y un servicio que se recibe de Dios y se ejerce para el bien de otros.", formas: ["don", "dones", "regalo", "servicio", "servir", "sirv*", "bien de otros", "bien de los demas", "para otros", "los demas", "(viene|recib*) de dios", "llamado de dios", "dios (da|dio|llama)"] },
                { id: "responde", peso: 50, texto: "Que quien enseña responde ante Dios por lo que dice y por cómo vive: Santiago advierte que recibirá mayor condenación.", formas: ["respond* ante dios", "respond* a dios", "(rend*|rind*) cuentas", "mayor condenacion", "condenacion", "como vive", "responsab*"] },
              ],
              modelo: "Le explico que enseñar no es solo hablar bien: es un don y un servicio que se recibe de Dios y se ejerce para el bien de otros. Y quien enseña responde ante Dios por lo que dice y por cómo vive, como advierte Santiago.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Cómo aprende la gente
    "n5-didactica-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es enseñar, además de hablar?", reverso: "Lograr que el otro aprenda.", apoyo: "Enseñar no es solo hablar: es lograr que el otro aprenda" },
              { frente: "¿Qué mandó Dios a Israel que hiciera con sus palabras?", reverso: "Que estuvieran sobre su corazón y que las repitiera a sus hijos.", apoyo: "Dios mandó a Israel: «Y estas palabras que yo te mando hoy, estarán sobre tu corazón; y las repetirás a tus hijos»" },
              { frente: "¿Cómo se aprende mejor: tratando de recordar o solo releyendo?", reverso: "Tratando de recordar.", apoyo: "Se aprende mejor tratando de recordar que solo releyendo" },
              { frente: "¿Qué distingue la carta a los Hebreos?", reverso: "La leche y el alimento sólido.", apoyo: "La carta a los Hebreos distingue entre la leche y el alimento sólido" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo es la enseñanza bíblica, según Deuteronomio 6?", reverso: "Se repite, se conversa y se vive en el camino de cada día.", apoyo: "La enseñanza bíblica se repite, se conversa y se vive en el camino de cada día" },
              { frente: "¿A los cuántos días vuelven los versículos de memoria en la academia?", reverso: "A los 1, 3, 7 y 21 días.", apoyo: "por eso los versículos de memoria vuelven a los 1, 3, 7 y 21 días" },
              { frente: "¿Qué se recuerda más que lo que solo se oye?", reverso: "Lo que se practica y se aplica.", apoyo: "Lo que se practica y se aplica se recuerda más que lo que solo se oye" },
              { frente: "¿Qué ayuda a los adultos a aprender mejor?", reverso: "Ver para qué sirve, relacionarlo con su experiencia y participar.", apoyo: "Los adultos aprenden mejor cuando ven para qué sirve lo que estudian, cuando pueden relacionarlo con su experiencia y cuando participan" },
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
            consigna: "Ordena cómo aprende una persona, según la lección, del primer paso al último.",
            pasos: ["Presta atención con interés", "Entiende lo que se le enseña", "Practica lo que entendió", "Repasa lo aprendido"],
            apoyo: "Se aprende prestando atención, entendiendo, practicando y repasando",
            ref: "Deuteronomio 6:6-7",
            explica: "Se aprende prestando atención, entendiendo, practicando y repasando; por eso cada lección de la academia termina con un repaso.",
          },
          {
            consigna: "Un alumno nuevo aprende Esdras 7:10. Ordena lo que hace, del primer paso al último.",
            pasos: [
              "Escucha con atención la explicación del versículo",
              "Entiende qué es estudiar, obedecer y enseñar",
              "Lo pone en práctica esa misma semana",
              "Lo repasa a los 1, 3, 7 y 21 días",
            ],
            apoyo: "Explicar cómo aprende una persona: atención, comprensión, práctica y repaso",
            explica: "Primero presta atención, después entiende, luego practica y al final repasa en días distintos: así se aprende.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "Según los estudios, ¿ayuda a aprender mejor o ayuda menos? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a aprender mejor", "Ayuda menos a aprender"],
            frases: [
              { texto: "Tratar de recordar lo estudiado", grupo: 0 },
              { texto: "Repasar en días distintos, con espacios", grupo: 0 },
              { texto: "Saber enseguida si uno acertó, y por qué", grupo: 0 },
              { texto: "Practicar y aplicar lo que se aprendió", grupo: 0 },
              { texto: "Solo releer lo estudiado", grupo: 1 },
              { texto: "Estudiar todo de una vez", grupo: 1 },
              { texto: "Solo oír, sin practicar", grupo: 1 },
            ],
            apoyo: "Se aprende mejor tratando de recordar que solo releyendo",
            explica: "Los estudios muestran que tratar de recordar, repasar con espacios, saber enseguida si uno acertó y practicar ayudan más que releer, estudiar todo de una vez o solo oír.",
          },
          {
            consigna: "En una clase, ¿ayuda a recordar más o ayuda menos, según los estudios? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a recordar más", "Ayuda menos a recordar"],
            frases: [
              { texto: "Al final, preguntas para que digan lo aprendido", grupo: 0 },
              { texto: "Volver al versículo a los 1, 3, 7 y 21 días", grupo: 0 },
              { texto: "Decirle enseguida al alumno si acertó, y por qué", grupo: 0 },
              { texto: "Aplicar la lección esa misma semana", grupo: 0 },
              { texto: "Releer los apuntes una y otra vez", grupo: 1 },
              { texto: "Estudiar todo la noche antes del examen", grupo: 1 },
              { texto: "Escuchar la clase sin hacer nada más", grupo: 1 },
            ],
            apoyo: "Lo que se practica y se aplica se recuerda más que lo que solo se oye",
            explica: "Tratar de recordar, repasar en días distintos, saber enseguida si se acertó y aplicar graban mejor que releer, estudiar todo de una vez o solo escuchar.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que muestran los estudios sobre la memoria.",
            texto: "Se aprende mejor tratando de [[recordar]] que solo [[releyendo]], y repasar en días [[distintos]], con espacios, graba mejor que estudiar todo de una vez.",
            distractores: ["copiar", "hablando", "seguidos"],
            errores: {
              copiar: "Se aprende mejor tratando de recordar: sacar de la memoria lo estudiado.",
              hablando: "Los estudios comparan tratar de recordar con solo releer.",
              seguidos: "Se repasa en días distintos, con espacios entre uno y otro.",
            },
            apoyo: "Se aprende mejor tratando de recordar que solo releyendo: por eso cada lección de la academia termina con un repaso",
            explica: "Tratar de recordar enseña más que releer, y los repasos en días distintos, con espacios, graban mejor que estudiar todo de una vez.",
          },
          {
            consigna: "Completa otras dos cosas que muestran los estudios.",
            texto: "Saber [[enseguida]] si uno acertó, y por qué, corrige el error a tiempo; y lo que se [[practica]] se recuerda más que lo que solo se [[oye]].",
            distractores: ["después", "olvida", "aplica"],
            errores: {
              "después": "Saber enseguida si uno acertó corrige el error a tiempo.",
              olvida: "Lo que se practica y se aplica se recuerda más.",
              aplica: "Lo que se practica y se aplica se recuerda más que lo que solo se oye.",
            },
            apoyo: "Saber enseguida si uno acertó, y por qué, corrige el error a tiempo",
            explica: "Saber enseguida si uno acertó corrige el error a tiempo, y lo que se practica y se aplica se recuerda más que lo que solo se oye.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada ley de Gregory con lo que hace el maestro en su clase.",
            pares: [
              ["El maestro conoce bien lo que va a enseñar", "Estudia a fondo el pasaje antes de la clase"],
              ["Maestro y alumno usan un lenguaje común", "Evita las palabras difíciles que el grupo no conoce"],
              ["Se avanza de lo que el alumno ya sabe a lo nuevo", "Empieza por lo que el grupo ya conoce"],
              ["El maestro despierta y guía la mente del alumno", "Hace preguntas en vez de solo dar respuestas"],
              ["El alumno reproduce con sus palabras lo aprendido", "Pide a cada uno que lo explique a su manera"],
            ],
            apoyo: "El maestro despierta y guía la mente del alumno, en vez de solo darle respuestas",
            explica: "Cada ley de Gregory se aplica en la clase: el maestro estudia lo que enseñará, usa un lenguaje común, parte de lo que el alumno ya sabe, lo hace pensar con preguntas y le pide reproducir con sus palabras lo aprendido.",
          },
          {
            consigna: "Une cada principio con lo que haría el maestro en su clase.",
            pares: [
              ["El maestro que deja de aprender deja de enseñar bien", "Sigue estudiando cada semana, aunque ya enseñe"],
              ["El alumno aprende más cuanto más participa", "Pone a conversar al grupo sobre el pasaje"],
              ["La enseñanza que cambia vidas llega al corazón", "Busca que cada uno cambie su vida, no solo sus ideas"],
              ["Se repasa y se aplica lo aprendido", "Vuelve sobre la lección en la clase siguiente"],
            ],
            apoyo: "el alumno aprende más cuanto más participa",
            explica: "Hendricks insiste en que el maestro que deja de aprender deja de enseñar bien, que el alumno aprende más cuanto más participa y que la enseñanza que cambia vidas llega al corazón; y Gregory, en repasar y aplicar lo aprendido.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El maestro despierta y guía la mente del alumno, en vez de solo darle respuestas",
            ref: "Hebreos 5:12-14",
            situacion: "Das la clase de nuevos creyentes de tu iglesia sobre la oración, y quieres aplicar las leyes de Gregory y los principios de Hendricks.",
            escenas: [
              {
                id: "e1",
                narra: "Empieza la clase, y nadie parece muy interesado.",
                pregunta: "¿Cómo empiezas?",
                opciones: [
                  { texto: "Preguntas qué saben ya de la oración y partes de ahí.", valor: 2, explica: "Se avanza de lo que el alumno ya sabe a lo que todavía no sabe.", siguiente: "e2" },
                  { texto: "Explicas con palabras difíciles, para que vean cuánto sabes.", valor: 0, explica: "Maestro y alumno usan un lenguaje que los dos entienden.", siguiente: "e1b" },
                  { texto: "Empiezas a explicar el pasaje desde el primer versículo.", valor: 1, explica: "Explicar el pasaje está bien, pero se avanza de lo que el alumno ya sabe a lo que todavía no sabe.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Ves caras confundidas: varios no entienden lo que dices.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Cambias a palabras sencillas que todos entienden.", valor: 2, explica: "Maestro y alumno usan un lenguaje que los dos entienden.", siguiente: "e2" },
                  { texto: "Sigues igual: ya entenderán cuando estudien un poco más.", valor: 0, explica: "Enseñar no es solo hablar: es lograr que el otro aprenda.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un alumno te hace una pregunta sobre lo que dice el pasaje.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le haces otra pregunta que lo guíe al pasaje.", valor: 2, explica: "El maestro despierta y guía la mente del alumno, en vez de solo darle respuestas." },
                  { texto: "Le das tú la respuesta completa, para no perder tiempo.", valor: 1, explica: "Responder ayuda, pero el maestro despierta y guía la mente del alumno, en vez de solo darle respuestas." },
                  { texto: "Le dices que esa pregunta no es del tema de hoy.", valor: 0, explica: "El alumno aprende más cuanto más participa." },
                ],
              },
              {
                id: "e3",
                narra: "Faltan diez minutos para terminar la clase.",
                pregunta: "¿Cómo cierras?",
                opciones: [
                  { texto: "Pides a cada uno que diga con sus palabras lo que aprendió.", valor: 2, explica: "El alumno reproduce con sus palabras lo que aprendió." },
                  { texto: "Lees un resumen largo de todo lo que les explicaste hoy.", valor: 0, explica: "El alumno aprende más cuanto más participa: él mismo reproduce con sus palabras lo que aprendió." },
                  { texto: "Repites tú mismo las ideas principales, una vez más, al grupo.", valor: 1, explica: "Repasar ayuda, pero el alumno reproduce con sus palabras lo que aprendió." },
                ],
              },
            ],
          },
          {
            apoyo: "el alumno aprende más cuanto más participa",
            ref: "Deuteronomio 6:6-7",
            situacion: "Enseñas en un grupo de adultos de tu iglesia, y esta semana estudian Deuteronomio 6:6-7. Quieres que recuerden y practiquen lo que aprendan, y no solo escuchen.",
            escenas: [
              {
                id: "e1",
                narra: "Preparas la clase de esta semana.",
                pregunta: "¿Qué haces antes de enseñarla?",
                opciones: [
                  { texto: "Estudias tú primero el pasaje, para conocerlo bien.", valor: 2, explica: "El maestro conoce bien lo que va a enseñar.", siguiente: "e2" },
                  { texto: "Usas los mismos apuntes de hace años, sin volver a leerlos.", valor: 0, explica: "El maestro que deja de aprender deja de enseñar bien.", siguiente: "e1b" },
                  { texto: "Lees el pasaje una vez, la noche antes de la clase.", valor: 1, explica: "Leerlo ayuda, pero el maestro conoce bien lo que va a enseñar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "En la clase, un alumno pregunta algo del pasaje que tus apuntes no responden.",
                pregunta: "¿Qué aprendes de eso?",
                opciones: [
                  { texto: "Que el maestro que deja de aprender deja de enseñar bien.", valor: 2, explica: "Hendricks lo dice así: el maestro que deja de aprender deja de enseñar bien.", siguiente: "e2" },
                  { texto: "Que los alumnos no deberían hacer tantas preguntas en la clase.", valor: 0, explica: "El alumno aprende más cuanto más participa.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llega el momento de explicar el pasaje a los adultos.",
                pregunta: "¿Cómo lo haces?",
                opciones: [
                  { texto: "Los pones a conversar en grupos sobre el texto.", valor: 2, explica: "El alumno aprende más cuanto más participa, y los adultos aprenden mejor cuando participan." },
                  { texto: "Hablas tú toda la hora, para que nadie se distraiga.", valor: 0, explica: "Enseñar no es solo hablar: es lograr que el otro aprenda." },
                  { texto: "Explicas tú y dejas cinco minutos para preguntas al final.", valor: 1, explica: "Las preguntas ayudan, pero el alumno aprende más cuanto más participa." },
                ],
              },
              {
                id: "e3",
                narra: "Termina la clase.",
                pregunta: "¿Qué les pides para esta semana?",
                opciones: [
                  { texto: "Que lo repitan en casa y lo repasen en días distintos.", valor: 2, explica: "La enseñanza bíblica se repite, se conversa y se vive en el camino de cada día, y repasar en días distintos graba mejor." },
                  { texto: "Que relean sus apuntes la noche antes de la próxima clase.", valor: 0, explica: "Se aprende mejor tratando de recordar que solo releyendo, y repasar en días distintos graba mejor que estudiar todo de una vez." },
                  { texto: "Que piensen en el pasaje cuando tengan algo de tiempo.", valor: 1, explica: "Pensar en el pasaje ayuda, pero repasar en días distintos, con espacios, graba mejor." },
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
            apoyo: "Se aprende prestando atención, entendiendo, practicando y repasando",
            ref: "Deuteronomio 6:6-7",
            clave: {
              id: "pr-n5-didactica-2-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo aprende una persona, según la lección, y por qué enseñar no es solo hablar?",
              ideas: [
                { id: "atencion", peso: 30, texto: "Prestando atención y entendiendo lo que se enseña.", formas: ["atencion", "atent*", "entend*", "comprend*", "comprension", "interes"] },
                { id: "practica", peso: 40, texto: "Practicando y repasando lo aprendido.", formas: ["practic*", "repas*", "aplic*", "trat* de recordar", "recordando", "repit*", "repet*"] },
                { id: "lograr", peso: 30, texto: "Enseñar es lograr que el otro aprenda, no solo hablar.", formas: ["lograr que", "logr* que", "consegu* que", "que el otro aprend*", "que aprendan", "que aprenda"] },
              ],
              modelo: "Una persona aprende prestando atención, entendiendo, practicando y repasando. Por eso enseñar no es solo hablar: es lograr que el otro aprenda, porque un alumno puede oír una clase excelente y olvidarla en una semana.",
            },
          },
          {
            apoyo: "Enseñar es lograr que el otro aprenda, no solo hablar",
            ref: "Deuteronomio 6:6-7",
            clave: {
              id: "pr-n5-didactica-2-a7-2",
              tipo: "corta",
              pregunta: "Un maestro dice: Yo ya expliqué bien el tema; si no aprendieron, es problema de ellos. ¿Qué le respondes con lo que enseña la lección?",
              ideas: [
                { id: "lograr", peso: 50, texto: "Que enseñar no es solo hablar: es lograr que el otro aprenda.", formas: ["lograr que", "logr* que", "consegu* que", "que el otro aprend*", "que aprendan", "que aprenda", "no es solo hablar", "no basta (con|explicar|hablar)"] },
                { id: "aprende", peso: 50, texto: "Que se aprende prestando atención, entendiendo, practicando y repasando, y él debe ayudarlos en eso.", formas: ["practic*", "repas*", "prest* atencion", "atencion", "entend*", "particip*", "trat* de recordar"] },
              ],
              modelo: "Le respondo que enseñar no es solo hablar: es lograr que el otro aprenda. Y que se aprende prestando atención, entendiendo, practicando y repasando, así que debe ayudarlos a practicar y a repasar lo que explicó.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Preparar una clase
    "n5-didactica-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué se pregunta el maestro antes de preparar el contenido?", reverso: "¿Qué podrá hacer el alumno al terminar?", apoyo: "Antes de preparar el contenido, el maestro se pregunta: ¿qué podrá hacer el alumno al terminar?" },
              { frente: "¿Qué clase de verbo usa un buen objetivo?", reverso: "Un verbo que se puede comprobar, como explicar, citar, comparar o aplicar.", apoyo: "Un buen objetivo usa un verbo que se puede comprobar, como explicar, citar, comparar o aplicar, y no solo saber o entender" },
              { frente: "¿Qué taxonomía usa la academia para sus objetivos?", reverso: "La taxonomía de Bloom, en su versión revisada.", apoyo: "La academia usa los niveles de la taxonomía de Bloom en su versión revisada" },
              { frente: "¿Qué hacían los levitas al leer la ley, en Nehemías 8:8?", reverso: "Leían claramente y ponían el sentido, para que entendieran.", apoyo: "los levitas «leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuáles son los niveles de Bloom, en su versión revisada?", reverso: "Recordar, comprender, aplicar, analizar, evaluar y crear.", apoyo: "recordar, comprender, aplicar, analizar, evaluar y crear" },
              { frente: "¿Qué verbos no bastan para un buen objetivo?", reverso: "Saber o entender, solos.", apoyo: "Un buen objetivo usa un verbo que se puede comprobar, como explicar, citar, comparar o aplicar, y no solo saber o entender" },
              { frente: "¿Qué es preparar una clase, según Nehemías 8:8?", reverso: "Leer bien, explicar y procurar que el otro entienda.", apoyo: "Preparar una clase es eso: leer bien, explicar y procurar que el otro entienda" },
              { frente: "¿Qué se enseña con claridad?", reverso: "Lo que se prepara con cuidado.", apoyo: "Lo que se prepara con cuidado se enseña con claridad" },
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
            consigna: "Une cada nivel de Bloom con su ejemplo de objetivo.",
            pares: [
              ["Recordar", "Citar de memoria Juan 3:16"],
              ["Comprender", "Explicar con sus palabras qué es la gracia"],
              ["Aplicar", "Escribir un paso concreto para perdonar esta semana"],
              ["Analizar", "Distinguir en una parábola el punto principal"],
              ["Evaluar", "Juzgar si una enseñanza es fiel a la Biblia"],
            ],
            apoyo: "La academia usa los niveles de la taxonomía de Bloom en su versión revisada: recordar, comprender, aplicar, analizar, evaluar y crear",
            explica: "Recordar es citar de memoria; comprender, explicar con sus palabras; aplicar, escribir un paso concreto; analizar, distinguir el punto principal de los detalles; y evaluar, juzgar si una enseñanza es fiel a la Biblia.",
          },
          {
            consigna: "Une cada objetivo con el nivel de Bloom que pide.",
            pares: [
              ["Citar de memoria Esdras 7:10", "Recordar"],
              ["Explicar con sus palabras qué es un don", "Comprender"],
              ["Distinguir en un pasaje la idea principal de los detalles", "Analizar"],
              ["Juzgar si un sermón que escuchó es fiel a la Biblia", "Evaluar"],
              ["Preparar una clase breve para los niños", "Crear"],
            ],
            apoyo: "Crear: preparar un estudio bíblico de quince minutos para su grupo",
            explica: "Citar de memoria es recordar; explicar con sus palabras, comprender; distinguir lo principal de los detalles, analizar; juzgar si algo es fiel a la Biblia, evaluar; y preparar una clase o un estudio, crear.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Este objetivo usa un verbo que se puede comprobar? Lleva cada frase a su grupo.",
            grupos: ["Se puede comprobar", "No se puede comprobar"],
            frases: [
              { texto: "Explicar qué es la gracia", grupo: 0 },
              { texto: "Citar de memoria Juan 3:16", grupo: 0 },
              { texto: "Comparar dos pasajes sobre la fe", grupo: 0 },
              { texto: "Aplicar el pasaje con un paso concreto", grupo: 0 },
              { texto: "Saber más sobre la gracia", grupo: 1 },
              { texto: "Entender mejor la Biblia", grupo: 1 },
              { texto: "Saber la historia de Esdras", grupo: 1 },
            ],
            apoyo: "Un buen objetivo usa un verbo que se puede comprobar, como explicar, citar, comparar o aplicar, y no solo saber o entender",
            explica: "Explicar, citar, comparar y aplicar se pueden comprobar; saber o entender, solos, no dicen qué podrá hacer el alumno al terminar.",
          },
          {
            consigna: "¿Es un objetivo medible para la clase, o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Es un objetivo medible", "No es un objetivo medible"],
            frases: [
              { texto: "Al terminar, cada uno citará de memoria Esdras 7:10", grupo: 0 },
              { texto: "Al terminar, cada uno explicará con sus palabras qué es la fe", grupo: 0 },
              { texto: "Al terminar, cada uno escribirá un paso para perdonar", grupo: 0 },
              { texto: "Al terminar, todos sabrán más de la oración", grupo: 1 },
              { texto: "Al terminar, todos entenderán mejor la Palabra", grupo: 1 },
              { texto: "Que la clase sea muy bonita y emocionante", grupo: 1 },
            ],
            apoyo: "Un buen objetivo usa un verbo que se puede comprobar",
            explica: "Un objetivo medible dice qué podrá hacer el alumno al terminar, con un verbo que se puede comprobar; saber o entender más no se puede comprobar.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las partes de una clase como las presenta la lección, de la primera a la última.",
            pasos: [
              "Para empezar: una pregunta, una historia breve o un problema",
              "La Palabra: el pasaje leído y explicado en su contexto",
              "La idea clave: la verdad central dicha en una frase",
              "Para la vida: una aplicación concreta y una pregunta personal",
              "El repaso: preguntas para recordar y comprobar lo aprendido",
            ],
            apoyo: "Es el mismo orden de las lecciones de esta academia",
            ref: "Nehemías 8:8",
            explica: "Una clase va en este orden: para empezar, la Palabra explicada, la idea clave, la aplicación para la vida y el repaso. Es el mismo orden de las lecciones de esta academia.",
          },
          {
            consigna: "Preparas una clase sobre Esdras 7:10. Ordena lo que harás, del principio al final.",
            pasos: [
              "Preguntas: ¿quién fue el maestro que más marcó tu vida?",
              "Lees Esdras 7:10 y lo explicas en su contexto",
              "Dices en una frase: primero estudiar, después obedecer y enseñar",
              "Cada uno escribe un paso para obedecer esta semana",
              "Haces preguntas para recordar lo aprendido",
            ],
            apoyo: "Organizar una clase en partes: para empezar, la Palabra, la idea clave, la aplicación y el repaso",
            ref: "Esdras 7:10",
            explica: "Primero una pregunta que despierte el interés; después la Palabra, leída y explicada; luego la idea clave en una frase, la aplicación concreta y, al final, el repaso.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El maestro escribe su plan: el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas",
            ref: "Nehemías 8:8",
            titulo: "Una clase para los nuevos creyentes",
            relato: [
              "Tu pastor te pide dar una clase de treinta minutos a los nuevos creyentes sobre la gracia. Es la primera vez que darás una clase así.",
              "Un amigo te dice: No te compliques; habla de lo que sepas y la clase saldrá sola.",
              "Prefieres preparar bien la clase, y abres tu cuaderno para escribir el plan.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Por dónde empiezas a preparar la clase?",
                opciones: [
                  { texto: "Por el objetivo: qué podrá hacer el alumno al terminar.", bien: true, explica: "Antes de preparar el contenido, el maestro se pregunta qué podrá hacer el alumno al terminar." },
                  { texto: "Por buscar historias y videos que les gusten a todos ellos.", explica: "Los materiales ayudan, pero la clase se prepara empezando por el objetivo." },
                  { texto: "Por escribir todo lo que sabes sobre la gracia de Dios.", explica: "Una clase se prepara empezando por el objetivo, no por todo lo que sabe el maestro." },
                ],
                apoyo: "Una clase se prepara empezando por el objetivo",
                explica: "Una clase se prepara empezando por el objetivo: qué podrá hacer el alumno al terminar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál objetivo escribes en tu plan?",
                opciones: [
                  { texto: "Que cada uno explique con sus palabras qué es la gracia.", bien: true, explica: "Explicar es un verbo que se puede comprobar: es del nivel comprender." },
                  { texto: "Que cada uno sepa mucho más de lo que sabe sobre la gracia.", explica: "Saber no se puede comprobar: un buen objetivo usa verbos como explicar, citar, comparar o aplicar." },
                  { texto: "Que cada uno entienda de verdad todo lo que es la gracia.", explica: "Entender, solo, no se puede comprobar: no dice qué podrá hacer el alumno al terminar." },
                ],
                apoyo: "Comprender: explicar con sus palabras qué es la gracia",
                explica: "Un buen objetivo usa un verbo que se puede comprobar, como explicar, y no solo saber o entender.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué escribes en tu plan, además del objetivo?",
                opciones: [
                  { texto: "El tema, el pasaje, las partes con su tiempo, los materiales y las preguntas.", bien: true, explica: "Así es el plan escrito: el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas." },
                  { texto: "Solo el título de la clase y algunas ideas sueltas, para no atarte a nada.", explica: "Una clase improvisada suele dar vueltas sin llegar a ninguna parte: el plan lleva sus partes con su tiempo." },
                  { texto: "Todo lo que vas a decir, palabra por palabra, para leerlo tal cual en la clase.", explica: "El plan lleva el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas." },
                ],
                apoyo: "El maestro escribe su plan: el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas",
                explica: "Con el plan escrito, el maestro enseña con orden, respeta el tiempo y puede mejorar la clase la próxima vez.",
              },
              {
                tipo: "explica",
                apoyo: "Así enseña con orden, respeta el tiempo y puede mejorar la clase la próxima vez",
                clave: {
                  id: "pr-n5-didactica-3-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué le respondes a tu amigo sobre preparar la clase con un plan escrito, y qué más harás para prepararla?",
                  ideas: [
                    { id: "orden", peso: 50, texto: "Que con el plan escrito se enseña con orden, se respeta el tiempo y se puede mejorar la clase la próxima vez.", formas: ["orden", "ordenad*", "respet* el tiempo", "cuid* el tiempo", "con su tiempo", "mejorar* la clase", "la proxima vez"] },
                    { id: "oracion", peso: 50, texto: "Y que la preparará también de rodillas: orará por sus alumnos por su nombre y pedirá al Espíritu que abra su entendimiento.", formas: ["orar*", "orando", "oracion", "ore", "rodillas", "espiritu santo", "abra su entendimiento", "por su nombre"] },
                  ],
                  modelo: "Le respondo que con un plan escrito enseño con orden, respeto el tiempo y puedo mejorar la clase la próxima vez. Además, la prepararé de rodillas: oraré por mis alumnos por su nombre y pediré al Espíritu Santo que abra su entendimiento.",
                },
              },
            ],
          },
          {
            apoyo: "Una clase bíblica lleva a la Escritura y, por ella, a Cristo",
            ref: "Lucas 24:27",
            titulo: "Quince minutos en la célula",
            relato: [
              "Eres líder de célula, y el jueves darás un estudio bíblico de quince minutos sobre Lucas 24:27, el camino a Emaús.",
              "La última vez improvisaste: la reunión dio vueltas y se acabó el tiempo sin llegar a ninguna parte.",
              "Esta vez decides escribir tu plan antes del jueves.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te preguntas antes de preparar el contenido?",
                opciones: [
                  { texto: "¿Qué podrá hacer cada uno al terminar el estudio?", bien: true, explica: "Antes de preparar el contenido, el maestro se pregunta qué podrá hacer el alumno al terminar." },
                  { texto: "¿Qué historia les gustará más a todos en la reunión?", explica: "Una historia puede servir para empezar, pero primero va el objetivo." },
                  { texto: "¿Cuántas cosas sé yo sobre el camino a Emaús?", explica: "No se empieza por lo que sabe el maestro, sino por el objetivo." },
                ],
                apoyo: "Antes de preparar el contenido, el maestro se pregunta: ¿qué podrá hacer el alumno al terminar?",
                explica: "Una clase preparada sabe a dónde va: empieza por el objetivo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo cuidas los quince minutos del estudio?",
                opciones: [
                  { texto: "Pongo en el plan cada parte con su tiempo.", bien: true, explica: "El plan escrito lleva las partes con su tiempo: así se respeta el tiempo." },
                  { texto: "Dejo que la reunión vaya saliendo sola, sin plan.", explica: "Una clase improvisada suele dar vueltas sin llegar a ninguna parte." },
                  { texto: "Uso todo el tiempo en contar la historia del camino.", explica: "La clase tiene sus partes: para empezar, la Palabra, la idea clave, la aplicación y el repaso." },
                ],
                apoyo: "Así enseña con orden, respeta el tiempo y puede mejorar la clase la próxima vez",
                explica: "El maestro escribe las partes con su tiempo: así enseña con orden y respeta el tiempo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A dónde quieres que lleve tu estudio de Lucas 24:27?",
                opciones: [
                  { texto: "A la Escritura y, por ella, a Cristo.", bien: true, explica: "Una clase bíblica lleva a la Escritura y, por ella, a Cristo, como hizo Jesús con los de Emaús." },
                  { texto: "A lo que cada uno opine sobre el camino a Emaús.", explica: "Jesús les declaraba en todas las Escrituras lo que de él decían: la clase lleva a la Escritura." },
                  { texto: "A una historia bonita para que se emocionen todos.", explica: "Una clase bíblica lleva a la Escritura y, por ella, a Cristo." },
                ],
                apoyo: "En el camino a Emaús, Jesús, «comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían»",
                explica: "Una clase bíblica lleva a la Escritura y, por ella, a Cristo.",
              },
              {
                tipo: "explica",
                apoyo: "Un buen objetivo usa un verbo que se puede comprobar, como explicar, citar, comparar o aplicar, y no solo saber o entender",
                clave: {
                  id: "pr-n5-didactica-3-a5-2",
                  tipo: "corta",
                  pregunta: "Escribe el objetivo de tu estudio de Lucas 24:27, con un verbo que se pueda comprobar.",
                  ideas: [
                    { id: "alumno", peso: 40, texto: "Dice qué podrá hacer el alumno al terminar.", formas: ["al terminar", "al final", "(cada|el|los|todos) (uno|alumno|alumnos|hermano|hermanos|miembro|miembros|participante|participantes)", "podra*", "seran capaces", "sera capaz"] },
                    { id: "verbo", peso: 60, texto: "Usa un verbo que se puede comprobar, como explicar, citar, comparar o aplicar.", formas: ["explic*", "cit*", "compar*", "aplic*", "distingu*", "juzg*", "con sus palabras"] },
                  ],
                  modelo: "Al terminar, cada uno podrá explicar con sus palabras cómo Jesús, comenzando desde Moisés, les declaraba en todas las Escrituras lo que de él decían.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que lleva el plan escrito de una clase.",
            texto: "El maestro escribe su plan: el [[tema]], el [[pasaje]], el [[objetivo]], las partes con su tiempo, los materiales y las preguntas.",
            distractores: ["chisme", "aplauso", "pretexto"],
            errores: {
              chisme: "El plan empieza por el tema de la clase.",
              aplauso: "El plan lleva el pasaje que se va a enseñar.",
              pretexto: "El plan lleva el objetivo: qué podrá hacer el alumno al terminar.",
            },
            apoyo: "El maestro escribe su plan: el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas",
            explica: "El plan escrito lleva el tema, el pasaje, el objetivo, las partes con su tiempo, los materiales y las preguntas.",
          },
          {
            consigna: "Completa cómo se prepara la clase también con la oración.",
            texto: "Prepara la clase también de [[rodillas]]: ora por tus alumnos, por su [[nombre]], y pide al Espíritu Santo que les abra el entendimiento.",
            distractores: ["prisa", "nota"],
            errores: {
              prisa: "La clase se prepara también de rodillas, en oración.",
              nota: "Se ora por cada alumno por su nombre.",
            },
            apoyo: "Prepara la clase también de rodillas: ora por tus alumnos por su nombre y pide al Espíritu Santo que abra su entendimiento",
            explica: "El plan escrito y la oración completan la preparación: se ora por cada alumno por su nombre.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Después se ordena en partes: para empezar, la Palabra explicada, la idea clave, la aplicación y el repaso",
            ref: "Nehemías 8:8",
            clave: {
              id: "pr-n5-didactica-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cuáles son las partes de una clase, en su orden, y qué lleva cada una?",
              ideas: [
                { id: "inicio", peso: 34, texto: "Para empezar, una pregunta, una historia o un problema; y la Palabra, el pasaje leído y explicado en su contexto.", formas: ["para empezar", "una pregunta", "una historia", "un problema", "despiert* (el|su) interes", "la palabra", "el pasaje", "su contexto"] },
                { id: "centro", peso: 33, texto: "La idea clave, la verdad central en una frase; y la aplicación para la vida.", formas: ["idea clave", "verdad central", "en una frase", "aplic*", "para la vida", "pregunta personal"] },
                { id: "repaso", peso: 33, texto: "El repaso: preguntas para recordar y comprobar lo aprendido.", formas: ["repas*", "recordar", "comprobar"] },
              ],
              modelo: "Primero, para empezar, una pregunta o una historia que despierte el interés; después, la Palabra leída y explicada en su contexto; luego, la idea clave en una frase y la aplicación para la vida; y al final, el repaso con preguntas para recordar.",
            },
          },
          {
            apoyo: "Es el mismo orden de las lecciones de esta academia: lo que viviste como alumno, ahora lo usas como maestro",
            ref: "Lucas 24:27",
            clave: {
              id: "pr-n5-didactica-3-a7-2",
              tipo: "corta",
              pregunta: "Un maestro de jóvenes solo lee el pasaje y termina la clase. ¿Qué partes le faltan a su clase, según la lección?",
              ideas: [
                { id: "explicar", peso: 30, texto: "Le falta empezar con una pregunta, una historia o un problema, y explicar el pasaje en su contexto.", formas: ["para empezar", "empez* con", "una pregunta", "una historia", "un problema", "interes", "explic*", "contexto"] },
                { id: "idea", peso: 40, texto: "La idea clave en una frase y una aplicación concreta para la vida.", formas: ["idea clave", "verdad central", "en una frase", "aplic*", "para la vida", "pregunta personal"] },
                { id: "repaso", peso: 30, texto: "Y el repaso, con preguntas para recordar y comprobar lo aprendido.", formas: ["repas*", "recordar", "comprobar"] },
              ],
              modelo: "Le falta empezar con una pregunta o una historia, y explicar el pasaje en su contexto. También le falta la idea clave en una frase, una aplicación concreta para la vida y el repaso, con preguntas para recordar lo aprendido.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Enseñar como Jesús
    "n5-didactica-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace una buena pregunta?", reverso: "Hace pensar y obliga a cada uno a responder por sí mismo.", apoyo: "Una buena pregunta hace pensar y obliga a cada uno a responder por sí mismo" },
              { frente: "¿Qué se recuerda mejor que una lista de ideas?", reverso: "Una historia.", apoyo: "Una historia se recuerda mejor que una lista de ideas" },
              { frente: "¿Qué objetos de la vida diaria usó Jesús para enseñar?", reverso: "Las aves, los lirios, una moneda, una semilla.", apoyo: "Objetos de la vida diaria: las aves, los lirios, una moneda, una semilla (Mateo 6:26-28)" },
              { frente: "¿Qué hizo Jesús después de enviar a los setenta?", reverso: "Escuchó lo que habían vivido.", apoyo: "La práctica: envió a los setenta de dos en dos y después escuchó lo que habían vivido (Lucas 10:1, 17)" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué lavó Jesús los pies de sus discípulos?", reverso: "Para enseñarles a servir.", apoyo: "El ejemplo: lavó los pies de sus discípulos para enseñarles a servir (Juan 13:14-15)" },
              { frente: "¿Con quiénes tuvo Jesús una conversación personal?", reverso: "Con Nicodemo de noche y con la samaritana junto al pozo.", apoyo: "La conversación personal: con Nicodemo de noche y con la samaritana junto al pozo (Juan 3 y 4)" },
              { frente: "¿Según qué se escoge el método?", reverso: "Según el objetivo, la edad y el momento del grupo.", apoyo: "El método se escoge según el objetivo, la edad y el momento del grupo, no por moda" },
              { frente: "¿Para qué sirve la exposición breve?", reverso: "Para presentar lo que el alumno no puede descubrir solo.", apoyo: "La exposición breve, para presentar lo que el alumno no puede descubrir solo" },
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
            consigna: "Une cada método de Jesús con un ejemplo de cómo lo usó.",
            pares: [
              ["Las preguntas", "«Y vosotros, ¿quién decís que soy yo?»"],
              ["Las historias", "Las parábolas que contaba a la gente"],
              ["Los objetos de la vida diaria", "Las aves, los lirios, una moneda, una semilla"],
              ["El ejemplo", "Lavó los pies de sus discípulos"],
              ["La práctica", "Envió a los setenta de dos en dos"],
            ],
            apoyo: "Jesús enseñó con preguntas, historias, objetos de la vida diaria, su ejemplo, la práctica y la conversación personal",
            ref: "Mateo 16:15",
            explica: "Jesús enseñó con preguntas, como «Y vosotros, ¿quién decís que soy yo?»; con parábolas; con objetos de la vida diaria; con su ejemplo, lavando los pies de sus discípulos; y con la práctica, enviando a los setenta.",
          },
          {
            consigna: "Une cada método de Jesús con lo que hizo o dijo.",
            pares: [
              ["La conversación personal", "Habló con la samaritana junto al pozo"],
              ["La práctica", "Escuchó lo que habían vivido los setenta"],
              ["El ejemplo", "Les enseñó a servir con lo que hizo"],
              ["Las historias", "Sin parábolas no les hablaba"],
              ["Los objetos de la vida diaria", "Habló de una moneda y de una semilla"],
            ],
            apoyo: "La conversación personal: con Nicodemo de noche y con la samaritana junto al pozo (Juan 3 y 4)",
            ref: "Mateo 13:34",
            explica: "Jesús conversó con la samaritana; escuchó lo que vivieron los setenta; enseñó a servir con su ejemplo; usó parábolas; y habló de objetos de la vida diaria.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una maestra de jóvenes te dice: Quiero que mis alumnos aprendan a orar, pero solo les doy charlas sobre la oración.",
            pregunta: "¿Qué método le recomiendas?",
            opciones: [
              { texto: "La demostración y la práctica: orar con ellos para enseñarles.", bien: true, explica: "La demostración y la práctica: enseñar a orar orando. El método se escoge según el objetivo." },
              { texto: "Una exposición más larga sobre todo lo que se sabe de la oración.", explica: "La exposición breve sirve para presentar lo que el alumno no puede descubrir solo; para aprender a orar, se ora." },
              { texto: "Un video sobre la historia de la oración, para verlo en casa.", explica: "Los recursos visuales ayudan, pero el objetivo es que aprendan a orar: se enseña a orar orando." },
              { texto: "Un mapa de los lugares que aparecen en los evangelios.", explica: "Un mapa es un recurso visual, pero no les enseña a orar: se enseña a orar orando." },
            ],
            apoyo: "La demostración y la práctica: enseñar a orar orando y a evangelizar evangelizando",
            explica: "El método se escoge según el objetivo: si la meta es que aprendan a orar, se enseña a orar orando.",
          },
          {
            caso: "Un maestro de nuevos creyentes te dice: Vamos a estudiar los viajes de Pablo, y mis alumnos se pierden con tantos lugares.",
            pregunta: "¿Qué método le recomiendas?",
            opciones: [
              { texto: "Un recurso visual: un mapa con los viajes de Pablo.", bien: true, explica: "Los recursos visuales son mapas, líneas de tiempo, videos y esquemas: para ubicar tantos lugares, un mapa." },
              { texto: "Una charla de una hora con el nombre de cada ciudad.", explica: "La exposición es breve, y el método se escoge según el objetivo: para ubicar los lugares, un mapa." },
              { texto: "Que salgan a evangelizar esta semana, de dos en dos.", explica: "La práctica es buena, pero el método se escoge según el objetivo: aquí, ubicar los lugares." },
              { texto: "Que conversen en parejas sobre lo que ya saben de Pablo.", explica: "Conversar ayuda, pero el método se escoge según el objetivo: aquí, ubicar los lugares con un mapa." },
            ],
            apoyo: "Los recursos visuales: mapas, líneas de tiempo, videos y esquemas",
            explica: "El método se escoge según el objetivo, la edad y el momento del grupo: para ubicar los lugares, un mapa.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se escoge el método.",
            texto: "El método se escoge según el [[objetivo]], la [[edad]] y el [[momento]] del grupo, no por moda.",
            distractores: ["precio", "fama", "capricho"],
            errores: {
              precio: "El método se escoge según el objetivo de la clase.",
              fama: "El método se escoge también según la edad del grupo.",
              capricho: "El método se escoge según el momento del grupo, no por moda.",
            },
            apoyo: "El método se escoge según el objetivo, la edad y el momento del grupo, no por moda",
            ref: "Juan 16:12",
            explica: "Jesús adaptaba su enseñanza a sus oyentes; el maestro escoge el método según el objetivo, la edad y el momento del grupo, no por moda.",
          },
          {
            consigna: "Completa cómo enseñaba Jesús y qué prefiere hoy el maestro.",
            texto: "Jesús [[adaptaba]] su enseñanza a sus [[oyentes]], y hoy el maestro prefiere los métodos que hacen [[pensar]], participar y practicar al alumno.",
            distractores: ["imponía", "gustos", "callar"],
            errores: {
              "imponía": "Jesús adaptaba su enseñanza a sus oyentes: «Aún tengo muchas cosas que deciros, pero ahora no las podéis sobrellevar».",
              gustos: "Jesús adaptaba su enseñanza a sus oyentes, no a sus propios gustos.",
              callar: "El maestro prefiere los métodos que hacen pensar, participar y practicar al alumno.",
            },
            apoyo: "Hoy el maestro escoge el método según el objetivo y el grupo, y prefiere los que hacen pensar, participar y practicar al alumno",
            ref: "Juan 16:12",
            explica: "Jesús adaptó su enseñanza a sus oyentes; hoy el maestro escoge el método según el objetivo y el grupo, y prefiere los que hacen pensar, participar y practicar.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Este método hace participar al alumno, o el alumno solo escucha? Lleva cada frase a su grupo.",
            grupos: ["Hace participar al alumno", "El alumno solo escucha"],
            frases: [
              { texto: "Una pregunta que obliga a cada uno a responder", grupo: 0 },
              { texto: "La conversación en grupos pequeños", grupo: 0 },
              { texto: "Un estudio de casos que se resuelve con la Biblia", grupo: 0 },
              { texto: "Enseñar a evangelizar evangelizando", grupo: 0 },
              { texto: "Una charla de una hora sin preguntas", grupo: 1 },
              { texto: "Leer un resumen mientras el grupo copia", grupo: 1 },
              { texto: "Un video largo sin pausas ni conversación", grupo: 1 },
            ],
            apoyo: "El mejor método es el que lleva al alumno a pensar, a participar y a practicar",
            explica: "Las preguntas, la conversación, el estudio de casos y la práctica hacen pensar, participar y practicar al alumno; una charla larga sin preguntas lo deja solo escuchando.",
          },
          {
            consigna: "En una clase en línea, ¿esto ayuda a que participen o no ayuda? Lleva cada frase a su grupo.",
            grupos: ["Ayuda en la clase en línea", "No ayuda en la clase en línea"],
            frases: [
              { texto: "Alternar explicaciones cortas con preguntas", grupo: 0 },
              { texto: "Llamar a cada alumno por su nombre", grupo: 0 },
              { texto: "Dar tareas que se puedan hacer desde el celular", grupo: 0 },
              { texto: "Explicar una hora seguida sin preguntar nada", grupo: 1 },
              { texto: "Hablar al grupo en general, sin nombres", grupo: 1 },
              { texto: "Dar tareas que solo se hacen en una computadora", grupo: 1 },
            ],
            apoyo: "En una clase en línea la atención dura menos: alterna explicaciones cortas con preguntas, llama a cada alumno por su nombre y da tareas que se puedan hacer desde el celular",
            explica: "En una clase en línea la atención dura menos: se alternan explicaciones cortas con preguntas, se llama a cada alumno por su nombre y se dan tareas para el celular.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "En una clase en línea la atención dura menos",
            ref: "Mateo 16:15",
            situacion: "Das una clase en línea, por videollamada, a quince alumnos que estudian Mateo 16. Varios se conectan desde el celular.",
            escenas: [
              {
                id: "e1",
                narra: "Empieza la clase.",
                pregunta: "¿Cómo la empiezas?",
                opciones: [
                  { texto: "Con una pregunta, llamando a cada uno por su nombre.", valor: 2, explica: "Una buena pregunta hace pensar, y en línea conviene llamar a cada alumno por su nombre.", siguiente: "e2" },
                  { texto: "Explicando cuarenta minutos seguidos, sin ninguna pausa.", valor: 0, explica: "En una clase en línea la atención dura menos: alterna explicaciones cortas con preguntas.", siguiente: "e1b" },
                  { texto: "Con una pregunta general al grupo, sin nombrar a nadie.", valor: 1, explica: "La pregunta ayuda, pero en línea conviene llamar a cada alumno por su nombre.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "A los diez minutos, varios apagaron la cámara y nadie responde.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Alternas explicaciones cortas con preguntas.", valor: 2, explica: "En una clase en línea la atención dura menos: alterna explicaciones cortas con preguntas.", siguiente: "e2" },
                  { texto: "Hablas más fuerte y sigues explicando igual que antes.", valor: 0, explica: "En línea la atención dura menos: alterna explicaciones cortas con preguntas.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llegan a Mateo 16:15, donde Jesús pregunta a sus discípulos quién dicen que es él.",
                pregunta: "¿Qué haces con esa pregunta?",
                opciones: [
                  { texto: "Se la haces a cada uno, y cada uno responde solo.", valor: 2, explica: "Una buena pregunta hace pensar y obliga a cada uno a responder por sí mismo." },
                  { texto: "Das tú mismo la respuesta enseguida, para ganar tiempo.", valor: 0, explica: "La pregunta de Jesús obliga a cada uno a responder por sí mismo." },
                  { texto: "Pides que la respondan por escrito después de la clase.", valor: 1, explica: "Responder por escrito ayuda, pero una buena pregunta hace pensar y obliga a cada uno a responder por sí mismo." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, quieres que practiquen lo aprendido durante la semana.",
                pregunta: "¿Qué tarea les das?",
                opciones: [
                  { texto: "Una tarea corta que se pueda hacer desde el celular.", valor: 2, explica: "En línea, da tareas que se puedan hacer desde el celular." },
                  { texto: "Un trabajo largo que solo se puede hacer en computadora.", valor: 0, explica: "Varios se conectan desde el celular: da tareas que se puedan hacer desde el celular." },
                  { texto: "Que lean otra vez el capítulo, sin nada que responder.", valor: 1, explica: "Leer ayuda, pero el mejor método lleva al alumno a pensar, a participar y a practicar." },
                ],
              },
            ],
          },
          {
            apoyo: "La práctica: envió a los setenta de dos en dos y después escuchó lo que habían vivido (Lucas 10:1, 17)",
            ref: "Lucas 10:1, 17",
            situacion: "Enseñas a un grupo pequeño de jóvenes a compartir su fe. Quieres que no solo escuchen, sino que piensen, participen y practiquen.",
            escenas: [
              {
                id: "e1",
                narra: "Empieza la primera clase.",
                pregunta: "¿Cómo empiezas?",
                opciones: [
                  { texto: "Con una pregunta: ¿quién te habló de Jesús a ti?", valor: 2, explica: "Una buena pregunta hace pensar y obliga a cada uno a responder por sí mismo.", siguiente: "e2" },
                  { texto: "Leyendo veinte minutos tus apuntes sobre evangelismo.", valor: 0, explica: "El mejor método es el que lleva al alumno a pensar, a participar y a practicar.", siguiente: "e1b" },
                  { texto: "Con una exposición breve sobre cómo se comparte la fe.", valor: 1, explica: "La exposición breve sirve para lo que el alumno no puede descubrir solo; una pregunta los hace pensar y participar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Varios jóvenes miran el celular, y nadie dice nada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los pones a conversar en grupos pequeños.", valor: 2, explica: "La pregunta y la conversación en grupos pequeños llevan al alumno a pensar y a participar.", siguiente: "e2" },
                  { texto: "Sigues leyendo, porque ya falta poco para terminar.", valor: 0, explica: "El mejor método es el que lleva al alumno a pensar, a participar y a practicar.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Llega el momento de aprender a compartir la fe.",
                pregunta: "¿Qué método usas?",
                opciones: [
                  { texto: "Salen de dos en dos a compartir su fe contigo.", valor: 2, explica: "La demostración y la práctica: enseñar a evangelizar evangelizando, como Jesús envió a los setenta de dos en dos." },
                  { texto: "Les das una lista de pasos para leer en casa.", valor: 0, explica: "Se enseña a evangelizar evangelizando: la demostración y la práctica." },
                  { texto: "Les muestras un esquema de cómo presentar el evangelio.", valor: 1, explica: "Los recursos visuales ayudan, pero se enseña a evangelizar evangelizando." },
                ],
              },
              {
                id: "e3",
                narra: "Los jóvenes vuelven de su primera salida.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Escuchas lo que vivieron, como Jesús con los setenta.", valor: 2, explica: "Jesús envió a los setenta de dos en dos y después escuchó lo que habían vivido." },
                  { texto: "Pasas enseguida al tema siguiente, sin preguntarles nada.", valor: 0, explica: "Jesús, después de enviar a los setenta, escuchó lo que habían vivido." },
                  { texto: "Les cuentas tú cómo te fue a ti en tu primera salida.", valor: 1, explica: "Contar lo tuyo puede ayudar, pero Jesús escuchó lo que habían vivido sus discípulos." },
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
            apoyo: "El método se escoge según el objetivo, la edad y el momento del grupo, no por moda",
            ref: "Juan 16:12",
            clave: {
              id: "pr-n5-didactica-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué muestra Juan 16:12 sobre cómo enseñaba Jesús, y según qué escoge hoy el maestro su método?",
              ideas: [
                { id: "jesus", peso: 50, texto: "Que Jesús adaptaba su enseñanza a sus oyentes: tenía muchas cosas que decirles, pero todavía no las podían sobrellevar.", formas: ["adapt*", "sobrellev*", "soport*", "a sus oyentes", "a su (tiempo|ritmo|nivel|medida)", "segun (sus|los) oyentes", "lo que podian"] },
                { id: "segun", peso: 50, texto: "Que hoy el maestro escoge el método según el objetivo, la edad y el momento del grupo, no por moda.", formas: ["objetivo", "edad", "momento del grupo", "momento que vive", "segun el grupo", "segun (su|sus|el|los) (grupo|alumnos)", "del grupo"] },
              ],
              errores: [
                { id: "moda", texto: "El método se escoge según el objetivo, la edad y el momento del grupo, no por moda.", formas: ["(segun|por) (la|una) moda", "(segun|por) moda", "esta de moda", "(segun|por) lo que (le|me|te) guste"], anula: "segun" },
              ],
              modelo: "Muestra que Jesús adaptaba su enseñanza a sus oyentes: tenía muchas cosas que decirles, pero todavía no las podían sobrellevar. Hoy el maestro escoge el método según el objetivo, la edad y el momento del grupo, no por moda.",
            },
          },
          {
            apoyo: "El mejor método es el que lleva al alumno a pensar, a participar y a practicar",
            ref: "Lucas 10:1, 17",
            clave: {
              id: "pr-n5-didactica-4-a7-2",
              tipo: "corta",
              pregunta: "Vas a enseñar a tu grupo a evangelizar. ¿Qué método de Jesús usarás, y por qué es el adecuado?",
              ideas: [
                { id: "practica", peso: 50, texto: "La práctica: enviarlos a evangelizar, como Jesús envió a los setenta de dos en dos, y después escuchar lo que vivieron.", formas: ["practic*", "envi*", "los setenta", "evangelizando", "demostracion", "escuch* lo que", "(salir|saldremos|saldran|salgan|salimos|saldre|salen|sale) (a|con) (evangelizar|predicar|compartir)"] },
                { id: "porque", peso: 50, texto: "Porque el método se escoge según el objetivo, y el mejor lleva al alumno a pensar, a participar y a practicar.", formas: ["objetivo", "particip*", "pensar", "aprend* haciendo", "no solo (escuch*|oir|oy*)", "la meta"] },
              ],
              modelo: "Usaré la práctica: los enviaré a evangelizar de dos en dos, como Jesús envió a los setenta, y después escucharé lo que vivieron. Es el adecuado porque el objetivo es que aprendan a evangelizar, y así piensan, participan y practican.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Evaluar el aprendizaje
    "n5-didactica-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace la evaluación formativa?", reverso: "Acompaña el aprendizaje y muestra qué falta cuando todavía hay tiempo de corregir.", apoyo: "La evaluación formativa acompaña el aprendizaje: preguntas en clase, repasos y tareas que muestran qué falta cuando todavía hay tiempo de corregir" },
              { frente: "¿Qué mide la evaluación final?", reverso: "El resultado: un examen o un trabajo al terminar, con su nota.", apoyo: "La evaluación final mide el resultado: un examen o un trabajo al terminar, con su nota" },
              { frente: "¿Qué pide Proverbios 27:23 al pastor?", reverso: "Que sea diligente en conocer el estado de sus ovejas.", apoyo: "«Sé diligente en conocer el estado de tus ovejas»" },
              { frente: "Si nadie hace preguntas, ¿quiere decir que todos entendieron?", reverso: "No: que nadie haga preguntas no significa que todos entendieron.", apoyo: "Que nadie haga preguntas no significa que todos entendieron" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué evalúa el maestro?", reverso: "Para saber cómo van sus alumnos.", apoyo: "el maestro también necesita saber cómo van sus alumnos, y para eso evalúa" },
              { frente: "¿Para qué usa la academia una tabla de especificaciones?", reverso: "Para que el examen cubra toda la materia y no solo un tema.", apoyo: "para que el examen cubra toda la materia y no solo un tema" },
              { frente: "¿Qué dicen de antemano las rúbricas?", reverso: "Qué se evalúa y cuántos puntos vale cada criterio.", apoyo: "Rúbricas: dicen de antemano qué se evalúa y cuántos puntos vale cada criterio, como la del sermón del Nivel 4" },
              { frente: "¿Qué dice una nota baja?", reverso: "Qué falta aprender, no cuánto vale el alumno.", apoyo: "Una nota baja dice qué falta aprender, no cuánto vale el alumno" },
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
            consigna: "¿Es evaluación formativa o evaluación final? Lleva cada frase a su grupo.",
            grupos: ["Evaluación formativa", "Evaluación final"],
            frases: [
              { texto: "Preguntas en clase que muestran qué falta", grupo: 0 },
              { texto: "Repasos cuando todavía hay tiempo de corregir", grupo: 0 },
              { texto: "Tareas que acompañan el aprendizaje", grupo: 0 },
              { texto: "Acompaña el aprendizaje mientras se enseña", grupo: 0 },
              { texto: "Un examen al terminar, con su nota", grupo: 1 },
              { texto: "Un trabajo final que mide el resultado", grupo: 1 },
              { texto: "La nota que se pone al terminar", grupo: 1 },
            ],
            apoyo: "La evaluación formativa acompaña el aprendizaje",
            explica: "La formativa acompaña el aprendizaje con preguntas, repasos y tareas que muestran qué falta a tiempo; la final mide el resultado con un examen o un trabajo al terminar, con su nota.",
          },
          {
            consigna: "¿Esto acompaña el aprendizaje o mide el resultado final? Lleva cada frase a su grupo.",
            grupos: ["Acompaña el aprendizaje", "Mide el resultado final"],
            frases: [
              { texto: "El repaso al final de cada lección", grupo: 0 },
              { texto: "Una pregunta en clase para ver si entendieron", grupo: 0 },
              { texto: "Una tarea corta para ver qué falta todavía", grupo: 0 },
              { texto: "El examen final de la materia, con su nota", grupo: 1 },
              { texto: "El trabajo que se entrega al terminar, con su nota", grupo: 1 },
            ],
            apoyo: "La evaluación final mide el resultado: un examen o un trabajo al terminar, con su nota",
            explica: "Lo que muestra qué falta cuando todavía hay tiempo de corregir es formativo; el examen o el trabajo al terminar, con su nota, es la evaluación final.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada manera de evaluar con lo que dice la lección.",
            pares: [
              ["Preguntas de opción o de verdadero o falso", "Se corrigen rápido y sirven para recordar"],
              ["Respuestas escritas", "Muestran si el alumno explica con sus palabras"],
              ["Rúbricas", "Dicen de antemano qué se evalúa y cuánto vale"],
              ["Trabajos prácticos", "Una clase dada, un estudio preparado, una visita"],
              ["Tabla de especificaciones", "Dice qué objetivo mide cada pregunta"],
            ],
            apoyo: "Cada pregunta debe medir un objetivo de la clase",
            explica: "Las preguntas de opción se corrigen rápido; las respuestas escritas muestran si el alumno explica y aplica; las rúbricas dicen de antemano qué se evalúa; los trabajos prácticos son una clase, un estudio o una visita; y la tabla dice qué objetivo mide cada pregunta.",
          },
          {
            consigna: "Une lo que quieres comprobar con la manera de evaluarlo.",
            pares: [
              ["Que el alumno recuerde un dato de la clase", "Una pregunta de opción"],
              ["Que el alumno explique y aplique con sus palabras", "Una respuesta escrita"],
              ["Que el alumno prepare y dé un estudio", "Un trabajo práctico"],
              ["Que todos sepan cuánto vale cada criterio", "Una rúbrica"],
              ["Que el examen cubra toda la materia", "Una tabla de especificaciones"],
            ],
            apoyo: "Preparar preguntas y rúbricas que midan los objetivos de la clase",
            explica: "Cada pregunta mide un objetivo: para recordar, una pregunta de opción; para explicar y aplicar, una respuesta escrita; para preparar un estudio, un trabajo práctico; la rúbrica dice cuánto vale cada criterio, y la tabla hace que el examen cubra toda la materia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Cada pregunta debe medir un objetivo de la clase",
            ref: "Proverbios 27:23",
            titulo: "La prueba de la clase de Esdras",
            relato: [
              "Diste a los nuevos creyentes una clase sobre Esdras 7:10. Tu objetivo fue que cada uno explicara con sus palabras el orden de Esdras: estudiar, obedecer y enseñar.",
              "Ahora preparas una prueba corta para la clase siguiente. Un hermano te ofrece la suya: veinte preguntas sobre las fechas y los reyes del libro de Esdras.",
              "Quieres que tu prueba mida lo que te propusiste.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con la prueba del hermano?",
                opciones: [
                  { texto: "No la uso: cada pregunta debe medir un objetivo de mi clase.", bien: true, explica: "Cada pregunta debe medir un objetivo de la clase; las fechas y los reyes no fueron tu objetivo." },
                  { texto: "La uso tal cual, porque tiene muchas preguntas y eso es mejor.", explica: "No importa cuántas preguntas tenga: cada pregunta debe medir un objetivo de la clase." },
                  { texto: "La uso, y le agrego una pregunta sobre el orden de Esdras.", explica: "Una sola pregunta de tu objetivo no basta: cada pregunta debe medir un objetivo de la clase." },
                ],
                apoyo: "Cada pregunta debe medir un objetivo de la clase",
                explica: "La evaluación mide lo que se enseñó: cada pregunta mide un objetivo de la clase.",
              },
              {
                tipo: "situacion",
                pregunta: "Tu objetivo pide explicar con sus palabras. ¿Qué tipo de pregunta usas?",
                opciones: [
                  { texto: "Una respuesta escrita, para ver si explica con sus palabras.", bien: true, explica: "Las respuestas escritas muestran si el alumno explica con sus palabras y aplica." },
                  { texto: "Solo preguntas de verdadero o falso, que se corrigen más rápido.", explica: "Las preguntas de verdadero o falso sirven para recordar y comprender, no para ver si explica con sus palabras." },
                  { texto: "Una pregunta de relacionar nombres con fechas del libro.", explica: "Relacionar sirve para recordar; tu objetivo pide explicar con sus palabras." },
                ],
                apoyo: "Respuestas escritas: muestran si el alumno explica con sus palabras y aplica",
                explica: "Para comprobar que el alumno explica con sus palabras, se usa una respuesta escrita.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo te aseguras de corregir esas respuestas con justicia?",
                opciones: [
                  { texto: "Con una rúbrica que todos conocen antes de responder.", bien: true, explica: "La rúbrica dice de antemano qué se evalúa y cuántos puntos vale cada criterio." },
                  { texto: "Leyendo cada respuesta y poniendo la nota que te parezca.", explica: "La evaluación es justa cuando todos saben de antemano qué se evaluará." },
                  { texto: "Dándoles más puntos a los alumnos que más participan.", explica: "La evaluación es justa cuando las mismas reglas valen para todos." },
                ],
                apoyo: "Rúbricas: dicen de antemano qué se evalúa y cuántos puntos vale cada criterio, como la del sermón del Nivel 4",
                explica: "La rúbrica dice de antemano qué se evalúa y cuántos puntos vale cada criterio.",
              },
              {
                tipo: "explica",
                apoyo: "La evaluación es justa cuando todos saben de antemano qué se evaluará, cuando las mismas reglas valen para todos y cuando el alumno puede ver su error y pedir revisión",
                clave: {
                  id: "pr-n5-didactica-5-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué hará que tu prueba sea justa para todos tus alumnos?",
                  ideas: [
                    { id: "antemano", peso: 34, texto: "Que todos sepan de antemano qué se evaluará.", formas: ["de antemano", "antes (de|del) (prueba|examen|responder)", "(sepan|saben|sabran|sepamos) (que|lo) se (evalua|evaluara)", "conoc* la rubrica"] },
                    { id: "reglas", peso: 33, texto: "Que las mismas reglas valgan para todos.", formas: ["mismas reglas", "misma regla", "igual para todos", "iguales para todos", "todos por igual", "sin favorit*", "sin preferencias"] },
                    { id: "revision", peso: 33, texto: "Que cada alumno pueda ver su error y pedir revisión.", formas: ["ver su error", "vea su error", "vean su error", "ver sus errores", "vean sus errores", "pedir revision", "pida revision", "pidan revision", "revision", "apel*"] },
                  ],
                  modelo: "Será justa si todos saben de antemano qué se evaluará, si las mismas reglas valen para todos y si cada alumno puede ver su error y pedir revisión.",
                },
              },
            ],
          },
          {
            apoyo: "Rúbricas: dicen de antemano qué se evalúa y cuántos puntos vale cada criterio, como la del sermón del Nivel 4",
            ref: "Proverbios 11:1",
            titulo: "El estudio que preparan tus alumnos",
            relato: [
              "En tu clase de la escuela bíblica, cada alumno debe preparar un estudio bíblico de quince minutos para su grupo. Es un objetivo del nivel crear.",
              "Varios te preguntan: ¿Cómo nos va a evaluar? ¿Qué es lo que más cuenta?",
              "Todavía no tienes nada escrito para evaluarlos.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué preparas para evaluar sus estudios?",
                opciones: [
                  { texto: "Una rúbrica que diga qué se evalúa y cuánto vale cada parte.", bien: true, explica: "Las rúbricas dicen de antemano qué se evalúa y cuántos puntos vale cada criterio, como la del sermón del Nivel 4." },
                  { texto: "Una prueba de verdadero o falso sobre todo lo que enseñaste hoy.", explica: "Un estudio preparado es un trabajo práctico; el verdadero o falso sirve para recordar y comprender." },
                  { texto: "Nada escrito: pondrás la nota según lo que sientas al escucharlos.", explica: "La evaluación es justa cuando todos saben de antemano qué se evaluará." },
                ],
                apoyo: "Rúbricas: dicen de antemano qué se evalúa y cuántos puntos vale cada criterio, como la del sermón del Nivel 4",
                explica: "Para un trabajo práctico, como un estudio preparado, la rúbrica dice de antemano qué se evalúa.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuándo les das la rúbrica?",
                opciones: [
                  { texto: "Desde ahora, antes de que preparen sus estudios.", bien: true, explica: "La evaluación es justa cuando todos saben de antemano qué se evaluará." },
                  { texto: "Al final, cuando ya tengan su nota, para que la vean.", explica: "La rúbrica dice de antemano qué se evalúa: no sirve si llega después." },
                  { texto: "Nunca: la rúbrica es solo para el maestro que evalúa.", explica: "Todos deben saber de antemano qué se evaluará." },
                ],
                apoyo: "La evaluación es justa cuando todos saben de antemano qué se evaluará",
                explica: "La rúbrica se da de antemano: así la evaluación es justa.",
              },
              {
                tipo: "situacion",
                pregunta: "Un alumno ve su nota y no entiende por qué perdió puntos. ¿Qué haces?",
                opciones: [
                  { texto: "Le muestras su error con la rúbrica, y puede pedir revisión.", bien: true, explica: "La evaluación es justa cuando el alumno puede ver su error y pedir revisión." },
                  { texto: "Le dices que la nota ya está puesta y que no se puede cambiar.", explica: "El alumno puede ver su error y pedir revisión; en la academia, un profesor puede revisar una respuesta y cambiar la nota escribiendo el motivo." },
                  { texto: "Le subes la nota para que no se sienta mal delante del grupo.", explica: "Evalúa con verdad y anima con amor: una nota baja dice qué falta aprender, no cuánto vale el alumno." },
                ],
                apoyo: "cuando el alumno puede ver su error y pedir revisión",
                explica: "La evaluación es justa cuando el alumno puede ver su error y pedir revisión.",
              },
              {
                tipo: "explica",
                apoyo: "la rúbrica dice de antemano qué se evalúa",
                clave: {
                  id: "pr-n5-didactica-5-a4-2",
                  tipo: "corta",
                  pregunta: "¿Para qué sirve la rúbrica de los estudios, y cuándo se la das a tus alumnos?",
                  ideas: [
                    { id: "dice", peso: 50, texto: "La rúbrica dice qué se evalúa y cuántos puntos vale cada criterio.", formas: ["que se evalua", "lo que se (evalua|evaluara)", "lo que se va a evaluar", "cuantos puntos", "puntos vale", "cada criterio", "criterios"] },
                    { id: "justa", peso: 50, texto: "Se da de antemano, porque la evaluación es justa cuando todos saben antes qué se evaluará.", formas: ["de antemano", "antes de que (preparen|hagan|empiecen|presenten)", "antes de (preparar|empezar|hacer|presentar)", "desde ahora", "desde el (principio|inicio|comienzo)", "(sepan|sepamos|saben|sabran|conozcan|conocen) antes"] },
                  ],
                  errores: [
                    { id: "despues", texto: "La rúbrica se da de antemano, no al final: la evaluación es justa cuando todos saben antes qué se evaluará.", formas: ["(doy|dare|entrego|entregare|da|dan) (al|el) final", "despues de (calificar|corregir|evaluar|presentar)", "cuando (ya|tengan) (tengan|su) nota"], anula: "justa" },
                  ],
                  modelo: "La rúbrica dice qué se evalúa y cuántos puntos vale cada criterio. Se la doy de antemano, antes de que preparen su estudio, porque la evaluación es justa cuando todos saben antes qué se evaluará.",
                },
              },
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
            caso: "Un alumno te dice: Saqué una nota baja en la tarea; creo que soy un mal alumno y que no sirvo para esto.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la nota dice qué falta aprender, y cómo puede mejorar.", bien: true, explica: "Una nota baja dice qué falta aprender, no cuánto vale el alumno: corrige, explica y muestra cómo mejorar." },
              { texto: "Que tiene razón: si sacó esa nota, quizá esto no es para él.", explica: "La nota no es la persona: una nota baja dice qué falta aprender, no cuánto vale el alumno." },
              { texto: "Que no se preocupe: le subirás la nota para que se sienta mejor.", explica: "Evalúa con verdad y anima con amor: las mismas reglas valen para todos." },
              { texto: "Que la nota no importa nada, y que no vuelva a pensar en ella.", explica: "La nota sí dice algo: qué falta aprender. Evalúa con verdad y anima con amor." },
            ],
            apoyo: "Una nota baja dice qué falta aprender, no cuánto vale el alumno",
            explica: "Evalúa con verdad y anima con amor: la nota baja dice qué falta aprender, y la corrección muestra cómo mejorar.",
          },
          {
            caso: "Una maestra de la escuela dominical te dice: Ya vi los errores de mis alumnos en la tarea, pero los voy a corregir al final del año.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que corrija pronto, explique por qué y muestre cómo mejorar.", bien: true, explica: "La corrección forma parte de la enseñanza: corrige pronto, explica por qué y muestra cómo mejorar." },
              { texto: "Que espere al final del año, cuando tenga mucho más tiempo libre.", explica: "La evaluación formativa muestra qué falta cuando todavía hay tiempo de corregir." },
              { texto: "Que corrija pronto, pero solo marcando la nota, sin explicar nada.", explica: "Corregir pronto está bien, pero también se explica por qué y se muestra cómo mejorar." },
              { texto: "Que no corrija nada, para que los alumnos no se desanimen.", explica: "La corrección forma parte de la enseñanza, y Pablo pide hacerlo «con toda paciencia y doctrina»." },
            ],
            apoyo: "Corrige pronto, explica por qué y muestra cómo mejorar",
            ref: "2 Timoteo 4:2",
            explica: "Pablo pide redargüir, reprender y exhortar «con toda paciencia y doctrina»: la corrección es pronta, explicada y paciente.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la corrección: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La corrección forma parte de la enseñanza.", verdad: true, explica: "Pablo pide redargüir, reprender y exhortar «con toda paciencia y doctrina».", apoyo: "La corrección forma parte de la enseñanza", ref: "2 Timoteo 4:2" },
              { texto: "Conviene corregir al final, cuando ya no hay prisa.", verdad: false, explica: "Corrige pronto, explica por qué y muestra cómo mejorar.", apoyo: "Corrige pronto, explica por qué y muestra cómo mejorar", ref: "2 Timoteo 4:2" },
              { texto: "Una nota baja dice cuánto vale el alumno.", verdad: false, explica: "Una nota baja dice qué falta aprender, no cuánto vale el alumno.", apoyo: "Una nota baja dice qué falta aprender, no cuánto vale el alumno" },
            ],
          },
          {
            consigna: "Sobre la justicia al evaluar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La evaluación es justa cuando todos saben de antemano qué se evaluará.", verdad: true, explica: "Y cuando las mismas reglas valen para todos y el alumno puede ver su error y pedir revisión.", apoyo: "La evaluación es justa cuando todos saben de antemano qué se evaluará", ref: "Proverbios 11:1" },
              { texto: "En la academia, un profesor puede cambiar una nota sin escribir el motivo.", verdad: false, explica: "Un profesor puede revisar una respuesta y cambiar la nota escribiendo el motivo.", apoyo: "En la academia, el sistema corrige, pero un profesor puede revisar una respuesta y cambiar la nota escribiendo el motivo" },
              { texto: "Al corregir, se explica por qué y se muestra cómo mejorar.", verdad: true, explica: "Corrige pronto, explica por qué y muestra cómo mejorar.", apoyo: "Corrige pronto, explica por qué y muestra cómo mejorar", ref: "2 Timoteo 4:2" },
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
            apoyo: "La evaluación formativa acompaña el aprendizaje y la final mide el resultado",
            ref: "Proverbios 27:23",
            clave: {
              id: "pr-n5-didactica-5-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencian la evaluación formativa y la evaluación final? Da un ejemplo de cada una.",
              ideas: [
                { id: "formativa", peso: 50, texto: "La formativa acompaña el aprendizaje: preguntas en clase, repasos y tareas que muestran qué falta cuando todavía hay tiempo de corregir.", formas: ["acompan*", "todavia hay tiempo", "hay tiempo de corregir", "a tiempo", "que falta", "preguntas en clase", "repasos", "tareas", "durante (el|la) (aprendizaje|clase|curso)", "mientras (aprend*|ensen*)", "mientras se (aprende|ensena)"] },
                { id: "final", peso: 50, texto: "La final mide el resultado al terminar: un examen o un trabajo, con su nota.", formas: ["mide el resultado", "resultado", "al terminar", "examen", "trabajo final", "con su nota", "la nota"] },
              ],
              errores: [
                { id: "formativa-final", texto: "La formativa acompaña el aprendizaje; la que mide el resultado al terminar es la final.", formas: ["(evaluacion|la) formativa mide", "(evaluacion|la) formativa (es|seria) (un|el) examen", "(evaluacion|la) formativa (da|pone) (la|su) nota"], anula: "formativa" },
                { id: "final-acompana", texto: "La final mide el resultado; la que acompaña el aprendizaje es la formativa.", formas: ["(evaluacion|la) final acompan*", "(evaluacion|la) final (muestra|ve) (que|lo) falta"], anula: "final" },
              ],
              modelo: "La formativa acompaña el aprendizaje y muestra qué falta cuando todavía hay tiempo de corregir, como las preguntas en clase o los repasos. La final mide el resultado al terminar, como un examen con su nota.",
            },
          },
          {
            apoyo: "Evaluar es conocer el estado de los alumnos",
            ref: "Proverbios 27:23",
            clave: {
              id: "pr-n5-didactica-5-a7-2",
              tipo: "corta",
              pregunta: "Un maestro solo pone un examen al final del curso. ¿Qué le falta, y por qué le serviría?",
              ideas: [
                { id: "formativa", peso: 50, texto: "Le falta la evaluación formativa: preguntas en clase, repasos y tareas que acompañan el aprendizaje.", formas: ["formativa", "acompan*", "preguntas en clase", "preguntas en la clase", "repasos", "tareas", "durante (el|la) (curso|clase|aprendizaje)"] },
                { id: "tiempo", peso: 50, texto: "Le serviría para ver qué falta cuando todavía hay tiempo de corregir, y conocer el estado de sus alumnos.", formas: ["todavia hay tiempo", "a tiempo", "que (les|le) falta", "que falta", "corregir", "estado de (sus|los) alumnos", "como van (sus|los) alumnos"] },
              ],
              modelo: "Le falta la evaluación formativa, que acompaña el aprendizaje con preguntas en clase, repasos y tareas. Le serviría para conocer el estado de sus alumnos y ver qué falta cuando todavía hay tiempo de corregir.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Acompañar a los alumnos
    "n5-didactica-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Pablo con Timoteo, además de predicarle?", reverso: "Lo llevó consigo, lo corrigió, lo animó y le escribió cartas.", apoyo: "Pablo no solo predicó a Timoteo: lo llevó consigo, lo corrigió, lo animó y le escribió cartas" },
              { frente: "¿Cómo dice Pablo que fue entre los tesalonicenses?", reverso: "Tierno, como la nodriza que cuida con ternura a sus propios hijos.", apoyo: "«fuimos tiernos entre vosotros, como la nodriza que cuida con ternura a sus propios hijos»" },
              { frente: "¿Qué les entregó Pablo a los tesalonicenses, además del evangelio?", reverso: "Su propia vida.", apoyo: "les entregó no solo el evangelio, sino su propia vida" },
              { frente: "¿De qué aprende el alumno, según Filipenses 4:9?", reverso: "De lo que oye y de lo que ve en su maestro.", apoyo: "El alumno aprende de lo que oye y de lo que ve en su maestro" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace el maestro cristiano, además de pasar información?", reverso: "Acompaña a la persona.", apoyo: "El maestro cristiano acompaña a la persona, no solo le pasa información" },
              { frente: "¿Qué puede evitar una palabra a tiempo?", reverso: "Que el alumno que se detiene abandone.", apoyo: "Escribir al que se detiene: una palabra a tiempo puede evitar que abandone" },
              { frente: "¿Cuándo se ve el fruto del maestro?", reverso: "Cuando sus alumnos enseñan a otros.", apoyo: "El fruto del maestro se ve cuando sus alumnos enseñan a otros" },
              { frente: "Si al acompañar descubres un peligro o un abuso, ¿qué sigues?", reverso: "Las normas de la materia de ética.", apoyo: "si descubres un peligro o un abuso, sigue las normas de la materia de ética" },
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
            consigna: "¿Con quién se compara Pablo al recordar cómo trató a los tesalonicenses? Toca las palabras que lo dicen.",
            texto: "fuimos tiernos entre vosotros, como la [[nodriza]] que cuida con ternura a sus propios hijos",
            apoyo: "Pablo recuerda a los tesalonicenses: «fuimos tiernos entre vosotros, como la nodriza que cuida con ternura a sus propios hijos»",
            ref: "1 Tesalonicenses 2:7-8",
            explica: "Pablo fue tierno con los tesalonicenses, como la nodriza que cuida con ternura a sus propios hijos, y les entregó no solo el evangelio, sino su propia vida.",
          },
          {
            consigna: "¿De qué cuatro maneras recibieron los filipenses lo que Pablo les enseñó? Toca las palabras que lo dicen.",
            texto: "Lo que [[aprendisteis]] y [[recibisteis]] y [[oísteis]] y [[visteis]] en mí, esto haced",
            apoyo: "El alumno aprende de lo que oye y de lo que ve en su maestro",
            ref: "Filipenses 4:9",
            explica: "Los filipenses aprendieron, recibieron, oyeron y vieron en Pablo lo que debían hacer: el alumno aprende de lo que oye y de lo que ve en su maestro.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Escribir al que se detiene: una palabra a tiempo puede evitar que abandone",
            ref: "1 Tesalonicenses 2:7-8",
            situacion: "Eres maestro de la clase de nuevos creyentes de tu iglesia. Hace dos semanas que Andrés no viene, y en la última clase se lo veía desanimado.",
            escenas: [
              {
                id: "e1",
                narra: "Es lunes, y piensas en Andrés.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le escribes hoy mismo una palabra de ánimo.", valor: 2, explica: "Escribir al que se detiene: una palabra a tiempo puede evitar que abandone.", siguiente: "e2" },
                  { texto: "Esperas a que vuelva solo, si de verdad quiere seguir.", valor: 0, explica: "Una palabra a tiempo puede evitar que abandone: el maestro escribe al que se detiene.", siguiente: "e1b" },
                  { texto: "Oras por él, pero esperas a ver si vuelve el domingo.", valor: 1, explica: "Orar por cada uno está bien, pero también se escribe al que se detiene.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa otra semana, y Andrés sigue sin venir.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le escribes ya, antes de que abandone del todo.", valor: 2, explica: "Una palabra a tiempo puede evitar que abandone.", siguiente: "e2" },
                  { texto: "Lo borras de la lista, porque ya no está viniendo.", valor: 0, explica: "El maestro cristiano acompaña a la persona: escribe al que se detiene.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Andrés te responde: Me cuesta seguir el ritmo; los demás entienden más rápido que yo.",
                pregunta: "¿Cómo lo ayudas?",
                opciones: [
                  { texto: "Le das más tiempo y le explicas de otra manera.", valor: 2, explica: "Atender necesidades distintas: más tiempo para quien lo necesita, otra manera de explicar, paciencia con el que empieza." },
                  { texto: "Le dices que se esfuerce más para alcanzar a los demás.", valor: 0, explica: "Se conoce el ritmo de cada alumno y se atienden necesidades distintas." },
                  { texto: "Le prestas tus apuntes para que se ponga al día solo.", valor: 1, explica: "Los apuntes ayudan, pero acompañar es darle más tiempo y otra manera de explicar." },
                ],
              },
              {
                id: "e3",
                narra: "Un mes después, Andrés ya dice de memoria su primer versículo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Celebras con él ese avance, aunque sea pequeño.", valor: 2, explica: "Celebrar los avances, aunque sean pequeños." },
                  { texto: "No dices nada: era lo mínimo que tenía que hacer.", valor: 0, explica: "El maestro celebra los avances, aunque sean pequeños." },
                  { texto: "Lo felicitas, pero le recuerdas todo lo que le falta.", valor: 1, explica: "Felicitarlo está bien: celebra su avance, aunque sea pequeño." },
                ],
              },
            ],
          },
          {
            apoyo: "Atender necesidades distintas: más tiempo para quien lo necesita, otra manera de explicar, paciencia con el que empieza",
            ref: "1 Tesalonicenses 2:7-8",
            situacion: "Enseñas un estudio bíblico en tu célula. En el grupo hay una señora que aprendió a leer hace poco y un hermano que se convirtió el mes pasado.",
            escenas: [
              {
                id: "e1",
                narra: "La señora tarda en encontrar los pasajes en su Biblia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le das más tiempo y la ayudas a buscarlos.", valor: 2, explica: "Atender necesidades distintas: más tiempo para quien lo necesita.", siguiente: "e2" },
                  { texto: "Sigues adelante para no hacer esperar a todo el grupo.", valor: 0, explica: "Se atienden necesidades distintas: más tiempo para quien lo necesita.", siguiente: "e1b" },
                  { texto: "Le pides a otro que lea siempre por ella.", valor: 1, explica: "Es una ayuda, pero ella necesita más tiempo, no que otro lea siempre por ella.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "La señora deja de buscar los pasajes y se queda callada.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Te sientas a su lado y la ayudas con paciencia.", valor: 2, explica: "El maestro conoce el ritmo y las dificultades de cada alumno, y atiende necesidades distintas.", siguiente: "e2" },
                  { texto: "La dejas así: ya se acostumbrará al ritmo del grupo.", valor: 0, explica: "Cada alumno tiene su ritmo y sus dificultades: se atienden necesidades distintas.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El hermano nuevo pregunta algo que los demás ya saben.",
                pregunta: "¿Cómo le respondes?",
                opciones: [
                  { texto: "Con paciencia, porque apenas está empezando.", valor: 2, explica: "Paciencia con el que empieza." },
                  { texto: "Le dices que esa pregunta es demasiado básica.", valor: 0, explica: "Se tiene paciencia con el que empieza." },
                  { texto: "Le dices que lo hablen después, para no atrasar.", valor: 1, explica: "Hablar después puede ayudar, pero el que empieza necesita paciencia." },
                ],
              },
              {
                id: "e3",
                narra: "Al explicar la gracia, notas que el hermano nuevo no te entiende.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Se la explicas de otra manera, con un ejemplo.", valor: 2, explica: "Atender necesidades distintas: otra manera de explicar." },
                  { texto: "Le repites la misma explicación, pero más despacio.", valor: 1, explica: "Ir más despacio ayuda, pero a veces hace falta otra manera de explicar." },
                  { texto: "Sigues adelante: ya la entenderá con el tiempo.", valor: 0, explica: "El maestro atiende necesidades distintas: otra manera de explicar." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se anima al alumno que se detiene.",
            texto: "Escribe al que se [[detiene]]: una palabra a [[tiempo]] puede evitar que [[abandone]].",
            distractores: ["destaca", "gritos", "aprenda"],
            errores: {
              destaca: "Se escribe al que se detiene, para que no abandone.",
              gritos: "Una palabra a tiempo puede evitar que abandone.",
              aprenda: "Una palabra a tiempo puede evitar que el alumno abandone.",
            },
            apoyo: "Escribir al que se detiene: una palabra a tiempo puede evitar que abandone",
            ref: "1 Tesalonicenses 2:7-8",
            explica: "El maestro que acompaña escribe al que se detiene: una palabra a tiempo puede evitar que abandone.",
          },
          {
            consigna: "Completa cómo se acompaña de cerca a cada alumno.",
            texto: "Conoce a cada alumno por su [[nombre]], ora por cada uno, y celebra sus [[avances]], aunque sean [[pequeños]].",
            distractores: ["nota", "errores", "enormes"],
            errores: {
              nota: "Se conoce a cada alumno por su nombre, su historia, su ritmo y sus dificultades.",
              errores: "Se celebran los avances, aunque sean pequeños.",
              enormes: "Se celebran los avances, aunque sean pequeños.",
            },
            apoyo: "Conocer a cada alumno: su nombre, su historia, su ritmo y sus dificultades",
            explica: "Acompañar de cerca es conocer a cada alumno, orar por cada uno, atender sus necesidades y celebrar sus avances, aunque sean pequeños.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es tarea del profesor o del mentor en la academia? Lleva cada frase a su grupo.",
            grupos: ["El profesor", "El mentor"],
            frases: [
              { texto: "Revisa las respuestas escritas que el sistema marca", grupo: 0 },
              { texto: "Atiende las apelaciones", grupo: 0 },
              { texto: "Puede dar clases en vivo", grupo: 0 },
              { texto: "Acompaña a las personas que se le asignan", grupo: 1 },
              { texto: "Ve en Mis acompañados el avance de cada uno", grupo: 1 },
              { texto: "Ve quién lleva siete días o más sin estudiar", grupo: 1 },
            ],
            apoyo: "Los dos sirven bajo la Dirección académica",
            explica: "El profesor revisa las respuestas escritas que el sistema marca, atiende las apelaciones y puede dar clases en vivo; el mentor acompaña a las personas que se le asignan y ve su avance en Mis acompañados.",
          },
          {
            consigna: "¿A quién le toca esto: al profesor o al mentor? Lleva cada frase a su grupo.",
            grupos: ["Le toca al profesor", "Le toca al mentor"],
            frases: [
              { texto: "Una respuesta escrita que el sistema marcó para revisar", grupo: 0 },
              { texto: "Un alumno apela la nota de una respuesta", grupo: 0 },
              { texto: "Una clase en vivo para un grupo de la academia", grupo: 0 },
              { texto: "Uno de sus acompañados lleva ocho días sin estudiar", grupo: 1 },
              { texto: "Mirar el avance de las personas que se le asignaron", grupo: 1 },
            ],
            apoyo: "El mentor acompaña a las personas que se le asignan",
            explica: "Las respuestas marcadas, las apelaciones y las clases en vivo son del profesor; acompañar a las personas asignadas y ver quién lleva siete días o más sin estudiar es del mentor.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el profesor y el mentor en la academia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En Mis acompañados, el mentor ve las notas de cada persona.", verdad: false, explica: "El mentor ve el avance de sus acompañados, sin sus notas ni sus datos de contacto.", apoyo: "en la página Mis acompañados ve su avance, sin sus notas ni sus datos de contacto" },
              { texto: "El profesor atiende las apelaciones.", verdad: true, explica: "El profesor revisa las respuestas escritas que el sistema marca, atiende las apelaciones y puede dar clases en vivo.", apoyo: "el profesor revisa las respuestas escritas que el sistema marca para revisar, atiende las apelaciones y puede dar clases en vivo" },
              { texto: "El mentor ve quién lleva siete días o más sin estudiar.", verdad: true, explica: "En Mis acompañados ve su avance y quién lleva siete días o más sin estudiar.", apoyo: "y quién lleva siete días o más sin estudiar" },
            ],
          },
          {
            consigna: "Sobre acompañar en la academia: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El profesor y el mentor sirven bajo la Dirección académica.", verdad: true, explica: "Los dos sirven bajo la Dirección académica.", apoyo: "Los dos sirven bajo la Dirección académica" },
              { texto: "En Mis acompañados, el mentor tiene los datos de contacto de cada persona.", verdad: false, explica: "El mentor ve el avance, sin sus notas ni sus datos de contacto.", apoyo: "en la página Mis acompañados ve su avance, sin sus notas ni sus datos de contacto" },
              { texto: "Para terminar el Nivel 5 se pide acompañar a diez personas hasta el Nivel 3.", verdad: false, explica: "Para terminar el Nivel 5, se pide acompañar a dos personas hasta que terminen el Nivel 1.", apoyo: "para terminar el Nivel 5, se pide acompañar a dos personas hasta que terminen el Nivel 1", ref: "2 Timoteo 2:2" },
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
            apoyo: "En la academia, el profesor revisa y enseña, y el mentor acompaña",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n5-didactica-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hace el profesor y qué hace el mentor en la academia?",
              ideas: [
                { id: "profesor", peso: 50, texto: "El profesor revisa las respuestas escritas que el sistema marca, atiende las apelaciones y puede dar clases en vivo.", formas: ["revis*", "apelacion*", "apela*", "en vivo", "respuestas escritas"] },
                { id: "mentor", peso: 50, texto: "El mentor acompaña a las personas que se le asignan y ve su avance en Mis acompañados.", formas: ["acompan*", "asignan", "asignad*", "su avance", "el avance", "siete dias"] },
              ],
              errores: [
                { id: "profesor-acompana", texto: "El que acompaña a las personas asignadas es el mentor; el profesor revisa y enseña.", formas: ["profesor acompan*", "profesor (ve|mira) (el|su) avance"], anula: "mentor" },
                { id: "mentor-revisa", texto: "El que revisa las respuestas y atiende las apelaciones es el profesor; el mentor acompaña.", formas: ["mentor revis*", "mentor atiend* apelacion*", "mentor (da|dar|puede) clases"], anula: "profesor" },
              ],
              modelo: "El profesor revisa las respuestas escritas que el sistema marca para revisar, atiende las apelaciones y puede dar clases en vivo. El mentor acompaña a las personas que se le asignan y ve su avance en Mis acompañados.",
            },
          },
          {
            apoyo: "El fruto del maestro se ve cuando sus alumnos enseñan a otros",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n5-didactica-6-a7-2",
              tipo: "corta",
              pregunta: "Te asignaron como mentor de dos personas. ¿Qué verás en Mis acompañados, qué no verás, y cuándo se verá el fruto de tu trabajo?",
              ideas: [
                { id: "ve", peso: 35, texto: "Veré su avance y quién lleva siete días o más sin estudiar.", formas: ["avance", "siete dias", "7 dias", "sin estudiar"] },
                { id: "no", peso: 30, negativa: true, texto: "No veré sus notas ni sus datos de contacto.", formas: ["sus notas", "las notas", "datos de contacto", "sus datos", "su telefono"] },
                { id: "fruto", peso: 35, texto: "El fruto se verá cuando ellos enseñen también a otros.", formas: ["ensen* a otros", "ensen* (tambien|ellos) a otros", "cuando (ellos|ellas) ensen*", "ensen* a (mas|otras) personas"] },
              ],
              errores: [
                { id: "notas", texto: "El mentor no ve las notas ni los datos de contacto de sus acompañados.", formas: ["(vere|veo|ve|vera|vemos|ver) (sus|las) notas", "(vere|veo|ve|vera|ver|tengo|tendre|tendra) (sus|los) datos"], anula: "no" },
              ],
              modelo: "En Mis acompañados veré su avance y quién lleva siete días o más sin estudiar, pero no veré sus notas ni sus datos de contacto. El fruto de mi trabajo se verá cuando ellos enseñen también a otros.",
            },
          },
        ],
      },
    ],
  },
};
