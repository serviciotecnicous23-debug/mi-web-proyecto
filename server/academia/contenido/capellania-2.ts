/**
 * Especialidad Capellanía · Materia 2 — Capellanía hospitalaria (materia avanzada; sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el enfermo y el hospital, orar por los
 * enfermos según el artículo 11 de la declaración de fe (la sanidad en la expiación, por confirmar), las normas del
 * hospital (HIPAA, 45 CFR 164.510(a), comprobado), el que muere y su familia (los cuidados paliativos de la OMS, el
 * hospicio de Medicare y la Ley de Voluntades Anticipadas de Texas, comprobados), las pérdidas de los niños y de las
 * madres, y las decisiones difíciles con el cuidado del personal. No reemplaza al equipo médico, y lo legal es una guía
 * general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const CAPELLANIA_2: LeccionContenido[] = [
  {
    id: "capellania-2-1",
    objetivos: [
      "Describir lo que vive una persona enferma en el hospital.",
      "Explicar cómo se organiza el equipo de un hospital y el lugar del capellán.",
      "Dirigir la primera visita a un paciente recién internado.",
    ],
    paraEmpezar:
      "Entrar al hospital cambia la vida de golpe: la persona pierde su ropa, su horario, su intimidad y muchas veces el control de su cuerpo. Tiene miedo, dolor y preguntas. El capellán entra en ese mundo para recordarle que no está solo y que vale más que su enfermedad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 1:40-41" },
      {
        t: "parrafo",
        texto:
          "Cuando un leproso se acercó a Jesús, todos lo evitaban. Pero Jesús, «teniendo misericordia de él, extendió la mano y le tocó». El enfermo necesita compasión y cercanía, no solo un diagnóstico.",
      },
      { t: "versiculo", ref: "Salmos 41:3" },
      {
        t: "parrafo",
        texto:
          "Dios cuida al enfermo en su cama: «Jehová lo sustentará sobre el lecho del dolor; Mullirás toda su cama en su enfermedad».",
      },
      { t: "versiculo", ref: "2 Corintios 4:16" },
      {
        t: "parrafo",
        texto:
          "Y aunque el cuerpo se cansa, Dios puede renovar el corazón: «aunque este nuestro hombre exterior se va desgastando, el interior no obstante se renueva de día en día».",
      },
      { t: "subtitulo", texto: "Lo que vive el enfermo" },
      {
        t: "lista",
        items: [
          "El miedo: al diagnóstico, al dolor, a la muerte o a lo que pasará con su familia.",
          "La pérdida del control: otros deciden sus horarios, su comida y su tratamiento.",
          "La soledad, sobre todo en la noche o cuando nadie lo visita.",
          "La vergüenza de depender de otros para lo más íntimo.",
          "Las preguntas sobre Dios: ¿por qué a mí?, ¿dónde está Dios?",
          "La esperanza, que sube y baja con cada noticia.",
        ],
      },
      { t: "subtitulo", texto: "El equipo del hospital" },
      {
        t: "lista",
        items: [
          "Los médicos deciden el tratamiento.",
          "Las enfermeras cuidan al paciente las 24 horas y saben mucho de cómo está.",
          "Los trabajadores sociales ayudan con los trámites, el alta y los recursos para la familia.",
          "Los capellanes atienden las necesidades espirituales del paciente, de su familia y del personal.",
          "El capellán trabaja con todos, y les avisa lo que necesitan saber.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la visita de un amigo y la visita del capellán" },
      {
        t: "lista",
        items: [
          "La de un amigo: se va cuando quiere. La del capellán: se coordina con el hospital y respeta sus horarios.",
          "La de un amigo: conversa de todo. La del capellán: escucha lo que el paciente necesita hablar.",
          "La de un amigo: a veces cuenta a otros lo que vio. La del capellán: guarda la confianza.",
          "Las dos: llevan cariño, compañía y esperanza.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera visita a un paciente recién internado" },
      {
        t: "parrafo",
        texto:
          "A don Pedro lo internaron anoche por un infarto. Está asustado, y su esposa todavía no ha podido llegar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, revisar la lista y preguntarle a la enfermera si es un buen momento.",
          "Paso 2, presentarse: soy el capellán del hospital; ¿lo puedo acompañar un momento?",
          "Paso 3, escuchar lo que vivió anoche y cómo se siente ahora.",
          "Paso 4, preguntarle por su familia y si quiere que alguien le avise algo.",
          "Paso 5, ofrecerle una oración corta por su salud y por su esposa.",
          "Paso 6, decirle cuándo volverá, y contarle a la enfermera lo que le preocupa a don Pedro.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán no da noticias médicas ni opina sobre el tratamiento. Si el paciente pregunta por su diagnóstico, lo anima a hablar con su médico, y puede acompañarlo en esa conversación si él lo pide.",
      },
    ],
    ideaClave:
      "Jesús tocó al leproso con misericordia, y Dios sustenta al enfermo sobre el lecho del dolor; el cuerpo se desgasta, pero el interior se renueva. El enfermo vive miedo, pérdida del control, soledad y preguntas sobre Dios. El capellán trabaja con el equipo del hospital, escucha, acompaña y guarda la confianza, sin dar noticias médicas ni opinar sobre el tratamiento.",
    paraLaVida: {
      texto: "El enfermo vale más que su enfermedad.",
      pregunta: "¿A qué enfermo puedes visitar esta semana?",
    },
  },
  {
    id: "capellania-2-2",
    objetivos: [
      "Explicar lo que enseña la declaración de fe sobre la sanidad divina.",
      "Orar por un enfermo con fe y con respeto, sin prometer lo que solo Dios decide.",
      "Acompañar a una familia que pide un milagro.",
    ],
    paraEmpezar:
      "En el hospital muchos piden oración, y algunos esperan un milagro. El capellán ora con fe, porque Dios sana, y con humildad, porque no sabe cómo responderá Dios. Nunca usa la oración para culpar al enfermo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Santiago 5:14-15" },
      {
        t: "parrafo",
        texto:
          "Santiago enseña: «Llame a los ancianos de la iglesia, y oren por él, ungiéndole con aceite en el nombre del Señor. Y la oración de fe salvará al enfermo, y el Señor lo levantará». La declaración de fe del ministerio enseña que Dios sana hoy en respuesta a la oración de fe, y que buscar su sanidad no se opone a recibir atención médica (artículo 11).",
      },
      { t: "versiculo", ref: "2 Reyes 20:5" },
      {
        t: "parrafo",
        texto:
          "Cuando el rey Ezequías estaba enfermo, Dios le respondió: «Yo he oído tu oración, y he visto tus lágrimas; he aquí que yo te sano».",
      },
      { t: "versiculo", ref: "2 Corintios 12:8-9" },
      {
        t: "parrafo",
        texto:
          "Pablo rogó tres veces que Dios le quitara su aguijón, y Dios le respondió: «Bástate mi gracia; porque mi poder se perfecciona en la debilidad». A veces Dios sana, y a veces da su gracia para sostenernos en la debilidad.",
      },
      { t: "versiculo", ref: "1 Timoteo 5:23" },
      {
        t: "parrafo",
        texto:
          "Y Pablo le aconsejó a Timoteo un remedio «por causa de tu estómago y de tus frecuentes enfermedades». La fe y la medicina no se oponen.",
      },
      {
        t: "nota",
        titulo: "Un punto por confirmar",
        texto:
          "Si la sanidad está provista en la expiación de Cristo es un punto de la declaración de fe por confirmar. El capellán ora con fe por la sanidad, sin abrir esa discusión junto a la cama del enfermo.",
      },
      { t: "subtitulo", texto: "Comparación: la oración que sostiene y la que hiere" },
      {
        t: "lista",
        items: [
          "Sostiene: pide la sanidad con fe y pone al enfermo en las manos de Dios. Hiere: promete que la persona se va a sanar.",
          "Sostiene: ora con palabras sencillas y breves. Hiere: hace una oración larga que cansa al enfermo.",
          "Sostiene: pide permiso y respeta la fe del paciente. Hiere: ora en voz alta sin preguntar.",
          "Sostiene: deja que Dios responda. Hiere: dice que el enfermo no sanó porque le faltó fe.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una familia que pide un milagro" },
      {
        t: "parrafo",
        texto:
          "Los hijos de doña Elena, que está muy grave, le piden al capellán que ore por un milagro y que les diga que su mamá se va a sanar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar su amor y su miedo, sin corregirlos.",
          "Paso 2, orar con ellos con fe, pidiendo la sanidad de doña Elena.",
          "Paso 3, ponerla en las manos de Dios: que se haga su voluntad y que les dé su paz.",
          "Paso 4, no prometer lo que solo Dios decide, pero recordarles que Dios está con ellos.",
          "Paso 5, animarlos a hablar con el médico de lo que está pasando, y ofrecerse a acompañarlos.",
          "Paso 6, volver a visitarlos, pase lo que pase.",
        ],
      },
    ],
    ideaClave:
      "La declaración de fe enseña que Dios sana hoy en respuesta a la oración de fe y que buscar su sanidad no se opone a la medicina; si la sanidad está en la expiación es un punto por confirmar. Dios sanó a Ezequías, y a Pablo le dio su gracia en la debilidad. El capellán ora con fe y con humildad: pide la sanidad, pone al enfermo en las manos de Dios, no promete lo que solo Dios decide y nunca lo culpa.",
    paraLaVida: {
      texto: "Dios sana, y su gracia basta.",
      pregunta: "¿Por qué enfermo puedes orar hoy con fe y con humildad?",
    },
  },
  {
    id: "capellania-2-3",
    objetivos: [
      "Explicar las normas de privacidad que protegen a los pacientes.",
      "Aplicar los cuidados de higiene y de seguridad en cada visita.",
      "Visitar con orden una unidad de cuidados intensivos.",
    ],
    paraEmpezar:
      "El hospital es un lugar donde la vida y la salud de las personas dependen del orden. El capellán respeta ese orden: cuida la privacidad de los pacientes, protege su salud y la propia, y coordina cada visita con el personal.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto:
          "Pablo lo pidió para la iglesia, y vale también para el hospital: «hágase todo decentemente y con orden».",
      },
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "Lo que el capellán ve y oye en el hospital no se cuenta: «Mas el de espíritu fiel lo guarda todo».",
      },
      { t: "versiculo", ref: "Filipenses 2:4" },
      {
        t: "parrafo",
        texto:
          "Y piensa primero en el bien del paciente: «no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».",
      },
      { t: "subtitulo", texto: "La privacidad de los pacientes" },
      {
        t: "parrafo",
        texto:
          "En los Estados Unidos, la ley de privacidad de la salud (HIPAA) protege la información de los pacientes. Según el Departamento de Salud y Servicios Humanos, el hospital puede darle al clero el nombre del paciente, el lugar donde está, su estado general y su afiliación religiosa, aunque no pregunte por su nombre, siempre que el paciente haya sido informado y no se haya opuesto. El capellán no busca más información de la que necesita, y no la comparte.",
      },
      { t: "subtitulo", texto: "Los cuidados en cada visita" },
      {
        t: "lista",
        items: [
          "Lavarse las manos o usar el gel antes y después de cada visita.",
          "Seguir las indicaciones de aislamiento: bata, guantes o mascarilla cuando se piden.",
          "No visitar cuando uno está enfermo o con fiebre, para no contagiar a nadie.",
          "No dar comida ni bebida sin preguntar al personal.",
          "No tocar los equipos médicos ni mover al paciente.",
          "No sacar fotos ni publicar nada del hospital en las redes.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la sala común y la unidad de cuidados intensivos" },
      {
        t: "lista",
        items: [
          "En la sala común: la visita puede ser más larga. En cuidados intensivos: la visita es corta y se coordina con la enfermera.",
          "En la sala común: el paciente suele poder hablar. En cuidados intensivos: muchas veces no puede, pero puede oír, y el capellán le habla con calma.",
          "En las dos: se guarda la privacidad y se cuida la higiene.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una visita en cuidados intensivos" },
      {
        t: "parrafo",
        texto:
          "La familia de Martín, que está conectado a un respirador, pide que el capellán ore por él.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, hablar con la enfermera para saber si es un buen momento y qué cuidados pide.",
          "Paso 2, lavarse las manos y ponerse lo que pide el aislamiento.",
          "Paso 3, saludar a la familia y acercarse a Martín sin tocar los equipos.",
          "Paso 4, hablarle con calma, aunque no pueda responder, y leer un salmo corto.",
          "Paso 5, orar con la familia, de manera breve.",
          "Paso 6, salir, lavarse las manos y acompañar un momento a la familia en la sala de espera.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca publiques en las redes una foto, un nombre o una historia del hospital, aunque sea para pedir oración. Eso viola la privacidad del paciente.",
      },
    ],
    ideaClave:
      "Todo debe hacerse decentemente y con orden, el de espíritu fiel guarda lo que sabe, y cada uno mira también por lo de los otros. En el hospital, la ley de privacidad de la salud (HIPAA) permite darle al clero el nombre, el lugar, el estado general y la afiliación religiosa del paciente si este no se opuso; el capellán no busca más ni lo comparte. Cuida la higiene en cada visita y, en cuidados intensivos, coordina con la enfermera y visita poco tiempo.",
    paraLaVida: {
      texto: "El orden también es una forma de amor.",
      pregunta: "¿Qué cuidado de la privacidad de otros necesitas mejorar?",
    },
  },
  {
    id: "capellania-2-4",
    objetivos: [
      "Explicar qué son los cuidados paliativos, el hospicio y las voluntades anticipadas.",
      "Acompañar a un paciente en sus últimas horas y a su familia.",
      "Sostener la esperanza cristiana junto a la cama del que muere.",
    ],
    paraEmpezar:
      "Acompañar a alguien que muere es uno de los servicios más sagrados del capellán. No se trata de tener las palabras perfectas, sino de estar, orar, consolar a la familia y dejar que la esperanza de Cristo llene ese momento.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", titulo: "Resumen del libro de Juan (parte 2): la última cena, la cruz y la resurrección", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Salmos 23:4" },
      {
        t: "parrafo",
        texto:
          "El salmo acompaña al que muere: «Aunque ande en valle de sombra de muerte, No temeré mal alguno, porque tú estarás conmigo».",
      },
      { t: "versiculo", ref: "Juan 14:1-3" },
      {
        t: "parrafo",
        texto:
          "Jesús consoló a los suyos antes de partir: «No se turbe vuestro corazón», «voy, pues, a preparar lugar para vosotros».",
      },
      { t: "versiculo", ref: "Lucas 23:42-43" },
      {
        t: "parrafo",
        texto:
          "En la cruz, un ladrón le pidió: «Acuérdate de mí cuando vengas en tu reino», y Jesús le respondió: «De cierto te digo que hoy estarás conmigo en el paraíso». Nunca es tarde para volverse a Cristo.",
      },
      { t: "versiculo", ref: "2 Timoteo 4:6-8" },
      {
        t: "parrafo",
        texto:
          "Y Pablo enfrentó su muerte con paz: «He peleado la buena batalla, he acabado la carrera, he guardado la fe».",
      },
      { t: "subtitulo", texto: "Lo que conviene saber" },
      {
        t: "lista",
        items: [
          "Los cuidados paliativos, según la Organización Mundial de la Salud, mejoran la calidad de vida de los pacientes y de sus familias frente a una enfermedad potencialmente mortal, y atienden sus necesidades físicas, psicológicas, sociales y espirituales.",
          "En los Estados Unidos, el hospicio de Medicare se ofrece cuando el médico certifica que, si la enfermedad sigue su curso normal, a la persona le quedan seis meses de vida o menos.",
          "En Texas, la Ley de Voluntades Anticipadas (Código de Salud y Seguridad, capítulo 166) reconoce la directiva a los médicos, el poder médico y la orden de no reanimar fuera del hospital. El capellán no llena esos papeles: anima a la familia a hablar de ellos con el médico o con el trabajador social. Lo legal es una guía general, no un consejo legal.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: las últimas horas de doña Carmen" },
      {
        t: "parrafo",
        texto:
          "Doña Carmen, de ochenta y cinco años, está muriendo en el hospital. Su familia llama al capellán.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, llegar con calma, presentarse y preguntar a la familia cómo están y qué desean.",
          "Paso 2, acercarse a doña Carmen, tomar su mano si la familia lo permite y hablarle con suavidad, porque muchas veces el que muere todavía oye.",
          "Paso 3, leer un salmo, como el 23, y orar con palabras sencillas de entrega y de esperanza.",
          "Paso 4, invitar a la familia a despedirse: decirle que la aman, darle gracias, pedirle perdón o perdonarla.",
          "Paso 5, quedarse en silencio con ellos el tiempo que haga falta.",
          "Paso 6, cuando muera, acompañar a la familia, orar con ellos y ayudarles a dar los primeros pasos con el personal.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si la persona que muere es de otra fe, el capellán respeta sus ritos y llama a su líder religioso si la familia lo pide. Y si alguien quiere volverse a Cristo al final de su vida, el capellán lo acompaña con sencillez, como Jesús al ladrón en la cruz.",
      },
    ],
    ideaClave:
      "En el valle de sombra de muerte el Señor está con nosotros; Jesús fue a preparar lugar, y al ladrón en la cruz le prometió el paraíso. El capellán acompaña al que muere y a su familia: está, ora, lee la Palabra, ayuda a despedirse y se queda. Conoce los cuidados paliativos, el hospicio y las voluntades anticipadas de Texas (Código de Salud y Seguridad, capítulo 166), pero no llena esos papeles: anima a hablarlos con el equipo médico.",
    paraLaVida: {
      texto: "Nunca es tarde para volverse a Cristo.",
      pregunta: "¿Estás preparado para acompañar a alguien en sus últimas horas?",
    },
  },
  {
    id: "capellania-2-5",
    objetivos: [
      "Acompañar a una familia cuyo hijo está gravemente enfermo.",
      "Acompañar a unos padres que pierden un embarazo o un bebé.",
      "Ayudar a la familia a despedirse y a guardar recuerdos.",
    ],
    paraEmpezar:
      "No hay dolor más grande en un hospital que el de unos padres que ven sufrir o morir a su hijo. Allí el capellán no explica nada: acompaña, ora y ayuda a los padres a vivir ese momento con amor.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=s-K5s7YpUC8", titulo: "Resumen del libro de Isaías (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Mateo 19:14" },
      {
        t: "parrafo",
        texto:
          "Jesús abrió los brazos a los niños: «Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de los cielos».",
      },
      { t: "versiculo", ref: "Salmos 139:13" },
      {
        t: "parrafo",
        texto:
          "Dios conoce y ama cada vida desde el vientre: «Porque tú formaste mis entrañas; Tú me hiciste en el vientre de mi madre».",
      },
      { t: "versiculo", ref: "Salmos 139:16" },
      {
        t: "parrafo",
        texto:
          "Por eso un bebé que murió antes de nacer no fue ignorado por Dios: «Mi embrión vieron tus ojos».",
      },
      { t: "versiculo", ref: "Isaías 49:15-16" },
      {
        t: "parrafo",
        texto:
          "Y Dios promete a los suyos: «Aunque olvide ella, yo nunca me olvidaré de ti. He aquí que en las palmas de las manos te tengo esculpida».",
      },
      { t: "subtitulo", texto: "Cómo acompañar a unos padres" },
      {
        t: "lista",
        items: [
          "Llamar al bebé por su nombre, si se lo pusieron.",
          "Reconocer la pérdida como una pérdida verdadera, sin importar el tiempo de embarazo.",
          "Preguntarles si desean cargar al bebé, tomarle fotos o guardar sus huellas, como ofrecen muchos hospitales.",
          "Ofrecer una oración o una bendición, respetando su fe; si su tradición pide un rito, como el bautismo en la Iglesia católica, avisar enseguida a su sacerdote.",
          "No decirles que pronto tendrán otro hijo, ni que fue la voluntad de Dios para algo mejor.",
          "Cuidar también a los hermanos y a los abuelos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: las palabras que acompañan y las que hieren" },
      {
        t: "lista",
        items: [
          "Acompañan: siento mucho la muerte de Sara. Hieren: por lo menos era muy chiquita.",
          "Acompañan: ¿quieren contarme de ella? Hieren: ya tendrán otro.",
          "Acompañan: Dios no se olvida de ella ni de ustedes. Hieren: Dios necesitaba otro angelito.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una pérdida a las treinta semanas" },
      {
        t: "parrafo",
        texto:
          "Lucía y Marcos perdieron a su hija a las treinta semanas de embarazo. Le habían puesto el nombre de Sara.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, entrar con respeto, sentarse y decir: siento mucho la muerte de Sara.",
          "Paso 2, escuchar a los dos, que pueden vivir el dolor de maneras distintas.",
          "Paso 3, preguntarles si quieren cargar a Sara o guardar un recuerdo, como ofrece el hospital.",
          "Paso 4, ofrecerles orar por ellos y leer Isaías 49.",
          "Paso 5, preguntarles si quieren que avise a su pastor o a su familia.",
          "Paso 6, después del alta, pedirles permiso para que la iglesia los siga acompañando, y recordar la fecha en que nació Sara.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los padres que pierden un bebé pueden sufrir un duelo largo y en silencio, porque muchos no lo reconocen. Si después de un tiempo no pueden llevar su vida, conviene buscar ayuda profesional, como se vio en Duelo y crisis.",
      },
    ],
    ideaClave:
      "Jesús pidió dejar que los niños fueran a él, y Dios forma cada vida en el vientre y nunca se olvida de los suyos. Ante un hijo enfermo o la pérdida de un embarazo o de un bebé, el capellán acompaña: llama al bebé por su nombre, reconoce la pérdida, ayuda a despedirse y a guardar recuerdos, ora respetando la fe de la familia y no dice frases que hieren.",
    paraLaVida: {
      texto: "Ninguna vida es olvidada por Dios.",
      pregunta: "¿Qué familia que perdió un bebé necesita que alguien recuerde su nombre?",
    },
  },
  {
    id: "capellania-2-6",
    objetivos: [
      "Acompañar a una familia en una decisión difícil sobre el tratamiento.",
      "Explicar el lugar del capellán en una reunión con el equipo médico.",
      "Cuidar al personal después de una muerte o de un caso difícil.",
    ],
    paraEmpezar:
      "En el hospital hay decisiones muy duras: seguir o no con un tratamiento, conectar o desconectar un respirador. La familia sufre, y el personal también. El capellán no decide por nadie, pero ayuda a cada uno a pensar a la luz de su fe y a no quedarse solo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Eclesiastés 3:1-2" },
      {
        t: "parrafo",
        texto:
          "El sabio lo dice con sencillez: «Todo tiene su tiempo», «Tiempo de nacer, y tiempo de morir».",
      },
      { t: "versiculo", ref: "Filipenses 1:21-23" },
      {
        t: "parrafo",
        texto:
          "Y para el creyente la muerte no es el final: «Porque para mí el vivir es Cristo, y el morir es ganancia», «teniendo deseo de partir y estar con Cristo, lo cual es muchísimo mejor».",
      },
      { t: "versiculo", ref: "Proverbios 11:14" },
      {
        t: "parrafo",
        texto:
          "Las decisiones difíciles se toman mejor acompañados: «Mas en la multitud de consejeros hay seguridad». Por eso se piensan con el equipo médico, con la familia y, si hace falta, con el comité de ética del hospital.",
      },
      { t: "versiculo", ref: "Gálatas 6:2" },
      {
        t: "parrafo",
        texto:
          "Y nadie debe cargarlas solo: «Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».",
      },
      { t: "subtitulo", texto: "El lugar del capellán en una decisión difícil" },
      {
        t: "lista",
        items: [
          "Ayuda a la familia a decir lo que su ser querido quería y lo que su fe les enseña.",
          "Ayuda a que pregunten al médico lo que no entienden.",
          "No da opiniones médicas ni decide por la familia.",
          "Ora con ellos, antes y después de decidir.",
          "Les recuerda que, aunque un tratamiento ya no ayude, el cuidado, el alivio del dolor y el amor siguen.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el capellán que acompaña la decisión y el que la impone" },
      {
        t: "lista",
        items: [
          "Acompaña: escucha a todos. Impone: dice lo que hay que hacer.",
          "Acompaña: ayuda a entender lo que dijo el médico. Impone: contradice al médico.",
          "Acompaña: respeta la fe y los valores de la familia. Impone: pone sus propias opiniones.",
          "Acompaña: se queda después de la decisión. Impone: se va cuando ya dijo lo suyo.",
        ],
      },
      { t: "subtitulo", texto: "El cuidado del personal" },
      {
        t: "lista",
        items: [
          "Después de una muerte difícil, ofrecer al equipo un momento para orar o para conversar.",
          "Estar atento a las enfermeras y a los médicos cansados o tristes.",
          "Escuchar sin juzgar, y guardar la confianza.",
          "Recordar que el capellán también necesita hablar con alguien de lo que vive.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una reunión de la familia con el equipo médico" },
      {
        t: "parrafo",
        texto:
          "Los médicos le van a explicar a la familia de don Luis que el respirador ya no lo va a curar, y la familia pide que esté el capellán.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, antes de la reunión, preguntarle a la familia qué sabe y qué teme.",
          "Paso 2, en la reunión, sentarse con la familia y escuchar a los médicos.",
          "Paso 3, ayudar a la familia a hacer sus preguntas y a decir lo que don Luis quería.",
          "Paso 4, no opinar sobre lo médico ni presionar a nadie.",
          "Paso 5, orar con la familia, si lo desea, antes de decidir.",
          "Paso 6, quedarse con ellos después, y cuidar también al personal que acompañó el caso.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si hay un desacuerdo grave entre la familia y el equipo médico, muchos hospitales tienen un comité de ética que ayuda a pensar. El capellán puede sugerir que lo consulten.",
      },
    ],
    ideaClave:
      "Todo tiene su tiempo, también el de morir, y para el creyente partir y estar con Cristo es muchísimo mejor; en la multitud de consejeros hay seguridad. En una decisión difícil, el capellán acompaña sin decidir: ayuda a la familia a decir lo que su ser querido quería, a preguntar al médico y a orar, y se queda después. Cuida también al personal, y busca quién lo cuide a él.",
    paraLaVida: {
      texto: "Acompañar no es decidir por otros.",
      pregunta: "¿Quién te acompaña a ti cuando vives algo difícil?",
    },
  },
];
