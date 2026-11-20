/**
 * Especialidad Niñez · Materia 5 — Organizar el ministerio infantil (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la misión, la visión y los valores del
 * ministerio, el equipo de voluntarios, los grupos por edad, las salas y el horario, el currículo y el calendario del
 * año, la Escuela Bíblica de Vacaciones y el seguimiento de las familias, y el presupuesto y la evaluación.
 */
import type { LeccionContenido } from "../tipos";

export const NINEZ_5: LeccionContenido[] = [
  {
    id: "ninez-5-1",
    objetivos: [
      "Distinguir la misión, la visión y los valores de un ministerio.",
      "Escribir la misión del ministerio de niños de una iglesia.",
      "Explicar por qué el ministerio de niños trabaja junto con las familias.",
    ],
    paraEmpezar:
      "Un ministerio de niños puede tener muchas actividades y, aun así, no saber para qué existe. Antes de organizar salas, horarios y maestros, el líder necesita tener clara la meta, y escribirla.",
    bloques: [
      { t: "versiculo", ref: "Habacuc 2:2" },
      {
        t: "parrafo",
        texto:
          "Dios le dijo al profeta: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». Lo que está escrito con claridad se puede seguir. Un ministerio que escribe su propósito ayuda a que todos corran en la misma dirección.",
      },
      { t: "versiculo", ref: "Proverbios 29:18" },
      {
        t: "parrafo",
        texto:
          "Este proverbio habla de la revelación de Dios: «Sin profecía el pueblo se desenfrena; Mas el que guarda la ley es bienaventurado». El ministerio de niños no inventa su propósito: lo recibe de la Palabra.",
      },
      { t: "versiculo", ref: "Deuteronomio 31:12-13" },
      {
        t: "parrafo",
        texto:
          "Moisés mandó reunir a todo el pueblo, «varones y mujeres y niños», para que oyeran y aprendieran, y para que «los hijos de ellos que no supieron, oigan, y aprendan a temer a Jehová vuestro Dios». Los niños siempre fueron parte del pueblo que aprende.",
      },
      { t: "subtitulo", texto: "Misión, visión y valores" },
      {
        t: "lista",
        items: [
          "La misión: para qué existe el ministerio; por ejemplo, ayudar a cada niño a conocer a Jesús, amarlo y seguirlo, junto con su familia.",
          "La visión: lo que se quiere ver en unos años; por ejemplo, que cada niño llegue a los doce años sabiendo orar, conociendo la historia de la Biblia y sirviendo en la iglesia.",
          "Los valores: cómo se trabaja; por ejemplo, la Palabra en el centro, la seguridad de cada niño, la alianza con las familias y la excelencia sin orgullo.",
        ],
      },
      { t: "subtitulo", texto: "Dos maneras de entender el ministerio" },
      {
        t: "lista",
        items: [
          "Un ministerio que entretiene cuida a los niños mientras los adultos están en el culto. Uno que forma discípulos les enseña a conocer, amar y seguir a Jesús.",
          "Un ministerio que entretiene mide el éxito por lo que los niños se divirtieron. Uno que forma discípulos lo mide también por lo que aprendieron y viven.",
          "Un ministerio que entretiene trabaja aparte de los padres. Uno que forma discípulos trabaja junto con ellos, porque los padres son los primeros maestros.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "La iglesia no reemplaza a los padres: los ayuda. Les cuenta qué aprendieron sus hijos, les da recursos para la casa y ora con ellos. Una hora el domingo da fruto cuando en la casa se sigue enseñando durante la semana.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: escribir la misión del ministerio, paso a paso" },
      {
        t: "lista",
        items: [
          "Paso 1, orar y leer: el equipo ora y lee textos como Deuteronomio 6:6-7, Mateo 22:37-39 y Mateo 28:19-20.",
          "Paso 2, preguntar: ¿qué queremos que sea un niño cuando termine el ministerio, a los doce años?",
          "Paso 3, escribir una frase: ayudar a cada niño a conocer a Jesús, amarlo y seguirlo, junto con su familia.",
          "Paso 4, probarla: ¿la entiende un niño? ¿La pueden repetir los maestros? Si no, se acorta.",
          "Paso 5, elegir de tres a cinco valores: la Palabra en el centro, la seguridad, la alianza con las familias, la excelencia y el amor por cada niño.",
          "Paso 6, presentarla: se la muestra al pastor, a los maestros y a los padres, y se la pone a la vista en las salas.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La misión del ministerio de niños está dentro de la visión de la iglesia y de su declaración de fe. Antes de escribirla, conversa con el pastor.",
      },
    ],
    ideaClave:
      "Dios mandó escribir la visión con claridad, para que corra el que la lee, y siempre reunió a los niños con su pueblo para que oyeran y aprendieran. Un ministerio de niños tiene una misión, una visión y unos valores escritos, que recibe de la Palabra y que están dentro de la visión de la iglesia. No solo cuida a los niños: forma discípulos que conocen, aman y siguen a Jesús, y trabaja junto con las familias, porque los padres son los primeros maestros.",
    paraLaVida: {
      texto: "Lo que está escrito con claridad se puede seguir.",
      pregunta: "¿Podrían los maestros de tu iglesia decir en una frase para qué existe el ministerio de niños?",
    },
  },
  {
    id: "ninez-5-2",
    objetivos: [
      "Explicar, con el consejo de Jetro, por qué el ministerio de niños necesita un equipo.",
      "Describir los servicios que forman el equipo del ministerio de niños.",
      "Sumar y cuidar a los voluntarios paso a paso.",
    ],
    paraEmpezar:
      "Muchos ministerios de niños dependen de una sola persona que hace todo, hasta que se cansa. La Biblia muestra otro camino: formar un equipo y repartir el trabajo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=y9pED55wMM4", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Moisés atendía solo a todo el pueblo, y su suegro le dijo: «No está bien lo que haces. Desfallecerás del todo, tú, y también este pueblo que está contigo; porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».",
      },
      { t: "versiculo", ref: "Éxodo 18:21" },
      {
        t: "parrafo",
        texto:
          "Jetro le aconsejó buscar ayudantes y le dijo cómo elegirlos: «varones de virtud, temerosos de Dios, varones de verdad, que aborrezcan la avaricia». Y los organizó por grupos, como «jefes de millares, de centenas, de cincuenta y de diez». El buen equipo tiene personas de carácter y un orden claro.",
      },
      { t: "versiculo", ref: "Efesios 4:11-12" },
      {
        t: "parrafo",
        texto:
          "Cristo dio pastores y maestros «a fin de perfeccionar a los santos para la obra del ministerio». El líder de niños no hace todo: prepara a otros para servir.",
      },
      { t: "subtitulo", texto: "Los servicios del equipo" },
      {
        t: "lista",
        items: [
          "El coordinador: dirige el ministerio, cuida al equipo y rinde cuentas al pastor.",
          "Los líderes de grupo: uno por cada grupo de edad, que guía a sus maestros.",
          "Los maestros: preparan y dan la clase.",
          "Los ayudantes: acompañan a los maestros, cuidan a los niños y preparan los materiales.",
          "La bienvenida y el registro: reciben a las familias y anotan la entrada y la salida.",
          "La alabanza: enseñan a los niños a cantar y a adorar.",
          "El apoyo y la oración: compran materiales, limpian las salas y oran por los niños y los maestros.",
        ],
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "parrafo",
        texto:
          "Cada uno sirve con lo que Dios le dio: «Cada uno según el don que ha recibido, minístrelo a los otros». No todos tienen que enseñar: el que no enseña puede recibir a las familias, preparar materiales u orar.",
      },
      { t: "versiculo", ref: "Mateo 9:37-38" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó a empezar orando: «Rogad, pues, al Señor de la mies, que envíe obreros a su mies».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: sumar voluntarios, paso a paso" },
      {
        t: "lista",
        items: [
          "Paso 1, contar lo que falta: cuántas personas se necesitan en cada sala, con turnos para que nadie sirva todos los domingos.",
          "Paso 2, orar: el equipo ora durante un mes por nuevos obreros.",
          "Paso 3, invitar en persona: se habla con cada hermano, se le explica el servicio y se le dice por qué se pensó en él; un anuncio general casi nunca basta.",
          "Paso 4, seleccionar: cada uno pasa por los pasos de la selección que se estudian en la materia Protección de menores.",
          "Paso 5, capacitar y acompañar: aprende la misión, la política de protección y cómo se da una clase, y sirve unas semanas junto a otro.",
          "Paso 6, cuidar: se le agradece, se respetan sus turnos y su descanso, y se lo invita a la reunión de maestros.",
          "Paso 7, evaluar juntos: cada cierto tiempo se conversa sobre cómo se siente y si quiere seguir en el mismo servicio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un voluntario cuidado se queda; uno olvidado se va. Anota en tu calendario una manera de agradecer al equipo cada trimestre.",
      },
    ],
    ideaClave:
      "Jetro le dijo a Moisés que no podía hacerlo solo, y le aconsejó elegir personas de carácter y organizarlas por grupos; Cristo dio pastores y maestros para preparar a los santos para la obra del ministerio. El ministerio de niños es un equipo: coordinador, líderes de grupo, maestros, ayudantes, bienvenida y registro, alabanza, apoyo y oración, y cada uno sirve según el don que recibió. Los voluntarios se suman orando, invitando en persona, seleccionando, capacitando y acompañando, y se quedan cuando se los cuida.",
    paraLaVida: {
      texto: "El líder de niños no hace todo: prepara a otros para servir.",
      pregunta: "¿Qué servicio de tu ministerio depende hoy de una sola persona?",
    },
  },
  {
    id: "ninez-5-3",
    objetivos: [
      "Organizar a los niños en grupos por edad, según el tamaño de la iglesia.",
      "Preparar salas seguras y adecuadas para cada edad.",
      "Elegir el horario y la forma del ministerio de niños.",
    ],
    paraEmpezar:
      "Un niño de dos años y uno de once no aprenden de la misma manera. Organizar bien los grupos, las salas y el horario hace posible todo lo demás.",
    bloques: [
      { t: "versiculo", ref: "1 Corintios 14:33" },
      {
        t: "parrafo",
        texto:
          "Pablo ordenó el culto de la iglesia de Corinto porque «Dios no es Dios de confusión, sino de paz». El orden en el ministerio de niños no es frialdad: es paz para los niños, para los maestros y para los padres.",
      },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto: "Y lo resumió así: «pero hágase todo decentemente y con orden».",
      },
      { t: "subtitulo", texto: "Los grupos por edad" },
      {
        t: "lista",
        items: [
          "La cuna, de 0 a 2 años: cuidado amoroso, canciones y oraciones sencillas.",
          "Los preescolares, de 3 a 5 años: historias cortas, canciones con gestos y actividades con las manos.",
          "Los escolares, de 6 a 9 años: historias, juegos de repaso, versículos de memoria y trabajos en grupo.",
          "Los preadolescentes, de 10 a 12 años: preguntas abiertas, conversación y servicio.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "En una iglesia pequeña, los grupos se unen: por ejemplo, la cuna, los de 3 a 5 años y los de 6 a 12, con actividades distintas para los mayores y los menores. Lo importante es que cada niño reciba algo para su edad, como se vio en la materia El niño y su fe.",
      },
      { t: "subtitulo", texto: "Cuántos adultos por sala" },
      {
        t: "parrafo",
        texto:
          "Siempre hay al menos dos adultos seleccionados por sala. Muchas iglesias usan como guía más adultos cuanto más pequeños son los niños: por ejemplo, un adulto por cada tres o cuatro bebés, uno por cada seis u ocho preescolares y uno por cada diez o doce escolares. Averigua lo que recomiendan tu concilio o tu aseguradora.",
      },
      { t: "versiculo", ref: "Proverbios 24:3-4" },
      {
        t: "parrafo",
        texto:
          "La casa se edifica con sabiduría: «Con sabiduría se edificará la casa, Y con prudencia se afirmará». También la sala de los niños se prepara con sabiduría.",
      },
      { t: "subtitulo", texto: "Una sala segura y adecuada" },
      {
        t: "lista",
        items: [
          "Limpia, con buena luz y con una ventana en la puerta.",
          "Con muebles y materiales a la altura de los niños.",
          "Con los enchufes cubiertos, sin objetos peligrosos ni cosas pequeñas al alcance de los bebés.",
          "Cerca de un baño y de una salida de emergencia, con el plan de salida a la vista.",
          "Con un lugar para el registro a la entrada, y un botiquín.",
        ],
      },
      { t: "subtitulo", texto: "El horario: tres maneras comunes" },
      {
        t: "lista",
        items: [
          "La escuela dominical antes del culto: los niños y los adultos estudian a la misma hora, y los maestros pueden estar en el culto.",
          "La iglesia infantil durante el culto: los niños tienen su propio culto, pero los maestros necesitan turnos para no perderse siempre el culto de los adultos.",
          "Una reunión entre semana: da más tiempo, pero pide más compromiso de los maestros y de las familias.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Muchas iglesias combinan: los niños empiezan el culto con sus padres, en la alabanza, y después pasan a sus salas. Así aprenden a adorar con la iglesia y reciben una enseñanza para su edad.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: organizar una iglesia con 25 niños" },
      {
        t: "lista",
        items: [
          "Paso 1, contar: hay 4 bebés, 8 niños de 3 a 5 años y 13 de 6 a 12.",
          "Paso 2, formar los grupos: tres grupos, la cuna, los de 3 a 5 y los de 6 a 12.",
          "Paso 3, calcular los adultos: dos por sala son seis cada domingo; con dos turnos que se alternan, hacen falta doce voluntarios.",
          "Paso 4, preparar las salas: se revisa cada una con la lista de una sala segura.",
          "Paso 5, elegir el horario: los niños empiezan el culto con sus padres y pasan a sus salas después de la alabanza.",
          "Paso 6, avisar a las familias: se les explica cómo funcionan el registro, los grupos y el horario.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuando un grupo crece más que su sala o que sus maestros, es hora de dividirlo. Planea la división antes de que la sala se llene.",
      },
    ],
    ideaClave:
      "Dios no es Dios de confusión, sino de paz, y en la iglesia todo se hace decentemente y con orden. El ministerio de niños se organiza en grupos por edad, que en una iglesia pequeña se unen, con al menos dos adultos seleccionados por sala y más adultos cuanto más pequeños son los niños. Las salas son limpias, seguras y a la altura de los niños, y el horario se elige entre la escuela dominical, la iglesia infantil durante el culto o una reunión entre semana, o se combinan.",
    paraLaVida: {
      texto: "El orden no es frialdad: es paz para los niños, los maestros y los padres.",
      pregunta: "¿Qué grupo de tu iglesia necesita hoy más adultos o una sala mejor?",
    },
  },
  {
    id: "ninez-5-4",
    objetivos: [
      "Elegir un currículo con criterios bíblicos y prácticos.",
      "Planear la enseñanza en ciclos que recorren toda la Biblia.",
      "Armar el calendario del año del ministerio de niños.",
    ],
    paraEmpezar:
      "Sin un plan, cada maestro enseña lo que se le ocurre, y algunas historias se repiten mientras otras nunca se cuentan. Un currículo y un calendario ayudan a que los niños reciban todo el consejo de Dios.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "«Toda la Escritura es inspirada por Dios, y útil para enseñar». Por eso el plan de enseñanza no se queda en unas pocas historias favoritas: recorre toda la Biblia.",
      },
      { t: "subtitulo", texto: "Cómo elegir un currículo" },
      {
        t: "lista",
        items: [
          "Es bíblico y está centrado en Cristo: cada historia lleva a Jesús.",
          "Recorre toda la historia de la Biblia, del Antiguo y del Nuevo Testamento.",
          "Es adecuado para cada edad.",
          "Tiene aplicación para la vida del niño.",
          "Es fácil de preparar para un maestro voluntario.",
          "Está de acuerdo con la declaración de fe del ministerio.",
          "Trae algo para la familia: una hoja o una pregunta para la casa.",
        ],
      },
      { t: "subtitulo", texto: "Comprar un currículo o escribir uno propio" },
      {
        t: "lista",
        items: [
          "Comprar uno: ahorra tiempo y trae materiales listos, pero hay que revisar que esté de acuerdo con la declaración de fe y adaptarlo a la iglesia.",
          "Escribir uno propio: se ajusta a la iglesia, pero pide mucho tiempo y personas preparadas.",
          "Una salida común: usar uno bueno y adaptarlo, con la revisión del pastor.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Un plan en ciclos ayuda a recorrer toda la Biblia. Por ejemplo, un ciclo de tres años: un año para el Antiguo Testamento, otro para la vida de Jesús y otro para la iglesia y las verdades básicas de la fe. Cuando el ciclo termina, empieza otra vez con actividades nuevas, porque los niños ya crecieron.",
      },
      { t: "versiculo", ref: "Josué 4:6-7" },
      {
        t: "parrafo",
        texto:
          "Las piedras del Jordán estaban para que los hijos preguntaran: «cuando vuestros hijos preguntaren a sus padres mañana, diciendo: ¿Qué significan estas piedras?». Las fechas especiales del calendario también hacen preguntar, y cada pregunta es una oportunidad para enseñar.",
      },
      { t: "versiculo", ref: "Lucas 2:41-42" },
      {
        t: "parrafo",
        texto:
          "Jesús creció con el calendario de su pueblo: «Iban sus padres todos los años a Jerusalén en la fiesta de la pascua».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el calendario de un año, paso a paso" },
      {
        t: "lista",
        items: [
          "Paso 1, las fechas de la fe: la Navidad y la Semana Santa, con la muerte y la resurrección de Jesús.",
          "Paso 2, las fechas de la familia: el Día de las Madres, el Día del Padre y la presentación de niños.",
          "Paso 3, el verano: la Escuela Bíblica de Vacaciones, con sus fechas y su equipo.",
          "Paso 4, el regreso a clases: un domingo para orar por los estudiantes y sus maestros.",
          "Paso 5, el equipo: dos capacitaciones al año y una reunión de maestros cada mes.",
          "Paso 6, un domingo de los niños: los niños sirven en el culto, cantando, leyendo o recibiendo a las personas.",
          "Paso 7, las evaluaciones: una reunión al final de cada trimestre.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Entrega el calendario a los maestros y a los padres al comenzar el año. Lo que está en el calendario se prepara con tiempo; lo que no está, se improvisa.",
      },
    ],
    ideaClave:
      "Toda la Escritura es útil para enseñar; por eso el ministerio de niños no se queda con unas pocas historias. Elige un currículo bíblico y centrado en Cristo, adecuado a cada edad, con aplicación, fácil de preparar, de acuerdo con la declaración de fe y con algo para la familia, y lo organiza en ciclos que recorren toda la Biblia. Como las piedras del Jordán y las fiestas de Israel, el calendario del año aprovecha las fechas que hacen preguntar a los niños, y deja su lugar al verano, al equipo y a las evaluaciones.",
    paraLaVida: {
      texto: "Lo que está en el calendario se prepara con tiempo; lo que no está, se improvisa.",
      pregunta: "¿Qué parte de la Biblia no han escuchado nunca los niños de tu iglesia?",
    },
  },
  {
    id: "ninez-5-5",
    objetivos: [
      "Explicar por qué el ministerio de niños alcanza también a las familias que no conocen a Cristo.",
      "Planear una Escuela Bíblica de Vacaciones paso a paso.",
      "Dar seguimiento a las familias nuevas.",
    ],
    paraEmpezar:
      "Muchas familias que no entrarían a un culto sí traen a sus hijos a una actividad para niños. El ministerio de niños puede ser una puerta abierta de la iglesia hacia su barrio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Mateo 9:36" },
      {
        t: "parrafo",
        texto:
          "Jesús miraba a la gente con compasión: «Y al ver las multitudes, tuvo compasión de ellas; porque estaban desamparadas y dispersas como ovejas que no tienen pastor». En cada barrio hay niños y familias así.",
      },
      { t: "versiculo", ref: "Lucas 14:23" },
      {
        t: "parrafo",
        texto:
          "En la parábola de la gran cena, el señor mandó: «Ve por los caminos y por los vallados, y fuérzalos a entrar, para que se llene mi casa». La iglesia no espera a que los niños lleguen solos: sale a invitarlos.",
      },
      { t: "versiculo", ref: "Hechos 16:31-32" },
      {
        t: "parrafo",
        texto:
          "Pablo y Silas le dijeron al carcelero de Filipos: «Cree en el Señor Jesucristo, y serás salvo, tú y tu casa». Y «le hablaron la palabra del Señor a él y a todos los que estaban en su casa». El evangelio alcanza a las familias enteras.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una Escuela Bíblica de Vacaciones, paso a paso" },
      {
        t: "lista",
        items: [
          "Tres meses antes: el pastor y el equipo eligen el tema, las fechas, el presupuesto y a los responsables.",
          "Dos meses antes: se preparan las historias, las manualidades y los juegos; se suman y se seleccionan los voluntarios, y se los capacita, también en la protección de menores.",
          "Un mes antes: se invita en el barrio y en las escuelas cercanas, y se abre la inscripción con los datos de cada niño, sus alergias, el teléfono de los padres y su permiso.",
          "Cada día: bienvenida y registro, alabanza, la historia, la manualidad, el juego, la merienda y el cierre, con la entrega de cada niño a quien lo trajo.",
          "El último día: un programa con las familias, donde los niños cantan y muestran lo que aprendieron.",
          "Después: en las dos semanas siguientes, se llama o se visita a cada familia nueva y se la invita a la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Otras puertas abiertas" },
      {
        t: "lista",
        items: [
          "Un club bíblico en una casa o en un parque, con el permiso de los padres y siempre con dos adultos.",
          "Días especiales, como una fiesta de otoño o un día de juegos, con una historia de la Biblia.",
          "Apoyo a los padres: talleres sobre la crianza y una hoja semanal para hablar de Dios en casa.",
          "Recibir bien a las visitas: alguien acompaña a la familia nueva, le explica el registro y la llama en la semana.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Con los niños de familias que no son cristianas, la iglesia actúa con respeto: pide el permiso de los padres, les cuenta lo que se enseña y nunca presiona a un niño para que tome una decisión, como se vio en la materia El niño y su fe.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El fruto de una actividad no se mide solo ese día: se mide en cuántas familias nuevas siguen viniendo un mes después. Por eso el seguimiento es parte del plan, no un agregado.",
      },
    ],
    ideaClave:
      "Jesús tuvo compasión de las multitudes, que estaban como ovejas sin pastor; el señor de la parábola mandó salir por los caminos para llenar su casa, y el evangelio llegó a toda la casa del carcelero de Filipos. El ministerio de niños abre puertas al barrio con la Escuela Bíblica de Vacaciones, los clubes bíblicos, los días especiales y el apoyo a los padres, siempre con permiso y con respeto, y da seguimiento a cada familia nueva.",
    paraLaVida: {
      texto: "El ministerio de niños puede ser una puerta abierta de la iglesia hacia su barrio.",
      pregunta: "¿Qué familia nueva de tu iglesia necesita una llamada esta semana?",
    },
  },
  {
    id: "ninez-5-6",
    objetivos: [
      "Armar el presupuesto del ministerio de niños.",
      "Evaluar el ministerio con números y con fruto.",
      "Poner metas concretas e informar al pastor.",
    ],
    paraEmpezar:
      "Un ministerio crece cuando se detiene a mirar cómo va. Evaluar no es buscar culpables: es preguntar con humildad qué está dando fruto y qué hay que cambiar.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Lucas 14:28-30" },
      {
        t: "parrafo",
        texto:
          "Jesús habló del que quiere edificar una torre y «no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla». También el ministerio de niños calcula lo que necesita antes de empezar.",
      },
      { t: "subtitulo", texto: "El presupuesto" },
      {
        t: "lista",
        items: [
          "Los materiales y el currículo.",
          "La seguridad: la verificación de antecedentes, las etiquetas del registro y el botiquín.",
          "La capacitación del equipo.",
          "Los eventos, como la Escuela Bíblica de Vacaciones.",
          "Los muebles y el equipo de las salas.",
          "Las meriendas.",
          "El agradecimiento a los voluntarios.",
        ],
      },
      { t: "versiculo", ref: "1 Corintios 4:2" },
      {
        t: "parrafo",
        texto:
          "Lo que se recibe se administra con fidelidad: «se requiere de los administradores, que cada uno sea hallado fiel». El líder rinde cuentas de cómo usó el dinero.",
      },
      { t: "subtitulo", texto: "Lo que se cuenta y lo que se ve" },
      {
        t: "lista",
        items: [
          "Lo que se cuenta: la asistencia, los niños nuevos, los que vuelven, los voluntarios activos y los turnos cubiertos.",
          "Lo que se ve: niños que oran, que conocen la historia de la Biblia, que recitan versículos y que sirven, y familias que hablan de Dios en casa.",
          "Los números ayudan a ver, pero no son el fruto: un ministerio puede crecer en número sin formar discípulos.",
        ],
      },
      { t: "versiculo", ref: "Lamentaciones 3:40" },
      {
        t: "parrafo",
        texto:
          "La evaluación empieza delante de Dios: «Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová».",
      },
      { t: "versiculo", ref: "Proverbios 15:22" },
      {
        t: "parrafo",
        texto:
          "Y se hace con otros: «Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman». Se escucha a los maestros, a los padres y también a los niños.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la reunión de evaluación de cada trimestre" },
      {
        t: "lista",
        items: [
          "Paso 1, orar: el equipo empieza pidiendo a Dios que le muestre sus caminos.",
          "Paso 2, mirar los números: la asistencia, los nuevos, los voluntarios y los turnos.",
          "Paso 3, escuchar: lo que dicen los maestros, los padres y los niños.",
          "Paso 4, celebrar: se agradece lo que Dios hizo y se nombra a los que sirvieron.",
          "Paso 5, nombrar un problema: por ejemplo, la sala de preescolares tiene un solo turno de maestros.",
          "Paso 6, poner una meta concreta: para marzo, dos maestros más en esa sala, con su selección completa; responsable, la coordinadora.",
          "Paso 7, informar y revisar: se envía un informe breve al pastor, y en la próxima reunión se revisa la meta.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una meta clara dice qué, para cuándo y quién. Pocas metas cumplidas valen más que muchas olvidadas.",
      },
    ],
    ideaClave:
      "Jesús enseñó a calcular los gastos antes de edificar, y de los administradores se requiere que sean hallados fieles. El ministerio de niños arma su presupuesto y evalúa con números y con fruto; la evaluación empieza delante de Dios y se hace con consejo, escuchando a maestros, padres y niños. Cada trimestre el equipo ora, mira los números, escucha, celebra, nombra un problema, pone una meta concreta con fecha y responsable, e informa al pastor.",
    paraLaVida: {
      texto: "Pocas metas cumplidas valen más que muchas olvidadas.",
      pregunta: "¿Qué meta concreta pondrías hoy para el ministerio de niños de tu iglesia?",
    },
  },
];
