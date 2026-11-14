/**
 * Nivel 1 · Materia 5 — El bautismo y la Santa Cena (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Las dos ordenanzas se presentan como las enseñan las iglesias evangélicas pentecostales: el bautismo de los que
 * creen, por inmersión, y la Santa Cena como memorial, comunión y anuncio del regreso del Señor. Donde otras iglesias
 * cristianas practican distinto (el bautismo de bebés), se dice con respeto.
 * Bibliografía: Myer Pearlman, «Teología bíblica y sistemática»; Duffield y Van Cleave, «Fundamentos de teología
 * pentecostal»; Stanley M. Horton (ed.), «Teología sistemática: una perspectiva pentecostal».
 */
import type { LeccionContenido } from "../tipos";

export const N1_BAUTISMO_CENA: LeccionContenido[] = [
  {
    id: "n1-bautismo-cena-1",
    objetivos: [
      "Explicar que el bautismo en agua es un mandato de Jesús para todos sus discípulos.",
      "Describir lo que simboliza el bautismo: morir, ser sepultado y resucitar con Cristo.",
      "Reconocer que el bautismo no salva, sino que da testimonio de la salvación.",
    ],
    paraEmpezar:
      "Un anillo de bodas no casa a nadie, pero muestra a todos que esa persona está casada. Algo parecido pasa con el bautismo: no es lo que te salva, pero es la señal pública de que has entregado tu vida a Cristo.",
    bloques: [
      { t: "subtitulo", texto: "Un mandato de Jesús" },
      { t: "versiculo", ref: "Mateo 28:18-20" },
      {
        t: "parrafo",
        texto:
          "Antes de subir al cielo, Jesús mandó a sus discípulos hacer discípulos en todas las naciones, bautizándolos en el nombre del Padre, del Hijo y del Espíritu Santo. El bautismo no es una costumbre familiar ni un rito para cumplir: es un mandato del Señor para todo el que cree. Jesús mismo fue bautizado por Juan en el Jordán, porque así convenía cumplir toda justicia, y nos dejó el ejemplo (Mateo 3:13-17).",
      },
      { t: "subtitulo", texto: "Lo que significa" },
      { t: "versiculo", ref: "Romanos 6:3-4" },
      {
        t: "parrafo",
        texto:
          "La palabra bautizar viene del griego y significa sumergir. Por eso el bautismo es una imagen viva del evangelio. Al bajar al agua, el creyente declara que murió al pecado y fue sepultado con Cristo; al salir del agua, declara que resucitó con Él para que «andemos en vida nueva». Pablo lo dice también en Colosenses 2:12: fuimos sepultados con Él en el bautismo y resucitados con Él mediante la fe.",
      },
      { t: "subtitulo", texto: "No salva, pero obedece" },
      {
        t: "parrafo",
        texto:
          "La salvación es por gracia, por medio de la fe, y no por obras (Efesios 2:8-9). El ladrón arrepentido fue salvo en la cruz sin haber sido bautizado (Lucas 23:42-43). Pero quien de verdad cree, obedece: en el libro de los Hechos, los que creían eran bautizados pronto (Hechos 2:41; 8:12). El bautismo no te hace hijo de Dios; muestra que ya lo eres. Es el primer paso público de obediencia de una fe verdadera.",
      },
      {
        t: "nota",
        titulo: "Un testimonio público",
        texto:
          "En el bautismo confiesas delante de la iglesia, de tu familia y de tus amigos que ahora perteneces a Jesús. Es un día de fiesta: la iglesia celebra contigo lo que Dios hizo en tu vida.",
      },
    ],
    ideaClave:
      "El bautismo en agua es un mandato de Jesús: no salva, pero proclama que el creyente murió al pecado y resucitó con Cristo para andar en vida nueva.",
    paraLaVida: {
      texto: "Bautizarse es obedecer a Jesús y dar un paso de fe delante de todos.",
      pregunta: "¿Ya te bautizaste después de creer en Jesús? Si no, ¿qué te detiene? Escribe lo que piensas y conversa con tu pastor.",
    },
  },
  {
    id: "n1-bautismo-cena-2",
    objetivos: [
      "Explicar que el bautismo es para quien se arrepiente y cree en Jesús.",
      "Describir la forma bíblica del bautismo: por inmersión y en el nombre del Padre, del Hijo y del Espíritu Santo.",
      "Explicar por qué muchas iglesias presentan a los niños pequeños en lugar de bautizarlos.",
    ],
    paraEmpezar:
      "En el libro de los Hechos, el bautismo siempre llega después de oír el evangelio y creer. Veamos algunos ejemplos y lo que nos enseñan.",
    bloques: [
      { t: "subtitulo", texto: "Primero creer, después bautizarse" },
      { t: "versiculo", ref: "Hechos 2:38-41" },
      {
        t: "parrafo",
        texto:
          "El día de Pentecostés, los que recibieron la palabra de Pedro fueron bautizados, y se añadieron como tres mil personas. En Samaria, cuando creyeron a Felipe, se bautizaban hombres y mujeres (Hechos 8:12). En Filipos, el carcelero creyó en el Señor Jesús y en seguida se bautizó con todos los suyos (Hechos 16:31-33). El orden es siempre el mismo: oír el evangelio, arrepentirse, creer y bautizarse.",
      },
      { t: "versiculo", ref: "Hechos 8:35-38" },
      {
        t: "parrafo",
        texto:
          "El eunuco etíope oyó de Felipe el evangelio de Jesús y pidió ser bautizado. Felipe le respondió: «Si crees de todo corazón, bien puedes». El eunuco confesó que Jesucristo es el Hijo de Dios, descendieron ambos al agua y Felipe lo bautizó. El bautismo es para quien puede creer y confesar su fe.",
      },
      { t: "subtitulo", texto: "¿Cómo se bautiza?" },
      {
        t: "lista",
        items: [
          "Por inmersión: la persona es sumergida en el agua. Jesús subió del agua después de ser bautizado (Mateo 3:16), y el eunuco y Felipe descendieron al agua (Hechos 8:38).",
          "En el nombre del Padre, del Hijo y del Espíritu Santo, como mandó Jesús (Mateo 28:19).",
          "Delante de la iglesia, como testimonio público de la fe.",
          "Con una confesión personal: el que se bautiza declara que cree en Jesucristo como su Señor y Salvador (Romanos 10:9).",
        ],
      },
      { t: "subtitulo", texto: "¿Y los niños pequeños?" },
      {
        t: "parrafo",
        texto:
          "La Biblia muestra que el bautismo sigue a la fe personal. Un bebé todavía no puede arrepentirse ni creer; por eso muchas iglesias evangélicas, entre ellas las pentecostales, presentan a los niños al Señor y oran por ellos. Así lo hicieron José y María, que llevaron a Jesús al templo para presentarlo al Señor (Lucas 2:22), y así lo hizo Jesús, que tomó a los niños en sus brazos y los bendijo (Marcos 10:13-16). Cuando el niño crece y cree en Jesús, él mismo decide bautizarse.",
      },
      {
        t: "nota",
        titulo: "Si te bautizaron de bebé",
        texto:
          "Muchos fueron bautizados de bebés por padres que los amaban y querían lo mejor para ellos. El bautismo que vemos en el Nuevo Testamento es la respuesta personal de quien ya cree. Si ese es tu caso, conversa con tu pastor: él te acompañará con amor en este paso de obediencia.",
      },
    ],
    ideaClave:
      "El bautismo es para quien se arrepiente y cree en Jesús; se hace por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo, como testimonio público de la fe.",
    paraLaVida: {
      texto: "El bautismo es una decisión personal de quien ya cree.",
      pregunta: "¿A quién te gustaría invitar el día de tu bautismo para que escuche tu testimonio? Escribe su nombre y ora por esa persona.",
    },
  },
  {
    id: "n1-bautismo-cena-3",
    objetivos: [
      "Explicar cuándo y cómo instituyó Jesús la Santa Cena.",
      "Describir lo que representan el pan y la copa.",
      "Explicar las tres miradas de la Santa Cena: recordar, tener comunión y esperar su regreso.",
    ],
    paraEmpezar:
      "La noche antes de morir, Jesús celebró la Pascua con sus discípulos. En esa cena les dejó algo para que lo hicieran siempre, en memoria de Él.",
    bloques: [
      { t: "subtitulo", texto: "La noche en que fue entregado" },
      { t: "versiculo", ref: "Lucas 22:19-20" },
      {
        t: "parrafo",
        texto:
          "La Pascua recordaba cómo Dios libró a Israel de Egipto por la sangre del cordero (Éxodo 12). En esa cena, Jesús tomó el pan, dio gracias, lo partió y dijo: «Esto es mi cuerpo, que por vosotros es dado; haced esto en memoria de mí». Después tomó la copa y dijo: «Esta copa es el nuevo pacto en mi sangre». Jesús es el Cordero de Dios que quita el pecado del mundo (Juan 1:29), y Pablo lo llama nuestra pascua, sacrificada por nosotros (1 Corintios 5:7).",
      },
      { t: "subtitulo", texto: "El pan y la copa" },
      {
        t: "parrafo",
        texto:
          "El pan representa el cuerpo de Cristo, entregado por nosotros en la cruz. La copa representa su sangre, la sangre del nuevo pacto, derramada para el perdón de los pecados (Mateo 26:28). Jesús habló así como cuando dijo que Él es la puerta o la vid (Juan 10:9; 15:5): son figuras que señalan una realidad. Por eso las iglesias evangélicas enseñan que el pan y la copa son símbolos que el Señor eligió para que lo recordemos y lo anunciemos.",
      },
      { t: "versiculo", ref: "1 Corintios 10:16-17" },
      { t: "subtitulo", texto: "Tres miradas" },
      {
        t: "lista",
        items: [
          "Hacia atrás: recordamos la muerte de Jesús por nosotros (Lucas 22:19).",
          "Hacia arriba y alrededor: tenemos comunión con Cristo y con los hermanos, porque somos un solo cuerpo (1 Corintios 10:16-17).",
          "Hacia adelante: anunciamos la muerte del Señor hasta que Él venga (1 Corintios 11:26).",
        ],
      },
      { t: "versiculo", ref: "1 Corintios 11:26" },
      { t: "video", url: "https://www.youtube.com/watch?v=CxiSs-SHTuI", titulo: "Resumen del libro de Lucas (parte 2)", fuente: "Proyecto Biblia" },
      {
        t: "nota",
        titulo: "Una ordenanza, no una costumbre",
        texto:
          "La Biblia no dice cada cuánto hay que celebrarla: los primeros creyentes partían el pan cuando se reunían (Hechos 2:42; 20:7), y cada iglesia la celebra con regularidad. Lo importante es que no se vuelva una costumbre vacía, sino un encuentro con el Señor que dio su vida por nosotros.",
      },
    ],
    ideaClave:
      "Jesús instituyó la Santa Cena la noche en que fue entregado: el pan y la copa representan su cuerpo y su sangre; recordamos su muerte, tenemos comunión con Él y anunciamos que volverá.",
    paraLaVida: {
      texto: "Cada Santa Cena nos lleva de vuelta a la cruz.",
      pregunta: "¿Qué significa para ti que el cuerpo de Jesús fue entregado por ti? Escríbele a Dios una oración de gratitud.",
    },
  },
  {
    id: "n1-bautismo-cena-4",
    objetivos: [
      "Explicar por qué Pablo corrigió a los corintios en la Cena del Señor.",
      "Explicar qué significa examinarse a sí mismo antes de participar.",
      "Aplicar una preparación sencilla antes de cada Santa Cena.",
    ],
    paraEmpezar:
      "En Corinto, algunos llegaban a la Cena del Señor con divisiones y egoísmo: unos comían su propia cena mientras otros pasaban hambre. Pablo les escribió para recordarles lo que el Señor había enseñado.",
    bloques: [
      { t: "subtitulo", texto: "Lo que Pablo recibió del Señor" },
      { t: "versiculo", ref: "1 Corintios 11:23-26" },
      {
        t: "parrafo",
        texto:
          "Pablo repite las palabras de Jesús: el pan es su cuerpo y la copa es el nuevo pacto en su sangre, y todas las veces que comemos el pan y bebemos la copa, anunciamos la muerte del Señor hasta que Él venga. La Cena es santa porque nos habla de la cruz; por eso no se toma a la ligera.",
      },
      { t: "subtitulo", texto: "Examinarse a sí mismo" },
      { t: "versiculo", ref: "1 Corintios 11:27-29" },
      {
        t: "parrafo",
        texto:
          "Participar indignamente es hacerlo sin reverencia, sin discernir lo que representa, o aferrados a un pecado que no queremos dejar. Nadie es digno por sí mismo: participamos por la gracia de Cristo. Pablo no prohíbe participar; dice: «pruébese cada uno a sí mismo, y coma así del pan». Examinarse es mirar el corazón delante de Dios, confesar lo que haya que confesar, perdonar a quien haya que perdonar y, entonces, participar con fe y gratitud.",
      },
      { t: "subtitulo", texto: "Cómo prepararme" },
      {
        t: "lista",
        items: [
          "Antes del culto, pide a Dios que examine tu corazón (Salmos 139:23-24).",
          "Confiesa tus pecados: Él es fiel y justo para perdonarte y limpiarte (1 Juan 1:9).",
          "Si tienes algo pendiente con un hermano, busca primero la paz con él (Mateo 5:23-24).",
          "Participa con fe y gratitud, recordando la cruz y la promesa de su regreso.",
        ],
      },
      {
        t: "nota",
        titulo: "¿Quién participa?",
        texto:
          "La Santa Cena es para los que han creído en Jesús. Si fallaste, no huyas de la mesa: confiesa tu pecado y participa con un corazón limpio. Y si todavía no has entregado tu vida a Cristo, la Cena es una invitación: hoy puedes recibirlo y, la próxima vez, participar con la iglesia.",
      },
    ],
    ideaClave:
      "La Santa Cena se toma con reverencia: cada creyente se examina a sí mismo, confiesa su pecado, busca la paz con su hermano y participa con fe y gratitud.",
    paraLaVida: {
      texto: "La mesa del Señor es un lugar de gracia y de corazones limpios.",
      pregunta: "Antes de la próxima Santa Cena, ¿hay algo que necesitas confesar o alguien a quien necesitas perdonar? Escríbelo y llévalo a Dios en oración.",
    },
  },
];
