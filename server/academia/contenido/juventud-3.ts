/**
 * Especialidad Juventud · Materia 3 — Consejería juvenil (materia avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el consejero de jóvenes y la adolescencia,
 * escuchar y acompañar, la ansiedad, la tristeza y el riesgo de suicidio (988), los jóvenes y sus familias, la
 * sexualidad, el noviazgo y las adicciones (SAMHSA), y los límites, el deber de reportar en Texas y la derivación.
 * No reemplaza la atención médica ni la psicológica. Las líneas de ayuda se comprobaron en sus sitios oficiales.
 */
import type { LeccionContenido } from "../tipos";

export const JUVENTUD_3: LeccionContenido[] = [
  {
    id: "juventud-3-1",
    objetivos: [
      "Explicar qué es la consejería juvenil y en qué se distingue de la atención profesional.",
      "Describir los cambios de la adolescencia que el consejero debe conocer.",
      "Decidir qué tipo de ayuda necesita un joven: una conversación, un acompañamiento o una derivación.",
    ],
    paraEmpezar:
      "Muchos jóvenes no le cuentan a nadie lo que les pasa, pero se lo contarían a un adulto de la iglesia que los escuche. Ese adulto no necesita ser psicólogo: necesita saber escuchar, conocer la Palabra y saber cuándo buscar más ayuda.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 20:5" },
      {
        t: "parrafo",
        texto:
          "El sabio dice: «Como aguas profundas es el consejo en el corazón del hombre; Mas el hombre entendido lo alcanzará». Lo que un joven siente muchas veces está en lo profundo, y el consejero lo saca con paciencia.",
      },
      { t: "versiculo", ref: "Gálatas 6:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo pide ayudar «con espíritu de mansedumbre, considerándote a ti mismo», y agrega: «Sobrellevad los unos las cargas de los otros». El consejero no mira desde arriba: camina al lado.",
      },
      { t: "versiculo", ref: "Romanos 15:14" },
      {
        t: "parrafo",
        texto:
          "Y confía en que los creyentes pueden ayudarse: estáis «llenos de bondad, llenos de todo conocimiento, de tal manera que podéis amonestaros los unos a los otros». Aconsejar no es solo tarea de expertos.",
      },
      { t: "subtitulo", texto: "Lo que pasa en la adolescencia" },
      {
        t: "lista",
        items: [
          "Cambios en el cuerpo, que a veces traen vergüenza o comparación.",
          "Emociones más intensas y que cambian rápido.",
          "El grupo de amigos pesa mucho: la presión y el miedo a quedar afuera.",
          "La pregunta por la identidad: quién soy, qué creo y qué voy a hacer.",
          "La parte del cerebro que ayuda a frenar los impulsos y a planear sigue madurando hasta pasados los veinte años; por eso los jóvenes a veces deciden sin medir las consecuencias.",
        ],
      },
      { t: "subtitulo", texto: "Quién hace qué" },
      {
        t: "lista",
        items: [
          "El consejero de la iglesia acompaña con la Palabra, escucha, ora y orienta.",
          "El psicólogo o el consejero profesional evalúa y trata con terapia los problemas emocionales.",
          "El psiquiatra es un médico que diagnostica y puede recetar medicinas.",
          "El médico de familia revisa la salud del cuerpo, que también afecta el ánimo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ¿qué necesita este joven?" },
      {
        t: "lista",
        items: [
          "Una conversación: un joven está triste porque perdió un partido o peleó con un amigo; con escucharlo, orar y animarlo, suele bastar.",
          "Un acompañamiento: un joven tiene peleas seguidas con sus padres o una lucha con un pecado; necesita varias conversaciones y un plan.",
          "Una derivación: un joven habla de morir, se hace daño, deja de comer, consume drogas o cuenta un abuso; además de acompañarlo, se busca ayuda profesional y se avisa a quien corresponde.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Esta materia no reemplaza la atención médica ni la psicológica. Su meta es que el consejero sepa acompañar bien y sepa a tiempo cuándo y a quién derivar.",
      },
    ],
    ideaClave:
      "El consejo en el corazón del joven es como aguas profundas, y el consejero entendido lo saca con paciencia; ayuda con mansedumbre, sobrellevando las cargas, y todos los creyentes pueden aconsejarse. La adolescencia trae cambios en el cuerpo, emociones intensas, presión del grupo y la pregunta por la identidad, y el cerebro sigue madurando. El consejero de la iglesia acompaña con la Palabra, distingue lo que pide una conversación, un acompañamiento o una derivación, y trabaja junto con los profesionales.",
    paraLaVida: {
      texto: "Aconsejar no es mirar desde arriba: es caminar al lado.",
      pregunta: "¿Qué joven de tu iglesia necesita hoy que alguien lo escuche?",
    },
  },
  {
    id: "juventud-3-2",
    objetivos: [
      "Explicar por qué escuchar es la primera tarea del consejero.",
      "Hacer preguntas abiertas que ayuden a un joven a contar lo que le pasa.",
      "Dirigir una conversación de consejería paso a paso.",
    ],
    paraEmpezar:
      "Muchos adultos responden antes de que el joven termine de hablar. El joven se da cuenta, y deja de contar. El que escucha bien gana el derecho de hablar después.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=CxiSs-SHTuI", titulo: "Resumen del libro de Lucas (parte 2)", fuente: "Proyecto Biblia" },
      { t: "versiculo", ref: "Santiago 1:19" },
      {
        t: "parrafo",
        texto:
          "Santiago lo dice en una línea: «todo hombre sea pronto para oír, tardo para hablar, tardo para airarse». Es la regla de oro del consejero.",
      },
      { t: "versiculo", ref: "Proverbios 18:13" },
      {
        t: "parrafo",
        texto: "Y el proverbio advierte: «Al que responde palabra antes de oír, Le es fatuidad y oprobio».",
      },
      { t: "versiculo", ref: "Lucas 24:15-17" },
      {
        t: "parrafo",
        texto:
          "Camino a Emaús, Jesús «se acercó, y caminaba con ellos», y les preguntó: «¿Qué pláticas son estas que tenéis entre vosotros mientras camináis, y por qué estáis tristes?». Jesús sabía la respuesta, pero los dejó contar.",
      },
      { t: "subtitulo", texto: "Preguntas que cierran y preguntas que abren" },
      {
        t: "lista",
        items: [
          "Cierra: ¿estás bien? Abre: ¿cómo te fue esta semana?",
          "Cierra: ¿por qué hiciste eso? Abre: ¿qué pasó antes de que eso pasara?",
          "Cierra: ¿no sabes que eso es pecado? Abre: ¿cómo te sentiste después?",
          "Cierra: tienes que perdonarlo. Abre: ¿qué te cuesta más de perdonarlo?",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una conversación con una joven de dieciséis años que pelea con sus padres" },
      {
        t: "lista",
        items: [
          "Paso 1, preparar el lugar: un lugar visible de la iglesia, con el conocimiento de sus padres, y un consejero del mismo sexo.",
          "Paso 2, escuchar: la deja contar sin interrumpir, y no la corrige mientras habla.",
          "Paso 3, preguntar: ¿qué pasa cuando discuten? ¿Qué te gustaría que tus padres entendieran?",
          "Paso 4, reflejar: lo que escucho es que te sientes controlada y que no te creen; ¿es así?",
          "Paso 5, la Palabra: leen juntos Efesios 6:1-4, que habla a los hijos y también a los padres.",
          "Paso 6, un paso concreto: ella elige hablar con calma con su madre una vez esta semana.",
          "Paso 7, orar y acordar: oran juntas y quedan en volver a hablar en una semana.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Anota después de cada conversación lo que acordaron y la fecha, y guarda esas notas en un lugar seguro. Así el seguimiento no depende de tu memoria.",
      },
    ],
    ideaClave:
      "El consejero es pronto para oír, tardo para hablar y tardo para airarse, porque responder antes de oír es fatuidad; Jesús se acercó a los de Emaús, caminó con ellos y les preguntó por qué estaban tristes. Las preguntas abiertas ayudan al joven a contar lo que le pasa. Una conversación de consejería tiene un lugar visible, escucha, preguntas, reflejo, la Palabra, un paso concreto, oración y un acuerdo de seguimiento.",
    paraLaVida: {
      texto: "El que escucha bien gana el derecho de hablar después.",
      pregunta: "¿Qué pregunta abierta podrías hacerle esta semana a un joven?",
    },
  },
  {
    id: "juventud-3-3",
    objetivos: [
      "Reconocer las señales de la ansiedad, de la tristeza profunda y del riesgo de suicidio.",
      "Responder a un joven que habla de quitarse la vida, sin dejarlo solo y buscando ayuda.",
      "Acompañar con la Palabra al joven que sufre, junto con la ayuda profesional.",
    ],
    paraEmpezar:
      "Muchos jóvenes viven con ansiedad o con una tristeza que no se va, y algunos piensan en quitarse la vida. El consejero que sabe ver las señales y actuar a tiempo puede ayudar a salvar una vida.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Salmos 42:5" },
      {
        t: "parrafo",
        texto:
          "La Biblia no esconde la tristeza: «¿Por qué te abates, oh alma mía, Y te turbas dentro de mí? Espera en Dios». El creyente también puede estar abatido, y puede llevar esa tristeza a Dios.",
      },
      { t: "versiculo", ref: "1 Reyes 19:4-8" },
      {
        t: "parrafo",
        texto:
          "Elías llegó a desear la muerte: «deseando morirse, dijo: Basta ya, oh Jehová, quítame la vida». Dios no lo regañó: le dio descanso, comida y su cuidado. El ángel le dijo: «Levántate y come, porque largo camino te resta».",
      },
      { t: "versiculo", ref: "Filipenses 4:6-7" },
      {
        t: "parrafo",
        texto:
          "Para la ansiedad, Pablo invita a orar: «Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios», y promete que «la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones».",
      },
      { t: "versiculo", ref: "1 Pedro 5:7" },
      {
        t: "parrafo",
        texto: "Y Pedro lo resume: «echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros».",
      },
      { t: "subtitulo", texto: "Señales que piden atención" },
      {
        t: "lista",
        items: [
          "La ansiedad que no se va: preocupación constante, miedo, falta de sueño, dolores o ataques de pánico.",
          "La tristeza profunda que dura semanas: pierde el interés por lo que le gustaba, se aísla, duerme o come mucho más o mucho menos, y siente que nada tiene sentido.",
          "Las señales de riesgo de suicidio: habla de morir o de no querer vivir, se despide, regala sus cosas, busca maneras de hacerse daño o se hace heridas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un joven dice a veces quisiera no despertar" },
      {
        t: "lista",
        items: [
          "Paso 1, tomarlo en serio: nunca se responde con una broma ni con un sermón.",
          "Paso 2, preguntar directamente: ¿estás pensando en quitarte la vida? Preguntar no le da la idea; le muestra que puede hablar.",
          "Paso 3, escuchar y no dejarlo solo: si hay peligro ahora, alguien se queda con él.",
          "Paso 4, no prometer el secreto: le dices que vas a buscar ayuda con él.",
          "Paso 5, buscar ayuda: llamar o escribir al 988, la línea de crisis, que atiende en español las 24 horas, gratis y confidencial; si hay peligro inmediato, el 911.",
          "Paso 6, avisar a sus padres, si es menor, y animar a la familia a buscar ayuda profesional.",
          "Paso 7, seguir a su lado: visitarlo, orar con él y preguntar cómo está en los días siguientes.",
        ],
      },
      {
        t: "nota",
        titulo: "Lo que no se dice",
        texto:
          "No le digas a un joven deprimido que le falta fe ni que solo tiene que orar más. La oración ayuda, y también ayudan la terapia y, a veces, las medicinas que receta un médico. Buscar ayuda no es falta de fe.",
      },
    ],
    ideaClave:
      "La Biblia no esconde la tristeza: el salmista se preguntó por qué se abatía su alma y esperó en Dios, y Elías llegó a pedir la muerte, y Dios lo cuidó con descanso, comida y su presencia. La ansiedad se lleva a Dios en oración, porque él tiene cuidado de nosotros. El consejero reconoce las señales de la ansiedad, de la tristeza profunda y del riesgo de suicidio; ante un joven que habla de morir, lo toma en serio, pregunta directamente, no lo deja solo, no promete el secreto, llama al 988 o al 911, avisa a sus padres y sigue a su lado.",
    paraLaVida: {
      texto: "Buscar ayuda no es falta de fe.",
      pregunta: "¿Tienes guardado en tu teléfono el 988 y el número de un consejero profesional de confianza?",
    },
  },
  {
    id: "juventud-3-4",
    objetivos: [
      "Explicar lo que la Biblia pide a los hijos y a los padres.",
      "Acompañar los conflictos entre un joven y sus padres sin tomar partido.",
      "Actuar cuando la casa de un joven no es segura.",
    ],
    paraEmpezar:
      "Detrás de muchos problemas de un joven hay una familia que sufre: peleas, padres separados, padres que no creen o una casa donde no se siente seguro. El consejero ayuda al joven sin olvidar a su familia.",
    bloques: [
      { t: "versiculo", ref: "Efesios 6:1-4" },
      {
        t: "parrafo",
        texto:
          "La Biblia habla a los dos lados. A los hijos: «obedeced en el Señor a vuestros padres» y «Honra a tu padre y a tu madre». A los padres: «no provoquéis a ira a vuestros hijos, sino criadlos en disciplina y amonestación del Señor».",
      },
      { t: "versiculo", ref: "Lucas 15:20" },
      {
        t: "parrafo",
        texto:
          "En la parábola del hijo pródigo, el padre «fue movido a misericordia, y corrió, y se echó sobre su cuello, y le besó». La reconciliación en la familia empieza muchas veces con un gesto de misericordia.",
      },
      { t: "versiculo", ref: "Malaquías 4:6" },
      {
        t: "parrafo",
        texto:
          "Dios mismo quiere unir a las familias: «El hará volver el corazón de los padres hacia los hijos, y el corazón de los hijos hacia los padres».",
      },
      { t: "subtitulo", texto: "Conflictos comunes y cómo acompañarlos" },
      {
        t: "lista",
        items: [
          "Las reglas, el teléfono y los amigos: ayudar a que padres e hijos se escuchen y lleguen a acuerdos.",
          "Los padres que se separan: el joven no tiene la culpa, y necesita que no lo pongan en medio.",
          "Una familia nueva, con padrastro o madrastra: el cariño y la confianza llevan tiempo.",
          "Los padres que no creen: el joven honra a sus padres y vive su fe con respeto, sin desafiarlos.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "El consejero no toma partido. Escucha al joven, y cuando conviene, también a sus padres. Si el joven es menor de edad, sus padres siguen siendo los responsables: el consejero los ayuda, no los reemplaza.",
      },
      {
        t: "nota",
        titulo: "Cuando la casa no es segura",
        texto:
          "Si un joven cuenta que lo golpean, que abusan de él o que no lo cuidan, no se trata como un conflicto familiar: se reporta. En Texas, toda persona que tiene causa razonable para creer que un niño o un adolescente menor de edad sufre abuso o negligencia debe reportarlo de inmediato a la línea 1-800-252-5400, o al 911 si hay peligro ahora, como se estudia en la materia Protección de menores.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una reunión con el joven y sus padres" },
      {
        t: "lista",
        items: [
          "Paso 1, preparar: el consejero habla antes con el joven y con los padres por separado, y les explica que la reunión es para escucharse.",
          "Paso 2, las reglas: cada uno habla sin ser interrumpido, sin gritos ni insultos.",
          "Paso 3, escuchar: primero el joven cuenta cómo se siente; después los padres.",
          "Paso 4, buscar lo común: los dos quieren paz en la casa y que al joven le vaya bien.",
          "Paso 5, un acuerdo pequeño: por ejemplo, la hora de llegar y cómo avisar si se atrasa.",
          "Paso 6, orar juntos y fijar otra reunión para ver cómo va el acuerdo.",
        ],
      },
    ],
    ideaClave:
      "La Biblia pide a los hijos obedecer y honrar a sus padres, y a los padres no provocar a ira a sus hijos y criarlos en la disciplina del Señor; el padre del hijo pródigo corrió con misericordia, y Dios quiere volver el corazón de los padres hacia los hijos. El consejero acompaña los conflictos sin tomar partido, escucha a los dos lados y ayuda a los padres sin reemplazarlos. Cuando la casa no es segura, no es un conflicto: se reporta.",
    paraLaVida: {
      texto: "El consejero ayuda a los padres; no los reemplaza.",
      pregunta: "¿Qué familia de tu iglesia necesitaría una reunión para escucharse?",
    },
  },
  {
    id: "juventud-3-5",
    objetivos: [
      "Aconsejar a los jóvenes sobre la sexualidad y el noviazgo con la verdad bíblica y con gracia.",
      "Reconocer las señales de una relación que hace daño.",
      "Acompañar a un joven con una adicción, junto con la ayuda profesional.",
    ],
    paraEmpezar:
      "Los jóvenes reciben mensajes sobre el sexo, el noviazgo, el alcohol y las drogas en todas partes, menos en la iglesia. El consejero puede hablar de estos temas con claridad, sin escandalizarse y con esperanza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Tesalonicenses 4:3-5" },
      {
        t: "parrafo",
        texto:
          "Pablo lo dice con claridad: «la voluntad de Dios es vuestra santificación; que os apartéis de fornicación». La Biblia no ve el sexo como algo malo, sino como un regalo para el matrimonio.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:22" },
      {
        t: "parrafo",
        texto:
          "Y a un líder joven le pidió: «Huye también de las pasiones juveniles, y sigue la justicia, la fe, el amor y la paz, con los que de corazón limpio invocan al Señor». No basta con huir: hay que seguir algo mejor, y con otros.",
      },
      { t: "versiculo", ref: "1 Corintios 10:13" },
      {
        t: "parrafo",
        texto:
          "Y hay esperanza en la tentación: «fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir, sino que dará también juntamente con la tentación la salida».",
      },
      { t: "subtitulo", texto: "Un noviazgo con propósito" },
      {
        t: "lista",
        items: [
          "Con propósito: conocerse para ver si pueden formar un matrimonio que honre a Dios.",
          "Con límites claros, decididos antes, sobre el contacto físico y los lugares a solas.",
          "En grupo y cerca de la familia, sobre todo al principio.",
          "Con un mentor o un matrimonio que los acompañe.",
        ],
      },
      { t: "subtitulo", texto: "Señales de una relación que hace daño" },
      {
        t: "lista",
        items: [
          "Control: revisa el teléfono, decide la ropa o con quién se ve el otro.",
          "Celos que asustan, y el aislamiento de los amigos y de la familia.",
          "Insultos, humillaciones o amenazas.",
          "Presión para tener relaciones sexuales o para enviar fotos.",
          "Empujones, golpes o cualquier violencia: eso nunca es amor, y se busca ayuda de inmediato.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Si una joven queda embarazada, la iglesia la acompaña sin condenarla: cuida de ella y de la vida que espera, la ayuda a hablar con su familia y a recibir atención médica. Y si hay abuso de un menor, se reporta.",
      },
      { t: "versiculo", ref: "Proverbios 23:29-32" },
      {
        t: "parrafo",
        texto:
          "La Biblia también advierte sobre el alcohol: «No mires al vino cuando rojea», porque «al fin como serpiente morderá, Y como áspid dará dolor». Lo mismo pasa con otras adicciones: empiezan suaves y terminan dominando.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un joven al que encontraron vapeando" },
      {
        t: "lista",
        items: [
          "Paso 1, conversar sin escándalo: preguntar desde cuándo, cuánto y por qué empezó.",
          "Paso 2, escuchar lo que hay debajo: ansiedad, presión de los amigos, problemas en casa.",
          "Paso 3, la verdad con gracia: el cuerpo es de Dios, y la adicción quita la libertad.",
          "Paso 4, un plan: dejar los lugares y las amistades donde empezó, y tener a alguien con quien rendir cuentas.",
          "Paso 5, la familia y la ayuda profesional: hablar con sus padres y, si ya hay dependencia, buscar ayuda. La línea nacional de SAMHSA, 1-800-662-4357, orienta gratis, en inglés y en español, las 24 horas.",
          "Paso 6, seguir a su lado: celebrar cada semana limpia y no rendirse si recae.",
        ],
      },
    ],
    ideaClave:
      "La voluntad de Dios es la santificación, y el sexo es un regalo para el matrimonio; el joven huye de las pasiones juveniles y sigue la justicia con otros de corazón limpio, y Dios da la salida en la tentación. Un noviazgo sano tiene propósito, límites claros, la cercanía de la familia y un mentor, y el control, los celos, los insultos, la presión y la violencia son señales de una relación que hace daño. Las adicciones empiezan suaves y terminan dominando: el consejero conversa sin escándalo, busca lo que hay debajo, arma un plan con la familia y busca ayuda profesional.",
    paraLaVida: {
      texto: "No basta con huir: hay que seguir algo mejor, y con otros.",
      pregunta: "¿Con qué joven de tu iglesia podrías hablar de estos temas con claridad y con gracia?",
    },
  },
  {
    id: "juventud-3-6",
    objetivos: [
      "Explicar los límites de la confidencialidad en la consejería juvenil.",
      "Saber cuándo y a quién derivar a un joven.",
      "Armar una lista de ayuda para el ministerio juvenil.",
    ],
    paraEmpezar:
      "Un buen consejero sabe hasta dónde puede ayudar. Saber decir esto me supera, pero no te voy a dejar solo y vamos a buscar a quien te pueda ayudar más, también es amor.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "La confianza se cuida: «El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». Lo que un joven cuenta no se comenta con otros.",
      },
      { t: "subtitulo", texto: "Los límites de la confidencialidad" },
      {
        t: "lista",
        items: [
          "Si el joven corre peligro de quitarse la vida o de hacerse daño.",
          "Si cuenta un abuso o una negligencia, o si otro menor está en peligro.",
          "Si piensa hacerle daño a otra persona.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Esos límites se explican desde la primera conversación: lo que me cuentes queda entre nosotros, salvo que tú u otra persona estén en peligro. Así el joven sabe a qué atenerse, y nadie se siente traicionado.",
      },
      { t: "subtitulo", texto: "Lo que pide la ley en Texas" },
      {
        t: "lista",
        items: [
          "Toda persona que tiene causa razonable para creer que un menor sufre abuso o negligencia debe reportarlo de inmediato (Código de Familia, sección 261.101).",
          "Los profesionales, como los maestros, deben reportarlo a más tardar en 48 horas y no pueden pedirle a otro que lo haga por ellos.",
          "La obligación no tiene excepción para los pastores ni para las conversaciones confidenciales.",
          "Se reporta a la línea 1-800-252-5400 o, si hay peligro ahora, al 911.",
        ],
      },
      { t: "versiculo", ref: "Proverbios 11:14" },
      {
        t: "parrafo",
        texto:
          "Nadie aconseja solo: «Donde no hay dirección sabia, caerá el pueblo; Mas en la multitud de consejeros hay seguridad».",
      },
      { t: "versiculo", ref: "Proverbios 12:15" },
      {
        t: "parrafo",
        texto:
          "También el consejero necesita consejo: «El camino del necio es derecho en su opinión; Mas el que obedece al consejo es sabio». Pedir ayuda a otros es sabiduría.",
      },
      { t: "subtitulo", texto: "Cuándo derivar" },
      {
        t: "lista",
        items: [
          "Riesgo de suicidio o autolesiones.",
          "Abuso, violencia en la casa o en el noviazgo.",
          "Una adicción con dependencia.",
          "Dejar de comer, o comer y vomitar a escondidas.",
          "Escuchar voces o ver cosas que otros no ven.",
          "Una tristeza o una ansiedad que no mejora con el tiempo.",
          "Cualquier problema que supera la preparación del consejero.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la lista de ayuda del ministerio juvenil" },
      {
        t: "lista",
        items: [
          "Paso 1, las líneas de emergencia: el 911, el 988 para las crisis y la línea de Texas para reportar abuso, 1-800-252-5400.",
          "Paso 2, la orientación para las adicciones: la línea nacional de SAMHSA, 1-800-662-4357.",
          "Paso 3, los profesionales: dos o tres consejeros o psicólogos de confianza, de preferencia cristianos, que atiendan a jóvenes y hablen español.",
          "Paso 4, los médicos: un médico de familia y el centro de salud de la zona.",
          "Paso 5, la escuela: el consejero escolar, con quien los padres pueden hablar.",
          "Paso 6, guardarla y revisarla: la lista se imprime para todos los líderes y se revisa cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuida también tu propia alma: no aconsejes a solas a jóvenes del otro sexo, comparte las cargas con tu pastor y descansa. Un consejero agotado no puede ayudar a nadie.",
      },
    ],
    ideaClave:
      "El de espíritu fiel guarda el secreto, pero la confidencialidad tiene límites que se explican desde el principio: el peligro de quitarse la vida o de hacerse daño, el abuso o la negligencia, y el peligro para otros. En Texas, toda persona con causa razonable para creer que un menor sufre abuso debe reportarlo de inmediato, sin excepción para los pastores. En la multitud de consejeros hay seguridad: el consejero sabe cuándo derivar, tiene lista una lista de ayuda con el 911, el 988, la línea de Texas, SAMHSA, profesionales y médicos, y cuida su propia alma.",
    paraLaVida: {
      texto: "Saber cuándo derivar también es amor.",
      pregunta: "¿Qué números y nombres le faltan hoy a la lista de ayuda de tu ministerio juvenil?",
    },
  },
];
