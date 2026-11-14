/**
 * Nivel 1 · Materia 6 — La iglesia, mi nueva familia (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * El diezmo se presenta como lo enseñan las iglesias evangélicas pentecostales (punto de partida de la generosidad),
 * con su base bíblica, y sin prometer bendiciones a cambio de dinero.
 * Bibliografía: Rick Warren, «Una vida con propósito»; Myer Pearlman, «Teología bíblica y sistemática».
 */
import type { LeccionContenido } from "../tipos";

export const N1_IGLESIA: LeccionContenido[] = [
  {
    id: "n1-iglesia-1",
    objetivos: [
      "Explicar que la iglesia no es un edificio, sino el pueblo de Dios.",
      "Describir tres imágenes bíblicas de la iglesia: la familia, el cuerpo y el templo.",
      "Reconocer que Cristo es la cabeza y el fundamento de la iglesia.",
    ],
    paraEmpezar:
      "Muchas personas dicen que van a la iglesia pensando en un edificio. Pero en la Biblia la iglesia no es un lugar: son personas. Si has creído en Jesús, tú eres parte de la iglesia.",
    bloques: [
      { t: "subtitulo", texto: "Llamados a ser un pueblo" },
      {
        t: "parrafo",
        texto:
          "La palabra iglesia traduce un término griego que significa asamblea: los que fueron llamados a reunirse. La iglesia es el pueblo que Dios llamó de las tinieblas a su luz admirable (1 Pedro 2:9). Jesús dijo que Él edificaría su iglesia (Mateo 16:18): es suya, porque la ganó con su propia sangre (Hechos 20:28), y Él es su cabeza (Colosenses 1:18).",
      },
      { t: "versiculo", ref: "Efesios 2:19-22" },
      { t: "subtitulo", texto: "Tres imágenes de la iglesia" },
      {
        t: "lista",
        items: [
          "Una familia: ya no somos extranjeros ni advenedizos, sino miembros de la familia de Dios (Efesios 2:19). Dios es nuestro Padre, y los creyentes son nuestros hermanos.",
          "Un cuerpo: Cristo es la cabeza, y cada creyente es un miembro con una función (1 Corintios 12:27; Colosenses 1:18).",
          "Un templo: juntos somos edificados para morada de Dios en el Espíritu, sobre el fundamento de los apóstoles y profetas, siendo Jesucristo mismo la principal piedra del ángulo (Efesios 2:20-22).",
        ],
      },
      { t: "versiculo", ref: "1 Corintios 12:26-27" },
      {
        t: "parrafo",
        texto:
          "La iglesia universal está formada por todos los creyentes de todos los tiempos y lugares. La iglesia local es la congregación con la que te reúnes, aprendes, sirves y creces. Dios quiere que pertenezcas a las dos: a su familia en todo el mundo y a una iglesia concreta donde te conozcan, te cuiden y te enseñen, con pastores que velan por tu alma (Hebreos 13:17).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "No eres un visitante",
        texto:
          "Si creíste en Jesús, eres parte de la familia. La iglesia no es perfecta, porque está formada por personas que todavía están creciendo, igual que tú; pero es el lugar que Dios eligió para que crezcamos juntos.",
      },
    ],
    ideaClave:
      "La iglesia no es un edificio: es el pueblo de Dios, su familia, el cuerpo de Cristo y el templo del Espíritu, y Cristo es su cabeza y su fundamento.",
    paraLaVida: {
      texto: "Pertenecer a una iglesia local es parte de seguir a Jesús.",
      pregunta: "¿Qué significa para ti ser parte de la familia de Dios? ¿A quién de tu iglesia te gustaría conocer mejor esta semana?",
    },
  },
  {
    id: "n1-iglesia-2",
    objetivos: [
      "Describir las cuatro prácticas de la primera iglesia en Hechos 2:42.",
      "Explicar por qué no debemos dejar de congregarnos (Hebreos 10:24-25).",
      "Planear cómo participar de la vida de la iglesia cada semana.",
    ],
    paraEmpezar:
      "Una brasa que se saca del fuego se apaga pronto; junto a las demás, sigue encendida. Así pasa con el creyente: necesita a sus hermanos para mantener vivo su fuego.",
    bloques: [
      { t: "subtitulo", texto: "Cómo vivía la primera iglesia" },
      { t: "versiculo", ref: "Hechos 2:42-47" },
      {
        t: "parrafo",
        texto:
          "Después de Pentecostés, los nuevos creyentes perseveraban en cuatro cosas: la doctrina de los apóstoles, es decir, aprender la Palabra; la comunión unos con otros; el partimiento del pan; y las oraciones. Se reunían en el templo y en las casas, compartían lo que tenían con los necesitados y alababan a Dios con alegría, y el Señor añadía cada día a la iglesia los que habían de ser salvos.",
      },
      { t: "subtitulo", texto: "No dejando de congregarnos" },
      { t: "versiculo", ref: "Hebreos 10:24-25" },
      {
        t: "parrafo",
        texto:
          "Hebreos nos pide considerarnos unos a otros para estimularnos al amor y a las buenas obras, «no dejando de congregarnos, como algunos tienen por costumbre». Al reunirnos, adoramos juntos, oímos la Palabra, oramos unos por otros y nos animamos, sobre todo en los momentos difíciles. Congregarse no es solo asistir: es participar.",
      },
      { t: "subtitulo", texto: "Más que asistir" },
      {
        t: "lista",
        items: [
          "Llega con el corazón preparado para adorar y escuchar la Palabra.",
          "Únete a un grupo pequeño o célula, donde puedas orar y crecer con otros.",
          "Aprende el nombre de tus hermanos y ora por ellos.",
          "Acércate a tus pastores y líderes: ellos velan por tu alma (Hebreos 13:17).",
        ],
      },
      {
        t: "nota",
        titulo: "También en línea",
        texto:
          "Las transmisiones en vivo bendicen a quienes no pueden asistir por enfermedad o distancia. Pero, siempre que sea posible, nada reemplaza la oración, el abrazo y la comunión cara a cara con la familia de la fe.",
      },
    ],
    ideaClave:
      "La primera iglesia perseveraba en la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones; congregarnos con fidelidad nos fortalece y nos permite animarnos unos a otros.",
    paraLaVida: {
      texto: "Congregarse es una decisión de cada semana.",
      pregunta: "¿Qué te ayudaría a congregarte con más fidelidad? Escribe un paso concreto para esta semana.",
    },
  },
  {
    id: "n1-iglesia-3",
    objetivos: [
      "Explicar que cada creyente recibió dones para servir a los demás (1 Pedro 4:10).",
      "Reconocer que todos los miembros del cuerpo son necesarios (1 Corintios 12).",
      "Identificar un área donde comenzar a servir en la iglesia.",
    ],
    paraEmpezar:
      "Jesús dijo que no vino para ser servido, sino para servir y dar su vida (Marcos 10:45). Quien sigue a Jesús aprende a servir como Él.",
    bloques: [
      { t: "subtitulo", texto: "Cada uno recibió un don" },
      { t: "versiculo", ref: "1 Pedro 4:10-11" },
      {
        t: "parrafo",
        texto:
          "Pedro enseña que cada uno ha recibido un don y que debe ministrarlo a los otros, como buen administrador de la multiforme gracia de Dios. Los dones no son para lucirse, sino para edificar a la iglesia y para que en todo sea Dios glorificado. Hay dones de palabra, como enseñar o animar, y dones de servicio, como ayudar, dirigir, repartir o mostrar misericordia (Romanos 12:6-8).",
      },
      { t: "subtitulo", texto: "Un cuerpo con muchos miembros" },
      { t: "versiculo", ref: "1 Corintios 12:18-22" },
      {
        t: "parrafo",
        texto:
          "Dios colocó a cada miembro en el cuerpo como Él quiso. Ni el ojo puede decir a la mano: «No te necesito». Todos somos necesarios, y los miembros que parecen más débiles son los más necesarios. En la iglesia nadie sobra, y nadie es más importante que otro.",
      },
      { t: "subtitulo", texto: "Cómo empezar a servir" },
      {
        t: "lista",
        items: [
          "Ora y pregúntale a Dios dónde quiere que sirvas.",
          "Mira lo que sabes hacer y lo que te apasiona: la música, los niños, la tecnología, la cocina, la limpieza, la oración o recibir a los que llegan.",
          "Habla con tus líderes y empieza por algo sencillo: el que es fiel en lo muy poco, también en lo más es fiel (Lucas 16:10).",
          "Sirve con alegría y humildad, como para el Señor y no para los hombres (Colosenses 3:23).",
        ],
      },
      {
        t: "nota",
        titulo: "Los dones del Espíritu",
        texto:
          "Además de los talentos naturales, el Espíritu Santo reparte dones espirituales a cada uno como Él quiere (1 Corintios 12:4-11). Los estudiarás a fondo en el Nivel 2, en la materia Dones espirituales y servicio.",
      },
    ],
    ideaClave: "Cada creyente recibió dones de Dios para servir a los demás; en el cuerpo de Cristo todos son necesarios y cada uno tiene su lugar.",
    paraLaVida: {
      texto: "Servir es amar con las manos.",
      pregunta: "¿En qué área de la iglesia te gustaría empezar a servir? Escríbela y conversa con un líder esta semana.",
    },
  },
  {
    id: "n1-iglesia-4",
    objetivos: [
      "Explicar que todo lo que tenemos viene de Dios y que somos sus administradores.",
      "Describir lo que la Biblia enseña sobre el diezmo y la ofrenda.",
      "Aplicar 2 Corintios 9:7: dar con alegría, no con tristeza ni por necesidad.",
    ],
    paraEmpezar:
      "Dar no es una manera de pagarle a Dios, que no necesita nada de nosotros. Es una manera de adorarle, de confiar en Él y de participar en su obra.",
    bloques: [
      { t: "subtitulo", texto: "Todo es de Dios" },
      {
        t: "parrafo",
        texto:
          "La Biblia enseña que de Jehová es la tierra y su plenitud (Salmos 24:1). Lo que tenemos —tiempo, talentos y bienes— es algo que Dios nos confía. Somos administradores, y de los administradores se requiere que sean hallados fieles (1 Corintios 4:2).",
      },
      { t: "subtitulo", texto: "El diezmo y la ofrenda" },
      { t: "versiculo", ref: "Malaquías 3:10" },
      {
        t: "parrafo",
        texto:
          "El diezmo es la décima parte de lo que recibimos. Abram dio los diezmos a Melquisedec mucho antes de la ley de Moisés (Génesis 14:18-20), y en Malaquías Dios invitó a su pueblo a traer todos los diezmos al alfolí para que hubiera alimento en su casa, y a probarlo en esto. Jesús no anuló el diezmo, sino que pidió además lo más importante: la justicia, la misericordia y la fe (Mateo 23:23). Por eso muchas iglesias evangélicas enseñan el diezmo como el punto de partida de la generosidad, y las ofrendas como dádivas voluntarias, además del diezmo.",
      },
      { t: "subtitulo", texto: "Con alegría y con fe" },
      { t: "versiculo", ref: "2 Corintios 9:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que el que siembra generosamente, generosamente también segará, y que cada uno dé como propuso en su corazón, no con tristeza ni por necesidad, porque «Dios ama al dador alegre». Dar es un acto de fe y de gratitud. La Biblia también pide dar con orden (1 Corintios 16:2), manejar las ofrendas con honradez delante de Dios y de los hombres (2 Corintios 8:20-21) y acordarse de los pobres (Gálatas 2:10).",
      },
      {
        t: "nota",
        titulo: "Dar no compra bendiciones",
        texto:
          "Dios bendice al generoso, pero sus bendiciones no se compran. Damos porque Él nos dio primero a su Hijo (Juan 3:16), y confiamos en que suplirá todo lo que nos falta conforme a sus riquezas en gloria en Cristo Jesús (Filipenses 4:19).",
      },
    ],
    ideaClave:
      "Todo lo que tenemos es de Dios; damos el diezmo y las ofrendas con alegría y con fe, no para comprar bendiciones, sino para adorarle y sostener su obra.",
    paraLaVida: {
      texto: "La generosidad es fruto de un corazón agradecido.",
      pregunta: "¿Cómo puedes ser fiel y generoso con lo que Dios te ha dado? Escribe una decisión concreta y preséntasela a Dios en oración.",
    },
  },
];
