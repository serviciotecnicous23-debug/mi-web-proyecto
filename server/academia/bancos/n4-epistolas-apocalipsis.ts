/**
 * El banco de «Epístolas y Apocalipsis» (Nivel 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 Romanos y Gálatas · o2 1 y 2 Corintios · o3 las cartas de la prisión · o4 Tesalonicenses y las cartas
 * pastorales · o5 Hebreos y las cartas generales · o6 el Apocalipsis · o7 el versículo de memoria (Hebreos 1:1-2). Sobre
 * el milenio y el arrebatamiento, las preguntas solo piden reconocer que es un punto por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-epistolas-apocalipsis-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_EPISTOLAS_APOCALIPSIS: BancoMateria = {
  materia: "n4-epistolas-apocalipsis",
  repaso: {
    "n4-epistolas-apocalipsis-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué es el evangelio, según Romanos 1:16?", "Poder de Dios para salvación a todo aquel que cree", ["Una filosofía más", "Una ley para los judíos", "Un consejo moral"], "«Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree».", "Romanos 1:16-17"],
      ["1-r2", 1, "o1", "comprender", "¿Qué problema enfrentó Pablo en Gálatas?", "Algunos enseñaban que los gentiles debían circuncidarse y guardar la ley para ser salvos", ["Algunos negaban la existencia de Dios", "Nadie quería ofrendar", "Adoraban a los ángeles"], "«para seguir un evangelio diferente».", "Gálatas 1:6-7"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano vive con culpa aunque confesó su pecado. ¿Qué le enseña Romanos 8:1?", "Que ninguna condenación hay para los que están en Cristo Jesús", ["Que debe pagar por su pecado", "Que Dios todavía lo condena", "Que la culpa es una buena señal"], "«Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús».", "Romanos 8:1"],
    ] as P[]).map(p),
    "n4-epistolas-apocalipsis-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué ruega Pablo a los corintios en 1 Corintios 1:10?", "Que no haya entre ellos divisiones", ["Que construyan un templo", "Que dejen de reunirse", "Que elijan a un solo apóstol"], "«y que no haya entre vosotros divisiones».", "1 Corintios 1:10"],
      ["2-r2", 2, "o2", "comprender", "¿Qué ministerio nos dio Dios, según 2 Corintios 5:18?", "El ministerio de la reconciliación", ["El ministerio de la ley", "El ministerio del templo", "El ministerio de la condenación"], "«y nos dio el ministerio de la reconciliación».", "2 Corintios 5:18-20"],
      ["2-r3", 2, "o2", "aplicar", "Un líder se siente débil para servir. ¿Qué le enseña 2 Corintios 12:9?", "Que la gracia de Dios le basta y que su poder se perfecciona en la debilidad", ["Que debe dejar de servir", "Que debe esconder su debilidad", "Que solo los fuertes sirven"], "«Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:9"],
    ] as P[]).map(p),
    "n4-epistolas-apocalipsis-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Cuáles son las cartas de la prisión?", "Efesios, Filipenses, Colosenses y Filemón", ["Romanos, Gálatas y Hebreos", "1 y 2 Timoteo y Tito", "Santiago, Pedro y Judas"], "«Yo pues, preso en el Señor».", "Efesios 4:1-3"],
      ["3-r2", 3, "o3", "comprender", "¿Para qué fuimos creados en Cristo, según Efesios 2:10?", "Para buenas obras, que Dios preparó de antemano", ["Para salvarnos por obras", "Para no hacer nada", "Para gloriarnos"], "«Porque somos hechura suya, creados en Cristo Jesús para buenas obras».", "Efesios 2:8-10"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué le pide Pablo a Filemón sobre Onésimo?", "Que lo reciba no ya como esclavo, sino como hermano amado", ["Que lo castigue", "Que lo venda", "Que no lo reciba"], "«no ya como esclavo, sino como más que esclavo, como hermano amado».", "Filemón 1:15-16"],
    ] as P[]).map(p),
    "n4-epistolas-apocalipsis-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué ordenó Pablo sobre los que no querían trabajar, según 2 Tesalonicenses 3:10?", "Si alguno no quiere trabajar, tampoco coma", ["Que esperaran sin trabajar", "Que vivieran de la iglesia", "Que dejaran la ciudad"], "«Si alguno no quiere trabajar, tampoco coma».", "2 Tesalonicenses 3:10"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué se llaman pastorales 1 y 2 Timoteo y Tito?", "Porque Pablo instruye a dos colaboradores que dirigían iglesias", ["Porque las escribieron pastores de ovejas", "Porque hablan de la creación", "Porque son poemas"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["4-r3", 4, "o4", "aplicar", "Un joven líder duda de su autoridad por su edad. ¿Qué le dice 1 Timoteo 4:12?", "Que sea ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza", ["Que espere a ser mayor", "Que imponga su autoridad", "Que no enseñe"], "«Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza».", "1 Timoteo 4:12"],
    ] as P[]).map(p),
    "n4-epistolas-apocalipsis-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cómo nos ha hablado Dios en estos postreros días, según Hebreos 1:2?", "Por el Hijo", ["Por los ángeles", "Por nuevos profetas", "Solo por sueños"], "«en estos postreros días nos ha hablado por el Hijo».", "Hebreos 1:1-2"],
      ["5-r2", 5, "o5", "comprender", "¿Cómo se armonizan Pablo y Santiago?", "Pablo enseña que las obras no son la base de la justificación; Santiago, que la fe verdadera se muestra con obras", ["Se contradicen", "Santiago enseña la salvación por obras", "Pablo dice que las obras nunca importan"], "«yo te mostraré mi fe por mis obras».", "Santiago 2:17-18"],
      ["5-r3", 5, "o5", "aplicar", "Un creyente duda de tener vida eterna. ¿Qué le muestra 1 Juan 5:13?", "Que Juan escribió para que los que creen en el Hijo sepan que tienen vida eterna", ["Que nadie puede saberlo", "Que depende de sus sentimientos", "Que solo los apóstoles lo sabían"], "«para que sepáis que tenéis vida eterna».", "1 Juan 5:13"],
    ] as P[]).map(p),
    "n4-epistolas-apocalipsis-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Dónde estaba Juan cuando recibió el Apocalipsis?", "En la isla llamada Patmos", ["En Jerusalén", "En Roma", "En Corinto"], "«estaba en la isla llamada Patmos, por causa de la palabra de Dios y el testimonio de Jesucristo».", "Apocalipsis 1:9"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseña la lectura futurista del Apocalipsis?", "Que desde el capítulo 4 describe sobre todo los acontecimientos del fin", ["Que todo se cumplió en el siglo I", "Que solo presenta principios espirituales", "Que narra la historia de la iglesia siglo por siglo"], "«para manifestar a sus siervos las cosas que deben suceder pronto».", "Apocalipsis 1:1-3"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué evita el líder al enseñar el Apocalipsis, según la nota de la lección?", "Poner fechas o identificar con seguridad a personas de hoy con los símbolos", ["Leer el libro en voz alta", "Hablar de la gloria de Cristo", "Animar a ser fieles"], "«Bienaventurado el que lee, y los que oyen las palabras de esta profecía».", "Apocalipsis 1:1-3"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Romanos y Gálatas
    ["f01", 1, "o1", "recordar", "¿Desde dónde escribió Pablo a los Romanos, según la lección?", "Desde Corinto", ["Desde Roma", "Desde Jerusalén", "Desde Patmos"], "Pablo escribió a los Romanos desde Corinto, antes de llevar la ofrenda de las iglesias a Jerusalén.", "Romanos 1:16-17"],
    ["f02", 1, "o1", "comprender", "¿Por qué quería Pablo visitar Roma, según la lección?", "Quería pasar por allí de camino a España", ["Para ser juzgado", "Para fundar la iglesia", "Para quedarse a vivir allí"], "Pablo no había fundado la iglesia de Roma y quería visitarla de camino a España (Romanos 15:24).", "Romanos 1:16-17"],
    ["f03", 1, "o1", "recordar", "¿Qué cita Pablo en Romanos 1:17?", "Mas el justo por la fe vivirá", ["Ojo por ojo, y diente por diente", "Amarás a tu prójimo como a ti mismo", "Jehová es mi pastor"], "«Mas el justo por la fe vivirá».", "Romanos 1:16-17"],
    ["f04", 1, "o1", "comprender", "¿Cómo son justificados los que pecaron, según Romanos 3:24?", "Gratuitamente por su gracia, mediante la redención que es en Cristo Jesús", ["Por sus buenas obras", "Por cumplir la ley", "Por sus sacrificios"], "«siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús».", "Romanos 3:23-24"],
    ["f05", 1, "o1", "analizar", "¿De qué tratan los capítulos 9 al 11 de Romanos, según la lección?", "De Dios y el pueblo de Israel", ["De la vida práctica de la iglesia", "Del pecado de todos", "De los dones del Espíritu"], "Romanos 9 al 11 trata del lugar de Israel en el plan de Dios.", "Romanos 1:16-17"],
    ["f06", 1, "o1", "aplicar", "¿Qué pide Pablo en Romanos 12:1?", "Que presentemos nuestros cuerpos en sacrificio vivo, santo, agradable a Dios", ["Que ofrezcamos animales en el templo", "Que nos apartemos de la gente", "Que ayunemos cada día"], "«que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios».", "Romanos 12:1-2"],
    ["f07", 1, "o1", "recordar", "¿Qué dice Pablo del evangelio diferente, en Gálatas 1:7?", "Que no hay otro, sino que algunos quieren pervertir el evangelio de Cristo", ["Que es igual de válido", "Que es una versión mejor", "Que lo enseñaron los apóstoles"], "«No que haya otro, sino que hay algunos que os perturban y quieren pervertir el evangelio de Cristo».", "Gálatas 1:6-7"],
    ["f08", 1, "o1", "comprender", "¿Por qué se discute la fecha de Gálatas, según la lección?", "Porque unos la ubican hacia el año 48, antes del concilio de Jerusalén, y otros unos años después", ["Porque no se sabe quién la escribió", "Porque se escribió en el siglo II", "Porque no tiene destinatarios"], "«Estoy maravillado de que tan pronto os hayáis alejado del que os llamó por la gracia de Cristo».", "Gálatas 1:6-7"],
    ["f09", 1, "o1", "analizar", "¿Para qué es la libertad de Gálatas 5:1, según la lección?", "Para andar en el Espíritu y dar su fruto, no para pecar", ["Para hacer lo que uno quiera", "Para volver a la ley", "Para no congregarse"], "«Estad, pues, firmes en la libertad con que Cristo nos hizo libres, y no estéis otra vez sujetos al yugo de esclavitud».", "Gálatas 5:1"],
    ["f10", 1, "o7", "recordar", "Completa Hebreos 1:1-2: Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas…", "en estos postreros días nos ha hablado por el Hijo", ["nunca más volverá a hablar", "en estos días habla solo por los ángeles", "ahora nos habla por cada nuevo profeta"], "«en estos postreros días nos ha hablado por el Hijo, a quien constituyó heredero de todo, y por quien asimismo hizo el universo».", "Hebreos 1:1-2"],
    // Lección 2 · 1 y 2 Corintios
    ["f11", 2, "o2", "recordar", "¿Cuánto tiempo se quedó Pablo en Corinto, según la lección?", "Un año y medio", ["Tres días", "Diez años", "Dos semanas"], "Pablo se quedó en Corinto un año y seis meses (Hechos 18:11).", "1 Corintios 1:10"],
    ["f12", 2, "o2", "recordar", "¿Desde dónde escribió Pablo 1 Corintios, según la lección?", "Desde Éfeso", ["Desde Roma", "Desde Atenas", "Desde Antioquía"], "Pablo dice que estará en Éfeso hasta Pentecostés (1 Corintios 16:8).", "1 Corintios 1:10"],
    ["f13", 2, "o2", "comprender", "¿Cuál fue el primer problema que Pablo trató en 1 Corintios?", "Las divisiones en la iglesia", ["La falta de dones", "La persecución romana", "El ayuno"], "«Os ruego, pues, hermanos, por el nombre de nuestro Señor Jesucristo, que habléis todos una misma cosa».", "1 Corintios 1:10"],
    ["f14", 2, "o2", "recordar", "¿Cómo es el amor, según 1 Corintios 13:4?", "Sufrido y benigno", ["Celoso y orgulloso", "Impaciente", "Jactancioso"], "«El amor es sufrido, es benigno».", "1 Corintios 13:4-7"],
    ["f15", 2, "o2", "analizar", "¿Por qué Pablo pone el capítulo del amor en medio de la enseñanza sobre los dones?", "Porque los dones sin amor no edifican", ["Porque el amor reemplaza los dones", "Porque los dones ya terminaron", "Porque es un error de los copistas"], "«el amor no tiene envidia, el amor no es jactancioso, no se envanece».", "1 Corintios 13:4-7"],
    ["f16", 2, "o2", "recordar", "¿Qué resume Pablo en 1 Corintios 15:3-4?", "Que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día", ["Que Cristo fue solo un maestro", "Que la resurrección es un símbolo", "Que Cristo no murió"], "«Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día».", "1 Corintios 15:3-4"],
    ["f17", 2, "o2", "comprender", "¿Qué somos, según 2 Corintios 5:20?", "Embajadores en nombre de Cristo", ["Jueces del mundo", "Dueños del evangelio", "Espectadores"], "«Así que, somos embajadores en nombre de Cristo».", "2 Corintios 5:18-20"],
    ["f18", 2, "o2", "recordar", "¿A quién ama Dios, según 2 Corintios 9:7?", "Al dador alegre", ["Al que da mucho aunque se queje", "Al que no da", "Al que da por obligación"], "«porque Dios ama al dador alegre».", "2 Corintios 9:7"],
    ["f19", 2, "o2", "aplicar", "¿Cómo debe dar cada creyente, según 2 Corintios 9:7?", "Como propuso en su corazón, no con tristeza ni por necesidad", ["Lo que le exijan los líderes", "Solo cuando le sobra", "Con tristeza, para que valga más"], "«Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad».", "2 Corintios 9:7"],
    ["f20", 2, "o2", "evaluar", "¿Qué muestra 2 Corintios sobre el ministerio de Pablo, según la lección?", "Que lo defendió ante sus críticos y aprendió que el poder de Dios se perfecciona en la debilidad", ["Que nunca tuvo críticos", "Que confiaba en su propia fuerza", "Que abandonó a la iglesia de Corinto"], "«Por tanto, de buena gana me gloriaré más bien en mis debilidades, para que repose sobre mí el poder de Cristo».", "2 Corintios 12:9"],
    // Lección 3 · Las cartas de la prisión
    ["f21", 3, "o3", "recordar", "¿Dónde ubica la tradición las cartas de la prisión?", "En la primera prisión de Pablo en Roma", ["Solo en la cárcel de Filipos", "En Patmos", "En Jerusalén"], "La tradición las ubica en Roma, hacia los años 60 a 62; algunos proponen Éfeso o Cesarea.", "Efesios 4:1-3"],
    ["f22", 3, "o3", "comprender", "¿Cómo es la salvación, según Efesios 2:8-9?", "Por gracia, por medio de la fe, no por obras", ["Por las obras y la ley", "Por la fe más las obras", "Por el esfuerzo humano"], "«Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe».", "Efesios 2:8-10"],
    ["f23", 3, "o3", "recordar", "¿Qué pide Pablo guardar en Efesios 4:3?", "La unidad del Espíritu en el vínculo de la paz", ["Las tradiciones de los ancianos", "La ley de Moisés", "Los días de fiesta"], "«solícitos en guardar la unidad del Espíritu en el vínculo de la paz».", "Efesios 4:1-3"],
    ["f24", 3, "o3", "recordar", "¿Con qué termina la carta a los Efesios, según la lección?", "Con la armadura de Dios", ["Con una genealogía", "Con el Padre Nuestro", "Con la lista de los apóstoles"], "Efesios 6:10-18 presenta la armadura de Dios.", "Efesios 4:1-3"],
    ["f25", 3, "o3", "comprender", "¿Qué hizo Cristo, según Filipenses 2:7-8?", "Se despojó a sí mismo, tomó forma de siervo y se humilló hasta la muerte de cruz", ["Se aferró a su igualdad con Dios", "Evitó la cruz", "Tomó forma de ángel"], "«sino que se despojó a sí mismo, tomando forma de siervo».", "Filipenses 2:5-8"],
    ["f26", 3, "o3", "recordar", "¿Por qué se llama a Filipenses la carta del gozo?", "Porque desde la cárcel Pablo llama a regocijarse en el Señor siempre", ["Porque Pablo estaba libre y era rico", "Porque habla de fiestas", "Porque no menciona sufrimientos"], "«Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!».", "Filipenses 4:4"],
    ["f27", 3, "o3", "analizar", "¿A qué responde Pablo en Colosenses?", "A una enseñanza que añadía filosofías y reglas humanas a Cristo", ["A la persecución de Nerón", "A la falta de ofrendas", "A los que no cantaban"], "«El es la imagen del Dios invisible, el primogénito de toda creación».", "Colosenses 1:15-18"],
    ["f28", 3, "o3", "recordar", "¿Qué es Cristo de la iglesia, según Colosenses 1:18?", "La cabeza del cuerpo", ["Un miembro más", "Un fundador ausente", "Un ángel guardián"], "«y él es la cabeza del cuerpo que es la iglesia».", "Colosenses 1:15-18"],
    ["f29", 3, "o3", "comprender", "¿Qué enseña Colosenses 1:16 sobre la creación?", "Que todo fue creado por medio de Cristo y para él", ["Que Cristo fue creado primero", "Que la creación es mala", "Que los ángeles crearon el mundo"], "«todo fue creado por medio de él y para él».", "Colosenses 1:15-18"],
    ["f30", 3, "o3", "aplicar", "¿Qué muestra la carta a Filemón?", "Que el evangelio cambia las relaciones: el esclavo vuelve como hermano amado", ["Que la esclavitud era buena", "Que Pablo no conocía a Onésimo", "Que Filemón no era creyente"], "«como hermano amado, mayormente para mí, pero cuánto más para ti».", "Filemón 1:15-16"],
    // Lección 4 · Tesalonicenses y las cartas pastorales
    ["f31", 4, "o4", "recordar", "¿Desde dónde escribió Pablo a los tesalonicenses, según la lección?", "Desde Corinto, hacia los años 50 y 51", ["Desde Roma, al final de su vida", "Desde Patmos", "Desde Jerusalén"], "Son de sus primeras cartas.", "1 Tesalonicenses 1:9-10"],
    ["f32", 4, "o4", "comprender", "¿De qué se convirtieron los tesalonicenses, según 1 Tesalonicenses 1:9?", "De los ídolos a Dios, para servir al Dios vivo y verdadero", ["De la ley a la gracia", "De la pobreza a la riqueza", "De una iglesia a otra"], "«y cómo os convertisteis de los ídolos a Dios, para servir al Dios vivo y verdadero».", "1 Tesalonicenses 1:9-10"],
    ["f33", 4, "o4", "recordar", "¿A quién esperaban los tesalonicenses, según 1 Tesalonicenses 1:10?", "A su Hijo, que vendrá de los cielos", ["A un nuevo profeta", "A un rey de la tierra", "A Pablo"], "«y esperar de los cielos a su Hijo, al cual resucitó de los muertos».", "1 Tesalonicenses 1:9-10"],
    ["f34", 4, "o4", "analizar", "¿Por qué escribió Pablo 2 Tesalonicenses 3:10?", "Porque algunos dejaron de trabajar esperando la venida del Señor", ["Porque nadie quería comer", "Porque la iglesia era rica", "Porque los líderes no trabajaban"], "«Si alguno no quiere trabajar, tampoco coma».", "2 Tesalonicenses 3:10"],
    ["f35", 4, "o4", "recordar", "¿Dónde dirigían iglesias Timoteo y Tito, según la lección?", "En Éfeso y en Creta", ["En Roma y en Corinto", "En Jerusalén y en Antioquía", "En Patmos y en Filipos"], "Timoteo estaba en Éfeso (1 Timoteo 1:3) y Tito en Creta (Tito 1:5).", "2 Timoteo 2:2"],
    ["f36", 4, "o4", "comprender", "¿Qué enseña 2 Timoteo 2:2?", "Encargar lo aprendido a hombres fieles que enseñen también a otros", ["Guardar en secreto la enseñanza", "Enseñar solo a los líderes", "Que solo Pablo podía enseñar"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f37", 4, "o4", "recordar", "¿Para qué es útil la Escritura, según 2 Timoteo 3:16?", "Para enseñar, para redargüir, para corregir, para instruir en justicia", ["Solo para leerla en los cultos", "Solo para los teólogos", "Para adivinar el futuro"], "«Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia».", "2 Timoteo 3:16-17"],
    ["f38", 4, "o4", "comprender", "¿Para qué da Dios la Escritura, según 2 Timoteo 3:17?", "Para que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra", ["Para que no haga falta orar", "Para que el creyente no necesite la iglesia", "Para condenar a los demás"], "«a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra».", "2 Timoteo 3:16-17"],
    ["f39", 4, "o4", "recordar", "¿Qué dijo Pablo al despedirse, en 2 Timoteo 4:7?", "He peleado la buena batalla, he acabado la carrera, he guardado la fe", ["Me arrepiento de haber servido", "Todavía no he empezado", "Me voy a descansar a mi tierra"], "«He peleado la buena batalla, he acabado la carrera, he guardado la fe».", "2 Timoteo 4:7-8"],
    ["f40", 4, "o4", "evaluar", "¿Qué dicen algunos estudiosos sobre las cartas pastorales, según la lección?", "Que dudan de que Pablo las escribiera, aunque las cartas se presentan como suyas y la iglesia antigua las recibió así", ["Que las escribió Juan", "Que no forman parte de la Biblia", "Que se escribieron en el siglo X"], "Las cartas se presentan como de Pablo.", "2 Timoteo 4:7-8"],
    // Lección 5 · Hebreos y las cartas generales
    ["f41", 5, "o5", "recordar", "¿Quién escribió Hebreos?", "No se sabe: se ha pensado en Pablo, en Apolos o en Bernabé", ["Pedro, con seguridad", "Juan, en Patmos", "Moisés"], "Ya en el siglo III, Orígenes reconoció que solo Dios sabe quién la escribió.", "Hebreos 1:1-2"],
    ["f42", 5, "o5", "comprender", "¿Cuál es el tema de Hebreos, según la lección?", "Que Cristo es superior a los ángeles, a Moisés y al sacerdocio de Aarón", ["Que la ley sigue igual", "Que hay que volver al templo", "Que los ángeles son superiores a Cristo"], "«en estos postreros días nos ha hablado por el Hijo».", "Hebreos 1:1-2"],
    ["f43", 5, "o5", "recordar", "¿Qué es la fe, según Hebreos 11:1?", "La certeza de lo que se espera, la convicción de lo que no se ve", ["Un sentimiento pasajero", "Ver para creer", "Una tradición familiar"], "«Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve».", "Hebreos 11:1"],
    ["f44", 5, "o5", "comprender", "¿Qué es necesario para acercarse a Dios, según Hebreos 11:6?", "Creer que él existe y que es galardonador de los que le buscan", ["Tener muchas obras", "Ser perfecto", "Haber nacido en Israel"], "«porque es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan».", "Hebreos 11:6"],
    ["f45", 5, "o5", "recordar", "¿Cómo es la fe sin obras, según Santiago 2:17?", "Muerta en sí misma", ["Suficiente", "Perfecta", "Escondida"], "«Así también la fe, si no tiene obras, es muerta en sí misma».", "Santiago 2:17-18"],
    ["f46", 5, "o5", "analizar", "¿Por qué Santiago no contradice a Pablo?", "Porque Pablo niega que las obras sean la base de la justificación, y Santiago enseña que la fe verdadera se muestra con obras", ["Porque Santiago enseña que nos salvamos por obras", "Porque Pablo dice que las obras están prohibidas", "Porque hablan de temas sin ninguna relación"], "«Muéstrame tu fe sin tus obras, y yo te mostraré mi fe por mis obras».", "Santiago 2:17-18"],
    ["f47", 5, "o5", "recordar", "¿Para qué nos hizo renacer Dios, según 1 Pedro 1:3?", "Para una esperanza viva, por la resurrección de Jesucristo", ["Para una vida sin pruebas", "Para tener riquezas", "Para ser famosos"], "«nos hizo renacer para una esperanza viva, por la resurrección de Jesucristo de los muertos».", "1 Pedro 1:3"],
    ["f48", 5, "o5", "comprender", "¿Contra quiénes advierten 2 Pedro y Judas, según la lección?", "Contra los falsos maestros", ["Contra el gobierno romano", "Contra los pobres", "Contra los nuevos creyentes"], "«exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos».", "Judas 1:3"],
    ["f49", 5, "o5", "aplicar", "¿Qué pide Judas 3 a los creyentes?", "Que contiendan ardientemente por la fe que ha sido una vez dada a los santos", ["Que cambien la fe según los tiempos", "Que eviten hablar de doctrina", "Que discutan con todos"], "«que contendáis ardientemente por la fe que ha sido una vez dada a los santos».", "Judas 1:3"],
    ["f50", 5, "o5", "evaluar", "¿Qué enseñan las cartas de Juan sobre la seguridad?", "Que los que creen en el nombre del Hijo pueden saber que tienen vida eterna", ["Que nadie puede saberlo", "Que depende de las emociones", "Que solo se sabe al morir"], "«Estas cosas os he escrito a vosotros que creéis en el nombre del Hijo de Dios, para que sepáis que tenéis vida eterna».", "1 Juan 5:13"],
    // Lección 6 · El Apocalipsis
    ["f51", 6, "o6", "recordar", "¿Cómo empieza el libro de Apocalipsis?", "La revelación de Jesucristo, que Dios le dio", ["En el principio creó Dios los cielos y la tierra", "Libro de la genealogía de Jesucristo", "Pablo, siervo de Jesucristo"], "«La revelación de Jesucristo, que Dios le dio, para manifestar a sus siervos las cosas que deben suceder pronto».", "Apocalipsis 1:1-3"],
    ["f52", 6, "o6", "comprender", "¿A quiénes bendice Apocalipsis 1:3?", "Al que lee, y a los que oyen las palabras de esta profecía y guardan lo escrito", ["Al que no lo lee", "Solo a los apóstoles", "A los que ponen fechas"], "«Bienaventurado el que lee, y los que oyen las palabras de esta profecía, y guardan las cosas en ella escritas».", "Apocalipsis 1:1-3"],
    ["f53", 6, "o6", "recordar", "¿Hacia qué año fecha el Apocalipsis la mayoría de los estudiosos, según la lección?", "Hacia el año 95, en tiempos de Domiciano", ["Hacia el año 30", "Hacia el año 300", "Hacia el año 1000"], "Así lo dijo Ireneo; otros lo ubican antes del año 70.", "Apocalipsis 1:9"],
    ["f54", 6, "o6", "comprender", "¿Qué géneros reúne el Apocalipsis, según la lección?", "Profecía, carta y apocalipsis", ["Ley, historia y genealogía", "Proverbios y salmos", "Evangelio y parábolas"], "«Bienaventurado el que lee, y los que oyen las palabras de esta profecía».", "Apocalipsis 1:1-3"],
    ["f55", 6, "o6", "recordar", "¿Qué contienen los capítulos 2 y 3 del Apocalipsis?", "Las cartas a las siete iglesias de Asia", ["El milenio", "La caída de Babilonia", "El cielo nuevo y la tierra nueva"], "Las siete iglesias estaban en la provincia romana de Asia.", "Apocalipsis 1:9"],
    ["f56", 6, "o6", "comprender", "¿Qué le dijo Cristo a Juan cuando cayó como muerto, según Apocalipsis 1:17?", "No temas; yo soy el primero y el último", ["Levántate y huye", "Escribe tu propio libro", "No me mires"], "«No temas; yo soy el primero y el último».", "Apocalipsis 1:17-18"],
    ["f57", 6, "o6", "analizar", "¿Qué enseña la lectura preterista?", "Que la mayor parte se cumplió en el siglo I", ["Que todo es futuro", "Que solo presenta principios espirituales", "Que narra la historia de la iglesia hasta hoy"], "La lectura preterista ve cumplida la mayor parte con la caída de Jerusalén y la persecución de Roma.", "Apocalipsis 1:1-3"],
    ["f58", 6, "o6", "analizar", "¿Qué enseña la lectura idealista?", "Que presenta en símbolos la lucha de todos los tiempos entre el reino de Dios y el mal", ["Que todo se cumplió en el siglo I", "Que todo trata del fin", "Que no tiene mensaje"], "Muchos maestros combinan las cuatro lecturas.", "Apocalipsis 11:15"],
    ["f59", 6, "o6", "evaluar", "¿Cuál es el mensaje central del Apocalipsis, según la lección?", "Que el Cordero inmolado es digno, Cristo vence y la iglesia fiel espera su venida", ["Que hay que tener miedo del futuro", "Que el mal ganará", "Que se puede calcular la fecha del fin"], "«Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos».", "Apocalipsis 11:15"],
    ["f60", 6, "o6", "recordar", "¿Con qué oración termina el Apocalipsis?", "Amén; sí, ven, Señor Jesús", ["Así sea por siempre", "Hasta luego, iglesias", "Bendito sea el templo"], "«Ciertamente vengo en breve. Amén; sí, ven, Señor Jesús».", "Apocalipsis 22:20"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué dice Pablo de sí mismo en Romanos 1:16?", "Que no se avergüenza del evangelio", ["Que duda del evangelio", "Que el evangelio es solo para los judíos", "Que el evangelio es débil"], "«Porque no me avergüenzo del evangelio».", "Romanos 1:16-17"],
      ["m1-02", 1, "o1", "comprender", "¿De qué tratan los capítulos 6 al 8 de Romanos?", "De la vida nueva en el Espíritu", ["Del pecado de todos", "Del pueblo de Israel", "De los saludos finales"], "«los que no andan conforme a la carne, sino conforme al Espíritu».", "Romanos 8:1"],
      ["m1-03", 1, "o1", "aplicar", "¿Cómo se transforma el creyente, según Romanos 12:2?", "Por medio de la renovación de su entendimiento", ["Conformándose a este siglo", "Con su esfuerzo, sin Dios", "Cambiando de ciudad"], "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:1-2"],
      ["m1-04", 1, "o1", "recordar", "¿Qué no hay contra el fruto del Espíritu, según Gálatas 5:23?", "Ley", ["Amor", "Gozo", "Paz"], "«mansedumbre, templanza; contra tales cosas no hay ley».", "Gálatas 5:22-23"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué fueron tan importantes Romanos y Gálatas en la Reforma, según la lección?", "Porque Lutero encontró en ellas la justificación por la fe", ["Porque hablan del papado", "Porque enseñan la salvación por obras", "Porque son las cartas más cortas"], "«Mas el justo por la fe vivirá».", "Romanos 1:16-17"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué le ocurrió a Juan Wesley en 1738, según la lección?", "Sintió su corazón ardiendo de una manera extraña al oír el prefacio de Lutero a Romanos", ["Escribió una carta a los Romanos", "Fundó la iglesia de Roma", "Rechazó la justificación por la fe"], "«porque es poder de Dios para salvación a todo aquel que cree».", "Romanos 1:16-17"],
      ["m1-07", 2, "o2", "recordar", "¿Cuántos puertos tenía Corinto, según la lección?", "Dos", ["Ninguno", "Uno", "Siete"], "Corinto era una ciudad rica y comercial, con dos puertos.", "1 Corintios 1:10"],
      ["m1-08", 2, "o2", "comprender", "¿De quiénes decían ser los grupos de Corinto, según la lección?", "De Pablo, de Apolos y de Cefas", ["De Moisés y de Elías", "De Juan y de Santiago", "De los ángeles"], "«sino que estéis perfectamente unidos en una misma mente y en un mismo parecer».", "1 Corintios 1:10"],
      ["m1-09", 2, "o2", "recordar", "¿Qué no guarda el amor, según 1 Corintios 13:5?", "Rencor", ["Esperanza", "Verdad", "Fe"], "«no se irrita, no guarda rencor».", "1 Corintios 13:4-7"],
      ["m1-10", 2, "o2", "aplicar", "Dos grupos de la iglesia pelean por sus líderes favoritos. ¿Qué les dice 1 Corintios 1:10?", "Que estén perfectamente unidos en una misma mente y en un mismo parecer", ["Que formen dos iglesias", "Que elijan al más famoso", "Que dejen de congregarse"], "«sino que estéis perfectamente unidos en una misma mente y en un mismo parecer».", "1 Corintios 1:10"],
      ["m1-11", 2, "o2", "analizar", "¿Por qué muchos estudiosos dan tanto valor a 1 Corintios 15:3-4?", "Porque lo ven como uno de los resúmenes más antiguos de la fe de la iglesia", ["Porque es un poema", "Porque lo escribió Pedro", "Porque habla del milenio"], "«Porque primeramente os he enseñado lo que asimismo recibí».", "1 Corintios 15:3-4"],
      ["m1-12", 2, "o2", "evaluar", "¿Para quiénes era la ofrenda de 2 Corintios 8 y 9?", "Para los pobres de Jerusalén", ["Para construir un templo en Corinto", "Para pagarle a Pablo", "Para el emperador"], "«Cada uno dé como propuso en su corazón».", "2 Corintios 9:7"],
      ["m1-13", 3, "o3", "recordar", "¿Con quiénes parecen haber viajado Efesios, Colosenses y Filemón, según la lección?", "Con Tíquico y Onésimo", ["Con Pedro y Juan", "Con Bernabé y Marcos", "Con Priscila y Aquila"], "Pablo los menciona en Colosenses 4:7-9.", "Efesios 4:1-3"],
      ["m1-14", 3, "o3", "comprender", "¿Qué virtudes pide Pablo en Efesios 4:2?", "Humildad, mansedumbre y paciencia, soportándonos en amor", ["Orgullo y fuerza", "Silencio y aislamiento", "Riqueza y fama"], "«con toda humildad y mansedumbre, soportándoos con paciencia los unos a los otros en amor».", "Efesios 4:1-3"],
      ["m1-15", 3, "o3", "recordar", "¿Qué sentir pide Filipenses 2:5?", "El que hubo también en Cristo Jesús", ["El de los fariseos", "El del mundo", "El de los ángeles"], "«Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús».", "Filipenses 2:5-8"],
      ["m1-16", 3, "o3", "aplicar", "¿Qué aprende el líder del ejemplo de Cristo en Filipenses 2?", "A servir con humildad, sin aferrarse a su posición", ["A buscar los primeros lugares", "A exigir reconocimiento", "A evitar el sufrimiento"], "«el cual, siendo en forma de Dios, no estimó el ser igual a Dios como cosa a que aferrarse».", "Filipenses 2:5-8"],
      ["m1-17", 3, "o3", "comprender", "¿Qué significa que Cristo sea el primogénito de entre los muertos, según Colosenses 1:18?", "Que es el primero en resucitar para no morir más, para que en todo tenga la preeminencia", ["Que fue creado primero", "Que murió dos veces", "Que es un ángel"], "«el primogénito de entre los muertos, para que en todo tenga la preeminencia».", "Colosenses 1:15-18"],
      ["m1-18", 3, "o3", "evaluar", "¿Por qué la carta a Filemón importa a la iglesia de hoy?", "Porque muestra que en Cristo las diferencias sociales ceden ante la hermandad", ["Porque aprueba la esclavitud", "Porque es la carta más larga", "Porque no habla de Cristo"], "«no ya como esclavo, sino como más que esclavo, como hermano amado».", "Filemón 1:15-16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En cuánto tiempo fundó Pablo la iglesia de Tesalónica, según la lección?", "En pocas semanas", ["En diez años", "En un solo día", "Nunca la fundó"], "Pablo tuvo que salir pronto de la ciudad (Hechos 17:1-10).", "1 Tesalonicenses 1:9-10"],
      ["m2-02", 4, "o4", "comprender", "¿Qué hace la esperanza de la venida del Señor en el creyente, según la lección?", "Lo hace fiel y trabajador, no perezoso", ["Lo hace dejar el trabajo", "Lo llena de miedo", "Lo aparta de la gente"], "«Si alguno no quiere trabajar, tampoco coma».", "2 Tesalonicenses 3:10"],
      ["m2-03", 4, "o4", "recordar", "¿Qué no debía pasar con la juventud de Timoteo, según 1 Timoteo 4:12?", "Que alguien la tuviera en poco", ["Que la usara para servir", "Que fuera ejemplo", "Que enseñara"], "«Ninguno tenga en poco tu juventud».", "1 Timoteo 4:12"],
      ["m2-04", 4, "o4", "aplicar", "¿Cómo aplica el líder 2 Timoteo 2:2 en su iglesia?", "Forma a personas fieles que puedan enseñar a otros", ["Hace todo él solo", "Enseña solo a su familia", "Deja que cada uno aprenda solo"], "«Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles».", "2 Timoteo 2:2"],
      ["m2-05", 4, "o4", "analizar", "¿Qué muestra 2 Timoteo 4:8 sobre la recompensa?", "Que la corona de justicia es para Pablo y para todos los que aman la venida del Señor", ["Que la corona es solo para Pablo", "Que no hay recompensa", "Que la corona se compra"], "«y no sólo a mí, sino también a todos los que aman su venida».", "2 Timoteo 4:7-8"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál es la base de todo el ministerio, según la lección?", "La Escritura inspirada por Dios", ["La experiencia personal", "La tradición de cada iglesia", "La opinión de la mayoría"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16-17"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hizo Dios por medio del Hijo, según Hebreos 1:2?", "Hizo el universo", ["Escribió la ley", "Destruyó el mundo", "Puso a los ángeles a gobernarnos"], "«y por quien asimismo hizo el universo».", "Hebreos 1:1-2"],
      ["m2-08", 5, "o5", "comprender", "¿A quiénes parece dirigida la carta a los Hebreos, según la lección?", "A creyentes de origen judío", ["A los gentiles de Roma", "A los ancianos de Éfeso", "A los reyes de la tierra"], "«Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas».", "Hebreos 1:1-2"],
      ["m2-09", 5, "o5", "recordar", "¿Qué es imposible sin fe, según Hebreos 11:6?", "Agradar a Dios", ["Trabajar", "Hablar", "Comer"], "«Pero sin fe es imposible agradar a Dios».", "Hebreos 11:6"],
      ["m2-10", 5, "o5", "aplicar", "Alguien dice que tiene fe, pero su vida no cambió. ¿Qué le dice Santiago 2:18?", "Que la fe verdadera se muestra por las obras", ["Que basta con decir que cree", "Que las obras no importan", "Que se salva por sus obras"], "«Muéstrame tu fe sin tus obras, y yo te mostraré mi fe por mis obras».", "Santiago 2:17-18"],
      ["m2-11", 5, "o5", "analizar", "¿Qué tuvo Lutero sobre la carta de Santiago, según la lección?", "Dudas, aunque la iglesia la recibió como parte de la Escritura", ["La escribió él", "La prohibió en las iglesias", "La puso por encima de Romanos"], "«la fe, si no tiene obras, es muerta en sí misma».", "Santiago 2:17-18"],
      ["m2-12", 5, "o5", "evaluar", "¿A quiénes animaba 1 Pedro, según la lección?", "A creyentes que sufrían", ["A los que perseguían a la iglesia", "A los gobernantes", "A los falsos maestros"], "«Bendito el Dios y Padre de nuestro Señor Jesucristo, que según su grande misericordia nos hizo renacer para una esperanza viva».", "1 Pedro 1:3"],
      ["m2-13", 6, "o6", "recordar", "¿Por qué estaba Juan en Patmos, según Apocalipsis 1:9?", "Por causa de la palabra de Dios y el testimonio de Jesucristo", ["De vacaciones", "Porque vivía allí desde niño", "Para fundar una iglesia"], "«por causa de la palabra de Dios y el testimonio de Jesucristo».", "Apocalipsis 1:9"],
      ["m2-14", 6, "o6", "comprender", "¿Qué tiene Cristo, según Apocalipsis 1:18?", "Las llaves de la muerte y del Hades", ["Una corona de espinas", "Un libro cerrado para siempre", "Un trono vacío"], "«Y tengo las llaves de la muerte y del Hades».", "Apocalipsis 1:17-18"],
      ["m2-15", 6, "o6", "recordar", "¿De dónde son los redimidos por el Cordero, según Apocalipsis 5:9?", "De todo linaje y lengua y pueblo y nación", ["Solo de Israel", "Solo de Roma", "Solo de Asia"], "«y con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación».", "Apocalipsis 5:9-10"],
      ["m2-16", 6, "o6", "aplicar", "¿Por dónde empieza el líder a enseñar el Apocalipsis, según la nota?", "Por lo que es claro: la gloria de Cristo, la fidelidad, el juicio y la esperanza", ["Por calcular fechas", "Por identificar a personas de hoy con los símbolos", "Por los detalles más difíciles"], "«Bienaventurado el que lee».", "Apocalipsis 1:1-3"],
      ["m2-17", 6, "o6", "analizar", "¿Qué enseña la lectura historicista?", "Que describe la historia de la iglesia desde el siglo I hasta la venida de Cristo", ["Que todo se cumplió en el siglo I", "Que todo es futuro", "Que solo presenta principios"], "La siguieron muchos reformadores.", "Apocalipsis 11:15"],
      ["m2-18", 6, "o6", "evaluar", "¿Dónde se estudian el arrebatamiento y el milenio, según la lección?", "En Teología sistemática IV, y son un punto de la declaración de fe por confirmar", ["En ninguna materia", "Solo en el Nivel 1", "En Historia de la iglesia I"], "«Ciertamente vengo en breve».", "Apocalipsis 22:20"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-epistolas-apocalipsis-e1",
      tipo: "corta",
      pregunta: "Explica el tema central de Romanos y el problema que Pablo enfrentó en Gálatas.",
      ideas: [
        { id: "romanos", peso: 30, texto: "Romanos: el evangelio es poder de Dios, y Dios justifica por gracia a todo el que cree.", formas: ["poder de dios", "justifica*", "por la fe", "el justo por la fe", "por gracia", "gratuitamente"] },
        { id: "galatas", peso: 30, texto: "En Gálatas algunos exigían la circuncisión y la ley para ser salvos.", formas: ["circuncid*", "la ley", "judaizantes", "evangelio diferente", "otro evangelio"] },
        { id: "respuesta", peso: 30, texto: "Pablo responde que no hay otro evangelio y llama a la libertad en Cristo.", formas: ["no hay otro", "no que haya otro", "libertad", "libres", "solo por gracia", "fruto del espiritu"] },
      ],
      citas: ["Romanos 1:16-17", "Romanos 1:16", "Romanos 1:17", "Romanos 3:23-24", "Romanos 3:24", "Gálatas 1:6-7", "Gálatas 1:6", "Gálatas 5:1", "Gálatas 2:16"],
      pesoCita: 10,
      errores: [{ id: "por_obras", anula: "romanos", texto: "La justificación no es por las obras de la ley, sino por la fe (Romanos 3:28).", formas: ["por las obras", "por nuestras obras", "por buenas obras"] }],
      modelo:
        "Romanos enseña que el evangelio es poder de Dios: Dios justifica gratuitamente por su gracia a todo el que cree, porque el justo por la fe vivirá (Romanos 1:17). En Gálatas, algunos exigían la circuncisión y la ley para ser salvos, y Pablo respondió que no hay otro evangelio y llamó a vivir firmes en la libertad de Cristo.",
    },
    {
      id: "n4-epistolas-apocalipsis-e2",
      tipo: "corta",
      pregunta: "Explica qué problemas tenía la iglesia de Corinto y cómo los enfrentó Pablo.",
      ideas: [
        { id: "problemas", peso: 30, texto: "Divisiones, inmoralidad, pleitos, desorden en el culto y dudas sobre la resurrección.", formas: ["division*", "inmoralidad", "pleitos", "desorden", "negaban la resurreccion", "dudas sobre la resurreccion"] },
        { id: "amor", peso: 30, texto: "Pablo puso el amor por encima de los dones.", formas: ["amor", "sufrido", "benigno", "capitulo 13"] },
        { id: "evangelio", peso: 30, texto: "Les recordó el evangelio: la muerte y la resurrección de Cristo.", formas: ["resucito", "resurreccion de cristo", "murio por nuestros pecados", "la cruz", "el evangelio"] },
      ],
      citas: ["1 Corintios 1:10", "1 Corintios 1:12", "1 Corintios 13:4-7", "1 Corintios 13:4", "1 Corintios 15:3-4", "1 Corintios 15:3", "2 Corintios 5:18-20", "2 Corintios 12:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En Corinto había divisiones, inmoralidad, pleitos entre hermanos y desorden en el culto, y algunos negaban la resurrección. Pablo les rogó que estuvieran unidos (1 Corintios 1:10), puso el amor por encima de los dones y les recordó el evangelio: Cristo murió por nuestros pecados y resucitó al tercer día.",
    },
    {
      id: "n4-epistolas-apocalipsis-e3",
      tipo: "corta",
      pregunta: "Nombra las cartas de la prisión y explica el mensaje de Efesios y de Filipenses.",
      ideas: [
        { id: "cartas", peso: 30, texto: "Efesios, Filipenses, Colosenses y Filemón.", formas: ["colosenses", "filemon", "cuatro cartas"] },
        { id: "efesios", peso: 30, texto: "Efesios: la salvación por gracia y la iglesia como cuerpo de Cristo, llamada a la unidad.", formas: ["por gracia", "cuerpo de cristo", "unidad", "buenas obras", "armadura"] },
        { id: "filipenses", peso: 30, texto: "Filipenses: el gozo en el Señor y la humildad de Cristo.", formas: ["gozo", "regocijaos", "humildad", "se humillo", "se despojo", "forma de siervo"] },
      ],
      citas: ["Efesios 2:8-10", "Efesios 2:8", "Efesios 4:1-3", "Efesios 4:3", "Filipenses 2:5-8", "Filipenses 2:5", "Filipenses 4:4", "Colosenses 1:15-18", "Filemón 1:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Las cartas de la prisión son Efesios, Filipenses, Colosenses y Filemón. Efesios enseña que somos salvos por gracia y que la iglesia es el cuerpo de Cristo, llamada a guardar la unidad. Filipenses es la carta del gozo, regocijaos en el Señor siempre (Filipenses 4:4), y presenta la humildad de Cristo, que tomó forma de siervo.",
    },
    {
      id: "n4-epistolas-apocalipsis-e4",
      tipo: "breve",
      pregunta: "Explica a un grupo de maestros cómo se armonizan Pablo y Santiago sobre la fe y las obras, con citas bíblicas.",
      ideas: [
        { id: "pablo", peso: 25, texto: "Pablo: la salvación es por gracia, por medio de la fe, no por obras.", formas: ["por la fe", "por gracia", "no por obras", "sin las obras", "justificado por fe"] },
        { id: "santiago", peso: 25, texto: "Santiago: la fe sin obras es muerta.", formas: ["fe sin obras", "si no tiene obras", "no tiene obras", "es muerta", "esta muerta", "fe muerta", "muerta en si misma"] },
        { id: "armonia", peso: 35, texto: "No se contradicen: las obras no son la base de la justificación, pero la fe verdadera se muestra con obras.", formas: ["no se contradicen", "no contradice", "se muestra", "mostrare mi fe", "fruto", "evidencia", "complementan"] },
        { id: "creados", peso: 15, texto: "Fuimos creados en Cristo para buenas obras.", formas: ["buenas obras", "hechura suya"] },
      ],
      basta: 85,
      citas: ["Santiago 2:17-18", "Santiago 2:17", "Santiago 2:18", "Efesios 2:8-10", "Efesios 2:8", "Efesios 2:10", "Romanos 3:28", "Gálatas 2:16", "Romanos 3:24"],
      pesoCita: 10,
      errores: [{ id: "salvos_por_obras", anula: "pablo", texto: "La salvación no es por obras: es por gracia, por medio de la fe (Efesios 2:8-9).", formas: ["salvos por obras", "salvos por nuestras obras", "nos salvan las obras", "por las obras somos salvos"] }],
      modelo:
        "Hermanos, Pablo y Santiago no se contradicen. Pablo enseña que somos salvos por gracia por medio de la fe, no por obras (Efesios 2:8-9): las obras nunca son la base de nuestra justificación. Santiago habla de otra cosa, de una fe que solo es palabras. Por eso dice que la fe, si no tiene obras, es muerta en sí misma, y que él mostrará su fe por sus obras (Santiago 2:18). Las obras no nos salvan, pero la fe verdadera se muestra con obras. Pablo mismo lo dice: somos hechura suya, creados en Cristo Jesús para buenas obras. La fe que salva nunca se queda sola.",
    },
    {
      id: "n4-epistolas-apocalipsis-e5",
      tipo: "breve",
      pregunta:
        "Un joven líder te pide consejo para estudiar y enseñar el Apocalipsis. Explícale con respeto las cuatro maneras de leerlo, su mensaje central y lo que debe evitar, con citas bíblicas.",
      ideas: [
        { id: "lecturas", peso: 30, texto: "Las lecturas preterista, historicista, futurista e idealista.", formas: ["preterista", "historicista", "futurista", "idealista"] },
        { id: "mensaje", peso: 30, texto: "El mensaje central: el Cordero es digno y Cristo vence.", formas: ["cristo vence", "el cordero", "digno", "reinara", "los reinos del mundo", "ven senor jesus"] },
        { id: "evitar", peso: 20, texto: "Evitar poner fechas o identificar a personas de hoy con los símbolos.", negativa: true, formas: ["poner fecha", "poner fechas", "pongas fecha", "pongas fechas", "la fecha", "fecha del fin", "calcular", "identificar", "especular"] },
        { id: "confirmar", peso: 10, texto: "El milenio y el arrebatamiento son un punto por confirmar.", formas: ["por confirmar", "declaracion de fe", "sistematica iv"] },
        { id: "genero", peso: 10, texto: "Es profecía, carta y apocalipsis, en visiones y símbolos.", formas: ["simbolos", "visiones", "profecia", "siete iglesias", "patmos"] },
      ],
      basta: 85,
      citas: ["Apocalipsis 1:1-3", "Apocalipsis 1:3", "Apocalipsis 1:9", "Apocalipsis 1:17-18", "Apocalipsis 5:9-10", "Apocalipsis 5:9", "Apocalipsis 11:15", "Apocalipsis 22:20", "Apocalipsis 19:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Te recomiendo leerlo con humildad. Hay cuatro maneras principales de interpretarlo: la preterista ve cumplida la mayor parte en el siglo I; la historicista ve en él la historia de la iglesia; la futurista lo lee, desde el capítulo 4, como los acontecimientos del fin; y la idealista ve la lucha de todos los tiempos entre el reino de Dios y el mal. Es profecía, carta y apocalipsis, con visiones y símbolos. Su mensaje central es claro: el Cordero es digno, porque con su sangre nos redimió (Apocalipsis 5:9), y Cristo vence. Evita poner fechas o identificar a personas de hoy con los símbolos. El milenio y el arrebatamiento son un punto de la declaración de fe por confirmar.",
    },
  ],
  breve: {
    id: "n4-epistolas-apocalipsis-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo presentarías a un grupo de nuevos líderes un panorama de las epístolas y del Apocalipsis: los grupos de cartas, el mensaje de cada grupo y lo que enseñan para el ministerio, con citas bíblicas.",
    ideas: [
      { id: "pablo", peso: 25, texto: "Las cartas de Pablo: Romanos y Gálatas, Corintios, las de la prisión, Tesalonicenses y las pastorales.", formas: ["romanos", "galatas", "corintios", "efesios", "pastorales", "timoteo", "tesalonicenses", "cartas de pablo"] },
      { id: "generales", peso: 20, texto: "Hebreos y las cartas generales: Santiago, Pedro, Juan y Judas.", formas: ["hebreos", "santiago", "pedro", "judas", "cartas generales"] },
      { id: "apocalipsis", peso: 20, texto: "El Apocalipsis: el Cordero es digno y Cristo vence.", formas: ["cristo vence", "el cordero", "ven senor jesus", "reinara", "digno"] },
      { id: "gracia", peso: 20, texto: "El evangelio de la gracia y la fe que se muestra con obras.", formas: ["por gracia", "por la fe", "justifica*", "fe verdadera", "con obras"] },
      { id: "ministerio", peso: 15, texto: "Para el ministerio: la sana doctrina, formar a otros y servir en la debilidad.", formas: ["sana doctrina", "hombres fieles", "ensenen a otros", "debilidad", "con humildad", "con la palabra"] },
    ],
    basta: 85,
    citas: ["Hebreos 1:1-2", "Romanos 1:16-17", "Romanos 1:16", "Romanos 1:17", "Gálatas 5:1", "1 Corintios 13:4-7", "2 Corintios 12:9", "Efesios 2:8-10", "Efesios 2:8", "Filipenses 4:4", "2 Timoteo 2:2", "2 Timoteo 3:16-17", "2 Timoteo 3:16", "Santiago 2:17", "Judas 1:3", "Apocalipsis 22:20", "Apocalipsis 5:9", "Apocalipsis 11:15"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Les mostraría primero las cartas de Pablo. Romanos y Gálatas enseñan el evangelio de la gracia: el justo por la fe vivirá (Romanos 1:17). Las cartas a los Corintios muestran una iglesia con dones y problemas, corregida con amor. Las cartas de la prisión, como Efesios y Filipenses, hablan de la iglesia como cuerpo de Cristo y del gozo en la prueba. Tesalonicenses y las pastorales enseñan a esperar al Señor trabajando, la sana doctrina y a encargar lo aprendido a hombres fieles que enseñen a otros (2 Timoteo 2:2). Luego, Hebreos muestra que Cristo es superior, Santiago que la fe verdadera se muestra con obras, y Pedro, Juan y Judas animan a esperar y a defender la fe. Al final, el Apocalipsis proclama que el Cordero es digno y que Cristo vence. Para el ministerio, todo esto pide servir con la Palabra, con humildad y con esperanza.",
  },
};
