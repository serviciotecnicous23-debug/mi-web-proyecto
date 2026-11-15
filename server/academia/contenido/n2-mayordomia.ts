/**
 * Nivel 2 · Materia 6 — Mayordomía cristiana (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue la línea de «La iglesia, mi nueva familia» (Nivel 1): el diezmo como lo enseñan las iglesias evangélicas
 * pentecostales, punto de partida de la generosidad, sin prometer bendiciones a cambio de dinero, y con una advertencia
 * clara contra el evangelio de la prosperidad (1 Timoteo 6:5-10). Los consejos de dinero son principios bíblicos
 * generales, no asesoría financiera personal.
 * Referencias: Andrés Panasiuk, «¿Cómo llego a fin de mes?» (Grupo Nelson); Randy Alcorn, «El principio del tesoro»
 * (Unilit).
 */
import type { LeccionContenido } from "../tipos";

export const N2_MAYORDOMIA: LeccionContenido[] = [
  {
    id: "n2-mayordomia-1",
    objetivos: [
      "Explicar qué es la mayordomía cristiana.",
      "Reconocer que Dios es el dueño de todo y nosotros sus administradores.",
      "Describir lo que Dios espera de un administrador: fidelidad.",
    ],
    paraEmpezar:
      "Un mayordomo administraba la casa y los bienes de su señor. No era el dueño: cuidaba lo ajeno y un día rendía cuentas. La Biblia usa esa imagen para toda nuestra vida.",
    bloques: [
      { t: "versiculo", ref: "Salmos 24:1" },
      {
        t: "parrafo",
        texto:
          "«De Jehová es la tierra y su plenitud». Dios es el creador y el dueño de todo: de la tierra, de nuestra vida, de nuestro tiempo y de lo que tenemos. Nada es nuestro de forma absoluta; todo nos ha sido confiado.",
      },
      { t: "subtitulo", texto: "Labrar y guardar" },
      { t: "versiculo", ref: "Génesis 2:15" },
      {
        t: "parrafo",
        texto:
          "Desde el principio, Dios puso al hombre en el huerto de Edén «para que lo labrara y lo guardase». El trabajo y el cuidado de la creación son parte del plan de Dios desde antes del pecado. Ser mayordomo es trabajar y cuidar lo que Dios nos dio, para su gloria.",
      },
      { t: "subtitulo", texto: "Fieles en lo poco" },
      { t: "versiculo", ref: "1 Corintios 4:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que los siervos de Cristo son administradores, y que «se requiere de los administradores, que cada uno sea hallado fiel». Dios no pide que todos tengan lo mismo, sino que cada uno sea fiel con lo que recibió.",
      },
      { t: "versiculo", ref: "Lucas 16:10" },
      {
        t: "lista",
        items: [
          "La vida y el cuerpo, que son templo del Espíritu Santo (1 Corintios 6:19-20).",
          "El tiempo, que no vuelve.",
          "Los talentos y los dones.",
          "Los bienes y el dinero.",
          "El evangelio, que se nos confió para compartirlo (1 Corintios 4:1).",
        ],
      },
      {
        t: "nota",
        titulo: "Un día rendiremos cuentas",
        texto:
          "La mayordomía mira hacia adelante: cada uno dará cuenta a Dios de lo que hizo con lo que recibió (Romanos 14:12). No es para vivir con miedo, sino con propósito: el Señor desea encontrarnos fieles cuando vuelva (Mateo 25:21).",
      },
    ],
    ideaClave:
      "Dios es el dueño de todo y nosotros somos sus administradores: la vida, el tiempo, los dones, los bienes y el evangelio nos fueron confiados, y lo que Dios pide es fidelidad, porque un día rendiremos cuentas.",
    paraLaVida: {
      texto: "La pregunta no es cuánto de lo mío le doy a Dios, sino cómo uso lo que es de Dios.",
      pregunta: "¿Qué área de tu vida administras como si fuera solo tuya?",
    },
  },
  {
    id: "n2-mayordomia-2",
    objetivos: [
      "Explicar por qué el tiempo es un regalo que se administra.",
      "Describir el valor del trabajo hecho para el Señor.",
      "Organizar la semana con tiempo para Dios, la familia, el trabajo y el descanso.",
    ],
    paraEmpezar:
      "Todos tenemos las mismas 168 horas por semana. El dinero perdido a veces se recupera; el tiempo, no. Por eso la Biblia nos enseña a contar nuestros días.",
    bloques: [
      { t: "versiculo", ref: "Salmos 90:12" },
      {
        t: "parrafo",
        texto:
          "Moisés oró: «Enséñanos de tal modo a contar nuestros días». Contar los días es recordar que la vida es breve y vivirla con sabiduría, sin desperdiciarla.",
      },
      { t: "versiculo", ref: "Efesios 5:15-17" },
      {
        t: "parrafo",
        texto:
          "Pablo pide andar como sabios, «aprovechando bien el tiempo». Aprovechar el tiempo no es llenar la agenda, sino usarla para la voluntad de Dios: lo importante primero.",
      },
      { t: "subtitulo", texto: "El trabajo, hecho para el Señor" },
      { t: "versiculo", ref: "Colosenses 3:23-24" },
      {
        t: "parrafo",
        texto:
          "El trabajo no es un castigo: Dios trabajó en la creación y le dio trabajo al hombre. El creyente trabaja «de corazón, como para el Señor y no para los hombres», con honradez y excelencia, sea en una oficina, en una obra o en la casa.",
      },
      {
        t: "nota",
        titulo: "Trabajo y descanso",
        texto:
          "Dios estableció un ritmo de seis días de trabajo y uno de descanso (Éxodo 20:9-10). El descanso también es mayordomía: el cuerpo no es una máquina, y el día del Señor es un regalo para adorar y renovarse.",
      },
      { t: "subtitulo", texto: "Un plan semanal sencillo" },
      {
        t: "lista",
        items: [
          "Primero, el tiempo con Dios: la Palabra, la oración y la iglesia.",
          "La familia: tiempo de calidad, no solo lo que sobra.",
          "El trabajo o el estudio, con diligencia.",
          "El servicio en la iglesia y a los demás.",
          "El descanso y lo que renueva.",
          "Revisar en qué se va el tiempo, sobre todo en el teléfono y las pantallas.",
        ],
      },
    ],
    ideaClave:
      "El tiempo es un regalo de Dios que no vuelve: lo administramos contando nuestros días, aprovechándolo para la voluntad de Dios, trabajando de corazón como para el Señor y respetando el ritmo de trabajo y descanso.",
    paraLaVida: {
      texto: "Tu agenda cuenta lo que de verdad es importante para ti.",
      pregunta: "¿Qué cambiarías de tu semana para darle a Dios y a tu familia el lugar que merecen?",
    },
  },
  {
    id: "n2-mayordomia-3",
    objetivos: [
      "Explicar la parábola de los talentos.",
      "Reconocer los dones y las capacidades que Dios nos confió.",
      "Aplicar la fidelidad en el uso de los dones para servir.",
    ],
    paraEmpezar:
      "Un talento era una gran suma de dinero. Jesús contó la historia de un señor que repartió talentos a sus siervos antes de un viaje. Lo que hizo cada uno con ellos revela cómo veía a su señor.",
    bloques: [
      { t: "versiculo", ref: "Mateo 25:14-15" },
      {
        t: "parrafo",
        texto:
          "El señor repartió «a cada uno conforme a su capacidad». No todos recibimos lo mismo, pero todos recibimos algo: capacidades, oportunidades, recursos y dones espirituales.",
      },
      { t: "versiculo", ref: "Mateo 25:21" },
      {
        t: "parrafo",
        texto:
          "Los dos primeros siervos negociaron y duplicaron lo recibido, y el señor les dijo lo mismo a ambos: «Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré». Dios premia la fidelidad, no la cantidad.",
      },
      { t: "subtitulo", texto: "El siervo que enterró su talento" },
      { t: "versiculo", ref: "Mateo 25:24-26" },
      {
        t: "parrafo",
        texto:
          "El tercer siervo enterró su talento por miedo, porque veía a su señor como un hombre duro. Su problema no fue tener poco, sino no usarlo: el señor lo llamó «Siervo malo y negligente». Quien conoce la bondad de Dios no entierra lo que recibió.",
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "nota",
        titulo: "Tus dones son para servir",
        texto:
          "Pedro llama a los creyentes buenos administradores de la multiforme gracia de Dios: cada don se recibe para servir a otros. La materia Dones espirituales y servicio te ayudará a descubrir los tuyos.",
      },
    ],
    ideaClave:
      "Dios reparte a cada uno conforme a su capacidad y espera fidelidad, no cantidad; el siervo fiel usa lo recibido para el Señor y para servir a otros, y el negligente lo entierra por miedo.",
    paraLaVida: {
      texto: "Lo que no se usa para Dios termina enterrado.",
      pregunta: "¿Qué talento o don tienes enterrado, y cómo empezarás a usarlo para servir?",
    },
  },
  {
    id: "n2-mayordomia-4",
    objetivos: [
      "Describir lo que enseña la Biblia sobre el diezmo antes de la ley, en la ley y en las palabras de Jesús.",
      "Explicar los principios del Nuevo Testamento para dar.",
      "Distinguir entre dar con fe y gratitud y el falso evangelio de la prosperidad.",
    ],
    paraEmpezar:
      "En la materia La iglesia, mi nueva familia viste qué es el diezmo. Ahora lo estudiarás con más profundidad, junto con los principios para dar que enseña el Nuevo Testamento y un peligro que conviene conocer.",
    bloques: [
      { t: "subtitulo", texto: "El diezmo en la Biblia" },
      {
        t: "lista",
        items: [
          "Antes de la ley: Abram dio los diezmos a Melquisedec (Génesis 14:18-20) y Jacob prometió dar a Dios el diezmo de todo (Génesis 28:22).",
          "En la ley: el diezmo era santo para Jehová y sostenía a los levitas, que servían en el tabernáculo (Levítico 27:30; Números 18:21).",
          "En los profetas: Dios reprendió a su pueblo por retener los diezmos y las ofrendas, y lo invitó a traerlos al alfolí (Malaquías 3:8-10).",
          "En las palabras de Jesús: no anuló el diezmo, pero pidió lo más importante de la ley: la justicia, la misericordia y la fe (Mateo 23:23).",
        ],
      },
      { t: "versiculo", ref: "Malaquías 3:10" },
      { t: "versiculo", ref: "Mateo 23:23" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo de los diezmos: «Esto era necesario hacer, sin dejar de hacer aquello». Por eso las iglesias evangélicas pentecostales enseñan el diezmo como el punto de partida de la generosidad del creyente, y las ofrendas como dádivas voluntarias además del diezmo.",
      },
      { t: "subtitulo", texto: "Cómo enseña a dar el Nuevo Testamento" },
      { t: "versiculo", ref: "1 Corintios 16:2" },
      {
        t: "lista",
        items: [
          "Con orden y en proporción a lo que recibimos: «según haya prosperado».",
          "Con alegría, no con tristeza ni por necesidad (2 Corintios 9:7).",
          "Para sostener la obra de Dios y a quienes la sirven (1 Corintios 9:13-14; Gálatas 6:6).",
          "Para ayudar a los pobres y a los hermanos necesitados (Hechos 4:34-35; Gálatas 2:10).",
          "Con transparencia, haciendo las cosas honradamente delante del Señor y de los hombres (2 Corintios 8:21).",
        ],
      },
      {
        t: "nota",
        titulo: "Cuidado con el evangelio de la prosperidad",
        texto:
          "Hay quienes enseñan que dar dinero obliga a Dios a hacernos ricos. La Biblia reprende a los que toman la piedad como fuente de ganancia (1 Timoteo 6:5). Dios bendice al generoso, pero no se le compra: damos por gratitud, por fe y por amor, porque Él nos dio primero a su Hijo.",
      },
    ],
    ideaClave:
      "El diezmo aparece antes de la ley, en la ley y en las palabras de Jesús, y la iglesia lo enseña como el punto de partida de la generosidad; el Nuevo Testamento pide dar con orden, en proporción, con alegría y con transparencia, y nunca como un negocio con Dios.",
    paraLaVida: {
      texto: "Dar con alegría es una forma de adorar.",
      pregunta: "¿Das a Dios con alegría y con orden, o solo lo que sobra? ¿Qué decisión tomarás?",
    },
  },
  {
    id: "n2-mayordomia-5",
    objetivos: [
      "Describir el ejemplo de generosidad de las iglesias de Macedonia y de Cristo.",
      "Explicar el contentamiento y el peligro del amor al dinero.",
      "Aplicar la generosidad en la vida diaria.",
    ],
    paraEmpezar:
      "La generosidad no depende de cuánto tenemos, sino de cuánto confiamos en Dios. Algunas de las iglesias más pobres del Nuevo Testamento fueron las más generosas.",
    bloques: [
      { t: "subtitulo", texto: "Dar desde la pobreza" },
      { t: "versiculo", ref: "2 Corintios 8:1-5" },
      {
        t: "parrafo",
        texto:
          "Las iglesias de Macedonia eran pobres y estaban en prueba, pero dieron «aun más allá de sus fuerzas». El secreto: «a sí mismos se dieron primeramente al Señor». La generosidad nace de un corazón entregado a Dios.",
      },
      { t: "versiculo", ref: "2 Corintios 8:9" },
      {
        t: "parrafo",
        texto:
          "El modelo supremo es Cristo, que «por amor a vosotros se hizo pobre, siendo rico». Quien ha recibido tanta gracia aprende a dar.",
      },
      { t: "subtitulo", texto: "El contentamiento" },
      { t: "versiculo", ref: "1 Timoteo 6:6-10" },
      {
        t: "parrafo",
        texto:
          "Pablo enseña que «gran ganancia es la piedad acompañada de contentamiento». El dinero no es malo, pero «raíz de todos los males es el amor al dinero». El contentamiento es estar satisfecho en Cristo, tengamos mucho o poco (Filipenses 4:11-13).",
      },
      { t: "versiculo", ref: "Hechos 20:35" },
      {
        t: "nota",
        titulo: "Más bienaventurado es dar",
        texto:
          "Pablo recordó las palabras del Señor Jesús: «Más bienaventurado es dar que recibir». La generosidad incluye el dinero, pero también el tiempo, la hospitalidad y la ayuda práctica a quien lo necesita.",
      },
      { t: "subtitulo", texto: "Formas de ser generoso" },
      {
        t: "lista",
        items: [
          "Apartar primero para Dios y para dar, antes de gastar.",
          "Ayudar a un hermano en necesidad sin anunciarlo.",
          "Abrir la casa y la mesa: la hospitalidad (Romanos 12:13).",
          "Dar tiempo y trabajo a quien no puede pagarlos.",
        ],
      },
      { t: "video", url: "https://bibleproject.com/es/videos/generosidad/", titulo: "Generosidad", fuente: "Proyecto Biblia", minutos: 5 },
    ],
    ideaClave:
      "La generosidad nace de un corazón entregado primero al Señor, como el de las iglesias de Macedonia, y tiene su modelo en Cristo, que se hizo pobre por nosotros; el contentamiento en Cristo nos libra del amor al dinero.",
    paraLaVida: {
      texto: "La persona generosa no es la que tiene más, sino la que se aferra menos.",
      pregunta: "¿A quién puedes ayudar esta semana con tu tiempo, tu mesa o tus bienes?",
    },
  },
  {
    id: "n2-mayordomia-6",
    objetivos: [
      "Explicar principios bíblicos sobre el trabajo, las deudas y el ahorro.",
      "Elaborar un presupuesto sencillo con prioridades bíblicas.",
      "Aplicar la honradez y la previsión en el manejo del dinero.",
    ],
    paraEmpezar:
      "Muchas familias sufren no tanto por ganar poco, sino por no administrar bien lo que ganan. La Biblia, y en especial Proverbios, tiene mucha sabiduría práctica para el dinero.",
    bloques: [
      { t: "subtitulo", texto: "Trabajar y proveer" },
      { t: "versiculo", ref: "2 Tesalonicenses 3:10-12" },
      {
        t: "parrafo",
        texto:
          "Pablo enseñó: «Si alguno no quiere trabajar, tampoco coma». El creyente trabaja para proveer para los suyos (1 Timoteo 5:8), para no ser carga para otros y para tener qué compartir con el que padece necesidad (Efesios 4:28).",
      },
      { t: "subtitulo", texto: "Las deudas" },
      { t: "versiculo", ref: "Proverbios 22:7" },
      { t: "versiculo", ref: "Romanos 13:8" },
      {
        t: "parrafo",
        texto:
          "La Biblia no prohíbe todo préstamo, pero advierte que «el que toma prestado es siervo del que presta», y Pablo exhorta: «No debáis a nadie nada, sino el amaros unos a otros». Por eso conviene evitar las deudas para consumir, pagar lo que se debe con puntualidad y no prometer lo que no se puede cumplir (Salmos 37:21).",
      },
      { t: "subtitulo", texto: "Ahorrar y planear" },
      { t: "versiculo", ref: "Proverbios 6:6-8" },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "La hormiga prepara en el verano su comida: el sabio ahorra para el tiempo difícil. Y Jesús habló del que «se sienta primero y calcula los gastos» antes de edificar: planear no es falta de fe, es buena administración.",
      },
      { t: "subtitulo", texto: "Un presupuesto sencillo, con prioridades" },
      {
        t: "lista",
        items: [
          "Primero, dar a Dios: el diezmo y las ofrendas.",
          "Después, ahorrar una parte, aunque sea pequeña, para las emergencias.",
          "Pagar las necesidades: vivienda, comida, servicios, transporte y salud.",
          "Pagar las deudas a tiempo y no contraer otras para consumir.",
          "Lo que sobra, para lo que se desea, sin gastar más de lo que entra.",
        ],
      },
      {
        t: "nota",
        titulo: "Honradez en todo",
        texto:
          "La mayordomía incluye pagar los impuestos (Romanos 13:7), no engañar en los negocios (Proverbios 11:1) y no salir fiador a la ligera (Proverbios 22:26-27). El dinero manejado con honradez es un testimonio.",
      },
    ],
    ideaClave:
      "Las finanzas sanas se edifican con trabajo honrado, sin deudas para consumir, con ahorro previsor y con un presupuesto con prioridades: primero Dios, después el ahorro, las necesidades y las deudas, sin gastar más de lo que entra.",
    paraLaVida: {
      texto: "Un presupuesto le dice al dinero adónde ir, en vez de preguntarte después adónde se fue.",
      pregunta: "¿Qué paso darás este mes: hacer un presupuesto, empezar a ahorrar o pagar una deuda?",
    },
  },
];
