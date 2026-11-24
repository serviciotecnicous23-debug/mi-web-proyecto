// Las prácticas de las lecciones de «Compartir mi fe» (Nivel 1). Guía: docs/academia-practicas.md; modelo: n1-salvacion.ts.
// Cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_COMPARTIR_FE: PracticasMateria = {
  materia: "n1-compartir-fe",
  mision: {
    titulo: "La noticia que no me guardo",
    intro: "Tienes una lista de personas que necesitan conocer a Jesús: alguien de tu familia, un amigo, un compañero de trabajo. Repasa las cuatro lecciones para estar listo: saber que Jesús te envía, contar tu testimonio, explicar el evangelio y acompañar a quien cree.",
    cierre: "Ya puedes explicar la gran comisión, contar tu testimonio en tres partes, presentar el evangelio en cuatro verdades sin presionar, y orar por alguien y acompañarlo.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La gran comisión es para mí
    "n1-compartir-fe-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué autoridad nos envía Jesús?", reverso: "Con toda potestad en el cielo y en la tierra.", apoyo: "Jesús tiene toda potestad en el cielo y en la tierra, y con esa autoridad nos envía" },
              { frente: "¿Qué nos manda hacer Jesús en Mateo 28?", reverso: "Hacer discípulos a todas las naciones, bautizándolos y enseñándoles a guardar todo lo que Él mandó.", apoyo: "haced discípulos a todas las naciones, bautizándolos y enseñándoles a guardar todo lo que Él mandó" },
              { frente: "¿Qué promesa nos dejó Jesús al enviarnos?", reverso: "Que está con nosotros todos los días, hasta el fin del mundo: no vamos solos.", apoyo: "promete estar con nosotros todos los días" },
              { frente: "¿La gran comisión es solo para pastores y misioneros?", reverso: "No: es para todo creyente.", apoyo: "La gran comisión no es solo para pastores y misioneros" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pasaje es el corazón de la misión de nuestro ministerio?", reverso: "Marcos 16:15-16: id por todo el mundo y predicad el evangelio a toda criatura.", apoyo: "id por todo el mundo y predicad el evangelio a toda criatura. Este pasaje es el corazón de la misión de nuestro ministerio" },
              { frente: "¿Qué es el evangelio?", reverso: "La buena noticia de que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día.", apoyo: "El evangelio es la buena noticia de que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día" },
              { frente: "Según Marcos 16:16, ¿quién será salvo?", reverso: "El que crea.", apoyo: "y de que el que crea será salvo" },
              { frente: "Al compartir la fe, ¿de quién depende el fruto?", reverso: "De Dios, que da el crecimiento; no de lo bien que hablemos.", apoyo: "No dependemos de lo bien que hablemos, sino de Dios, que es quien da el crecimiento" },
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
            consigna: "Completa lo que Jesús nos manda y nos promete en Mateo 28.",
            texto: "Con toda potestad en el cielo y en la tierra, Jesús nos envía: id, haced [[discípulos]] a todas las [[naciones]], bautizándolos y enseñándoles a guardar todo lo que Él mandó. Y promete estar con nosotros todos los [[días]].",
            distractores: ["templos", "reuniones", "domingos"],
            errores: {
              templos: "Jesús no nos manda construir templos: nos manda hacer discípulos.",
              reuniones: "El envío no se queda en las reuniones de la iglesia: Jesús nos manda a todas las naciones.",
              domingos: "Jesús no está con nosotros solo el día de la reunión: promete estar con nosotros todos los días.",
            },
            apoyo: "id, haced discípulos a todas las naciones, bautizándolos y enseñándoles a guardar todo lo que Él mandó",
            ref: "Mateo 28:18-20",
            explica: "La gran comisión es un mandato con una promesa: hacer discípulos en todas las naciones, sabiendo que Jesús está con nosotros todos los días.",
          },
          {
            consigna: "Completa lo que Jesús nos manda en Marcos 16:15 y qué es el evangelio.",
            texto: "En Marcos 16:15, Jesús nos manda: id por todo el [[mundo]] y predicad el [[evangelio]] a toda criatura. El evangelio es la buena noticia de que Cristo murió por nuestros pecados, fue sepultado y [[resucitó]] al tercer día.",
            distractores: ["templo", "reglamento", "descansó"],
            errores: {
              templo: "Jesús no nos manda a quedarnos en el templo: nos envía por todo el mundo.",
              reglamento: "Lo que predicamos es el evangelio: la buena noticia de lo que Cristo hizo por nosotros.",
              descansó: "La buena noticia es que Cristo resucitó al tercer día.",
            },
            apoyo: "id por todo el mundo y predicad el evangelio a toda criatura",
            ref: "Marcos 16:15-16; 1 Corintios 15:3-4",
            explica: "Jesús nos manda anunciar el evangelio en todas partes: Cristo murió por nuestros pecados, fue sepultado y resucitó, y el que crea será salvo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "¿A quién le toca compartir la fe? Decide si cada frase es verdad o error.",
            afirmaciones: [
              { texto: "La gran comisión es solo para pastores y misioneros.", verdad: false, explica: "Es para todo creyente: Jesús nos envía a todos a anunciar el evangelio y hacer discípulos.", apoyo: "La gran comisión no es solo para pastores y misioneros" },
              { texto: "Cuando la persecución esparció a la iglesia, los creyentes iban por todas partes anunciando el evangelio.", verdad: true, explica: "Así se ve que la gran comisión es para todo creyente: anunciaban el evangelio por donde iban.", apoyo: "los creyentes iban por todas partes anunciando el evangelio", ref: "Hechos 8:4" },
              { texto: "No necesitas saberlo todo para contar lo que Jesús hizo en ti.", verdad: true, explica: "Puedes contarlo como la mujer samaritana, que habló de Jesús el mismo día que lo conoció.", apoyo: "No necesitas saberlo todo para contar lo que Jesús hizo en ti", ref: "Juan 4:28-30, 39" },
            ],
          },
          {
            consigna: "¿A quién le toca compartir la fe? Decide si cada frase es verdad o error.",
            afirmaciones: [
              { texto: "La mujer samaritana habló de Jesús en su pueblo el mismo día que lo conoció.", verdad: true, explica: "No esperó a saberlo todo, y muchos creyeron por su palabra.", apoyo: "La mujer samaritana fue a su pueblo a hablar de Jesús el mismo día que lo conoció", ref: "Juan 4:28-30, 39" },
              { texto: "Compartir la fe le toca solo al pastor.", verdad: false, explica: "La gran comisión es para todo creyente, no solo para los pastores.", apoyo: "La gran comisión es para todo creyente" },
              { texto: "Solo deben compartir la fe los que hablan muy bien.", verdad: false, explica: "No dependemos de lo bien que hablemos, sino de Dios; y el Espíritu Santo nos da poder para ser testigos.", apoyo: "No dependemos de lo bien que hablemos, sino de Dios", ref: "Hechos 1:8" },
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
            caso: "En el trabajo, un compañero que también es creyente te dice: Yo no le hablo de Jesús a nadie; eso le toca al pastor.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: eso le toca al pastor; nosotros solo tenemos que ir a la iglesia.", explica: "La gran comisión no es solo para pastores y misioneros: Jesús nos envía a todos." },
              { texto: "Jesús nos envía a todos. Tú también puedes contar lo que Él hizo en tu vida.", bien: true, explica: "Le recuerda que la gran comisión es para todo creyente, y que puede empezar con lo que Jesús hizo en él." },
              { texto: "Primero estudia muchos años la Biblia; después podrás hablar de Jesús.", explica: "No necesitas saberlo todo para contar lo que Jesús hizo en ti." },
              { texto: "Es verdad: hablar de Jesús es solo para los que tienen facilidad de palabra.", explica: "No dependemos de lo bien que hablemos, sino de Dios, que es quien da el crecimiento." },
            ],
            apoyo: "La gran comisión no es solo para pastores y misioneros",
            ref: "Hechos 8:4",
            explica: "Compartir la fe es tarea de todo creyente: los primeros creyentes anunciaban el evangelio por todas partes.",
          },
          {
            caso: "Tu prima recibió a Jesús hace una semana. Está feliz, pero te dice: Todavía no sé casi nada de la Biblia; mejor no le cuento a nadie.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Haces bien: espera unos años, hasta que sepas responder todas las preguntas.", explica: "No necesitas saberlo todo para contar lo que Jesús hizo en ti." },
              { texto: "Puedes contar lo que Jesús hizo en ti, como la samaritana el día que lo conoció.", bien: true, explica: "La anima con un ejemplo de la Biblia: la samaritana habló de Jesús el mismo día, y muchos creyeron." },
              { texto: "Mejor déjale eso al pastor, que estudió y sabe explicar bien la Biblia.", explica: "La gran comisión es para todo creyente, no solo para los pastores." },
              { texto: "Espera a sentir que hablas muy bien; mientras tanto, mejor no digas nada.", explica: "No dependemos de lo bien que hablemos, sino de Dios, que es quien da el crecimiento." },
            ],
            apoyo: "No necesitas saberlo todo para contar lo que Jesús hizo en ti",
            ref: "Juan 4:28-30, 39",
            explica: "Desde el primer día, todo creyente puede contar lo que Jesús hizo en él.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada persona con la parte de tu campo misionero donde está.",
            pares: [
              ["Tu mamá y tus hermanos", "Tu familia"],
              ["Tu amigo de toda la vida", "Tus amigos y vecinos"],
              ["Tu compañero de clase", "Tu trabajo o tu escuela"],
              ["Tus contactos en las redes sociales", "Las redes y los medios"],
            ],
            apoyo: "Tu campo misionero empieza donde estás",
            explica: "Tu campo misionero empieza donde estás: tu familia, tus amigos y vecinos, tu trabajo o tu escuela, y tus redes.",
          },
          {
            consigna: "Une cada persona con la parte de tu campo misionero donde está.",
            pares: [
              ["Tu abuela, que vive contigo", "Tu familia"],
              ["El vecino que te saluda cada mañana", "Tus amigos y vecinos"],
              ["Tu compañera de turno en la fábrica", "Tu trabajo o tu escuela"],
              ["Quienes ven lo que publicas en internet", "Las redes y los medios"],
            ],
            apoyo: "Identificar su propio campo misionero: familia, amigos, trabajo y vecindario",
            explica: "Las personas que ves cada día son tu campo misionero: con ellas empiezas a compartir tu fe.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús nos envía con su autoridad a anunciar el evangelio y hacer discípulos, y promete estar con nosotros todos los días",
            ref: "Mateo 28:18-20",
            clave: {
              id: "pr-n1-compartir-fe-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué nos mandó Jesús en la gran comisión y qué promesa nos dejó?",
              ideas: [
                { id: "ir", peso: 35, texto: "Nos envía a ir y anunciar el evangelio a todas las naciones.", formas: ["id", "ir (a|por) (todo|todas|todos)", "vay*", "nos envi*", "anunci*", "predic*", "evangeli*", "todas las naciones", "todo el mundo"] },
                { id: "discipulos", peso: 35, texto: "Nos manda hacer discípulos, bautizándolos y enseñándoles.", formas: ["discipul*", "bautiz*", "ensen*"] },
                { id: "promesa", peso: 30, texto: "Promete estar con nosotros todos los días.", formas: ["con nosotros", "con vosotros", "conmigo", "todos los dias", "no (vamos|estamos) solos", "nos acompan*", "nunca nos deja"] },
              ],
              modelo: "Jesús nos manda ir a todas las naciones a anunciar el evangelio y hacer discípulos, bautizándolos y enseñándoles. Y promete estar con nosotros todos los días: no vamos solos.",
            },
          },
          {
            apoyo: "id por todo el mundo y predicad el evangelio a toda criatura",
            ref: "Marcos 16:15-16",
            clave: {
              id: "pr-n1-compartir-fe-1-a6-2",
              tipo: "corta",
              pregunta: "Según Marcos 16:15-16, ¿qué nos manda Jesús y cuál es la buena noticia que anunciamos?",
              ideas: [
                { id: "manda", peso: 40, texto: "Nos manda ir por todo el mundo y predicar el evangelio a toda criatura.", formas: ["todo el mundo", "toda criatura", "todas las personas", "predic*", "anunci*", "compart*", "ir por", "id por"] },
                { id: "noticia", peso: 30, texto: "El evangelio es que Cristo murió por nuestros pecados, fue sepultado y resucitó.", formas: ["murio", "muerte", "cruz", "resucit*", "sepult*", "por nuestros pecados"] },
                { id: "salvo", peso: 30, texto: "El que crea será salvo.", formas: ["el que crea", "el que cree", "quien cree", "quien crea", "los que creen", "sera salvo", "seran salvos", "salv*"] },
              ],
              modelo: "Jesús nos manda ir por todo el mundo y predicar el evangelio a toda criatura: la buena noticia de que Cristo murió por nuestros pecados y resucitó, y de que el que crea será salvo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Mi testimonio en 3 partes
    "n1-compartir-fe-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué nadie puede discutirte tu testimonio?", reverso: "Porque cuenta lo que Dios hizo en tu vida.", apoyo: "Nadie puede discutirte lo que Dios hizo en tu vida" },
              { frente: "¿Qué cosa sabía el ciego que Jesús sanó?", reverso: "Que había sido ciego y ahora veía.", apoyo: "dijo que una cosa sabía: que había sido ciego y ahora veía" },
              { frente: "¿Cuáles son las tres partes de un testimonio?", reverso: "Antes, el encuentro con Cristo y después.", apoyo: "Describir las tres partes de un testimonio: antes, el encuentro con Cristo y después" },
              { frente: "¿Cuánto debe durar tu testimonio?", reverso: "Unos tres minutos.", apoyo: "Que dure unos tres minutos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Ante quién contó Pablo su testimonio en Hechos 26?", reverso: "Delante del rey Agripa.", apoyo: "Delante del rey Agripa, Pablo contó su historia en tres partes" },
              { frente: "¿Qué puede ser tu historia con Jesús para otra persona?", reverso: "La puerta para que otro lo conozca.", apoyo: "Tu historia con Jesús puede ser la puerta para que otro lo conozca" },
              { frente: "¿Cómo nos pide Pedro que hablemos de nuestra esperanza?", reverso: "Con mansedumbre y reverencia, y estando siempre preparados.", apoyo: "estar siempre preparados para presentar defensa con mansedumbre y reverencia" },
              { frente: "¿De quién debes hablar más en tu testimonio?", reverso: "De Jesús, más que de ti.", apoyo: "Habla más de Jesús que de ti" },
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
            consigna: "¿Por qué tu testimonio tiene poder? Decide si cada frase es verdad o error.",
            afirmaciones: [
              { texto: "Nadie puede discutirte lo que Dios hizo en tu vida.", verdad: true, explica: "Tu testimonio es tu propia historia con Dios: por eso es tan poderoso.", apoyo: "Nadie puede discutirte lo que Dios hizo en tu vida" },
              { texto: "Para dar tu testimonio necesitas saber responder todas las preguntas.", verdad: false, explica: "El ciego que Jesús sanó no sabía responder todas las preguntas, pero contó lo que sabía: que había sido ciego y ahora veía.", apoyo: "El ciego que Jesús sanó no sabía responder todas las preguntas", ref: "Juan 9:25" },
              { texto: "Contar tu testimonio es solo para los que estudiaron mucho.", verdad: false, explica: "Pablo contó su historia en tres partes: es un modelo sencillo que cualquier creyente puede seguir.", apoyo: "Es un modelo sencillo que cualquier creyente puede seguir" },
            ],
          },
          {
            consigna: "¿Por qué tu testimonio tiene poder? Decide si cada frase es verdad o error.",
            afirmaciones: [
              { texto: "Tu historia con Jesús puede ser la puerta para que otro lo conozca.", verdad: true, explica: "Lo que Jesús hizo en ti puede abrirle a otro el camino para conocerlo.", apoyo: "Tu historia con Jesús puede ser la puerta para que otro lo conozca" },
              { texto: "Un testimonio vale poco, porque cualquiera puede discutirlo.", verdad: false, explica: "Es al revés: nadie puede discutirte lo que Dios hizo en tu vida.", apoyo: "Nadie puede discutirte lo que Dios hizo en tu vida" },
              { texto: "El ciego sanado no tenía todas las respuestas, pero contó lo que sabía: que había sido ciego y ahora veía.", verdad: true, explica: "No necesitó saberlo todo: su testimonio era claro.", apoyo: "dijo que una cosa sabía: que había sido ciego y ahora veía", ref: "Juan 9:25" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el testimonio de Pablo ante el rey Agripa: sus tres partes y la invitación del final.",
            pasos: [
              "Perseguía a los creyentes",
              "Camino a Damasco, una luz lo rodeó y oyó a Jesús: «Saulo, Saulo, ¿por qué me persigues?»",
              "Obedeció a Jesús y anunció a todos que se arrepintieran y se convirtieran a Dios",
              "Terminó deseando que todos los que lo oían llegaran a ser como él",
            ],
            apoyo: "Delante del rey Agripa, Pablo contó su historia en tres partes",
            ref: "Hechos 26:9-20, 29",
            explica: "Primero cuenta cómo era antes; luego, su encuentro con Jesús camino a Damasco; después, cómo obedeció; y termina con una invitación.",
          },
          {
            consigna: "Ordena el testimonio de Ana en sus tres partes y la invitación del final.",
            pasos: [
              "Antes vivía sola y sentía que algo me faltaba",
              "Una vecina me explicó el evangelio",
              "Me arrepentí y creí en Jesús",
              "Ahora tengo perdón, paz y esperanza",
              "Me encantaría que tú también lo conocieras",
            ],
            apoyo: "El testimonio personal cuenta, en tres partes, cómo era tu vida antes, cómo conociste a Cristo y qué cambió después",
            ref: "Hechos 26:29",
            explica: "Primero, cómo era su vida sin Cristo; luego, cómo oyó el evangelio y creyó; después, qué cambió; y al final, una invitación.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Esto ayuda a tu testimonio o le quita fuerza? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a tu testimonio", "Le quita fuerza a tu testimonio"],
            frases: [
              { texto: "Contarlo en unos tres minutos", grupo: 0 },
              { texto: "Hablar más de Jesús que de ti", grupo: 0 },
              { texto: "Usar palabras sencillas", grupo: 0 },
              { texto: "Terminar con una invitación a conocer a Jesús", grupo: 0, explica: "Como Pablo, que deseaba que todos los que lo oían llegaran a ser como él." },
              { texto: "Usar lenguaje de iglesia que otros no entienden", grupo: 1, explica: "Usa palabras sencillas, que todos entiendan." },
              { texto: "Contar detalles que hacen ver el pecado como algo atractivo", grupo: 1, explica: "El antes se cuenta sin esos detalles." },
              { texto: "Hablar casi todo el tiempo de ti mismo", grupo: 1, explica: "Habla más de Jesús que de ti." },
            ],
            apoyo: "Usa palabras sencillas, sin lenguaje de iglesia que otros no entiendan",
            ref: "Efesios 5:12; Hechos 26:29",
            explica: "Un buen testimonio es breve, sencillo y centrado en Cristo, y termina con una invitación.",
          },
          {
            consigna: "¿Esto se hace o se evita en tu testimonio? Lleva cada frase a su grupo.",
            grupos: ["Hazlo en tu testimonio", "Evítalo en tu testimonio"],
            frases: [
              { texto: "Contar qué buscabas o qué te faltaba sin Cristo", grupo: 0 },
              { texto: "Contar cómo oíste el evangelio y creíste en Jesús", grupo: 0 },
              { texto: "Contar el perdón, la paz y la esperanza que tienes ahora", grupo: 0 },
              { texto: "Invitar a la persona a conocer a Jesús", grupo: 0 },
              { texto: "Contar tu pasado de forma que el pecado parezca atractivo", grupo: 1, explica: "El antes se cuenta sin detalles que hagan ver el pecado como algo atractivo." },
              { texto: "Hablar durante media hora", grupo: 1, explica: "Que dure unos tres minutos." },
              { texto: "Usar palabras que solo entienden los de la iglesia", grupo: 1, explica: "Usa palabras sencillas, que todos entiendan." },
            ],
            apoyo: "Sin detalles que hagan ver el pecado como algo atractivo",
            ref: "Efesios 5:12",
            explica: "Tu testimonio cuenta lo que Jesús hizo en ti, en pocas palabras y sin hacer atractivo el pecado.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tienes un par de minutos en la fila del supermercado. Una señora te pregunta: ¿Por qué siempre te veo tan en paz?",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le cuentas cómo eras, cómo conociste a Jesús y qué cambió, y la invitas a conocerlo.", bien: true, explica: "Es un testimonio breve, en tres partes y centrado en Cristo, que termina con una invitación." },
              { texto: "Le dices que es una historia muy larga y que mejor se la cuentas otro día, con calma.", explica: "Preparar tu testimonio es prepararte para momentos como este: hay que estar siempre preparados." },
              { texto: "Le hablas de lo bueno que eres ahora y de todo lo que haces cada semana en la iglesia.", explica: "Habla más de Jesús que de ti: el centro del testimonio es lo que Él hizo." },
              { texto: "Le cuentas con todo detalle lo malo que hacías antes, cuando todavía no conocías a Jesús.", explica: "El antes se cuenta sin detalles que hagan ver el pecado como algo atractivo." },
            ],
            apoyo: "Preparar tu testimonio es prepararte para esos momentos",
            ref: "1 Pedro 3:15",
            explica: "Siempre debemos estar preparados para contar, con mansedumbre y en pocas palabras, lo que Jesús hizo en nosotros.",
          },
          {
            caso: "Tu amigo Carlos contará su testimonio en una visita al hospital. Te lo lee y te dice: Dura veinte minutos y casi todo habla de mi vida pasada.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que lo deje así: mientras más detalles cuente de su vida pasada, mejor.", explica: "El antes se cuenta sin detalles que hagan ver el pecado como algo atractivo." },
              { texto: "Que lo acorte a unos tres minutos y hable más de Jesús que de su pasado.", bien: true, explica: "Así queda un testimonio breve y centrado en Cristo: cómo lo conoció y qué cambió." },
              { texto: "Que mejor no cuente su historia y solo lea un versículo de la Biblia.", explica: "Su historia con Jesús puede ser la puerta para que otro lo conozca." },
              { texto: "Que use palabras difíciles de la iglesia para que suene más espiritual.", explica: "Usa palabras sencillas, sin lenguaje de iglesia que otros no entiendan." },
            ],
            apoyo: "Que dure unos tres minutos. Habla más de Jesús que de ti",
            ref: "1 Pedro 3:15",
            explica: "Un buen testimonio es breve, sencillo y habla más de Jesús que del pasado.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "cómo era tu vida antes, cómo conociste a Cristo y qué cambió después",
            ref: "Hechos 26:9-20",
            clave: {
              id: "pr-n1-compartir-fe-2-a6-1",
              tipo: "corta",
              pregunta: "¿Cuáles son las tres partes de un testimonio y qué se cuenta en cada una?",
              ideas: [
                { id: "antes", peso: 34, texto: "Antes: cómo era tu vida sin Cristo.", formas: ["antes", "sin cristo", "sin jesus", "vida pasada", "como era", "me faltaba", "buscaba"] },
                { id: "encuentro", peso: 33, texto: "El encuentro: cómo oíste el evangelio, te arrepentiste y creíste en Jesús.", formas: ["encuentro", "conoci*", "crei*", "arrepent*", "oi* el evangelio", "escuch* el evangelio"] },
                { id: "despues", peso: 33, texto: "Después: qué cambió en tu vida.", formas: ["despues", "ahora", "cambi*", "perdon", "paz", "esperanza"] },
              ],
              modelo: "Primero, el antes: cómo era mi vida sin Cristo. Luego, el encuentro: cómo oí el evangelio y creí en Jesús. Y el después: qué cambió, el perdón y la paz que tengo ahora.",
            },
          },
          {
            apoyo: "Delante del rey Agripa, Pablo contó su historia en tres partes",
            ref: "Hechos 26:9-20",
            clave: {
              id: "pr-n1-compartir-fe-2-a6-2",
              tipo: "corta",
              pregunta: "¿Cómo contó Pablo su testimonio delante del rey Agripa?",
              ideas: [
                { id: "antes", peso: 34, texto: "Antes: perseguía a los creyentes.", formas: ["persegu*", "antes", "contra el nombre", "contra jesus", "contra los creyentes", "contra la iglesia"] },
                { id: "encuentro", peso: 33, texto: "El encuentro: en el camino a Damasco, una luz lo rodeó y oyó a Jesús.", formas: ["damasco", "luz", "encuentro", "oyo a jesus", "jesus le hablo", "conocio a jesus", "se encontro con jesus"] },
                { id: "despues", peso: 33, texto: "Después: obedeció y anunció a todos que se arrepintieran y se convirtieran a Dios.", formas: ["despues", "anunci*", "predic*", "obedec*", "no fue rebelde", "arrepint*", "convirt*"] },
              ],
              modelo: "Pablo contó su historia en tres partes. Antes perseguía a los creyentes. Luego, en el camino a Damasco, una luz lo rodeó y oyó a Jesús. Después obedeció y anunció el evangelio a todos.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. El evangelio en 5 minutos
    "n1-compartir-fe-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En cuántas verdades se puede explicar el evangelio?", reverso: "En cuatro verdades.", apoyo: "El evangelio se puede explicar en cuatro verdades" },
              { frente: "¿Qué quiere darte Dios, porque te ama?", reverso: "Vida eterna (Juan 3:16).", apoyo: "Dios te ama y quiere darte vida eterna (Juan 3:16)" },
              { frente: "¿Qué hace el pecado con nosotros?", reverso: "Nos separa de Dios: todos pecaron, y la paga del pecado es muerte.", apoyo: "El pecado nos separa de Dios: todos pecaron, y la paga del pecado es muerte" },
              { frente: "¿Qué hizo Cristo por nosotros, siendo aún pecadores?", reverso: "Murió por nosotros, y resucitó.", apoyo: "Cristo murió por nosotros siendo aún pecadores, y resucitó" },
              { frente: "¿Cómo se recibe a Cristo?", reverso: "Por la fe: arrepentirse, creer en el corazón y confesar con la boca que Jesús es el Señor.", apoyo: "Hay que recibirlo por la fe: arrepentirse, creer en el corazón y confesar con la boca que Jesús es el Señor" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Romanos 1:16, ¿para qué es el evangelio poder de Dios?", reverso: "Para salvación a todo aquel que cree.", apoyo: "El evangelio es poder de Dios para salvación a todo aquel que cree" },
              { frente: "¿Cómo se llaman los versículos de Romanos que resumen el evangelio?", reverso: "El camino de Romanos.", apoyo: "Estos versículos, conocidos como el camino de Romanos, resumen el evangelio" },
              { frente: "¿Necesitas un discurso largo para compartir el evangelio?", reverso: "No: necesitas la Palabra y amor por la persona.", apoyo: "No necesitas un discurso largo: necesitas la Palabra y amor por la persona" },
              { frente: "Cuando compartes el evangelio, ¿quién convence a la persona?", reverso: "El Espíritu Santo.", apoyo: "es el Espíritu Santo quien convence" },
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
            consigna: "Ordena las cuatro verdades del evangelio, de la primera a la cuarta, como en la lección.",
            pasos: ["Dios te ama y quiere darte vida eterna", "El pecado nos separa de Dios", "Cristo murió por nosotros y resucitó", "Hay que recibirlo por la fe"],
            apoyo: "El evangelio se puede explicar en cuatro verdades: Dios te ama, el pecado nos separa de Él, Cristo murió y resucitó por nosotros, y hay que recibirlo por la fe",
            ref: "Juan 3:16; Romanos 3:23; 5:8; 10:9-10",
            explica: "Primero, el amor de Dios; luego, el pecado que nos separa de Él; después, lo que Cristo hizo; y al final, cómo se recibe: por la fe.",
          },
          {
            consigna: "Ordena las cuatro verdades del evangelio con sus versículos, de la primera a la cuarta.",
            pasos: [
              "Juan 3:16: Dios te ama y quiere darte vida eterna",
              "Romanos 3:23 y 6:23: todos pecaron, y la paga del pecado es muerte",
              "Romanos 5:8: Cristo murió por nosotros siendo aún pecadores",
              "Romanos 10:9-10: creer en el corazón y confesar con la boca que Jesús es el Señor",
            ],
            apoyo: "Explicar el evangelio en cuatro verdades, con sus versículos",
            ref: "Juan 3:16; Romanos 3:23; 6:23; 5:8; 10:9-10",
            explica: "Primero, el amor de Dios; luego, el pecado y su paga; después, lo que Cristo hizo; y al final, cómo se recibe: creyendo y confesando.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada verdad con su versículo.",
            pares: [
              ["Dios te ama y quiere darte vida eterna", "Juan 3:16"],
              ["Todos pecaron", "Romanos 3:23"],
              ["Cristo murió por nosotros siendo aún pecadores", "Romanos 5:8"],
              ["Creer en el corazón y confesar con la boca que Jesús es el Señor", "Romanos 10:9-10"],
            ],
            apoyo: "Dios te ama y quiere darte vida eterna (Juan 3:16)",
            ref: "Juan 3:16; Romanos 3:23; 5:8; 10:9-10",
            explica: "Cada verdad tiene su versículo: así la persona ve que el mensaje sale de la Biblia.",
          },
          {
            consigna: "Une cada verdad con el versículo que la enseña.",
            pares: [
              ["Dios quiere darte vida eterna", "Juan 3:16"],
              ["La paga del pecado es muerte", "Romanos 6:23"],
              ["Cristo resucitó", "1 Corintios 15:3-4"],
              ["Hay que arrepentirse", "Hechos 3:19"],
            ],
            apoyo: "Cristo murió por nosotros siendo aún pecadores, y resucitó (Romanos 5:8; 1 Corintios 15:3-4)",
            ref: "Romanos 6:23; 1 Corintios 15:3-4; Hechos 3:19",
            explica: "Cada una de las cuatro verdades se apoya en la Biblia: así explicas el evangelio con sus versículos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tienes el camino de Romanos en tu teléfono. En el almuerzo, un compañero te pregunta: ¿Qué significa ser salvo?",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le das un discurso largo con todo lo que sabes de la Biblia, sin dejarlo hablar.", explica: "No necesitas un discurso largo: necesitas la Palabra y amor por la persona." },
              { texto: "Leen juntos cada versículo, se lo explicas con sencillez y le preguntas si entiende.", bien: true, explica: "Así usas la Biblia para guiarlo y dejas que la Palabra haga su obra." },
              { texto: "Le das tu propia opinión sin abrir la Biblia, para no complicar la conversación.", explica: "Los versículos del camino de Romanos resumen el evangelio: deja que la Palabra haga su obra." },
              { texto: "Le lees todos los versículos seguidos, uno tras otro, sin explicarle ninguno.", explica: "Explica cada versículo con palabras sencillas y pregúntale si lo entiende." },
            ],
            apoyo: "Lee cada versículo con la persona, explícalo con palabras sencillas y pregúntale si lo entiende",
            ref: "Romanos 6:23; 5:8; 10:9-10",
            explica: "La Biblia guía la conversación: se lee con la persona, se explica con sencillez y se confía en que la Palabra no vuelve vacía.",
          },
          {
            caso: "Tu vecina quiere entender el evangelio y te dice: La Biblia me parece muy difícil.",
            pregunta: "¿Qué es lo mejor?",
            opciones: [
              { texto: "Le dices que no se preocupe por la Biblia y le cuentas solo lo que tú piensas.", explica: "Deja que la Palabra haga su obra: los versículos del camino de Romanos resumen el evangelio." },
              { texto: "Lees con ella el camino de Romanos y le explicas cada versículo con sencillez.", bien: true, explica: "Así la Biblia se vuelve clara para ella, y la Palabra no vuelve vacía." },
              { texto: "Le regalas una Biblia y le dices que la lea sola, desde el principio hasta el final.", explica: "Es mejor leer cada versículo con ella y explicárselo con palabras sencillas." },
              { texto: "Le explicas los versículos con palabras difíciles, para que vea cuánto sabes.", explica: "Explica con palabras sencillas: la que hace la obra es la Palabra." },
            ],
            apoyo: "Deja que la Palabra haga su obra: no vuelve vacía",
            ref: "Isaías 55:11",
            explica: "Usar la Biblia con sencillez ayuda a la persona a entender, y la Palabra de Dios hace su obra.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo guías a alguien a recibir a Jesús sin presionarlo.",
            texto: "Si la persona quiere recibir a Jesús, puedes guiarla en una oración sencilla. Lo que salva no son las palabras exactas, sino la [[fe]] sincera. Nunca presiones: la decisión es de la [[persona]], y es el [[Espíritu]] Santo quien convence.",
            distractores: ["fórmula", "familia", "pastor"],
            errores: {
              fórmula: "Lo que salva no son unas palabras exactas, sino la fe sincera, porque «con el corazón se cree para justicia».",
              familia: "La decisión es de la persona: nadie puede decidir por ella.",
              pastor: "No es el pastor ni eres tú quien convence: es el Espíritu Santo.",
            },
            apoyo: "Lo que salva no son las palabras exactas, sino la fe sincera",
            ref: "Romanos 10:10; Juan 16:8",
            explica: "Guiamos con una oración sencilla y sin presionar: lo que salva es la fe sincera, la decisión es de la persona y el Espíritu Santo convence.",
          },
          {
            consigna: "Completa qué haces si la persona todavía no quiere recibir a Jesús.",
            texto: "Si la persona no quiere todavía, [[respeta]] su decisión, sigue siendo su amigo y sigue [[orando]] por ella. Muchos necesitan oír el evangelio varias veces: uno planta, otro riega, pero el crecimiento lo da [[Dios]].",
            distractores: ["presiona", "discutiendo", "pastor"],
            errores: {
              presiona: "Nunca presiones: la decisión es de la persona, y es el Espíritu Santo quien convence.",
              discutiendo: "Lo que toca es seguir orando por ella, no discutir: el crecimiento lo da Dios.",
              pastor: "El crecimiento no lo da el pastor ni lo das tú: lo da Dios.",
            },
            apoyo: "Respeta su decisión, sigue siendo su amigo y sigue orando por esa persona",
            ref: "1 Corintios 3:6",
            explica: "No presionamos: respetamos su decisión, seguimos cerca y oramos, porque el crecimiento lo da Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Nunca presiones: la decisión es de la persona, y es el Espíritu Santo quien convence",
            ref: "Romanos 10:10; Juan 16:8",
            clave: {
              id: "pr-n1-compartir-fe-3-a6-1",
              tipo: "corta",
              pregunta: "Si alguien quiere recibir a Jesús, ¿cómo lo guías en una oración de fe sin presionarlo?",
              ideas: [
                { id: "oracion", peso: 40, texto: "Lo guías en una oración sencilla: reconocer su pecado, creer que Jesús murió y resucitó por él, pedirle perdón y entregarle su vida.", formas: ["oracion sencilla", "reconoc* pecad*", "pecador", "pecadora", "pedir* perdon", "pide perdon", "pida perdon", "entreg* su vida", "murio y resucito", "senor y salvador"] },
                { id: "fe", peso: 30, texto: "Lo que salva no son las palabras exactas, sino la fe sincera.", formas: ["fe sincera", "no (son|salvan|importan) las palabras", "salva la fe", "la fe salva", "de corazon", "con el corazon", "sinceridad"] },
                { id: "presion", peso: 30, texto: "Nunca lo presionas: la decisión es de la persona y el Espíritu Santo convence.", formas: ["nunca (presion*|oblig*|forz*)", "no (presion*|oblig*|forz*)", "sin (presion*|oblig*|forz*)", "decision es (suya|de)", "su decision", "espiritu santo", "convenc*"] },
              ],
              modelo: "Lo guío en una oración sencilla: reconocer su pecado, creer que Jesús murió y resucitó por él y entregarle su vida. No salvan las palabras exactas, sino la fe sincera. Nunca lo presiono: la decisión es suya.",
            },
          },
          {
            apoyo: "Uno planta, otro riega, pero el crecimiento lo da Dios",
            ref: "Juan 16:8; 1 Corintios 3:6",
            clave: {
              id: "pr-n1-compartir-fe-3-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué nunca debemos presionar a una persona para que reciba a Jesús?",
              ideas: [
                { id: "decision", peso: 40, texto: "La decisión es de la persona.", formas: ["decision es (suya|de)", "su decision", "la persona decide", "ella decide", "el decide", "decid*"] },
                { id: "espiritu", peso: 35, texto: "Es el Espíritu Santo quien convence.", formas: ["espiritu santo", "espiritu", "convenc*"] },
                { id: "dios", peso: 25, texto: "El crecimiento lo da Dios; muchos necesitan oír el evangelio varias veces.", formas: ["crecimiento", "lo da dios", "dios da", "dios hace", "varias veces", "planta", "riega"] },
              ],
              modelo: "Porque la decisión es de la persona, y es el Espíritu Santo quien convence. Muchos necesitan oír el evangelio varias veces: uno planta, otro riega, pero el crecimiento lo da Dios.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Orar por alguien y acompañarlo
    "n1-compartir-fe-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué haces antes de hablarle a alguien de Dios?", reverso: "Le hablas a Dios de esa persona.", apoyo: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona" },
              { frente: "¿Por qué Pablo exhorta a orar por todos los hombres?", reverso: "Porque Dios quiere que todos sean salvos y vengan al conocimiento de la verdad.", apoyo: "porque Dios quiere que todos sean salvos y vengan al conocimiento de la verdad" },
              { frente: "¿Qué hizo Andrés en cuanto conoció a Jesús?", reverso: "Buscó a su hermano Simón y lo trajo a Jesús.", apoyo: "Andrés conoció a Jesús, y lo primero que hizo fue buscar a su hermano Simón" },
              { frente: "¿Hacer discípulos termina con la oración de fe?", reverso: "No: hacer discípulos es acompañar.", apoyo: "Hacer discípulos no termina con una oración: es acompañar" },
            ],
          },
          {
            tarjetas: [
              { frente: "Cuando oras por alguien de tu lista, ¿qué le pides a Dios?", reverso: "Que le abra los ojos, que ponga su confianza en Él y que a ti te dé la oportunidad y las palabras.", apoyo: "que Dios les abra los ojos, que pongan su confianza en Él y que a ti te dé la oportunidad y las palabras" },
              { frente: "¿Andrés predicó a multitudes?", reverso: "No, pero trajo a Pedro, que después predicó el día de Pentecostés.", apoyo: "Andrés no predicó a multitudes, pero trajo a Pedro, que después predicó el día de Pentecostés" },
              { frente: "¿Cómo cuidaba Pablo a los nuevos creyentes?", reverso: "Con ternura, como la nodriza que cuida a sus propios hijos.", apoyo: "Pablo cuidaba con ternura a los nuevos creyentes, como la nodriza que cuida a sus propios hijos" },
              { frente: "¿Qué pasará con el que hoy es acompañado?", reverso: "Mañana acompañará a otro.", apoyo: "El que hoy es acompañado, mañana acompañará a otro" },
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
            consigna: "¿Por qué y cómo oramos por las personas? Decide si cada frase es verdad o error.",
            afirmaciones: [
              { texto: "Antes de hablarle a alguien de Jesús, primero le hablamos a Dios de esa persona.", verdad: true, explica: "La oración va primero: abre corazones y puertas.", apoyo: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona" },
              { texto: "Orar por alguien sirve de poco; lo que cuenta es hablarle.", verdad: false, explica: "La oración abre corazones y puertas: por eso oramos antes de hablar.", apoyo: "La oración abre corazones y puertas" },
              { texto: "Pablo exhorta a orar por todos, porque Dios quiere que todos sean salvos.", verdad: true, explica: "Dios quiere que todos sean salvos y vengan al conocimiento de la verdad.", apoyo: "Pablo exhorta a orar por todos los hombres, porque Dios quiere que todos sean salvos", ref: "1 Timoteo 2:1-4" },
            ],
          },
          {
            consigna: "¿Por qué y cómo oramos por las personas? Decide si cada frase es verdad o error.",
            afirmaciones: [
              { texto: "Basta con orar por el mundo en general; no hace falta orar por nombre.", verdad: false, explica: "La lección pide orar por nombre por las personas de tu lista.", apoyo: "Ora por nombre por las personas de tu lista" },
              { texto: "Puedes pedirle a Dios la oportunidad y las palabras para hablarle a alguien de Jesús.", verdad: true, explica: "Así pedía Pablo: que el Señor le abriera puerta para la palabra.", apoyo: "que a ti te dé la oportunidad y las palabras", ref: "Colosenses 4:3-4" },
              { texto: "Solo vale la pena orar por los que ya van a la iglesia.", verdad: false, explica: "Pablo exhorta a orar por todos, porque Dios quiere que todos sean salvos.", apoyo: "Pablo exhorta a orar por todos los hombres", ref: "1 Timoteo 2:1-4" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que hizo Andrés en Juan 1:40-42, de lo primero a lo último.",
            pasos: ["Andrés conoció a Jesús", "Buscó a su hermano Simón", "Le dijo: «Hemos hallado al Mesías»", "Trajo a su hermano a Jesús"],
            apoyo: "Andrés conoció a Jesús, y lo primero que hizo fue buscar a su hermano Simón",
            ref: "Juan 1:40-42",
            explica: "Andrés conoció a Jesús y lo primero que hizo fue buscar a su hermano, contarle que habían hallado al Mesías y llevarlo a Jesús.",
          },
          {
            consigna: "Ordena la historia de Andrés y su hermano Pedro, de lo primero a lo último.",
            pasos: ["Andrés conoce a Jesús", "Busca a su hermano", "Le cuenta que han hallado al Mesías", "Lleva a su hermano a Jesús", "Su hermano Pedro predica el día de Pentecostés"],
            apoyo: "Andrés no predicó a multitudes, pero trajo a Pedro, que después predicó el día de Pentecostés",
            ref: "Juan 1:40-42",
            explica: "Andrés no predicó a multitudes, pero trajo a su hermano. Nunca sabes lo que Dios hará con la persona que traes.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre acompañar a un nuevo creyente tiene un error. Tócala.",
            frases: [
              "Hacer discípulos es caminar con alguien.",
              "Durante la primera semana, llámalo o escríbele.",
              "Después de la oración de fe, ya no necesita que lo acompañes.",
              "Lean juntos el Evangelio de Juan y oren juntos.",
            ],
            malo: 2,
            correccion: "Hacer discípulos no termina con una oración: es acompañar.",
            apoyo: "Hacer discípulos no termina con una oración: es acompañar",
            ref: "Marcos 3:14",
            explica: "La oración de fe es el comienzo: después toca caminar con la persona, como Jesús, que estableció a los doce para que estuviesen con Él.",
          },
          {
            consigna: "Una de estas frases sobre acompañar a un nuevo creyente tiene un error. Tócala.",
            frases: [
              "Jesús estableció a los doce para que estuviesen con Él.",
              "Pablo cuidaba a los nuevos creyentes con dureza, para que aprendieran solos.",
              "Invítalo a la iglesia y siéntate con él.",
              "El que hoy es acompañado, mañana acompañará a otro.",
            ],
            malo: 1,
            correccion: "Pablo cuidaba con ternura a los nuevos creyentes, como la nodriza que cuida a sus propios hijos.",
            apoyo: "Pablo cuidaba con ternura a los nuevos creyentes, como la nodriza que cuida a sus propios hijos",
            ref: "1 Tesalonicenses 2:7-8",
            explica: "Acompañar es cuidar con ternura y estar cerca, hasta que el nuevo creyente pueda acompañar a otros.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Ramón, tu compañero de trabajo, recibió a Jesús el sábado. Hoy lunes te dice: Estoy feliz, pero no sé qué hacer ahora.",
            pregunta: "¿Qué es lo mejor para esta semana?",
            opciones: [
              { texto: "No hacer nada más: ya hizo la oración de fe, y ahora todo depende de él.", explica: "Hacer discípulos no termina con una oración: es acompañar." },
              { texto: "Escribirle durante la semana, invitarlo a la iglesia y sentarte con él.", bien: true, explica: "Son pasos concretos de la lección para acompañar a un nuevo creyente desde la primera semana." },
              { texto: "Darle una lista de reglas para que la cumpla él solo, sin tu ayuda.", explica: "Acompañar es caminar con él, como Pablo, que cuidaba con ternura a los nuevos creyentes." },
              { texto: "Esperar tranquilo a que él te busque cuando tenga alguna pregunta.", explica: "Búscalo tú: llámalo o escríbele durante la primera semana." },
            ],
            apoyo: "Llámalo o escríbele durante la primera semana",
            ref: "1 Tesalonicenses 2:7-8",
            explica: "Al nuevo creyente se le acompaña de cerca: se le busca, se le invita y se camina con él.",
          },
          {
            caso: "Tu vecina Rosa recibió a Jesús hace un mes y te dice: Ya voy a la iglesia, pero casi no leo la Biblia y no conozco a nadie.",
            pregunta: "¿Cómo la acompañas?",
            opciones: [
              { texto: "Le dices que lea sola toda la Biblia este mes y que te avise si tiene dudas.", explica: "Mejor lean juntos el Evangelio de Juan y oren juntos: acompañar es caminar con ella." },
              { texto: "Leen juntos el Evangelio de Juan, oran juntos y le presentas a otros hermanos.", bien: true, explica: "Así la acompañas en la Palabra, en la oración y en la iglesia, como enseña la lección." },
              { texto: "La dejas tranquila: si ya va a la iglesia los domingos, no necesita nada más.", explica: "Hacer discípulos es caminar con alguien: no basta con que asista." },
              { texto: "Esperas a que sepa más de la Biblia antes de presentarle a los hermanos.", explica: "Presentarle a tu pastor y a otros hermanos es parte de acompañarla." },
            ],
            apoyo: "Lean juntos el Evangelio de Juan y oren juntos",
            ref: "Marcos 3:14",
            explica: "Acompañar es caminar con la persona: leer y orar juntos, y presentarle a tu pastor y a otros hermanos.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona",
            ref: "1 Timoteo 2:1-4",
            clave: {
              id: "pr-n1-compartir-fe-4-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué oramos por una persona antes de hablarle de Jesús?",
              ideas: [
                { id: "salvos", peso: 35, texto: "Dios quiere que todos sean salvos y vengan al conocimiento de la verdad.", formas: ["dios quiere que todos", "todos sean salvos", "quiere que (todos|se|sea) salv*", "quiere salvar*", "conocimiento de la verdad"] },
                { id: "abre", peso: 35, texto: "La oración abre corazones y puertas.", formas: ["abre corazones", "abre (el|los|su|sus) corazon*", "abre puertas", "abre (la|las) puerta*", "corazones y puertas"] },
                { id: "pide", peso: 30, texto: "Pedimos que Dios le abra los ojos y nos dé la oportunidad y las palabras.", formas: ["abra los ojos", "abre los ojos", "oportunidad", "las palabras", "ponga su confianza", "confi*"] },
              ],
              modelo: "Porque Dios quiere que todos sean salvos, y la oración abre corazones y puertas. Pedimos que Dios le abra los ojos a la persona y que nos dé la oportunidad y las palabras.",
            },
          },
          {
            apoyo: "Ora por nombre por las personas de tu lista",
            ref: "Colosenses 4:3-4",
            clave: {
              id: "pr-n1-compartir-fe-4-a6-2",
              tipo: "corta",
              pregunta: "Tienes una lista de personas que no conocen a Jesús. ¿Por qué y cómo vas a orar por ellas antes de hablarles?",
              ideas: [
                { id: "porque", peso: 35, texto: "La oración abre corazones y puertas, y Dios quiere que todos sean salvos.", formas: ["abre corazones", "abre puertas", "corazones y puertas", "todos sean salvos", "dios quiere que todos", "quiere que (todos|se|sea) salv*"] },
                { id: "nombre", peso: 30, texto: "Oro por nombre por cada persona.", formas: ["por nombre", "su nombre", "sus nombres", "cada persona", "cada una", "cada uno", "por cada"] },
                { id: "pide", peso: 35, texto: "Pido que Dios le abra los ojos, que confíe en Él y que me dé la oportunidad y las palabras.", formas: ["abra los ojos", "abre los ojos", "oportunidad", "las palabras", "ponga su confianza", "confi*"] },
              ],
              modelo: "Porque la oración abre corazones y puertas. Oro por nombre por cada persona: que Dios le abra los ojos, que ponga su confianza en Él y que me dé la oportunidad y las palabras.",
            },
          },
        ],
      },
    ],
  },
};
