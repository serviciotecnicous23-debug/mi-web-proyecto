/**
 * Nivel 1 · Materia 4 — El Espíritu Santo en mi vida (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Para el nuevo creyente se presenta lo que el texto bíblico dice con claridad; el bautismo en el Espíritu y los dones
 * se estudian a fondo en el Nivel 3, según la declaración de fe del ministerio.
 * Bibliografía: Stanley M. Horton, «El Espíritu Santo revelado en la Biblia»; Ralph M. Riggs, «El Espíritu mismo».
 */
import type { LeccionContenido } from "../tipos";

export const N1_ESPIRITU: LeccionContenido[] = [
  {
    id: "n1-espiritu-1",
    objetivos: [
      "Explicar por qué el Espíritu Santo es una Persona y no una fuerza.",
      "Mostrar con la Biblia que el Espíritu Santo es Dios.",
      "Describir lo que significa que el Espíritu vive en el creyente.",
    ],
    paraEmpezar:
      "Muchas personas piensan que el Espíritu Santo es una fuerza o una energía. La Biblia enseña algo mucho más hermoso: es una Persona, es Dios, y vive en cada creyente.",
    bloques: [
      { t: "subtitulo", texto: "Una Persona divina" },
      { t: "versiculo", ref: "Juan 14:16-17" },
      {
        t: "parrafo",
        texto:
          "Jesús prometió a sus discípulos otro Consolador. La palabra describe a alguien que es llamado a nuestro lado para ayudarnos. Jesús habla de Él como de una persona: el Espíritu enseña, recuerda, guía y testifica; se le puede entristecer (Efesios 4:30), y reparte dones como Él quiere (1 Corintios 12:11). Una fuerza no se entristece; una persona, sí.",
      },
      { t: "versiculo", ref: "Juan 14:26" },
      {
        t: "parrafo",
        texto:
          "El Espíritu Santo es Dios. Cuando Ananías mintió al Espíritu Santo, Pedro le dijo que no había mentido a los hombres, sino a Dios (Hechos 5:3-4). Jesús mandó bautizar en el nombre del Padre, del Hijo y del Espíritu Santo (Mateo 28:19): un solo Dios en tres Personas. Esta es la doctrina de la Trinidad.",
      },
      { t: "subtitulo", texto: "Con nosotros y en nosotros" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo que el Espíritu moraría con sus discípulos y estaría en ellos. En el Antiguo Testamento, el Espíritu venía sobre algunas personas para tareas especiales; hoy vive en todo creyente. Por eso Pablo dice que nuestro cuerpo es templo del Espíritu Santo (1 Corintios 6:19).",
      },
      {
        t: "nota",
        titulo: "No estás solo",
        texto: "El mismo Espíritu que levantó a Jesús de los muertos vive en el creyente (Romanos 8:11). Él te consuela, te enseña la Palabra y te da fuerzas para vivir como Jesús.",
      },
    ],
    ideaClave: "El Espíritu Santo es una Persona divina, el Consolador prometido por Jesús, que vive en cada creyente para enseñarle y ayudarle.",
    paraLaVida: {
      texto: "El Espíritu Santo no es una idea lejana: es Dios cerca de ti.",
      pregunta: "¿Qué significa para ti que el Espíritu Santo viva en tu vida? Escríbele una oración de gratitud a Dios.",
    },
  },
  {
    id: "n1-espiritu-2",
    objetivos: [
      "Explicar cómo el Espíritu convence de pecado y lleva a Cristo.",
      "Describir cómo el Espíritu da nueva vida y testifica que somos hijos de Dios.",
      "Reconocer que el Espíritu guía siempre de acuerdo con la Palabra.",
    ],
    paraEmpezar:
      "Desde antes de creer, el Espíritu Santo ya estaba obrando en tu vida: te mostró tu necesidad de Dios y te acercó a Jesús. Y desde que creíste, sigue obrando cada día.",
    bloques: [
      { t: "subtitulo", texto: "Convence y lleva a Cristo" },
      { t: "versiculo", ref: "Juan 16:7-11" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo que el Espíritu convencería al mundo de pecado, de justicia y de juicio. Nadie llega a Cristo solo por su inteligencia: el Espíritu abre los ojos, muestra el pecado y presenta a Jesús como el único camino. Por eso evangelizamos orando: es el Espíritu quien convence.",
      },
      { t: "subtitulo", texto: "Da nueva vida y nos hace hijos" },
      { t: "versiculo", ref: "Romanos 8:14-16" },
      {
        t: "parrafo",
        texto:
          "El Espíritu nos hace nacer de nuevo (Juan 3:5) y nos da la seguridad de ser hijos de Dios: Él da testimonio a nuestro espíritu de que somos sus hijos. Por eso podemos llamar a Dios «Abba, Padre», una expresión de cercanía y de confianza.",
      },
      { t: "subtitulo", texto: "Nos guía a toda la verdad" },
      { t: "versiculo", ref: "Juan 16:13" },
      {
        t: "parrafo",
        texto:
          "El Espíritu nos ayuda a entender la Palabra, nos guía en nuestras decisiones y nunca contradice lo que Él mismo inspiró en la Biblia. Nos ayuda a orar cuando no sabemos qué pedir (Romanos 8:26) y nos santifica, transformándonos poco a poco a la imagen de Cristo (2 Corintios 3:18).",
      },
      {
        t: "nota",
        titulo: "La guía y la Palabra",
        texto: "Una supuesta voz que contradice la Biblia no viene del Espíritu Santo. Juan enseña a probar los espíritus (1 Juan 4:1), y la prueba es siempre la Palabra que el Espíritu inspiró.",
      },
    ],
    ideaClave: "El Espíritu Santo convence de pecado, da nueva vida, testifica que somos hijos de Dios, nos guía a la verdad y nos ayuda a orar y a crecer.",
    paraLaVida: {
      texto: "Dejarse guiar por el Espíritu es una decisión de cada día.",
      pregunta: "¿En qué área de tu vida necesitas pedirle al Espíritu Santo que te guíe esta semana?",
    },
  },
  {
    id: "n1-espiritu-3",
    objetivos: [
      "Explicar la promesa de Jesús en Hechos 1:4-8.",
      "Describir lo que ocurrió el día de Pentecostés.",
      "Explicar para quién es hoy la promesa del Espíritu (Hechos 2:38-39).",
    ],
    paraEmpezar:
      "Antes de subir al cielo, Jesús no mandó a sus discípulos a predicar de inmediato. Les dijo que esperaran: primero tenían que recibir poder.",
    bloques: [
      { t: "subtitulo", texto: "Recibiréis poder" },
      { t: "versiculo", ref: "Hechos 1:4-5" },
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "parrafo",
        texto:
          "Jesús llamó bautismo con el Espíritu Santo a lo que iban a recibir, y explicó para qué: para ser sus testigos desde Jerusalén hasta lo último de la tierra. El poder del Espíritu no es para lucirse, sino para servir y testificar de Cristo con valentía.",
      },
      { t: "subtitulo", texto: "El día de Pentecostés" },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "Unos diez días después de que Jesús subió al cielo, en la fiesta de Pentecostés, los discípulos estaban reunidos. Vino un estruendo como de un viento recio, aparecieron lenguas como de fuego sobre cada uno, y todos fueron llenos del Espíritu Santo y hablaron en otras lenguas, según el Espíritu les daba que hablasen. Ese mismo día, Pedro predicó con poder y unas tres mil personas recibieron su palabra (Hechos 2:41).",
      },
      { t: "subtitulo", texto: "La promesa es para ti" },
      { t: "versiculo", ref: "Hechos 2:38-39" },
      {
        t: "parrafo",
        texto:
          "Pedro dijo que la promesa era para ellos, para sus hijos y para todos los que estaban lejos, para cuantos el Señor llamara. La promesa del Espíritu no fue solo para los apóstoles: es para todo creyente, también hoy. En el libro de los Hechos, cuando los creyentes fueron llenos del Espíritu, hablaron en lenguas, profetizaron y testificaron con poder (Hechos 10:44-46; 19:6).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia" },
      {
        t: "nota",
        titulo: "Pídelo con fe",
        texto:
          "Jesús dijo que el Padre celestial dará el Espíritu Santo a los que se lo pidan (Lucas 11:13). Busca a Dios en oración con un corazón sincero. En el Nivel 3, la materia La persona y obra del Espíritu Santo estudia a fondo el bautismo en el Espíritu y los dones.",
      },
    ],
    ideaClave: "Jesús prometió el bautismo con el Espíritu Santo para darnos poder y ser sus testigos; la promesa de Pentecostés es para todo creyente.",
    paraLaVida: {
      texto: "El poder del Espíritu es para servir y testificar.",
      pregunta: "¿A quién te gustaría hablarle de Jesús con el poder del Espíritu? Escribe su nombre y ora por esa persona.",
    },
  },
  {
    id: "n1-espiritu-4",
    objetivos: [
      "Explicar la lucha entre la carne y el Espíritu (Gálatas 5:16-17).",
      "Nombrar las cualidades del fruto del Espíritu.",
      "Aplicar hábitos concretos para andar en el Espíritu cada día.",
    ],
    paraEmpezar:
      "Ser llenos del Espíritu no es solo vivir un momento especial: es aprender a caminar con Él cada día. Y eso se nota en el carácter.",
    bloques: [
      { t: "subtitulo", texto: "Dos caminos" },
      { t: "versiculo", ref: "Gálatas 5:16-17" },
      {
        t: "parrafo",
        texto:
          "Dentro del creyente hay una lucha entre los deseos de la carne —la vieja naturaleza que quiere su propio camino— y el Espíritu. Pablo no dice que venzamos con fuerza de voluntad, sino andando en el Espíritu: dependiendo de Él cada día, escuchando su voz y obedeciendo.",
      },
      { t: "versiculo", ref: "Gálatas 5:22-23" },
      {
        t: "parrafo",
        texto:
          "El fruto del Espíritu es el carácter de Cristo formándose en nosotros: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza. Pablo dice fruto, en singular: crece junto, como un todo, y crece con el tiempo, como un árbol.",
      },
      { t: "subtitulo", texto: "Cómo andar en el Espíritu" },
      {
        t: "lista",
        items: [
          "Empieza el día entregándote a Dios y pidiéndole que te llene de su Espíritu (Efesios 5:18).",
          "Llena tu mente de la Palabra: el Espíritu usa lo que lees (Colosenses 3:16).",
          "Obedece pronto cuando Él te muestra algo.",
          "Confiesa enseguida cuando fallas, en lugar de esconderte (1 Juan 1:9).",
          "No apagues al Espíritu: dale lugar en tu vida y en la iglesia (1 Tesalonicenses 5:19).",
        ],
      },
      { t: "versiculo", ref: "Gálatas 5:25" },
      {
        t: "nota",
        titulo: "Avivar el fuego",
        texto: "Pablo le pidió a Timoteo que avivara el fuego del don de Dios que estaba en él (2 Timoteo 1:6). Avivar el fuego es darle al Espíritu Santo el primer lugar, cada día.",
      },
    ],
    ideaClave: "Andar en el Espíritu es depender de Él cada día; así vencemos los deseos de la carne y crece en nosotros el fruto del Espíritu.",
    paraLaVida: {
      texto: "El fruto crece cuando permanecemos cerca de Dios.",
      pregunta: "¿Qué cualidad del fruto del Espíritu necesitas que crezca más en ti? Pídesela a Dios.",
    },
  },
];
