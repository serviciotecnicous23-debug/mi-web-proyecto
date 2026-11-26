/**
 * Las prácticas de «Disciplinas espirituales» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-disciplinas.ts), con la guía de docs/academia-practicas.md.
 * Las disciplinas se practican como medios de gracia, no como méritos: así lo dice cada lección. Los casos son de la
 * vida diaria de un discípulo que crece (casa, trabajo, iglesia, amigos). Las piezas del Nivel 2: «Marca en el pasaje»
 * con las citas que la lección escribe entre « » (lecciones 2, 3 y 5) y el mapa de ideas (lecciones 5 y 6). No hay
 * línea del tiempo: ninguna lección cuenta una historia en el tiempo.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_DISCIPLINAS: PracticasMateria = {
  materia: "n2-disciplinas",
  mision: {
    titulo: "Un plan para crecer en Cristo",
    intro: "Un amigo que quiere crecer en su fe te pide ayuda: no sabe por dónde empezar ni cómo ser constante. Repasa las seis lecciones para explicarle qué son las disciplinas, cómo recibir la Palabra, orar y ayunar, adorar, estar a solas con Dios y servir, y para ayudarle a armar su plan.",
    cierre: "Ya puedes explicar por qué las disciplinas son medios de gracia y no méritos, practicar la Palabra, la oración, el ayuno, la adoración, el silencio y el servicio, y armar una regla de vida sencilla que se cumple.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. ¿Qué son las disciplinas espirituales?
    "n2-disciplinas-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué son las disciplinas espirituales?", reverso: "Los hábitos que la Biblia nos enseña para crecer en Cristo.", apoyo: "Las disciplinas espirituales son los hábitos que la Biblia nos enseña para crecer en Cristo." },
              { frente: "¿Qué es la piedad?", reverso: "Una vida que agrada a Dios.", apoyo: "La piedad es una vida que agrada a Dios" },
              { frente: "¿En qué se diferencia el ejercicio del cuerpo de la piedad?", reverso: "El ejercicio sirve para esta vida; la piedad tiene promesa de esta vida y de la venidera.", apoyo: "el ejercicio del cuerpo sirve para esta vida; la piedad tiene promesa de esta vida y de la venidera" },
              { frente: "¿Qué imagen usa Pablo para la vida con Dios?", reverso: "La del atleta, que gana la carrera en meses de entrenamiento.", apoyo: "Un atleta no gana una carrera el día de la competencia: la gana en meses de entrenamiento." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Las disciplinas nos hacen ganar el amor de Dios?", reverso: "No: somos salvos por gracia, por medio de la fe.", apoyo: "Las disciplinas no nos salvan ni nos hacen ganar el amor de Dios: somos salvos por gracia, por medio de la fe" },
              { frente: "Si no son méritos, ¿qué son las disciplinas?", reverso: "Medios de gracia: caminos por donde Dios nos encuentra y nos transforma.", apoyo: "Son caminos por donde Dios nos encuentra y nos transforma" },
              { frente: "¿Qué hace el legalismo con las disciplinas?", reverso: "Las convierte en reglas para ser aceptados o para aparentar.", apoyo: "El legalismo convierte las disciplinas en reglas para ser aceptados o para aparentar" },
              { frente: "¿Qué hacía Jesús aun con las multitudes buscándolo?", reverso: "Se apartaba a lugares desiertos, y oraba.", apoyo: "Aun con las multitudes buscándolo, Jesús «se apartaba a lugares desiertos, y oraba»." },
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
            consigna: "Completa qué son las disciplinas espirituales y cómo se cultiva la piedad.",
            texto: "Las disciplinas espirituales son los [[hábitos]] que la Biblia nos enseña para crecer en Cristo. La piedad es una vida que [[agrada]] a Dios, y se cultiva como se entrena el cuerpo: con [[constancia]].",
            distractores: ["méritos", "obliga", "prisa"],
            errores: {
              méritos: "Las disciplinas no son méritos para ganar el amor de Dios: son hábitos que la Biblia nos enseña.",
              prisa: "Como el atleta que gana en meses de entrenamiento, la piedad se cultiva con constancia.",
            },
            apoyo: "Las disciplinas espirituales son los hábitos que la Biblia nos enseña para crecer en Cristo.",
            ref: "1 Timoteo 4:7-8",
            explica: "Las disciplinas son hábitos que la Biblia nos enseña. Como el atleta que entrena, la piedad se cultiva con constancia: es una vida que agrada a Dios.",
          },
          {
            consigna: "Completa para qué sirven las disciplinas.",
            texto: "Las disciplinas son caminos por donde Dios nos encuentra y nos [[transforma]]: nos ponen delante de Él para que su [[Espíritu]] obre en nosotros. Son medios de [[gracia]], no méritos.",
            distractores: ["castiga", "enojo", "esfuerzo"],
            errores: {
              castiga: "Las disciplinas son caminos por donde Dios nos encuentra para transformarnos.",
              esfuerzo: "No son méritos de nuestro esfuerzo: son medios de gracia.",
            },
            apoyo: "Son caminos por donde Dios nos encuentra y nos transforma: nos ponen delante de Él para que su Espíritu obre en nosotros",
            ref: "2 Corintios 3:18",
            explica: "Las disciplinas no nos ganan nada: nos ponen delante de Dios para que su Espíritu obre en nosotros y nos transforme.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Nace de la gracia o es legalismo? Lleva cada frase a su grupo.",
            grupos: ["Nace de la gracia", "Es legalismo"],
            frases: [
              { texto: "Leer la Biblia para conocer más a Dios", grupo: 0 },
              { texto: "Orar para ponerte delante de Dios", grupo: 0, explica: "Las disciplinas nos ponen delante de Dios para que su Espíritu obre en nosotros." },
              { texto: "Servir a otros siguiendo el ejemplo de Jesús", grupo: 0 },
              { texto: "Orar en público para que te vean", grupo: 1, explica: "Hacerlo para aparentar es legalismo: Jesús lo reprendió en los fariseos." },
              { texto: "Leer la Biblia para que Dios te acepte", grupo: 1, explica: "El legalismo convierte las disciplinas en reglas para ser aceptados." },
              { texto: "Ayunar para ganarte el amor de Dios", grupo: 1, explica: "Las disciplinas no nos hacen ganar el amor de Dios." },
            ],
            apoyo: "El legalismo convierte las disciplinas en reglas para ser aceptados o para aparentar",
            ref: "Mateo 6:1",
            explica: "La misma disciplina puede nacer de la gracia o del legalismo: depende de para qué se hace. La gracia busca conocer a Dios; el legalismo, ser aceptado o aparentar.",
          },
          {
            consigna: "¿Es disciplina por gracia o legalista? Lleva cada frase a su grupo.",
            grupos: ["Disciplina por gracia", "Disciplina legalista"],
            frases: [
              { texto: "Leo la Biblia porque quiero conocer a Dios", grupo: 0 },
              { texto: "Oro cada día porque ahí Dios me transforma", grupo: 0 },
              { texto: "Sirvo a otros porque Jesús también servía", grupo: 0 },
              { texto: "Si hoy no oro, Dios ya no me va a amar", grupo: 1, explica: "Las disciplinas no nos hacen ganar el amor de Dios." },
              { texto: "Ayuno para que en la iglesia me admiren", grupo: 1, explica: "Hacerlo para aparentar es legalismo." },
              { texto: "Cumplo mis horas de lectura para que Dios me acepte", grupo: 1, explica: "Eso convierte la lectura en una regla para ser aceptado." },
            ],
            apoyo: "Las disciplinas no nos salvan ni nos hacen ganar el amor de Dios",
            ref: "Efesios 2:8-9",
            explica: "Por gracia, las disciplinas nos ponen delante de Dios para conocerlo; el legalismo las usa para ganar su amor, ser aceptado o aparentar.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Sofía sigue el ejemplo de Jesús. Une lo que hace Sofía con lo que hacía Jesús.",
            pares: [
              ["Sofía se levanta temprano para hablar a solas con Dios", "Jesús se apartaba a lugares desiertos, y oraba"],
              ["Sofía estudia su Biblia cada noche", "Jesús conocía las Escrituras"],
              ["Sofía deja la cena del viernes para buscar a Dios", "Jesús ayunó en el desierto"],
              ["Sofía va cada domingo a la reunión de la iglesia", "Jesús se congregaba en la sinagoga"],
              ["Sofía ayuda a su vecina con las compras", "Jesús servía a los demás"],
            ],
            apoyo: "Conocía las Escrituras, ayunó en el desierto, se congregaba en la sinagoga y servía a los demás.",
            ref: "Lucas 5:16",
            explica: "Jesús es nuestro modelo: oraba a solas, conocía las Escrituras, ayunó, se congregaba y servía. Sofía imita esos hábitos en su vida diaria.",
          },
          {
            consigna: "Raúl quiere vivir como Jesús. Une cada hábito de Raúl con el de Jesús que imita.",
            pares: [
              ["Raúl apaga el teléfono y habla con Dios a solas en el parque", "Jesús se apartaba a lugares desiertos, y oraba"],
              ["Raúl lee un capítulo de la Biblia en su almuerzo", "Jesús conocía las Escrituras"],
              ["Raúl pasa un día sin comer para buscar a Dios", "Jesús ayunó en el desierto"],
              ["Raúl se reúne con los hermanos de su iglesia", "Jesús se congregaba en la sinagoga"],
              ["Raúl le arregla la puerta a un vecino", "Jesús servía a los demás"],
            ],
            apoyo: "Si el Hijo de Dios cultivó estos hábitos, nosotros los necesitamos más.",
            ref: "Lucas 5:16",
            explica: "Si el Hijo de Dios cultivó estos hábitos, nosotros los necesitamos más: Raúl los vive en su semana.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un amigo de la iglesia te dice: Ayer no leí la Biblia; seguro que hoy Dios está enojado conmigo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: mañana lee el doble, y así compensas ante Dios el día que fallaste.", explica: "Así la lectura se vuelve una regla para ser aceptado: eso es legalismo." },
              { texto: "Leer no te gana el amor de Dios: es un camino donde Él te encuentra. Vuelve hoy.", bien: true, explica: "Las disciplinas no nos hacen ganar el amor de Dios: son caminos por donde Él nos encuentra." },
              { texto: "No te preocupes: leer la Biblia no es tan importante para crecer en la fe.", explica: "Las disciplinas sí importan: si el Hijo de Dios cultivó estos hábitos, nosotros los necesitamos más." },
              { texto: "Promete a Dios que nunca más vas a fallar, y así recuperas lo que perdiste.", explica: "La disciplina no es pagarle a Dios: somos salvos por gracia, por medio de la fe." },
            ],
            apoyo: "Las disciplinas no nos salvan ni nos hacen ganar el amor de Dios: somos salvos por gracia, por medio de la fe",
            ref: "Efesios 2:8-9",
            explica: "Las disciplinas no son méritos para ganar el amor de Dios, sino medios de gracia para conocerlo y ser transformados.",
          },
          {
            caso: "Una compañera del grupo de jóvenes te dice: Voy a ayunar esta semana y lo voy a publicar, para que vean que soy espiritual.",
            pregunta: "¿Qué le dices?",
            opciones: [
              { texto: "Buena idea: así todos ven tu ejemplo y te van a respetar más en la iglesia.", explica: "Hacerlo para que la vean es aparentar: Jesús reprendió eso en los fariseos." },
              { texto: "Publícalo, y si alguien te critica, dile que Jesús también ayunó.", explica: "Usar el ejemplo de Jesús no cambia el motivo: hacerlo para que la vean sigue siendo aparentar." },
              { texto: "Ayunar es bueno, pero no para aparentar: hazlo para estar delante de Dios.", bien: true, explica: "Anima a ayunar sin aparentar: las disciplinas nos ponen delante de Dios." },
              { texto: "Mejor no ayunes: eso solo lo hacían los fariseos, no los cristianos de hoy.", explica: "Jesús mismo ayunó en el desierto: el problema no es ayunar, sino hacerlo para aparentar." },
            ],
            apoyo: "El legalismo convierte las disciplinas en reglas para ser aceptados o para aparentar; Jesús lo reprendió en los fariseos",
            ref: "Mateo 6:1",
            explica: "El problema no es la disciplina, sino el motivo: hacerla para aparentar es legalismo. Nacida de la gracia, nos pone delante de Dios.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Las disciplinas espirituales son hábitos bíblicos para ejercitarnos en la piedad",
            ref: "1 Timoteo 4:7-8",
            clave: {
              id: "pr-n2-disciplinas-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué son las disciplinas espirituales y para qué sirven?",
              ideas: [
                { id: "habitos", peso: 35, texto: "Son hábitos que la Biblia nos enseña para ejercitarnos en la piedad.", formas: ["habito*", "costumbre*", "ejercit*", "entren*", "piedad", "practica* biblica*"] },
                { id: "gracia", peso: 30, texto: "Son medios de gracia, no méritos para ganar el amor de Dios.", formas: ["medio* de gracia", "por gracia", "de la gracia", "no son merito*", "no (ganan|ganamos|compran|merecen)", "no nos (salvan|hacen ganar)", "ni nos hacen ganar"] },
                { id: "conocer", peso: 35, texto: "Sirven para conocer a Dios y ser transformados.", formas: ["conoc* a dios", "conocerlo", "conocer mas a dios", "transform*", "nos encuentra", "delante de (el|dios)", "crecer en cristo", "parecer* a (cristo|jesus)"] },
              ],
              modelo: "Son hábitos que la Biblia nos enseña para ejercitarnos en la piedad. No son méritos para ganar el amor de Dios, sino medios de gracia para conocerlo y ser transformados.",
            },
          },
          {
            apoyo: "la piedad tiene promesa de esta vida y de la venidera",
            ref: "1 Timoteo 4:8",
            clave: {
              id: "pr-n2-disciplinas-1-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué Pablo compara la vida con Dios con el entrenamiento de un atleta?",
              ideas: [
                { id: "constancia", peso: 50, texto: "La piedad se cultiva como se entrena el cuerpo: con constancia.", formas: ["constan*", "cada dia", "todos los dias", "dia (a|tras) dia", "poco a poco", "persever*", "con disciplina"] },
                { id: "promesa", peso: 50, texto: "El ejercicio del cuerpo sirve para esta vida; la piedad tiene promesa de esta vida y de la venidera.", formas: ["venidera", "promesa", "vida eterna", "para siempre", "la eternidad", "otra vida"] },
              ],
              modelo: "Porque la piedad se cultiva como se entrena el cuerpo: con constancia, día a día. Pero el ejercicio del cuerpo sirve para esta vida, y la piedad tiene promesa de esta vida y de la venidera.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. La Palabra: leer, estudiar, meditar y memorizar
    "n2-disciplinas-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué pasa con la fe sin la Palabra de Dios?", reverso: "Se debilita, porque la Palabra es el alimento del alma.", apoyo: "La Palabra de Dios es el alimento del alma: sin ella la fe se debilita." },
              { frente: "¿A qué se parece el bienaventurado del Salmo 1?", reverso: "A un árbol plantado junto a corrientes de aguas, que da su fruto a su tiempo.", apoyo: "Es como un árbol plantado junto a corrientes de aguas, que da su fruto a su tiempo." },
              { frente: "¿Qué da la Palabra recibida cada día?", reverso: "Estabilidad y fruto.", apoyo: "La Palabra recibida cada día da estabilidad y fruto." },
              { frente: "¿Para qué se memoriza la Palabra?", reverso: "Para guardarla en el corazón y no pecar contra Dios.", apoyo: "Memorizar: guardar la Palabra en el corazón para no pecar contra Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo se lee la Biblia para conocerla toda?", reverso: "Con un plan, por ejemplo un capítulo por la mañana y otro por la noche.", apoyo: "Leer: con un plan (por ejemplo, un capítulo por la mañana y otro por la noche), para conocer toda la Biblia." },
              { frente: "¿Qué hacían los de Berea?", reverso: "Escudriñaban cada día las Escrituras.", apoyo: "como los de Berea, que escudriñaban cada día las Escrituras" },
              { frente: "¿Qué es meditar en un pasaje?", reverso: "Pensar despacio en él, repetirlo y preguntarse qué enseña de Dios y qué pide de mí.", apoyo: "Meditar: pensar despacio en un pasaje, repetirlo, preguntarse qué enseña de Dios y qué pide de mí." },
              { frente: "¿Qué le dijo Dios a Josué sobre el libro de la ley?", reverso: "Que meditara en él de día y de noche, para hacer conforme a lo que está escrito.", apoyo: "Dios le dijo a Josué que meditara en el libro de la ley de día y de noche, para hacer conforme a todo lo que en él está escrito." },
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
            consigna: "Une cada manera de recibir la Palabra con cómo se hace.",
            pares: [
              ["Leer", "Con un plan, para conocer toda la Biblia"],
              ["Estudiar", "Con preguntas, el contexto y herramientas"],
              ["Meditar", "Pensar despacio en un pasaje y repetirlo"],
              ["Memorizar", "Guardar la Palabra en el corazón"],
            ],
            apoyo: "La Palabra se recibe leyéndola con un plan, estudiándola, meditándola y memorizándola",
            ref: "Hechos 17:11; Salmos 119:11",
            explica: "Leer con un plan da a conocer toda la Biblia; estudiar la examina con preguntas; meditar la piensa despacio; memorizar la guarda en el corazón.",
          },
          {
            consigna: "Une cada manera de recibir la Palabra con su ejemplo.",
            pares: [
              ["Leer", "Elena sigue un plan: un capítulo en la mañana y otro en la noche"],
              ["Estudiar", "Jorge busca el contexto de un pasaje y le hace preguntas"],
              ["Meditar", "Valeria piensa despacio en un versículo y se pregunta qué pide de ella"],
              ["Memorizar", "Diego guarda un versículo en su corazón para no pecar contra Dios"],
            ],
            apoyo: "Meditar: pensar despacio en un pasaje, repetirlo, preguntarse qué enseña de Dios y qué pide de mí.",
            ref: "Hechos 17:11; Salmos 119:11",
            explica: "Cada uno recibe la Palabra de una manera: Elena la lee con un plan, Jorge la estudia, Valeria la medita y Diego la memoriza.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué hace el bienaventurado con la ley de Jehová, y cuándo? Toca las tres palabras.",
            texto: "en la ley de Jehová está su delicia, y en su ley [[medita]] de [[día]] y de [[noche]]",
            ref: "Salmos 1:2",
            apoyo: "Dios le dijo a Josué que meditara en el libro de la ley de día y de noche",
            explica: "El bienaventurado medita en la ley de Jehová de día y de noche: la Palabra recibida cada día da estabilidad y fruto.",
          },
          {
            consigna: "¿Qué es la ley de Jehová para el bienaventurado que medita en ella? Toca la palabra.",
            texto: "en la ley de Jehová está su [[delicia]], y en su ley medita de día y de noche",
            ref: "Salmos 1:2",
            apoyo: "la meditación bíblica llena la mente con la Escritura para obedecerla",
            explica: "La ley de Jehová es su delicia: por eso medita en ella de día y de noche.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la meditación bíblica tiene un error. Tócala.",
            frases: [
              "Meditar es pensar despacio en un pasaje y repetirlo.",
              "Al meditar, me pregunto qué enseña de Dios y qué pide de mí.",
              "La meditación bíblica es dejar la mente en blanco.",
              "Dios le dijo a Josué que meditara en la ley de día y de noche.",
            ],
            malo: 2,
            correccion: "La meditación bíblica no deja la mente en blanco: la llena con la Palabra de Dios.",
            apoyo: "La meditación que enseña la Biblia no es dejar la mente en blanco: es llenarla con la Palabra de Dios y obedecerla.",
            ref: "Josué 1:8",
            explica: "Meditar no es vaciar la mente: es llenarla con la Palabra de Dios para obedecerla.",
          },
          {
            consigna: "Así medita Andrea en la Biblia. Una de estas frases tiene un error: tócala.",
            frases: [
              "Andrea piensa despacio en un pasaje.",
              "Andrea repite el pasaje varias veces.",
              "Andrea se pregunta qué pide de ella ese pasaje.",
              "Andrea medita, pero no piensa obedecer lo que lee.",
            ],
            malo: 3,
            correccion: "La meditación bíblica llena la mente con la Escritura para obedecerla.",
            apoyo: "la meditación bíblica llena la mente con la Escritura para obedecerla",
            ref: "Josué 1:8",
            explica: "Dios le dijo a Josué que meditara para hacer conforme a lo que estaba escrito: meditar lleva a obedecer.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu hermano menor te dice: Quiero leer la Biblia, pero abro donde caiga y a los pocos días lo dejo.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Lee solo los días en que sientas ganas; así nunca se va a volver una carga.", explica: "Muchos creyentes aman la Biblia, pero pocos la leen con constancia: hace falta un plan." },
              { texto: "Empieza con diez capítulos cada día, para avanzar rápido por toda la Biblia.", explica: "No se trata de leer mucho de prisa: un versículo meditado vale más que diez leídos de prisa." },
              { texto: "Sigue un plan de lectura, como un capítulo en la mañana y otro en la noche.", bien: true, explica: "Leer con un plan da constancia y ayuda a conocer toda la Biblia." },
              { texto: "No leas solo en casa: escucha la Palabra solamente el domingo en la iglesia.", explica: "La Palabra es el alimento del alma: se recibe cada día." },
            ],
            apoyo: "Leer: con un plan (por ejemplo, un capítulo por la mañana y otro por la noche), para conocer toda la Biblia.",
            ref: "Salmos 1:2",
            explica: "La Palabra recibida cada día da estabilidad y fruto: un plan ayuda a leerla con constancia.",
          },
          {
            caso: "Una compañera de trabajo que acaba de creer te escribe: Quiero leer la Biblia cada día. ¿Cómo hago para no dejarlo?",
            pregunta: "¿Qué le sugieres?",
            opciones: [
              { texto: "Lee cuando te sobre tiempo; si un día no puedes, no le des importancia.", explica: "Sin un plan, la lectura se pierde: muchos aman la Biblia, pero pocos la leen con constancia." },
              { texto: "Elige un plan de lectura y una hora de tu día, y empieza esta semana.", bien: true, explica: "Un plan y una hora del día ayudan a leer con constancia." },
              { texto: "Lee muchos capítulos de una vez el fin de semana, y así ya no te atrasas.", explica: "No se trata de leer mucho de prisa: un versículo meditado vale más que diez leídos de prisa." },
              { texto: "Espera a terminar la academia, y después vas a saber cómo leerla bien.", explica: "La Palabra es el alimento del alma: no hace falta esperar para empezar." },
            ],
            apoyo: "Muchos creyentes aman la Biblia, pero pocos la leen con constancia.",
            ref: "Salmos 1:2-3",
            explica: "Elegir un plan y una hora del día ayuda a recibir la Palabra con constancia, como el árbol plantado junto a corrientes de aguas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La meditación que enseña la Biblia no es dejar la mente en blanco: es llenarla con la Palabra de Dios y obedecerla.",
            ref: "Josué 1:8",
            clave: {
              id: "pr-n2-disciplinas-2-a6-1",
              tipo: "corta",
              pregunta: "¿Qué es la meditación bíblica?",
              ideas: [
                { id: "pensar", peso: 35, texto: "Es pensar despacio en un pasaje, repetirlo y preguntarse qué enseña de Dios y qué pide de mí.", formas: ["pensar despacio", "pens* (en|un) (pasaje|versiculo|texto)", "repet*", "pregunt*", "reflexion*", "que ensena de dios", "que pide de mi"] },
                { id: "llenar", peso: 35, texto: "Llena la mente con la Palabra de Dios; no la deja en blanco.", formas: ["llen* la mente", "llenarla", "llen* (con|de) la (palabra|escritura|biblia)", "no es dejar la mente en blanco", "mente atenta"] },
                { id: "obedecer", peso: 30, texto: "Se medita para obedecer la Palabra.", formas: ["obedec*", "hacer conforme", "cumpli*", "poner* en practica", "vivir lo que"] },
              ],
              modelo: "Es pensar despacio en un pasaje, repetirlo y preguntarme qué enseña de Dios y qué pide de mí. No es dejar la mente en blanco: es llenarla con la Palabra para obedecerla.",
            },
          },
          {
            apoyo: "Dios le dijo a Josué que meditara en el libro de la ley de día y de noche, para hacer conforme a todo lo que en él está escrito.",
            ref: "Josué 1:8",
            clave: {
              id: "pr-n2-disciplinas-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué le dijo Dios a Josué sobre meditar, y para qué?",
              ideas: [
                { id: "dia-noche", peso: 50, texto: "Le dijo que meditara en el libro de la ley de día y de noche.", formas: ["dia noche", "cada dia", "todos los dias", "medit* ley", "medit* libro", "medit* palabra"] },
                { id: "obedecer", peso: 50, texto: "Para hacer conforme a todo lo que está escrito: para obedecer.", formas: ["obedec*", "hacer conforme", "hacer (lo|todo) (que|lo)", "cumpli*", "poner* en practica", "para hacer"] },
              ],
              modelo: "Dios le dijo a Josué que meditara en el libro de la ley de día y de noche, para hacer conforme a todo lo que en él está escrito. La meditación lleva a obedecer.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. La oración y el ayuno
    "n2-disciplinas-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué tres cosas habla Jesús en el Sermón del monte?", reverso: "De dar, de orar y de ayunar.", apoyo: "En el Sermón del monte, Jesús habla de dar, de orar y de ayunar." },
              { frente: "¿Qué daba por hecho Jesús al decir «cuando ores» y «cuando ayunes»?", reverso: "Que sus discípulos orarían y ayunarían.", apoyo: "Daba por hecho que sus discípulos lo harían." },
              { frente: "¿Qué es la oración?", reverso: "Conversación con un Padre que escucha.", apoyo: "La oración es conversación con un Padre que escucha." },
              { frente: "¿Qué modelo nos da Jesús para orar?", reverso: "El Padre Nuestro: adorar, pedir su reino, el pan, el perdón y la protección.", apoyo: "El Padre Nuestro nos da el modelo: adorar, pedir su reino, pedir el pan, el perdón y la protección" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo enseña Jesús a orar al Padre?", reverso: "En lo secreto, sin buscar ser vistos.", apoyo: "Jesús enseña a orar al Padre en lo secreto, sin buscar ser vistos" },
              { frente: "¿Qué es ayunar?", reverso: "Abstenerse de comida por un tiempo para buscar a Dios con más intensidad.", apoyo: "Ayunar es abstenerse de comida por un tiempo para buscar a Dios con más intensidad." },
              { frente: "¿Qué hacía la iglesia de Antioquía cuando el Espíritu apartó a Bernabé y a Saulo?", reverso: "Ayunaba y oraba.", apoyo: "La iglesia de Antioquía ayunaba y oraba cuando el Espíritu Santo apartó a Bernabé y a Saulo para la obra" },
              { frente: "¿Qué cambia la oración en lo secreto?", reverso: "La vida en público.", apoyo: "La oración en lo secreto cambia la vida en público." },
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
            consigna: "Según Jesús, ¿dónde ve el Padre a quien ora? Toca la palabra.",
            texto: "tu Padre que ve en lo [[secreto]] te recompensará en público",
            ref: "Mateo 6:6",
            apoyo: "Jesús enseña a orar al Padre en lo secreto, sin buscar ser vistos",
            explica: "Jesús enseña a orar en lo secreto, sin buscar ser vistos: el Padre ve en lo secreto.",
          },
          {
            consigna: "¿Qué promete Jesús que hará el Padre, y dónde? Toca las dos palabras.",
            texto: "tu Padre que ve en lo secreto te [[recompensará]] en [[público]]",
            ref: "Mateo 6:6",
            apoyo: "La oración en lo secreto cambia la vida en público.",
            explica: "Quien ora en lo secreto, sin buscar ser visto, recibe la recompensa del Padre en público.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el modelo de oración del Padre Nuestro, del primer paso al último.",
            pasos: ["Adorar al Padre", "Pedir que venga su reino", "Pedir el pan", "Pedir perdón", "Pedir protección"],
            apoyo: "El Padre Nuestro nos da el modelo: adorar, pedir su reino, pedir el pan, el perdón y la protección",
            ref: "Mateo 6:9-13",
            explica: "El Padre Nuestro empieza adorando y pidiendo su reino; después pide el pan, el perdón y la protección.",
          },
          {
            consigna: "Rosa ora con el modelo del Padre Nuestro. ¿En qué orden ora?",
            pasos: ["Adora a Dios como su Padre", "Pide que venga el reino de Dios", "Pide el pan para su familia", "Pide perdón por sus pecados", "Pide que Dios la proteja"],
            apoyo: "La oración es conversación con un Padre que escucha.",
            ref: "Mateo 6:9-13",
            explica: "Rosa sigue el modelo que dio Jesús: adorar, pedir su reino, el pan, el perdón y la protección.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un propósito del ayuno bíblico o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Propósito del ayuno bíblico", "No es un propósito del ayuno"],
            frases: [
              { texto: "Humillarse delante de Dios", grupo: 0 },
              { texto: "Buscar la dirección de Dios", grupo: 0 },
              { texto: "Interceder por otros", grupo: 0 },
              { texto: "Fortalecerse contra la tentación", grupo: 0 },
              { texto: "Que otros vean que estás ayunando", grupo: 1, explica: "Jesús enseñó a ayunar sin ostentación." },
              { texto: "Parecer religioso y seguir en la injusticia", grupo: 1, explica: "Por medio de Isaías, Dios reprendió un ayuno religioso que convivía con la injusticia." },
            ],
            apoyo: "Se ayuna para humillarse delante de Dios, para buscar su dirección, para interceder y para fortalecerse contra la tentación.",
            ref: "Mateo 6:16-18",
            explica: "El ayuno bíblico busca a Dios con más intensidad: para humillarse, buscar su dirección, interceder y fortalecerse. No es para que otros lo vean.",
          },
          {
            consigna: "¿Es ayuno bíblico o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Es ayuno bíblico", "No es ayuno bíblico"],
            frases: [
              { texto: "Dejar una comida para orar por un amigo enfermo", grupo: 0, explica: "Hay ayunos de una comida, y se ayuna para interceder." },
              { texto: "Ayunar un día para buscar la dirección de Dios", grupo: 0 },
              { texto: "Hacer un ayuno parcial para buscar a Dios", grupo: 0, explica: "Hay ayunos de un día o de una comida, y ayunos parciales." },
              { texto: "Con un problema de salud, ayunar de otras cosas", grupo: 0, explica: "Quien tiene problemas de salud debe consultar a su médico y puede ayunar de otras cosas." },
              { texto: "Ayunar y contarlo a todos para que te admiren", grupo: 1, explica: "Jesús enseñó a ayunar sin ostentación." },
              { texto: "Ayunar y seguir tratando mal a tus empleados", grupo: 1, explica: "Dios reprendió un ayuno religioso que convivía con la injusticia." },
              { texto: "Dejar de comer sin buscar a Dios", grupo: 1, explica: "Ayunar es abstenerse de comida para buscar a Dios con más intensidad." },
            ],
            apoyo: "Ayunar es abstenerse de comida por un tiempo para buscar a Dios con más intensidad.",
            ref: "Mateo 6:16-18; Isaías 58:6-7",
            explica: "El ayuno bíblico busca a Dios, sin ostentación y unido a la justicia; puede ser de un día, de una comida o parcial.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu tía, que tiene un problema de salud, te dice: Quiero ayunar con la iglesia esta semana, pero no sé si puedo.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Si no dejas toda la comida, tu ayuno no sirve; aguanta, que Dios te cuida.", explica: "La lección pide que quien tiene problemas de salud consulte a su médico." },
              { texto: "Consulta a tu médico; también puedes ayunar de otras cosas y buscar a Dios.", bien: true, explica: "Así lo enseña la lección: consultar al médico y, si hace falta, ayunar de otras cosas." },
              { texto: "Con tu salud, olvídate de ayunar: esa disciplina no es para personas como tú.", explica: "Quien tiene problemas de salud puede ayunar de otras cosas: la disciplina también es para ella." },
              { texto: "Haz el ayuno completo, pero no se lo cuentes a tu médico para que no se oponga.", explica: "Quien tiene problemas de salud debe consultar a su médico." },
            ],
            apoyo: "Quien tiene problemas de salud debe consultar a su médico y puede ayunar de otras cosas.",
            ref: "Mateo 6:16-18",
            explica: "El ayuno busca a Dios con más intensidad; con problemas de salud, se consulta al médico y se puede ayunar de otras cosas.",
          },
          {
            caso: "Un amigo de la iglesia te escribe: Hoy dejé de comer, pero no oré ni leí nada. ¿Eso ya es ayunar?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Sí: lo importante es no comer; orar durante el ayuno es solo un detalle.", explica: "Sin buscar a Dios, dejar de comer no es el ayuno que enseña la Biblia." },
              { texto: "No: un ayuno solo vale si dura varios días seguidos sin comer nada.", explica: "Hay ayunos de un día o de una comida, y ayunos parciales." },
              { texto: "Sí, y si lo cuentas en la iglesia, vas a ser un ejemplo para todos.", explica: "Jesús enseñó a ayunar sin ostentación." },
              { texto: "Ayunar es dejar la comida para buscar a Dios: usa ese tiempo para orar.", bien: true, explica: "El ayuno bíblico no es solo dejar de comer: es buscar a Dios con más intensidad." },
            ],
            apoyo: "Ayunar es abstenerse de comida por un tiempo para buscar a Dios con más intensidad.",
            ref: "Mateo 6:16-18",
            explica: "El ayuno bíblico une el dejar de comer con buscar a Dios: humillarse, pedir su dirección, interceder o fortalecerse.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "El ayuno que Dios escogió, según Isaías 58: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios reprendió un ayuno religioso que convivía con la injusticia.", verdad: true, explica: "Por medio de Isaías, Dios reprendió ese ayuno: no basta con dejar de comer.", apoyo: "Por medio de Isaías, Dios reprendió un ayuno religioso que convivía con la injusticia.", ref: "Isaías 58:6-7" },
              { texto: "Para Dios basta con dejar de comer, aunque se trate mal a los demás.", verdad: false, explica: "El ayuno que Dios escogió va unido a la justicia y la misericordia.", apoyo: "El ayuno que Él escogió va unido a soltar las cargas de los oprimidos", ref: "Isaías 58:6" },
              { texto: "El ayuno que Dios escogió incluye compartir el pan con el hambriento.", verdad: true, explica: "Así lo dice Isaías 58: compartir el pan con el hambriento y no esconderse del necesitado.", apoyo: "compartir el pan con el hambriento y no esconderse del necesitado", ref: "Isaías 58:7" },
            ],
          },
          {
            consigna: "El ayuno que agrada a Dios, según Isaías 58: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El ayuno que Dios escoge va unido a la justicia y la misericordia.", verdad: true, explica: "Isaías 58 une el ayuno con la justicia y la misericordia.", apoyo: "el que Él escoge va unido a la justicia y la misericordia", ref: "Isaías 58:6-7" },
              { texto: "En el ayuno que agrada a Dios, uno se esconde del necesitado.", verdad: false, explica: "Es al revés: el ayuno que Dios escogió es no esconderse del necesitado.", apoyo: "no esconderse del necesitado", ref: "Isaías 58:7" },
              { texto: "Soltar las cargas de los oprimidos es parte del ayuno que Dios escogió.", verdad: true, explica: "Así lo dice Isaías 58:6.", apoyo: "soltar las cargas de los oprimidos", ref: "Isaías 58:6" },
              { texto: "Según Isaías, el ayuno que agrada a Dios solo tiene que ver con la comida.", verdad: false, explica: "El ayuno que Dios escogió es más que dejar de comer: va unido a la justicia y la misericordia.", apoyo: "Más que dejar de comer", ref: "Isaías 58:6-7" },
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
            apoyo: "El ayuno que Él escogió va unido a soltar las cargas de los oprimidos, compartir el pan con el hambriento y no esconderse del necesitado.",
            ref: "Isaías 58:6-7",
            clave: {
              id: "pr-n2-disciplinas-3-a7-1",
              tipo: "corta",
              pregunta: "Según Isaías 58, ¿qué ayuno agrada a Dios?",
              ideas: [
                { id: "mas", peso: 40, texto: "Uno que es más que dejar de comer: Dios reprendió el ayuno religioso que convivía con la injusticia.", formas: ["mas que (dejar|comer)", "no basta", "no solo", "reprendi*", "injust*"] },
                { id: "justicia", peso: 60, texto: "Uno unido a la justicia y la misericordia: soltar las cargas de los oprimidos, compartir el pan con el hambriento y no esconderse del necesitado.", formas: ["justicia", "misericordia", "solt* cargas", "compart* pan", "hambrient*", "necesitad*", "oprimid*"] },
              ],
              modelo: "Agrada a Dios un ayuno que es más que dejar de comer: va unido a la justicia y la misericordia, como soltar las cargas de los oprimidos y compartir el pan con el hambriento.",
            },
          },
          {
            apoyo: "Por medio de Isaías, Dios reprendió un ayuno religioso que convivía con la injusticia.",
            ref: "Isaías 58:6-7",
            clave: {
              id: "pr-n2-disciplinas-3-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué Dios reprendió por medio de Isaías un ayuno religioso, y qué ayuno escogió?",
              ideas: [
                { id: "injusticia", peso: 50, texto: "Porque convivía con la injusticia.", formas: ["injust*", "conviv*", "maltrat*", "trat* mal"] },
                { id: "escogio", peso: 50, texto: "El ayuno que Dios escogió va unido a la justicia y la misericordia.", formas: ["justicia", "misericordia", "solt* cargas", "compart* pan", "hambrient*", "necesitad*", "oprimid*"] },
              ],
              modelo: "Porque era un ayuno que convivía con la injusticia. El que Dios escogió va unido a soltar las cargas de los oprimidos, compartir el pan con el hambriento y no esconderse del necesitado.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. La adoración y el día del Señor
    "n2-disciplinas-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué adoradores busca el Padre, según le dijo Jesús a la samaritana?", reverso: "Adoradores que lo adoren en espíritu y en verdad.", apoyo: "Jesús le dijo a la mujer samaritana que el Padre busca adoradores que lo adoren «en espíritu y en verdad»." },
              { frente: "¿Qué es adorar en espíritu?", reverso: "Adorar con todo el corazón, guiados por el Espíritu Santo.", apoyo: "En espíritu: con todo el corazón, guiados por el Espíritu Santo." },
              { frente: "¿Qué es adorar en verdad?", reverso: "Adorar conforme a lo que Dios ha revelado de sí mismo en su Palabra.", apoyo: "En verdad: conforme a lo que Dios ha revelado de sí mismo en su Palabra." },
              { frente: "¿Adorar es solo cantar los domingos?", reverso: "No: es darle a Dios el lugar que merece en todo lo que somos.", apoyo: "Adorar no es solo cantar los domingos. Es darle a Dios el lugar que merece en todo lo que somos." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde comienza la adoración?", reverso: "En el corazón.", apoyo: "La adoración comienza en el corazón, llena la vida diaria y se expresa también junto a la iglesia." },
              { frente: "¿Qué es la adoración personal?", reverso: "Cantar, dar gracias y alabar a Dios en la vida diaria.", apoyo: "La adoración personal: cantar, dar gracias y alabar a Dios en la vida diaria" },
              { frente: "¿Qué hacemos en la adoración congregacional?", reverso: "Nos reunimos con la iglesia para alabar, orar, escuchar la Palabra y participar de la Cena.", apoyo: "La adoración congregacional: reunirnos con la iglesia para alabar, orar, escuchar la Palabra y participar de la Cena del Señor." },
              { frente: "¿Por qué los primeros cristianos se reunían el primer día de la semana?", reverso: "Porque es el día en que Jesús resucitó.", apoyo: "Los primeros cristianos se reunían el primer día de la semana, el día en que Jesús resucitó, para partir el pan" },
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
            consigna: "Completa qué significa adorar en espíritu y en verdad.",
            texto: "Adorar en [[espíritu]] es adorar con todo el [[corazón]], guiados por el Espíritu Santo. Adorar en [[verdad]] es adorar conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
            distractores: ["domingo", "miedo", "apariencia"],
            errores: {
              domingo: "Adorar no es solo cantar los domingos: en espíritu es con todo el corazón.",
              apariencia: "En verdad es conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
            },
            apoyo: "En espíritu: con todo el corazón, guiados por el Espíritu Santo. En verdad: conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
            ref: "Juan 4:23-24",
            explica: "En espíritu: con todo el corazón, guiados por el Espíritu Santo. En verdad: conforme a lo que Dios reveló de sí mismo en su Palabra.",
          },
          {
            consigna: "Completa la idea clave sobre la adoración.",
            texto: "Adorar en espíritu y en verdad es darle a Dios todo el [[corazón]] conforme a su [[Palabra]].",
            distractores: ["dinero", "costumbre"],
            errores: {
              costumbre: "En verdad es conforme a lo que Dios ha revelado de sí mismo en su Palabra, no a la costumbre.",
              dinero: "Adorar es darle a Dios todo el corazón: el lugar que merece en todo lo que somos.",
            },
            apoyo: "Adorar en espíritu y en verdad es darle a Dios todo el corazón conforme a su Palabra",
            ref: "Juan 4:23-24",
            explica: "Adorar en espíritu es con todo el corazón; en verdad, conforme a la Palabra. Esa adoración llena toda la vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es adoración personal o congregacional? Lleva cada frase a su grupo.",
            grupos: ["Personal, en la vida diaria", "Congregacional, con la iglesia"],
            frases: [
              { texto: "Cantarle a Dios mientras cocinas", grupo: 0 },
              { texto: "Dar gracias a Dios camino al trabajo", grupo: 0 },
              { texto: "Alabar a Dios a solas en tu cuarto", grupo: 0 },
              { texto: "Participar de la Cena del Señor", grupo: 1 },
              { texto: "Escuchar la Palabra en la reunión de la iglesia", grupo: 1 },
              { texto: "Orar junto con los hermanos de la iglesia", grupo: 1 },
            ],
            apoyo: "La adoración personal: cantar, dar gracias y alabar a Dios en la vida diaria",
            ref: "Salmos 34:1",
            explica: "La adoración personal se vive en el día a día; la congregacional, al reunirnos con la iglesia para alabar, orar, escuchar la Palabra y participar de la Cena.",
          },
          {
            consigna: "¿Carmen adora a solas o reunida con la iglesia? Lleva cada frase a su grupo.",
            grupos: ["A solas, en su vida diaria", "Reunida con la iglesia"],
            frases: [
              { texto: "Le da gracias a Dios al despertar", grupo: 0 },
              { texto: "Canta alabanzas mientras limpia la casa", grupo: 0 },
              { texto: "Alaba a Dios camino al trabajo", grupo: 0 },
              { texto: "Alaba a Dios con los hermanos el domingo", grupo: 1 },
              { texto: "Participa de la Cena del Señor", grupo: 1 },
              { texto: "Escucha la Palabra en la reunión de la iglesia", grupo: 1 },
              { texto: "Ora junto con la iglesia reunida", grupo: 1 },
            ],
            apoyo: "La adoración congregacional: reunirnos con la iglesia para alabar, orar, escuchar la Palabra y participar de la Cena del Señor.",
            ref: "Hebreos 10:24-25",
            explica: "Carmen adora a solas en su vida diaria y también junto a la iglesia: las dos son parte de una vida de adoración.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el día del Señor: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los primeros cristianos se reunían el primer día de la semana para partir el pan.", verdad: true, explica: "Así lo cuenta Hechos 20:7: se reunían el día en que Jesús resucitó.", apoyo: "Los primeros cristianos se reunían el primer día de la semana, el día en que Jesús resucitó, para partir el pan", ref: "Hechos 20:7" },
              { texto: "El día del Señor es una carga que Dios nos impone.", verdad: false, explica: "Jesús enseñó que el día de reposo fue hecho por causa del hombre: es un regalo, no una carga.", apoyo: "Jesús enseñó que el día de reposo fue hecho por causa del hombre (Marcos 2:27): un regalo, no una carga.", ref: "Marcos 2:27" },
              { texto: "Juan llama al primer día de la semana el día del Señor.", verdad: true, explica: "Así lo llama Juan en Apocalipsis 1:10.", apoyo: "Juan lo llama el día del Señor", ref: "Apocalipsis 1:10" },
              { texto: "El día del Señor recuerda el día en que Jesús nació.", verdad: false, explica: "Recuerda el día en que Jesús resucitó: el primer día de la semana.", apoyo: "el día en que Jesús resucitó", ref: "Hechos 20:7" },
            ],
          },
          {
            consigna: "Sobre el día del Señor: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El primer día de la semana es el día en que Jesús resucitó.", verdad: true, explica: "Por eso los primeros cristianos se reunían ese día.", apoyo: "el primer día de la semana, el día en que Jesús resucitó", ref: "Hechos 20:7" },
              { texto: "El día del Señor es solo para descansar, sin reunirse con la iglesia.", verdad: false, explica: "Es un día para adorar con la iglesia, descansar y hacer el bien.", apoyo: "Es un día para adorar con la iglesia, descansar y hacer el bien." },
              { texto: "Jesús enseñó que el día de reposo fue hecho por causa del hombre.", verdad: true, explica: "Así lo dice Marcos 2:27: es un regalo, no una carga.", apoyo: "Jesús enseñó que el día de reposo fue hecho por causa del hombre", ref: "Marcos 2:27" },
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
            caso: "Un compañero de trabajo te dice: El domingo es mi único día libre; ir a la iglesia me quita el descanso.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: el domingo es para dormir; a Dios lo puedes adorar otro día.", explica: "El día del Señor es también para adorar con la iglesia, no solo para descansar." },
              { texto: "Ir a la iglesia es una obligación: aunque no quieras, tienes que cumplir.", explica: "Jesús enseñó que el día de reposo es un regalo, no una carga." },
              { texto: "Ese día es un regalo: puedes adorar con la iglesia, descansar y hacer el bien.", bien: true, explica: "Así lo enseña la lección: es un día para adorar con la iglesia, descansar y hacer el bien." },
              { texto: "Si faltas un domingo, Dios va a dejar de bendecirte en todo lo demás que hagas.", explica: "Presentarlo como una amenaza lo vuelve una carga; Jesús enseñó que es un regalo." },
            ],
            apoyo: "Es un día para adorar con la iglesia, descansar y hacer el bien.",
            ref: "Marcos 2:27",
            explica: "El día del Señor no le quita el descanso: es un regalo para adorar con la iglesia, descansar y hacer el bien.",
          },
          {
            caso: "Tu sobrino te pregunta: ¿Por qué la iglesia se reúne el domingo, el primer día de la semana?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Porque así lo decidieron hace poco algunas iglesias, por comodidad de la gente.", explica: "No es algo nuevo: los primeros cristianos ya se reunían el primer día de la semana." },
              { texto: "Porque Jesús resucitó ese día, y así se reunían ya los primeros cristianos.", bien: true, explica: "El primer día de la semana es el día en que Jesús resucitó; Juan lo llama el día del Señor." },
              { texto: "Porque es el único día de la semana en que se puede adorar a Dios de verdad.", explica: "La adoración no es de un solo día: la adoración personal llena la vida diaria." },
              { texto: "Porque ese día casi nadie trabaja, y eso es lo único que importa para reunirse.", explica: "No se trata solo de no trabajar: la iglesia se reúne porque ese día Jesús resucitó." },
            ],
            apoyo: "Los primeros cristianos se reunían el primer día de la semana, el día en que Jesús resucitó, para partir el pan",
            ref: "Hechos 20:7; Apocalipsis 1:10",
            explica: "Los primeros cristianos se reunían el primer día de la semana, el día en que Jesús resucitó: por eso es el día del Señor.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En espíritu: con todo el corazón, guiados por el Espíritu Santo. En verdad: conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
            ref: "Juan 4:23-24",
            clave: {
              id: "pr-n2-disciplinas-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué significa adorar en espíritu y en verdad?",
              ideas: [
                { id: "espiritu", peso: 50, texto: "En espíritu: con todo el corazón, guiados por el Espíritu Santo.", formas: ["todo el corazon", "con el corazon", "de corazon", "guiad* por el espiritu", "espiritu santo"] },
                { id: "verdad", peso: 50, texto: "En verdad: conforme a lo que Dios ha revelado de sí mismo en su Palabra.", formas: ["conforme a (la|su) palabra", "segun (la|su) (palabra|biblia)", "revel*", "lo que dice la biblia", "su palabra", "la palabra"] },
              ],
              modelo: "Adorar en espíritu es adorar con todo el corazón, guiados por el Espíritu Santo. Adorar en verdad es hacerlo conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
            },
          },
          {
            apoyo: "Adorar en espíritu y en verdad es darle a Dios todo el corazón conforme a su Palabra",
            ref: "Juan 4:23-24",
            clave: {
              id: "pr-n2-disciplinas-4-a6-2",
              tipo: "corta",
              pregunta: "Una amiga te dice: Para adorar me basta sentirlo; no importa lo que diga la Biblia. ¿Qué le explicas sobre adorar en espíritu y en verdad?",
              ideas: [
                { id: "espiritu", peso: 40, texto: "Adorar en espíritu es con todo el corazón, guiados por el Espíritu Santo.", formas: ["todo el corazon", "con el corazon", "de corazon", "guiad* por el espiritu", "espiritu santo"] },
                { id: "verdad", peso: 60, texto: "Adorar en verdad es conforme a lo que Dios ha revelado de sí mismo en su Palabra.", formas: ["conforme a (la|su) palabra", "segun (la|su) (palabra|biblia)", "revel*", "su palabra", "la palabra"] },
              ],
              modelo: "Adorar en espíritu es hacerlo con todo el corazón, guiados por el Espíritu Santo. Pero también es adorar en verdad, conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. Silencio, soledad y el diario espiritual
    "n2-disciplinas-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuándo se levantó Jesús para ir a orar a un lugar desierto?", reverso: "Muy de mañana, siendo aún muy oscuro.", apoyo: "Muy de mañana, siendo aún muy oscuro, Jesús se levantó y fue a un lugar desierto, y allí oraba." },
              { frente: "Si el silencio y la soledad no son huir de la gente, ¿qué son?", reverso: "Apartarse un tiempo para estar con Dios y volver renovados a servir.", apoyo: "El silencio y la soledad no son huir de la gente, sino apartarse un tiempo para estar con Dios y volver renovados a servir." },
              { frente: "¿Cómo es la mente en el silencio bíblico?", reverso: "Atenta a Dios y a su Palabra, no vacía.", apoyo: "El silencio bíblico no es una mente vacía: es una mente atenta a Dios y a su Palabra." },
              { frente: "¿Qué nos hace difícil escuchar a Dios hoy?", reverso: "El ruido: el teléfono, las noticias, las redes y las prisas.", apoyo: "Vivimos rodeados de ruido: el teléfono, las noticias, las redes, las prisas." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dice Dios en el Salmo 46:10?", reverso: "«Estad quietos, y conoced que yo soy Dios».", apoyo: "Dios dice: «Estad quietos, y conoced que yo soy Dios»." },
              { frente: "¿Qué es un diario espiritual?", reverso: "Un cuaderno donde escribes lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él.", apoyo: "Un diario espiritual es un cuaderno donde escribes lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él." },
              { frente: "¿Qué le pedía David a Dios en el Salmo 139?", reverso: "«Examíname, oh Dios, y conoce mi corazón».", apoyo: "David le pedía a Dios: «Examíname, oh Dios, y conoce mi corazón»." },
              { frente: "¿Para qué ayuda el diario espiritual?", reverso: "Para recordar las obras de Dios.", apoyo: "Ayuda a recordar las obras de Dios" },
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
            consigna: "¿Cómo nos pide Dios que estemos para conocerlo? Toca la palabra.",
            texto: "Estad [[quietos]], y conoced que yo soy Dios",
            ref: "Salmos 46:10",
            apoyo: "El silencio bíblico no es una mente vacía: es una mente atenta a Dios y a su Palabra.",
            explica: "Dios nos llama a estar quietos para conocerlo: el silencio bíblico es una mente atenta a Dios.",
          },
          {
            consigna: "¿Qué podemos hacer cuando estamos quietos delante de Dios? Toca la palabra.",
            texto: "Estad quietos, y [[conoced]] que yo soy Dios",
            ref: "Salmos 46:10",
            apoyo: "Dios habla también en el silencio.",
            explica: "En el silencio, atentos a Dios, lo conocemos: por eso el silencio es una disciplina bíblica.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se vive un tiempo de soledad con Dios, del primer paso al último.",
            pasos: ["Apartarse un tiempo, lejos del ruido", "Estar a solas con Dios", "Volver renovado", "Servir a los demás"],
            apoyo: "El silencio y la soledad no son huir de la gente, sino apartarse un tiempo para estar con Dios y volver renovados a servir.",
            ref: "Marcos 1:35",
            explica: "La soledad con Dios no es huir de la gente: uno se aparta un tiempo, está con Dios y vuelve renovado a servir.",
          },
          {
            consigna: "Lucía sigue el ejemplo de Jesús en Marcos 1:35. ¿En qué orden lo hace?",
            pasos: ["Se levanta temprano, cuando todavía está oscuro", "Se va a un lugar tranquilo, sin el teléfono", "Ora a solas con el Padre", "Vuelve renovada a servir a su familia"],
            apoyo: "Jesús buscaba lugares tranquilos para estar a solas con el Padre.",
            ref: "Marcos 1:35",
            explica: "Como Jesús, Lucía se aparta muy temprano para orar a solas, y vuelve renovada a servir.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es un diario espiritual.",
            texto: "Un diario espiritual es un [[cuaderno]] donde escribes lo que Dios te [[enseña]], tus [[oraciones]], sus respuestas y lo que vives con Él.",
            distractores: ["horario", "debe", "compras"],
            errores: {
              debe: "En el diario escribes lo que Dios te enseña, tus oraciones y sus respuestas.",
            },
            apoyo: "Un diario espiritual es un cuaderno donde escribes lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él.",
            ref: "Salmos 77:11-12",
            explica: "En el diario espiritual escribes lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él.",
          },
          {
            consigna: "Completa para qué sirve el diario espiritual.",
            texto: "El diario espiritual ayuda a [[recordar]] las obras de Dios, como el salmista que se acordaba de las obras de Jehová y [[meditaba]] en ellas.",
            distractores: ["olvidar", "dudaba"],
            errores: {
              olvidar: "El diario sirve para lo contrario: para recordar las obras de Dios.",
            },
            apoyo: "Ayuda a recordar las obras de Dios, como el salmista que se acordaba de las obras de Jehová y meditaba en ellas.",
            ref: "Salmos 77:11-12",
            explica: "Escribir lo que Dios hace nos ayuda a recordar sus obras y a meditar en ellas, como el salmista.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu amiga te escribe: Quiero empezar un diario espiritual, pero no sé qué poner en él.",
            pregunta: "¿Qué le sugieres?",
            opciones: [
              { texto: "Copia solo versículos, sin escribir nada de lo que vives cada día con Dios.", explica: "El diario incluye también tus oraciones, sus respuestas y lo que vives con Dios." },
              { texto: "Anota los defectos de los hermanos, para orar por ellos cuando tengas tiempo.", explica: "El diario es para escribir lo que Dios te enseña y lo que vives con Él." },
              { texto: "Escribe lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives.", bien: true, explica: "Eso es un diario espiritual: lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él." },
              { texto: "No hace falta escribir nada: Dios ya lo sabe todo, así que basta con recordar.", explica: "Escribir ayuda a recordar las obras de Dios, como el salmista." },
            ],
            apoyo: "Un diario espiritual es un cuaderno donde escribes lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él.",
            ref: "Salmos 77:11-12",
            explica: "El diario espiritual guarda lo que Dios te enseña y lo que vives con Él, y te ayuda a recordar sus obras.",
          },
          {
            caso: "Un hermano de tu grupo te dice: Dios respondió una oración mía hace años, pero ya ni me acuerdo cómo fue.",
            pregunta: "¿Qué le recomiendas para la próxima vez?",
            opciones: [
              { texto: "No importa: lo pasado ya pasó, y no vale la pena mirar hacia atrás.", explica: "Recordar las obras de Dios es bueno: el salmista se acordaba de ellas y meditaba en ellas." },
              { texto: "Anota en un diario espiritual tus oraciones y las respuestas que Dios te da.", bien: true, explica: "El diario ayuda a recordar las obras de Dios, como el salmista." },
              { texto: "Cuéntalo muchas veces en la iglesia, para que nadie se olvide de lo que hiciste.", explica: "Lo que ayuda a recordar es escribir: el diario guarda las obras de Dios." },
              { texto: "Ora solo por cosas muy grandes, que así es más fácil acordarte de las respuestas.", explica: "En el diario escribes tus oraciones y sus respuestas: así recuerdas las obras de Dios." },
            ],
            apoyo: "Ayuda a recordar las obras de Dios, como el salmista que se acordaba de las obras de Jehová y meditaba en ellas.",
            ref: "Salmos 77:11-12",
            explica: "Escribir tus oraciones y sus respuestas te ayuda a recordar las obras de Dios y a meditar en ellas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "Al final del día repasas delante de Dios lo que viviste. ¿Qué haces con cada cosa? Elige la relación de cada enlace.",
            nodos: [
              { id: "x", texto: "Al final del día, delante de Dios", x: 50, y: 50 },
              { id: "b", texto: "Lo bueno del día", x: 20, y: 12 },
              { id: "m", texto: "Lo malo del día", x: 80, y: 12 },
              { id: "n", texto: "El día de mañana", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "x", a: "b", relacion: "das gracias por" },
              { de: "x", a: "m", relacion: "confiesas" },
              { de: "x", a: "n", relacion: "pides su guía para" },
            ],
            distractores: ["escondes"],
            apoyo: "Al final del día puedes repasar delante de Dios lo que viviste: dar gracias por lo bueno, confesar lo malo y pedir su guía para mañana.",
            ref: "Salmos 139:23-24",
            explica: "El examen del corazón repasa el día delante de Dios: gracias por lo bueno, confesión de lo malo y su guía para mañana.",
          },
          {
            consigna: "Hoy hiciste el examen del corazón. ¿Qué haces con cada cosa que viviste? Elige la relación de cada enlace.",
            nodos: [
              { id: "x", texto: "Tu examen del corazón", x: 50, y: 50 },
              { id: "a", texto: "La comida con tu familia", x: 20, y: 12 },
              { id: "b", texto: "Las palabras duras a tu hermano", x: 80, y: 12 },
              { id: "c", texto: "La entrevista de mañana", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "x", a: "a", relacion: "agradeces" },
              { de: "x", a: "b", relacion: "le confiesas" },
              { de: "x", a: "c", relacion: "le pides guía para" },
            ],
            distractores: ["justificas"],
            apoyo: "el examen del corazón nos lleva a la gratitud, la confesión y su guía",
            ref: "Salmos 139:23-24",
            explica: "En el examen del corazón das gracias por lo bueno, confiesas lo malo y pides su guía para mañana.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Al final del día puedes repasar delante de Dios lo que viviste: dar gracias por lo bueno, confesar lo malo y pedir su guía para mañana.",
            ref: "Salmos 139:23-24",
            clave: {
              id: "pr-n2-disciplinas-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué haces en el examen del corazón al final del día?",
              ideas: [
                { id: "gracias", peso: 35, texto: "Das gracias a Dios por lo bueno.", formas: ["gracias", "agradec*", "gratitud"] },
                { id: "confesar", peso: 35, texto: "Le confiesas lo malo.", formas: ["confes*", "confies*", "pedir perdon", "pido perdon", "pedirle perdon", "arrepient*"] },
                { id: "guia", peso: 30, texto: "Le pides su guía para mañana.", formas: ["guia*", "guie*", "direccion", "dirij*", "dirig*", "sabiduria"] },
              ],
              modelo: "Al final del día repaso delante de Dios lo que viví: le doy gracias por lo bueno, le confieso lo malo y le pido su guía para mañana.",
            },
          },
          {
            apoyo: "David le pedía a Dios: «Examíname, oh Dios, y conoce mi corazón».",
            ref: "Salmos 139:23-24",
            clave: {
              id: "pr-n2-disciplinas-5-a7-2",
              tipo: "corta",
              pregunta: "Hoy ayudaste a una vecina, le hablaste mal a tu hermano y mañana tienes un examen. ¿Cómo harías esta noche el examen del corazón?",
              ideas: [
                { id: "gracias", peso: 35, texto: "Le darías gracias a Dios por lo bueno.", formas: ["gracias", "agradec*", "gratitud"] },
                { id: "confesar", peso: 35, texto: "Le confesarías lo malo.", formas: ["confes*", "confies*", "pedir perdon", "pediria perdon", "pedirle perdon", "arrepient*"] },
                { id: "guia", peso: 30, texto: "Le pedirías su guía para mañana.", formas: ["guia*", "guie*", "direccion", "dirij*", "dirig*", "sabiduria"] },
              ],
              modelo: "Esta noche repasaría el día delante de Dios: le daría gracias por lo bueno, como ayudar a mi vecina; le confesaría que le hablé mal a mi hermano, y le pediría su guía para mañana.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Servicio, generosidad y una regla de vida
    "n2-disciplinas-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué vino el Hijo del Hombre?", reverso: "No para ser servido, sino para servir y dar su vida en rescate por muchos.", apoyo: "El Hijo del Hombre no vino para ser servido, sino para servir y dar su vida en rescate por muchos." },
              { frente: "¿Por qué servir es una disciplina?", reverso: "Porque va contra el orgullo: busca el bien del otro, también cuando nadie lo ve.", apoyo: "Servir es una disciplina porque va contra el orgullo: buscar el bien del otro, también cuando nadie lo ve." },
              { frente: "¿A quién ama Dios, según 2 Corintios 9:7?", reverso: "Al dador alegre.", apoyo: "porque Dios ama al dador alegre" },
              { frente: "¿De qué libera el corazón dar con orden y generosidad?", reverso: "Del amor al dinero.", apoyo: "Dar con orden y generosidad libera el corazón del amor al dinero." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Las disciplinas son solo hacia adentro?", reverso: "No: también nos mueven hacia los demás.", apoyo: "Las disciplinas no son solo hacia adentro: también nos mueven hacia los demás." },
              { frente: "¿A qué nos llama Pablo en Gálatas 5:13?", reverso: "A servirnos por amor los unos a los otros.", apoyo: "Pablo nos llama a servirnos por amor los unos a los otros" },
              { frente: "¿Cómo da cada uno, según 2 Corintios 9:7?", reverso: "Como propuso en su corazón: no con tristeza, ni por necesidad.", apoyo: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." },
              { frente: "¿Qué hace una regla de vida con las disciplinas?", reverso: "Las ordena en ritmos diarios, semanales y anuales.", apoyo: "una regla de vida ordena las disciplinas en ritmos diarios, semanales y anuales" },
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
            consigna: "Sobre el servicio como disciplina: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Servir va contra el orgullo.", verdad: true, explica: "Por eso servir es una disciplina: busca el bien del otro.", apoyo: "Servir es una disciplina porque va contra el orgullo", ref: "Marcos 10:45" },
              { texto: "Solo vale la pena servir cuando otros lo ven.", verdad: false, explica: "Servir es buscar el bien del otro, también cuando nadie lo ve.", apoyo: "buscar el bien del otro, también cuando nadie lo ve" },
              { texto: "Jesús vino para que sus discípulos lo sirvieran.", verdad: false, explica: "El Hijo del Hombre no vino para ser servido, sino para servir y dar su vida en rescate por muchos.", apoyo: "El Hijo del Hombre no vino para ser servido, sino para servir", ref: "Marcos 10:45" },
            ],
          },
          {
            consigna: "Sobre la generosidad: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios ama al dador alegre.", verdad: true, explica: "Así lo dice 2 Corintios 9:7.", apoyo: "Dios ama al dador alegre", ref: "2 Corintios 9:7" },
              { texto: "Dar con tristeza agrada a Dios igual que dar con alegría.", verdad: false, explica: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad.", apoyo: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad", ref: "2 Corintios 9:7" },
              { texto: "Dar con orden y generosidad libera el corazón del amor al dinero.", verdad: true, explica: "La generosidad es una disciplina: nos libera del amor al dinero.", apoyo: "Dar con orden y generosidad libera el corazón del amor al dinero." },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa por qué servir y dar son disciplinas del discípulo.",
            texto: "Servir es una disciplina porque va contra el [[orgullo]]: buscar el [[bien]] del otro, también cuando nadie lo ve. Y en la generosidad, Dios ama al dador [[alegre]].",
            distractores: ["prójimo", "aplauso", "rico"],
            errores: {
              aplauso: "Servir es buscar el bien del otro, también cuando nadie lo ve.",
              rico: "Dios ama al dador alegre, no al que da más.",
            },
            apoyo: "Servir es una disciplina porque va contra el orgullo: buscar el bien del otro, también cuando nadie lo ve.",
            ref: "Marcos 10:45; 2 Corintios 9:7",
            explica: "Servir va contra el orgullo y busca el bien del otro aunque nadie lo vea; y Dios ama al que da con alegría.",
          },
          {
            consigna: "Completa cómo se da con generosidad.",
            texto: "Cada uno dé como propuso en su [[corazón]]: no con tristeza, ni por necesidad. Dar con [[orden]] y generosidad libera el corazón del amor al [[dinero]].",
            distractores: ["bolsillo", "tristeza", "prójimo"],
            errores: {
              tristeza: "Se da como uno propuso en su corazón: no con tristeza, ni por necesidad.",
              prójimo: "Dar con orden y generosidad libera el corazón del amor al dinero, no del amor al prójimo.",
            },
            apoyo: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.",
            ref: "2 Corintios 9:7",
            explica: "Se da como uno propuso en su corazón y con alegría; dar con orden y generosidad libera del amor al dinero.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué es una regla de vida? Elige la relación de cada enlace.",
            nodos: [
              { id: "r", texto: "Una regla de vida", x: 50, y: 50 },
              { id: "d", texto: "Las disciplinas", x: 20, y: 12 },
              { id: "p", texto: "Perseverar sin cansarnos", x: 80, y: 12 },
              { id: "c", texto: "La comunidad", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "r", a: "d", relacion: "ordena" },
              { de: "r", a: "p", relacion: "nos ayuda a" },
              { de: "r", a: "c", relacion: "se vive mejor en" },
            ],
            distractores: ["reemplaza a"],
            apoyo: "una regla de vida ordena las disciplinas en ritmos diarios, semanales y anuales para perseverar sin cansarnos de hacer el bien",
            ref: "Gálatas 6:9",
            explica: "Una regla de vida ordena las disciplinas en ritmos para perseverar sin cansarnos, y se vive mejor en comunidad.",
          },
          {
            consigna: "¿Qué hace tu plan espiritual? Elige la relación de cada enlace.",
            nodos: [
              { id: "r", texto: "Tu plan espiritual", x: 50, y: 50 },
              { id: "d", texto: "Tus disciplinas", x: 20, y: 12 },
              { id: "b", texto: "No cansarte de hacer el bien", x: 80, y: 12 },
              { id: "o", texto: "Otros creyentes", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "r", a: "d", relacion: "pone en orden" },
              { de: "r", a: "b", relacion: "te ayuda a" },
              { de: "r", a: "o", relacion: "se vive mejor con" },
            ],
            distractores: ["te aparta de"],
            apoyo: "Con otros: las disciplinas se viven mejor en comunidad, como la primera iglesia",
            ref: "Hechos 2:42; Gálatas 6:9",
            explica: "Tu plan pone en orden tus disciplinas para no cansarte de hacer el bien, y se vive mejor con otros creyentes.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Va cada día, cada semana o cada mes o año? Lleva cada práctica a su grupo.",
            grupos: ["Cada día", "Cada semana", "Cada mes o cada año"],
            frases: [
              { texto: "Un tiempo con la Palabra y la oración", grupo: 0 },
              { texto: "El examen del corazón al final del día", grupo: 0 },
              { texto: "La adoración con la iglesia el día del Señor", grupo: 1 },
              { texto: "Un tiempo de servicio", grupo: 1 },
              { texto: "Un ayuno, si puedes", grupo: 1 },
              { texto: "Un retiro más largo con Dios", grupo: 2 },
              { texto: "Una revisión de tu plan", grupo: 2 },
            ],
            apoyo: "Cada día: un tiempo con la Palabra y la oración, y el examen del corazón al final.",
            ref: "Hechos 2:42",
            explica: "Una regla de vida reparte las disciplinas en ritmos: cada día, cada semana y cada mes o cada año.",
          },
          {
            consigna: "Paola arma su plan. ¿Lo hará cada día, cada semana o cada mes o año? Lleva cada frase a su grupo.",
            grupos: ["Cada día", "Cada semana", "Cada mes o cada año"],
            frases: [
              { texto: "Lee un capítulo y ora antes de ir al trabajo", grupo: 0 },
              { texto: "Repasa su día delante de Dios antes de dormir", grupo: 0 },
              { texto: "Adora con la iglesia el domingo", grupo: 1 },
              { texto: "Ayuda en el comedor de la iglesia", grupo: 1, explica: "En el plan de la lección, el servicio va cada semana." },
              { texto: "Deja una comida para orar por su familia", grupo: 1, explica: "Cada semana, si puede, un ayuno." },
              { texto: "Pasa una mañana entera a solas con Dios", grupo: 2, explica: "Un tiempo más largo de retiro con Dios va cada mes o cada año." },
              { texto: "Revisa su plan espiritual", grupo: 2 },
            ],
            apoyo: "Cada semana: la adoración con la iglesia el día del Señor, un tiempo de servicio y, si puedes, un ayuno.",
            ref: "Hechos 2:42",
            explica: "Paola arma un plan sencillo: la Palabra, la oración y el examen cada día; la iglesia y el servicio cada semana; un retiro y la revisión del plan cada mes o año.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu primo te dice: Mi plan es orar tres horas cada día, ayunar dos veces por semana y leer diez capítulos diarios.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Perfecto: mientras más grande sea tu plan, más vas a crecer en Cristo.", explica: "Un plan sencillo que se cumple vale más que uno grande que se abandona." },
              { texto: "Empieza con un plan sencillo que puedas cumplir, y revísalo cada mes.", bien: true, explica: "Así lo enseña la lección: un plan sencillo que se cumple, con una revisión cada mes o cada año." },
              { texto: "Mejor no hagas ningún plan: con los planes la fe se vuelve una obligación.", explica: "Para perseverar, conviene tener un plan." },
              { texto: "Hazlo a solas y no se lo cuentes a nadie de la iglesia, para que no te juzguen.", explica: "Las disciplinas se viven mejor en comunidad, como la primera iglesia." },
            ],
            apoyo: "Un plan sencillo que se cumple vale más que uno grande que se abandona.",
            ref: "Gálatas 6:9",
            explica: "Un plan sencillo que se cumple ayuda a perseverar; se revisa cada cierto tiempo y se vive mejor con otros.",
          },
          {
            caso: "Una hermana nueva te escribe: Quiero armar mi plan espiritual. ¿Qué pongo para cada día y cada semana?",
            pregunta: "¿Qué le sugieres?",
            opciones: [
              { texto: "Cada día, un retiro largo con Dios; cada semana, una revisión completa del plan.", explica: "El retiro más largo y la revisión del plan son para cada mes o cada año." },
              { texto: "Cada día, la Palabra, la oración y el examen; cada semana, la iglesia y servir.", bien: true, explica: "Así lo propone la lección: cada día la Palabra, la oración y el examen; cada semana la adoración con la iglesia y el servicio." },
              { texto: "Cada día, ir a la iglesia; cada semana, leer la Biblia si te queda tiempo libre.", explica: "La Palabra y la oración son para cada día; la adoración con la iglesia, el día del Señor." },
              { texto: "Cada día, ayunar sin falta; cada semana, servir solo si alguien te lo pide.", explica: "El ayuno va en la semana, si puedes, y el servicio es parte del plan de cada semana." },
            ],
            apoyo: "Cada día: un tiempo con la Palabra y la oración, y el examen del corazón al final.",
            ref: "Hechos 2:42",
            explica: "Un plan con ritmos diarios y semanales ordena las disciplinas para crecer en Cristo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "una regla de vida ordena las disciplinas en ritmos diarios, semanales y anuales para perseverar sin cansarnos de hacer el bien",
            ref: "Gálatas 6:9",
            clave: {
              id: "pr-n2-disciplinas-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es una regla de vida y para qué sirve?",
              ideas: [
                { id: "ordena", peso: 50, texto: "Es un plan que ordena las disciplinas en ritmos diarios, semanales y anuales.", formas: ["orden*", "plan", "ritmo*", "cada dia", "cada semana", "diari*", "semanal*"] },
                { id: "perseverar", peso: 50, texto: "Sirve para perseverar sin cansarnos de hacer el bien.", formas: ["persever*", "no cansar*", "sin cansar*", "constan*", "no abandon*", "seguir adelante"] },
              ],
              modelo: "Es un plan espiritual que ordena las disciplinas en ritmos diarios, semanales y anuales. Sirve para perseverar sin cansarnos de hacer el bien y crecer en Cristo.",
            },
          },
          {
            apoyo: "Un plan sencillo que se cumple vale más que uno grande que se abandona.",
            ref: "Gálatas 6:9",
            clave: {
              id: "pr-n2-disciplinas-6-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué conviene tener un plan sencillo para las disciplinas?",
              ideas: [
                { id: "sencillo", peso: 50, texto: "Un plan sencillo que se cumple vale más que uno grande que se abandona.", formas: ["que se cumpl*", "vale mas", "grande que se abandon*", "se abandon*", "pued* cumplir"] },
                { id: "perseverar", peso: 50, texto: "Ayuda a perseverar sin cansarnos de hacer el bien.", formas: ["persever*", "no cansar*", "sin cansar*", "constan*", "no abandon*", "seguir adelante"] },
              ],
              modelo: "Porque un plan sencillo que se cumple vale más que uno grande que se abandona. Así podemos perseverar sin cansarnos de hacer el bien.",
            },
          },
        ],
      },
    ],
  },
};
