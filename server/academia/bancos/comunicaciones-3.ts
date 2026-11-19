/**
 * El banco de «Video y transmisiones» (especialidad Comunicaciones y medios, materia 3). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el video al servicio del evangelio · o2 contar historias con imágenes · o3 la cámara y la luz · o4 la
 * transmisión del culto · o5 los derechos y los permisos · o6 editar y publicar con propósito · o7 el versículo de memoria
 * (1 Juan 1:3). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y
 * preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `comunicaciones-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_COMUNICACIONES_3: BancoMateria = {
  materia: "comunicaciones-3",
  repaso: {
    "comunicaciones-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué anunciaba Juan, según 1 Juan 1:3?", "Lo que había visto y oído", ["Lo que imaginaba", "Lo que otros le contaron sin haberlo visto", "Solo sus opiniones"], "«lo que hemos visto y oído, eso os anunciamos».", "1 Juan 1:1-3"],
      ["1-r2", 1, "o1", "comprender", "¿Para qué sirve la transmisión del culto?", "Para los enfermos, los que viajan y los que todavía no se animan a venir", ["Para que nadie vuelva al templo", "Para mostrar el edificio", "Para ganar dinero"], "Se anuncia a Cristo «para que también vosotros tengáis comunión con nosotros».", "1 Juan 1:1-3"],
      ["1-r3", 1, "o1", "aplicar", "Tu iglesia quiere empezar con el video, pero tiene poco equipo y dos voluntarios. ¿Qué hace primero?", "Escribe el propósito y empieza con una sola cosa bien hecha, con el equipo que ya tiene", ["Compra cámaras caras", "Hace cinco videos por semana", "Espera a tener un estudio profesional"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ] as P[]).map(p),
    "comunicaciones-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué le pidió Jesús al hombre libertado, según Marcos 5:19?", "Que fuera a los suyos y les contara cuán grandes cosas el Señor había hecho con él", ["Que se quedara callado", "Que lo siguiera en silencio", "Que se fuera lejos"], "«Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
      ["2-r2", 2, "o2", "comprender", "¿Cuáles son las partes de un testimonio en video?", "El antes, el encuentro con Cristo, el después y una invitación", ["Solo el pasado, con todos sus detalles", "Solo una canción", "Una lista de reglas"], "«Díganlo los redimidos de Jehová».", "Salmos 107:2"],
      ["2-r3", 2, "o2", "aplicar", "Un hermano quiere contar su testimonio dando todos los detalles de los pecados de su pasado. ¿Qué le aconsejas?", "Que ponga a Cristo en el centro y cuente su antes sin detalles que lo avergüencen o que hagan atractivo el pecado", ["Que cuente todo con detalles para impactar", "Que no cuente nada", "Que exagere para que se vea más"], "El centro es lo que Dios hizo: «cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
    ] as P[]).map(p),
    "comunicaciones-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Cómo pide Colosenses 3:23 que hagamos todo?", "De corazón, como para el Señor y no para los hombres", ["Rápido, para terminar", "Para que nos vean", "Solo cuando hay ganas"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué la luz no debe estar detrás de la persona que se graba?", "Porque la cara se ve oscura; la luz va de frente o de lado", ["Porque la luz no importa", "Porque la cámara se rompe", "Sí debe estar detrás"], "«Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas».", "Eclesiastés 9:10"],
      ["3-r3", 3, "o3", "aplicar", "Tienes que grabar un anuncio con un teléfono, pero la imagen tiembla. ¿Qué haces?", "Pones el teléfono en un trípode o lo apoyas, y grabas una prueba antes", ["Grabas igual", "Mueves más la cámara para que se vea dinámico", "Grabas desde lejos"], "«¿Has visto hombre solícito en su trabajo? Delante de los reyes estará».", "Proverbios 22:29"],
    ] as P[]).map(p),
    "comunicaciones-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pide Hebreos 10:25 que no dejemos de hacer?", "Congregarnos", ["Trabajar", "Comer", "Viajar"], "«no dejando de congregarnos, como algunos tienen por costumbre».", "Hebreos 10:24-25"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué el sonido de la transmisión se toma de la consola y no del micrófono de la cámara?", "Porque así se oye claro, sin el eco y el ruido del templo", ["Porque la cámara no tiene micrófono", "No importa de dónde se tome", "Porque la consola es más barata"], "«si por la lengua no diereis palabra bien comprensible, ¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
      ["4-r3", 4, "o4", "aplicar", "Una hermana pasa al altar llorando durante la transmisión. ¿Qué hace el que maneja la cámara?", "No la enfoca de cerca sin su permiso, y muestra un plano más abierto o el púlpito", ["La enfoca de cerca para que se vea la emoción", "Detiene la transmisión", "La graba para publicarla después"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24-25"],
    ] as P[]).map(p),
    "comunicaciones-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pide procurar Romanos 12:17?", "Lo bueno delante de todos los hombres", ["Lo que nos conviene", "La venganza", "La fama"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
      ["5-r2", 5, "o5", "comprender", "¿Qué diferencia hay entre un reclamo de Content ID y una falta por infracción de derechos de autor?", "El reclamo afecta a ese video y normalmente no es una falta; la falta llega cuando el dueño pide que se quite el video, y cuenta contra el canal", ["Son lo mismo", "El reclamo cierra el canal enseguida", "La falta solo cambia el título"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["5-r3", 5, "o5", "aplicar", "Un video de la iglesia recibe un reclamo de Content ID por una canción que no tenían permiso de usar. ¿Qué hacen?", "No lo impugnan, y quitan la canción o suben el video con música permitida", ["Lo impugnan aunque no tengan permiso", "Lo ignoran", "Suben el mismo video otra vez"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27"],
    ] as P[]).map(p),
    "comunicaciones-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué procuró el Predicador, según Eclesiastés 12:10?", "Hallar palabras agradables y escribir rectamente palabras de verdad", ["Hablar mucho", "Impresionar a todos", "Escribir en secreto"], "«Procuró el Predicador hallar palabras agradables, y escribir rectamente palabras de verdad».", "Eclesiastés 12:10"],
      ["6-r2", 6, "o6", "comprender", "¿Para qué sirven los subtítulos de un video?", "Para los que ven sin sonido, los que no oyen bien y los que hablan otro idioma", ["Para adornar el video", "Para que dure más", "No sirven"], "En Pentecostés cada uno oyó «en nuestra lengua en la que hemos nacido».", "Hechos 2:8"],
      ["6-r3", 6, "o6", "aplicar", "Un editor quiere unir frases de una predicación para que el pastor parezca decir algo más fuerte. ¿Qué le dices?", "Que no se edita para cambiar el sentido de lo que se dijo", ["Que lo haga si da más vistas", "Que lo haga sin decirle al pastor", "Que cambie solo el título"], "Se escriben «rectamente palabras de verdad».", "Eclesiastés 12:10"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El video al servicio del evangelio
    ["f01", 1, "o1", "recordar", "¿Para qué anunciaba Juan lo que había visto y oído, según 1 Juan 1:3?", "Para que también ellos tuvieran comunión con los apóstoles, y con el Padre y su Hijo", ["Para ser famoso", "Para ganar dinero", "Para discutir"], "«para que también vosotros tengáis comunión con nosotros; y nuestra comunión verdaderamente es con el Padre, y con su Hijo Jesucristo».", "1 Juan 1:1-3"],
    ["f02", 1, "o1", "recordar", "¿Para qué se escribió el evangelio de Juan, según Juan 20:31?", "Para que creamos que Jesús es el Cristo, el Hijo de Dios", ["Para contar historias antiguas", "Para tener un libro más", "Para criticar a los fariseos"], "«Pero éstas se han escrito para que creáis que Jesús es el Cristo, el Hijo de Dios».", "Juan 20:30-31"],
    ["f03", 1, "o1", "comprender", "¿Qué le enseña Habacuc 2:2 al que hace videos?", "Que lo que se muestra debe ser claro, para que se entienda y mueva a actuar", ["Que hay que esconder la visión", "Que no hay que escribir nada", "Que se escribe solo para los sabios"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f04", 1, "o1", "comprender", "¿Para qué sirve un video de anuncio?", "Para invitar con claridad a un evento, con la fecha, la hora y el lugar", ["Para transmitir el culto entero", "Para guardar los datos de la gente", "No sirve"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f05", 1, "o1", "comprender", "¿Qué diferencia hay entre un video con propósito y uno sin propósito?", "El que tiene propósito sabe a quién le habla, muestra a Cristo y es breve; el otro se graba porque sí", ["Ninguna", "El que no tiene propósito es más espiritual", "El que tiene propósito es más largo"], "«para que creáis que Jesús es el Cristo».", "Juan 20:30-31"],
    ["f06", 1, "o1", "analizar", "¿Por qué el video no reemplaza la presencia en la iglesia?", "Porque la comunión se vive juntos, y el video sirve para que más personas lleguen a ella", ["Porque el video es malo", "Sí la reemplaza", "Porque no hay internet en las iglesias"], "«para que también vosotros tengáis comunión con nosotros».", "1 Juan 1:1-3"],
    ["f07", 1, "o1", "aplicar", "Tu iglesia quiere hacer cinco videos por semana con un solo voluntario. ¿Qué le aconsejas?", "Empezar con una sola cosa bien hecha y crecer poco a poco", ["Hacer los cinco aunque salgan mal", "Contratar a cualquiera", "No hacer ninguno"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f08", 1, "o1", "aplicar", "Un hermano quiere grabar un video que muestre solo el nuevo edificio de la iglesia. ¿Qué le propones?", "Que muestre también a Cristo y a las personas que Dios está transformando, con una invitación clara", ["Que muestre solo el edificio", "Que no grabe nada", "Que muestre solo al pastor"], "«lo que hemos visto y oído, eso os anunciamos».", "1 Juan 1:1-3"],
    ["f09", 1, "o1", "aplicar", "Te piden publicar un video de la iglesia sin haber conseguido los permisos de la música. ¿Qué haces?", "Consigues primero los permisos y las licencias, y después publicas", ["Lo publicas igual", "Le quitas el sonido sin avisar", "Lo publicas en otra cuenta"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
    ["f10", 1, "o7", "recordar", "Completa 1 Juan 1:3: lo que hemos visto y oído, eso os anunciamos…", "para que también vosotros tengáis comunión con nosotros", ["para que nadie dude de nosotros", "para que nos sigáis a nosotros", "para que lo guardéis en secreto"], "«lo que hemos visto y oído, eso os anunciamos, para que también vosotros tengáis comunión con nosotros».", "1 Juan 1:3"],
    // Lección 2 · Contar historias con imágenes
    ["f11", 2, "o2", "recordar", "¿Cómo les hablaba Jesús a la gente, según Mateo 13:34?", "Por parábolas", ["Con gritos", "Con leyes escritas", "En otro idioma"], "«Todo esto habló Jesús por parábolas a la gente».", "Mateo 13:34"],
    ["f12", 2, "o2", "recordar", "¿Quiénes deben decirlo, según Salmos 107:2?", "Los redimidos de Jehová", ["Solo los sacerdotes", "Los reyes", "Los extranjeros"], "«Díganlo los redimidos de Jehová».", "Salmos 107:2"],
    ["f13", 2, "o2", "recordar", "¿A dónde mandó Jesús al hombre libertado, según Marcos 5:19?", "A su casa, a los suyos", ["A Jerusalén", "Al templo", "Al desierto"], "«Vete a tu casa, a los tuyos».", "Marcos 5:19"],
    ["f14", 2, "o2", "comprender", "¿Por qué las historias ayudan tanto en un video?", "Porque se recuerdan más que una lista de ideas, como las parábolas de Jesús", ["Porque son más cortas que todo", "Porque no enseñan nada", "No ayudan"], "«y sin parábolas no les hablaba».", "Mateo 13:34"],
    ["f15", 2, "o2", "comprender", "¿Qué hace que un testimonio honre a Dios?", "Que Cristo sea el centro, que sea verdadero y sencillo, y que cuide la dignidad de todos", ["Que cuente todos los detalles del pecado", "Que exagere para impresionar", "Que exponga a otras personas"], "«cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
    ["f16", 2, "o2", "analizar", "¿Por qué se le muestra el video a la persona antes de publicar su testimonio?", "Para respetar su historia, corregir lo que no quiere y confirmar su permiso", ["Para que lo pague", "No hace falta", "Para que lo publique ella"], "Es su historia: «Díganlo los redimidos de Jehová».", "Salmos 107:2"],
    ["f17", 2, "o2", "aplicar", "Una joven quiere contar su testimonio, pero le da miedo hablar frente a la cámara. ¿Qué haces?", "Le haces preguntas sencillas, como en una conversación, en vez de pedirle que lea un guion", ["Le pides que lo memorice todo", "La presionas para que hable rápido", "Lo cuentas tú en su lugar sin preguntarle"], "«cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
    ["f18", 2, "o2", "aplicar", "Un hermano grabado en un testimonio nombra a su exesposa y cuenta lo que ella hizo. ¿Qué haces?", "Quitas esa parte al editar, porque no se expone a otras personas", ["La dejas para que sea más real", "Pones también su foto", "Publicas el video sin mostrárselo"], "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f19", 2, "o2", "aplicar", "Una madre quiere que su hijo de diez años cuente en video cómo Dios lo sanó. ¿Qué haces?", "Pides el permiso escrito de sus padres y cuidas sus datos, sin su nombre completo ni su escuela", ["Lo grabas sin pedir nada", "Publicas su nombre completo y su escuela", "Le pides que lo cuente solo"], "«Mirad que no menospreciéis a uno de estos pequeños».", "Mateo 18:10"],
    ["f20", 2, "o2", "evaluar", "¿Qué testimonio en video está mejor hecho?", "Uno con su antes, su encuentro y su después, con permiso por escrito, revisado con la persona y con una invitación clara", ["Uno largo con todos los detalles del pasado", "Uno grabado a escondidas", "Uno exagerado para que impacte"], "«Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
    // Lección 3 · La cámara y la luz
    ["f21", 3, "o3", "recordar", "¿Delante de quién estará el hombre solícito en su trabajo, según Proverbios 22:29?", "Delante de los reyes", ["Delante de los de baja condición", "Delante de nadie", "Delante de sus enemigos"], "«Delante de los reyes estará».", "Proverbios 22:29"],
    ["f22", 3, "o3", "recordar", "¿Cómo pide Eclesiastés 9:10 hacer lo que viene a la mano?", "Según tus fuerzas", ["Con flojera", "Sin pensar", "Cuando haya tiempo"], "«Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas».", "Eclesiastés 9:10"],
    ["f23", 3, "o3", "recordar", "¿Para quién pide Colosenses 3:23 que hagamos todo?", "Para el Señor y no para los hombres", ["Para los hombres", "Para nosotros", "Para el pastor"], "«como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f24", 3, "o3", "comprender", "¿Dónde se ponen los ojos de la persona al encuadrar una toma?", "Cerca del tercio de arriba de la imagen, con un poco de espacio sobre la cabeza", ["En el centro exacto, sin espacio", "En la parte de abajo", "Fuera de la imagen"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
    ["f25", 3, "o3", "comprender", "¿Cuándo se graba en horizontal y cuándo en vertical?", "En horizontal para la transmisión, y en vertical para los videos cortos de algunas redes", ["Siempre en vertical", "Siempre en horizontal", "Nunca importa"], "«hazlo según tus fuerzas».", "Eclesiastés 9:10"],
    ["f26", 3, "o3", "analizar", "¿Por qué una toma cuidada ayuda al mensaje?", "Porque una imagen quieta, con luz y sin distracciones deja que la gente preste atención a lo que se dice", ["Porque cuesta más", "No ayuda", "Porque así dura más"], "«Y todo lo que hagáis, hacedlo de corazón».", "Colosenses 3:23"],
    ["f27", 3, "o3", "aplicar", "Tienes que grabar al pastor, y detrás de él hay una ventana con mucha luz. ¿Qué haces?", "Lo cambias de lugar para que la luz de la ventana le dé de frente", ["Grabas igual", "Apagas todas las luces", "Grabas desde más lejos"], "«hazlo según tus fuerzas».", "Eclesiastés 9:10"],
    ["f28", 3, "o3", "aplicar", "Un voluntario graba el culto con el teléfono en la mano, y todo tiembla. ¿Qué le aconsejas?", "Que use un trípode o apoye el teléfono, y mantenga la imagen quieta", ["Que se mueva más", "Que grabe más cerca de la gente", "Que deje de grabar"], "«¿Has visto hombre solícito en su trabajo? Delante de los reyes estará».", "Proverbios 22:29"],
    ["f29", 3, "o3", "aplicar", "Tu equipo va a grabar un anuncio con cajas y cables en el fondo. ¿Qué hace?", "Ordena el fondo o busca otro lugar sencillo antes de grabar", ["Graba igual", "Lo tapa con un filtro de colores", "Lo publica sin revisar"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor».", "Colosenses 3:23"],
    ["f30", 3, "o3", "evaluar", "¿Qué manera de grabar un anuncio con un teléfono es la mejor?", "Escribir el mensaje, buscar un lugar callado con luz de frente, usar un trípode, hacer una prueba y grabar varias tomas", ["Grabar de una vez sin preparar nada", "Grabar con la luz detrás", "Grabar mientras se camina"], "«Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas».", "Eclesiastés 9:10"],
    // Lección 4 · La transmisión del culto
    ["f31", 4, "o4", "recordar", "¿Para qué pide Hebreos 10:24 que nos consideremos unos a otros?", "Para estimularnos al amor y a las buenas obras", ["Para criticarnos", "Para compararnos", "Para competir"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24-25"],
    ["f32", 4, "o4", "recordar", "¿En qué perseveraban los primeros creyentes, según Hechos 2:42?", "En la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones", ["En los negocios", "En las fiestas", "En las discusiones"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:42"],
    ["f33", 4, "o4", "recordar", "¿Dónde dice el salmista que alabará a Dios, según Salmos 22:22?", "En medio de la congregación", ["En secreto", "En el desierto", "Lejos de todos"], "«En medio de la congregación te alabaré».", "Salmos 22:22"],
    ["f34", 4, "o4", "comprender", "¿Qué hace el anfitrión del chat durante una transmisión?", "Saluda, responde y ora con los que escriben", ["Borra los comentarios", "Vende productos", "No hace nada"], "«Y considerémonos unos a otros».", "Hebreos 10:24-25"],
    ["f35", 4, "o4", "comprender", "¿Por qué se hace una transmisión de prueba antes del culto?", "Para descubrir y corregir los problemas antes de que empiece el culto", ["Para gastar internet", "No hace falta", "Para que nadie la vea"], "«Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas».", "Eclesiastés 9:10"],
    ["f36", 4, "o4", "analizar", "¿Por qué no se transmite el salón de los niños?", "Para proteger a los niños y su privacidad", ["Porque los niños no importan", "Porque no hay cámaras", "Sí se debe transmitir"], "«Mirad que no menospreciéis a uno de estos pequeños».", "Mateo 18:10"],
    ["f37", 4, "o4", "aplicar", "Tu transmisión se corta porque se cayó internet. ¿Qué haces?", "Pones una imagen con un aviso, vuelves a conectar con calma y no culpas a nadie al aire", ["Cancelas el culto", "Culpas al técnico al aire", "Te vas a casa"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f38", 4, "o4", "aplicar", "Un hermano dice que ya no viene al templo porque ve el culto en línea. ¿Qué le dices?", "Que la transmisión sirve al que no puede venir, y lo animas con cariño a congregarse", ["Que está bien, que no venga", "Que deje de ver la transmisión", "Lo regañas frente a todos"], "«no dejando de congregarnos, como algunos tienen por costumbre».", "Hebreos 10:24-25"],
    ["f39", 4, "o4", "aplicar", "Tu iglesia va a transmitir por primera vez el domingo. ¿Qué hace el martes antes?", "Revisa el equipo, la conexión a internet y las licencias de la música", ["Nada, eso se hace el domingo", "Compra todo nuevo", "Invita a la gente sin probar nada"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f40", 4, "o4", "evaluar", "¿Qué transmisión del culto está mejor preparada?", "Una con el sonido de la consola, una prueba antes, una lista de pasos, un plan por si falla, un anfitrión en el chat y cuidado de los que oran y de los niños", ["Una con el micrófono de la cámara y sin prueba", "Una sin nadie en el chat", "Una que enfoca de cerca a todos"], "«En medio de la congregación te alabaré».", "Salmos 22:22"],
    // Lección 5 · Los derechos y los permisos en video
    ["f41", 5, "o5", "recordar", "¿Qué pide Proverbios 3:27 que no nos neguemos a hacer?", "El bien a quien es debido", ["El castigo", "La ayuda a los ricos", "La crítica"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27"],
    ["f42", 5, "o5", "recordar", "¿Cómo procuraba Pablo hacer las cosas, según 2 Corintios 8:21?", "Honradamente, delante del Señor y delante de los hombres", ["En secreto", "Rápido", "Solo delante del Señor"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f43", 5, "o5", "recordar", "¿Qué no se debe pagar a nadie, según Romanos 12:17?", "Mal por mal", ["Lo que se debe", "El salario", "El respeto"], "«No paguéis a nadie mal por mal».", "Romanos 12:17"],
    ["f44", 5, "o5", "comprender", "¿Qué cubre la licencia de transmisión de CCLI?", "Las canciones de su catálogo en un culto transmitido; las grabaciones originales y las pistas necesitan su versión ampliada", ["Cualquier canción del mundo", "Las películas", "Nada"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27"],
    ["f45", 5, "o5", "comprender", "¿Qué puede pasar si un canal recibe tres faltas por infracción de derechos de autor en 90 días?", "YouTube puede cancelar el canal", ["No pasa nada", "Le dan un premio", "Solo le bajan el volumen"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
    ["f46", 5, "o5", "analizar", "¿Por qué no se impugna un reclamo de Content ID sin un motivo válido?", "Porque el dueño puede pedir que se quite el video, y eso sí puede terminar en una falta", ["Porque impugnar es pecado", "Porque así se gana dinero", "Sí se debe impugnar siempre"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
    ["f47", 5, "o5", "aplicar", "Un voluntario baja de internet un video famoso para usarlo en el culto transmitido. ¿Qué le dices?", "Que solo se usan videos propios, comprados con licencia o con permiso del autor", ["Que lo use, porque es para Dios", "Que le cambie el título", "Que lo use en baja calidad"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27"],
    ["f48", 5, "o5", "aplicar", "Una persona que salió en un video de la iglesia pide que lo quiten. ¿Qué haces?", "Quitas el video o la recortas, y le agradeces que avisó", ["Le dices que ya no se puede", "Lo dejas porque tiene muchas vistas", "Le pides que lo pague"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
    ["f49", 5, "o5", "aplicar", "Tu iglesia quiere transmitir el culto con las pistas originales de las canciones. ¿Qué revisa?", "Que su licencia de transmisión incluya las grabaciones y las pistas, con la versión ampliada", ["Nada", "Solo el internet", "Solo la cámara"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de cuidar los derechos en un video es la mejor?", "Tener en regla la música, usar imágenes propias o con licencia, pedir permiso a las personas y a los padres de los niños, y dar el crédito", ["Usar lo que sea si es para Dios", "Pedir permiso solo a veces", "Esperar a que llegue un reclamo"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    // Lección 6 · Editar y publicar con propósito
    ["f51", 6, "o6", "recordar", "¿Qué pregunta Pablo en 1 Corintios 14:9?", "Cómo se entenderá lo que decimos si no damos palabra bien comprensible", ["Por qué hablamos tanto", "Quién nos enseñó", "Cuándo volveremos"], "«si por la lengua no diereis palabra bien comprensible, ¿cómo se entenderá lo que decís?».", "1 Corintios 14:9"],
    ["f52", 6, "o6", "recordar", "¿Qué se preguntaba la gente en Pentecostés, según Hechos 2:8?", "Cómo los oía hablar cada uno en su propia lengua", ["Quién había construido el templo", "Por qué no llovía", "Cuándo comerían"], "«¿Cómo, pues, les oímos nosotros hablar cada uno en nuestra lengua en la que hemos nacido?».", "Hechos 2:8"],
    ["f53", 6, "o6", "recordar", "¿Cómo escribió el Predicador, según Eclesiastés 12:10?", "Rectamente, con palabras de verdad", ["Con mentiras agradables", "Sin pensar", "En secreto"], "«y escribir rectamente palabras de verdad».", "Eclesiastés 12:10"],
    ["f54", 6, "o6", "comprender", "¿Qué significa cortar sin cambiar el sentido?", "Quitar lo que sobra, pero respetar lo que la persona quiso decir", ["Unir frases para que diga otra cosa", "Cortarlo todo", "No cortar nunca"], "Se escriben «rectamente palabras de verdad».", "Eclesiastés 12:10"],
    ["f55", 6, "o6", "comprender", "¿Cómo debe ser el título de un video?", "Honesto: debe decir de qué trata el video, sin engañar para ganar vistas", ["Escandaloso, para que hagan clic", "Largo, con todo el sermón", "Sin relación con el video"], "«Procuró el Predicador hallar palabras agradables, y escribir rectamente palabras de verdad».", "Eclesiastés 12:10"],
    ["f56", 6, "o6", "analizar", "¿Por qué otra persona revisa el video antes de publicarlo?", "Porque ve los errores que el editor no ve, y cuida que todo sea verdadero y claro", ["Para retrasarlo", "No hace falta", "Para cambiar el mensaje"], "Se busca una «palabra bien comprensible».", "1 Corintios 14:9"],
    ["f57", 6, "o6", "aplicar", "Tu equipo tiene una predicación de una hora y quiere un video corto para las redes. ¿Qué hace primero?", "Elige el momento con una sola idea clara y completa", ["Sube la hora completa sin editar", "Junta frases de distintos momentos", "Pone solo la música"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
    ["f58", 6, "o6", "aplicar", "Un video corto de la iglesia no tiene subtítulos, y muchos lo ven sin sonido. ¿Qué haces?", "Le pones subtítulos revisados palabra por palabra", ["Lo dejas así", "Le subes el volumen", "Lo borras"], "Cada uno debe poder entenderlo, como en Pentecostés: «cada uno en nuestra lengua en la que hemos nacido».", "Hechos 2:8"],
    ["f59", 6, "o6", "aplicar", "Un editor quiere usar una imagen escandalosa en la portada para que hagan clic. ¿Qué le dices?", "Que la portada debe mostrar lo que hay en el video, sin engañar", ["Que la use, porque funciona", "Que la use solo una vez", "Que no ponga portada"], "Se escriben «rectamente palabras de verdad».", "Eclesiastés 12:10"],
    ["f60", 6, "o6", "evaluar", "¿Qué video corto sacado de una predicación está mejor hecho?", "Uno con una idea clara y completa, sin cambiar el sentido, con subtítulos revisados, un título honesto, revisado por el pastor y con el enlace a la predicación completa", ["Uno con frases unidas para que impacte", "Uno con un título engañoso", "Uno sin revisar"], "«Procuró el Predicador hallar palabras agradables, y escribir rectamente palabras de verdad».", "Eclesiastés 12:10"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué palparon las manos de los testigos, según 1 Juan 1:1?", "Lo tocante al Verbo de vida", ["Un libro", "Una espada", "El templo"], "«y palparon nuestras manos tocante al Verbo de vida».", "1 Juan 1:1-3"],
      ["m1-02", 1, "o1", "comprender", "¿Qué clases de video usa una iglesia?", "La transmisión del culto, el video corto, el video de enseñanza y el de anuncio", ["Solo películas", "Solo anuncios", "Solo música"], "«lo que hemos visto y oído, eso os anunciamos».", "1 Juan 1:1-3"],
      ["m1-03", 1, "o1", "aplicar", "Tu iglesia no sabe qué video hacer primero. ¿Qué le recomiendas?", "Escribir el propósito y empezar por la transmisión del domingo o por un video corto cada semana", ["Hacer de todo a la vez", "No hacer nada", "Copiar a otra iglesia"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué un video debe pedirle un paso claro al que lo ve?", "Porque la meta es llevar a la persona a Cristo y a la comunión, no solo informar", ["Porque así dura más", "No debe pedir nada", "Para vender algo"], "«para que también vosotros tengáis comunión con nosotros».", "1 Juan 1:1-3"],
      ["m1-05", 1, "o1", "recordar", "¿Qué más hizo Jesús, según Juan 20:30?", "Muchas otras señales que no están escritas en ese libro", ["Nada más", "Escribió otro libro", "Construyó un templo"], "«Hizo además Jesús muchas otras señales en presencia de sus discípulos, las cuales no están escritas en este libro».", "Juan 20:30-31"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué comienzo de un ministerio de video es el mejor?", "Un propósito escrito, una sola cosa bien hecha, el equipo que hay, voluntarios capacitados, los permisos en regla y una revisión cada mes", ["Comprar equipo caro primero", "Grabar sin permisos", "Hacer todo sin plan"], "«Escribe la visión».", "Habacuc 2:2"],
      ["m1-07", 2, "o2", "recordar", "¿Qué más debía contar el hombre libertado, según Marcos 5:19?", "Cómo el Señor había tenido misericordia de él", ["Cómo había sufrido", "Cómo era el lugar", "Cuánto dinero tenía"], "«y cómo ha tenido misericordia de ti».", "Marcos 5:19"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué Jesús enseñaba con parábolas?", "Porque las historias tocan la vida, se recuerdan y hacen pensar al que escucha", ["Porque no sabía otra forma", "Para entretener", "Para que nadie pensara"], "«y sin parábolas no les hablaba».", "Mateo 13:34"],
      ["m1-09", 2, "o2", "aplicar", "Una hermana quiere grabar su testimonio, pero no quiere que se vea su cara. ¿Qué haces?", "Respetas su deseo y buscas otra manera, como grabar solo su voz o sus manos", ["La convences de mostrar su cara", "La grabas sin decirle", "No la dejas contar su testimonio"], "«Díganlo los redimidos de Jehová».", "Salmos 107:2"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué en un testimonio no se hace ver el pecado como algo atractivo?", "Porque el centro es Cristo y lo que él hizo, no el pecado", ["Porque el pecado no existe", "Porque así es más corto", "No importa"], "«cuéntales cuán grandes cosas el Señor ha hecho contigo».", "Marcos 5:19"],
      ["m1-11", 2, "o2", "comprender", "¿Por qué se pide por escrito el permiso para grabar un testimonio?", "Para que la persona sepa dónde se verá y quede claro que aceptó", ["Para cobrarle", "No hace falta", "Para que no pueda cambiar de opinión nunca"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué hace mejor el equipo con un testimonio grabado?", "Lo edita con el antes, el encuentro y el después, se lo muestra a la persona y lo quita si ella lo pide", ["Lo publica sin mostrárselo", "Le agrega detalles que no contó", "Lo usa para otra cosa sin permiso"], "«Vete a tu casa, a los tuyos, y cuéntales».", "Marcos 5:19"],
      ["m1-13", 3, "o3", "recordar", "¿Qué no hay en el Seol, según Eclesiastés 9:10?", "Obra, ni trabajo, ni ciencia, ni sabiduría", ["Descanso", "Silencio", "Personas"], "«porque en el Seol, adonde vas, no hay obra, ni trabajo, ni ciencia, ni sabiduría».", "Eclesiastés 9:10"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es lo básico de una buena imagen?", "Una cámara quieta, un buen encuadre, la luz de frente y un fondo sencillo", ["Una cámara muy cara", "Muchos efectos especiales", "Mucha gente en el fondo"], "«hazlo según tus fuerzas».", "Eclesiastés 9:10"],
      ["m1-15", 3, "o3", "aplicar", "Te toca grabar en el culto, y una familia no quiere salir en el video. ¿Qué haces?", "Los respetas y no los grabas de cerca, cuidando los planos", ["Los grabas igual", "Les pides que se vayan", "Los grabas sin que se den cuenta"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué se graba una prueba de diez segundos antes del anuncio completo?", "Para revisar la luz, el encuadre y el sonido antes de gastar tiempo", ["Para tener más archivos", "No hace falta", "Para publicarla también"], "«¿Has visto hombre solícito en su trabajo?».", "Proverbios 22:29"],
      ["m1-17", 3, "o3", "recordar", "¿Delante de quiénes no estará el hombre solícito, según Proverbios 22:29?", "Delante de los de baja condición", ["Delante de los reyes", "Delante de su familia", "Delante de Dios"], "«No estará delante de los de baja condición».", "Proverbios 22:29"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué toma está mejor hecha?", "Una con la imagen quieta, la cara con luz, un fondo ordenado y el sonido claro", ["Una con la imagen temblando", "Una con una ventana detrás", "Una con cajas y cables en el fondo"], "«Y todo lo que hagáis, hacedlo de corazón».", "Colosenses 3:23"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hacían los creyentes en vez de dejar de congregarse, según Hebreos 10:25?", "Se exhortaban unos a otros", ["Dormían", "Viajaban", "Se separaban"], "«sino exhortándonos; y tanto más, cuanto veis que aquel día se acerca».", "Hebreos 10:24-25"],
      ["m2-02", 4, "o4", "comprender", "¿Qué necesita una transmisión del culto?", "La imagen, el sonido de la consola, el programa de transmisión, una buena conexión, la plataforma y un anfitrión en el chat", ["Solo una cámara", "Solo internet", "Nada especial"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-03", 4, "o4", "aplicar", "Tu transmisión tiene preguntas en el chat que nadie responde. ¿Qué haces?", "Nombras a un anfitrión que salude, responda y ore con los que escriben", ["Desactivas el chat", "Lo ignoras", "Respondes solo al final del mes"], "«Y considerémonos unos a otros».", "Hebreos 10:24-25"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué la transmisión debe animar a congregarse?", "Porque la comunión se vive juntos, y la transmisión es un puente, no un reemplazo", ["Porque así hay más vistas", "No debe animar", "Porque la transmisión es mejor"], "«no dejando de congregarnos».", "Hebreos 10:24-25"],
      ["m2-05", 4, "o4", "aplicar", "Un hermano que está internado en el hospital quiere ver el culto. ¿Qué haces?", "Le envías el enlace de la transmisión, y alguien del chat lo saluda y ora por él", ["Le dices que espere a sanarse", "No le envías nada", "Le pides que venga igual"], "«Anunciaré tu nombre a mis hermanos».", "Salmos 22:22"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué plan para la primera transmisión es el mejor?", "Revisar el equipo y las licencias, hacer una prueba privada, llegar antes el domingo, cuidar el chat, tener un plan si falla y revisar después", ["Prender la cámara el domingo y ver qué pasa", "Transmitir sin licencias", "No revisar la grabación"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
      ["m2-07", 5, "o5", "recordar", "¿Cuándo pide Proverbios 3:27 hacer el bien a quien es debido?", "Cuando tuvieres poder para hacerlo", ["Nunca", "Solo el domingo", "Cuando sobre tiempo"], "«No te niegues a hacer el bien a quien es debido, Cuando tuvieres poder para hacerlo».", "Proverbios 3:27"],
      ["m2-08", 5, "o5", "comprender", "¿Cuándo vence una falta por infracción de derechos de autor en YouTube?", "A los 90 días, si se completa el Curso de Derechos de Autor y el canal tiene menos de tres", ["Nunca", "Al día siguiente", "Cuando se borra el video"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m2-09", 5, "o5", "aplicar", "Tu iglesia quiere usar en un video una foto que encontró en internet. ¿Qué hace?", "Usa solo fotos propias, compradas con licencia o con permiso del autor, y da el crédito si la licencia lo pide", ["La usa sin preguntar", "Le quita la marca del autor", "La usa en baja calidad"], "«No te niegues a hacer el bien a quien es debido».", "Proverbios 3:27"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué usar música sin permiso daña el testimonio de la iglesia?", "Porque es tomar el trabajo de otros, y la iglesia debe procurar lo bueno delante de todos", ["Porque la música es mala", "No lo daña", "Porque nadie se entera"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
      ["m2-11", 5, "o5", "comprender", "¿Qué hace un reclamo de Content ID?", "Afecta a ese video, por ejemplo al bloquearlo o al darle sus ingresos al dueño", ["Cierra el canal enseguida", "Borra todos los videos", "Nada"], "«procurad lo bueno delante de todos los hombres».", "Romanos 12:17"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué respuesta a un reclamo de Content ID por una canción sin permiso es la mejor?", "No impugnarlo, quitar la canción o subir el video con música permitida, y aprender para la próxima", ["Impugnarlo igual", "Subir el mismo video otra vez", "Ignorarlo"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m2-13", 6, "o6", "recordar", "¿A qué hablará el que no da palabra comprensible, según 1 Corintios 14:9?", "Al aire", ["Al mar", "Al templo", "A los ángeles"], "«Porque hablaréis al aire».", "1 Corintios 14:9"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué se le pide al pastor que revise el video corto de su predicación?", "Para confirmar que el corte respeta lo que quiso decir", ["Para que lo pague", "No hace falta", "Para que lo publique él"], "Se escriben «rectamente palabras de verdad».", "Eclesiastés 12:10"],
      ["m2-15", 6, "o6", "aplicar", "Un voluntario quiere usar inteligencia artificial para que el pastor diga en un video algo que no dijo. ¿Qué le respondes?", "Que no se hace sin el permiso del pastor, y nunca para que parezca decir lo que no dijo", ["Que lo haga, porque se ve moderno", "Que lo haga sin avisar", "Que lo use solo una vez"], "«y escribir rectamente palabras de verdad».", "Eclesiastés 12:10"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el video corto lleva el enlace a la predicación completa?", "Para que el que quiera pueda oír todo el mensaje y llegar a la iglesia", ["Para llenar espacio", "No hace falta", "Para que nadie vea el corto"], "Se busca una «palabra bien comprensible».", "1 Corintios 14:9"],
      ["m2-17", 6, "o6", "comprender", "¿Qué es una portada honesta?", "Una que muestra lo que hay en el video, sin escándalo ni engaño", ["Una con una imagen escandalosa", "Una que promete lo que no hay", "Una sin relación con el video"], "Se escriben «rectamente palabras de verdad».", "Eclesiastés 12:10"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué edición de un video es la mejor?", "Una que elige una idea clara, corta sin cambiar el sentido, pone subtítulos, usa un título y una portada honestos y pide que otro la revise", ["Una que une frases para impactar", "Una con un título engañoso", "Una sin subtítulos ni revisión"], "«Procuró el Predicador hallar palabras agradables».", "Eclesiastés 12:10"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "comunicaciones-3-e1",
      tipo: "corta",
      pregunta: "Explica para qué usa la iglesia el video y cómo empieza un ministerio de video, con un versículo.",
      ideas: [
        { id: "anunciar", peso: 30, texto: "Anunciar lo que ha visto y oído de Cristo, para llevar a la comunión.", formas: ["visto y oido", "anunci*", "comunion", "mostrar a cristo", "muestra a cristo"] },
        { id: "clases", peso: 30, texto: "La transmisión del culto, el video corto, el de enseñanza y el de anuncio.", formas: ["transmision*", "video corto", "ensenanza", "anuncio*"] },
        { id: "empezar", peso: 30, texto: "Una sola cosa bien hecha, con el equipo que hay, voluntarios y permisos.", formas: ["una sola cosa", "bien hecha", "voluntarios", "permiso*", "licencia*", "proposito"] },
      ],
      citas: ["1 Juan 1:3", "1 Juan 1:1-3", "Juan 20:31", "Juan 20:30-31", "Habacuc 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La iglesia anuncia lo que ha visto y oído de Cristo para que otros tengan comunión con Dios (1 Juan 1:3), con la transmisión del culto, el video corto, el de enseñanza y el de anuncio. Empieza con un propósito y una sola cosa bien hecha, con el equipo que tiene, voluntarios capacitados y los permisos en regla.",
    },
    {
      id: "comunicaciones-3-e2",
      tipo: "corta",
      pregunta: "Explica cómo se arma y se graba un testimonio en video que honre a Dios.",
      ideas: [
        { id: "partes", peso: 30, texto: "El antes, el encuentro con Cristo y el después, con una invitación.", formas: ["el antes", "encuentro", "el despues", "como vive", "invit*"] },
        { id: "centro", peso: 30, texto: "Cristo en el centro, verdadero y sencillo.", formas: ["el centro", "verdader*", "sencillo", "sin exagerar"] },
        { id: "permiso", peso: 30, texto: "Con el permiso escrito, cuidando su dignidad y mostrándoselo antes.", formas: ["permiso", "por escrito", "mostrarselo", "dignidad", "se le muestra"] },
      ],
      citas: ["Marcos 5:19", "Salmos 107:2", "Mateo 13:34"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Se arma con el antes, el encuentro con Cristo, el después y una invitación, como pidió Jesús: cuéntales cuán grandes cosas el Señor ha hecho contigo (Marcos 5:19). Cristo está en el centro, y es verdadero y sencillo. Se graba con el permiso por escrito de la persona, cuidando su dignidad, y se le muestra antes de publicarlo.",
    },
    {
      id: "comunicaciones-3-e3",
      tipo: "corta",
      pregunta: "Explica qué cuida la iglesia con los derechos y los permisos de un video, con un versículo.",
      ideas: [
        { id: "musica", peso: 30, texto: "La música con su licencia, como la de transmisión de CCLI.", formas: ["ccli", "licencia*", "la musica", "las canciones"] },
        { id: "personas", peso: 30, texto: "El permiso de las personas, y el de los padres de los niños por escrito.", formas: ["permiso de las personas", "su permiso", "padres", "permiso escrito"] },
        { id: "youtube", peso: 30, texto: "En YouTube, el reclamo afecta al video y la falta cuenta contra el canal.", formas: ["content id", "reclamo", "falta*", "el canal"] },
      ],
      citas: ["Romanos 12:17", "2 Corintios 8:21", "Proverbios 3:27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Cuida que la música tenga su licencia, como la de transmisión de CCLI, y que las personas den su permiso, y los padres de los niños, el suyo por escrito. En YouTube, un reclamo de Content ID afecta al video, y una falta cuenta contra el canal. Así procuramos lo bueno delante de todos (Romanos 12:17).",
    },
    {
      id: "comunicaciones-3-e4",
      tipo: "breve",
      pregunta:
        "Tu iglesia va a transmitir su culto por primera vez el próximo domingo. Explica cómo prepararías la transmisión y cómo cuidarías a las personas, con citas bíblicas.",
      ideas: [
        { id: "equipo", peso: 25, texto: "El equipo: la imagen, el sonido de la consola, el programa, internet y las licencias.", formas: ["consola", "programa de transmision", "internet", "licencia*", "camara*"] },
        { id: "prueba", peso: 25, texto: "La prueba antes, la lista de pasos y el plan por si algo falla.", formas: ["prueba", "lista de pasos", "si falla", "si se cae", "plan"] },
        { id: "chat", peso: 25, texto: "Un anfitrión en el chat que salude, responda y ore.", formas: ["chat", "anfitrion", "respond*", "salud*"] },
        { id: "cuidar", peso: 25, texto: "Cuidar la intimidad de los que oran y a los niños, e invitar a congregarse.", formas: ["altar", "intimidad", "salon de los ninos", "a los ninos", "congregar*", "sin su permiso"] },
      ],
      basta: 85,
      citas: ["Hebreos 10:25", "Hebreos 10:24-25", "Hechos 2:42", "Salmos 22:22", "1 Corintios 14:40"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El martes revisaría el equipo: las cámaras o un buen teléfono, el sonido tomado de la consola, la computadora con el programa de transmisión, una conexión a internet estable y las licencias de la música. El jueves haríamos una transmisión de prueba privada, con la alabanza y la predicación, para corregir lo que falle, y escribiríamos una lista de pasos y un plan por si se cae internet, porque todo debe hacerse decentemente y con orden (1 Corintios 14:40). El domingo llegaríamos una hora antes para probarlo todo y anunciar el enlace. Durante el culto, un voluntario cambiaría de cámara con calma y otro sería el anfitrión del chat, para saludar, responder y orar con los que escriben. No enfocaríamos de cerca, sin su permiso, a quien pasa al altar, ni el salón de los niños. Y a los que miran en línea los invitaríamos con cariño a congregarse, porque la Biblia pide no dejar de congregarnos (Hebreos 10:25).",
    },
    {
      id: "comunicaciones-3-e5",
      tipo: "breve",
      pregunta:
        "Un video del campamento de jóvenes que subió tu iglesia recibió un reclamo de Content ID por una canción famosa, y en él salen varios menores. Explica qué harías y qué cambiarías para el futuro, con citas bíblicas.",
      ideas: [
        { id: "reclamo", peso: 25, texto: "Leer el reclamo y no impugnarlo sin un motivo válido.", formas: ["reclamo", "impugn*", "el dueno", "content id"] },
        { id: "cancion", peso: 25, texto: "Quitar la canción o volver a subir el video con música permitida.", formas: ["quitar la cancion", "quitaria la cancion", "musica permitida", "otra musica", "volver a subir", "lo volveria a subir"] },
        { id: "menores", peso: 25, texto: "Revisar el permiso de los jóvenes y el de los padres de los menores.", formas: ["padres", "permiso", "menores"] },
        { id: "futuro", peso: 25, texto: "Escribir en la política qué música e imágenes se usan, y enseñarle al equipo.", formas: ["politica", "ensenar*", "explic*", "para el futuro", "derechos de autor"] },
      ],
      basta: 85,
      citas: ["Romanos 12:17", "2 Corintios 8:21", "Proverbios 3:27", "Mateo 18:10", "Romanos 13:7"],
      pesoCita: 10,
      errores: [
        { id: "e5-impugna", anula: "reclamo", texto: "Impugnar el reclamo sin tener permiso.", formas: ["lo impugnaria", "impugnarlo aunque"] },
        { id: "e5-igual", anula: "cancion", texto: "Volver a subir el video igual, con la misma canción.", formas: ["lo volveria a subir igual", "lo subiria igual", "subirlo igual"] },
      ],
      modelo:
        "Primero leería qué dice el reclamo de Content ID y quién es el dueño de la canción. Como no teníamos permiso, no lo impugnaría, porque queremos hacer las cosas honradamente, no solo delante del Señor sino también delante de los hombres (2 Corintios 8:21). Quitaría la canción con las herramientas de YouTube, o lo volvería a subir con música permitida. Después revisaría que todos los jóvenes que salen hayan dado su permiso, y que los menores tengan el permiso escrito de sus padres, porque Jesús pide no menospreciar a los pequeños (Mateo 18:10); si alguno no lo tiene, lo sacaría del video. Para el futuro, escribiría en la política de la iglesia qué música e imágenes se pueden usar, con su licencia, y le explicaría al equipo por qué respetamos los derechos de autor: no negamos el bien a quien es debido (Proverbios 3:27), y procuramos lo bueno delante de todos (Romanos 12:17).",
    },
  ],
  breve: {
    id: "comunicaciones-3-b1",
    tipo: "breve",
    pregunta: "Escribe cómo organizaría tu iglesia su ministerio de video y transmisiones, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "proposito", peso: 15, texto: "Un propósito: anunciar lo que hemos visto y oído, empezando con una sola cosa.", formas: ["visto y oido", "proposito", "una sola cosa", "anunci*"] },
      { id: "historias", peso: 15, texto: "Contar historias: los testimonios.", formas: ["testimonio*", "historia*", "el antes", "el encuentro"] },
      { id: "imagen", peso: 15, texto: "Cuidar la imagen.", formas: ["tripode", "encuadre", "la luz", "camara quieta", "fondo"] },
      { id: "transmision", peso: 20, texto: "La transmisión del culto bien preparada.", formas: ["transmision", "prueba", "chat", "consola", "congregar*"] },
      { id: "permisos", peso: 20, texto: "Los derechos y los permisos en regla.", formas: ["ccli", "licencia*", "permiso*", "content id", "derechos de autor"] },
      { id: "edicion", peso: 15, texto: "Editar con verdad y subtítulos.", formas: ["subtitulos", "editar", "edicion", "titulo honesto", "sin cambiar el sentido"] },
    ],
    basta: 85,
    citas: ["1 Juan 1:3", "Juan 20:31", "Habacuc 2:2", "Marcos 5:19", "Mateo 13:34", "Salmos 107:2", "Colosenses 3:23", "Proverbios 22:29", "Eclesiastés 9:10", "Hebreos 10:25", "Hechos 2:42", "Salmos 22:22", "Romanos 12:17", "2 Corintios 8:21", "Proverbios 3:27", "1 Corintios 14:9", "Hechos 2:8", "Eclesiastés 12:10"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaríamos escribiendo el propósito: anunciar lo que hemos visto y oído de Cristo, para que otros tengan comunión con Dios (1 Juan 1:3), y empezaríamos con una sola cosa bien hecha. Grabaríamos testimonios con su antes, su encuentro con Cristo y su después, porque Jesús mandó contar cuán grandes cosas el Señor ha hecho (Marcos 5:19), siempre con el permiso escrito de la persona. Cuidaríamos la imagen con un trípode, un buen encuadre y la luz de frente, haciéndolo todo de corazón, como para el Señor (Colosenses 3:23). Para la transmisión del culto tomaríamos el sonido de la consola, haríamos una prueba antes, tendríamos un anfitrión en el chat y animaríamos a todos a congregarse, porque no debemos dejar de congregarnos (Hebreos 10:25). Tendríamos en regla la música con la licencia de transmisión de CCLI, pediríamos permiso a las personas y a los padres de los niños, y no impugnaríamos un reclamo de Content ID sin motivo, procurando lo bueno delante de todos (Romanos 12:17). Y al editar pondríamos subtítulos y un título honesto, sin cambiar el sentido de lo que se dijo, porque queremos palabras de verdad (Eclesiastés 12:10).",
  },
};
