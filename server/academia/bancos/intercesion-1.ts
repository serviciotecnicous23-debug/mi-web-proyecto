/**
 * El banco de «Teología de la oración» (especialidad Intercesión y oración). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el Dios que oye · o2 al Padre, por el Hijo, en el Espíritu · o3 la oración y la voluntad de Dios ·
 * o4 por qué orar si Dios ya sabe · o5 cuando Dios dice no o espera · o6 lo que estorba la oración · o7 el versículo de
 * memoria (Jeremías 33:3).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `intercesion-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_INTERCESION_1: BancoMateria = {
  materia: "intercesion-1",
  repaso: {
    "intercesion-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dice Salmos 65:2 de Dios?", "Que oye la oración", ["Que está lejos", "Que no responde", "Que solo oye a los sacerdotes"], "«Tú oyes la oración; A ti vendrá toda carne».", "Salmos 65:2"],
      ["1-r2", 1, "o1", "comprender", "¿Dónde empieza la oración, según la lección?", "En la invitación de Dios a clamar a él", ["En nuestra necesidad solamente", "En una fórmula correcta", "En el lugar donde se ora"], "«Clama a mí, y yo te responderé».", "Jeremías 33:3"],
      ["1-r3", 1, "o1", "aplicar", "Una hermana dice que no ora porque no sabe usar palabras bonitas. ¿Qué le enseña Salmos 145:18?", "Que Dios está cerca de los que le invocan de veras: busca sinceridad, no palabras perfectas", ["Que debe aprender palabras difíciles", "Que solo los pastores pueden orar", "Que Dios no la oirá"], "«Cercano está Jehová a todos los que le invocan, A todos los que le invocan de veras».", "Salmos 145:18"],
    ] as P[]).map(p),
    "intercesion-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿A quién tenemos entrada por un mismo Espíritu, según Efesios 2:18?", "Al Padre", ["A los ángeles", "A los santos", "Al templo"], "«porque por medio de él los unos y los otros tenemos entrada por un mismo Espíritu al Padre».", "Efesios 2:18"],
      ["2-r2", 2, "o2", "comprender", "¿Qué significa orar en el nombre de Jesús, según la lección?", "Orar por medio de él, confiando en su obra y pidiendo lo que él pediría", ["Repetir su nombre al final como una fórmula", "Orar solo en la iglesia", "Usar su nombre para conseguir cualquier cosa"], "«todo cuanto pidiereis al Padre en mi nombre, os lo dará».", "Juan 16:23-24"],
      ["2-r3", 2, "o2", "aplicar", "Un hermano en una gran prueba no sabe qué pedir. ¿Qué consuelo le da Romanos 8:26?", "Que el Espíritu lo ayuda en su debilidad e intercede por él", ["Que debe dejar de orar", "Que Dios no oye a los débiles", "Que tiene que encontrar las palabras exactas"], "«Y de igual manera el Espíritu nos ayuda en nuestra debilidad».", "Romanos 8:26-27"],
    ] as P[]).map(p),
    "intercesion-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pidió Jesús en Getsemaní después de pedir que pasara la copa?", "Que no fuera como él quería, sino como el Padre", ["Que lo libraran los ángeles", "Que castigaran a Judas", "Que lo dejaran solo"], "«pero no sea como yo quiero, sino como tú».", "Mateo 26:39"],
      ["3-r2", 3, "o3", "comprender", "¿Qué confianza da 1 Juan 5:14?", "Que si pedimos conforme a su voluntad, él nos oye", ["Que Dios da todo lo que se pide", "Que la voluntad de Dios no se puede conocer", "Que solo oye a los perfectos"], "«si pedimos alguna cosa conforme a su voluntad, él nos oye».", "1 Juan 5:14-15"],
      ["3-r3", 3, "o3", "aplicar", "¿Dónde busca el que ora la voluntad de Dios, según la lección?", "En su Palabra", ["En los sueños solamente", "En la opinión de la mayoría", "En las circunstancias favorables"], "«Hágase tu voluntad, como en el cielo, así también en la tierra».", "Mateo 6:9-10"],
    ] as P[]).map(p),
    "intercesion-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué dice Jesús en Mateo 6:8 sobre lo que necesitamos?", "Que el Padre sabe lo que necesitamos antes que le pidamos", ["Que el Padre no lo sabe", "Que hay que explicarle todo", "Que solo sabe lo que se repite"], "«porque vuestro Padre sabe de qué cosas tenéis necesidad, antes que vosotros le pidáis».", "Mateo 6:7-8"],
      ["4-r2", 4, "o4", "comprender", "¿Por qué no tenían lo que deseaban, según Santiago 4:2?", "Porque no pedían", ["Porque Dios es tacaño", "Porque oraban mucho", "Porque ayunaban"], "«no tenéis lo que deseáis, porque no pedís».", "Santiago 4:2-3"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué es pedir mal, según Santiago 4:3?", "Pedir solo para gastar en los propios deleites", ["Pedir con fe", "Pedir por otros", "Pedir en el nombre de Jesús"], "«Pedís, y no recibís, porque pedís mal, para gastar en vuestros deleites».", "Santiago 4:2-3"],
    ] as P[]).map(p),
    "intercesion-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cuántas veces rogó Pablo que le quitaran el aguijón?", "Tres veces", ["Una vez", "Siete veces", "Cuarenta veces"], "«respecto a lo cual tres veces he rogado al Señor, que lo quite de mí».", "2 Corintios 12:8-9"],
      ["5-r2", 5, "o5", "comprender", "¿Qué le respondió el Señor a Pablo?", "Bástate mi gracia; mi poder se perfecciona en la debilidad", ["Que no lo había oído", "Que orara con más fe", "Que el aguijón era un castigo"], "«Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:8-9"],
      ["5-r3", 5, "o5", "aplicar", "Un joven ora hace meses por algo que no llega. ¿Qué le enseña Lucas 18:1?", "Que hay que orar siempre y no desmayar", ["Que deje de orar", "Que Dios no lo oye", "Que ore solo una vez más"], "«sobre la necesidad de orar siempre, y no desmayar».", "Lucas 18:1"],
    ] as P[]).map(p),
    "intercesion-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hace división entre el pueblo y su Dios, según Isaías 59:2?", "Sus iniquidades", ["La distancia", "La falta de templo", "El idioma"], "«vuestras iniquidades han hecho división entre vosotros y vuestro Dios».", "Isaías 59:1-2"],
      ["6-r2", 6, "o6", "comprender", "¿Qué une Jesús a la fe en Marcos 11:25?", "El perdón: perdonar si tenemos algo contra alguno", ["El ayuno", "La ofrenda", "El silencio"], "«cuando estéis orando, perdonad, si tenéis algo contra alguno».", "Marcos 11:24-25"],
      ["6-r3", 6, "o6", "aplicar", "Un marido trata mal a su esposa y luego ora mucho. ¿Qué enseña 1 Pedro 3:7?", "Que su trato a la esposa estorba sus oraciones", ["Que no tiene relación", "Que ore más fuerte", "Que la oración cubre todo"], "«para que vuestras oraciones no tengan estorbo».", "1 Pedro 3:7"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El Dios que oye la oración
    ["f01", 1, "o1", "recordar", "¿Qué promete Dios al que clama a él, según Jeremías 33:3?", "Responderle y enseñarle cosas grandes y ocultas", ["Darle riquezas", "Quitarle todo problema", "Hacerlo famoso"], "«yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces».", "Jeremías 33:3"],
    ["f02", 1, "o1", "comprender", "¿Qué distingue al Dios vivo de los ídolos, según la lección?", "Que oye y responde a los suyos", ["Que está hecho de oro", "Que vive en un templo", "Que no habla"], "«Tú oyes la oración».", "Salmos 65:2"],
    ["f03", 1, "o1", "recordar", "¿A quiénes está cercano Jehová, según Salmos 145:18?", "A todos los que le invocan de veras", ["Solo a los sacerdotes", "A los que oran en voz alta", "A los que no pecan nunca"], "«Cercano está Jehová a todos los que le invocan».", "Salmos 145:18"],
    ["f04", 1, "o1", "comprender", "¿Cómo invita Hebreos 4:16 a acercarnos al trono de la gracia?", "Confiadamente", ["Con miedo", "Una vez al año", "Por medio de un sacerdote"], "«Acerquémonos, pues, confiadamente al trono de la gracia».", "Hebreos 4:16"],
    ["f05", 1, "o1", "analizar", "¿Por qué el trono de Dios es llamado trono de la gracia?", "Porque Dios es Rey y nos recibe por Cristo con misericordia", ["Porque es de oro", "Porque está en el templo", "Porque nadie puede acercarse"], "«para alcanzar misericordia y hallar gracia para el oportuno socorro».", "Hebreos 4:16"],
    ["f06", 1, "o1", "aplicar", "¿Cómo se ora a un Dios que es Rey y Padre a la vez, según la lección?", "Con reverencia y con confianza", ["Con miedo y distancia", "Con exigencias", "Sin pensar en él"], "«Acerquémonos, pues, confiadamente al trono de la gracia».", "Hebreos 4:16"],
    ["f07", 1, "o1", "comprender", "¿Qué busca Dios en la oración, según la lección?", "Sinceridad, no palabras perfectas", ["Palabras difíciles", "Oraciones largas", "Repeticiones"], "«A todos los que le invocan de veras».", "Salmos 145:18"],
    ["f08", 1, "o1", "evaluar", "¿Cuál de estas frases describe mejor la oración cristiana?", "Una relación con un Dios personal que oye", ["Un ritual que se cumple", "Una fórmula para conseguir cosas", "Un monólogo sin respuesta"], "«Clama a mí, y yo te responderé».", "Jeremías 33:3"],
    ["f09", 1, "o1", "recordar", "¿Quién vendrá a Dios, según Salmos 65:2?", "Toda carne", ["Solo Israel", "Solo los reyes", "Nadie"], "«A ti vendrá toda carne».", "Salmos 65:2"],
    ["f10", 1, "o7", "recordar", "Completa Jeremías 33:3: Clama a mí, y yo te responderé…", "y te enseñaré cosas grandes y ocultas que tú no conoces", ["y te daré todo lo que pidas", "y te libraré de toda prueba", "y nunca más tendrás que orar"], "«Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces».", "Jeremías 33:3"],
    // Lección 2 · Al Padre, por el Hijo, en el Espíritu
    ["f11", 2, "o2", "recordar", "¿Por medio de quién tenemos entrada al Padre, según Efesios 2:18?", "Por medio de Cristo", ["Por medio de los ángeles", "Por medio de María", "Por medio de nuestras obras"], "«porque por medio de él los unos y los otros tenemos entrada».", "Efesios 2:18"],
    ["f12", 2, "o2", "comprender", "¿Qué forma tiene la oración cristiana, según la lección?", "Se ora al Padre, por medio del Hijo, con la ayuda del Espíritu", ["Se ora a cualquier santo", "Se ora solo al Espíritu", "Se ora sin dirigirse a nadie"], "«tenemos entrada por un mismo Espíritu al Padre».", "Efesios 2:18"],
    ["f13", 2, "o2", "recordar", "¿Para qué dice Jesús que pidamos en su nombre, según Juan 16:24?", "Para que nuestro gozo sea cumplido", ["Para ser famosos", "Para no trabajar", "Para tener razón"], "«pedid, y recibiréis, para que vuestro gozo sea cumplido».", "Juan 16:23-24"],
    ["f14", 2, "o2", "analizar", "¿Por qué orar en el nombre de Jesús no es una fórmula mágica?", "Porque es confiar en su obra y pedir lo que él pediría, no repetir una frase", ["Porque no funciona", "Porque solo vale en la iglesia", "Porque hay que decirlo en griego"], "«todo cuanto pidiereis al Padre en mi nombre, os lo dará».", "Juan 16:23-24"],
    ["f15", 2, "o2", "recordar", "¿Cómo intercede el Espíritu por nosotros, según Romanos 8:26?", "Con gemidos indecibles", ["Con gritos", "Con libros", "En silencio absoluto"], "«el Espíritu mismo intercede por nosotros con gemidos indecibles».", "Romanos 8:26-27"],
    ["f16", 2, "o2", "comprender", "¿Conforme a qué intercede el Espíritu por los santos, según Romanos 8:27?", "Conforme a la voluntad de Dios", ["Conforme a nuestros caprichos", "Conforme a la costumbre", "Conforme a la ley de Moisés"], "«porque conforme a la voluntad de Dios intercede por los santos».", "Romanos 8:26-27"],
    ["f17", 2, "o2", "aplicar", "¿Qué hace el creyente cuando le faltan las palabras para orar?", "Ora igual, confiando en que el Espíritu lo ayuda", ["Deja de orar", "Espera a encontrar las palabras exactas", "Le pide a otro que ore por él siempre"], "«el Espíritu nos ayuda en nuestra debilidad».", "Romanos 8:26-27"],
    ["f18", 2, "o2", "comprender", "¿Qué queda para la declaración de fe por confirmar, según la lección?", "Lo que el ministerio enseña sobre la oración en lenguas", ["Si Dios oye la oración", "Si se ora al Padre", "Si Jesús es el mediador"], "«el Espíritu nos ayuda en nuestra debilidad».", "Romanos 8:26-27"],
    ["f19", 2, "o2", "evaluar", "¿Cuál de estas oraciones sigue mejor la enseñanza de la lección?", "Padre, en el nombre de Jesús, ayúdame por tu Espíritu a hacer tu voluntad", ["Ángeles, denme lo que pido", "Si repito esto diez veces, se cumplirá", "Destino, cambia mi suerte"], "«tenemos entrada por un mismo Espíritu al Padre».", "Efesios 2:18"],
    ["f20", 2, "o2", "recordar", "¿Quién nos ayuda en nuestra debilidad, según Romanos 8:26?", "El Espíritu", ["La fuerza de voluntad", "Los astros", "El pastor"], "«Y de igual manera el Espíritu nos ayuda en nuestra debilidad».", "Romanos 8:26-27"],
    // Lección 3 · La oración y la voluntad de Dios
    ["f21", 3, "o3", "recordar", "¿Qué pide el Padre nuestro antes de pedir el pan?", "Que el nombre de Dios sea santificado, que venga su reino y que se haga su voluntad", ["Que nos den riquezas", "Que castigue a los enemigos", "Que nos libre de trabajar"], "«santificado sea tu nombre. Venga tu reino. Hágase tu voluntad».", "Mateo 6:9-10"],
    ["f22", 3, "o3", "comprender", "¿Qué enseña el orden del Padre nuestro?", "Que la oración pone primero a Dios y su voluntad", ["Que lo nuestro va primero", "Que no hay que pedir nada", "Que el orden no importa"], "«Hágase tu voluntad, como en el cielo, así también en la tierra».", "Mateo 6:9-10"],
    ["f23", 3, "o3", "recordar", "¿Qué pidió Jesús primero en Getsemaní?", "Que si era posible pasara de él esa copa", ["Que le dieran fuerzas para pelear", "Que llegaran sus discípulos", "Que se hiciera de día"], "«Padre mío, si es posible, pase de mí esta copa».", "Mateo 26:39"],
    ["f24", 3, "o3", "analizar", "¿Qué enseña Getsemaní sobre orar conforme a la voluntad de Dios?", "Que no es callar lo que sentimos, sino confiar en Dios más que en nuestros deseos", ["Que no hay que expresar lo que sentimos", "Que hay que imponer nuestra voluntad", "Que Dios no escucha la angustia"], "«pero no sea como yo quiero, sino como tú».", "Mateo 26:39"],
    ["f25", 3, "o3", "recordar", "¿Qué sabemos si sabemos que Dios nos oye, según 1 Juan 5:15?", "Que tenemos las peticiones que le hayamos hecho", ["Que no hace falta pedir", "Que todo será fácil", "Que nunca sufriremos"], "«sabemos que tenemos las peticiones que le hayamos hecho».", "1 Juan 5:14-15"],
    ["f26", 3, "o3", "comprender", "¿Qué voluntad de Dios ya está revelada en la Biblia, según la lección?", "La salvación de los perdidos, la santidad de los suyos y la unidad de la iglesia", ["El número de la lotería", "Con quién debe casarse cada uno, con nombre", "La fecha del fin del mundo"], "«si pedimos alguna cosa conforme a su voluntad, él nos oye».", "1 Juan 5:14-15"],
    ["f27", 3, "o3", "aplicar", "¿Cómo se ora cuando la Biblia lo dice claro, por ejemplo por la salvación de un amigo?", "Con plena confianza, porque es la voluntad de Dios", ["Con dudas", "Sin esperanza", "Solo una vez"], "«si pedimos alguna cosa conforme a su voluntad, él nos oye».", "1 Juan 5:14-15"],
    ["f28", 3, "o3", "aplicar", "¿Cómo se ora cuando no sabemos cuál es la voluntad de Dios en un asunto?", "Con sinceridad y rindiéndonos: hágase tu voluntad", ["Exigiendo una respuesta inmediata", "Sin orar", "Decidiendo primero y pidiendo después"], "«no sea como yo quiero, sino como tú».", "Mateo 26:39"],
    ["f29", 3, "o3", "evaluar", "¿Cuál es la oración más madura, según la lección?", "La que busca que la voluntad de Dios se haga en nosotros y en el mundo", ["La que logra que Dios haga lo que queremos", "La más larga", "La más emotiva"], "«Venga tu reino. Hágase tu voluntad».", "Mateo 6:9-10"],
    ["f30", 3, "o3", "recordar", "¿Dónde dice Mateo 6:10 que se haga la voluntad de Dios?", "Como en el cielo, así también en la tierra", ["Solo en el cielo", "Solo en el templo", "Solo en la iglesia"], "«como en el cielo, así también en la tierra».", "Mateo 6:9-10"],
    // Lección 4 · ¿Para qué orar si Dios ya sabe?
    ["f31", 4, "o4", "recordar", "¿Qué no hay que usar al orar, según Mateo 6:7?", "Vanas repeticiones", ["Palabras sencillas", "La Biblia", "El nombre de Jesús"], "«Y orando, no uséis vanas repeticiones, como los gentiles».", "Mateo 6:7-8"],
    ["f32", 4, "o4", "comprender", "¿Por qué los gentiles usaban vanas repeticiones, según Mateo 6:7?", "Porque pensaban que por su palabrería serían oídos", ["Porque conocían a Dios", "Porque tenían fe", "Porque así lo mandaba la ley"], "«que piensan que por su palabrería serán oídos».", "Mateo 6:7-8"],
    ["f33", 4, "o4", "analizar", "Si Dios ya sabe lo que necesitamos, ¿por qué orar, según la lección?", "Porque Dios estableció la oración como medio para obrar, y la oración nos cambia", ["No hace falta orar", "Para informarle a Dios", "Para convencerlo con muchas palabras"], "«no tenéis lo que deseáis, porque no pedís».", "Santiago 4:2-3"],
    ["f34", 4, "o4", "recordar", "¿Qué tres verbos usa Jesús en Lucas 11:9?", "Pedir, buscar y llamar", ["Comer, beber y dormir", "Correr, saltar y gritar", "Leer, escribir y contar"], "«Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá».", "Lucas 11:9-10"],
    ["f35", 4, "o4", "comprender", "¿Qué clase de oración describen pedir, buscar y llamar?", "Una oración insistente y confiada", ["Una oración de una sola vez", "Una oración sin fe", "Una oración en silencio total"], "«Porque todo aquel que pide, recibe; y el que busca, halla».", "Lucas 11:9-10"],
    ["f36", 4, "o4", "aplicar", "¿Qué es pedir bien, según la lección?", "Pedir para la gloria de Dios y el bien de otros, no solo para los propios deleites", ["Pedir con muchas palabras", "Pedir solo lo material", "Pedir sin pensar"], "«porque pedís mal, para gastar en vuestros deleites».", "Santiago 4:2-3"],
    ["f37", 4, "o4", "comprender", "¿Qué hace la oración en nosotros, según la lección?", "Nos hace depender de Dios y conocerlo", ["Nos hace autosuficientes", "Nos aleja de los demás", "Nada"], "«Pedid, y se os dará».", "Lucas 11:9-10"],
    ["f38", 4, "o4", "evaluar", "Un hermano ora una hora repitiendo la misma frase para que Dios lo escuche. ¿Qué diría Jesús?", "Que no se usen vanas repeticiones, porque el Padre ya sabe lo que necesita", ["Que lo haga dos horas", "Que así se convence a Dios", "Que la cantidad es lo que importa"], "«No os hagáis, pues, semejantes a ellos».", "Mateo 6:7-8"],
    ["f39", 4, "o4", "aplicar", "¿Qué conviene revisar cuando una petición no se cumple, según Santiago 4:3?", "Si se está pidiendo solo para los propios deleites", ["Si se dijo la fórmula correcta", "Si se oró en voz alta", "Si se oró de pie"], "«Pedís, y no recibís, porque pedís mal».", "Santiago 4:2-3"],
    ["f40", 4, "o4", "recordar", "¿Qué pasa con el que llama, según Lucas 11:10?", "Se le abrirá", ["Se le cerrará", "Nadie le responderá", "Tendrá que esperar siempre"], "«y al que llama, se le abrirá».", "Lucas 11:9-10"],
    // Lección 5 · Cuando Dios dice no o espera
    ["f41", 5, "o5", "recordar", "¿Qué le quería quitar Pablo al Señor en 2 Corintios 12?", "Un aguijón en la carne", ["Una deuda", "Un enemigo político", "Un barco"], "«tres veces he rogado al Señor, que lo quite de mí».", "2 Corintios 12:8-9"],
    ["f42", 5, "o5", "comprender", "¿Dónde se perfecciona el poder de Dios, según 2 Corintios 12:9?", "En la debilidad", ["En la fuerza humana", "En la riqueza", "En la fama"], "«porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:8-9"],
    ["f43", 5, "o5", "analizar", "¿Qué muestra la respuesta de Dios a Pablo?", "Que Dios oyó y respondió con algo mejor: su gracia", ["Que Dios no lo oyó", "Que Pablo no tenía fe", "Que Dios estaba enojado con él"], "«Bástate mi gracia».", "2 Corintios 12:8-9"],
    ["f44", 5, "o5", "recordar", "¿Qué le dijo Dios a Habacuc sobre la visión que tardaba?", "Aunque tardare, espéralo, porque sin duda vendrá", ["Que nunca llegaría", "Que se olvidara de ella", "Que la cambiara"], "«aunque tardare, espéralo, porque sin duda vendrá, no tardará».", "Habacuc 2:3"],
    ["f45", 5, "o5", "comprender", "¿Qué enseña Habacuc 2:3 sobre los tiempos de Dios?", "Que no son los nuestros, pero Dios cumple", ["Que Dios llega tarde", "Que Dios se olvida", "Que hay que apurarlo"], "«y no mentirá; aunque tardare, espéralo».", "Habacuc 2:3"],
    ["f46", 5, "o5", "recordar", "¿Sobre qué refirió Jesús la parábola de Lucas 18:1?", "Sobre la necesidad de orar siempre y no desmayar", ["Sobre el diezmo", "Sobre el ayuno", "Sobre la cosecha"], "«sobre la necesidad de orar siempre, y no desmayar».", "Lucas 18:1"],
    ["f47", 5, "o5", "comprender", "¿Qué es perseverar en la oración, según la lección?", "Seguir confiando en Dios, no presionarlo", ["Obligar a Dios", "Repetir fórmulas", "Orar con enojo"], "«orar siempre, y no desmayar».", "Lucas 18:1"],
    ["f48", 5, "o5", "comprender", "¿Qué queda para la declaración de fe por confirmar, según la nota de la lección?", "Lo que el ministerio enseña sobre la sanidad divina, como la sanidad en la expiación", ["Si hay que orar por los enfermos", "Si Dios oye la oración", "Si Dios sana"], "«Bástate mi gracia».", "2 Corintios 12:8-9"],
    ["f49", 5, "o5", "evaluar", "¿Cuáles son las respuestas de Dios a la oración, según la lección?", "Sí, no o espera; y en todos los casos Dios oyó", ["Solo sí", "Solo no", "Ninguna: Dios no responde"], "«Bástate mi gracia; porque mi poder se perfecciona en la debilidad».", "2 Corintios 12:8-9"],
    ["f50", 5, "o5", "aplicar", "Una hermana oró por la sanidad de su padre, y él murió. ¿Qué la consolaría según la lección?", "Que Dios la oyó, y que su gracia le basta también en esta respuesta inesperada", ["Que su fe no sirvió", "Que Dios no oye", "Que no vuelva a orar"], "«Bástate mi gracia».", "2 Corintios 12:8-9"],
    // Lección 6 · Lo que estorba la oración
    ["f51", 6, "o6", "recordar", "¿Qué dice Isaías 59:1 de la mano y del oído de Jehová?", "Que no se ha acortado su mano para salvar ni se ha agravado su oído para oír", ["Que se cansó de salvar", "Que ya no oye", "Que está ocupado"], "«no se ha acortado la mano de Jehová para salvar, ni se ha agravado su oído para oír».", "Isaías 59:1-2"],
    ["f52", 6, "o6", "comprender", "¿Dónde está el problema cuando la oración se estorba, según Isaías 59?", "En nosotros, en nuestras iniquidades, no en Dios", ["En Dios", "En el lugar", "En la hora"], "«vuestras iniquidades han hecho división entre vosotros y vuestro Dios».", "Isaías 59:1-2"],
    ["f53", 6, "o6", "recordar", "¿Qué dice el salmista que pasaría si mirara a la iniquidad en su corazón?", "Que el Señor no lo habría escuchado", ["Que el Señor lo premiaría", "Que no pasaría nada", "Que oraría mejor"], "«Si en mi corazón hubiese yo mirado a la iniquidad, El Señor no me habría escuchado».", "Salmos 66:18"],
    ["f54", 6, "o6", "comprender", "¿Por qué no se puede pedir perdón a Dios guardando rencor, según la lección?", "Porque Jesús une la oración con perdonar a los demás", ["Porque el rencor es pequeño", "Porque Dios no perdona", "Sí se puede, no importa"], "«cuando estéis orando, perdonad».", "Marcos 11:24-25"],
    ["f55", 6, "o6", "recordar", "¿A qué compara Santiago al que duda?", "A la onda del mar, arrastrada por el viento", ["A una roca firme", "A un árbol plantado", "A un río tranquilo"], "«el que duda es semejante a la onda del mar».", "Santiago 1:6-7"],
    ["f56", 6, "o6", "comprender", "¿Cómo pide Santiago 1:6 que se ore?", "Con fe, no dudando nada", ["Con miedo", "Con dudas", "Sin pensar"], "«Pero pida con fe, no dudando nada».", "Santiago 1:6-7"],
    ["f57", 6, "o6", "analizar", "¿Qué relación hay entre el hogar y la oración, según 1 Pedro 3:7?", "El trato a la familia afecta la vida de oración", ["No tienen relación", "La oración reemplaza el buen trato", "Solo importa la iglesia"], "«para que vuestras oraciones no tengan estorbo».", "1 Pedro 3:7"],
    ["f58", 6, "o6", "aplicar", "Un creyente siente que su oración no avanza y tiene un rencor contra un hermano. ¿Qué le conviene hacer?", "Perdonar y buscar la reconciliación", ["Orar más fuerte", "Ignorar el rencor", "Dejar de orar"], "«perdonad, si tenéis algo contra alguno».", "Marcos 11:24-25"],
    ["f59", 6, "o6", "evaluar", "¿Cuál de estas cosas estorba la oración, según la lección?", "El pecado que no se confiesa", ["Orar con palabras sencillas", "Orar en la cocina", "Orar de rodillas"], "«Si en mi corazón hubiese yo mirado a la iniquidad».", "Salmos 66:18"],
    ["f60", 6, "o6", "aplicar", "¿Qué hace el que quiere orar con un corazón limpio, según la lección?", "Confiesa su pecado, perdona, pide con fe y cuida a su familia", ["Esconde su pecado", "Ora solo cuando está bien", "Espera a ser perfecto"], "«no se ha acortado la mano de Jehová para salvar».", "Isaías 59:1-2"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hace Dios con la oración, según Salmos 65:2?", "La oye", ["La ignora", "La olvida", "La rechaza"], "«Tú oyes la oración».", "Salmos 65:2"],
      ["m1-02", 1, "o1", "comprender", "¿Qué enseña que Dios diga clama a mí en Jeremías 33:3?", "Que la oración es una invitación de Dios", ["Que Dios está lejos", "Que hay que gritar", "Que solo los profetas oran"], "«Clama a mí, y yo te responderé».", "Jeremías 33:3"],
      ["m1-03", 1, "o1", "recordar", "¿Para qué nos acercamos al trono de la gracia, según Hebreos 4:16?", "Para alcanzar misericordia y hallar gracia para el oportuno socorro", ["Para ser juzgados", "Para pedir castigo", "Para ver a los ángeles"], "«para alcanzar misericordia y hallar gracia para el oportuno socorro».", "Hebreos 4:16"],
      ["m1-04", 1, "o1", "aplicar", "¿Qué significa invocar a Dios de veras, según la lección?", "Orar con sinceridad, no para cumplir", ["Orar muy largo", "Orar con palabras difíciles", "Orar solo en público"], "«A todos los que le invocan de veras».", "Salmos 145:18"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué el creyente puede acercarse con confianza a Dios?", "Porque por Cristo es recibido con gracia", ["Porque se lo merece", "Porque nunca peca", "Porque ora mucho"], "«Acerquémonos, pues, confiadamente al trono de la gracia».", "Hebreos 4:16"],
      ["m1-06", 1, "o7", "recordar", "¿Dónde está el versículo de memoria de esta materia?", "Jeremías 33:3", ["Salmos 65:2", "Hebreos 4:16", "Lucas 18:1"], "«Clama a mí, y yo te responderé».", "Jeremías 33:3"],
      ["m1-07", 2, "o2", "recordar", "¿Qué dijo Jesús que hará el Padre con lo que pidamos en su nombre?", "Nos lo dará", ["Lo olvidará", "Lo rechazará", "Lo guardará"], "«todo cuanto pidiereis al Padre en mi nombre, os lo dará».", "Juan 16:23-24"],
      ["m1-08", 2, "o2", "comprender", "¿Qué hace el Espíritu cuando no sabemos qué pedir como conviene?", "Intercede por nosotros", ["Se aleja", "Nos castiga", "Nos deja solos"], "«pues qué hemos de pedir como conviene, no lo sabemos, pero el Espíritu mismo intercede por nosotros».", "Romanos 8:26-27"],
      ["m1-09", 2, "o2", "recordar", "¿Quién escudriña los corazones, según Romanos 8:27?", "Dios", ["Los ángeles", "Los pastores", "Nosotros mismos"], "«Mas el que escudriña los corazones sabe cuál es la intención del Espíritu».", "Romanos 8:26-27"],
      ["m1-10", 2, "o2", "aplicar", "¿Qué error se corrige al entender que orar en el nombre de Jesús no es una fórmula?", "Pensar que basta decir su nombre al final para conseguir cualquier cosa", ["Pensar que hay que orar al Padre", "Pensar que Jesús es el mediador", "Pensar que el Espíritu ayuda"], "«todo cuanto pidiereis al Padre en mi nombre».", "Juan 16:23-24"],
      ["m1-11", 2, "o2", "analizar", "¿Qué papel tiene cada persona de la Trinidad en la oración, según la lección?", "Al Padre se ora, el Hijo es el camino y el Espíritu nos ayuda", ["Solo el Padre participa", "El Espíritu es el destino", "Ninguna participa"], "«por medio de él los unos y los otros tenemos entrada por un mismo Espíritu al Padre».", "Efesios 2:18"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estas afirmaciones sobre la oración es correcta?", "Aun cuando nos faltan las palabras, no oramos solos", ["Si no hay palabras, no hay oración", "El Espíritu ora en contra de la voluntad de Dios", "Hay que orar a los ángeles"], "«el Espíritu nos ayuda en nuestra debilidad».", "Romanos 8:26-27"],
      ["m1-13", 3, "o3", "recordar", "¿Cómo oraba Jesús en Getsemaní?", "Postrado sobre su rostro", ["De pie en el templo", "Sentado en la barca", "Caminando por la calle"], "«se postró sobre su rostro, orando».", "Mateo 26:39"],
      ["m1-14", 3, "o3", "comprender", "¿Qué tres peticiones del Padre nuestro ponen primero a Dios?", "Santificado sea tu nombre, venga tu reino y hágase tu voluntad", ["El pan, el perdón y la tentación", "La salud, el trabajo y la casa", "La fama, el dinero y el poder"], "«santificado sea tu nombre. Venga tu reino. Hágase tu voluntad».", "Mateo 6:9-10"],
      ["m1-15", 3, "o3", "aplicar", "Un joven quiere orar conforme a la voluntad de Dios sobre su carrera. ¿Qué hace?", "Busca en la Palabra los principios de Dios, ora con sinceridad y se rinde a su voluntad", ["Exige una señal inmediata", "Decide y luego le pide a Dios que lo apruebe", "No ora"], "«si pedimos alguna cosa conforme a su voluntad, él nos oye».", "1 Juan 5:14-15"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué Getsemaní muestra que se puede ser sincero y rendido a la vez?", "Porque Jesús expresó su angustia y se sometió al Padre", ["Porque Jesús no sintió nada", "Porque Jesús se negó a orar", "Porque el Padre cambió de plan"], "«Padre mío, si es posible, pase de mí esta copa; pero no sea como yo quiero».", "Mateo 26:39"],
      ["m1-17", 3, "o3", "recordar", "¿Qué confianza tenemos en Dios, según 1 Juan 5:14?", "Que si pedimos conforme a su voluntad, él nos oye", ["Que nunca nos corrige", "Que no hace falta orar", "Que todo saldrá como queremos"], "«Y esta es la confianza que tenemos en él».", "1 Juan 5:14-15"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas oraciones refleja mejor la voluntad de Dios revelada?", "Señor, salva a mi vecino y úsame para hablarle de ti", ["Señor, haz que me gane la lotería", "Señor, castiga a mi enemigo", "Señor, que todo sea fácil"], "«Hágase tu voluntad».", "Mateo 6:9-10"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué saben los creyentes del Padre, según Mateo 6:8?", "Que sabe lo que necesitan antes que le pidan", ["Que no sabe nada", "Que hay que explicarle todo", "Que se olvida"], "«porque vuestro Padre sabe de qué cosas tenéis necesidad».", "Mateo 6:7-8"],
      ["m2-02", 4, "o4", "comprender", "¿Qué muestra Santiago 4:2 sobre el poder de la oración?", "Que Dios decidió obrar por medio de la oración de su pueblo", ["Que la oración no sirve", "Que Dios no quiere que pidamos", "Que solo hay que trabajar"], "«porque no pedís».", "Santiago 4:2-3"],
      ["m2-03", 4, "o4", "recordar", "¿Qué recibe todo aquel que pide, según Lucas 11:10?", "Recibe", ["Nada", "Un castigo", "Solo la mitad"], "«Porque todo aquel que pide, recibe».", "Lucas 11:9-10"],
      ["m2-04", 4, "o4", "aplicar", "¿Cuál de estas peticiones es pedir bien?", "Señor, dame trabajo para sostener a mi familia y ayudar a otros", ["Señor, dame dinero para presumir", "Señor, que mi vecino fracase", "Señor, dame todo sin esfuerzo"], "«porque pedís mal, para gastar en vuestros deleites».", "Santiago 4:2-3"],
      ["m2-05", 4, "o4", "analizar", "¿Qué tienen en común Mateo 6:8 y Lucas 11:9?", "Dios ya sabe, y aun así invita a pedir con insistencia", ["Que no hay que pedir", "Que Dios no oye", "Que la oración es una fórmula"], "«Pedid, y se os dará».", "Lucas 11:9-10"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál de estas razones para orar es la más bíblica?", "Dios lo estableció como medio para obrar, y nos cambia y nos une a su obra", ["Para que Dios se entere", "Para cumplir una obligación", "Para que los demás vean"], "«no tenéis lo que deseáis, porque no pedís».", "Santiago 4:2-3"],
      ["m2-07", 5, "o5", "recordar", "¿De qué dice Pablo que se gloriará de buena gana?", "De sus debilidades", ["De sus fuerzas", "De sus riquezas", "De sus viajes"], "«de buena gana me gloriaré más bien en mis debilidades».", "2 Corintios 12:8-9"],
      ["m2-08", 5, "o5", "comprender", "¿Para qué se gloría Pablo en sus debilidades?", "Para que repose sobre él el poder de Cristo", ["Para que lo compadezcan", "Para no trabajar", "Para quejarse"], "«para que repose sobre mí el poder de Cristo».", "2 Corintios 12:8-9"],
      ["m2-09", 5, "o5", "recordar", "¿Qué dice Habacuc 2:3 que la visión no hará?", "No mentirá", ["No llegará", "No se cumplirá", "No será clara"], "«mas se apresura hacia el fin, y no mentirá».", "Habacuc 2:3"],
      ["m2-10", 5, "o5", "aplicar", "Un matrimonio ora hace años por un hijo. ¿Qué les enseña la lección?", "A seguir orando con confianza, porque Dios oye y responde a su tiempo", ["A dejar de orar", "A enojarse con Dios", "A pensar que Dios no los ama"], "«aunque tardare, espéralo».", "Habacuc 2:3"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué un no de Dios también es una respuesta de amor?", "Porque Dios da lo que es mejor, como su gracia en la debilidad", ["Porque Dios no quiere ayudarnos", "Porque nos castiga", "No es una respuesta de amor"], "«Bástate mi gracia».", "2 Corintios 12:8-9"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál de estas actitudes refleja la enseñanza de Lucas 18:1?", "Seguir orando sin desmayar mientras se espera", ["Dejar de orar después de un intento", "Orar con enojo", "Exigir a Dios una fecha"], "«orar siempre, y no desmayar».", "Lucas 18:1"],
      ["m2-13", 6, "o6", "recordar", "¿Qué han hecho los pecados del pueblo, según Isaías 59:2?", "Ocultar de ellos el rostro de Dios para no oír", ["Acercarlos a Dios", "Hacerlos más fuertes", "Nada"], "«vuestros pecados han hecho ocultar de vosotros su rostro para no oír».", "Isaías 59:1-2"],
      ["m2-14", 6, "o6", "recordar", "¿Qué pide Marcos 11:24 al orar?", "Creer que se recibirá lo que se pide", ["Dudar", "Exigir", "Repetir"], "«todo lo que pidiereis orando, creed que lo recibiréis».", "Marcos 11:24-25"],
      ["m2-15", 6, "o6", "comprender", "¿Qué no debe pensar el que duda, según Santiago 1:7?", "Que recibirá cosa alguna del Señor", ["Que Dios existe", "Que debe orar", "Que la Biblia es verdad"], "«No piense, pues, quien tal haga, que recibirá cosa alguna del Señor».", "Santiago 1:6-7"],
      ["m2-16", 6, "o6", "aplicar", "¿Qué hace un esposo que quiere que sus oraciones no tengan estorbo?", "Vive sabiamente con su esposa y la honra", ["Ora sin hablar con ella", "La ignora", "Ora más largo"], "«dando honor a la mujer como a vaso más frágil».", "1 Pedro 3:7"],
      ["m2-17", 6, "o6", "analizar", "¿Qué tienen en común el pecado guardado, el rencor y la duda en la oración?", "Que todos están en nosotros y estorban la oración", ["Que vienen de Dios", "Que ayudan a orar", "Que no importan"], "«pero vuestras iniquidades han hecho división».", "Isaías 59:1-2"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál es el primer paso para el que siente que Dios no lo oye por un pecado?", "Confesarlo, porque la mano de Dios no se ha acortado para salvar", ["Esconderlo mejor", "Dejar de orar", "Culpar a Dios"], "«He aquí que no se ha acortado la mano de Jehová para salvar».", "Isaías 59:1-2"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "intercesion-1-e1",
      tipo: "corta",
      pregunta: "Explica qué es la oración según la Biblia y con qué actitud se acerca el creyente a Dios.",
      ideas: [
        { id: "relacion", peso: 25, texto: "Es una relación con un Dios personal que oye y responde.", formas: ["relacion", "dios que oye", "oye la oracion", "nos oye", "responde"] },
        { id: "invitacion", peso: 20, texto: "Dios invita a clamar a él.", formas: ["clama a mi", "invita", "invitacion"] },
        { id: "confianza", peso: 25, texto: "Se acerca confiadamente al trono de la gracia, por Cristo.", formas: ["confiadamente", "con confianza", "trono de la gracia", "por cristo"] },
        { id: "sinceridad", peso: 20, texto: "Con reverencia y sinceridad, de veras.", formas: ["de veras", "sinceridad", "sincer*", "reverencia"] },
      ],
      citas: ["Salmos 65:2", "Jeremías 33:3", "Salmos 145:18", "Hebreos 4:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La oración es una relación con un Dios personal que oye la oración y responde (Salmos 65:2). Dios mismo invita: clama a mí, y yo te responderé. Por Cristo, el creyente se acerca confiadamente al trono de la gracia, con reverencia, porque Dios es Rey, y con sinceridad, invocándolo de veras.",
    },
    {
      id: "intercesion-1-e2",
      tipo: "corta",
      pregunta: "Explica qué significa orar al Padre, en el nombre de Jesús y con la ayuda del Espíritu.",
      ideas: [
        { id: "padre", peso: 20, texto: "Se ora al Padre.", formas: ["al padre", "el padre"] },
        { id: "nombre", peso: 30, texto: "En el nombre de Jesús: por medio de él y confiando en su obra, no como fórmula.", formas: ["por medio de", "su obra", "no es una formula", "no como formula", "lo que el pediria"], negativa: true },
        { id: "espiritu", peso: 25, texto: "El Espíritu nos ayuda en la debilidad e intercede.", formas: ["nos ayuda", "intercede", "debilidad"] },
        { id: "voluntad", peso: 15, texto: "Conforme a la voluntad de Dios.", formas: ["voluntad de dios", "su voluntad"] },
      ],
      citas: ["Efesios 2:18", "Juan 16:23-24", "Juan 16:23", "Romanos 8:26-27", "Romanos 8:26"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Oramos al Padre, por medio de Cristo, con la ayuda del Espíritu (Efesios 2:18). Orar en el nombre de Jesús no es una fórmula: es orar por medio de él, confiando en su obra y pidiendo lo que él pediría. Y el Espíritu nos ayuda en nuestra debilidad e intercede conforme a la voluntad de Dios.",
    },
    {
      id: "intercesion-1-e3",
      tipo: "corta",
      pregunta: "Explica por qué oramos si Dios ya sabe lo que necesitamos.",
      ideas: [
        { id: "sabe", peso: 20, texto: "Dios ya sabe lo que necesitamos; no hacen falta vanas repeticiones.", formas: ["ya sabe", "sabe lo que", "vanas repeticiones"] },
        { id: "medio", peso: 30, texto: "Dios estableció la oración como medio para obrar: no tenemos porque no pedimos.", formas: ["no pedis", "no pedimos", "medio para obrar", "establecio", "obra por medio"] },
        { id: "cambia", peso: 20, texto: "La oración nos cambia y nos hace depender de Dios.", formas: ["nos cambia", "depender", "dependemos", "conocerlo", "nos transforma"] },
        { id: "bien", peso: 20, texto: "Hay que pedir bien, no solo para los propios deleites.", formas: ["pedir bien", "pedimos mal", "deleites", "su gloria"] },
      ],
      citas: ["Mateo 6:7-8", "Mateo 6:8", "Santiago 4:2-3", "Santiago 4:2", "Lucas 11:9-10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios ya sabe lo que necesitamos, y por eso no hacen falta vanas repeticiones (Mateo 6:8). Pero él estableció la oración como medio para obrar: no tenemos porque no pedimos. Además, la oración nos cambia y nos hace depender de Dios. Hay que pedir bien, para su gloria, y no solo para los propios deleites.",
    },
    {
      id: "intercesion-1-e4",
      tipo: "breve",
      pregunta:
        "Un hermano te dice que dejó de orar porque Dios no le contestó lo que pedía. Escríbele un consejo, con la Biblia, sobre la voluntad de Dios y sobre cómo responde Dios a la oración.",
      ideas: [
        { id: "oye", peso: 20, texto: "Dios oye siempre.", formas: ["dios oye", "te oye", "siempre oye", "si oyo", "te oyo"] },
        { id: "respuestas", peso: 25, texto: "Dios responde sí, no o espera; a Pablo le dijo bástate mi gracia.", formas: ["bastate mi gracia", "su gracia", "dice espera", "aguijon", "pablo"] },
        { id: "voluntad", peso: 20, texto: "Orar conforme a la voluntad de Dios, como Jesús en Getsemaní.", formas: ["voluntad", "getsemani", "no sea como yo quiero"] },
        { id: "perseverar", peso: 20, texto: "Orar siempre y no desmayar.", formas: ["no desmayar", "orar siempre", "persever*", "sigue orando", "seguir orando"] },
        { id: "revisar", peso: 15, texto: "Revisar si algo estorba: pedir mal, rencor, pecado.", formas: ["pedis mal", "pedir mal", "deleites", "rencor", "estorba", "pecado"] },
      ],
      basta: 85,
      citas: ["2 Corintios 12:8-9", "2 Corintios 12:9", "Habacuc 2:3", "Lucas 18:1", "Mateo 26:39", "1 Juan 5:14-15", "Santiago 4:3", "Isaías 59:1-2", "Marcos 11:25"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano: no dejes de orar, porque Dios siempre oye, aunque no responda como esperamos. Pablo rogó tres veces que Dios le quitara el aguijón, y la respuesta fue otra: bástate mi gracia, porque mi poder se perfecciona en la debilidad (2 Corintios 12:9). A veces Dios dice no y nos da algo mejor; otras veces dice espera, como a Habacuc: aunque tardare, espéralo. Jesús en Getsemaní nos enseñó a orar con sinceridad y a rendirnos: no sea como yo quiero, sino como tú. Si pedimos conforme a su voluntad, él nos oye. También conviene revisar si algo estorba, como pedir mal, solo para los propios deleites, o guardar rencor. Y sobre todo, recuerda que Jesús enseñó a orar siempre y no desmayar (Lucas 18:1). Sigue orando con confianza.",
    },
    {
      id: "intercesion-1-e5",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de nuevos intercesores qué cosas estorban la oración según la Biblia y cómo puede el creyente orar con un corazón limpio.",
      ideas: [
        { id: "pecado", peso: 25, texto: "El pecado que no se confiesa hace división.", formas: ["iniquidad*", "pecado", "division", "confes*"] },
        { id: "perdon", peso: 25, texto: "El rencor: hay que perdonar al orar.", formas: ["perdon*", "rencor"] },
        { id: "fe", peso: 15, texto: "La duda: pedir con fe.", formas: ["con fe", "duda", "dudando"] },
        { id: "hogar", peso: 15, texto: "El trato en el hogar.", formas: ["esposa", "familia", "hogar", "maridos"] },
        { id: "dios_puede", peso: 20, texto: "Dios puede oír y salvar: el problema está en nosotros.", formas: ["no se ha acortado", "su mano", "esta en nosotros", "el problema"] },
      ],
      basta: 85,
      citas: ["Isaías 59:1-2", "Salmos 66:18", "Marcos 11:24-25", "Marcos 11:25", "Santiago 1:6-7", "1 Pedro 3:7", "1 Juan 1:9", "Santiago 4:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, Dios puede oír y salvar: no se ha acortado su mano ni se ha agravado su oído (Isaías 59:1). El problema, cuando la oración se estorba, está en nosotros. El primer estorbo es el pecado que no se confiesa: nuestras iniquidades hacen división entre nosotros y Dios, y el salmista dice que si mirara a la iniquidad en su corazón, el Señor no lo escucharía. Por eso empezamos confesando. El segundo es el rencor: Jesús dijo que cuando oremos, perdonemos si tenemos algo contra alguno (Marcos 11:25). El tercero es la duda: Santiago pide orar con fe, no dudando nada. El cuarto es el trato en el hogar: Pedro pide a los maridos que honren a su esposa para que sus oraciones no tengan estorbo. Así, el intercesor confiesa su pecado, perdona, ora con fe y cuida a su familia, y se acerca a Dios con un corazón limpio.",
    },
  ],
  breve: {
    id: "intercesion-1-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo ha cambiado tu manera de entender la oración con esta materia: a quién oras, cómo te acercas, qué lugar tiene la voluntad de Dios y qué harás cuando la respuesta tarde o no sea la que esperas, con citas bíblicas.",
    ideas: [
      { id: "quien", peso: 20, texto: "Ora al Padre, por Cristo, con la ayuda del Espíritu, a un Dios que oye.", formas: ["al padre", "por cristo", "el espiritu", "dios que oye", "me oye"] },
      { id: "acercarse", peso: 20, texto: "Se acerca con confianza y sinceridad.", formas: ["confiadamente", "confianza", "sinceridad", "de veras"] },
      { id: "voluntad", peso: 25, texto: "Busca la voluntad de Dios más que la propia.", formas: ["su voluntad", "voluntad de dios", "hagase tu voluntad", "no sea como yo quiero"] },
      { id: "espera", peso: 20, texto: "Persevera cuando la respuesta tarda o es otra.", formas: ["tardare", "la respuesta tarda", "esperar", "no desmayar", "bastate mi gracia", "persever*"] },
      { id: "cambio", peso: 15, texto: "Dice qué cambiará en su práctica.", formas: ["ahora entiendo", "antes oraba", "aprendi", "voy a (orar|acercarme|esperar|buscar|confiar)", "este cambio"] },
    ],
    basta: 85,
    citas: ["Jeremías 33:3", "Salmos 65:2", "Hebreos 4:16", "Efesios 2:18", "Juan 16:23-24", "Romanos 8:26-27", "Mateo 6:9-10", "Mateo 26:39", "1 Juan 5:14-15", "2 Corintios 12:9", "Habacuc 2:3", "Lucas 18:1"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Antes oraba como quien hace una lista de pedidos, a veces con miedo y con frases repetidas. Ahora entiendo que oro al Padre, por medio de Cristo, con la ayuda del Espíritu (Efesios 2:18), y que Dios me oye y me invita: clama a mí, y yo te responderé (Jeremías 33:3). Voy a acercarme con confianza al trono de la gracia, con sinceridad y sin vanas repeticiones. También aprendí que lo más importante es la voluntad de Dios: quiero orar como Jesús en Getsemaní, no sea como yo quiero, sino como tú. Cuando la respuesta tarde, voy a esperar, como Dios le dijo a Habacuc, y a orar siempre sin desmayar. Y cuando la respuesta no sea la que espero, recordaré que a Pablo le dijo bástate mi gracia (2 Corintios 12:9). Este cambio me da paz y más ganas de orar.",
  },
};
