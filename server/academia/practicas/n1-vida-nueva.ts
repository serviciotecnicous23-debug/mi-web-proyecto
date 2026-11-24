// Las prácticas de las lecciones de «Una vida nueva: santidad y victoria» (Nivel 1). Siguen el modelo de n1-salvacion.ts:
// cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección.
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N1_VIDA_NUEVA: PracticasMateria = {
  materia: "n1-vida-nueva",
  mision: {
    titulo: "Vivir la vida nueva",
    intro: "Un amigo que acaba de creer en Cristo te pregunta cómo se vive la vida nueva: quién es ahora, cómo vencer la tentación, qué hacer si cae y cómo perdonar a quien lo hirió. Repasa las cuatro lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar quién eres en Cristo, cómo resistir la tentación, cómo levantarte cuando caes y por qué perdonas como Dios te perdonó.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La nueva identidad
    "n1-vida-nueva-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dice Pablo de quien está en Cristo?", reverso: "Que es una nueva criatura: las cosas viejas pasaron y todas son hechas nuevas.", apoyo: "si alguno está en Cristo, nueva criatura es: las cosas viejas pasaron y todas son hechas nuevas" },
              { frente: "Cuando creíste, ¿Dios solo perdonó tu pasado?", reverso: "No: también te dio una vida nueva.", apoyo: "Cuando creíste, Dios no solo perdonó tu pasado: te dio una vida nueva." },
              { frente: "¿Qué deseos nuevos pone el Espíritu Santo en tu corazón?", reverso: "Amar a Dios, obedecer su Palabra y vivir para Él.", apoyo: "pone en tu corazón nuevos deseos: amar a Dios, obedecer su Palabra y vivir para Él" },
              { frente: "¿Qué eres en Cristo, según la idea clave?", reverso: "Una nueva criatura: perdonado, hijo de Dios y templo del Espíritu.", apoyo: "perdonado, hijo de Dios y templo del Espíritu" },
              { frente: "¿Qué significa ser santo?", reverso: "Ser apartado para Dios.", apoyo: "Ser santo significa ser apartado para Dios." },
            ],
          },
          {
            tarjetas: [
              { frente: "Cuando una oruga se convierte en mariposa, ¿es una oruga mejorada?", reverso: "No: es una criatura nueva. Algo así hizo Dios contigo cuando creíste en Cristo.", apoyo: "no es una oruga mejorada: es una criatura nueva" },
              { frente: "Según Gálatas 2:20, ¿qué pasó con el viejo yo?", reverso: "Fue crucificado con Cristo; ahora vive Cristo en mí.", apoyo: "el viejo yo fue crucificado con Cristo" },
              { frente: "¿Cómo vive ahora el creyente?", reverso: "Por la fe en el Hijo de Dios, que lo amó y se entregó a sí mismo por él.", apoyo: "Ahora vivo por la fe en el Hijo de Dios, que me amó y se entregó a sí mismo por mí." },
              { frente: "¿Qué es más verdadero: lo que sientes o lo que Dios dice de ti?", reverso: "Lo que Dios dice de ti.", apoyo: "Lo que Dios dice de ti es más verdadero que lo que sientes." },
              { frente: "¿La santidad llega de un día para otro?", reverso: "No: es un crecimiento. Cada día el Espíritu te va transformando.", apoyo: "La santidad no es perfección de un día para otro, sino crecimiento" },
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
            texto: "Si alguno está en Cristo, nueva criatura es: las cosas viejas [[pasaron]] y todas son hechas [[nuevas]]. Cuando creíste, Dios no solo perdonó tu pasado: te dio una [[vida]] nueva.",
            distractores: ["siguen", "mejores", "regla"],
            errores: {
              siguen: "Es al revés: en Cristo las cosas viejas pasaron. Tu pasado no te define.",
              mejores: "No es una mejora: como la oruga que se hace mariposa, en Cristo eres una criatura nueva.",
              regla: "Dios no te dio una regla más: te dio una vida nueva, y el Espíritu Santo pone en tu corazón nuevos deseos.",
            },
            apoyo: "las cosas viejas pasaron y todas son hechas nuevas",
            ref: "2 Corintios 5:17",
            explica: "En Cristo no eres una versión mejorada de antes: Dios perdonó tu pasado y te dio una vida nueva.",
          },
          {
            texto: "Gálatas 2:20 resume la vida cristiana: el viejo yo fue [[crucificado]] con Cristo, y ahora vive [[Cristo]] en mí. Vivo por la [[fe]] en el Hijo de Dios, que me amó y se entregó por mí.",
            distractores: ["mejorado", "suerte", "costumbre"],
            errores: {
              mejorado: "El viejo yo no fue mejorado ni arreglado: fue crucificado con Cristo.",
              costumbre: "La vida cristiana no es una costumbre: vivo por la fe en el Hijo de Dios, que me amó.",
            },
            apoyo: "el viejo yo fue crucificado con Cristo",
            ref: "Gálatas 2:20",
            explica: "La vida nueva no es el viejo yo con mejores hábitos: Cristo vive en mí, y vivo por la fe en Él.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada verdad con lo que dice la Biblia.",
            pares: [
              ["Eres hijo de Dios", "A los que recibieron a Jesús, Dios les dio potestad de ser hechos sus hijos"],
              ["Estás perdonado", "Ninguna condenación hay para los que están en Cristo Jesús"],
              ["Eres amado", "Nada te podrá separar del amor de Dios que es en Cristo Jesús"],
              ["Eres hechura de Dios", "Creado en Cristo Jesús para buenas obras"],
            ],
            apoyo: "En Cristo eres una nueva criatura: perdonado, hijo de Dios y templo del Espíritu",
            ref: "Juan 1:12; Romanos 8:1; Romanos 8:38-39; Efesios 2:10",
            explica: "Estas verdades no dependen de cómo te sientes: son lo que Dios dice de quien está en Cristo.",
          },
          {
            consigna: "Une cada pensamiento con la verdad de Dios que le responde.",
            pares: [
              ["Tengo miedo de que algo me aparte del amor de Dios", "Eres amado: nada te podrá separar de su amor"],
              ["Me acusa la culpa por algo que ya le confesé a Dios", "Estás perdonado: no hay condenación para ti"],
              ["Siento que no soy parte de la familia de Dios", "Eres hijo de Dios"],
              ["Creo que mi vida no sirve para nada", "Eres hechura de Dios, creado para buenas obras"],
            ],
            apoyo: "Lo que Dios dice de ti es más verdadero que lo que sientes.",
            ref: "Romanos 8:1; Romanos 8:38-39; Juan 1:12; Efesios 2:10",
            explica: "Cuando un pensamiento te acusa o te desanima, respóndele con lo que Dios dice de ti en su Palabra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "En una reunión familiar, tu tía cuenta delante de todos algo malo que hiciste antes de conocer a Cristo. Esa noche vuelve la culpa, aunque ya se lo confesaste a Dios.",
            pregunta: "¿Qué haces con esa culpa?",
            opciones: [
              { texto: "Respondo a esa culpa con la Palabra: en Cristo soy una nueva criatura y no hay condenación para mí.", bien: true, explica: "Es lo que enseña la lección: ante la culpa por lo que ya confesaste, respondes con lo que Dios dice de ti." },
              { texto: "Le vuelvo a pedir perdón a Dios por lo mismo cada noche, por si acaso.", explica: "Lo que ya confesaste está perdonado: ninguna condenación hay para los que están en Cristo Jesús." },
              { texto: "Pienso que, si todavía siento culpa, es porque Dios no me ha perdonado.", explica: "Lo que Dios dice de ti es más verdadero que lo que sientes: en Cristo estás perdonado." },
              { texto: "Me alejo de mi familia para no volver a escuchar de mi pasado.", explica: "Alejarte no quita la culpa. Tu pasado no te define: Cristo te define." },
            ],
            apoyo: "Cuando lleguen pensamientos de culpa por lo que ya confesaste, responde con la Palabra",
            ref: "Romanos 8:1",
            explica: "La culpa por lo que ya confesaste no dice la verdad sobre ti. En Cristo estás perdonado: respóndele con la Palabra.",
          },
          {
            caso: "En el trabajo cometiste un error y tu jefe te regañó delante de otros. De camino a casa piensas: no sirvo para nada; ni Dios ha de quererme así.",
            pregunta: "¿Con qué verdad le respondes a ese pensamiento?",
            opciones: [
              { texto: "Soy amado: nada me podrá separar del amor de Dios que es en Cristo Jesús.", bien: true, explica: "Es lo que Dios dice de ti, y es más verdadero que lo que sientes después de un mal día." },
              { texto: "Dios me quiere solo cuando hago bien las cosas.", explica: "El amor de Dios no depende de un buen día: nada te podrá separar de ese amor." },
              { texto: "Primero tengo que sentirme bien para creer lo que Dios dice de mí.", explica: "Lo que Dios dice de ti es verdad aunque hoy no lo sientas." },
              { texto: "Un error así demuestra que nunca fui una nueva criatura.", explica: "Un error no cambia lo que Dios hizo: si estás en Cristo, eres nueva criatura y vas creciendo." },
            ],
            apoyo: "Eres amado: nada te podrá separar del amor de Dios que es en Cristo Jesús",
            ref: "Romanos 8:38-39",
            explica: "Un mal día no cambia lo que Dios dice de ti: eres hijo de Dios, estás perdonado y eres amado.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            afirmaciones: [
              { texto: "La santidad es ser perfecto de un día para otro.", verdad: false, explica: "La santidad no es perfección inmediata, sino crecimiento: cada día el Espíritu te va transformando.", apoyo: "La santidad no es perfección de un día para otro, sino crecimiento", ref: "Efesios 4:22-24" },
              { texto: "Ser santo significa ser apartado para Dios.", verdad: true, explica: "En Cristo ya fuiste apartado para Dios; ahora aprendes a vivir de acuerdo con lo que eres.", apoyo: "Ser santo significa ser apartado para Dios." },
              { texto: "Dios terminará la buena obra que comenzó en ti.", verdad: true, explica: "El que comenzó en ti la buena obra, la perfeccionará: crecer en santidad es obra de Dios en ti.", apoyo: "El que comenzó en ti la buena obra, la perfeccionará", ref: "Filipenses 1:6" },
            ],
          },
          {
            afirmaciones: [
              { texto: "Crecer en santidad depende solo de mi fuerza de voluntad.", verdad: false, explica: "La santidad se vive por el poder de Dios: es el Espíritu quien cada día te va transformando.", apoyo: "la santidad es vivir cada día de acuerdo con esa nueva identidad, por el poder de Dios" },
              { texto: "Crecer en santidad es despojarse del viejo hombre y vestirse del nuevo.", verdad: true, explica: "Así lo describe Efesios 4:22-24: dejar lo viejo y vestirse de lo nuevo, creado según Dios.", apoyo: "despojarse del viejo hombre y vestirse del nuevo", ref: "Efesios 4:22-24" },
              { texto: "Si todavía no soy perfecto, quiere decir que no fui apartado para Dios.", verdad: false, explica: "En Cristo ya fuiste apartado para Dios. La santidad es crecer cada día, no ser perfecto de un día para otro.", apoyo: "En Cristo ya fuiste apartado para Él" },
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
            apoyo: "Cuando creíste, Dios no solo perdonó tu pasado: te dio una vida nueva.",
            ref: "2 Corintios 5:17",
            clave: {
              id: "pr-n1-vida-nueva-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué significa ser una nueva criatura en Cristo?",
              ideas: [
                { id: "nuevo", peso: 40, texto: "Las cosas viejas pasaron y todo es hecho nuevo: no es una versión mejorada de antes.", formas: ["viej* pas*", "quedo atras", "antes paso", "ya paso", "hechas nuevas", "todo (es|son|fue|esta) nuev*", "todo nuev*", "no (es|soy|eres) (una|un) (version|oruga) mejorad*", "no (es|soy|eres) mejorad*", "oruga", "mariposa", "persona nueva", "nueva persona", "otra persona", "no soy (el|la) mism*"] },
                { id: "vida", peso: 30, texto: "Dios no solo perdonó el pasado: dio una vida nueva.", formas: ["vida nueva", "nueva vida", "no solo perdon*", "ademas de perdon*", "otra vida", "vida diferente", "vida distinta", "cambi* vida"] },
                { id: "espiritu", peso: 30, texto: "El Espíritu Santo vive en ti y pone nuevos deseos: amar a Dios, obedecer su Palabra y vivir para Él.", formas: ["espiritu santo", "el espiritu", "nuevos deseos", "deseos nuevos", "amar a dios", "obedecer (su|la) palabra", "vivir para (el|dios)", "cristo vive", "vive cristo"] },
              ],
              modelo: "Ser una nueva criatura es que las cosas viejas pasaron y todo es hecho nuevo. Dios no solo perdonó mi pasado: me dio una vida nueva, y el Espíritu Santo vive en mí.",
            },
          },
          {
            apoyo: "Ahora vivo por la fe en el Hijo de Dios, que me amó y se entregó a sí mismo por mí.",
            ref: "Gálatas 2:20",
            clave: {
              id: "pr-n1-vida-nueva-1-a6-2",
              tipo: "corta",
              pregunta: "Según Gálatas 2:20, ¿qué pasó con el viejo yo y quién vive ahora en el creyente?",
              ideas: [
                { id: "crucificado", peso: 35, texto: "El viejo yo fue crucificado con Cristo.", formas: ["crucific*", "murio con cristo", "muri* en la cruz", "clavad*", "ya no vivo yo"] },
                { id: "cristo", peso: 35, texto: "Ahora vive Cristo en mí.", formas: ["vive cristo", "cristo vive", "cristo (esta|habita|vive) en (mi|nosotros|el)", "cristo en mi"] },
                { id: "fe", peso: 30, texto: "Vivo por la fe en el Hijo de Dios, que me amó y se entregó por mí.", formas: ["por fe", "fe en (el|jesus|cristo)", "fe en el hijo", "me amo", "nos amo", "se entrego", "dio su vida"] },
              ],
              modelo: "El viejo yo fue crucificado con Cristo, y ya no vivo yo: ahora vive Cristo en mí. Vivo por la fe en el Hijo de Dios, que me amó y se entregó por mí.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. Vencer la tentación
    "n1-vida-nueva-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dios tienta a alguien?", reverso: "No: Dios no tienta a nadie.", apoyo: "Dios no tienta a nadie." },
              { frente: "¿Cómo nos atrae la tentación?", reverso: "A través de nuestros propios deseos.", apoyo: "La tentación nos atrae a través de nuestros propios deseos" },
              { frente: "¿Cuándo empieza el pecado?", reverso: "Cuando decimos sí a lo que Dios dice no.", apoyo: "El pecado empieza cuando decimos sí a lo que Dios dice no." },
              { frente: "¿Con qué respondió Jesús las tres veces que el diablo lo tentó?", reverso: "Con la Escritura: «Escrito está».", apoyo: "las tres veces Jesús respondió con la Escritura" },
              { frente: "¿Qué es la Palabra guardada en el corazón?", reverso: "La espada del Espíritu.", apoyo: "La Palabra guardada en el corazón es la espada del Espíritu" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Ser tentado es lo mismo que pecar?", reverso: "No: Jesús fue tentado en todo, pero sin pecado.", apoyo: "Ser tentado no es pecar" },
              { frente: "¿Qué da Dios junto con la tentación?", reverso: "La salida: siempre hay una salida.", apoyo: "junto con la tentación da la salida" },
              { frente: "¿Por qué Jesús puede socorrer a los que son tentados?", reverso: "Porque Él también fue tentado y venció: sabe lo que es pasar por la prueba.", apoyo: "Él sabe lo que es pasar por la prueba" },
              { frente: "¿Qué hizo José cuando fue tentado?", reverso: "Dejó su ropa y huyó.", apoyo: "como José, que dejó su ropa y huyó" },
              { frente: "¿Para qué sirve aprender versículos de memoria?", reverso: "Para armarse para la batalla: no es un ejercicio escolar.", apoyo: "aprender versículos de memoria no es un ejercicio escolar: es armarse para la batalla" },
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
            consigna: "¿Es tentación o ya es pecado? Lleva cada frase a su grupo.",
            grupos: ["Es tentación: todavía no es pecado", "Ya es pecado"],
            frases: [
              { texto: "Sentir la atracción de algo que Dios dice que no", grupo: 0 },
              { texto: "Que te llegue un mal pensamiento", grupo: 0, explica: "Que llegue es tentación. Jesús también fue tentado, pero sin pecado." },
              { texto: "Que alguien te ofrezca algo que no agrada a Dios", grupo: 0 },
              { texto: "Abrazar la tentación", grupo: 1, explica: "Si la abrazamos, la tentación da a luz el pecado." },
              { texto: "Decir sí a lo que Dios dice no", grupo: 1 },
              { texto: "Hacer lo que la tentación te propone", grupo: 1 },
            ],
            apoyo: "El pecado empieza cuando decimos sí a lo que Dios dice no.",
            ref: "Santiago 1:13-15; Hebreos 4:15",
            explica: "La tentación atrae, pero todavía no es pecado. El pecado nace cuando la abrazamos y decimos sí a lo que Dios dice no.",
          },
          {
            consigna: "¿Ser tentado o pecar? Lleva cada caso a su grupo.",
            grupos: ["Ser tentado", "Pecar"],
            frases: [
              { texto: "Jesús en el desierto, cuando el diablo lo tentó", grupo: 0, explica: "Jesús fue tentado en todo según nuestra semejanza, pero sin pecado." },
              { texto: "Sentir ganas de mentir para salir de un problema", grupo: 0 },
              { texto: "Ver en la pantalla algo que despierta un mal deseo", grupo: 0 },
              { texto: "Decir la mentira para salir del problema", grupo: 1 },
              { texto: "Quedarte mirando lo que sabes que te aleja de Dios", grupo: 1, explica: "Ahí ya abrazaste la tentación: dijiste sí a lo que Dios dice no." },
            ],
            apoyo: "Jesús fue tentado en todo según nuestra semejanza, pero sin pecado",
            ref: "Hebreos 4:15; Santiago 1:14-15",
            explica: "Si Jesús fue tentado sin pecar, ser tentado no es pecar. El pecado empieza cuando le decimos que sí a la tentación.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una frase sobre Jesús en el desierto tiene un error. ¿Cuál es?",
            frases: [
              "En el desierto, el diablo tentó a Jesús tres veces.",
              "Jesús venció discutiendo con el diablo con sus propias ideas.",
              "Las tres veces, Jesús respondió con la Escritura.",
              "Jesús fue tentado en todo, pero sin pecado.",
            ],
            malo: 1,
            correccion: "Jesús venció respondiendo con la Escritura: «Escrito está».",
            apoyo: "En el desierto, el diablo tentó a Jesús tres veces, y las tres veces Jesús respondió con la Escritura",
            ref: "Mateo 4:4, 7, 10",
            explica: "Jesús no usó argumentos propios: las tres veces respondió con la Palabra de Dios, la espada del Espíritu.",
          },
          {
            consigna: "Encuentra la frase que no dice la verdad.",
            frases: [
              "Jesús también fue tentado, y venció.",
              "Por eso puede socorrer a los que son tentados.",
              "Jesús nunca sintió la tentación de verdad, porque es Dios.",
              "En el desierto, Jesús respondió con la Escritura.",
            ],
            malo: 2,
            correccion: "Jesús fue tentado en todo según nuestra semejanza, pero sin pecado: sabe lo que es pasar por la prueba.",
            apoyo: "Él sabe lo que es pasar por la prueba",
            ref: "Hebreos 2:18; Hebreos 4:15",
            explica: "Jesús pasó de verdad por la prueba y venció con la Escritura. Por eso entiende al que es tentado y lo puede socorrer.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada arma con lo que enseña la Biblia.",
            pares: [
              ["La Palabra", "Guárdala en tu corazón para no pecar contra Dios"],
              ["La oración", "Velad y orad, para que no entréis en tentación"],
              ["Huir", "Huye de las pasiones juveniles y sigue la justicia"],
              ["Resistir", "Someteos a Dios; resistid al diablo, y huirá de vosotros"],
              ["Compañía", "Busca hermanos que te animen y oren contigo"],
            ],
            apoyo: "resistimos con la Escritura, la oración, la huida y la ayuda de los hermanos",
            ref: "Salmos 119:11; Mateo 26:41; 2 Timoteo 2:22; Santiago 4:7; Eclesiastés 4:9-10",
            explica: "Dios nos da armas concretas: la Palabra, la oración, huir, resistir y la ayuda de los hermanos.",
          },
          {
            consigna: "Une cada ejemplo con el arma que usa.",
            pares: [
              ["José dejó su ropa y salió corriendo", "Huir"],
              ["Jesús respondió al diablo con la Escritura", "La Palabra"],
              ["Llamar a un hermano para que ore contigo", "Compañía"],
              ["Velar y orar antes de que llegue la prueba", "La oración"],
              ["Someterte a Dios y decirle no al diablo", "Resistir"],
            ],
            apoyo: "otras veces es salir corriendo, como José, que dejó su ropa y huyó",
            ref: "Génesis 39:12; Mateo 4:4; Santiago 4:7",
            explica: "Cada arma tiene su momento: la Palabra para responder, la oración para velar, huir cuando hace falta y los hermanos para no luchar solo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Es tarde, estás solo con el celular y una aplicación te empieza a mostrar contenido que sabes que te aleja de Dios.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Apago la pantalla, oro y, si hace falta, le escribo a un hermano para que ore conmigo.", bien: true, explica: "Tomas la salida que Dios da: apagar la pantalla, orar y buscar ayuda." },
              { texto: "Sigo un rato más; total, todavía no he hecho nada malo.", explica: "Quedarte es empezar a abrazar la tentación. Es más fácil decir que no a tiempo que salir después." },
              { texto: "Me quedo ahí y trato de resistir solo con mi fuerza de voluntad.", explica: "No hace falta quedarte cerca de la tentación: Dios da la salida, y tienes la oración y a los hermanos." },
              { texto: "Decido no volver a la iglesia hasta que deje de pasarme.", explica: "Alejarte de los hermanos te deja más solo: busca hermanos que te animen y oren contigo." },
            ],
            apoyo: "A veces es apagar la pantalla, cambiar de camino o llamar a un hermano",
            ref: "1 Corintios 10:13",
            explica: "Dios es fiel y siempre da la salida. A veces la salida es tan sencilla como apagar la pantalla.",
          },
          {
            caso: "De regreso a casa siempre pasas por la esquina donde se juntan tus amigos de antes. Cada vez que te quedas con ellos, terminas volviendo a lo que ya dejaste.",
            pregunta: "Según la lección, ¿qué es lo más sabio?",
            opciones: [
              { texto: "Tomar otro camino a casa: pongo un límite antes de que llegue la tentación.", bien: true, explica: "Conoces tu punto débil y pones un límite a tiempo: a veces la salida es cambiar de camino." },
              { texto: "Seguir pasando por ahí para demostrar que ya soy fuerte.", explica: "Es más fácil decir que no a tiempo que salir después. Conoce tus puntos débiles y pon límites." },
              { texto: "Quedarme con ellos, pero sin contarle nada a nadie de la iglesia.", explica: "Esconder la lucha te deja solo. Busca hermanos que te animen y oren contigo." },
              { texto: "Pensar que, como ahora soy creyente, ya no me puede pasar nada.", explica: "Jesús también fue tentado. Por eso conviene conocer tus puntos débiles y prepararte antes." },
            ],
            apoyo: "Conoce tus puntos débiles y pon límites antes de que llegue la tentación",
            ref: "1 Corintios 10:13; 2 Timoteo 2:22",
            explica: "Prepararse antes es parte de vencer: un límite a tiempo, como cambiar de camino, te ayuda a no caer.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El pecado empieza cuando decimos sí a lo que Dios dice no.",
            ref: "Santiago 1:13-15; Hebreos 4:15",
            clave: {
              id: "pr-n1-vida-nueva-2-a6-1",
              tipo: "corta",
              pregunta: "¿Es pecado ser tentado? Explica cuándo empieza el pecado.",
              ideas: [
                { id: "no-es", peso: 50, texto: "Ser tentado no es pecado: Jesús fue tentado, pero sin pecado.", formas: ["no es pecado", "no es pecar", "no es lo mismo", "no peca*", "jesus (fue|tambien) tentado", "jesus tambien fue tentado", "pero sin pecado", "tentado sin pecado"], negativa: true },
                { id: "decir-si", peso: 50, texto: "El pecado empieza cuando cedemos: cuando abrazamos la tentación y decimos sí a lo que Dios dice no.", formas: ["decimos si", "decir si", "digo si", "dices si", "abraza*", "ced*", "da a luz", "dios dice no", "hacemos caso", "hacer caso", "acepta*"] },
              ],
              modelo: "Ser tentado no es pecado: Jesús también fue tentado, pero sin pecado. El pecado empieza cuando abrazamos la tentación y decimos sí a lo que Dios dice no.",
            },
          },
          {
            apoyo: "La tentación nos atrae a través de nuestros propios deseos, y si la abrazamos, da a luz el pecado.",
            ref: "Santiago 1:13-15",
            clave: {
              id: "pr-n1-vida-nueva-2-a6-2",
              tipo: "corta",
              pregunta: "Según Santiago 1:13-15, ¿de dónde viene la tentación y cómo llega a ser pecado?",
              ideas: [
                { id: "deseos", peso: 50, texto: "Dios no tienta a nadie: la tentación nos atrae a través de nuestros propios deseos.", formas: ["propios deseos", "(nuestros|mis|tus|sus|los) deseos", "deseo*", "nos atrae", "atrae*", "dios no tienta", "no viene de dios"] },
                { id: "abrazar", peso: 50, texto: "Si la abrazamos, da a luz el pecado: decimos sí a lo que Dios dice no.", formas: ["abraza*", "da a luz", "dar a luz", "ced*", "decimos si", "decir si", "dios dice no", "hacemos caso", "acepta*"] },
              ],
              modelo: "La tentación no viene de Dios: nos atrae a través de nuestros propios deseos. Si la abrazamos, da a luz el pecado: decimos sí a lo que Dios dice no.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Cuando caigo: confesar y levantarme
    "n1-vida-nueva-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pasa si decimos que no tenemos pecado?", reverso: "Nos engañamos a nosotros mismos.", apoyo: "si decimos que no tenemos pecado, nos engañamos a nosotros mismos" },
              { frente: "¿Qué promete Dios si confesamos nuestros pecados?", reverso: "Es fiel y justo para perdonarnos y limpiarnos de toda maldad.", apoyo: "Dios es fiel y justo para perdonarnos y limpiarnos de toda maldad" },
              { frente: "¿Qué es confesar?", reverso: "Llamar al pecado por su nombre delante de Dios, sin excusas, y apartarse de él.", apoyo: "Confesar es llamar al pecado por su nombre delante de Dios, sin excusas, y apartarse de él." },
              { frente: "Si alguno peca, ¿quién es su abogado ante el Padre?", reverso: "Jesucristo el justo.", apoyo: "abogado tenemos para con el Padre: Jesucristo el justo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace el Padre cuando un hijo suyo cae?", reverso: "No lo rechaza: lo llama a volver.", apoyo: "Cuando un hijo de Dios cae, el Padre no lo rechaza; lo llama a volver." },
              { frente: "¿Qué hizo David cuando Natán lo confrontó?", reverso: "No se justificó: reconoció su pecado.", apoyo: "no se justificó: reconoció su pecado" },
              { frente: "¿Qué dos tristezas distingue Pablo?", reverso: "La que es según Dios, que produce arrepentimiento, y la del mundo, que produce muerte.", apoyo: "Pablo distingue dos tristezas" },
              { frente: "Si fallaste hoy, ¿cuándo hablas con Dios?", reverso: "Ahora: no esperes a la noche ni al domingo.", apoyo: "No esperes a la noche ni al domingo: habla con Dios ahora" },
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
            texto: "Si decimos que no tenemos pecado, nos [[engañamos]] a nosotros mismos. Pero si [[confesamos]] nuestros pecados, Dios es fiel y justo para [[perdonarnos]] y limpiarnos de toda maldad.",
            distractores: ["escondemos", "castigarnos", "salvamos"],
            errores: {
              escondemos: "Esconder el pecado no trae el perdón: la promesa es para quien lo confiesa.",
              castigarnos: "La promesa de Dios para quien confiesa es perdón y limpieza, no castigo.",
            },
            apoyo: "si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos de toda maldad",
            ref: "1 Juan 1:8-9",
            explica: "Todos tenemos pecado. La salida no es negarlo ni esconderlo, sino confesarlo: Dios promete perdonar y limpiar.",
          },
          {
            texto: "Confesar es llamar al pecado por su [[nombre]] delante de Dios, sin [[excusas]], y apartarse de él. Y si alguno peca, tenemos un [[abogado]] para con el Padre: Jesucristo el justo.",
            distractores: ["apodo", "acusador", "esperanza"],
            errores: {
              apodo: "Confesar no es ponerle al pecado un nombre más bonito: es llamarlo por su nombre, sin excusas.",
              acusador: "Jesucristo no es nuestro acusador: es nuestro abogado ante el Padre. El que acusa es el enemigo.",
            },
            apoyo: "Confesar es llamar al pecado por su nombre delante de Dios, sin excusas, y apartarse de él.",
            ref: "1 Juan 1:9; 1 Juan 2:1-2",
            explica: "Confesar es hablar con Dios con honestidad y dejar el pecado. Y no estamos solos: Jesucristo es nuestro abogado ante el Padre.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "En la mañana le contestaste mal a tu mamá y la heriste. Ya en el trabajo te sientes mal, y piensas: el domingo, en la iglesia, lo arreglo con Dios.",
            pregunta: "¿Qué es lo mejor?",
            opciones: [
              { texto: "Hablo con Dios ahora, le confieso lo que hice sin excusas, recibo su perdón y después le pido perdón a mi mamá.", bien: true, explica: "No esperas al domingo: confiesas ahora y, como tu pecado afectó a tu mamá, le pides perdón." },
              { texto: "Espero al domingo, porque allá es donde se arreglan las cosas con Dios.", explica: "No hace falta esperar a la noche ni al domingo: puedes hablar con Dios ahora mismo." },
              { texto: "Se lo confieso a Dios, pero a mi mamá no le digo nada para no pasar vergüenza.", explica: "Si tu pecado afectó a otros, pide perdón y repara lo que puedas." },
              { texto: "No hago nada: fue algo pequeño y ella ya lo va a olvidar.", explica: "Si decimos que no tenemos pecado, nos engañamos. Confesar es llamar al pecado por su nombre, sin excusas." },
            ],
            apoyo: "No esperes a la noche ni al domingo: habla con Dios ahora, confiesa, recibe su perdón y levántate.",
            ref: "1 Juan 1:9",
            explica: "Cuando fallas, no esperes: habla con Dios ahora, confiesa, recibe su perdón y repara el daño que hiciste.",
          },
          {
            caso: "Desde hace meses caes una y otra vez en el mismo pecado. Ya se lo confesaste a Dios muchas veces, y te da vergüenza contárselo a alguien.",
            pregunta: "Según la lección, ¿qué te conviene hacer?",
            opciones: [
              { texto: "Buscar la ayuda de mi pastor o de un hermano maduro, y orar juntos.", bien: true, explica: "Así lo enseña la lección con Santiago 5:16: con un pecado que se repite, no luches solo." },
              { texto: "Dejar de confesarlo, porque Dios ya debe estar cansado de mí.", explica: "El camino de regreso a Dios siempre está abierto. Esa idea viene del que acusa para que te escondas." },
              { texto: "Guardarlo en secreto y esforzarme más, sin decirle a nadie.", explica: "Esconderlo te deja solo. Si el pecado se repite, la lección dice: busca ayuda y oren juntos." },
              { texto: "Pensar que, como sigo cayendo, ya no soy hijo de Dios.", explica: "Cuando un hijo de Dios cae, el Padre no lo rechaza: lo llama a volver." },
            ],
            apoyo: "Si es un pecado que se repite, busca la ayuda de tu pastor o de un hermano maduro, y oren juntos",
            ref: "Santiago 5:16",
            explica: "Confesar a Dios es lo primero. Si el pecado se repite, no luches solo: busca ayuda y oren juntos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Pon en orden lo que pasó con David.",
            pasos: ["David pecó gravemente", "El profeta Natán lo confrontó", "David no se justificó: reconoció su pecado", "Escribió el Salmo 51 y pidió misericordia"],
            apoyo: "Cuando el profeta Natán lo confrontó, no se justificó: reconoció su pecado",
            ref: "2 Samuel 11; 2 Samuel 12:13; Salmos 51",
            explica: "David no escondió ni justificó su pecado: cuando Natán lo confrontó, lo reconoció y volvió a Dios con el Salmo 51.",
          },
          {
            consigna: "Ordena el regreso de David a Dios, como lo cuenta la lección.",
            pasos: ["Reconoció su pecado, sin justificarse", "Pidió misericordia", "Oró: «Crea en mí, oh Dios, un corazón limpio»", "Pidió que Dios le devolviera el gozo de su salvación"],
            apoyo: "Pidió también que Dios le devolviera el gozo de su salvación.",
            ref: "Salmos 51:1-12",
            explica: "David pidió más que perdón: pidió un corazón limpio y el gozo de su salvación. Dios no desprecia al corazón contrito y humillado.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "Lleva cada frase a su grupo.",
            grupos: ["Tristeza que sana: me lleva de vuelta a Dios", "Culpa que aleja: me hace esconderme de Dios"],
            frases: [
              { texto: "Pedro lloró amargamente, pero volvió y fue restaurado", grupo: 0 },
              { texto: "Judas sintió remordimiento, pero no volvió a Jesús", grupo: 1 },
              { texto: "El Espíritu me convence para que regrese", grupo: 0 },
              { texto: "El enemigo me acusa para que me esconda", grupo: 1 },
              { texto: "Produce arrepentimiento para salvación", grupo: 0 },
              { texto: "Produce muerte", grupo: 1, explica: "Es la tristeza del mundo: duele, pero no lleva de vuelta a Dios." },
            ],
            apoyo: "El enemigo acusa para que te escondas; el Espíritu convence para que regreses.",
            ref: "2 Corintios 7:10",
            explica: "Las dos tristezas duelen, pero no llevan al mismo lugar: la que es según Dios te lleva de vuelta a Él; la otra te aleja.",
          },
          {
            consigna: "Después de caer, ¿a dónde te lleva cada pensamiento?",
            grupos: ["Me lleva de vuelta a Dios", "Me aleja de Dios"],
            frases: [
              { texto: "Fallé, pero voy a hablar con Dios ahora mismo", grupo: 0 },
              { texto: "Dios ya se cansó de mí; mejor ni oro", grupo: 1, explica: "Esa voz acusa para que te escondas. El camino de regreso a Dios siempre está abierto." },
              { texto: "Me duele lo que hice; se lo confieso y le pido un corazón limpio", grupo: 0 },
              { texto: "No vuelvo a la iglesia hasta que me sienta digno", grupo: 1 },
              { texto: "Le pido perdón a quien ofendí y reparo lo que puedo", grupo: 0 },
              { texto: "Me escondo de Dios y de los hermanos para que nadie sepa", grupo: 1 },
            ],
            apoyo: "El camino de regreso a Dios siempre está abierto.",
            ref: "2 Corintios 7:10; Salmos 51:17",
            explica: "La tristeza según Dios te hace volver, confesar y levantarte. La culpa que aleja te dice que te escondas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Pedro negó a Jesús y lloró amargamente, pero volvió y fue restaurado",
            ref: "Lucas 22:61-62; Mateo 27:3-5",
            clave: {
              id: "pr-n1-vida-nueva-3-a6-1",
              tipo: "corta",
              pregunta: "Pedro y Judas le fallaron a Jesús. ¿Qué diferencia hubo entre los dos?",
              ideas: [
                { id: "pedro", peso: 40, texto: "Pedro lloró, pero volvió a Jesús y fue restaurado.", formas: ["pedro volvi*", "pedro regres*", "volvio", "regreso", "restaurad*", "lo restauro", "se arrepinti*"] },
                { id: "judas", peso: 40, texto: "Judas sintió remordimiento, pero no volvió a Jesús.", formas: ["judas no volvi*", "no volvi*", "no regres*", "nunca volvi*", "remordimiento", "se alejo", "se aparto"], negativa: true },
                { id: "tristeza", peso: 20, texto: "La tristeza según Dios lleva de vuelta a Él; la culpa que no vuelve aleja de Dios.", formas: ["segun dios", "de vuelta", "del mundo", "arrepentimiento", "culpa", "lo alejo"] },
              ],
              modelo: "Los dos fallaron, pero Pedro lloró, volvió a Jesús y fue restaurado. Judas sintió remordimiento, pero no volvió a Jesús. La tristeza según Dios lleva de vuelta a Él.",
            },
          },
          {
            apoyo: "El enemigo acusa para que te escondas; el Espíritu convence para que regreses.",
            ref: "2 Corintios 7:10",
            clave: {
              id: "pr-n1-vida-nueva-3-a6-2",
              tipo: "corta",
              pregunta: "Cuando un creyente peca, ¿qué hace el enemigo y qué hace el Espíritu Santo?",
              ideas: [
                { id: "acusa", peso: 50, texto: "El enemigo acusa para que te escondas de Dios.", formas: ["acus*", "escond*", "alej* de dios", "te aleja", "lo aleja", "nos aleja", "huir de dios"] },
                { id: "convence", peso: 50, texto: "El Espíritu convence para que regreses a Dios.", formas: ["convenc*", "regres*", "volv*", "vuelv*", "de vuelta", "llama a volver"] },
              ],
              modelo: "El enemigo acusa al creyente para que se esconda de Dios. El Espíritu Santo, en cambio, lo convence de su pecado para que regrese, confiese y reciba el perdón.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Perdonar y vivir en paz
    "n1-vida-nueva-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué perdona el creyente?", reverso: "Porque Dios lo perdonó en Cristo.", apoyo: "El creyente perdona porque Dios lo perdonó en Cristo" },
              { frente: "¿Qué nos pide Pablo quitar de nosotros?", reverso: "Toda amargura, enojo, ira, gritería y maledicencia.", apoyo: "quitar de nosotros toda amargura, enojo, ira, gritería y maledicencia" },
              { frente: "¿Hasta cuántas veces dijo Jesús que hay que perdonar?", reverso: "Hasta setenta veces siete: el perdón es un estilo de vida, no una cuenta.", apoyo: "El perdón no es una cuenta que se lleva, sino un estilo de vida." },
              { frente: "¿A quién libera primero el perdón?", reverso: "A ti.", apoyo: "El perdón te libera a ti primero." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿A qué se parece guardar rencor?", reverso: "A cargar una piedra pesada todo el día: el que más sufre es quien la carga.", apoyo: "Guardar rencor es como cargar una piedra pesada todo el día" },
              { frente: "¿Cuál es la medida del perdón que damos?", reverso: "El perdón que recibimos: una deuda inmensa que Dios canceló en la cruz.", apoyo: "La medida del perdón que damos es el perdón que recibimos" },
              { frente: "¿Qué es perdonar?", reverso: "Decidir no cobrar la deuda y dejar la justicia en manos de Dios.", apoyo: "Perdonar es decidir no cobrar la deuda y dejar la justicia en manos de Dios" },
              { frente: "¿Perdonar te obliga a quedarte en peligro?", reverso: "No: pide ayuda y protégete.", apoyo: "ni te obliga a quedarte en peligro: pide ayuda y protégete" },
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
            texto: "Pablo nos pide perdonarnos unos a otros, como Dios también nos [[perdonó]] a nosotros en [[Cristo]]. La medida del perdón que damos es el perdón que [[recibimos]].",
            distractores: ["merecemos", "acusó", "cobramos"],
            errores: {
              merecemos: "No perdonamos según lo que el otro merece: damos el perdón que recibimos de Dios, una deuda inmensa que Él canceló en la cruz.",
              cobramos: "Perdonar es justamente decidir no cobrar la deuda.",
            },
            apoyo: "como Dios también nos perdonó a nosotros en Cristo",
            ref: "Efesios 4:32",
            explica: "El creyente perdona porque fue perdonado: Dios le canceló en Cristo una deuda inmensa.",
          },
          {
            texto: "Jesús contó de un siervo al que su señor le perdonó una deuda [[enorme]], pero que no quiso perdonar a su consiervo una deuda [[pequeña]]. A nosotros, Dios nos canceló en la [[cruz]] una deuda inmensa.",
            distractores: ["imaginaria", "iglesia"],
            errores: {
              iglesia: "La deuda no se paga yendo a la iglesia: Dios la canceló en la cruz.",
            },
            apoyo: "una deuda inmensa que Dios canceló en la cruz",
            ref: "Mateo 18:23-35",
            explica: "El siervo recibió mucho perdón y no quiso dar un poco. El creyente perdona porque Dios le perdonó una deuda inmensa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "Lleva cada frase a su grupo.",
            grupos: ["Es perdonar", "No es perdonar"],
            frases: [
              { texto: "Decidir no cobrar la deuda", grupo: 0 },
              { texto: "Dejar la justicia en manos de Dios", grupo: 0 },
              { texto: "Renovar la decisión cuando vuelve el recuerdo", grupo: 0 },
              { texto: "Decir que lo malo estuvo bien", grupo: 1 },
              { texto: "Negar el dolor", grupo: 1 },
              { texto: "Tener que confiar de inmediato en quien te falló", grupo: 1, explica: "Perdonar no siempre es volver a confiar de inmediato: la confianza se reconstruye con el tiempo." },
            ],
            apoyo: "Perdonar es decidir no cobrar la deuda y dejar la justicia en manos de Dios",
            ref: "Romanos 12:19",
            explica: "Perdonar es soltar la deuda y dejársela a Dios. No es fingir que no pasó nada ni negar el dolor.",
          },
          {
            consigna: "¿Qué es perdonar y qué no lo es?",
            grupos: ["Es perdonar", "No es perdonar"],
            frases: [
              { texto: "Entregarle a Dios la deuda de quien te ofendió", grupo: 0 },
              { texto: "Decidir perdonar aunque todavía duela", grupo: 0 },
              { texto: "Perdonar una y otra vez, como estilo de vida", grupo: 0 },
              { texto: "Llevar la cuenta de las veces que perdonaste", grupo: 1, explica: "El perdón no es una cuenta que se lleva, sino un estilo de vida." },
              { texto: "Fingir que no te dolió", grupo: 1 },
              { texto: "Quedarte en peligro junto a quien te hace daño", grupo: 1, explica: "Perdonar no te obliga a quedarte en peligro: pide ayuda y protégete." },
            ],
            apoyo: "perdonar es dejar la deuda en manos de Dios, sin negar el dolor",
            ref: "Mateo 18:21-22; Romanos 12:19",
            explica: "Perdonar es soltar la deuda y dejársela a Dios, aunque duela. No es fingir, llevar la cuenta ni quedarte en peligro.",
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
              { texto: "Buscar la paz incluye pedir perdón cuando ofendo y perdonar cuando me ofenden.", verdad: true, explica: "La paz a veces depende también del otro, pero lo que depende de ti, hazlo.", apoyo: "lo que depende de ti, hazlo: pide perdón cuando ofendes, perdona cuando te ofenden", ref: "Romanos 12:18" },
              { texto: "Si la otra persona no quiere la paz, ya no tengo nada que hacer.", verdad: false, explica: "Aunque la paz dependa también del otro, tú puedes perdonar y orar por quien te hiere.", apoyo: "A veces la paz depende también del otro", ref: "Romanos 12:18; Mateo 5:44" },
              { texto: "Orar por quien me hirió es parte de buscar la paz.", verdad: true, explica: "La lección lo dice con Mateo 5:44: ora por quienes te hieren.", apoyo: "ora por quienes te hieren", ref: "Mateo 5:44" },
            ],
          },
          {
            afirmaciones: [
              { texto: "Si vuelve el recuerdo de una herida profunda, puedo renovar mi decisión de perdonar.", verdad: true, explica: "Hay heridas que no sanan en un día: perdonar puede ser una decisión que se renueva.", apoyo: "Perdonar puede ser una decisión que se renueva cada vez que vuelve el recuerdo." },
              { texto: "Si todavía me duele, es que no perdoné de verdad.", verdad: false, explica: "Hay heridas profundas que no sanan en un día. Perdonar no es negar el dolor.", apoyo: "Hay heridas profundas que no sanan en un día." },
              { texto: "Buscar consejería en la iglesia es señal de poca fe.", verdad: false, explica: "La lección lo recomienda: lleva la herida a Dios en oración y, si lo necesitas, busca consejería en tu iglesia.", apoyo: "Llévalo a Dios en oración y, si lo necesitas, busca consejería en tu iglesia." },
              { texto: "Un paso concreto es orar por esa persona y entregarle a Dios la deuda.", verdad: true, explica: "Así lo propone la lección: escribe su nombre, ora por esa persona y entrégale a Dios la deuda.", apoyo: "ora por esa persona y entrégale a Dios la deuda" },
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
            caso: "Un compañero de trabajo se burló de ti delante de todos en una reunión. Ya pasaron unos días y sigues enojado con él.",
            pregunta: "¿Qué paso concreto te enseña la lección?",
            opciones: [
              { texto: "Oro por él, decido no cobrarle la deuda y, en lo que dependa de mí, busco estar en paz con él.", bien: true, explica: "Perdonas, oras por quien te hirió y haces lo que depende de ti para la paz." },
              { texto: "Le hago lo mismo para que aprenda.", explica: "Eso es cobrar la deuda. Perdonar es dejar la justicia en manos de Dios." },
              { texto: "Hago como si nada hubiera pasado y me trago el enojo.", explica: "Perdonar no es negar el dolor: es llevarlo a Dios y decidir no cobrar la deuda." },
              { texto: "Espero a que él me pida perdón; mientras, no le hablo.", explica: "La paz a veces depende también del otro, pero lo que depende de ti, hazlo: perdona y ora por él." },
            ],
            apoyo: "perdona cuando te ofenden y ora por quienes te hieren",
            ref: "Romanos 12:18; Mateo 5:44",
            explica: "Perdonar no espera a que el otro cambie: tú decides no cobrar la deuda, oras por él y buscas la paz en lo que depende de ti.",
          },
          {
            caso: "En una discusión familiar le dijiste palabras duras a tu hermana. Ella está dolida y ya no te habla.",
            pregunta: "¿Qué haces para buscar la paz?",
            opciones: [
              { texto: "Le pido perdón con sinceridad y le doy tiempo, porque la confianza se reconstruye poco a poco.", bien: true, explica: "Lo que depende de ti, hazlo: cuando ofendes, pides perdón, y das tiempo para que sane la herida." },
              { texto: "Espero a que ella me hable primero; yo no fui el único culpable.", explica: "Lo que depende de ti, hazlo: pide perdón cuando ofendes." },
              { texto: "Le compro un regalo y hago como si nada hubiera pasado.", explica: "Hacer como si nada no trae la paz: cuando ofendes, lo que te toca es pedir perdón." },
              { texto: "Le exijo que me perdone ya, porque los cristianos deben perdonar.", explica: "Tú pides perdón, pero no lo exiges: hay heridas que no sanan en un día." },
            ],
            apoyo: "lo que depende de ti, hazlo: pide perdón cuando ofendes",
            ref: "Romanos 12:18",
            explica: "Buscar la paz también es pedir perdón cuando tú ofendes, y darle tiempo al otro para sanar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "como Dios también nos perdonó a nosotros en Cristo",
            ref: "Efesios 4:32",
            clave: {
              id: "pr-n1-vida-nueva-4-a6-1",
              tipo: "corta",
              pregunta: "Según Efesios 4:32, ¿por qué perdona el creyente?",
              ideas: [
                { id: "perdonado", peso: 60, texto: "Porque Dios lo perdonó a él en Cristo.", formas: ["dios (nos|me|lo|le|te) perdono", "(nos|me|lo|te) perdono", "fuimos perdonados", "fue perdonado", "soy perdonado", "perdonados", "perdon de dios", "perdon* en cristo"] },
                { id: "deuda", peso: 40, texto: "Dios le canceló una deuda inmensa en la cruz: el perdón que da es el que recibió.", formas: ["deuda", "cancel*", "cruz", "recibi*", "medida"] },
              ],
              modelo: "El creyente perdona porque Dios lo perdonó primero en Cristo. Dios le canceló en la cruz una deuda inmensa, y el perdón que recibió es la medida del perdón que da.",
            },
          },
          {
            apoyo: "la parábola del siervo al que su señor le perdonó una deuda enorme",
            ref: "Mateo 18:23-35",
            clave: {
              id: "pr-n1-vida-nueva-4-a6-2",
              tipo: "corta",
              pregunta: "¿Qué enseña la parábola del siervo que no quiso perdonar?",
              ideas: [
                { id: "enorme", peso: 50, texto: "Al siervo le perdonaron una deuda enorme, como Dios nos perdonó a nosotros.", formas: ["deuda (enorme|grande|inmensa)", "(gran|grande|enorme|inmensa) deuda", "enorme", "inmensa", "mucho", "le perdon*", "dios (nos|me|le|lo) perdon*", "fuimos perdonados", "recibi* (perdon|mucho)"] },
                { id: "perdonar", peso: 50, texto: "Quien fue perdonado de tanto debe perdonar lo poco: por eso perdonamos a los demás.", formas: ["deuda pequena", "pequen*", "poco", "debemos perdonar", "debe perdonar", "hay que perdonar", "tambien perdon*", "perdon* a (otros|los|nuestro|mi)", "perdonamos"] },
              ],
              modelo: "Al siervo le perdonaron una deuda enorme, pero él no quiso perdonar una deuda pequeña. Dios nos perdonó una deuda inmensa en la cruz; por eso también perdonamos a los demás.",
            },
          },
        ],
      },
    ],
  },
};
