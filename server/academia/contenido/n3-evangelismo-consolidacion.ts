/**
 * Nivel 3 · Materia 6 — Evangelismo y consolidación (sílabo en shared/academia.ts). Antes «Evangelismo 2».
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue a «Compartir mi fe» (Nivel 1) y a «Evangelismo personal» (Nivel 2): ahora el evangelismo como ministerio de la
 * iglesia (en equipo, en la comunidad, en campañas, en la calle, en la radio y en las redes) y la consolidación del
 * nuevo creyente hasta que se integra a la iglesia y empieza a servir. Prepara el requisito del Nivel 3 de consolidar a
 * un nuevo creyente. Cuida la privacidad de las personas, la protección de los menores y el respeto a quien no quiere
 * escuchar.
 */
import type { LeccionContenido } from "../tipos";

export const N3_EVANGELISMO_CONSOLIDACION: LeccionContenido[] = [
  {
    id: "n3-evangelismo-consolidacion-1",
    objetivos: [
      "Explicar el fundamento bíblico del evangelismo: el mensaje, el poder y el motivo.",
      "Distinguir el llamado de toda la iglesia a evangelizar del don del evangelista.",
      "Describir la actitud del que evangeliza: amor, valor, mansedumbre y urgencia.",
    ],
    paraEmpezar:
      "En los niveles anteriores aprendiste a compartir tu fe con una persona. En esta materia das un paso más: el evangelismo como ministerio de la iglesia, y el cuidado de los que creen hasta que echan raíces.",
    bloques: [
      { t: "subtitulo", texto: "El mensaje, el poder y el motivo" },
      {
        t: "parrafo",
        texto:
          "El mensaje es el evangelio: que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día, conforme a las Escrituras (1 Corintios 15:3-4). El poder es el del Espíritu Santo, que Jesús prometió para que fuéramos sus testigos (Hechos 1:8). Y el motivo es el amor: «el amor de Cristo nos constriñe» (2 Corintios 5:14).",
      },
      { t: "versiculo", ref: "2 Corintios 5:14" },
      { t: "versiculo", ref: "2 Corintios 5:20" },
      {
        t: "parrafo",
        texto:
          "Pablo se ve como un embajador: «somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros». El embajador no inventa el mensaje ni habla en su propio nombre: lleva fielmente la palabra de quien lo envía, con la dignidad y la ternura de ese llamado.",
      },
      { t: "subtitulo", texto: "Toda la iglesia, y algunos con un don especial" },
      { t: "versiculo", ref: "Efesios 4:11-12" },
      {
        t: "parrafo",
        texto:
          "Todos los creyentes son testigos, pero Dios da a algunos el don de evangelista, como a Felipe, a quien Hechos llama «Felipe el evangelista» (Hechos 21:8). Esos dones existen «a fin de perfeccionar a los santos para la obra del ministerio»: el evangelista no hace el trabajo de todos, sino que prepara y anima a todos a hacerlo. A Timoteo, que era pastor, Pablo le dijo: «haz obra de evangelista» (2 Timoteo 4:5).",
      },
      { t: "versiculo", ref: "Hechos 21:8" },
      { t: "versiculo", ref: "2 Timoteo 4:5" },
      { t: "subtitulo", texto: "La urgencia" },
      { t: "versiculo", ref: "Romanos 10:14" },
      {
        t: "parrafo",
        texto:
          "Pablo hace una cadena de preguntas: «¿Y cómo creerán en aquel de quien no han oído? ¿Y cómo oirán sin haber quien les predique?». La fe viene por el oír, y el oír, por alguien que habla. Por eso la iglesia no puede esperar a que la gente llegue sola: sale a buscarla, como su Señor.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=C5JAZuSpYfQ", titulo: "¿Qué significa dar testimonio?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "La actitud" },
      { t: "versiculo", ref: "1 Pedro 3:15" },
      {
        t: "parrafo",
        texto:
          "Pedro pide estar «siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros». El que evangeliza habla con valor, pero sin arrogancia; escucha, respeta a quien no quiere oír y confía en que es el Espíritu quien convence.",
      },
      {
        t: "nota",
        titulo: "Evangelizar no es presionar",
        texto:
          "Nadie se convierte por insistencia, engaño o miedo. Anunciamos con claridad, oramos y dejamos que el Espíritu Santo obre. Respetar el no de una persona también es un testimonio.",
      },
    ],
    ideaClave:
      "El evangelismo tiene un mensaje (Cristo murió y resucitó), un poder (el Espíritu Santo) y un motivo (el amor de Cristo). Toda la iglesia es testigo, y los evangelistas preparan a los demás; se evangeliza con urgencia, pero con mansedumbre y respeto, como embajadores de Cristo.",
    paraLaVida: {
      texto: "Eres embajador de Cristo donde vives, estudias y trabajas.",
      pregunta: "¿Qué te frena más para evangelizar: el miedo, la falta de preparación o la falta de amor? ¿Qué harás con eso?",
    },
  },
  {
    id: "n3-evangelismo-consolidacion-2",
    objetivos: [
      "Explicar por qué Jesús envió a sus discípulos de dos en dos y cómo se organiza un equipo de evangelismo.",
      "Describir el evangelismo en las casas y en la comunidad, con el principio del hijo de paz.",
      "Aplicar normas de respeto, seguridad y privacidad en el evangelismo.",
    ],
    paraEmpezar:
      "Jesús podía haber enviado a sus discípulos uno por uno para cubrir más pueblos. Pero los envió de dos en dos. En el evangelismo, el equipo importa tanto como el mensaje.",
    bloques: [
      { t: "versiculo", ref: "Lucas 10:1-2" },
      {
        t: "parrafo",
        texto:
          "Jesús envió a los setenta «de dos en dos delante de él», y antes de enviarlos les mandó orar: «rogad al Señor de la mies que envíe obreros a su mies». El evangelismo empieza en la oración y se hace en compañía: dos se animan, se cuidan, se corrigen y dan un testimonio más firme.",
      },
      { t: "subtitulo", texto: "Un equipo bien organizado" },
      {
        t: "lista",
        items: [
          "Intercesores: oran antes, durante y después por las personas y por el equipo.",
          "Los que hablan: comparten el testimonio y el evangelio con claridad y respeto.",
          "Los que acompañan: escuchan, oran con la persona y, si ella lo permite, anotan cómo contactarla para el seguimiento.",
          "Un líder: prepara el plan, reparte las tareas, cuida la seguridad y reúne al equipo al final para orar y evaluar.",
        ],
      },
      { t: "subtitulo", texto: "En las casas y en la comunidad" },
      { t: "versiculo", ref: "Lucas 10:5-6" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó a entrar en las casas con un saludo de paz y a buscar al «hijo de paz»: la persona que recibe el mensaje y abre su casa a los demás. Pablo enseñó «públicamente y por las casas» (Hechos 20:20). Hoy también se abren puertas sirviendo a la comunidad: una visita a los enfermos, una ayuda en una necesidad, una actividad para las familias.",
      },
      { t: "versiculo", ref: "Hechos 20:20" },
      { t: "subtitulo", texto: "Respeto, seguridad y privacidad" },
      {
        t: "lista",
        items: [
          "Salir siempre en pareja o en grupo, y con el conocimiento de los líderes.",
          "Respetar a quien no quiere escuchar, sin discutir ni insistir.",
          "Con los menores de edad: hablar solo con permiso de sus padres y nunca a solas.",
          "Pedir permiso antes de tomar fotos o anotar datos, y guardarlos solo para el seguimiento.",
          "Pedir los permisos que exijan los lugares públicos y respetar a los vecinos y a las otras iglesias.",
        ],
      },
      { t: "versiculo", ref: "Colosenses 4:5-6" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Sea vuestra palabra siempre con gracia, sazonada con sal, para que sepáis cómo debéis responder a cada uno». La manera de evangelizar también predica: un equipo amable, puntual y respetuoso honra el mensaje que lleva.",
      },
      {
        t: "nota",
        titulo: "Después de salir",
        texto:
          "Al terminar, el equipo se reúne para orar por las personas, revisar los contactos y repartir quién llamará a cada una. Sin ese paso, el evangelismo se queda en un día de actividad y no da fruto que permanezca.",
      },
    ],
    ideaClave:
      "Jesús envió a sus discípulos de dos en dos, después de orar al Señor de la mies. Un equipo de evangelismo ora, habla, acompaña y tiene un líder; entra en las casas buscando al hijo de paz, sirve a la comunidad y actúa con respeto, seguridad y cuidado de la privacidad.",
    paraLaVida: {
      texto: "Pide al Señor de la mies obreros, y ofrécete para ser uno de ellos.",
      pregunta: "¿Con quién podrías formar pareja para evangelizar, y en qué lugar de tu comunidad podrían empezar?",
    },
  },
  {
    id: "n3-evangelismo-consolidacion-3",
    objetivos: [
      "Describir el evangelismo en campañas y en la calle con ejemplos de Hechos.",
      "Explicar cómo se evangeliza por la radio y por las redes sociales con fidelidad y cuidado.",
      "Evaluar una actividad de evangelismo por su fidelidad al mensaje y por su fruto.",
    ],
    paraEmpezar:
      "El mismo evangelio que Pedro predicó a una multitud en Jerusalén y que Pablo anunció en la plaza de Atenas puede llegar hoy por un parlante en un parque, una emisora de radio o una pantalla de teléfono.",
    bloques: [
      { t: "subtitulo", texto: "Campañas" },
      { t: "versiculo", ref: "Hechos 8:5-6" },
      {
        t: "parrafo",
        texto:
          "Felipe predicó en Samaria, y «la gente, unánime, escuchaba atentamente las cosas que decía Felipe». Una campaña reúne a muchas personas para escuchar el evangelio: con oración durante semanas, con una invitación clara, con alabanza y predicación centradas en Cristo, con un llamado sin manipulación y con un equipo listo para atender a cada persona que responde.",
      },
      { t: "subtitulo", texto: "La calle y la plaza" },
      { t: "versiculo", ref: "Hechos 17:17" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo hablaba en la sinagoga y también «en la plaza cada día con los que concurrían». El evangelismo en la calle pide sabiduría: un mensaje corto y claro, testimonios reales, literatura bien hecha, permiso donde haga falta y la disposición a conversar con quien se detiene.",
      },
      { t: "subtitulo", texto: "La radio" },
      {
        t: "parrafo",
        texto:
          "La radio entra en casas, carros, hospitales y cárceles donde ningún predicador podría entrar. El ministerio tiene su propia emisora: un programa de radio evangeliza cuando presenta a Cristo con claridad, cuenta historias de vidas cambiadas, invita a llamar o escribir y da seguimiento a quienes responden.",
      },
      { t: "subtitulo", texto: "Las redes sociales" },
      { t: "versiculo", ref: "2 Timoteo 2:24-25" },
      {
        t: "parrafo",
        texto:
          "En las redes, el evangelio compite con miles de mensajes. Un buen contenido es breve, verdadero y centrado en Cristo; responde los comentarios con amor y no entra en peleas, porque «el siervo del Señor no debe ser contencioso, sino amable para con todos». Las conversaciones personales se pasan a un mensaje privado y, si la persona quiere, a una iglesia cercana. Nunca se publican datos ni fotos de alguien sin su permiso.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=AxGypH5Dy3I", titulo: "¿Qué significa la palabra evangelio?", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "Evaluar con verdad" },
      {
        t: "lista",
        items: [
          "¿Se anunció con claridad que Cristo murió y resucitó, y se llamó al arrepentimiento y a la fe?",
          "¿Se respetó a las personas y se evitó toda presión o manipulación?",
          "¿Cuántas personas quedaron con un contacto para el seguimiento, y quién las llamará?",
          "¿Se contaron los resultados con honestidad, sin inflar los números?",
        ],
      },
      {
        t: "nota",
        titulo: "Los medios cambian, el mensaje no",
        texto:
          "Una campaña, un programa o una publicación son medios. El fruto no se mide por la cantidad de público o de vistas, sino por personas que conocen a Cristo y siguen creciendo en una iglesia.",
      },
    ],
    ideaClave:
      "El evangelio puede anunciarse en campañas, en la calle, por la radio y por las redes, como Felipe en Samaria y Pablo en la plaza. En todos los medios el mensaje es el mismo y se anuncia con claridad, respeto y amabilidad, con un plan de seguimiento y con resultados contados con honestidad.",
    paraLaVida: {
      texto: "Lo que publicas en tus redes también puede ser una ventana al evangelio.",
      pregunta: "¿Qué medio usarías para alcanzar a las personas de tu entorno, y cómo darías seguimiento a quienes respondan?",
    },
  },
  {
    id: "n3-evangelismo-consolidacion-4",
    objetivos: [
      "Explicar qué es la consolidación y por qué es parte del evangelismo.",
      "Mostrar con la Biblia el cuidado que necesita el nuevo creyente.",
      "Distinguir entre conseguir decisiones y hacer discípulos.",
    ],
    paraEmpezar:
      "Una cosecha no termina cuando se corta el fruto: hay que recogerlo, guardarlo y cuidarlo, o se pierde. Con los nuevos creyentes pasa lo mismo. A ese cuidado lo llamamos consolidación.",
    bloques: [
      { t: "versiculo", ref: "Hechos 14:21-22" },
      {
        t: "parrafo",
        texto:
          "En el primer viaje, Pablo y Bernabé no solo anunciaron el evangelio: volvieron a las ciudades donde había nuevos creyentes, «confirmando los ánimos de los discípulos, exhortándoles a que permaneciesen en la fe». Consolidar es afirmar, dar firmeza: acompañar al que creyó para que eche raíces en Cristo y en la iglesia.",
      },
      { t: "subtitulo", texto: "Por qué hace falta" },
      { t: "versiculo", ref: "Mateo 13:20-21" },
      {
        t: "parrafo",
        texto:
          "En la parábola del sembrador, hay quien recibe la palabra con gozo, «pero no tiene raíz en sí, sino que es de corta duración». Las primeras semanas son decisivas: el nuevo creyente tiene preguntas, enfrenta presiones de su familia o de sus amigos, y todavía no conoce la Biblia ni la iglesia. Necesita a alguien a su lado.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jZinwS_2jsQ", titulo: "Parábolas de Jesús", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "1 Pedro 2:2" },
      {
        t: "parrafo",
        texto:
          "Pedro compara a los nuevos creyentes con niños recién nacidos, que desean la leche espiritual para crecer. Un recién nacido no se alimenta solo: alguien lo cuida. Pablo cuidó así a los tesalonicenses, «como la nodriza que cuida con ternura a sus propios hijos» (1 Tesalonicenses 2:7).",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 2:7-8" },
      { t: "subtitulo", texto: "Decisiones o discípulos" },
      { t: "versiculo", ref: "Colosenses 1:28" },
      {
        t: "parrafo",
        texto:
          "La gran comisión no manda conseguir decisiones, sino hacer discípulos, bautizándolos y enseñándoles a guardar todo lo que Jesús mandó (Mateo 28:19-20). Pablo lo expresa así: anunciamos a Cristo, «amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría, a fin de presentar perfecto en Cristo Jesús a todo hombre». Es el versículo de memoria de esta materia.",
      },
      {
        t: "nota",
        titulo: "El evangelismo no termina en el sí",
        texto:
          "Una iglesia que evangeliza mucho y consolida poco se parece a una casa con la puerta de atrás abierta: entra mucha gente y se va otra tanta. Planear el seguimiento es parte de planear el evangelismo.",
      },
    ],
    ideaClave:
      "Consolidar es afirmar al nuevo creyente para que eche raíces, como hicieron Pablo y Bernabé al volver a confirmar a los discípulos. Sin raíz, la fe es de corta duración; por eso el nuevo creyente necesita cuidado como un recién nacido, porque la meta no es conseguir decisiones, sino hacer discípulos maduros en Cristo.",
    paraLaVida: {
      texto: "Alguien te acompañó cuando empezaste en la fe, o te hizo falta que alguien lo hiciera.",
      pregunta: "¿Qué necesitaste tú en tus primeras semanas como creyente, y cómo puedes darlo hoy a otro?",
    },
  },
  {
    id: "n3-evangelismo-consolidacion-5",
    objetivos: [
      "Describir los pasos de un plan de consolidación, desde el primer contacto hasta el servicio.",
      "Explicar el papel del consolidador y las normas de prudencia en el acompañamiento.",
      "Preparar el acompañamiento de un nuevo creyente, requisito del Nivel 3.",
    ],
    paraEmpezar:
      "La consolidación funciona mejor con un plan claro. No es un programa frío: es amor organizado, para que ninguna persona que creyó quede sola.",
    bloques: [
      { t: "subtitulo", texto: "Los pasos" },
      {
        t: "lista",
        items: [
          "El primer contacto, en las primeras 24 a 48 horas: una llamada o un mensaje para saludar, orar y escuchar.",
          "La visita: conocer a la persona en su casa o en un lugar cómodo para ella, orar juntos y aclarar sus dudas.",
          "La seguridad de la salvación: mostrarle en la Palabra que quien tiene al Hijo tiene la vida (1 Juan 5:11-13).",
          "El bautismo, como obediencia al Señor (Hechos 2:41).",
          "La integración: un grupo pequeño, el culto y la amistad con otros creyentes (Hechos 2:42).",
          "El discipulado: estudiar juntos lo básico de la fe, por ejemplo el Nivel 1 de esta academia.",
          "El servicio: descubrir sus dones y empezar a servir, y algún día acompañar a otro.",
        ],
      },
      { t: "versiculo", ref: "1 Juan 5:13" },
      {
        t: "parrafo",
        texto:
          "Juan escribió a los creyentes «para que sepáis que tenéis vida eterna». La seguridad de la salvación no se apoya en lo que la persona siente un día, sino en la promesa de Dios. Es uno de los primeros temas que conviene estudiar con el nuevo creyente.",
      },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      { t: "subtitulo", texto: "El consolidador" },
      { t: "versiculo", ref: "Hechos 18:26" },
      {
        t: "parrafo",
        texto:
          "Cuando Priscila y Aquila oyeron a Apolos, que conocía solo en parte el camino, «le tomaron aparte y le expusieron más exactamente el camino de Dios». El consolidador es un creyente maduro que acompaña con paciencia: llama, visita, ora, estudia la Biblia con la persona y la presenta a otros hermanos. No la hace depender de sí mismo, sino que la lleva a Cristo y a la iglesia.",
      },
      {
        t: "lista",
        items: [
          "El acompañamiento personal se hace entre personas del mismo sexo, o en pareja o en familia.",
          "Con menores de edad, siempre con conocimiento de sus padres y nunca a solas.",
          "Lo que la persona cuenta en confianza se guarda con discreción.",
          "Si aparecen una crisis grave, adicciones, violencia o ideas de hacerse daño, se busca enseguida al pastor y la ayuda adecuada.",
        ],
      },
      { t: "subtitulo", texto: "Tu práctica en el Nivel 3" },
      {
        t: "parrafo",
        texto:
          "Para cerrar el Nivel 3 se pide consolidar a un nuevo creyente: acompañarlo en estos pasos, en coordinación con tu iglesia. Puede ser alguien a quien tú mismo guiaste a Cristo o alguien que tu iglesia te encargue. Pablo le dio a Timoteo el modelo: lo que había oído, debía encargarlo a hombres fieles que fueran idóneos para enseñar también a otros (2 Timoteo 2:2).",
      },
      { t: "versiculo", ref: "2 Timoteo 2:2" },
      {
        t: "nota",
        titulo: "Anota con permiso",
        texto:
          "Para dar seguimiento hace falta saber cómo contactar a la persona. Pide su permiso, anota solo lo necesario y guárdalo con cuidado: sus datos y su historia le pertenecen.",
      },
    ],
    ideaClave:
      "Un plan de consolidación tiene pasos claros: el contacto en 24 a 48 horas, la visita, la seguridad de la salvación, el bautismo, la integración, el discipulado y el servicio. El consolidador acompaña con paciencia y prudencia, como Priscila y Aquila con Apolos, y lleva a la persona a Cristo y a la iglesia, no a depender de él.",
    paraLaVida: {
      texto: "Ninguna persona que creyó debería pasar sola su primera semana como creyente.",
      pregunta: "¿A quién podrías acompañar en los próximos meses, y cuál sería tu primer paso con esa persona?",
    },
  },
  {
    id: "n3-evangelismo-consolidacion-6",
    objetivos: [
      "Reconocer los obstáculos más comunes del nuevo creyente y cómo ayudarlo a enfrentarlos.",
      "Aplicar la restauración con mansedumbre cuando un nuevo creyente cae.",
      "Explicar la meta de la consolidación: fruto que permanece y se multiplica.",
    ],
    paraEmpezar:
      "Los primeros pasos de la fe no siempre son fáciles. Habrá dudas, oposición y caídas. El consolidador no se asusta: sabe que Dios termina la obra que empieza.",
    bloques: [
      { t: "subtitulo", texto: "Obstáculos comunes" },
      {
        t: "lista",
        items: [
          "La oposición de la familia o de los amigos: necesita ánimo, oración y sabiduría para responder con amor.",
          "Las antiguas amistades y costumbres: necesita nuevas amistades en la iglesia y ayuda práctica para cambiar.",
          "Las dudas: necesita respuestas de la Palabra y la paciencia de alguien que las escuche sin juzgar.",
          "Las caídas: necesita saber que hay perdón y restauración en Cristo.",
          "La falta de tiempo o de constancia: necesita un plan sencillo y alguien que lo acompañe.",
        ],
      },
      { t: "subtitulo", texto: "Restaurar con mansedumbre" },
      { t: "versiculo", ref: "Gálatas 6:1-2" },
      {
        t: "parrafo",
        texto:
          "Cuando alguien cae, Pablo pide a los espirituales: «restauradle con espíritu de mansedumbre», cuidándose cada uno a sí mismo. Restaurar no es justificar el pecado ni humillar al que cayó: es ayudarlo a confesar, recibir el perdón y volver a caminar. Sobrellevar las cargas unos de otros es cumplir la ley de Cristo.",
      },
      { t: "versiculo", ref: "Filipenses 1:6" },
      {
        t: "parrafo",
        texto:
          "El consolidador trabaja con esperanza, porque sabe que «el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo» (Filipenses 1:6). La obra es de Dios: nosotros sembramos, regamos y acompañamos, y él da el crecimiento (1 Corintios 3:6).",
      },
      { t: "subtitulo", texto: "Saber cuándo pedir ayuda" },
      {
        t: "parrafo",
        texto:
          "Hay situaciones que superan al consolidador: adicciones, violencia en el hogar, abuso, depresión profunda o ideas de hacerse daño. En esos casos se avisa enseguida al pastor y se busca la ayuda adecuada, también la de profesionales y la de las autoridades cuando hay peligro. La materia Cuidado y consejería básica trata este tema con más detalle.",
      },
      { t: "subtitulo", texto: "Fruto que permanece" },
      { t: "versiculo", ref: "Juan 15:16" },
      {
        t: "parrafo",
        texto:
          "Jesús nos eligió y nos puso «para que vayáis y llevéis fruto, y vuestro fruto permanezca». La meta del evangelismo y de la consolidación no son números, sino discípulos que permanecen en Cristo, crecen y un día acompañan a otros. Así el fruto se multiplica, de generación en generación.",
      },
      {
        t: "nota",
        titulo: "El círculo completo",
        texto:
          "Evangelizar, consolidar, discipular y enviar: cuando el que fue acompañado empieza a acompañar a otro, el círculo se completa y la iglesia crece como en Hechos.",
      },
    ],
    ideaClave:
      "El nuevo creyente enfrenta oposición, viejas costumbres, dudas y caídas. El consolidador lo acompaña con paciencia, lo restaura con mansedumbre cuando cae, pide ayuda cuando la situación lo supera y trabaja con la esperanza de que Dios terminará su obra. La meta es fruto que permanece y se multiplica.",
    paraLaVida: {
      texto: "El fruto que permanece se cuida con tiempo, oración y paciencia.",
      pregunta: "¿Qué obstáculo crees que enfrentará la persona que vas a acompañar, y cómo la ayudarás a superarlo?",
    },
  },
];
