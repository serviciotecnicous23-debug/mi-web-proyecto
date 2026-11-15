/**
 * El banco de «Cuidado y consejería básica» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el cuidado mutuo y los niveles de ayuda · o2 escuchar · o3 orar con otros y aconsejar con la Palabra ·
 * o4 acompañar en el duelo y en la crisis · o5 cuándo derivar, el riesgo de suicidio y el abuso · o6 la confidencialidad,
 * la prudencia y el cuidado de uno mismo · o7 el versículo de memoria (Gálatas 6:2).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-consejeria-basica-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_CONSEJERIA_BASICA: BancoMateria = {
  materia: "n3-consejeria-basica",
  repaso: {
    "n3-consejeria-basica-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué manda Gálatas 6:2?", "Sobrellevar los unos las cargas de los otros", ["Que cada uno lleve solo su carga", "Que solo el pastor cuide a los demás", "Que evitemos los problemas ajenos"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
      ["1-r2", 1, "o1", "comprender", "Según 2 Corintios 1:4, ¿para qué nos consuela Dios?", "Para que también nosotros podamos consolar a otros", ["Para que no necesitemos a nadie", "Para que olvidemos a los que sufren", "Para que nunca suframos"], "«para que podamos también nosotros consolar a los que están en cualquier tribulación».", "2 Corintios 1:4"],
      ["1-r3", 1, "o1", "comprender", "¿Cuáles son los tres niveles de ayuda que presenta la materia?", "El cuidado entre hermanos, la consejería pastoral y la ayuda profesional", ["La oración, el ayuno y la ofrenda", "El templo, la casa y la calle", "Los niños, los jóvenes y los adultos"], "Todo creyente maduro puede animar y aconsejar, y también debe conocer sus límites.", "Romanos 15:14"],
    ] as P[]).map(p),
    "n3-consejeria-basica-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué pide Santiago 1:19?", "Ser pronto para oír, tardo para hablar y tardo para airarse", ["Ser pronto para hablar", "Hablar más que escuchar", "Responder antes de oír"], "«todo hombre sea pronto para oír, tardo para hablar, tardo para airarse».", "Santiago 1:19"],
      ["2-r2", 2, "o2", "comprender", "¿Qué hizo Jesús con los discípulos de Emaús antes de enseñarles?", "Les preguntó qué les pasaba y los escuchó", ["Los regañó por su tristeza", "Les dio un sermón largo", "Los dejó solos"], "«¿Qué pláticas son estas que tenéis entre vosotros mientras camináis, y por qué estáis tristes?».", "Lucas 24:17"],
      ["2-r3", 2, "o2", "aplicar", "¿Cuál de estas es una pregunta abierta?", "¿Cómo te sientes con lo que pasó?", ["¿Estás triste?", "¿Ya oraste?", "¿Fue tu culpa?"], "Las buenas preguntas sacan a la luz lo que hay en el corazón, como aguas profundas.", "Proverbios 20:5"],
    ] as P[]).map(p),
    "n3-consejeria-basica-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué dice Santiago 5:16 sobre la oración?", "La oración eficaz del justo puede mucho", ["La oración no cambia nada", "Solo oran los pastores", "Solo se ora en el templo"], "«orad unos por otros, para que seáis sanados. La oración eficaz del justo puede mucho».", "Santiago 5:16"],
      ["3-r2", 3, "o3", "aplicar", "¿Qué conviene hacer antes de orar con una persona?", "Pedirle permiso", ["Imponerle la oración", "Predicarle un sermón", "Contar su problema a otros"], "Orar con alguien, con respeto, le recuerda que Dios escucha.", "Santiago 5:16"],
      ["3-r3", 3, "o3", "comprender", "¿Se oponen la oración y la ayuda médica?", "No: oramos y confiamos en Dios, y también se siguen las indicaciones del médico", ["Sí: ir al médico es falta de fe", "Sí: solo vale la medicina", "No importa ninguna de las dos"], "Lucas era «el médico amado».", "Colosenses 4:14"],
    ] as P[]).map(p),
    "n3-consejeria-basica-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué hizo Jesús ante la tumba de Lázaro?", "Lloró", ["Se rió", "Se fue", "Regañó a María"], "«Jesús lloró».", "Juan 11:35"],
      ["4-r2", 4, "o4", "comprender", "¿Qué enseña 1 Tesalonicenses 4:13 sobre el duelo?", "Que los creyentes lloran, pero no como los que no tienen esperanza", ["Que los creyentes nunca deben llorar", "Que el duelo es pecado", "Que no hay esperanza"], "«para que no os entristezcáis como los otros que no tienen esperanza».", "1 Tesalonicenses 4:13"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué ayuda más a una familia en duelo?", "Estar presente, escuchar y ayudar en lo práctico", ["Decir que Dios necesitaba otro ángel", "Apurarla para que lo supere", "Contar tus propias pérdidas sin parar"], "«Cercano está Jehová a los quebrantados de corazón».", "Salmos 34:18"],
    ] as P[]).map(p),
    "n3-consejeria-basica-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijo Jetro a Moisés?", "No está bien lo que haces", ["Hazlo todo tú solo", "Abandona al pueblo", "No escuches a nadie"], "«Entonces el suegro de Moisés le dijo: No está bien lo que haces».", "Éxodo 18:17"],
      ["5-r2", 5, "o5", "evaluar", "Alguien de tu grupo dice que quiere quitarse la vida. ¿Qué haces?", "Lo tomas en serio, no lo dejas solo y buscas ayuda de inmediato", ["Lo guardas en secreto", "Le dices que no exagere", "Esperas a ver si se le pasa"], "«Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
      ["5-r3", 5, "o5", "comprender", "¿Qué se hace si se sospecha el abuso de un menor?", "Se protege al menor y se avisa a las autoridades", ["Se guarda en secreto", "Se arregla con una oración", "Se habla solo con el abusador"], "La autoridad «es servidor de Dios para tu bien».", "Romanos 13:4"],
    ] as P[]).map(p),
    "n3-consejeria-basica-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hace el de espíritu fiel, según Proverbios 11:13?", "Guarda el secreto", ["Lo cuenta como motivo de oración", "Lo publica", "Lo usa contra la persona"], "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
      ["6-r2", 6, "o6", "comprender", "¿Cuándo no se guarda el secreto?", "Cuando hay peligro para la vida o abuso de un menor u otra persona vulnerable", ["Nunca: siempre se guarda", "Cuando el tema es aburrido", "Cuando otros preguntan"], "Hay que librar a los que están en peligro de muerte.", "Proverbios 24:11"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué les dijo Jesús a sus discípulos cansados?", "Venid vosotros aparte a un lugar desierto, y descansad un poco", ["Trabajad más", "No os quejéis", "Id solos a otra ciudad"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el cuidado mutuo (10)
    ["f01", 1, "o1", "recordar", "Según Gálatas 6:2, ¿qué cumplimos al sobrellevar las cargas de otros?", "La ley de Cristo", ["La ley de Moisés", "Las reglas del templo", "Una obligación del pastor"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
    ["f02", 1, "o1", "comprender", "¿De quién es la tarea de cuidar a los hermanos?", "De todo el cuerpo de Cristo, no solo del pastor", ["Solo del pastor", "Solo de los psicólogos", "De nadie: cada uno se cuida solo"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
    ["f03", 1, "o1", "recordar", "¿Cómo llama 2 Corintios 1:3 a Dios?", "Padre de misericordias y Dios de toda consolación", ["Dios de la venganza", "Juez sin compasión", "Dios lejano"], "«Padre de misericordias y Dios de toda consolación».", "2 Corintios 1:3"],
    ["f04", 1, "o1", "comprender", "¿De dónde viene el consuelo que damos a otros?", "Del consuelo que nosotros mismos recibimos de Dios", ["De nuestra propia fuerza", "De los libros de autoayuda", "De no haber sufrido nunca"], "«por medio de la consolación con que nosotros somos consolados por Dios».", "2 Corintios 1:4"],
    ["f05", 1, "o1", "analizar", "¿Qué diferencia hay entre el cuidado entre hermanos y la ayuda profesional?", "El cuidado entre hermanos escucha, ora y acompaña; la ayuda profesional atiende lo que pide una formación especial", ["No hay ninguna diferencia", "La ayuda profesional es pecado", "El cuidado entre hermanos lo resuelve todo"], "Todo creyente puede amonestar a otros, pero también debe conocer sus límites.", "Romanos 15:14"],
    ["f06", 1, "o1", "aplicar", "¿Cuál de estos casos pide la consejería pastoral?", "Una crisis seria en un matrimonio", ["Saludar a un visitante", "Orar por un examen", "Invitar a alguien a la iglesia"], "Los asuntos graves pasan a quien está más preparado, como aconsejó Jetro.", "Éxodo 18:22"],
    ["f07", 1, "o1", "recordar", "Según Romanos 15:14, ¿qué podían hacer los creyentes de Roma?", "Amonestarse los unos a los otros", ["Juzgarse los unos a los otros", "Ignorarse", "Esperar solo al apóstol"], "«de tal manera que podéis amonestaros los unos a los otros».", "Romanos 15:14"],
    ["f08", 1, "o1", "evaluar", "Un hermano le dice a otro que tiene depresión que deje sus medicinas porque solo necesita orar. ¿Qué dice la lección?", "Se equivoca: no diagnosticamos ni reemplazamos al médico", ["Tiene razón", "También debería dejar de ir a la iglesia", "Debería buscar otro diagnóstico en internet"], "Todo creyente puede animar, pero debe saber hasta dónde llega. Lucas era «el médico amado».", "Colosenses 4:14"],
    ["f09", 1, "o1", "recordar", "¿Cómo llamó Isaías al Mesías, entre otros nombres?", "Admirable, Consejero", ["Juez Severo", "Rey Guerrero", "Maestro Distante"], "«y se llamará su nombre Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz».", "Isaías 9:6"],
    ["f10", 1, "o7", "recordar", "Completa Gálatas 6:2: Sobrellevad los unos las cargas de los otros…", "y cumplid así la ley de Cristo", ["y no os canséis de hacer el bien", "y seréis bienaventurados", "para que nadie se gloríe"], "Es el versículo de memoria de la materia.", "Gálatas 6:2"],
    // ---- lección 2: escuchar como Jesús (10)
    ["f11", 2, "o2", "recordar", "¿Qué dice Proverbios 18:13 del que responde antes de oír?", "Que le es fatuidad y oprobio", ["Que es sabio", "Que ahorra tiempo", "Que es valiente"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
    ["f12", 2, "o2", "comprender", "¿Por qué escuchar es el primer paso para ayudar?", "Porque antes de aconsejar hay que entender lo que la persona vive", ["Porque así se termina más rápido", "Porque no importa lo que se diga después", "Porque escuchar reemplaza la oración"], "Hay que ser pronto para oír y tardo para hablar.", "Santiago 1:19"],
    ["f13", 2, "o2", "recordar", "¿A quiénes acompañó Jesús camino a Emaús?", "A dos discípulos tristes", ["A los doce apóstoles", "A los fariseos", "A una multitud"], "«¿Qué pláticas son estas que tenéis entre vosotros mientras camináis, y por qué estáis tristes?».", "Lucas 24:17"],
    ["f14", 2, "o2", "comprender", "¿Qué enseña Proverbios 20:5 sobre el corazón?", "Que el consejo está en el corazón como aguas profundas, y el entendido lo alcanza", ["Que el corazón no se puede conocer nunca", "Que basta con mirar a la persona", "Que no hay que preguntar nada"], "«Como aguas profundas es el consejo en el corazón del hombre; Mas el hombre entendido lo alcanzará».", "Proverbios 20:5"],
    ["f15", 2, "o2", "aplicar", "¿Qué significa reflejar lo que oyes?", "Repetir con tus palabras lo que entendiste, para que la persona sepa que la escuchas", ["Repetir palabra por palabra lo que dice", "Cambiar de tema", "Contar lo que tú harías"], "Escuchar con atención es una forma de amar, como pide Santiago.", "Santiago 1:19"],
    ["f16", 2, "o2", "aplicar", "¿Qué conviene hacer con el teléfono al escuchar a alguien?", "Guardarlo y darle a la persona toda la atención", ["Contestar mensajes mientras habla", "Grabar la conversación sin avisar", "Buscar versículos todo el tiempo"], "Hay que ser pronto para oír.", "Santiago 1:19"],
    ["f17", 2, "o2", "comprender", "¿Qué pide Romanos 12:15?", "Gozarse con los que se gozan y llorar con los que lloran", ["Corregir a los que lloran", "Evitar a los que sufren", "Reírse de todo"], "«Gozaos con los que se gozan; llorad con los que lloran».", "Romanos 12:15"],
    ["f18", 2, "o2", "analizar", "¿Qué hicieron bien y qué hicieron mal los amigos de Job?", "Bien: se sentaron con él en silencio; mal: después hablaron sin entender y lo culparon", ["Todo lo hicieron bien", "Todo lo hicieron mal", "Bien: lo culparon; mal: lo visitaron"], "«Así se sentaron con él en tierra por siete días y siete noches, y ninguno le hablaba palabra, porque veían que su dolor era muy grande».", "Job 2:13"],
    ["f19", 2, "o2", "evaluar", "Una hermana cuenta que perdió su trabajo, y alguien le responde enseguida con tres consejos y su propia historia. ¿Qué error cometió?", "Se apuró a dar soluciones y habló de sí mismo en vez de escuchar", ["Ninguno: eso es ayudar", "Le faltó contar más historias", "Debió quedarse callado y no volver a verla"], "«Al que responde palabra antes de oír, Le es fatuidad y oprobio».", "Proverbios 18:13"],
    ["f20", 2, "o2", "aplicar", "¿Qué hacer con las emociones de la persona, como la tristeza o el enojo?", "Aceptarlas sin juzgarlas", ["Regañarla por sentirlas", "Decirle que no debe sentir eso", "Cambiar de tema"], "Llorad con los que lloran.", "Romanos 12:15"],
    // ---- lección 3: orar con otros y aconsejar con la Palabra (10)
    ["f21", 3, "o3", "recordar", "¿Qué debe hacer el enfermo, según Santiago 5:14?", "Llamar a los ancianos de la iglesia para que oren por él", ["Esconder su enfermedad", "Esperar solo", "Dejar de orar"], "«¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:14"],
    ["f22", 3, "o3", "comprender", "¿Por qué ayuda orar con la persona y no solo por ella?", "Porque le recuerda que no está sola y que Dios escucha", ["Porque así se termina antes", "Porque la oración en privado no sirve", "Porque así uno queda bien"], "Orad unos por otros: la oración eficaz del justo puede mucho.", "Santiago 5:16"],
    ["f23", 3, "o3", "aplicar", "¿Cómo conviene orar con alguien que sufre?", "Corto y sencillo, presentando a Dios lo que la persona contó", ["Largo y con palabras difíciles", "Aprovechando para regañarla", "Contando sus secretos delante de otros"], "Presentad vuestras peticiones delante de Dios en toda oración y ruego.", "Filipenses 4:6"],
    ["f24", 3, "o3", "recordar", "¿Qué promete Filipenses 4:7 a los que oran?", "Que la paz de Dios guardará sus corazones y sus pensamientos", ["Que nunca tendrán problemas", "Que serán ricos", "Que todo saldrá como quieren"], "«Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús».", "Filipenses 4:7"],
    ["f25", 3, "o3", "comprender", "¿Qué enseña Proverbios 25:11 sobre las palabras?", "Que la palabra dicha como conviene es valiosa, como manzana de oro con figuras de plata", ["Que hay que hablar mucho", "Que las palabras no importan", "Que hay que decir todo lo que se piensa"], "«Manzana de oro con figuras de plata Es la palabra dicha como conviene».", "Proverbios 25:11"],
    ["f26", 3, "o3", "evaluar", "¿Cuál es la mejor manera de usar la Biblia al aconsejar?", "Escoger pocos pasajes, después de escuchar, y explicarlos con amor", ["Lanzar muchos versículos sin escuchar", "No usar nunca la Biblia", "Usar los versículos para regañar"], "La palabra dicha como conviene es como manzana de oro.", "Proverbios 25:11"],
    ["f27", 3, "o3", "recordar", "¿Qué profesión tenía Lucas, según Colosenses 4:14?", "Era médico", ["Era pescador", "Era cobrador de impuestos", "Hacía tiendas"], "«Os saluda Lucas el médico amado».", "Colosenses 4:14"],
    ["f28", 3, "o3", "comprender", "¿Qué muestra 1 Timoteo 5:23 sobre la salud de Timoteo?", "Que Pablo le recomendó un remedio para su estómago y sus enfermedades", ["Que Pablo le prohibió cuidar su salud", "Que Timoteo nunca se enfermaba", "Que su enfermedad era un castigo por su pecado"], "Pablo no vio contradicción entre la fe y cuidar la salud.", "1 Timoteo 5:23"],
    ["f29", 3, "o3", "evaluar", "Alguien sigue enfermo después de mucha oración. ¿Qué no se le debe decir?", "Que sigue enfermo porque le falta fe", ["Que vas a seguir orando por él", "Que Dios lo ama", "Que no está solo"], "Pablo mismo dejó enfermo a Trófimo en Mileto.", "2 Timoteo 4:20"],
    ["f30", 3, "o3", "aplicar", "Una persona tiene mucha ansiedad. ¿Qué pasaje sería apropiado compartirle, después de escucharla?", "Filipenses 4:6-7", ["Levítico 11", "Números 1", "1 Crónicas 1"], "«Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias».", "Filipenses 4:6"],
    // ---- lección 4: el duelo y la crisis (10)
    ["f31", 4, "o4", "recordar", "¿Qué le dijo María a Jesús cuando llegó a Betania?", "Señor, si hubieses estado aquí, no habría muerto mi hermano", ["Sabía que no vendrías", "Ya no hay nada que hacer", "Vete, no te necesitamos"], "«Señor, si hubieses estado aquí, no habría muerto mi hermano».", "Juan 11:32"],
    ["f32", 4, "o4", "analizar", "¿Qué enseña que Jesús llorara aunque iba a resucitar a Lázaro?", "Que llorar no es falta de fe y que Jesús se conmueve con nuestro dolor", ["Que Jesús dudaba de su poder", "Que no hay que esperar nada de Dios", "Que el duelo es pecado"], "«Jesús lloró».", "Juan 11:35"],
    ["f33", 4, "o4", "comprender", "¿Cómo lloran los creyentes la muerte de un ser querido?", "Con tristeza, pero con la esperanza de la resurrección", ["Sin ninguna tristeza", "Sin esperanza", "Con enojo contra Dios para siempre"], "«para que no os entristezcáis como los otros que no tienen esperanza».", "1 Tesalonicenses 4:13"],
    ["f34", 4, "o4", "aplicar", "¿Cuál es una ayuda práctica para una familia en duelo?", "Llevar comida, ayudar con el transporte o cuidar a los niños", ["Darle un sermón largo", "Decirle que ya lo superará", "Contarle todas tus pérdidas"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
    ["f35", 4, "o4", "evaluar", "¿Cuál de estas frases conviene evitar con alguien en duelo?", "Dios necesitaba otro ángel", ["Estoy aquí contigo", "¿Quieres contarme de tu mamá?", "¿Puedo orar contigo?"], "Las frases hechas duelen. Dios está cerca de los quebrantados de corazón.", "Salmos 34:18"],
    ["f36", 4, "o4", "comprender", "¿Por qué conviene volver a visitar semanas y meses después?", "Porque el duelo lleva tiempo y muchos se van después de los primeros días", ["Porque a la semana ya pasó", "Para cobrar la ayuda dada", "Porque es una obligación"], "Jehová sigue cerca de los quebrantados de corazón.", "Salmos 34:18"],
    ["f37", 4, "o4", "recordar", "¿Qué pidió Elías debajo del enebro?", "Basta ya, oh Jehová, quítame la vida", ["Dame fuego del cielo", "Dame un ejército", "Llévame a Jerusalén"], "«y deseando morirse, dijo: Basta ya, oh Jehová, quítame la vida, pues no soy yo mejor que mis padres».", "1 Reyes 19:4"],
    ["f38", 4, "o4", "analizar", "¿Qué hizo Dios primero con Elías agotado?", "Lo dejó dormir y le dio de comer", ["Lo regañó por su miedo", "Lo envió a pelear enseguida", "Lo dejó solo"], "Un ángel le dijo que se levantara y comiera; Elías comió, bebió y volvió a dormirse.", "1 Reyes 19:5-6"],
    ["f39", 4, "o4", "aplicar", "¿Qué es lo primero en una crisis, como un accidente o una pérdida grave?", "Que la persona esté a salvo, calmada y acompañada", ["Explicarle por qué pasó", "Darle una lista de versículos", "Buscar culpables"], "Dios cuidó primero lo básico de Elías.", "1 Reyes 19:5"],
    ["f40", 4, "o4", "evaluar", "Una persona en duelo dice, meses después, que ya no quiere vivir. ¿Qué haces?", "Lo tomas en serio y buscas ayuda de inmediato", ["Le dices que es normal y no haces nada", "Lo guardas en secreto", "Le dices que ore más y te vas"], "«Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
    // ---- lección 5: derivar y proteger (10)
    ["f41", 5, "o5", "comprender", "¿Qué significa derivar a una persona?", "Buscarle una ayuda más preparada, como el pastor o un profesional, y seguir acompañándola", ["Abandonarla", "Contar su problema a todos", "Decirle que no tiene solución"], "Moisés necesitó ayuda: el trabajo era demasiado pesado para él solo.", "Éxodo 18:18"],
    ["f42", 5, "o5", "recordar", "¿Qué hay en la multitud de consejeros, según Proverbios 11:14?", "Seguridad", ["Confusión", "Pérdida de tiempo", "Orgullo"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f43", 5, "o5", "aplicar", "¿Cuál de estas situaciones pide derivar?", "Una adicción que la persona no logra dejar", ["Una duda sobre qué capítulo leer", "Un mal día en el trabajo", "Una pregunta sobre el horario del culto"], "En la multitud de consejeros hay seguridad.", "Proverbios 11:14"],
    ["f44", 5, "o5", "comprender", "¿Preguntarle a alguien si piensa en hacerse daño le da la idea?", "No: preguntar con calma no le da la idea y puede salvarle la vida", ["Sí: nunca hay que preguntar", "Sí, y además es pecado", "Da igual preguntar o no"], "Hay que salvar a los que están en peligro de muerte.", "Proverbios 24:11"],
    ["f45", 5, "o5", "recordar", "En los Estados Unidos, ¿a qué número se llama si hay peligro inmediato?", "Al 911", ["Al 411", "Al 311", "A ninguno: se espera"], "Librar a los que están en peligro es obedecer a Dios.", "Proverbios 24:11"],
    ["f46", 5, "o5", "recordar", "En los Estados Unidos, ¿qué línea atiende de día y de noche a personas en riesgo de suicidio, también en español?", "La línea 988", ["La línea 411", "La línea 311", "No existe ninguna"], "Pedir ayuda a tiempo puede salvar una vida.", "Proverbios 24:11"],
    ["f47", 5, "o5", "evaluar", "Un niño te cuenta que un adulto de la iglesia lo toca de manera indebida y te pide que no digas nada. ¿Qué haces?", "Proteges al niño, no guardas el secreto y avisas a las autoridades y al pastor", ["Guardas el secreto como te pidió", "Hablas solo con el adulto para que se arrepienta", "Lo arreglas con una oración"], "«Libra a los que son llevados a la muerte; Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
    ["f48", 5, "o5", "recordar", "¿Qué obliga la ley de Texas a quien sospecha que un niño sufre abuso o descuido?", "A reportarlo de inmediato, sin excepción para los ministros", ["A esperar a tener pruebas completas", "A hablarlo solo con la familia", "A nada: es opcional"], "Las autoridades son servidoras de Dios para hacer justicia.", "Romanos 13:4"],
    ["f49", 5, "o5", "comprender", "¿Por qué avisar a las autoridades de un abuso no es traicionar a la iglesia?", "Porque las autoridades están puestas por Dios para hacer justicia y proteger al débil", ["Porque la iglesia no importa", "Porque así se evita hablar con el pastor", "Porque Dios no ve el pecado"], "La autoridad «es servidor de Dios para tu bien».", "Romanos 13:4"],
    ["f50", 5, "o5", "aplicar", "Después de derivar a una persona al pastor o a un profesional, ¿qué haces?", "Sigues cerca: oras por ella, la visitas y la animas a seguir la ayuda", ["Te olvidas del caso", "Le dices que ya no te busque", "Cuentas el caso en el grupo"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
    // ---- lección 6: la ética y el cuidado del que ayuda (10)
    ["f51", 6, "o6", "recordar", "¿Qué hace el que anda en chismes, según Proverbios 11:13?", "Descubre el secreto", ["Guarda el secreto", "Ora por los demás", "Consuela al triste"], "«El que anda en chismes descubre el secreto».", "Proverbios 11:13"],
    ["f52", 6, "o6", "aplicar", "¿Se puede compartir en el grupo, como motivo de oración, lo que te contaron en confianza?", "No, sin el permiso de la persona", ["Sí, siempre", "Sí, si no dices su nombre aunque todos sepan quién es", "Sí, porque orar lo justifica todo"], "El de espíritu fiel lo guarda todo.", "Proverbios 11:13"],
    ["f53", 6, "o6", "comprender", "¿Por qué conviene explicar los límites de la confidencialidad desde el principio?", "Para que la persona sepa que, si hay peligro para la vida o abuso, se avisará a quien corresponda", ["Para asustarla", "Para no tener que escucharla", "Para poder contarlo todo después"], "Hay que librar a los que están en peligro de muerte.", "Proverbios 24:11"],
    ["f54", 6, "o6", "aplicar", "¿Dónde conviene reunirse para aconsejar a alguien del otro sexo?", "En un lugar visible o con otra persona cerca", ["A solas en un lugar cerrado", "En el carro, de noche", "En la casa de la persona, sin nadie más"], "«Absteneos de toda especie de mal».", "1 Tesalonicenses 5:22"],
    ["f55", 6, "o6", "analizar", "¿Por qué no conviene crear dependencia en la persona que ayudas?", "Porque debe apoyarse en Dios, en su familia y en la iglesia, no solo en una persona", ["Porque ayudar es malo", "Porque así uno se libra de ella", "Porque la dependencia siempre es buena"], "«Bendito el varón que confía en Jehová, y cuya confianza es Jehová».", "Jeremías 17:7"],
    ["f56", 6, "o6", "recordar", "¿Cómo pide Gálatas 6:1 restaurar al que cayó?", "Con espíritu de mansedumbre, considerándose a uno mismo", ["Con dureza y vergüenza pública", "Ignorándolo", "Expulsándolo enseguida"], "«restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado».", "Gálatas 6:1"],
    ["f57", 6, "o6", "comprender", "¿Por qué quien ayuda necesita rendir cuentas?", "Porque también es frágil y puede ser tentado", ["Porque nunca se equivoca", "Para presumir su trabajo", "No lo necesita"], "Considérate a ti mismo, no sea que tú también seas tentado.", "Gálatas 6:1"],
    ["f58", 6, "o6", "aplicar", "¿Qué hizo Jesús cuando sus discípulos volvieron cansados?", "Los llevó aparte a descansar un poco", ["Los envió de nuevo enseguida", "Los regañó", "Los dejó solos"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ["f59", 6, "o6", "evaluar", "¿Cuáles son señales de desgaste en quien cuida a otros?", "La irritación, el insomnio y las ganas de alejarse de todos", ["La alegría y el descanso", "El buen apetito", "Las ganas de orar"], "Jesús cuidó el descanso de los suyos.", "Marcos 6:31"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estos servidores cuida mejor a otros?", "El que escucha, guarda el secreto con sus límites, deriva a tiempo y cuida su propia vida con Dios", ["El que lo resuelve todo solo y nunca descansa", "El que cuenta los casos para pedir oración", "El que promete que todo saldrá bien"], "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.", "Gálatas 6:2"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Cómo llamó Jesús al Espíritu Santo en Juan 14:16?", "El Consolador", ["El Juez", "El Guardián del templo", "El Profeta"], "«Y yo rogaré al Padre, y os dará otro Consolador, para que esté con vosotros para siempre».", "Juan 14:16"],
      ["m1-02", 1, "o1", "comprender", "¿Qué no hace quien cuida en el primer nivel de ayuda?", "Diagnosticar enfermedades ni reemplazar al médico o al pastor", ["Escuchar", "Orar", "Acompañar"], "Todo creyente puede amonestar, pero conoce sus límites.", "Romanos 15:14"],
      ["m1-03", 1, "o1", "aplicar", "¿Qué significa que cuidar no es controlar?", "Que acompañamos para que la persona misma busque a Dios y decida bien", ["Que decidimos por la persona", "Que no hay que ayudar", "Que hay que vigilar todo lo que hace"], "Cada uno llevará su propia carga delante de Dios.", "Gálatas 6:5"],
      ["m1-04", 1, "o1", "analizar", "¿Cómo se relacionan Gálatas 6:2 y 2 Corintios 1:4?", "Dios nos consuela, y con ese consuelo ayudamos a llevar las cargas de otros", ["Se contradicen", "Hablan de deudas de dinero", "Solo hablan de los apóstoles"], "«para que podamos también nosotros consolar a los que están en cualquier tribulación».", "2 Corintios 1:4"],
      ["m1-05", 1, "o1", "recordar", "¿Qué nombres del Mesías da Isaías 9:6?", "Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz", ["Rey de los judíos e Hijo de David", "Cordero, León y Estrella", "Maestro, Rabí y Profeta"], "«y se llamará su nombre Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz».", "Isaías 9:6"],
      ["m1-06", 1, "o1", "evaluar", "¿Quién debería atender una depresión grave?", "Un médico o un profesional, con el apoyo y la oración de la iglesia", ["Solo el grupo de oración", "Nadie: se pasa sola", "Cualquier hermano con buena voluntad"], "Hay niveles de ayuda: el consuelo de los hermanos y la ayuda de los que están preparados.", "Romanos 15:14"],
      ["m1-07", 2, "o2", "recordar", "¿Qué pregunta les hizo Jesús a los de Emaús?", "¿Qué pláticas son estas que tenéis entre vosotros mientras camináis, y por qué estáis tristes?", ["¿Por qué no creéis?", "¿Dónde está vuestra fe?", "¿Quién os enseñó eso?"], "«¿Qué pláticas son estas que tenéis entre vosotros mientras camináis, y por qué estáis tristes?».", "Lucas 24:17"],
      ["m1-08", 2, "o2", "recordar", "¿Cuánto tiempo se sentaron en silencio los amigos de Job?", "Siete días y siete noches", ["Una hora", "Tres días", "Cuarenta días"], "«Así se sentaron con él en tierra por siete días y siete noches».", "Job 2:13"],
      ["m1-09", 2, "o2", "aplicar", "Mientras alguien te cuenta su problema, ¿qué conviene evitar?", "Interrumpir y contar enseguida tu propia historia", ["Mirarlo a los ojos", "Hacer preguntas abiertas", "Aceptar sus emociones"], "Tardo para hablar.", "Santiago 1:19"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué una pregunta abierta ayuda más que una cerrada?", "Porque invita a la persona a contar lo que vive, en vez de responder sí o no", ["Porque es más corta", "Porque permite juzgar mejor", "Porque evita escuchar"], "El entendido alcanza el consejo profundo del corazón.", "Proverbios 20:5"],
      ["m1-11", 2, "o2", "evaluar", "¿Cuál de estas respuestas acepta las emociones de la persona?", "Entiendo que te sientas así; debe ser muy difícil", ["No deberías sentirte así", "Ya deja de llorar", "Eso no es para tanto"], "Llorad con los que lloran.", "Romanos 12:15"],
      ["m1-12", 2, "o2", "comprender", "¿Qué enseña que el silencio también ayude?", "Que a veces lo que más consuela es la presencia, no las palabras", ["Que no hay que hablar nunca", "Que hay que irse pronto", "Que escuchar es perder el tiempo"], "Los amigos de Job se sentaron con él en silencio, porque veían que su dolor era muy grande.", "Job 2:13"],
      ["m1-13", 3, "o3", "recordar", "¿Qué debe hacer el afligido, según Santiago 5:13?", "Orar", ["Callar", "Quejarse con todos", "Esconderse"], "«¿Está alguno entre vosotros afligido? Haga oración».", "Santiago 5:13"],
      ["m1-14", 3, "o3", "comprender", "¿Qué hay que evitar al orar con alguien?", "Convertir la oración en un sermón", ["Pedir permiso", "Orar corto", "Dar gracias a Dios"], "Presentad vuestras peticiones delante de Dios en toda oración y ruego.", "Filipenses 4:6"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué conviene hacer con un pasaje que consoló a la persona?", "Dejárselo escrito para que lo lea otra vez", ["Prohibirle leer otros", "Olvidarlo enseguida", "Usarlo para regañarla"], "La palabra dicha como conviene es como manzana de oro.", "Proverbios 25:11"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué un versículo lanzado sin escuchar puede herir?", "Porque no responde a lo que la persona vive y puede sonar a juicio", ["Porque la Biblia siempre hiere", "Porque los versículos no sirven", "Porque solo el pastor puede citar la Biblia"], "La palabra debe ser dicha como conviene.", "Proverbios 25:11"],
      ["m1-17", 3, "o3", "recordar", "¿A quién dejó Pablo enfermo en Mileto?", "A Trófimo", ["A Timoteo", "A Lucas", "A Tito"], "«Erasto se quedó en Corinto, y a Trófimo dejé en Mileto enfermo».", "2 Timoteo 4:20"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué actitud es la correcta ante un hermano enfermo?", "Orar por él, confiar en que Dios sana y animarlo a seguir con su médico", ["Decirle que deje el tratamiento para mostrar fe", "Culparlo por su enfermedad", "Evitarlo para no contagiarse de tristeza"], "La oración eficaz del justo puede mucho, y Lucas era médico.", "Santiago 5:16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué versículo, de solo dos palabras, muestra el dolor de Jesús en Betania?", "Jesús lloró", ["Jesús oró", "Jesús calló", "Jesús se fue"], "«Jesús lloró».", "Juan 11:35"],
      ["m2-02", 4, "o4", "comprender", "¿Qué dijo la gente al ver llorar a Jesús?", "Mirad cómo le amaba", ["No tiene poder", "Es débil", "No le importa"], "«Dijeron entonces los judíos: Mirad cómo le amaba».", "Juan 11:36"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué conviene decirle a alguien que acaba de perder a su madre?", "Lo siento mucho; estoy aquí contigo", ["Ya está en un lugar mejor, así que no llores", "Yo sé exactamente cómo te sientes", "Dios necesitaba otro ángel"], "Llorad con los que lloran.", "Romanos 12:15"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué el duelo no tiene un calendario fijo?", "Porque cada persona vive la pérdida a su manera y sanar lleva tiempo", ["Porque dura exactamente un mes", "Porque los creyentes no sienten duelo", "Porque el duelo es falta de fe"], "Jehová está cerca de los quebrantados de corazón, el tiempo que haga falta.", "Salmos 34:18"],
      ["m2-05", 4, "o4", "recordar", "¿Dónde se sentó Elías cuando se deseó la muerte?", "Debajo de un enebro", ["En el monte Carmelo", "En el templo", "Junto al Jordán"], "«y vino y se sentó debajo de un enebro; y deseando morirse, dijo: Basta ya, oh Jehová, quítame la vida».", "1 Reyes 19:4"],
      ["m2-06", 4, "o4", "evaluar", "Después de una crisis, ¿cuál es el mejor orden para ayudar?", "Primero la seguridad y la calma; después la red de apoyo y, si hace falta, los profesionales", ["Primero explicar por qué pasó", "Primero buscar culpables", "Primero dar una lista de tareas"], "Dios dejó dormir y comer a Elías, y después le habló.", "1 Reyes 19:5-8"],
      ["m2-07", 5, "o5", "recordar", "¿Por qué no podía Moisés atender él solo al pueblo?", "Porque el trabajo era demasiado pesado para él solo", ["Porque no le importaba el pueblo", "Porque no sabía juzgar", "Porque estaba de viaje"], "«porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", "Éxodo 18:18"],
      ["m2-08", 5, "o5", "comprender", "¿Derivar a alguien es abandonarlo?", "No: es buscar la mejor ayuda y seguir acompañando", ["Sí, siempre", "Sí, si el caso es difícil", "Da lo mismo"], "En la multitud de consejeros hay seguridad.", "Proverbios 11:14"],
      ["m2-09", 5, "o5", "aplicar", "¿Cuál de estas es una señal de enfermedad mental que pide ayuda profesional?", "Oír voces o ver cosas que no existen", ["Estar triste un día", "Tener dudas sobre un versículo", "Cansarse después del trabajo"], "Los asuntos graves piden a alguien más preparado, como aconsejó Jetro.", "Éxodo 18:22"],
      ["m2-10", 5, "o5", "evaluar", "Una persona te pide que guardes en secreto que piensa quitarse la vida. ¿Qué haces?", "No prometes guardarlo y buscas ayuda de inmediato", ["Lo guardas para no perder su confianza", "Esperas a que se le pase", "Le dices que no lo piense más y te vas"], "«Salva a los que están en peligro de muerte».", "Proverbios 24:11"],
      ["m2-11", 5, "o5", "aplicar", "¿Qué haces si un niño está en peligro inmediato?", "Llamas al 911 o al número de emergencias de tu país", ["Esperas al domingo", "Hablas con el abusador", "Lo publicas en las redes"], "«Libra a los que son llevados a la muerte».", "Proverbios 24:11"],
      ["m2-12", 5, "o5", "analizar", "¿Por qué el abuso no se arregla solo con una oración o un perdón?", "Porque hay que proteger a la víctima y que las autoridades hagan justicia", ["Porque la oración no sirve", "Porque perdonar es malo", "Porque no es asunto de nadie"], "La autoridad es servidora de Dios para castigar al que hace lo malo.", "Romanos 13:4"],
      ["m2-13", 6, "o6", "recordar", "¿Qué pide 1 Tesalonicenses 5:22?", "Absteneos de toda especie de mal", ["Buscad toda clase de experiencias", "No juzguéis nada", "Hablad de todo con todos"], "«Absteneos de toda especie de mal».", "1 Tesalonicenses 5:22"],
      ["m2-14", 6, "o6", "comprender", "¿Cuál es una norma de prudencia al aconsejar?", "No tocar a la persona sin su permiso", ["Reunirse a solas de noche", "Prometer que todo saldrá bien", "Contar los casos en el grupo"], "Absteneos de toda especie de mal.", "1 Tesalonicenses 5:22"],
      ["m2-15", 6, "o6", "aplicar", "Un caso te supera y te afecta mucho. ¿Qué haces?", "Le pides ayuda a tu pastor", ["Sigues solo sin decir nada", "Lo cuentas en las redes", "Dejas a la persona sin avisarle"], "En la multitud de consejeros hay seguridad.", "Proverbios 11:14"],
      ["m2-16", 6, "o6", "analizar", "¿Qué relación hay entre el descanso y el cuidado de otros?", "Quien no descansa se desgasta y termina ayudando peor", ["Descansar es egoísta", "El que ayuda nunca se cansa", "Descansar es falta de fe"], "Jesús llevó a sus discípulos a descansar un poco.", "Marcos 6:31"],
      ["m2-17", 6, "o6", "evaluar", "¿Cuál de estos servidores rompe la confidencialidad?", "El que pide oración en el grupo contando el problema de alguien sin su permiso", ["El que avisa al pastor porque hay riesgo de suicidio", "El que reporta un abuso a las autoridades", "El que guarda lo que le contaron"], "El que anda en chismes descubre el secreto.", "Proverbios 11:13"],
      ["m2-18", 6, "o6", "comprender", "¿Para qué necesita quien ayuda personas a quienes rendir cuentas?", "Para ser humilde, recibir consejo y no caer en tentación", ["Para tener más poder", "Para que otros hagan su trabajo", "No lo necesita"], "Considérate a ti mismo, no sea que tú también seas tentado.", "Gálatas 6:1"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n3-consejeria-basica-e1",
      tipo: "corta",
      pregunta: "Explica, con Gálatas 6:2 y 2 Corintios 1:3-4, por qué todo creyente está llamado a cuidar a otros y cuáles son los límites de ese cuidado.",
      ideas: [
        { id: "cargas", peso: 25, texto: "Sobrellevar las cargas de los otros es la ley de Cristo.", formas: ["sobrellev*", "cargas", "ley de cristo"] },
        { id: "consuelo", peso: 25, texto: "Consolamos con el consuelo que recibimos de Dios.", formas: ["consuel*", "consol*"] },
        { id: "todos", peso: 15, texto: "Es tarea de todo el cuerpo, no solo del pastor.", formas: ["todo creyente", "todos los creyentes", "no solo (el|del) pastor", "cuerpo de cristo", "toda la iglesia"], negativa: true },
        { id: "limites", peso: 25, texto: "Los límites: no diagnostica ni reemplaza al médico o al pastor, y deriva cuando hace falta.", formas: ["limite*", "deriv*", "no (diagnostic*|reemplaz*)", "profesional*", "medico"], negativa: true },
      ],
      citas: ["Gálatas 6:2", "2 Corintios 1:3-4", "2 Corintios 1:4", "Romanos 15:14", "Éxodo 18:17-18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Pablo manda sobrellevar los unos las cargas de los otros, y así se cumple la ley de Cristo (Gálatas 6:2). Dios nos consuela para que consolemos a otros con ese consuelo (2 Corintios 1:4). Por eso cuidar es tarea de todo creyente, no solo del pastor. Pero tiene límites: no diagnosticamos ni reemplazamos al médico, y derivamos cuando hace falta.",
    },
    {
      id: "n3-consejeria-basica-e2",
      tipo: "corta",
      pregunta: "Explica cómo escuchar bien a una persona que sufre, con el ejemplo de Jesús en el camino a Emaús o con Santiago 1:19.",
      ideas: [
        { id: "pronto", peso: 25, texto: "Ser pronto para oír y tardo para hablar: escuchar antes de aconsejar.", formas: ["pronto para oir", "tardo para hablar", "escuch* (primero|antes)", "antes de (hablar|aconsejar|responder)"] },
        { id: "jesus", peso: 20, texto: "Jesús preguntó y escuchó a los de Emaús antes de enseñarles.", formas: ["emaus", "jesus (pregunto|escucho)", "les pregunto"] },
        { id: "habilidades", peso: 25, texto: "Toda la atención, preguntas abiertas y reflejar lo que se oye.", formas: ["atencion", "preguntas abiertas", "reflej*", "mirar*"] },
        { id: "emociones", peso: 20, texto: "Aceptar las emociones sin juzgar, sin interrumpir ni apurar consejos.", formas: ["(sin|no) (juzgar|juzgo|juzgarla|juzgarlo|juzgues)", "emocion*", "sentimientos", "lo que siente", "(sin|no) (interrumpir|interrumpo|interrumpirla|interrumpirlo)", "llorar con", "acept*"], negativa: true },
      ],
      citas: ["Santiago 1:19", "Proverbios 18:13", "Lucas 24:17", "Lucas 24:15-17", "Proverbios 20:5", "Romanos 12:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hay que ser pronto para oír y tardo para hablar (Santiago 1:19). Jesús se acercó a los de Emaús, les preguntó por qué estaban tristes y los escuchó antes de enseñarles. Escucho con toda mi atención, sin el teléfono, hago preguntas abiertas y reflejo lo que entiendo. Acepto sus emociones sin juzgar ni interrumpir.",
    },
    {
      id: "n3-consejeria-basica-e3",
      tipo: "corta",
      pregunta: "Explica cuándo hay que derivar a una persona al pastor o a un profesional, y qué hacer si alguien habla de quitarse la vida.",
      ideas: [
        { id: "cuando", peso: 30, texto: "Cuándo derivar: suicidio, violencia o abuso, adicciones, enfermedad mental, problemas médicos o legales.", formas: ["abuso", "violencia", "adiccion*", "enfermedad mental", "depresion", "suicid*", "legal*"] },
        { id: "quien", peso: 15, texto: "A quién: al pastor, a un médico o a un profesional.", formas: ["pastor", "profesional*", "psicolog*", "medico"] },
        { id: "suicidio", peso: 35, texto: "Ante el riesgo de suicidio: tomarlo en serio, no dejar sola a la persona, no guardar el secreto y buscar ayuda de inmediato.", formas: ["no (dejar|dejarla|dejarlo|dejo|deje|dejes) sol*", "(tomar|tomarlo|tomarla|tomo) en serio", "no (guardar|guardo|guardes|prometo) el secreto", "de inmediato", "911", "988", "busc* ayuda"], negativa: true },
        { id: "seguir", peso: 10, texto: "Derivar no es abandonar: se sigue acompañando.", formas: ["seguir acompa*", "no es abandonar", "sigo cerca", "seguir cerca"], negativa: true },
      ],
      citas: ["Éxodo 18:17-18", "Éxodo 18:18", "Proverbios 11:14", "Proverbios 24:11", "Romanos 13:4"],
      pesoCita: 10,
      errores: [
        { id: "no-en-serio", anula: "suicidio", texto: "El riesgo de suicidio siempre se toma en serio: nunca se ignora ni se deja para después.", formas: ["no (tomarlo|tomarla|tomo|tomar) en serio", "no darle importancia", "llamar la atencion"] },
      ],
      modelo:
        "Hay que derivar cuando hay riesgo de suicidio, violencia o abuso, adicciones, señales de enfermedad mental o problemas médicos o legales: al pastor o a un profesional (Proverbios 11:14). Si alguien habla de quitarse la vida, lo tomo en serio, no lo dejo solo, no guardo el secreto y busco ayuda de inmediato. Derivar no es abandonar.",
    },
    {
      id: "n3-consejeria-basica-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo acompañarías a una persona que perdió a un ser querido: qué harías, qué evitarías y cómo usarías la Palabra y la oración. Usa el ejemplo de Jesús en Betania y al menos dos citas bíblicas.",
      ideas: [
        { id: "presencia", peso: 20, texto: "Estar presente y escuchar.", formas: ["present*", "escuch*", "visit*", "abrazo", "acompa*"] },
        { id: "jesus", peso: 15, texto: "Jesús lloró en Betania: se puede llorar con esperanza.", formas: ["lloro", "betania", "lazaro"] },
        { id: "esperanza", peso: 15, texto: "Con la esperanza de la resurrección.", formas: ["esperanza", "resurreccion"] },
        { id: "practica", peso: 15, texto: "Ayuda práctica y volver después.", formas: ["comida", "transporte", "tramites", "volver*", "volveria", "semanas", "meses"] },
        { id: "evitar", peso: 20, texto: "Evitar las frases hechas y los apuros.", formas: ["evit*", "otro angel", "frases", "superarlo", "apur*"] },
        { id: "oracion", peso: 15, texto: "Orar con la persona y compartir la Palabra a su tiempo.", formas: ["orar", "oraria", "oracion", "salmo*", "pasaje"] },
      ],
      basta: 85,
      citas: ["Juan 11:35", "Juan 11:32-36", "Juan 11:32", "1 Tesalonicenses 4:13", "1 Tesalonicenses 4:13-14", "Salmos 34:18", "Romanos 12:15", "2 Corintios 1:3-4", "Gálatas 6:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero iría a estar presente: una visita, un abrazo y escuchar a la persona sin apurarla, dejándola hablar de su ser querido y de lo que siente. Jesús me enseña a hacerlo: cuando María llegó llorando a decirle que su hermano no habría muerto si él hubiera estado allí, Jesús no la regañó, sino que se conmovió y lloró (Juan 11:35), aunque iba a resucitar a Lázaro. Por eso no le diría que no llore: los creyentes lloramos, pero no como los que no tienen esperanza (1 Tesalonicenses 4:13), porque esperamos la resurrección. Evitaría las frases que duelen, como que Dios necesitaba otro ángel o que ya debería superarlo. Ayudaría en lo práctico: llevar comida, ayudar con el transporte o con los trámites, y volvería semanas y meses después, cuando los demás ya se hayan ido. Si la persona quiere, oraría con ella, corto y sencillo, y le compartiría a su tiempo un pasaje como Salmos 34:18: Jehová está cerca de los quebrantados de corazón. Y si con el tiempo no logra seguir con su vida o piensa en morir, buscaría la ayuda del pastor o de un profesional.",
    },
    {
      id: "n3-consejeria-basica-e5",
      tipo: "breve",
      pregunta:
        "Explica cómo protegerías a una persona vulnerable, y a ti mismo, al cuidar a otros: la confidencialidad y sus límites, las normas de prudencia, qué hacer ante un abuso y cómo cuidarías tu propia vida. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "secreto", peso: 20, texto: "Guardar la confidencialidad.", formas: ["confidencial*", "secreto", "chismes", "permiso"] },
        { id: "limites", peso: 20, texto: "Los límites: el peligro para la vida o el abuso.", formas: ["limite*", "peligro", "excepcion*", "salvo que", "menos cuando"] },
        { id: "prudencia", peso: 15, texto: "Normas de prudencia: lugares visibles, no tocar sin permiso, no crear dependencia.", formas: ["visible*", "otra persona cerca", "no (tocar|tocare|toco)", "dependencia", "prudencia"], negativa: true },
        { id: "abuso", peso: 20, texto: "Ante el abuso: proteger a la víctima y avisar a las autoridades.", formas: ["autoridades", "report*", "denunci*", "policia", "911"] },
        { id: "cuidarse", peso: 15, texto: "Cuidar la propia vida: descanso, oración y rendir cuentas.", formas: ["descans*", "rendir cuentas", "rendire cuentas", "mi pastor", "tiempo con dios", "desgaste"] },
        { id: "humildad", peso: 10, texto: "Considerarse a uno mismo: también puede caer.", formas: ["considerandome", "considerandote", "tentado", "fragil", "humild*"] },
      ],
      basta: 85,
      citas: ["Proverbios 11:13", "Proverbios 24:11", "Romanos 13:4", "Romanos 13:3-4", "Gálatas 6:1", "Marcos 6:31", "1 Tesalonicenses 5:22", "Proverbios 11:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Lo que una persona me cuente en confianza lo voy a guardar, porque el de espíritu fiel guarda el secreto (Proverbios 11:13), y no lo compartiré ni como motivo de oración sin su permiso. Pero desde el principio le explicaré los límites: si hay peligro para su vida o la de otros, o abuso de un menor, no guardaré el secreto. En ese caso protegeré a la víctima y avisaré al pastor y a las autoridades, porque la Biblia manda librar a los que están en peligro de muerte (Proverbios 24:11), y en Texas la ley obliga a reportar el abuso de un niño. Seguiré normas de prudencia: me reuniré en lugares visibles o con otra persona cerca, no tocaré a nadie sin permiso y no crearé dependencia, sino que ayudaré a la persona a apoyarse en Dios, en su familia y en la iglesia. También cuidaré mi propia vida: guardaré mi tiempo con Dios, descansaré como Jesús enseñó a sus discípulos (Marcos 6:31) y le rendiré cuentas a mi pastor, considerándome a mí mismo, no sea que yo también sea tentado (Gálatas 6:1).",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-consejeria-basica-b1",
    tipo: "breve",
    pregunta:
      "Describe una situación real (cambia los nombres) o imaginada en la que alguien de tu iglesia o de tu familia necesita apoyo. Explica cómo lo escucharías, cómo orarías con esa persona y qué pasaje compartirías, y di si haría falta derivarla y a quién. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "situacion", peso: 10, texto: "La situación.", formas: ["situacion", "una hermana", "un hermano", "mi amigo", "mi amiga", "una persona", "un joven", "una joven", "mi vecina", "mi vecino"] },
      { id: "escuchar", peso: 25, texto: "Cómo la escucharía.", formas: ["escuch*", "pregunt*", "atencion", "sin juzgar", "sin interrumpir", "tardo para hablar"] },
      { id: "orar", peso: 20, texto: "Cómo oraría con ella.", formas: ["orar*", "oraria", "oracion"] },
      { id: "pasaje", peso: 15, texto: "Qué pasaje compartiría.", formas: ["pasaje", "versiculo", "compartir*", "compartiria", "filipenses", "salmo*", "mateo 11"] },
      { id: "derivar", peso: 20, texto: "Si haría falta derivar, y a quién.", formas: ["deriv*", "pastor", "profesional*", "medico", "psicolog*"] },
      { id: "seguir", peso: 10, texto: "Seguir acompañando.", formas: ["seguir*", "seguire", "visit*", "llam*", "acompa*", "volver*"] },
    ],
    basta: 85,
    citas: ["Gálatas 6:2", "Santiago 1:19", "Santiago 5:16", "Filipenses 4:6-7", "Filipenses 4:6", "Salmos 34:18", "Mateo 11:28", "Proverbios 11:14", "Romanos 12:15", "2 Corintios 1:3-4", "Isaías 41:10", "1 Pedro 5:7", "Juan 14:27"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Una hermana de mi grupo, a quien llamaré Rosa, perdió su trabajo y tiene mucha ansiedad porque no sabe cómo pagará la renta. La invitaría a tomar un café en un lugar tranquilo y la escucharía con toda mi atención, sin el teléfono y sin interrumpirla, porque hay que ser pronto para oír y tardo para hablar (Santiago 1:19). Le haría preguntas abiertas, como qué es lo que más le preocupa, y aceptaría su miedo sin juzgarlo. Después le pediría permiso para orar con ella, corto y sencillo, presentando a Dios su necesidad y dando gracias por su fidelidad. Le compartiría Filipenses 4:6-7, que enseña a no estar afanosos, sino a presentar nuestras peticiones a Dios, y promete su paz, y se lo dejaría escrito. Con su permiso, avisaría al pastor por si la iglesia puede ayudarla en lo práctico. Si con el tiempo la ansiedad no la deja dormir ni comer, la animaría a ver a un médico o a un profesional. Mientras tanto, seguiré llamándola cada semana para saber cómo va, porque sobrellevamos los unos las cargas de los otros (Gálatas 6:2).",
  },
};
