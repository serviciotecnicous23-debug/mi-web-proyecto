/**
 * Especialidad Comunicaciones y medios · Materia 3 — Video y transmisiones (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el video al servicio del evangelio, contar
 * historias con imágenes, la cámara y la luz, la transmisión del culto, los derechos y los permisos (la licencia de
 * transmisión de CCLI y, según la ayuda de YouTube, la diferencia entre un reclamo de Content ID y una falta por
 * infracción de derechos de autor, comprobadas) y editar con propósito. El sonido se estudia en Sonido y técnica al
 * servicio del culto, de la especialidad Alabanza, y no se repite aquí. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const COMUNICACIONES_3: LeccionContenido[] = [
  {
    id: "comunicaciones-3-1",
    objetivos: [
      "Explicar, con 1 Juan 1:3, que la iglesia anuncia lo que ha visto y oído de Cristo.",
      "Distinguir las clases de video de una iglesia y para qué sirve cada una.",
      "Planear el primer ministerio de video de una iglesia.",
    ],
    paraEmpezar:
      "Hoy mucha gente conoce una iglesia por un video antes de pisar el templo: un culto transmitido, un testimonio corto, una invitación. El video no reemplaza la presencia, pero puede abrir una puerta para que alguien vea y oiga de Cristo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=wQtMnuBzb4c", titulo: "Resumen de los libros de 1-3 Juan", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "1 Juan 1:1-3" },
      {
        t: "parrafo",
        texto:
          "Juan escribe como testigo: «lo que hemos visto y oído, eso os anunciamos, para que también vosotros tengáis comunión con nosotros». La meta no es solo informar, sino llevar a la comunión con Dios y con su iglesia.",
      },
      { t: "versiculo", ref: "Juan 20:30-31" },
      {
        t: "parrafo",
        texto:
          "El evangelio de Juan dice para qué se escribió: «para que creáis que Jesús es el Cristo, el Hijo de Dios».",
      },
      { t: "versiculo", ref: "Habacuc 2:2" },
      {
        t: "parrafo",
        texto:
          "Dios le pidió al profeta: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». Lo que se muestra debe ser claro.",
      },
      { t: "subtitulo", texto: "Las clases de video de una iglesia" },
      {
        t: "lista",
        items: [
          "La transmisión del culto: para los enfermos, los que viajan y los que todavía no se animan a venir.",
          "El video corto: un testimonio, un versículo o una idea en menos de un minuto.",
          "El video de enseñanza: un estudio bíblico o una serie para ver en casa.",
          "El video de anuncio: una invitación clara a un evento, con la fecha, la hora y el lugar.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un video con propósito y un video sin propósito" },
      {
        t: "lista",
        items: [
          "Con propósito: sabe a quién le habla y qué paso le pide. Sin propósito: se graba porque sí.",
          "Con propósito: muestra a Cristo. Sin propósito: muestra solo el edificio o al predicador.",
          "Con propósito: es breve y claro. Sin propósito: es largo y confuso.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el primer ministerio de video" },
      {
        t: "parrafo",
        texto: "La iglesia quiere empezar a usar el video, pero tiene poco equipo y dos voluntarios.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y escribir el propósito: anunciar a Cristo, servir a los que no pueden venir e invitar a la iglesia.",
          "Paso 2, empezar con una sola cosa bien hecha: la transmisión del culto del domingo, o un video corto cada semana.",
          "Paso 3, usar el equipo que ya tienen, como un buen teléfono, un trípode y un micrófono sencillo.",
          "Paso 4, capacitar a los dos voluntarios y escribir una lista de pasos para cada transmisión.",
          "Paso 5, conseguir los permisos y las licencias que hagan falta antes de publicar.",
          "Paso 6, revisar cada mes qué funcionó, y crecer poco a poco.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El sonido, los micrófonos y la consola se estudian en Sonido y técnica al servicio del culto, de la especialidad Alabanza. Aquí se estudia lo que se ve: la imagen, la historia, la transmisión y los permisos.",
      },
    ],
    ideaClave:
      "Juan anunciaba lo que había visto y oído para llevar a otros a la comunión con Dios, su evangelio se escribió para que creamos, y la visión se escribe con claridad para que corra el que la lee. La iglesia usa la transmisión del culto, el video corto, el video de enseñanza y el de anuncio, cada uno con su propósito, mostrando a Cristo y no solo el edificio. Empieza con una sola cosa bien hecha, con el equipo que tiene, voluntarios capacitados, los permisos en regla y una revisión cada mes.",
    paraLaVida: {
      texto: "Lo que he visto y oído de Cristo, eso anuncio.",
      pregunta: "¿Qué historia de lo que Dios hizo en tu vida podrías mostrarle a otro?",
    },
  },
  {
    id: "comunicaciones-3-2",
    objetivos: [
      "Explicar, con Marcos 5:19 y las parábolas de Jesús, el valor de contar historias.",
      "Armar un testimonio en video con su antes, su encuentro con Cristo y su después.",
      "Grabar un testimonio con el permiso de la persona, cuidando su dignidad.",
    ],
    paraEmpezar:
      "Jesús enseñaba con historias: una semilla, una oveja perdida, un hijo que vuelve a casa. Las historias se recuerdan más que una lista de ideas. Un buen video cristiano casi siempre cuenta una historia verdadera de lo que Dios hizo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 5:19" },
      {
        t: "parrafo",
        texto:
          "Jesús le dijo al hombre que había sido libertado: «Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo». Su testimonio era su historia.",
      },
      { t: "versiculo", ref: "Mateo 13:34" },
      {
        t: "parrafo",
        texto: "«Todo esto habló Jesús por parábolas a la gente, y sin parábolas no les hablaba». Jesús enseñaba con historias.",
      },
      { t: "versiculo", ref: "Salmos 107:2" },
      {
        t: "parrafo",
        texto: "El salmo invita: «Díganlo los redimidos de Jehová». Los que Dios rescató tienen algo que contar.",
      },
      { t: "subtitulo", texto: "Las partes de un testimonio en video" },
      {
        t: "lista",
        items: [
          "El antes: cómo era la vida de la persona y qué buscaba, sin detalles que la avergüencen o que hagan ver el pecado como algo atractivo.",
          "El encuentro: cómo conoció a Cristo y qué cambió.",
          "El después: cómo vive hoy, con un ejemplo concreto.",
          "La invitación: una frase sencilla para el que lo ve, como Dios también puede hacerlo contigo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un testimonio que honra a Dios y uno que no" },
      {
        t: "lista",
        items: [
          "Honra a Dios: Cristo es el centro. No lo honra: el centro es lo terrible que era el pasado.",
          "Honra a Dios: es verdadero y sencillo. No lo honra: se exagera para que impresione.",
          "Honra a Dios: cuida la dignidad de la persona y de su familia. No lo honra: expone a otros o cuenta lo que no le toca.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: grabar un testimonio de noventa segundos" },
      {
        t: "parrafo",
        texto: "Marta, de la iglesia, quiere contar en video cómo Dios la sostuvo durante el cáncer.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, conversar antes con ella, escuchar su historia completa y elegir juntos lo principal.",
          "Paso 2, pedirle por escrito su permiso para grabarla y publicar el video, y explicarle dónde se verá.",
          "Paso 3, preparar el lugar: luz de frente, un fondo sencillo y sin ruido.",
          "Paso 4, hacerle preguntas sencillas en vez de leerle un guion: cómo era su vida, qué pasó y cómo está hoy.",
          "Paso 5, editar unos noventa segundos con el antes, el encuentro y el después, y mostrárselo antes de publicarlo.",
          "Paso 6, publicarlo con una invitación clara, y quitarlo si un día ella lo pide.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En un testimonio no se graba ni se publica nada de otra persona sin su permiso, y los niños solo salen con el permiso escrito de sus padres.",
      },
    ],
    ideaClave:
      "Jesús mandó contar cuán grandes cosas había hecho el Señor, enseñaba con parábolas, y los redimidos tienen algo que decir. Un testimonio en video tiene su antes, su encuentro con Cristo, su después y una invitación. Honra a Dios cuando pone a Cristo en el centro, es verdadero y sencillo y cuida la dignidad de todos; se graba con el permiso por escrito de la persona, se le muestra antes de publicarlo y se quita si ella lo pide.",
    paraLaVida: {
      texto: "Mi historia con Dios también es un mensaje.",
      pregunta: "¿Qué gran cosa ha hecho el Señor contigo que podrías contar?",
    },
  },
  {
    id: "comunicaciones-3-3",
    objetivos: [
      "Explicar, con Colosenses 3:23, por qué el trabajo técnico se hace de corazón, como para el Señor.",
      "Encuadrar una toma, cuidar la luz y mantener la cámara quieta.",
      "Grabar un anuncio de un minuto con un teléfono.",
    ],
    paraEmpezar:
      "Hoy un teléfono puede grabar un video de buena calidad. Lo que más se nota no es una cámara cara, sino lo básico: que la imagen esté quieta, que la persona se vea bien iluminada y que el encuadre sea agradable.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=AG4jqCUapng", titulo: "Resumen del libro de Colosenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Colosenses 3:23" },
      {
        t: "parrafo",
        texto:
          "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres». También grabar un video es servicio.",
      },
      { t: "versiculo", ref: "Proverbios 22:29" },
      {
        t: "parrafo",
        texto:
          "«¿Has visto hombre solícito en su trabajo? Delante de los reyes estará». El que hace bien su trabajo honra a Dios.",
      },
      { t: "versiculo", ref: "Eclesiastés 9:10" },
      {
        t: "parrafo",
        texto: "«Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas».",
      },
      { t: "subtitulo", texto: "Lo básico de la imagen" },
      {
        t: "lista",
        items: [
          "La cámara quieta: usar un trípode o apoyar el teléfono, y grabar en horizontal para la transmisión, y en vertical para los videos cortos de algunas redes.",
          "El encuadre: dejar un poco de espacio sobre la cabeza, y poner los ojos de la persona cerca del tercio de arriba de la imagen.",
          "La luz: de frente o de lado a la persona, nunca a su espalda, y mejor la luz suave de una ventana que una luz dura.",
          "El fondo: sencillo y ordenado, que no distraiga.",
          "El sonido: grabar cerca de la persona y en un lugar callado; lo demás se estudia en Sonido y técnica al servicio del culto.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una toma cuidada y una toma descuidada" },
      {
        t: "lista",
        items: [
          "Cuidada: la imagen está quieta. Descuidada: la imagen tiembla todo el tiempo.",
          "Cuidada: la cara se ve con luz. Descuidada: hay una ventana detrás, y la cara se ve oscura.",
          "Cuidada: el fondo está ordenado. Descuidada: se ven cajas, cables y gente pasando.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un anuncio de un minuto con el teléfono" },
      {
        t: "parrafo",
        texto:
          "El pastor quiere invitar a la iglesia a un día de oración con un video de un minuto, y solo tienen un teléfono.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escribir el mensaje en pocas frases: qué, cuándo, dónde y por qué venir.",
          "Paso 2, buscar un lugar callado, con la luz de una ventana de frente al pastor.",
          "Paso 3, poner el teléfono en un trípode, a la altura de sus ojos, con espacio sobre la cabeza.",
          "Paso 4, grabar una prueba de diez segundos y revisar la luz, el encuadre y el sonido.",
          "Paso 5, grabar el anuncio completo dos o tres veces, y escoger la mejor toma.",
          "Paso 6, agregar en la pantalla la fecha y la hora escritas, y publicarlo con tiempo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de grabar en el culto, se avisa que habrá cámaras. A los que no quieren salir se les respeta, y a los niños no se les graba de cerca sin el permiso de sus padres.",
      },
    ],
    ideaClave:
      "Todo se hace de corazón, como para el Señor, el que es solícito en su trabajo honra a Dios, y lo que viene a la mano se hace según las fuerzas. Lo básico de la imagen es una cámara quieta, un buen encuadre, la luz de frente y un fondo sencillo, con el sonido cerca y sin ruido. Se planea el mensaje, se hace una prueba, se graba varias veces y se escoge la mejor toma, respetando a los que no quieren salir.",
    paraLaVida: {
      texto: "Aun lo técnico lo hago para el Señor.",
      pregunta: "¿Qué detalle de tu servicio podrías hacer con más cuidado esta semana?",
    },
  },
  {
    id: "comunicaciones-3-4",
    objetivos: [
      "Explicar, con Hebreos 10:24-25, por qué la transmisión no reemplaza el congregarse.",
      "Preparar la transmisión del culto con su equipo, su prueba y su plan por si algo falla.",
      "Cuidar a los que miran en línea y a los que están en el templo.",
    ],
    paraEmpezar:
      "Una transmisión en vivo lleva el culto a los enfermos, a los que viajan y a los que todavía no se animan a entrar a una iglesia. Pero transmitir bien no es solo prender una cámara: se prepara, se prueba y se cuida a las personas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Hebreos 10:24-25" },
      {
        t: "parrafo",
        texto:
          "La Biblia pide: «no dejando de congregarnos, como algunos tienen por costumbre». La transmisión sirve al que no puede venir, y anima a todos a congregarse.",
      },
      { t: "versiculo", ref: "Hechos 2:42" },
      {
        t: "parrafo",
        texto:
          "Los primeros creyentes «perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones». La comunión se vive juntos.",
      },
      { t: "versiculo", ref: "Salmos 22:22" },
      {
        t: "parrafo",
        texto: "«Anunciaré tu nombre a mis hermanos; En medio de la congregación te alabaré».",
      },
      { t: "subtitulo", texto: "Lo que necesita una transmisión" },
      {
        t: "lista",
        items: [
          "La imagen: una o más cámaras, o un buen teléfono, con un plano del púlpito y uno más abierto.",
          "El sonido: una salida de la consola del templo, no el micrófono de la cámara.",
          "La computadora y el programa de transmisión, que juntan la imagen, el sonido y los textos en pantalla.",
          "Internet: una conexión estable, con buena velocidad de subida, probada antes del culto.",
          "La plataforma: el canal de la iglesia, con el título, la descripción y la hora anunciados.",
          "El anfitrión del chat: alguien que salude, responda y ore con los que escriben.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una transmisión preparada y una improvisada" },
      {
        t: "lista",
        items: [
          "Preparada: se prueba media hora antes. Improvisada: el problema se descubre cuando ya empezó el culto.",
          "Preparada: hay una lista de pasos y un plan por si falla internet. Improvisada: todos corren cuando algo falla.",
          "Preparada: alguien atiende el chat. Improvisada: nadie responde a los que escriben.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la primera transmisión del domingo" },
      {
        t: "parrafo",
        texto: "La iglesia va a transmitir su culto por primera vez el próximo domingo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, el martes, revisar el equipo, la conexión a internet y las licencias de la música.",
          "Paso 2, el jueves, hacer una transmisión de prueba privada, con la alabanza y la predicación, y corregir lo que falle.",
          "Paso 3, el domingo, llegar una hora antes, probar la imagen y el sonido y anunciar el enlace.",
          "Paso 4, durante el culto, que un voluntario cambie de cámara con calma y otro atienda el chat.",
          "Paso 5, si falla internet, poner una imagen con un aviso y volver a conectar, sin culpar a nadie al aire.",
          "Paso 6, después del culto, revisar la grabación, apuntar lo que se aprendió y agradecerle al equipo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Durante la transmisión no se enfoca de cerca, sin su permiso, a quien llora o pasa al altar, ni se transmite el salón de los niños. A los que miran en línea se les invita con cariño a congregarse cuando puedan.",
      },
      {
        t: "pasos",
        titulo: "La primera transmisión del culto, de la semana al domingo",
        pasos: [
          {
            titulo: "El martes: revisar",
            texto: "El equipo, una conexión a internet con buena velocidad de subida y las licencias de la música.",
          },
          {
            titulo: "El jueves: probar",
            texto: "Una transmisión de prueba privada, con la alabanza y la predicación, para corregir lo que falle.",
          },
          {
            titulo: "El domingo: llegar antes",
            texto: "Una hora antes, probar la imagen y el sonido de la consola, y anunciar el enlace.",
          },
          {
            titulo: "Durante el culto: cuidar",
            texto: "Un voluntario cambia de cámara con calma y otro atiende el chat; no se enfoca de cerca, sin su permiso, a quien ora.",
          },
          {
            titulo: "Si algo falla: calma",
            texto: "Una imagen con un aviso mientras se vuelve a conectar, sin culpar a nadie al aire.",
          },
          {
            titulo: "Después: revisar",
            texto: "Ver la grabación, apuntar lo aprendido, agradecerle al equipo e invitar a congregarse (Hebreos 10:25).",
          },
        ],
      },
    ],
    ideaClave:
      "La Biblia pide no dejar de congregarnos, la primera iglesia perseveraba en la comunión, y en medio de la congregación se alaba a Dios. La transmisión sirve al que no puede venir, y no reemplaza el congregarse. Necesita imagen, el sonido de la consola, el programa de transmisión, una buena conexión, la plataforma y un anfitrión en el chat. Se prepara con una prueba, una lista de pasos y un plan por si falla, y cuida la intimidad de los que oran y la de los niños.",
    paraLaVida: {
      texto: "La pantalla acerca, pero la iglesia se vive juntos.",
      pregunta: "¿A quién que no puede venir al culto podrías enviarle hoy el enlace?",
    },
  },
  {
    id: "comunicaciones-3-5",
    objetivos: [
      "Explicar, con Romanos 12:17, por qué la iglesia procura lo bueno delante de todos al publicar videos.",
      "Distinguir un reclamo de Content ID de una falta por infracción de derechos de autor en YouTube.",
      "Tener en regla la música, las imágenes y los permisos de las personas en un video.",
    ],
    paraEmpezar:
      "Un video puede tener música, imágenes y personas que no son nuestras. Usarlas sin permiso puede quitarle el sonido a un video, sacarlo de la red o hasta hacer que se cancele el canal de la iglesia. Y sobre todo, daña el testimonio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Romanos 12:17" },
      {
        t: "parrafo",
        texto: "«procurad lo bueno delante de todos los hombres». La iglesia cuida lo que publica.",
      },
      { t: "versiculo", ref: "2 Corintios 8:21" },
      {
        t: "parrafo",
        texto:
          "Pablo procuraba «hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
      },
      { t: "versiculo", ref: "Proverbios 3:27" },
      {
        t: "parrafo",
        texto:
          "«No te niegues a hacer el bien a quien es debido, Cuando tuvieres poder para hacerlo». Darle a cada uno lo que le corresponde también es hacer el bien.",
      },
      { t: "subtitulo", texto: "Lo que se cuida en un video" },
      {
        t: "lista",
        items: [
          "La música: las canciones de la alabanza en un culto transmitido se cubren con la licencia de transmisión de CCLI, si están en su catálogo; las grabaciones originales y las pistas necesitan su versión ampliada; las canciones que no son de su catálogo necesitan otro permiso.",
          "Las imágenes y los videos ajenos: solo los propios, los que se compran con licencia o los que el autor permite usar.",
          "Las personas: se pide permiso para grabarlas y publicarlas, y para los niños, el permiso escrito de sus padres.",
          "El crédito: se nombra al autor cuando la licencia lo pide.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un reclamo y una falta en YouTube" },
      {
        t: "lista",
        items: [
          "Un reclamo de Content ID: el sistema encuentra en el video algo de otro dueño; afecta a ese video, por ejemplo al bloquearlo o al darle sus ingresos al dueño, y normalmente no es una falta.",
          "Una falta por infracción de derechos de autor: llega cuando el dueño pide que se quite el video y YouTube lo acepta; cuenta contra el canal.",
          "Tres faltas en 90 días: YouTube puede cancelar el canal; una falta vence a los 90 días si se completa el Curso de Derechos de Autor y el canal tiene menos de tres.",
          "Lo que no se hace: impugnar un reclamo sin un motivo válido, porque el dueño puede pedir que se quite el video, y eso sí puede terminar en una falta.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el video de los jóvenes con una canción famosa" },
      {
        t: "parrafo",
        texto:
          "Los jóvenes subieron un video del campamento con una canción famosa de fondo, y YouTube le puso un reclamo de Content ID.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, leer qué dice el reclamo y quién es el dueño de la canción.",
          "Paso 2, no impugnarlo si de verdad no tenían permiso.",
          "Paso 3, quitar la canción con las herramientas de YouTube, o volver a subir el video con música permitida.",
          "Paso 4, revisar que todos los jóvenes que salen hayan dado su permiso, y los menores, con el de sus padres.",
          "Paso 5, explicarle al equipo por qué se respetan los derechos de autor.",
          "Paso 6, escribir en la política de la iglesia qué música y qué imágenes se pueden usar.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las reglas de las plataformas y de las licencias cambian. Lo legal de esta lección es una guía general, no un consejo legal: ante una duda, se lee la ayuda de la plataforma o se le pregunta a un abogado.",
      },
      {
        t: "cuadro",
        titulo: "Un reclamo de Content ID y una falta por derechos de autor",
        columnas: ["En YouTube", "Reclamo de Content ID", "Falta por derechos de autor"],
        filas: [
          ["De dónde viene", "El sistema encuentra en el video algo de otro dueño", "El dueño pide que se quite el video y YouTube lo acepta"],
          ["A qué afecta", "A ese video: se bloquea, o sus ingresos van al dueño", "Al canal: cuenta contra él"],
          ["Lo más grave", "Normalmente no es una falta", "Tres faltas en 90 días pueden cancelar el canal"],
          ["Cómo se resuelve", "Quitando la canción o subiendo el video con música permitida", "Vence a los 90 días con el Curso de Derechos de Autor, si el canal tiene menos de tres"],
          ["Lo que no se hace", "Impugnarlo sin un motivo válido", "Borrar el video creyendo que así se quita la falta"],
        ],
      },
    ],
    ideaClave:
      "La Biblia pide procurar lo bueno delante de todos, hacer las cosas honradamente delante del Señor y de los hombres, y no negar el bien a quien es debido. En un video se cuidan la música, con la licencia de transmisión de CCLI para la alabanza de su catálogo, las imágenes ajenas, el permiso de las personas y el de los padres de los niños, y el crédito. En YouTube, un reclamo de Content ID afecta al video, y una falta por infracción de derechos de autor cuenta contra el canal: tres en 90 días pueden hacer que se cancele.",
    paraLaVida: {
      texto: "Lo que publico, lo publico en regla.",
      pregunta: "¿Hay algún video tuyo o de tu iglesia que debas poner en regla?",
    },
  },
  {
    id: "comunicaciones-3-6",
    objetivos: [
      "Explicar, con 1 Corintios 14:9, por qué un video debe ser claro para todos.",
      "Editar un video: cortar lo que sobra, poner subtítulos y elegir un título y una portada honestos.",
      "Convertir una predicación en un video corto con subtítulos.",
    ],
    paraEmpezar:
      "Editar es elegir. De una hora de culto, un buen editor saca el minuto que puede tocar a alguien que nunca vería el culto completo. Pero editar también exige honestidad: no se cambia el sentido de lo que se dijo, ni se engaña con el título.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 14:9" },
      {
        t: "parrafo",
        texto:
          "Pablo pregunta: «si por la lengua no diereis palabra bien comprensible, ¿cómo se entenderá lo que decís?». Un video claro se entiende.",
      },
      { t: "versiculo", ref: "Hechos 2:8" },
      {
        t: "parrafo",
        texto:
          "En Pentecostés, la gente se preguntaba cómo oía hablar a los discípulos «cada uno en nuestra lengua en la que hemos nacido». Los subtítulos ayudan a que el mensaje llegue a más personas.",
      },
      { t: "versiculo", ref: "Eclesiastés 12:10" },
      {
        t: "parrafo",
        texto:
          "«Procuró el Predicador hallar palabras agradables, y escribir rectamente palabras de verdad». Agradable y verdadero a la vez.",
      },
      { t: "subtitulo", texto: "Los pasos de la edición" },
      {
        t: "lista",
        items: [
          "Elegir: buscar el momento con una sola idea clara.",
          "Cortar: quitar lo que sobra, sin cambiar el sentido de lo que se dijo.",
          "Los subtítulos: para los que ven sin sonido, para los que no oyen bien y para los que hablan otro idioma.",
          "El título y la portada: honestos, que digan de qué trata el video, sin engañar para ganar vistas.",
          "La revisión: que otra persona lo vea antes de publicarlo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una edición honesta y una edición que engaña" },
      {
        t: "lista",
        items: [
          "Honesta: el corte respeta lo que el predicador quiso decir. Engaña: une frases para que diga otra cosa.",
          "Honesta: el título dice de qué trata el video. Engaña: promete algo que el video no tiene.",
          "Honesta: la portada muestra lo que hay. Engaña: usa una imagen escandalosa para que hagan clic.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: de una predicación a un video corto" },
      {
        t: "parrafo",
        texto: "El equipo quiere sacar un video de un minuto de la predicación del domingo sobre el perdón.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, ver la predicación y elegir el momento con una idea clara y completa, por ejemplo una ilustración sobre el perdón.",
          "Paso 2, cortar ese minuto, cuidando que tenga principio y final, y que no cambie el sentido.",
          "Paso 3, poner los subtítulos en español, revisados palabra por palabra, y en inglés si hace falta.",
          "Paso 4, escribir un título honesto, como por qué perdonar te hace libre, y elegir una portada con la cara del predicador.",
          "Paso 5, pedirle al pastor que lo revise antes de publicarlo.",
          "Paso 6, publicarlo con el enlace a la predicación completa y la invitación al culto.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca se edita a alguien para que parezca decir lo que no dijo. Si se usa la imagen o la voz de una persona de otra manera, por ejemplo con inteligencia artificial, se le pide permiso y se le avisa al que mira.",
      },
    ],
    ideaClave:
      "Pablo pide palabras bien comprensibles, en Pentecostés cada uno oyó en su propia lengua, y el Predicador buscó palabras agradables y verdaderas. Editar es elegir una idea clara, cortar lo que sobra sin cambiar el sentido, poner subtítulos, escribir un título y una portada honestos y pedir que otro lo revise. Una edición honesta respeta lo que se dijo y no engaña para ganar vistas, y el video corto lleva a la predicación completa y a la iglesia.",
    paraLaVida: {
      texto: "Lo que edito, lo edito con verdad.",
      pregunta: "¿Qué idea de la última predicación podrías compartir en un minuto?",
    },
  },
];
