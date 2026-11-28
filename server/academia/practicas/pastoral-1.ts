/**
 * Las prácticas de la materia `pastoral-1` (especialidad «Ministerio pastoral»). Hechas solo con lo que dice cada
 * lección (server/academia/contenido/pastoral-1.ts), con la guía de docs/academia-practicas.md.
 *
 * Quién puede ejercer el pastorado (el ministerio de la mujer) es un punto de la declaración de fe por confirmar (la nota
 * de la lección 1): ninguna actividad lo pregunta ni lo usa como apoyo. En los casos, «pastor» va en su forma general,
 * como en la lección, y a los que se forman como líderes no se les da un cargo con nombre. No se repiten las actividades
 * de «Teología pastoral» (Nivel 5), «Liderazgo cristiano I» ni «Cuidado y consejería básica» (Nivel 3). Ante un delito o un abuso,
 * las buenas opciones son las de la lección: proteger primero a la víctima, denunciar y cumplir la ley (en Texas, como
 * lo dice la lección, sin plazos que no trae).
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_PASTORAL_1: PracticasMateria = {
  materia: "pastoral-1",
  mision: {
    titulo: "Cuidar el rebaño del Señor",
    intro:
      "Una iglesia te pidió ayuda para ordenar su cuidado pastoral, y vas a formar a su equipo. Te van a preguntar qué es el oficio pastoral y cuáles son sus tareas, cómo se ejerce una autoridad que sirve, cómo se forma un equipo, cómo se corrige para restaurar, cómo se protege a los niños y a los débiles, y cómo se cuida la salud del que sirve. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes ayudar a cuidar un rebaño que no es tuyo: apacentarlo con la Palabra, guiarlo con el ejemplo y no con señorío, formar a los fieles para servir, corregir con mansedumbre para ganar al hermano, poner cercos que protegen a los pequeños y cuidarte a ti mismo, porque el poder es de Dios y no de nosotros.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Los nombres y las tareas del pastor
    "pastoral-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En Mileto, ¿a quiénes de Éfeso hizo llamar Pablo?", reverso: "A los ancianos de la iglesia.", apoyo: "En Mileto, Pablo «hizo llamar a los ancianos de la iglesia» de Éfeso" },
              { frente: "¿Para qué puso el Espíritu Santo por obispos a los ancianos de Éfeso?", reverso: "Para apacentar la iglesia del Señor.", apoyo: "les dijo que el Espíritu Santo los había puesto «por obispos, para apacentar la iglesia del Señor»" },
              { frente: "¿De qué habla el nombre obispo, o supervisor?", reverso: "De cuidado y vigilancia.", apoyo: "obispo, o supervisor, de cuidado y vigilancia" },
              { frente: "¿Qué son anciano, obispo y pastor, según la lección?", reverso: "Tres caras de una misma tarea.", apoyo: "Son tres caras de una misma tarea" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De qué habla el nombre anciano, o presbítero?", reverso: "De madurez.", apoyo: "anciano, o presbítero, habla de madurez" },
              { frente: "¿De quién es la iglesia, según Pablo en Mileto?", reverso: "Del Señor, que la ganó por su propia sangre.", apoyo: "es la iglesia del Señor, «la cual él ganó por su propia sangre»" },
              { frente: "¿Cómo llama Tito 1 al pastor?", reverso: "«administrador de Dios», no dueño.", apoyo: "El pastor es «administrador de Dios», no dueño" },
              { frente: "¿Por quién empieza Pablo su encargo a los ancianos?", reverso: "Por el pastor mismo: «mirad por vosotros».", apoyo: "Por eso Pablo empieza por el pastor mismo" },
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
            consigna: "Completa lo que muestra el pasaje de Mileto.",
            texto: "En Mileto aparecen los tres nombres: anciano habla de [[madurez]], obispo de cuidado y vigilancia, y pastor de [[apacentar]].",
            distractores: ["riqueza", "mandar"],
            errores: {
              riqueza: "El nombre anciano, o presbítero, habla de madurez.",
              mandar: "El nombre pastor habla de apacentar: alimentar al rebaño con la Palabra.",
            },
            apoyo: "En un mismo pasaje aparecen los tres nombres: anciano, o presbítero, habla de madurez; obispo, o supervisor, de cuidado y vigilancia; y pastor, de apacentar",
            ref: "Hechos 20:17, 28",
            explica: "En un mismo pasaje aparecen los tres nombres: anciano, o presbítero, habla de madurez; obispo, o supervisor, de cuidado y vigilancia; y pastor, de apacentar. Son tres caras de una misma tarea.",
          },
          {
            consigna: "Completa la idea clave sobre los tres nombres.",
            texto: "En el Nuevo Testamento, anciano, obispo y pastor son nombres de una misma [[tarea]]: guiar con madurez, supervisar con [[cuidado]] y apacentar con la [[Palabra]].",
            distractores: ["empresa", "dureza", "fuerza"],
            errores: {
              empresa: "Anciano, obispo y pastor son nombres de una misma tarea.",
              dureza: "El nombre obispo habla de cuidado y vigilancia: se supervisa con cuidado.",
              fuerza: "El pastor apacienta con la Palabra: alimenta al rebaño con ella.",
            },
            apoyo: "anciano, obispo y pastor son nombres de una misma tarea: guiar con madurez, supervisar con cuidado y apacentar con la Palabra",
            explica: "Los tres nombres hablan de una misma tarea: el anciano guía con madurez, el obispo supervisa con cuidado y el pastor apacienta con la Palabra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada tarea del pastor con lo que es, según la lección.",
            pares: [
              ["Apacentar", "Alimentar al rebaño con la Palabra"],
              ["Supervisar", "Velar por la vida espiritual de cada uno"],
              ["Proteger", "Cuidar al rebaño de los errores y de los abusos"],
              ["Equipar", "Preparar a los santos para servir"],
              ["Interceder", "Orar por el rebaño y con él"],
            ],
            apoyo: "Supervisar: velar por la vida espiritual de cada uno",
            ref: "Hechos 20:28",
            explica: "Apacentar es alimentar al rebaño con la Palabra; supervisar, velar por la vida espiritual de cada uno; proteger, cuidarlo de los errores y de los abusos; equipar, preparar a los santos para servir; e interceder, orar por el rebaño y con él.",
          },
          {
            consigna: "¿Qué tarea del pastor muestra cada ejemplo? Une cada ejemplo con su tarea.",
            pares: [
              ["Predica cada domingo para alimentar a la iglesia", "Apacentar"],
              ["Pregunta a cada hermano cómo va su vida con Dios", "Supervisar"],
              ["Advierte a la iglesia contra una enseñanza falsa", "Proteger"],
              ["Prepara a varios hermanos para servir en la obra", "Equipar"],
              ["Ora por las familias de la iglesia, y con ellas", "Interceder"],
            ],
            apoyo: "Interceder: orar por el rebaño y con él",
            explica: "Alimentar con la Palabra es apacentar; velar por la vida espiritual de cada uno es supervisar; cuidar al rebaño de los errores es proteger; preparar a los santos para servir es equipar; y orar por el rebaño y con él es interceder.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Tito 1 dice que la tarea del pastor con la Palabra es doble. ¿Qué dos cosas hace? Toca las palabras que lo dicen.",
            texto: "[[exhortar]] con sana enseñanza y [[convencer]] a los que contradicen",
            apoyo: "Su tarea con la Palabra es doble: «exhortar con sana enseñanza y convencer a los que contradicen»",
            ref: "Tito 1:9",
            explica: "La tarea del pastor con la Palabra es doble: «exhortar con sana enseñanza y convencer a los que contradicen», es decir, enseñar la sana doctrina y corregir el error.",
          },
          {
            consigna: "Para exhortar y convencer, ¿qué debe retener el pastor? Toca las palabras que lo dicen.",
            texto: "retenedor de [[la palabra fiel]] tal como ha sido enseñada",
            apoyo: "Para eso debe ser «retenedor de la palabra fiel tal como ha sido enseñada»",
            ref: "Tito 1:9",
            explica: "El pastor debe ser «retenedor de la palabra fiel tal como ha sido enseñada»: así puede enseñar la sana doctrina y corregir el error.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El pastor es «administrador de Dios», no dueño",
            ref: "Tito 1:7",
            situacion: "Acaban de confiarte el cuidado pastoral de una congregación pequeña, y quieres empezar bien.",
            escenas: [
              {
                id: "e1",
                narra: "En el culto de bienvenida, un hermano anuncia con alegría: Desde hoy, esta iglesia es del nuevo pastor.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Agradeces, y aclaras con cariño que la iglesia es del Señor.", valor: 2, explica: "La iglesia no es del pastor: es la iglesia del Señor, «la cual él ganó por su propia sangre».", siguiente: "e2" },
                  { texto: "Sonríes y no dices nada, para no corregirlo delante de todos.", valor: 1, explica: "Cuidar al hermano está bien, pero conviene decirlo: la iglesia no es del pastor, es la iglesia del Señor.", siguiente: "e2" },
                  { texto: "Lo confirmas: desde hoy la iglesia es tuya, y todos deben saberlo.", valor: 0, explica: "El pastor es «administrador de Dios», no dueño: cuida un rebaño que no es suyo.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Semanas después, unos hermanos te dicen que ya no se sienten parte, porque todo se decide como si la iglesia fuera tuya.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Les pides perdón y les recuerdas que la iglesia es del Señor.", valor: 2, explica: "La iglesia es del Señor, que la ganó con su sangre, y el pastor es su administrador." },
                  { texto: "Les dices que así es, y que el que no esté de acuerdo puede irse.", valor: 0, explica: "El pastor cuida un rebaño que no es suyo: es administrador de Dios, no dueño." },
                ],
              },
              {
                id: "e2",
                narra: "Un líder te sugiere: Ya tienes el título; deja las visitas y la oración a otros, y tú dedícate a dirigir.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el pastorado es una tarea: cuidar del rebaño de Cristo.", valor: 2, explica: "En muchas iglesias, pastor es un título; en el Nuevo Testamento es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo." },
                  { texto: "Que visitarás y orarás por la gente cuando te sobre un rato.", valor: 1, explica: "Hacerlo de vez en cuando no basta: supervisar e interceder son tareas del pastor, no algo que se hace si sobra tiempo." },
                  { texto: "Que tiene razón: con el título ya se sabe quién está a cargo.", valor: 0, explica: "El pastorado es una tarea al servicio de Cristo, no un título." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del primer mes, escribes una carta a la congregación.",
                pregunta: "¿Qué les dices de tu servicio?",
                opciones: [
                  { texto: "Que cuidarás un rebaño que no es tuyo, sino del Señor.", valor: 2, explica: "El pastor cuida un rebaño que no es suyo: la iglesia es del Señor, que la ganó con su sangre." },
                  { texto: "Que harás todo lo posible para que la iglesia crezca en número.", valor: 1, explica: "Desear que crezca es bueno, pero el centro es otro: el pastor cuida un rebaño que no es suyo." },
                  { texto: "Que desde ahora cada decisión será tuya, porque eres el dueño.", valor: 0, explica: "El pastor es «administrador de Dios», no dueño." },
                ],
              },
            ],
          },
          {
            apoyo: "En el Nuevo Testamento es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo",
            ref: "Hechos 20:28",
            situacion: "Te nombraron pastor de jóvenes. Es la primera vez que tienes un cargo en la iglesia.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven te pregunta: ¿Ahora te tenemos que decir pastor, o te seguimos llamando por tu nombre?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que lo que importa no es el nombre, sino la tarea de cuidarlos.", valor: 2, explica: "En el Nuevo Testamento, pastor es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo.", siguiente: "e2" },
                  { texto: "Que como ellos quieran, y cambias rápido de tema para no incomodar.", valor: 1, explica: "No incomodar está bien, pero era una buena ocasión para decir que el pastorado es una tarea y no un título.", siguiente: "e2" },
                  { texto: "Que sí, y que el que no te diga pastor te está faltando el respeto.", valor: 0, explica: "En muchas iglesias, pastor es un título; en el Nuevo Testamento es, sobre todo, una tarea.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Algunos jóvenes dejan de acercarse a ti. Dicen que ahora te importa más el título que ellos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los buscas y les muestras con hechos que estás para servirlos.", valor: 2, explica: "El pastorado es una tarea al servicio de Cristo: cuidar del rebaño que le pertenece." },
                  { texto: "Esperas a que ellos te busquen y te traten como merece un pastor.", valor: 0, explica: "El pastor cuida un rebaño que no es suyo; no espera que lo traten como dueño." },
                ],
              },
              {
                id: "e2",
                narra: "Preparas el plan del año, y tienes poco tiempo libre.",
                pregunta: "¿Qué pones primero en tu agenda?",
                opciones: [
                  { texto: "Enseñarles la Palabra y orar por ellos y con ellos.", valor: 2, explica: "Apacentar es alimentar al rebaño con la Palabra, e interceder es orar por el rebaño y con él." },
                  { texto: "Muchos eventos, y un estudio de la Biblia cada tanto.", valor: 1, explica: "Los eventos no reemplazan la tarea: apacentar es alimentar al rebaño con la Palabra." },
                  { texto: "Las reuniones donde se presenta tu nuevo cargo.", valor: 0, explica: "El pastorado es una tarea, no un título: lo primero es cuidar del rebaño." },
                ],
              },
              {
                id: "e3",
                narra: "Un líder de la iglesia te dice: Ese grupo de jóvenes ahora es tuyo; haz con él lo que quieras.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el grupo es del Señor, y que tú solo lo cuidas.", valor: 2, explica: "El pastor cuida un rebaño que no es suyo: la iglesia es del Señor, «la cual él ganó por su propia sangre»." },
                  { texto: "Que gracias, y que tratarás de hacerlo lo mejor posible.", valor: 1, explica: "La intención es buena, pero falta lo principal: el rebaño no es tuyo, es del Señor." },
                  { texto: "Que por fin, y que desde ahora se hará lo que tú digas.", valor: 0, explica: "El pastor es «administrador de Dios», no dueño." },
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
            consigna: "Sobre el pastorado como tarea: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En el Nuevo Testamento, pastor es, sobre todo, una tarea.", verdad: true, explica: "En muchas iglesias, pastor es un título; en el Nuevo Testamento es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo.", apoyo: "En el Nuevo Testamento es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo" },
              { texto: "La iglesia pertenece al pastor que la dirige.", verdad: false, explica: "La iglesia no es del pastor: es la iglesia del Señor, «la cual él ganó por su propia sangre».", apoyo: "La iglesia no es del pastor: es la iglesia del Señor" },
              { texto: "Según Tito 1, el pastor es administrador de Dios, no dueño.", verdad: true, explica: "El pastor es «administrador de Dios», no dueño: cuida un rebaño que no es suyo.", apoyo: "El pastor es «administrador de Dios», no dueño", ref: "Tito 1:7" },
            ],
          },
          {
            consigna: "Sobre el rebaño que cuida el pastor: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El pastor es el dueño del rebaño que cuida.", verdad: false, explica: "El pastor cuida un rebaño que no es suyo: es administrador de Dios.", apoyo: "El pastor cuida un rebaño que no es suyo" },
              { texto: "El Señor ganó la iglesia por su propia sangre.", verdad: true, explica: "Es la iglesia del Señor, «la cual él ganó por su propia sangre».", apoyo: "es la iglesia del Señor, «la cual él ganó por su propia sangre»", ref: "Hechos 20:28" },
              { texto: "En el Nuevo Testamento, lo que hace pastor a alguien es tener el título.", verdad: false, explica: "En muchas iglesias, pastor es un título, pero en el Nuevo Testamento es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo.", apoyo: "En el Nuevo Testamento es, sobre todo, una tarea" },
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
            apoyo: "En un mismo pasaje aparecen los tres nombres",
            ref: "Hechos 20:17, 28",
            clave: {
              id: "pr-pastoral-1-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tres nombres del oficio pastoral aparecen juntos en Hechos 20, y de qué habla cada uno?",
              ideas: [
                { id: "anciano", peso: 34, texto: "Anciano, o presbítero, habla de madurez.", formas: ["madur*"] },
                { id: "obispo", peso: 33, texto: "Obispo, o supervisor, habla de cuidado y vigilancia.", formas: ["vigil*", "(vela|velar|velan|velando) por", "supervis* con cuidado", "obispo (habla|muestra|significa|indica|es) de cuidado", "supervisor (habla|muestra|significa|indica|es) de cuidado", "(cuida|cuidado|cuidar) y (vela|velar|vigila|vigilar)"] },
                { id: "pastor", peso: 33, texto: "Pastor habla de apacentar.", formas: ["apacent*", "apacient*", "alimenta* (rebano|ovejas|iglesia)"] },
              ],
              errores: [
                { id: "madurez-otro", texto: "El nombre que habla de madurez es anciano, o presbítero.", formas: ["(obispo|supervisor|pastor) (habla|muestra|significa|indica|es) de madur*"], anula: "anciano" },
                { id: "vigilancia-otro", texto: "El nombre que habla de cuidado y vigilancia es obispo, o supervisor.", formas: ["(anciano|presbitero|pastor) (habla|muestra|significa|indica|es) de (cuidado|vigil*)"], anula: "obispo" },
                { id: "apacentar-otro", texto: "El nombre que habla de apacentar es pastor.", formas: ["(anciano|presbitero|obispo|supervisor) (habla|muestra|significa|indica|es) de apacent*"], anula: "pastor" },
              ],
              modelo: "En Hechos 20 aparecen juntos los tres nombres: anciano, o presbítero, habla de madurez; obispo, o supervisor, de cuidado y vigilancia; y pastor, de apacentar. Son tres caras de una misma tarea.",
            },
          },
          {
            apoyo: "Son tres caras de una misma tarea",
            ref: "Hechos 20:17, 28",
            clave: {
              id: "pr-pastoral-1-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano nuevo pregunta por qué en el Nuevo Testamento un mismo líder se llama anciano, obispo y pastor. ¿Qué le explicas?",
              ideas: [
                { id: "tarea", peso: 40, texto: "Son tres caras de una misma tarea.", formas: ["misma tarea", "tres caras", "una sola tarea", "mismo (servicio|oficio|trabajo|ministerio)", "misma (funcion|labor|obra)"] },
                { id: "madurez", peso: 30, texto: "El anciano guía con madurez y el obispo supervisa con cuidado.", formas: ["madur*", "vigil*", "supervis* con cuidado", "(vela|velar|velan) por"] },
                { id: "apacentar", peso: 30, texto: "El pastor apacienta con la Palabra.", formas: ["apacent*", "apacient*", "alimenta* (rebano|ovejas|iglesia)", "con la palabra"] },
              ],
              modelo: "Le explico que son tres caras de una misma tarea: el anciano guía con madurez, el obispo supervisa con cuidado y el pastor apacienta con la Palabra.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La autoridad que sirve
    "pastoral-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hacen los gobernantes de las naciones, según Jesús?", reverso: "Se enseñorean de ellas.", apoyo: "«los gobernantes de las naciones se enseñorean de ellas»" },
              { frente: "Frente a los gobernantes de las naciones, ¿qué dijo Jesús de sus discípulos?", reverso: "«entre vosotros no será así».", apoyo: "pero «entre vosotros no será así»" },
              { frente: "En el reino, ¿con qué se mide la grandeza?", reverso: "Con el servicio.", apoyo: "En el reino, la grandeza se mide por el servicio" },
              { frente: "¿Para qué vino Jesús, el modelo?", reverso: "No para ser servido, sino para servir.", apoyo: "Y él mismo es el modelo: «no vino para ser servido, sino para servir»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién es Diótrefes en la lección?", reverso: "El modelo contrario: le gusta tener el primer lugar.", apoyo: "La Biblia también muestra el modelo contrario: Diótrefes, «al cual le gusta tener el primer lugar entre ellos»" },
              { frente: "¿Qué hacía Diótrefes con los hermanos?", reverso: "No los recibía, y los expulsaba de la iglesia.", apoyo: "no recibía a los hermanos «y los expulsa de la iglesia»" },
              { frente: "¿Cómo pide Pedro a los ancianos que apacienten?", reverso: "Voluntariamente y con ánimo pronto, no por fuerza ni por ganancia deshonesta.", apoyo: "apacentar «no por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto»" },
              { frente: "¿En qué se nota la autoridad del pastor?", reverso: "En cuánto sirve, no en cuánto manda.", apoyo: "La autoridad del pastor se nota en cuánto sirve, no en cuánto manda" },
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
            consigna: "¿Es la autoridad del mundo o la que enseñó Jesús? Lleva cada frase a su grupo.",
            grupos: ["La autoridad del mundo", "La que enseñó Jesús"],
            frases: [
              { texto: "Los gobernantes se enseñorean de los demás", grupo: 0 },
              { texto: "El más grande es el que más manda", grupo: 0 },
              { texto: "El que manda espera que lo sirvan", grupo: 0 },
              { texto: "El que quiera ser grande será servidor", grupo: 1 },
              { texto: "La grandeza se mide por el servicio", grupo: 1 },
              { texto: "Sirve como Jesús, que vino a servir", grupo: 1 },
              { texto: "Guía sin señorear, siendo ejemplo", grupo: 1 },
            ],
            apoyo: "Jesús contrastó dos modelos",
            ref: "Mateo 20:25-28",
            explica: "Los gobernantes de las naciones se enseñorean de ellas, pero «entre vosotros no será así»: en el reino, la grandeza se mide por el servicio, y Jesús mismo es el modelo.",
          },
          {
            consigna: "¿Qué modelo sigue cada líder: el del mundo o el de Jesús? Lleva cada frase a su grupo.",
            grupos: ["Sigue el modelo del mundo", "Sigue el modelo de Jesús"],
            frases: [
              { texto: "Espera que los demás lo sirvan porque es el líder", grupo: 0 },
              { texto: "Mide su grandeza por cuánta gente le obedece", grupo: 0 },
              { texto: "Se pone por encima de los que tiene a su cuidado", grupo: 0 },
              { texto: "Lava los platos con su equipo después de la cena", grupo: 1 },
              { texto: "Busca servir antes que ser servido", grupo: 1 },
              { texto: "Mide su grandeza por cuánto sirve", grupo: 1 },
              { texto: "Pide a otros solo lo que él ya vive", grupo: 1 },
            ],
            apoyo: "En el reino, la grandeza se mide por el servicio",
            ref: "Mateo 20:26-28",
            explica: "El mundo mide la grandeza por cuánto se manda; Jesús enseñó que el grande es el que sirve, como él, que vino a servir y a dar su vida, y el pastor guía siendo ejemplo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "¿Qué señal de alerta muestra cada ejemplo? Une cada ejemplo con su señal.",
            pares: [
              ["El líder manda algo y nunca muestra en la Biblia por qué", "Se exige obediencia sin dar razones de la Palabra"],
              ["Al que pregunta con respeto por una decisión lo llaman rebelde", "Nadie puede hacer preguntas ni disentir con respeto"],
              ["Se recorta la ayuda a los pobres para pagar el auto del líder", "El dinero o el prestigio del líder pesan más que el bien de las ovejas"],
              ["A los que se fueron de la iglesia, nadie les puede hablar", "Se aísla a quien piensa distinto o a quien se va"],
              ["El líder no tiene a nadie que le pueda pedir explicaciones", "El líder no rinde cuentas a nadie"],
            ],
            apoyo: "Se aísla a quien piensa distinto o a quien se va",
            explica: "Son las señales de alerta de un liderazgo que domina: se exige obediencia sin dar razones de la Palabra, nadie puede preguntar ni disentir con respeto, el dinero o el prestigio del líder pesan más que las ovejas, se aísla a quien piensa distinto o se va, y el líder no rinde cuentas a nadie.",
          },
          {
            consigna: "Une cada señal de alerta con un ejemplo de ella.",
            pares: [
              ["Exigir obediencia sin razones de la Palabra", "Pide obedecer sin mostrar nunca un texto que lo apoye"],
              ["No dejar preguntar ni disentir", "Calla en público al que no está de acuerdo con respeto"],
              ["Poner el dinero del líder antes que las ovejas", "Usa las ofrendas en sus lujos mientras hay hermanos en necesidad"],
              ["Aislar a quien piensa distinto o se va", "Prohíbe saludar a los que se fueron a otra iglesia"],
              ["No rendir cuentas a nadie", "No tiene a nadie sobre él que le pida explicaciones"],
            ],
            apoyo: "El líder no rinde cuentas a nadie",
            explica: "Cada ejemplo muestra una señal de alerta: obedecer sin razones de la Palabra, callar al que disiente, poner el dinero del líder antes que las ovejas, aislar al que se va y no rendir cuentas a nadie.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre Diótrefes tiene un error. Tócala.",
            frases: [
              "A Diótrefes le gustaba tener el primer lugar entre ellos.",
              "Diótrefes hablaba mal de los demás.",
              "Diótrefes recibía con gusto a los hermanos que llegaban.",
              "Diótrefes expulsaba de la iglesia a los hermanos.",
            ],
            malo: 2,
            correccion: "Diótrefes no recibía a los hermanos, y los expulsaba de la iglesia.",
            apoyo: "hablaba mal de los demás, no recibía a los hermanos «y los expulsa de la iglesia»",
            ref: "3 Juan 1:9-10",
            explica: "Diótrefes muestra el modelo contrario: el que ama el primer lugar, habla mal de otros y expulsa a los que no lo siguen.",
          },
          {
            consigna: "Una de estas frases sobre la autoridad que sirve tiene un error. Tócala.",
            frases: [
              "La Biblia pide obedecer a los que guían la iglesia.",
              "La autoridad pastoral es una autoridad que Cristo delega.",
              "La autoridad pastoral se ejerce con el ejemplo y se somete a la Palabra.",
              "La autoridad pastoral no tiene que rendir cuentas a nadie.",
            ],
            malo: 3,
            correccion: "La autoridad pastoral rinde cuentas: es una autoridad que sirve.",
            apoyo: "Pero es una autoridad que Cristo delega, que se ejerce con el ejemplo, se somete a la Palabra y rinde cuentas",
            ref: "Hebreos 13:17",
            explica: "La autoridad pastoral es real, pero es una autoridad que Cristo delega, que se ejerce con el ejemplo, se somete a la Palabra y rinde cuentas; un líder que no rinde cuentas a nadie es una señal de alerta.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de célula te dice: Les pido a todos que lleguen puntuales y oren cada día, aunque yo llego tarde y casi no oro; total, el líder soy yo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el que guía lo hace siendo ejemplo, no solo con órdenes.", bien: true, explica: "Pedro pide apacentar «no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey»." },
              { texto: "Que está bien: el líder manda y los demás tienen que obedecer.", explica: "La autoridad del pastor se nota en cuánto sirve, no en cuánto manda, y se ejerce con el ejemplo." },
              { texto: "Que deje de pedir eso, para no tener que cumplirlo él.", explica: "El problema no es pedirlo, sino no vivirlo: el pastor apacienta siendo ejemplo." },
              { texto: "Que lo pida con más fuerza, para que todos le hagan caso.", explica: "Pedro pide apacentar «no por fuerza, sino voluntariamente», sin señorear y siendo ejemplo." },
            ],
            apoyo: "El pastor apacienta de buena voluntad, sin ganancia deshonesta y sin señorear, siendo ejemplo",
            ref: "1 Pedro 5:3",
            explica: "Pedro pide a los ancianos apacentar «no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey»: el que guía vive primero lo que pide.",
          },
          {
            caso: "Un hermano del equipo te dice: Pastor, el que manda no tiene por qué servir las mesas; para eso estamos nosotros.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que en el reino el grande es el que sirve, y que tú también servirás.", bien: true, explica: "«el que quiera hacerse grande entre vosotros será vuestro servidor», y Jesús mismo es el modelo." },
              { texto: "Que tiene razón: al pastor le toca dar las órdenes, no servir las mesas.", explica: "Jesús enseñó una autoridad distinta a la del mundo: en el reino, el grande es el que sirve." },
              { texto: "Que servirás las mesas, pero solo cuando haya visitas importantes.", explica: "Servir para que lo vean no es el modelo de Jesús: el pastor sirve de buena voluntad, siendo ejemplo." },
            ],
            apoyo: "La autoridad del pastor se nota en cuánto sirve, no en cuánto manda",
            ref: "Mateo 20:26-28",
            explica: "En el reino, el grande es el que sirve, como Jesús, que «no vino para ser servido, sino para servir»; y el pastor guía siendo ejemplo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Pero es una autoridad que Cristo delega, que se ejerce con el ejemplo, se somete a la Palabra y rinde cuentas",
            ref: "1 Pedro 5:2-3",
            situacion: "Eres pastor de una iglesia mediana. Este mes tienes que tomar varias decisiones con el equipo.",
            escenas: [
              {
                id: "e1",
                narra: "Propones cambiar el horario del culto, y un hermano te pregunta con respeto por qué.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le explicas tus razones y escuchas lo que él piensa.", valor: 2, explica: "Una autoridad que sirve deja que se hagan preguntas y que se disienta con respeto.", siguiente: "e2" },
                  { texto: "Le das una razón breve y pasas rápido al siguiente tema.", valor: 1, explica: "Dar una razón está bien, pero escuchar también es parte de una autoridad que sirve.", siguiente: "e2" },
                  { texto: "Le dices que las decisiones del pastor no se discuten.", valor: 0, explica: "Que nadie pueda hacer preguntas ni disentir con respeto es una señal de alerta.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Ese hermano deja de opinar en las reuniones, y otros también se callan.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides perdón y abres un tiempo para escuchar a todos.", valor: 2, explica: "El pastor guía siendo ejemplo: reconoce su error y deja que se pueda disentir con respeto." },
                  { texto: "Te alegras: así las reuniones terminan más rápido y sin discusiones.", valor: 0, explica: "Que nadie pueda hacer preguntas ni disentir con respeto es una señal de alerta." },
                ],
              },
              {
                id: "e2",
                narra: "Hay que pintar el templo el sábado, y faltan voluntarios.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Llegas temprano con tu brocha y pintas junto a ellos.", valor: 2, explica: "El pastor apacienta siendo ejemplo: su autoridad se nota en cuánto sirve." },
                  { texto: "Organizas los grupos y pasas a verlos al final del día.", valor: 1, explica: "Organizar ayuda, pero el pastor guía sobre todo con el ejemplo." },
                  { texto: "Les recuerdas que el pastor no está para esas cosas.", valor: 0, explica: "En el reino, el grande es el que sirve, como Jesús, que vino a servir." },
                ],
              },
              {
                id: "e3",
                narra: "Te equivocaste en una compra para la iglesia, y el equipo lo notó.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo reconoces ante el equipo y das cuentas de lo que pasó.", valor: 2, explica: "La autoridad que sirve se somete a la Palabra y rinde cuentas." },
                  { texto: "Lo corriges en silencio, sin hablar del asunto con nadie más.", valor: 1, explica: "Corregirlo está bien, pero la autoridad que sirve también rinde cuentas." },
                  { texto: "Culpas al tesorero para no perder autoridad ante todos.", valor: 0, explica: "Un líder que no rinde cuentas a nadie es una señal de alerta, y el pastor guía siendo ejemplo." },
                ],
              },
            ],
          },
          {
            apoyo: "apacentar «no por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto»",
            ref: "1 Pedro 5:2-3",
            situacion: "Coordinas a los líderes de células de tu iglesia, y quieres guiarlos como enseña Pedro.",
            escenas: [
              {
                id: "e1",
                narra: "Los líderes te piden que les enseñes a orar por sus grupos.",
                pregunta: "¿Cómo lo haces?",
                opciones: [
                  { texto: "Les cuentas cómo oras tú por tu grupo y oras con ellos.", valor: 2, explica: "El pastor guía siendo ejemplo de la grey: primero vive lo que enseña.", siguiente: "e2" },
                  { texto: "Les mandas una lista de oración para que la cumplan.", valor: 1, explica: "Una lista ayuda, pero el pastor guía sobre todo con su ejemplo.", siguiente: "e2" },
                  { texto: "Les exiges orar una hora cada día, aunque tú no lo hagas.", valor: 0, explica: "Pedro pide no apacentar «como teniendo señorío», sino «siendo ejemplos de la grey».", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Un mes después, varios líderes te dicen que se sienten presionados y que ya no disfrutan orar.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Reconoces tu error y empiezas a orar con ellos cada semana.", valor: 2, explica: "Así guía el pastor: no por fuerza, sino siendo ejemplo." },
                  { texto: "Les dices que la presión es buena, y que sigan igual sin quejarse.", valor: 0, explica: "Pedro pide apacentar «no por fuerza, sino voluntariamente»." },
                ],
              },
              {
                id: "e2",
                narra: "Alguien propone cobrar una cuota a cada célula para la obra, aunque en verdad sería para tus gastos personales.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Lo rechazas: no sirves por ganancia deshonesta.", valor: 2, explica: "Pedro pide apacentar «no por ganancia deshonesta, sino con ánimo pronto»." },
                  { texto: "Lo aceptas: al fin y al cabo, das mucho tiempo a la obra.", valor: 0, explica: "El dinero o el prestigio del líder no pueden pesar más que el bien de las ovejas." },
                ],
              },
              {
                id: "e3",
                narra: "Un líder nuevo te dice: Cuando sea coordinador como tú, por fin voy a tener el primer lugar.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que en el reino el grande es el que sirve.", valor: 2, explica: "«el que quiera hacerse grande entre vosotros será vuestro servidor»." },
                  { texto: "Que no se preocupe, que algún día le llegará su turno.", valor: 1, explica: "Esperar un turno sigue buscando el primer lugar; en el reino, la grandeza se mide por el servicio." },
                  { texto: "Que es justo: el que coordina merece el primer lugar.", valor: 0, explica: "Amar el primer lugar es el modelo de Diótrefes, «al cual le gusta tener el primer lugar entre ellos»." },
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
            apoyo: "Jesús enseñó una autoridad distinta a la del mundo: en el reino, el grande es el que sirve, como él, que vino a servir y a dar su vida",
            ref: "Mateo 20:25-28",
            clave: {
              id: "pr-pastoral-1-2-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia la autoridad del mundo de la autoridad que enseñó Jesús?",
              ideas: [
                { id: "mundo", peso: 40, texto: "Los gobernantes de las naciones se enseñorean de ellas.", formas: ["ensenore*", "(domina|dominan|dominar|dominando|dominaban)", "se (impone|imponen) sobre", "mandan sobre", "oprim*"] },
                { id: "grande", peso: 35, texto: "En el reino, el grande es el que sirve: la grandeza se mide por el servicio.", formas: ["grande (servidor|sirve|servir|servicio)", "grande es el que sirve", "grande es quien sirve", "el que sirve", "quien sirve", "vuestro servidor", "grandeza (servicio|servir)", "(mide|medir|mida|miden) (servicio|servir|sirve)"] },
                { id: "modelo", peso: 25, texto: "Jesús mismo es el modelo: no vino para ser servido, sino para servir.", formas: ["no vino para ser servido", "vino (a|para) servir", "(dar|dio) su vida", "(jesus|cristo) (es|fue) el modelo", "el mismo es el modelo"] },
              ],
              errores: [{ id: "manda", texto: "En el reino, el grande no es el que manda, sino el que sirve.", formas: ["grande es el que (manda|domina)", "grande es quien (manda|domina)", "grande es el que mas manda"], anula: "grande" }],
              modelo: "En el mundo, los gobernantes de las naciones se enseñorean de ellas. Jesús enseñó lo contrario: en el reino, el grande es el que sirve, y él mismo es el modelo, porque no vino para ser servido, sino para servir.",
            },
          },
          {
            apoyo: "Y él mismo es el modelo: «no vino para ser servido, sino para servir»",
            ref: "Mateo 20:28",
            clave: {
              id: "pr-pastoral-1-2-a7-2",
              tipo: "corta",
              pregunta: "Un líder dice que un pastor con autoridad es el que más manda. ¿Qué le responderías con lo que enseñó Jesús?",
              ideas: [
                { id: "sirve", peso: 40, texto: "La autoridad del pastor se nota en cuánto sirve, no en cuánto manda: en el reino, el grande es el que sirve.", formas: ["cuanto sirve", "grande (servidor|sirve|servir|servicio)", "grande es el que sirve", "grande es quien sirve", "el que sirve", "quien sirve", "vuestro servidor", "grandeza (servicio|servir)", "(mide|medir|mida|nota|ve) (servicio|servir|sirve)"] },
                { id: "mundo", peso: 30, texto: "Así es en el mundo: los gobernantes de las naciones se enseñorean de ellas, pero entre los discípulos no será así.", formas: ["ensenore*", "(domina|dominan|dominar|dominando|dominaban)", "no (sera|es) asi", "gobernantes", "naciones"] },
                { id: "modelo", peso: 30, texto: "Jesús es el modelo: no vino para ser servido, sino para servir.", formas: ["no vino para ser servido", "vino (a|para) servir", "(dar|dio) su vida", "(jesus|cristo) (es|fue) el modelo"] },
              ],
              errores: [{ id: "manda", texto: "La autoridad del pastor se nota en cuánto sirve, no en cuánto manda.", formas: ["tiene razon", "grande es el que (manda|domina)", "grande es quien (manda|domina)"], anula: "sirve" }],
              modelo: "Le respondería que la autoridad del pastor se nota en cuánto sirve, no en cuánto manda. Los gobernantes de las naciones se enseñorean, pero entre nosotros no será así: Jesús no vino para ser servido, sino para servir.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. El equipo pastoral
    "pastoral-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué dejó Pablo a Tito en Creta?", reverso: "Para que estableciera ancianos en cada ciudad.", apoyo: "Pablo dejó a Tito en Creta para que «establecieses ancianos en cada ciudad»" },
              { frente: "En el Nuevo Testamento, ¿quién guiaba las iglesias?", reverso: "Un grupo de ancianos, no una sola persona.", apoyo: "las iglesias eran guiadas por un grupo de ancianos, no por una sola persona" },
              { frente: "¿Qué dice Pablo de Timoteo frente a los demás?", reverso: "«a ninguno tengo del mismo ánimo».", apoyo: "Pablo formó a Timoteo como a un hijo: «a ninguno tengo del mismo ánimo»" },
              { frente: "¿Qué es formar líderes, según la lección?", reverso: "Caminar juntos, no solo dar clases.", apoyo: "Formar líderes es caminar juntos, no solo dar clases" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con qué terminan las cartas de Pablo?", reverso: "Con nombres de colaboradores, como Tíquico y Onésimo.", apoyo: "Sus cartas terminan con nombres" },
              { frente: "¿Cómo formó Pablo a Timoteo?", reverso: "Como a un hijo.", apoyo: "Pablo formó a Timoteo como a un hijo" },
              { frente: "¿Qué le pasa a un pastor que lo hace todo solo?", reverso: "Agota su vida y debilita a la iglesia.", apoyo: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia" },
              { frente: "¿Qué logra un pastor que forma un equipo?", reverso: "Multiplica el cuidado del rebaño.", apoyo: "Un pastor que forma un equipo multiplica el cuidado del rebaño" },
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
            consigna: "Sobre el liderazgo en plural: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jetro le advirtió a Moisés que el trabajo era demasiado pesado para hacerlo solo.", verdad: true, explica: "Jetro le dijo: «No está bien lo que haces», «porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", apoyo: "Ya Jetro le advirtió a Moisés: «No está bien lo que haces»", ref: "Éxodo 18:17-18" },
              { texto: "En el Nuevo Testamento, cada iglesia era guiada por una sola persona.", verdad: false, explica: "Las iglesias eran guiadas por un grupo de ancianos, no por una sola persona.", apoyo: "En el Nuevo Testamento, las iglesias eran guiadas por un grupo de ancianos, no por una sola persona" },
              { texto: "Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad.", verdad: true, explica: "Pablo dejó a Tito en Creta para que «establecieses ancianos en cada ciudad».", apoyo: "Pablo dejó a Tito en Creta para que «establecieses ancianos en cada ciudad»", ref: "Tito 1:5" },
            ],
          },
          {
            consigna: "Sobre el ministerio en equipo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Nuevo Testamento le pide al pastor que lo haga todo solo.", verdad: false, explica: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide.", apoyo: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide" },
              { texto: "Pablo trabajaba siempre con un equipo.", verdad: true, explica: "Pablo trabajaba siempre con un equipo, y sus cartas terminan con los nombres de sus colaboradores.", apoyo: "Pablo trabajaba siempre con un equipo" },
              { texto: "Un pastor que lo hace todo solo fortalece a la iglesia.", verdad: false, explica: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia; el que forma un equipo multiplica el cuidado del rebaño.", apoyo: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia" },
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
            consigna: "Une a cada uno con lo que dice de él la lección.",
            pares: [
              ["Timoteo", "Pablo lo formó como a un hijo"],
              ["Tito", "Pablo lo dejó en Creta para establecer ancianos"],
              ["Tíquico", "Pablo lo llama «fiel ministro y consiervo en el Señor»"],
              ["Las cartas de Pablo", "Terminan con nombres de colaboradores"],
            ],
            apoyo: "Pablo formó a Timoteo como a un hijo",
            ref: "Filipenses 2:19-22",
            explica: "Pablo formó a Timoteo como a un hijo, dejó a Tito en Creta para que estableciera ancianos y llamó a Tíquico «amado hermano y fiel ministro y consiervo en el Señor»: sus cartas terminan con nombres, porque su ministerio fue un trabajo en equipo.",
          },
          {
            consigna: "Une cada idea con lo que enseña la lección sobre cómo formaba Pablo a otros.",
            pares: [
              ["Formar líderes", "Es caminar juntos, no solo dar clases"],
              ["Timoteo con Pablo", "Sirvió en el evangelio como hijo a padre"],
              ["Onésimo", "Pablo lo llama «amado y fiel hermano»"],
              ["El ministerio de Pablo", "Fue un trabajo en equipo"],
            ],
            apoyo: "Formar líderes es caminar juntos, no solo dar clases",
            ref: "Colosenses 4:7-9",
            explica: "Timoteo sirvió con Pablo «como hijo a padre», y Pablo llamó a Onésimo «amado y fiel hermano»: formar líderes es caminar juntos, no solo dar clases, y el ministerio de Pablo fue un trabajo en equipo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Cómo dice Pablo que Timoteo sirvió con él en el evangelio? Toca las palabras que lo dicen.",
            texto: "[[como hijo a padre]] ha servido conmigo en el evangelio",
            apoyo: "Pablo formó a Timoteo como a un hijo: «a ninguno tengo del mismo ánimo», y «como hijo a padre ha servido conmigo en el evangelio»",
            ref: "Filipenses 2:22",
            explica: "Timoteo sirvió con Pablo «como hijo a padre»: formar líderes es caminar juntos, no solo dar clases.",
          },
          {
            consigna: "Pablo llama a Tíquico «amado hermano». ¿Qué otras dos cosas le dice por su servicio? Toca las palabras que lo dicen.",
            texto: "amado hermano y [[fiel ministro]] y [[consiervo]] en el Señor",
            apoyo: "Sus cartas terminan con nombres: Tíquico, «amado hermano y fiel ministro y consiervo en el Señor»",
            ref: "Colosenses 4:7",
            explica: "Pablo llama a Tíquico «amado hermano y fiel ministro y consiervo en el Señor»: el ministerio de Pablo fue un trabajo en equipo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para formar el equipo, como los presenta la lección, del primero al último.",
            pasos: [
              "Orar y observar: buscar a los fieles, no solo a los talentosos",
              "Invitar a servir junto a ti y dar responsabilidades que crecen",
              "Enseñar el carácter que pide la Palabra antes que las habilidades",
              "Evaluar juntos y corregir con amor",
              "Reconocer ante la iglesia a los que están listos, y soltarlos para servir",
            ],
            apoyo: "El pastor busca a los fieles, los invita a servir a su lado, forma su carácter, los evalúa y los envía",
            explica: "El pastor busca a los fieles, los invita a servir a su lado, forma su carácter, los evalúa y los envía: así se forma el equipo.",
          },
          {
            consigna: "Vas a formar a un hermano de tu célula. Ordena lo que haces, del primer paso al último.",
            pasos: [
              "Orar y observar quién es fiel en la célula",
              "Invitarlo a dirigir contigo la oración del grupo",
              "Enseñarle el carácter que pide la Palabra",
              "Evaluar con él cómo le fue y corregirlo con amor",
              "Presentarlo ante la iglesia y soltarlo para servir",
            ],
            apoyo: "Invitar a servir junto a ti y dar responsabilidades que crecen",
            explica: "Primero se ora y se observa quién es fiel; después se lo invita a servir junto a ti, se forma su carácter, se evalúa juntos y, cuando está listo, se lo reconoce ante la iglesia y se lo suelta para servir.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia",
            ref: "Éxodo 18:17-18",
            titulo: "Un pastor que lo hace todo",
            relato: [
              "Eres pastor de una iglesia de ochenta personas. Predicas, visitas, das consejería, diriges la alabanza y hasta abres el templo cada domingo.",
              "Estás agotado, y tu familia casi no te ve. Un hermano mayor de la iglesia te dice: Así no vas a poder seguir.",
              "Decides formar un equipo, y te sientas a planificarlo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te enseña la Biblia sobre tu situación?",
                opciones: [
                  { texto: "Que el ministerio no se hace solo: así fue desde Moisés hasta Pablo.", bien: true, explica: "Desde Moisés hasta Pablo, la Biblia muestra que el ministerio no se hace solo." },
                  { texto: "Que un pastor fiel demuestra su llamado haciéndolo todo él solo.", explica: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide." },
                  { texto: "Que debes descansar un tiempo y dejar que la iglesia se arregle sola como pueda.", explica: "Descansar ayuda, pero la Biblia muestra otro camino: un pastor que forma un equipo multiplica el cuidado del rebaño." },
                ],
                apoyo: "Desde Moisés hasta Pablo, la Biblia muestra que el ministerio no se hace solo",
                explica: "Jetro ya le advirtió a Moisés: «no podrás hacerlo tú solo»; y Pablo trabajaba siempre con un equipo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A quiénes buscas primero para el equipo?",
                opciones: [
                  { texto: "A los hermanos fieles, aunque no sean los más talentosos.", bien: true, explica: "El primer paso es orar y observar: buscar a los fieles, no solo a los talentosos." },
                  { texto: "A los más talentosos, aunque todavía no se hayan mostrado fieles.", explica: "Se busca a los fieles, no solo a los talentosos." },
                  { texto: "A los que más te admiran y nunca te llevan la contraria.", explica: "Lo que se busca son hermanos fieles, no admiradores: con ellos se evalúa y se corrige con amor." },
                ],
                apoyo: "Orar y observar: buscar a los fieles, no solo a los talentosos",
                explica: "El primer paso es orar y observar: buscar a los fieles, no solo a los talentosos.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya tienes a tres hermanos fieles. ¿Qué haces con ellos?",
                opciones: [
                  { texto: "Los invitas a servir contigo, con responsabilidades que crecen.", bien: true, explica: "Se invita a servir junto a ti y se dan responsabilidades que crecen." },
                  { texto: "Les das un curso de un año antes de dejarlos servir en algo.", explica: "Formar líderes es caminar juntos, no solo dar clases." },
                  { texto: "Les pasas todo tu trabajo de una vez, para poder descansar enseguida.", explica: "Las responsabilidades crecen poco a poco: primero se invita a servir junto a ti." },
                ],
                apoyo: "Invitar a servir junto a ti y dar responsabilidades que crecen",
                explica: "Formar líderes es caminar juntos, no solo dar clases: se sirve juntos y las responsabilidades crecen.",
              },
              {
                tipo: "explica",
                apoyo: "Enseñar el carácter que pide la Palabra antes que las habilidades",
                clave: {
                  id: "pr-pastoral-1-3-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe tu plan para formar a esos tres hermanos: ¿qué les enseñarás primero y cómo terminarás el proceso?",
                  ideas: [
                    { id: "caracter", peso: 40, texto: "Primero, el carácter que pide la Palabra, antes que las habilidades.", formas: ["caracter"] },
                    { id: "evaluar", peso: 30, texto: "Evaluar juntos y corregir con amor.", formas: ["evalu*", "correg* con amor", "corrigiendo con amor", "revis* juntos"] },
                    { id: "soltar", peso: 30, texto: "Reconocerlos ante la iglesia cuando estén listos, y soltarlos para servir.", formas: ["reconoc*", "solt*", "envi*", "ante la iglesia", "present* a la iglesia"] },
                  ],
                  modelo: "Primero les enseñaré el carácter que pide la Palabra, antes que las habilidades. Serviremos juntos, los evaluaré con ellos y los corregiré con amor, y cuando estén listos los reconoceré ante la iglesia y los soltaré para servir.",
                },
              },
            ],
          },
          {
            apoyo: "Un pastor que forma un equipo multiplica el cuidado del rebaño",
            ref: "Tito 1:5",
            titulo: "Una iglesia que crece",
            relato: [
              "Tu iglesia creció mucho este año. Llegaron muchas familias nuevas, y ya no alcanzas a conocerlas a todas.",
              "Hay varios hermanos que sirven con fidelidad desde hace tiempo, pero nunca les diste una responsabilidad.",
              "Decides formar líderes que cuiden contigo al rebaño.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Por qué formar un equipo, según la lección?",
                opciones: [
                  { texto: "Porque un pastor que forma un equipo multiplica el cuidado del rebaño.", bien: true, explica: "Un pastor que forma un equipo multiplica el cuidado del rebaño." },
                  { texto: "Porque así el pastor ya no tendrá que cuidar a nadie de la iglesia.", explica: "El equipo no reemplaza el cuidado del pastor: lo multiplica." },
                  { texto: "Porque una iglesia grande necesita un pastor que haga todavía más cosas.", explica: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia." },
                ],
                apoyo: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide",
                explica: "Ningún pastor puede hacerlo todo solo: el que forma un equipo multiplica el cuidado del rebaño.",
              },
              {
                tipo: "situacion",
                pregunta: "Uno de ellos predica muy bien, pero todavía le falta carácter. ¿Qué haces?",
                opciones: [
                  { texto: "Le enseñas primero el carácter que pide la Palabra.", bien: true, explica: "Se enseña el carácter que pide la Palabra antes que las habilidades." },
                  { texto: "Lo pones a predicar cada domingo, porque su don es lo que más importa.", explica: "El carácter que pide la Palabra va antes que las habilidades." },
                  { texto: "Lo dejas fuera del equipo para siempre, sin explicarle por qué.", explica: "Se forma su carácter, se evalúa juntos y se corrige con amor." },
                ],
                apoyo: "Enseñar el carácter que pide la Palabra antes que las habilidades",
                explica: "El carácter que pide la Palabra se enseña antes que las habilidades.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo lo vas a formar?",
                opciones: [
                  { texto: "Sirviendo juntos: que te acompañe y aprenda a tu lado.", bien: true, explica: "Formar líderes es caminar juntos, como Pablo con Timoteo." },
                  { texto: "Solo con clases en un aula, hasta que termine todo el curso.", explica: "Formar líderes es caminar juntos, no solo dar clases." },
                  { texto: "Que aprenda solo con videos, sin que tú tengas que acompañarlo.", explica: "Pablo formó a Timoteo como a un hijo: sirvieron juntos en el evangelio." },
                ],
                apoyo: "Formar líderes es caminar juntos, no solo dar clases",
                explica: "Pablo formó a Timoteo como a un hijo, y Timoteo sirvió con él «como hijo a padre»: formar líderes es caminar juntos.",
              },
              {
                tipo: "explica",
                apoyo: "Reconocer ante la iglesia a los que están listos, y soltarlos para servir",
                clave: {
                  id: "pr-pastoral-1-3-a6-2",
                  tipo: "corta",
                  pregunta: "Ya pasó un año sirviendo juntos. ¿Cómo terminarás la formación de esos hermanos?",
                  ideas: [
                    { id: "evaluar", peso: 50, texto: "Evaluar juntos y corregir con amor.", formas: ["evalu*", "correg* con amor", "corrigiendo con amor", "revis* juntos"] },
                    { id: "soltar", peso: 50, texto: "Reconocer ante la iglesia a los que están listos, y soltarlos para servir.", formas: ["reconoc*", "solt*", "envi*", "ante la iglesia", "present* a la iglesia"] },
                  ],
                  modelo: "Los evaluaré junto con ellos y los corregiré con amor en lo que haga falta. Cuando estén listos, los reconoceré ante la iglesia y los soltaré para que sirvan.",
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
            apoyo: "En el Nuevo Testamento, las iglesias eran guiadas por un grupo de ancianos, no por una sola persona",
            ref: "Tito 1:5",
            clave: {
              id: "pr-pastoral-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el Nuevo Testamento muestra un liderazgo plural, y no a un pastor que lo hace todo solo?",
              ideas: [
                { id: "ancianos", peso: 40, texto: "Las iglesias eran guiadas por un grupo de ancianos, no por una sola persona: Pablo dejó a Tito para establecer ancianos en cada ciudad.", formas: ["grupo de ancianos", "ancianos en plural", "varios ancianos", "ancianos en cada ciudad", "establec* ancianos", "no por una sola persona", "guiad* por (ancianos|varios|grupo)"] },
                { id: "solo", peso: 30, texto: "El ministerio no se hace solo: ya Jetro le advirtió a Moisés que no podría hacerlo solo.", formas: ["jetro", "moises", "no se hace solo", "demasiado pesado", "no (puede|podra|podria|puedes|podras|pueden) hacer* solo", "ningun pastor puede"] },
                { id: "equipo", peso: 30, texto: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia; un equipo multiplica el cuidado del rebaño.", formas: ["agota*", "debilit*", "multiplic*", "trabajo en equipo", "trabaj* en equipo", "trabaj* con (un|su) equipo"] },
              ],
              modelo: "Porque el ministerio no se hace solo: ya Jetro se lo advirtió a Moisés. Las iglesias eran guiadas por un grupo de ancianos, no por una sola persona, y un pastor que lo hace todo solo agota su vida y debilita a la iglesia.",
            },
          },
          {
            apoyo: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide",
            ref: "Éxodo 18:17-18",
            clave: {
              id: "pr-pastoral-1-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Un buen pastor no necesita a nadie; lo hace todo él solo. ¿Qué le respondes con la Biblia?",
              ideas: [
                { id: "solo", peso: 35, texto: "Ningún pastor puede hacerlo todo solo: Jetro se lo advirtió a Moisés.", formas: ["jetro", "moises", "no se hace solo", "demasiado pesado", "no (puede|podra|podria|puedes|podras|pueden) hacer* solo", "ningun pastor puede"] },
                { id: "ancianos", peso: 35, texto: "En el Nuevo Testamento, las iglesias eran guiadas por un grupo de ancianos.", formas: ["grupo de ancianos", "ancianos en plural", "varios ancianos", "ancianos en cada ciudad", "establec* ancianos", "no por una sola persona", "guiad* por (ancianos|varios|grupo)"] },
                { id: "equipo", peso: 30, texto: "Pablo trabajaba siempre con un equipo, y un equipo multiplica el cuidado del rebaño.", formas: ["agota*", "debilit*", "multiplic*", "trabajo en equipo", "trabaj* en equipo", "trabaj* con (un|su) equipo", "colaborador*", "timoteo", "tiquico"] },
              ],
              errores: [{ id: "razon", texto: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide.", formas: ["tiene razon", "(puede|debe) hacerlo todo solo"], anula: "solo" }],
              modelo: "Le respondo que ningún pastor puede hacerlo todo solo: Jetro se lo advirtió a Moisés. En el Nuevo Testamento las iglesias eran guiadas por varios ancianos, y Pablo trabajó con un equipo, que multiplica el cuidado del rebaño.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La disciplina que restaura
    "pastoral-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es el primer paso que dio Jesús para corregir?", reverso: "Hablar en privado, «estando tú y él solos».", apoyo: "primero en privado, «estando tú y él solos»" },
              { frente: "Si el hermano no escucha, ¿qué paso sigue?", reverso: "Tomar contigo a uno o dos.", apoyo: "si no escucha, «toma aún contigo a uno o dos»" },
              { frente: "¿Cuándo se lleva el asunto a la iglesia?", reverso: "Solo al final.", apoyo: "y solo al final, «dilo a la iglesia»" },
              { frente: "¿Dónde está la meta de la disciplina, según la lección?", reverso: "En la primera frase: «si te oyere, has ganado a tu hermano».", apoyo: "La meta está en la primera frase: «si te oyere, has ganado a tu hermano»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el espíritu de la corrección?", reverso: "La mansedumbre.", apoyo: "El espíritu de la corrección es la mansedumbre" },
              { frente: "¿Por qué el que corrige se considera a sí mismo?", reverso: "Para que él tampoco sea tentado: todos podemos caer.", apoyo: "considerándote a ti mismo, no sea que tú también seas tentado" },
              { frente: "Cuando hay arrepentimiento, ¿qué pide Pablo?", reverso: "Perdonarle, consolarle y confirmar el amor.", apoyo: "cuando hay arrepentimiento, Pablo pide «perdonarle y consolarle, para que no sea consumido de demasiada tristeza»" },
              { frente: "¿Reemplaza la disciplina de la iglesia a la justicia?", reverso: "No: ante un delito se protege a la víctima y se denuncia.", apoyo: "La disciplina de la iglesia no reemplaza a la justicia" },
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
            consigna: "Ordena el camino que dio Jesús para corregir a un hermano, del primer paso al último.",
            pasos: [
              "Hablarle en privado, estando tú y él solos",
              "Si no escucha, volver con uno o dos",
              "Si tampoco escucha, decirlo a la iglesia",
              "Cuando se arrepiente, perdonarlo y confirmar el amor",
            ],
            apoyo: "Jesús dio un camino gradual: primero en privado, «estando tú y él solos»; si no escucha, «toma aún contigo a uno o dos»; y solo al final, «dilo a la iglesia»",
            ref: "Mateo 18:15-17",
            explica: "Jesús dio un camino gradual: primero en privado; si no escucha, con uno o dos; y solo al final, ante la iglesia. La disciplina tiene un final: cuando hay arrepentimiento, se perdona, se consuela y se confirma el amor.",
          },
          {
            consigna: "Un hermano de tu célula habla mal de otros a sus espaldas. Ordena cómo lo corriges según Mateo 18, del primer paso al último.",
            pasos: [
              "Hablas con él a solas, con mansedumbre",
              "Como no escucha, vuelves a hablarle con uno o dos",
              "Como sigue sin escuchar, lo llevas ante la iglesia",
              "Cuando se arrepiente, lo perdonas y lo consuelas",
            ],
            apoyo: "Jesús dio un camino gradual para corregir: en privado, con uno o dos testigos y, solo al final, ante la iglesia",
            ref: "Mateo 18:15-17",
            explica: "Se empieza siempre por lo más privado y se avanza solo si hace falta: a solas, después con uno o dos y, solo al final, ante la iglesia. Cuando hay arrepentimiento, se perdona y se consuela.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre corregir.",
            texto: "Corregir es un acto de [[amor]] cuando busca [[restaurar]]: ese es el camino distinto que enseña la Biblia.",
            distractores: ["poder", "castigar"],
            errores: {
              poder: "Corregir es un acto de amor; usar la disciplina para controlar es lo contrario de lo que enseña la Biblia.",
              castigar: "Se busca la restauración, no el castigo ni la humillación.",
            },
            apoyo: "Corregir es un acto de amor cuando busca restaurar",
            explica: "Muchas iglesias evitan la disciplina por miedo a herir, y otras la usan para controlar; la Biblia enseña un camino distinto: corregir para restaurar.",
          },
          {
            consigna: "Completa la meta y el espíritu de la disciplina.",
            texto: "La meta de la disciplina es [[ganar]] al hermano, y su espíritu es la mansedumbre, sabiendo que todos podemos [[caer]].",
            distractores: ["echar", "mandar"],
            errores: {
              echar: "La meta es ganar al hermano: «si te oyere, has ganado a tu hermano».",
              mandar: "El que corrige se considera a sí mismo, porque todos podemos caer.",
            },
            apoyo: "La meta es ganar al hermano, y el espíritu es la mansedumbre, sabiendo que todos podemos caer",
            ref: "Gálatas 6:1",
            explica: "La meta está en la primera frase: «si te oyere, has ganado a tu hermano»; y se corrige con mansedumbre, considerándose a sí mismo, porque todos podemos caer.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Corrige para restaurar, o para castigar o humillar? Lleva cada frase a su grupo.",
            grupos: ["Corrige para restaurar", "Corrige para castigar o humillar"],
            frases: [
              { texto: "Habla primero a solas con el hermano", grupo: 0 },
              { texto: "Corrige con mansedumbre, sabiendo que también puede caer", grupo: 0 },
              { texto: "Perdona y consuela cuando hay arrepentimiento", grupo: 0 },
              { texto: "Lo expone ante todos desde el primer día", grupo: 1 },
              { texto: "Sigue castigando aunque el hermano ya se arrepintió", grupo: 1 },
              { texto: "Le habla con dureza para que sienta vergüenza", grupo: 1 },
            ],
            apoyo: "Buscar la restauración, no el castigo ni la humillación",
            explica: "Se corrige para restaurar: primero en privado, con mansedumbre y perdonando cuando hay arrepentimiento. Exponer, humillar o seguir castigando busca el castigo, no la restauración.",
          },
          {
            consigna: "¿Qué busca cada manera de corregir: restaurar o humillar? Lleva cada frase a su grupo.",
            grupos: ["Busca restaurar", "Busca humillar"],
            frases: [
              { texto: "Empezar por lo más privado, y avanzar solo si hace falta", grupo: 0 },
              { texto: "Corregir pensando en ganar al hermano", grupo: 0 },
              { texto: "Confirmar el amor cuando hay arrepentimiento", grupo: 0 },
              { texto: "Contar su pecado en el culto antes de hablar con él", grupo: 1 },
              { texto: "Recordarle su falta cada vez que se equivoca", grupo: 1 },
              { texto: "Corregirlo a gritos delante de su familia", grupo: 1 },
            ],
            apoyo: "Empezar siempre por lo más privado, y avanzar solo si hace falta",
            explica: "La disciplina busca la restauración, no el castigo ni la humillación: empieza por lo más privado, piensa en ganar al hermano y confirma el amor.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder te dice: El hermano Ramón no está de acuerdo con el nuevo horario del culto; hay que disciplinarlo para que aprenda.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que una diferencia de opinión no es un pecado que se disciplina.", bien: true, explica: "El pastor distingue el pecado de las diferencias de opinión: no estar de acuerdo no es pecado." },
              { texto: "Que tiene razón: el que no está de acuerdo debe ser corregido.", explica: "Distinguir el pecado de las diferencias de opinión es uno de los principios para el pastor." },
              { texto: "Que lo lleve de una vez ante la iglesia, para que todos lo sepan.", explica: "Aun cuando hay pecado, se empieza por lo más privado; y aquí no hay pecado, sino una opinión distinta." },
              { texto: "Que no le hable más hasta que acepte el nuevo horario del culto.", explica: "Aislar a alguien por pensar distinto no es disciplina: aquí no hay un pecado que corregir." },
            ],
            apoyo: "Distinguir el pecado de las diferencias de opinión",
            explica: "Uno de los principios para el pastor es distinguir el pecado de las diferencias de opinión: la disciplina es para restaurar al que peca, no para controlar.",
          },
          {
            caso: "Otro pastor te escribe: Un hermano cayó en pecado; voy a disciplinarlo yo solo, sin decirle nada a nadie ni anotar nada.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que actúe junto con otros líderes y deje constancia con discreción.", bien: true, explica: "Es un principio para el pastor: actuar junto con otros líderes, no solo, y dejar constancia con discreción." },
              { texto: "Que está bien: el pastor no necesita a nadie para corregir a un hermano.", explica: "El pastor actúa junto con otros líderes, no solo." },
              { texto: "Que lo publique en el grupo de la iglesia, para que quede constancia.", explica: "La constancia se deja con discreción, no a la vista de todos." },
              { texto: "Que no haga nada, porque la disciplina siempre termina hiriendo.", explica: "Evitar la disciplina por miedo a herir no es el camino de la Biblia: se corrige para restaurar." },
            ],
            apoyo: "Actuar junto con otros líderes, no solo, y dejar constancia con discreción",
            explica: "El pastor no corrige solo: actúa junto con otros líderes y deja constancia con discreción, siempre buscando la restauración.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El espíritu de la corrección es la mansedumbre",
            ref: "Gálatas 6:1",
            titulo: "El rumor de Andrés",
            relato: [
              "Eres pastor. Andrés, un hermano del equipo de alabanza, contó mentiras sobre otro hermano, y el rumor ya llegó a varios grupos de la iglesia.",
              "Otros dos líderes te acompañan en el caso, y juntos quieren corregirlo como enseña la Biblia.",
              "Ya te contaron lo que pasó, pero todavía no has hablado con Andrés.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezas?",
                opciones: [
                  { texto: "Hablas con Andrés a solas, con mansedumbre.", bien: true, explica: "Se empieza siempre por lo más privado: «estando tú y él solos»." },
                  { texto: "Lo anuncias en el culto para que nadie más lo haga.", explica: "Decirlo a la iglesia es el último paso, no el primero." },
                  { texto: "Lo sacas del equipo sin hablar antes con él.", explica: "Se empieza hablando en privado, y se busca la restauración, no el castigo." },
                ],
                apoyo: "Empezar siempre por lo más privado, y avanzar solo si hace falta",
                explica: "Jesús dio un camino gradual: primero en privado, y se avanza solo si hace falta.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés reconoce lo que hizo, se arrepiente y pide perdón. ¿Qué haces?",
                opciones: [
                  { texto: "Lo perdonas, lo consuelas y le confirmas tu amor.", bien: true, explica: "Cuando hay arrepentimiento, se perdona, se consuela y se confirma el amor." },
                  { texto: "Lo perdonas, pero le recuerdas su falta cada semana.", explica: "Pablo pide «perdonarle y consolarle, para que no sea consumido de demasiada tristeza»." },
                  { texto: "Le dices que el perdón tendrá que ganárselo con tiempo.", explica: "La disciplina tiene un final: cuando hay arrepentimiento, Pablo pide perdonarle." },
                ],
                apoyo: "Cuando hay arrepentimiento, se perdona, se consuela y se confirma el amor",
                explica: "La disciplina tiene un final: Pablo pide «perdonarle y consolarle» y que «confirméis el amor para con él».",
              },
              {
                tipo: "situacion",
                pregunta: "Uno de los líderes te pide que cuentes todos los detalles en el culto. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que Andrés ya escuchó, y que se deja constancia con discreción.", bien: true, explica: "«si te oyere, has ganado a tu hermano»: el asunto llega a la iglesia solo al final, si no escucha." },
                  { texto: "Que sí, para que sirva de ejemplo a todos los demás hermanos.", explica: "Exponerlo busca la humillación, no la restauración." },
                  { texto: "Que sí, pero solo en el grupo de jóvenes, donde más se habló del tema.", explica: "Si el hermano escuchó, no hace falta avanzar: se deja constancia con discreción." },
                ],
                apoyo: "Actuar junto con otros líderes, no solo, y dejar constancia con discreción",
                explica: "Como Andrés escuchó, no hace falta llegar a la iglesia: la meta era ganar al hermano, y se deja constancia con discreción.",
              },
              {
                tipo: "explica",
                apoyo: "«restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado»",
                clave: {
                  id: "pr-pastoral-1-4-a6-1",
                  tipo: "corta",
                  pregunta: "Explica a tu equipo por qué corregiste así a Andrés: ¿cuál es la meta de la disciplina y con qué espíritu se hace?",
                  ideas: [
                    { id: "meta", peso: 50, texto: "La meta es ganar al hermano: restaurarlo, no castigarlo ni humillarlo.", formas: ["ganar* hermano", "ganarlo", "has ganado", "restaur*", "ganar a andres"] },
                    { id: "espiritu", peso: 50, texto: "El espíritu es la mansedumbre, sabiendo que todos podemos caer.", formas: ["mansedumbre", "manso*", "podemos caer", "(puedo|podemos|podria|puede|pueden) caer", "considerandome", "considerarse", "tentado*"] },
                  ],
                  errores: [{ id: "castigo", texto: "Se busca la restauración, no el castigo ni la humillación.", formas: ["para (castigar*|humillar*|avergonzar*)", "meta es (castigar*|humillar*)", "que (pague|sufra)"], anula: "meta" }],
                  modelo: "La meta de la disciplina es ganar al hermano: restaurarlo, no castigarlo ni humillarlo. Y el espíritu es la mansedumbre, considerándome a mí mismo, porque todos podemos caer.",
                },
              },
            ],
          },
          {
            apoyo: "La disciplina de la iglesia no reemplaza a la justicia",
            titulo: "Cuando hay un delito",
            relato: [
              "Eres pastor. Una madre te cuenta, llorando, que su hija de nueve años dice que un maestro de la escuela dominical abusó de ella.",
              "El maestro sirve en la iglesia desde hace años, y muchos lo aprecian.",
              "Varios líderes te piden que lo resuelvas dentro de la iglesia, sin escándalo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Proteges primero a la niña y lo denuncias a las autoridades.", bien: true, explica: "Si un hecho puede ser un delito, como el abuso de un menor, el pastor protege primero a la víctima y lo denuncia a las autoridades, como manda la ley." },
                  { texto: "Hablas a solas con el maestro, como enseña Mateo 18, antes de hacer nada.", explica: "La disciplina de la iglesia no reemplaza a la justicia: ante un delito, primero se protege a la víctima y se denuncia." },
                  { texto: "Le pides a la madre que espere en silencio mientras la iglesia averigua.", explica: "Callar no protege a la víctima: ante un delito se protege a la víctima y se denuncia." },
                ],
                apoyo: "Si un hecho puede ser un delito, como el abuso de un menor, el pastor protege primero a la víctima y lo denuncia a las autoridades, como manda la ley",
                explica: "Ante un delito, el pastor protege primero a la víctima y lo denuncia a las autoridades, como manda la ley.",
              },
              {
                tipo: "situacion",
                pregunta: "Un líder te dice: Esto es asunto de la iglesia; no hace falta llamar a nadie de afuera. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que la disciplina de la iglesia no reemplaza a la justicia.", bien: true, explica: "La disciplina de la iglesia no reemplaza a la justicia: ante un delito se denuncia, como manda la ley." },
                  { texto: "Que tiene razón: la iglesia sabe resolver sus propios problemas.", explica: "Cuando hay delitos o abusos, se protege a la víctima y se cumple la ley, además de la disciplina de la iglesia." },
                  { texto: "Que mejor esperar, y denunciar solo si vuelve a pasar con otra niña.", explica: "El pastor protege primero a la víctima y lo denuncia a las autoridades, como manda la ley." },
                ],
                apoyo: "La disciplina no reemplaza a la justicia: ante un delito se protege a la víctima y se denuncia",
                explica: "La disciplina no reemplaza a la justicia: ante un delito se protege a la víctima y se denuncia.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué pasa con la disciplina de la iglesia en este caso?",
                opciones: [
                  { texto: "Se aplica además de la denuncia, junto con otros líderes.", bien: true, explica: "Se protege a la víctima y se cumple la ley, además de la disciplina de la iglesia, actuando junto con otros líderes." },
                  { texto: "Se aplica en vez de la denuncia, para cuidar el nombre de la iglesia.", explica: "La disciplina de la iglesia no reemplaza a la justicia." },
                  { texto: "No se aplica, porque ya es un asunto solo de las autoridades.", explica: "Cuando hay delitos o abusos, se cumple la ley además de la disciplina de la iglesia." },
                ],
                apoyo: "Cuando hay delitos o abusos, proteger a la víctima y cumplir la ley, además de la disciplina de la iglesia",
                explica: "Cuando hay delitos o abusos, se protege a la víctima y se cumple la ley, además de la disciplina de la iglesia, que se aplica junto con otros líderes.",
              },
              {
                tipo: "explica",
                apoyo: "el pastor protege primero a la víctima y lo denuncia a las autoridades, como manda la ley",
                clave: {
                  id: "pr-pastoral-1-4-a6-2",
                  tipo: "corta",
                  pregunta: "Explica a tu equipo de líderes por qué actuaste así en este caso.",
                  ideas: [
                    { id: "victima", peso: 35, texto: "Primero se protege a la víctima.", formas: ["proteg* victima", "proteg* nina", "proteg* primero (victima|nina)", "cuid* (victima|nina)", "(victima|nina) primero", "seguridad de la (nina|victima)"] },
                    { id: "denuncia", peso: 35, texto: "Se denuncia a las autoridades, como manda la ley.", formas: ["denunci*", "autoridades", "policia", "manda la ley", "cumpl* la ley"] },
                    { id: "justicia", peso: 30, negativa: true, texto: "La disciplina de la iglesia no reemplaza a la justicia: se aplica además.", formas: ["no reemplaza", "no sustituye", "no basta", "ademas de la disciplina", "no (es|era) solo", "no (puede|podemos|puedes|podia|podiamos) (resolver*|arreglar*)", "justicia"] },
                  ],
                  errores: [{ id: "adentro", texto: "La disciplina de la iglesia no reemplaza a la justicia: ante un delito se denuncia.", formas: ["(resolver*|arregl*) dentro de la iglesia", "sin denunciar*", "no hacia falta denunciar*"], anula: "denuncia" }],
                  modelo: "Primero protegí a la niña y lo denuncié a las autoridades, como manda la ley. La disciplina de la iglesia no reemplaza a la justicia: se aplica además, junto con otros líderes.",
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
            apoyo: "Jesús dio un camino gradual para corregir: en privado, con uno o dos testigos y, solo al final, ante la iglesia",
            ref: "Mateo 18:15-17",
            clave: {
              id: "pr-pastoral-1-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué pasos dio Jesús en Mateo 18:15-17 para corregir a un hermano?",
              ideas: [
                { id: "privado", peso: 40, texto: "Primero en privado, estando tú y él solos.", formas: ["privad*", "a solas", "el solos", "dos solos", "solos (los|ustedes) dos"] },
                { id: "testigos", peso: 30, texto: "Si no escucha, tomar contigo a uno o dos.", formas: ["uno o dos", "testigo*", "dos o tres", "(no|tampoco) (escucha*|oye|oyere|hace|quiere) (uno|testigo*|otros|otro)", "(otro|otros|otra|otras) (dos|hermano|hermanos|persona|personas|lider|lideres)"] },
                { id: "iglesia", peso: 30, texto: "Solo al final, decirlo a la iglesia.", formas: ["(a|ante|con) la iglesia", "toda la iglesia", "la congregacion", "(no|tampoco) (escucha*|oye|oyere|hace|quiere) (a|ante|con) la iglesia", "(no|tampoco) (escucha*|oye|oyere|hace|quiere) (iglesia|congregacion)"] },
              ],
              errores: [{ id: "iglesia-primero", texto: "Se empieza siempre por lo más privado; la iglesia es el último paso.", formas: ["primero (ante|a) la iglesia", "(empez*|comenz*|inicia*) (ante|con|por) la iglesia"], anula: "privado" }],
              modelo: "Jesús dio un camino gradual: primero hablarle en privado, estando tú y él solos; si no escucha, tomar contigo a uno o dos; y solo al final, decirlo a la iglesia.",
            },
          },
          {
            apoyo: "Empezar siempre por lo más privado, y avanzar solo si hace falta",
            ref: "Mateo 18:15-17",
            clave: {
              id: "pr-pastoral-1-4-a7-2",
              tipo: "corta",
              pregunta: "Un líder quiere contar ante toda la iglesia el pecado de un hermano, sin haber hablado antes con él. ¿Qué le explicas con Mateo 18?",
              ideas: [
                { id: "privado", peso: 40, texto: "Jesús enseñó a empezar en privado, estando tú y él solos.", formas: ["privad*", "a solas", "el solos", "dos solos", "primero (hablar|hablarle|hable|habla|hablen|ir)"] },
                { id: "gradual", peso: 30, texto: "Si no escucha, se toma a uno o dos, y solo al final se dice a la iglesia.", formas: ["uno o dos", "testigo*", "al final", "ultimo (paso|lugar)", "gradual", "(no|tampoco) (escucha*|oye|oyere|hace|quiere) (uno|testigo*|otros|otro)", "(no|tampoco) (escucha*|oye|oyere|hace|quiere) (a|ante|con) la iglesia"] },
                { id: "meta", peso: 30, texto: "La meta es ganar al hermano.", formas: ["ganar* hermano", "ganado a tu hermano", "has ganado", "ganarlo", "restaur*"] },
              ],
              errores: [{ id: "exponer", texto: "Decirlo a la iglesia es el último paso, no el primero.", formas: ["tiene razon", "primero (ante|a) la iglesia"], anula: "privado" }],
              modelo: "Le explico que Jesús enseñó a empezar en privado, estando tú y él solos. Si no escucha, se toma a uno o dos, y solo al final se dice a la iglesia, porque la meta es ganar al hermano.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Proteger al rebaño
    "pastoral-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De dónde puede venir el peligro para el rebaño?", reverso: "De afuera y de adentro.", apoyo: "La Biblia advierte que el peligro puede venir de afuera y de adentro" },
              { frente: "¿Qué peligro de afuera anunció Pablo?", reverso: "Lobos rapaces, que no perdonarán al rebaño.", apoyo: "de afuera, «lobos rapaces, que no perdonarán al rebaño»" },
              { frente: "¿Qué peligro de adentro anunció Pablo?", reverso: "Hombres que hablen cosas perversas para arrastrar a los discípulos.", apoyo: "y de adentro, «de vosotros mismos se levantarán hombres que hablen cosas perversas para arrastrar tras sí a los discípulos»" },
              { frente: "Ante esos peligros, ¿qué pidió Pablo?", reverso: "«velad».", apoyo: "Por eso pidió: «velad»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué introducen encubiertamente los falsos maestros?", reverso: "Herejías destructoras.", apoyo: "introducen «encubiertamente herejías destructoras»" },
              { frente: "¿Por qué harán mercadería de los creyentes?", reverso: "Por avaricia, con palabras fingidas.", apoyo: "«por avaricia harán mercadería de vosotros con palabras fingidas»" },
              { frente: "¿Qué dos cosas suelen ir juntas, según la lección?", reverso: "El error doctrinal y el abuso económico.", apoyo: "El error doctrinal y el abuso económico suelen ir juntos" },
              { frente: "¿Qué es proteger al rebaño, según la lección?", reverso: "Amar lo suficiente para poner cercos, no desconfiar de todos.", apoyo: "Proteger al rebaño no es desconfiar de todos, sino amar lo suficiente para poner cercos" },
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
            consigna: "Une a cada uno con la amenaza que anunció o reprendió, según la lección.",
            pares: [
              ["Pablo, en Mileto", "Lobos de afuera y hombres perversos de adentro"],
              ["Pedro", "Falsos maestros con herejías y avaricia"],
              ["Dios, por Ezequiel", "Pastores que dominan con dureza y con violencia"],
              ["Jesús", "Los que dañan a los pequeños"],
            ],
            apoyo: "El pastor protege al rebaño de los lobos de afuera y de los que se levantan adentro con doctrinas perversas y con avaricia",
            ref: "Hechos 20:29-31",
            explica: "Pablo anunció lobos de afuera y hombres que se levantan adentro; Pedro describió a los falsos maestros, con herejías y avaricia; Dios reprendió a los pastores que dominan con dureza; y Jesús fue tajante con los que dañan a los pequeños.",
          },
          {
            consigna: "Une cada amenaza con lo que dice de ella la lección.",
            pares: [
              ["Los lobos rapaces", "Vienen de afuera y no perdonarán al rebaño"],
              ["Los que se levantan adentro", "Hablan cosas perversas para arrastrar a los discípulos"],
              ["Los falsos maestros", "Por avaricia hacen mercadería de los creyentes"],
              ["Los malos pastores", "Se enseñorean de las ovejas con dureza"],
            ],
            apoyo: "La Biblia advierte que el peligro puede venir de afuera y de adentro",
            ref: "2 Pedro 2:1-3",
            explica: "El peligro viene de afuera, como los lobos rapaces, y de adentro, como los que hablan cosas perversas; los falsos maestros hacen mercadería por avaricia, y los malos pastores se enseñorean con dureza.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Dios reprendió a los malos pastores de Israel. ¿Cómo se habían enseñoreado de las ovejas? Toca las palabras que lo dicen.",
            texto: "sino que os habéis enseñoreado de ellas [[con dureza y con violencia]]",
            apoyo: "Dios reprendió a los malos pastores de Israel: no fortalecieron a las débiles ni buscaron a la perdida",
            ref: "Ezequiel 34:4",
            explica: "Dios reprendió a los malos pastores porque no fortalecieron a las débiles ni buscaron a la perdida, «sino que os habéis enseñoreado de ellas con dureza y con violencia»: el abuso de poder dentro del rebaño es uno de los pecados que Dios más condena.",
          },
          {
            consigna: "Jesús fue tajante con los que dañan a los pequeños. ¿Qué les sería mejor? Toca las palabras que lo dicen.",
            texto: "mejor le fuera que se le colgase al cuello [[una piedra de molino de asno]]",
            apoyo: "Jesús fue tajante con los que dañan a los pequeños",
            ref: "Mateo 18:6",
            explica: "Jesús fue tajante: «mejor le fuera que se le colgase al cuello una piedra de molino de asno». Las reglas claras protegen a los niños, a los débiles y también a los que sirven.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los malos pastores tiene un error. Tócala.",
            frases: [
              "Dios reprendió a los malos pastores de Israel.",
              "Los malos pastores no fortalecieron a las débiles ni buscaron a la perdida.",
              "Para Dios, el abuso de poder dentro del rebaño es un pecado pequeño.",
              "Jesús fue tajante con los que dañan a los pequeños.",
            ],
            malo: 2,
            correccion: "El abuso de poder dentro del rebaño es uno de los pecados que Dios más condena.",
            apoyo: "El abuso de poder dentro del rebaño es uno de los pecados que Dios más condena",
            ref: "Ezequiel 34:4",
            explica: "Dios reprendió a los pastores que se enseñorearon de las ovejas con dureza y con violencia: el abuso de poder dentro del rebaño es uno de los pecados que Dios más condena.",
          },
          {
            consigna: "Una de estas frases sobre proteger a los débiles tiene un error. Tócala.",
            frases: [
              "Proteger al rebaño es amar lo suficiente para poner cercos.",
              "Las reglas claras protegen a los niños y a los débiles.",
              "Las reglas claras protegen también a los que sirven.",
              "Proteger al rebaño es desconfiar de todos los que sirven.",
            ],
            malo: 3,
            correccion: "Proteger al rebaño no es desconfiar de todos, sino amar lo suficiente para poner cercos.",
            apoyo: "Proteger al rebaño no es desconfiar de todos, sino amar lo suficiente para poner cercos",
            explica: "Las reglas claras no nacen de la desconfianza, sino del amor: protegen a los niños, a los débiles y también a los que sirven.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Las reglas claras protegen a los niños, a los débiles y también a los que sirven",
            ref: "Mateo 18:6",
            situacion: "Eres pastor, y tu iglesia está abriendo un ministerio para los niños. Te toca poner las reglas para cuidarlos.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano muy querido se ofrece a cuidar solo a los niños desde este domingo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le agradeces y le pides pasar por la revisión y la capacitación.", valor: 2, explica: "Se revisa y se capacita a todo el que sirve con niños y jóvenes: las reglas claras también protegen a los que sirven.", siguiente: "e2" },
                  { texto: "Aceptas, pero le pides que deje abierta la puerta del salón.", valor: 1, explica: "La puerta abierta ayuda, pero falta lo principal: revisar y capacitar a todo el que sirve, y nunca dejar a un adulto solo con un menor.", siguiente: "e2" },
                  { texto: "Aceptas enseguida, porque lo conoces desde hace años y confías en él.", valor: 0, explica: "Proteger al rebaño no es desconfiar de todos, sino amar lo suficiente para poner cercos: todos pasan por la revisión.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Una madre te pregunta quién revisó y capacitó a los que cuidan a su hijo.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Pones la regla para todos: revisión y capacitación antes de servir.", valor: 2, explica: "Revisar y capacitar a todo el que sirve con niños y jóvenes es una medida de protección." },
                  { texto: "Le dices que no se preocupe, porque aquí todos los hermanos son de confianza.", valor: 0, explica: "Proteger al rebaño no es desconfiar de todos: es poner cercos que protegen a los niños." },
                ],
              },
              {
                id: "e2",
                narra: "Un domingo falta un maestro, y en un salón queda un solo adulto con un niño.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Mandas a otro adulto: nunca queda un adulto solo con un menor.", valor: 2, explica: "Nunca se deja a un adulto solo con un menor." },
                  { texto: "Le pides al adulto que se quede con el niño en el pasillo, a la vista.", valor: 1, explica: "Estar a la vista ayuda, pero la regla es clara: nunca dejar a un adulto solo con un menor." },
                  { texto: "Lo dejas así por esta vez, porque solo es media hora.", valor: 0, explica: "Las reglas claras protegen a los niños y también a los que sirven: nunca se deja a un adulto solo con un menor." },
                ],
              },
              {
                id: "e3",
                narra: "Un niño le cuenta a su maestra que alguien lo lastimó y le dijo que no se lo contara a nadie.",
                pregunta: "¿Qué debe hacer la maestra?",
                opciones: [
                  { texto: "Denunciarlo: en Texas, toda persona que lo sospecha está obligada.", valor: 2, explica: "Cumplir la ley: en Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo." },
                  { texto: "Esperar a tener pruebas claras antes de decirle nada a nadie.", valor: 0, explica: "La ley habla de sospecha: en Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo." },
                  { texto: "Contárselo solo al pastor y dejar que él decida si se denuncia o no.", valor: 0, explica: "La obligación es de cada uno: en Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo." },
                ],
              },
            ],
          },
          {
            apoyo: "Manejar el dinero entre dos personas y con cuentas claras",
            ref: "2 Pedro 2:1-3",
            situacion: "Eres pastor de una iglesia pequeña que está creciendo, y quieres poner medidas de protección.",
            escenas: [
              {
                id: "e1",
                narra: "Hace falta alguien que cuente las ofrendas cada domingo.",
                pregunta: "¿Cómo lo organizas?",
                opciones: [
                  { texto: "Que siempre las cuenten dos personas, con cuentas claras.", valor: 2, explica: "Manejar el dinero entre dos personas y con cuentas claras es una medida de protección.", siguiente: "e2" },
                  { texto: "Que las cuenten dos personas, pero sin anotar nada.", valor: 1, explica: "Dos personas está bien, pero también hacen falta cuentas claras.", siguiente: "e2" },
                  { texto: "Que las cuente un hermano de confianza, solo, para no complicar.", valor: 0, explica: "El dinero se maneja entre dos personas y con cuentas claras: las reglas claras protegen también a los que sirven.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Meses después, nadie sabe cuánto dinero entró ni en qué se gastó.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Pones a dos personas y das cuentas claras a la iglesia.", valor: 2, explica: "Manejar el dinero entre dos personas y con cuentas claras protege al rebaño y a los que sirven." },
                  { texto: "Le pides a la iglesia que no pregunte y que confíe en ti.", valor: 0, explica: "La protección se vive también con dinero transparente: entre dos personas y con cuentas claras." },
                ],
              },
              {
                id: "e2",
                narra: "Un predicador visitante ofrece a los hermanos oraciones especiales a cambio de dinero.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Adviertes a la iglesia con claridad y no lo dejas seguir.", valor: 2, explica: "Los falsos maestros «por avaricia harán mercadería de vosotros con palabras fingidas»: se advierte con claridad sobre los errores." },
                  { texto: "Lo dejas terminar el culto, y después hablas con él a solas.", valor: 1, explica: "Hablar con él está bien, pero el rebaño necesita que adviertas con claridad: el abuso económico suele ir junto con el error." },
                  { texto: "Lo dejas, porque la iglesia necesita fondos para el techo.", valor: 0, explica: "El pastor no deja que hagan mercadería del rebaño, aunque la iglesia necesite dinero." },
                ],
              },
              {
                id: "e3",
                narra: "Una hermana te dice que tiene miedo de contar un abuso, porque el acusado es un líder de la iglesia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le ofreces un camino seguro para denunciar sin miedo.", valor: 2, explica: "Tener un camino para que cualquiera pueda denunciar un abuso sin miedo es una medida de protección." },
                  { texto: "Le pides que primero hable a solas con el líder acusado.", valor: 0, explica: "Ante un abuso, primero se protege a quien lo sufre; por eso hace falta un camino seguro para denunciar sin miedo." },
                  { texto: "Le dices que lo piense bien, para no dañar al ministerio.", valor: 0, explica: "Cuidar el nombre del ministerio no está por encima de las ovejas: hace falta un camino para denunciar un abuso sin miedo." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Protege a los niños y a los débiles, o los pone en riesgo? Lleva cada frase a su grupo.",
            grupos: ["Los protege", "Los pone en riesgo"],
            frases: [
              { texto: "Revisar y capacitar a todo el que sirve con niños", grupo: 0 },
              { texto: "Que nunca quede un adulto solo con un menor", grupo: 0 },
              { texto: "Que cualquiera pueda denunciar un abuso sin miedo", grupo: 0 },
              { texto: "Dejar que un voluntario nuevo cuide solo a los niños", grupo: 1 },
              { texto: "Callar una sospecha de abuso para evitar un escándalo", grupo: 1 },
              { texto: "Que las quejas solo puedan llegar al líder acusado", grupo: 1 },
            ],
            apoyo: "Revisar y capacitar a todo el que sirve con niños y jóvenes, y nunca dejar a un adulto solo con un menor",
            explica: "Protegen a los niños y a los débiles la revisión y la capacitación de los que sirven, no dejar nunca a un adulto solo con un menor y un camino para denunciar sin miedo. Callar una sospecha o cerrar ese camino los pone en riesgo.",
          },
          {
            consigna: "¿Así se cuidan el dinero y la doctrina, o así se descuidan? Lleva cada frase a su grupo.",
            grupos: ["Así se cuidan", "Así se descuidan"],
            frases: [
              { texto: "Contar la ofrenda entre dos personas", grupo: 0 },
              { texto: "Dar cuentas claras del dinero", grupo: 0 },
              { texto: "Advertir con claridad sobre los errores", grupo: 0 },
              { texto: "Que una sola persona maneje el dinero sin dar cuentas", grupo: 1 },
              { texto: "Callar cuando alguien enseña una doctrina falsa", grupo: 1 },
              { texto: "Dejar que alguien pida dinero con palabras fingidas", grupo: 1 },
            ],
            apoyo: "Enseñar la sana doctrina y advertir con claridad sobre los errores",
            explica: "El dinero se cuida entre dos personas y con cuentas claras, y la doctrina, enseñando la sana doctrina y advirtiendo con claridad sobre los errores: el error doctrinal y el abuso económico suelen ir juntos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Pablo anunció dos peligros",
            ref: "Hechos 20:29-31",
            clave: {
              id: "pr-pastoral-1-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué dos peligros anunció Pablo a los ancianos de Éfeso, y qué les pidió por eso?",
              ideas: [
                { id: "afuera", peso: 35, texto: "De afuera, lobos rapaces que no perdonarán al rebaño.", formas: ["lobo*", "de afuera", "de fuera", "desde afuera"] },
                { id: "adentro", peso: 35, texto: "De adentro, hombres que hablen cosas perversas para arrastrar a los discípulos.", formas: ["de adentro", "de dentro", "desde adentro", "vosotros mismos", "ustedes mismos", "perversa*", "arrastr*", "la misma iglesia"] },
                { id: "velad", peso: 30, texto: "Por eso pidió: velad.", formas: ["(velad|velar|velen|vele|velemos|velaran|velara)", "vigil*", "(estar|esten|estemos) (atentos|alerta|vigilantes)"] },
              ],
              modelo: "Pablo anunció dos peligros: de afuera, lobos rapaces que no perdonarán al rebaño, y de adentro, hombres que hablen cosas perversas para arrastrar tras sí a los discípulos. Por eso les pidió: velad.",
            },
          },
          {
            apoyo: "Pedro describe a los falsos maestros",
            ref: "2 Pedro 2:1-3",
            clave: {
              id: "pr-pastoral-1-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué describe Pedro de los falsos maestros, y qué enseña eso al pastor que protege al rebaño?",
              ideas: [
                { id: "herejias", peso: 35, texto: "Introducen encubiertamente herejías destructoras.", formas: ["herej*", "encubiert*", "a escondidas", "doctrina* falsa*", "falsa* doctrina*", "error doctrinal", "errores doctrinales", "ensenanzas falsas", "falsas ensenanzas"] },
                { id: "avaricia", peso: 35, texto: "Por avaricia hacen mercadería de los creyentes con palabras fingidas.", formas: ["avaric*", "mercader*", "palabras fingidas", "dinero", "abuso economico", "codicia"] },
                { id: "juntos", peso: 30, texto: "El error doctrinal y el abuso económico suelen ir juntos.", formas: ["(van|ir|andan|vienen|suelen|estan) juntos", "de la mano", "a la vez", "junto (con|al)"] },
              ],
              modelo: "Pedro dice que introducen encubiertamente herejías destructoras y que por avaricia hacen mercadería de los creyentes con palabras fingidas. Eso enseña al pastor que el error doctrinal y el abuso económico suelen ir juntos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La salud del pastor
    "pastoral-1-6": [
      {
        id: "a1",
        objetivo: 1,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Después de una gran victoria, ¿qué deseaba Elías bajo el enebro?", reverso: "Morirse.", apoyo: "Después de una gran victoria, Elías se sentó bajo un enebro «deseando morirse»" },
              { frente: "¿Qué hizo Dios primero con Elías?", reverso: "No lo reprendió: lo dejó dormir.", apoyo: "Dios no lo reprendió primero: lo dejó dormir" },
              { frente: "¿Qué le dijo el ángel a Elías?", reverso: "«Levántate, come».", apoyo: "un ángel le dijo: «Levántate, come»" },
              { frente: "¿De qué le habló Dios a Elías después de cuidar su cuerpo?", reverso: "De su misión.", apoyo: "Antes de hablarle de su misión, cuidó su cuerpo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde dice Pablo que está el tesoro del ministerio?", reverso: "«en vasos de barro».", apoyo: "Pablo sabía que el ministerio es un tesoro «en vasos de barro»" },
              { frente: "¿De dónde viene la fuerza del ministerio?", reverso: "De Dios, no del pastor.", apoyo: "La fuerza no viene del pastor, sino de Dios" },
              { frente: "Según Gálatas 6:2, ¿qué necesita también el pastor?", reverso: "Que otros le ayuden a llevar sus cargas.", apoyo: "El pastor también necesita que otros le ayuden a llevar sus cargas" },
              { frente: "Si un pastor está agotado, ¿es falta de fe pedir ayuda?", reverso: "No: pedir ayuda no es falta de fe.", apoyo: "Si estás agotado, pedir ayuda no es falta de fe" },
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
            consigna: "¿Qué señal de alerta muestra cada ejemplo? Une cada ejemplo con su señal.",
            pares: [
              ["Duerme el fin de semana y el lunes sigue igual de agotado", "Un cansancio que no se va con el descanso"],
              ["Ya no soporta a la gente y habla de todos con burla", "Irritación, aislamiento o cinismo con la gente"],
              ["Solo abre la Biblia cuando tiene que predicar", "Orar y leer la Palabra solo para preparar sermones"],
              ["Hace meses que no cena con su familia ni va al médico", "Descuidar a la familia y la propia salud"],
              ["No deja que nadie más predique, visite ni enseñe", "Pensar que nadie más puede hacer lo que uno hace"],
            ],
            apoyo: "Irritación, aislamiento o cinismo con la gente",
            explica: "Son las señales de alerta del agotamiento: un cansancio que no se va con el descanso; la irritación, el aislamiento o el cinismo; orar y leer la Palabra solo para preparar sermones; descuidar a la familia y la salud; y pensar que nadie más puede hacer lo que uno hace.",
          },
          {
            consigna: "Une cada señal de alerta del agotamiento con un ejemplo de ella.",
            pares: [
              ["Un cansancio que no se va", "Volvió de sus vacaciones y sigue igual de cansado"],
              ["Irritación o cinismo con la gente", "Se encierra en su oficina y contesta mal a todos"],
              ["Orar solo para preparar sermones", "Ya no ora por sí mismo, solo para el mensaje del domingo"],
              ["Descuidar la familia y la salud", "Sus hijos casi no lo ven, y él no se cuida"],
              ["Creer que nadie más puede hacerlo", "No suelta ninguna tarea, porque nadie la hará como él"],
            ],
            apoyo: "Un cansancio que no se va con el descanso",
            explica: "Cada ejemplo muestra una señal de alerta del agotamiento; el pastor las reconoce en sí mismo y las atiende.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Pablo explica de dónde viene la fuerza del ministerio. ¿De quién es la excelencia del poder? Toca las palabras que lo dicen.",
            texto: "para que la excelencia del poder sea [[de Dios]], y no de nosotros",
            apoyo: "La fuerza no viene del pastor, sino de Dios",
            ref: "2 Corintios 4:7",
            explica: "El ministerio es un tesoro «en vasos de barro», «para que la excelencia del poder sea de Dios, y no de nosotros»: la fuerza no viene del pastor, sino de Dios.",
          },
          {
            consigna: "Pablo describe a los siervos de Dios en su debilidad. Aunque sufrían, ¿qué no estaban? Toca las palabras que lo dicen.",
            texto: "atribulados en todo, mas no [[angustiados]]; en apuros, mas no [[desesperados]]",
            apoyo: "Pablo sabía que el ministerio es un tesoro «en vasos de barro»",
            ref: "2 Corintios 4:8",
            explica: "Pablo se sabía un vaso de barro: «atribulados en todo, mas no angustiados; en apuros, mas no desesperados», porque la fuerza viene de Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo cuidó Dios a Elías.",
            texto: "Dios no reprendió primero a Elías: lo dejó [[dormir]], y antes de hablarle de su [[misión]], cuidó su [[cuerpo]].",
            distractores: ["trabajar", "pecado", "orgullo"],
            errores: {
              trabajar: "Dios lo dejó dormir, y un ángel le dijo: «Levántate, come».",
              pecado: "Dios no lo reprendió primero: antes de hablarle de su misión, cuidó su cuerpo.",
              orgullo: "Dios cuidó su cuerpo: lo dejó dormir, y un ángel le dijo: «Levántate, come».",
            },
            apoyo: "Dios no lo reprendió primero: lo dejó dormir, y un ángel le dijo: «Levántate, come»",
            ref: "1 Reyes 19:4-5",
            explica: "Después de una gran victoria, Elías se sentó bajo un enebro «deseando morirse». Dios no lo reprendió primero: lo dejó dormir, y antes de hablarle de su misión, cuidó su cuerpo.",
          },
          {
            consigna: "Completa lo que sabía Pablo del ministerio.",
            texto: "Pablo sabía que el ministerio es un [[tesoro]] en vasos de [[barro]]: la fuerza no viene del pastor, sino de [[Dios]].",
            distractores: ["castigo", "oro", "talento"],
            errores: {
              castigo: "El ministerio es un tesoro, aunque esté en vasos de barro.",
              oro: "Pablo habla de vasos de barro: los siervos de Dios también son débiles.",
              talento: "La fuerza no viene del pastor ni de sus capacidades, sino de Dios.",
            },
            apoyo: "y Pablo se sabía un vaso de barro",
            ref: "2 Corintios 4:7",
            explica: "El ministerio es un tesoro «en vasos de barro»: la fuerza no viene del pastor, sino de Dios, «para que la excelencia del poder sea de Dios, y no de nosotros».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un pastor amigo te escribe a medianoche: Estoy tan agotado que a veces pienso en hacerme daño.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que busque ayuda ahora mismo: puede llamar o escribir al 988.", bien: true, explica: "Si alguna vez piensas en hacerte daño, busca ayuda de inmediato: en Estados Unidos puedes llamar o escribir al 988, también en español." },
              { texto: "Que ore más y no se lo cuente a nadie, para no preocupar a la iglesia.", explica: "Pedir ayuda no es falta de fe, y un pensamiento así no se calla: se busca ayuda de inmediato." },
              { texto: "Que descanse este fin de semana, y que verá cómo se le pasa solo.", explica: "Descansar es necesario, pero ante un pensamiento así se busca ayuda de inmediato." },
              { texto: "Que ese pensamiento es falta de fe, y que se arrepienta de una vez.", explica: "Si estás agotado, pedir ayuda no es falta de fe; y ante un pensamiento así, se busca ayuda de inmediato." },
            ],
            apoyo: "Y si alguna vez piensas en hacerte daño, busca ayuda de inmediato: en Estados Unidos puedes llamar o escribir al 988, también en español",
            explica: "Un pensamiento así pide ayuda de inmediato: en Estados Unidos se puede llamar o escribir al 988, también en español. Pedir ayuda no es falta de fe.",
          },
          {
            caso: "Un pastor joven te dice: Estoy agotado, pero si pido ayuda van a pensar que me falta fe.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que pedir ayuda no es falta de fe, y que hable con su pastor.", bien: true, explica: "Si estás agotado, pedir ayuda no es falta de fe. Habla con tu pastor, con tu cobertura o con un profesional de la salud." },
              { texto: "Que tiene razón: un pastor con fe de verdad nunca se agota.", explica: "Los siervos de Dios también se agotan: Elías quiso morirse, y Pablo se sabía un vaso de barro." },
              { texto: "Que lo aguante en silencio hasta que pase esta temporada tan difícil.", explica: "El pastor también necesita que otros le ayuden a llevar sus cargas: no se aguanta en silencio." },
              { texto: "Que deje el ministerio, porque es señal de que ya no sirve para esto.", explica: "El agotamiento se atiende: el pastor descansa, deja que otros lleven sus cargas y pide ayuda cuando la necesita." },
            ],
            apoyo: "Si estás agotado, pedir ayuda no es falta de fe",
            explica: "Pedir ayuda no es falta de fe: el pastor puede hablar con su pastor, con su cobertura o con un profesional de la salud, y dejar que otros le ayuden a llevar sus cargas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un pastor sano tiene un día de descanso, amigos con quienes ser sincero, alguien a quien rendir cuentas y, cuando hace falta, la ayuda de un consejero o de un médico",
            ref: "Gálatas 6:2",
            titulo: "El tanque vacío",
            relato: [
              "Eres pastor desde hace diez años. Hace meses que no tomas un día libre, y ya solo oras y lees la Biblia para preparar el sermón.",
              "Te irritas con la gente por cualquier cosa, y tu familia te dice que casi no te ve.",
              "Decides hacer un plan para cuidarte.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te dicen esas señales?",
                opciones: [
                  { texto: "Que son señales de alerta del agotamiento, y hay que atenderlas.", bien: true, explica: "Orar y leer la Palabra solo para preparar sermones, la irritación y descuidar a la familia son señales de alerta." },
                  { texto: "Que es normal en el ministerio, y que con más fe se te pasará.", explica: "Los siervos de Dios también se agotan, y pedir ayuda no es falta de fe." },
                  { texto: "Que la iglesia te exige demasiado, y que el problema es solo de ellos.", explica: "El pastor reconoce las señales del agotamiento en sí mismo y las atiende." },
                ],
                apoyo: "Orar y leer la Palabra solo para preparar sermones",
                explica: "Orar y leer la Palabra solo para preparar sermones, la irritación con la gente y descuidar a la familia son señales de alerta del agotamiento.",
              },
              {
                tipo: "situacion",
                pregunta: "Como Dios hizo con Elías, ¿qué atiendes primero?",
                opciones: [
                  { texto: "Tu cuerpo: dormir, comer bien y tomar un día de descanso.", bien: true, explica: "Antes de hablarle de su misión, Dios cuidó el cuerpo de Elías: lo dejó dormir, y un ángel le dijo: «Levántate, come»." },
                  { texto: "Tu misión: predicar todavía más, para salir pronto del bache.", explica: "Dios no empezó por la misión de Elías: antes cuidó su cuerpo." },
                  { texto: "Tu culpa: reprenderte con dureza por haberte cansado tanto.", explica: "Dios no reprendió primero a Elías: lo dejó dormir." },
                ],
                apoyo: "Antes de hablarle de su misión, cuidó su cuerpo",
                explica: "Dios no reprendió primero a Elías: cuidó su cuerpo antes de hablarle de su misión.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A quién buscas para no llevar solo tus cargas?",
                opciones: [
                  { texto: "A amigos con quienes ser sincero y a alguien a quien rendir cuentas.", bien: true, explica: "Un pastor sano tiene amigos con quienes ser sincero y alguien a quien rendir cuentas." },
                  { texto: "A nadie, porque un pastor no debe mostrar nunca su debilidad.", explica: "La Biblia no esconde la debilidad de los siervos de Dios: «Sobrellevad los unos las cargas de los otros»." },
                  { texto: "Solo a Dios en oración, porque contarle tus luchas a alguien es falta de fe.", explica: "Si estás agotado, pedir ayuda no es falta de fe: el pastor también necesita que otros le ayuden a llevar sus cargas." },
                ],
                apoyo: "El pastor también necesita que otros le ayuden a llevar sus cargas",
                explica: "«Sobrellevad los unos las cargas de los otros»: el pastor también necesita amigos con quienes ser sincero y alguien a quien rendir cuentas.",
              },
              {
                tipo: "explica",
                apoyo: "El pastor reconoce las señales del agotamiento, descansa, deja que otros lleven sus cargas, rinde cuentas y pide ayuda cuando la necesita",
                clave: {
                  id: "pr-pastoral-1-6-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe tu plan para esta semana: tu descanso, a quién rendirás cuentas y quién te ayudará a llevar tus cargas.",
                  ideas: [
                    { id: "descanso", peso: 35, texto: "Un día de descanso.", formas: ["descans*", "dia libre", "no (trabajare|trabajar)"] },
                    { id: "cuentas", peso: 35, texto: "Alguien a quien rendir cuentas.", formas: ["rend* cuentas", "rendire", "dar cuentas", "dare cuentas", "mentor", "cobertura", "(mi|un|una) pastor*"] },
                    { id: "apoyo", peso: 30, texto: "Amigos con quienes ser sincero y, si hace falta, un consejero o un médico.", formas: ["amig*", "consejer*", "medico", "doctor*", "profesional*", "psicolog*", "sincer*"] },
                  ],
                  modelo: "Tomaré el lunes como día de descanso. Rendiré cuentas cada mes a un pastor amigo, hablaré con sinceridad con dos amigos de confianza y, si el cansancio sigue, iré al médico.",
                },
              },
            ],
          },
          {
            apoyo: "Pensar que nadie más puede hacer lo que uno hace",
            ref: "Gálatas 6:2",
            titulo: "El que no suelta nada",
            relato: [
              "Eres pastor de una iglesia que crece. No dejas que nadie más predique, visite ni dirija nada, porque piensas que nadie lo hará bien.",
              "Hace semanas que te cuesta dormir, y el cansancio no se va aunque descanses.",
              "Un amigo pastor te ofrece reunirse cada mes para orar juntos y pedirse cuentas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué señal de alerta reconoces en ti?",
                opciones: [
                  { texto: "Pensar que nadie más puede hacer lo que yo hago.", bien: true, explica: "Pensar que nadie más puede hacer lo que uno hace es una señal de alerta del agotamiento." },
                  { texto: "Tener una iglesia que crece y que está llena de gente.", explica: "Que la iglesia crezca no es una señal de alerta; sí lo es pensar que nadie más puede hacer lo que uno hace." },
                  { texto: "Que un amigo pastor quiera reunirse conmigo cada mes.", explica: "Eso no es una señal de alerta: es una ayuda para rendir cuentas." },
                ],
                apoyo: "Pensar que nadie más puede hacer lo que uno hace",
                explica: "Pensar que nadie más puede hacer lo que uno hace, y un cansancio que no se va con el descanso, son señales de alerta.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a tu amigo?",
                opciones: [
                  { texto: "Que sí: necesitas a alguien a quien rendir cuentas.", bien: true, explica: "Un pastor sano tiene alguien a quien rendir cuentas." },
                  { texto: "Que no hace falta: con orar a solas te basta y te sobra.", explica: "El pastor también necesita que otros le ayuden a llevar sus cargas." },
                  { texto: "Que lo pensarás cuando la iglesia deje de crecer tanto.", explica: "El pastor rinde cuentas y deja que otros lleven sus cargas también cuando está ocupado." },
                ],
                apoyo: "Un pastor sano tiene un día de descanso, amigos con quienes ser sincero, alguien a quien rendir cuentas",
                explica: "Un pastor sano tiene alguien a quien rendir cuentas, porque el pastor también necesita que otros le ayuden a llevar sus cargas.",
              },
              {
                tipo: "situacion",
                pregunta: "Pasan las semanas, sigues sin dormir y el cansancio no se va. ¿Qué haces?",
                opciones: [
                  { texto: "Buscas la ayuda de un médico o de un consejero.", bien: true, explica: "Un pastor sano tiene, cuando hace falta, la ayuda de un consejero o de un médico." },
                  { texto: "Tomas más café y trabajas también de noche.", explica: "Un cansancio que no se va con el descanso es una señal de alerta: se pide ayuda." },
                  { texto: "Lo escondes, porque pedir ayuda sería una falta de fe.", explica: "Si estás agotado, pedir ayuda no es falta de fe." },
                ],
                apoyo: "cuando hace falta, la ayuda de un consejero o de un médico",
                explica: "Cuando hace falta, el pastor busca la ayuda de un consejero o de un médico: pedir ayuda no es falta de fe.",
              },
              {
                tipo: "explica",
                apoyo: "deja que otros lleven sus cargas, rinde cuentas y pide ayuda cuando la necesita",
                clave: {
                  id: "pr-pastoral-1-6-a6-2",
                  tipo: "corta",
                  pregunta: "¿Qué cambios harás para cuidarte y no llevar solo tus cargas?",
                  ideas: [
                    { id: "soltar", peso: 35, texto: "Soltar tareas y dejar que otros hagan lo que uno hacía.", formas: ["solt*", "deleg*", "dejar* que otros", "dejare que otros", "otros (hagan|ayuden|lleven|prediquen|visiten)", "compart* (tareas|trabajo|cargas)", "repart*", "form* a otros"] },
                    { id: "cuentas", peso: 35, texto: "Rendir cuentas al amigo pastor, reuniéndose cada mes.", formas: ["rend* cuentas", "rendirle", "dar cuentas", "pedir* cuentas", "acept* (reunion|oferta|propuesta|invitacion)", "reunir*", "reunire", "mentor"] },
                    { id: "ayuda", peso: 30, texto: "Buscar la ayuda de un médico o de un consejero, y descansar.", formas: ["medico", "doctor*", "consejer*", "profesional*", "descans*", "pedir ayuda", "pedire ayuda"] },
                  ],
                  modelo: "Voy a soltar tareas para que otros prediquen y visiten conmigo. Aceptaré reunirme cada mes con mi amigo para rendirle cuentas, y buscaré a un médico por el cansancio que no se va.",
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
            apoyo: "Dios cuidó primero el cuerpo de Elías y mostró que el poder es suyo, no nuestro",
            ref: "1 Reyes 19:4-5",
            clave: {
              id: "pr-pastoral-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo cuidó Dios a Elías cuando quiso morirse, y qué enseña eso al que sirve y está agotado?",
              ideas: [
                { id: "reprende", peso: 30, negativa: true, texto: "Dios no lo reprendió primero.", formas: ["no lo (reprendio|rego|regano|castigo|juzgo|condeno)", "sin (reprender*|reganar*|castig*|juzgar*)", "no (reprendio|rego|regano|castigo)", "no le (reclamo|reprocho)"] },
                { id: "cuerpo", peso: 40, texto: "Lo dejó dormir y un ángel le dijo: Levántate, come; cuidó su cuerpo antes de hablarle de su misión.", formas: ["dorm*", "durm*", "levantate come", "comer", "comida", "comio", "alimento", "su cuerpo", "el cuerpo"] },
                { id: "aplica", peso: 30, texto: "El que sirve agotado también debe descansar y cuidarse: cuidarse es parte de cuidar al rebaño.", formas: ["descans*", "cuidarse", "cuidarme", "cuidarte", "cuidarnos", "(debe|debo|debes|debemos|necesita|necesito|necesitamos) cuidar*", "parte de cuidar"] },
              ],
              modelo: "Dios no lo reprendió primero: lo dejó dormir, y un ángel le dijo: «Levántate, come». Cuidó su cuerpo antes de hablarle de su misión. Eso enseña que el que sirve agotado también debe descansar y cuidarse.",
            },
          },
          {
            apoyo: "La fuerza no viene del pastor, sino de Dios, «para que la excelencia del poder sea de Dios, y no de nosotros»",
            ref: "2 Corintios 4:7",
            clave: {
              id: "pr-pastoral-1-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña Pablo cuando dice que el ministerio es un tesoro en vasos de barro?",
              ideas: [
                { id: "debil", peso: 40, texto: "Que los siervos de Dios son débiles: atribulados en todo, mas no angustiados.", formas: ["debil*", "fragil*", "atribulad*", "apuro*", "se agot*", "limitad*", "imperfect*"] },
                { id: "poder", peso: 60, texto: "Que la fuerza no viene del pastor, sino de Dios: la excelencia del poder es de Dios, y no de nosotros.", formas: ["poder (sea|es|viene) de dios", "excelencia del poder", "fuerza (viene|es|sale) de dios", "viene de dios", "de dios y no de nosotros", "no de nosotros", "no (viene|depende|sale) del pastor", "no es nuestro", "no es nuestra", "es de dios", "depende de dios"] },
              ],
              errores: [{ id: "fuerza-pastor", texto: "La fuerza no viene del pastor, sino de Dios.", formas: ["fuerza (viene|sale|depende) del pastor", "poder (es|viene) del pastor", "poder es nuestro", "depende del pastor", "(poder|fuerza) (viene|sale) de (su|sus|nuestra|nuestro|nuestras|nuestros)"], anula: "poder" }],
              modelo: "Pablo enseña que los siervos de Dios son débiles, atribulados en todo, mas no angustiados. La fuerza no viene del pastor, sino de Dios, para que la excelencia del poder sea de Dios, y no de nosotros.",
            },
          },
        ],
      },
    ],
  },
};
