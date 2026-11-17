/**
 * Especialidad Niñez · Materia 1 — Educación cristiana de la niñez (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Los fundamentos del ministerio con niños: por qué enseñarles, la familia y la iglesia juntas, Jesús y los niños,
 * los niños que sirvieron a Dios en la Biblia, una línea de tiempo de la enseñanza a los niños y la meta de formar
 * discípulos, con un ejemplo resuelto de los objetivos de un ministerio de niños.
 */
import type { LeccionContenido } from "../tipos";

export const NINEZ_1: LeccionContenido[] = [
  {
    id: "ninez-1-1",
    objetivos: [
      "Explicar el mandato bíblico de enseñar la fe a la generación que viene.",
      "Reconocer el lugar que Jesús dio a los niños.",
      "Describir la educación cristiana como formación de toda la persona.",
    ],
    paraEmpezar:
      "Muchos cristianos conocieron a Cristo cuando eran niños. Enseñar a los niños no es entretenerlos mientras los adultos están en el culto: es una de las tareas más importantes de la iglesia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Salmos 78:4-7" },
      {
        t: "parrafo",
        texto:
          "Israel tenía una tarea de generación en generación: «No las encubriremos a sus hijos, Contando a la generación venidera las alabanzas de Jehová, Y su potencia, y las maravillas que hizo». Y la meta era clara: «A fin de que pongan en Dios su confianza, Y no se olviden de las obras de Dios».",
      },
      { t: "versiculo", ref: "Deuteronomio 6:6-7" },
      {
        t: "parrafo",
        texto:
          "La fe se enseñaba en la vida diaria: las palabras de Dios estaban «sobre tu corazón», y los padres las repetían a sus hijos «estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes».",
      },
      { t: "versiculo", ref: "Mateo 19:14" },
      {
        t: "parrafo",
        texto:
          "Jesús corrigió a los discípulos que estorbaban a los niños: «Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos». Para Jesús, los niños no son solo el futuro de la iglesia: ya son parte de ella.",
      },
      { t: "subtitulo", texto: "Qué es la educación cristiana de la niñez" },
      {
        t: "lista",
        items: [
          "Es ayudar a los niños a conocer a Dios, a amarlo y a seguir a Jesús, según su edad.",
          "Forma a toda la persona: lo que el niño sabe, lo que siente y lo que hace.",
          "Se vive en la casa y en la iglesia, que trabajan juntas.",
          "No es solo entretener ni cuidar: es discipular.",
        ],
      },
      { t: "versiculo", ref: "Lucas 2:52" },
      {
        t: "parrafo",
        texto:
          "El mismo Jesús creció así: «Y Jesús crecía en sabiduría y en estatura, y en gracia para con Dios y los hombres». La educación cristiana acompaña al niño en todo su crecimiento: en su mente, en su cuerpo, en su relación con Dios y con los demás.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Mira cómo trata tu iglesia a los niños: ¿los ve como una molestia durante el culto, o como discípulos de Jesús? El primer paso de un buen ministerio de niños es cambiar esa mirada.",
      },
    ],
    ideaClave:
      "Dios mandó a su pueblo contar sus obras a la generación que viene, para que ponga en él su confianza, y la fe se enseñaba en la vida diaria. Jesús recibió a los niños y dijo que de ellos es el reino. La educación cristiana de la niñez ayuda a los niños a conocer, amar y seguir a Jesús según su edad, forma a toda la persona, como Jesús, que crecía en sabiduría, en estatura y en gracia, y se vive en la casa y en la iglesia.",
    paraLaVida: {
      texto: "Los niños no son solo la iglesia de mañana: son discípulos de hoy.",
      pregunta: "¿Cómo ve tu iglesia a sus niños: como una molestia o como discípulos?",
    },
  },
  {
    id: "ninez-1-2",
    objetivos: [
      "Explicar el papel de los padres como primeros maestros de la fe.",
      "Describir cómo la iglesia apoya a las familias sin reemplazarlas.",
      "Planear formas concretas de trabajar con los padres.",
    ],
    paraEmpezar:
      "Un niño pasa con su familia muchas más horas que en la iglesia. Por eso el ministerio de niños más fuerte es el que trabaja con los padres.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 1:5" },
      {
        t: "parrafo",
        texto:
          "Timoteo recibió la fe en su casa: «la fe no fingida que hay en ti, la cual habitó primero en tu abuela Loida, y en tu madre Eunice». Una abuela y una madre fueron sus primeras maestras.",
      },
      { t: "versiculo", ref: "2 Timoteo 3:14-15" },
      {
        t: "parrafo",
        texto:
          "Pablo le recuerda «que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación por la fe que es en Cristo Jesús». Lo que se siembra en la niñez da fruto toda la vida.",
      },
      { t: "versiculo", ref: "Efesios 6:4" },
      {
        t: "parrafo",
        texto:
          "La Biblia pone la tarea primero en los padres: «criadlos en disciplina y amonestación del Señor». La iglesia no reemplaza a la familia: la equipa y la acompaña.",
      },
      { t: "subtitulo", texto: "Cómo trabaja la iglesia con los padres" },
      {
        t: "lista",
        items: [
          "Contarles cada semana qué aprendieron sus hijos y darles una pregunta o una actividad para la casa.",
          "Enseñarles a orar, a leer la Biblia y a hablar de Dios con sus hijos en la vida diaria.",
          "Celebrar con ellos los pasos de fe de sus hijos: la presentación, la conversión y el bautismo.",
          "Acompañar con especial cuidado a los niños cuyos padres no creen, a las madres y los padres solos y a los abuelos que crían a sus nietos.",
          "Invitar a los padres a servir en el ministerio de niños.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Muchos niños llegan a la iglesia sin sus padres: los trae una tía, un vecino o el transporte de la iglesia. Para ellos, la iglesia es la única familia en la fe que tienen; trátalos con un cuidado especial y busca la manera de alcanzar también a su familia.",
      },
    ],
    ideaClave:
      "Los padres son los primeros maestros de la fe: Timoteo la recibió de su abuela y de su madre, y desde la niñez conoció las Escrituras. La Biblia pone la tarea en los padres, y la iglesia los equipa y los acompaña sin reemplazarlos: les cuenta lo que aprenden sus hijos, les enseña a hablar de Dios en casa, celebra los pasos de fe, cuida a los niños que llegan solos y a las familias distintas, e invita a los padres a servir.",
    paraLaVida: {
      texto: "La iglesia tiene a los niños una hora; la familia, toda la semana.",
      pregunta: "¿Qué puede hacer tu iglesia esta semana para ayudar a los padres a enseñar la fe en casa?",
    },
  },
  {
    id: "ninez-1-3",
    objetivos: [
      "Describir cómo trató Jesús a los niños.",
      "Explicar qué les enseñó Jesús a los adultos con un niño.",
      "Aplicar el ejemplo de Jesús al trato con los niños de la iglesia.",
    ],
    paraEmpezar:
      "En la cultura de su tiempo, los niños tenían poco lugar en la vida pública. Por eso sorprendió tanto que Jesús los pusiera en el centro.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 18:2-5" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos discutían quién era el mayor, Jesús llamó a un niño y «lo puso en medio de ellos». Les dijo: «si no os volvéis y os hacéis como niños, no entraréis en el reino de los cielos». Y agregó: «cualquiera que reciba en mi nombre a un niño como este, a mí me recibe».",
      },
      { t: "versiculo", ref: "Marcos 10:13-16" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos reprendieron a los que traían niños, Jesús «se indignó». Y «tomándolos en los brazos, poniendo las manos sobre ellos, los bendecía». Jesús tuvo tiempo, brazos y bendición para los niños.",
      },
      { t: "versiculo", ref: "Mateo 21:15-16" },
      {
        t: "parrafo",
        texto:
          "En el templo, los muchachos aclamaban «¡Hosanna al Hijo de David!», y los líderes se molestaron. Jesús les respondió con un salmo: «De la boca de los niños y de los que maman Perfeccionaste la alabanza». Los niños también adoran de verdad.",
      },
      { t: "subtitulo", texto: "Lo que Jesús nos enseña sobre los niños" },
      {
        t: "lista",
        items: [
          "Los niños tienen un lugar en el centro, no en el rincón.",
          "Recibir a un niño en el nombre de Jesús es recibir a Jesús.",
          "Los niños pueden creer, orar y adorar de verdad.",
          "Los adultos aprenden de ellos: la confianza y la humildad del niño son un ejemplo para entrar en el reino.",
          "Estorbar a un niño que viene a Jesús es algo que Jesús reprende.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Recibir a un niño también es cuidarlo: Jesús advirtió con mucha seriedad contra quien hace tropezar a uno de estos pequeños (Mateo 18:6). Por eso el amor por los niños va siempre junto con su protección, que se estudia en la materia Protección de menores.",
      },
    ],
    ideaClave:
      "Jesús puso a un niño en el centro, enseñó a los adultos a hacerse como niños para entrar en el reino y dijo que recibir a un niño en su nombre es recibirlo a él. Se indignó cuando estorbaban a los niños, los tomó en sus brazos y los bendijo, y defendió su alabanza en el templo. Por eso la iglesia da a los niños un lugar en el centro, cree que pueden creer y adorar, aprende de su confianza y los cuida.",
    paraLaVida: {
      texto: "Jesús tuvo tiempo, brazos y bendición para los niños.",
      pregunta: "¿Qué niño de tu iglesia necesita hoy que alguien le dedique tiempo?",
    },
  },
  {
    id: "ninez-1-4",
    objetivos: [
      "Reconocer cómo Dios habló y obró por medio de niños en la Biblia.",
      "Explicar qué enseñan esos relatos sobre la fe de un niño.",
      "Usar esos relatos para animar a los niños a servir a Dios.",
    ],
    paraEmpezar:
      "Dios no espera a que los niños crezcan para hablarles ni para usarlos. La Biblia está llena de niños y muchachos que escucharon a Dios y lo sirvieron.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=34biq4ivs5I", titulo: "Resumen del libro de 1 Samuel", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "1 Samuel 3:8-10" },
      {
        t: "parrafo",
        texto:
          "Samuel era un muchacho cuando Dios lo llamó. Elí le enseñó a responder: «Habla, Jehová, porque tu siervo oye», y Samuel dijo: «Habla, porque tu siervo oye». Un adulto que ayuda a un niño a reconocer la voz de Dios hace una obra eterna.",
      },
      { t: "versiculo", ref: "2 Reyes 5:2-3" },
      {
        t: "parrafo",
        texto:
          "Una muchacha cautiva, lejos de su casa, habló de Dios a su señora: «Si rogase mi señor al profeta que está en Samaria, él lo sanaría de su lepra». Su fe sencilla llevó a Naamán al Dios de Israel.",
      },
      { t: "versiculo", ref: "2 Crónicas 34:1-3" },
      {
        t: "parrafo",
        texto:
          "Josías empezó a reinar a los ocho años, y «siendo aún muchacho, comenzó a buscar al Dios de David su padre». Esa búsqueda temprana preparó una gran reforma en Judá.",
      },
      { t: "versiculo", ref: "Juan 6:9" },
      {
        t: "parrafo",
        texto:
          "En la multiplicación de los panes, todo empezó con lo que tenía un muchacho: «Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos». Jesús usó lo poco de un niño para alimentar a una multitud.",
      },
      { t: "subtitulo", texto: "Una línea de niños y jóvenes que sirvieron a Dios" },
      {
        t: "lista",
        items: [
          "Samuel: un muchacho que aprendió a escuchar a Dios en el santuario (1 Samuel 3).",
          "David: un joven pastor que confió en Dios frente a Goliat (1 Samuel 17).",
          "La muchacha de Israel: una cautiva que habló de Dios a Naamán (2 Reyes 5).",
          "Josías: un rey niño que buscó a Dios desde muchacho (2 Crónicas 34).",
          "Jesús a los doce años: en el templo, escuchando y preguntando a los maestros (Lucas 2:46).",
          "El muchacho de los panes: lo poco que entregó a Jesús alimentó a miles (Juan 6).",
          "Timoteo: conoció las Escrituras desde la niñez y llegó a ser colaborador de Pablo y líder de la iglesia (2 Timoteo 3:15).",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Al contar estas historias, no hagas del niño de la historia un héroe perfecto: muestra a Dios como el héroe que llama, escucha y usa a los pequeños. Y termina con una pregunta: ¿cómo puedes tú escuchar a Dios y servirle esta semana?",
      },
    ],
    ideaClave:
      "Dios habló a Samuel cuando era un muchacho, usó la fe de una muchacha cautiva para llevar a Naamán a él, movió a Josías a buscarlo desde joven y alimentó a una multitud con los panes de un muchacho. La Biblia está llena de niños y jóvenes que escucharon a Dios y lo sirvieron. Al contar sus historias, el maestro muestra que Dios es el héroe y anima a los niños a escucharlo y a servirle hoy.",
    paraLaVida: {
      texto: "Dios no espera a que los niños crezcan para hablarles.",
      pregunta: "¿Cómo puedes ayudar a un niño a reconocer la voz de Dios?",
    },
  },
  {
    id: "ninez-1-5",
    objetivos: [
      "Describir cómo el pueblo de Dios enseñó la fe a los niños a lo largo de la historia.",
      "Reconocer los aportes de la Reforma y de las escuelas dominicales.",
      "Valorar la tradición de enseñanza que hereda el ministerio de niños de hoy.",
    ],
    paraEmpezar:
      "El ministerio de niños no empezó con los programas de hoy. Desde los días de Israel, el pueblo de Dios buscó maneras de enseñar la fe a sus hijos.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 12:26-27" },
      {
        t: "parrafo",
        texto:
          "La Pascua era también una clase para los hijos: «cuando os dijeren vuestros hijos: ¿Qué es este rito vuestro?», los padres respondían contando cómo Dios «libró nuestras casas». La pregunta de un niño abría la historia de la salvación.",
      },
      { t: "versiculo", ref: "Nehemías 8:2-3" },
      {
        t: "parrafo",
        texto:
          "Cuando Esdras leyó la ley, estaban los hombres, las mujeres «y de todos los que podían entender». Los que tenían edad para entender también escuchaban la Palabra con el pueblo.",
      },
      { t: "versiculo", ref: "Hechos 2:39" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés, Pedro anunció: «Porque para vosotros es la promesa, y para vuestros hijos». Desde el principio, la iglesia supo que el evangelio era también para los niños.",
      },
      { t: "subtitulo", texto: "Una línea de tiempo de la enseñanza a los niños" },
      {
        t: "lista",
        items: [
          "En Israel: los padres enseñaban la ley en casa y en las fiestas, como la Pascua, cuando los hijos preguntaban qué significaba.",
          "En la iglesia antigua: los que se preparaban para el bautismo recibían una enseñanza ordenada, el catecumenado.",
          "En 1529: Martín Lutero publicó su Catecismo Menor para que los padres enseñaran la fe a sus hijos en casa.",
          "En 1658: el pedagogo moravo Juan Amós Comenio publicó el Orbis Pictus, uno de los primeros libros con imágenes para enseñar a los niños.",
          "En 1780: Robert Raikes abrió escuelas dominicales en Gloucester, Inglaterra, para enseñar a leer y la Biblia a niños pobres que trabajaban toda la semana.",
          "En el siglo XIX: las escuelas dominicales se extendieron por el mundo y llegaron a América Latina con los misioneros evangélicos.",
          "Hoy: los ministerios de niños, los cultos infantiles, los currículos por edades y las escuelas bíblicas de vacaciones siguen la misma tarea.",
        ],
      },
      {
        t: "nota",
        titulo: "Con respeto",
        texto:
          "Las iglesias han enseñado a los niños de distintas maneras: con catecismos, con escuelas dominicales o con cultos infantiles. Todas buscan lo mismo que Israel: contar a la generación que viene las obras de Dios.",
      },
    ],
    ideaClave:
      "Desde Israel, el pueblo de Dios enseñó la fe a sus hijos: en casa y en las fiestas, como la Pascua, y escuchando la Palabra con el pueblo. En Pentecostés, la promesa fue también para los hijos. Después vinieron el catecumenado de la iglesia antigua, el Catecismo Menor de Lutero en 1529, el Orbis Pictus de Comenio en 1658, las escuelas dominicales de Robert Raikes en 1780 y su expansión con las misiones. El ministerio de niños de hoy hereda esa tarea.",
    paraLaVida: {
      texto: "Somos un eslabón en la cadena que cuenta las obras de Dios a la generación que viene.",
      pregunta: "¿Quién te enseñó la fe cuando eras niño, y qué aprendiste de esa persona?",
    },
  },
  {
    id: "ninez-1-6",
    objetivos: [
      "Explicar la meta de la educación cristiana de la niñez.",
      "Distinguir entre enseñar datos y formar discípulos.",
      "Escribir los objetivos de un ministerio de niños.",
    ],
    paraEmpezar:
      "Un niño puede saberse todas las historias de la Biblia y no amar a Dios. La meta de la educación cristiana es más alta: formar discípulos de Jesús.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=i4C_o1AtR9o", titulo: "Libro de Proverbios: ¿cómo vivir una vida buena?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Mateo 22:37-39" },
      {
        t: "parrafo",
        texto:
          "Jesús resumió la ley en dos mandamientos: «Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente», y «Amarás a tu prójimo como a ti mismo». Esa es también la meta con los niños: que amen a Dios y a los demás.",
      },
      { t: "versiculo", ref: "Proverbios 22:6" },
      {
        t: "parrafo",
        texto:
          "«Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él». El proverbio no es una garantía automática, sino un principio de sabiduría: lo que se siembra en la niñez deja raíces para toda la vida.",
      },
      { t: "versiculo", ref: "3 Juan 1:4" },
      {
        t: "parrafo",
        texto:
          "Juan lo dice como un padre en la fe: «No tengo yo mayor gozo que este, el oír que mis hijos andan en la verdad». El fruto no es solo saber, sino andar en la verdad.",
      },
      { t: "subtitulo", texto: "Enseñar datos y formar discípulos" },
      {
        t: "lista",
        items: [
          "Enseñar datos busca que el niño repita; formar discípulos busca que el niño ame y obedezca.",
          "Enseñar datos termina con la clase; formar discípulos sigue en la casa y en la vida.",
          "Enseñar datos mira lo que el niño sabe; formar discípulos mira también lo que siente y lo que hace.",
          "Enseñar datos premia la memoria; formar discípulos celebra también la fe, la oración y el servicio.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: los objetivos de un ministerio de niños" },
      {
        t: "lista",
        items: [
          "Conocer: que cada niño conozca las grandes historias de la Biblia y el evangelio, según su edad.",
          "Creer: que cada niño tenga la oportunidad de recibir a Cristo, sin presión.",
          "Amar: que cada niño aprenda a orar, a adorar y a amar a Dios y a los demás.",
          "Servir: que cada niño tenga una manera de servir en la iglesia y en su casa.",
          "Pertenecer: que cada niño tenga un adulto de la iglesia que lo conozca por su nombre.",
          "Acompañar: que cada familia reciba ayuda para enseñar la fe en casa.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Escribe los objetivos de tu ministerio de niños y revísalos cada año con los maestros y con los padres. Lo que no se escribe se olvida, y lo que no se revisa se vuelve costumbre.",
      },
    ],
    ideaClave:
      "La meta de la educación cristiana de la niñez es formar discípulos que amen a Dios con todo su ser y al prójimo como a sí mismos. Lo que se siembra en la niñez deja raíces para toda la vida, y el gozo mayor es ver a los hijos andar en la verdad. Formar discípulos va más allá de enseñar datos: busca que el niño conozca, crea, ame, sirva y pertenezca, y los objetivos del ministerio se escriben y se revisan cada año.",
    paraLaVida: {
      texto: "Un niño que sabe la Biblia es una bendición; un niño que ama a Dios es un discípulo.",
      pregunta: "¿Cuál de los seis objetivos le falta más a tu ministerio de niños?",
    },
  },
];
