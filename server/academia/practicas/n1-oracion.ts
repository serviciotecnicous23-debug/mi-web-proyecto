// Las prácticas de las lecciones de «La oración: hablar con Dios» (Nivel 1). Siguen el modelo de n1-salvacion.ts: cada
// actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_ORACION: PracticasMateria = {
  materia: "n1-oracion",
  mision: {
    titulo: "Aprender a hablar con el Padre",
    intro: "Un amigo que acaba de creer en Jesús te dice que quiere orar, pero no sabe cómo empezar. Repasa las cuatro lecciones para explicarle qué es orar, cómo usar el Padre Nuestro, por qué no rendirse y cómo apartar un tiempo diario con Dios.",
    cierre: "Ya puedes explicar qué es orar, usar el Padre Nuestro como guía, seguir orando con fe sin rendirte y apartar cada día un tiempo con Dios. También sabes cómo enseñó Jesús a ayunar.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Qué es orar
    "n1-oracion-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es orar?", reverso: "Conversar con Dios: contarle lo que hay en el corazón, darle gracias, adorarle, pedirle y escucharle.", apoyo: "Orar es conversar con Dios: contarle lo que hay en el corazón, darle gracias, adorarle, pedirle y escucharle." },
              { frente: "Gracias a Cristo, ¿cómo puede acercarse a Dios el creyente?", reverso: "Con confianza y no con miedo.", apoyo: "Gracias a Cristo, el creyente puede acercarse a Dios con confianza y no con miedo" },
              { frente: "Si la oración no es un rito para ganar puntos, ¿qué es?", reverso: "La vida de una relación con Dios.", apoyo: "La oración no es un rito para ganar puntos, sino la vida de una relación." },
              { frente: "¿Cuál es el primer error que Jesús corrigió en la oración?", reverso: "Orar para que otros nos vean, como los hipócritas que oraban en las esquinas para ganar fama.", apoyo: "El primero es orar para que otros nos vean: los hipócritas oraban en las esquinas para ganar fama." },
              { frente: "¿Qué es la adoración?", reverso: "Decirle a Dios quién es Él.", apoyo: "Adoración: decirle a Dios quién es Él" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué necesitas para empezar a orar?", reverso: "Un corazón sincero; no hacen falta palabras especiales.", apoyo: "No necesitas palabras especiales para empezar: necesitas un corazón sincero." },
              { frente: "Si Dios ya sabe lo que necesitamos, ¿para qué orar?", reverso: "Porque Él quiere que vengamos a Él: la oración nos acerca a su voluntad y nos enseña a depender de Él.", apoyo: "Dios no necesita que le informemos, pero quiere que vengamos a Él." },
              { frente: "¿Cuál es el segundo error que Jesús corrigió en la oración?", reverso: "Pensar que Dios nos oye por hablar mucho o repetir lo mismo, como hacían los gentiles.", apoyo: "El segundo es pensar que Dios nos oye por hablar mucho o repetir lo mismo, como hacían los gentiles." },
              { frente: "¿Qué hace siempre la oración, aunque no cambie enseguida la situación?", reverso: "Nos cambia a nosotros y nos llena de la paz de Dios.", apoyo: "La oración no siempre cambia de inmediato la situación, pero siempre nos cambia a nosotros y nos llena de su paz." },
              { frente: "¿Qué es orar en el nombre de Jesús?", reverso: "Acercarnos por lo que Él hizo y pedir lo que está de acuerdo con su voluntad.", apoyo: "sino acercarnos por lo que Él hizo y pedir lo que está de acuerdo con su voluntad" },
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
            texto: "Orar es [[conversar]] con Dios. Jesús enseñó a sus discípulos a llamarlo [[Padre]]. Gracias a Cristo, el creyente puede acercarse a Dios con [[confianza]] y no con miedo.",
            distractores: ["negociar", "Jefe", "dudas"],
            errores: {
              negociar: "Orar no es negociar ni ganar puntos con Dios: la oración es la vida de una relación.",
              Jefe: "Jesús enseñó a sus discípulos a llamar a Dios Padre: le hablamos como hijos.",
              dudas: "Gracias a Cristo nos acercamos a Dios con confianza, no con dudas ni con miedo.",
            },
            apoyo: "Gracias a Cristo, el creyente puede acercarse a Dios con confianza y no con miedo",
            ref: "Hebreos 4:16",
            explica: "Orar es conversar con Dios como un hijo con su Padre. Por lo que Cristo hizo, nos acercamos a Él con confianza.",
          },
          {
            texto: "Orar es hablar con Dios como un [[hijo]] con su Padre: con [[sinceridad]], en lo [[secreto]] y con confianza, presentándole todo con acción de gracias.",
            distractores: ["extraño", "público", "miedo"],
            errores: {
              extraño: "Jesús enseñó a llamar a Dios Padre: le hablamos como hijos, no como extraños.",
              público: "Jesús corrigió orar para que otros nos vean: se ora en lo secreto.",
              miedo: "Gracias a Cristo nos acercamos a Dios con confianza y no con miedo.",
            },
            apoyo: "Orar es hablar con Dios como un hijo con su Padre: con sinceridad, en lo secreto y con confianza",
            ref: "Mateo 6:6",
            explica: "Así resume la lección qué es orar: hablar con el Padre con un corazón sincero, sin buscar que otros nos vean y con la confianza de un hijo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué corrigió Jesús y qué enseñó en su lugar?",
            grupos: ["Lo que Jesús corrigió", "Lo que Jesús enseñó"],
            frases: [
              { texto: "Orar largo en público para que te admiren", grupo: 0, explica: "Es orar para que otros nos vean, como los hipócritas." },
              { texto: "Creer que Dios te oye más si repites la misma frase", grupo: 0, explica: "Así pensaban los gentiles: que Dios oye por repetir lo mismo." },
              { texto: "Usar muchas palabras para que Dios te escuche", grupo: 0 },
              { texto: "Hablarle a Dios a solas, con el corazón sincero", grupo: 1 },
              { texto: "Orar confiando en que el Padre ya sabe lo que necesitas", grupo: 1 },
              { texto: "Orar en tu cuarto, aunque nadie te vea", grupo: 1, explica: "Es orar en lo secreto, como enseñó Jesús." },
            ],
            apoyo: "Jesús enseña lo contrario: orar en lo secreto, con sinceridad, y confiar en que el Padre ya sabe lo que necesitamos antes de pedírselo.",
            ref: "Mateo 6:5-8",
            explica: "Jesús corrigió orar para ser vistos y pensar que Dios oye por hablar mucho. Enseñó a orar en lo secreto, con sinceridad y confiando en el Padre.",
          },
          {
            consigna: "¿De quién es cada error?",
            grupos: ["El error de los hipócritas", "El error de los gentiles"],
            frases: [
              { texto: "Orar en las esquinas", grupo: 0 },
              { texto: "Buscar fama con la oración", grupo: 0 },
              { texto: "Orar para que otros nos vean", grupo: 0 },
              { texto: "Hablar mucho para que Dios oiga", grupo: 1 },
              { texto: "Repetir lo mismo una y otra vez", grupo: 1 },
            ],
            apoyo: "los hipócritas oraban en las esquinas para ganar fama",
            ref: "Mateo 6:5, 7",
            explica: "Los hipócritas oraban para que otros los vieran y para ganar fama; los gentiles pensaban que Dios los oía por hablar mucho o repetir lo mismo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada forma de orar con lo que es.",
            pares: [
              ["Adoración", "Decirle a Dios quién es Él"],
              ["Acción de gracias", "Agradecerle lo que ha hecho"],
              ["Confesión", "Reconocer el pecado y recibir su perdón"],
              ["Petición e intercesión", "Pedir por lo propio y por los demás"],
            ],
            apoyo: "Adoración: decirle a Dios quién es Él",
            ref: "Salmos 95:6; 1 Tesalonicenses 5:18; 1 Juan 1:9; 1 Timoteo 2:1",
            explica: "Adoramos a Dios por quién es, le damos gracias por lo que ha hecho, confesamos el pecado para recibir su perdón y pedimos por nosotros y por los demás.",
          },
          {
            consigna: "¿Qué forma de orar es cada una de estas oraciones?",
            pares: [
              ["Señor, tú eres santo, grande y bueno.", "Adoración"],
              ["Gracias, Padre, por el trabajo que me diste.", "Acción de gracias"],
              ["Perdóname, Señor: hoy le mentí a mi jefe.", "Confesión"],
              ["Dame fuerzas para mi examen y cuida a mi hermano.", "Petición e intercesión"],
            ],
            apoyo: "Confesión: reconocer el pecado y recibir su perdón",
            ref: "1 Juan 1:9; 1 Timoteo 2:1",
            explica: "Decirle a Dios quién es Él es adorar; agradecer lo que hizo es dar gracias; reconocer el pecado es confesar; pedir por ti y por otros es petición e intercesión.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "En el almuerzo, un compañero de trabajo te dice: Si Dios ya sabe todo lo que necesito, ¿para qué le voy a orar?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: si Dios ya lo sabe, orar no sirve de mucho.", explica: "Dios no necesita que le informemos, pero quiere que vengamos a Él. Orar sí sirve: nos acerca a su voluntad." },
              { texto: "Dios ya lo sabe, pero quiere que vengamos a Él. Orar nos enseña a depender de Él, y es el medio que Él dispuso para obrar.", bien: true, explica: "Así lo explica la lección: no oramos para informar a Dios, sino para acercarnos a Él. Santiago dice que muchas veces no tenemos porque no pedimos." },
              { texto: "Oramos para contarle a Dios lo que Él no sabe.", explica: "El Padre ya sabe lo que necesitamos antes de pedírselo: no oramos para informarle." },
              { texto: "Oramos para ganar puntos con Dios y que nos premie.", explica: "La oración no es un rito para ganar puntos, sino la vida de una relación." },
            ],
            apoyo: "Dios no necesita que le informemos, pero quiere que vengamos a Él.",
            ref: "Santiago 4:2; Mateo 6:8",
            explica: "Orar no es informar a Dios: es acercarnos a Él, aprender a depender de Él y pedirle que obre.",
          },
          {
            caso: "Tu hermana tiene mañana una entrevista de trabajo. Está tan ansiosa que no puede dormir.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que le presente todo a Dios en oración, con acción de gracias, y confíe en que su paz guardará su corazón.", bien: true, explica: "Es la invitación de Filipenses 4:6-7: no vivir ahogados por la ansiedad, sino presentar todo a Dios." },
              { texto: "Que ore, porque así seguro le dan el trabajo.", explica: "La oración no siempre cambia de inmediato la situación, pero siempre nos cambia a nosotros y nos llena de su paz." },
              { texto: "Que se calme sola primero y después hable con Dios.", explica: "No hace falta estar en calma para orar: Pablo invita a presentarle todo a Dios, también lo que nos angustia." },
              { texto: "Que repita la misma oración muchas veces hasta que se le pase.", explica: "Dios no nos oye por repetir lo mismo: lo que cuenta es presentarle todo con sinceridad." },
            ],
            apoyo: "Pablo nos invita a no vivir ahogados por la ansiedad, sino a presentar todo a Dios en oración, con acción de gracias.",
            ref: "Filipenses 4:6-7",
            explica: "La oración no siempre cambia enseguida la situación, pero siempre nos cambia a nosotros y nos llena de la paz de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En estos versículos Jesús corrige dos errores.",
            ref: "Mateo 6:5-8",
            clave: {
              id: "pr-n1-oracion-1-a6-1",
              tipo: "corta",
              pregunta: "¿Cuáles son los dos errores que Jesús corrigió en la oración?",
              ideas: [
                {
                  id: "vean",
                  peso: 50,
                  texto: "Orar para que otros nos vean, como los hipócritas que buscaban fama.",
                  formas: ["(nos|me|los|lo|les|la|te) (vean|vea|miren|mire|admiren|admire)", "(otros|demas|gente|todos) (vean|vea|miren|admiren)", "ser vist*", "hipocrit*", "fama", "esquina*", "aparent*", "presum*", "luci*", "impresion* a (otros|los|la|todos|demas)", "espectaculo"],
                },
                {
                  id: "mucho",
                  peso: 50,
                  texto: "Pensar que Dios nos oye por hablar mucho o repetir lo mismo, como los gentiles.",
                  formas: ["habla* (mucho|tanto|bastante|mas)", "mas habla*", "much* palabras", "mas palabras", "repet*", "gentil*", "palabreri*", "(deci*|dic*) lo mismo", "ora* (largo|mucho)", "oracion* larga*", "cantidad de palabras"],
                },
              ],
              modelo: "El primero es orar para que otros nos vean, como los hipócritas que buscaban fama. El segundo es pensar que Dios nos oye por hablar mucho o repetir lo mismo, como los gentiles.",
            },
          },
          {
            apoyo: "Jesús enseña lo contrario: orar en lo secreto, con sinceridad",
            ref: "Mateo 6:5-8",
            clave: {
              id: "pr-n1-oracion-1-a6-2",
              tipo: "corta",
              pregunta: "Alguien ora largo y en voz alta para que todos lo admiren, y cree que así Dios lo escucha mejor. ¿Qué dos errores corrigió Jesús ahí y qué enseñó en su lugar?",
              ideas: [
                {
                  id: "vean",
                  peso: 40,
                  texto: "Ora para que otros lo vean, como los hipócritas.",
                  formas: ["(nos|me|los|lo|les|la|te) (vean|vea|miren|mire|admiren|admire)", "(otros|demas|gente|todos) (vean|vea|miren|admiren)", "ser vist*", "hipocrit*", "fama", "esquina*", "aparent*", "presum*", "luci*", "impresion* a (otros|los|la|todos|demas)", "espectaculo"],
                },
                {
                  id: "mucho",
                  peso: 40,
                  texto: "Cree que Dios lo oye por hablar mucho o repetir, como los gentiles.",
                  formas: ["habla* (mucho|tanto|bastante|mas)", "mas habla*", "much* palabras", "mas palabras", "repet*", "gentil*", "palabreri*", "(deci*|dic*) lo mismo", "ora* mucho", "cantidad de palabras"],
                },
                {
                  id: "secreto",
                  peso: 20,
                  texto: "Jesús enseña a orar en lo secreto, con sinceridad, confiando en que el Padre ya sabe lo que necesitamos.",
                  formas: ["secreto", "a solas", "privado", "sincer*", "de corazon", "ya sabe", "sabe lo que necesit*"],
                  negativa: true,
                },
              ],
              modelo: "Comete los dos errores: ora para que otros lo vean, como los hipócritas, y cree que Dios lo oye por hablar mucho, como los gentiles. Jesús enseña a orar en lo secreto, con sinceridad.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. El Padre Nuestro
    "n1-oracion-2": [
      {
        id: "a1",
        objetivo: 1,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le pidieron los discípulos a Jesús cuando lo vieron orar?", reverso: "Que les enseñara a orar.", apoyo: "Cuando los discípulos vieron orar a Jesús, le pidieron que les enseñara" },
              { frente: "¿Qué orden tiene la oración que Jesús enseñó?", reverso: "Primero Dios y su reino, y después nuestras necesidades.", apoyo: "La oración tiene un orden: primero Dios y su reino, y después nuestras necesidades." },
              { frente: "Padre nuestro que estás en los cielos: ¿qué enseña?", reverso: "Que nos acercamos a un Padre que nos ama y que es grande. Y al decir nuestro, oramos como familia.", apoyo: "nos acercamos a un Padre que nos ama y que es grande" },
              { frente: "Santificado sea tu nombre: ¿qué pedimos?", reverso: "Que Dios sea honrado como santo, empezando por nuestra propia vida.", apoyo: "pedimos que Dios sea honrado como santo, empezando por nuestra propia vida" },
              { frente: "¿Cómo termina el Padre Nuestro?", reverso: "Reconociendo que el reino, el poder y la gloria son de Dios para siempre.", apoyo: "La oración termina reconociendo que el reino, el poder y la gloria son de Dios para siempre." },
            ],
          },
          {
            tarjetas: [
              { frente: "Venga tu reino: ¿qué anhelamos?", reverso: "Que Dios reine en los corazones y en el mundo, y que Cristo vuelva.", apoyo: "anhelamos que Dios reine en los corazones y en el mundo, y que Cristo vuelva" },
              { frente: "Hágase tu voluntad: ¿qué hacemos?", reverso: "Rendimos nuestros planes a lo que Dios quiere, como lo hizo Jesús en Getsemaní.", apoyo: "rendimos nuestros planes a lo que Dios quiere, como lo hizo Jesús en Getsemaní" },
              { frente: "El pan de cada día: ¿qué aprendemos?", reverso: "A confiar en Dios para lo que necesitamos hoy, sin afanarnos por el mañana.", apoyo: "confiamos en Dios para lo que necesitamos hoy, sin afanarnos por el mañana" },
              { frente: "Perdónanos como perdonamos: ¿a qué nos comprometemos?", reverso: "A perdonar a otros, mientras le pedimos perdón a Dios.", apoyo: "pedimos perdón y nos comprometemos a perdonar a otros" },
              { frente: "No nos metas en tentación, mas líbranos del mal: ¿qué pedimos?", reverso: "Fuerzas para no caer y protección contra el maligno.", apoyo: "pedimos fuerzas para no caer y protección contra el maligno" },
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
            afirmaciones: [
              { texto: "El Padre Nuestro es una oración modelo: un mapa de cómo orar.", verdad: true, explica: "Jesús no la dio para repetirla sin pensar, sino para enseñarnos cómo orar.", apoyo: "Él les dio una oración modelo que no es para repetir sin pensar, sino un mapa de cómo orar.", ref: "Lucas 11:1; Mateo 6:9" },
              { texto: "El Padre Nuestro solo sirve si se repite con las palabras exactas.", verdad: false, explica: "Jesús enseñó a orar de esta manera, no solo con estas palabras: es un modelo, no una fórmula.", apoyo: "no solo con estas palabras, sino de esta manera", ref: "Mateo 6:9" },
              { texto: "En el Padre Nuestro, primero van nuestras necesidades y después Dios.", verdad: false, explica: "Es al revés: primero Dios y su reino, y después nuestras necesidades.", apoyo: "La oración tiene un orden: primero Dios y su reino, y después nuestras necesidades." },
            ],
          },
          {
            afirmaciones: [
              { texto: "Lo importante del Padre Nuestro es repetirlo de memoria, aunque no pensemos en lo que decimos.", verdad: false, explica: "No es para repetir sin pensar: es un mapa de cómo orar.", apoyo: "una oración modelo que no es para repetir sin pensar, sino un mapa de cómo orar", ref: "Lucas 11:1; Mateo 6:9" },
              { texto: "Toda oración verdadera empieza y termina con Dios en el centro.", verdad: true, explica: "El Padre Nuestro empieza con el Padre y termina reconociendo que el reino, el poder y la gloria son de Dios.", apoyo: "Así empieza y termina toda oración verdadera: con Dios en el centro." },
              { texto: "Podemos orar cada parte del Padre Nuestro con nuestras propias palabras.", verdad: true, explica: "Jesús enseñó una manera de orar: cada parte se puede orar con tus palabras.", apoyo: "Puedes orar cada parte con tus palabras" },
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
            consigna: "Une cada parte del Padre Nuestro con lo que enseña.",
            pares: [
              ["Padre nuestro que estás en los cielos", "Nos acercamos a un Padre que nos ama y que es grande"],
              ["Santificado sea tu nombre", "Pedimos que Dios sea honrado como santo"],
              ["Venga tu reino", "Anhelamos que Dios reine en los corazones y en el mundo"],
              ["Hágase tu voluntad", "Rendimos nuestros planes a lo que Dios quiere"],
            ],
            apoyo: "Hágase tu voluntad: rendimos nuestros planes a lo que Dios quiere",
            ref: "Mateo 6:9-10",
            explica: "Las primeras partes ponen a Dios primero: su amor y su grandeza, su nombre santo, su reino y su voluntad.",
          },
          {
            consigna: "Une cada parte del Padre Nuestro con lo que pedimos o aprendemos en ella.",
            pares: [
              ["Decimos nuestro", "Oramos como familia"],
              ["El pan de cada día", "Confiamos en Dios para lo que necesitamos hoy"],
              ["Perdónanos como perdonamos", "Pedimos perdón y nos comprometemos a perdonar a otros"],
              ["No nos metas en tentación", "Pedimos fuerzas para no caer"],
              ["Líbranos del mal", "Pedimos protección contra el maligno"],
            ],
            apoyo: "El pan de cada día: confiamos en Dios para lo que necesitamos hoy, sin afanarnos por el mañana.",
            ref: "Mateo 6:9, 11-13",
            explica: "Después de buscar a Dios, le presentamos nuestras necesidades como familia: el pan de hoy, el perdón y la protección.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Usa el Padre Nuestro como guía: ordena lo que puedes orar con tus palabras.",
            pasos: ["Adorar al Padre", "Pedir por su reino en tu familia y tu ciudad", "Entregarle tus planes", "Pedir lo que necesitas hoy", "Perdonar a alguien", "Pedir fuerzas contra la tentación"],
            apoyo: "Puedes orar cada parte con tus palabras",
            ref: "Mateo 6:9-13",
            explica: "La guía sigue el orden del Padre Nuestro: primero Dios, su reino y su voluntad; después el pan, el perdón y la protección.",
          },
          {
            consigna: "Ana ora antes de ir al trabajo y usa el Padre Nuestro como guía. Ordena su oración.",
            pasos: [
              "Padre, tú me amas y eres grande: te adoro.",
              "Que tu reino llegue a mi familia y a mi ciudad.",
              "Te entrego mis planes de hoy: que se haga lo que tú quieres.",
              "Dame lo que necesito para este día.",
              "Perdóname; yo también perdono a mi compañera.",
              "Dame fuerzas para no caer y protégeme del mal.",
            ],
            apoyo: "El Padre Nuestro es un modelo: primero buscamos a Dios, su nombre, su reino y su voluntad; después le pedimos el pan, el perdón y la protección.",
            ref: "Mateo 6:9-13",
            explica: "Ana ora con sus palabras, pero sigue el modelo: primero busca a Dios y su reino, y después pide el pan, el perdón y la protección.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Antes de salir al trabajo quieres orar, pero no sabes qué decirle a Dios.",
            pregunta: "¿Cómo te ayuda el Padre Nuestro?",
            opciones: [
              { texto: "Lo repito rápido tres veces y salgo.", explica: "No es para repetir sin pensar: es un mapa de cómo orar." },
              { texto: "Sigo sus partes con mis palabras: adoro al Padre, pido por su reino, le entrego mis planes, pido lo de hoy, perdono y pido fuerzas.", bien: true, explica: "Así se usa como guía: cada parte se ora con tus palabras, con Dios primero." },
              { texto: "Le pido primero todo lo que necesito y, si me queda tiempo, lo adoro.", explica: "El modelo pone a Dios primero: su nombre, su reino y su voluntad; después nuestras necesidades." },
              { texto: "Solo le pido el pan de cada día, porque es lo que más necesito.", explica: "Pedir el pan es parte del modelo, pero primero buscamos a Dios, su nombre, su reino y su voluntad." },
            ],
            apoyo: "Orar con el modelo de Jesús ordena el corazón: pone a Dios primero.",
            ref: "Mateo 6:9-13",
            explica: "El Padre Nuestro es un mapa: te ayuda a orar con tus palabras y con Dios en el primer lugar.",
          },
          {
            caso: "Un compañero de trabajo se burló de ti delante de todos. Esa noche oras con el Padre Nuestro y llegas a la parte del perdón.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Me salto esa parte hasta que se me pase el enojo.", explica: "Esa parte nos enseña a pedir perdón y a comprometernos a perdonar a otros." },
              { texto: "Pido perdón por mis pecados y le digo a Dios que decido perdonar a mi compañero.", bien: true, explica: "Perdónanos como perdonamos: pedimos perdón y nos comprometemos a perdonar a otros." },
              { texto: "Pido perdón para mí, pero a él no lo perdono.", explica: "Jesús une las dos cosas: el perdón que pedimos y el perdón que damos." },
              { texto: "Le pido a Dios que lo castigue por lo que hizo.", explica: "En esa parte no pedimos castigo para otros: nos comprometemos a perdonarlos." },
            ],
            apoyo: "Perdónanos como perdonamos: pedimos perdón y nos comprometemos a perdonar a otros",
            ref: "Mateo 6:12, 14-15",
            explica: "Usar el Padre Nuestro como guía incluye perdonar de verdad a quien nos ofendió, para orar con el corazón limpio.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "no solo con estas palabras, sino de esta manera",
            ref: "Mateo 6:9",
            clave: {
              id: "pr-n1-oracion-2-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué el Padre Nuestro es un modelo y no una fórmula?",
              ideas: [
                {
                  id: "manera",
                  peso: 50,
                  texto: "Jesús enseñó a orar de esta manera, no solo con estas palabras: es un mapa de cómo orar.",
                  formas: ["esta manera", "esta forma", "(manera|forma) de orar", "mapa", "como orar", "guia", "ejemplo", "no solo (con|las|estas|palabras)", "no repet*", "no se trata de repet*", "(nuestras|tus|mis|sus|propias) palabras", "pensa* lo que"],
                  negativa: true,
                },
                {
                  id: "orden",
                  peso: 50,
                  texto: "Enseña un orden: primero Dios y su reino, y después nuestras necesidades.",
                  formas: ["primero dios", "primero (padre|reino|senor)", "dios primero", "primer lugar", "un orden", "dios centro", "despues necesidades", "nuestras necesidades"],
                },
              ],
              modelo: "Porque Jesús enseñó a orar de esta manera, no solo con estas palabras. Es un mapa de cómo orar: primero Dios, su nombre y su reino, y después nuestras necesidades.",
            },
          },
          {
            apoyo: "Él les dio una oración modelo que no es para repetir sin pensar, sino un mapa de cómo orar.",
            ref: "Lucas 11:1; Mateo 6:9-13",
            clave: {
              id: "pr-n1-oracion-2-a6-2",
              tipo: "corta",
              pregunta: "Un amigo dice que basta con repetir el Padre Nuestro de memoria. ¿Qué le explicas?",
              ideas: [
                {
                  id: "mapa",
                  peso: 50,
                  texto: "No es para repetir sin pensar: es un modelo, un mapa de cómo orar con nuestras palabras.",
                  formas: ["modelo", "mapa", "guia", "ejemplo", "esta manera", "esta forma", "como orar", "(nuestras|tus|mis|sus|propias) palabras", "no basta", "no repet*", "pensa* lo que"],
                  negativa: true,
                },
                {
                  id: "orden",
                  peso: 50,
                  texto: "Enseña un orden: primero Dios y su reino, y después nuestras necesidades.",
                  formas: ["primero dios", "primero (padre|reino|senor)", "dios primero", "primer lugar", "un orden", "dios centro", "despues necesidades", "nuestras necesidades"],
                },
              ],
              modelo: "Le explico que el Padre Nuestro es un modelo, un mapa de cómo orar. Podemos orar cada parte con nuestras palabras: primero Dios y su reino, y después nuestras necesidades.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Orar con fe y perseverar
    "n1-oracion-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué contó Jesús la parábola de la viuda y el juez?", reverso: "Para enseñar a orar siempre y no desmayar.", apoyo: "El propósito está en el primer versículo: orar siempre y no desmayar." },
              { frente: "¿Cómo era el juez de la historia?", reverso: "Injusto. Aun así, la viuda insistió hasta que le hizo justicia.", apoyo: "El juez de la historia era injusto, pero la viuda insistió hasta que le hizo justicia." },
              { frente: "¿Dice Jesús que Dios es como ese juez?", reverso: "No: dice todo lo contrario. Dios es justo y nos ama.", apoyo: "Jesús no dice que Dios sea como ese juez; dice todo lo contrario" },
              { frente: "¿A quiénes responderá Dios?", reverso: "A sus escogidos que claman a Él día y noche.", apoyo: "responderá a sus escogidos que claman a Él día y noche" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es la fe, según esta lección?", reverso: "Confianza en Dios, no una fuerza para obligarlo.", apoyo: "La fe no es una fuerza que tenemos para obligar a Dios, sino confianza en Él" },
              { frente: "¿Qué es orar con fe?", reverso: "Creer que Dios oye, que puede y que responderá de la mejor manera.", apoyo: "Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera." },
              { frente: "¿De qué maneras responde Dios?", reverso: "A veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor.", apoyo: "a veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor" },
              { frente: "¿Qué es perseverar en la oración?", reverso: "Seguir confiando mientras Dios obra; no es insistir para cambiarlo.", apoyo: "Perseverar no es insistir para cambiar a Dios; es seguir confiando mientras Él obra." },
              { frente: "¿Por quiénes nos toca orar?", reverso: "Por la familia, la iglesia, las autoridades y los que no conocen a Cristo: es parte del llamado de todo creyente.", apoyo: "Orar por otros —tu familia, tu iglesia, tus autoridades y los que no conocen a Cristo— es parte del llamado de todo creyente" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            frases: [
              "Jesús contó la parábola para enseñar a orar siempre y no desmayar.",
              "El juez de la historia era injusto.",
              "La viuda insistió hasta que el juez le hizo justicia.",
              "Jesús enseña que Dios es como ese juez: hay que cansarlo para que responda.",
            ],
            malo: 3,
            correccion: "Jesús dice lo contrario: si hasta un juez injusto responde, cuánto más Dios, que es justo y nos ama.",
            apoyo: "Jesús no dice que Dios sea como ese juez; dice todo lo contrario",
            ref: "Lucas 18:1-8",
            explica: "La parábola no dice que Dios sea como el juez: muestra lo contrario. Dios es justo, nos ama y responde a los que claman a Él.",
          },
          {
            frases: [
              "Jesús sabía que nos desanimaríamos al orar.",
              "La parábola enseña a dejar de orar si no vemos una respuesta pronto.",
              "Dios es justo y nos ama.",
              "Dios responderá a sus escogidos que claman a Él día y noche.",
            ],
            malo: 1,
            correccion: "La parábola enseña a orar siempre y no desmayar.",
            apoyo: "El propósito está en el primer versículo: orar siempre y no desmayar.",
            ref: "Lucas 18:1",
            explica: "Jesús contó la historia para que no dejemos de orar, aunque parezca que no pasa nada.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            texto: "Orar con fe es creer que Dios [[oye]], que puede y que responderá de la mejor manera. La fe es [[confianza]] en Dios, y se apoya en su [[voluntad]]: si pedimos conforme a ella, Él nos oye.",
            distractores: ["olvida", "presión", "suerte"],
            errores: {
              olvida: "Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera.",
              presión: "La fe no es una fuerza para presionar u obligar a Dios: es confianza en Él.",
              suerte: "La fe no depende de la suerte: se apoya en la voluntad de Dios.",
            },
            apoyo: "Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera.",
            ref: "Marcos 11:22-24; 1 Juan 5:14-15",
            explica: "Tener fe es confiar en Dios: Él oye, puede y responde de la mejor manera, conforme a su voluntad.",
          },
          {
            texto: "Jesús dice que tengamos fe en [[Dios]]. Orar con fe no es obligarlo: es [[confiar]] en Él. Y si pedimos [[conforme]] a su voluntad, Él nos oye.",
            distractores: ["nosotros", "exigir", "contra"],
            errores: {
              nosotros: "La fe no está puesta en nosotros ni en nuestra fuerza: Jesús dice que tengamos fe en Dios.",
              exigir: "La fe no es una fuerza para obligar a Dios: es confianza en Él.",
              contra: "La fe se apoya en la voluntad de Dios: Él nos oye cuando pedimos conforme a ella.",
            },
            apoyo: "Y la fe se apoya en su voluntad: si pedimos conforme a ella, Él nos oye",
            ref: "Marcos 11:22; 1 Juan 5:14-15",
            explica: "La fe confía en Dios y busca lo que Él quiere: no es una fuerza para obligarlo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            afirmaciones: [
              { texto: "Dios responde de distintas maneras: a veces dice que sí, a veces nos hace esperar y a veces dice que no.", verdad: true, explica: "Y cuando dice que no, es porque tiene algo mejor.", apoyo: "Dios responde de distintas maneras: a veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor." },
              { texto: "Si Dios no nos da lo que pedimos, es porque no nos escucha.", verdad: false, explica: "A veces Dios dice que no porque tiene algo mejor. A Pablo le respondió que su gracia le bastaba.", apoyo: "Dios le respondió que su gracia le bastaba", ref: "2 Corintios 12:7-9" },
              { texto: "Perseverar en la oración es insistir hasta que Dios cambie de opinión.", verdad: false, explica: "Perseverar no es insistir para cambiar a Dios: es seguir confiando mientras Él obra.", apoyo: "Perseverar no es insistir para cambiar a Dios; es seguir confiando mientras Él obra." },
            ],
          },
          {
            afirmaciones: [
              { texto: "Pablo pidió tres veces que le quitaran un aguijón en la carne, y Dios le respondió que su gracia le bastaba.", verdad: true, explica: "Dios le respondió con su gracia: a veces la respuesta es no, porque Él tiene algo mejor.", apoyo: "Pablo pidió tres veces que le quitaran un aguijón en la carne", ref: "2 Corintios 12:7-9" },
              { texto: "Orar por otros es tarea solo de los pastores.", verdad: false, explica: "Orar por otros es parte del llamado de todo creyente.", apoyo: "es parte del llamado de todo creyente", ref: "1 Timoteo 2:1-4" },
              { texto: "La oración eficaz del justo puede mucho.", verdad: true, explica: "Lo enseña Santiago: por eso vale la pena orar por tu familia, tu iglesia, tus autoridades y los que no conocen a Cristo.", apoyo: "Santiago enseña que la oración eficaz del justo puede mucho", ref: "Santiago 5:16" },
              { texto: "Cuando la respuesta tarda, lo mejor es dejar de orar.", verdad: false, explica: "Jesús enseñó a orar siempre y no desmayar: perseverar es seguir confiando mientras Dios obra.", apoyo: "es seguir confiando mientras Él obra" },
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
            caso: "Llevas meses orando por la salud de tu tía y no ves cambios. Una amiga te dice: Si Dios no ha respondido, es porque no te oye; mejor deja de orar.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le hago caso y dejo de orar.", explica: "Jesús enseñó a orar siempre y no desmayar. Que la respuesta tarde no quiere decir que Dios no oye." },
              { texto: "Sigo orando por mi tía: Dios responde de distintas maneras y en su tiempo, y yo sigo confiando mientras Él obra.", bien: true, explica: "Dios a veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor." },
              { texto: "Oro con más fuerza para obligar a Dios a sanarla.", explica: "La fe no es una fuerza para obligar a Dios: es confianza en Él." },
              { texto: "Le digo a Dios que, si no la sana esta semana, ya no voy a confiar en Él.", explica: "Perseverar no es presionar a Dios: es seguir confiando mientras Él obra." },
            ],
            apoyo: "Jesús nos enseña a orar siempre y no desmayar, con fe en un Dios justo que oye y responde según su voluntad y en su tiempo.",
            ref: "Lucas 18:1; 2 Corintios 12:7-9",
            explica: "Cuando la respuesta tarda, no dejamos de orar: seguimos confiando en un Dios justo que responde según su voluntad y en su tiempo.",
          },
          {
            caso: "Tu hermano no conoce a Cristo y se burla cuando le hablas de Dios. Ya te cansaste y piensas dejar de orar por él.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Dejo de orar por él hasta que cambie.", explica: "Orar por los que no conocen a Cristo es parte del llamado de todo creyente: no esperamos a que cambien para orar." },
              { texto: "Sigo orando por él cada día, porque la oración eficaz del justo puede mucho.", bien: true, explica: "Orar por otros, también por los que no conocen a Cristo, es parte del llamado de todo creyente." },
              { texto: "Oro solo por mí: cada quien debe orar por sí mismo.", explica: "Orar por otros, como tu familia y los que no conocen a Cristo, es parte del llamado de todo creyente." },
              { texto: "Le pido al pastor que ore por él y yo ya no lo hago.", explica: "Orar por otros no es solo tarea del pastor: es parte del llamado de todo creyente." },
            ],
            apoyo: "Orar por otros —tu familia, tu iglesia, tus autoridades y los que no conocen a Cristo— es parte del llamado de todo creyente",
            ref: "Santiago 5:16; 1 Timoteo 2:1-4",
            explica: "Aunque nos cansemos, seguimos orando por otros: la oración eficaz del justo puede mucho, y orar por los demás es parte de nuestro llamado.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús nos enseña a orar siempre y no desmayar, con fe en un Dios justo que oye y responde según su voluntad y en su tiempo.",
            ref: "Lucas 18:1-8",
            clave: {
              id: "pr-n1-oracion-3-a6-1",
              tipo: "corta",
              pregunta: "¿Qué enseña Jesús con la parábola de la viuda y el juez?",
              ideas: [
                {
                  id: "siempre",
                  peso: 50,
                  texto: "Que hay que orar siempre y no desmayar.",
                  formas: ["orar siempre", "oremos siempre", "siempre", "desmay*", "no rind*", "no rendir*", "no (dejar|dejemos|dejes) (de|orar)", "persever*", "insist* (orando|oracion|orar|pidiendo)", "con insistencia", "no (cansar*|cansemos)", "sin (rendir*|desmay*|cansar*)", "no (desanim*|desalent*)"],
                  negativa: true,
                },
                {
                  id: "cuanto",
                  peso: 50,
                  texto: "Si hasta un juez injusto respondió, cuánto más Dios, que es justo y nos ama, responderá a los que claman a Él.",
                  formas: ["cuanto mas", "dios (es|si) justo", "justo", "es bueno", "nos ama", "nos quiere", "no es como (ese|el) juez", "no es injusto", "al contrario", "lo contrario", "a sus escogidos", "dia y noche", "dios (respondera|responde|oye|escucha)", "nos (escucha|oye|respondera|responde)"],
                },
              ],
              modelo: "Jesús enseña a orar siempre y no desmayar. Si hasta un juez injusto respondió a la viuda que insistía, cuánto más Dios, que es justo y nos ama, responderá a los que claman a Él.",
            },
          },
          {
            apoyo: "Jesús no dice que Dios sea como ese juez; dice todo lo contrario",
            ref: "Lucas 18:1-8",
            clave: {
              id: "pr-n1-oracion-3-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué Jesús contó la historia de un juez injusto, si Dios no es como ese juez?",
              ideas: [
                {
                  id: "contrario",
                  peso: 50,
                  texto: "Para mostrar lo contrario: si un juez injusto responde, cuánto más Dios, que es justo y nos ama.",
                  formas: ["cuanto mas", "lo contrario", "al contrario", "justo", "nos ama", "nos quiere", "es bueno", "a sus escogidos", "dia y noche", "dios (respondera|responde)", "nos (escucha|oye|respondera|responde)"],
                },
                {
                  id: "siempre",
                  peso: 50,
                  texto: "Para que oremos siempre y no desmayemos.",
                  formas: ["orar siempre", "oremos siempre", "siempre", "desmay*", "no rind*", "no rendir*", "no (dejar|dejemos|dejes) (de|orar)", "persever*", "insist* (orando|oracion|orar|pidiendo)", "con insistencia", "no (cansar*|cansemos)", "sin (rendir*|desmay*|cansar*)", "no (desanim*|desalent*)"],
                  negativa: true,
                },
              ],
              modelo: "Para enseñar lo contrario: si un juez injusto le hizo justicia a la viuda que insistía, cuánto más Dios, que es justo y nos ama. Por eso debemos orar siempre y no desmayar.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Mi tiempo diario con Dios y el ayuno
    "n1-oracion-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Jesús después de un día lleno de gente y de milagros?", reverso: "Se levantó muy de mañana, cuando todavía estaba oscuro, y se fue a un lugar desierto a orar.", apoyo: "Jesús se levantó muy de mañana, cuando todavía estaba oscuro, y se fue a un lugar desierto a orar" },
              { frente: "¿Cuántas veces al día oraba Daniel?", reverso: "Tres veces al día.", apoyo: "Daniel oraba tres veces al día" },
              { frente: "¿Qué es el tiempo diario con Dios?", reverso: "No es una carga: es el lugar donde recibimos fuerzas para el día.", apoyo: "El tiempo diario con Dios no es una carga: es el lugar donde recibimos fuerzas para el día." },
              { frente: "¿Cuándo crece la oración?", reverso: "Cuando se vuelve un hábito diario.", apoyo: "La oración crece cuando se vuelve un hábito diario." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es ayunar?", reverso: "Dejar de comer por un tiempo para dedicarse a buscar a Dios en oración.", apoyo: "Ayunar es dejar de comer por un tiempo para dedicarse a buscar a Dios en oración." },
              { frente: "¿Para qué ayunaba el pueblo de Dios en la Biblia?", reverso: "Para buscar su dirección, en tiempos de gran necesidad y para humillarse delante de Él.", apoyo: "el pueblo de Dios ayunaba para buscar su dirección" },
              { frente: "¿De cuánto tiempo puede ser un ayuno?", reverso: "De una comida o de un día.", apoyo: "Un ayuno puede ser de una comida o de un día." },
              { frente: "¿Qué hace quien tiene un problema de salud?", reverso: "Consulta con su médico y con su pastor. También puede apartar otra cosa, como el entretenimiento, para dedicar ese tiempo a Dios.", apoyo: "Si tienes un problema de salud, consulta con tu médico y con tu pastor" },
              { frente: "¿Qué buscamos en la oración diaria?", reverso: "A una Persona: no cumplimos un deber, nos encontramos con nuestro Padre.", apoyo: "El hábito ayuda, pero lo que buscamos es a una Persona." },
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
            texto: "Después de un día lleno de gente y de milagros, Jesús se levantó muy de [[mañana]], cuando todavía estaba oscuro, y se fue a un lugar [[desierto]] a orar. Daniel oraba [[tres]] veces al día.",
            distractores: ["tarde", "ruidoso", "dos"],
            errores: {
              tarde: "Jesús se levantó muy de mañana, cuando todavía estaba oscuro.",
              ruidoso: "Jesús buscó un lugar desierto, para estar a solas con su Padre.",
              dos: "La lección dice que Daniel oraba tres veces al día.",
            },
            apoyo: "Jesús se levantó muy de mañana, cuando todavía estaba oscuro, y se fue a un lugar desierto a orar",
            ref: "Marcos 1:35; Daniel 6:10",
            explica: "Jesús y Daniel buscaban a Dios cada día: Jesús, muy temprano y a solas; Daniel, tres veces al día.",
          },
          {
            texto: "Si Jesús, el Hijo de Dios, buscaba tiempo a solas con su [[Padre]], cuánto más lo necesitamos nosotros. El tiempo diario con Dios es el lugar donde recibimos [[fuerzas]] para el día. La oración crece cuando se vuelve un [[hábito]] diario.",
            distractores: ["carga", "castigo", "público"],
            errores: {
              carga: "El tiempo diario con Dios no es una carga: es el lugar donde recibimos fuerzas para el día.",
              castigo: "Orar cada día no es un castigo: en la oración diaria nos encontramos con nuestro Padre.",
              público: "Jesús buscaba tiempo a solas con su Padre, no delante de la gente.",
            },
            apoyo: "Si Jesús, el Hijo de Dios, buscaba tiempo a solas con su Padre",
            ref: "Marcos 1:35",
            explica: "Si Jesús, el Hijo de Dios, buscaba cada día a su Padre, nosotros lo necesitamos más: allí recibimos fuerzas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos del plan sencillo para tu tiempo diario con Dios.",
            pasos: ["Escoge un momento y un lugar", "Empieza con la Palabra: lee un pasaje corto", "Ora con lo que leíste: da gracias, confiesa, pide y escucha", "Anota lo que Dios te habla y por quién oraste", "Vuelve al día siguiente: sé constante"],
            apoyo: "Empieza con la Palabra: lee un pasaje corto",
            ref: "Marcos 1:35",
            explica: "Primero apartas un momento y un lugar; luego lees la Palabra, oras con lo que leíste, anotas lo que Dios te habla y vuelves cada día.",
          },
          {
            consigna: "Carlos tiene su tiempo con Dios antes de ir al trabajo. Ordena lo que hace.",
            pasos: ["Se levanta antes que su familia y se sienta en la cocina", "Lee un pasaje corto de la Biblia", "Ora con lo que leyó: da gracias, confiesa, pide y escucha", "Anota lo que Dios le habló y por quién oró", "Al día siguiente lo vuelve a hacer"],
            apoyo: "Ora con lo que leíste: da gracias, confiesa, pide y escucha.",
            ref: "Marcos 1:35",
            explica: "Carlos sigue el plan: un momento y un lugar, la Palabra, la oración con lo que leyó, sus notas y la constancia de cada día.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Trabajas temprano y llegas cansado en la noche. Quieres empezar tu tiempo diario con Dios, pero piensas que, si no es una hora completa, no vale la pena.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Empiezo con diez minutos cada día, en un momento y un lugar fijos, con un pasaje corto y oración.", bien: true, explica: "Diez minutos cada día valen más que una hora de vez en cuando." },
              { texto: "Espero a tener un día libre para orar una hora entera.", explica: "La constancia vale más que un tiempo largo de vez en cuando." },
              { texto: "Oro solo cuando tengo un problema grande.", explica: "La oración crece cuando se vuelve un hábito diario, no solo cuando hay problemas." },
              { texto: "Leo muchos capítulos el domingo y así cumplo por toda la semana.", explica: "El plan es diario: un pasaje corto y oración cada día. Y no se trata de cumplir un deber, sino de encontrarte con tu Padre." },
            ],
            apoyo: "Sé constante: diez minutos cada día valen más que una hora de vez en cuando.",
            ref: "Marcos 1:35; Daniel 6:10",
            explica: "Un hábito pequeño y diario transforma la vida: lo que cuenta es la constancia.",
          },
          {
            caso: "Vives con tu familia en una casa pequeña, y en la noche hay mucho ruido. Quieres empezar tu tiempo diario con Dios.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Espero a tener una casa más grande para empezar.", explica: "No hace falta esperar: basta con escoger un momento y un lugar." },
              { texto: "Solo oro en la iglesia los domingos.", explica: "El tiempo con Dios es diario: la oración crece cuando se vuelve un hábito diario." },
              { texto: "Me levanto un poco antes que todos y busco un rincón tranquilo para leer y orar.", bien: true, explica: "El primer paso es escoger un momento y un lugar; muchos prefieren la mañana, antes de que empiecen las ocupaciones." },
              { texto: "Oro mientras reviso el teléfono, para aprovechar el tiempo.", explica: "Como Jesús, que se fue a un lugar desierto a orar, buscamos un momento y un lugar a solas con Dios." },
            ],
            apoyo: "Escoge un momento y un lugar: muchos prefieren la mañana, antes de que empiecen las ocupaciones.",
            ref: "Marcos 1:35",
            explica: "Como Jesús, que buscó un lugar desierto muy de mañana, aparta un momento y un lugar para estar con Dios cada día.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            grupos: ["Así es el ayuno bíblico", "Eso no es el ayuno bíblico"],
            frases: [
              { texto: "Dejar de comer por un tiempo para buscar a Dios en oración", grupo: 0 },
              { texto: "Ayunar en lo secreto, delante del Padre", grupo: 0 },
              { texto: "Ayunar para buscar la dirección de Dios", grupo: 0 },
              { texto: "Una dieta para bajar de peso", grupo: 1 },
              { texto: "Una manera de presionar a Dios", grupo: 1 },
              { texto: "Ayunar para que otros lo noten", grupo: 1, explica: "Jesús enseñó a ayunar en lo secreto." },
            ],
            apoyo: "No es una dieta ni una manera de presionar a Dios, y no se hace para que otros lo noten",
            ref: "Mateo 6:16-18",
            explica: "El ayuno bíblico es dejar de comer por un tiempo para buscar a Dios en oración, y se hace en lo secreto.",
          },
          {
            consigna: "¿Qué va con lo que enseña la lección sobre el ayuno y qué no?",
            grupos: ["Va con lo que enseña la lección", "No va con lo que enseña la lección"],
            frases: [
              { texto: "Saltarte el almuerzo para orar por tu familia", grupo: 0, explica: "Un ayuno puede ser de una comida." },
              { texto: "Ayunar sin hacerlo notar a los demás", grupo: 0 },
              { texto: "Con un problema de salud, consultar con tu médico y tu pastor antes de ayunar", grupo: 0 },
              { texto: "Apartar el entretenimiento para dedicar ese tiempo a Dios", grupo: 0 },
              { texto: "Publicar en redes que estás ayunando", grupo: 1, explica: "El ayuno no se hace para que otros lo noten." },
              { texto: "Dejar de comer para que Dios haga lo que quieres", grupo: 1, explica: "El ayuno no es una manera de presionar a Dios." },
              { texto: "Comer menos solo para verte mejor", grupo: 1, explica: "El ayuno no es una dieta." },
            ],
            apoyo: "se hace en lo secreto, delante del Padre",
            ref: "Mateo 6:16-18",
            explica: "Ayunar como enseñó Jesús es apartar la comida por un tiempo para buscar a Dios en lo secreto; no es dieta, ni presión, ni para que otros lo vean.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Ayunar es dejar de comer por un tiempo para dedicarse a buscar a Dios en oración.",
            ref: "Mateo 6:16-18",
            clave: {
              id: "pr-n1-oracion-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué es el ayuno bíblico?",
              ideas: [
                {
                  id: "comer",
                  peso: 50,
                  texto: "Es dejar de comer por un tiempo.",
                  formas: ["dej* de comer", "no comer", "sin comer", "abstener*", "apart* (la|el) comida", "una comida", "dej* la comida", "priva* de (comer|la|comida)"],
                },
                {
                  id: "buscar",
                  peso: 50,
                  texto: "Para dedicarse a buscar a Dios en oración.",
                  formas: ["busca*", "dedica* (a|el|ese) (dios|orar|tiempo|buscar)", "oracion", "orar", "acerc*"],
                },
              ],
              modelo: "Ayunar es dejar de comer por un tiempo, una comida o un día, para dedicarse a buscar a Dios en oración. No es una dieta ni una manera de presionar a Dios.",
            },
          },
          {
            apoyo: "se hace en lo secreto, delante del Padre",
            ref: "Mateo 6:16-18",
            clave: {
              id: "pr-n1-oracion-4-a6-2",
              tipo: "corta",
              pregunta: "¿Cómo enseñó Jesús a practicar el ayuno?",
              ideas: [
                {
                  id: "secreto",
                  peso: 50,
                  texto: "En lo secreto, delante del Padre.",
                  formas: ["secreto", "privado", "a solas", "delante del padre", "ante el padre", "delante de dios", "ante dios", "solo (dios|padre)"],
                  negativa: true,
                },
                {
                  id: "notar",
                  peso: 50,
                  texto: "No para que otros lo noten.",
                  formas: ["no para que (otros|los|la|nos|me|te|lo|demas|gente|todos|nadie)", "no para ser vist*", "sin ser vist*", "sin que (otros|nadie|los|la|lo|demas|gente|nos|me|te)", "que (nadie|otros|demas) (note*|sepa*|ente*|vea*)", "no (presum*|aparent*|luci*|publica*|anunci*|mostrar*)", "sin (presum*|aparent*|luci*|publica*|anunci*|mostrar*|contar*|decir*)"],
                  negativa: true,
                },
              ],
              modelo: "Jesús lo enseñó como algo que sus discípulos harían. Se hace en lo secreto, delante del Padre, y no para que otros lo noten. No es una dieta ni una manera de presionar a Dios.",
            },
          },
        ],
      },
    ],
  },
};
