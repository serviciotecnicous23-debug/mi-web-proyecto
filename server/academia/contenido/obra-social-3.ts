/**
 * Especialidad Obra social y misericordia · Materia 3 — Proyectos comunitarios (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: buscar el bien de la ciudad,
 * conocer los recursos y las necesidades del barrio (el desarrollo a partir de los recursos de Kretzmann y McKnight),
 * diseñar con la comunidad, los proyectos concretos con sus cuidados (la ley Bill Emerson, 42 U.S.C. 1791, con la Ley
 * Pública 117-362 de enero de 2023, y la Ley del Donante de Buena Fe de Texas, capítulo 76 del Código de Prácticas y
 * Remedios Civiles, comprobadas), los recursos y la sostenibilidad, y medir y celebrar el cambio. Con los niños, el
 * reporte del abuso: toda persona de inmediato, y los profesionales a más tardar en 24 horas. Lo legal es una guía
 * general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const OBRA_SOCIAL_3: LeccionContenido[] = [
  {
    id: "obra-social-3-1",
    objetivos: [
      "Explicar, con Jeremías 29:7, por qué la iglesia busca el bien de su ciudad.",
      "Reconocer qué es un proyecto comunitario y en qué se distingue de una actividad suelta.",
      "Identificar una necesidad del barrio que la iglesia podría atender con otros.",
    ],
    paraEmpezar:
      "Cuando el pueblo de Dios estaba lejos de su tierra, en Babilonia, Dios le mandó buscar la paz de esa ciudad y orar por ella. La iglesia de hoy también vive en un barrio y en una ciudad: su luz se ve cuando trabaja por el bien de todos. Un proyecto comunitario es una manera ordenada de hacerlo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ayvlscZUZ0c", titulo: "Shalom - Paz", fuente: "Proyecto Biblia", minutos: 4 },
      { t: "versiculo", ref: "Jeremías 29:7" },
      {
        t: "parrafo",
        texto:
          "Dios dijo a los desterrados: «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová; porque en su paz tendréis vosotros paz». La paz de la Biblia, el shalom, es el bienestar completo: con Dios, con los demás y en la vida diaria.",
      },
      { t: "versiculo", ref: "Mateo 5:14" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder». La iglesia no se esconde de su barrio: lo alumbra con buenas obras y con el evangelio.",
      },
      { t: "versiculo", ref: "Proverbios 11:10" },
      {
        t: "parrafo",
        texto:
          "«En el bien de los justos la ciudad se alegra». Cuando los creyentes viven con justicia y sirven, todo el barrio sale ganando.",
      },
      { t: "subtitulo", texto: "Qué es un proyecto comunitario" },
      {
        t: "lista",
        items: [
          "Responde a una necesidad real del barrio, que la comunidad misma reconoce.",
          "Tiene un propósito claro, un tiempo, responsables y una manera de medir lo que cambia.",
          "Se hace con la comunidad y no solo para ella: los vecinos opinan, deciden y participan.",
          "Usa los recursos del barrio y de la iglesia, no solo el dinero que viene de afuera.",
          "Busca el bien de todos, sin importar su religión, y ofrece el evangelio con respeto, sin condicionar la ayuda.",
          "Se sostiene en el tiempo, en vez de empezar algo que se abandona a los pocos meses.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una actividad suelta y un proyecto comunitario" },
      {
        t: "lista",
        items: [
          "Actividad suelta: repartir comida un sábado. Proyecto: una despensa cada mes, con familias inscritas y un camino hacia el trabajo.",
          "Actividad suelta: la decide un líder. Proyecto: se diseña escuchando a los vecinos.",
          "Actividad suelta: no se mide. Proyecto: se evalúa qué cambió y se mejora.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: por dónde empezar" },
      {
        t: "parrafo",
        texto:
          "Una iglesia en un barrio con muchas familias recién llegadas quiere hacer algo por su comunidad, pero no sabe por dónde empezar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar por la ciudad con Jeremías 29:7, como pide la Palabra.",
          "Paso 2, reunir un equipo pequeño con hermanos que viven en el barrio.",
          "Paso 3, salir a conversar con vecinos, maestros de la escuela y dueños de negocios: qué les preocupa y qué sueñan para el barrio.",
          "Paso 4, anotar las necesidades que más se repiten, como el inglés, las tareas de los niños o el trabajo.",
          "Paso 5, escoger una sola necesidad para empezar, la que la iglesia puede atender bien.",
          "Paso 6, invitar a los vecinos a diseñar juntos el proyecto en una reunión.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Empieza pequeño y hazlo bien. Un solo proyecto sostenido, hecho con los vecinos, alumbra más que muchas actividades sueltas que se olvidan.",
      },
    ],
    ideaClave:
      "Dios mandó a su pueblo procurar la paz de la ciudad y orar por ella, porque en su paz tendrían paz (Jeremías 29:7). La iglesia es la luz del mundo (Mateo 5:14), y en el bien de los justos la ciudad se alegra (Proverbios 11:10). Un proyecto comunitario responde a una necesidad real, tiene propósito, tiempo y responsables, se hace con la comunidad y no solo para ella, y se sostiene y se evalúa.",
    paraLaVida: {
      texto: "Oro por mi ciudad y busco su bien.",
      pregunta: "¿Qué necesidad de tu barrio te duele y podrías empezar a atender con otros?",
    },
  },
  {
    id: "obra-social-3-2",
    objetivos: [
      "Explicar, con Nehemías 2:15, por qué se conoce la realidad antes de actuar.",
      "Hacer un mapa de los recursos del barrio, además de sus necesidades.",
      "Escuchar a los vecinos para descubrir lo que saben y lo que pueden aportar.",
    ],
    paraEmpezar:
      "Antes de reconstruir el muro, Nehemías salió de noche a ver cómo estaba. Y antes de alimentar a la multitud, Jesús preguntó qué había, y apareció un muchacho con cinco panes y dos peces. Conocer bien la comunidad es ver sus necesidades y también todo lo bueno que ya tiene.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Nehemías 2:15" },
      {
        t: "parrafo",
        texto:
          "Nehemías cuenta: «subí de noche por el torrente y observé el muro». Primero miró con sus propios ojos, y después habló con el pueblo.",
      },
      { t: "versiculo", ref: "Juan 6:9" },
      {
        t: "parrafo",
        texto:
          "Andrés dijo: «Aquí está un muchacho, que tiene cinco panes de cebada y dos pececillos». Parecía poco, pero Jesús empezó con lo que había, dio gracias y alimentó a todos.",
      },
      { t: "versiculo", ref: "Proverbios 20:5" },
      {
        t: "parrafo",
        texto:
          "«Como aguas profundas es el consejo en el corazón del hombre; Mas el hombre entendido lo alcanzará». Los vecinos saben mucho de su propia realidad, y el que escucha con paciencia lo descubre.",
      },
      { t: "subtitulo", texto: "El mapa de los recursos" },
      {
        t: "lista",
        items: [
          "Las personas: lo que saben hacer los vecinos, como cocinar, enseñar, reparar o cuidar niños.",
          "Las asociaciones: los grupos que ya existen, como las ligas deportivas, los comités de vecinos y otras iglesias.",
          "Las instituciones: las escuelas, las bibliotecas, las clínicas, los parques y las oficinas de la ciudad.",
          "Los lugares: un salón, un patio o un parque donde reunirse.",
          "La economía del barrio: los negocios, los oficios y los mercados.",
          "Kretzmann y McKnight llamaron a esto desarrollar la comunidad a partir de sus recursos: empezar por lo que el barrio tiene y no solo por lo que le falta.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el mapa de las necesidades y el mapa de los recursos" },
      {
        t: "lista",
        items: [
          "Solo necesidades: el barrio se ve pobre y sin esperanza. También recursos: se ven personas con dones y lugares para empezar.",
          "Solo necesidades: los vecinos esperan que alguien de afuera lo resuelva. También recursos: los vecinos se vuelven parte de la solución.",
          "Solo necesidades: el proyecto depende de la iglesia. También recursos: el proyecto se sostiene con la comunidad.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: conocer el barrio" },
      {
        t: "parrafo",
        texto: "El equipo comunitario de la iglesia quiere conocer bien el barrio antes de escoger un proyecto.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, caminar el barrio a distintas horas y anotar lo que se ve, como Nehemías.",
          "Paso 2, hacer la lista de los recursos: las escuelas, la biblioteca, los parques, los negocios y los grupos.",
          "Paso 3, conversar con veinte vecinos con tres preguntas: qué le gusta del barrio, qué le preocupa y qué sabe hacer.",
          "Paso 4, juntar lo que se oyó y ver qué necesidades y qué dones se repiten.",
          "Paso 5, dibujar el mapa con las necesidades y los recursos, y compartirlo con los vecinos.",
          "Paso 6, guardar con cuidado los nombres y los teléfonos, con permiso, para invitarlos después.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Escuchar ya es una forma de servir. Cuando le preguntas a un vecino qué sabe hacer, le devuelves la dignidad de ser parte de la solución y no solo alguien que necesita.",
      },
      {
        t: "cuadro",
        titulo: "El mapa de los recursos de un barrio",
        columnas: ["Recurso", "Ejemplos", "Cómo encontrarlo"],
        filas: [
          ["Personas", "Una vecina que cocina, un señor que repara carros y un joven que sabe de computadoras", "Conversar y preguntar qué sabe hacer cada uno"],
          ["Asociaciones", "Ligas deportivas, comités de vecinos y otras iglesias", "Preguntar en las escuelas, los parques y los negocios"],
          ["Instituciones", "La escuela, la biblioteca, la clínica y las oficinas de la ciudad", "Visitarlas y pedir una cita con sus encargados"],
          ["Lugares", "El salón de la iglesia, un parque o un patio", "Caminar el barrio y ver dónde se reúne la gente"],
          ["Economía", "Los negocios, los oficios y los mercados del barrio", "Visitar los negocios y conversar con sus dueños"],
        ],
      },
    ],
    ideaClave:
      "Nehemías observó el muro antes de actuar (Nehemías 2:15), y Jesús empezó con los cinco panes y los dos peces de un muchacho (Juan 6:9). Conocer la comunidad es ver sus necesidades y también sus recursos: las personas y sus dones, las asociaciones, las instituciones, los lugares y la economía del barrio. Kretzmann y McKnight enseñaron a desarrollar la comunidad a partir de lo que tiene, escuchando a los vecinos, que así se vuelven parte de la solución.",
    paraLaVida: {
      texto: "Escucho a mis vecinos y veo los dones que Dios puso en mi barrio.",
      pregunta: "¿Qué saben hacer tus vecinos que podría ayudar a otros?",
    },
  },
  {
    id: "obra-social-3-3",
    objetivos: [
      "Explicar, con Proverbios 15:22, por qué un proyecto se diseña con muchos consejeros.",
      "Escribir el propósito, las actividades, los recursos y los resultados de un proyecto.",
      "Distinguir lo que hacemos de lo que cambia en la vida de las personas.",
    ],
    paraEmpezar:
      "En tiempos de Nehemías, el muro se levantó porque cada uno trabajó en la parte que estaba frente a su casa y el pueblo tuvo ánimo para trabajar. Un buen proyecto comunitario se diseña así: con los vecinos, con una meta clara y con el trabajo repartido.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías: un líder que ora y trabaja", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Proverbios 15:22" },
      {
        t: "parrafo",
        texto:
          "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman». Un proyecto pensado por una sola persona se frustra; uno pensado con muchos se afirma.",
      },
      { t: "versiculo", ref: "Nehemías 3:28" },
      {
        t: "parrafo",
        texto:
          "Los sacerdotes restauraron el muro, «cada uno enfrente de su casa». Cada uno trabajó en lo que tenía cerca, y entre todos terminaron la obra.",
      },
      { t: "versiculo", ref: "Nehemías 4:6" },
      {
        t: "parrafo",
        texto:
          "El muro avanzó hasta la mitad de su altura «porque el pueblo tuvo ánimo para trabajar». Cuando la gente siente el proyecto como suyo, trabaja con ánimo.",
      },
      { t: "subtitulo", texto: "Las partes de un proyecto" },
      {
        t: "lista",
        items: [
          "El propósito: qué cambio queremos ver, como que los niños del barrio mejoren en la escuela.",
          "Las personas: a quiénes sirve, cuántas son y cómo se inscriben.",
          "Las actividades: lo que se hará, cuándo y dónde, como una tutoría dos tardes por semana.",
          "Los recursos: los voluntarios, el lugar, los materiales y el dinero que hacen falta.",
          "Los responsables: quién coordina, quién enseña y quién lleva las cuentas.",
          "Los resultados: lo que hacemos, como 40 tardes de tutoría, y lo que cambia, como las notas y la confianza de los niños.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que hacemos y lo que cambia" },
      {
        t: "lista",
        items: [
          "Lo que hacemos: repartimos 200 despensas. Lo que cambia: 15 familias dejaron de necesitarlas porque consiguieron trabajo.",
          "Lo que hacemos: dimos 30 clases de inglés. Lo que cambia: los padres ya hablan con los maestros de sus hijos.",
          "Lo que hacemos: abrimos la tutoría. Lo que cambia: los niños pasan de grado y leen mejor.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la tutoría del barrio" },
      {
        t: "parrafo",
        texto:
          "Los vecinos dijeron que su mayor preocupación es que los niños se quedan solos por la tarde y van mal en la escuela. El equipo diseña con ellos una tutoría.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, invitar a padres, maestros y hermanos a una reunión para pensar juntos.",
          "Paso 2, escribir el propósito: que los niños de tercero a sexto grado mejoren en lectura y en matemáticas este año.",
          "Paso 3, decidir las actividades: tutoría dos tardes por semana en el salón de la iglesia, con merienda.",
          "Paso 4, juntar los recursos: maestros jubilados y jóvenes voluntarios revisados y capacitados, libros de la biblioteca y una merienda donada.",
          "Paso 5, nombrar a los responsables y pedir el permiso escrito de los padres para cada niño.",
          "Paso 6, acordar cómo medir: la asistencia, las notas de la escuela y lo que digan los padres y los maestros.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los proyectos con niños piden cuidados especiales: voluntarios revisados y capacitados, siempre dos adultos, el permiso de los padres y el reporte de cualquier sospecha de abuso, que en Texas toda persona hace de inmediato y los profesionales a más tardar en 24 horas.",
      },
      {
        t: "pasos",
        titulo: "Cómo diseñar un proyecto con la comunidad",
        pasos: [
          { titulo: "Escuchar", texto: "Conversar con los vecinos y escoger con ellos una necesidad que la iglesia puede atender bien." },
          { titulo: "Definir el propósito", texto: "Escribir qué cambio se quiere ver, para quiénes y en cuánto tiempo." },
          { titulo: "Planear las actividades", texto: "Decidir qué se hará, cuándo, dónde y con quiénes." },
          { titulo: "Juntar los recursos", texto: "Ver qué hay en el barrio y en la iglesia: personas, lugares, materiales y dinero." },
          { titulo: "Repartir el trabajo", texto: "Nombrar a los responsables, como cada familia trabajó frente a su casa en tiempos de Nehemías." },
          { titulo: "Decidir cómo medir", texto: "Acordar qué se contará y cómo se sabrá lo que cambió." },
        ],
      },
    ],
    ideaClave:
      "En la multitud de consejeros los pensamientos se afirman (Proverbios 15:22), y el muro de Nehemías se levantó porque cada uno trabajó frente a su casa y el pueblo tuvo ánimo para trabajar (Nehemías 4:6). Un proyecto se diseña con la comunidad: el propósito, las personas, las actividades, los recursos, los responsables y los resultados. Y se distingue lo que hacemos, como las despensas que repartimos, de lo que cambia en la vida de las personas.",
    paraLaVida: {
      texto: "Planeo con otros y reparto el trabajo.",
      pregunta: "¿Con quiénes de tu barrio podrías diseñar un proyecto, en vez de hacerlo solo?",
    },
  },
  {
    id: "obra-social-3-4",
    objetivos: [
      "Explicar, con Marcos 6:37, el llamado a dar de comer y a servir con lo que tenemos.",
      "Reconocer lo que dicen las leyes sobre donar y repartir alimentos, también en Texas.",
      "Organizar un proyecto concreto con sus cuidados: una despensa, una tutoría, clases o una feria de salud.",
    ],
    paraEmpezar:
      "Cuando los discípulos quisieron despedir a la multitud con hambre, Jesús les dijo: Dadles vosotros de comer. Hoy muchas iglesias responden con una despensa, una tutoría, clases de inglés o una feria de salud. Cada proyecto hace mucho bien si se organiza con amor y con los cuidados que pide la ley.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Marcos 6:37" },
      {
        t: "parrafo",
        texto:
          "Jesús respondió: «Dadles vosotros de comer». Los discípulos pensaron en cuánto costaría; Jesús les mostró que con lo que había, y con su bendición, alcanzaba para todos.",
      },
      { t: "versiculo", ref: "Proverbios 22:9" },
      {
        t: "parrafo",
        texto: "«El ojo misericordioso será bendito, Porque dio de su pan al indigente». Dios bendice al que comparte su pan.",
      },
      { t: "versiculo", ref: "Mateo 25:35" },
      {
        t: "parrafo",
        texto:
          "El Rey dirá: «Porque tuve hambre, y me disteis de comer; tuve sed, y me disteis de beber; fui forastero, y me recogisteis». En cada proyecto servimos a Cristo.",
      },
      { t: "subtitulo", texto: "La despensa y la ley" },
      {
        t: "lista",
        items: [
          "La ley federal Bill Emerson del Buen Samaritano para la donación de alimentos (42 U.S.C. 1791) protege a quien dona de buena fe alimentos aparentemente sanos a una organización sin fines de lucro, también religiosa, y a la organización que los recibe y los reparte, salvo negligencia grave o mala conducta intencional.",
          "Una ley de enero de 2023 (Ley Pública 117-362) agregó la protección cuando la organización los entrega a un precio reducido que solo cubre los costos, y para algunos negocios que donan directamente a las personas necesitadas.",
          "En Texas, la Ley del Donante de Buena Fe (Código de Prácticas y Remedios Civiles, capítulo 76) protege al que dona alimentos aparentemente sanos a una iglesia o a una organización sin fines de lucro para repartirlos entre los necesitados, salvo negligencia grave, imprudencia temeraria o mala conducta intencional.",
          "La misma ley protege a la iglesia que los reparte gratis, si cumple en lo sustancial las reglas para guardar y manejar los alimentos.",
          "Una lata que gotea, que está hinchada o abollada en la costura, o que ya no cierra bien, no es un alimento aparentemente sano: no se reparte.",
          "Lo legal es una guía general, no un consejo legal; ante una duda se consulta al banco de alimentos o a un abogado.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el proyecto mal hecho y el proyecto bien hecho" },
      {
        t: "lista",
        items: [
          "Despensa mal hecha: cajas con latas hinchadas y filas que humillan. Bien hecha: alimentos revisados, citas por horario y un trato digno.",
          "Tutoría mal hecha: un voluntario solo con un niño. Bien hecha: voluntarios revisados, siempre dos adultos y el permiso de los padres.",
          "Feria de salud mal hecha: consejos médicos de quien no sabe. Bien hecha: una clínica con profesionales con licencia y la iglesia como anfitriona.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: abrir una despensa" },
      {
        t: "parrafo",
        texto: "Una iglesia quiere abrir una despensa cada mes para las familias del barrio.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, hablar con el banco de alimentos de la zona para conocer sus requisitos y recibir alimentos.",
          "Paso 2, preparar un lugar limpio y seco para guardarlos, con los alimentos fríos en refrigeración.",
          "Paso 3, capacitar a los voluntarios para revisar las fechas y apartar las latas hinchadas, abolladas en la costura o que gotean.",
          "Paso 4, inscribir a las familias con respeto, con los datos que hagan falta y guardando la confidencialidad.",
          "Paso 5, repartir gratis, por horarios, con un trato digno y con oración para quien la quiera.",
          "Paso 6, ofrecer a las familias otras ayudas, como clases o una bolsa de trabajo, para abrir espigas.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cada proyecto tiene sus cuidados. En la despensa, los alimentos se guardan y se revisan como piden las reglas; con los niños, voluntarios revisados, dos adultos y el reporte de cualquier sospecha de abuso, de inmediato, y en 24 horas los profesionales; en la salud, profesionales con licencia. Lo legal es una guía general, no un consejo legal.",
      },
      {
        t: "cuadro",
        titulo: "Los cuidados de cada proyecto",
        columnas: ["Proyecto", "Cuidado principal", "Por qué"],
        filas: [
          ["Despensa", "Revisar los alimentos y guardarlos bien", "La ley protege al que reparte cumpliendo las reglas de manejo"],
          ["Tutoría", "Voluntarios revisados, dos adultos y el permiso de los padres", "Para proteger a los niños"],
          ["Clases de inglés", "Maestros preparados y grupos por nivel", "Para que los alumnos aprendan de verdad"],
          ["Feria de salud", "Profesionales con licencia, junto a una clínica", "La iglesia no da consejos médicos"],
          ["Bolsa de trabajo", "Ofertas serias y sin cobrar a los que buscan", "Para no exponerlos a abusos"],
        ],
      },
    ],
    ideaClave:
      "Jesús dijo: Dadles vosotros de comer (Marcos 6:37), y el ojo misericordioso es bendito porque comparte su pan (Proverbios 22:9). Una iglesia puede servir con una despensa, una tutoría, clases o una feria de salud, cada una con sus cuidados. La ley Bill Emerson y la Ley del Donante de Buena Fe de Texas protegen a los que donan y reparten de buena fe alimentos aparentemente sanos, salvo la negligencia grave y otras faltas graves, cuando se reparten como piden las reglas de manejo.",
    paraLaVida: {
      texto: "Comparto mi pan y sirvo con cuidado.",
      pregunta: "¿Qué proyecto concreto podría empezar tu iglesia con lo que ya tiene?",
    },
  },
  {
    id: "obra-social-3-5",
    objetivos: [
      "Explicar, con 2 Corintios 9:8 y Juan 6:12, cómo provee Dios y cómo cuidamos lo que provee.",
      "Armar el presupuesto de un proyecto con dinero, donaciones en especie y voluntarios.",
      "Planear un proyecto para que dure y lo sigan los mismos vecinos.",
    ],
    paraEmpezar:
      "Un proyecto necesita recursos: personas, un lugar, materiales y dinero. Dios es poderoso para que tengamos lo suficiente para toda buena obra, y nos pide cuidar lo que da: después de alimentar a la multitud, Jesús mandó recoger lo que sobró. Un proyecto bien cuidado puede durar años.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Corintios 9:8" },
      {
        t: "parrafo",
        texto:
          "«Poderoso es Dios para hacer que abunde en vosotros toda gracia», para que, teniendo lo suficiente, abundemos «para toda buena obra». La provisión viene de Dios.",
      },
      { t: "versiculo", ref: "Juan 6:12" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Recoged los pedazos que sobraron, para que no se pierda nada». El que confía en la provisión de Dios también cuida lo que recibe.",
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús preguntó quién, queriendo edificar una torre, «no se sienta primero y calcula los gastos». Antes de empezar un proyecto se calcula lo que costará sostenerlo.",
      },
      { t: "subtitulo", texto: "Los recursos de un proyecto" },
      {
        t: "lista",
        items: [
          "Las personas: voluntarios de la iglesia y del barrio, cada uno con una tarea clara.",
          "Las donaciones en especie: alimentos, libros, un salón prestado o el trabajo de un profesional.",
          "El dinero: la ofrenda de la iglesia, las donaciones de los vecinos y de los negocios, y a veces los fondos de otras organizaciones.",
          "El presupuesto: lo que costará cada actividad, con un margen para lo imprevisto.",
          "Las cuentas claras: dos personas registran lo que entra y lo que sale, y se informa a la iglesia y a los que donaron.",
          "Las ofrendas dadas para el proyecto se usan solo para el proyecto.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el proyecto que se acaba y el proyecto que dura" },
      {
        t: "lista",
        items: [
          "Se acaba: depende de una sola persona. Dura: tiene un equipo y forma a nuevos líderes, también del barrio.",
          "Se acaba: depende de una donación grande. Dura: tiene varias fuentes pequeñas y gasta con cuidado.",
          "Se acaba: los vecinos solo reciben. Dura: los vecinos participan y lo sienten suyo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la tutoría cansada" },
      {
        t: "parrafo",
        texto:
          "La tutoría del barrio cumple un año, pero los dos maestros jubilados que la sostienen están cansados y el dinero de la merienda se acabó.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reunir al equipo y a los padres para mirar juntos cómo va el proyecto.",
          "Paso 2, invitar a padres y jóvenes del barrio a servir, y capacitarlos con los maestros.",
          "Paso 3, repartir la carga: un coordinador por día y un calendario de voluntarios.",
          "Paso 4, pedir la merienda a varios negocios del barrio, en vez de depender de uno solo.",
          "Paso 5, hacer el presupuesto del año siguiente con un margen y presentarlo a la iglesia.",
          "Paso 6, informar a los que donaron lo que se logró y dar gracias a Dios por su provisión.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de empezar un proyecto, pregúntate si podrás sostenerlo. Es mejor un proyecto pequeño que dura que uno grande que se abandona y deja a las familias decepcionadas.",
      },
    ],
    ideaClave:
      "Dios es poderoso para que tengamos lo suficiente para toda buena obra (2 Corintios 9:8), y nos pide cuidar lo que da, como Jesús mandó recoger lo que sobró (Juan 6:12) y calcular los gastos antes de edificar (Lucas 14:28). Un proyecto usa personas, donaciones en especie y dinero, con un presupuesto y cuentas claras, y dura cuando tiene un equipo, varias fuentes de apoyo y vecinos que lo sienten suyo.",
    paraLaVida: {
      texto: "Cuido lo que Dios provee y planeo para que dure.",
      pregunta: "¿El proyecto que sueñas podría sostenerse dentro de dos años?",
    },
  },
  {
    id: "obra-social-3-6",
    objetivos: [
      "Explicar, con Hageo 1:5, por qué se evalúa un proyecto.",
      "Medir lo que hacemos y lo que cambia, cuidando la privacidad de las personas.",
      "Contar a la iglesia y al barrio lo que Dios hizo, con humildad y con permiso.",
    ],
    paraEmpezar:
      "Dios le dijo a su pueblo: Meditad bien sobre vuestros caminos. Evaluar un proyecto no es desconfiar: es mirar con honestidad qué está pasando, aprender y mejorar. Y cuando vemos el cambio, celebramos y damos gracias, porque es Dios quien da el crecimiento.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Hageo 1:5" },
      {
        t: "parrafo",
        texto: "«Meditad bien sobre vuestros caminos». Dios invitó a su pueblo a mirar lo que estaba haciendo y lo que resultaba de ello.",
      },
      { t: "versiculo", ref: "1 Corintios 3:6" },
      {
        t: "parrafo",
        texto:
          "«Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios». Medimos con humildad: hacemos nuestra parte y reconocemos que el fruto viene de Dios.",
      },
      { t: "versiculo", ref: "Salmos 126:3" },
      {
        t: "parrafo",
        texto: "«Grandes cosas ha hecho Jehová con nosotros; Estaremos alegres». Cuando vemos el cambio, lo celebramos y damos gracias.",
      },
      { t: "subtitulo", texto: "Cómo se mide un proyecto" },
      {
        t: "lista",
        items: [
          "Lo que hacemos: cuántas personas vinieron y cuántas clases o despensas se dieron.",
          "Lo que cambia: si los niños leen mejor, si las familias consiguieron trabajo, si los vecinos se conocen más.",
          "Las voces: lo que dicen las personas servidas, los voluntarios, los maestros y los vecinos.",
          "La privacidad: los datos de las familias se guardan con cuidado, y sus historias y sus fotos solo se usan con su permiso.",
          "Los cambios en el plan: lo que no funciona se ajusta, y lo que funciona se fortalece.",
          "La celebración: se cuenta a la iglesia y al barrio lo que Dios hizo, y se da gracias a los que ayudaron.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: medir para presumir y medir para aprender" },
      {
        t: "lista",
        items: [
          "Para presumir: se cuentan solo los números grandes. Para aprender: se cuenta también lo que no salió bien.",
          "Para presumir: se publican fotos de las familias sin preguntar. Para aprender y celebrar: se cuentan historias con permiso, cuidando su dignidad.",
          "Para presumir: el mérito es del equipo. Para aprender: se dan gracias a Dios, que da el crecimiento.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: las clases de inglés a los seis meses" },
      {
        t: "parrafo",
        texto: "Las clases de inglés de la iglesia cumplen seis meses. El equipo quiere saber si están sirviendo de verdad.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, contar la asistencia de cada mes y cuántos alumnos siguen viniendo.",
          "Paso 2, hacer una prueba sencilla al principio y a los seis meses, para ver lo que aprendieron.",
          "Paso 3, preguntar a los alumnos qué cambió en su vida, como hablar con el médico o con la escuela.",
          "Paso 4, preguntar a los maestros qué mejorarían, y ajustar los horarios o los grupos.",
          "Paso 5, pedir permiso a dos alumnos para contar su historia en el culto, sin datos privados.",
          "Paso 6, dar gracias a Dios y a los voluntarios, y presentar el plan de los seis meses siguientes.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Medir con honestidad es parte de la mayordomía. Los números sirven para aprender, no para presumir, y las historias de las personas son suyas: se cuentan solo con su permiso.",
      },
    ],
    ideaClave:
      "Dios pidió a su pueblo meditar bien sobre sus caminos (Hageo 1:5): evaluar es mirar con honestidad para aprender. Se mide lo que hacemos y lo que cambia, se escuchan las voces de las personas y se cuida su privacidad, se ajusta lo que no funciona y se celebra con humildad, porque el crecimiento lo da Dios (1 Corintios 3:6) y grandes cosas ha hecho con nosotros (Salmos 126:3).",
    paraLaVida: {
      texto: "Evalúo con honestidad y doy gracias a Dios por el fruto.",
      pregunta: "¿Cómo sabrías si tu servicio está cambiando algo en la vida de las personas?",
    },
  },
];
