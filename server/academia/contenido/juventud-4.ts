/**
 * Especialidad Juventud · Materia 4 — Liderazgo juvenil (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: los jóvenes que Dios usó para guiar,
 * liderar sirviendo, el carácter del líder joven, formar un equipo de liderazgo, planear y dirigir la reunión de
 * jóvenes, y proteger, evaluar y pasar la posta. Quién ejerce cada cargo en la iglesia no se decide aquí.
 */
import type { LeccionContenido } from "../tipos";

export const JUVENTUD_4: LeccionContenido[] = [
  {
    id: "juventud-4-1",
    objetivos: [
      "Describir cómo usó Dios a jóvenes para guiar a su pueblo.",
      "Explicar qué es el liderazgo según la Biblia.",
      "Reconocer a los jóvenes con potencial para liderar.",
    ],
    paraEmpezar:
      "En la Biblia, Dios llamó a guiar a muchos que eran jóvenes cuando empezaron. No esperó a que fueran mayores: los formó en el camino. Hoy sigue haciendo lo mismo en el ministerio juvenil.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=34biq4ivs5I", titulo: "Resumen del libro de 1 Samuel", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "1 Samuel 17:33" },
      {
        t: "parrafo",
        texto:
          "Cuando David se ofreció para enfrentar a Goliat, Saúl le dijo: «No podrás tú ir contra aquel filisteo, para pelear con él; porque tú eres muchacho». Muchos miraron su edad; Dios miraba su fe.",
      },
      { t: "versiculo", ref: "1 Samuel 17:45" },
      {
        t: "parrafo",
        texto:
          "Y David respondió con la razón de su valor: «yo vengo a ti en el nombre de Jehová de los ejércitos». El líder joven no confía en sí mismo, sino en Dios.",
      },
      { t: "versiculo", ref: "Daniel 1:17" },
      {
        t: "parrafo",
        texto:
          "A Daniel y a sus amigos, siendo muchachos, «Dios les dio conocimiento e inteligencia en todas las letras y ciencias». Dios prepara a sus líderes también en el estudio y en el trabajo.",
      },
      { t: "versiculo", ref: "Ester 4:14" },
      {
        t: "parrafo",
        texto:
          "A la joven Ester le dijeron: «¿Y quién sabe si para esta hora has llegado al reino?». Dios pone a los jóvenes en lugares donde pueden hacer una diferencia.",
      },
      { t: "subtitulo", texto: "Qué es el liderazgo según la Biblia" },
      {
        t: "lista",
        items: [
          "Influencia: el líder ayuda a otros a acercarse a Dios y a hacer su voluntad.",
          "Servicio: el líder no busca mandar, sino servir.",
          "Carácter: el líder vive lo que enseña.",
          "Dirección: el líder sabe hacia dónde va, porque escucha a Dios y a sus pastores.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: reconocer a un joven con potencial para liderar" },
      {
        t: "lista",
        items: [
          "Señal 1, es fiel: cumple con lo poco que se le encarga, sin que nadie lo vigile.",
          "Señal 2, sirve sin que se lo pidan: acomoda sillas, recibe a los nuevos, ayuda al que está solo.",
          "Señal 3, otros lo siguen: sus amigos lo escuchan y lo imitan.",
          "Señal 4, tiene hambre de Dios: ora, lee la Biblia y hace preguntas.",
          "Señal 5, tiene buen testimonio: en su casa, en la escuela y en la iglesia hablan bien de él.",
          "El paso siguiente: invitarlo a servir en algo pequeño y acompañarlo, como Jesús hizo con los suyos.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En el ministerio juvenil hay dos clases de líderes: los adultos que acompañan y los jóvenes que empiezan a liderar a sus compañeros. Los dos se necesitan, y los jóvenes líderes siempre trabajan bajo la guía de adultos.",
      },
    ],
    ideaClave:
      "Dios llamó a jóvenes como David, que enfrentó a Goliat en el nombre de Jehová aunque le dijeron que era muchacho, Daniel y sus amigos, a quienes dio conocimiento e inteligencia, y Ester, que llegó al reino para esa hora. Según la Biblia, liderar es influir para que otros se acerquen a Dios, servir, vivir lo que se enseña y saber hacia dónde ir. Un joven con potencial es fiel, sirve sin que se lo pidan, otros lo siguen, tiene hambre de Dios y buen testimonio.",
    paraLaVida: {
      texto: "Muchos miraron la edad de David; Dios miraba su fe.",
      pregunta: "¿Qué joven de tu iglesia muestra ya las señales de un líder?",
    },
  },
  {
    id: "juventud-4-2",
    objetivos: [
      "Explicar el liderazgo de servicio que enseñó Jesús.",
      "Distinguir el liderazgo de servicio del liderazgo de poder.",
      "Aplicar el ejemplo de Jesús al lavar los pies a las tareas del líder juvenil.",
    ],
    paraEmpezar:
      "Muchos jóvenes piensan que liderar es estar al frente, tener el micrófono o dar órdenes. Jesús enseñó otra cosa, y la mostró con una toalla en la mano.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 10:43-45" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «el que quiera hacerse grande entre vosotros será vuestro servidor». Y se puso de ejemplo: «el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».",
      },
      { t: "versiculo", ref: "Juan 13:14-15" },
      {
        t: "parrafo",
        texto:
          "La noche antes de morir, lavó los pies de sus discípulos y les dijo: «Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis».",
      },
      { t: "versiculo", ref: "Filipenses 2:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo lo aplica: «Nada hagáis por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demás como superiores a él mismo».",
      },
      { t: "subtitulo", texto: "Dos maneras de liderar" },
      {
        t: "lista",
        items: [
          "El liderazgo de poder pregunta quién me sirve; el de servicio, a quién puedo servir.",
          "El de poder busca el micrófono; el de servicio hace también lo que nadie ve.",
          "El de poder se rodea de los que lo aplauden; el de servicio forma a otros para que crezcan.",
          "El de poder se ofende cuando lo corrigen; el de servicio escucha y aprende.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un joven líder que solo quiere el micrófono" },
      {
        t: "lista",
        items: [
          "Paso 1, reconocer su don: el joven habla bien y la gente lo escucha.",
          "Paso 2, conversar en privado: leen juntos Juan 13:14-15 y hablan de qué significa liderar.",
          "Paso 3, darle una tarea de servicio: un mes recibiendo a los nuevos y acomodando el salón antes de la reunión.",
          "Paso 4, acompañarlo: el líder adulto sirve junto a él y le cuenta por qué lo hace.",
          "Paso 5, volver a darle el micrófono: cuando sirve con gozo, se le da la oportunidad de hablar, y se celebra su crecimiento.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los jóvenes aprenden a servir viendo a sus líderes servir. Que te vean llegar temprano, limpiar después y acercarte al que está solo.",
      },
    ],
    ideaClave:
      "Jesús enseñó que el que quiere hacerse grande será servidor, porque él no vino para ser servido, sino para servir y dar su vida; lavó los pies de sus discípulos y les dejó ejemplo. Pablo pide no hacer nada por vanagloria, sino estimar a los demás como superiores. El liderazgo de servicio pregunta a quién puede servir, hace lo que nadie ve, forma a otros y escucha la corrección.",
    paraLaVida: {
      texto: "Liderar no es tener el micrófono: es tener la toalla en la mano.",
      pregunta: "¿Qué tarea que nadie ve podrías hacer esta semana con tus jóvenes?",
    },
  },
  {
    id: "juventud-4-3",
    objetivos: [
      "Explicar por qué el carácter importa más que el talento en un líder.",
      "Describir las áreas del carácter que cuida un líder joven.",
      "Acompañar a un joven con talento que necesita crecer en humildad.",
    ],
    paraEmpezar:
      "El talento puede llevar a un joven a un lugar de liderazgo, pero solo el carácter lo sostiene allí. Muchos líderes cayeron no por falta de dones, sino por falta de carácter.",
    bloques: [
      { t: "versiculo", ref: "1 Samuel 16:7" },
      {
        t: "parrafo",
        texto:
          "Cuando Samuel buscaba un rey, Dios le dijo: «Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón».",
      },
      { t: "versiculo", ref: "Proverbios 4:23" },
      {
        t: "parrafo",
        texto: "Por eso el líder cuida primero su corazón: «Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida».",
      },
      { t: "versiculo", ref: "Tito 2:6-7" },
      {
        t: "parrafo",
        texto:
          "Pablo pidió a Tito: «Exhorta asimismo a los jóvenes a que sean prudentes», y que él mismo fuera ejemplo: «presentándote tú en todo como ejemplo de buenas obras».",
      },
      { t: "versiculo", ref: "Proverbios 16:18" },
      {
        t: "parrafo",
        texto: "El peligro más grande del líder es el orgullo: «Antes del quebrantamiento es la soberbia, Y antes de la caída la altivez de espíritu».",
      },
      { t: "versiculo", ref: "1 Corintios 9:24-27" },
      {
        t: "parrafo",
        texto:
          "Y el líder se disciplina, como un atleta: «golpeo mi cuerpo, y lo pongo en servidumbre, no sea que habiendo sido heraldo para otros, yo mismo venga a ser eliminado».",
      },
      { t: "subtitulo", texto: "Las áreas del carácter del líder joven" },
      {
        t: "lista",
        items: [
          "La integridad: es el mismo en la iglesia, en la escuela, en casa y en las redes.",
          "La humildad: reconoce sus errores y deja que otros brillen.",
          "La pureza: cuida su mente, su cuerpo y sus relaciones.",
          "La disciplina: ora, estudia, cumple lo que promete y llega a tiempo.",
          "La fidelidad: sigue sirviendo aunque nadie lo vea ni lo aplauda.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un joven con mucho talento y poca humildad" },
      {
        t: "lista",
        items: [
          "Paso 1, ver el problema: canta muy bien, pero se burla de los que se equivocan y no acepta correcciones.",
          "Paso 2, hablar a solas: el líder le dice lo que valora en él y lo que preocupa, con ejemplos concretos.",
          "Paso 3, la Palabra: leen 1 Samuel 16:7 y Proverbios 16:18.",
          "Paso 4, un tiempo para crecer: durante un tiempo sirve detrás de escena y se reúne cada semana con un mentor.",
          "Paso 5, volver al frente: cuando se ven cambios en su trato con los demás, vuelve a cantar, y se le sigue acompañando.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No pongas al frente a un joven solo porque tiene talento. Una plataforma grande sobre un carácter pequeño termina lastimando al joven y a los demás.",
      },
    ],
    ideaClave:
      "Dios no mira lo que mira el hombre: mira el corazón, y por eso el líder guarda su corazón, del que mana la vida. Pablo pidió a los jóvenes ser prudentes y a Tito ser ejemplo de buenas obras; la soberbia va antes de la caída, y el líder se disciplina como un atleta. El carácter del líder joven se ve en la integridad, la humildad, la pureza, la disciplina y la fidelidad, y vale más que el talento.",
    paraLaVida: {
      texto: "El talento lleva a un lugar; solo el carácter sostiene allí.",
      pregunta: "¿Qué área de tu carácter necesitas cuidar más como líder?",
    },
  },
  {
    id: "juventud-4-4",
    objetivos: [
      "Explicar por qué el ministerio juvenil necesita un equipo de liderazgo.",
      "Organizar un equipo de líderes adultos y jóvenes.",
      "Manejar los desacuerdos del equipo y dar segundas oportunidades.",
    ],
    paraEmpezar:
      "Un líder solo puede hacer mucho, pero un equipo puede hacer más, y por más tiempo. Además, en un equipo cada joven encuentra a alguien que lo conoce.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Nehemías 2:17-18" },
      {
        t: "parrafo",
        texto:
          "Nehemías compartió la visión con el pueblo: «venid, y edifiquemos el muro de Jerusalén», y el pueblo respondió: «Levantémonos y edifiquemos. Así esforzaron sus manos para bien». Un equipo nace de una visión compartida.",
      },
      { t: "versiculo", ref: "1 Pedro 5:5" },
      {
        t: "parrafo",
        texto:
          "Pedro pide a los jóvenes una actitud: «jóvenes, estad sujetos a los ancianos; y todos, sumisos unos a otros, revestíos de humildad». En el equipo, los jóvenes aprenden de los mayores, y todos aprenden unos de otros.",
      },
      { t: "subtitulo", texto: "Un equipo de liderazgo juvenil" },
      {
        t: "lista",
        items: [
          "El líder o pastor de jóvenes: guía la visión y rinde cuentas a los pastores de la iglesia.",
          "Los líderes adultos: cada uno acompaña un grupo pequeño de jóvenes.",
          "Los jóvenes líderes: ayudan en la alabanza, la bienvenida, los medios, los juegos y los grupos, siempre con un adulto.",
          "El apoyo: los padres y los hermanos que ayudan con transporte, comida y oración.",
        ],
      },
      { t: "versiculo", ref: "Hechos 15:37-39" },
      {
        t: "parrafo",
        texto:
          "Hasta los grandes líderes tuvieron desacuerdos. Pablo y Bernabé discutieron por Marcos, que los había dejado en un viaje, y «hubo tal desacuerdo entre ellos, que se separaron el uno del otro».",
      },
      { t: "versiculo", ref: "2 Timoteo 4:11" },
      {
        t: "parrafo",
        texto:
          "Pero años después, Pablo escribió sobre Marcos: «Toma a Marcos y tráele contigo, porque me es útil para el ministerio». El joven que falló una vez llegó a ser útil. En un buen equipo hay segundas oportunidades.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la reunión mensual del equipo" },
      {
        t: "lista",
        items: [
          "Primero, orar juntos y leer un pasaje corto.",
          "Segundo, contar: cómo está cada grupo pequeño y qué joven necesita atención.",
          "Tercero, evaluar el mes: qué salió bien y qué hay que mejorar en las reuniones.",
          "Cuarto, planear: el próximo mes, quién hace qué y para cuándo.",
          "Quinto, formar: diez minutos de capacitación sobre un tema, como escuchar bien o proteger a los menores.",
          "Sexto, cuidar al equipo: preguntar cómo está cada líder y orar unos por otros.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Cuando hay un desacuerdo en el equipo, se habla en privado y con la verdad en amor, nunca delante de los jóvenes. Si no se resuelve, se pide ayuda al pastor.",
      },
    ],
    ideaClave:
      "Nehemías compartió la visión y el pueblo dijo: levantémonos y edifiquemos; Pedro pide a los jóvenes sujetarse a los mayores y a todos revestirse de humildad. Un equipo de liderazgo juvenil tiene un líder que guía la visión, adultos que acompañan grupos, jóvenes líderes que sirven con un adulto y personas que apoyan. Pablo y Bernabé se separaron por Marcos, pero años después Pablo dijo que Marcos le era útil: en un buen equipo hay segundas oportunidades.",
    paraLaVida: {
      texto: "En un buen equipo hay segundas oportunidades.",
      pregunta: "¿A qué joven que falló una vez podrías darle una segunda oportunidad para servir?",
    },
  },
  {
    id: "juventud-4-5",
    objetivos: [
      "Describir las partes de una buena reunión de jóvenes.",
      "Planear una reunión de jóvenes y una serie de enseñanza.",
      "Preparar una charla corta para jóvenes paso a paso.",
    ],
    paraEmpezar:
      "Una reunión de jóvenes improvisada se nota: tiempos muertos, juegos que no terminan y una enseñanza sin rumbo. Una reunión preparada con oración ayuda a que cada joven encuentre a Dios y a otros.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 14:26" },
      {
        t: "parrafo",
        texto:
          "Pablo da la regla para las reuniones: «Cuando os reunís, cada uno de vosotros tiene salmo, tiene doctrina», y «Hágase todo para edificación». Cada parte de la reunión debe ayudar a crecer.",
      },
      { t: "versiculo", ref: "Colosenses 3:16" },
      {
        t: "parrafo",
        texto:
          "Y la Palabra está en el centro: «La palabra de Cristo more en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría, cantando con gracia en vuestros corazones al Señor».",
      },
      { t: "subtitulo", texto: "Las partes de una reunión de jóvenes" },
      {
        t: "lista",
        items: [
          "La bienvenida: alguien recibe a cada joven por su nombre, y sobre todo a los nuevos.",
          "Un momento para conectar: un juego o una pregunta para romper el hielo.",
          "La alabanza: canciones que los jóvenes puedan cantar y entender.",
          "La Palabra: una enseñanza clara, con un solo mensaje.",
          "Los grupos pequeños: conversar sobre lo que oyeron y orar unos por otros.",
          "El cierre: los anuncios breves y una despedida que invite a volver.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una reunión de un viernes, de noventa minutos" },
      {
        t: "lista",
        items: [
          "7:00, bienvenida: el equipo de recepción saluda en la puerta y presenta a los nuevos.",
          "7:10, juego para conectar: diez minutos, con reglas claras y un final a tiempo.",
          "7:20, alabanza: veinte minutos.",
          "7:40, la Palabra: veinte minutos sobre un solo texto.",
          "8:00, grupos pequeños: veinte minutos, con tres preguntas preparadas.",
          "8:20, cierre: anuncios, oración y despedida; los menores se van con quien los recoge o con el permiso de sus padres.",
        ],
      },
      { t: "subtitulo", texto: "Cómo prepara un joven una charla corta" },
      {
        t: "lista",
        items: [
          "Un texto: elige un pasaje corto y lo estudia en su contexto.",
          "Una idea: escribe en una frase lo que el texto enseña.",
          "Una historia: busca un ejemplo de la vida real que haga entender la idea.",
          "Una aplicación: dice qué puede hacer cada joven esta semana.",
          "Un ensayo: la practica en voz alta frente a su líder, que le da sugerencias.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Planea las enseñanzas en series de cuatro a seis semanas, por ejemplo sobre la identidad, la amistad o un libro de la Biblia. Una serie ayuda a profundizar y a que los jóvenes inviten a sus amigos.",
      },
    ],
    ideaClave:
      "Cuando la iglesia se reúne, todo debe hacerse para edificación, y la palabra de Cristo debe morar en abundancia, enseñando y cantando con gracia. Una buena reunión de jóvenes tiene bienvenida, un momento para conectar, alabanza, la Palabra con un solo mensaje, grupos pequeños y un cierre, con tiempos claros. Un joven prepara una charla corta con un texto, una idea, una historia, una aplicación y un ensayo, y las enseñanzas se planean en series.",
    paraLaVida: {
      texto: "Hágase todo para edificación.",
      pregunta: "¿Qué parte de la reunión de jóvenes de tu iglesia necesita más preparación?",
    },
  },
  {
    id: "juventud-4-6",
    objetivos: [
      "Organizar las salidas y los campamentos de jóvenes con seguridad.",
      "Evaluar el ministerio juvenil y su liderazgo.",
      "Preparar a la próxima generación de líderes y la transición de los que terminan la escuela.",
    ],
    paraEmpezar:
      "Un buen líder no solo dirige bien hoy: protege a los que tiene a su cargo, se pregunta si va por buen camino y prepara a quienes vendrán después.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=49ggVrdBN_Y", titulo: "Resumen del libro de Josué", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Deuteronomio 31:7-8" },
      {
        t: "parrafo",
        texto:
          "Moisés preparó a Josué para guiar al pueblo, y le dijo en presencia de todos: «Esfuérzate y anímate». Y le recordó: «Jehová va delante de ti; él estará contigo, no te dejará, ni te desamparará».",
      },
      { t: "versiculo", ref: "Josué 1:9" },
      {
        t: "parrafo",
        texto:
          "Y Dios mismo le repitió a Josué: «Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas».",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un campamento de jóvenes con seguridad" },
      {
        t: "lista",
        items: [
          "Paso 1, los permisos: cada menor lleva el permiso firmado por sus padres y una ficha con su salud, sus alergias y los teléfonos de contacto.",
          "Paso 2, los adultos: suficientes adultos seleccionados, de los dos sexos, y nunca un adulto a solas con un menor.",
          "Paso 3, el transporte: conductores con licencia y seguro, y un adulto más en cada vehículo.",
          "Paso 4, los dormitorios: separados para varones y mujeres, con adultos del mismo sexo cerca.",
          "Paso 5, las reglas: claras desde el principio, sobre los horarios, los teléfonos y el trato entre todos.",
          "Paso 6, las emergencias: un botiquín, la dirección del hospital más cercano y un plan para comunicarse con los padres.",
        ],
      },
      { t: "subtitulo", texto: "Preguntas para evaluar el ministerio juvenil" },
      {
        t: "lista",
        items: [
          "¿Los jóvenes están creciendo en su fe, y no solo viniendo?",
          "¿Cada joven tiene un adulto que lo conoce y ora por él?",
          "¿Los jóvenes sirven y empiezan a liderar?",
          "¿El equipo de líderes está sano, descansa y se cuida?",
          "¿Estamos preparando a los que vendrán después?",
        ],
      },
      { t: "subtitulo", texto: "Pasar la posta" },
      {
        t: "lista",
        items: [
          "Formar a otros: cada líder tiene a alguien a quien enseña lo que hace.",
          "Dar responsabilidades de a poco: primero ayudar, después dirigir con apoyo y al final dirigir solo.",
          "Acompañar a los que terminan la escuela: ayudarlos a encontrar una iglesia y un grupo si se mudan, y a seguir sirviendo si se quedan.",
          "Despedir bien: reconocer en público a los líderes que terminan su tiempo de servicio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Quién ejerce cada cargo en la iglesia lo deciden sus pastores y su forma de gobierno. Esta materia enseña a liderar con carácter y servicio dentro de esa autoridad.",
      },
    ],
    ideaClave:
      "Moisés preparó a Josué delante de todos y le dijo que se esforzara, porque Jehová iría delante de él, y Dios le repitió: esfuérzate y sé valiente, porque yo estaré contigo. El líder juvenil protege a sus jóvenes con permisos, adultos seleccionados, transporte seguro, dormitorios separados, reglas claras y un plan de emergencias; evalúa si los jóvenes crecen, son acompañados y sirven; y pasa la posta formando a otros, dando responsabilidades de a poco y acompañando a los que terminan la escuela.",
    paraLaVida: {
      texto: "Un buen líder prepara a quienes vendrán después.",
      pregunta: "¿A quién estás preparando hoy para que haga lo que tú haces?",
    },
  },
];
