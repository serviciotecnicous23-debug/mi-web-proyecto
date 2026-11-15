/**
 * Nivel 4 · Materia 8 — Historia de la iglesia II (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts): las palabras de personajes
 * de la historia van sin comillas.
 * Sigue a Historia de la iglesia I: la Reforma, los avivamientos, las misiones modernas, el movimiento pentecostal y la
 * iglesia evangélica en América Latina y entre los hispanos de los Estados Unidos. Fechas y hechos comprobados en
 * González, Historia del cristianismo (Unilit), y Deiros, Historia del cristianismo en América Latina (Mundo Hispano).
 * La lección del pentecostalismo cuenta la historia; la doctrina del bautismo en el Espíritu es de otra materia.
 */
import type { LeccionContenido } from "../tipos";

export const N4_HISTORIA_2: LeccionContenido[] = [
  {
    id: "n4-historia-2-1",
    objetivos: [
      "Explicar las causas de la Reforma y el papel de Martín Lutero.",
      "Describir los principios de la Reforma: solo la Escritura, solo la gracia, solo la fe y solo Cristo.",
      "Valorar la Biblia en la lengua del pueblo como fruto de la Reforma.",
    ],
    paraEmpezar:
      "Un monje alemán lleno de angustia buscaba cómo encontrar a un Dios misericordioso. La respuesta la halló en la carta a los Romanos, y cambió la historia.",
    bloques: [
      { t: "versiculo", ref: "Romanos 1:16-17" },
      {
        t: "parrafo",
        texto:
          "Martín Lutero (1483-1546), monje y profesor de Biblia en Wittenberg, no encontraba paz con sus esfuerzos religiosos. Al estudiar Romanos entendió que en el evangelio «la justicia de Dios se revela por fe y para fe, como está escrito: Mas el justo por la fe vivirá». La justicia que Dios pide, Dios mismo la da por gracia a quien cree en Cristo. Es el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "Las 95 tesis y Worms" },
      {
        t: "parrafo",
        texto:
          "En aquel tiempo se vendían indulgencias: documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero. El 31 de octubre de 1517, Lutero publicó sus 95 tesis contra ese abuso. En 1521, ante la Dieta de Worms, se negó a retractarse si no lo convencían con la Escritura y con razones claras. Escondido después en el castillo de Wartburgo, tradujo el Nuevo Testamento al alemán, que se publicó en 1522.",
      },
      { t: "subtitulo", texto: "Los principios de la Reforma" },
      {
        t: "lista",
        items: [
          "Solo la Escritura: la Biblia es la autoridad final, por encima de las tradiciones.",
          "Solo la gracia: la salvación es un regalo que no merecemos.",
          "Solo la fe: somos justificados por la fe en Cristo, no por obras.",
          "Solo Cristo: él es el único mediador entre Dios y los hombres (1 Timoteo 2:5).",
          "Además, el sacerdocio de todos los creyentes: todo creyente tiene acceso a Dios por Cristo (1 Pedro 2:9).",
        ],
      },
      { t: "versiculo", ref: "Efesios 2:8-9" },
      {
        t: "parrafo",
        texto:
          "La Reforma recuperó el corazón del evangelio: «Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "nota",
        titulo: "Reformar no es dividir por dividir",
        texto:
          "Lutero no quería fundar otra iglesia, sino llamar a la iglesia de su tiempo a volver a la Biblia. La Reforma nos recuerda que toda iglesia necesita examinarse a la luz de la Escritura.",
      },
    ],
    ideaClave:
      "Martín Lutero descubrió en Romanos que el justo por la fe vivirá. En 1517 publicó sus 95 tesis contra las indulgencias; en 1521 se negó en Worms a retractarse sin pruebas de la Escritura; y en 1522 publicó el Nuevo Testamento en alemán. La Reforma recuperó solo la Escritura, solo la gracia, solo la fe y solo Cristo.",
    paraLaVida: {
      texto: "Tu salvación no depende de tus obras, sino de la gracia de Dios en Cristo.",
      pregunta: "¿Qué cambia en tu vida diaria saber que eres justificado solo por la fe en Cristo?",
    },
  },
  {
    id: "n4-historia-2-2",
    objetivos: [
      "Describir la obra de Zuinglio, Calvino y los anabautistas.",
      "Explicar la Reforma en Inglaterra y en el mundo hispano.",
      "Reconocer la respuesta católica del Concilio de Trento.",
    ],
    paraEmpezar:
      "La Reforma no fue obra de un solo hombre. En distintos países, otros creyentes también llamaron a volver a la Biblia, y a veces lo pagaron con su vida.",
    bloques: [
      { t: "versiculo", ref: "Hechos 17:11" },
      {
        t: "parrafo",
        texto:
          "Como los de Berea, que escudriñaban «cada día las Escrituras para ver si estas cosas eran así», los reformadores quisieron examinarlo todo a la luz de la Biblia.",
      },
      {
        t: "lista",
        items: [
          "Ulrico Zuinglio comenzó en 1519 a predicar la Biblia libro por libro en Zúrich, Suiza.",
          "Juan Calvino publicó la Institución de la religión cristiana (1536) y enseñó en Ginebra; su teología marcó a las iglesias reformadas y presbiterianas.",
          "Los anabautistas, desde 1525, bautizaron solo a los creyentes que confesaban su fe y pidieron que la iglesia no dependiera del Estado; fueron perseguidos por católicos y protestantes.",
          "En Inglaterra, William Tyndale tradujo el Nuevo Testamento al inglés (1526) y murió ejecutado en 1536.",
        ],
      },
      { t: "subtitulo", texto: "La Reforma en el mundo hispano" },
      {
        t: "parrafo",
        texto:
          "También en España hubo creyentes que abrazaron la Reforma, y muchos fueron perseguidos por la Inquisición. Algunos huyeron, como un grupo de monjes del monasterio de San Isidoro del Campo, en Sevilla. Uno de ellos, Casiodoro de Reina, publicó en 1569 la primera Biblia completa traducida al español de los idiomas originales, la Biblia del Oso, y otro, Cipriano de Valera, la revisó en 1602. De esa obra viene la Reina-Valera.",
      },
      { t: "versiculo", ref: "Isaías 40:8" },
      { t: "subtitulo", texto: "La respuesta católica" },
      {
        t: "parrafo",
        texto:
          "La Iglesia católica respondió con el Concilio de Trento (1545-1563), que corrigió algunos abusos, pero rechazó la justificación solo por la fe y declaró que la tradición se recibe con la misma reverencia que la Escritura. Desde entonces, católicos y protestantes siguieron caminos separados.",
      },
      {
        t: "nota",
        titulo: "La Biblia costó sangre",
        texto:
          "Tyndale, los anabautistas y los creyentes españoles perseguidos nos recuerdan que la Biblia en nuestro idioma costó sangre. Leámosla con gratitud.",
      },
    ],
    ideaClave:
      "La Reforma se extendió con Zuinglio en Zúrich (1519), Calvino en Ginebra y los anabautistas (1525), que bautizaban a creyentes; en Inglaterra, Tyndale tradujo el Nuevo Testamento y murió por ello. En España, Casiodoro de Reina publicó en 1569 la Biblia del Oso, revisada por Valera en 1602. Trento (1545-1563) rechazó la justificación solo por la fe.",
    paraLaVida: {
      texto: "Tu Biblia en español es un regalo que otros pagaron muy caro.",
      pregunta: "¿Cómo puedes honrar esta semana el sacrificio de los que tradujeron la Biblia a tu idioma?",
    },
  },
  {
    id: "n4-historia-2-3",
    objetivos: [
      "Describir el aporte de los puritanos, los pietistas y los moravos.",
      "Explicar la conversión de Juan Wesley y el avivamiento metodista.",
      "Describir el Gran Despertar con Jonathan Edwards y George Whitefield.",
    ],
    paraEmpezar:
      "Después de la Reforma, muchas iglesias tenían la doctrina correcta, pero poca vida. Dios levantó movimientos que llamaron a una fe del corazón.",
    bloques: [
      { t: "versiculo", ref: "Habacuc 3:2" },
      {
        t: "parrafo",
        texto:
          "Habacuc oró: «Oh Jehová, aviva tu obra en medio de los tiempos». A lo largo de los siglos XVII y XVIII, Dios respondió oraciones así con movimientos de renovación.",
      },
      {
        t: "lista",
        items: [
          "Los puritanos, en Inglaterra, buscaron purificar la iglesia y vivir toda la vida bajo la Palabra; muchos emigraron a América.",
          "El pietismo alemán, con Felipe Jacobo Spener y Augusto Francke, llamó a la piedad personal, al estudio de la Biblia en grupos y a las obras de misericordia.",
          "Los moravos, en Herrnhut, comenzaron en 1727 una cadena de oración que duró unos cien años, y enviaron misioneros a muchos lugares del mundo.",
        ],
      },
      { t: "subtitulo", texto: "Juan Wesley" },
      { t: "versiculo", ref: "Romanos 8:16" },
      {
        t: "parrafo",
        texto:
          "Juan Wesley (1703-1791), ministro anglicano, había servido con disciplina, pero sin paz. El 24 de mayo de 1738, en una reunión en la calle Aldersgate de Londres, mientras se leía el prefacio de Lutero a la carta a los Romanos, sintió que su corazón ardía de una manera extraña y recibió la seguridad de que Cristo había quitado sus pecados: «El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios». Predicó al aire libre durante décadas, y los grupos metodistas cuidaron a miles de nuevos creyentes.",
      },
      { t: "subtitulo", texto: "El Gran Despertar" },
      {
        t: "parrafo",
        texto:
          "En las colonias inglesas de América, desde la década de 1730, hubo un gran despertar espiritual. Jonathan Edwards predicaba con profundidad en Massachusetts, y George Whitefield, amigo de Wesley, predicó al aire libre a multitudes a los dos lados del Atlántico.",
      },
      {
        t: "nota",
        titulo: "Doctrina y vida",
        texto:
          "Los avivamientos unieron la sana doctrina con una fe viva: conversión personal, santidad, oración y misión. Una cosa sin la otra se enfría o se desvía.",
      },
    ],
    ideaClave:
      "Después de la Reforma, Dios levantó movimientos de renovación: los puritanos, los pietistas y los moravos, que oraron sin parar unos cien años desde 1727. Juan Wesley recibió en 1738 la seguridad de su salvación y predicó por décadas, y en el Gran Despertar predicaron Jonathan Edwards y George Whitefield.",
    paraLaVida: {
      texto: "La sana doctrina y el corazón encendido van juntos.",
      pregunta: "¿Qué necesita hoy tu vida espiritual: más conocimiento de la Palabra, más fuego en el corazón o las dos cosas?",
    },
  },
  {
    id: "n4-historia-2-4",
    objetivos: [
      "Describir el comienzo de las misiones modernas con William Carey y Hudson Taylor.",
      "Explicar el segundo gran despertar y el movimiento de santidad.",
      "Reconocer cómo estos movimientos prepararon el camino del pentecostalismo.",
    ],
    paraEmpezar:
      "Un zapatero inglés tenía un mapa del mundo junto a su banco de trabajo y oraba por las naciones que no conocían a Cristo. Así empezó una nueva época de misiones.",
    bloques: [
      { t: "versiculo", ref: "Isaías 54:2-3" },
      {
        t: "parrafo",
        texto:
          "William Carey (1761-1834), zapatero y pastor bautista, insistió en que la gran comisión seguía vigente. En 1792 predicó sobre Isaías 54, «Ensancha el sitio de tu tienda», con un lema que se haría famoso: esperar grandes cosas de Dios e intentar grandes cosas para Dios. Al año siguiente partió a la India, donde trabajó en traducir la Biblia a varias lenguas.",
      },
      { t: "versiculo", ref: "Mateo 28:19-20" },
      {
        t: "parrafo",
        texto:
          "Hudson Taylor (1832-1905) fundó en 1865 la Misión al Interior de China, se vistió como los chinos para acercarse a ellos y llevó el evangelio al interior del país. A lo largo del siglo XIX, miles de misioneros llevaron el evangelio a África, Asia y América Latina, obedeciendo el mandato de hacer discípulos a todas las naciones.",
      },
      { t: "subtitulo", texto: "Avivamientos y santidad" },
      {
        t: "parrafo",
        texto:
          "En los Estados Unidos hubo un segundo gran despertar a comienzos del siglo XIX, con grandes campamentos de oración y predicación. Evangelistas como Charles Finney y D. L. Moody llamaron a multitudes a la conversión. El movimiento de santidad, nacido del metodismo, buscaba una experiencia de consagración y de poder después de la conversión, y muchos de sus grupos oraban por un nuevo derramamiento del Espíritu.",
      },
      {
        t: "nota",
        titulo: "Esperar grandes cosas de Dios",
        texto:
          "La historia de las misiones muestra que Dios usa a personas sencillas que creen sus promesas y obedecen la gran comisión.",
      },
    ],
    ideaClave:
      "Las misiones modernas empezaron con William Carey, que en 1792 llamó a esperar grandes cosas de Dios e intentar grandes cosas para Dios y partió a la India, y siguieron con Hudson Taylor en China (1865). El segundo gran despertar, con Finney y Moody, y el movimiento de santidad, que oraba por un nuevo derramamiento del Espíritu, prepararon el pentecostalismo.",
    paraLaVida: {
      texto: "La gran comisión sigue vigente, y Dios sigue usando a personas sencillas.",
      pregunta: "¿Por qué nación o grupo de personas que no conoce a Cristo vas a empezar a orar?",
    },
  },
  {
    id: "n4-historia-2-5",
    objetivos: [
      "Describir los comienzos del movimiento pentecostal en Topeka y en la calle Azusa.",
      "Explicar cómo se extendió el pentecostalismo y cómo nacieron sus primeras denominaciones.",
      "Reconocer la renovación carismática y el lugar del pentecostalismo en el mundo de hoy.",
    ],
    paraEmpezar:
      "A comienzos del siglo XX, en un viejo edificio de madera de Los Ángeles, creyentes de distintas razas oraban día y noche. Lo que allí comenzó se extendió por todo el mundo.",
    bloques: [
      { t: "versiculo", ref: "Joel 2:28-29" },
      {
        t: "parrafo",
        texto:
          "Muchos creyentes del movimiento de santidad oraban por un nuevo Pentecostés, recordando la promesa: «derramaré mi Espíritu sobre toda carne». El 1 de enero de 1901, en una escuela bíblica de Topeka, Kansas, dirigida por Charles Parham, una estudiante, Agnes Ozman, habló en lenguas mientras oraban por ella. Parham enseñó desde entonces que las lenguas eran la señal del bautismo en el Espíritu.",
      },
      { t: "subtitulo", texto: "La calle Azusa" },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "En 1906, William J. Seymour, un predicador afroamericano, hijo de antiguos esclavos, dirigió en la calle Azusa de Los Ángeles un avivamiento que duró unos tres años. Negros, blancos, hispanos y personas de muchas naciones oraban juntos, en una época de fuerte separación racial. Desde allí, misioneros llevaron el mensaje pentecostal a todo el mundo.",
      },
      { t: "subtitulo", texto: "Las primeras denominaciones" },
      {
        t: "lista",
        items: [
          "Iglesias que ya existían, como la Iglesia de Dios en Cristo y la Iglesia de Dios de Cleveland, Tennessee, se hicieron pentecostales entre 1907 y 1908.",
          "Las Asambleas de Dios se organizaron en 1914, en Hot Springs, Arkansas.",
          "La Iglesia Internacional del Evangelio Cuadrangular nació de la obra de Aimee Semple McPherson en Los Ángeles, en la década de 1920.",
        ],
      },
      { t: "subtitulo", texto: "La renovación carismática" },
      {
        t: "parrafo",
        texto:
          "Desde 1960, la experiencia pentecostal llegó también a iglesias históricas, como la episcopal, la luterana y la católica, en lo que se llamó la renovación carismática. Hoy los pentecostales y carismáticos son cientos de millones en el mundo, sobre todo en América Latina, África y Asia.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      {
        t: "nota",
        titulo: "Historia y doctrina",
        texto:
          "Esta lección cuenta la historia del movimiento. Lo que enseña la Biblia sobre el bautismo en el Espíritu Santo y las lenguas se estudia en la materia La persona y obra del Espíritu Santo, según la declaración de fe del ministerio.",
      },
    ],
    ideaClave:
      "El movimiento pentecostal nació de la oración por un nuevo Pentecostés: en Topeka (1901), Agnes Ozman habló en lenguas, y en la calle Azusa (1906), William J. Seymour dirigió un avivamiento de todas las razas que se extendió por el mundo. Nacieron denominaciones como las Asambleas de Dios (1914), y desde 1960 la renovación carismática llegó a otras iglesias.",
    paraLaVida: {
      texto: "El mismo Espíritu que vino en Pentecostés sigue obrando hoy.",
      pregunta: "¿Qué te enseña el avivamiento de la calle Azusa sobre la oración y la unidad entre creyentes de distintos orígenes?",
    },
  },
  {
    id: "n4-historia-2-6",
    objetivos: [
      "Describir la llegada del evangelio protestante a América Latina.",
      "Explicar el crecimiento del pentecostalismo latinoamericano, de Chile y Brasil a todo el continente.",
      "Valorar la historia de la iglesia hispana en los Estados Unidos.",
    ],
    paraEmpezar:
      "Durante siglos, en América Latina la Biblia casi no circulaba en las manos del pueblo. Hoy, millones de latinoamericanos leen la Palabra y la predican en su idioma.",
    bloques: [
      { t: "versiculo", ref: "Romanos 10:14-15" },
      {
        t: "parrafo",
        texto:
          "«¿Y cómo oirán sin haber quien les predique?». Durante la colonia, la fe que llegó a América fue la católica, y los protestantes casi no podían entrar. Con la independencia de los países, en el siglo XIX, llegaron vendedores de Biblias, llamados colportores, y misioneros. Uno de los primeros fue el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas en varios países de América del Sur.",
      },
      { t: "subtitulo", texto: "El fuego pentecostal en América Latina" },
      {
        t: "lista",
        items: [
          "En Chile, en 1909, un avivamiento en la iglesia metodista de Valparaíso, guiada por el misionero Willis Hoover, dio origen a la Iglesia Metodista Pentecostal.",
          "En Brasil, en 1911, dos misioneros suecos, Daniel Berg y Gunnar Vingren, fundaron en Belém la iglesia que llegaría a ser las Asambleas de Dios, hoy una de las más grandes del mundo.",
          "Durante el siglo XX, el pentecostalismo creció en todo el continente, sobre todo entre los pobres, con pastores del lugar y la Biblia en la mano.",
        ],
      },
      { t: "subtitulo", texto: "La iglesia hispana en los Estados Unidos" },
      {
        t: "parrafo",
        texto:
          "Desde la calle Azusa hubo hispanos entre los pentecostales. Francisco Olazábal, un evangelista mexicano, predicó a miles en los Estados Unidos, México y Puerto Rico en las décadas de 1920 y 1930, y fundó el Concilio Latinoamericano de Iglesias Cristianas. Hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos, también en Texas.",
      },
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "parrafo",
        texto:
          "La promesa de Jesús se sigue cumpliendo: «me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra». El evangelio que llegó a América Latina hoy sale de América Latina hacia otras naciones, con misioneros latinos en todo el mundo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", minutos: 9 },
      {
        t: "nota",
        titulo: "Nuestra historia",
        texto:
          "Nuestro ministerio es parte de esta historia: hispanos que predican a Cristo con el poder del Espíritu. Conocerla nos ayuda a ser fieles en nuestra generación.",
      },
    ],
    ideaClave:
      "El evangelio protestante llegó a América Latina en el siglo XIX con colportores y misioneros como Diego Thomson. El pentecostalismo latinoamericano nació en Chile (1909, con Willis Hoover) y en Brasil (1911, con Berg y Vingren) y creció en todo el continente. Entre los hispanos de los Estados Unidos, Francisco Olazábal predicó a miles, y hoy el evangelio sale de América Latina hacia el mundo.",
    paraLaVida: {
      texto: "Eres parte de la historia del evangelio entre los hispanos: escribe con fidelidad tu capítulo.",
      pregunta: "¿Cómo llegó el evangelio a tu familia, y cómo vas a llevarlo a la siguiente generación?",
    },
  },
];
