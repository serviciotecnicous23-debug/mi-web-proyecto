/**
 * Nivel 2 · Materia 3 — Doctrinas fundamentales (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Sigue la declaración de fe del ministerio (shared/academia-declaracion.ts) artículo por artículo. Mientras la Dirección
 * académica no la apruebe es un borrador, y en los cinco puntos en que las iglesias pentecostales difieren (la
 * perseverancia, las lenguas como señal, la sanidad en la expiación, el ministerio de la mujer y el orden de los últimos
 * tiempos) la materia presenta las posiciones con respeto y deja la del ministerio por confirmar.
 */
import type { LeccionContenido } from "../tipos";

export const N2_DOCTRINAS: LeccionContenido[] = [
  {
    id: "n2-doctrinas-1",
    objetivos: [
      "Explicar por qué la Biblia es la autoridad final de lo que creemos.",
      "Describir lo que creemos sobre el único Dios en tres personas.",
      "Reconocer por qué la sana doctrina importa para la vida del discípulo.",
    ],
    paraEmpezar:
      "Todo creyente tiene una teología, aunque no la llame así: lo que cree sobre Dios guía cómo ora, cómo vive y cómo sirve. Esta materia recorre lo que cree la iglesia, empezando por la Biblia y por Dios mismo.",
    bloques: [
      { t: "versiculo", ref: "2 Timoteo 1:13" },
      {
        t: "parrafo",
        texto:
          "Pablo le pide a Timoteo: «Retén la forma de las sanas palabras que de mí oíste, en la fe y amor que es en Cristo Jesús». Es el versículo de memoria de esta materia. La doctrina no es un adorno: son las sanas palabras que se retienen con fe y con amor.",
      },
      {
        t: "nota",
        titulo: "La declaración de fe",
        texto:
          "Esta materia sigue, artículo por artículo, la declaración de fe del ministerio, que se puede leer completa en la academia. Mientras la Dirección académica no la apruebe es un borrador, y en cinco puntos en que las iglesias pentecostales difieren la materia presenta las posiciones con respeto y deja la del ministerio por confirmar.",
      },
      { t: "subtitulo", texto: "Artículo 1: Las Sagradas Escrituras" },
      { t: "versiculo", ref: "2 Timoteo 3:16-17" },
      {
        t: "parrafo",
        texto:
          "Creemos que la Biblia es la Palabra de Dios: «Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia». Por eso es sin error en lo que enseña, suficiente para la fe y la conducta, y la autoridad final de todo lo que creemos y hacemos.",
      },
      { t: "versiculo", ref: "2 Pedro 1:20-21" },
      {
        t: "parrafo",
        texto:
          "Pedro explica cómo llegó: «nunca la profecía fue traída por voluntad humana, sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo». Dios usó a personas reales, con su estilo y su tiempo, pero el mensaje es suyo.",
      },
      { t: "subtitulo", texto: "Artículo 2: El único Dios verdadero" },
      { t: "versiculo", ref: "Deuteronomio 6:4" },
      {
        t: "parrafo",
        texto:
          "Israel confesaba cada día: «Oye, Israel: Jehová nuestro Dios, Jehová uno es». Hay un solo Dios, eterno, santo y todopoderoso, Creador de todas las cosas.",
      },
      { t: "versiculo", ref: "Mateo 28:19" },
      { t: "versiculo", ref: "2 Corintios 13:14" },
      {
        t: "parrafo",
        texto:
          "Y ese único Dios existe eternamente en tres personas. Jesús mandó bautizar «en el nombre del Padre, y del Hijo, y del Espíritu Santo»: un solo nombre, tres personas. Pablo bendice con las tres: «La gracia del Señor Jesucristo, el amor de Dios, y la comunión del Espíritu Santo». No son tres dioses ni tres maneras de aparecer de una misma persona: son el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", minutos: 6 },
      {
        t: "lista",
        items: [
          "La Biblia es la Palabra de Dios inspirada, sin error en lo que enseña.",
          "Es suficiente para la fe y la conducta, y la autoridad final.",
          "Hay un solo Dios verdadero.",
          "Existe en tres personas: el Padre, el Hijo y el Espíritu Santo.",
          "Las tres son iguales en esencia, poder y gloria.",
        ],
      },
    ],
    ideaClave:
      "La Biblia es la Palabra de Dios: toda la Escritura es inspirada por Dios, sin error en lo que enseña y suficiente para la fe y la conducta, la autoridad final de lo que creemos. Hay un solo Dios verdadero, que existe eternamente en tres personas, el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria.",
    paraLaVida: {
      texto: "Lo que crees sobre Dios se nota en cómo vives.",
      pregunta: "¿Qué verdad sobre la Biblia o sobre Dios necesitas retener con más firmeza esta semana?",
    },
  },
  {
    id: "n2-doctrinas-2",
    objetivos: [
      "Explicar que Jesucristo es verdadero Dios y verdadero hombre.",
      "Describir su nacimiento virginal, su vida sin pecado, su muerte y su resurrección.",
      "Valorar su obra presente a la diestra del Padre.",
    ],
    paraEmpezar: "La pregunta más importante de la fe es la que Jesús hizo a sus discípulos: ¿quién decís que soy yo? El artículo 3 de la declaración la responde.",
    bloques: [
      { t: "subtitulo", texto: "Artículo 3: El Señor Jesucristo" },
      { t: "versiculo", ref: "Juan 1:1" },
      { t: "versiculo", ref: "Juan 1:14" },
      {
        t: "parrafo",
        texto:
          "Jesucristo es el Hijo eterno de Dios: «En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios». Y ese Verbo eterno se hizo hombre: «Y aquel Verbo fue hecho carne, y habitó entre nosotros». Es verdadero Dios y verdadero hombre, en una sola persona.",
      },
      { t: "versiculo", ref: "Mateo 1:20-23" },
      {
        t: "parrafo",
        texto:
          "Fue concebido por el Espíritu Santo y nació de la virgen María: «lo que en ella es engendrado, del Espíritu Santo es». Su nombre dice su misión: «llamarás su nombre JESÚS, porque él salvará a su pueblo de sus pecados». Y dice quién es: «Emanuel, que traducido es: Dios con nosotros».",
      },
      { t: "versiculo", ref: "Hebreos 4:15" },
      {
        t: "parrafo",
        texto:
          "Vivió como nosotros, pero sin pecar: fue «tentado en todo según nuestra semejanza, pero sin pecado». Por eso puede compadecerse de nuestras debilidades y es el sacrificio perfecto.",
      },
      { t: "versiculo", ref: "1 Corintios 15:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo resume el centro del evangelio: «Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día». Murió en nuestro lugar y resucitó corporalmente. Después subió al cielo y está sentado a la diestra del Padre, donde intercede por nosotros.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "lista",
        items: [
          "El Hijo eterno de Dios: el Verbo era Dios.",
          "Verdadero hombre: el Verbo fue hecho carne.",
          "Concebido por el Espíritu Santo, nacido de la virgen María.",
          "Vivió sin pecado e hizo milagros.",
          "Murió en nuestro lugar y resucitó corporalmente al tercer día.",
          "Subió al cielo y hoy intercede por nosotros.",
        ],
      },
    ],
    ideaClave:
      "Jesucristo es el Hijo eterno de Dios, verdadero Dios y verdadero hombre: el Verbo era Dios y fue hecho carne. Fue concebido por el Espíritu Santo y nació de la virgen María, vivió sin pecado, murió por nuestros pecados, resucitó corporalmente al tercer día, subió al cielo y está a la diestra del Padre, donde intercede por nosotros.",
    paraLaVida: {
      texto: "Jesús no es solo un buen maestro: es Dios con nosotros.",
      pregunta: "¿Cómo responderías hoy, con tus palabras, la pregunta de Jesús: quién decís que soy yo?",
    },
  },
  {
    id: "n2-doctrinas-3",
    objetivos: [
      "Explicar que el ser humano fue creado a imagen de Dios y que todos pecaron.",
      "Explicar la salvación solo por gracia, por medio de la fe, y no por obras.",
      "Reconocer las posiciones sobre la perseverancia que el ministerio debe confirmar.",
    ],
    paraEmpezar: "Para entender la buena noticia hay que entender primero la mala: qué pasó con el ser humano y por qué no puede salvarse a sí mismo.",
    bloques: [
      { t: "subtitulo", texto: "Artículo 5: El ser humano y el pecado" },
      { t: "versiculo", ref: "Génesis 1:27" },
      {
        t: "parrafo",
        texto:
          "Dios creó al ser humano con una dignidad única: «Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó». Toda persona, hombre o mujer, lleva esa imagen.",
      },
      { t: "versiculo", ref: "Romanos 5:12" },
      { t: "versiculo", ref: "Romanos 3:23" },
      {
        t: "parrafo",
        texto:
          "Pero por la desobediencia de Adán «el pecado entró en el mundo por un hombre, y por el pecado la muerte». Y nadie quedó fuera: «por cuanto todos pecaron, y están destituidos de la gloria de Dios». El ser humano está separado de Dios y no puede salvarse a sí mismo.",
      },
      { t: "subtitulo", texto: "Artículo 6: La salvación" },
      { t: "versiculo", ref: "Efesios 2:8-9" },
      {
        t: "parrafo",
        texto:
          "La salvación es un regalo: «Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe». Quien se arrepiente y cree en Cristo es perdonado, justificado y adoptado como hijo de Dios.",
      },
      { t: "versiculo", ref: "Juan 3:3" },
      {
        t: "parrafo",
        texto: "Es un nuevo comienzo, no una mejora de la vida vieja: «el que no naciere de nuevo, no puede ver el reino de Dios».",
      },
      { t: "versiculo", ref: "1 Juan 5:11-13" },
      {
        t: "parrafo",
        texto:
          "Y el creyente puede tener seguridad, apoyada en las promesas de Dios y no en sus sentimientos: «Estas cosas os he escrito a vosotros que creéis en el nombre del Hijo de Dios, para que sepáis que tenéis vida eterna».",
      },
      { t: "subtitulo", texto: "Un punto por confirmar: la perseverancia" },
      { t: "versiculo", ref: "Juan 10:28-29" },
      { t: "versiculo", ref: "Hebreos 3:12-14" },
      {
        t: "parrafo",
        texto:
          "Los creyentes difieren sobre si el que se aparta de la fe de manera definitiva puede perder la salvación. Unos, como las Asambleas de Dios, enseñan que sí puede, y citan advertencias como «Mirad, hermanos, que no haya en ninguno de vosotros corazón malo de incredulidad para apartarse del Dios vivo». Otros enseñan que quien nació de nuevo nunca la pierde, y citan promesas como «no perecerán jamás, ni nadie las arrebatará de mi mano».",
      },
      {
        t: "nota",
        titulo: "Lo que queda por confirmar",
        texto:
          "La posición del ministerio sobre la perseverancia es un punto de la declaración de fe por confirmar. Todos coinciden en dos cosas: la seguridad de la salvación descansa en las promesas de Dios, y la Biblia llama a cada creyente a permanecer firme en la fe.",
      },
    ],
    ideaClave:
      "Dios creó al ser humano a su imagen, pero por Adán el pecado entró en el mundo, y todos pecaron. La salvación es un regalo: por gracia, por medio de la fe en Cristo y no por obras; quien cree nace de nuevo y puede saber que tiene vida eterna. Si el que se aparta de la fe de manera definitiva pierde la salvación es un punto por confirmar.",
    paraLaVida: {
      texto: "La salvación no se gana: se recibe.",
      pregunta: "¿Descansas en las promesas de Dios o en lo que sientes para saber que tienes vida eterna?",
    },
  },
  {
    id: "n2-doctrinas-4",
    objetivos: [
      "Explicar quién es el Espíritu Santo y qué hace en el creyente.",
      "Describir lo que creemos sobre el bautismo en el Espíritu y los dones.",
      "Reconocer los puntos por confirmar sobre las lenguas y la sanidad.",
    ],
    paraEmpezar:
      "La fe pentecostal da un lugar especial a la obra del Espíritu Santo. Este tema reúne cuatro artículos de la declaración: el Espíritu Santo, su bautismo, sus dones y la sanidad divina.",
    bloques: [
      { t: "subtitulo", texto: "Artículo 4: El Espíritu Santo" },
      { t: "versiculo", ref: "Juan 16:7-8" },
      { t: "versiculo", ref: "Romanos 8:16" },
      {
        t: "parrafo",
        texto:
          "El Espíritu Santo es una persona divina, no una fuerza. Jesús lo llama el Consolador y dice que «convencerá al mundo de pecado, de justicia y de juicio». Hace nacer de nuevo al que cree, vive en él y le da seguridad: «El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».",
      },
      { t: "subtitulo", texto: "Artículo 9: El bautismo en el Espíritu Santo" },
      { t: "versiculo", ref: "Hechos 1:8" },
      { t: "versiculo", ref: "Hechos 2:4" },
      {
        t: "parrafo",
        texto:
          "Jesús prometió: «recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos». El bautismo en el Espíritu es una promesa para todo creyente, distinta del nuevo nacimiento y que puede seguirlo, y da poder para testificar y servir. En Pentecostés, «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas».",
      },
      { t: "versiculo", ref: "Hechos 2:38-39" },
      {
        t: "parrafo",
        texto: "Pedro dijo que es para todos: «Porque para vosotros es la promesa, y para vuestros hijos, y para todos los que están lejos». Todo creyente debe buscarlo con fe.",
      },
      { t: "versiculo", ref: "1 Corintios 12:30" },
      {
        t: "nota",
        titulo: "Un punto por confirmar: las lenguas como señal",
        texto:
          "Las iglesias pentecostales difieren sobre si hablar en otras lenguas es la señal física inicial y necesaria del bautismo en el Espíritu, como enseñan las Asambleas de Dios con los relatos de Hechos, o una manifestación que se espera sin ser la única señal, como enseñan otras, recordando la pregunta «¿hablan todos lenguas?». La posición del ministerio es un punto de la declaración de fe por confirmar.",
      },
      { t: "subtitulo", texto: "Artículo 10: Los dones del Espíritu" },
      { t: "versiculo", ref: "1 Corintios 12:7" },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto:
          "Los dones del Espíritu siguen vigentes hoy: «a cada uno le es dada la manifestación del Espíritu para provecho». Dios los da para edificar a la iglesia y alcanzar al mundo, y se ejercen con amor, bajo la autoridad de la Palabra y con orden: «hágase todo decentemente y con orden».",
      },
      { t: "subtitulo", texto: "Artículo 11: La sanidad divina" },
      { t: "versiculo", ref: "Santiago 5:14-15" },
      {
        t: "parrafo",
        texto:
          "Dios sana hoy en respuesta a la oración de fe. Santiago enseña: «Llame a los ancianos de la iglesia, y oren por él, ungiéndole con aceite en el nombre del Señor». Buscar la sanidad de Dios no se opone a recibir atención médica.",
      },
      { t: "versiculo", ref: "Isaías 53:4-5" },
      { t: "versiculo", ref: "Mateo 8:16-17" },
      {
        t: "nota",
        titulo: "Un punto por confirmar: la sanidad en la expiación",
        texto:
          "El pentecostalismo clásico enseña que la sanidad está provista en la obra de Cristo en la cruz, y lee así Isaías 53, que Mateo aplica a las sanidades de Jesús: «El mismo tomó nuestras enfermedades, y llevó nuestras dolencias». Otros la presentan como una promesa de Dios en respuesta a la oración. La posición del ministerio es un punto de la declaración de fe por confirmar.",
      },
    ],
    ideaClave:
      "El Espíritu Santo es una persona divina que convence de pecado, hace nacer de nuevo, vive en el creyente y le da poder. El bautismo en el Espíritu es una promesa para todo creyente, para testificar y servir; los dones siguen vigentes y se ejercen con amor y orden; y Dios sana hoy en respuesta a la oración de fe. Las lenguas como señal y la sanidad en la expiación quedan por confirmar.",
    paraLaVida: {
      texto: "El Espíritu Santo no es una idea: es Dios que vive en ti.",
      pregunta: "¿Qué lugar le das al Espíritu Santo en tu oración y en tu servicio?",
    },
  },
  {
    id: "n2-doctrinas-5",
    objetivos: [
      "Explicar la santificación como la voluntad de Dios para sus hijos.",
      "Describir las dos ordenanzas de la iglesia y su sentido.",
      "Relacionar la misión de la iglesia y el ministerio con la vida del discípulo.",
    ],
    paraEmpezar: "La salvación no termina en el perdón: abre una vida nueva, en santidad, dentro de una iglesia que tiene una misión.",
    bloques: [
      { t: "subtitulo", texto: "Artículo 7: La santificación" },
      { t: "versiculo", ref: "1 Tesalonicenses 4:3" },
      { t: "versiculo", ref: "2 Corintios 3:18" },
      {
        t: "parrafo",
        texto:
          "La voluntad de Dios es clara: «la voluntad de Dios es vuestra santificación». En Cristo el creyente ya fue apartado para Dios, y día a día crece a su imagen: «somos transformados de gloria en gloria en la misma imagen, como por el Espíritu del Señor», por la Palabra, la oración y la obediencia.",
      },
      { t: "subtitulo", texto: "Artículo 8: Las ordenanzas" },
      { t: "versiculo", ref: "Romanos 6:4" },
      {
        t: "parrafo",
        texto:
          "El Señor dejó dos ordenanzas. El bautismo en agua, por inmersión, de los que se arrepintieron y creyeron, es un testimonio de que murieron al pecado y resucitaron a una vida nueva: «somos sepultados juntamente con él para muerte por el bautismo, a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva».",
      },
      { t: "versiculo", ref: "1 Corintios 11:23-26" },
      { t: "versiculo", ref: "1 Corintios 11:28" },
      {
        t: "parrafo",
        texto:
          "La Santa Cena es memorial de la muerte del Señor: «haced esto en memoria de mí». Es comunión con él y con su pueblo, y anuncio de su venida: «la muerte del Señor anunciáis hasta que él venga». Participan los creyentes que se examinan a sí mismos: «pruébese cada uno a sí mismo».",
      },
      { t: "subtitulo", texto: "Artículo 12: La iglesia y su misión" },
      { t: "versiculo", ref: "Mateo 16:18" },
      {
        t: "parrafo",
        texto:
          "La iglesia es el cuerpo de Cristo, formado por todos los que han creído en él, y él mismo la sostiene: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella». La iglesia local se reúne para adorar, aprender la Palabra, tener comunión, orar, servir y anunciar el evangelio a toda criatura.",
      },
      { t: "subtitulo", texto: "Artículo 13: El ministerio" },
      { t: "versiculo", ref: "Efesios 4:11-12" },
      {
        t: "parrafo",
        texto:
          "Cristo da a su iglesia apóstoles, profetas, evangelistas, pastores y maestros, «a fin de perfeccionar a los santos para la obra del ministerio». Todo creyente es llamado a servir con sus dones, y quienes dirigen deben cumplir los requisitos de carácter que pide la Palabra.",
      },
      { t: "versiculo", ref: "Hechos 2:17-18" },
      { t: "versiculo", ref: "1 Timoteo 2:12" },
      {
        t: "nota",
        titulo: "Un punto por confirmar: el ministerio de la mujer",
        texto:
          "Muchas iglesias pentecostales reconocen a mujeres en el pastorado y en la predicación, recordando que Dios derrama su Espíritu y que «vuestros hijos y vuestras hijas profetizarán», y a mujeres como Febe. Otras ponen límites, leyendo textos como 1 Timoteo 2:12. Si la mujer puede ejercer el pastorado y la predicación, o con qué límites, es un punto de la declaración de fe por confirmar.",
      },
    ],
    ideaClave:
      "La voluntad de Dios es la santificación: el creyente, ya apartado para Dios, crece a la imagen de Cristo. El Señor dejó dos ordenanzas: el bautismo en agua por inmersión, testimonio de la vida nueva, y la Santa Cena, memorial de su muerte hasta que él venga. La iglesia es el cuerpo de Cristo con la misión de anunciar el evangelio, y Cristo le da ministerios para capacitar a todos para servir.",
    paraLaVida: {
      texto: "La doctrina de la iglesia se vive sirviendo dentro de ella.",
      pregunta: "¿Con qué don estás sirviendo hoy en tu iglesia local?",
    },
  },
  {
    id: "n2-doctrinas-6",
    objetivos: [
      "Explicar lo que creemos sobre el matrimonio y la familia.",
      "Describir la esperanza de la venida de Cristo y el juicio final.",
      "Reconocer el punto por confirmar sobre el orden de los últimos tiempos.",
    ],
    paraEmpezar: "La declaración termina con la familia, el avivamiento y la gran esperanza de la iglesia: Cristo vuelve.",
    bloques: [
      { t: "subtitulo", texto: "Artículo 14: El matrimonio y la familia" },
      { t: "versiculo", ref: "Génesis 2:24" },
      { t: "versiculo", ref: "Hebreos 13:4" },
      {
        t: "parrafo",
        texto:
          "Dios instituyó el matrimonio entre un hombre y una mujer: «dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne». Es un pacto de amor y fidelidad para toda la vida: «Honroso sea en todos el matrimonio». Y la familia es el lugar donde se ama, se enseña la fe y se forma a los hijos.",
      },
      { t: "subtitulo", texto: "Artículo 15: El avivamiento" },
      {
        t: "parrafo",
        texto:
          "Dios sigue derramando su Espíritu. Creemos en el avivamiento: la obra del Espíritu Santo que despierta a la iglesia a la santidad, la oración y el primer amor, y que alcanza con poder a los perdidos. Lo buscamos con oración, arrepentimiento y obediencia a la Palabra.",
      },
      { t: "subtitulo", texto: "Artículo 16: La venida de Cristo" },
      { t: "versiculo", ref: "Hechos 1:11" },
      { t: "versiculo", ref: "1 Tesalonicenses 4:16-17" },
      {
        t: "parrafo",
        texto:
          "Jesucristo volverá personal y visiblemente: «Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo». Su venida es la esperanza de la iglesia: «los muertos en Cristo resucitarán primero», y los creyentes que vivan serán transformados y «así estaremos siempre con el Señor».",
      },
      { t: "versiculo", ref: "Apocalipsis 20:4" },
      {
        t: "nota",
        titulo: "Un punto por confirmar: el orden de los últimos tiempos",
        texto:
          "Las Asambleas de Dios enseñan que la iglesia será arrebatada antes de la gran tribulación y que habrá un reino de mil años de Cristo en la tierra, leyendo así pasajes como Apocalipsis 20, donde reinaron «con Cristo mil años». Otros creyentes entienden de otra manera el orden de estos acontecimientos. La posición del ministerio es un punto de la declaración de fe por confirmar; todos coinciden en que Cristo vuelve, personal y visiblemente.",
      },
      { t: "subtitulo", texto: "Artículo 17: El juicio final y la eternidad" },
      { t: "versiculo", ref: "Juan 5:28-29" },
      { t: "versiculo", ref: "Apocalipsis 21:4" },
      {
        t: "parrafo",
        texto:
          "Habrá un juicio final: «vendrá hora cuando todos los que están en los sepulcros oirán su voz». Los que recibieron a Cristo vivirán para siempre con Dios en los cielos nuevos y la tierra nueva, donde «ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor»; y los que lo rechazaron sufrirán la separación eterna de Dios.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      {
        t: "lista",
        items: [
          "El matrimonio: un hombre y una mujer, un pacto para toda la vida.",
          "La familia: donde se ama y se enseña la fe.",
          "El avivamiento: Dios sigue derramando su Espíritu.",
          "Cristo volverá personal y visiblemente.",
          "Habrá un juicio final y una eternidad con Dios o separada de él.",
        ],
      },
    ],
    ideaClave:
      "Dios instituyó el matrimonio entre un hombre y una mujer como un pacto para toda la vida, y la familia como el lugar donde se enseña la fe. Creemos en el avivamiento, y esperamos la venida personal y visible de Cristo, cuando los muertos en Cristo resucitarán. Habrá un juicio final y una eternidad con Dios para los que lo recibieron. El orden de los últimos tiempos queda por confirmar.",
    paraLaVida: {
      texto: "Quien espera a Cristo vive distinto hoy.",
      pregunta: "¿Qué cambiaría en tu semana si recordaras cada día que Cristo vuelve?",
    },
  },
];
