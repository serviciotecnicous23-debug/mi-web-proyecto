/**
 * El banco de «El adorador: carácter y vida» (especialidad Alabanza y adoración). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 un corazón conforme al de Dios · o2 santidad y arrepentimiento · o3 humildad · o4 la vida devocional ·
 * o5 el servicio en equipo y bajo autoridad · o6 la adoración en la prueba y el fruto del Espíritu · o7 el versículo de
 * memoria (Salmos 24:3-4).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `alabanza-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_ALABANZA_2: BancoMateria = {
  materia: "alabanza-2",
  repaso: {
    "alabanza-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué mira Jehová, según 1 Samuel 16:7?", "El corazón", ["La estatura", "La apariencia", "La familia"], "«pero Jehová mira el corazón».", "1 Samuel 16:7"],
      ["1-r2", 1, "o1", "comprender", "¿Qué hizo David cuando el profeta Natán lo confrontó por su pecado?", "Se arrepintió y le pidió a Dios un corazón limpio", ["Se justificó", "Expulsó a Natán", "Lo negó todo"], "«Crea en mí, oh Dios, un corazón limpio».", "Salmos 51:10-12"],
      ["1-r3", 1, "o1", "aplicar", "Un joven canta muy bien, pero no busca a Dios durante la semana. ¿Qué le enseña la lección?", "Que Dios mira primero el corazón, y el talento no reemplaza la vida con Dios", ["Que su voz basta", "Que Dios mira la apariencia", "Que el corazón no importa en la música"], "«Jehová no mira lo que mira el hombre».", "1 Samuel 16:7"],
    ] as P[]).map(p),
    "alabanza-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Quién subirá al monte de Jehová, según Salmos 24:4?", "El limpio de manos y puro de corazón", ["El más fuerte", "El que canta mejor", "El que tiene más años en la iglesia"], "«El limpio de manos y puro de corazón».", "Salmos 24:3-4"],
      ["2-r2", 2, "o2", "comprender", "¿Qué hizo el serafín con los labios de Isaías?", "Los tocó con un carbón del altar, y su culpa fue quitada", ["Los selló para que no hablara", "Los ungió con aceite", "Los cubrió con un velo"], "«es quitada tu culpa, y limpio tu pecado».", "Isaías 6:5-7"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué es la santidad, según la lección?", "Vivir en el camino del arrepentimiento y la obediencia, no ser perfecto", ["No equivocarse nunca", "Apartarse de todos", "Cantar solo himnos"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados».", "1 Juan 1:9"],
    ] as P[]).map(p),
    "alabanza-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué dijo Juan el Bautista de Jesús en Juan 3:30?", "Que era necesario que Jesús creciera y que él menguara", ["Que él debía crecer", "Que los dos debían crecer", "Que Jesús vino a servirle a él"], "«Es necesario que él crezca, pero que yo mengüe».", "Juan 3:30"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué no debemos gloriarnos del talento, según 1 Corintios 4:7?", "Porque es un don que hemos recibido", ["Porque no sirve para nada", "Porque es pecado tenerlo", "Porque otros tienen más"], "«¿o qué tienes que no hayas recibido?».", "1 Corintios 4:7"],
      ["3-r3", 3, "o3", "aplicar", "A un cantante le molesta mucho cuando no lo eligen para cantar. ¿De qué es señal?", "De orgullo: la plataforma se volvió suya", ["De humildad", "De talento", "De madurez"], "«Dios resiste a los soberbios, Y da gracia a los humildes».", "1 Pedro 5:5-6"],
    ] as P[]).map(p),
    "alabanza-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué hizo Jesús muy de mañana, según Marcos 1:35?", "Se fue a un lugar desierto y allí oraba", ["Se quedó durmiendo", "Fue al templo a predicar", "Salió a pescar"], "«salió y se fue a un lugar desierto, y allí oraba».", "Marcos 1:35"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué dijo Jesús que María escogió la buena parte?", "Porque se sentó a sus pies a oír su palabra", ["Porque cocinó mejor que Marta", "Porque se fue de la casa", "Porque no quiso hablar"], "«María ha escogido la buena parte, la cual no le será quitada».", "Lucas 10:39-42"],
      ["4-r3", 4, "o4", "aplicar", "¿Cuál es un buen primer paso para una vida devocional constante?", "Separar un tiempo fijo cada día, aunque sea corto", ["Esperar a tener ganas", "Orar solo en la iglesia", "Leer la Biblia solo cuando hay problemas"], "«De madrugada te buscaré».", "Salmos 63:1"],
    ] as P[]).map(p),
    "alabanza-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Con qué compara Pablo a la iglesia en 1 Corintios 12:12?", "Con un cuerpo de muchos miembros", ["Con un ejército", "Con un edificio sin columnas", "Con un río"], "«así como el cuerpo es uno, y tiene muchos miembros».", "1 Corintios 12:12"],
      ["5-r2", 5, "o5", "comprender", "¿Cómo debemos estimar a los demás, según Filipenses 2:3?", "Como superiores a nosotros mismos", ["Como rivales", "Como inferiores", "Como desconocidos"], "«estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3-4"],
      ["5-r3", 5, "o5", "aplicar", "El director de alabanza no está de acuerdo con una decisión del pastor. ¿Qué hace?", "Lo conversa con respeto y en privado, y sirve bajo su autoridad", ["Lo critica frente al pueblo", "Se lleva al equipo a otra iglesia", "Deja de servir sin decir nada"], "«Obedeced a vuestros pastores, y sujetaos a ellos».", "Hebreos 13:17"],
    ] as P[]).map(p),
    "alabanza-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hacían Pablo y Silas a medianoche en la cárcel?", "Oraban y cantaban himnos a Dios", ["Dormían", "Planeaban escapar", "Se quejaban"], "«orando Pablo y Silas, cantaban himnos a Dios».", "Hechos 16:25"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseña que Job rasgara su manto y adorara?", "Que adorar en el dolor no es fingir que no duele", ["Que Job no sentía nada", "Que la adoración quita el dolor al instante", "Que Job estaba enojado con Dios"], "«se postró en tierra y adoró».", "Job 1:20-21"],
      ["6-r3", 6, "o6", "aplicar", "¿Dónde se ve mejor el fruto del Espíritu en la vida del adorador?", "En la casa, en el trabajo y en el equipo, toda la semana", ["Solo en la plataforma", "En la calidad del sonido", "En la cantidad de canciones"], "«Mas el fruto del Espíritu es amor, gozo, paz».", "Gálatas 5:22-23"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Un corazón conforme al de Dios
    ["f01", 1, "o1", "recordar", "¿En quién se fijó Samuel primero entre los hijos de Isaí?", "En Eliab, el mayor", ["En David", "En Jonatán", "En Saúl"], "«No mires a su parecer, ni a lo grande de su estatura».", "1 Samuel 16:7"],
    ["f02", 1, "o1", "comprender", "¿Por qué no eligió Dios a Eliab?", "Porque Jehová no mira lo que mira el hombre, sino el corazón", ["Porque era muy joven", "Porque no sabía tocar el arpa", "Porque no era de Belén"], "«porque Jehová no mira lo que mira el hombre».", "1 Samuel 16:7"],
    ["f03", 1, "o1", "recordar", "¿Cómo llamó Dios a David, según Hechos 13:22?", "Varón conforme a mi corazón", ["Rey de reyes", "Profeta mayor", "Hombre sin pecado"], "«He hallado a David hijo de Isaí, varón conforme a mi corazón».", "Hechos 13:22"],
    ["f04", 1, "o1", "comprender", "¿Qué destacó Dios de David, según la lección?", "Su corazón", ["Su estatura", "Su riqueza", "Su ejército"], "«varón conforme a mi corazón, quien hará todo lo que yo quiero».", "Hechos 13:22"],
    ["f05", 1, "o1", "analizar", "¿Qué muestra la historia de David sobre el corazón conforme al de Dios?", "Que no es un corazón sin caídas, sino uno que vuelve a Dios con sinceridad", ["Que es un corazón perfecto", "Que Dios no ve el pecado", "Que el talento cubre el pecado"], "«Y renueva un espíritu recto dentro de mí».", "Salmos 51:10-12"],
    ["f06", 1, "o1", "recordar", "¿Qué le pidió David a Dios en Salmos 51:12?", "Que le volviera el gozo de su salvación", ["Que le diera más riquezas", "Que castigara a Natán", "Que le quitara el reino"], "«Vuélveme el gozo de tu salvación».", "Salmos 51:10-12"],
    ["f07", 1, "o1", "comprender", "¿Por qué hay que guardar el corazón, según Proverbios 4:23?", "Porque de él mana la vida", ["Porque es frágil", "Porque es pecado mostrarlo", "Porque así lo manda el rey"], "«Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida».", "Proverbios 4:23"],
    ["f08", 1, "o1", "aplicar", "Un músico pecó y se siente indigno de volver a adorar. ¿Qué le enseña el Salmo 51?", "Que puede arrepentirse de verdad y pedirle a Dios un corazón limpio", ["Que no hay perdón para él", "Que debe esconderlo", "Que basta con tocar mejor"], "«Crea en mí, oh Dios, un corazón limpio».", "Salmos 51:10-12"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estas es una marca del corazón conforme al de Dios, según la lección?", "Busca a Dios en lo secreto y obedece aunque nadie lo vea", ["Busca el aplauso", "Toca mejor que todos", "Nunca reconoce sus faltas"], "«quien hará todo lo que yo quiero».", "Hechos 13:22"],
    ["f10", 1, "o7", "recordar", "Completa Salmos 24:3-4: ¿Quién subirá al monte de Jehová? ¿Y quién estará en su lugar santo?…", "El limpio de manos y puro de corazón", ["El que tiene más dones", "El que canta más fuerte", "El sacerdote de mayor edad"], "«El limpio de manos y puro de corazón; El que no ha elevado su alma a cosas vanas, Ni jurado con engaño».", "Salmos 24:3-4"],
    // Lección 2 · Manos limpias y corazón puro
    ["f11", 2, "o2", "recordar", "¿Qué preguntas hace Salmos 24:3?", "Quién subirá al monte de Jehová y quién estará en su lugar santo", ["Quién es el rey de Israel", "Cuándo se construirá el templo", "Dónde está el arca"], "«¿Quién subirá al monte de Jehová? ¿Y quién estará en su lugar santo?».", "Salmos 24:3-4"],
    ["f12", 2, "o2", "comprender", "¿De qué hablan las manos limpias, según la lección?", "De lo que hacemos", ["De lavarse antes del culto", "De no tocar instrumentos", "De la limpieza del templo"], "«El limpio de manos y puro de corazón».", "Salmos 24:3-4"],
    ["f13", 2, "o2", "comprender", "¿De qué habla el corazón puro, según la lección?", "De lo que pensamos y deseamos", ["De la salud física", "De cantar sin desafinar", "De ir a todos los cultos"], "«puro de corazón».", "Salmos 24:3-4"],
    ["f14", 2, "o2", "recordar", "¿Qué les promete Jesús a los de limpio corazón, según Mateo 5:8?", "Que verán a Dios", ["Que serán ricos", "Que serán famosos", "Que no sufrirán"], "«Bienaventurados los de limpio corazón, porque ellos verán a Dios».", "Mateo 5:8"],
    ["f15", 2, "o2", "recordar", "¿Qué dijo Isaías cuando vio la gloria de Dios?", "¡Ay de mí, que soy muerto!, porque era hombre inmundo de labios", ["Bendito sea el rey Uzías", "Ya soy digno de entrar", "Esto es un sueño"], "«¡Ay de mí! que soy muerto; porque siendo hombre inmundo de labios».", "Isaías 6:5-7"],
    ["f16", 2, "o2", "analizar", "¿Por qué es importante para los que cantan que Dios limpiara los labios de Isaías?", "Porque los que usan la voz para adorar necesitan labios limpiados por Dios", ["Porque Isaías era cantante del templo", "Porque los labios no importan", "Porque así aprendió a cantar"], "«He aquí que esto tocó tus labios».", "Isaías 6:5-7"],
    ["f17", 2, "o2", "recordar", "¿Qué hace Dios si confesamos nuestros pecados, según 1 Juan 1:9?", "Nos perdona y nos limpia de toda maldad", ["Nos castiga primero", "Nos pide más obras", "Nos aparta de la iglesia"], "«él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad».", "1 Juan 1:9"],
    ["f18", 2, "o2", "aplicar", "¿Cuál de estas áreas abarca la santidad del que sirve en la alabanza, según la lección?", "Lo que mira y escucha durante la semana", ["Solo lo que hace el domingo", "Solo la ropa de la plataforma", "Solo las canciones que elige"], "«El limpio de manos y puro de corazón».", "Salmos 24:3-4"],
    ["f19", 2, "o2", "evaluar", "Un miembro del equipo cae en un pecado grave. ¿Qué es lo más sano, según la lección?", "Que se aparte por un tiempo de la plataforma para ser restaurado, acompañado por sus pastores", ["Que siga como si nada", "Que lo expongan delante de todos", "Que lo echen para siempre de la iglesia"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar».", "1 Juan 1:9"],
    ["f20", 2, "o2", "analizar", "¿Qué quiere decir que lo que se hace el sábado se oye el domingo?", "Que la vida de la semana se nota en la adoración pública", ["Que hay que ensayar el sábado", "Que el domingo no importa", "Que el sábado es el día de culto"], "«El que no ha elevado su alma a cosas vanas».", "Salmos 24:3-4"],
    // Lección 3 · Humildad: la gloria es de Dios
    ["f21", 3, "o3", "recordar", "¿Por qué se preocupaban los discípulos de Juan el Bautista, según la lección?", "Porque la gente seguía a Jesús", ["Porque Juan estaba enfermo", "Porque no tenían comida", "Porque el templo cerró"], "«Es necesario que él crezca, pero que yo mengüe».", "Juan 3:30"],
    ["f22", 3, "o3", "comprender", "¿Qué significa para un cantante que Cristo crezca y él mengüe?", "Que la atención se dirija a Cristo y no a él", ["Que cante más bajo", "Que deje de cantar", "Que se esconda detrás del equipo"], "«Es necesario que él crezca».", "Juan 3:30"],
    ["f23", 3, "o3", "recordar", "¿A quiénes resiste Dios, según 1 Pedro 5:5?", "A los soberbios", ["A los jóvenes", "A los músicos", "A los humildes"], "«Dios resiste a los soberbios, Y da gracia a los humildes».", "1 Pedro 5:5-6"],
    ["f24", 3, "o3", "comprender", "¿Qué promete 1 Pedro 5:6 a los que se humillan bajo la mano de Dios?", "Que él los exaltará cuando fuere tiempo", ["Que serán famosos pronto", "Que nunca sufrirán", "Que tendrán siempre el micrófono"], "«para que él os exalte cuando fuere tiempo».", "1 Pedro 5:5-6"],
    ["f25", 3, "o3", "recordar", "¿Contra qué advirtió Jesús en Mateo 6:1?", "Contra hacer nuestra justicia delante de los hombres para ser vistos", ["Contra cantar en el templo", "Contra dar ofrendas", "Contra orar en grupo"], "«Guardaos de hacer vuestra justicia delante de los hombres, para ser vistos de ellos».", "Mateo 6:1"],
    ["f26", 3, "o3", "recordar", "¿Cómo danzaba David delante de Jehová, según 2 Samuel 6:14?", "Con toda su fuerza", ["En secreto", "Con vergüenza", "Solo delante de sus siervos"], "«Y David danzaba con toda su fuerza delante de Jehová».", "2 Samuel 6:14"],
    ["f27", 3, "o3", "analizar", "¿Qué muestra la respuesta de David a Mical?", "Que adoraba para Dios y no para cuidar su imagen", ["Que estaba enojado con Dios", "Que quería impresionar a las criadas", "Que no le importaba el arca"], "«Fue delante de Jehová».", "2 Samuel 6:21-22"],
    ["f28", 3, "o3", "evaluar", "¿Cuál de estas actitudes es una señal de humildad en el equipo?", "Alegrarse del don de otros y aceptar corrección", ["Querer siempre el micrófono", "Criticar a los demás", "Molestarse si no lo eligen"], "«Dios resiste a los soberbios, Y da gracia a los humildes».", "1 Pedro 5:5-6"],
    ["f29", 3, "o3", "aplicar", "Al terminar el culto, muchos felicitan a la cantante. ¿Qué haría una adoradora humilde?", "Agradecer con sencillez y darle la gloria a Dios", ["Pedir más felicitaciones", "Compararse con otros", "Pensar que el culto fue gracias a ella"], "«¿o qué tienes que no hayas recibido?».", "1 Corintios 4:7"],
    ["f30", 3, "o3", "comprender", "¿Por qué la plataforma puede ser un lugar peligroso, según la lección?", "Porque el orgullo crece fácil donde hay luces, micrófonos y aplausos", ["Porque alguien se puede caer", "Porque hace calor", "Porque está lejos del pueblo"], "«Guardaos de hacer vuestra justicia delante de los hombres».", "Mateo 6:1"],
    // Lección 4 · La vida devocional del adorador
    ["f31", 4, "o4", "recordar", "¿Cuándo se levantó Jesús a orar, según Marcos 1:35?", "Muy de mañana, siendo aún muy oscuro", ["A mediodía", "Tarde en la noche", "Después de comer"], "«Levantándose muy de mañana, siendo aún muy oscuro».", "Marcos 1:35"],
    ["f32", 4, "o4", "comprender", "¿Qué enseña que Jesús buscara al Padre a solas después de un día lleno de gente?", "Que el servicio no reemplaza el encuentro personal con Dios", ["Que Jesús estaba cansado de la gente", "Que no le gustaba enseñar", "Que solo se ora en la mañana"], "«allí oraba».", "Marcos 1:35"],
    ["f33", 4, "o4", "recordar", "¿De qué dice David en Salmos 63:1 que tiene sed su alma?", "De Dios", ["De fama", "De venganza", "De riquezas"], "«Mi alma tiene sed de ti».", "Salmos 63:1"],
    ["f34", 4, "o4", "recordar", "¿Dónde está la delicia del bienaventurado, según Salmos 1:2?", "En la ley de Jehová", ["En la música", "En las riquezas", "En la fama"], "«en la ley de Jehová está su delicia».", "Salmos 1:2"],
    ["f35", 4, "o4", "comprender", "¿Qué relación hay entre la Palabra y lo que cantamos, según la lección?", "La Palabra alimenta lo que después cantamos", ["No tienen relación", "La música reemplaza la lectura", "Primero se canta y nunca se lee"], "«Y en su ley medita de día y de noche».", "Salmos 1:2"],
    ["f36", 4, "o4", "recordar", "¿Qué hacía Marta mientras María oía a Jesús?", "Se preocupaba con muchos quehaceres", ["Dormía", "Cantaba", "Lloraba"], "«Pero Marta se preocupaba con muchos quehaceres».", "Lucas 10:39-42"],
    ["f37", 4, "o4", "analizar", "¿Cuál es el riesgo de Marta para los que sirven en la alabanza?", "Estar tan ocupados sirviendo que se olvidan de estar con el Señor", ["Servir demasiado poco", "Cantar demasiado alto", "Llegar tarde a los ensayos"], "«Marta, Marta, afanada y turbada estás con muchas cosas».", "Lucas 10:39-42"],
    ["f38", 4, "o4", "aplicar", "¿Cuál de estas prácticas forma parte de un plan devocional, según la lección?", "Cantarle a Dios a solas, sin público", ["Escuchar música solo en el carro", "Orar solo cuando hay problemas", "Leer la Biblia una vez al año"], "«De madrugada te buscaré».", "Salmos 63:1"],
    ["f39", 4, "o4", "evaluar", "¿Qué le pasa a un adorador sin vida devocional, según la lección?", "Termina cantando de memoria lo que ya no vive", ["Canta mejor", "Tiene más tiempo para ensayar", "No le pasa nada"], "«sólo una cosa es necesaria».", "Lucas 10:39-42"],
    ["f40", 4, "o4", "aplicar", "Una hermana quiere empezar una vida devocional. ¿Qué plan es el más adecuado?", "Quince minutos cada mañana, con un plan de lectura, una oración con un salmo y un cuaderno", ["Leer diez capítulos solo los domingos", "Esperar a sentir el deseo", "Orar solo en el culto"], "«De madrugada te buscaré».", "Salmos 63:1"],
    // Lección 5 · Servir en equipo y bajo autoridad
    ["f41", 5, "o5", "recordar", "¿Cómo colocó Dios los miembros en el cuerpo, según 1 Corintios 12:18?", "Cada uno como él quiso", ["Por orden de llegada", "Según su talento", "Por votación"], "«Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso».", "1 Corintios 12:18"],
    ["f42", 5, "o5", "comprender", "¿Qué enseña 1 Corintios 12 sobre los técnicos, los cantantes y los músicos del equipo?", "Que todos son necesarios y ninguno es de segunda", ["Que los cantantes son más importantes", "Que los técnicos sobran", "Que cada uno puede servir solo"], "«todos los miembros del cuerpo, siendo muchos, son un solo cuerpo».", "1 Corintios 12:12"],
    ["f43", 5, "o5", "recordar", "¿Qué prohíbe Filipenses 2:3?", "Hacer las cosas por contienda o por vanagloria", ["Cantar en grupo", "Tocar instrumentos", "Servir en la iglesia"], "«Nada hagáis por contienda o por vanagloria».", "Filipenses 2:3-4"],
    ["f44", 5, "o5", "comprender", "¿Qué pide Filipenses 2:4?", "No mirar cada uno por lo suyo propio, sino también por lo de los otros", ["Cuidar solo lo propio", "Competir por los primeros lugares", "Apartarse del equipo"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:3-4"],
    ["f45", 5, "o5", "recordar", "¿Cómo debemos tratarnos en cuanto a honra, según Romanos 12:10?", "Prefiriéndonos los unos a los otros", ["Buscando cada uno la suya", "Ignorándonos", "Compitiendo"], "«en cuanto a honra, prefiriéndoos los unos a los otros».", "Romanos 12:10"],
    ["f46", 5, "o5", "recordar", "¿Por qué debemos obedecer a los pastores, según Hebreos 13:17?", "Porque velan por nuestras almas y darán cuenta", ["Porque son perfectos", "Porque saben más música", "Porque así lo manda la costumbre"], "«porque ellos velan por vuestras almas, como quienes han de dar cuenta».", "Hebreos 13:17"],
    ["f47", 5, "o5", "comprender", "¿Qué lugar tiene el ministerio de alabanza en la iglesia, según la lección?", "Es parte de la iglesia y sirve bajo la dirección de sus pastores", ["Es un grupo aparte con sus propias reglas", "Está por encima de los pastores", "Solo responde a los músicos"], "«Obedeced a vuestros pastores, y sujetaos a ellos».", "Hebreos 13:17"],
    ["f48", 5, "o5", "aplicar", "Dos músicos del equipo tienen un conflicto. ¿Qué hacen, según la lección?", "Lo conversan a solas, como enseñó Jesús", ["Lo comentan con todo el equipo", "Lo publican en las redes", "Dejan de hablarse"], "«Amaos los unos a los otros con amor fraternal».", "Romanos 12:10"],
    ["f49", 5, "o5", "analizar", "¿Por qué se dice que la música en equipo es dejar espacio?", "Porque escuchar a los demás y no tocar todo el tiempo hace que la canción suene unida", ["Porque hay que tocar más fuerte que los demás", "Porque cada uno toca su canción", "Porque el silencio es malo"], "«no mirando cada uno por lo suyo propio».", "Filipenses 2:3-4"],
    ["f50", 5, "o5", "evaluar", "¿Cuál de estos miembros sirve como enseña la lección?", "El que llega preparado, escucha a los demás y se alegra cuando otro brilla", ["El que llega tarde porque toca bien", "El que siempre quiere el solo", "El que critica al director frente a todos"], "«estimando cada uno a los demás como superiores a él mismo».", "Filipenses 2:3-4"],
    // Lección 6 · El adorador en la prueba y en la vida diaria
    ["f51", 6, "o6", "recordar", "¿Qué dijo Job después de perderlo todo?", "Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito", ["Dios me abandonó", "Ya no adoraré más", "Esto es injusto"], "«Jehová dio, y Jehová quitó; sea el nombre de Jehová bendito».", "Job 1:20-21"],
    ["f52", 6, "o6", "comprender", "¿Qué hacían los presos mientras Pablo y Silas cantaban?", "Los oían", ["Se fueron de la cárcel", "Los mandaron callar", "Se durmieron"], "«y los presos los oían».", "Hechos 16:25"],
    ["f53", 6, "o6", "analizar", "¿Qué enseña que los presos oyeran a Pablo y Silas?", "Que la adoración en la prueba también es un testimonio para otros", ["Que hay que cantar fuerte", "Que la cárcel tenía buena acústica", "Que los presos eran creyentes"], "«cantaban himnos a Dios; y los presos los oían».", "Hechos 16:25"],
    ["f54", 6, "o6", "recordar", "¿Qué declaró Habacuc en medio de la escasez?", "Que con todo se alegraría en Jehová", ["Que se iría a otra tierra", "Que Dios lo había olvidado", "Que esperaría a tener cosecha"], "«Con todo, yo me alegraré en Jehová, Y me gozaré en el Dios de mi salvación».", "Habacuc 3:18"],
    ["f55", 6, "o6", "comprender", "¿De qué dependía el gozo de Habacuc?", "De Dios, no de las circunstancias", ["De la cosecha", "Del ganado", "Del clima"], "«Y me gozaré en el Dios de mi salvación».", "Habacuc 3:18"],
    ["f56", 6, "o6", "recordar", "¿Cuándo pide Filipenses 4:4 que nos regocijemos en el Señor?", "Siempre", ["Solo cuando todo va bien", "Los domingos", "Una vez al año"], "«Regocijaos en el Señor siempre».", "Filipenses 4:4"],
    ["f57", 6, "o6", "comprender", "¿Desde dónde escribió Pablo la carta a los Filipenses, según la lección?", "Desde la cárcel", ["Desde un palacio", "Desde el templo de Jerusalén", "Desde un barco"], "«Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!».", "Filipenses 4:4"],
    ["f58", 6, "o6", "recordar", "¿Cuál de estos forma parte del fruto del Espíritu, según Gálatas 5:22-23?", "La paciencia", ["La fama", "El talento", "La riqueza"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia».", "Gálatas 5:22-23"],
    ["f59", 6, "o6", "evaluar", "¿Cuál de estas frases describe la adoración sincera en el dolor?", "Cantar la verdad de Dios cuando todavía no la sentimos", ["Fingir alegría delante de todos", "Esconder siempre las lágrimas", "Dejar de ir a la iglesia"], "«se postró en tierra y adoró».", "Job 1:20-21"],
    ["f60", 6, "o6", "aplicar", "Una hermana del coro perdió su trabajo. ¿Cómo puede adorar en esa prueba, según la lección?", "Llevándole a Dios su dolor con sinceridad y recordando lo que él prometió", ["Fingiendo que no le importa", "Dejando de cantar hasta que todo pase", "Culpando a Dios delante de todos"], "«Con todo, yo me alegraré en Jehová».", "Habacuc 3:18"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hacía David cuando Samuel fue a ungir a un hijo de Isaí?", "Cuidaba las ovejas", ["Servía en el palacio", "Cuidaba el arca", "Peleaba contra los filisteos"], "Era el menor de los hijos de Isaí, y Dios lo eligió: «Jehová mira el corazón».", "1 Samuel 16:7"],
      ["m1-02", 1, "o1", "comprender", "¿Qué hará el varón conforme al corazón de Dios, según Hechos 13:22?", "Todo lo que Dios quiere", ["Todo lo que él quiere", "Lo que el pueblo pida", "Lo que le convenga"], "«quien hará todo lo que yo quiero».", "Hechos 13:22"],
      ["m1-03", 1, "o1", "recordar", "¿Qué le pide David a Dios en Salmos 51:11?", "Que no lo eche de delante de él ni le quite su santo Espíritu", ["Que le dé un ejército", "Que le quite el trono", "Que lo deje solo"], "«No me eches de delante de ti, Y no quites de mí tu santo Espíritu».", "Salmos 51:10-12"],
      ["m1-04", 1, "o1", "aplicar", "¿Qué significa guardar el corazón para un músico, según la lección?", "Cuidar, por encima de todo, lo que deja entrar y su relación con Dios", ["Cuidar solo su voz", "No mostrar emociones", "No hablar con nadie"], "«Sobre toda cosa guardada, guarda tu corazón».", "Proverbios 4:23"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué Dios eligió a David y no al que parecía mejor?", "Porque mira el corazón y no la apariencia", ["Porque David era el más alto", "Porque David era el mayor", "Porque así lo pidió Isaí"], "«porque Jehová no mira lo que mira el hombre».", "1 Samuel 16:7"],
      ["m1-06", 1, "o7", "recordar", "¿Dónde está el versículo de memoria de esta materia?", "Salmos 24:3-4", ["Salmos 51:10", "Juan 3:30", "Mateo 5:8"], "«¿Quién subirá al monte de Jehová?».", "Salmos 24:3-4"],
      ["m1-07", 2, "o2", "recordar", "Según Salmos 24:4, ¿qué no ha hecho el que estará en el lugar santo?", "Elevar su alma a cosas vanas ni jurar con engaño", ["Cantar en público", "Tocar el arpa", "Ofrecer sacrificios"], "«El que no ha elevado su alma a cosas vanas, Ni jurado con engaño».", "Salmos 24:3-4"],
      ["m1-08", 2, "o2", "comprender", "¿Qué hizo Isaías después de que Dios limpió sus labios, según la lección?", "Respondió al llamado de Dios", ["Se fue del templo", "Dejó de profetizar", "Se escondió"], "«es quitada tu culpa, y limpio tu pecado».", "Isaías 6:5-7"],
      ["m1-09", 2, "o2", "recordar", "¿Con qué tocó el serafín los labios de Isaías?", "Con un carbón encendido tomado del altar", ["Con aceite", "Con agua del río", "Con una espada"], "«teniendo en su mano un carbón encendido, tomado del altar con unas tenazas».", "Isaías 6:5-7"],
      ["m1-10", 2, "o2", "aplicar", "¿Cómo se aplica la santidad a las redes sociales, según la lección?", "Cuidando la manera de hablar también en las redes", ["No importa lo que se publique", "Publicando solo música", "Usando un nombre falso"], "«El limpio de manos y puro de corazón».", "Salmos 24:3-4"],
      ["m1-11", 2, "o2", "evaluar", "¿Qué diferencia hay entre la santidad y la perfección, según la lección?", "La santidad es un camino de arrepentimiento y obediencia; nadie es perfecto", ["Son lo mismo", "La santidad es solo para los pastores", "La perfección es más fácil"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar».", "1 Juan 1:9"],
      ["m1-12", 2, "o2", "comprender", "¿Qué dice de la vida del adorador que no haya «jurado con engaño»?", "Que es honesto en lo que dice y promete", ["Que no debe hablar nunca", "Que no puede hacer promesas", "Que solo jura en el templo"], "«Ni jurado con engaño».", "Salmos 24:3-4"],
      ["m1-13", 3, "o3", "recordar", "¿Qué preguntó Pablo en 1 Corintios 4:7?", "Qué tenemos que no hayamos recibido", ["Quién es el mejor cantante", "Cuándo vendrá el Señor", "Dónde está el templo"], "«¿o qué tienes que no hayas recibido?».", "1 Corintios 4:7"],
      ["m1-14", 3, "o3", "comprender", "¿A quiénes da gracia Dios, según 1 Pedro 5:5?", "A los humildes", ["A los soberbios", "A los famosos", "A los ricos"], "«Y da gracia a los humildes».", "1 Pedro 5:5-6"],
      ["m1-15", 3, "o3", "recordar", "¿Qué le respondió David a Mical?", "Que había danzado delante de Jehová, y que aun se haría más vil", ["Que no volvería a danzar", "Que lo hizo para el pueblo", "Que estaba arrepentido de danzar"], "«Y aun me haré más vil que esta vez».", "2 Samuel 6:21-22"],
      ["m1-16", 3, "o3", "aplicar", "¿Qué hace un músico humilde cuando el director le corrige una parte?", "Acepta la corrección y mejora", ["Se ofende y deja de tocar", "Discute frente a todos", "Toca a su manera"], "«Humillaos, pues, bajo la poderosa mano de Dios».", "1 Pedro 5:5-6"],
      ["m1-17", 3, "o3", "analizar", "¿Qué tienen en común Juan el Bautista y David en esta lección?", "Los dos buscaban la gloria de Dios y no la propia", ["Los dos eran reyes", "Los dos eran músicos de la corte", "Los dos querían ser vistos"], "«Es necesario que él crezca, pero que yo mengüe».", "Juan 3:30"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas es una señal de orgullo en el ministerio?", "No aceptar corrección y querer siempre el micrófono", ["Servir donde haga falta", "Alegrarse del don de otros", "Darle la gloria a Dios"], "«Dios resiste a los soberbios».", "1 Pedro 5:5-6"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Adónde fue Jesús a orar, según Marcos 1:35?", "A un lugar desierto", ["Al templo", "A la sinagoga", "A casa de Pedro"], "«salió y se fue a un lugar desierto, y allí oraba».", "Marcos 1:35"],
      ["m2-02", 4, "o4", "comprender", "¿Dónde estaba David cuando escribió el Salmo 63, según la lección?", "En el desierto", ["En el palacio", "En el templo", "En la cárcel"], "«En tierra seca y árida donde no hay aguas».", "Salmos 63:1"],
      ["m2-03", 4, "o4", "recordar", "¿Cuándo medita en la ley de Jehová el bienaventurado?", "De día y de noche", ["Solo en las fiestas", "Una vez por semana", "Cuando tiene problemas"], "«Y en su ley medita de día y de noche».", "Salmos 1:2"],
      ["m2-04", 4, "o4", "recordar", "¿Cuántas cosas dijo Jesús que eran necesarias, en Lucas 10:42?", "Solo una", ["Muchas", "Tres", "Ninguna"], "«Pero sólo una cosa es necesaria».", "Lucas 10:39-42"],
      ["m2-05", 4, "o4", "aplicar", "Un líder de alabanza pasa la semana organizando y ensayando, pero ya no ora a solas. ¿Qué le aconsejarías?", "Que escoja la buena parte, como María, y separe un tiempo diario con el Señor", ["Que ensaye más", "Que deje el ministerio", "Que ore solo en los cultos"], "«María ha escogido la buena parte».", "Lucas 10:39-42"],
      ["m2-06", 4, "o4", "analizar", "¿Por qué se dice que lo que se ve en la plataforma nace de lo secreto?", "Porque la adoración pública nace de la vida personal con Dios", ["Porque los ensayos son secretos", "Porque no hay que mostrar nada", "Porque lo secreto es mejor que el culto"], "«Mi alma tiene sed de ti».", "Salmos 63:1"],
      ["m2-07", 5, "o5", "recordar", "Según 1 Corintios 12:12, ¿qué son todos los miembros, siendo muchos?", "Un solo cuerpo", ["Muchos cuerpos", "Un ejército", "Una familia sin cabeza"], "«siendo muchos, son un solo cuerpo».", "1 Corintios 12:12"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué no hay miembros de primera y de segunda en el equipo?", "Porque Dios colocó a cada uno en el cuerpo como él quiso", ["Porque todos tocan igual", "Porque nadie es necesario", "Porque el director decide al azar"], "«Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso».", "1 Corintios 12:18"],
      ["m2-09", 5, "o5", "recordar", "¿Con qué amor pide Romanos 12:10 que nos amemos?", "Con amor fraternal", ["Con amor de lejos", "Solo con palabras", "Con condiciones"], "«Amaos los unos a los otros con amor fraternal».", "Romanos 12:10"],
      ["m2-10", 5, "o5", "comprender", "¿Para qué pide Hebreos 13:17 que nos sujetemos a los pastores?", "Para que hagan su trabajo con alegría y no quejándose", ["Para que no trabajen", "Para que sean famosos", "Para que manden sin escuchar"], "«para que lo hagan con alegría, y no quejándose».", "Hebreos 13:17"],
      ["m2-11", 5, "o5", "aplicar", "¿Qué hace un buen miembro del equipo antes del ensayo?", "Llega a tiempo y preparado", ["Llega cuando quiere", "Aprende la canción en el momento", "Espera que otro la prepare"], "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros».", "Filipenses 2:3-4"],
      ["m2-12", 5, "o5", "evaluar", "El bajista sugiere una idea en el ensayo y el director decide otra cosa. ¿Qué actitud agrada a Dios?", "Aceptar la decisión con buena voluntad, sin contienda", ["Tocar su idea igual", "Quejarse con el pastor de inmediato", "Irse del ensayo"], "«Nada hagáis por contienda o por vanagloria».", "Filipenses 2:3-4"],
      ["m2-13", 6, "o6", "recordar", "¿Qué hizo Job después de rasgar su manto?", "Se postró en tierra y adoró", ["Maldijo a Dios", "Se fue de su casa", "Culpó a sus amigos"], "«se postró en tierra y adoró».", "Job 1:20-21"],
      ["m2-14", 6, "o6", "recordar", "¿A qué hora cantaban Pablo y Silas en la cárcel?", "A medianoche", ["Al amanecer", "A mediodía", "Al atardecer"], "«Pero a medianoche, orando Pablo y Silas, cantaban himnos a Dios».", "Hechos 16:25"],
      ["m2-15", 6, "o6", "comprender", "¿En quién dice Habacuc que se gozará?", "En el Dios de su salvación", ["En su cosecha", "En su ganado", "En el rey"], "«Y me gozaré en el Dios de mi salvación».", "Habacuc 3:18"],
      ["m2-16", 6, "o6", "comprender", "¿Qué hace el gozo cristiano con el dolor, según la lección?", "No lo niega: confía en el Señor dentro de él", ["Lo niega siempre", "Lo esconde", "Lo prohíbe"], "«Regocijaos en el Señor siempre».", "Filipenses 4:4"],
      ["m2-17", 6, "o6", "recordar", "¿Cuáles son los tres primeros aspectos del fruto del Espíritu en Gálatas 5:22?", "Amor, gozo y paz", ["Fe, esperanza y caridad", "Poder, fama y riqueza", "Templanza, ayuno y oración"], "«Mas el fruto del Espíritu es amor, gozo, paz».", "Gálatas 5:22-23"],
      ["m2-18", 6, "o6", "analizar", "¿Por qué el fruto del Espíritu dice más que la mejor canción?", "Porque muestra en la vida diaria lo que cantamos el domingo", ["Porque las canciones no importan", "Porque el fruto se canta mejor", "Porque Dios no escucha la música"], "«contra tales cosas no hay ley».", "Gálatas 5:22-23"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "alabanza-2-e1",
      tipo: "corta",
      pregunta: "Explica, con el ejemplo de David, qué es un corazón conforme al de Dios.",
      ideas: [
        { id: "corazon", peso: 25, texto: "Dios mira el corazón, no la apariencia ni el talento.", formas: ["mira el corazon", "no mira lo que mira", "la apariencia", "su apariencia"], negativa: true },
        { id: "obedece", peso: 20, texto: "Busca a Dios y le obedece.", formas: ["obedec*", "todo lo que yo quiero", "busca a dios", "buscaba a dios"] },
        { id: "arrepiente", peso: 25, texto: "Cuando peca, se arrepiente de verdad.", formas: ["arrepent*", "corazon limpio", "vuelve a dios", "volvio a dios", "confeso"] },
        { id: "no_perfecto", peso: 20, texto: "No es un corazón sin caídas.", formas: ["no fue perfecto", "no es perfecto", "sin caidas", "peco", "cayo"], negativa: true },
      ],
      citas: ["1 Samuel 16:7", "Hechos 13:22", "Salmos 51:10", "Salmos 51:10-12", "Proverbios 4:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios mira el corazón, no la apariencia ni el talento (1 Samuel 16:7). David fue un varón conforme al corazón de Dios porque lo buscaba y le obedecía. No fue perfecto: pecó, pero se arrepintió de verdad y le pidió a Dios un corazón limpio.",
    },
    {
      id: "alabanza-2-e2",
      tipo: "corta",
      pregunta: "Explica qué significa tener manos limpias y corazón puro, y qué hace Dios con el adorador que confiesa su pecado.",
      ideas: [
        { id: "manos", peso: 25, texto: "Las manos limpias: lo que hacemos.", formas: ["lo que hacemos", "lo que hago", "nuestras acciones", "nuestros actos"] },
        { id: "corazon", peso: 25, texto: "El corazón puro: lo que pensamos y deseamos.", formas: ["lo que pensamos", "pensamientos", "deseos", "lo que deseamos", "intenciones"] },
        { id: "perdon", peso: 25, texto: "Si confesamos, Dios perdona y limpia.", formas: ["perdona*", "perdonar*", "limpiarnos", "nos limpia", "confesamos"] },
        { id: "camino", peso: 15, texto: "La santidad es un camino de arrepentimiento, no perfección.", formas: ["arrepent*", "obedien*", "nadie es perfecto", "no es perfeccion"], negativa: true },
      ],
      citas: ["Salmos 24:3-4", "Salmos 24:4", "1 Juan 1:9", "Isaías 6:5-7", "Isaías 6:7", "Mateo 5:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Las manos limpias hablan de lo que hacemos, y el corazón puro, de lo que pensamos y deseamos (Salmos 24:4). Nadie es perfecto: la santidad es un camino de arrepentimiento y obediencia. Si confesamos nuestros pecados, Dios es fiel para perdonarnos y limpiarnos, como limpió los labios de Isaías.",
    },
    {
      id: "alabanza-2-e3",
      tipo: "corta",
      pregunta: "Explica por qué la humildad es necesaria en el ministerio de alabanza.",
      ideas: [
        { id: "crezca", peso: 25, texto: "Cristo debe crecer y yo menguar: la gloria es de Dios.", formas: ["el crezca", "mengue", "la gloria es de dios", "gloria a dios"] },
        { id: "don", peso: 25, texto: "El talento es un don recibido.", formas: ["recibimos", "recibido", "un don", "un regalo", "don de dios"] },
        { id: "resiste", peso: 20, texto: "Dios resiste a los soberbios y da gracia a los humildes.", formas: ["resiste a los soberbios", "soberbi*", "gracia a los humildes", "orgullo"] },
        { id: "vistos", peso: 20, texto: "No servir para ser vistos ni por el aplauso.", formas: ["ser vistos", "aplauso", "aprobacion de la gente", "la plataforma"] },
      ],
      citas: ["Juan 3:30", "1 Corintios 4:7", "1 Pedro 5:5", "1 Pedro 5:5-6", "Mateo 6:1", "2 Samuel 6:21-22"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Es necesario que Cristo crezca y que yo mengüe (Juan 3:30): la gloria es de Dios. El talento es un don que recibimos, no un mérito. Dios resiste a los soberbios y da gracia a los humildes, y Jesús advirtió contra hacer las cosas para ser vistos, aunque haya aplauso.",
    },
    {
      id: "alabanza-2-e4",
      tipo: "breve",
      pregunta:
        "Un joven del equipo dice que no tiene tiempo para orar ni para leer la Biblia porque ensaya mucho. Escríbele un consejo, con la Biblia, sobre la vida devocional del adorador, con un plan sencillo.",
      ideas: [
        { id: "jesus", peso: 20, texto: "Jesús buscaba al Padre a solas, muy de mañana.", formas: ["muy de manana", "lugar desierto", "jesus oraba", "a solas con el padre"] },
        { id: "maria", peso: 25, texto: "Como María, escoger la buena parte: el servicio no reemplaza el encuentro con Dios.", formas: ["buena parte", "a los pies de jesus", "una cosa es necesaria", "no reemplaza", "marta"] },
        { id: "palabra", peso: 15, texto: "La Palabra alimenta lo que cantamos.", formas: ["medita", "su ley", "la palabra alimenta", "alimenta lo que"] },
        { id: "plan", peso: 25, texto: "Un plan sencillo: tiempo fijo, lectura, oración, cantar a solas y un cuaderno.", formas: ["tiempo fijo", "cada manana", "cada dia", "plan de lectura", "cuaderno", "minutos"] },
        { id: "raiz", peso: 15, texto: "Lo público nace de lo secreto.", formas: ["lo secreto", "en secreto", "nace de", "de memoria"] },
      ],
      basta: 85,
      citas: ["Marcos 1:35", "Salmos 63:1", "Salmos 1:2", "Lucas 10:39-42", "Lucas 10:42"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano: entiendo que ensayas mucho, pero el servicio no reemplaza el encuentro con Dios. Jesús, después de un día lleno de gente, se levantó muy de mañana y se fue a un lugar desierto a orar (Marcos 1:35). Marta estaba ocupada sirviendo, pero María escogió la buena parte: sentarse a los pies de Jesús, porque una cosa es necesaria. Además, la Palabra alimenta lo que después cantamos, y el bienaventurado medita en ella de día y de noche. Te propongo un plan sencillo: quince minutos cada mañana, antes de mirar el celular, con un plan de lectura de la Biblia, una oración con un salmo y un cuaderno para anotar lo que Dios te enseña. Una vez por semana, cántale a Dios a solas. Recuerda que lo que se ve en la plataforma nace de lo secreto.",
    },
    {
      id: "alabanza-2-e5",
      tipo: "breve",
      pregunta: "Describe, con base en la Biblia, cómo debe servir un miembro del equipo de alabanza con sus compañeros y con sus pastores.",
      ideas: [
        { id: "cuerpo", peso: 25, texto: "El equipo es un cuerpo: todos necesarios, cada uno en el lugar que Dios le dio.", formas: ["un solo cuerpo", "un cuerpo", "muchos miembros", "como el quiso", "todos son necesarios"] },
        { id: "humildad", peso: 25, texto: "Sin contienda ni vanagloria, estimando a los demás como superiores.", formas: ["contienda", "vanagloria", "superiores", "prefier*", "con humildad"] },
        { id: "autoridad", peso: 25, texto: "Bajo la autoridad de los pastores, que velan por las almas.", formas: ["sus pastores", "los pastores", "sujet*", "autoridad", "velan por"] },
        { id: "practica", peso: 15, texto: "Llega preparado, escucha a los demás y no compite.", formas: ["preparado", "a tiempo", "escucha a los demas", "no compite", "dejar espacio"] },
        { id: "conflicto", peso: 10, texto: "Resuelve los conflictos hablando a solas.", formas: ["a solas", "en privado", "conflicto", "desacuerdo"] },
      ],
      basta: 85,
      citas: ["1 Corintios 12:12", "1 Corintios 12:18", "Filipenses 2:3-4", "Filipenses 2:3", "Romanos 12:10", "Hebreos 13:17", "Mateo 18:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Un miembro del equipo de alabanza sabe que es parte de un cuerpo: hay muchos miembros, pero un solo cuerpo, y Dios colocó a cada uno como él quiso (1 Corintios 12:18). Por eso no hay músicos de primera y de segunda: los cantantes, los músicos y los técnicos son todos necesarios. Sirve sin contienda ni vanagloria, estimando a los demás como superiores a él mismo (Filipenses 2:3), y en cuanto a honra prefiere a los otros. En la práctica, llega a tiempo y preparado, escucha a los demás al tocar y no compite por el solo. El ministerio es parte de la iglesia, así que sirve bajo la autoridad de sus pastores, que velan por las almas (Hebreos 13:17). Si tiene un desacuerdo o un conflicto, lo conversa con respeto y a solas, nunca frente al pueblo.",
    },
  ],
  breve: {
    id: "alabanza-2-b1",
    tipo: "breve",
    pregunta:
      "Haz un examen de tu vida como adorador con lo que aprendiste en esta materia: tu corazón, tu santidad, tu humildad, tu vida devocional y tu servicio en equipo. Escribe en qué estás bien, qué necesitas cambiar y un compromiso concreto, con citas bíblicas.",
    ideas: [
      { id: "corazon", peso: 20, texto: "Examina su corazón.", formas: ["mi corazon", "corazon limpio", "guardar mi corazon", "conoce mi corazon"] },
      { id: "santidad", peso: 20, texto: "Examina su santidad.", formas: ["santidad", "manos limpias", "pureza", "lo que miro", "corazon puro"] },
      { id: "humildad", peso: 20, texto: "Examina su humildad.", formas: ["humildad", "humilde", "orgullo", "aplauso", "mengue"] },
      { id: "devocional", peso: 20, texto: "Examina su vida devocional.", formas: ["devocional", "a solas", "leer la biblia", "tiempo con dios", "oro solo", "orar cada"] },
      { id: "compromiso", peso: 20, texto: "Hace un compromiso concreto.", formas: ["me comprometo", "mi compromiso", "voy a (orar|leer|buscar|llegar|cambiar|apagar|servir|pedir|dejar|cuidar)", "esta semana", "cada manana"] },
    ],
    basta: 85,
    citas: ["Salmos 24:3-4", "Salmos 24:4", "1 Samuel 16:7", "Salmos 51:10", "Juan 3:30", "Marcos 1:35", "Lucas 10:42", "Filipenses 2:3", "Salmos 139:23-24", "Salmos 139:23", "Proverbios 4:23", "1 Juan 1:9"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Al examinar mi vida como adorador, le pido a Dios lo que pedía el salmista: que me examine y conozca mi corazón (Salmos 139:23). En mi corazón veo que amo servir, pero a veces busco el aplauso más que a Dios; necesito recordar que es necesario que él crezca y que yo mengüe (Juan 3:30). En la santidad estoy bien en mi honestidad, pero debo cuidar lo que miro en el celular, porque Dios pide manos limpias y corazón puro (Salmos 24:4). Mi vida devocional es débil: oro solo antes del culto. Por eso me comprometo a buscar a Dios a solas cada mañana durante quince minutos, como Jesús, que oraba muy de mañana (Marcos 1:35). En el equipo voy a llegar preparado a los ensayos y a honrar a mis compañeros, estimándolos como superiores a mí.",
  },
};
