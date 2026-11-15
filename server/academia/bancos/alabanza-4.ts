/**
 * El banco de «La música en la historia de la iglesia» (especialidad Alabanza y adoración). SOLO SERVIDOR: respuestas y
 * claves. Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel
 * de Bloom. Objetivos: o1 la música en Israel · o2 Jesús y la iglesia de los primeros siglos · o3 la iglesia antigua y
 * medieval · o4 la Reforma · o5 los himnos de los avivamientos · o6 Azusa y la alabanza de hoy · o7 el versículo de
 * memoria (Salmos 145:4).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `alabanza-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_ALABANZA_4: BancoMateria = {
  materia: "alabanza-4",
  repaso: {
    "alabanza-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Quiénes cantaron después de cruzar el mar Rojo, según Éxodo 15:1?", "Moisés y los hijos de Israel", ["Solo los sacerdotes", "Los egipcios", "Solo los levitas"], "«Entonces cantó Moisés y los hijos de Israel este cántico a Jehová».", "Éxodo 15:1-2"],
      ["1-r2", 1, "o1", "comprender", "¿Qué pasó cuando Ezequías restauró el culto?", "Volvió el cántico de Jehová con trompetas e instrumentos, y toda la multitud adoraba", ["Se prohibió la música", "Se cerró el templo", "Solo cantó el rey"], "«comenzó también el cántico de Jehová, con las trompetas y los instrumentos de David rey de Israel».", "2 Crónicas 29:27-28"],
      ["1-r3", 1, "o1", "aplicar", "¿Qué le enseña el Salmo 137 a un equipo de alabanza?", "Que también se puede llevar el dolor a Dios en el canto", ["Que solo se canta cuando todo va bien", "Que hay que colgar los instrumentos para siempre", "Que el exilio es bueno"], "«¿Cómo cantaremos cántico de Jehová En tierra de extraños?».", "Salmos 137:1-4"],
    ] as P[]).map(p),
    "alabanza-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hicieron Jesús y sus discípulos después de la Cena, según Mateo 26:30?", "Cantaron el himno y salieron al monte de los Olivos", ["Se fueron a dormir", "Volvieron al templo", "Ayunaron"], "«Y cuando hubieron cantado el himno, salieron al monte de los Olivos».", "Mateo 26:30"],
      ["2-r2", 2, "o2", "comprender", "¿Qué contó Plinio el Joven sobre los cristianos, hacia el año 112?", "Que se reunían antes del amanecer para cantar un himno a Cristo como a un dios", ["Que no cantaban nunca", "Que adoraban al emperador", "Que solo cantaban en latín"], "Plinio, gobernador de Bitinia, se lo escribió al emperador Trajano.", "Efesios 5:19"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué cantaba la primera iglesia, según la lección?", "Los salmos de Israel y también cantos nuevos sobre Cristo", ["Solo cantos de otros pueblos", "Nada: solo leían", "Solo himnos en latín"], "«hablando entre vosotros con salmos, con himnos y cánticos espirituales».", "Efesios 5:19"],
    ] as P[]).map(p),
    "alabanza-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Quién escribió himnos para el pueblo en el siglo IV, en Milán?", "Ambrosio", ["Lutero", "Calvino", "Wesley"], "Agustín lloró de emoción al oír los himnos de la iglesia de Milán.", "Colosenses 3:16"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué el pueblo fue cantando cada vez menos en la Edad Media?", "Porque el culto se celebraba en latín, que la mayoría ya no entendía", ["Porque estaba prohibido cantar", "Porque no había iglesias", "Porque no había música"], "«¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho».", "1 Corintios 14:16"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué lección deja la Edad Media para el culto de hoy?", "Que la adoración es de todo el pueblo y tiene que entenderse", ["Que hay que cantar en latín", "Que el pueblo debe solo escuchar", "Que la música antigua es mala"], "«pues no sabe lo que has dicho».", "1 Corintios 14:16"],
    ] as P[]).map(p),
    "alabanza-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿En qué salmo se basa Castillo fuerte es nuestro Dios?", "En el Salmo 46", ["En el Salmo 23", "En el Salmo 100", "En el Salmo 150"], "«Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones».", "Salmos 46:1"],
      ["4-r2", 4, "o4", "comprender", "¿Qué se completó en Ginebra en 1562?", "El Salterio de Ginebra, con los 150 salmos en verso", ["La primera Biblia en español", "Un himnario en latín", "El primer órgano de la iglesia"], "«cantaré también con el entendimiento».", "1 Corintios 14:15"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué principio de la Reforma sigue vigente al escoger los cantos?", "Que el pueblo cante en su lengua y entienda lo que canta", ["Que solo cante el coro", "Que se cante en latín", "Que no haya letra"], "«cantaré con el espíritu, pero cantaré también con el entendimiento».", "1 Corintios 14:15"],
    ] as P[]).map(p),
    "alabanza-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Quién escribió miles de himnos durante el avivamiento metodista?", "Charles Wesley", ["Martín Lutero", "Ambrosio", "Juan Calvino"], "«Puso luego en mi boca cántico nuevo».", "Salmos 40:3"],
      ["5-r2", 5, "o5", "comprender", "¿Quién fue Juan Bautista Cabrera?", "El primer obispo protestante de España, que escribió y tradujo himnos al español", ["Un músico de Lutero", "El autor del Salterio de Ginebra", "El cantante de Moody"], "Entre sus traducciones está Santo, santo, santo.", "Salmos 40:3"],
      ["5-r3", 5, "o5", "aplicar", "¿Cómo ayudaron los himnos a la gente sencilla, según la lección?", "Le enseñaban la fe y la doctrina mientras cantaba", ["Solo la entretenían", "La alejaban de la Biblia", "No la ayudaron"], "«alabanza a nuestro Dios».", "Salmos 40:3"],
    ] as P[]).map(p),
    "alabanza-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿En qué año comenzó el avivamiento que llegó a la calle Azusa?", "En 1906", ["En 1517", "En 1739", "En 1950"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
      ["6-r2", 6, "o6", "comprender", "¿Qué cantan los redimidos en Apocalipsis 15:3?", "El cántico de Moisés y el cántico del Cordero", ["Solo cantos nuevos", "Solo los salmos", "Ningún cántico"], "«Y cantan el cántico de Moisés siervo de Dios, y el cántico del Cordero».", "Apocalipsis 15:3"],
      ["6-r3", 6, "o6", "aplicar", "Un joven dice que los himnos antiguos ya no sirven. ¿Qué le enseña la lección?", "Que no se desprecia lo antiguo ni lo nuevo: todo se prueba con la Palabra", ["Que tiene razón", "Que solo sirven los himnos antiguos", "Que el estilo es lo más importante"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La música en el pueblo de Israel
    ["f01", 1, "o1", "recordar", "¿Qué dice Moisés que es Jehová, en Éxodo 15:2?", "Su fortaleza, su cántico y su salvación", ["Su rey y su juez", "Su pastor y su guía", "Su escudo y su espada"], "«Jehová es mi fortaleza y mi cántico, Y ha sido mi salvación».", "Éxodo 15:1-2"],
    ["f02", 1, "o1", "comprender", "¿Qué celebra el cántico de Moisés?", "La salvación de Dios al cruzar el mar Rojo", ["La construcción del templo", "La coronación de un rey", "La cosecha"], "«Ha echado en el mar al caballo y al jinete».", "Éxodo 15:1-2"],
    ["f03", 1, "o1", "recordar", "¿Qué tomó María la profetisa en su mano?", "Un pandero", ["Un arpa", "Una trompeta", "Una espada"], "«tomó un pandero en su mano».", "Éxodo 15:20-21"],
    ["f04", 1, "o1", "comprender", "¿Qué unía la alabanza de Israel, según la lección?", "La voz, los instrumentos y la danza", ["Solo la voz", "Solo los instrumentos", "Solo el silencio"], "«todas las mujeres salieron en pos de ella con panderos y danzas».", "Éxodo 15:20-21"],
    ["f05", 1, "o1", "recordar", "¿Cómo invita a alabar Salmos 150:3?", "A son de bocina, con salterio y arpa", ["Solo con la voz", "Con tambores de guerra", "En silencio"], "«Alabadle a son de bocina; Alabadle con salterio y arpa».", "Salmos 150:3-6"],
    ["f06", 1, "o1", "recordar", "¿A qué invita Salmos 150:6?", "A que todo lo que respira alabe a JAH", ["A que solo alaben los levitas", "A alabar una vez al año", "A que alaben los reyes"], "«Todo lo que respira alabe a JAH».", "Salmos 150:3-6"],
    ["f07", 1, "o1", "analizar", "¿Qué relación hay entre los avivamientos de Israel y la alabanza, según la lección?", "Cuando el pueblo volvía a Dios, volvía la alabanza", ["Los avivamientos prohibían la música", "No tienen relación", "La alabanza terminaba con los avivamientos"], "«y toda la multitud adoraba, y los cantores cantaban».", "2 Crónicas 29:27-28"],
    ["f08", 1, "o1", "recordar", "¿Qué hicieron los israelitas con sus arpas en Babilonia?", "Las colgaron sobre los sauces", ["Las vendieron", "Las quemaron", "Tocaron en las fiestas del rey"], "«Sobre los sauces en medio de ella Colgamos nuestras arpas».", "Salmos 137:1-4"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estas afirmaciones resume la música de Israel, según la lección?", "Todo el pueblo cantaba las obras de Dios, con instrumentos, y también cantaba el dolor", ["Solo cantaban los reyes", "No usaban instrumentos", "Solo cantaban en las fiestas"], "«Todo lo que respira alabe a JAH».", "Salmos 150:3-6"],
    ["f10", 1, "o7", "recordar", "Completa Salmos 145:4: Generación a generación celebrará tus obras…", "Y anunciará tus poderosos hechos", ["Y guardará silencio", "Y olvidará el pasado", "Y cantará solo lo nuevo"], "«Generación a generación celebrará tus obras, Y anunciará tus poderosos hechos».", "Salmos 145:4"],
    // Lección 2 · Jesús, los apóstoles y la iglesia de los primeros siglos
    ["f11", 2, "o2", "recordar", "¿Adónde salieron Jesús y sus discípulos después de cantar el himno?", "Al monte de los Olivos", ["Al templo", "A Galilea", "A Betania"], "«salieron al monte de los Olivos».", "Mateo 26:30"],
    ["f12", 2, "o2", "comprender", "¿Qué himno cantaron Jesús y sus discípulos, según la lección?", "La Biblia no lo dice; muchos estudiosos piensan que eran salmos de los que se cantaban en la Pascua", ["Castillo fuerte es nuestro Dios", "Un himno de Wesley", "Un canto en latín"], "«Y cuando hubieron cantado el himno».", "Mateo 26:30"],
    ["f13", 2, "o2", "recordar", "¿Con qué cantos se hablaban los creyentes, según Efesios 5:19?", "Con salmos, con himnos y cánticos espirituales", ["Solo con salmos", "Solo con coros", "Con marchas"], "«hablando entre vosotros con salmos, con himnos y cánticos espirituales».", "Efesios 5:19"],
    ["f14", 2, "o2", "comprender", "¿Qué piensan muchos estudiosos de Filipenses 2:6-11?", "Que era un himno que los primeros cristianos cantaban sobre Cristo", ["Que era una ley de Moisés", "Que era una carta perdida", "Que era un salmo de David"], "«y toda lengua confiese que Jesucristo es el Señor».", "Filipenses 2:10-11"],
    ["f15", 2, "o2", "recordar", "¿Quién era Plinio el Joven?", "Un gobernador romano de Bitinia", ["Un apóstol", "Un obispo de Milán", "Un reformador"], "Hacia el año 112 le escribió al emperador Trajano sobre los cristianos.", "Efesios 5:19"],
    ["f16", 2, "o2", "recordar", "¿A quién le escribió Plinio sobre los cristianos?", "Al emperador Trajano", ["Al apóstol Pablo", "Al papa", "A Lutero"], "Le contó que cantaban un himno a Cristo como a un dios.", "Efesios 5:19"],
    ["f17", 2, "o2", "analizar", "¿Por qué es importante la carta de Plinio para la historia de la alabanza?", "Porque un testigo de afuera muestra que los primeros cristianos adoraban a Cristo con cantos", ["Porque trae la letra de muchos himnos", "Porque prohibió cantar", "Porque es un libro de la Biblia"], "Es uno de los testimonios no cristianos más antiguos sobre la iglesia.", "Filipenses 2:10-11"],
    ["f18", 2, "o2", "comprender", "¿Cuándo se reunían los cristianos para cantar, según Plinio?", "Un día fijo, antes del amanecer", ["Solo de noche, en secreto", "A mediodía en el templo", "Una vez al año"], "Cantaban a coros un himno a Cristo como a un dios.", "Efesios 5:19"],
    ["f19", 2, "o2", "aplicar", "¿Qué le enseña a la iglesia de hoy que los primeros cristianos cantaran sobre Cristo?", "Que la alabanza pone a Cristo y su obra en el centro", ["Que solo se deben cantar salmos", "Que no importa la letra", "Que hay que cantar en griego"], "«toda lengua confiese que Jesucristo es el Señor».", "Filipenses 2:10-11"],
    ["f20", 2, "o2", "evaluar", "¿Cuál de estas descripciones corresponde a la iglesia de los primeros siglos?", "Cantaba salmos e himnos sobre Cristo, en las casas y aun en la persecución", ["Tenía grandes coros profesionales", "Cantaba solo en latín", "No cantaba"], "«cantando y alabando al Señor en vuestros corazones».", "Efesios 5:19"],
    // Lección 3 · La iglesia antigua y la Edad Media
    ["f21", 3, "o3", "recordar", "¿Quién lloró de emoción al oír los himnos de la iglesia de Milán?", "Agustín de Hipona", ["Martín Lutero", "Charles Wesley", "Plinio el Joven"], "Lo cuenta en sus Confesiones.", "Colosenses 3:16"],
    ["f22", 3, "o3", "recordar", "¿En qué siglo escribió Ambrosio sus himnos?", "En el siglo IV", ["En el siglo I", "En el siglo XVI", "En el siglo XIX"], "Ambrosio era obispo de Milán y escribió himnos para que el pueblo cantara.", "Colosenses 3:16"],
    ["f23", 3, "o3", "recordar", "¿Qué pedía la Regla de san Benito?", "Cantar los 150 salmos cada semana", ["No cantar nunca", "Cantar solo en Navidad", "Cantar himnos de Lutero"], "Era del siglo VI, y los monasterios guardaron el canto de los salmos.", "Colosenses 3:16"],
    ["f24", 3, "o3", "comprender", "¿Qué es el canto llano o gregoriano?", "Una melodía sin acompañamiento, en latín, que la tradición asocia con Gregorio Magno", ["Un himno de Lutero", "Un coro moderno con batería", "Un salmo de David"], "La tradición lo asocia con el papa Gregorio Magno (590-604).", "Colosenses 3:16"],
    ["f25", 3, "o3", "comprender", "¿Por qué se lo llama canto gregoriano?", "Porque la tradición lo asocia con el papa Gregorio Magno", ["Porque lo inventó Lutero", "Porque nació en Grecia", "Porque se canta en Navidad"], "Gregorio Magno fue papa del 590 al 604.", "Colosenses 3:16"],
    ["f26", 3, "o3", "analizar", "¿Por qué el pueblo quedó como espectador en la Edad Media?", "Porque el culto era en latín y el canto quedó en manos de los clérigos, los monjes y los coros", ["Porque el pueblo no quería cantar", "Porque se prohibió la Biblia", "Porque no había templos"], "«¿cómo dirá el Amén a tu acción de gracias?».", "1 Corintios 14:16"],
    ["f27", 3, "o3", "recordar", "¿Qué pregunta Pablo en 1 Corintios 14:16 sobre el que no entiende?", "Cómo dirá el amén a la acción de gracias", ["Por qué no canta más fuerte", "Cuándo vendrá al culto", "Quién lo invitó"], "«¿cómo dirá el Amén a tu acción de gracias? pues no sabe lo que has dicho».", "1 Corintios 14:16"],
    ["f28", 3, "o3", "evaluar", "¿Qué riquezas le dejaron esos siglos a la iglesia, según la lección?", "El amor por los salmos, el cuidado de la música y himnos que se siguen cantando", ["Ninguna", "La prohibición de cantar", "El culto sin música"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ["f29", 3, "o3", "aplicar", "Un coro canta piezas hermosas en otro idioma y el pueblo no entiende. ¿Qué enseña la historia?", "Que la adoración tiene que entenderse para que todo el pueblo participe", ["Que es la mejor manera de adorar", "Que el pueblo debe solo escuchar", "Que el idioma no importa"], "«pues no sabe lo que has dicho».", "1 Corintios 14:16"],
    ["f30", 3, "o3", "analizar", "¿Qué contraste hay entre Ambrosio y el canto de la Edad Media tardía?", "Ambrosio escribió para que cantara el pueblo; después el pueblo fue quedando callado", ["Ambrosio prohibió cantar", "En la Edad Media tardía cantaba más el pueblo", "No hay diferencia"], "«¿cómo dirá el Amén a tu acción de gracias?».", "1 Corintios 14:16"],
    // Lección 4 · La Reforma: el pueblo vuelve a cantar
    ["f31", 4, "o4", "recordar", "¿En qué lengua escribió Lutero sus himnos?", "En alemán", ["En latín", "En francés", "En griego"], "«cantaré también con el entendimiento».", "1 Corintios 14:15"],
    ["f32", 4, "o4", "recordar", "¿Cuál es el himno más conocido de Lutero?", "Castillo fuerte es nuestro Dios", ["Santo, santo, santo", "Sublime gracia", "Cuán grande es él"], "«Dios es nuestro amparo y fortaleza».", "Salmos 46:1"],
    ["f33", 4, "o4", "comprender", "¿Qué dice el Salmo 46:1, base de Castillo fuerte es nuestro Dios?", "Que Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones", ["Que el Señor es mi pastor", "Que todo lo que respira alabe a JAH", "Que cantemos cántico nuevo"], "«Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones».", "Salmos 46:1"],
    ["f34", 4, "o4", "recordar", "¿Quién impulsó en Ginebra el canto de los salmos en francés?", "Juan Calvino", ["Ambrosio", "Isaac Watts", "Fanny Crosby"], "«cantaré con el espíritu, pero cantaré también con el entendimiento».", "1 Corintios 14:15"],
    ["f35", 4, "o4", "recordar", "¿Quiénes pusieron en verso la mayoría de los salmos del Salterio de Ginebra?", "Clemente Marot y Teodoro de Beza", ["Lutero y Melanchthon", "Watts y Wesley", "Moody y Sankey"], "El Salterio de Ginebra se completó en 1562.", "Colosenses 3:16"],
    ["f36", 4, "o4", "comprender", "¿Por qué los reformadores cuidaban la letra de los cantos?", "Para que la palabra de Cristo morara en abundancia en el pueblo", ["Para que rimara siempre", "Para lucirse", "Porque la música no importaba"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ["f37", 4, "o4", "analizar", "¿Qué tienen en común la Biblia en la lengua del pueblo y el canto en la lengua del pueblo?", "Las dos ponen la Palabra al alcance de todos", ["Las dos eran solo para el clero", "Las dos se hacían en latín", "No tienen nada en común"], "«cantaré también con el entendimiento».", "1 Corintios 14:15"],
    ["f38", 4, "o4", "aplicar", "¿Qué aporte de la Reforma se ve cuando toda la congregación canta un himno conocido?", "El canto de toda la congregación, no solo del coro", ["El canto en latín", "El silencio del pueblo", "La música sin letra"], "«enseñándoos y exhortándoos unos a otros».", "Colosenses 3:16"],
    ["f39", 4, "o4", "evaluar", "¿Cuál de estas prácticas sigue el principio de la Reforma?", "Escoger cantos con letra bíblica que el pueblo entienda y pueda cantar", ["Cantar en un idioma que nadie entiende", "Que solo cante el solista", "Cantar sin revisar la letra"], "«cantaré con el espíritu, pero cantaré también con el entendimiento».", "1 Corintios 14:15"],
    ["f40", 4, "o4", "recordar", "¿En qué año se completó el Salterio de Ginebra?", "En 1562", ["En 1906", "En 112", "En 1826"], "Tenía los 150 salmos en verso.", "Colosenses 3:16"],
    // Lección 5 · Los himnos de los avivamientos
    ["f41", 5, "o5", "recordar", "¿Quién escribió en Inglaterra cientos de himnos, además de salmos en verso, y vivió de 1674 a 1748?", "Isaac Watts", ["Charles Wesley", "Ira Sankey", "Juan Calvino"], "«Puso luego en mi boca cántico nuevo».", "Salmos 40:3"],
    ["f42", 5, "o5", "recordar", "¿De quién era hermano Charles Wesley?", "De Juan Wesley", ["De Isaac Watts", "De Martín Lutero", "De D. L. Moody"], "Los dos fueron parte del avivamiento metodista.", "Salmos 40:3"],
    ["f43", 5, "o5", "comprender", "¿Para qué servían los himnos de Charles Wesley, según la lección?", "Para que la gente sencilla aprendiera la fe cantando", ["Para los conciertos de la corte", "Para cantar en latín", "Para reemplazar la Biblia"], "«alabanza a nuestro Dios».", "Salmos 40:3"],
    ["f44", 5, "o5", "recordar", "¿Qué se sabe de Fanny Crosby, según la lección?", "Que era ciega desde muy pequeña y escribió miles de himnos", ["Que era reina de Inglaterra", "Que fue obispa de Milán", "Que escribió el Salterio de Ginebra"], "«Puso luego en mi boca cántico nuevo».", "Salmos 40:3"],
    ["f45", 5, "o5", "recordar", "¿En las campañas de qué evangelista cantaba Ira D. Sankey?", "D. L. Moody", ["Juan Wesley", "Juan Calvino", "Martín Lutero"], "Sus cantos se difundieron por todo el mundo.", "Salmos 40:3"],
    ["f46", 5, "o5", "comprender", "¿Qué dice Salmos 40:3 que pasa cuando Dios pone un cántico nuevo?", "Que muchos verán, temerán y confiarán en Jehová", ["Que nadie lo notará", "Que se olvida el pasado", "Que se acaba la fe"], "«Verán esto muchos, y temerán, Y confiarán en Jehová».", "Salmos 40:3"],
    ["f47", 5, "o5", "recordar", "¿Qué himno tradujo al español Juan Bautista Cabrera?", "Santo, santo, santo", ["Castillo fuerte es nuestro Dios", "Sublime gracia", "Cuán grande es él"], "El inglés Reginald Heber lo escribió en 1826.", "Isaías 6:3"],
    ["f48", 5, "o5", "analizar", "¿Por qué los himnos de los avivamientos también servían para evangelizar?", "Porque hablaban de la cruz y de la fe personal, y se cantaban en las campañas y en las calles", ["Porque eran secretos", "Porque estaban en latín", "Porque no tenían letra"], "«Verán esto muchos, y temerán, Y confiarán en Jehová».", "Salmos 40:3"],
    ["f49", 5, "o5", "evaluar", "¿Qué significa que un buen himno es teología que se puede cantar?", "Que enseña verdades de Dios mientras se canta", ["Que es difícil de cantar", "Que solo lo entienden los teólogos", "Que no tiene melodía"], "«alabanza a nuestro Dios».", "Salmos 40:3"],
    ["f50", 5, "o5", "aplicar", "¿Qué puede aprender un compositor de hoy de los himnos de los avivamientos?", "A llenar los cantos de la Palabra y de la obra de Cristo", ["A escribir solo sobre sus sentimientos", "A evitar la Biblia", "A copiar letras sin permiso"], "«Puso luego en mi boca cántico nuevo, alabanza a nuestro Dios».", "Salmos 40:3"],
    // Lección 6 · Del avivamiento pentecostal a la alabanza de hoy
    ["f51", 6, "o6", "recordar", "¿Quién dirigía el grupo donde comenzó el avivamiento que llegó a la calle Azusa?", "William J. Seymour", ["D. L. Moody", "Charles Wesley", "Juan Bautista Cabrera"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
    ["f52", 6, "o6", "recordar", "¿En qué ciudad estaba la calle Azusa?", "Los Ángeles", ["Londres", "Ginebra", "Milán"], "El avivamiento comenzó en 1906 y duró unos tres años.", "Salmos 145:4"],
    ["f53", 6, "o6", "comprender", "¿Cómo era el culto del avivamiento de la calle Azusa, según la lección?", "Con libertad, participación de todos y cantos sencillos y espontáneos", ["En latín y con un coro profesional", "Sin música", "Solo con salmos del Salterio de Ginebra"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
    ["f54", 6, "o6", "recordar", "¿Qué son los coros, según la lección?", "Cantos breves y fáciles de aprender", ["Himnos largos en latín", "Salmos sin melodía", "Cantos solo para niños"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
    ["f55", 6, "o6", "comprender", "¿Qué hace cada generación, según Salmos 145:4?", "Celebra las obras de Dios y anuncia sus poderosos hechos", ["Olvida lo anterior", "Se queda callada", "Repite sin entender"], "«Generación a generación celebrará tus obras, Y anunciará tus poderosos hechos».", "Salmos 145:4"],
    ["f56", 6, "o6", "recordar", "¿Qué se comprometía a contar el pueblo a la generación venidera, según Salmos 78:4?", "Las alabanzas de Jehová, su potencia y sus maravillas", ["Sus propias hazañas", "Las riquezas del rey", "Las guerras perdidas"], "«Contando a la generación venidera las alabanzas de Jehová».", "Salmos 78:4"],
    ["f57", 6, "o6", "analizar", "¿Qué enseña que en el cielo se cante el cántico de Moisés y el del Cordero?", "Que el cántico antiguo y el nuevo suenan juntos delante del trono", ["Que solo vale lo antiguo", "Que solo vale lo nuevo", "Que en el cielo no se canta"], "«Y cantan el cántico de Moisés siervo de Dios, y el cántico del Cordero».", "Apocalipsis 15:3"],
    ["f58", 6, "o6", "aplicar", "¿Qué es lo más importante al evaluar un canto nuevo, según la lección?", "Probarlo con la Palabra: la letra importa más que el estilo", ["Que esté de moda", "Que tenga batería", "Que sea antiguo"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
    ["f59", 6, "o6", "evaluar", "¿Cuál de estas actitudes sigue la enseñanza de la lección?", "Cantar cantos nuevos y antiguos probados por la Palabra, y enseñar los mejores a los jóvenes", ["Cantar solo lo que está de moda", "Prohibir todo lo antiguo", "Prohibir todo lo nuevo"], "«Contando a la generación venidera las alabanzas de Jehová».", "Salmos 78:4"],
    ["f60", 6, "o6", "comprender", "¿Quién es Marcos Witt, según la lección?", "Uno de los compositores más conocidos de la alabanza en español y autor de libros de esta especialidad", ["Un reformador del siglo XVI", "El autor del Salterio de Ginebra", "Un obispo de Milán"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿De quién era hermana María la profetisa?", "De Aarón", ["De David", "De Samuel", "De Salomón"], "«Y María la profetisa, hermana de Aarón».", "Éxodo 15:20-21"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué canta el pueblo de Dios, según la lección del mar Rojo?", "Porque Dios lo salvó", ["Porque es costumbre", "Porque lo obliga el rey", "Para entretenerse"], "«Jehová es mi fortaleza y mi cántico, Y ha sido mi salvación».", "Éxodo 15:1-2"],
      ["m1-03", 1, "o1", "recordar", "¿Con qué sonó el cántico de Jehová en tiempos de Ezequías?", "Con las trompetas y los instrumentos de David", ["Con flautas egipcias", "Sin instrumentos", "Con tambores de guerra"], "«con las trompetas y los instrumentos de David rey de Israel».", "2 Crónicas 29:27-28"],
      ["m1-04", 1, "o1", "recordar", "¿Dónde lloraba el pueblo en el Salmo 137?", "Junto a los ríos de Babilonia", ["En el templo de Jerusalén", "En el desierto de Sinaí", "Junto al mar Rojo"], "«Junto a los ríos de Babilonia, Allí nos sentábamos, y aun llorábamos».", "Salmos 137:1-4"],
      ["m1-05", 1, "o1", "analizar", "¿Qué muestra que los salmos guarden cantos de dolor?", "Que se puede adorar a Dios con sinceridad también en la tristeza", ["Que la tristeza es pecado", "Que solo se canta alegre", "Que el dolor no se nombra"], "«¿Cómo cantaremos cántico de Jehová En tierra de extraños?».", "Salmos 137:1-4"],
      ["m1-06", 1, "o7", "recordar", "¿Dónde está el versículo de memoria de esta materia?", "Salmos 145:4", ["Salmos 150:6", "Éxodo 15:2", "Salmos 46:1"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
      ["m1-07", 2, "o2", "recordar", "¿Cuándo cantaron Jesús y sus discípulos el himno?", "Después de la Cena, la noche en que fue entregado", ["En su bautismo", "En la boda de Caná", "Después de la resurrección"], "«Y cuando hubieron cantado el himno, salieron al monte de los Olivos».", "Mateo 26:30"],
      ["m1-08", 2, "o2", "comprender", "¿Dónde dice Efesios 5:19 que se canta y se alaba al Señor?", "En nuestros corazones", ["Solo con los labios", "En voz baja", "Solo en el templo"], "«cantando y alabando al Señor en vuestros corazones».", "Efesios 5:19"],
      ["m1-09", 2, "o2", "recordar", "¿Cómo termina el himno que muchos ven en Filipenses 2?", "Con toda lengua confesando que Jesucristo es el Señor", ["Con una lista de nombres", "Con una advertencia", "Con un saludo"], "«y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre».", "Filipenses 2:10-11"],
      ["m1-10", 2, "o2", "recordar", "¿Hacia qué año escribió Plinio su carta sobre los cristianos?", "Hacia el año 112", ["En el año 1517", "En el año 30", "En el año 1906"], "La escribió al emperador Trajano.", "Efesios 5:19"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué pueden aprender de Pablo y Silas los que sirven en la alabanza?", "Que se puede cantar a Dios aun en la persecución", ["Que solo se canta en libertad", "Que hay que cantar para escapar", "Que en la cárcel no se puede cantar"], "«cantando y alabando al Señor».", "Efesios 5:19"],
      ["m1-12", 2, "o2", "analizar", "¿Qué muestra que los primeros cristianos cantaran un himno a Cristo como a un dios?", "Que adoraban a Cristo como Dios", ["Que Cristo era un emperador", "Que no conocían a Dios", "Que eran paganos"], "«toda lengua confiese que Jesucristo es el Señor».", "Filipenses 2:10-11"],
      ["m1-13", 3, "o3", "recordar", "¿De qué ciudad era obispo Ambrosio?", "De Milán", ["De Roma", "De Ginebra", "De Hipona"], "Escribió himnos para que el pueblo cantara.", "Colosenses 3:16"],
      ["m1-14", 3, "o3", "recordar", "¿En qué obra cuenta Agustín que lloró con los himnos de Milán?", "En sus Confesiones", ["En el Salterio de Ginebra", "En una carta a Trajano", "En la Regla de san Benito"], "Agustín de Hipona se emocionó con los himnos de la iglesia de Milán.", "Colosenses 3:16"],
      ["m1-15", 3, "o3", "comprender", "¿En qué lengua se celebraba el culto de la iglesia de Occidente en la Edad Media?", "En latín", ["En griego", "En alemán", "En español"], "«pues no sabe lo que has dicho».", "1 Corintios 14:16"],
      ["m1-16", 3, "o3", "recordar", "¿Quiénes guardaron el canto de los salmos durante la Edad Media?", "Los monasterios", ["Los ejércitos", "Los mercaderes", "Los reyes"], "La Regla de san Benito pedía cantar los 150 salmos cada semana.", "Colosenses 3:16"],
      ["m1-17", 3, "o3", "aplicar", "¿Qué hace un director para que el pueblo no sea solo espectador?", "Escoge cantos que se entiendan y que todos puedan cantar", ["Canta solo con el coro", "Usa un idioma que nadie conoce", "Le pide silencio al pueblo"], "«¿cómo dirá el Amén a tu acción de gracias?».", "1 Corintios 14:16"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál es la actitud correcta ante la música de la iglesia antigua y medieval?", "Valorar sus riquezas y recordar que la adoración es de todo el pueblo", ["Despreciarla toda", "Copiarla sin entenderla", "Prohibirla"], "«La palabra de Cristo more en abundancia en vosotros».", "Colosenses 3:16"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿En qué siglo fue la Reforma?", "En el siglo XVI", ["En el siglo IV", "En el siglo XIX", "En el siglo I"], "«cantaré también con el entendimiento».", "1 Corintios 14:15"],
      ["m2-02", 4, "o4", "comprender", "¿Qué quería Lutero para el pueblo?", "Que cantara en su propia lengua", ["Que solo escuchara", "Que cantara en latín", "Que no cantara"], "«cantaré con el espíritu, pero cantaré también con el entendimiento».", "1 Corintios 14:15"],
      ["m2-03", 4, "o4", "recordar", "¿Cuántos salmos tenía el Salterio de Ginebra de 1562?", "Los 150", ["Solo 19", "Solo 50", "Ninguno"], "Se completó en 1562, con los salmos en verso.", "Colosenses 3:16"],
      ["m2-04", 4, "o4", "recordar", "¿Qué fue el Salmo 46 para Lutero?", "La base de su himno Castillo fuerte es nuestro Dios", ["Un salmo que prohibió", "Un salmo en latín", "Un salmo que no conocía"], "«Dios es nuestro amparo y fortaleza».", "Salmos 46:1"],
      ["m2-05", 4, "o4", "aplicar", "Una iglesia hispana en los Estados Unidos canta solo en inglés, aunque muchos no lo entienden. ¿Qué principio de la Reforma ayuda?", "Cantar en la lengua que el pueblo entiende", ["Cantar en latín", "Que el pueblo solo escuche", "Que el idioma no importa"], "«cantaré también con el entendimiento».", "1 Corintios 14:15"],
      ["m2-06", 4, "o4", "analizar", "¿Por qué la Reforma unió la música con la Palabra?", "Porque quería que el pueblo aprendiera la Palabra al cantarla", ["Porque no le gustaba la música", "Porque quería conciertos", "Porque la Biblia prohibía cantar"], "«enseñándoos y exhortándoos unos a otros en toda sabiduría».", "Colosenses 3:16"],
      ["m2-07", 5, "o5", "recordar", "¿En qué siglos fueron los avivamientos de Watts, Wesley y Crosby?", "En los siglos XVIII y XIX", ["En el siglo IV", "En el siglo XVI", "En el siglo I"], "«Puso luego en mi boca cántico nuevo».", "Salmos 40:3"],
      ["m2-08", 5, "o5", "recordar", "¿Quién escribió en inglés el himno Santo, santo, santo?", "Reginald Heber", ["Charles Wesley", "Isaac Watts", "Fanny Crosby"], "Lo escribió en 1826, y Juan Bautista Cabrera lo tradujo al español.", "Isaías 6:3"],
      ["m2-09", 5, "o5", "comprender", "¿Por qué es importante Juan Bautista Cabrera para las iglesias de habla hispana?", "Porque fue uno de los primeros grandes autores y traductores de himnos evangélicos en español", ["Porque escribió el Salterio de Ginebra", "Porque cantaba con Moody", "Porque inventó el canto gregoriano"], "Fue el primer obispo protestante de España.", "Salmos 40:3"],
      ["m2-10", 5, "o5", "aplicar", "¿Qué pueden hacer hoy las iglesias con los himnos de los avivamientos?", "Seguir cantando los que enseñan bien la fe", ["Prohibirlos", "Cantarlos sin entenderlos", "Cambiarles la letra sin permiso"], "«alabanza a nuestro Dios».", "Salmos 40:3"],
      ["m2-11", 5, "o5", "evaluar", "¿Qué tenían en común los himnos de los avivamientos, según la lección?", "La Palabra, la cruz de Cristo y la fe personal", ["Que eran en latín", "Que no tenían letra", "Que eran secretos"], "«Puso luego en mi boca cántico nuevo, alabanza a nuestro Dios».", "Salmos 40:3"],
      ["m2-12", 5, "o5", "analizar", "¿Cómo podía un himno enseñar doctrina a gente que no sabía leer?", "Al cantarlo, la gente aprendía de memoria verdades de la fe", ["Porque se leía en voz alta", "Porque tenía imágenes", "No podía enseñar"], "«Verán esto muchos, y temerán, Y confiarán en Jehová».", "Salmos 40:3"],
      ["m2-13", 6, "o6", "recordar", "¿Cuánto duró el avivamiento de la calle Azusa?", "Unos tres años", ["Un día", "Cien años", "Un mes"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
      ["m2-14", 6, "o6", "comprender", "¿Qué movimiento se extendió en buena parte desde la calle Azusa?", "El movimiento pentecostal", ["La Reforma", "El metodismo", "El canto gregoriano"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
      ["m2-15", 6, "o6", "recordar", "¿Qué instrumentos son comunes en la alabanza contemporánea, según la lección?", "Guitarras, teclados y batería", ["Solo el órgano", "Solo la voz", "Trompetas de guerra"], "«Generación a generación celebrará tus obras».", "Salmos 145:4"],
      ["m2-16", 6, "o6", "comprender", "¿Por qué la alabanza es una herencia, según Salmos 78:4?", "Porque se cuenta a la generación venidera", ["Porque se guarda en secreto", "Porque solo es del pasado", "Porque no se transmite"], "«Contando a la generación venidera las alabanzas de Jehová».", "Salmos 78:4"],
      ["m2-17", 6, "o6", "aplicar", "¿Qué haría un director para transmitir los mejores cantos a los jóvenes?", "Enseñarles cantos antiguos y nuevos probados por la Palabra y explicar su sentido", ["Prohibirles los cantos nuevos", "Cantar solo lo que ellos piden", "No enseñarles nada"], "«Contando a la generación venidera las alabanzas de Jehová».", "Salmos 78:4"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál es el criterio principal para la alabanza de cualquier época, según la lección?", "Que la letra sea fiel a la Palabra y el pueblo pueda cantarla", ["Que sea la más moderna", "Que sea la más antigua", "Que tenga el mejor sonido"], "«Y cantan el cántico de Moisés siervo de Dios, y el cántico del Cordero».", "Apocalipsis 15:3"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "alabanza-4-e1",
      tipo: "corta",
      pregunta: "Explica el lugar de la música en la adoración de Israel.",
      ideas: [
        { id: "salvacion", peso: 25, texto: "Israel cantaba las obras de Dios, como su salvación en el mar Rojo.", formas: ["mar rojo", "su salvacion", "moises", "las obras de dios"] },
        { id: "pueblo", peso: 20, texto: "Cantaba todo el pueblo, con instrumentos y danza.", formas: ["todo el pueblo", "instrumentos", "pandero*", "danza*", "arpas"] },
        { id: "avivamiento", peso: 25, texto: "Los avivamientos trajeron de vuelta la alabanza, como con Ezequías.", formas: ["ezequias", "restauro", "avivamiento*", "volvio la alabanza", "volvia la alabanza"] },
        { id: "dolor", peso: 20, texto: "También se cantaba el dolor, como en el exilio.", formas: ["dolor", "llorab*", "exilio", "babilonia", "lamento*"] },
      ],
      citas: ["Éxodo 15:1-2", "Éxodo 15:2", "Éxodo 15:20-21", "Salmos 150:3-6", "Salmos 150:6", "2 Crónicas 29:27-28", "Salmos 137:1-4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Israel cantaba las obras de Dios: después del mar Rojo, Moisés y el pueblo cantaron su salvación (Éxodo 15:2). Cantaba todo el pueblo, con instrumentos, panderos y danza. Cuando Ezequías restauró el culto, volvió la alabanza, y en el exilio de Babilonia también cantaron su dolor.",
    },
    {
      id: "alabanza-4-e2",
      tipo: "corta",
      pregunta: "Explica qué cambió en el canto de la iglesia en la Edad Media y por qué la Reforma fue importante para la música.",
      ideas: [
        { id: "latin", peso: 25, texto: "El culto en latín: el pueblo no entendía y quedó como espectador.", formas: ["latin", "no entendia", "espectador", "no lo entendia"] },
        { id: "clero", peso: 15, texto: "El canto quedó en manos de los clérigos, los monjes y los coros.", formas: ["monjes", "los coros", "clerigos", "el coro"] },
        { id: "reforma", peso: 30, texto: "La Reforma devolvió el canto al pueblo en su lengua: Lutero y el Salterio de Ginebra.", formas: ["lutero", "calvino", "su lengua", "su propia lengua", "ginebra", "aleman"] },
        { id: "entendimiento", peso: 20, texto: "Para cantar con entendimiento.", formas: ["entendimiento", "entender lo que", "entienda lo que"] },
      ],
      citas: ["1 Corintios 14:16", "1 Corintios 14:15", "Colosenses 3:16", "Salmos 46:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la Edad Media el culto se celebraba en latín, que el pueblo ya no entendía, y el canto quedó en manos de los monjes y los coros: el pueblo era espectador. La Reforma le devolvió el canto en su propia lengua, con los himnos de Lutero y los salmos de Calvino, para cantar con entendimiento (1 Corintios 14:15).",
    },
    {
      id: "alabanza-4-e3",
      tipo: "corta",
      pregunta: "Explica qué le aportaron a la alabanza los himnos de los avivamientos de los siglos XVIII y XIX.",
      ideas: [
        { id: "autores", peso: 25, texto: "Watts, Charles Wesley y Fanny Crosby escribieron cientos y miles de himnos.", formas: ["watts", "wesley", "crosby", "sankey", "cabrera"] },
        { id: "ensenar", peso: 25, texto: "Enseñaban la fe y la doctrina al pueblo.", formas: ["enseñaban", "doctrina", "aprendia la fe", "aprendian la fe", "enseñar la fe"] },
        { id: "palabra_cruz", peso: 20, texto: "Estaban llenos de la Palabra y de la cruz de Cristo.", formas: ["la cruz", "la palabra", "obra de cristo", "la biblia"] },
        { id: "evangelizar", peso: 20, texto: "Servían para evangelizar.", formas: ["evangeliz*", "campañas", "moody", "llegaban a la fe"] },
      ],
      citas: ["Salmos 40:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Isaac Watts, Charles Wesley y Fanny Crosby escribieron cientos y miles de himnos, y Juan Bautista Cabrera los llevó al español. Los himnos enseñaban la fe y la doctrina al pueblo, estaban llenos de la Palabra y de la cruz de Cristo, y servían para evangelizar en las campañas, como dice Salmos 40:3.",
    },
    {
      id: "alabanza-4-e4",
      tipo: "breve",
      pregunta:
        "Un hermano piensa que la música de la iglesia siempre fue como la de hoy. Explícale, con la historia y con la Biblia, cómo cantó la iglesia en distintas épocas y qué aprendemos de eso.",
      ideas: [
        { id: "israel", peso: 15, texto: "Israel cantaba con instrumentos y danza.", formas: ["israel", "moises", "levitas", "mar rojo"] },
        { id: "primera", peso: 20, texto: "La primera iglesia cantaba salmos e himnos a Cristo.", formas: ["primera iglesia", "primeros cristianos", "plinio", "himno a cristo"] },
        { id: "edad_media", peso: 20, texto: "En la Edad Media, el canto en latín dejó al pueblo callado.", formas: ["edad media", "latin", "monjes", "gregoriano"] },
        { id: "reforma", peso: 25, texto: "La Reforma devolvió el canto al pueblo; después vinieron los himnos y la alabanza de hoy.", formas: ["reforma", "lutero", "calvino", "wesley", "azusa"] },
        { id: "aprender", peso: 20, texto: "Aprendemos a probarlo todo con la Palabra, a cantar con entendimiento y a que cante todo el pueblo.", formas: ["con la palabra", "entendimiento", "todo el pueblo", "lo antiguo", "generacion a generacion"] },
      ],
      basta: 85,
      citas: ["Éxodo 15:1-2", "Salmos 150:3-6", "Mateo 26:30", "Efesios 5:19", "Filipenses 2:10-11", "1 Corintios 14:16", "1 Corintios 14:15", "Colosenses 3:16", "Salmos 40:3", "Salmos 145:4", "Salmos 78:4", "Apocalipsis 15:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Le diría que la música de la iglesia cambió mucho con los siglos. Israel cantaba con instrumentos y danza, como Moisés y María después del mar Rojo, y los levitas servían en el templo. La primera iglesia cantaba salmos, himnos y cánticos espirituales (Efesios 5:19), y hacia el año 112 Plinio contó que los cristianos cantaban un himno a Cristo como a un dios. En la Edad Media, el culto en latín, que el pueblo no entendía, dejó el canto en manos de los monjes y del canto gregoriano. La Reforma devolvió el canto al pueblo en su lengua, con Lutero y Calvino; después vinieron los himnos de Wesley y de Fanny Crosby, el avivamiento de la calle Azusa y la alabanza de hoy. De todo esto aprendemos a probar cada canto con la Palabra, a cantar con entendimiento y a que todo el pueblo cante, sin despreciar lo antiguo ni lo nuevo, porque generación a generación se celebran las obras de Dios (Salmos 145:4).",
    },
    {
      id: "alabanza-4-e5",
      tipo: "breve",
      pregunta:
        "Tu equipo discute si cantar solo himnos antiguos o solo cantos nuevos. Escribe, con la Biblia y con lo que aprendiste de la historia, una propuesta para tu iglesia.",
      ideas: [
        { id: "ambos", peso: 25, texto: "El cántico de Moisés y el del Cordero: lo antiguo y lo nuevo juntos.", formas: ["moises", "del cordero", "lo antiguo y lo nuevo", "antiguos y nuevos", "nuevos y antiguos"] },
        { id: "palabra", peso: 25, texto: "Probarlo todo con la Palabra: la letra importa más que el estilo.", formas: ["la palabra", "la letra", "el estilo", "biblic*"] },
        { id: "entender", peso: 15, texto: "Que el pueblo entienda y cante.", formas: ["entendimiento", "entienda", "todo el pueblo", "pueda cantar"] },
        { id: "generacion", peso: 20, texto: "Generación a generación: transmitirlo a los jóvenes.", formas: ["generacion", "jovenes", "venidera", "transmit*"] },
        { id: "propuesta", peso: 15, texto: "Una propuesta concreta.", formas: ["propongo", "cada domingo", "cada culto", "por ejemplo"] },
      ],
      basta: 85,
      citas: ["Apocalipsis 15:3", "Salmos 145:4", "Salmos 78:4", "Salmos 96:1", "Salmos 40:3", "Colosenses 3:16", "1 Corintios 14:15", "Efesios 5:19"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Propongo que no elijamos entre lo antiguo y lo nuevo, porque en el cielo se canta el cántico de Moisés y el cántico del Cordero (Apocalipsis 15:3): el antiguo y el nuevo suenan juntos. La historia muestra que cada generación escribió cantos nuevos, como Wesley en los avivamientos, y que la iglesia guardó los mejores. Lo que importa es la letra más que el estilo: probaremos cada canto con la Palabra, para que la palabra de Cristo more en abundancia en nosotros. También cuidaremos que todo el pueblo entienda y pueda cantar, porque cantamos con el entendimiento. Por ejemplo, cada domingo cantaremos un himno antiguo y varios cantos nuevos, y explicaremos el sentido de los himnos a los jóvenes, porque generación a generación se celebran las obras de Dios (Salmos 145:4).",
    },
  ],
  breve: {
    id: "alabanza-4-b1",
    tipo: "breve",
    pregunta:
      "Elige una época de la historia de la música de la iglesia que estudiaste y explica qué pasó, quiénes fueron sus protagonistas y qué lección deja para el ministerio de alabanza de hoy, con citas bíblicas.",
    ideas: [
      { id: "epoca", peso: 25, texto: "Nombra la época y lo que pasó.", formas: ["reforma", "edad media", "avivamiento*", "primera iglesia", "azusa", "el siglo"] },
      { id: "protagonistas", peso: 25, texto: "Nombra a sus protagonistas.", formas: ["lutero", "calvino", "wesley", "watts", "crosby", "sankey", "cabrera", "ambrosio", "seymour", "plinio", "ezequias"] },
      { id: "leccion", peso: 30, texto: "Saca una lección para el ministerio de hoy.", formas: ["la leccion", "aprendemos", "aprendo", "nuestro ministerio", "nuestra iglesia", "hoy debemos"] },
      { id: "palabra", peso: 20, texto: "La relaciona con la Palabra y con el canto de todo el pueblo.", formas: ["la palabra", "entendimiento", "todo el pueblo", "su lengua"] },
    ],
    basta: 85,
    citas: ["Éxodo 15:1-2", "2 Crónicas 29:27-28", "Salmos 137:1-4", "Mateo 26:30", "Efesios 5:19", "Filipenses 2:10-11", "1 Corintios 14:16", "1 Corintios 14:15", "Colosenses 3:16", "Salmos 46:1", "Salmos 40:3", "Salmos 145:4", "Salmos 78:4", "Apocalipsis 15:3"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Elegí la Reforma del siglo XVI. Antes, el culto se celebraba en latín, que el pueblo no entendía, y el canto estaba en manos de los monjes y los coros. Martín Lutero quiso que el pueblo cantara en su propia lengua y escribió himnos en alemán, como Castillo fuerte es nuestro Dios, basado en el Salmo 46. Juan Calvino impulsó el canto de los salmos en francés, y en 1562 se completó el Salterio de Ginebra con los 150 salmos en verso. La lección para nuestro ministerio hoy es clara: el canto es de todo el pueblo, y tenemos que cantar con el espíritu y también con el entendimiento (1 Corintios 14:15). Por eso aprendemos a escoger cantos llenos de la Palabra, en la lengua de nuestra gente, que todos puedan aprender y cantar, para que la palabra de Cristo more en abundancia en nosotros (Colosenses 3:16).",
  },
};
