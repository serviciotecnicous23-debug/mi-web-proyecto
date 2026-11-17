/**
 * Especialidad Ministerio pastoral · Materia 1 (avanzada) — El ministerio pastoral (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La práctica del oficio pastoral: los nombres y las tareas del Nuevo Testamento, la autoridad que sirve, el equipo, la
 * disciplina que restaura, la protección del rebaño y la salud del pastor. No repite «Teología pastoral» (Nivel 5) ni
 * «Cuidado y consejería básica» (Nivel 3). Quién ejerce el pastorado es parte del ministerio de la mujer, un punto de la
 * declaración de fe por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const PASTORAL_1: LeccionContenido[] = [
  {
    id: "pastoral-1-1",
    objetivos: [
      "Explicar los tres nombres del oficio pastoral en el Nuevo Testamento.",
      "Describir las tareas que la Escritura da al pastor.",
      "Reconocer que el pastorado es una tarea al servicio de Cristo, no un título.",
    ],
    paraEmpezar:
      "En muchas iglesias, pastor es un título. En el Nuevo Testamento es, sobre todo, una tarea: cuidar del rebaño que pertenece a Cristo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Hechos 20:17" },
      { t: "versiculo", ref: "Hechos 20:28" },
      {
        t: "parrafo",
        texto:
          "En Mileto, Pablo «hizo llamar a los ancianos de la iglesia» de Éfeso, y les dijo que el Espíritu Santo los había puesto «por obispos, para apacentar la iglesia del Señor». En un mismo pasaje aparecen los tres nombres: anciano, o presbítero, habla de madurez; obispo, o supervisor, de cuidado y vigilancia; y pastor, de apacentar. Son tres caras de una misma tarea.",
      },
      {
        t: "parrafo",
        texto:
          "La iglesia no es del pastor: es la iglesia del Señor, «la cual él ganó por su propia sangre». Por eso Pablo empieza por el pastor mismo: «mirad por vosotros, y por todo el rebaño».",
      },
      { t: "versiculo", ref: "Tito 1:7-9" },
      {
        t: "parrafo",
        texto:
          "El pastor es «administrador de Dios», no dueño. Su tarea con la Palabra es doble: «exhortar con sana enseñanza y convencer a los que contradicen». Para eso debe ser «retenedor de la palabra fiel tal como ha sido enseñada».",
      },
      { t: "subtitulo", texto: "Las tareas del pastor" },
      {
        t: "lista",
        items: [
          "Apacentar: alimentar al rebaño con la Palabra.",
          "Supervisar: velar por la vida espiritual de cada uno.",
          "Proteger: cuidar al rebaño de los errores y de los abusos.",
          "Equipar: preparar a los santos para servir.",
          "Interceder: orar por el rebaño y con él.",
        ],
      },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "Quién puede ejercer el pastorado es parte del ministerio de la mujer, un punto de la declaración de fe por confirmar (artículo 13). Las dos posiciones evangélicas se presentan en Teología sistemática IV.",
      },
    ],
    ideaClave:
      "En el Nuevo Testamento, anciano, obispo y pastor son nombres de una misma tarea: guiar con madurez, supervisar con cuidado y apacentar con la Palabra. La iglesia es del Señor, que la ganó con su sangre, y el pastor es su administrador. Su tarea con la Palabra es enseñar la sana doctrina y corregir el error, y empieza cuidándose a sí mismo.",
    paraLaVida: {
      texto: "El pastor cuida un rebaño que no es suyo.",
      pregunta: "¿Qué cambia en tu manera de servir saber que la iglesia es del Señor y no tuya?",
    },
  },
  {
    id: "pastoral-1-2",
    objetivos: [
      "Contrastar la autoridad del mundo con la autoridad de servicio que enseñó Jesús.",
      "Reconocer las señales de un liderazgo que domina.",
      "Aplicar el modelo del pastor que es ejemplo.",
    ],
    paraEmpezar:
      "El poder es una de las tentaciones más fuertes del ministerio. Jesús enseñó a sus discípulos una manera distinta de ejercer la autoridad.",
    bloques: [
      { t: "versiculo", ref: "Mateo 20:25-28" },
      {
        t: "parrafo",
        texto:
          "Jesús contrastó dos modelos: «los gobernantes de las naciones se enseñorean de ellas», pero «entre vosotros no será así». En el reino, la grandeza se mide por el servicio: «el que quiera hacerse grande entre vosotros será vuestro servidor». Y él mismo es el modelo: «no vino para ser servido, sino para servir».",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Pedro 5:2-3" },
      {
        t: "parrafo",
        texto:
          "Pedro aplica esto a los ancianos: apacentar «no por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto», y «no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey».",
      },
      { t: "versiculo", ref: "3 Juan 1:9-10" },
      {
        t: "parrafo",
        texto:
          "La Biblia también muestra el modelo contrario: Diótrefes, «al cual le gusta tener el primer lugar entre ellos», hablaba mal de los demás, no recibía a los hermanos «y los expulsa de la iglesia».",
      },
      { t: "subtitulo", texto: "Señales de alerta" },
      {
        t: "lista",
        items: [
          "Se exige obediencia sin dar razones de la Palabra.",
          "Nadie puede hacer preguntas ni disentir con respeto.",
          "El dinero o el prestigio del líder pesan más que el bien de las ovejas.",
          "Se aísla a quien piensa distinto o a quien se va.",
          "El líder no rinde cuentas a nadie.",
        ],
      },
      {
        t: "nota",
        titulo: "Una autoridad que sirve",
        texto:
          "La autoridad pastoral es real: la Biblia pide obedecer a los que guían la iglesia (Hebreos 13:17). Pero es una autoridad que Cristo delega, que se ejerce con el ejemplo, se somete a la Palabra y rinde cuentas.",
      },
    ],
    ideaClave:
      "Jesús enseñó una autoridad distinta a la del mundo: en el reino, el grande es el que sirve, como él, que vino a servir y a dar su vida. El pastor apacienta de buena voluntad, sin ganancia deshonesta y sin señorear, siendo ejemplo. Diótrefes muestra el modelo contrario: el que ama el primer lugar, habla mal de otros y expulsa a los que no lo siguen.",
    paraLaVida: {
      texto: "La autoridad del pastor se nota en cuánto sirve, no en cuánto manda.",
      pregunta: "¿Cuál de las señales de alerta necesitas vigilar en tu propio liderazgo?",
    },
  },
  {
    id: "pastoral-1-3",
    objetivos: [
      "Explicar por qué el Nuevo Testamento muestra un liderazgo plural.",
      "Describir cómo Pablo formó y envió a sus colaboradores.",
      "Planificar la formación de nuevos líderes en la iglesia local.",
    ],
    paraEmpezar: "Ningún pastor puede hacerlo todo solo, y el Nuevo Testamento nunca se lo pide. Pablo trabajaba siempre con un equipo.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Ya Jetro le advirtió a Moisés: «No está bien lo que haces», «porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».",
      },
      { t: "versiculo", ref: "Tito 1:5" },
      {
        t: "parrafo",
        texto:
          "Pablo dejó a Tito en Creta para que «establecieses ancianos en cada ciudad». En el Nuevo Testamento, las iglesias eran guiadas por un grupo de ancianos, no por una sola persona.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Filipenses 2:19-22" },
      {
        t: "parrafo",
        texto:
          "Pablo formó a Timoteo como a un hijo: «a ninguno tengo del mismo ánimo», y «como hijo a padre ha servido conmigo en el evangelio». Formar líderes es caminar juntos, no solo dar clases.",
      },
      { t: "versiculo", ref: "Colosenses 4:7-9" },
      {
        t: "parrafo",
        texto:
          "Sus cartas terminan con nombres: Tíquico, «amado hermano y fiel ministro y consiervo en el Señor», y Onésimo, «amado y fiel hermano». El ministerio de Pablo fue un trabajo en equipo.",
      },
      { t: "subtitulo", texto: "Cómo formar el equipo" },
      {
        t: "lista",
        items: [
          "Orar y observar: buscar a los fieles, no solo a los talentosos.",
          "Invitar a servir junto a ti y dar responsabilidades que crecen.",
          "Enseñar el carácter que pide la Palabra antes que las habilidades.",
          "Evaluar juntos y corregir con amor.",
          "Reconocer ante la iglesia a los que están listos, y soltarlos para servir.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto: "Un pastor que lo hace todo solo agota su vida y debilita a la iglesia. Un pastor que forma un equipo multiplica el cuidado del rebaño.",
      },
    ],
    ideaClave:
      "Desde Moisés hasta Pablo, la Biblia muestra que el ministerio no se hace solo. Las iglesias del Nuevo Testamento eran guiadas por ancianos en plural, y Pablo formó a Timoteo como a un hijo y trabajó con un equipo de colaboradores fieles. El pastor busca a los fieles, los invita a servir a su lado, forma su carácter, los evalúa y los envía.",
    paraLaVida: {
      texto: "Un buen pastor se mide también por los fieles que formó.",
      pregunta: "¿A quién estás formando hoy para que sirva a tu lado?",
    },
  },
  {
    id: "pastoral-1-4",
    objetivos: [
      "Explicar los pasos de Mateo 18:15-17.",
      "Describir el propósito de la disciplina: restaurar.",
      "Aplicar la disciplina con mansedumbre, perdón y protección de los débiles.",
    ],
    paraEmpezar:
      "Muchas iglesias evitan la disciplina por miedo a herir, y otras la usan para controlar. La Biblia enseña un camino distinto: corregir para restaurar.",
    bloques: [
      { t: "versiculo", ref: "Mateo 18:15-17" },
      {
        t: "parrafo",
        texto:
          "Jesús dio un camino gradual: primero en privado, «estando tú y él solos»; si no escucha, «toma aún contigo a uno o dos»; y solo al final, «dilo a la iglesia». La meta está en la primera frase: «si te oyere, has ganado a tu hermano».",
      },
      { t: "versiculo", ref: "Gálatas 6:1" },
      {
        t: "parrafo",
        texto:
          "El espíritu de la corrección es la mansedumbre: «restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado».",
      },
      { t: "versiculo", ref: "2 Corintios 2:6-8" },
      {
        t: "parrafo",
        texto:
          "La disciplina tiene un final: cuando hay arrepentimiento, Pablo pide «perdonarle y consolarle, para que no sea consumido de demasiada tristeza», y que «confirméis el amor para con él».",
      },
      { t: "subtitulo", texto: "Principios para el pastor" },
      {
        t: "lista",
        items: [
          "Empezar siempre por lo más privado, y avanzar solo si hace falta.",
          "Buscar la restauración, no el castigo ni la humillación.",
          "Distinguir el pecado de las diferencias de opinión.",
          "Actuar junto con otros líderes, no solo, y dejar constancia con discreción.",
          "Cuando hay delitos o abusos, proteger a la víctima y cumplir la ley, además de la disciplina de la iglesia.",
        ],
      },
      {
        t: "nota",
        titulo: "Cuando hay un delito",
        texto:
          "La disciplina de la iglesia no reemplaza a la justicia. Si un hecho puede ser un delito, como el abuso de un menor, el pastor protege primero a la víctima y lo denuncia a las autoridades, como manda la ley.",
      },
    ],
    ideaClave:
      "Jesús dio un camino gradual para corregir: en privado, con uno o dos testigos y, solo al final, ante la iglesia. La meta es ganar al hermano, y el espíritu es la mansedumbre, sabiendo que todos podemos caer. Cuando hay arrepentimiento, se perdona, se consuela y se confirma el amor. La disciplina no reemplaza a la justicia: ante un delito se protege a la víctima y se denuncia.",
    paraLaVida: {
      texto: "Corregir es un acto de amor cuando busca restaurar.",
      pregunta: "¿Qué paso de Mateo 18 se salta con más frecuencia en tu iglesia?",
    },
  },
  {
    id: "pastoral-1-5",
    objetivos: [
      "Reconocer las amenazas que la Biblia anuncia contra el rebaño.",
      "Explicar la responsabilidad del pastor con los débiles.",
      "Aplicar medidas de protección en la iglesia local.",
    ],
    paraEmpezar: "El buen pastor no solo alimenta: también protege. La Biblia advierte que el peligro puede venir de afuera y de adentro.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 20:29-31" },
      {
        t: "parrafo",
        texto:
          "Pablo anunció dos peligros: de afuera, «lobos rapaces, que no perdonarán al rebaño»; y de adentro, «de vosotros mismos se levantarán hombres que hablen cosas perversas para arrastrar tras sí a los discípulos». Por eso pidió: «velad».",
      },
      { t: "versiculo", ref: "2 Pedro 2:1-3" },
      {
        t: "parrafo",
        texto:
          "Pedro describe a los falsos maestros: introducen «encubiertamente herejías destructoras», y «por avaricia harán mercadería de vosotros con palabras fingidas». El error doctrinal y el abuso económico suelen ir juntos.",
      },
      { t: "versiculo", ref: "Ezequiel 34:4" },
      {
        t: "parrafo",
        texto:
          "Dios reprendió a los malos pastores de Israel: no fortalecieron a las débiles ni buscaron a la perdida, «sino que os habéis enseñoreado de ellas con dureza y con violencia». El abuso de poder dentro del rebaño es uno de los pecados que Dios más condena.",
      },
      { t: "versiculo", ref: "Mateo 18:6" },
      {
        t: "parrafo",
        texto: "Jesús fue tajante con los que dañan a los pequeños: «mejor le fuera que se le colgase al cuello una piedra de molino de asno».",
      },
      { t: "subtitulo", texto: "Medidas de protección" },
      {
        t: "lista",
        items: [
          "Enseñar la sana doctrina y advertir con claridad sobre los errores.",
          "Revisar y capacitar a todo el que sirve con niños y jóvenes, y nunca dejar a un adulto solo con un menor.",
          "Manejar el dinero entre dos personas y con cuentas claras.",
          "Tener un camino para que cualquiera pueda denunciar un abuso sin miedo.",
          "Cumplir la ley: en Texas, toda persona que sospeche el abuso de un menor está obligada a denunciarlo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Proteger al rebaño no es desconfiar de todos, sino amar lo suficiente para poner cercos. Las reglas claras protegen a los niños, a los débiles y también a los que sirven.",
      },
    ],
    ideaClave:
      "El pastor protege al rebaño de los lobos de afuera y de los que se levantan adentro con doctrinas perversas y con avaricia. Dios condena a los pastores que dominan con dureza, y Jesús advierte a los que dañan a los pequeños. La protección se vive con sana doctrina, cuidado de los niños, dinero transparente, un camino seguro para denunciar y obediencia a la ley.",
    paraLaVida: {
      texto: "Un rebaño seguro es fruto de un pastor que vela.",
      pregunta: "¿Qué medida de protección le falta a tu iglesia, y quién puede ayudarte a ponerla?",
    },
  },
  {
    id: "pastoral-1-6",
    objetivos: [
      "Reconocer las señales del agotamiento en el ministerio.",
      "Explicar cómo Dios cuidó a Elías y a Pablo en su debilidad.",
      "Planificar el descanso, la rendición de cuentas y el apoyo mutuo.",
    ],
    paraEmpezar:
      "Muchos pastores terminan agotados, solos o heridos. La Biblia no esconde la debilidad de los siervos de Dios, y muestra cómo él los cuida.",
    bloques: [
      { t: "versiculo", ref: "1 Reyes 19:4-5" },
      {
        t: "parrafo",
        texto:
          "Después de una gran victoria, Elías se sentó bajo un enebro «deseando morirse». Dios no lo reprendió primero: lo dejó dormir, y un ángel le dijo: «Levántate, come». Antes de hablarle de su misión, cuidó su cuerpo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Corintios 4:7-10" },
      {
        t: "parrafo",
        texto:
          "Pablo sabía que el ministerio es un tesoro «en vasos de barro»: «atribulados en todo, mas no angustiados; en apuros, mas no desesperados». La fuerza no viene del pastor, sino de Dios, «para que la excelencia del poder sea de Dios, y no de nosotros».",
      },
      { t: "subtitulo", texto: "Señales de alerta" },
      {
        t: "lista",
        items: [
          "Un cansancio que no se va con el descanso.",
          "Irritación, aislamiento o cinismo con la gente.",
          "Orar y leer la Palabra solo para preparar sermones.",
          "Descuidar a la familia y la propia salud.",
          "Pensar que nadie más puede hacer lo que uno hace.",
        ],
      },
      { t: "versiculo", ref: "Gálatas 6:2" },
      {
        t: "parrafo",
        texto:
          "El pastor también necesita que otros le ayuden a llevar sus cargas: «Sobrellevad los unos las cargas de los otros». Un pastor sano tiene un día de descanso, amigos con quienes ser sincero, alguien a quien rendir cuentas y, cuando hace falta, la ayuda de un consejero o de un médico.",
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si estás agotado, pedir ayuda no es falta de fe. Habla con tu pastor, con tu cobertura o con un profesional de la salud. Y si alguna vez piensas en hacerte daño, busca ayuda de inmediato: en Estados Unidos puedes llamar o escribir al 988, también en español.",
      },
    ],
    ideaClave:
      "Los siervos de Dios también se agotan: Elías quiso morirse, y Pablo se sabía un vaso de barro. Dios cuidó primero el cuerpo de Elías y mostró que el poder es suyo, no nuestro. El pastor reconoce las señales del agotamiento, descansa, deja que otros lleven sus cargas, rinde cuentas y pide ayuda cuando la necesita.",
    paraLaVida: {
      texto: "Cuidarte también es parte de cuidar al rebaño.",
      pregunta: "¿Qué señal de agotamiento ves en ti, y qué paso darás esta semana para atenderla?",
    },
  },
];
