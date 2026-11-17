/**
 * Especialidad Juventud · Materia 1 — Discipulado de jóvenes (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: por qué discipular a los jóvenes, cómo
 * formó Jesús a sus discípulos (los ocho principios de Robert E. Coleman), Pablo y Timoteo, los grupos pequeños y la
 * mentoría, las disciplinas del joven discípulo y cómo un joven llega a discipular a otros.
 */
import type { LeccionContenido } from "../tipos";

export const JUVENTUD_1: LeccionContenido[] = [
  {
    id: "juventud-1-1",
    objetivos: [
      "Explicar por qué la juventud es un tiempo decisivo para seguir a Cristo.",
      "Distinguir un ministerio juvenil que entretiene de uno que forma discípulos.",
      "Describir qué es un discípulo de Jesús.",
    ],
    paraEmpezar:
      "En pocos años, un joven decide qué va a creer, con quién se va a casar, a qué se va a dedicar y qué lugar tendrá Dios en su vida. Por eso la iglesia no puede conformarse con entretener a sus jóvenes: necesita formar discípulos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Eclesiastés 12:1" },
      {
        t: "parrafo",
        texto:
          "El sabio le habla al joven: «Acuérdate de tu Creador en los días de tu juventud, antes que vengan los días malos». La juventud no es una sala de espera: es el mejor tiempo para poner a Dios en el centro.",
      },
      { t: "versiculo", ref: "Lamentaciones 3:27" },
      {
        t: "parrafo",
        texto:
          "Y otro texto lo confirma: «Bueno le es al hombre llevar el yugo desde su juventud». Lo que se aprende joven, se lleva toda la vida.",
      },
      { t: "versiculo", ref: "1 Timoteo 4:12" },
      {
        t: "parrafo",
        texto:
          "Pablo le escribió a un líder joven: «Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza». Los jóvenes no son solo el futuro de la iglesia: son parte de la iglesia de hoy, y pueden ser ejemplo.",
      },
      { t: "versiculo", ref: "Jeremías 1:6-8" },
      {
        t: "parrafo",
        texto:
          "Cuando Jeremías dijo que era muy joven para hablar, Dios le respondió: «No digas: Soy un niño; porque a todo lo que te envíe irás tú». Dios llama a los jóvenes, y los acompaña: «contigo estoy para librarte».",
      },
      { t: "subtitulo", texto: "Dos maneras de hacer ministerio juvenil" },
      {
        t: "lista",
        items: [
          "El que entretiene llena el salón con juegos y música. El que forma discípulos también se divierte, pero lleva a cada joven a seguir a Jesús.",
          "El que entretiene mide el éxito por cuántos vinieron. El que forma discípulos lo mide también por cuántos oran, leen la Biblia y sirven.",
          "El que entretiene depende de un líder que hace todo. El que forma discípulos tiene líderes que acompañan a pocos jóvenes de cerca.",
          "El que entretiene pierde a los jóvenes cuando terminan la escuela. El que forma discípulos los prepara para seguir a Cristo cuando se van de la casa.",
        ],
      },
      { t: "subtitulo", texto: "Qué es un discípulo" },
      {
        t: "lista",
        items: [
          "Un discípulo es un aprendiz: alguien que está con Jesús y aprende de él.",
          "Sigue a Jesús: obedece lo que él manda, aunque cueste.",
          "Se va pareciendo a Jesús: su carácter cambia con el tiempo.",
          "Hace otros discípulos: lo que recibe, lo pasa a otros.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: mirar el ministerio juvenil de tu iglesia" },
      {
        t: "lista",
        items: [
          "Paso 1, contar: ¿cuántos jóvenes vienen, y cuántos de ellos leen la Biblia por su cuenta durante la semana?",
          "Paso 2, preguntar: ¿cada joven tiene un adulto o un líder que lo conoce por su nombre y ora por él?",
          "Paso 3, mirar el servicio: ¿cuántos jóvenes sirven en algo, en la iglesia o en el barrio?",
          "Paso 4, mirar a los que se fueron: ¿qué pasó con los que terminaron la escuela en los últimos años?",
          "Paso 5, decidir: elegir un cambio concreto para empezar, como formar grupos pequeños con un líder cada uno.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las respuestas a estas preguntas no son para culpar a nadie. Son para ver con honestidad si el ministerio está formando discípulos, y orar juntos por lo que hay que cambiar.",
      },
    ],
    ideaClave:
      "La juventud es el tiempo de acordarse del Creador y de llevar el yugo desde temprano; Pablo le pidió a Timoteo que nadie tuviera en poco su juventud y que fuera ejemplo, y Dios llamó a Jeremías aunque decía ser niño. Un ministerio juvenil que forma discípulos no se queda en entretener: lleva a cada joven a estar con Jesús, seguirlo, parecerse a él y hacer otros discípulos, con líderes que acompañan de cerca.",
    paraLaVida: {
      texto: "Los jóvenes no son solo el futuro de la iglesia: son parte de la iglesia de hoy.",
      pregunta: "¿Qué joven de tu iglesia no tiene todavía a nadie que lo acompañe de cerca?",
    },
  },
  {
    id: "juventud-1-2",
    objetivos: [
      "Describir cómo eligió y formó Jesús a sus discípulos.",
      "Explicar los ocho principios del discipulado de Robert E. Coleman.",
      "Aplicar esos principios al acompañamiento de un grupo de jóvenes.",
    ],
    paraEmpezar:
      "Jesús pudo haber dedicado su tiempo solo a las multitudes. Sin embargo, pasó la mayor parte de su ministerio con unos pocos hombres. Ese fue su plan para alcanzar al mundo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Lucas 6:12-13" },
      {
        t: "parrafo",
        texto:
          "Antes de elegir a los doce, Jesús «fue al monte a orar, y pasó la noche orando a Dios». Elegir a quiénes acompañar de cerca empieza con oración.",
      },
      { t: "versiculo", ref: "Marcos 3:13-14" },
      {
        t: "parrafo",
        texto:
          "Marcos dice para qué los eligió: «Y estableció a doce, para que estuviesen con él, y para enviarlos a predicar». Primero estar con él; después ser enviados.",
      },
      { t: "versiculo", ref: "Mateo 4:19" },
      {
        t: "parrafo",
        texto:
          "La invitación tenía una promesa: «Venid en pos de mí, y os haré pescadores de hombres». Jesús no solo los llamó a creer, sino a seguirlo y a ser transformados.",
      },
      { t: "versiculo", ref: "Juan 15:15" },
      {
        t: "parrafo",
        texto:
          "Y la relación se volvió amistad: «os he llamado amigos, porque todas las cosas que oí de mi Padre, os las he dado a conocer». El discipulado no es una clase fría: es una relación.",
      },
      { t: "subtitulo", texto: "Los ocho principios de Coleman" },
      {
        t: "parrafo",
        texto:
          "Robert E. Coleman estudió en los evangelios cómo formó Jesús a sus discípulos, y lo resumió en ocho principios, en su libro Plan supremo de evangelización:",
      },
      {
        t: "lista",
        items: [
          "Selección: Jesús eligió a unos pocos para acompañarlos de cerca.",
          "Asociación: pasó tiempo con ellos; estaban con él.",
          "Consagración: les pidió obediencia.",
          "Impartición: se dio a sí mismo y les dio su Espíritu.",
          "Demostración: les mostró cómo vivir, orar y servir.",
          "Delegación: les dio tareas y los envió.",
          "Supervisión: los escuchó al volver y los corrigió.",
          "Reproducción: esperó que hicieran otros discípulos.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: los ocho principios con tres jóvenes" },
      {
        t: "lista",
        items: [
          "Selección: un líder ora un mes y elige a tres jóvenes con hambre de Dios, del mismo sexo que él.",
          "Asociación: se reúne con ellos cada semana y, además, comparten la vida: un partido, una comida, un servicio.",
          "Consagración: les pide un compromiso sencillo: leer la Biblia cada día y llegar a la reunión.",
          "Impartición: les cuenta su testimonio, también sus luchas, y ora por cada uno por su nombre.",
          "Demostración: los lleva con él cuando visita a un enfermo o habla de Jesús con un amigo.",
          "Delegación: les pide que dirijan la oración o un juego en la reunión de jóvenes.",
          "Supervisión: después conversan sobre cómo les fue y qué pueden mejorar.",
          "Reproducción: al año, cada uno empieza a acompañar a un joven menor que él.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los jóvenes menores de edad se acompañan siempre a la vista de otros y con el conocimiento de sus padres, como se estudia en la materia Protección de menores de la especialidad Niñez.",
      },
    ],
    ideaClave:
      "Jesús oró toda la noche antes de elegir a los doce, y los estableció para que estuvieran con él y para enviarlos; los llamó a seguirlo y los trató como amigos. Robert E. Coleman resumió su método en ocho principios: selección, asociación, consagración, impartición, demostración, delegación, supervisión y reproducción. El líder juvenil los aplica acompañando de cerca a pocos jóvenes, que con el tiempo acompañan a otros.",
    paraLaVida: {
      texto: "Primero estar con él; después ser enviados.",
      pregunta: "¿Con qué tres jóvenes podrías pasar más tiempo este año?",
    },
  },
  {
    id: "juventud-1-3",
    objetivos: [
      "Describir la relación de discipulado entre Pablo y Timoteo.",
      "Explicar qué necesita un joven: un mentor, un compañero y alguien a quien formar.",
      "Planear una relación de mentoría con un joven.",
    ],
    paraEmpezar:
      "Timoteo era un joven de buen testimonio cuando Pablo lo invitó a viajar con él. Años después, Pablo lo llamaba su hijo amado. La historia de los dos muestra cómo crece un joven cuando alguien lo acompaña.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 16:1-3" },
      {
        t: "parrafo",
        texto:
          "Timoteo era un joven creyente del que «daban buen testimonio» los hermanos, y «Quiso Pablo que éste fuese con él». Pablo no eligió a cualquiera: eligió a alguien con buen testimonio, y lo llevó consigo.",
      },
      { t: "versiculo", ref: "2 Timoteo 3:10" },
      {
        t: "parrafo",
        texto:
          "Timoteo aprendió viendo a Pablo: «Pero tú has seguido mi doctrina, conducta, propósito, fe, longanimidad, amor, paciencia». No solo aprendió lo que Pablo enseñaba, sino cómo vivía.",
      },
      { t: "versiculo", ref: "1 Corintios 4:17" },
      {
        t: "parrafo",
        texto:
          "Con el tiempo, Pablo lo envió en su lugar, porque Timoteo era «mi hijo amado y fiel en el Señor, el cual os recordará mi proceder en Cristo». El discípulo llegó a ser de confianza.",
      },
      { t: "versiculo", ref: "Filipenses 2:20-22" },
      {
        t: "parrafo",
        texto:
          "Y Pablo dijo de él: «como hijo a padre ha servido conmigo en el evangelio». El discipulado se parece más a una familia que a una oficina.",
      },
      { t: "subtitulo", texto: "Tres personas que necesita cada joven" },
      {
        t: "lista",
        items: [
          "Alguien mayor que lo acompañe, como Pablo con Timoteo: un mentor que ora por él, lo escucha y le enseña con su vida.",
          "Un compañero de su edad, como lo fueron Pablo y Bernabé en el viaje: alguien que lo anima y con quien rinde cuentas.",
          "Alguien menor a quien acompañar, como Timoteo con los hermanos que Pablo le encargó: así lo que recibe no se queda en él.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una mentoría de seis meses" },
      {
        t: "lista",
        items: [
          "Mes 1, conocerse: el mentor y el joven conversan sobre su historia, su familia, su fe y sus metas.",
          "Mes 2, la Palabra: leen juntos un evangelio, un capítulo por semana, y comparten lo que aprenden.",
          "Mes 3, la oración: el mentor le enseña a orar con una lista y oran juntos por sus amigos.",
          "Mes 4, el carácter: hablan con honestidad de una lucha del joven, como el enojo o la pureza, y buscan qué dice la Biblia.",
          "Mes 5, el servicio: el joven sirve junto al mentor en algo concreto de la iglesia.",
          "Mes 6, evaluar y enviar: miran juntos cuánto creció, y el joven elige a alguien menor a quien empezar a acompañar.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si el joven es menor de edad, la mentoría se hace en lugares visibles, con el permiso de sus padres y con un mentor del mismo sexo, y los mensajes se envían por un medio que los padres conocen.",
      },
    ],
    ideaClave:
      "Pablo eligió a Timoteo porque daban buen testimonio de él, y lo llevó consigo; Timoteo siguió su doctrina y su conducta, llegó a ser su hijo amado y fiel y sirvió con él como hijo a padre. Cada joven necesita alguien mayor que lo acompañe, un compañero de su edad y alguien menor a quien acompañar. Una mentoría con un plan, en lugares visibles y con el permiso de los padres, ayuda a que el joven crezca en la Palabra, la oración, el carácter y el servicio.",
    paraLaVida: {
      texto: "El discipulado se parece más a una familia que a una oficina.",
      pregunta: "¿Quién es tu Pablo, quién tu compañero, y a quién estás acompañando tú?",
    },
  },
  {
    id: "juventud-1-4",
    objetivos: [
      "Explicar por qué los jóvenes crecen mejor en grupos pequeños.",
      "Organizar un grupo pequeño de discipulado paso a paso.",
      "Comparar la reunión grande, el grupo pequeño y la mentoría uno a uno.",
    ],
    paraEmpezar:
      "En una reunión grande un joven puede pasar meses sin que nadie sepa cómo está. En un grupo pequeño, alguien nota cuando falta, cuando está triste o cuando necesita oración.",
    bloques: [
      { t: "versiculo", ref: "Proverbios 27:17" },
      {
        t: "parrafo",
        texto:
          "El proverbio lo dice así: «Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo». Los jóvenes se afilan unos a otros cuando se conocen de verdad.",
      },
      { t: "versiculo", ref: "Eclesiastés 4:9-10" },
      {
        t: "parrafo",
        texto:
          "El que está solo es más débil: «si cayeren, el uno levantará a su compañero; pero ¡ay del solo! que cuando cayere, no habrá segundo que lo levante».",
      },
      { t: "versiculo", ref: "Hebreos 10:24-25" },
      {
        t: "parrafo",
        texto:
          "Por eso la Biblia nos pide: «considerémonos unos a otros para estimularnos al amor y a las buenas obras», «no dejando de congregarnos».",
      },
      { t: "subtitulo", texto: "Tres maneras de reunirse" },
      {
        t: "lista",
        items: [
          "La reunión grande: une a todos, celebra, adora y predica; pero es difícil conocer a cada uno.",
          "El grupo pequeño: de cuatro a ocho jóvenes con un líder; se conocen, se preguntan cómo están y oran unos por otros.",
          "La mentoría uno a uno: un adulto con un joven; es la más personal, pero alcanza a pocos.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Un ministerio juvenil sano usa las tres: la reunión grande para celebrar, los grupos pequeños para crecer y la mentoría para acompañar de cerca a quien más lo necesita.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un grupo pequeño de discipulado, paso a paso" },
      {
        t: "lista",
        items: [
          "Paso 1, formar el grupo: de cuatro a ocho jóvenes de edades parecidas, con un líder y un ayudante.",
          "Paso 2, el lugar y la hora: una casa con los padres presentes o un salón de la iglesia, siempre el mismo día y a la misma hora.",
          "Paso 3, la bienvenida: diez minutos para comer algo y contar cómo les fue en la semana.",
          "Paso 4, la Palabra: veinte minutos para leer un pasaje y conversar con tres preguntas: qué dice, qué significa y qué voy a hacer.",
          "Paso 5, rendir cuentas: cada uno cuenta cómo le fue con lo que decidió la semana anterior.",
          "Paso 6, orar: oran unos por otros, en voz alta los que quieran.",
          "Paso 7, la misión: cada tanto, el grupo sirve junto en algo o invita a un amigo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo que se cuenta en el grupo queda en el grupo, salvo que alguien corra peligro: si un joven cuenta un abuso o piensa en quitarse la vida, el líder lo dice a los responsables y busca ayuda de inmediato. Explica esa regla desde el primer día.",
      },
    ],
    ideaClave:
      "Hierro con hierro se aguza, y ay del que está solo cuando cae; por eso la Biblia pide que nos consideremos unos a otros y que no dejemos de congregarnos. Un ministerio juvenil sano usa la reunión grande para celebrar, los grupos pequeños de cuatro a ocho jóvenes para crecer y la mentoría uno a uno para acompañar de cerca. El grupo pequeño tiene bienvenida, la Palabra con tres preguntas, rendición de cuentas, oración y misión, y una regla clara de confidencialidad con sus límites.",
    paraLaVida: {
      texto: "En un grupo pequeño, alguien nota cuando faltas.",
      pregunta: "¿Qué jóvenes de tu iglesia podrían formar el primer grupo pequeño?",
    },
  },
  {
    id: "juventud-1-5",
    objetivos: [
      "Explicar las disciplinas que ayudan a un joven a crecer en su fe.",
      "Aplicar el ejemplo de Daniel a las decisiones de un joven de hoy.",
      "Preparar con un joven un plan semanal de vida espiritual.",
    ],
    paraEmpezar:
      "Un joven puede emocionarse mucho en un campamento y olvidarlo todo en dos semanas. Lo que sostiene la fe en el tiempo no son las emociones, sino los hábitos que lo acercan a Dios cada día.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Salmos 119:9-11" },
      {
        t: "parrafo",
        texto:
          "El salmista pregunta: «¿Con qué limpiará el joven su camino? Con guardar tu palabra». Y añade: «En mi corazón he guardado tus dichos, Para no pecar contra ti». La Palabra guardada en el corazón protege al joven.",
      },
      { t: "versiculo", ref: "1 Timoteo 4:7-8" },
      {
        t: "parrafo",
        texto:
          "Pablo le dijo a Timoteo: «Ejercítate para la piedad», porque «la piedad para todo aprovecha». Así como un deportista entrena su cuerpo, el joven entrena su vida espiritual.",
      },
      { t: "versiculo", ref: "Marcos 1:35" },
      {
        t: "parrafo",
        texto:
          "Jesús mismo tenía su tiempo con el Padre: «Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a un lugar desierto, y allí oraba».",
      },
      { t: "subtitulo", texto: "Las disciplinas del joven discípulo" },
      {
        t: "lista",
        items: [
          "Leer la Biblia cada día, con un plan sencillo.",
          "Orar: hablar con Dios en un tiempo y un lugar fijos, y también durante el día.",
          "Memorizar versículos para tenerlos en el corazón.",
          "Congregarse: la reunión de la iglesia y el grupo pequeño.",
          "Servir: usar sus dones en la iglesia y en el barrio.",
          "Cuidar el teléfono y las redes: horarios sin pantalla, y nada que no haría delante de Jesús.",
        ],
      },
      { t: "versiculo", ref: "Daniel 1:8" },
      {
        t: "parrafo",
        texto:
          "Daniel era joven y vivía lejos de su casa, en una cultura que no conocía a Dios. Pero «Daniel propuso en su corazón no contaminarse». Las decisiones importantes se toman antes de la tentación, no en medio de ella.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan semanal de un joven de dieciséis años" },
      {
        t: "lista",
        items: [
          "Cada mañana, diez minutos antes de la escuela: leer un capítulo de un evangelio y orar por el día.",
          "Cada noche: dejar el teléfono fuera del cuarto a una hora fija.",
          "Los lunes: aprender un versículo nuevo y repasar el de la semana anterior.",
          "Los miércoles: el grupo pequeño.",
          "Los sábados: servir con el equipo de jóvenes o con su familia en algo concreto.",
          "Los domingos: el culto con la iglesia, y contarle a su mentor cómo le fue con el plan.",
          "Si falla un día, no abandona: empieza de nuevo al día siguiente.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No le des a un joven un plan que tú no vives. Arma el plan con él, empieza con poco y ve sumando, y celebra cada paso que da.",
      },
    ],
    ideaClave:
      "El joven limpia su camino guardando la Palabra, y Pablo pidió ejercitarse para la piedad, que para todo aprovecha; Jesús mismo se levantaba muy de mañana a orar. Las disciplinas del joven discípulo son leer la Biblia, orar, memorizar, congregarse, servir y cuidar el uso del teléfono y las redes. Como Daniel, que propuso en su corazón no contaminarse, el joven decide antes de la tentación, y un plan semanal sencillo, armado con su mentor, sostiene su fe más que las emociones.",
    paraLaVida: {
      texto: "Las decisiones importantes se toman antes de la tentación, no en medio de ella.",
      pregunta: "¿Qué hábito pequeño podría empezar esta semana un joven que acompañas?",
    },
  },
  {
    id: "juventud-1-6",
    objetivos: [
      "Explicar la cadena de discipulado de 2 Timoteo 2:2.",
      "Diseñar un camino de discipulado para el ministerio juvenil.",
      "Evaluar si el ministerio juvenil está formando discípulos que hacen discípulos.",
    ],
    paraEmpezar:
      "El discipulado no termina cuando un joven crece en su fe. Termina cuando ese joven ayuda a otro a seguir a Jesús. Así se multiplica la obra.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=AG4jqCUapng", titulo: "Resumen del libro de Colosenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Mateo 28:19-20" },
      {
        t: "parrafo",
        texto:
          "Jesús no mandó hacer asistentes, sino discípulos: «id, y haced discípulos a todas las naciones», «enseñándoles que guarden todas las cosas que os he mandado». Y prometió: «yo estoy con vosotros todos los días».",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "parrafo",
        texto:
          "Pablo pensó en una cadena: «Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros». En un solo versículo hay cuatro generaciones: Pablo, Timoteo, los hombres fieles y los otros.",
      },
      { t: "versiculo", ref: "Colosenses 1:28" },
      {
        t: "parrafo",
        texto:
          "La meta es clara: «a fin de presentar perfecto en Cristo Jesús a todo hombre». Cada joven, uno por uno, maduro en Cristo.",
      },
      { t: "subtitulo", texto: "Un camino de discipulado" },
      {
        t: "lista",
        items: [
          "Conocer: el joven escucha el evangelio, recibe a Cristo y empieza a conocer a la iglesia.",
          "Crecer: entra en un grupo pequeño, aprende las disciplinas y tiene un mentor.",
          "Servir: usa sus dones en un equipo del ministerio.",
          "Multiplicar: acompaña a otro joven o ayuda a dirigir un grupo.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "El camino no es una escalera rígida: cada joven avanza a su ritmo. Pero ayuda a que nadie se quede siempre sentado en la reunión, sin crecer ni servir.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: armar el camino en tu ministerio juvenil" },
      {
        t: "lista",
        items: [
          "Paso 1, nombrar cada etapa: conocer, crecer, servir y multiplicar.",
          "Paso 2, poner una puerta de entrada a cada etapa: la reunión grande, el grupo pequeño, un equipo de servicio y un taller para nuevos líderes.",
          "Paso 3, hacer una lista de los jóvenes y anotar en qué etapa está cada uno.",
          "Paso 4, invitar a cada joven al paso que sigue, con una conversación personal.",
          "Paso 5, formar a los que multiplican: un taller cada trimestre para los jóvenes que acompañan a otros.",
          "Paso 6, revisar cada seis meses: cuántos avanzaron, quiénes se estancaron y por qué.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un líder juvenil que se va deja un ministerio fuerte solo si formó a otros. Pregúntate cada año: ¿quién podría hacer lo que yo hago?",
      },
    ],
    ideaClave:
      "Jesús mandó hacer discípulos que guarden todo lo que él mandó, y prometió estar con nosotros todos los días; Pablo pensó en una cadena de cuatro generaciones y en presentar perfecto en Cristo a todo hombre. Un camino de discipulado ayuda a que cada joven avance: conocer, crecer, servir y multiplicar, con una puerta de entrada a cada etapa y una revisión cada seis meses. El discipulado se completa cuando el joven ayuda a otro a seguir a Jesús.",
    paraLaVida: {
      texto: "El discipulado se completa cuando el joven ayuda a otro a seguir a Jesús.",
      pregunta: "¿Quién podría hacer lo que tú haces en el ministerio juvenil?",
    },
  },
];
