// Lo que agregó la revisión del sistema de estudio (docs/academia-auditoria.md) al sílabo de las materias ya publicadas:
// más bibliografía comprobada y, en los Niveles 4 y 5, la lectura ampliada con su reporte. Va aparte para no tocar los
// sílabos originales (shared/academia.ts lo aplica al cargar). Los esquemas, los videos y las preguntas de casos van en
// el servidor (server/academia/esquemas.ts y server/academia/casos.ts).
import type { LecturaAmpliada, Libro, MateriaDef } from "./academia";

export type Complemento = { basica?: Libro[]; complementaria?: Libro[]; ampliada?: LecturaAmpliada };

export const COMPLEMENTOS: Record<string, Complemento> = {
  // La oración: hablar con Dios
  "n1-oracion": {
    complementaria: [
      // comprobado: https://www.christianbook.com/fuego-viento-fresco-fresh-wind-fire/jim-cymbala/9780829706215/pd/706216
      { autor: "Jim Cymbala y Dean Merrill", titulo: "Fuego vivo, viento fresco", editorial: "Vida" },
    ],
  },
  // Doctrinas fundamentales
  "n2-doctrinas": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9780829718539
      {
        autor: "William W. Menzies y Stanley M. Horton",
        titulo: "Doctrinas bíblicas: una perspectiva pentecostal",
        editorial: "Vida",
      },
    ],
  },
  // Mayordomía cristiana
  "n2-mayordomia": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/la-mayordomia
      {
        autor: "Justo L. González",
        titulo: "La mayordomía: en la Biblia, en la Iglesia y en la vida",
        editorial: "Mundo Hispano",
      },
    ],
  },
  // Familia y relaciones
  "n2-familia": {
    complementaria: [
      // comprobado: https://bhespanol.bhpublishinggroup.com/product/el-significado-del-matrimonio-2/
      { autor: "Timothy Keller, con Kathy Keller", titulo: "El significado del matrimonio", editorial: "B&H Español" },
    ],
  },
  // Evangelismo personal
  "n2-evangelismo-personal": {
    complementaria: [
      // comprobado: https://www.perlego.com/es/book/557659/el-caso-de-la-fe-un-periodista-investiga-las-objeciones-ms-difciles-contra-el-cristianismo-pdf
      { autor: "Lee Strobel", titulo: "El caso de la fe", editorial: "Vida" },
    ],
  },
  // La persona y obra del Espíritu Santo
  "n3-espiritu-santo": {
    complementaria: [
      // comprobado: https://www.logos.com/product/10205/pablo-el-espiritu-y-el-pueblo-de-dios
      { autor: "Gordon D. Fee", titulo: "Pablo, el Espíritu y el pueblo de Dios", editorial: "Vida" },
    ],
  },
  // Liderazgo cristiano I
  "n3-liderazgo-1": {
    complementaria: [
      // comprobado: https://www.clie.es/11-curso-de-formacion-teologica-evangelica-ministros-de-jesucristo
      {
        autor: "José M. Martínez",
        titulo: "Ministros de Jesucristo: ministerio, homilética y pastoral",
        editorial: "CLIE",
      },
    ],
  },
  // Homilética I
  "n3-homiletica-1": {
    complementaria: [
      // comprobado: https://catalogobiblio.unach.cl/vufind/Record/16416/Description
      { autor: "John R. W. Stott", titulo: "La predicación: puente entre dos mundos", editorial: "Libros Desafío" },
    ],
  },
  // Historia de la iglesia I
  "n3-historia-1": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/compendio-de-la-historia-cristiana
      { autor: "Robert A. Baker", titulo: "Compendio de la historia cristiana", editorial: "Mundo Hispano" },
      // comprobado: https://www.editorialmh.org/atlas-de-la-biblia-y-de-la-historia-del-cristianismo
      {
        autor: "Tim Dowley",
        titulo: "Atlas de la Biblia y de la historia del cristianismo",
        editorial: "Mundo Hispano",
      },
    ],
  },
  // Cuidado y consejería básica
  "n3-consejeria-basica": {
    complementaria: [
      // comprobado: https://openlibrary.org/books/OL26018378M
      { autor: "H. Norman Wright", titulo: "Cómo aconsejar en situaciones de crisis", editorial: "CLIE" },
      // comprobado: https://openlibrary.org/books/OL4899558M
      { autor: "Jorge A. León", titulo: "Psicología pastoral para todos los cristianos", editorial: "Caribe" },
    ],
  },
  // Teología sistemática I: la Biblia y Dios
  "n4-sistematica-1": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9780829721454
      { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática pentecostal", editorial: "Vida" },
    ],
    ampliada: {
      lectura: "Isaías 40–48: el único Dios verdadero, Creador eterno y Señor de la historia",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Isaias&cap=40",
      minutos: 60,
      reporte: [
        "¿Qué atributos de Dios enseña esta sección (por ejemplo, Isaías 40:12-31; 44:6-8; 46:9-10) y cómo amplían lo que estudiaste sobre su eternidad, su poder y su conocimiento?",
        "¿Cómo muestra el profeta que Jehová es el único Dios frente a los ídolos (Isaías 41:21-24; 44:9-20; 45:18-23), y qué significa que Pablo aplique Isaías 45:23 a Jesús en Filipenses 2:10-11?",
        "¿Qué enseña el anuncio de Ciro (Isaías 44:24–45:7) sobre la providencia de Dios en la historia, y cómo fortalece tu confianza en él ante lo que vives hoy?",
      ],
    },
  },
  // Teología sistemática II: Cristo y el Espíritu Santo
  "n4-sistematica-2": {
    ampliada: {
      lectura: "Hebreos 1–10: el Hijo, verdadero Dios y verdadero hombre, sumo sacerdote eterno y sacrificio una vez para siempre",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Hebreos&cap=1",
      minutos: 50,
      reporte: [
        "¿Con qué argumentos muestran Hebreos 1 y 2 que el Hijo es verdadero Dios y verdadero hombre, y por qué necesitaba ser las dos cosas para salvarnos?",
        "Según Hebreos 7 a 10, ¿en qué supera el sacerdocio de Cristo al de los levitas, y qué significa que se ofreció una vez para siempre?",
        "¿Qué consecuencias saca el autor para la vida del creyente en Hebreos 4:14-16 y 10:19-25, y cómo las aplicarías en tu ministerio?",
      ],
    },
  },
  // Teología sistemática III: el hombre, el pecado y la salvación
  "n4-sistematica-3": {
    ampliada: {
      lectura: "Romanos 1–8: del pecado de todos a la gloria de los hijos de Dios",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Romanos&cap=1",
      minutos: 60,
      reporte: [
        "¿Cómo muestra Pablo en Romanos 1:18–3:20 que judíos y gentiles están todos bajo pecado, y por qué eso hace necesaria la justificación por la fe de Romanos 3:21-28?",
        "Compara a Adán y a Cristo en Romanos 5:12-21: ¿qué trajo cada uno a la humanidad, y qué aclara este pasaje sobre el pecado original y sobre la gracia?",
        "En Romanos 6–8, ¿cómo se relacionan la justificación, la santificación, la adopción y la glorificación? ¿Qué promesa de Romanos 8 usarías para acompañar a un creyente que duda?",
      ],
    },
  },
  // Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos
  "n4-sistematica-4": {
    ampliada: {
      lectura: "1 Corintios 11–15: la Cena del Señor, el cuerpo de Cristo y la resurrección de los muertos",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=1%20Corintios&cap=11",
      minutos: 40,
      reporte: [
        "¿Qué corrige Pablo en la manera en que los corintios celebraban la Cena del Señor (11:17-34), y qué enseña eso sobre el sentido de la ordenanza y sobre examinarse a sí mismo?",
        "¿Cómo usa Pablo la imagen del cuerpo (12:12-27) para enseñar la unidad y la diversidad de los miembros, y qué lugar le da al amor (capítulo 13) en el servicio de cada uno?",
        "¿Por qué la resurrección de Cristo es el fundamento de la fe y de la esperanza del creyente (15:12-22), y cómo describe Pablo el cuerpo resucitado y la victoria final sobre la muerte (15:42-58)?",
      ],
    },
  },
  // Libros poéticos y proféticos
  "n4-poeticos-profeticos": {
    complementaria: [
      // comprobado: https://www.clie.es/libros-poeticos-y-sapienciales-del-antiguo-testamento
      { autor: "Samuel Pagán", titulo: "Libros poéticos y sapienciales del Antiguo Testamento", editorial: "CLIE" },
      // comprobado: https://www.clie.es/libros-profeticos-del-antiguo-testamento
      { autor: "Samuel Pagán", titulo: "Libros proféticos del Antiguo Testamento", editorial: "CLIE" },
    ],
    ampliada: {
      lectura: "Los libros de Amós y Miqueas completos: la justicia que Dios pide, el juicio y la esperanza",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Amos&cap=1",
      minutos: 60,
      reporte: [
        "Amós profetizó a Israel, el reino del norte, y Miqueas sobre Samaria y Jerusalén, en el siglo VIII a. C. (Amós 1:1; Miqueas 1:1). ¿Qué pecados denuncian (Amós 2:6-8; 5:10-12; Miqueas 2:1-2; 3:9-11) y por qué Dios rechaza el culto sin justicia (Amós 5:21-24; Miqueas 6:6-8)?",
        "¿Qué esperanza anuncian después del juicio (Amós 9:11-15; Miqueas 4:1-5; 5:2-5; 7:18-20), y cómo lee el Nuevo Testamento Amós 9:11-12 y Miqueas 5:2 a la luz de Cristo (Hechos 15:13-18; Mateo 2:4-6)?",
        "Escoge uno de estos pasajes y aplícale los tres pasos para leer a los profetas: ¿qué dijo a su pueblo en su tiempo, cómo se cumple en Cristo y en su iglesia y, con humildad, qué falta por cumplirse en la venida de Cristo? Termina con lo que te pide hoy Miqueas 6:8 en tu familia, tu iglesia o tu trabajo.",
      ],
    },
  },
  // Epístolas y Apocalipsis
  "n4-epistolas-apocalipsis": {
    ampliada: {
      lectura: "La carta a los Hebreos completa (capítulos 1 al 13)",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Hebreos&cap=1",
      minutos: 60,
      reporte: [
        "¿Cómo muestra Hebreos que Cristo es superior a los ángeles (capítulos 1 y 2), a Moisés (capítulo 3) y al sacerdocio de Aarón (capítulos 5 y 7)? Cita un texto de cada parte.",
        "Según los capítulos 8 al 10, ¿qué tiene de mejor el nuevo pacto y por qué el sacrificio de Cristo se ofreció una vez para siempre?",
        "¿Qué enseña el capítulo 11 sobre la fe y cómo la aplica el capítulo 12 a una iglesia cansada o tentada a volver atrás? Escribe una aplicación para tu congregación.",
      ],
    },
  },
  // Homilética II: predicación expositiva
  "n4-homiletica-2": {
    complementaria: [
      // comprobado: https://poiema.co/products/la-predicacion-puente-entre-dos-mundos
      { autor: "John Stott", titulo: "La predicación: puente entre dos mundos", editorial: "Libros Desafío" },
    ],
    ampliada: {
      lectura: "Efesios 1–6 completa: seguir el argumento de la carta y dividirla en pasajes para una serie expositiva",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Efesios&cap=1",
      minutos: 45,
      reporte: [
        "¿Cómo avanza el argumento de Efesios? Señala sus dos grandes partes y tres conectores que las unen o las ordenan, como el pues de 4:1.",
        "Divide la carta en pasajes para una serie de sermones expositivos y escribe la idea exegética y la idea homilética de uno de ellos.",
        "¿Cómo fundan los capítulos 1 al 3, lo que Dios hizo en Cristo, la obediencia que piden los capítulos 4 al 6? ¿Qué cambia eso en tus aplicaciones?",
      ],
    },
  },
  // Historia de la iglesia II
  "n4-historia-2": {
    complementaria: [
      // comprobado: https://www.clie.es/historia-general-de-las-misiones
      {
        autor: "Justo L. González y Carlos F. Cardoza Orlandi",
        titulo: "Historia general de las misiones",
        editorial: "CLIE",
      },
    ],
    ampliada: {
      lectura: "La carta a los Gálatas completa: el justo por la fe vivirá, la libertad en Cristo y la vida en el Espíritu",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Galatas&cap=1",
      minutos: 35,
      reporte: [
        "Según Gálatas 2:16 y 3:6-14, ¿por qué nadie es justificado por las obras de la ley y cómo justifica Dios al que cree? Pablo cita Habacuc 2:4 en Gálatas 3:11, igual que en Romanos 1:17. Relaciónalo con lo que descubrió Lutero y con su protesta de 1517 contra las indulgencias.",
        "Pablo dice que no hay otro evangelio y que él no recibió el suyo de hombre alguno, sino por revelación de Jesucristo (Gálatas 1:6-12). ¿Por qué la Reforma puso la Escritura por encima de las tradiciones? Explica con respeto en qué se diferenció del Concilio de Trento.",
        "Gálatas 3:26-29 y 4:4-7 enseñan que por la fe somos hijos de Dios, todos uno en Cristo Jesús, y que Dios envió a nuestros corazones el Espíritu de su Hijo. ¿Cómo ayudan a entender la seguridad que recibió Wesley en 1738 y la unidad de la calle Azusa en 1906? ¿Qué aplicas a tu ministerio?",
      ],
    },
  },
  // Apologética
  "n4-apologetica": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/nueva-evidencia-que-demanda-un-veredicto-verdades-transformadoras-para-un-mundo-esceptico
      {
        autor: "Josh McDowell y Sean McDowell",
        titulo: "Evidencia que demanda un veredicto: verdades transformadoras para un mundo escéptico",
        editorial: "Mundo Hispano",
      },
    ],
    ampliada: {
      lectura: "Hechos 17–26: Pablo razona y presenta su defensa ante judíos, filósofos, gobernadores y el rey Agripa",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Hechos&cap=17",
      minutos: 60,
      reporte: [
        "¿Cómo adapta Pablo su punto de partida a cada auditorio (la sinagoga, el Areópago, el concilio, Félix, Festo y Agripa) sin cambiar el mensaje?",
        "¿Por qué vuelve una y otra vez en sus defensas la resurrección, tanto la de Jesús (Hechos 17:31; 25:19; 26:23) como la esperanza de la resurrección de los muertos (23:6; 24:15; 26:8), y cómo une Pablo las dos en su argumento?",
        "¿Qué actitud muestra Pablo cuando se burlan de él, cuando lo acusan y cuando lo llaman loco, aun estando preso (Hechos 17:32-34; 24:10-16; 26:24-29), y qué te enseña para dar razón de tu fe según 1 Pedro 3:15-16?",
      ],
    },
  },
  // Ética cristiana y ministerial
  "n4-etica": {
    basica: [
      // comprobado: https://www.clie.es/10-curso-de-formacion-teologica-evangelica-etica-cristiana
      { autor: "Francisco Lacueva", titulo: "Ética cristiana", editorial: "CLIE" },
    ],
    complementaria: [
      // comprobado: https://www.clie.es/11-curso-de-formacion-teologica-evangelica-ministros-de-jesucristo
      { autor: "José M. Martínez", titulo: "Ministros de Jesucristo", editorial: "CLIE" },
    ],
    ampliada: {
      lectura: "Romanos 12–15: la ética de una mente renovada, el amor al prójimo, la conciencia y las autoridades",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Romanos&cap=12",
      minutos: 40,
      reporte: [
        "¿Cómo muestran Romanos 12:1-2 y 13:8-10 que la ética cristiana nace de una mente renovada y se resume en el amor, y no en una lista de reglas?",
        "Según Romanos 14:1–15:7, ¿cómo decide el creyente en lo que la Biblia no regula? Explica el papel de la conciencia (14:5, 22-23) y del hermano débil (14:13-21).",
        "Según Romanos 13:1-7, ¿por qué el creyente paga sus impuestos y coopera con las autoridades, por ejemplo al reportar la sospecha de abuso de un menor?",
      ],
    },
  },
  // Teología pastoral
  "n5-teologia-pastoral": {
    complementaria: [
      // comprobado: https://www.clie.es/11-curso-de-formacion-teologica-evangelica-ministros-de-jesucristo
      {
        autor: "José M. Martínez",
        titulo: "Ministros de Jesucristo: ministerio, homilética y pastoral",
        editorial: "CLIE",
      },
    ],
    ampliada: {
      lectura: "Las cartas pastorales completas: 1 Timoteo, 2 Timoteo y Tito (13 capítulos)",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=1%20Timoteo&cap=1",
      minutos: 60,
      reporte: [
        "¿Qué carácter pide Pablo a los que dirigen la iglesia (1 Timoteo 3:1-7; Tito 1:5-9) y por qué lo pone antes que los dones?",
        "¿Cómo debe el pastor alimentar al rebaño con la sana doctrina y protegerlo del error, según 1 Timoteo 4:6-16, 2 Timoteo 2:2 y 2 Timoteo 4:1-5?",
        "¿Qué enseñan estas cartas sobre la vida personal del pastor y el terminar bien (1 Timoteo 4:16; 1 Timoteo 6:11-12; 2 Timoteo 4:6-8), y qué decisión concreta tomarás tú?",
      ],
    },
  },
  // Administración y gobierno de la iglesia
  "n5-administracion": {
    basica: [
      // comprobado: https://openlibrary.org/isbn/0825416507
      { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
    ],
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9780829721454
      { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática pentecostal", editorial: "Vida" },
    ],
    ampliada: {
      lectura: "1 Timoteo y Tito completos: el orden de la casa de Dios en las cartas pastorales",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=1%20Timoteo&cap=1",
      minutos: 45,
      reporte: [
        "Según 1 Timoteo 3:14-15, ¿para qué escribe Pablo esta carta? Enumera las tareas de orden y de gobierno que encarga a Timoteo y a Tito (por ejemplo, 1 Timoteo 3; 1 Timoteo 5:17-22; Tito 1:5) y explica qué tienen en común.",
        "En 1 Timoteo 3:1-13 y Tito 1:5-9, ¿qué requisitos son de carácter y cuáles de capacidad, y por qué pesa más el carácter? ¿Qué significa que el obispo sea administrador de Dios (Tito 1:7), y cómo lo aplicarías al escoger a los responsables de un equipo?",
        "¿Qué principios para administrar la ayuda y el dinero encuentras en 1 Timoteo 5:3-18 y 1 Timoteo 6:6-10, 17-19 (la lista de las viudas, el deber de la familia, el salario del obrero y el amor al dinero), y cómo se relacionan con los controles de la lección 4?",
      ],
    },
  },
  // Didáctica: cómo enseñar
  "n5-didactica": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/pedagogia-fructifera
      { autor: "Findley B. Edge", titulo: "Pedagogía fructífera", editorial: "Mundo Hispano" },
      // comprobado: https://www.editorialmh.org/los-llamados-a-ensenar
      { autor: "Jorge E. Díaz", titulo: "Los llamados a enseñar", editorial: "Mundo Hispano" },
    ],
    ampliada: {
      lectura: "Las cartas pastorales completas (1 Timoteo, 2 Timoteo y Tito): cómo forma Pablo a quienes enseñarán",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=1%20Timoteo&cap=1",
      minutos: 50,
      reporte: [
        "¿Qué carácter y qué hábitos pide Pablo a quien enseña (1 Timoteo 4:11-16; 2 Timoteo 2:15; Tito 2:7-8) y en qué se parecen al modelo de Esdras 7:10?",
        "¿Cómo formó Pablo a Timoteo (2 Timoteo 1:3-6; 3:10-17)? Describe lo que hizo como maestro y lo que Timoteo había aprendido desde la niñez en su familia.",
        "¿Qué enseñan 2 Timoteo 2:2, 2:24-25 y 4:2 sobre la meta de la enseñanza y la manera de corregir? ¿Qué cambiarás en tu manera de enseñar o de acompañar?",
      ],
    },
  },
  // Liderazgo II: formar líderes y equipos
  "n5-liderazgo-2": {
    complementaria: [
      // comprobado: https://www.logos.com/product/28422/plan-supremo-de-evangelizacion
      {
        autor: "Robert E. Coleman",
        titulo: "Plan supremo de evangelización",
        editorial: "Casa Bautista de Publicaciones",
      },
    ],
    ampliada: {
      lectura: "2 Timoteo 1–4: la última carta de Pablo a Timoteo, el discípulo que debía formar a otros",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=2%20Timoteo&cap=1",
      minutos: 30,
      reporte: [
        "¿Qué le pide Pablo a Timoteo que haga con lo que recibió (1:13-14; 2:1-2; 3:14) y cómo ayuda el resto de la carta a entender las cuatro generaciones de 2 Timoteo 2:2?",
        "¿Qué dicen las imágenes del soldado, el atleta, el labrador y el obrero (2:3-6, 15) y el retrato del siervo del Señor (2:24-26) sobre las señales de un líder en formación y sobre cómo corregir a los que se oponen?",
        "¿Cómo prepara Pablo su partida (4:1-8) y qué muestran sus pedidos sobre Marcos y sus compañeros (4:9-13) acerca del trabajo en equipo, la restauración y la sucesión? ¿Qué aplicarás en tu ministerio?",
      ],
    },
  },
  // Griego y hebreo bíblicos para el estudio
  "n5-idiomas": {
    ampliada: {
      lectura: "1 Juan 1–5, la carta entera, siguiendo con la concordancia de Strong las palabras comunión (koinonía) y amor (ágape)",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=1%20Juan&cap=1",
      minutos: 45,
      reporte: [
        "¿En qué versículos de la carta aparecen koinonía y ágape, con qué número de Strong, y qué sentido les da el contexto en cada uso?",
        "¿Qué relación hace Juan entre la comunión con Dios, la manera de vivir y el amor a los hermanos (1 Juan 1:6-7; 4:7-12)?",
        "¿Qué error común de la lección 6 evitarías al enseñar una de estas palabras, y cómo la explicarías con sencillez en tu iglesia?",
      ],
    },
  },
  // Exégesis de un libro: Romanos
  "n5-exegesis": {
    ampliada: {
      lectura: "La carta a los Romanos completa (capítulos 1 al 16), leída de corrido para seguir el hilo de su argumento",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=Romanos&cap=1",
      minutos: 80,
      reporte: [
        "Traza el mapa de la carta: ¿cómo desarrolla cada sección (1:18–3:20; 3:21–5:21; 6–8; 9–11; 12–16) la tesis de Romanos 1:16-17, y qué conectores marcan sus giros (3:21; 5:1; 8:1; 12:1)?",
        "¿Cómo aparece la relación entre judíos y gentiles a lo largo de la carta (1:16; 2:9-11; 3:29-30; 4:11-12; 11:17-24; 15:7-12), y qué luz da eso sobre su propósito: la obediencia a la fe en todas las naciones (1:5; 16:26)?",
        "Escoge un pasaje de Romanos 9 a 16 y aplícale los cinco pasos del método: el contexto histórico y literario, las palabras clave y la gramática, la teología en el conjunto de la Escritura y una aplicación concreta para tu iglesia.",
      ],
    },
  },
  // Teología del avivamiento
  "n5-avivamiento": {
    ampliada: {
      lectura: "2 Crónicas 29–36: los avivamientos de Ezequías y Josías, el arrepentimiento de Manasés y el final del reino",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=2%20Cronicas&cap=29",
      minutos: 55,
      reporte: [
        "Compara los pasos de Ezequías (2 Crónicas 29–31) y de Josías (2 Crónicas 34–35): ¿cómo aparecen en cada uno la casa de Dios, la Palabra, el arrepentimiento, el pacto y la Pascua? ¿Qué agrega el texto al patrón de la lección 2?",
        "¿Dónde ves obrar el principio de 2 Crónicas 7:14 (humillarse, orar, buscar a Dios y convertirse) en la oración de Ezequías por el pueblo (30:18-20), en Manasés (33:12-13) y en Josías (34:27)? ¿Cómo responde Dios en cada caso?",
        "2 Crónicas 34:33 dice que el pueblo no se apartó de Jehová todo el tiempo que vivió Josías, y el capítulo 36 cuenta cómo terminó el reino. ¿Qué enseña esto sobre sostener los frutos de un avivamiento y no depender de una sola persona (lección 6)?",
      ],
    },
  },
  // Seminario de liderazgo ministerial
  "n5-seminario": {
    ampliada: {
      lectura: "2 Corintios 1–13, entera: un líder ante el conflicto, la disciplina, el dinero y la crítica",
      fuente: "Biblioteca de la web (RV1960)",
      url: "/biblioteca?libro=2%20Corintios&cap=1",
      minutos: 45,
      reporte: [
        "Aplica el método del seminario a la crisis de Corinto: ¿cuáles son los hechos, el problema de fondo y los principios con que Pablo responde (2 Corintios 1:23–2:11; 7:8-12)?",
        "¿Cómo administró Pablo la ofrenda para los santos con transparencia (2 Corintios 8:16-24)? Propón dos controles concretos para tu iglesia que salgan de este pasaje.",
        "¿Cómo une Pablo la firmeza con el perdón y la mansedumbre (2 Corintios 2:5-11; 10:1-8; 13:10)? ¿Qué enseña esto para restaurar a un hermano o a un líder que cayó?",
      ],
    },
  },
  // Evangelismo personal avanzado
  "evangelismo-misiones-1": {
    basica: [
      // comprobado: https://www.clie.es/pasion-por-las-almas
      { autor: "Oswald J. Smith", titulo: "Pasión por las almas", editorial: "CLIE" },
    ],
  },
  // Campañas y cruzadas
  "evangelismo-misiones-2": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/evangelizacion-total
      { autor: "Damy Ferreira", titulo: "Evangelización total", editorial: "Mundo Hispano" },
    ],
  },
  // Teología bíblica de las misiones
  "evangelismo-misiones-3": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9789506831561
      {
        autor: "Christopher J. H. Wright",
        titulo: "La misión de Dios: descubriendo el gran mensaje de la Biblia",
        editorial: "Certeza Unida",
      },
    ],
  },
  // Misión transcultural
  "evangelismo-misiones-4": {
    complementaria: [
      // comprobado: https://www.clie.es/historia-general-de-las-misiones
      {
        autor: "Justo L. González y Carlos F. Cardoza Orlandi",
        titulo: "Historia general de las misiones",
        editorial: "Clie",
      },
    ],
  },
  // Plantación de iglesias
  "evangelismo-misiones-5": {
    complementaria: [
      // comprobado: https://www.editorialmh.org/como-sembrar-iglesias-en-el-siglo-xxi
      {
        autor: "Daniel Sánchez, Ebbie C. Smith y Curtis E. Watke",
        titulo: "Cómo sembrar iglesias en el siglo XXI",
        editorial: "Mundo Hispano",
      },
    ],
  },
  // Teología de la adoración
  "alabanza-1": {
    complementaria: [
      // comprobado: https://andamioeditorial.com/producto/en-la-presencia-de-dios/
      {
        autor: "David Peterson",
        titulo: "En la presencia de Dios: una teología bíblica de la adoración",
        editorial: "Andamio",
      },
    ],
  },
  // El adorador: carácter y vida
  "alabanza-2": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9781496411310
      {
        autor: "Donald S. Whitney",
        titulo: "Disciplinas espirituales para la vida cristiana",
        editorial: "NavPress / Tyndale",
      },
    ],
  },
  // Dirigir el ministerio de alabanza
  "alabanza-3": {
    complementaria: [
      // comprobado: https://www.clie.es/arquitectos-de-la-adoracion
      { autor: "Constance M. Cherry", titulo: "Arquitectos de la adoración", editorial: "CLIE" },
    ],
  },
  // Sonido y técnica al servicio del culto
  "alabanza-5": {
    complementaria: [
      // comprobado: https://www.vidalibros.es/products/celebracion-de-la-disciplina.json (consultado el 19-nov-2026: Celebración de la Disciplina, editorial PENIEL, etiqueta Autor Richard J. Foster, ISBN 9789875572126; su biografía en español lo llama Celebración de la disciplina: Hacia una vida espiritual más profunda); https://books.crossmap.com/book/celebracion-de-la-disciplina-celebration-of-discipline/ (Editorial Peniel, 2009, 304 páginas, en español; entre las disciplinas externas está el servicio); https://openlibrary.org/isbn/9789875572126 (2009). Citado como ya lo cita la academia en n1-oracion, n2-disciplinas, alabanza-2, intercesion-1 e intercesion-3.
      { autor: "Richard J. Foster", titulo: "Celebración de la disciplina", editorial: "Peniel" },
    ],
  },
  // Teología de la oración
  "intercesion-1": {
    complementaria: [
      // comprobado: https://www.christianbook.com/como-orar-ebook-r-a-torrey/9781603747103/pd/40450EB
      { autor: "R. A. Torrey", titulo: "Cómo orar", editorial: "Whitaker House" },
    ],
  },
  // Intercesión bíblica
  "intercesion-2": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN9781602553606
      { autor: "Andrew Murray", titulo: "El ministerio de la oración intercesora", editorial: "Grupo Nelson" },
    ],
  },
  // El ayuno bíblico
  "intercesion-3": {
    complementaria: [
      // comprobado: https://www.christianbook.com/ayuno-escogido-chosen-fast-spanish-edition/arthur-wallis/9780881130065/pd/1130060
      { autor: "Arthur Wallis", titulo: "El ayuno escogido por Dios", editorial: "Grupo Nelson" },
    ],
  },
  // Guerra espiritual bíblica y equilibrada
  "intercesion-4": {
    complementaria: [
      // comprobado: https://books.google.com/books?vid=ISBN0829713727
      { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
    ],
  },
  // La oración en los avivamientos
  "intercesion-5": {
    complementaria: [
      // comprobado: https://busca.umc.cl/Record/5082/Details
      {
        autor: "Willis C. Hoover",
        titulo: "Historia del avivamiento pentecostal en Chile",
        editorial: "CEEP Ediciones",
      },
    ],
  },
};

const clave = (l: Libro) => `${l.autor}|${l.titulo}`.toLowerCase().replace(/\s+/g, " ");

/** Agrega a cada sílabo su bibliografía de más (sin repetir libros) y su lectura ampliada. */
export function aplicarComplementos(porId: Map<string, MateriaDef>, complementos: Record<string, Complemento> = COMPLEMENTOS): void {
  for (const [id, c] of Object.entries(complementos)) {
    const s = porId.get(id)?.silabo;
    if (!s) continue;
    for (const [donde, libros] of [["basica", c.basica], ["complementaria", c.complementaria]] as const) {
      const lista = s.bibliografia[donde];
      for (const l of libros ?? []) if (![...s.bibliografia.basica, ...s.bibliografia.complementaria].some((x) => clave(x) === clave(l))) lista.push(l);
    }
    if (c.ampliada) s.ampliada = c.ampliada;
  }
}
