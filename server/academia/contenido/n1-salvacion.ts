/**
 * Nivel 1 · Materia 1 — La salvación: nueva vida en Cristo (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia: el texto sale de la RV1960 de la web al
 * pedir la lección. Las frases citadas entre comillas son literales de la RV1960 (comprobadas con
 * scripts/academia/verificar.ts).
 * Bibliografía de la materia: John Stott, «Cristianismo básico»; Billy Graham, «Paz con Dios»; Myer Pearlman,
 * «Teología bíblica y sistemática»; Pablo Hoff, «Teología evangélica».
 */
import type { LeccionContenido } from "../tipos";

export const N1_SALVACION: LeccionContenido[] = [
  {
    id: "n1-salvacion-1",
    objetivos: [
      "Explicar qué confesó Pedro acerca de Jesús y qué significa la palabra Cristo.",
      "Explicar por qué Jesús es verdadero Dios y verdadero hombre.",
      "Distinguir entre saber acerca de Jesús y recibirlo.",
    ],
    paraEmpezar:
      "Si alguien te preguntara hoy quién es Jesús para ti, ¿qué responderías? Mucha gente lo considera un buen maestro, un profeta o un personaje de la historia. La Biblia dice mucho más, y la respuesta a esa pregunta cambia la vida entera.",
    bloques: [
      { t: "subtitulo", texto: "La pregunta más importante" },
      {
        t: "parrafo",
        texto:
          "Un día, en la región de Cesarea de Filipo, Jesús reunió a sus discípulos y les hizo dos preguntas. La primera fue qué decía la gente acerca de Él. Las respuestas eran variadas: unos decían que era Juan el Bautista; otros, Elías, Jeremías o alguno de los profetas. Eran opiniones respetuosas, pero ninguna era suficiente. Entonces Jesús hizo la pregunta personal: y ustedes, ¿quién dicen que soy yo?",
      },
      { t: "versiculo", ref: "Mateo 16:15-17" },
      {
        t: "parrafo",
        texto:
          "Pedro respondió que Jesús es el Cristo, el Hijo del Dios viviente. La palabra Cristo viene del griego y significa lo mismo que Mesías en hebreo: el Ungido, el Salvador que Dios había prometido a lo largo de todo el Antiguo Testamento (Juan 1:41). Jesús añadió algo importante: esa respuesta no salió de la inteligencia de Pedro, sino que se la reveló el Padre. Conocer de verdad a Jesús es un regalo que Dios da por su Palabra y su Espíritu.",
      },
      { t: "subtitulo", texto: "Jesús es Dios hecho hombre" },
      {
        t: "parrafo",
        texto:
          "El Evangelio de Juan empieza de una manera solemne: llama a Jesús el Verbo, es decir, la Palabra de Dios. Así como nuestras palabras expresan lo que pensamos, Jesús es la expresión perfecta de quién es Dios. Juan dice tres cosas de Él: que ya existía en el principio, que estaba con Dios y que era Dios. Jesús no empezó a existir en Belén. Antes de nacer como hombre ya era el Hijo eterno, y todas las cosas fueron hechas por medio de Él.",
      },
      { t: "versiculo", ref: "Juan 1:1-3" },
      {
        t: "parrafo",
        texto:
          "Luego viene lo más asombroso: ese Verbo se hizo hombre y vivió entre nosotros. Dios no se quedó lejos. Jesús nació de una mujer, creció, tuvo hambre, se cansó y lloró. Por eso decimos que Jesús es verdadero Dios y verdadero hombre. Como Dios, puede salvarnos; como hombre, pudo tomar nuestro lugar.",
      },
      { t: "versiculo", ref: "Juan 1:14" },
      { t: "subtitulo", texto: "Lo que Jesús vino a darnos" },
      {
        t: "parrafo",
        texto:
          "Juan presenta a Jesús como la vida y la luz de los hombres (Juan 1:4). Vino a un mundo en tinieblas por causa del pecado, y no todos lo recibieron: muchos de su propio pueblo lo rechazaron. Pero a todos los que lo recibieron les dio algo que nadie más puede dar.",
      },
      { t: "versiculo", ref: "Juan 1:11-13" },
      {
        t: "parrafo",
        texto:
          "Aquí está la diferencia entre saber acerca de Jesús y conocerlo. Ser hijo de Dios no viene por la familia en que nacimos, ni por nuestra fuerza de voluntad, ni por la decisión de otra persona: viene de Dios, cuando recibimos a Jesús y creemos en su nombre. Recibirlo es confiar en Él como Salvador y darle el primer lugar como Señor.",
      },
      {
        t: "nota",
        titulo: "Murió y resucitó",
        texto:
          "Jesús no es solo un personaje del pasado. Murió en la cruz por nuestros pecados, fue sepultado y resucitó al tercer día, como lo anunciaban las Escrituras (1 Corintios 15:3-4). No seguimos a un maestro muerto: seguimos al Señor que vive.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
    ],
    ideaClave: "Jesús es el Cristo, el Hijo de Dios hecho hombre; quien lo recibe y cree en su nombre llega a ser hijo de Dios.",
    paraLaVida: {
      texto: "Cada persona tiene que responder por sí misma la pregunta que Jesús hizo a sus discípulos. Nadie puede responderla por ti.",
      pregunta: "Con tus propias palabras: ¿quién es Jesús para ti hoy?",
    },
  },
  {
    id: "n1-salvacion-2",
    objetivos: [
      "Explicar qué es el pecado y por qué alcanza a todos.",
      "Describir la paga del pecado y el regalo de Dios en Cristo.",
      "Explicar Juan 3:16 con tus palabras.",
    ],
    paraEmpezar:
      "La palabra evangelio significa buena noticia. Pero una buena noticia solo se aprecia cuando se entiende el problema que resuelve: si un médico te dice que encontró la cura, primero quieres saber de qué enfermedad.",
    bloques: [
      { t: "subtitulo", texto: "El problema: todos hemos pecado" },
      {
        t: "parrafo",
        texto:
          "Pecar es apartarse de lo que Dios quiere: vivir a nuestra manera en lugar de a la suya. No se trata solo de crímenes graves. También son pecado el orgullo, la mentira, la envidia, el rencor y no amar a Dios por encima de todo (Mateo 22:37-39). La Biblia no deja a nadie fuera:",
      },
      { t: "versiculo", ref: "Romanos 3:23" },
      {
        t: "parrafo",
        texto:
          "Estar «destituidos de la gloria de Dios» quiere decir que nos quedamos cortos: ninguno llega a la medida santa de Dios. Por eso nadie puede presentarse delante de Él diciendo que es lo bastante bueno. Y el pecado no es un detalle sin importancia: nos separa de Dios, que es santo (Isaías 59:2).",
      },
      { t: "versiculo", ref: "Romanos 6:23" },
      {
        t: "parrafo",
        texto:
          "Este versículo tiene dos partes. La primera es una mala noticia: la paga del pecado es muerte. Una paga es lo que uno gana por su trabajo, y lo que el pecado nos da a cambio es la muerte, la separación de Dios. La segunda parte es la buena noticia: la dádiva de Dios es vida eterna en Cristo Jesús. Una dádiva es un regalo. La muerte la ganamos; la vida eterna, Dios nos la regala.",
      },
      { t: "subtitulo", texto: "La solución: el amor de Dios en Cristo" },
      {
        t: "parrafo",
        texto:
          "Dios no nos dejó perdidos: Él mismo dio el primer paso. Envió a su Hijo, Jesús, que vivió sin pecado y murió en la cruz en nuestro lugar. Allí cargó con el castigo que nosotros merecíamos (Isaías 53:5-6; 1 Pedro 2:24). Y al tercer día resucitó: la muerte no pudo retenerlo.",
      },
      { t: "versiculo", ref: "Juan 3:16" },
      {
        t: "parrafo",
        texto:
          "Mira el orden de este versículo: Dios amó, Dios dio, nosotros creemos y recibimos vida eterna. La iniciativa es de Dios. No esperó a que fuéramos buenos: Cristo murió por nosotros cuando todavía éramos pecadores.",
      },
      { t: "versiculo", ref: "Romanos 5:8" },
      { t: "subtitulo", texto: "Un regalo no se compra" },
      {
        t: "parrafo",
        texto:
          "Si la salvación es un regalo, no se puede pagar ni ganar: solo se recibe con gratitud. Por eso nadie puede decir que se salvó por ser buena persona. Las buenas obras son importantes, pero vienen después, como fruto de la salvación y no como su precio (Efesios 2:10).",
      },
      {
        t: "nota",
        titulo: "El evangelio en una frase",
        texto: "Todos pecamos y merecemos la muerte, pero Dios nos ama, y en Cristo, que murió y resucitó por nosotros, nos regala la vida eterna.",
      },
    ],
    ideaClave: "El pecado nos separa de Dios y su paga es la muerte, pero en Jesucristo Dios nos regala la vida eterna.",
    paraLaVida: {
      texto: "Recibir un regalo empieza por reconocer que lo necesitas y que no lo puedes pagar.",
      pregunta: "¿Qué cambia en ti saber que la salvación es un regalo y no un premio por portarte bien?",
    },
  },
  {
    id: "n1-salvacion-3",
    objetivos: [
      "Explicar qué es arrepentirse y qué promete Dios a quien se arrepiente.",
      "Explicar qué es la fe que salva y qué es la gracia.",
      "Describir cómo se recibe la salvación según Romanos 10:9-10.",
    ],
    paraEmpezar:
      "Si la salvación es un regalo, ¿cómo se recibe? La Biblia habla de dos movimientos del corazón que van siempre juntos: arrepentirse y creer. Jesús empezó su ministerio con ese llamado (Marcos 1:15).",
    bloques: [
      { t: "subtitulo", texto: "Arrepentirse: dar la vuelta" },
      {
        t: "parrafo",
        texto:
          "Arrepentirse no es solo sentir tristeza o vergüenza. La palabra del Nuevo Testamento significa cambiar de mentalidad, y en la Biblia ese cambio se nota en la dirección de la vida: reconocer que he vivido de espaldas a Dios, dejar de justificar mi pecado y volverme a Él. Es como quien va por un camino equivocado, se da cuenta y da media vuelta.",
      },
      { t: "versiculo", ref: "Hechos 3:19" },
      {
        t: "parrafo",
        texto:
          "Fíjate en la promesa: a quien se arrepiente y se convierte, Dios le borra los pecados. No los guarda para echárselos en cara después. El arrepentimiento no es un castigo que pagamos: es la puerta por la que entramos al perdón.",
      },
      { t: "subtitulo", texto: "Creer: confiar en Jesús" },
      {
        t: "parrafo",
        texto:
          "La fe que salva no es solo aceptar que Jesús existió o que Dios es real; hasta los demonios creen que hay un solo Dios, y tiemblan (Santiago 2:19). La fe que salva es confianza personal: apoyar todo el peso de mi vida en lo que Jesús hizo por mí, como quien se sienta en una silla confiando en que lo va a sostener.",
      },
      { t: "versiculo", ref: "Efesios 2:8-9" },
      {
        t: "parrafo",
        texto:
          "Aquí aparecen dos palabras clave. La gracia es el favor de Dios que no merecemos: Dios nos da lo bueno que no ganamos. La fe es la mano vacía que recibe ese regalo. Y Pablo aclara que no es por obras, para que nadie se gloríe: nadie podrá decir delante de Dios que lo logró por sí mismo. Toda la gloria es de Dios.",
      },
      { t: "subtitulo", texto: "Con el corazón y con la boca" },
      { t: "versiculo", ref: "Romanos 10:9-10" },
      {
        t: "parrafo",
        texto:
          "Creer con el corazón es confiar de verdad en que Jesús murió por ti y en que Dios lo levantó de los muertos. Confesar con la boca es declarar abiertamente que Jesús es tu Señor, el que manda en tu vida. La fe nace en el corazón, pero no se queda escondida: se dice y se vive.",
      },
      {
        t: "nota",
        titulo: "Una oración para recibir a Jesús",
        texto:
          "Señor Jesús, reconozco que he pecado y me arrepiento. Creo que moriste por mí y que resucitaste. Te recibo como mi Salvador y mi Señor. Gracias por perdonarme y darme la vida eterna. Amén. Recuerda: no son las palabras las que salvan, sino la fe en Jesús que esas palabras expresan.",
      },
    ],
    ideaClave: "La salvación se recibe por gracia, mediante la fe: nos arrepentimos al volvernos a Dios y creemos al confiar en Jesús como Salvador y Señor.",
    paraLaVida: {
      texto: "El arrepentimiento y la fe no son de un solo día: son la manera de caminar con Dios todos los días.",
      pregunta: "¿Hay algo concreto en tu vida a lo que hoy necesitas darle la vuelta para seguir a Jesús?",
    },
  },
  {
    id: "n1-salvacion-4",
    objetivos: [
      "Explicar qué es nacer de nuevo según Juan 3.",
      "Explicar qué significa ser una nueva criatura en Cristo.",
      "Fundamentar en la Palabra la seguridad de la salvación.",
    ],
    paraEmpezar:
      "Muchos creyentes nuevos se preguntan si lo que hicieron fue suficiente, o si Dios podría cambiar de opinión. Dios no quiere que vivas con esa duda: su Palabra fue escrita también para que lo sepas.",
    bloques: [
      { t: "subtitulo", texto: "Nacer de nuevo" },
      {
        t: "parrafo",
        texto:
          "Una noche, un principal de los judíos llamado Nicodemo fue a ver a Jesús. Era fariseo: un hombre religioso, respetado y cumplidor. Jesús le dijo algo que lo desconcertó: para ver el reino de Dios hay que nacer de nuevo.",
      },
      { t: "versiculo", ref: "Juan 3:3-7" },
      {
        t: "parrafo",
        texto:
          "Nicodemo pensó en un nacimiento físico, pero Jesús hablaba de nacer del Espíritu. Nacer de nuevo no es empezar otra vez con fuerza de voluntad, ni cambiar de religión, ni mejorar un poco. Es una obra de Dios: el Espíritu Santo da una vida nueva por dentro a quien cree en Jesús. Así como no hiciste nada para nacer la primera vez, el nuevo nacimiento es un regalo de Dios (Juan 1:13; Tito 3:5).",
      },
      { t: "subtitulo", texto: "Una nueva criatura" },
      { t: "versiculo", ref: "2 Corintios 5:17" },
      {
        t: "parrafo",
        texto:
          "Quien está en Cristo es una nueva criatura. Eso no quiere decir que ya no tendrás luchas ni tentaciones, sino que ahora tienes una identidad nueva, un corazón nuevo y al Espíritu Santo para vivir de otra manera. Lo viejo ya no tiene la última palabra sobre tu vida. Crecer llevará tiempo, pero el cambio de fondo ya empezó.",
      },
      { t: "subtitulo", texto: "Puedes saberlo" },
      { t: "versiculo", ref: "1 Juan 5:11-13" },
      {
        t: "parrafo",
        texto:
          "El apóstol Juan escribió para que los creyentes supieran que tienen vida eterna. No dice que lo adivinen ni que lo sientan en un día bueno: dice «para que sepáis». La seguridad no se apoya en lo que sentimos, que cambia, sino en lo que Dios prometió, que no cambia: el que tiene al Hijo tiene la vida.",
      },
      {
        t: "parrafo",
        texto:
          "¿Y si un día fallas? Un hijo que tropieza no deja de ser hijo. Vuelve a Dios, confiesa tu pecado y recibe su perdón (1 Juan 1:9). El Padre te levanta, te corrige con amor y te ayuda a seguir adelante.",
      },
      {
        t: "nota",
        titulo: "Seguridad no es permiso",
        texto:
          "La seguridad de la salvación no es permiso para pecar: es el suelo firme desde donde se crece. Quien sabe que es amado por Dios quiere agradarle (1 Juan 2:1).",
      },
    ],
    ideaClave: "Quien cree en Jesús nace de nuevo por el Espíritu, es una nueva criatura y puede saber, por la promesa de Dios, que tiene vida eterna.",
    paraLaVida: {
      texto: "La duda no cambia la promesa de Dios. Cuando dudes, vuelve a lo que Él dijo.",
      pregunta: "Escribe con tus palabras la promesa de 1 Juan 5:12, para leerla cuando tengas dudas.",
    },
  },
];
