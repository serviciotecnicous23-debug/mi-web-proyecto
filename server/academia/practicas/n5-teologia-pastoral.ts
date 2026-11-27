/**
 * Las prácticas de «Teología pastoral» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-teologia-pastoral.ts), con la guía de docs/academia-practicas.md.
 *
 * Quién puede ejercer el pastorado (también el ministerio de la mujer) es un punto de la declaración de fe por
 * confirmar: ninguna actividad lo pregunta. Tampoco se pregunta cómo se organizan hoy los cargos (la lección lo deja
 * para la materia de administración y gobierno): de los tres nombres del Nuevo Testamento solo se practica lo que la
 * lección dice de cada uno. En los casos de llamado, los que se sienten llamados son hombres, para no tocar ese punto.
 * En el cuidado de los que sufren, las buenas opciones son las que da la lección: estar presente, escuchar, orar,
 * acompañar, ayudar en lo práctico, referir a tiempo y, si hay riesgo de suicidio o de violencia, buscar ayuda de
 * inmediato; sin consejos clínicos ni detalles crudos.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_TEOLOGIA_PASTORAL: PracticasMateria = {
  materia: "n5-teologia-pastoral",
  mision: {
    titulo: "Apacentar la grey de Dios",
    intro:
      "Tu iglesia te pidió formar a los que cuidan a otros: pastores asistentes, líderes de líderes y maestros. Te van a preguntar cómo se reconoce un llamado, cómo cuidar su vida con Dios y su hogar, cómo alimentar a la iglesia con la Palabra, cómo visitar y cuándo referir a alguien, y cómo acompañar en las crisis sin caer. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes formar a otros en el corazón del pastorado: cuidar una grey que es de Dios, bajo el Príncipe de los pastores; cuidar primero tu propia vida y tu hogar; alimentar al rebaño con todo el consejo de Dios; visitar, orar y referir a tiempo; y acompañar en el dolor sin descuidarte, para terminar bien, como Pablo.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El buen pastor y el llamado
    "n5-teologia-pastoral-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué da el buen pastor por las ovejas?", reverso: "Su vida, como dijo Jesús en Juan 10:11.", apoyo: "«Yo soy el buen pastor; el buen pastor su vida da por las ovejas»" },
              { frente: "Ante todo, ¿qué es todo pastor?", reverso: "Una oveja del rebaño de Cristo y un ayudante del Pastor verdadero.", apoyo: "Todo pastor es, ante todo, una oveja del rebaño de Cristo y un ayudante del Pastor verdadero" },
              { frente: "En la Biblia, ¿qué hace el pastor con sus ovejas?", reverso: "Las conoce, las alimenta, las busca cuando se pierden y las defiende.", apoyo: "alguien que cuida ovejas: las conoce, las alimenta, las busca cuando se pierden y las defiende" },
              { frente: "¿Cómo llama Pedro a Cristo, el que da la recompensa?", reverso: "«el Príncipe de los pastores».", apoyo: "el que da la recompensa es Cristo, a quien Pedro llama «el Príncipe de los pastores»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿De quién es la grey que cuida el pastor?", reverso: "De Dios, no del pastor.", apoyo: "La grey es de Dios, no del pastor" },
              { frente: "¿Qué tres nombres reciben en el Nuevo Testamento los que cuidan la iglesia?", reverso: "Ancianos, obispos o supervisores, y pastores.", apoyo: "En el Nuevo Testamento, los que cuidan la iglesia reciben tres nombres" },
              { frente: "¿Por qué se llaman ancianos?", reverso: "Por su madurez.", apoyo: "ancianos, por su madurez" },
              { frente: "¿Por qué se llaman obispos o supervisores?", reverso: "Por su tarea de velar.", apoyo: "obispos o supervisores, por su tarea de velar" },
              { frente: "En la Biblia, ¿el pastor es un ejecutivo o un artista?", reverso: "Ninguno de los dos: es alguien que cuida ovejas.", apoyo: "el pastor no es un ejecutivo ni un artista, sino alguien que cuida ovejas" },
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
            consigna: "Une cada nombre con lo que dice de él la lección.",
            pares: [
              ["Ancianos", "Por su madurez"],
              ["Obispos o supervisores", "Por su tarea de velar"],
              ["Pastores", "Por su cuidado del rebaño"],
              ["El Príncipe de los pastores", "Cristo, el que da la recompensa"],
            ],
            apoyo: "los que cuidan la iglesia reciben tres nombres: ancianos, por su madurez; obispos o supervisores, por su tarea de velar; y pastores, por su cuidado del rebaño",
            ref: "1 Pedro 5:1-4",
            explica: "En el Nuevo Testamento, los que cuidan la iglesia se llaman ancianos, por su madurez; obispos o supervisores, por su tarea de velar; y pastores, por su cuidado del rebaño. Y Pedro llama a Cristo, que da la recompensa, «el Príncipe de los pastores».",
          },
          {
            consigna: "Une a cada uno con lo que dice de él la lección.",
            pares: [
              ["Jesús", "Es el buen pastor que da su vida por las ovejas"],
              ["Pedro", "Siendo también anciano, pidió apacentar la grey de Dios"],
              ["Pablo", "Llamó ancianos a los líderes de Éfeso"],
              ["El Espíritu Santo", "Puso por obispos a los ancianos de Éfeso"],
            ],
            apoyo: "Pablo llama ancianos a los líderes de Éfeso y les dice que el Espíritu Santo los puso por obispos para apacentar la iglesia",
            ref: "Hechos 20:17, 28",
            explica: "Jesús es el buen pastor que da su vida por las ovejas; Pedro, que también era anciano, pidió apacentar la grey de Dios; y Pablo llamó ancianos a los líderes de Éfeso, a quienes el Espíritu Santo puso por obispos para apacentar la iglesia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es una señal del llamado pastoral o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Es una señal del llamado", "No es una señal del llamado"],
            frases: [
              { texto: "Un deseo, dado por Dios, de servir a su pueblo", grupo: 0 },
              { texto: "Un carácter probado, lo primero que pide la Palabra", grupo: 0 },
              { texto: "Dones que se ven al servir: enseñar, cuidar, guiar", grupo: 0 },
              { texto: "La confirmación de la iglesia, que ve el fruto", grupo: 0 },
              { texto: "Un amor por las personas que resiste la ingratitud", grupo: 0 },
              { texto: "Las ganas de tener el título de pastor", grupo: 1, explica: "El deseo que viene de Dios es servir a su pueblo, no buscar un título." },
              { texto: "Un amor que se apaga con el primer cansancio", grupo: 1, explica: "El amor del llamado resiste el cansancio y la ingratitud." },
              { texto: "Sentirse llamado, aunque nadie vea fruto en su servicio", grupo: 1, explica: "La iglesia y sus líderes confirman el llamado cuando ven el fruto." },
            ],
            apoyo: "el llamado se reconoce por un deseo dado por Dios, un carácter probado, dones visibles y la confirmación de la iglesia",
            ref: "1 Timoteo 3:1-7",
            explica: "El llamado se reconoce por un deseo dado por Dios de servir a su pueblo, un carácter probado, dones que se ven en el servicio, la confirmación de la iglesia y un amor que resiste el cansancio y la ingratitud. Buscar un título no es una señal del llamado.",
          },
          {
            consigna: "¿Muestra un llamado de Dios o el deseo de un puesto? Lleva cada frase a su grupo.",
            grupos: ["Muestra un llamado de Dios", "Muestra el deseo de un puesto"],
            frases: [
              { texto: "Quiere servir al pueblo de Dios", grupo: 0 },
              { texto: "Enseña, cuida y guía, y se nota en su servicio", grupo: 0 },
              { texto: "Sus líderes ven el fruto y lo confirman", grupo: 0 },
              { texto: "Sigue amando a la gente aunque esté cansado", grupo: 0 },
              { texto: "Lo que más quiere es el título de pastor", grupo: 1 },
              { texto: "Piensa que la grey será suya cuando la dirija", grupo: 1, explica: "La grey es de Dios, no del pastor." },
              { texto: "Serviría por fuerza, y no voluntariamente", grupo: 1, explica: "Pedro pide cuidar la grey «no por fuerza, sino voluntariamente»." },
            ],
            apoyo: "Un deseo que viene de Dios: servir a su pueblo, no buscar un título",
            ref: "1 Timoteo 3:1",
            explica: "Un llamado de Dios se ve en el deseo de servir a su pueblo, en dones que se ven en el servicio, en la confirmación de los líderes y en un amor que resiste el cansancio. Buscar un título, creer que la grey es suya o servir por fuerza muestran el deseo de un puesto.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "el llamado se reconoce por un deseo dado por Dios, un carácter probado, dones visibles y la confirmación de la iglesia",
            ref: "1 Timoteo 3:1-7",
            titulo: "Siento que Dios me llama",
            relato: [
              "Eres el pastor de una iglesia y formas a un grupo de líderes. Daniel dirige una célula desde hace dos años.",
              "Un día te dice: Siento que Dios me llama a ser pastor. ¿Cómo sé si de verdad es un llamado?",
              "Antes de responderle, repasas cómo se reconoce un llamado al ministerio pastoral.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le preguntas primero sobre su deseo?",
                opciones: [
                  { texto: "Si lo que desea es servir al pueblo de Dios o tener un título.", bien: true, explica: "Un deseo que viene de Dios busca servir a su pueblo, no buscar un título." },
                  { texto: "Si siente una emoción muy fuerte cada vez que piensa en predicar.", explica: "La señal no es una emoción por predicar: es un deseo que viene de Dios de servir a su pueblo." },
                  { texto: "Si cree que ya se ganó un puesto por sus dos años de servicio.", explica: "El pastorado es un servicio y no un puesto: el deseo que viene de Dios es servir, no buscar un título." },
                ],
                apoyo: "Un deseo que viene de Dios: servir a su pueblo, no buscar un título",
                ref: "1 Timoteo 3:1",
                explica: "La primera señal es un deseo que viene de Dios: servir a su pueblo, no buscar un título.",
              },
              {
                tipo: "situacion",
                pregunta: "Según la lección, ¿qué es lo primero que pide la Palabra?",
                opciones: [
                  { texto: "Un carácter probado en su vida.", bien: true, explica: "Un carácter probado es lo primero que pide la Palabra." },
                  { texto: "Que predique muy bien desde el primer día.", explica: "Los dones se ven en el servicio, pero lo primero que pide la Palabra es un carácter probado." },
                  { texto: "Que tenga muchas personas en su célula.", explica: "Lo primero que pide la Palabra no es el número de personas: es un carácter probado." },
                ],
                apoyo: "Un carácter probado, que es lo primero que pide la Palabra",
                ref: "1 Timoteo 3:2-7",
                explica: "Un carácter probado es lo primero que pide la Palabra a quien desea cuidar el rebaño.",
              },
              {
                tipo: "situacion",
                pregunta: "Daniel te pregunta quién debe confirmar su llamado. ¿Qué le respondes?",
                opciones: [
                  { texto: "La iglesia y sus líderes, que ven el fruto de su servicio.", bien: true, explica: "La confirmación viene de la iglesia y de sus líderes, que ven el fruto." },
                  { texto: "Solo él mismo, porque nadie más sabe lo que Dios le dijo a él.", explica: "El llamado se confirma: la iglesia y sus líderes ven el fruto." },
                  { texto: "Nadie: si de verdad lo llamó Dios, no hace falta que lo confirmen.", explica: "Entre las señales del llamado está la confirmación de la iglesia y de sus líderes." },
                ],
                apoyo: "La confirmación de la iglesia y de sus líderes, que ven el fruto",
                ref: "Hechos 13:2-3",
                explica: "El llamado se reconoce también por la confirmación de la iglesia y de sus líderes, que ven el fruto.",
              },
              {
                tipo: "explica",
                apoyo: "Dones que se ven en el servicio: enseñar, cuidar, guiar",
                clave: {
                  id: "pr-n5-teologia-pastoral-1-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué señales del llamado le pedirás a Daniel que observe en su vida y en su servicio?",
                  ideas: [
                    { id: "deseo", peso: 30, texto: "Un deseo que viene de Dios: servir a su pueblo, no buscar un título.", formas: ["servir a (su|el|al|ese) pueblo", "servir al pueblo", "deseo de servir", "(quiere|quiera|querer|desea|desee) servir", "(no|ni) (busc*|un|el) titulo", "deseo que viene de dios", "deseo dado por dios"] },
                    { id: "caracter", peso: 30, texto: "Un carácter probado, que es lo primero que pide la Palabra.", formas: ["caracter"] },
                    { id: "dones", peso: 40, texto: "Dones que se ven en el servicio, como enseñar, cuidar y guiar, y un amor que resiste el cansancio y la ingratitud.", formas: ["dones", "(ensenar|ensena|ensene) (cuidar|cuida|cuide)", "cuidar y guiar", "guiar", "resist* cansancio", "ingratitud"] },
                  ],
                  modelo: "Le pediré que mire si su deseo es servir al pueblo de Dios y no buscar un título, si tiene un carácter probado, y si en su servicio se ven dones como enseñar, cuidar y guiar, con un amor que resiste el cansancio y la ingratitud.",
                },
              },
            ],
          },
          {
            apoyo: "Un amor por las personas que resiste el cansancio y la ingratitud",
            ref: "1 Timoteo 3:1-7",
            titulo: "Predica bien, pero…",
            relato: [
              "Enseñas en la academia de tu iglesia. Rubén es un alumno que predica muy bien, y muchos lo felicitan.",
              "Un día te dice: Ya estoy listo para ser pastor. Lo mío es el púlpito; visitar y aconsejar no es para mí.",
              "Sabes también que se enoja cuando las personas no le agradecen lo que hace por ellas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre los dones que se ven en el llamado?",
                opciones: [
                  { texto: "Que los dones se ven al servir: enseñar, y también cuidar y guiar.", bien: true, explica: "Los dones del llamado se ven en el servicio: enseñar, cuidar, guiar." },
                  { texto: "Que predicar bien ya es todo lo que se necesita para ser un pastor.", explica: "Los dones que se ven en el servicio son enseñar, cuidar y guiar; y lo primero que pide la Palabra es un carácter probado." },
                  { texto: "Que los dones no importan, porque lo que cuenta es lo que él siente.", explica: "Entre las señales del llamado están los dones que se ven en el servicio." },
                ],
                apoyo: "Dones que se ven en el servicio: enseñar, cuidar, guiar",
                explica: "El llamado se reconoce también por dones que se ven en el servicio: enseñar, cuidar, guiar. En la Biblia, el pastor es alguien que cuida ovejas.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué te preocupa al ver que se enoja cuando no le agradecen?",
                opciones: [
                  { texto: "Que el llamado trae un amor que resiste la ingratitud.", bien: true, explica: "Una señal del llamado es un amor por las personas que resiste el cansancio y la ingratitud." },
                  { texto: "Nada: es normal que un buen predicador espere que se lo agradezcan.", explica: "El amor del llamado resiste el cansancio y la ingratitud." },
                  { texto: "Que la iglesia todavía no sabe valorar a sus buenos predicadores.", explica: "El problema no está en la iglesia: el amor del llamado resiste la ingratitud." },
                ],
                apoyo: "Un amor por las personas que resiste el cansancio y la ingratitud",
                explica: "Un amor por las personas que resiste el cansancio y la ingratitud es una de las señales del llamado, y un carácter probado es lo primero que pide la Palabra.",
              },
              {
                tipo: "situacion",
                pregunta: "Rubén dice: Dios me habló a mí; la iglesia no tiene nada que confirmar. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que la iglesia y sus líderes confirman el llamado al ver el fruto.", bien: true, explica: "La confirmación de la iglesia y de sus líderes, que ven el fruto, es una de las señales del llamado." },
                  { texto: "Que tiene razón: si Dios le habló, no hace falta que nadie más lo vea.", explica: "El llamado se reconoce también por la confirmación de la iglesia y de sus líderes." },
                  { texto: "Que la confirmación de la iglesia llegará cuando ya tenga su iglesia.", explica: "La iglesia y sus líderes confirman el llamado cuando ven el fruto de su servicio, no después." },
                ],
                apoyo: "La confirmación de la iglesia y de sus líderes, que ven el fruto",
                ref: "Hechos 13:2-3",
                explica: "El llamado se reconoce por un deseo dado por Dios, un carácter probado, dones visibles y la confirmación de la iglesia, que ve el fruto.",
              },
              {
                tipo: "explica",
                apoyo: "el llamado se reconoce por un deseo dado por Dios, un carácter probado, dones visibles y la confirmación de la iglesia",
                clave: {
                  id: "pr-n5-teologia-pastoral-1-a4-2",
                  tipo: "corta",
                  pregunta: "Rubén te pregunta qué le falta para saber si de verdad es llamado. ¿Qué le respondes?",
                  ideas: [
                    { id: "caracter", peso: 35, texto: "Un carácter probado, que es lo primero que pide la Palabra.", formas: ["caracter"] },
                    { id: "dones", peso: 30, texto: "Dones que se ven en el servicio: enseñar, pero también cuidar y guiar, con un amor que resiste la ingratitud.", formas: ["dones", "cuidar y guiar", "guiar", "resist* (cansancio|ingratitud)", "ingratitud", "amor por (las|la) (personas|gente)"] },
                    { id: "confirmacion", peso: 35, texto: "La confirmación de la iglesia y de sus líderes, que ven el fruto.", formas: ["confirm*", "ven el fruto", "vea* (el|su) fruto"] },
                  ],
                  modelo: "Le respondo que lo primero que pide la Palabra es un carácter probado. También deben verse en su servicio dones como cuidar y guiar, con un amor que resiste la ingratitud, y la iglesia y sus líderes deben confirmar su llamado al ver el fruto.",
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
            consigna: "Pedro pide apacentar la grey de Dios. ¿De qué manera? Toca la palabra que lo dice.",
            texto: "cuidando de ella, no por fuerza, sino [[voluntariamente]]",
            apoyo: "Pedro, que también era anciano, pide: «Apacentad la grey de Dios que está entre vosotros, cuidando de ella, no por fuerza, sino voluntariamente»",
            ref: "1 Pedro 5:2",
            explica: "Pedro pide cuidar la grey de Dios «no por fuerza, sino voluntariamente»: el pastor cuida la grey voluntariamente y con ánimo pronto, como un servicio y no como un puesto.",
          },
          {
            consigna: "Según Pedro, ¿de quién es la grey que se apacienta? Toca las palabras que lo dicen.",
            texto: "Apacentad la grey [[de Dios]] que está entre vosotros",
            apoyo: "La grey es de Dios, no del pastor, y el que da la recompensa es Cristo",
            ref: "1 Pedro 5:2",
            explica: "Pedro pide apacentar «la grey de Dios»: la grey es de Dios, no del pastor, y el que da la recompensa es Cristo. Por eso el pastorado es un servicio y no un puesto.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un pastor de otra iglesia te dice: Yo levanté esta iglesia desde cero; estas ovejas son mías y aquí se hace lo que yo diga.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la grey es de Dios, no suya, y que Cristo da la recompensa.", bien: true, explica: "Pedro pide apacentar «la grey de Dios»: la grey es de Dios, no del pastor, y el que da la recompensa es Cristo." },
              { texto: "Que tiene razón: quien levanta una iglesia desde cero es su dueño.", explica: "La grey es de Dios, no del pastor, aunque él haya empezado la iglesia." },
              { texto: "Que las ovejas son de la iglesia, y que él es solo su empleado.", explica: "La grey es de Dios; y todo pastor es, ante todo, una oveja del rebaño de Cristo y un ayudante del Pastor verdadero." },
              { texto: "Que mientras la iglesia siga creciendo, da igual de quién sean.", explica: "Sí importa: la grey es de Dios, y el pastor la cuida bajo el Príncipe de los pastores." },
            ],
            apoyo: "La grey es de Dios, no del pastor, y el que da la recompensa es Cristo",
            ref: "1 Pedro 5:1-4",
            explica: "El pastor cuida una grey que es de Dios, voluntariamente y con ánimo pronto, bajo el Príncipe de los pastores: el pastorado es un servicio y no un puesto.",
          },
          {
            caso: "Un líder de células te dice: Quiero ser pastor para tener por fin un puesto con autoridad; ya me cansé de solo servir.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el pastorado es un servicio, y el llamado es un deseo de servir.", bien: true, explica: "El llamado es un deseo que viene de Dios: servir a su pueblo, no buscar un título." },
              { texto: "Que hace bien: el pastorado es el puesto más alto que hay en la iglesia.", explica: "En la Biblia, el pastor no es un ejecutivo: es alguien que cuida ovejas, y el pastorado es un servicio y no un puesto." },
              { texto: "Que primero consiga el puesto, y que después aprenda a servir a la gente.", explica: "El llamado empieza por un deseo que viene de Dios: servir a su pueblo, no buscar un título." },
              { texto: "Que si ya se cansó de servir, el pastorado le dará por fin descanso.", explica: "El llamado trae un amor por las personas que resiste el cansancio y la ingratitud." },
            ],
            apoyo: "Un deseo que viene de Dios: servir a su pueblo, no buscar un título",
            ref: "1 Timoteo 3:1",
            explica: "El pastorado es un servicio y no un puesto: el llamado es un deseo que viene de Dios de servir a su pueblo, con un amor que resiste el cansancio y la ingratitud.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El ministerio pastoral nace de Cristo, el buen pastor que da su vida por las ovejas",
            ref: "Juan 10:11",
            clave: {
              id: "pr-n5-teologia-pastoral-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué se dice que el ministerio pastoral nace de Cristo, el buen pastor?",
              ideas: [
                { id: "vida", peso: 40, texto: "Cristo es el buen pastor que da su vida por las ovejas.", formas: ["(da|dio|entrega|entrego|dar) su vida", "su vida (da|dio) por", "vida por (las|sus) ovejas", "murio por (las|sus) ovejas"] },
                { id: "oveja", peso: 30, texto: "Todo pastor es, ante todo, una oveja del rebaño de Cristo y un ayudante del Pastor verdadero.", formas: ["una oveja", "tambien (es|una) oveja", "oveja (de|del) (cristo|rebano)", "ayudante*", "pastor verdadero", "verdadero pastor"] },
                { id: "grey", peso: 30, negativa: true, texto: "El pastor cuida una grey que es de Dios, bajo el Príncipe de los pastores, que da la recompensa.", formas: ["grey (es|de) dios", "(grey|rebano|ovejas|iglesia) (es|son) de dios", "(grey|rebano|ovejas) que es de dios", "sino de dios", "no (es|son) (suya|suyas|suyo|propio|propia)", "principe de los pastores", "recompensa"] },
              ],
              errores: [
                { id: "duenio", texto: "La grey es de Dios, no del pastor.", formas: ["(grey|ovejas|iglesia) (es|son) (suya|suyas|mia|mias)", "(grey|ovejas|iglesia) (es|son) del pastor", "pastor es (el|su) dueno", "dueno de (la|las) (grey|ovejas|iglesia)"], anula: "grey" },
              ],
              modelo: "Porque Cristo es el buen pastor que da su vida por las ovejas. Todo pastor es, ante todo, una oveja de su rebaño y un ayudante del Pastor verdadero, y cuida una grey que es de Dios, bajo el Príncipe de los pastores.",
            },
          },
          {
            apoyo: "el pastor no es un ejecutivo ni un artista, sino alguien que cuida ovejas",
            ref: "Juan 10:11-14",
            clave: {
              id: "pr-n5-teologia-pastoral-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que el pastor es como el gerente de una empresa. ¿Qué le explicas, a partir de Cristo, el buen pastor?",
              ideas: [
                { id: "cuida", peso: 35, texto: "En la Biblia, el pastor no es un ejecutivo: es alguien que cuida ovejas; las conoce, las alimenta, las busca y las defiende.", formas: ["cuid* (ovejas|rebano)", "cuid* a las ovejas", "las conoce", "las alimenta", "las busca", "las defiende", "(conoce|alimenta|busca|defiende) a las ovejas"] },
                { id: "vida", peso: 35, texto: "Cristo es el buen pastor que da su vida por las ovejas.", formas: ["(da|dio|entrega|entrego|dar) su vida", "su vida (da|dio) por", "vida por (las|sus) ovejas", "murio por (las|sus) ovejas"] },
                { id: "ayudante", peso: 30, texto: "El pastor es una oveja del rebaño de Cristo y un ayudante del Pastor verdadero.", formas: ["una oveja", "tambien (es|una) oveja", "oveja (de|del) (cristo|rebano)", "ayudante*", "pastor verdadero", "verdadero pastor"] },
              ],
              errores: [
                { id: "ejecutivo", texto: "En la Biblia, el pastor no es un ejecutivo ni un artista, sino alguien que cuida ovejas.", formas: ["(es|como) un (ejecutivo|gerente|jefe|empresario)", "tiene razon"], anula: "cuida" },
              ],
              modelo: "Le explico que el pastor no es un gerente: Cristo es el buen pastor que da su vida por las ovejas, y el pastor es una oveja de su rebaño y un ayudante del Pastor verdadero, que cuida ovejas: las conoce, las alimenta, las busca y las defiende.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La vida del pastor con Dios
    "n5-teologia-pastoral-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué dijeron los apóstoles que persistirían?", reverso: "En la oración y en el ministerio de la palabra.", apoyo: "«Y nosotros persistiremos en la oración y en el ministerio de la palabra»" },
              { frente: "¿En qué se vuelve el ministerio sin oración y sin Palabra?", reverso: "En una actividad más.", apoyo: "Sin oración y sin Palabra, el ministerio se vuelve una actividad más" },
              { frente: "En medio de un ministerio lleno de gente, ¿a quién buscaba Jesús?", reverso: "Al Padre: muy de mañana se iba a un lugar desierto, y allí oraba.", apoyo: "Jesús, en medio de un ministerio lleno de gente, buscaba al Padre" },
              { frente: "¿Cuál es el primer rebaño que cuida el pastor?", reverso: "Su propia alma.", apoyo: "El primer rebaño que cuida es su propia alma" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pide Pablo a Timoteo en 1 Timoteo 4:16?", reverso: "«Ten cuidado de ti mismo y de la doctrina».", apoyo: "Pablo pide a Timoteo: «Ten cuidado de ti mismo y de la doctrina»" },
              { frente: "¿Qué no puede nadie dar a otros?", reverso: "Lo que no recibe primero de Dios.", apoyo: "Nadie puede dar a otros lo que no recibe primero de Dios" },
              { frente: "¿Qué es el profesionalismo en el ministerio?", reverso: "Predicar y orar por oficio, sin un corazón encendido.", apoyo: "El profesionalismo: predicar y orar por oficio, sin un corazón encendido" },
              { frente: "¿Qué necesita todo pastor que alguien le pregunte?", reverso: "Cómo está su vida con Dios, su matrimonio o su soltería, y su manejo del dinero.", apoyo: "Todo pastor necesita a alguien que le pregunte cómo está su vida con Dios, su matrimonio o su soltería, y su manejo del dinero" },
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
            consigna: "Los apóstoles definieron su prioridad. ¿En qué dos cosas persistirían? Toca las palabras que lo dicen.",
            texto: "Y nosotros persistiremos en [[la oración]] y en [[el ministerio de la palabra]]",
            apoyo: "Los apóstoles definieron su prioridad",
            ref: "Hechos 6:4",
            explica: "Los apóstoles persistieron en la oración y en el ministerio de la palabra: sin oración y sin Palabra, el ministerio se vuelve una actividad más.",
          },
          {
            consigna: "Jesús buscaba al Padre en medio de un ministerio lleno de gente. ¿Adónde se fue para orar? Toca las palabras que lo dicen.",
            texto: "Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a [[un lugar desierto]], y allí oraba",
            apoyo: "Jesús, en medio de un ministerio lleno de gente, buscaba al Padre",
            ref: "Marcos 1:35",
            explica: "Muy de mañana, siendo aún muy oscuro, Jesús se fue a un lugar desierto, y allí oraba: en medio de un ministerio lleno de gente, buscaba al Padre.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada peligro de un ministerio sin vida con Dios con lo que es.",
            pares: [
              ["El profesionalismo", "Predicar y orar por oficio, sin un corazón encendido"],
              ["El orgullo", "Creer que la obra depende de uno"],
              ["El aislamiento", "No tener a nadie a quien rendir cuentas"],
              ["La doble vida", "Enseñar la santidad sin vivirla"],
            ],
            apoyo: "Debe cuidarse del profesionalismo, del orgullo, del aislamiento y de la doble vida",
            explica: "El profesionalismo es predicar y orar por oficio, sin un corazón encendido; el orgullo, creer que la obra depende de uno; el aislamiento, no tener a nadie a quien rendir cuentas; y la doble vida, enseñar la santidad sin vivirla.",
          },
          {
            consigna: "¿Qué peligro muestra cada ejemplo? Une cada ejemplo con su peligro.",
            pares: [
              ["Predica cada domingo, pero ya sin un corazón encendido", "El profesionalismo"],
              ["Piensa que, si él falta, la obra se cae", "El orgullo"],
              ["Nadie le pregunta cómo está su vida con Dios", "El aislamiento"],
              ["Enseña la santidad, pero no la vive en su casa", "La doble vida"],
            ],
            apoyo: "El aislamiento: no tener a nadie a quien rendir cuentas",
            explica: "Predicar sin un corazón encendido es profesionalismo; creer que la obra depende de uno es orgullo; no tener a nadie a quien rendir cuentas es aislamiento; y enseñar la santidad sin vivirla es doble vida.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El pastor necesita un día de descanso, tiempo con su familia y amigos con quienes ser él mismo",
            ref: "Marcos 6:31",
            situacion: "Eres pastor de una iglesia que crece. Hace dos meses que no tomas un día libre, y ya casi no oras a solas.",
            escenas: [
              {
                id: "e1",
                narra: "El domingo en la noche te das cuenta de que estás agotado.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Apartar un día de descanso cada semana, en tu agenda.", valor: 2, explica: "El pastor necesita un día de descanso: Jesús también llamó a sus discípulos a descansar un poco.", siguiente: "e2" },
                  { texto: "Tomar un día libre este mes, y después ver si lo repites.", valor: 1, explica: "Descansar está bien, pero el pastor necesita un día de descanso como hábito, no de vez en cuando.", siguiente: "e2" },
                  { texto: "Trabajar más horas, porque un pastor de verdad nunca descansa.", valor: 0, explica: "Descansar también es obedecer: Jesús les dijo a sus discípulos «descansad un poco».", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "A las tres semanas te sientes peor, y tu familia casi no te ve.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Apartas un día de descanso y tiempo con tu familia.", valor: 2, explica: "El pastor necesita un día de descanso y tiempo con su familia.", siguiente: "e2" },
                  { texto: "Sigues igual: ya descansarás cuando la iglesia sea más grande.", valor: 0, explica: "Descansar también es obedecer, y el pastor necesita tiempo con su familia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Un líder te dice: Si usted descansa un día, la iglesia se va a caer.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la obra no depende de mí, y que descansar es obedecer.", valor: 2, explica: "Creer que la obra depende de uno es el peligro del orgullo, y Jesús también llamó a sus discípulos a descansar un poco." },
                  { texto: "Que descansarás, pero que ese día vas a contestar todas las llamadas.", valor: 1, explica: "Descansar está bien, pero Jesús llamó a los suyos aparte, a un lugar desierto, a descansar un poco." },
                  { texto: "Que tiene razón, y que dejarás el descanso para cuando haya otro pastor.", valor: 0, explica: "Creer que la obra depende de uno es el peligro del orgullo." },
                ],
              },
              {
                id: "e3",
                narra: "En tu día libre notas que no tienes con quién hablar de ti mismo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Buscas amigos con quienes ser tú mismo.", valor: 2, explica: "El pastor necesita amigos con quienes ser él mismo." },
                  { texto: "Pasas el día solo, en silencio, sin buscar a nadie.", valor: 1, explica: "Descansar a solas está bien, pero el pastor también necesita amigos con quienes ser él mismo." },
                  { texto: "Usas el día para preparar más sermones, ya que nadie te busca.", valor: 0, explica: "Ese día es para descansar: el pastor necesita un día de descanso, tiempo con su familia y amigos con quienes ser él mismo." },
                ],
              },
            ],
          },
          {
            apoyo: "Descansar también es obedecer",
            ref: "Marcos 6:31",
            situacion: "Eres el pastor principal y formas a Josué, un pastor asistente que lleva un año sirviendo todos los días, sin tomar ni un día libre.",
            escenas: [
              {
                id: "e1",
                narra: "Josué llega a la reunión del equipo cansado e irritable.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con él a solas y le preguntas cómo está su vida con Dios.", valor: 2, explica: "Todo pastor necesita a alguien que le pregunte cómo está su vida con Dios y que pueda decirle la verdad." },
                  { texto: "Le dices delante de todo el equipo que debería descansar más.", valor: 1, explica: "Decirle que descanse está bien, pero también necesita a alguien que le pregunte cómo está su vida con Dios." },
                  { texto: "Lo felicitas delante del equipo, porque es el que más horas trabaja.", valor: 0, explica: "Descansar también es obedecer: Jesús llamó a sus discípulos cansados a descansar un poco." },
                ],
              },
              {
                id: "e2",
                narra: "Josué te dice: Si yo descanso, nadie va a hacer lo que yo hago.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la obra no depende de él, y que descansar es obedecer.", valor: 2, explica: "Creer que la obra depende de uno es el peligro del orgullo, y descansar también es obedecer." },
                  { texto: "Que descanse un día, pero que ese día siga revisando su teléfono.", valor: 1, explica: "Un día libre ayuda, pero Jesús llamó a los suyos aparte, a un lugar desierto, a descansar un poco." },
                  { texto: "Que tiene razón, y que siga así hasta que encuentren a otro pastor.", valor: 0, explica: "Creer que la obra depende de uno es el peligro del orgullo." },
                ],
              },
              {
                id: "e3",
                narra: "Josué acepta tomar un día libre cada semana.",
                pregunta: "¿Qué le aconsejas para ese día?",
                opciones: [
                  { texto: "Que lo pase con su familia y con amigos con quienes ser él mismo.", valor: 2, explica: "El pastor necesita un día de descanso, tiempo con su familia y amigos con quienes ser él mismo." },
                  { texto: "Que duerma todo el día, para recuperar todas las fuerzas que perdió.", valor: 1, explica: "Dormir ayuda, pero el pastor también necesita tiempo con su familia y amigos con quienes ser él mismo." },
                  { texto: "Que lo use para adelantar el trabajo que le quedó pendiente de la semana.", valor: 0, explica: "Ese día es para descansar: descansar también es obedecer." },
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
            consigna: "Completa lo que necesita el pastor, según la lección.",
            texto: "El pastor necesita un día de [[descanso]], tiempo con su [[familia]] y [[amigos]] con quienes ser él mismo.",
            distractores: ["trabajo", "agenda", "rivales"],
            errores: {
              trabajo: "El pastor necesita un día de descanso: Jesús también llamó a sus discípulos a descansar un poco.",
              agenda: "El pastor necesita tiempo con su familia.",
              rivales: "El pastor necesita amigos con quienes ser él mismo.",
            },
            apoyo: "El pastor necesita un día de descanso, tiempo con su familia y amigos con quienes ser él mismo",
            ref: "Marcos 6:31",
            explica: "Descansar también es obedecer: el pastor necesita un día de descanso, tiempo con su familia y amigos con quienes ser él mismo.",
          },
          {
            consigna: "Completa lo que enseña la lección con Marcos 6:31.",
            texto: "Descansar también es [[obedecer]]: cuando los apóstoles volvieron [[cansados]], Jesús los llamó aparte a un lugar [[desierto]].",
            distractores: ["pecar", "enojados", "poblado"],
            errores: {
              pecar: "Descansar también es obedecer: Jesús mismo llamó a sus discípulos a descansar un poco.",
              enojados: "Los apóstoles volvieron cansados, y Jesús los llamó a descansar un poco.",
              poblado: "Jesús los llamó aparte, a un lugar desierto.",
            },
            apoyo: "Cuando los apóstoles volvieron cansados, Jesús les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco»",
            ref: "Marcos 6:31",
            explica: "Descansar también es obedecer: cuando los apóstoles volvieron cansados, Jesús les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los peligros de un ministerio sin vida con Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Predicar y orar por oficio, sin un corazón encendido, es el peligro del profesionalismo.", verdad: true, explica: "Así lo llama la lección: el profesionalismo es predicar y orar por oficio, sin un corazón encendido.", apoyo: "El profesionalismo: predicar y orar por oficio, sin un corazón encendido" },
              { texto: "Enseñar la santidad sin vivirla es el peligro del aislamiento.", verdad: false, explica: "Enseñar la santidad sin vivirla es la doble vida; el aislamiento es no tener a nadie a quien rendir cuentas.", apoyo: "La doble vida: enseñar la santidad sin vivirla" },
              { texto: "El orgullo es creer que la obra depende de uno.", verdad: true, explica: "Es uno de los peligros de un ministerio sin vida con Dios.", apoyo: "El orgullo: creer que la obra depende de uno" },
            ],
          },
          {
            consigna: "Sobre la vida con Dios del pastor: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Un pastor con muchos años de experiencia ya no necesita rendir cuentas a nadie.", verdad: false, explica: "Todo pastor necesita a alguien que le pregunte cómo está su vida con Dios y que pueda decirle la verdad.", apoyo: "Todo pastor necesita a alguien que le pregunte cómo está su vida con Dios" },
              { texto: "Según Pablo, primero va la propia vida y después la enseñanza.", verdad: true, explica: "Pablo pide a Timoteo: «Ten cuidado de ti mismo y de la doctrina». El orden es importante.", apoyo: "El orden es importante: primero la propia vida, después la enseñanza", ref: "1 Timoteo 4:16" },
              { texto: "Sin oración y sin Palabra, el ministerio sigue igual de fuerte.", verdad: false, explica: "Sin oración y sin Palabra, el ministerio se vuelve una actividad más.", apoyo: "Sin oración y sin Palabra, el ministerio se vuelve una actividad más" },
              { texto: "El aislamiento es no tener a nadie a quien rendir cuentas.", verdad: true, explica: "Es uno de los peligros, y por eso todo pastor necesita a alguien que pueda decirle la verdad.", apoyo: "El aislamiento: no tener a nadie a quien rendir cuentas" },
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
            apoyo: "La primera tarea del pastor es cuidar su propia vida con Dios",
            ref: "Hechos 6:4",
            clave: {
              id: "pr-n5-teologia-pastoral-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué vida con Dios necesita el pastor, según lo que hicieron los apóstoles y Jesús, y lo que Pablo pidió a Timoteo?",
              ideas: [
                { id: "apostoles", peso: 35, texto: "Perseverar en la oración y en el ministerio de la palabra, como los apóstoles.", formas: ["oracion", "orar", "persist*", "persever*", "ministerio de la palabra"] },
                { id: "jesus", peso: 30, texto: "Buscar al Padre, como Jesús, que muy de mañana se iba a un lugar desierto a orar.", formas: ["busc* al padre", "busc* a dios", "lugar desierto", "a solas", "muy de manana", "madrug*", "temprano"] },
                { id: "santidad", peso: 35, texto: "Vivir en santidad: tener cuidado de sí mismo y de la doctrina, primero la propia vida y después la enseñanza.", formas: ["santidad", "cuidado de (si|ti) mismo", "propia vida", "primero (la|su|mi) vida", "(vivir|vive|viva) lo que (ensena|predica)"] },
              ],
              modelo: "Necesita perseverar en la oración y en el ministerio de la palabra, como los apóstoles, y buscar al Padre a solas, como Jesús. Y debe vivir en santidad: tener cuidado de sí mismo y de la doctrina, primero su propia vida y después la enseñanza.",
            },
          },
          {
            apoyo: "Nadie puede dar a otros lo que no recibe primero de Dios",
            ref: "1 Timoteo 4:16",
            clave: {
              id: "pr-n5-teologia-pastoral-2-a7-2",
              tipo: "corta",
              pregunta: "Un pastor asistente te dice: Estoy tan ocupado con la iglesia que ya no oro ni leo la Biblia para mí. ¿Qué le dices?",
              ideas: [
                { id: "recibe", peso: 30, negativa: true, texto: "Que nadie puede dar a otros lo que no recibe primero de Dios: el primer rebaño que cuida es su propia alma.", formas: ["lo que no (recibe|recibes|recibimos)", "recib* de dios", "primer rebano", "propia alma"] },
                { id: "volver", peso: 40, texto: "Que vuelva a perseverar en la oración y en la Palabra, como los apóstoles, y a buscar al Padre, como Jesús.", formas: ["vuelv* a (orar|leer)", "volver a (orar|leer)", "persist*", "persever*", "busc* al padre", "orar (cada|todos) (dia|dias|manana)", "orar a solas", "(lea|leer|leas) (la|su) (biblia|palabra)"] },
                { id: "peligro", peso: 30, texto: "Que sin oración y sin Palabra el ministerio se vuelve una actividad más: es el peligro del profesionalismo.", formas: ["actividad mas", "una actividad", "profesional*", "por oficio", "corazon encendido", "olvid* (de|del) dios"] },
              ],
              modelo: "Le digo que nadie puede dar a otros lo que no recibe primero de Dios. Sin oración y sin Palabra, el ministerio se vuelve una actividad más. Debe volver a orar y a leer la Biblia, como los apóstoles, y buscar al Padre, como Jesús.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. El pastor y su familia
    "n5-teologia-pastoral-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué muestra la forma en que alguien cuida a los suyos?", reverso: "Cómo cuidará a la iglesia.", apoyo: "La forma en que alguien cuida a los suyos muestra cómo cuidará a la iglesia" },
              { frente: "¿Por qué muchos hijos de pastores aman la iglesia?", reverso: "Porque vieron a sus padres vivir lo que predicaban.", apoyo: "Muchos hijos de pastores aman la iglesia porque vieron a sus padres vivir lo que predicaban" },
              { frente: "¿Por qué otros hijos de pastores se alejaron?", reverso: "Porque la iglesia siempre fue primero.", apoyo: "Otros se alejaron porque la iglesia siempre fue primero" },
              { frente: "¿Dónde empieza el servicio a Dios?", reverso: "En casa.", apoyo: "El servicio a Dios empieza en casa" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dijo Josué delante de todo el pueblo?", reverso: "«pero yo y mi casa serviremos a Jehová».", apoyo: "Josué lo dijo así delante de todo el pueblo: «pero yo y mi casa serviremos a Jehová»" },
              { frente: "¿Qué es tu familia para tu ministerio?", reverso: "No es un obstáculo: es tu primer ministerio.", apoyo: "Tu familia no es un obstáculo para el ministerio: es tu primer ministerio" },
              { frente: "¿Qué necesita también el que sirve soltero?", reverso: "Un hogar sano: amistades cercanas, descanso y personas que lo cuiden.", apoyo: "El que sirve soltero también necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden" },
              { frente: "¿Es la soltería un ministerio de segunda clase?", reverso: "No: la soltería no es un ministerio de segunda clase.", apoyo: "La soltería no es un ministerio de segunda clase" },
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
            consigna: "Completa por qué el hogar es el primer lugar del ministerio.",
            texto: "El modo en que alguien trata a los [[suyos]] [[muestra]] cómo cuidará a la [[iglesia]].",
            distractores: ["vecinos", "esconde", "empresa"],
            errores: {
              vecinos: "Se habla de los suyos, de su propia casa: el que no sabe gobernar su propia casa no podrá cuidar la iglesia de Dios.",
              esconde: "La forma en que alguien cuida a los suyos muestra cómo cuidará a la iglesia.",
              empresa: "Pablo habla de cuidar la iglesia de Dios.",
            },
            apoyo: "La forma en que alguien cuida a los suyos muestra cómo cuidará a la iglesia",
            ref: "1 Timoteo 3:4-5",
            explica: "Pablo pregunta: «pues el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?». La forma en que alguien cuida a los suyos muestra cómo cuidará a la iglesia.",
          },
          {
            consigna: "Completa lo que pasa con los hijos de los pastores.",
            texto: "Muchos hijos de pastores aman la iglesia porque vieron a sus padres [[vivir]] lo que predicaban; otros se [[alejaron]] porque la iglesia siempre fue [[primero]].",
            distractores: ["ocultar", "quedaron", "última"],
            errores: {
              ocultar: "Muchos hijos de pastores aman la iglesia porque vieron a sus padres vivir lo que predicaban.",
              quedaron: "Otros hijos se alejaron porque la iglesia siempre fue primero.",
              "última": "Se alejaron porque la iglesia siempre fue primero: el hogar también es ministerio.",
            },
            apoyo: "Muchos hijos de pastores aman la iglesia porque vieron a sus padres vivir lo que predicaban",
            explica: "Muchos hijos de pastores aman la iglesia porque vieron a sus padres vivir lo que predicaban; otros se alejaron porque la iglesia siempre fue primero. El hogar también es ministerio.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Protege el hogar del que sirve o lo descuida? Lleva cada frase a su grupo.",
            grupos: ["Protege el hogar", "Descuida el hogar"],
            frases: [
              { texto: "Guardar en la agenda tiempo con el cónyuge y los hijos", grupo: 0 },
              { texto: "Orar y leer la Biblia en familia", grupo: 0 },
              { texto: "Dejar que los hijos sean niños", grupo: 0 },
              { texto: "Proteger la intimidad de la casa", grupo: 0 },
              { texto: "Tener la casa abierta como una oficina todo el día", grupo: 1 },
              { texto: "Contar en la cena los problemas de la consejería", grupo: 1 },
              { texto: "Exigir a los hijos ser ejemplo de toda la iglesia", grupo: 1 },
            ],
            apoyo: "El pastor protege el tiempo y la intimidad de su familia, no la carga con lo que se confía en la consejería y deja que sus hijos sean niños",
            ref: "1 Timoteo 3:4-5",
            explica: "Se protege el hogar con tiempo de calidad en la agenda, la intimidad de la casa, la oración y la Biblia en familia y dejando que los hijos sean niños; se descuida al hacer de la casa una oficina, al cargar a la familia con la consejería o al exigir a los hijos ser ejemplo de toda la iglesia.",
          },
          {
            consigna: "¿Así se cuida el hogar del que sirve o así se descuida? Lleva cada frase a su grupo.",
            grupos: ["Así se cuida el hogar", "Así se descuida el hogar"],
            frases: [
              { texto: "Anotar en la agenda una salida semanal con su cónyuge", grupo: 0 },
              { texto: "Leer la Biblia y orar con sus hijos", grupo: 0 },
              { texto: "Dejar que su hijo juegue y se equivoque como un niño", grupo: 0 },
              { texto: "Recibir en casa a cualquiera, a cualquier hora", grupo: 1, explica: "La casa del pastor no es una oficina abierta todo el día." },
              { texto: "Pedir a su hija que sea la más santa de la iglesia", grupo: 1, explica: "Se deja que los hijos sean niños, sin exigirles ser ejemplo de toda la iglesia." },
              { texto: "Contarle a su familia lo que le confió un hermano", grupo: 1, explica: "No se carga a la familia con los problemas que se confían en la consejería." },
              { texto: "Faltar siempre a la cena por las reuniones de la iglesia", grupo: 1, explica: "Muchos hijos se alejaron porque la iglesia siempre fue primero." },
            ],
            apoyo: "Tiempo de calidad con el cónyuge y con los hijos, protegido en la agenda",
            explica: "El hogar se cuida con tiempo de calidad protegido en la agenda, orando y leyendo la Biblia en familia y dejando que los hijos sean niños; se descuida al abrir la casa a toda hora, al exigir a los hijos ser ejemplo de toda la iglesia, al contar lo de la consejería o al poner siempre primero la iglesia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El pastor protege el tiempo y la intimidad de su familia, no la carga con lo que se confía en la consejería y deja que sus hijos sean niños",
            ref: "1 Timoteo 3:4-5",
            titulo: "Papá, nunca estás",
            relato: [
              "Eres pastor desde hace cinco años. La iglesia creció, y tu casa se llenó de reuniones, llamadas y visitas a cualquier hora.",
              "Una noche tu hijo de doce años te dice: Papá, nunca estás. Y cuando estás, hablas por teléfono con los hermanos.",
              "Tu esposa añade que en la cena casi siempre hablan de los problemas que te cuentan en la consejería.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué cambias primero en tu agenda?",
                opciones: [
                  { texto: "Apartas tiempo de calidad con tu esposa y tus hijos, y lo proteges.", bien: true, explica: "Tiempo de calidad con el cónyuge y con los hijos, protegido en la agenda: tu familia es tu primer ministerio." },
                  { texto: "Nada: tu familia tiene que entender que la iglesia siempre va primero.", explica: "Muchos hijos de pastores se alejaron porque la iglesia siempre fue primero." },
                  { texto: "Les das a ellos el tiempo que te sobre al final de cada semana de trabajo.", explica: "El tiempo con la familia se protege en la agenda: no es el que sobra." },
                ],
                apoyo: "Tiempo de calidad con el cónyuge y con los hijos, protegido en la agenda",
                explica: "Tu familia no es un obstáculo para el ministerio: es tu primer ministerio. Su tiempo se protege en la agenda.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con las reuniones y visitas a cualquier hora en tu casa?",
                opciones: [
                  { texto: "Proteges la intimidad del hogar: tu casa no es una oficina.", bien: true, explica: "La casa del pastor no es una oficina abierta todo el día." },
                  { texto: "Las sigues recibiendo, porque un pastor debe estar siempre disponible.", explica: "Proteger la intimidad del hogar es parte de cuidarlo: la casa del pastor no es una oficina abierta todo el día." },
                  { texto: "Cierras tu casa del todo y ya no recibes nunca a nadie en ella.", explica: "Abrir la casa con equilibrio, para una comida o una visita, enseña más que muchos sermones." },
                ],
                apoyo: "Proteger la intimidad del hogar: la casa del pastor no es una oficina abierta todo el día",
                explica: "Se protege la intimidad del hogar, y la casa se abre con hospitalidad, pero con límites sanos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con lo que te cuentan los hermanos en la consejería?",
                opciones: [
                  { texto: "No cargas a tu familia con lo que te confían en la consejería.", bien: true, explica: "No se carga a la familia con los problemas que se confían en la consejería." },
                  { texto: "Lo cuentas en la cena, para que toda tu familia ore por cada hermano.", explica: "No se carga a la familia con los problemas que se confían en la consejería." },
                  { texto: "Se lo cuentas solo a tu esposa, porque ella es una persona de confianza.", explica: "Tu esposa también es tu familia: no se la carga con los problemas que se confían en la consejería." },
                ],
                apoyo: "No cargar a la familia con los problemas que se confían en la consejería",
                explica: "El pastor protege a su familia: no la carga con lo que se confía en la consejería.",
              },
              {
                tipo: "explica",
                apoyo: "El hogar es el primer lugar del ministerio",
                clave: {
                  id: "pr-n5-teologia-pastoral-3-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe qué cambios harás para cuidar tu hogar, y por qué tu familia es tu primer ministerio.",
                  ideas: [
                    { id: "tiempo", peso: 35, texto: "Apartar en la agenda tiempo de calidad con la esposa y los hijos, y protegerlo.", formas: ["tiempo de calidad", "tiempo con (mi|su|tu) (familia|esposa|hijo|hijos)", "agenda", "(apart*|separ*|reserv*|proteg*) tiempo"] },
                    { id: "intimidad", peso: 30, negativa: true, texto: "Proteger la intimidad del hogar y no cargar a la familia con lo que se confía en la consejería.", formas: ["intimidad", "oficina", "(no|sin) (cargar|cargare|cargo|contar|contare|cuento|hablar|hablare)", "consejeria"] },
                    { id: "primer", peso: 35, negativa: true, texto: "Porque el hogar es el primer lugar del ministerio: quien no cuida su propia casa no podrá cuidar la iglesia de Dios.", formas: ["primer ministerio", "primer lugar", "propia casa", "los suyos", "empieza en (casa|hogar)"] },
                  ],
                  modelo: "Apartaré en mi agenda tiempo de calidad con mi esposa y mis hijos, y lo protegeré. Cuidaré la intimidad de mi casa y no cargaré a mi familia con la consejería. Mi familia es mi primer ministerio: quien no cuida su propia casa no podrá cuidar la iglesia.",
                },
              },
            ],
          },
          {
            apoyo: "El que sirve soltero también necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden",
            ref: "1 Corintios 7:32-35",
            titulo: "Un pastor asistente sin casarse",
            relato: [
              "Eres el pastor principal y formas a Tomás, un pastor asistente soltero. Sirve con mucho amor y siempre está disponible.",
              "Un día te confiesa: No tengo amigos cercanos, casi nunca descanso y siento que, por no casarme, soy un siervo de segunda.",
              "Además, varios hermanos lo llaman a cualquier hora, y su casa está abierta todo el día.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre su soltería?",
                opciones: [
                  { texto: "Que la soltería no es un ministerio de segunda clase.", bien: true, explica: "La soltería no es un ministerio de segunda clase (1 Corintios 7:32-35)." },
                  { texto: "Que tiene razón: un pastor soltero vale menos que uno casado.", explica: "La soltería no es un ministerio de segunda clase." },
                  { texto: "Que se case pronto, para que por fin su ministerio sea completo.", explica: "Su ministerio no está incompleto: la soltería no es un ministerio de segunda clase." },
                ],
                apoyo: "La soltería no es un ministerio de segunda clase",
                ref: "1 Corintios 7:32-35",
                explica: "El que sirve soltero no es un siervo de segunda: la soltería no es un ministerio de segunda clase.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué necesita Tomás para tener un hogar sano?",
                opciones: [
                  { texto: "Amistades cercanas, descanso y personas que lo cuiden.", bien: true, explica: "El que sirve soltero también necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden." },
                  { texto: "Más trabajo en la iglesia, para que así ya no se sienta tan solo.", explica: "Lo que necesita es un hogar sano: amistades cercanas, descanso y personas que lo cuiden." },
                  { texto: "Nada: el que sirve soltero no necesita que nadie más lo cuide.", explica: "El que sirve soltero también necesita personas que lo cuiden." },
                ],
                apoyo: "El que sirve soltero también necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden",
                explica: "El que sirve soltero también necesita cuidado: amistades cercanas, descanso y personas que lo cuiden.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas sobre las llamadas y visitas a cualquier hora?",
                opciones: [
                  { texto: "Que proteja la intimidad de su casa: no es una oficina.", bien: true, explica: "La casa del pastor no es una oficina abierta todo el día." },
                  { texto: "Que siga así, porque un siervo debe estar disponible a toda hora.", explica: "Proteger la intimidad del hogar es parte de cuidarlo: la casa del pastor no es una oficina abierta todo el día." },
                  { texto: "Que no reciba nunca más a nadie en su casa, para poder descansar.", explica: "La casa se abre con hospitalidad, pero con límites sanos." },
                ],
                apoyo: "la casa del pastor no es una oficina abierta todo el día",
                explica: "Su casa se abre con hospitalidad, pero con límites sanos: protege su intimidad.",
              },
              {
                tipo: "explica",
                apoyo: "el que sirve soltero también necesita cuidado",
                clave: {
                  id: "pr-n5-teologia-pastoral-3-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dices a Tomás para que cuide su vida y su hogar?",
                  ideas: [
                    { id: "soltero", peso: 30, negativa: true, texto: "Que la soltería no es un ministerio de segunda clase.", formas: ["segunda clase", "de segunda", "(no|nada) (vale|valga) menos"] },
                    { id: "sano", peso: 40, texto: "Que necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden.", formas: ["hogar sano", "amistades", "amigos", "descans*", "personas que (lo|te) cuiden", "(lo|te) cuiden"] },
                    { id: "intimidad", peso: 30, negativa: true, texto: "Que proteja la intimidad de su casa: no es una oficina abierta todo el día.", formas: ["intimidad", "oficina", "limites", "limite"] },
                  ],
                  errores: [
                    { id: "de-segunda", texto: "La soltería no es un ministerio de segunda clase.", formas: ["tiene razon", "tienes razon", "(es|eres|sea|seria) de segunda", "vale menos"], anula: "soltero" },
                  ],
                  modelo: "Le digo que la soltería no es un ministerio de segunda clase. Necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden. Y debe proteger la intimidad de su casa, porque no es una oficina abierta todo el día.",
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
            caso: "Un matrimonio que llegó hace poco a la iglesia te dice: Aquí todavía no conocemos a nadie, y nos sentimos solos.",
            pregunta: "¿Qué haces, como su pastor?",
            opciones: [
              { texto: "Los invitas a tu casa para una comida o una visita.", bien: true, explica: "Abrir la casa con equilibrio, para una comida o una visita, enseña más que muchos sermones." },
              { texto: "Les dices que tu casa no es para recibir a nadie, y que vayan a una célula.", explica: "La Palabra pide: «Hospedaos los unos a los otros sin murmuraciones»." },
              { texto: "Les das una llave de tu casa para que vengan cuando quieran.", explica: "La hospitalidad no significa vivir sin límites: la casa del pastor no es una oficina abierta todo el día." },
              { texto: "Los invitas a comer, pero después te quejas de tener que hacerlo.", explica: "La Palabra pide hospedarse «sin murmuraciones»." },
            ],
            apoyo: "Abrir la casa con equilibrio, para una comida o una visita, enseña más que muchos sermones",
            ref: "1 Pedro 4:9",
            explica: "La hospitalidad es parte del ministerio pastoral: abrir la casa con equilibrio enseña más que muchos sermones, sin murmuraciones y con límites sanos.",
          },
          {
            caso: "Un pastor joven te dice: Desde que abrí mi casa a todos, ya no tengo un solo momento a solas con mi familia.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que siga abriendo su casa, pero con equilibrio y límites sanos.", bien: true, explica: "Su casa se abre con hospitalidad, pero con límites sanos." },
              { texto: "Que cierre su casa a todos, para que nadie vuelva a molestarlo.", explica: "Abrir la casa con equilibrio enseña más que muchos sermones: la hospitalidad es parte del ministerio." },
              { texto: "Que siga igual, porque la hospitalidad de un pastor no tiene límites.", explica: "La hospitalidad no significa vivir sin límites." },
              { texto: "Que siga recibiendo a todos, aunque lo haga quejándose por dentro.", explica: "La Palabra pide hospedarse «sin murmuraciones»." },
            ],
            apoyo: "la hospitalidad no significa vivir sin límites",
            ref: "1 Pedro 4:9",
            explica: "La casa del pastor se abre con hospitalidad, pero con límites sanos: la hospitalidad no significa vivir sin límites, y la intimidad del hogar también se protege.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la hospitalidad del que sirve: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Abrir la casa para una comida o una visita enseña más que muchos sermones.", verdad: true, explica: "Así lo dice la lección, siempre que se haga con equilibrio.", apoyo: "Abrir la casa con equilibrio, para una comida o una visita, enseña más que muchos sermones" },
              { texto: "La hospitalidad significa vivir sin límites.", verdad: false, explica: "La hospitalidad no significa vivir sin límites: la casa se abre con límites sanos.", apoyo: "la hospitalidad no significa vivir sin límites" },
              { texto: "La Palabra pide hospedarse los unos a los otros sin murmuraciones.", verdad: true, explica: "«Hospedaos los unos a los otros sin murmuraciones».", apoyo: "La Palabra pide: «Hospedaos los unos a los otros sin murmuraciones»", ref: "1 Pedro 4:9" },
            ],
          },
          {
            consigna: "Sobre la casa abierta del pastor: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Se puede hospedar a otros murmurando, con tal de abrir la casa.", verdad: false, explica: "La Palabra pide hospedarse «sin murmuraciones».", apoyo: "«Hospedaos los unos a los otros sin murmuraciones»", ref: "1 Pedro 4:9" },
              { texto: "La casa del pastor debe estar abierta como una oficina todo el día.", verdad: false, explica: "La casa del pastor no es una oficina abierta todo el día: la hospitalidad tiene límites sanos.", apoyo: "la casa del pastor no es una oficina abierta todo el día" },
              { texto: "La casa del pastor se abre con hospitalidad, pero con límites sanos.", verdad: true, explica: "Así se cuida a la vez la hospitalidad y la intimidad del hogar.", apoyo: "Su casa se abre con hospitalidad, pero con límites sanos" },
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
            apoyo: "El hogar es el primer lugar del ministerio",
            ref: "1 Timoteo 3:4-5",
            clave: {
              id: "pr-n5-teologia-pastoral-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el hogar es el primer lugar del ministerio del que sirve?",
              ideas: [
                { id: "casa", peso: 50, negativa: true, texto: "Porque quien no cuida su propia casa no podrá cuidar la iglesia de Dios: la forma en que cuida a los suyos muestra cómo cuidará a la iglesia.", formas: ["propia casa", "gobernar (su|la) casa", "gobiern* casa", "los suyos", "cuid* (su|la|mi) (casa|familia)"] },
                { id: "empieza", peso: 50, texto: "El servicio a Dios empieza en casa, como dijo Josué: yo y mi casa serviremos a Jehová; la familia es el primer ministerio.", formas: ["empieza en (casa|hogar)", "comienza en (casa|hogar)", "yo y mi casa", "mi casa servir*", "serviremos a jehova", "primer ministerio"] },
              ],
              errores: [
                { id: "no-importa", texto: "Tu familia no es un obstáculo para el ministerio: es tu primer ministerio.", formas: ["(hogar|familia|casa) no (importa|cuenta)", "(hogar|familia) (es|son) un (obstaculo|estorbo)"], anula: "empieza" },
              ],
              modelo: "Porque quien no cuida su propia casa no podrá cuidar la iglesia de Dios: la forma en que alguien cuida a los suyos muestra cómo cuidará a la iglesia. Además, el servicio a Dios empieza en casa, como dijo Josué.",
            },
          },
          {
            apoyo: "Tu familia no es un obstáculo para el ministerio: es tu primer ministerio",
            ref: "Josué 24:15",
            clave: {
              id: "pr-n5-teologia-pastoral-3-a7-2",
              tipo: "corta",
              pregunta: "Un líder de líderes te dice: Mi familia me estorba para servir a Dios. ¿Qué le respondes?",
              ideas: [
                { id: "primer", peso: 50, texto: "Que su familia no es un obstáculo para el ministerio: es su primer ministerio; el hogar es el primer lugar del ministerio.", formas: ["primer ministerio", "primer lugar", "hogar es ministerio", "no es (un|ningun) (obstaculo|estorbo)", "no (estorba|estorban)"] },
                { id: "servicio", peso: 50, texto: "Que el servicio a Dios empieza en casa, como dijo Josué: yo y mi casa serviremos a Jehová.", formas: ["empieza en (casa|hogar)", "comienza en (casa|hogar)", "yo y mi casa", "mi casa servir*", "serviremos a jehova", "josue"] },
              ],
              errores: [
                { id: "estorbo", texto: "Tu familia no es un obstáculo para el ministerio: es tu primer ministerio.", formas: ["tiene razon", "tienes razon", "(familia|hogar) (es|son) un (obstaculo|estorbo)", "(familia|hogar) (estorba|estorban)"], anula: "primer" },
              ],
              modelo: "Le respondo que su familia no es un obstáculo para el ministerio: es su primer ministerio. El servicio a Dios empieza en casa, como dijo Josué: yo y mi casa serviremos a Jehová.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Apacentar con la Palabra
    "n5-teologia-pastoral-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas veces restauró Jesús a Pedro y le encargó lo mismo?", reverso: "Tres veces.", apoyo: "Tres veces Jesús restauró a Pedro, y tres veces le encargó lo mismo" },
              { frente: "¿Cómo se demuestra el amor por Cristo?", reverso: "Cuidando a sus ovejas.", apoyo: "El amor por Cristo se demuestra cuidando a sus ovejas" },
              { frente: "¿Cuál es el alimento de la iglesia?", reverso: "La Palabra de Dios.", apoyo: "El alimento de la iglesia es la Palabra de Dios" },
              { frente: "Como las ovejas no se alimentan solas, ¿qué necesitan?", reverso: "Un pastor que las lleve a buenos pastos.", apoyo: "Las ovejas no se alimentan solas: necesitan un pastor que las lleve a buenos pastos" },
            ],
          },
          {
            tarjetas: [
              { frente: "La tercera vez, ¿qué le dijo Jesús a Pedro?", reverso: "«Apacienta mis ovejas».", apoyo: "La tercera vez le dijo: «Apacienta mis ovejas»" },
              { frente: "¿Qué encarga Pablo a Timoteo, delante de Dios?", reverso: "Que predique la palabra y que inste a tiempo y fuera de tiempo.", apoyo: "Pablo encarga a Timoteo, delante de Dios: «que prediques la palabra; que instes a tiempo y fuera de tiempo»" },
              { frente: "¿Qué lugar tiene la predicación en el encargo pastoral?", reverso: "No es una parte más de la agenda: es el corazón del encargo.", apoyo: "Predicar no es una parte más de la agenda: es el corazón del encargo pastoral" },
              { frente: "¿Qué resiste mejor una iglesia bien alimentada con la Palabra?", reverso: "El error.", apoyo: "Una iglesia bien alimentada con la Palabra resiste mejor el error" },
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
            consigna: "Pablo encarga a Timoteo delante de Dios. ¿Qué debe predicar? Toca las palabras que lo dicen.",
            texto: "que prediques [[la palabra]]; que instes a tiempo y fuera de tiempo",
            apoyo: "Pablo encarga a Timoteo, delante de Dios: «que prediques la palabra; que instes a tiempo y fuera de tiempo»",
            ref: "2 Timoteo 4:2",
            explica: "Pablo encarga a Timoteo predicar la palabra a tiempo y fuera de tiempo: predicar no es una parte más de la agenda, es el corazón del encargo pastoral.",
          },
          {
            consigna: "¿Cuándo debe Timoteo instar con la palabra? Toca las palabras que lo dicen.",
            texto: "que prediques la palabra; que instes [[a tiempo y fuera de tiempo]]",
            apoyo: "Pablo encargó a Timoteo predicar la palabra a tiempo y fuera de tiempo",
            ref: "2 Timoteo 4:2",
            explica: "Timoteo debía instar «a tiempo y fuera de tiempo»: predicar es el corazón del encargo pastoral, no una parte más de la agenda.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que pasó entre Jesús y Pedro en Juan 21.",
            texto: "Tres veces Jesús [[restauró]] a Pedro y le encargó lo mismo: el [[amor]] por Cristo se demuestra [[cuidando]] a sus ovejas.",
            distractores: ["reprendió", "miedo", "juzgando"],
            errores: {
              "reprendió": "Tres veces Jesús restauró a Pedro, y tres veces le encargó lo mismo.",
              miedo: "El amor por Cristo se demuestra cuidando a sus ovejas.",
              juzgando: "El amor por Cristo se demuestra cuidando a sus ovejas: «Apacienta mis ovejas».",
            },
            apoyo: "Tres veces Jesús restauró a Pedro, y tres veces le encargó lo mismo",
            ref: "Juan 21:15-17",
            explica: "Tres veces Jesús restauró a Pedro y le encargó lo mismo; la tercera vez le dijo: «Apacienta mis ovejas». El amor por Cristo se demuestra cuidando a sus ovejas.",
          },
          {
            consigna: "Completa lo que Pablo pidió a Timoteo, delante de Dios.",
            texto: "Pablo pidió predicar la [[palabra]] a tiempo y fuera de tiempo: predicar es el [[corazón]] del [[encargo]] pastoral.",
            distractores: ["opinión", "adorno", "salario"],
            errores: {
              "opinión": "Pablo encarga a Timoteo: «que prediques la palabra».",
              adorno: "Predicar no es una parte más de la agenda: es el corazón del encargo pastoral.",
              salario: "Predicar es el corazón del encargo pastoral.",
            },
            apoyo: "Predicar no es una parte más de la agenda: es el corazón del encargo pastoral",
            ref: "2 Timoteo 4:1-2",
            explica: "Pablo encargó a Timoteo predicar la palabra a tiempo y fuera de tiempo: predicar no es una parte más de la agenda, es el corazón del encargo pastoral.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así alimenta el pastor a la iglesia o así la protege del error? Lleva cada frase a su grupo.",
            grupos: ["Así la alimenta", "Así la protege del error"],
            frases: [
              { texto: "Predica libros completos de la Biblia", grupo: 0 },
              { texto: "Enseña en público y por las casas", grupo: 0 },
              { texto: "Forma maestros y grupos pequeños", grupo: 0 },
              { texto: "Usa herramientas como esta academia", grupo: 0 },
              { texto: "Corrige con mansedumbre a los que se oponen", grupo: 1 },
              { texto: "Avisa al rebaño que vendrán lobos rapaces", grupo: 1 },
              { texto: "Responde a la falsa doctrina con la sana enseñanza", grupo: 1 },
            ],
            apoyo: "El pastor alimenta a la iglesia con todo el consejo de Dios, en público y por las casas, forma maestros y protege al rebaño de la falsa doctrina con la sana enseñanza y la corrección mansa",
            ref: "Hechos 20:28-31",
            explica: "El pastor alimenta a la iglesia predicando libros completos, enseñando en público y por las casas, formando maestros y usando herramientas como la academia; y la protege del error con la sana enseñanza y la corrección mansa.",
          },
          {
            consigna: "¿Ayuda a proteger al rebaño del error o lo deja expuesto? Lleva cada frase a su grupo.",
            grupos: ["Protege al rebaño", "Lo deja expuesto"],
            frases: [
              { texto: "Enseñar la sana doctrina", grupo: 0 },
              { texto: "Corregir con mansedumbre al que se opone", grupo: 0 },
              { texto: "Alimentar bien a la iglesia con la Palabra", grupo: 0, explica: "Una iglesia bien alimentada con la Palabra resiste mejor el error." },
              { texto: "Corregir con burlas y enojo al que se opone", grupo: 1, explica: "El pastor corrige con mansedumbre a los que se oponen." },
              { texto: "Callar cuando llega una enseñanza falsa", grupo: 1, explica: "El pastor protege al rebaño enseñando la sana doctrina." },
              { texto: "Pensar que las ovejas se alimentan solas", grupo: 1, explica: "Las ovejas no se alimentan solas: necesitan un pastor que las lleve a buenos pastos." },
            ],
            apoyo: "Una iglesia bien alimentada con la Palabra resiste mejor el error",
            ref: "Tito 1:9",
            explica: "El rebaño se protege con la sana doctrina, la corrección mansa y una buena alimentación con la Palabra; queda expuesto si se corrige con enojo, si se calla ante el error o si se cree que las ovejas se alimentan solas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre cómo el pastor protege al rebaño tiene un error. Tócala.",
            frases: [
              "Pablo advirtió a los ancianos de Éfeso que vendrían lobos rapaces.",
              "El pastor protege al rebaño enseñando la sana doctrina.",
              "El pastor corrige con dureza y enojo a los que se oponen.",
              "Una iglesia bien alimentada con la Palabra resiste mejor el error.",
            ],
            malo: 2,
            correccion: "El pastor corrige con mansedumbre a los que se oponen.",
            apoyo: "El pastor protege al rebaño enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen",
            ref: "2 Timoteo 2:24-25",
            explica: "El pastor protege al rebaño enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen.",
          },
          {
            consigna: "Una de estas frases sobre cómo el pastor alimenta a la iglesia tiene un error. Tócala.",
            frases: [
              "Predicar libros completos ayuda a que la iglesia reciba todo el consejo de Dios.",
              "Pablo enseñaba en público y por las casas.",
              "Las ovejas se alimentan solas, sin necesidad de un pastor.",
              "Formar maestros y grupos pequeños hace que la enseñanza llegue a todos.",
            ],
            malo: 2,
            correccion: "Las ovejas no se alimentan solas: necesitan un pastor que las lleve a buenos pastos.",
            apoyo: "Las ovejas no se alimentan solas: necesitan un pastor que las lleve a buenos pastos",
            ref: "Hechos 20:20",
            explica: "Las ovejas no se alimentan solas: el pastor las alimenta con todo el consejo de Dios, en público y por las casas, y forma maestros y grupos pequeños.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un pastor sabio planifica qué enseñará durante el año: un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita, para no predicar siempre sus temas favoritos",
            ref: "Hechos 20:27",
            titulo: "El plan del año",
            relato: [
              "Eres el pastor de una iglesia de 120 personas. Es enero, y vas a planificar la enseñanza del año.",
              "Al revisar el año pasado, ves que casi siempre predicaste sobre tus dos temas favoritos.",
              "Además, muchos hermanos solo reciben enseñanza el domingo, y algunos casi nunca vienen al templo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué pones en tu plan de enseñanza del año?",
                opciones: [
                  { texto: "Libros de los dos testamentos y los temas que tu iglesia necesita.", bien: true, explica: "Un pastor sabio planifica un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita." },
                  { texto: "Tus dos temas favoritos otra vez, porque son los que mejor predicas.", explica: "El plan sirve justamente para no predicar siempre tus temas favoritos." },
                  { texto: "Lo que te pidan los hermanos cada semana, sin un plan para todo el año.", explica: "Un pastor sabio planifica qué enseñará durante el año." },
                ],
                apoyo: "Un pastor sabio planifica qué enseñará durante el año",
                explica: "Un pastor sabio planifica qué enseñará durante el año: un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo vas a predicar el evangelio que escogiste?",
                opciones: [
                  { texto: "Completo, pasaje por pasaje, para dar todo el consejo de Dios.", bien: true, explica: "Se predican libros completos de la Biblia, para que la iglesia reciba todo el consejo de Dios." },
                  { texto: "Solo sus versículos más conocidos, los que la gente ya ama más.", explica: "Se predican libros completos, para que la iglesia reciba todo el consejo de Dios." },
                  { texto: "Solo los pasajes que van bien con tus dos temas favoritos de siempre.", explica: "El plan sirve justamente para no predicar siempre tus temas favoritos." },
                ],
                apoyo: "Predicar libros completos de la Biblia, para que la iglesia reciba todo el consejo de Dios",
                ref: "Hechos 20:27",
                explica: "Predicar libros completos de la Biblia hace que la iglesia reciba todo el consejo de Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo harás que la enseñanza llegue también a los que casi no vienen?",
                opciones: [
                  { texto: "Formando maestros y grupos pequeños, y enseñando por las casas.", bien: true, explica: "Se forman maestros y grupos pequeños para que la enseñanza llegue a todos, y se enseña en público y por las casas, como Pablo." },
                  { texto: "Esperando a que ellos vuelvan al templo para darles la enseñanza.", explica: "Pablo enseñó en público y por las casas, y se forman maestros y grupos para que la enseñanza llegue a todos." },
                  { texto: "Pidiéndoles que lean la Biblia solos, sin que nadie les enseñe nada.", explica: "Las ovejas no se alimentan solas: necesitan un pastor que las lleve a buenos pastos." },
                ],
                apoyo: "Formar maestros y grupos pequeños, para que la enseñanza llegue a todos",
                ref: "Hechos 20:20",
                explica: "La enseñanza llega a todos cuando se forman maestros y grupos pequeños y se enseña en público y por las casas.",
              },
              {
                tipo: "explica",
                apoyo: "Un pastor sabio planifica qué enseñará durante el año",
                clave: {
                  id: "pr-n5-teologia-pastoral-4-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas frases tu plan de enseñanza para este año y por qué lo armas así.",
                  ideas: [
                    { id: "libros", peso: 40, texto: "Un evangelio, una carta, un libro del Antiguo Testamento y los temas que la iglesia necesita.", formas: ["evangelio", "carta", "antiguo testamento", "(mateo|marcos|lucas|juan)", "(efesios|romanos|filipenses|colosenses|galatas|santiago|hebreos|corintios|tesalonicenses|timoteo|tito)", "(genesis|exodo|josue|rut|samuel|reyes|nehemias|salmos|proverbios|isaias|jeremias|daniel|jonas|ester|esdras|jueces|deuteronomio)"] },
                    { id: "consejo", peso: 35, texto: "Para que la iglesia reciba todo el consejo de Dios, y no predicar siempre mis temas favoritos.", formas: ["todo el consejo", "consejo de dios", "(no|sin) predicar siempre", "no (predique|predicar|prediques) solo", "libros completos", "libro completo", "completos"] },
                    { id: "todos", peso: 25, texto: "Formar maestros y grupos pequeños, y enseñar en público y por las casas, para que la enseñanza llegue a todos.", formas: ["maestros", "grupos pequenos", "por las casas", "llegue a todos", "academia", "celulas"] },
                  ],
                  errores: [
                    { id: "favoritos", texto: "El plan sirve para no predicar siempre tus temas favoritos.", formas: ["predicar* (mis|tus|sus) temas favoritos", "solo (mis|tus|sus) temas"], anula: "consejo" },
                  ],
                  modelo: "Predicaré completos el evangelio de Marcos, la carta a los Efesios y el libro de Nehemías, y los temas que mi iglesia necesita, para que reciba todo el consejo de Dios. Y formaré maestros y grupos pequeños para que la enseñanza llegue a todos.",
                },
              },
            ],
          },
          {
            apoyo: "Una iglesia bien alimentada con la Palabra resiste mejor el error",
            ref: "Hechos 20:27-31",
            titulo: "Un año entero sobre la familia",
            relato: [
              "Eres líder de líderes y acompañas a Samuel, un pastor joven. Te muestra su plan: todo el año predicará sobre la familia, su tema favorito.",
              "En su iglesia hay muchos creyentes nuevos, y hace poco llegó un grupo que enseña una doctrina falsa.",
              "Samuel te pide que lo ayudes a mejorar su plan de enseñanza.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas sobre su plan de un año entero sobre la familia?",
                opciones: [
                  { texto: "Que incluya un evangelio, una carta y un libro del Antiguo Testamento.", bien: true, explica: "Un pastor sabio planifica un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita." },
                  { texto: "Que está muy bien: si es su tema favorito, lo predicará mejor que nadie.", explica: "Un pastor sabio planifica para no predicar siempre sus temas favoritos." },
                  { texto: "Que cambie la familia por otro tema favorito suyo, para no aburrirse tanto.", explica: "El plan no cambia un tema favorito por otro: incluye libros de la Biblia y los temas que la iglesia necesita." },
                ],
                apoyo: "Un pastor sabio planifica qué enseñará durante el año: un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita",
                explica: "El plan lleva libros de la Biblia y los temas que la iglesia necesita, para no predicar siempre los temas favoritos.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo ayuda un buen plan a la iglesia frente a esa doctrina falsa?",
                opciones: [
                  { texto: "Una iglesia bien alimentada con la Palabra resiste mejor el error.", bien: true, explica: "Una iglesia bien alimentada con la Palabra resiste mejor el error." },
                  { texto: "No ayuda: frente al error solo sirve hablar de ese grupo cada domingo.", explica: "Una iglesia bien alimentada con todo el consejo de Dios resiste mejor el error." },
                  { texto: "Le da a la iglesia muchos temas nuevos para que no escuche a ese grupo.", explica: "No se trata de temas nuevos: una iglesia bien alimentada con la Palabra resiste mejor el error." },
                ],
                apoyo: "Una iglesia bien alimentada con la Palabra resiste mejor el error",
                explica: "El alimento de la iglesia es la Palabra de Dios, y una iglesia bien alimentada resiste mejor el error.",
              },
              {
                tipo: "situacion",
                pregunta: "Algunos de ese grupo se oponen a la enseñanza de Samuel. ¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que enseñe la sana doctrina y los corrija con mansedumbre.", bien: true, explica: "El pastor protege al rebaño enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen." },
                  { texto: "Que los corrija con dureza y enojo, delante de toda la iglesia.", explica: "A los que se oponen se los corrige con mansedumbre." },
                  { texto: "Que no diga nada y que espere a que se vayan solos de la iglesia.", explica: "El pastor protege al rebaño: enseña la sana doctrina, porque vendrán lobos rapaces." },
                ],
                apoyo: "El pastor protege al rebaño enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen",
                ref: "2 Timoteo 2:24-25",
                explica: "Pablo advirtió que vendrían lobos rapaces: el pastor protege al rebaño con la sana enseñanza y la corrección mansa.",
              },
              {
                tipo: "explica",
                apoyo: "para no predicar siempre sus temas favoritos",
                clave: {
                  id: "pr-n5-teologia-pastoral-4-a6-2",
                  tipo: "corta",
                  pregunta: "¿Cómo quedaría el plan de enseñanza de Samuel, y por qué así?",
                  ideas: [
                    { id: "libros", peso: 40, texto: "Un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita.", formas: ["evangelio", "carta", "antiguo testamento", "(mateo|marcos|lucas|juan)", "(efesios|romanos|filipenses|colosenses|galatas|santiago|hebreos|corintios|tesalonicenses|timoteo|tito)", "(genesis|exodo|josue|rut|samuel|reyes|nehemias|salmos|proverbios|isaias|jeremias|daniel|jonas|ester|esdras|jueces|deuteronomio)"] },
                    { id: "favoritos", peso: 30, negativa: true, texto: "Para no predicar siempre sus temas favoritos y dar todo el consejo de Dios.", formas: ["(no|sin) predicar siempre", "no (predique|prediques|predicar) (solo|siempre)", "todo el consejo", "consejo de dios", "temas que (su|la|mi) iglesia necesita", "lo que (su|la) iglesia necesita"] },
                    { id: "error", peso: 30, texto: "Porque una iglesia bien alimentada con la Palabra resiste mejor el error.", formas: ["bien alimentada", "resist* error", "resiste mejor", "resista mejor", "doctrina falsa", "falsa doctrina", "sana doctrina"] },
                  ],
                  modelo: "El plan llevaría un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita, para no predicar siempre sus temas favoritos. Así la iglesia, bien alimentada con la Palabra, resiste mejor el error.",
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
            apoyo: "El pastor protege al rebaño enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen",
            ref: "Hechos 20:28-31",
            clave: {
              id: "pr-n5-teologia-pastoral-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo alimenta el pastor a la iglesia, y cómo la protege de la falsa doctrina?",
              ideas: [
                { id: "alimenta", peso: 50, texto: "La alimenta con todo el consejo de Dios: predica libros completos, enseña en público y por las casas y forma maestros.", formas: ["todo el consejo", "consejo de dios", "libros completos", "libro completo", "por las casas", "en publico", "maestros", "grupos pequenos", "con la palabra"] },
                { id: "protege", peso: 50, texto: "La protege enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen.", formas: ["sana doctrina", "sana ensenanza", "doctrina sana", "mansedumbre", "correccion mansa", "manso", "mansa"] },
              ],
              errores: [
                { id: "dureza", texto: "El pastor corrige con mansedumbre a los que se oponen.", formas: ["corrig* (dureza|enojo|gritos|burlas)", "(con|a) (dureza|gritos|golpes|enojo)"], anula: "protege" },
              ],
              modelo: "La alimenta con todo el consejo de Dios: predica libros completos de la Biblia, enseña en público y por las casas y forma maestros. Y la protege de la falsa doctrina enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen.",
            },
          },
          {
            apoyo: "Una iglesia bien alimentada con la Palabra resiste mejor el error",
            ref: "Hechos 20:28-31",
            clave: {
              id: "pr-n5-teologia-pastoral-4-a7-2",
              tipo: "corta",
              pregunta: "Pablo advirtió a los ancianos de Éfeso que vendrían lobos rapaces. ¿Qué hace hoy el pastor para proteger al rebaño?",
              ideas: [
                { id: "alimentar", peso: 35, texto: "Lo alimenta bien con la Palabra, porque una iglesia bien alimentada resiste mejor el error.", formas: ["aliment*", "todo el consejo", "consejo de dios", "resiste mejor"] },
                { id: "sana", peso: 35, texto: "Enseña la sana doctrina.", formas: ["sana doctrina", "sana ensenanza", "doctrina sana"] },
                { id: "mansedumbre", peso: 30, texto: "Corrige con mansedumbre a los que se oponen.", formas: ["mansedumbre", "correccion mansa", "manso", "mansa"] },
              ],
              errores: [
                { id: "dureza", texto: "El pastor corrige con mansedumbre a los que se oponen.", formas: ["corrig* (dureza|enojo|gritos|burlas)", "(con|a) (dureza|gritos|golpes|enojo)"], anula: "mansedumbre" },
              ],
              modelo: "El pastor mira por todo el rebaño: lo alimenta bien con la Palabra, porque una iglesia bien alimentada resiste mejor el error, enseña la sana doctrina y corrige con mansedumbre a los que se oponen.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Cuidar y visitar al rebaño
    "n5-teologia-pastoral-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué reprendió Dios a los pastores de Israel?", reverso: "Porque se apacentaban a sí mismos y no cuidaban a las ovejas.", apoyo: "Dios reprendió a los pastores de Israel porque se apacentaban a sí mismos y no cuidaban a las ovejas" },
              { frente: "¿Qué muestra lo que Dios reprende en Ezequiel 34?", reverso: "Lo que espera: fortalecer, curar, vendar, traer de vuelta y buscar.", apoyo: "Lo que Dios reprende muestra lo que espera: fortalecer, curar, vendar, traer de vuelta y buscar" },
              { frente: "¿Cómo llama el buen pastor a sus ovejas?", reverso: "Por nombre.", apoyo: "El buen pastor «a sus ovejas llama por nombre»" },
              { frente: "Además del nombre, ¿qué conoce el pastor de su gente?", reverso: "Su historia, sus luchas y su familia.", apoyo: "El pastor conoce a su gente: su historia, sus luchas y su familia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Se reduce el cuidado pastoral al culto del domingo?", reverso: "No: el cuidado pastoral es más que el culto del domingo.", apoyo: "El cuidado pastoral es más que el culto del domingo" },
              { frente: "Según Ezequiel 34, ¿qué no hicieron los pastores con la descarriada?", reverso: "No la volvieron al redil.", apoyo: "no volvisteis al redil la descarriada" },
              { frente: "¿Qué no hicieron con la perniquebrada, la oveja herida?", reverso: "No la vendaron.", apoyo: "no vendasteis la perniquebrada" },
              { frente: "¿Qué enseña Santiago que haga el que está enfermo?", reverso: "Que llame a los ancianos de la iglesia, y que oren por él.", apoyo: "Llame a los ancianos de la iglesia, y oren por él" },
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
            consigna: "Según Ezequiel 34, ¿qué no hicieron los pastores con la descarriada? Toca las palabras que lo dicen.",
            texto: "no vendasteis la perniquebrada, no [[volvisteis al redil]] la descarriada, ni buscasteis la perdida",
            apoyo: "Lo que Dios reprende muestra lo que espera: fortalecer, curar, vendar, traer de vuelta y buscar",
            ref: "Ezequiel 34:4",
            explica: "Dios reprendió a los pastores porque no volvieron al redil la descarriada. Lo que Dios reprende muestra lo que espera: traer de vuelta a las descarriadas.",
          },
          {
            consigna: "¿Cómo llama el buen pastor a sus ovejas? Toca las palabras que lo dicen.",
            texto: "a sus ovejas llama [[por nombre]]",
            apoyo: "El pastor conoce a su gente: su historia, sus luchas y su familia",
            ref: "Juan 10:3",
            explica: "El buen pastor «a sus ovejas llama por nombre»: el pastor conoce a su gente, su historia, sus luchas y su familia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada oveja de Ezequiel 34 con lo que Dios espera de sus pastores.",
            pares: [
              ["Las débiles", "Fortalecerlas"],
              ["La enferma", "Curarla"],
              ["La perniquebrada, la herida", "Vendarla"],
              ["La descarriada", "Traerla de vuelta al redil"],
              ["La perdida", "Buscarla"],
            ],
            apoyo: "Dios espera que sus pastores fortalezcan a las débiles, curen a las enfermas, venden a las heridas, traigan de vuelta a las descarriadas y busquen a las perdidas",
            ref: "Ezequiel 34:2-4",
            explica: "Lo que Dios reprende muestra lo que espera: fortalecer a las débiles, curar a las enfermas, vendar a las heridas, traer de vuelta a las descarriadas y buscar a las perdidas.",
          },
          {
            consigna: "Une cada uno con lo que dice de él la lección.",
            pares: [
              ["Los pastores de Israel", "Se apacentaban a sí mismos"],
              ["El buen pastor", "A sus ovejas llama por nombre"],
              ["La oveja perdida", "El pastor la busca sin reproches"],
              ["El cuidado pastoral", "Es más que el culto del domingo"],
            ],
            apoyo: "El buen pastor conoce a sus ovejas por nombre",
            ref: "Juan 10:3",
            explica: "Los pastores de Israel se apacentaban a sí mismos; el buen pastor llama a sus ovejas por nombre y busca a la perdida sin reproches. El cuidado pastoral es más que el culto del domingo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El buen pastor conoce a sus ovejas por nombre, visita a los enfermos, a los ancianos, a los alejados y a los nuevos",
            ref: "Lucas 15:4",
            situacion: "Eres pastor de una iglesia mediana. Esta semana quieres visitar a los que más lo necesitan.",
            escenas: [
              {
                id: "e1",
                narra: "Don Julio, de 80 años, está en el hospital después de una operación.",
                pregunta: "¿Cómo haces la visita?",
                opciones: [
                  { texto: "Lees un pasaje breve, oras con él y cuidas el lugar y el tiempo.", valor: 2, explica: "A los enfermos se los visita con una lectura breve, una oración y respeto por el lugar y el tiempo." },
                  { texto: "Le llevas un saludo de la iglesia, pero te vas sin orar con él.", valor: 1, explica: "Visitar está bien, pero orar por los enfermos es parte del cuidado pastoral." },
                  { texto: "Le predicas una hora entera, aunque las enfermeras necesiten entrar.", valor: 0, explica: "A los enfermos se los visita con una lectura breve, una oración y respeto por el lugar y el tiempo." },
                ],
              },
              {
                id: "e2",
                narra: "Los Ramírez dejaron de venir hace tres meses, sin decir por qué.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los buscas en su casa, sin reproches, para saber cómo están.", valor: 2, explica: "A los que dejaron de venir se los busca sin reproches, como el pastor que busca la oveja perdida.", siguiente: "e3" },
                  { texto: "Esperas a que vuelvan, y entonces los saludas con mucho cariño.", valor: 1, explica: "Saludarlos con cariño está bien, pero a los que dejaron de venir se los busca, como a la oveja perdida.", siguiente: "e3" },
                  { texto: "Les mandas un mensaje para reclamarles que ya no vienen a la iglesia.", valor: 0, explica: "A los que dejaron de venir se los busca sin reproches.", siguiente: "e2b" },
                ],
              },
              {
                id: "e2b",
                narra: "Los Ramírez te responden molestos que nadie preguntó por ellos.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Les pides perdón, los visitas y los escuchas sin reproches.", valor: 2, explica: "Se los busca sin reproches, como el pastor que busca la oveja perdida.", siguiente: "e3" },
                  { texto: "Les dices que la culpa es de ellos, por haberse ido de la iglesia.", valor: 0, explica: "A los que dejaron de venir se los busca sin reproches.", siguiente: "e3" },
                ],
              },
              {
                id: "e3",
                narra: "Ves que no te alcanza la semana para visitar a todos los que lo necesitan.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Formar un equipo de hermanos que visiten, oren y te avisen.", valor: 2, explica: "Ningún pastor puede visitar a todos solo: forma un equipo de hermanos que visiten, oren y avisen cuando alguien necesita al pastor." },
                  { texto: "Visitar tú solo a todos, aunque tengas que salir cada noche.", valor: 1, explica: "Tu entrega vale, pero ningún pastor puede visitar a todos solo: forma un equipo." },
                  { texto: "Dejar de visitar, porque al final nadie puede visitar a todos.", valor: 0, explica: "El cuidado pastoral es más que el culto del domingo: forma un equipo de hermanos que visiten." },
                ],
              },
            ],
          },
          {
            apoyo: "A los ancianos y a los que viven solos",
            ref: "Juan 10:3",
            situacion: "Eres pastor, y con tu equipo de visitación preparas las visitas del mes.",
            escenas: [
              {
                id: "e1",
                narra: "Doña Carmen, una anciana de la iglesia, vive sola desde hace un año.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La pones en las visitas del mes y vas a verla.", valor: 2, explica: "El pastor visita a los ancianos y a los que viven solos." },
                  { texto: "La saludas cuando viene al culto, si es que puede venir.", valor: 1, explica: "Saludarla está bien, pero a los ancianos y a los que viven solos se los visita." },
                  { texto: "No la visitas, porque los ancianos ya conocen bien al Señor.", valor: 0, explica: "El buen pastor visita a los ancianos y a los que viven solos." },
                ],
              },
              {
                id: "e2",
                narra: "Una familia nueva llegó a la iglesia el domingo pasado.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los visitas para que se sientan parte de la familia.", valor: 2, explica: "A los nuevos se los visita para que se sientan parte de la familia." },
                  { texto: "Les das la bienvenida desde el púlpito, y nada más.", valor: 1, explica: "La bienvenida ayuda, pero a los nuevos se los visita para que se sientan parte de la familia." },
                  { texto: "Esperas a que lleven un año en la iglesia para conocerlos mejor.", valor: 0, explica: "A los nuevos se los visita pronto, para que se sientan parte de la familia." },
                ],
              },
              {
                id: "e3",
                narra: "Un hermano del equipo te avisa que Lucía, de la célula, está muy enferma en su casa.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La visitas, lees un pasaje breve y oras por ella.", valor: 2, explica: "Orar por los enfermos es parte del cuidado pastoral, y se los visita en la casa o en el hospital." },
                  { texto: "La llamas por teléfono para orar, pero no vas a verla.", valor: 1, explica: "Llamar ayuda, pero a los enfermos se los visita en la casa o en el hospital." },
                  { texto: "No vas, porque visitar a los enfermos le toca solo al equipo.", valor: 0, explica: "El equipo avisa cuando alguien necesita al pastor, y orar por los enfermos es parte del cuidado pastoral." },
                ],
              },
              {
                id: "e4",
                narra: "Al final del mes, piensas en lo que quieres saber de cada familia que visitas.",
                pregunta: "¿Qué buscas conocer?",
                opciones: [
                  { texto: "Su historia, sus luchas y su familia.", valor: 2, explica: "El pastor conoce a su gente: su historia, sus luchas y su familia." },
                  { texto: "Si les gustan los cultos del domingo que preparas.", valor: 1, explica: "Preguntarlo está bien, pero el cuidado pastoral es más que el culto del domingo: el pastor conoce su historia, sus luchas y su familia." },
                  { texto: "Cuánto dinero aporta cada una a la iglesia cada mes.", valor: 0, explica: "El pastor conoce a su gente: su historia, sus luchas y su familia." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la visitación tiene un error. Tócala.",
            frases: [
              "A los enfermos se los visita con una lectura breve y una oración.",
              "A los que dejaron de venir se los busca con reproches, para que vuelvan.",
              "A los nuevos se los visita para que se sientan parte de la familia.",
              "Ningún pastor puede visitar a todos solo.",
            ],
            malo: 1,
            correccion: "A los que dejaron de venir se los busca sin reproches, como el pastor que busca la oveja perdida.",
            apoyo: "A los que dejaron de venir, para buscarlos sin reproches, como el pastor que busca la oveja perdida",
            ref: "Lucas 15:4",
            explica: "A los que dejaron de venir se los busca sin reproches, como el pastor que busca la oveja perdida.",
          },
          {
            consigna: "Una de estas frases sobre cómo visita el pastor tiene un error. Tócala.",
            frases: [
              "En el hospital se cuida el respeto por el lugar y el tiempo.",
              "El pastor visita también a los ancianos y a los que viven solos.",
              "La visita a un enfermo debe durar lo más posible, con un largo sermón.",
              "El equipo de visitación avisa cuando alguien necesita al pastor.",
            ],
            malo: 2,
            correccion: "A los enfermos se los visita con una lectura breve, una oración y respeto por el lugar y el tiempo.",
            apoyo: "A los enfermos, en la casa o en el hospital, con una lectura breve, una oración y respeto por el lugar y el tiempo",
            explica: "A los enfermos se los visita en la casa o en el hospital, con una lectura breve, una oración y respeto por el lugar y el tiempo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de la iglesia te dice: Me llegó una demanda por una deuda y no sé qué hacer; solo usted me puede ayudar.",
            pregunta: "¿Qué haces, como su pastor?",
            opciones: [
              { texto: "Lo acompañas y oras con él, y lo ayudas a buscar un abogado.", bien: true, explica: "El pastor acompaña y ora, pero sabe reconocer cuándo alguien necesita además un abogado: referir a tiempo también es cuidar." },
              { texto: "Le dices que no se preocupe, que tú mismo le vas a resolver la demanda.", explica: "El pastor sabe hasta dónde llega: hay casos que necesitan además un abogado." },
              { texto: "Le dices que eso no es asunto de la iglesia y que lo resuelva él solo.", explica: "El pastor acompaña, aconseja con la Palabra y ora, y ayuda a buscar la ayuda que hace falta." },
              { texto: "Oras con él y le dices que no hace falta nadie más, solo tener fe.", explica: "Orar es parte del cuidado, pero el pastor reconoce cuándo alguien necesita además un abogado." },
            ],
            apoyo: "El pastor acompaña, aconseja con la Palabra y ora, pero sabe reconocer cuándo alguien necesita además un médico, un psicólogo, un abogado o la ayuda de las autoridades",
            explica: "Referir a tiempo también es cuidar: el pastor sigue acompañando y orando, y ayuda a la persona a buscar al abogado que necesita.",
          },
          {
            caso: "Una hermana de la iglesia te dice: Mi esposo me amenaza, y anoche tuve miedo por mi vida y la de mis hijos.",
            pregunta: "¿Qué haces, como su pastor?",
            opciones: [
              { texto: "La acompañas y buscas ayuda de inmediato, también la de las autoridades.", bien: true, explica: "Si hay riesgo de violencia, se busca ayuda de inmediato, y el pastor sabe cuándo hace falta la ayuda de las autoridades." },
              { texto: "Oras con ella y le pides que espere unas semanas, a ver si su esposo cambia.", explica: "Si hay riesgo de violencia, se busca ayuda de inmediato." },
              { texto: "La aconsejas con la Palabra, pero sin buscar a nadie más que pueda ayudar.", explica: "El pastor aconseja con la Palabra, pero sabe reconocer cuándo alguien necesita además la ayuda de las autoridades." },
              { texto: "Hablas tú a solas con su esposo, para pedirle que se calme y que la respete.", explica: "El pastor sabe hasta dónde llega: si hay riesgo de violencia, se busca ayuda de inmediato." },
            ],
            apoyo: "Si hay riesgo de suicidio o de violencia, se busca ayuda de inmediato",
            explica: "El pastor acompaña, aconseja con la Palabra y ora, pero sabe reconocer cuándo alguien necesita además la ayuda de las autoridades. Si hay riesgo de violencia, se busca ayuda de inmediato.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Referir a tiempo también es cuidar",
            clave: {
              id: "pr-n5-teologia-pastoral-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cuándo debe el pastor referir a una persona a otra ayuda, y qué hace él mientras tanto?",
              ideas: [
                { id: "reconoce", peso: 40, texto: "Cuando reconoce que la persona necesita además un médico, un psicólogo, un abogado o la ayuda de las autoridades.", formas: ["medico", "psicolog*", "abogado", "autoridad*", "profesional*"] },
                { id: "cuidar", peso: 30, texto: "Referir a tiempo también es cuidar: el pastor sigue acompañando, aconsejando con la Palabra y orando.", formas: ["a tiempo", "tambien es cuidar", "es cuidar", "sigue (acompanando|orando|cerca)", "sigu* acompan*"] },
                { id: "inmediato", peso: 30, texto: "Si hay riesgo de suicidio o de violencia, se busca ayuda de inmediato.", formas: ["de inmediato", "inmediat*", "enseguida", "suicid*", "violencia"] },
              ],
              modelo: "Debe referirla cuando reconoce que necesita además un médico, un psicólogo, un abogado o la ayuda de las autoridades. Referir a tiempo también es cuidar, y el pastor sigue acompañando y orando. Si hay riesgo de suicidio o de violencia, busca ayuda de inmediato.",
            },
          },
          {
            apoyo: "El pastor acompaña, aconseja con la Palabra y ora, pero sabe reconocer cuándo alguien necesita además un médico, un psicólogo, un abogado o la ayuda de las autoridades",
            clave: {
              id: "pr-n5-teologia-pastoral-5-a7-2",
              tipo: "corta",
              pregunta: "Un pastor dice: Si mando a alguien al médico o al psicólogo, es porque fallé como pastor. ¿Qué le respondes?",
              ideas: [
                { id: "cuidar", peso: 50, texto: "Que referir a tiempo también es cuidar: no es fallar.", formas: ["a tiempo", "tambien es cuidar", "es cuidar", "(no|ni) (es|significa) fall*", "(no|nunca) (fallo|fallaste|falla|fallas)"] },
                { id: "ademas", peso: 50, texto: "Que el pastor acompaña, aconseja con la Palabra y ora, y sabe reconocer cuándo alguien necesita además otra ayuda.", formas: ["ademas", "hasta donde llega", "sabe reconocer", "sigu* (acompan*|orando)", "(acompana|aconseja) (y|con)"] },
              ],
              errores: [
                { id: "fallo", texto: "Referir a tiempo también es cuidar.", formas: ["tiene razon", "tienes razon", "(es|seria) fracas*"], anula: "cuidar" },
              ],
              modelo: "Le respondo que referir a tiempo también es cuidar, no es fallar. El pastor acompaña, aconseja con la Palabra y ora, pero sabe reconocer cuándo alguien necesita además un médico o un psicólogo, y lo sigue acompañando.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Las crisis, el desgaste y terminar bien
    "n5-teologia-pastoral-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En una crisis, como una llamada a medianoche, ¿qué necesita el pastor?", reverso: "Estar presente con el consuelo de Dios, no palabras perfectas.", apoyo: "en esas horas el pastor no necesita palabras perfectas, sino estar presente con el consuelo de Dios" },
              { frente: "¿Cómo llama Pablo a Dios en 2 Corintios 1:3?", reverso: "«Padre de misericordias y Dios de toda consolación».", apoyo: "Dios es el Dios de toda consolación" },
              { frente: "¿De dónde sale el consuelo con que consuela el pastor?", reverso: "Del consuelo que él mismo recibe de Dios.", apoyo: "El pastor consuela con el consuelo que él mismo recibe" },
              { frente: "¿Cuándo conviene volver a ver a la familia que sufre?", reverso: "Días y semanas después, cuando los demás ya se fueron.", apoyo: "Volver días y semanas después, cuando los demás ya se fueron" },
            ],
          },
          {
            tarjetas: [
              { frente: "Al acompañar en el dolor, ¿qué hace más el pastor: hablar o escuchar?", reverso: "Está presente y escucha más que habla.", apoyo: "Estar presente y escuchar más que hablar" },
              { frente: "Según Romanos 12:15, ¿qué hace el pastor ante el dolor, y qué evita?", reverso: "Llora con los que lloran y evita las explicaciones fáciles del sufrimiento.", apoyo: "Llorar con los que lloran (Romanos 12:15), sin explicaciones fáciles del sufrimiento" },
              { frente: "Junto a quien sufre, ¿qué lee el pastor y cómo ora?", reverso: "Lee un salmo y ora, con pocas palabras.", apoyo: "Leer un salmo y orar, con pocas palabras" },
              { frente: "Además de orar, ¿cómo ayuda a la familia que sufre?", reverso: "En lo práctico, junto con la iglesia.", apoyo: "Ayudar a la familia en lo práctico, junto con la iglesia" },
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
            apoyo: "está presente, escucha, llora con los que lloran y vuelve cuando los demás se fueron",
            ref: "2 Corintios 1:3-4",
            situacion: "Eres pastor. A medianoche te llama Ana, una hermana de la iglesia: su papá acaba de morir en el hospital.",
            escenas: [
              {
                id: "e1",
                narra: "Llegas al hospital. Ana llora, rodeada de su familia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te quedas a su lado y escuchas más de lo que hablas.", valor: 2, explica: "En esas horas el pastor no necesita palabras perfectas, sino estar presente y escuchar más que hablar." },
                  { texto: "La abrazas y enseguida le das un mensaje largo sobre el cielo.", valor: 1, explica: "Estar con ella está bien, pero en esas horas no hacen falta palabras perfectas: se escucha más que se habla." },
                  { texto: "Le dices por teléfono que mañana pasarás a verla, si puedes.", valor: 0, explica: "En esas horas el pastor no necesita palabras perfectas, sino estar presente con el consuelo de Dios." },
                ],
              },
              {
                id: "e2",
                narra: "Ana te pregunta llorando: ¿Por qué Dios permitió esto?",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lloras con ella, sin darle explicaciones fáciles del dolor.", valor: 2, explica: "Se llora con los que lloran, sin explicaciones fáciles del sufrimiento." },
                  { texto: "Le lees un salmo largo y le explicas cada versículo con detalle.", valor: 1, explica: "Leer un salmo está bien, pero con pocas palabras: ahora se llora con los que lloran." },
                  { texto: "Le explicas con seguridad por qué Dios se llevó a su papá ahora.", valor: 0, explica: "Se llora con los que lloran, sin explicaciones fáciles del sufrimiento." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de irte, la familia te pide que ores con ellos.",
                pregunta: "¿Cómo lo haces?",
                opciones: [
                  { texto: "Lees un salmo y oras con ellos, con pocas palabras.", valor: 2, explica: "Junto a quien sufre se lee un salmo y se ora, con pocas palabras." },
                  { texto: "Oras un largo rato, por todos los temas que se te ocurren.", valor: 1, explica: "Orar está bien, pero junto a quien sufre se ora con pocas palabras." },
                  { texto: "Predicas un sermón largo para que se conviertan los presentes.", valor: 0, explica: "Junto a quien sufre se lee un salmo y se ora, con pocas palabras." },
                ],
              },
              {
                id: "e4",
                narra: "Tres semanas después del funeral, ya casi nadie visita a Ana.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a verla y ves con la iglesia en qué ayudarla.", valor: 2, explica: "El pastor vuelve días y semanas después, cuando los demás ya se fueron, y ayuda a la familia en lo práctico, junto con la iglesia." },
                  { texto: "Le mandas un mensaje para decirle que sigues orando por ella.", valor: 1, explica: "Un mensaje está bien, pero el pastor vuelve a verla días y semanas después, cuando los demás ya se fueron." },
                  { texto: "Ya no la buscas, porque piensas que ya tuvo tiempo de superarlo.", valor: 0, explica: "El pastor vuelve días y semanas después, cuando los demás ya se fueron." },
                ],
              },
            ],
          },
          {
            apoyo: "Una llamada a medianoche, un accidente, un diagnóstico, una muerte: en esas horas el pastor no necesita palabras perfectas, sino estar presente con el consuelo de Dios",
            ref: "Romanos 12:15",
            situacion: "Eres pastor. Los Morales, una familia de la iglesia, acaban de recibir un diagnóstico muy grave de su hijo.",
            escenas: [
              {
                id: "e1",
                narra: "Te piden que vayas a su casa esa misma noche.",
                pregunta: "¿Qué haces al llegar?",
                opciones: [
                  { texto: "Estás presente, los escuchas y lloras con ellos.", valor: 2, explica: "En esas horas el pastor no necesita palabras perfectas: está presente, escucha y llora con los que lloran." },
                  { texto: "Te quedas un momento, oras y te vas pronto para no molestar.", valor: 1, explica: "Orar está bien, pero en esas horas lo que más ayuda es estar presente y escuchar más que hablar." },
                  { texto: "Les das enseguida tres razones de por qué Dios permite el dolor.", valor: 0, explica: "Se llora con los que lloran, sin explicaciones fáciles del sufrimiento." },
                ],
              },
              {
                id: "e2",
                narra: "El papá te pregunta: Pastor, ¿será que Dios nos está castigando?",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te quedas con él y no le das explicaciones fáciles del dolor.", valor: 2, explica: "Se llora con los que lloran, sin explicaciones fáciles del sufrimiento." },
                  { texto: "Le dices que no piense en eso, y le hablas enseguida de otra cosa.", valor: 1, explica: "No darle una explicación fácil está bien, pero el pastor se queda y llora con los que lloran." },
                  { texto: "Le dices que sí, que algo malo habrán hecho para que esto les pase.", valor: 0, explica: "Se acompaña sin explicaciones fáciles del sufrimiento." },
                ],
              },
              {
                id: "e3",
                narra: "Pasan las semanas. El niño sigue en tratamiento, y la familia está agotada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Organizas con la iglesia ayuda práctica para la familia.", valor: 2, explica: "Se ayuda a la familia en lo práctico, junto con la iglesia." },
                  { texto: "Les dices que te llamen a cualquier hora si necesitan algo.", valor: 1, explica: "Ofrecerte está bien, pero se ayuda a la familia en lo práctico, junto con la iglesia." },
                  { texto: "Dejas de visitarlos, porque ya les dijiste todo lo que había que decir.", valor: 0, explica: "El pastor vuelve días y semanas después, y ayuda a la familia en lo práctico." },
                ],
              },
              {
                id: "e4",
                narra: "Meses después, la mayoría de los hermanos ya no pregunta por ellos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a visitarlos, cuando los demás ya se fueron.", valor: 2, explica: "El pastor vuelve días y semanas después, cuando los demás ya se fueron." },
                  { texto: "Pides en el culto que todos oren por ellos, y nada más.", valor: 1, explica: "Pedir oración está bien, pero el pastor vuelve a verlos cuando los demás ya se fueron." },
                  { texto: "Esperas a que ellos te busquen, si es que todavía necesitan algo.", valor: 0, explica: "El pastor vuelve días y semanas después, cuando los demás ya se fueron." },
                ],
              },
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
            consigna: "¿Es una señal del agotamiento o una forma de prevenir la caída? Lleva cada frase a su grupo.",
            grupos: ["Señal del agotamiento", "Ayuda a prevenir la caída"],
            frases: [
              { texto: "Un cansancio que no se quita", grupo: 0 },
              { texto: "La irritación", grupo: 0 },
              { texto: "La falta de gozo", grupo: 0 },
              { texto: "El deseo de huir", grupo: 0 },
              { texto: "Tener un día de descanso", grupo: 1 },
              { texto: "Cultivar amistades", grupo: 1 },
              { texto: "Tener un mentor", grupo: 1 },
              { texto: "Poner límites claros", grupo: 1 },
            ],
            apoyo: "El agotamiento se nota en el cansancio que no se quita, la irritación, la falta de gozo y el deseo de huir",
            explica: "El agotamiento se nota en el cansancio que no se quita, la irritación, la falta de gozo y el deseo de huir; para no caer, el pastor necesita descanso, amistades, un mentor y límites claros.",
          },
          {
            consigna: "¿Puede llevar a una caída o ayuda a no caer? Lleva cada frase a su grupo.",
            grupos: ["Puede llevar a una caída", "Ayuda a no caer"],
            frases: [
              { texto: "Un pastor agotado que no descansa", grupo: 0 },
              { texto: "Vivir aislado, sin amigos cercanos", grupo: 0 },
              { texto: "No rendir cuentas a nadie", grupo: 0 },
              { texto: "Creer que uno está tan firme que no puede caer", grupo: 0, explica: "«el que piensa estar firme, mire que no caiga»." },
              { texto: "Un mentor que le pregunta cómo está", grupo: 1 },
              { texto: "Descansar y cuidar sus amistades", grupo: 1 },
              { texto: "Límites claros en su vida y su ministerio", grupo: 1 },
            ],
            apoyo: "Muchas caídas morales empiezan por ahí: un pastor agotado, aislado y sin rendir cuentas",
            ref: "1 Corintios 10:12",
            explica: "Muchas caídas morales empiezan con un pastor agotado, aislado y sin rendir cuentas, y la advertencia es para todos: «el que piensa estar firme, mire que no caiga». Ayudan a no caer el descanso, las amistades, un mentor y los límites claros.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se unen las señales, el agotamiento, la caída y lo que la previene? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "senales", texto: "Cansancio, irritación, falta de gozo", x: 50, y: 10 },
              { id: "agotamiento", texto: "El agotamiento", x: 20, y: 50 },
              { id: "caida", texto: "Una caída moral", x: 50, y: 90 },
              { id: "cuidado", texto: "Descanso, amistades y un mentor", x: 80, y: 50 },
            ],
            enlaces: [
              { de: "senales", a: "agotamiento", relacion: "son señales de" },
              { de: "agotamiento", a: "caida", relacion: "puede llevar a" },
              { de: "cuidado", a: "caida", relacion: "ayudan a prevenir" },
            ],
            distractores: ["son premios de", "no tiene que ver con"],
            apoyo: "Por eso necesita descanso, amistades, un mentor y límites claros",
            explica: "El cansancio que no se quita, la irritación y la falta de gozo son señales del agotamiento; muchas caídas morales empiezan por ahí; y el descanso, las amistades y un mentor ayudan a prevenirlas.",
          },
          {
            consigna: "¿Cómo empieza una caída y qué ayuda a no caer? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "huir", texto: "El deseo de huir", x: 15, y: 12 },
              { id: "agotado", texto: "Un pastor agotado", x: 50, y: 42 },
              { id: "aislado", texto: "Aislado y sin rendir cuentas", x: 85, y: 12 },
              { id: "caida", texto: "Una caída moral", x: 50, y: 90 },
              { id: "limites", texto: "Un mentor y límites claros", x: 15, y: 72 },
            ],
            enlaces: [
              { de: "huir", a: "agotado", relacion: "es una señal de" },
              { de: "agotado", a: "caida", relacion: "puede llevar a" },
              { de: "aislado", a: "caida", relacion: "puede llevar a" },
              { de: "limites", a: "caida", relacion: "ayudan a prevenir" },
            ],
            distractores: ["es un premio de", "no tiene que ver con"],
            apoyo: "Muchas caídas morales empiezan por ahí: un pastor agotado, aislado y sin rendir cuentas",
            explica: "El deseo de huir es una señal del agotamiento; muchas caídas morales empiezan con un pastor agotado, aislado y sin rendir cuentas; y un mentor y los límites claros ayudan a prevenirlas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Al final de su vida, ¿qué había guardado Pablo? Toca las palabras que lo dicen.",
            texto: "He peleado la buena batalla, he acabado la carrera, he guardado [[la fe]]",
            apoyo: "Al final de su vida, Pablo pudo decir: «He peleado la buena batalla, he acabado la carrera, he guardado la fe»",
            ref: "2 Timoteo 4:7",
            explica: "Pablo pudo decir: «He peleado la buena batalla, he acabado la carrera, he guardado la fe». La meta no es solo empezar con fuerza, sino terminar fiel.",
          },
          {
            consigna: "¿Qué había acabado Pablo al final de su vida? Toca las palabras que lo dicen.",
            texto: "He peleado la buena batalla, he acabado [[la carrera]], he guardado la fe",
            apoyo: "La meta no es solo empezar con fuerza, sino terminar fiel",
            ref: "2 Timoteo 4:7",
            explica: "Al final de su vida, Pablo pudo decir que había acabado la carrera: la meta no es solo empezar con fuerza, sino terminar fiel.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que dice la lección sobre terminar el ministerio.",
            texto: "Terminar [[bien]] se decide en las [[pequeñas]] decisiones de cada [[día]].",
            distractores: ["rápido", "grandes", "año"],
            errores: {
              "rápido": "La meta no es solo empezar con fuerza, sino terminar fiel: terminar bien.",
              grandes: "Terminar bien se decide en las pequeñas decisiones de cada día.",
              "año": "Se decide en las pequeñas decisiones de cada día.",
            },
            apoyo: "Terminar bien se decide en las pequeñas decisiones de cada día",
            ref: "2 Timoteo 4:7",
            explica: "La meta es terminar bien, como Pablo, y eso se decide en las pequeñas decisiones de cada día.",
          },
          {
            consigna: "Completa cómo terminó Pablo su carrera.",
            texto: "Pablo terminó [[fiel]]: al final de su [[vida]] pudo decir que había peleado la buena [[batalla]].",
            distractores: ["dudando", "juventud", "excusa"],
            errores: {
              dudando: "Pablo terminó fiel: pudo decir que había guardado la fe.",
              juventud: "Lo dijo al final de su vida.",
              excusa: "Pablo pudo decir: «He peleado la buena batalla».",
            },
            apoyo: "La meta no es solo empezar con fuerza, sino terminar fiel",
            ref: "2 Timoteo 4:7",
            explica: "Al final de su vida, Pablo pudo decir: «He peleado la buena batalla, he acabado la carrera, he guardado la fe». La meta no es solo empezar con fuerza, sino terminar fiel.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El pastor consuela con el consuelo que él mismo recibe",
            ref: "2 Corintios 1:3-4",
            clave: {
              id: "pr-n5-teologia-pastoral-6-a7-1",
              tipo: "corta",
              pregunta: "¿Con qué consuelo consuela el pastor, según 2 Corintios 1:3-4, y cómo acompaña a quien está en el dolor?",
              ideas: [
                { id: "consuelo", peso: 40, texto: "Con el consuelo que él mismo recibe de Dios, el Dios de toda consolación, que nos consuela para que consolemos a otros.", formas: ["consuelo que (recibe|recibimos|recibio)", "consuelo que dios", "consuelo de dios", "(mismo|propio) consuelo", "dios de toda consolacion", "padre de misericordias", "(dios|el) (nos|lo|le|me) consuela", "consolar a (otros|los|demas)", "consolemos a"] },
                { id: "presente", peso: 30, texto: "Está presente y escucha más que habla.", formas: ["presente", "escucha*", "acompan*"] },
                { id: "llora", peso: 30, texto: "Llora con los que lloran, sin explicaciones fáciles, y vuelve días y semanas después.", formas: ["llor* con", "con los que lloran", "sin explicaciones", "vuelv*", "volver", "dias y semanas", "lo practico", "un salmo", "pocas palabras"] },
              ],
              modelo: "Consuela con el consuelo que él mismo recibe de Dios, el Dios de toda consolación, que nos consuela para que consolemos a otros. Está presente y escucha más que habla, llora con los que lloran sin explicaciones fáciles y vuelve días y semanas después.",
            },
          },
          {
            apoyo: "Estar presente y escuchar más que hablar",
            ref: "Romanos 12:15",
            clave: {
              id: "pr-n5-teologia-pastoral-6-a7-2",
              tipo: "corta",
              pregunta: "Un líder que formas te dice: Cuando alguien sufre, no sé qué decirle. ¿Qué le enseñas sobre acompañar en el dolor?",
              ideas: [
                { id: "presente", peso: 40, texto: "Que no necesita palabras perfectas: lo que hace falta es estar presente y escuchar más que hablar.", formas: ["presente", "escuch*", "palabras perfectas"] },
                { id: "llorar", peso: 30, texto: "Llorar con los que lloran, sin explicaciones fáciles del sufrimiento, y orar con pocas palabras.", formas: ["llor* con", "los que lloran", "sin explicaciones", "explicaciones faciles", "pocas palabras", "un salmo"] },
                { id: "volver", peso: 30, texto: "Volver días y semanas después y ayudar a la familia en lo práctico, junto con la iglesia.", formas: ["vuelv*", "volver", "dias y semanas", "semanas despues", "lo practico", "ayud* familia"] },
              ],
              modelo: "Le enseño que no necesita palabras perfectas, sino estar presente y escuchar más que hablar. Puede llorar con los que lloran, sin explicaciones fáciles, leer un salmo y orar con pocas palabras, y volver días y semanas después para ayudar en lo práctico.",
            },
          },
        ],
      },
    ],
  },
};
