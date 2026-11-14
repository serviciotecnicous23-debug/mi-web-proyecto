/**
 * La declaración de fe del Ministerio Avivando el Fuego (docs/academia.md, «La declaración de fe»): lo que la academia
 * enseña. Es un BORRADOR hasta que la Dirección académica la apruebe en el panel (pestaña «Contenido»); la aprobación
 * guarda su huella, así que si el texto cambia hay que aprobarla otra vez. La materia «Doctrinas fundamentales» del
 * Nivel 2 la sigue artículo por artículo.
 *
 * Sigue la fe evangélica pentecostal que ya enseñan las lecciones del Nivel 1, en la línea de las obras de la
 * bibliografía (Pearlman, Duffield y Van Cleave, Horton). Donde los pentecostales difieren entre sí, el artículo lleva
 * `aConfirmar`: lo decide el Ministerio. Las citas son de la Reina-Valera 1960. No importa nada.
 */
export type ArticuloFe = {
  n: number;
  titulo: string;
  texto: string;
  refs: string[];
  /** Un punto en que las iglesias pentecostales difieren: lo confirma el Ministerio antes de aprobarla. */
  aConfirmar?: string;
};

export const DECLARACION_FE = {
  version: "2026-11-14",
  titulo: "Declaración de fe del Ministerio Avivando el Fuego",
  intro:
    "Creemos lo que la Biblia enseña. Esta declaración resume las verdades que el Ministerio Avivando el Fuego predica y que su academia enseña, con la Palabra de Dios como única autoridad final.",
  articulos: [
    {
      n: 1,
      titulo: "Las Sagradas Escrituras",
      texto:
        "La Biblia, el Antiguo y el Nuevo Testamento, es la Palabra de Dios inspirada por el Espíritu Santo, sin error en lo que enseña y suficiente para la fe y la conducta. Es la autoridad final de todo lo que creemos y hacemos.",
      refs: ["2 Timoteo 3:16-17", "2 Pedro 1:20-21", "Salmos 119:105"],
    },
    {
      n: 2,
      titulo: "El único Dios verdadero",
      texto:
        "Hay un solo Dios, eterno, santo y todopoderoso, Creador de todas las cosas, que existe eternamente en tres personas: el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria.",
      refs: ["Deuteronomio 6:4", "Mateo 28:19", "2 Corintios 13:14"],
    },
    {
      n: 3,
      titulo: "El Señor Jesucristo",
      texto:
        "Jesucristo es el Hijo eterno de Dios, verdadero Dios y verdadero hombre. Fue concebido por el Espíritu Santo y nació de la virgen María; vivió sin pecado, hizo milagros, murió en la cruz en nuestro lugar, resucitó corporalmente al tercer día, subió al cielo y está sentado a la diestra del Padre, donde intercede por nosotros.",
      refs: ["Juan 1:1", "Juan 1:14", "Mateo 1:18-23", "1 Corintios 15:3-4", "Hebreos 4:15", "Hebreos 7:25"],
    },
    {
      n: 4,
      titulo: "El Espíritu Santo",
      texto:
        "El Espíritu Santo es una persona divina. Convence al mundo de pecado, de justicia y de juicio; hace nacer de nuevo al que cree, vive en el creyente, lo guía a toda verdad, lo santifica y le da poder para servir.",
      refs: ["Juan 16:7-13", "Romanos 8:9-16", "Hechos 1:8"],
    },
    {
      n: 5,
      titulo: "El ser humano y el pecado",
      texto:
        "Dios creó al ser humano, hombre y mujer, a su imagen. Por la desobediencia de Adán el pecado entró en el mundo, y con él la muerte; todos pecaron y están separados de Dios, sin poder salvarse a sí mismos.",
      refs: ["Génesis 1:26-27", "Romanos 3:23", "Romanos 5:12"],
    },
    {
      n: 6,
      titulo: "La salvación",
      texto:
        "La salvación es un regalo de Dios: solo por gracia, por medio de la fe en Jesucristo, y no por obras. Quien se arrepiente y cree en Cristo nace de nuevo, es perdonado, justificado y adoptado como hijo de Dios, y puede tener la seguridad de la vida eterna por las promesas de su Palabra.",
      refs: ["Efesios 2:8-9", "Juan 3:3-7", "Hechos 3:19", "Romanos 10:9-10", "1 Juan 5:11-13"],
      aConfirmar:
        "La perseverancia: si el creyente que se aparta de la fe de manera definitiva puede perder la salvación (lo que enseñan las Asambleas de Dios) o si quien nació de nuevo nunca la pierde. Las lecciones del Nivel 1 enseñan la seguridad basada en las promesas de Dios y no entran en esta pregunta.",
    },
    {
      n: 7,
      titulo: "La santificación",
      texto:
        "La voluntad de Dios es que sus hijos vivan en santidad. En Cristo el creyente ya fue apartado para Dios, y día a día crece a su imagen por la obra del Espíritu Santo, la Palabra, la oración y la obediencia.",
      refs: ["1 Tesalonicenses 4:3", "Hebreos 12:14", "2 Corintios 3:18", "Romanos 6:11-13"],
    },
    {
      n: 8,
      titulo: "Las ordenanzas de la iglesia",
      texto:
        "El Señor dejó a su iglesia dos ordenanzas. El bautismo en agua, por inmersión, de quienes se arrepintieron y creyeron, en el nombre del Padre, del Hijo y del Espíritu Santo, como testimonio de que murieron al pecado y resucitaron a una vida nueva. Y la Santa Cena, memorial de la muerte del Señor, comunión con Él y con su pueblo y anuncio de su venida, para los creyentes que se examinan a sí mismos.",
      refs: ["Mateo 28:19", "Romanos 6:4", "Hechos 2:38-41", "1 Corintios 11:23-29"],
    },
    {
      n: 9,
      titulo: "El bautismo en el Espíritu Santo",
      texto:
        "El bautismo en el Espíritu Santo es una promesa para todo creyente, distinta del nuevo nacimiento y que puede seguirlo. Da poder para testificar y servir, y en el libro de los Hechos va acompañado de hablar en otras lenguas, según el Espíritu da que se hable. Todo creyente debe buscarlo con fe.",
      refs: ["Hechos 1:8", "Hechos 2:4", "Hechos 2:38-39", "Hechos 10:44-46", "Hechos 19:6", "Lucas 11:13"],
      aConfirmar:
        "Si hablar en otras lenguas es la señal física inicial y necesaria del bautismo en el Espíritu (como enseñan las Asambleas de Dios) o una manifestación que se espera sin ser la única señal (como enseñan otras iglesias pentecostales).",
    },
    {
      n: 10,
      titulo: "Los dones del Espíritu",
      texto:
        "Los dones del Espíritu Santo siguen vigentes hoy. Dios los da para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, con orden y bajo la autoridad de la Palabra.",
      refs: ["1 Corintios 12:4-11", "1 Corintios 14:26-40", "Romanos 12:6-8", "1 Pedro 4:10"],
    },
    {
      n: 11,
      titulo: "La sanidad divina",
      texto:
        "Dios sana hoy en respuesta a la oración de fe. La sanidad del cuerpo es parte de la obra redentora de Cristo y se ministra con la oración y la unción con aceite. Buscar la sanidad de Dios no se opone a recibir atención médica.",
      refs: ["Isaías 53:4-5", "Mateo 8:16-17", "Santiago 5:14-16", "Marcos 16:17-18"],
      aConfirmar: "Si la sanidad está «provista en la expiación», como enseña el pentecostalismo clásico, o si se presenta solo como una promesa de Dios en respuesta a la oración.",
    },
    {
      n: 12,
      titulo: "La iglesia y su misión",
      texto:
        "La iglesia es el cuerpo de Cristo, formado por todos los que han creído en Él. La iglesia local se reúne para adorar, aprender la Palabra, tener comunión, orar, servir y anunciar el evangelio. Su misión es la gran comisión: id por todo el mundo y predicad el evangelio a toda criatura.",
      refs: ["Mateo 16:18", "Efesios 1:22-23", "Hechos 2:42-47", "Marcos 16:15-16", "Mateo 28:19-20"],
    },
    {
      n: 13,
      titulo: "El ministerio",
      texto:
        "Cristo da a su iglesia apóstoles, profetas, evangelistas, pastores y maestros para capacitar a los creyentes para la obra del ministerio. Todo creyente es llamado a servir con sus dones, y quienes dirigen deben cumplir los requisitos de carácter que pide la Palabra.",
      refs: ["Efesios 4:11-13", "1 Timoteo 3:1-13", "Tito 1:5-9", "1 Pedro 5:1-4"],
      aConfirmar: "El ministerio de la mujer: si puede ejercer el pastorado y la predicación, como reconocen muchas iglesias pentecostales, o con qué límites.",
    },
    {
      n: 14,
      titulo: "El matrimonio y la familia",
      texto:
        "Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida, y la familia como el lugar donde se ama, se enseña la fe y se forma a los hijos.",
      refs: ["Génesis 2:24", "Mateo 19:4-6", "Efesios 5:22-33", "Hebreos 13:4", "Deuteronomio 6:6-7"],
    },
    {
      n: 15,
      titulo: "El avivamiento",
      texto:
        "Dios sigue derramando su Espíritu. Creemos en el avivamiento: la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor, y que alcanza con poder a los perdidos. Lo buscamos con oración, con arrepentimiento y con obediencia a la Palabra.",
      refs: ["Hechos 2:17-21", "Habacuc 3:2", "2 Crónicas 7:14", "Hechos 3:19"],
    },
    {
      n: 16,
      titulo: "La venida de Cristo",
      texto:
        "Jesucristo volverá personal y visiblemente, como fue visto ir al cielo. Su venida es la esperanza de la iglesia: los muertos en Cristo resucitarán, y los creyentes que vivan serán transformados y estarán siempre con el Señor.",
      refs: ["Hechos 1:11", "1 Tesalonicenses 4:16-17", "1 Corintios 15:51-52", "Tito 2:13"],
      aConfirmar: "El orden de los últimos tiempos: si se enseña el arrebatamiento de la iglesia antes de la gran tribulación y un reino de mil años de Cristo en la tierra, como enseñan las Asambleas de Dios.",
    },
    {
      n: 17,
      titulo: "El juicio final y la eternidad",
      texto:
        "Habrá un juicio final. Los que recibieron a Cristo vivirán para siempre con Dios en los cielos nuevos y la tierra nueva, y los que lo rechazaron sufrirán la separación eterna de Dios.",
      refs: ["Juan 5:28-29", "Mateo 25:46", "Apocalipsis 20:11-15", "Apocalipsis 21:1-4"],
    },
  ] satisfies ArticuloFe[],
} as const;

/** Los puntos que el Ministerio debe confirmar antes de aprobarla. */
export const PUNTOS_A_CONFIRMAR = DECLARACION_FE.articulos.filter((a): a is (typeof DECLARACION_FE.articulos)[number] & { aConfirmar: string } => "aConfirmar" in a);

/** La clave de su aprobación (en la tabla de aprobaciones del contenido). */
export const ID_DECLARACION = "declaracion-de-fe";
