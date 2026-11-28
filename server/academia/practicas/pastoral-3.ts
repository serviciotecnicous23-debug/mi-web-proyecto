/**
 * Las prácticas de la materia `pastoral-3` (especialidad). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/pastoral-3.ts), con la guía de docs/academia-practicas.md.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_PASTORAL_3: PracticasMateria = {
  materia: "pastoral-3",
  mision: {
    titulo: "Un año presidiendo en tu iglesia",
    intro: "Este año vas a presidir en tu iglesia los momentos más importantes de la vida de su pueblo: el bautismo de los nuevos creyentes, la Santa Cena, la presentación de un bebé, la boda de una pareja en Texas y el funeral de un hermano fiel. Cada familia confía en que lo harás bien. Repasa las seis lecciones para tener listo cada paso: distinguir lo que el Señor mandó de lo que la iglesia celebra, preparar a las personas, cuidar los detalles y hacerlo todo con orden.",
    cierre: "Ya sabes presidir las ordenanzas y las ceremonias: distinguir lo que el Señor mandó de lo que la iglesia celebra, comparar con respeto cómo lo entienden otras iglesias, preparar a cada persona, dirigir cada momento con orden y reverencia y acompañar a las familias antes y después. Presidir una ordenanza es servir a la mesa del Señor, no lucirse en ella.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Ordenanzas y ceremonias
    "pastoral-3-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuántas son las ordenanzas, y cuáles son?", reverso: "Dos: el bautismo en agua y la Santa Cena.", apoyo: "Las ordenanzas son dos, el bautismo en agua y la Santa Cena" },
              { frente: "¿Por qué se llaman ordenanzas?", reverso: "Porque el Señor las ordenó.", apoyo: "Por eso se llaman ordenanzas: el Señor las ordenó" },
              { frente: "¿Qué tienen las ceremonias, aunque no tengan un mandato directo?", reverso: "Un fundamento bíblico.", apoyo: "no tienen un mandato directo, pero sí un fundamento bíblico" },
              { frente: "¿Para qué celebra la iglesia las ceremonias?", reverso: "Para bendecir y acompañar a las familias.", apoyo: "la iglesia las celebra para bendecir y acompañar a las familias" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué elementos de las ordenanzas no se cambian?", reverso: "El agua, el pan y la copa.", apoyo: "Las ordenanzas tienen elementos que no se cambian: el agua, el pan y la copa" },
              { frente: "¿A qué se adaptan las ceremonias?", reverso: "A la cultura y a cada familia, siempre que honren a Dios.", apoyo: "Las ceremonias se adaptan a la cultura y a cada familia, siempre que honren a Dios" },
              { frente: "¿Desde cuándo practicó la primera iglesia las ordenanzas?", reverso: "Desde el principio.", apoyo: "La primera iglesia las practicó desde el principio" },
              { frente: "¿El bautismo es una idea de la iglesia?", reverso: "No: es un mandato del Señor.", apoyo: "El bautismo no es una idea de la iglesia: es un mandato del Señor" },
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
            consigna: "¿Es una ordenanza o una ceremonia? Lleva cada frase a su grupo.",
            grupos: ["Ordenanza que el Señor mandó", "Ceremonia que celebra la iglesia"],
            frases: [
              { texto: "El bautismo en agua", grupo: 0 },
              { texto: "La Santa Cena", grupo: 0 },
              { texto: "Tiene un mandato directo del Señor", grupo: 0 },
              { texto: "Lleva elementos que no se cambian: agua, pan y copa", grupo: 0 },
              { texto: "La presentación de niños", grupo: 1 },
              { texto: "La boda", grupo: 1 },
              { texto: "El funeral", grupo: 1 },
              { texto: "Se adapta a la cultura y a cada familia", grupo: 1 },
            ],
            apoyo: "Las ordenanzas son dos, el bautismo en agua y la Santa Cena: el Señor las mandó, y la iglesia las celebra en todo tiempo y lugar",
            ref: "Mateo 28:19-20",
            explica: "Las ordenanzas son dos, el bautismo en agua y la Santa Cena: el Señor las mandó y sus elementos no se cambian. La presentación de niños, la boda y el funeral son ceremonias: tienen fundamento bíblico y se adaptan a la cultura y a cada familia.",
          },
          {
            consigna: "¿Es una ordenanza que el Señor mandó o una ceremonia de la iglesia? Lleva cada frase a su grupo.",
            grupos: ["Ordenanza", "Ceremonia"],
            frases: [
              { texto: "Bautizar a los que se arrepintieron y creyeron", grupo: 0 },
              { texto: "Partir el pan en memoria del Señor", grupo: 0 },
              { texto: "Se celebra en todo tiempo y lugar porque el Señor la mandó", grupo: 0 },
              { texto: "Dar gracias a Dios por un bebé ante la iglesia", grupo: 1 },
              { texto: "Casar a una pareja delante de Dios", grupo: 1 },
              { texto: "Despedir con esperanza a un hermano que murió", grupo: 1 },
              { texto: "Tiene fundamento bíblico, pero no un mandato directo", grupo: 1 },
            ],
            apoyo: "Las ceremonias, como la presentación de niños, la boda y el funeral, no tienen un mandato directo, pero sí un fundamento bíblico",
            ref: "1 Corintios 11:23-24",
            explica: "El bautismo y la Santa Cena son ordenanzas: el Señor las mandó, y la iglesia las celebra en todo tiempo y lugar. Presentar a un niño, casar a una pareja y despedir a un hermano son ceremonias, con fundamento bíblico pero sin un mandato directo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada iglesia con lo que dice la lección sobre cómo entiende las ordenanzas.",
            pares: [
              ["La Iglesia católica", "Cuenta siete sacramentos que comunican la gracia"],
              ["Las iglesias luteranas y reformadas", "Reconocen dos sacramentos, medios de gracia unidos a la Palabra"],
              ["La mayoría de las evangélicas y pentecostales", "Hablan de ordenanzas: actos de obediencia y de testimonio"],
              ["La Iglesia de Dios (Cleveland, Tennessee)", "Además del bautismo y la Cena, practica el lavatorio de pies"],
            ],
            apoyo: "La Iglesia católica cuenta siete sacramentos y enseña que comunican la gracia de Dios a quien los recibe",
            explica: "La Iglesia católica cuenta siete sacramentos; las luteranas y reformadas reconocen dos, como medios de gracia unidos a la Palabra; la mayoría de las evangélicas y pentecostales hablan de ordenanzas, y algunas, como la Iglesia de Dios, practican también el lavatorio de pies.",
          },
          {
            consigna: "¿Quién habla así del bautismo y de la Cena? Une cada idea con quienes la enseñan.",
            pares: [
              ["Siete sacramentos que comunican la gracia de Dios", "La Iglesia católica"],
              ["Dos sacramentos, como medios de gracia unidos a la Palabra", "Luteranos y reformados"],
              ["Ordenanzas: actos de obediencia y de testimonio que Cristo mandó", "La mayoría de evangélicos y pentecostales"],
            ],
            apoyo: "Las iglesias luteranas y reformadas reconocen dos sacramentos, el bautismo y la Cena, como medios de gracia unidos a la Palabra",
            explica: "La Iglesia católica cuenta siete sacramentos, que comunican la gracia; luteranos y reformados reconocen dos, como medios de gracia unidos a la Palabra; y la mayoría de evangélicos y pentecostales hablan de ordenanzas: actos de obediencia y de testimonio que Cristo mandó.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cómo entienden las iglesias las ordenanzas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La Iglesia católica cuenta siete sacramentos.", verdad: true, explica: "La Iglesia católica cuenta siete sacramentos y enseña que comunican la gracia de Dios a quien los recibe.", apoyo: "La Iglesia católica cuenta siete sacramentos" },
              { texto: "Las iglesias luteranas y reformadas reconocen siete sacramentos.", verdad: false, explica: "Las iglesias luteranas y reformadas reconocen dos sacramentos, el bautismo y la Cena, como medios de gracia unidos a la Palabra.", apoyo: "Las iglesias luteranas y reformadas reconocen dos sacramentos" },
              { texto: "La declaración de fe del ministerio reconoce dos ordenanzas: el bautismo en agua y la Santa Cena.", verdad: true, explica: "La declaración de fe reconoce dos ordenanzas: el bautismo en agua, por inmersión, de quienes se arrepintieron y creyeron, y la Santa Cena, memorial de la muerte del Señor (artículo 8).", apoyo: "La declaración de fe del Ministerio Avivando el Fuego reconoce dos ordenanzas" },
            ],
          },
          {
            consigna: "Sobre las ordenanzas en las distintas iglesias: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La mayoría de las iglesias evangélicas y pentecostales hablan de ordenanzas.", verdad: true, explica: "Hablan de ordenanzas: actos de obediencia y de testimonio que Cristo mandó.", apoyo: "La mayoría de las iglesias evangélicas y pentecostales hablan de ordenanzas" },
              { texto: "La declaración de fe del ministerio reconoce siete ordenanzas.", verdad: false, explica: "La declaración de fe del ministerio reconoce dos: el bautismo en agua y la Santa Cena.", apoyo: "la declaración de fe del ministerio reconoce dos" },
              { texto: "La Iglesia católica enseña que los sacramentos son solo actos de testimonio.", verdad: false, explica: "La Iglesia católica enseña que los sacramentos comunican la gracia de Dios a quien los recibe. Las que hablan de actos de obediencia y de testimonio son la mayoría de las iglesias evangélicas y pentecostales.", apoyo: "La Iglesia católica cuenta siete sacramentos y enseña que comunican la gracia de Dios" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace el pastor que preside.",
            texto: "El pastor que preside [[enseña]] el sentido de cada ordenanza y ceremonia, [[prepara]] a las personas, cuida los [[detalles]] y lleva un registro.",
            distractores: ["esconde", "apura", "aplausos"],
            errores: {
              esconde: "El pastor enseña el sentido de cada ordenanza y ceremonia: no lo deja escondido.",
              apura: "El pastor prepara a las personas con tiempo y con cuidado.",
              aplausos: "El pastor cuida los detalles, porque presidir es servir, no lucirse.",
            },
            apoyo: "El pastor que preside enseña el sentido de cada ordenanza y ceremonia, prepara a las personas, cuida los detalles y lleva un registro",
            ref: "1 Corintios 14:40",
            explica: "El pastor que preside enseña el sentido de cada ordenanza y ceremonia, prepara a las personas, cuida los detalles y lleva un registro: así se hace todo decentemente y con orden.",
          },
          {
            consigna: "Completa lo que pide la lección sobre el libro de la iglesia.",
            texto: "Lleva un libro de [[registro]] con los bautismos, las bodas y los funerales, porque sirve a las [[familias]] por muchos [[años]].",
            distractores: ["quejas", "visitas", "minutos"],
            errores: {
              quejas: "Es un libro de registro: los nombres, las fechas y quién ofició.",
              visitas: "Ese registro sirve a las familias por muchos años.",
              minutos: "El registro sirve a las familias por muchos años.",
            },
            apoyo: "Ese registro sirve a las familias por muchos años",
            explica: "El pastor lleva un libro de registro con los bautismos, las presentaciones, las bodas y los funerales: los nombres, las fechas y quién ofició. Ese registro sirve a las familias por muchos años.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un diácono nuevo te dice: Pastor, ¿para qué anotamos cada bautismo y cada boda en un libro? Eso ya pasó.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que ese registro sirve a las familias por muchos años.", bien: true, explica: "Se lleva un libro de registro con los bautismos, las presentaciones, las bodas y los funerales: ese registro sirve a las familias por muchos años." },
              { texto: "Que se anota solo para que la iglesia parezca más ordenada.", explica: "El registro no es para aparentar: sirve a las familias por muchos años." },
              { texto: "Que tiene razón: basta con que cada uno lo recuerde.", explica: "El pastor lleva un registro con los nombres, las fechas y quién ofició, porque sirve a las familias por muchos años." },
              { texto: "Que se anotan los bautismos, pero no las bodas ni los funerales.", explica: "El libro de registro lleva los bautismos, las presentaciones, las bodas y los funerales." },
            ],
            apoyo: "Lleva un libro de registro de la iglesia con los bautismos, las presentaciones, las bodas y los funerales",
            explica: "El pastor que preside lleva un registro: los nombres, las fechas y quién ofició. Ese registro sirve a las familias por muchos años.",
          },
          {
            caso: "Una hermana te dice: Pastor, el domingo hay bautismos. Prepare un mensaje largo, para que todos vean lo bien que predica.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que presidir es servir a la mesa del Señor, no lucirse en ella.", bien: true, explica: "Presidir una ordenanza es servir a la mesa del Señor, no lucirse en ella." },
              { texto: "Que tiene razón: en el bautismo el centro es el mensaje del pastor.", explica: "El pastor preside para servir, no para lucirse: enseña el sentido del bautismo y prepara a las personas." },
              { texto: "Que no hace falta preparar nada: basta con improvisar en el agua.", explica: "El pastor que preside prepara a las personas y cuida los detalles: todo se hace decentemente y con orden." },
              { texto: "Que lo importante es el mensaje, no preparar a los que se bautizan.", explica: "El pastor que preside prepara a las personas: enseña, prepara y lo hace todo con orden." },
            ],
            apoyo: "Presidir una ordenanza es servir a la mesa del Señor, no lucirse en ella",
            ref: "1 Corintios 14:40",
            explica: "El pastor preside enseñando, preparando y haciéndolo todo con orden: presidir una ordenanza es servir a la mesa del Señor, no lucirse en ella.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Las ceremonias, como la presentación de niños, la boda y el funeral, tienen fundamento bíblico sin ser un mandato",
            ref: "Mateo 28:19-20",
            clave: {
              id: "pr-pastoral-3-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué diferencia hay entre una ordenanza y una ceremonia? Da un ejemplo de cada una.",
              ideas: [
                { id: "ordenanza", peso: 40, texto: "La ordenanza la mandó el Señor: son dos, el bautismo en agua y la Santa Cena.", formas: ["(senor|jesus|cristo|dios) (mando|ordeno|manda|ordena)", "(mando|ordeno|manda|ordena) (senor|jesus|cristo|dios)", "mandato (del|de) (senor|jesus|cristo|dios)", "(mandada|mandadas|ordenada|ordenadas) por (el|jesus|cristo|dios)"] },
                { id: "ceremonia", peso: 30, texto: "La ceremonia no tiene un mandato directo, pero sí un fundamento bíblico, y se adapta a la cultura y a cada familia.", formas: ["fundamento biblico", "fundamento en la biblia", "base biblica", "bases biblicas", "se basa en la biblia", "adapt* cultura", "adapt* familia"] },
                { id: "ejemplos", peso: 30, texto: "Ejemplos: el bautismo o la Santa Cena son ordenanzas; la presentación de niños, la boda o el funeral son ceremonias.", formas: ["boda", "bodas", "funeral", "funerales", "presentacion (de|del) (ninos|nino|bebes|bebe|un|una)", "present* (nino|ninos|bebe|bebes|hijo|hijos)", "matrimonio", "casamiento", "casar* pareja", "entierro", "velorio"] },
              ],
              errores: [
                { id: "boda-ordenanza", texto: "La boda, la presentación de niños y el funeral son ceremonias, no ordenanzas.", formas: ["(boda|funeral|presentacion|matrimonio) (es|son) (una|un|unas) ordenanza*", "(boda|funeral|presentacion|matrimonio) (es|son) ordenanza*"], anula: "ejemplos" },
                { id: "cena-ceremonia", texto: "El bautismo y la Santa Cena son ordenanzas: el Señor las mandó.", formas: ["(bautismo|cena) (es|son) (una|un|unas) ceremonia*", "(bautismo|cena) (es|son) ceremonia*"], anula: "ordenanza" },
                { id: "ceremonia-mandada", texto: "Las ceremonias no tienen un mandato directo: las que el Señor mandó son las ordenanzas.", formas: ["ceremonia* (mando|ordeno|manda|ordena|mandada|mandadas|ordenada|ordenadas)", "(boda|funeral|presentacion) (mando|ordeno|mandada|ordenada)"], anula: "ordenanza" },
              ],
              modelo: "La ordenanza la mandó el Señor, como el bautismo en agua y la Santa Cena. La ceremonia no tiene un mandato directo, pero sí un fundamento bíblico, y se adapta a cada familia, como la boda o el funeral.",
            },
          },
          {
            apoyo: "Las ordenanzas son dos, el bautismo en agua y la Santa Cena, porque el Señor las mandó y la primera iglesia las practicó",
            ref: "1 Corintios 11:23-24",
            clave: {
              id: "pr-pastoral-3-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la boda es una ordenanza, igual que el bautismo. ¿Qué le explicas?",
              ideas: [
                { id: "dos", peso: 40, texto: "Que las ordenanzas son dos, el bautismo en agua y la Santa Cena, porque el Señor las mandó.", formas: ["son dos", "dos ordenanzas", "solo dos", "solamente dos", "(senor|jesus|cristo|dios) (mando|ordeno|manda|ordena)", "(mando|ordeno|manda|ordena) (senor|jesus|cristo|dios)", "mandato (del|de) (senor|jesus|cristo|dios)"] },
                { id: "ceremonia", peso: 40, texto: "Que la boda es una ceremonia: no tiene un mandato directo, pero sí un fundamento bíblico.", formas: ["(boda|matrimonio|casamiento) (es|son) (una|un) ceremonia*", "(boda|matrimonio|casamiento) (es|son) ceremonia*", "es una ceremonia", "fundamento biblico", "base biblica"] },
                { id: "adapta", peso: 20, texto: "Que las ceremonias se adaptan a la cultura y a cada familia, siempre que honren a Dios.", formas: ["adapt*", "cultura", "cada familia", "honr* dios", "bendecir", "acompanar a las familias"] },
              ],
              errores: [
                { id: "boda-ordenanza", texto: "La boda es una ceremonia, no una ordenanza.", formas: ["(boda|matrimonio|casamiento) (es|son) (una|un) ordenanza*", "(boda|matrimonio|casamiento) (es|son) ordenanza*", "tres ordenanzas"], anula: "ceremonia" },
              ],
              modelo: "Le explico que las ordenanzas son dos, el bautismo en agua y la Santa Cena, porque el Señor las mandó. La boda es una ceremonia con fundamento bíblico, sin mandato directo, y se adapta a la cultura y a cada familia.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El bautismo en agua
    "pastoral-3-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En Pentecostés, ¿a qué llamó Pedro primero?", reverso: "Al arrepentimiento, antes del bautismo.", apoyo: "En Pentecostés, Pedro llamó primero al arrepentimiento" },
              { frente: "En la inmersión, ¿cómo baja al agua la persona y cómo sale?", reverso: "Baja como quien es sepultado y sale como quien resucita.", apoyo: "la persona baja al agua como quien es sepultado y sale como quien resucita" },
              { frente: "¿A quiénes bautizan la mayoría de las iglesias bautistas y pentecostales?", reverso: "Solo a quienes pueden confesar su fe, y por inmersión.", apoyo: "La mayoría de las iglesias bautistas y pentecostales bautizan solo a quienes pueden confesar su fe, y por inmersión" },
              { frente: "¿Cuánto dura la vida nueva que anuncia el bautismo?", reverso: "Para siempre, aunque el bautismo dure un minuto.", apoyo: "El bautismo dura un minuto; la vida nueva que anuncia dura para siempre" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le respondió Felipe al eunuco que quería bautizarse?", reverso: "«Si crees de todo corazón, bien puedes».", apoyo: "Felipe respondió: «Si crees de todo corazón, bien puedes»" },
              { frente: "¿Cómo bautizan muchas de las iglesias que bautizan a los niños pequeños?", reverso: "Derramando o rociando agua.", apoyo: "muchas lo hacen derramando o rociando agua" },
              { frente: "¿Qué hace el pastor con quien fue bautizado de niño y ahora cree?", reverso: "Le explica con respeto por qué se bautizan los creyentes, sin despreciar la fe de su familia.", apoyo: "el pastor le explica con respeto por qué se bautizan los creyentes, sin despreciar la fe de su familia" },
              { frente: "¿De cuántos encuentros es la clase de bautismo?", reverso: "De dos a cuatro.", apoyo: "una clase de bautismo de dos a cuatro encuentros" },
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
            consigna: "Completa lo que representa el bautismo y cómo se bautiza.",
            texto: "La iglesia bautiza por [[inmersión]]: la persona baja al agua como quien es [[sepultado]] y sale como quien [[resucita]].",
            distractores: ["costumbre", "castigado", "escapa"],
            errores: {
              costumbre: "La iglesia bautiza por inmersión porque el bautismo representa la muerte y la resurrección con Cristo.",
              castigado: "La persona baja al agua como quien es sepultado con Cristo.",
              escapa: "Sale del agua como quien resucita, para andar en vida nueva.",
            },
            apoyo: "Por eso la iglesia bautiza por inmersión: la persona baja al agua como quien es sepultado y sale como quien resucita",
            ref: "Romanos 6:3-4",
            explica: "Pablo explica lo que el bautismo representa: «somos sepultados juntamente con él para muerte por el bautismo», para que «andemos en vida nueva». Por eso la iglesia bautiza por inmersión.",
          },
          {
            consigna: "Completa lo que hace el pastor cuando las iglesias difieren sobre el bautismo.",
            texto: "Cuando llega alguien que fue bautizado de [[niño]] y ahora cree, el pastor le explica con [[respeto]] por qué se bautizan los creyentes.",
            distractores: ["adulto", "desprecio"],
            errores: {
              adulto: "Se trata de alguien que fue bautizado de niño y ahora cree.",
              desprecio: "El pastor le explica con respeto, sin despreciar la fe de su familia.",
            },
            apoyo: "Cuando llega alguien que fue bautizado de niño y ahora cree, el pastor le explica con respeto por qué se bautizan los creyentes, sin despreciar la fe de su familia",
            explica: "Las iglesias difieren sobre bautizar a los niños, y el tema se trata con respeto: el pastor explica por qué se bautizan los creyentes, sin despreciar la fe de su familia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un buen bautismo se prepara con una clase y una entrevista",
            ref: "Hechos 8:36-38",
            titulo: "Tres candidatos para el bautismo",
            relato: [
              "Eres pastor de una iglesia pequeña. El mes que viene habrá bautismos, y tres personas quieren bautizarse.",
              "Kevin creyó en Cristo hace dos meses. Doña Carmen, de 78 años, creyó este año. Andrés fue bautizado de niño en otra iglesia, y ahora cree en Cristo.",
              "Empiezas a preparar a los tres.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo preparas a los tres antes del bautismo?",
                opciones: [
                  { texto: "Con una clase de dos a cuatro encuentros y una entrevista personal.", bien: true, explica: "Un buen bautismo se prepara con una clase de bautismo, de dos a cuatro encuentros, y una entrevista personal." },
                  { texto: "Con una charla corta el mismo día del bautismo, antes de entrar al agua.", explica: "La clase y la entrevista van antes: un bautismo se prepara con cuidado, antes, durante y después." },
                  { texto: "Con una clase de un año entero, para que su fe quede bien probada.", explica: "Bautizar no tiene que esperar años, pero sí pide una fe verdadera." },
                ],
                apoyo: "Antes: una clase de bautismo de dos a cuatro encuentros",
                explica: "Antes del bautismo van la clase, de dos a cuatro encuentros, y la entrevista personal.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué temas verán en la clase de bautismo?",
                opciones: [
                  { texto: "El evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia.", bien: true, explica: "La clase de bautismo enseña el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia." },
                  { texto: "Solo cómo entrar y salir del agua sin resbalar, y qué ropa llevar el día de la fiesta.", explica: "La seguridad en el agua se cuida, pero la clase enseña el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia." },
                  { texto: "Los errores de cada una de las iglesias que bautizan a los niños, uno por uno y con detalle.", explica: "Las iglesias difieren sobre bautizar a los niños, y el tema se trata con respeto; la clase enseña el evangelio y el sentido del bautismo." },
                ],
                apoyo: "con el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia",
                explica: "La clase de bautismo, de dos a cuatro encuentros, enseña el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés te pregunta si tiene que bautizarse otra vez. ¿Qué haces?",
                opciones: [
                  { texto: "Le explicas con respeto por qué se bautizan los creyentes, sin despreciar a su familia.", bien: true, explica: "Cuando llega alguien que fue bautizado de niño y ahora cree, el pastor le explica con respeto por qué se bautizan los creyentes, sin despreciar la fe de su familia." },
                  { texto: "Le dices que su bautismo de niño no valió nada y que su familia se equivocó con él.", explica: "El pastor explica con respeto, sin despreciar la fe de su familia." },
                  { texto: "Le dices que no hace falta hablar de eso y lo anotas para el domingo, sin explicarle nada.", explica: "El pastor le explica con respeto por qué se bautizan los creyentes." },
                ],
                apoyo: "el pastor le explica con respeto por qué se bautizan los creyentes, sin despreciar la fe de su familia",
                explica: "Las iglesias difieren sobre bautizar a los niños, y el tema se trata con respeto.",
              },
              {
                tipo: "explica",
                apoyo: "Antes: una entrevista personal, en la que el candidato cuenta cómo creyó en Cristo",
                clave: {
                  id: "pr-pastoral-3-2-a3-1",
                  tipo: "corta",
                  pregunta: "¿Para qué tienes una entrevista personal con doña Carmen antes de bautizarla, y qué más preparas por su edad?",
                  ideas: [
                    { id: "creyo", peso: 50, texto: "Para que cuente cómo creyó en Cristo: el bautismo pide una fe verdadera.", formas: ["como creyo", "como (conocio|recibio|acepto) a (cristo|jesus|jesucristo)", "como lleg* a (cristo|jesus|la)", "su testimonio", "testimonio", "fe verdadera", "su fe en (cristo|jesus)", "si (cree|creyo) en (cristo|jesus)"] },
                    { id: "cuidado", peso: 50, texto: "Por su edad, más ayudantes y, si hace falta, una silla dentro del agua.", formas: ["silla", "ayudantes", "mas (personas|ayuda|hermanos)", "dos personas"] },
                  ],
                  modelo: "Para que me cuente cómo creyó en Cristo, porque el bautismo pide una fe verdadera. Por su edad, preparo más ayudantes y, si hace falta, una silla dentro del agua.",
                },
              },
            ],
          },
          {
            apoyo: "Bautizar no tiene que esperar años, pero sí pide una fe verdadera",
            ref: "Hechos 2:38",
            titulo: "Quiero bautizarme mañana",
            relato: [
              "Eres pastor. Al terminar el culto se te acerca Mónica, una joven que asiste a la iglesia desde hace tres semanas.",
              "Te dice: Pastor, quiero bautizarme mañana mismo. Mi hermana se bautizó y quiero hacer lo mismo que ella.",
              "Además, Mónica tiene miedo al agua, porque nunca aprendió a nadar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a Mónica?",
                opciones: [
                  { texto: "Que con gusto, y que antes tendrán la clase de bautismo y una entrevista.", bien: true, explica: "Bautizar no tiene que esperar años, pero un buen bautismo se prepara con una clase y una entrevista." },
                  { texto: "Que no: primero debe pasar unos años en la iglesia para poder bautizarse.", explica: "Bautizar no tiene que esperar años, pero sí pide una fe verdadera." },
                  { texto: "Que sí: mañana la bautizas, sin clase ni entrevista, porque ya te lo pidió.", explica: "Un buen bautismo se prepara con una clase y una entrevista." },
                ],
                apoyo: "Un buen bautismo se prepara con una clase y una entrevista",
                explica: "Bautizar no tiene que esperar años, pero se prepara antes con una clase y una entrevista.",
              },
              {
                tipo: "situacion",
                pregunta: "En la entrevista, ¿qué necesitas escuchar de Mónica?",
                opciones: [
                  { texto: "Cómo creyó en Cristo: el bautismo sigue a la fe y al arrepentimiento.", bien: true, explica: "En la entrevista personal el candidato cuenta cómo creyó en Cristo: el bautismo sigue a la fe y al arrepentimiento." },
                  { texto: "Que quiere bautizarse porque su hermana ya lo hizo y le gustó mucho.", explica: "El bautismo no es imitar a otro: sigue a la fe y al arrepentimiento, y pide una fe verdadera." },
                  { texto: "Cuántos años lleva viniendo a la iglesia y si ya conoce a todos los hermanos.", explica: "En la entrevista el candidato cuenta cómo creyó en Cristo." },
                ],
                apoyo: "Antes: una entrevista personal, en la que el candidato cuenta cómo creyó en Cristo",
                explica: "En la entrevista, el candidato cuenta cómo creyó en Cristo: bautizar pide una fe verdadera.",
              },
              {
                tipo: "situacion",
                pregunta: "Mónica te dice que tiene mucho miedo al agua. ¿Qué haces?",
                opciones: [
                  { texto: "La cuidas: pones más ayudantes y dos personas en el agua para sumergir.", bien: true, explica: "Cuida a quien tiene miedo al agua: puede hacer falta más ayudantes, y siempre van dos personas en el agua para sumergir." },
                  { texto: "Le dices que el miedo al agua es falta de fe, y que se le pasará en el bautismo.", explica: "El pastor cuida a quien tiene miedo al agua." },
                  { texto: "La bautizas tú solo y muy rápido, para que el susto le dure lo menos posible.", explica: "En el agua van dos personas para sumergir, y a quien tiene miedo se le cuida con más ayudantes." },
                ],
                apoyo: "Cuida a quien tiene miedo al agua",
                explica: "Se cuida a quien tiene miedo al agua: puede hacer falta más ayudantes, y siempre hay dos personas en el agua para sumergir.",
              },
              {
                tipo: "explica",
                apoyo: "Antes: una clase de bautismo de dos a cuatro encuentros, con el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia",
                clave: {
                  id: "pr-pastoral-3-2-a3-2",
                  tipo: "corta",
                  pregunta: "¿Qué temas verá Mónica en la clase de bautismo, y cuántos encuentros tendrá?",
                  ideas: [
                    { id: "encuentros", peso: 30, texto: "De dos a cuatro encuentros.", formas: ["dos a cuatro", "2 a 4", "dos o (tres|cuatro)", "(dos|tres|cuatro) encuentros", "(2|3|4) encuentros"] },
                    { id: "evangelio", peso: 35, texto: "El evangelio, el arrepentimiento y la fe.", formas: ["evangelio", "arrepent*", "buenas nuevas"] },
                    { id: "sentido", peso: 35, texto: "El sentido del bautismo y la vida en la iglesia.", formas: ["sentido del bautismo", "significado del bautismo", "que (significa|representa) el bautismo", "vida en la iglesia", "vida de la iglesia", "vida en (comunidad|congregacion)"] },
                  ],
                  modelo: "Tendrá una clase de dos a cuatro encuentros. Verá el evangelio, el arrepentimiento y la fe, el sentido del bautismo y la vida en la iglesia.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el bautismo como lo presenta la lección, de antes a después.",
            pasos: [
              "La clase de bautismo y la entrevista personal",
              "Una lectura breve y el testimonio del candidato",
              "La pregunta de fe al candidato",
              "Yo te bautizo en el nombre del Padre, del Hijo y del Espíritu Santo",
              "Una oración, la bienvenida de la iglesia y el registro",
            ],
            apoyo: "un momento que se prepara con cuidado: antes, durante y después",
            ref: "Romanos 6:3-4",
            explica: "Antes van la clase y la entrevista; durante, la lectura y el testimonio, la pregunta de fe y las palabras del bautismo; y después, una oración, la bienvenida de la iglesia, el registro, un certificado y un grupo pequeño.",
          },
          {
            consigna: "Ordena lo que pasa el día del bautismo, del primer momento al último.",
            pasos: [
              "Revisar la profundidad y la temperatura del agua",
              "Leer Romanos 6:3-4 y escuchar el testimonio",
              "Preguntar: ¿Te has arrepentido de tus pecados y crees en Jesucristo?",
              "Bautizarlo por su confesión de fe, en el nombre del Padre, del Hijo y del Espíritu Santo",
              "Darle la bienvenida y un certificado, y conectarlo con un grupo pequeño",
            ],
            apoyo: "Antes: revisar el lugar: la profundidad y la temperatura del agua",
            ref: "Mateo 28:19",
            explica: "Antes se revisa el lugar; durante, la lectura y el testimonio, la pregunta de fe y las palabras del bautismo; y después, la bienvenida, el registro, un certificado y un grupo pequeño para seguir creciendo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cuida a los que se bautizan o los pone en riesgo? Lleva cada frase a su grupo.",
            grupos: ["Los cuida", "Los pone en riesgo"],
            frases: [
              { texto: "Revisar la profundidad y la temperatura del agua", grupo: 0 },
              { texto: "Tener un piso que no resbale", grupo: 0 },
              { texto: "Poner dos personas en el agua para sumergir", grupo: 0 },
              { texto: "Revisar antes la corriente del río", grupo: 0 },
              { texto: "Bautizar en el mar sin mirar antes la corriente", grupo: 1 },
              { texto: "Sumergir sin ayuda a una persona mayor", grupo: 1 },
              { texto: "Un piso mojado y resbaloso junto al agua", grupo: 1 },
            ],
            apoyo: "la profundidad y la temperatura del agua, un piso que no resbale y dos personas en el agua para sumergir",
            explica: "Antes del bautismo se revisan la profundidad y la temperatura del agua, un piso que no resbale y dos personas en el agua para sumergir; en un río o en el mar, también la corriente.",
          },
          {
            consigna: "¿Así se cuida a cada candidato o no? Lleva cada frase a su grupo.",
            grupos: ["Así se cuida al candidato", "Así no se le cuida"],
            frases: [
              { texto: "Una silla dentro del agua para una abuela que no puede estar de pie", grupo: 0 },
              { texto: "Más ayudantes para un hermano que vive con una discapacidad", grupo: 0 },
              { texto: "Ropa oscura que no se transparente", grupo: 0 },
              { texto: "Toallas listas para cuando salgan del agua", grupo: 0 },
              { texto: "Apurar a una joven que tiene miedo al agua", grupo: 1 },
              { texto: "Ropa clara que se transparenta al mojarse", grupo: 1 },
              { texto: "Pedir a una embarazada que baje sola al agua", grupo: 1 },
            ],
            apoyo: "Cuida a quien tiene miedo al agua, a las personas mayores, a las embarazadas y a quien vive con una discapacidad",
            explica: "Se cuida a quien tiene miedo al agua, a las personas mayores, a las embarazadas y a quien vive con una discapacidad: puede hacer falta una silla dentro del agua o más ayudantes. Se pide ropa oscura que no se transparente y se tienen toallas listas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano que te ayudará en el agua te dice: Pastor, ¿cómo sostenemos al candidato cuando lo sumergimos?",
            pregunta: "¿Qué le enseñas?",
            opciones: [
              { texto: "Con una mano en su espalda y la otra sobre sus manos, mientras él se tapa la nariz.", bien: true, explica: "Una mano va en la espalda y la otra sobre las manos del candidato, que se tapa la nariz." },
              { texto: "Con las dos manos sobre su cabeza, para empujarlo hacia abajo con fuerza y con rapidez.", explica: "Se sostiene al candidato con una mano en la espalda y la otra sobre sus manos, con cuidado." },
              { texto: "Sin tocarlo: que se deje caer de espaldas él solo, para que no se sienta incómodo.", explica: "En el agua van dos personas para sumergir, con una mano en la espalda del candidato." },
              { texto: "Con una mano en su brazo, y pidiéndole que no se tape la nariz, para que se vea mejor.", explica: "El candidato se tapa la nariz, y se le sostiene con una mano en la espalda y la otra sobre sus manos." },
            ],
            apoyo: "Una mano en la espalda y la otra sobre las manos del candidato, que se tapa la nariz",
            explica: "Al bautizar, una mano va en la espalda y la otra sobre las manos del candidato, que se tapa la nariz; y siempre hay dos personas en el agua para sumergir.",
          },
          {
            caso: "Una hermana que ayuda en los bautismos te dice: Pastor, ¿qué le pregunta usted al candidato antes de bautizarlo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Si se ha arrepentido de sus pecados y cree en Jesucristo como su Señor y Salvador.", bien: true, explica: "La pregunta de fe es: ¿Te has arrepentido de tus pecados y crees en Jesucristo como tu Señor y Salvador?" },
              { texto: "Si promete venir a todos los cultos de la iglesia, desde ahora en adelante y para siempre.", explica: "El bautismo sigue a la fe y al arrepentimiento: la pregunta es por su arrepentimiento y su fe en Jesucristo." },
              { texto: "Si ya leyó toda la Biblia y sabe de memoria los versículos más importantes de la fe.", explica: "Bautizar pide una fe verdadera: la pregunta es si se arrepintió y cree en Jesucristo como su Señor y Salvador." },
              { texto: "Si se siente digno de bautizarse por todo lo bueno que ha hecho a lo largo de su vida.", explica: "La pregunta de fe es por su arrepentimiento y su fe en Jesucristo, no por sus buenas obras." },
            ],
            apoyo: "la pregunta de fe: ¿Te has arrepentido de tus pecados y crees en Jesucristo como tu Señor y Salvador?",
            ref: "Hechos 2:38",
            explica: "La pregunta de fe es: ¿Te has arrepentido de tus pecados y crees en Jesucristo como tu Señor y Salvador? Después vienen las palabras: Por tu confesión de fe, yo te bautizo en el nombre del Padre, del Hijo y del Espíritu Santo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "representa la muerte y la resurrección con Cristo",
            ref: "Romanos 6:3-4",
            clave: {
              id: "pr-pastoral-3-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué representa el bautismo en agua, y qué tiene que haber antes de que alguien se bautice?",
              ideas: [
                { id: "representa", peso: 50, texto: "Representa la muerte y la resurrección con Cristo: somos sepultados con él para andar en vida nueva.", formas: ["sepult*", "muerte resurreccion", "morir resucitar", "muere resucita", "murio resucito", "vida nueva", "nueva vida", "resucit*"] },
                { id: "antes", peso: 50, texto: "La fe y el arrepentimiento: el bautismo los sigue; no los reemplaza.", formas: ["arrepent*", "arrepient*", "la fe", "tener fe", "fe verdadera", "fe (en|de) (cristo|jesus|jesucristo|verdad)", "(creer|cree|crea|creyo|crean|creen) (en|de) (cristo|jesus|jesucristo|todo)", "todo corazon"] },
              ],
              errores: [
                { id: "reemplaza", texto: "El bautismo sigue a la fe y al arrepentimiento; no los reemplaza.", formas: ["(reemplaza|sustituye) (la|el|al) (fe|arrepentimiento)"], anula: "antes" },
              ],
              modelo: "Representa la muerte y la resurrección con Cristo: bajamos al agua como quien es sepultado y salimos para andar en vida nueva. Antes tiene que haber fe y arrepentimiento, porque el bautismo los sigue y no los reemplaza.",
            },
          },
          {
            apoyo: "Bautizar no tiene que esperar años, pero sí pide una fe verdadera",
            ref: "Hechos 8:36-38",
            clave: {
              id: "pr-pastoral-3-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña el bautismo del eunuco sobre quiénes se bautizan y cuándo?",
              ideas: [
                { id: "fe", peso: 50, texto: "Se bautiza quien cree de todo corazón: el bautismo pide una fe verdadera.", formas: ["todo corazon", "fe verdadera", "fe (real|sincera|genuina)", "si (cree|crees|creia|crea|creyo)", "(cree|creyo|creia|crea) en (cristo|jesus|jesucristo)", "quien cree", "los que creen", "el que cree"] },
                { id: "esperar", peso: 50, negativa: true, texto: "Bautizar no tiene que esperar años.", formas: ["no (tiene|tuvo|hay|hace) que esperar", "no (hace|hizo) falta esperar", "sin esperar", "no esperar", "no espero", "no espera", "enseguida", "pronto", "de inmediato", "inmediatamente", "mismo dia", "ese dia", "al momento"] },
              ],
              errores: [
                { id: "anos", texto: "Bautizar no tiene que esperar años, pero sí pide una fe verdadera.", formas: ["(tiene|hay|debe|deben) que esperar anos", "esperar (varios|muchos|unos) anos", "(debe|deben|tiene|tienen) esperar anos"], anula: "esperar" },
              ],
              modelo: "El eunuco preguntó qué impedía su bautismo, y Felipe le dijo que, si creía de todo corazón, bien podía. Bautizar no tiene que esperar años, pero sí pide una fe verdadera.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La Santa Cena
    "pastoral-3-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Con «haced esto en memoria de mí», ¿hacia dónde mira la Cena?", reverso: "Hacia atrás, a la cruz.", apoyo: "La Cena mira hacia atrás: «haced esto en memoria de mí»" },
              { frente: "La Cena anuncia la muerte del Señor «hasta que él venga». ¿Hacia dónde mira con eso?", reverso: "Hacia adelante, a su venida.", apoyo: "Y mira hacia adelante: «la muerte del Señor anunciáis hasta que él venga»" },
              { frente: "¿Fija el Nuevo Testamento cada cuánto se celebra la Cena?", reverso: "No: unas iglesias la celebran cada domingo y otras una vez al mes.", apoyo: "El Nuevo Testamento no fija cada cuánto se celebra" },
              { frente: "Sea cual sea la frecuencia, ¿qué es lo importante?", reverso: "Que la Cena nunca se vuelva una costumbre vacía.", apoyo: "Lo importante es que nunca se vuelva una costumbre vacía" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué día se reunían los discípulos de Troas para partir el pan?", reverso: "El primer día de la semana.", apoyo: "En Troas, los discípulos se reunían «El primer día de la semana» «para partir el pan»" },
              { frente: "¿Cómo llama a la Santa Cena la declaración de fe del ministerio?", reverso: "Memorial de la muerte del Señor, comunión con Él y con su pueblo y anuncio de su venida.", apoyo: "llama a la Santa Cena memorial de la muerte del Señor, comunión con Él y con su pueblo y anuncio de su venida" },
              { frente: "¿Con qué llegamos todos a la mesa del Señor?", reverso: "Con las manos vacías, y él las llena.", apoyo: "A la mesa del Señor todos llegamos con las manos vacías, y él las llena" },
              { frente: "¿A quiénes no hay que olvidar al celebrar la Cena?", reverso: "A los enfermos y a los que no pueden salir de casa.", apoyo: "no olvides a los enfermos y a los que no pueden salir de casa" },
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
            consigna: "¿Hacia dónde mira la Santa Cena y qué hace con la iglesia? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cena", texto: "La Santa Cena", x: 50, y: 12 },
              { id: "cruz", texto: "La cruz del Señor", x: 15, y: 72 },
              { id: "venida", texto: "Su venida", x: 85, y: 72 },
              { id: "cuerpo", texto: "Un solo cuerpo", x: 50, y: 92 },
            ],
            enlaces: [
              { de: "cena", a: "cruz", relacion: "mira hacia atrás, a" },
              { de: "cena", a: "venida", relacion: "mira hacia adelante, a" },
              { de: "cena", a: "cuerpo", relacion: "une a la iglesia en" },
            ],
            distractores: ["reemplaza a", "se olvida de"],
            apoyo: "Es memoria de la cruz y anuncio de su venida",
            ref: "1 Corintios 11:23-26",
            explica: "La Cena mira hacia atrás, a la cruz: «haced esto en memoria de mí»; y hacia adelante, a su venida: «la muerte del Señor anunciáis hasta que él venga». Y une a la iglesia: «Siendo uno solo el pan, nosotros, con ser muchos, somos un cuerpo».",
          },
          {
            consigna: "¿Qué enseña Pablo sobre la Cena y sobre quienes participan? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cena", texto: "La Santa Cena", x: 50, y: 10 },
              { id: "cristo", texto: "Cristo", x: 15, y: 55 },
              { id: "iglesia", texto: "La iglesia", x: 85, y: 55 },
              { id: "creyente", texto: "Cada creyente", x: 50, y: 92 },
            ],
            enlaces: [
              { de: "cena", a: "cristo", relacion: "es comunión con" },
              { de: "cena", a: "iglesia", relacion: "une en un cuerpo a" },
              { de: "creyente", a: "cena", relacion: "se examina antes de" },
            ],
            distractores: ["sustituye a", "se aleja de"],
            apoyo: "es comunión con Cristo y une a la iglesia en un solo cuerpo",
            ref: "1 Corintios 10:16-17",
            explica: "«El pan que partimos, ¿no es la comunión del cuerpo de Cristo?»: la Cena es comunión con Cristo y une a la iglesia en un solo cuerpo. Por eso cada creyente se examina antes de comer del pan y beber de la copa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Al compartir un solo pan, ¿qué llega a ser la iglesia? Toca las palabras que lo dicen.",
            texto: "Siendo uno solo el pan, nosotros, con ser muchos, [[somos un cuerpo]]",
            apoyo: "une a la iglesia en un solo cuerpo",
            ref: "1 Corintios 10:17",
            explica: "Pablo lo dice así: «Siendo uno solo el pan, nosotros, con ser muchos, somos un cuerpo». La Cena une a la iglesia en un solo cuerpo.",
          },
          {
            consigna: "¿Qué es el pan que partimos, según Pablo? Toca las palabras que lo dicen.",
            texto: "El pan que partimos, ¿no es [[la comunión del cuerpo de Cristo]]?",
            apoyo: "También es comunión",
            ref: "1 Corintios 10:16",
            explica: "La Cena también es comunión: «El pan que partimos, ¿no es la comunión del cuerpo de Cristo?». Es comunión con Cristo y une a la iglesia en un solo cuerpo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con lo que enseña sobre cómo está Cristo en la Cena.",
            pares: [
              ["La Iglesia católica", "La transubstanciación: el pan y el vino se convierten en su cuerpo y su sangre"],
              ["Lutero", "Cristo está presente en, con y bajo el pan y el vino"],
              ["Calvino", "Una presencia espiritual: por el Espíritu, el creyente se alimenta de Cristo"],
              ["Zuinglio", "El memorial: la Cena recuerda y proclama la muerte de Cristo"],
            ],
            apoyo: "Calvino enseñó una presencia espiritual: por el Espíritu, el creyente se alimenta de Cristo",
            explica: "La Iglesia católica enseña la transubstanciación; Lutero, que Cristo está presente en, con y bajo el pan y el vino; Calvino, una presencia espiritual; y Zuinglio subrayó el memorial.",
          },
          {
            consigna: "¿Quién lo enseñó? Une cada idea sobre la presencia de Cristo en la Cena con quien la enseña.",
            pares: [
              ["La transubstanciación", "La Iglesia católica"],
              ["Cristo en, con y bajo el pan y el vino", "Lutero"],
              ["Por el Espíritu, el creyente se alimenta de Cristo", "Calvino"],
              ["La Cena recuerda y proclama la muerte de Cristo", "Zuinglio"],
            ],
            apoyo: "Zuinglio subrayó el memorial: la Cena recuerda y proclama la muerte de Cristo",
            explica: "La transubstanciación la enseña la Iglesia católica; Lutero enseñó que Cristo está presente en, con y bajo el pan y el vino; Calvino, una presencia espiritual; y Zuinglio subrayó el memorial, que recuerda y proclama la muerte de Cristo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre cómo entienden las iglesias la presencia de Cristo en la Cena: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Lutero enseñó la transubstanciación.", verdad: false, explica: "La transubstanciación la enseña la Iglesia católica; Lutero enseñó que Cristo está presente en, con y bajo el pan y el vino.", apoyo: "Lutero enseñó que Cristo está presente en, con y bajo el pan y el vino" },
              { texto: "Calvino enseñó una presencia espiritual de Cristo en la Cena.", verdad: true, explica: "Calvino enseñó una presencia espiritual: por el Espíritu, el creyente se alimenta de Cristo.", apoyo: "Calvino enseñó una presencia espiritual" },
              { texto: "La declaración de fe del ministerio llama a la Cena memorial, comunión y anuncio de su venida.", verdad: true, explica: "La declaración de fe llama a la Santa Cena memorial de la muerte del Señor, comunión con Él y con su pueblo y anuncio de su venida (artículo 8).", apoyo: "la declaración de fe del ministerio la llama memorial, comunión y anuncio de su venida" },
            ],
          },
          {
            consigna: "Sobre la Cena en las distintas iglesias: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Zuinglio subrayó el memorial: la Cena recuerda y proclama la muerte de Cristo.", verdad: true, explica: "Así lo enseña la lección: Zuinglio subrayó el memorial.", apoyo: "Zuinglio subrayó el memorial" },
              { texto: "La Iglesia católica enseña que el pan y el vino solo recuerdan la muerte de Cristo.", verdad: false, explica: "La Iglesia católica enseña la transubstanciación: el pan y el vino se convierten en el cuerpo y la sangre de Cristo.", apoyo: "La Iglesia católica enseña la transubstanciación" },
              { texto: "Todas las iglesias entienden de la misma manera la presencia de Cristo en la Cena.", verdad: false, explica: "Las iglesias entienden de distintas maneras la presencia de Cristo en la Cena, y se comparan con respeto.", apoyo: "Las iglesias entienden de distintas maneras la presencia de Cristo en la Cena" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El pastor la celebra con orden: prepara la mesa, lee la Palabra, invita al examen, ora y reparte el pan y la copa",
            ref: "1 Corintios 11:23-26",
            situacion: "Eres pastor, y este domingo celebras la Santa Cena con tu iglesia. Quieres hacerlo con orden y reverencia.",
            escenas: [
              {
                id: "e1",
                narra: "El sábado, un diácono te pregunta qué preparar para la mesa. Una hermana de la iglesia no puede comer gluten.",
                pregunta: "¿Qué le pides?",
                opciones: [
                  { texto: "El pan y el fruto de la vid, con higiene y una opción sin gluten.", valor: 2, explica: "Se prepara la mesa con el pan y el fruto de la vid, vino o jugo de uva, con higiene y, si hace falta, una opción sin gluten." },
                  { texto: "El pan y el jugo de uva, y que la hermana traiga su propio pan de casa.", valor: 1, explica: "El pan y el fruto de la vid están bien, pero la mesa se prepara para todos: si hace falta, con una opción sin gluten." },
                  { texto: "Lo que haya en la cocina, porque lo que se pone en la mesa no importa.", valor: 0, explica: "La mesa se prepara con el pan y el fruto de la vid, vino o jugo de uva, y con higiene." },
                ],
              },
              {
                id: "e2",
                narra: "Ya leíste 1 Corintios 11:23-26 y diste un mensaje breve centrado en la cruz. Un diácono te dice en voz baja: Pasemos ya al pan; el silencio alarga el culto.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Das un momento de silencio para que cada uno se examine.", valor: 2, explica: "Se da un momento de silencio para que cada uno se examine y confiese su pecado.", siguiente: "e3" },
                  { texto: "Das un silencio de pocos segundos, para no alargar el culto.", valor: 1, explica: "El silencio va bien, pero que alcance para que cada uno se examine y confiese su pecado.", siguiente: "e3" },
                  { texto: "Pasas al pan sin silencio, porque así se termina más pronto.", valor: 0, explica: "Se participa con un corazón preparado: «pruébese cada uno a sí mismo».", siguiente: "e2b" },
                ],
              },
              {
                id: "e2b",
                narra: "Al repartir el pan, notas que varios lo toman sin pensar, como una costumbre más.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Haces una pausa y das un momento de silencio para examinarse.", valor: 2, explica: "Lo importante es que la Cena nunca se vuelva una costumbre vacía: cada uno se examina y confiesa su pecado.", siguiente: "e3" },
                  { texto: "Sigues repartiendo, porque lo importante es terminar a tiempo.", valor: 0, explica: "Lo importante es que la Cena nunca se vuelva una costumbre vacía.", siguiente: "e3" },
                ],
              },
              {
                id: "e3",
                narra: "Llega el momento del pan y de la copa.",
                pregunta: "¿Cómo lo haces?",
                opciones: [
                  { texto: "Oras por el pan y lo comen juntos; luego, lo mismo con la copa.", valor: 2, explica: "Se ora por el pan, se reparte y se come juntos, repitiendo las palabras de Jesús; después se ora por la copa, se reparte y se bebe juntos." },
                  { texto: "Oras una sola vez por los dos, y repartes el pan y la copa juntos.", valor: 1, explica: "Orar está bien, pero se ora por el pan y se come juntos, y después se ora por la copa y se bebe juntos." },
                  { texto: "Repartes todo sin orar, para que nadie se aburra mientras espera.", valor: 0, explica: "Se ora por el pan y por la copa, y se reparten con orden y reverencia." },
                ],
              },
              {
                id: "e4",
                narra: "Terminan de beber juntos de la copa.",
                pregunta: "¿Cómo cierras el servicio?",
                opciones: [
                  { texto: "Con un canto de gratitud y el anuncio de que Cristo vendrá.", valor: 2, explica: "El servicio termina con un canto de gratitud y el anuncio de que Cristo vendrá: la Cena mira hacia adelante, a su venida." },
                  { texto: "Con una oración de gratitud, y despides enseguida a todos los hermanos.", valor: 1, explica: "La gratitud está bien; falta el anuncio de que Cristo vendrá." },
                  { texto: "Con los anuncios de la semana, como en cualquier otro culto.", valor: 0, explica: "La Cena termina con un canto de gratitud y el anuncio de que Cristo vendrá." },
                ],
              },
            ],
          },
          {
            apoyo: "Lo importante es que nunca se vuelva una costumbre vacía",
            ref: "1 Corintios 11:23-26",
            situacion: "Eres pastor de una iglesia que celebra la Cena una vez al mes. Últimamente notas que muchos la viven como una costumbre más.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven te dice: Pastor, la Cena ya se volvió una costumbre. ¿No sería mejor dejarla?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no se deja, y que cuidarán que nunca sea una costumbre vacía.", valor: 2, explica: "El Señor la mandó: «haced esto en memoria de mí». Lo importante es que nunca se vuelva una costumbre vacía.", siguiente: "e2" },
                  { texto: "Que la celebrarán cada domingo, para que sea más importante para todos.", valor: 1, explica: "Celebrarla cada domingo no está mal, porque el Nuevo Testamento no fija cada cuánto se celebra; pero eso solo no basta: lo importante es que nunca se vuelva una costumbre vacía.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que dejarán de celebrarla por un tiempo largo.", valor: 0, explica: "La Cena es una ordenanza: el Señor la mandó. Lo importante es que nunca se vuelva una costumbre vacía.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan dos meses sin Cena, y una hermana anciana te dice: Pastor, extraño la mesa del Señor.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a celebrarla, y la preparas con más enseñanza y reverencia.", valor: 2, explica: "La Cena es una ordenanza que el Señor mandó; se celebra con enseñanza para que nunca se vuelva una costumbre vacía.", siguiente: "e2" },
                  { texto: "Le dices que la extrañe un poco más, hasta que todos vuelvan a tener ganas.", valor: 0, explica: "El Señor mandó la Cena: «haced esto en memoria de mí».", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Preparas la próxima Cena. Quieres que la iglesia la viva con reverencia.",
                pregunta: "¿Con qué empiezas el servicio?",
                opciones: [
                  { texto: "Lees 1 Corintios 11:23-26 y das un mensaje breve sobre la cruz.", valor: 2, explica: "Se lee 1 Corintios 11:23-26 y se da un mensaje breve centrado en la cruz." },
                  { texto: "Lees un pasaje y das un mensaje largo sobre muchos temas distintos.", valor: 1, explica: "Leer está bien, pero el mensaje es breve y centrado en la cruz." },
                  { texto: "Repartes enseguida el pan, sin leer nada, para ganar algo de tiempo.", valor: 0, explica: "El servicio empieza con la lectura de 1 Corintios 11:23-26 y un mensaje breve centrado en la cruz." },
                ],
              },
              {
                id: "e3",
                narra: "Terminaste el mensaje y vas a repartir el pan.",
                pregunta: "¿Qué haces antes?",
                opciones: [
                  { texto: "Das un silencio para que cada uno se examine y confiese.", valor: 2, explica: "Se da un momento de silencio para que cada uno se examine y confiese su pecado." },
                  { texto: "Pides a todos que cierren los ojos un segundo, y repartes el pan.", valor: 1, explica: "Cerrar los ojos ayuda, pero el silencio debe alcanzar para que cada uno se examine y confiese su pecado." },
                  { texto: "Pides que solo participen los que no fallaron en todo el mes.", valor: 0, explica: "La mesa no es para los perfectos, sino para los creyentes que se examinan, confiesan su pecado y se acercan con fe." },
                ],
              },
              {
                id: "e4",
                narra: "Después del culto recuerdas a don Julio, que está enfermo y no puede salir de casa.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le llevas la Cena a su casa con un diácono.", valor: 2, explica: "No olvides a los enfermos y a los que no pueden salir de casa: llévales la Cena con un diácono." },
                  { texto: "Lo llamas para contarle cómo estuvo la Cena del domingo.", valor: 1, explica: "Llamarlo es bueno, pero a los enfermos se les lleva la Cena con un diácono." },
                  { texto: "Nada: la Cena es solo para los que pueden venir al templo.", valor: 0, explica: "No olvides a los enfermos y a los que no pueden salir de casa: llévales la Cena." },
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
            apoyo: "Dar un momento de silencio para que cada uno se examine y confiese su pecado",
            ref: "1 Corintios 11:23-26",
            clave: {
              id: "pr-pastoral-3-3-a7-1",
              tipo: "corta",
              pregunta: "Vas a dirigir la Santa Cena por primera vez. ¿Qué pasos sigues, del principio al final?",
              ideas: [
                { id: "mesa", peso: 30, texto: "Preparo la mesa con el pan y el fruto de la vid.", formas: ["prepar* mesa", "fruto de la vid", "jugo de uva", "vino", "sin gluten", "higiene"] },
                { id: "palabra", peso: 40, texto: "Leo 1 Corintios 11, doy un mensaje breve y un silencio para que cada uno se examine.", formas: ["1 corintios 11", "corintios", "le* palabra", "mensaje breve", "silencio", "examin*", "confies*"] },
                { id: "pan", peso: 30, texto: "Oro por el pan y la copa, los repartimos, y termino con un canto de gratitud.", formas: ["(oro|oramos|orar|ora|orando) pan", "(oro|oramos|orar|ora|orando) copa", "repart*", "la copa", "canto de gratitud", "gratitud", "cristo vendra"] },
              ],
              modelo: "Preparo la mesa con el pan y el fruto de la vid. Leo 1 Corintios 11:23-26, doy un mensaje breve y un silencio para que cada uno se examine. Oro por el pan y por la copa, los repartimos y termino con un canto de gratitud.",
            },
          },
          {
            apoyo: "Leer 1 Corintios 11:23-26 y dar un mensaje breve centrado en la cruz",
            ref: "1 Corintios 11:23-26",
            clave: {
              id: "pr-pastoral-3-3-a7-2",
              tipo: "corta",
              pregunta: "Un líder te dice que en su iglesia la Cena se volvió una costumbre vacía. ¿Qué le aconsejas para celebrarla con orden y reverencia?",
              ideas: [
                { id: "cruz", peso: 35, texto: "Leer la Palabra y dar un mensaje breve centrado en la cruz.", formas: ["centrad* cruz", "mensaje breve", "le* palabra", "le* corintios", "corintios 11", "la cruz"] },
                { id: "examen", peso: 35, texto: "Dar un momento de silencio para que cada uno se examine y confiese su pecado.", formas: ["silencio", "examin*", "confies*", "prueb* si mismo"] },
                { id: "explicar", peso: 30, texto: "Explicar antes quiénes participan y terminar con un canto de gratitud y el anuncio de su venida.", formas: ["quienes participan", "explic* antes", "ensen* sentido", "canto de gratitud", "gratitud", "cristo vendra", "su venida", "hasta que venga"] },
              ],
              modelo: "Le aconsejo leer la Palabra y dar un mensaje breve centrado en la cruz. Que dé un momento de silencio para que cada uno se examine y confiese su pecado, y que termine con un canto de gratitud y el anuncio de su venida.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La presentación de niños
    "pastoral-3-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dijo Ana cuando entregó a Samuel a Dios?", reverso: "«Yo, pues, lo dedico también a Jehová».", apoyo: "Luego lo entregó a Dios: «Yo, pues, lo dedico también a Jehová»" },
              { frente: "¿Para qué llevaron José y María a Jesús a Jerusalén?", reverso: "Para presentarle al Señor, como pedía la ley de Moisés.", apoyo: "«le trajeron a Jerusalén para presentarle al Señor», como pedía la ley de Moisés" },
              { frente: "¿Qué hacía Jesús con los niños que le traían?", reverso: "Los tomaba en los brazos, ponía las manos sobre ellos y los bendecía.", apoyo: "Y «tomándolos en los brazos, poniendo las manos sobre ellos, los bendecía»" },
              { frente: "¿Salva al niño la presentación?", reverso: "No: no es un bautismo ni salva al niño.", apoyo: "No es un bautismo ni salva al niño" },
            ],
          },
          {
            tarjetas: [
              { frente: "En la presentación, ¿qué hace la iglesia, como hizo Jesús?", reverso: "Recibe al niño y lo bendice.", apoyo: "En la presentación, la iglesia hace lo mismo: recibe al niño y lo bendice" },
              { frente: "¿Dónde se enseña la fe a los hijos, según Deuteronomio 6?", reverso: "En la casa y en el camino: en la vida de todos los días.", apoyo: "La fe se enseña en la vida de todos los días" },
              { frente: "¿Es la presentación el final del camino de la fe del niño?", reverso: "No: es el comienzo de ese camino.", apoyo: "La presentación es el comienzo de ese camino, no su final" },
              { frente: "¿Qué es cada niño presentado para la iglesia?", reverso: "Una promesa de toda la iglesia.", apoyo: "Cada niño presentado es una promesa de toda la iglesia" },
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
            consigna: "Une cada pasaje con lo que enseña sobre la presentación de niños.",
            pares: [
              ["Ana y Samuel (1 Samuel 1:27-28)", "Una madre que dedica a su hijo a Jehová"],
              ["José y María (Lucas 2:22)", "Llevan al niño a Jerusalén para presentarlo al Señor"],
              ["Jesús y los niños (Marcos 10:13-16)", "Los recibe, pone las manos sobre ellos y los bendice"],
              ["Deuteronomio 6:6-7", "Las palabras de Dios se repiten a los hijos en la casa y en el camino"],
              ["Efesios 6:4", "Los padres crían a sus hijos en disciplina y amonestación del Señor"],
            ],
            apoyo: "La presentación de niños tiene su fundamento en Ana, que dedicó a Samuel, en José y María, que presentaron a Jesús en el templo, y en Jesús, que recibió y bendijo a los niños",
            explica: "La presentación tiene su fundamento en Ana, que dedicó a Samuel; en José y María, que presentaron a Jesús; y en Jesús, que recibió y bendijo a los niños. Y el compromiso de los padres es el de Deuteronomio 6 y Efesios 6:4.",
          },
          {
            consigna: "Une cada cita con quién la dice o de quién habla.",
            pares: [
              ["«Por este niño oraba, y Jehová me dio lo que le pedí»", "Ana, cuando nació Samuel"],
              ["«le trajeron a Jerusalén para presentarle al Señor»", "José y María, con Jesús"],
              ["«Dejad a los niños venir a mí, y no se lo impidáis»", "Jesús, con los niños que le traían"],
              ["«y las repetirás a tus hijos»", "El compromiso de los padres de Israel"],
              ["«criadlos en disciplina y amonestación del Señor»", "Pablo, a los padres"],
            ],
            apoyo: "El compromiso de los padres es el de Israel",
            explica: "Ana dijo «Por este niño oraba»; José y María llevaron a Jesús a Jerusalén «para presentarle al Señor»; Jesús dijo «Dejad a los niños venir a mí»; el compromiso de Israel era repetir las palabras de Dios a los hijos; y Pablo pide a los padres: «criadlos en disciplina y amonestación del Señor».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿La presentación de niños es esto o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Sí es la presentación", "No es la presentación"],
            frases: [
              { texto: "Una acción de gracias por la vida del niño", grupo: 0 },
              { texto: "El compromiso de los padres de criarlo en la fe", grupo: 0 },
              { texto: "El compromiso de la iglesia de acompañar a la familia", grupo: 0 },
              { texto: "Una oración de bendición por el niño y su familia", grupo: 0 },
              { texto: "Un bautismo del bebé", grupo: 1 },
              { texto: "Un acto que salva al niño", grupo: 1 },
              { texto: "El final del camino de la fe del niño", grupo: 1 },
            ],
            apoyo: "Es una acción de gracias, un compromiso de los padres y de la iglesia, y una bendición; no es un bautismo ni salva al niño",
            ref: "Marcos 10:13-16",
            explica: "La presentación es una acción de gracias, el compromiso de los padres y de la iglesia y una oración de bendición. No es un bautismo ni salva al niño, y es el comienzo del camino, no su final.",
          },
          {
            consigna: "¿Así es la presentación de Sofía o así no es? Lleva cada frase a su grupo.",
            grupos: ["Así es la presentación", "Así no es la presentación"],
            frases: [
              { texto: "La iglesia da gracias a Dios por la vida de Sofía", grupo: 0 },
              { texto: "Sus padres prometen criarla en la fe", grupo: 0 },
              { texto: "El pastor ora por Sofía con las manos sobre ella", grupo: 0 },
              { texto: "La iglesia promete orar por la familia", grupo: 0 },
              { texto: "Desde ese día, Sofía ya queda salva", grupo: 1 },
              { texto: "Con eso, Sofía ya está bautizada", grupo: 1 },
              { texto: "Sus padres ya cumplieron todo lo que Dios les pide", grupo: 1 },
            ],
            apoyo: "No es un bautismo ni salva al niño: en las iglesias que bautizan a los creyentes, el niño se bautizará cuando él mismo crea",
            ref: "Efesios 6:4",
            explica: "En la presentación la iglesia da gracias, los padres y la iglesia se comprometen y se ora por el niño. No es un bautismo ni salva al niño: en las iglesias que bautizan a los creyentes, se bautizará cuando él mismo crea. Y es el comienzo del camino de los padres, no su final.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Antes: una entrevista con los padres para explicarles el sentido, conocer su fe y preparar el día",
            ref: "Marcos 10:13-16",
            situacion: "Eres pastor. Laura, una madre sola de la iglesia, quiere presentar a su bebé Mateo, de dos meses. Hoy tienen la entrevista.",
            escenas: [
              {
                id: "e1",
                narra: "Laura llega nerviosa y te dice: Pastor, no sé si me van a aceptar, porque no tengo esposo.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que la recibes con gracia: la iglesia recibe a toda familia.", valor: 2, explica: "Recibe con gracia a toda familia: una madre sola, unos abuelos que crían a sus nietos o unos padres que todavía no creen.", siguiente: "e2" },
                  { texto: "Que no se preocupe, y pasas enseguida a fijar la fecha del domingo.", valor: 1, explica: "Recibirla está bien, pero la entrevista también sirve para explicarle el sentido, conocer su fe y preparar el día.", siguiente: "e2" },
                  { texto: "Que primero debe casarse, y que después podrá presentar a su bebé.", valor: 0, explica: "Se recibe con gracia a toda familia, también a una madre sola.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Laura baja la mirada y te dice que mejor no presenta a su hijo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le pides perdón y la recibes con gracia, como a toda familia.", valor: 2, explica: "El pastor recibe con gracia a toda familia, también a una madre sola.", siguiente: "e2" },
                  { texto: "Le dices que es su decisión, y das por terminada la entrevista.", valor: 0, explica: "El pastor recibe con gracia a toda familia y aprovecha la entrevista para preparar el día y hablar del evangelio.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya más tranquila, Laura te pregunta para qué es la presentación.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que es una acción de gracias, un compromiso y una bendición.", valor: 2, explica: "La presentación es una acción de gracias por la vida del niño, el compromiso de los padres y de la iglesia, y una oración de bendición." },
                  { texto: "Que es una oración por el bebé, y que no hace falta saber más.", valor: 1, explica: "Es una oración de bendición, pero también una acción de gracias y un compromiso de los padres y de la iglesia." },
                  { texto: "Que es el bautismo del bebé, para que quede salvo desde pequeño.", valor: 0, explica: "La presentación no es un bautismo ni salva al niño." },
                ],
              },
              {
                id: "e3",
                narra: "Hablan de las preguntas del domingo. Laura te dice que no tiene quién la ayude a criar a Mateo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Ajustas las preguntas y le cuentas que la iglesia promete ayudarla.", valor: 2, explica: "Se ajustan las preguntas a su situación, sin pedir promesas que no puede cumplir; y la iglesia promete orar por la familia y ayudarla a criar al niño en la fe." },
                  { texto: "Le haces las mismas preguntas que a dos padres, sin cambiar ninguna palabra.", valor: 1, explica: "No está mal preguntarle, pero las preguntas se ajustan a la situación de cada familia." },
                  { texto: "Le dices que, sin un esposo, ella sola no puede prometer criarlo en la fe.", valor: 0, explica: "Se recibe con gracia a toda familia, y la iglesia también promete ayudar a criar al niño en la fe." },
                ],
              },
              {
                id: "e4",
                narra: "Antes de despedirse, Laura te cuenta que hace años se alejó de Dios.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Aprovechas la entrevista para hablarle del evangelio.", valor: 2, explica: "La entrevista sirve para conocer su fe, y se aprovecha para hablar del evangelio." },
                  { texto: "Le prometes orar por ella y das por terminada la reunión.", valor: 1, explica: "Orar por ella está bien, pero se aprovecha la entrevista para hablarle del evangelio." },
                  { texto: "Le dices que eso no tiene nada que ver con la presentación.", valor: 0, explica: "La entrevista sirve para conocer su fe y para hablar del evangelio." },
                ],
              },
            ],
          },
          {
            apoyo: "Ajusta las preguntas a su situación, sin pedir promesas que no pueden cumplir",
            ref: "Deuteronomio 6:6-7",
            situacion: "Eres pastor. Unos abuelos que crían a su nieta Sofía, de un año, quieren presentarla en la iglesia. La abuela es creyente; el abuelo, todavía no.",
            escenas: [
              {
                id: "e1",
                narra: "La abuela te llama para pedirte una fecha.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Te reúnes con los dos para explicarles el sentido y preparar el día.", valor: 2, explica: "Antes de la presentación va una entrevista para explicar el sentido, conocer su fe y preparar el día.", siguiente: "e2" },
                  { texto: "Les mandas por mensaje la fecha, la hora y el orden del domingo.", valor: 1, explica: "Dar la fecha no basta: antes se tiene una entrevista para explicar el sentido y preparar el día.", siguiente: "e2" },
                  { texto: "Les dices que solo los padres de la niña pueden presentarla al Señor.", valor: 0, explica: "Se recibe con gracia a toda familia, también a unos abuelos que crían a sus nietos.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "La abuela te responde, triste: Pastor, la mamá de Sofía no está, y la estamos criando nosotros.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les pides perdón y los recibes con gracia, como a toda familia.", valor: 2, explica: "El pastor recibe con gracia a toda familia, también a unos abuelos que crían a sus nietos.", siguiente: "e2" },
                  { texto: "Insistes en que esperen a que la mamá de la niña vuelva algún día.", valor: 0, explica: "Se recibe con gracia a toda familia, también a unos abuelos que crían a sus nietos.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la entrevista, el abuelo te dice: Yo no creo mucho en estas cosas, pero quiero lo mejor para mi nieta.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Ajustas las preguntas y aprovechas para hablarle del evangelio.", valor: 2, explica: "Se ajustan las preguntas a su situación, sin pedir promesas que no puede cumplir, y se aprovecha la entrevista para hablarle del evangelio." },
                  { texto: "Ajustas las preguntas a su situación, pero no le hablas del evangelio.", valor: 1, explica: "Ajustar las preguntas está bien; también se aprovecha la entrevista para hablarle del evangelio." },
                  { texto: "Le pides la misma promesa que a un padre creyente, sin cambiar nada.", valor: 0, explica: "No se piden promesas que no se pueden cumplir: las preguntas se ajustan a su situación." },
                ],
              },
              {
                id: "e3",
                narra: "La abuela te pregunta si, con la presentación, Sofía ya queda salva.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que no es un bautismo ni la salva: es una acción de gracias.", valor: 2, explica: "La presentación no es un bautismo ni salva al niño: es una acción de gracias, un compromiso y una bendición." },
                  { texto: "Que es una oración de bendición, sin explicarle nada más.", valor: 1, explica: "Es una oración de bendición, pero conviene explicarle que no es un bautismo ni salva al niño." },
                  { texto: "Que sí: desde ese día la niña ya no tendrá que creer en Cristo.", valor: 0, explica: "La presentación no salva al niño: en las iglesias que bautizan a los creyentes, el niño se bautizará cuando él mismo crea." },
                ],
              },
              {
                id: "e4",
                narra: "Llega el domingo, y presentas a la familia ante la iglesia.",
                pregunta: "¿Qué le preguntas a la iglesia?",
                opciones: [
                  { texto: "Si promete orar por esta familia y ayudarla a criar a Sofía en la fe.", valor: 2, explica: "Se pregunta a la iglesia: ¿Prometen orar por esta familia y ayudarla a criar a este niño en la fe?" },
                  { texto: "Si promete orar por Sofía, sin pedirle a la iglesia nada más.", valor: 1, explica: "Orar es parte de la promesa; la iglesia también promete ayudar a la familia a criar a la niña en la fe." },
                  { texto: "Nada: el compromiso de criarla en la fe es solo de los abuelos, no de la iglesia.", valor: 0, explica: "La presentación es el compromiso de los padres y también el de la iglesia de acompañarlos." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena la presentación de niños como la presenta la lección, del primer paso al último.",
            pasos: [
              "Una entrevista con los padres",
              "Presentar a la familia y leer Marcos 10:13-16",
              "Preguntar a los padres si prometen criarlo en la fe",
              "Preguntar a la iglesia si promete orar y ayudar",
              "Orar por el niño con las manos sobre él",
              "Entregar un certificado o una Biblia",
            ],
            apoyo: "Se prepara con una entrevista, se celebra con preguntas a los padres y a la iglesia y con una oración de bendición, y sigue con el ministerio de niños",
            ref: "Marcos 10:13-16",
            explica: "Antes va la entrevista con los padres. Durante, se presenta a la familia y se lee un pasaje, se pregunta a los padres y después a la iglesia, y se ora por el niño con las manos sobre él. Después se entrega un certificado o una Biblia.",
          },
          {
            consigna: "Ordena lo que hace la iglesia con el niño y su familia, de antes a después.",
            pasos: [
              "Explicar el sentido a los padres y preparar el día",
              "Presentar a la familia ante la iglesia",
              "Escuchar las promesas de los padres y de la iglesia",
              "Bendecir al niño y orar por sus padres",
              "Anotarlo en el registro y conectar a la familia con el ministerio de niños",
            ],
            apoyo: "Después: entregar un certificado o una Biblia, anotarlo en el registro y conectar a la familia con el ministerio de niños",
            explica: "Antes, la entrevista para explicar el sentido y preparar el día; durante, la familia se presenta ante la iglesia, se escuchan las promesas y se bendice al niño; y después se anota en el registro y se conecta a la familia con el ministerio de niños.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un pastor joven, que hará su primera presentación de niños, te dice: Pensaba orar por el bebé desde el púlpito, y nada más.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que pregunte a los padres y a la iglesia, y ore con las manos sobre el niño.", bien: true, explica: "En la presentación se pregunta a los padres y a la iglesia si prometen criar al niño en la fe, y se ora por el niño con las manos sobre él." },
              { texto: "Que está bien así: la presentación es solo una oración corta por el bebé de la familia.", explica: "La presentación también es el compromiso de los padres y de la iglesia: por eso se les pregunta a los dos." },
              { texto: "Que además lo bautice con un poco de agua, para que la presentación quede completa.", explica: "La presentación no es un bautismo ni salva al niño." },
              { texto: "Que dé un sermón largo sobre la familia y deje la oración para otro domingo.", explica: "Se lee un pasaje, como Marcos 10:13-16, se hacen las preguntas y se ora por el niño con las manos sobre él." },
            ],
            apoyo: "Durante: orar por el niño con las manos sobre él, bendecirlo y orar por sus padres",
            ref: "Marcos 10:16",
            explica: "En la presentación se presenta a la familia y se lee un pasaje; se pregunta a los padres y a la iglesia; y se ora por el niño con las manos sobre él, se lo bendice y se ora por sus padres.",
          },
          {
            caso: "Una mamá te dice al terminar la presentación de su hija: Pastor, ¿y ahora qué sigue? ¿Ya cumplimos con todo?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que es el comienzo del camino, y que la conectarás con el ministerio de niños.", bien: true, explica: "La presentación es el comienzo de ese camino, no su final: después se conecta a la familia con el ministerio de niños." },
              { texto: "Que sí: con la presentación ya cumplieron todo lo que Dios les pide como padres.", explica: "La presentación es el comienzo del camino, no su final: los padres crían a sus hijos en disciplina y amonestación del Señor." },
              { texto: "Que ahora solo falta que la niña se bautice el domingo que viene, sin esperar más.", explica: "La presentación no es un bautismo; en las iglesias que bautizan a los creyentes, el niño se bautizará cuando él mismo crea." },
              { texto: "Que lo que sigue le toca solo a la iglesia, y no a ustedes como padres de la niña.", explica: "El compromiso es de los padres, que la crían en la fe, y de la iglesia, que los acompaña." },
            ],
            apoyo: "La presentación es el comienzo de ese camino, no su final",
            ref: "Efesios 6:4",
            explica: "Después de la presentación se entrega un certificado o una Biblia, se anota en el registro y se conecta a la familia con el ministerio de niños: la presentación es el comienzo del camino, no su final.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La presentación de niños tiene su fundamento en Ana, que dedicó a Samuel",
            ref: "1 Samuel 1:27-28",
            clave: {
              id: "pr-pastoral-3-4-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se apoya la presentación de niños en la Biblia, y en qué se distingue del bautismo?",
              ideas: [
                { id: "fundamento", peso: 50, texto: "En Ana, que dedicó a Samuel; en José y María, que presentaron a Jesús; y en Jesús, que recibió y bendijo a los niños.", formas: ["ana", "samuel", "jose maria", "presentaron jesus", "jesus (recibio|bendijo|bendecia|tomo)", "bendijo ninos", "dejad ninos", "marcos 10"] },
                { id: "distingue", peso: 50, negativa: true, texto: "No es un bautismo ni salva al niño: el niño se bautizará cuando él mismo crea.", formas: ["no es bautismo", "no salva", "ni salva", "no es para salvar", "cuando crea", "cuando (el|ella) crea"] },
              ],
              errores: [
                { id: "salva", texto: "La presentación no es un bautismo ni salva al niño.", formas: ["presentacion (salva|bautiza)", "(queda|quedara) salv*", "es un bautismo", "es (el|su) bautismo"], anula: "distingue" },
              ],
              modelo: "Se apoya en Ana, que dedicó a Samuel, en José y María, que presentaron a Jesús en el templo, y en Jesús, que recibió y bendijo a los niños. No es un bautismo ni salva al niño: él se bautizará cuando él mismo crea.",
            },
          },
          {
            apoyo: "no es un bautismo ni salva al niño",
            ref: "Marcos 10:13-16",
            clave: {
              id: "pr-pastoral-3-4-a7-2",
              tipo: "corta",
              pregunta: "Unos padres creen que, al presentar a su bebé, ya queda salvo. ¿Qué les explicas?",
              ideas: [
                { id: "nosalva", peso: 40, negativa: true, texto: "Que la presentación no es un bautismo ni salva al niño.", formas: ["no es bautismo", "no salva", "ni salva", "no queda salvo", "no (lo|la) salva", "no es (para|lo que) salva*"] },
                { id: "es", peso: 30, texto: "Que es una acción de gracias, un compromiso de los padres y de la iglesia, y una bendición.", formas: ["accion de gracias", "dar gracias", "da gracias", "compromiso", "comprometen", "bendicion", "bendec*", "bendig*"] },
                { id: "crea", peso: 30, texto: "Que, en las iglesias que bautizan a los creyentes, el niño se bautizará cuando él mismo crea: la presentación es el comienzo del camino.", formas: ["cuando crea", "cuando (el|ella) crea", "comienzo camino", "el comienzo", "criar* fe"] },
              ],
              modelo: "Les explico que la presentación no es un bautismo ni salva al niño. Es una acción de gracias, un compromiso de los padres y de la iglesia y una bendición, y el niño se bautizará cuando él mismo crea.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La boda cristiana
    "pastoral-3-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Si no es un contrato que se rompe cuando conviene, ¿qué es el matrimonio?", reverso: "Un pacto delante de Dios.", apoyo: "El matrimonio no es un contrato que se rompe cuando conviene, sino un pacto delante de Dios" },
              { frente: "¿Cuál es el modelo del amor en el matrimonio?", reverso: "Cristo, que amó a la iglesia y se entregó por ella.", apoyo: "El modelo del amor en el matrimonio es Cristo" },
              { frente: "¿Dónde sacan los novios la licencia de matrimonio en Texas?", reverso: "En la oficina del secretario del condado (County Clerk).", apoyo: "Los novios sacan la licencia de matrimonio en la oficina del secretario del condado (County Clerk)" },
              { frente: "¿Cuánto deben esperar para casarse desde que reciben la licencia?", reverso: "72 horas, salvo excepciones.", apoyo: "Deben esperar 72 horas desde que la reciben para casarse, salvo excepciones" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuánto dura una boda, y cuánto el matrimonio?", reverso: "La boda, unas horas; el matrimonio, toda la vida.", apoyo: "Una boda dura unas horas; el matrimonio, toda la vida" },
              { frente: "¿Cuántos encuentros tiene la consejería prematrimonial?", reverso: "De cuatro a seis.", apoyo: "La consejería prematrimonial: de cuatro a seis encuentros" },
              { frente: "¿A los cuántos días vence la licencia de matrimonio?", reverso: "A los 90 días: la boda tiene que celebrarse antes.", apoyo: "La licencia vence a los 90 días: la boda tiene que celebrarse antes" },
              { frente: "¿En cuánto tiempo devuelve el oficiante la licencia al condado?", reverso: "Dentro de los 30 días siguientes a la boda.", apoyo: "la devuelve al condado dentro de los 30 días siguientes a la boda" },
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
            consigna: "Completa lo que enseña la declaración de fe sobre el matrimonio.",
            texto: "Dios instituyó el matrimonio entre un hombre y una mujer, como un [[pacto]] de amor y [[fidelidad]] para toda la [[vida]].",
            distractores: ["contrato", "costumbre", "temporada"],
            errores: {
              contrato: "El matrimonio no es un contrato que se rompe cuando conviene, sino un pacto delante de Dios.",
              costumbre: "Es un pacto de amor y fidelidad.",
              temporada: "Es un pacto para toda la vida.",
            },
            apoyo: "Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida",
            ref: "Hebreos 13:4",
            explica: "La declaración de fe del ministerio enseña que Dios instituyó el matrimonio entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida (artículo 14).",
          },
          {
            consigna: "Completa lo que hace el pastor con la pareja que casa.",
            texto: "El pastor no solo casa a una pareja: la [[acompaña]] para que su [[pacto]] dure.",
            distractores: ["olvida", "contrato"],
            errores: {
              olvida: "El pastor acompaña a la pareja también después de la boda.",
              contrato: "El matrimonio no es un contrato, sino un pacto delante de Dios.",
            },
            apoyo: "El pastor no solo casa a una pareja: la acompaña para que su pacto dure",
            ref: "Mateo 19:4-6",
            explica: "Una boda dura unas horas; el matrimonio, toda la vida. Por eso el pastor no solo casa a una pareja: la acompaña para que su pacto dure.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo lo que pide la ley de Texas para una boda, del primer paso al último.",
            eventos: [
              { texto: "Los novios sacan la licencia en la oficina del condado", fecha: "Al recibirla" },
              { texto: "Termina la espera de la ley y ya se pueden casar", fecha: "A las 72 horas" },
              { texto: "Se celebra la boda, antes de que venza la licencia", fecha: "Antes de los 90 días" },
              { texto: "El oficiante completa la licencia y la devuelve al condado", fecha: "Dentro de los 30 días" },
            ],
            apoyo: "En Texas, los novios sacan la licencia en el condado, esperan 72 horas salvo excepciones y se casan antes de 90 días, y el ministro la devuelve en 30 días",
            explica: "Los novios sacan la licencia en el condado y esperan 72 horas desde que la reciben, salvo excepciones; la boda se celebra antes de que venza, a los 90 días; y el oficiante la devuelve al condado dentro de los 30 días siguientes a la boda.",
          },
          {
            consigna: "Ordena en el tiempo cómo cuida el pastor la ceremonia y la licencia, del primer paso al último.",
            eventos: [
              { texto: "Ensayar el orden de la ceremonia con los novios y el cortejo", fecha: "Un día antes" },
              { texto: "Revisar los nombres, la fecha y que la licencia no esté vencida", fecha: "Antes de empezar" },
              { texto: "Los votos y los anillos, como señal del pacto", fecha: "Durante la ceremonia" },
              { texto: "La firma de la licencia", fecha: "Tras la presentación" },
              { texto: "Devolver la licencia completa al condado", fecha: "En los 30 días siguientes" },
            ],
            apoyo: "Revisa la licencia antes de empezar: los nombres, la fecha y que no esté vencida",
            explica: "Un día antes se ensaya la ceremonia; antes de empezar se revisa la licencia; durante la ceremonia van los votos y los anillos; después de la presentación de los esposos se firma la licencia, y el oficiante la devuelve al condado dentro de los 30 días siguientes.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la preparación de los novios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La consejería prematrimonial tiene de cuatro a seis encuentros.", verdad: true, explica: "La consejería prematrimonial tiene de cuatro a seis encuentros sobre la fe, la comunicación, el dinero, la intimidad, las familias de origen y cómo resolver los conflictos.", apoyo: "La consejería prematrimonial: de cuatro a seis encuentros" },
              { texto: "En la consejería prematrimonial solo se habla de la fe; el dinero y los conflictos quedan fuera.", verdad: false, explica: "La consejería habla de la fe, la comunicación, el dinero, la intimidad, las familias de origen y cómo resolver los conflictos.", apoyo: "sobre la fe, la comunicación, el dinero, la intimidad, las familias de origen y cómo resolver los conflictos" },
              { texto: "Si uno de los novios estuvo casado antes, el pastor lo conversa con el liderazgo de su iglesia.", verdad: true, explica: "El pastor lo conversa con el liderazgo según la enseñanza y la práctica de su iglesia.", apoyo: "Si uno de los novios estuvo casado antes, el pastor lo conversa con el liderazgo según la enseñanza y la práctica de su iglesia" },
              { texto: "Antes de comprometerse a casarlos, el pastor evita hablar de la fe de los novios.", verdad: false, explica: "La fe de los novios importa: el pastor lo conversa con ellos con claridad y con amor antes de comprometerse a casarlos.", apoyo: "La fe de los novios importa" },
            ],
          },
          {
            consigna: "Sobre lo que pide la ley en Texas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En Texas puede oficiar una boda, entre otros, un ministro cristiano con licencia u ordenado.", verdad: true, explica: "Así lo dice el Código de Familia de Texas, en la sección 2.202.", apoyo: "Puede oficiar, entre otros, un ministro cristiano con licencia u ordenado (Código de Familia, sección 2.202)" },
              { texto: "La ley de Texas obliga al ministro a oficiar toda boda que le pidan.", verdad: false, explica: "Ningún ministro está obligado a oficiar una boda que vaya contra sus convicciones religiosas: la ley de Texas lo protege (Código de Familia, sección 2.601).", apoyo: "Ningún ministro está obligado a oficiar una boda que vaya contra sus convicciones religiosas" },
              { texto: "Haber tomado el curso Twogether in Texas es una excepción a la espera de 72 horas, y rebaja el costo de la licencia.", verdad: true, explica: "La espera de 72 horas tiene excepciones, como haber tomado el curso prematrimonial Twogether in Texas, que además rebaja el costo de la licencia.", apoyo: "como haber tomado el curso prematrimonial Twogether in Texas, que además rebaja el costo de la licencia" },
              { texto: "El oficiante tiene 90 días para devolver la licencia al condado.", verdad: false, explica: "El oficiante la devuelve al condado dentro de los 30 días siguientes a la boda. A los 90 días vence la licencia: la boda tiene que celebrarse antes.", apoyo: "El oficiante completa la licencia y la devuelve al condado dentro de los 30 días siguientes a la boda" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Ten por escrito el orden de la ceremonia y ensáyalo con los novios y el cortejo un día antes",
            ref: "Génesis 2:24",
            titulo: "Una boda en el jardín",
            relato: [
              "Eres pastor en Texas. Diego y Paula, dos creyentes de tu iglesia, se casan el sábado en el jardín de la casa de los abuelos de Paula.",
              "Ya terminaron la consejería prematrimonial y sacaron la licencia hace una semana. Te toca dirigir la ceremonia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Es viernes, un día antes de la boda. ¿Qué haces?",
                opciones: [
                  { texto: "Ensayas con los novios y el cortejo el orden de la ceremonia, que tienes por escrito.", bien: true, explica: "Ten por escrito el orden de la ceremonia y ensáyalo con los novios y el cortejo un día antes." },
                  { texto: "Nada: es mejor improvisar el sábado, para que la ceremonia salga más natural y fresca.", explica: "El orden de la ceremonia se tiene por escrito y se ensaya un día antes." },
                  { texto: "Les mandas un mensaje con la hora de llegada y dejas el orden para resolverlo el sábado.", explica: "El orden se ensaya con los novios y el cortejo un día antes, no el mismo día." },
                ],
                apoyo: "ensáyalo con los novios y el cortejo un día antes",
                explica: "El pastor tiene por escrito el orden de la ceremonia y lo ensaya con los novios y el cortejo un día antes.",
              },
              {
                tipo: "situacion",
                pregunta: "El sábado, antes de empezar, ¿qué haces con la licencia?",
                opciones: [
                  { texto: "La revisas: los nombres, la fecha y que no esté vencida.", bien: true, explica: "Revisa la licencia antes de empezar: los nombres, la fecha y que no esté vencida." },
                  { texto: "Pides que la firmen todos antes de empezar, para ganar tiempo.", explica: "La firma de la licencia va al final, después de la presentación de los esposos." },
                  { texto: "Nada todavía: la licencia se revisa en el condado, después de la boda.", explica: "El pastor revisa la licencia antes de empezar." },
                ],
                apoyo: "Revisa la licencia antes de empezar: los nombres, la fecha y que no esté vencida",
                explica: "Antes de empezar, el pastor revisa la licencia: los nombres, la fecha y que no esté vencida.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya hiciste la lectura de Génesis 2:24 y el mensaje breve sobre el pacto. ¿Qué sigue?",
                opciones: [
                  { texto: "Los votos, y después los anillos como señal del pacto.", bien: true, explica: "Después de la lectura y del mensaje vienen los votos y los anillos, como señal del pacto." },
                  { texto: "La firma de la licencia, y después los votos de los novios.", explica: "La firma de la licencia va al final, después de la presentación de los esposos." },
                  { texto: "La declaración de marido y mujer, y después los votos.", explica: "La declaración va después de los votos, los anillos y la oración de bendición." },
                ],
                apoyo: "Los anillos, como señal del pacto",
                explica: "Después de la lectura y del mensaje vienen los votos y los anillos; luego, la bendición, la declaración, la presentación y la firma de la licencia.",
              },
              {
                tipo: "explica",
                apoyo: "Y devuélvela a tiempo al condado, porque sin ese paso el matrimonio no queda registrado",
                clave: {
                  id: "pr-pastoral-3-5-a5-1",
                  tipo: "corta",
                  pregunta: "Terminó la ceremonia. ¿Qué pasa con la licencia, y por qué es importante ese paso?",
                  ideas: [
                    { id: "firma", peso: 30, texto: "Se firma después de presentar a los esposos a la iglesia.", formas: ["firm*"] },
                    { id: "devolver", peso: 40, texto: "El oficiante la completa y la devuelve al condado dentro de los 30 días siguientes.", formas: ["devolv*", "devuelv*", "al condado", "30 dias", "treinta dias", "entreg* condado", "llev* condado"] },
                    { id: "registro", peso: 30, negativa: true, texto: "Porque sin ese paso el matrimonio no queda registrado.", formas: ["registr*", "inscrit*", "inscrib*"] },
                  ],
                  modelo: "Después de presentar a los esposos, se firma la licencia. Yo la completo y la devuelvo al condado dentro de los 30 días siguientes, porque sin ese paso el matrimonio no queda registrado.",
                },
              },
            ],
          },
          {
            apoyo: "La ceremonia sigue un orden: bienvenida, lectura y mensaje, votos, anillos, bendición, declaración y presentación",
            ref: "Mateo 19:4-6",
            titulo: "La boda de Elena y Samuel",
            relato: [
              "Eres pastor en Texas. Elena y Samuel terminaron su consejería prematrimonial y se casan en la iglesia el domingo por la tarde.",
              "Los dos creen en Cristo y quieren una ceremonia sencilla, fiel a la Palabra. Ya ensayaron el orden con el cortejo, y revisaste la licencia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Entran los novios y su cortejo. ¿Con qué sigue la ceremonia?",
                opciones: [
                  { texto: "Con la bienvenida y una oración.", bien: true, explica: "Después de la entrada de los novios y de su cortejo vienen la bienvenida y una oración." },
                  { texto: "Con los votos, para no hacer esperar a los invitados.", explica: "Los votos van después de la bienvenida, la oración, la lectura y el mensaje." },
                  { texto: "Con la firma de la licencia, antes que todo lo demás.", explica: "La firma de la licencia va al final, después de la presentación de los esposos." },
                ],
                apoyo: "La bienvenida y una oración",
                explica: "Después de la entrada de los novios y de su cortejo vienen la bienvenida y una oración, y luego una lectura y un mensaje breve sobre el pacto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué prometen Elena y Samuel en sus votos?",
                opciones: [
                  { texto: "Amar, honrar y ser fiel al otro, hasta que la muerte los separe.", bien: true, explica: "En los votos, cada uno promete amar, honrar y ser fiel al otro, en la salud y en la enfermedad, hasta que la muerte los separe." },
                  { texto: "Amarse mientras dure el amor que hoy sienten el uno por el otro, y nada más.", explica: "El matrimonio no es un contrato que se rompe cuando conviene: los votos son para toda la vida." },
                  { texto: "Obedecer en todo al pastor que los casó, desde hoy y para siempre jamás.", explica: "En los votos, cada uno promete amar, honrar y ser fiel al otro." },
                ],
                apoyo: "cada uno promete amar, honrar y ser fiel al otro, en la salud y en la enfermedad, hasta que la muerte los separe",
                explica: "Los votos son la promesa de amar, honrar y ser fiel al otro, en la salud y en la enfermedad, hasta que la muerte los separe.",
              },
              {
                tipo: "situacion",
                pregunta: "Después de los anillos y de la oración de bendición, ¿qué dices?",
                opciones: [
                  { texto: "Los declaro marido y mujer; lo que Dios juntó, no lo separe el hombre.", bien: true, explica: "La declaración es: los declaro marido y mujer; lo que Dios juntó, no lo separe el hombre." },
                  { texto: "Los declaro marido y mujer, mientras los dos lo quieran así de verdad.", explica: "El matrimonio es un pacto para toda la vida: lo que Dios juntó, no lo separe el hombre." },
                  { texto: "Ahora firmen el contrato, que podrán romper si un día ya no les conviene.", explica: "El matrimonio no es un contrato que se rompe cuando conviene, sino un pacto delante de Dios." },
                ],
                apoyo: "La declaración: los declaro marido y mujer; lo que Dios juntó, no lo separe el hombre",
                explica: "Después de los anillos y de la bendición viene la declaración: los declaro marido y mujer; lo que Dios juntó, no lo separe el hombre.",
              },
              {
                tipo: "explica",
                apoyo: "La presentación de los esposos a la iglesia y, después, la firma de la licencia",
                clave: {
                  id: "pr-pastoral-3-5-a5-2",
                  tipo: "corta",
                  pregunta: "¿Cómo termina la ceremonia después de la declaración, y qué haces con la licencia?",
                  ideas: [
                    { id: "presentacion", peso: 40, texto: "Presento a los esposos a la iglesia.", formas: ["present* esposos", "present* iglesia", "presento", "presentacion"] },
                    { id: "firma", peso: 30, texto: "Después se firma la licencia.", formas: ["firm*"] },
                    { id: "devolver", peso: 30, texto: "La devuelvo al condado dentro de los 30 días.", formas: ["devolv*", "devuelv*", "al condado", "30 dias", "treinta dias"] },
                  ],
                  modelo: "Después de la declaración, presento a los esposos a la iglesia y se firma la licencia. Luego la completo y la devuelvo al condado dentro de los 30 días siguientes a la boda.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena la primera parte de la ceremonia como la presenta la lección, del primer momento al último.",
            pasos: [
              "La entrada de los novios y de su cortejo",
              "La bienvenida y una oración",
              "Una lectura y un mensaje breve sobre el pacto",
              "Los votos de los novios",
              "Los anillos, como señal del pacto",
            ],
            apoyo: "Una lectura, como Génesis 2:24 o Mateo 19:4-6, y un mensaje breve sobre el pacto",
            ref: "Génesis 2:24",
            explica: "La ceremonia empieza con la entrada de los novios y de su cortejo, la bienvenida y una oración; después vienen una lectura y un mensaje breve sobre el pacto, los votos y los anillos.",
          },
          {
            consigna: "Ordena el final de la ceremonia como lo presenta la lección, del primer momento al último.",
            pasos: [
              "Los anillos, como señal del pacto",
              "La oración de bendición sobre los esposos",
              "La declaración: los declaro marido y mujer",
              "La presentación de los esposos a la iglesia",
              "La firma de la licencia",
            ],
            apoyo: "La oración de bendición sobre los esposos",
            ref: "Mateo 19:6",
            explica: "Después de los anillos vienen la oración de bendición sobre los esposos y la declaración; al final, la presentación de los esposos a la iglesia y, después, la firma de la licencia.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios instituyó el matrimonio como un pacto entre un hombre y una mujer para toda la vida",
            ref: "Mateo 19:4-6",
            clave: {
              id: "pr-pastoral-3-5-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué decimos que el matrimonio es un pacto y no un contrato?",
              ideas: [
                { id: "dios", peso: 40, texto: "Porque Dios lo instituyó: es un pacto delante de Dios.", formas: ["instituy*", "delante de dios", "ante dios", "dios (junto|une|unio)", "lo que dios junto"] },
                { id: "vida", peso: 30, texto: "Es para toda la vida: no se rompe cuando conviene.", formas: ["toda la vida", "para siempre", "no se rompe", "hasta que la muerte", "no lo separe", "nadie lo separe"] },
                { id: "amor", peso: 30, texto: "Es un pacto de amor y fidelidad, entre un hombre y una mujer, con el modelo de Cristo.", formas: ["amor y fidelidad", "fidelidad", "fiel*", "como cristo amo", "modelo cristo", "un hombre y una mujer"] },
              ],
              errores: [
                { id: "contrato", texto: "El matrimonio no es un contrato que se rompe cuando conviene, sino un pacto delante de Dios.", formas: ["es un contrato"], anula: "vida" },
              ],
              modelo: "Porque Dios lo instituyó entre un hombre y una mujer como un pacto delante de él, de amor y fidelidad para toda la vida. No se rompe cuando conviene: lo que Dios juntó, no lo separe el hombre.",
            },
          },
          {
            apoyo: "El matrimonio no es un contrato que se rompe cuando conviene, sino un pacto delante de Dios",
            ref: "Mateo 19:6",
            clave: {
              id: "pr-pastoral-3-5-a7-2",
              tipo: "corta",
              pregunta: "Unos novios te dicen que se casan para ver si funciona, y que si no, se separan. ¿Qué les enseñas del matrimonio?",
              ideas: [
                { id: "pacto", peso: 40, texto: "Que es un pacto delante de Dios, no un contrato que se rompe cuando conviene.", formas: ["pacto", "delante de dios", "ante dios"] },
                { id: "junto", peso: 30, texto: "Que lo que Dios juntó, no lo separe el hombre.", formas: ["dios (junto|unio|une)", "no lo separe", "no los separe", "no separe", "una sola carne", "una carne"] },
                { id: "vida", peso: 30, texto: "Que Dios lo instituyó como un pacto de amor y fidelidad para toda la vida.", formas: ["toda la vida", "para siempre", "fidelidad", "fiel*", "instituy*"] },
              ],
              modelo: "Les enseño que el matrimonio es un pacto delante de Dios, no un contrato que se rompe cuando conviene. Lo que Dios juntó, no lo separe el hombre: es un pacto de amor y fidelidad para toda la vida.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. El funeral y el consuelo
    "pastoral-3-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Jesús ante la tumba de Lázaro?", reverso: "Lloró: llorar no es falta de fe.", apoyo: "Ante la tumba de Lázaro, «Jesús lloró»" },
              { frente: "¿Qué dijo Jesús de sí mismo, que da la esperanza más grande?", reverso: "«Yo soy la resurrección y la vida».", apoyo: "Pero Jesús también dio la esperanza más grande" },
              { frente: "¿Cómo es la tristeza del creyente, según Pablo?", reverso: "No es como la de los que no tienen esperanza.", apoyo: "Pablo no prohíbe la tristeza; dice que no es igual a la de otros" },
              { frente: "¿Qué es el funeral cristiano?", reverso: "Una despedida con esperanza.", apoyo: "El funeral cristiano es una despedida con esperanza" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuánto dura el mensaje del funeral?", reverso: "De diez a quince minutos.", apoyo: "un mensaje breve, de diez a quince minutos, de consuelo y de esperanza en Cristo" },
              { frente: "¿Quién da la semblanza en el funeral?", reverso: "Alguien de la familia o un amigo.", apoyo: "la semblanza, a cargo de alguien de la familia o de un amigo" },
              { frente: "En el cementerio, ¿qué hace el pastor?", reverso: "Una lectura breve, como 1 Corintios 15:55, y una oración.", apoyo: "En el cementerio: una lectura breve, como 1 Corintios 15:55, y una oración" },
              { frente: "En un funeral, ¿qué predica antes que el sermón del pastor?", reverso: "Su presencia.", apoyo: "En un funeral, la presencia del pastor predica antes que su sermón" },
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
            consigna: "¿Cómo no se entristece el creyente ante la muerte? Toca las palabras que lo dicen.",
            texto: "para que no os entristezcáis [[como los otros que no tienen esperanza]]",
            apoyo: "Lloramos, pero con esperanza",
            ref: "1 Tesalonicenses 4:13",
            explica: "Pablo no prohíbe la tristeza; dice que no es igual a la de otros: «para que no os entristezcáis como los otros que no tienen esperanza». Lloramos, pero con esperanza.",
          },
          {
            consigna: "¿Qué le pasará al que cree en Jesús, aunque esté muerto? Toca la palabra que lo dice.",
            texto: "Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, [[vivirá]]",
            apoyo: "también dijo que él es la resurrección y la vida",
            ref: "Juan 11:25",
            explica: "Jesús dio la esperanza más grande: «Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá». Por eso el funeral cristiano es una despedida con esperanza.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el funeral como lo presenta la lección, desde la bienvenida hasta el cementerio.",
            pasos: [
              "La bienvenida y una oración",
              "Una lectura, como el Salmo 23, y cantos de esperanza",
              "La semblanza, a cargo de la familia o de un amigo",
              "Un mensaje breve de consuelo y de esperanza en Cristo",
              "La oración final y la despedida",
              "En el cementerio, una lectura breve y una oración",
            ],
            apoyo: "dirige un funeral sencillo: bienvenida, lectura, cantos, semblanza, un mensaje breve de esperanza y oración",
            ref: "Juan 11:25-26",
            explica: "El funeral empieza con la bienvenida y una oración; siguen una lectura y cantos de esperanza, la semblanza y un mensaje breve, de diez a quince minutos; termina con la oración final y la despedida, y en el cementerio hay una lectura breve y una oración.",
          },
          {
            consigna: "Ordena lo que hace el pastor cuando muere un hermano, del primer paso al último.",
            pasos: [
              "Visitar a la familia lo antes posible y escuchar",
              "Planear con la familia las lecturas y los cantos",
              "Dirigir el funeral, con un mensaje breve de esperanza",
              "Leer 1 Corintios 15:55 en el cementerio y orar",
              "Llamar o visitar a la familia a la semana",
            ],
            apoyo: "Antes: visitar a la familia lo antes posible, escuchar, orar y ofrecer ayuda práctica",
            explica: "Antes del funeral, el pastor visita a la familia lo antes posible y planea con ella las lecturas y los cantos; después dirige el funeral y la despedida en el cementerio; y como el duelo no termina con el funeral, llama o visita a la familia a la semana.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada caso difícil con lo que hace el pastor.",
            pares: [
              ["El difunto no era creyente, o no se sabe", "Consuela a la familia, sin hablar de su destino eterno"],
              ["Fue un suicidio", "Acompaña a la familia con compasión, sin condenar"],
              ["Murió un niño o una persona joven", "Llora con la familia, sin dar explicaciones"],
              ["La familia tiene otras creencias", "Respeta sus costumbres y sirve con amor"],
            ],
            apoyo: "En los casos difíciles no juzga ni da explicaciones: consuela",
            explica: "Si el difunto no era creyente, el pastor no habla de su destino eterno; si fue un suicidio, no condena desde el púlpito; si murió un niño o un joven, no da explicaciones; y si la familia tiene otras creencias, respeta sus costumbres y sirve con amor.",
          },
          {
            consigna: "Une cada funeral con lo que conviene que haga el pastor.",
            pares: [
              ["Murió don Pedro, que nunca quiso saber de Dios", "No habla de su destino eterno, y presenta la esperanza sin presionar"],
              ["Un padre de familia se quitó la vida", "No condena desde el púlpito, y ayuda a buscar apoyo profesional"],
              ["Una familia despide a su bebé de un año", "No da explicaciones de su muerte: llora con la familia"],
              ["La familia del difunto tiene otra religión", "Honra sus costumbres con respeto y la sirve con amor"],
            ],
            apoyo: "Si fue un suicidio, el pastor no condena desde el púlpito: acompaña a la familia con compasión y la ayuda a buscar apoyo profesional si lo necesita",
            explica: "Si el difunto no era creyente, el pastor consuela y presenta con sencillez la esperanza del evangelio, sin presionar; si fue un suicidio, acompaña con compasión y ayuda a buscar apoyo profesional; si murió un niño, llora con la familia; y si la familia tiene otras creencias, respeta sus costumbres.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El pastor visita y escucha, planea con la familia",
            ref: "Romanos 12:15",
            titulo: "La familia de don Ernesto",
            relato: [
              "Eres pastor. Esta mañana murió don Ernesto, de 82 años, un hermano fiel de la iglesia.",
              "Su esposa, doña Elvira, y sus tres hijos están en la casa. El funeral será pasado mañana, y la familia quiere honrar algunas costumbres de su pueblo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Te enteras a media mañana. ¿Qué haces?",
                opciones: [
                  { texto: "Visitas a la familia lo antes posible: escuchas, oras y ofreces ayuda.", bien: true, explica: "Antes del funeral, el pastor visita a la familia lo antes posible, escucha, ora y ofrece ayuda práctica." },
                  { texto: "Llamas para decirles que oras por ellos, y que se verán en el funeral.", explica: "Antes del funeral se visita a la familia lo antes posible: la presencia del pastor dice más que muchas palabras." },
                  { texto: "Esperas a que la familia te llame cuando ya tenga todo listo y decidido.", explica: "El pastor no espera: visita a la familia lo antes posible." },
                ],
                apoyo: "visitar a la familia lo antes posible, escuchar, orar y ofrecer ayuda práctica",
                explica: "Pocas veces la iglesia necesita tanto a su pastor como cuando muere alguien: el pastor visita a la familia lo antes posible.",
              },
              {
                tipo: "situacion",
                pregunta: "Al día siguiente, ¿qué planeas con la familia?",
                opciones: [
                  { texto: "Las lecturas, los cantos, quién dará la semblanza y sus costumbres.", bien: true, explica: "Se planea con la familia las lecturas, los cantos, quién dará la semblanza y las costumbres que quieren honrar." },
                  { texto: "Nada: tú decides todo, para que la familia no tenga que pensar en nada.", explica: "El funeral se planea con la familia: las lecturas, los cantos, la semblanza y sus costumbres." },
                  { texto: "Solo la hora y el lugar; lo demás lo decides tú el mismo día del funeral.", explica: "Antes del funeral se planea con la familia todo lo demás: las lecturas, los cantos y quién dará la semblanza." },
                ],
                apoyo: "planear con la familia las lecturas, los cantos, quién dará la semblanza y las costumbres que quieren honrar",
                explica: "El pastor planea el funeral con la familia: las lecturas, los cantos, quién dará la semblanza y las costumbres que quieren honrar.",
              },
              {
                tipo: "situacion",
                pregunta: "Doña Elvira te dice llorando: Pastor, yo creo en Cristo. ¿Está mal que llore tanto?",
                opciones: [
                  { texto: "Le dices que Jesús lloró: llorar no es falta de fe, y lloramos con esperanza.", bien: true, explica: "Ante la tumba de Lázaro, «Jesús lloró». Llorar no es falta de fe: lloramos, pero con esperanza." },
                  { texto: "Le pides que deje de llorar, porque los que creen en Cristo no se ponen tristes.", explica: "Pablo no prohíbe la tristeza: lloramos, pero no como los que no tienen esperanza." },
                  { texto: "Le explicas con detalle por qué Dios se llevó a su esposo justo en este momento.", explica: "El pastor no apura el duelo ni da explicaciones: acompaña, escucha y ora." },
                ],
                apoyo: "Llorar no es falta de fe",
                explica: "Jesús lloró ante la tumba de Lázaro: llorar no es falta de fe. El pastor no apura el duelo ni da explicaciones: acompaña, escucha y ora.",
              },
              {
                tipo: "explica",
                apoyo: "El duelo no termina con el funeral",
                clave: {
                  id: "pr-pastoral-3-6-a5-1",
                  tipo: "corta",
                  pregunta: "Ya pasó el funeral. ¿Cómo sigues acompañando a doña Elvira y a sus hijos?",
                  ideas: [
                    { id: "fechas", peso: 50, texto: "Los llamo o visito a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario.", formas: ["a la semana", "al mes", "cumpleanos", "fiestas", "aniversario", "navidad", "fechas (dificiles|importantes|especiales)"] },
                    { id: "iglesia", peso: 25, texto: "Pido a la iglesia que siga cerca.", formas: ["siga cerca", "sigan cerca", "(este|esten|estar|seguir) cerca", "pido iglesia", "pedir iglesia", "con la iglesia", "iglesia (la|los|les) (acompane|acompana|visite|visita|cuide|cuida)"] },
                    { id: "profesional", peso: 25, texto: "Si con el paso de los meses el dolor no la deja vivir, la ayudo a buscar ayuda profesional.", formas: ["profesional", "psicolog*", "consejer*", "especialista", "terapia", "terapeuta"] },
                  ],
                  modelo: "El duelo no termina con el funeral. Los llamo o visito a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario, y pido a la iglesia que siga cerca. Si el dolor no la deja vivir, la ayudo a buscar ayuda profesional.",
                },
              },
            ],
          },
          {
            apoyo: "Y acompaña el duelo después del funeral",
            ref: "2 Corintios 1:3-4",
            titulo: "Un mes después",
            relato: [
              "Eres pastor. Hace un mes despediste en un funeral a Raúl, de 45 años, esposo de Lucía y padre de dos adolescentes.",
              "Después del funeral, casi todos los hermanos volvieron a su rutina.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Hoy se cumple un mes de la muerte de Raúl. ¿Qué haces?",
                opciones: [
                  { texto: "Llamas o visitas a Lucía y a sus hijos: el duelo no termina con el funeral.", bien: true, explica: "El duelo no termina con el funeral: el pastor llama o visita a la familia a la semana, al mes y en las fechas difíciles." },
                  { texto: "Nada: ya pasó un mes, y es mejor no recordarles su dolor con una visita tuya.", explica: "El duelo no termina con el funeral: se llama o se visita a la familia también al mes." },
                  { texto: "Esperas a que Lucía vuelva a la iglesia para preguntarle cómo está su familia.", explica: "El pastor no espera: llama o visita a la familia a la semana y al mes." },
                ],
                apoyo: "El duelo no termina con el funeral",
                explica: "El pastor llama o visita a la familia a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario.",
              },
              {
                tipo: "situacion",
                pregunta: "Se acercan las fiestas de fin de año, las primeras sin Raúl. ¿Qué haces?",
                opciones: [
                  { texto: "Los llamas o visitas en las fiestas, y pides a la iglesia que siga cerca.", bien: true, explica: "El pastor llama o visita a la familia en las fiestas, y pide a la iglesia que siga cerca." },
                  { texto: "Los invitas a una gran fiesta de la iglesia, para que se olviden de Raúl un rato.", explica: "El duelo no se apura: el pastor llama o visita a la familia en las fiestas y pide a la iglesia que siga cerca." },
                  { texto: "Les mandas el mismo saludo de fin de año que les mandas a todos los de la iglesia.", explica: "En las fiestas, el pastor llama o visita a la familia en duelo, y pide a la iglesia que siga cerca." },
                ],
                apoyo: "y pide a la iglesia que siga cerca",
                explica: "Las fiestas son fechas difíciles para una familia en duelo: el pastor la llama o la visita, y pide a la iglesia que siga cerca.",
              },
              {
                tipo: "situacion",
                pregunta: "Ocho meses después, Lucía te dice: Pastor, el dolor no me deja vivir; casi no me levanto de la cama.",
                opciones: [
                  { texto: "La ayudas a buscar ayuda profesional, y sigues cerca de ella con la iglesia.", bien: true, explica: "Si con el paso de los meses el dolor no deja vivir a alguien, el pastor lo ayuda a buscar ayuda profesional." },
                  { texto: "Le dices que ya debería haberlo superado, porque ya pasó demasiado tiempo.", explica: "El pastor no apura el duelo: acompaña, y si el dolor no la deja vivir, la ayuda a buscar ayuda profesional." },
                  { texto: "Le dices que eso es falta de fe, y que ore mucho más para que el dolor se le pase.", explica: "Llorar no es falta de fe; si el dolor no la deja vivir, el pastor la ayuda a buscar ayuda profesional." },
                ],
                apoyo: "Si con el paso de los meses el dolor no deja vivir a alguien, ayúdalo a buscar ayuda profesional",
                explica: "El pastor no apura el duelo; pero si con el paso de los meses el dolor no deja vivir a alguien, lo ayuda a buscar ayuda profesional.",
              },
              {
                tipo: "explica",
                apoyo: "Llama o visita a la familia a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario",
                clave: {
                  id: "pr-pastoral-3-6-a5-2",
                  tipo: "corta",
                  pregunta: "¿Por qué el pastor sigue cerca de la familia después del funeral, y cuándo la llama o la visita?",
                  ideas: [
                    { id: "termina", peso: 40, negativa: true, texto: "Porque el duelo no termina con el funeral.", formas: ["no termina", "no se termina", "no acaba", "no se acaba", "sigue despues", "continua despues", "dura mas"] },
                    { id: "fechas", peso: 60, texto: "La llama o visita a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario.", formas: ["a la semana", "al mes", "cumpleanos", "fiestas", "aniversario", "navidad"] },
                  ],
                  modelo: "Porque el duelo no termina con el funeral. El pastor llama o visita a la familia a la semana, al mes, en el primer cumpleaños, en las fiestas y en el aniversario, y pide a la iglesia que siga cerca.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "La hija de don Pedro te dice: Pastor, mi papá nunca quiso saber de Dios. En el funeral, ¿va a decir que se fue al infierno?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no hablarás de su destino: consolarás a la familia con la esperanza.", bien: true, explica: "Si el difunto no era creyente, o no se sabe, el pastor no habla de su destino eterno: consuela a la familia y presenta con sencillez la esperanza del evangelio, sin presionar." },
              { texto: "Que sí: el funeral es el mejor momento para advertir a todos con el caso de su papá.", explica: "El pastor no habla del destino eterno del difunto ni presiona: consuela a la familia." },
              { texto: "Que dirás que seguro está en el cielo, para que todos se vayan más tranquilos a casa.", explica: "El pastor no habla de su destino eterno: consuela a la familia y presenta con sencillez la esperanza del evangelio." },
              { texto: "Que no habrá mensaje ni lectura, solo música, para no tocar el tema delante de nadie.", explica: "El funeral lleva su lectura y un mensaje breve de consuelo y de esperanza en Cristo." },
            ],
            apoyo: "Si el difunto no era creyente, o no se sabe, el pastor no habla de su destino eterno",
            explica: "En los casos difíciles el pastor no juzga ni da explicaciones: consuela. Y presenta con sencillez la esperanza del evangelio, sin presionar.",
          },
          {
            caso: "Una hermana de la iglesia te dice: Pastor, mi esposo se quitó la vida y la gente murmura. ¿Qué va a decir usted en el funeral?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no condenarás a nadie desde el púlpito, y que la acompañarás con compasión.", bien: true, explica: "Si fue un suicidio, el pastor no condena desde el púlpito: acompaña a la familia con compasión y la ayuda a buscar apoyo profesional si lo necesita." },
              { texto: "Que hablarás del pecado de su esposo, para que los jóvenes aprendan la lección.", explica: "El pastor no condena desde el púlpito: acompaña a la familia con compasión." },
              { texto: "Que es mejor no hacer funeral, para que la gente no siga hablando de lo que pasó.", explica: "El pastor acompaña a la familia con compasión: pocas veces la iglesia necesita tanto a su pastor como cuando muere alguien." },
              { texto: "Que le darás a la iglesia una explicación de por qué Dios permitió lo que pasó.", explica: "El pastor no da explicaciones: consuela y acompaña a la familia con compasión." },
            ],
            apoyo: "Si fue un suicidio, el pastor no condena desde el púlpito: acompaña a la familia con compasión",
            ref: "2 Corintios 1:3-4",
            explica: "Si fue un suicidio, el pastor no condena desde el púlpito: acompaña a la familia con compasión y la ayuda a buscar apoyo profesional si lo necesita.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El funeral cristiano es una despedida con esperanza: lloramos, pero no como los que no tienen esperanza",
            ref: "Juan 11:25-26",
            clave: {
              id: "pr-pastoral-3-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué esperanza tiene el creyente ante la muerte, y cómo se nota en un funeral cristiano?",
              ideas: [
                { id: "resurreccion", peso: 40, texto: "Jesús es la resurrección y la vida: el que cree en él, aunque esté muerto, vivirá.", formas: ["resurreccion", "resucit*", "vivira", "vida eterna", "vivir para siempre", "aunque este muerto"] },
                { id: "llorar", peso: 30, texto: "Lloramos, pero no como los que no tienen esperanza: llorar no es falta de fe.", formas: ["lloramos", "llorar", "llora", "lloran", "tristeza", "triste", "tristes", "no es falta de fe"] },
                { id: "despedida", peso: 30, texto: "El funeral cristiano es una despedida con esperanza.", formas: ["despedida con esperanza", "despedi* esperanza", "con esperanza", "esperanza en cristo", "mensaje de esperanza"] },
              ],
              errores: [
                { id: "no-llorar", texto: "Llorar no es falta de fe: Jesús lloró ante la tumba de Lázaro.", formas: ["llorar es falta de fe", "no (debemos|debe|deben|debes) llorar", "prohib* tristeza"], anula: "llorar" },
              ],
              modelo: "Jesús es la resurrección y la vida: el que cree en él, aunque esté muerto, vivirá. Por eso lloramos, pero no como los que no tienen esperanza, y el funeral cristiano es una despedida con esperanza.",
            },
          },
          {
            apoyo: "Ante la tumba de Lázaro, «Jesús lloró»",
            ref: "1 Tesalonicenses 4:13-14",
            clave: {
              id: "pr-pastoral-3-6-a7-2",
              tipo: "corta",
              pregunta: "Un joven te pregunta: Si creemos en la resurrección, ¿por qué lloramos en los funerales? ¿Qué le respondes?",
              ideas: [
                { id: "jesus", peso: 40, texto: "Jesús mismo lloró ante la tumba de Lázaro: llorar no es falta de fe.", formas: ["jesus lloro", "jesus (tambien|mismo) lloro", "lloro jesus", "lazaro", "no es falta de fe"] },
                { id: "esperanza", peso: 60, texto: "Pablo no prohíbe la tristeza: lloramos, pero no como los que no tienen esperanza.", formas: ["con esperanza", "no como los", "no es igual", "tenemos esperanza", "nuestra esperanza", "esperanza (en|de) (cristo|la|volver|verlo|verlos)", "no prohib*"] },
              ],
              errores: [
                { id: "no-llorar", texto: "Llorar no es falta de fe: Jesús lloró ante la tumba de Lázaro.", formas: ["llorar es falta de fe", "no (debemos|debe|deben|debes) llorar"], anula: "jesus" },
              ],
              modelo: "Le respondo que Jesús mismo lloró ante la tumba de Lázaro: llorar no es falta de fe. Pablo no prohíbe la tristeza; lloramos, pero con esperanza, no como los que no tienen esperanza.",
            },
          },
        ],
      },
    ],
  },
};
