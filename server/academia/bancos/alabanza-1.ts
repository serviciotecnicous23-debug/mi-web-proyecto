/**
 * El banco de «Teología de la adoración» (especialidad Alabanza y adoración). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es adorar · o2 Dios en el centro · o3 la adoración en el Antiguo Testamento · o4 Cristo y la
 * adoración del Nuevo Testamento · o5 en espíritu y en verdad · o6 la adoración de toda la vida · o7 el versículo de
 * memoria (Juan 4:23-24).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `alabanza-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_ALABANZA_1: BancoMateria = {
  materia: "alabanza-1",
  repaso: {
    "alabanza-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué le preguntó la mujer samaritana a Jesús sobre la adoración?", "Dónde se debía adorar: en aquel monte o en Jerusalén", ["Cuánto había que ofrendar", "Por qué los judíos ayunaban", "Quién podía cantar en el templo"], "«Nuestros padres adoraron en este monte, y vosotros decís que en Jerusalén es el lugar donde se debe adorar».", "Juan 4:20-21"],
      ["1-r2", 1, "o1", "comprender", "¿Qué significan las palabras que en hebreo y en griego se traducen adorar?", "Inclinarse o postrarse delante de alguien", ["Cantar en voz alta", "Tocar instrumentos", "Leer en público"], "«Venid, adoremos y postrémonos; Arrodillémonos delante de Jehová nuestro Hacedor».", "Salmos 95:6"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano dice que hoy no adoraron porque no hubo canciones lentas. ¿Qué le responderías según la lección?", "Que la adoración no es un estilo, sino una respuesta del corazón a Dios", ["Que tiene razón: adorar es cantar lento", "Que la adoración depende del cantante", "Que solo se adora en el templo"], "«los verdaderos adoradores adorarán al Padre en espíritu y en verdad».", "Juan 4:23-24"],
    ] as P[]).map(p),
    "alabanza-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Por qué es Dios digno de recibir la gloria, según Apocalipsis 4:11?", "Porque creó todas las cosas", ["Porque los hombres lo eligieron", "Porque es el más antiguo de los ángeles", "Porque así lo decidió la iglesia"], "«Señor, digno eres de recibir la gloria y la honra y el poder; porque tú creaste todas las cosas».", "Apocalipsis 4:11"],
      ["2-r2", 2, "o2", "comprender", "¿Qué decían los serafines en la visión de Isaías?", "Santo, santo, santo, Jehová de los ejércitos", ["Grande es el rey Uzías", "Venid, adoremos y postrémonos", "Aleluya, amén"], "«Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria».", "Isaías 6:1-3"],
      ["2-r3", 2, "o2", "aplicar", "¿Cuál es una señal de que algo ocupó el lugar de Dios en la alabanza?", "Que el culto se mide por lo que sentimos o por lo bien que salió, y no por si Dios fue honrado", ["Que se cantó con alegría", "Que se leyó la Biblia", "Que el pueblo oró"], "«No tendrás dioses ajenos delante de mí».", "Éxodo 20:3-5"],
    ] as P[]).map(p),
    "alabanza-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Para qué mandó Dios hacer el santuario, según Éxodo 25:8?", "Para habitar en medio de su pueblo", ["Para guardar el oro de Israel", "Para que Moisés viviera allí", "Para separar a las tribus"], "«Y harán un santuario para mí, y habitaré en medio de ellos».", "Éxodo 25:8"],
      ["3-r2", 3, "o3", "comprender", "¿Qué pasó en la dedicación del templo mientras cantaban todos a una?", "La casa se llenó de una nube, porque la gloria de Jehová la había llenado", ["Se cayó el techo", "Los músicos se fueron", "Salomón suspendió el culto"], "«porque la gloria de Jehová había llenado la casa de Dios».", "2 Crónicas 5:13-14"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué enseña para hoy que David organizara la música del culto?", "Que la adoración se prepara con orden, con músicos apartados y formados", ["Que la música no importa", "Que solo los reyes pueden cantar", "Que no hace falta ensayar"], "«Dad a Jehová la honra debida a su nombre».", "1 Crónicas 16:29"],
    ] as P[]).map(p),
    "alabanza-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿De qué templo hablaba Jesús en Juan 2:19-21?", "Del templo de su cuerpo", ["Del templo de Salomón", "De una sinagoga de Galilea", "Del tabernáculo de Moisés"], "«Mas él hablaba del templo de su cuerpo».", "Juan 2:19-21"],
      ["4-r2", 4, "o4", "comprender", "¿Qué sacrificio ofrecemos ahora, según Hebreos 13:15?", "Sacrificio de alabanza, fruto de labios que confiesan su nombre", ["Corderos en el altar", "Ayunos de cuarenta días", "Dinero para ser perdonados"], "«ofrezcamos siempre a Dios, por medio de él, sacrificio de alabanza».", "Hebreos 13:15"],
      ["4-r3", 4, "o4", "aplicar", "Una hermana piensa que adorar es cosa de los músicos. ¿Qué enseña 1 Pedro 2:5?", "Que todos los creyentes somos sacerdocio santo para ofrecer sacrificios espirituales", ["Que solo los levitas adoran", "Que adorar es solo para los pastores", "Que la alabanza es para los que cantan bien"], "«sacerdocio santo, para ofrecer sacrificios espirituales aceptables a Dios por medio de Jesucristo».", "1 Pedro 2:5"],
    ] as P[]).map(p),
    "alabanza-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué dijo Jesús de la palabra de Dios en Juan 17:17?", "Que su palabra es verdad", ["Que su palabra es antigua", "Que su palabra es solo para los sabios", "Que su palabra cambia con el tiempo"], "«Santifícalos en tu verdad; tu palabra es verdad».", "Juan 17:17"],
      ["5-r2", 5, "o5", "comprender", "¿Qué significa adorar en verdad, según la lección?", "Adorar conforme a quien Dios es, como se revela en su Palabra y en Cristo", ["Adorar con sinceridad aunque lo que se canta no sea bíblico", "Adorar en el lugar verdadero", "Adorar con el estilo correcto"], "«Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren».", "Juan 4:24"],
      ["5-r3", 5, "o5", "aplicar", "Un canto muy pegadizo dice algo de Dios que la Biblia no enseña. ¿Qué hace el equipo?", "Lo revisa con la Biblia y no lo canta mientras no diga la verdad", ["Lo canta porque a la gente le gusta", "Lo canta más fuerte", "Lo usa porque es nuevo"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ] as P[]).map(p),
    "alabanza-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cuál es nuestro culto racional, según Romanos 12:1?", "Presentar nuestros cuerpos en sacrificio vivo, santo, agradable a Dios", ["Ir al templo una vez por semana", "Cantar sin parar", "Dar el diezmo y nada más"], "«que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional».", "Romanos 12:1-2"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué rechazó Dios los cantares de Israel en Amós 5?", "Porque cantaban mientras vivían en la injusticia", ["Porque cantaban desafinado", "Porque usaban instrumentos", "Porque cantaban muy poco"], "«Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo».", "Amós 5:21-24"],
      ["6-r3", 6, "o6", "aplicar", "¿Cómo se adora a Dios en el trabajo, según la lección?", "Siendo honesto y trabajando de corazón, para la gloria de Dios", ["Cantando en voz alta en la oficina", "Faltando para ir al culto", "Hablando solo de religión"], "«hacedlo todo para la gloria de Dios».", "1 Corintios 10:31"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Qué es adorar
    ["f01", 1, "o1", "recordar", "¿Dónde dijo la mujer samaritana que habían adorado sus padres?", "En aquel monte", ["En Jerusalén", "En Belén", "En el río Jordán"], "«Nuestros padres adoraron en este monte».", "Juan 4:20-21"],
    ["f02", 1, "o1", "comprender", "¿Qué era lo importante para Jesús en la adoración, según Juan 4?", "El adorador: que adore al Padre en espíritu y en verdad", ["El lugar donde se adora", "La hora del día", "El idioma del culto"], "«los verdaderos adoradores adorarán al Padre en espíritu y en verdad».", "Juan 4:23-24"],
    ["f03", 1, "o1", "recordar", "¿Qué busca el Padre, según Juan 4:23?", "Adoradores que le adoren en espíritu y en verdad", ["Templos más grandes", "Músicos famosos", "Sacrificios de animales"], "«porque también el Padre tales adoradores busca que le adoren».", "Juan 4:23-24"],
    ["f04", 1, "o1", "comprender", "¿A qué invita Salmos 95:6?", "A adorar, postrarse y arrodillarse delante de Jehová", ["A bailar delante del rey", "A guardar silencio para siempre", "A salir de la ciudad"], "«Venid, adoremos y postrémonos; Arrodillémonos delante de Jehová nuestro Hacedor».", "Salmos 95:6"],
    ["f05", 1, "o1", "analizar", "¿Qué enseña que Abraham llamara adorar a subir al monte para entregar a Isaac?", "Que adorar empieza en un corazón que se rinde y le entrega a Dios lo más amado", ["Que adorar es hacer un viaje", "Que la adoración necesita música", "Que solo los patriarcas adoraban"], "«yo y el muchacho iremos hasta allí y adoraremos».", "Génesis 22:5"],
    ["f06", 1, "o1", "recordar", "¿Qué le respondió Jesús al tentador en Mateo 4:10?", "Al Señor tu Dios adorarás, y a él solo servirás", ["Puedes adorar a quien quieras", "Primero sirve y después adora", "Adora a quien te dé más"], "«Al Señor tu Dios adorarás, y a él sólo servirás».", "Mateo 4:10"],
    ["f07", 1, "o1", "comprender", "¿Qué es alabar, según la lección?", "Celebrar a Dios por lo que es y por lo que hace, con gratitud y gozo", ["Pedirle cosas a Dios", "Escuchar música cristiana", "Hablar bien de la iglesia"], "«Bendice, alma mía, a Jehová, Y no olvides ninguno de sus beneficios».", "Salmos 103:1-2"],
    ["f08", 1, "o1", "analizar", "¿Cómo se relacionan la alabanza y la adoración en la Biblia?", "Van juntas: el Salmo 95 empieza con júbilo y sigue con postrarse", ["Son opuestas", "La alabanza reemplaza a la adoración", "La adoración es solo para los líderes"], "«Venid, adoremos y postrémonos».", "Salmos 95:6"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estas frases describe mejor la adoración bíblica?", "Una respuesta a Dios con todo el ser, el domingo y toda la semana", ["Un espectáculo para el público", "Un estilo de música lenta", "Un sentimiento que dura unos minutos"], "«Al Señor tu Dios adorarás, y a él sólo servirás».", "Mateo 4:10"],
    ["f10", 1, "o7", "recordar", "Completa Juan 4:24: Dios es Espíritu; y los que le adoran…", "en espíritu y en verdad es necesario que adoren", ["en el templo de Jerusalén deben adorar", "con cantos nuevos es necesario que adoren", "en este monte deben adorar"], "«Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren».", "Juan 4:23-24"],
    // Lección 2 · Dios, el centro de la adoración
    ["f11", 2, "o2", "recordar", "¿Qué vio Isaías el año que murió el rey Uzías?", "Al Señor sentado sobre un trono alto y sublime", ["Un ejército en el campo", "Una ciudad destruida", "Un río de fuego"], "«vi yo al Señor sentado sobre un trono alto y sublime».", "Isaías 6:1-3"],
    ["f12", 2, "o2", "comprender", "¿Qué relación hay entre la visión de Dios y la adoración, según la lección?", "Cuanto más clara es nuestra visión de Dios, más verdadera es nuestra adoración", ["No tienen relación", "La adoración depende solo de la música", "Primero se adora y después se conoce a Dios"], "«Santo, santo, santo, Jehová de los ejércitos».", "Isaías 6:1-3"],
    ["f13", 2, "o2", "recordar", "¿Qué dice Romanos 11:36 de todas las cosas?", "Que son de él, por él y para él", ["Que son del hombre", "Que existen por casualidad", "Que son eternas como Dios"], "«Porque de él, y por él, y para él, son todas las cosas».", "Romanos 11:36"],
    ["f14", 2, "o2", "comprender", "¿Qué es un ídolo, según la lección?", "Cualquier cosa que ocupa el lugar de Dios en el corazón", ["Solo una estatua de piedra", "Un cantante famoso", "Un instrumento musical"], "«No tendrás dioses ajenos delante de mí».", "Éxodo 20:3-5"],
    ["f15", 2, "o2", "recordar", "¿Qué le dijo el ángel a Juan cuando se postró ante él?", "Que no lo hiciera y que adorara a Dios", ["Que siguiera adorándolo", "Que adorara a los ancianos", "Que se fuera del cielo"], "«Mira, no lo hagas; porque yo soy consiervo tuyo».", "Apocalipsis 22:9"],
    ["f16", 2, "o2", "analizar", "¿Por qué el ángel no aceptó la adoración de Juan?", "Porque la adoración es solo de Dios y él era consiervo de Juan", ["Porque Juan no sabía cantar", "Porque estaba cansado", "Porque los ángeles son superiores a Dios"], "«Adora a Dios».", "Apocalipsis 22:9"],
    ["f17", 2, "o2", "aplicar", "El equipo terminó feliz porque el culto salió perfecto, aunque nadie pensó en Dios. ¿Qué enseña la lección?", "Que la pregunta del culto es si Dios fue honrado, no si salió perfecto", ["Que lo importante es que salga perfecto", "Que la emoción es la medida del culto", "Que Dios no se fija en el culto"], "«Señor, digno eres de recibir la gloria y la honra y el poder».", "Apocalipsis 4:11"],
    ["f18", 2, "o2", "comprender", "¿Cuál de estos es un atributo de Dios que lleva a adorarlo, según la lección?", "Es santo: distinto de todo y sin mancha", ["Es cambiante", "Es lejano e indiferente", "Es igual a los ángeles"], "«Santo, santo, santo, Jehová de los ejércitos».", "Isaías 6:1-3"],
    ["f19", 2, "o2", "evaluar", "¿Cuál de estas cosas podría convertirse en un ídolo en la alabanza?", "El talento del cantante o la emoción del momento", ["La lectura de la Biblia", "La oración del pueblo", "La confesión de pecados"], "«No tendrás dioses ajenos delante de mí».", "Éxodo 20:3-5"],
    ["f20", 2, "o2", "aplicar", "¿Con qué empieza la adoración bíblica, según la lección?", "Con Dios: con quién es él", ["Con lo que sentimos", "Con la música", "Con el público"], "«porque tú creaste todas las cosas».", "Apocalipsis 4:11"],
    // Lección 3 · La adoración en el Antiguo Testamento
    ["f21", 3, "o3", "recordar", "¿Qué le dijo Dios a Moisés sobre el santuario?", "Que lo hicieran para que él habitara en medio de ellos", ["Que lo hicieran para los reyes", "Que no lo hicieran", "Que lo hicieran en Egipto"], "«Y harán un santuario para mí, y habitaré en medio de ellos».", "Éxodo 25:8"],
    ["f22", 3, "o3", "comprender", "¿Qué enseñaban el altar, los sacrificios y los sacerdotes del tabernáculo?", "Que solo se acerca a Dios quien es purificado", ["Que Dios no quería al pueblo", "Que el culto era un espectáculo", "Que cualquiera podía entrar de cualquier manera"], "«habitaré en medio de ellos».", "Éxodo 25:8"],
    ["f23", 3, "o3", "recordar", "¿Cómo dice 1 Crónicas 16:29 que hay que postrarse delante de Jehová?", "En la hermosura de la santidad", ["En silencio absoluto", "Con vestidos de oro", "Solo una vez al año"], "«Postraos delante de Jehová en la hermosura de la santidad».", "1 Crónicas 16:29"],
    ["f24", 3, "o3", "comprender", "¿Qué hizo David para la música del culto, según la lección?", "Apartó a levitas para cantar y tocar, con turnos y con maestros", ["Prohibió los instrumentos", "Contrató músicos extranjeros", "Dejó que cada uno cantara cuando quisiera"], "«Dad a Jehová la honra debida a su nombre».", "1 Crónicas 16:29"],
    ["f25", 3, "o3", "recordar", "¿Qué cantaban los músicos en la dedicación del templo?", "Porque él es bueno, porque su misericordia es para siempre", ["Grande es el rey Salomón", "Este templo durará para siempre", "Gloria a Israel"], "«Porque él es bueno, porque su misericordia es para siempre».", "2 Crónicas 5:13-14"],
    ["f26", 3, "o3", "analizar", "¿Qué muestra que los músicos cantaran todos a una cuando la gloria llenó la casa?", "La unidad del pueblo al adorar a Dios", ["Que competían entre ellos", "Que cada uno cantaba su canción", "Que la gloria venía por el volumen"], "«cantaban todos a una, para alabar y dar gracias a Jehová».", "2 Crónicas 5:13-14"],
    ["f27", 3, "o3", "recordar", "¿Cómo invita el Salmo 100 a entrar por las puertas de Dios?", "Con acción de gracias", ["Con miedo", "Con quejas", "Con prisa"], "«Entrad por sus puertas con acción de gracias».", "Salmos 100:1-5"],
    ["f28", 3, "o3", "comprender", "¿Qué son los salmos, según la lección?", "Oraciones y cantos para el culto y para la vida: de alabanza, de gratitud, de dolor y de confianza", ["Leyes para los sacerdotes", "Historias de los reyes", "Profecías solo sobre el fin"], "«Cantad alegres a Dios, habitantes de toda la tierra».", "Salmos 100:1-5"],
    ["f29", 3, "o3", "aplicar", "Un hermano en duelo piensa que no puede llevar su tristeza al culto. ¿Qué enseñan los salmos?", "Que hay palabras para llevar a Dios también el dolor", ["Que solo se canta cuando se está feliz", "Que la tristeza no se nombra delante de Dios", "Que debe esperar a estar bien para adorar"], "«para siempre es su misericordia».", "Salmos 100:1-5"],
    ["f30", 3, "o3", "evaluar", "¿Qué principio de la adoración de Israel sigue vigente hoy?", "Que a Dios se lo adora con santidad, con orden y con gozo", ["Que hay que ofrecer animales", "Que solo se adora en Jerusalén", "Que solo los levitas pueden alabar"], "«Servid a Jehová con alegría».", "Salmos 100:1-5"],
    // Lección 4 · Cristo y la adoración del Nuevo Testamento
    ["f31", 4, "o4", "recordar", "¿Qué dijo Jesús que levantaría en tres días?", "Este templo, refiriéndose a su cuerpo", ["Un palacio", "Las murallas de Jerusalén", "Una sinagoga"], "«Destruid este templo, y en tres días lo levantaré».", "Juan 2:19-21"],
    ["f32", 4, "o4", "comprender", "¿Cuál es ahora el lugar de encuentro con Dios, según la lección?", "Jesucristo", ["El templo de Jerusalén", "Un monte sagrado", "El edificio más grande de la ciudad"], "«Mas él hablaba del templo de su cuerpo».", "Juan 2:19-21"],
    ["f33", 4, "o4", "recordar", "¿Por medio de qué tenemos libertad para entrar en el Lugar Santísimo?", "Por la sangre de Jesucristo", ["Por nuestras buenas obras", "Por la música", "Por los sacrificios de animales"], "«teniendo libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo».", "Hebreos 10:19-22"],
    ["f34", 4, "o4", "comprender", "¿Con qué corazón nos invita Hebreos 10:22 a acercarnos?", "Con corazón sincero, en plena certidumbre de fe", ["Con miedo de ser rechazados", "Con orgullo por lo que hacemos", "Con dudas"], "«acerquémonos con corazón sincero, en plena certidumbre de fe».", "Hebreos 10:19-22"],
    ["f35", 4, "o4", "recordar", "¿Qué es el sacrificio de alabanza, según Hebreos 13:15?", "El fruto de labios que confiesan su nombre", ["El dinero que se ofrenda", "Los animales que se ofrecían", "El ayuno de los viernes"], "«sacrificio de alabanza, es decir, fruto de labios que confiesan su nombre».", "Hebreos 13:15"],
    ["f36", 4, "o4", "analizar", "¿Por qué ya no ofrecemos sacrificios de animales?", "Porque Cristo se ofreció una vez para siempre", ["Porque son caros", "Porque la iglesia lo prohibió", "Porque Dios cambió de opinión"], "«ofrezcamos siempre a Dios, por medio de él, sacrificio de alabanza».", "Hebreos 13:15"],
    ["f37", 4, "o4", "recordar", "¿Qué somos todos los creyentes, según 1 Pedro 2:5?", "Un sacerdocio santo", ["Espectadores del culto", "Un grupo de músicos", "Siervos de los levitas"], "«sacerdocio santo, para ofrecer sacrificios espirituales aceptables a Dios».", "1 Pedro 2:5"],
    ["f38", 4, "o4", "comprender", "¿Cómo comían juntos los primeros creyentes, según Hechos 2:46?", "Con alegría y sencillez de corazón, alabando a Dios", ["En silencio y con tristeza", "Cada uno por su lado", "Solo los domingos"], "«comían juntos con alegría y sencillez de corazón, alabando a Dios».", "Hechos 2:46-47"],
    ["f39", 4, "o4", "analizar", "¿Cuál de estos cambios trajo Cristo a la adoración?", "Antes, un grupo de sacerdotes; ahora, todos los creyentes son sacerdotes", ["Antes había alabanza; ahora no", "Antes se adoraba a Dios; ahora a los líderes", "Antes era para todos; ahora solo para pocos"], "«sacerdocio santo».", "1 Pedro 2:5"],
    ["f40", 4, "o4", "aplicar", "Un nuevo creyente cree que debe hacer muchas cosas antes de poder acercarse a Dios. ¿Qué le dices?", "Que nos acercamos por medio de Cristo, no por nuestros méritos", ["Que debe ganarse el derecho", "Que debe esperar a ser músico", "Que solo los pastores se acercan a Dios"], "«teniendo libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo».", "Hebreos 10:19-22"],
    // Lección 5 · En espíritu y en verdad
    ["f41", 5, "o5", "recordar", "¿Qué dijo Jesús de Dios en Juan 4:24?", "Que Dios es Espíritu", ["Que Dios vive en un monte", "Que Dios necesita templos", "Que Dios es como un rey de la tierra"], "«Dios es Espíritu».", "Juan 4:24"],
    ["f42", 5, "o5", "comprender", "¿Qué significa adorar en espíritu, según la lección?", "Adorar desde el interior, con el corazón, movidos por el Espíritu Santo", ["Adorar sin entender lo que se canta", "Adorar solo en silencio", "Adorar sin el cuerpo"], "«en espíritu y en verdad es necesario que adoren».", "Juan 4:24"],
    ["f43", 5, "o5", "recordar", "¿Cómo debe morar la palabra de Cristo en nosotros, según Colosenses 3:16?", "En abundancia", ["En secreto", "Solo los domingos", "Solo en los líderes"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ["f44", 5, "o5", "comprender", "¿Por qué importa lo que dicen los cantos, según la lección?", "Porque lo que cantamos enseña, y muchos aprenden lo que creen por las canciones", ["Porque así suenan mejor", "Porque la gente no escucha la letra", "No importa: solo importa la música"], "«enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
    ["f45", 5, "o5", "recordar", "¿De qué se quejó Dios en Isaías 29:13?", "De un pueblo que lo honraba con los labios, pero con el corazón lejos", ["De un pueblo que no cantaba", "De un pueblo que no tenía instrumentos", "De un pueblo que oraba mucho"], "«con sus labios me honra, pero su corazón está lejos de mí».", "Isaías 29:13"],
    ["f46", 5, "o5", "comprender", "¿Qué hace la persona llena del Espíritu, según Efesios 5:19?", "Habla con salmos, himnos y cánticos espirituales, y alaba al Señor en su corazón", ["Se aparta de la iglesia", "Habla mal de los demás", "Deja de cantar"], "«cantando y alabando al Señor en vuestros corazones».", "Efesios 5:18-19"],
    ["f47", 5, "o5", "recordar", "¿Cómo dice Pablo que cantará, en 1 Corintios 14:15?", "Con el espíritu, y también con el entendimiento", ["Solo con el espíritu", "Solo con el entendimiento", "Sin palabras"], "«cantaré con el espíritu, pero cantaré también con el entendimiento».", "1 Corintios 14:15"],
    ["f48", 5, "o5", "evaluar", "¿Cuál de estas preguntas sirve para evaluar un canto, según la lección?", "¿Dice de Dios lo que la Biblia dice?", ["¿Es el más famoso?", "¿Es muy largo?", "¿Lo canta un artista conocido?"], "«tu palabra es verdad».", "Juan 17:17"],
    ["f49", 5, "o5", "analizar", "¿Por qué cantar la verdad no basta si falta el corazón?", "Porque Dios rechaza la honra de labios cuando el corazón está lejos", ["Porque la verdad no importa", "Porque solo importan las emociones", "Porque Dios no escucha las letras"], "«este pueblo se acerca a mí con su boca».", "Isaías 29:13"],
    ["f50", 5, "o5", "aplicar", "El equipo quiere cantar un canto que pone al que canta en el centro y casi no habla de Dios. ¿Qué conviene?", "Revisar si pone a Cristo y su obra en el centro, y preferir cantos que lo hagan", ["Cantarlo porque es alegre", "No revisar las letras", "Cantar solo cantos sin letra"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    // Lección 6 · La adoración de toda la vida
    ["f51", 6, "o6", "recordar", "¿Cómo debemos presentar nuestros cuerpos, según Romanos 12:1?", "En sacrificio vivo, santo, agradable a Dios", ["En el altar del templo", "En ayuno permanente", "Solo los domingos"], "«que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios».", "Romanos 12:1-2"],
    ["f52", 6, "o6", "comprender", "¿Qué enseña 1 Corintios 10:31 sobre la adoración?", "Que aun comer o beber puede hacerse para la gloria de Dios", ["Que solo el culto es para Dios", "Que comer es pecado", "Que la gloria de Dios es solo para el templo"], "«hacedlo todo para la gloria de Dios».", "1 Corintios 10:31"],
    ["f53", 6, "o6", "recordar", "¿Qué quería Dios que corriera como las aguas, según Amós 5:24?", "El juicio", ["El vino", "La música", "El oro"], "«Pero corra el juicio como las aguas».", "Amós 5:21-24"],
    ["f54", 6, "o6", "comprender", "¿Qué pide Jehová, según Miqueas 6:8?", "Hacer justicia, amar misericordia y humillarse ante Dios", ["Muchos sacrificios", "Cantos más largos", "Fiestas más grandes"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
    ["f55", 6, "o6", "analizar", "¿Qué relación hay entre la alabanza del culto y la vida de la semana?", "Tienen que decir lo mismo: la vida confirma lo que se canta", ["No tienen relación", "La alabanza reemplaza la obediencia", "La vida de la semana no le importa a Dios"], "«Quita de mí la multitud de tus cantares».", "Amós 5:21-24"],
    ["f56", 6, "o6", "recordar", "¿Cómo dice Apocalipsis 5:9 que el Cordero nos redimió?", "Con su sangre, de todo linaje y lengua y pueblo y nación", ["Con oro y plata", "Solo de un pueblo", "Con nuestras obras"], "«con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación».", "Apocalipsis 5:9-13"],
    ["f57", 6, "o6", "comprender", "¿Cómo termina la historia, según Apocalipsis 5?", "En la adoración de toda la creación al que está en el trono y al Cordero", ["En silencio", "En una guerra sin fin", "En el olvido de Dios"], "«Al que está sentado en el trono, y al Cordero, sea la alabanza».", "Apocalipsis 5:9-13"],
    ["f58", 6, "o6", "aplicar", "¿Cuál de estas acciones es adoración en la casa, según la lección?", "Amar y servir a la familia", ["Poner música fuerte", "Gritarles a los hijos", "Ver televisión sin parar"], "«hacedlo todo para la gloria de Dios».", "1 Corintios 10:31"],
    ["f59", 6, "o6", "evaluar", "Un músico canta muy bien los domingos, pero en su trabajo engaña a los clientes. ¿Qué diría Amós?", "Que Dios no recibe la música de quien vive en la injusticia", ["Que lo importante es cantar bien", "Que el trabajo no tiene que ver con Dios", "Que puede compensarlo con más ofrendas"], "«Quita de mí la multitud de tus cantares».", "Amós 5:21-24"],
    ["f60", 6, "o6", "analizar", "¿Por qué se dice que cada culto es un ensayo para la eternidad?", "Porque la iglesia adora como lo hará para siempre delante del trono", ["Porque hay que practicar las canciones", "Porque el cielo es un concierto", "Porque los músicos irán primero"], "«Al que está sentado en el trono, y al Cordero, sea la alabanza, la honra, la gloria y el poder».", "Apocalipsis 5:9-13"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Con quién hablaba Jesús cuando habló de los verdaderos adoradores?", "Con una mujer samaritana, junto a un pozo", ["Con los sacerdotes del templo", "Con Pedro en una barca", "Con Pilato en el pretorio"], "«Nuestros padres adoraron en este monte».", "Juan 4:20-21"],
      ["m1-02", 1, "o1", "comprender", "¿Qué quiso decir Jesús con que ni en aquel monte ni en Jerusalén se adoraría al Padre?", "Que la adoración ya no dependería de un lugar", ["Que los dos lugares serían destruidos", "Que nadie adoraría más", "Que solo se adoraría en Samaria"], "«la hora viene cuando ni en este monte ni en Jerusalén adoraréis al Padre».", "Juan 4:20-21"],
      ["m1-03", 1, "o1", "recordar", "Según Mateo 4:10, ¿a quién se debe servir?", "Solo al Señor", ["Al rey", "A quien nos pague", "A los ángeles"], "«Al Señor tu Dios adorarás, y a él sólo servirás».", "Mateo 4:10"],
      ["m1-04", 1, "o1", "aplicar", "Alguien dice que hoy no puede adorar porque no se siente bien. ¿Qué enseña la lección?", "Que la adoración no es solo un sentimiento, sino reconocer la verdad de quién es Dios", ["Que debe esperar a sentirse bien", "Que la adoración depende del ánimo", "Que nadie adora sin emoción"], "«Arrodillémonos delante de Jehová nuestro Hacedor».", "Salmos 95:6"],
      ["m1-05", 1, "o1", "comprender", "¿Qué le pide el salmista a su alma en Salmos 103:2?", "Que no olvide ninguno de los beneficios de Jehová", ["Que descanse", "Que se calle", "Que busque riquezas"], "«Bendice, alma mía, a Jehová, Y no olvides ninguno de sus beneficios».", "Salmos 103:1-2"],
      ["m1-06", 1, "o7", "recordar", "¿Dónde está el versículo de memoria de esta materia?", "Juan 4:23-24", ["Salmos 100:4", "Romanos 12:1", "Isaías 6:3"], "«los verdaderos adoradores adorarán al Padre en espíritu y en verdad».", "Juan 4:23-24"],
      ["m1-07", 2, "o2", "recordar", "¿Quiénes decían «Santo, santo, santo» en la visión de Isaías?", "Los serafines", ["Los sacerdotes", "Los reyes de Judá", "Los profetas"], "«Por encima de él había serafines».", "Isaías 6:1-3"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué dice Apocalipsis 4:11 que Dios es digno?", "Porque creó todas las cosas, y por su voluntad existen", ["Porque es temido", "Porque tiene un templo", "Porque los hombres lo necesitan"], "«porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas».", "Apocalipsis 4:11"],
      ["m1-09", 2, "o2", "recordar", "¿Qué prohíbe el segundo mandamiento, según la lección?", "Hacerse imágenes para inclinarse ante ellas", ["Cantar en el templo", "Trabajar en el campo", "Tocar instrumentos"], "«No te harás imagen».", "Éxodo 20:3-5"],
      ["m1-10", 2, "o2", "analizar", "¿Cuál de estas situaciones muestra que la música se volvió un ídolo?", "Que el pueblo no puede adorar si no está su estilo favorito", ["Que el pueblo canta con gozo", "Que el equipo ensaya", "Que se canta un salmo"], "«No tendrás dioses ajenos delante de mí».", "Éxodo 20:3-5"],
      ["m1-11", 2, "o2", "comprender", "¿Con qué termina Pablo su enseñanza sobre la salvación en Romanos 11:36?", "Con adoración: a él sea la gloria por los siglos", ["Con una advertencia", "Con una lista de nombres", "Con una pregunta sin respuesta"], "«A él sea la gloria por los siglos. Amén.»", "Romanos 11:36"],
      ["m1-12", 2, "o2", "aplicar", "¿Qué hace un líder de alabanza humilde cuando el pueblo lo aplaude a él?", "Dirige la atención a Dios, el único digno", ["Se queda con la gloria", "Pide más aplausos", "Canta más canciones suyas"], "«Mira, no lo hagas; porque yo soy consiervo tuyo».", "Apocalipsis 22:9"],
      ["m1-13", 3, "o3", "recordar", "¿Quién llevó el arca a Jerusalén, cuando el pueblo cantó 1 Crónicas 16:29?", "David", ["Salomón", "Moisés", "Saúl"], "«Dad a Jehová la honra debida a su nombre».", "1 Crónicas 16:29"],
      ["m1-14", 3, "o3", "recordar", "¿Con qué instrumentos alababan en la dedicación del templo, según 2 Crónicas 5:13?", "Con trompetas, címbalos y otros instrumentos de música", ["Solo con la voz", "Con tambores de guerra", "Con flautas de Egipto"], "«con trompetas y címbalos y otros instrumentos de música».", "2 Crónicas 5:13-14"],
      ["m1-15", 3, "o3", "comprender", "¿Por qué no podían los sacerdotes estar allí para ministrar?", "Por causa de la nube: la gloria de Jehová había llenado la casa", ["Porque estaban enfermos", "Porque no los dejaron entrar", "Porque se acabó el aceite"], "«Y no podían los sacerdotes estar allí para ministrar, por causa de la nube».", "2 Crónicas 5:13-14"],
      ["m1-16", 3, "o3", "comprender", "¿Qué razón da el Salmo 100 para alabar a Dios?", "Que Jehová es bueno y su misericordia es para siempre", ["Que el templo es hermoso", "Que el rey lo manda", "Que es costumbre"], "«Porque Jehová es bueno; para siempre es su misericordia».", "Salmos 100:1-5"],
      ["m1-17", 3, "o3", "analizar", "¿Qué enseñaba el tabernáculo sobre Dios?", "Que quiere vivir con su pueblo y que se lo adora con santidad", ["Que estaba lejos de su pueblo", "Que solo vivía en el cielo", "Que se lo podía adorar de cualquier manera"], "«Y harán un santuario para mí, y habitaré en medio de ellos».", "Éxodo 25:8"],
      ["m1-18", 3, "o3", "aplicar", "¿Qué aprende un equipo de alabanza de los levitas músicos?", "A prepararse con orden y servir con su talento en el culto", ["A competir entre ellos", "A tocar solo cuando quieren", "A no ensayar"], "«Postraos delante de Jehová en la hermosura de la santidad».", "1 Crónicas 16:29"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Cuánto tiempo dijeron los judíos que se había tardado en edificar el templo?", "Cuarenta y seis años", ["Siete años", "Cien años", "Tres años"], "«En cuarenta y seis años fue edificado este templo».", "Juan 2:19-21"],
      ["m2-02", 4, "o4", "comprender", "¿Qué abrió Jesús para nosotros, según Hebreos 10:20?", "Un camino nuevo y vivo a través del velo", ["Una puerta en el muro de Jerusalén", "Un templo nuevo de piedra", "Un camino solo para los sacerdotes"], "«por el camino nuevo y vivo que él nos abrió a través del velo».", "Hebreos 10:19-22"],
      ["m2-03", 4, "o4", "recordar", "¿Por medio de quién ofrecemos sacrificio de alabanza, según Hebreos 13:15?", "Por medio de Jesucristo", ["Por medio de los ángeles", "Por medio de los músicos", "Por medio de los sacerdotes del templo"], "«ofrezcamos siempre a Dios, por medio de él, sacrificio de alabanza».", "Hebreos 13:15"],
      ["m2-04", 4, "o4", "comprender", "¿Cómo describe 1 Pedro 2:5 a los creyentes?", "Como piedras vivas, edificadas como casa espiritual", ["Como piedras muertas", "Como visitantes del templo", "Como siervos de un rey de la tierra"], "«vosotros también, como piedras vivas, sed edificados como casa espiritual».", "1 Pedro 2:5"],
      ["m2-05", 4, "o4", "aplicar", "¿Qué significa para un equipo de alabanza que todos los creyentes sean sacerdotes?", "Que su tarea es ayudar a toda la iglesia a adorar, no adorar en lugar de ella", ["Que el equipo adora por todos", "Que el pueblo solo mira", "Que el equipo es más santo"], "«sacerdocio santo, para ofrecer sacrificios espirituales».", "1 Pedro 2:5"],
      ["m2-06", 4, "o4", "recordar", "¿Qué añadía el Señor cada día a la iglesia, según Hechos 2:47?", "Los que habían de ser salvos", ["Nuevos templos", "Músicos", "Riquezas"], "«Y el Señor añadía cada día a la iglesia los que habían de ser salvos».", "Hechos 2:46-47"],
      ["m2-07", 5, "o5", "recordar", "¿Con qué cantos manda cantar Colosenses 3:16?", "Con salmos e himnos y cánticos espirituales", ["Solo con himnos antiguos", "Solo con coros nuevos", "Con cantos sin letra"], "«con salmos e himnos y cánticos espirituales».", "Colosenses 3:16"],
      ["m2-08", 5, "o5", "comprender", "¿A qué nos lleva la palabra de Cristo que mora en abundancia, según Colosenses 3:16?", "A enseñarnos y exhortarnos unos a otros, cantando con gracia", ["A apartarnos de los hermanos", "A cantar sin pensar", "A dejar de cantar"], "«enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
      ["m2-09", 5, "o5", "recordar", "¿Qué contrasta Efesios 5:18 con ser llenos del Espíritu?", "Embriagarse con vino", ["Ayunar", "Cantar", "Orar"], "«No os embriaguéis con vino, en lo cual hay disolución; antes bien sed llenos del Espíritu».", "Efesios 5:18-19"],
      ["m2-10", 5, "o5", "analizar", "¿Qué equilibrio pide Pablo en 1 Corintios 14:15?", "Que la adoración una el espíritu y el entendimiento", ["Que solo cuente el entendimiento", "Que solo cuente la emoción", "Que no se cante en la iglesia"], "«cantaré con el espíritu, pero cantaré también con el entendimiento».", "1 Corintios 14:15"],
      ["m2-11", 5, "o5", "evaluar", "Un canto dice cosas verdaderas, pero se canta sin pensar en Dios. ¿Qué le falta?", "El corazón: adorar también en espíritu", ["Volumen", "Más instrumentos", "Ser más largo"], "«pero su corazón está lejos de mí».", "Isaías 29:13"],
      ["m2-12", 5, "o5", "aplicar", "¿Qué hace un equipo antes de enseñarle un canto nuevo a la iglesia?", "Revisa su letra con la Biblia y comprueba que se entienda", ["Lo canta sin revisarlo", "Mira solo si está de moda", "Pregunta solo si es fácil de tocar"], "«Santifícalos en tu verdad; tu palabra es verdad».", "Juan 17:17"],
      ["m2-13", 6, "o6", "recordar", "¿Qué pide Romanos 12:2?", "No conformarse a este siglo, sino transformarse por la renovación del entendimiento", ["Conformarse a la moda", "Apartarse de toda la gente", "Dejar de pensar"], "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:1-2"],
      ["m2-14", 6, "o6", "comprender", "¿Qué tenía Israel en tiempos de Amós, aunque Dios lo rechazaba?", "Fiestas, ofrendas y mucha música, pero vivía en la injusticia", ["Ninguna fiesta", "Mucha justicia y poca música", "Un rey justo y humilde"], "«Aborrecí, abominé vuestras solemnidades».", "Amós 5:21-24"],
      ["m2-15", 6, "o6", "recordar", "¿Qué cantaban en el cielo, según Apocalipsis 5:9?", "Un nuevo cántico al Cordero, que con su sangre nos redimió", ["Un himno a los reyes de la tierra", "Una canción de guerra", "Un lamento por los ángeles"], "«y cantaban un nuevo cántico».", "Apocalipsis 5:9-13"],
      ["m2-16", 6, "o6", "comprender", "¿Por qué es digno el Cordero de tomar el libro, según Apocalipsis 5:9?", "Porque fue inmolado y con su sangre nos redimió para Dios", ["Porque es el más fuerte de los ángeles", "Porque lo eligieron los ancianos", "Porque es el más antiguo"], "«porque tú fuiste inmolado, y con tu sangre nos has redimido para Dios».", "Apocalipsis 5:9-13"],
      ["m2-17", 6, "o6", "aplicar", "¿Cómo se adora a Dios con el dinero, según la lección?", "Dando con generosidad y ayudando al necesitado", ["Guardándolo todo", "Gastándolo solo en uno mismo", "Prestando con intereses altos"], "«hacedlo todo para la gloria de Dios».", "1 Corintios 10:31"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál de estas vidas agrada a Dios, según Miqueas 6:8?", "La de quien hace justicia, ama la misericordia y se humilla ante Dios", ["La de quien canta mucho pero oprime al pobre", "La de quien ofrece mucho pero miente", "La de quien solo va a las fiestas"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "alabanza-1-e1",
      tipo: "corta",
      pregunta: "Explica qué es adorar según la Biblia y cómo se relacionan la alabanza y la adoración.",
      ideas: [
        { id: "inclinarse", peso: 25, texto: "Adorar es inclinarse delante de Dios: reconocer que es Dios y rendirle la vida.", formas: ["inclinar*", "postrar*", "arrodill*", "rendir*", "reconocer que"] },
        { id: "respuesta", peso: 20, texto: "Es una respuesta a quien Dios es, con todo el ser.", formas: ["respuesta", "responder", "todo el ser", "toda la vida", "quien es dios", "quien dios es"] },
        { id: "alabar", peso: 25, texto: "Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y gozo.", formas: ["celebrar", "gratitud", "agradec*", "beneficios", "lo que hace"] },
        { id: "juntas", peso: 20, texto: "Las dos van juntas.", formas: ["van juntas", "las dos van", "ambas van", "se complementan", "inseparables", "van de la mano"] },
      ],
      citas: ["Salmos 95:6", "Juan 4:23-24", "Juan 4:23", "Juan 4:24", "Salmos 103:1-2", "Mateo 4:10", "Génesis 22:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Adorar es inclinarse delante de Dios: reconocer que él es Dios y rendirle la vida, como invita Salmos 95:6. Es una respuesta a quien Dios es, con todo el ser. Alabar es celebrar a Dios por lo que es y por lo que hace, con gratitud y gozo. En la Biblia las dos van juntas.",
    },
    {
      id: "alabanza-1-e2",
      tipo: "corta",
      pregunta: "Explica por qué Dios es el centro de la adoración y qué es un ídolo en la alabanza.",
      ideas: [
        { id: "digno", peso: 25, texto: "Dios es digno porque es el Creador y es santo.", formas: ["digno", "creador", "creo todas", "santo"] },
        { id: "solo", peso: 20, texto: "La adoración es solo para Dios.", formas: ["solo a dios", "solo para dios", "solo para el", "unico digno", "solo de dios"] },
        { id: "idolo", peso: 25, texto: "Un ídolo es cualquier cosa que ocupa el lugar de Dios.", formas: ["lugar de dios", "ocupa el lugar", "dioses ajenos", "toma el lugar"] },
        { id: "ejemplos", peso: 20, texto: "La música, la emoción, el talento o el aplauso pueden volverse ídolos.", formas: ["la musica", "emocion", "talento", "aplauso", "el estilo", "cantante"] },
      ],
      citas: ["Apocalipsis 4:11", "Isaías 6:1-3", "Isaías 6:3", "Éxodo 20:3", "Éxodo 20:3-5", "Romanos 11:36", "Apocalipsis 22:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios es el centro porque es digno: es el Creador y es santo (Apocalipsis 4:11). La adoración es solo para él. Un ídolo es cualquier cosa que ocupa el lugar de Dios en el corazón; en la alabanza pueden serlo la música, la emoción del momento, el talento del cantante o el aplauso.",
    },
    {
      id: "alabanza-1-e3",
      tipo: "corta",
      pregunta: "Explica qué cambió en la adoración con la llegada de Cristo.",
      ideas: [
        { id: "templo", peso: 25, texto: "Cristo es el lugar de encuentro con Dios, no un edificio.", formas: ["templo de su cuerpo", "no un edificio", "una persona", "lugar de encuentro", "ya no es un lugar"] },
        { id: "sangre", peso: 25, texto: "Por su sangre tenemos libertad para acercarnos al Padre.", formas: ["su sangre", "libertad para entrar", "acercarnos", "camino nuevo", "el velo"] },
        { id: "sacrificio", peso: 20, texto: "Ya no hay sacrificios de animales: ofrecemos sacrificio de alabanza.", formas: ["sacrificio de alabanza", "fruto de labios", "una vez para siempre"] },
        { id: "sacerdotes", peso: 20, texto: "Todos los creyentes son sacerdotes.", formas: ["sacerdocio", "sacerdotes", "todos los creyentes"] },
      ],
      citas: ["Juan 2:19-21", "Juan 2:21", "Hebreos 10:19-22", "Hebreos 10:19", "Hebreos 13:15", "1 Pedro 2:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Con Cristo, el lugar de encuentro con Dios ya no es un edificio, sino una persona: él hablaba del templo de su cuerpo. Por su sangre tenemos libertad para acercarnos al Padre (Hebreos 10:19). Ya no ofrecemos animales, sino sacrificio de alabanza, y todos los creyentes somos sacerdocio santo.",
    },
    {
      id: "alabanza-1-e4",
      tipo: "breve",
      pregunta:
        "Un amigo te dice que en su iglesia la adoración es solo la parte de la música. Explícale, con la Biblia, qué es adorar en espíritu y en verdad y cómo la adoración abarca toda la vida.",
      ideas: [
        { id: "espiritu", peso: 20, texto: "En espíritu: con el corazón, movidos por el Espíritu Santo.", formas: ["en espiritu", "con el corazon", "espiritu santo", "llenos del espiritu"] },
        { id: "verdad", peso: 20, texto: "En verdad: conforme a quien Dios es, como lo dice su Palabra.", formas: ["en verdad", "palabra es verdad", "la biblia dice", "lo dice la biblia", "conforme a la palabra"] },
        { id: "no_musica", peso: 15, texto: "La música es una forma de adorar, pero no es toda la adoración.", formas: ["una forma", "no es toda", "no es solo", "mas que musica", "mucho mas que"], negativa: true },
        { id: "vida", peso: 25, texto: "La adoración abarca toda la vida: sacrificio vivo, todo para la gloria de Dios.", formas: ["sacrificio vivo", "toda la vida", "gloria de dios", "culto racional"] },
        { id: "justicia", peso: 20, texto: "Dios rechaza la música cuando falta la justicia y la misericordia.", formas: ["justicia", "misericordia", "amos", "injusticia"] },
      ],
      basta: 85,
      citas: ["Juan 4:23-24", "Juan 4:24", "Romanos 12:1", "Romanos 12:1-2", "1 Corintios 10:31", "Amós 5:21-24", "Amós 5:24", "Miqueas 6:8", "Colosenses 3:16", "Efesios 5:18-19", "Juan 17:17", "Isaías 29:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Le diría que la música es una forma de adorar, pero no es toda la adoración. Jesús enseñó que los verdaderos adoradores adoran al Padre en espíritu y en verdad (Juan 4:23-24). En espíritu quiere decir con el corazón, movidos por el Espíritu Santo, y no solo con los labios. En verdad quiere decir conforme a quien Dios es, como lo dice la Biblia, porque su palabra es verdad. Además, la adoración abarca toda la vida: Pablo nos ruega presentar nuestros cuerpos en sacrificio vivo, que es nuestro culto racional, y hacerlo todo para la gloria de Dios. Por eso Dios rechazó los cantares de Israel cuando vivía en la injusticia: quiere que corra la justicia y que amemos la misericordia. Adoramos el domingo cantando, y el lunes siendo honestos en el trabajo y amando a la familia.",
    },
    {
      id: "alabanza-1-e5",
      tipo: "breve",
      pregunta:
        "Prepara una explicación para tu equipo de alabanza: cómo era la adoración en el Antiguo Testamento, qué cambió con Cristo y qué aprendemos de los dos para el culto de hoy.",
      ideas: [
        { id: "santuario", peso: 20, texto: "Dios quiso habitar con su pueblo: el tabernáculo y el templo.", formas: ["tabernaculo", "santuario", "habitare", "habitar en medio", "templo de salomon"] },
        { id: "david", peso: 20, texto: "David organizó la música del culto con levitas apartados y formados.", formas: ["levitas", "david", "turnos", "maestros", "musicos apartados"] },
        { id: "cristo", peso: 25, texto: "Cristo cumplió el templo y los sacrificios; nos acercamos por su sangre.", formas: ["su sangre", "se cumplio", "cumplio", "una vez para siempre", "templo de su cuerpo", "por medio de cristo"] },
        { id: "sacerdocio", peso: 15, texto: "Todos los creyentes son sacerdotes.", formas: ["sacerdocio", "sacerdotes", "todos los creyentes"] },
        { id: "hoy", peso: 20, texto: "Hoy: preparación y orden, santidad y gozo, y que todo el pueblo adore.", formas: ["prepararnos", "ensayar", "con orden", "santidad", "con gozo", "todo el pueblo"] },
      ],
      basta: 85,
      citas: ["Éxodo 25:8", "1 Crónicas 16:29", "2 Crónicas 5:13-14", "Salmos 100:1-5", "Salmos 100:4", "Juan 2:19-21", "Hebreos 10:19-22", "Hebreos 10:19", "Hebreos 13:15", "1 Pedro 2:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En el Antiguo Testamento, Dios mandó hacer un santuario para habitar en medio de su pueblo (Éxodo 25:8). Al tabernáculo, y después al templo, se acercaban con sacrificios y sacerdotes, porque a Dios se lo adora con santidad. David apartó a levitas para la música del culto, con turnos y maestros, y en la dedicación del templo cantaban todos a una cuando la gloria de Dios llenó la casa. Con Cristo, todo eso se cumplió: él es el templo, y por su sangre tenemos libertad para acercarnos al Padre. Su sacrificio fue una vez para siempre, y ahora ofrecemos sacrificio de alabanza. Además, todos los creyentes somos sacerdocio santo. Para nuestro equipo eso significa prepararnos con orden y ensayar, servir con santidad y con gozo, y ayudar a que todo el pueblo adore, no solo los músicos.",
    },
  ],
  breve: {
    id: "alabanza-1-b1",
    tipo: "breve",
    pregunta:
      "Elige un canto que se usa en tu iglesia y evalúalo con lo que aprendiste: ¿adora en espíritu y en verdad? Explica qué dice de Dios, si pone a Cristo y su obra en el centro, si se entiende, cómo ayuda al pueblo a responder y si lo seguirías cantando, con citas bíblicas.",
    ideas: [
      { id: "dice_dios", peso: 25, texto: "Revisa qué dice de Dios y si es lo que dice la Biblia.", formas: ["dice de dios", "lo que la biblia", "la biblia dice", "es biblic*", "es verdad"] },
      { id: "cristo", peso: 25, texto: "Revisa si pone a Cristo y su obra en el centro.", formas: ["en el centro", "pone a cristo", "su obra", "la cruz", "habla de cristo", "habla de jesus"] },
      { id: "entiende", peso: 20, texto: "Revisa si se entiende, para cantar con el entendimiento.", formas: ["se entiende", "entendimiento", "palabras claras", "facil de cantar", "palabras sencillas"] },
      { id: "responder", peso: 20, texto: "Revisa cómo ayuda al pueblo a responder con el corazón.", formas: ["responder", "con el corazon", "reverencia", "gratitud", "rendir*"] },
      { id: "decision", peso: 10, texto: "Decide si se sigue cantando o se cambia.", formas: ["lo seguiria", "seguiriamos cantando", "lo cambiaria", "lo dejaria", "lo recomiendo", "no lo cantaria"], negativa: true },
    ],
    basta: 85,
    citas: ["Juan 4:23-24", "Juan 4:24", "Colosenses 3:16", "Juan 17:17", "1 Corintios 14:15", "Efesios 5:18-19", "Isaías 29:13", "Isaías 6:1-3", "Isaías 6:3", "Apocalipsis 4:11"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Elegí el himno Santo, santo, santo, que cantamos a menudo en mi iglesia. Primero revisé qué dice de Dios: canta su santidad, su poder y su misericordia, y eso es lo que la Biblia dice, como en la visión de Isaías 6:3. Pone a Dios en el centro y no a nosotros, aunque conviene acompañarlo con otro canto que hable de la cruz y de la obra de Cristo. Se entiende, porque sus palabras son claras, y así podemos cantar con el espíritu y también con el entendimiento (1 Corintios 14:15). Ayuda al pueblo a responder con el corazón: lleva a adorar con reverencia y gratitud. Por eso lo seguiría cantando, junto con un canto sobre la cruz, para que la palabra de Cristo more en abundancia en nosotros (Colosenses 3:16).",
  },
};
