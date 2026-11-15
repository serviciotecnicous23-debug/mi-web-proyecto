/**
 * Especialidad Alabanza y adoración · Materia 4 — La música en la historia de la iglesia (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * La música en Israel, en Jesús y la iglesia de los primeros siglos (la carta de Plinio, del año 112), la iglesia antigua
 * y medieval (Ambrosio, el canto llano y la Regla de san Benito), la Reforma (Lutero y el Salterio de Ginebra, 1562),
 * los himnos de los avivamientos (Watts, Charles Wesley, Fanny Crosby, Sankey y Juan Bautista Cabrera) y el
 * avivamiento de la calle Azusa (1906) y la alabanza de hoy. Datos comprobados en González y en Burkholder, Grout y
 * Palisca; las cifras de himnos, que varían según las fuentes, se dicen sin números exactos.
 */
import type { LeccionContenido } from "../tipos";

export const ALABANZA_4: LeccionContenido[] = [
  {
    id: "alabanza-4-1",
    objetivos: [
      "Describir el lugar de la música en la adoración de Israel.",
      "Reconocer los cánticos de Moisés y de María después del mar Rojo.",
      "Relacionar los avivamientos de Israel con la vuelta de la alabanza.",
    ],
    paraEmpezar: "La historia de la música de la iglesia empieza mucho antes de la iglesia: en un pueblo que cantó a Dios después de ser librado.",
    bloques: [
      { t: "versiculo", ref: "Éxodo 15:1-2" },
      {
        t: "parrafo",
        texto:
          "Después de cruzar el mar Rojo, «cantó Moisés y los hijos de Israel este cántico a Jehová». Es uno de los primeros cánticos de la Biblia, y celebra la salvación: «Jehová es mi fortaleza y mi cántico, Y ha sido mi salvación». El pueblo de Dios canta porque Dios lo salvó.",
      },
      { t: "versiculo", ref: "Éxodo 15:20-21" },
      {
        t: "parrafo",
        texto:
          "Entonces «María la profetisa, hermana de Aarón, tomó un pandero en su mano, y todas las mujeres salieron en pos de ella con panderos y danzas». La alabanza de Israel unía la voz, los instrumentos y la danza.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=y9pED55wMM4", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Salmos 150:3-6" },
      {
        t: "parrafo",
        texto:
          "El último salmo es una invitación a alabar con todo: «Alabadle a son de bocina; Alabadle con salterio y arpa», con pandero, cuerdas, flautas y címbalos, y termina: «Todo lo que respira alabe a JAH».",
      },
      { t: "subtitulo", texto: "Los avivamientos de Israel" },
      { t: "versiculo", ref: "2 Crónicas 29:27-28" },
      {
        t: "parrafo",
        texto:
          "Después de años de abandono, el rey Ezequías purificó el templo y restauró el culto. Cuando se ofreció el holocausto, «comenzó también el cántico de Jehová, con las trompetas y los instrumentos de David rey de Israel», y «toda la multitud adoraba, y los cantores cantaban». Cuando el pueblo volvía a Dios, volvía la alabanza.",
      },
      { t: "subtitulo", texto: "También se canta el dolor" },
      { t: "versiculo", ref: "Salmos 137:1-4" },
      {
        t: "parrafo",
        texto:
          "En el exilio, el pueblo lloraba junto a los ríos de Babilonia: «Sobre los sauces en medio de ella Colgamos nuestras arpas», y se preguntaba: «¿Cómo cantaremos cántico de Jehová En tierra de extraños?». Los salmos guardan también los cantos del dolor.",
      },
      {
        t: "lista",
        items: [
          "Israel cantaba las obras de Dios, sobre todo su salvación.",
          "Cantaba todo el pueblo, con voces, instrumentos y danza.",
          "Hubo músicos apartados y organizados para el templo.",
          "Los avivamientos trajeron de vuelta la alabanza.",
          "También se cantaba el dolor, sin dejar de mirar a Dios.",
        ],
      },
    ],
    ideaClave:
      "La música de la iglesia tiene raíces en Israel: después del mar Rojo cantaron Moisés y el pueblo, y María con las mujeres, con panderos y danzas. Los salmos invitan a alabar con todo lo que respira. Cuando Ezequías restauró el culto, volvió el cántico de Jehová, y en el exilio el pueblo también cantó su dolor.",
    paraLaVida: {
      texto: "Cantamos porque Dios nos salvó, como Israel junto al mar.",
      pregunta: "¿Qué obra de Dios en tu vida podrías convertir hoy en un canto de gratitud?",
    },
  },
  {
    id: "alabanza-4-2",
    objetivos: [
      "Explicar cómo cantaban Jesús y los apóstoles.",
      "Describir el testimonio de la carta de Plinio sobre el canto de los primeros cristianos.",
      "Reconocer los cantos sobre Cristo en el Nuevo Testamento.",
    ],
    paraEmpezar: "Jesús cantó. Los apóstoles cantaron. Y los primeros cristianos eran conocidos, incluso por sus perseguidores, porque cantaban a Cristo.",
    bloques: [
      { t: "versiculo", ref: "Mateo 26:30" },
      {
        t: "parrafo",
        texto:
          "La noche en que fue entregado, después de la Cena, Jesús cantó con sus discípulos: «Y cuando hubieron cantado el himno, salieron al monte de los Olivos». La Biblia no dice qué himno era; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Efesios 5:19" },
      {
        t: "parrafo",
        texto:
          "Las cartas de Pablo muestran a una iglesia que canta: «hablando entre vosotros con salmos, con himnos y cánticos espirituales, cantando y alabando al Señor en vuestros corazones». Cantaban los salmos de Israel y también cantos nuevos sobre Cristo.",
      },
      { t: "versiculo", ref: "Filipenses 2:10-11" },
      {
        t: "parrafo",
        texto:
          "Muchos estudiosos piensan que Filipenses 2:6-11 era un himno que los primeros cristianos cantaban sobre Cristo, que se humilló hasta la cruz y fue exaltado, y que termina: «y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre».",
      },
      { t: "subtitulo", texto: "Un testigo de afuera: la carta de Plinio" },
      {
        t: "parrafo",
        texto:
          "Hacia el año 112, Plinio el Joven, gobernador romano de Bitinia, le escribió al emperador Trajano sobre los cristianos que interrogaba. Le contó que se reunían un día fijo antes del amanecer para cantar, a coros, un himno a Cristo como a un dios. Es uno de los testimonios no cristianos más antiguos sobre la iglesia, y muestra que adoraban a Cristo con cantos.",
      },
      {
        t: "lista",
        items: [
          "Cantaban los salmos de Israel.",
          "Cantaban himnos nuevos sobre Cristo y su obra.",
          "Se reunían en las casas, y a veces antes del amanecer.",
          "Cantaban aun en la persecución, como Pablo y Silas en la cárcel (Hechos 16:25).",
        ],
      },
    ],
    ideaClave:
      "Jesús cantó un himno con sus discípulos antes de ir al monte de los Olivos. La primera iglesia cantaba salmos, himnos y cánticos espirituales, también himnos sobre Cristo, como el que muchos ven en Filipenses 2. Hacia el año 112, Plinio el Joven contó que los cristianos se reunían antes del amanecer para cantar un himno a Cristo como a un dios.",
    paraLaVida: {
      texto: "Los primeros cristianos eran conocidos por cantarle a Cristo.",
      pregunta: "Si alguien de afuera describiera tu adoración, ¿qué diría de lo que cantas?",
    },
  },
  {
    id: "alabanza-4-3",
    objetivos: [
      "Describir el canto de la iglesia antigua y medieval.",
      "Explicar por qué el pueblo dejó de cantar en muchas iglesias.",
      "Valorar lo que esos siglos dejaron a la iglesia.",
    ],
    paraEmpezar: "Con los siglos, el canto de la iglesia cambió mucho: nacieron himnos que todavía se cantan, pero el pueblo fue quedando cada vez más callado.",
    bloques: [
      { t: "subtitulo", texto: "Ambrosio y los himnos del pueblo" },
      {
        t: "parrafo",
        texto:
          "En el siglo IV, Ambrosio, obispo de Milán, escribió himnos para que el pueblo cantara. Agustín de Hipona cuenta en sus Confesiones que, recién convertido, lloró de emoción al oír los himnos y los cantos de la iglesia de Milán.",
      },
      { t: "subtitulo", texto: "Los monasterios y el canto llano" },
      {
        t: "parrafo",
        texto:
          "En los monasterios, el canto de los salmos ocupaba el día. La Regla de san Benito, del siglo VI, pedía cantar los 150 salmos cada semana. Así nació el canto llano, una melodía sin acompañamiento que la tradición asocia con el papa Gregorio Magno (590-604), y por eso se lo llama canto gregoriano.",
      },
      { t: "subtitulo", texto: "Un pueblo que solo escuchaba" },
      {
        t: "parrafo",
        texto:
          "Con el tiempo, el culto de la iglesia de Occidente se celebró en latín, una lengua que la mayoría del pueblo ya no entendía, y el canto quedó sobre todo en manos de los clérigos, los monjes y los coros. El pueblo fue quedando como espectador.",
      },
      { t: "versiculo", ref: "1 Corintios 14:16" },
      {
        t: "parrafo",
        texto:
          "Pablo ya había advertido ese problema: si se bendice en una lengua que el oyente no entiende, «¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho». La adoración tiene que poder entenderse para que todo el pueblo participe.",
      },
      {
        t: "nota",
        titulo: "Lo que dejaron esos siglos",
        texto:
          "Esos siglos también dejaron riquezas: el amor por los salmos, el cuidado de la música y himnos antiguos que se siguen cantando traducidos. La lección no es despreciar el pasado, sino recordar que la adoración es de todo el pueblo.",
      },
      {
        t: "lista",
        items: [
          "Ambrosio escribió himnos para que el pueblo cantara.",
          "Los monasterios guardaron el canto de los salmos.",
          "El canto llano o gregoriano se cantaba en latín y sin acompañamiento.",
          "El pueblo, que no entendía el latín, fue cantando cada vez menos.",
        ],
      },
    ],
    ideaClave:
      "En el siglo IV, Ambrosio escribió himnos para el pueblo, y Agustín lloró al oírlos en Milán. Los monasterios guardaron el canto de los salmos, y nació el canto llano que la tradición asocia con Gregorio Magno. Pero el culto en latín, que el pueblo no entendía, lo fue dejando callado: Pablo ya había advertido que sin entendimiento nadie puede decir el amén.",
    paraLaVida: {
      texto: "Una iglesia puede tener una música hermosa y un pueblo que no canta.",
      pregunta: "¿Hay algo en tu iglesia que convierte al pueblo en espectador en lugar de adorador?",
    },
  },
  {
    id: "alabanza-4-4",
    objetivos: [
      "Explicar el aporte de Lutero al canto congregacional.",
      "Describir el Salterio de Ginebra.",
      "Relacionar la Reforma con el principio de cantar con entendimiento.",
    ],
    paraEmpezar: "En el siglo XVI, la Reforma no solo devolvió la Biblia al pueblo en su lengua: también le devolvió el canto.",
    bloques: [
      { t: "subtitulo", texto: "Martín Lutero" },
      {
        t: "parrafo",
        texto:
          "Martín Lutero (1483-1546) quería que el pueblo cantara en su propia lengua. Escribió himnos en alemán con melodías que la gente podía aprender. El más conocido es Castillo fuerte es nuestro Dios, basado en el Salmo 46.",
      },
      { t: "versiculo", ref: "Salmos 46:1" },
      {
        t: "parrafo",
        texto: "El salmo dice: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones». Cantarlo en la lengua del pueblo era poner la Palabra en la boca de todos.",
      },
      { t: "subtitulo", texto: "Juan Calvino y el Salterio de Ginebra" },
      {
        t: "parrafo",
        texto:
          "Juan Calvino (1509-1564) impulsó en Ginebra el canto de los salmos en francés, puestos en verso para que el pueblo los cantara. En 1562 se completó el Salterio de Ginebra, con los 150 salmos en verso, sobre todo del poeta Clemente Marot y del teólogo Teodoro de Beza. Se imprimió en grandes cantidades y marcó a las iglesias reformadas.",
      },
      { t: "subtitulo", texto: "Cantar con entendimiento" },
      { t: "versiculo", ref: "1 Corintios 14:15" },
      {
        t: "parrafo",
        texto:
          "El principio de los reformadores estaba en la Biblia: «cantaré con el espíritu, pero cantaré también con el entendimiento». Si el pueblo entiende lo que canta, la Palabra lo enseña y lo forma.",
      },
      { t: "versiculo", ref: "Colosenses 3:16" },
      {
        t: "parrafo",
        texto: "Por eso cuidaban la letra de los cantos: querían que «La palabra de Cristo more en abundancia» en el pueblo, enseñándose y exhortándose unos a otros al cantar.",
      },
      {
        t: "lista",
        items: [
          "El canto de toda la congregación, no solo del coro.",
          "Cantos en la lengua del pueblo.",
          "Himnos y salmos llenos de la Palabra y de doctrina.",
          "Melodías que el pueblo podía aprender y cantar.",
        ],
      },
    ],
    ideaClave:
      "La Reforma devolvió el canto al pueblo. Lutero escribió himnos en alemán, como Castillo fuerte es nuestro Dios, basado en el Salmo 46, y Calvino impulsó el canto de los salmos en francés: en 1562 se completó el Salterio de Ginebra con los 150 salmos en verso. Su principio era bíblico: cantar con el espíritu y también con el entendimiento.",
    paraLaVida: {
      texto: "Cada vez que tu iglesia canta en su lengua, disfruta de algo que costó una Reforma.",
      pregunta: "¿Qué salmo te gustaría que tu iglesia aprendiera a cantar?",
    },
  },
  {
    id: "alabanza-4-5",
    objetivos: [
      "Reconocer a los grandes autores de himnos de los avivamientos.",
      "Explicar cómo los himnos enseñaron la fe al pueblo.",
      "Describir el comienzo de los himnos evangélicos en español.",
    ],
    paraEmpezar: "Muchos de los himnos que todavía se cantan nacieron en los avivamientos de los siglos XVIII y XIX, cuando miles de personas llegaban a la fe.",
    bloques: [
      { t: "subtitulo", texto: "Isaac Watts y Charles Wesley" },
      {
        t: "parrafo",
        texto:
          "En Inglaterra, Isaac Watts (1674-1748) escribió cientos de himnos, además de salmos en verso, y ayudó a que las iglesias cantaran himnos nuevos sobre Cristo. Durante el avivamiento metodista, Charles Wesley (1707-1788), hermano de Juan Wesley, escribió miles de himnos: con ellos, la gente sencilla aprendía la fe cantando.",
      },
      { t: "subtitulo", texto: "Fanny Crosby y Ira Sankey" },
      {
        t: "parrafo",
        texto:
          "En los Estados Unidos, Fanny Crosby (1820-1915), ciega desde muy pequeña, escribió miles de himnos. Ira D. Sankey (1840-1908) cantaba en las campañas del evangelista D. L. Moody, y sus cantos se difundieron por todo el mundo.",
      },
      { t: "versiculo", ref: "Salmos 40:3" },
      {
        t: "parrafo",
        texto:
          "Los avivamientos traían cantos nuevos, como dice el salmo: «Puso luego en mi boca cántico nuevo, alabanza a nuestro Dios. Verán esto muchos, y temerán, Y confiarán en Jehová». Los himnos también fueron una forma de evangelizar.",
      },
      { t: "subtitulo", texto: "Los himnos en español" },
      {
        t: "parrafo",
        texto:
          "En español, uno de los primeros grandes autores y traductores de himnos evangélicos fue Juan Bautista Cabrera (1837-1916), el primer obispo protestante de España. Entre sus traducciones está Santo, santo, santo, el himno que el inglés Reginald Heber escribió en 1826.",
      },
      {
        t: "lista",
        items: [
          "Los himnos estaban llenos de la Palabra y de la obra de Cristo en la cruz.",
          "Hablaban de la fe personal y de la vida cristiana.",
          "Enseñaban doctrina a gente que muchas veces no sabía leer.",
          "Servían para evangelizar en las campañas y en las calles.",
        ],
      },
    ],
    ideaClave:
      "Los avivamientos trajeron himnos nuevos: Isaac Watts escribió cientos, Charles Wesley miles en el avivamiento metodista, y Fanny Crosby, ciega desde muy pequeña, miles más; Ira Sankey los cantó en las campañas de Moody. En español, Juan Bautista Cabrera, el primer obispo protestante de España, escribió y tradujo himnos como Santo, santo, santo.",
    paraLaVida: {
      texto: "Un buen himno es teología que se puede cantar.",
      pregunta: "¿Qué himno antiguo te enseñó algo de Dios que todavía recuerdas?",
    },
  },
  {
    id: "alabanza-4-6",
    objetivos: [
      "Describir el avivamiento de la calle Azusa y su influencia en la alabanza.",
      "Explicar el surgimiento de la alabanza contemporánea en español.",
      "Evaluar la alabanza de hoy a la luz de la historia y de la Palabra.",
    ],
    paraEmpezar: "La historia sigue: en el siglo XX nacieron nuevas maneras de cantar, y cada generación tiene la tarea de cantar a Dios sin olvidar lo que recibió.",
    bloques: [
      { t: "subtitulo", texto: "El avivamiento de la calle Azusa" },
      {
        t: "parrafo",
        texto:
          "En 1906, en Los Ángeles, un grupo dirigido por el predicador William J. Seymour comenzó un avivamiento que pronto se trasladó a una misión de la calle Azusa, duró unos tres años y se extendió por el mundo. Su culto tenía libertad y participación de todos, con cantos sencillos y espontáneos. De allí salió buena parte del movimiento pentecostal.",
      },
      { t: "video", url: "https://www.youtube.com/watch?v=OisTpQEle6E", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "subtitulo", texto: "De los coros a la alabanza de hoy" },
      {
        t: "parrafo",
        texto:
          "Durante el siglo XX se extendieron los coros, cantos breves y fáciles de aprender. Más tarde llegaron la alabanza y adoración contemporánea, con guitarras, teclados y batería, y en América Latina surgieron compositores que escribieron en español para sus iglesias. Uno de los más conocidos es Marcos Witt, autor de dos libros de esta especialidad.",
      },
      { t: "subtitulo", texto: "Lo nuevo y lo antiguo" },
      { t: "versiculo", ref: "Salmos 145:4" },
      {
        t: "parrafo",
        texto:
          "«Generación a generación celebrará tus obras, Y anunciará tus poderosos hechos». Es el versículo de memoria de esta materia. Cada generación canta a Dios con su propia voz, y recibe y transmite los cantos de las anteriores.",
      },
      { t: "versiculo", ref: "Salmos 78:4" },
      {
        t: "parrafo",
        texto: "El pueblo de Dios se comprometía a seguir «Contando a la generación venidera las alabanzas de Jehová». La alabanza también es una herencia que se cuida y se pasa.",
      },
      { t: "versiculo", ref: "Apocalipsis 15:3" },
      {
        t: "parrafo",
        texto:
          "En el cielo, los redimidos cantan «el cántico de Moisés siervo de Dios, y el cántico del Cordero». El cántico antiguo y el nuevo suenan juntos delante del trono.",
      },
      {
        t: "lista",
        items: [
          "No despreciar lo antiguo por ser antiguo, ni lo nuevo por ser nuevo.",
          "Probarlo todo con la Palabra: la letra importa más que el estilo.",
          "Cantar en la lengua y con la música del pueblo.",
          "Que todo el pueblo cante, no solo los músicos.",
          "Transmitir a los jóvenes los mejores cantos que recibimos.",
        ],
      },
    ],
    ideaClave:
      "En 1906, el avivamiento de la calle Azusa, con William J. Seymour, trajo un culto con libertad y participación de todos, y extendió el movimiento pentecostal. En el siglo XX llegaron los coros y la alabanza contemporánea, también en español. Generación a generación se celebran las obras de Dios: el cántico de Moisés y el del Cordero suenan juntos, y todo se prueba con la Palabra.",
    paraLaVida: {
      texto: "Somos un eslabón: recibimos cantos y dejaremos cantos.",
      pregunta: "¿Qué canto que recibiste quieres asegurarte de enseñar a la próxima generación?",
    },
  },
];
