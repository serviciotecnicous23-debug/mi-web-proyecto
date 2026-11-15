/**
 * El banco de «Teología sistemática I: la Biblia y Dios» (Nivel 4). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la revelación · o2 la inspiración y la autoridad · o3 sin error, el texto, la suficiencia y la
 * iluminación · o4 la existencia y los nombres de Dios · o5 los atributos de Dios · o6 la Trinidad, la creación y la
 * providencia · o7 el versículo de memoria (2 Timoteo 3:16).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-sistematica-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_SISTEMATICA_1: BancoMateria = {
  materia: "n4-sistematica-1",
  repaso: {
    "n4-sistematica-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué cuentan los cielos, según Salmos 19:1?", "La gloria de Dios", ["La suerte de cada persona", "El futuro del mundo", "Nada: son solo materia"], "«Los cielos cuentan la gloria de Dios, Y el firmamento anuncia la obra de sus manos».", "Salmos 19:1"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es la revelación general?", "Lo que Dios muestra de sí mismo a todos por medio de la creación y de la conciencia", ["Lo que Dios dijo solo a los profetas", "Una revelación nueva fuera de la Biblia", "Lo que cada persona imagina de Dios"], "Su eterno poder y deidad se hacen claramente visibles desde la creación del mundo.", "Romanos 1:20"],
      ["1-r3", 1, "o1", "recordar", "¿Por medio de quién nos ha hablado Dios en estos postreros días?", "Por el Hijo", ["Por los ángeles", "Por los sabios del mundo", "Por los sueños de cada uno"], "«en estos postreros días nos ha hablado por el Hijo».", "Hebreos 1:2"],
    ] as P[]).map(p),
    "n4-sistematica-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué significa, literalmente, la palabra griega que se traduce inspirada en 2 Timoteo 3:16?", "Exhalada por Dios", ["Copiada por los hombres", "Imaginada por los profetas", "Aprobada por un concilio"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
      ["2-r2", 2, "o2", "comprender", "Según 2 Pedro 1:21, ¿cómo hablaron los santos hombres de Dios?", "Siendo inspirados por el Espíritu Santo", ["Por su propia voluntad", "Copiando a otros pueblos", "Sin saber lo que decían"], "«sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo».", "2 Pedro 1:21"],
      ["2-r3", 2, "o2", "recordar", "¿Qué dijo Jesús de la Escritura en Juan 10:35?", "Que la Escritura no puede ser quebrantada", ["Que se podía corregir", "Que solo valía para los judíos", "Que había pasado de moda"], "«y la Escritura no puede ser quebrantada».", "Juan 10:35"],
    ] as P[]).map(p),
    "n4-sistematica-1-3": ([
      ["3-r1", 3, "o3", "comprender", "¿Qué significa que la Biblia es sin error en lo que enseña?", "Que, bien interpretada, todo lo que afirma es verdad", ["Que es un libro de ciencia moderna", "Que no usa figuras ni poesía", "Que cada traducción es perfecta"], "«Toda palabra de Dios es limpia».", "Proverbios 30:5"],
      ["3-r2", 3, "o3", "recordar", "¿Qué se encontró en 1947 junto al mar Muerto?", "Rollos de libros del Antiguo Testamento, entre ellos Isaías completo", ["Los escritos originales de Pablo", "Un evangelio nuevo", "La tumba de Moisés"], "Su texto coincide en lo esencial: la palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
      ["3-r3", 3, "o3", "comprender", "¿Qué hace la iluminación del Espíritu?", "Ayuda al creyente a entender y obedecer lo que ya está escrito", ["Añade libros nuevos a la Biblia", "Reemplaza la lectura de la Biblia", "Revela doctrinas contrarias a la Escritura"], "«para que sepamos lo que Dios nos ha concedido».", "1 Corintios 2:12"],
    ] as P[]).map(p),
    "n4-sistematica-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué debe creer el que se acerca a Dios, según Hebreos 11:6?", "Que le hay, y que es galardonador de los que le buscan", ["Que no se le puede conocer", "Que todos los caminos llevan a él", "Que depende de sus obras"], "«es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan».", "Hebreos 11:6"],
      ["4-r2", 4, "o4", "recordar", "¿Qué respondió Dios cuando Moisés le preguntó su nombre?", "YO SOY EL QUE SOY", ["El Dios de Egipto", "No tengo nombre", "Llámame Señor de los ejércitos"], "«Y respondió Dios a Moisés: YO SOY EL QUE SOY».", "Éxodo 3:14"],
      ["4-r3", 4, "o4", "comprender", "¿Qué significa el nombre El Shaddai?", "El Dios Todopoderoso", ["El Dios de los ejércitos", "Dios con nosotros", "Jehová proveerá"], "«Yo soy el Dios Todopoderoso; anda delante de mí y sé perfecto».", "Génesis 17:1"],
    ] as P[]).map(p),
    "n4-sistematica-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué dice Dios de sí mismo en Malaquías 3:6?", "Yo Jehová no cambio", ["Yo cambio con los tiempos", "Yo me arrepiento de todo", "Yo estoy lejos"], "«Porque yo Jehová no cambio».", "Malaquías 3:6"],
      ["5-r2", 5, "o5", "recordar", "¿Qué proclamaban los serafines en Isaías 6:3?", "Santo, santo, santo, Jehová de los ejércitos", ["Grande es Jehová en Sion", "Aleluya, amén", "Paz en la tierra"], "«Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria».", "Isaías 6:3"],
      ["5-r3", 5, "o5", "comprender", "¿Qué significa que Dios es omnipresente?", "Que está en todo lugar con todo su ser", ["Que lo sabe todo", "Que lo puede todo", "Que nunca cambia"], "«¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?».", "Salmos 139:7"],
    ] as P[]).map(p),
    "n4-sistematica-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué dice Deuteronomio 6:4?", "Oye, Israel: Jehová nuestro Dios, Jehová uno es", ["Hay muchos dioses", "Cada pueblo tiene su dios", "Dios está lejos de Israel"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseña la doctrina de la Trinidad?", "Que hay un solo Dios que existe eternamente en tres personas", ["Que hay tres dioses", "Que Dios es una persona con tres máscaras", "Que el Hijo es una criatura"], "Jesús mandó bautizar «en el nombre del Padre, y del Hijo, y del Espíritu Santo».", "Mateo 28:19"],
      ["6-r3", 6, "o6", "comprender", "¿Qué es la providencia de Dios?", "Que Dios sostiene y gobierna su creación", ["Que Dios creó el mundo y lo abandonó", "Que todo pasa por casualidad", "Que el ser humano no es responsable de nada"], "«y todas las cosas en él subsisten».", "Colosenses 1:17"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: la revelación de Dios (10)
    ["f01", 1, "o1", "recordar", "¿Qué anuncia el firmamento, según Salmos 19:1?", "La obra de las manos de Dios", ["El destino de cada persona", "La llegada del fin", "El poder de los astros"], "«Los cielos cuentan la gloria de Dios, Y el firmamento anuncia la obra de sus manos».", "Salmos 19:1"],
    ["f02", 1, "o1", "comprender", "Según Romanos 1:20, ¿por qué nadie tiene excusa ante Dios?", "Porque su eterno poder y deidad se ven claramente desde la creación", ["Porque todos leyeron la Biblia", "Porque Dios habló en voz alta a cada persona", "Porque todos fueron a la iglesia"], "«se hacen claramente visibles desde la creación del mundo, siendo entendidas por medio de las cosas hechas, de modo que no tienen excusa».", "Romanos 1:20"],
    ["f03", 1, "o1", "comprender", "¿Qué muestra la conciencia, según Romanos 2:15?", "Que la obra de la ley está escrita en el corazón", ["Que no existe el bien ni el mal", "Que cada uno decide lo que es bueno", "Que la ley de Dios es solo para Israel"], "«mostrando la obra de la ley escrita en sus corazones, dando testimonio su conciencia».", "Romanos 2:15"],
    ["f04", 1, "o1", "analizar", "¿Por qué la revelación general no basta para salvar?", "Porque muestra que Dios existe y que somos culpables, pero no anuncia el evangelio", ["Porque es falsa", "Porque solo la ven los sabios", "Porque Dios no quiere que lo conozcan"], "La fe es por el oír, y el oír, por la palabra de Dios.", "Romanos 10:17"],
    ["f05", 1, "o1", "recordar", "¿Cómo habló Dios en otro tiempo a los padres, según Hebreos 1:1?", "Muchas veces y de muchas maneras, por los profetas", ["Una sola vez, por un ángel", "Solo por sueños", "Nunca habló antes de Jesús"], "«Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas».", "Hebreos 1:1"],
    ["f06", 1, "o1", "comprender", "¿Qué incluye la revelación especial?", "Los hechos de Dios en la historia, su palabra a los profetas y a los apóstoles y, sobre todo, a Jesucristo", ["Solo lo que se ve en la naturaleza", "Las ideas de cada persona sobre Dios", "Las enseñanzas de todas las religiones"], "En estos postreros días Dios nos ha hablado por el Hijo.", "Hebreos 1:2"],
    ["f07", 1, "o1", "recordar", "Según Juan 1:18, ¿quién ha dado a conocer a Dios?", "El unigénito Hijo, que está en el seno del Padre", ["Los filósofos", "Solo Moisés", "Los ángeles"], "«A Dios nadie le vio jamás; el unigénito Hijo, que está en el seno del Padre, él le ha dado a conocer».", "Juan 1:18"],
    ["f08", 1, "o1", "comprender", "¿Qué quiso decir Jesús con: El que me ha visto a mí, ha visto al Padre?", "Que en él se conoce plenamente a Dios", ["Que él y el Padre son la misma persona", "Que el Padre no existe", "Que Felipe ya había visto al Padre en el cielo"], "«El que me ha visto a mí, ha visto al Padre».", "Juan 14:9"],
    ["f09", 1, "o1", "comprender", "¿Qué es la teología sistemática?", "El estudio ordenado por temas de lo que toda la Biblia enseña", ["La opinión personal de cada pastor", "La historia de la iglesia", "El estudio de un solo libro de la Biblia"], "Toda la Escritura es útil para enseñar.", "2 Timoteo 3:16"],
    ["f10", 1, "o7", "recordar", "Completa 2 Timoteo 3:16: Toda la Escritura es inspirada por Dios, y útil para enseñar…", "para redargüir, para corregir, para instruir en justicia", ["para discutir, para ganar, para dividir", "para leer solo en el templo", "para los sabios y no para los sencillos"], "Es el versículo de memoria de la materia.", "2 Timoteo 3:16"],
    // ---- lección 2: la inspiración y la autoridad (10)
    ["f11", 2, "o2", "recordar", "¿Qué parte de la Escritura es inspirada, según 2 Timoteo 3:16?", "Toda la Escritura", ["Solo los evangelios", "Solo lo que habla de Jesús", "Solo las partes que entendemos"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
    ["f12", 2, "o2", "comprender", "¿Para qué prepara la Escritura al hombre de Dios, según 2 Timoteo 3:17?", "Para toda buena obra", ["Para discutir con todos", "Para hacerse rico", "Para no necesitar a la iglesia"], "«a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra».", "2 Timoteo 3:17"],
    ["f13", 2, "o2", "recordar", "Según 2 Pedro 1:21, ¿de dónde no vino nunca la profecía?", "De la voluntad humana", ["Del Espíritu Santo", "De Dios", "De los santos hombres de Dios inspirados"], "«porque nunca la profecía fue traída por voluntad humana».", "2 Pedro 1:21"],
    ["f14", 2, "o2", "analizar", "¿Cómo se relacionan el Autor divino y los autores humanos de la Biblia?", "Dios guió a los autores para que escribieran su Palabra, sin anular su personalidad ni su estilo", ["Dios les dictó como a máquinas, sin que pensaran", "Los autores escribieron solo sus opiniones", "Dios corrigió después lo que ellos escribieron mal"], "Los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo.", "2 Pedro 1:21"],
    ["f15", 2, "o2", "comprender", "¿Qué significa que la inspiración es plenaria?", "Que toda la Escritura es inspirada, no solo algunas partes", ["Que solo los textos largos son inspirados", "Que se inspiraron las ideas, no las palabras", "Que cada lector se inspira al leerla"], "Toda la Escritura es inspirada por Dios.", "2 Timoteo 3:16"],
    ["f16", 2, "o2", "comprender", "¿Qué significa que la inspiración es verbal?", "Que la inspiración llega a las palabras, no solo a las ideas", ["Que la Biblia se transmitió solo de boca en boca", "Que solo lo que dijo Jesús es inspirado", "Que hay que leerla en voz alta"], "Jesús dijo que ni una jota ni una tilde pasará de la ley.", "Mateo 5:18"],
    ["f17", 2, "o2", "recordar", "¿Qué dijo Jesús que no pasará de la ley hasta que todo se haya cumplido?", "Ni una jota ni una tilde", ["Ningún sacrificio", "Ningún templo", "Ninguna fiesta"], "«ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido».", "Mateo 5:18"],
    ["f18", 2, "o2", "aplicar", "Alguien dice que la Biblia es solo un buen libro escrito por hombres. ¿Qué responde mejor la lección?", "Que la escribieron hombres inspirados por el Espíritu Santo, y por eso es Palabra de Dios", ["Que tiene razón", "Que la escribieron ángeles", "Que cayó del cielo ya escrita"], "«los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo».", "2 Pedro 1:21"],
    ["f19", 2, "o2", "comprender", "¿Qué texto inspiró Dios directamente?", "Lo que escribieron los autores en los escritos originales", ["Cada traducción moderna por igual", "Solo la versión que usa mi iglesia", "Ninguno: la Biblia no es inspirada"], "Las traducciones son Palabra de Dios en la medida en que reproducen fielmente el texto inspirado.", "2 Timoteo 3:16"],
    ["f20", 2, "o2", "evaluar", "¿Por qué importa al creyente la manera en que Jesús veía la Escritura?", "Porque si Jesús es nuestro Señor, recibimos la Escritura como él: con autoridad final", ["No importa: cada uno piensa lo que quiere", "Porque Jesús rechazó el Antiguo Testamento", "Porque Jesús dijo que la Escritura tenía errores"], "«y la Escritura no puede ser quebrantada».", "Juan 10:35"],
    // ---- lección 3: sin error, clara y suficiente (10)
    ["f21", 3, "o3", "recordar", "¿Qué dice Proverbios 30:5 de la palabra de Dios?", "Toda palabra de Dios es limpia", ["Algunas palabras de Dios son dudosas", "La palabra de Dios cambia con el tiempo", "La palabra de Dios es solo para los sabios"], "«Toda palabra de Dios es limpia».", "Proverbios 30:5"],
    ["f22", 3, "o3", "comprender", "¿Por qué la Biblia es sin error?", "Porque viene de Dios, que no miente", ["Porque sus autores eran perfectos", "Porque un concilio lo decidió", "Porque es muy antigua"], "Dios, que no miente, prometió la vida eterna desde antes del principio de los siglos.", "Tito 1:2"],
    ["f23", 3, "o3", "analizar", "Si la Biblia dice que el sol sale y se pone, ¿tiene un error?", "No: describe el mundo como lo ve quien lo observa", ["Sí, es un error científico", "Sí, y por eso no es confiable", "No, porque el sol gira alrededor de la tierra"], "Sale el sol, y se pone el sol: es el lenguaje de quien observa.", "Eclesiastés 1:5"],
    ["f24", 3, "o3", "recordar", "¿Cuántos manuscritos griegos del Nuevo Testamento se conservan, según la lección?", "Más de cinco mil", ["Ninguno", "Unos diez", "Solo uno, en Roma"], "Comparando las copias se recupera el texto con gran seguridad.", "Isaías 40:8"],
    ["f25", 3, "o3", "comprender", "¿Qué mostró el rollo de Isaías hallado junto al mar Muerto?", "Que su texto coincide en lo esencial con copias unos mil años posteriores", ["Que Isaías tenía otro mensaje", "Que el libro de Isaías no existía", "Que las copias cambiaron mucho"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f26", 3, "o3", "evaluar", "¿Qué decir de que no tengamos los escritos originales de la Biblia?", "Que las miles de copias antiguas permiten recuperar el texto con gran seguridad, y ninguna doctrina depende de un pasaje dudoso", ["Que entonces no se puede confiar en la Biblia", "Que cada traducción inventó su texto", "Que los originales están escondidos"], "La palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
    ["f27", 3, "o3", "recordar", "¿Qué hace la ley de Jehová, según Salmos 19:7?", "Convierte el alma", ["Condena sin esperanza", "Confunde al sencillo", "Solo sirve a los sacerdotes"], "«La ley de Jehová es perfecta, que convierte el alma; El testimonio de Jehová es fiel, que hace sabio al sencillo».", "Salmos 19:7"],
    ["f28", 3, "o3", "comprender", "¿Qué significa que la Escritura es suficiente?", "Que contiene todo lo que necesitamos para la salvación y para vivir como agrada a Dios", ["Que no hace falta leerla", "Que habla de todos los temas de la ciencia", "Que hay que completarla con revelaciones nuevas"], "«a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra».", "2 Timoteo 3:17"],
    ["f29", 3, "o3", "comprender", "¿Qué significa que la Escritura es clara?", "Que un creyente sencillo puede entender lo esencial: el evangelio y lo que Dios le pide", ["Que todo en ella es fácil", "Que solo los expertos la entienden", "Que nunca necesita ser explicada"], "El testimonio de Jehová es fiel, que hace sabio al sencillo.", "Salmos 19:7"],
    ["f30", 3, "o3", "evaluar", "Una persona dice que Dios le reveló algo que contradice la Biblia. ¿Qué dice la lección?", "Ninguna revelación de hoy está por encima de la Escritura ni puede contradecirla", ["Hay que obedecer la revelación nueva", "Depende de cuántos la crean", "La Biblia debe corregirse"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    // ---- lección 4: el Dios que existe y tiene nombre (10)
    ["f31", 4, "o4", "recordar", "¿Con qué palabras empieza la Biblia?", "En el principio creó Dios los cielos y la tierra", ["Dios existe, y aquí están las pruebas", "En el principio era el caos", "Había una vez un pueblo"], "«En el principio creó Dios los cielos y la tierra».", "Génesis 1:1"],
    ["f32", 4, "o4", "comprender", "¿Por qué la Biblia llama necio al que dice que no hay Dios?", "Porque cierra los ojos a la evidencia que Dios ha dado, no por falta de inteligencia", ["Porque no estudió", "Porque es pobre", "Porque no va a la iglesia"], "«Dice el necio en su corazón: No hay Dios».", "Salmos 14:1"],
    ["f33", 4, "o4", "recordar", "Según Hebreos 11:6, ¿sin qué es imposible agradar a Dios?", "Sin fe", ["Sin dinero", "Sin estudios", "Sin sacrificios de animales"], "«Pero sin fe es imposible agradar a Dios».", "Hebreos 11:6"],
    ["f34", 4, "o4", "comprender", "¿Qué significa que Dios se puede conocer, pero no del todo?", "Que lo conocemos de verdad porque se reveló, aunque es infinito y nunca lo abarcaremos", ["Que no podemos saber nada de él", "Que ya lo sabemos todo de él", "Que cada uno lo conoce a su manera"], "«¡Oh profundidad de las riquezas de la sabiduría y de la ciencia de Dios!».", "Romanos 11:33"],
    ["f35", 4, "o4", "recordar", "¿Qué dice Dios de sus caminos en Isaías 55:9?", "Que son más altos que nuestros caminos, como los cielos son más altos que la tierra", ["Que son iguales a los nuestros", "Que no tiene caminos", "Que dependen de nosotros"], "«así son mis caminos más altos que vuestros caminos».", "Isaías 55:9"],
    ["f36", 4, "o4", "comprender", "¿Qué expresa el nombre YHWH, que la Reina-Valera traduce como Jehová?", "Que Dios existe por sí mismo, es eterno y está presente con su pueblo, fiel a su pacto", ["Que Dios es uno de muchos dioses", "Que Dios cambia según la época", "Que Dios está lejos"], "«YO SOY EL QUE SOY».", "Éxodo 3:14"],
    ["f37", 4, "o4", "recordar", "¿Qué significa Elohim?", "Dios, el Creador poderoso", ["Jehová proveerá", "Dios con nosotros", "El Señor de la paz"], "«En el principio creó Dios los cielos y la tierra».", "Génesis 1:1"],
    ["f38", 4, "o4", "recordar", "¿Qué nombre dio Abraham al monte donde Dios proveyó el sacrificio?", "Jehová proveerá", ["Jehová es mi bandera", "Jehová es paz", "Jehová es mi pastor"], "«Y llamó Abraham el nombre de aquel lugar, Jehová proveerá».", "Génesis 22:14"],
    ["f39", 4, "o4", "analizar", "¿Por qué quisieron apedrear a Jesús cuando dijo: Antes que Abraham fuese, yo soy?", "Porque entendieron que se identificaba con el Dios que dijo YO SOY a Moisés", ["Porque mintió sobre su edad", "Porque insultó a Abraham", "Porque habló en día de reposo"], "«Antes que Abraham fuese, yo soy».", "Juan 8:58"],
    ["f40", 4, "o4", "aplicar", "Una persona pasa por necesidad. ¿Qué nombre de Dios le recuerda su cuidado?", "Jehová proveerá", ["Elohim, como un Creador lejano", "Ninguno: Dios no se ocupa de eso", "El Dios desconocido"], "Abraham llamó a aquel lugar Jehová proveerá.", "Génesis 22:14"],
    // ---- lección 5: los atributos de Dios (10)
    ["f41", 5, "o5", "recordar", "¿Qué dice Salmos 90:2 de Dios?", "Desde el siglo y hasta el siglo, tú eres Dios", ["Que Dios empezó a existir con el mundo", "Que Dios dejará de existir", "Que Dios cambia con los siglos"], "«Desde el siglo y hasta el siglo, tú eres Dios».", "Salmos 90:2"],
    ["f42", 5, "o5", "comprender", "¿Por qué es una buena noticia que Dios no cambie?", "Porque sus promesas y su carácter siempre son firmes", ["Porque así no escucha la oración", "Porque nunca hará nada nuevo", "No es una buena noticia"], "«Porque yo Jehová no cambio; por esto, hijos de Jacob, no habéis sido consumidos».", "Malaquías 3:6"],
    ["f43", 5, "o5", "comprender", "¿Qué significa que Dios es omnisciente?", "Que lo sabe todo, también lo que pensamos", ["Que está en todo lugar", "Que lo puede todo", "Que no cambia"], "Dios conoce nuestro sentarnos y levantarnos, y entiende desde lejos nuestros pensamientos.", "Salmos 139:2"],
    ["f44", 5, "o5", "comprender", "¿Qué significa que Dios es omnipotente?", "Que puede hacer todo lo que quiere, de acuerdo con su naturaleza", ["Que puede hacer cosas malas", "Que puede dejar de ser Dios", "Que lo sabe todo"], "Dios hizo el cielo y la tierra con su gran poder, y no hay nada que sea difícil para él.", "Jeremías 32:17"],
    ["f45", 5, "o5", "analizar", "Si Dios es omnipotente, ¿puede mentir o pecar?", "No: su poder actúa siempre de acuerdo con su naturaleza santa", ["Sí, porque lo puede todo", "Sí, pero no quiere", "Depende de la situación"], "Dios no miente.", "Tito 1:2"],
    ["f46", 5, "o5", "comprender", "¿Qué es la santidad de Dios?", "Su perfección moral y su separación de todo lo malo", ["Su tamaño", "Su lejanía del mundo", "Su enojo"], "«Santo, santo, santo, Jehová de los ejércitos».", "Isaías 6:3"],
    ["f47", 5, "o5", "recordar", "¿Qué dice 1 Juan 4:8 de Dios?", "Que Dios es amor", ["Que Dios es indiferente", "Que Dios es una fuerza", "Que Dios es lejano"], "«El que no ama, no ha conocido a Dios; porque Dios es amor».", "1 Juan 4:8"],
    ["f48", 5, "o5", "recordar", "¿Qué son nuevas cada mañana, según Lamentaciones 3:22-23?", "Las misericordias de Dios", ["Las leyes del templo", "Las pruebas de la vida", "Los pecados del pueblo"], "«Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad».", "Lamentaciones 3:22-23"],
    ["f49", 5, "o5", "analizar", "¿Cómo se unen la justicia y el amor de Dios en la cruz?", "El pecado recibe su castigo en Cristo, y el pecador que cree es justificado", ["Dios deja de ser justo para ser amoroso", "Dios deja de amar para ser justo", "No se unen: se contradicen"], "«a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús».", "Romanos 3:26"],
    ["f50", 5, "o5", "aplicar", "Una creyente se siente sola en una ciudad nueva. ¿Qué atributo de Dios la consuela?", "Que Dios está en todo lugar: nunca está sola", ["Que Dios es lejano", "Que Dios cambia de lugar", "Ninguno: Dios no se interesa"], "«¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?».", "Salmos 139:7"],
    // ---- lección 6: la Trinidad, la creación y la providencia (10)
    ["f51", 6, "o6", "recordar", "¿Qué dice Deuteronomio 6:4 sobre Dios?", "Que Jehová nuestro Dios, Jehová uno es", ["Que hay tres dioses", "Que cada nación tiene su dios", "Que Dios no tiene nombre"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
    ["f52", 6, "o6", "comprender", "¿Qué muestra Hechos 5:3-4 sobre el Espíritu Santo?", "Que es Dios: mentirle al Espíritu Santo es mentirle a Dios", ["Que es un ángel", "Que es una fuerza impersonal", "Que es lo mismo que la conciencia"], "«No has mentido a los hombres, sino a Dios».", "Hechos 5:4"],
    ["f53", 6, "o6", "recordar", "¿Quiénes se manifiestan en el bautismo de Jesús?", "El Padre que habla, el Hijo que sale del agua y el Espíritu que desciende como paloma", ["Solo el Hijo", "Moisés, Elías y Jesús", "Tres ángeles"], "«Este es mi Hijo amado, en quien tengo complacencia».", "Mateo 3:17"],
    ["f54", 6, "o6", "comprender", "¿Qué enseña la fórmula del bautismo de Mateo 28:19?", "Un solo nombre y tres personas: el Padre, el Hijo y el Espíritu Santo", ["Tres dioses distintos", "Una sola persona con tres títulos", "Que solo se bautiza en el nombre del Padre"], "«bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo».", "Mateo 28:19"],
    ["f55", 6, "o6", "evaluar", "Un grupo enseña que Dios es una sola persona que a veces se muestra como Padre, a veces como Hijo y a veces como Espíritu. ¿Qué error es?", "El modalismo", ["El triteísmo", "El arrianismo", "La doctrina de la Trinidad"], "En el bautismo de Jesús los tres están a la vez: el Padre habla desde el cielo sobre el Hijo.", "Mateo 3:16-17"],
    ["f56", 6, "o6", "evaluar", "¿Qué error enseña que el Hijo es una criatura y no Dios eterno?", "El arrianismo", ["El modalismo", "El triteísmo", "La providencia"], "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
    ["f57", 6, "o6", "comprender", "¿Qué significa que Dios creó de la nada?", "Que hizo todo por su palabra, sin materia que existiera antes", ["Que dio forma a una materia eterna", "Que el mundo salió de Dios como una parte de él", "Que el mundo se hizo solo"], "«de modo que lo que se ve fue hecho de lo que no se veía».", "Hebreos 11:3"],
    ["f58", 6, "o6", "recordar", "¿Qué dice Colosenses 1:17 de Cristo y la creación?", "Que todas las cosas en él subsisten", ["Que la creación se sostiene sola", "Que Cristo fue creado primero", "Que la creación es mala"], "«Y él es antes de todas las cosas, y todas las cosas en él subsisten».", "Colosenses 1:17"],
    ["f59", 6, "o6", "analizar", "¿Qué no significa la providencia de Dios?", "Que Dios sea el autor del mal o que el ser humano no sea responsable", ["Que Dios sostiene la creación", "Que Dios gobierna la historia", "Que nada escapa de su mano"], "A los que aman a Dios, todas las cosas les ayudan a bien.", "Romanos 8:28"],
    ["f60", 6, "o6", "aplicar", "¿Por qué ninguna comparación, como el agua, el huevo o el trébol, explica bien la Trinidad?", "Porque terminan pareciéndose a algún error, como el modalismo o un dios en tres partes", ["Porque la Trinidad no existe", "Porque son comparaciones demasiado difíciles", "Porque la Biblia prohíbe hablar de Dios"], "Confesamos lo que la Biblia enseña y adoramos al Padre, al Hijo y al Espíritu Santo.", "2 Corintios 13:14"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué emite un día a otro día, según Salmos 19:2?", "Palabra", ["Silencio", "Olvido", "Tinieblas"], "«Un día emite palabra a otro día, Y una noche a otra noche declara sabiduría».", "Salmos 19:2"],
      ["m1-02", 1, "o1", "comprender", "¿A quiénes llega la revelación general?", "A todas las personas, en todo lugar", ["Solo a los judíos", "Solo a los creyentes", "Solo a los sacerdotes"], "«Por toda la tierra salió su voz, Y hasta el extremo del mundo sus palabras».", "Salmos 19:4"],
      ["m1-03", 1, "o1", "analizar", "¿Qué diferencia hay entre la revelación general y la especial?", "La general muestra a todos el poder de Dios; la especial da a conocer su salvación por su Palabra y por Cristo", ["No hay diferencia", "La general es falsa y la especial verdadera", "La especial es para todos y la general para unos pocos"], "Dios nos ha hablado por el Hijo.", "Hebreos 1:2"],
      ["m1-04", 1, "o1", "recordar", "¿Qué hizo Dios por medio del Hijo, según Hebreos 1:2?", "Hizo el universo", ["Escribió la ley de Moisés", "Construyó el templo", "Nada antes de su nacimiento"], "«a quien constituyó heredero de todo, y por quien asimismo hizo el universo».", "Hebreos 1:2"],
      ["m1-05", 1, "o1", "aplicar", "Si Cristo es la revelación suprema de Dios, ¿cómo debe leerse la Biblia?", "A la luz de Cristo", ["Sin pensar en Cristo", "Solo el Antiguo Testamento", "Solo los textos fáciles"], "El unigénito Hijo nos ha dado a conocer al Padre.", "Juan 1:18"],
      ["m1-06", 1, "o1", "comprender", "¿De qué da testimonio la conciencia, según Romanos 2:15?", "De que la obra de la ley está escrita en el corazón", ["De que no hay ley", "De que el pecado no existe", "De que cada uno hace su propia ley"], "«dando testimonio su conciencia, y acusándoles o defendiéndoles sus razonamientos».", "Romanos 2:15"],
      ["m1-07", 2, "o2", "recordar", "¿Para qué es útil la Escritura, según 2 Timoteo 3:16?", "Para enseñar, redargüir, corregir e instruir en justicia", ["Para adivinar el futuro", "Para ganar discusiones", "Para adornar la casa"], "«y útil para enseñar, para redargüir, para corregir, para instruir en justicia».", "2 Timoteo 3:16"],
      ["m1-08", 2, "o2", "comprender", "¿Qué muestra Lucas 1:3 sobre la inspiración?", "Que Dios usó la investigación cuidadosa de los autores", ["Que Lucas escribió sin pensar", "Que la Biblia no tiene autores humanos", "Que Lucas inventó su evangelio"], "Lucas investigó con diligencia todas las cosas desde su origen.", "Lucas 1:3"],
      ["m1-09", 2, "o2", "analizar", "¿Por qué decimos que la Biblia tiene dos autores?", "Porque la escribieron hombres guiados por el Espíritu Santo para que fuera Palabra de Dios", ["Porque tiene dos testamentos", "Porque la escribieron dos personas", "Porque la corrigieron dos concilios"], "Los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo.", "2 Pedro 1:21"],
      ["m1-10", 2, "o2", "recordar", "¿Qué vino a hacer Jesús con la ley y los profetas, según Mateo 5:17?", "A cumplirlos", ["A abrogarlos", "A cambiarlos", "A olvidarlos"], "«No penséis que he venido para abrogar la ley o los profetas; no he venido para abrogar, sino para cumplir».", "Mateo 5:17"],
      ["m1-11", 2, "o2", "evaluar", "¿Cuál de estas frases sobre la inspiración es correcta?", "Toda la Escritura es inspirada, hasta sus palabras", ["Solo las ideas son inspiradas", "Solo lo que nos gusta es inspirado", "Cada lector decide qué es inspirado"], "Toda la Escritura es inspirada por Dios.", "2 Timoteo 3:16"],
      ["m1-12", 2, "o2", "comprender", "¿Qué confiesa la declaración de fe del ministerio sobre la Biblia?", "Que es la Palabra de Dios inspirada, sin error en lo que enseña y suficiente para la fe y la conducta", ["Que es un libro de consejos humanos", "Que tiene errores en lo que enseña", "Que necesita completarse con revelaciones nuevas"], "Toda la Escritura es inspirada por Dios, y útil para enseñar.", "2 Timoteo 3:16"],
      ["m1-13", 3, "o3", "recordar", "¿Qué hace el testimonio de Jehová, según Salmos 19:7?", "Hace sabio al sencillo", ["Confunde al sabio", "Aleja al pecador", "Cansa al lector"], "«El testimonio de Jehová es fiel, que hace sabio al sencillo».", "Salmos 19:7"],
      ["m1-14", 3, "o3", "comprender", "¿En qué es sin error la Biblia?", "En todo lo que afirma: la fe, la conducta y los hechos que narra", ["Solo en lo espiritual", "Solo en los mandamientos", "En nada: tiene errores"], "Toda palabra de Dios es limpia.", "Proverbios 30:5"],
      ["m1-15", 3, "o3", "aplicar", "Un amigo dice que la Biblia se cambió con los siglos. ¿Qué respuesta da la lección?", "Que las miles de copias antiguas, como los rollos del mar Muerto, muestran que el texto se conservó en lo esencial", ["Que tiene razón", "Que nadie sabe nada", "Que hay que creer sin pensar"], "La palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué la iluminación del Espíritu no añade revelaciones a la Biblia?", "Porque abre el entendimiento para comprender lo que ya está escrito", ["Porque el Espíritu no existe", "Porque la Biblia está incompleta", "Porque solo ilumina a los pastores"], "Hemos recibido el Espíritu que proviene de Dios para que sepamos lo que Dios nos ha concedido.", "1 Corintios 2:12"],
      ["m1-17", 3, "o3", "recordar", "Según 1 Corintios 2:14, ¿quién no percibe las cosas que son del Espíritu de Dios?", "El hombre natural", ["El hombre espiritual", "El que ora", "El que estudia la Biblia"], "«Pero el hombre natural no percibe las cosas que son del Espíritu de Dios».", "1 Corintios 2:14"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál es el lugar correcto de las profecías y las visiones de hoy?", "Se examinan a la luz de la Biblia, que está por encima de ellas", ["Están por encima de la Biblia", "Valen lo mismo que la Biblia", "No se examinan nunca"], "No menospreciéis las profecías. Examinadlo todo; retened lo bueno.", "1 Tesalonicenses 5:20-21"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué dice el necio en su corazón, según Salmos 14:1?", "No hay Dios", ["Dios es bueno", "Dios me ve", "Quiero conocer a Dios"], "«Dice el necio en su corazón: No hay Dios».", "Salmos 14:1"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué la buena teología termina en adoración?", "Porque cuanto más conocemos a Dios, más vemos su grandeza", ["Porque la teología es aburrida", "Porque así lo exige la costumbre", "Porque ya lo sabemos todo de Dios"], "«Porque de él, y por él, y para él, son todas las cosas. A él sea la gloria por los siglos. Amén».", "Romanos 11:36"],
      ["m2-03", 4, "o4", "recordar", "¿Qué debía decir Moisés a los hijos de Israel, según Éxodo 3:14?", "YO SOY me envió a vosotros", ["El Dios de Faraón me envió", "El Dios sin nombre me envió", "Los dioses de Egipto me enviaron"], "«Así dirás a los hijos de Israel: YO SOY me envió a vosotros».", "Éxodo 3:14"],
      ["m2-04", 4, "o4", "comprender", "¿Qué significa Adonai?", "Señor, el que tiene autoridad", ["Creador", "Todopoderoso", "Proveedor"], "«Oh Jehová, Señor nuestro, ¡Cuán glorioso es tu nombre en toda la tierra!».", "Salmos 8:1"],
      ["m2-05", 4, "o4", "analizar", "¿Qué relación hay entre el YO SOY de Éxodo 3 y Juan 8:58?", "Jesús usó para sí el nombre con que Dios se reveló a Moisés", ["Ninguna", "Jesús se refería a su edad", "Jesús negaba ser Dios"], "«Antes que Abraham fuese, yo soy».", "Juan 8:58"],
      ["m2-06", 4, "o4", "aplicar", "¿Qué nombre de Dios te recuerda que él tiene autoridad sobre tu vida?", "Adonai, el Señor", ["Ninguno", "Elohim, como un Creador lejano", "Jehová proveerá, solo para lo material"], "Oh Jehová, Señor nuestro.", "Salmos 8:1"],
      ["m2-07", 5, "o5", "recordar", "¿Qué pregunta David en Salmos 139:7?", "¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?", ["¿Por qué me has desamparado?", "¿Hasta cuándo, oh Jehová?", "¿Quién soy yo?"], "«¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?».", "Salmos 139:7"],
      ["m2-08", 5, "o5", "comprender", "¿Cuál de estos atributos comparte Dios en parte con el ser humano?", "El amor", ["La omnipresencia", "La eternidad", "La omnipotencia"], "Amados, amémonos unos a otros; porque el amor es de Dios.", "1 Juan 4:7"],
      ["m2-09", 5, "o5", "comprender", "¿Cuál de estos atributos es solo de Dios?", "La omnipresencia", ["El amor", "La justicia", "La fidelidad"], "Si subiere a los cielos, allí está Dios; y si en el Seol hiciere mi estrado, allí está.", "Salmos 139:8"],
      ["m2-10", 5, "o5", "aplicar", "Si Dios es santo, ¿qué pide a sus hijos?", "Que sean santos en toda su manera de vivir", ["Nada: solo él es santo", "Que vivan como quieran", "Que se aparten de todas las personas"], "«sed también vosotros santos en toda vuestra manera de vivir».", "1 Pedro 1:15"],
      ["m2-11", 5, "o5", "analizar", "¿Qué muestra la cruz sobre los atributos de Dios?", "Que su justicia y su amor no se contradicen", ["Que Dios no es justo", "Que Dios no ama", "Que Dios cambió de carácter"], "Dios es el justo, y el que justifica al que es de la fe de Jesús.", "Romanos 3:26"],
      ["m2-12", 5, "o5", "recordar", "¿Qué hizo Dios con Cristo, según Romanos 3:25?", "Lo puso como propiciación por medio de la fe en su sangre", ["Lo hizo un ángel", "Lo envió solo como maestro", "Lo dejó en la tumba"], "«a quien Dios puso como propiciación por medio de la fe en su sangre».", "Romanos 3:25"],
      ["m2-13", 6, "o6", "recordar", "¿Qué dijo la voz del cielo en el bautismo de Jesús?", "Este es mi Hijo amado, en quien tengo complacencia", ["Arrepentíos, porque el reino se ha acercado", "Yo soy el que soy", "Preparad el camino del Señor"], "«Este es mi Hijo amado, en quien tengo complacencia».", "Mateo 3:17"],
      ["m2-14", 6, "o6", "comprender", "¿Qué enseña el triteísmo, y por qué es un error?", "Que hay tres dioses separados; contradice que Dios es uno", ["Que hay un solo Dios; no es un error", "Que el Hijo es una criatura", "Que Dios es una persona con tres máscaras"], "Jehová nuestro Dios, Jehová uno es.", "Deuteronomio 6:4"],
      ["m2-15", 6, "o6", "aplicar", "¿Qué pasaje nombra juntas a las tres personas de la Trinidad en una bendición?", "2 Corintios 13:14", ["Génesis 5:1", "Números 1:1", "Ester 2:1"], "«La gracia del Señor Jesucristo, el amor de Dios, y la comunión del Espíritu Santo sean con todos vosotros. Amén».", "2 Corintios 13:14"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el bautismo de Jesús contradice el modalismo?", "Porque el Padre, el Hijo y el Espíritu aparecen a la vez, como personas distintas", ["Porque solo aparece el Hijo", "Porque Jesús no se bautizó", "No lo contradice"], "«Este es mi Hijo amado, en quien tengo complacencia».", "Mateo 3:17"],
      ["m2-17", 6, "o6", "recordar", "Según Mateo 10:29, ¿cuántos pajarillos caen a tierra sin el Padre?", "Ni uno", ["La mitad", "Todos", "Muchos"], "«Con todo, ni uno de ellos cae a tierra sin vuestro Padre».", "Mateo 10:29"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál de estas afirmaciones sobre la providencia es correcta?", "Dios sostiene y gobierna todo, y a los que lo aman todas las cosas les ayudan a bien", ["Dios creó el mundo y lo dejó solo", "Todo ocurre por casualidad", "Dios es el autor del mal"], "«Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien».", "Romanos 8:28"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-sistematica-1-e1",
      tipo: "corta",
      pregunta: "Explica, con Salmos 19 o Romanos 1 y con Hebreos 1:1-2, la diferencia entre la revelación general y la revelación especial.",
      ideas: [
        { id: "general", peso: 30, texto: "La revelación general: la creación y la conciencia muestran a todos el poder de Dios.", formas: ["creacion", "cielos", "conciencia", "naturaleza", "eterno poder"] },
        { id: "especial", peso: 30, texto: "La revelación especial: Dios habló por los profetas y por su Hijo, y quedó escrita en la Biblia.", formas: ["profetas", "por el hijo", "su hijo", "biblia", "escritura*"] },
        { id: "salvar", peso: 20, texto: "La general no basta para salvar; la especial da a conocer el evangelio.", formas: ["no basta", "salv*", "evangelio", "no tienen excusa", "sin excusa"], negativa: true },
        { id: "cristo", peso: 10, texto: "Cristo es la revelación suprema.", formas: ["suprema", "el que me ha visto", "dado a conocer", "unigenito"] },
      ],
      citas: ["Salmos 19:1", "Salmos 19:1-4", "Romanos 1:19-20", "Romanos 1:20", "Hebreos 1:1-2", "Hebreos 1:2", "Juan 1:18", "Juan 14:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la revelación general, la creación y la conciencia muestran a todos el poder de Dios: los cielos cuentan su gloria (Salmos 19:1). Pero no basta para salvar. En la revelación especial, Dios habló por los profetas y al final por su Hijo (Hebreos 1:1-2), y quedó escrita en la Biblia. Cristo es la revelación suprema.",
    },
    {
      id: "n4-sistematica-1-e2",
      tipo: "corta",
      pregunta: "Explica qué significa que la Escritura es inspirada por Dios, con 2 Timoteo 3:16 y 2 Pedro 1:21, y cómo participaron los autores humanos.",
      ideas: [
        { id: "exhalada", peso: 30, texto: "Que la Escritura sale de Dios: es exhalada por él.", formas: ["exhalad*", "aliento", "sale de dios", "viene de dios", "palabra de dios"] },
        { id: "espiritu", peso: 25, texto: "Los autores hablaron guiados por el Espíritu Santo.", formas: ["espiritu santo", "guiad*", "movid*"] },
        { id: "humanos", peso: 25, texto: "Dios usó su personalidad y su estilo, sin anularlos.", formas: ["estilo", "personalidad", "investig*", "sin anular*", "lucas"] },
        { id: "plenaria", peso: 10, texto: "Toda la Escritura, hasta sus palabras.", formas: ["toda la escritura", "plenaria", "verbal", "sus palabras"] },
      ],
      citas: ["2 Timoteo 3:16", "2 Timoteo 3:16-17", "2 Pedro 1:20-21", "2 Pedro 1:21", "Lucas 1:3", "Juan 10:35"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Que la Escritura es inspirada significa que es exhalada por Dios: sale de él como el aliento (2 Timoteo 3:16). Los autores hablaron guiados por el Espíritu Santo, no por voluntad humana (2 Pedro 1:21). Dios usó su personalidad y su estilo, como la investigación de Lucas, sin anularlos, y toda la Escritura, hasta sus palabras, es Palabra de Dios.",
    },
    {
      id: "n4-sistematica-1-e3",
      tipo: "corta",
      pregunta: "Explica la doctrina de la Trinidad con dos pasajes bíblicos y menciona un error que la contradice.",
      ideas: [
        { id: "uno", peso: 25, texto: "Hay un solo Dios.", formas: ["un solo dios", "uno es", "un dios", "jehova uno"] },
        { id: "tres", peso: 30, texto: "Existe eternamente en tres personas: el Padre, el Hijo y el Espíritu Santo.", formas: ["tres personas", "personas distintas", "iguales en esencia"] },
        { id: "pasajes", peso: 15, texto: "Los pasajes: el bautismo de Jesús, Mateo 28:19 o 2 Corintios 13:14.", formas: ["bautismo", "bautiz*", "en el nombre del padre", "la gracia del señor jesucristo"] },
        { id: "error", peso: 20, texto: "Un error que la contradice: el modalismo, el triteísmo o el arrianismo.", formas: ["modalismo", "triteismo", "arrianismo", "unicitari*", "solo jesus", "testigos de jehova", "tres dioses"] },
      ],
      citas: ["Deuteronomio 6:4", "Mateo 28:19", "Mateo 3:16-17", "2 Corintios 13:14", "Juan 1:1", "Hechos 5:3-4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hay un solo Dios: Jehová uno es (Deuteronomio 6:4). Pero existe eternamente en tres personas, el Padre, el Hijo y el Espíritu Santo: en el bautismo de Jesús aparecen los tres, y él mandó bautizar en el nombre del Padre, y del Hijo, y del Espíritu Santo (Mateo 28:19). El modalismo, que hace de Dios una sola persona, lo contradice.",
    },
    {
      id: "n4-sistematica-1-e4",
      tipo: "breve",
      pregunta:
        "Explica la doctrina de las Escrituras: la inspiración, la autoridad, la confiabilidad del texto y la suficiencia de la Biblia, y cómo cambia tu manera de leerla y de obedecerla. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "inspiracion", peso: 20, texto: "La inspiración: la Escritura es exhalada por Dios por medio del Espíritu Santo.", formas: ["inspirad*", "exhalad*", "espiritu santo", "aliento"] },
        { id: "autoridad", peso: 20, texto: "La autoridad: la Escritura no puede ser quebrantada; es la última palabra.", formas: ["autoridad", "no puede ser quebrantada", "ultima palabra", "jota", "tilde"] },
        { id: "sinerror", peso: 15, texto: "Sin error en lo que enseña, porque Dios no miente.", formas: ["sin error", "no miente", "limpia"] },
        { id: "texto", peso: 15, texto: "El texto se conservó: miles de copias antiguas.", formas: ["copias", "manuscritos", "mar muerto", "rollos", "originales"] },
        { id: "suficiente", peso: 15, texto: "La suficiencia: todo lo que necesitamos para la salvación y para toda buena obra.", formas: ["suficiente", "suficiencia", "toda buena obra", "todo lo que necesit*"] },
        { id: "aplicacion", peso: 15, texto: "Cómo cambia su manera de leer y obedecer.", formas: ["voy a", "obedec*", "mi vida", "aplic*", "cada dia"] },
      ],
      basta: 85,
      citas: ["2 Timoteo 3:16", "2 Timoteo 3:16-17", "2 Timoteo 3:17", "2 Pedro 1:20-21", "2 Pedro 1:21", "Mateo 5:18", "Juan 10:35", "Proverbios 30:5", "Isaías 40:8", "Salmos 19:7", "Tito 1:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La Biblia es inspirada por Dios: toda la Escritura es exhalada por él (2 Timoteo 3:16), y sus autores hablaron siendo inspirados por el Espíritu Santo (2 Pedro 1:21), con su propio estilo, pero escribiendo la Palabra de Dios hasta en sus palabras. Por eso tiene autoridad: Jesús dijo que la Escritura no puede ser quebrantada (Juan 10:35) y que ni una jota ni una tilde pasará de la ley. Como viene de Dios, que no miente, es sin error en lo que enseña. Y podemos confiar en el texto que tenemos: aunque no conservamos los originales, hay miles de copias antiguas, como los rollos del mar Muerto, que muestran que se conservó en lo esencial, porque la palabra del Dios nuestro permanece para siempre (Isaías 40:8). Además, es suficiente: contiene todo lo que necesito para la salvación y para estar preparado para toda buena obra. Esto cambia mi manera de leerla: no la voy a leer como un libro más, sino como la voz de Dios. Voy a leerla cada día con oración, voy a obedecer lo que entienda aunque me cueste y voy a medir toda enseñanza, toda profecía y mis propias ideas por lo que ella dice.",
    },
    {
      id: "n4-sistematica-1-e5",
      tipo: "breve",
      pregunta:
        "Explica la doctrina de Dios: su existencia, sus nombres, dos atributos que solo él tiene, dos que comparte en parte con nosotros, y cómo la Trinidad y la providencia te ayudan a confiar en él. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "existencia", peso: 10, texto: "La existencia de Dios.", formas: ["existe", "le hay", "necio", "no hay dios", "en el principio"] },
        { id: "nombres", peso: 15, texto: "Sus nombres.", formas: ["yo soy", "jehova", "elohim", "adonai", "todopoderoso", "proveera", "yhwh"] },
        { id: "incomunicables", peso: 20, texto: "Atributos que solo él tiene: eterno, inmutable, omnipresente, omnisciente, omnipotente.", formas: ["eterno", "inmutable", "no cambio", "omnipresente", "omnisciente", "omnipotente", "todo lugar"] },
        { id: "comunicables", peso: 20, texto: "Atributos que comparte en parte: santo, amor, justo, fiel.", formas: ["santo", "santidad", "amor", "justo", "justicia", "fiel", "fidelidad", "misericordia"] },
        { id: "trinidad", peso: 20, texto: "La Trinidad.", formas: ["tres personas", "trinidad", "padre hijo y espiritu"] },
        { id: "providencia", peso: 15, texto: "La providencia y la confianza.", formas: ["providencia", "sostiene", "gobierna", "ayudan a bien", "subsisten", "pajarillo*"] },
      ],
      basta: 85,
      citas: ["Hebreos 11:6", "Éxodo 3:14", "Salmos 90:2", "Malaquías 3:6", "Salmos 139:7", "Salmos 139:7-10", "Isaías 6:3", "1 Juan 4:8", "Deuteronomio 6:4", "Mateo 28:19", "2 Corintios 13:14", "Romanos 8:28", "Colosenses 1:17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La Biblia no trata de probar que Dios existe: empieza diciendo que en el principio creó Dios los cielos y la tierra, y enseña que el que se acerca a Dios debe creer que le hay (Hebreos 11:6). Dios se dio a conocer con sus nombres: a Moisés le dijo YO SOY EL QUE SOY (Éxodo 3:14), el nombre que la Reina-Valera traduce como Jehová, el Dios fiel a su pacto; también es Elohim, el Creador, y el Dios Todopoderoso. Hay atributos que solo él tiene: es eterno, desde el siglo y hasta el siglo es Dios, e inmutable, porque él dice: yo Jehová no cambio (Malaquías 3:6). Y hay atributos que comparte en parte con nosotros: es santo, santo, santo, y es amor (1 Juan 4:8). Este único Dios existe eternamente en tres personas, el Padre, el Hijo y el Espíritu Santo, como muestra el mandato de bautizar en el nombre de los tres (Mateo 28:19). Saber que el Dios trino me ama y que en su providencia sostiene y gobierna todas las cosas me ayuda a confiar en él, porque a los que aman a Dios, todas las cosas les ayudan a bien (Romanos 8:28).",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 4
  breve: {
    id: "n4-sistematica-1-b1",
    tipo: "breve",
    pregunta:
      "Escoge un atributo de Dios y escribe una meditación: qué significa, dos pasajes que lo enseñan, cómo se ve en la obra de Cristo y cómo cambiará tu manera de orar o de vivir esta semana. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "atributo", peso: 15, texto: "El atributo escogido.", formas: ["escogi", "atributo", "santidad", "santo", "amor", "fidelidad", "fiel", "justicia", "omnipresen*", "omniscien*", "omnipoten*", "eterno", "inmutab*", "misericordia"] },
      { id: "significa", peso: 20, texto: "Qué significa.", formas: ["significa", "quiere decir", "es decir"] },
      { id: "pasajes", peso: 15, texto: "Lo que enseñan dos pasajes.", formas: ["dice", "enseña", "ensena", "leemos", "escrito"] },
      { id: "cristo", peso: 20, texto: "Cómo se ve en la obra de Cristo.", formas: ["cristo", "jesus", "cruz"] },
      { id: "vida", peso: 20, texto: "Cómo cambiará su oración o su vida esta semana.", formas: ["orar*", "oracion", "voy a", "esta semana", "mi vida"] },
      { id: "adoracion", peso: 10, texto: "Una respuesta de adoración y confianza.", formas: ["adora*", "alab*", "gracias", "confi*", "consuelo"] },
    ],
    basta: 85,
    citas: ["Isaías 6:3", "1 Pedro 1:15-16", "1 Juan 4:8", "1 Juan 4:9-10", "Juan 3:16", "Lamentaciones 3:22-23", "Malaquías 3:6", "Salmos 90:2", "Salmos 139:7-10", "Salmos 139:1-4", "Jeremías 32:17", "Deuteronomio 32:4", "Romanos 3:26", "Romanos 5:8", "Hebreos 13:8", "Salmos 103:8", "2 Timoteo 2:13"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí la fidelidad de Dios. Que Dios es fiel significa que siempre cumple lo que promete y que nunca deja de ser quien es, aunque nosotros fallemos. Lamentaciones lo dice en medio del dolor: por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias; nuevas son cada mañana; grande es tu fidelidad (Lamentaciones 3:22-23). Y Pablo enseña que, si fuéremos infieles, él permanece fiel, porque no puede negarse a sí mismo (2 Timoteo 2:13). La fidelidad de Dios se ve sobre todo en Cristo: Dios prometió desde Génesis un Salvador, y lo cumplió enviando a su Hijo, que murió en la cruz y resucitó, como estaba escrito. Por eso esta semana voy a cambiar mi manera de orar: cada mañana, antes de pedir nada, voy a dar gracias por una promesa que Dios ya cumplió en mi vida, y voy a orar con confianza por mi familia, sabiendo que el que prometió es fiel. Cuando me sienta débil, voy a recordar que mi seguridad no depende de mi fidelidad, sino de la suya, y lo voy a adorar.",
  },
};
