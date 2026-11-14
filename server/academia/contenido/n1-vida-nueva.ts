/**
 * Nivel 1 · Materia 7 — Una vida nueva: santidad y victoria (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas son literales de la RV1960 (scripts/academia/verificar.ts).
 * La santidad se presenta como identidad en Cristo y crecimiento por el Espíritu, no como perfección inmediata. El
 * perdón no obliga a quedarse en peligro: ante el abuso o el delito se busca ayuda.
 * Bibliografía: Neil T. Anderson, «Victoria sobre la oscuridad»; Jerry Bridges, «En pos de la santidad».
 */
import type { LeccionContenido } from "../tipos";

export const N1_VIDA_NUEVA: LeccionContenido[] = [
  {
    id: "n1-vida-nueva-1",
    objetivos: [
      "Explicar qué significa ser una nueva criatura en Cristo.",
      "Describir lo que Dios dice de quien está en Cristo: hijo, perdonado, amado.",
      "Reconocer que la santidad es un crecimiento diario por el poder de Dios.",
    ],
    paraEmpezar:
      "Cuando una oruga se convierte en mariposa, no es una oruga mejorada: es una criatura nueva. Algo así hizo Dios contigo cuando creíste en Cristo.",
    bloques: [
      { t: "subtitulo", texto: "Una nueva criatura" },
      { t: "versiculo", ref: "2 Corintios 5:17" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que si alguno está en Cristo, nueva criatura es: las cosas viejas pasaron y todas son hechas nuevas. Cuando creíste, Dios no solo perdonó tu pasado: te dio una vida nueva. El Espíritu Santo vive en ti y pone en tu corazón nuevos deseos: amar a Dios, obedecer su Palabra y vivir para Él.",
      },
      { t: "versiculo", ref: "Gálatas 2:20" },
      {
        t: "parrafo",
        texto:
          "Gálatas 2:20 resume la vida cristiana: el viejo yo fue crucificado con Cristo, «y ya no vivo yo, mas vive Cristo en mí». Ahora vivo por la fe en el Hijo de Dios, que me amó y se entregó a sí mismo por mí.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia" },
      { t: "subtitulo", texto: "Lo que Dios dice de ti" },
      {
        t: "lista",
        items: [
          "Eres hijo de Dios: a los que le recibieron, les dio potestad de ser hechos hijos de Dios (Juan 1:12).",
          "Estás perdonado: ninguna condenación hay para los que están en Cristo Jesús (Romanos 8:1).",
          "Eres amado: nada te podrá separar del amor de Dios que es en Cristo Jesús (Romanos 8:38-39).",
          "Eres hechura de Dios, creado en Cristo Jesús para buenas obras (Efesios 2:10).",
          "Eres templo del Espíritu Santo (1 Corintios 6:19).",
        ],
      },
      { t: "subtitulo", texto: "Crecer en santidad" },
      {
        t: "parrafo",
        texto:
          "Ser santo significa ser apartado para Dios. En Cristo ya fuiste apartado para Él, y cada día el Espíritu te va transformando para que vivas de acuerdo con lo que eres. El que comenzó en ti la buena obra, la perfeccionará (Filipenses 1:6). La santidad no es perfección de un día para otro, sino crecimiento: despojarse del viejo hombre y vestirse del nuevo, creado según Dios en la justicia y santidad de la verdad (Efesios 4:22-24).",
      },
      {
        t: "nota",
        titulo: "No eres lo que eras",
        texto:
          "Tu pasado no te define: Cristo te define. Cuando lleguen pensamientos de culpa por lo que ya confesaste, responde con la Palabra: en Cristo eres una nueva criatura, y no hay condenación para ti.",
      },
    ],
    ideaClave:
      "En Cristo eres una nueva criatura: perdonado, hijo de Dios y templo del Espíritu; la santidad es vivir cada día de acuerdo con esa nueva identidad, por el poder de Dios.",
    paraLaVida: {
      texto: "Lo que Dios dice de ti es más verdadero que lo que sientes.",
      pregunta: "¿Cuál de las verdades sobre tu nueva identidad necesitas recordar más esta semana? Escríbela y repítela cada mañana.",
    },
  },
  {
    id: "n1-vida-nueva-2",
    objetivos: [
      "Explicar que la tentación no es pecado, pero lleva al pecado si se cede a ella.",
      "Describir cómo venció Jesús la tentación en el desierto.",
      "Aplicar armas concretas para resistir: la Palabra, la oración, huir y buscar ayuda.",
    ],
    paraEmpezar:
      "Jesús también fue tentado, y venció. Por eso puede socorrer a los que son tentados: Él sabe lo que es pasar por la prueba (Hebreos 2:18).",
    bloques: [
      { t: "subtitulo", texto: "La tentación no es pecado" },
      { t: "versiculo", ref: "Santiago 1:13-15" },
      {
        t: "parrafo",
        texto:
          "Dios no tienta a nadie. La tentación nos atrae a través de nuestros propios deseos, y si la abrazamos, da a luz el pecado. Ser tentado no es pecar: Jesús fue tentado en todo según nuestra semejanza, pero sin pecado (Hebreos 4:15). El pecado empieza cuando decimos sí a lo que Dios dice no.",
      },
      { t: "subtitulo", texto: "Cómo venció Jesús" },
      { t: "versiculo", ref: "Mateo 4:1-4" },
      {
        t: "parrafo",
        texto:
          "En el desierto, el diablo tentó a Jesús tres veces, y las tres veces Jesús respondió con la Escritura: «Escrito está» (Mateo 4:4, 7, 10). La Palabra guardada en el corazón es la espada del Espíritu (Efesios 6:17). Por eso aprender versículos de memoria no es un ejercicio escolar: es armarse para la batalla (Salmos 119:11).",
      },
      { t: "versiculo", ref: "1 Corintios 10:13" },
      {
        t: "parrafo",
        texto:
          "Dios es fiel: no deja que seamos tentados más de lo que podemos resistir, y junto con la tentación da la salida. Siempre hay una salida. A veces es apagar la pantalla, cambiar de camino o llamar a un hermano; otras veces es salir corriendo, como José, que dejó su ropa y huyó (Génesis 39:12).",
      },
      { t: "subtitulo", texto: "Tus armas" },
      {
        t: "lista",
        items: [
          "La Palabra: guárdala en tu corazón para no pecar contra Dios (Salmos 119:11).",
          "La oración: velad y orad, para que no entréis en tentación (Mateo 26:41).",
          "Huir: huye de las pasiones juveniles y sigue la justicia (2 Timoteo 2:22).",
          "Resistir: someteos a Dios; resistid al diablo, y huirá de vosotros (Santiago 4:7).",
          "Compañía: busca hermanos que te animen y oren contigo; mejores son dos que uno (Eclesiastés 4:9-10).",
        ],
      },
      {
        t: "nota",
        titulo: "Prepárate antes",
        texto:
          "Conoce tus puntos débiles y pon límites antes de que llegue la tentación: lugares, horarios, amistades o aplicaciones que te alejan de Dios. Es más fácil decir que no a tiempo que salir después.",
      },
    ],
    ideaClave:
      "La tentación no es pecado; Jesús la venció con la Palabra, y Dios siempre da la salida: resistimos con la Escritura, la oración, la huida y la ayuda de los hermanos.",
    paraLaVida: {
      texto: "Cada tentación vencida fortalece tu fe.",
      pregunta: "¿Cuál es la tentación que más te cuesta? Escribe un versículo para responderle y un límite concreto que vas a poner.",
    },
  },
  {
    id: "n1-vida-nueva-3",
    objetivos: [
      "Explicar qué hacer cuando un creyente peca: confesar y recibir el perdón (1 Juan 1:9).",
      "Describir el arrepentimiento de David en el Salmo 51.",
      "Distinguir entre la tristeza que lleva al arrepentimiento y la culpa que aleja de Dios.",
    ],
    paraEmpezar:
      "Un niño que aprende a caminar se cae muchas veces, y su padre no lo echa de la casa: lo levanta. Cuando un hijo de Dios cae, el Padre no lo rechaza; lo llama a volver.",
    bloques: [
      { t: "subtitulo", texto: "Si confesamos" },
      { t: "versiculo", ref: "1 Juan 1:8-9" },
      { t: "versiculo", ref: "1 Juan 2:1-2" },
      {
        t: "parrafo",
        texto:
          "Juan es honesto: si decimos que no tenemos pecado, nos engañamos a nosotros mismos. Pero si confesamos nuestros pecados, Dios es fiel y justo para perdonarnos y limpiarnos de toda maldad. Confesar es llamar al pecado por su nombre delante de Dios, sin excusas, y apartarse de él. Y si alguno peca, abogado tenemos para con el Padre: Jesucristo el justo, que es la propiciación por nuestros pecados.",
      },
      { t: "subtitulo", texto: "El regreso de David" },
      { t: "versiculo", ref: "Salmos 51:1-4" },
      { t: "versiculo", ref: "Salmos 51:10-12" },
      {
        t: "parrafo",
        texto:
          "David pecó gravemente: adulterio y homicidio (2 Samuel 11). Cuando el profeta Natán lo confrontó, no se justificó: reconoció su pecado (2 Samuel 12:13) y escribió el Salmo 51. Pidió misericordia y oró: «Crea en mí, oh Dios, un corazón limpio». Pidió también que Dios le devolviera el gozo de su salvación. Dios no desprecia al corazón contrito y humillado (Salmos 51:17).",
      },
      { t: "subtitulo", texto: "Tristeza que sana, culpa que aleja" },
      {
        t: "parrafo",
        texto:
          "Pablo distingue dos tristezas: la que es según Dios, que produce arrepentimiento para salvación, y la del mundo, que produce muerte (2 Corintios 7:10). Pedro negó a Jesús y lloró amargamente, pero volvió y fue restaurado (Lucas 22:61-62; Juan 21:15-17). Judas sintió remordimiento, pero no volvió a Jesús (Mateo 27:3-5). El enemigo acusa para que te escondas; el Espíritu convence para que regreses.",
      },
      {
        t: "nota",
        titulo: "Si fallaste hoy",
        texto:
          "No esperes a la noche ni al domingo: habla con Dios ahora, confiesa, recibe su perdón y levántate. Si tu pecado afectó a otros, pide perdón y repara lo que puedas. Si es un pecado que se repite, busca la ayuda de tu pastor o de un hermano maduro, y oren juntos (Santiago 5:16).",
      },
    ],
    ideaClave:
      "Cuando caemos, no huimos de Dios: confesamos, recibimos su perdón por la obra de Cristo y nos levantamos; la tristeza según Dios nos lleva de vuelta a Él.",
    paraLaVida: {
      texto: "El camino de regreso a Dios siempre está abierto.",
      pregunta: "¿Hay algo que necesitas confesarle a Dios hoy? Escríbele una oración sincera, como David en el Salmo 51.",
    },
  },
  {
    id: "n1-vida-nueva-4",
    objetivos: [
      "Explicar por qué el creyente perdona: porque Dios lo perdonó en Cristo.",
      "Describir lo que es y lo que no es perdonar.",
      "Aplicar pasos concretos para perdonar y buscar la paz.",
    ],
    paraEmpezar:
      "Guardar rencor es como cargar una piedra pesada todo el día: el que más sufre es quien la carga. Jesús nos ofrece un camino mejor: perdonar como fuimos perdonados.",
    bloques: [
      { t: "subtitulo", texto: "Perdonados para perdonar" },
      { t: "versiculo", ref: "Efesios 4:31-32" },
      {
        t: "parrafo",
        texto:
          "Pablo nos pide quitar de nosotros toda amargura, enojo, ira, gritería y maledicencia, y ser benignos y misericordiosos, perdonándonos unos a otros, como Dios también nos perdonó a nosotros en Cristo. La medida del perdón que damos es el perdón que recibimos: una deuda inmensa que Dios canceló en la cruz.",
      },
      { t: "versiculo", ref: "Mateo 18:21-22" },
      {
        t: "parrafo",
        texto:
          "Pedro preguntó si bastaba con perdonar siete veces. Jesús respondió: «No te digo hasta siete, sino aun hasta setenta veces siete». El perdón no es una cuenta que se lleva, sino un estilo de vida. Después contó la parábola del siervo al que su señor le perdonó una deuda enorme, pero que no quiso perdonar a su consiervo una deuda pequeña (Mateo 18:23-35).",
      },
      { t: "subtitulo", texto: "Lo que es y lo que no es perdonar" },
      {
        t: "lista",
        items: [
          "Perdonar es decidir no cobrar la deuda y dejar la justicia en manos de Dios (Romanos 12:19).",
          "Perdonar no es decir que lo malo estuvo bien ni negar el dolor.",
          "Perdonar no siempre es volver a confiar de inmediato: la confianza se reconstruye con el tiempo.",
          "Perdonar no borra las consecuencias legales de un delito ni te obliga a quedarte en peligro: pide ayuda y protégete.",
        ],
      },
      { t: "subtitulo", texto: "Vivir en paz" },
      {
        t: "parrafo",
        texto:
          "Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres (Romanos 12:18). A veces la paz depende también del otro; pero lo que depende de ti, hazlo: pide perdón cuando ofendes, perdona cuando te ofenden y ora por quienes te hieren (Mateo 5:44).",
      },
      {
        t: "nota",
        titulo: "Cuando duele mucho",
        texto:
          "Hay heridas profundas que no sanan en un día. Perdonar puede ser una decisión que se renueva cada vez que vuelve el recuerdo. Llévalo a Dios en oración y, si lo necesitas, busca consejería en tu iglesia.",
      },
    ],
    ideaClave:
      "El creyente perdona porque Dios lo perdonó en Cristo; perdonar es dejar la deuda en manos de Dios, sin negar el dolor, y buscar la paz en lo que depende de nosotros.",
    paraLaVida: {
      texto: "El perdón te libera a ti primero.",
      pregunta: "¿A quién necesitas perdonar? Escribe su nombre, ora por esa persona y entrégale a Dios la deuda.",
    },
  },
];
