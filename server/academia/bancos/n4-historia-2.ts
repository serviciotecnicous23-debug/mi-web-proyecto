/**
 * El banco de «Historia de la iglesia II» (Nivel 4). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 Lutero y la Reforma · o2 la Reforma se extiende · o3 puritanos, pietistas y el gran despertar ·
 * o4 las misiones modernas y los avivamientos del siglo XIX · o5 el movimiento pentecostal · o6 la iglesia evangélica en
 * América Latina · o7 el versículo de memoria (Romanos 1:17).
 * Los hechos y las fechas son los de las lecciones (González, Historia del cristianismo; Deiros, Historia del
 * cristianismo en América Latina). La doctrina del bautismo en el Espíritu no se evalúa aquí: es de otra materia.
 * En la corta de «dos de tres» movimientos, `basta` evita exigir todos.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-historia-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_HISTORIA_2: BancoMateria = {
  materia: "n4-historia-2",
  repaso: {
    "n4-historia-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué entendió Martín Lutero al estudiar la carta a los Romanos?", "Que la justicia que Dios pide, Dios mismo la da por gracia a quien cree en Cristo", ["Que la salvación se podía comprar con indulgencias", "Que solo los monjes podían salvarse", "Que la Biblia no era para el pueblo"], "«Mas el justo por la fe vivirá».", "Romanos 1:17"],
      ["1-r2", 1, "o1", "recordar", "¿Qué publicó Lutero el 31 de octubre de 1517?", "Sus 95 tesis contra el abuso de las indulgencias", ["La Biblia del Oso", "La Institución de la religión cristiana", "El Nuevo Testamento en inglés"], "Las indulgencias se vendían como si el perdón se comprara, pero la salvación «es don de Dios».", "Efesios 2:8"],
      ["1-r3", 1, "o1", "comprender", "¿Qué afirma el principio de solo Cristo?", "Que Cristo es el único mediador entre Dios y los hombres", ["Que hay muchos mediadores", "Que los ángeles son mediadores", "Que no hace falta mediador"], "«Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre».", "1 Timoteo 2:5"],
    ] as P[]).map(p),
    "n4-historia-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Quién publicó en 1569 la primera Biblia completa traducida al español de los idiomas originales?", "Casiodoro de Reina", ["Cipriano de Valera", "William Tyndale", "Juan Calvino"], "Fue la Biblia del Oso, y la palabra de Dios «permanece para siempre».", "Isaías 40:8"],
      ["2-r2", 2, "o2", "recordar", "¿Quién escribió la Institución de la religión cristiana (1536)?", "Juan Calvino", ["Martín Lutero", "Ulrico Zuinglio", "Juan Wesley"], "Los reformadores examinaban todo con la Biblia, como los de Berea, que escudriñaban «cada día las Escrituras».", "Hechos 17:11"],
      ["2-r3", 2, "o2", "comprender", "¿Qué rechazó el Concilio de Trento?", "La justificación solo por la fe", ["Toda corrección de abusos", "La existencia de Dios", "El bautismo"], "La Reforma enseñaba: «Concluimos, pues, que el hombre es justificado por fe sin las obras de la ley».", "Romanos 3:28"],
    ] as P[]).map(p),
    "n4-historia-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pidió Habacuc en su oración, según Habacuc 3:2?", "Que Dios avivara su obra en medio de los tiempos", ["Que Dios lo llevara al cielo", "Que Dios le diera riquezas", "Que Dios guardara silencio"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
      ["3-r2", 3, "o3", "recordar", "¿Qué recibió Juan Wesley el 24 de mayo de 1738, en la calle Aldersgate de Londres?", "La seguridad de que Cristo había quitado sus pecados", ["El cargo de obispo", "Una carta del rey", "Un mapa del mundo"], "«El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».", "Romanos 8:16"],
      ["3-r3", 3, "o3", "comprender", "¿Qué comenzaron los moravos en Herrnhut en 1727?", "Una cadena de oración que duró unos cien años", ["Una universidad", "Un concilio", "Una guerra religiosa"], "«Orad sin cesar».", "1 Tesalonicenses 5:17"],
    ] as P[]).map(p),
    "n4-historia-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Quién fue William Carey?", "Un zapatero y pastor bautista que partió como misionero a la India", ["Un rey de Inglaterra", "El fundador de la Misión al Interior de China", "Un reformador alemán"], "Predicó sobre Isaías 54: «Ensancha el sitio de tu tienda».", "Isaías 54:2"],
      ["4-r2", 4, "o4", "recordar", "¿Qué fundó Hudson Taylor en 1865?", "La Misión al Interior de China", ["Las Asambleas de Dios", "La Iglesia Metodista Pentecostal", "La escuela bíblica de Topeka"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19"],
      ["4-r3", 4, "o4", "comprender", "¿Qué buscaba el movimiento de santidad?", "Una experiencia de consagración y de poder después de la conversión", ["Volver a las indulgencias", "Dejar de evangelizar", "Separarse de la Biblia"], "«Sed santos, porque yo soy santo».", "1 Pedro 1:16"],
    ] as P[]).map(p),
    "n4-historia-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Dónde y cuándo comenzó el avivamiento que dirigió William J. Seymour?", "En la calle Azusa de Los Ángeles, en 1906", ["En Topeka, en 1901", "En Wittenberg, en 1517", "En Valparaíso, en 1909"], "Se oraba por la promesa: «derramaré mi Espíritu sobre toda carne».", "Joel 2:28"],
      ["5-r2", 5, "o5", "recordar", "¿Cuándo y dónde se organizaron las Asambleas de Dios en los Estados Unidos?", "En 1914, en Hot Springs, Arkansas", ["En 1906, en Los Ángeles", "En 1901, en Topeka", "En 1792, en Inglaterra"], "Fue una de las primeras denominaciones pentecostales.", "Hechos 2:4"],
      ["5-r3", 5, "o5", "comprender", "¿Qué fue la renovación carismática?", "La llegada de la experiencia pentecostal a iglesias históricas, desde 1960", ["Un concilio del siglo XVI", "La Reforma de Lutero", "Una misión a China"], "«Y fueron todos llenos del Espíritu Santo».", "Hechos 2:4"],
    ] as P[]).map(p),
    "n4-historia-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Quién fue Diego Thomson?", "Un escocés que hacia 1820 repartió Biblias y promovió escuelas en América del Sur", ["Un reformador alemán", "El predicador de la calle Azusa", "Un misionero sueco en Brasil"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14"],
      ["6-r2", 6, "o6", "recordar", "¿Dónde nació en 1909 la Iglesia Metodista Pentecostal?", "En Valparaíso, Chile, con el misionero Willis Hoover", ["En Belém, Brasil", "En Los Ángeles", "En Sevilla"], "El evangelio llegó «hasta lo último de la tierra».", "Hechos 1:8"],
      ["6-r3", 6, "o6", "recordar", "¿Quién fue Francisco Olazábal?", "Un evangelista mexicano que predicó a miles en los Estados Unidos, México y Puerto Rico", ["Un monje de Sevilla", "Un misionero sueco", "Un reformador suizo"], "«¡Cuán hermosos son los pies de los que anuncian la paz, de los que anuncian buenas nuevas!».", "Romanos 10:15"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: Lutero y la Reforma (10)
    ["f01", 1, "o1", "recordar", "¿Dónde era profesor de Biblia Martín Lutero?", "En Wittenberg", ["En Ginebra", "En Zúrich", "En Londres"], "Allí, estudiando Romanos, entendió que «el justo por la fe vivirá».", "Romanos 1:17"],
    ["f02", 1, "o1", "recordar", "¿Qué eran las indulgencias que se vendían en tiempos de Lutero?", "Documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero", ["Biblias en alemán", "Cartas de los misioneros", "Ofrendas para los pobres"], "Pero la salvación es «no por obras, para que nadie se gloríe».", "Efesios 2:9"],
    ["f03", 1, "o1", "recordar", "¿Qué hizo Lutero en 1521 ante la Dieta de Worms?", "Se negó a retractarse si no lo convencían con la Escritura y con razones claras", ["Se retractó de todo lo que había escrito", "Huyó a América", "Aceptó vender indulgencias"], "«Es necesario obedecer a Dios antes que a los hombres».", "Hechos 5:29"],
    ["f04", 1, "o1", "recordar", "¿Qué tradujo Lutero mientras estaba escondido en el castillo de Wartburgo?", "El Nuevo Testamento al alemán, publicado en 1522", ["La Biblia al español", "Los salmos al inglés", "El Antiguo Testamento al latín"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f05", 1, "o1", "comprender", "¿Qué afirma el principio de solo la Escritura?", "Que la Biblia es la autoridad final, por encima de las tradiciones", ["Que la tradición vale más que la Biblia", "Que solo los sacerdotes pueden leer la Biblia", "Que no se deben leer otros libros"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
    ["f06", 1, "o1", "comprender", "¿Qué afirman los principios de solo la gracia y solo la fe?", "Que la salvación es un regalo que se recibe por la fe en Cristo, no por obras", ["Que la salvación se gana con buenas obras", "Que la gracia se compra", "Que la fe no es necesaria"], "«Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios».", "Efesios 2:8"],
    ["f07", 1, "o1", "comprender", "¿Qué es el sacerdocio de todos los creyentes?", "Que todo creyente tiene acceso a Dios por Cristo", ["Que todos deben ser ordenados sacerdotes", "Que en la iglesia no debe haber pastores", "Que solo los monjes pueden orar"], "«Mas vosotros sois linaje escogido, real sacerdocio».", "1 Pedro 2:9"],
    ["f08", 1, "o1", "analizar", "¿Por qué se dice que la Reforma recuperó el corazón del evangelio?", "Porque volvió a enseñar que somos justificados por gracia, por medio de la fe en Cristo", ["Porque inventó una doctrina nueva", "Porque quitó la Biblia al pueblo", "Porque fundó una iglesia del Estado"], "«Mas el justo por la fe vivirá».", "Romanos 1:17"],
    ["f09", 1, "o1", "evaluar", "¿Qué quería Lutero, según la lección?", "Llamar a la iglesia de su tiempo a volver a la Biblia, no fundar otra iglesia", ["Fundar una iglesia nueva desde el principio", "Hacerse famoso", "Separar a Alemania de Europa"], "Toda iglesia necesita examinarse con la Escritura, como los de Berea, que escudriñaban «cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
    ["f10", 1, "o7", "recordar", "Completa Romanos 1:17: Porque en el evangelio la justicia de Dios se revela por fe y para fe, como está escrito…", "Mas el justo por la fe vivirá", ["Mas el justo por sus obras vivirá", "Mas el sabio por su ciencia vivirá", "Mas el fuerte por su espada vivirá"], "Es el versículo de memoria de la materia.", "Romanos 1:17"],
    // ---- lección 2: la Reforma se extiende (10)
    ["f11", 2, "o2", "recordar", "¿Qué comenzó Ulrico Zuinglio en 1519 en Zúrich?", "A predicar la Biblia libro por libro", ["A vender indulgencias", "A traducir la Biblia al español", "A enviar misioneros a la India"], "Como los de Berea, escudriñaba «cada día las Escrituras».", "Hechos 17:11"],
    ["f12", 2, "o2", "recordar", "¿Dónde enseñó Juan Calvino?", "En Ginebra", ["En Wittenberg", "En Sevilla", "En Herrnhut"], "Su teología marcó a las iglesias reformadas y presbiterianas.", "Hechos 17:11"],
    ["f13", 2, "o2", "comprender", "¿Qué enseñaban los anabautistas desde 1525?", "Que se bautizara solo a los creyentes que confesaban su fe y que la iglesia no dependiera del Estado", ["Que se bautizara a todos por la fuerza", "Que la iglesia obedeciera al Estado en todo", "Que no había que bautizar a nadie"], "«El que creyere y fuere bautizado, será salvo».", "Marcos 16:16"],
    ["f14", 2, "o2", "recordar", "¿Quiénes persiguieron a los anabautistas?", "Católicos y protestantes", ["Solo los reyes de Inglaterra", "Nadie", "Solo los moravos"], "«Y también todos los que quieren vivir piadosamente en Cristo Jesús padecerán persecución».", "2 Timoteo 3:12"],
    ["f15", 2, "o2", "recordar", "¿Qué hizo William Tyndale?", "Tradujo el Nuevo Testamento al inglés (1526) y murió ejecutado en 1536", ["Fundó el metodismo", "Escribió las 95 tesis", "Presidió el Concilio de Trento"], "«Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    ["f16", 2, "o2", "recordar", "¿De qué monasterio de Sevilla huyó un grupo de monjes que abrazaron la Reforma?", "San Isidoro del Campo", ["Wartburgo", "Herrnhut", "Aldersgate"], "Entre ellos estaban Casiodoro de Reina y Cipriano de Valera.", "Isaías 40:8"],
    ["f17", 2, "o2", "recordar", "¿Quién revisó en 1602 la Biblia de Casiodoro de Reina?", "Cipriano de Valera", ["Martín Lutero", "Diego Thomson", "Juan Wesley"], "De esa obra viene la Reina-Valera.", "Isaías 40:8"],
    ["f18", 2, "o2", "comprender", "¿Qué declaró el Concilio de Trento sobre la tradición?", "Que se recibe con la misma reverencia que la Escritura", ["Que no tiene ningún valor", "Que está siempre por debajo de la Biblia", "Que debía abandonarse"], "La Reforma, en cambio, afirmó que la Escritura es la autoridad final: «Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
    ["f19", 2, "o2", "recordar", "¿Cómo se llamó la Biblia que publicó Casiodoro de Reina en 1569?", "La Biblia del Oso", ["La Biblia de Ginebra", "La Vulgata", "La Biblia de Lutero"], "Fue la primera Biblia completa traducida al español de los idiomas originales.", "Isaías 40:8"],
    ["f20", 2, "o2", "evaluar", "¿Por qué el creyente de hoy debe leer con gratitud la Biblia en su idioma?", "Porque traducirla y difundirla costó persecución y aun la vida de muchos", ["Porque siempre fue fácil tenerla", "Porque es solo un libro de historia", "No hay ningún motivo"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
    // ---- lección 3: puritanos, pietistas y el gran despertar (10)
    ["f21", 3, "o3", "recordar", "¿Qué buscaron los puritanos en Inglaterra?", "Purificar la iglesia y vivir toda la vida bajo la Palabra", ["Volver a las indulgencias", "Separar la fe de la vida diaria", "Abolir la predicación"], "«Lámpara es a mis pies tu palabra, Y lumbrera a mi camino».", "Salmos 119:105"],
    ["f22", 3, "o3", "recordar", "¿Quiénes guiaron el pietismo alemán?", "Felipe Jacobo Spener y Augusto Francke", ["Lutero y Calvino", "Wesley y Whitefield", "Carey y Taylor"], "Llamaron a una fe del corazón.", "Habacuc 3:2"],
    ["f23", 3, "o3", "comprender", "¿A qué llamó el pietismo?", "A la piedad personal, al estudio de la Biblia en grupos y a las obras de misericordia", ["A abandonar la Biblia", "A dejar la oración", "A la guerra religiosa"], "«Visitar a los huérfanos y a las viudas en sus tribulaciones».", "Santiago 1:27"],
    ["f24", 3, "o3", "recordar", "¿Qué hicieron los moravos, además de orar?", "Enviaron misioneros a muchos lugares del mundo", ["Fundaron un imperio", "Dejaron de evangelizar", "Se unieron al Concilio de Trento"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19"],
    ["f25", 3, "o3", "recordar", "¿Qué se leía cuando Juan Wesley sintió que su corazón ardía de una manera extraña?", "El prefacio de Lutero a la carta a los Romanos", ["Un sermón de Calvino", "El libro de Apocalipsis", "Las 95 tesis"], "«El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».", "Romanos 8:16"],
    ["f26", 3, "o3", "comprender", "¿Cómo se cuidaba a los miles de nuevos creyentes del avivamiento de Wesley?", "En los grupos metodistas", ["Dejándolos solos", "Con indulgencias", "Con un culto al año"], "«enseñándoles que guarden todas las cosas que os he mandado».", "Mateo 28:20"],
    ["f27", 3, "o3", "recordar", "¿Quiénes predicaron en el Gran Despertar de las colonias inglesas de América?", "Jonathan Edwards y George Whitefield", ["Lutero y Zuinglio", "Parham y Seymour", "Berg y Vingren"], "Dios respondió la oración por avivamiento.", "Habacuc 3:2"],
    ["f28", 3, "o3", "recordar", "¿Desde cuándo hubo un gran despertar en las colonias inglesas de América?", "Desde la década de 1730", ["Desde 1517", "Desde 1906", "Desde 1960"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
    ["f29", 3, "o3", "analizar", "¿Qué unieron los avivamientos de los siglos XVII y XVIII?", "La sana doctrina con una fe viva: conversión personal, santidad, oración y misión", ["La política con la religión", "La doctrina con las indulgencias", "Nada"], "«Ten cuidado de ti mismo y de la doctrina».", "1 Timoteo 4:16"],
    ["f30", 3, "o3", "evaluar", "¿Qué pasa con la doctrina sin vida o con la vida sin doctrina, según la lección?", "Una cosa sin la otra se enfría o se desvía", ["Las dos funcionan igual de bien", "La doctrina no importa", "La vida espiritual no importa"], "«Ten cuidado de ti mismo y de la doctrina; persiste en ello».", "1 Timoteo 4:16"],
    // ---- lección 4: las misiones modernas y los avivamientos del siglo XIX (10)
    ["f31", 4, "o4", "recordar", "¿Sobre qué capítulo predicó William Carey en 1792?", "Isaías 54", ["Romanos 1", "Joel 2", "Habacuc 3"], "«Ensancha el sitio de tu tienda».", "Isaías 54:2"],
    ["f32", 4, "o4", "recordar", "¿Qué lema se hizo famoso con William Carey?", "Esperar grandes cosas de Dios e intentar grandes cosas para Dios", ["Orar sin trabajar", "Dios ayuda a quien se ayuda", "Cada uno en su tierra"], "«alarga tus cuerdas, y refuerza tus estacas».", "Isaías 54:2"],
    ["f33", 4, "o4", "recordar", "¿A dónde partió William Carey como misionero?", "A la India", ["A China", "A Brasil", "A Chile"], "Allí trabajó en traducir la Biblia a varias lenguas.", "Mateo 28:19"],
    ["f34", 4, "o4", "comprender", "¿Qué insistió William Carey sobre la gran comisión?", "Que seguía vigente para la iglesia de su tiempo", ["Que era solo para los apóstoles", "Que ya se había cumplido", "Que no era necesaria"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19"],
    ["f35", 4, "o4", "comprender", "¿Por qué Hudson Taylor se vistió como los chinos?", "Para acercarse a ellos y llevar el evangelio al interior del país", ["Para esconderse de las autoridades", "Por una moda inglesa", "Para hacer negocios"], "«a todos me he hecho de todo, para que de todos modos salve a algunos».", "1 Corintios 9:22"],
    ["f36", 4, "o4", "recordar", "¿Adónde llevaron el evangelio miles de misioneros en el siglo XIX?", "A África, Asia y América Latina", ["Solo a Europa", "A ninguna parte", "Solo a Inglaterra"], "Obedecían el mandato de hacer «discípulos a todas las naciones».", "Mateo 28:19"],
    ["f37", 4, "o4", "recordar", "¿Qué hubo en los Estados Unidos a comienzos del siglo XIX?", "Un segundo gran despertar, con grandes campamentos de oración y predicación", ["La Reforma de Lutero", "El Concilio de Trento", "La renovación carismática"], "«aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
    ["f38", 4, "o4", "recordar", "¿Qué evangelistas llamaron a multitudes a la conversión en el siglo XIX?", "Charles Finney y D. L. Moody", ["Lutero y Calvino", "Edwards y Whitefield", "Seymour y Parham"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14"],
    ["f39", 4, "o4", "analizar", "¿De qué movimiento nació el movimiento de santidad?", "Del metodismo", ["Del Concilio de Trento", "De la renovación carismática", "De los anabautistas"], "«Sed santos, porque yo soy santo».", "1 Pedro 1:16"],
    ["f40", 4, "o4", "evaluar", "¿Cómo prepararon el camino del pentecostalismo los movimientos del siglo XIX?", "Muchos de sus grupos oraban por un nuevo derramamiento del Espíritu", ["Prohibieron la oración", "Dejaron de predicar", "No tuvieron ninguna relación"], "«derramaré mi Espíritu sobre toda carne».", "Joel 2:28"],
    // ---- lección 5: el movimiento pentecostal (10)
    ["f41", 5, "o5", "recordar", "¿Qué pasó el 1 de enero de 1901 en una escuela bíblica de Topeka, Kansas?", "Agnes Ozman habló en lenguas mientras oraban por ella", ["Se organizaron las Asambleas de Dios", "Comenzó el avivamiento de la calle Azusa", "Se fundó la Misión al Interior de China"], "La escuela la dirigía Charles Parham.", "Joel 2:28"],
    ["f42", 5, "o5", "recordar", "¿Quién fue William J. Seymour?", "Un predicador afroamericano, hijo de antiguos esclavos, que dirigió el avivamiento de la calle Azusa", ["Un misionero sueco en Brasil", "Un reformador suizo", "Un obispo anglicano"], "«Y fueron todos llenos del Espíritu Santo».", "Hechos 2:4"],
    ["f43", 5, "o5", "recordar", "¿Cuánto duró el avivamiento de la calle Azusa?", "Unos tres años", ["Un solo día", "Unos cien años", "Un mes"], "«Cuando llegó el día de Pentecostés, estaban todos unánimes juntos».", "Hechos 2:1"],
    ["f44", 5, "o5", "analizar", "¿Por qué fue notable que en la calle Azusa oraran juntos negros, blancos e hispanos?", "Porque era una época de fuerte separación racial", ["Porque estaba prohibido orar", "Porque no había iglesias en la ciudad", "No fue notable"], "«porque todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
    ["f45", 5, "o5", "recordar", "¿Qué iglesias que ya existían se hicieron pentecostales entre 1907 y 1908?", "La Iglesia de Dios en Cristo y la Iglesia de Dios de Cleveland, Tennessee", ["La Iglesia anglicana y la luterana", "Las Asambleas de Dios de Brasil", "La Iglesia Metodista Pentecostal de Chile"], "El mensaje de Azusa se extendió a iglesias que ya existían.", "Hechos 2:4"],
    ["f46", 5, "o5", "recordar", "¿De la obra de quién nació la Iglesia Internacional del Evangelio Cuadrangular?", "De Aimee Semple McPherson, en Los Ángeles", ["De Charles Parham, en Topeka", "De Juan Wesley, en Londres", "De Willis Hoover, en Chile"], "Nació en la década de 1920.", "Hechos 1:8"],
    ["f47", 5, "o5", "comprender", "¿Qué llevaron por todo el mundo los misioneros que salieron de la calle Azusa?", "El mensaje pentecostal", ["Las 95 tesis", "Los decretos de Trento", "Las indulgencias"], "«y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
    ["f48", 5, "o5", "recordar", "¿Desde cuándo llegó la experiencia pentecostal a iglesias históricas, como la episcopal, la luterana y la católica?", "Desde 1960", ["Desde 1517", "Desde 1738", "Desde 1901"], "Se llamó la renovación carismática.", "Joel 2:28"],
    ["f49", 5, "o5", "recordar", "¿Dónde están hoy la mayoría de los pentecostales y carismáticos?", "Sobre todo en América Latina, África y Asia", ["Solo en Europa", "Solo en los Estados Unidos", "En ningún lugar en particular"], "Hoy son cientos de millones, y el evangelio llega «hasta lo último de la tierra».", "Hechos 1:8"],
    ["f50", 5, "o5", "evaluar", "¿Qué enseña a la iglesia de hoy el avivamiento de la calle Azusa?", "Que la oración perseverante y la unidad entre creyentes de distintos orígenes abren paso a la obra del Espíritu", ["Que la oración no importa", "Que cada raza debe tener su propia iglesia", "Que los avivamientos son cosa del pasado"], "«Todos éstos perseveraban unánimes en oración y ruego».", "Hechos 1:14"],
    // ---- lección 6: la iglesia evangélica en América Latina (10)
    ["f51", 6, "o6", "recordar", "¿Qué fe llegó a América durante la colonia?", "La católica, y los protestantes casi no podían entrar", ["La luterana", "La pentecostal", "La anabautista"], "«¿Y cómo creerán en aquel de quien no han oído?».", "Romanos 10:14"],
    ["f52", 6, "o6", "recordar", "¿Qué eran los colportores?", "Vendedores de Biblias", ["Soldados", "Jueces", "Vendedores de indulgencias"], "«¡Cuán hermosos son los pies de los que anuncian la paz, de los que anuncian buenas nuevas!».", "Romanos 10:15"],
    ["f53", 6, "o6", "recordar", "¿Cuándo llegaron a América Latina los colportores y los misioneros protestantes?", "Con la independencia de los países, en el siglo XIX", ["En el siglo XVI, con la conquista", "En 1960", "Nunca llegaron"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14"],
    ["f54", 6, "o6", "recordar", "¿Quién guiaba la iglesia metodista de Valparaíso cuando llegó el avivamiento de 1909?", "El misionero Willis Hoover", ["Diego Thomson", "Gunnar Vingren", "Charles Parham"], "De allí nació la Iglesia Metodista Pentecostal.", "Hechos 1:8"],
    ["f55", 6, "o6", "recordar", "¿Quiénes fundaron en Belém, Brasil, en 1911, la iglesia que llegaría a ser las Asambleas de Dios?", "Los misioneros suecos Daniel Berg y Gunnar Vingren", ["Juan Wesley y George Whitefield", "Charles Parham y Agnes Ozman", "Casiodoro de Reina y Cipriano de Valera"], "El evangelio llegó «hasta lo último de la tierra».", "Hechos 1:8"],
    ["f56", 6, "o6", "comprender", "¿Cómo creció el pentecostalismo en América Latina durante el siglo XX?", "Sobre todo entre los pobres, con pastores del lugar y la Biblia en la mano", ["Solo entre los ricos", "Solo con misioneros extranjeros", "Sin la Biblia"], "«mirad, hermanos, vuestra vocación, que no sois muchos sabios según la carne, ni muchos poderosos, ni muchos nobles».", "1 Corintios 1:26"],
    ["f57", 6, "o6", "recordar", "¿Qué fundó Francisco Olazábal?", "El Concilio Latinoamericano de Iglesias Cristianas", ["La Misión al Interior de China", "Las Asambleas de Dios de Brasil", "La Iglesia Metodista Pentecostal"], "Predicó a miles en las décadas de 1920 y 1930.", "Romanos 10:15"],
    ["f58", 6, "o6", "analizar", "¿Desde cuándo hubo hispanos entre los pentecostales de los Estados Unidos?", "Desde la calle Azusa", ["Desde 1960", "Desde la Reforma", "Nunca los hubo"], "En Azusa oraban juntos creyentes de muchas naciones: «porque todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
    ["f59", 6, "o6", "evaluar", "¿Qué muestra que hoy el evangelio salga de América Latina hacia otras naciones?", "Que la promesa de Jesús se sigue cumpliendo: los que recibieron el evangelio ahora lo llevan a otros", ["Que América Latina ya no necesita el evangelio", "Que las misiones terminaron", "Que solo Europa envía misioneros"], "«y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
    ["f60", 6, "o6", "evaluar", "¿Por qué le conviene a un obrero hispano conocer esta historia?", "Porque es parte de ella, y conocerla le ayuda a ser fiel en su generación", ["Porque sirve para presumir", "No le conviene", "Porque reemplaza el estudio de la Biblia"], "«Jesucristo es el mismo ayer, y hoy, y por los siglos».", "Hebreos 13:8"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿En qué años vivió Martín Lutero?", "1483-1546", ["1703-1791", "1761-1834", "1832-1905"], "Fue monje y profesor de Biblia en Wittenberg.", "Romanos 1:17"],
      ["m1-02", 1, "o1", "recordar", "¿Qué pidió Lutero en Worms para retractarse?", "Que lo convencieran con la Escritura y con razones claras", ["Dinero", "Un cargo en la iglesia", "Nada: se retractó enseguida"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
      ["m1-03", 1, "o1", "comprender", "¿Qué quiere decir que la justicia de Dios se revela por fe?", "Que Dios da su justicia por gracia a quien cree en Cristo", ["Que la justicia se gana con obras", "Que Dios no es justo", "Que la fe no importa"], "«Porque en el evangelio la justicia de Dios se revela por fe y para fe».", "Romanos 1:17"],
      ["m1-04", 1, "o1", "aplicar", "Un creyente piensa que debe ganarse el amor de Dios con sus obras. ¿Qué principio de la Reforma le ayuda?", "Solo la gracia: la salvación es un regalo que no merecemos", ["Solo la tradición", "Solo las obras", "Solo el esfuerzo"], "«no por obras, para que nadie se gloríe».", "Efesios 2:9"],
      ["m1-05", 1, "o1", "recordar", "¿Qué anuncia el pueblo de Dios como real sacerdocio, según 1 Pedro 2:9?", "Las virtudes de aquel que lo llamó de las tinieblas a su luz admirable", ["Sus propias virtudes", "Las leyes del Estado", "Las tradiciones humanas"], "«para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable».", "1 Pedro 2:9"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué nos recuerda hoy la Reforma, según la lección?", "Que toda iglesia necesita examinarse a la luz de la Escritura", ["Que hay que dividirse por cualquier cosa", "Que la tradición está por encima de la Biblia", "Que la historia no importa"], "«escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
      ["m1-07", 2, "o2", "recordar", "¿Qué hacían los de Berea, según Hechos 17:11?", "Escudriñaban cada día las Escrituras para ver si estas cosas eran así", ["Perseguían a Pablo", "Ignoraban las Escrituras", "Escuchaban sin examinar"], "«escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
      ["m1-08", 2, "o2", "recordar", "¿En qué año publicó William Tyndale el Nuevo Testamento en inglés?", "En 1526", ["En 1602", "En 1738", "En 1906"], "Murió ejecutado en 1536.", "Isaías 40:8"],
      ["m1-09", 2, "o2", "comprender", "¿De qué obra viene la Reina-Valera?", "De la Biblia de Casiodoro de Reina (1569), revisada por Cipriano de Valera (1602)", ["De la Biblia de Lutero", "De la traducción de Tyndale", "De la Vulgata latina"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["m1-10", 2, "o2", "recordar", "¿Cuándo se reunió el Concilio de Trento?", "Entre 1545 y 1563", ["En 1517", "En 1901", "En 1792"], "Rechazó lo que la Reforma enseñaba: «Concluimos, pues, que el hombre es justificado por fe sin las obras de la ley».", "Romanos 3:28"],
      ["m1-11", 2, "o2", "analizar", "¿Por qué los anabautistas fueron perseguidos por católicos y protestantes?", "Porque bautizaban solo a los creyentes y pedían que la iglesia no dependiera del Estado", ["Porque vendían indulgencias", "Porque negaban a Cristo", "Porque no leían la Biblia"], "«Y también todos los que quieren vivir piadosamente en Cristo Jesús padecerán persecución».", "2 Timoteo 3:12"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué nos recuerdan los creyentes españoles perseguidos por la Inquisición?", "Que la Biblia en nuestro idioma costó sangre, y que hay que leerla con gratitud", ["Que la Reforma no llegó a España", "Que la Biblia en español fue fácil de hacer", "Que nunca hubo persecución"], "«Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["m1-13", 3, "o3", "recordar", "¿Dónde estaban los moravos que comenzaron una cadena de oración en 1727?", "En Herrnhut", ["En Ginebra", "En Topeka", "En Belém"], "«Orad sin cesar».", "1 Tesalonicenses 5:17"],
      ["m1-14", 3, "o3", "recordar", "¿Qué era Juan Wesley antes de su experiencia de 1738?", "Un ministro anglicano que servía con disciplina, pero sin paz", ["Un monje alemán", "Un zapatero bautista", "Un misionero en China"], "«El Espíritu mismo da testimonio a nuestro espíritu».", "Romanos 8:16"],
      ["m1-15", 3, "o3", "comprender", "¿Dónde predicó Juan Wesley durante décadas?", "Al aire libre", ["Solo en catedrales", "Solo por carta", "En ninguna parte"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14"],
      ["m1-16", 3, "o3", "recordar", "¿Quién era George Whitefield?", "Un amigo de Wesley que predicó al aire libre a multitudes a los dos lados del Atlántico", ["Un reformador suizo", "Un misionero en la India", "El fundador de las Asambleas de Dios"], "Fue uno de los predicadores del Gran Despertar.", "Habacuc 3:2"],
      ["m1-17", 3, "o3", "analizar", "¿Qué problema había en muchas iglesias después de la Reforma, según la lección?", "Tenían la doctrina correcta, pero poca vida", ["No tenían Biblia", "No tenían doctrina", "Estaban llenas de avivamiento"], "«Oh Jehová, aviva tu obra en medio de los tiempos».", "Habacuc 3:2"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué necesita una iglesia sana, según la historia de los avivamientos?", "La sana doctrina y una fe viva, juntas", ["Solo doctrina, sin oración", "Solo emoción, sin doctrina", "Ninguna de las dos"], "«Ten cuidado de ti mismo y de la doctrina».", "1 Timoteo 4:16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En qué años vivió William Carey?", "1761-1834", ["1483-1546", "1703-1791", "1832-1905"], "Fue zapatero y pastor bautista.", "Isaías 54:2"],
      ["m2-02", 4, "o4", "recordar", "¿Qué tenía William Carey junto a su banco de trabajo, según la lección?", "Un mapa del mundo, y oraba por las naciones", ["Una lista de indulgencias", "Un retrato del rey", "Un reloj de oro"], "«Pídeme, y te daré por herencia las naciones».", "Salmos 2:8"],
      ["m2-03", 4, "o4", "comprender", "¿Qué hizo William Carey en la India?", "Trabajó en traducir la Biblia a varias lenguas", ["Fundó la Iglesia anglicana", "Vendió indulgencias", "Dirigió el avivamiento de Azusa"], "Así obedeció la gran comisión.", "Mateo 28:19"],
      ["m2-04", 4, "o4", "recordar", "¿En qué años vivió Hudson Taylor?", "1832-1905", ["1761-1834", "1483-1546", "1703-1791"], "Fundó en 1865 la Misión al Interior de China.", "Mateo 28:19"],
      ["m2-05", 4, "o4", "analizar", "¿Qué tenían en común William Carey y Hudson Taylor?", "Creyeron las promesas de Dios y obedecieron la gran comisión en tierras lejanas", ["Los dos fueron reformadores alemanes", "Los dos fundaron denominaciones pentecostales", "Ninguno salió de su país"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué enseña la historia de las misiones sobre las personas que Dios usa?", "Que Dios usa a personas sencillas que creen sus promesas y obedecen", ["Que solo usa a los ricos", "Que solo usa a los famosos", "Que ya no usa a nadie"], "«lo necio del mundo escogió Dios, para avergonzar a los sabios».", "1 Corintios 1:27"],
      ["m2-07", 5, "o5", "recordar", "¿Quién dirigía la escuela bíblica de Topeka donde Agnes Ozman habló en lenguas en 1901?", "Charles Parham", ["William J. Seymour", "Charles Finney", "Willis Hoover"], "«derramaré mi Espíritu sobre toda carne».", "Joel 2:28"],
      ["m2-08", 5, "o5", "recordar", "¿Por qué oraban muchos creyentes del movimiento de santidad?", "Por un nuevo Pentecostés", ["Por volver a Roma", "Por el fin de las misiones", "Por un rey"], "«Y después de esto derramaré mi Espíritu sobre toda carne».", "Joel 2:28"],
      ["m2-09", 5, "o5", "comprender", "¿Qué pasó el día de Pentecostés, según Hechos 2:4?", "Fueron todos llenos del Espíritu Santo y comenzaron a hablar en otras lenguas", ["Se escribieron las 95 tesis", "Pedro fue encarcelado", "No pasó nada"], "«Y fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».", "Hechos 2:4"],
      ["m2-10", 5, "o5", "recordar", "¿Dónde se organizaron las Asambleas de Dios en 1914?", "En Hot Springs, Arkansas", ["En Topeka, Kansas", "En Belém, Brasil", "En Valparaíso, Chile"], "Fue una de las primeras denominaciones pentecostales.", "Hechos 2:4"],
      ["m2-11", 5, "o5", "analizar", "¿Cómo se extendió el mensaje pentecostal desde la calle Azusa?", "Con misioneros que salieron de allí y lo llevaron a todo el mundo", ["Por la fuerza de un gobierno", "Solo por cartas", "No se extendió"], "«hasta lo último de la tierra».", "Hechos 1:8"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué muestra el crecimiento del pentecostalismo en el mundo de hoy, según la lección?", "Que el mismo Espíritu que vino en Pentecostés sigue obrando hoy", ["Que el Espíritu ya no obra", "Que los avivamientos son cosa del pasado", "Que solo crece en Europa"], "«Jesucristo es el mismo ayer, y hoy, y por los siglos».", "Hebreos 13:8"],
      ["m2-13", 6, "o6", "recordar", "¿En qué ciudad de Brasil fundaron Berg y Vingren su iglesia en 1911?", "En Belém", ["En Valparaíso", "En Los Ángeles", "En Sevilla"], "Llegaría a ser las Asambleas de Dios, hoy una de las iglesias más grandes del mundo.", "Hechos 1:8"],
      ["m2-14", 6, "o6", "recordar", "¿De dónde eran los misioneros Daniel Berg y Gunnar Vingren?", "De Suecia", ["De Escocia", "De Alemania", "De México"], "Obedecieron el mandato de ir a todas las naciones.", "Mateo 28:19"],
      ["m2-15", 6, "o6", "recordar", "¿Dónde predicó Francisco Olazábal en las décadas de 1920 y 1930?", "En los Estados Unidos, México y Puerto Rico", ["En China y la India", "En Suecia", "En Inglaterra"], "«¡Cuán hermosos son los pies de los que anuncian la paz».", "Romanos 10:15"],
      ["m2-16", 6, "o6", "comprender", "¿Qué promovió Diego Thomson, además de repartir Biblias?", "Escuelas en varios países de América del Sur", ["Guerras", "La venta de indulgencias", "Un concilio"], "Llevó la Palabra al pueblo.", "Romanos 10:14"],
      ["m2-17", 6, "o6", "analizar", "¿Qué cambió en América Latina desde que la Biblia empezó a circular entre el pueblo?", "Hoy millones de latinoamericanos leen la Palabra y la predican en su idioma", ["Nada cambió", "La Biblia dejó de leerse", "Solo los extranjeros la leen"], "«Así que la fe es por el oír, y el oír, por la palabra de Dios».", "Romanos 10:17"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál es la mejor respuesta de un creyente hispano ante esta historia?", "Escribir con fidelidad su propio capítulo, llevando el evangelio a la siguiente generación", ["Pensar que ya todo está hecho", "Olvidar el pasado", "Esperar que otros lo hagan"], "«Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-historia-2-e1",
      tipo: "corta",
      pregunta: "Explica qué descubrió Martín Lutero en la carta a los Romanos y qué principios recuperó la Reforma.",
      ideas: [
        { id: "justo", peso: 30, texto: "El justo por la fe vivirá: Dios da su justicia por gracia a quien cree.", formas: ["justo por la fe", "por la fe vivira", "justicia de dios", "justificad* por fe"] },
        { id: "escritura", peso: 15, texto: "Solo la Escritura.", formas: ["solo la escritura", "sola escritura", "autoridad final", "la biblia es la autoridad"] },
        { id: "gracia", peso: 15, texto: "Solo la gracia.", formas: ["solo la gracia", "sola gracia", "por gracia"] },
        { id: "fe", peso: 15, texto: "Solo la fe.", formas: ["solo la fe", "sola fe", "solo por fe", "no por obras"] },
        { id: "cristo", peso: 15, texto: "Solo Cristo, el único mediador.", formas: ["solo cristo", "unico mediador", "solo por cristo", "un solo mediador"] },
      ],
      citas: ["Romanos 1:17", "Romanos 1:16-17", "Efesios 2:8-9", "Efesios 2:8", "1 Timoteo 2:5", "Gálatas 2:16", "Romanos 3:28"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Al estudiar Romanos, Lutero descubrió que el justo por la fe vivirá (Romanos 1:17): Dios da su justicia por gracia a quien cree en Cristo. La Reforma recuperó solo la Escritura, la Biblia como autoridad final; solo la gracia; solo la fe, no por obras; y solo Cristo, el único mediador.",
    },
    {
      id: "n4-historia-2-e2",
      tipo: "corta",
      pregunta: "Describe cómo se extendió la Reforma más allá de Lutero: nombra a dos reformadores o movimientos, explica qué hizo cada uno y cuál fue la respuesta católica.",
      ideas: [
        { id: "suiza", peso: 25, texto: "Zuinglio predicó la Biblia libro por libro en Zúrich, o Calvino enseñó en Ginebra.", formas: ["zuinglio", "zurich", "calvino", "ginebra", "institucion"] },
        { id: "anabautistas", peso: 25, texto: "Los anabautistas bautizaban solo a los creyentes.", formas: ["anabautista*", "bautizaban solo", "solo a los creyentes", "creyentes que confesaban"] },
        { id: "traductores", peso: 25, texto: "Tyndale, o Casiodoro de Reina y Cipriano de Valera, tradujeron la Biblia.", formas: ["tyndale", "casiodoro", "valera", "biblia del oso", "traduj*"] },
        { id: "trento", peso: 15, texto: "El Concilio de Trento rechazó la justificación solo por la fe.", formas: ["trento", "concilio", "contrarreforma"] },
      ],
      basta: 85,
      citas: ["Hechos 17:11", "Isaías 40:8", "Romanos 3:28", "Romanos 1:17", "Efesios 2:8-9", "Marcos 16:16", "2 Timoteo 3:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La Reforma se extendió con Zuinglio, que predicó la Biblia libro por libro en Zúrich, y con Calvino en Ginebra. Los anabautistas bautizaban solo a los creyentes, y Casiodoro de Reina tradujo la Biblia al español en 1569. La Iglesia católica respondió con el Concilio de Trento, que rechazó la justificación solo por la fe (Romanos 3:28).",
    },
    {
      id: "n4-historia-2-e3",
      tipo: "corta",
      pregunta: "Explica qué fue el avivamiento de la calle Azusa y por qué fue importante.",
      ideas: [
        { id: "seymour", peso: 25, texto: "Lo dirigió William J. Seymour, un predicador afroamericano.", formas: ["seymour", "afroamerican*", "hijo de esclavos"] },
        { id: "fecha", peso: 20, texto: "Comenzó en 1906, en Los Ángeles.", formas: ["1906", "los angeles"] },
        { id: "unidad", peso: 25, texto: "Personas de todas las razas oraban juntas en una época de separación racial.", formas: ["razas", "negros", "blancos", "hispanos", "separacion racial", "segregacion", "oraban juntos", "unidad"] },
        { id: "extension", peso: 20, texto: "Desde allí, misioneros llevaron el mensaje pentecostal a todo el mundo.", formas: ["todo el mundo", "se extendio", "misioneros", "por el mundo", "las naciones"] },
      ],
      citas: ["Joel 2:28-29", "Joel 2:28", "Hechos 2:1-4", "Hechos 2:4", "Gálatas 3:28", "Hechos 1:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En 1906, William J. Seymour, un predicador afroamericano, hijo de antiguos esclavos, dirigió en la calle Azusa de Los Ángeles un avivamiento de unos tres años. Negros, blancos e hispanos oraban juntos en una época de separación racial, y desde allí misioneros llevaron el mensaje pentecostal a todo el mundo, como en Hechos 2:4.",
    },
    {
      id: "n4-historia-2-e4",
      tipo: "breve",
      pregunta:
        "Explica la Reforma de Lutero y los movimientos de renovación que vinieron después (puritanos, pietistas, moravos, Wesley y el Gran Despertar): qué enseñaron, qué unieron y qué aprende de ellos la iglesia de hoy. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "lutero", peso: 20, texto: "Lutero y el justo por la fe.", formas: ["lutero", "justo por la fe", "95 tesis", "indulgencias", "worms"] },
        { id: "principios", peso: 15, texto: "Los principios de la Reforma.", formas: ["solo la escritura", "solo la gracia", "solo la fe", "solo cristo", "sola escritura", "sola fe"] },
        { id: "renovacion", peso: 15, texto: "Los puritanos, los pietistas y los moravos.", formas: ["puritano*", "pietis*", "morav*", "herrnhut", "spener"] },
        { id: "wesley", peso: 20, texto: "Wesley y el Gran Despertar.", formas: ["wesley", "aldersgate", "metodis*", "whitefield", "edwards", "gran despertar"] },
        { id: "union", peso: 15, texto: "Unieron la sana doctrina con una fe viva.", formas: ["sana doctrina", "fe viva", "doctrina y vida", "corazon encendido"] },
        { id: "hoy", peso: 15, texto: "Lo que aprende la iglesia de hoy.", formas: ["hoy", "aprendemos", "aprendo", "debemos", "nuestra iglesia"] },
      ],
      basta: 85,
      citas: ["Romanos 1:17", "Romanos 1:16-17", "Efesios 2:8-9", "Efesios 2:8", "Habacuc 3:2", "Romanos 8:16", "1 Timoteo 4:16", "1 Tesalonicenses 5:17", "Hechos 17:11", "Gálatas 2:16", "Romanos 3:28", "1 Timoteo 2:5", "Salmos 119:105"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Martín Lutero descubrió en Romanos que el justo por la fe vivirá (Romanos 1:17). En 1517 publicó sus 95 tesis contra las indulgencias, y en Worms se negó a retractarse si no lo convencían con la Escritura. La Reforma enseñó solo la Escritura, solo la gracia, solo la fe y solo Cristo, porque por gracia somos salvos por medio de la fe (Efesios 2:8-9). Después, muchas iglesias tenían la doctrina correcta, pero poca vida. Los puritanos quisieron vivir toda la vida bajo la Palabra; los pietistas, como Spener y Francke, llamaron a la piedad personal y a las obras de misericordia; y los moravos de Herrnhut oraron unos cien años desde 1727 y enviaron misioneros. Juan Wesley recibió en 1738 la seguridad de su salvación y predicó al aire libre durante décadas, y en el Gran Despertar predicaron Jonathan Edwards y George Whitefield. Estos movimientos unieron la sana doctrina con una fe viva: conversión personal, santidad, oración y misión. La iglesia de hoy aprende que necesita las dos cosas, porque una sin la otra se enfría o se desvía, y que debemos orar como Habacuc para que Dios avive su obra en medio de los tiempos (Habacuc 3:2).",
    },
    {
      id: "n4-historia-2-e5",
      tipo: "breve",
      pregunta:
        "Describe el nacimiento del movimiento pentecostal y su llegada a América Latina y a los hispanos de los Estados Unidos, con nombres, lugares y fechas, y explica qué te enseña esta historia. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "santidad", peso: 10, texto: "La oración del movimiento de santidad por un nuevo Pentecostés.", formas: ["movimiento de santidad", "nuevo pentecostes", "derramamiento", "derramare"] },
        { id: "topeka", peso: 15, texto: "Topeka, 1901.", formas: ["topeka", "1901", "parham", "ozman"] },
        { id: "azusa", peso: 20, texto: "La calle Azusa, 1906, con William J. Seymour.", formas: ["azusa", "seymour", "1906"] },
        { id: "chile", peso: 15, texto: "Chile, 1909, con Willis Hoover.", formas: ["chile", "valparaiso", "hoover", "1909", "metodista pentecostal"] },
        { id: "brasil", peso: 15, texto: "Brasil, 1911, con Daniel Berg y Gunnar Vingren.", formas: ["brasil", "belem", "vingren", "1911"] },
        { id: "hispanos", peso: 15, texto: "Los hispanos de los Estados Unidos: Francisco Olazábal.", formas: ["olazabal", "concilio latinoamericano"] },
        { id: "leccion", peso: 10, texto: "Lo que enseña esta historia.", formas: ["me enseña", "nos enseña", "enseña que", "aprendo", "aprendemos", "debemos"] },
      ],
      basta: 85,
      citas: ["Joel 2:28-29", "Joel 2:28", "Hechos 2:1-4", "Hechos 2:4", "Hechos 1:8", "Romanos 10:14-15", "Romanos 10:14", "Gálatas 3:28", "Hechos 1:14", "Hebreos 13:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Muchos creyentes del movimiento de santidad oraban por un nuevo Pentecostés, recordando la promesa de Joel 2:28. El 1 de enero de 1901, en la escuela bíblica de Charles Parham en Topeka, Kansas, Agnes Ozman habló en lenguas mientras oraban por ella. En 1906, William J. Seymour, un predicador afroamericano, dirigió el avivamiento de la calle Azusa, en Los Ángeles, donde negros, blancos e hispanos oraban juntos, y desde allí salieron misioneros a todo el mundo. En 1914 se organizaron las Asambleas de Dios en Hot Springs, Arkansas. En América Latina, el fuego llegó a Chile en 1909, con el avivamiento de la iglesia metodista de Valparaíso que guiaba Willis Hoover, y a Brasil en 1911, cuando los misioneros suecos Daniel Berg y Gunnar Vingren fundaron en Belém la iglesia que llegó a ser las Asambleas de Dios. Entre los hispanos de los Estados Unidos, Francisco Olazábal predicó a miles y fundó el Concilio Latinoamericano de Iglesias Cristianas. Esta historia me enseña que Dios obra cuando su pueblo ora unido y que la promesa de Hechos 1:8 sigue en pie para nosotros, los hispanos de hoy.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 4
  breve: {
    id: "n4-historia-2-b1",
    tipo: "breve",
    pregunta:
      "Escoge un personaje o un movimiento de la historia de la iglesia desde la Reforma hasta hoy (por ejemplo, Lutero, Casiodoro de Reina, Wesley, Carey, Seymour u Olazábal): cuenta qué hizo, en qué tiempo y lugar, qué verdad bíblica lo movió y qué aprendes de él para tu ministerio. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "personaje", peso: 15, texto: "El personaje o el movimiento escogido.", formas: ["escogi", "lutero", "calvino", "zuinglio", "tyndale", "casiodoro", "valera", "wesley", "whitefield", "carey", "taylor", "seymour", "parham", "olazabal", "hoover", "vingren", "anabautista*", "morav*", "pietis*", "puritano*"] },
      { id: "hechos", peso: 25, texto: "Lo que hizo.", formas: ["predic*", "traduj*", "traduc*", "fundo", "publico", "dirigio", "partio a", "reparti*", "oraron"] },
      { id: "tiempo", peso: 15, texto: "En qué tiempo y lugar.", formas: ["siglo", "1517", "1521", "1569", "1602", "1738", "1792", "1865", "1901", "1906", "1909", "1911", "1914", "wittenberg", "sevilla", "londres", "india", "china", "los angeles", "chile", "brasil", "mexico", "inglaterra", "alemania"] },
      { id: "verdad", peso: 20, texto: "La verdad bíblica que lo movió.", formas: ["justo por la fe", "gran comision", "haced discipulos", "palabra de dios", "por gracia", "espiritu santo", "aviva tu obra", "testigos"] },
      { id: "aprendo", peso: 25, texto: "Lo que aprende para su ministerio.", formas: ["aprendo", "me enseña", "mi ministerio", "voy a", "me anima", "me desafia"] },
    ],
    basta: 85,
    citas: ["Romanos 1:17", "Romanos 1:16-17", "Efesios 2:8-9", "Isaías 40:8", "Hechos 17:11", "Habacuc 3:2", "Romanos 8:16", "Isaías 54:2-3", "Isaías 54:2", "Mateo 28:19-20", "Mateo 28:19", "Joel 2:28-29", "Hechos 2:1-4", "Hechos 1:8", "Romanos 10:14-15", "Gálatas 3:28", "2 Timoteo 2:2", "Hebreos 13:8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí a William Carey (1761-1834), un zapatero y pastor bautista de Inglaterra. Tenía un mapa del mundo junto a su banco de trabajo y oraba por las naciones que no conocían a Cristo. En 1792 predicó sobre Isaías 54:2, ensancha el sitio de tu tienda, y llamó a esperar grandes cosas de Dios e intentar grandes cosas para Dios. Al año siguiente partió a la India, donde trabajó en traducir la Biblia a varias lenguas. Lo movió la verdad de que la gran comisión sigue vigente: id, y haced discípulos a todas las naciones (Mateo 28:19). De él aprendo que Dios usa a personas sencillas que creen sus promesas y obedecen. Para mi ministerio, voy a orar cada semana por una nación que no conoce a Cristo y a animar a mi iglesia a apoyar a los misioneros, porque la iglesia que ora por las naciones también envía.",
  },
};
