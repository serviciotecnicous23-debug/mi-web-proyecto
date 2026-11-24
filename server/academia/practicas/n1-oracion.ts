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
              { frente: "¿Con qué nombre enseñó Jesús a sus discípulos a llamar a Dios?", reverso: "Padre.", apoyo: "Jesús enseñó a sus discípulos a llamarlo Padre." },
              { frente: "Gracias a Cristo, ¿el creyente se acerca a Dios con miedo o con confianza?", reverso: "Con confianza y no con miedo.", apoyo: "Gracias a Cristo, el creyente puede acercarse a Dios con confianza y no con miedo" },
              { frente: "¿Qué hacían los hipócritas cuando oraban?", reverso: "Oraban en las esquinas para que otros los vieran y así ganar fama.", apoyo: "los hipócritas oraban en las esquinas para ganar fama" },
              { frente: "¿Hacen falta palabras especiales para empezar a orar?", reverso: "No. Lo que necesitas es un corazón sincero.", apoyo: "No necesitas palabras especiales para empezar: necesitas un corazón sincero." },
            ],
          },
          {
            tarjetas: [
              { frente: "Si Dios ya sabe lo que necesitamos, ¿para qué orar?", reverso: "Porque Él quiere que vengamos a Él. Orar nos enseña a depender de Él.", apoyo: "Dios no necesita que le informemos, pero quiere que vengamos a Él." },
              { frente: "Según Filipenses 4:6-7, ¿qué guardará la paz de Dios?", reverso: "Nuestro corazón y nuestros pensamientos.", apoyo: "la paz de Dios guardará nuestro corazón y nuestros pensamientos" },
              { frente: "¿Qué pensaban los gentiles cuando oraban?", reverso: "Que Dios los oía por hablar mucho o por repetir lo mismo.", apoyo: "El segundo es pensar que Dios nos oye por hablar mucho o repetir lo mismo, como hacían los gentiles." },
              { frente: "¿Orar en el nombre de Jesús es una fórmula para el final de la oración?", reverso: "No. Es acercarnos a Dios por lo que Jesús hizo y pedir lo que está de acuerdo con su voluntad.", apoyo: "Orar en su nombre no es una fórmula para el final, sino acercarnos por lo que Él hizo y pedir lo que está de acuerdo con su voluntad." },
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
            consigna: "Completa las frases sobre qué es orar.",
            texto: "Orar es conversar con Dios. Jesús enseñó a sus discípulos a llamarlo [[Padre]]. Gracias a Cristo, el creyente puede acercarse a Dios con [[confianza]] y no con miedo. La oración es la vida de una [[relación]].",
            distractores: ["Jefe", "vergüenza", "obligación"],
            errores: {
              Jefe: "Jesús enseñó a sus discípulos a llamar a Dios Padre: le hablamos como hijos.",
              vergüenza: "Gracias a Cristo, el creyente se acerca a Dios con confianza y no con miedo.",
              obligación: "La oración no es un rito para ganar puntos, sino la vida de una relación.",
            },
            apoyo: "Gracias a Cristo, el creyente puede acercarse a Dios con confianza y no con miedo",
            ref: "Hebreos 4:16",
            explica: "Orar es hablar con Dios como un hijo con su Padre: es una relación, no un rito. Gracias a Cristo, nos acercamos a Él con confianza.",
          },
          {
            consigna: "Completa la frase que resume qué es orar.",
            texto: "Orar es hablar con Dios como un [[hijo]] con su Padre: con [[sinceridad]], en lo [[secreto]] y con confianza, presentándole todo con acción de gracias.",
            distractores: ["extraño", "miedo", "público"],
            errores: {
              extraño: "Jesús enseñó a llamar a Dios Padre: le hablamos como hijos, no como extraños.",
              miedo: "Gracias a Cristo nos acercamos a Dios con confianza y no con miedo.",
              público: "Jesús corrigió orar para que otros nos vean: se ora en lo secreto.",
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
            consigna: "¿Es un error que Jesús corrigió o es lo que Él enseñó? Lleva cada frase a su recuadro.",
            grupos: ["Un error que Jesús corrigió", "Así enseñó Jesús a orar"],
            frases: [
              { texto: "Orar en público para que otros te admiren", grupo: 0, explica: "Es orar para que otros nos vean, como los hipócritas." },
              { texto: "Creer que Dios te oye más si repites lo mismo", grupo: 0, explica: "Así pensaban los gentiles: que Dios oye por repetir lo mismo." },
              { texto: "Usar muchas palabras para que Dios te escuche", grupo: 0, explica: "Pensar que Dios oye por hablar mucho es el error de los gentiles." },
              { texto: "Orar en lo secreto, a solas con el Padre", grupo: 1 },
              { texto: "Hablarle a Dios con un corazón sincero", grupo: 1 },
              { texto: "Confiar en que el Padre ya sabe lo que necesitas", grupo: 1 },
            ],
            apoyo: "Jesús enseña lo contrario: orar en lo secreto, con sinceridad, y confiar en que el Padre ya sabe lo que necesitamos antes de pedírselo.",
            ref: "Mateo 6:5-8",
            explica: "Jesús corrigió orar para ser vistos y pensar que Dios oye por hablar mucho. Enseñó a orar en lo secreto, con sinceridad y confiando en el Padre.",
          },
          {
            consigna: "Jesús corrigió dos errores. ¿Cuál es cada ejemplo? Lleva cada frase a su recuadro.",
            grupos: ["Orar para que otros te vean", "Creer que Dios oye por hablar mucho"],
            frases: [
              { texto: "Orar en las esquinas para que la gente te vea", grupo: 0, explica: "Así oraban los hipócritas, para ganar fama." },
              { texto: "Orar delante de todos para ganar fama", grupo: 0 },
              { texto: "Orar en público solo para que te admiren", grupo: 0 },
              { texto: "Repetir la misma frase muchas veces para que Dios te oiga", grupo: 1, explica: "Así pensaban los gentiles: que Dios oye por repetir lo mismo." },
              { texto: "Alargar la oración porque crees que así Dios te oye más", grupo: 1 },
              { texto: "Pensar que con más palabras Dios te escucha mejor", grupo: 1 },
            ],
            apoyo: "El primero es orar para que otros nos vean: los hipócritas oraban en las esquinas para ganar fama.",
            ref: "Mateo 6:5, 7",
            explica: "Los hipócritas oraban para que otros los vieran y para ganar fama. Los gentiles pensaban que Dios los oía por hablar mucho o repetir lo mismo.",
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
            consigna: "Une cada oración con la forma de orar que usa.",
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
              { texto: "Tienes razón: si Dios ya sabe todo lo que necesitas, orar no hace falta.", explica: "Dios no necesita que le informemos, pero quiere que vengamos a Él. Orar sí hace falta: nos acerca a su voluntad." },
              { texto: "Dios ya lo sabe, pero quiere que vengamos a Él. Orar nos enseña a depender de Él.", bien: true, explica: "Así lo explica la lección: no oramos para informar a Dios, sino para acercarnos a Él y depender de Él." },
              { texto: "Oramos para contarle a Dios lo que pasa, porque Él no lo sabe todo.", explica: "El Padre ya sabe lo que necesitamos antes de pedírselo: no oramos para informarle." },
              { texto: "Oramos para ganar puntos con Dios, y así Él nos premia con lo que pedimos.", explica: "La oración no es un rito para ganar puntos, sino la vida de una relación." },
            ],
            apoyo: "Dios no necesita que le informemos, pero quiere que vengamos a Él.",
            ref: "Santiago 4:2; Mateo 6:8",
            explica: "Orar no es informar a Dios: es acercarnos a Él, aprender a depender de Él y pedirle que obre.",
          },
          {
            caso: "Tu hermana tiene mañana una entrevista de trabajo. Está tan ansiosa que no puede dormir.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que le presente todo a Dios en oración, dando gracias: su paz guardará su corazón.", bien: true, explica: "Es la invitación de Filipenses 4:6-7: no vivir ahogados por la ansiedad, sino presentar todo a Dios." },
              { texto: "Que ore mucho esta noche, porque así seguro que mañana le dan ese trabajo.", explica: "La oración no siempre cambia de inmediato la situación, pero siempre nos cambia a nosotros y nos llena de su paz." },
              { texto: "Que primero se calme sola, y cuando ya esté tranquila, que hable con Dios.", explica: "No hace falta estar en calma para orar: Pablo invita a presentarle todo a Dios, también lo que nos angustia." },
              { texto: "Que repita la misma oración muchas veces, hasta que se le pase la ansiedad.", explica: "Jesús corrigió pensar que Dios oye por repetir lo mismo. Lo que cuenta es presentarle todo con sinceridad." },
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
              { frente: "¿En qué orden va la oración que Jesús enseñó?", reverso: "Primero Dios y su reino, y después nuestras necesidades.", apoyo: "La oración tiene un orden: primero Dios y su reino, y después nuestras necesidades." },
              { frente: "Padre nuestro que estás en los cielos: ¿a quién nos acercamos?", reverso: "A un Padre que nos ama y que es grande.", apoyo: "nos acercamos a un Padre que nos ama y que es grande" },
              { frente: "Santificado sea tu nombre: ¿qué pedimos?", reverso: "Que Dios sea honrado como santo, empezando por nuestra propia vida.", apoyo: "pedimos que Dios sea honrado como santo, empezando por nuestra propia vida" },
              { frente: "¿Cómo termina el Padre Nuestro?", reverso: "Reconociendo que el reino, el poder y la gloria son de Dios para siempre.", apoyo: "La oración termina reconociendo que el reino, el poder y la gloria son de Dios para siempre." },
            ],
          },
          {
            tarjetas: [
              { frente: "Venga tu reino: ¿qué anhelamos?", reverso: "Que Dios reine en los corazones y en el mundo, y que Cristo vuelva.", apoyo: "anhelamos que Dios reine en los corazones y en el mundo, y que Cristo vuelva" },
              { frente: "Hágase tu voluntad: ¿qué hacemos con nuestros planes?", reverso: "Los rendimos a lo que Dios quiere, como lo hizo Jesús en Getsemaní.", apoyo: "rendimos nuestros planes a lo que Dios quiere, como lo hizo Jesús en Getsemaní" },
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
            consigna: "¿Es verdad o es un error? Piensa en lo que enseña la lección sobre el Padre Nuestro.",
            afirmaciones: [
              { texto: "El Padre Nuestro es una oración modelo: un mapa de cómo orar.", verdad: true, explica: "Jesús no la dio para repetirla sin pensar, sino para enseñarnos cómo orar.", apoyo: "Él les dio una oración modelo que no es para repetir sin pensar, sino un mapa de cómo orar.", ref: "Lucas 11:1; Mateo 6:9" },
              { texto: "El Padre Nuestro solo sirve si se repite con las palabras exactas.", verdad: false, explica: "Jesús enseñó a orar de esta manera, no solo con estas palabras: es un modelo, no una fórmula.", apoyo: "no solo con estas palabras, sino de esta manera", ref: "Mateo 6:9" },
              { texto: "En el Padre Nuestro, primero van nuestras necesidades y después Dios.", verdad: false, explica: "Es al revés: primero Dios y su reino, y después nuestras necesidades.", apoyo: "La oración tiene un orden: primero Dios y su reino, y después nuestras necesidades." },
            ],
          },
          {
            consigna: "¿Es verdad o es un error? Piensa en lo que enseña la lección sobre el Padre Nuestro.",
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
            consigna: "Une cada parte o palabra del Padre Nuestro con lo que significa.",
            pares: [
              ["La palabra nuestro", "Oramos como familia"],
              ["El pan de cada día", "Confiamos en Dios para lo que necesitamos hoy"],
              ["Perdónanos como perdonamos", "Pedimos perdón y nos comprometemos a perdonar a otros"],
              ["No nos metas en tentación, mas líbranos del mal", "Pedimos fuerzas para no caer y protección contra el maligno"],
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
            consigna: "Ordena lo que puedes orar con tus palabras, en el orden del Padre Nuestro.",
            pasos: ["Adorar al Padre", "Pedir por su reino en tu familia y tu ciudad", "Entregarle tus planes", "Pedir lo que necesitas hoy", "Perdonar a alguien", "Pedir fuerzas contra la tentación"],
            apoyo: "Puedes orar cada parte con tus palabras",
            ref: "Mateo 6:9-13",
            explica: "La guía sigue el orden del Padre Nuestro: primero Dios, su reino y su voluntad; después el pan, el perdón y la protección.",
          },
          {
            consigna: "Ana usa el Padre Nuestro como guía para orar antes de ir al trabajo. Ordena su oración en el orden del Padre Nuestro.",
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
              { texto: "Lo repito rápido tres veces, sin pensar en lo que digo, y salgo.", explica: "No es para repetir sin pensar: es un mapa de cómo orar." },
              { texto: "Lo uso como guía: oro cada parte con mis palabras, poniendo a Dios primero.", bien: true, explica: "Así se usa como guía: cada parte se ora con tus palabras, con Dios primero." },
              { texto: "Le pido primero todo lo que necesito y, si me queda tiempo, lo adoro.", explica: "El modelo pone a Dios primero: su nombre, su reino y su voluntad; después nuestras necesidades." },
              { texto: "Solo le pido el pan de cada día, porque es lo que más necesito hoy.", explica: "Pedir el pan es parte del modelo, pero primero buscamos a Dios, su nombre, su reino y su voluntad." },
            ],
            apoyo: "Orar con el modelo de Jesús ordena el corazón: pone a Dios primero.",
            ref: "Mateo 6:9-13",
            explica: "El Padre Nuestro es un mapa: te ayuda a orar con tus palabras y con Dios en el primer lugar.",
          },
          {
            caso: "Un compañero de trabajo se burló de ti delante de todos. Esa noche oras con el Padre Nuestro y llegas a la parte del perdón.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Me salto esa parte por hoy, hasta que se me pase el enojo con él.", explica: "Esa parte nos enseña a pedir perdón y a comprometernos a perdonar a otros." },
              { texto: "Pido perdón por mis pecados y decido perdonar a mi compañero.", bien: true, explica: "Perdónanos como perdonamos: pedimos perdón y nos comprometemos a perdonar a otros." },
              { texto: "Pido perdón por mis pecados, pero a mi compañero no lo perdono.", explica: "Jesús une las dos cosas: el perdón que pedimos y el perdón que damos." },
              { texto: "Le pido a Dios que castigue a mi compañero por lo que me hizo.", explica: "En esa parte no pedimos castigo para otros: nos comprometemos a perdonarlos." },
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
              { frente: "¿Cómo era el juez de la historia?", reverso: "Injusto. Pero la viuda insistió hasta que le hizo justicia.", apoyo: "El juez de la historia era injusto, pero la viuda insistió hasta que le hizo justicia." },
              { frente: "¿Dice Jesús que Dios es como ese juez?", reverso: "No: dice todo lo contrario. Dios es justo y nos ama.", apoyo: "Jesús no dice que Dios sea como ese juez; dice todo lo contrario" },
              { frente: "¿A quiénes responderá Dios?", reverso: "A sus escogidos que claman a Él día y noche.", apoyo: "responderá a sus escogidos que claman a Él día y noche" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es orar con fe?", reverso: "Creer que Dios oye, que puede y que responderá de la mejor manera.", apoyo: "Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera." },
              { frente: "Cuando Pablo pidió que le quitaran el aguijón, ¿qué le respondió Dios?", reverso: "Que su gracia le bastaba.", apoyo: "Dios le respondió que su gracia le bastaba" },
              { frente: "¿Por quiénes nos toca orar?", reverso: "Por la familia, la iglesia, las autoridades y los que no conocen a Cristo.", apoyo: "Orar por otros —tu familia, tu iglesia, tus autoridades y los que no conocen a Cristo— es parte del llamado de todo creyente" },
              { frente: "¿Qué enseña Santiago sobre la oración del justo?", reverso: "Que la oración eficaz del justo puede mucho.", apoyo: "Santiago enseña que la oración eficaz del justo puede mucho" },
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
            consigna: "Una de estas frases tiene un error sobre la parábola de la viuda y el juez. Tócala.",
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
            consigna: "Una de estas frases tiene un error sobre la parábola de la viuda y el juez. Tócala.",
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
            consigna: "Completa las frases sobre orar con fe.",
            texto: "Orar con fe es creer que Dios [[oye]], que [[puede]] y que responderá de la mejor manera. La fe se apoya en su [[voluntad]]: si pedimos conforme a ella, Él nos oye.",
            distractores: ["olvida", "duda", "suerte"],
            errores: {
              olvida: "Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera.",
              duda: "Orar con fe es creer que Dios puede: la fe es confianza en Él.",
              suerte: "La fe se apoya en la voluntad de Dios: si pedimos conforme a ella, Él nos oye.",
            },
            apoyo: "Orar con fe es creer que Dios oye, que puede y que responderá de la mejor manera.",
            ref: "Marcos 11:22-24; 1 Juan 5:14-15",
            explica: "Tener fe es confiar en Dios: Él oye, puede y responde de la mejor manera, conforme a su voluntad.",
          },
          {
            consigna: "Completa las frases sobre la fe y la voluntad de Dios.",
            texto: "La fe es [[confianza]] en Dios, no una fuerza para obligarlo. Jesús dice que tengamos fe en [[Dios]]. Si pedimos [[conforme]] a su voluntad, Él nos oye.",
            distractores: ["presión", "nosotros", "contrario"],
            errores: {
              presión: "La fe no es una fuerza para presionar u obligar a Dios: es confianza en Él.",
              nosotros: "Jesús dice que tengamos fe en Dios: la fe es confianza en Él.",
              contrario: "Dios nos oye cuando pedimos conforme a su voluntad.",
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
            consigna: "¿Es verdad o es un error? Piensa en cómo responde Dios cuando oramos.",
            afirmaciones: [
              { texto: "Dios responde de distintas maneras: a veces dice que sí, a veces nos hace esperar y a veces dice que no.", verdad: true, explica: "Y cuando dice que no, es porque tiene algo mejor.", apoyo: "Dios responde de distintas maneras: a veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor." },
              { texto: "Dios solo nos oye cuando nos da lo que pedimos.", verdad: false, explica: "Dios oye y responde según su voluntad y en su tiempo: a veces dice que sí, a veces nos hace esperar y a veces dice que no.", apoyo: "con fe en un Dios justo que oye y responde según su voluntad y en su tiempo" },
              { texto: "Perseverar en la oración es insistir hasta que Dios cambie de opinión.", verdad: false, explica: "Perseverar no es insistir para cambiar a Dios: es seguir confiando mientras Él obra.", apoyo: "Perseverar no es insistir para cambiar a Dios; es seguir confiando mientras Él obra." },
            ],
          },
          {
            consigna: "¿Es verdad o es un error? Piensa en cómo responde Dios y en orar por otros.",
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
              { texto: "Tienes razón: si Dios no ha respondido en meses, dejo de orar por mi tía.", explica: "Jesús enseñó a orar siempre y no desmayar. Aunque la respuesta tarde, Dios oye." },
              { texto: "Sigo orando por mi tía: Dios responde según su voluntad y en su tiempo.", bien: true, explica: "Dios a veces dice que sí, a veces nos hace esperar y a veces dice que no, porque tiene algo mejor." },
              { texto: "Oro con más fuerza y por más horas, para obligar a Dios a sanar a mi tía.", explica: "La fe no es una fuerza para obligar a Dios: es confianza en Él." },
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
              { texto: "Dejo de orar por mi hermano hasta que él cambie y deje de burlarse.", explica: "Orar por los que no conocen a Cristo es parte del llamado de todo creyente: no esperamos a que cambien para orar." },
              { texto: "Sigo orando por mi hermano cada día: la oración eficaz del justo puede mucho.", bien: true, explica: "Orar por otros, también por los que no conocen a Cristo, es parte del llamado de todo creyente." },
              { texto: "Oro solo por mí, porque cada quien debe orar por sí mismo.", explica: "Orar por otros, como tu familia y los que no conocen a Cristo, es parte del llamado de todo creyente." },
              { texto: "Le pido al pastor que ore por mi hermano, y yo ya no oro por él.", explica: "Orar por otros no es solo tarea del pastor: es parte del llamado de todo creyente." },
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
              { frente: "Si Jesús, el Hijo de Dios, buscaba tiempo a solas con su Padre, ¿qué nos enseña?", reverso: "Que nosotros necesitamos ese tiempo con Dios todavía más.", apoyo: "Si Jesús, el Hijo de Dios, buscaba tiempo a solas con su Padre" },
              { frente: "¿Qué recibimos en el tiempo diario con Dios?", reverso: "Fuerzas para el día.", apoyo: "El tiempo diario con Dios no es una carga: es el lugar donde recibimos fuerzas para el día." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es ayunar?", reverso: "Dejar de comer por un tiempo para dedicarse a buscar a Dios en oración.", apoyo: "Ayunar es dejar de comer por un tiempo para dedicarse a buscar a Dios en oración." },
              { frente: "¿De cuánto tiempo puede ser un ayuno?", reverso: "De una comida o de un día.", apoyo: "Un ayuno puede ser de una comida o de un día." },
              { frente: "Si tienes un problema de salud, ¿con quién consultas antes de ayunar?", reverso: "Con tu médico y con tu pastor.", apoyo: "Si tienes un problema de salud, consulta con tu médico y con tu pastor" },
              { frente: "Con un problema de salud, ¿qué otra cosa se puede apartar para Dios?", reverso: "Por ejemplo, el entretenimiento, para dedicar ese tiempo a Dios.", apoyo: "también se puede apartar otra cosa, como el entretenimiento, para dedicar ese tiempo a Dios" },
              { frente: "En la oración diaria, ¿cumplimos un deber?", reverso: "No: nos encontramos con nuestro Padre. Lo que buscamos es a una Persona.", apoyo: "En la oración diaria no cumplimos un deber: nos encontramos con nuestro Padre." },
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
            consigna: "Completa el ejemplo de Jesús y de Daniel en la oración diaria.",
            texto: "Después de un día lleno de gente y de milagros, Jesús se levantó muy de [[mañana]], cuando todavía estaba oscuro, y se fue a un lugar [[desierto]] a orar. Daniel oraba tres veces al [[día]].",
            distractores: ["tarde", "ruidoso", "año"],
            errores: {
              tarde: "Jesús se levantó muy de mañana, cuando todavía estaba oscuro.",
              ruidoso: "Jesús se fue a un lugar desierto, a solas con su Padre.",
              año: "Daniel oraba tres veces al día: buscaba a Dios cada día.",
            },
            apoyo: "Jesús se levantó muy de mañana, cuando todavía estaba oscuro, y se fue a un lugar desierto a orar",
            ref: "Marcos 1:35; Daniel 6:10",
            explica: "Jesús y Daniel buscaban a Dios cada día: Jesús, muy temprano y a solas; Daniel, tres veces al día.",
          },
          {
            consigna: "Completa por qué necesitamos un tiempo diario con Dios.",
            texto: "Si Jesús, el Hijo de Dios, buscaba tiempo a solas con su [[Padre]], cuánto más lo necesitamos nosotros. El tiempo diario con Dios es el lugar donde recibimos [[fuerzas]] para el día. La oración crece cuando se vuelve un [[hábito]] diario.",
            distractores: ["público", "carga", "castigo"],
            errores: {
              público: "Jesús buscaba tiempo a solas con su Padre, no delante de la gente.",
              carga: "El tiempo diario con Dios no es una carga: es el lugar donde recibimos fuerzas para el día.",
              castigo: "La oración crece cuando se vuelve un hábito diario: en ella nos encontramos con nuestro Padre.",
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
            consigna: "Ordena los pasos del plan sencillo para tu tiempo diario con Dios, del primero al último.",
            pasos: ["Escoge un momento y un lugar", "Empieza con la Palabra: lee un pasaje corto", "Ora con lo que leíste: da gracias, confiesa, pide y escucha", "Anota lo que Dios te habla y por quién oraste", "Vuelve al día siguiente: sé constante"],
            apoyo: "Empieza con la Palabra: lee un pasaje corto",
            ref: "Marcos 1:35",
            explica: "Primero apartas un momento y un lugar; luego lees la Palabra, oras con lo que leíste, anotas lo que Dios te habla y vuelves cada día.",
          },
          {
            consigna: "Carlos tiene su tiempo con Dios antes de ir al trabajo. Ordena lo que hace, del primero al último.",
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
              { texto: "Empiezo con diez minutos cada día, con un pasaje corto y oración.", bien: true, explica: "Diez minutos cada día valen más que una hora de vez en cuando." },
              { texto: "Espero a tener un día libre, y ese día oro una hora entera.", explica: "Sé constante: un tiempo corto cada día vale más que una hora de vez en cuando." },
              { texto: "Por ahora no aparto un tiempo: oro solo cuando tengo un problema grande.", explica: "La oración crece cuando se vuelve un hábito diario, no solo cuando hay problemas." },
              { texto: "El domingo leo muchos capítulos, y así cumplo por toda la semana.", explica: "El plan es diario: un pasaje corto y oración cada día. Y no se trata de cumplir un deber, sino de encontrarte con tu Padre." },
            ],
            apoyo: "Sé constante: diez minutos cada día valen más que una hora de vez en cuando.",
            ref: "Marcos 1:35; Daniel 6:10",
            explica: "Un hábito pequeño y diario transforma la vida: lo que cuenta es la constancia.",
          },
          {
            caso: "Vives con tu familia en una casa pequeña, y en la noche hay mucho ruido. Quieres empezar tu tiempo diario con Dios.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Espero a tener una casa más grande y tranquila para empezar.", explica: "No hace falta esperar: basta con escoger un momento y un lugar." },
              { texto: "Oro solo en la iglesia los domingos, donde no hay ruido.", explica: "El tiempo con Dios es diario: la oración crece cuando se vuelve un hábito diario." },
              { texto: "Me levanto antes que todos y busco un rincón tranquilo para leer y orar.", bien: true, explica: "El primer paso es escoger un momento y un lugar; muchos prefieren la mañana, antes de que empiecen las ocupaciones." },
              { texto: "Oro mientras reviso el teléfono en la noche, para aprovechar el tiempo.", explica: "Como Jesús, que se fue a un lugar desierto a orar, buscamos un momento y un lugar a solas con Dios." },
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
            consigna: "¿Es ayuno bíblico o no lo es? Lleva cada frase a su recuadro.",
            grupos: ["Es ayuno bíblico", "No es ayuno bíblico"],
            frases: [
              { texto: "Dejar de comer por un tiempo para buscar a Dios en oración", grupo: 0 },
              { texto: "Ayunar en lo secreto, delante del Padre", grupo: 0 },
              { texto: "Ayunar para buscar la dirección de Dios", grupo: 0 },
              { texto: "Una dieta para bajar de peso", grupo: 1, explica: "El ayuno no es una dieta." },
              { texto: "Una manera de presionar a Dios", grupo: 1, explica: "El ayuno no es una manera de presionar a Dios." },
              { texto: "Ayunar para que otros lo noten", grupo: 1, explica: "Jesús enseñó a ayunar en lo secreto." },
            ],
            apoyo: "No es una dieta ni una manera de presionar a Dios, y no se hace para que otros lo noten",
            ref: "Mateo 6:16-18",
            explica: "El ayuno bíblico es dejar de comer por un tiempo para buscar a Dios en oración, y se hace en lo secreto.",
          },
          {
            consigna: "¿Así se ayuna o así no se ayuna? Lleva cada frase a su recuadro.",
            grupos: ["Así se ayuna", "Así no se ayuna"],
            frases: [
              { texto: "Saltarte el almuerzo para orar por tu familia", grupo: 0, explica: "Un ayuno puede ser de una comida." },
              { texto: "Ayunar sin que los demás lo noten", grupo: 0, explica: "Se ayuna en lo secreto, delante del Padre." },
              { texto: "Con un problema de salud, consultar antes con tu médico y tu pastor", grupo: 0 },
              { texto: "Publicar en redes que estás ayunando", grupo: 1, explica: "El ayuno no se hace para que otros lo noten." },
              { texto: "Dejar de comer para presionar a Dios", grupo: 1, explica: "El ayuno no es una manera de presionar a Dios." },
              { texto: "Comer menos solo para verte mejor", grupo: 1, explica: "El ayuno no es una dieta." },
            ],
            apoyo: "se hace en lo secreto, delante del Padre",
            ref: "Mateo 6:16-18",
            explica: "Ayunar como enseñó Jesús es dejar la comida por un tiempo para buscar a Dios en lo secreto. No es una dieta, ni presión, ni para que otros lo vean.",
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
