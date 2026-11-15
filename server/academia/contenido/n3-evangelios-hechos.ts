/**
 * Nivel 3 · Materia 4 — Los Evangelios y Hechos (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Profundiza lo que «Panorama del Nuevo Testamento» (Nivel 2) recorrió por encima: el propósito de cada evangelio, la
 * persona de Jesús, el reino, la cruz y la resurrección, y el avance de la iglesia en Hechos. Los relatos del Espíritu
 * en Hechos se cuentan como están escritos; la doctrina del bautismo en el Espíritu se estudia en «La persona y obra del
 * Espíritu Santo», según la declaración de fe del ministerio. Las fechas van como aproximadas.
 */
import type { LeccionContenido } from "../tipos";

export const N3_EVANGELIOS_HECHOS: LeccionContenido[] = [
  {
    id: "n3-evangelios-hechos-1",
    objetivos: [
      "Explicar qué es un evangelio y por qué hay cuatro relatos de un mismo evangelio.",
      "Distinguir los evangelios sinópticos del evangelio de Juan.",
      "Describir el propósito y el énfasis de Mateo, Marcos, Lucas y Juan.",
    ],
    paraEmpezar:
      "Cuando cuatro testigos cuentan un mismo hecho, cada uno destaca lo que vio y lo que quiere que entiendan sus oyentes. Así son los cuatro evangelios: cuatro relatos de una misma buena noticia sobre Jesús.",
    bloques: [
      { t: "subtitulo", texto: "Un evangelio, cuatro relatos" },
      {
        t: "parrafo",
        texto:
          "La palabra evangelio viene del griego euangelion, buena noticia. Por eso los títulos antiguos dicen el evangelio según Mateo, según Marcos, según Lucas y según Juan: es un solo evangelio contado por cuatro autores. Marcos empieza así: «Principio del evangelio de Jesucristo, Hijo de Dios» (Marcos 1:1).",
      },
      { t: "versiculo", ref: "Marcos 1:1" },
      { t: "versiculo", ref: "Lucas 1:1-4" },
      {
        t: "parrafo",
        texto:
          "Los evangelios se apoyan en testigos. Lucas investigó con diligencia lo que enseñaron «los que desde el principio lo vieron con sus ojos», y escribió a Teófilo «para que conozcas bien la verdad de las cosas en las cuales has sido instruido». Pedro dice que no siguieron fábulas, sino que vieron con sus propios ojos la majestad de Cristo (2 Pedro 1:16).",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=StGMC-KdehE", titulo: "El Evangelio", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "subtitulo", texto: "Los sinópticos y Juan" },
      {
        t: "parrafo",
        texto:
          "Mateo, Marcos y Lucas se llaman sinópticos, que significa que se pueden ver juntos: cuentan muchos de los mismos hechos y en un orden parecido. Muchos estudiosos piensan que Marcos se escribió primero. Juan es distinto: cuenta siete señales escogidas, largos discursos de Jesús y sus declaraciones Yo soy, y escribe con un propósito claro: «para que creyendo, tengáis vida en su nombre» (Juan 20:31).",
      },
      { t: "versiculo", ref: "Juan 20:30-31" },
      { t: "subtitulo", texto: "Cuatro retratos" },
      {
        t: "lista",
        items: [
          "Mateo, para lectores judíos: Jesús es el Mesías, el Rey prometido, que cumple las Escrituras. Repite que algo sucedió para que se cumpliese lo dicho por los profetas, y reúne la enseñanza de Jesús en cinco grandes discursos.",
          "Marcos, breve y lleno de acción: Jesús es el Hijo de Dios que vino a servir (Marcos 10:45). Una tradición antigua dice que Marcos recogió la predicación de Pedro.",
          "Lucas, para Teófilo y para los no judíos: Jesús es el Salvador de todos, que busca a los perdidos, a los pobres, a las mujeres y a los despreciados (Lucas 19:10). Destaca la oración y el Espíritu Santo, y continúa en Hechos.",
          "Juan, el más reflexivo: Jesús es el Verbo eterno hecho carne, el Hijo que revela al Padre, para que creamos y tengamos vida.",
        ],
      },
      { t: "versiculo", ref: "Mateo 1:22-23" },
      {
        t: "parrafo",
        texto:
          "Las diferencias entre los evangelios no son contradicciones: son perspectivas distintas de testigos que escogieron qué contar y cómo ordenarlo para sus lectores. Juntos dan un retrato más completo de Jesús que el que daría uno solo.",
      },
      {
        t: "nota",
        titulo: "Para enseñar los evangelios",
        texto:
          "Antes de enseñar un pasaje de un evangelio, pregunta qué quiere mostrar ese evangelista con él. El mismo milagro puede tener un acento distinto en Mateo y en Lucas, según el retrato de Jesús que cada uno pinta.",
      },
    ],
    ideaClave:
      "Los evangelios son cuatro relatos de una sola buena noticia, basados en testigos. Los sinópticos (Mateo, Marcos y Lucas) se pueden ver juntos, y Juan escribe para que creamos y tengamos vida. Cada uno pinta un retrato: el Rey prometido, el Siervo, el Salvador de todos y el Verbo hecho carne.",
    paraLaVida: {
      texto: "Lee un evangelio completo como se lee una biografía: de principio a fin, preguntando quién es Jesús.",
      pregunta: "¿Cuál de los cuatro retratos de Jesús necesitas mirar más en esta etapa de tu vida, y por qué?",
    },
  },
  {
    id: "n3-evangelios-hechos-2",
    objetivos: [
      "Explicar lo que los evangelios enseñan sobre la encarnación y el nacimiento virginal de Jesús.",
      "Mostrar en los evangelios que Jesús es verdadero Dios y verdadero hombre.",
      "Explicar los títulos Cristo, Hijo de Dios e Hijo del Hombre, y la confesión de Pedro.",
    ],
    paraEmpezar:
      "En Cesarea de Filipo, Jesús hizo la pregunta más importante que una persona puede responder: «Y vosotros, ¿quién decís que soy yo?». Los evangelios se escribieron para que respondamos bien.",
    bloques: [
      { t: "versiculo", ref: "Mateo 16:15-16" },
      {
        t: "parrafo",
        texto:
          "Pedro respondió: «Tú eres el Cristo, el Hijo del Dios viviente». Jesús le dijo que no se lo había revelado carne ni sangre, sino el Padre (Mateo 16:17). Es la confesión central de la fe, y el versículo de memoria de esta materia.",
      },
      { t: "subtitulo", texto: "El Verbo se hizo carne" },
      { t: "versiculo", ref: "Juan 1:1" },
      { t: "versiculo", ref: "Juan 1:14" },
      {
        t: "parrafo",
        texto:
          "Juan empieza antes de Belén: «En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios». Ese Verbo eterno «fue hecho carne, y habitó entre nosotros». No dejó de ser Dios al hacerse hombre: tomó una naturaleza humana completa.",
      },
      { t: "versiculo", ref: "Lucas 1:35" },
      {
        t: "parrafo",
        texto:
          "Mateo y Lucas cuentan que Jesús fue concebido por el Espíritu Santo en el vientre de María, una virgen: «el Santo Ser que nacerá, será llamado Hijo de Dios». Mateo ve allí el cumplimiento de Isaías: su nombre sería Emanuel, «que traducido es: Dios con nosotros» (Mateo 1:23).",
      },
      { t: "versiculo", ref: "Mateo 1:23" },
      { t: "video", url: "https://www.youtube.com/watch?v=DTL5QW6Ez7s", titulo: "El nacimiento de Jesús: Lucas 1 y 2", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "subtitulo", texto: "Verdadero hombre" },
      {
        t: "parrafo",
        texto:
          "Los evangelios muestran a Jesús con hambre y sed, cansado del camino (Juan 4:6), llorando ante la tumba de su amigo (Juan 11:35) y angustiado en Getsemaní. Fue tentado en todo como nosotros, pero sin pecado (Hebreos 4:15). Por eso puede compadecerse de nuestras debilidades.",
      },
      { t: "versiculo", ref: "Hebreos 4:15" },
      { t: "subtitulo", texto: "Verdadero Dios" },
      { t: "versiculo", ref: "Marcos 2:5-7" },
      {
        t: "parrafo",
        texto:
          "Al mismo tiempo, Jesús hizo lo que solo Dios puede hacer. Al paralítico le dijo: «Hijo, tus pecados te son perdonados», y los escribas entendieron que eso solo lo hace Dios. Calmó el mar con una palabra, recibió adoración y dijo: «Antes que Abraham fuese, yo soy» (Juan 8:58), usando el nombre con que Dios se reveló a Moisés.",
      },
      { t: "versiculo", ref: "Juan 8:58" },
      { t: "subtitulo", texto: "Sus títulos" },
      {
        t: "lista",
        items: [
          "Cristo: en griego, como Mesías en hebreo, significa el Ungido, el Rey prometido de la descendencia de David.",
          "Hijo de Dios: en el bautismo, el Padre dijo: Este es mi Hijo amado, en quien tengo complacencia (Mateo 3:17).",
          "Hijo del Hombre: el título que Jesús más usó para sí mismo; recuerda la visión de Daniel 7:13-14, en la que uno como un hijo de hombre recibe un reino eterno (Marcos 14:61-62).",
          "Señor: el que tiene autoridad sobre todo, al que sus discípulos obedecen y adoran.",
        ],
      },
      {
        t: "nota",
        titulo: "Las dos cosas a la vez",
        texto:
          "La iglesia confiesa que Jesús es verdadero Dios y verdadero hombre en una sola persona. Si no fuera Dios, no podría salvarnos; si no fuera hombre, no podría tomar nuestro lugar. Los evangelios sostienen las dos verdades juntas.",
      },
    ],
    ideaClave:
      "Los evangelios muestran que Jesús es el Verbo eterno hecho carne, concebido por el Espíritu en una virgen: verdadero hombre, que tuvo hambre, se cansó y lloró, y verdadero Dios, que perdona pecados y dice Yo soy. Es el Cristo, el Hijo del Dios viviente, como confesó Pedro.",
    paraLaVida: {
      texto: "La respuesta a quién es Jesús no es solo una idea: decide toda la vida.",
      pregunta: "Si Jesús te preguntara hoy quién dices que es él, ¿qué le responderías con tus palabras?",
    },
  },
  {
    id: "n3-evangelios-hechos-3",
    objetivos: [
      "Explicar el anuncio del reino de Dios en la predicación de Jesús.",
      "Mostrar cómo los milagros y las parábolas revelan el reino que ya llegó y que todavía vendrá.",
      "Describir el llamado de Jesús a seguirlo y las señales y los Yo soy de Juan.",
    ],
    paraEmpezar:
      "Jesús no comenzó su ministerio con una lista de reglas, sino con una noticia: el reino de Dios se había acercado. Todo lo que dijo e hizo después explica qué significa esa noticia.",
    bloques: [
      { t: "versiculo", ref: "Marcos 1:14-15" },
      {
        t: "parrafo",
        texto:
          "Jesús predicaba: «El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio». El reino de Dios es el reinado de Dios: su gobierno que llega para salvar, sanar y restaurar lo que el pecado había roto. Llega en la persona de Jesús.",
      },
      { t: "subtitulo", texto: "El reino en obras" },
      { t: "versiculo", ref: "Lucas 11:20" },
      {
        t: "parrafo",
        texto:
          "Los milagros de Jesús eran señales del reino. Cuando echaba fuera demonios, decía: «ciertamente el reino de Dios ha llegado a vosotros». A Juan el Bautista le mandó decir lo que se veía: los ciegos ven, los cojos andan, los leprosos son limpiados, los muertos son resucitados y a los pobres se les anuncia el evangelio (Mateo 11:4-5), como lo había anunciado Isaías.",
      },
      { t: "versiculo", ref: "Mateo 11:4-5" },
      { t: "subtitulo", texto: "El reino en palabras" },
      {
        t: "parrafo",
        texto:
          "Las parábolas del reino enseñan cómo es: crece desde algo pequeño, como la semilla de mostaza; transforma desde dentro, como la levadura (Mateo 13:31-33); vale más que todo, como el tesoro escondido (13:44). El reino ya llegó con Jesús, pero todavía no en su plenitud: por eso oramos «Venga tu reino» (Mateo 6:10). Los estudiosos lo resumen así: el reino ya está aquí, y todavía no del todo.",
      },
      { t: "versiculo", ref: "Mateo 6:10" },
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "Seguir a Jesús" },
      { t: "versiculo", ref: "Marcos 8:34" },
      {
        t: "parrafo",
        texto:
          "Entrar al reino es seguir al Rey: «Si alguno quiere venir en pos de mí, niéguese a sí mismo, y tome su cruz, y sígame». Jesús llamó a doce para que estuvieran con él y para enviarlos a predicar (Marcos 3:14). El discipulado no es un curso, sino una vida con Jesús.",
      },
      { t: "subtitulo", texto: "Las señales y los Yo soy de Juan" },
      {
        t: "lista",
        items: [
          "Siete señales: el agua convertida en vino, la sanidad del hijo del oficial, el paralítico de Betesda, la multiplicación de los panes, Jesús andando sobre el mar, el ciego de nacimiento y la resurrección de Lázaro.",
          "Siete Yo soy: el pan de vida (6:35), la luz del mundo (8:12), la puerta (10:9), el buen pastor (10:11), la resurrección y la vida (11:25), el camino, la verdad y la vida (14:6) y la vid verdadera (15:1).",
        ],
      },
      { t: "versiculo", ref: "Juan 14:6" },
      {
        t: "nota",
        titulo: "El reino hoy",
        texto:
          "La iglesia sigue anunciando el reino con palabras y obras: predica el evangelio, ora por los enfermos, sirve a los pobres y vive bajo el gobierno de Cristo, mientras espera su venida.",
      },
    ],
    ideaClave:
      "Jesús anunció que el reino de Dios se había acercado: el gobierno de Dios que salva y restaura llegó en su persona. Sus milagros y sus parábolas muestran ese reino, que ya está aquí y todavía no en su plenitud. Entrar en él es seguir al Rey, que en Juan se revela con sus señales y sus Yo soy.",
    paraLaVida: {
      texto: "Orar venga tu reino es pedir que el gobierno de Dios llegue también a tu casa, tu trabajo y tu barrio.",
      pregunta: "¿En qué área de tu vida necesitas negarte a ti mismo, tomar tu cruz y seguir a Jesús esta semana?",
    },
  },
  {
    id: "n3-evangelios-hechos-4",
    objetivos: [
      "Explicar por qué los evangelios dedican tanto espacio a la última semana de Jesús.",
      "Explicar el sentido de la muerte de Jesús: rescate, nuevo pacto y obra consumada.",
      "Describir los testimonios de la resurrección y la gran comisión.",
    ],
    paraEmpezar:
      "Una biografía común dedica a la muerte de su personaje unas pocas páginas. Los evangelios dedican a la última semana de Jesús casi un tercio de su relato. Allí está el centro del evangelio.",
    bloques: [
      { t: "versiculo", ref: "Marcos 8:31" },
      {
        t: "parrafo",
        texto:
          "Jesús anunció varias veces que le era necesario padecer, ser muerto y resucitar al tercer día. Su muerte no fue un accidente ni una derrota: fue el propósito de su venida. Él mismo lo explicó: «el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos» (Marcos 10:45).",
      },
      { t: "versiculo", ref: "Marcos 10:45" },
      { t: "subtitulo", texto: "La cena y el nuevo pacto" },
      { t: "versiculo", ref: "Lucas 22:19-20" },
      {
        t: "parrafo",
        texto:
          "En la última cena, durante la Pascua, Jesús tomó el pan y la copa y les dio un sentido nuevo: «Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama». Su muerte inauguraba el nuevo pacto que habían anunciado los profetas (Jeremías 31:31-34).",
      },
      { t: "subtitulo", texto: "La cruz" },
      { t: "versiculo", ref: "Juan 19:30" },
      {
        t: "parrafo",
        texto:
          "Jesús murió en una cruz romana, condenado aunque era inocente. Antes de entregar el espíritu dijo: «Consumado es». La obra de salvación estaba completa. Marcos cuenta que «el velo del templo se rasgó en dos, de arriba abajo» (Marcos 15:38): el camino a la presencia de Dios quedaba abierto. Los evangelios ven en la cruz el cumplimiento de Isaías 53: él llevó el pecado de muchos.",
      },
      { t: "versiculo", ref: "Marcos 15:38" },
      { t: "video", url: "https://www.youtube.com/watch?v=KBE2nLYyCdc", titulo: "Evangelio de Lucas 19 a 23", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "La resurrección" },
      { t: "versiculo", ref: "1 Corintios 15:3-6" },
      {
        t: "parrafo",
        texto:
          "El primer día de la semana, las mujeres encontraron la tumba vacía, y el Señor resucitado se apareció a ellas y a los discípulos. Pablo transmite una lista antigua de testigos: Cefas, los doce y después «más de quinientos hermanos a la vez», muchos de los cuales todavía vivían cuando él escribió. Los discípulos, que habían huido con miedo, se convirtieron en testigos valientes que dieron su vida por anunciarlo.",
      },
      { t: "subtitulo", texto: "La gran comisión" },
      { t: "versiculo", ref: "Mateo 28:18-20" },
      {
        t: "parrafo",
        texto:
          "El Resucitado dijo: «Toda potestad me es dada en el cielo y en la tierra», y envió a sus discípulos a hacer discípulos de todas las naciones, bautizándolos y enseñándoles, con la promesa de estar con ellos todos los días. Después ascendió al cielo, y los ángeles anunciaron que volverá de la misma manera (Hechos 1:9-11).",
      },
      {
        t: "nota",
        titulo: "El centro del mensaje",
        texto:
          "Pablo dice que de primera importancia es que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día, conforme a las Escrituras (1 Corintios 15:3-4). Toda enseñanza de los evangelios conduce a la cruz y a la tumba vacía.",
      },
    ],
    ideaClave:
      "Los evangelios dedican casi un tercio de su relato a la última semana de Jesús, porque su muerte fue el propósito de su venida: dar su vida en rescate e inaugurar el nuevo pacto en su sangre. La obra quedó consumada, y la resurrección, confirmada por muchos testigos, envía a la iglesia a hacer discípulos de todas las naciones.",
    paraLaVida: {
      texto: "Cada vez que participas de la Santa Cena, anuncias la muerte del Señor hasta que él venga.",
      pregunta: "¿Qué cambia en tu manera de vivir saber que Jesús dio su vida en rescate por ti y que resucitó?",
    },
  },
  {
    id: "n3-evangelios-hechos-5",
    objetivos: [
      "Explicar cómo Hechos 1:8 resume el plan del libro.",
      "Describir el día de Pentecostés, el sermón de Pedro y la vida de la primera iglesia.",
      "Describir cómo el evangelio llegó a Samaria y a los gentiles, y el nacimiento de la iglesia en Antioquía.",
    ],
    paraEmpezar:
      "Hechos es la segunda parte de la obra de Lucas. Si el evangelio cuenta lo que Jesús comenzó a hacer y a enseñar (Hechos 1:1), Hechos cuenta lo que siguió haciendo por medio de su Espíritu y de su iglesia.",
    bloques: [
      { t: "versiculo", ref: "Hechos 1:8" },
      {
        t: "parrafo",
        texto:
          "Antes de ascender, Jesús prometió el poder del Espíritu Santo para ser sus testigos «en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra». Ese versículo es el plan del libro: Jerusalén (capítulos 1 al 7), Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28).",
      },
      { t: "subtitulo", texto: "Pentecostés" },
      { t: "versiculo", ref: "Hechos 2:1-4" },
      {
        t: "parrafo",
        texto:
          "En la fiesta de Pentecostés, cincuenta días después de la Pascua, el Espíritu vino con un estruendo como de viento y lenguas como de fuego, y «fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas». Pedro explicó que se cumplía la profecía de Joel: «Derramaré de mi Espíritu sobre toda carne» (Hechos 2:17).",
      },
      { t: "versiculo", ref: "Hechos 2:16-17" },
      { t: "versiculo", ref: "Hechos 2:38" },
      {
        t: "parrafo",
        texto:
          "Pedro predicó a Cristo crucificado y resucitado, y llamó a la multitud: «Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados». Ese día se añadieron como tres mil personas (Hechos 2:41). La doctrina del bautismo en el Espíritu se estudia en la materia La persona y obra del Espíritu Santo.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "subtitulo", texto: "La primera iglesia" },
      { t: "versiculo", ref: "Hechos 2:42" },
      {
        t: "parrafo",
        texto:
          "Los creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». Compartían sus bienes con los necesitados y el Señor añadía cada día a los que habían de ser salvos. Ante las amenazas, Pedro y Juan dijeron: «no podemos dejar de decir lo que hemos visto y oído» (Hechos 4:20).",
      },
      { t: "versiculo", ref: "Hechos 4:20" },
      { t: "subtitulo", texto: "Samaria, Saulo y los gentiles" },
      {
        t: "parrafo",
        texto:
          "La persecución que siguió a la muerte de Esteban esparció a los creyentes, que «iban por todas partes anunciando el evangelio» (Hechos 8:4). Felipe predicó en Samaria y al etíope. Saulo, el perseguidor, se encontró con Jesús en el camino a Damasco (Hechos 9). En casa de Cornelio, un centurión romano, Pedro entendió que «Dios no hace acepción de personas» (Hechos 10:34), y el Espíritu Santo cayó sobre los gentiles que oían.",
      },
      { t: "versiculo", ref: "Hechos 8:4" },
      { t: "versiculo", ref: "Hechos 10:34-35" },
      { t: "versiculo", ref: "Hechos 11:26" },
      {
        t: "parrafo",
        texto:
          "En Antioquía de Siria nació una iglesia de judíos y gentiles. Bernabé y Saulo la enseñaron un año entero, y allí «a los discípulos se les llamó cristianos por primera vez». Esa iglesia sería la base de las misiones.",
      },
      {
        t: "nota",
        titulo: "El protagonista de Hechos",
        texto:
          "Hechos se suele llamar Hechos de los Apóstoles, pero muchos maestros dicen que podría llamarse Hechos del Espíritu Santo: es él quien da poder, guía, envía y abre puertas en cada etapa.",
      },
    ],
    ideaClave:
      "Hechos 1:8 es el plan del libro: testigos en Jerusalén, Judea, Samaria y hasta lo último de la tierra, con el poder del Espíritu. En Pentecostés el Espíritu fue derramado, Pedro predicó y nació la iglesia, que perseveraba en la doctrina, la comunión, el partimiento del pan y la oración; la persecución la esparció, y el evangelio llegó a Samaria, a los gentiles y a Antioquía.",
    paraLaVida: {
      texto: "La misma promesa de poder para ser testigos es para la iglesia de hoy.",
      pregunta: "¿Cuál de las cuatro marcas de la primera iglesia (Hechos 2:42) necesitas fortalecer en tu vida?",
    },
  },
  {
    id: "n3-evangelios-hechos-6",
    objetivos: [
      "Describir los viajes misioneros de Pablo y sus principales ciudades.",
      "Explicar la decisión del concilio de Jerusalén sobre la salvación de los gentiles.",
      "Explicar por qué Hechos termina en Roma con un final abierto que continúa en la iglesia.",
    ],
    paraEmpezar:
      "La segunda mitad de Hechos sigue a Pablo por caminos, mares, cárceles y tribunales, hasta la capital del imperio. Es la historia de cómo el evangelio cruzó fronteras que parecían imposibles.",
    bloques: [
      { t: "subtitulo", texto: "Los viajes de Pablo" },
      {
        t: "lista",
        items: [
          "Primer viaje (Hechos 13 y 14): con Bernabé, desde Antioquía a Chipre y a las ciudades de Galacia, como Antioquía de Pisidia, Iconio, Listra y Derbe.",
          "Segundo viaje (Hechos 15:36 a 18:22): con Silas, y después Timoteo y Lucas; cruzan a Europa: Filipos, Tesalónica, Berea, Atenas y Corinto.",
          "Tercer viaje (Hechos 18:23 a 21:16): casi tres años en Éfeso y la despedida de los ancianos en Mileto.",
          "El viaje a Roma (Hechos 27 y 28): preso, después de los juicios ante Félix, Festo y Agripa, con un naufragio en Malta.",
        ],
      },
      { t: "subtitulo", texto: "El concilio de Jerusalén" },
      { t: "versiculo", ref: "Hechos 15:11" },
      {
        t: "parrafo",
        texto:
          "Hacia el año 49, algunos enseñaban que los gentiles debían circuncidarse y guardar la ley de Moisés para ser salvos. Los apóstoles y los ancianos se reunieron en Jerusalén, y Pedro concluyó: «Antes creemos que por la gracia del Señor Jesús seremos salvos, de igual modo que ellos». La salvación es por gracia, para judíos y gentiles por igual, y la iglesia lo resolvió escuchando la Escritura y al Espíritu.",
      },
      { t: "subtitulo", texto: "Puertas que Dios abre" },
      { t: "versiculo", ref: "Hechos 16:9" },
      {
        t: "parrafo",
        texto:
          "En el segundo viaje, Pablo vio en visión a un varón macedonio que le rogaba: «Pasa a Macedonia y ayúdanos». Así el evangelio llegó a Europa. En Filipos, el carcelero preguntó qué debía hacer para ser salvo, y la respuesta fue: «Cree en el Señor Jesucristo, y serás salvo, tú y tu casa» (Hechos 16:31). En Atenas, Pablo partió de un altar dedicado al dios no conocido para anunciar al Dios creador y a Cristo resucitado (Hechos 17:22-31).",
      },
      { t: "versiculo", ref: "Hechos 16:31" },
      { t: "versiculo", ref: "Hechos 20:24" },
      {
        t: "parrafo",
        texto:
          "Al despedirse de los ancianos de Éfeso, Pablo resumió su vida: «ni estimo preciosa mi vida para mí mismo, con tal que acabe mi carrera con gozo, y el ministerio que recibí del Señor Jesús». Después fue arrestado en Jerusalén y, como ciudadano romano, apeló al César.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=jWG-433qdWM", titulo: "Hechos 21 a 28", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "subtitulo", texto: "Un final abierto" },
      { t: "versiculo", ref: "Hechos 28:30-31" },
      {
        t: "parrafo",
        texto:
          "Hechos termina con Pablo preso en una casa alquilada en Roma, recibiendo a todos, «predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento». No cuenta cómo terminó la vida de Pablo: el libro queda abierto, porque la misión sigue. Cada generación de la iglesia escribe el capítulo siguiente.",
      },
      {
        t: "nota",
        titulo: "Hechos y la misión de hoy",
        texto:
          "Hechos describe una iglesia que ora, obedece al Espíritu, cruza fronteras, sufre con gozo y resuelve sus conflictos con la Palabra. Al estudiarlo, pregunta qué principios de esa misión siguen vigentes para tu iglesia.",
      },
    ],
    ideaClave:
      "En Hechos 13 al 28 el evangelio llega hasta lo último de la tierra: los tres viajes de Pablo lo llevan a Galacia, a Europa y a Éfeso; el concilio de Jerusalén afirma que judíos y gentiles se salvan por la gracia del Señor Jesús, y el libro termina en Roma con el evangelio anunciado sin impedimento y una misión que sigue abierta.",
    paraLaVida: {
      texto: "Como Pablo, cada creyente tiene una carrera que terminar y un ministerio que recibió del Señor.",
      pregunta: "¿Qué frontera (de lugar, de cultura o de miedo) te está pidiendo el Señor que cruces para anunciar el evangelio?",
    },
  },
];
