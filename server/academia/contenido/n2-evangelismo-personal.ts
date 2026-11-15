/**
 * Nivel 2 · Materia 8 — Evangelismo personal (sílabo en shared/academia.ts). Antes, «Evangelismo 1 y 2».
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue a «Compartir mi fe» (Nivel 1: la gran comisión, el testimonio, el evangelio en 5 minutos y acompañar) y va un
 * paso más allá: el mensaje con precisión, el modelo de Jesús, las preguntas, las objeciones, la invitación sin presión
 * y el seguimiento. La Apologética del Nivel 4 profundiza en las objeciones.
 * Referencias: Robert E. Coleman, «Plan supremo de evangelización» (Casa Bautista); Lee Strobel, «El caso de Cristo»
 * (Vida).
 */
import type { LeccionContenido } from "../tipos";

export const N2_EVANGELISMO_PERSONAL: LeccionContenido[] = [
  {
    id: "n2-evangelismo-personal-1",
    objetivos: [
      "Resumir el evangelio según 1 Corintios 15:1-4.",
      "Explicar la obra del Espíritu Santo en el evangelismo.",
      "Describir la motivación y el papel del creyente como embajador de Cristo.",
    ],
    paraEmpezar:
      "En Compartir mi fe aprendiste a contar tu testimonio y el evangelio en cinco minutos. Ahora darás un paso más: entender bien el mensaje, quién hace la obra y por qué compartimos a Cristo.",
    bloques: [
      { t: "subtitulo", texto: "El mensaje, lo primero" },
      { t: "versiculo", ref: "1 Corintios 15:1-4" },
      {
        t: "parrafo",
        texto:
          "Pablo resume el evangelio como lo más importante: «Que Cristo murió por nuestros pecados, conforme a las Escrituras», que fue sepultado y que resucitó al tercer día. El evangelio no es un consejo para vivir mejor: es la buena noticia de lo que Dios hizo en Cristo para salvarnos.",
      },
      {
        t: "lista",
        items: [
          "Dios nos creó para conocerlo y nos ama (Juan 3:16).",
          "Todos pecamos y estamos separados de Dios (Romanos 3:23; 6:23).",
          "Cristo murió por nuestros pecados y resucitó (1 Corintios 15:3-4).",
          "Por gracia, quien se arrepiente y cree recibe el perdón y la vida eterna (Efesios 2:8-9; Hechos 3:19).",
        ],
      },
      { t: "subtitulo", texto: "El Espíritu Santo hace la obra" },
      { t: "versiculo", ref: "Juan 16:8" },
      {
        t: "parrafo",
        texto:
          "Nosotros compartimos; el Espíritu Santo «convencerá al mundo de pecado, de justicia y de juicio». Nadie se convierte por nuestra elocuencia: por eso evangelizamos orando y dependiendo de su poder (Hechos 1:8).",
      },
      { t: "subtitulo", texto: "Embajadores de Cristo" },
      { t: "versiculo", ref: "2 Corintios 5:18-20" },
      {
        t: "parrafo",
        texto:
          "Un embajador habla en nombre de su rey. Pablo dice: «somos embajadores en nombre de Cristo». Lo que nos mueve no es la obligación, sino el amor: el amor de Cristo nos constriñe (2 Corintios 5:14).",
      },
      {
        t: "nota",
        titulo: "No es tu trabajo convencer",
        texto:
          "Tu parte es ser fiel: vivir el evangelio, contarlo con claridad y amor, y orar. Convencer y dar vida nueva es obra del Espíritu Santo. Eso te libra del miedo y del orgullo.",
      },
      { t: "video", url: "https://bibleproject.com/es/videos/evangelio-del-reino/", titulo: "Evangelio del Reino", fuente: "Proyecto Biblia", minutos: 5 },
    ],
    ideaClave:
      "El evangelio es la buena noticia de que Cristo murió por nuestros pecados y resucitó; el Espíritu Santo convence y salva, y nosotros somos embajadores de Cristo, movidos por su amor.",
    paraLaVida: {
      texto: "El evangelio no se negocia: se anuncia.",
      pregunta: "¿A qué persona de tu entorno quiere Dios que lleves su mensaje de reconciliación?",
    },
  },
  {
    id: "n2-evangelismo-personal-2",
    objetivos: [
      "Describir cómo Jesús inició una conversación espiritual con la mujer samaritana.",
      "Identificar los puentes y las barreras en una conversación.",
      "Aplicar el modelo de Jesús a una conversación personal.",
    ],
    paraEmpezar:
      "Jesús rompió las barreras de su tiempo para hablar con una mujer samaritana junto a un pozo. Su conversación es una escuela de evangelismo personal.",
    bloques: [
      { t: "versiculo", ref: "Juan 4:7-10" },
      {
        t: "parrafo",
        texto:
          "Jesús empezó con algo cotidiano: «Dame de beber». Cruzó tres barreras: Él era judío y ella samaritana, Él era hombre y ella mujer, y ella llevaba una vida quebrantada. Después pasó de lo cotidiano a lo espiritual: el agua viva.",
      },
      { t: "subtitulo", texto: "Del agua del pozo al agua viva" },
      { t: "versiculo", ref: "Juan 4:13-14" },
      {
        t: "lista",
        items: [
          "Tomó la iniciativa y empezó con una necesidad común.",
          "Despertó su interés con una promesa: un agua que quita la sed para siempre.",
          "Tocó su vida con verdad y sin desprecio: los maridos que había tenido (Juan 4:16-18).",
          "No se desvió con la discusión sobre el lugar de la adoración (Juan 4:19-24).",
          "Se reveló como el Mesías.",
        ],
      },
      { t: "versiculo", ref: "Juan 4:25-26" },
      {
        t: "parrafo",
        texto:
          "Jesús le dijo: «Yo soy, el que habla contigo». La mujer dejó su cántaro y fue a la ciudad a contar que había encontrado a un hombre que le dijo todo lo que había hecho (Juan 4:28-29). Una sola conversación llevó a muchos samaritanos a creer (Juan 4:39-42).",
      },
      {
        t: "nota",
        titulo: "Puentes y barreras",
        texto:
          "Un puente es lo que nos acerca: un interés común, una necesidad, una amistad, una pregunta sincera. Una barrera es lo que nos separa: los prejuicios, las discusiones, el trato frío o la prisa. El evangelismo personal busca los puentes y quita las barreras que dependen de nosotros.",
      },
    ],
    ideaClave:
      "Jesús tomó la iniciativa, cruzó barreras, empezó con una necesidad común, pasó a lo espiritual, habló con verdad y amor, no se desvió en discusiones y se reveló como el Mesías: ese es el modelo de la conversación personal.",
    paraLaVida: {
      texto: "Las mejores conversaciones sobre Dios empiezan con una conversación sobre la vida.",
      pregunta: "¿Qué puente tienes con alguien que no conoce a Cristo: un interés, una necesidad o una amistad?",
    },
  },
  {
    id: "n2-evangelismo-personal-3",
    objetivos: [
      "Explicar cómo comenzó Pablo a anunciar el evangelio en Atenas.",
      "Formular preguntas que abran conversaciones espirituales.",
      "Practicar el escuchar con respeto y el responder con mansedumbre.",
    ],
    paraEmpezar:
      "Muchos creyentes quieren compartir su fe, pero no saben cómo empezar. Una buena pregunta, hecha con amor, abre más puertas que un discurso.",
    bloques: [
      { t: "versiculo", ref: "Hechos 17:22-23" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo observó primero la ciudad y partió de lo que ellos conocían: un altar con la inscripción «AL DIOS NO CONOCIDO». Desde ahí les habló del Dios creador, del arrepentimiento y de Jesús resucitado (Hechos 17:24-31).",
      },
      { t: "subtitulo", texto: "Con sabiduría y con gracia" },
      { t: "versiculo", ref: "Colosenses 4:5-6" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que nuestra palabra sea «siempre con gracia, sazonada con sal». Cada persona es distinta: hay que aprender a responder «a cada uno».",
      },
      { t: "subtitulo", texto: "Preguntas que abren puertas" },
      {
        t: "lista",
        items: [
          "¿Tienes alguna creencia espiritual, o alguna relación con Dios?",
          "¿Qué piensas que pasa después de la muerte?",
          "Si pudieras preguntarle algo a Dios, ¿qué le preguntarías?",
          "¿Alguna vez has leído la Biblia? ¿Qué piensas de Jesús?",
          "¿Puedo orar por ti por algo que estés viviendo?",
        ],
      },
      { t: "subtitulo", texto: "Escuchar y responder con mansedumbre" },
      { t: "versiculo", ref: "1 Pedro 3:15-16" },
      {
        t: "parrafo",
        texto:
          "Pedro llama a estar preparados para responder, pero «con mansedumbre y reverencia». Escuchar de verdad, sin interrumpir ni burlarse, muestra respeto y gana el derecho a ser escuchado (Santiago 1:19).",
      },
      {
        t: "nota",
        titulo: "No ganar discusiones, sino personas",
        texto:
          "El objetivo no es tener la última palabra, sino que la persona conozca a Cristo. Si la conversación se vuelve una pelea, es mejor orar, dejar una pregunta y seguir con la amistad.",
      },
    ],
    ideaClave:
      "Como Pablo en Atenas, partimos de lo que la persona conoce; con preguntas sinceras y una palabra con gracia abrimos conversaciones, escuchamos con respeto y respondemos con mansedumbre y reverencia.",
    paraLaVida: {
      texto: "Escuchar bien también es evangelizar.",
      pregunta: "¿Qué pregunta de esta lección usarás esta semana, y con quién?",
    },
  },
  {
    id: "n2-evangelismo-personal-4",
    objetivos: [
      "Responder con la Biblia a objeciones comunes contra la fe.",
      "Distinguir entre una pregunta sincera y una excusa.",
      "Responder con humildad, sin pretender saberlo todo.",
    ],
    paraEmpezar:
      "Cuando hablas de Cristo, a veces escucharás objeciones. Algunas son preguntas sinceras; otras, excusas. En los dos casos, la respuesta empieza con amor y con la Palabra.",
    bloques: [
      { t: "subtitulo", texto: "Todos los caminos llevan a Dios" },
      { t: "versiculo", ref: "Juan 14:6" },
      {
        t: "parrafo",
        texto:
          "Jesús no dijo que era un camino, sino «el camino, y la verdad, y la vida». Pedro afirmó que en ningún otro hay salvación (Hechos 4:12). Se puede decir con respeto: no despreciamos a nadie, pero solo Jesús murió y resucitó por nuestros pecados.",
      },
      { t: "subtitulo", texto: "Soy buena persona" },
      { t: "versiculo", ref: "Romanos 3:23-24" },
      {
        t: "parrafo",
        texto:
          "Comparados con otros, muchos parecemos buenos; comparados con la santidad de Dios, «todos pecaron». La salvación no se gana siendo bueno: somos justificados «gratuitamente por su gracia».",
      },
      { t: "subtitulo", texto: "¿Por qué Dios permite el sufrimiento?" },
      { t: "versiculo", ref: "Juan 16:33" },
      {
        t: "parrafo",
        texto:
          "Es la pregunta más honda, y a veces nace de un dolor reciente: primero hay que acompañar y escuchar. La Biblia no esconde el sufrimiento: el mal entró al mundo por el pecado (Romanos 5:12); Dios no es indiferente, porque en Cristo sufrió por nosotros, y promete enjugar toda lágrima (Apocalipsis 21:4). Mientras tanto, Jesús dijo: «En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo».",
      },
      { t: "subtitulo", texto: "Otras objeciones frecuentes" },
      {
        t: "lista",
        items: [
          "La Biblia fue cambiada: se conservan miles de manuscritos antiguos del Nuevo Testamento, y Lucas investigó con cuidado lo que escribió (Lucas 1:1-4).",
          "La iglesia está llena de hipócritas: hay creyentes que fallan, pero no seguimos a los cristianos, sino a Cristo, que nunca pecó (Hebreos 4:15).",
          "Ahora no tengo tiempo: nadie sabe si tendrá un mañana, y hoy es el día de salvación (2 Corintios 6:2).",
        ],
      },
      {
        t: "nota",
        titulo: "Cuando no sabes la respuesta",
        texto:
          "No tienes que saberlo todo. Puedes decir con sencillez que no lo sabes, que lo vas a estudiar y que después le contarás. La humildad abre más puertas que una respuesta inventada. La Apologética del Nivel 4 profundiza en estas preguntas.",
      },
    ],
    ideaClave:
      "Las objeciones se responden con amor y con la Palabra: Jesús es el único camino, todos pecamos y somos salvos por gracia, Dios no es indiferente al sufrimiento y Cristo venció al mundo; y cuando no sabemos, lo decimos con humildad.",
    paraLaVida: {
      texto: "Una pregunta sincera merece una respuesta sincera, aunque sea un no lo sé.",
      pregunta: "¿Qué objeción escuchas más en tu entorno, y cómo la responderías ahora?",
    },
  },
  {
    id: "n2-evangelismo-personal-5",
    objetivos: [
      "Explicar qué significa arrepentirse y creer en Jesús.",
      "Guiar a una persona a recibir a Cristo con sencillez y sin presión.",
      "Explicar la seguridad de la salvación a quien acaba de creer.",
    ],
    paraEmpezar:
      "Llega un momento en que la persona entiende el evangelio. Muchos creyentes se detienen ahí por miedo, pero Jesús y los apóstoles siempre invitaban a responder.",
    bloques: [
      { t: "versiculo", ref: "Hechos 2:37-38" },
      {
        t: "parrafo",
        texto:
          "Cuando la gente preguntó «¿qué haremos?», Pedro respondió con claridad: «Arrepentíos». Arrepentirse es cambiar de mente y de dirección: dejar el pecado y volverse a Dios. Creer es confiar en Jesús como Salvador y Señor.",
      },
      { t: "versiculo", ref: "Romanos 10:9-10" },
      { t: "subtitulo", texto: "Cómo guiar a alguien a recibir a Cristo" },
      {
        t: "lista",
        items: [
          "Pregunta con sencillez si hay algo que le impida recibir hoy a Cristo.",
          "Explica que no hay palabras mágicas: Dios mira el corazón que se arrepiente y cree (Romanos 10:9-10).",
          "Invítala a orar con sus propias palabras, o a repetir contigo una oración sencilla: reconocer su pecado, pedir perdón, creer que Jesús murió y resucitó, y recibirlo como Señor.",
          "Nunca presiones ni manipules: la decisión es entre la persona y Dios.",
        ],
      },
      { t: "subtitulo", texto: "La seguridad de la salvación" },
      { t: "versiculo", ref: "1 Juan 5:11-13" },
      {
        t: "parrafo",
        texto:
          "Juan escribió «para que sepáis que tenéis vida eterna». La seguridad no depende de lo que se siente, sino de la promesa de Dios: «El que tiene al Hijo, tiene la vida».",
      },
      {
        t: "nota",
        titulo: "Si dice que todavía no",
        texto:
          "Respeta su decisión, sigue siendo su amigo y sigue orando. Muchas personas creen después de escuchar el evangelio varias veces. Deja la puerta abierta: invítala a la iglesia o a leer el Evangelio de Juan.",
      },
    ],
    ideaClave:
      "Después de compartir el evangelio, invitamos a responder: arrepentirse y creer en Jesús como Salvador y Señor, sin presión ni palabras mágicas; y a quien cree le mostramos la seguridad de la salvación en la promesa de Dios.",
    paraLaVida: {
      texto: "Invitar no es presionar: es ofrecer el regalo de Dios.",
      pregunta: "¿Te sientes preparado para guiar a alguien a recibir a Cristo? ¿Qué te falta?",
    },
  },
  {
    id: "n2-evangelismo-personal-6",
    objetivos: [
      "Explicar por qué el seguimiento es parte de la gran comisión.",
      "Describir los primeros pasos del nuevo creyente.",
      "Elaborar un plan de acompañamiento para las primeras semanas.",
    ],
    paraEmpezar:
      "Un recién nacido necesita cuidado. Así también el nuevo creyente: sin acompañamiento, muchos se enfrían. La gran comisión no termina en una decisión, sino en hacer discípulos.",
    bloques: [
      { t: "versiculo", ref: "Mateo 28:19-20" },
      {
        t: "parrafo",
        texto:
          "Jesús no mandó solo a predicar, sino a hacer discípulos: «haced discípulos», bautizándolos y «enseñándoles que guarden todas las cosas que os he mandado». El seguimiento es parte de la misma comisión.",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 2:7-8" },
      {
        t: "parrafo",
        texto:
          "Pablo cuidaba a los nuevos creyentes «como la nodriza que cuida con ternura a sus propios hijos». No les dio solo el evangelio, sino también su propia vida.",
      },
      { t: "subtitulo", texto: "Los primeros pasos" },
      { t: "versiculo", ref: "Hechos 2:41-42" },
      {
        t: "lista",
        items: [
          "En las primeras 48 horas: llamar o escribir, responder sus dudas y darle una Biblia o el Evangelio de Juan.",
          "La primera semana: leer juntos un pasaje, orar y llevarlo a la iglesia.",
          "El primer mes: presentarle a otros hermanos, acompañarlo hacia el bautismo y empezar con él el Nivel 1 de la Academia.",
          "Siempre: estar disponible, orar por él y celebrar sus pasos.",
        ],
      },
      {
        t: "nota",
        titulo: "Formar a otros que formen a otros",
        texto:
          "Pablo le pidió a Timoteo que encargara lo que había oído a hombres fieles que fueran idóneos para enseñar también a otros (2 Timoteo 2:2). El fruto del evangelismo personal es un discípulo que un día hará discípulos.",
      },
    ],
    ideaClave:
      "La gran comisión es hacer discípulos: acompañamos al nuevo creyente con ternura, lo llevamos a la Palabra, la oración, la iglesia y el bautismo, y lo formamos para que también forme a otros.",
    paraLaVida: {
      texto: "Ganar a alguien para Cristo toma un día; hacer un discípulo es un camino.",
      pregunta: "¿A quién estás acompañando en su fe, o a quién podrías empezar a acompañar?",
    },
  },
];
