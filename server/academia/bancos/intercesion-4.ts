/**
 * El banco de «Guerra espiritual bíblica y equilibrada» (especialidad Intercesión y oración). SOLO SERVIDOR: respuestas y
 * claves. Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de
 * Bloom. Objetivos: o1 una batalla real, sin miedo ni descuido · o2 la victoria de Cristo · o3 la armadura de Dios ·
 * o4 someterse a Dios y resistir al diablo · o5 Jesús, los apóstoles y los espíritus malos · o6 los errores que hay que
 * evitar · o7 el versículo de memoria (Santiago 4:7).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `intercesion-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_INTERCESION_4: BancoMateria = {
  materia: "intercesion-4",
  repaso: {
    "intercesion-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Contra qué no tenemos lucha, según Efesios 6:12?", "Contra sangre y carne", ["Contra principados", "Contra potestades", "Contra huestes espirituales de maldad"], "«Porque no tenemos lucha contra sangre y carne».", "Efesios 6:10-12"],
      ["1-r2", 1, "o1", "comprender", "¿Cómo describe 1 Pedro 5:8 al diablo?", "Como león rugiente que anda buscando a quien devorar", ["Como un amigo inofensivo", "Como alguien que no existe", "Como un ser igual a Dios"], "«vuestro adversario el diablo, como león rugiente, anda alrededor buscando a quien devorar».", "1 Pedro 5:8-9"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano guarda rencor contra otro. ¿Qué le enseña 2 Corintios 2:10-11?", "Que perdonar evita que Satanás gane ventaja", ["Que el rencor lo protege", "Que el diablo no tiene que ver con el rencor", "Que no puede orar hasta que el otro le pida perdón"], "«para que Satanás no gane ventaja alguna sobre nosotros».", "2 Corintios 2:10-11"],
    ] as P[]).map(p),
    "intercesion-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo Cristo con los principados y las potestades en la cruz, según Colosenses 2:15?", "Los despojó, los exhibió públicamente y triunfó sobre ellos", ["Huyó de ellos", "Hizo un pacto con ellos", "Los dejó sin vencer"], "«y despojando a los principados y a las potestades, los exhibió públicamente, triunfando sobre ellos en la cruz».", "Colosenses 2:15"],
      ["2-r2", 2, "o2", "comprender", "¿Por qué Satanás no es un dios igual a Dios, según Colosenses 1:16?", "Porque los principados y las potestades fueron creados por medio de Cristo", ["Porque es más fuerte que Dios", "Porque existe desde siempre, como Dios", "Porque la Biblia no dice nada"], "«sean principados, sean potestades; todo fue creado por medio de él y para él».", "Colosenses 1:16"],
      ["2-r3", 2, "o2", "aplicar", "Una hermana nueva vive con miedo del diablo. ¿Qué le enseña 1 Juan 4:4?", "Que mayor es el que está en ella que el que está en el mundo", ["Que debe tener más miedo", "Que el diablo es más fuerte", "Que no puede hacer nada"], "«porque mayor es el que está en vosotros, que el que está en el mundo».", "1 Juan 4:4"],
    ] as P[]).map(p),
    "intercesion-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Para qué sirve la armadura de Dios, según Efesios 6:13?", "Para resistir en el día malo y estar firmes", ["Para atacar a las personas", "Para hacerse famoso", "Para no tener que orar"], "«para que podáis resistir en el día malo, y habiendo acabado todo, estar firmes».", "Efesios 6:13-18"],
      ["3-r2", 3, "o3", "comprender", "¿Qué es la espada del Espíritu, según Efesios 6:17?", "La palabra de Dios", ["Un don especial", "Una oración secreta", "Un objeto ungido"], "«y la espada del Espíritu, que es la palabra de Dios».", "Efesios 6:13-18"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué apaga el escudo de la fe?", "Todos los dardos de fuego del maligno", ["La voz de Dios", "El fuego del Espíritu", "Los dones"], "«con que podáis apagar todos los dardos de fuego del maligno».", "Efesios 6:13-18"],
    ] as P[]).map(p),
    "intercesion-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué viene primero en Santiago 4:7?", "Someterse a Dios", ["Resistir al diablo", "Reprender a los demonios", "Ayunar"], "«Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros».", "Santiago 4:7"],
      ["4-r2", 4, "o4", "comprender", "¿Con qué respondió Jesús al tentador?", "Con la Escritura: escrito está", ["Con gritos", "Con una señal del cielo", "Con silencio"], "«Vete, Satanás, porque escrito está».", "Mateo 4:10-11"],
      ["4-r3", 4, "o4", "aplicar", "Un hermano se acuesta enojado cada noche. ¿Qué le advierte Efesios 4:26-27?", "Que no deje que el sol se ponga sobre su enojo, para no dar lugar al diablo", ["Que el enojo no importa", "Que se enoje más", "Que culpe al diablo"], "«no se ponga el sol sobre vuestro enojo, ni deis lugar al diablo».", "Efesios 4:26-27"],
    ] as P[]).map(p),
    "intercesion-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijo Jesús al espíritu inmundo en la sinagoga?", "Cállate, y sal de él", ["Te daré lo que pidas", "Vuelve mañana", "Quédate tranquilo"], "«Pero Jesús le reprendió, diciendo: ¡Cállate, y sal de él!».", "Marcos 1:23-27"],
      ["5-r2", 5, "o5", "comprender", "¿De qué dijo Jesús que debían alegrarse los setenta?", "De que sus nombres están escritos en los cielos", ["De que los espíritus se les sujetaban", "De su propio poder", "De su fama"], "«sino regocijaos de que vuestros nombres están escritos en los cielos».", "Lucas 10:17-20"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué enseña lo que les pasó a los hijos de Esceva?", "Que el nombre de Jesús no es una fórmula mágica: la autoridad es de los que le pertenecen", ["Que basta repetir el nombre de Jesús", "Que los espíritus no existen", "Que hay que gritar más fuerte"], "«A Jesús conozco, y sé quién es Pablo; pero vosotros, ¿quiénes sois?».", "Hechos 19:13-20"],
    ] as P[]).map(p),
    "intercesion-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué espíritu no nos ha dado Dios, según 2 Timoteo 1:7?", "Espíritu de cobardía", ["Espíritu de poder", "Espíritu de amor", "Espíritu de dominio propio"], "«Porque no nos ha dado Dios espíritu de cobardía».", "2 Timoteo 1:7"],
      ["6-r2", 6, "o6", "comprender", "¿Qué le dijo el arcángel Miguel al diablo, según Judas 1:9?", "El Señor te reprenda", ["Yo te maldigo", "Vete de aquí por mi poder", "Te ato para siempre"], "«sino que dijo: El Señor te reprenda».", "Judas 1:9"],
      ["6-r3", 6, "o6", "aplicar", "En una reunión ocurre una manifestación impresionante. ¿Qué pide 1 Juan 4:1?", "Probar los espíritus si son de Dios", ["Creerla sin preguntar", "Imitarla", "Grabarla y publicarla"], "«no creáis a todo espíritu, sino probad los espíritus si son de Dios».", "1 Juan 4:1"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Una batalla real, sin miedo ni descuido
    ["f01", 1, "o1", "recordar", "¿Dónde nos manda fortalecernos Efesios 6:10?", "En el Señor, y en el poder de su fuerza", ["En nuestras propias fuerzas", "En los ángeles", "En nuestras experiencias"], "«fortaleceos en el Señor, y en el poder de su fuerza».", "Efesios 6:10-12"],
    ["f02", 1, "o1", "recordar", "¿Contra quiénes es nuestra lucha, según Efesios 6:12?", "Contra principados, potestades y huestes espirituales de maldad", ["Contra nuestros vecinos", "Contra los gobiernos", "Contra los que no creen"], "«sino contra principados, contra potestades, contra los gobernadores de las tinieblas de este siglo».", "Efesios 6:10-12"],
    ["f03", 1, "o1", "comprender", "¿Qué significa que no tenemos lucha contra sangre y carne?", "Que el enemigo no son las personas, aunque nos hagan daño", ["Que no hay ninguna batalla", "Que solo peleamos contra personas", "Que el cuerpo es malo"], "«Porque no tenemos lucha contra sangre y carne».", "Efesios 6:10-12"],
    ["f04", 1, "o1", "recordar", "¿Qué pide 1 Pedro 5:8 frente al adversario?", "Ser sobrios y velar", ["Tener miedo", "Ignorarlo", "Hablar con él"], "«Sed sobrios, y velad».", "1 Pedro 5:8-9"],
    ["f05", 1, "o1", "comprender", "¿Cómo se resiste al diablo, según 1 Pedro 5:9?", "Firmes en la fe", ["Con objetos especiales", "Con gritos", "Con miedo"], "«al cual resistid firmes en la fe».", "1 Pedro 5:8-9"],
    ["f06", 1, "o1", "analizar", "¿Qué contraste presenta Juan 10:10?", "El ladrón viene a destruir; Jesús vino a dar vida en abundancia", ["Que Jesús y el ladrón son iguales", "Que la vida no importa", "Que el ladrón da vida"], "«El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida».", "Juan 10:10"],
    ["f07", 1, "o1", "recordar", "¿Qué no ignoramos, según 2 Corintios 2:11?", "Las maquinaciones de Satanás", ["El nombre de cada demonio", "El día del juicio", "El número de los ángeles"], "«pues no ignoramos sus maquinaciones».", "2 Corintios 2:10-11"],
    ["f08", 1, "o1", "analizar", "¿Qué relación hay entre el perdón y la guerra espiritual, según la lección?", "El rencor le abre puertas al enemigo; el perdón se las cierra", ["No tienen relación", "El perdón le da ventaja al diablo", "El rencor protege"], "«para que Satanás no gane ventaja alguna sobre nosotros».", "2 Corintios 2:10-11"],
    ["f09", 1, "o1", "evaluar", "¿Cuáles son los dos errores opuestos sobre los demonios, según la lección?", "No creer que existen, o interesarse en ellos de manera excesiva", ["Orar y ayunar", "Leer la Biblia y congregarse", "Perdonar y servir"], "«Sed sobrios, y velad».", "1 Pedro 5:8-9"],
    ["f10", 1, "o7", "recordar", "Completa Santiago 4:7: Someteos, pues, a Dios…", "resistid al diablo, y huirá de vosotros", ["hablad con el diablo, y os dejará", "temed al diablo, y os respetará", "buscad al diablo, y lo venceréis"], "«Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros».", "Santiago 4:7"],
    // Lección 2 · La victoria de Cristo
    ["f11", 2, "o2", "recordar", "¿Qué fue creado por medio de Cristo, según Colosenses 1:16?", "Todas las cosas, también los tronos, los dominios, los principados y las potestades", ["Solo las cosas visibles", "Solo la tierra", "Nada en los cielos"], "«Porque en él fueron creadas todas las cosas, las que hay en los cielos y las que hay en la tierra».", "Colosenses 1:16"],
    ["f12", 2, "o2", "comprender", "¿Qué enseña que los principados fueran creados por Cristo?", "Que no hay dos fuerzas iguales en guerra: hay un Creador y criaturas", ["Que el diablo es igual a Dios", "Que el mal existe desde siempre", "Que los ángeles son dioses"], "«todo fue creado por medio de él y para él».", "Colosenses 1:16"],
    ["f13", 2, "o2", "recordar", "¿Dónde triunfó Cristo sobre los principados y las potestades?", "En la cruz", ["En el templo", "En el desierto", "En el monte de los Olivos"], "«triunfando sobre ellos en la cruz».", "Colosenses 2:15"],
    ["f14", 2, "o2", "analizar", "¿Por qué la cruz fue la derrota del enemigo y no la de Jesús?", "Porque allí Cristo despojó a los principados y triunfó sobre ellos", ["Porque Jesús escapó de la cruz", "Porque el diablo no estaba allí", "Porque la cruz no tuvo importancia"], "«y despojando a los principados y a las potestades, los exhibió públicamente».", "Colosenses 2:15"],
    ["f15", 2, "o2", "recordar", "¿A quién destruyó Jesús por medio de la muerte, según Hebreos 2:14?", "Al que tenía el imperio de la muerte, esto es, al diablo", ["A los romanos", "A los fariseos", "A los ángeles buenos"], "«para destruir por medio de la muerte al que tenía el imperio de la muerte, esto es, al diablo».", "Hebreos 2:14-15"],
    ["f16", 2, "o2", "comprender", "¿De qué temor libró Jesús a los que vivían sujetos a servidumbre, según Hebreos 2:15?", "Del temor de la muerte", ["Del temor al trabajo", "Del temor a los impuestos", "Del temor a sus familias"], "«y librar a todos los que por el temor de la muerte estaban durante toda la vida sujetos a servidumbre».", "Hebreos 2:14-15"],
    ["f17", 2, "o2", "recordar", "¿Para qué apareció el Hijo de Dios, según 1 Juan 3:8?", "Para deshacer las obras del diablo", ["Para pactar con el diablo", "Para juzgar a los ángeles", "Para fundar un reino terrenal"], "«Para esto apareció el Hijo de Dios, para deshacer las obras del diablo».", "1 Juan 3:8"],
    ["f18", 2, "o2", "recordar", "¿De qué nos libró Dios, según Colosenses 1:13?", "De la potestad de las tinieblas", ["De la ley de Moisés", "De la iglesia", "Del trabajo"], "«el cual nos ha librado de la potestad de las tinieblas».", "Colosenses 1:13"],
    ["f19", 2, "o2", "aplicar", "Un creyente piensa que el diablo puede hacer con él lo que quiera. ¿Qué le enseña Colosenses 1:13?", "Que fue trasladado al reino del Hijo de Dios", ["Que tiene razón", "Que está en tierra de nadie", "Que debe ganarse su libertad"], "«y trasladado al reino de su amado Hijo».", "Colosenses 1:13"],
    ["f20", 2, "o2", "evaluar", "¿Cuál de estas frases resume la lección?", "El creyente pelea desde la victoria que Cristo ya ganó", ["El creyente pelea por una victoria incierta", "El diablo y Dios son iguales", "La cruz fue una derrota"], "«mayor es el que está en vosotros, que el que está en el mundo».", "1 Juan 4:4"],
    // Lección 3 · La armadura de Dios
    ["f21", 3, "o3", "recordar", "¿Con qué se ciñen los lomos, según Efesios 6:14?", "Con la verdad", ["Con la fuerza", "Con la riqueza", "Con la fama"], "«ceñidos vuestros lomos con la verdad».", "Efesios 6:13-18"],
    ["f22", 3, "o3", "recordar", "¿Cuál es la coraza de la armadura?", "La coraza de justicia", ["La coraza de fuerza", "La coraza de bronce", "La coraza de la fama"], "«y vestidos con la coraza de justicia».", "Efesios 6:13-18"],
    ["f23", 3, "o3", "recordar", "¿Con qué se calzan los pies, según Efesios 6:15?", "Con el apresto del evangelio de la paz", ["Con sandalias de oro", "Con el poder de la guerra", "Con la ley de Moisés"], "«y calzados los pies con el apresto del evangelio de la paz».", "Efesios 6:13-18"],
    ["f24", 3, "o3", "recordar", "¿Qué yelmo manda tomar Efesios 6:17?", "El yelmo de la salvación", ["El yelmo de la fama", "El yelmo de la sabiduría humana", "El yelmo del poder"], "«Y tomad el yelmo de la salvación».", "Efesios 6:13-18"],
    ["f25", 3, "o3", "comprender", "¿Qué representan los dardos de fuego del maligno, según la lección?", "Las mentiras, las acusaciones y las tentaciones", ["Los consejos de los pastores", "Las bendiciones", "Los dones"], "«con que podáis apagar todos los dardos de fuego del maligno».", "Efesios 6:13-18"],
    ["f26", 3, "o3", "analizar", "¿Cuál es la única arma para atacar en la armadura de Dios?", "La espada del Espíritu, que es la palabra de Dios", ["El escudo de la fe", "El cinto de la verdad", "La coraza de justicia"], "«y la espada del Espíritu, que es la palabra de Dios».", "Efesios 6:13-18"],
    ["f27", 3, "o3", "comprender", "¿Qué orden se repite en Efesios 6:13-14?", "Estar firmes", ["Correr", "Esconderse", "Gritar"], "«Estad, pues, firmes».", "Efesios 6:13-18"],
    ["f28", 3, "o3", "evaluar", "¿Por qué la armadura de Dios no es una fórmula de palabras?", "Porque es una vida en Cristo: verdad, justicia, evangelio, fe, salvación y Palabra", ["Porque no sirve para nada", "Porque solo es para los pastores", "Porque hay que recitarla tres veces"], "«Por tanto, tomad toda la armadura de Dios».", "Efesios 6:13-18"],
    ["f29", 3, "o3", "recordar", "¿Cómo termina Pablo su enseñanza de la armadura, en Efesios 6:18?", "Con la oración en todo tiempo", ["Con una lista de demonios", "Con una ceremonia", "Con un ayuno de cuarenta días"], "«orando en todo tiempo con toda oración y súplica en el Espíritu».", "Efesios 6:13-18"],
    ["f30", 3, "o3", "aplicar", "¿Por quiénes pide orar Efesios 6:18 al hablar de la armadura?", "Por todos los santos", ["Solo por uno mismo", "Por los demonios", "Por nadie"], "«y velando en ello con toda perseverancia y súplica por todos los santos».", "Efesios 6:13-18"],
    // Lección 4 · Someteos a Dios y resistid al diablo
    ["f31", 4, "o4", "comprender", "¿Por qué es importante el orden de Santiago 4:7?", "Porque no se puede resistir al diablo mientras se resiste a Dios", ["Porque primero hay que resistir al diablo", "Porque el orden no importa", "Porque someterse a Dios es opcional"], "«Someteos, pues, a Dios; resistid al diablo».", "Santiago 4:7"],
    ["f32", 4, "o4", "recordar", "¿Qué promete Santiago 4:7 al que resiste al diablo?", "Que huirá de él", ["Que lo atacará más", "Que se hará su amigo", "Que no pasará nada"], "«resistid al diablo, y huirá de vosotros».", "Santiago 4:7"],
    ["f33", 4, "o4", "recordar", "¿Qué le dijo Jesús a Satanás en Mateo 4:10?", "Vete, Satanás, porque escrito está: Al Señor tu Dios adorarás", ["Te daré lo que pides", "Vuelve después", "No sé qué responder"], "«Vete, Satanás, porque escrito está: Al Señor tu Dios adorarás, y a él sólo servirás».", "Mateo 4:10-11"],
    ["f34", 4, "o4", "comprender", "¿Qué pasó después de que Jesús resistió con la Escritura?", "El diablo lo dejó, y vinieron ángeles a servirle", ["El diablo lo venció", "Jesús huyó", "No pasó nada"], "«El diablo entonces le dejó; y he aquí vinieron ángeles y le servían».", "Mateo 4:10-11"],
    ["f35", 4, "o4", "recordar", "¿Qué no debemos darle al diablo, según Efesios 4:27?", "Lugar", ["Nuestro nombre", "Nuestro tiempo de oración", "Nuestra ofrenda"], "«ni deis lugar al diablo».", "Efesios 4:26-27"],
    ["f36", 4, "o4", "aplicar", "¿Cómo se le cierra una puerta al enemigo, según la lección?", "Arreglando el enojo, confesando el pecado y apartándose de lo que hace caer", ["Con un objeto en la puerta", "Gritando en la casa", "Ignorando el pecado"], "«no se ponga el sol sobre vuestro enojo».", "Efesios 4:26-27"],
    ["f37", 4, "o4", "recordar", "¿Cómo son las armas de nuestra milicia, según 2 Corintios 10:4?", "No son carnales, sino poderosas en Dios", ["Son carnales y fuertes", "Son de metal", "Son débiles"], "«porque las armas de nuestra milicia no son carnales, sino poderosas en Dios».", "2 Corintios 10:3-5"],
    ["f38", 4, "o4", "analizar", "¿Qué son las fortalezas de 2 Corintios 10:4-5, según la lección?", "Ideas y argumentos que se levantan contra el conocimiento de Dios", ["Edificios de los enemigos", "Lugares donde viven demonios", "Las iglesias grandes"], "«derribando argumentos y toda altivez que se levanta contra el conocimiento de Dios».", "2 Corintios 10:3-5"],
    ["f39", 4, "o4", "aplicar", "¿Qué se hace con los pensamientos en la batalla de la mente?", "Se llevan cautivos a la obediencia a Cristo", ["Se dejan libres", "Se ignoran", "Se le entregan al diablo"], "«y llevando cautivo todo pensamiento a la obediencia a Cristo».", "2 Corintios 10:3-5"],
    ["f40", 4, "o4", "evaluar", "Un hermano cae en un pecado y dice que fue el diablo. ¿Qué le enseña Santiago 1:14?", "Que cada uno es tentado por su propia concupiscencia, y debe asumir su responsabilidad", ["Que tiene razón", "Que no tiene culpa", "Que Dios lo tentó"], "«sino que cada uno es tentado, cuando de su propia concupiscencia es atraído y seducido».", "Santiago 1:14"],
    // Lección 5 · Jesús, los apóstoles y los espíritus malos
    ["f41", 5, "o5", "recordar", "¿Qué se preguntaba la gente después de que Jesús echó fuera al espíritu inmundo?", "Qué nueva doctrina era esa, que con autoridad mandaba aun a los espíritus", ["Por qué Jesús no hizo nada", "Quién era aquel hombre", "Cuándo volvería Jesús"], "«¿Qué nueva doctrina es esta, que con autoridad manda aun a los espíritus inmundos, y le obedecen?».", "Marcos 1:23-27"],
    ["f42", 5, "o5", "comprender", "¿Qué necesitó Jesús para echar fuera al espíritu, según Marcos 1:25?", "Solo su palabra de autoridad", ["Un largo ritual", "Agua y aceite", "Varios días de ceremonias"], "«Pero Jesús le reprendió, diciendo: ¡Cállate, y sal de él!».", "Marcos 1:23-27"],
    ["f43", 5, "o5", "recordar", "¿Qué dijeron los setenta al volver?", "Señor, aun los demonios se nos sujetan en tu nombre", ["Señor, no pudimos hacer nada", "Señor, queremos descansar", "Señor, nadie nos recibió"], "«Señor, aun los demonios se nos sujetan en tu nombre».", "Lucas 10:17-20"],
    ["f44", 5, "o5", "analizar", "¿Por qué corrigió Jesús el gozo de los setenta?", "Porque el centro no es el poder, sino la salvación", ["Porque no habían hecho nada", "Porque estaban mintiendo", "Porque el poder es malo"], "«regocijaos de que vuestros nombres están escritos en los cielos».", "Lucas 10:17-20"],
    ["f45", 5, "o5", "recordar", "¿Qué tenía la muchacha de Filipos?", "Espíritu de adivinación", ["Una enfermedad de la piel", "Un don de profecía de Dios", "Una gran riqueza propia"], "«una muchacha que tenía espíritu de adivinación».", "Hechos 16:16-18"],
    ["f46", 5, "o5", "recordar", "¿Qué le dijo Pablo al espíritu de adivinación?", "Te mando en el nombre de Jesucristo, que salgas de ella", ["Te ato con mis palabras", "Dime cuántos son", "Vete por mi poder"], "«Te mando en el nombre de Jesucristo, que salgas de ella».", "Hechos 16:16-18"],
    ["f47", 5, "o5", "comprender", "¿Qué intentaban hacer los exorcistas ambulantes de Éfeso?", "Usar el nombre de Jesús como un conjuro", ["Predicar el evangelio", "Ayudar a Pablo", "Curar a los enfermos con medicinas"], "«Os conjuro por Jesús, el que predica Pablo».", "Hechos 19:13-20"],
    ["f48", 5, "o5", "aplicar", "¿Qué hicieron en Éfeso los que habían practicado la magia?", "Trajeron sus libros y los quemaron delante de todos", ["Los vendieron", "Los escondieron", "Los regalaron"], "«trajeron los libros y los quemaron delante de todos».", "Hechos 19:13-20"],
    ["f49", 5, "o5", "recordar", "¿Qué prácticas prohíbe Deuteronomio 18:10-11?", "La adivinación, la hechicería, los encantamientos y consultar a los muertos", ["La oración y el ayuno", "La música y el canto", "El trabajo y el descanso"], "«ni quien practique adivinación, ni agorero, ni sortílego, ni hechicero».", "Deuteronomio 18:10-12"],
    ["f50", 5, "o5", "evaluar", "Una persona tiene depresión. ¿Qué enseña la lección sobre estos casos?", "Que no todo problema es un demonio: hay enfermedades que se tratan con el médico y la consejería", ["Que todo es un demonio", "Que no debe ir al médico", "Que la oración y el médico se excluyen"], "«Os saluda Lucas el médico amado».", "Colosenses 4:14"],
    // Lección 6 · Los errores que hay que evitar
    ["f51", 6, "o6", "comprender", "¿Qué espíritu nos dio Dios, según 2 Timoteo 1:7?", "De poder, de amor y de dominio propio", ["De cobardía", "De temor", "De confusión"], "«sino de poder, de amor y de dominio propio».", "2 Timoteo 1:7"],
    ["f52", 6, "o6", "analizar", "¿Qué error corrige 2 Timoteo 1:7?", "Vivir con miedo, viendo demonios en todo", ["Orar demasiado", "Leer la Biblia", "Amar a los demás"], "«Porque no nos ha dado Dios espíritu de cobardía».", "2 Timoteo 1:7"],
    ["f53", 6, "o6", "recordar", "¿Por qué contendía el arcángel Miguel con el diablo, según Judas 1:9?", "Por el cuerpo de Moisés", ["Por el templo", "Por Jerusalén", "Por el arca"], "«disputando con él por el cuerpo de Moisés».", "Judas 1:9"],
    ["f54", 6, "o6", "aplicar", "¿Qué enseña el ejemplo de Miguel a quien enfrenta al enemigo?", "A no hablar con arrogancia, sino a confiar en la autoridad del Señor", ["A insultar al diablo", "A burlarse de los demonios", "A confiar en su propia fuerza"], "«no se atrevió a proferir juicio de maldición contra él».", "Judas 1:9"],
    ["f55", 6, "o6", "comprender", "¿Por qué hay que probar los espíritus, según 1 Juan 4:1?", "Porque muchos falsos profetas han salido por el mundo", ["Porque todos los espíritus son buenos", "Porque así se gana poder", "Porque los pastores lo piden"], "«porque muchos falsos profetas han salido por el mundo».", "1 Juan 4:1"],
    ["f56", 6, "o6", "evaluar", "¿Con qué se prueba una manifestación, según la lección?", "Con la Escritura: lo que no concuerda con ella no viene de Dios", ["Con lo impresionante que parezca", "Con lo que sienten todos", "Con cuánta gente la ve"], "«sino probad los espíritus si son de Dios».", "1 Juan 4:1"],
    ["f57", 6, "o6", "recordar", "¿Durante cuántos días se opuso el príncipe del reino de Persia, según Daniel 10:13?", "Veintiún días", ["Siete días", "Cuarenta días", "Tres días"], "«Mas el príncipe del reino de Persia se me opuso durante veintiún días».", "Daniel 10:12-13"],
    ["f58", 6, "o6", "analizar", "¿Qué hizo Daniel mientras había conflicto en el mundo espiritual?", "Oró a Dios con humildad; no le habló al príncipe de Persia", ["Trató de atar al príncipe de Persia", "Hizo un mapa de los espíritus", "Dejó de orar"], "«desde el primer día que dispusiste tu corazón a entender y a humillarte en la presencia de tu Dios, fueron oídas tus palabras».", "Daniel 10:12-13"],
    ["f59", 6, "o6", "recordar", "¿Qué promete Romanos 16:20?", "Que el Dios de paz aplastará en breve a Satanás bajo nuestros pies", ["Que Satanás ganará al final", "Que la batalla nunca terminará", "Que debemos vencer solos"], "«Y el Dios de paz aplastará en breve a Satanás bajo vuestros pies».", "Romanos 16:20"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estas prácticas es bíblica y equilibrada?", "Orar a Dios con humildad, firmes en la fe y en la Palabra", ["Insultar al diablo", "Buscar demonios en todo", "Inventar métodos para atar espíritus sobre ciudades"], "«El Señor te reprenda».", "Judas 1:9"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué manda vestir Efesios 6:11?", "Toda la armadura de Dios", ["Ropa especial", "Un amuleto", "Una túnica de lino"], "«Vestíos de toda la armadura de Dios».", "Efesios 6:10-12"],
      ["m1-02", 1, "o1", "comprender", "¿Para qué nos vestimos de la armadura, según Efesios 6:11?", "Para estar firmes contra las asechanzas del diablo", ["Para lucir bien", "Para pelear con personas", "Para no trabajar"], "«para que podáis estar firmes contra las asechanzas del diablo».", "Efesios 6:10-12"],
      ["m1-03", 1, "o1", "aplicar", "Alguien te ofende gravemente. ¿Qué te recuerda Efesios 6:12?", "Que esa persona no es tu enemigo: no tenemos lucha contra sangre y carne", ["Que debes pelear con ella", "Que debes maldecirla", "Que es un demonio"], "«Porque no tenemos lucha contra sangre y carne».", "Efesios 6:10-12"],
      ["m1-04", 1, "o1", "recordar", "¿Qué saben los creyentes que resisten, según 1 Pedro 5:9?", "Que los mismos padecimientos se cumplen en sus hermanos en todo el mundo", ["Que nunca sufrirán", "Que están solos", "Que el diablo ya no existe"], "«sabiendo que los mismos padecimientos se van cumpliendo en vuestros hermanos en todo el mundo».", "1 Pedro 5:8-9"],
      ["m1-05", 1, "o1", "comprender", "¿Para qué vino Jesús, según Juan 10:10?", "Para que tengamos vida, y en abundancia", ["Para hurtar y destruir", "Para juzgar al mundo en ese momento", "Para darnos riquezas"], "«yo he venido para que tengan vida, y para que la tengan en abundancia».", "Juan 10:10"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué actitud pide la Biblia frente al enemigo?", "Sobriedad y vigilancia, sin pánico ni descuido", ["Pánico constante", "Descuido total", "Curiosidad por lo oculto"], "«Sed sobrios, y velad».", "1 Pedro 5:8-9"],
      ["m1-07", 2, "o2", "recordar", "¿Qué cosas creó Cristo, según Colosenses 1:16?", "Las visibles y las invisibles", ["Solo las visibles", "Solo las del cielo", "Solo las buenas"], "«visibles e invisibles; sean tronos, sean dominios».", "Colosenses 1:16"],
      ["m1-08", 2, "o2", "comprender", "¿Qué hizo Cristo con los principados en la cruz, además de despojarlos?", "Los exhibió públicamente", ["Los escondió", "Los perdonó", "Los nombró jefes"], "«los exhibió públicamente, triunfando sobre ellos en la cruz».", "Colosenses 2:15"],
      ["m1-09", 2, "o2", "recordar", "¿De qué participó Jesús, según Hebreos 2:14?", "De carne y sangre, como nosotros", ["Solo de espíritu", "De la naturaleza de los ángeles", "De nada humano"], "«por cuanto los hijos participaron de carne y sangre, él también participó de lo mismo».", "Hebreos 2:14-15"],
      ["m1-10", 2, "o2", "recordar", "¿Qué hace el diablo desde el principio, según 1 Juan 3:8?", "Peca", ["Obedece a Dios", "Sirve a los hombres", "Descansa"], "«porque el diablo peca desde el principio».", "1 Juan 3:8"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué consuelo da Colosenses 1:13 a quien salió de la brujería?", "Que Dios lo libró de la potestad de las tinieblas y lo trasladó al reino de su Hijo", ["Que nunca podrá ser libre", "Que debe pagar por su libertad", "Que sigue en el mismo reino"], "«el cual nos ha librado de la potestad de las tinieblas, y trasladado al reino de su amado Hijo».", "Colosenses 1:13"],
      ["m1-12", 2, "o2", "analizar", "¿Qué dice 1 Juan 4:4 de los creyentes?", "Que son de Dios y han vencido", ["Que son débiles y vencidos", "Que deben temer", "Que no pertenecen a nadie"], "«Hijitos, vosotros sois de Dios, y los habéis vencido».", "1 Juan 4:4"],
      ["m1-13", 3, "o3", "recordar", "¿En qué día nos ayuda a resistir la armadura?", "En el día malo", ["En el día de reposo", "En el día de fiesta", "En el día del juicio"], "«para que podáis resistir en el día malo».", "Efesios 6:13-18"],
      ["m1-14", 3, "o3", "comprender", "¿Qué significa el cinto de la verdad, según la lección?", "Vivir en la verdad y sin mentira", ["Llevar un cinturón especial", "Decir verdades duras a todos", "Conocer secretos"], "«ceñidos vuestros lomos con la verdad».", "Efesios 6:13-18"],
      ["m1-15", 3, "o3", "comprender", "¿Qué significa el calzado del evangelio de la paz, según la lección?", "Estar listos para anunciar a Cristo", ["Caminar descalzos", "Evitar a los que no creen", "Pelear por la paz con armas"], "«y calzados los pies con el apresto del evangelio de la paz».", "Efesios 6:13-18"],
      ["m1-16", 3, "o3", "aplicar", "Te llegan pensamientos de acusación por una culpa ya perdonada. ¿Qué pieza de la armadura te ayuda?", "El escudo de la fe, que apaga los dardos del maligno", ["Ninguna", "El calzado", "Un objeto bendecido"], "«Sobre todo, tomad el escudo de la fe».", "Efesios 6:13-18"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué la oración cierra la enseñanza de la armadura?", "Porque la guerra espiritual se pelea, sobre todo, de rodillas y por otros", ["Porque la oración no tiene relación", "Porque la armadura reemplaza la oración", "Porque solo oran los pastores"], "«orando en todo tiempo con toda oración y súplica en el Espíritu».", "Efesios 6:13-18"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál es la mejor manera de usar la armadura de Dios?", "Vivir cada día en la verdad, la justicia, la fe y la Palabra, orando", ["Recitarla como fórmula mágica", "Usarla solo en emergencias", "Dejarla para los líderes"], "«Estad, pues, firmes».", "Efesios 6:13-18"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hará el diablo si lo resistimos, según Santiago 4:7?", "Huirá", ["Atacará más", "Se quedará", "Nos vencerá"], "«resistid al diablo, y huirá de vosotros».", "Santiago 4:7"],
      ["m2-02", 4, "o4", "comprender", "¿A quién solo hay que servir, según Mateo 4:10?", "Al Señor tu Dios", ["A los ángeles", "A los líderes", "A uno mismo"], "«Al Señor tu Dios adorarás, y a él sólo servirás».", "Mateo 4:10-11"],
      ["m2-03", 4, "o4", "aplicar", "Quieres resistir la tentación como Jesús. ¿Qué te enseña Mateo 4:10?", "A responder con la Escritura y adorar solo a Dios", ["A discutir con la tentación", "A esperar a ver qué pasa", "A esconderte"], "«porque escrito está: Al Señor tu Dios adorarás».", "Mateo 4:10-11"],
      ["m2-04", 4, "o4", "recordar", "¿Qué permite Efesios 4:26 y qué prohíbe?", "Permite airarse, pero prohíbe pecar", ["Permite pecar si hay razón", "Prohíbe todo sentimiento", "Permite guardar el enojo"], "«Airaos, pero no pequéis».", "Efesios 4:26-27"],
      ["m2-05", 4, "o4", "comprender", "¿Contra qué se levantan los argumentos que hay que derribar, según 2 Corintios 10:5?", "Contra el conocimiento de Dios", ["Contra la ley del país", "Contra los pastores", "Contra el gobierno"], "«y toda altivez que se levanta contra el conocimiento de Dios».", "2 Corintios 10:3-5"],
      ["m2-06", 4, "o4", "analizar", "¿Qué relación hay entre la tentación y nuestros deseos, según Santiago 1:14?", "Somos tentados cuando nuestra propia concupiscencia nos atrae", ["La tentación viene solo de afuera", "Los deseos no tienen que ver", "Dios nos tienta"], "«cuando de su propia concupiscencia es atraído y seducido».", "Santiago 1:14"],
      ["m2-07", 5, "o5", "recordar", "¿Qué le dijo el espíritu inmundo a Jesús en la sinagoga?", "Sé quién eres, el Santo de Dios", ["No te conozco", "Eres un profeta más", "Eres el hijo de José"], "«Sé quién eres, el Santo de Dios».", "Marcos 1:23-27"],
      ["m2-08", 5, "o5", "comprender", "¿Qué potestad les dio Jesús a los setenta, según Lucas 10:19?", "Potestad sobre toda fuerza del enemigo", ["Potestad sobre los reyes", "Potestad para hacerse ricos", "Potestad sobre los otros discípulos"], "«He aquí os doy potestad de hollar serpientes y escorpiones, y sobre toda fuerza del enemigo».", "Lucas 10:17-20"],
      ["m2-09", 5, "o5", "recordar", "¿Durante cuánto tiempo siguió la muchacha a Pablo dando voces?", "Por muchos días", ["Por un solo día", "Por cuarenta días", "Por una hora"], "«Y esto lo hacía por muchos días».", "Hechos 16:16-18"],
      ["m2-10", 5, "o5", "analizar", "¿Qué muestra la manera en que Pablo trató a la muchacha de Filipos?", "Que actuó con autoridad en el nombre de Jesús, sin espectáculo", ["Que hizo un gran espectáculo", "Que usó objetos mágicos", "Que le cobró dinero"], "«Y salió en aquella misma hora».", "Hechos 16:16-18"],
      ["m2-11", 5, "o5", "recordar", "¿Qué les pasó a los siete hijos de Esceva?", "El hombre con el espíritu malo los dominó, y huyeron desnudos y heridos", ["Echaron fuera al espíritu", "Se hicieron apóstoles", "No les pasó nada"], "«de tal manera que huyeron de aquella casa desnudos y heridos».", "Hechos 19:13-20"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué hace el creyente con las prácticas ocultas de su pasado?", "Rompe con ellas, como los de Éfeso que quemaron sus libros", ["Las guarda por si acaso", "Las mezcla con la fe", "Las practica en secreto"], "«Así crecía y prevalecía poderosamente la palabra del Señor».", "Hechos 19:13-20"],
      ["m2-13", 6, "o6", "recordar", "¿Qué tres cosas nos dio Dios, según 2 Timoteo 1:7?", "Poder, amor y dominio propio", ["Miedo, duda y cobardía", "Riqueza, fama y salud", "Fuerza, enojo y orgullo"], "«sino de poder, de amor y de dominio propio».", "2 Timoteo 1:7"],
      ["m2-14", 6, "o6", "comprender", "¿Qué no se atrevió a hacer Miguel contra el diablo?", "Proferir juicio de maldición", ["Hablarle", "Orar", "Nombrar al Señor"], "«no se atrevió a proferir juicio de maldición contra él».", "Judas 1:9"],
      ["m2-15", 6, "o6", "recordar", "¿A qué no debemos creer, según 1 Juan 4:1?", "A todo espíritu", ["A la palabra de Dios", "A Jesús", "Al evangelio"], "«Amados, no creáis a todo espíritu».", "1 Juan 4:1"],
      ["m2-16", 6, "o6", "comprender", "¿Desde cuándo fueron oídas las palabras de Daniel?", "Desde el primer día", ["Desde el día veintiuno", "Nunca", "Desde el día cuarenta"], "«desde el primer día que dispusiste tu corazón a entender y a humillarte en la presencia de tu Dios, fueron oídas tus palabras».", "Daniel 10:12-13"],
      ["m2-17", 6, "o6", "aplicar", "Te invitan a una reunión para nombrar y atar a los espíritus de tu ciudad. ¿Qué te enseña la lección?", "Que el modelo bíblico es orar a Dios con humildad, como Daniel", ["Que es la forma más poderosa de orar", "Que hay que gritar más fuerte", "Que Daniel lo hizo así"], "«fueron oídas tus palabras; y a causa de tus palabras yo he venido».", "Daniel 10:12-13"],
      ["m2-18", 6, "o6", "evaluar", "¿En quién está la confianza del creyente al final de la batalla, según Romanos 16:20?", "En el Dios de paz, que aplastará a Satanás", ["En su propia fuerza", "En los ángeles", "En los métodos"], "«Y el Dios de paz aplastará en breve a Satanás bajo vuestros pies».", "Romanos 16:20"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "intercesion-4-e1",
      tipo: "corta",
      pregunta: "Explica qué enseña la Biblia sobre la batalla espiritual y cuáles son los dos errores opuestos que hay que evitar.",
      ideas: [
        { id: "real", peso: 25, texto: "La batalla es real: contra principados y potestades.", formas: ["principados", "potestades", "es real", "batalla real", "huestes espirituales"] },
        { id: "personas", peso: 25, texto: "El enemigo no son las personas: no tenemos lucha contra sangre y carne.", formas: ["sangre y carne", "no son las personas", "no es la gente"], negativa: true },
        { id: "errores", peso: 30, texto: "Dos errores: negar que existen u obsesionarse con ellos.", formas: ["no creer", "negar", "obsesion*", "excesiv*", "dos errores"], negativa: true },
        { id: "sobrios", peso: 10, texto: "Sobriedad, vigilancia y firmeza en la fe.", formas: ["sobrios", "velad", "velar", "vigilan*", "firmes en la fe"] },
      ],
      citas: ["Efesios 6:10-12", "Efesios 6:12", "1 Pedro 5:8-9", "1 Pedro 5:8", "Juan 10:10", "2 Corintios 2:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La Biblia enseña una batalla real: no tenemos lucha contra sangre y carne, sino contra principados y potestades (Efesios 6:12). El enemigo no son las personas. Hay dos errores opuestos: negar que existen los demonios u obsesionarse con ellos. La Biblia pide ser sobrios, velar y resistir firmes en la fe.",
    },
    {
      id: "intercesion-4-e2",
      tipo: "corta",
      pregunta: "Explica la victoria de Cristo sobre el enemigo y qué seguridad le da al creyente.",
      ideas: [
        { id: "cruz", peso: 35, texto: "En la cruz despojó a los principados y triunfó sobre ellos.", formas: ["en la cruz", "despoj*", "triunf*", "exhibio"] },
        { id: "obras", peso: 15, texto: "Vino para deshacer las obras del diablo y venció al que tenía el imperio de la muerte.", formas: ["deshacer las obras", "imperio de la muerte", "temor de la muerte", "destruir"] },
        { id: "criatura", peso: 15, texto: "Satanás es una criatura, no un dios igual a Dios.", formas: ["criatura", "fue creado", "creado por", "creados por"] },
        { id: "seguridad", peso: 25, texto: "El creyente fue trasladado al reino del Hijo: mayor es el que está en nosotros.", formas: ["trasladado", "potestad de las tinieblas", "mayor es el que esta", "desde la victoria", "no tememos", "sin miedo"] },
      ],
      citas: ["Colosenses 2:15", "Colosenses 1:16", "Colosenses 1:13", "Hebreos 2:14-15", "Hebreos 2:14", "1 Juan 3:8", "1 Juan 4:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la cruz, Cristo despojó a los principados y a las potestades y triunfó sobre ellos (Colosenses 2:15). Vino para deshacer las obras del diablo, que es una criatura y no un dios igual a Dios. El creyente fue trasladado al reino del Hijo y pelea desde la victoria: mayor es el que está en nosotros.",
    },
    {
      id: "intercesion-4-e3",
      tipo: "corta",
      pregunta: "Explica qué es la armadura de Dios y por qué no es una fórmula.",
      ideas: [
        { id: "piezas1", peso: 20, texto: "Nombra la verdad, la justicia y el evangelio de la paz.", formas: ["cinto de la verdad", "coraza de justicia", "evangelio de la paz", "calzado"] },
        { id: "piezas2", peso: 20, texto: "Nombra el escudo de la fe, el yelmo de la salvación y la espada del Espíritu, que es la palabra de Dios.", formas: ["escudo de la fe", "yelmo", "espada del espiritu", "palabra de dios"] },
        { id: "firmes", peso: 15, texto: "Sirve para estar firmes y resistir.", formas: ["estar firmes", "firmes", "resistir"] },
        { id: "formula", peso: 25, texto: "No es una fórmula: es una vida en Cristo.", formas: ["no es una formula", "formula", "una vida", "se vive", "vivir en cristo", "vida en cristo"], negativa: true },
        { id: "oracion", peso: 10, texto: "Se completa con la oración en todo tiempo.", formas: ["oracion", "orando", "en todo tiempo"] },
      ],
      citas: ["Efesios 6:13-18", "Efesios 6:17", "Efesios 6:11", "Efesios 6:13", "Efesios 6:18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La armadura de Dios sirve para estar firmes: el cinto de la verdad, la coraza de justicia, el evangelio de la paz, el escudo de la fe, el yelmo de la salvación y la espada del Espíritu, la palabra de Dios (Efesios 6:17). No es una fórmula: es una vida en Cristo, con oración en todo tiempo.",
    },
    {
      id: "intercesion-4-e4",
      tipo: "breve",
      pregunta:
        "Un joven de tu iglesia te cuenta que lucha contra una tentación y que cree que es un ataque del diablo. Escríbele un consejo bíblico sobre cómo resistir, con citas bíblicas.",
      ideas: [
        { id: "someterse", peso: 25, texto: "Primero someterse a Dios, después resistir.", formas: ["someteos", "sometete", "someterte", "someterse", "rendirte a dios", "primero a dios"] },
        { id: "escritura", peso: 20, texto: "Resistir con la Escritura, como Jesús.", formas: ["escrito esta", "la escritura", "la palabra", "como jesus", "la biblia", "versiculos"] },
        { id: "puertas", peso: 20, texto: "No darle lugar: arreglar el enojo, confesar el pecado y apartarse de lo que hace caer.", formas: ["deis lugar", "des lugar", "dar lugar", "confiesa", "confesar", "apartate", "alejate", "puertas"], negativa: true },
        { id: "mente", peso: 15, texto: "Llevar cautivo todo pensamiento a la obediencia a Cristo.", formas: ["todo pensamiento", "pensamientos", "la mente", "cautivo"] },
        { id: "responsabilidad", peso: 20, texto: "Asumir su responsabilidad y buscar ayuda.", formas: ["propia concupiscencia", "propios deseos", "responsabilidad", "no culpes", "no todo es", "busca ayuda", "pide ayuda"], negativa: true },
      ],
      basta: 85,
      citas: ["Santiago 4:7", "Mateo 4:10-11", "Mateo 4:10", "Mateo 4:4", "Efesios 4:26-27", "Efesios 4:27", "2 Corintios 10:3-5", "2 Corintios 10:5", "Santiago 1:14", "1 Corintios 10:13", "1 Pedro 5:8-9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano: la tentación es real y el enemigo existe, pero no estás solo ni vencido. Santiago 4:7 tiene un orden: primero sométete a Dios, y después resiste al diablo, y huirá de ti. Jesús resistió en el desierto con la Escritura: escrito está (Mateo 4:10); aprende versículos y úsalos cuando llegue la tentación. No le des lugar al diablo: confiesa tu pecado, arregla cualquier enojo y aléjate de lo que te hace caer, como ciertas páginas o ciertas amistades. La batalla también es de la mente: lleva cautivo todo pensamiento a la obediencia a Cristo. Y sé honesto: Santiago dice que cada uno es tentado por su propia concupiscencia, así que no todo es culpa del diablo; asume tu responsabilidad y busca ayuda en un hermano maduro o en tu pastor. Dios es fiel y te dará la salida.",
    },
    {
      id: "intercesion-4-e5",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de intercesores qué enseñan Jesús y los apóstoles sobre los espíritus malos, y qué cuidados y equilibrio debe tener la iglesia, con citas bíblicas.",
      ideas: [
        { id: "autoridad", peso: 20, texto: "Jesús tenía autoridad: con su palabra los echaba.", formas: ["autoridad", "callate", "sal de el", "su palabra"] },
        { id: "gozo", peso: 15, texto: "El gozo mayor es tener el nombre escrito en los cielos.", formas: ["escritos en los cielos", "nombres escritos", "nombre escrito", "la salvacion"] },
        { id: "formula", peso: 20, texto: "El nombre de Jesús no es una fórmula mágica, como muestran los hijos de Esceva.", formas: ["esceva", "formula", "magia", "conjur*"], negativa: true },
        { id: "oculto", peso: 15, texto: "Romper con las prácticas ocultas.", formas: ["oculto", "ocultas", "brujeria", "adivinacion", "quemaron", "hechic*"] },
        { id: "equilibrio", peso: 30, texto: "No todo es un demonio; se ministra bajo los pastores, sin espectáculo, y con los menores, con permiso de sus padres.", formas: ["no todo", "medico", "consejeria", "pastores", "espectaculo", "padres", "menor"], negativa: true },
      ],
      basta: 85,
      citas: ["Marcos 1:23-27", "Marcos 1:25", "Marcos 1:27", "Lucas 10:17-20", "Lucas 10:20", "Hechos 16:16-18", "Hechos 16:18", "Hechos 19:13-20", "Hechos 19:15", "Hechos 19:19", "Deuteronomio 18:10-12", "1 Juan 4:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, Jesús echaba fuera a los espíritus con su sola palabra: cállate, y sal de él. Y la gente se asombraba de su autoridad (Marcos 1:27). Los setenta volvieron felices porque los demonios se les sujetaban, pero Jesús les dijo que se alegraran más bien de que sus nombres están escritos en los cielos (Lucas 10:20): el centro es la salvación. Pablo, en Filipos, mandó en el nombre de Jesucristo que el espíritu saliera de la muchacha, sin espectáculo. Pero el nombre de Jesús no es una fórmula mágica: los hijos de Esceva lo usaron como un conjuro y salieron heridos. Los nuevos creyentes de Éfeso rompieron con lo oculto y quemaron sus libros de magia. Por eso la iglesia necesita equilibrio. No todo problema es un demonio: hay enfermedades que se tratan con el médico y heridas que se tratan con consejería. Quien ora por alguien en una lucha espiritual lo hace bajo la dirección de los pastores, con respeto, sin espectáculo, y nunca a solas con un menor ni sin el permiso de sus padres.",
    },
  ],
  breve: {
    id: "intercesion-4-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo cambió tu manera de entender la guerra espiritual con esta materia: en qué se apoya tu confianza, cómo resistirás al enemigo cada día y qué errores evitarás, con citas bíblicas.",
    ideas: [
      { id: "victoria", peso: 25, texto: "Su confianza está en la victoria de Cristo.", formas: ["la cruz", "victoria de cristo", "triunf*", "despoj*", "mayor es el que esta", "trasladado"] },
      { id: "resistir", peso: 25, texto: "Resiste sometiéndose a Dios, con la Palabra, la oración y la armadura.", formas: ["sometiendome", "someterme", "someteos", "escrito esta", "la palabra", "la armadura", "orando", "resistir"] },
      { id: "errores", peso: 25, texto: "Dice qué errores evitará: el miedo, la arrogancia, creer toda manifestación, culpar al diablo.", formas: ["miedo", "arrogancia", "probar los espiritus", "metodos", "culpar al diablo", "obsesion*", "insultar"], negativa: true },
      { id: "personas", peso: 10, texto: "El enemigo no son las personas.", formas: ["sangre y carne", "las personas", "no son mis enemigos"], negativa: true },
      { id: "cambio", peso: 15, texto: "Dice qué cambió en su manera de pensar.", formas: ["antes pensaba", "antes creia", "antes vivia", "ahora entiendo", "aprendi", "voy a (orar|resistir|vivir|perdonar|leer)", "me comprometo"] },
    ],
    basta: 85,
    citas: ["Santiago 4:7", "Efesios 6:10-18", "Efesios 6:12", "Efesios 6:13-18", "Colosenses 2:15", "1 Juan 4:4", "1 Juan 3:8", "Colosenses 1:13", "2 Timoteo 1:7", "Judas 1:9", "1 Juan 4:1", "1 Pedro 5:8-9", "2 Corintios 10:3-5", "Romanos 16:20"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Antes pensaba que la guerra espiritual era gritarle al diablo, y vivía con un poco de miedo. Ahora entiendo que mi confianza está en la victoria de Cristo: en la cruz despojó a los principados y triunfó sobre ellos (Colosenses 2:15), y mayor es el que está en mí que el que está en el mundo. También aprendí que no tengo lucha contra sangre y carne: las personas no son mis enemigos. Cada día voy a resistir sometiéndome primero a Dios, como dice Santiago 4:7, con la Palabra, como Jesús en el desierto, y orando en todo tiempo con la armadura de Dios: la verdad, la justicia y la fe. Voy a evitar el miedo, porque Dios no me dio espíritu de cobardía; la arrogancia, porque Miguel dijo el Señor te reprenda; y creer en cualquier manifestación, porque hay que probar los espíritus. Tampoco voy a culpar al diablo de mi propio pecado.",
  },
};
