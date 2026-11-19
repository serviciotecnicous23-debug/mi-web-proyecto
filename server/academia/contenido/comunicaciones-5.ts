/**
 * Especialidad Comunicaciones y medios · Materia 5 — Ética y seguridad digital (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la ética del comunicador cristiano, la
 * privacidad y la dignidad de las personas (con la ley COPPA), las cuentas y las contraseñas seguras (con los cuatro pasos
 * de la CISA, comprobados en cisa.gov), las estafas en línea (con la alerta del Fiscal General de Texas sobre los pastores
 * falsos que piden tarjetas de regalo), la inteligencia artificial y la verdad (con la decisión FCC 24-17 de febrero de
 * 2024 sobre las voces hechas con inteligencia artificial) y cómo moderar y proteger en las redes de la iglesia (con la
 * línea de Texas para reportar abuso y la CyberTipline del NCMEC). Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const COMUNICACIONES_5: LeccionContenido[] = [
  {
    id: "comunicaciones-5-1",
    objetivos: [
      "Explicar, con 2 Corintios 4:2, por qué el comunicador cristiano no engaña ni manipula.",
      "Reconocer los cinco compromisos del comunicador cristiano: la verdad, sin manipular, el crédito, la transparencia y la dignidad.",
      "Revisar una publicación antes de subirla, con preguntas de ética.",
    ],
    paraEmpezar:
      "En internet es fácil exagerar para que algo se vea más: un título que promete lo que no hay, una foto de otro evento, un número inflado. Pero el que comunica en nombre de Cristo no puede usar el engaño para anunciar al que es la verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Corintios 4:2" },
      {
        t: "parrafo",
        texto:
          "Pablo dijo: «renunciamos a lo oculto y vergonzoso, no andando con astucia, ni adulterando la palabra de Dios, sino por la manifestación de la verdad».",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 2:3-5" },
      {
        t: "parrafo",
        texto:
          "Hablaba «no como para agradar a los hombres, sino a Dios, que prueba nuestros corazones», y podía decir: «nunca usamos de palabras lisonjeras, como sabéis, ni encubrimos avaricia».",
      },
      { t: "versiculo", ref: "Proverbios 11:1" },
      {
        t: "parrafo",
        texto: "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada». Un número inflado es un peso falso.",
      },
      { t: "subtitulo", texto: "Los cinco compromisos del comunicador cristiano" },
      {
        t: "lista",
        items: [
          "La verdad: lo que se publica pasó, y como pasó, sin títulos engañosos, fotos de otro evento ni números inflados.",
          "Sin manipular: no se presiona con miedo o con culpa, ni se prometen bendiciones a cambio de dinero.",
          "El crédito: se nombra al autor de una foto, un texto o una canción, y se usa solo lo que se tiene permiso de usar.",
          "La transparencia: si alguien recibe un pago o un regalo por recomendar algo, se dice; en los Estados Unidos, la Comisión Federal de Comercio (FTC) pide que esa relación se diga con claridad.",
          "La dignidad: se muestra a las personas con respeto, nunca para dar lástima ni como un adorno.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un título honesto y uno engañoso" },
      {
        t: "lista",
        items: [
          "Honesto: treinta jóvenes sirvieron en el barrio este sábado. Engañoso: no vas a creer lo que pasó en nuestra iglesia.",
          "Honesto: unas doscientas personas vinieron al culto de Navidad. Engañoso: miles llenaron el templo.",
          "Honesto: una ofrenda para la misión, con su propósito y el informe de lo que se recogió. Engañoso: si das hoy, Dios te devolverá el doble.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: revisar una publicación antes de subirla" },
      {
        t: "parrafo",
        texto:
          "El equipo preparó una publicación sobre la campaña de alimentos, con la foto de una familia que recibe una bolsa y el título: cientos de familias rescatadas del hambre.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, preguntar si es verdad: se repartieron 85 bolsas, no cientos.",
          "Paso 2, corregir el título: 85 familias recibieron alimentos este sábado.",
          "Paso 3, revisar la foto: la familia no dio permiso, y la foto podría avergonzarla.",
          "Paso 4, cambiar la foto por una de los voluntarios trabajando, o pedirle permiso a la familia.",
          "Paso 5, revisar que el texto no presione ni prometa nada a cambio de una ofrenda.",
          "Paso 6, pedir que otro lo revise y publicarlo, dándole la gloria a Dios.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los números también se informan con verdad. Comprar seguidores o reacciones para que la cuenta parezca más grande es un peso falso, y engaña a los que la miran.",
      },
    ],
    ideaClave:
      "Pablo renunció a lo oculto y vergonzoso y no anduvo con astucia, no habló para agradar a los hombres ni usó palabras lisonjeras, y el peso falso es abominación a Dios. El comunicador cristiano tiene cinco compromisos: la verdad, sin títulos engañosos ni números inflados; no manipular con miedo, con culpa ni con promesas a cambio de dinero; dar el crédito y usar solo lo que tiene permiso de usar; decir cuándo algo es pagado, como pide la FTC; y mostrar a las personas con dignidad.",
    paraLaVida: {
      texto: "No anuncio la verdad con engaños.",
      pregunta: "¿Qué publicación o qué número tendrías que contar con más verdad?",
    },
  },
  {
    id: "comunicaciones-5-2",
    objetivos: [
      "Explicar, con Proverbios 11:13 y Mateo 7:12, por qué la iglesia guarda la información de las personas.",
      "Reconocer los datos que la iglesia cuida: los de contacto, las peticiones de oración, las fotos, los datos de los niños y los registros.",
      "Armar un formulario de peticiones de oración que cuide la privacidad.",
    ],
    paraEmpezar:
      "La iglesia sabe muchas cosas de su gente: dónde vive, qué problemas tiene, por qué ora. Esa información es confianza que se nos da. En internet, una sola publicación descuidada puede exponer a una persona para siempre.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». El que sirve en las comunicaciones guarda lo que le confían.",
      },
      { t: "versiculo", ref: "Mateo 7:12" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó: «todas las cosas que queráis que los hombres hagan con vosotros, así también haced vosotros con ellos». Antes de publicar algo de alguien, uno se pregunta si quisiera que lo publicaran de uno.",
      },
      { t: "versiculo", ref: "Proverbios 22:1" },
      {
        t: "parrafo",
        texto: "«De más estima es el buen nombre que las muchas riquezas». Cuidar los datos es cuidar el buen nombre de las personas.",
      },
      { t: "subtitulo", texto: "Lo que la iglesia cuida" },
      {
        t: "lista",
        items: [
          "Los datos de contacto: los teléfonos, los correos y las direcciones de los miembros no se publican ni se comparten.",
          "Las peticiones de oración: se pregunta si se pueden compartir, y con quién; sin permiso, se ora en privado.",
          "Las fotos y los videos: con permiso; los de los niños, con el permiso escrito de sus padres y sin sus nombres junto a la foto; y se quitan si alguien lo pide.",
          "Los datos de los niños: en los Estados Unidos, la ley COPPA pide el permiso verificable de los padres antes de que un sitio dirigido a menores de 13 años recoja sus datos, y la mayoría de las redes piden al menos 13 años.",
          "Los registros: las listas de miembros, de ofrendas y de consejería se guardan bajo llave o con contraseña, y solo los ve quien los necesita.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: cuidar la privacidad y descuidarla" },
      {
        t: "lista",
        items: [
          "Cuidarla: oremos por una familia que pasa por un momento difícil, con su permiso. Descuidarla: publicar el nombre de un hermano y el motivo de su problema sin preguntarle.",
          "Cuidarla: pedir solo los datos que hacen falta. Descuidarla: pedir la dirección, la fecha de nacimiento y el trabajo para inscribirse a una cena.",
          "Cuidarla: la lista de teléfonos en una carpeta con contraseña. Descuidarla: una hoja con los teléfonos olvidada en una mesa del templo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el formulario de peticiones de oración" },
      {
        t: "parrafo",
        texto: "La iglesia quiere recibir peticiones de oración por su página de internet.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, pedir solo lo necesario: el nombre, la petición y, si la persona quiere, cómo contactarla.",
          "Paso 2, preguntar con una casilla si la petición se puede compartir con el grupo de oración, y otra si se puede compartir con la iglesia.",
          "Paso 3, decir quién la va a leer: el pastor y el equipo de intercesión.",
          "Paso 4, guardar las peticiones en una cuenta con una contraseña fuerte y la verificación en dos pasos, y no guardarlas más tiempo del necesario.",
          "Paso 5, no recibir peticiones de niños por su cuenta: si es por un menor, que la envíen sus padres.",
          "Paso 6, escribir una nota corta de privacidad: qué se pide, para qué, quién lo ve y cómo pedir que se borre.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una petición de oración nunca se convierte en un chisme disfrazado de oración, ni en una historia para las redes sin el permiso de la persona. Lo legal es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "El de espíritu fiel guarda el secreto, Jesús manda tratar a los demás como queremos que nos traten, y el buen nombre vale más que las riquezas. La iglesia cuida los datos de contacto, que no se publican; las peticiones de oración, que se comparten solo con permiso; las fotos, con permiso y, las de los niños, con el permiso escrito de sus padres y sin sus nombres; los datos de los niños, como pide la ley COPPA; y los registros, que solo ve quien los necesita.",
    paraLaVida: {
      texto: "Guardo lo que me confían.",
      pregunta: "¿Qué información de otra persona tienes que cuidar mejor?",
    },
  },
  {
    id: "comunicaciones-5-3",
    objetivos: [
      "Explicar, con Nehemías 4:9, por qué la iglesia ora y también protege sus cuentas.",
      "Aplicar los cuatro pasos de la CISA: contraseñas fuertes, la verificación en dos pasos con un administrador de contraseñas, reconocer el phishing y actualizar los programas.",
      "Ordenar las cuentas de la iglesia y quitar el acceso a quien deja el equipo.",
    ],
    paraEmpezar:
      "Si alguien roba la cuenta de la iglesia, puede publicar en su nombre, engañar a sus seguidores o borrar años de trabajo. Cuidar las cuentas no es falta de fe: es ser fieles con lo que Dios nos confió.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Nehemías 4:9" },
      {
        t: "parrafo",
        texto:
          "Cuando los enemigos amenazaban el muro, el pueblo hizo dos cosas: «oramos a nuestro Dios, y por causa de ellos pusimos guarda contra ellos de día y de noche».",
      },
      { t: "versiculo", ref: "Lucas 16:10" },
      {
        t: "parrafo",
        texto: "«El que es fiel en lo muy poco, también en lo más es fiel». Una contraseña también es una mayordomía.",
      },
      { t: "versiculo", ref: "Proverbios 27:12" },
      {
        t: "parrafo",
        texto: "«El avisado ve el mal y se esconde; Mas los simples pasan y llevan el daño».",
      },
      { t: "subtitulo", texto: "Los cuatro pasos de la CISA" },
      {
        t: "parrafo",
        texto:
          "La Agencia de Ciberseguridad y Seguridad de Infraestructura de los Estados Unidos (CISA) recomienda cuatro pasos para todos:",
      },
      {
        t: "lista",
        items: [
          "Usar contraseñas fuertes: largas, de al menos 16 caracteres; al azar, o una frase de 4 a 7 palabras sin relación; y una distinta para cada cuenta.",
          "Usar la verificación en dos pasos, que pide un código además de la contraseña, y un administrador de contraseñas, que las crea, las guarda y las llena, para recordar una sola.",
          "Reconocer y reportar el phishing, los mensajes que engañan para robar datos, como se estudia en la próxima lección.",
          "Actualizar los programas y los teléfonos, mejor de forma automática.",
        ],
      },
      { t: "subtitulo", texto: "Las cuentas de la iglesia" },
      {
        t: "lista",
        items: [
          "Las cuentas son de la iglesia: se abren con un correo de la iglesia, no con el de un voluntario.",
          "Siempre hay al menos dos administradores de confianza, aprobados por el pastor.",
          "Las contraseñas no se mandan por mensaje: se comparten con el administrador de contraseñas, o cada uno recibe su propio acceso.",
          "Cuando alguien deja el equipo, se le quita el acceso ese mismo día y se cambian las contraseñas que conocía.",
          "Los códigos de respaldo de la verificación en dos pasos se guardan en un lugar seguro.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una cuenta segura y una insegura" },
      {
        t: "lista",
        items: [
          "Segura: una contraseña larga y única, guardada en el administrador. Insegura: la misma contraseña corta en todas las cuentas.",
          "Segura: dos administradores, cada uno con su propio acceso. Insegura: un solo joven que se fue y se llevó la contraseña.",
          "Segura: la verificación en dos pasos. Insegura: solo la contraseña.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: cuando un voluntario deja el equipo de redes" },
      {
        t: "parrafo",
        texto: "Un voluntario que manejaba las redes de la iglesia se muda a otra ciudad y deja el equipo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecerle su servicio y explicarle con amor que se le quitará el acceso, como a todos los que dejan el equipo.",
          "Paso 2, quitar su acceso en cada red y en la página de internet, ese mismo día.",
          "Paso 3, cambiar las contraseñas que conocía por otras largas y nuevas, guardadas en el administrador de contraseñas.",
          "Paso 4, revisar quiénes son administradores, y que queden al menos dos.",
          "Paso 5, revisar que la verificación en dos pasos no llegue a su teléfono, y pasarla a un teléfono o un correo de la iglesia.",
          "Paso 6, anotar el cambio en la lista de accesos, y revisar esa lista cada pocos meses.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si roban una cuenta de la iglesia: se cambia la contraseña, se usa la recuperación oficial de esa red, se avisa a los seguidores que no hagan caso a mensajes raros, se revisa lo que se publicó y se activa la verificación en dos pasos.",
      },
      {
        t: "pasos",
        titulo: "Los cuatro pasos de la CISA para estar seguros en línea",
        pasos: [
          {
            titulo: "Contraseñas fuertes",
            texto: "Largas, de al menos 16 caracteres; al azar, o una frase de 4 a 7 palabras sin relación; y una distinta para cada cuenta.",
          },
          {
            titulo: "Verificación en dos pasos",
            texto: "Un código además de la contraseña, y un administrador de contraseñas para recordar una sola.",
          },
          {
            titulo: "Reconocer el phishing",
            texto: "Desconfiar de la prisa y de los pedidos de datos o de códigos; no hacer clic, reportarlo y borrarlo.",
          },
          {
            titulo: "Actualizar",
            texto: "Los programas y los teléfonos, mejor de forma automática.",
          },
        ],
      },
    ],
    ideaClave:
      "El pueblo de Nehemías oró y también puso guarda de día y de noche, el que es fiel en lo poco es fiel en lo mucho, y el avisado ve el mal y se esconde. La CISA recomienda cuatro pasos: contraseñas fuertes, largas, al azar y únicas; la verificación en dos pasos y un administrador de contraseñas; reconocer y reportar el phishing; y actualizar los programas. Las cuentas son de la iglesia, tienen al menos dos administradores, las contraseñas no se mandan por mensaje y el acceso se quita el mismo día en que alguien deja el equipo.",
    paraLaVida: {
      texto: "Oro y también pongo guarda.",
      pregunta: "¿Qué cuenta tuya o de tu ministerio necesita hoy una contraseña nueva o la verificación en dos pasos?",
    },
  },
  {
    id: "comunicaciones-5-4",
    objetivos: [
      "Explicar, con Mateo 10:16, por qué el creyente es prudente en internet sin perder la sencillez.",
      "Reconocer las señales de un engaño en línea y la estafa del pastor falso.",
      "Responder a un mensaje falso que pide tarjetas de regalo en nombre del pastor.",
    ],
    paraEmpezar:
      "Los estafadores saben que los hermanos confían en su pastor y quieren ayudar. Por eso se hacen pasar por él. Jesús nos envió a un mundo con lobos, y nos pidió ser prudentes como serpientes y sencillos como palomas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 10:16" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «He aquí, yo os envío como a ovejas en medio de lobos; sed, pues, prudentes como serpientes, y sencillos como palomas».",
      },
      { t: "versiculo", ref: "Proverbios 14:15" },
      {
        t: "parrafo",
        texto: "«El simple todo lo cree; Mas el avisado mira bien sus pasos». No todo mensaje es lo que parece.",
      },
      { t: "versiculo", ref: "2 Corintios 11:14" },
      {
        t: "parrafo",
        texto:
          "Pablo advirtió que «el mismo Satanás se disfraza como ángel de luz». El engaño muchas veces llega con cara de bondad.",
      },
      { t: "subtitulo", texto: "Las señales de un engaño" },
      {
        t: "lista",
        items: [
          "La prisa o la emoción: dicen que hay que actuar ya, o que algo grave pasará si no respondes.",
          "Piden datos personales o de dinero, contraseñas o códigos.",
          "Traen enlaces acortados que no conoces, o direcciones con letras cambiadas.",
          "Ofrecen algo demasiado bueno para ser verdad.",
          "La buena ortografía ya no prueba nada, porque la inteligencia artificial también escribe bien.",
        ],
      },
      { t: "subtitulo", texto: "El pastor falso" },
      {
        t: "parrafo",
        texto:
          "El Fiscal General de Texas alertó sobre estafadores que se hacen pasar por pastores o sacerdotes: les mandan mensajes de texto a los miembros, les piden comprar tarjetas de regalo para una causa, dicen que no pueden comprarlas ellos mismos y prometen devolver el dinero, y después piden los códigos por mensaje. Sacan los nombres de las páginas de internet y de los boletines de las iglesias.",
      },
      { t: "subtitulo", texto: "Comparación: un pedido verdadero y una estafa" },
      {
        t: "lista",
        items: [
          "Verdadero: el pastor anuncia una ofrenda en el culto, con su propósito. Estafa: un mensaje privado y urgente que pide tarjetas de regalo.",
          "Verdadero: llamas al pastor al número de siempre y él te lo confirma. Estafa: viene de un número nuevo y no quiere hablar por teléfono.",
          "Verdadero: la ofrenda se entrega a la iglesia. Estafa: piden los códigos de las tarjetas por mensaje.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el mensaje del pastor falso" },
      {
        t: "parrafo",
        texto:
          "Una hermana recibe un mensaje de un número nuevo: soy el pastor, estoy en una reunión, necesito que compres cuatro tarjetas de regalo de cien dólares para unos niños enfermos; te lo devuelvo el domingo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, no responder, no hacer clic en nada y no comprar nada.",
          "Paso 2, llamar al pastor al número que ya conoce, o al teléfono de la iglesia.",
          "Paso 3, cuando el pastor confirma que no lo envió, bloquear el número.",
          "Paso 4, reportarlo a la Comisión Federal de Comercio (FTC), en reportfraud.ftc.gov, y al FBI, en ic3.gov.",
          "Paso 5, la iglesia avisa a todos que el pastor nunca pide tarjetas de regalo ni dinero por mensaje.",
          "Paso 6, el equipo revisa qué datos de los líderes están publicados, y deja en la página el teléfono de la iglesia en vez de los personales.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si alguien ya envió los códigos o el dinero, que avise enseguida a la compañía de la tarjeta o al banco, y que lo reporte. No se le avergüenza: se le acompaña.",
      },
      {
        t: "cuadro",
        titulo: "Las señales de un engaño y qué hacer",
        columnas: ["Señal", "Cómo se ve", "Qué hacer"],
        filas: [
          ["La prisa o la emoción", "Hay que actuar ya, o algo grave pasará si no respondes", "Detenerse, no responder y verificar"],
          ["Piden datos, dinero o códigos", "Contraseñas, tarjetas de regalo o los códigos de una tarjeta", "No mandar nada y llamar al número que ya conoces"],
          ["Enlaces raros", "Enlaces acortados o direcciones con letras cambiadas", "No hacer clic y entrar por la página oficial"],
          ["Se hace pasar por alguien", "El pastor, desde un número nuevo, que no quiere hablar por teléfono", "Llamar al número de siempre o al de la iglesia"],
          ["Algo demasiado bueno", "Un premio que pide pagar un cargo para recibirlo", "No pagar nada y reportarlo a la FTC"],
        ],
      },
    ],
    ideaClave:
      "Jesús nos envió como ovejas en medio de lobos y nos pidió ser prudentes como serpientes y sencillos como palomas; el simple todo lo cree, y el engaño se disfraza de luz. Las señales de un engaño son la prisa o la emoción, los pedidos de datos, de dinero o de códigos, los enlaces raros y las ofertas demasiado buenas. Ante el pastor falso que pide tarjetas de regalo, no se responde, se llama al número que ya se conoce, se bloquea, se reporta, y la iglesia avisa que el pastor nunca pide eso por mensaje.",
    paraLaVida: {
      texto: "Soy prudente y sencillo a la vez.",
      pregunta: "¿A quién de tu iglesia podrías avisarle de la estafa del pastor falso?",
    },
  },
  {
    id: "comunicaciones-5-5",
    objetivos: [
      "Explicar, con Éxodo 20:16 y Colosenses 3:9, por qué la iglesia no usa la inteligencia artificial para engañar.",
      "Seguir una guía para usar la inteligencia artificial con verdad en las comunicaciones de la iglesia.",
      "Examinar un video o una imagen antes de compartirlos.",
    ],
    paraEmpezar:
      "Hoy una máquina puede escribir un texto, hacer una foto de algo que nunca pasó o imitar la voz de una persona. Bien usada, la inteligencia artificial puede ayudar; mal usada, puede poner en boca de alguien lo que nunca dijo. La iglesia la usa con la verdad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 20:16" },
      {
        t: "parrafo",
        texto: "El mandamiento es claro: «No hablarás contra tu prójimo falso testimonio». Un video falso de alguien también es un falso testimonio.",
      },
      { t: "versiculo", ref: "Colosenses 3:9" },
      {
        t: "parrafo",
        texto: "«No mintáis los unos a los otros, habiéndoos despojado del viejo hombre con sus hechos».",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:21" },
      {
        t: "parrafo",
        texto: "«Examinadlo todo; retened lo bueno». Antes de creer y de compartir, se examina.",
      },
      { t: "subtitulo", texto: "Las voces y las imágenes falsas" },
      {
        t: "parrafo",
        texto:
          "En febrero de 2024, la Comisión Federal de Comunicaciones (FCC) aclaró que las voces hechas con inteligencia artificial, como las que imitan la voz de una persona, cuentan como voces artificiales en las llamadas automáticas, y que esas llamadas siguen las mismas reglas de consentimiento. Lo aclaró después de unas llamadas que imitaban la voz del presidente antes de unas elecciones primarias.",
      },
      { t: "subtitulo", texto: "Cómo usa la iglesia la inteligencia artificial" },
      {
        t: "lista",
        items: [
          "Como una ayuda, no como un reemplazo: puede ayudar a ordenar ideas, corregir la ortografía o traducir, pero una persona revisa todo.",
          "Se revisa cada dato, cada versículo y cada cita, porque la inteligencia artificial puede inventar.",
          "Nunca se inventan testimonios, citas ni fotos de cosas que no pasaron.",
          "No se imita la voz ni la cara de nadie sin su permiso, y nunca para que parezca decir lo que no dijo.",
          "Se dice cuándo una imagen fue hecha con inteligencia artificial.",
          "No se ponen en esas herramientas los datos privados de las personas.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: usar la inteligencia artificial con verdad y con engaño" },
      {
        t: "lista",
        items: [
          "Con verdad: pedirle ideas para el título de una serie y elegir uno. Con engaño: publicar un testimonio que nadie vivió.",
          "Con verdad: una imagen hecha con inteligencia artificial para un anuncio, diciendo que lo es. Con engaño: una foto falsa del templo lleno.",
          "Con verdad: traducir un anuncio y pedirle a alguien que sabe el idioma que lo revise. Con engaño: hacer que el pastor parezca decir algo que no dijo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un video que parece real" },
      {
        t: "parrafo",
        texto:
          "Llega por WhatsApp un video en el que un predicador conocido parece decir algo escandaloso, y muchos hermanos lo están compartiendo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, no compartirlo todavía: primero se examina.",
          "Paso 2, buscar de dónde viene: quién lo publicó primero, y si lo dicen medios confiables o la página del predicador.",
          "Paso 3, mirar los detalles: la boca que no coincide con la voz, las manos raras o el fondo que cambia.",
          "Paso 4, buscar el video completo o la fuente original, para ver si lo cortaron o lo hicieron con inteligencia artificial.",
          "Paso 5, si es falso o no se puede confirmar, no reenviarlo, y avisarle con amor al que lo mandó.",
          "Paso 6, si la iglesia ya lo había compartido, borrarlo y decir con humildad que no estaba confirmado.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La iglesia escribe su guía para usar la inteligencia artificial con estas reglas, y la revisa cada año, porque estas herramientas cambian rápido. Lo legal es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "La ley de Dios prohíbe el falso testimonio, Pablo manda no mentir, y la Biblia pide examinarlo todo y retener lo bueno. En 2024 la FCC aclaró que las voces hechas con inteligencia artificial cuentan como voces artificiales en las llamadas automáticas. La iglesia usa la inteligencia artificial como una ayuda y no como un reemplazo: revisa cada dato, nunca inventa testimonios, citas ni fotos, no imita la voz ni la cara de nadie sin permiso, dice cuándo una imagen fue hecha así y no pone datos privados. Y antes de compartir un video o una imagen, lo examina.",
    paraLaVida: {
      texto: "Antes de compartir, examino.",
      pregunta: "¿Qué video o imagen que compartiste hace poco deberías haber examinado antes?",
    },
  },
  {
    id: "comunicaciones-5-6",
    objetivos: [
      "Explicar, con Romanos 12:18 y Proverbios 26:4, cómo se modera con paz en las redes de la iglesia.",
      "Aplicar las normas de la comunidad: qué se borra, qué se responde y qué se reporta.",
      "Proteger a los menores en los canales de la iglesia y reportar lo que la ley pide.",
    ],
    paraEmpezar:
      "En las redes de la iglesia llegan preguntas, críticas, insultos y, a veces, personas que quieren hacer daño. El que modera no está solo para borrar: cuida la paz, responde con sabiduría y protege a los más vulnerables, sobre todo a los niños y a los jóvenes.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 12:18" },
      {
        t: "parrafo",
        texto: "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».",
      },
      { t: "versiculo", ref: "Proverbios 26:4" },
      {
        t: "parrafo",
        texto:
          "«Nunca respondas al necio de acuerdo con su necedad, Para que no seas tú también como él». Al que solo quiere pelear no se le sigue el juego.",
      },
      { t: "versiculo", ref: "Mateo 18:6" },
      {
        t: "parrafo",
        texto:
          "Jesús advirtió con dureza contra el que haga tropezar «a alguno de estos pequeños que creen en mí». Proteger a los niños también es tarea de los que manejan las redes.",
      },
      { t: "subtitulo", texto: "Las normas de la comunidad" },
      {
        t: "lista",
        items: [
          "Se borran los insultos, las amenazas, el contenido sexual, el spam y los datos privados de otros.",
          "No se borran las críticas honestas: se responden con calma y, si hace falta, en privado.",
          "Al que solo quiere pelear no se le responde según su necedad: se le oculta, se le bloquea o se le reporta.",
          "Si hay una amenaza de violencia, se guarda la prueba, se avisa al pastor y se llama a la policía, o al 911 si hay peligro.",
          "Ningún adulto se escribe en privado con un menor: los mensajes van a los padres o a un grupo con otro adulto, como se estudia en Protección de menores.",
          "La sospecha de abuso de un menor se reporta como pide la ley de Texas, a la línea 1-800-252-5400, o al 911 si hay peligro; y la explotación de menores en internet se reporta también a la CyberTipline del Centro Nacional para Niños Desaparecidos y Explotados, en report.cybertip.org.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: moderar bien y moderar mal" },
      {
        t: "lista",
        items: [
          "Bien: una crítica honesta se responde con calma. Mal: se borra para que nadie la vea.",
          "Bien: al que solo insulta se le oculta o se le bloquea. Mal: se discute con él en público.",
          "Bien: se guardan las pruebas de una amenaza y se avisa. Mal: se borra todo y no se dice nada.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un perfil falso escribe a los jóvenes" },
      {
        t: "parrafo",
        texto:
          "Varios jóvenes del grupo cuentan que un perfil que dice ser de un líder nuevo de la iglesia les escribe en privado y les pide fotos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, decirles a los jóvenes que no respondan ni manden nada, y que no borren los mensajes.",
          "Paso 2, avisar enseguida al pastor y a los padres de cada joven.",
          "Paso 3, confirmar que ese líder no existe, y guardar capturas de pantalla de los mensajes y del perfil, sin reenviar ni copiar ninguna imagen de un menor.",
          "Paso 4, reportarlo a la CyberTipline, en report.cybertip.org, y a la policía; y si hay sospecha de abuso, a la línea de Texas, al 1-800-252-5400.",
          "Paso 5, reportar el perfil a la red social y bloquearlo.",
          "Paso 6, avisar a las familias del grupo, sin exponer a los jóvenes, y recordar que ningún líder le escribe en privado a un menor.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Moderar cansa: leer insultos y amenazas pesa en el corazón. Se modera por turnos, se ora por el equipo y nadie carga solo con lo difícil. Lo legal es una guía general, no un consejo legal.",
      },
      {
        t: "cuadro",
        titulo: "Qué se borra, qué se responde y qué se reporta",
        columnas: ["Lo que llega", "Qué hace el equipo"],
        filas: [
          ["Insultos, contenido sexual, spam o datos privados de otros", "Se borra, como dicen las normas de la comunidad"],
          ["Una crítica honesta", "Se responde con calma y, si hace falta, en privado"],
          ["Alguien que solo quiere pelear", "No se le responde según su necedad: se le oculta, se le bloquea o se le reporta (Proverbios 26:4)"],
          ["Una amenaza de violencia", "Se guarda la prueba, se avisa al pastor y se llama a la policía, o al 911 si hay peligro"],
          ["Un adulto que busca en privado a un menor", "Se guarda la prueba, se avisa a los padres y al pastor, y se reporta a la policía y a la CyberTipline"],
        ],
      },
    ],
    ideaClave:
      "La Biblia pide estar en paz con todos en cuanto dependa de nosotros, no responderle al necio según su necedad, y Jesús advierte contra el que hace tropezar a los pequeños. Las normas de la comunidad borran los insultos, las amenazas, el contenido sexual, el spam y los datos privados; responden con calma las críticas honestas; ocultan, bloquean o reportan al que solo quiere pelear; y ante una amenaza guardan la prueba y avisan. Ningún adulto se escribe en privado con un menor, y la sospecha de abuso se reporta a la línea de Texas, al 911 si hay peligro y, si es en internet, a la CyberTipline.",
    paraLaVida: {
      texto: "Modero con paz y protejo a los pequeños.",
      pregunta: "¿Qué norma de la comunidad le falta a las redes de tu iglesia?",
    },
  },
];
