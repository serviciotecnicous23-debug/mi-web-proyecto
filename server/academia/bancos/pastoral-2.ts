/**
 * El banco de «Consejería pastoral» (especialidad Ministerio pastoral, materia 2, avanzada). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es la consejería pastoral y sus enfoques · o2 el método de Jesús con la samaritana · o3 la culpa y el
 * perdón · o4 la ansiedad y la tristeza profunda · o5 la reconciliación · o6 la confidencialidad, la derivación y los
 * límites · o7 el versículo de memoria (Isaías 50:4). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de
 * memoria, al menos un 20 % de casos, y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `pastoral-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_PASTORAL_2: BancoMateria = {
  materia: "pastoral-2",
  repaso: {
    "pastoral-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cuál era la meta de Pablo al amonestar y enseñar, según Colosenses 1:28?", "Presentar perfecto en Cristo Jesús a todo hombre", ["Hacerse famoso", "Ganar discusiones", "Tener muchos seguidores"], "«a fin de presentar perfecto en Cristo Jesús a todo hombre».", "Colosenses 1:28"],
      ["1-r2", 1, "o1", "comprender", "¿En qué se diferencian la consejería noutética y la de integración?", "La noutética usa solo la Escritura y desconfía de la psicología; la integración usa con discernimiento lo que la psicología aprendió, con la Escritura como autoridad", ["La noutética no usa la Biblia", "La integración rechaza la Biblia", "Son exactamente lo mismo"], "Jay Adams propuso la consejería noutética; Gary Collins, la integración.", "Colosenses 1:28"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano con una depresión grave pide ayuda al pastor. ¿Qué hace el pastor, según Proverbios 11:14?", "Lo acompaña con la Palabra y lo anima a buscar también la ayuda de un profesional", ["Le dice que no necesita a nadie más", "Le prohíbe ir al médico", "Lo deja solo"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ] as P[]).map(p),
    "pastoral-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Con qué palabras empezó Jesús la conversación con la samaritana, según Juan 4:7?", "Dame de beber", ["Arrepiéntete", "Vete en paz", "Sígueme"], "«y Jesús le dijo: Dame de beber».", "Juan 4:7-10"],
      ["2-r2", 2, "o2", "comprender", "¿Cómo trató Jesús el pecado de la samaritana, según Juan 4:16-18?", "Lo nombró con verdad y sin desprecio", ["Lo ignoró", "La humilló en público", "La echó"], "«porque cinco maridos has tenido, y el que ahora tienes no es tu marido; esto has dicho con verdad».", "Juan 4:16-18"],
      ["2-r3", 2, "o2", "aplicar", "Un joven llega a consejería hablando de su trabajo, aunque su dolor real es otro. ¿Qué paso del método de Jesús aplicas?", "Partir de lo cotidiano y llevar la conversación a lo profundo", ["Cortarlo y hablar de su pecado enseguida", "Hablar solo del trabajo", "Darle un sermón"], "Jesús pasó del agua del pozo al agua viva: «Si conocieras el don de Dios».", "Juan 4:7-10"],
    ] as P[]).map(p),
    "pastoral-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué le pasaba a David mientras callaba su pecado, según Salmos 32:3?", "Se envejecieron sus huesos en su gemir todo el día", ["Estaba feliz", "Se hizo rico", "Nada le pasaba"], "«Mientras callé, se envejecieron mis huesos En mi gemir todo el día».", "Salmos 32:3-5"],
      ["3-r2", 3, "o3", "comprender", "¿Qué diferencia hay entre la tristeza según Dios y la del mundo, según 2 Corintios 7:10?", "La primera produce arrepentimiento para salvación; la segunda produce muerte", ["Las dos son iguales", "La del mundo produce salvación", "La según Dios produce muerte"], "«Porque la tristeza que es según Dios produce arrepentimiento para salvación, de que no hay que arrepentirse; pero la tristeza del mundo produce muerte».", "2 Corintios 7:10"],
      ["3-r3", 3, "o3", "aplicar", "Una hermana confesó un pecado hace años y todavía se siente condenada. ¿Qué le muestras con 1 Juan 1:9?", "Que Dios es fiel y justo para perdonar al que confiesa, aunque ella no lo sienta", ["Que debe castigarse más", "Que Dios no perdona dos veces", "Que su sentimiento decide si está perdonada"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad».", "1 Juan 1:9"],
    ] as P[]).map(p),
    "pastoral-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué se dice a sí mismo el salmista en Salmos 42:5?", "¿Por qué te abates, oh alma mía? Espera en Dios", ["Ya no hay esperanza", "Dios me olvidó", "Debo esconderme"], "«¿Por qué te abates, oh alma mía, Y te turbas dentro de mí? Espera en Dios».", "Salmos 42:5"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hacemos con la ansiedad, según 1 Pedro 5:7?", "La echamos sobre Dios, porque él tiene cuidado de nosotros", ["La escondemos", "La negamos", "La cargamos solos"], "«echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros».", "1 Pedro 5:7"],
      ["4-r3", 4, "o4", "aplicar", "Un hermano dice que tomar un medicamento para la depresión es falta de fe. ¿Qué le dices?", "Que no es falta de fe, como no lo es usar anteojos, y que la depresión no siempre es fruto de un pecado", ["Que tiene razón", "Que deje el tratamiento", "Que solo debe orar"], "Se ora y se busca a Dios, y también se usa la ayuda médica cuando hace falta.", "Mateo 11:28"],
    ] as P[]).map(p),
    "pastoral-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pide Jesús antes de presentar la ofrenda, según Mateo 5:24?", "Reconciliarse primero con el hermano", ["Ayunar tres días", "Dar el doble", "Esperar al domingo"], "«deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano».", "Mateo 5:23-24"],
      ["5-r2", 5, "o5", "comprender", "¿Qué diferencia hay entre perdonar y reconciliarse?", "El perdón depende de uno; la reconciliación necesita a los dos y un cambio real", ["Son lo mismo", "La reconciliación depende de uno solo", "El perdón necesita que el otro cambie primero"], "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", "Romanos 12:18"],
      ["5-r3", 5, "o5", "aplicar", "Una mujer que sufre violencia en su casa pregunta si perdonar significa volver con su agresor. ¿Qué le dices?", "Que puede perdonar sin ponerse en peligro, y que la iglesia la ayudará a estar segura", ["Que debe volver para mostrar que perdonó", "Que no puede perdonar", "Que es su culpa"], "Perdonar no es lo mismo que reconciliarse, y nunca se le pide a una víctima volver a la violencia.", "Romanos 12:18"],
    ] as P[]).map(p),
    "pastoral-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hace el de espíritu fiel con un secreto, según Proverbios 11:13?", "Lo guarda todo", ["Lo cuenta como motivo de oración", "Lo publica", "Lo usa para ganar poder"], "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
      ["6-r2", 6, "o6", "comprender", "¿Cuándo tiene límites la confidencialidad del pastor?", "Cuando hay riesgo de suicidio, peligro para otros o abuso de un menor o de un anciano", ["Nunca tiene límites", "Cuando el caso es aburrido", "Cuando otro hermano pregunta"], "«Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
      ["6-r3", 6, "o6", "aplicar", "Una adolescente le cuenta al pastor que un familiar abusa de ella y le pide que no diga nada. ¿Qué hace en Texas?", "La protege y denuncia el abuso a las autoridades, como manda la ley", ["Guarda el secreto", "Habla solo con el familiar", "Espera a que ella cambie de idea"], "«Libra a los que son llevados a la muerte».", "Proverbios 24:11"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · ¿Qué es la consejería pastoral?
    ["f01", 1, "o1", "recordar", "¿Qué hacía Pablo con todo hombre, según Colosenses 1:28?", "Lo amonestaba y le enseñaba en toda sabiduría", ["Lo juzgaba", "Lo ignoraba", "Le cobraba"], "«amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría».", "Colosenses 1:28"],
    ["f02", 1, "o1", "comprender", "¿Qué es la consejería pastoral?", "La Palabra aplicada a una persona en su situación, para que madure en Cristo", ["Un tratamiento médico", "Una charla sin la Biblia", "Un castigo para el que peca"], "Es aplicar la Palabra a una persona en su situación, como hacía Pablo: «amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría, a fin de presentar perfecto en Cristo Jesús a todo hombre».", "Colosenses 1:28"],
    ["f03", 1, "o1", "recordar", "¿Para qué le dio Dios lengua de sabios al siervo, según Isaías 50:4?", "Para saber hablar palabras al cansado", ["Para discutir", "Para mandar", "Para criticar"], "«Jehová el Señor me dio lengua de sabios, para saber hablar palabras al cansado».", "Isaías 50:4"],
    ["f04", 1, "o1", "comprender", "¿Qué enseña Romanos 15:14 sobre quién puede aconsejar?", "Que los creyentes pueden amonestarse unos a otros", ["Que solo el pastor aconseja", "Que nadie puede aconsejar", "Que solo los psicólogos aconsejan"], "«de tal manera que podéis amonestaros los unos a los otros».", "Romanos 15:14"],
    ["f05", 1, "o1", "analizar", "¿De dónde viene el nombre de la consejería noutética?", "De la palabra griega que se traduce amonestar", ["De un pueblo de Grecia", "De un psicólogo famoso", "De una palabra hebrea que significa sanar"], "«amonestando a todo hombre».", "Colosenses 1:28"],
    ["f06", 1, "o1", "evaluar", "¿Qué tienen en común los tres enfoques evangélicos de la consejería?", "Que reconocen la autoridad de la Escritura, aunque difieren en cuánto usar de la psicología", ["Que rechazan la Biblia", "Que no ayudan a nadie", "Que solo usan la psicología"], "El pastor puede aprender de todos, con la Palabra como regla.", "Colosenses 1:28"],
    ["f07", 1, "o1", "aplicar", "Un pastor joven cree que pedir ayuda a un psicólogo cristiano es falta de fe. ¿Qué le enseña Proverbios 11:14?", "Que en la multitud de consejeros hay seguridad", ["Que tiene razón", "Que debe aconsejar solo", "Que la psicología es pecado"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f08", 1, "o1", "aplicar", "Un hermano llega al pastor con una adicción que le daña la salud. ¿Qué hace el pastor?", "Lo acompaña con la Palabra y lo deriva también a un tratamiento profesional", ["Le dice que solo necesita fe", "Lo expulsa de la iglesia", "Lo ignora"], "El pastor no es médico, y trabaja con otros cuando hace falta.", "Proverbios 11:14"],
    ["f09", 1, "o1", "comprender", "¿Qué hace el siervo antes de hablar, según Isaías 50:4?", "Despierta su oído para oír como los sabios", ["Prepara un discurso largo", "Busca culpables", "Habla primero"], "«despertará mi oído para que oiga como los sabios».", "Isaías 50:4"],
    ["f10", 1, "o7", "recordar", "Completa Isaías 50:4: Jehová el Señor me dio lengua de sabios…", "para saber hablar palabras al cansado; despertará mañana tras mañana, despertará mi oído para que oiga como los sabios", ["para juzgar a los pecadores", "para ganar todas las discusiones", "para hablar solo en el templo"], "«Jehová el Señor me dio lengua de sabios, para saber hablar palabras al cansado; despertará mañana tras mañana, despertará mi oído para que oiga como los sabios».", "Isaías 50:4"],
    // Lección 2 · El método de Jesús
    ["f11", 2, "o2", "comprender", "¿Qué barrera rompió Jesús al hablar con la samaritana, según Juan 4:9?", "La que separaba a judíos y samaritanos", ["La del idioma", "La de la edad", "Ninguna"], "«Porque judíos y samaritanos no se tratan entre sí».", "Juan 4:7-10"],
    ["f12", 2, "o2", "recordar", "¿Qué le ofreció Jesús a la samaritana, según Juan 4:10?", "Agua viva", ["Dinero", "Un trabajo", "Un lugar en el templo"], "«tú le pedirías, y él te daría agua viva».", "Juan 4:7-10"],
    ["f13", 2, "o2", "analizar", "¿Por qué Jesús empezó pidiendo agua?", "Para partir de lo cotidiano y llegar a lo profundo", ["Porque solo tenía sed", "Para humillarla", "Porque no sabía qué decir"], "«Si conocieras el don de Dios».", "Juan 4:7-10"],
    ["f14", 2, "o2", "recordar", "¿Qué reconoció Jesús de lo que dijo la samaritana, según Juan 4:18?", "Que había dicho la verdad", ["Que mentía", "Que estaba confundida", "Que no importaba"], "«esto has dicho con verdad».", "Juan 4:16-18"],
    ["f15", 2, "o2", "aplicar", "En una consulta, el pastor descubre un pecado que la persona no ha mencionado. ¿Cómo lo trata, según el ejemplo de Jesús?", "Lo nombra con verdad y con amor, sin humillar", ["Lo grita delante de todos", "Lo calla para siempre", "Lo usa para avergonzarla"], "Jesús nombró la situación de la samaritana sin desprecio: «cinco maridos has tenido».", "Juan 4:16-18"],
    ["f16", 2, "o2", "comprender", "¿Qué hizo la samaritana después del encuentro, según Juan 4:28-29?", "Dejó su cántaro y fue a contar a la ciudad lo que Jesús le dijo", ["Se escondió", "Se fue a otra región", "Siguió igual"], "«Entonces la mujer dejó su cántaro, y fue a la ciudad».", "Juan 4:28-29"],
    ["f17", 2, "o2", "evaluar", "¿Qué muestra el final del encuentro con la samaritana?", "Que la buena consejería deja a la persona transformada y dando sus propios pasos", ["Que la persona depende siempre del consejero", "Que no pasó nada", "Que ella quedó avergonzada"], "«Venid, ved a un hombre que me ha dicho todo cuanto he hecho».", "Juan 4:28-29"],
    ["f18", 2, "o2", "aplicar", "Un consejero da su opinión apenas la persona empieza a hablar. ¿Qué paso del camino de Jesús se salta?", "Escuchar y conectar antes de hablar", ["Ninguno", "El de cobrar", "El de despedirse"], "Jesús primero se acercó y conectó con la necesidad del momento.", "Juan 4:7-10"],
    ["f19", 2, "o2", "aplicar", "Al terminar una consulta, el pastor y la persona no acordaron nada. ¿Qué paso falta?", "Orar con la persona y acordar un paso concreto, y después acompañar", ["Ninguno", "Cobrar la consulta", "Hablar con otros del caso"], "Una consulta pastoral sigue estos pasos: escuchar, entender, iluminar con la Palabra, orar, acordar un paso concreto y acompañar después.", "Juan 4:28-29"],
    ["f20", 2, "o2", "analizar", "¿Hacia dónde llevó Jesús a la samaritana en su conversación junto al pozo?", "Hacia el Padre y la verdadera adoración", ["Hacia una discusión sobre los samaritanos", "Hacia el templo de Jerusalén solamente", "Hacia sí misma"], "Jesús le habló del Padre y de los adoradores en espíritu y en verdad (Juan 4:23-24).", "Juan 4:7-10"],
    // Lección 3 · La culpa y el perdón
    ["f21", 3, "o3", "recordar", "¿Qué hizo David con su pecado, según Salmos 32:5?", "Lo declaró y no encubrió su iniquidad", ["Lo escondió", "Lo negó", "Culpó a otros"], "«Mi pecado te declaré, y no encubrí mi iniquidad».", "Salmos 32:3-5"],
    ["f22", 3, "o3", "comprender", "¿Qué hizo Dios cuando David confesó, según Salmos 32:5?", "Perdonó la maldad de su pecado", ["Lo castigó más", "Lo ignoró", "Lo rechazó"], "«Y tú perdonaste la maldad de mi pecado».", "Salmos 32:3-5"],
    ["f23", 3, "o3", "recordar", "¿Cómo es Dios para perdonar, según 1 Juan 1:9?", "Fiel y justo", ["Lento y duro", "Indeciso", "Cansado"], "«él es fiel y justo para perdonar nuestros pecados».", "1 Juan 1:9"],
    ["f24", 3, "o3", "analizar", "¿De qué depende el perdón de Dios para el que confiesa su pecado?", "De la fidelidad de Dios, no de cómo se siente la persona", ["De los sentimientos de la persona", "De sus buenas obras", "Del permiso del pastor"], "El perdón descansa en la fidelidad de Dios, no en lo que siente la persona: «Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados».", "1 Juan 1:9"],
    ["f25", 3, "o3", "comprender", "¿Qué es la falsa culpa en la consejería pastoral?", "Culparse por lo que no fue pecado, o por un pecado que Dios ya perdonó", ["Una culpa por un pecado real", "La culpa del que nunca peca", "La culpa que viene de Dios"], "Es culparse por lo que no fue pecado, o seguir cargando un pecado que Dios ya perdonó; se enfrenta con la verdad de la Palabra, como la promesa de 1 Juan 1:9.", "1 Juan 1:9"],
    ["f26", 3, "o3", "aplicar", "Un hombre se culpa por el divorcio de sus padres, que ocurrió cuando él era niño. ¿Qué tipo de culpa es y cómo lo ayudas?", "Es una falsa culpa: lo ayudo a ver con la Palabra que no fue su pecado", ["Es culpa verdadera: debe confesarla", "No es culpa: no hay nada que hacer", "Es castigo de Dios"], "La falsa culpa se enfrenta con la verdad.", "2 Corintios 7:10"],
    ["f27", 3, "o3", "aplicar", "Una persona robó dinero en su trabajo y está arrepentida. ¿Qué le aconsejas además de confesarlo a Dios?", "Reparar el daño cuando sea posible", ["Nada más", "Esconderlo para siempre", "Robar para devolver"], "Ante la culpa verdadera, se confiesa a Dios, se repara el daño cuando se puede y se recibe el perdón.", "Salmos 32:3-5"],
    ["f28", 3, "o3", "evaluar", "¿Qué distingue la tristeza según Dios de la tristeza del mundo, según 2 Corintios 7:10?", "La primera lleva a Dios y a cambiar; la segunda hunde a la persona en sí misma", ["No hay diferencia", "La del mundo es más profunda", "La según Dios no lleva a nada"], "«la tristeza que es según Dios produce arrepentimiento para salvación, de que no hay que arrepentirse; pero la tristeza del mundo produce muerte».", "2 Corintios 7:10"],
    ["f29", 3, "o3", "aplicar", "Alguien te confiesa un pecado grave. ¿Qué no debe hacer el pastor?", "Escandalizarse o humillar a la persona", ["Orar con ella", "Anunciarle el perdón", "Guardar la confidencia"], "No se escandaliza ni humilla a la persona: ora con ella, le anuncia la promesa del perdón de 1 Juan 1:9 y guarda la confidencia.", "1 Juan 1:9"],
    ["f30", 3, "o3", "comprender", "¿Qué le pasaba a David mientras se agravaba la mano de Dios sobre él, según Salmos 32:4?", "Su verdor se volvió sequedades de verano", ["Su cosecha creció", "Su ejército venció", "Nada cambió"], "«Se volvió mi verdor en sequedades de verano».", "Salmos 32:3-5"],
    // Lección 4 · La ansiedad y la tristeza profunda
    ["f31", 4, "o4", "comprender", "¿Qué muestra Salmos 42:5 sobre los fieles?", "Que también conocieron el abatimiento, y que lo llevaron delante de Dios", ["Que nunca estaban tristes", "Que la tristeza es pecado", "Que Dios los rechazó"], "Los fieles también conocieron el abatimiento y lo llevaron a Dios: «¿Por qué te abates, oh alma mía, Y te turbas dentro de mí? Espera en Dios».", "Salmos 42:5"],
    ["f32", 4, "o4", "recordar", "¿Qué promete Filipenses 4:7 al que ora?", "La paz de Dios, que sobrepasa todo entendimiento", ["Riquezas", "Que nunca tendrá problemas", "Un sueño profundo"], "«Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones».", "Filipenses 4:6-7"],
    ["f33", 4, "o4", "recordar", "¿A quiénes invita Jesús en Mateo 11:28?", "A todos los que están trabajados y cargados", ["Solo a los fuertes", "Solo a los sacerdotes", "Solo a los que nunca dudan"], "«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar».", "Mateo 11:28"],
    ["f34", 4, "o4", "aplicar", "Una hermana lleva un mes sin dormir bien, ya no disfruta de nada y no puede trabajar. ¿Qué haces?", "La acompaño con la Palabra y la oración, y la animo a ver a un médico", ["Le digo que ore más y se le pasará", "Le digo que es falta de fe", "La dejo sola"], "Una tristeza que dura más de dos semanas y afecta la vida pide atención médica.", "Salmos 42:5"],
    ["f35", 4, "o4", "aplicar", "Un joven te dice que siente que su vida no tiene sentido y que ha pensado en morirse. ¿Qué haces?", "No lo dejo solo y buscamos ayuda de inmediato; en Estados Unidos se puede llamar o escribir al 988", ["Le digo que lo piense mejor mañana", "Le pido que no se lo cuente a nadie", "Cambio de tema"], "Ante el riesgo de suicidio se busca ayuda de inmediato.", "Mateo 11:28"],
    ["f36", 4, "o4", "evaluar", "¿Es la depresión siempre fruto de un pecado?", "No: no siempre es fruto de un pecado", ["Sí, siempre", "Solo en los creyentes", "Solo en los pastores"], "No siempre: el salmista, que era un creyente, se preguntaba «¿Por qué te abates, oh alma mía, Y te turbas dentro de mí?». Por eso la depresión se acompaña con amor y, cuando hace falta, con ayuda médica.", "Salmos 42:5"],
    ["f37", 4, "o4", "comprender", "¿Cómo se presentan las peticiones a Dios, según Filipenses 4:6?", "En toda oración y ruego, con acción de gracias", ["Con quejas", "Sin esperanza", "Solo en el templo"], "«sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias».", "Filipenses 4:6-7"],
    ["f38", 4, "o4", "analizar", "Un hermano cree que tomar un medicamento recetado para la depresión es falta de fe. ¿Con qué puede compararse para ayudarle?", "Con usar anteojos: no es falta de fe", ["Con robar", "Con mentir", "Con dejar de orar"], "La fe y la medicina no se oponen: tomar un medicamento recetado o ir a terapia no es falta de fe, como no lo es usar anteojos.", "Mateo 11:28"],
    ["f39", 4, "o4", "aplicar", "Un líder sufre ataques de pánico que no lo dejan funcionar. ¿Qué le recomiendas?", "Orar y apoyarse en la Palabra, y buscar también la atención de un profesional de la salud", ["Que esconda lo que le pasa", "Que deje la fe", "Que no hable con nadie"], "«echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros».", "1 Pedro 5:7"],
    ["f40", 4, "o4", "evaluar", "¿Qué hace un consejero cristiano con la ansiedad de un hermano?", "Lo acompaña con la Palabra y la oración, y reconoce cuándo hace falta ayuda médica", ["Le dice que es pecado", "Lo ignora", "Le receta un medicamento"], "Lo acompaña con la oración y la Palabra, «Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios», y reconoce cuándo la ansiedad pide también ayuda médica.", "Filipenses 4:6-7"],
    // Lección 5 · Conflictos y reconciliación
    ["f41", 5, "o5", "comprender", "¿Qué muestra Mateo 5:23-24 sobre la reconciliación?", "Que Dios la pone antes que la ofrenda", ["Que la ofrenda es más importante", "Que el culto reemplaza la reconciliación", "Que no importa"], "«deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano».", "Mateo 5:23-24"],
    ["f42", 5, "o5", "recordar", "¿Con quiénes pide Pablo estar en paz, según Romanos 12:18?", "Con todos los hombres, en cuanto dependa de nosotros", ["Solo con los hermanos", "Solo con los que nos caen bien", "Con nadie"], "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", "Romanos 12:18"],
    ["f43", 5, "o5", "recordar", "¿Qué hay que quitar, según Efesios 4:31?", "Toda amargura, enojo, ira, gritería y maledicencia", ["La alegría", "La oración", "El trabajo"], "«Quítense de vosotros toda amargura, enojo, ira, gritería y maledicencia, y toda malicia».", "Efesios 4:31-32"],
    ["f44", 5, "o5", "comprender", "¿Cómo debemos perdonarnos, según Efesios 4:32?", "Como Dios también nos perdonó en Cristo", ["Solo si el otro lo merece", "Una sola vez", "Después de vengarnos"], "«perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo».", "Efesios 4:31-32"],
    ["f45", 5, "o5", "aplicar", "Dos líderes de tu iglesia están peleados y cada uno culpa al otro. ¿Qué paso das primero como consejero?", "Escuchar a cada uno por separado sin tomar partido antes de tiempo", ["Darle la razón al que llegó primero", "Expulsar a los dos", "Hablar del tema en el culto"], "Es el primer paso para ayudar a reconciliar.", "Mateo 5:23-24"],
    ["f46", 5, "o5", "aplicar", "En una reconciliación, uno pide perdón diciendo: perdón si te ofendí, pero tú empezaste. ¿Qué paso le falta?", "Pedir perdón con claridad y sin excusas", ["Ninguno", "Culpar más al otro", "Esperar a que el otro pida perdón primero"], "Se guía a cada uno a ver su propia parte y a pedir perdón sin excusas.", "Efesios 4:31-32"],
    ["f47", 5, "o5", "recordar", "¿Qué cuatro pasos propone Ken Sande en su libro Pacificadores para resolver un conflicto?", "Glorificar a Dios, sacar la viga del propio ojo, restaurar con mansedumbre y reconciliarse", ["Ganar, convencer, imponer y olvidar", "Callar, esperar, alejarse y olvidar", "Votar, decidir, castigar y seguir"], "Sande propone glorificar a Dios, sacar la viga del propio ojo (Mateo 7:5), restaurar con mansedumbre (Gálatas 6:1) y reconciliarse (Mateo 5:24).", "Romanos 12:18"],
    ["f48", 5, "o5", "evaluar", "Una persona dice que no puede perdonar porque el otro no ha cambiado. ¿Qué le enseñas?", "Que el perdón depende de ella; la reconciliación es la que necesita el cambio del otro", ["Que tiene razón: sin cambio no hay perdón", "Que debe olvidar todo", "Que debe volver a confiar enseguida"], "El perdón depende de ella; la reconciliación es la que necesita que el otro cambie: «Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", "Romanos 12:18"],
    ["f49", 5, "o5", "aplicar", "Una pareja se reconcilió, pero la confianza todavía es frágil. ¿Qué hace el consejero?", "Acompaña después, porque la confianza se reconstruye con el tiempo", ["Los deja solos enseguida", "Les dice que ya está todo resuelto", "Les pide que no hablen del tema"], "Es el último paso para ayudar a reconciliar.", "Efesios 4:31-32"],
    ["f50", 5, "o5", "analizar", "¿Por qué Romanos 12:18 dice en cuanto dependa de vosotros?", "Porque la paz no siempre depende de uno, pero lo que depende de uno sí se hace", ["Porque la paz no es importante", "Porque solo depende del otro", "Porque no hay que intentarlo"], "«Si es posible, en cuanto dependa de vosotros».", "Romanos 12:18"],
    // Lección 6 · Confidencialidad, derivación y límites
    ["f51", 6, "o6", "recordar", "¿Qué hace el que anda en chismes, según Proverbios 11:13?", "Descubre el secreto", ["Lo guarda", "Ora por él", "Lo olvida"], "«El que anda en chismes descubre el secreto».", "Proverbios 11:13"],
    ["f52", 6, "o6", "comprender", "¿Puede un pastor compartir con la iglesia, como motivo de oración, lo que oyó en consejería?", "No, sin el permiso de la persona", ["Sí, siempre", "Sí, si es con pocos", "Sí, si la persona no se entera"], "No sin el permiso de la persona: «El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f53", 6, "o6", "aplicar", "Un hombre le dice al pastor en consejería que planea hacer daño a su exesposa. ¿Qué hace el pastor?", "Rompe la confidencia para proteger a la persona en peligro y avisa a las autoridades", ["Lo guarda en secreto", "Espera a ver si lo hace", "Solo ora por él"], "«Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
    ["f54", 6, "o6", "aplicar", "Un caso de consejería supera claramente la preparación del pastor. ¿Qué hace?", "Lo deriva a un profesional y sigue acompañando en oración y en la vida de la iglesia", ["Sigue solo, aunque no sepa qué hacer", "Abandona a la persona", "Le dice que no tiene solución"], "Derivar no es abandonar.", "Proverbios 24:11"],
    ["f55", 6, "o6", "evaluar", "¿Qué conviene explicar al comienzo de una consulta de consejería pastoral?", "Qué se guarda en confidencia y qué no", ["Cuánto cuesta", "Qué opina el pastor de la persona", "Nada"], "Qué se guarda en confidencia y qué no, como el riesgo de que alguien se haga daño o el abuso de un menor; así la persona conoce desde el principio los límites de la confidencialidad.", "Proverbios 11:13"],
    ["f56", 6, "o6", "aplicar", "Un pastor aconseja a una mujer de noche, a solas y con la puerta cerrada. ¿Qué medida de protección olvida?", "Buscar horarios y lugares prudentes, con visibilidad o con otra persona presente", ["Ninguna", "Cobrar la consulta", "Llevar un registro"], "Las medidas protegen al aconsejado y al consejero.", "Proverbios 11:13"],
    ["f57", 6, "o6", "comprender", "¿Por qué el pastor deriva un caso cuando tiene una relación muy cercana con la persona?", "Porque puede haber un conflicto de intereses", ["Porque no le importa", "Porque así no trabaja", "Porque la persona no lo merece"], "Es una de las razones para derivar.", "Proverbios 24:11"],
    ["f58", 6, "o6", "recordar", "¿Qué manda Proverbios 24:11 ante los que están en peligro de muerte?", "Librarlos y salvarlos", ["Ignorarlos", "Juzgarlos", "Esperar"], "«Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
    ["f59", 6, "o6", "evaluar", "¿Qué abuso está obligada a denunciar toda persona que vive en Texas?", "La sospecha de abuso de un menor", ["Ninguno", "Solo los robos", "Solo lo que vea un policía"], "En Texas, toda persona que sospeche el abuso o el descuido de un menor está obligada a denunciarlo de inmediato, y la ley no exime a los pastores por la confidencialidad.", "Proverbios 24:11"],
    ["f60", 6, "o6", "analizar", "¿Qué resume la frase guardar un secreto es fidelidad; callar un peligro no lo es?", "Que la confidencialidad se guarda, pero tiene límites cuando hay vidas en riesgo", ["Que nunca hay que guardar secretos", "Que siempre hay que guardar todo", "Que el peligro no importa"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿De qué estaban llenos los creyentes de Roma, según Romanos 15:14?", "De bondad y de todo conocimiento", ["De dudas", "De riquezas", "De temor"], "«de que vosotros mismos estáis llenos de bondad, llenos de todo conocimiento».", "Romanos 15:14"],
      ["m1-02", 1, "o1", "comprender", "¿Qué propone Larry Crabb en su modelo de consejería?", "Una consejería bíblica que se vive en la iglesia local y llega a las necesidades profundas del corazón", ["Dejar la Biblia de lado", "Aconsejar solo con medicamentos", "Que solo aconsejen los pastores"], "Crabb, autor de El arte de aconsejar bíblicamente, propone una consejería bíblica que se vive en la iglesia local y llega a las necesidades profundas del corazón.", "Romanos 15:14"],
      ["m1-03", 1, "o1", "aplicar", "Un pastor quiere que más hermanos puedan acompañar a otros. ¿Qué le enseña Romanos 15:14?", "Que los creyentes pueden amonestarse unos a otros, y que él puede formarlos para hacerlo", ["Que solo él puede aconsejar", "Que nadie está preparado", "Que debe prohibirlo"], "«de tal manera que podéis amonestaros los unos a los otros».", "Romanos 15:14"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué el consejero escucha antes de hablar, según Isaías 50:4?", "Porque el siervo de Dios tiene el oído despierto para oír como los sabios", ["Porque no tiene nada que decir", "Porque hablar es pecado", "Porque así cobra más"], "«despertará mi oído para que oiga como los sabios».", "Isaías 50:4"],
      ["m1-05", 1, "o1", "recordar", "¿Qué hay en la multitud de consejeros, según Proverbios 11:14?", "Seguridad", ["Confusión", "Peligro", "Desorden"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["m1-06", 1, "o1", "evaluar", "Una hermana con un trauma pide consejo. ¿Cuál es la mejor respuesta del pastor?", "Acompañarla con la Palabra y derivarla también a un profesional de la salud", ["Decirle que olvide", "Decirle que es falta de fe", "No atenderla"], "El pastor sabe cuándo una persona necesita, además, la ayuda de un profesional.", "Proverbios 11:14"],
      ["m1-07", 2, "o2", "recordar", "¿Adónde fue la samaritana después de hablar con Jesús, según Juan 4:28?", "A la ciudad", ["Al templo", "A su casa a esconderse", "A otro pozo"], "«Entonces la mujer dejó su cántaro, y fue a la ciudad».", "Juan 4:28-29"],
      ["m1-08", 2, "o2", "comprender", "¿Qué significa decir la verdad con amor en la consejería pastoral?", "Nombrar el pecado sin humillar a la persona", ["Callar todo pecado", "Avergonzar a la persona", "Hablar solo de los demás"], "Es nombrar el pecado sin humillar, como Jesús con la samaritana: le habló de sus maridos sin despreciarla, y hasta reconoció «esto has dicho con verdad».", "Juan 4:16-18"],
      ["m1-09", 2, "o2", "aplicar", "Una mujer de otra cultura llega a la iglesia y nadie le habla. ¿Qué te enseña el ejemplo de Jesús?", "Acercarte y empezar la conversación, cruzando las barreras", ["Esperar a que ella hable primero", "Mandarla a otra iglesia", "Ignorarla"], "«Porque judíos y samaritanos no se tratan entre sí», y aun así Jesús le habló.", "Juan 4:7-10"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué Jesús esperó para hablar del pecado de la samaritana?", "Porque primero conectó con ella y la llevó a desear el agua viva", ["Porque no lo sabía", "Porque no le importaba", "Porque tenía miedo"], "«tú le pedirías, y él te daría agua viva».", "Juan 4:7-10"],
      ["m1-11", 2, "o2", "recordar", "¿Qué dijo la samaritana a los hombres de la ciudad, según Juan 4:29?", "Venid, ved a un hombre que me ha dicho todo cuanto he hecho", ["Huyan de ese hombre", "No vayan al pozo", "Nada"], "«Venid, ved a un hombre que me ha dicho todo cuanto he hecho. ¿No será éste el Cristo?».", "Juan 4:28-29"],
      ["m1-12", 2, "o2", "evaluar", "Un consejero resuelve todo por la persona y ella nunca da sus propios pasos. ¿Qué paso del método de Jesús falla?", "Dejar que la persona actúe", ["Acercarse", "Conectar", "Escuchar"], "La samaritana misma fue a contarlo a su ciudad.", "Juan 4:28-29"],
      ["m1-13", 3, "o3", "recordar", "¿De qué nos limpia Dios cuando confesamos, según 1 Juan 1:9?", "De toda maldad", ["De la memoria", "De las consecuencias", "De nada"], "«y limpiarnos de toda maldad».", "1 Juan 1:9"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es la culpa verdadera en la consejería pastoral?", "La que nace de un pecado real, que se confiesa y se repara", ["La que siente toda persona sin razón", "La que Dios ya perdonó", "La que viene de otros"], "Es la que nace de un pecado real; se confiesa a Dios, como David: «Mi pecado te declaré, y no encubrí mi iniquidad», y se repara cuando hace falta.", "Salmos 32:3-5"],
      ["m1-15", 3, "o3", "aplicar", "Un joven dice que Dios no puede perdonarlo por lo que hizo. ¿Qué le muestras primero?", "La promesa de 1 Juan 1:9: Dios es fiel y justo para perdonar al que confiesa", ["Que tiene razón", "Que debe hacer penitencia", "Que espere a sentirse mejor"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados».", "1 Juan 1:9"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué la tristeza del mundo produce muerte, según 2 Corintios 7:10?", "Porque hunde a la persona en sí misma en lugar de llevarla a Dios", ["Porque es muy corta", "Porque viene de Dios", "Porque produce arrepentimiento"], "Porque hunde a la persona en sí misma en vez de llevarla a Dios y al arrepentimiento: «pero la tristeza del mundo produce muerte».", "2 Corintios 7:10"],
      ["m1-17", 3, "o3", "aplicar", "Una hermana confiesa al pastor un pecado y teme que él lo cuente. ¿Qué hace el pastor?", "Guarda la confidencia, ora con ella y le anuncia el perdón", ["Lo cuenta a los ancianos sin permiso", "La aparta de la iglesia", "Le dice que se vaya"], "El pastor guarda la confidencia, salvo sus límites, como el riesgo para la vida o el abuso de un menor; ora con ella y le anuncia la promesa de 1 Juan 1:9.", "1 Juan 1:9"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué resume la frase la culpa se resuelve en la cruz, no en el castigo propio?", "Que el perdón viene de lo que Cristo hizo, no de castigarse uno mismo", ["Que hay que castigarse", "Que la culpa no importa", "Que la cruz no basta"], "«Y tú perdonaste la maldad de mi pecado».", "Salmos 32:3-5"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué guardará la paz de Dios, según Filipenses 4:7?", "Nuestros corazones y nuestros pensamientos en Cristo Jesús", ["Nuestras riquezas", "Nuestra fama", "Nuestras casas"], "«guardará vuestros corazones y vuestros pensamientos en Cristo Jesús».", "Filipenses 4:6-7"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué podemos echar nuestra ansiedad sobre Dios, según 1 Pedro 5:7?", "Porque él tiene cuidado de nosotros", ["Porque no le importa", "Porque así nos olvida", "Porque nos castiga"], "«porque él tiene cuidado de vosotros».", "1 Pedro 5:7"],
      ["m2-03", 4, "o4", "aplicar", "Un pastor quiere ayudar a un hermano ansioso. ¿Qué le ofrece primero?", "Escucharlo, orar con él y recordarle la invitación de Jesús a los cansados", ["Regañarlo", "Decirle que es pecado", "Mandarlo a callar"], "«Venid a mí todos los que estáis trabajados y cargados».", "Mateo 11:28"],
      ["m2-04", 4, "o4", "analizar", "¿Qué puede indicar una tristeza que dura más de dos semanas y afecta el sueño, el apetito o el trabajo?", "Una depresión que pide atención médica, además del acompañamiento pastoral", ["Que la persona tiene poca fe", "Que se acabará sola, sin ayuda", "Que debe dejar de orar"], "Una tristeza que dura más de dos semanas y afecta el sueño, el apetito o el trabajo es una de las señales de que hace falta ayuda médica.", "Salmos 42:5"],
      ["m2-05", 4, "o4", "recordar", "¿Qué número atiende las crisis emocionales y el riesgo de suicidio en Estados Unidos, también en español?", "El 988", ["El 411", "El 311", "El 611"], "El 988, la línea de crisis y prevención del suicidio, atiende de día y de noche, por teléfono o por mensaje, también en español.", "Mateo 11:28"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué error comete quien le dice a un deprimido que su problema es solo falta de fe?", "Lo carga más y le cierra la puerta a la ayuda que necesita", ["Ninguno", "Lo ayuda a sanar", "Le da la mejor respuesta"], "La depresión no siempre es fruto de un pecado, y la fe y la medicina no se oponen.", "Salmos 42:5"],
      ["m2-07", 5, "o5", "recordar", "¿Cómo debemos ser unos con otros, según Efesios 4:32?", "Benignos y misericordiosos, perdonándonos", ["Duros y distantes", "Indiferentes", "Exigentes"], "«Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros».", "Efesios 4:31-32"],
      ["m2-08", 5, "o5", "comprender", "¿Qué significa sacar primero la viga del propio ojo en un conflicto?", "Reconocer primero la propia parte de la culpa", ["Culpar primero al otro", "Ignorar el conflicto", "Ganar la discusión"], "Ken Sande toma la imagen de Mateo 7:5.", "Romanos 12:18"],
      ["m2-09", 5, "o5", "aplicar", "Un hermano quiere pedir perdón a otro, pero prefiere esperar a que el otro lo haga primero. ¿Qué le enseña Mateo 5:24?", "Que vaya él a reconciliarse primero", ["Que espere", "Que se olvide del tema", "Que lo resuelva el pastor"], "«anda, reconcíliate primero con tu hermano».", "Mateo 5:23-24"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué un consejero no toma partido antes de tiempo?", "Porque necesita escuchar a cada parte para ayudar con justicia", ["Porque no le importa", "Porque así no se compromete", "Porque siempre tienen razón los dos"], "Escuchar por separado es el primer paso de la reconciliación.", "Mateo 5:23-24"],
      ["m2-11", 5, "o5", "recordar", "¿Qué se debe quitar además de la amargura, según Efesios 4:31?", "El enojo, la ira, la gritería, la maledicencia y toda malicia", ["La alegría", "La paciencia", "El amor"], "«Quítense de vosotros toda amargura, enojo, ira, gritería y maledicencia, y toda malicia».", "Efesios 4:31-32"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué nunca debe pedirle un pastor a una víctima de abuso?", "Que vuelva a una situación de violencia", ["Que ore", "Que busque ayuda", "Que se cuide"], "Que vuelva a una situación de violencia: una víctima puede perdonar sin volver a ponerse en peligro, y su seguridad va primero.", "Romanos 12:18"],
      ["m2-13", 6, "o6", "recordar", "¿Qué hace el de espíritu fiel, según Proverbios 11:13?", "Lo guarda todo", ["Lo cuenta todo", "Lo olvida todo", "Lo escribe todo"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué derivar a un profesional no es abandonar a la persona?", "Porque el pastor sigue acompañando en oración y en la vida de la iglesia", ["Porque el pastor se olvida del caso", "Porque así no trabaja", "Porque el profesional reemplaza a la iglesia"], "El profesional atiende lo que le toca, y el pastor sigue acompañando a la persona en oración y en la vida de la iglesia.", "Proverbios 24:11"],
      ["m2-15", 6, "o6", "aplicar", "Un pastor anota todo lo que oye en consejería en una libreta que deja en el auto. ¿Qué medida de protección falta?", "Anotar solo lo esencial con discreción y guardarlo en un lugar seguro", ["Ninguna", "Anotar más detalles", "Compartir la libreta con los ancianos"], "Las notas de consejería se reducen a lo esencial y se guardan en un lugar seguro: «el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la confidencialidad tiene límites cuando hay peligro?", "Porque callar dejaría a alguien en peligro de muerte", ["Porque el pastor no es de fiar", "Porque los secretos no importan", "Porque la ley no deja guardar nada"], "«Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
      ["m2-17", 6, "o6", "recordar", "¿Cuál de estas situaciones es una razón para derivar a un profesional?", "Que haya violencia en el hogar o asuntos legales", ["Que la persona llore", "Que la persona sea nueva", "Que el caso sea corto"], "Se deriva cuando hay violencia en el hogar o asuntos legales, y también cuando hay riesgo para la vida, una enfermedad mental o una adicción.", "Proverbios 24:11"],
      ["m2-18", 6, "o6", "evaluar", "¿A quiénes protegen las medidas de prudencia en la consejería pastoral?", "Al aconsejado y al consejero", ["Solo al consejero", "Solo la imagen de la iglesia", "A nadie"], "Protegen al aconsejado y al consejero; por eso se aconseja en lugares con visibilidad y en horarios prudentes.", "Proverbios 11:13"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "pastoral-2-e1",
      tipo: "corta",
      pregunta: "Explica qué es la consejería pastoral y cuándo el pastor necesita derivar a un profesional.",
      ideas: [
        { id: "definicion", peso: 30, texto: "La Palabra aplicada a una persona para que madure en Cristo.", formas: ["la palabra", "madure en cristo", "perfecto en cristo", "aplicada", "amonestar"] },
        { id: "no_profesional", peso: 30, texto: "El pastor no es médico ni psicólogo.", formas: ["no es medico", "no es psicologo", "profesional", "medico", "psicologo"] },
        { id: "cuando", peso: 30, texto: "Deriva ante depresión grave, adicción, trauma o riesgo para la vida.", formas: ["depresion", "adiccion", "trauma", "riesgo", "suicid*"] },
      ],
      citas: ["Colosenses 1:28", "Romanos 15:14", "Proverbios 11:14", "Isaías 50:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La consejería pastoral es la Palabra aplicada a una persona en su situación, para presentarla perfecta en Cristo (Colosenses 1:28). El pastor no es médico ni psicólogo, y deriva a un profesional cuando hay una depresión grave, una adicción, un trauma o un riesgo para la vida, porque en la multitud de consejeros hay seguridad.",
    },
    {
      id: "pastoral-2-e2",
      tipo: "corta",
      pregunta: "Explica dos pasos del método de Jesús con la mujer samaritana y cómo los aplicarías en una consulta.",
      ideas: [
        { id: "paso1", peso: 30, texto: "Acercarse y conectar desde lo cotidiano.", formas: ["dame de beber", "se acerco", "acercarse", "conectar", "cotidiano", "el agua"] },
        { id: "paso2", peso: 30, texto: "Decir la verdad con amor y señalar a Dios.", formas: ["la verdad", "sin humillar", "agua viva", "al padre", "señalar a dios", "senalar a dios", "lo profundo"] },
        { id: "aplicacion", peso: 30, texto: "Aplicarlo: escuchar antes de hablar, iluminar con la Palabra y acordar un paso.", formas: ["escuchar", "escucho", "la palabra", "acordar", "un paso", "acompanar"] },
      ],
      citas: ["Juan 4:7-10", "Juan 4:7", "Juan 4:16-18", "Juan 4:18", "Juan 4:28-29", "Juan 4:23-24"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús se acercó a la samaritana y conectó desde lo cotidiano: dame de beber (Juan 4:7). Después le dijo la verdad sin humillarla y la llevó a lo profundo, al agua viva. En una consulta, escucharía antes de hablar, partiría de su necesidad, iluminaría con la Palabra lo que haya que nombrar y acordaríamos un paso concreto.",
    },
    {
      id: "pastoral-2-e3",
      tipo: "corta",
      pregunta: "Explica la diferencia entre la culpa verdadera y la falsa culpa, y cómo acompañarías cada una.",
      ideas: [
        { id: "verdadera", peso: 30, texto: "La culpa verdadera nace de un pecado real: se confiesa, se repara y se recibe el perdón.", formas: ["pecado real", "confiesa", "confesar", "reparar", "repara"] },
        { id: "falsa", peso: 30, texto: "La falsa culpa: culparse por lo que no fue pecado, o por lo que Dios ya perdonó.", formas: ["no fue pecado", "ya perdono", "falsa culpa"] },
        { id: "perdon", peso: 30, texto: "Dios es fiel y justo para perdonar.", formas: ["fiel y justo", "perdonar", "perdon", "la verdad"] },
      ],
      citas: ["1 Juan 1:9", "Salmos 32:3-5", "Salmos 32:5", "2 Corintios 7:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La culpa verdadera nace de un pecado real: la acompañaría a confesarlo a Dios, reparar el daño y recibir el perdón, porque Dios es fiel y justo para perdonar (1 Juan 1:9). La falsa culpa es culparse por lo que no fue pecado o por lo que Dios ya perdonó: la enfrentaría con la verdad de la Palabra.",
    },
    {
      id: "pastoral-2-e4",
      tipo: "breve",
      pregunta:
        "Un hermano de tu iglesia está deprimido y dice que ya no tiene fuerzas para vivir. Explica cómo lo acompañarías, con la Escritura y con la ayuda adecuada, con citas bíblicas.",
      ideas: [
        { id: "urgencia", peso: 30, texto: "Ante el riesgo de suicidio, no dejarlo solo y buscar ayuda de inmediato.", formas: ["no lo dejaria solo", "no dejarlo solo", "de inmediato", "988", "emergencia", "ayuda inmediata"] },
        { id: "palabra", peso: 25, texto: "Acompañarlo con la Palabra: los fieles también conocieron el abatimiento.", formas: ["abates", "abatimiento", "espera en dios", "trabajados y cargados", "os hare descansar", "ansiedad sobre el"] },
        { id: "medico", peso: 25, texto: "Ayuda médica: ir al médico no es falta de fe.", formas: ["medico", "medicamento", "terapia", "profesional", "no es falta de fe"] },
        { id: "acompanar", peso: 20, texto: "Seguir acompañando con oración y con la iglesia.", formas: ["acompanar", "acompanaria", "orar con el", "oraria", "la iglesia", "seguir"] },
      ],
      basta: 85,
      citas: ["Salmos 42:5", "Mateo 11:28", "1 Pedro 5:7", "Filipenses 4:6-7", "Proverbios 24:11", "1 Reyes 19:4-5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero, si dice que ya no tiene fuerzas para vivir, no lo dejaría solo: buscaríamos ayuda de inmediato, y en Estados Unidos llamaríamos o escribiríamos juntos al 988. Luego lo acompañaría con la Palabra: los fieles también conocieron el abatimiento, y el salmista se decía ¿por qué te abates, oh alma mía? Espera en Dios (Salmos 42:5). Le recordaría que Jesús invita a los trabajados y cargados y que podemos echar nuestra ansiedad sobre él. Lo animaría a ver a un médico y a seguir el tratamiento, porque ir al médico no es falta de fe y la depresión no siempre es fruto de un pecado. Y seguiría a su lado: oraría con él, lo visitaría y le pediría a la iglesia que lo rodee de amor.",
    },
    {
      id: "pastoral-2-e5",
      tipo: "breve",
      pregunta:
        "Dos hermanos de tu iglesia están enfrentados desde hace meses. Explica cómo los ayudarías a reconciliarse y qué diferencia harías entre perdonar y reconciliarse, con citas bíblicas.",
      ideas: [
        { id: "prioridad", peso: 20, texto: "La reconciliación es prioridad, antes que la ofrenda.", formas: ["antes que la ofrenda", "antes de la ofrenda", "antes de presentar la ofrenda", "reconciliate primero", "reconciliarse primero", "primero a reconciliarse", "deja alli tu ofrenda", "primero con tu hermano"] },
        { id: "pasos", peso: 30, texto: "Escuchar por separado, ver la propia culpa, pedir perdón y perdonar.", formas: ["por separado", "propia culpa", "su propia parte", "pedir perdon", "sin excusas", "la viga"] },
        { id: "seguimiento", peso: 15, texto: "Acordar pasos y acompañar.", formas: ["pasos concretos", "acompanar", "acompanaria", "confianza"] },
        { id: "diferencia", peso: 35, texto: "El perdón depende de uno; la reconciliación necesita a los dos y un cambio.", formas: ["depende de uno", "depende de cada uno", "necesita a los dos", "los dos", "un cambio"] },
      ],
      basta: 85,
      citas: ["Mateo 5:23-24", "Mateo 5:24", "Romanos 12:18", "Efesios 4:31-32", "Efesios 4:32", "Mateo 7:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Les recordaría que Jesús puso la reconciliación antes que la ofrenda: reconcíliate primero con tu hermano (Mateo 5:24). Escucharía a cada uno por separado, sin tomar partido antes de tiempo, y ayudaría a cada uno a ver primero su propia parte de la culpa, a sacar la viga del propio ojo. Luego los guiaría a pedir perdón con claridad y sin excusas, y a perdonar como Dios nos perdonó en Cristo (Efesios 4:32). Acordaríamos pasos concretos para reparar el daño, y los acompañaría después, porque la confianza se reconstruye con el tiempo. También les explicaría la diferencia: el perdón depende de uno y se da porque Dios nos perdonó; la reconciliación necesita a los dos y un cambio real.",
    },
  ],
  breve: {
    id: "pastoral-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo llevarías una consulta pastoral de principio a fin, desde la primera conversación hasta el seguimiento, con sus límites y con citas bíblicas.",
    ideas: [
      { id: "escuchar", peso: 20, texto: "Escuchar primero, como Jesús con la samaritana.", formas: ["escuchar", "escucharia", "samaritana", "oido", "lengua de sabios"] },
      { id: "palabra", peso: 20, texto: "Iluminar con la Palabra y decir la verdad con amor.", formas: ["la palabra", "la verdad", "con amor", "sin humillar"] },
      { id: "plan", peso: 15, texto: "Orar y acordar un paso concreto.", formas: ["orar", "oraria", "un paso", "acordar", "acordariamos"] },
      { id: "confidencialidad", peso: 20, texto: "Guardar la confidencia, con sus límites.", formas: ["confidencia", "confidencialidad", "guardar", "secreto", "limites"] },
      { id: "derivar", peso: 15, texto: "Derivar cuando haga falta.", formas: ["derivar", "derivaria", "profesional", "medico"] },
      { id: "seguimiento", peso: 10, texto: "Acompañar después.", formas: ["acompanar", "acompanaria", "seguimiento", "despues"] },
    ],
    basta: 85,
    citas: ["Isaías 50:4", "Juan 4:7-10", "Juan 4:16-18", "Colosenses 1:28", "Proverbios 11:13", "Proverbios 24:11", "Proverbios 11:14", "1 Juan 1:9"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría explicando qué guardaré en confidencia y qué no, porque el de espíritu fiel lo guarda todo (Proverbios 11:13), pero hay límites cuando una vida está en peligro. Luego escucharía, como el siervo que tiene el oído despierto (Isaías 50:4) y como Jesús con la samaritana, partiendo de la necesidad de la persona. Después iluminaría su situación con la Palabra y diría con amor la verdad que haga falta, sin humillar. Oraríamos juntos y acordaríamos un paso concreto. Si el caso lo pide, por una depresión grave, una adicción o un peligro, lo derivaría a un profesional, sin dejar de acompañar. Y haría el seguimiento: volvería a verla, oraría por ella y la rodearía con la iglesia, para presentarla perfecta en Cristo.",
  },
};
