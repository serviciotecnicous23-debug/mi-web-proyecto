/**
 * Nivel 1 · Materia 8 — Compartir mi fe (sílabo en shared/academia.ts). Renueva el curso «Evangelismo 1».
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Marcos 16:15-16 es el corazón de la misión del ministerio. El evangelio se presenta con el «camino de Romanos», sin
 * presionar a nadie: la decisión es de la persona y la obra, del Espíritu Santo.
 * Bibliografía: Robert E. Coleman, «Plan supremo de evangelización»; Rebecca Manley Pippert, «Fuera del salero».
 */
import type { LeccionContenido } from "../tipos";

export const N1_COMPARTIR_FE: LeccionContenido[] = [
  {
    id: "n1-compartir-fe-1",
    objetivos: [
      "Explicar qué mandó Jesús en la gran comisión.",
      "Reconocer que compartir la fe es tarea de todo creyente, no solo de los pastores.",
      "Identificar su propio campo misionero: familia, amigos, trabajo y vecindario.",
    ],
    paraEmpezar:
      "Cuando alguien descubre la cura de una enfermedad grave, no se la guarda: corre a contarla. Nosotros conocemos la noticia más importante del mundo.",
    bloques: [
      { t: "subtitulo", texto: "Id y haced discípulos" },
      { t: "versiculo", ref: "Mateo 28:18-20" },
      {
        t: "parrafo",
        texto:
          "Jesús tiene toda potestad en el cielo y en la tierra, y con esa autoridad nos envía: id, haced discípulos a todas las naciones, bautizándolos y enseñándoles a guardar todo lo que Él mandó. Y nos dejó una promesa: «yo estoy con vosotros todos los días, hasta el fin del mundo». No vamos solos.",
      },
      { t: "versiculo", ref: "Marcos 16:15-16" },
      {
        t: "parrafo",
        texto:
          "En Marcos, Jesús lo dice en pocas palabras: id por todo el mundo y predicad el evangelio a toda criatura. Este pasaje es el corazón de la misión de nuestro ministerio. El evangelio es la buena noticia de que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día (1 Corintios 15:3-4), y de que el que crea será salvo.",
      },
      { t: "subtitulo", texto: "Para todo creyente" },
      {
        t: "parrafo",
        texto:
          "La gran comisión no es solo para pastores y misioneros. Cuando la persecución esparció a la iglesia de Jerusalén, los creyentes iban por todas partes anunciando el evangelio (Hechos 8:4). La mujer samaritana fue a su pueblo a hablar de Jesús el mismo día que lo conoció, y muchos creyeron por su palabra (Juan 4:28-30, 39). No necesitas saberlo todo para contar lo que Jesús hizo en ti.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia" },
      { t: "subtitulo", texto: "Tu campo misionero" },
      {
        t: "lista",
        items: [
          "Tu familia: Jesús le dijo al hombre que liberó que fuera a su casa y contara las grandes cosas que el Señor había hecho con él (Marcos 5:19).",
          "Tus amigos y vecinos: Andrés buscó primero a su hermano Simón (Juan 1:41).",
          "Tu trabajo o tu escuela: que tus buenas obras hablen y glorifiquen al Padre (Mateo 5:16).",
          "Las redes y los medios: también allí se puede compartir la Palabra con gracia y sabiduría (Colosenses 4:5-6).",
        ],
      },
      {
        t: "nota",
        titulo: "Con el poder del Espíritu",
        texto:
          "Jesús prometió poder del Espíritu Santo para ser sus testigos (Hechos 1:8). No dependemos de lo bien que hablemos, sino de Dios, que es quien da el crecimiento (1 Corintios 3:6-7).",
      },
    ],
    ideaClave:
      "La gran comisión es para todo creyente: Jesús nos envía con su autoridad a anunciar el evangelio y hacer discípulos, y promete estar con nosotros todos los días.",
    paraLaVida: {
      texto: "Tu campo misionero empieza donde estás.",
      pregunta: "Escribe los nombres de tres personas de tu familia, tus amigos o tu trabajo que necesitan conocer a Jesús.",
    },
  },
  {
    id: "n1-compartir-fe-2",
    objetivos: [
      "Explicar por qué el testimonio personal es una herramienta poderosa.",
      "Describir las tres partes de un testimonio: antes, el encuentro con Cristo y después.",
      "Preparar un testimonio breve, centrado en Cristo.",
    ],
    paraEmpezar:
      "Nadie puede discutirte lo que Dios hizo en tu vida. El ciego que Jesús sanó no sabía responder todas las preguntas, pero dijo que una cosa sabía: que había sido ciego y ahora veía (Juan 9:25).",
    bloques: [
      { t: "subtitulo", texto: "El testimonio de Pablo" },
      { t: "versiculo", ref: "Hechos 26:9-11" },
      { t: "versiculo", ref: "Hechos 26:12-16" },
      { t: "versiculo", ref: "Hechos 26:19-20" },
      {
        t: "parrafo",
        texto:
          "Delante del rey Agripa, Pablo contó su historia en tres partes. Antes: perseguía a los creyentes, convencido de que debía hacer muchas cosas contra el nombre de Jesús. El encuentro: en el camino a Damasco, una luz del cielo lo rodeó y oyó a Jesús decirle: «Saulo, Saulo, ¿por qué me persigues?». Después: no fue rebelde a la visión celestial, y anunció a todos que se arrepintiesen y se convirtiesen a Dios. Es un modelo sencillo que cualquier creyente puede seguir.",
      },
      { t: "subtitulo", texto: "Tus tres partes" },
      {
        t: "lista",
        items: [
          "Antes: cómo era tu vida sin Cristo; qué buscabas o qué te faltaba. Sin detalles que hagan ver el pecado como algo atractivo (Efesios 5:12).",
          "El encuentro: cómo oíste el evangelio, cómo te arrepentiste y creíste en Jesús.",
          "Después: qué cambió en tu vida; el perdón, la paz y la esperanza que tienes ahora.",
        ],
      },
      { t: "versiculo", ref: "1 Pedro 3:15" },
      {
        t: "parrafo",
        texto:
          "Pedro nos pide estar siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que nos demande razón de la esperanza que hay en nosotros. Preparar tu testimonio es prepararte para esos momentos: en la fila del supermercado, en una visita al hospital o en una conversación con un amigo.",
      },
      {
        t: "nota",
        titulo: "Consejos",
        texto:
          "Que dure unos tres minutos. Habla más de Jesús que de ti. Usa palabras sencillas, sin lenguaje de iglesia que otros no entiendan. Y termina con una invitación, como Pablo, que deseaba que todos los que lo oían llegaran a ser como él (Hechos 26:29).",
      },
    ],
    ideaClave:
      "El testimonio personal cuenta, en tres partes, cómo era tu vida antes, cómo conociste a Cristo y qué cambió después; siempre debemos estar preparados para compartirlo con mansedumbre.",
    paraLaVida: {
      texto: "Tu historia con Jesús puede ser la puerta para que otro lo conozca.",
      pregunta: "Escribe tu testimonio en tres partes: antes, el encuentro y después. Procura que se pueda contar en tres minutos.",
    },
  },
  {
    id: "n1-compartir-fe-3",
    objetivos: [
      "Explicar el evangelio en cuatro verdades, con sus versículos.",
      "Usar la Biblia para guiar a alguien a recibir a Cristo.",
      "Guiar una oración de fe sin presionar.",
    ],
    paraEmpezar:
      "El evangelio es poder de Dios para salvación a todo aquel que cree (Romanos 1:16). No necesitas un discurso largo: necesitas la Palabra y amor por la persona.",
    bloques: [
      { t: "subtitulo", texto: "Cuatro verdades" },
      {
        t: "lista",
        items: [
          "Dios te ama y quiere darte vida eterna (Juan 3:16).",
          "El pecado nos separa de Dios: todos pecaron, y la paga del pecado es muerte (Romanos 3:23; 6:23).",
          "Cristo murió por nosotros siendo aún pecadores, y resucitó (Romanos 5:8; 1 Corintios 15:3-4).",
          "Hay que recibirlo por la fe: arrepentirse, creer en el corazón y confesar con la boca que Jesús es el Señor (Hechos 3:19; Romanos 10:9-10).",
        ],
      },
      { t: "versiculo", ref: "Romanos 6:23" },
      { t: "versiculo", ref: "Romanos 5:8" },
      { t: "versiculo", ref: "Romanos 10:9-10" },
      {
        t: "parrafo",
        texto:
          "Estos versículos, conocidos como el camino de Romanos, resumen el evangelio. Márcalos en tu Biblia o guárdalos en tu teléfono. Lee cada versículo con la persona, explícalo con palabras sencillas y pregúntale si lo entiende. Deja que la Palabra haga su obra: no vuelve vacía (Isaías 55:11).",
      },
      { t: "subtitulo", texto: "Invitar a recibir a Cristo" },
      {
        t: "parrafo",
        texto:
          "Si la persona quiere recibir a Jesús, puedes guiarla en una oración sencilla: reconocer que es pecadora, creer que Jesús murió y resucitó por ella, pedirle perdón y entregarle su vida como Señor y Salvador. Lo que salva no son las palabras exactas, sino la fe sincera, porque «con el corazón se cree para justicia». Nunca presiones: la decisión es de la persona, y es el Espíritu Santo quien convence (Juan 16:8).",
      },
      {
        t: "nota",
        titulo: "Si no quiere todavía",
        texto:
          "Respeta su decisión, sigue siendo su amigo y sigue orando por esa persona. Muchos necesitan oír el evangelio varias veces. Uno planta, otro riega, pero el crecimiento lo da Dios (1 Corintios 3:6).",
      },
    ],
    ideaClave:
      "El evangelio se puede explicar en cuatro verdades: Dios te ama, el pecado nos separa de Él, Cristo murió y resucitó por nosotros, y hay que recibirlo por la fe.",
    paraLaVida: {
      texto: "La Palabra de Dios no vuelve vacía.",
      pregunta: "Practica las cuatro verdades del evangelio con un hermano de la iglesia. ¿Con quién lo vas a practicar esta semana?",
    },
  },
  {
    id: "n1-compartir-fe-4",
    objetivos: [
      "Explicar por qué orar por las personas antes de hablarles de Jesús.",
      "Describir cómo Andrés llevó a su hermano a Jesús (Juan 1:40-42).",
      "Aplicar pasos concretos para acompañar a un nuevo creyente.",
    ],
    paraEmpezar: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona. La oración abre corazones y puertas.",
    bloques: [
      { t: "subtitulo", texto: "Orar primero" },
      { t: "versiculo", ref: "1 Timoteo 2:1-4" },
      {
        t: "parrafo",
        texto:
          "Pablo exhorta a orar por todos los hombres, porque Dios quiere que todos sean salvos y vengan al conocimiento de la verdad. Ora por nombre por las personas de tu lista: que Dios les abra los ojos, que pongan su confianza en Él y que a ti te dé la oportunidad y las palabras, como pedía Pablo, que el Señor le abriera puerta para la palabra (Colosenses 4:3-4).",
      },
      { t: "subtitulo", texto: "Traer a Jesús" },
      { t: "versiculo", ref: "Juan 1:40-42" },
      {
        t: "parrafo",
        texto:
          "Andrés conoció a Jesús, y lo primero que hizo fue buscar a su hermano Simón para decirle: «Hemos hallado al Mesías». Y lo trajo a Jesús. Andrés no predicó a multitudes, pero trajo a Pedro, que después predicó el día de Pentecostés. Nunca sabes lo que Dios hará con la persona que traes.",
      },
      { t: "subtitulo", texto: "Acompañar al que cree" },
      {
        t: "parrafo",
        texto:
          "Hacer discípulos no termina con una oración: es acompañar. Jesús estableció a los doce para que estuviesen con Él (Marcos 3:14), y Pablo cuidaba con ternura a los nuevos creyentes, como la nodriza que cuida a sus propios hijos (1 Tesalonicenses 2:7-8).",
      },
      {
        t: "lista",
        items: [
          "Llámalo o escríbele durante la primera semana.",
          "Invítalo a la iglesia y siéntate con él.",
          "Lean juntos el Evangelio de Juan y oren juntos.",
          "Anímalo a bautizarse y a empezar el Nivel 1 de esta academia.",
          "Preséntale a tu pastor y a otros hermanos.",
        ],
      },
      {
        t: "nota",
        titulo: "Un ciclo que se multiplica",
        texto:
          "Pablo le encargó a Timoteo que lo que había oído lo encargara a hombres fieles que fueran idóneos para enseñar también a otros (2 Timoteo 2:2). El que hoy es acompañado, mañana acompañará a otro.",
      },
    ],
    ideaClave:
      "Oramos por las personas antes de hablarles, las traemos a Jesús como Andrés trajo a su hermano, y acompañamos a los nuevos creyentes hasta que puedan acompañar a otros.",
    paraLaVida: {
      texto: "Hacer discípulos es caminar con alguien.",
      pregunta: "¿Por quién vas a orar cada día esta semana? Escribe su nombre y una manera concreta de mostrarle el amor de Jesús.",
    },
  },
];
