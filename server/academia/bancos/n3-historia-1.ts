/**
 * El banco de «Historia de la iglesia I» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la iglesia de los apóstoles y su expansión · o2 las persecuciones y los mártires · o3 la defensa de la
 * fe, el canon y los credos · o4 Constantino y los concilios · o5 Agustín, los monasterios y la Edad Media ·
 * o6 los que pidieron volver a la Biblia antes de la Reforma · o7 el versículo de memoria (Hebreos 13:8).
 * Fechas y hechos comprobados en González (Unilit) y Hurlbut (Vida), como las lecciones.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-historia-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_HISTORIA_1: BancoMateria = {
  materia: "n3-historia-1",
  repaso: {
    "n3-historia-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cuántas personas se añadieron a la iglesia el día de Pentecostés?", "Como tres mil", ["Doce", "Ciento veinte", "Cinco mil"], "«y se añadieron aquel día como tres mil personas».", "Hechos 2:41"],
      ["1-r2", 1, "o1", "recordar", "¿Dónde se llamó cristianos a los discípulos por primera vez?", "En Antioquía", ["En Jerusalén", "En Roma", "En Éfeso"], "«y a los discípulos se les llamó cristianos por primera vez en Antioquía».", "Hechos 11:26"],
      ["1-r3", 1, "o1", "comprender", "¿Quiénes son los Padres apostólicos?", "Los maestros de la generación que siguió a los apóstoles, como Clemente, Ignacio y Policarpo", ["Los doce apóstoles", "Los papas de la Edad Media", "Los reformadores del siglo XVI"], "Sus escritos son valiosos, pero no forman parte de la Biblia. La iglesia sigue en pie porque Cristo la edifica.", "Mateo 16:18"],
    ] as P[]).map(p),
    "n3-historia-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué significa la palabra mártir?", "Testigo", ["Soldado", "Sacerdote", "Esclavo"], "Jesús le dijo a Esmirna: «Sé fiel hasta la muerte, y yo te daré la corona de la vida».", "Apocalipsis 2:10"],
      ["2-r2", 2, "o2", "comprender", "¿Por qué perseguían a los cristianos en el Imperio romano?", "Porque adoraban a un solo Dios y no ofrecían sacrificios a los dioses ni al emperador", ["Porque no pagaban impuestos", "Porque formaban un ejército", "Porque eran ricos"], "El conflicto era quién es el Señor: el que padece como cristiano, «no se avergüence, sino glorifique a Dios por ello».", "1 Pedro 4:16"],
      ["2-r3", 2, "o2", "recordar", "¿Qué escribió Tertuliano sobre la sangre de los cristianos?", "Que es semilla: cuanto más los perseguían, más crecía la iglesia", ["Que había que vengarla", "Que era una maldición", "Que no servía de nada"], "Los mártires fueron fieles hasta la muerte, y la iglesia siguió creciendo.", "Apocalipsis 2:10"],
    ] as P[]).map(p),
    "n3-historia-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pide Judas 1:3 a los creyentes?", "Que contiendan ardientemente por la fe que ha sido una vez dada a los santos", ["Que eviten toda discusión", "Que acepten toda enseñanza nueva", "Que se separen del mundo"], "«exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos».", "Judas 1:3"],
      ["3-r2", 3, "o3", "comprender", "¿Qué hizo la iglesia con el canon del Nuevo Testamento?", "Reconoció los libros que Dios había inspirado", ["Inventó los libros que le convenían", "Escribió libros nuevos en el siglo IV", "Dejó que cada uno escogiera sus libros"], "Pedro ya contaba las cartas de Pablo junto a «las otras Escrituras».", "2 Pedro 3:16"],
      ["3-r3", 3, "o3", "recordar", "¿Quién escribió en el año 367 la lista de los 27 libros del Nuevo Testamento?", "Atanasio de Alejandría", ["Constantino", "Agustín", "Marción"], "La iglesia reconoció lo que Dios había inspirado: toda la Escritura es inspirada por Dios.", "2 Timoteo 3:16"],
    ] as P[]).map(p),
    "n3-historia-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué dio el Edicto de Milán del año 313?", "Libertad de culto en el Imperio: terminaron las persecuciones", ["La prohibición del cristianismo", "La división del Imperio", "La lista de los libros de la Biblia"], "Pero Jesús había dicho: «Mi reino no es de este mundo».", "Juan 18:36"],
      ["4-r2", 4, "o4", "comprender", "¿Qué enseñaba Arrio?", "Que el Hijo era una criatura y no Dios eterno", ["Que Jesús no tuvo cuerpo", "Que el Antiguo Testamento era malo", "Que hay que obedecer al papa"], "Juan dice lo contrario: «En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
      ["4-r3", 4, "o4", "recordar", "¿Qué confesó el Concilio de Calcedonia en el año 451?", "Que Jesucristo es una sola persona, verdadero Dios y verdadero hombre", ["Que Jesús era solo un hombre", "Que Jesús era solo Dios, sin cuerpo", "Que había dos Cristos"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ] as P[]).map(p),
    "n3-historia-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué pasaje leyó Agustín el día de su conversión?", "Romanos 13:13-14", ["Juan 3:16", "El Salmo 23", "Génesis 1"], "«sino vestíos del Señor Jesucristo, y no proveáis para los deseos de la carne».", "Romanos 13:14"],
      ["5-r2", 5, "o5", "comprender", "¿Qué enseñó Agustín frente a Pelagio?", "Que la salvación es por gracia, no por las propias fuerzas", ["Que cada uno se salva por sus obras", "Que la gracia no existe", "Que solo los monjes se salvan"], "«Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios».", "Efesios 2:8"],
      ["5-r3", 5, "o5", "recordar", "¿En qué año se separaron las iglesias de Oriente y de Occidente?", "En 1054", ["En 313", "En 476", "En 1517"], "Fue el gran cisma. Jesús había orado para que todos los suyos fueran uno.", "Juan 17:21"],
    ] as P[]).map(p),
    "n3-historia-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hizo Pedro Valdo con sus riquezas?", "Las dejó, hizo traducir partes de la Biblia y comenzó a predicar", ["Construyó una catedral", "Compró un cargo en la iglesia", "Pagó una cruzada"], "Cuando les prohibieron predicar, siguieron convencidos de que «Es necesario obedecer a Dios antes que a los hombres».", "Hechos 5:29"],
      ["6-r2", 6, "o6", "recordar", "¿Qué hicieron los seguidores de Juan Wiclef?", "Tradujeron por primera vez toda la Biblia al inglés", ["Quemaron las Biblias", "Escribieron un credo nuevo", "Convocaron una cruzada"], "«Lámpara es a mis pies tu palabra, Y lumbrera a mi camino».", "Salmos 119:105"],
      ["6-r3", 6, "o6", "recordar", "¿Qué pasó con Juan Hus en el Concilio de Constanza?", "Lo condenaron y lo quemaron en la hoguera en 1415", ["Lo nombraron papa", "Lo enviaron como misionero", "Lo perdonaron y volvió a Praga"], "Acordaos de vuestros pastores, que os hablaron la palabra de Dios, e imitad su fe.", "Hebreos 13:7"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: la iglesia de los apóstoles y su expansión (10)
    ["f01", 1, "o1", "recordar", "¿Qué prometió Jesús sobre su iglesia en Mateo 16:18?", "Que las puertas del Hades no prevalecerán contra ella", ["Que nunca tendría problemas", "Que sería la más rica del mundo", "Que duraría una sola generación"], "«sobre esta roca edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella».", "Mateo 16:18"],
    ["f02", 1, "o1", "comprender", "¿Para qué estudiamos la historia de la iglesia?", "Para saber de dónde venimos, aprender de los aciertos y de los errores, y dar gracias a Dios", ["Para memorizar fechas sin sentido", "Para despreciar a los creyentes del pasado", "Para reemplazar la Biblia"], "Somos parte de una gran nube de testigos.", "Hebreos 12:1"],
    ["f03", 1, "o1", "recordar", "¿En qué perseveraban los primeros creyentes, según Hechos 2:42?", "En la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones", ["En los sacrificios del templo y el ayuno", "En la política y el comercio", "En las fiestas de los romanos"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:42"],
    ["f04", 1, "o1", "comprender", "¿Qué pasó cuando la persecución esparció a los creyentes después de la muerte de Esteban?", "Iban por todas partes anunciando el evangelio", ["Se escondieron y callaron", "Volvieron atrás", "Formaron un ejército"], "«Pero los que fueron esparcidos iban por todas partes anunciando el evangelio».", "Hechos 8:4"],
    ["f05", 1, "o1", "recordar", "¿Qué iglesia de judíos y gentiles envió a Pablo y a Bernabé a la misión?", "La iglesia de Antioquía", ["La iglesia de Corinto", "La iglesia de Roma", "La iglesia de Esmirna"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2"],
    ["f06", 1, "o1", "analizar", "¿Qué ayudó a que el evangelio avanzara por el mundo romano?", "Los caminos y la paz del Imperio, el griego y las sinagogas, pero sobre todo el Espíritu Santo", ["El apoyo del emperador desde el principio", "Las armas de los cristianos", "Que nadie se opuso al evangelio"], "«pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos».", "Hechos 1:8"],
    ["f07", 1, "o1", "recordar", "¿Qué ocurrió en Jerusalén en el año 70?", "Los romanos destruyeron la ciudad y el templo", ["Se reunió el Concilio de Nicea", "Constantino se convirtió", "Nació la iglesia de Antioquía"], "Jesús lo había anunciado: del templo no quedaría piedra sobre piedra.", "Mateo 24:2"],
    ["f08", 1, "o1", "recordar", "¿Quién escribió una carta a los corintios hacia el año 96?", "Clemente de Roma", ["Agustín de Hipona", "Martín Lutero", "Juan Hus"], "Clemente fue uno de los Padres apostólicos. Sus escritos son valiosos, pero solo la Escritura es inspirada.", "2 Timoteo 3:16"],
    ["f09", 1, "o1", "comprender", "¿Qué lugar tienen los escritos de los Padres apostólicos?", "Son valiosos para conocer la iglesia antigua, pero no forman parte de la Biblia", ["Son tan inspirados como la Biblia", "No sirven para nada", "Reemplazan a las cartas de Pablo"], "Solo la Escritura es inspirada por Dios y útil para enseñar.", "2 Timoteo 3:16"],
    ["f10", 1, "o7", "recordar", "Completa Hebreos 13:8: Jesucristo es el mismo ayer…", "y hoy, y por los siglos", ["pero no hoy", "y mañana cambiará", "y solo en el templo"], "Es el versículo de memoria de la materia.", "Hebreos 13:8"],
    // ---- lección 2: los mártires (10)
    ["f11", 2, "o2", "recordar", "¿Qué le dijo Jesús a la iglesia de Esmirna?", "Sé fiel hasta la muerte, y yo te daré la corona de la vida", ["Huye de toda persecución", "Ya no sufrirás nunca", "Busca la protección del emperador"], "«Sé fiel hasta la muerte, y yo te daré la corona de la vida».", "Apocalipsis 2:10"],
    ["f12", 2, "o2", "comprender", "¿Fueron continuas las persecuciones en todo el Imperio?", "No: hubo épocas de calma y épocas de violencia, según el lugar y el emperador", ["Sí, todos los días durante tres siglos", "No hubo ninguna persecución", "Solo hubo persecución en Jerusalén"], "Pedro preparó a los creyentes para el fuego de prueba.", "1 Pedro 4:12"],
    ["f13", 2, "o2", "recordar", "¿De qué culpó Nerón a los cristianos en el año 64?", "Del incendio de Roma", ["De una derrota militar", "De una peste en Egipto", "De la caída del Imperio"], "Según una tradición antigua, Pedro y Pablo murieron en Roma en esos años.", "1 Pedro 4:16"],
    ["f14", 2, "o2", "recordar", "¿De qué iglesia era obispo Policarpo?", "De Esmirna", ["De Roma", "De Alejandría", "De Cartago"], "Jesús había escrito a Esmirna: «Sé fiel hasta la muerte».", "Apocalipsis 2:10"],
    ["f15", 2, "o2", "comprender", "¿Qué respondió Policarpo cuando le exigieron maldecir a Cristo?", "Que lo había servido ochenta y seis años y nunca le había hecho mal: ¿cómo iba a negar a su Rey, que lo salvó?", ["Que lo pensaría unos días", "Que lo maldeciría para salvar su vida", "Que no conocía a Cristo"], "Policarpo fue fiel hasta la muerte, como Jesús le pidió a Esmirna.", "Apocalipsis 2:10"],
    ["f16", 2, "o2", "recordar", "¿Quiénes fueron Perpetua y Felicidad?", "Dos jóvenes creyentes que murieron como mártires en Cartago en el año 203", ["Dos reinas que protegieron a la iglesia", "Dos monjas de la Edad Media", "Dos esposas de emperadores romanos"], "Murieron antes que negar a Cristo: el que padece como cristiano, «no se avergüence, sino glorifique a Dios por ello».", "1 Pedro 4:16"],
    ["f17", 2, "o2", "comprender", "¿Qué ordenó el emperador Decio en el año 250?", "Que todos ofrecieran sacrificio a los dioses y obtuvieran un certificado", ["Que todos se bautizaran", "Que se construyeran templos cristianos", "Que se tradujera la Biblia al latín"], "Muchos resistieron y otros negaron la fe por miedo. Jesús llama bienaventurados a los perseguidos por causa de la justicia.", "Mateo 5:10"],
    ["f18", 2, "o2", "recordar", "¿Qué emperador desató la gran persecución desde el año 303?", "Diocleciano", ["Constantino", "Teodosio", "Nerón"], "Se destruyeron templos y se quemaron Escrituras, pero «la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f19", 2, "o2", "analizar", "¿Cómo respondieron los mártires a sus perseguidores?", "Sin odio, orando por ellos como Esteban", ["Con violencia", "Negando la fe en secreto", "Huyendo siempre del país"], "«Señor, no les tomes en cuenta este pecado».", "Hechos 7:60"],
    ["f20", 2, "o2", "evaluar", "¿Qué nos enseña hoy el ejemplo de los mártires?", "A ser fieles a Cristo en las pruebas grandes y pequeñas, y a orar por los perseguidos", ["A buscar el martirio a propósito", "A esconder siempre la fe", "Que la persecución es cosa del pasado"], "Acordaos de los presos, como si estuvierais presos juntamente con ellos.", "Hebreos 13:3"],
    // ---- lección 3: defender la fe, el canon y los credos (10)
    ["f21", 3, "o3", "recordar", "¿De qué palabra griega viene el nombre de los apologistas?", "De apología, que significa defensa", ["De apóstol, que significa enviado", "De ágape, que significa amor", "De ekklesía, que significa asamblea"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15"],
    ["f22", 3, "o3", "recordar", "¿Quién fue Justino Mártir?", "Un filósofo convertido que escribió apologías hacia el año 150 y murió como mártir en Roma", ["Un emperador romano", "Un monje del desierto", "Un obispo que negó la fe"], "Defendió la fe con mansedumbre y reverencia.", "1 Pedro 3:15"],
    ["f23", 3, "o3", "comprender", "¿Qué enseñaban los gnósticos?", "Que la materia es mala y que la salvación viene de un conocimiento secreto", ["Que la salvación es por gracia por medio de la fe", "Que hay que obedecer al emperador", "Que la Biblia debe traducirse al pueblo"], "Muchos negaban que Jesús tuviera un cuerpo verdadero, pero «Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».", "1 Juan 4:2"],
    ["f24", 3, "o3", "recordar", "¿Qué hizo Marción hacia el año 144?", "Rechazó el Antiguo Testamento y se quedó con parte de Lucas y diez cartas de Pablo", ["Tradujo la Biblia al latín", "Escribió el Credo apostólico", "Convocó el Concilio de Nicea"], "Toda la Escritura, también el Antiguo Testamento, es inspirada por Dios.", "2 Timoteo 3:16"],
    ["f25", 3, "o3", "recordar", "¿Qué obra escribió Ireneo de Lyon hacia el año 180?", "Contra las herejías", ["La ciudad de Dios", "Las Confesiones", "Las 95 tesis"], "Mostró que la fe de la iglesia era la que habían enseñado los apóstoles: la fe una vez dada a los santos.", "Judas 1:3"],
    ["f26", 3, "o3", "analizar", "¿Por qué necesitaba la iglesia saber con claridad qué libros eran Escritura?", "Porque maestros como Marción y los gnósticos quitaban o añadían libros", ["Porque el emperador lo exigía", "Porque querían vender Biblias", "Porque no había ningún libro escrito"], "Algunos torcían las Escrituras para su propia perdición.", "2 Pedro 3:16"],
    ["f27", 3, "o3", "comprender", "¿Qué señales ayudaron a reconocer los libros del Nuevo Testamento?", "Su origen apostólico, su enseñanza fiel y su uso en las iglesias de todas partes", ["Su tamaño y su belleza", "La decisión de un emperador", "Que fueran los preferidos de los paganos"], "Pedro ya contaba las cartas de Pablo junto a «las otras Escrituras».", "2 Pedro 3:16"],
    ["f28", 3, "o3", "recordar", "¿Qué concilios reconocieron la lista de los 27 libros a fines del siglo IV?", "Los de Hipona (393) y Cartago (397)", ["Los de Nicea y Calcedonia", "Los de Constanza y Trento", "Ninguno: nunca se reconoció"], "La iglesia reconoció lo que Dios había inspirado.", "2 Timoteo 3:16"],
    ["f29", 3, "o3", "comprender", "¿De dónde viene el Credo apostólico?", "De una fórmula que se confesaba en el bautismo en Roma en el siglo II; su forma actual se fijó siglos después", ["Lo escribieron los doce apóstoles juntos", "Lo escribió Lutero en 1517", "Lo dictó Constantino"], "«Retén la forma de las sanas palabras que de mí oíste».", "2 Timoteo 1:13"],
    ["f30", 3, "o3", "evaluar", "¿Qué autoridad tienen los credos?", "Son útiles porque resumen lo que enseña la Biblia, que es la autoridad final", ["Están por encima de la Biblia", "No tienen ningún valor", "Son tan inspirados como la Escritura"], "Toda la Escritura es inspirada por Dios, y útil para enseñar.", "2 Timoteo 3:16"],
    // ---- lección 4: Constantino y los grandes concilios (10)
    ["f31", 4, "o4", "recordar", "¿En qué batalla venció Constantino en el año 312?", "En la batalla del puente Milvio", ["En la batalla de Jericó", "En la batalla de Tours", "En la batalla de Hastings"], "Atribuyó la victoria al Dios de los cristianos; pero el reino de Cristo no es de este mundo.", "Juan 18:36"],
    ["f32", 4, "o4", "analizar", "¿Qué peligro trajo que ser cristiano diera ventajas?", "Que muchos entraran a la iglesia sin conversión verdadera y que el poder político se mezclara con la iglesia", ["Que la iglesia se quedara vacía", "Que se prohibiera la Biblia", "Que los cristianos fueran más perseguidos"], "«Mi reino no es de este mundo».", "Juan 18:36"],
    ["f33", 4, "o4", "recordar", "¿Qué emperador hizo del cristianismo la religión oficial en el año 380?", "Teodosio", ["Nerón", "Diocleciano", "Decio"], "La unión de la iglesia con el Estado trajo bendiciones y peligros: el reino de Cristo no es de aquí.", "Juan 18:36"],
    ["f34", 4, "o4", "recordar", "¿En qué año se reunió el Concilio de Nicea?", "En 325", ["En 70", "En 1054", "En 1517"], "Afirmó lo que dice Juan: «el Verbo era Dios».", "Juan 1:1"],
    ["f35", 4, "o4", "comprender", "¿Qué confesó el Concilio de Nicea sobre el Hijo?", "Que es de la misma sustancia que el Padre: verdadero Dios de verdadero Dios", ["Que es la primera criatura de Dios", "Que es un ángel muy alto", "Que solo parecía tener cuerpo"], "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
    ["f36", 4, "o4", "recordar", "¿Quién defendió la deidad de Cristo aunque fue desterrado cinco veces?", "Atanasio, obispo de Alejandría", ["Arrio", "Pelagio", "Marción"], "Sabía lo que estaba en juego: en Cristo «habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
    ["f37", 4, "o4", "analizar", "¿Por qué era tan grave la enseñanza de Arrio?", "Porque si Cristo no es Dios, no puede salvarnos", ["Porque usaba palabras difíciles", "Porque era de Alejandría", "Porque no hablaba latín"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
    ["f38", 4, "o4", "comprender", "¿Qué confesó el Concilio de Constantinopla en el año 381?", "La deidad del Espíritu Santo, adorado y glorificado con el Padre y el Hijo", ["Que el Espíritu Santo es solo una fuerza", "Que el papa es la cabeza de la iglesia", "Que la Biblia tiene 66 libros"], "Jesús mandó bautizar en el nombre del Padre, y del Hijo, y del Espíritu Santo.", "Mateo 28:19"],
    ["f39", 4, "o4", "comprender", "¿Qué confesó el Concilio de Calcedonia sobre Cristo?", "Que es una sola persona en dos naturalezas, verdadero Dios y verdadero hombre, sin mezcla y sin división", ["Que tiene dos personas distintas", "Que su humanidad desapareció en su divinidad", "Que fue solo un profeta"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
    ["f40", 4, "o4", "evaluar", "¿Por qué recibimos lo que estos concilios confesaron sobre Cristo?", "Porque pusieron en palabras claras lo que enseña la Escritura, que sigue siendo la autoridad final", ["Porque están por encima de la Biblia", "Porque los convocó un emperador", "Porque todo concilio es infalible"], "«Mirad que nadie os engañe por medio de filosofías y huecas sutilezas».", "Colosenses 2:8"],
    // ---- lección 5: Agustín, los monjes y la Edad Media (10)
    ["f41", 5, "o5", "recordar", "¿Dónde nació Agustín?", "En Tagaste, en el norte de África", ["En Roma", "En Jerusalén", "En Lyon"], "Dios lo alcanzó por su gracia: por gracia sois salvos.", "Efesios 2:8"],
    ["f42", 5, "o5", "recordar", "¿Quién oró durante años por la conversión de Agustín?", "Su madre, Mónica", ["Su esposa", "El emperador", "Su maestro de filosofía"], "«La oración eficaz del justo puede mucho».", "Santiago 5:16"],
    ["f43", 5, "o5", "comprender", "¿Qué palabras oyó Agustín antes de leer Romanos 13?", "Toma y lee", ["Levántate y anda", "Ve y predica", "Calla y escucha"], "Leyó: «sino vestíos del Señor Jesucristo, y no proveáis para los deseos de la carne».", "Romanos 13:14"],
    ["f44", 5, "o5", "analizar", "¿En qué se diferenciaban Agustín y Pelagio?", "Pelagio decía que el ser humano puede obedecer a Dios con sus propias fuerzas; Agustín, que la salvación es por gracia", ["Pelagio defendía la gracia y Agustín las obras", "Los dos enseñaban lo mismo", "Discutían sobre la fecha de la Pascua"], "«no por obras, para que nadie se gloríe».", "Efesios 2:9"],
    ["f45", 5, "o5", "recordar", "¿Qué obra escribió Agustín después del saqueo de Roma en el año 410?", "La ciudad de Dios", ["Contra las herejías", "Las 95 tesis", "La regla de los monasterios"], "Los imperios caen, pero el reino de Dios permanece: el de Cristo no es de este mundo.", "Juan 18:36"],
    ["f46", 5, "o5", "comprender", "¿Qué ordenaba la regla de Benito de Nursia, hacia el año 530?", "La vida de los monasterios en oración, lectura y trabajo", ["La guerra contra los musulmanes", "La venta de cargos en la iglesia", "La traducción de la Biblia al inglés"], "Los monasterios copiaron la Biblia a mano durante siglos: la palabra de Dios permanece.", "Isaías 40:8"],
    ["f47", 5, "o5", "recordar", "¿Quién llevó el evangelio a Irlanda en el siglo V?", "Patricio", ["Bonifacio", "Benito", "Valdo"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19"],
    ["f48", 5, "o5", "recordar", "¿En qué año cayó el Imperio romano de Occidente?", "En 476", ["En 313", "En 1054", "En 1455"], "Los imperios caen, pero las puertas del Hades no prevalecerán contra la iglesia.", "Mateo 16:18"],
    ["f49", 5, "o5", "comprender", "¿Qué pasó en el gran cisma de 1054?", "Se separaron las iglesias de Oriente y de Occidente: la ortodoxa y la católica romana", ["Comenzó la Reforma", "Se convirtió Constantino", "Se escribió el Nuevo Testamento"], "Jesús había orado por la unidad de los suyos.", "Juan 17:21"],
    ["f50", 5, "o5", "evaluar", "¿Cómo debemos juzgar a la iglesia de la Edad Media?", "Reconocer sus luces y sus sombras, y examinarlo todo a la luz de la Escritura", ["Todo fue malo", "Todo fue bueno", "No vale la pena estudiarla"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    // ---- lección 6: antes de la Reforma (10)
    ["f51", 6, "o6", "recordar", "¿De qué ciudad era Pedro Valdo?", "De Lyon, en Francia", ["De Praga", "De Oxford", "De Wittenberg"], "Dejó sus riquezas para predicar la Palabra.", "Hechos 5:29"],
    ["f52", 6, "o6", "comprender", "¿Por qué siguieron predicando los valdenses cuando se lo prohibieron?", "Porque estaban convencidos de que había que obedecer a Dios antes que a los hombres", ["Porque querían poder político", "Porque no sabían que estaba prohibido", "Porque el papa se lo pidió"], "«Es necesario obedecer a Dios antes que a los hombres».", "Hechos 5:29"],
    ["f53", 6, "o6", "recordar", "¿Dónde enseñaba Juan Wiclef?", "En Oxford, Inglaterra", ["En Roma", "En Lyon", "En Alejandría"], "Enseñó que la Biblia es la autoridad suprema: lámpara a nuestros pies.", "Salmos 119:105"],
    ["f54", 6, "o6", "comprender", "¿Qué enseñó Wiclef sobre la autoridad de la Biblia?", "Que la Biblia es la autoridad suprema para la iglesia, por encima del papa", ["Que el papa está por encima de la Biblia", "Que solo los sacerdotes deben leerla", "Que la tradición vale más que la Escritura"], "«Lámpara es a mis pies tu palabra, Y lumbrera a mi camino».", "Salmos 119:105"],
    ["f55", 6, "o6", "recordar", "¿Cómo llamaron después a Wiclef?", "La estrella de la mañana de la Reforma", ["El padre de la iglesia", "El último apóstol", "El primer papa"], "Preparó el camino para que la Palabra volviera al pueblo.", "Salmos 119:105"],
    ["f56", 6, "o6", "recordar", "¿En qué ciudad predicaba Juan Hus?", "En Praga", ["En Roma", "En Lyon", "En Ginebra"], "Predicó en la lengua del pueblo y murió fiel: imitad su fe.", "Hebreos 13:7"],
    ["f57", 6, "o6", "analizar", "¿Por qué fue tan importante la imprenta de Gutenberg, hacia el año 1455?", "Porque abarató los libros y permitió que la Biblia y las ideas circularan mucho más", ["Porque prohibió copiar la Biblia", "Porque solo imprimía para los sacerdotes", "Porque reemplazó la predicación"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f58", 6, "o6", "recordar", "¿Qué publicó Erasmo en 1516?", "El Nuevo Testamento en griego", ["Las 95 tesis", "La primera Biblia en español", "La ciudad de Dios"], "Los estudiosos pudieron leer el Nuevo Testamento en su idioma original.", "2 Timoteo 3:16"],
    ["f59", 6, "o6", "recordar", "¿Qué ocurrió el 31 de octubre de 1517?", "Martín Lutero publicó sus 95 tesis en Wittenberg y comenzó la Reforma", ["Cayó el Imperio romano", "Se reunió el Concilio de Nicea", "Murió Juan Hus"], "La Palabra volvía al centro de la iglesia: lámpara a nuestros pies.", "Salmos 119:105"],
    ["f60", 6, "o6", "evaluar", "¿Qué podemos aprender de Valdo, Wiclef y Hus?", "A amar la Biblia, ponerla al alcance de todos y obedecer a Dios antes que a los hombres, aunque cueste", ["A buscar el poder político", "A guardar la Biblia solo para los sabios", "A callar ante los abusos para evitar problemas"], "«Acordaos de vuestros pastores, que os hablaron la palabra de Dios; considerad cuál haya sido el resultado de su conducta, e imitad su fe».", "Hebreos 13:7"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hacían los primeros creyentes cada día, según Hechos 2:46?", "Se reunían en el templo y partían el pan en las casas", ["Ofrecían sacrificios de animales", "Se escondían en cuevas", "Viajaban a Roma"], "«Y perseverando unánimes cada día en el templo, y partiendo el pan en las casas, comían juntos con alegría y sencillez de corazón».", "Hechos 2:46"],
      ["m1-02", 1, "o1", "comprender", "¿Quiénes eran los primeros creyentes de Jerusalén?", "Judíos que creían que Jesús es el Mesías", ["Romanos que dejaron a sus dioses", "Griegos de Atenas", "Egipcios de Alejandría"], "Pedro les predicó que Dios había hecho a Jesús Señor y Cristo.", "Hechos 2:36"],
      ["m1-03", 1, "o1", "recordar", "¿Cuántas cartas escribió Ignacio de Antioquía camino del martirio?", "Siete", ["Una", "Trece", "Veintisiete"], "Ignacio fue uno de los Padres apostólicos, fiel hasta la muerte.", "Apocalipsis 2:10"],
      ["m1-04", 1, "o1", "aplicar", "¿Qué significa que somos parte de una gran nube de testigos?", "Que la fe nos llegó por creyentes de muchas generaciones que nos precedieron", ["Que debemos olvidar el pasado", "Que la iglesia empezó con nosotros", "Que solo importan los creyentes famosos"], "«teniendo en derredor nuestro tan grande nube de testigos».", "Hebreos 12:1"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué la persecución de Jerusalén terminó ayudando a extender el evangelio?", "Porque los creyentes esparcidos anunciaban el evangelio por donde iban", ["Porque todos los perseguidores se convirtieron", "Porque la iglesia dejó de predicar", "Porque el emperador la apoyó"], "«Pero los que fueron esparcidos iban por todas partes anunciando el evangelio».", "Hechos 8:4"],
      ["m1-06", 1, "o1", "recordar", "¿Hasta dónde llegaría el testimonio, según Hechos 1:8?", "A Jerusalén, Judea, Samaria y hasta lo último de la tierra", ["Solo a Jerusalén", "Solo a Roma", "Solo a Galilea"], "«me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
      ["m1-07", 2, "o2", "recordar", "¿Qué emperador persiguió a los cristianos en el año 64?", "Nerón", ["Constantino", "Teodosio", "Diocleciano"], "Culpó a los cristianos del incendio de Roma. Pedro había escrito que no se sorprendieran del fuego de prueba.", "1 Pedro 4:12"],
      ["m1-08", 2, "o2", "comprender", "¿De qué acusaban falsamente a los cristianos?", "De ateos, porque no adoraban a los dioses, y de enemigos del Imperio", ["De ser demasiado ricos", "De no saber leer", "De adorar al emperador"], "«Bienaventurados los que padecen persecución por causa de la justicia».", "Mateo 5:10"],
      ["m1-09", 2, "o2", "recordar", "¿En qué ciudad murieron Perpetua y Felicidad?", "En Cartago", ["En Roma", "En Esmirna", "En Lyon"], "Fueron fieles hasta la muerte.", "Apocalipsis 2:10"],
      ["m1-10", 2, "o2", "analizar", "¿Qué quiso decir Tertuliano con que la sangre de los cristianos es semilla?", "Que la persecución, en vez de acabar con la iglesia, la hacía crecer", ["Que había que vengar a los mártires", "Que los cristianos eran agricultores", "Que la iglesia iba a desaparecer"], "Las puertas del Hades no prevalecerán contra la iglesia.", "Mateo 16:18"],
      ["m1-11", 2, "o2", "aplicar", "Un compañero se burla de ti por ser cristiano. ¿Qué te enseña el ejemplo de los mártires?", "Responder sin odio, con fidelidad, y orar por él", ["Devolverle la burla", "Negar que eres cristiano", "Dejar de ir a la iglesia"], "«orad por los que os ultrajan y os persiguen».", "Mateo 5:44"],
      ["m1-12", 2, "o2", "comprender", "¿Por qué fue tan dolorosa para la iglesia la persecución de Decio?", "Porque, además de los que resistieron, muchos negaron la fe por miedo", ["Porque nadie fue perseguido", "Porque todos resistieron sin miedo", "Porque el emperador se convirtió"], "Jesús llama a ser fiel hasta la muerte.", "Apocalipsis 2:10"],
      ["m1-13", 3, "o3", "recordar", "¿Qué escribieron los apologistas?", "Defensas de la fe frente a las acusaciones de los paganos", ["Evangelios nuevos", "Leyes para el Imperio", "Himnos para la guerra"], "«estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15"],
      ["m1-14", 3, "o3", "comprender", "¿Qué prueba dio Juan para reconocer las falsas enseñanzas sobre Cristo?", "Confesar que Jesucristo ha venido en carne", ["Tener un conocimiento secreto", "Hacer milagros", "Hablar con elocuencia"], "«Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».", "1 Juan 4:2"],
      ["m1-15", 3, "o3", "recordar", "¿De quién fue discípulo Ireneo de Lyon?", "De Policarpo", ["De Marción", "De Arrio", "De Agustín"], "Así la enseñanza de los apóstoles pasó de una generación a otra, como Pablo encargó a hombres fieles.", "2 Timoteo 2:2"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué es un error decir que la iglesia inventó el canon?", "Porque la iglesia no dio su autoridad a los libros: reconoció la que ya tenían como inspirados por Dios", ["Porque el canon lo escribió Constantino", "Porque no hay canon", "Porque cada iglesia tiene su propia Biblia"], "Toda la Escritura es inspirada por Dios.", "2 Timoteo 3:16"],
      ["m1-17", 3, "o3", "comprender", "¿Para qué usaba la iglesia antigua las fórmulas breves de fe?", "Para confesar la fe en el bautismo y enseñar lo esencial", ["Para reemplazar la Biblia", "Para elegir emperadores", "Para cobrar impuestos"], "«Retén la forma de las sanas palabras que de mí oíste, en la fe y amor que es en Cristo Jesús».", "2 Timoteo 1:13"],
      ["m1-18", 3, "o3", "evaluar", "Un maestro dice que solo unos pocos iluminados tienen el conocimiento secreto que salva. ¿A qué error antiguo se parece?", "Al gnosticismo", ["Al arrianismo", "A la enseñanza de Pelagio", "A la enseñanza de los apóstoles"], "La fe fue «una vez dada a los santos», no a unos pocos con un secreto.", "Judas 1:3"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En qué año se dio el Edicto de Milán?", "En 313", ["En 64", "En 476", "En 1054"], "Terminaron las persecuciones, pero el reino de Cristo no es de este mundo.", "Juan 18:36"],
      ["m2-02", 4, "o4", "comprender", "¿Qué bendiciones trajo la libertad de culto?", "Se pudieron construir templos, copiar las Escrituras y predicar abiertamente", ["Se prohibió la predicación", "Se cerraron las iglesias", "Se quemaron las Escrituras"], "Pablo pedía orar para que la palabra del Señor corriera y fuera glorificada.", "2 Tesalonicenses 3:1"],
      ["m2-03", 4, "o4", "recordar", "¿Quién era Arrio?", "Un presbítero de Alejandría que negaba que el Hijo fuera Dios eterno", ["Un emperador romano", "El obispo que defendió a Cristo en Nicea", "Un misionero de Irlanda"], "Juan enseña que el Verbo era Dios.", "Juan 1:1"],
      ["m2-04", 4, "o4", "analizar", "¿Qué decía Arrio que contradice Juan 1:1?", "Que hubo un tiempo en que el Hijo no existía", ["Que el Verbo era con Dios", "Que el Verbo se hizo carne", "Que Dios creó el mundo"], "«En el principio era el Verbo»: el Verbo ya existía en el principio.", "Juan 1:1"],
      ["m2-05", 4, "o4", "aplicar", "Alguien te dice que Jesús fue solo un gran maestro, no Dios. ¿Qué pasajes usarías para responder?", "Juan 1:1 y Colosenses 2:9", ["Génesis 5 y Números 1", "Ester 2 y Rut 4", "Ninguno: la Biblia no lo dice"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál de estas frases resume mejor lo que confesó Calcedonia?", "Jesucristo es verdadero Dios y verdadero hombre en una sola persona", ["Jesús era Dios y solo parecía hombre", "Jesús era un hombre adoptado por Dios", "Jesús tenía dos personas"], "«Y aquel Verbo fue hecho carne».", "Juan 1:14"],
      ["m2-07", 5, "o5", "recordar", "¿De qué ciudad fue obispo Agustín?", "De Hipona", ["De Roma", "De Alejandría", "De Lyon"], "Fue alcanzado por la gracia de Dios: por gracia sois salvos.", "Efesios 2:8"],
      ["m2-08", 5, "o5", "comprender", "¿Cómo contó Agustín su conversión en sus Confesiones?", "Como una obra de la gracia de Dios", ["Como un logro de su inteligencia", "Como una decisión política", "Como un premio a sus buenas obras"], "«y esto no de vosotros, pues es don de Dios».", "Efesios 2:8"],
      ["m2-09", 5, "o5", "recordar", "¿Quién se fue al desierto de Egipto a fines del siglo III para buscar una vida entregada a Dios?", "Antonio", ["Patricio", "Bonifacio", "Ireneo"], "Buscó apartarse del mundo para orar, como Jesús se iba a un lugar desierto a orar.", "Marcos 1:35"],
      ["m2-10", 5, "o5", "analizar", "¿Qué aportaron los monasterios a la iglesia medieval?", "Copiaron la Biblia a mano y fueron centros de estudio y de ayuda a los pobres", ["Organizaron las cruzadas", "Vendieron las Escrituras", "Prohibieron la oración"], "La palabra del Dios nuestro permanece para siempre.", "Isaías 40:8"],
      ["m2-11", 5, "o5", "recordar", "¿Dónde predicó Bonifacio en el siglo VIII?", "En Germania", ["En Irlanda", "En Egipto", "En la India"], "«id, y haced discípulos a todas las naciones».", "Mateo 28:19"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué error de la Edad Media muestran las cruzadas?", "Usar la violencia en nombre de Cristo, cuyo reino no es de este mundo", ["Predicar demasiado", "Traducir la Biblia", "Ayudar a los pobres"], "«si mi reino fuera de este mundo, mis servidores pelearían».", "Juan 18:36"],
      ["m2-13", 6, "o6", "recordar", "¿En qué idioma estaba la Biblia que se usaba en Europa occidental en la Edad Media?", "En latín", ["En español", "En inglés", "En alemán"], "Por eso la mayoría no podía leerla, aunque la Palabra es lámpara para todos.", "Salmos 119:105"],
      ["m2-14", 6, "o6", "comprender", "¿Qué tenían en común Valdo, Wiclef y Hus?", "Querían volver a la Biblia y que el pueblo la oyera y la leyera en su lengua", ["Querían ser papas", "Organizaron cruzadas", "Defendían la venta de cargos"], "«Lámpara es a mis pies tu palabra».", "Salmos 119:105"],
      ["m2-15", 6, "o6", "recordar", "¿En qué fecha quemaron a Juan Hus?", "El 6 de julio de 1415", ["El 31 de octubre de 1517", "El 25 de diciembre del 800", "El 1 de enero de 1054"], "Murió confiando en Cristo: imitad su fe.", "Hebreos 13:7"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el Nuevo Testamento griego de Erasmo preparó la Reforma?", "Porque permitió estudiar el Nuevo Testamento en su idioma original y comparar con él la enseñanza de la iglesia", ["Porque prohibía leer la Biblia", "Porque reemplazó la Biblia", "Porque estaba escrito en inglés"], "Toda la Escritura es inspirada por Dios, y útil para enseñar.", "2 Timoteo 3:16"],
      ["m2-17", 6, "o6", "recordar", "¿Quién tradujo la Biblia completa al español y la publicó en 1569?", "Casiodoro de Reina", ["Cipriano de Valera", "Juan Wiclef", "Erasmo"], "Cipriano de Valera la revisó en 1602, y de esa obra viene la Reina-Valera 1960.", "Isaías 40:8"],
      ["m2-18", 6, "o6", "aplicar", "¿Cómo podemos honrar hoy a los que dieron la vida por la Biblia?", "Leyéndola, obedeciéndola y compartiéndola cada día", ["Guardándola sin abrirla", "Leyéndola solo en las fiestas", "Dejando que otros la lean por nosotros"], "«Lámpara es a mis pies tu palabra, Y lumbrera a mi camino».", "Salmos 119:105"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n3-historia-1-e1",
      tipo: "corta",
      pregunta: "Explica, con un pasaje de Hechos, cómo nació la iglesia y cómo se extendió en el siglo I.",
      ideas: [
        { id: "pentecostes", peso: 25, texto: "Nació en Pentecostés, con la venida del Espíritu Santo.", formas: ["pentecostes", "espiritu santo", "tres mil"] },
        { id: "expansion", peso: 30, texto: "Se extendió de Jerusalén a Judea, Samaria, Antioquía y el mundo romano.", formas: ["antioquia", "samaria", "judea", "esparcid*", "lo ultimo de la tierra", "mundo romano", "gentiles"] },
        { id: "causa", peso: 25, texto: "Por el poder del Espíritu y el testimonio de los creyentes, también en la persecución.", formas: ["persecu*", "testi*", "poder", "anunciando"] },
        { id: "caminos", peso: 10, texto: "Ayudaron los caminos romanos, el griego y las sinagogas.", formas: ["caminos", "griego", "sinagoga*"] },
      ],
      citas: ["Hechos 1:8", "Hechos 2:41", "Hechos 2:41-42", "Hechos 8:4", "Hechos 11:26", "Hechos 11:19-26", "Mateo 16:18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La iglesia nació en Pentecostés, cuando vino el Espíritu Santo, Pedro predicó y se añadieron unas tres mil personas. La persecución esparció a los creyentes, que iban anunciando el evangelio (Hechos 8:4); llegó a Samaria, a Antioquía y al mundo romano, como Jesús anunció en Hechos 1:8. La impulsaron el poder del Espíritu y el testimonio de creyentes comunes.",
    },
    {
      id: "n3-historia-1-e2",
      tipo: "corta",
      pregunta: "Explica por qué perseguían a los cristianos en el Imperio romano y cómo respondieron los mártires. Da un ejemplo.",
      ideas: [
        { id: "porque", peso: 30, texto: "Porque adoraban a un solo Dios y no sacrificaban a los dioses ni al emperador: el conflicto era quién es el Señor.", formas: ["un solo dios", "dioses", "emperador", "ateos", "quien es el señor", "jesus es el señor", "enemigos del imperio"] },
        { id: "respuesta", peso: 30, texto: "Respondieron con fidelidad, sin odio, orando por sus perseguidores.", formas: ["fiel*", "sin odio", "perdon*", "orando", "oraban", "no negaron"], negativa: true },
        { id: "ejemplo", peso: 20, texto: "Un ejemplo: Esteban, Policarpo, Perpetua y Felicidad, o las persecuciones de Nerón, Decio o Diocleciano.", formas: ["policarpo", "perpetua", "felicidad", "esteban", "neron", "diocleciano", "decio"] },
        { id: "semilla", peso: 10, texto: "La iglesia creció: la sangre de los cristianos es semilla.", formas: ["semilla", "crec*", "tertuliano"] },
      ],
      citas: ["Apocalipsis 2:10", "Hechos 7:60", "Hechos 7:59-60", "1 Pedro 4:12-16", "1 Pedro 4:16", "Mateo 5:10", "Mateo 5:44"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los perseguían porque adoraban a un solo Dios y no ofrecían sacrificios a los dioses ni al emperador: el conflicto era quién es el Señor. Los mártires fueron fieles sin responder con odio, orando por sus perseguidores, como Esteban (Hechos 7:60). Policarpo no quiso negar a su Rey, y la iglesia creció: la sangre de los cristianos es semilla.",
    },
    {
      id: "n3-historia-1-e3",
      tipo: "corta",
      pregunta: "Explica cómo reconoció la iglesia los libros del Nuevo Testamento y por qué no los inventó.",
      ideas: [
        { id: "reconocio", peso: 30, texto: "La iglesia reconoció los libros que Dios ya había inspirado; no les dio su autoridad.", formas: ["reconoci*", "inspirad*", "(no|nunca) (invento|inventaron|creo)", "dios inspiro"], negativa: true },
        { id: "criterios", peso: 30, texto: "Por su origen apostólico, su enseñanza fiel y su uso en las iglesias.", formas: ["apostol*", "fiel", "uso", "usaban", "todas partes"] },
        { id: "atanasio", peso: 20, texto: "Atanasio escribió la lista de los 27 libros en el año 367, y Hipona y Cartago la reconocieron.", formas: ["atanasio", "367", "27 libros", "veintisiete", "hipona", "cartago"] },
        { id: "herejes", peso: 10, texto: "Frente a Marción y los gnósticos, que quitaban o añadían libros.", formas: ["marcion", "gnostic*", "herej*", "falsos maestros"] },
      ],
      citas: ["2 Pedro 3:16", "2 Pedro 3:15-16", "2 Timoteo 3:16", "Judas 1:3", "2 Timoteo 1:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La iglesia no inventó el canon: reconoció los libros que Dios ya había inspirado. Frente a Marción y los gnósticos, se fijó en su origen apostólico, su enseñanza fiel y su uso en las iglesias de todas partes. Pedro ya contaba las cartas de Pablo entre las Escrituras (2 Pedro 3:16). En el año 367, Atanasio listó los 27 libros.",
    },
    {
      id: "n3-historia-1-e4",
      tipo: "breve",
      pregunta:
        "Explica la controversia de Arrio y lo que confesaron los concilios de Nicea, Constantinopla y Calcedonia sobre Cristo y el Espíritu Santo, y por qué importa para nuestra fe. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "arrio", peso: 20, texto: "Arrio enseñaba que el Hijo era una criatura y no Dios eterno.", formas: ["arrio", "criatura", "no existia", "arrian*"] },
        { id: "nicea", peso: 20, texto: "Nicea (325): el Hijo es de la misma sustancia que el Padre, verdadero Dios.", formas: ["nicea", "325", "misma sustancia", "verdadero dios de verdadero dios", "consustancial"] },
        { id: "espiritu", peso: 15, texto: "Constantinopla (381): la deidad del Espíritu Santo.", formas: ["constantinopla", "381", "deidad del espiritu"] },
        { id: "calcedonia", peso: 20, texto: "Calcedonia (451): una sola persona, verdadero Dios y verdadero hombre.", formas: ["calcedonia", "451", "verdadero hombre", "dos naturalezas", "una sola persona"] },
        { id: "atanasio", peso: 10, texto: "Atanasio defendió la deidad de Cristo.", formas: ["atanasio", "desterrad*"] },
        { id: "importa", peso: 15, texto: "Por qué importa: si Cristo no es Dios ni hombre verdadero, no puede salvarnos; los concilios siguen a la Escritura.", formas: ["salvar*", "salvarnos", "escritura", "biblia", "autoridad"] },
      ],
      basta: 85,
      citas: ["Juan 1:1", "Juan 1:1-3", "Juan 1:14", "Colosenses 2:9", "Colosenses 2:8-9", "Mateo 28:19", "Filipenses 2:6-7", "Juan 20:28", "Hebreos 1:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Arrio, un presbítero de Alejandría, enseñaba que el Hijo era la primera criatura de Dios y no Dios eterno: decía que hubo un tiempo en que no existía. En el año 325, el Concilio de Nicea confesó que el Hijo es de la misma sustancia que el Padre, verdadero Dios de verdadero Dios, como enseña Juan: el Verbo era Dios (Juan 1:1). Atanasio defendió esta verdad aunque fue desterrado cinco veces. En el año 381, el Concilio de Constantinopla confesó la deidad del Espíritu Santo, que con el Padre y el Hijo es adorado y glorificado, como en el mandato de bautizar en el nombre del Padre, del Hijo y del Espíritu Santo (Mateo 28:19). En el año 451, el Concilio de Calcedonia confesó que Jesucristo es una sola persona, verdadero Dios y verdadero hombre, porque el Verbo fue hecho carne (Juan 1:14). Esto importa para nuestra fe: si Cristo no fuera Dios, no podría salvarnos, y si no fuera hombre, no podría morir en nuestro lugar. Los concilios no añadieron nada a la Biblia: pusieron en palabras claras lo que enseña la Escritura, que sigue siendo nuestra autoridad final.",
    },
    {
      id: "n3-historia-1-e5",
      tipo: "breve",
      pregunta:
        "Describe a Agustín y a uno de los que pidieron volver a la Biblia antes de la Reforma (Valdo, Wiclef o Hus): qué enseñaron, qué les costó y qué aprendes de ellos para tu vida. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "agustin", peso: 20, texto: "Agustín y su conversión al leer Romanos 13.", formas: ["agustin", "toma y lee", "romanos 13", "monica", "hipona"] },
        { id: "gracia", peso: 20, texto: "Enseñó que la salvación es por gracia, frente a Pelagio.", formas: ["gracia", "pelagio", "propias fuerzas"] },
        { id: "precursor", peso: 20, texto: "Valdo, Wiclef o Hus y su amor por la Biblia en la lengua del pueblo.", formas: ["valdo", "valdenses", "wiclef", "hus", "lengua del pueblo", "tradu*"] },
        { id: "costo", peso: 15, texto: "Lo que les costó: la persecución, la condena o la hoguera.", formas: ["persegu*", "hoguera", "quemad*", "quemaron", "condena*", "costo", "murio"] },
        { id: "obedecer", peso: 10, texto: "Obedecer a Dios antes que a los hombres.", formas: ["obedecer a dios", "antes que a los hombres"] },
        { id: "aplicacion", peso: 15, texto: "Lo que aprende para su vida.", formas: ["aprendo", "voy a", "mi vida", "aplic*", "me (ensena|enseña)"] },
      ],
      basta: 85,
      citas: ["Romanos 13:13-14", "Romanos 13:14", "Efesios 2:8-9", "Efesios 2:8", "Hechos 5:29", "Salmos 119:105", "Hebreos 13:7", "Hebreos 13:7-8", "Isaías 40:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Agustín buscó la verdad en la filosofía y en los placeres, mientras su madre, Mónica, oraba por él. En el año 386 oyó una voz que decía toma y lee, leyó Romanos 13:13-14 y se convirtió. Llegó a ser obispo de Hipona y, frente a Pelagio, que decía que podemos obedecer a Dios con nuestras propias fuerzas, enseñó que la salvación es por gracia, como dice Efesios 2:8. Siglos después, Juan Hus, en Praga, leyó a Wiclef y predicó la Biblia en la lengua del pueblo contra los abusos de la iglesia. Lo llamaron al Concilio de Constanza con la promesa de que volvería a salvo, pero lo condenaron y lo quemaron en la hoguera en 1415. Prefirió obedecer a Dios antes que a los hombres (Hechos 5:29). De Agustín aprendo que nadie está demasiado lejos para la gracia de Dios, y de Hus, que la Palabra vale más que la propia vida. Voy a orar por los míos que no conocen a Cristo, como Mónica, y voy a leer la Biblia cada día con gratitud por los que la pusieron a mi alcance.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-historia-1-b1",
    tipo: "breve",
    pregunta:
      "Escoge un personaje o un momento de la historia de la iglesia de esta materia (por ejemplo, Pentecostés, Policarpo, Atanasio, Agustín o Juan Hus). Cuenta con exactitud qué pasó y cuándo, explica qué enseña sobre la fidelidad de Dios y de su pueblo, y di cómo lo aplicarás en tu vida o en tu iglesia. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "personaje", peso: 15, texto: "El personaje o el momento escogido.", formas: ["escogi", "pentecostes", "policarpo", "atanasio", "agustin", "hus", "wiclef", "valdo", "perpetua", "nicea", "ireneo", "justino", "esteban"] },
      { id: "hecho", peso: 20, texto: "Qué pasó, contado con exactitud.", formas: ["paso", "ocurrio", "sucedio", "murio", "escribio", "predico", "confeso", "defendio", "convirtio", "arrestaron"] },
      { id: "fecha", peso: 15, texto: "Cuándo pasó.", formas: ["año", "ano", "siglo", "hacia el"] },
      { id: "fidelidad", peso: 20, texto: "Qué enseña sobre la fidelidad de Dios y de su pueblo.", formas: ["fidelidad", "fiel*", "sostiene", "sostuvo", "promesa", "cumpl*"] },
      { id: "aplicacion", peso: 20, texto: "Cómo lo aplicará en su vida o en su iglesia.", formas: ["voy a", "aplic*", "mi vida", "mi iglesia", "esta semana"] },
      { id: "leccion", peso: 10, texto: "Una enseñanza: la Palabra, la gracia, el valor o la obediencia.", formas: ["palabra", "gracia", "valor", "obedecer", "testimonio", "verdad"] },
    ],
    basta: 85,
    citas: ["Hebreos 13:8", "Hebreos 13:7-8", "Hebreos 13:7", "Mateo 16:18", "Apocalipsis 2:10", "Hechos 2:41-42", "Hechos 5:29", "Juan 1:1", "Juan 1:14", "Romanos 13:13-14", "Efesios 2:8", "Salmos 119:105", "Isaías 40:8", "Hebreos 12:1"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí a Policarpo, obispo de Esmirna. Hacia el año 155, cuando ya era anciano, las autoridades romanas lo arrestaron y le exigieron que maldijera a Cristo para salvar su vida. Él respondió que había servido a Cristo ochenta y seis años y que nunca le había hecho ningún mal; ¿cómo iba a negar a su Rey, que lo salvó? Murió como mártir. Su historia me recuerda lo que Jesús le había dicho a esa misma iglesia: sé fiel hasta la muerte, y yo te daré la corona de la vida (Apocalipsis 2:10). Enseña que Dios es fiel y sostiene a los suyos en la prueba, y que su pueblo puede ser fiel porque Jesucristo es el mismo ayer, y hoy, y por los siglos (Hebreos 13:8). Lo voy a aplicar en mi vida así: cuando en mi trabajo se burlen de mi fe, voy a responder sin odio y sin esconder que soy cristiano. Y en mi iglesia voy a contar esta historia a los jóvenes, para que aprendan que la fidelidad empieza en las decisiones pequeñas de cada día.",
  },
};
