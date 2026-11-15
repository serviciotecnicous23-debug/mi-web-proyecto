/**
 * El banco de «El Sermón del monte» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el contexto, las partes y el propósito del Sermón · o2 el carácter del discípulo (bienaventuranzas, sal
 * y luz) · o3 Jesús cumple la ley y la lleva al corazón · o4 la piedad, el dinero, la ansiedad, el juicio y la
 * obediencia · o5 el versículo de memoria (Mateo 6:33).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-sermon-monte-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_SERMON_MONTE: BancoMateria = {
  materia: "n2-sermon-monte",
  repaso: {
    "n2-sermon-monte-1": ([
      ["1-r1", 1, "o1", "recordar", "¿En qué capítulos de Mateo está el Sermón del monte?", "Mateo 5 a 7", ["Mateo 1 a 3", "Mateo 10 a 12", "Mateo 26 a 28"], "El Sermón del monte ocupa los capítulos 5, 6 y 7 del Evangelio de Mateo.", "Mateo 5:1-2"],
      ["1-r2", 1, "o1", "comprender", "¿Qué anunciaba Jesús al comenzar a predicar, según Mateo 4:17?", "Que el reino de los cielos se había acercado", ["Que el templo sería reconstruido", "Que Roma caería muy pronto", "Que la ley ya no importaba"], "Jesús predicaba: Arrepentíos, porque el reino de los cielos se ha acercado.", "Mateo 4:17"],
      ["1-r3", 1, "o1", "comprender", "¿Por qué se admiraba la gente al terminar el Sermón?", "Porque Jesús enseñaba como quien tiene autoridad", ["Porque hablaba más fuerte que nadie", "Porque citaba a muchos rabinos", "Porque prometía riquezas a todos"], "Les enseñaba como quien tiene autoridad, y no como los escribas.", "Mateo 7:28-29"],
    ] as P[]).map(p),
    "n2-sermon-monte-2": ([
      ["2-r1", 2, "o2", "comprender", "¿Qué significa bienaventurado en la enseñanza de Jesús?", "Dichoso por la aprobación de Dios", ["Rico y famoso ante los demás", "Que nunca tiene ningún sufrimiento", "Que cumple reglas para ser aceptado"], "Las bienaventuranzas describen la dicha de quienes viven en el reino de Dios, aun en el llanto o la persecución.", "Mateo 5:3-12"],
      ["2-r2", 2, "o2", "recordar", "Según Mateo 5:3, ¿de quiénes es el reino de los cielos?", "De los pobres en espíritu", ["De los ricos de la tierra", "De los fuertes y valientes", "De los sabios del mundo"], "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.", "Mateo 5:3"],
      ["2-r3", 2, "o2", "recordar", "¿Qué promete Jesús a los de limpio corazón?", "Que verán a Dios", ["Que serán ricos", "Que nunca tendrán problemas", "Que gobernarán la tierra"], "Bienaventurados los de limpio corazón, porque ellos verán a Dios.", "Mateo 5:8"],
    ] as P[]).map(p),
    "n2-sermon-monte-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Qué dijo Jesús que son sus discípulos, según Mateo 5:13-14?", "La sal de la tierra y la luz del mundo", ["El pan de vida y el agua viva", "Los jueces de todas las naciones", "Los dueños de la tierra prometida"], "Jesús dijo: Vosotros sois la sal de la tierra, y también: Vosotros sois la luz del mundo.", "Mateo 5:13-14"],
      ["3-r2", 3, "o3", "comprender", "¿Para qué vino Jesús en relación con la ley, según Mateo 5:17?", "Para cumplirla", ["Para abolirla", "Para cambiarla por otra", "Para dejarla solo a los judíos"], "No he venido para abrogar, sino para cumplir.", "Mateo 5:17"],
      ["3-r3", 3, "o2", "comprender", "¿Para qué deben verse las buenas obras del discípulo, según Mateo 5:16?", "Para que glorifiquen al Padre que está en los cielos", ["Para que todos admiren al discípulo", "Para ganar la salvación con ellas", "Para que la iglesia se haga famosa"], "Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos.", "Mateo 5:16"],
    ] as P[]).map(p),
    "n2-sermon-monte-4": ([
      ["4-r1", 4, "o3", "comprender", "¿Qué enseñó Jesús sobre el enojo en Mateo 5:22?", "Que enojarse contra el hermano ya es culpable de juicio", ["Que solo el homicidio es pecado", "Que el enojo nunca le importa a Dios", "Que hay que vengarse pronto"], "Jesús dijo que cualquiera que se enoje contra su hermano será culpable de juicio.", "Mateo 5:21-22"],
      ["4-r2", 4, "o3", "recordar", "Según Mateo 5:24, ¿qué hay que hacer antes de presentar la ofrenda si tu hermano tiene algo contra ti?", "Reconciliarse primero con el hermano", ["Dar una ofrenda más grande", "Esperar a que él venga a pedir perdón", "Orar más fuerte en el altar"], "Deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano.", "Mateo 5:23-24"],
      ["4-r3", 4, "o3", "recordar", "¿Qué manda Jesús hacer con los enemigos, según Mateo 5:44?", "Amarlos y orar por ellos", ["Evitarlos para siempre", "Vengarse de ellos", "Tolerarlos sin hablarles"], "Jesús manda amar a los enemigos, bendecir a los que maldicen y orar por los que persiguen.", "Mateo 5:44"],
    ] as P[]).map(p),
    "n2-sermon-monte-5": ([
      ["5-r1", 5, "o4", "recordar", "Según Mateo 6:2, ¿qué no hay que hacer al dar limosna?", "Tocar trompeta para ser alabados", ["Darla en secreto", "Darla con alegría", "Darla a los pobres"], "Cuando des limosna, no hagas tocar trompeta delante de ti, como hacen los hipócritas, para ser alabados por los hombres.", "Mateo 6:2"],
      ["5-r2", 5, "o4", "comprender", "Según Mateo 6:21, ¿qué revela nuestro tesoro?", "Dónde está nuestro corazón", ["Cuánto nos ama Dios", "Si somos salvos o no", "Cuántos años vamos a vivir"], "Donde esté vuestro tesoro, allí estará también vuestro corazón.", "Mateo 6:21"],
      ["5-r3", 5, "o4", "aplicar", "¿Qué debemos buscar primero, según Mateo 6:33?", "El reino de Dios y su justicia", ["La comida y el vestido", "Un buen trabajo", "La aprobación de los demás"], "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", "Mateo 6:33"],
    ] as P[]).map(p),
    "n2-sermon-monte-6": ([
      ["6-r1", 6, "o4", "comprender", "¿Qué clase de juicio prohíbe Jesús en Mateo 7:1-5?", "El juicio hipócrita, que ve la paja ajena y no la viga propia", ["Todo discernimiento entre el bien y el mal", "La justicia que hacen las autoridades", "La corrección hecha con amor y humildad"], "Jesús reprende al que mira la paja en el ojo de su hermano y no ve la viga en el suyo.", "Mateo 7:3-5"],
      ["6-r2", 6, "o4", "recordar", "¿Cuál es la regla de oro, según Mateo 7:12?", "Hacer con los demás lo que queremos que hagan con nosotros", ["Ayudar solo a quien nos ha ayudado", "Devolver a cada uno mal por mal", "Pensar primero en uno mismo y después en otros"], "Todas las cosas que queráis que los hombres hagan con vosotros, así también haced vosotros con ellos.", "Mateo 7:12"],
      ["6-r3", 6, "o4", "comprender", "¿Quién es el hombre prudente, según Mateo 7:24?", "El que oye las palabras de Jesús y las hace", ["El que las oye y las admira", "El que las memoriza sin vivirlas", "El que las enseña sin hacerlas"], "Cualquiera que me oye estas palabras, y las hace, le compararé a un hombre prudente, que edificó su casa sobre la roca.", "Mateo 7:24"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el Rey enseña en el monte (8)
    ["f01", 1, "o1", "recordar", "¿Dónde se sentó Jesús a enseñar el sermón de Mateo 5 a 7?", "En el monte", ["En la sinagoga de Nazaret", "En una barca", "En el templo de Jerusalén"], "Viendo la multitud, subió al monte; y sentándose, vinieron a él sus discípulos.", "Mateo 5:1"],
    ["f02", 1, "o1", "comprender", "¿A quiénes enseñaba Jesús en el Sermón del monte?", "A sus discípulos, mientras la multitud escuchaba", ["Solo a los fariseos del templo", "Solo a los soldados romanos", "A nadie: lo escribió en un libro"], "Vinieron a él sus discípulos y les enseñaba; al final, la gente se admiraba de su doctrina.", "Mateo 5:1-2"],
    ["f03", 1, "o1", "comprender", "¿Qué es el reino de los cielos que anunciaba Jesús?", "El gobierno de Dios que llega con Jesús, el Rey", ["Un reino político contra Roma", "Un lugar solo para después de la muerte", "Una religión nueva hecha de reglas"], "Jesús recorría Galilea predicando el evangelio del reino y sanando toda enfermedad: el reino llegaba con Él.", "Mateo 4:23"],
    ["f04", 1, "o1", "comprender", "¿Por qué el Sermón del monte no es un camino para ganar la salvación?", "Porque describe la vida de quien ya sigue a Jesús, salvo por gracia", ["Porque sus enseñanzas ya no tienen valor", "Porque solo era para los doce apóstoles", "Porque nadie debe intentar vivirlo"], "Somos salvos por gracia, por medio de la fe; el Sermón muestra la vida nueva del discípulo.", "Efesios 2:8-9"],
    ["f05", 1, "o1", "recordar", "¿Qué parte del Sermón describe el carácter del discípulo?", "Las bienaventuranzas", ["Los dos cimientos", "El Padre Nuestro", "La regla de oro"], "El Sermón empieza con las bienaventuranzas, que describen el carácter del discípulo.", "Mateo 5:3-12"],
    ["f06", 1, "o1", "recordar", "¿Con qué termina el Sermón del monte?", "Con las dos casas, sobre la roca y sobre la arena", ["Con el Padre Nuestro", "Con las bienaventuranzas", "Con la multiplicación de los panes"], "Jesús termina con el hombre prudente que edificó sobre la roca y el insensato que edificó sobre la arena.", "Mateo 7:24-27"],
    ["f07", 1, "o1", "comprender", "¿En qué se diferenciaba la enseñanza de Jesús de la de los escribas?", "Jesús enseñaba con autoridad propia", ["Jesús solo repetía a otros maestros", "Los escribas hablaban con más poder", "Jesús evitaba hablar de la ley"], "Les enseñaba como quien tiene autoridad, y no como los escribas.", "Mateo 7:29"],
    ["f08", 1, "o1", "aplicar", "Alguien dice que el Sermón del monte es bonito pero imposible de vivir. ¿Qué le responderías?", "Que Jesús lo dio para vivirlo con la ayuda de su Espíritu", ["Que tiene razón y no hay que intentarlo", "Que solo lo vivieron los apóstoles", "Que basta con admirarlo de lejos"], "Jesús llama prudente al que oye sus palabras y las hace; el Espíritu nos da poder para obedecer.", "Mateo 7:24"],
    // ---- lección 2: las bienaventuranzas (8)
    ["f09", 2, "o2", "recordar", "¿Qué promete Jesús a los que lloran?", "Que recibirán consolación", ["Que nunca volverán a llorar", "Que recibirán riquezas", "Que serán famosos"], "Bienaventurados los que lloran, porque ellos recibirán consolación.", "Mateo 5:4"],
    ["f10", 2, "o2", "recordar", "¿Qué recibirán los mansos, según Mateo 5:5?", "La tierra por heredad", ["Un trono en Roma", "Muchos siervos", "Una vida larga sin pruebas"], "Bienaventurados los mansos, porque ellos recibirán la tierra por heredad.", "Mateo 5:5"],
    ["f11", 2, "o2", "comprender", "¿Qué significa ser manso?", "Tener la fuerza bajo el control de Dios, sin imponerse", ["Ser débil y no tener opinión", "Dejar que todos abusen de uno", "No sentir nada ante el mal"], "Los mansos no se imponen por la fuerza: confían en Dios, que les dará la tierra por heredad.", "Mateo 5:5"],
    ["f12", 2, "o2", "comprender", "¿Qué significa ser pobre en espíritu?", "Reconocer que dependemos totalmente de Dios", ["No tener dinero", "Tener poca fe", "No tener ganas de orar"], "Los pobres en espíritu reconocen su necesidad de Dios, y de ellos es el reino de los cielos.", "Mateo 5:3"],
    ["f13", 2, "o2", "recordar", "¿Cómo serán llamados los pacificadores?", "Hijos de Dios", ["Reyes de la tierra", "Sabios del mundo", "Jueces de Israel"], "Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.", "Mateo 5:9"],
    ["f14", 2, "o2", "recordar", "¿Qué alcanzarán los misericordiosos?", "Misericordia", ["Riquezas", "Fama", "Poder"], "Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.", "Mateo 5:7"],
    ["f15", 2, "o2", "comprender", "¿Cómo deben reaccionar los discípulos cuando los persiguen por causa de Cristo, según Mateo 5:11-12?", "Gozarse y alegrarse, porque su galardón es grande en los cielos", ["Vengarse de quienes los persiguen", "Dejar de seguir a Cristo por un tiempo", "Esconder su fe para siempre"], "Gozaos y alegraos, porque vuestro galardón es grande en los cielos.", "Mateo 5:11-12"],
    ["f16", 2, "o2", "analizar", "¿Por qué se dice que las bienaventuranzas van al revés del mundo?", "Porque Dios llama dichosos a los que el mundo desprecia", ["Porque prohíben ser felices", "Porque son solo para los ricos", "Porque no traen ninguna promesa"], "Los pobres en espíritu, los que lloran y los mansos son los que Dios llama bienaventurados.", "Mateo 5:3-5"],
    // ---- lección 3: la sal, la luz y una justicia mayor (8)
    ["f17", 3, "o2", "comprender", "¿Qué hace la sal, que ilustra la influencia del discípulo?", "Da sabor y preserva de la corrupción", ["Endulza las comidas", "Hace crecer las plantas", "Ilumina la casa"], "Jesús llama a sus discípulos la sal de la tierra: su vida da sabor y frena la corrupción.", "Mateo 5:13"],
    ["f18", 3, "o2", "recordar", "¿Qué pasa con la sal que pierde su sabor, según Mateo 5:13?", "No sirve más para nada", ["Se vuelve dulce", "Sirve para alumbrar", "Recupera el sabor sola"], "Si la sal se desvaneciere, no sirve más para nada, sino para ser echada fuera.", "Mateo 5:13"],
    ["f19", 3, "o2", "recordar", "¿Con qué compara Jesús a sus discípulos en Mateo 5:14?", "Con una ciudad asentada sobre un monte", ["Con una cueva escondida", "Con una nube pasajera", "Con un río bajo la tierra"], "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.", "Mateo 5:14"],
    ["f20", 3, "o2", "aplicar", "¿Cuál es una forma de ser luz en el trabajo?", "Hacer buenas obras que lleven a otros a glorificar a Dios", ["Esconder la fe para no incomodar", "Hablar de Dios sin vivir lo que se dice", "Criticar a los compañeros que no creen"], "Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras.", "Mateo 5:16"],
    ["f21", 3, "o3", "comprender", "¿Qué significa que Jesús cumple la ley?", "Que la obedece perfectamente, cumple sus promesas y muestra su sentido", ["Que la borra para siempre", "Que la cambia por reglas nuevas", "Que solo la cumplen los judíos"], "No he venido para abrogar, sino para cumplir.", "Mateo 5:17"],
    ["f22", 3, "o3", "recordar", "Según Mateo 5:18, ¿qué no pasará de la ley hasta que todo se haya cumplido?", "Ni una jota ni una tilde", ["Solo los diez mandamientos", "Solo las fiestas", "Solo los sacrificios"], "Ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido.", "Mateo 5:18"],
    ["f23", 3, "o3", "recordar", "¿Mayor que la justicia de quiénes debe ser la justicia del discípulo?", "De los escribas y fariseos", ["De los soldados romanos", "De los publicanos", "De los samaritanos"], "Si vuestra justicia no fuere mayor que la de los escribas y fariseos, no entraréis en el reino de los cielos.", "Mateo 5:20"],
    ["f24", 3, "o3", "analizar", "¿En qué consiste la justicia mayor que pide Jesús?", "En un corazón transformado, no en cumplir más reglas por fuera", ["En hacer más ayunos que los fariseos", "En memorizar toda la ley de Moisés", "En apartarse de los pecadores"], "Dios escribe su ley en el corazón: la justicia del reino nace de adentro.", "Jeremías 31:33"],
    // ---- lección 4: el corazón de la ley (7)
    ["f25", 4, "o3", "recordar", "¿Qué frase repite Jesús al llevar la ley al corazón?", "Oísteis que fue dicho, pero yo os digo", ["Así dice Moisés en el monte", "Los ancianos enseñan así", "Está escrito en los profetas"], "Jesús cita la ley y luego enseña con su propia autoridad: Pero yo os digo.", "Mateo 5:21-22"],
    ["f26", 4, "o3", "comprender", "Según Jesús, ¿dónde comienza el adulterio?", "En la mirada y el deseo del corazón", ["Solo en el acto físico", "En el matrimonio mismo", "En la ley de Moisés"], "Cualquiera que mira a una mujer para codiciarla, ya adulteró con ella en su corazón.", "Mateo 5:28"],
    ["f27", 4, "o3", "recordar", "¿Cómo debe ser el hablar del discípulo, según Mateo 5:37?", "Sí, sí; no, no", ["Con muchos juramentos", "Jurando por el cielo", "Con palabras dudosas"], "Sea vuestro hablar: Sí, sí; no, no; porque lo que es más de esto, de mal procede.", "Mateo 5:37"],
    ["f28", 4, "o3", "comprender", "¿Qué propósito tenía la ley del ojo por ojo?", "Poner un límite al castigo que daban los jueces", ["Permitir la venganza personal", "Castigar con dureza a los niños", "Prohibir que hubiera juicios"], "La ley ponía límite al castigo; Jesús enseña a no vengarse: No resistáis al que es malo.", "Mateo 5:38-39"],
    ["f29", 4, "o3", "aplicar", "Una hermana sufre violencia en su casa y cree que debe soportarla porque Jesús dijo que pusiera la otra mejilla. ¿Qué le dirías?", "Que Jesús prohíbe la venganza, no la justicia, y que busque protección", ["Que debe soportarlo en silencio", "Que se vengue cuanto antes", "Que deje de orar por su casa"], "Dios puso autoridades para castigar el mal; Jesús nos quita la venganza, no el derecho a estar protegidos.", "Romanos 13:4"],
    ["f30", 4, "o3", "recordar", "¿Sobre quiénes hace salir el Padre su sol, según Mateo 5:45?", "Sobre malos y buenos", ["Solo sobre los buenos", "Solo sobre Israel", "Solo sobre los que oran"], "Hace salir su sol sobre malos y buenos, y hace llover sobre justos e injustos.", "Mateo 5:45"],
    ["f31", 4, "o3", "comprender", "¿Qué significa ser perfectos como el Padre, según Mateo 5:48?", "Amar de forma completa, también a los enemigos", ["No equivocarse nunca", "Ser mejores que los demás", "Cumplir reglas sin amor"], "Jesús lo dice al terminar de hablar del amor a los enemigos: el Padre ama a malos y buenos.", "Mateo 5:43-48"],
    // ---- lección 5: la piedad en lo secreto y el tesoro en el cielo (7)
    ["f32", 5, "o4", "recordar", "¿Qué tres prácticas de piedad menciona Jesús en Mateo 6:1-18?", "Dar limosna, orar y ayunar", ["Cantar, danzar y predicar", "Diezmar, bautizar y viajar", "Leer, escribir y enseñar"], "Jesús habla de la limosna, la oración y el ayuno hechos delante del Padre.", "Mateo 6:1-18"],
    ["f33", 5, "o4", "comprender", "Según Mateo 6:3, ¿cómo se da la limosna?", "Que no sepa tu izquierda lo que hace tu derecha", ["Anunciándola en la sinagoga", "Con una trompeta delante", "Solo una vez al año"], "Mas cuando tú des limosna, no sepa tu izquierda lo que hace tu derecha.", "Mateo 6:3"],
    ["f34", 5, "o4", "recordar", "Según Mateo 6:24, ¿a quiénes no se puede servir a la vez?", "A Dios y a las riquezas", ["Al padre y a la madre", "Al pastor y al líder", "A la iglesia y a la familia"], "Ninguno puede servir a dos señores. No podéis servir a Dios y a las riquezas.", "Mateo 6:24"],
    ["f35", 5, "o4", "comprender", "¿Por qué no debemos afanarnos, según Mateo 6:26-32?", "Porque el Padre sabe lo que necesitamos y cuida de nosotros", ["Porque las cosas materiales no importan", "Porque Dios nos dará todo lo que queramos", "Porque trabajar es malo"], "Vuestro Padre celestial sabe que tenéis necesidad de todas estas cosas.", "Mateo 6:32"],
    ["f36", 5, "o4", "recordar", "¿Qué ejemplos de la creación usa Jesús contra la ansiedad?", "Las aves del cielo y los lirios del campo", ["Los peces y las estrellas", "Los leones y las ovejas", "Los montes y los ríos"], "Jesús invita a mirar las aves del cielo y a considerar los lirios del campo.", "Mateo 6:26-28"],
    ["f37", 5, "o4", "aplicar", "¿Cuál es una manera de hacer tesoros en el cielo?", "Dar con generosidad y servir a otros por amor a Dios", ["Ahorrar todo sin compartir con nadie", "Comprar cosas para la iglesia y presumirlas", "Esperar a ser rico para ayudar a otros"], "Haceos tesoros en el cielo, donde ni la polilla ni el orín corrompen.", "Mateo 6:20"],
    ["f38", 5, "o5", "recordar", "¿Cómo termina Mateo 6:33, el versículo de memoria de esta materia?", "Y todas estas cosas os serán añadidas", ["Y la paz de Dios guardará vuestros corazones", "Porque el día de mañana traerá su afán", "Y hallaréis descanso para vuestras almas"], "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", "Mateo 6:33"],
    // ---- lección 6: los dos caminos y la casa sobre la roca (7)
    ["f39", 6, "o4", "recordar", "¿Qué hay que sacar primero, según Mateo 7:5?", "La viga del propio ojo", ["La paja del ojo del hermano", "Al hermano de la iglesia", "Los pecados de los demás"], "Saca primero la viga de tu propio ojo, y entonces verás bien para sacar la paja del ojo de tu hermano.", "Mateo 7:5"],
    ["f40", 6, "o4", "comprender", "¿Prohíbe Jesús todo discernimiento cuando dice no juzguéis?", "No: pide reconocer a los falsos profetas por sus frutos", ["Sí: nunca hay que distinguir el bien del mal", "Sí: hay que aceptar cualquier enseñanza", "No: solo los pastores pueden juzgar"], "Por sus frutos los conoceréis.", "Mateo 7:15-16"],
    ["f41", 6, "o4", "recordar", "¿Qué promete Jesús al que pide, busca y llama?", "Que recibe, halla y se le abre", ["Que tendrá que esperar para siempre", "Que solo recibirá si lo merece", "Que nunca será escuchado"], "Porque todo aquel que pide, recibe; y el que busca, halla; y al que llama, se le abrirá.", "Mateo 7:7-8"],
    ["f42", 6, "o4", "comprender", "¿Qué enseña la comparación del padre que da pan a su hijo?", "Que el Padre celestial da buenas cosas a los que le piden", ["Que Dios da piedras a quien pide mal", "Que no hay que pedirle nada a Dios", "Que los padres de la tierra son mejores"], "¿Cuánto más vuestro Padre que está en los cielos dará buenas cosas a los que le pidan?", "Mateo 7:9-11"],
    ["f43", 6, "o4", "recordar", "¿Adónde lleva el camino angosto?", "A la vida", ["A la perdición", "A la riqueza", "Al templo"], "Estrecha es la puerta, y angosto el camino que lleva a la vida, y pocos son los que la hallan.", "Mateo 7:14"],
    ["f44", 6, "o4", "comprender", "Según Mateo 7:21, ¿quién entrará en el reino de los cielos?", "El que hace la voluntad del Padre", ["Todo el que dice Señor, Señor", "El que hace muchos milagros", "El que sabe la Biblia de memoria"], "No todo el que me dice: Señor, Señor, entrará en el reino de los cielos, sino el que hace la voluntad de mi Padre.", "Mateo 7:21"],
    ["f45", 6, "o4", "analizar", "¿Qué diferencia a las dos casas de Mateo 7:24-27?", "El cimiento: una sobre la roca y otra sobre la arena", ["El tamaño de cada casa", "La tormenta: solo una la sufrió", "El material del techo"], "La tormenta cayó sobre las dos; la de la roca no cayó, porque estaba fundada sobre la roca.", "Mateo 7:24-27"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hizo Jesús al ver la multitud, según Mateo 5:1?", "Subió al monte y se sentó a enseñar", ["Se fue en una barca", "Despidió a la gente", "Entró en Jerusalén"], "Viendo la multitud, subió al monte; y sentándose, vinieron a él sus discípulos.", "Mateo 5:1"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué es significativo que Jesús enseñara desde un monte?", "Recuerda la ley dada en el Sinaí, pero Jesús enseña con autoridad propia", ["Porque así no lo escuchaba nadie", "Porque estaba prohibido enseñar en las ciudades", "Porque allí hacía menos calor"], "Como la ley se dio en un monte, Jesús enseña desde el monte la voluntad de Dios.", "Mateo 5:1-2"],
      ["m1-03", 1, "o1", "recordar", "¿Qué región recorría Jesús enseñando y sanando, según Mateo 4:23?", "Toda Galilea", ["Toda Roma", "Egipto", "Grecia"], "Recorrió Jesús toda Galilea, enseñando en las sinagogas de ellos, y predicando el evangelio del reino.", "Mateo 4:23"],
      ["m1-04", 1, "o1", "comprender", "¿Qué describe el Sermón del monte?", "La vida de quienes pertenecen al reino de Dios", ["La historia de Israel en Egipto", "Las leyes del imperio romano", "La construcción del templo"], "Jesús enseña cómo se vive en el reino que Él trae: de los pobres en espíritu es el reino de los cielos.", "Mateo 5:3"],
      ["m1-05", 1, "o1", "recordar", "¿En qué capítulo del Sermón están el Padre Nuestro y la enseñanza sobre el afán?", "Mateo 6", ["Mateo 5", "Mateo 7", "Mateo 8"], "Mateo 6 trata la piedad en lo secreto, el Padre Nuestro, el tesoro y la ansiedad.", "Mateo 6:9-13"],
      ["m1-06", 1, "o1", "aplicar", "¿Cuál es la actitud correcta al estudiar el Sermón del monte?", "Oírlo para ponerlo por obra con la ayuda de Dios", ["Admirarlo como una obra literaria", "Leerlo solo para debatir", "Pensar que es para otras personas"], "El prudente es el que oye estas palabras y las hace.", "Mateo 7:24"],
      ["m1-07", 2, "o2", "recordar", "¿Qué promete Jesús a los que tienen hambre y sed de justicia?", "Que serán saciados", ["Que serán ricos", "Que serán perseguidos", "Que serán olvidados"], "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.", "Mateo 5:6"],
      ["m1-08", 2, "o2", "comprender", "¿Qué significa tener hambre y sed de justicia?", "Anhelar de verdad vivir como Dios manda y ver su justicia", ["Querer castigar a los demás", "Ayunar para ganar el cielo", "Desear justicia solo para uno mismo"], "Quien tiene hambre y sed de justicia será saciado por Dios.", "Mateo 5:6"],
      ["m1-09", 2, "o2", "recordar", "Además de los pobres en espíritu, ¿de quiénes es el reino de los cielos?", "De los que padecen persecución por causa de la justicia", ["De los que nunca sufren", "De los que tienen poder", "De los que tienen fama"], "Bienaventurados los que padecen persecución por causa de la justicia, porque de ellos es el reino de los cielos.", "Mateo 5:10"],
      ["m1-10", 2, "o2", "comprender", "¿Qué es un pacificador?", "El que busca la reconciliación entre las personas y con Dios", ["El que evita todo problema callando", "El que nunca da su opinión", "El que gana todas las discusiones"], "Los pacificadores serán llamados hijos de Dios: se parecen a su Padre, que reconcilia.", "Mateo 5:9"],
      ["m1-11", 2, "o2", "comprender", "¿Qué significa tener limpio corazón?", "Amar a Dios con sinceridad, sin doblez", ["Lavarse antes de orar", "No tener ningún problema", "Cumplir ritos de purificación"], "Los de limpio corazón verán a Dios.", "Mateo 5:8"],
      ["m1-12", 2, "o2", "aplicar", "¿Cómo vivir esta semana la bienaventuranza de los misericordiosos?", "Perdonar a alguien y ayudar a quien lo necesita", ["Esperar que otros sean misericordiosos primero", "Ayudar solo a los amigos", "Guardar rencor en silencio"], "Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.", "Mateo 5:7"],
      ["m1-13", 3, "o2", "recordar", "¿Dónde no se pone la luz, según Mateo 5:15?", "Debajo de un almud", ["Sobre el candelero", "Sobre la mesa", "Junto a la puerta"], "Ni se enciende una luz y se pone debajo de un almud, sino sobre el candelero.", "Mateo 5:15"],
      ["m1-14", 3, "o2", "comprender", "¿Qué quiere decir Jesús con una ciudad asentada sobre un monte?", "Que la vida del discípulo no se puede esconder", ["Que hay que vivir en las montañas", "Que la iglesia debe estar lejos", "Que hay que construir templos altos"], "Una ciudad asentada sobre un monte no se puede esconder.", "Mateo 5:14"],
      ["m1-15", 3, "o3", "recordar", "¿Qué no vino Jesús a hacer con la ley, según Mateo 5:17?", "Abrogarla", ["Cumplirla", "Enseñarla", "Explicarla"], "No penséis que he venido para abrogar la ley o los profetas; no he venido para abrogar, sino para cumplir.", "Mateo 5:17"],
      ["m1-16", 3, "o3", "comprender", "Según Mateo 5:19, ¿quién será llamado grande en el reino de los cielos?", "El que hace los mandamientos y los enseña", ["El que los quebranta y así enseña", "El que los conoce sin cumplirlos", "El que los cambia a su gusto"], "Cualquiera que los haga y los enseñe, éste será llamado grande en el reino de los cielos.", "Mateo 5:19"],
      ["m1-17", 3, "o3", "comprender", "¿Cómo podemos tener la justicia mayor que pide Jesús?", "Por la gracia de Dios, que nos declara justos y nos da un corazón nuevo", ["Cumpliendo más reglas que los fariseos", "Solo por nuestro propio esfuerzo", "Comparándonos con los demás"], "Dios dice que dará su ley en la mente de su pueblo y la escribirá en su corazón.", "Jeremías 31:33"],
      ["m1-18", 3, "o2", "aplicar", "Un joven cristiano esconde su fe en la escuela para no llamar la atención. ¿Qué le enseña Mateo 5:14-16?", "Que su vida es luz y debe alumbrar con buenas obras", ["Que hace bien en esconderla", "Que la fe es solo para la iglesia", "Que debe discutir con todos"], "Así alumbre vuestra luz delante de los hombres.", "Mateo 5:16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿Qué palabra de desprecio menciona Jesús en Mateo 5:22?", "Necio", ["Hermano", "Amigo", "Maestro"], "Cualquiera que diga: Necio, a su hermano, será culpable ante el concilio.", "Mateo 5:22"],
      ["m2-02", 4, "o3", "comprender", "¿Por qué pide Jesús reconciliarse antes de presentar la ofrenda?", "Porque Dios no se agrada del culto de quien desprecia a su hermano", ["Porque la ofrenda no importa", "Porque así se ahorra dinero", "Porque el altar estaba cerrado"], "Reconcíliate primero con tu hermano, y entonces ven y presenta tu ofrenda.", "Mateo 5:24"],
      ["m2-03", 4, "o3", "recordar", "¿Qué enseña Jesús que hagamos con lo que nos hace caer, según Mateo 5:29-30?", "Quitarlo de nuestra vida con firmeza", ["Mirarlo con cuidado", "Esconderlo de los demás", "Negociar con ello"], "Si tu ojo derecho te es ocasión de caer, sácalo, y échalo de ti: es una imagen de cortar con firmeza el pecado.", "Mateo 5:29-30"],
      ["m2-04", 4, "o3", "comprender", "¿Por qué el discípulo no necesita jurar?", "Porque su palabra siempre es verdad", ["Porque jurar da mala suerte", "Porque nadie le cree", "Porque los juramentos cuestan caro"], "Sea vuestro hablar: Sí, sí; no, no.", "Mateo 5:37"],
      ["m2-05", 4, "o3", "recordar", "¿Qué se había dicho sobre el prójimo y el enemigo, según Mateo 5:43?", "Amarás a tu prójimo, y aborrecerás a tu enemigo", ["Amarás a todos por igual", "No tendrás enemigos", "Perdonarás siete veces"], "Oísteis que fue dicho: Amarás a tu prójimo, y aborrecerás a tu enemigo. Jesús manda amar también a los enemigos.", "Mateo 5:43-44"],
      ["m2-06", 4, "o3", "aplicar", "Un compañero de trabajo te trata mal. ¿Qué enseña Jesús?", "Orar por él y hacerle bien", ["Devolverle lo mismo", "Hablar mal de él a sus espaldas", "Ignorarlo para siempre"], "Haced bien a los que os aborrecen, y orad por los que os ultrajan y os persiguen.", "Mateo 5:44"],
      ["m2-07", 5, "o4", "recordar", "¿Quién recompensa al que da en secreto?", "El Padre que ve en lo secreto", ["Los hombres que lo ven", "Los sacerdotes del templo", "Nadie"], "Tu Padre que ve en lo secreto te recompensará en público.", "Mateo 6:4"],
      ["m2-08", 5, "o4", "comprender", "¿Qué recompensa tienen los que hacen el bien para ser alabados?", "Ya la recibieron: el aplauso de los hombres", ["Una recompensa doble en el cielo", "La aprobación de Dios", "Un lugar especial en el reino"], "Para ser alabados por los hombres; de cierto os digo que ya tienen su recompensa.", "Mateo 6:2"],
      ["m2-09", 5, "o4", "recordar", "¿Qué corrompe los tesoros de la tierra, según Mateo 6:19?", "La polilla y el orín", ["La lluvia y el viento", "El fuego y el agua", "El tiempo y el sol"], "Donde la polilla y el orín corrompen, y donde ladrones minan y hurtan.", "Mateo 6:19"],
      ["m2-10", 5, "o4", "comprender", "¿Qué significa que nadie puede servir a dos señores?", "Que el corazón se entrega a Dios o al dinero, no a los dos", ["Que hay que tener un solo trabajo", "Que no hay que obedecer a nadie", "Que tener dinero es pecado"], "No podéis servir a Dios y a las riquezas.", "Mateo 6:24"],
      ["m2-11", 5, "o4", "recordar", "¿Qué basta a cada día, según Mateo 6:34?", "Su propio mal", ["Su propio pan", "Su propia oración", "Su propia alegría"], "No os afanéis por el día de mañana, porque el día de mañana traerá su afán. Basta a cada día su propio mal.", "Mateo 6:34"],
      ["m2-12", 5, "o4", "aplicar", "¿Qué hacer cuando la ansiedad por las cuentas no te deja dormir?", "Orar al Padre, confiar en su cuidado y buscar primero su reino", ["Afanarse más para resolverlo solo", "Dejar de trabajar del todo", "Pensar que a Dios no le importa"], "Vuestro Padre celestial sabe que tenéis necesidad de todas estas cosas.", "Mateo 6:32-33"],
      ["m2-13", 6, "o4", "recordar", "Según Mateo 7:2, ¿con qué medida seremos medidos?", "Con la misma medida con que medimos", ["Con una medida más pequeña", "Con la medida de la ley de Moisés", "Con ninguna medida"], "Con la medida con que medís, os será medido.", "Mateo 7:2"],
      ["m2-14", 6, "o4", "comprender", "¿Qué enseña la imagen de la paja y la viga?", "Que antes de corregir a otro hay que examinarse uno mismo", ["Que nunca hay que ayudar al hermano", "Que los pecados ajenos son mayores", "Que hay que buscar faltas en los demás"], "Saca primero la viga de tu propio ojo, y entonces verás bien.", "Mateo 7:5"],
      ["m2-15", 6, "o4", "recordar", "¿Cómo vienen los falsos profetas, según Mateo 7:15?", "Con vestidos de ovejas, pero por dentro son lobos rapaces", ["Con coronas de oro y mantos reales", "Con espadas en la mano", "Con ropas de sacerdote y en silencio"], "Vienen a vosotros con vestidos de ovejas, pero por dentro son lobos rapaces.", "Mateo 7:15"],
      ["m2-16", 6, "o4", "comprender", "¿Qué quiere decir que la puerta es estrecha?", "Que seguir a Jesús pide dejar el camino de la mayoría", ["Que solo caben los delgados", "Que solo entran los ricos", "Que es un lugar físico en Jerusalén"], "Estrecha es la puerta, y angosto el camino que lleva a la vida.", "Mateo 7:13-14"],
      ["m2-17", 6, "o4", "recordar", "¿Qué le pasó a la casa edificada sobre la arena?", "Cayó, y fue grande su ruina", ["Resistió la tormenta", "La reconstruyeron", "Nunca tuvo tormentas"], "Y cayó, y fue grande su ruina.", "Mateo 7:27"],
      ["m2-18", 6, "o4", "aplicar", "¿Qué significa edificar la vida sobre la roca?", "Oír las palabras de Jesús y ponerlas por obra", ["Ir a la iglesia sin cambiar nada", "Saber la Biblia de memoria sin obedecerla", "Tener una casa de piedra"], "Cualquiera que me oye estas palabras, y las hace, le compararé a un hombre prudente.", "Mateo 7:24"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-sermon-monte-e1",
      tipo: "corta",
      pregunta: "Explica qué es el Sermón del monte, a quiénes lo enseñó Jesús y por qué no es un camino para ganar la salvación.",
      ideas: [
        { id: "reino", peso: 25, texto: "Que describe la vida en el reino de Dios.", formas: ["reino"] },
        { id: "discipulos", peso: 25, texto: "Que Jesús lo enseñó a sus discípulos, a los que ya lo seguían.", formas: ["discipulo*", "seguidor*", "los que lo seguian", "creyentes"] },
        { id: "gracia", peso: 30, texto: "Que la salvación es por gracia y la vida del Sermón es posible por el Espíritu Santo.", formas: ["gracia", "espiritu santo", "regalo", "no por obras", "no se gana"] },
        { id: "autoridad", peso: 10, texto: "Que está en Mateo 5 a 7 o que Jesús enseña con autoridad.", formas: ["mateo 5", "autoridad", "monte"] },
      ],
      citas: ["Mateo 5:1-2", "Mateo 7:28-29", "Mateo 4:17", "Efesios 2:8-9", "Mateo 5:3"],
      pesoCita: 10,
      errores: [
        { id: "obras", anula: "gracia", texto: "La salvación no es por obras sino por gracia (Efesios 2:8-9); el Sermón describe la vida de quien ya sigue a Jesús.", formas: ["salvos por las obras", "salvos por obras", "las obras nos salvan", "nos salvan las obras"] },
      ],
      modelo:
        "El Sermón del monte, en Mateo 5 a 7, es la enseñanza de Jesús sobre la vida en el reino de los cielos. Lo enseñó a sus discípulos con autoridad (Mateo 7:28-29). No es un camino para ganar la salvación, que es por gracia (Efesios 2:8-9): describe la vida nueva que el Espíritu Santo produce.",
    },
    {
      id: "n2-sermon-monte-e2",
      tipo: "corta",
      pregunta: "¿Qué significa ser bienaventurado y qué enseñan las bienaventuranzas sobre el carácter del discípulo?",
      ideas: [
        { id: "dichoso", peso: 25, texto: "Que bienaventurado es dichoso o feliz por la aprobación de Dios.", formas: ["dichoso*", "feliz", "felices", "aprobacion de dios", "bendecido*"] },
        { id: "pobres", peso: 20, texto: "Los pobres en espíritu: depender de Dios.", formas: ["pobres en espiritu", "pobre en espiritu", "humild*", "depend*"] },
        { id: "rasgos", peso: 25, texto: "Otros rasgos: mansos, misericordiosos, limpios de corazón, pacificadores, los que lloran, hambre de justicia o perseguidos.", formas: ["manso*", "misericordioso*", "limpio corazon", "limpio de corazon", "limpios de corazon", "pacificador*", "lloran", "hambre y sed", "perseguid*"] },
        { id: "mundo", peso: 20, texto: "Que el reino da vuelta a los valores del mundo o que cada rasgo trae una promesa.", formas: ["mundo", "al reves", "promesa*", "reino"] },
      ],
      citas: ["Mateo 5:3-12", "Mateo 5:3", "Mateo 5:8", "Mateo 5:9", "Mateo 5:3-6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Ser bienaventurado es ser dichoso por la aprobación de Dios, no por las circunstancias. Las bienaventuranzas muestran que el discípulo es pobre en espíritu y depende de Dios, es manso, misericordioso, de limpio corazón y pacificador (Mateo 5:3-12). El reino de Dios da vuelta a los valores del mundo, y cada rasgo trae una promesa.",
    },
    {
      id: "n2-sermon-monte-e3",
      tipo: "corta",
      pregunta: "Explica cómo Jesús cumple la ley y da un ejemplo de cómo la lleva al corazón (Mateo 5:21-48).",
      ideas: [
        { id: "cumplir", peso: 25, texto: "Que Jesús no vino a abolir la ley sino a cumplirla.", formas: ["cumpl*"] },
        { id: "corazon", peso: 30, texto: "Que Jesús va a la raíz: el corazón, la intención.", formas: ["corazon", "raiz", "intencion", "por dentro", "interior"] },
        { id: "ejemplo", peso: 25, texto: "Un ejemplo: la ira, la mirada, los juramentos, la venganza o el amor a los enemigos.", formas: ["ira", "enojo", "enoja*", "adulterio", "codici*", "jura*", "venganza", "vengar*", "enemigos", "ojo por ojo", "otra mejilla", "reconcili*"] },
        { id: "autoridad", peso: 10, texto: "La frase pero yo os digo, o la autoridad de Jesús.", formas: ["yo os digo", "autoridad"] },
      ],
      citas: ["Mateo 5:17", "Mateo 5:17-20", "Mateo 5:21-22", "Mateo 5:27-28", "Mateo 5:43-44", "Mateo 5:21-24"],
      pesoCita: 10,
      errores: [
        { id: "abolio", anula: "cumplir", texto: "Jesús dijo lo contrario: que no vino a abrogar la ley, sino a cumplirla (Mateo 5:17).", formas: ["abolio la ley", "anulo la ley", "vino a abolir", "vino a abrogar", "vino a anular"] },
      ],
      modelo:
        "Jesús no vino a abrogar la ley, sino a cumplirla: la obedeció perfectamente y mostró su verdadero sentido (Mateo 5:17). Con la frase pero yo os digo la lleva al corazón: por ejemplo, no basta con no matar, porque el enojo y el desprecio ya son pecado, y hay que reconciliarse con el hermano (Mateo 5:21-24).",
    },
    {
      id: "n2-sermon-monte-e4",
      tipo: "corta",
      pregunta: "¿Qué enseñó Jesús sobre las riquezas y la ansiedad en Mateo 6, y cómo lo aplicarás?",
      ideas: [
        { id: "tesoro", peso: 25, texto: "Hacer tesoros en el cielo: donde está el tesoro, está el corazón.", formas: ["tesoro*"] },
        { id: "senores", peso: 20, texto: "Que no se puede servir a Dios y a las riquezas.", formas: ["dos senores", "servir a dios", "riquezas", "dinero"] },
        { id: "afan", peso: 25, texto: "No afanarse: el Padre cuida y sabe lo que necesitamos.", formas: ["afan*", "ansiedad", "preocup*", "padre cuida", "aves", "lirios"] },
        { id: "reino", peso: 20, texto: "Buscar primero el reino de Dios y su justicia.", formas: ["primeramente", "primero el reino", "reino de dios"] },
      ],
      citas: ["Mateo 6:33", "Mateo 6:19-21", "Mateo 6:24", "Mateo 6:25-34", "Mateo 6:31-34", "Mateo 6:21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús enseñó a hacer tesoros en el cielo, porque donde está nuestro tesoro está nuestro corazón, y que no se puede servir a Dios y a las riquezas (Mateo 6:24). También enseñó a no afanarnos, porque el Padre cuida de sus hijos. Lo aplicaré dando con generosidad y buscando primeramente el reino de Dios (Mateo 6:33).",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-sermon-monte-b1",
    tipo: "breve",
    pregunta:
      "Escribe con tus palabras cómo describe el Sermón del monte la vida del discípulo y qué cambio concreto hará en tu vida. Habla de las bienaventuranzas, de la justicia del corazón y de la casa sobre la roca, y usa al menos dos citas bíblicas.",
    ideas: [
      { id: "reino", peso: 10, texto: "La vida en el reino de Dios.", formas: ["reino"] },
      { id: "bienaventuranzas", peso: 15, texto: "Las bienaventuranzas y el carácter del discípulo.", formas: ["bienaventuranza*", "bienaventurado*", "pobres en espiritu", "pobre en espiritu", "manso*", "misericordioso*", "pacificador*"] },
      { id: "salluz", peso: 10, texto: "La sal y la luz.", formas: ["sal", "luz"] },
      { id: "corazon", peso: 15, texto: "Jesús cumple la ley y la lleva al corazón.", formas: ["corazon", "cumpl*", "ley"] },
      { id: "enemigos", peso: 10, texto: "La reconciliación y el amor a los enemigos.", formas: ["enemigos", "reconcili*", "perdon*", "venganza"] },
      { id: "piedad", peso: 10, texto: "La piedad en lo secreto o el tesoro en el cielo.", formas: ["secreto", "orar", "ayun*", "tesoro*", "limosna"] },
      { id: "confianza", peso: 10, texto: "No afanarse y buscar primero el reino.", formas: ["afan*", "preocup*", "primeramente", "reino de dios"] },
      { id: "roca", peso: 20, texto: "Edificar sobre la roca: oír y hacer.", formas: ["roca", "las hace", "obedec*", "poner por obra", "edific*"] },
    ],
    basta: 85,
    citas: ["Mateo 5:3-12", "Mateo 5:13-16", "Mateo 5:17", "Mateo 5:44", "Mateo 6:33", "Mateo 7:24-27", "Mateo 7:24", "Mateo 6:1", "Mateo 5:21-24"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El Sermón del monte describe la vida de quienes pertenecen al reino de Dios. Las bienaventuranzas muestran su carácter: el discípulo es pobre en espíritu, manso, misericordioso y pacificador (Mateo 5:3-12), y por eso es sal de la tierra y luz del mundo. Jesús no vino a abolir la ley, sino a cumplirla, y la lleva al corazón: no basta con no matar, hay que reconciliarse, y hay que amar aun a los enemigos (Mateo 5:44). La piedad se vive en lo secreto, delante del Padre, y el tesoro se guarda en el cielo. En vez de afanarme, quiero buscar primeramente el reino de Dios (Mateo 6:33). El sermón termina con dos casas: el prudente oye las palabras de Jesús y las hace, y edifica sobre la roca (Mateo 7:24-27). El cambio concreto que haré es buscar a una persona con quien estoy distanciado para reconciliarme, y orar cada día por quien me ha hecho daño. Así, con la ayuda del Espíritu Santo, quiero edificar mi vida sobre la roca.",
  },
};
