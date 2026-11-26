/**
 * Las prácticas de «Cuidado y consejería básica» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-consejeria-basica.ts), con la guía de docs/academia-practicas.md.
 *
 * Esta materia trata con personas que sufren: las buenas opciones son las que enseña la lección (escuchar, orar,
 * acompañar, guardar la confianza dentro de sus límites, derivar al pastor o a un profesional y reportar el abuso a
 * las autoridades). En los casos de riesgo, la buena nunca es guardar el secreto ni resolverlo solo.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_CONSEJERIA_BASICA: PracticasMateria = {
  materia: "n3-consejeria-basica",
  mision: {
    titulo: "Llevar las cargas los unos de los otros",
    intro:
      "Tu pastor te pidió formar un equipo de cuidado en tu célula. Vas a acompañar a hermanos que sufren: escucharlos, orar con ellos, estar presente en el duelo y en la crisis, saber cuándo pedir ayuda y guardar la confianza que te den. Repasa las seis lecciones para estar listo.",
    cierre:
      "Ya puedes acompañar a otros como enseña la Palabra: escuchar primero, orar con la persona, usar la Escritura a su tiempo, estar presente en el dolor, derivar a tiempo y proteger al débil, y guardar la confianza dentro de sus límites, sin dejar de cuidar tu propia vida. Hazlo siempre bajo la guía de tu pastor.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El llamado a cuidar
    "n3-consejeria-basica-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué manda Pablo en Gálatas 6:2?", reverso: "Que sobrellevemos los unos las cargas de los otros, y cumplamos así la ley de Cristo.", apoyo: "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo" },
              { frente: "¿De quién es la tarea de cuidar a los hermanos?", reverso: "De todo el cuerpo de Cristo, no solo del pastor.", apoyo: "Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo" },
              { frente: "¿Qué consuelo compartimos con los que sufren?", reverso: "El mismo consuelo que recibimos de Dios.", apoyo: "El consuelo que recibimos de Dios es el que compartimos con otros" },
              { frente: "¿Con qué nombre anunció el profeta al Mesías?", reverso: "«Admirable, Consejero».", apoyo: "El profeta anunció que el Mesías se llamaría «Admirable, Consejero»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es el cuidado entre hermanos?", reverso: "Escuchar, orar, animar con la Palabra y acompañar.", apoyo: "El cuidado entre hermanos: escuchar, orar, animar con la Palabra y acompañar" },
              { frente: "¿Cómo llama Pablo a Dios en 2 Corintios 1:3?", reverso: "«Padre de misericordias y Dios de toda consolación».", apoyo: "Dios es el «Padre de misericordias y Dios de toda consolación»" },
              { frente: "¿Para qué nos consuela Dios en nuestras tribulaciones?", reverso: "Para que también nosotros consolemos a los que sufren.", apoyo: "para que podamos también nosotros consolar a los que están en cualquier tribulación" },
              { frente: "¿A quién prometió Jesús para ayudarnos a ayudar?", reverso: "Al Espíritu Santo, el Consolador.", apoyo: "Y prometió el Espíritu Santo, el Consolador, que nos ayuda a ayudar" },
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
            consigna: "Completa el llamado a cuidar a los hermanos.",
            texto: "[[Todo]] creyente está llamado a sobrellevar las [[cargas]] de los otros con el [[consuelo]] que recibe de Dios.",
            distractores: ["ningún", "riquezas", "regaño"],
            errores: {
              "ningún": "El llamado es para todo creyente: cuidar a los hermanos no es tarea solo del pastor, es parte de la vida de todo el cuerpo de Cristo.",
              riquezas: "Gálatas 6:2 manda sobrellevar los unos las cargas de los otros.",
              "regaño": "Las cargas de los otros se sobrellevan con el consuelo que recibimos de Dios.",
            },
            apoyo: "Todo creyente está llamado a sobrellevar las cargas de los otros",
            ref: "Gálatas 6:2",
            explica: "Todo creyente, y no solo el pastor, está llamado a sobrellevar las cargas de los otros con el consuelo que recibe de Dios.",
          },
          {
            consigna: "Completa cómo responde quien cuida a los hermanos.",
            texto: "Esta materia te prepara para responder con [[amor]], con la [[Palabra]] y con [[prudencia]].",
            distractores: ["enojo", "fuerza", "prisa"],
            errores: {
              enojo: "A quien ya no puede más se le responde con amor.",
              fuerza: "Se responde con la Palabra: todo creyente maduro puede animar y aconsejar con ella.",
              prisa: "Se responde con prudencia: quien cuida conoce sus límites.",
            },
            apoyo: "Esta materia te prepara para responder con amor, con la Palabra y con prudencia",
            ref: "Gálatas 6:2",
            explica: "Cuando alguien de tu grupo ya no puede más, se le responde con amor, con la Palabra y con prudencia: así se sobrellevan las cargas de los otros.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué nivel de ayuda es cada uno? Lleva cada frase a su grupo.",
            grupos: ["Cuidado entre hermanos", "Consejería pastoral", "Ayuda profesional"],
            frases: [
              { texto: "Escuchar, orar y acompañar a un hermano", grupo: 0 },
              { texto: "Animar con la Palabra a quien está desanimado", grupo: 0 },
              { texto: "Es tarea de todo creyente", grupo: 0 },
              { texto: "A cargo del pastor y de los líderes preparados", grupo: 1 },
              { texto: "Una crisis de familia", grupo: 1 },
              { texto: "Un pecado que se repite", grupo: 1 },
              { texto: "Médicos, psicólogos y consejeros profesionales", grupo: 2 },
              { texto: "La depresión grave, las adicciones o los traumas", grupo: 2 },
            ],
            apoyo: "Hay tres niveles de ayuda: el cuidado entre hermanos, la consejería pastoral y la ayuda profesional",
            explica: "El cuidado entre hermanos es escuchar, orar, animar con la Palabra y acompañar; la consejería pastoral acompaña problemas más hondos, como las crisis de familia; y la ayuda profesional atiende lo que pide una formación especial.",
          },
          {
            consigna: "¿Quién atiende mejor cada necesidad? Lleva cada frase a su grupo.",
            grupos: ["Todo creyente", "El pastor y los líderes", "Médicos, psicólogos o consejeros"],
            frases: [
              { texto: "Una hermana que necesita que la escuchen", grupo: 0 },
              { texto: "Un amigo que pide que oren por él", grupo: 0 },
              { texto: "Un compañero que necesita ánimo", grupo: 0 },
              { texto: "Una crisis en la familia", grupo: 1 },
              { texto: "Un pecado que vuelve una y otra vez", grupo: 1 },
              { texto: "Una depresión grave", grupo: 2 },
              { texto: "Una adicción", grupo: 2 },
              { texto: "Un trauma", grupo: 2 },
            ],
            apoyo: "La ayuda profesional: médicos, psicólogos y consejeros profesionales atienden lo que pide una formación especial, como la depresión grave, las adicciones o los traumas",
            explica: "Escuchar, orar y animar es para todo creyente; los problemas más hondos, como las crisis de familia o el pecado que se repite, los acompañan el pastor y los líderes; y la depresión grave, las adicciones o los traumas piden una formación especial.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un compañero de tu célula te dice: Me quedé sin trabajo. Prométeme que Dios me va a dar otro este mes.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no puedes prometerle eso, pero que vas a orar con él y acompañarlo.", bien: true, explica: "No prometemos lo que no podemos cumplir; sí podemos orar, animar con la Palabra y acompañar." },
              { texto: "Que sí, que se lo prometes de todo corazón, para que no pierda la esperanza.", explica: "Quien cuida conoce sus límites: no prometemos lo que no podemos cumplir." },
              { texto: "Que eso no es asunto tuyo, y que mejor vaya a hablar con el pastor de la iglesia.", explica: "Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo." },
              { texto: "Que te haga caso en todo y busque solo el trabajo que tú le vas a decir.", explica: "Cuidar no es controlar: ayudar no es decidir por el otro ni meterse en todo." },
            ],
            apoyo: "no prometemos lo que no podemos cumplir",
            explica: "Todo creyente maduro puede animar y aconsejar con la Palabra, pero sabe hasta dónde llega: no prometemos lo que no podemos cumplir.",
          },
          {
            caso: "Una joven de tu grupo te escribe: Me ofrecieron dos trabajos. Tú dime cuál acepto y yo hago lo que digas.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que orarás con ella y la ayudarás a buscar a Dios para que ella decida.", bien: true, explica: "Acompañamos a la persona para que ella misma busque a Dios y tome buenas decisiones." },
              { texto: "Que acepte el que tú le digas, y así ya no tiene que pensarlo más.", explica: "Ayudar no es decidir por el otro ni meterse en todo." },
              { texto: "Que no te moleste con esas cosas, y que mejor se lo pregunte al pastor.", explica: "Cuidar a los hermanos es parte de la vida de todo el cuerpo de Cristo, no tarea solo del pastor." },
              { texto: "Que acepte el que paga más, y que te avise cuando ya lo haya hecho.", explica: "Ayudar no es decidir por el otro: acompañamos para que ella misma tome buenas decisiones." },
            ],
            apoyo: "Acompañamos a la persona para que ella misma busque a Dios y tome buenas decisiones",
            explica: "Cuidar no es controlar: acompañamos a la persona para que ella misma busque a Dios y tome buenas decisiones.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los alcances y los límites de quien cuida: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todo creyente maduro puede animar y aconsejar con la Palabra.", verdad: true, explica: "Pablo confiaba en que los creyentes de Roma podían amonestarse los unos a los otros.", apoyo: "Todo creyente maduro puede animar y aconsejar con la Palabra", ref: "Romanos 15:14" },
              { texto: "Quien cuida a otros puede diagnosticar una enfermedad si conoce bien a la persona.", verdad: false, explica: "Hay que saber hasta dónde llega uno: no diagnosticamos enfermedades.", apoyo: "no diagnosticamos enfermedades" },
              { texto: "Quien cuida acompaña a la persona para que ella misma tome buenas decisiones.", verdad: true, explica: "Cuidar no es controlar: acompañamos para que ella misma busque a Dios y tome buenas decisiones.", apoyo: "Acompañamos a la persona para que ella misma busque a Dios y tome buenas decisiones" },
            ],
          },
          {
            consigna: "Sobre el modelo de Jesús y los límites del que cuida: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El cuidado entre hermanos reemplaza al médico y al pastor.", verdad: false, explica: "Quien cuida conoce sus límites: no reemplazamos al médico ni al pastor.", apoyo: "no reemplazamos al médico ni al pastor" },
              { texto: "Jesús escuchaba, hacía preguntas, consolaba y decía la verdad con amor.", verdad: true, explica: "Es el modelo de Jesús, el Admirable Consejero, para quien cuida a otros.", apoyo: "Jesús escuchaba, hacía preguntas, consolaba y decía la verdad con amor", ref: "Isaías 9:6" },
              { texto: "Cuidar bien a alguien es decidir por él lo que más le conviene.", verdad: false, explica: "Cuidar no es controlar: ayudar no es decidir por el otro ni meterse en todo.", apoyo: "Ayudar no es decidir por el otro ni meterse en todo" },
              { texto: "El Espíritu Santo, el Consolador, nos ayuda a ayudar.", verdad: true, explica: "Jesús prometió el Espíritu Santo, el Consolador, que nos ayuda a ayudar.", apoyo: "Y prometió el Espíritu Santo, el Consolador, que nos ayuda a ayudar" },
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
            apoyo: "La consejería pastoral: el pastor y los líderes preparados acompañan problemas más hondos, como las crisis de familia o el pecado que se repite",
            ref: "Gálatas 6:2",
            situacion: "Eres líder de célula. Al terminar la reunión, Andrés te pide hablar: él y su esposa discuten todos los días y ya no sabe qué hacer.",
            escenas: [
              {
                id: "e1",
                narra: "Andrés se sienta contigo, cansado y triste.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lo escuchas con calma y, cuando termina, oras con él.", valor: 2, explica: "El cuidado entre hermanos es escuchar, orar, animar con la Palabra y acompañar." },
                  { texto: "Le lees enseguida varios versículos sobre el matrimonio.", valor: 1, explica: "Animar con la Palabra es parte del cuidado, pero Jesús primero escuchaba y hacía preguntas." },
                  { texto: "Le dices que eso le toca al pastor y te despides de él.", valor: 0, explica: "Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo." },
                ],
              },
              {
                id: "e2",
                narra: "Andrés te pregunta: ¿Tú qué harías? ¿Me separo o no?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que le vas a ayudar a buscar a Dios para que él decida bien.", valor: 2, explica: "Cuidar no es controlar: acompañamos a la persona para que ella misma busque a Dios y tome buenas decisiones." },
                  { texto: "Que esa decisión es solo suya, y ya no le dices nada más.", valor: 1, explica: "No decides por él, y eso está bien; pero cuidar también es acompañarlo y animarlo con la Palabra." },
                  { texto: "Que se separe ya mismo, para que los dos dejen de sufrir tanto.", valor: 0, explica: "Ayudar no es decidir por el otro ni meterse en todo." },
                ],
              },
              {
                id: "e3",
                narra: "Pasan las semanas y las peleas siguen. Andrés está cada vez más desanimado.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Lo animas a buscar consejería con el pastor, y tú lo sigues acompañando.", valor: 2, explica: "Las crisis de familia las acompañan el pastor y los líderes preparados; tú sigues escuchando, orando y acompañando." },
                  { texto: "Sigues escuchándolo tú solo cada semana, aunque el caso ya te queda grande.", valor: 1, explica: "Tu cuidado vale, pero quien cuida conoce sus límites: los problemas más hondos los acompaña la consejería pastoral." },
                  { texto: "Le prometes que, si te hace caso, su matrimonio se va a arreglar.", valor: 0, explica: "No prometemos lo que no podemos cumplir." },
                ],
              },
            ],
          },
          {
            apoyo: "La ayuda profesional: médicos, psicólogos y consejeros profesionales atienden lo que pide una formación especial, como la depresión grave, las adicciones o los traumas",
            ref: "Romanos 15:14",
            situacion: "Eres servidor en el grupo de jóvenes. Paola te cuenta que desde hace meses no duerme bien, llora casi todos los días y ya no quiere salir.",
            escenas: [
              {
                id: "e1",
                narra: "Paola habla bajito y no te mira.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La escuchas con atención y le preguntas cómo puedes ayudarla.", valor: 2, explica: "Es el modelo de Jesús: escuchaba, hacía preguntas, consolaba y decía la verdad con amor." },
                  { texto: "Le das un versículo de ánimo y le dices que ore más seguido.", valor: 1, explica: "Animar con la Palabra es parte del cuidado, pero primero hay que escuchar, como hacía Jesús." },
                  { texto: "Le dices que no es para tanto, que a todos les pasa de vez en cuando.", valor: 0, explica: "Jesús escuchaba, hacía preguntas y consolaba: quien cuida sigue su modelo." },
                ],
              },
              {
                id: "e2",
                narra: "Paola te pregunta: ¿Será que tengo depresión?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que tú no puedes saberlo, y que es bueno que la vea un médico.", valor: 2, explica: "No diagnosticamos enfermedades: la depresión grave la atienden médicos, psicólogos y consejeros profesionales." },
                  { texto: "Que sí, que por todo lo que te cuenta seguro es una depresión.", valor: 0, explica: "Hay que saber hasta dónde llega uno: no diagnosticamos enfermedades." },
                  { texto: "Que mejor no piense en eso y que solo siga orando cada día.", valor: 0, explica: "Orar es bueno, pero no reemplazamos al médico: la depresión grave pide una formación especial." },
                ],
              },
              {
                id: "e3",
                narra: "Paola ya tiene una cita con el médico, pero sigue muy triste.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Sigues cerca: la escuchas, oras por ella y la acompañas.", valor: 2, explica: "El cuidado entre hermanos sigue: escuchar, orar, animar con la Palabra y acompañar." },
                  { texto: "Dejas de buscarla, porque ahora su problema le toca al médico.", valor: 0, explica: "No reemplazamos al médico, pero el cuidado entre hermanos sigue: es para todo creyente." },
                  { texto: "Le dices que ya no necesita al médico si ora contigo cada día.", valor: 0, explica: "La ayuda profesional atiende lo que pide una formación especial: no reemplazamos al médico." },
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
            apoyo: "Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo",
            ref: "Gálatas 6:2",
            clave: {
              id: "pr-n3-consejeria-basica-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué manda Gálatas 6:2, y de quién es la tarea de cuidar a los hermanos?",
              ideas: [
                { id: "cargas", peso: 50, texto: "Gálatas 6:2 manda sobrellevar los unos las cargas de los otros, y cumplir así la ley de Cristo.", formas: ["sobrellev*", "llev* cargas", "ayud* cargas", "carg* con (los|sus|las)", "ley de cristo"] },
                { id: "todos", peso: 50, texto: "Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo.", formas: ["todo el cuerpo", "cuerpo de cristo", "todo creyente", "todos los creyentes", "toda la iglesia", "todos los cristianos", "(cada|todo) cristiano", "todos nosotros", "todos (debemos|tenemos)"] },
              ],
              errores: [
                { id: "solo-pastor", texto: "Cuidar a los hermanos no es tarea solo del pastor: es parte de la vida de todo el cuerpo de Cristo.", formas: ["solo (del|el|al|los|de) pastor*", "(toca|corresponde|pertenece) (al|el|los) pastor*"], anula: "todos" },
                { id: "propia-carga", texto: "Gálatas 6:2 manda sobrellevar los unos las cargas de los otros.", formas: ["propia carga", "propias cargas"], anula: "cargas" },
              ],
              modelo: "Gálatas 6:2 manda sobrellevar los unos las cargas de los otros, y así cumplir la ley de Cristo. Cuidar a los hermanos es tarea de todo el cuerpo de Cristo, de todo creyente, y no solo del pastor.",
            },
          },
          {
            apoyo: "El consuelo que recibimos de Dios es el que compartimos con otros",
            ref: "2 Corintios 1:3-4",
            clave: {
              id: "pr-n3-consejeria-basica-1-a7-2",
              tipo: "corta",
              pregunta: "Según 2 Corintios 1:3-4, ¿de dónde viene el consuelo que damos a otros, y para qué nos consuela Dios?",
              ideas: [
                { id: "dios", peso: 50, texto: "El consuelo viene de Dios, el Padre de misericordias y Dios de toda consolación.", formas: ["(viene|recib*|sale|nace|es) de dios", "dios (nos|me|te) consuel*", "dios de toda consolacion", "padre de misericordias", "consuelo de dios", "consuelo que dios", "consuelo del senor"] },
                { id: "compartir", peso: 50, texto: "Nos consuela para que también nosotros consolemos a los que están en cualquier tribulación: compartimos con otros el consuelo que recibimos.", formas: ["consol* a (otros|los|las|quienes|nuestros|mis|alguien|personas|hermanos|demas)", "compart* (lo|con|el|ese|su|eso|ese)", "para que (podamos|nosotros|tambien) (consol*|ayud*|compart*)", "(dar|demos|damos|darlo) (consuelo|lo) a", "a los que (estan|sufren|pasan)"] },
              ],
              modelo: "El consuelo viene de Dios, que es el Padre de misericordias y Dios de toda consolación. Él nos consuela en nuestras tribulaciones para que también nosotros podamos consolar a los que sufren y compartir ese consuelo con otros.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Escuchar: el primer paso
    "n3-consejeria-basica-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pide Santiago 1:19?", reverso: "Ser pronto para oír, tardo para hablar y tardo para airarse.", apoyo: "todo hombre sea pronto para oír, tardo para hablar, tardo para airarse" },
              { frente: "¿Qué hizo Jesús con los dos discípulos tristes de Emaús?", reverso: "Les preguntó, los dejó contar su dolor y después les abrió las Escrituras.", apoyo: "Los dejó contar su dolor y solo después les abrió las Escrituras" },
              { frente: "¿Qué ayudan a sacar a la luz las buenas preguntas?", reverso: "Lo que la persona lleva dentro.", apoyo: "Las buenas preguntas ayudan a sacar a la luz lo que la persona lleva dentro" },
              { frente: "¿Qué hicieron bien al principio los amigos de Job?", reverso: "Se sentaron con él siete días en silencio.", apoyo: "Los amigos de Job empezaron bien: se sentaron con él siete días en silencio" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué advierte Proverbios 18:13?", reverso: "Que responder antes de oír trae fatuidad y oprobio.", apoyo: "Al que responde palabra antes de oír, Le es fatuidad y oprobio" },
              { frente: "¿Qué abre el corazón para recibir la Palabra?", reverso: "Escuchar primero.", apoyo: "Escuchar primero abre el corazón para recibir la Palabra" },
              { frente: "¿Qué es una pregunta abierta?", reverso: "Una que no se responde con sí o no.", apoyo: "Haz preguntas abiertas, que no se responden con sí o no" },
              { frente: "¿En qué se equivocaron después los amigos de Job?", reverso: "Hablaron sin entender y lo culparon de su sufrimiento.", apoyo: "Se equivocaron después, cuando hablaron sin entender y lo culparon de su sufrimiento" },
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
            consigna: "Según Santiago 1:19, ¿para qué hay que ser tardo? Toca las dos palabras.",
            texto: "todo hombre sea pronto para oír, tardo para [[hablar]], tardo para [[airarse]]",
            apoyo: "Antes de hablar, hay que entender",
            ref: "Santiago 1:19",
            explica: "Santiago pide ser pronto para oír y tardo para hablar y para airarse: antes de hablar, hay que entender.",
          },
          {
            consigna: "Según Proverbios 18:13, ¿cuándo es fatuidad responder? Toca las palabras que lo dicen.",
            texto: "Al que responde palabra [[antes de oír]], Le es fatuidad y oprobio",
            apoyo: "Escuchar es el primer paso para ayudar",
            ref: "Proverbios 18:13",
            explica: "Responder antes de oír es fatuidad y oprobio: escuchar es el primer paso para ayudar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada habilidad para escuchar con lo que se hace.",
            pares: [
              ["Dar toda tu atención", "Guardar el teléfono y mirar a la persona"],
              ["Hacer preguntas abiertas", "Preguntar: ¿cómo te sientes con eso?"],
              ["Reflejar lo que oyes", "Repetir con tus palabras lo que entendiste"],
              ["Aceptar sus emociones", "No corregir su tristeza con un regaño"],
            ],
            apoyo: "Se escucha dando toda la atención, con preguntas abiertas, reflejando lo que se oye y aceptando las emociones",
            explica: "Se da toda la atención guardando el teléfono; las preguntas abiertas no se responden con sí o no; reflejar es repetir con tus palabras lo que entendiste; y las emociones se aceptan sin juzgarlas.",
          },
          {
            consigna: "¿Qué habilidad para escuchar practica cada ejemplo? Une cada ejemplo con su habilidad.",
            pares: [
              ["Buscar un lugar tranquilo para hablar", "Dar toda la atención"],
              ["Preguntar: ¿qué pasó después?", "Hacer una pregunta abierta"],
              ["Decir con tus palabras lo que entendiste", "Reflejar lo que se oye"],
              ["Dejar que llore sin regañarla", "Aceptar las emociones sin juzgarlas"],
            ],
            apoyo: "Acepta sus emociones sin juzgarlas: la tristeza, el miedo o el enojo no se corrigen con un regaño",
            explica: "Buscar un lugar tranquilo es dar toda la atención; ¿qué pasó después? es una pregunta abierta; decir lo que entendiste es reflejar; y dejar que llore sin regañarla es aceptar sus emociones.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se escucha bien o es un error común? Lleva cada frase a su grupo.",
            grupos: ["Así se escucha bien", "Es un error al escuchar"],
            frases: [
              { texto: "Mirar a la persona mientras habla", grupo: 0 },
              { texto: "Dejar que termine de contar lo que le pasa", grupo: 0 },
              { texto: "Quedarse callado cuando hace falta", grupo: 0 },
              { texto: "Interrumpir para corregirla", grupo: 1 },
              { texto: "Contarle enseguida tu propia historia", grupo: 1 },
              { texto: "Darle una solución antes de que termine", grupo: 1 },
              { texto: "Regañarla por lo que siente", grupo: 1 },
            ],
            apoyo: "No interrumpas, no cuentes enseguida tu propia historia y no te apures a dar soluciones",
            explica: "Se escucha mirando a la persona, dejándola terminar y sin miedo al silencio; interrumpir, contar enseguida tu historia, apurar soluciones o regañar por lo que siente son errores.",
          },
          {
            consigna: "¿Ayuda a escuchar o estorba? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a escuchar", "Estorba al escuchar"],
            frases: [
              { texto: "Guardar el teléfono", grupo: 0 },
              { texto: "Preguntar: ¿cómo te sientes con eso?", grupo: 0 },
              { texto: "Repetir con tus palabras lo que entendiste", grupo: 0 },
              { texto: "Revisar los mensajes mientras te habla", grupo: 1 },
              { texto: "Decirle: eso no es para tanto", grupo: 1, explica: "Las emociones se aceptan sin juzgarlas." },
              { texto: "Cortarle la frase para dar tu consejo", grupo: 1 },
              { texto: "Culparla de lo que está sufriendo", grupo: 1, explica: "En eso se equivocaron los amigos de Job." },
            ],
            apoyo: "Se escucha dando toda la atención, con preguntas abiertas, reflejando lo que se oye y aceptando las emociones, sin interrumpir, juzgar ni apurar consejos",
            explica: "Ayuda guardar el teléfono, hacer preguntas abiertas y reflejar lo que se oye; estorba distraerse, juzgar sus emociones, interrumpir con consejos o culparla, como hicieron los amigos de Job.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo te dice: Estoy enojado con mi papá. Siempre me trata como si yo no sirviera para nada.",
            pregunta: "¿Qué le respondes primero?",
            opciones: [
              { texto: "¿Cómo te sientes cuando te trata así? Cuéntame, te escucho.", bien: true, explica: "Es una pregunta abierta: no se responde con sí o no y le ayuda a sacar a la luz lo que lleva dentro." },
              { texto: "No deberías enojarte con tu papá; eso no está bien y tú lo sabes.", explica: "Acepta sus emociones sin juzgarlas: el enojo no se corrige con un regaño." },
              { texto: "Te entiendo: mi papá también era así, déjame contarte lo que pasó.", explica: "No cuentes enseguida tu propia historia: ahora le toca a él contar." },
              { texto: "Lo que tienes que hacer es hablar con él hoy mismo y arreglarlo.", explica: "No te apures a dar soluciones: antes de hablar, hay que entender." },
            ],
            apoyo: "Haz preguntas abiertas, que no se responden con sí o no",
            explica: "Escuchar es el primer paso: una pregunta abierta y tu atención valen más que un regaño, tu propia historia o un consejo rápido.",
          },
          {
            caso: "Una hermana de tu célula te dice: Hoy perdí el trabajo y no sé qué voy a hacer con mis hijos.",
            pregunta: "¿Qué haces primero?",
            opciones: [
              { texto: "La dejas terminar de contar y le preguntas cómo se siente con eso.", bien: true, explica: "Antes de hablar, hay que entender: no interrumpas y haz preguntas abiertas." },
              { texto: "La interrumpes para darle tres ideas de dónde buscar trabajo mañana.", explica: "No interrumpas ni te apures a dar soluciones: primero hay que entender." },
              { texto: "Le preguntas qué hizo mal para que la despidieran de ese trabajo.", explica: "Eso es juzgarla: los amigos de Job se equivocaron cuando hablaron sin entender y lo culparon de su sufrimiento." },
              { texto: "Le cuentas cómo encontraste tú trabajo la última vez que lo perdiste.", explica: "No cuentes enseguida tu propia historia: ahora le toca a ella hablar." },
            ],
            apoyo: "No interrumpas, no cuentes enseguida tu propia historia y no te apures a dar soluciones",
            explica: "Se escucha sin interrumpir, juzgar ni apurar consejos: primero se deja contar a la persona, como hizo Jesús camino a Emaús.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Da toda tu atención: guarda el teléfono, mira a la persona y busca un lugar tranquilo",
            ref: "Santiago 1:19",
            situacion: "Eres líder de célula. Al terminar la reunión, Carmen se queda y te dice que necesita hablar. Se nota triste.",
            escenas: [
              {
                id: "e1",
                narra: "Los demás se despiden y tu teléfono no deja de vibrar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Guardas el teléfono y la invitas a sentarse en un lugar tranquilo.", valor: 2, explica: "Da toda tu atención: guarda el teléfono, mira a la persona y busca un lugar tranquilo." },
                  { texto: "La escuchas de pie en la puerta, mientras los demás se van saliendo.", valor: 1, explica: "La escuchas, pero sin toda tu atención: conviene buscar un lugar tranquilo." },
                  { texto: "Le dices que hable mientras tú contestas tus mensajes.", valor: 0, explica: "Escuchar bien es una forma de amar: guarda el teléfono y mira a la persona." },
                ],
              },
              {
                id: "e2",
                narra: "Carmen dice: Es que... no sé ni por dónde empezar.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "¿Qué ha pasado? Tómate tu tiempo, aquí estoy.", valor: 2, explica: "Es una pregunta abierta, y tu presencia le da confianza para contar." },
                  { texto: "¿Pasó algo malo en tu familia o en tu trabajo?", valor: 1, explica: "Es una pregunta que se responde con sí o no: una pregunta abierta la ayuda más a contar." },
                  { texto: "Tranquila, seguro que no es para tanto; ya se te pasará.", valor: 0, explica: "Acepta sus emociones sin juzgarlas, aunque todavía no sepas qué le pasa." },
                ],
              },
              {
                id: "e3",
                narra: "Carmen cuenta que se siente sola desde que se mudó, y se pone a llorar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te quedas a su lado en silencio, sin apurarla.", valor: 2, explica: "No tienes que llenar cada silencio: a veces lo que más consuela es tu presencia." },
                  { texto: "Le lees enseguida un versículo de consuelo, para animarla.", valor: 1, explica: "La Palabra consuela, pero ahora lo que más ayuda es tu presencia: «llorad con los que lloran»." },
                  { texto: "Le dices que no llore, que tiene que ser fuerte.", valor: 0, explica: "Acepta sus emociones sin juzgarlas: la tristeza no se corrige con un regaño." },
                ],
              },
              {
                id: "e4",
                narra: "Ya más tranquila, Carmen te dice: Gracias por escucharme. ¿Tú qué harías?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le repites lo que entendiste y después le compartes la Palabra.", valor: 2, explica: "Como Jesús camino a Emaús: primero los dejó contar su dolor y solo después les abrió las Escrituras." },
                  { texto: "Le das tu consejo de inmediato, sin repetir nada de lo que te contó.", valor: 1, explica: "Ya la escuchaste, pero reflejar lo que oyes le muestra que la entendiste." },
                  { texto: "Le dices que eso le pasa por haberse mudado tan lejos de todos.", valor: 0, explica: "Los amigos de Job se equivocaron cuando hablaron sin entender y lo culparon de su sufrimiento." },
                ],
              },
            ],
          },
          {
            apoyo: "Refleja lo que oyes: repite con tus palabras lo que entendiste, para que la persona sepa que la escuchas",
            ref: "Proverbios 20:5",
            situacion: "Eres servidor en el grupo de jóvenes. Mateo te pide un momento: está furioso porque lo sacaron del equipo de fútbol.",
            escenas: [
              {
                id: "e1",
                narra: "Mateo empieza a contarte y, a la mitad, se te ocurre una solución.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te guardas la idea y lo dejas terminar de contar.", valor: 2, explica: "No interrumpas y no te apures a dar soluciones: antes de hablar, hay que entender." },
                  { texto: "Lo escuchas, pero ya vas pensando qué le vas a decir.", valor: 1, explica: "Lo dejas hablar, pero dar toda tu atención es escuchar de verdad lo que dice." },
                  { texto: "Lo interrumpes para decirle tu solución antes de que se te olvide.", valor: 0, explica: "No interrumpas: Proverbios advierte que responder antes de oír es fatuidad y oprobio." },
                ],
              },
              {
                id: "e2",
                narra: "Mateo dice: ¡Estoy furioso! No es justo lo que me hicieron.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Veo que te dolió mucho que te sacaran. ¿Qué pasó?", valor: 2, explica: "Reflejas lo que oyes y aceptas su enojo sin juzgarlo; la pregunta abierta lo ayuda a contar." },
                  { texto: "Un cristiano no debería enojarse así por un partido.", valor: 0, explica: "Acepta sus emociones sin juzgarlas: el enojo no se corrige con un regaño." },
                  { texto: "¿Te sacaron por algo que tú hiciste?", valor: 1, explica: "Es una pregunta que se responde con sí o no, y puede sonar a juicio: mejor una pregunta abierta." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, Mateo reconoce que faltó a muchos entrenamientos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le preguntas qué piensa hacer ahora y lo escuchas.", valor: 2, explica: "Las buenas preguntas ayudan a sacar a la luz lo que la persona lleva dentro." },
                  { texto: "Le das un consejo para el próximo equipo, sin preguntarle nada.", valor: 1, explica: "Ya lo escuchaste, pero una buena pregunta le ayuda a sacar a la luz lo que lleva dentro." },
                  { texto: "Le dices: ¿Ves? Te lo merecías por faltar tanto.", valor: 0, explica: "Los amigos de Job se equivocaron cuando hablaron sin entender y lo culparon de su sufrimiento." },
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
            apoyo: "Escuchar es el primer paso para ayudar: hay que ser pronto para oír y tardo para hablar",
            ref: "Santiago 1:19",
            clave: {
              id: "pr-n3-consejeria-basica-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué escuchar es el primer paso para ayudar, según Santiago 1:19 y Proverbios 18:13?",
              ideas: [
                { id: "pronto", peso: 50, texto: "Santiago pide ser pronto para oír, tardo para hablar y tardo para airarse.", formas: ["pronto para (oir|escuchar)", "tardo para hablar", "tard* (en|para) hablar", "(rapido|rapidos) para (oir|escuchar)", "primero (oir|escuchar|escuchamos|oimos)", "(oir|escuchar) (primero|antes)", "escuch* mas"] },
                { id: "entender", peso: 50, texto: "Responder antes de oír es fatuidad y oprobio: antes de hablar, hay que entender.", formas: ["antes de (oir|escuchar|entender)", "fatuidad", "oprobio", "hay que entender", "(entender|comprender|entendamos|entiendo) (antes|primero|lo|la|que|a)", "sin (oir|escuchar|entender)"] },
              ],
              modelo: "Porque Santiago pide ser pronto para oír y tardo para hablar. Y Proverbios dice que responder antes de oír es fatuidad y oprobio: antes de hablar, hay que entender a la persona.",
            },
          },
          {
            apoyo: "Escuchar primero abre el corazón para recibir la Palabra",
            ref: "Lucas 24:15-17",
            clave: {
              id: "pr-n3-consejeria-basica-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué hizo Jesús con los dos discípulos tristes de Emaús, y qué nos enseña eso para ayudar?",
              ideas: [
                { id: "pregunto", peso: 50, texto: "Jesús les preguntó, los dejó contar su dolor y solo después les abrió las Escrituras.", formas: ["les pregunto", "pregunto (por|que|como)", "(los|las) dej* (contar|hablar)", "contar su dolor", "(despues|luego) les (abrio|explico)", "(despues|luego) (abrio|explico)", "abrio las escrituras", "(los|les) escucho", "primero (los|les) (escucho|pregunto|dejo)"] },
                { id: "primero", peso: 50, texto: "Escuchar primero abre el corazón para recibir la Palabra.", formas: ["abre el corazon", "abrir el corazon", "recibir la palabra", "escuchar primero", "primero escuch*", "primero hay que escuchar", "primero se escucha", "escuch* (antes|primero)"] },
              ],
              modelo: "Jesús se acercó, les preguntó por qué estaban tristes y los dejó contar su dolor; solo después les abrió las Escrituras. Eso enseña que escuchar primero abre el corazón para recibir la Palabra.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Orar y aconsejar con la Palabra
    "n3-consejeria-basica-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le recuerda a una persona que ores con ella?", reverso: "Que no está sola y que Dios escucha.", apoyo: "Orar con alguien le recuerda que no está solo y que Dios escucha" },
              { frente: "¿Qué se hace antes de orar con alguien?", reverso: "Pedirle permiso: ¿puedo orar contigo ahora?", apoyo: "Pide permiso: ¿puedo orar contigo ahora?" },
              { frente: "¿Cómo se ora con la persona que sufre?", reverso: "Corto y sencillo, con palabras que entienda.", apoyo: "Ora corto y sencillo, con palabras que la persona entienda" },
              { frente: "¿Qué puede hacer un versículo lanzado sin escuchar?", reverso: "Puede herir.", apoyo: "un versículo lanzado sin escuchar puede herir" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dice Santiago de la oración eficaz del justo?", reverso: "Que puede mucho.", apoyo: "La oración eficaz del justo puede mucho" },
              { frente: "¿Qué se le pide a Dios al orar con alguien que sufre?", reverso: "Paz, fortaleza y dirección, dando gracias por su fidelidad.", apoyo: "Pide paz, fortaleza y dirección, y da gracias por la fidelidad de Dios" },
              { frente: "¿Quién era «el médico amado»?", reverso: "Lucas.", apoyo: "Lucas era «el médico amado»" },
              { frente: "¿A quién dejó Pablo enfermo en Mileto?", reverso: "A Trófimo.", apoyo: "Pablo mismo dejó enfermo a Trófimo en Mileto" },
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
            consigna: "Completa cómo se ora con alguien que sufre.",
            texto: "Ora [[corto]] y [[sencillo]], con palabras que la persona [[entienda]].",
            distractores: ["largo", "difícil", "ignore"],
            errores: {
              largo: "Con la persona que sufre se ora corto y sencillo.",
              "difícil": "Se ora sencillo, con palabras que la persona entienda.",
              ignore: "Se ora con palabras que la persona entienda, sin convertir la oración en un sermón.",
            },
            apoyo: "Ora corto y sencillo, con palabras que la persona entienda",
            ref: "Santiago 5:13-16",
            explica: "Con la persona que sufre se ora corto y sencillo, con palabras que entienda, presentándole a Dios lo que te contó.",
          },
          {
            consigna: "Completa qué se pide al orar con alguien que sufre.",
            texto: "Pide [[paz]], fortaleza y [[dirección]], y da gracias por la [[fidelidad]] de Dios.",
            distractores: ["guerra", "venganza", "suerte"],
            errores: {
              guerra: "Al orar con alguien se pide paz: la paz de Dios guardará el corazón y los pensamientos.",
              venganza: "Se pide paz, fortaleza y dirección.",
              suerte: "Se dan gracias por la fidelidad de Dios.",
            },
            apoyo: "Pide paz, fortaleza y dirección, y da gracias por la fidelidad de Dios",
            ref: "Filipenses 4:6-7",
            explica: "Al orar con alguien se pide paz, fortaleza y dirección, y se dan gracias por la fidelidad de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre usar la Biblia al aconsejar tiene un error. Tócala.",
            frases: [
              "La Biblia consuela, corrige y da esperanza.",
              "Conviene escoger pocos pasajes y explicarlos con amor.",
              "Un versículo dicho sin escuchar a la persona nunca hace daño.",
              "Si conviene, los pasajes se dejan escritos para leerlos otra vez.",
            ],
            malo: 2,
            correccion: "Un versículo lanzado sin escuchar puede herir.",
            apoyo: "un versículo lanzado sin escuchar puede herir",
            ref: "Proverbios 25:11",
            explica: "La Biblia consuela, corrige y da esperanza, pero se usa con sabiduría: un versículo lanzado sin escuchar puede herir.",
          },
          {
            consigna: "Una de estas frases sobre la Palabra a su tiempo tiene un error. Tócala.",
            frases: [
              "La palabra dicha como conviene es valiosa, como dice Proverbios 25:11.",
              "La Palabra se usa con sabiduría y a su tiempo.",
              "Al que sufre conviene leerle muchos pasajes seguidos.",
              "Los pasajes que escoges se explican con amor.",
            ],
            malo: 2,
            correccion: "Conviene escoger pocos pasajes, explicarlos con amor y, si conviene, dejarlos escritos.",
            apoyo: "Escoge pocos pasajes, explícalos con amor y, si conviene, déjalos escritos para que la persona los lea otra vez",
            ref: "Proverbios 25:11",
            explica: "La Palabra se usa con sabiduría y a su tiempo: pocos pasajes, explicados con amor.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de tu célula te dice: Mi hijo se fue de la casa y no me contesta el teléfono. Ya no sé qué pensar.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "La escuchas, oras con ella y después le compartes un pasaje de esperanza.", bien: true, explica: "La Palabra se usa con sabiduría y a su tiempo: primero escuchas y oras, y luego das esperanza con un pasaje." },
              { texto: "Le citas enseguida un versículo, sin dejarla terminar de contar lo que pasa.", explica: "Un versículo lanzado sin escuchar puede herir." },
              { texto: "Le das una lista de diez versículos para que los lea sola esta noche.", explica: "Escoge pocos pasajes, explícalos con amor y, si conviene, déjalos escritos." },
              { texto: "Le dices que, si tuviera más fe, no estaría tan preocupada por su hijo.", explica: "Nunca se culpa al que sufre de falta de fe: acompaña, ora y sigue cerca." },
            ],
            apoyo: "La Palabra se usa con sabiduría y a su tiempo, para consolar y dar esperanza",
            explica: "La Biblia consuela y da esperanza, pero se usa con sabiduría: después de escuchar, pocos pasajes explicados con amor.",
          },
          {
            caso: "Un hermano te dice: Estoy muy ansioso por las deudas; ya ni puedo dormir.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Lo escuchas, oran juntos y le explicas Filipenses 4:6-7 con calma.", bien: true, explica: "Pablo enseña a llevar la ansiedad a Dios en oración, y promete que la paz de Dios guardará el corazón." },
              { texto: "Le dices que un cristiano no debe estar ansioso y que eso es falta de fe.", explica: "Nunca se culpa al que sufre de falta de fe: la Palabra se usa para consolar y dar esperanza." },
              { texto: "Le recitas tres versículos sobre el dinero sin preguntarle qué le pasó.", explica: "Un versículo lanzado sin escuchar puede herir." },
              { texto: "Le aseguras que, si ora esta noche, mañana se arreglan todas sus deudas.", explica: "Pablo promete que la paz de Dios guardará el corazón y los pensamientos, no que todo se arregle al día siguiente." },
            ],
            apoyo: "Pablo enseña a llevar la ansiedad a Dios",
            ref: "Filipenses 4:6-7",
            explica: "La Palabra a su tiempo da esperanza: Pablo enseña a llevar la ansiedad a Dios, y la paz de Dios guarda el corazón y los pensamientos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la fe y la medicina: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Lucas era «el médico amado».", verdad: true, explica: "La oración y la Palabra no se oponen a la ayuda médica: Lucas era médico.", apoyo: "Lucas era «el médico amado»", ref: "Colosenses 4:14" },
              { texto: "Ir al médico demuestra que a una persona le falta fe.", verdad: false, explica: "La oración y la Palabra no se oponen a la ayuda médica.", apoyo: "La oración y la Palabra no se oponen a la ayuda médica" },
              { texto: "Pablo le recomendó a Timoteo un remedio para su estómago.", verdad: true, explica: "La oración y la Palabra no se oponen a la ayuda médica: Pablo le recomendó un remedio a Timoteo.", apoyo: "Pablo le recomendó a Timoteo un remedio para su estómago", ref: "1 Timoteo 5:23" },
            ],
          },
          {
            consigna: "Sobre orar por los enfermos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Si alguien sigue enfermo después de orar, es porque le falta fe.", verdad: false, explica: "Nunca le digas que le falta fe: Pablo mismo dejó enfermo a Trófimo en Mileto.", apoyo: "Si alguien sigue enfermo o triste, no lo culpes diciéndole que le falta fe", ref: "2 Timoteo 4:20" },
              { texto: "Pablo mismo dejó enfermo a Trófimo en Mileto.", verdad: true, explica: "Por eso no se culpa al que sigue enfermo: se acompaña, se ora y se sigue cerca.", apoyo: "Pablo mismo dejó enfermo a Trófimo en Mileto", ref: "2 Timoteo 4:20" },
              { texto: "Quien confía en que Dios sana debe dejar las indicaciones de su médico.", verdad: false, explica: "Oramos y confiamos en que Dios sana, y también animamos a la persona a seguir las indicaciones de su médico.", apoyo: "también animamos a la persona a seguir las indicaciones de su médico" },
              { texto: "Oramos por los enfermos y confiamos en que Dios sana.", verdad: true, explica: "Santiago enseña que el enfermo llame a los ancianos de la iglesia para que oren por él.", apoyo: "Oramos por los enfermos y confiamos en que Dios sana", ref: "Santiago 5:13-16" },
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
            apoyo: "Oramos por los enfermos y confiamos en que Dios sana, y también animamos a la persona a seguir las indicaciones de su médico",
            ref: "Santiago 5:13-16",
            situacion: "Eres líder de célula. Vas al hospital a visitar a don Ernesto, que se recupera de una operación y tiene miedo.",
            escenas: [
              {
                id: "e1",
                narra: "Don Ernesto te cuenta que tiene miedo de que algo salga mal.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lo escuchas y le preguntas si puedes orar con él ahora.", valor: 2, explica: "Pide permiso: ¿puedo orar contigo ahora? Orar con alguien le recuerda que no está solo y que Dios escucha." },
                  { texto: "Le dices que vas a orar por él esta noche, ya en tu casa.", valor: 1, explica: "Orar por él es bueno, pero detenerte a orar ahí mismo con él puede cambiar su día." },
                  { texto: "Le predicas un buen rato sobre el miedo y después te vas.", valor: 0, explica: "Presenta a Dios lo que te contó, sin convertir la oración en un sermón: ora corto y sencillo." },
                ],
              },
              {
                id: "e2",
                narra: "Él acepta y te toma la mano.",
                pregunta: "¿Cómo oras?",
                opciones: [
                  { texto: "Corto y sencillo: le presentas a Dios su miedo y pides paz.", valor: 2, explica: "Ora corto y sencillo, presenta a Dios lo que te contó y pide paz, fortaleza y dirección." },
                  { texto: "Por todos los enfermos del hospital, sin nombrar su miedo.", valor: 1, explica: "Es una oración sincera, pero conviene presentarle a Dios lo que él te contó." },
                  { texto: "Largo y con palabras difíciles, para que vea que sabes orar.", valor: 0, explica: "Se ora corto y sencillo, con palabras que la persona entienda." },
                ],
              },
              {
                id: "e3",
                narra: "Después te dice: Mi hija dice que, si tengo fe, no necesito las medicinas.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la fe y la medicina no se oponen, y que siga a su médico.", valor: 2, explica: "La oración y la Palabra no se oponen a la ayuda médica: Lucas era el médico amado." },
                  { texto: "Que eso lo decida él solo, porque tú no te metes en esas cosas.", valor: 1, explica: "Respetas su decisión, pero puedes animarlo a seguir las indicaciones de su médico." },
                  { texto: "Que su hija tiene razón: tomar medicinas es dudar de Dios.", valor: 0, explica: "Oramos y confiamos en que Dios sana, y también animamos a seguir las indicaciones del médico." },
                ],
              },
              {
                id: "e4",
                narra: "Una semana después, don Ernesto sigue débil y te pregunta: ¿Será que me falta fe?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que no se culpe: Pablo dejó enfermo a Trófimo, y tú seguirás cerca.", valor: 2, explica: "Nunca le digas que le falta fe: acompaña, ora y sigue cerca." },
                  { texto: "Le cambias de tema enseguida, para no tener que hablar de eso con él.", valor: 1, explica: "No lo culpas, pero puedes acompañarlo y orar con él: sigue cerca." },
                  { texto: "Que tal vez sí, y que ore con más fuerza para poder sanar pronto.", valor: 0, explica: "Si alguien sigue enfermo o triste, no lo culpes diciéndole que le falta fe." },
                ],
              },
            ],
          },
          {
            apoyo: "Si alguien sigue enfermo o triste, no lo culpes diciéndole que le falta fe",
            ref: "2 Timoteo 4:20",
            situacion: "Eres servidor en tu célula. Doña Rosa, una hermana del grupo, está enferma y su médico le dio un tratamiento.",
            escenas: [
              {
                id: "e1",
                narra: "Doña Rosa te dice: Ya oraron por mí en la iglesia, así que voy a dejar mis medicinas.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la oración y la medicina no se oponen, y que siga a su médico.", valor: 2, explica: "Oramos por los enfermos y confiamos en que Dios sana, y también animamos a seguir las indicaciones del médico." },
                  { texto: "Que haga lo que sienta en su corazón, porque al final es su decisión.", valor: 1, explica: "La decisión es suya, pero puedes animarla a seguir las indicaciones de su médico." },
                  { texto: "Que hace bien, porque la fe y las medicinas no se mezclan.", valor: 0, explica: "La oración y la Palabra no se oponen a la ayuda médica: Pablo le recomendó un remedio a Timoteo." },
                ],
              },
              {
                id: "e2",
                narra: "Doña Rosa pregunta: Entonces, ¿para qué oramos?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que oramos porque Dios escucha y sana, y eso no se opone al médico.", valor: 2, explica: "Orar con alguien le recuerda que Dios escucha, y la oración no se opone a la ayuda médica." },
                  { texto: "Que la oración es solo para cuando los médicos ya no pueden hacer nada.", valor: 0, explica: "Santiago enseña a orar en toda situación: el afligido, que ore; el enfermo, que llame a los ancianos de la iglesia." },
                  { texto: "Que oramos para sentirnos mejor, aunque Dios no siempre escucha.", valor: 0, explica: "Orar con alguien le recuerda que no está solo y que Dios escucha." },
                ],
              },
              {
                id: "e3",
                narra: "Pasa un mes y doña Rosa sigue enferma. Te dice que se siente culpable.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices que no es por falta de fe, oras con ella y sigues cerca.", valor: 2, explica: "Nunca se culpa al que sufre de falta de fe: Pablo mismo dejó enfermo a Trófimo. Acompaña, ora y sigue cerca." },
                  { texto: "Le dices que no se preocupe y dejas de hablar del tema.", valor: 1, explica: "No la culpas, pero acompañarla es más que callar: ora con ella y sigue cerca." },
                  { texto: "Le dices que algo malo habrá hecho, y que se arrepienta para poder sanar.", valor: 0, explica: "No la culpes: si alguien sigue enfermo o triste, se acompaña, se ora y se sigue cerca." },
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
            apoyo: "La oración y la Palabra no se oponen a la ayuda médica",
            ref: "Colosenses 4:14",
            clave: {
              id: "pr-n3-consejeria-basica-3-a7-1",
              tipo: "corta",
              pregunta: "¿Se oponen la oración y la ayuda médica? Explícalo con un ejemplo de la Biblia.",
              ideas: [
                { id: "no-oponen", peso: 50, texto: "La oración y la Palabra no se oponen a la ayuda médica: oramos y también animamos a seguir las indicaciones del médico.", formas: ["no se (oponen|opone|contradicen|contradice|pelean|excluyen)", "no (son|es|estan|esta) (contrari*|opuest*|enemig*|peleadas|peleados)", "(van|andan|caminan) (juntas|juntos)", "de la mano"] },
                { id: "ejemplo", peso: 50, texto: "Lucas era «el médico amado», y Pablo le recomendó a Timoteo un remedio para su estómago.", formas: ["lucas", "medico amado", "timoteo", "remedio", "estomago"] },
              ],
              errores: [
                { id: "se-oponen", texto: "La oración y la Palabra no se oponen a la ayuda médica.", formas: ["se (oponen|contradicen|excluyen)", "(son|es) (contrari*|opuest*|enemig*)", "(es|son|seria) falta de fe"], anula: "no-oponen" },
                { id: "se-oponen-ejemplo", texto: "Lucas era «el médico amado», y Pablo le recomendó un remedio a Timoteo: la Biblia no pone la medicina contra la fe.", formas: ["se (oponen|contradicen|excluyen)", "(son|es) (contrari*|opuest*|enemig*)", "(es|son|seria) falta de fe"], anula: "ejemplo" },
              ],
              modelo: "No se oponen: oramos por los enfermos y confiamos en que Dios sana, y también los animamos a seguir a su médico. Lucas era el médico amado, y Pablo le recomendó a Timoteo un remedio para su estómago.",
            },
          },
          {
            apoyo: "Si alguien sigue enfermo o triste, no lo culpes diciéndole que le falta fe",
            ref: "2 Timoteo 4:20",
            clave: {
              id: "pr-n3-consejeria-basica-3-a7-2",
              tipo: "corta",
              pregunta: "Si alguien sigue enfermo o triste después de orar, ¿qué nunca debes decirle, y qué debes hacer?",
              ideas: [
                { id: "no-culpar", peso: 50, texto: "Nunca se le culpa diciéndole que le falta fe: Pablo mismo dejó enfermo a Trófimo en Mileto.", formas: ["(no|nunca|jamas|ni) (culp*|decir*|dig*|dec*|reproch*)", "sin culpar*", "trofimo"] },
                { id: "acompanar", peso: 50, texto: "Acompaña, ora y sigue cerca.", formas: ["acompan*", "(ora|orar|oro|orando|oramos|orare) (con|por)", "(sigue|seguir|sigo|seguire|seguimos|estar|quedarme|quedarse) cerca", "cerca de (el|ella|la|esa)"] },
              ],
              errores: [
                { id: "culpar", texto: "Si alguien sigue enfermo o triste, no lo culpes diciéndole que le falta fe.", formas: ["(decirle|dile|decirles|digale|decir|digo|diria|dirle) que (le|les|te) falta", "(es|fue) (por|porque) (su|le) falta", "(culpa|culpable) (es|de) (el|ella|su)"], anula: "no-culpar" },
              ],
              modelo: "Nunca debo decirle que le falta fe, porque Pablo mismo dejó enfermo a Trófimo en Mileto. Lo que debo hacer es acompañarlo, orar con él y seguir cerca de esa persona.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Acompañar en el duelo y en la crisis
    "n3-consejeria-basica-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Jesús cuando María llegó llorando?", reverso: "No la regañó: se conmovió y lloró.", apoyo: "Jesús no la regañó" },
              { frente: "¿Qué sabía Jesús mientras lloraba en Betania?", reverso: "Que iba a resucitar a Lázaro.", apoyo: "aunque sabía que iba a resucitar a Lázaro" },
              { frente: "¿Cómo no deben entristecerse los creyentes, según Pablo?", reverso: "«como los otros que no tienen esperanza».", apoyo: "no se entristezcan «como los otros que no tienen esperanza»" },
              { frente: "¿Con qué esperanza lloramos los creyentes?", reverso: "Con la esperanza de la resurrección.", apoyo: "Lloramos, pero con la esperanza de la resurrección" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué muestra que Jesús llorara ante la tumba de Lázaro?", reverso: "Que llorar no es falta de fe.", apoyo: "Llorar no es falta de fe" },
              { frente: "¿Qué dice más que un discurso a quien está de duelo?", reverso: "Una visita, un abrazo o un mensaje.", apoyo: "una visita, un abrazo o un mensaje dicen más que un discurso" },
              { frente: "¿Cuánto tiempo lleva el duelo?", reverso: "Lleva tiempo y no tiene un calendario fijo.", apoyo: "El duelo lleva tiempo y no tiene un calendario fijo" },
              { frente: "¿Qué hizo Dios primero con Elías, agotado y con miedo?", reverso: "Lo dejó dormir y le dio de comer.", apoyo: "primero lo dejó dormir y le dio de comer" },
              { frente: "Si alguien habla de quitarse la vida, ¿qué haces?", reverso: "Lo tomas en serio, no lo guardas en secreto, no lo dejas solo y buscas ayuda.", apoyo: "Tómalo siempre en serio, no lo guardes en secreto y no dejes sola a la persona" },
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
            consigna: "Completa lo que muestra Jesús en Betania.",
            texto: "Jesús [[lloró]] ante la tumba de [[Lázaro]]: se puede llorar con [[esperanza]].",
            distractores: ["sonrió", "Moisés", "culpa"],
            errores: {
              "sonrió": "Jesús se conmovió y lloró, aunque sabía que iba a resucitar a Lázaro.",
              "Moisés": "Jesús lloró ante la tumba de Lázaro, el hermano de María.",
              culpa: "Llorar no es falta de fe: lloramos con la esperanza de la resurrección.",
            },
            apoyo: "Jesús lloró ante la tumba de Lázaro: se puede llorar con esperanza",
            ref: "Juan 11:32-36",
            explica: "Jesús lloró ante la tumba de Lázaro, aunque sabía que lo iba a resucitar: llorar no es falta de fe, y se puede llorar con esperanza.",
          },
          {
            consigna: "Completa lo que hizo Jesús en Betania.",
            texto: "Jesús se [[conmovió]] y [[lloró]], aunque sabía que iba a [[resucitar]] a Lázaro.",
            distractores: ["enojó", "rió", "castigar"],
            errores: {
              "enojó": "Jesús no regañó a María: se conmovió.",
              "rió": "«Jesús lloró», aunque sabía que iba a resucitar a Lázaro.",
              castigar: "Jesús sabía que iba a resucitar a Lázaro, y aun así lloró.",
            },
            apoyo: "Se conmovió, y «Jesús lloró», aunque sabía que iba a resucitar a Lázaro",
            ref: "Juan 11:32-36",
            explica: "Jesús se conmovió y lloró, aunque sabía que iba a resucitar a Lázaro: llorar no es falta de fe.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda a quien está de duelo o le hace daño? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a quien está de duelo", "Le hace daño a quien está de duelo"],
            frases: [
              { texto: "Visitarlo y darle un abrazo", grupo: 0 },
              { texto: "Dejar que hable de su ser querido", grupo: 0 },
              { texto: "Llevarle comida a la casa", grupo: 0 },
              { texto: "Volver a visitarlo meses después", grupo: 0 },
              { texto: "Decirle que Dios necesitaba otro ángel", grupo: 1 },
              { texto: "Decirle que ya debería superarlo", grupo: 1 },
              { texto: "Decirle que sabes exactamente cómo se siente", grupo: 1 },
            ],
            apoyo: "Evita las frases que duelen, como decir que Dios necesitaba otro ángel, que ya debería superarlo o que sabes exactamente cómo se siente",
            explica: "Se acompaña estando presente, escuchando, ayudando en lo práctico y volviendo después, y se evitan las frases que duelen.",
          },
          {
            consigna: "¿Así se acompaña en el duelo o así no? Lleva cada frase a su grupo.",
            grupos: ["Así se acompaña en el duelo", "Así no se acompaña en el duelo"],
            frases: [
              { texto: "Ayudar con el transporte o los trámites", grupo: 0 },
              { texto: "Cuidar a sus niños unos días", grupo: 0 },
              { texto: "Tener presentes sus fechas difíciles", grupo: 0 },
              { texto: "Escuchar lo que siente sin apurarlo", grupo: 0 },
              { texto: "Exigirle que ya deje de llorar", grupo: 1 },
              { texto: "Dejar de visitarlo después del funeral", grupo: 1 },
              { texto: "Darle un largo discurso en vez de un abrazo", grupo: 1 },
            ],
            apoyo: "Vuelve semanas y meses después, cuando los demás ya se fueron, y recuerda las fechas difíciles",
            explica: "Se acompaña con ayuda práctica, escuchando y volviendo meses después; exigir que supere su dolor, desaparecer después del funeral o dar discursos no acompaña.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Está presente: una visita, un abrazo o un mensaje dicen más que un discurso",
            ref: "Salmos 34:18",
            situacion: "Eres líder de célula. El esposo de Marta, una hermana de tu grupo, murió hace dos días.",
            escenas: [
              {
                id: "e1",
                narra: "Vas a su casa. Hay mucha gente, y Marta está callada en un rincón.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te sientas a su lado, la abrazas y la escuchas si quiere hablar.", valor: 2, explica: "Está presente: una visita, un abrazo o un mensaje dicen más que un discurso." },
                  { texto: "La saludas desde lejos y te vas pronto de la casa, para no molestarla.", valor: 1, explica: "Tu visita cuenta, pero tu presencia en el dolor de otro vale más que tus palabras." },
                  { texto: "Le dices, para consolarla, que Dios necesitaba otro ángel en el cielo.", valor: 0, explica: "Es una de las frases que duelen: evítalas." },
                ],
              },
              {
                id: "e2",
                narra: "Marta te dice: No sé qué voy a hacer con los niños y con todos los papeles.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te ofreces a cuidar a los niños o a ir con ella a los trámites.", valor: 2, explica: "Ayuda en lo práctico: la comida, el transporte, el cuidado de los niños o los trámites." },
                  { texto: "Le dices que cuente contigo para lo que sea, pero sin decir para qué.", valor: 1, explica: "Es sincero, pero ayuda más en lo práctico: los niños, la comida o los trámites." },
                  { texto: "Le dices que eso lo resuelva su familia, que tú solo vienes a orar.", valor: 0, explica: "Acompañar en el duelo también es ayudar en lo práctico." },
                ],
              },
              {
                id: "e3",
                narra: "Pasaron tres meses. Ya casi nadie la visita, y se acerca el cumpleaños de su esposo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La llamas antes de esa fecha y vas a verla ese día difícil.", valor: 2, explica: "Vuelve semanas y meses después, cuando los demás ya se fueron, y recuerda las fechas difíciles." },
                  { texto: "Le mandas un mensaje cualquier día, sin pensar en esa fecha.", valor: 1, explica: "Volver después está bien, y recordar las fechas difíciles la acompaña todavía más." },
                  { texto: "No la buscas: ya pasó tiempo y debería haberlo superado.", valor: 0, explica: "El duelo lleva tiempo y no tiene un calendario fijo." },
                ],
              },
            ],
          },
          {
            apoyo: "Escucha y deja que la persona hable de su ser querido y de lo que siente",
            ref: "Juan 11:32-36",
            situacion: "Eres servidor en el grupo de jóvenes. A Diego se le murió su abuela, que lo crió desde niño.",
            escenas: [
              {
                id: "e1",
                narra: "Diego no quiere ver a nadie. Solo te escribe: Me siento fatal.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que lo sientes mucho, que estás con él y que pasarás a verlo.", valor: 2, explica: "Está presente: un mensaje o una visita dicen más que un discurso." },
                  { texto: "Le mandas un versículo largo y no le dices nada más que eso.", valor: 1, explica: "La Palabra consuela, pero ahora tu presencia vale más que tus palabras." },
                  { texto: "Que sabes exactamente cómo se siente, porque a ti también te pasó.", valor: 0, explica: "Es una de las frases que duelen: evita decir que sabes exactamente cómo se siente." },
                ],
              },
              {
                id: "e2",
                narra: "Lo visitas. Diego empieza a contar historias de su abuela y llora.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo escuchas y dejas que hable de ella todo lo que necesite.", valor: 2, explica: "Escucha y deja que la persona hable de su ser querido y de lo que siente." },
                  { texto: "Le cuentas con detalle cómo fue cuando murió tu propio abuelo.", valor: 1, explica: "Ahora le toca a él: deja que hable de su ser querido y de lo que siente." },
                  { texto: "Le cambias el tema para que deje de ponerse triste.", valor: 0, explica: "Escucha y deja que hable de su ser querido: Jesús mismo lloró." },
                ],
              },
              {
                id: "e3",
                narra: "Diego te pregunta: ¿Está mal que llore tanto, si mi abuela está con el Señor?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que Jesús también lloró por Lázaro: se puede llorar con esperanza.", valor: 2, explica: "Llorar no es falta de fe: lloramos con la esperanza de la resurrección." },
                  { texto: "Que mejor no piense en eso y que trate de distraerse con algo.", valor: 1, explica: "No lo culpas, pero puedes darle esperanza: Jesús lloró ante la tumba de Lázaro." },
                  { texto: "Que sí: si de verdad tuviera fe en Dios, ya no estaría llorando así.", valor: 0, explica: "Llorar no es falta de fe: Jesús lloró, aunque sabía que iba a resucitar a Lázaro." },
                ],
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
            caso: "Un joven de tu célula te llama: Acabo de chocar el carro. Estoy bien, pero no paro de temblar.",
            pregunta: "¿Qué haces primero?",
            opciones: [
              { texto: "Le preguntas si está a salvo, lo calmas y vas a acompañarlo.", bien: true, explica: "En una crisis, lo primero es lo básico: que la persona esté a salvo, calmada y acompañada." },
              { texto: "Le explicas por teléfono cómo hacer el reclamo al seguro.", explica: "Eso puede venir después: lo primero es que esté a salvo, calmada y acompañada." },
              { texto: "Le dices que eso le pasa por manejar rápido, para que aprenda.", explica: "Dios no regañó a Elías: primero lo cuidó." },
              { texto: "Le dices que ore tranquilo y que te llame mañana, cuando esté mejor.", explica: "En una crisis la persona necesita estar acompañada, no sola." },
            ],
            apoyo: "lo primero es lo básico: que la persona esté a salvo, calmada y acompañada",
            explica: "Como Dios con Elías, en una crisis primero se cuida lo básico y la seguridad, y después se busca la red de apoyo.",
          },
          {
            caso: "Una hermana te escribe llorando: Me acaban de despedir del trabajo y estoy sola en la calle. No sé qué hacer.",
            pregunta: "¿Qué haces primero?",
            opciones: [
              { texto: "Le preguntas dónde está, la calmas y vas tú o alguien a acompañarla.", bien: true, explica: "Lo primero es lo básico: que esté a salvo, calmada y acompañada. Después se busca a su familia y a la iglesia." },
              { texto: "Le mandas una lista de páginas para buscar trabajo esta misma noche.", explica: "Buscar trabajo puede venir después: primero, que esté a salvo, calmada y acompañada." },
              { texto: "Le dices que no exagere, que perder un trabajo no es el fin del mundo.", explica: "Dios no regañó a Elías cuando estaba agotado y con miedo: primero lo cuidó." },
              { texto: "Le dices que hoy no puedes y que hablen el domingo en la iglesia.", explica: "En una crisis la persona no se queda sola: lo primero es que esté acompañada." },
            ],
            apoyo: "En una crisis, como un accidente, una enfermedad grave, la pérdida del trabajo o una ruptura, lo primero es lo básico",
            explica: "En una crisis, como la pérdida del trabajo, lo primero es que la persona esté a salvo, calmada y acompañada; después se busca su red de apoyo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo cuidó Dios a Elías en su crisis, del primero al último.",
            pasos: ["Elías, agotado y con miedo, se desea la muerte", "Dios lo deja dormir", "Dios le da de comer", "Dios le habla"],
            apoyo: "Dios no lo regañó: primero lo dejó dormir y le dio de comer, y después le habló",
            ref: "1 Reyes 19:4-8",
            explica: "Elías se deseó la muerte, y Dios no lo regañó: primero lo dejó dormir y le dio de comer, y después le habló.",
          },
          {
            consigna: "Ordena los pasos para ayudar en una crisis, del primero al último.",
            pasos: [
              "Llega una crisis, como un accidente o una ruptura",
              "Cuidar lo básico: que la persona esté a salvo, calmada y acompañada",
              "Ayudarla a buscar a su familia y a la iglesia",
            ],
            apoyo: "primero se cuida lo básico y la seguridad, y luego se busca la red de apoyo",
            ref: "1 Reyes 19:4-8",
            explica: "En una crisis, primero se cuida lo básico y la seguridad, y luego se busca la red de apoyo: la familia, la iglesia y, si hace falta, los profesionales.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Después se le ayuda a buscar a su familia, a la iglesia y, si hace falta, a los profesionales",
            ref: "1 Reyes 19:4-8",
            clave: {
              id: "pr-n3-consejeria-basica-4-a7-1",
              tipo: "corta",
              pregunta: "Cuando alguien vive una crisis, como un accidente o la pérdida del trabajo, ¿qué es lo primero y qué viene después?",
              ideas: [
                { id: "basico", peso: 50, texto: "Lo primero es lo básico: que la persona esté a salvo, calmada y acompañada.", formas: ["a salvo", "seguridad", "este (segura|seguro)", "calm*", "tranquil*", "acompanad*", "lo basico", "no (este|quede|dejarla|dejarlo|la|lo) sol*"] },
                { id: "red", peso: 50, texto: "Después se le ayuda a buscar a su familia, a la iglesia y, si hace falta, a los profesionales: la red de apoyo.", formas: ["su familia", "sus familiares", "la iglesia", "red de apoyo", "profesional*", "busc* ayuda"] },
              ],
              modelo: "Lo primero es lo básico: que la persona esté a salvo, calmada y acompañada, como Dios hizo con Elías. Después se le ayuda a buscar a su familia, a la iglesia y, si hace falta, a los profesionales.",
            },
          },
          {
            apoyo: "Dios no lo regañó: primero lo dejó dormir y le dio de comer, y después le habló",
            ref: "1 Reyes 19:4-8",
            clave: {
              id: "pr-n3-consejeria-basica-4-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo cuidó Dios a Elías cuando estaba agotado y con miedo, y qué nos enseña para ayudar en una crisis?",
              ideas: [
                { id: "elias", peso: 50, texto: "Dios no lo regañó: primero lo dejó dormir y le dio de comer, y después le habló.", formas: ["dormir", "durmi*", "descans*", "comer", "comida", "(despues|luego) le hablo"] },
                { id: "basico", peso: 50, texto: "En una crisis, primero se cuida lo básico y la seguridad, y luego se busca la red de apoyo.", formas: ["lo basico", "a salvo", "seguridad", "calm*", "acompanad*", "red de apoyo", "su familia", "la iglesia"] },
              ],
              modelo: "Dios no lo regañó: primero lo dejó dormir y le dio de comer, y después le habló. Eso enseña que en una crisis primero se cuida lo básico y la seguridad de la persona, y luego se busca la red de apoyo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Saber derivar y proteger al débil
    "n3-consejeria-basica-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le dijo Jetro a Moisés?", reverso: "«No está bien lo que haces»: el trabajo era demasiado pesado para uno solo.", apoyo: "Jetro le dijo a Moisés: «No está bien lo que haces»" },
              { frente: "¿Qué es derivar, y qué no es?", reverso: "Es buscar la mejor ayuda y seguir acompañando; no es abandonar.", apoyo: "Derivar no es abandonar: es buscar la mejor ayuda y seguir acompañando" },
              { frente: "¿Dónde hay seguridad, según Proverbios 11:14?", reverso: "En la multitud de consejeros.", apoyo: "Mas en la multitud de consejeros hay seguridad" },
              { frente: "¿Qué pasa si le preguntas a alguien si piensa hacerse daño?", reverso: "Preguntar no le da la idea, y puede salvarle la vida.", apoyo: "preguntar no le da la idea, y puede salvarle la vida" },
              { frente: "En Texas, ¿adónde se reporta la sospecha de que un niño sufre abuso?", reverso: "A la línea de abuso de Texas (1-800-252-5400) o, si hay peligro inmediato, al 911.", apoyo: "el reporte se hace a la línea de abuso de Texas (1-800-252-5400) o, si hay peligro inmediato, al 911" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué necesita saber quien cuida a otros?", reverso: "Cuándo pasar el caso a alguien más preparado.", apoyo: "Quien cuida a otros necesita saber cuándo pasar el caso a alguien más preparado" },
              { frente: "En los Estados Unidos, ¿qué línea atiende las crisis de suicidio, de día y de noche?", reverso: "La línea 988, también en español.", apoyo: "En los Estados Unidos, la línea 988 de prevención del suicidio y crisis atiende de día y de noche, también en español" },
              { frente: "¿Qué se hace ante el abuso de un menor?", reverso: "Se protege a la víctima y se avisa a las autoridades.", apoyo: "se protege a la víctima y se avisa a las autoridades" },
              { frente: "Después de derivar, ¿qué sigues haciendo?", reverso: "Sigues cerca: oras, la visitas y la animas a seguir su tratamiento.", apoyo: "Después de derivar, sigue cerca: ora por la persona, visítala y anímala a seguir el tratamiento o el acompañamiento que recibe" },
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
            consigna: "¿Por qué hay que derivar en cada caso? Une cada situación con su motivo.",
            pares: [
              ["Dice que ya no quiere vivir", "Riesgo de suicidio"],
              ["No logra dejar el juego, aunque lo intenta", "Una adicción"],
              ["Lleva meses con una tristeza profunda que no pasa", "Señal de una enfermedad mental"],
              ["Su pareja la maltrata", "Violencia o abuso"],
            ],
            apoyo: "Como Moisés con el consejo de Jetro, quien cuida necesita saber cuándo derivar",
            explica: "Se deriva ante el riesgo de suicidio, la violencia o el abuso, las adicciones, las señales de una enfermedad mental y los problemas médicos o legales.",
          },
          {
            consigna: "¿Por qué hay que derivar en cada caso? Une cada situación con su motivo.",
            pares: [
              ["Oye cosas que no existen", "Señal de una enfermedad mental"],
              ["Te cuenta que piensa hacerse daño", "Riesgo de que se haga daño"],
              ["Una abuelita sufre maltrato en su casa", "Abuso contra un anciano"],
              ["No puede dejar el alcohol", "Una adicción"],
              ["Lo demandaron y no sabe qué hacer", "Un problema legal"],
            ],
            apoyo: "Cuando hay señales de una enfermedad mental: una tristeza profunda que no pasa, ver u oír cosas que no existen o un cambio grave de conducta",
            explica: "Oír cosas que no existen es señal de una enfermedad mental; pensar en hacerse daño es un riesgo; el maltrato a un anciano es abuso; el alcohol que no se deja es una adicción; y una demanda es un problema legal.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "No lo dejes solo, no prometas guardar el secreto y busca ayuda de inmediato: avisa a tu pastor y a su familia",
            ref: "Proverbios 24:11",
            situacion: "Eres líder de una célula de jóvenes en Texas. Un viernes en la noche, Andrea, de tu grupo, te escribe: Ya no aguanto más. Creo que todos estarían mejor sin mí.",
            escenas: [
              {
                id: "e1",
                narra: "Lees el mensaje y te preocupa lo que dice.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La llamas y le preguntas con calma si está pensando en hacerse daño.", valor: 2, explica: "Preguntar no le da la idea, y puede salvarle la vida." },
                  { texto: "Evitas preguntarle por hacerse daño, para no darle esa idea.", valor: 0, explica: "Preguntar con calma no le da la idea, y puede salvarle la vida." },
                  { texto: "Le respondes que mañana hablan con más calma, porque ya es muy tarde.", valor: 0, explica: "Si alguien habla de quitarse la vida, tómalo siempre en serio y busca ayuda de inmediato." },
                ],
              },
              {
                id: "e2",
                narra: "Andrea te dice que sí ha pensado en quitarse la vida, y te pide: Prométeme que no le vas a decir a nadie.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no puedes prometer eso, porque su vida te importa mucho.", valor: 2, explica: "No prometas guardar el secreto: pedir ayuda a tiempo puede salvar una vida." },
                  { texto: "Que solo se lo vas a contar a tu pastor, y a nadie más que a él.", valor: 0, explica: "No prometas guardar el secreto, ni siquiera en parte: avisa a tu pastor y también a su familia." },
                  { texto: "Que se lo prometes, para que siga confiando en ti.", valor: 0, explica: "No prometas guardar el secreto: hay que buscar ayuda de inmediato." },
                ],
              },
              {
                id: "e3",
                narra: "Andrea está sola en su casa y no quiere que vayas.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Sigues en contacto con ella y avisas ya a tu pastor y a su familia.", valor: 2, explica: "No lo dejes solo y busca ayuda de inmediato: avisa a tu pastor y a su familia." },
                  { texto: "Le das el número de la línea 988 y te despides para que descanse un poco.", valor: 0, explica: "La línea 988 atiende de día y de noche, pero no la dejes sola: avisa a tu pastor y a su familia." },
                  { texto: "Esperas al domingo para contárselo al pastor en la iglesia.", valor: 0, explica: "Busca ayuda de inmediato: pedir ayuda a tiempo puede salvar una vida." },
                ],
              },
              {
                id: "e4",
                narra: "Su familia no contesta, y Andrea te dice que está en peligro ahora mismo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Llamas al 911 y sigues en contacto con ella hasta que llegue ayuda.", valor: 2, explica: "Si hay peligro inmediato, llama al 911 en los Estados Unidos o al número de emergencias de tu país." },
                  { texto: "Le escribes a tu pastor y te quedas esperando a que él te responda.", valor: 0, explica: "Avisar al pastor está bien, pero si hay peligro inmediato no se espera: se llama al 911." },
                  { texto: "Le pides que espere tranquila en su casa hasta que su familia conteste.", valor: 0, explica: "No la dejes sola ni esperes: si hay peligro inmediato, llama al 911." },
                ],
              },
            ],
          },
          {
            apoyo: "El abuso de un menor nunca se guarda en secreto ni se arregla solo con una oración o un perdón",
            ref: "Proverbios 24:11",
            situacion: "Eres maestro de niños en una iglesia de Texas. Al terminar la clase, Sofía, de 9 años, te cuenta en voz baja que un adulto de su casa le hace daño.",
            escenas: [
              {
                id: "e1",
                narra: "Sofía está nerviosa y te mira esperando lo que vas a decir.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "La escuchas con calma, sin regañarla, y le dices que la vas a ayudar.", valor: 2, explica: "Ante el abuso de un menor, lo primero es proteger a la víctima: la escuchas y buscas ayuda para ella." },
                  { texto: "Le dices que de eso no se habla en la iglesia, que lo hable con su familia.", valor: 0, explica: "El abuso de un menor nunca se guarda en secreto: se protege a la víctima y se avisa a las autoridades." },
                  { texto: "Le dices que van a orar para que ese adulto cambie, y ya.", valor: 0, explica: "El abuso de un menor no se arregla solo con una oración o un perdón." },
                ],
              },
              {
                id: "e2",
                narra: "Sofía te pide: No le digas a nadie, por favor. Me dijo que no lo contara.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no puedes guardar ese secreto, porque hay que protegerla.", valor: 2, explica: "El abuso de un menor nunca se guarda en secreto: se protege a la víctima." },
                  { texto: "Que se lo vas a guardar, para que ella siga confiando en ti.", valor: 0, explica: "El abuso de un menor nunca se guarda en secreto ni se arregla solo con una oración o un perdón." },
                  { texto: "Que solo se lo vas a contar a su mamá, y a nadie más que a ella.", valor: 0, explica: "Ante el abuso de un menor se protege a la víctima y se avisa a las autoridades." },
                ],
              },
              {
                id: "e3",
                narra: "La clase terminó y tienes que decidir qué hacer con lo que sabes.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo reportas tú de inmediato a la línea de abuso de Texas, y avisas al pastor.", valor: 2, explica: "En Texas, la ley obliga a toda persona que sospeche que un niño sufre abuso a reportarlo de inmediato, y no exime a los ministros. Sigue también las normas de protección de tu iglesia." },
                  { texto: "Se lo cuentas a tu pastor y te quedas esperando a que él decida si lo reporta.", valor: 0, explica: "La ley de Texas obliga a toda persona que sospeche que un niño sufre abuso o descuido a reportarlo de inmediato." },
                  { texto: "Hablas tú a solas con ese adulto, para pedirle que deje de hacerle daño a la niña.", valor: 0, explica: "No se arregla a solas: se protege a la víctima y se avisa a las autoridades." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de célula te dice: Yo atiendo solo todos los problemas de mi grupo. No quiero molestar al pastor.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Jetro le dijo a Moisés que así no estaba bien, y que pida ayuda.", bien: true, explica: "El trabajo era demasiado pesado para uno solo: «en la multitud de consejeros hay seguridad»." },
              { texto: "Que lo felicitas, porque un buen líder no necesita la ayuda de nadie.", explica: "Jetro le dijo a Moisés: «No está bien lo que haces». Saber pedir ayuda también es parte de cuidar bien." },
              { texto: "Que pase todos sus casos al pastor y que ya no visite a nadie más.", explica: "Derivar no es abandonar: es buscar la mejor ayuda y seguir acompañando." },
              { texto: "Que deje de ser líder, porque se nota que no sabe hacer su trabajo.", explica: "No hace falta que deje de servir: necesita saber cuándo pasar el caso a alguien más preparado." },
            ],
            apoyo: "Saber pedir ayuda también es parte de cuidar bien",
            ref: "Éxodo 18:17-18",
            explica: "Como Moisés con el consejo de Jetro, quien cuida necesita saber cuándo pasar el caso a alguien más preparado: «en la multitud de consejeros hay seguridad».",
          },
          {
            caso: "Una hermana del ministerio de niños te dice: Si avisamos a las autoridades de ese abuso, vamos a manchar el nombre de la iglesia.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que avisar no es traicionar a la iglesia: es obedecer a Dios y proteger al débil.", bien: true, explica: "Las autoridades están puestas por Dios para hacer justicia y castigar el mal: avisarles es proteger al débil." },
              { texto: "Que tiene razón, y que es mejor arreglarlo dentro de la iglesia, sin avisar a nadie.", explica: "El abuso de un menor nunca se guarda en secreto: se protege a la víctima y se avisa a las autoridades." },
              { texto: "Que basta con que esa persona pida perdón y prometa no hacerlo más.", explica: "El abuso no se arregla solo con un perdón: se protege a la víctima y se avisa a las autoridades." },
              { texto: "Que esperen un tiempo, a ver si el problema se arregla solo con la oración.", explica: "El abuso no se arregla solo con una oración: en Texas, la ley obliga a reportarlo de inmediato." },
            ],
            apoyo: "Avisarles cuando hay abuso o un delito no es traicionar a la iglesia: es obedecer a Dios y proteger al débil",
            ref: "Romanos 13:3-4",
            explica: "La autoridad es servidor de Dios para nuestro bien: avisarle cuando hay abuso no es traicionar a la iglesia, sino obedecer a Dios y proteger al débil.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el riesgo de suicidio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Preguntarle con calma a alguien si piensa hacerse daño no le da la idea.", verdad: true, explica: "Preguntar no le da la idea, y puede salvarle la vida.", apoyo: "preguntar no le da la idea, y puede salvarle la vida" },
              { texto: "Si alguien te cuenta que quiere quitarse la vida, debes prometerle guardar el secreto.", verdad: false, explica: "No prometas guardar el secreto: no lo dejes solo y busca ayuda de inmediato.", apoyo: "no prometas guardar el secreto" },
              { texto: "Si hay peligro inmediato, en los Estados Unidos se llama al 911.", verdad: true, explica: "En otro país, se llama al número de emergencias de ese país.", apoyo: "Si hay peligro inmediato, llama al 911 en los Estados Unidos o al número de emergencias de tu país" },
            ],
          },
          {
            consigna: "Sobre el abuso y las líneas de ayuda: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El abuso de un menor se puede arreglar con una oración y un perdón, sin avisar a nadie.", verdad: false, explica: "El abuso de un menor nunca se guarda en secreto ni se arregla solo con una oración o un perdón.", apoyo: "El abuso de un menor nunca se guarda en secreto ni se arregla solo con una oración o un perdón" },
              { texto: "En Texas, la ley no exime a los ministros de reportar el abuso de un niño.", verdad: true, explica: "La ley obliga a toda persona que sospeche que un niño sufre abuso o descuido a reportarlo de inmediato.", apoyo: "la ley obliga a toda persona que sospeche que un niño sufre abuso o descuido a reportarlo de inmediato" },
              { texto: "La línea 988 atiende solo de día y solo en inglés.", verdad: false, explica: "La línea 988 de prevención del suicidio y crisis atiende de día y de noche, también en español.", apoyo: "atiende de día y de noche, también en español" },
              { texto: "Avisar a las autoridades cuando hay abuso es obedecer a Dios y proteger al débil.", verdad: true, explica: "No es traicionar a la iglesia: la autoridad es servidor de Dios para nuestro bien.", apoyo: "es obedecer a Dios y proteger al débil", ref: "Romanos 13:3-4" },
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
            consigna: "Completa lo que enseña el consejo de Jetro a Moisés.",
            texto: "Quien [[cuida]] a otros necesita saber cuándo pasar el [[caso]] a alguien más [[preparado]].",
            distractores: ["juzga", "chisme", "callado"],
            errores: {
              juzga: "Se habla de quien cuida a otros: como Moisés, no puede con todo él solo.",
              chisme: "Se pasa el caso a alguien más preparado: no es contar un chisme, es buscar la mejor ayuda.",
              callado: "El caso se pasa a alguien más preparado, que pueda dar la mejor ayuda.",
            },
            apoyo: "Quien cuida a otros necesita saber cuándo pasar el caso a alguien más preparado",
            ref: "Éxodo 18:17-18",
            explica: "Como Moisés con Jetro, quien cuida a otros necesita saber cuándo pasar el caso a alguien más preparado: derivar es buscar la mejor ayuda.",
          },
          {
            consigna: "Completa para qué están puestas las autoridades.",
            texto: "Las autoridades están puestas por [[Dios]] para hacer [[justicia]] y [[castigar]] el mal.",
            distractores: ["azar", "negocio", "premiar"],
            errores: {
              azar: "Las autoridades están puestas por Dios: la autoridad es servidor de Dios para nuestro bien.",
              negocio: "Las autoridades están para hacer justicia.",
              premiar: "Las autoridades están para castigar el mal y así proteger al débil.",
            },
            apoyo: "Las autoridades están puestas por Dios para hacer justicia y castigar el mal",
            ref: "Romanos 13:3-4",
            explica: "Las autoridades están puestas por Dios para hacer justicia y castigar el mal: avisarles cuando hay abuso es obedecer a Dios y proteger al débil.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Si alguien habla de quitarse la vida, pregúntale con calma si está pensando en hacerse daño",
            ref: "Proverbios 24:11",
            clave: {
              id: "pr-n3-consejeria-basica-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué haces si alguien te dice que piensa quitarse la vida?",
              ideas: [
                { id: "preguntar", peso: 30, texto: "Preguntarle con calma si está pensando en hacerse daño: preguntar no le da la idea, y puede salvarle la vida.", formas: ["pregunt* calma", "pregunt* si (esta|piensa|quiere|ha|tiene)", "hacerse dano", "hacerte dano", "salvarle la vida"] },
                { id: "no-solo", peso: 35, texto: "No dejarlo solo y no prometer guardar el secreto.", formas: ["(no|nunca|jamas|ni) dej* sol*", "(no|nunca|jamas|ni) promet*", "(no|nunca|jamas|ni) guard*", "sin dejar* sol*", "(quedo|quedarme|quedarse|quedar|estar|estoy|sigo|seguir|permanezco|permanecer) con (el|ella)", "acompan*"] },
                { id: "ayuda", peso: 35, texto: "Buscar ayuda de inmediato: avisar al pastor y a su familia; si hay peligro inmediato, llamar al 911 o al número de emergencias del país.", formas: ["busc* ayuda", "pid* ayuda", "de inmediato", "(avis*|llam*|cont*|habl*|dig*|decir*|aviso) pastor", "su familia", "911", "988", "emergencias"] },
              ],
              errores: [
                { id: "secreto", texto: "No prometas guardar el secreto: busca ayuda de inmediato.", formas: ["promet* secreto", "promet* guard*", "promet* callar*", "promet* (no|nunca) (decir*|contar*|dec*|cont*)", "guardar* (el|su|tu) secreto"], anula: "no-solo" },
              ],
              modelo: "Le pregunto con calma si está pensando en hacerse daño, porque preguntar no le da la idea. No lo dejo solo ni le prometo guardar el secreto, y busco ayuda de inmediato: aviso a mi pastor y a su familia, y si hay peligro llamo al 911.",
            },
          },
          {
            apoyo: "se protege a la víctima y se avisa a las autoridades",
            ref: "Proverbios 24:11",
            clave: {
              id: "pr-n3-consejeria-basica-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué se hace cuando hay sospecha de que un niño sufre abuso, según la lección?",
              ideas: [
                { id: "secreto", peso: 30, texto: "Nunca se guarda en secreto ni se arregla solo con una oración o un perdón.", formas: ["(no|nunca|jamas) guard*", "(no|nunca|jamas) se guard*", "(no|nunca|jamas) (lo|se) (calla|callo|oculta|esconde|tapa)", "(no|ni|nunca) se arregl*", "(no|ni|nunca) (solo|solamente) con", "(no|nunca|jamas) basta"] },
                { id: "proteger", peso: 30, texto: "Se protege a la víctima.", formas: ["proteg*", "cuid* (victima|nino|nina)"] },
                { id: "autoridades", peso: 40, texto: "Se avisa a las autoridades: en Texas, toda persona que sospeche debe reportarlo de inmediato a la línea de abuso de Texas, o al 911 si hay peligro inmediato.", formas: ["(avis*|report*|denunci*|llam*|inform*|cont*) autoridad*", "report*", "denunci*", "linea de abuso", "911", "policia"] },
              ],
              errores: [
                { id: "guardar", texto: "El abuso de un menor nunca se guarda en secreto.", formas: ["guard* secreto", "arregl* (con|solo|dentro)", "basta con (orar|una|perdon|el|que)"], anula: "secreto" },
              ],
              modelo: "Nunca se guarda en secreto ni se arregla solo con una oración o un perdón. Se protege a la víctima y se avisa a las autoridades: en Texas, toda persona que sospeche debe reportarlo de inmediato a la línea de abuso o, si hay peligro inmediato, al 911.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La ética y el cuidado del que ayuda
    "n3-consejeria-basica-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hace el de espíritu fiel con lo que le cuentan?", reverso: "«lo guarda todo»", apoyo: "Mas el de espíritu fiel lo guarda todo" },
              { frente: "¿Qué hace falta para pedir oración por algo que te contaron en confianza?", reverso: "El permiso de la persona.", apoyo: "ni siquiera como motivo de oración, sin permiso de la persona" },
              { frente: "¿En qué momento conviene avisar que el secreto tiene límites?", reverso: "Desde el principio.", apoyo: "La confidencialidad tiene límites, y conviene decirlo desde el principio" },
              { frente: "¿En qué casos no se guarda el secreto?", reverso: "Si hay peligro para la vida o abuso de un menor o de alguien vulnerable.", apoyo: "no se guarda el secreto cuando hay peligro para la vida de la persona o de otros" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde conviene reunirse para aconsejar a alguien?", reverso: "En lugares visibles o con otra persona cerca.", apoyo: "Reúnete en lugares visibles o con otra persona cerca" },
              { frente: "¿Qué haces para no crear dependencia?", reverso: "Ayudar a la persona a apoyarse en Dios, en su familia y en la iglesia, no solo en ti.", apoyo: "ayuda a la persona a apoyarse en Dios, en su familia y en la iglesia, no solo en ti" },
              { frente: "¿Qué necesita quien ayuda, porque también es frágil?", reverso: "Humildad, oración y personas a quienes rendir cuentas.", apoyo: "Quien ayuda también es frágil: necesita humildad, oración y personas a quienes rendir cuentas" },
              { frente: "¿Cuáles son algunas señales del desgaste?", reverso: "La irritación, el insomnio o las ganas de alejarte de todos.", apoyo: "reconoce las señales del desgaste: la irritación, el insomnio o las ganas de alejarte de todos" },
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
            consigna: "¿Se guarda en confianza o no se puede guardar en secreto? Lleva cada frase a su grupo.",
            grupos: ["Se guarda en confianza", "No se guarda en secreto"],
            frases: [
              { texto: "Una hermana cuenta que pelea con su suegra", grupo: 0 },
              { texto: "Un joven confiesa que le cuesta orar", grupo: 0 },
              { texto: "Un hermano cuenta que tiene deudas", grupo: 0 },
              { texto: "Un niño cuenta que un adulto le hace daño", grupo: 1 },
              { texto: "Alguien dice que piensa quitarse la vida", grupo: 1 },
              { texto: "Alguien dice que quiere hacerle daño a otro", grupo: 1 },
            ],
            apoyo: "no se guarda el secreto cuando hay peligro para la vida de la persona o de otros, ni cuando hay abuso de un menor o de otra persona vulnerable",
            explica: "Lo que te cuentan en confianza se guarda; pero no se guarda el secreto cuando hay peligro para la vida o abuso: entonces se avisa al pastor y a las autoridades.",
          },
          {
            consigna: "¿Lo guardas o avisas al pastor y a las autoridades? Lleva cada frase a su grupo.",
            grupos: ["Lo guardas en confianza", "Avisas al pastor y a las autoridades"],
            frases: [
              { texto: "Te cuenta que su matrimonio pasa por un mal momento", grupo: 0 },
              { texto: "Te confiesa un pecado que ya dejó", grupo: 0 },
              { texto: "Te cuenta sus problemas en el trabajo", grupo: 0 },
              { texto: "Una persona con discapacidad sufre abuso", grupo: 1 },
              { texto: "Un anciano sufre maltrato en su casa", grupo: 1 },
              { texto: "Te dice que piensa hacerse daño esta noche", grupo: 1 },
            ],
            apoyo: "En esos casos se avisa al pastor y a las autoridades",
            explica: "Lo que cada uno te confía se guarda; el abuso de una persona vulnerable o el peligro para la vida no se guardan: se avisa al pastor y a las autoridades.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Te voy a contar algo, pero prométeme que nunca se lo dirás a nadie.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo guardarás, salvo que haya peligro para una vida o un abuso.", bien: true, explica: "La confidencialidad tiene límites, y conviene decirlo desde el principio." },
              { texto: "Que nunca se lo dirás a nadie, pase lo que pase, te cuente lo que te cuente.", explica: "No se guarda el secreto cuando hay peligro para la vida o abuso: no prometas lo que no puedes cumplir." },
              { texto: "Que sí, aunque lo vas a pedir como motivo de oración en la célula.", explica: "Lo que te cuentan en confianza no se comenta, ni siquiera como motivo de oración, sin permiso de la persona." },
              { texto: "Que mejor no te cuente nada, porque a veces se te escapan las cosas.", explica: "Quien ayuda aprende a guardar lo que le confían: «el de espíritu fiel lo guarda todo»." },
            ],
            apoyo: "La confidencialidad tiene límites, y conviene decirlo desde el principio",
            explica: "El de espíritu fiel guarda el secreto, pero la confidencialidad tiene límites cuando hay peligro de vida o abuso, y conviene decirlo desde el principio.",
          },
          {
            caso: "Una líder del grupo de oración te dice: Elena me contó algo muy triste de su familia. ¿Lo compartimos para que todos oren?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no, a menos que Elena les dé permiso para compartirlo.", bien: true, explica: "Lo que te cuentan en confianza no se comenta con otros, ni siquiera como motivo de oración, sin permiso de la persona." },
              { texto: "Que sí: si es para orar, no hace falta pedirle permiso a nadie.", explica: "Ni siquiera como motivo de oración: sin permiso de la persona, no se comenta." },
              { texto: "Que sí, pero sin decir su nombre, aunque todos sepan quién es.", explica: "Si todos saben quién es, igual se descubre el secreto: «El que anda en chismes descubre el secreto»." },
              { texto: "Que mejor se lo cuenten solo a unos pocos hermanos de confianza.", explica: "Contarlo a unos pocos también es comentarlo sin permiso: «el de espíritu fiel lo guarda todo»." },
            ],
            apoyo: "Lo que te cuentan en confianza no se comenta con otros, ni siquiera como motivo de oración, sin permiso de la persona",
            ref: "Proverbios 11:13",
            explica: "Lo que te cuentan en confianza no se comenta, ni siquiera como motivo de oración, sin permiso de la persona: «el de espíritu fiel lo guarda todo».",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada norma de prudencia con lo que la completa.",
            pares: [
              ["Reúnete en lugares visibles", "Sobre todo con alguien del otro sexo o con un menor"],
              ["No toques a la persona", "Sin su permiso"],
              ["No crees dependencia", "Que se apoye en Dios, en su familia y en la iglesia"],
              ["No prometas lo que no puedes cumplir", "Ni intentes ser el salvador de nadie"],
              ["Si el caso te supera o te afecta", "Pídele ayuda a tu pastor"],
            ],
            apoyo: "Quien ayuda sigue normas de prudencia: lugares visibles, no crear dependencia y no prometer lo que no puede cumplir",
            explica: "Las normas de prudencia protegen a la persona, a quien ayuda y a la iglesia: lugares visibles, respeto, no crear dependencia, no prometer de más y pedir ayuda al pastor.",
          },
          {
            consigna: "¿Qué norma de prudencia pide cada caso? Une cada caso con su norma.",
            pares: [
              ["Vas a conversar a solas con un adolescente", "Reúnete en un lugar visible"],
              ["Quieres abrazar a alguien que llora", "Pídele permiso antes de tocarlo"],
              ["Una señora solo quiere hablar contigo", "No crees dependencia"],
              ["Quieres asegurarle que todo saldrá bien", "No prometas lo que no puedes cumplir"],
              ["El caso te quita el sueño", "Pídele ayuda a tu pastor"],
            ],
            apoyo: "Reúnete en lugares visibles o con otra persona cerca, sobre todo con alguien del otro sexo o con un menor",
            explica: "Con un menor, un lugar visible; antes de tocar, permiso; si te buscan solo a ti, no crees dependencia; no prometas de más; y si el caso te afecta, pide ayuda a tu pastor.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "No crees dependencia: ayuda a la persona a apoyarse en Dios, en su familia y en la iglesia, no solo en ti",
            ref: "Proverbios 11:13",
            situacion: "Eres servidor en el ministerio de jóvenes. Kevin, de 15 años, te pide hablar a solas de un problema que tiene.",
            escenas: [
              {
                id: "e1",
                narra: "Kevin te propone que hablen en tu carro, donde nadie los vea.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le propones hablar en un lugar visible de la iglesia, con otros cerca.", valor: 2, explica: "Reúnete en lugares visibles o con otra persona cerca, sobre todo con un menor." },
                  { texto: "Aceptas, porque así él se va a sentir más libre para contarte todo.", valor: 0, explica: "Con un menor, la norma es un lugar visible o con otra persona cerca: protege a la persona, a quien ayuda y a la iglesia." },
                  { texto: "Lo llevas a tu casa, donde nadie los va a interrumpir mientras hablan.", valor: 0, explica: "Las normas de prudencia protegen a la persona, a quien ayuda y a la iglesia: un lugar visible." },
                ],
              },
              {
                id: "e2",
                narra: "Mientras hablan, Kevin se pone a llorar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te quedas a su lado y le preguntas si quiere un abrazo.", valor: 2, explica: "No toques a la persona sin su permiso y cuida tus palabras." },
                  { texto: "Lo abrazas fuerte sin preguntarle nada, para que se calme.", valor: 0, explica: "No toques a la persona sin su permiso." },
                  { texto: "Le dices que deje de llorar, que ya está grande para eso.", valor: 0, explica: "Cuida tus palabras: una persona herida te abrió su corazón." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, Kevin te dice: Eres el único que me entiende. Solo voy a hablar contigo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que cuenta contigo, y que también se apoye en Dios y en su familia.", valor: 2, explica: "No crees dependencia: ayuda a la persona a apoyarse en Dios, en su familia y en la iglesia, no solo en ti." },
                  { texto: "Que sí: mientras te tenga a ti, ya no necesita hablar con nadie más.", valor: 0, explica: "No intentes ser el salvador de nadie: ayúdalo a apoyarse en Dios, en su familia y en la iglesia." },
                  { texto: "Que ya no te busque, para que no dependa de ti nunca más.", valor: 0, explica: "No crear dependencia no es dejarlo solo: ayúdalo a apoyarse también en Dios, en su familia y en la iglesia." },
                ],
              },
              {
                id: "e4",
                narra: "Kevin te contó que sus papás se están separando, y esa noche no puedes dormir pensando en él.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides ayuda a tu pastor, porque el caso te está afectando.", valor: 2, explica: "Si el caso te supera o te afecta, pídele ayuda a tu pastor." },
                  { texto: "Lo cuentas en tu casa para desahogarte un poco con tu familia.", valor: 0, explica: "Lo que te cuentan en confianza no se comenta con otros sin permiso de la persona." },
                  { texto: "Te lo guardas y sigues adelante tú solo, aunque no duermas bien.", valor: 1, explica: "Guardas la confianza, pero quien ayuda también es frágil: si el caso te afecta, pídele ayuda a tu pastor." },
                ],
              },
            ],
          },
          {
            apoyo: "No prometas lo que no puedes cumplir ni intentes ser el salvador de nadie",
            ref: "Gálatas 6:1",
            situacion: "Eres líder de célula. Doña Elvira, una señora de tu grupo que vive sola, te llama todos los días, a veces varias veces.",
            escenas: [
              {
                id: "e1",
                narra: "Doña Elvira te dice: Solo contigo puedo hablar; los demás no me entienden.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "La escuchas y la animas a apoyarse también en Dios y en su familia.", valor: 2, explica: "No crees dependencia: ayuda a la persona a apoyarse en Dios, en su familia y en la iglesia, no solo en ti." },
                  { texto: "Le dices que te llame a cualquier hora, que tú siempre la vas a salvar.", valor: 0, explica: "No intentes ser el salvador de nadie." },
                  { texto: "Dejas de contestarle, para que aprenda a no depender tanto de ti.", valor: 0, explica: "No crear dependencia no es dejarla sola: ayúdala a apoyarse también en Dios, en su familia y en la iglesia." },
                ],
              },
              {
                id: "e2",
                narra: "Ella te pide: Prométeme que nunca me vas a dejar sola.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que vas a seguir cerca, pero sin prometer lo que no puedes cumplir.", valor: 2, explica: "No prometas lo que no puedes cumplir: sí puedes seguir cerca y animarla." },
                  { texto: "Que se lo prometes: vas a estar disponible para ella todos los días.", valor: 0, explica: "No prometas lo que no puedes cumplir ni intentes ser el salvador de nadie." },
                  { texto: "Que no puedes prometerlo, y cambias de tema enseguida.", valor: 1, explica: "No prometer de más está bien, pero puedes decirle que vas a seguir cerca." },
                ],
              },
              {
                id: "e3",
                narra: "Doña Elvira te invita a su casa para conversar en la noche.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vas con otra persona del grupo, o le propones hablar en la iglesia.", valor: 2, explica: "Reúnete en lugares visibles o con otra persona cerca." },
                  { texto: "Vas solo a su casa en la noche, para que ella hable con más confianza.", valor: 0, explica: "Las normas de prudencia protegen a la persona, a quien ayuda y a la iglesia: lugares visibles o con otra persona cerca." },
                ],
              },
              {
                id: "e4",
                narra: "Después de varias semanas te sientes irritado y cansado de tanto escuchar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Descansas, cuidas tu tiempo con Dios y hablas con tu pastor.", valor: 2, explica: "Escuchar el dolor de otros cansa: guarda tu tiempo con Dios, descansa y comparte con tu pastor lo que te pesa." },
                  { texto: "Sigues igual sin decir nada, porque un buen siervo nunca se cansa.", valor: 0, explica: "Escuchar el dolor de otros cansa, y la irritación es una señal del desgaste." },
                  { texto: "Te alejas de todos un tiempo, sin decirle nada a nadie.", valor: 0, explica: "Las ganas de alejarte de todos son una señal del desgaste: comparte con tu pastor lo que te pesa." },
                ],
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
            consigna: "Completa lo que necesita quien ayuda a otros.",
            texto: "Quien ayuda también es [[frágil]]: necesita [[humildad]], oración y personas a quienes rendir [[cuentas]].",
            distractores: ["perfecto", "orgullo", "chismes"],
            errores: {
              perfecto: "Quien ayuda también es frágil: también puede ser tentado.",
              orgullo: "Pablo pide restaurar con espíritu de mansedumbre: hace falta humildad.",
              chismes: "Quien ayuda necesita personas a quienes rendir cuentas.",
            },
            apoyo: "Quien ayuda también es frágil: necesita humildad, oración y personas a quienes rendir cuentas",
            ref: "Gálatas 6:1",
            explica: "Pablo pide restaurar al que cayó con mansedumbre, considerándose a sí mismo: quien ayuda también es frágil y necesita humildad, oración y rendir cuentas.",
          },
          {
            consigna: "Completa cómo se cuida el que cuida a otros.",
            texto: "Guarda tu [[tiempo]] con Dios, [[descansa]] y reconoce las señales del [[desgaste]].",
            distractores: ["dinero", "trasnocha", "éxito"],
            errores: {
              dinero: "Se guarda el tiempo con Dios: es parte de cuidar al que cuida.",
              trasnocha: "Jesús les dijo a sus discípulos cansados: «descansad un poco».",
              "éxito": "Hay que reconocer las señales del desgaste: la irritación, el insomnio o las ganas de alejarte de todos.",
            },
            apoyo: "Guarda tu tiempo con Dios, descansa, comparte con tu pastor lo que te pesa, sin romper la confidencialidad, y reconoce las señales del desgaste",
            ref: "Marcos 6:31",
            explica: "Escuchar el dolor de otros cansa: guarda tu tiempo con Dios, descansa, comparte con tu pastor lo que te pesa y reconoce las señales del desgaste.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Y cuida su propia vida con humildad, rendición de cuentas y descanso, como enseñó Jesús",
            ref: "Marcos 6:31",
            clave: {
              id: "pr-n3-consejeria-basica-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo cuida su propia vida quien ayuda a otros, según la lección?",
              ideas: [
                { id: "humildad", peso: 50, texto: "Con humildad, oración y personas a quienes rendir cuentas, porque quien ayuda también es frágil.", formas: ["humild*", "rend* cuentas", "rendicion de cuentas", "(es|somos|soy|eres) fragil*", "orac*"] },
                { id: "descanso", peso: 50, texto: "Descansa y guarda su tiempo con Dios, como Jesús les dijo a sus discípulos: «descansad un poco».", formas: ["descans*", "tiempo con dios", "tiempo (de|a) solas"] },
              ],
              modelo: "Quien ayuda también es frágil: necesita humildad, oración y personas a quienes rendir cuentas. Además guarda su tiempo con Dios y descansa, como Jesús les dijo a sus discípulos cansados.",
            },
          },
          {
            apoyo: "Escuchar el dolor de otros cansa",
            ref: "Marcos 6:31",
            clave: {
              id: "pr-n3-consejeria-basica-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué señales del desgaste puede tener quien escucha el dolor de otros, y qué debe hacer?",
              ideas: [
                { id: "senales", peso: 50, texto: "La irritación, el insomnio o las ganas de alejarse de todos.", formas: ["irrit*", "insomnio", "no (puede|puedo|puedes|pueden|poder) dormir", "sin dormir", "alej* de todos", "ganas de alej*", "alejarse", "cansancio", "cansad*"] },
                { id: "hacer", peso: 50, texto: "Guardar su tiempo con Dios, descansar y compartir con su pastor lo que le pesa, sin romper la confidencialidad.", formas: ["descans*", "tiempo con dios", "(compart*|habl*|cont*|dig*|decir*|busc*) pastor", "lo que (le|me|te) pesa"] },
              ],
              modelo: "Las señales son la irritación, el insomnio o las ganas de alejarse de todos. Debe guardar su tiempo con Dios, descansar y compartir con su pastor lo que le pesa, sin romper la confidencialidad.",
            },
          },
        ],
      },
    ],
  },
};
