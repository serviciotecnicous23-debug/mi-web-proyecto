/**
 * El banco de «Trasfondo y arqueología bíblica» (especialidad Estudios bíblicos avanzados, materia 5). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la arqueología y la Biblia · o2 hallazgos del Antiguo Testamento · o3 los manuscritos y el texto · o4 la
 * vida diaria · o5 el mundo religioso judío · o6 hallazgos del Nuevo Testamento · o7 el versículo de memoria (Isaías 40:8).
 * Cada hallazgo se pregunta con lo que muestra y con lo que se discute.
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `biblicos-avanzados-5-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_BIBLICOS_AVANZADOS_5: BancoMateria = {
  materia: "biblicos-avanzados-5",
  repaso: {
    "biblicos-avanzados-5-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué pide 1 Tesalonicenses 5:21?", "Examinadlo todo; retened lo bueno", ["Creedlo todo sin preguntar", "No examinéis nada", "Retened solo lo nuevo"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["1-r2", 1, "o1", "comprender", "¿Por qué la arqueología no puede probar la fe?", "Porque puede mostrar lugares, personas y costumbres, pero no que Dios habló o que Cristo salva, que se recibe por fe", ["Porque la arqueología está en contra de la Biblia", "Porque no existe la arqueología bíblica", "Sí puede probarla toda"], "«Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve».", "Hebreos 11:1"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano comparte un video que asegura que se halló el arca de Noé y te pide anunciarlo en la iglesia. ¿Qué haces?", "Examinas quién lo dice y si lo publicó una institución seria antes de compartirlo; si no hay fuentes serias, no lo anuncias", ["Lo anuncias enseguida porque favorece la fe", "Te burlas del hermano", "Lo compartes en todas las redes"], "«Examinadlo todo».", "1 Tesalonicenses 5:21"],
    ] as P[]).map(p),
    "biblicos-avanzados-5-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo Mesa, rey de Moab, cuando murió Acab, según 2 Reyes 3:5?", "Se rebeló contra el rey de Israel", ["Se convirtió a Jehová", "Le pagó más tributo", "Se fue a Egipto"], "«muerto Acab, el rey de Moab se rebeló contra el rey de Israel».", "2 Reyes 3:4-5"],
      ["2-r2", 2, "o2", "comprender", "¿Qué muestran los amuletos de plata de Ketef Hinom?", "Que hacia el 600 antes de Cristo ya se escribía la bendición sacerdotal de Números 6:24-26", ["Que Moisés vivió en Jerusalén", "Que la bendición se inventó en la Edad Media", "Nada"], "«Jehová te bendiga, y te guarde».", "Números 6:24-26"],
      ["2-r3", 2, "o2", "aplicar", "Un hermano dice que la estela de Mesa narra toda la guerra de 2 Reyes 3. ¿Qué le aclaras?", "Que la estela confirma que Mesa existió y se rebeló contra Israel, pero no narra la campaña de 2 Reyes 3", ["Que tiene razón", "Que la estela es falsa", "Que Mesa no existió"], "«el rey de Moab se rebeló contra el rey de Israel».", "2 Reyes 3:4-5"],
    ] as P[]).map(p),
    "biblicos-avanzados-5-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué permanece para siempre, según Isaías 40:8?", "La palabra del Dios nuestro", ["La hierba", "La flor", "Los reinos de la tierra"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué fueron tan importantes los manuscritos del mar Muerto?", "Porque son unos mil años más antiguos que los manuscritos medievales, y muestran que el texto se copió con gran cuidado", ["Porque contradicen toda la Biblia", "Porque son los originales de Moisés", "Porque son del Nuevo Testamento"], "«la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["3-r3", 3, "o3", "aplicar", "Un amigo te dice que la Biblia se fue cambiando con el tiempo. ¿Qué le respondes?", "Que tenemos copias muy antiguas, como el Gran Rollo de Isaías y miles de manuscritos del Nuevo Testamento, y que el texto se copió con cuidado", ["Que tiene razón", "Que no hay manuscritos antiguos", "Que la Biblia cayó del cielo así"], "«Vuelve a tomar otro rollo».", "Jeremías 36:27-28"],
    ] as P[]).map(p),
    "biblicos-avanzados-5-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Dónde acostó María a Jesús, según Lucas 2:7?", "En un pesebre, porque no había lugar para ellos en el mesón", ["En una cuna de oro", "En el templo", "En una barca"], "«y lo acostó en un pesebre, porque no había lugar para ellos en el mesón».", "Lucas 2:7"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué pudieron los amigos del paralítico abrir el techo?", "Porque los techos eran planos, de vigas, ramas y barro, y se podían abrir y reparar", ["Porque la casa no tenía techo", "Porque rompieron un vidrio", "Porque era una tienda de tela"], "«descubrieron el techo de donde estaba, y haciendo una abertura».", "Marcos 2:4"],
      ["4-r3", 4, "o4", "aplicar", "Tienes que enseñar la parábola del amigo a medianoche. ¿Qué costumbre explicas?", "Que recibir mal a un huésped era una vergüenza, y que la familia dormía junta, así que levantarse despertaba a todos", ["Que había tiendas abiertas toda la noche", "Que nadie recibía visitas", "Ninguna"], "«porque un amigo mío ha venido a mí de viaje, y no tengo qué ponerle delante».", "Lucas 11:6"],
    ] as P[]).map(p),
    "biblicos-avanzados-5-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué hacía Jesús en el día de reposo, según Lucas 4:16?", "Entraba en la sinagoga, conforme a su costumbre, y se levantaba a leer", ["Se quedaba en casa", "Trabajaba en la carpintería", "Iba al mercado"], "«en el día de reposo entró en la sinagoga, conforme a su costumbre, y se levantó a leer».", "Lucas 4:16"],
      ["5-r2", 5, "o5", "comprender", "¿En qué se diferenciaban los fariseos y los saduceos?", "Los fariseos creían en la resurrección, los ángeles y el espíritu; los saduceos no", ["En nada", "Solo los saduceos oraban", "Los fariseos eran romanos"], "«Porque los saduceos dicen que no hay resurrección, ni ángel, ni espíritu; pero los fariseos afirman estas cosas».", "Hechos 23:8"],
      ["5-r3", 5, "o5", "aplicar", "Un hermano de tu iglesia pone sus tradiciones por encima de la Biblia. ¿Qué texto le compartes?", "Marcos 7: Jesús no despreció la pureza, pero reprendió poner las tradiciones humanas por encima del mandamiento de Dios", ["Ninguno", "Una lista de genealogías", "Que las tradiciones valen más"], "«Porque dejando el mandamiento de Dios, os aferráis a la tradición de los hombres».", "Marcos 7:8"],
    ] as P[]).map(p),
    "biblicos-avanzados-5-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cuántos pórticos tenía el estanque de Betesda, según Juan 5:2?", "Cinco", ["Dos", "Siete", "Doce"], "«el cual tiene cinco pórticos».", "Juan 5:2"],
      ["6-r2", 6, "o6", "comprender", "¿Qué muestra la piedra de Pilato, hallada en Cesarea en 1961?", "Que Poncio Pilato existió y tenía el título de prefecto de Judea", ["Que Pilato era judío", "Que Pilato nunca gobernó", "Que Pilato escribió un evangelio"], "«y le entregaron a Poncio Pilato, el gobernador».", "Mateo 27:2"],
      ["6-r3", 6, "o6", "aplicar", "Un amigo duda de que Jesús haya existido. ¿Qué hallazgos del Nuevo Testamento le muestras?", "La piedra de Pilato, el osario de Caifás y los estanques de Betesda y Siloé, que muestran personas y lugares reales de los evangelios", ["Ninguno", "Una película", "Una leyenda medieval"], "«Y hay en Jerusalén, cerca de la puerta de las ovejas, un estanque».", "Juan 5:2"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La arqueología y la Biblia
    ["f01", 1, "o1", "recordar", "¿Cómo investigó Lucas, según Lucas 1:3?", "Con diligencia, todas las cosas desde su origen", ["De prisa, sin preguntar", "Solo con lo que soñó", "Copiando un libro de leyendas"], "«después de haber investigado con diligencia todas las cosas desde su origen».", "Lucas 1:3-4"],
    ["f02", 1, "o1", "recordar", "¿Qué es la fe, según Hebreos 11:1?", "La certeza de lo que se espera, la convicción de lo que no se ve", ["Una prueba de laboratorio", "Un sentimiento sin razón", "Lo que se ve con los ojos"], "«Es, pues, la fe la certeza de lo que se espera».", "Hebreos 11:1"],
    ["f03", 1, "o1", "comprender", "¿Qué es un tel?", "Un montículo formado por las capas de ciudades que se construyeron una sobre otra a lo largo de los siglos", ["Un tipo de vasija", "Un rollo antiguo", "Un templo pagano"], "«todas las cosas desde su origen».", "Lucas 1:3-4"],
    ["f04", 1, "o1", "comprender", "¿Para qué sirve la cerámica en la arqueología?", "Para fechar las capas, porque cada época tuvo sus formas de vasijas", ["Para cocinar en la excavación", "No sirve para nada", "Para probar la resurrección"], "«Examinadlo todo».", "1 Tesalonicenses 5:21"],
    ["f05", 1, "o1", "comprender", "¿Qué quiere decir que la falta de un hallazgo no prueba que algo no existió?", "Que falta mucho por excavar y mucho se perdió, así que no haber hallado algo no lo niega", ["Que todo lo que no se halló es falso", "Que todo lo que se halló es falso", "Que la arqueología no sirve"], "«la convicción de lo que no se ve».", "Hebreos 11:1"],
    ["f06", 1, "o1", "analizar", "¿Por qué es peligroso exagerar lo que prueba un hallazgo?", "Porque si se descubre la exageración se daña la confianza en la verdad, y la fe no necesita mentiras", ["No es peligroso", "Porque así se convence a más gente", "Porque los hallazgos no existen"], "«retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f07", 1, "o1", "aplicar", "Tienes que enseñar qué es la arqueología bíblica en una clase. ¿Qué explicas?", "El tel, los estratos, la cerámica, el carbono 14 y las inscripciones, y lo que la arqueología puede y no puede mostrar", ["Que la arqueología prueba cada versículo", "Que la arqueología está contra la fe", "Nada, porque no importa"], "«para que conozcas bien la verdad».", "Lucas 1:3-4"],
    ["f08", 1, "o1", "aplicar", "Un amigo te dice que la arqueología demostró que la Biblia es falsa. ¿Qué le respondes?", "Que la arqueología ha confirmado muchos nombres y lugares de la Biblia, que no puede probar ni negar la fe, y que la falta de un hallazgo no prueba nada", ["Que tiene razón", "Que la arqueología es del diablo", "Que no hablas con incrédulos"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f09", 1, "o1", "evaluar", "¿Qué uso de la arqueología en la iglesia es el mejor?", "Uno honesto, que dice lo que muestra un hallazgo, lo que se discute y lo que no prueba", ["Uno que exagera para impresionar", "Uno que evita todo dato", "Uno que repite cualquier noticia"], "«retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f10", 1, "o7", "recordar", "Completa Isaías 40:8: Sécase la hierba, marchítase la flor…", "mas la palabra del Dios nuestro permanece para siempre", ["y la palabra también pasará", "pero los hombres permanecen", "y nada queda para siempre"], "«Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    // Lección 2 · Hallazgos del Antiguo Testamento
    ["f11", 2, "o2", "recordar", "¿Qué hizo Ezequías con las aguas, según 2 Reyes 20:20?", "Hizo el estanque y el conducto, y metió las aguas en la ciudad", ["Secó el río Jordán", "Envenenó las aguas", "Las llevó a Babilonia"], "«cómo hizo el estanque y el conducto, y metió las aguas en la ciudad».", "2 Reyes 20:20"],
    ["f12", 2, "o2", "recordar", "¿Qué pagaba Mesa al rey de Israel, según 2 Reyes 3:4?", "Cien mil corderos y cien mil carneros con sus vellones", ["Oro y plata", "Trigo y cebada", "Nada"], "«y pagaba al rey de Israel cien mil corderos y cien mil carneros con sus vellones».", "2 Reyes 3:4-5"],
    ["f13", 2, "o2", "comprender", "¿Por qué es importante la estela de Merneptah?", "Porque, hacia el 1208 antes de Cristo, tiene la mención de Israel más antigua aceptada fuera de la Biblia", ["Porque narra todo el éxodo", "Porque nombra a Jesús", "Porque es una carta de Pablo"], "«todas las huestes de Jehová salieron de la tierra de Egipto».", "Éxodo 12:41"],
    ["f14", 2, "o2", "comprender", "¿Qué dice la estela de Tel Dan, según la mayoría de los estudiosos?", "Que menciona la casa de David", ["Que nombra a Moisés", "Que cuenta el diluvio", "Que habla de Roma"], "«Y será afirmada tu casa y tu reino para siempre delante de tu rostro».", "2 Samuel 7:16"],
    ["f15", 2, "o2", "comprender", "¿Qué dicen los prismas de Senaquerib sobre Ezequías?", "Que lo encerró en Jerusalén como a un pájaro en una jaula, pero no dicen que tomara la ciudad", ["Que tomó Jerusalén y mató a Ezequías", "Que Ezequías conquistó Asiria", "Nada sobre Ezequías"], "«Entonces Senaquerib rey de Asiria se fue, y volvió a Nínive».", "2 Reyes 19:36"],
    ["f16", 2, "o2", "analizar", "¿Por qué hay que decir que la inscripción de Siloé no nombra a Ezequías?", "Porque su relación con Ezequías viene de la Biblia y de la fecha, y ser honestos con los límites da más confianza", ["Porque no tiene relación con nada", "Porque la inscripción es falsa", "No hace falta decirlo"], "«y metió las aguas en la ciudad».", "2 Reyes 20:20"],
    ["f17", 2, "o2", "aplicar", "Tienes que enseñar 2 Reyes 18 y 19 con un hallazgo. ¿Cuál usas y cómo?", "Los prismas de Senaquerib: muestras su frase sobre Ezequías, notas que no dice que tomara la ciudad y lees cómo Dios libró a Jerusalén", ["La estela de Merneptah, para hablar de Ezequías", "Ninguno", "Uno inventado"], "«se fue, y volvió a Nínive».", "2 Reyes 19:36"],
    ["f18", 2, "o2", "aplicar", "Un joven dice que el Cilindro de Ciro es el decreto de Esdras 1. ¿Qué le explicas?", "Que el cilindro no nombra a los judíos, pero muestra la política de Ciro de devolver a los pueblos, que vemos en Esdras 1", ["Que tiene toda la razón", "Que el cilindro es falso", "Que Ciro no existió"], "«Jehová el Dios de los cielos me ha dado todos los reinos de la tierra».", "Esdras 1:2"],
    ["f19", 2, "o2", "aplicar", "En tu clase alguien pregunta cuál es el texto bíblico más antiguo que se conoce. ¿Qué respondes?", "Los amuletos de plata de Ketef Hinom, de hacia el 600 antes de Cristo, con la bendición de Números 6:24-26", ["Una carta original de Pablo", "El Códice de Leningrado", "Un rollo escrito por Moisés"], "«Jehová haga resplandecer su rostro sobre ti».", "Números 6:24-26"],
    ["f20", 2, "o2", "evaluar", "¿Qué manera de presentar un hallazgo del Antiguo Testamento es la mejor?", "Con su fecha, su lugar, lo que muestra y su límite, relacionándolo con su texto", ["Diciendo que prueba toda la Biblia", "Sin fechas ni fuentes", "Mezclándolo con leyendas"], "«Jehová alce sobre ti su rostro, y ponga en ti paz».", "Números 6:24-26"],
    // Lección 3 · Los manuscritos y el texto de la Biblia
    ["f21", 3, "o3", "recordar", "¿Qué le dijo Dios a Jeremías después de que el rey quemó el rollo, según Jeremías 36:28?", "Que tomara otro rollo y escribiera en él todas las palabras primeras", ["Que no escribiera más", "Que se escondiera para siempre", "Que quemara el palacio"], "«Vuelve a tomar otro rollo, y escribe en él todas las palabras primeras».", "Jeremías 36:27-28"],
    ["f22", 3, "o3", "recordar", "¿Qué libro se le dio a Jesús en la sinagoga de Nazaret, según Lucas 4:17?", "El libro del profeta Isaías", ["El libro de los Salmos", "El libro de Moisés", "Una carta de Pablo"], "«Y se le dio el libro del profeta Isaías».", "Lucas 4:17"],
    ["f23", 3, "o3", "comprender", "¿Qué es el Gran Rollo de Isaías?", "Una copia de Isaías de hacia el 125 antes de Cristo, hallada entre los manuscritos del mar Muerto", ["El original de Isaías", "Un libro del Nuevo Testamento", "Una falsificación moderna"], "«se le dio el libro del profeta Isaías».", "Lucas 4:17"],
    ["f24", 3, "o3", "comprender", "¿Qué hicieron los masoretas?", "Copiaron el texto hebreo con gran cuidado y le añadieron las vocales y las notas", ["Escribieron el Nuevo Testamento", "Quemaron los rollos", "Tradujeron la Biblia al español"], "«la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f25", 3, "o3", "comprender", "¿Qué es el papiro P52?", "Un fragmento de Juan 18 del siglo II, uno de los manuscritos más antiguos del Nuevo Testamento", ["Una carta original de Pedro", "Un rollo de Isaías", "Un libro de los Macabeos"], "«Yo para esto he nacido, y para esto he venido al mundo, para dar testimonio a la verdad».", "Juan 18:37"],
    ["f26", 3, "o3", "analizar", "¿Por qué no conviene decir que no hay ninguna diferencia entre los manuscritos?", "Porque sí hay diferencias, casi todas pequeñas, y la verdad dicha con exactitud convence más que una exageración", ["Porque los manuscritos no existen", "Sí conviene decirlo", "Porque todas las diferencias son grandes"], "«la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f27", 3, "o3", "aplicar", "Tienes que explicar en una clase cómo llegó a nosotros la Biblia. ¿Qué haces?", "Usas una línea del tiempo con los rollos, los manuscritos del mar Muerto, el P52, los códices y el trabajo de los copistas", ["Dices que cayó del cielo en español", "Dices que no se sabe nada", "Solo lees un versículo"], "«Vuelve a tomar otro rollo».", "Jeremías 36:27-28"],
    ["f28", 3, "o3", "aplicar", "Una hermana teme que las diferencias entre las copias cambien su fe. ¿Qué le dices?", "Que las diferencias se estudian abiertamente, que son casi todas pequeñas y que ninguna cambia una doctrina central", ["Que deje de leer la Biblia", "Que no existe ninguna diferencia", "Que cada copia tiene otra fe"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f29", 3, "o3", "aplicar", "Un vendedor ofrece a tu iglesia un fragmento de los manuscritos del mar Muerto. ¿Qué haces?", "Desconfías: después de 2002 aparecieron fragmentos falsos en el mercado, y no compras nada sin una procedencia comprobada", ["Lo compras para exhibirlo", "Lo compras si es barato", "Lo regalas a un museo sin revisarlo"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    ["f30", 3, "o3", "evaluar", "¿Qué conclusión sobre la transmisión de la Biblia es la más acertada?", "Dios guardó su palabra por medio de copistas fieles, y los manuscritos antiguos muestran un texto copiado con gran cuidado", ["El texto se perdió y se inventó otro", "Nadie puede saber nada del texto", "Las copias no tienen ninguna diferencia"], "«la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    // Lección 4 · La vida diaria en tiempos bíblicos
    ["f31", 4, "o4", "recordar", "¿Para qué eran las seis tinajas de piedra de Caná, según Juan 2:6?", "Para el rito de la purificación de los judíos", ["Para guardar vino", "Para el dinero de la boda", "Para el aceite del templo"], "«conforme al rito de la purificación de los judíos».", "Juan 2:6"],
    ["f32", 4, "o4", "recordar", "¿Qué bajaron por el techo los amigos del paralítico, según Marcos 2:4?", "El lecho en que yacía el paralítico", ["Una escalera", "Una canasta de pan", "Una lámpara"], "«bajaron el lecho en que yacía el paralítico».", "Marcos 2:4"],
    ["f33", 4, "o4", "comprender", "¿Qué era el pesebre de Lucas 2:7?", "El comedero de los animales, que muchos piensan que estaba en la parte baja de una casa sencilla", ["Una cama de lujo", "Un tipo de carro", "Un altar del templo"], "«y lo acostó en un pesebre».", "Lucas 2:7"],
    ["f34", 4, "o4", "comprender", "¿Por qué se usaban vasijas de piedra para la purificación?", "Porque, para la pureza ritual de los judíos, la piedra no se contaminaba como el barro", ["Porque eran más baratas", "Porque eran de adorno", "No se usaban"], "«seis tinajas de piedra para agua, conforme al rito de la purificación de los judíos».", "Juan 2:6"],
    ["f35", 4, "o4", "comprender", "¿Qué lugar tenía la hospitalidad en los tiempos bíblicos?", "Era un deber y un honor: recibir bien al que llegaba importaba a la familia y al pueblo", ["No era importante", "Solo los ricos la practicaban", "Estaba prohibida"], "«porque un amigo mío ha venido a mí de viaje».", "Lucas 11:6"],
    ["f36", 4, "o4", "analizar", "¿Por qué es un error leer el mesón de Lucas 2:7 como un hotel de hoy?", "Porque era un lugar sencillo de hospedaje o el cuarto de huéspedes de una casa, y leerlo con ojos de hoy cambia la escena", ["Porque los hoteles de hoy son más baratos", "No es un error", "Porque no había mesones"], "«porque no había lugar para ellos en el mesón».", "Lucas 2:7"],
    ["f37", 4, "o4", "aplicar", "Un niño de tu clase pregunta cómo pudieron romper el techo en Marcos 2. ¿Qué le explicas?", "Que el techo era plano, de vigas, ramas y barro, se subía por una escalera de afuera y se podía abrir y arreglar", ["Que lo rompieron con martillos de metal", "Que el techo era de vidrio", "Que no tiene explicación"], "«haciendo una abertura».", "Marcos 2:4"],
    ["f38", 4, "o4", "aplicar", "Tienes que preparar una clase sobre la boda de Caná. ¿Qué dato del trasfondo usas?", "Que las tinajas de piedra servían para la purificación, y que se han hallado talleres y vasijas de piedra de ese tiempo", ["Que las bodas duraban una hora", "Que el vino se compraba en una tienda", "Ninguno"], "«seis tinajas de piedra para agua».", "Juan 2:6"],
    ["f39", 4, "o4", "aplicar", "Una hermana aplica un pasaje a hoy sin saber qué entendían los primeros oyentes. ¿Qué le aconsejas?", "Que primero pregunte qué entendían ellos, con la ayuda de un libro de costumbres y de un mapa, y después aplique", ["Que aplique directamente sin estudiar", "Que nunca aplique la Biblia", "Que invente las costumbres"], "«y lo envolvió en pañales».", "Lucas 2:7"],
    ["f40", 4, "o4", "evaluar", "¿Qué manera de leer los relatos de la vida diaria en la Biblia es la mejor?", "Leerlos con los ojos de entonces, conociendo sus casas, familias y costumbres, y después aplicarlos a hoy", ["Leerlos con las costumbres de hoy", "Ignorar el trasfondo", "Creer que nada ha cambiado"], "«conforme al rito de la purificación de los judíos».", "Juan 2:6"],
    // Lección 5 · El mundo religioso de los judíos
    ["f41", 5, "o5", "recordar", "¿A qué se aferraban los fariseos, según Marcos 7:3?", "A la tradición de los ancianos", ["A la ley de Roma", "A las costumbres griegas", "A nada"], "«aferrándose a la tradición de los ancianos».", "Marcos 7:3-4"],
    ["f42", 5, "o5", "recordar", "¿Qué no creían los saduceos, según Hechos 23:8?", "Que hubiera resurrección, ángel ni espíritu", ["Que existiera el templo", "Que hubiera sacerdotes", "Que existiera Dios"], "«Porque los saduceos dicen que no hay resurrección, ni ángel, ni espíritu».", "Hechos 23:8"],
    ["f43", 5, "o5", "comprender", "¿Qué diferencia había entre el templo y la sinagoga?", "Había un solo templo, en Jerusalén, con sacerdotes y sacrificios, y muchas sinagogas, donde se leían la ley y los profetas", ["Eran lo mismo", "Había muchos templos y una sola sinagoga", "En la sinagoga se ofrecían sacrificios"], "«en el día de reposo entró en la sinagoga».", "Lucas 4:16"],
    ["f44", 5, "o5", "comprender", "¿Qué cuenta la inscripción de Teódoto, hallada en Jerusalén en 1913?", "Que un sacerdote llamado Teódoto construyó una sinagoga para la lectura de la ley y la enseñanza de los mandamientos", ["Que Pilato construyó el templo", "Que los saduceos escribieron la ley", "Que no había sinagogas en Jerusalén"], "«y se levantó a leer».", "Lucas 4:16"],
    ["f45", 5, "o5", "analizar", "¿Por qué ayuda saber lo que creían los saduceos para entender su pregunta sobre la resurrección?", "Porque no creían en la resurrección, y su pregunta sobre la mujer de siete maridos era una trampa para ridiculizarla", ["Porque creían en la resurrección", "No ayuda en nada", "Porque eran amigos de Jesús"], "«Porque los saduceos dicen que no hay resurrección».", "Hechos 23:8"],
    ["f46", 5, "o5", "aplicar", "Tienes que enseñar Mateo 22:23-33. ¿Cómo lo preparas?", "Explicas quiénes eran los saduceos, lees la pregunta y la respuesta de Jesús, y aplicas la esperanza de la resurrección", ["Lo lees sin explicar quiénes eran", "Dices que los saduceos eran romanos", "Evitas el pasaje"], "«Porque los saduceos dicen que no hay resurrección».", "Hechos 23:8"],
    ["f47", 5, "o5", "aplicar", "Un joven cree que todos los fariseos eran malos. ¿Qué le muestras?", "Que muchos eran sinceros y algunos creyeron, como Nicodemo y Pablo; Jesús criticó la hipocresía, no el amor por la ley", ["Que tiene razón", "Que los fariseos eran ángeles", "Que nadie sabe quiénes eran"], "«en cuanto a la ley, fariseo».", "Filipenses 3:5"],
    ["f48", 5, "o5", "aplicar", "Tu grupo pregunta qué eran las fiestas de peregrinación. ¿Qué le explicas?", "Que tres veces al año los varones subían a Jerusalén: en los panes sin levadura, en las semanas y en los tabernáculos", ["Que eran viajes a Roma", "Que eran fiestas paganas", "Que se hacían cada semana"], "«Tres veces cada año aparecerá todo varón tuyo delante de Jehová tu Dios».", "Deuteronomio 16:16"],
    ["f49", 5, "o5", "aplicar", "Una hermana pregunta quiénes eran los zelotes. ¿Qué le respondes?", "Que querían echar a Roma, aun por la fuerza, y que uno de los doce fue Simón, llamado Zelote", ["Que eran sacerdotes del templo", "Que eran romanos", "Que eran escribas de Babilonia"], "«Simón llamado Zelote».", "Lucas 6:15"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de presentar a los grupos judíos en una clase es la mejor?", "Con lo que creía cada uno, sin caricaturas, mostrando que Jesús criticó la hipocresía y no la ley de Dios", ["Presentar a todos como villanos", "No hablar de ellos", "Inventar detalles"], "«pero los fariseos afirman estas cosas».", "Hechos 23:8"],
    // Lección 6 · Hallazgos del Nuevo Testamento
    ["f51", 6, "o6", "recordar", "¿Adónde mandó Jesús al ciego a lavarse, según Juan 9:7?", "Al estanque de Siloé", ["Al río Jordán", "Al mar de Galilea", "Al estanque de Betesda"], "«Ve a lavarte en el estanque de Siloé».", "Juan 9:7"],
    ["f52", 6, "o6", "recordar", "¿Ante quién llevaron a Jesús los que lo prendieron, según Mateo 26:57?", "Ante el sumo sacerdote Caifás", ["Ante Herodes", "Ante el emperador", "Ante Galión"], "«le llevaron al sumo sacerdote Caifás».", "Mateo 26:57"],
    ["f53", 6, "o6", "recordar", "¿Cerca de qué puerta estaba el estanque de Betesda, según Juan 5:2?", "Cerca de la puerta de las ovejas", ["Cerca de la puerta de los peces", "Cerca de la puerta del este", "Cerca de la puerta de Damasco"], "«cerca de la puerta de las ovejas».", "Juan 5:2"],
    ["f54", 6, "o6", "comprender", "¿Qué es el osario de Caifás?", "Una caja de piedra para huesos, hallada en 1990, con el nombre de José hijo de Caifás", ["Una carta de Caifás", "El trono del sumo sacerdote", "Una moneda"], "«adonde estaban reunidos los escribas y los ancianos».", "Mateo 26:57"],
    ["f55", 6, "o6", "comprender", "¿Por qué es importante la sinagoga de Magdala?", "Porque es del siglo primero, anterior al año 70, y la primera del tiempo del segundo templo hallada en Galilea", ["Porque es del siglo XX", "Porque es un templo pagano", "No es importante"], "«entró en la sinagoga, conforme a su costumbre».", "Lucas 4:16"],
    ["f56", 6, "o6", "analizar", "¿Por qué se dice que los cinco pórticos de Betesda son una interpretación y no un hallazgo indiscutido?", "Porque se hallaron dos estanques con un dique, pero quedan pocos restos de los pórticos", ["Porque no se halló nada", "Porque Juan se equivocó", "Porque había diez pórticos"], "«el cual tiene cinco pórticos».", "Juan 5:2"],
    ["f57", 6, "o6", "aplicar", "Tienes que enseñar Juan 9 usando la arqueología. ¿Cómo lo haces?", "Muestras el estanque de Siloé hallado en 2004, explicas que se discute, y vuelves al centro: Jesús abrió los ojos al ciego", ["Dices que el estanque prueba el milagro", "Evitas el pasaje", "Te quedas solo en el estanque"], "«Fue entonces, y se lavó, y regresó viendo».", "Juan 9:7"],
    ["f58", 6, "o6", "aplicar", "Un hermano dice que la sinagoga de Teódoto es la de los libertos de Hechos 6:9. ¿Qué le aclaras?", "Que es una conjetura posible, pero no se sabe, y que hay que separarla de los datos confirmados", ["Que es un hecho seguro", "Que la inscripción es falsa", "Que no existían sinagogas"], "«Entonces se levantaron unos de la sinagoga llamada de los libertos».", "Hechos 6:9"],
    ["f59", 6, "o6", "aplicar", "Tu clase quiere hacer una exposición sobre los hallazgos del Nuevo Testamento. ¿Qué cuidas?", "Poner de cada uno su lugar, su fecha, lo que muestra y lo que se discute, y terminar en Cristo", ["Exagerar para impresionar", "Inventar hallazgos", "Poner solo fotos sin datos"], "«Ve a lavarte en el estanque de Siloé».", "Juan 9:7"],
    ["f60", 6, "o6", "evaluar", "¿Qué lugar deben tener los hallazgos del Nuevo Testamento en la enseñanza?", "Mostrar que el evangelio sucedió en lugares reales, sin quitarle el centro a Cristo", ["Ser el centro de la fe", "No tener ningún lugar", "Reemplazar a la Biblia"], "«y regresó viendo».", "Juan 9:7"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Para qué escribió Lucas su relato, según Lucas 1:4?", "Para que Teófilo conociera bien la verdad de las cosas en que había sido instruido", ["Para hacerse rico", "Para divertir", "Para competir con otros"], "«para que conozcas bien la verdad de las cosas en las cuales has sido instruido».", "Lucas 1:3-4"],
      ["m1-02", 1, "o1", "comprender", "¿Qué fecha el carbono 14?", "Restos orgánicos, como madera o semillas, y necesita calibrarse", ["Las piedras", "Las monedas de metal", "Las inscripciones"], "«Examinadlo todo».", "1 Tesalonicenses 5:21"],
      ["m1-03", 1, "o1", "aplicar", "Una hermana quiere usar en su clase una foto de internet de un hallazgo increíble. ¿Qué le aconsejas?", "Que primero busque si lo publicó una institución seria y qué dicen los que saben", ["Que la use sin revisar", "Que le añada un dato más", "Que nunca use la arqueología"], "«retened lo bueno».", "1 Tesalonicenses 5:21"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué Lucas es un buen ejemplo para el que estudia la arqueología bíblica?", "Porque investigó con diligencia y escribió por orden, sin temer a los hechos", ["Porque era arqueólogo", "Porque no investigaba", "Porque inventaba"], "«escribírtelas por orden».", "Lucas 1:3-4"],
      ["m1-05", 1, "o1", "recordar", "¿Quién fue uno de los primeros en usar los estratos y la cerámica para fechar, en 1890?", "Flinders Petrie", ["Martín Lutero", "Julio César", "Juan Wesley"], "«Examinadlo todo».", "1 Tesalonicenses 5:21"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué afirmación sobre la arqueología y la Biblia es la más acertada?", "La arqueología ilumina el mundo de la Biblia y confirma muchos datos, pero la fe descansa en la Palabra", ["La arqueología prueba toda la Biblia", "La arqueología niega la Biblia", "La arqueología no tiene nada que decir"], "«la convicción de lo que no se ve».", "Hebreos 11:1"],
      ["m1-07", 2, "o2", "recordar", "¿Dónde está hoy la estela de Mesa?", "En el Museo del Louvre, en París", ["En el Museo Británico", "En Jerusalén", "Se perdió"], "«Entonces Mesa rey de Moab era propietario de ganados».", "2 Reyes 3:4-5"],
      ["m1-08", 2, "o2", "comprender", "¿Qué muestran las tablillas de las raciones halladas en Babilonia?", "Que Joaquín, rey de Judá, y sus hijos estuvieron cautivos en Babilonia y recibían raciones del rey", ["Que Joaquín nunca fue a Babilonia", "Que Babilonia era judía", "Nada"], "«Asimismo llevó cautivos a Babilonia a Joaquín».", "2 Reyes 24:15"],
      ["m1-09", 2, "o2", "aplicar", "Tienes que enseñar Números 6:24-26 a un grupo de jóvenes. ¿Qué dato de la arqueología usas?", "Que en Jerusalén se hallaron amuletos de plata de hacia el 600 antes de Cristo con esta bendición", ["Que Moisés la grabó en una piedra que está en Roma", "Ninguno", "Uno que no puedes comprobar"], "«Jehová te bendiga, y te guarde».", "Números 6:24-26"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué la impresión del sello del rey Ezequías es un hallazgo especial?", "Porque es la primera del sello de un rey de Israel o de Judá hallada en una excavación científica", ["Porque es de oro", "Porque nombra a Jesús", "No es especial"], "«Los demás hechos de Ezequías».", "2 Reyes 20:20"],
      ["m1-11", 2, "o2", "recordar", "¿Quién halló la estela de Merneptah en 1896?", "Flinders Petrie", ["Hormuzd Rassam", "Gabriel Barkay", "Eilat Mazar"], "«todas las huestes de Jehová salieron de la tierra de Egipto».", "Éxodo 12:41"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué afirmación sobre el Cilindro de Ciro es la correcta?", "Muestra la política de Ciro de devolver a los pueblos, pero no nombra a los judíos", ["Es el decreto de Esdras 1 palabra por palabra", "Es la primera carta de derechos humanos", "Habla de Jesús"], "«me ha mandado que le edifique casa en Jerusalén».", "Esdras 1:2"],
      ["m1-13", 3, "o3", "recordar", "¿Dónde se hallaron en 1947 los primeros manuscritos del mar Muerto?", "En una cueva de Qumrán", ["En Roma", "En el templo de Jerusalén", "En Egipto"], "«Sécase la hierba, marchítase la flor».", "Isaías 40:8"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es el Códice de Leningrado?", "Una copia de 1008, la Biblia hebrea completa más antigua que se conserva", ["Un manuscrito griego del Nuevo Testamento", "Un rollo de Qumrán", "Una carta de un zar"], "«la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["m1-15", 3, "o3", "aplicar", "Un joven pregunta por qué no tenemos los escritos originales de los apóstoles. ¿Qué le explicas?", "Que de ningún libro antiguo se conservan los originales, y que del Nuevo Testamento hay miles de copias, algunas muy antiguas", ["Que los quemó la iglesia", "Que nunca existieron", "Que están escondidos en Roma"], "«Vuelve a tomar otro rollo».", "Jeremías 36:27-28"],
      ["m1-16", 3, "o3", "analizar", "¿Qué enseña que Dios mandara escribir otra vez el rollo que quemó el rey Joacim?", "Que ningún poder humano puede borrar la palabra de Dios", ["Que Dios se equivocó", "Que el rey ganó", "Nada"], "«después que el rey quemó el rollo».", "Jeremías 36:27-28"],
      ["m1-17", 3, "o3", "recordar", "¿En qué siglo se copió el Códice Sinaítico?", "En el siglo IV", ["En el siglo I", "En el siglo XII", "En el siglo XX"], "«la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué respuesta a la idea de que la Biblia se cambió es la mejor?", "Una con datos: los manuscritos antiguos, la comparación entre las copias y la honestidad sobre las pequeñas diferencias", ["Enojarse con el que pregunta", "Decir que no hay ninguna diferencia", "Decir que no importa"], "«Examinadlo todo».", "1 Tesalonicenses 5:21"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Cuántas tinajas de piedra había en la boda de Caná, según Juan 2:6?", "Seis", ["Dos", "Doce", "Una"], "«Y estaban allí seis tinajas de piedra para agua».", "Juan 2:6"],
      ["m2-02", 4, "o4", "comprender", "¿Qué se comía comúnmente en los tiempos bíblicos?", "Pan, aceite, aceitunas, higos, uvas, legumbres y pescado; la carne era para las fiestas", ["Carne todos los días", "Comida traída de Roma", "Solo maná"], "«Y traed el becerro gordo y matadlo, y comamos y hagamos fiesta».", "Lucas 15:23"],
      ["m2-03", 4, "o4", "aplicar", "En tu clase alguien imagina a José y a María rechazados en un hotel moderno. ¿Cómo corriges la imagen?", "Explicas que el mesón era un hospedaje sencillo o el cuarto de huéspedes de una casa, y que el pesebre estaba donde se guardaban los animales", ["Le dices que así fue", "Le dices que no importa", "Describes un hotel de lujo"], "«porque no había lugar para ellos en el mesón».", "Lucas 2:7"],
      ["m2-04", 4, "o4", "analizar", "¿Qué cambia en la parábola del amigo a medianoche al conocer la hospitalidad de entonces?", "Se entiende por qué insiste el que pide: estaba en juego el honor de recibir al huésped", ["Nada", "Que el amigo era un ladrón", "Que no había casas"], "«y no tengo qué ponerle delante».", "Lucas 11:6"],
      ["m2-05", 4, "o4", "recordar", "¿Qué oficio tenía Jesús, según Marcos 6:3?", "Carpintero", ["Pescador", "Cobrador de impuestos", "Sacerdote"], "«el carpintero, hijo de María».", "Marcos 6:3"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué herramientas ayudan más a entender la vida diaria de la Biblia?", "Un libro de usos y costumbres de los tiempos bíblicos y un mapa", ["Una película moderna", "La imaginación sola", "Ninguna"], "«conforme al rito de la purificación de los judíos».", "Juan 2:6"],
      ["m2-07", 5, "o5", "recordar", "¿Dónde se había criado Jesús, según Lucas 4:16?", "En Nazaret", ["En Jerusalén", "En Belén", "En Capernaúm"], "«Vino a Nazaret, donde se había criado».", "Lucas 4:16"],
      ["m2-08", 5, "o5", "comprender", "¿Quiénes eran los saduceos?", "Un grupo unido a las familias de los sumos sacerdotes y al templo, que no creía en la resurrección", ["Los maestros de la tradición oral", "Los soldados de Roma", "Los que vivían en Qumrán"], "«Porque los saduceos dicen que no hay resurrección».", "Hechos 23:8"],
      ["m2-09", 5, "o5", "aplicar", "En tu iglesia alguien critica a otro por no seguir una costumbre que no está en la Biblia. ¿Qué le enseña Marcos 7?", "Que no se deben poner las tradiciones humanas por encima del mandamiento de Dios", ["Que las costumbres son mandamientos", "Que critique más", "Que la Biblia no habla de eso"], "«Porque dejando el mandamiento de Dios, os aferráis a la tradición de los hombres».", "Marcos 7:8"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué pudo Pablo dividir al concilio hablando de la resurrección?", "Porque los fariseos creían en la resurrección y los saduceos no, y así se pusieron unos contra otros", ["Porque todos odiaban a Pablo", "Porque nadie creía en la resurrección", "Porque Pablo era saduceo"], "«pero los fariseos afirman estas cosas».", "Hechos 23:8"],
      ["m2-11", 5, "o5", "recordar", "¿Qué se lavaban los fariseos antes de comer, según Marcos 7:3?", "Las manos", ["Solo los pies", "La cabeza", "Nada"], "«si muchas veces no se lavan las manos, no comen».", "Marcos 7:3-4"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué lección del mundo religioso judío es la más útil para la iglesia de hoy?", "Amar la Palabra de Dios sin poner nuestras tradiciones por encima de ella", ["Copiar todas las costumbres judías", "Despreciar la ley", "Que la religión no importa"], "«aferrándose a la tradición de los ancianos».", "Marcos 7:3-4"],
      ["m2-13", 6, "o6", "recordar", "¿Qué significa Siloé, según Juan 9:7?", "Enviado", ["Agua viva", "Casa de misericordia", "Ciudad santa"], "«que traducido es, Enviado».", "Juan 9:7"],
      ["m2-14", 6, "o6", "comprender", "¿Qué título de Pilato confirma la piedra hallada en Cesarea?", "El de prefecto de Judea", ["Rey de los judíos", "Emperador de Roma", "Sumo sacerdote"], "«le entregaron a Poncio Pilato, el gobernador».", "Mateo 27:2"],
      ["m2-15", 6, "o6", "aplicar", "Una joven pregunta si es seguro que el osario de Caifás sea del sumo sacerdote. ¿Qué le respondes?", "Que es probable, pero no seguro, y que conviene decirlo así, con honestidad", ["Que es seguro sin duda", "Que es falso", "Que no existe"], "«le llevaron al sumo sacerdote Caifás».", "Mateo 26:57"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué ayuda conocer el estanque de Betesda para entender Juan 5?", "Porque hace más concreta la escena del enfermo que esperaba junto al agua y al que nadie ayudaba", ["No ayuda", "Porque cambia el milagro", "Porque prueba que no hubo milagro"], "«Y hay en Jerusalén, cerca de la puerta de las ovejas, un estanque».", "Juan 5:2"],
      ["m2-17", 6, "o6", "recordar", "¿Dónde se halló en 1961 la piedra de Pilato?", "En el teatro de Cesarea", ["En el templo de Jerusalén", "En Roma", "En Nazaret"], "«a Poncio Pilato, el gobernador».", "Mateo 27:2"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué conclusión sobre la arqueología del Nuevo Testamento es la más acertada?", "Muestra que los evangelios hablan de personas y lugares reales, y deja el centro en Cristo", ["Prueba todos los milagros", "Niega los evangelios", "No tiene nada que ver con la Biblia"], "«el cual tiene cinco pórticos».", "Juan 5:2"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "biblicos-avanzados-5-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, lo que la arqueología puede mostrar y lo que no puede probar.",
      ideas: [
        { id: "muestra", peso: 30, texto: "Muestra lugares, personas y costumbres de la Biblia.", formas: ["lugares", "personas", "costumbres", "reyes", "inscripcion*", "existieron"] },
        { id: "no_prueba", peso: 30, negativa: true, texto: "No prueba las verdades de la fe, que se reciben por fe.", formas: ["no prueba", "no puede probar", "por fe", "la fe", "resurreccion"] },
        { id: "falta", peso: 30, negativa: true, texto: "Que falte un hallazgo no prueba que algo no existió; hay que examinarlo todo.", formas: ["todavia no", "no se haya hallado", "falta de", "examin*", "falsificacion*"] },
      ],
      citas: ["Hebreos 11:1", "1 Tesalonicenses 5:21", "Lucas 1:3-4", "Lucas 1:3"],
      pesoCita: 10,
      errores: [
        { id: "e1-probo", anula: "no_prueba", texto: "Decir que la arqueología probó toda la Biblia.", formas: ["probo toda la biblia", "prueba toda la biblia", "ya no hace falta la fe"] },
      ],
      modelo:
        "La arqueología puede mostrar que existieron lugares, personas y costumbres de la Biblia, como reyes nombrados en inscripciones. Pero no puede probar las verdades de la fe, como la resurrección, que se reciben por fe (Hebreos 11:1). Y que todavía no se haya hallado algo no prueba que no existió; hay que examinarlo todo.",
    },
    {
      id: "biblicos-avanzados-5-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, tres hallazgos que se relacionan con el Antiguo Testamento y lo que muestra cada uno.",
      ideas: [
        { id: "estelas", peso: 30, texto: "Las estelas de Merneptah, Mesa o Tel Dan: Israel, Mesa y la casa de David.", formas: ["merneptah", "mesa", "tel dan", "casa de david", "estela"] },
        { id: "ezequias", peso: 30, texto: "Siloé o los prismas de Senaquerib: la época de Ezequías.", formas: ["siloe", "tunel", "senaquerib", "prisma*", "ezequias", "bula"] },
        { id: "texto", peso: 30, texto: "Ketef Hinom, Ciro o las raciones de Joaquín.", formas: ["ketef hinom", "amuletos", "bendicion", "ciro", "cilindro", "raciones"] },
      ],
      citas: ["2 Reyes 3:4-5", "2 Reyes 3:5", "2 Reyes 20:20", "Números 6:24-26", "Esdras 1:2", "2 Reyes 19:36", "2 Reyes 24:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La estela de Mesa, hallada en 1868, cuenta la rebelión de Mesa, rey de Moab, contra Israel (2 Reyes 3:5). La inscripción de Siloé habla de un túnel de agua de hacia el 700, que se relaciona con la obra de Ezequías. Y los amuletos de Ketef Hinom guardan la bendición sacerdotal de Números 6:24-26.",
    },
    {
      id: "biblicos-avanzados-5-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, por qué los manuscritos del mar Muerto ayudan a confiar en el texto de la Biblia.",
      ideas: [
        { id: "antiguos", peso: 30, texto: "Son muy antiguos: el Gran Rollo de Isaías, de hacia el 125 a. C.", formas: ["125", "gran rollo", "mil anos", "mas antiguos", "qumran"] },
        { id: "cuidado", peso: 30, texto: "Muestran que el texto se copió con gran cuidado.", formas: ["con cuidado", "gran cuidado", "casi igual", "copio", "copistas"] },
        { id: "diferencias", peso: 30, negativa: true, texto: "Las diferencias son casi todas pequeñas.", formas: ["diferencias", "ortografia", "pequenas", "detalles"] },
      ],
      citas: ["Isaías 40:8", "Jeremías 36:27-28", "Lucas 4:17", "1 Pedro 1:25"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Porque son muy antiguos: el Gran Rollo de Isaías, hallado en Qumrán, es de hacia el 125 antes de Cristo, unos mil años más antiguo que los manuscritos que se usaban antes. Al compararlos se vio que el texto se copió con gran cuidado y que las diferencias son casi todas pequeñas. La palabra de Dios permanece (Isaías 40:8).",
    },
    {
      id: "biblicos-avanzados-5-e4",
      tipo: "breve",
      pregunta:
        "Un amigo de tu trabajo te dice que la Biblia se fue cambiando con los siglos y que ya no se puede confiar en ella. Explica cómo le responderías, con citas bíblicas.",
      ideas: [
        { id: "respeto", peso: 25, texto: "Escuchar la duda con respeto.", formas: ["con respeto", "escuch*", "pregunta honesta", "sin enojo"] },
        { id: "copias", peso: 25, texto: "No hay originales, sino copias, como de todo libro antiguo.", formas: ["copias", "originales", "libro antiguo", "libros antiguos"] },
        { id: "manuscritos", peso: 25, texto: "Los manuscritos antiguos: Qumrán, el Gran Rollo de Isaías, el P52 y miles del Nuevo Testamento.", formas: ["mar muerto", "qumran", "gran rollo", "p52", "miles de manuscritos", "codice"] },
        { id: "honesto", peso: 25, negativa: true, texto: "Las diferencias son pequeñas y ninguna cambia la fe; invitarlo a leer.", formas: ["pequenas", "ninguna cambia", "doctrina", "diferencias", "invitar*", "invitaria", "leer la biblia"] },
      ],
      basta: 85,
      citas: ["Isaías 40:8", "Jeremías 36:27-28", "Lucas 4:17", "1 Pedro 1:24-25", "Mateo 24:35", "Lucas 1:3-4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero lo escucharía con respeto, porque es una pregunta honesta. Le explicaría que no tenemos los originales de la Biblia, sino copias, como pasa con todos los libros antiguos. Pero tenemos copias muy antiguas: entre los manuscritos del mar Muerto, hallados en Qumrán en 1947, está el Gran Rollo de Isaías, de hacia el 125 antes de Cristo, y al compararlo con los manuscritos de mil años después se vio que el texto se copió con gran cuidado. Del Nuevo Testamento hay miles de manuscritos griegos, algunos muy antiguos, como el papiro P52, del siglo II. Le diría con honestidad que hay diferencias entre las copias, casi todas pequeñas, y que ninguna cambia una doctrina central. Y lo invitaría a leer la Biblia por sí mismo, porque la palabra del Dios nuestro permanece para siempre (Isaías 40:8).",
    },
    {
      id: "biblicos-avanzados-5-e5",
      tipo: "breve",
      pregunta:
        "Tu iglesia quiere preparar una exposición sobre la arqueología y la Biblia para el mes de la Biblia. Explica cómo la organizarías y qué cuidados tendrías, con citas bíblicas.",
      ideas: [
        { id: "hallazgos", peso: 25, texto: "Escoger hallazgos del Antiguo y del Nuevo Testamento.", formas: ["estela", "siloe", "ketef hinom", "pilato", "caifas", "betesda", "manuscritos"] },
        { id: "datos", peso: 25, texto: "Cada uno con su fecha, su lugar, lo que muestra y su texto.", formas: ["su fecha", "su lugar", "lo que muestra", "su texto", "el museo"] },
        { id: "limites", peso: 25, negativa: true, texto: "Decir lo que se discute, no exagerar y evitar las falsificaciones.", formas: ["se discute", "exager*", "falsific*", "no prueba", "fuentes serias", "examin*"] },
        { id: "cristo", peso: 25, texto: "Terminar en Cristo y en la Palabra.", formas: ["con cristo", "a cristo", "el centro", "el evangelio", "permanece para siempre"] },
      ],
      basta: 85,
      citas: ["1 Tesalonicenses 5:21", "Hebreos 11:1", "Lucas 1:3-4", "Isaías 40:8", "2 Reyes 3:4-5", "2 Reyes 20:20", "Números 6:24-26", "Juan 5:2", "Juan 9:7", "Mateo 26:57"],
      pesoCita: 10,
      errores: [
        { id: "e5-exagerar", anula: "limites", texto: "Exagerar o usar piezas sin procedencia.", formas: ["aunque exageremos", "exageremos un poco", "cada una prueba"] },
      ],
      modelo:
        "Primero escogeríamos los hallazgos: del Antiguo Testamento, la estela de Mesa, la inscripción de Siloé y los amuletos de Ketef Hinom; del Nuevo, la piedra de Pilato, el osario de Caifás y los estanques de Betesda y de Siloé. De cada uno pondríamos su fecha, su lugar, el museo donde está, lo que muestra y su texto bíblico, como 2 Reyes 20:20 o Juan 9:7. Cuidaríamos de decir lo que se discute, como los cinco pórticos de Betesda, y de no exagerar: un hallazgo ilumina la Biblia, pero no prueba la fe (Hebreos 11:1). Usaríamos solo fuentes serias y ninguna pieza sin procedencia, porque ha habido falsificaciones, y examinaríamos todo antes de mostrarlo (1 Tesalonicenses 5:21). Y terminaríamos la exposición con Cristo, el centro, y con la palabra del Dios nuestro, que permanece para siempre (Isaías 40:8).",
    },
  ],
  breve: {
    id: "biblicos-avanzados-5-b1",
    tipo: "breve",
    pregunta: "Escribe cómo enseñarías el trasfondo y la arqueología de la Biblia en tu iglesia durante el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "metodo", peso: 15, texto: "Qué es la arqueología y sus límites.", formas: ["el tel", "estratos", "ceramica", "sus limites", "no prueba"] },
      { id: "at", peso: 20, texto: "Hallazgos del Antiguo Testamento.", formas: ["estela", "mesa", "siloe", "ketef hinom", "senaquerib", "tel dan"] },
      { id: "texto", peso: 15, texto: "Los manuscritos y el texto.", formas: ["manuscritos", "mar muerto", "qumran", "gran rollo", "copias"] },
      { id: "vida", peso: 15, texto: "La vida diaria.", formas: ["vida diaria", "casas", "costumbres", "pesebre", "hospitalidad", "techo plano"] },
      { id: "religion", peso: 15, texto: "El mundo religioso: el templo, la sinagoga y los grupos.", formas: ["sinagoga", "fariseos", "saduceos", "esenios"] },
      { id: "nt", peso: 20, texto: "Hallazgos del Nuevo Testamento.", formas: ["pilato", "caifas", "betesda", "magdala", "galion"] },
    ],
    basta: 85,
    citas: ["Lucas 1:3-4", "1 Tesalonicenses 5:21", "Hebreos 11:1", "2 Reyes 3:4-5", "2 Reyes 20:20", "Números 6:24-26", "Isaías 40:8", "Jeremías 36:27-28", "Lucas 4:17", "Lucas 2:7", "Marcos 2:4", "Juan 2:6", "Lucas 4:16", "Hechos 23:8", "Marcos 7:3-4", "Juan 5:2", "Juan 9:7", "Mateo 26:57"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año daría una serie sobre el trasfondo y la arqueología de la Biblia. Empezaría por qué es la arqueología, el tel, los estratos y la cerámica, y por sus límites: ilumina la Biblia, pero no prueba la fe (Hebreos 11:1), y por eso examinamos todo (1 Tesalonicenses 5:21). Veríamos hallazgos del Antiguo Testamento, como la estela de Mesa (2 Reyes 3:4-5), la inscripción de Siloé y los amuletos de Ketef Hinom con la bendición de Números 6:24-26. Estudiaríamos los manuscritos del mar Muerto y cómo nos llegó el texto, porque la palabra de Dios permanece (Isaías 40:8). Conoceríamos la vida diaria, con sus casas de techo plano y su hospitalidad (Marcos 2:4), y el mundo religioso, con la sinagoga, los fariseos y los saduceos (Hechos 23:8). Y terminaríamos con los hallazgos del Nuevo Testamento, como la piedra de Pilato y el estanque de Siloé (Juan 9:7), siempre con Cristo en el centro.",
  },
};
