/**
 * El banco de «La oración en los avivamientos» (especialidad Intercesión y oración). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es un avivamiento · o2 los avivamientos en la Biblia · o3 los moravos · o4 los despertares ·
 * o5 Gales, Azusa, Corea y Chile · o6 orar por avivamiento hoy · o7 el versículo de memoria (2 Crónicas 7:14).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `intercesion-5-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_INTERCESION_5: BancoMateria = {
  materia: "intercesion-5",
  repaso: {
    "intercesion-5-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué le pidió Habacuc a Dios en tiempos difíciles?", "Que avivara su obra en medio de los tiempos", ["Que destruyera a los enemigos", "Que le diera riquezas", "Que lo sacara de la tierra"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
      ["1-r2", 1, "o1", "comprender", "¿Con quiénes habita Dios, según Isaías 57:15?", "Con el quebrantado y humilde de espíritu", ["Con los orgullosos", "Solo con los sacerdotes", "Con los que tienen fama"], "«y con el quebrantado y humilde de espíritu, para hacer vivir el espíritu de los humildes».", "Isaías 57:15"],
      ["1-r3", 1, "o1", "aplicar", "Una iglesia quiere producir un avivamiento con más música y más emoción. ¿Qué le enseña la lección?", "Que el avivamiento no se fabrica: Dios lo da, y su pueblo lo busca con humildad y oración", ["Que tiene razón", "Que basta con subir el volumen", "Que hay que programarlo en el calendario"], "«Oh Jehová, aviva tu obra».", "Habacuc 3:2"],
    ] as P[]).map(p),
    "intercesion-5-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué cuatro cosas pide Dios a su pueblo en 2 Crónicas 7:14?", "Humillarse, orar, buscar su rostro y convertirse de sus malos caminos", ["Ayunar, cantar, ofrendar y viajar", "Construir, pelear, conquistar y gobernar", "Callar, esperar, dormir y olvidar"], "«Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos».", "2 Crónicas 7:13-14"],
      ["2-r2", 2, "o2", "comprender", "¿Cómo se aplica hoy la promesa de 2 Crónicas 7:14, según la lección?", "Como un principio: Dios responde cuando su pueblo se humilla, ora, lo busca y se aparta del pecado", ["Como una promesa de que cada país será rico", "Como algo que ya no tiene valor", "Como una fórmula que obliga a Dios"], "«entonces yo oiré desde los cielos, y perdonaré sus pecados».", "2 Crónicas 7:13-14"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué hacían los discípulos antes de Pentecostés?", "Perseveraban unánimes en oración y ruego", ["Discutían quién era el mayor", "Esperaban sin hacer nada", "Volvían a pescar"], "«Todos éstos perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
    ] as P[]).map(p),
    "intercesion-5-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Dónde vivieron los moravos que empezaron la vigilia de oración?", "En Herrnhut, en las tierras del conde de Zinzendorf", ["En Ginebra", "En Roma", "En Jerusalén"], "Eran creyentes perseguidos de Moravia que llegaron a Sajonia.", "Isaías 62:6-7"],
      ["3-r2", 3, "o3", "comprender", "¿Cómo era la vigilia de oración que empezaron en agosto de 1727?", "Por turnos, una hora cada uno, de día y de noche", ["Una sola noche al año", "Solo los domingos", "Una vez al mes"], "«todo el día y toda la noche no callarán jamás».", "Isaías 62:6-7"],
      ["3-r3", 3, "o3", "aplicar", "¿A qué llevó la oración de los moravos?", "Al envío de misioneros a muchas partes del mundo", ["A cerrar su aldea", "A dejar de evangelizar", "A pelear entre ellos"], "«Rogad, pues, al Señor de la mies, que envíe obreros a su mies».", "Mateo 9:37-38"],
    ] as P[]).map(p),
    "intercesion-5-4": ([
      ["4-r1", 4, "o4", "recordar", "¿A qué llamó Jonathan Edwards en 1747?", "A que los cristianos de distintos lugares se pusieran de acuerdo para orar juntos por un derramamiento del Espíritu", ["A dejar de orar", "A construir templos más grandes", "A separarse de las otras iglesias"], "«Vamos a implorar el favor de Jehová, y a buscar a Jehová de los ejércitos».", "Zacarías 8:20-22"],
      ["4-r2", 4, "o4", "comprender", "¿Qué pasó junto a un pajar en 1806?", "Cinco estudiantes oraron por las naciones, y de allí salió después una gran sociedad de misiones", ["Se fundó una universidad", "Hubo una guerra", "Se escribió un himno"], "Fue en Massachusetts, en el Williams College, durante una tormenta.", "Mateo 9:37-38"],
      ["4-r3", 4, "o4", "aplicar", "¿Cuántas personas llegaron el primer día a la oración del mediodía de la calle Fulton, en 1857?", "Seis", ["Mil", "Ninguna", "Cien"], "Pocos meses después, miles oraban al mediodía en muchas ciudades.", "Mateo 18:19-20"],
    ] as P[]).map(p),
    "intercesion-5-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Quién fue el joven que oró por años antes del avivamiento de Gales de 1904?", "Evan Roberts", ["William Carey", "Jonathan Edwards", "Juan Wesley"], "Había trabajado en las minas de carbón y se preparaba para el ministerio.", "Santiago 5:16-18"],
      ["5-r2", 5, "o5", "comprender", "¿Qué pasó en Pyongyang en enero de 1907?", "Los creyentes confesaron sus pecados en público, y el avivamiento se extendió por Corea", ["Se cerraron las iglesias", "Llegaron los primeros misioneros", "Se tradujo la primera Biblia"], "«Confesaos vuestras ofensas unos a otros».", "Santiago 5:16-18"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué hizo la iglesia de Valparaíso antes del avivamiento de 1909?", "Oró por años pidiendo un derramamiento del Espíritu", ["Cerró sus puertas", "Dejó de reunirse", "Esperó sin orar"], "El pastor era Willis C. Hoover; ese año nació la Iglesia Metodista Pentecostal.", "Hechos 2:16-18"],
    ] as P[]).map(p),
    "intercesion-5-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pidió la iglesia cuando fue amenazada, en Hechos 4:29?", "Que con todo denuedo hablaran la palabra de Dios", ["Que se acabaran las amenazas", "Que castigaran a los enemigos", "Que les dieran un lugar seguro"], "«y concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
      ["6-r2", 6, "o6", "comprender", "¿Cómo se reconoce un avivamiento verdadero, según Mateo 7:16?", "Por sus frutos", ["Por el ruido", "Por la fama", "Por las emociones"], "«Por sus frutos los conoceréis».", "Mateo 7:16-20"],
      ["6-r3", 6, "o6", "aplicar", "En una reunión todo parece emocionante, pero no hay cambio de vida. ¿Qué enseña 1 Tesalonicenses 5:21?", "Que hay que examinarlo todo y retener lo bueno", ["Que hay que aceptarlo todo", "Que hay que rechazarlo todo", "Que no importa"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:19-21"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · ¿Qué es un avivamiento?
    ["f01", 1, "o1", "comprender", "¿Qué es un avivamiento, según la lección?", "Una obra de Dios que renueva a su pueblo con una fuerza poco común", ["Una campaña que se organiza", "Un culto muy emotivo", "Una semana de reuniones"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
    ["f02", 1, "o1", "recordar", "¿Qué le pide el salmista a Dios en Salmos 85:6?", "Que vuelva a darles vida, para que su pueblo se regocije en él", ["Que les dé riquezas", "Que destruya a sus enemigos", "Que los saque de la tierra"], "«¿No volverás a darnos vida, Para que tu pueblo se regocije en ti?».", "Salmos 85:6"],
    ["f03", 1, "o1", "comprender", "¿Dónde empieza un avivamiento, según la lección?", "En el pueblo de Dios, que vuelve a la vida espiritual", ["En el gobierno", "En los medios de comunicación", "En los que no creen"], "«¿No volverás a darnos vida».", "Salmos 85:6"],
    ["f04", 1, "o1", "recordar", "¿Para qué habita Dios con el quebrantado y humilde, según Isaías 57:15?", "Para hacer vivir el espíritu de los humildes", ["Para castigarlo", "Para hacerlo famoso", "Para alejarlo de los demás"], "«para hacer vivir el espíritu de los humildes, y para vivificar el corazón de los quebrantados».", "Isaías 57:15"],
    ["f05", 1, "o1", "analizar", "¿Por qué los avivamientos empiezan casi siempre con humildad y quebranto?", "Porque Dios habita con el quebrantado y humilde de espíritu", ["Porque Dios prefiere la tristeza", "Porque los fuertes no lo necesitan", "Porque así lo ordena la tradición"], "«y con el quebrantado y humilde de espíritu».", "Isaías 57:15"],
    ["f06", 1, "o1", "recordar", "¿De qué convencerá al mundo el Espíritu Santo, según Juan 16:8?", "De pecado, de justicia y de juicio", ["De riqueza, de fama y de poder", "De miedo, de culpa y de tristeza", "De ciencia, de arte y de historia"], "«convencerá al mundo de pecado, de justicia y de juicio».", "Juan 16:8"],
    ["f07", 1, "o1", "comprender", "¿Cuál de estas es una señal que se repite en los avivamientos?", "Una conciencia fuerte del pecado y de la santidad de Dios", ["El aumento de las ofrendas", "La construcción de templos", "La fama de un predicador"], "«convencerá al mundo de pecado».", "Juan 16:8"],
    ["f08", 1, "o1", "evaluar", "¿Qué frase describe mejor un avivamiento verdadero?", "Trae confesión, hambre de la Palabra, amor entre los hermanos y celo por la misión", ["Trae solo emociones fuertes", "Trae fama a una iglesia", "Trae reuniones más largas"], "«para vivificar el corazón de los quebrantados».", "Isaías 57:15"],
    ["f09", 1, "o1", "evaluar", "¿Se puede fabricar un avivamiento con música, emociones o técnicas?", "No: Dios lo da, y su pueblo lo busca con humildad y oración", ["Sí, con la música adecuada", "Sí, con buena publicidad", "Sí, con un buen predicador"], "«Oh Jehová, aviva tu obra».", "Habacuc 3:2"],
    ["f10", 1, "o7", "recordar", "Completa 2 Crónicas 7:14: Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro…", "y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra", ["y cantaren con fuerza; entonces yo les daré riquezas", "y construyeren un templo; entonces yo los haré famosos", "y ayunaren cuarenta días; entonces nunca sufrirán"], "«y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra».", "2 Crónicas 7:14"],
    // Lección 2 · Avivamientos en la Biblia
    ["f11", 2, "o2", "recordar", "¿Qué promete Dios en 2 Crónicas 7:14 si su pueblo se humilla y ora?", "Oír desde los cielos, perdonar sus pecados y sanar su tierra", ["Darles un rey nuevo", "Quitarles todo problema", "Hacerlos ricos"], "«entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra».", "2 Crónicas 7:13-14"],
    ["f12", 2, "o2", "analizar", "¿Por qué hay que leer con cuidado la promesa de 2 Crónicas 7:14?", "Porque fue dada a Israel, en el contexto del templo y de su tierra, y hoy se aplica como principio", ["Porque no es parte de la Biblia", "Porque ya no sirve para nada", "Porque garantiza riqueza a cada país"], "«Si se humillare mi pueblo, sobre el cual mi nombre es invocado».", "2 Crónicas 7:13-14"],
    ["f13", 2, "o2", "recordar", "¿Qué dice 2 Crónicas 30:27 de la oración del pueblo en tiempos de Ezequías?", "Que llegó a la habitación de su santuario, al cielo", ["Que no fue oída", "Que se quedó en el templo", "Que fue rechazada"], "«y su oración llegó a la habitación de su santuario, al cielo».", "2 Crónicas 30:27"],
    ["f14", 2, "o2", "recordar", "¿Qué respondió el pueblo cuando Esdras abrió el libro de la ley?", "¡Amén! ¡Amén!, alzando sus manos, y adoraron inclinados a tierra", ["Se fueron a sus casas", "Se rieron", "Pidieron otra cosa"], "«Y todo el pueblo respondió: ¡Amén! ¡Amén! alzando sus manos».", "Nehemías 8:5-6"],
    ["f15", 2, "o2", "comprender", "¿Qué hicieron los israelitas reunidos en ayuno, según Nehemías 9:2?", "Confesaron sus pecados y las iniquidades de sus padres", ["Celebraron una fiesta", "Eligieron un rey", "Volvieron a Babilonia"], "«y estando en pie, confesaron sus pecados, y las iniquidades de sus padres».", "Nehemías 9:1-3"],
    ["f16", 2, "o2", "analizar", "¿Qué orden muestra Nehemías 9:3?", "La Palabra llevó a la confesión, y la confesión a la adoración", ["La fiesta llevó a la guerra", "La adoración reemplazó la Palabra", "La confesión no tuvo lugar"], "«leyeron el libro de la ley de Jehová su Dios la cuarta parte del día, y la cuarta parte confesaron sus pecados y adoraron».", "Nehemías 9:1-3"],
    ["f17", 2, "o2", "recordar", "¿Con quiénes perseveraban en oración los discípulos, según Hechos 1:14?", "Con las mujeres, con María la madre de Jesús y con sus hermanos", ["Con los fariseos", "Con los soldados romanos", "Solo entre los doce"], "«con las mujeres, y con María la madre de Jesús, y con sus hermanos».", "Hechos 1:14"],
    ["f18", 2, "o2", "recordar", "¿Cómo estaban los discípulos cuando llegó el día de Pentecostés?", "Todos unánimes juntos", ["Separados y con miedo", "Discutiendo", "Dormidos"], "«Cuando llegó el día de Pentecostés, estaban todos unánimes juntos».", "Hechos 2:1-4"],
    ["f19", 2, "o2", "recordar", "¿Cuántas personas se añadieron el día de Pentecostés?", "Como tres mil", ["Como doce", "Como cien", "Como cinco mil"], "«y se añadieron aquel día como tres mil personas».", "Hechos 2:41-42"],
    ["f20", 2, "o2", "evaluar", "¿Qué muestra Hechos 2:42 sobre el avivamiento de Pentecostés?", "Que siguió en una iglesia que perseveraba en la doctrina, la comunión, el pan y las oraciones", ["Que terminó ese mismo día", "Que la iglesia dejó de orar", "Que solo importaron las emociones"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:41-42"],
    // Lección 3 · Los moravos
    ["f21", 3, "o3", "recordar", "¿Quién recibió en sus tierras de Sajonia a los creyentes perseguidos de Moravia?", "El conde Nicolás de Zinzendorf", ["Martín Lutero", "Juan Calvino", "Jorge Whitefield"], "Juntos fundaron la aldea de Herrnhut.", "Isaías 62:6-7"],
    ["f22", 3, "o3", "comprender", "¿Qué pasó en Herrnhut antes del avivamiento de 1727?", "Hubo divisiones, y después un tiempo de oración y reconciliación", ["Hubo una guerra", "Se cerró la aldea", "Nada especial"], "«donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos».", "Mateo 18:19-20"],
    ["f23", 3, "o3", "recordar", "¿En qué culto vivieron los moravos su avivamiento del 13 de agosto de 1727?", "En un culto de Santa Cena", ["En un bautismo", "En una boda", "En un funeral"], "Muchos lo llaman el Pentecostés moravo.", "Mateo 18:19-20"],
    ["f24", 3, "o3", "recordar", "¿Cuántos hombres y cuántas mujeres empezaron la vigilia de oración el 27 de agosto de 1727?", "Veinticuatro hombres y veinticuatro mujeres", ["Doce hombres y doce mujeres", "Siete hombres y siete mujeres", "Cien hombres y cien mujeres"], "Se comprometieron a orar por turnos, una hora cada uno.", "Isaías 62:6-7"],
    ["f25", 3, "o3", "comprender", "¿Cuánto duró la vigilia de oración de los moravos, según la mayoría de las fuentes?", "Unos cien años", ["Una semana", "Un año", "Diez años"], "«todo el día y toda la noche no callarán jamás».", "Isaías 62:6-7"],
    ["f26", 3, "o3", "analizar", "¿Qué enseña Isaías 62:6-7 sobre la oración perseverante?", "Que Dios invita a orar sin darle tregua, de día y de noche", ["Que orar mucho cansa a Dios", "Que hay que orar una sola vez", "Que solo oran los profetas"], "«Los que os acordáis de Jehová, no reposéis, ni le deis tregua».", "Isaías 62:6-7"],
    ["f27", 3, "o3", "recordar", "¿Cuándo salieron los primeros misioneros moravos hacia el Caribe?", "En 1732", ["En 1517", "En 1906", "En 1857"], "«Rogad, pues, al Señor de la mies, que envíe obreros a su mies».", "Mateo 9:37-38"],
    ["f28", 3, "o3", "aplicar", "¿Qué hicieron los moravos además de orar por obreros?", "Fueron ellos mismos como misioneros", ["Esperaron a que fueran otros", "Dejaron de orar", "Se quedaron en su aldea"], "«Rogad, pues, al Señor de la mies, que envíe obreros a su mies».", "Mateo 9:37-38"],
    ["f29", 3, "o3", "comprender", "¿A quién influyeron los moravos, que después fue una gran voz del avivamiento en Inglaterra?", "A Juan Wesley", ["A Martín Lutero", "A Juan Calvino", "A William Seymour"], "Wesley los conoció en un viaje a América, y en 1738 tuvo en Londres la experiencia que cambió su vida.", "Mateo 18:19-20"],
    ["f30", 3, "o3", "evaluar", "¿Qué lección deja la historia de los moravos?", "Que la oración perseverante y organizada lleva a la misión", ["Que la oración no cambia nada", "Que hay que orar solo una vez", "Que las misiones no necesitan oración"], "«Rogad, pues, al Señor de la mies».", "Mateo 9:37-38"],
    // Lección 4 · Los despertares
    ["f31", 4, "o4", "recordar", "¿Dónde era pastor Jonathan Edwards?", "En Northampton, en Nueva Inglaterra", ["En Londres", "En Ginebra", "En Los Ángeles"], "Allí vio un avivamiento en 1734 y 1735.", "Zacarías 8:20-22"],
    ["f32", 4, "o4", "recordar", "¿Qué predicador participó también en el Gran Despertar de la década de 1740?", "Jorge Whitefield", ["Evan Roberts", "William Seymour", "Willis Hoover"], "«Aún vendrán pueblos, y habitantes de muchas ciudades».", "Zacarías 8:20-22"],
    ["f33", 4, "o4", "comprender", "¿En qué profecía basó Edwards su llamado a la oración unida?", "En Zacarías 8, donde los habitantes de una ciudad invitan a los de otra a implorar el favor de Jehová", ["En Génesis 1", "En Apocalipsis 21", "En Levítico 23"], "«Vamos a implorar el favor de Jehová, y a buscar a Jehová de los ejércitos. Yo también iré».", "Zacarías 8:20-22"],
    ["f34", 4, "o4", "recordar", "¿Qué misionero salió en 1793 hacia la India después de las reuniones de oración de los bautistas ingleses?", "Guillermo Carey", ["Jonathan Edwards", "Juan Wesley", "Evan Roberts"], "Los pastores bautistas organizaron reuniones mensuales de oración por el avivamiento y por las naciones.", "Mateo 9:37-38"],
    ["f35", 4, "o4", "analizar", "¿Qué muestra la historia de Carey sobre la oración unida?", "Que la oración por el avivamiento y por las naciones prepara la misión", ["Que la oración no tiene que ver con la misión", "Que solo importa el dinero", "Que la misión no necesita oración"], "«Vamos a implorar el favor de Jehová».", "Zacarías 8:20-22"],
    ["f36", 4, "o4", "recordar", "¿Qué hicieron cinco estudiantes junto a un pajar en 1806?", "Oraron por las naciones durante una tormenta", ["Escribieron un libro", "Fundaron una iglesia", "Hicieron una fiesta"], "Fue en Massachusetts, en el Williams College.", "Mateo 9:37-38"],
    ["f37", 4, "o4", "recordar", "¿Quién invitó a orar al mediodía en la calle Fulton, en 1857?", "Un comerciante llamado Jeremías Lanphier", ["Un rey", "Un famoso evangelista", "Un obispo"], "El primer día llegaron solo seis personas.", "Mateo 18:19-20"],
    ["f38", 4, "o4", "comprender", "¿Qué pasó con la oración del mediodía de la calle Fulton?", "Se multiplicó: pocos meses después, miles oraban al mediodía en muchas ciudades", ["Se terminó al primer día", "Nadie volvió", "La prohibieron"], "«Otra vez os digo, que si dos de vosotros se pusieren de acuerdo en la tierra».", "Mateo 18:19-20"],
    ["f39", 4, "o4", "analizar", "¿Qué orden muestra Salmos 51:10-13?", "Primero la renovación del corazón, y después la conversión de los pecadores", ["Primero la fama, y después la oración", "Primero los pecadores, y después Dios", "No hay ningún orden"], "«Entonces enseñaré a los transgresores tus caminos, Y los pecadores se convertirán a ti».", "Salmos 51:10-13"],
    ["f40", 4, "o4", "evaluar", "¿Qué tienen en común Edwards, Carey, el pajar y la calle Fulton?", "La oración unida, muchas veces pequeña y sencilla, preparó grandes movimientos", ["Todos fueron reyes", "Ninguno oró", "Todos vivieron en el mismo siglo y país"], "«donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos».", "Mateo 18:19-20"],
    // Lección 5 · Gales, Azusa, Corea y Chile
    ["f41", 5, "o5", "recordar", "¿En qué año comenzó el avivamiento de Gales?", "En 1904", ["En 1727", "En 1857", "En 1960"], "Evan Roberts había orado por años por un avivamiento.", "Santiago 5:16-18"],
    ["f42", 5, "o5", "comprender", "¿En qué insistía Evan Roberts?", "En confesar todo pecado conocido, apartarse de lo dudoso, obedecer pronto al Espíritu y confesar a Cristo en público", ["En cantar más fuerte", "En no confesar nada", "En hacer reuniones largas"], "«Confesaos vuestras ofensas unos a otros, y orad unos por otros».", "Santiago 5:16-18"],
    ["f43", 5, "o5", "recordar", "¿Qué dice Santiago 5:17 de Elías?", "Que era un hombre sujeto a pasiones semejantes a las nuestras y oró fervientemente", ["Que era un ángel", "Que nunca oró", "Que no tenía debilidades"], "«Elías era hombre sujeto a pasiones semejantes a las nuestras, y oró fervientemente».", "Santiago 5:16-18"],
    ["f44", 5, "o5", "recordar", "¿Quién dirigía las reuniones de oración que llevaron al avivamiento de la calle Azusa?", "William J. Seymour", ["Evan Roberts", "Willis C. Hoover", "Jeremías Lanphier"], "Empezaron en una casa de la calle Bonnie Brae, en Los Ángeles.", "Hechos 2:16-18"],
    ["f45", 5, "o5", "comprender", "¿Qué distinguió a la iglesia de la calle Azusa?", "Se reunieron personas de muchas razas y naciones", ["Era solo para ricos", "Era solo para una raza", "No se oraba"], "«Derramaré de mi Espíritu sobre toda carne».", "Hechos 2:16-18"],
    ["f46", 5, "o5", "recordar", "¿Qué promesa veían cumplirse los creyentes de Azusa?", "Derramaré de mi Espíritu sobre toda carne", ["Edificaré un templo nuevo", "Os daré una tierra", "Nunca sufriréis"], "«Y en los postreros días, dice Dios, Derramaré de mi Espíritu sobre toda carne».", "Hechos 2:16-18"],
    ["f47", 5, "o5", "recordar", "¿Qué empezaron a hacer los creyentes en Pyongyang en enero de 1907?", "Confesar sus pecados en público, con lágrimas", ["Construir un templo", "Votar a un líder", "Dejar de reunirse"], "«Confesaos vuestras ofensas unos a otros».", "Santiago 5:16-18"],
    ["f48", 5, "o5", "comprender", "¿Qué costumbre conserva hasta hoy la iglesia coreana?", "Orar juntos de madrugada", ["No orar en público", "Orar solo una vez al año", "Orar solo en la noche de Navidad"], "Muchos la asocian con Gil Seon-ju.", "Santiago 5:16-18"],
    ["f49", 5, "o5", "recordar", "¿Qué nació en Chile en 1909, después del avivamiento de Valparaíso?", "La Iglesia Metodista Pentecostal", ["La primera iglesia católica de Chile", "Una universidad", "Un partido político"], "El pastor era Willis C. Hoover, y la iglesia había orado desde 1907.", "Hechos 2:16-18"],
    ["f50", 5, "o5", "evaluar", "¿Qué tienen en común Gales, Azusa, Corea y Chile?", "La oración perseverante y la confesión sincera antes del avivamiento", ["Que pasaron en el mismo país", "Que no hubo oración", "Que solo hubo emociones"], "«muchos de los que habían creído venían, confesando y dando cuenta de sus hechos».", "Hechos 19:18"],
    // Lección 6 · Orar por avivamiento hoy
    ["f51", 6, "o6", "recordar", "¿Qué anhelo expresa Isaías 64:1?", "Que Dios rompiera los cielos y descendiera", ["Que Dios se alejara", "Que lloviera oro", "Que el pueblo durmiera"], "«¡Oh, si rompieses los cielos, y descendieras».", "Isaías 64:1"],
    ["f52", 6, "o6", "comprender", "¿Qué pasó cuando la iglesia terminó de orar, en Hechos 4:31?", "El lugar tembló, todos fueron llenos del Espíritu Santo y hablaban con denuedo la palabra de Dios", ["Todos se fueron con miedo", "No pasó nada", "Los arrestaron a todos"], "«Cuando hubieron orado, el lugar en que estaban congregados tembló; y todos fueron llenos del Espíritu Santo».", "Hechos 4:29-31"],
    ["f53", 6, "o6", "aplicar", "Tu iglesia sufre críticas en la ciudad. ¿Qué pedir, según Hechos 4:29?", "Valor para hablar la palabra de Dios con todo denuedo", ["Que se callen los críticos", "Que la iglesia se esconda", "Que Dios castigue a los que critican"], "«concede a tus siervos que con todo denuedo hablen tu palabra».", "Hechos 4:29-31"],
    ["f54", 6, "o6", "recordar", "¿Qué pregunta hace Jesús en Mateo 7:16 para enseñar a reconocer por los frutos?", "Si se recogen uvas de los espinos o higos de los abrojos", ["Si el sol sale de noche", "Si el agua sube a los montes", "Si los peces vuelan"], "«¿Acaso se recogen uvas de los espinos, o higos de los abrojos?».", "Mateo 7:16-20"],
    ["f55", 6, "o6", "comprender", "¿Cuál es el fruto del Espíritu, según Gálatas 5:22-23?", "Amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza", ["Fama, poder y riqueza", "Ruido, emoción y espectáculo", "Miedo, culpa y tristeza"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe».", "Gálatas 5:22-23"],
    ["f56", 6, "o6", "analizar", "¿Qué dos extremos evita la iglesia, según 1 Tesalonicenses 5:19-21?", "Apagar lo que Dios hace o aceptarlo todo sin examinarlo", ["Orar y leer la Biblia", "Cantar y ofrendar", "Servir y congregarse"], "«No apaguéis al Espíritu».", "1 Tesalonicenses 5:19-21"],
    ["f57", 6, "o6", "recordar", "¿Cómo pide Pablo que se haga todo en la iglesia, según 1 Corintios 14:40?", "Decentemente y con orden", ["Con mucho ruido", "Sin ninguna preparación", "A gusto de cada uno"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    ["f58", 6, "o6", "aplicar", "¿Por dónde empieza la oración por avivamiento, según la lección?", "Por uno mismo: humillarse, confesar y buscar el rostro de Dios", ["Por señalar el pecado de otros", "Por organizar un gran evento", "Por esperar a que otros oren"], "«Si se humillare mi pueblo».", "2 Crónicas 7:13-14"],
    ["f59", 6, "o6", "evaluar", "¿Cuál de estas prácticas no ayuda a buscar un avivamiento?", "Fabricar emociones y buscar espectáculo", ["Orar con otros con constancia", "Pedir valor para anunciar a Cristo", "Examinarlo todo por la Escritura"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:19-21"],
    ["f60", 6, "o6", "evaluar", "¿Qué muestra que hay un avivamiento verdadero?", "Que crecen la santidad, el amor, la unidad y la misión", ["Que hay más ruido", "Que la iglesia es más famosa", "Que las reuniones duran más"], "«Por sus frutos los conoceréis».", "Mateo 7:16-20"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué pide Habacuc que Dios haga conocer en medio de los tiempos?", "Su obra", ["Su ira", "Su juicio solamente", "Su silencio"], "«En medio de los tiempos hazla conocer; En la ira acuérdate de la misericordia».", "Habacuc 3:2"],
      ["m1-02", 1, "o1", "comprender", "¿Qué pide Habacuc que Dios recuerde en medio de la ira?", "La misericordia", ["El castigo", "La ley", "El templo"], "«En la ira acuérdate de la misericordia».", "Habacuc 3:2"],
      ["m1-03", 1, "o1", "recordar", "¿Para qué quiere el salmista que Dios les vuelva a dar vida?", "Para que su pueblo se regocije en él", ["Para ser famosos", "Para vencer en la guerra", "Para ser ricos"], "«Para que tu pueblo se regocije en ti».", "Salmos 85:6"],
      ["m1-04", 1, "o1", "comprender", "¿Cómo se llama a Dios en Isaías 57:15?", "El Alto y Sublime, el que habita la eternidad, cuyo nombre es el Santo", ["El Dios lejano", "El Dios del templo solamente", "El Dios de los fuertes"], "«Porque así dijo el Alto y Sublime, el que habita la eternidad, y cuyo nombre es el Santo».", "Isaías 57:15"],
      ["m1-05", 1, "o1", "aplicar", "¿Cuál de estas señales indica que Dios está renovando a su iglesia?", "Confesión y arrepentimiento sinceros", ["Más luces en el escenario", "Más publicidad", "Más ruido"], "«convencerá al mundo de pecado».", "Juan 16:8"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué queda para la declaración de fe y para la materia Teología del avivamiento, según la nota de la lección?", "Lo que el ministerio enseña sobre las manifestaciones del Espíritu y su doctrina del avivamiento", ["Si Dios oye la oración", "Si hay que orar", "Si la Biblia es verdad"], "«Oh Jehová, aviva tu obra».", "Habacuc 3:2"],
      ["m1-07", 2, "o2", "recordar", "¿Qué haría Dios si su pueblo se humillaba y oraba, según 2 Crónicas 7:14?", "Oír, perdonar y sanar su tierra", ["Callar", "Enviar más castigo", "Olvidarlos"], "«entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra».", "2 Crónicas 7:13-14"],
      ["m1-08", 2, "o2", "comprender", "¿En qué momento le dio Dios a Salomón la promesa de 2 Crónicas 7:14?", "En la dedicación del templo", ["En una guerra", "En su coronación", "En su muerte"], "«Si se humillare mi pueblo, sobre el cual mi nombre es invocado».", "2 Crónicas 7:13-14"],
      ["m1-09", 2, "o2", "recordar", "¿Qué volvió a celebrar el pueblo en tiempos de Ezequías?", "La Pascua", ["La coronación", "La cosecha", "La guerra"], "«y su oración llegó a la habitación de su santuario, al cielo».", "2 Crónicas 30:27"],
      ["m1-10", 2, "o2", "aplicar", "¿Qué muestra la reacción del pueblo cuando Esdras abrió la ley?", "Que la Palabra de Dios lleva a la humillación y a la adoración", ["Que la ley aburre", "Que el pueblo no entendió nada", "Que solo los sacerdotes adoran"], "«y se humillaron y adoraron a Jehová inclinados a tierra».", "Nehemías 8:5-6"],
      ["m1-11", 2, "o2", "recordar", "¿Cómo se reunieron los hijos de Israel en Nehemías 9:1?", "En ayuno, con cilicio y tierra sobre sí", ["Con fiesta y música", "Con armas", "Con regalos"], "«se reunieron los hijos de Israel en ayuno, y con cilicio y tierra sobre sí».", "Nehemías 9:1-3"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué queda para la declaración de fe, según la nota sobre Hechos 2?", "Lo que el ministerio enseña sobre las lenguas como señal del bautismo en el Espíritu", ["Si hubo Pentecostés", "Si los discípulos oraron", "Si se añadieron tres mil"], "«y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».", "Hechos 2:1-4"],
      ["m1-13", 3, "o3", "recordar", "¿De dónde venían los creyentes perseguidos que llegaron a Herrnhut?", "De Moravia", ["De España", "De Inglaterra", "De Grecia"], "Por eso se les llama moravos.", "Isaías 62:6-7"],
      ["m1-14", 3, "o3", "comprender", "¿Qué buscaba la vigilia de oración por turnos de los moravos?", "Que la oración no se detuviera ni de día ni de noche", ["Que cada uno orara solo una vez", "Que se orara solo los domingos", "Que nadie más orara"], "«todo el día y toda la noche no callarán jamás».", "Isaías 62:6-7"],
      ["m1-15", 3, "o3", "recordar", "¿Qué pone Dios sobre los muros de Jerusalén, según Isaías 62:6?", "Guardas", ["Soldados extranjeros", "Estatuas", "Banderas"], "«Sobre tus muros, oh Jerusalén, he puesto guardas».", "Isaías 62:6-7"],
      ["m1-16", 3, "o3", "aplicar", "Tu iglesia quiere orar sin interrupción durante un día entero. ¿Qué ejemplo puede seguir?", "El de los moravos: turnos de una hora para cubrir el día y la noche", ["Que ore uno solo todo el día", "Que no se organice nada", "Que solo oren los pastores"], "«Los que os acordáis de Jehová, no reposéis».", "Isaías 62:6-7"],
      ["m1-17", 3, "o3", "analizar", "¿Qué relación hay entre la oración de los moravos y sus misiones?", "La oración por la mies los llevó a ser ellos mismos obreros", ["Ninguna", "Las misiones los hicieron dejar de orar", "Oraban para no tener que ir"], "«Rogad, pues, al Señor de la mies, que envíe obreros a su mies».", "Mateo 9:37-38"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué promete Jesús a los que se reúnen en su nombre, según Mateo 18:20?", "Que él está en medio de ellos", ["Que serán ricos", "Que nunca sufrirán", "Que no tendrán que orar más"], "«allí estoy yo en medio de ellos».", "Mateo 18:19-20"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En qué años vio Edwards un avivamiento en su iglesia de Northampton?", "En 1734 y 1735", ["En 1904 y 1905", "En 1517 y 1518", "En 1857 y 1858"], "Después vino el Gran Despertar de la década de 1740.", "Zacarías 8:20-22"],
      ["m2-02", 4, "o4", "comprender", "¿Qué dicen los habitantes de una ciudad a los de otra, en Zacarías 8:21?", "Vamos a implorar el favor de Jehová", ["Vamos a la guerra", "Vamos a construir una torre", "Vamos a descansar"], "«y vendrán los habitantes de una ciudad a otra, y dirán: Vamos a implorar el favor de Jehová».", "Zacarías 8:20-22"],
      ["m2-03", 4, "o4", "recordar", "¿Dónde estaba el Williams College de la reunión del pajar?", "En Massachusetts", ["En Gales", "En Chile", "En Corea"], "Allí oraron cinco estudiantes por las naciones en 1806.", "Mateo 9:37-38"],
      ["m2-04", 4, "o4", "aplicar", "¿Qué enseña la calle Fulton a una iglesia pequeña?", "Que Dios puede empezar algo grande con pocas personas que oran", ["Que la oración necesita multitudes", "Que solo importan las iglesias grandes", "Que es mejor no empezar"], "«Porque donde están dos o tres congregados en mi nombre».", "Mateo 18:19-20"],
      ["m2-05", 4, "o4", "comprender", "¿Qué pide primero el salmista en Salmos 51:10?", "Que Dios cree en él un corazón limpio", ["Que castigue a sus enemigos", "Que le dé un reino", "Que lo haga famoso"], "«Crea en mí, oh Dios, un corazón limpio».", "Salmos 51:10-13"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué dicen las fuentes sobre los convertidos en el avivamiento de 1857?", "Que las cifras varían, pero se habla de cientos de miles", ["Que no hubo ninguno", "Que fueron exactamente diez", "Que no se sabe si hubo avivamiento"], "«y los pecadores se convertirán a ti».", "Salmos 51:10-13"],
      ["m2-07", 5, "o5", "recordar", "¿En qué había trabajado Evan Roberts antes de prepararse para el ministerio?", "En las minas de carbón", ["En un banco", "En el ejército", "En una universidad"], "Oró por años por un avivamiento en Gales.", "Santiago 5:16-18"],
      ["m2-08", 5, "o5", "comprender", "¿Qué une Santiago 5:16?", "La confesión de las ofensas y la oración unos por otros", ["La riqueza y la fama", "La guerra y la paz", "El silencio y la soledad"], "«Confesaos vuestras ofensas unos a otros, y orad unos por otros».", "Santiago 5:16-18"],
      ["m2-09", 5, "o5", "recordar", "¿En qué ciudad comenzó el avivamiento de la calle Azusa?", "En Los Ángeles", ["En Nueva York", "En Londres", "En Valparaíso"], "Seymour dirigía reuniones de oración en la calle Bonnie Brae.", "Hechos 2:16-18"],
      ["m2-10", 5, "o5", "recordar", "¿En qué ciudad estaba la iglesia de Jangdaehyun?", "En Pyongyang", ["En Seúl", "En Tokio", "En Pekín"], "Allí comenzó en enero de 1907 el avivamiento de Corea.", "Santiago 5:16-18"],
      ["m2-11", 5, "o5", "comprender", "¿Qué leyó la iglesia de Valparaíso que la animó a orar?", "Un folleto sobre un avivamiento en la India", ["Una carta del gobierno", "Un periódico de deportes", "Un libro de historia de Chile"], "Oraron desde 1907 hasta el avivamiento de 1909.", "Hechos 2:16-18"],
      ["m2-12", 5, "o5", "aplicar", "¿Qué enseña Hechos 19:18 sobre la renovación de una iglesia?", "Que la confesión sincera abre paso a la renovación", ["Que hay que esconder el pecado", "Que la confesión no importa", "Que solo confiesan los pastores"], "«Y muchos de los que habían creído venían, confesando y dando cuenta de sus hechos».", "Hechos 19:18"],
      ["m2-13", 6, "o6", "recordar", "¿Qué pidió la iglesia que Dios hiciera mientras ellos hablaban con denuedo, según Hechos 4:30?", "Que extendiera su mano para que se hicieran sanidades, señales y prodigios en el nombre de Jesús", ["Que destruyera a sus enemigos", "Que les diera riquezas", "Que los sacara de la ciudad"], "«mientras extiendes tu mano para que se hagan sanidades y señales y prodigios mediante el nombre de tu santo Hijo Jesús».", "Hechos 4:29-31"],
      ["m2-14", 6, "o6", "comprender", "¿Qué pasa con el árbol que no da buen fruto, según Mateo 7:19?", "Es cortado y echado en el fuego", ["Es premiado", "Se deja crecer igual", "Se lo riega más"], "«Todo árbol que no da buen fruto, es cortado y echado en el fuego».", "Mateo 7:16-20"],
      ["m2-15", 6, "o6", "recordar", "¿Qué no debemos menospreciar, según 1 Tesalonicenses 5:20?", "Las profecías", ["Las riquezas", "Las tradiciones humanas", "Las opiniones de todos"], "«No menospreciéis las profecías».", "1 Tesalonicenses 5:19-21"],
      ["m2-16", 6, "o6", "aplicar", "Quieres orar por un avivamiento en tu ciudad. ¿Qué paso sugiere la lección?", "Orar con otros, con constancia, como los moravos y la calle Fulton", ["Esperar a que otros empiecen", "Organizar solo un concierto", "Orar una sola vez"], "«si dos de vosotros se pusieren de acuerdo en la tierra acerca de cualquiera cosa que pidieren».", "Mateo 18:19-20"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué no basta con el ruido o la emoción para hablar de avivamiento?", "Porque un avivamiento verdadero se reconoce por sus frutos", ["Porque el ruido es pecado", "Porque las emociones están prohibidas", "Porque el avivamiento no existe"], "«Así que, por sus frutos los conoceréis».", "Mateo 7:16-20"],
      ["m2-18", 6, "o6", "evaluar", "¿Dónde empieza el avivamiento que pedimos para la iglesia, según la lección?", "En nuestro propio corazón", ["En el corazón de los demás", "En el gobierno", "En los medios de comunicación"], "«Crea en mí, oh Dios, un corazón limpio».", "Salmos 51:10-13"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "intercesion-5-e1",
      tipo: "corta",
      pregunta: "Explica qué es un avivamiento según la Biblia y cuáles son sus señales.",
      ideas: [
        { id: "obra", peso: 30, texto: "Es una obra de Dios que renueva a su pueblo.", formas: ["obra de dios", "aviva tu obra", "renueva", "renovacion", "dios lo da", "vuelve a la vida", "darnos vida"] },
        { id: "humildad", peso: 20, texto: "Empieza con humildad y quebranto.", formas: ["humild*", "quebrant*", "se humill*"] },
        { id: "senales", peso: 30, texto: "Señales: convicción de pecado, arrepentimiento, hambre de la Palabra y de oración, amor, misión.", formas: ["conviccion", "arrepentimiento", "confesion", "hambre de", "celo por", "conversiones", "se convierten", "amor entre"] },
        { id: "no_fabrica", peso: 10, texto: "No se fabrica.", formas: ["no se fabrica", "no se produce", "no es una campana", "no se programa", "tecnicas"], negativa: true },
      ],
      citas: ["Habacuc 3:2", "Salmos 85:6", "Isaías 57:15", "Juan 16:8", "2 Crónicas 7:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Un avivamiento es una obra de Dios que renueva a su pueblo con fuerza poco común: aviva tu obra en medio de los tiempos (Habacuc 3:2). Empieza con humildad y quebranto, y trae convicción de pecado, arrepentimiento, hambre de oración y de la Palabra, amor entre los hermanos y celo por la misión. No se fabrica.",
    },
    {
      id: "intercesion-5-e2",
      tipo: "corta",
      pregunta: "Explica la promesa de 2 Crónicas 7:14 y cómo debe aplicarla hoy el creyente.",
      ideas: [
        { id: "condiciones", peso: 35, texto: "Humillarse, orar, buscar el rostro de Dios y convertirse de los malos caminos.", formas: ["se humillare", "humillarse", "humillamos", "se humilla", "se humillaba", "buscaren mi rostro", "buscar su rostro", "buscan su rostro", "buscaba su rostro", "buscar el rostro", "malos caminos", "convertirse"] },
        { id: "promesa", peso: 25, texto: "Dios oye, perdona y sana.", formas: ["oire desde los cielos", "oiria", "perdonare", "perdonaria", "perdona", "sanare su tierra", "sanaria", "sana", "dios oye", "dios responde"] },
        { id: "contexto", peso: 20, texto: "Fue dada a Israel, en el contexto del templo y de la tierra.", formas: ["israel", "el templo", "salomon", "contexto"] },
        { id: "principio", peso: 10, texto: "Hoy se aplica como principio.", formas: ["principio", "se aplica", "aplicamos"] },
      ],
      citas: ["2 Crónicas 7:14", "2 Crónicas 7:13-14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios le prometió a Salomón, en la dedicación del templo, que si su pueblo se humillaba, oraba, buscaba su rostro y se convertía de sus malos caminos, él oiría desde los cielos, perdonaría y sanaría su tierra (2 Crónicas 7:14). Fue dada a Israel, pero hoy se aplica como principio: Dios responde al pueblo que se humilla.",
    },
    {
      id: "intercesion-5-e3",
      tipo: "corta",
      pregunta: "Explica qué enseñan los moravos de Herrnhut sobre la oración y las misiones.",
      ideas: [
        { id: "reconciliacion", peso: 20, texto: "Divididos, se reconciliaron con oración antes del avivamiento de 1727.", formas: ["reconcili*", "divisiones", "divididos", "1727"] },
        { id: "vigilia", peso: 35, texto: "Una vigilia de oración por turnos, de día y de noche, que duró muchos años.", formas: ["por turnos", "una hora", "de dia y de noche", "dia y noche", "cien anos", "vigilia", "no se detuviera"] },
        { id: "misiones", peso: 35, texto: "La oración los llevó a enviar misioneros.", formas: ["misioneros", "misiones", "enviaron", "obreros", "fueron ellos"] },
      ],
      citas: ["Isaías 62:6-7", "Isaías 62:6", "Mateo 9:37-38", "Mateo 9:38", "Mateo 18:19-20", "Mateo 18:20"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los moravos de Herrnhut estaban divididos, pero se reconciliaron orando, y en 1727 Dios los avivó. Organizaron una vigilia de oración por turnos, una hora cada uno, de día y de noche, que duró muchos años, como los guardas que no callan (Isaías 62:6). Y esa oración los llevó a enviar misioneros a muchas naciones.",
    },
    {
      id: "intercesion-5-e4",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de oración qué tienen en común los avivamientos de la historia que estudiaste, desde los moravos hasta Chile, y qué lecciones dejan para la iglesia de hoy, con citas bíblicas.",
      ideas: [
        { id: "oracion", peso: 25, texto: "Antes de cada avivamiento hubo oración perseverante y unida.", formas: ["oracion unida", "oraron por anos", "persever*", "reuniones de oracion", "oraban juntos", "antes del fuego"] },
        { id: "confesion", peso: 20, texto: "Hubo confesión sincera y arrepentimiento.", formas: ["confes*", "arrepent*"] },
        { id: "pequeno", peso: 15, texto: "Empezaron con pocas personas o sencillas.", formas: ["seis personas", "cinco estudiantes", "pocas personas", "pequen*", "sencill*"] },
        { id: "mision", peso: 20, texto: "Llevaron a la misión y a la conversión de muchos.", formas: ["misioneros", "misiones", "las naciones", "convertidos", "se convirtieron", "carey"] },
        { id: "ejemplos", peso: 20, texto: "Nombra ejemplos concretos.", formas: ["moravos", "herrnhut", "edwards", "fulton", "gales", "evan roberts", "azusa", "corea", "pyongyang", "valparaiso", "hoover"] },
      ],
      basta: 85,
      citas: ["2 Crónicas 7:14", "Isaías 62:6-7", "Mateo 9:37-38", "Mateo 18:19-20", "Zacarías 8:20-22", "Zacarías 8:21", "Santiago 5:16-18", "Santiago 5:16", "Hechos 19:18", "Salmos 51:10-13", "Hechos 1:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, los avivamientos que estudiamos son muy distintos, pero tienen cosas en común. Primero, antes de cada uno hubo oración perseverante y unida: los moravos de Herrnhut oraron por turnos, de día y de noche, durante muchos años; Edwards llamó a las ciudades a implorar juntas el favor de Jehová (Zacarías 8:21); en Gales, Evan Roberts oró por años; y en Valparaíso la iglesia de Hoover oró desde 1907. Segundo, hubo confesión sincera: en Pyongyang los creyentes confesaron sus pecados en público, como enseña Santiago 5:16, y Evan Roberts pedía confesar todo pecado conocido. Tercero, muchos empezaron pequeños: seis personas en la calle Fulton y cinco estudiantes junto a un pajar. Y cuarto, llevaron a la misión: de los moravos salieron misioneros a muchas naciones, de la oración de los bautistas ingleses salió Carey, y muchos se convirtieron. La lección para hoy es clara: si nuestro pueblo se humilla y ora, Dios oye (2 Crónicas 7:14). No necesitamos multitudes para empezar: necesitamos orar juntos, confesar y obedecer.",
    },
    {
      id: "intercesion-5-e5",
      tipo: "breve",
      pregunta:
        "Un hermano te dice que en un culto hubo mucha emoción y que eso ya es un avivamiento. Explícale, con la Biblia, cómo se reconoce un avivamiento verdadero y cómo debe orar la iglesia por uno.",
      ideas: [
        { id: "frutos", peso: 30, texto: "Se reconoce por sus frutos: santidad, amor, unidad y misión.", formas: ["por sus frutos", "fruto*", "santidad", "cambio de vida"] },
        { id: "emocion", peso: 15, texto: "La emoción sola no basta; no se fabrica.", formas: ["emocion", "no basta", "no se fabrica", "espectaculo", "ruido"], negativa: true },
        { id: "examinar", peso: 20, texto: "No apagar al Espíritu, pero examinarlo todo y retener lo bueno, con orden.", formas: ["examinadlo todo", "examinar", "retened lo bueno", "no apagueis", "con orden"], negativa: true },
        { id: "orar", peso: 25, texto: "Orar con humildad, confesión y con otros, pidiendo valor para anunciar a Cristo.", formas: ["humill*", "confes*", "con denuedo", "valor", "orar juntos", "con otros", "buscar el rostro"] },
        { id: "presencia", peso: 10, texto: "Anhelar la presencia de Dios.", formas: ["rompieses los cielos", "su presencia", "la presencia de dios", "anhel*"] },
      ],
      basta: 85,
      citas: ["Mateo 7:16-20", "Mateo 7:16", "Mateo 7:20", "Gálatas 5:22-23", "1 Tesalonicenses 5:19-21", "1 Tesalonicenses 5:21", "1 Corintios 14:40", "Hechos 4:29-31", "Hechos 4:31", "Isaías 64:1", "2 Crónicas 7:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano, me alegra que Dios esté tocando a la iglesia, pero la emoción sola no basta para hablar de avivamiento. Jesús dio la prueba: por sus frutos los conoceréis (Mateo 7:16). Un avivamiento verdadero produce el fruto del Espíritu: amor, gozo, paz, paciencia y templanza; y se nota en la santidad, en el perdón entre hermanos, en la unidad y en el celo por anunciar a Cristo. Por eso la iglesia no apaga al Espíritu, pero tampoco acepta todo: examinadlo todo; retened lo bueno (1 Tesalonicenses 5:21), y todo se hace con orden. ¿Cómo orar por uno? Con anhelo de su presencia, como Isaías, que clamaba que Dios rompiera los cielos; empezando por humillarnos y confesar nuestros pecados, como pide 2 Crónicas 7:14; orando juntos y con constancia; y pidiendo, como la iglesia de Hechos 4, valor para hablar con denuedo la palabra de Dios. Si el fruto aparece y permanece, sabremos que fue Dios.",
    },
  ],
  breve: {
    id: "intercesion-5-b1",
    tipo: "breve",
    pregunta:
      "Escribe tu plan para orar por un avivamiento en tu vida y en tu iglesia: qué aprendiste de los avivamientos de la historia, cómo empezarás por ti mismo, con quién orarás y cómo reconocerás un fruto verdadero, con citas bíblicas.",
    ideas: [
      { id: "historia", peso: 20, texto: "Dice qué aprendió de los avivamientos de la historia.", formas: ["moravos", "edwards", "fulton", "gales", "evan roberts", "azusa", "corea", "valparaiso", "pajar"] },
      { id: "yo", peso: 25, texto: "Empieza por sí mismo: humillarse, confesar, buscar el rostro de Dios.", formas: ["por mi mismo", "en mi", "humill*", "confes*", "buscar su rostro", "buscare su rostro", "corazon limpio"] },
      { id: "otros", peso: 20, texto: "Orará con otros, con constancia.", formas: ["con otros", "con mi grupo", "con hermanos", "reunion de oracion", "cadena de oracion", "cada semana", "por turnos", "orar juntos", "oraremos juntos"] },
      { id: "frutos", peso: 20, texto: "Reconocerá el fruto verdadero.", formas: ["por sus frutos", "fruto*", "examin*", "santidad", "unidad"] },
      { id: "mision", peso: 15, texto: "Une la oración a la misión.", formas: ["mision", "las naciones", "mi ciudad", "anunciar", "con denuedo", "evangeliz*"] },
    ],
    basta: 85,
    citas: ["2 Crónicas 7:14", "2 Crónicas 7:13-14", "Habacuc 3:2", "Salmos 85:6", "Salmos 51:10", "Salmos 51:10-13", "Isaías 62:6-7", "Mateo 18:19-20", "Mateo 7:16-20", "Hechos 4:29-31", "Santiago 5:16", "1 Tesalonicenses 5:21"],
    pesoCita: 10,
    errores: [],
    modelo:
      "De los avivamientos de la historia aprendí que antes del fuego siempre hubo rodillas: los moravos oraron por turnos, de día y de noche; en la calle Fulton empezaron solo seis personas; y en Gales y en Corea la confesión sincera abrió paso a la renovación. Mi plan empieza por mí mismo: cada mañana le pediré a Dios, como David, crea en mí, oh Dios, un corazón limpio (Salmos 51:10), y confesaré lo que él me muestre, porque el avivamiento empieza con un pueblo que se humilla y busca su rostro (2 Crónicas 7:14). Después voy a orar con otros: con dos hermanos de mi grupo nos reuniremos cada semana para pedir por nuestra iglesia y por mi ciudad, y propondré una cadena de oración por turnos. Pediremos, como la iglesia de Hechos 4, valor para anunciar a Cristo con denuedo. Y para no engañarme con emociones, examinaré todo: por sus frutos los conoceréis (Mateo 7:16). Si crecen la santidad, el amor y la unidad, y más personas llegan a Cristo, sabré que es obra de Dios.",
  },
};
