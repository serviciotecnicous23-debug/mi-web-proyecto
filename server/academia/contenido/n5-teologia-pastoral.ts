/**
 * Nivel 5 · Materia 1 — Teología pastoral (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * El buen pastor y el llamado, la vida del pastor con Dios y con su familia, apacentar con la Palabra, cuidar y visitar
 * al rebaño, y acompañar en las crisis sin descuidarse a sí mismo. Las ceremonias (bodas, funerales, presentación de
 * niños) se estudian en la especialidad Ministerio pastoral. Quién puede ejercer el pastorado, también el ministerio de
 * la mujer, no se decide aquí: es un punto de la declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const N5_TEOLOGIA_PASTORAL: LeccionContenido[] = [
  {
    id: "n5-teologia-pastoral-1",
    objetivos: [
      "Explicar el ministerio pastoral a partir de Cristo, el buen pastor.",
      "Describir cómo se reconoce un llamado al ministerio pastoral.",
      "Valorar el pastorado como un servicio y no como un puesto.",
    ],
    paraEmpezar:
      "En la Biblia, el pastor no es un ejecutivo ni un artista, sino alguien que cuida ovejas: las conoce, las alimenta, las busca cuando se pierden y las defiende.",
    bloques: [
      { t: "versiculo", ref: "Juan 10:11-14" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Yo soy el buen pastor; el buen pastor su vida da por las ovejas». Todo pastor es, ante todo, una oveja del rebaño de Cristo y un ayudante del Pastor verdadero. Es el versículo de memoria de esta materia.",
      },
      { t: "versiculo", ref: "1 Pedro 5:1-4" },
      {
        t: "parrafo",
        texto:
          "Pedro, que también era anciano, pide: «Apacentad la grey de Dios que está entre vosotros, cuidando de ella, no por fuerza, sino voluntariamente». La grey es de Dios, no del pastor, y el que da la recompensa es Cristo, a quien Pedro llama «el Príncipe de los pastores».",
      },
      { t: "subtitulo", texto: "Tres nombres para un mismo servicio" },
      {
        t: "parrafo",
        texto:
          "En el Nuevo Testamento, los que cuidan la iglesia reciben tres nombres: ancianos, por su madurez; obispos o supervisores, por su tarea de velar; y pastores, por su cuidado del rebaño. Pablo llama ancianos a los líderes de Éfeso y les dice que el Espíritu Santo los puso por obispos para apacentar la iglesia (Hechos 20:17, 28). Cómo se organizan hoy esos cargos lo veremos en la materia de administración y gobierno.",
      },
      { t: "subtitulo", texto: "Cómo se reconoce el llamado" },
      {
        t: "lista",
        items: [
          "Un deseo que viene de Dios: servir a su pueblo, no buscar un título (1 Timoteo 3:1).",
          "Un carácter probado, que es lo primero que pide la Palabra (1 Timoteo 3:2-7).",
          "Dones que se ven en el servicio: enseñar, cuidar, guiar.",
          "La confirmación de la iglesia y de sus líderes, que ven el fruto (Hechos 13:2-3).",
          "Un amor por las personas que resiste el cansancio y la ingratitud.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Sobre los cargos",
        texto:
          "Quién puede ejercer el pastorado no se decide en esta materia: es un punto de la declaración de fe del ministerio por confirmar. Aquí se estudia el corazón y la tarea del que cuida el rebaño.",
      },
    ],
    ideaClave:
      "El ministerio pastoral nace de Cristo, el buen pastor que da su vida por las ovejas. El pastor cuida una grey que es de Dios, voluntariamente y con ánimo pronto, bajo el Príncipe de los pastores. Anciano, obispo y pastor nombran un mismo servicio, y el llamado se reconoce por un deseo dado por Dios, un carácter probado, dones visibles y la confirmación de la iglesia.",
    paraLaVida: {
      texto: "Antes de pastorear a otros, eres una oveja del buen pastor.",
      pregunta: "¿Qué señales de llamado ves en tu vida, y quiénes podrían confirmarlas?",
    },
  },
  {
    id: "n5-teologia-pastoral-2",
    objetivos: [
      "Describir la vida espiritual que necesita el pastor: oración, Palabra y santidad.",
      "Reconocer los peligros de un ministerio sin vida con Dios.",
      "Aplicar hábitos de descanso y de cuidado personal según el ejemplo de Jesús.",
    ],
    paraEmpezar:
      "Un pastor puede estar tan ocupado con la obra de Dios que se olvide del Dios de la obra. El primer rebaño que cuida es su propia alma.",
    bloques: [
      { t: "versiculo", ref: "Hechos 6:4" },
      {
        t: "parrafo",
        texto:
          "Los apóstoles definieron su prioridad: «Y nosotros persistiremos en la oración y en el ministerio de la palabra». Sin oración y sin Palabra, el ministerio se vuelve una actividad más.",
      },
      { t: "versiculo", ref: "Marcos 1:35" },
      {
        t: "parrafo",
        texto:
          "Jesús, en medio de un ministerio lleno de gente, buscaba al Padre: «Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a un lugar desierto, y allí oraba».",
      },
      { t: "subtitulo", texto: "Los peligros" },
      {
        t: "lista",
        items: [
          "El profesionalismo: predicar y orar por oficio, sin un corazón encendido.",
          "El orgullo: creer que la obra depende de uno.",
          "El aislamiento: no tener a nadie a quien rendir cuentas.",
          "La doble vida: enseñar la santidad sin vivirla.",
        ],
      },
      { t: "versiculo", ref: "1 Timoteo 4:16" },
      {
        t: "parrafo",
        texto:
          "Pablo pide a Timoteo: «Ten cuidado de ti mismo y de la doctrina». El orden es importante: primero la propia vida, después la enseñanza.",
      },
      { t: "subtitulo", texto: "Descansar también es obedecer" },
      { t: "versiculo", ref: "Marcos 6:31" },
      {
        t: "parrafo",
        texto:
          "Cuando los apóstoles volvieron cansados, Jesús les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco». El pastor necesita un día de descanso, tiempo con su familia y amigos con quienes ser él mismo.",
      },
      {
        t: "nota",
        titulo: "Rendir cuentas",
        texto:
          "Todo pastor necesita a alguien que le pregunte cómo está su vida con Dios, su matrimonio o su soltería, y su manejo del dinero, y que pueda decirle la verdad.",
      },
    ],
    ideaClave:
      "La primera tarea del pastor es cuidar su propia vida con Dios: perseverar en la oración y en la Palabra, como los apóstoles, y buscar al Padre, como Jesús. Debe cuidarse del profesionalismo, del orgullo, del aislamiento y de la doble vida, rendir cuentas y descansar, porque Jesús también llamó a sus discípulos a descansar un poco.",
    paraLaVida: {
      texto: "Nadie puede dar a otros lo que no recibe primero de Dios.",
      pregunta: "¿Qué hábito de oración, de lectura o de descanso necesitas recuperar esta semana?",
    },
  },
  {
    id: "n5-teologia-pastoral-3",
    objetivos: [
      "Explicar por qué el hogar es el primer lugar del ministerio.",
      "Describir prácticas que protegen el matrimonio y la vida familiar del que sirve.",
      "Valorar la hospitalidad como parte del ministerio pastoral.",
    ],
    paraEmpezar:
      "Muchos hijos de pastores aman la iglesia porque vieron a sus padres vivir lo que predicaban. Otros se alejaron porque la iglesia siempre fue primero. El hogar también es ministerio.",
    bloques: [
      { t: "versiculo", ref: "1 Timoteo 3:4-5" },
      {
        t: "parrafo",
        texto:
          "Pablo pregunta: «pues el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?». La forma en que alguien cuida a los suyos muestra cómo cuidará a la iglesia.",
      },
      { t: "subtitulo", texto: "Cuidar el hogar" },
      {
        t: "lista",
        items: [
          "Tiempo de calidad con el cónyuge y con los hijos, protegido en la agenda.",
          "Proteger la intimidad del hogar: la casa del pastor no es una oficina abierta todo el día.",
          "No cargar a la familia con los problemas que se confían en la consejería.",
          "Dejar que los hijos sean niños, sin exigirles ser ejemplo de toda la iglesia.",
          "Orar y leer la Biblia en familia.",
        ],
      },
      { t: "versiculo", ref: "Josué 24:15" },
      {
        t: "parrafo",
        texto: "Josué lo dijo así delante de todo el pueblo: «pero yo y mi casa serviremos a Jehová». El servicio a Dios empieza en casa.",
      },
      { t: "subtitulo", texto: "Una casa abierta" },
      { t: "versiculo", ref: "1 Pedro 4:9" },
      {
        t: "parrafo",
        texto:
          "La Palabra pide: «Hospedaos los unos a los otros sin murmuraciones». Abrir la casa con equilibrio, para una comida o una visita, enseña más que muchos sermones; pero la hospitalidad no significa vivir sin límites.",
      },
      {
        t: "nota",
        titulo: "Para los que sirven sin casarse",
        texto:
          "El que sirve soltero también necesita un hogar sano: amistades cercanas, descanso y personas que lo cuiden. La soltería no es un ministerio de segunda clase (1 Corintios 7:32-35).",
      },
    ],
    ideaClave:
      "El hogar es el primer lugar del ministerio: quien no cuida su propia casa no podrá cuidar la iglesia de Dios. El pastor protege el tiempo y la intimidad de su familia, no la carga con lo que se confía en la consejería y deja que sus hijos sean niños. Su casa se abre con hospitalidad, pero con límites sanos, y el que sirve soltero también necesita cuidado.",
    paraLaVida: {
      texto: "Tu familia no es un obstáculo para el ministerio: es tu primer ministerio.",
      pregunta: "¿Qué cambio harás en tu agenda para cuidar mejor a tu familia o a tus amistades cercanas?",
    },
  },
  {
    id: "n5-teologia-pastoral-4",
    objetivos: [
      "Explicar el encargo de apacentar con la Palabra según Juan 21 y 2 Timoteo 4.",
      "Describir cómo el pastor alimenta, enseña y protege al rebaño de la falsa doctrina.",
      "Planificar la enseñanza de una iglesia para que reciba todo el consejo de Dios.",
    ],
    paraEmpezar:
      "Las ovejas no se alimentan solas: necesitan un pastor que las lleve a buenos pastos. El alimento de la iglesia es la Palabra de Dios.",
    bloques: [
      { t: "versiculo", ref: "Juan 21:15-17" },
      {
        t: "parrafo",
        texto:
          "Tres veces Jesús restauró a Pedro, y tres veces le encargó lo mismo. La tercera vez le dijo: «Apacienta mis ovejas». El amor por Cristo se demuestra cuidando a sus ovejas.",
      },
      { t: "versiculo", ref: "2 Timoteo 4:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo encarga a Timoteo, delante de Dios: «que prediques la palabra; que instes a tiempo y fuera de tiempo». Predicar no es una parte más de la agenda: es el corazón del encargo pastoral.",
      },
      { t: "subtitulo", texto: "Alimentar con todo el consejo de Dios" },
      {
        t: "lista",
        items: [
          "Predicar libros completos de la Biblia, para que la iglesia reciba todo el consejo de Dios (Hechos 20:27).",
          "Enseñar en público y por las casas, como Pablo en Éfeso (Hechos 20:20).",
          "Formar maestros y grupos pequeños, para que la enseñanza llegue a todos.",
          "Usar herramientas como esta academia, que forma creyentes nivel por nivel.",
        ],
      },
      { t: "subtitulo", texto: "Proteger del error" },
      { t: "versiculo", ref: "Hechos 20:28-31" },
      {
        t: "parrafo",
        texto:
          "Pablo advirtió a los ancianos de Éfeso: «Por tanto, mirad por vosotros, y por todo el rebaño en que el Espíritu Santo os ha puesto por obispos, para apacentar la iglesia del Señor». También les dijo que vendrían lobos rapaces. El pastor protege al rebaño enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen (Tito 1:9; 2 Timoteo 2:24-25).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Un plan de enseñanza",
        texto:
          "Un pastor sabio planifica qué enseñará durante el año: un evangelio, una carta, un libro del Antiguo Testamento y los temas que su iglesia necesita, para no predicar siempre sus temas favoritos.",
      },
    ],
    ideaClave:
      "Jesús encargó a Pedro apacentar sus ovejas, y Pablo encargó a Timoteo predicar la palabra a tiempo y fuera de tiempo. El pastor alimenta a la iglesia con todo el consejo de Dios, en público y por las casas, forma maestros y protege al rebaño de la falsa doctrina con la sana enseñanza y la corrección mansa.",
    paraLaVida: {
      texto: "Una iglesia bien alimentada con la Palabra resiste mejor el error.",
      pregunta: "¿Qué libro de la Biblia necesita estudiar tu iglesia o tu grupo este año, y por qué?",
    },
  },
  {
    id: "n5-teologia-pastoral-5",
    objetivos: [
      "Describir el cuidado pastoral según Ezequiel 34 y el ejemplo del buen pastor.",
      "Aplicar prácticas de visitación a enfermos, ancianos y alejados.",
      "Reconocer cuándo una persona necesita la ayuda de un profesional.",
    ],
    paraEmpezar:
      "Dios reprendió a los pastores de Israel porque se apacentaban a sí mismos y no cuidaban a las ovejas. El cuidado pastoral es más que el culto del domingo.",
    bloques: [
      { t: "versiculo", ref: "Ezequiel 34:2-4" },
      {
        t: "parrafo",
        texto:
          "Dios dijo: «No fortalecisteis las débiles, ni curasteis la enferma; no vendasteis la perniquebrada, no volvisteis al redil la descarriada, ni buscasteis la perdida». Lo que Dios reprende muestra lo que espera: fortalecer, curar, vendar, traer de vuelta y buscar.",
      },
      { t: "versiculo", ref: "Juan 10:3" },
      {
        t: "parrafo",
        texto: "El buen pastor «a sus ovejas llama por nombre». El pastor conoce a su gente: su historia, sus luchas y su familia.",
      },
      { t: "subtitulo", texto: "Visitar" },
      {
        t: "lista",
        items: [
          "A los enfermos, en la casa o en el hospital, con una lectura breve, una oración y respeto por el lugar y el tiempo.",
          "A los ancianos y a los que viven solos.",
          "A los que dejaron de venir, para buscarlos sin reproches, como el pastor que busca la oveja perdida (Lucas 15:4).",
          "A los nuevos, para que se sientan parte de la familia.",
        ],
      },
      { t: "versiculo", ref: "Santiago 5:14" },
      {
        t: "parrafo",
        texto:
          "Santiago enseña: «¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él, ungiéndole con aceite en el nombre del Señor». Orar por los enfermos es parte del cuidado pastoral.",
      },
      { t: "subtitulo", texto: "Saber hasta dónde llega" },
      {
        t: "parrafo",
        texto:
          "El pastor acompaña, aconseja con la Palabra y ora, pero sabe reconocer cuándo alguien necesita además un médico, un psicólogo, un abogado o la ayuda de las autoridades. Referir a tiempo también es cuidar. Si hay riesgo de suicidio o de violencia, se busca ayuda de inmediato.",
      },
      {
        t: "nota",
        titulo: "Un equipo que cuida",
        texto:
          "Ningún pastor puede visitar a todos solo. Forma un equipo de hermanos que visiten, oren y avisen cuando alguien necesita al pastor.",
      },
    ],
    ideaClave:
      "Dios espera que sus pastores fortalezcan a las débiles, curen a las enfermas, venden a las heridas, traigan de vuelta a las descarriadas y busquen a las perdidas. El buen pastor conoce a sus ovejas por nombre, visita a los enfermos, a los ancianos, a los alejados y a los nuevos, ora por los enfermos y refiere a tiempo a quien necesita ayuda profesional.",
    paraLaVida: {
      texto: "Cada oveja tiene un nombre, y el pastor lo conoce.",
      pregunta: "¿A quién de tu iglesia o de tu grupo deberías visitar o llamar esta semana?",
    },
  },
  {
    id: "n5-teologia-pastoral-6",
    objetivos: [
      "Explicar cómo acompaña el pastor en las crisis, el duelo y el sufrimiento.",
      "Reconocer las señales del agotamiento y de la caída moral, y cómo prevenirlas.",
      "Valorar la perseverancia para terminar bien el ministerio.",
    ],
    paraEmpezar:
      "Una llamada a medianoche, un accidente, un diagnóstico, una muerte: en esas horas el pastor no necesita palabras perfectas, sino estar presente con el consuelo de Dios.",
    bloques: [
      { t: "versiculo", ref: "2 Corintios 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo llama a Dios «Padre de misericordias y Dios de toda consolación, el cual nos consuela en todas nuestras tribulaciones, para que podamos también nosotros consolar a los que están en cualquier tribulación». El pastor consuela con el consuelo que él mismo recibe.",
      },
      { t: "subtitulo", texto: "Acompañar en el dolor" },
      {
        t: "lista",
        items: [
          "Estar presente y escuchar más que hablar.",
          "Llorar con los que lloran (Romanos 12:15), sin explicaciones fáciles del sufrimiento.",
          "Leer un salmo y orar, con pocas palabras.",
          "Volver días y semanas después, cuando los demás ya se fueron.",
          "Ayudar a la familia en lo práctico, junto con la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Cuidarse para no caer" },
      {
        t: "parrafo",
        texto:
          "El agotamiento se nota en el cansancio que no se quita, la irritación, la falta de gozo y el deseo de huir. Muchas caídas morales empiezan por ahí: un pastor agotado, aislado y sin rendir cuentas. Por eso necesita descanso, amistades, un mentor y límites claros.",
      },
      { t: "versiculo", ref: "1 Corintios 10:12" },
      {
        t: "parrafo",
        texto: "La advertencia es para todos: «Así que, el que piensa estar firme, mire que no caiga».",
      },
      { t: "subtitulo", texto: "Terminar bien" },
      { t: "versiculo", ref: "2 Timoteo 4:7" },
      {
        t: "parrafo",
        texto:
          "Al final de su vida, Pablo pudo decir: «He peleado la buena batalla, he acabado la carrera, he guardado la fe». La meta no es solo empezar con fuerza, sino terminar fiel.",
      },
      {
        t: "nota",
        titulo: "Las ceremonias",
        texto:
          "Las bodas, los funerales, la presentación de niños y las demás ceremonias pastorales se estudian en detalle en la especialidad Ministerio pastoral.",
      },
    ],
    ideaClave:
      "Dios es el Dios de toda consolación, y el pastor consuela con el consuelo que recibe: está presente, escucha, llora con los que lloran y vuelve cuando los demás se fueron. Para no caer, reconoce las señales del agotamiento, descansa, tiene amigos y un mentor y rinde cuentas, porque el que piensa estar firme debe mirar que no caiga. La meta es terminar bien, como Pablo.",
    paraLaVida: {
      texto: "Terminar bien se decide en las pequeñas decisiones de cada día.",
      pregunta: "¿Qué señal de cansancio o de riesgo ves en tu vida, y qué harás para atenderla?",
    },
  },
];
