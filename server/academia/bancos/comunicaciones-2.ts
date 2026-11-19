/**
 * El banco de «Radio cristiana» (especialidad Comunicaciones y medios, materia 2). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la radio al servicio del evangelio · o2 la voz y el micrófono · o3 la programación · o4 la música y los
 * derechos de autor · o5 la radio al aire y sus reglas · o6 los oyentes · o7 el versículo de memoria (Romanos 10:17).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `comunicaciones-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_COMUNICACIONES_2: BancoMateria = {
  materia: "comunicaciones-2",
  repaso: {
    "comunicaciones-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo viene la fe, según Romanos 10:17?", "Por el oír, y el oír, por la palabra de Dios", ["Por ver milagros", "Por las obras", "Por los sentimientos"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
      ["1-r2", 1, "o1", "comprender", "¿Qué muestran las primeras transmisiones de la radio cristiana, como la de Pittsburgh en 1921 y la de HCJB en Quito en 1931?", "Que desde el principio la iglesia usó la radio para que el evangelio se oyera lejos", ["Que la radio no le sirve a la iglesia", "Que solo se transmitía música", "Que la radio reemplazó a la iglesia"], "«Por toda la tierra salió su voz, Y hasta el extremo del mundo sus palabras».", "Salmos 19:4"],
      ["1-r3", 1, "o1", "aplicar", "Tu iglesia quiere llegar con la radio a sus familias que viven en otros países. ¿Qué le conviene?", "Empezar con una radio por internet, con sus licencias de música, porque se escucha en todo el mundo", ["Una FM de baja potencia, porque llega lejos", "Transmitir sin licencias", "Esperar a tener una emisora AM"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
    ] as P[]).map(p),
    "comunicaciones-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cómo le leían la ley al pueblo, según Nehemías 8:8?", "Claramente, y ponían el sentido para que entendieran", ["En voz baja", "Muy rápido", "Sin explicar nada"], "«Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["2-r2", 2, "o2", "comprender", "¿Por qué para la radio se escribe con frases cortas?", "Porque el oyente no puede volver atrás, y una idea en cada frase se entiende mejor al oído", ["Porque las frases largas son pecado", "Porque así se habla más rápido", "No hace falta"], "Se habla «de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["2-r3", 2, "o2", "aplicar", "Te piden un mensaje de ánimo de dos minutos para la radio. ¿Qué haces primero?", "Oras y eliges un solo versículo y una sola idea", ["Escribes un sermón de veinte minutos", "Improvisas al aire", "Copias el mensaje de otra radio"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
    ] as P[]).map(p),
    "comunicaciones-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué dice Eclesiastés 3:1 sobre el tiempo?", "Que todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora", ["Que el tiempo no importa", "Que todo pasa rápido", "Que no hay tiempo para Dios"], "«Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora».", "Eclesiastés 3:1"],
      ["3-r2", 3, "o3", "comprender", "¿Qué es la parrilla de programación de una radio?", "El plan de lo que suena a cada hora, pensado según quién escucha", ["La lista de los oyentes", "El aparato que transmite", "El presupuesto de la radio"], "Cada programa tiene su hora: «Todo tiene su tiempo».", "Eclesiastés 3:1"],
      ["3-r3", 3, "o3", "aplicar", "Un locutor quiere poner una canción muy popular cuya letra no está de acuerdo con la Biblia. ¿Qué haces?", "No la pones al aire, y ante la duda le preguntas al pastor", ["La pones, porque gusta mucho", "La pones de madrugada", "La pones sin anunciarla"], "Se canta «con salmos, con himnos y cánticos espirituales».", "Efesios 5:19"],
    ] as P[]).map(p),
    "comunicaciones-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué dice Lucas 10:7 del obrero?", "Que es digno de su salario", ["Que trabaje gratis", "Que no merece nada", "Que pida limosna"], "«porque el obrero es digno de su salario».", "Lucas 10:7"],
      ["4-r2", 4, "o4", "comprender", "¿Qué cubre la licencia de SoundExchange para una radio por internet?", "Las grabaciones que suenan sin que el oyente elija la canción, pero no los pódcasts ni las descargas", ["Todo, también las canciones y los pódcasts", "Solo los pódcasts", "Nada, porque no hace falta"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["4-r3", 4, "o4", "aplicar", "Tu radio por internet pone canciones bajadas de internet sin licencias. ¿Qué haces?", "Detienes lo que no está en regla y consigues las licencias de las canciones y de las grabaciones", ["Sigues igual, porque es para Dios", "Solo le cambias el nombre a la radio", "Pones las canciones más bajito"], "«No hurtarás».", "Éxodo 20:15"],
    ] as P[]).map(p),
    "comunicaciones-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le pide Pablo a Tito que les recuerde a los creyentes, según Tito 3:1?", "Que se sujeten a los gobernantes y autoridades, y que obedezcan", ["Que desobedezcan a las autoridades", "Que no paguen impuestos", "Que se aparten del mundo"], "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan».", "Tito 3:1"],
      ["5-r2", 5, "o5", "comprender", "¿Qué puede decir una emisora no comercial de sus patrocinadores?", "Quién la apoya, a qué se dedica y dónde está, de forma objetiva", ["Que vayan a comprar hoy", "Los precios y los descuentos", "Que es el mejor negocio de la ciudad"], "«Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
      ["5-r3", 5, "o5", "aplicar", "Un patrocinador quiere que la emisora FM no comercial de la iglesia diga: compre hoy y reciba un regalo. ¿Qué haces?", "Le explicas con amabilidad que no se permite, y le propones decir su nombre, a qué se dedica y dónde está", ["Lo dices al aire igual", "Lo dices solo una vez al día", "Rechazas su apoyo con enojo"], "«que estén dispuestos a toda buena obra».", "Tito 3:1"],
    ] as P[]).map(p),
    "comunicaciones-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hizo el Señor con Lidia mientras oía a Pablo, según Hechos 16:14?", "Le abrió el corazón para que estuviera atenta", ["La mandó a su casa", "La hizo predicar", "Le cerró los oídos"], "«y el Señor abrió el corazón de ella para que estuviese atenta a lo que Pablo decía».", "Hechos 16:14"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué al aire se usa solo el primer nombre de quien llama?", "Para proteger su privacidad y la de su familia", ["Porque los apellidos son difíciles", "Para que el programa sea más corto", "No importa usar el nombre completo"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
      ["6-r3", 6, "o6", "aplicar", "Una oyente llama al programa en vivo para pedir oración por su hijo que está en la cárcel. ¿Qué haces?", "Oras por ella al aire con respeto, sin dar detalles, y el equipo la llama después para acompañarla", ["Le pides que cuente al aire por qué está preso", "Dices el nombre completo de su hijo", "Le dices que no se ora por los presos"], "«Mis ovejas oyen mi voz, y yo las conozco».", "Juan 10:27"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La radio al servicio del evangelio
    ["f01", 1, "o1", "recordar", "¿Qué pregunta Pablo en Romanos 10:14 sobre los que no han oído?", "¿Y cómo oirán sin haber quien les predique?", ["¿Y cómo pagarán?", "¿Y cómo vendrán solos?", "¿Y cómo leerán sin libros?"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
    ["f02", 1, "o1", "recordar", "¿Hasta dónde salieron las palabras de los cielos, según Salmos 19:4?", "Hasta el extremo del mundo", ["Hasta el mar", "Hasta los montes", "Hasta Jerusalén"], "«Y hasta el extremo del mundo sus palabras».", "Salmos 19:4"],
    ["f03", 1, "o1", "comprender", "¿Qué quiere decir Romanos 10:15 cuando llama hermosos los pies de los que anuncian buenas nuevas?", "Que Dios valora a los que llevan el evangelio a otros", ["Que hay que cuidar los pies", "Que solo los pastores anuncian", "Que no hay que salir de casa"], "«¡Cuán hermosos son los pies de los que anuncian la paz, de los que anuncian buenas nuevas!».", "Romanos 10:14-15"],
    ["f04", 1, "o1", "comprender", "¿Qué pasó el 2 de enero de 1921 en Pittsburgh?", "La emisora KDKA transmitió el culto vespertino de la iglesia episcopal del Calvario, una de las primeras transmisiones religiosas", ["Se cerró la primera radio", "Se fundó HCJB", "Se prohibió la radio cristiana"], "Desde entonces, muchos oyeron por la radio: «Así que la fe es por el oír».", "Romanos 10:17"],
    ["f05", 1, "o1", "comprender", "¿Qué diferencia hay entre una radio por internet y una FM de baja potencia?", "La de internet no necesita licencia de la FCC y se oye en todo el mundo; la FM de baja potencia necesita licencia y llega a unos pocos kilómetros", ["Ninguna", "La FM llega a todo el mundo", "La de internet necesita licencia de la FCC"], "«Por toda la tierra salió su voz».", "Salmos 19:4"],
    ["f06", 1, "o1", "analizar", "¿Por qué una radio cristiana es un ministerio de largo plazo?", "Porque cuesta dinero, tiempo y gente cada mes, y necesita constancia para dar fruto", ["Porque se hace en un día", "Porque no cuesta nada", "Porque solo dura una semana"], "Hace falta quien sea enviado y se quede: «¿Y cómo predicarán si no fueren enviados?».", "Romanos 10:14-15"],
    ["f07", 1, "o1", "aplicar", "Tu iglesia tiene poco presupuesto y quiere empezar una radio por internet. ¿Qué haces?", "Empiezas con pocas horas bien hechas, con las licencias de la música en regla y un presupuesto para cada mes", ["Transmites las 24 horas sin licencias", "Compras equipo caro primero", "Esperas a tener mucho dinero"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
    ["f08", 1, "o1", "aplicar", "Una emisora de tu ciudad le ofrece a tu iglesia un espacio de media hora los domingos. ¿Qué haces?", "Preparas el programa con un propósito claro y sigues las reglas de esa emisora", ["Lo aceptas e improvisas cada domingo", "Lo rechazas porque no es la radio de la iglesia", "Lo usas para criticar a otras iglesias"], "«¡Cuán hermosos son los pies de los que anuncian la paz».", "Romanos 10:14-15"],
    ["f09", 1, "o1", "aplicar", "Un hermano quiere abrir una emisora FM sin licencia porque es para Dios. ¿Qué le dices?", "Que ninguna emisora de AM o FM puede salir al aire sin licencia de la FCC, y que puede empezar por internet", ["Que lo haga igual", "Que transmita solo de noche", "Que la llame de otra manera"], "«Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
    ["f10", 1, "o7", "recordar", "Completa Romanos 10:17: Así que la fe es por el oír…", "y el oír, por la palabra de Dios", ["y el oír, por la tradición", "y el ver, por los milagros", "y el oír, por la música"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
    // Lección 2 · La voz y el micrófono
    ["f11", 2, "o2", "recordar", "¿Qué ponían los que leían la ley, según Nehemías 8:8?", "El sentido, para que entendieran la lectura", ["Música de fondo", "Su propia opinión", "Palabras difíciles"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f12", 2, "o2", "recordar", "¿Cómo es la palabra a su tiempo, según Proverbios 15:23?", "Muy buena", ["Peligrosa", "Inútil", "Aburrida"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
    ["f13", 2, "o2", "recordar", "¿Qué pedía Pablo que el Señor abriera, según Colosenses 4:3?", "Una puerta para la palabra", ["La cárcel", "Un camino al mar", "Las arcas del templo"], "«para que el Señor nos abra puerta para la palabra».", "Colosenses 4:3-4"],
    ["f14", 2, "o2", "comprender", "¿Por qué en la radio se habla como a una sola persona?", "Porque cada oyente escucha solo, y así el mensaje se siente cercano", ["Porque hay un solo oyente", "Porque así se grita menos", "No se debe hacer"], "Pablo pedía saber hablar a cada uno: «para que lo manifieste como debo hablar».", "Colosenses 4:3-4"],
    ["f15", 2, "o2", "comprender", "¿Por qué se repiten en la radio el nombre de la emisora y la idea principal?", "Porque siempre llegan oyentes nuevos que no oyeron el principio", ["Para llenar el tiempo", "Porque se olvidó el guion", "No hace falta repetir"], "Se habla «de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f16", 2, "o2", "analizar", "¿Por qué en la radio los números se dicen redondos y fáciles de recordar?", "Porque el oído no retiene las cifras largas, y el oyente no puede volver a leerlas", ["Porque los números exactos son mentira", "Porque así se habla más rápido", "No importa cómo se digan"], "«Y leían en el libro de la ley de Dios claramente».", "Nehemías 8:8"],
    ["f17", 2, "o2", "aplicar", "Tu mensaje grabado tiene ruido de fondo y un error al leer el versículo. ¿Qué haces?", "Lo vuelves a grabar en un lugar callado y lo escuchas antes de entregarlo", ["Lo entregas igual", "Le subes el volumen", "Le pides al técnico que lo arregle solo"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
    ["f18", 2, "o2", "aplicar", "Un locutor nuevo habla muy rápido y con palabras difíciles. ¿Qué le aconsejas?", "Que hable más despacio, con frases cortas y palabras de todos los días, como a un amigo", ["Que hable todavía más rápido", "Que lea sin parar", "Que no hable más"], "Se habla «de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f19", 2, "o2", "aplicar", "Un oyente se enoja al aire porque no está de acuerdo con la predicación. ¿Qué haces?", "Lo escuchas con calma, le respondes con respeto y no atacas a nadie al aire", ["Le gritas para que se calle", "Te burlas de él al aire", "Cortas el programa"], "«todo hombre sea pronto para oír, tardo para hablar, tardo para airarse».", "Santiago 1:19"],
    ["f20", 2, "o2", "evaluar", "¿Qué mensaje corto para la radio está mejor preparado?", "Uno con un versículo y una idea, frases cortas, leído en voz alta, grabado sin ruido y con una invitación clara", ["Uno improvisado al aire", "Uno largo con muchas ideas", "Uno con palabras difíciles para impresionar"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
    // Lección 3 · La programación de una radio cristiana
    ["f21", 3, "o3", "recordar", "¿Qué invita a cantar el Salmo 96:1?", "Un cántico nuevo a Jehová", ["Un canto de guerra", "Una canción triste", "Nada"], "«Cantad a Jehová cántico nuevo».", "Salmos 96:1-3"],
    ["f22", 3, "o3", "recordar", "¿Qué pide anunciar de día en día el Salmo 96:2?", "Su salvación", ["Las noticias", "El clima", "Los negocios"], "«Anunciad de día en día su salvación».", "Salmos 96:1-3"],
    ["f23", 3, "o3", "recordar", "¿Con qué pide Pablo que hablemos entre nosotros, según Efesios 5:19?", "Con salmos, con himnos y cánticos espirituales", ["Con quejas", "Con chismes", "Con discusiones"], "«hablando entre vosotros con salmos, con himnos y cánticos espirituales».", "Efesios 5:19"],
    ["f24", 3, "o3", "comprender", "¿Para qué sirven los mensajes cortos entre canciones?", "Para dar una reflexión breve, de uno o dos minutos, que anima y enseña", ["Para vender productos", "Para llenar silencios sin sentido", "No sirven"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
    ["f25", 3, "o3", "comprender", "¿Qué diferencia hay entre una programación pensada y una improvisada?", "La pensada tiene un propósito y un público para cada hora, y empieza a tiempo; la improvisada pone lo que hay", ["Ninguna", "La improvisada es más espiritual", "La pensada no tiene música"], "«Todo tiene su tiempo».", "Eclesiastés 3:1"],
    ["f26", 3, "o3", "analizar", "¿Por qué la programación de la mañana es distinta de la de la madrugada?", "Porque a cada hora escucha gente distinta, con necesidades distintas", ["Porque de noche no hay oyentes", "No debe ser distinta", "Porque la música se acaba"], "«Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora».", "Eclesiastés 3:1"],
    ["f27", 3, "o3", "aplicar", "Tu radio quiere un programa para los niños. ¿A qué hora lo pones?", "En la tarde, después de la escuela, cuando ellos pueden escuchar", ["A las tres de la madrugada", "A la hora en que están en clase", "A cualquier hora"], "«Todo tiene su tiempo».", "Eclesiastés 3:1"],
    ["f28", 3, "o3", "aplicar", "Un oyente pide más himnos antiguos, y otro, más alabanza nueva. ¿Qué hace el encargado de la programación?", "Les da lugar a los dos en distintas horas, eligiendo los cantos por su letra y su calidad", ["Pone solo lo que le gusta a él", "Deja de poner música", "Pone solo lo que pide el que más se queja"], "«hablando entre vosotros con salmos, con himnos y cánticos espirituales».", "Efesios 5:19"],
    ["f29", 3, "o3", "aplicar", "Tu radio no tiene horarios fijos, y los oyentes no saben cuándo es la predicación. ¿Qué haces?", "Armas una parrilla con horarios fijos, la publicas y empiezas cada programa a tiempo", ["Sigues improvisando", "Quitas la predicación", "Cambias los horarios cada día"], "«Todo tiene su tiempo».", "Eclesiastés 3:1"],
    ["f30", 3, "o3", "evaluar", "¿Qué parrilla de un día es la mejor para una radio cristiana?", "Una que piensa en quién escucha a cada hora, con música, Palabra, oración, un programa para niños, la identificación cada hora y una revisión cada tres meses", ["Solo música todo el día", "Solo predicaciones sin pausa", "Una que cambia cada día sin plan"], "«Anunciad de día en día su salvación».", "Salmos 96:1-3"],
    // Lección 4 · La música y los derechos de autor
    ["f31", 4, "o4", "recordar", "¿Qué dice el mandamiento de Éxodo 20:15?", "No hurtarás", ["No mentirás", "No matarás", "No codiciarás"], "«No hurtarás».", "Éxodo 20:15"],
    ["f32", 4, "o4", "recordar", "¿A quiénes pide pagar Romanos 13:7 lo que debemos?", "A todos", ["Solo a los amigos", "A nadie", "Solo al gobierno"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f33", 4, "o4", "recordar", "¿Qué debían hacer los discípulos en la casa donde se quedaban, según Lucas 10:7?", "Comer y beber lo que les dieran", ["Cobrar por predicar", "Pasarse de casa en casa", "Ayunar"], "«comiendo y bebiendo lo que os den».", "Lucas 10:7"],
    ["f34", 4, "o4", "comprender", "¿Qué cubren las licencias de las sociedades de autores, como ASCAP, BMI, SESAC y GMR?", "Las canciones, es decir, la letra y la música", ["Las grabaciones de los cantantes", "Los aparatos de la radio", "Los permisos de la FCC"], "El que escribe también trabaja: «porque el obrero es digno de su salario».", "Lucas 10:7"],
    ["f35", 4, "o4", "comprender", "¿Por qué una iglesia no queda libre de pagar las licencias aunque use la música para Dios?", "Porque las canciones y las grabaciones tienen dueños, y su trabajo se respeta igual", ["Porque el gobierno obliga a todos", "Sí queda libre", "Porque la música cristiana es más cara"], "«No hurtarás».", "Éxodo 20:15"],
    ["f36", 4, "o4", "analizar", "¿Por qué una radio en regla da mejor testimonio?", "Porque muestra integridad, respeta el trabajo de otros y puede crecer sin miedo a reclamos", ["Porque tiene más canciones", "No da mejor testimonio", "Porque gasta más dinero"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f37", 4, "o4", "aplicar", "Tu iglesia transmite el culto en vivo con las canciones de la alabanza. ¿Qué licencia usan muchas iglesias para eso?", "La licencia de transmisión de CCLI, que se suma a su licencia de derechos de autor", ["Ninguna, porque es un culto", "La licencia de conducir", "La licencia de la FCC"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    ["f38", 4, "o4", "aplicar", "Un hermano quiere grabar un pódcast con canciones famosas de fondo. ¿Qué le dices?", "Que la licencia de SoundExchange no cubre los pódcasts, y que use solo música con permiso", ["Que la use, porque la radio ya paga", "Que le baje el volumen a la música", "Que no diga el nombre de las canciones"], "«No hurtarás».", "Éxodo 20:15"],
    ["f39", 4, "o4", "aplicar", "Un cantante de tu iglesia te da permiso para poner sus canciones en la radio. ¿Qué haces?", "Le pides el permiso por escrito y lo guardas", ["Lo aceptas de palabra y nada más", "Pones también canciones de otros", "Le cambias el nombre al autor"], "«porque el obrero es digno de su salario».", "Lucas 10:7"],
    ["f40", 4, "o4", "evaluar", "¿Qué manera de manejar la música de una radio por internet es la mejor?", "Tener las licencias de las canciones y de las grabaciones, llevar el registro de lo que suena, usar música con permiso y revisar las licencias cada año", ["Poner lo que se encuentra en internet", "Pagar una sola licencia y poner de todo", "No llevar ningún registro"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
    // Lección 5 · La radio al aire y sus reglas
    ["f41", 5, "o5", "recordar", "¿A qué pide Pedro someterse por causa del Señor, según 1 Pedro 2:13?", "A toda institución humana", ["Solo a la iglesia", "A nadie", "Solo a los ricos"], "«Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
    ["f42", 5, "o5", "recordar", "¿Qué dice Jesús del que es fiel en lo muy poco, según Lucas 16:10?", "Que también en lo más es fiel", ["Que no importa", "Que será rico", "Que nadie lo ve"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f43", 5, "o5", "recordar", "¿A qué deben estar dispuestos los creyentes, según Tito 3:1?", "A toda buena obra", ["A toda discusión", "A ningún trabajo", "Solo a orar"], "«que estén dispuestos a toda buena obra».", "Tito 3:1"],
    ["f44", 5, "o5", "comprender", "¿Qué es una emisora FM de baja potencia?", "Una emisora educativa y no comercial, para organizaciones sin fines de lucro, que con 100 vatios llega a unos 5,6 kilómetros", ["Una emisora comercial de todo el país", "Una radio por internet", "Una emisora sin licencia"], "Se obedecen sus reglas: «Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
    ["f45", 5, "o5", "comprender", "¿Cuándo debe identificarse una emisora de radio?", "Al empezar y al terminar cada tiempo de transmisión, y cada hora, lo más cerca posible de la hora en punto", ["Solo una vez al año", "Cuando quiera", "Solo los domingos"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f46", 5, "o5", "analizar", "¿Por qué una emisora no comercial no puede decir vaya hoy a comprar?", "Porque llamar a comprar convierte el agradecimiento en un anuncio comercial, que su licencia no permite", ["Porque los negocios son malos", "Sí puede decirlo", "Porque así se acaba el programa"], "«Recuérdales que se sujeten a los gobernantes y autoridades».", "Tito 3:1"],
    ["f47", 5, "o5", "aplicar", "Tu emisora FM llega a la hora en punto en medio de una predicación. ¿Qué haces?", "En una pausa natural, cerca de la hora, dices las letras de llamada y la ciudad de la licencia", ["Nunca te identificas", "Te identificas solo al final del día", "Cortas la predicación en medio de una frase"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    ["f48", 5, "o5", "aplicar", "Un negocio quiere que la emisora no comercial anuncie un veinte por ciento de descuento para los oyentes. ¿Qué haces?", "Le explicas que no se pueden ofrecer descuentos, y le propones un agradecimiento con su nombre, a qué se dedica y dónde está", ["Lo anuncias igual", "Lo anuncias como si fuera un consejo", "Lo anuncias en otro idioma"], "«que obedezcan, que estén dispuestos a toda buena obra».", "Tito 3:1"],
    ["f49", 5, "o5", "aplicar", "Te enteras de que la FCC abrió un período para pedir licencias de FM de baja potencia. ¿Qué hace tu iglesia si quiere una?", "Revisa si cumple los requisitos, prepara la solicitud dentro del período y busca ayuda de alguien que conozca las reglas", ["Empieza a transmitir antes de tener la licencia", "Espera a que se cierre", "Pide una licencia comercial"], "«Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
    ["f50", 5, "o5", "evaluar", "¿Qué agradecimiento a un patrocinador es el mejor en una emisora no comercial?", "Este programa es posible gracias al Taller García, mecánica general, en la calle Elm", ["Vaya hoy al Taller García", "Compre en el Taller García y reciba un regalo", "El Taller García es el mejor y el más barato"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    // Lección 6 · Los oyentes: llamadas, pedidos y comunidad
    ["f51", 6, "o6", "recordar", "¿Qué hacen las ovejas del buen pastor, según Juan 10:27?", "Oyen su voz y lo siguen", ["Se pierden", "Huyen de él", "No lo conocen"], "«Mis ovejas oyen mi voz, y yo las conozco, y me siguen».", "Juan 10:27"],
    ["f52", 6, "o6", "recordar", "¿Qué vendía Lidia, según Hechos 16:14?", "Púrpura", ["Pan", "Vino", "Aceite"], "«Entonces una mujer llamada Lidia, vendedora de púrpura».", "Hechos 16:14"],
    ["f53", 6, "o6", "recordar", "¿Para qué pide Santiago 1:19 que seamos prontos?", "Para oír", ["Para hablar", "Para airarnos", "Para juzgar"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
    ["f54", 6, "o6", "comprender", "¿Por qué alguien del equipo recibe las llamadas antes de pasarlas al aire?", "Para saber quién llama y por qué, y cuidar lo que sale al aire", ["Para cobrar la llamada", "Para no atender a nadie", "No hace falta"], "«todo hombre sea pronto para oír».", "Santiago 1:19"],
    ["f55", 6, "o6", "comprender", "¿Qué diferencia hay entre una radio que habla y una que escucha?", "La que escucha atiende las llamadas y los pedidos, conoce a sus oyentes, ora por ellos y les da seguimiento", ["Ninguna", "La que habla tiene más oyentes", "La que escucha no tiene música"], "«Mis ovejas oyen mi voz, y yo las conozco».", "Juan 10:27"],
    ["f56", 6, "o6", "analizar", "¿Por qué se saca del aire la llamada de un oyente en crisis?", "Para hablar con él en privado, proteger su intimidad y atenderlo sin presión", ["Para que nadie lo ayude", "Porque molesta al programa", "No hay que sacarla"], "«todo hombre sea pronto para oír, tardo para hablar».", "Santiago 1:19"],
    ["f57", 6, "o6", "aplicar", "Un niño llama al programa y quiere decir su dirección para recibir un regalo. ¿Qué haces?", "No le pides datos al aire, y le pides que llame con el permiso de sus padres", ["Le pides su dirección completa", "Le das el regalo sin preguntar", "Le cuelgas sin explicarle"], "«Mirad que no menospreciéis a uno de estos pequeños».", "Mateo 18:10"],
    ["f58", 6, "o6", "aplicar", "Una oyente cuenta al aire detalles privados de la enfermedad de su esposo. ¿Qué haces?", "Oras por ellos con respeto, cuidas que no se den más detalles, y el equipo la llama después", ["Le pides que cuente más", "Repites los detalles para que oren", "Le dices que no se ora por los enfermos"], "«tardo para hablar, tardo para airarse».", "Santiago 1:19"],
    ["f59", 6, "o6", "aplicar", "Un hombre llama llorando al programa y dice que ya no quiere vivir. ¿Qué haces?", "Lo escuchas con calma, sacas la llamada del aire, no lo dejas solo, le das el 988 o llamas al 911 si hay peligro, y avisas al pastor", ["Le dices que lo piense mejor y sigues el programa", "Lo dejas hablar al aire sin cuidarlo", "Le cuelgas porque no es el tema del programa"], "«todo hombre sea pronto para oír».", "Santiago 1:19"],
    ["f60", 6, "o6", "evaluar", "¿Qué manera de atender a los oyentes es la mejor?", "Recibir las llamadas antes del aire, usar solo el primer nombre, orar sin exponer a nadie, dar seguimiento y tener a mano los números de ayuda", ["Pasar todas las llamadas al aire sin preguntar", "No recibir llamadas", "Dar consejos médicos al aire"], "«Mis ovejas oyen mi voz, y yo las conozco, y me siguen».", "Juan 10:27"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué pregunta Pablo sobre los que predican, según Romanos 10:15?", "¿Y cómo predicarán si no fueren enviados?", ["¿Y cómo comerán?", "¿Y cómo descansarán?", "¿Y cómo viajarán?"], "«¿Y cómo predicarán si no fueren enviados?».", "Romanos 10:14-15"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué la radio sigue siendo una buena herramienta para el evangelio?", "Porque llega a la casa, al auto y al trabajo, y la escucha gente que no va a la iglesia", ["Porque nadie la escucha", "Porque reemplaza a la iglesia", "Porque es la única manera"], "«Así que la fe es por el oír».", "Romanos 10:17"],
      ["m1-03", 1, "o1", "aplicar", "Tu iglesia quiere una radio, pero nadie sabe de la parte técnica. ¿Qué es lo primero?", "Formar un equipo con un encargado de la programación, alguien que aprenda la parte técnica y buenas voces", ["Comprar un transmisor", "Transmitir sin preparación", "Contratar a alguien sin conocer su fe"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14-15"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué conviene empezar una radio con pocas horas bien hechas?", "Porque la calidad y la constancia valen más que muchas horas sin cuidado", ["Porque nadie escucha", "Porque así se gasta más", "No conviene"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
      ["m1-05", 1, "o1", "recordar", "¿En qué ciudad salió al aire HCJB en 1931?", "En Quito, Ecuador", ["En Pittsburgh", "En Miami", "En la Ciudad de México"], "Desde allí la voz del evangelio llegó lejos: «Por toda la tierra salió su voz».", "Salmos 19:4"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué plan para empezar la radio de una iglesia es el mejor?", "Un propósito claro, elegir la clase de radio, formar un equipo, conseguir las licencias, empezar con pocas horas y pedir comentarios", ["Comprar equipo y ver qué pasa", "Transmitir sin licencias", "Copiar otra radio"], "«¿Y cómo predicarán si no fueren enviados?».", "Romanos 10:14-15"],
      ["m1-07", 2, "o2", "recordar", "¿Qué pedía Pablo saber, según Colosenses 4:4?", "Cómo debía hablar", ["Cuándo saldría de la cárcel", "A dónde viajar", "Cuánto dinero tenía"], "«para que lo manifieste como debo hablar».", "Colosenses 4:3-4"],
      ["m1-08", 2, "o2", "comprender", "¿Qué diferencia hay entre escribir para leer y escribir para oír?", "Para oír se usan frases cortas, palabras de todos los días y números redondos", ["Ninguna", "Para oír se usan frases más largas", "Para oír se usan palabras difíciles"], "Se habla «de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m1-09", 2, "o2", "aplicar", "Tu voz suena fría y apurada en la grabación. ¿Qué haces?", "Hablas más despacio, con pausas y con una sonrisa, como si conversaras con un amigo", ["Gritas más fuerte", "Lees más rápido", "Dejas de grabar"], "«Y la palabra a su tiempo, ¡cuán buena es!».", "Proverbios 15:23"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué en la radio no se dan los datos de los que piden oración?", "Porque los escucha mucha gente, y se debe proteger la privacidad de cada persona", ["Porque en la radio no se ora", "Porque los datos no importan", "Sí se deben dar"], "Se habla con cuidado: «para que lo manifieste como debo hablar».", "Colosenses 4:3-4"],
      ["m1-11", 2, "o2", "comprender", "¿Qué le enseña Nehemías 8:8 al que habla en la radio?", "Que hay que leer con claridad y explicar el sentido para que se entienda", ["Que hay que hablar en otro idioma", "Que hay que leer muy rápido", "Que no hay que explicar nada"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué locutor habla mejor en la radio?", "El que habla con claridad, calidez y buen ritmo, como a una sola persona, y repite lo importante", ["El que habla muy rápido para decir más", "El que usa palabras difíciles", "El que grita para que lo oigan"], "«Y leían en el libro de la ley de Dios claramente».", "Nehemías 8:8"],
      ["m1-13", 3, "o3", "recordar", "¿Qué tiene todo lo que se quiere debajo del cielo, según Eclesiastés 3:1?", "Su hora", ["Un precio", "Un dueño", "Un castigo"], "«y todo lo que se quiere debajo del cielo tiene su hora».", "Eclesiastés 3:1"],
      ["m1-14", 3, "o3", "comprender", "¿Para qué sirve la identificación de la radio cada hora?", "Para que el oyente sepa qué radio escucha y qué hora es", ["Para vender publicidad", "Para llenar el tiempo", "No sirve"], "«Todo tiene su tiempo».", "Eclesiastés 3:1"],
      ["m1-15", 3, "o3", "aplicar", "Tu radio pone predicaciones largas a las seis de la mañana, y los oyentes que van al trabajo se quejan. ¿Qué haces?", "Cambias esa hora por alabanza alegre, la Biblia en un minuto y un mensaje corto, y pasas la predicación a la noche", ["No cambias nada", "Quitas todas las predicaciones", "Pones solo noticias"], "«Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora».", "Eclesiastés 3:1"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué las canciones de una radio cristiana se eligen por su letra?", "Porque lo que se canta enseña, y debe estar de acuerdo con la Biblia", ["Porque la música no importa", "Porque así son más cortas", "No hace falta elegirlas"], "«hablando entre vosotros con salmos, con himnos y cánticos espirituales».", "Efesios 5:19"],
      ["m1-17", 3, "o3", "recordar", "¿Qué pide proclamar entre las naciones el Salmo 96:3?", "Su gloria", ["Su enojo", "Sus impuestos", "Sus guerras"], "«Proclamad entre las naciones su gloria».", "Salmos 96:1-3"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué programación es la mejor para una radio cristiana?", "Una parrilla que piensa en quién escucha a cada hora, con música elegida por su letra, la Palabra, oración y programas especiales", ["Solo canciones populares", "Lo que salga cada día", "Solo predicaciones largas todo el día"], "«Anunciad de día en día su salvación».", "Salmos 96:1-3"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué no se debe hacer, según Éxodo 20:15?", "Hurtar", ["Trabajar", "Cantar", "Orar"], "«No hurtarás».", "Éxodo 20:15"],
      ["m2-02", 4, "o4", "comprender", "¿Qué no cubre la licencia de SoundExchange?", "Los pódcasts, las descargas y que el oyente elija qué canción escuchar", ["Las grabaciones por internet", "Nada, lo cubre todo", "Las radios no comerciales"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["m2-03", 4, "o4", "aplicar", "Tu radio quiere poner la música de un grupo de la iglesia que grabó sus propias canciones. ¿Qué haces?", "Les pides permiso por escrito a los autores y a los que grabaron, y lo guardas", ["Las pones sin preguntar, porque son de la iglesia", "Les cambias los nombres", "Las vendes"], "«porque el obrero es digno de su salario».", "Lucas 10:7"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué el programa de transmisión debe llevar el registro de cada canción que suena?", "Porque las licencias lo piden, y así se paga lo que le corresponde a cada autor", ["Para presumir", "No hace falta", "Para borrar las canciones"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["m2-05", 4, "o4", "aplicar", "Un voluntario dice que la música cristiana no necesita licencias porque es para Dios. ¿Qué le respondes?", "Que las canciones y las grabaciones tienen dueños, y que respetarlos también es honrar a Dios", ["Que tiene razón", "Que solo pagan las canciones nuevas", "Que pagan solo las iglesias grandes"], "«No hurtarás».", "Éxodo 20:15"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué radio por internet está mejor en regla?", "La que tiene las licencias de las canciones y de las grabaciones, lleva el registro y las revisa cada año", ["La que pone solo lo que baja de internet", "La que paga una sola licencia y pone pódcasts", "La que no lleva registro"], "«Pagad a todos lo que debéis».", "Romanos 13:7"],
      ["m2-07", 5, "o5", "recordar", "¿Para qué fueron enviados los gobernadores, según 1 Pedro 2:14?", "Para castigo de los malhechores y alabanza de los que hacen bien", ["Para cobrar impuestos", "Para predicar", "Para construir templos"], "«para castigo de los malhechores y alabanza de los que hacen bien».", "1 Pedro 2:13-14"],
      ["m2-08", 5, "o5", "comprender", "¿Qué dice la identificación oficial de una emisora?", "Sus letras de llamada y la ciudad de su licencia", ["El nombre del pastor", "Los precios de los patrocinadores", "La dirección del templo"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
      ["m2-09", 5, "o5", "aplicar", "Un hermano sugiere transmitir en FM sin licencia hasta que llegue el permiso. ¿Qué le respondes?", "Que no se transmite sin licencia, y que mientras tanto se puede empezar por internet", ["Que tiene razón", "Que transmita con poca potencia", "Que lo haga solo los domingos"], "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan».", "Tito 3:1"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué la FCC les pone reglas a las emisoras de AM y FM?", "Porque usan ondas que son de todos, y hace falta orden para que no se estorben", ["Porque no le gusta la radio", "Para cerrar las iglesias", "No les pone reglas"], "«Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
      ["m2-11", 5, "o5", "comprender", "¿Qué no puede hacer una emisora no comercial con sus patrocinadores?", "Llamar a comprar, ni ofrecer descuentos o regalos para que compren", ["Decir su nombre", "Decir a qué se dedican", "Decir dónde están"], "«que obedezcan, que estén dispuestos a toda buena obra».", "Tito 3:1"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué actitud de una radio cristiana ante las reglas de la FCC es la mejor?", "Obedecerlas con gusto, como parte de su testimonio, y preguntarle a un abogado ante la duda", ["Buscar la manera de saltarlas", "Ignorarlas porque es para Dios", "Obedecer solo las que le convienen"], "«Por causa del Señor someteos a toda institución humana».", "1 Pedro 2:13-14"],
      ["m2-13", 6, "o6", "recordar", "¿A qué estaba atenta Lidia, según Hechos 16:14?", "A lo que Pablo decía", ["A su negocio", "A la música", "A los ruidos de la calle"], "«para que estuviese atenta a lo que Pablo decía».", "Hechos 16:14"],
      ["m2-14", 6, "o6", "comprender", "¿Qué hace fuera del aire el equipo de la radio con quien necesita conversar más?", "Lo vuelve a llamar, con un hermano o una hermana preparados", ["Nada", "Lo publica en las redes", "Le cobra la llamada"], "«todo hombre sea pronto para oír».", "Santiago 1:19"],
      ["m2-15", 6, "o6", "aplicar", "Una oyente pide al aire que oren por su matrimonio y empieza a dar detalles de su esposo. ¿Qué haces?", "La detienes con amabilidad, oras por ellos sin detalles, y el equipo la llama después", ["La dejas contar todo", "Le pides el nombre completo de su esposo", "Te burlas de la situación"], "«tardo para hablar, tardo para airarse».", "Santiago 1:19"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el equipo de la radio tiene a mano los números de ayuda?", "Porque cualquier día puede llamar alguien en crisis, y hay que responder enseguida", ["Para regalarlos", "Para llenar el tiempo", "No hace falta"], "«todo hombre sea pronto para oír».", "Santiago 1:19"],
      ["m2-17", 6, "o6", "comprender", "¿Por qué en la radio no se dan consejos médicos ni legales?", "Porque no se conoce bien el caso y se podría hacer daño, y se anima a buscar a un profesional", ["Porque está prohibido hablar de salud", "Porque los médicos no oyen la radio", "Sí se deben dar"], "«tardo para hablar».", "Santiago 1:19"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué respuesta a un oyente en crisis al aire es la mejor?", "Escucharlo con calma, sacar la llamada del aire, no dejarlo solo, darle el 988 o llamar al 911 si hay peligro, orar con él y avisar al pastor", ["Seguir el programa como si nada", "Darle un consejo rápido y cortar", "Contar su caso para que todos oren"], "«Mis ovejas oyen mi voz, y yo las conozco».", "Juan 10:27"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "comunicaciones-2-e1",
      tipo: "corta",
      pregunta: "Explica por qué la radio sirve para el evangelio y qué clase de radio puede tener una iglesia.",
      ideas: [
        { id: "oir", peso: 30, texto: "La fe viene por el oír, y nadie oye si no hay quien predique.", formas: ["por el oir", "quien les predique", "predic*", "oir", "oyen", "oigan"], negativa: true },
        { id: "llega", peso: 30, texto: "La radio llega a la casa, al auto y al trabajo, también a los que no van a la iglesia.", formas: ["llega", "auto", "trabajo", "no van a la iglesia", "lejos"] },
        { id: "clases", peso: 30, texto: "Por internet, una FM de baja potencia o un programa en otra emisora.", formas: ["internet", "baja potencia", "otra emisora", "licencia*"] },
      ],
      citas: ["Romanos 10:17", "Romanos 10:14", "Romanos 10:14-15", "Salmos 19:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La fe es por el oír, y el oír por la palabra de Dios (Romanos 10:17), y la radio llega a la casa, al auto y al trabajo de muchos que no van a la iglesia. Una iglesia puede tener una radio por internet, una FM de baja potencia con su licencia o un programa en otra emisora.",
    },
    {
      id: "comunicaciones-2-e2",
      tipo: "corta",
      pregunta: "Explica cómo se habla y cómo se escribe para la radio, con un versículo.",
      ideas: [
        { id: "claridad", peso: 30, texto: "Con claridad, como en Nehemías 8:8: leer claramente y poner el sentido.", formas: ["claridad", "claramente", "el sentido", "pronunci*"] },
        { id: "persona", peso: 30, texto: "Con calidez y buen ritmo, como a una sola persona.", formas: ["una sola persona", "calidez", "ritmo", "como a un amigo", "pausas"] },
        { id: "escribir", peso: 30, texto: "Con frases cortas y palabras sencillas, preparado y grabado con cuidado.", formas: ["frases cortas", "palabras sencillas", "palabras de todos los dias", "graba*", "en voz alta"] },
      ],
      citas: ["Nehemías 8:8", "Proverbios 15:23", "Colosenses 4:4", "Colosenses 4:3-4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Se habla con claridad, como cuando leían la ley claramente y ponían el sentido (Nehemías 8:8), con calidez y buen ritmo, como a una sola persona. Se escribe para oír, con frases cortas y palabras de todos los días, se lee en voz alta, se graba en un lugar callado y se escucha antes de entregarlo.",
    },
    {
      id: "comunicaciones-2-e3",
      tipo: "corta",
      pregunta: "Explica qué licencias necesita una radio cristiana por internet para su música, con un versículo.",
      ideas: [
        { id: "canciones", peso: 30, texto: "Las canciones, con las sociedades de autores, como ASCAP, BMI, SESAC y GMR.", formas: ["ascap", "bmi", "sesac", "gmr", "sociedades de autores", "las canciones"] },
        { id: "grabaciones", peso: 30, texto: "Las grabaciones, con SoundExchange, que no cubre los pódcasts ni las descargas.", formas: ["soundexchange", "las grabaciones", "grabaciones"] },
        { id: "respeto", peso: 30, texto: "Respetar a los autores: no hurtar y pagar lo que se debe.", formas: ["no hurtaras", "pagad", "pagar", "dueno*", "digno de su salario", "respet*"] },
      ],
      citas: ["Éxodo 20:15", "Romanos 13:7", "Lucas 10:7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Las canciones necesitan las licencias de las sociedades de autores, como ASCAP, BMI, SESAC y GMR, y las grabaciones que suenan por internet, la de SoundExchange, que no cubre los pódcasts ni las descargas. Así se respeta a sus dueños, porque Dios dice: pagad a todos lo que debéis (Romanos 13:7).",
    },
    {
      id: "comunicaciones-2-e4",
      tipo: "breve",
      pregunta:
        "Un patrocinador quiere que la emisora FM no comercial de tu iglesia diga: venga hoy a mi tienda y le damos un descuento. Explica cómo le responderías y qué reglas de la FCC sigue la emisora, con citas bíblicas.",
      ideas: [
        { id: "explicar", peso: 25, texto: "Agradecerle y explicarle que una emisora no comercial no puede llamar a comprar ni ofrecer descuentos.", formas: ["no comercial", "llamar a comprar", "descuento*", "regalo*"], negativa: true },
        { id: "permitido", peso: 25, texto: "Proponerle lo que sí se permite: su nombre, a qué se dedica y dónde está.", formas: ["a que se dedica", "donde esta", "su nombre", "gracias a", "objetiv*"] },
        { id: "reglas", peso: 25, texto: "La licencia de la FCC y la identificación cada hora.", formas: ["licencia", "fcc", "identific*", "letras de llamada", "cada hora"] },
        { id: "obedecer", peso: 25, texto: "Obedecer las reglas como testimonio, y preguntarle a un abogado ante la duda.", formas: ["obedec*", "testimonio", "sujet*", "abogado", "someteos", "someternos"] },
      ],
      basta: 85,
      citas: ["Tito 3:1", "1 Pedro 2:13", "1 Pedro 2:13-14", "Lucas 16:10", "Romanos 13:1"],
      pesoCita: 10,
      errores: [
        { id: "e4-anuncio", anula: "explicar", texto: "Decir que la emisora puede hacer el anuncio con el descuento.", formas: ["lo anunciaria", "lo diria al aire", "le haria el anuncio", "puede ofrecer descuento*", "si se puede ofrecer"] },
      ],
      modelo:
        "Primero le agradecería su apoyo, y le explicaría con amabilidad que una emisora no comercial no puede llamar a comprar ni ofrecer descuentos o regalos, porque así lo piden las reglas de su licencia de la FCC. Le propondría lo que sí se permite: decir su nombre, a qué se dedica y dónde está, de forma objetiva, por ejemplo: este programa es posible gracias a la Tienda Esperanza, ropa para toda la familia, en la calle Main. Escribiríamos el texto juntos, y el encargado de la emisora lo revisaría antes de grabarlo. También le contaría que la emisora sigue otras reglas, como identificarse cada hora con sus letras de llamada y su ciudad. Lo haríamos así porque la Biblia nos pide sujetarnos a las autoridades y obedecer (Tito 3:1), y someternos a toda institución humana por causa del Señor (1 Pedro 2:13), y porque el que es fiel en lo muy poco también en lo más es fiel (Lucas 16:10). Si quedara una duda, le preguntaríamos a un abogado.",
    },
    {
      id: "comunicaciones-2-e5",
      tipo: "breve",
      pregunta:
        "Durante el programa en vivo de tu radio, una mujer llama llorando y dice que ya no quiere vivir. Explica cómo la atenderías, con citas bíblicas.",
      ideas: [
        { id: "escuchar", peso: 25, texto: "Mantener la calma y escucharla.", formas: ["escuch*", "calma", "hizo bien en llamar"] },
        { id: "privado", peso: 25, texto: "Sacar la llamada del aire, para hablar en privado.", formas: ["del aire", "en privado", "su intimidad"] },
        { id: "ayuda", peso: 25, texto: "No dejarla sola, darle el 988 o llamar al 911 si hay peligro.", formas: ["988", "911", "no dejarla sola", "no la dejaria sola", "a salvo"] },
        { id: "seguimiento", peso: 25, texto: "Orar con ella, darle seguimiento y avisar al pastor.", formas: ["orar", "oraria", "seguimiento", "al pastor", "hermana preparada"] },
      ],
      basta: 85,
      citas: ["Santiago 1:19", "Juan 10:27", "Hechos 16:14", "Salmos 34:18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero mantendría la calma, la escucharía con atención y le diría que hizo bien en llamar, porque debemos ser prontos para oír y tardos para hablar (Santiago 1:19). Luego sacaría la llamada del aire con cuidado, para hablar con ella en privado y proteger su intimidad. Le preguntaría dónde está y si está a salvo, y no la dejaría sola en la línea. Le daría el número 988, y si su vida corriera un peligro inmediato, llamaría al 911. Si lo desea, oraría con ella, recordándole que el buen pastor conoce a sus ovejas (Juan 10:27), y le pediría sus datos para que una hermana preparada le dé seguimiento. Al aire, les pediría a los oyentes que oren por los que sufren, sin dar su nombre. Después le avisaría al pastor, y el equipo la seguiría acompañando en los días siguientes.",
    },
  ],
  breve: {
    id: "comunicaciones-2-b1",
    tipo: "breve",
    pregunta: "Escribe cómo empezaría y cómo trabajaría la radio de tu iglesia, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "proposito", peso: 15, texto: "Un propósito, porque la fe viene por el oír, y la clase de radio.", formas: ["por el oir", "proposito", "internet", "baja potencia"] },
      { id: "voz", peso: 15, texto: "Hablar con claridad, como a una sola persona.", formas: ["claridad", "claramente", "frases cortas", "una sola persona", "calidez"] },
      { id: "programacion", peso: 20, texto: "Una parrilla pensada para quien escucha a cada hora.", formas: ["parrilla", "programacion", "cada hora", "a cada hora", "su hora", "programa para ninos"] },
      { id: "licencias", peso: 20, texto: "Las licencias de las canciones y de las grabaciones.", formas: ["licencia*", "soundexchange", "ascap", "derechos de autor", "no hurtaras"] },
      { id: "reglas", peso: 15, texto: "Las reglas de la FCC y los patrocinadores.", formas: ["fcc", "identific*", "patrocinador*", "sujet*", "obedec*"] },
      { id: "oyentes", peso: 15, texto: "Atender a los oyentes con cuidado.", formas: ["oyentes", "llamadas", "primer nombre", "988", "seguimiento"] },
    ],
    basta: 85,
    citas: ["Romanos 10:17", "Romanos 10:14", "Salmos 19:4", "Nehemías 8:8", "Proverbios 15:23", "Colosenses 4:4", "Eclesiastés 3:1", "Salmos 96:2", "Efesios 5:19", "Éxodo 20:15", "Romanos 13:7", "Lucas 10:7", "Tito 3:1", "1 Pedro 2:13", "Lucas 16:10", "Juan 10:27", "Hechos 16:14", "Santiago 1:19"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaríamos orando y escribiendo el propósito de la radio, porque la fe es por el oír, y el oír por la palabra de Dios (Romanos 10:17). Como muchas de nuestras familias viven lejos, empezaríamos con una radio por internet, con pocas horas bien hechas y un equipo. Los locutores hablarían con claridad, como cuando leían la ley y ponían el sentido (Nehemías 8:8), con frases cortas y como a una sola persona. Armaríamos una parrilla que piense en quién escucha a cada hora, porque todo tiene su tiempo (Eclesiastés 3:1): alabanza en la mañana, un programa para niños en la tarde y una predicación en la noche. Antes de transmitir conseguiríamos las licencias de las canciones y la de las grabaciones con SoundExchange, porque Dios dice no hurtarás (Éxodo 20:15). Si un día tuviéramos una FM, obedeceríamos las reglas de la FCC, como identificarnos cada hora y agradecer a los patrocinadores sin llamar a comprar, sujetándonos a las autoridades (Tito 3:1). Y atenderíamos a los oyentes: recibiríamos sus llamadas, oraríamos usando solo su primer nombre y les daríamos seguimiento, porque las ovejas oyen la voz del pastor (Juan 10:27).",
  },
};
