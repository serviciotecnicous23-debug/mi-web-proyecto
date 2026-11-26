/**
 * Las prácticas de «Historia de la iglesia I» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-historia-1.ts), con la guía de docs/academia-practicas.md.
 * Cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección; su
 * consigna dice qué hacer y con qué criterio, para que se entienda en todas sus formas de jugar. Las líneas del tiempo
 * usan solo las fechas y las épocas como las da la lección (los mártires, el canon, los concilios y el camino a la
 * Reforma), y los escenarios ministeriales llevan la lección al servicio de hoy: la fidelidad de cada día, la deidad de
 * Cristo y el amor por la Biblia.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_HISTORIA_1: PracticasMateria = {
  materia: "n3-historia-1",
  mision: {
    titulo: "Una gran nube de testigos",
    intro: "Tu pastor te pidió que prepares un curso para los nuevos creyentes sobre la historia de la iglesia, de Pentecostés a la víspera de la Reforma. Antes de enseñarlo, tienes que mostrar que conoces cada etapa: la iglesia de los apóstoles, los mártires, la defensa de la fe, los grandes concilios, la Edad Media y los que pidieron volver a la Biblia. Repasa las seis lecciones para preparar el curso completo.",
    cierre: "Ya puedes contar cómo Cristo cumplió su promesa de edificar su iglesia: nació en Pentecostés, fue fiel en la persecución, defendió la fe, confesó a Cristo verdadero Dios y verdadero hombre y volvió a la Palabra. «Jesucristo es el mismo ayer, y hoy, y por los siglos».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La iglesia de los apóstoles y su expansión
    "n3-historia-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo vino el Espíritu Santo sobre los discípulos?", reverso: "En la fiesta de Pentecostés, cincuenta días después de la Pascua en que murió Jesús.", apoyo: "En la fiesta de Pentecostés, cincuenta días después de la Pascua en que murió Jesús" },
              { frente: "¿Cuántas personas se añadieron cuando Pedro predicó en Pentecostés?", reverso: "«como tres mil personas».", apoyo: "Pedro predicó y se añadieron «como tres mil personas»" },
              { frente: "¿Quiénes eran los primeros creyentes de Jerusalén?", reverso: "Judíos que creían que Jesús es el Mesías.", apoyo: "Eran judíos que creían que Jesús es el Mesías" },
              { frente: "¿Dónde se reunían los primeros creyentes?", reverso: "En el templo y en las casas.", apoyo: "se reunían en el templo y en las casas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué prometió Jesús que haría con su iglesia?", reverso: "Edificarla: veinte siglos después, la iglesia sigue en pie.", apoyo: "Jesús prometió edificar su iglesia" },
              { frente: "¿Cuántos días después de la Pascua fue la fiesta de Pentecostés?", reverso: "Cincuenta días.", apoyo: "cincuenta días después de la Pascua en que murió Jesús" },
              { frente: "¿Quién predicó en Pentecostés, cuando vino el Espíritu Santo?", reverso: "Pedro.", apoyo: "Pedro predicó y se añadieron" },
              { frente: "¿En qué perseveraban los primeros creyentes?", reverso: "En cuatro cosas: la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones.", apoyo: "Los primeros creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones»" },
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
            consigna: "Completa cómo nació la iglesia en Pentecostés.",
            texto: "En la fiesta de Pentecostés, [[cincuenta]] días después de la [[Pascua]] en que murió Jesús, el Espíritu Santo vino sobre los discípulos y [[Pedro]] predicó.",
            distractores: ["cuarenta", "Navidad", "Pablo"],
            errores: {
              cuarenta: "Pentecostés fue cincuenta días después de la Pascua en que murió Jesús.",
              Navidad: "Pentecostés fue cincuenta días después de la Pascua, la fiesta en que murió Jesús.",
              Pablo: "En Pentecostés predicó Pedro; Pablo salió más tarde de Antioquía, con Bernabé.",
            },
            apoyo: "el Espíritu Santo vino sobre los discípulos, Pedro predicó y se añadieron «como tres mil personas»",
            ref: "Hechos 2:41-42",
            explica: "La iglesia nació en Pentecostés, cincuenta días después de la Pascua en que murió Jesús: el Espíritu Santo vino sobre los discípulos, Pedro predicó y se añadieron «como tres mil personas».",
          },
          {
            consigna: "Completa cómo vivían los primeros creyentes de Jerusalén.",
            texto: "Los primeros creyentes eran [[judíos]] que creían que Jesús es el [[Mesías]], y se reunían en el [[templo]] y en las casas.",
            distractores: ["romanos", "emperador", "palacio"],
            errores: {
              romanos: "Los primeros creyentes eran judíos que creían que Jesús es el Mesías.",
              emperador: "Los primeros creyentes creían que Jesús es el Mesías.",
              palacio: "Los primeros creyentes se reunían en el templo y en las casas.",
            },
            apoyo: "Eran judíos que creían que Jesús es el Mesías, y se reunían en el templo y en las casas",
            ref: "Hechos 2:41-42",
            explica: "Los primeros creyentes de Jerusalén eran judíos que creían que Jesús es el Mesías, y se reunían en el templo y en las casas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayudó a que el mensaje avanzara o fue el motor del avance? Lleva cada frase a su grupo.",
            grupos: ["Lo que ayudó al avance", "El motor del avance"],
            frases: [
              { texto: "Los caminos y la paz del Imperio romano", grupo: 0 },
              { texto: "El griego como lengua común", grupo: 0 },
              { texto: "Las sinagogas judías esparcidas por el mundo", grupo: 0, explica: "En las sinagogas solía empezar a predicar Pablo." },
              { texto: "El Espíritu Santo", grupo: 1 },
              { texto: "El testimonio de creyentes comunes", grupo: 1 },
            ],
            apoyo: "Pero el motor fue el Espíritu Santo y el testimonio de creyentes comunes",
            ref: "Hechos 1:8",
            explica: "Los caminos y la paz del Imperio romano, el griego como lengua común y las sinagogas ayudaron a que el mensaje avanzara; pero el motor fue el Espíritu Santo y el testimonio de creyentes comunes.",
          },
          {
            consigna: "¿Pasó en Jerusalén o en Antioquía de Siria? Lleva cada frase a su grupo.",
            grupos: ["En Jerusalén", "En Antioquía de Siria"],
            frases: [
              { texto: "El Espíritu Santo vino sobre los discípulos en Pentecostés", grupo: 0 },
              { texto: "Los creyentes se reunían en el templo y en las casas", grupo: 0 },
              { texto: "Los romanos destruyeron la ciudad y su templo en el año 70", grupo: 0 },
              { texto: "Nació una iglesia de judíos y gentiles", grupo: 1 },
              { texto: "A los discípulos se los llamó cristianos por primera vez", grupo: 1 },
              { texto: "Fue el punto de partida de Pablo y Bernabé", grupo: 1, explica: "De Antioquía salieron Pablo y Bernabé, y en pocos años había iglesias en Asia Menor, en Grecia y en Roma." },
            ],
            apoyo: "En Antioquía de Siria nació una iglesia de judíos y gentiles",
            ref: "Hechos 11:26",
            explica: "La iglesia nació en Jerusalén, en Pentecostés. La persecución esparció a los creyentes, y en Antioquía de Siria nació una iglesia de judíos y gentiles, de donde salieron Pablo y Bernabé.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu célula te dice: Anunciar el evangelio les toca a los pastores; yo solo soy un creyente común.",
            pregunta: "¿Qué le respondes desde la historia de la iglesia?",
            opciones: [
              { texto: "Que tiene razón: en los primeros años, solo los apóstoles anunciaban el evangelio.", explica: "Los que fueron esparcidos por la persecución «iban por todas partes anunciando el evangelio»: no eran solo los apóstoles." },
              { texto: "Que el motor del avance fue el Espíritu Santo y el testimonio de creyentes comunes.", bien: true, explica: "Así se extendió el evangelio de Jerusalén al mundo romano, como Jesús lo había anunciado en Hechos 1:8." },
              { texto: "Que el evangelio avanzó sobre todo gracias a los caminos y la paz del Imperio romano.", explica: "Los caminos y la paz del Imperio ayudaron, pero el motor fue el Espíritu Santo y el testimonio de creyentes comunes." },
              { texto: "Que eso fue así en el primer siglo, pero que hoy el testimonio de cada creyente ya no hace falta.", explica: "Eres parte de una historia de veinte siglos que Cristo mismo sigue escribiendo, y el motor del avance fue el testimonio de creyentes comunes." },
            ],
            apoyo: "Pero el motor fue el Espíritu Santo y el testimonio de creyentes comunes",
            ref: "Hechos 1:8",
            explica: "El evangelio no avanzó solo por los apóstoles: el motor fue el Espíritu Santo y el testimonio de creyentes comunes, como Jesús lo había anunciado.",
          },
          {
            caso: "Una joven que discipulas te escribe: Me tuve que mudar a otra ciudad y no conozco a nadie de la iglesia; siento que ya no puedo servir a Dios.",
            pregunta: "¿Qué le muestras de la iglesia de los primeros años?",
            opciones: [
              { texto: "Que espere a que llegue un pastor a esa ciudad antes de hablarle a alguien de Cristo.", explica: "Los creyentes esparcidos no esperaron a nadie: «iban por todas partes anunciando el evangelio»." },
              { texto: "Que sin un templo y una iglesia que la respalde, no hay manera de anunciar el evangelio.", explica: "Los creyentes esparcidos por la persecución anunciaban el evangelio por donde iban, aunque no tuvieran su iglesia cerca." },
              { texto: "Que los esparcidos «iban por todas partes anunciando el evangelio»: ella también puede.", bien: true, explica: "La persecución esparció a los creyentes, pero no los calló: el mensaje avanzó por el testimonio de creyentes comunes." },
              { texto: "Que lo mejor es callar su fe hasta que vuelva a su ciudad y a su iglesia de siempre.", explica: "Los que fueron esparcidos no callaron su fe: anunciaban el evangelio por todas partes." },
            ],
            apoyo: "los que fueron esparcidos «iban por todas partes anunciando el evangelio»",
            ref: "Hechos 8:4",
            explica: "La persecución esparció a los creyentes, pero no los calló: los que fueron esparcidos iban por todas partes anunciando el evangelio.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada nombre o fecha con lo que le corresponde según la lección.",
            pares: [
              ["Clemente de Roma", "Escribió una carta a los corintios hacia el año 96"],
              ["Ignacio de Antioquía", "Escribió siete cartas camino del martirio en Roma"],
              ["Policarpo", "Fue obispo de Esmirna"],
              ["El año 70", "Los romanos destruyeron Jerusalén y su templo"],
            ],
            apoyo: "A los maestros de la generación que siguió a los apóstoles se les llama Padres apostólicos",
            explica: "En el año 70, los romanos destruyeron Jerusalén y su templo. Después de los apóstoles enseñaron los Padres apostólicos: Clemente de Roma escribió a los corintios hacia el año 96, Ignacio de Antioquía escribió siete cartas camino del martirio y Policarpo fue obispo de Esmirna.",
          },
          {
            consigna: "¿Qué dice la lección de cada cosa? Une cada idea con lo que le corresponde.",
            pares: [
              ["Los escritos de los Padres apostólicos", "Son valiosos, pero no forman parte de la Biblia"],
              ["Esta materia", "Va de Pentecostés a la víspera de la Reforma"],
              ["Una gran nube de testigos", "De ella somos parte: la iglesia no empezó con nosotros"],
              ["Conocer la historia de la iglesia", "Nos hace humildes, agradecidos y firmes en la fe"],
            ],
            apoyo: "Conocer su historia nos hace humildes, agradecidos y firmes en la fe",
            ref: "Hebreos 12:1",
            explica: "Los escritos de los Padres apostólicos son valiosos, pero no forman parte de la Biblia. Esta materia va de Pentecostés a la víspera de la Reforma, y conocer la historia de la iglesia nos hace humildes, agradecidos y firmes en la fe.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La estudiamos para saber de dónde venimos, para aprender de los aciertos y de los errores de los que nos precedieron y para dar gracias a Dios",
            ref: "Mateo 16:18",
            clave: {
              id: "pr-n3-historia-1-1-a6-1",
              tipo: "corta",
              pregunta: "¿Para qué estudiamos la historia de la iglesia?",
              ideas: [
                { id: "venimos", peso: 35, texto: "Para saber de dónde venimos.", formas: ["de donde venimos", "donde venimos", "de donde viene* (la|nuestra)", "nuestras raices", "nuestro origen"] },
                { id: "aprender", peso: 35, texto: "Para aprender de los aciertos y de los errores de los que nos precedieron.", formas: ["aciertos", "errores", "aprend* de (los|sus|nuestros|la)", "nos precedieron", "vinieron antes"] },
                { id: "gracias", peso: 30, texto: "Para dar gracias a Dios: en ella vemos a Cristo cumplir su promesa de edificar su iglesia.", formas: ["dar gracias", "dando gracias", "damos gracias", "agradec*", "gracias a dios", "cumpl* su promesa", "promesa de edificar", "edific* su iglesia"] },
              ],
              modelo: "Estudiamos la historia de la iglesia para saber de dónde venimos, para aprender de los aciertos y de los errores de los que nos precedieron y para dar gracias a Dios, porque en ella vemos a Cristo cumplir su promesa de edificar su iglesia.",
            },
          },
          {
            apoyo: "Sus escritos son valiosos, pero no forman parte de la Biblia",
            clave: {
              id: "pr-n3-historia-1-1-a6-2",
              tipo: "corta",
              pregunta: "¿Quiénes fueron los Padres apostólicos y qué valor tienen sus escritos?",
              ideas: [
                { id: "quienes", peso: 50, texto: "Fueron los maestros de la generación que siguió a los apóstoles, como Clemente de Roma, Ignacio de Antioquía y Policarpo.", formas: ["generacion que sigui*", "siguio a los apostoles", "siguieron a los apostoles", "despues de los apostoles", "clemente", "ignacio", "policarpo"] },
                { id: "valor", peso: 50, texto: "Sus escritos son valiosos, pero no forman parte de la Biblia.", formas: ["no (es|son|forma|forman) parte de la biblia", "no (es|son|forma|forman) parte de las escrituras", "no (esta|estan) en la biblia", "no (es|son) (biblia|escritura|inspirados|inspirado)", "no (es|son) palabra (inspirada|de)", "fuera de la biblia"] },
              ],
              errores: [
                { id: "biblia", texto: "Los escritos de los Padres apostólicos son valiosos, pero no forman parte de la Biblia.", formas: ["(forman|forma|son|es) parte de la biblia", "(estan|esta) en la biblia"], anula: "valor" },
              ],
              modelo: "Los Padres apostólicos fueron los maestros de la generación que siguió a los apóstoles, como Clemente de Roma, Ignacio de Antioquía y Policarpo. Sus escritos son valiosos, pero no forman parte de la Biblia.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Los mártires: fieles hasta la muerte
    "n3-historia-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué significa la palabra mártir, que viene del griego?", reverso: "Testigo: así llamamos a los que murieron por su fe.", apoyo: "A los que murieron por su fe los llamamos mártires, una palabra que viene del griego y significa testigos" },
              { frente: "¿De qué culpó Nerón a los cristianos en el año 64?", reverso: "Del incendio de Roma.", apoyo: "Nerón (año 64): culpó a los cristianos del incendio de Roma" },
              { frente: "¿Qué ordenó Decio en el año 250?", reverso: "Que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado.", apoyo: "ordenó que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado" },
              { frente: "¿Cómo se conoce la persecución de Diocleciano, desde el año 303?", reverso: "Como la gran persecución, la más dura.", apoyo: "Diocleciano (desde el año 303): la gran persecución, la más dura" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Durante cuánto tiempo ser cristiano podía costar la vida?", reverso: "Durante casi tres siglos.", apoyo: "Durante casi tres siglos, ser cristiano podía costar la vida" },
              { frente: "¿Qué respondió Policarpo cuando le exigieron que maldijera a Cristo?", reverso: "Que lo había servido ochenta y seis años y que nunca le había hecho ningún mal.", apoyo: "respondió que lo había servido ochenta y seis años y que nunca le había hecho ningún mal" },
              { frente: "¿Quiénes eran Perpetua y Felicidad?", reverso: "Dos jóvenes recién convertidas que murieron en Cartago antes que negar a Cristo.", apoyo: "dos jóvenes recién convertidas" },
              { frente: "¿Qué cuenta una tradición antigua sobre Pedro y Pablo?", reverso: "Que murieron en Roma en los años de Nerón.", apoyo: "Según una tradición antigua, Pedro y Pablo murieron en Roma en esos años" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo las persecuciones y los mártires, de Nerón a Diocleciano.",
            eventos: [
              { texto: "Nerón culpa a los cristianos del incendio de Roma", fecha: "Año 64" },
              { texto: "Policarpo se niega a maldecir a Cristo", fecha: "Hacia el año 155" },
              { texto: "Perpetua y Felicidad mueren en Cartago antes que negar a Cristo", fecha: "Año 203" },
              { texto: "Decio ordena que todos ofrezcan sacrificio a los dioses", fecha: "Año 250" },
              { texto: "Diocleciano lanza la gran persecución, la más dura", fecha: "Desde el año 303" },
            ],
            apoyo: "Durante casi tres siglos, de Nerón (64) a Diocleciano (303), la iglesia sufrió persecuciones",
            ref: "Apocalipsis 2:10",
            explica: "Nerón persiguió en el año 64; Policarpo fue fiel hacia el 155; Perpetua y Felicidad murieron en el 203; Decio ordenó los sacrificios en el 250, y la gran persecución de Diocleciano empezó en el 303.",
          },
          {
            consigna: "Ordena estos hechos de la iglesia perseguida en el tiempo, del primero al último.",
            eventos: [
              { texto: "Roma se incendia y Nerón culpa a los cristianos", fecha: "Año 64" },
              { texto: "Tertuliano escribe que la sangre de los cristianos es semilla", fecha: "Hacia el año 197" },
              { texto: "Felicidad, una esclava, da a luz en la cárcel y muere fiel", fecha: "Año 203" },
              { texto: "Muchos resisten la orden de Decio; otros niegan la fe por miedo", fecha: "Año 250" },
              { texto: "Se destruyen templos y se queman Escrituras", fecha: "Desde el año 303" },
            ],
            apoyo: "Durante casi tres siglos, ser cristiano podía costar la vida",
            ref: "Apocalipsis 2:10",
            explica: "Después de Nerón (64), Tertuliano escribió hacia el 197 que la sangre de los cristianos es semilla; Perpetua y Felicidad murieron en el 203; Decio persiguió en el 250, y Diocleciano, desde el 303.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las persecuciones, de Nerón a Diocleciano: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Nerón culpó a los cristianos del incendio de Roma en el año 64.", verdad: true, explica: "Y, según una tradición antigua, Pedro y Pablo murieron en Roma en esos años.", apoyo: "Nerón (año 64): culpó a los cristianos del incendio de Roma" },
              { texto: "Decio dio libertad a los cristianos para adorar a Dios en paz.", verdad: false, explica: "Decio, en el año 250, ordenó que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado.", apoyo: "ordenó que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado" },
              { texto: "La persecución de Diocleciano, desde el año 303, fue la más dura.", verdad: true, explica: "Se destruyeron templos, se quemaron Escrituras y se encarceló y mató a muchos creyentes.", apoyo: "Diocleciano (desde el año 303): la gran persecución, la más dura" },
            ],
          },
          {
            consigna: "Sobre la iglesia perseguida: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las persecuciones fueron continuas y ocurrieron en todo el Imperio a la vez.", verdad: false, explica: "No fueron continuas ni ocurrieron en todo el Imperio a la vez: hubo épocas de calma y épocas de violencia.", apoyo: "Las persecuciones no fueron continuas ni ocurrieron en todo el Imperio a la vez" },
              { texto: "Durante casi tres siglos, ser cristiano podía costar la vida.", verdad: true, explica: "De Nerón (64) a Diocleciano (303), la iglesia sufrió persecuciones.", apoyo: "Durante casi tres siglos, ser cristiano podía costar la vida" },
              { texto: "Cuando le exigieron que maldijera a Cristo, Policarpo lo negó para salvar su vida.", verdad: false, explica: "Policarpo respondió que había servido a Cristo ochenta y seis años y que nunca le había hecho ningún mal: ¿cómo iba a negar a su Rey, que lo salvó?", apoyo: "¿cómo iba a negar a su Rey, que lo salvó?" },
              { texto: "Bajo Decio, muchos resistieron, pero otros negaron la fe por miedo.", verdad: true, explica: "Decio ordenó que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado.", apoyo: "Muchos resistieron; otros negaron la fe por miedo" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es lo que decían contra los cristianos o es cómo respondieron los mártires? Lleva cada frase a su grupo.",
            grupos: ["Lo que decían contra ellos", "Cómo respondieron los mártires"],
            frases: [
              { texto: "Que eran ateos, porque no adoraban a los dioses", grupo: 0 },
              { texto: "Que eran enemigos del Imperio", grupo: 0, explica: "Los acusaban así porque no ofrecían sacrificios al emperador." },
              { texto: "Rumores falsos sobre sus reuniones", grupo: 0 },
              { texto: "No respondieron con odio", grupo: 1 },
              { texto: "Siguieron el ejemplo de Esteban, que murió orando", grupo: 1 },
              { texto: "Fueron fieles hasta la muerte", grupo: 1 },
            ],
            apoyo: "A los cristianos los acusaban falsamente de ateos, porque no adoraban a los dioses, y de enemigos del Imperio",
            ref: "Hechos 7:59-60",
            explica: "A los cristianos los acusaban falsamente de ateos y de enemigos del Imperio, y corrían rumores falsos sobre sus reuniones. Los mártires no respondieron con odio: siguieron el ejemplo de Esteban y fueron fieles hasta la muerte.",
          },
          {
            consigna: "¿Es lo que pensaban los romanos o lo que confesaban los cristianos? Lleva cada frase a su grupo.",
            grupos: ["Lo que pensaban los romanos", "Lo que confesaban los cristianos"],
            frases: [
              { texto: "Honrar a los dioses es parte de ser un buen ciudadano", grupo: 0 },
              { texto: "Hay que honrar al emperador", grupo: 0 },
              { texto: "Quien no adora a los dioses es un ateo", grupo: 0 },
              { texto: "Hay un solo Dios", grupo: 1 },
              { texto: "Jesús es el Señor", grupo: 1 },
              { texto: "Es mejor morir que negar a Cristo", grupo: 1, explica: "Perpetua y Felicidad murieron antes que negar a Cristo." },
            ],
            apoyo: "Los cristianos adoraban a un solo Dios y confesaban que Jesús es el Señor",
            ref: "Apocalipsis 2:10",
            explica: "Para los romanos, honrar a los dioses y al emperador era parte de ser un buen ciudadano. Los cristianos adoraban a un solo Dios y confesaban que Jesús es el Señor: en el fondo, el conflicto era quién es el Señor.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La fidelidad de los mártires empieza en las decisiones pequeñas de cada día.",
            ref: "Apocalipsis 2:10",
            situacion: "Eres líder de una célula de jóvenes. Varios de ellos estudian o trabajan en lugares donde se burlan de los cristianos.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven cuenta que en el trabajo se burlan de él porque ora antes de comer, y que piensa dejar de hacerlo.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la fidelidad empieza en lo pequeño: que siga orando sin avergonzarse de Cristo.", valor: 2, explica: "La fidelidad de los mártires empieza en las decisiones pequeñas de cada día, como confesar a Cristo con una oración antes de comer.", siguiente: "e2" },
                  { texto: "Que ore en silencio por un tiempo, y que vuelva a hacerlo delante de todos cuando se sienta fuerte.", valor: 1, explica: "Orar en silencio no es pecado, pero la lección de los mártires es otra: la fidelidad empieza en las decisiones pequeñas de cada día." },
                  { texto: "Que lo deje: orar antes de comer es algo tan pequeño que a Dios no le importa nada.", valor: 0, explica: "Lo pequeño sí importa: la fidelidad de los mártires empieza en las decisiones pequeñas de cada día.", siguiente: "fin" },
                ],
              },
              {
                id: "e1b",
                narra: "A la semana siguiente, el joven cuenta que ya dejó de orar antes de comer y que nadie se dio cuenta.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras con él, le recuerdas que la fidelidad empieza en lo pequeño y lo animas a volver a orar.", valor: 2, explica: "Así lo acompañas: la fidelidad de los mártires empieza en las decisiones pequeñas de cada día." },
                  { texto: "Le dices que no pasa nada, porque lo que cuenta es lo que uno cree y no lo que hace delante de los demás.", valor: 0, explica: "Los mártires confesaron a Cristo con su vida: la fidelidad se ve en las decisiones pequeñas de cada día.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Una joven dice que siente rabia contra los compañeros que se burlan de ella y que quiere responderles igual.",
                pregunta: "¿Qué le enseñas del ejemplo de los mártires?",
                opciones: [
                  { texto: "Que les responda con la misma burla, para que aprendan que con los cristianos no se juega.", valor: 0, explica: "Los mártires no respondieron con odio: siguieron el ejemplo de Esteban, que murió orando." },
                  { texto: "Que no responda con odio, como los mártires, sino que ore por ellos, como Esteban.", valor: 2, explica: "Esteban murió orando: «Señor, no les tomes en cuenta este pecado». Así respondieron los mártires." },
                  { texto: "Que se aleje de ellos por un tiempo y que le cuente a Dios en oración todo lo que siente.", valor: 1, explica: "Alejarse y orar puede ayudar, pero el ejemplo de los mártires va más allá: no respondieron con odio, y Esteban murió orando: «Señor, no les tomes en cuenta este pecado»." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, alguien comenta que la persecución de los cristianos ya es cosa del pasado.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que hoy también hay creyentes encarcelados o muertos por su fe: oremos por ellos.", valor: 2, explica: "La persecución no es solo cosa del pasado. Ora por los perseguidos, como pide Hebreos 13:3." },
                  { texto: "Que puede ser, y que mejor no hablemos de temas tan tristes en una reunión de jóvenes.", valor: 1, explica: "No hace falta asustar a nadie, pero sí orar: hoy también hay creyentes encarcelados o muertos por su fe." },
                  { texto: "Que tiene razón: desde que terminó el Imperio romano, nadie sufre por ser cristiano.", valor: 0, explica: "La persecución no es solo cosa del pasado: hoy también hay creyentes encarcelados o muertos por su fe en muchos países." },
                ],
              },
            ],
          },
          {
            apoyo: "pide a Dios fidelidad en las pruebas pequeñas de cada día",
            ref: "1 Pedro 4:12-16",
            situacion: "Acompañas a un hermano nuevo en la fe. Su familia no es creyente y en su casa le cuesta mucho confesar a Cristo.",
            escenas: [
              {
                id: "e1",
                narra: "Te cuenta que en su casa se burlan de él cuando lee la Biblia, y que piensa esconder su fe para tener paz.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que esconda su fe por ahora: la paz de la casa vale más que confesar a Cristo.", valor: 0, explica: "Los mártires murieron antes que negar a Cristo, y su fidelidad empezó en las pruebas pequeñas de cada día.", siguiente: "fin" },
                  { texto: "Que siga leyendo la Biblia con humildad: esa prueba pequeña es parte de su fidelidad.", valor: 2, explica: "Así se pide a Dios fidelidad en las pruebas pequeñas de cada día, como enseña el ejemplo de los mártires." },
                  { texto: "Que la lea solo cuando nadie lo vea, hasta que su familia se acostumbre a su nueva fe.", valor: 1, explica: "Leer a solas no está mal, pero esconder su fe no es el camino: la fidelidad empieza en las decisiones pequeñas." },
                ],
              },
              {
                id: "e2",
                narra: "Semanas después, su hermano mayor lo insulta delante de todos por ir a la iglesia.",
                pregunta: "¿Cómo le enseñas a responder?",
                opciones: [
                  { texto: "Que no le conteste nada y que se vaya a su cuarto hasta que se calmen un poco las cosas.", valor: 1, explica: "No devolver el insulto está bien, pero los mártires fueron más allá: no respondieron con odio y oraron." },
                  { texto: "Que le devuelva cada insulto, para que su hermano aprenda a respetar su fe.", valor: 0, explica: "Los mártires no respondieron con odio: siguieron el ejemplo de Esteban, que murió orando." },
                  { texto: "Que responda sin odio, como los mártires, y que ore por su hermano, como Esteban.", valor: 2, explica: "Esteban murió orando: «Señor, no les tomes en cuenta este pecado». Los mártires no respondieron con odio." },
                ],
              },
              {
                id: "e3",
                narra: "Un día te dice que, comparado con los mártires, lo que él vive es tan pequeño que no vale nada.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la fidelidad de los mártires empieza en las decisiones pequeñas de cada día.", valor: 2, explica: "Lo que vive en su casa sí cuenta: la fidelidad de los mártires empieza en las decisiones pequeñas de cada día." },
                  { texto: "Que tiene razón: la fidelidad solo cuenta de verdad cuando a uno lo llevan a la cárcel.", valor: 0, explica: "La fidelidad empieza en lo pequeño: pide a Dios fidelidad en las pruebas pequeñas de cada día." },
                  { texto: "Que no se compare con nadie, y que siga yendo a la iglesia cada domingo sin faltar.", valor: 1, explica: "Ir a la iglesia es bueno, pero lo que vive en su casa sí cuenta: la fidelidad empieza en las decisiones pequeñas de cada día." },
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
            apoyo: "En el fondo, el conflicto era quién es el Señor",
            ref: "Apocalipsis 2:8-10",
            clave: {
              id: "pr-n3-historia-1-2-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué el Imperio romano perseguía a los cristianos?",
              ideas: [
                { id: "dioses", peso: 50, texto: "Los cristianos adoraban a un solo Dios y no ofrecían sacrificios a los dioses ni al emperador: por eso los acusaban falsamente de ateos y de enemigos del Imperio.", formas: ["un solo dios", "no adoraban a los dioses", "no adorar a los dioses", "no ofrecian sacrifici*", "no ofrecer sacrifici*", "sacrifici* al emperador", "ateos", "enemigos del imperio"] },
                { id: "senor", peso: 50, texto: "En el fondo, el conflicto era quién es el Señor: confesaban que Jesús, y no el emperador, es el Señor.", formas: ["quien es el senor", "(jesus|cristo) es el senor", "(jesus|cristo) era el senor", "(jesus|cristo) es su senor", "confesaban que (jesus|cristo)", "no el emperador", "senor y no el emperador"] },
              ],
              errores: [
                { id: "muchos", texto: "Fue al revés: los cristianos adoraban a un solo Dios, y por eso los acusaban falsamente de ateos.", formas: ["adoraban a (muchos|varios|otros) dioses", "adoraban a los dioses", "adoraban muchos dioses"], anula: "dioses" },
              ],
              modelo: "Porque los cristianos adoraban a un solo Dios y no ofrecían sacrificios al emperador; por eso los acusaban falsamente de ateos y de enemigos del Imperio. En el fondo, el conflicto era quién es el Señor: Jesús, y no el emperador.",
            },
          },
          {
            apoyo: "Los mártires no respondieron con odio",
            ref: "Hechos 7:59-60",
            clave: {
              id: "pr-n3-historia-1-2-a6-2",
              tipo: "corta",
              pregunta: "¿Cómo respondieron los mártires a la persecución, y qué pasó con la iglesia?",
              ideas: [
                { id: "odio", peso: 50, texto: "No respondieron con odio: siguieron el ejemplo de Esteban, que murió orando, y fueron fieles hasta la muerte.", formas: ["sin odio", "no respond* con odio", "no (odiaron|odiaban)", "ejemplo de esteban", "como esteban", "muri* orando", "orando", "oraron", "fieles hasta la muerte", "fieles hasta morir", "perdon*"] },
                { id: "semilla", peso: 50, texto: "Su testimonio hizo crecer a la iglesia: la sangre de los cristianos es semilla.", formas: ["semilla", "mas crecia", "creci* la iglesia", "hizo crecer", "la iglesia creci*", "crecimiento"] },
              ],
              modelo: "Los mártires no respondieron con odio: siguieron el ejemplo de Esteban, que murió orando, y fueron fieles hasta la muerte. Su testimonio hizo crecer a la iglesia, porque, como escribió Tertuliano, la sangre de los cristianos es semilla.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Defender la fe: apologistas, canon y credos
    "n3-historia-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En qué dos frentes defendió la fe la iglesia del siglo II?", reverso: "Respondió a las acusaciones de los paganos y enfrentó las falsas enseñanzas.", apoyo: "responder a las acusaciones de los paganos y enfrentar las falsas enseñanzas" },
              { frente: "¿De dónde viene el nombre de los apologistas?", reverso: "De apología, la palabra griega que se traduce defensa.", apoyo: "De la palabra griega que se traduce defensa, apología, viene el nombre de los apologistas" },
              { frente: "¿Quién es el apologista más conocido?", reverso: "Justino Mártir, un filósofo que se convirtió a Cristo.", apoyo: "El más conocido es Justino Mártir, un filósofo que se convirtió a Cristo" },
              { frente: "¿Qué obra escribió Ireneo hacia el año 180?", reverso: "Contra las herejías.", apoyo: "escribió hacia el año 180 su obra Contra las herejías" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué enseñaban los gnósticos sobre la salvación?", reverso: "Que viene de un conocimiento secreto para unos pocos.", apoyo: "la salvación viene de un conocimiento secreto para unos pocos" },
              { frente: "¿Qué rechazó Marción hacia el año 144?", reverso: "El Antiguo Testamento: se quedó solo con parte de Lucas y diez cartas de Pablo.", apoyo: "Marción, hacia el año 144, rechazó el Antiguo Testamento" },
              { frente: "¿De quién fue discípulo Ireneo, obispo de Lyon?", reverso: "De Policarpo.", apoyo: "Ireneo, obispo de Lyon y discípulo de Policarpo" },
              { frente: "¿Qué prueba había dado Juan frente a los que negaban el cuerpo de Jesús?", reverso: "«Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».", apoyo: "Juan ya había dado la prueba" },
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
            consigna: "Une a cada persona o grupo con lo que la lección dice de él.",
            pares: [
              ["Justino Mártir", "Filósofo convertido que escribió sus apologías hacia el año 150"],
              ["Los gnósticos", "Enseñaban que la materia es mala"],
              ["Marción", "Rechazó el Antiguo Testamento hacia el año 144"],
              ["Ireneo", "Obispo de Lyon que escribió Contra las herejías"],
            ],
            apoyo: "Ireneo, obispo de Lyon y discípulo de Policarpo, escribió hacia el año 180 su obra Contra las herejías",
            explica: "Justino defendió la fe ante los paganos; los gnósticos y Marción enseñaban errores, e Ireneo mostró que la fe de la iglesia era la misma que habían enseñado los apóstoles.",
          },
          {
            consigna: "¿Qué corresponde a cada uno? Une cada nombre o palabra con lo que le corresponde.",
            pares: [
              ["Apología", "La palabra griega que se traduce defensa"],
              ["Ireneo", "Mostró que la fe de la iglesia era la de los apóstoles"],
              ["Marción", "Se quedó con parte de Lucas y diez cartas de Pablo"],
              ["Muchos gnósticos", "Negaban que Jesús hubiera tenido un cuerpo verdadero"],
              ["Justino Mártir", "Murió como mártir en Roma"],
            ],
            apoyo: "viene el nombre de los apologistas, que escribieron para defender la fe",
            ref: "1 Pedro 3:15",
            explica: "Los apologistas, como Justino, escribieron para defender la fe; Marción y los gnósticos enseñaban errores, e Ireneo mostró que la fe de la iglesia era la misma que habían enseñado los apóstoles.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo reconoció la iglesia los libros del Nuevo Testamento.",
            texto: "La iglesia [[reconoció]] los libros que Dios había [[inspirado]], por su origen apostólico, su enseñanza [[fiel]] y su uso en las iglesias de todas partes.",
            distractores: ["inventó", "rechazado", "secreta"],
            errores: {
              inventó: "La iglesia no inventó el canon: reconoció los libros que Dios había inspirado.",
              rechazado: "La iglesia reconoció los libros que Dios había inspirado.",
              secreta: "La enseñanza secreta para unos pocos era la de los gnósticos; los libros se reconocieron por su enseñanza fiel.",
            },
            apoyo: "reconoció los libros que Dios había inspirado, por su origen apostólico, su enseñanza fiel y su uso en las iglesias de todas partes",
            ref: "2 Pedro 3:15-16",
            explica: "La iglesia no inventó el canon: reconoció los libros que Dios había inspirado, por su origen apostólico, su enseñanza fiel y su uso en las iglesias de todas partes.",
          },
          {
            consigna: "Completa cómo se fue reconociendo la lista del Nuevo Testamento.",
            texto: "Ya Pedro contaba las [[cartas]] de Pablo entre las Escrituras, y en el año 367 [[Atanasio]] escribió la [[lista]] de los 27 libros del Nuevo Testamento.",
            distractores: ["herejías", "Marción", "condena"],
            errores: {
              herejías: "Pedro contaba las cartas de Pablo junto a «las otras Escrituras».",
              Marción: "Marción rechazó el Antiguo Testamento; la lista de los 27 libros la escribió Atanasio de Alejandría.",
              condena: "Atanasio escribió la lista de los 27 libros del Nuevo Testamento que tenemos hoy.",
            },
            apoyo: "Ya Pedro contaba las cartas de Pablo junto a «las otras Escrituras»",
            ref: "2 Pedro 3:15-16",
            explica: "Ya Pedro contaba las cartas de Pablo junto a «las otras Escrituras». En el año 367, Atanasio de Alejandría escribió la lista de los 27 libros del Nuevo Testamento que tenemos hoy.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo cómo la iglesia defendió la fe y reconoció el Nuevo Testamento.",
            eventos: [
              { texto: "Marción rechaza el Antiguo Testamento", fecha: "Hacia el año 144" },
              { texto: "Justino Mártir escribe sus apologías", fecha: "Hacia el año 150" },
              { texto: "Ireneo escribe Contra las herejías", fecha: "Hacia el año 180" },
              { texto: "Atanasio escribe la lista de los 27 libros", fecha: "En el año 367" },
              { texto: "El concilio de Cartago reconoce la misma lista", fecha: "397" },
            ],
            apoyo: "Frente a esas confusiones, la iglesia necesitaba saber con claridad qué libros eran Escritura",
            ref: "2 Pedro 3:15-16",
            explica: "Hacia el 144 Marción rechazó el Antiguo Testamento; Justino escribió hacia el 150 e Ireneo hacia el 180. En el 367 Atanasio escribió la lista de los 27 libros, y el concilio de Cartago (397) reconoció la misma lista.",
          },
          {
            consigna: "Ordena estos hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Marción se queda con parte de Lucas y diez cartas de Pablo", fecha: "Hacia el año 144" },
              { texto: "Ireneo muestra que la fe de la iglesia es la de los apóstoles", fecha: "Hacia el año 180" },
              { texto: "Atanasio de Alejandría escribe la lista del Nuevo Testamento", fecha: "En el año 367" },
              { texto: "El concilio de Hipona reconoce la lista de los 27 libros", fecha: "393" },
              { texto: "Otro concilio, en Cartago, reconoce los mismos libros", fecha: "397" },
            ],
            apoyo: "los concilios de Hipona (393) y de Cartago (397) reconocieron la misma lista",
            ref: "2 Pedro 3:15-16",
            explica: "Marción (hacia el 144) rechazó el Antiguo Testamento e Ireneo (hacia el 180) defendió la fe de los apóstoles. Atanasio escribió la lista de los 27 libros en el 367, y los concilios de Hipona (393) y de Cartago (397) reconocieron la misma lista.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los credos tiene un error. Tócala.",
            frases: [
              "Desde muy temprano, la iglesia resumió su fe en fórmulas breves.",
              "Las fórmulas breves de la fe se confesaban en el bautismo.",
              "Los apóstoles escribieron el Credo apostólico tal como lo confesamos hoy.",
              "El Credo apostólico resume lo que enseñaron los apóstoles.",
            ],
            malo: 2,
            correccion: "No lo escribieron los apóstoles: viene de una fórmula usada en Roma en el siglo II, y su forma actual quedó fijada siglos después.",
            apoyo: "De una de ellas, usada en Roma en el siglo II, viene el Credo apostólico, cuya forma actual quedó fijada siglos después",
            ref: "2 Timoteo 1:13-14",
            explica: "El Credo apostólico no lo escribieron los apóstoles, pero resume lo que ellos enseñaron: un solo Dios, Padre, Hijo y Espíritu Santo, y la obra de Cristo.",
          },
          {
            consigna: "Una de estas frases sobre la autoridad de los credos tiene un error. Tócala.",
            frases: [
              "Los credos son útiles porque resumen la fe.",
              "La autoridad de un credo está por encima de la autoridad de la Biblia.",
              "Solo la Escritura es la Palabra inspirada de Dios.",
              "El Credo apostólico confiesa a un solo Dios, Padre, Hijo y Espíritu Santo.",
            ],
            malo: 1,
            correccion: "La autoridad de los credos viene de que dicen lo que dice la Biblia: la Biblia está por encima de los credos.",
            apoyo: "Los credos son útiles porque resumen la fe, pero su autoridad viene de que dicen lo que dice la Biblia",
            ref: "2 Timoteo 3:16",
            explica: "Los credos son útiles porque resumen la fe, pero su autoridad viene de que dicen lo que dice la Biblia: solo la Escritura es la Palabra inspirada de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano nuevo de tu célula te dice: En mi iglesia anterior decían que los credos son un invento de hombres y que no sirven para nada.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que tenían razón: los credos se inventaron siglos después y no tienen que ver con la fe bíblica.", explica: "Desde muy temprano, la iglesia resumió su fe en fórmulas breves que se confesaban en el bautismo." },
              { texto: "Que los credos son útiles porque resumen la fe, y valen porque dicen lo que dice la Biblia.", bien: true, explica: "Los credos son útiles porque resumen la fe, pero su autoridad viene de que dicen lo que dice la Biblia." },
              { texto: "Que los credos valen más que la Biblia, porque los escribieron los apóstoles mismos.", explica: "El Credo apostólico no lo escribieron los apóstoles, y solo la Escritura es la Palabra inspirada de Dios." },
              { texto: "Que da igual lo que diga un credo, porque cada creyente puede creer lo que le parezca.", explica: "Pablo pidió a Timoteo: «Retén la forma de las sanas palabras». La fe tiene un contenido que se resume en los credos." },
            ],
            apoyo: "Los credos son útiles porque resumen la fe",
            ref: "2 Timoteo 1:13-14",
            explica: "Los credos son útiles porque resumen la fe que enseñaron los apóstoles, pero su autoridad viene de que dicen lo que dice la Biblia.",
          },
          {
            caso: "Una joven que discipulas te escribe: Me enseñaron que el Credo apostólico es tan inspirado como la Biblia; ¿es así?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que sí: el Credo apostólico es Palabra inspirada, igual que las cartas del apóstol Pablo.", explica: "Solo la Escritura es la Palabra inspirada de Dios: los credos valen porque dicen lo que dice la Biblia." },
              { texto: "Que resume lo que enseñaron los apóstoles, pero que solo la Escritura es Palabra inspirada.", bien: true, explica: "No lo escribieron los apóstoles, pero resume lo que ellos enseñaron, siempre bajo la autoridad de la Escritura." },
              { texto: "Que no, porque el Credo apostólico enseña cosas que la Biblia no enseña en ninguna parte.", explica: "El Credo apostólico resume lo que enseñaron los apóstoles: un solo Dios, Padre, Hijo y Espíritu Santo, y la obra de Cristo." },
              { texto: "Que el Credo apostólico es más importante que la Biblia, porque es más corto y fácil de aprender.", explica: "Los credos son útiles porque resumen la fe, pero la Biblia está por encima de los credos." },
            ],
            apoyo: "Solo la Escritura es la Palabra inspirada de Dios",
            ref: "2 Timoteo 3:16",
            explica: "El Credo apostólico no lo escribieron los apóstoles, pero resume lo que ellos enseñaron. Solo la Escritura es la Palabra inspirada de Dios.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "De la palabra griega que se traduce defensa, apología, viene el nombre de los apologistas, que escribieron para defender la fe",
            ref: "1 Pedro 3:15",
            clave: {
              id: "pr-n3-historia-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hicieron los apologistas en el siglo II y de dónde viene su nombre?",
              ideas: [
                { id: "defensa", peso: 50, texto: "Escribieron para defender la fe: su nombre viene de apología, la palabra griega que se traduce defensa.", formas: ["defender la fe", "defensa de la fe", "defendieron la fe", "defendian la fe", "apologia", "significa defensa", "se traduce defensa", "palabra defensa"] },
                { id: "paganos", peso: 50, texto: "Respondieron a las acusaciones de los paganos; el más conocido es Justino Mártir, que escribió sus apologías hacia el año 150.", formas: ["paganos", "acusaciones", "justino"] },
              ],
              modelo: "Los apologistas escribieron para defender la fe y respondieron a las acusaciones de los paganos; el más conocido es Justino Mártir. Su nombre viene de apología, la palabra griega que se traduce defensa.",
            },
          },
          {
            apoyo: "mostró que la fe de la iglesia era la misma que habían enseñado los apóstoles",
            ref: "Judas 1:3",
            clave: {
              id: "pr-n3-historia-1-3-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo enfrentó Ireneo las falsas enseñanzas de los gnósticos y de Marción?",
              ideas: [
                { id: "obra", peso: 40, texto: "Escribió hacia el año 180 su obra Contra las herejías.", formas: ["contra las herejias", "herejias", "escribio (una|su) obra", "180"] },
                { id: "apostoles", peso: 60, texto: "Mostró que la fe de la iglesia era la misma que habían enseñado los apóstoles.", formas: ["misma que (habian|ensenaron)", "ensenado los apostoles", "ensenaron los apostoles", "fe de los apostoles", "la de los apostoles", "fe apostolica", "la misma fe"] },
              ],
              modelo: "Ireneo, obispo de Lyon y discípulo de Policarpo, escribió hacia el año 180 su obra Contra las herejías. Allí mostró que la fe de la iglesia era la misma que habían enseñado los apóstoles.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Constantino y los grandes concilios
    "n3-historia-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pasó en la batalla del puente Milvio, en el año 312?", reverso: "Constantino venció a su rival y atribuyó la victoria al Dios de los cristianos.", apoyo: "Constantino venció a su rival en la batalla del puente Milvio y atribuyó la victoria al Dios de los cristianos" },
              { frente: "¿Qué dio el Edicto de Milán en el año 313?", reverso: "Libertad de culto en el Imperio: terminaron las persecuciones.", apoyo: "con el Edicto de Milán, se dio libertad de culto en el Imperio y terminaron las persecuciones" },
              { frente: "¿Qué empezó a mezclarse con la iglesia cuando fue favorecida?", reverso: "El poder político.", apoyo: "el poder político empezó a mezclarse con la iglesia" },
              { frente: "¿Qué había dicho Jesús de su reino?", reverso: "«Mi reino no es de este mundo».", apoyo: "Jesús había dicho: «Mi reino no es de este mundo»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué se pudo hacer gracias a la libertad de culto?", reverso: "Construir templos, copiar las Escrituras y predicar abiertamente.", apoyo: "se pudieron construir templos, copiar las Escrituras y predicar abiertamente" },
              { frente: "¿Quiénes entraron a la iglesia cuando ser cristiano empezó a dar ventajas?", reverso: "Muchos que no tenían una conversión verdadera.", apoyo: "muchos entraron a la iglesia sin una conversión verdadera" },
              { frente: "¿Qué cambio vivió la iglesia en pocos años con Constantino?", reverso: "Pasó de ser perseguida a ser favorecida por el emperador.", apoyo: "la iglesia pasó de ser perseguida a ser favorecida por el emperador" },
              { frente: "¿Qué emperador hizo del cristianismo la religión oficial del Imperio?", reverso: "Teodosio, en el año 380.", apoyo: "en el año 380, el emperador Teodosio hizo del cristianismo la religión oficial del Imperio" },
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
            consigna: "¿Fue una bendición o un peligro del cambio que trajo Constantino? Lleva cada frase a su grupo.",
            grupos: ["Una bendición", "Un peligro"],
            frases: [
              { texto: "Terminaron las persecuciones", grupo: 0 },
              { texto: "Se pudieron construir templos", grupo: 0 },
              { texto: "Se pudieron copiar las Escrituras", grupo: 0 },
              { texto: "Se pudo predicar abiertamente", grupo: 0 },
              { texto: "Muchos entraron sin una conversión verdadera", grupo: 1 },
              { texto: "El poder político se mezcló con la iglesia", grupo: 1, explica: "Jesús había dicho: «Mi reino no es de este mundo»." },
            ],
            apoyo: "La libertad fue una bendición",
            ref: "Juan 18:36",
            explica: "La libertad fue una bendición: terminaron las persecuciones y se pudieron construir templos, copiar las Escrituras y predicar abiertamente. Pero muchos entraron sin una conversión verdadera y el poder político se mezcló con la iglesia.",
          },
          {
            consigna: "¿Ayudó a la iglesia o la puso en peligro? Lleva cada frase a su grupo.",
            grupos: ["Ayudó a la iglesia", "La puso en peligro"],
            frases: [
              { texto: "La libertad de culto del Edicto de Milán", grupo: 0 },
              { texto: "Predicar sin miedo a la persecución", grupo: 0 },
              { texto: "Copiar las Escrituras con libertad", grupo: 0 },
              { texto: "Ser cristiano empezó a dar ventajas", grupo: 1 },
              { texto: "Entrar a la iglesia sin conversión verdadera", grupo: 1 },
              { texto: "Mezclar el poder político con la iglesia", grupo: 1 },
            ],
            apoyo: "Pero, cuando ser cristiano empezó a dar ventajas, muchos entraron a la iglesia sin una conversión verdadera",
            ref: "Juan 18:36",
            explica: "La libertad ayudó a la iglesia. Pero, cuando ser cristiano empezó a dar ventajas, muchos entraron sin una conversión verdadera y el poder político se mezcló con la iglesia. Jesús había dicho: «Mi reino no es de este mundo».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo estos hechos, de Constantino al Concilio de Calcedonia.",
            eventos: [
              { texto: "Constantino vence en la batalla del puente Milvio", fecha: "En el año 312" },
              { texto: "El Edicto de Milán da libertad de culto", fecha: "En el 313" },
              { texto: "El Concilio de Nicea confiesa que el Hijo es verdadero Dios", fecha: "En el año 325" },
              { texto: "Teodosio hace del cristianismo la religión oficial", fecha: "En el año 380" },
              { texto: "El Concilio de Constantinopla confiesa la deidad del Espíritu Santo", fecha: "En el año 381" },
              { texto: "El Concilio de Calcedonia confiesa a Cristo verdadero Dios y verdadero hombre", fecha: "En el 451" },
            ],
            apoyo: "Frente a Arrio, el Concilio de Nicea (325) confesó que el Hijo es verdadero Dios",
            ref: "Juan 1:1-3",
            explica: "Constantino venció en el 312 y el Edicto de Milán dio libertad en el 313. Nicea fue en el 325; Teodosio hizo oficial el cristianismo en el 380; Constantinopla fue en el 381 y Calcedonia, en el 451.",
          },
          {
            consigna: "Ordena estos hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Terminan las persecuciones con el Edicto de Milán", fecha: "En el 313" },
              { texto: "Se reúne el primer concilio general de la iglesia", fecha: "En el año 325" },
              { texto: "El cristianismo pasa a ser la religión oficial del Imperio", fecha: "En el año 380" },
              { texto: "Se completa el credo de Nicea", fecha: "En el año 381" },
              { texto: "Se confiesa que Cristo tiene dos naturalezas, sin mezcla y sin división", fecha: "En el 451" },
            ],
            apoyo: "En el año 381, el Concilio de Constantinopla completó el credo de Nicea",
            ref: "Juan 1:14",
            explica: "Las persecuciones terminaron en el 313; el primer concilio general fue el de Nicea, en el 325; el cristianismo fue la religión oficial desde el 380; Constantinopla completó el credo de Nicea en el 381, y Calcedonia confesó las dos naturalezas de Cristo en el 451.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada nombre con lo que enseñó o confesó.",
            pares: [
              ["Arrio", "Decía que hubo un tiempo en que el Hijo no existía"],
              ["El Concilio de Nicea (325)", "El Hijo es de la misma sustancia que el Padre"],
              ["El Concilio de Constantinopla (381)", "La deidad del Espíritu Santo"],
              ["El Concilio de Calcedonia (451)", "Cristo es una sola persona en dos naturalezas"],
            ],
            apoyo: "Los concilios no añadieron verdades a la Biblia: pusieron en palabras claras lo que la Escritura enseña sobre Cristo y la Trinidad",
            ref: "Juan 1:1-3",
            explica: "Frente a Arrio, que decía que hubo un tiempo en que el Hijo no existía, Nicea confesó que el Hijo es de la misma sustancia que el Padre; Constantinopla, la deidad del Espíritu Santo, y Calcedonia, que Cristo es una sola persona en dos naturalezas.",
          },
          {
            consigna: "¿Qué corresponde a cada uno? Une cada nombre con lo que dice de él la lección.",
            pares: [
              ["Arrio", "Presbítero de Alejandría"],
              ["Atanasio", "Obispo de Alejandría, desterrado cinco veces"],
              ["Nicea", "El primer concilio general de la iglesia"],
              ["Constantinopla", "Completó el credo de Nicea"],
              ["Calcedonia", "Dos naturalezas, sin mezcla y sin división"],
            ],
            apoyo: "Atanasio, obispo de Alejandría, defendió la deidad de Cristo aunque fue desterrado cinco veces",
            ref: "Juan 1:14",
            explica: "Arrio era presbítero de Alejandría, y Atanasio, obispo de Alejandría, defendió la deidad de Cristo aunque fue desterrado cinco veces. Nicea fue el primer concilio general; Constantinopla completó su credo, y Calcedonia confesó a Cristo en dos naturalezas, sin mezcla y sin división.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "si Cristo no es Dios, no puede salvarnos",
            ref: "Juan 1:1-3",
            situacion: "Eres maestro de una clase para nuevos creyentes. En el barrio repartieron folletos que dicen que Jesús fue creado por Dios.",
            escenas: [
              {
                id: "e1",
                narra: "Una alumna te muestra el folleto: dice que el Hijo es la primera y más alta criatura de Dios, pero no Dios eterno.",
                pregunta: "¿Qué le explicas primero?",
                opciones: [
                  { texto: "Que eso enseñaba Arrio, y que el Concilio de Nicea confesó que el Hijo es verdadero Dios.", valor: 2, explica: "Arrio enseñaba que el Hijo era una criatura; en el año 325, Nicea confesó que el Hijo es de la misma sustancia que el Padre.", siguiente: "e2" },
                  { texto: "Que no lea esos folletos y que los tire enseguida, sin explicarle qué tiene de malo lo que dicen.", valor: 1, explica: "Apartarla del error está bien, pero le falta la verdad: el Concilio de Nicea confesó que el Hijo es verdadero Dios." },
                  { texto: "Que eso no importa mucho: lo importante es que Jesús fue un gran maestro y un buen ejemplo.", valor: 0, explica: "Sí importa: Atanasio sabía lo que estaba en juego, porque si Cristo no es Dios, no puede salvarnos.", siguiente: "fin" },
                ],
              },
              {
                id: "e1b",
                narra: "A la semana, la alumna vuelve confundida: los del folleto le dijeron que hubo un tiempo en que el Hijo no existía.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Abres con ella Juan 1:1, «el Verbo era Dios», y le muestras lo que confesó Nicea.", valor: 2, explica: "Nicea afirmaba lo que dice Juan: «el Verbo era Dios». El Hijo es verdadero Dios de verdadero Dios." },
                  { texto: "Le dices que deje de pensar en eso, porque esas preguntas solo traen problemas a los nuevos.", valor: 0, explica: "Callar la pregunta la deja con el error de Arrio: hay que mostrarle lo que dice Juan y lo que confesó Nicea.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Otro alumno pregunta: ¿Y qué importa si Jesús es Dios o una criatura, si igual nos enseña a vivir bien?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que lo verán en la próxima clase, porque hoy ya no alcanza el tiempo para verlo bien.", valor: 1, explica: "Está bien dejarlo para estudiar con calma, pero la respuesta es clara: si Cristo no es Dios, no puede salvarnos." },
                  { texto: "Que Atanasio sabía lo que estaba en juego: si Cristo no es Dios, no puede salvarnos.", valor: 2, explica: "Atanasio defendió la deidad de Cristo aunque fue desterrado cinco veces: sabía lo que estaba en juego." },
                  { texto: "Que tiene razón: lo único que importa de Jesús es su ejemplo de vida para nosotros.", valor: 0, explica: "Lo que está en juego es la salvación: si Cristo no es Dios, no puede salvarnos." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, una alumna dice que, si Jesús es Dios, entonces no fue un hombre de verdad.",
                pregunta: "¿Qué le muestras?",
                opciones: [
                  { texto: "Que Calcedonia confesó a Cristo verdadero Dios y verdadero hombre: el Verbo fue hecho carne.", valor: 2, explica: "En el 451, Calcedonia confesó que Jesucristo es una sola persona, verdadero Dios y verdadero hombre, como enseña Juan 1:14." },
                  { texto: "Que es una buena pregunta, y que se la dejas al pastor para que la responda el próximo domingo.", valor: 1, explica: "El pastor puede ayudarla, pero tú también puedes mostrarle lo que confesó Calcedonia: Jesucristo es verdadero Dios y verdadero hombre." },
                  { texto: "Que tiene razón: Jesús era Dios y solo aparentaba tener un cuerpo de verdad como el nuestro.", valor: 0, explica: "Calcedonia confesó que Jesucristo es verdadero Dios y verdadero hombre: «Y aquel Verbo fue hecho carne, y habitó entre nosotros»." },
                ],
              },
            ],
          },
          {
            apoyo: "La fe que confiesas sobre Cristo fue defendida con sacrificio: atesórala y apréndela bien.",
            ref: "Juan 1:14",
            situacion: "Eres líder de una célula. Un hermano nuevo llega preocupado: un compañero de trabajo le dijo que Jesús no es Dios eterno.",
            escenas: [
              {
                id: "e1",
                narra: "El hermano te pregunta si es verdad que hubo un tiempo en que el Hijo no existía.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que así enseñaba Arrio, pero Nicea confesó al Hijo de la misma sustancia que el Padre.", valor: 2, explica: "En el año 325, el Concilio de Nicea confesó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios." },
                  { texto: "Que no sabes bien qué decirle, y que mejor lo hablen otro día con el pastor de la iglesia.", valor: 1, explica: "El pastor puede ayudar, pero tú también puedes responder: Nicea confesó que el Hijo es verdadero Dios." },
                  { texto: "Que es verdad: el Hijo fue la primera criatura que Dios hizo, antes que todo lo demás.", valor: 0, explica: "Eso enseñaba Arrio. La iglesia confesó en Nicea que el Hijo es verdadero Dios de verdadero Dios.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Te cuenta que su compañero le dijo que esas son discusiones viejas que no cambian nada.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que da igual lo que cada uno crea sobre Jesús, mientras sea una buena persona.", valor: 0, explica: "No da igual: Atanasio sabía lo que estaba en juego, porque si Cristo no es Dios, no puede salvarnos." },
                  { texto: "Que no son discusiones sin valor: Atanasio sabía que, si Cristo no es Dios, no puede salvarnos.", valor: 2, explica: "Atanasio defendió la deidad de Cristo aunque fue desterrado cinco veces: si Cristo no es Dios, no puede salvarnos." },
                  { texto: "Que le pregunte a su compañero qué cree él, y que lo escuche con paciencia antes de responderle.", valor: 1, explica: "Escuchar es bueno, pero también puede explicarle por qué importa: si Cristo no es Dios, no puede salvarnos." },
                ],
              },
              {
                id: "e3",
                narra: "El hermano quiere responderle a su compañero, pero teme discutir con él y terminar peleando.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que no le diga nada, para evitar problemas, y que solo ore por él en silencio en su casa.", valor: 1, explica: "Orar por él es bueno, pero puede también explicarle con calma lo que dicen Juan 1:1 y 1:14." },
                  { texto: "Que le gane la discusión a toda costa, aunque tenga que burlarse de lo que él cree.", valor: 0, explica: "La verdad no se defiende con burlas: se explica con la Escritura, que es la autoridad final." },
                  { texto: "Que le muestre con calma Juan 1:1 y 1:14: Jesús es verdadero Dios y verdadero hombre.", valor: 2, explica: "Juan enseña que «el Verbo era Dios» y que «aquel Verbo fue hecho carne»: es lo que confesaron Nicea y Calcedonia." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Él sabía lo que estaba en juego: si Cristo no es Dios, no puede salvarnos",
            ref: "Juan 1:1-3",
            clave: {
              id: "pr-n3-historia-1-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué enseñaba Arrio, y por qué Atanasio defendió la deidad de Cristo frente a él?",
              ideas: [
                { id: "arrio", peso: 40, texto: "Arrio enseñaba que el Hijo era una criatura, no Dios eterno: decía que hubo un tiempo en que el Hijo no existía.", formas: ["criatura", "no (era|es) dios eterno", "no existia", "fue creado", "creado por dios"] },
                { id: "salvar", peso: 60, texto: "Atanasio sabía lo que estaba en juego: si Cristo no es Dios, no puede salvarnos.", negativa: true, formas: ["no puede salvar*", "no podria salvar*", "no (nos|lo) puede salvar", "no (nos|lo) podria salvar", "puede salvar*", "salvarnos", "nos salva*"] },
              ],
              modelo: "Arrio enseñaba que el Hijo era una criatura y no Dios eterno, y decía que hubo un tiempo en que no existía. Atanasio defendió la deidad de Cristo porque sabía lo que estaba en juego: si Cristo no es Dios, no puede salvarnos.",
            },
          },
          {
            apoyo: "Así afirmaba lo que dice Juan: «el Verbo era Dios»",
            ref: "Juan 1:1",
            clave: {
              id: "pr-n3-historia-1-4-a6-2",
              tipo: "corta",
              pregunta: "Un amigo te dice que Jesús fue la criatura más alta de Dios, pero no Dios eterno. ¿Qué le responderías con lo que confesó la iglesia y con Juan 1:1?",
              ideas: [
                { id: "nicea", peso: 50, texto: "El Concilio de Nicea confesó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios.", formas: ["misma sustancia", "verdadero dios de verdadero dios", "(es|era) verdadero dios", "(es|era) dios eterno", "nicea"] },
                { id: "verbo", peso: 50, texto: "Juan lo afirma: «el Verbo era Dios».", formas: ["verbo era dios", "el verbo (es|era) dios", "verbo"] },
              ],
              modelo: "Le diría que eso enseñaba Arrio, pero el Concilio de Nicea confesó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios. Así lo dice Juan 1:1: «el Verbo era Dios».",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. Agustín, los monjes y la Edad Media
    "n3-historia-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde nació Agustín?", reverso: "En Tagaste, en el norte de África.", apoyo: "Agustín (354-430) nació en Tagaste, en el norte de África" },
              { frente: "¿Quién oró por Agustín durante años?", reverso: "Su madre, Mónica.", apoyo: "Su madre, Mónica, oró por él durante años" },
              { frente: "¿Qué oyó Agustín en Milán, en el año 386?", reverso: "Una voz de niño que decía: toma y lee.", apoyo: "En el año 386, en Milán, oyó una voz de niño que decía: toma y lee" },
              { frente: "¿De qué ciudad llegó a ser obispo Agustín?", reverso: "De Hipona.", apoyo: "Se convirtió, fue bautizado y llegó a ser obispo de Hipona" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué libro contó Agustín su conversión?", reverso: "En sus Confesiones, como una obra de la gracia de Dios.", apoyo: "En sus Confesiones contó su conversión como una obra de la gracia de Dios" },
              { frente: "¿Qué enseñaba Pelagio sobre el ser humano?", reverso: "Que puede obedecer a Dios con sus propias fuerzas.", apoyo: "Frente a Pelagio, que enseñaba que el ser humano puede obedecer a Dios con sus propias fuerzas" },
              { frente: "¿Qué escribió Agustín cuando Roma fue saqueada en el año 410?", reverso: "La ciudad de Dios: los imperios caen, pero el reino de Dios permanece.", apoyo: "Cuando Roma fue saqueada en el año 410, escribió La ciudad de Dios" },
              { frente: "¿Entre qué años vivió Agustín?", reverso: "Del 354 al 430.", apoyo: "Agustín (354-430) nació en Tagaste" },
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
            consigna: "Ordena la historia de la conversión de Agustín, del primer paso al último.",
            pasos: [
              "Su madre, Mónica, ora por él durante años",
              "En Milán oye una voz de niño que dice: toma y lee",
              "Abre las cartas de Pablo y lee Romanos 13",
              "Se convierte y es bautizado",
              "Llega a ser obispo de Hipona",
            ],
            apoyo: "Abrió las cartas de Pablo y leyó",
            ref: "Romanos 13:13-14",
            explica: "Mónica oró por él durante años. En el año 386, en Milán, oyó una voz de niño que decía: toma y lee; abrió las cartas de Pablo, leyó Romanos 13, se convirtió, fue bautizado y llegó a ser obispo de Hipona.",
          },
          {
            consigna: "Ordena estos momentos de la vida de Agustín, del primero al último.",
            pasos: [
              "Nace en Tagaste, en el norte de África",
              "Busca la verdad en la filosofía y en los placeres",
              "Lee unas palabras de Romanos en un jardín de Milán",
              "Se convierte y es bautizado",
              "Escribe La ciudad de Dios tras el saqueo de Roma",
            ],
            apoyo: "Un joven brillante del norte de África buscó la verdad en la filosofía y en los placeres",
            ref: "Romanos 13:13-14",
            explica: "Agustín nació en Tagaste, buscó la verdad en la filosofía y en los placeres, y en el año 386 leyó Romanos en un jardín de Milán: se convirtió y fue bautizado. Cuando Roma fue saqueada en el 410, escribió La ciudad de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Efesios 2:8",
            consigna: "Frente a Pelagio, Agustín enseñó lo que dice Pablo. ¿Por qué somos salvos y por medio de qué? Toca las dos palabras.",
            texto: "por [[gracia]] sois salvos por medio de la [[fe]]",
            apoyo: "Agustín enseñó que la salvación es por gracia",
            explica: "Pelagio enseñaba que el ser humano puede obedecer a Dios con sus propias fuerzas; Agustín enseñó que la salvación es por gracia, por medio de la fe.",
          },
          {
            ref: "Romanos 13:13-14",
            consigna: "Estas son las palabras que leyó Agustín en Milán. ¿De quién dice Pablo que hay que vestirse? Toca las dos palabras.",
            texto: "no en glotonerías y borracheras, no en lujurias y lascivias, no en contiendas y envidia, sino vestíos del [[Señor]] [[Jesucristo]]",
            apoyo: "Dios sigue llamando por su Palabra, como llamó a Agustín",
            explica: "Agustín leyó en Romanos 13 que había que vestirse del Señor Jesucristo y se convirtió; en sus Confesiones contó su conversión como una obra de la gracia de Dios.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con lo que hizo y cuándo.",
            pares: [
              ["Antonio de Egipto", "Se fue al desierto a fines del siglo III"],
              ["Benito de Nursia", "Escribió una regla para los monasterios hacia el año 530"],
              ["Patricio", "Llevó el evangelio a Irlanda en el siglo V"],
              ["Bonifacio", "Predicó en Germania en el siglo VIII"],
            ],
            apoyo: "La misión siguió: Patricio llevó el evangelio a Irlanda en el siglo V, y Bonifacio predicó en Germania en el siglo VIII",
            ref: "Mateo 28:19-20",
            explica: "Antonio se fue al desierto y Benito escribió la regla de los monasterios; Patricio llevó el evangelio a Irlanda y Bonifacio predicó en Germania: así se cumplía el mandato de hacer discípulos a todas las naciones.",
          },
          {
            consigna: "¿Qué corresponde a cada uno? Une cada idea con lo que le corresponde.",
            pares: [
              ["Antonio de Egipto", "Buscó una vida más entregada en el desierto"],
              ["Patricio", "Llevó el evangelio a Irlanda"],
              ["Bonifacio", "Predicó el evangelio en Germania"],
              ["El mandato de Mateo 28:19", "Hacer discípulos a todas las naciones"],
            ],
            apoyo: "algunos creyentes buscaron una vida más entregada apartándose del mundo",
            ref: "Mateo 28:19-20",
            explica: "Antonio de Egipto buscó una vida más entregada en el desierto; Patricio llevó el evangelio a Irlanda y Bonifacio predicó en Germania. Así se cumplía el mandato: «id, y haced discípulos a todas las naciones».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa quién escribió la regla de los monasterios y qué ordenaba.",
            texto: "[[Benito]] de Nursia escribió una [[regla]] para los monasterios que ordenaba la vida en oración, lectura y [[trabajo]].",
            distractores: ["Antonio", "canción", "riqueza"],
            errores: {
              Antonio: "Antonio de Egipto se fue al desierto; la regla para los monasterios la escribió Benito de Nursia, hacia el año 530.",
              canción: "Benito escribió una regla para los monasterios que ordenaba la vida.",
              riqueza: "La regla ordenaba la vida en oración, lectura y trabajo.",
            },
            apoyo: "una regla para los monasterios que ordenaba la vida en oración, lectura y trabajo",
            explica: "Hacia el año 530, Benito de Nursia escribió una regla para los monasterios que ordenaba la vida en oración, lectura y trabajo.",
          },
          {
            consigna: "Completa qué hicieron los monasterios durante siglos.",
            texto: "Durante siglos, los monasterios [[copiaron]] la Biblia a mano y fueron centros de [[estudio]] y de ayuda a los [[pobres]].",
            distractores: ["quemaron", "guerra", "ricos"],
            errores: {
              quemaron: "Los monasterios copiaron la Biblia a mano: así la guardaron.",
              guerra: "Los monasterios fueron centros de estudio y de ayuda a los pobres.",
              ricos: "Los monasterios fueron centros de ayuda a los pobres.",
            },
            apoyo: "Durante siglos, los monasterios copiaron la Biblia a mano y fueron centros de estudio y de ayuda a los pobres",
            explica: "Durante siglos, los monasterios copiaron la Biblia a mano y fueron centros de estudio y de ayuda a los pobres: así guardaron la Biblia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la iglesia en la Edad Media: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando cayó el Imperio romano de Occidente, en el año 476, la iglesia quedó como la institución más fuerte de Europa.", verdad: true, explica: "Y el obispo de Roma, el papa, fue reuniendo cada vez más poder, también político.", apoyo: "En el año 476 cayó el Imperio romano de Occidente, y la iglesia quedó como la institución más fuerte de Europa" },
              { texto: "Durante la Edad Media, el papa se mantuvo lejos de todo poder político.", verdad: false, explica: "Fue al revés: el obispo de Roma, el papa, fue reuniendo cada vez más poder, también político.", apoyo: "El obispo de Roma, el papa, fue reuniendo cada vez más poder, también político" },
              { texto: "Del gran cisma de 1054 vienen la Iglesia ortodoxa y la Iglesia católica romana.", verdad: true, explica: "En el año 1054, las iglesias de Oriente y de Occidente se separaron en el gran cisma.", apoyo: "del que vienen la Iglesia ortodoxa y la Iglesia católica romana" },
            ],
          },
          {
            consigna: "Sobre el cisma y las cruzadas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Las cruzadas llevaron el evangelio a Jerusalén con paz y sin violencia.", verdad: false, explica: "Desde 1095 se lanzaron las cruzadas para tomar Jerusalén por las armas, con mucha violencia.", apoyo: "desde 1095 se lanzaron las cruzadas para tomar Jerusalén por las armas, con mucha violencia" },
              { texto: "En el año 1054, las iglesias de Oriente y de Occidente se unieron en una sola.", verdad: false, explica: "En el año 1054 se separaron en el gran cisma.", apoyo: "En el año 1054, las iglesias de Oriente y de Occidente se separaron en el gran cisma" },
              { texto: "La Edad Media tuvo creyentes fieles, pero también errores graves, como la violencia en nombre de Cristo.", verdad: true, explica: "También la mezcla de la iglesia con el poder y la venta de cargos: la historia nos enseña a examinarlo todo a la luz de la Escritura.", apoyo: "La historia nos enseña a examinarlo todo a la luz de la Escritura" },
              { texto: "La venta de cargos fue uno de los errores graves de la Edad Media.", verdad: true, explica: "La Edad Media tuvo creyentes fieles, misioneros y estudiosos de la Biblia, pero también errores graves.", apoyo: "la mezcla de la iglesia con el poder, la venta de cargos y la violencia en nombre de Cristo" },
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
            apoyo: "En la Edad Media creció el poder del papado, Oriente y Occidente se separaron en 1054 y hubo cruzadas violentas",
            clave: {
              id: "pr-n3-historia-1-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué cambios graves vivió la iglesia en la Edad Media?",
              ideas: [
                { id: "papado", peso: 34, texto: "El papa, obispo de Roma, fue reuniendo cada vez más poder, también político.", formas: ["poder del papa*", "el papa", "papa*", "poder politico", "obispo de roma"] },
                { id: "cisma", peso: 33, texto: "En el año 1054, las iglesias de Oriente y de Occidente se separaron en el gran cisma.", formas: ["cisma", "1054", "se separaron", "oriente y occidente", "oriente y de occidente", "ortodoxa"] },
                { id: "cruzadas", peso: 33, texto: "Desde 1095 se lanzaron las cruzadas para tomar Jerusalén por las armas, con mucha violencia.", formas: ["cruzadas", "1095", "por las armas", "violencia"] },
              ],
              modelo: "En la Edad Media, el papa fue reuniendo cada vez más poder, también político. En el año 1054, las iglesias de Oriente y de Occidente se separaron en el gran cisma, y desde 1095 se lanzaron las cruzadas para tomar Jerusalén por las armas.",
            },
          },
          {
            apoyo: "La Edad Media tuvo creyentes fieles, misioneros y estudiosos de la Biblia, pero también errores graves",
            clave: {
              id: "pr-n3-historia-1-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué luces y qué sombras tuvo la iglesia en la Edad Media?",
              ideas: [
                { id: "luces", peso: 50, texto: "Tuvo creyentes fieles, misioneros y estudiosos de la Biblia, y los monasterios copiaron la Biblia.", formas: ["creyentes fieles", "misioneros", "estudiosos", "copiaron la biblia", "monasterios", "patricio", "bonifacio"] },
                { id: "sombras", peso: 50, texto: "Tuvo errores graves: la mezcla de la iglesia con el poder, la venta de cargos y la violencia en nombre de Cristo.", formas: ["venta de cargos", "violencia", "mezcla de la iglesia con el poder", "con el poder", "cruzadas", "errores graves"] },
              ],
              modelo: "La Edad Media tuvo luces: creyentes fieles, misioneros y estudiosos de la Biblia. Pero también tuvo sombras, errores graves como la mezcla de la iglesia con el poder, la venta de cargos y la violencia en nombre de Cristo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Antes de la Reforma: volver a la Palabra
    "n3-historia-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué la mayoría de los creyentes de Europa no podía leer la Biblia?", reverso: "Estaba en latín, los libros eran caros y pocos sabían leer.", apoyo: "estaba en latín, los libros eran caros y pocos sabían leer" },
              { frente: "¿De qué ciudad era Pedro Valdo y a qué se dedicaba?", reverso: "Era un comerciante rico de Lyon, en Francia.", apoyo: "Pedro Valdo era un comerciante rico de Lyon, en Francia" },
              { frente: "¿Qué hizo Valdo hacia el año 1173?", reverso: "Dejó sus riquezas, hizo traducir partes de la Biblia y comenzó a predicar.", apoyo: "Hacia el año 1173 dejó sus riquezas, hizo traducir partes de la Biblia a la lengua del pueblo y comenzó a predicar con otros" },
              { frente: "¿Dónde era profesor Juan Wiclef?", reverso: "En Oxford, Inglaterra.", apoyo: "Juan Wiclef (hacia 1330-1384), profesor en Oxford, Inglaterra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué enseñó Wiclef sobre la autoridad de la Biblia?", reverso: "Que es la autoridad suprema para la iglesia, por encima del papa.", apoyo: "enseñó que la Biblia es la autoridad suprema para la iglesia, por encima del papa" },
              { frente: "¿Cómo llamaron después a Wiclef?", reverso: "La estrella de la mañana de la Reforma.", apoyo: "Por eso lo llamaron después la estrella de la mañana de la Reforma" },
              { frente: "¿Qué hicieron por primera vez los seguidores de Wiclef?", reverso: "Tradujeron toda la Biblia al inglés.", apoyo: "Sus seguidores tradujeron por primera vez toda la Biblia al inglés" },
              { frente: "¿Cuándo quemaron a Juan Hus en la hoguera?", reverso: "El 6 de julio de 1415.", apoyo: "lo quemaron en la hoguera el 6 de julio de 1415" },
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
            consigna: "¿De quién se dice: de Pedro Valdo, de Juan Wiclef o de Juan Hus? Lleva cada frase a su grupo.",
            grupos: ["Pedro Valdo", "Juan Wiclef", "Juan Hus"],
            frases: [
              { texto: "Era un comerciante rico de Lyon", grupo: 0 },
              { texto: "Dejó sus riquezas para predicar con otros", grupo: 0 },
              { texto: "Siguió predicando cuando se lo prohibieron", grupo: 0 },
              { texto: "Fue profesor en Oxford, Inglaterra", grupo: 1 },
              { texto: "Criticó la riqueza del clero", grupo: 1 },
              { texto: "Lo llamaron la estrella de la mañana de la Reforma", grupo: 1 },
              { texto: "Predicó en Praga contra los abusos de la iglesia", grupo: 2 },
              { texto: "Murió en la hoguera orando y confiando en Cristo", grupo: 2 },
            ],
            apoyo: "varias voces pidieron que la iglesia volviera a la Escritura y que el pueblo pudiera leerla en su propia lengua",
            ref: "Salmos 119:105",
            explica: "Valdo, comerciante de Lyon, dejó sus riquezas y siguió predicando aunque se lo prohibieron; Wiclef, profesor en Oxford, enseñó que la Biblia está por encima del papa; Hus predicó en Praga y murió en la hoguera en 1415.",
          },
          {
            consigna: "¿De quién habla cada frase: de Valdo, de Wiclef o de Hus? Lleva cada frase a su grupo.",
            grupos: ["Valdo", "Wiclef", "Hus"],
            frases: [
              { texto: "Hizo traducir partes de la Biblia a la lengua del pueblo", grupo: 0 },
              { texto: "Comenzó a predicar hacia el año 1173", grupo: 0 },
              { texto: "Enseñó que la Biblia está por encima del papa", grupo: 1 },
              { texto: "Sus seguidores tradujeron toda la Biblia al inglés", grupo: 1 },
              { texto: "Leyó los escritos de Wiclef", grupo: 2 },
              { texto: "Le prometieron que volvería a salvo de Constanza", grupo: 2 },
              { texto: "Lo quemaron el 6 de julio de 1415", grupo: 2 },
            ],
            apoyo: "En Praga, Juan Hus (hacia 1372-1415) leyó los escritos de Wiclef",
            ref: "Hechos 5:29",
            explica: "Valdo hizo traducir partes de la Biblia y predicó desde 1173; Wiclef enseñó que la Biblia está por encima del papa y sus seguidores la tradujeron al inglés; Hus leyó a Wiclef y lo quemaron en 1415, a pesar de la promesa de Constanza.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo los hechos que prepararon la Reforma, del primero al último.",
            eventos: [
              { texto: "Pedro Valdo deja sus riquezas y comienza a predicar", fecha: "Hacia el año 1173" },
              { texto: "Juan Hus muere en la hoguera", fecha: "El 6 de julio de 1415" },
              { texto: "Gutenberg imprime la primera Biblia con tipos móviles", fecha: "Hacia el año 1455" },
              { texto: "Erasmo publica el Nuevo Testamento en griego", fecha: "En 1516" },
              { texto: "Martín Lutero publica sus 95 tesis en Wittenberg", fecha: "El 31 de octubre de 1517" },
            ],
            apoyo: "La imprenta (hacia 1455) y el Nuevo Testamento griego de Erasmo (1516) prepararon el camino, y en 1517 comenzó la Reforma",
            ref: "Isaías 40:8",
            explica: "Valdo empezó a predicar hacia 1173 y Hus murió en 1415. Gutenberg imprimió la Biblia hacia 1455, Erasmo publicó el Nuevo Testamento griego en 1516 y Lutero publicó sus 95 tesis el 31 de octubre de 1517.",
          },
          {
            consigna: "Ordena en el tiempo cómo la Biblia llegó a más personas, del primero al último.",
            eventos: [
              { texto: "Gutenberg imprime en Alemania la primera Biblia", fecha: "Hacia el año 1455" },
              { texto: "Los estudiosos pueden leer el Nuevo Testamento en griego", fecha: "En 1516" },
              { texto: "Comienza la Reforma", fecha: "El 31 de octubre de 1517" },
              { texto: "Casiodoro de Reina publica la Biblia completa en español", fecha: "En 1569" },
              { texto: "Cipriano de Valera revisa la traducción de Reina", fecha: "En 1602" },
              { texto: "Se publica una nueva revisión de la Reina-Valera", fecha: "1960" },
            ],
            apoyo: "La Biblia que usamos viene de esa misma historia",
            ref: "Isaías 40:8",
            explica: "Gutenberg imprimió la Biblia hacia 1455, Erasmo publicó el Nuevo Testamento griego en 1516 y la Reforma comenzó en 1517. Reina publicó la Biblia en español en 1569, Valera la revisó en 1602, y la Reina-Valera de 1960 es una revisión de aquella obra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo prepararon la imprenta y el griego la Reforma? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "reforma", texto: "La Reforma (1517)", x: 50, y: 10 },
              { id: "imprenta", texto: "La imprenta de Gutenberg (hacia 1455)", x: 22, y: 50 },
              { id: "griego", texto: "El Nuevo Testamento griego (1516)", x: 78, y: 50 },
              { id: "libros", texto: "Libros más baratos", x: 22, y: 90 },
              { id: "original", texto: "Leerlo en su idioma original", x: 78, y: 90 },
            ],
            enlaces: [
              { de: "imprenta", a: "libros", relacion: "trajo" },
              { de: "griego", a: "original", relacion: "permitió a los estudiosos" },
              { de: "imprenta", a: "reforma", relacion: "preparó el camino de" },
              { de: "griego", a: "reforma", relacion: "preparó el camino de" },
            ],
            distractores: ["impidió", "retrasó por siglos"],
            apoyo: "La imprenta (hacia 1455) y el Nuevo Testamento griego de Erasmo (1516) prepararon el camino",
            ref: "Isaías 40:8",
            explica: "Con la imprenta, los libros empezaron a ser más baratos y a circular más; con el Nuevo Testamento griego de Erasmo, los estudiosos pudieron leerlo en su idioma original. Las dos prepararon el camino de la Reforma, que comenzó en 1517.",
          },
          {
            consigna: "¿Qué hizo cada uno antes de la Reforma? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "reforma", texto: "La Reforma, en 1517", x: 50, y: 10 },
              { id: "biblia", texto: "La primera Biblia", x: 22, y: 50 },
              { id: "nt", texto: "El Nuevo Testamento", x: 78, y: 50 },
              { id: "gutenberg", texto: "Gutenberg, hacia el año 1455", x: 22, y: 90 },
              { id: "erasmo", texto: "Erasmo, en 1516", x: 78, y: 90 },
            ],
            enlaces: [
              { de: "gutenberg", a: "biblia", relacion: "imprimió con tipos móviles" },
              { de: "erasmo", a: "nt", relacion: "publicó en griego" },
              { de: "biblia", a: "reforma", relacion: "preparó el camino de" },
              { de: "nt", a: "reforma", relacion: "preparó el camino de" },
            ],
            distractores: ["escondió del pueblo", "prohibió leer"],
            apoyo: "Hacia el año 1455, Juan Gutenberg imprimió en Alemania la primera Biblia con tipos móviles",
            ref: "Isaías 40:8",
            explica: "Gutenberg imprimió la primera Biblia con tipos móviles hacia 1455, y Erasmo publicó el Nuevo Testamento en griego en 1516: así se preparó el camino de la Reforma, que comenzó en 1517.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Hoy tienes la Biblia en tu idioma y en tu teléfono: muchos dieron la vida para que así fuera.",
            ref: "Salmos 119:105",
            situacion: "Eres líder de una célula. Casi todos tienen la Biblia en el teléfono, pero muy pocos la leen durante la semana.",
            escenas: [
              {
                id: "e1",
                narra: "Al preguntar por la lectura de la semana, un joven dice que no tuvo tiempo y que la Biblia es difícil de entender.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Le recuerdas que muchos dieron la vida para que tengamos la Biblia, y lo animas a leerla.", valor: 2, explica: "Valdo, Wiclef y Hus pidieron que el pueblo pudiera leer la Biblia en su lengua, y los persiguieron: es un regalo para honrar.", siguiente: "e2" },
                  { texto: "Le dices que no se preocupe, y que por ahora escuche con atención la predicación del domingo.", valor: 1, explica: "La predicación ayuda, pero tener la Biblia en tu idioma es un regalo que muchos pagaron con su vida: vale la pena leerla." },
                  { texto: "Le das la razón: la Biblia es para los pastores, y el pueblo no necesita leerla por su cuenta.", valor: 0, explica: "Fue al revés: varias voces pidieron que el pueblo pudiera leer la Escritura en su propia lengua.", siguiente: "fin" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan las semanas y el grupo sigue sin abrir la Biblia: solo escuchan lo que otros les cuentan de ella.",
                pregunta: "¿Qué propones ahora?",
                opciones: [
                  { texto: "Leer juntos un pasaje en cada reunión, en su lengua, como pidieron Valdo, Wiclef y Hus.", valor: 2, explica: "Así se honra el regalo: ellos pidieron volver a la Biblia y ponerla en la lengua del pueblo." },
                  { texto: "Dejar de hablar de la Biblia en la célula, para que nadie se sienta mal por no leerla en la semana.", valor: 0, explica: "Callar la Biblia es lo contrario de lo que pidieron los que prepararon la Reforma: volver a la Palabra.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Una hermana cuenta que en su casa se burlan de ella por leer la Biblia y que piensa dejar de hacerlo.",
                pregunta: "¿Qué le enseñas de los que vinieron antes de la Reforma?",
                opciones: [
                  { texto: "Que la lea a escondidas por un tiempo, hasta que su familia deje de molestarla con eso.", valor: 1, explica: "Cuidar la paz de la casa está bien, pero esconder la Palabra no es el camino: los que nos precedieron fueron fieles aunque los persiguieron." },
                  { texto: "Que Valdo, Wiclef y Hus amaron la Biblia aunque los persiguieron: que imite su fe.", valor: 2, explica: "Hebreos pide considerar la conducta de los que nos hablaron la palabra de Dios e imitar su fe." },
                  { texto: "Que deje de leerla: no vale la pena tener problemas en la casa por un libro.", valor: 0, explica: "Muchos dieron la vida para que tengamos la Biblia en nuestro idioma: no es un libro cualquiera." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, un joven pregunta si sirvió de algo que persiguieran a los que amaban la Biblia.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no lo sabes bien, y que lo van a buscar juntos para contarlo en la próxima reunión de la célula.", valor: 1, explica: "Buscarlo juntos está bien, pero la lección ya lo dice: fueron perseguidos, pero prepararon el camino de la Reforma, y la Biblia que usamos viene de esa misma historia." },
                  { texto: "Que no sirvió de nada: los persiguieron y los quemaron, y en la iglesia todo siguió igual que antes.", valor: 0, explica: "Fueron perseguidos, pero prepararon el camino de la Reforma." },
                  { texto: "Que prepararon el camino de la Reforma: «la palabra del Dios nuestro permanece para siempre».", valor: 2, explica: "Fueron perseguidos, pero prepararon el camino de la Reforma, y la Biblia que usamos viene de esa misma historia." },
                ],
              },
            ],
          },
          {
            apoyo: "y obedecieron a Dios antes que a los hombres aunque los persiguieron",
            ref: "Hechos 5:29",
            situacion: "Acompañas a un joven que acaba de entregarse a Cristo. En su trabajo le piden cosas que van contra la Palabra de Dios.",
            escenas: [
              {
                id: "e1",
                narra: "Su jefe le pide que les mienta a los clientes sobre los precios, y le dice que, si no lo hace, perderá horas de trabajo.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que primero lo consulte con su pastor y con su célula antes de darle una respuesta a su jefe.", valor: 1, explica: "Pedir consejo es bueno, pero la respuesta ya es clara: como Valdo, hay que obedecer a Dios antes que a los hombres." },
                  { texto: "Que, como Valdo y los suyos, obedezca a Dios antes que a los hombres, aunque le cueste.", valor: 2, explica: "Valdo y los suyos siguieron obedeciendo a Dios aunque los condenaron y los persiguieron." },
                  { texto: "Que haga lo que le piden: en el trabajo manda el jefe, y la fe se queda en la iglesia.", valor: 0, explica: "«Es necesario obedecer a Dios antes que a los hombres»: la fe no se queda en la iglesia.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "El joven no mintió y perdió horas de trabajo. Ahora se siente solo y piensa que hizo mal.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que Dios lo castigó por no obedecer a su jefe, y que vuelva enseguida a pedirle perdón a él.", valor: 0, explica: "Obedecer a Dios antes que a los hombres no es un pecado: muchos fueron perseguidos por hacerlo." },
                  { texto: "Que no se preocupe, que ya encontrará otro trabajo, y que no piense más en lo que le pasó.", valor: 1, explica: "Consolarlo está bien, pero le falta lo más importante: no hizo mal, porque Valdo, Wiclef y Hus también obedecieron a Dios antes que a los hombres aunque los persiguieron." },
                  { texto: "Que muchos sufrieron por obedecer a Dios, como Hus, que murió orando y confiando en Cristo.", valor: 2, explica: "Hus murió orando y confiando en Cristo: obedecer a Dios puede costar, pero el mismo Cristo te sostiene hoy." },
                ],
              },
              {
                id: "e3",
                narra: "Te pregunta cómo seguir firme cuando le vuelvan a pedir algo así.",
                pregunta: "¿Qué le enseñas desde Hebreos 13?",
                opciones: [
                  { texto: "Que busque otro trabajo lo antes posible, para no volver a pasar por una prueba así.", valor: 1, explica: "Buscar otro trabajo puede ser sabio, pero la firmeza viene de Cristo: Hebreos pide imitar la fe de los que nos hablaron la palabra de Dios." },
                  { texto: "Que no lea la Biblia en el trabajo, para que nadie sepa que es cristiano y no lo molesten.", valor: 0, explica: "Esconder la fe no da firmeza: Hebreos pide imitar la fe de los que nos hablaron la palabra de Dios." },
                  { texto: "Que se acuerde de los que le hablaron la Palabra e imite su fe: Cristo es el mismo hoy.", valor: 2, explica: "«Jesucristo es el mismo ayer, y hoy, y por los siglos»: el mismo Cristo que sostuvo a la iglesia te sostiene hoy." },
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
            ref: "Hechos 5:29",
            consigna: "Valdo y los suyos siguieron predicando aunque se lo prohibieron. ¿A quién es necesario obedecer antes que a los hombres? Toca la palabra.",
            texto: "Es necesario obedecer a [[Dios]] antes que a los hombres",
            apoyo: "Cuando les prohibieron predicar sin permiso, siguieron predicando",
            explica: "Cuando les prohibieron predicar sin permiso, Valdo y los suyos siguieron predicando, convencidos de que es necesario obedecer a Dios antes que a los hombres, y fueron condenados y perseguidos.",
          },
          {
            ref: "Hebreos 13:7",
            consigna: "Hebreos pide acordarse de los que nos hablaron la palabra de Dios. ¿Qué pide imitar de ellos? Toca la palabra.",
            texto: "considerad cuál haya sido el resultado de su conducta, e imitad su [[fe]]",
            apoyo: "el mismo Cristo que sostuvo a la iglesia durante veinte siglos te sostiene hoy",
            explica: "Hebreos pide acordarnos de los que nos hablaron la palabra de Dios e imitar su fe: el mismo Cristo que sostuvo a la iglesia durante veinte siglos te sostiene hoy.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Antes de la Reforma, Pedro Valdo, Juan Wiclef y Juan Hus pidieron volver a la Biblia y ponerla en la lengua del pueblo",
            ref: "Salmos 119:105",
            clave: {
              id: "pr-n3-historia-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué tenían en común Pedro Valdo, Juan Wiclef y Juan Hus?",
              ideas: [
                { id: "biblia", peso: 50, texto: "Pidieron volver a la Biblia y ponerla en la lengua del pueblo.", formas: ["volver a la biblia", "volver a la escritura", "volver a la palabra", "lengua del pueblo", "su propia lengua", "idioma del pueblo", "traduc*", "traduj*", "amor por la biblia", "amaban la biblia"] },
                { id: "obedecer", peso: 50, texto: "Obedecieron a Dios antes que a los hombres, aunque los persiguieron.", formas: ["obedec* a dios", "antes que a los hombres", "persegui*", "condenad*", "hoguera"] },
              ],
              modelo: "Los tres pidieron volver a la Biblia y ponerla en la lengua del pueblo. Además, obedecieron a Dios antes que a los hombres aunque los persiguieron, y así prepararon el camino de la Reforma.",
            },
          },
          {
            apoyo: "Por eso lo llamaron después la estrella de la mañana de la Reforma",
            ref: "Salmos 119:105",
            clave: {
              id: "pr-n3-historia-1-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué llamaron a Juan Wiclef la estrella de la mañana de la Reforma?",
              ideas: [
                { id: "autoridad", peso: 50, texto: "Enseñó que la Biblia es la autoridad suprema para la iglesia, por encima del papa.", formas: ["autoridad suprema", "por encima del papa", "encima del papa", "sobre el papa", "mas que el papa", "autoridad"] },
                { id: "ingles", peso: 50, texto: "Sus seguidores tradujeron por primera vez toda la Biblia al inglés.", formas: ["ingles", "traduj*", "traduc*"] },
              ],
              errores: [
                { id: "papa", texto: "Fue al revés: Wiclef enseñó que la Biblia es la autoridad suprema para la iglesia, por encima del papa.", formas: ["papa tiene la autoridad", "papa es la autoridad", "autoridad del papa", "papa (esta|estaba) por encima"], anula: "autoridad" },
              ],
              modelo: "Porque Wiclef, profesor en Oxford, enseñó que la Biblia es la autoridad suprema para la iglesia, por encima del papa, y criticó la riqueza del clero. Además, sus seguidores tradujeron por primera vez toda la Biblia al inglés.",
            },
          },
        ],
      },
    ],
  },
};
