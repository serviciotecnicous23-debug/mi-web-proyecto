/**
 * Especialidad Ministerio pastoral · Materia 3 — Ordenanzas y ceremonias (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La práctica del pastor que preside: las ordenanzas y las ceremonias, el bautismo en agua, la Santa Cena, la
 * presentación de niños, la boda (con lo que pide la ley en Texas) y el funeral. Cada ceremonia trae su ejemplo
 * resuelto paso a paso. No repite El bautismo y la Santa Cena (Nivel 1): lleva su doctrina a la práctica pastoral.
 * Sigue el artículo 8 (las ordenanzas) y el 14 (el matrimonio) de la declaración de fe.
 */
import type { LeccionContenido } from "../tipos";

export const PASTORAL_3: LeccionContenido[] = [
  {
    id: "pastoral-3-1",
    objetivos: [
      "Distinguir las ordenanzas que Cristo mandó de las ceremonias que celebra la iglesia.",
      "Comparar con respeto cómo entienden las iglesias las ordenanzas.",
      "Explicar el papel del pastor que preside: enseñar, preparar y hacerlo todo con orden.",
    ],
    paraEmpezar:
      "Bautizar, partir el pan, presentar a un niño, casar a una pareja y despedir a un hermano: el pastor preside los momentos más importantes de la vida de su pueblo. Esta materia enseña a hacerlo bien.",
    bloques: [
      { t: "versiculo", ref: "Mateo 28:19-20" },
      {
        t: "parrafo",
        texto:
          "Jesús mandó hacer discípulos «bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado». El bautismo no es una idea de la iglesia: es un mandato del Señor.",
      },
      { t: "versiculo", ref: "1 Corintios 11:23-24" },
      {
        t: "parrafo",
        texto:
          "Lo mismo pasa con la Cena. Pablo la recibió «del Señor», y Jesús mismo dijo: «haced esto en memoria de mí». Por eso se llaman ordenanzas: el Señor las ordenó.",
      },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      {
        t: "parrafo",
        texto:
          "La primera iglesia las practicó desde el principio: «los que recibieron su palabra fueron bautizados», y «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».",
      },
      { t: "subtitulo", texto: "Ordenanzas y ceremonias" },
      {
        t: "lista",
        items: [
          "Las ordenanzas son dos, el bautismo en agua y la Santa Cena: el Señor las mandó, y la iglesia las celebra en todo tiempo y lugar.",
          "Las ceremonias, como la presentación de niños, la boda y el funeral, no tienen un mandato directo, pero sí un fundamento bíblico; la iglesia las celebra para bendecir y acompañar a las familias.",
          "Las ordenanzas tienen elementos que no se cambian: el agua, el pan y la copa. Las ceremonias se adaptan a la cultura y a cada familia, siempre que honren a Dios.",
        ],
      },
      { t: "subtitulo", texto: "Con respeto: cómo las entienden las iglesias" },
      {
        t: "lista",
        items: [
          "La Iglesia católica cuenta siete sacramentos y enseña que comunican la gracia de Dios a quien los recibe.",
          "Las iglesias luteranas y reformadas reconocen dos sacramentos, el bautismo y la Cena, como medios de gracia unidos a la Palabra.",
          "La mayoría de las iglesias evangélicas y pentecostales hablan de ordenanzas: actos de obediencia y de testimonio que Cristo mandó. Algunas, como la Iglesia de Dios (Cleveland, Tennessee), practican también el lavatorio de pies (Juan 13:14).",
        ],
      },
      {
        t: "nota",
        titulo: "La declaración de fe",
        texto:
          "La declaración de fe del Ministerio Avivando el Fuego reconoce dos ordenanzas: el bautismo en agua, por inmersión, de quienes se arrepintieron y creyeron, y la Santa Cena, memorial de la muerte del Señor (artículo 8).",
      },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto:
          "El pastor que preside enseña el sentido de cada ordenanza y ceremonia, prepara a las personas, cuida los detalles y lleva un registro. Pablo lo resume para todo el culto: «hágase todo decentemente y con orden».",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lleva un libro de registro de la iglesia con los bautismos, las presentaciones, las bodas y los funerales: los nombres, las fechas y quién ofició. Ese registro sirve a las familias por muchos años.",
      },
    ],
    ideaClave:
      "Las ordenanzas son dos, el bautismo en agua y la Santa Cena, porque el Señor las mandó y la primera iglesia las practicó. Las ceremonias, como la presentación de niños, la boda y el funeral, tienen fundamento bíblico sin ser un mandato, y se adaptan a cada cultura. Las iglesias difieren en cómo entienden las ordenanzas, como sacramentos o como ordenanzas, y la declaración de fe del ministerio reconoce dos. El pastor preside enseñando, preparando y haciéndolo todo con orden.",
    paraLaVida: {
      texto: "Presidir una ordenanza es servir a la mesa del Señor, no lucirse en ella.",
      pregunta: "¿Qué ordenanza o ceremonia de tu iglesia necesita más preparación y más enseñanza?",
    },
  },
  {
    id: "pastoral-3-2",
    objetivos: [
      "Explicar el sentido del bautismo en agua y quiénes se bautizan.",
      "Preparar a los candidatos con una clase y una entrevista.",
      "Dirigir un bautismo paso a paso, con seguridad en el agua.",
    ],
    paraEmpezar:
      "Un bautismo es una de las fiestas más grandes de la iglesia. También es un momento que se prepara con cuidado: antes, durante y después.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 2:38" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés, Pedro llamó primero al arrepentimiento: «Arrepentíos, y bautícese cada uno de vosotros». El bautismo sigue a la fe y al arrepentimiento; no los reemplaza.",
      },
      { t: "versiculo", ref: "Hechos 8:36-38" },
      {
        t: "parrafo",
        texto:
          "El eunuco preguntó: «¿qué impide que yo sea bautizado?», y Felipe respondió: «Si crees de todo corazón, bien puedes». Después «descendieron ambos al agua». Bautizar no tiene que esperar años, pero sí pide una fe verdadera.",
      },
      { t: "versiculo", ref: "Romanos 6:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo explica lo que el bautismo representa: «somos sepultados juntamente con él para muerte por el bautismo», para que «andemos en vida nueva». Por eso la iglesia bautiza por inmersión: la persona baja al agua como quien es sepultado y sale como quien resucita.",
      },
      { t: "versiculo", ref: "Mateo 28:19" },
      {
        t: "parrafo",
        texto:
          "Se bautiza «en el nombre del Padre, y del Hijo, y del Espíritu Santo», como mandó Jesús. Algunas iglesias, llamadas unicitarias, bautizan solo en el nombre de Jesús porque no aceptan la doctrina de la Trinidad; las iglesias trinitarias, como la declaración de fe del ministerio, usan las palabras de Mateo 28:19.",
      },
      { t: "subtitulo", texto: "Con respeto: niños o creyentes" },
      {
        t: "parrafo",
        texto:
          "La Iglesia católica, la ortodoxa y muchas iglesias protestantes, como las luteranas, las presbiterianas y las metodistas, bautizan también a los hijos pequeños de los creyentes, y muchas lo hacen derramando o rociando agua. La mayoría de las iglesias bautistas y pentecostales bautizan solo a quienes pueden confesar su fe, y por inmersión. Cuando llega alguien que fue bautizado de niño y ahora cree, el pastor le explica con respeto por qué se bautizan los creyentes, sin despreciar la fe de su familia.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un bautismo paso a paso" },
      {
        t: "lista",
        items: [
          "Antes: una clase de bautismo de dos a cuatro encuentros, con el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia.",
          "Antes: una entrevista personal, en la que el candidato cuenta cómo creyó en Cristo.",
          "Antes: revisar el lugar: la profundidad y la temperatura del agua, un piso que no resbale y dos personas en el agua para sumergir.",
          "Durante: una lectura breve, como Romanos 6:3-4, y el testimonio del candidato.",
          "Durante: la pregunta de fe: ¿Te has arrepentido de tus pecados y crees en Jesucristo como tu Señor y Salvador?",
          "Durante: las palabras: Por tu confesión de fe, yo te bautizo en el nombre del Padre, del Hijo y del Espíritu Santo. Una mano en la espalda y la otra sobre las manos del candidato, que se tapa la nariz.",
          "Después: una oración, la bienvenida de la iglesia, el registro, un certificado y un grupo pequeño para seguir creciendo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuida a quien tiene miedo al agua, a las personas mayores, a las embarazadas y a quien vive con una discapacidad: puede hacer falta una silla dentro del agua o más ayudantes. Pide ropa oscura que no se transparente y ten toallas listas. Si bautizan en un río o en el mar, revisen antes la corriente.",
      },
    ],
    ideaClave:
      "El bautismo en agua sigue a la fe y al arrepentimiento, como en Pentecostés y con el eunuco, y representa la muerte y la resurrección con Cristo; por eso la iglesia bautiza por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo. Las iglesias difieren sobre bautizar a los niños, y el tema se trata con respeto. Un buen bautismo se prepara con una clase y una entrevista, se celebra con seguridad en el agua y continúa con el registro y el seguimiento.",
    paraLaVida: {
      texto: "El bautismo dura un minuto; la vida nueva que anuncia dura para siempre.",
      pregunta: "¿Cómo acompaña tu iglesia a los recién bautizados después del día de su bautismo?",
    },
  },
  {
    id: "pastoral-3-3",
    objetivos: [
      "Explicar el sentido de la Santa Cena según 1 Corintios 10 y 11.",
      "Comparar con respeto cómo entienden las iglesias la presencia de Cristo en la Cena.",
      "Dirigir un servicio de Santa Cena con orden y reverencia.",
    ],
    paraEmpezar:
      "La noche en que fue entregado, Jesús tomó pan y una copa. Desde entonces, cada vez que la iglesia parte el pan mira hacia atrás, a la cruz, y hacia adelante, a su venida.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 11:23-26" },
      {
        t: "parrafo",
        texto:
          "La Cena mira hacia atrás: «haced esto en memoria de mí». Y mira hacia adelante: «la muerte del Señor anunciáis hasta que él venga». Es memoria de la cruz y anuncio de su venida.",
      },
      { t: "versiculo", ref: "1 Corintios 10:16-17" },
      {
        t: "parrafo",
        texto:
          "También es comunión: «El pan que partimos, ¿no es la comunión del cuerpo de Cristo?». Y une a la iglesia: «Siendo uno solo el pan, nosotros, con ser muchos, somos un cuerpo».",
      },
      { t: "versiculo", ref: "1 Corintios 11:27-29" },
      {
        t: "parrafo",
        texto:
          "Por eso se participa con un corazón preparado: «pruébese cada uno a sí mismo, y coma así del pan, y beba de la copa». La mesa no es para los perfectos, sino para los creyentes que se examinan, confiesan su pecado y se acercan con fe.",
      },
      { t: "subtitulo", texto: "Con respeto: cómo está Cristo en la Cena" },
      {
        t: "lista",
        items: [
          "La Iglesia católica enseña la transubstanciación: el pan y el vino se convierten en el cuerpo y la sangre de Cristo.",
          "Lutero enseñó que Cristo está presente en, con y bajo el pan y el vino.",
          "Calvino enseñó una presencia espiritual: por el Espíritu, el creyente se alimenta de Cristo.",
          "Zuinglio subrayó el memorial: la Cena recuerda y proclama la muerte de Cristo.",
        ],
      },
      {
        t: "nota",
        titulo: "La declaración de fe",
        texto:
          "La declaración de fe del Ministerio Avivando el Fuego llama a la Santa Cena memorial de la muerte del Señor, comunión con Él y con su pueblo y anuncio de su venida, para los creyentes que se examinan a sí mismos (artículo 8).",
      },
      { t: "versiculo", ref: "Hechos 20:7" },
      {
        t: "parrafo",
        texto:
          "El Nuevo Testamento no fija cada cuánto se celebra. En Troas, los discípulos se reunían «El primer día de la semana» «para partir el pan», y hoy unas iglesias celebran la Cena cada domingo y otras una vez al mes. Lo importante es que nunca se vuelva una costumbre vacía.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un servicio de Santa Cena" },
      {
        t: "lista",
        items: [
          "Preparar la mesa: el pan y el fruto de la vid, vino o jugo de uva, con higiene y, si hace falta, una opción sin gluten.",
          "Leer 1 Corintios 11:23-26 y dar un mensaje breve centrado en la cruz.",
          "Dar un momento de silencio para que cada uno se examine y confiese su pecado.",
          "Orar por el pan, repartirlo y comer juntos, repitiendo las palabras de Jesús.",
          "Orar por la copa, repartirla y beber juntos.",
          "Terminar con un canto de gratitud y el anuncio de que Cristo vendrá.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Explica antes quiénes participan: los creyentes que se examinan a sí mismos. Las iglesias difieren sobre los niños: unas esperan a que se bauticen y otras a que confiesen su fe; sigue la práctica de tu iglesia. Y no olvides a los enfermos y a los que no pueden salir de casa: llévales la Cena con un diácono.",
      },
    ],
    ideaClave:
      "La Santa Cena mira a la cruz, en memoria del Señor, y a su venida; es comunión con Cristo y une a la iglesia en un solo cuerpo. Se participa examinándose a sí mismo. Las iglesias entienden de distintas maneras la presencia de Cristo en la Cena, y la declaración de fe del ministerio la llama memorial, comunión y anuncio de su venida. El pastor la celebra con orden: prepara la mesa, lee la Palabra, invita al examen, ora y reparte el pan y la copa.",
    paraLaVida: {
      texto: "A la mesa del Señor todos llegamos con las manos vacías, y él las llena.",
      pregunta: "¿Cómo puedes ayudar a tu iglesia a vivir la Santa Cena con más reverencia y menos costumbre?",
    },
  },
  {
    id: "pastoral-3-4",
    objetivos: [
      "Explicar el fundamento bíblico de la presentación de niños y en qué se distingue del bautismo.",
      "Preparar a los padres con una entrevista.",
      "Dirigir una presentación de niños paso a paso.",
    ],
    paraEmpezar:
      "Cuando una familia trae a su bebé al altar, toda la iglesia da gracias por un regalo de Dios y se compromete con ese niño.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=DTL5QW6Ez7s", titulo: "El nacimiento de Jesús: Lucas 1 y 2", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "1 Samuel 1:27-28" },
      {
        t: "parrafo",
        texto:
          "Ana había orado por un hijo, y cuando Samuel nació dijo: «Por este niño oraba, y Jehová me dio lo que le pedí». Luego lo entregó a Dios: «Yo, pues, lo dedico también a Jehová».",
      },
      { t: "versiculo", ref: "Lucas 2:22" },
      {
        t: "parrafo",
        texto:
          "José y María también llevaron a Jesús al templo: «le trajeron a Jerusalén para presentarle al Señor», como pedía la ley de Moisés.",
      },
      { t: "versiculo", ref: "Marcos 10:13-16" },
      {
        t: "parrafo",
        texto:
          "Jesús recibió a los niños que le traían: «Dejad a los niños venir a mí, y no se lo impidáis». Y «tomándolos en los brazos, poniendo las manos sobre ellos, los bendecía». En la presentación, la iglesia hace lo mismo: recibe al niño y lo bendice.",
      },
      { t: "subtitulo", texto: "Qué es y qué no es" },
      {
        t: "lista",
        items: [
          "Es una acción de gracias por la vida del niño.",
          "Es el compromiso de los padres de criarlo en la fe, y el de la iglesia de acompañarlos.",
          "Es una oración de bendición por el niño y por su familia.",
          "No es un bautismo ni salva al niño: en las iglesias que bautizan a los creyentes, el niño se bautizará cuando él mismo crea.",
        ],
      },
      { t: "versiculo", ref: "Deuteronomio 6:6-7" },
      {
        t: "parrafo",
        texto:
          "El compromiso de los padres es el de Israel: las palabras de Dios estarán «sobre tu corazón; y las repetirás a tus hijos», en la casa y en el camino. La fe se enseña en la vida de todos los días.",
      },
      { t: "versiculo", ref: "Efesios 6:4" },
      {
        t: "parrafo",
        texto:
          "Pablo se lo pide a los padres: «criadlos en disciplina y amonestación del Señor». La presentación es el comienzo de ese camino, no su final.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una presentación paso a paso" },
      {
        t: "lista",
        items: [
          "Antes: una entrevista con los padres para explicarles el sentido, conocer su fe y preparar el día.",
          "Durante: presentar a la familia ante la iglesia y leer un pasaje, como Marcos 10:13-16.",
          "Durante: preguntar a los padres: ¿Prometen criar a este niño en la disciplina y la amonestación del Señor, con su ejemplo y con la Palabra?",
          "Durante: preguntar a la iglesia: ¿Prometen orar por esta familia y ayudarla a criar a este niño en la fe?",
          "Durante: orar por el niño con las manos sobre él, bendecirlo y orar por sus padres.",
          "Después: entregar un certificado o una Biblia, anotarlo en el registro y conectar a la familia con el ministerio de niños.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Recibe con gracia a toda familia: una madre sola, unos abuelos que crían a sus nietos o unos padres que todavía no creen. Ajusta las preguntas a su situación, sin pedir promesas que no pueden cumplir, y aprovecha la entrevista para hablarles del evangelio.",
      },
    ],
    ideaClave:
      "La presentación de niños tiene su fundamento en Ana, que dedicó a Samuel, en José y María, que presentaron a Jesús en el templo, y en Jesús, que recibió y bendijo a los niños. Es una acción de gracias, un compromiso de los padres y de la iglesia, y una bendición; no es un bautismo ni salva al niño. Se prepara con una entrevista, se celebra con preguntas a los padres y a la iglesia y con una oración de bendición, y sigue con el ministerio de niños.",
    paraLaVida: {
      texto: "Cada niño presentado es una promesa de toda la iglesia.",
      pregunta: "¿Qué hace tu iglesia para cumplir lo que promete en cada presentación?",
    },
  },
  {
    id: "pastoral-3-5",
    objetivos: [
      "Explicar el matrimonio como un pacto que Dios instituyó.",
      "Planificar la consejería prematrimonial y los requisitos de la ley en Texas.",
      "Dirigir una ceremonia de boda paso a paso.",
    ],
    paraEmpezar:
      "Una boda dura unas horas; el matrimonio, toda la vida. El pastor ayuda a preparar las dos cosas.",
    bloques: [
      { t: "versiculo", ref: "Génesis 2:24" },
      { t: "versiculo", ref: "Mateo 19:4-6" },
      {
        t: "parrafo",
        texto:
          "Jesús volvió al principio: «varón y hembra los hizo», y los dos «serán una sola carne». Y concluyó: «lo que Dios juntó, no lo separe el hombre». El matrimonio no es un contrato que se rompe cuando conviene, sino un pacto delante de Dios.",
      },
      { t: "versiculo", ref: "Hebreos 13:4" },
      {
        t: "parrafo",
        texto:
          "«Honroso sea en todos el matrimonio, y el lecho sin mancilla». La declaración de fe del ministerio enseña que Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida (artículo 14).",
      },
      { t: "versiculo", ref: "Efesios 5:25" },
      {
        t: "parrafo",
        texto:
          "El modelo del amor en el matrimonio es Cristo: «Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella».",
      },
      { t: "subtitulo", texto: "Antes de la boda" },
      {
        t: "lista",
        items: [
          "La consejería prematrimonial: de cuatro a seis encuentros sobre la fe, la comunicación, el dinero, la intimidad, las familias de origen y cómo resolver los conflictos.",
          "Una conversación sincera sobre la fe de los dos y sobre lo que esperan del matrimonio.",
          "Si uno de los novios estuvo casado antes, el pastor lo conversa con el liderazgo según la enseñanza y la práctica de su iglesia.",
        ],
      },
      { t: "versiculo", ref: "2 Corintios 6:14" },
      {
        t: "parrafo",
        texto:
          "La fe de los novios importa: «No os unáis en yugo desigual con los incrédulos». El pastor lo conversa con ellos con claridad y con amor antes de comprometerse a casarlos.",
      },
      { t: "subtitulo", texto: "Lo que pide la ley en Texas" },
      {
        t: "lista",
        items: [
          "Los novios sacan la licencia de matrimonio en la oficina del secretario del condado (County Clerk).",
          "Deben esperar 72 horas desde que la reciben para casarse, salvo excepciones, como haber tomado el curso prematrimonial Twogether in Texas, que además rebaja el costo de la licencia.",
          "La licencia vence a los 90 días: la boda tiene que celebrarse antes.",
          "Puede oficiar, entre otros, un ministro cristiano con licencia u ordenado (Código de Familia, sección 2.202).",
          "El oficiante completa la licencia y la devuelve al condado dentro de los 30 días siguientes a la boda.",
          "Ningún ministro está obligado a oficiar una boda que vaya contra sus convicciones religiosas: la ley de Texas lo protege (Código de Familia, sección 2.601).",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una ceremonia paso a paso" },
      {
        t: "lista",
        items: [
          "La entrada de los novios y de su cortejo.",
          "La bienvenida y una oración.",
          "Una lectura, como Génesis 2:24 o Mateo 19:4-6, y un mensaje breve sobre el pacto.",
          "Los votos: cada uno promete amar, honrar y ser fiel al otro, en la salud y en la enfermedad, hasta que la muerte los separe.",
          "Los anillos, como señal del pacto.",
          "La oración de bendición sobre los esposos.",
          "La declaración: los declaro marido y mujer; lo que Dios juntó, no lo separe el hombre.",
          "La presentación de los esposos a la iglesia y, después, la firma de la licencia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Ten por escrito el orden de la ceremonia y ensáyalo con los novios y el cortejo un día antes. Revisa la licencia antes de empezar: los nombres, la fecha y que no esté vencida. Y devuélvela a tiempo al condado, porque sin ese paso el matrimonio no queda registrado.",
      },
    ],
    ideaClave:
      "Dios instituyó el matrimonio como un pacto entre un hombre y una mujer para toda la vida: lo que Dios juntó, no lo separe el hombre. El pastor prepara a los novios con la consejería prematrimonial y conversa con ellos sobre su fe. En Texas, los novios sacan la licencia en el condado, esperan 72 horas salvo excepciones y se casan antes de 90 días, y el ministro la devuelve en 30 días. La ceremonia sigue un orden: bienvenida, lectura y mensaje, votos, anillos, bendición, declaración y presentación.",
    paraLaVida: {
      texto: "El pastor no solo casa a una pareja: la acompaña para que su pacto dure.",
      pregunta: "¿Qué acompañamiento ofrece tu iglesia a los recién casados después de la boda?",
    },
  },
  {
    id: "pastoral-3-6",
    objetivos: [
      "Explicar la esperanza cristiana ante la muerte.",
      "Acompañar a una familia en el duelo, antes y después del funeral.",
      "Dirigir un funeral paso a paso, también en los casos difíciles.",
    ],
    paraEmpezar:
      "Pocas veces la iglesia necesita tanto a su pastor como cuando muere alguien. En ese momento, su presencia dice más que muchas palabras.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 11:35" },
      {
        t: "parrafo",
        texto:
          "Ante la tumba de Lázaro, «Jesús lloró». Llorar no es falta de fe. El pastor no apura el duelo ni da explicaciones: acompaña, escucha y ora.",
      },
      { t: "versiculo", ref: "Juan 11:25-26" },
      {
        t: "parrafo",
        texto:
          "Pero Jesús también dio la esperanza más grande: «Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá». El funeral cristiano es una despedida con esperanza.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 4:13-14" },
      {
        t: "parrafo",
        texto:
          "Pablo no prohíbe la tristeza; dice que no es igual a la de otros: «para que no os entristezcáis como los otros que no tienen esperanza». Lloramos, pero con esperanza.",
      },
      { t: "versiculo", ref: "Romanos 12:15" },
      { t: "versiculo", ref: "2 Corintios 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Dios es el «Dios de toda consolación», que nos consuela «para que podamos también nosotros consolar a los que están en cualquier tribulación». Y la iglesia obedece el mandato: «llorad con los que lloran».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un funeral paso a paso" },
      {
        t: "lista",
        items: [
          "Antes: visitar a la familia lo antes posible, escuchar, orar y ofrecer ayuda práctica.",
          "Antes: planear con la familia las lecturas, los cantos, quién dará la semblanza y las costumbres que quieren honrar.",
          "Durante: la bienvenida y una oración.",
          "Durante: una lectura, como el Salmo 23 o Juan 11:25-26, y cantos de esperanza.",
          "Durante: la semblanza, a cargo de alguien de la familia o de un amigo.",
          "Durante: un mensaje breve, de diez a quince minutos, de consuelo y de esperanza en Cristo.",
          "Durante: la oración final y la despedida.",
          "En el cementerio: una lectura breve, como 1 Corintios 15:55, y una oración.",
        ],
      },
      { t: "subtitulo", texto: "Casos difíciles" },
      {
        t: "lista",
        items: [
          "Si el difunto no era creyente, o no se sabe, el pastor no habla de su destino eterno: consuela a la familia y presenta con sencillez la esperanza del evangelio, sin presionar.",
          "Si fue un suicidio, el pastor no condena desde el púlpito: acompaña a la familia con compasión y la ayuda a buscar apoyo profesional si lo necesita.",
          "Si murió un niño o una persona joven, el pastor no da explicaciones: llora con la familia y la sostiene en oración.",
          "Si la familia tiene otras creencias, el pastor respeta sus costumbres y sirve con amor.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El duelo no termina con el funeral. Llama o visita a la familia a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario, y pide a la iglesia que siga cerca. Si con el paso de los meses el dolor no deja vivir a alguien, ayúdalo a buscar ayuda profesional.",
      },
    ],
    ideaClave:
      "Jesús lloró ante la tumba de Lázaro, y también dijo que él es la resurrección y la vida. El funeral cristiano es una despedida con esperanza: lloramos, pero no como los que no tienen esperanza. El pastor visita y escucha, planea con la familia y dirige un funeral sencillo: bienvenida, lectura, cantos, semblanza, un mensaje breve de esperanza y oración. En los casos difíciles no juzga ni da explicaciones: consuela. Y acompaña el duelo después del funeral.",
    paraLaVida: {
      texto: "En un funeral, la presencia del pastor predica antes que su sermón.",
      pregunta: "¿A qué familia en duelo de tu iglesia podrías visitar o llamar esta semana?",
    },
  },
];
