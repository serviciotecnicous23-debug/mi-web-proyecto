/**
 * Especialidad Liderazgo y administración · Materia 4 — Planificación y proyectos ministeriales (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: planificar con fe, la visión,
 * la misión y los valores, las metas y el plan del año (las metas SMART de George T. Doran, Management Review, 1981,
 * comprobado), un proyecto de principio a fin (la definición de proyecto de la guía PMBOK del PMI, comprobada), el
 * cronograma, los riesgos y el presupuesto del proyecto, y evaluar y aprender. No repite el ciclo de planificación de
 * Administración y gobierno de la iglesia (Nivel 5) ni el plan de ministerio del Seminario de liderazgo ministerial:
 * baja a la práctica de los proyectos.
 */
import type { LeccionContenido } from "../tipos";

export const LIDERAZGO_ADMINISTRACION_4: LeccionContenido[] = [
  {
    id: "liderazgo-administracion-4-1",
    objetivos: [
      "Explicar, con Proverbios 16:9 y Santiago 4:13-15, cómo se planea con fe y con humildad.",
      "Reconocer el ciclo de la planificación: orar, mirar dónde estamos, decidir adónde vamos, cómo llegar y con qué, y revisar.",
      "Preparar el retiro de planificación de un consejo.",
    ],
    paraEmpezar:
      "Algunos creen que planear es no confiar en Dios. Pero la Biblia muestra a un Dios que guía al que planea con humildad. Planear no es controlar el futuro: es poner delante de Dios lo que creemos que él quiere, con los pies en la tierra y el corazón dispuesto a que él cambie el rumbo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 16:9" },
      {
        t: "parrafo",
        texto: "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos». Nosotros pensamos el camino, y Dios guía cada paso.",
      },
      { t: "versiculo", ref: "Santiago 4:13-15" },
      {
        t: "parrafo",
        texto:
          "Santiago no prohíbe planear: corrige el orgullo del que planea sin Dios, y enseña a decir: «Si el Señor quiere, viviremos y haremos esto o aquello».",
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo preguntó: «¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».",
      },
      { t: "subtitulo", texto: "El ciclo de la planificación" },
      {
        t: "lista",
        items: [
          "Orar: buscar juntos la voluntad de Dios antes de escribir nada.",
          "Mirar dónde estamos: qué funciona, qué no y qué necesidades vemos en la iglesia y en el barrio.",
          "Decidir adónde vamos: la visión de lo que queremos ver en unos años.",
          "Cómo llegar: pocas metas para el año y los proyectos que las cumplen.",
          "Con qué: las personas, el tiempo y el dinero de cada proyecto.",
          "Revisar: cada cierto tiempo, ajustar con humildad lo que Dios va mostrando.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: planear con fe y planear sin Dios" },
      {
        t: "lista",
        items: [
          "Con fe: se empieza orando. Sin Dios: se empieza por lo que nos gusta.",
          "Con fe: se dice si el Señor quiere, y se ajusta. Sin Dios: el plan se vuelve más importante que la obediencia.",
          "Con fe: se planea con el equipo. Sin Dios: uno solo decide y los demás se enteran.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el retiro de planificación del consejo" },
      {
        t: "parrafo",
        texto: "El consejo quiere dedicar un sábado a planear el año que viene.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, empezar con una hora de oración y de lectura de la Palabra.",
          "Paso 2, repasar el año que termina: qué se logró, qué no y qué aprendimos.",
          "Paso 3, escuchar las necesidades que ve cada ministerio en la iglesia y en el barrio.",
          "Paso 4, recordar la visión de la iglesia y elegir tres metas para el año.",
          "Paso 5, para cada meta, nombrar un responsable que traiga un plan en un mes.",
          "Paso 6, terminar orando y fijar las fechas en que se revisará el avance.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El ciclo general de la planificación se estudia en Administración y gobierno de la iglesia, del Nivel 5, y el plan de ministerio personal, en el Seminario de liderazgo ministerial. Esta materia baja a la práctica de las metas y los proyectos.",
      },
      {
        t: "pasos",
        titulo: "El ciclo de la planificación",
        pasos: [
          { titulo: "Orar", texto: "Buscar juntos la voluntad de Dios antes de escribir nada." },
          { titulo: "Mirar dónde estamos", texto: "Qué funciona, qué no y qué necesidades hay en la iglesia y en el barrio." },
          { titulo: "Decidir adónde vamos", texto: "La visión de lo que queremos ver en unos años." },
          { titulo: "Cómo llegar", texto: "Pocas metas para el año y los proyectos que las cumplen." },
          { titulo: "Con qué", texto: "Las personas, el tiempo y el dinero de cada proyecto." },
          { titulo: "Revisar", texto: "Cada cierto tiempo, ajustar con humildad lo que Dios va mostrando." },
        ],
      },
    ],
    ideaClave:
      "El corazón del hombre piensa su camino, pero Jehová endereza sus pasos; Santiago enseña a planear diciendo si el Señor quiere, y Jesús alaba al que calcula los gastos antes de edificar. El ciclo de la planificación es orar, mirar dónde estamos, decidir adónde vamos, decidir cómo llegar con pocas metas y proyectos, ver con qué recursos y revisar con humildad. Se planea con el equipo y en oración, no a solas ni sin Dios.",
    paraLaVida: {
      texto: "Planeo con fe y dejo que Dios enderece mis pasos.",
      pregunta: "¿Qué plan tuyo necesitas volver a poner delante de Dios?",
    },
  },
  {
    id: "liderazgo-administracion-4-2",
    objetivos: [
      "Explicar, con Habacuc 2:2 y Mateo 28:19-20, la diferencia entre la misión y la visión.",
      "Escribir la misión, la visión y los valores de un ministerio, cortos y claros.",
      "Comunicar la visión para que el equipo se una a ella.",
    ],
    paraEmpezar:
      "Sin una dirección clara, cada ministerio jala para su lado. La misión dice para qué existimos, la visión muestra adónde vamos y los valores dicen cómo trabajamos. Cuando el equipo los conoce, las decisiones se vuelven más fáciles.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 28:19-20" },
      {
        t: "parrafo",
        texto:
          "La misión de la iglesia ya la dio Jesús: «id, y haced discípulos a todas las naciones», «enseñándoles que guarden todas las cosas que os he mandado». Cada ministerio la vive en su lugar.",
      },
      { t: "versiculo", ref: "Habacuc 2:2" },
      {
        t: "parrafo",
        texto: "Dios le dijo al profeta: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». Lo que se ve con claridad mueve a actuar.",
      },
      { t: "versiculo", ref: "Nehemías 2:17-18" },
      {
        t: "parrafo",
        texto:
          "Nehemías mostró la necesidad: «venid, y edifiquemos el muro de Jerusalén», contó lo que Dios había hecho, y el pueblo respondió: «Levantémonos y edifiquemos».",
      },
      { t: "subtitulo", texto: "La misión, la visión y los valores" },
      {
        t: "lista",
        items: [
          "La misión: para qué existe el ministerio, dentro de la Gran Comisión. Por ejemplo: llevar a los niños a conocer y seguir a Jesús.",
          "La visión: cómo se verá en unos años si Dios bendice. Por ejemplo: que cada familia del barrio tenga un niño en la escuela bíblica.",
          "Los valores: lo que guía cómo se trabaja, como la Palabra, la protección de los niños, el servicio y el trabajo en equipo.",
          "Cortas: que se puedan decir de memoria, en una o dos frases.",
          "Compartidas: que el equipo las escriba junto con el pastor, no que las dicte uno solo.",
          "Repetidas: en las reuniones, en los anuncios y al tomar decisiones.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una visión clara y una visión borrosa" },
      {
        t: "lista",
        items: [
          "Clara: que cada joven de la iglesia tenga un mentor en dos años. Borrosa: queremos ser un ministerio de impacto.",
          "Clara: el equipo la puede decir de memoria. Borrosa: está en un cuadro que nadie lee.",
          "Clara: ayuda a decir que no a lo que no sirve a la visión. Borrosa: se hace todo lo que se propone.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la visión del ministerio de jóvenes" },
      {
        t: "parrafo",
        texto: "El nuevo líder de jóvenes quiere escribir con su equipo la misión, la visión y los valores del ministerio.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar con el equipo y leer juntos Mateo 28:19-20 y la visión de la iglesia.",
          "Paso 2, preguntarse para qué existe el ministerio, y escribir la misión en una frase: que cada joven conozca a Jesús, crezca en él y sirva a otros.",
          "Paso 3, imaginar cómo se verá en tres años si Dios bendice, y escribirlo: que cada joven tenga un mentor y sirva en un ministerio.",
          "Paso 4, elegir tres o cuatro valores que guiarán el trabajo: la Palabra, la amistad verdadera, el servicio y la protección.",
          "Paso 5, presentarlas al pastor y ajustarlas con su consejo.",
          "Paso 6, compartirlas con todos los jóvenes con una historia que las ilustre, y repetirlas en cada reunión del equipo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La visión de un ministerio se alinea con la de la iglesia y con la misión que dio Jesús; no compite con ellas. Si un ministerio quiere ir en otra dirección, se conversa con el pastor.",
      },
    ],
    ideaClave:
      "Jesús ya dio la misión de la iglesia: hacer discípulos y enseñarles a guardar lo que él mandó; Dios pidió escribir la visión con claridad para que corra el que la lea; y el pueblo respondió a Nehemías: levantémonos y edifiquemos. La misión dice para qué existe el ministerio, la visión cómo se verá en unos años y los valores cómo se trabaja. Se escriben cortas, con el equipo y el pastor, y se repiten hasta que todos las sepan de memoria.",
    paraLaVida: {
      texto: "Lo que se ve con claridad, se sigue con ánimo.",
      pregunta: "¿Podrías decir en una frase para qué existe tu ministerio?",
    },
  },
  {
    id: "liderazgo-administracion-4-3",
    objetivos: [
      "Explicar, con Filipenses 3:13-14 y 1 Corintios 9:26, por qué se corre hacia una meta clara.",
      "Escribir metas SMART: específicas, medibles, asignables, realistas y con tiempo.",
      "Armar el plan del año de un ministerio.",
    ],
    paraEmpezar:
      "Queremos crecer, queremos más jóvenes, queremos servir al barrio: son buenos deseos, pero no son metas. Una meta clara dice qué se quiere lograr, cómo se sabrá si se logró, quién se encarga y para cuándo. Así el equipo sabe hacia dónde corre.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Filipenses 3:13-14" },
      {
        t: "parrafo",
        texto:
          "Pablo dijo: «olvidando ciertamente lo que queda atrás, y extendiéndome a lo que está delante, prosigo a la meta». Tenía claro hacia dónde corría.",
      },
      { t: "versiculo", ref: "1 Corintios 9:26" },
      {
        t: "parrafo",
        texto: "«Así que, yo de esta manera corro, no como a la ventura; de esta manera peleo, no como quien golpea el aire».",
      },
      { t: "versiculo", ref: "Proverbios 21:5" },
      {
        t: "parrafo",
        texto: "«Los pensamientos del diligente ciertamente tienden a la abundancia; Mas todo el que se apresura alocadamente, de cierto va a la pobreza».",
      },
      { t: "subtitulo", texto: "Las metas SMART" },
      {
        t: "parrafo",
        texto:
          "En 1981, George T. Doran propuso en la revista Management Review escribir los objetivos con cinco rasgos, que forman la palabra SMART en inglés. Hoy se usan con pequeñas variantes:",
      },
      {
        t: "lista",
        items: [
          "Específica: dice con claridad qué se quiere lograr.",
          "Medible: se puede saber si se logró, con un número o un hecho.",
          "Asignable: tiene un responsable.",
          "Realista: se puede lograr con las personas y los recursos que hay, con fe y sin fantasía.",
          "Con tiempo: tiene una fecha.",
          "Además, en la iglesia, cada meta sirve a la misión y se pone delante de Dios.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un deseo y una meta" },
      {
        t: "lista",
        items: [
          "Deseo: queremos más jóvenes. Meta: que cada joven del grupo invite a un amigo al campamento de julio, con la meta de 15 nuevos, a cargo del líder de jóvenes.",
          "Deseo: hay que leer más la Biblia. Meta: que 40 hermanos terminen el plan de lectura del Nuevo Testamento antes de diciembre.",
          "Deseo: servir al barrio. Meta: repartir 100 despensas en noviembre, con un equipo de 12 voluntarios.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: de un deseo a una meta y al plan del año" },
      {
        t: "parrafo",
        texto: "El ministerio de niños dice: queremos que los niños conozcan mejor la Biblia. Su líder lo convierte en una meta y en un plan.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, hacerla específica: que los niños de 6 a 11 años memoricen versículos clave.",
          "Paso 2, hacerla medible: que cada niño aprenda 20 versículos.",
          "Paso 3, asignarla: la maestra Carmen coordina, con un maestro por clase.",
          "Paso 4, revisar que sea realista: un versículo cada dos semanas, con premios sencillos y la ayuda de los padres.",
          "Paso 5, ponerle tiempo: de enero a noviembre, con una celebración en diciembre.",
          "Paso 6, ponerla en el plan del año: el calendario, el material que hace falta, su costo en el presupuesto y una revisión cada trimestre.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Pocas metas, bien cumplidas, valen más que muchas que nadie recuerda: tres a cinco por año suelen ser suficientes para un ministerio. Las metas miden lo que podemos hacer; el fruto espiritual lo da Dios.",
      },
      {
        t: "cuadro",
        titulo: "De un deseo a una meta SMART",
        columnas: ["Letra", "Qué pide", "Ejemplo del ministerio de niños"],
        filas: [
          ["Específica", "Decir con claridad qué se quiere lograr", "Que los niños de 6 a 11 años memoricen versículos clave"],
          ["Medible", "Poder saber si se logró", "Veinte versículos por niño"],
          ["Asignable", "Tener un responsable", "La maestra Carmen, con un maestro por clase"],
          ["Realista", "Que se pueda lograr con lo que hay", "Un versículo cada dos semanas, con la ayuda de los padres"],
          ["Con tiempo", "Tener una fecha", "De enero a noviembre, con una celebración en diciembre"],
        ],
      },
    ],
    ideaClave:
      "Pablo proseguía a la meta, no corría a la ventura, y los planes del diligente tienden a la abundancia. Una meta SMART, como propuso George T. Doran en 1981, es específica, medible, asignable, realista y con tiempo, y en la iglesia además sirve a la misión y se pone delante de Dios. Un ministerio elige pocas metas, de tres a cinco por año, y las pone en su plan del año con el calendario, los materiales, el costo y una revisión cada trimestre.",
    paraLaVida: {
      texto: "Un deseo se vuelve meta cuando tiene nombre, número y fecha.",
      pregunta: "¿Qué deseo de tu ministerio podrías convertir hoy en una meta clara?",
    },
  },
  {
    id: "liderazgo-administracion-4-4",
    objetivos: [
      "Explicar, con Nehemías 2 a 6, cómo se lleva un proyecto de principio a fin.",
      "Reconocer las etapas de un proyecto: iniciar, planear, ejecutar, controlar y cerrar.",
      "Organizar un proyecto ministerial con su alcance, su equipo y sus tareas.",
    ],
    paraEmpezar:
      "Una escuela bíblica de vacaciones, la remodelación del salón o una campaña en el barrio no son tareas de todos los días: son proyectos. Tienen un comienzo, un final y un resultado concreto. Llevarlos bien evita el cansancio, los gastos de más y las obras que se quedan a medias.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Nehemías 2:4-5" },
      {
        t: "parrafo",
        texto:
          "Cuando el rey le preguntó qué pedía, Nehemías hizo dos cosas: «oré al Dios de los cielos», y presentó un pedido claro: «envíame a Judá, a la ciudad de los sepulcros de mis padres, y la reedificaré». Pidió tiempo, cartas y madera: un plan con recursos.",
      },
      { t: "versiculo", ref: "Nehemías 3:1" },
      {
        t: "parrafo",
        texto: "El trabajo se repartió por tramos: «se levantó el sumo sacerdote Eliasib con sus hermanos los sacerdotes, y edificaron la puerta de las Ovejas». Cada grupo sabía qué parte le tocaba.",
      },
      { t: "versiculo", ref: "Nehemías 6:15" },
      {
        t: "parrafo",
        texto: "Y el proyecto terminó: «Fue terminado, pues, el muro, el veinticinco del mes de Elul, en cincuenta y dos días».",
      },
      { t: "subtitulo", texto: "Qué es un proyecto y cuáles son sus etapas" },
      {
        t: "parrafo",
        texto:
          "La guía de la dirección de proyectos del Project Management Institute (PMBOK) define un proyecto como un esfuerzo temporal para crear un producto, un servicio o un resultado único: tiene un comienzo y un final definidos, aunque no siempre sea corto. Sus etapas son:",
      },
      {
        t: "lista",
        items: [
          "Iniciar: el propósito, el resultado que se espera y el alcance, es decir, lo que entra y lo que no.",
          "Planear: las tareas, el cronograma, el presupuesto, los riesgos y el equipo.",
          "Ejecutar: hacer el trabajo según el plan, con cada responsable en su parte.",
          "Controlar: revisar cada semana el avance, el tiempo y el dinero, y corregir a tiempo.",
          "Cerrar: entregar el resultado, agradecer, evaluar y guardar lo aprendido.",
          "Un responsable del proyecto que coordina todo y rinde cuentas al consejo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un proyecto con alcance claro y uno que crece sin control" },
      {
        t: "lista",
        items: [
          "Alcance claro: pintar el salón y cambiar las luces. Sin control: ya que estamos, cambiemos el piso, el techo y los baños.",
          "Alcance claro: cada cambio se aprueba con su costo. Sin control: los gastos crecen sin que nadie lo decida.",
          "Alcance claro: se sabe cuándo termina. Sin control: lleva dos años abierto.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la escuela bíblica de vacaciones como proyecto" },
      {
        t: "parrafo",
        texto: "La iglesia quiere hacer una escuela bíblica de vacaciones de cinco días en julio, para 80 niños del barrio.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, iniciar: el propósito, que los niños del barrio conozcan a Jesús; el resultado, cinco mañanas con 80 niños; y el alcance, sin viajes ni comidas completas.",
          "Paso 2, nombrar a una responsable del proyecto y a los encargados de la enseñanza, la música, las manualidades, la seguridad y la inscripción.",
          "Paso 3, planear: las tareas con sus fechas desde marzo, el presupuesto y los riesgos.",
          "Paso 4, ejecutar: cada encargado prepara su parte, y la responsable se reúne con ellos cada semana.",
          "Paso 5, controlar: revisar el avance y el gasto, y decidir con el consejo cualquier cambio del alcance.",
          "Paso 6, cerrar: dar las gracias a los voluntarios, seguir a las familias nuevas, evaluar y guardar lo aprendido para el próximo año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un proyecto grande, como una construcción, necesita además los permisos de la ciudad, contratistas con licencia y la aprobación de la iglesia según sus estatutos.",
      },
    ],
    ideaClave:
      "Nehemías oró y presentó un pedido claro con tiempo y recursos, repartió el trabajo por tramos y terminó el muro en cincuenta y dos días. Según la guía PMBOK, un proyecto es un esfuerzo temporal para crear un resultado único, con un comienzo y un final. Sus etapas son iniciar, con el propósito y el alcance; planear, con las tareas, el cronograma, el presupuesto, los riesgos y el equipo; ejecutar; controlar cada semana; y cerrar, agradeciendo, evaluando y guardando lo aprendido.",
    paraLaVida: {
      texto: "Lo que empieza con oración y orden, se puede terminar.",
      pregunta: "¿Qué proyecto de tu ministerio necesita un alcance más claro?",
    },
  },
  {
    id: "liderazgo-administracion-4-5",
    objetivos: [
      "Explicar, con Lucas 14:28-30 y Nehemías 4:16, por qué un proyecto prevé el tiempo, los riesgos y el dinero.",
      "Hacer el cronograma, la lista de riesgos y el presupuesto de un proyecto.",
      "Ajustar un proyecto que se atrasa o que cuesta más de lo previsto.",
    ],
    paraEmpezar:
      "Muchos proyectos de iglesia empiezan con entusiasmo y se atascan a la mitad: se acabó el dinero, nadie sabía qué seguía o un imprevisto lo detuvo todo. El cronograma, la lista de riesgos y el presupuesto son las herramientas que ayudan a terminar lo que se empieza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=CxiSs-SHTuI", titulo: "Resumen del libro de Lucas (parte 2)", fuente: "Proyecto Biblia" },
      { t: "versiculo", ref: "Lucas 14:28-30" },
      {
        t: "parrafo",
        texto:
          "Jesús advirtió del que empieza sin calcular: «No sea que después que haya puesto el cimiento, y no pueda acabarla, todos los que lo vean comiencen a hacer burla de él, diciendo: Este hombre comenzó a edificar, y no pudo acabar».",
      },
      { t: "versiculo", ref: "Nehemías 4:16" },
      {
        t: "parrafo",
        texto:
          "Ante el peligro de los enemigos, Nehemías ajustó el plan: «la mitad de mis siervos trabajaba en la obra, y la otra mitad tenía lanzas, escudos, arcos y corazas».",
      },
      { t: "versiculo", ref: "Proverbios 24:6" },
      {
        t: "parrafo",
        texto: "«Porque con ingenio harás la guerra, Y en la multitud de consejeros está la victoria».",
      },
      { t: "subtitulo", texto: "Las tres herramientas del proyecto" },
      {
        t: "lista",
        items: [
          "El cronograma: la lista de tareas, con su responsable, su fecha de inicio y de fin, y las que dependen de otras.",
          "La lista de riesgos: qué puede retrasar o encarecer el proyecto, qué tan probable es, cómo se previene y cuál es el plan B.",
          "El presupuesto del proyecto: cada costo, de dónde sale el dinero y un margen para los imprevistos.",
          "El seguimiento: una revisión cada semana de lo hecho, lo que falta y lo gastado.",
          "Los cambios: cualquier cambio del alcance, del tiempo o del costo se decide con el consejo.",
          "La comunicación: la iglesia sabe cómo va el proyecto y cómo puede ayudar.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un proyecto que se sigue y uno que se deja correr" },
      {
        t: "lista",
        items: [
          "Se sigue: cada semana se mira qué tareas se atrasaron. Se deja correr: el atraso se descubre a días de la fecha.",
          "Se sigue: hay un margen para los imprevistos. Se deja correr: el primer imprevisto lo detiene todo.",
          "Se sigue: el plan B ya está pensado. Se deja correr: se improvisa en la crisis.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la remodelación del salón" },
      {
        t: "parrafo",
        texto: "La iglesia va a pintar el salón y cambiar las luces en seis semanas, con 4,000 dólares.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, hacer la lista de las tareas: pedir los presupuestos, comprar los materiales, mover los muebles, pintar, cambiar las luces y limpiar.",
          "Paso 2, ponerles fecha y responsable, y marcar las que dependen de otras: no se pinta antes de mover los muebles.",
          "Paso 3, escribir los riesgos: que llueva, que el electricista se atrase o que los materiales suban, con un plan B para cada uno.",
          "Paso 4, armar el presupuesto con los materiales, el electricista con licencia y un margen de unos 400 dólares para imprevistos.",
          "Paso 5, revisar cada sábado el avance y lo gastado, y avisar al consejo si algo cambia.",
          "Paso 6, al terminar, informar a la iglesia lo que se hizo y lo que se gastó, y dar gracias a Dios y a los voluntarios.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si un proyecto se atrasa o cuesta más, no se esconde: se informa con tiempo y se decide con el consejo si se recorta el alcance, se mueve la fecha o se busca más dinero. Es mejor ajustar que dejar la obra a medias.",
      },
      {
        t: "cuadro",
        titulo: "El cronograma de la remodelación del salón",
        columnas: ["Tarea", "Cuándo", "Responsable", "Depende de"],
        filas: [
          ["Pedir los presupuestos", "Semana 1", "El encargado del edificio", "Nada"],
          ["Comprar los materiales", "Semana 2", "El tesorero y el encargado", "Los presupuestos aprobados"],
          ["Mover los muebles", "Semana 3", "Los voluntarios del sábado", "Los materiales listos"],
          ["Pintar", "Semanas 3 y 4", "El equipo de pintura", "Los muebles movidos"],
          ["Cambiar las luces", "Semana 5", "Un electricista con licencia", "La pintura terminada"],
          ["Limpiar y acomodar", "Semana 6", "Todos los voluntarios", "Las luces cambiadas"],
        ],
      },
    ],
    ideaClave:
      "Jesús advirtió del que comenzó a edificar y no pudo acabar, Nehemías ajustó el plan ante el peligro poniendo a la mitad a trabajar y a la otra mitad a vigilar, y en la multitud de consejeros está la victoria. Un proyecto se lleva con un cronograma de tareas con fechas, responsables y dependencias; una lista de riesgos con su plan B; un presupuesto con un margen para los imprevistos; un seguimiento cada semana; los cambios decididos con el consejo; y una comunicación clara con la iglesia.",
    paraLaVida: {
      texto: "Calcular antes es la mejor manera de terminar.",
      pregunta: "¿Qué obra empezaste y no terminaste, y qué te faltó prever?",
    },
  },
  {
    id: "liderazgo-administracion-4-6",
    objetivos: [
      "Explicar, con Lamentaciones 3:40 y Hechos 14:27, por qué la iglesia evalúa lo que hace y cuenta lo que Dios hizo.",
      "Evaluar un proyecto contra sus metas, con preguntas claras y números honestos.",
      "Guardar lo aprendido y celebrar con la iglesia.",
    ],
    paraEmpezar:
      "Al terminar un proyecto, la tentación es pasar enseguida al siguiente. Pero evaluar es la manera de aprender de los aciertos y de los errores, de dar gracias a Dios por lo que hizo y de planear mejor la próxima vez.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Lamentaciones 3:40" },
      {
        t: "parrafo",
        texto: "«Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová». Revisar lo que hicimos es parte de la vida con Dios.",
      },
      { t: "versiculo", ref: "2 Corintios 13:5" },
      {
        t: "parrafo",
        texto: "Pablo pidió: «Examinaos a vosotros mismos si estáis en la fe; probaos a vosotros mismos». El examen empieza por casa.",
      },
      { t: "versiculo", ref: "Hechos 14:27" },
      {
        t: "parrafo",
        texto:
          "Al volver de su viaje, Pablo y Bernabé reunieron a la iglesia y «refirieron cuán grandes cosas había hecho Dios con ellos». Contar lo que Dios hizo también es parte de la evaluación.",
      },
      { t: "subtitulo", texto: "Cómo se evalúa un proyecto" },
      {
        t: "lista",
        items: [
          "Volver a las metas: qué nos propusimos y qué se logró, con números honestos.",
          "Mirar el proceso: el tiempo, el dinero y el trabajo del equipo.",
          "Escuchar a todos: los voluntarios, los participantes y, si se puede, a los de afuera.",
          "Responder cuatro preguntas: qué funcionó, qué no, qué aprendimos y qué cambiaremos.",
          "Escribir un informe breve para el consejo y guardar lo aprendido en el archivo del ministerio.",
          "Celebrar: contar a la iglesia lo que Dios hizo y dar gracias a los que sirvieron.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una evaluación que enseña y una que culpa o calla" },
      {
        t: "lista",
        items: [
          "Enseña: busca qué mejorar. Culpa: busca a quién echarle la culpa.",
          "Enseña: dice la verdad de los números. Calla: los infla para quedar bien.",
          "Enseña: cuenta lo que Dios hizo. Calla: se olvida de dar gracias.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la evaluación de la escuela bíblica de vacaciones" },
      {
        t: "parrafo",
        texto: "La escuela bíblica terminó: la meta eran 80 niños, y vinieron 65, de los cuales 30 eran del barrio.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reunir al equipo una semana después, con oración y gratitud.",
          "Paso 2, repasar las metas con números honestos: 65 de 80 niños, 30 del barrio y 12 familias nuevas que dieron sus datos para el seguimiento.",
          "Paso 3, mirar el tiempo y el dinero: se gastó un poco menos de lo previsto, pero las inscripciones empezaron tarde.",
          "Paso 4, responder las cuatro preguntas: funcionó la música, no funcionó anunciar solo dentro de la iglesia, aprendimos a invitar en el barrio, y cambiaremos las fechas de la inscripción.",
          "Paso 5, escribir un informe de una página para el consejo y guardarlo con el plan del proyecto.",
          "Paso 6, contar en el culto lo que Dios hizo, con el permiso de las familias para cualquier historia, y dar gracias a los voluntarios.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los números ayudan a ver, pero no miden todo lo que Dios hace en un corazón. Se cuentan con verdad, sin inflarlos, y se ponen delante de Dios con humildad.",
      },
    ],
    ideaClave:
      "La Biblia pide escudriñar nuestros caminos y volvernos a Jehová, examinarnos a nosotros mismos, y contar a la iglesia cuán grandes cosas hizo Dios. Un proyecto se evalúa volviendo a sus metas con números honestos, mirando el tiempo, el dinero y el trabajo, escuchando a todos y respondiendo qué funcionó, qué no, qué aprendimos y qué cambiaremos. Lo aprendido se guarda en un informe breve, y se celebra con la iglesia lo que Dios hizo.",
    paraLaVida: {
      texto: "Evaluar es aprender y también dar gracias.",
      pregunta: "¿Qué aprendiste del último proyecto en el que serviste?",
    },
  },
];
