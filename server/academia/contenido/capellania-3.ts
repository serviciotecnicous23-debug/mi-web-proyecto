/**
 * Especialidad Capellanía · Materia 3 — Capellanía penitenciaria (materia avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la cárcel y el preso, el evangelio tras las
 * rejas (con la ley federal RLUIPA y Cutter v. Wilkinson, y los voluntarios del TDCJ en Texas, comprobados), la culpa,
 * el perdón y la justicia, las familias de los presos (con el programa Angel Tree de Prison Fellowship, comprobado), la prudencia y los
 * límites, y el regreso a la comunidad. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const CAPELLANIA_3: LeccionContenido[] = [
  {
    id: "capellania-3-1",
    objetivos: [
      "Describir lo que vive una persona presa.",
      "Explicar, con el ejemplo de José, que Dios está con los presos.",
      "Hacer la primera visita a un preso que pidió hablar con el capellán.",
    ],
    paraEmpezar:
      "En la cárcel, una persona pierde su libertad, su nombre se vuelve un número y muchas veces su familia se aleja. Muchos cargan culpa, enojo o miedo. El capellán entra allí para recordarles que Dios no se olvidó de ellos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Génesis 39:20-23" },
      {
        t: "parrafo",
        texto:
          "José fue puesto en la cárcel sin haber hecho mal, y aun allí «Jehová estaba con José y le extendió su misericordia». Dios está también tras las rejas.",
      },
      { t: "versiculo", ref: "Salmos 102:19-20" },
      {
        t: "parrafo",
        texto:
          "El salmo dice que Dios mira hacia abajo: «Jehová miró desde los cielos a la tierra, Para oír el gemido de los presos».",
      },
      { t: "versiculo", ref: "Hebreos 13:3" },
      {
        t: "parrafo",
        texto:
          "Y nos pide ponernos en su lugar: «Acordaos de los presos, como si estuvierais presos juntamente con ellos».",
      },
      { t: "subtitulo", texto: "Lo que vive el preso" },
      {
        t: "lista",
        items: [
          "La pérdida de la libertad y de la intimidad.",
          "La separación de su familia y el miedo de perderla.",
          "La culpa por lo que hizo, o el enojo si se siente tratado injustamente.",
          "El peligro y la desconfianza dentro de la cárcel.",
          "La vergüenza y la sensación de que su vida ya no vale nada.",
          "La búsqueda de Dios, que en la cárcel muchas veces se despierta.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la cárcel del condado y la prisión del estado" },
      {
        t: "lista",
        items: [
          "La cárcel del condado: muchos esperan su juicio o cumplen penas cortas, y entran y salen. La prisión del estado: los ya condenados cumplen penas más largas.",
          "En la cárcel del condado: el capellán acompaña la angustia de no saber qué pasará. En la prisión: acompaña el largo tiempo de la condena.",
          "En las dos: el capellán sigue las reglas de la institución y sirve a todos.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera visita a un preso" },
      {
        t: "parrafo",
        texto:
          "Carlos, de veintiocho años, pidió hablar con el capellán. Lleva un mes en la cárcel del condado esperando su juicio.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, seguir el procedimiento de la cárcel: registrarse, pasar la revisión y llevar solo lo permitido.",
          "Paso 2, presentarse con respeto y preguntarle cómo quiere que lo llame.",
          "Paso 3, escuchar lo que vive, sin preguntarle por su delito si él no quiere hablar de eso.",
          "Paso 4, preguntarle por su familia y por lo que necesita.",
          "Paso 5, ofrecerle una oración y, si la quiere, una Biblia por el medio que permite la cárcel.",
          "Paso 6, decirle cuándo volverá, sin prometerle favores ni ayuda en su caso.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán no es abogado ni juez. No da consejos sobre el caso legal del preso ni le promete nada sobre su sentencia: lo anima a hablar con su abogado.",
      },
    ],
    ideaClave:
      "José estuvo preso, y Jehová estaba con él; Dios mira desde los cielos para oír el gemido de los presos, y nos pide acordarnos de ellos como si estuviéramos presos con ellos. El preso vive la pérdida de la libertad, la separación de su familia, la culpa o el enojo, el peligro y la vergüenza. El capellán lo visita siguiendo las reglas, escucha sin juzgar, ora y no se mete en su caso legal.",
    paraLaVida: {
      texto: "Dios no se olvida de los que están tras las rejas.",
      pregunta: "¿Hay alguien en una cárcel por quien puedas orar hoy?",
    },
  },
  {
    id: "capellania-3-2",
    objetivos: [
      "Explicar, con el ejemplo de Pablo y Silas, cómo avanza el evangelio en la cárcel.",
      "Respetar la libertad religiosa de todos los presos.",
      "Organizar un estudio bíblico o un culto en una cárcel.",
    ],
    paraEmpezar:
      "En la cárcel, muchos buscan a Dios por primera vez. El capellán y los voluntarios llevan la Palabra, la adoración y el discipulado, siempre dentro de las reglas y respetando la fe de cada preso.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 16:25-26" },
      {
        t: "parrafo",
        texto:
          "En la cárcel de Filipos, «a medianoche, orando Pablo y Silas, cantaban himnos a Dios; y los presos los oían».",
      },
      { t: "versiculo", ref: "Hechos 16:30-31" },
      {
        t: "parrafo",
        texto:
          "Y el carcelero preguntó: «Señores, ¿qué debo hacer para ser salvo?». Ellos respondieron: «Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».",
      },
      { t: "versiculo", ref: "Filipenses 1:12-14" },
      {
        t: "parrafo",
        texto:
          "Desde la prisión, Pablo escribió que lo que le había pasado «han redundado más bien para el progreso del evangelio».",
      },
      { t: "versiculo", ref: "2 Timoteo 2:9" },
      {
        t: "parrafo",
        texto:
          "Él sufría cadenas, «mas la palabra de Dios no está presa».",
      },
      { t: "subtitulo", texto: "La libertad religiosa en la cárcel" },
      {
        t: "parrafo",
        texto:
          "En los Estados Unidos, una ley federal del año 2000, conocida como RLUIPA, no permite que una cárcel o una prisión que recibe fondos federales ponga una carga sustancial a la práctica religiosa de un preso, salvo que tenga un interés apremiante, como la seguridad, y use el medio menos restrictivo. En 2005, la Corte Suprema confirmó esa ley (Cutter v. Wilkinson). Por eso el capellán sirve a presos de todas las creencias y facilita que cada uno practique su fe dentro de las reglas. Lo legal es una guía general, no un consejo legal.",
      },
      { t: "subtitulo", texto: "Comparación: el culto en una iglesia y el culto en una cárcel" },
      {
        t: "lista",
        items: [
          "En la iglesia: el horario lo pone la iglesia. En la cárcel: lo pone la institución, y puede cambiar por la seguridad.",
          "En la iglesia: se puede llevar lo que se quiera. En la cárcel: solo lo permitido, revisado antes.",
          "En la iglesia: llegan los que quieren. En la cárcel: llegan los que la institución deja pasar.",
          "En las dos: la Palabra, la oración y la adoración transforman vidas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un estudio bíblico en la cárcel" },
      {
        t: "parrafo",
        texto:
          "El capellán de una prisión invita a la iglesia a dar un estudio bíblico cada semana.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, que los voluntarios hagan la capacitación y la revisión de antecedentes que pide el sistema penitenciario.",
          "Paso 2, acordar con el capellán el día, la hora, el lugar y los materiales permitidos.",
          "Paso 3, preparar un estudio sencillo, con preguntas, sobre un evangelio.",
          "Paso 4, llegar a tiempo, seguir cada regla y no entrar ni sacar nada sin permiso.",
          "Paso 5, terminar con una oración y con un tiempo para escuchar.",
          "Paso 6, informar al capellán y preparar el seguimiento: un curso por correspondencia o el estudio de la semana siguiente.",
        ],
      },
      {
        t: "nota",
        titulo: "En Texas",
        texto:
          "Los voluntarios del sistema penitenciario del estado (TDCJ) deben tener al menos 18 años, pasar una revisión de antecedentes, hacer una capacitación en línea o presencial y renovarla cada dos años. Los mentores hacen además un curso propio y sirven bajo la dirección del capellán de la unidad.",
      },
    ],
    ideaClave:
      "Pablo y Silas cantaban a medianoche en la cárcel y los presos los oían, y el carcelero creyó con su casa; las prisiones de Pablo hicieron avanzar el evangelio, porque la palabra de Dios no está presa. En la cárcel, el capellán lleva la Palabra respetando la libertad religiosa de todos, que protege la ley federal RLUIPA, y los voluntarios sirven con la capacitación y las reglas de la institución.",
    paraLaVida: {
      texto: "La palabra de Dios no está presa.",
      pregunta: "¿Podría tu iglesia llevar la Palabra a una cárcel cercana?",
    },
  },
  {
    id: "capellania-3-3",
    objetivos: [
      "Distinguir el perdón de Dios de las consecuencias de un delito.",
      "Acompañar a un preso que reconoce su culpa.",
      "Tener presentes a las víctimas sin dejar de servir al preso.",
    ],
    paraEmpezar:
      "Muchos presos cargan una culpa enorme; otros la niegan. El capellán no minimiza el delito ni condena a la persona: le muestra la verdad y la gracia de Cristo, y le recuerda que el perdón de Dios no borra la responsabilidad ante los demás.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=KBE2nLYyCdc", titulo: "Evangelio de Lucas 19 a 23", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 23:40-41" },
      {
        t: "parrafo",
        texto:
          "En la cruz, uno de los ladrones reconoció su culpa: «Nosotros, a la verdad, justamente padecemos, porque recibimos lo que merecieron nuestros hechos».",
      },
      { t: "versiculo", ref: "Lucas 23:42-43" },
      {
        t: "parrafo",
        texto:
          "Le pidió a Jesús: «Acuérdate de mí cuando vengas en tu reino», y Jesús le respondió: «De cierto te digo que hoy estarás conmigo en el paraíso». El perdón de Cristo llegó al ladrón aunque siguió en la cruz: el perdón no siempre quita las consecuencias.",
      },
      { t: "versiculo", ref: "Filemón 1:15-18" },
      {
        t: "parrafo",
        texto:
          "Cuando Pablo intercedió por Onésimo, también pensó en el que había sido dañado: «Y si en algo te dañó, o te debe, ponlo a mi cuenta».",
      },
      { t: "versiculo", ref: "Miqueas 6:8" },
      {
        t: "parrafo",
        texto:
          "Dios pide las dos cosas juntas: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».",
      },
      { t: "subtitulo", texto: "Comparación: el perdón de Dios y las consecuencias" },
      {
        t: "lista",
        items: [
          "El perdón de Dios: se recibe por la fe en Cristo, con arrepentimiento. Las consecuencias: la sentencia sigue su curso.",
          "El perdón de Dios: limpia la culpa delante de Dios. Las consecuencias: el daño a las víctimas sigue presente.",
          "El perdón de Dios: no se gana. La reparación: se busca cuando es posible y no hace más daño.",
        ],
      },
      { t: "subtitulo", texto: "Las víctimas" },
      {
        t: "parrafo",
        texto:
          "Detrás de muchos delitos hay víctimas que sufren. El capellán no habla de ellas con desprecio ni pide que perdonen pronto. Si el preso quiere reparar el daño, lo hace solo por los caminos que permite la ley y sin volver a herir a la víctima, nunca buscándola por su cuenta.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un preso que reconoce su culpa" },
      {
        t: "parrafo",
        texto:
          "Ramón cumple una condena por un robo con violencia. Le cuenta al capellán que no puede dormir pensando en el daño que hizo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escucharlo sin justificar el delito ni condenarlo como persona.",
          "Paso 2, mostrarle que en Cristo hay perdón para el que se arrepiente, como el ladrón en la cruz.",
          "Paso 3, orar con él, para que confiese su pecado a Dios y reciba su perdón.",
          "Paso 4, explicarle que el perdón de Dios no quita la sentencia, y animarlo a cumplirla con un corazón nuevo.",
          "Paso 5, si quiere reparar el daño, orientarlo a hacerlo solo por los caminos que permite la ley, sin buscar a la víctima por su cuenta.",
          "Paso 6, acompañarlo en el discipulado, para que crezca en su fe.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán no le dice a un preso que es inocente o culpable en su caso legal: eso lo deciden los tribunales. Lo acompaña como persona delante de Dios.",
      },
    ],
    ideaClave:
      "El ladrón en la cruz reconoció que padecía justamente, y Cristo le prometió el paraíso; Pablo ofreció pagar lo que Onésimo debía, y Dios pide justicia, misericordia y humildad. El perdón de Dios se recibe por la fe y limpia la culpa delante de él, pero no quita las consecuencias del delito. El capellán acompaña al preso sin justificarlo ni condenarlo, y tiene presentes a las víctimas.",
    paraLaVida: {
      texto: "El perdón de Dios es real, aunque las consecuencias sigan.",
      pregunta: "¿Qué te enseña el ladrón en la cruz sobre la gracia?",
    },
  },
  {
    id: "capellania-3-4",
    objetivos: [
      "Describir lo que viven las familias de los presos, sobre todo los hijos.",
      "Acompañar a la familia de un preso desde la iglesia.",
      "Organizar una ayuda de Navidad para los hijos de los presos.",
    ],
    paraEmpezar:
      "Cuando alguien entra a la cárcel, su familia también pierde: el sueldo, la compañía, a veces la casa, y muchas veces carga con la vergüenza. Los hijos sufren en silencio. La iglesia puede ser su familia en ese tiempo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Salmos 68:5-6" },
      {
        t: "parrafo",
        texto:
          "Dios se presenta así: «Padre de huérfanos y defensor de viudas Es Dios en su santa morada», y también dice que «Saca a los cautivos a prosperidad».",
      },
      { t: "versiculo", ref: "Isaías 1:17" },
      {
        t: "parrafo",
        texto:
          "Y le pide a su pueblo: «aprended a hacer el bien; buscad el juicio, restituid al agraviado, haced justicia al huérfano, amparad a la viuda».",
      },
      { t: "versiculo", ref: "Salmos 146:7" },
      {
        t: "parrafo",
        texto:
          "El Señor cuida de los necesitados: «Que da pan a los hambrientos. Jehová liberta a los cautivos».",
      },
      { t: "subtitulo", texto: "Lo que vive la familia de un preso" },
      {
        t: "lista",
        items: [
          "La pérdida del sueldo y, a veces, de la casa.",
          "La vergüenza y el miedo de que otros se enteren.",
          "Los hijos que extrañan a su papá o a su mamá, y a veces se culpan o se enojan.",
          "Las visitas, las llamadas y las cuentas de la cárcel, que cuestan tiempo y dinero.",
          "La incertidumbre sobre el juicio o sobre la fecha de salida.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia que juzga y la iglesia que acompaña" },
      {
        t: "lista",
        items: [
          "Juzga: habla del delito a escondidas. Acompaña: calla lo que no le toca y ayuda.",
          "Juzga: aparta a los hijos del preso. Acompaña: los recibe con cariño y les busca mentores.",
          "Juzga: deja sola a la esposa o al esposo. Acompaña: ayuda en lo práctico y ora con la familia.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la Navidad de los hijos de los presos" },
      {
        t: "parrafo",
        texto:
          "La iglesia quiere ayudar a los hijos de los presos en Navidad. El programa Angel Tree, de Prison Fellowship (su nombre quiere decir árbol de ángeles), trabaja con los capellanes para que los padres y las madres presos hagan llegar un regalo a sus hijos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, informarse en el programa Angel Tree y seguir sus reglas, o coordinar con el capellán de la cárcel.",
          "Paso 2, recibir los nombres de los niños y lo que sus padres desean regalarles.",
          "Paso 3, comprar y envolver los regalos, con una tarjeta en nombre de su papá o de su mamá.",
          "Paso 4, entregarlos en una fiesta en la iglesia o en las casas, con el permiso de la familia.",
          "Paso 5, invitar a las familias a la iglesia, sin presión, y ofrecerles acompañamiento.",
          "Paso 6, seguir en contacto durante el año: mentores para los niños y apoyo para la familia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca cuentes a otros que un niño tiene a su papá o a su mamá en la cárcel. Esa información le pertenece a la familia.",
      },
    ],
    ideaClave:
      "Dios es padre de huérfanos y defensor de viudas, nos pide hacer justicia al huérfano y amparar a la viuda, y liberta a los cautivos. La familia del preso pierde el sueldo, la compañía y la tranquilidad, y los hijos sufren en silencio. La iglesia la acompaña sin juzgar: ayuda en lo práctico, da mentores a los niños y, en Navidad, puede hacerles llegar regalos en nombre de sus padres con el programa Angel Tree.",
    paraLaVida: {
      texto: "Los hijos de los presos también son nuestros niños.",
      pregunta: "¿Qué familia con alguien preso puedes acompañar?",
    },
  },
  {
    id: "capellania-3-5",
    objetivos: [
      "Explicar por qué el capellán penitenciario necesita prudencia.",
      "Reconocer las maneras en que un preso puede intentar manipular a un voluntario.",
      "Aplicar los límites que protegen al capellán, al preso y a la institución.",
    ],
    paraEmpezar:
      "La cárcel es un lugar de mucha necesidad, pero también de peligro y de manipulación. Algunos presos buscan sinceramente a Dios; otros buscan favores. El capellán ama a todos, pero no es ingenuo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 10:16" },
      {
        t: "parrafo",
        texto:
          "Jesús envió a los suyos sabiendo el peligro: «yo os envío como a ovejas en medio de lobos; sed, pues, prudentes como serpientes, y sencillos como palomas».",
      },
      { t: "versiculo", ref: "Proverbios 14:15" },
      {
        t: "parrafo",
        texto:
          "El sabio advierte: «El simple todo lo cree; Mas el avisado mira bien sus pasos».",
      },
      { t: "versiculo", ref: "2 Corintios 8:21" },
      {
        t: "parrafo",
        texto:
          "Y el capellán hace todo a la luz: «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
      },
      { t: "subtitulo", texto: "Las señales de la manipulación" },
      {
        t: "lista",
        items: [
          "Los halagos: usted es el único que me entiende.",
          "Los pequeños favores que crecen: primero una estampilla, después una llamada, después un paquete.",
          "Las historias de urgencia para que el voluntario rompa una regla.",
          "Los pedidos de dinero, de datos personales o de contacto fuera de la cárcel.",
          "Los intentos de separar al voluntario de su capellán o de su equipo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la compasión prudente y la ingenuidad" },
      {
        t: "lista",
        items: [
          "Prudente: escucha, ora y sigue las reglas. Ingenua: cree todo y hace favores a escondidas.",
          "Prudente: no da sus datos personales. Ingenua: da su teléfono y su dirección.",
          "Prudente: avisa al capellán cuando algo la incomoda. Ingenua: se lo guarda para no quedar mal.",
          "Prudente: ama al preso diciéndole que no. Ingenua: cree que amar es decir siempre que sí.",
        ],
      },
      { t: "subtitulo", texto: "Los límites de la confianza en la cárcel" },
      {
        t: "parrafo",
        texto:
          "Lo que un preso le cuenta al capellán se guarda en confianza, con los límites que se vieron en Familia y consejería: el peligro para una vida, el abuso de un niño o de una persona mayor y, en la cárcel, también un plan de fuga o de violencia, que se avisa enseguida al capellán supervisor y a la institución, según sus reglas.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el preso que pide un favor" },
      {
        t: "parrafo",
        texto:
          "Un preso le cuenta a una voluntaria que su madre está muy enferma y le pide su número de teléfono para que su familia la llame.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escucharlo con compasión y orar por su madre.",
          "Paso 2, no darle su número ni ningún dato personal.",
          "Paso 3, explicarle con amabilidad que las reglas no lo permiten.",
          "Paso 4, ofrecerle el camino oficial: que hable con el capellán de la unidad, que puede ayudarlo a recibir noticias de su familia.",
          "Paso 5, contarle el pedido al capellán supervisor.",
          "Paso 6, seguir sirviendo a ese preso con el mismo amor, sin desconfianza ni rencor.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca entres ni saques nada sin permiso: ni una carta, ni un dulce, ni un mensaje. Una regla rota puede costar la seguridad de todos y el programa de la iglesia en esa cárcel.",
      },
    ],
    ideaClave:
      "Jesús nos envía como ovejas en medio de lobos, prudentes como serpientes y sencillos como palomas; el simple todo lo cree, pero el avisado mira bien sus pasos, y el capellán hace todo honradamente delante de todos. Ama a cada preso sin ser ingenuo: conoce las señales de la manipulación, no hace favores a escondidas, no da sus datos, avisa a su supervisor y guarda la confianza con sus límites.",
    paraLaVida: {
      texto: "Amar también es saber decir que no.",
      pregunta: "¿En qué situación necesitas ser más prudente sin dejar de ser compasivo?",
    },
  },
  {
    id: "capellania-3-6",
    objetivos: [
      "Describir los desafíos de una persona que sale de la cárcel.",
      "Preparar a la iglesia para recibir a alguien que sale de la cárcel.",
      "Organizar un plan de acompañamiento para el regreso a la comunidad.",
    ],
    paraEmpezar:
      "Salir de la cárcel no es el final del camino, sino el comienzo de otro muy difícil. Sin documentos, sin trabajo, sin casa y con el peso del pasado, muchos vuelven a caer. La iglesia puede ser el lugar que los recibe.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 9:26-27" },
      {
        t: "parrafo",
        texto:
          "Cuando Saulo llegó a Jerusalén, «todos le tenían miedo, no creyendo que fuese discípulo». «Entonces Bernabé, tomándole, lo trajo a los apóstoles». Alguien tiene que dar la cara por el que viene de un pasado difícil.",
      },
      { t: "versiculo", ref: "Filemón 1:10-11" },
      {
        t: "parrafo",
        texto:
          "Pablo le escribió a Filemón sobre Onésimo, un esclavo que había huido: «el cual en otro tiempo te fue inútil, pero ahora a ti y a mí nos es útil».",
      },
      { t: "versiculo", ref: "Filemón 1:15-18" },
      {
        t: "parrafo",
        texto:
          "Y le pidió que lo recibiera de nuevo, «no ya como esclavo, sino como más que esclavo, como hermano amado»: «recíbele como a mí mismo».",
      },
      { t: "subtitulo", texto: "Los desafíos de la salida" },
      {
        t: "lista",
        items: [
          "Sacar los documentos: la identificación, la tarjeta del seguro social y otros papeles.",
          "Encontrar un lugar para vivir y un trabajo, con un antecedente que asusta a muchos.",
          "Cumplir las condiciones de su libertad condicional o supervisada, si las tiene.",
          "Volver a la familia, que cambió mientras no estaba.",
          "Alejarse de los amigos y de los lugares que lo llevaron al delito.",
          "Encontrar una iglesia que lo reciba sin miedo y sin ingenuidad.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia que cierra la puerta y la que recibe" },
      {
        t: "lista",
        items: [
          "Cierra: le tiene miedo y no lo deja acercarse. Recibe: lo acoge, como Bernabé a Saulo.",
          "Cierra: le recuerda su pasado. Recibe: cree en su vida nueva, con prudencia.",
          "Cierra: lo deja solo con sus problemas. Recibe: le da un mentor y lo ayuda en lo práctico.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan para el regreso de Jorge" },
      {
        t: "parrafo",
        texto:
          "Jorge sale dentro de un mes, después de cinco años en prisión. Conoció a Cristo en la cárcel y quiere congregarse en tu iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, conocerlo antes de su salida, con el capellán de la prisión, si se puede.",
          "Paso 2, asignarle un mentor maduro, del mismo sexo, que lo acompañe el primer año.",
          "Paso 3, ayudarlo con lo práctico: sacar sus documentos y buscar un lugar donde vivir y un trabajo.",
          "Paso 4, recordarle sus condiciones de libertad, si las tiene, y animarlo a cumplirlas.",
          "Paso 5, recibirlo en un grupo pequeño de la iglesia, con amor y con la prudencia que pida su historia.",
          "Paso 6, revisar cada mes con él y con su mentor cómo va, y celebrar sus avances.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si la persona cometió un delito contra niños, la iglesia la recibe con amor, pero con reglas claras: nunca a solas con menores ni en los ministerios de niños, como se vio en la especialidad Niñez, y cumpliendo lo que pida la ley.",
      },
    ],
    ideaClave:
      "Cuando todos le tenían miedo a Saulo, Bernabé lo tomó y lo llevó a los apóstoles; Pablo pidió recibir a Onésimo como a él mismo, porque el que antes fue inútil ahora era útil. Salir de la cárcel trae desafíos: los documentos, la casa, el trabajo, la familia y las viejas amistades. La iglesia recibe al que sale con amor y con prudencia, con un mentor, ayuda práctica y un grupo pequeño, y con reglas claras si hubo un delito contra niños.",
    paraLaVida: {
      texto: "Alguien tiene que dar la cara por el que empieza de nuevo.",
      pregunta: "¿Podrías ser el Bernabé de alguien que sale de la cárcel?",
    },
  },
];
