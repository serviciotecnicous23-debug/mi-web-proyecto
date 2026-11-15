/**
 * Nivel 2 · Materia 4 — Disciplinas espirituales (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Las disciplinas se enseñan desde la Escritura y la gracia: son medios para conocer a Dios, no méritos. No se enseñan
 * prácticas que vacían la mente: la meditación bíblica llena la mente con la Palabra (Josué 1:8; Salmos 1:2).
 * Referencias: Donald S. Whitney, «Disciplinas espirituales para la vida cristiana» (NavPress/Tyndale); Richard J. Foster,
 * «Celebración de la disciplina» (Peniel), con discernimiento.
 */
import type { LeccionContenido } from "../tipos";

export const N2_DISCIPLINAS: LeccionContenido[] = [
  {
    id: "n2-disciplinas-1",
    objetivos: [
      "Explicar qué son las disciplinas espirituales y para qué sirven.",
      "Distinguir entre la disciplina que nace de la gracia y el legalismo.",
      "Reconocer cómo practicaba Jesús las disciplinas.",
    ],
    paraEmpezar:
      "Un atleta no gana una carrera el día de la competencia: la gana en meses de entrenamiento. Pablo usa esa imagen para la vida con Dios. Las disciplinas espirituales son los hábitos que la Biblia nos enseña para crecer en Cristo.",
    bloques: [
      { t: "subtitulo", texto: "Ejercitarse para la piedad" },
      { t: "versiculo", ref: "1 Timoteo 4:7-8" },
      {
        t: "parrafo",
        texto:
          "Pablo le dice a Timoteo: «Ejercítate para la piedad». La piedad es una vida que agrada a Dios, y se cultiva como se entrena el cuerpo: con constancia. Pero hay una diferencia: el ejercicio del cuerpo sirve para esta vida; la piedad tiene promesa de esta vida y de la venidera.",
      },
      { t: "subtitulo", texto: "Medios de gracia, no méritos" },
      {
        t: "lista",
        items: [
          "Las disciplinas no nos salvan ni nos hacen ganar el amor de Dios: somos salvos por gracia, por medio de la fe (Efesios 2:8-9).",
          "Son caminos por donde Dios nos encuentra y nos transforma: nos ponen delante de Él para que su Espíritu obre en nosotros (2 Corintios 3:18).",
          "El legalismo convierte las disciplinas en reglas para ser aceptados o para aparentar; Jesús lo reprendió en los fariseos (Mateo 6:1).",
        ],
      },
      { t: "subtitulo", texto: "Jesús, nuestro modelo" },
      { t: "versiculo", ref: "Lucas 5:16" },
      {
        t: "parrafo",
        texto:
          "Aun con las multitudes buscándolo, Jesús «se apartaba a lugares desiertos, y oraba». Conocía las Escrituras, ayunó en el desierto, se congregaba en la sinagoga y servía a los demás. Si el Hijo de Dios cultivó estos hábitos, nosotros los necesitamos más.",
      },
      {
        t: "nota",
        titulo: "Las disciplinas de esta materia",
        texto: "La Palabra, la oración y el ayuno, la adoración y el día del Señor, el silencio y el diario espiritual, el servicio y la generosidad. Al final armarás tu propio plan.",
      },
    ],
    ideaClave:
      "Las disciplinas espirituales son hábitos bíblicos para ejercitarnos en la piedad: no son méritos para ganar el amor de Dios, sino medios de gracia para conocerlo y ser transformados, siguiendo el ejemplo de Jesús.",
    paraLaVida: {
      texto: "Lo que haces cada día forma lo que eres.",
      pregunta: "¿Qué hábito de tu día te acerca más a Dios, y cuál te aleja de Él?",
    },
  },
  {
    id: "n2-disciplinas-2",
    objetivos: [
      "Describir cuatro maneras de recibir la Palabra: leer, estudiar, meditar y memorizar.",
      "Explicar qué es la meditación bíblica.",
      "Elegir un plan para leer la Biblia con constancia.",
    ],
    paraEmpezar:
      "Muchos creyentes aman la Biblia, pero pocos la leen con constancia. La Palabra de Dios es el alimento del alma: sin ella la fe se debilita. En esta lección verás cómo recibirla de cuatro maneras.",
    bloques: [
      { t: "versiculo", ref: "Salmos 1:1-3" },
      {
        t: "parrafo",
        texto:
          "El salmo describe al bienaventurado: «en la ley de Jehová está su delicia, y en su ley medita de día y de noche». Es como un árbol plantado junto a corrientes de aguas, que da su fruto a su tiempo. La Palabra recibida cada día da estabilidad y fruto.",
      },
      { t: "subtitulo", texto: "Cuatro maneras de recibir la Palabra" },
      {
        t: "lista",
        items: [
          "Leer: con un plan (por ejemplo, un capítulo por la mañana y otro por la noche), para conocer toda la Biblia.",
          "Estudiar: con preguntas, el contexto y herramientas; como los de Berea, que escudriñaban cada día las Escrituras (Hechos 17:11).",
          "Meditar: pensar despacio en un pasaje, repetirlo, preguntarse qué enseña de Dios y qué pide de mí.",
          "Memorizar: guardar la Palabra en el corazón para no pecar contra Dios (Salmos 119:11).",
        ],
      },
      { t: "subtitulo", texto: "La meditación bíblica" },
      { t: "versiculo", ref: "Josué 1:8" },
      {
        t: "nota",
        titulo: "Llenar la mente, no vaciarla",
        texto:
          "La meditación que enseña la Biblia no es dejar la mente en blanco: es llenarla con la Palabra de Dios y obedecerla. Dios le dijo a Josué que meditara en el libro de la ley de día y de noche, para hacer conforme a todo lo que en él está escrito.",
      },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
    ],
    ideaClave:
      "La Palabra se recibe leyéndola con un plan, estudiándola, meditándola y memorizándola; la meditación bíblica llena la mente con la Escritura para obedecerla.",
    paraLaVida: {
      texto: "Un versículo meditado vale más que diez leídos de prisa.",
      pregunta: "¿Qué plan de lectura empezarás esta semana, y a qué hora del día lo harás?",
    },
  },
  {
    id: "n2-disciplinas-3",
    objetivos: [
      "Explicar lo que Jesús enseñó sobre la oración y el ayuno en Mateo 6.",
      "Describir el ayuno bíblico y sus propósitos.",
      "Reconocer el ayuno que agrada a Dios según Isaías 58.",
    ],
    paraEmpezar:
      "En el Sermón del monte, Jesús habla de dar, de orar y de ayunar. No dice si oras o si ayunas, sino «cuando ores» y «cuando ayunes». Daba por hecho que sus discípulos lo harían.",
    bloques: [
      { t: "subtitulo", texto: "Orar en lo secreto" },
      { t: "versiculo", ref: "Mateo 6:6" },
      {
        t: "parrafo",
        texto:
          "Jesús enseña a orar al Padre en lo secreto, sin buscar ser vistos, y promete que «tu Padre que ve en lo secreto te recompensará en público». La oración es conversación con un Padre que escucha. El Padre Nuestro nos da el modelo: adorar, pedir su reino, pedir el pan, el perdón y la protección (Mateo 6:9-13).",
      },
      { t: "subtitulo", texto: "El ayuno bíblico" },
      { t: "versiculo", ref: "Mateo 6:16-18" },
      {
        t: "lista",
        items: [
          "Ayunar es abstenerse de comida por un tiempo para buscar a Dios con más intensidad.",
          "Se ayuna para humillarse delante de Dios, para buscar su dirección, para interceder y para fortalecerse contra la tentación.",
          "La iglesia de Antioquía ayunaba y oraba cuando el Espíritu Santo apartó a Bernabé y a Saulo para la obra (Hechos 13:2-3).",
          "Hay ayunos de un día o de una comida, y ayunos parciales. Quien tiene problemas de salud debe consultar a su médico y puede ayunar de otras cosas.",
        ],
      },
      { t: "subtitulo", texto: "El ayuno que Dios escogió" },
      { t: "versiculo", ref: "Isaías 58:6-7" },
      {
        t: "nota",
        titulo: "Más que dejar de comer",
        texto:
          "Por medio de Isaías, Dios reprendió un ayuno religioso que convivía con la injusticia. El ayuno que Él escogió va unido a soltar las cargas de los oprimidos, compartir el pan con el hambriento y no esconderse del necesitado.",
      },
    ],
    ideaClave:
      "Jesús enseñó a orar al Padre en lo secreto y a ayunar sin ostentación; el ayuno bíblico es buscar a Dios con más intensidad, y el que Él escoge va unido a la justicia y la misericordia.",
    paraLaVida: {
      texto: "La oración en lo secreto cambia la vida en público.",
      pregunta: "¿Qué necesidad presentarás a Dios en un tiempo de oración y ayuno esta semana?",
    },
  },
  {
    id: "n2-disciplinas-4",
    objetivos: [
      "Explicar qué significa adorar en espíritu y en verdad.",
      "Describir la adoración personal y la congregacional.",
      "Explicar el sentido del día del Señor para el creyente.",
    ],
    paraEmpezar:
      "Adorar no es solo cantar los domingos. Es darle a Dios el lugar que merece en todo lo que somos. La adoración comienza en el corazón, llena la vida diaria y se expresa también junto a la iglesia.",
    bloques: [
      { t: "versiculo", ref: "Juan 4:23-24" },
      {
        t: "parrafo",
        texto:
          "Jesús le dijo a la mujer samaritana que el Padre busca adoradores que lo adoren «en espíritu y en verdad». En espíritu: con todo el corazón, guiados por el Espíritu Santo. En verdad: conforme a lo que Dios ha revelado de sí mismo en su Palabra.",
      },
      { t: "subtitulo", texto: "Una vida de adoración" },
      { t: "versiculo", ref: "Romanos 12:1" },
      {
        t: "lista",
        items: [
          "La adoración personal: cantar, dar gracias y alabar a Dios en la vida diaria (Salmos 34:1).",
          "La adoración congregacional: reunirnos con la iglesia para alabar, orar, escuchar la Palabra y participar de la Cena del Señor.",
          "Toda la vida como culto: presentar el cuerpo en sacrificio vivo, santo, agradable a Dios.",
        ],
      },
      { t: "subtitulo", texto: "El día del Señor" },
      { t: "versiculo", ref: "Hebreos 10:24-25" },
      {
        t: "parrafo",
        texto:
          "Los primeros cristianos se reunían el primer día de la semana, el día en que Jesús resucitó, para partir el pan (Hechos 20:7); Juan lo llama el día del Señor (Apocalipsis 1:10). Es un día para adorar con la iglesia, descansar y hacer el bien. Jesús enseñó que el día de reposo fue hecho por causa del hombre (Marcos 2:27): un regalo, no una carga.",
      },
    ],
    ideaClave:
      "Adorar en espíritu y en verdad es darle a Dios todo el corazón conforme a su Palabra; la adoración llena la vida diaria, se vive con la iglesia y tiene un lugar especial en el día del Señor.",
    paraLaVida: {
      texto: "La adoración empieza antes de llegar al templo.",
      pregunta: "¿Cómo puedes prepararte para el próximo día del Señor y vivirlo como un regalo?",
    },
  },
  {
    id: "n2-disciplinas-5",
    objetivos: [
      "Explicar por qué el silencio y la soledad son disciplinas bíblicas.",
      "Describir cómo llevar un diario espiritual.",
      "Practicar el examen del corazón delante de Dios.",
    ],
    paraEmpezar:
      "Vivimos rodeados de ruido: el teléfono, las noticias, las redes, las prisas. En medio de eso es difícil escuchar a Dios. Jesús buscaba lugares tranquilos para estar a solas con el Padre.",
    bloques: [
      { t: "subtitulo", texto: "A solas con Dios" },
      { t: "versiculo", ref: "Marcos 1:35" },
      {
        t: "parrafo",
        texto:
          "Muy de mañana, siendo aún muy oscuro, Jesús se levantó y fue a un lugar desierto, y allí oraba. El silencio y la soledad no son huir de la gente, sino apartarse un tiempo para estar con Dios y volver renovados a servir.",
      },
      { t: "versiculo", ref: "Salmos 46:10" },
      {
        t: "nota",
        titulo: "Estar quietos para conocerlo",
        texto: "Dios dice: «Estad quietos, y conoced que yo soy Dios». El silencio bíblico no es una mente vacía: es una mente atenta a Dios y a su Palabra.",
      },
      { t: "subtitulo", texto: "El diario espiritual" },
      { t: "versiculo", ref: "Salmos 77:11-12" },
      {
        t: "lista",
        items: [
          "Un diario espiritual es un cuaderno donde escribes lo que Dios te enseña, tus oraciones, sus respuestas y lo que vives con Él.",
          "Ayuda a recordar las obras de Dios, como el salmista que se acordaba de las obras de Jehová y meditaba en ellas.",
          "Puedes usar tu cuaderno de la academia: las plantillas de devocional y de lista de oración sirven para esto.",
        ],
      },
      { t: "subtitulo", texto: "El examen del corazón" },
      { t: "versiculo", ref: "Salmos 139:23-24" },
      {
        t: "parrafo",
        texto:
          "David le pedía a Dios: «Examíname, oh Dios, y conoce mi corazón». Al final del día puedes repasar delante de Dios lo que viviste: dar gracias por lo bueno, confesar lo malo y pedir su guía para mañana.",
      },
    ],
    ideaClave:
      "El silencio y la soledad son tiempos apartados para estar con Dios, como hacía Jesús; el diario espiritual nos ayuda a recordar sus obras, y el examen del corazón nos lleva a la gratitud, la confesión y su guía.",
    paraLaVida: {
      texto: "Dios habla también en el silencio.",
      pregunta: "¿Qué momento de tu día puedes apartar para estar a solas con Dios, sin el teléfono?",
    },
  },
  {
    id: "n2-disciplinas-6",
    objetivos: [
      "Explicar el servicio y la generosidad como disciplinas del discípulo.",
      "Describir qué es una regla de vida o plan espiritual.",
      "Armar un plan personal de disciplinas con ritmos diarios y semanales.",
    ],
    paraEmpezar:
      "Las disciplinas no son solo hacia adentro: también nos mueven hacia los demás. Jesús vino a servir, y el discípulo que se parece a Él sirve y da. Y para perseverar, conviene tener un plan.",
    bloques: [
      { t: "subtitulo", texto: "Servir como Jesús" },
      { t: "versiculo", ref: "Marcos 10:45" },
      {
        t: "parrafo",
        texto:
          "El Hijo del Hombre no vino para ser servido, sino para servir y dar su vida en rescate por muchos. Servir es una disciplina porque va contra el orgullo: buscar el bien del otro, también cuando nadie lo ve. Pablo nos llama a servirnos por amor los unos a los otros (Gálatas 5:13).",
      },
      { t: "subtitulo", texto: "La generosidad" },
      { t: "versiculo", ref: "2 Corintios 9:7" },
      {
        t: "nota",
        titulo: "Dar con alegría",
        texto: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre. Dar con orden y generosidad libera el corazón del amor al dinero.",
      },
      { t: "subtitulo", texto: "Una regla de vida: tu plan" },
      {
        t: "lista",
        items: [
          "Cada día: un tiempo con la Palabra y la oración, y el examen del corazón al final.",
          "Cada semana: la adoración con la iglesia el día del Señor, un tiempo de servicio y, si puedes, un ayuno.",
          "Cada mes o cada año: un tiempo más largo de retiro con Dios y una revisión de tu plan.",
          "Con otros: las disciplinas se viven mejor en comunidad, como la primera iglesia (Hechos 2:42).",
        ],
      },
      { t: "versiculo", ref: "Gálatas 6:9" },
    ],
    ideaClave:
      "El servicio y la generosidad nos hacen parecidos a Jesús; una regla de vida ordena las disciplinas en ritmos diarios, semanales y anuales para perseverar sin cansarnos de hacer el bien.",
    paraLaVida: {
      texto: "Un plan sencillo que se cumple vale más que uno grande que se abandona.",
      pregunta: "Escribe tu plan: ¿qué harás cada día, cada semana y cada mes para crecer en Cristo?",
    },
  },
];
