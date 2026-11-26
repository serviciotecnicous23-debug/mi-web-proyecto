/**
 * Las prácticas de «Familia y relaciones» (Nivel 2). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n2-familia.ts), con la guía de docs/academia-practicas.md.
 * Lo delicado se dice con las palabras de la lección: la autoridad nunca justifica el control ni la violencia, quien
 * sufre violencia busca protección y ayuda (el pastor, la familia y, si hace falta, las autoridades), y cada caso de
 * divorcio o de nuevo matrimonio se trata con el pastor.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N2_FAMILIA: PracticasMateria = {
  materia: "n2-familia",
  mision: {
    titulo: "La casa que Dios edifica",
    intro: "Tu hermano menor se va a casar y te pide consejo para empezar bien su hogar: qué diseñó Dios, cómo amarse y respetarse, cómo criar a los hijos, cómo cuidar las amistades y la pureza, y qué hacer cuando lleguen los conflictos. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes explicar el diseño de Dios para la familia, el amor y el respeto en el matrimonio, la crianza en el Señor, el valor de la soltería y de la amistad, la pureza, el perdón y cuándo buscar ayuda.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El diseño de Dios para la familia
    "n2-familia-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dijo Dios antes de crear a la mujer?", reverso: "Que no es bueno que el hombre esté solo.", apoyo: "Dios dijo: «No es bueno que el hombre esté solo»" },
              { frente: "¿Qué quiere decir ayuda idónea?", reverso: "Una compañera que le corresponde, igual en dignidad.", apoyo: "Creó a la mujer como ayuda idónea, es decir, una compañera que le corresponde, igual en dignidad." },
              { frente: "¿A imagen de quién fueron creados el hombre y la mujer?", reverso: "A imagen de Dios: los dos.", apoyo: "Hombre y mujer fueron creados a imagen de Dios (Génesis 1:27)." },
              { frente: "En Génesis 2:24, ¿qué quiere decir dejar?", reverso: "Que el matrimonio forma un hogar nuevo, distinto del de los padres.", apoyo: "Dejar: el matrimonio forma un hogar nuevo, distinto del de los padres." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué creó Dios antes de que hubiera gobiernos, escuelas o iglesias?", reverso: "Una familia.", apoyo: "Antes de que hubiera gobiernos, escuelas o iglesias, Dios creó una familia." },
              { frente: "En Génesis 2:24, ¿qué quiere decir unirse?", reverso: "Hacer un pacto de fidelidad, no un contrato que se rompe cuando conviene.", apoyo: "Unirse: es un pacto de fidelidad, no un contrato que se rompe cuando conviene." },
              { frente: "¿Adónde volvió Jesús cuando le preguntaron por el matrimonio?", reverso: "A los primeros capítulos de la Biblia, donde está el diseño de Dios.", apoyo: "En los primeros capítulos de la Biblia está su diseño, y Jesús volvió a ellos cuando le preguntaron por el matrimonio." },
              { frente: "¿A qué familias ama Dios?", reverso: "A todas, y quiere ser el centro de cada una.", apoyo: "Dios ama a todas y quiere ser el centro de cada una" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el diseño de Dios en Génesis 2, del primer paso al último.",
            pasos: [
              "Dios dice que no es bueno que el hombre esté solo",
              "Dios crea a la mujer como ayuda idónea",
              "El hombre y la mujer dejan a sus padres",
              "El hombre y la mujer se unen en un pacto de fidelidad",
              "Los dos llegan a ser una sola carne",
            ],
            apoyo: "Dios diseñó el matrimonio como un pacto de por vida entre un hombre y una mujer, que dejan a sus padres, se unen y son una sola carne",
            ref: "Génesis 2:18, 24",
            explica: "Dios creó a la mujer como compañera del hombre. En el matrimonio, los dos dejan a sus padres, se unen en un pacto y son una sola carne.",
          },
          {
            consigna: "Ordena el diseño de Dios para el matrimonio en Génesis 2, del primer paso al último.",
            pasos: [
              "Dios crea a la mujer, una compañera igual en dignidad",
              "Dejar: los esposos forman un hogar nuevo",
              "Unirse: los esposos hacen un pacto de fidelidad",
              "Ser una sola carne: una unión completa para toda la vida",
            ],
            apoyo: "Dejar: el matrimonio forma un hogar nuevo, distinto del de los padres.",
            ref: "Génesis 2:18, 24",
            explica: "Génesis 2:24 dice primero dejar, después unirse y al final ser una sola carne: un hogar nuevo, un pacto de fidelidad y una unión para toda la vida.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseñó Jesús sobre el matrimonio en Mateo 19.",
            texto: "Jesús citó el principio: el [[Creador]] los hizo varón y hembra, y los dos serán una sola [[carne]]. El matrimonio es un [[pacto]] entre un hombre y una mujer delante de Dios.",
            distractores: ["gobierno", "mente", "contrato"],
            errores: {
              gobierno: "No fue un gobierno: antes de que hubiera gobiernos, escuelas o iglesias, Dios creó una familia.",
              mente: "Jesús dijo una sola carne: una unión completa, también física, para toda la vida.",
              contrato: "No es un contrato que se rompe cuando conviene: es un pacto de fidelidad.",
            },
            apoyo: "Jesús citó el principio: el Creador los hizo varón y hembra, y los dos serán una sola carne.",
            ref: "Mateo 19:4-6",
            explica: "Jesús volvió al diseño de Génesis: el Creador hizo al hombre y a la mujer, y el matrimonio es un pacto delante de Dios.",
          },
          {
            consigna: "Completa lo que hizo y enseñó Jesús cuando le preguntaron por el matrimonio.",
            texto: "Cuando le preguntaron por el matrimonio, Jesús volvió a los primeros capítulos de la [[Biblia]] y [[confirmó]] el diseño de Dios. Enseñó que es [[Dios]] quien junta al esposo y a la esposa.",
            distractores: ["iglesia", "cambió", "Moisés"],
            errores: {
              iglesia: "Jesús volvió a Génesis: los primeros capítulos de la Biblia, donde está el diseño de Dios.",
              cambió: "Jesús no cambió el diseño: lo confirmó y volvió al principio.",
              Moisés: "Jesús dijo: «lo que Dios juntó, no lo separe el hombre».",
            },
            apoyo: "En los primeros capítulos de la Biblia está su diseño, y Jesús volvió a ellos cuando le preguntaron por el matrimonio.",
            ref: "Mateo 19:4-6",
            explica: "Jesús no trajo otro diseño: volvió a Génesis y lo confirmó. Lo que Dios juntó, el hombre no lo debe separar.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la familia en el plan de Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios creó una familia antes de que hubiera gobiernos, escuelas o iglesias.", verdad: true, explica: "La familia viene del principio: es parte del diseño de Dios.", apoyo: "Antes de que hubiera gobiernos, escuelas o iglesias, Dios creó una familia.", ref: "Génesis 2:18" },
              { texto: "Dios solo ama a las familias que tienen padre y madre.", verdad: false, explica: "Dios ama a todas las familias: también a las de una madre o un padre solo, a los abuelos que crían nietos y a los hogares mezclados.", apoyo: "Dios ama a todas y quiere ser el centro de cada una" },
              { texto: "Un hogar fuerte se construye con Dios en el centro.", verdad: true, explica: "Un hogar fuerte no se encuentra hecho: se construye, y Dios quiere ser su centro.", apoyo: "Un hogar fuerte no se encuentra: se construye con Dios en el centro." },
            ],
          },
          {
            consigna: "Sobre la familia en el plan de Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La familia es un regalo de Dios y un lugar para servirle.", verdad: true, explica: "Dios creó la familia desde el principio y quiere ser el centro de cada una.", apoyo: "Reconocer que la familia es un regalo de Dios y un lugar para servirle." },
              { texto: "Un hogar fuerte se encuentra hecho; no hace falta construirlo.", verdad: false, explica: "Un hogar fuerte no se encuentra: se construye, y se construye con Dios en el centro.", apoyo: "Un hogar fuerte no se encuentra: se construye con Dios en el centro." },
              { texto: "Si una familia no es como el diseño, la gracia de Dios ya no la acompaña.", verdad: false, explica: "El diseño muestra el camino, y la gracia de Dios acompaña a todas las familias.", apoyo: "el diseño muestra el camino y su gracia acompaña a todos" },
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
            caso: "Tu vecina, que cría sola a sus dos hijos, te dice: Mi familia no es como la de la Biblia; seguro que Dios no la quiere.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: el diseño de Dios es otro, y tu familia quedó fuera de él.", explica: "Dios ama a todas las familias: el diseño muestra el camino y su gracia acompaña a todos." },
              { texto: "Dios ama a tu familia y quiere ser su centro; su gracia los acompaña.", bien: true, explica: "Es lo que dice la lección: Dios ama a todas las familias y quiere ser el centro de cada una." },
              { texto: "No te preocupes: Dios no se fija en las familias, solo en cada persona.", explica: "Dios sí se fija en las familias: quiere ser el centro de cada una." },
              { texto: "Lo importante es que tú vayas a la iglesia; tu casa es otro asunto.", explica: "Dios no quiere quedarse en la iglesia: quiere ser el centro de cada hogar." },
            ],
            apoyo: "Dios ama a todas y quiere ser el centro de cada una: el diseño muestra el camino y su gracia acompaña a todos.",
            explica: "Hay familias de muchas formas. Dios ama a todas, quiere ser el centro de cada una y su gracia acompaña a todos.",
          },
          {
            caso: "Un compañero de trabajo, recién casado, te dice: Ya tenemos casa y trabajo; Dios es para el domingo.",
            pregunta: "¿Qué le respondes con cariño?",
            opciones: [
              { texto: "Tienes razón: con una casa y un buen trabajo, el hogar ya está fuerte y seguro.", explica: "Un hogar fuerte no se encuentra hecho: se construye con Dios en el centro." },
              { texto: "Esperen a tener hijos; entonces sí pongan a Dios en el centro.", explica: "Dios quiere ser el centro de cada familia desde ahora, no más adelante." },
              { texto: "Un hogar fuerte se construye con Dios en el centro, no solo el domingo.", bien: true, explica: "Es lo que enseña la lección: un hogar fuerte se construye con Dios en el centro." },
              { texto: "Mejor no hablen de Dios en casa, y así se evitan las discusiones.", explica: "Dejar a Dios fuera de la casa no fortalece el hogar: Dios quiere ser su centro." },
            ],
            apoyo: "Un hogar fuerte no se encuentra: se construye con Dios en el centro.",
            explica: "La familia es un lugar para servir a Dios todos los días. Un hogar fuerte se construye con Dios en el centro.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús citó el principio: el Creador los hizo varón y hembra, y los dos serán una sola carne.",
            ref: "Mateo 19:4-6",
            clave: {
              id: "pr-n2-familia-1-a6-1",
              tipo: "corta",
              pregunta: "¿Qué enseñó Jesús sobre el matrimonio en Mateo 19?",
              ideas: [
                { id: "principio", peso: 50, texto: "Volvió al principio: Dios los hizo varón y hembra, y los dos son una sola carne.", formas: ["principio", "genesis", "varon y hembra", "una sola carne", "sola carne", "diseno de dios", "confirmo el diseno"] },
                { id: "no-separe", peso: 50, texto: "Lo que Dios juntó, no lo separe el hombre: es un pacto delante de Dios.", formas: ["no separ*", "nadie separ*", "no romp*", "nadie romp*", "dios junto", "dios (los|lo|nos) junto", "dios (une|unio|junta)", "pacto delante de dios", "pacto de por vida", "toda la vida", "de por vida", "para siempre"] },
              ],
              modelo: "Jesús volvió al principio: el Creador los hizo varón y hembra, y los dos serán una sola carne. Y añadió que lo que Dios juntó, no lo separe el hombre: el matrimonio es un pacto delante de Dios.",
            },
          },
          {
            apoyo: "El matrimonio es un pacto entre un hombre y una mujer delante de Dios.",
            ref: "Mateo 19:6",
            clave: {
              id: "pr-n2-familia-1-a6-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir «lo que Dios juntó, no lo separe el hombre»?",
              ideas: [
                { id: "dios-une", peso: 50, texto: "Es Dios quien une al esposo y a la esposa en un pacto.", formas: ["dios (une|unio|junta|junto)", "dios quien (une|unio|junta|junto)", "dios es el que (une|unio|junta|junto)", "(une|unio|junta|junto) dios", "obra de dios", "delante de dios", "pacto"] },
                { id: "no-romper", peso: 50, texto: "Nadie debe romper ese pacto: es para toda la vida.", formas: ["toda la vida", "de por vida", "para siempre", "no separ*", "nadie separ*", "no romp*", "nadie romp*", "no es un contrato"] },
              ],
              modelo: "Quiere decir que es Dios quien une al esposo y a la esposa en una sola carne. Por eso nadie debe separar lo que Él juntó: el matrimonio es un pacto para toda la vida.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. El matrimonio: amor y respeto
    "n2-familia-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué actitud para todos los creyentes empieza Efesios 5:21?", reverso: "Someterse unos a otros en el temor de Dios.", apoyo: "Todo empieza con una actitud para todos los creyentes: someterse «unos a otros en el temor de Dios»." },
              { frente: "¿Con qué medida pide Pablo que el esposo ame a su esposa?", reverso: "Con el amor de Cristo, que amó a la iglesia y se entregó por ella.", apoyo: "Al esposo se le pide amar a su esposa «así como Cristo amó a la iglesia, y se entregó a sí mismo por ella»." },
              { frente: "¿Qué hizo Cristo con los pies de sus discípulos?", reverso: "Los lavó: así mostró una autoridad que sirve.", apoyo: "La autoridad que la Biblia le da es para servir, cuidar y entregarse, como Cristo, que lavó los pies de sus discípulos." },
              { frente: "¿Qué pide Pedro a los maridos en 1 Pedro 3:7?", reverso: "Vivir con sus esposas sabiamente, dándoles honor.", apoyo: "Y Pedro pide a los maridos vivir con sus esposas sabiamente, dándoles honor, como coherederas de la gracia de la vida (1 Pedro 3:7)." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué medida usa Pablo para hablar del matrimonio?", reverso: "El amor de Cristo por su iglesia.", apoyo: "Pablo escribe sobre el matrimonio con una medida altísima: el amor de Cristo por su iglesia." },
              { frente: "¿El matrimonio es una lista de derechos?", reverso: "No: es un llamado a servir al otro.", apoyo: "No es una lista de derechos, sino un llamado a servir al otro." },
              { frente: "¿Para qué es la autoridad que la Biblia da al esposo?", reverso: "Para servir, cuidar y entregarse, como Cristo, que lavó los pies de sus discípulos.", apoyo: "La autoridad que la Biblia le da es para servir, cuidar y entregarse, como Cristo, que lavó los pies de sus discípulos." },
              { frente: "¿Quién gana en el matrimonio?", reverso: "Quien sirve más, no quien manda más.", apoyo: "En el matrimonio gana quien sirve más, no quien manda más." },
              { frente: "¿Qué se le pide a la esposa en Efesios 5?", reverso: "Respetar a su marido y sujetarse a él como al Señor.", apoyo: "A la esposa se le pide respetar a su marido y sujetarse a él como al Señor (Efesios 5:22)." },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué pide Efesios 5 a cada uno? Elige cómo se une el matrimonio cristiano con cada idea.",
            nodos: [
              { id: "m", texto: "El matrimonio cristiano", x: 50, y: 50 },
              { id: "s", texto: "Someterse unos a otros", x: 50, y: 12 },
              { id: "e", texto: "Amar como Cristo amó a la iglesia", x: 24, y: 86 },
              { id: "r", texto: "Respetar al marido", x: 76, y: 86 },
            ],
            enlaces: [
              { de: "m", a: "s", relacion: "pide a los dos" },
              { de: "m", a: "e", relacion: "pide al esposo" },
              { de: "m", a: "r", relacion: "pide a la esposa" },
            ],
            distractores: ["da permiso para controlar", "es una lista de derechos"],
            apoyo: "El matrimonio cristiano se vive en sumisión mutua: el esposo ama a su esposa como Cristo amó a la iglesia, con una autoridad que sirve, y la esposa lo respeta",
            ref: "Efesios 5:21, 25, 33",
            explica: "Todo empieza con someterse unos a otros. En el matrimonio se vive de dos maneras que se complementan: el esposo ama como Cristo y la esposa respeta.",
          },
          {
            consigna: "¿Qué modelo da Pablo al esposo? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "e", texto: "El esposo", x: 20, y: 15 },
              { id: "a", texto: "La esposa", x: 80, y: 15 },
              { id: "c", texto: "Cristo", x: 20, y: 85 },
              { id: "i", texto: "La iglesia", x: 80, y: 85 },
            ],
            enlaces: [
              { de: "e", a: "c", relacion: "ama a su esposa como" },
              { de: "c", a: "i", relacion: "se entregó por" },
              { de: "a", a: "e", relacion: "lo respeta" },
            ],
            distractores: ["la domina y la controla"],
            apoyo: "Al esposo se le pide amar a su esposa «así como Cristo amó a la iglesia, y se entregó a sí mismo por ella».",
            ref: "Efesios 5:25, 33",
            explica: "El modelo del esposo es Cristo, que amó a la iglesia y se entregó por ella. A la esposa se le pide respetar a su marido.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es autoridad que sirve o control que domina? Lleva cada frase a su grupo.",
            grupos: ["Autoridad que sirve", "Control que domina"],
            frases: [
              { texto: "Cuidar a su esposa y entregarse por ella", grupo: 0 },
              { texto: "Servir como Cristo, que lavó los pies de sus discípulos", grupo: 0 },
              { texto: "Vivir con su esposa sabiamente, dándole honor", grupo: 0 },
              { texto: "Humillar a su esposa delante de otros", grupo: 1, explica: "Ser cabeza del hogar no da permiso para humillar." },
              { texto: "Controlarla porque él es la cabeza del hogar", grupo: 1, explica: "La autoridad nunca justifica el control." },
              { texto: "Usar golpes o gritos para imponerse", grupo: 1, explica: "La violencia física o verbal es pecado." },
            ],
            apoyo: "Ser cabeza del hogar no da permiso para controlar, humillar ni golpear.",
            ref: "Efesios 5:25; 1 Pedro 3:7",
            explica: "La autoridad que la Biblia da al esposo es para servir, cuidar y entregarse. Ser cabeza del hogar no da permiso para controlar, humillar ni golpear.",
          },
          {
            consigna: "¿Así es la autoridad que sirve o el control que domina? Lleva cada frase a su grupo.",
            grupos: ["Así es la autoridad que sirve", "Así es el control que domina"],
            frases: [
              { texto: "Entregarse por su familia, como Cristo por la iglesia", grupo: 0 },
              { texto: "Ponerse de acuerdo en el dinero y el tiempo", grupo: 0 },
              { texto: "Hablar con respeto, aun en los desacuerdos", grupo: 0 },
              { texto: "Revisarle el teléfono y decidir a quién puede ver", grupo: 1, explica: "Eso es controlar, y ser cabeza del hogar no da permiso para controlar." },
              { texto: "Burlarse de ella y hacerla sentir menos", grupo: 1, explica: "Humillar no es autoridad: es control que domina." },
              { texto: "Amenazarla para que obedezca", grupo: 1, explica: "La violencia verbal también es pecado." },
            ],
            apoyo: "La autoridad que la Biblia le da es para servir, cuidar y entregarse, como Cristo, que lavó los pies de sus discípulos.",
            ref: "Efesios 5:25",
            explica: "Quien sirve se pone de acuerdo, habla con respeto y se entrega. Quien domina controla, humilla o amenaza: eso nunca es autoridad bíblica.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una amiga de la iglesia te escribe: Mi esposo me grita y a veces me empuja. Dice que la Biblia lo hace la cabeza.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Ora por él y aguanta en silencio todo lo que puedas; con el tiempo y con tu oración, Dios lo va a cambiar.", explica: "Orar es bueno, pero Dios no pide a nadie que se quede en peligro: quien sufre violencia debe buscar protección y ayuda." },
              { texto: "Dios no te pide quedarte en peligro. Busca protección: el pastor, tu familia y, si hace falta, las autoridades.", bien: true, explica: "Es lo que enseña la lección: la violencia es pecado, y quien la sufre debe buscar protección y ayuda." },
              { texto: "Eso es algo privado de tu matrimonio; mejor no se lo cuentes a nadie, para no avergonzarlo delante de los demás.", explica: "La violencia no se esconde: quien la sufre debe buscar protección y ayuda." },
              { texto: "Él es la cabeza del hogar, así que debes obedecerle y sujetarte a él, aunque te trate de esa manera tan dura.", explica: "Ser cabeza del hogar no da permiso para controlar, humillar ni golpear. La violencia es pecado." },
            ],
            apoyo: "La violencia física, verbal o sexual es pecado, y quien la sufre debe buscar protección y ayuda: el pastor, la familia y, si hace falta, las autoridades (Romanos 13:4).",
            ref: "Romanos 13:4",
            explica: "La autoridad nunca justifica la violencia. Quien la sufre busca protección y ayuda: Dios no pide a nadie que se quede en peligro.",
          },
          {
            caso: "Un amigo recién casado te dice: Yo soy la cabeza; por eso reviso el teléfono de mi esposa y decido a quién puede ver.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Haces bien: si eres la cabeza del hogar, te toca vigilar todo lo que ella hace y con quién habla.", explica: "Ser cabeza del hogar no da permiso para controlar." },
              { texto: "Ser cabeza no es controlar: la autoridad que da la Biblia es para servir, cuidar y entregarse.", bien: true, explica: "Distingue la autoridad que sirve del control que domina, como enseña Efesios 5." },
              { texto: "Eso es asunto tuyo; cada matrimonio decide cómo se maneja, y nadie tiene por qué opinar.", explica: "La Biblia sí habla del tema: la autoridad del esposo es para servir, no para dominar." },
              { texto: "Haces bien, pero hazlo sin que ella se dé cuenta, así no se enoja ni pelean por eso.", explica: "Esconder el control no lo arregla: ser cabeza del hogar no da permiso para controlar." },
            ],
            apoyo: "Ser cabeza del hogar no da permiso para controlar, humillar ni golpear.",
            ref: "Efesios 5:25",
            explica: "La autoridad que la Biblia da al esposo es para servir, cuidar y entregarse, como Cristo. Nunca justifica el control.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada situación de pareja con el principio bíblico que la ayuda.",
            pares: [
              ["Discuten cada mes por los gastos", "Ponerse de acuerdo en el dinero, la crianza y el tiempo"],
              ["Cada uno ora solo, por su lado", "Orar juntos y leer la Biblia juntos"],
              ["Un desacuerdo termina en gritos", "Hablar con respeto, aun en los desacuerdos"],
              ["Ayer se hirieron y hoy no se hablan", "Pedir perdón y perdonar pronto"],
            ],
            apoyo: "Ponerse de acuerdo en el dinero, la crianza y el tiempo.",
            ref: "Efesios 4:29",
            explica: "Los principios bíblicos se viven en lo diario: orar juntos, hablar con respeto, ponerse de acuerdo y perdonar pronto.",
          },
          {
            consigna: "Une cada situación de pareja con el principio bíblico que le corresponde.",
            pares: [
              ["No se ponen de acuerdo en cómo criar a los hijos", "Ponerse de acuerdo en el dinero, la crianza y el tiempo"],
              ["Una amistad del trabajo se vuelve demasiado cercana", "Cuidar la intimidad y la fidelidad"],
              ["Casi nunca abren juntos la Palabra", "Orar juntos y leer la Biblia juntos"],
              ["Uno de los dos ofendió al otro esta mañana", "Pedir perdón y perdonar pronto"],
            ],
            apoyo: "Cuidar la intimidad y la fidelidad (1 Corintios 7:3-5).",
            ref: "1 Corintios 7:3-5",
            explica: "Ponerse de acuerdo, cuidar la fidelidad, orar juntos y perdonar pronto: así se aplica la Biblia en la vida diaria en pareja.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Al esposo se le pide amar a su esposa «así como Cristo amó a la iglesia, y se entregó a sí mismo por ella».",
            ref: "Efesios 5:25, 33",
            clave: {
              id: "pr-n2-familia-2-a6-1",
              tipo: "corta",
              pregunta: "¿Qué pide Efesios 5 al esposo y qué pide a la esposa?",
              ideas: [
                { id: "esposo", peso: 50, texto: "Al esposo, amar a su esposa como Cristo amó a la iglesia y se entregó por ella.", formas: ["como cristo", "se entrego", "entregarse", "dar su vida", "amar* a su (esposa|mujer)", "ama* a su (esposa|mujer)", "amor de cristo"] },
                { id: "esposa", peso: 50, texto: "A la esposa, respetar a su marido.", formas: ["respet*"] },
              ],
              modelo: "Efesios 5 pide al esposo amar a su esposa así como Cristo amó a la iglesia y se entregó por ella, con una autoridad que sirve. A la esposa le pide respetar a su marido.",
            },
          },
          {
            apoyo: "El matrimonio cristiano se vive en sumisión mutua: el esposo ama a su esposa como Cristo amó a la iglesia, con una autoridad que sirve, y la esposa lo respeta",
            ref: "Efesios 5:21",
            clave: {
              id: "pr-n2-familia-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué quiere decir que el matrimonio cristiano se vive en sumisión mutua?",
              ideas: [
                { id: "todos", peso: 40, texto: "Los dos se someten unos a otros en el temor de Dios.", formas: ["unos a otros", "uno al otro", "los dos", "ambos", "entre (ellos|si)"] },
                { id: "esposo", peso: 30, texto: "El esposo ama a su esposa como Cristo, con una autoridad que sirve.", formas: ["como cristo", "se entrega", "se entrego", "autoridad que sirve", "sirve", "servir", "ama* a su (esposa|mujer)"] },
                { id: "esposa", peso: 30, texto: "La esposa respeta a su marido.", formas: ["respet*"] },
              ],
              modelo: "Quiere decir que los dos se someten unos a otros en el temor de Dios: el esposo ama a su esposa como Cristo amó a la iglesia, con una autoridad que sirve, y la esposa lo respeta.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Padres e hijos
    "n2-familia-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Se hereda la fe como el apellido?", reverso: "No: se transmite con palabras y con ejemplo.", apoyo: "La fe no se hereda como el apellido: se transmite con palabras y con ejemplo." },
              { frente: "¿Cuál es la primera escuela de los hijos?", reverso: "El hogar: Dios se la encargó a los padres.", apoyo: "Dios encargó a los padres la primera escuela de sus hijos: el hogar." },
              { frente: "¿Qué pide Dios a los padres antes de enseñar a sus hijos?", reverso: "Que sus palabras estén primero en el corazón de ellos.", apoyo: "Dios pide que sus palabras estén primero en el corazón de los padres" },
              { frente: "¿De qué aprenden más los hijos?", reverso: "De lo que ven, más que de lo que oyen.", apoyo: "Los hijos aprenden más de lo que ven que de lo que oyen." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde se enseña la fe, según Deuteronomio 6?", reverso: "En la vida diaria, no solo en la iglesia.", apoyo: "La fe se enseña en la vida diaria, no solo en la iglesia." },
              { frente: "¿Qué mandamiento es el primero con promesa?", reverso: "Honrar a los padres.", apoyo: "Los hijos: obedecer a sus padres en el Señor y honrarlos; es el primer mandamiento con promesa." },
              { frente: "¿Cómo provocan a ira los padres a sus hijos?", reverso: "Con dureza, burlas o injusticia.", apoyo: "Los padres: no provocar a ira a sus hijos con dureza, burlas o injusticia." },
              { frente: "¿Cómo se cría «en disciplina y amonestación del Señor»?", reverso: "Con amor, límites claros y corrección sin violencia.", apoyo: "Los padres: criarlos «en disciplina y amonestación del Señor», con amor, límites claros y corrección sin violencia." },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Deuteronomio 6:7",
            consigna: "¿Dónde se enseña la fe, según este pasaje? Toca los dos lugares.",
            texto: "estando en tu [[casa]], y andando por el [[camino]], y al acostarte, y cuando te levantes",
            apoyo: "La fe se enseña en la vida diaria, no solo en la iglesia.",
            explica: "La fe se enseña en la vida diaria: en la casa y por el camino, no solo en la iglesia.",
          },
          {
            ref: "Deuteronomio 6:7",
            consigna: "¿En qué momentos del día se enseña la fe? Toca las dos palabras que los dicen.",
            texto: "estando en tu casa, y andando por el camino, y al [[acostarte]], y cuando te [[levantes]]",
            apoyo: "Dios pide que sus palabras estén primero en el corazón de los padres y que las repitan a sus hijos",
            explica: "Desde que se levantan hasta que se acuestan, los padres repiten a sus hijos las palabras de Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se cría en el Señor o así se provoca a ira? Lleva cada frase a su grupo.",
            grupos: ["Así se cría en el Señor", "Así se provoca a ira a los hijos"],
            frases: [
              { texto: "Poner límites claros, con amor", grupo: 0 },
              { texto: "Corregir sin violencia", grupo: 0 },
              { texto: "Enseñar la Palabra en la vida diaria", grupo: 0 },
              { texto: "Burlarse de los errores de un hijo", grupo: 1, explica: "Las burlas provocan a ira a los hijos." },
              { texto: "Corregir con dureza y a gritos", grupo: 1, explica: "La dureza provoca a ira; la corrección del Señor es con amor y sin violencia." },
              { texto: "Castigar a un hijo con injusticia", grupo: 1, explica: "La injusticia provoca a ira a los hijos." },
            ],
            apoyo: "Los padres: no provocar a ira a sus hijos con dureza, burlas o injusticia.",
            ref: "Efesios 6:4",
            explica: "Criar en el Señor es con amor, límites claros y corrección sin violencia. La dureza, las burlas y la injusticia provocan a ira.",
          },
          {
            consigna: "¿Esto es criar en el Señor o provocar a ira? Lleva cada frase a su grupo.",
            grupos: ["Criar en el Señor", "Provocar a ira a los hijos"],
            frases: [
              { texto: "Pedir perdón a un hijo cuando uno se equivoca", grupo: 0, explica: "Los hijos aprenden cuando ven a sus padres pedir perdón." },
              { texto: "Dar límites claros", grupo: 0 },
              { texto: "Corregir con amor, sin violencia", grupo: 0 },
              { texto: "Ridiculizar a un hijo delante de sus amigos", grupo: 1, explica: "Las burlas provocan a ira." },
              { texto: "Corregir con violencia", grupo: 1, explica: "La corrección del Señor es sin violencia." },
              { texto: "Ser injusto con un hijo y justo con otro", grupo: 1, explica: "La injusticia provoca a ira a los hijos." },
            ],
            apoyo: "Los padres: criarlos «en disciplina y amonestación del Señor», con amor, límites claros y corrección sin violencia.",
            ref: "Efesios 6:4",
            explica: "Disciplina y amonestación del Señor: amor, límites claros y corrección sin violencia. Lo contrario provoca a ira a los hijos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que la Biblia pide a los hijos.",
            texto: "Los hijos deben [[obedecer]] a sus padres en el Señor y [[honrarlos]]. Honrar a los padres es el primer [[mandamiento]] con promesa.",
            distractores: ["ignorar", "juzgarlos", "consejo"],
            errores: { consejo: "Honrar a los padres no es solo un consejo: es el primer mandamiento con promesa." },
            apoyo: "Los hijos: obedecer a sus padres en el Señor y honrarlos; es el primer mandamiento con promesa.",
            ref: "Efesios 6:1-3",
            explica: "Dios pide a los hijos obedecer a sus padres en el Señor y honrarlos: es el primer mandamiento con promesa.",
          },
          {
            consigna: "Completa lo que dice la lección sobre los hijos.",
            texto: "Los hijos obedecen a sus padres en el [[Señor]] y los [[honran]]. Ese es el primer mandamiento con [[promesa]].",
            distractores: ["miedo", "olvidan", "castigo"],
            errores: {
              miedo: "La Biblia dice que los hijos obedecen a sus padres en el Señor.",
              castigo: "Honrar a los padres es el primer mandamiento con promesa.",
            },
            apoyo: "los hijos obedecen y honran a sus padres en el Señor",
            ref: "Efesios 6:1-3",
            explica: "Obedecer y honrar a los padres en el Señor es lo que la Biblia pide a los hijos, y es el primer mandamiento con promesa.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas ideas para enseñar la fe en casa está equivocada. Tócala.",
            frases: [
              "Orar juntos antes de comer y al acostarse.",
              "Leer una historia de la Biblia por semana.",
              "Dejar la enseñanza de la fe solo para la iglesia.",
              "Contar en casa cómo Dios ha respondido.",
            ],
            malo: 2,
            correccion: "La fe se enseña en la vida diaria, no solo en la iglesia.",
            apoyo: "La fe se enseña en la vida diaria, no solo en la iglesia.",
            ref: "Deuteronomio 6:6-7",
            explica: "La iglesia ayuda, pero Dios encargó a los padres la primera escuela de sus hijos: el hogar.",
          },
          {
            consigna: "Una de estas frases sobre enseñar la fe en casa está equivocada. Tócala.",
            frases: [
              "Servir juntos a alguien enseña la fe.",
              "Los hijos aprenden más de lo que oyen que de lo que ven.",
              "Es bueno que los hijos vean a sus padres pedir perdón.",
              "Orar juntos al acostarse es una forma de enseñar la fe.",
            ],
            malo: 1,
            correccion: "Los hijos aprenden más de lo que ven que de lo que oyen.",
            apoyo: "Los hijos aprenden más de lo que ven que de lo que oyen.",
            explica: "El ejemplo enseña: los hijos aprenden más de lo que ven en casa que de lo que oyen.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un papá nuevo en la iglesia te dice: Quiero enseñarle la fe a mi hija, pero no sé por dónde empezar.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Espera a que ella crezca; ahora es muy pequeña para entender de Dios.", explica: "La fe se enseña en la vida diaria desde ahora: el hogar es la primera escuela." },
              { texto: "Empieza con algo sencillo: oren juntos antes de comer y al acostarse.", bien: true, explica: "Es una de las ideas de la lección para enseñar la fe en casa." },
              { texto: "Llévala a la iglesia; allá le enseñan, y en casa no hace falta más.", explica: "La fe se enseña en la vida diaria, no solo en la iglesia." },
              { texto: "Primero estudia teología varios años; después ya podrás enseñarle algo.", explica: "No hace falta esperar: orar juntos, leer una historia bíblica y contar lo que Dios ha hecho ya enseña la fe." },
            ],
            apoyo: "Orar juntos antes de comer y al acostarse, leer una historia de la Biblia por semana, contar cómo Dios ha respondido, servir juntos a alguien y dejar que los hijos vean a sus padres pedir perdón.",
            explica: "Las cosas sencillas de cada día enseñan la fe: orar juntos, leer una historia de la Biblia y contar cómo Dios ha respondido.",
          },
          {
            caso: "Tu hermana, mamá de dos niños, te dice: Ayer les grité a mis hijos y me siento mal. ¿Qué hago ahora?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "No les digas nada; si les pides perdón a tus hijos, pierdes autoridad.", explica: "Los hijos aprenden cuando ven a sus padres pedir perdón: eso también enseña la fe." },
              { texto: "Olvídalo: los niños se olvidan rápido y no aprenden nada de esas cosas.", explica: "Los hijos aprenden más de lo que ven que de lo que oyen." },
              { texto: "Pídeles perdón: así ven a sus padres pedir perdón y aprenden la fe.", bien: true, explica: "Es lo que enseña la lección: los hijos aprenden al ver a sus padres pedir perdón." },
              { texto: "Cómprales un regalo, así se arregla todo sin tener que hablar del tema.", explica: "Lo que enseña la fe es que vean a sus padres pedir perdón, no taparlo con un regalo." },
            ],
            apoyo: "dejar que los hijos vean a sus padres pedir perdón",
            explica: "Pedir perdón a los hijos también enseña la fe: ellos aprenden más de lo que ven que de lo que oyen.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los padres: criarlos «en disciplina y amonestación del Señor», con amor, límites claros y corrección sin violencia.",
            ref: "Efesios 6:4",
            clave: {
              id: "pr-n2-familia-3-a7-1",
              tipo: "corta",
              pregunta: "¿Qué quiere decir criar a los hijos «en disciplina y amonestación del Señor»?",
              ideas: [
                { id: "amor", peso: 50, texto: "Criarlos con amor y con límites claros.", formas: ["amor", "limites", "con carino"] },
                { id: "sin-violencia", peso: 50, texto: "Corregir sin violencia y sin provocarlos a ira.", formas: ["sin violencia", "sin dureza", "sin burlas", "sin gritos", "sin golpes", "sin provocar*", "no provoc*", "no violen*"] },
              ],
              modelo: "Quiere decir criarlos con amor y con límites claros, corrigiendo sin violencia y sin provocarlos a ira con dureza, burlas o injusticia. Así los padres enseñan la fe en la vida diaria.",
            },
          },
          {
            apoyo: "La fe no se hereda como el apellido: se transmite con palabras y con ejemplo.",
            clave: {
              id: "pr-n2-familia-3-a7-2",
              tipo: "corta",
              pregunta: "¿Por qué se dice que la fe no se hereda como el apellido?",
              ideas: [
                { id: "transmite", peso: 50, texto: "La fe se transmite con palabras y con ejemplo.", formas: ["con palabras", "ejemplo", "se transmite", "transmit*", "se ensena"] },
                { id: "padres", peso: 50, texto: "Dios encargó a los padres enseñarla: el hogar es la primera escuela.", formas: ["primera escuela", "el hogar", "en (la|su) casa", "los padres", "vida diaria", "primeros maestros"] },
              ],
              modelo: "Porque la fe no pasa sola de padres a hijos: se transmite con palabras y con ejemplo. Por eso Dios encargó a los padres la primera escuela de sus hijos, que es el hogar.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. La soltería y la amistad
    "n2-familia-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿La vida cristiana empieza el día de la boda?", reverso: "No: Jesús y Pablo fueron solteros.", apoyo: "La vida cristiana no empieza el día de la boda." },
              { frente: "Según Pablo, ¿de qué puede tener cuidado el soltero?", reverso: "De las cosas del Señor, con menos distracciones.", apoyo: "Pablo enseña que el soltero puede tener cuidado «de las cosas del Señor» con menos distracciones." },
              { frente: "¿Qué es la soltería, si no es una sala de espera?", reverso: "Una etapa, o un llamado, para servir a Dios con libertad.", apoyo: "La soltería no es una vida incompleta ni una sala de espera: es una etapa, o un llamado, para servir a Dios con libertad" },
              { frente: "Además de la soltería, ¿qué otra cosa valora la Biblia como regalo de Dios?", reverso: "La amistad.", apoyo: "la Biblia valora la soltería y la amistad como regalos de Dios" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quiénes fueron solteros, según la lección?", reverso: "Jesús y Pablo.", apoyo: "Jesús y Pablo fueron solteros" },
              { frente: "¿La soltería es una vida incompleta?", reverso: "No: es un regalo para servir al Señor con libertad.", apoyo: "La soltería es un regalo para servir al Señor con libertad, no una vida incompleta" },
              { frente: "¿Qué ventaja tiene el soltero, según 1 Corintios 7?", reverso: "Puede ocuparse de las cosas del Señor con menos distracciones.", apoyo: "Pablo enseña que el soltero puede tener cuidado «de las cosas del Señor» con menos distracciones." },
              { frente: "¿La soltería puede ser un llamado de Dios?", reverso: "Sí: puede ser una etapa o un llamado para servir a Dios.", apoyo: "es una etapa, o un llamado, para servir a Dios con libertad (1 Corintios 7:7)" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la soltería según 1 Corintios 7: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La soltería es una sala de espera hasta que llegue la boda.", verdad: false, explica: "No es una sala de espera: es una etapa, o un llamado, para servir a Dios con libertad.", apoyo: "La soltería no es una vida incompleta ni una sala de espera", ref: "1 Corintios 7:7" },
              { texto: "El soltero puede ocuparse de las cosas del Señor con menos distracciones.", verdad: true, explica: "Es lo que enseña Pablo: el soltero puede tener cuidado de las cosas del Señor.", apoyo: "Pablo enseña que el soltero puede tener cuidado «de las cosas del Señor» con menos distracciones.", ref: "1 Corintios 7:32-35" },
              { texto: "Jesús y Pablo fueron solteros.", verdad: true, explica: "La vida cristiana no empieza el día de la boda: Jesús y Pablo fueron solteros.", apoyo: "Jesús y Pablo fueron solteros" },
            ],
          },
          {
            consigna: "Sobre la soltería según 1 Corintios 7: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Una persona soltera tiene una vida cristiana incompleta.", verdad: false, explica: "La soltería es un regalo para servir al Señor con libertad, no una vida incompleta.", apoyo: "La soltería es un regalo para servir al Señor con libertad, no una vida incompleta" },
              { texto: "La vida cristiana empieza el día de la boda.", verdad: false, explica: "La vida cristiana no empieza el día de la boda: Jesús y Pablo fueron solteros.", apoyo: "La vida cristiana no empieza el día de la boda." },
              { texto: "La Biblia valora la soltería como un regalo de Dios.", verdad: true, explica: "La Biblia valora la soltería y la amistad como regalos de Dios.", apoyo: "la Biblia valora la soltería y la amistad como regalos de Dios" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa las marcas de una amistad bíblica.",
            texto: "El amigo ama en [[todo]] tiempo, también en la angustia. El amigo verdadero nos [[afila]]: nos anima y nos corrige con amor. Jesús llamó amigos a sus discípulos y dio su [[vida]] por ellos.",
            distractores: ["buen", "adula", "palabra"],
            errores: {
              buen: "El amigo no ama solo cuando todo va bien: ama en todo tiempo, también en la angustia.",
              adula: "El amigo verdadero nos afila: nos anima y nos corrige con amor.",
              palabra: "Jesús dio su vida por sus amigos.",
            },
            apoyo: "El amigo verdadero nos afila: nos anima y nos corrige con amor.",
            ref: "Proverbios 17:17; 27:17; Juan 15:13",
            explica: "La amistad bíblica ama en todo tiempo y nos afila, y se parece a la de Jesús, que dio su vida por sus amigos.",
          },
          {
            consigna: "Completa lo que la lección dice de la amistad.",
            texto: "Jesús llamó [[amigos]] a sus discípulos y dio su vida por ellos. El amigo verdadero nos anima y nos [[corrige]] con [[amor]].",
            distractores: ["siervos", "humilla", "dureza"],
            errores: {
              siervos: "Jesús llamó amigos a sus discípulos y dio su vida por ellos.",
              dureza: "El amigo verdadero nos corrige con amor.",
            },
            apoyo: "Jesús llamó amigos a sus discípulos y dio su vida por ellos (Juan 15:13-15).",
            ref: "Juan 15:13-15; Proverbios 27:17",
            explica: "Jesús es el modelo del amigo: llamó amigos a sus discípulos y dio su vida por ellos. El amigo verdadero anima y corrige con amor.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Esta compañía te ayuda a seguir a Cristo o te aleja de Él? Lleva cada frase a su grupo.",
            grupos: ["Me ayuda a seguir a Cristo", "Me aleja de Cristo"],
            frases: [
              { texto: "Me anima a orar cuando estoy mal", grupo: 0 },
              { texto: "Me corrige con amor cuando fallo", grupo: 0 },
              { texto: "Me acompaña en los momentos de angustia", grupo: 0 },
              { texto: "Me presiona a hacer lo que no agrada a Dios", grupo: 1 },
              { texto: "Sus malas conversaciones dañan mis costumbres", grupo: 1, explica: "Las malas conversaciones corrompen las buenas costumbres." },
              { texto: "Se burla de mi fe delante de otros", grupo: 1 },
            ],
            apoyo: "las compañías más cercanas deben ayudarnos a seguir a Cristo",
            ref: "1 Corintios 15:33; Proverbios 27:17",
            explica: "Las malas conversaciones corrompen las buenas costumbres. Las compañías más cercanas deben ayudarnos a seguir a Cristo.",
          },
          {
            consigna: "¿Es un criterio bíblico para elegir amigos o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Criterio bíblico", "No es un criterio bíblico"],
            frases: [
              { texto: "Que mis amigos más cercanos compartan mi fe", grupo: 0 },
              { texto: "Que mi pareja comparta la fe en Cristo", grupo: 0 },
              { texto: "Tener amigos que no conocen a Cristo y ser luz para ellos", grupo: 0 },
              { texto: "Alejarme de todos los que no conocen a Cristo", grupo: 1, explica: "Se puede tener amigos que no conocen a Cristo y ser luz para ellos." },
              { texto: "Elegir pareja sin importar si comparte la fe", grupo: 1, explica: "Los amigos más cercanos y la pareja deben compartir la fe." },
              { texto: "Pensar que las compañías no influyen en mí", grupo: 1, explica: "Dime con quién andas y te diré hacia dónde vas." },
            ],
            apoyo: "Se puede tener amigos que no conocen a Cristo y ser luz para ellos, pero los amigos más cercanos y la pareja deben compartir la fe (2 Corintios 6:14).",
            ref: "2 Corintios 6:14",
            explica: "Podemos ser luz para los amigos que no conocen a Cristo, pero los más cercanos y la pareja deben compartir la fe.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Tu primo de 19 años te dice: Me gusta una chica que no cree en Dios; total, después ella va a cambiar.",
            pregunta: "¿Qué le aconsejas con cariño?",
            opciones: [
              { texto: "Adelante: el amor lo cambia todo, y con el tiempo ella va a creer en Dios.", explica: "Los amigos más cercanos y la pareja deben compartir la fe." },
              { texto: "Puedes ser luz para ella, pero tu pareja debe compartir tu fe en Cristo.", bien: true, explica: "Une las dos cosas de la lección: ser luz para quien no conoce a Cristo y elegir una pareja que comparta la fe." },
              { texto: "No le vuelvas a hablar: con alguien que no cree no se puede ni ser amigo.", explica: "Se puede tener amigos que no conocen a Cristo y ser luz para ellos." },
              { texto: "Lo de la fe es secundario; lo importante es que se lleven bien juntos.", explica: "La Biblia pide que la pareja comparta la fe (2 Corintios 6:14)." },
            ],
            apoyo: "los amigos más cercanos y la pareja deben compartir la fe",
            ref: "2 Corintios 6:14",
            explica: "Podemos ser luz para quien no conoce a Cristo, pero la pareja debe compartir la fe.",
          },
          {
            caso: "Una amiga de la universidad te dice: Mis amigos de siempre se burlan de mi fe y me invitan a cosas que no quiero hacer.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Haz lo que ellos hacen de vez en cuando, para que no te dejen sola.", explica: "Las malas conversaciones corrompen las buenas costumbres." },
              { texto: "Busca amigos cercanos que te afilen en la fe, y sigue siendo luz.", bien: true, explica: "Las compañías más cercanas deben ayudarnos a seguir a Cristo, y podemos ser luz para los demás." },
              { texto: "Aléjate de todos y no tengas amigos que no sean de la iglesia.", explica: "Se puede tener amigos que no conocen a Cristo y ser luz para ellos." },
              { texto: "No pasa nada; las compañías no cambian a nadie que tenga fe.", explica: "Dime con quién andas y te diré hacia dónde vas: las compañías importan." },
            ],
            apoyo: "Las malas conversaciones corrompen las buenas costumbres (1 Corintios 15:33).",
            ref: "1 Corintios 15:33",
            explica: "Las compañías importan: los amigos más cercanos deben ayudarnos a seguir a Cristo, y podemos ser luz para los demás.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El amigo ama en todo tiempo, también en la angustia.",
            ref: "Proverbios 17:17; 27:17",
            clave: {
              id: "pr-n2-familia-4-a6-1",
              tipo: "corta",
              pregunta: "¿Cómo es un amigo verdadero según la Biblia?",
              ideas: [
                { id: "siempre", peso: 50, texto: "Ama en todo tiempo, también en la angustia.", formas: ["todo tiempo", "angustia", "en las malas", "en todo momento", "momentos dificiles", "ama siempre", "siempre (esta|ama|acompan*)", "(esta|acompan*) siempre"] },
                { id: "afila", peso: 50, texto: "Nos afila: nos anima y nos corrige con amor.", formas: ["afila", "anima", "corrig*", "correccion"] },
              ],
              modelo: "Un amigo verdadero ama en todo tiempo, también en la angustia. Además nos afila: nos anima y nos corrige con amor, como Jesús, que dio su vida por sus amigos.",
            },
          },
          {
            apoyo: "Jesús llamó amigos a sus discípulos y dio su vida por ellos (Juan 15:13-15).",
            ref: "Juan 15:13-15",
            clave: {
              id: "pr-n2-familia-4-a6-2",
              tipo: "corta",
              pregunta: "¿En qué se parece la amistad bíblica a la amistad de Jesús con sus discípulos?",
              ideas: [
                { id: "jesus", peso: 50, texto: "Jesús llamó amigos a sus discípulos y dio su vida por ellos.", formas: ["(dio|da|dar|entrego) (la|su) vida", "llamo amigos", "se entrego"] },
                { id: "ama", peso: 50, texto: "El amigo verdadero ama en todo tiempo y nos afila con amor.", formas: ["todo tiempo", "angustia", "en las malas", "en todo momento", "momentos dificiles", "ama siempre", "siempre (esta|ama|acompan*)", "(esta|acompan*) siempre", "afila", "anima", "corrig*"] },
              ],
              modelo: "Jesús llamó amigos a sus discípulos y dio su vida por ellos. Así es la amistad bíblica: ama en todo tiempo, también en la angustia, y nos anima y nos corrige con amor.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. La pureza sexual
    "n2-familia-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo llamó Dios a la sexualidad que creó?", reverso: "Buena, dentro del matrimonio.", apoyo: "Dios creó la sexualidad y la llamó buena, dentro del matrimonio." },
              { frente: "¿Qué hace el mundo con la sexualidad?", reverso: "La trivializa.", apoyo: "El mundo la trivializa; la Biblia la honra y la protege." },
              { frente: "¿Qué hace la Biblia con la sexualidad?", reverso: "La honra y la protege.", apoyo: "El mundo la trivializa; la Biblia la honra y la protege." },
              { frente: "¿Cuál es la voluntad de Dios, según 1 Tesalonicenses 4:3?", reverso: "Nuestra santificación: que nos apartemos de la fornicación.", apoyo: "La voluntad de Dios es nuestra santificación: «que os apartéis de fornicación»." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hizo José ante la mujer de Potifar?", reverso: "Huyó.", apoyo: "José huyó de la mujer de Potifar (Génesis 39:12)" },
              { frente: "¿Qué es el cuerpo del creyente?", reverso: "Templo del Espíritu Santo, comprado por precio.", apoyo: "El cuerpo del creyente es templo del Espíritu Santo, comprado por precio." },
              { frente: "¿Cómo debe vivir cada uno, según 1 Tesalonicenses 4?", reverso: "En santidad y honor, «no en pasión de concupiscencia».", apoyo: "Cada uno debe vivir en santidad y honor, «no en pasión de concupiscencia»." },
              { frente: "¿Qué es la pureza, además de decir no?", reverso: "Decir sí a algo mejor.", apoyo: "La pureza no es solo decir no: es decir sí a algo mejor." },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Por qué Dios llama a la pureza? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "d", texto: "Dios", x: 20, y: 15 },
              { id: "s", texto: "La sexualidad", x: 80, y: 15 },
              { id: "m", texto: "El matrimonio", x: 80, y: 85 },
              { id: "c", texto: "El cuerpo del creyente", x: 20, y: 85 },
              { id: "t", texto: "Templo del Espíritu Santo", x: 45, y: 50 },
            ],
            enlaces: [
              { de: "d", a: "s", relacion: "la creó y la llamó buena" },
              { de: "s", a: "m", relacion: "tiene su lugar en" },
              { de: "c", a: "t", relacion: "es" },
            ],
            distractores: ["la trivializa"],
            apoyo: "Dios creó la sexualidad para el matrimonio y llama a la pureza: huir de la fornicación, honrar el cuerpo como templo del Espíritu, cuidar los ojos y poner límites",
            ref: "1 Corintios 6:19-20; Hebreos 13:4",
            explica: "Dios creó la sexualidad buena y para el matrimonio, y el cuerpo del creyente es templo del Espíritu Santo: por eso Dios llama a la pureza.",
          },
          {
            consigna: "¿Cómo ven la sexualidad el mundo y la Biblia? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "w", texto: "El mundo", x: 20, y: 15 },
              { id: "b", texto: "La Biblia", x: 80, y: 15 },
              { id: "s", texto: "La sexualidad", x: 50, y: 50 },
              { id: "m", texto: "El matrimonio", x: 50, y: 88 },
            ],
            enlaces: [
              { de: "w", a: "s", relacion: "la trivializa" },
              { de: "b", a: "s", relacion: "la honra y la protege" },
              { de: "s", a: "m", relacion: "es buena dentro del" },
            ],
            distractores: ["la considera mala"],
            apoyo: "El mundo la trivializa; la Biblia la honra y la protege.",
            ref: "Hebreos 13:4",
            explica: "El mundo trivializa la sexualidad; la Biblia la honra y la protege, porque Dios la creó buena dentro del matrimonio.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cuida la pureza o la pone en riesgo? Lleva cada frase a su grupo.",
            grupos: ["Cuida la pureza", "Pone en riesgo la pureza"],
            frases: [
              { texto: "Cuidar lo que se mira", grupo: 0 },
              { texto: "Poner límites claros en el noviazgo", grupo: 0 },
              { texto: "Rendir cuentas a alguien de confianza", grupo: 0 },
              { texto: "Llenar la mente de lo que es puro", grupo: 0 },
              { texto: "Buscar a propósito situaciones de tentación", grupo: 1, explica: "La lección pide evitar las situaciones de tentación." },
              { texto: "Ver pornografía a escondidas", grupo: 1, explica: "La pornografía daña el corazón y las relaciones." },
              { texto: "Guardar las luchas en secreto, sin contarle a nadie", grupo: 1, explica: "Ayuda tener a alguien de confianza a quien rendir cuentas." },
            ],
            apoyo: "Poner límites claros en el noviazgo y evitar las situaciones de tentación.",
            ref: "Mateo 5:28; Filipenses 4:8",
            explica: "La pureza se cuida con los ojos, con límites claros, rindiendo cuentas a alguien de confianza y llenando la mente de lo que es puro.",
          },
          {
            consigna: "¿Esto ayuda a cuidar la pureza o no? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a cuidar la pureza", "No ayuda a cuidar la pureza"],
            frases: [
              { texto: "Evitar quedarse a solas en situaciones de tentación", grupo: 0 },
              { texto: "Tener un amigo de confianza a quien rendir cuentas", grupo: 0 },
              { texto: "Elegir con cuidado lo que se mira", grupo: 0 },
              { texto: "Pensar en lo que es puro", grupo: 0 },
              { texto: "Pensar que mirar pornografía no daña a nadie", grupo: 1, explica: "La pornografía daña el corazón y las relaciones." },
              { texto: "Un noviazgo sin ningún límite", grupo: 1, explica: "La lección pide poner límites claros en el noviazgo." },
              { texto: "Quedarse cerca de la tentación en vez de huir", grupo: 1, explica: "José huyó de la tentación, y Pablo dice: «Huid de la fornicación»." },
            ],
            apoyo: "Cuidar lo que se mira: la pornografía daña el corazón y las relaciones (Mateo 5:28).",
            ref: "Mateo 5:28; 1 Corintios 6:18",
            explica: "Cuidar los ojos, poner límites, rendir cuentas y llenar la mente de lo puro: así se cuida la pureza en la vida diaria.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la restauración está equivocada. Tócala.",
            frases: [
              "Si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos.",
              "Quien cae en pecado sexual queda descalificado para siempre.",
              "Romper con lo que nos hace caer es parte de empezar de nuevo.",
              "Buscar ayuda pastoral es un paso de la restauración.",
            ],
            malo: 1,
            correccion: "Si has caído, no estás descalificado para siempre: Dios perdona y restaura.",
            apoyo: "Si has caído, no estás descalificado para siempre.",
            ref: "1 Juan 1:9",
            explica: "Dios es fiel y justo para perdonar y limpiar a quien confiesa: hay restauración.",
          },
          {
            consigna: "Una de estas frases sobre empezar de nuevo está equivocada. Tócala.",
            frases: [
              "Dios perdona y limpia a quien confiesa su pecado.",
              "Para empezar de nuevo hay que esconder la caída y no contarla a nadie.",
              "La gracia de Dios permite empezar de nuevo.",
              "Quien cae puede buscar ayuda pastoral.",
            ],
            malo: 1,
            correccion: "Busca ayuda pastoral, rompe con lo que te hace caer y empieza de nuevo con su gracia.",
            apoyo: "Busca ayuda pastoral, rompe con lo que te hace caer y empieza de nuevo con su gracia.",
            ref: "1 Juan 1:9",
            explica: "La restauración no se esconde: se confiesa a Dios, se busca ayuda y se empieza de nuevo con su gracia.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven del grupo te escribe: Volví a caer con la pornografía. Ya no sirvo para Dios; mejor dejo la iglesia.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Tienes razón: quien cae tantas veces ya no tiene lugar en la iglesia de Dios.", explica: "Si has caído, no estás descalificado para siempre: hay restauración." },
              { texto: "No estás descalificado: confiésalo a Dios, busca ayuda y empieza de nuevo.", bien: true, explica: "Es el camino de la restauración: confesar, buscar ayuda pastoral, romper con lo que hace caer y empezar de nuevo." },
              { texto: "No es para tanto: casi todos lo hacen, así que no tienes que dejar nada.", explica: "La pornografía daña el corazón y las relaciones: hay que romper con lo que te hace caer." },
              { texto: "Promete con fuerza no volver a hacerlo y no se lo cuentes a nadie más.", explica: "Busca ayuda pastoral: ayuda tener a alguien de confianza a quien rendir cuentas." },
            ],
            apoyo: "Si has caído, no estás descalificado para siempre.",
            ref: "1 Juan 1:9",
            explica: "Dios es fiel y justo para perdonar y limpiar. Se busca ayuda pastoral, se rompe con lo que hace caer y se empieza de nuevo con su gracia.",
          },
          {
            caso: "Una amiga te dice: Mi novio y yo cruzamos los límites. Siento que Dios ya no me va a perdonar.",
            pregunta: "¿Qué le respondes con amor?",
            opciones: [
              { texto: "Ya está hecho; ahora da igual, sigan así porque ya no hay ninguna vuelta atrás.", explica: "Siempre se puede empezar de nuevo con la gracia de Dios: hay que romper con lo que hace caer." },
              { texto: "Dios te va a perdonar cuando hayas sufrido lo suficiente por lo que hiciste.", explica: "La lección dice otra cosa: si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos." },
              { texto: "No le cuentes a nadie; con el tiempo se te va a olvidar y ya pasará.", explica: "Busca ayuda pastoral: la restauración no se esconde." },
              { texto: "Si lo confiesas, Dios te perdona y te limpia; busca ayuda y pongan límites.", bien: true, explica: "Une el perdón de Dios con los pasos de la lección: ayuda pastoral y límites claros." },
            ],
            apoyo: "Si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos (1 Juan 1:9).",
            ref: "1 Juan 1:9",
            explica: "A quien cae, Dios le ofrece perdón y restauración: se confiesa, se busca ayuda pastoral y se ponen límites claros.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios creó la sexualidad y la llamó buena, dentro del matrimonio.",
            ref: "1 Tesalonicenses 4:3-5; 1 Corintios 6:18-20",
            clave: {
              id: "pr-n2-familia-5-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué Dios llama a la pureza sexual?",
              ideas: [
                { id: "matrimonio", peso: 50, texto: "Dios creó la sexualidad buena, para el matrimonio.", formas: ["matrimonio", "la llamo buena", "es buena", "dios (creo|hizo|diseno)"] },
                { id: "santidad", peso: 50, texto: "Su voluntad es nuestra santificación, y el cuerpo es templo del Espíritu Santo.", formas: ["santifica*", "santidad", "templo", "por precio", "espiritu santo", "voluntad de dios"] },
              ],
              modelo: "Porque Dios creó la sexualidad y la llamó buena dentro del matrimonio. Además, su voluntad es nuestra santificación, y el cuerpo del creyente es templo del Espíritu Santo, comprado por precio.",
            },
          },
          {
            apoyo: "El cuerpo del creyente es templo del Espíritu Santo, comprado por precio.",
            ref: "1 Corintios 6:19-20",
            clave: {
              id: "pr-n2-familia-5-a6-2",
              tipo: "corta",
              pregunta: "¿Qué significa que el cuerpo del creyente es templo del Espíritu Santo, comprado por precio?",
              ideas: [
                { id: "de-dios", peso: 50, texto: "El cuerpo pertenece a Dios: es su templo y fue comprado por precio.", formas: ["pertenece a dios", "es de dios", "le pertenece", "no es (mio|nuestro|tuyo|suyo)", "lugar santo", "dios vive", "habita"] },
                { id: "honrar", peso: 50, texto: "Por eso se vive en santidad y honor, y se huye de la fornicación.", formas: ["honr*", "honor", "huir", "huy*", "huimos", "santidad", "pureza", "apart*", "cuid* cuerpo"] },
              ],
              modelo: "Significa que el cuerpo del creyente le pertenece a Dios: es templo del Espíritu Santo y fue comprado por precio. Por eso vivimos en santidad y honor, y huimos de la fornicación.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. Perdón, conflictos y restauración en el hogar
    "n2-familia-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué pide Pablo que nos vistamos en Colosenses 3?", reverso: "De misericordia, humildad, mansedumbre y paciencia.", apoyo: "Pablo pide vestirse de misericordia, humildad, mansedumbre y paciencia" },
              { frente: "¿Hasta cuándo puede durar el enojo?", reverso: "No hasta el otro día: se arregla antes.", apoyo: "No dejar que el enojo dure hasta el otro día." },
              { frente: "Si todas las familias tienen conflictos, ¿en qué está la diferencia?", reverso: "En cómo se resuelven: con gritos y silencio, o con verdad, perdón y gracia.", apoyo: "La diferencia está en cómo se resuelven: con gritos y silencio, o con verdad, perdón y gracia." },
              { frente: "¿Qué cambia el perdón?", reverso: "No cambia el pasado, pero sí cambia el futuro.", apoyo: "El perdón no cambia el pasado, pero sí cambia el futuro." },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hay que hacer antes de responder?", reverso: "Escuchar.", apoyo: "Escuchar antes de responder (Santiago 1:19)." },
              { frente: "¿Cómo se pide perdón?", reverso: "Sin excusas, y se perdona de verdad.", apoyo: "Pedir perdón sin excusas y perdonar de verdad." },
              { frente: "En un conflicto, ¿se ataca a la persona?", reverso: "No: se habla del problema, sin atacar a la persona.", apoyo: "Hablar del problema, no atacar a la persona." },
              { frente: "¿Qué se hace cuando solos no se puede?", reverso: "Buscar ayuda.", apoyo: "Buscar ayuda cuando solos no se puede." },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Colosenses 3:13",
            consigna: "¿Quién es la medida de nuestro perdón? Toca la palabra.",
            texto: "De la manera que [[Cristo]] os perdonó, así también hacedlo vosotros",
            apoyo: "Los conflictos de familia se enfrentan con misericordia, verdad y perdón, como Cristo nos perdonó",
            explica: "Cristo es la medida: perdonamos a los de la casa de la manera que Él nos perdonó.",
          },
          {
            ref: "Colosenses 3:14",
            consigna: "¿Cómo llama Pablo al amor? Toca las dos palabras.",
            texto: "que es el [[vínculo]] [[perfecto]]",
            apoyo: "Y sobre todo, el amor, «que es el vínculo perfecto».",
            explica: "Sobre la misericordia, la humildad, la mansedumbre y la paciencia está el amor: Pablo lo llama el vínculo perfecto.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda a resolver el conflicto o lo empeora? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a resolver el conflicto", "Empeora el conflicto"],
            frases: [
              { texto: "Hablar del problema sin atacar a la persona", grupo: 0 },
              { texto: "Escuchar antes de responder", grupo: 0 },
              { texto: "Pedir perdón sin excusas", grupo: 0 },
              { texto: "Irse a dormir enojados y sin hablar", grupo: 1, explica: "La lección pide no dejar que el enojo dure hasta el otro día." },
              { texto: "Atacar a la persona en vez del problema", grupo: 1 },
              { texto: "Pedir perdón echándole la culpa al otro", grupo: 1, explica: "El perdón se pide sin excusas." },
            ],
            apoyo: "Hablar del problema, no atacar a la persona.",
            ref: "Efesios 4:26; Santiago 1:19",
            explica: "Los conflictos se resuelven con verdad, perdón y gracia: hablar del problema, escuchar, pedir perdón sin excusas y no dejar el enojo para el otro día.",
          },
          {
            consigna: "¿Así se resuelve un conflicto de familia o así se empeora? Lleva cada frase a su grupo.",
            grupos: ["Así se resuelve un conflicto", "Así se empeora un conflicto"],
            frases: [
              { texto: "Arreglarlo antes de que termine el día", grupo: 0, explica: "No dejar que el enojo dure hasta el otro día." },
              { texto: "Perdonar de verdad", grupo: 0 },
              { texto: "Buscar ayuda cuando solos no se puede", grupo: 0 },
              { texto: "Resolverlo con gritos y después con silencio", grupo: 1, explica: "La diferencia está en resolverlo con verdad, perdón y gracia, no con gritos y silencio." },
              { texto: "Responder antes de escuchar", grupo: 1, explica: "La lección pide escuchar antes de responder." },
              { texto: "Sacarle en cara al otro todos sus errores pasados", grupo: 1, explica: "Se habla del problema, no se ataca a la persona." },
            ],
            apoyo: "La diferencia está en cómo se resuelven: con gritos y silencio, o con verdad, perdón y gracia.",
            ref: "Colosenses 3:12-14; Efesios 4:26",
            explica: "Con misericordia, verdad y perdón, como Cristo nos perdonó: así se enfrentan los conflictos en la familia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que enseñó Jesús del divorcio: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Moisés permitió el divorcio por la dureza del corazón.", verdad: true, explica: "Así lo dijo Jesús, y añadió: «mas al principio no fue así».", apoyo: "Jesús dijo que Moisés permitió el divorcio por la dureza del corazón, «mas al principio no fue así».", ref: "Mateo 19:8" },
              { texto: "El divorcio fue parte del plan de Dios desde el principio.", verdad: false, explica: "Jesús dijo: «mas al principio no fue así». El divorcio nunca fue el plan de Dios.", apoyo: "El divorcio nunca fue el plan de Dios.", ref: "Mateo 19:8" },
              { texto: "Cada caso de divorcio se trata con el pastor, con la Biblia abierta y con mucha gracia.", verdad: true, explica: "La lección pide tratar cada caso de divorcio o de nuevo matrimonio con el pastor.", apoyo: "Cada caso de divorcio o de nuevo matrimonio se trata con el pastor, con la Biblia abierta y con mucha gracia." },
            ],
          },
          {
            consigna: "Sobre el divorcio y el consejo pastoral: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús menciona la fornicación como excepción.", verdad: true, explica: "Así lo enseña la lección sobre Mateo 19:9; Pablo también habla del creyente abandonado por un cónyuge que no cree. Cada caso se trata con el pastor.", apoyo: "Jesús menciona la fornicación como excepción", ref: "Mateo 19:9; 1 Corintios 7:15" },
              { texto: "Hablar con el pastor de un caso de divorcio es señal de fracaso.", verdad: false, explica: "Pedir ayuda no es fracasar: cada caso se trata con el pastor, con la Biblia abierta y con mucha gracia.", apoyo: "Pedir ayuda no es fracasar" },
              { texto: "Un caso de nuevo matrimonio se decide sin hablar con el pastor.", verdad: false, explica: "Cada caso de divorcio o de nuevo matrimonio se trata con el pastor, con la Biblia abierta y con mucha gracia.", apoyo: "Cada caso de divorcio o de nuevo matrimonio se trata con el pastor, con la Biblia abierta y con mucha gracia." },
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
            caso: "Tu compañera de trabajo te dice: En mi casa hay gritos, mi esposo bebe mucho y los niños tienen miedo.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Busca ayuda: el pastor, un consejero cristiano y, si hay peligro, las autoridades.", bien: true, explica: "Pedir ayuda no es fracasar: es lo que la familia necesita cuando hay adicciones, violencia o peligro." },
              { texto: "Aguanta por los niños; lo que pasa en una casa no se le cuenta a nadie que sea de afuera.", explica: "Cuando hay violencia o adicciones, la familia necesita ayuda: proteger a los niños es amar como Cristo." },
              { texto: "Espera un tiempo: seguro es una mala racha y se le va a pasar a él solito.", explica: "Cuando hay adicciones o un dolor que no se puede manejar, la familia necesita ayuda." },
              { texto: "Es un asunto de ustedes dos; los niños son pequeños y no se dan cuenta de nada.", explica: "Proteger a los que sufren, sobre todo a los niños, es parte de amar como Cristo." },
            ],
            apoyo: "Cuando hay violencia, adicciones o un dolor que no se puede manejar, la familia necesita ayuda: el pastor, un consejero cristiano y, si hay peligro, las autoridades.",
            explica: "Pedir ayuda no es fracasar. Proteger a los que sufren, sobre todo a los niños, es parte de amar como Cristo.",
          },
          {
            caso: "Una vecina te dice: De noche escucho golpes y gritos en la casa de al lado, y los niños lloran.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "No te metas: lo que pasa en otra casa no es asunto tuyo ni tampoco de la iglesia.", explica: "Proteger a los que sufren, sobre todo a los niños, es parte de amar como Cristo." },
              { texto: "Si hay peligro, avisa a las autoridades: proteger a los niños es amar como Cristo.", bien: true, explica: "Es lo que enseña la lección: si hay peligro, se busca a las autoridades, y proteger a los que sufren es amar como Cristo." },
              { texto: "Espera unas semanas a ver si se repite muchas veces, y entonces piensa si haces algo.", explica: "Si hay peligro, se busca ayuda y protección sin esperar." },
              { texto: "Solo ora por ellos desde tu casa; Dios se va a encargar sin que tengas que hacer nada más.", explica: "Orar es bueno, pero proteger a los que sufren, sobre todo a los niños, también es amar como Cristo." },
            ],
            apoyo: "Proteger a los que sufren, sobre todo a los niños, es parte de amar como Cristo.",
            explica: "Cuando hay violencia y peligro, se busca protección: las autoridades, el pastor y un consejero cristiano. Proteger a los niños es amar como Cristo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús dijo que Moisés permitió el divorcio por la dureza del corazón, «mas al principio no fue así».",
            ref: "Mateo 19:8-9",
            clave: {
              id: "pr-n2-familia-6-a6-1",
              tipo: "corta",
              pregunta: "¿Qué enseñó Jesús sobre el divorcio en Mateo 19?",
              ideas: [
                { id: "plan", peso: 50, texto: "El divorcio no fue el plan de Dios: al principio no fue así.", formas: ["no plan", "nunca plan", "no (diseno|voluntad|deseo|idea)", "nunca (diseno|voluntad|deseo|idea)", "principio no", "no (quiso|queria|planeo)", "no lo que dios"] },
                { id: "dureza", peso: 50, texto: "Moisés lo permitió por la dureza del corazón.", formas: ["dureza", "dur* (de|del) corazon", "corazon* dur*", "moises (permitio|dejo|permite|permitia|autorizo)", "moises lo (permitio|dejo|permite|permitia|autorizo)"] },
              ],
              modelo: "Jesús dijo que Moisés permitió el divorcio por la dureza del corazón, pero que al principio no fue así: el divorcio nunca fue el plan de Dios.",
            },
          },
          {
            apoyo: "Cada caso de divorcio o de nuevo matrimonio se trata con el pastor, con la Biblia abierta y con mucha gracia.",
            ref: "Mateo 19:8-9; 1 Corintios 7:15",
            clave: {
              id: "pr-n2-familia-6-a6-2",
              tipo: "corta",
              pregunta: "¿Qué dice la lección sobre el divorcio y cómo se trata cada caso?",
              ideas: [
                { id: "plan", peso: 50, texto: "El divorcio nunca fue el plan de Dios.", formas: ["no plan", "nunca plan", "no (diseno|voluntad|deseo|idea)", "nunca (diseno|voluntad|deseo|idea)", "principio no", "no (quiso|queria|planeo)", "no lo que dios"] },
                { id: "pastor", peso: 50, texto: "Cada caso se trata con el pastor, con la Biblia abierta y con mucha gracia.", formas: ["pastor", "biblia abierta", "con mucha gracia", "consejo pastoral"] },
              ],
              modelo: "El divorcio nunca fue el plan de Dios, aunque Jesús menciona la fornicación como excepción. Cada caso se trata con el pastor, con la Biblia abierta y con mucha gracia.",
            },
          },
        ],
      },
    ],
  },
};
