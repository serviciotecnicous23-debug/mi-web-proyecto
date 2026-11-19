/**
 * Especialidad Comunicaciones y medios · Materia 2 — Radio cristiana (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la radio al servicio del evangelio (KDKA y
 * la iglesia del Calvario en 1921, HCJB en Quito en 1931, comprobados), la voz y el micrófono, la programación, la música
 * y los derechos de autor (las sociedades de autores, SoundExchange y la licencia de CCLI, comprobados), la radio al aire
 * y sus reglas (la licencia de la FCC, la FM de baja potencia, la identificación de 47 CFR 73.1201 y los patrocinadores de
 * las emisoras no comerciales, comprobados) y los oyentes. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const COMUNICACIONES_2: LeccionContenido[] = [
  {
    id: "comunicaciones-2-1",
    objetivos: [
      "Explicar, con Romanos 10, por qué la radio sirve para que el evangelio se oiga.",
      "Contar cómo empezó la radio cristiana, con una de las primeras transmisiones de un culto y con HCJB.",
      "Decidir qué clase de radio le conviene a una iglesia: por internet, de baja potencia o un programa en otra emisora.",
    ],
    paraEmpezar:
      "La radio llega a la cocina, al auto, al trabajo y al teléfono. Muchas personas que nunca entrarían a una iglesia escuchan una canción, una oración o una palabra de esperanza mientras hacen otra cosa. Por eso la radio sigue siendo una gran herramienta para el evangelio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 10:14-15" },
      {
        t: "parrafo",
        texto:
          "Pablo pregunta: «¿Y cómo oirán sin haber quien les predique?». Y celebra a los mensajeros: «¡Cuán hermosos son los pies de los que anuncian la paz, de los que anuncian buenas nuevas!».",
      },
      { t: "versiculo", ref: "Romanos 10:17" },
      {
        t: "parrafo",
        texto: "«Así que la fe es por el oír, y el oír, por la palabra de Dios». La radio es un medio para oír.",
      },
      { t: "versiculo", ref: "Salmos 19:4" },
      {
        t: "parrafo",
        texto:
          "Los cielos hablan de Dios en todo el mundo: «Por toda la tierra salió su voz, Y hasta el extremo del mundo sus palabras».",
      },
      { t: "subtitulo", texto: "Cómo empezó la radio cristiana" },
      {
        t: "lista",
        items: [
          "El 2 de enero de 1921, la emisora KDKA de Pittsburgh transmitió el culto vespertino de la iglesia episcopal del Calvario, una de las primeras transmisiones religiosas por radio.",
          "El 25 de diciembre de 1931 salió al aire HCJB, en Quito, Ecuador, fundada por el misionero Clarence Jones: una de las primeras radios misioneras, que llegó a muchos países.",
          "Hoy, además de las emisoras de AM y FM, hay radios por internet que se escuchan en el teléfono desde cualquier lugar.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: tres maneras de estar en la radio" },
      {
        t: "lista",
        items: [
          "Una radio por internet: no necesita una licencia de la FCC para transmitir, pero sí las licencias de la música; se escucha en todo el mundo.",
          "Una emisora FM de baja potencia: necesita una licencia de la FCC, es solo para organizaciones sin fines de lucro y llega a unos 5,6 kilómetros a la redonda.",
          "Un programa en una emisora que ya existe: se compra o se recibe un espacio, y se siguen las reglas de esa emisora.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la iglesia que quiere una radio" },
      {
        t: "parrafo",
        texto:
          "La iglesia quiere tener su propia radio para llevar el evangelio a su ciudad y a sus familias que viven en otros países.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y escribir el propósito: a quién quiere llegar y con qué mensaje.",
          "Paso 2, elegir la manera: como muchas de sus familias están lejos, empieza con una radio por internet.",
          "Paso 3, formar un equipo: un encargado de la programación, alguien para la parte técnica y voces que hablen bien.",
          "Paso 4, conseguir las licencias de la música antes de transmitir, y escribir un presupuesto para cada mes.",
          "Paso 5, empezar con pocas horas bien hechas, en vez de muchas horas sin cuidado.",
          "Paso 6, avisarles a la iglesia y a sus familias cómo escucharla, y pedirles sus comentarios.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una radio es un ministerio de largo plazo: cuesta dinero, tiempo y gente cada mes. Antes de empezar, la iglesia calcula el costo, como enseña Jesús en Lucas 14:28.",
      },
    ],
    ideaClave:
      "La fe viene por el oír, y el oír por la palabra de Dios; nadie oye si no hay quien predique. La radio cristiana empezó en 1921 con un culto transmitido desde Pittsburgh, y en 1931 HCJB salió al aire en Quito. Hoy una iglesia puede tener una radio por internet, una emisora de baja potencia o un programa en otra emisora, y empieza con un propósito, un equipo, las licencias y pocas horas bien hechas.",
    paraLaVida: {
      texto: "La fe viene por el oír: alguien tiene que hablar.",
      pregunta: "¿Quién de tu familia o de tu barrio escucha la radio y necesita una buena noticia?",
    },
  },
  {
    id: "comunicaciones-2-2",
    objetivos: [
      "Explicar, con Nehemías 8:8, por qué en la radio hay que hablar con claridad.",
      "Usar la voz con claridad, calidez y buen ritmo frente al micrófono.",
      "Preparar y grabar un mensaje corto para la radio.",
    ],
    paraEmpezar:
      "En la radio no hay caras ni gestos: solo la voz. El oyente no puede volver atrás para preguntar lo que no entendió. Por eso el que habla en la radio prepara lo que va a decir y lo dice con claridad, como si conversara con una sola persona.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Nehemías 8:8" },
      {
        t: "parrafo",
        texto:
          "Cuando Esdras le leyó la ley al pueblo, los que leían lo hacían así: «Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».",
      },
      { t: "versiculo", ref: "Proverbios 15:23" },
      {
        t: "parrafo",
        texto:
          "«Y la palabra a su tiempo, ¡cuán buena es!». En la radio, la palabra justa y breve vale más que un discurso largo.",
      },
      { t: "versiculo", ref: "Colosenses 4:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo pedía oración «para que el Señor nos abra puerta para la palabra», y «para que lo manifieste como debo hablar».",
      },
      { t: "subtitulo", texto: "La voz en la radio" },
      {
        t: "lista",
        items: [
          "Claridad: pronunciar bien, sin comerse las palabras, y usar frases cortas.",
          "Calidez: hablar como a un amigo, con una sonrisa que se nota en la voz.",
          "Ritmo: ni muy rápido ni muy lento, con pausas para que el oyente piense.",
          "Una sola persona: hablarle al oyente como si fuera uno solo, no a una multitud.",
          "Lo que se repite: el nombre de la radio, la hora y la idea principal, porque siempre llegan oyentes nuevos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: escribir para leer y escribir para oír" },
      {
        t: "lista",
        items: [
          "Para leer: frases largas, con muchas comas. Para oír: frases cortas, una idea en cada frase.",
          "Para leer: palabras difíciles que se pueden releer. Para oír: palabras de todos los días.",
          "Para leer: números exactos y largos. Para oír: números redondos y fáciles de recordar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un mensaje de dos minutos" },
      {
        t: "parrafo",
        texto:
          "El encargado de la programación te pide un mensaje de ánimo de dos minutos para el programa de la mañana.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y elegir un solo versículo y una sola idea, por ejemplo Mateo 11:28.",
          "Paso 2, escribir unas doscientas cincuenta palabras, con frases cortas, como si le hablaras a una persona cansada que va a su trabajo.",
          "Paso 3, leerlo en voz alta y cambiar lo que suena difícil.",
          "Paso 4, grabar en un lugar callado, con el micrófono a un palmo de la boca y sin golpes de aire.",
          "Paso 5, escuchar la grabación: si hay errores o ruido, volver a grabar.",
          "Paso 6, terminar con una invitación clara, como orar o escuchar el programa de la noche, y entregarlo a tiempo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo que se dice en la radio lo escucha gente de todas las edades y de todas las creencias. El que habla cuida sus palabras, no ataca a nadie al aire y no da por la radio los datos de los que piden oración.",
      },
    ],
    ideaClave:
      "Los que leían la ley lo hacían claramente y ponían el sentido para que el pueblo entendiera, la palabra a su tiempo es buena, y Pablo pedía saber cómo hablar. En la radio solo hay voz: se habla con claridad, calidez y buen ritmo, como a una sola persona, y se repite lo importante. Se escribe para oír, con frases cortas y palabras sencillas, y cada mensaje se prepara, se graba y se escucha antes de entregarlo.",
    paraLaVida: {
      texto: "Hablo para que me entiendan, no para que me admiren.",
      pregunta: "¿Qué versículo podrías explicarle en dos minutos a alguien cansado?",
    },
  },
  {
    id: "comunicaciones-2-3",
    objetivos: [
      "Explicar, con Eclesiastés 3:1, por qué cada programa tiene su hora.",
      "Describir los tipos de programas de una radio cristiana.",
      "Armar la parrilla de programas de un día.",
    ],
    paraEmpezar:
      "Una radio no es solo poner canciones. La programación decide qué se oye a cada hora, pensando en quién escucha: el que se levanta temprano, la madre en la cocina, el trabajador en su auto, los niños después de la escuela y el que no puede dormir.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Eclesiastés 3:1" },
      {
        t: "parrafo",
        texto:
          "«Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora». También en la radio cada programa tiene su hora.",
      },
      { t: "versiculo", ref: "Salmos 96:1-3" },
      {
        t: "parrafo",
        texto:
          "El salmo invita: «Cantad a Jehová cántico nuevo», y «Anunciad de día en día su salvación». La radio canta y anuncia cada día.",
      },
      { t: "versiculo", ref: "Efesios 5:19" },
      {
        t: "parrafo",
        texto:
          "Pablo habla de cantar «con salmos, con himnos y cánticos espirituales». En la radio hay lugar para la música de muchas épocas y estilos.",
      },
      { t: "subtitulo", texto: "Los programas de una radio cristiana" },
      {
        t: "lista",
        items: [
          "La música: alabanza, himnos y cantos de distintos estilos, elegidos por su letra y su calidad.",
          "La Palabra: la lectura de la Biblia, los estudios bíblicos y las predicaciones.",
          "Los mensajes cortos: reflexiones de uno o dos minutos entre canción y canción.",
          "La oración: un espacio para orar con los oyentes y por sus pedidos.",
          "Los programas especiales: para niños, para jóvenes y para las familias, y las noticias de la comunidad.",
          "Las cuñas y las identificaciones: el nombre de la radio, la hora y los avisos de la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una programación pensada y una improvisada" },
      {
        t: "lista",
        items: [
          "Pensada: cada hora tiene un propósito y un público. Improvisada: se pone lo que hay.",
          "Pensada: las canciones se eligen por su letra y su doctrina. Improvisada: cualquier canción que suena bonita.",
          "Pensada: los programas empiezan a tiempo. Improvisada: el oyente nunca sabe qué va a escuchar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la parrilla de un día" },
      {
        t: "parrafo",
        texto: "La radio por internet de la iglesia quiere ordenar su programación de lunes a viernes.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, pensar quién escucha a cada hora: temprano, los que van al trabajo; a media mañana, las madres en casa; en la tarde, los niños; en la noche, las familias.",
          "Paso 2, de 6 a 9 de la mañana: alabanza alegre, la Biblia en un minuto y un mensaje de ánimo.",
          "Paso 3, de 9 a 12: música tranquila, un estudio bíblico y un espacio de oración.",
          "Paso 4, de 3 a 5 de la tarde: un programa para niños, con historias de la Biblia y cantos.",
          "Paso 5, de 7 a 9 de la noche: una predicación y un programa para la familia; después, música e himnos para la madrugada.",
          "Paso 6, poner la identificación de la radio cada hora, y revisar la parrilla cada tres meses con lo que dicen los oyentes.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las canciones se eligen con cuidado: la letra debe estar de acuerdo con la Biblia. Si hay una duda sobre la doctrina de una canción, se le pregunta al pastor antes de ponerla al aire.",
      },
    ],
    ideaClave:
      "Todo tiene su tiempo, y cada programa tiene su hora; el salmo invita a cantar cántico nuevo y a anunciar cada día la salvación, con salmos, himnos y cánticos espirituales. Una radio cristiana tiene música, Palabra, mensajes cortos, oración, programas especiales y sus identificaciones. La programación se piensa según quién escucha a cada hora, se arma en una parrilla, empieza a tiempo y se revisa con lo que dicen los oyentes.",
    paraLaVida: {
      texto: "Cada hora del día es una oportunidad para anunciar a Cristo.",
      pregunta: "¿A qué hora del día necesitarías tú una palabra de ánimo?",
    },
  },
  {
    id: "comunicaciones-2-4",
    objetivos: [
      "Explicar, con la Biblia, por qué se respetan los derechos de autor.",
      "Distinguir las licencias que necesita una radio: las de las canciones y las de las grabaciones.",
      "Poner en regla la música de una radio por internet.",
    ],
    paraEmpezar:
      "Cada canción tiene dueños: el que la escribió, el que la publicó y el que la grabó. Usarla sin permiso es tomar lo que no es nuestro, aunque sea para Dios. Una radio cristiana también da testimonio en la manera en que paga lo que usa.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "Éxodo 20:15" },
      {
        t: "parrafo",
        texto: "El mandamiento es corto y claro: «No hurtarás».",
      },
      { t: "versiculo", ref: "Romanos 13:7" },
      {
        t: "parrafo",
        texto: "Pablo pide: «Pagad a todos lo que debéis».",
      },
      { t: "versiculo", ref: "Lucas 10:7" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó que «el obrero es digno de su salario». Los que escriben y graban la música también trabajan.",
      },
      { t: "subtitulo", texto: "Las licencias de una radio por internet" },
      {
        t: "lista",
        items: [
          "Las canciones, es decir, la letra y la música: sus licencias se piden a las sociedades de autores, como ASCAP, BMI, SESAC y GMR, según el catálogo de cada canción.",
          "Las grabaciones: para transmitirlas por internet sin que el oyente elija la canción, SoundExchange administra una licencia que fija la ley, y las radios no comerciales pagan según sus propias tarifas.",
          "Lo que esa licencia no cubre: los pódcasts, las descargas, ni que el oyente escoja qué canción escuchar.",
          "Los cultos transmitidos: para las canciones de la alabanza, muchas iglesias usan la licencia de transmisión de CCLI, que se suma a su licencia de derechos de autor.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la música en regla y la música sin permiso" },
      {
        t: "lista",
        items: [
          "En regla: la radio tiene sus licencias y lleva el registro de lo que suena. Sin permiso: pone lo que encuentra en internet.",
          "En regla: el que crea recibe lo que le corresponde. Sin permiso: el creador no recibe nada.",
          "En regla: la radio puede crecer sin miedo. Sin permiso: se arriesga a reclamos y cierres, y pierde su testimonio.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: poner en regla la música" },
      {
        t: "parrafo",
        texto:
          "La radio por internet de la iglesia empezó poniendo canciones cristianas que bajó de internet, sin ninguna licencia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, detener lo que no está en regla, y explicarle al equipo por qué.",
          "Paso 2, averiguar qué licencias necesita: las de las canciones, con las sociedades de autores, y la de las grabaciones, con SoundExchange.",
          "Paso 3, pedir los precios para una radio no comercial, y ponerlos en el presupuesto.",
          "Paso 4, usar un programa de transmisión que lleve el registro de cada canción que suena, porque las licencias lo piden.",
          "Paso 5, buscar también música que sus autores permiten usar, con su permiso por escrito.",
          "Paso 6, volver al aire en regla, y revisar las licencias cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las reglas y los precios de las licencias cambian. Esta lección es una guía general, no un consejo legal: ante una duda, se pregunta a la sociedad de autores, a SoundExchange o a un abogado.",
      },
      {
        t: "cuadro",
        titulo: "Las licencias de la música en una radio por internet",
        columnas: ["Lo que suena", "Quién da la licencia", "Lo que hay que saber"],
        filas: [
          ["La canción: la letra y la música", "Las sociedades de autores: ASCAP, BMI, SESAC y GMR", "Se pide según el catálogo de cada canción"],
          ["La grabación transmitida por internet", "SoundExchange, con una licencia que fija la ley", "Las radios no comerciales pagan según sus propias tarifas"],
          ["Lo que esa licencia no cubre", "Hace falta otro permiso", "Los pódcasts, las descargas y que el oyente escoja la canción"],
          ["La alabanza de un culto transmitido", "CCLI, con su licencia de transmisión", "Se suma a la licencia de derechos de autor de la iglesia"],
        ],
      },
    ],
    ideaClave:
      "No hurtarás, pagad a todos lo que debéis, y el obrero es digno de su salario. Cada canción tiene dueños: las canciones se licencian con las sociedades de autores, como ASCAP, BMI, SESAC y GMR, y las grabaciones que suenan por internet, con SoundExchange, cuya licencia no cubre los pódcasts ni las descargas; para los cultos, muchas iglesias usan la licencia de CCLI. Una radio en regla tiene sus licencias, lleva su registro y da testimonio también en la manera en que paga.",
    paraLaVida: {
      texto: "Respetar el trabajo de otros también es honrar a Dios.",
      pregunta: "¿Hay algo que usas sin pagar y que deberías poner en regla?",
    },
  },
  {
    id: "comunicaciones-2-5",
    objetivos: [
      "Explicar, con Tito 3:1 y 1 Pedro 2:13, por qué la radio cristiana obedece las reglas.",
      "Explicar las reglas básicas de una emisora FM no comercial: la licencia, la identificación y el apoyo de los patrocinadores.",
      "Responder a un patrocinador que pide un anuncio que la regla no permite.",
    ],
    paraEmpezar:
      "Las emisoras que salen al aire usan ondas que son de todos, y por eso la FCC, la comisión federal de comunicaciones, les da su licencia y les pone reglas. Una radio cristiana obedece esas reglas como parte de su testimonio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Tito 3:1" },
      {
        t: "parrafo",
        texto:
          "Pablo le pide a Tito: «Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan, que estén dispuestos a toda buena obra».",
      },
      { t: "versiculo", ref: "1 Pedro 2:13-14" },
      {
        t: "parrafo",
        texto: "Y Pedro escribe: «Por causa del Señor someteos a toda institución humana».",
      },
      { t: "versiculo", ref: "Lucas 16:10" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «El que es fiel en lo muy poco, también en lo más es fiel». Una identificación a tiempo también es fidelidad.",
      },
      { t: "subtitulo", texto: "Las reglas básicas de una emisora no comercial" },
      {
        t: "lista",
        items: [
          "La licencia: ninguna emisora de AM o FM puede salir al aire sin una licencia de la FCC.",
          "La FM de baja potencia: es solo educativa y no comercial, para organizaciones sin fines de lucro, como las iglesias; con 100 vatios llega a unos 5,6 kilómetros a la redonda, y se pide cuando la FCC abre un período para solicitarla, como el de diciembre de 2023.",
          "La identificación: al empezar y al terminar cada tiempo de transmisión, y cada hora, lo más cerca posible de la hora en punto, la emisora dice sus letras de llamada y la ciudad de su licencia.",
          "Los patrocinadores: la emisora puede decir quién la apoya, a qué se dedica y dónde está, pero no puede llamar a comprar ni ofrecer descuentos o regalos para que compren.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un agradecimiento permitido y un anuncio comercial" },
      {
        t: "lista",
        items: [
          "Permitido: este programa es posible gracias a la Panadería La Espiga, en la calle Main. No permitido: vaya hoy a la Panadería La Espiga.",
          "Permitido: la Panadería La Espiga, panes y pasteles desde 1990. No permitido: compre hoy y reciba un veinte por ciento de descuento.",
          "Permitido: una información breve y objetiva. No permitido: la promoción de lo que se vende.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el patrocinador que quiere un anuncio" },
      {
        t: "parrafo",
        texto:
          "La emisora FM de baja potencia de la iglesia recibe el apoyo de un taller mecánico, y el dueño quiere que digan: traiga su auto hoy y le damos el cambio de aceite gratis.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecerle su apoyo y explicarle con amabilidad que una emisora no comercial no puede llamar a comprar ni ofrecer regalos.",
          "Paso 2, proponerle lo que sí se permite: el nombre del taller, a qué se dedica y dónde está.",
          "Paso 3, escribir el texto juntos: este programa es posible gracias al Taller Hermanos García, mecánica general, en la calle Elm.",
          "Paso 4, revisar el texto con el encargado de la emisora antes de grabarlo.",
          "Paso 5, guardar en los archivos de la emisora el texto que salió al aire.",
          "Paso 6, si hay una duda, preguntarle a un abogado que conozca las reglas de la FCC.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una radio que solo transmite por internet no necesita una licencia de la FCC, pero sí necesita las licencias de la música. Lo legal de esta lección es una guía general, no un consejo legal.",
      },
      {
        t: "cuadro",
        titulo: "El patrocinio en una emisora no comercial",
        columnas: ["Se puede decir", "No se puede decir"],
        filas: [
          ["Quién apoya el programa: gracias a la Panadería La Espiga", "Una llamada a comprar: vaya hoy a la Panadería La Espiga"],
          ["A qué se dedica: panes y pasteles desde 1990", "Descuentos o regalos: compre hoy y reciba un veinte por ciento de descuento"],
          ["Dónde está: en la calle Main", "La promoción de lo que se vende"],
        ],
      },
    ],
    ideaClave:
      "La Biblia pide sujetarse a las autoridades y someterse a toda institución humana, y ser fieles en lo poco. Ninguna emisora de AM o FM sale al aire sin una licencia de la FCC; la FM de baja potencia es educativa, no comercial y para organizaciones sin fines de lucro. La emisora se identifica cada hora con sus letras de llamada y su ciudad, y a sus patrocinadores solo los agradece de forma objetiva, sin llamar a comprar ni ofrecer descuentos.",
    paraLaVida: {
      texto: "Obedecer las reglas también es parte del testimonio.",
      pregunta: "¿En qué detalle pequeño puedes ser más fiel esta semana?",
    },
  },
  {
    id: "comunicaciones-2-6",
    objetivos: [
      "Explicar, con Juan 10:27 y Santiago 1:19, por qué la radio también escucha.",
      "Atender con cuidado las llamadas y los pedidos de oración al aire.",
      "Acompañar a un oyente en crisis que llama durante un programa en vivo.",
    ],
    paraEmpezar:
      "Detrás de cada oyente hay una persona: alguien que está solo, alguien enfermo, alguien que busca a Dios. Una radio cristiana no solo habla: también escucha, ora y acompaña a los que la escuchan.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Juan 10:27" },
      {
        t: "parrafo",
        texto: "Jesús dijo: «Mis ovejas oyen mi voz, y yo las conozco, y me siguen». El buen pastor conoce a los suyos.",
      },
      { t: "versiculo", ref: "Hechos 16:14" },
      {
        t: "parrafo",
        texto:
          "Lidia estaba oyendo a Pablo, y «el Señor abrió el corazón de ella para que estuviese atenta». Es Dios quien abre el corazón del que escucha.",
      },
      { t: "versiculo", ref: "Santiago 1:19" },
      {
        t: "parrafo",
        texto: "«todo hombre sea pronto para oír, tardo para hablar, tardo para airarse». También el que habla en la radio.",
      },
      { t: "subtitulo", texto: "Las llamadas y los pedidos de oración" },
      {
        t: "lista",
        items: [
          "Antes del aire: alguien del equipo recibe la llamada, pregunta el nombre y el motivo, y le avisa al locutor.",
          "Al aire: se usa solo el primer nombre, y no se dicen apellidos, direcciones ni detalles privados.",
          "Los pedidos de oración: se ora por ellos con respeto, sin contar lo que la persona no quiere que se sepa.",
          "Fuera del aire: el equipo vuelve a llamar a quien necesita conversar más, con un hermano o una hermana preparados.",
          "Los niños: no se les piden datos al aire, y se les pide que llamen con el permiso de sus padres.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una radio que habla y una radio que escucha" },
      {
        t: "lista",
        items: [
          "Que habla: solo transmite. Que escucha: recibe llamadas, mensajes y pedidos, y los atiende.",
          "Que habla: no sabe quién la oye. Que escucha: conoce a sus oyentes y ora por ellos.",
          "Que habla: termina el programa y se olvida. Que escucha: les da seguimiento a los que piden ayuda.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un oyente en crisis al aire" },
      {
        t: "parrafo",
        texto: "Durante el programa de la noche, un hombre llama llorando y dice que ya no quiere vivir.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, mantener la calma, escucharlo con atención y decirle que hizo bien en llamar.",
          "Paso 2, sacar la llamada del aire con cuidado, para hablar con él en privado y proteger su intimidad.",
          "Paso 3, preguntarle dónde está y si está a salvo, y no dejarlo solo en la línea.",
          "Paso 4, darle el 988 y, si su vida corre un peligro inmediato, llamar al 911.",
          "Paso 5, orar con él si lo desea, y pedirle sus datos para que un hermano preparado le dé seguimiento.",
          "Paso 6, al aire, pedirles a los oyentes que oren por los que sufren, sin dar su nombre, y avisarle al pastor.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El equipo de la radio se prepara antes para estas llamadas: tiene a mano los números de ayuda, sabe a quién avisar y nunca da consejos médicos ni legales al aire.",
      },
    ],
    ideaClave:
      "Las ovejas oyen la voz del buen pastor, Dios abrió el corazón de Lidia para que estuviera atenta, y todos debemos ser prontos para oír. Una radio cristiana escucha: recibe las llamadas antes del aire, usa solo el primer nombre, ora por los pedidos sin exponer a nadie y da seguimiento fuera del aire. Ante un oyente en crisis, lo escucha, saca la llamada del aire, no lo deja solo, le da el 988 o llama al 911 si hay peligro, y le avisa al pastor.",
    paraLaVida: {
      texto: "Antes de hablarle al oyente, lo escucho.",
      pregunta: "¿Por quién que escucha la radio podrías orar hoy?",
    },
  },
];
