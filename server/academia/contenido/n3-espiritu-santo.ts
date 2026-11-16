/**
 * Nivel 3 · Materia 5 — La persona y obra del Espíritu Santo (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue los artículos 4, 9, 10 y 15 de la declaración de fe (shared/academia-declaracion.ts): la persona del Espíritu,
 * su obra en el Antiguo Testamento y en Jesús, en la salvación, el bautismo en el Espíritu, los dones y el fruto, y andar
 * en el Espíritu. Los dones se estudiaron en el Nivel 2 («Dones espirituales y servicio»); aquí se ven junto al fruto.
 * Si hablar en lenguas es la señal inicial y necesaria del bautismo en el Espíritu es un punto de la declaración de fe
 * por confirmar: la materia presenta las dos posiciones pentecostales con respeto.
 */
import type { LeccionContenido } from "../tipos";

export const N3_ESPIRITU_SANTO: LeccionContenido[] = [
  {
    id: "n3-espiritu-santo-1",
    objetivos: [
      "Explicar por qué el Espíritu Santo es una persona y no una fuerza.",
      "Mostrar con la Biblia que el Espíritu Santo es Dios.",
      "Valorar la relación personal del obrero con el Espíritu.",
    ],
    paraEmpezar:
      "Muchos creyentes hablan del Espíritu Santo como de una energía o un sentimiento. La Biblia lo presenta de otra manera: como alguien que enseña, guía, se entristece y decide.",
    bloques: [
      { t: "versiculo", ref: "Zacarías 4:6" },
      {
        t: "parrafo",
        texto:
          "Dios le dijo a Zorobabel, que tenía que reconstruir el templo con pocos recursos: «No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos». Es el versículo de memoria de esta materia. La obra de Dios se hace con su Espíritu, y el obrero necesita conocerlo.",
      },
      { t: "subtitulo", texto: "Una persona" },
      { t: "versiculo", ref: "Juan 14:16-17" },
      {
        t: "parrafo",
        texto:
          "Jesús lo llama «otro Consolador», alguien como él, que estaría con los discípulos «para siempre». Y dice: «vosotros le conocéis, porque mora con vosotros, y estará en vosotros». A una fuerza no se la conoce: a una persona, sí.",
      },
      { t: "versiculo", ref: "Juan 16:13-14" },
      { t: "versiculo", ref: "1 Corintios 12:11" },
      { t: "versiculo", ref: "Efesios 4:30" },
      {
        t: "parrafo",
        texto:
          "El Espíritu hace lo que hace una persona: «él os guiará a toda la verdad»; reparte los dones «a cada uno en particular como él quiere», es decir, tiene voluntad; y puede ser entristecido: «no contristéis al Espíritu Santo de Dios».",
      },
      { t: "subtitulo", texto: "Una persona divina" },
      { t: "versiculo", ref: "Hechos 5:3-4" },
      {
        t: "parrafo",
        texto:
          "Pedro le dijo a Ananías que había mentido «al Espíritu Santo», y enseguida: «No has mentido a los hombres, sino a Dios». Mentirle al Espíritu es mentirle a Dios, porque el Espíritu es Dios.",
      },
      { t: "versiculo", ref: "Hebreos 9:14" },
      {
        t: "parrafo",
        texto:
          "Tiene atributos que solo tiene Dios: Hebreos lo llama «el Espíritu eterno». Junto al Padre y al Hijo es una de las tres personas del único Dios, igual a ellos en esencia, poder y gloria, como dice el artículo 2 de la declaración de fe.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "lista",
        items: [
          "Es otro Consolador, como Jesús, que mora en el creyente.",
          "Guía, enseña y glorifica a Cristo.",
          "Tiene voluntad: reparte los dones como él quiere.",
          "Puede ser entristecido.",
          "Es Dios: mentirle es mentirle a Dios, y es el Espíritu eterno.",
        ],
      },
    ],
    ideaClave:
      "El Espíritu Santo es una persona y no una fuerza: es otro Consolador que mora en el creyente, guía a toda la verdad, reparte los dones como él quiere y puede ser entristecido. Y es Dios: mentirle a él es mentirle a Dios, y es el Espíritu eterno. La obra se hace no con ejército, ni con fuerza, sino con su Espíritu.",
    paraLaVida: {
      texto: "Al Espíritu Santo no se le usa: se le conoce y se le obedece.",
      pregunta: "¿Le hablas al Espíritu Santo como a una persona que vive en ti, o como a una fuerza que necesitas?",
    },
  },
  {
    id: "n3-espiritu-santo-2",
    objetivos: [
      "Describir la obra del Espíritu en la creación y en el Antiguo Testamento.",
      "Explicar la promesa del Espíritu en los profetas.",
      "Analizar la obra del Espíritu en la vida y el ministerio de Jesús.",
    ],
    paraEmpezar: "El Espíritu Santo no aparece por primera vez en Pentecostés. Está desde la primera página de la Biblia, y la vida de Jesús es el mejor ejemplo de su obra.",
    bloques: [
      { t: "versiculo", ref: "Génesis 1:2" },
      {
        t: "parrafo",
        texto: "En la creación, «el Espíritu de Dios se movía sobre la faz de las aguas». Donde había desorden y vacío, el Espíritu preparaba la vida.",
      },
      { t: "versiculo", ref: "1 Samuel 16:13" },
      {
        t: "parrafo",
        texto:
          "En el Antiguo Testamento el Espíritu venía sobre algunas personas para una tarea: jueces, profetas y reyes. Cuando Samuel ungió a David, «desde aquel día en adelante el Espíritu de Jehová vino sobre David».",
      },
      { t: "subtitulo", texto: "La promesa de los profetas" },
      { t: "versiculo", ref: "Ezequiel 36:26-27" },
      { t: "versiculo", ref: "Joel 2:28-29" },
      {
        t: "parrafo",
        texto:
          "Los profetas anunciaron algo nuevo. Ezequiel: «pondré dentro de vosotros mi Espíritu, y haré que andéis en mis estatutos». Joel: «derramaré mi Espíritu sobre toda carne», sobre hijos e hijas, jóvenes y ancianos, siervos y siervas. Ya no sería para unos pocos, sino para todo el pueblo de Dios.",
      },
      { t: "subtitulo", texto: "El Espíritu en la vida de Jesús" },
      { t: "versiculo", ref: "Lucas 1:35" },
      { t: "versiculo", ref: "Lucas 3:21-22" },
      {
        t: "parrafo",
        texto:
          "Jesús fue concebido por el Espíritu: «El Espíritu Santo vendrá sobre ti, y el poder del Altísimo te cubrirá con su sombra». Y al empezar su ministerio, mientras oraba en su bautismo, «descendió el Espíritu Santo sobre él en forma corporal, como paloma».",
      },
      { t: "versiculo", ref: "Lucas 4:1" },
      { t: "versiculo", ref: "Lucas 4:18" },
      {
        t: "parrafo",
        texto:
          "Desde entonces, Jesús vivió y sirvió en el Espíritu: «Jesús, lleno del Espíritu Santo, volvió del Jordán». En Nazaret leyó de Isaías que el Espíritu estaba sobre él, «Por cuanto me ha ungido para dar buenas nuevas a los pobres».",
      },
      { t: "versiculo", ref: "Hechos 10:38" },
      {
        t: "parrafo",
        texto:
          "Pedro lo resumió así: «Dios ungió con el Espíritu Santo y con poder a Jesús de Nazaret», y él «anduvo haciendo bienes y sanando a todos los oprimidos por el diablo». Si Jesús, el Hijo de Dios, sirvió en el poder del Espíritu, el obrero no puede servir con sus propias fuerzas.",
      },
    ],
    ideaClave:
      "El Espíritu obró desde la creación y en el Antiguo Testamento venía sobre algunos para una tarea. Los profetas prometieron que Dios pondría su Espíritu dentro de su pueblo y lo derramaría sobre toda carne. Jesús fue concebido por el Espíritu, recibió el Espíritu en su bautismo y sirvió lleno de él: Dios lo ungió con el Espíritu Santo y con poder.",
    paraLaVida: {
      texto: "Si Jesús sirvió en el poder del Espíritu, tú también lo necesitas.",
      pregunta: "¿En qué parte de tu servicio estás confiando más en tus fuerzas que en el Espíritu?",
    },
  },
  {
    id: "n3-espiritu-santo-3",
    objetivos: [
      "Explicar la obra del Espíritu en la salvación: convencer, regenerar y morar.",
      "Describir el sello y las arras del Espíritu, y el testimonio de la adopción.",
      "Distinguir la obra del Espíritu en la salvación del bautismo en el Espíritu.",
    ],
    paraEmpezar:
      "Antes de dar poder para servir, el Espíritu da vida. Nadie llega a Cristo sin su obra, y todo creyente tiene al Espíritu desde el día en que creyó.",
    bloques: [
      { t: "versiculo", ref: "Juan 16:8" },
      {
        t: "parrafo",
        texto: "El Espíritu prepara el corazón: «convencerá al mundo de pecado, de justicia y de juicio». Por eso el obrero ora antes de evangelizar: la convicción la produce el Espíritu.",
      },
      { t: "versiculo", ref: "Juan 3:5-6" },
      { t: "versiculo", ref: "Tito 3:5" },
      {
        t: "parrafo",
        texto:
          "El Espíritu hace nacer de nuevo: «lo que es nacido del Espíritu, espíritu es». Dios «nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia, por el lavamiento de la regeneración y por la renovación en el Espíritu Santo».",
      },
      { t: "versiculo", ref: "Romanos 8:9" },
      { t: "versiculo", ref: "Romanos 8:14-16" },
      {
        t: "parrafo",
        texto:
          "Desde ese momento, el Espíritu vive en el creyente: «si alguno no tiene el Espíritu de Cristo, no es de él». Y le da seguridad de su adopción: «habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre!».",
      },
      { t: "versiculo", ref: "Efesios 1:13-14" },
      {
        t: "parrafo",
        texto:
          "Además, al creer, «fuisteis sellados con el Espíritu Santo de la promesa, que es las arras de nuestra herencia». El sello dice a quién pertenecemos, y las arras son el adelanto de lo que vendrá.",
      },
      { t: "versiculo", ref: "1 Corintios 12:13" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que «por un solo Espíritu fuimos todos bautizados en un cuerpo»: el Espíritu une a cada creyente al cuerpo de Cristo. La tradición pentecostal distingue esta obra, que es para todos los que creen, del bautismo en el Espíritu Santo para recibir poder, que se estudia en la próxima lección.",
      },
      {
        t: "lista",
        items: [
          "Convence de pecado, de justicia y de juicio.",
          "Hace nacer de nuevo: la regeneración.",
          "Vive en todo creyente.",
          "Da testimonio de que somos hijos de Dios.",
          "Sella al creyente y es las arras de su herencia.",
          "Une a cada creyente al cuerpo de Cristo.",
        ],
      },
    ],
    ideaClave:
      "El Espíritu Santo obra en la salvación: convence de pecado, hace nacer de nuevo por la regeneración, vive en todo creyente, da testimonio de que somos hijos de Dios y nos sella como arras de nuestra herencia. Todo creyente tiene al Espíritu desde que creyó. La tradición pentecostal distingue esta obra del bautismo en el Espíritu para recibir poder.",
    paraLaVida: {
      texto: "Si eres de Cristo, el Espíritu ya vive en ti.",
      pregunta: "¿Qué cambia en tu seguridad saber que el Espíritu da testimonio de que eres hijo de Dios?",
    },
  },
  {
    id: "n3-espiritu-santo-4",
    objetivos: [
      "Explicar el bautismo en el Espíritu Santo según el libro de los Hechos.",
      "Analizar los relatos de Samaria y de Éfeso, y su relación con el nuevo nacimiento.",
      "Reconocer las dos posiciones pentecostales sobre las lenguas que el ministerio debe confirmar.",
    ],
    paraEmpezar:
      "Jesús mandó a sus discípulos esperar antes de salir a predicar. Lo que esperaban es lo que la iglesia pentecostal llama el bautismo en el Espíritu Santo.",
    bloques: [
      { t: "versiculo", ref: "Hechos 1:4-5" },
      {
        t: "parrafo",
        texto:
          "Jesús les mandó «que esperasen la promesa del Padre», y explicó: «vosotros seréis bautizados con el Espíritu Santo dentro de no muchos días». Los discípulos ya creían en él, pero todavía tenían que recibir esa promesa.",
      },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés se cumplió: «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen». El propósito lo había dicho Jesús: poder para ser sus testigos.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "subtitulo", texto: "Distinto del nuevo nacimiento" },
      { t: "versiculo", ref: "Hechos 8:14-17" },
      {
        t: "parrafo",
        texto:
          "En Samaria, la gente había creído y había sido bautizada en agua, pero el Espíritu «aún no había descendido sobre ninguno de ellos». Pedro y Juan oraron, «les imponían las manos, y recibían el Espíritu Santo».",
      },
      { t: "versiculo", ref: "Hechos 19:1-6" },
      {
        t: "parrafo",
        texto:
          "En Éfeso, Pablo preguntó: «¿Recibisteis el Espíritu Santo cuando creísteis?». Después de bautizarlos en el nombre del Señor Jesús, «vino sobre ellos el Espíritu Santo; y hablaban en lenguas, y profetizaban». Por relatos como estos, el artículo 9 de la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento y puede seguirlo.",
      },
      { t: "subtitulo", texto: "Cómo se recibe" },
      { t: "versiculo", ref: "Lucas 11:13" },
      {
        t: "parrafo",
        texto:
          "Es una promesa para todo creyente, y se recibe con fe, pidiéndola: «¿cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?». No se gana ni se fabrica: se pide al Padre con un corazón dispuesto.",
      },
      { t: "versiculo", ref: "1 Corintios 12:30" },
      {
        t: "nota",
        titulo: "Un punto por confirmar: las lenguas como señal",
        texto:
          "En Pentecostés, en Cesarea y en Éfeso, los que recibieron el Espíritu hablaron en lenguas. Por eso las Asambleas de Dios enseñan que hablar en lenguas es la señal física inicial y necesaria del bautismo en el Espíritu. Otras iglesias pentecostales lo esperan como una manifestación, sin hacerlo la única señal, y recuerdan la pregunta «¿hablan todos lenguas?». La posición del ministerio es un punto de la declaración de fe por confirmar.",
      },
    ],
    ideaClave:
      "Jesús mandó esperar la promesa del Padre: el bautismo con el Espíritu Santo, para recibir poder y ser sus testigos. En Pentecostés, Samaria y Éfeso, el Espíritu vino sobre creyentes, y por eso la declaración de fe enseña que es distinto del nuevo nacimiento y puede seguirlo. Se recibe con fe, pidiéndolo al Padre. Si las lenguas son la señal inicial y necesaria queda por confirmar.",
    paraLaVida: {
      texto: "El Padre da el Espíritu Santo a los que se lo piden.",
      pregunta: "¿Has pedido al Padre con fe ser lleno del Espíritu para servir?",
    },
  },
  {
    id: "n3-espiritu-santo-5",
    objetivos: [
      "Relacionar los dones del Espíritu con el amor.",
      "Explicar el fruto del Espíritu como el carácter de Cristo en el creyente.",
      "Evaluar el ministerio por el fruto y no solo por los dones.",
    ],
    paraEmpezar:
      "En el Nivel 2 se estudiaron los dones del Espíritu. Aquí se miran desde otro lado: el poder del Espíritu no puede separarse del carácter que el Espíritu forma.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 12:11" },
      {
        t: "parrafo",
        texto:
          "Los dones son del Espíritu, no del creyente: «todas estas cosas las hace uno y el mismo Espíritu, repartiendo a cada uno en particular como él quiere». Nadie tiene todos, y nadie tiene de qué gloriarse.",
      },
      { t: "versiculo", ref: "1 Corintios 13:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo pone el amor por encima de todo: «Si yo hablase lenguas humanas y angélicas, y no tengo amor, vengo a ser como metal que resuena, o címbalo que retiñe». Y aun con profecía y fe para mover montes, sin amor, «nada soy».",
      },
      { t: "versiculo", ref: "1 Corintios 14:1" },
      {
        t: "parrafo",
        texto: "Por eso el orden es claro: «Seguid el amor; y procurad los dones espirituales». Se buscan los dones, pero se sigue el amor.",
      },
      { t: "subtitulo", texto: "El fruto del Espíritu" },
      { t: "versiculo", ref: "Gálatas 5:22-25" },
      {
        t: "parrafo",
        texto:
          "El fruto es el carácter de Cristo que el Espíritu forma en el creyente: «Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza». Dice fruto, en singular: no se escoge una parte, sino que crece todo junto.",
      },
      {
        t: "lista",
        items: [
          "Los dones son lo que el Espíritu hace por medio del creyente; el fruto, lo que hace en él.",
          "Los dones se reciben; el fruto crece con el tiempo.",
          "Un don puede usarse sin madurez; el fruto muestra la madurez.",
          "Jesús enseñó a reconocer a sus siervos por los frutos.",
        ],
      },
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Para el obrero",
        texto:
          "Un ministerio con dones visibles pero sin fruto es una señal de alarma. La iglesia debe valorar a sus obreros por su carácter, no solo por lo que pueden hacer en público.",
      },
    ],
    ideaClave:
      "Los dones son del Espíritu, que los reparte como él quiere, y valen poco sin amor: sin amor, nada soy. Se procuran los dones, pero se sigue el amor. El fruto del Espíritu es el carácter de Cristo en el creyente: amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza. El obrero se evalúa por su fruto, no solo por sus dones.",
    paraLaVida: {
      texto: "El poder sin carácter hace daño; el carácter con poder edifica.",
      pregunta: "¿Qué parte del fruto del Espíritu necesitas que crezca más en tu vida?",
    },
  },
  {
    id: "n3-espiritu-santo-6",
    objetivos: [
      "Explicar qué es andar en el Espíritu y ser llenos del Espíritu.",
      "Describir cómo guía el Espíritu al obrero en su servicio.",
      "Reconocer lo que contrista y apaga al Espíritu, y el lugar del Espíritu en el avivamiento.",
    ],
    paraEmpezar: "Recibir el Espíritu es un comienzo, no una meta. El obrero está llamado a andar cada día en el Espíritu y a dejarse guiar por él.",
    bloques: [
      { t: "versiculo", ref: "Gálatas 5:16-17" },
      {
        t: "parrafo",
        texto:
          "La vida cristiana es una lucha: «el deseo de la carne es contra el Espíritu, y el del Espíritu es contra la carne». La salida no es el esfuerzo solo: «Andad en el Espíritu, y no satisfagáis los deseos de la carne».",
      },
      { t: "versiculo", ref: "Romanos 8:13" },
      {
        t: "parrafo",
        texto: "El Espíritu da poder para vencer el pecado: «si por el Espíritu hacéis morir las obras de la carne, viviréis».",
      },
      { t: "subtitulo", texto: "Llenos del Espíritu" },
      { t: "versiculo", ref: "Efesios 5:18" },
      {
        t: "parrafo",
        texto:
          "Pablo manda: «sed llenos del Espíritu». Es un mandato para todos los días, no una experiencia de una sola vez. En Hechos, los mismos discípulos llenos en Pentecostés fueron llenos otra vez cuando oraron ante las amenazas.",
      },
      { t: "subtitulo", texto: "Guiados por el Espíritu" },
      { t: "versiculo", ref: "Hechos 16:6-7" },
      {
        t: "parrafo",
        texto:
          "El Espíritu guía el servicio. A Pablo y a los suyos «les fue prohibido por el Espíritu Santo hablar la palabra en Asia», y después «el Espíritu no se lo permitió» ir a Bitinia: los estaba llevando a Macedonia. El obrero planifica, ora y está dispuesto a que el Espíritu cambie sus planes.",
      },
      { t: "versiculo", ref: "Efesios 4:30" },
      {
        t: "parrafo",
        texto:
          "Y cuida su relación con él: «no contristéis al Espíritu Santo de Dios». Lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren, que Pablo nombra en ese mismo pasaje.",
      },
      { t: "subtitulo", texto: "El Espíritu y el avivamiento" },
      { t: "versiculo", ref: "Juan 7:37-39" },
      {
        t: "parrafo",
        texto:
          "Jesús prometió: «de su interior correrán ríos de agua viva», y Juan explica: «Esto dijo del Espíritu que habían de recibir los que creyesen en él». El artículo 15 de la declaración de fe enseña que Dios sigue derramando su Espíritu para despertar a la iglesia y alcanzar a los perdidos. El obrero busca esa obra con oración, arrepentimiento y obediencia a la Palabra.",
      },
      {
        t: "lista",
        items: [
          "Andar en el Espíritu cada día.",
          "Vencer la carne por el poder del Espíritu.",
          "Ser lleno del Espíritu una y otra vez.",
          "Dejarse guiar por él en el servicio.",
          "No contristarlo ni apagarlo.",
          "Buscar el avivamiento con oración y obediencia.",
        ],
      },
    ],
    ideaClave:
      "Andar en el Espíritu es vivir cada día bajo su guía, venciendo la carne por su poder. El mandato es ser llenos del Espíritu siempre, no una sola vez. El Espíritu guía el servicio, aun cambiando los planes, y el obrero cuida de no contristarlo. Dios sigue derramando su Espíritu, y el obrero busca el avivamiento con oración, arrepentimiento y obediencia.",
    paraLaVida: {
      texto: "No con ejército, ni con fuerza, sino con su Espíritu.",
      pregunta: "¿Qué cambiará en tu servicio si cada día pides ser lleno del Espíritu?",
    },
  },
];
