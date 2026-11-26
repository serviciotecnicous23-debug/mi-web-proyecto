/**
 * Las prácticas de «La persona y obra del Espíritu Santo» (Nivel 3). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n3-espiritu-santo.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: cada afirmación sigue la lección con sus mismas palabras, y lo que la lección atribuye a la
 * tradición pentecostal o a la declaración de fe se pregunta con esa misma atribución. Si hablar en lenguas es la señal
 * inicial y necesaria del bautismo en el Espíritu es un punto de la declaración de fe por confirmar: ninguna actividad
 * pregunta por ese punto ni por las dos posiciones. El objetivo 3 de la lección 4, que trata de ese punto, se practica
 * solo con lo que relatan los pasajes de Hechos que cita la lección.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N3_ESPIRITU_SANTO: PracticasMateria = {
  materia: "n3-espiritu-santo",
  mision: {
    titulo: "Con su Espíritu, no con nuestras fuerzas",
    intro: "Tu pastor te encargó acompañar a un grupo de nuevos servidores de la iglesia. Quieren servir bien y te hacen muchas preguntas sobre el Espíritu Santo: quién es, cómo obró en el Antiguo Testamento y en Jesús, qué hace en la salvación, qué es el bautismo en el Espíritu y cómo se recibe, cómo van juntos los dones y el fruto, y cómo se anda en el Espíritu cada día. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes ayudar a otros a conocer al Espíritu Santo como una persona divina, a servir en su poder como sirvió Jesús, a pedir al Padre con fe ser llenos de él y a cuidar el fruto que él forma, porque la obra se hace no con ejército, ni con fuerza, sino con su Espíritu.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El Espíritu Santo, una persona divina
    "n3-espiritu-santo-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según la lección, ¿cómo hablan muchos creyentes del Espíritu Santo?", reverso: "Como de una energía o un sentimiento.", apoyo: "Muchos creyentes hablan del Espíritu Santo como de una energía o un sentimiento" },
              { frente: "¿Cómo llama Jesús al Espíritu Santo en Juan 14?", reverso: "Otro Consolador: alguien como él, que estaría con los discípulos para siempre.", apoyo: "Jesús lo llama «otro Consolador», alguien como él" },
              { frente: "¿Qué muestra que el Espíritu tiene voluntad?", reverso: "Que reparte los dones a cada uno como él quiere.", apoyo: "reparte los dones «a cada uno en particular como él quiere», es decir, tiene voluntad" },
              { frente: "¿A quién se puede conocer: a una fuerza o a una persona?", reverso: "A una persona: a una fuerza no se la conoce.", apoyo: "A una fuerza no se la conoce: a una persona, sí" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Adónde nos guía el Espíritu Santo?", reverso: "A toda la verdad.", apoyo: "El Espíritu hace lo que hace una persona: «él os guiará a toda la verdad»" },
              { frente: "Según Jesús, ¿dónde está el Espíritu respecto de sus discípulos?", reverso: "Mora con ellos, y estará en ellos.", apoyo: "«vosotros le conocéis, porque mora con vosotros, y estará en vosotros»" },
              { frente: "¿Qué manda Pablo sobre el Espíritu en Efesios 4:30?", reverso: "Que no lo contristemos: el Espíritu puede ser entristecido.", apoyo: "y puede ser entristecido: «no contristéis al Espíritu Santo de Dios»" },
              { frente: "¿Qué no se hace con el Espíritu Santo, y qué sí?", reverso: "No se le usa: se le conoce y se le obedece.", apoyo: "Al Espíritu Santo no se le usa: se le conoce y se le obedece" },
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
            consigna: "¿Así presenta la Biblia al Espíritu Santo o así se habla de una fuerza? Lleva cada frase a su grupo.",
            grupos: ["Así lo presenta la Biblia", "Así se habla de una fuerza"],
            frases: [
              { texto: "Enseña y guía a toda la verdad", grupo: 0 },
              { texto: "Reparte los dones como él quiere", grupo: 0 },
              { texto: "Puede ser entristecido", grupo: 0 },
              { texto: "Es otro Consolador, como Jesús", grupo: 0 },
              { texto: "Es una energía que se usa cuando hace falta", grupo: 1 },
              { texto: "Un sentimiento, y nada más", grupo: 1 },
              { texto: "No se le puede conocer", grupo: 1, explica: "A una fuerza no se la conoce: a una persona, sí. Jesús dijo de él: «vosotros le conocéis»." },
            ],
            apoyo: "La Biblia lo presenta de otra manera: como alguien que enseña, guía, se entristece y decide",
            ref: "Juan 14:16-17",
            explica: "La Biblia presenta al Espíritu como alguien que enseña, guía, reparte los dones como él quiere y puede ser entristecido. A una fuerza no se la conoce: a una persona, sí.",
          },
          {
            consigna: "¿Muestra que el Espíritu es una persona o lo reduce a una fuerza? Lleva cada frase a su grupo.",
            grupos: ["Muestra que es una persona", "Lo reduce a una fuerza"],
            frases: [
              { texto: "Tiene voluntad y decide", grupo: 0 },
              { texto: "Los discípulos le conocen", grupo: 0 },
              { texto: "Es otro Consolador que mora en el creyente", grupo: 0 },
              { texto: "Se le puede entristecer", grupo: 0 },
              { texto: "Es una energía de Dios, y nada más", grupo: 1 },
              { texto: "Se le usa para lograr lo que uno quiere", grupo: 1, explica: "Al Espíritu Santo no se le usa: se le conoce y se le obedece." },
              { texto: "Es un sentimiento que se tiene en el culto", grupo: 1 },
            ],
            apoyo: "A una fuerza no se la conoce: a una persona, sí",
            ref: "Juan 14:16-17",
            explica: "El Espíritu tiene voluntad, los discípulos le conocen, mora en el creyente y puede ser entristecido: es una persona. No es una energía ni un sentimiento, y no se le usa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada pregunta sobre el Espíritu Santo con su respuesta.",
            pares: [
              ["¿A quién le mintió Ananías, según Pedro?", "Al Espíritu Santo, y así le mintió a Dios"],
              ["¿Cómo llama Hebreos al Espíritu?", "El Espíritu eterno"],
              ["¿Qué es el Espíritu junto al Padre y al Hijo?", "Una de las tres personas del único Dios"],
              ["¿En qué es igual al Padre y al Hijo?", "En esencia, poder y gloria"],
            ],
            apoyo: "Junto al Padre y al Hijo es una de las tres personas del único Dios, igual a ellos en esencia, poder y gloria",
            ref: "Hechos 5:3-4; Hebreos 9:14",
            explica: "Mentirle al Espíritu es mentirle a Dios, y Hebreos lo llama el Espíritu eterno. Junto al Padre y al Hijo es una de las tres personas del único Dios, igual a ellos en esencia, poder y gloria.",
          },
          {
            consigna: "Une a cada uno con lo que dice del Espíritu Santo.",
            pares: [
              ["Pedro, a Ananías", "«No has mentido a los hombres, sino a Dios»"],
              ["La carta a los Hebreos", "Lo llama «el Espíritu eterno»"],
              ["El artículo 2 de la declaración de fe", "Es igual al Padre y al Hijo en esencia, poder y gloria"],
            ],
            apoyo: "Pedro le dijo a Ananías que había mentido «al Espíritu Santo», y enseguida: «No has mentido a los hombres, sino a Dios»",
            ref: "Hechos 5:3-4",
            explica: "Pedro le dijo a Ananías que no había mentido a los hombres, sino a Dios; Hebreos lo llama el Espíritu eterno, y el artículo 2 de la declaración de fe dice que es igual al Padre y al Hijo en esencia, poder y gloria.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el Espíritu Santo, que es Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Mentirle al Espíritu Santo es mentirle a Dios.", verdad: true, explica: "Pedro le dijo a Ananías que había mentido al Espíritu Santo, y enseguida: «No has mentido a los hombres, sino a Dios».", apoyo: "Mentirle al Espíritu es mentirle a Dios, porque el Espíritu es Dios", ref: "Hechos 5:3-4" },
              { texto: "El Espíritu Santo es menor que el Padre y el Hijo en poder y en gloria.", verdad: false, explica: "Es igual a ellos en esencia, poder y gloria, como dice el artículo 2 de la declaración de fe.", apoyo: "igual a ellos en esencia, poder y gloria" },
              { texto: "El Espíritu tiene atributos que solo tiene Dios: Hebreos lo llama el Espíritu eterno.", verdad: true, explica: "Hebreos lo llama «el Espíritu eterno»: tiene atributos que solo tiene Dios.", apoyo: "Tiene atributos que solo tiene Dios: Hebreos lo llama «el Espíritu eterno»", ref: "Hebreos 9:14" },
            ],
          },
          {
            consigna: "Sobre el Espíritu Santo como persona divina: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El Espíritu Santo es una de las tres personas del único Dios.", verdad: true, explica: "Junto al Padre y al Hijo es una de las tres personas del único Dios.", apoyo: "Junto al Padre y al Hijo es una de las tres personas del único Dios" },
              { texto: "Ananías le mintió al Espíritu Santo, pero no a Dios.", verdad: false, explica: "Pedro le dijo: «No has mentido a los hombres, sino a Dios». Mentirle al Espíritu es mentirle a Dios.", apoyo: "Pedro le dijo a Ananías que había mentido «al Espíritu Santo», y enseguida: «No has mentido a los hombres, sino a Dios»", ref: "Hechos 5:3-4" },
              { texto: "El Espíritu Santo es una fuerza que sale de Dios, pero él no es Dios.", verdad: false, explica: "El Espíritu es una persona, y es Dios: mentirle es mentirle a Dios, y es el Espíritu eterno.", apoyo: "Es Dios: mentirle es mentirle a Dios, y es el Espíritu eterno" },
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
            caso: "Un joven del grupo de alabanza te dice: Antes de cantar pido la fuerza del Espíritu, como quien prende una luz.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que al Espíritu no se le usa como una luz: se le conoce y se le obedece.", bien: true, explica: "Es lo que enseña la lección: al Espíritu Santo no se le usa; se le conoce y se le obedece, como a una persona." },
              { texto: "Que hace bien: el Espíritu es una energía que se prende antes de servir.", explica: "La Biblia no presenta al Espíritu como una energía: es alguien que enseña, guía, se entristece y decide." },
              { texto: "Que no hace falta pedir nada, porque con ensayar bien ya se sirve bien.", explica: "La obra de Dios se hace con su Espíritu, y el obrero necesita conocerlo." },
              { texto: "Que mejor espere a sentir algo especial antes de subir a cantar al frente.", explica: "El Espíritu no es un sentimiento: es una persona que mora en el creyente." },
            ],
            apoyo: "Al Espíritu Santo no se le usa: se le conoce y se le obedece",
            explica: "El Espíritu Santo es una persona que mora en el creyente: no se le usa como una fuerza; se le conoce y se le obedece.",
          },
          {
            caso: "Una maestra de niños te dice: Siento que el Espíritu es como una fuerza que me ayuda. ¿Cómo debo tratarlo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Como a una persona que vive en ti: se le habla, se le conoce y se le obedece.", bien: true, explica: "El Espíritu es otro Consolador que mora en el creyente: a una persona se la conoce." },
              { texto: "Como a una fuerza para los días difíciles: lo buscas solo cuando lo necesitas.", explica: "Al Espíritu Santo no se le usa: se le conoce y se le obedece." },
              { texto: "Como a una energía: no se le habla, porque a una fuerza no se le habla.", explica: "El Espíritu no es una fuerza: es alguien que enseña, guía, se entristece y decide." },
              { texto: "Como a un sentimiento: si un día no lo sientes, es porque ya no está contigo.", explica: "Jesús dijo que el Espíritu mora con los suyos y estará en ellos: no es un sentimiento." },
            ],
            apoyo: "¿Le hablas al Espíritu Santo como a una persona que vive en ti, o como a una fuerza que necesitas?",
            explica: "El Espíritu Santo es una persona que vive en el creyente: no se le usa como a una fuerza; se le conoce y se le obedece.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el obrero y el Espíritu Santo tiene un error. Tócala.",
            frases: [
              "La obra de Dios se hace con su Espíritu.",
              "El obrero necesita conocer al Espíritu Santo.",
              "Al Espíritu Santo se le usa como una fuerza para servir mejor.",
              "Al Espíritu Santo se le conoce y se le obedece.",
            ],
            malo: 2,
            correccion: "Al Espíritu Santo no se le usa: se le conoce y se le obedece.",
            apoyo: "La obra de Dios se hace con su Espíritu, y el obrero necesita conocerlo",
            ref: "Zacarías 4:6",
            explica: "La obra se hace no con ejército, ni con fuerza, sino con el Espíritu de Dios, y el obrero necesita conocerlo: al Espíritu no se le usa; se le conoce y se le obedece.",
          },
          {
            consigna: "Una de estas frases sobre Zacarías 4:6 tiene un error. Tócala.",
            frases: [
              "Zorobabel tenía que reconstruir el templo con pocos recursos.",
              "Dios le dijo a Zorobabel que la obra se haría con ejército y con fuerza.",
              "Zacarías 4:6 es el versículo de memoria de esta materia.",
              "La obra de Dios se hace con su Espíritu.",
            ],
            malo: 1,
            correccion: "Dios le dijo: «No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos».",
            apoyo: "Dios le dijo a Zorobabel, que tenía que reconstruir el templo con pocos recursos",
            ref: "Zacarías 4:6",
            explica: "La obra de Dios no se hace con ejército ni con fuerza, sino con su Espíritu: por eso el obrero necesita conocerlo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "A una fuerza no se la conoce: a una persona, sí",
            ref: "Juan 14:16-17",
            clave: {
              id: "pr-n3-espiritu-santo-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que el Espíritu Santo es una persona y no una fuerza? Da dos razones de la lección.",
              ideas: [
                { id: "conoce", peso: 50, texto: "Jesús lo llama otro Consolador que mora en el creyente: a una fuerza no se la conoce; a una persona, sí.", formas: ["otro consolador", "consolador", "mora (en|con)", "vive en (el|nosotros|mi|los|cada|ti)", "(le|lo|se) (conocemos|conoceis|conoce|conocen)", "se (le|lo) (puede|podemos) conocer"] },
                { id: "hace", peso: 50, texto: "Hace lo que hace una persona: guía a toda la verdad, reparte los dones como él quiere y puede ser entristecido.", formas: ["guia*", "ensen*", "como (el|él) quiere", "voluntad", "decide", "entristec*", "contrist*", "reparte"] },
              ],
              modelo: "Porque hace lo que hace una persona: guía a toda la verdad, reparte los dones como él quiere y puede ser entristecido. Además, Jesús lo llama otro Consolador que mora en nosotros, y a una fuerza no se la conoce.",
            },
          },
          {
            apoyo: "El Espíritu hace lo que hace una persona",
            ref: "Juan 16:13; Efesios 4:30",
            clave: {
              id: "pr-n3-espiritu-santo-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué hace el Espíritu Santo que muestra que es alguien y no algo? Nombra tres cosas.",
              ideas: [
                { id: "guia", peso: 35, texto: "Guía a toda la verdad y enseña.", formas: ["guia*", "ensen*", "toda la verdad"] },
                { id: "voluntad", peso: 35, texto: "Tiene voluntad: reparte los dones como él quiere.", formas: ["voluntad", "como (el|él) quiere", "reparte", "decide"] },
                { id: "entristece", peso: 30, texto: "Puede ser entristecido.", formas: ["entristec*", "contrist*", "triste*"] },
              ],
              modelo: "Guía a toda la verdad, tiene voluntad porque reparte los dones como él quiere, y puede ser entristecido, como dice Efesios 4:30. Eso lo hace una persona, no una fuerza.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El Espíritu en el Antiguo Testamento y en Jesús
    "n3-espiritu-santo-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Aparece el Espíritu Santo por primera vez en Pentecostés?", reverso: "No: está desde la primera página de la Biblia.", apoyo: "El Espíritu Santo no aparece por primera vez en Pentecostés" },
              { frente: "¿Qué hacía el Espíritu de Dios en la creación?", reverso: "Se movía sobre la faz de las aguas y preparaba la vida.", apoyo: "Donde había desorden y vacío, el Espíritu preparaba la vida" },
              { frente: "En el Antiguo Testamento, ¿sobre quiénes venía el Espíritu?", reverso: "Sobre algunas personas, para una tarea: jueces, profetas y reyes.", apoyo: "En el Antiguo Testamento el Espíritu venía sobre algunas personas para una tarea: jueces, profetas y reyes" },
              { frente: "¿Cuál es el mejor ejemplo de la obra del Espíritu?", reverso: "La vida de Jesús.", apoyo: "la vida de Jesús es el mejor ejemplo de su obra" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué anunciaron los profetas sobre el Espíritu?", reverso: "Algo nuevo: ya no sería para unos pocos, sino para todo el pueblo de Dios.", apoyo: "Ya no sería para unos pocos, sino para todo el pueblo de Dios" },
              { frente: "¿Cómo fue concebido Jesús?", reverso: "Por el Espíritu Santo.", apoyo: "Jesús fue concebido por el Espíritu" },
              { frente: "¿Qué pasó mientras Jesús oraba en su bautismo?", reverso: "El Espíritu Santo descendió sobre él en forma corporal, como paloma.", apoyo: "mientras oraba en su bautismo, «descendió el Espíritu Santo sobre él en forma corporal, como paloma»" },
              { frente: "Ungido con el Espíritu Santo y con poder, ¿qué hizo Jesús?", reverso: "Anduvo haciendo bienes y sanando a los oprimidos por el diablo.", apoyo: "él «anduvo haciendo bienes y sanando a todos los oprimidos por el diablo»" },
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
            consigna: "Completa lo que hacía el Espíritu en la creación.",
            texto: "En la creación, donde había [[desorden]] y [[vacío]], el Espíritu de Dios preparaba la [[vida]].",
            distractores: ["orden", "luz", "muerte"],
            errores: {
              orden: "En la creación había desorden y vacío, y allí el Espíritu preparaba la vida.",
              luz: "Donde había desorden y vacío, el Espíritu de Dios se movía sobre la faz de las aguas.",
              muerte: "Donde había desorden y vacío, el Espíritu preparaba la vida.",
            },
            apoyo: "Donde había desorden y vacío, el Espíritu preparaba la vida",
            ref: "Génesis 1:2",
            explica: "En la creación, el Espíritu de Dios se movía sobre la faz de las aguas: donde había desorden y vacío, preparaba la vida.",
          },
          {
            consigna: "Completa cómo obraba el Espíritu en el Antiguo Testamento.",
            texto: "En el Antiguo Testamento el Espíritu venía sobre algunas [[personas]] para una [[tarea]]: jueces, profetas y [[reyes]].",
            distractores: ["ciudades", "fiesta", "magos"],
            errores: {
              ciudades: "El Espíritu venía sobre algunas personas, como jueces, profetas y reyes.",
              fiesta: "El Espíritu venía sobre ellas para una tarea.",
              magos: "Venía sobre jueces, profetas y reyes, como David.",
            },
            apoyo: "En el Antiguo Testamento el Espíritu venía sobre algunas personas para una tarea",
            ref: "1 Samuel 16:13",
            explica: "En el Antiguo Testamento el Espíritu venía sobre algunas personas para una tarea, como jueces, profetas y reyes. Cuando Samuel ungió a David, desde aquel día el Espíritu de Jehová vino sobre David.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es cómo obraba el Espíritu en el Antiguo Testamento o lo nuevo que anunciaron los profetas? Lleva cada frase a su grupo.",
            grupos: ["Así obraba en el Antiguo Testamento", "Lo nuevo que anunciaron los profetas"],
            frases: [
              { texto: "Venía sobre algunas personas", grupo: 0 },
              { texto: "Venía para una tarea, sobre jueces, profetas y reyes", grupo: 0 },
              { texto: "Vino sobre David cuando Samuel lo ungió", grupo: 0 },
              { texto: "Dios pondría su Espíritu dentro de su pueblo", grupo: 1 },
              { texto: "Dios lo derramaría sobre toda carne", grupo: 1 },
              { texto: "Sería para hijos e hijas, jóvenes y ancianos", grupo: 1 },
              { texto: "Ya no sería para unos pocos", grupo: 1 },
            ],
            apoyo: "Los profetas anunciaron algo nuevo",
            ref: "Ezequiel 36:26-27; Joel 2:28-29",
            explica: "En el Antiguo Testamento el Espíritu venía sobre algunos para una tarea. Los profetas anunciaron algo nuevo: Dios pondría su Espíritu dentro de su pueblo y lo derramaría sobre toda carne.",
          },
          {
            consigna: "¿Se dice del Espíritu en el Antiguo Testamento o de la promesa de los profetas? Lleva cada frase a su grupo.",
            grupos: ["En el Antiguo Testamento", "En la promesa de los profetas"],
            frases: [
              { texto: "Jueces, profetas y reyes lo recibían para una tarea", grupo: 0 },
              { texto: "El Espíritu de Jehová vino sobre David", grupo: 0 },
              { texto: "Era para unos pocos", grupo: 0 },
              { texto: "Haría que el pueblo anduviera en los estatutos de Dios", grupo: 1 },
              { texto: "Lo recibirían aun los siervos y las siervas", grupo: 1 },
              { texto: "Sería para todo el pueblo de Dios", grupo: 1 },
              { texto: "Se derramaría sobre toda carne", grupo: 1 },
            ],
            apoyo: "Ya no sería para unos pocos, sino para todo el pueblo de Dios",
            ref: "1 Samuel 16:13; Joel 2:28-29",
            explica: "Antes, el Espíritu venía sobre algunos, como David, para una tarea. Los profetas prometieron que sería para todo el pueblo de Dios: hijos e hijas, jóvenes y ancianos, siervos y siervas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En Joel, ¿sobre quiénes derramaría Dios su Espíritu? Toca las palabras que lo dicen.",
            texto: "derramaré mi Espíritu sobre [[toda carne]]",
            apoyo: "Joel: «derramaré mi Espíritu sobre toda carne», sobre hijos e hijas, jóvenes y ancianos, siervos y siervas",
            ref: "Joel 2:28",
            explica: "Joel anunció que Dios derramaría su Espíritu sobre toda carne: hijos e hijas, jóvenes y ancianos, siervos y siervas. Ya no sería para unos pocos.",
          },
          {
            consigna: "En Ezequiel, ¿dónde pondría Dios su Espíritu? Toca las palabras que lo dicen.",
            texto: "pondré [[dentro de vosotros]] mi Espíritu, y haré que andéis en mis estatutos",
            apoyo: "Ezequiel: «pondré dentro de vosotros mi Espíritu, y haré que andéis en mis estatutos»",
            ref: "Ezequiel 36:27",
            explica: "Ezequiel anunció algo nuevo: Dios pondría su Espíritu dentro de su pueblo y haría que anduvieran en sus estatutos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "Sigue la obra del Espíritu en la vida de Jesús. Ordena los hechos, del primero al último.",
            eventos: [
              { texto: "Jesús es concebido por el Espíritu Santo", fecha: "Lucas 1:35" },
              { texto: "Mientras ora en su bautismo, el Espíritu desciende sobre él como paloma", fecha: "Lucas 3:21-22" },
              { texto: "Lleno del Espíritu Santo, vuelve del Jordán", fecha: "Lucas 4:1" },
              { texto: "En Nazaret lee de Isaías que el Espíritu está sobre él", fecha: "Lucas 4:18" },
              { texto: "Pedro resume su ministerio: Dios lo ungió con el Espíritu Santo y con poder", fecha: "Hechos 10:38" },
            ],
            apoyo: "Jesús fue concebido por el Espíritu, recibió el Espíritu en su bautismo y sirvió lleno de él",
            explica: "Jesús fue concebido por el Espíritu, recibió el Espíritu en su bautismo, volvió del Jordán lleno de él y en Nazaret leyó que el Espíritu estaba sobre él. Pedro lo resumió después: Dios lo ungió con el Espíritu Santo y con poder.",
          },
          {
            consigna: "Ordena en el tiempo lo que el Espíritu hizo en Jesús, del primero al último.",
            eventos: [
              { texto: "Antes de nacer, es concebido por el Espíritu Santo", fecha: "Lucas 1:35" },
              { texto: "Al empezar su ministerio, recibe el Espíritu en su bautismo", fecha: "Lucas 3:21-22" },
              { texto: "Vuelve del Jordán lleno del Espíritu Santo", fecha: "Lucas 4:1" },
              { texto: "Lee en Nazaret: «Por cuanto me ha ungido para dar buenas nuevas a los pobres»", fecha: "Lucas 4:18" },
              { texto: "Anda haciendo bienes y sanando a los oprimidos por el diablo", fecha: "Hechos 10:38" },
            ],
            apoyo: "Desde entonces, Jesús vivió y sirvió en el Espíritu",
            explica: "Jesús fue concebido por el Espíritu y lo recibió en su bautismo. Desde entonces vivió y sirvió en el Espíritu: volvió del Jordán lleno de él, leyó en Nazaret que el Espíritu lo había ungido y anduvo haciendo bienes y sanando.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una maestra de niños te dice: Ya tengo experiencia; preparo mis clases y no necesito orar tanto por el Espíritu.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que si Jesús sirvió en el poder del Espíritu, ella también lo necesita.", bien: true, explica: "Si Jesús, el Hijo de Dios, sirvió en el poder del Espíritu, el obrero no puede servir con sus propias fuerzas." },
              { texto: "Que tiene razón: con experiencia ya basta, y el Espíritu es para los nuevos.", explica: "Jesús, el Hijo de Dios, sirvió lleno del Espíritu: el obrero no puede servir con sus propias fuerzas." },
              { texto: "Que ore solo cuando algo le salga mal, y lo demás con sus fuerzas.", explica: "El obrero no puede servir con sus propias fuerzas: necesita el poder del Espíritu, como Jesús." },
              { texto: "Que el poder del Espíritu era solo para Jesús, porque él era el Hijo de Dios.", explica: "Pedro dice que Dios ungió a Jesús con el Espíritu Santo y con poder; si Jesús sirvió así, ella también lo necesita." },
            ],
            apoyo: "Si Jesús sirvió en el poder del Espíritu, tú también lo necesitas",
            ref: "Hechos 10:38",
            explica: "Jesús vivió y sirvió en el Espíritu: Dios lo ungió con el Espíritu Santo y con poder. Si Jesús sirvió así, el obrero tampoco puede servir con sus propias fuerzas.",
          },
          {
            caso: "Un joven que discipulas te dice: Para mí, el Espíritu Santo no tuvo nada que ver con el ministerio de Jesús.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Dios ungió a Jesús con el Espíritu Santo y con poder, y así sanaba.", bien: true, explica: "Pedro lo resumió así: «Dios ungió con el Espíritu Santo y con poder a Jesús de Nazaret», y él anduvo haciendo bienes y sanando." },
              { texto: "Que tiene razón: Jesús nunca necesitó al Espíritu para servir.", explica: "Jesús vivió y sirvió en el Espíritu: «Jesús, lleno del Espíritu Santo, volvió del Jordán»." },
              { texto: "Que el Espíritu estuvo con Jesús solo el día de su bautismo, y después se fue.", explica: "Desde su bautismo, Jesús vivió y sirvió en el Espíritu, lleno de él." },
              { texto: "Que el Espíritu empezó a obrar en Jesús recién después de su resurrección.", explica: "Jesús fue concebido por el Espíritu, lo recibió en su bautismo y sirvió lleno de él." },
            ],
            apoyo: "Pedro lo resumió así: «Dios ungió con el Espíritu Santo y con poder a Jesús de Nazaret»",
            ref: "Hechos 10:38",
            explica: "Jesús fue concebido por el Espíritu, recibió el Espíritu en su bautismo y sirvió lleno de él: Dios lo ungió con el Espíritu Santo y con poder.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús fue concebido por el Espíritu, recibió el Espíritu en su bautismo y sirvió lleno de él",
            ref: "Lucas 4:1; Hechos 10:38",
            clave: {
              id: "pr-n3-espiritu-santo-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hizo el Espíritu Santo en la vida y el ministerio de Jesús?",
              ideas: [
                { id: "concebido", peso: 35, texto: "Jesús fue concebido por el Espíritu.", formas: ["concebid*", "concibi*", "concepcion", "engendr*"] },
                { id: "bautismo", peso: 35, texto: "Recibió el Espíritu en su bautismo: descendió sobre él como paloma.", formas: ["bautis*", "bautiz*", "paloma", "descendi* sobre", "jordan"] },
                { id: "ungio", peso: 30, texto: "Sirvió lleno del Espíritu: Dios lo ungió con el Espíritu Santo y con poder.", formas: ["ungi*", "llen*", "con poder", "sana*", "(hacer|haciendo|hizo|hacia) bienes", "buenas nuevas"] },
              ],
              modelo: "Jesús fue concebido por el Espíritu, recibió el Espíritu en su bautismo, cuando descendió sobre él como paloma, y sirvió lleno de él: Dios lo ungió con el Espíritu Santo y con poder.",
            },
          },
          {
            apoyo: "Si Jesús, el Hijo de Dios, sirvió en el poder del Espíritu, el obrero no puede servir con sus propias fuerzas",
            ref: "Hechos 10:38",
            clave: {
              id: "pr-n3-espiritu-santo-2-a7-2",
              tipo: "corta",
              pregunta: "Si Jesús sirvió en el poder del Espíritu, ¿qué significa eso para el obrero de hoy?",
              ideas: [
                { id: "jesus", peso: 50, texto: "Dios ungió a Jesús con el Espíritu Santo y con poder, y él anduvo haciendo bienes y sanando.", formas: ["ungi*", "con poder", "(hacer|haciendo|hizo|hacia) bienes", "sana*", "llen*"] },
                { id: "obrero", peso: 50, texto: "El obrero no puede servir con sus propias fuerzas: también necesita el poder del Espíritu.", formas: ["propias fuerzas", "(sus|mis|nuestras|tus) fuerzas", "(tambien|igual) (lo|la) necesit*", "necesit* (el|al|del|su) (poder|espiritu)", "no (puede|podemos|puedo|debe|debemos) servir (con|solo|sin)"] },
              ],
              errores: [
                { id: "fuerzas", texto: "Si Jesús sirvió en el poder del Espíritu, el obrero no puede servir con sus propias fuerzas.", formas: ["(servir|sirve|servimos|sirvo|sirva) con (sus|mis|nuestras|tus|propias) (propias|fuerzas)", "(basta|bastan|alcanza|alcanzan) fuerzas"], anula: "obrero" },
              ],
              modelo: "Dios ungió a Jesús con el Espíritu Santo y con poder, y así anduvo haciendo bienes y sanando. Por eso el obrero no puede servir con sus propias fuerzas: también necesita el poder del Espíritu.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. El Espíritu en la salvación
    "n3-espiritu-santo-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué convence el Espíritu al mundo?", reverso: "De pecado, de justicia y de juicio.", apoyo: "Convence de pecado, de justicia y de juicio" },
              { frente: "¿Por qué el obrero ora antes de evangelizar?", reverso: "Porque la convicción la produce el Espíritu.", apoyo: "Por eso el obrero ora antes de evangelizar: la convicción la produce el Espíritu" },
              { frente: "¿Qué es la regeneración?", reverso: "La obra del Espíritu que hace nacer de nuevo.", apoyo: "Hace nacer de nuevo: la regeneración" },
              { frente: "¿Desde cuándo tiene al Espíritu todo creyente?", reverso: "Desde el día en que creyó.", apoyo: "todo creyente tiene al Espíritu desde el día en que creyó" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace el Espíritu antes de dar poder para servir?", reverso: "Da vida.", apoyo: "Antes de dar poder para servir, el Espíritu da vida" },
              { frente: "¿Puede alguien llegar a Cristo sin la obra del Espíritu?", reverso: "No: nadie llega a Cristo sin su obra.", apoyo: "Nadie llega a Cristo sin su obra" },
              { frente: "¿Qué dice Romanos 8:9 de quien no tiene el Espíritu de Cristo?", reverso: "Que no es de él.", apoyo: "«si alguno no tiene el Espíritu de Cristo, no es de él»" },
              { frente: "Según Tito 3:5, ¿por medio de qué nos salvó Dios?", reverso: "Por el lavamiento de la regeneración y la renovación en el Espíritu Santo.", apoyo: "por el lavamiento de la regeneración y por la renovación en el Espíritu Santo" },
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
            consigna: "Une cada obra del Espíritu en la salvación con lo que hace.",
            pares: [
              ["Convence", "Al mundo, de pecado, de justicia y de juicio"],
              ["Regenera", "Hace nacer de nuevo"],
              ["Mora", "Vive en todo creyente desde que creyó"],
              ["Da testimonio", "De que somos hijos de Dios"],
              ["Une", "A cada creyente al cuerpo de Cristo"],
            ],
            apoyo: "El Espíritu Santo obra en la salvación: convence de pecado, hace nacer de nuevo por la regeneración, vive en todo creyente",
            explica: "El Espíritu convence al mundo de pecado, hace nacer de nuevo (la regeneración), vive en todo creyente, da testimonio de que somos hijos de Dios y une a cada creyente al cuerpo de Cristo.",
          },
          {
            consigna: "Une cada pasaje con lo que dice de la obra del Espíritu en la salvación.",
            pares: [
              ["Juan 16:8", "Convence al mundo de pecado, de justicia y de juicio"],
              ["Juan 3:5-6", "Hace nacer de nuevo a quien cree"],
              ["Romanos 8:9", "Quien no tiene el Espíritu de Cristo no es de él"],
              ["Efesios 1:13-14", "Al creer, fuimos sellados con el Espíritu Santo"],
              ["1 Corintios 12:13", "Por un solo Espíritu fuimos bautizados en un cuerpo"],
            ],
            apoyo: "Desde ese momento, el Espíritu vive en el creyente",
            explica: "El Espíritu convence al mundo (Juan 16:8), hace nacer de nuevo (Juan 3:5-6), vive en el creyente (Romanos 8:9), lo sella (Efesios 1:13-14) y lo une al cuerpo de Cristo (1 Corintios 12:13).",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Por eso el obrero ora antes de evangelizar: la convicción la produce el Espíritu",
            ref: "Juan 16:8",
            situacion: "Eres líder de célula. El sábado tu grupo va a salir a compartir el evangelio en el barrio, y te toca prepararlo.",
            escenas: [
              {
                id: "e1",
                narra: "El jueves se reúnen para prepararse.",
                pregunta: "¿Cómo empiezas?",
                opciones: [
                  { texto: "Oran juntos por las personas del barrio antes de salir a hablarles.", valor: 2, explica: "El obrero ora antes de evangelizar: la convicción la produce el Espíritu, que convence al mundo de pecado.", siguiente: "e2" },
                  { texto: "Repasan cómo explicar el evangelio con claridad, y oran al final.", valor: 1, explica: "Explicar con claridad ayuda, pero la convicción la produce el Espíritu: por eso el obrero ora antes de evangelizar.", siguiente: "e2" },
                  { texto: "Ensayan respuestas fuertes para ganar las discusiones y convencerlos ustedes.", valor: 0, explica: "La convicción no la producen nuestras discusiones: la produce el Espíritu. Nadie llega a Cristo sin su obra.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "En la calle, un señor discute con ustedes y se va molesto.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Oras por él y le pides a Dios que obre en su corazón.", valor: 2, explica: "El Espíritu prepara el corazón: la convicción la produce él.", siguiente: "e2" },
                  { texto: "Lo sigues para seguir discutiendo hasta que te dé la razón.", valor: 0, explica: "Nadie llega a Cristo sin la obra del Espíritu: la convicción la produce él.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Una joven escucha con atención y dice que quiere recibir a Cristo.",
                pregunta: "¿Qué le explicas de la obra del Espíritu?",
                opciones: [
                  { texto: "Que el Espíritu la hace nacer de nuevo y viene a vivir en ella.", valor: 2, explica: "El Espíritu hace nacer de nuevo, y desde ese momento vive en el creyente." },
                  { texto: "Que primero debe cambiar sola, y después el Espíritu la va a aceptar.", valor: 0, explica: "Dios «nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia»." },
                  { texto: "Que el Espíritu vendrá a vivir en ella cuando madure.", valor: 0, explica: "Todo creyente tiene al Espíritu desde el día en que creyó." },
                ],
              },
              {
                id: "e3",
                narra: "Una semana después, ella te escribe: No siento nada distinto. ¿De verdad soy de Cristo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que si es de Cristo, el Espíritu ya vive en ella y le da seguridad.", valor: 2, explica: "Si eres de Cristo, el Espíritu ya vive en ti, y da testimonio de que eres hija de Dios." },
                  { texto: "Que todavía no tiene al Espíritu, y que espere a sentir algo especial.", valor: 0, explica: "Todo creyente tiene al Espíritu desde el día en que creyó." },
                  { texto: "Que ore más, y que tal vez algún día llegue a ser hija de Dios.", valor: 0, explica: "El Espíritu da testimonio de que somos hijos de Dios: por él clamamos «¡Abba, Padre!»." },
                ],
              },
            ],
          },
          {
            apoyo: "Nadie llega a Cristo sin su obra, y todo creyente tiene al Espíritu desde el día en que creyó",
            ref: "Juan 3:5-6",
            situacion: "Eres maestro de una clase de nuevos creyentes. Hoy les explicas qué hizo el Espíritu Santo en su salvación.",
            escenas: [
              {
                id: "e1",
                narra: "Un alumno dice: Yo llegué a Cristo porque mi amigo me convenció con buenos argumentos.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que su amigo le habló, pero quien lo convenció de pecado fue el Espíritu.", valor: 2, explica: "El Espíritu convence al mundo de pecado, de justicia y de juicio: nadie llega a Cristo sin su obra." },
                  { texto: "Que dé gracias a Dios por su amigo, que le habló con tanta paciencia.", valor: 1, explica: "Dar gracias por el amigo está bien, pero falta lo central: la convicción la produce el Espíritu." },
                  { texto: "Que tiene razón: llegar a Cristo depende de quién tenga los mejores argumentos.", valor: 0, explica: "Nadie llega a Cristo sin la obra del Espíritu: él convence de pecado." },
                ],
              },
              {
                id: "e2",
                narra: "Una alumna pregunta: ¿Qué quiere decir nacer de nuevo?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el Espíritu nos hace nacer de nuevo: eso es la regeneración.", valor: 2, explica: "«lo que es nacido del Espíritu, espíritu es»: la regeneración es obra del Espíritu." },
                  { texto: "Que es empezar a portarse mejor con su esfuerzo.", valor: 0, explica: "Dios «nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia»." },
                  { texto: "Que es lo mismo que hacerse miembro de una iglesia y asistir a ella.", valor: 0, explica: "Nacer de nuevo es obra del Espíritu: es la regeneración." },
                ],
              },
              {
                id: "e3",
                narra: "Otro alumno dice: Creí en Cristo hace un mes. ¿Ya tengo al Espíritu Santo?",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que sí: todo creyente tiene al Espíritu desde el día en que creyó.", valor: 2, explica: "«si alguno no tiene el Espíritu de Cristo, no es de él»: desde que creyó, el Espíritu vive en él." },
                  { texto: "Que todavía no: el Espíritu vive solo en los creyentes más antiguos.", valor: 0, explica: "El Espíritu vive en todo creyente, desde el día en que creyó." },
                  { texto: "Que nadie puede saberlo hasta el final de su vida.", valor: 0, explica: "El Espíritu da seguridad de la adopción: da testimonio de que somos hijos de Dios." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que significan el sello y las arras del Espíritu.",
            texto: "El [[sello]] dice a quién pertenecemos, y las [[arras]] son el [[adelanto]] de lo que vendrá.",
            distractores: ["temor", "obras", "final"],
            errores: {
              temor: "Es el sello del Espíritu el que dice a quién pertenecemos.",
              obras: "Las arras del Espíritu son el adelanto de lo que vendrá.",
              final: "Las arras son el adelanto de lo que vendrá, no el final.",
            },
            apoyo: "El sello dice a quién pertenecemos, y las arras son el adelanto de lo que vendrá",
            ref: "Efesios 1:13-14",
            explica: "Al creer, fuimos sellados con el Espíritu Santo de la promesa, que es las arras de nuestra herencia: el sello dice a quién pertenecemos, y las arras son el adelanto de lo que vendrá.",
          },
          {
            consigna: "Completa lo que hace en el creyente el espíritu de adopción.",
            texto: "El Espíritu nos da [[seguridad]] de nuestra [[adopción]]: por él clamamos a Dios como [[Padre]].",
            distractores: ["miedo", "condena", "juez"],
            errores: {
              miedo: "El Espíritu le da al creyente seguridad de su adopción.",
              condena: "«habéis recibido el espíritu de adopción»: el Espíritu da testimonio de que somos hijos de Dios.",
              juez: "Por el espíritu de adopción clamamos: «¡Abba, Padre!».",
            },
            apoyo: "Y le da seguridad de su adopción",
            ref: "Romanos 8:15-16",
            explica: "El Espíritu vive en el creyente y le da seguridad de su adopción: «habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre!».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿De qué es las arras el Espíritu Santo de la promesa? Toca las palabras que lo dicen.",
            texto: "fuisteis sellados con el Espíritu Santo de la promesa, que es las arras de [[nuestra herencia]]",
            apoyo: "Además, al creer, «fuisteis sellados con el Espíritu Santo de la promesa, que es las arras de nuestra herencia»",
            ref: "Efesios 1:13-14",
            explica: "Al creer, fuimos sellados con el Espíritu Santo de la promesa, que es las arras de nuestra herencia: el adelanto de lo que vendrá.",
          },
          {
            consigna: "¿Cómo clamamos a Dios por el espíritu de adopción? Toca las palabras que lo dicen.",
            texto: "habéis recibido el espíritu de adopción, por el cual clamamos: [[¡Abba, Padre!]]",
            apoyo: "Y le da seguridad de su adopción",
            ref: "Romanos 8:15",
            explica: "El Espíritu da testimonio de que somos hijos de Dios: por él clamamos «¡Abba, Padre!».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la obra del Espíritu en la salvación y el bautismo en el Espíritu: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todo creyente tiene al Espíritu Santo desde que creyó.", verdad: true, explica: "«si alguno no tiene el Espíritu de Cristo, no es de él»: todo creyente tiene al Espíritu desde que creyó.", apoyo: "Todo creyente tiene al Espíritu desde que creyó", ref: "Romanos 8:9" },
              { texto: "Quien todavía no recibió el bautismo en el Espíritu no tiene al Espíritu Santo.", verdad: false, explica: "La obra del Espíritu en la salvación es para todos los que creen: todo creyente tiene al Espíritu desde que creyó.", apoyo: "La tradición pentecostal distingue esta obra, que es para todos los que creen, del bautismo en el Espíritu Santo para recibir poder" },
              { texto: "La tradición pentecostal distingue la obra del Espíritu en la salvación del bautismo en el Espíritu.", verdad: true, explica: "La tradición pentecostal distingue esta obra, que es para todos los que creen, del bautismo en el Espíritu para recibir poder.", apoyo: "La tradición pentecostal distingue esta obra del bautismo en el Espíritu para recibir poder" },
            ],
          },
          {
            consigna: "Sobre el Espíritu en la salvación: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Antes de dar poder para servir, el Espíritu da vida.", verdad: true, explica: "Antes de dar poder para servir, el Espíritu da vida: nadie llega a Cristo sin su obra.", apoyo: "Antes de dar poder para servir, el Espíritu da vida" },
              { texto: "El Espíritu une a cada creyente al cuerpo de Cristo.", verdad: true, explica: "«por un solo Espíritu fuimos todos bautizados en un cuerpo»: el Espíritu une a cada creyente al cuerpo de Cristo.", apoyo: "el Espíritu une a cada creyente al cuerpo de Cristo", ref: "1 Corintios 12:13" },
              { texto: "El Espíritu une al cuerpo de Cristo solo a los creyentes que ya recibieron poder.", verdad: false, explica: "Esa obra es para todos los que creen: «por un solo Espíritu fuimos todos bautizados en un cuerpo».", apoyo: "La tradición pentecostal distingue esta obra, que es para todos los que creen", ref: "1 Corintios 12:13" },
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
            apoyo: "La tradición pentecostal distingue esta obra, que es para todos los que creen, del bautismo en el Espíritu Santo para recibir poder",
            ref: "Romanos 8:9; 1 Corintios 12:13",
            clave: {
              id: "pr-n3-espiritu-santo-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué distingue la tradición pentecostal entre la obra del Espíritu en la salvación y el bautismo en el Espíritu?",
              ideas: [
                { id: "todos", peso: 50, texto: "La obra del Espíritu en la salvación es para todos los que creen: todo creyente tiene al Espíritu desde que creyó.", formas: ["todos los que creen", "todo el que (cree|creyo)", "todo creyente", "todos los creyentes", "cada creyente", "desde que (creyo|creyeron|creemos|cree|creimos|crei|creen)", "(nacer|nace|nacemos|nacen|nacio) de nuevo", "regenera*", "vive en (el|todo|cada|nosotros|los)"] },
                { id: "poder", peso: 50, texto: "El bautismo en el Espíritu es para recibir poder.", formas: ["recibir poder", "para (el|recibir|tener|dar) poder", "da poder", "poder para", "con poder", "(el|su) poder"] },
              ],
              errores: [
                { id: "mismo", texto: "La tradición pentecostal distingue la obra del Espíritu en la salvación del bautismo en el Espíritu para recibir poder.", formas: ["(son|es) lo mismo", "(son|es) (iguales|igual)", "misma (cosa|obra|experiencia)"], anula: "poder" },
              ],
              modelo: "La obra del Espíritu en la salvación es para todos los que creen: todo creyente tiene al Espíritu desde que creyó. El bautismo en el Espíritu, en cambio, es para recibir poder.",
            },
          },
          {
            apoyo: "Todo creyente tiene al Espíritu desde que creyó",
            ref: "Romanos 8:9",
            clave: {
              id: "pr-n3-espiritu-santo-3-a7-2",
              tipo: "corta",
              pregunta: "¿Tiene al Espíritu Santo un creyente que todavía no ha recibido el bautismo en el Espíritu? Explica según la lección.",
              ideas: [
                { id: "tiene", peso: 50, texto: "Sí: todo creyente tiene al Espíritu desde el día en que creyó.", formas: ["todo creyente", "todos los creyentes", "cada creyente", "desde que (creyo|cree|creyeron|crei|creemos|creimos)", "desde el dia", "(si|ya) (lo|la|tiene)"] },
                { id: "distinto", peso: 50, texto: "El bautismo en el Espíritu es otra obra, para recibir poder, que la tradición pentecostal distingue de la salvación.", formas: ["recibir poder", "para (recibir|tener|el|dar) poder", "da poder", "poder para", "distingu*", "distint*", "otra (obra|cosa|experiencia)"] },
              ],
              errores: [
                { id: "no-tiene", texto: "Todo creyente tiene al Espíritu desde el día en que creyó.", formas: ["todavia no (lo|la) tiene", "aun no (lo|la) tiene", "no (lo|la) tiene todavia", "no tiene (al|el) espiritu hasta", "solo tiene (al|el) espiritu"], anula: "tiene" },
                { id: "no-tiene-poder", texto: "La tradición pentecostal distingue la obra del Espíritu en la salvación, que es para todos los que creen, del bautismo en el Espíritu para recibir poder.", formas: ["todavia no (lo|la) tiene", "aun no (lo|la) tiene", "no (lo|la) tiene todavia", "no tiene (al|el) espiritu hasta", "solo tiene (al|el) espiritu"], anula: "distinto" },
              ],
              modelo: "Sí: todo creyente tiene al Espíritu desde el día en que creyó. El bautismo en el Espíritu es otra obra, para recibir poder, que la tradición pentecostal distingue de la obra en la salvación.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. El bautismo en el Espíritu Santo
    "n3-espiritu-santo-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué mandó Jesús a sus discípulos antes de salir a predicar?", reverso: "Que esperaran la promesa del Padre.", apoyo: "Jesús mandó a sus discípulos esperar antes de salir a predicar" },
              { frente: "¿Qué dijo Jesús que les pasaría a los discípulos dentro de no muchos días?", reverso: "Serían bautizados con el Espíritu Santo.", apoyo: "«vosotros seréis bautizados con el Espíritu Santo dentro de no muchos días»" },
              { frente: "¿Para qué es el bautismo en el Espíritu, según dijo Jesús?", reverso: "Para recibir poder y ser sus testigos.", apoyo: "El propósito lo había dicho Jesús: poder para ser sus testigos" },
              { frente: "¿Ya creían en Jesús los discípulos cuando esperaban la promesa?", reverso: "Sí, pero todavía tenían que recibir esa promesa.", apoyo: "Los discípulos ya creían en él, pero todavía tenían que recibir esa promesa" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuándo se cumplió la promesa del Padre?", reverso: "En Pentecostés: fueron todos llenos del Espíritu Santo.", apoyo: "En Pentecostés se cumplió" },
              { frente: "¿Para quién es la promesa del bautismo en el Espíritu?", reverso: "Para todo creyente.", apoyo: "Es una promesa para todo creyente" },
              { frente: "¿Cómo se recibe el bautismo en el Espíritu?", reverso: "Con fe, pidiéndolo al Padre.", apoyo: "Se recibe con fe, pidiéndolo al Padre" },
              { frente: "¿Qué no se puede hacer con el bautismo en el Espíritu?", reverso: "Ni ganarlo ni fabricarlo.", apoyo: "No se gana ni se fabrica: se pide al Padre con un corazón dispuesto" },
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
            consigna: "Completa qué es el bautismo en el Espíritu según Hechos.",
            texto: "Jesús mandó esperar la [[promesa]] del Padre: el bautismo con el Espíritu Santo, para recibir [[poder]] y ser sus [[testigos]].",
            distractores: ["ley", "fama", "jueces"],
            errores: {
              ley: "Jesús les mandó que esperaran la promesa del Padre.",
              fama: "El bautismo en el Espíritu es para recibir poder, no fama.",
              jueces: "El propósito lo había dicho Jesús: poder para ser sus testigos.",
            },
            apoyo: "Jesús mandó esperar la promesa del Padre: el bautismo con el Espíritu Santo, para recibir poder y ser sus testigos",
            ref: "Hechos 1:4-5",
            explica: "Jesús mandó esperar la promesa del Padre, el bautismo con el Espíritu Santo, que se cumplió en Pentecostés. Su propósito: poder para ser sus testigos.",
          },
          {
            consigna: "Completa para quién es esta promesa y cómo se recibe.",
            texto: "Es una [[promesa]] para todo [[creyente]]: se recibe con fe, pidiéndola al [[Padre]].",
            distractores: ["deuda", "pastor", "profeta"],
            errores: {
              deuda: "Es una promesa del Padre, no una deuda.",
              pastor: "Es una promesa para todo creyente, no solo para los pastores.",
              profeta: "Se pide al Padre: «¿cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?».",
            },
            apoyo: "Es una promesa para todo creyente, y se recibe con fe, pidiéndola",
            ref: "Lucas 11:13",
            explica: "Es una promesa para todo creyente, y se recibe con fe, pidiéndola al Padre. No se gana ni se fabrica.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu célula te dice: Quiero ser lleno del Espíritu para servir, pero primero tengo que ganármelo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no se gana: se pide al Padre con fe y con un corazón dispuesto.", bien: true, explica: "Es lo que enseña la lección: no se gana ni se fabrica; se pide al Padre con un corazón dispuesto." },
              { texto: "Que sí: primero tiene que hacer muchas obras buenas para poder merecerlo.", explica: "No se gana ni se fabrica: se pide al Padre con un corazón dispuesto." },
              { texto: "Que eso es solo para los pastores y los líderes de la iglesia.", explica: "Es una promesa para todo creyente." },
              { texto: "Que no pida nada: si Dios quiere, se lo va a dar aunque no lo pida.", explica: "Se recibe con fe, pidiéndolo: el Padre da el Espíritu Santo a los que se lo piden." },
            ],
            apoyo: "No se gana ni se fabrica: se pide al Padre con un corazón dispuesto",
            ref: "Lucas 11:13",
            explica: "Es una promesa para todo creyente, y se recibe con fe, pidiéndola al Padre: «¿cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?».",
          },
          {
            caso: "Una hermana nueva te dice: Ya creo en Cristo. ¿Para qué voy a pedir el bautismo en el Espíritu?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Para recibir poder y ser testigo de Jesús, como los que ya creían en él.", bien: true, explica: "Los discípulos ya creían en Jesús, pero todavía tenían que recibir la promesa del Padre: poder para ser sus testigos." },
              { texto: "Para ser salva de verdad, porque sin ese bautismo todavía no eres de Cristo.", explica: "Los discípulos ya creían en él, pero todavía tenían que recibir esa promesa. Su propósito es poder para ser testigos." },
              { texto: "Para que todos vean que eres más espiritual que los demás.", explica: "El propósito lo había dicho Jesús: poder para ser sus testigos." },
              { texto: "No te hace falta: esa promesa era solo para los primeros discípulos de Jesús.", explica: "Es una promesa para todo creyente." },
            ],
            apoyo: "Los discípulos ya creían en él, pero todavía tenían que recibir esa promesa",
            ref: "Hechos 1:4-5",
            explica: "Los discípulos ya creían en Jesús, pero todavía tenían que recibir la promesa del Padre. Su propósito: poder para ser sus testigos. Es una promesa para todo creyente.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena lo que pasó en Samaria, según Hechos 8, del primero al último.",
            pasos: ["La gente cree el mensaje", "Son bautizados en agua", "Pedro y Juan oran por ellos", "Les imponen las manos", "Reciben el Espíritu Santo"],
            apoyo: "En Samaria, la gente había creído y había sido bautizada en agua, pero el Espíritu «aún no había descendido sobre ninguno de ellos»",
            ref: "Hechos 8:14-17",
            explica: "En Samaria la gente había creído y había sido bautizada en agua, pero el Espíritu aún no había descendido sobre ninguno. Pedro y Juan oraron, les imponían las manos, y recibían el Espíritu Santo.",
          },
          {
            consigna: "Ordena lo que pasó en Éfeso, según Hechos 19, del primero al último.",
            pasos: ["Unos discípulos de Éfeso han creído", "Pablo les pregunta: «¿Recibisteis el Espíritu Santo cuando creísteis?»", "Pablo los bautiza en el nombre del Señor Jesús", "Viene sobre ellos el Espíritu Santo"],
            apoyo: "En Éfeso, Pablo preguntó: «¿Recibisteis el Espíritu Santo cuando creísteis?»",
            ref: "Hechos 19:1-6",
            explica: "En Éfeso, Pablo preguntó a unos que habían creído si habían recibido el Espíritu Santo cuando creyeron. Después de bautizarlos en el nombre del Señor Jesús, vino sobre ellos el Espíritu Santo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el relato de Samaria tiene un error. Tócala.",
            frases: [
              "En Samaria, la gente había creído y había sido bautizada en agua.",
              "En Samaria, el Espíritu descendió sobre todos en cuanto creyeron.",
              "Pedro y Juan oraron por los creyentes de Samaria.",
              "Pedro y Juan les imponían las manos, y recibían el Espíritu Santo.",
            ],
            malo: 1,
            correccion: "El Espíritu «aún no había descendido sobre ninguno de ellos»; lo recibieron cuando Pedro y Juan oraron y les impusieron las manos.",
            apoyo: "pero el Espíritu «aún no había descendido sobre ninguno de ellos»",
            ref: "Hechos 8:14-17",
            explica: "En Samaria habían creído y habían sido bautizados en agua, pero el Espíritu aún no había descendido sobre ninguno. Pedro y Juan oraron, les imponían las manos, y recibían el Espíritu Santo.",
          },
          {
            consigna: "Una de estas frases sobre Éfeso y la declaración de fe tiene un error. Tócala.",
            frases: [
              "En Éfeso, Pablo preguntó si habían recibido el Espíritu Santo cuando creyeron.",
              "Pablo los bautizó en el nombre del Señor Jesús.",
              "En Éfeso, después de ser bautizados, vino sobre ellos el Espíritu Santo.",
              "Según la declaración de fe, el bautismo en el Espíritu es lo mismo que el nuevo nacimiento.",
            ],
            malo: 3,
            correccion: "El artículo 9 de la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.",
            apoyo: "el artículo 9 de la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo",
            ref: "Hechos 19:1-6",
            explica: "Por relatos como los de Samaria y Éfeso, el artículo 9 de la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En Pentecostés, ¿qué comenzaron a hacer los que fueron llenos del Espíritu Santo? Toca las palabras que lo dicen.",
            texto: "fueron todos llenos del Espíritu Santo, y comenzaron a [[hablar en otras lenguas]], según el Espíritu les daba que hablasen",
            apoyo: "En Pentecostés se cumplió: «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen»",
            ref: "Hechos 2:4",
            explica: "Así lo cuenta Hechos 2:4: «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».",
          },
          {
            consigna: "En Éfeso, ¿qué hacían los creyentes cuando vino sobre ellos el Espíritu Santo? Toca las palabras que lo dicen.",
            texto: "vino sobre ellos el Espíritu Santo; y [[hablaban en lenguas]], y [[profetizaban]]",
            apoyo: "Después de bautizarlos en el nombre del Señor Jesús, «vino sobre ellos el Espíritu Santo; y hablaban en lenguas, y profetizaban»",
            ref: "Hechos 19:6",
            explica: "Así lo cuenta Hechos 19:6: «vino sobre ellos el Espíritu Santo; y hablaban en lenguas, y profetizaban».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "el artículo 9 de la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo",
            ref: "Hechos 8:14-17; Hechos 19:1-6",
            clave: {
              id: "pr-n3-espiritu-santo-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué muestran los relatos de Samaria y de Éfeso sobre el bautismo en el Espíritu y el nuevo nacimiento?",
              ideas: [
                { id: "creyentes", peso: 50, texto: "En Samaria y en Éfeso el Espíritu vino sobre personas que ya habían creído.", formas: ["ya (habian|habia|eran|creian|creyeron|tenian)", "habian creido", "aun no (habia|habian)", "todavia no (habia|habian|haber|tenian)", "despues de (creer|haber|bautiz*|ser)", "cuando creyeron", "eran creyentes", "sobre creyentes", "ya creian"] },
                { id: "distinto", peso: 50, texto: "Por eso la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.", formas: ["distint*", "diferente*", "otra (cosa|experiencia|obra)", "puede seguir*", "viene despues", "despues del nuevo nacimiento"] },
              ],
              errores: [
                { id: "mismo", texto: "El artículo 9 de la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.", formas: ["(es|son) lo mismo", "(es|son) igual*", "misma (cosa|experiencia)"], anula: "distinto" },
              ],
              modelo: "En Samaria y en Éfeso, el Espíritu vino sobre personas que ya habían creído; en Samaria, aún no había descendido sobre ninguno. Por eso la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.",
            },
          },
          {
            apoyo: "Pedro y Juan oraron, «les imponían las manos, y recibían el Espíritu Santo»",
            ref: "Hechos 8:14-17",
            clave: {
              id: "pr-n3-espiritu-santo-4-a7-2",
              tipo: "corta",
              pregunta: "En Samaria, ¿qué les faltaba a los que habían creído, y cómo lo recibieron?",
              ideas: [
                { id: "falta", peso: 50, texto: "Habían creído y habían sido bautizados en agua, pero el Espíritu aún no había descendido sobre ninguno de ellos.", formas: ["aun no (habia|habian)", "no habia descendido", "no (habian|habia) recibido", "faltaba (el|recibir)", "todavia no"] },
                { id: "manos", peso: 50, texto: "Pedro y Juan oraron, les imponían las manos, y recibían el Espíritu Santo.", formas: ["oraron", "orar*", "oracion", "impon*", "impusi*", "imposicion", "las manos", "pedro y juan"] },
              ],
              modelo: "Habían creído y habían sido bautizados en agua, pero el Espíritu aún no había descendido sobre ninguno de ellos. Pedro y Juan oraron por ellos, les imponían las manos, y recibían el Espíritu Santo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Los dones y el fruto del Espíritu
    "n3-espiritu-santo-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De quién son los dones: del Espíritu o del creyente?", reverso: "Del Espíritu, que los reparte a cada uno como él quiere.", apoyo: "Los dones son del Espíritu, no del creyente" },
              { frente: "¿Alguien tiene todos los dones?", reverso: "No: nadie tiene todos, y nadie tiene de qué gloriarse.", apoyo: "Nadie tiene todos, y nadie tiene de qué gloriarse" },
              { frente: "¿Qué viene a ser quien habla lenguas humanas y angélicas, pero no tiene amor?", reverso: "Como metal que resuena, o címbalo que retiñe.", apoyo: "vengo a ser como metal que resuena, o címbalo que retiñe" },
              { frente: "¿Qué orden da Pablo entre el amor y los dones?", reverso: "Seguir el amor y procurar los dones espirituales.", apoyo: "Por eso el orden es claro: «Seguid el amor; y procurad los dones espirituales»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es quien tiene profecía y fe para mover montes, pero no tiene amor?", reverso: "Nada: sin amor, nada es.", apoyo: "Y aun con profecía y fe para mover montes, sin amor, «nada soy»" },
              { frente: "¿Dónde pone Pablo el amor?", reverso: "Por encima de todo.", apoyo: "Pablo pone el amor por encima de todo" },
              { frente: "¿Qué se busca y qué se sigue?", reverso: "Se buscan los dones, pero se sigue el amor.", apoyo: "Se buscan los dones, pero se sigue el amor" },
              { frente: "¿Qué no puede separarse del carácter que forma el Espíritu?", reverso: "El poder del Espíritu.", apoyo: "el poder del Espíritu no puede separarse del carácter que el Espíritu forma" },
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
            consigna: "Completa lo que enseña Pablo sobre los dones y el amor.",
            texto: "Se buscan los [[dones]], pero se [[sigue]] el [[amor]], que Pablo pone por encima de todo.",
            distractores: ["aplausos", "olvida", "éxito"],
            errores: {
              aplausos: "Se procuran los dones espirituales, no los aplausos.",
              olvida: "El amor no se olvida: se sigue. «Seguid el amor; y procurad los dones espirituales».",
              "éxito": "Lo que se sigue es el amor, que Pablo pone por encima de todo.",
            },
            apoyo: "Se buscan los dones, pero se sigue el amor",
            ref: "1 Corintios 14:1",
            explica: "Pablo pone el amor por encima de todo: «Seguid el amor; y procurad los dones espirituales». Aun con profecía y fe para mover montes, sin amor, nada soy.",
          },
          {
            consigna: "Completa de quién son los dones.",
            texto: "Los dones son del [[Espíritu]], no del creyente: él los [[reparte]] como quiere, y nadie tiene de qué [[gloriarse]].",
            distractores: ["pastor", "vende", "quejarse"],
            errores: {
              pastor: "Los dones son del Espíritu, no del creyente.",
              vende: "Uno y el mismo Espíritu los reparte a cada uno en particular como él quiere.",
              quejarse: "Nadie tiene todos los dones, y nadie tiene de qué gloriarse.",
            },
            apoyo: "Los dones son del Espíritu, no del creyente",
            ref: "1 Corintios 12:11",
            explica: "Los dones son del Espíritu, no del creyente: «todas estas cosas las hace uno y el mismo Espíritu, repartiendo a cada uno en particular como él quiere». Nadie tiene todos, y nadie tiene de qué gloriarse.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del grupo de alabanza te dice: Dios me dio un don muy grande, así que tengo más derecho a opinar que los demás.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los dones son del Espíritu, no suyos: nadie tiene de qué gloriarse.", bien: true, explica: "Los dones son del Espíritu, no del creyente: nadie tiene todos, y nadie tiene de qué gloriarse." },
              { texto: "Que tiene razón: quien tiene más dones vale más que los otros en la iglesia.", explica: "Nadie tiene todos los dones, y nadie tiene de qué gloriarse." },
              { texto: "Que deje de usar su don, para que ningún hermano se sienta menos que él.", explica: "Se buscan los dones, pero se sigue el amor: lo que falta es el amor, no dejar el don." },
              { texto: "Que el don es suyo, y que puede usarlo como él quiera y cuando quiera.", explica: "Los dones son del Espíritu, no del creyente: él los reparte como quiere." },
            ],
            apoyo: "Nadie tiene todos, y nadie tiene de qué gloriarse",
            ref: "1 Corintios 12:11",
            explica: "Los dones son del Espíritu, que los reparte como él quiere. Nadie tiene todos, y nadie tiene de qué gloriarse.",
          },
          {
            caso: "Una joven de tu célula te dice: Si tengo fe para mover montes, ¿qué importa si no amo a los demás?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que sí importa: aun con fe para mover montes, si no tienes amor, nada eres.", bien: true, explica: "Pablo lo dice así: aun con profecía y fe para mover montes, sin amor, «nada soy»." },
              { texto: "Que no importa tanto: la fe es lo más grande, y el amor puede venir después.", explica: "Pablo pone el amor por encima de todo." },
              { texto: "Que busque solo el amor, y que deje de una vez de pedir los dones del Espíritu.", explica: "Se buscan los dones, pero se sigue el amor: «Seguid el amor; y procurad los dones espirituales»." },
              { texto: "Que amar a los demás es un don que el Espíritu da solo a algunos.", explica: "Todos siguen el amor: «Seguid el amor; y procurad los dones espirituales»." },
            ],
            apoyo: "Y aun con profecía y fe para mover montes, sin amor, «nada soy»",
            ref: "1 Corintios 13:1-2",
            explica: "Pablo pone el amor por encima de todo: aun con profecía y fe para mover montes, sin amor, nada soy. Se buscan los dones, pero se sigue el amor.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Se dice de los dones o del fruto del Espíritu? Lleva cada frase a su grupo.",
            grupos: ["Los dones del Espíritu", "El fruto del Espíritu"],
            frases: [
              { texto: "Lo que el Espíritu hace por medio del creyente", grupo: 0 },
              { texto: "Se reciben", grupo: 0 },
              { texto: "Pueden usarse sin madurez", grupo: 0 },
              { texto: "El Espíritu los reparte como él quiere", grupo: 0 },
              { texto: "Lo que el Espíritu hace en el creyente", grupo: 1 },
              { texto: "Crece con el tiempo", grupo: 1 },
              { texto: "Muestra la madurez", grupo: 1 },
              { texto: "Es el carácter de Cristo en el creyente", grupo: 1 },
            ],
            apoyo: "Los dones son lo que el Espíritu hace por medio del creyente; el fruto, lo que hace en él",
            explica: "Los dones son lo que el Espíritu hace por medio del creyente; el fruto, lo que hace en él. Los dones se reciben; el fruto crece con el tiempo y muestra la madurez.",
          },
          {
            consigna: "¿Es del fruto del Espíritu o se dice de los dones? Lleva cada frase a su grupo.",
            grupos: ["El fruto del Espíritu", "Los dones del Espíritu"],
            frases: [
              { texto: "Se dice en singular", grupo: 0 },
              { texto: "No se escoge una parte: crece todo junto", grupo: 0 },
              { texto: "Amor, gozo, paz y paciencia", grupo: 0 },
              { texto: "Benignidad, bondad, fe, mansedumbre y templanza", grupo: 0 },
              { texto: "Nadie los tiene todos", grupo: 1 },
              { texto: "Se procuran", grupo: 1 },
              { texto: "Valen poco sin amor", grupo: 1 },
            ],
            apoyo: "Dice fruto, en singular: no se escoge una parte, sino que crece todo junto",
            ref: "Gálatas 5:22-23",
            explica: "El fruto se dice en singular y crece todo junto: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza. Los dones se procuran, nadie los tiene todos y valen poco sin amor.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el fruto del Espíritu tiene un error. Tócala.",
            frases: [
              "El fruto es el carácter de Cristo que el Espíritu forma en el creyente.",
              "La Biblia dice fruto, en singular.",
              "Cada creyente escoge la parte del fruto que más le gusta.",
              "El fruto crece con el tiempo y muestra la madurez.",
            ],
            malo: 2,
            correccion: "No se escoge una parte: el fruto crece todo junto.",
            apoyo: "Dice fruto, en singular: no se escoge una parte, sino que crece todo junto",
            ref: "Gálatas 5:22-23",
            explica: "El fruto es el carácter de Cristo que el Espíritu forma en el creyente. Dice fruto, en singular: no se escoge una parte, sino que crece todo junto.",
          },
          {
            consigna: "Una de estas frases sobre los dones y el fruto tiene un error. Tócala.",
            frases: [
              "El fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza.",
              "Los dones se reciben.",
              "El fruto se recibe completo, de una sola vez, el día en que uno cree.",
              "Un don puede usarse sin madurez.",
            ],
            malo: 2,
            correccion: "Los dones se reciben; el fruto crece con el tiempo.",
            apoyo: "Los dones se reciben; el fruto crece con el tiempo",
            ref: "Gálatas 5:22-23",
            explica: "Los dones se reciben; el fruto crece con el tiempo. Un don puede usarse sin madurez; el fruto muestra la madurez.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "La iglesia debe valorar a sus obreros por su carácter, no solo por lo que pueden hacer en público",
            ref: "Gálatas 5:22-23",
            situacion: "Eres líder de célula. Tu pastor te pide que recomiendes a alguien para dirigir un grupo nuevo, y piensas en dos hermanos.",
            escenas: [
              {
                id: "e1",
                narra: "Andrés predica con fuerza y todos lo admiran, pero se enoja fácil y trata mal a los demás. Rubén habla poco en público, pero es paciente, bondadoso y manso.",
                pregunta: "¿A quién recomiendas?",
                opciones: [
                  { texto: "A Rubén: su fruto muestra madurez, aunque sus dones se vean menos.", valor: 2, explica: "La iglesia debe valorar a sus obreros por su carácter, no solo por lo que pueden hacer en público.", siguiente: "e2" },
                  { texto: "Le cuentas al pastor lo bueno y lo malo de los dos, sin recomendar a ninguno.", valor: 1, explica: "Contar la verdad está bien, pero el pastor te pidió una recomendación: el fruto muestra la madurez.", siguiente: "e2" },
                  { texto: "A Andrés: con esos dones, todos lo van a seguir en el grupo.", valor: 0, explica: "Un ministerio con dones visibles pero sin fruto es una señal de alarma.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El pastor siguió tu consejo. Al mes, varios del grupo de Andrés se van, heridos por su trato.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Hablas con el pastor y con Andrés: el poder sin carácter hace daño.", valor: 2, explica: "El poder sin carácter hace daño; el carácter con poder edifica.", siguiente: "e2" },
                  { texto: "Lo dejas así: con los dones que tiene, el grupo va a volver a crecer solo.", valor: 0, explica: "Un don puede usarse sin madurez; el fruto muestra la madurez.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la célula, un joven dice: Yo quiero el don de profecía; lo del fruto no es para mí.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que procure los dones, pero que siga el amor: sin amor, nada es.", valor: 2, explica: "«Seguid el amor; y procurad los dones espirituales»: se buscan los dones, pero se sigue el amor." },
                  { texto: "Que está bien querer el don, sin decirle nada del fruto.", valor: 1, explica: "Procurar los dones está bien, pero falta lo principal: se sigue el amor, y el fruto muestra la madurez." },
                  { texto: "Que deje de buscar dones, porque buscarlos ya es una forma de orgullo.", valor: 0, explica: "Pablo dice «procurad los dones espirituales»: se buscan los dones, pero se sigue el amor." },
                ],
              },
              {
                id: "e3",
                narra: "Al final del año, el pastor te pide evaluar a los líderes de las células.",
                pregunta: "¿En qué te fijas primero?",
                opciones: [
                  { texto: "En su fruto: el carácter de Cristo que muestran con los demás.", valor: 2, explica: "El obrero se evalúa por su fruto, no solo por sus dones." },
                  { texto: "En lo bien que predican y cantan cuando están delante de toda la iglesia.", valor: 0, explica: "La iglesia debe valorar a sus obreros por su carácter, no solo por lo que pueden hacer en público." },
                  { texto: "En cuántos dones tiene cada uno, para saber quién vale más.", valor: 0, explica: "Los dones son del Espíritu: nadie tiene todos, y nadie tiene de qué gloriarse." },
                ],
              },
            ],
          },
          {
            apoyo: "El obrero se evalúa por su fruto, no solo por sus dones",
            ref: "1 Corintios 13:1-2",
            situacion: "Sirves en tu iglesia, y Dios te ha usado con un don delante de muchos. Esta semana te toca mirar tu propio ministerio.",
            escenas: [
              {
                id: "e1",
                narra: "Después del culto, muchos te felicitan por cómo usaste tu don.",
                pregunta: "¿Qué piensas?",
                opciones: [
                  { texto: "Que el don es del Espíritu, y que no tengo de qué gloriarme.", valor: 2, explica: "Los dones son del Espíritu, no del creyente: nadie tiene de qué gloriarse." },
                  { texto: "Que me alegra mucho, y no le doy más vueltas a lo que pasó.", valor: 1, explica: "Alegrarse no es malo, pero conviene recordar que los dones son del Espíritu, no del creyente." },
                  { texto: "Que por tener ese don soy más espiritual que los demás hermanos.", valor: 0, explica: "Un don puede usarse sin madurez; el fruto muestra la madurez." },
                ],
              },
              {
                id: "e2",
                narra: "En casa, pierdes la paciencia con tu familia por algo pequeño.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo reconoces y pides perdón: el fruto muestra la madurez, no el don.", valor: 2, explica: "Un don puede usarse sin madurez; el fruto muestra la madurez. La paciencia es parte del fruto del Espíritu." },
                  { texto: "Pides perdón, aunque piensas que eso no tiene que ver con tu servicio.", valor: 1, explica: "Pedir perdón está bien, pero sí tiene que ver: el obrero se evalúa por su fruto, no solo por sus dones." },
                  { texto: "Lo dejas pasar: lo que importa es lo que haces en la iglesia.", valor: 0, explica: "La iglesia debe valorar a sus obreros por su carácter, no solo por lo que pueden hacer en público." },
                ],
              },
              {
                id: "e3",
                narra: "Tu líder te pregunta qué quieres que crezca en tu vida este año.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "La parte del fruto del Espíritu que más me falta, como la paciencia.", valor: 2, explica: "Es la pregunta de la lección: ¿qué parte del fruto del Espíritu necesitas que crezca más? El fruto crece todo junto." },
                  { texto: "Tener un don más grande, para que me vean y me feliciten todavía más.", valor: 0, explica: "Los dones son del Espíritu, que los reparte como él quiere; y el poder sin carácter hace daño." },
                  { texto: "Servir en más actividades, aunque no tenga tiempo para mi familia.", valor: 0, explica: "El obrero se evalúa por su fruto, no solo por lo que puede hacer en público." },
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
            apoyo: "Un ministerio con dones visibles pero sin fruto es una señal de alarma",
            ref: "Gálatas 5:22-23",
            clave: {
              id: "pr-n3-espiritu-santo-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué un ministerio con dones visibles pero sin fruto es una señal de alarma?",
              ideas: [
                { id: "madurez", peso: 50, texto: "Un don puede usarse sin madurez; el fruto muestra la madurez.", formas: ["madur*", "inmadur*"] },
                { id: "caracter", peso: 50, texto: "El poder sin carácter hace daño: la iglesia valora a sus obreros por su carácter, no solo por lo que hacen en público.", formas: ["caracter", "sin caracter", "hac* dano", "dana*", "lo que (hace|hacen) en publico", "en publico", "por (su|sus) fruto*", "por los frutos"] },
              ],
              modelo: "Porque un don puede usarse sin madurez, pero el fruto muestra la madurez. La iglesia valora a sus obreros por su carácter, no solo por lo que hacen en público, y el poder sin carácter hace daño.",
            },
          },
          {
            apoyo: "El obrero se evalúa por su fruto, no solo por sus dones",
            ref: "Gálatas 5:22-23",
            clave: {
              id: "pr-n3-espiritu-santo-5-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo debe evaluar la iglesia a sus obreros, y por qué?",
              ideas: [
                { id: "fruto", peso: 50, texto: "Por su fruto, que es el carácter de Cristo, y no solo por sus dones o por lo que hacen en público.", formas: ["por su fruto", "por (el|sus|los) fruto*", "su caracter", "el caracter", "caracter de cristo", "no solo por (sus|los|lo)"] },
                { id: "porque", peso: 50, texto: "Porque Jesús enseñó a reconocer a sus siervos por los frutos, y el fruto muestra la madurez.", formas: ["jesus enseno", "reconoc*", "madur*", "hace dano", "edifica"] },
              ],
              errores: [
                { id: "dones", texto: "El obrero se evalúa por su fruto, no solo por sus dones.", formas: ["solo por (sus|los) dones", "por (sus|los) dones (y|nada|solamente)"], anula: "fruto" },
              ],
              modelo: "Debe evaluarlos por su fruto, que es el carácter de Cristo, y no solo por sus dones. Porque Jesús enseñó a reconocer a sus siervos por los frutos, y el fruto muestra la madurez.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Andar en el Espíritu
    "n3-espiritu-santo-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Es recibir el Espíritu una meta o un comienzo?", reverso: "Un comienzo, no una meta.", apoyo: "Recibir el Espíritu es un comienzo, no una meta" },
              { frente: "¿Por qué la vida cristiana es una lucha?", reverso: "Porque el deseo de la carne es contra el Espíritu, y el del Espíritu es contra la carne.", apoyo: "La vida cristiana es una lucha" },
              { frente: "¿Cuál es la salida en la lucha contra la carne?", reverso: "No el esfuerzo solo, sino andar en el Espíritu.", apoyo: "La salida no es el esfuerzo solo" },
              { frente: "¿Para qué da poder el Espíritu?", reverso: "Para vencer el pecado.", apoyo: "El Espíritu da poder para vencer el pecado" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué manda Pablo en Efesios 5:18?", reverso: "Que seamos llenos del Espíritu.", apoyo: "Pablo manda: «sed llenos del Espíritu»" },
              { frente: "¿Ser lleno del Espíritu es una experiencia de una sola vez?", reverso: "No: es un mandato para todos los días.", apoyo: "Es un mandato para todos los días, no una experiencia de una sola vez" },
              { frente: "¿Qué pasó cuando los discípulos oraron ante las amenazas?", reverso: "Los mismos que fueron llenos en Pentecostés fueron llenos otra vez.", apoyo: "los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas" },
              { frente: "¿Qué es andar en el Espíritu?", reverso: "Vivir cada día bajo su guía, venciendo la carne por su poder.", apoyo: "Andar en el Espíritu es vivir cada día bajo su guía, venciendo la carne por su poder" },
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
            consigna: "Completa qué es andar en el Espíritu.",
            texto: "Andar en el Espíritu es [[vivir]] cada día bajo su [[guía]], venciendo la [[carne]] por su poder.",
            distractores: ["soñar", "presión", "gente"],
            errores: {
              "soñar": "Andar en el Espíritu es vivir cada día bajo su guía.",
              "presión": "Es vivir bajo la guía del Espíritu.",
              gente: "La lucha es contra la carne: el Espíritu da poder para vencer el pecado.",
            },
            apoyo: "Andar en el Espíritu es vivir cada día bajo su guía, venciendo la carne por su poder",
            ref: "Gálatas 5:16",
            explica: "Andar en el Espíritu es vivir cada día bajo su guía, venciendo la carne por su poder: «Andad en el Espíritu, y no satisfagáis los deseos de la carne».",
          },
          {
            consigna: "Completa lo que enseña la lección sobre ser llenos del Espíritu.",
            texto: "Pablo [[manda]] ser llenos del Espíritu: es para todos los [[días]], y los discípulos fueron llenos otra vez cuando [[oraron]].",
            distractores: ["prohíbe", "domingos", "huyeron"],
            errores: {
              "prohíbe": "Pablo manda: «sed llenos del Espíritu».",
              domingos: "Es un mandato para todos los días, no solo para el domingo.",
              huyeron: "Los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas.",
            },
            apoyo: "Es un mandato para todos los días, no una experiencia de una sola vez",
            ref: "Efesios 5:18",
            explica: "Pablo manda: «sed llenos del Espíritu». Es un mandato para todos los días: los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre andar en el Espíritu: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La salida en la lucha contra la carne es el esfuerzo solo.", verdad: false, explica: "La salida no es el esfuerzo solo: «Andad en el Espíritu, y no satisfagáis los deseos de la carne».", apoyo: "La salida no es el esfuerzo solo", ref: "Gálatas 5:16" },
              { texto: "El Espíritu da poder para vencer el pecado.", verdad: true, explica: "«si por el Espíritu hacéis morir las obras de la carne, viviréis».", apoyo: "El Espíritu da poder para vencer el pecado", ref: "Romanos 8:13" },
              { texto: "Recibir el Espíritu es la meta final de la vida cristiana.", verdad: false, explica: "Recibir el Espíritu es un comienzo, no una meta: el obrero está llamado a andar cada día en el Espíritu.", apoyo: "Recibir el Espíritu es un comienzo, no una meta" },
            ],
          },
          {
            consigna: "Sobre ser lleno del Espíritu: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Ser lleno del Espíritu es un mandato para todos los días.", verdad: true, explica: "Pablo manda: «sed llenos del Espíritu». Es un mandato para todos los días.", apoyo: "Es un mandato para todos los días", ref: "Efesios 5:18" },
              { texto: "Quien fue lleno del Espíritu una vez ya no necesita volver a serlo.", verdad: false, explica: "Los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas.", apoyo: "los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas" },
              { texto: "El obrero está llamado a ser lleno del Espíritu una y otra vez.", verdad: true, explica: "El mandato es ser llenos del Espíritu siempre, no una sola vez.", apoyo: "Ser lleno del Espíritu una y otra vez" },
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
            caso: "Un líder de jóvenes te dice: Ya planifiqué todo el retiro; no pienso cambiar nada, aunque oremos.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que planifique y ore, dispuesto a que el Espíritu cambie sus planes.", bien: true, explica: "Es lo que enseña la lección: el obrero planifica, ora y está dispuesto a que el Espíritu cambie sus planes." },
              { texto: "Que no planifique nada, porque los planes le quitan su lugar al Espíritu.", explica: "El obrero planifica, ora y está dispuesto a que el Espíritu cambie sus planes." },
              { texto: "Que haga bien: un plan tan bueno ya no necesita que oren por él.", explica: "El obrero planifica y ora: el Espíritu guía el servicio." },
              { texto: "Que cambie de plan cada vez que alguien del grupo opine algo distinto.", explica: "No se trata de cambiar por cualquier opinión: es el Espíritu el que guía el servicio, como guió a Pablo." },
            ],
            apoyo: "El obrero planifica, ora y está dispuesto a que el Espíritu cambie sus planes",
            ref: "Hechos 16:6-7",
            explica: "El Espíritu guía el servicio: a Pablo no le permitió hablar en Asia ni ir a Bitinia, porque lo llevaba a Macedonia. El obrero planifica, ora y está dispuesto a que el Espíritu cambie sus planes.",
          },
          {
            caso: "Un compañero de célula te dice: Si Pablo hubiera sido guiado por el Espíritu, habría podido predicar en Asia como quería.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el Espíritu le prohibió hablar en Asia porque lo llevaba a Macedonia.", bien: true, explica: "«les fue prohibido por el Espíritu Santo hablar la palabra en Asia»: el Espíritu los estaba llevando a Macedonia." },
              { texto: "Que Pablo se equivocó de camino, y que por eso no pudo predicar en Asia.", explica: "No fue un error de Pablo: «les fue prohibido por el Espíritu Santo hablar la palabra en Asia»." },
              { texto: "Que el Espíritu solo guía en la oración, y nunca en los planes del servicio.", explica: "El Espíritu guía el servicio: cambió los planes de Pablo." },
              { texto: "Que ser guiado por el Espíritu es que todo salga tal como uno lo planeó.", explica: "El obrero está dispuesto a que el Espíritu cambie sus planes, como cambió los de Pablo." },
            ],
            apoyo: "A Pablo y a los suyos «les fue prohibido por el Espíritu Santo hablar la palabra en Asia»",
            ref: "Hechos 16:6-7",
            explica: "El Espíritu guía el servicio. A Pablo le fue prohibido hablar la palabra en Asia, y después el Espíritu no le permitió ir a Bitinia: los estaba llevando a Macedonia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren",
            ref: "Efesios 4:30",
            situacion: "Eres maestro de la escuela dominical. Esta semana preparas la clase y sirves junto a otros maestros.",
            escenas: [
              {
                id: "e1",
                narra: "El martes, otro maestro te dice algo que te ofende delante de todos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Hablas con él a solas y resuelven el enojo antes del domingo.", valor: 2, explica: "El enojo que no se resuelve entristece al Espíritu: resolverlo cuida tu relación con él.", siguiente: "e2" },
                  { texto: "Oras por él, pero no hablas con él de lo que pasó ni lo resuelves.", valor: 1, explica: "Orar es bueno, pero el enojo que no se resuelve entristece al Espíritu.", siguiente: "e2" },
                  { texto: "Le respondes delante de todos con palabras duras.", valor: 0, explica: "Las palabras que hieren entristecen al Espíritu Santo.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El sábado sigues molesto, y mañana te toca enseñar.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Lo llamas, le pides perdón por tus palabras y resuelven el problema.", valor: 2, explica: "Así cuidas tu relación con el Espíritu: «no contristéis al Espíritu Santo de Dios».", siguiente: "e2" },
                  { texto: "Enseñas igual, y dejas el problema para otro día, cuando se te pase el enojo.", valor: 0, explica: "El enojo que no se resuelve entristece al Espíritu.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El director te pregunta si ya visitaste a un alumno enfermo. Todavía no lo hiciste.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "La verdad: que todavía no, y que vas a ir a verlo esta semana.", valor: 2, explica: "La mentira entristece al Espíritu Santo: el obrero cuida su relación con él." },
                  { texto: "Que sí fuiste a verlo, para que no piense mal de ti.", valor: 0, explica: "La mentira entristece al Espíritu Santo." },
                  { texto: "Que ya fuiste, y le pides a otro maestro que vaya hoy por ti a verlo.", valor: 0, explica: "Decir que ya fuiste es una mentira, y la mentira entristece al Espíritu." },
                ],
              },
              {
                id: "e3",
                narra: "Los maestros quieren orar por un avivamiento en la iglesia.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Buscarlo con oración, arrepentimiento y obediencia a la Palabra.", valor: 2, explica: "El obrero busca el avivamiento con oración, arrepentimiento y obediencia a la Palabra." },
                  { texto: "Orar juntos, sin hablar de arrepentirse ni de obedecer.", valor: 1, explica: "La oración es parte, pero el avivamiento se busca con oración, arrepentimiento y obediencia." },
                  { texto: "Esperar sin hacer nada, porque Dios ya no derrama su Espíritu como antes.", valor: 0, explica: "El artículo 15 de la declaración de fe enseña que Dios sigue derramando su Espíritu para despertar a la iglesia y alcanzar a los perdidos." },
                ],
              },
            ],
          },
          {
            apoyo: "El obrero busca esa obra con oración, arrepentimiento y obediencia a la Palabra",
            ref: "Juan 7:37-39",
            situacion: "Eres líder de una célula de matrimonios. Esta semana pasan varias cosas antes de la reunión.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano te cuenta un problema de otro, y te dan ganas de repetirlo con burla.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "No lo repites: las palabras que hieren entristecen al Espíritu.", valor: 2, explica: "Lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren." },
                  { texto: "Lo cuentas en la reunión, pero como un pedido de oración.", valor: 0, explica: "Las palabras que hieren entristecen al Espíritu, aunque se digan como un pedido de oración." },
                  { texto: "Lo repites solo a un amigo de confianza, aunque sea con un poco de burla.", valor: 0, explica: "Las palabras que hieren entristecen al Espíritu Santo." },
                ],
              },
              {
                id: "e2",
                narra: "En la reunión, un esposo dice: Hace meses que estoy enojado con mi esposa, pero así estamos bien.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que resuelvan ese enojo: el que no se resuelve entristece al Espíritu.", valor: 2, explica: "Lo entristece el enojo que no se resuelve: el obrero cuida su relación con el Espíritu." },
                  { texto: "Que ore por eso, y espere a que el enojo se le pase solo.", valor: 1, explica: "Orar es bueno, pero el enojo se resuelve: el que no se resuelve entristece al Espíritu." },
                  { texto: "Que lo deje así mientras no discutan delante de los hijos ni en la célula.", valor: 0, explica: "El enojo que no se resuelve entristece al Espíritu Santo." },
                ],
              },
              {
                id: "e3",
                narra: "La célula quiere ver a Dios despertar a la iglesia y alcanzar a los perdidos del barrio.",
                pregunta: "¿Cómo lo buscan?",
                opciones: [
                  { texto: "Juntos, con oración, arrepentimiento y obediencia a la Palabra.", valor: 2, explica: "Dios sigue derramando su Espíritu, y el obrero busca esa obra con oración, arrepentimiento y obediencia a la Palabra." },
                  { texto: "Orando juntos, aunque nadie deje su desobediencia.", valor: 1, explica: "La oración es parte, pero el avivamiento también se busca con arrepentimiento y obediencia." },
                  { texto: "Con un gran evento en el barrio, aunque nadie ore ni se arrepienta.", valor: 0, explica: "El obrero busca esa obra con oración, arrepentimiento y obediencia a la Palabra." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Entristece al Espíritu o es buscar el avivamiento? Lleva cada frase a su grupo.",
            grupos: ["Entristece al Espíritu", "Así se busca el avivamiento"],
            frases: [
              { texto: "Decir una mentira", grupo: 0 },
              { texto: "Guardar un enojo sin resolverlo", grupo: 0 },
              { texto: "Decir palabras que hieren", grupo: 0 },
              { texto: "Orar para que Dios despierte a la iglesia", grupo: 1 },
              { texto: "Arrepentirse de corazón", grupo: 1 },
              { texto: "Obedecer la Palabra", grupo: 1 },
            ],
            apoyo: "Lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren",
            ref: "Efesios 4:30",
            explica: "Lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren. El avivamiento se busca con oración, arrepentimiento y obediencia a la Palabra.",
          },
          {
            consigna: "¿Contrista al Espíritu o cuida la relación con él? Lleva cada frase a su grupo.",
            grupos: ["Contrista al Espíritu", "Cuida la relación con él"],
            frases: [
              { texto: "Mentirle a un hermano para quedar bien", grupo: 0 },
              { texto: "Seguir enojado con alguien por meses", grupo: 0 },
              { texto: "Burlarse de otro con palabras que hieren", grupo: 0 },
              { texto: "Resolver pronto un enojo", grupo: 1 },
              { texto: "Decir la verdad aunque cueste", grupo: 1 },
              { texto: "Hablar sin herir a los demás", grupo: 1 },
            ],
            apoyo: "Y cuida su relación con él: «no contristéis al Espíritu Santo de Dios»",
            ref: "Efesios 4:30",
            explica: "Lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren. El obrero cuida su relación con el Espíritu: dice la verdad, resuelve el enojo y no hiere con sus palabras.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Andar en el Espíritu es vivir cada día bajo su guía, venciendo la carne por su poder",
            ref: "Gálatas 5:16; Romanos 8:13",
            clave: {
              id: "pr-n3-espiritu-santo-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es andar en el Espíritu, y cómo se vence la carne?",
              ideas: [
                { id: "andar", peso: 50, texto: "Andar en el Espíritu es vivir cada día bajo su guía.", formas: ["cada dia", "todos los dias", "bajo su guia", "guia*", "dej* guiar", "(vivir|vivo|vivimos|vive) bajo"] },
                { id: "vencer", peso: 50, texto: "La carne se vence por el poder del Espíritu, no con el esfuerzo solo.", formas: ["poder del espiritu", "por (el|su) poder", "su poder", "con (el|su) poder", "por el espiritu", "no (es|con|por) (el|nuestro|mi) esfuerzo"] },
              ],
              errores: [
                { id: "esfuerzo", texto: "La salida no es el esfuerzo solo: el Espíritu da poder para vencer el pecado.", formas: ["(con|por) (el|nuestro|mi|tu|su|puro|mucho) esfuerzo", "(esforzandose|esforzandonos|esforzarse) (solo|mucho)"], anula: "vencer" },
              ],
              modelo: "Andar en el Espíritu es vivir cada día bajo su guía. La carne se vence por el poder del Espíritu y no con el esfuerzo solo: si por el Espíritu hacemos morir las obras de la carne, viviremos.",
            },
          },
          {
            apoyo: "Es un mandato para todos los días, no una experiencia de una sola vez",
            ref: "Efesios 5:18",
            clave: {
              id: "pr-n3-espiritu-santo-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir el mandato de ser llenos del Espíritu, y qué muestra lo que pasó con los discípulos en Hechos?",
              ideas: [
                { id: "mandato", peso: 50, texto: "Es un mandato para todos los días, no una experiencia de una sola vez.", formas: ["todos los dias", "cada dia", "siempre", "continu*", "una y otra vez", "no (es|una) (una|experiencia) (sola|de)"] },
                { id: "otra", peso: 50, texto: "Los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas.", formas: ["otra vez", "de nuevo", "nuevamente", "volvieron a ser llenos", "amenazas"] },
              ],
              errores: [
                { id: "una-vez", texto: "Ser lleno del Espíritu es un mandato para todos los días, no una experiencia de una sola vez.", formas: ["(basta|alcanza) una vez", "solo una vez", "una vez (basta|alcanza|suficiente)"], anula: "mandato" },
              ],
              modelo: "Es un mandato para todos los días, no una experiencia de una sola vez. En Hechos, los mismos discípulos que fueron llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas.",
            },
          },
        ],
      },
    ],
  },
};
