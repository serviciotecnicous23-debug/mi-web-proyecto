/**
 * Nivel 4 · Materia 2 — Teología sistemática II: Cristo y el Espíritu Santo (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La cristología y la pneumatología, con los artículos 3, 4, 9, 10 y 11 de la declaración de fe: la deidad de Cristo y
 * Nicea (325), su humanidad y Calcedonia (451), su obra en la cruz, sus oficios y su exaltación, la deidad y la
 * personalidad del Espíritu y Constantinopla (381), y los dones y el bautismo en el Espíritu. Quedan por confirmar las
 * lenguas como señal inicial y la sanidad en la expiación: se presentan las posiciones con respeto.
 */
import type { LeccionContenido } from "../tipos";

export const N4_SISTEMATICA_2: LeccionContenido[] = [
  {
    id: "n4-sistematica-2-1",
    objetivos: [
      "Demostrar con la Escritura la deidad de Jesucristo.",
      "Explicar el error de Arrio y lo que afirmó el concilio de Nicea.",
      "Valorar por qué la deidad de Cristo es necesaria para la salvación.",
    ],
    paraEmpezar:
      "La pregunta sobre quién es Jesús dividió a la iglesia en el siglo IV y sigue dividiendo hoy a muchos grupos. La teología sistemática responde con lo que dice toda la Escritura.",
    bloques: [
      { t: "versiculo", ref: "Colosenses 2:9" },
      {
        t: "parrafo",
        texto:
          "Pablo lo dice sin rodeos: «Porque en él habita corporalmente toda la plenitud de la Deidad». Es el versículo de memoria de esta materia. En Cristo no hay una parte de Dios ni un reflejo: está toda la plenitud de la Deidad, y en un cuerpo humano.",
      },
      { t: "versiculo", ref: "Juan 1:1-3" },
      {
        t: "parrafo",
        texto:
          "Juan presenta al Verbo eterno: «En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios». Y lo pone fuera de lo creado: «Todas las cosas por él fueron hechas». Si todo lo hecho fue hecho por él, él no fue hecho.",
      },
      { t: "versiculo", ref: "Juan 8:58" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo afirmó su eternidad: «Antes que Abraham fuese, yo soy». Usó el nombre con que Dios se reveló a Moisés, y por eso sus oyentes tomaron piedras para apedrearlo.",
      },
      { t: "versiculo", ref: "Hebreos 1:3" },
      { t: "versiculo", ref: "Hebreos 1:8" },
      { t: "versiculo", ref: "Juan 20:28" },
      {
        t: "parrafo",
        texto:
          "Hebreos lo llama «el resplandor de su gloria, y la imagen misma de su sustancia», y le aplica las palabras «Tu trono, oh Dios, por el siglo del siglo». Tomás, ante el resucitado, confesó: «¡Señor mío, y Dios mío!», y Jesús aceptó esa adoración.",
      },
      { t: "subtitulo", texto: "Arrio y el concilio de Nicea" },
      {
        t: "parrafo",
        texto:
          "A comienzos del siglo IV, Arrio, un presbítero de Alejandría, enseñó que el Hijo era la primera y más alta criatura, pero no Dios eterno. En el año 325 el concilio de Nicea afirmó que el Hijo es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios. Hoy algunos grupos repiten la idea de Arrio, y el obrero debe saber responder con la Escritura.",
      },
      {
        t: "nota",
        titulo: "Por qué importa",
        texto:
          "Solo Dios puede salvar, y solo un sacrificio de valor infinito puede pagar por los pecados del mundo. Si Cristo no fuera Dios, no podría ser nuestro Salvador ni podríamos adorarlo sin idolatría.",
      },
    ],
    ideaClave:
      "Jesucristo es verdadero Dios: en él habita corporalmente toda la plenitud de la Deidad. El Verbo era Dios y todo fue hecho por él; antes que Abraham fuese, él es; Hebreos lo llama Dios, y Tomás lo adoró como Señor y Dios. Contra Arrio, el concilio de Nicea afirmó en el año 325 que el Hijo es de la misma sustancia que el Padre. Solo un Cristo divino puede salvar.",
    paraLaVida: {
      texto: "Adorar a Jesús no es exagerar: es darle lo que le corresponde como Dios.",
      pregunta: "¿Cómo responderías, con la Biblia, a alguien que dice que Jesús fue solo la primera criatura de Dios?",
    },
  },
  {
    id: "n4-sistematica-2-2",
    objetivos: [
      "Explicar la verdadera humanidad de Cristo.",
      "Describir la unión de las dos naturalezas en una persona según Calcedonia.",
      "Reconocer los errores sobre la persona de Cristo y por qué el mediador es Dios y hombre.",
    ],
    paraEmpezar: "Afirmar que Jesús es Dios no basta. La Biblia insiste en que también es hombre de verdad, y la iglesia tuvo que aprender a decir las dos cosas a la vez.",
    bloques: [
      { t: "versiculo", ref: "Hebreos 2:14-17" },
      {
        t: "parrafo",
        texto:
          "El Hijo tomó nuestra naturaleza: «por cuanto los hijos participaron de carne y sangre, él también participó de lo mismo». Y tenía que ser así: «debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote».",
      },
      { t: "versiculo", ref: "Lucas 2:52" },
      {
        t: "parrafo",
        texto: "Su humanidad fue completa: «Jesús crecía en sabiduría y en estatura». Tuvo hambre, se cansó, lloró y murió. No fue un Dios disfrazado de hombre.",
      },
      { t: "versiculo", ref: "Filipenses 2:5-11" },
      {
        t: "parrafo",
        texto:
          "Pablo describe la encarnación: «siendo en forma de Dios», el Hijo «se despojó a sí mismo, tomando forma de siervo». No dejó de ser Dios: tomó la condición de siervo y se humilló «hasta la muerte, y muerte de cruz». Por eso Dios «le exaltó hasta lo sumo».",
      },
      { t: "subtitulo", texto: "Una persona, dos naturalezas" },
      {
        t: "parrafo",
        texto:
          "En el año 451, el concilio de Calcedonia resumió la enseñanza bíblica: Cristo es una sola persona en dos naturalezas, la divina y la humana, unidas sin mezclarse ni cambiar, y sin dividirse ni separarse. Los teólogos llaman a esta unión la unión hipostática.",
      },
      {
        t: "lista",
        items: [
          "El docetismo decía que Jesús solo parecía hombre: niega su humanidad.",
          "El arrianismo decía que era una criatura: niega su deidad.",
          "El nestorianismo lo dividía en dos personas.",
          "El eutiquianismo mezclaba las dos naturalezas en una sola.",
          "La fe bíblica confiesa a un solo Cristo, verdadero Dios y verdadero hombre.",
        ],
      },
      { t: "versiculo", ref: "1 Timoteo 2:5" },
      {
        t: "parrafo",
        texto:
          "Por eso puede ser mediador: «hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre». Como hombre, nos representa; como Dios, su obra tiene valor infinito.",
      },
    ],
    ideaClave:
      "Cristo es verdadero hombre: participó de carne y sangre y crecía en sabiduría y en estatura. Siendo en forma de Dios, se despojó a sí mismo tomando forma de siervo, sin dejar de ser Dios. Calcedonia, en el año 451, confesó una sola persona en dos naturalezas, sin mezcla ni división, contra el docetismo, el nestorianismo y el eutiquianismo. Por eso es el único mediador.",
    paraLaVida: {
      texto: "Jesús sabe lo que vives, porque fue hombre como tú.",
      pregunta: "¿Qué te consuela más: que Jesús es Dios, o que fue en todo semejante a ti?",
    },
  },
  {
    id: "n4-sistematica-2-3",
    objetivos: [
      "Explicar la expiación sustitutiva de Cristo.",
      "Definir rescate, redención, propiciación y justificación con sus pasajes.",
      "Reconocer las posiciones sobre la sanidad en la expiación que el ministerio debe confirmar.",
    ],
    paraEmpezar: "El centro del evangelio es lo que Cristo hizo en la cruz. La Biblia lo explica con varias palabras, y cada una muestra un lado de la misma obra.",
    bloques: [
      { t: "versiculo", ref: "Isaías 53:5-6" },
      {
        t: "parrafo",
        texto:
          "Isaías lo anunció como una sustitución: «él herido fue por nuestras rebeliones, molido por nuestros pecados», y «Jehová cargó en él el pecado de todos nosotros». Cristo ocupó nuestro lugar.",
      },
      { t: "versiculo", ref: "2 Corintios 5:21" },
      {
        t: "parrafo",
        texto: "Pablo lo resume: «Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él».",
      },
      { t: "subtitulo", texto: "Las palabras de la cruz" },
      { t: "versiculo", ref: "Marcos 10:45" },
      { t: "versiculo", ref: "Romanos 3:24-26" },
      {
        t: "lista",
        items: [
          "Rescate: Jesús vino «para dar su vida en rescate por muchos».",
          "Redención: el pago que nos libera; somos justificados «mediante la redención que es en Cristo Jesús».",
          "Propiciación: Dios lo puso «como propiciación por medio de la fe en su sangre»; su justicia queda satisfecha.",
          "Justificación: Dios es «el justo, y el que justifica al que es de la fe de Jesús».",
        ],
      },
      { t: "versiculo", ref: "Hebreos 9:12" },
      {
        t: "parrafo",
        texto:
          "Y es una obra completa: Cristo entró «una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención». No hace falta repetirla ni añadirle nada.",
      },
      { t: "versiculo", ref: "1 Pedro 2:24" },
      {
        t: "nota",
        titulo: "Un punto por confirmar: la sanidad en la expiación",
        texto:
          "El pentecostalismo clásico enseña que la sanidad del cuerpo está provista en la cruz, y lee así Isaías 53 y 1 Pedro 2:24: «por cuya herida fuisteis sanados». Otros entienden que ese versículo habla sobre todo de la sanidad del pecado, por su contexto, y presentan la sanidad como una promesa de Dios en respuesta a la oración. La posición del ministerio es un punto de la declaración de fe por confirmar.",
      },
    ],
    ideaClave:
      "En la cruz, Cristo murió en nuestro lugar: herido por nuestras rebeliones, hecho pecado por nosotros para que fuésemos justicia de Dios en él. La Biblia lo explica como rescate, redención, propiciación y justificación, y es una obra completa: entró una vez para siempre, habiendo obtenido eterna redención. Si la sanidad del cuerpo está provista en la expiación es un punto por confirmar.",
    paraLaVida: {
      texto: "A la obra de Cristo no le falta nada: no hay que añadirle méritos.",
      pregunta: "¿Cuál de las palabras de la cruz te ayuda más a explicar el evangelio a otros?",
    },
  },
  {
    id: "n4-sistematica-2-4",
    objetivos: [
      "Explicar los tres oficios de Cristo: profeta, sacerdote y rey.",
      "Analizar la importancia de la resurrección corporal de Cristo.",
      "Describir su ascensión, su lugar a la diestra del Padre y su intercesión.",
    ],
    paraEmpezar: "La obra de Cristo no terminó en la cruz. Resucitó, subió al cielo y hoy reina e intercede. La teología lo resume en sus tres oficios.",
    bloques: [
      { t: "subtitulo", texto: "Profeta, sacerdote y rey" },
      { t: "versiculo", ref: "Deuteronomio 18:15" },
      { t: "versiculo", ref: "Hebreos 4:14" },
      { t: "versiculo", ref: "Apocalipsis 19:16" },
      {
        t: "parrafo",
        texto:
          "Moisés anunció a un profeta como él: «a él oiréis». Cristo es el profeta que nos revela a Dios. Es «un gran sumo sacerdote que traspasó los cielos», que se ofreció a sí mismo. Y es el rey: en su vestidura tiene escrito «REY DE REYES Y SEÑOR DE SEÑORES».",
      },
      { t: "subtitulo", texto: "La resurrección corporal" },
      { t: "versiculo", ref: "1 Corintios 15:3-8" },
      {
        t: "parrafo",
        texto:
          "La resurrección fue un hecho con testigos: «apareció a Cefas, y después a los doce», y «a más de quinientos hermanos a la vez, de los cuales muchos viven aún». Pablo invitaba a preguntarles.",
      },
      { t: "versiculo", ref: "1 Corintios 15:17-20" },
      {
        t: "parrafo",
        texto:
          "Todo depende de ella: «si Cristo no resucitó, vuestra fe es vana; aún estáis en vuestros pecados». Pero «ahora Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho»: su resurrección garantiza la nuestra.",
      },
      { t: "subtitulo", texto: "La ascensión y la intercesión" },
      { t: "versiculo", ref: "Hechos 1:9-11" },
      { t: "versiculo", ref: "Hebreos 7:25" },
      { t: "versiculo", ref: "Romanos 8:34" },
      {
        t: "parrafo",
        texto:
          "Ante los discípulos, «fue alzado, y le recibió una nube», con la promesa de que volverá igual. Hoy está a la diestra de Dios y vive «siempre para interceder por ellos». Por eso Pablo pregunta: «¿Quién es el que condenará?».",
      },
    ],
    ideaClave:
      "Cristo es profeta, sacerdote y rey: nos revela a Dios, se ofreció a sí mismo como gran sumo sacerdote y es Rey de reyes. Resucitó corporalmente, con muchos testigos, y sin su resurrección nuestra fe sería vana; es primicias de los que durmieron. Subió al cielo, está a la diestra de Dios y vive siempre para interceder por los suyos.",
    paraLaVida: {
      texto: "El Cristo que murió por ti hoy vive, reina e intercede por ti.",
      pregunta: "¿Cuál de los tres oficios de Cristo necesitas recordar más en esta etapa de tu ministerio?",
    },
  },
  {
    id: "n4-sistematica-2-5",
    objetivos: [
      "Demostrar con la Escritura la deidad y la personalidad del Espíritu Santo.",
      "Explicar lo que afirmó el concilio de Constantinopla sobre el Espíritu.",
      "Describir la relación del Espíritu con el Padre y con el Hijo.",
    ],
    paraEmpezar:
      "En el Nivel 3 se estudió la obra del Espíritu en la vida del obrero. Aquí se ordena la doctrina: quién es el Espíritu Santo y cómo lo confesó la iglesia.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 2:10-11" },
      { t: "versiculo", ref: "Salmos 139:7-8" },
      {
        t: "parrafo",
        texto:
          "El Espíritu tiene atributos que solo tiene Dios. Conoce todo: «el Espíritu todo lo escudriña, aun lo profundo de Dios». Está en todo lugar: «¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?».",
      },
      { t: "versiculo", ref: "Hechos 13:2" },
      {
        t: "parrafo",
        texto:
          "Y actúa como una persona: en Antioquía, «dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado». Habla, llama y envía.",
      },
      { t: "versiculo", ref: "Juan 15:26" },
      {
        t: "parrafo",
        texto:
          "Jesús explicó su relación con el Padre y el Hijo: es el Consolador «a quien yo os enviaré del Padre, el Espíritu de verdad, el cual procede del Padre». Siglos después, las iglesias de Oriente y de Occidente discutieron si procede también del Hijo; la Biblia afirma que procede del Padre y que el Hijo lo envía.",
      },
      { t: "subtitulo", texto: "El concilio de Constantinopla" },
      {
        t: "parrafo",
        texto:
          "Cuando algunos negaron que el Espíritu fuera Dios, el concilio de Constantinopla, en el año 381, lo confesó como el Señor y dador de vida, que con el Padre y el Hijo es adorado y glorificado. Así la iglesia completó su confesión de la Trinidad, como enseña el artículo 2 de la declaración de fe.",
      },
      {
        t: "lista",
        items: [
          "Es omnisciente: escudriña aun lo profundo de Dios.",
          "Es omnipresente: nadie puede huir de su presencia.",
          "Es una persona: habla, llama y envía.",
          "Procede del Padre y es enviado por el Hijo.",
          "Con el Padre y el Hijo es adorado y glorificado.",
        ],
      },
    ],
    ideaClave:
      "El Espíritu Santo es Dios: escudriña aun lo profundo de Dios y está en todo lugar. Es una persona: habla, llama y envía, como en Antioquía. Procede del Padre y es enviado por el Hijo. El concilio de Constantinopla, en el año 381, lo confesó como Señor y dador de vida, adorado y glorificado con el Padre y el Hijo.",
    paraLaVida: {
      texto: "Al Espíritu Santo también se le adora.",
      pregunta: "¿Incluyes al Espíritu Santo en tu adoración y en tu oración, o solo le pides poder?",
    },
  },
  {
    id: "n4-sistematica-2-6",
    objetivos: [
      "Clasificar los dones del Espíritu de 1 Corintios 12.",
      "Comparar el continuismo y el cesacionismo, y explicar por qué la declaración de fe enseña que los dones siguen vigentes.",
      "Evaluar con la Escritura las manifestaciones espirituales y reconocer el punto por confirmar sobre las lenguas.",
    ],
    paraEmpezar:
      "La teología pentecostal se distingue por lo que enseña sobre el bautismo en el Espíritu y los dones. El líder debe saber explicarlo con orden y con argumentos bíblicos.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 12:7-11" },
      {
        t: "parrafo",
        texto:
          "Pablo nombra nueve manifestaciones, dadas «para provecho». Muchos maestros pentecostales las agrupan en tres: dones de revelación (palabra de sabiduría, palabra de ciencia y discernimiento de espíritus), dones de poder (fe, sanidades y milagros) y dones de expresión (profecía, lenguas e interpretación). Todas las hace «uno y el mismo Espíritu».",
      },
      { t: "subtitulo", texto: "¿Siguen vigentes los dones?" },
      { t: "versiculo", ref: "1 Corintios 13:8-10" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que las profecías y las lenguas cesarán «cuando venga lo perfecto». Los cesacionistas creen que lo perfecto es la Biblia completa, y que ciertos dones terminaron con los apóstoles. Los continuistas, como la tradición pentecostal, entienden que lo perfecto llegará con la venida de Cristo, y que hasta entonces los dones siguen. El artículo 10 de la declaración de fe enseña que los dones siguen vigentes hoy.",
      },
      { t: "versiculo", ref: "1 Corintios 14:39-40" },
      {
        t: "parrafo",
        texto: "Y Pablo da el equilibrio: «procurad profetizar, y no impidáis el hablar lenguas; pero hágase todo decentemente y con orden».",
      },
      { t: "subtitulo", texto: "El bautismo en el Espíritu y el discernimiento" },
      { t: "versiculo", ref: "Hechos 2:38-39" },
      {
        t: "parrafo",
        texto:
          "La promesa sigue: «Porque para vosotros es la promesa, y para vuestros hijos, y para todos los que están lejos». El artículo 9 enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento, que puede seguirlo y que da poder para testificar y servir.",
      },
      { t: "versiculo", ref: "1 Juan 4:1-3" },
      {
        t: "parrafo",
        texto:
          "Toda manifestación se examina: «no creáis a todo espíritu, sino probad los espíritus si son de Dios». La primera prueba es Cristo: «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».",
      },
      {
        t: "nota",
        titulo: "Un punto por confirmar: las lenguas como señal",
        texto:
          "Las Asambleas de Dios enseñan que hablar en lenguas es la señal física inicial y necesaria del bautismo en el Espíritu. Otras iglesias pentecostales lo esperan como una manifestación, sin hacerlo la única señal. La posición del ministerio es un punto de la declaración de fe por confirmar.",
      },
    ],
    ideaClave:
      "Las nueve manifestaciones de 1 Corintios 12 suelen agruparse en dones de revelación, de poder y de expresión, y todas las hace el mismo Espíritu. Contra el cesacionismo, la declaración de fe enseña que los dones siguen vigentes hasta que venga lo perfecto, ejercidos con orden. El bautismo en el Espíritu da poder para servir, y toda manifestación se prueba confesando a Cristo venido en carne. Las lenguas como señal quedan por confirmar.",
    paraLaVida: {
      texto: "Procurar los dones y probar los espíritus van juntos.",
      pregunta: "¿Cómo enseñarías a tu iglesia a desear los dones y, a la vez, a examinarlo todo?",
    },
  },
];
