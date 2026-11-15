/**
 * El banco de «Los Evangelios y Hechos» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 los cuatro evangelios · o2 la persona de Jesús · o3 el reino en palabras y obras · o4 la cruz y la
 * resurrección · o5 Hechos 1 al 12 · o6 Hechos 13 al 28 · o7 el versículo de memoria (Mateo 16:16).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-evangelios-hechos-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_EVANGELIOS_HECHOS: BancoMateria = {
  materia: "n3-evangelios-hechos",
  repaso: {
    "n3-evangelios-hechos-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué significa la palabra evangelio?", "Buena noticia", ["Libro sagrado", "Ley antigua", "Profecía oscura"], "«Principio del evangelio de Jesucristo, Hijo de Dios».", "Marcos 1:1"],
      ["1-r2", 1, "o1", "comprender", "¿Por qué se llaman sinópticos Mateo, Marcos y Lucas?", "Porque se pueden ver juntos: cuentan muchos de los mismos hechos en un orden parecido", ["Porque los escribió una misma persona", "Porque son los más cortos", "Porque no cuentan milagros"], "Juan, en cambio, escoge siete señales y largos discursos.", "Juan 20:30-31"],
      ["1-r3", 1, "o1", "comprender", "¿Para qué escribió Juan su evangelio, según Juan 20:31?", "Para que creamos que Jesús es el Cristo y tengamos vida en su nombre", ["Para contar toda la historia de Israel", "Para dar leyes nuevas", "Para responder a los romanos"], "«Para que creyendo, tengáis vida en su nombre».", "Juan 20:31"],
    ] as P[]).map(p),
    "n3-evangelios-hechos-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué respondió Pedro cuando Jesús preguntó quién decían que era?", "Tú eres el Cristo, el Hijo del Dios viviente", ["Eres un profeta como Elías", "Eres Juan el Bautista", "Eres un buen maestro"], "«Tú eres el Cristo, el Hijo del Dios viviente».", "Mateo 16:16"],
      ["2-r2", 2, "o2", "comprender", "¿Qué enseña Juan 1:14?", "Que el Verbo eterno se hizo hombre y habitó entre nosotros", ["Que Jesús empezó a existir en Belén", "Que Dios dejó de ser Dios", "Que Jesús solo parecía hombre"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["2-r3", 2, "o2", "comprender", "¿Qué significa Emanuel?", "Dios con nosotros", ["Dios es fuerte", "Hijo de David", "Salvador del mundo"], "«Llamarás su nombre Emanuel, que traducido es: Dios con nosotros».", "Mateo 1:23"],
    ] as P[]).map(p),
    "n3-evangelios-hechos-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué anunciaba Jesús al comenzar su ministerio, según Marcos 1:15?", "Que el reino de Dios se había acercado: arrepentíos y creed en el evangelio", ["Que había que construir un templo nuevo", "Que había que luchar contra Roma", "Que pronto se iría de Israel"], "«El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio».", "Marcos 1:15"],
      ["3-r2", 3, "o3", "comprender", "¿Qué mostraban los milagros de Jesús?", "Que el reino de Dios había llegado", ["Que era un mago", "Que buscaba fama", "Que no le importaban los pobres"], "«Ciertamente el reino de Dios ha llegado a vosotros».", "Lucas 11:20"],
      ["3-r3", 3, "o3", "recordar", "¿Qué pide Jesús al que quiere seguirlo, según Marcos 8:34?", "Negarse a sí mismo, tomar su cruz y seguirlo", ["Hacerse rico", "Dejar de orar", "Esperar a ser perfecto"], "«Niéguese a sí mismo, y tome su cruz, y sígame».", "Marcos 8:34"],
    ] as P[]).map(p),
    "n3-evangelios-hechos-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Para qué vino el Hijo del Hombre, según Marcos 10:45?", "Para servir y dar su vida en rescate por muchos", ["Para ser servido", "Para fundar un reino político", "Para condenar al mundo"], "«No vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».", "Marcos 10:45"],
      ["4-r2", 4, "o4", "comprender", "¿Qué significó la copa de la última cena, según Lucas 22:20?", "El nuevo pacto en la sangre de Jesús", ["Una despedida sin más", "La fiesta de los Tabernáculos", "El comienzo de un ayuno"], "«Esta copa es el nuevo pacto en mi sangre».", "Lucas 22:20"],
      ["4-r3", 4, "o4", "recordar", "¿A cuántos hermanos a la vez se apareció el Resucitado, según 1 Corintios 15:6?", "A más de quinientos", ["A doce", "A setenta", "A tres"], "«Después apareció a más de quinientos hermanos a la vez».", "1 Corintios 15:6"],
    ] as P[]).map(p),
    "n3-evangelios-hechos-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué versículo resume el plan del libro de Hechos?", "Hechos 1:8", ["Hechos 28:31", "Hechos 9:15", "Hechos 15:11"], "Testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.", "Hechos 1:8"],
      ["5-r2", 5, "o5", "comprender", "¿Qué profecía explicó Pedro en Pentecostés?", "La de Joel: derramaré de mi Espíritu sobre toda carne", ["La de Jonás", "La de Ezequiel sobre los huesos secos", "La de Daniel sobre las bestias"], "«Derramaré de mi Espíritu sobre toda carne».", "Hechos 2:17"],
      ["5-r3", 5, "o5", "recordar", "¿En qué perseveraba la primera iglesia, según Hechos 2:42?", "En la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones", ["En los sacrificios del templo", "En las fiestas de Roma", "Solo en la ley de Moisés"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:42"],
    ] as P[]).map(p),
    "n3-evangelios-hechos-6": ([
      ["6-r1", 6, "o6", "comprender", "¿Qué decidió el concilio de Jerusalén?", "Que judíos y gentiles son salvos por la gracia del Señor Jesús", ["Que los gentiles debían circuncidarse", "Que solo los judíos podían ser salvos", "Que había que volver a la ley de Moisés"], "«Antes creemos que por la gracia del Señor Jesús seremos salvos, de igual modo que ellos».", "Hechos 15:11"],
      ["6-r2", 6, "o6", "recordar", "¿Qué pidió el varón macedonio en la visión de Pablo?", "Pasa a Macedonia y ayúdanos", ["Vuelve a Jerusalén", "Quédate en Asia", "Ve a Roma de inmediato"], "«Pasa a Macedonia y ayúdanos».", "Hechos 16:9"],
      ["6-r3", 6, "o6", "comprender", "¿Cómo termina el libro de Hechos?", "Con Pablo en Roma, predicando abiertamente y sin impedimento", ["Con la muerte de Pablo", "Con la destrucción del templo", "Con el regreso de Pablo a Tarso"], "«Predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento».", "Hechos 28:31"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: los cuatro evangelios (10)
    ["f01", 1, "o1", "recordar", "¿Qué palabra griega está detrás de evangelio?", "Euangelion", ["Ekklesía", "Logos", "Koinonía"], "Significa buena noticia: «Principio del evangelio de Jesucristo, Hijo de Dios».", "Marcos 1:1"],
    ["f02", 1, "o1", "comprender", "¿Por qué los títulos antiguos dicen el evangelio según Mateo, según Marcos…?", "Porque es un solo evangelio contado por cuatro autores", ["Porque son cuatro evangelios distintos", "Porque cada uno corrige al otro", "Porque Mateo los escribió todos"], "Es una sola buena noticia sobre Jesucristo.", "Marcos 1:1"],
    ["f03", 1, "o1", "comprender", "¿En qué se apoyó Lucas para escribir su evangelio?", "En lo que enseñaron los testigos que lo vieron desde el principio", ["En leyendas populares", "En lo que imaginó", "Solo en el Antiguo Testamento"], "Escribió según «los que desde el principio lo vieron con sus ojos».", "Lucas 1:2"],
    ["f04", 1, "o1", "recordar", "¿Qué dice Pedro del testimonio de los apóstoles en 2 Pedro 1:16?", "Que no siguieron fábulas, sino que vieron con sus ojos la majestad de Cristo", ["Que contaron historias simbólicas", "Que nunca vieron a Jesús", "Que escribieron mucho después y sin testigos"], "«No os hemos dado a conocer el poder y la venida de nuestro Señor Jesucristo siguiendo fábulas artificiosas».", "2 Pedro 1:16"],
    ["f05", 1, "o1", "comprender", "¿Qué evangelio repite que algo sucedió para que se cumpliese lo dicho por los profetas?", "Mateo", ["Marcos", "Lucas", "Juan"], "«Todo esto aconteció para que se cumpliese lo dicho por el Señor por medio del profeta».", "Mateo 1:22"],
    ["f06", 1, "o1", "comprender", "¿Qué retrato de Jesús destaca Marcos?", "El Hijo de Dios que vino a servir y a dar su vida", ["El maestro que solo enseña", "Un rey al estilo de Roma", "El sacerdote del templo"], "El Hijo del Hombre vino para servir y para dar su vida en rescate por muchos.", "Marcos 10:45"],
    ["f07", 1, "o1", "comprender", "¿Qué evangelio destaca a Jesús como el Salvador que busca a los perdidos, a los pobres y a los despreciados?", "Lucas", ["Mateo", "Marcos", "Juan"], "«Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido».", "Lucas 19:10"],
    ["f08", 1, "o1", "recordar", "¿Qué cuenta Juan de manera especial?", "Siete señales, largos discursos y las declaraciones Yo soy", ["La genealogía desde Abraham", "El Sermón del monte", "Las parábolas del reino"], "Escribió para que creyendo tengamos vida en su nombre.", "Juan 20:31"],
    ["f09", 1, "o1", "analizar", "¿Cómo se entienden las diferencias entre los evangelios?", "Como perspectivas distintas de testigos que escogieron qué contar para sus lectores", ["Como contradicciones que anulan su valor", "Como errores de copia", "Como pruebas de que no hubo testigos"], "Lucas ordenó lo que investigó para que Teófilo conociera bien la verdad.", "Lucas 1:3-4"],
    ["f10", 1, "o7", "recordar", "Completa Mateo 16:16: Tú eres el Cristo…", "el Hijo del Dios viviente", ["el profeta de Galilea", "el hijo de José", "el maestro de Israel"], "Es la confesión de Pedro y el versículo de memoria de la materia.", "Mateo 16:16"],
    // ---- lección 2: la persona de Jesús (10)
    ["f11", 2, "o2", "recordar", "¿Qué pregunta hizo Jesús a sus discípulos en Cesarea de Filipo?", "Y vosotros, ¿quién decís que soy yo?", ["¿Dónde comeremos la pascua?", "¿Quién es el mayor?", "¿Por qué tenéis miedo?"], "«Y vosotros, ¿quién decís que soy yo?».", "Mateo 16:15"],
    ["f12", 2, "o2", "comprender", "¿Quién le reveló a Pedro que Jesús es el Cristo?", "El Padre que está en los cielos", ["La gente del pueblo", "Los fariseos", "Su propia inteligencia"], "No se lo reveló carne ni sangre, sino el Padre que está en los cielos.", "Mateo 16:17"],
    ["f13", 2, "o2", "recordar", "¿Cómo empieza el evangelio de Juan?", "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios", ["Libro de la genealogía de Jesucristo", "Principio del evangelio de Jesucristo", "Puesto que ya muchos han tratado"], "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
    ["f14", 2, "o2", "comprender", "¿Qué enseñan Mateo y Lucas sobre la concepción de Jesús?", "Que fue concebido por el Espíritu Santo en el vientre de María, una virgen", ["Que fue hijo natural de José", "Que nació como un hombre común y después fue adoptado", "Que no tuvo cuerpo humano"], "«El Espíritu Santo vendrá sobre ti, y el poder del Altísimo te cubrirá con su sombra».", "Lucas 1:35"],
    ["f15", 2, "o2", "aplicar", "¿Cuál de estos hechos muestra que Jesús es verdadero hombre?", "Que tuvo hambre, se cansó del camino y lloró", ["Que perdonó pecados", "Que calmó el mar", "Que dijo Yo soy"], "«Jesús lloró».", "Juan 11:35"],
    ["f16", 2, "o2", "aplicar", "¿Cuál de estos hechos muestra que Jesús es verdadero Dios?", "Que perdonó pecados, lo que solo Dios puede hacer", ["Que tuvo sed", "Que durmió en la barca", "Que creció en estatura"], "Le dijo al paralítico: «Hijo, tus pecados te son perdonados».", "Marcos 2:5"],
    ["f17", 2, "o2", "analizar", "¿Qué quiso decir Jesús con: Antes que Abraham fuese, yo soy?", "Que existía antes de Abraham y usaba el nombre con que Dios se reveló a Moisés", ["Que era mayor que sus discípulos", "Que conocía bien la historia de Israel", "Que Abraham era su padre"], "«Antes que Abraham fuese, yo soy».", "Juan 8:58"],
    ["f18", 2, "o2", "comprender", "¿Qué significa Cristo?", "El Ungido, el Mesías prometido", ["El Maestro", "El Profeta", "El Sacerdote"], "Pedro confesó: «Tú eres el Cristo, el Hijo del Dios viviente».", "Mateo 16:16"],
    ["f19", 2, "o2", "comprender", "¿De qué profecía viene el título Hijo del Hombre que Jesús usó?", "De la visión de Daniel 7, donde uno como un hijo de hombre recibe un reino eterno", ["De Génesis 1", "De los Proverbios", "De Malaquías 4"], "Jesús dijo que verían al Hijo del Hombre sentado a la diestra del poder de Dios.", "Marcos 14:62"],
    ["f20", 2, "o2", "analizar", "¿Por qué importa que Jesús sea a la vez Dios y hombre?", "Porque como Dios puede salvar y como hombre pudo tomar nuestro lugar", ["No importa para la salvación", "Porque así era más famoso", "Porque así no sufría"], "Fue tentado en todo según nuestra semejanza, pero sin pecado.", "Hebreos 4:15"],
    // ---- lección 3: el reino en palabras y obras (10)
    ["f21", 3, "o3", "recordar", "¿Qué es el reino de Dios en la predicación de Jesús?", "El reinado de Dios que llega para salvar, sanar y restaurar", ["Un país en el mapa", "El imperio romano convertido", "Un templo de piedra"], "«El reino de Dios se ha acercado».", "Marcos 1:15"],
    ["f22", 3, "o3", "comprender", "Según Lucas 11:20, ¿qué mostraba que Jesús echara fuera demonios por el dedo de Dios?", "Que el reino de Dios había llegado", ["Que era un profeta más", "Que los demonios eran fuertes", "Que había que temer"], "«Ciertamente el reino de Dios ha llegado a vosotros».", "Lucas 11:20"],
    ["f23", 3, "o3", "recordar", "¿Qué le mandó decir Jesús a Juan el Bautista?", "Que los ciegos ven, los cojos andan y a los pobres se les anuncia el evangelio", ["Que esperara a otro", "Que saliera de la cárcel", "Que dejara de predicar"], "«Los ciegos ven, los cojos andan, los leprosos son limpiados».", "Mateo 11:5"],
    ["f24", 3, "o3", "comprender", "¿Qué enseña la parábola de la semilla de mostaza?", "Que el reino crece desde algo pequeño hasta ser grande", ["Que hay que sembrar en primavera", "Que el reino será pequeño para siempre", "Que solo los agricultores entran"], "El reino de los cielos es semejante al grano de mostaza.", "Mateo 13:31"],
    ["f25", 3, "o3", "analizar", "¿Qué significa que el reino ya está aquí y todavía no del todo?", "Que llegó con Jesús, pero su plenitud vendrá con su regreso", ["Que nunca llegará", "Que ya está completo y no hay nada que esperar", "Que solo es un sentimiento"], "Por eso oramos: «Venga tu reino».", "Mateo 6:10"],
    ["f26", 3, "o3", "comprender", "¿Para qué llamó Jesús a los doce, según Marcos 3:14?", "Para que estuvieran con él y para enviarlos a predicar", ["Para que fueran su ejército", "Para que gobernaran Roma", "Para que escribieran leyes"], "Estableció a doce para que estuviesen con él y para enviarlos a predicar.", "Marcos 3:14"],
    ["f27", 3, "o3", "recordar", "¿Cuál de estos es uno de los Yo soy de Juan?", "Yo soy el camino, y la verdad, y la vida", ["Yo soy el rey de los judíos", "Yo soy el hijo del carpintero", "Yo soy el mayor de los profetas"], "«Yo soy el camino, y la verdad, y la vida».", "Juan 14:6"],
    ["f28", 3, "o3", "recordar", "¿Cuál de estas es una de las siete señales de Juan?", "La resurrección de Lázaro", ["La transfiguración", "La pesca de Lucas 5", "El bautismo de Jesús"], "Allí Jesús dijo: Yo soy la resurrección y la vida.", "Juan 11:25"],
    ["f29", 3, "o3", "aplicar", "¿Qué significa seguir a Jesús, según Marcos 8:34?", "Negarse a sí mismo, tomar la cruz y seguirlo", ["Asistir a una reunión al año", "Saber mucho de la Biblia", "Hacer lo que uno quiere"], "«Si alguno quiere venir en pos de mí, niéguese a sí mismo, y tome su cruz, y sígame».", "Marcos 8:34"],
    ["f30", 3, "o3", "aplicar", "¿Cómo sigue la iglesia anunciando el reino hoy?", "Con palabras y obras: predica, ora por los enfermos y sirve a los pobres", ["Solo con palabras", "Solo con obras sociales", "Esperando sin hacer nada"], "Jesús anunció el reino con palabras y con obras.", "Mateo 11:5"],
    // ---- lección 4: la cruz y la resurrección (10)
    ["f31", 4, "o4", "comprender", "¿Por qué los evangelios dedican tanto espacio a la última semana de Jesús?", "Porque su muerte y su resurrección son el centro del evangelio", ["Porque no sabían más de su vida", "Porque fue la semana más larga", "Porque así lo pedía Roma"], "Cristo murió por nuestros pecados y resucitó al tercer día, conforme a las Escrituras.", "1 Corintios 15:3-4"],
    ["f32", 4, "o4", "recordar", "¿Qué anunció Jesús en Marcos 8:31?", "Que le era necesario padecer, ser muerto y resucitar después de tres días", ["Que sería rey de Israel", "Que viajaría a Roma", "Que nunca moriría"], "Comenzó a enseñarles que le era necesario al Hijo del Hombre padecer mucho.", "Marcos 8:31"],
    ["f33", 4, "o4", "comprender", "¿Qué significa que Jesús dio su vida en rescate por muchos?", "Que pagó el precio de nuestra libertad del pecado", ["Que fue solo un ejemplo moral", "Que perdió la batalla", "Que liberó a Israel de Roma"], "«Para dar su vida en rescate por muchos».", "Marcos 10:45"],
    ["f34", 4, "o4", "comprender", "¿Qué pacto inauguró la sangre de Jesús?", "El nuevo pacto anunciado por los profetas", ["El pacto con Noé", "El pacto del Sinaí otra vez", "Un pacto con Roma"], "«Esta copa es el nuevo pacto en mi sangre, que por vosotros se derrama».", "Lucas 22:20"],
    ["f35", 4, "o4", "analizar", "¿Qué significó el velo del templo rasgado de arriba abajo?", "Que el camino a la presencia de Dios quedaba abierto por la muerte de Jesús", ["Que hubo un temblor sin sentido", "Que el templo se iba a vender", "Que los sacerdotes se enojaron"], "«El velo del templo se rasgó en dos, de arriba abajo».", "Marcos 15:38"],
    ["f36", 4, "o4", "recordar", "¿Qué dijo Jesús antes de entregar el espíritu, según Juan 19:30?", "Consumado es", ["Tengo sed", "Padre, perdónalos", "¿Por qué me has desamparado?"], "«Consumado es»: la obra de salvación estaba completa.", "Juan 19:30"],
    ["f37", 4, "o4", "comprender", "¿Qué profecía ven los evangelios cumplida en la cruz?", "Isaías 53: el siervo que llevó el pecado de muchos", ["Génesis 11: la torre de Babel", "Jonás 4: la calabacera", "Ester 9: la fiesta de Purim"], "Por su llaga fuimos nosotros curados.", "Isaías 53:5"],
    ["f38", 4, "o4", "recordar", "¿Quiénes encontraron primero la tumba vacía?", "Las mujeres que fueron al sepulcro", ["Los soldados romanos", "Los fariseos", "Pilato"], "El primer día de la semana, muy de mañana, vinieron al sepulcro.", "Lucas 24:1"],
    ["f39", 4, "o4", "comprender", "¿Qué testimonio de la resurrección da Pablo en 1 Corintios 15:6?", "Que más de quinientos hermanos vieron al Resucitado, y muchos vivían aún", ["Un documento romano", "Una visión personal secreta", "Que nadie lo vio"], "«Después apareció a más de quinientos hermanos a la vez, de los cuales muchos viven aún».", "1 Corintios 15:6"],
    ["f40", 4, "o4", "aplicar", "¿Qué manda la gran comisión de Mateo 28:19-20?", "Hacer discípulos de todas las naciones, bautizándolos y enseñándoles", ["Esperar en Jerusalén para siempre", "Construir templos", "Volver a la ley de Moisés"], "Con la promesa: yo estoy con vosotros todos los días.", "Mateo 28:19-20"],
    // ---- lección 5: Hechos 1 al 12 (10)
    ["f41", 5, "o5", "recordar", "¿Qué dice Hechos 1:1 que contó Lucas en su primer libro?", "Todas las cosas que Jesús comenzó a hacer y a enseñar", ["La historia de Pablo", "La vida de Juan el Bautista", "Las cartas a las iglesias"], "Hechos continúa lo que Jesús siguió haciendo por su Espíritu y su iglesia.", "Hechos 1:1"],
    ["f42", 5, "o5", "comprender", "¿Cómo sigue el libro de Hechos el plan de Hechos 1:8?", "Jerusalén (1 al 7), Judea y Samaria (8 al 12) y hasta lo último de la tierra (13 al 28)", ["Roma, Atenas y Jerusalén", "Egipto, Babilonia y Persia", "Solo Jerusalén"], "«Me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
    ["f43", 5, "o5", "recordar", "¿Qué pasó el día de Pentecostés, según Hechos 2:4?", "Fueron todos llenos del Espíritu Santo y comenzaron a hablar en otras lenguas", ["Construyeron el templo", "Eligieron a un rey", "Volvieron a Galilea"], "«Y fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas».", "Hechos 2:4"],
    ["f44", 5, "o5", "comprender", "¿A qué llamó Pedro en su sermón de Pentecostés?", "A arrepentirse y bautizarse en el nombre de Jesucristo para perdón de los pecados", ["A ofrecer sacrificios", "A guardar el sábado", "A volver a Moisés"], "«Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados».", "Hechos 2:38"],
    ["f45", 5, "o5", "recordar", "¿Cuántas personas se añadieron el día de Pentecostés?", "Como tres mil", ["Doce", "Ciento veinte", "Cinco mil"], "Se añadieron aquel día como tres mil personas.", "Hechos 2:41"],
    ["f46", 5, "o5", "aplicar", "¿Qué respondieron Pedro y Juan cuando les prohibieron hablar de Jesús?", "Que no podían dejar de decir lo que habían visto y oído", ["Que obedecerían y callarían", "Que se irían a otra ciudad", "Que lo pensarían"], "«Porque no podemos dejar de decir lo que hemos visto y oído».", "Hechos 4:20"],
    ["f47", 5, "o5", "comprender", "¿Qué efecto tuvo la persecución después de la muerte de Esteban?", "Esparció a los creyentes, que anunciaban el evangelio por todas partes", ["Acabó con la iglesia", "Hizo que todos callaran", "Llevó a la iglesia a Roma de inmediato"], "«Los que fueron esparcidos iban por todas partes anunciando el evangelio».", "Hechos 8:4"],
    ["f48", 5, "o5", "recordar", "¿Dónde se encontró Saulo con Jesús?", "En el camino a Damasco", ["En el templo de Jerusalén", "En Antioquía", "En Roma"], "Yendo por el camino, al llegar cerca de Damasco, lo rodeó un resplandor de luz del cielo.", "Hechos 9:3"],
    ["f49", 5, "o5", "comprender", "¿Qué entendió Pedro en casa de Cornelio?", "Que Dios no hace acepción de personas: el evangelio es también para los gentiles", ["Que los gentiles debían hacerse judíos primero", "Que Cornelio no podía ser salvo", "Que había que volver a Jerusalén"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34"],
    ["f50", 5, "o5", "recordar", "¿Dónde se llamó cristianos a los discípulos por primera vez?", "En Antioquía", ["En Jerusalén", "En Roma", "En Éfeso"], "«A los discípulos se les llamó cristianos por primera vez en Antioquía».", "Hechos 11:26"],
    // ---- lección 6: Hechos 13 al 28 (10)
    ["f51", 6, "o6", "recordar", "¿Con quién hizo Pablo su primer viaje misionero?", "Con Bernabé", ["Con Silas", "Con Pedro", "Con Timoteo"], "El Espíritu Santo dijo: Apartadme a Bernabé y a Saulo.", "Hechos 13:2"],
    ["f52", 6, "o6", "comprender", "¿Qué problema trató el concilio de Jerusalén?", "Si los gentiles debían circuncidarse y guardar la ley de Moisés para ser salvos", ["Quién sería el próximo apóstol", "Dónde construir un templo", "Qué día celebrar la Pascua"], "Algunos enseñaban que sin la circuncisión no se podía ser salvo.", "Hechos 15:1"],
    ["f53", 6, "o6", "analizar", "¿Qué enseña la conclusión de Pedro en Hechos 15:11?", "Que la salvación es por gracia, igual para judíos y gentiles", ["Que los judíos se salvan por la ley y los gentiles por gracia", "Que la gracia no basta", "Que hay que ganarse la salvación"], "«Antes creemos que por la gracia del Señor Jesús seremos salvos, de igual modo que ellos».", "Hechos 15:11"],
    ["f54", 6, "o6", "recordar", "¿A qué continente llegó el evangelio después de la visión del varón macedonio?", "A Europa", ["A África", "A Asia oriental", "A América"], "«Pasa a Macedonia y ayúdanos».", "Hechos 16:9"],
    ["f55", 6, "o6", "recordar", "¿Qué le respondieron al carcelero de Filipos cuando preguntó cómo ser salvo?", "Cree en el Señor Jesucristo, y serás salvo, tú y tu casa", ["Ofrece un sacrificio", "Guarda la ley", "Ve al templo de Jerusalén"], "«Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».", "Hechos 16:31"],
    ["f56", 6, "o6", "comprender", "¿De qué partió Pablo para predicar en Atenas?", "De un altar dedicado al dios no conocido", ["De una sinagoga en Roma", "De un milagro público", "De una carta de los apóstoles"], "Halló un altar con la inscripción: AL DIOS NO CONOCIDO.", "Hechos 17:23"],
    ["f57", 6, "o6", "recordar", "¿Dónde pasó Pablo casi tres años en su tercer viaje?", "En Éfeso", ["En Atenas", "En Malta", "En Chipre"], "Les recordó a los ancianos de Éfeso que por tres años no había cesado de amonestarlos.", "Hechos 20:31"],
    ["f58", 6, "o6", "aplicar", "¿Qué enseña Hechos 20:24 sobre el ministerio?", "Que terminar la carrera y el ministerio recibido del Señor vale más que la propia vida", ["Que hay que cuidar la vida antes que el ministerio", "Que el ministerio es un trabajo como otro", "Que hay que buscar fama"], "«Ni estimo preciosa mi vida para mí mismo, con tal que acabe mi carrera con gozo».", "Hechos 20:24"],
    ["f59", 6, "o6", "recordar", "¿Por qué llegó Pablo preso a Roma?", "Porque, como ciudadano romano, apeló al César", ["Porque huyó de Jerusalén", "Porque lo invitó el emperador", "Porque perdió un barco"], "Festo le respondió: A César has apelado; a César irás.", "Hechos 25:12"],
    ["f60", 6, "o6", "analizar", "¿Por qué se dice que Hechos tiene un final abierto?", "Porque no cuenta cómo terminó la vida de Pablo: la misión sigue en cada generación", ["Porque se perdió el último capítulo", "Porque Lucas no tuvo tiempo de terminarlo", "Porque Pablo fue liberado y volvió a casa"], "Pablo predicaba «abiertamente y sin impedimento».", "Hechos 28:31"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿A quién escribió Lucas su evangelio?", "A Teófilo", ["A Timoteo", "A los romanos", "A Pedro"], "Escribió por orden, oh excelentísimo Teófilo.", "Lucas 1:3"],
      ["m1-02", 1, "o1", "comprender", "¿Qué evangelio continúa en el libro de Hechos?", "Lucas", ["Mateo", "Marcos", "Juan"], "Hechos empieza recordando el primer tratado, escrito a Teófilo.", "Hechos 1:1"],
      ["m1-03", 1, "o1", "recordar", "Según una tradición antigua, ¿de quién recogió Marcos la predicación?", "De Pedro", ["De Pablo", "De Juan", "De Santiago"], "Pedro llama a Marcos mi hijo en su carta.", "1 Pedro 5:13"],
      ["m1-04", 1, "o1", "comprender", "¿Para qué lectores escribió Mateo principalmente?", "Para lectores judíos", ["Para los griegos de Atenas", "Para la corte romana", "Para los egipcios"], "Por eso muestra que Jesús cumple lo dicho por los profetas.", "Mateo 1:22"],
      ["m1-05", 1, "o1", "aplicar", "Antes de enseñar un milagro de un evangelio, ¿qué conviene preguntar?", "Qué quiere mostrar ese evangelista con él", ["Cuántas personas lo vieron", "Qué día de la semana fue", "Nada: todos los relatos dicen lo mismo"], "Cada evangelio pinta su retrato de Jesús para que creamos en él.", "Juan 20:31"],
      ["m1-06", 1, "o7", "recordar", "¿Qué cita dice: Tú eres el Cristo, el Hijo del Dios viviente?", "Mateo 16:16", ["Juan 3:16", "Marcos 1:1", "Lucas 2:11"], "Es el versículo de memoria de la materia.", "Mateo 16:16"],
      ["m1-07", 2, "o2", "recordar", "¿Qué voz se oyó en el bautismo de Jesús?", "Este es mi Hijo amado, en quien tengo complacencia", ["Este es el rey de los judíos", "Arrepentíos y creed", "Preparad el camino"], "«Este es mi Hijo amado, en quien tengo complacencia».", "Mateo 3:17"],
      ["m1-08", 2, "o2", "comprender", "¿Cómo se describe al Verbo en Juan 1:1?", "Como eterno y Dios: era con Dios y era Dios", ["Como un ángel", "Como un profeta", "Como una idea"], "«Y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
      ["m1-09", 2, "o2", "recordar", "¿Qué hizo Jesús cansado del camino, según Juan 4:6?", "Se sentó junto al pozo", ["Subió a la barca", "Entró al templo", "Durmió en Betania"], "Jesús, cansado del camino, se sentó así junto al pozo.", "Juan 4:6"],
      ["m1-10", 2, "o2", "comprender", "¿Por qué se escandalizaron los escribas cuando Jesús perdonó al paralítico?", "Porque solo Dios puede perdonar pecados", ["Porque era sábado", "Porque el paralítico era extranjero", "Porque no le cobró"], "Jesús le dijo: «Hijo, tus pecados te son perdonados».", "Marcos 2:5"],
      ["m1-11", 2, "o2", "analizar", "¿Qué enseña Hebreos 4:15 sobre Jesús?", "Que fue tentado en todo como nosotros, pero sin pecado", ["Que nunca fue tentado", "Que pecó como todos", "Que no entiende nuestras debilidades"], "Por eso puede compadecerse de nuestras debilidades.", "Hebreos 4:15"],
      ["m1-12", 2, "o2", "comprender", "¿Qué significa que Jesús es Señor?", "Que tiene autoridad sobre todo, y sus discípulos lo obedecen y lo adoran", ["Que era un hombre rico", "Que era solo un título de cortesía", "Que gobernaba Roma"], "Toda potestad le es dada en el cielo y en la tierra.", "Mateo 28:18"],
      ["m1-13", 3, "o3", "recordar", "¿Qué parábola enseña que el reino transforma desde dentro?", "La de la levadura", ["La del sembrador", "La de la red", "La de las diez vírgenes"], "El reino de los cielos es semejante a la levadura.", "Mateo 13:33"],
      ["m1-14", 3, "o3", "comprender", "¿Qué enseña la parábola del tesoro escondido?", "Que el reino vale más que todo lo que uno tiene", ["Que hay que buscar oro", "Que el reino se compra con dinero", "Que hay que esconder la fe"], "El hombre vende todo lo que tiene y compra aquel campo.", "Mateo 13:44"],
      ["m1-15", 3, "o3", "recordar", "¿Cuántas señales cuenta Juan?", "Siete", ["Tres", "Doce", "Cuarenta"], "Las escogió para que creamos que Jesús es el Cristo.", "Juan 20:30-31"],
      ["m1-16", 3, "o3", "recordar", "¿Qué dijo Jesús de sí mismo en Juan 10:11?", "Yo soy el buen pastor", ["Yo soy el rey de Israel", "Yo soy el mayor de los profetas", "Yo soy el hijo de José"], "El buen pastor su vida da por las ovejas.", "Juan 10:11"],
      ["m1-17", 3, "o3", "aplicar", "¿Qué significa orar: venga tu reino?", "Pedir que el gobierno de Dios llegue a nuestra vida y al mundo, y que Cristo vuelva", ["Pedir más dinero", "Pedir que nada cambie", "Pedir el fin de la iglesia"], "«Venga tu reino. Hágase tu voluntad, como en el cielo, así también en la tierra».", "Mateo 6:10"],
      ["m1-18", 3, "o3", "analizar", "¿Por qué los milagros de Jesús no eran solo actos de poder?", "Porque eran señales de que el reino de Dios había llegado", ["Porque querían atraer multitudes", "Porque eran trucos", "Porque eran solo para sus amigos"], "Lo que se oía y se veía mostraba la llegada del reino.", "Mateo 11:4"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Durante qué fiesta fue la última cena?", "La Pascua", ["Pentecostés", "Los Tabernáculos", "Purim"], "Jesús dijo: ¡Cuánto he deseado comer con vosotros esta pascua antes que padezca!", "Lucas 22:15"],
      ["m2-02", 4, "o4", "comprender", "¿Qué pidió Jesús al dar el pan en la última cena?", "Haced esto en memoria de mí", ["Guardad esto en el templo", "No lo contéis a nadie", "Comed solo los sábados"], "«Haced esto en memoria de mí».", "Lucas 22:19"],
      ["m2-03", 4, "o4", "recordar", "Según 1 Corintios 15:5, ¿a quiénes se apareció primero el Resucitado?", "A Cefas, y después a los doce", ["A Pilato", "A Herodes", "A los fariseos"], "«Y que apareció a Cefas, y después a los doce».", "1 Corintios 15:5"],
      ["m2-04", 4, "o4", "comprender", "¿Qué cambio produjo la resurrección en los discípulos?", "Pasaron de huir con miedo a ser testigos valientes", ["Se volvieron más tímidos", "Volvieron a pescar para siempre", "Negaron a Jesús otra vez"], "No podían dejar de decir lo que habían visto y oído.", "Hechos 4:20"],
      ["m2-05", 4, "o4", "recordar", "¿Qué anunciaron los ángeles en la ascensión?", "Que Jesús volverá como lo vieron ir al cielo", ["Que no volverá", "Que se quedaría en Galilea", "Que enviaría a otro Mesías"], "Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá.", "Hechos 1:11"],
      ["m2-06", 4, "o4", "aplicar", "¿Qué hacemos cada vez que participamos de la Santa Cena?", "Anunciamos la muerte del Señor hasta que él venga", ["Repetimos el sacrificio de Cristo", "Celebramos solo una tradición", "Recordamos a Moisés"], "Pablo lo enseña a los corintios.", "1 Corintios 11:26"],
      ["m2-07", 5, "o5", "recordar", "¿Cuántos días después de la Pascua se celebraba Pentecostés?", "Cincuenta", ["Siete", "Cuarenta", "Doce"], "Pentecostés significa quincuagésimo; era la fiesta de las semanas.", "Hechos 2:1"],
      ["m2-08", 5, "o5", "comprender", "¿Qué se les apareció a los discípulos en Pentecostés?", "Lenguas repartidas, como de fuego", ["Ángeles con espadas", "Una columna de nube", "Palomas blancas"], "«Se les aparecieron lenguas repartidas, como de fuego».", "Hechos 2:3"],
      ["m2-09", 5, "o5", "recordar", "¿Quién predicó en Samaria después de la persecución?", "Felipe", ["Pedro", "Pablo", "Bernabé"], "Felipe, descendiendo a la ciudad de Samaria, les predicaba a Cristo.", "Hechos 8:5"],
      ["m2-10", 5, "o5", "comprender", "¿Qué dice Hechos 4:12 sobre la salvación?", "Que en ningún otro hay salvación sino en Jesús", ["Que hay muchos caminos", "Que la salvación es por las obras", "Que solo los judíos se salvan"], "«Y en ningún otro hay salvación».", "Hechos 4:12"],
      ["m2-11", 5, "o5", "aplicar", "¿Qué marca de la primera iglesia se refiere a compartir la vida unos con otros?", "La comunión", ["La doctrina de los apóstoles", "El partimiento del pan", "Las oraciones"], "Perseveraban en la comunión unos con otros.", "Hechos 2:42"],
      ["m2-12", 5, "o5", "analizar", "¿Por qué algunos llaman a Hechos los hechos del Espíritu Santo?", "Porque el Espíritu da poder, guía, envía y abre puertas en cada etapa", ["Porque no aparecen los apóstoles", "Porque solo habla de milagros", "Porque no tuvo autor humano"], "Recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo.", "Hechos 1:8"],
      ["m2-13", 6, "o6", "recordar", "¿A qué isla navegaron Pablo y Bernabé al empezar el primer viaje?", "A Chipre", ["A Malta", "A Creta", "A Sicilia"], "Descendieron a Seleucia, y de allí navegaron a Chipre.", "Hechos 13:4"],
      ["m2-14", 6, "o6", "recordar", "¿En qué ciudad se convirtió el carcelero?", "En Filipos", ["En Atenas", "En Roma", "En Corinto"], "Le dijeron: Cree en el Señor Jesucristo, y serás salvo.", "Hechos 16:31"],
      ["m2-15", 6, "o6", "comprender", "¿Cómo resolvió la iglesia el conflicto sobre los gentiles en Hechos 15?", "Reuniéndose para escuchar la Escritura y al Espíritu", ["Con una votación sin orar", "Expulsando a los gentiles", "Dividiéndose en dos iglesias"], "Concluyeron que somos salvos por la gracia del Señor Jesús.", "Hechos 15:11"],
      ["m2-16", 6, "o6", "recordar", "¿En qué isla naufragó Pablo camino a Roma?", "En Malta", ["En Chipre", "En Creta", "En Patmos"], "«Estando ya a salvo, supimos que la isla se llamaba Malta».", "Hechos 28:1"],
      ["m2-17", 6, "o6", "aplicar", "¿Qué enseña el final abierto de Hechos a la iglesia de hoy?", "Que la misión sigue y cada generación escribe el capítulo siguiente", ["Que la misión terminó con Pablo", "Que ya no hace falta predicar", "Que solo los apóstoles evangelizan"], "Pablo predicaba abiertamente y sin impedimento.", "Hechos 28:31"],
      ["m2-18", 6, "o6", "analizar", "¿Qué tienen en común Filipos, Atenas y Roma en el relato de Hechos?", "Que en cada una Dios abrió puertas al evangelio en medio de dificultades", ["Que eran ciudades judías", "Que Pablo nunca predicó allí", "Que eran islas"], "El evangelio llegó hasta lo último de la tierra.", "Hechos 1:8"],
    ] as P[]).map(p),
  },
  // las escritas del examen final: una corta (de 3) y un escrito breve (de 2) por intento
  escritas: [
    {
      id: "n3-evangelios-hechos-e1",
      tipo: "corta",
      pregunta: "Explica el propósito y el énfasis de dos de los cuatro evangelios.",
      ideas: [
        // cada idea junta dos evangelios, para que casi cualquier par sume las dos
        { id: "evangelioA", peso: 30, texto: "Mateo (el Mesías que cumple las Escrituras, para judíos) o Lucas (el Salvador de todos, que busca a los perdidos).", formas: ["mateo", "lucas", "mesias", "rey prometido", "cumpl*", "judios", "teofilo", "perdidos", "salvador de todos"] },
        { id: "evangelioB", peso: 30, texto: "Marcos (el Hijo de Dios que vino a servir) o Juan (las señales y los Yo soy, para que creamos).", formas: ["marcos", "juan", "siervo", "servir", "senales", "señales", "yo soy", "creamos", "creais", "verbo"] },
        { id: "proposito", peso: 30, texto: "El propósito: para quién y para qué escribió cada uno.", formas: ["para que", "proposito", "escribio para", "lectores", "retrato", "enfasis", "destaca"] },
      ],
      citas: ["Mateo 1:22", "Marcos 10:45", "Marcos 1:1", "Lucas 19:10", "Lucas 1:1-4", "Juan 20:31", "Juan 20:30-31"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Mateo escribió para lectores judíos y destaca que Jesús es el Mesías, el Rey prometido que cumple las Escrituras. Juan escribió para que creamos que Jesús es el Cristo, el Hijo de Dios, y tengamos vida en su nombre (Juan 20:31): por eso cuenta siete señales y los Yo soy. Cada uno pinta un retrato de Jesús para sus lectores.",
    },
    {
      id: "n3-evangelios-hechos-e2",
      tipo: "corta",
      pregunta: "Explica, con los evangelios, por qué Jesús es verdadero Dios y verdadero hombre, y por qué importa.",
      ideas: [
        { id: "hombre", peso: 30, texto: "Verdadero hombre: tuvo hambre, se cansó, lloró y fue tentado.", formas: ["hambre", "cansado", "canso", "lloro", "tentado", "verdadero hombre", "hecho carne"] },
        { id: "dios", peso: 30, texto: "Verdadero Dios: perdonó pecados, dijo Yo soy, es el Verbo que era Dios.", formas: ["perdon*", "yo soy", "verbo era dios", "verdadero dios", "calmo el mar", "adorac*"] },
        { id: "importa", peso: 30, texto: "Por qué importa: como Dios puede salvar y como hombre puede tomar nuestro lugar.", formas: ["salvar", "salvarnos", "nuestro lugar", "compadec*", "importa"] },
      ],
      citas: ["Juan 1:1", "Juan 1:14", "Juan 8:58", "Juan 11:35", "Juan 4:6", "Marcos 2:5", "Marcos 2:5-7", "Hebreos 4:15", "Mateo 16:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús es verdadero hombre: tuvo hambre, se cansó del camino, lloró y fue tentado, pero sin pecado (Hebreos 4:15). Y es verdadero Dios: perdonó pecados, lo que solo Dios hace, y dijo antes que Abraham fuese, yo soy. Importa porque como Dios puede salvarnos y como hombre pudo tomar nuestro lugar.",
    },
    {
      id: "n3-evangelios-hechos-e3",
      tipo: "corta",
      pregunta: "Explica qué decidió el concilio de Jerusalén (Hechos 15) y por qué es importante para la iglesia de hoy.",
      ideas: [
        { id: "problema", peso: 25, texto: "El problema: si los gentiles debían circuncidarse y guardar la ley de Moisés.", formas: ["circuncid*", "ley de moises", "gentiles"] },
        { id: "gracia", peso: 35, texto: "La decisión: la salvación es por la gracia del Señor Jesús.", formas: ["gracia"] },
        { id: "igual", peso: 15, texto: "Igual para judíos y gentiles.", formas: ["igual", "judios y gentiles", "de igual modo"] },
        { id: "hoy", peso: 15, texto: "Por qué importa hoy: no se añaden requisitos humanos y los conflictos se resuelven con la Escritura.", formas: ["hoy", "requisitos", "nada que añadir", "conflicto*", "escritura"] },
      ],
      citas: ["Hechos 15:11", "Hechos 15:1", "Hechos 15:1-11", "Gálatas 2:16", "Efesios 2:8-9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Algunos enseñaban que los gentiles debían circuncidarse y guardar la ley de Moisés para ser salvos. El concilio concluyó que judíos y gentiles somos salvos por la gracia del Señor Jesús, de igual modo (Hechos 15:11). Es importante hoy porque a la salvación no se le añaden requisitos humanos, y la iglesia resuelve sus conflictos con la Escritura.",
    },
    {
      id: "n3-evangelios-hechos-e4",
      tipo: "breve",
      pregunta:
        "Explica la muerte y la resurrección de Jesús según los evangelios: por qué ocupan tanto espacio, qué significan (usa al menos dos de estas ideas: rescate, nuevo pacto, obra consumada, velo rasgado) y qué testigos tiene la resurrección. Termina con una aplicación personal. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "espacio", peso: 10, texto: "Por qué ocupan tanto espacio: son el centro del evangelio.", formas: ["tercio", "espacio", "ultima semana", "centro"] },
        { id: "rescate", peso: 15, texto: "El rescate: dio su vida por muchos.", formas: ["rescate", "dar su vida"] },
        { id: "pacto", peso: 15, texto: "El nuevo pacto en su sangre.", formas: ["nuevo pacto", "copa", "sangre"] },
        { id: "consumado", peso: 15, texto: "La obra consumada y el velo rasgado.", formas: ["consumado", "velo", "presencia de dios", "completa"] },
        { id: "resurreccion", peso: 20, texto: "Los testigos de la resurrección: la tumba vacía y las apariciones.", formas: ["tumba vacia", "sepulcro", "aparecio", "quinientos", "testigos", "cefas"] },
        { id: "comision", peso: 10, texto: "La gran comisión o la ascensión.", formas: ["comision", "naciones", "ascen*", "hacer discipulos"] },
        { id: "aplicacion", peso: 15, texto: "Una aplicación personal.", formas: ["aplic*", "mi vida", "voy a", "cada dia"] },
      ],
      basta: 85,
      citas: ["Marcos 10:45", "Lucas 22:19-20", "Lucas 22:20", "Juan 19:30", "Marcos 15:38", "1 Corintios 15:3-6", "1 Corintios 15:6", "Mateo 28:18-20", "Marcos 8:31", "Isaías 53:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los evangelios dedican casi un tercio de su relato a la última semana de Jesús, porque su muerte y su resurrección son el centro del evangelio. Jesús había anunciado que le era necesario padecer, morir y resucitar (Marcos 8:31). Su muerte fue un rescate: el Hijo del Hombre vino para servir y para dar su vida en rescate por muchos (Marcos 10:45). En la última cena dijo que la copa era el nuevo pacto en su sangre, y en la cruz dijo: Consumado es, porque la obra de salvación estaba completa. El velo del templo se rasgó, y el camino a la presencia de Dios quedó abierto. La resurrección tiene muchos testigos: las mujeres encontraron la tumba vacía, y el Resucitado apareció a Cefas, a los doce y a más de quinientos hermanos a la vez (1 Corintios 15:6). Después envió a sus discípulos a hacer discípulos de todas las naciones. Lo aplico a mi vida así: como Cristo dio su vida por mí, voy a vivir cada día para él y a contarle a mi compañero de trabajo lo que Jesús hizo.",
    },
    {
      id: "n3-evangelios-hechos-e5",
      tipo: "breve",
      pregunta:
        "Describe el avance del evangelio en Hechos siguiendo el plan de Hechos 1:8: menciona al menos un acontecimiento de cada etapa (Jerusalén, Judea y Samaria, y hasta lo último de la tierra) y explica el papel del Espíritu Santo. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "jerusalen", peso: 20, texto: "Un acontecimiento en Jerusalén: Pentecostés, la primera iglesia, Esteban.", formas: ["pentecostes", "tres mil", "primera iglesia", "esteban", "doctrina de los apostoles"] },
        { id: "samaria", peso: 20, texto: "Un acontecimiento en Judea y Samaria: Felipe, Saulo, Cornelio, Antioquía.", formas: ["samaria", "felipe", "damasco", "cornelio", "antioquia", "esparcidos"] },
        { id: "tierra", peso: 20, texto: "Hasta lo último de la tierra: los viajes de Pablo, Europa, Roma.", formas: ["viaje*", "macedonia", "europa", "roma", "filipos", "atenas", "efeso"] },
        { id: "espiritu", peso: 25, texto: "El papel del Espíritu: da poder, guía, envía y abre puertas.", formas: ["poder", "guia", "envi*", "llenos", "abre"] },
        { id: "plan", peso: 15, texto: "El plan del libro en etapas.", formas: ["plan", "etapa*", "testigos", "hasta lo ultimo"] },
      ],
      basta: 85,
      citas: ["Hechos 1:8", "Hechos 2:1-4", "Hechos 2:4", "Hechos 2:41", "Hechos 8:4", "Hechos 10:34", "Hechos 11:26", "Hechos 13:2", "Hechos 16:9", "Hechos 28:31"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hechos sigue el plan que Jesús dio en Hechos 1:8: sus discípulos serían testigos en Jerusalén, en Judea y Samaria, y hasta lo último de la tierra, con el poder del Espíritu Santo. En Jerusalén, el día de Pentecostés, fueron todos llenos del Espíritu Santo (Hechos 2:4), Pedro predicó y se añadieron como tres mil personas; nació la primera iglesia, que perseveraba en la doctrina de los apóstoles. Después de la muerte de Esteban, los creyentes fueron esparcidos y anunciaban el evangelio: Felipe predicó en Samaria, Saulo se convirtió camino a Damasco y Pedro llevó el evangelio a Cornelio, un gentil. Desde Antioquía, el Espíritu envió a Pablo y a Bernabé (Hechos 13:2), y en sus viajes el evangelio llegó a Galacia, a Macedonia y a Europa, hasta Roma, donde Pablo predicaba sin impedimento. En cada etapa, el Espíritu Santo es quien da poder, guía, envía y abre las puertas: por eso la misión avanza aun en medio de la persecución.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-evangelios-hechos-b1",
    tipo: "breve",
    pregunta:
      "Escoge un pasaje de los evangelios o de Hechos (por ejemplo, la confesión de Pedro, una parábola del reino, la cruz, Pentecostés o un viaje de Pablo) y explica qué enseña sobre Jesús o sobre la misión de la iglesia, en qué contexto ocurre y cómo lo aplicarás o lo enseñarás. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "pasaje", peso: 15, texto: "El pasaje escogido.", formas: ["pedro", "parabola", "cruz", "pentecostes", "pablo", "samaritano", "prodigo", "resurreccion", "cornelio", "concilio", "macedonia", "lazaro"] },
      { id: "contexto", peso: 20, texto: "El contexto en que ocurre.", formas: ["contexto", "en ese momento", "situacion", "despues de", "antes de", "cuando"] },
      { id: "jesus", peso: 25, texto: "Lo que enseña sobre Jesús o sobre la misión.", formas: ["cristo", "hijo de dios", "reino", "mision", "mesias"] },
      { id: "ensena", peso: 15, texto: "La enseñanza del pasaje.", formas: ["enseña", "ensena", "muestra", "significa", "aprendo"] },
      { id: "aplicacion", peso: 25, texto: "Cómo lo aplicará o lo enseñará.", formas: ["aplic*", "voy a", "mi vida", "mi grupo", "mi iglesia", "esta semana"] },
    ],
    basta: 85,
    citas: ["Mateo 16:13-17", "Mateo 16:16", "Mateo 16:17", "Mateo 16:21", "Marcos 1:15", "Mateo 13:31-33", "Marcos 10:45", "Juan 19:30", "Hechos 1:8", "Hechos 2:1-4", "Hechos 2:42", "Hechos 15:11", "Hechos 16:9", "Lucas 15:1-7", "Lucas 19:10"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí la confesión de Pedro en Cesarea de Filipo. En ese momento, después de muchos milagros y enseñanzas, Jesús preguntó a sus discípulos quién decía la gente que era él, y luego les preguntó quién decían ellos. Pedro respondió: Tú eres el Cristo, el Hijo del Dios viviente (Mateo 16:16). Jesús le dijo que eso no se lo había revelado carne ni sangre, sino el Padre que está en los cielos (Mateo 16:17). El pasaje enseña que Jesús es el Mesías prometido y el Hijo de Dios, y que conocerlo así es un regalo de Dios, no un logro humano. También muestra que después de esa confesión Jesús empezó a anunciar su cruz (Mateo 16:21): el Cristo vino a dar su vida. Lo voy a aplicar en mi grupo de jóvenes: esta semana voy a enseñar este pasaje y a preguntarles, como Jesús, quién dicen ellos que es él, para que cada uno responda con su propia fe.",
  },
};
