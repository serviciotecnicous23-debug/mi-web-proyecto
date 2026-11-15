/**
 * El banco de «Griego y hebreo bíblicos para el estudio» (Nivel 5). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 los idiomas de la Biblia · o2 el hebreo y sus palabras clave · o3 el griego y sus palabras clave ·
 * o4 las herramientas del estudio · o5 el estudio de palabras · o6 los errores comunes y el buen uso · o7 el versículo de
 * memoria (Mateo 5:18). En la corta de «dos palabras clave», `basta` evita exigir todas las que la clave reconoce.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-idiomas-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_IDIOMAS: BancoMateria = {
  materia: "n5-idiomas",
  repaso: {
    "n5-idiomas-1": ([
      ["1-r1", 1, "o1", "recordar", "¿En qué idiomas estaba escrito el título sobre la cruz, según Juan 19:20?", "En hebreo, en griego y en latín", ["En egipcio, en persa y en griego", "Solo en latín", "En arameo y en árabe"], "«estaba escrito en hebreo, en griego y en latín».", "Juan 19:20"],
      ["1-r2", 1, "o1", "recordar", "¿En qué idioma se escribió el Nuevo Testamento?", "En griego", ["En hebreo", "En latín", "En español"], "En el griego koiné, el griego común de su tiempo.", "Juan 19:20"],
      ["1-r3", 1, "o1", "comprender", "¿Qué es la Septuaginta?", "La traducción griega del Antiguo Testamento, hecha en Alejandría antes de Cristo", ["Una carta de Pablo", "La primera Biblia en español", "Un manuscrito hebreo del año 1008"], "Los autores del Nuevo Testamento la citan muchas veces.", "Mateo 5:18"],
    ] as P[]).map(p),
    "n5-idiomas-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cuántas letras tiene el alfabeto hebreo?", "22", ["24", "27", "30"], "Todas son consonantes, y el Salmo 119 tiene una estrofa por cada una.", "Salmos 119:1"],
      ["2-r2", 2, "o2", "comprender", "¿Qué significa shalom?", "Plenitud, bienestar y relaciones en orden, no solo ausencia de guerra", ["Solo ausencia de guerra", "Riqueza material", "Silencio"], "«Jehová alce sobre ti su rostro, y ponga en ti paz».", "Números 6:26"],
      ["2-r3", 2, "o2", "recordar", "¿Cómo traduce la Reina-Valera el nombre YHWH?", "Jehová", ["Elohim", "Adonai", "Mesías"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
    ] as P[]).map(p),
    "n5-idiomas-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Cuántas letras tiene el alfabeto griego?", "24", ["22", "27", "30"], "«Yo soy el Alfa y la Omega»: la primera y la última de ellas.", "Apocalipsis 1:8"],
      ["3-r2", 3, "o3", "comprender", "¿Qué palabra griega traduce Verbo en Juan 1:1?", "Lógos", ["Ágape", "Cháris", "Pístis"], "«En el principio era el Verbo».", "Juan 1:1"],
      ["3-r3", 3, "o3", "comprender", "¿Qué significa metánoia?", "Un cambio de mente que lleva a un cambio de vida", ["Solo un sentimiento de tristeza", "Una ceremonia religiosa", "Un castigo"], "«Así que, arrepentíos y convertíos, para que sean borrados vuestros pecados».", "Hechos 3:19"],
    ] as P[]).map(p),
    "n5-idiomas-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué da la concordancia de Strong a cada palabra hebrea y griega?", "Un número", ["Un color", "Una letra", "Un precio"], "Con ese número se encuentran su sentido y los lugares donde aparece.", "Hechos 17:11"],
      ["4-r2", 4, "o4", "comprender", "¿Qué es un interlineal?", "El texto hebreo o griego con la traducción palabra por palabra debajo", ["Una Biblia sin texto original", "Un diccionario de sinónimos", "Un mapa"], "Por ejemplo, el de Lacueva para el Nuevo Testamento y el de Cerni para el Antiguo.", "Hechos 17:11"],
      ["4-r3", 4, "o4", "recordar", "¿Qué hacían los de Berea, según Hechos 17:11?", "Escudriñaban cada día las Escrituras", ["Las leían una vez al año", "No las leían", "Solo escuchaban"], "«escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
    ] as P[]).map(p),
    "n5-idiomas-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué palabra hebrea traduce la Reina-Valera misericordia en el Salmo 136?", "Jésed", ["Shalom", "Torá", "Rúaj"], "«Porque para siempre es su misericordia».", "Salmos 136:1"],
      ["5-r2", 5, "o5", "comprender", "¿Qué significa jésed?", "El amor leal de Dios, que cumple su pacto", ["El enojo de Dios", "Una fiesta judía", "La ley escrita"], "«tardo para la ira, y grande en misericordia y verdad».", "Éxodo 34:6"],
      ["5-r3", 5, "o5", "aplicar", "¿Cuál es el primer paso de un estudio de palabras?", "Escoger una palabra importante del pasaje", ["Buscar primero la conclusión", "Leer un comentario sin la Biblia", "Escoger la palabra más rara"], "Después se busca la palabra original y su número.", "Salmos 136:1"],
    ] as P[]).map(p),
    "n5-idiomas-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué palabra griega traduce poder en Romanos 1:16?", "Dýnamis", ["Lógos", "Ágape", "Ekklesía"], "«es poder de Dios para salvación a todo aquel que cree».", "Romanos 1:16"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué es un error decir que el poder del evangelio es dinamita?", "Porque la dinamita se inventó en 1867: es leer en la palabra un sentido que vino después", ["Porque dýnamis significa debilidad", "Porque Pablo escribió en latín", "No es un error"], "Ese error se llama anacronismo.", "Romanos 1:16"],
      ["6-r3", 6, "o6", "comprender", "¿Qué decide el sentido de una palabra en un pasaje?", "El contexto", ["Su origen o raíz", "El sentido más largo del diccionario", "Lo que le guste al predicador"], "«usa bien la palabra de verdad».", "2 Timoteo 2:15"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: los idiomas de la Biblia (10)
    ["f01", 1, "o1", "recordar", "¿En qué idioma se escribió casi todo el Antiguo Testamento?", "En hebreo", ["En griego", "En latín", "En egipcio"], "Algunas partes están en arameo.", "Mateo 5:18"],
    ["f02", 1, "o1", "recordar", "¿Qué idioma hermano del hebreo aparece en algunas partes del Antiguo Testamento?", "El arameo", ["El latín", "El persa", "El árabe"], "«Entonces hablaron los caldeos al rey en lengua aramea».", "Daniel 2:4"],
    ["f03", 1, "o1", "recordar", "¿Qué libros tienen partes escritas en arameo?", "Esdras y Daniel, y un versículo de Jeremías", ["Génesis y Éxodo", "Salmos y Proverbios", "Mateo y Marcos"], "Daniel, desde 2:4 hasta el final del capítulo 7.", "Daniel 2:4"],
    ["f04", 1, "o1", "comprender", "¿Qué es el griego koiné?", "El griego común que se hablaba en el Mediterráneo después de Alejandro Magno", ["El griego de los filósofos clásicos", "Un dialecto del hebreo", "El griego moderno"], "En él se escribió el Nuevo Testamento.", "Juan 19:20"],
    ["f05", 1, "o1", "recordar", "¿Dónde se tradujo la Septuaginta?", "En Alejandría", ["En Roma", "En Jerusalén", "En Atenas"], "Allí los judíos tradujeron el Antiguo Testamento al griego, siglos antes de Cristo.", "Mateo 5:18"],
    ["f06", 1, "o1", "recordar", "¿Qué añadieron los masoretas al texto hebreo?", "Los signos de las vocales", ["Los números de los capítulos", "Libros nuevos", "Las letras mayúsculas"], "Eran escribas judíos de la Edad Media.", "Mateo 5:18"],
    ["f07", 1, "o1", "recordar", "¿De qué año es el códice de Leningrado?", "Del año 1008", ["Del año 70", "Del año 1611", "Del año 1960"], "Es el manuscrito completo más antiguo que se conserva de la Biblia hebrea.", "Mateo 5:18"],
    ["f08", 1, "o1", "comprender", "¿Qué es la jota de Mateo 5:18?", "La yod, la letra más pequeña del alfabeto hebreo", ["La letra más grande del griego", "Un signo de puntuación del español", "Una palabra aramea"], "«ni una jota ni una tilde pasará de la ley».", "Mateo 5:18"],
    ["f09", 1, "o1", "evaluar", "¿Para qué sirve conocer un poco de los idiomas originales?", "Para ver más detalles del texto, sin despreciar las buenas traducciones", ["Para decir que las traducciones no sirven", "Para lucirse ante los demás", "No sirve para nada"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
    ["f10", 1, "o7", "recordar", "Completa Mateo 5:18: Porque de cierto os digo que hasta que pasen el cielo y la tierra…", "ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido", ["la ley será cambiada por otra", "nadie conocerá la ley de Dios", "la ley se escribirá en otro idioma"], "Es el versículo de memoria de la materia.", "Mateo 5:18"],
    // ---- lección 2: el hebreo y sus palabras clave (10)
    ["f11", 2, "o2", "recordar", "¿En qué dirección se lee el hebreo?", "De derecha a izquierda", ["De izquierda a derecha", "De arriba abajo", "En círculos"], "Por eso una Biblia hebrea empieza donde esperarías la última página.", "Salmos 119:1"],
    ["f12", 2, "o2", "comprender", "¿Cómo está ordenado el Salmo 119?", "En 22 estrofas de ocho versículos, una por cada letra hebrea", ["En 150 estrofas", "Sin ningún orden", "En 12 partes, una por cada tribu"], "En hebreo, los versículos de cada estrofa empiezan con la misma letra.", "Salmos 119:1"],
    ["f13", 2, "o2", "recordar", "¿Cuál es la primera letra del alfabeto hebreo?", "Álef", ["Tav", "Yod", "Shin"], "Por eso la primera estrofa del Salmo 119 lleva el nombre Alef.", "Salmos 119:1"],
    ["f14", 2, "o2", "comprender", "¿Qué pide la bendición de Números 6 al terminar con shalom?", "La plenitud y el bienestar que vienen de Dios", ["Solo que no haya guerra", "Una despedida sin sentido", "Riquezas para el pueblo"], "«y ponga en ti paz».", "Números 6:26"],
    ["f15", 2, "o2", "recordar", "¿Qué leían los judíos en lugar de pronunciar el nombre YHWH?", "Adonai, Señor", ["Elohim", "Shalom", "Mesías"], "Lo hacían por reverencia al nombre de Dios.", "Deuteronomio 6:4"],
    ["f16", 2, "o2", "comprender", "¿Qué diferencia hay entre YHWH y Elohim?", "YHWH es el nombre propio de Dios; Elohim es la palabra general para Dios", ["No hay ninguna diferencia", "Elohim es un ángel", "YHWH es un profeta"], "«Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
    ["f17", 2, "o2", "comprender", "¿Qué significa torá?", "Instrucción, la enseñanza de Dios para su pueblo", ["Castigo", "Templo", "Sacrificio"], "«Lámpara es a mis pies tu palabra».", "Salmos 119:105"],
    ["f18", 2, "o2", "recordar", "¿Qué otros sentidos tiene la palabra rúaj?", "Viento y aliento", ["Fuego y agua", "Tierra y mar", "Pan y vino"], "«y el Espíritu de Dios se movía sobre la faz de las aguas».", "Génesis 1:2"],
    ["f19", 2, "o2", "analizar", "¿Qué muestra que néfesh signifique también vida y persona?", "Que en hebreo el alma no es solo una parte de la persona, sino el ser entero", ["Que el alma no existe", "Que solo los animales tienen néfesh", "Nada"], "«y fue el hombre un ser viviente».", "Génesis 2:7"],
    ["f20", 2, "o2", "comprender", "¿Qué expresa el creyente al decir amén?", "Que lo dicho es firme y digno de confianza", ["Que la oración terminó y nada más", "Que no está de acuerdo", "Que quiere hablar"], "«porque todas las promesas de Dios son en él Sí, y en él Amén».", "2 Corintios 1:20"],
    // ---- lección 3: el griego y sus palabras clave (10)
    ["f21", 3, "o3", "recordar", "¿Qué letras griegas usa el Señor para presentarse en Apocalipsis 1:8?", "El Alfa y la Omega", ["El Álef y la Tav", "La Beta y la Delta", "La Pi y la Ro"], "«Yo soy el Alfa y la Omega, principio y fin, dice el Señor».", "Apocalipsis 1:8"],
    ["f22", 3, "o3", "recordar", "¿En qué dirección se lee el griego?", "De izquierda a derecha, como el español", ["De derecha a izquierda", "De abajo arriba", "En columnas de derecha a izquierda"], "Muchas de sus letras se parecen a las nuestras.", "Apocalipsis 1:8"],
    ["f23", 3, "o3", "comprender", "¿Qué sentidos tiene lógos?", "Palabra, mensaje y razón", ["Amor y paz", "Fuego y luz", "Ley y castigo"], "«y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
    ["f24", 3, "o3", "comprender", "¿Qué clase de amor es ágape en el Nuevo Testamento?", "El amor que se da por el bien del otro", ["Un sentimiento pasajero", "El amor solo entre amigos", "El amor al dinero"], "«Dios es amor».", "1 Juan 4:8"],
    ["f25", 3, "o3", "recordar", "¿Qué significa cháris?", "Gracia, el favor que no merecemos", ["Ley", "Fe", "Paz"], "«Porque por gracia sois salvos por medio de la fe».", "Efesios 2:8"],
    ["f26", 3, "o3", "comprender", "¿Qué dos sentidos tiene pístis?", "Fe y fidelidad", ["Paz y gozo", "Ley y gracia", "Amor y odio"], "Por eso algunas versiones dicen fidelidad donde la Reina-Valera dice fe, como en Gálatas 5:22.", "Gálatas 5:22"],
    ["f27", 3, "o3", "recordar", "¿Para qué se usaba la palabra euangélion en el mundo griego?", "Para anunciar una victoria o el nacimiento de un rey", ["Para nombrar un templo", "Para hablar del clima", "Para anunciar un castigo"], "«El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio».", "Marcos 1:15"],
    ["f28", 3, "o3", "comprender", "¿Qué era la ekklesía en las ciudades griegas?", "La asamblea de los ciudadanos convocados", ["Un templo pagano", "Un mercado", "Una escuela de filosofía"], "«edificaré mi iglesia».", "Mateo 16:18"],
    ["f29", 3, "o3", "recordar", "¿Qué significa koinonía?", "Comunión: tener algo en común y compartirlo", ["Soledad", "Competencia", "Obediencia"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros».", "Hechos 2:42"],
    ["f30", 3, "o3", "evaluar", "¿Qué enseña que el evangelio sea una buena noticia, un euangélion?", "Que anuncia lo que Dios ya hizo en Cristo, no un consejo para esforzarse", ["Que es una opinión", "Que es una ley más", "Que es solo para los griegos"], "«es poder de Dios para salvación».", "Romanos 1:16"],
    // ---- lección 4: las herramientas del estudio (10)
    ["f31", 4, "o4", "recordar", "¿Cuándo publicó James Strong su concordancia exhaustiva?", "En 1890", ["En 1517", "En 1960", "En 1569"], "Da un número a cada palabra hebrea y griega de la Biblia.", "Hechos 17:11"],
    ["f32", 4, "o4", "comprender", "¿Sobre qué traducción está hecha la Nueva concordancia Strong exhaustiva en español?", "Sobre la Reina-Valera 1960", ["Sobre la Vulgata", "Sobre la Biblia del Oso sin revisar", "Sobre ninguna traducción"], "Sus diccionarios del hebreo y del griego van por separado.", "Hechos 17:11"],
    ["f33", 4, "o4", "recordar", "¿Qué número tiene ágape en el diccionario griego de Strong?", "El 26", ["El 3056", "El 2617", "El 7965"], "Lógos es el 3056 del griego.", "1 Juan 4:8"],
    ["f34", 4, "o4", "recordar", "¿Qué número tiene jésed en el diccionario hebreo de Strong?", "El 2617", ["El 26", "El 3056", "El 1"], "Shalom es el 7965 del hebreo.", "Salmos 136:1"],
    ["f35", 4, "o4", "comprender", "¿Para qué sirve el número de Strong de una palabra?", "Para encontrar su sentido y todos los lugares donde aparece", ["Para saber su precio", "Para contar los capítulos", "Para nada"], "«escudriñando cada día las Escrituras».", "Hechos 17:11"],
    ["f36", 4, "o4", "recordar", "¿Quién hizo el Nuevo Testamento interlineal griego-español de la editorial CLIE?", "Francisco Lacueva", ["Ricardo Cerni", "W. E. Vine", "James Strong"], "El del Antiguo Testamento, hebreo-español, es de Ricardo Cerni.", "2 Timoteo 2:15"],
    ["f37", 4, "o4", "comprender", "¿Qué explica un diccionario expositivo como el de Vine?", "Las palabras originales que hay detrás de las palabras en español", ["Los mapas de la Biblia", "La historia de la iglesia", "Las reglas del español"], "Sirve para comparar en un estudio de palabras.", "2 Timoteo 2:15"],
    ["f38", 4, "o4", "comprender", "¿Para quién es útil un léxico?", "Para quien ya conoce la gramática de la lengua original", ["Para quien no lee", "Para los niños pequeños", "Para nadie"], "Es el diccionario de la lengua original.", "2 Timoteo 2:15"],
    ["f39", 4, "o4", "aplicar", "Quieres saber qué palabra griega hay detrás de amor en 1 Juan 4:8. ¿Qué herramienta usas?", "La concordancia de Strong o un interlineal", ["Un atlas bíblico", "Un himnario", "Un calendario"], "«Dios es amor».", "1 Juan 4:8"],
    ["f40", 4, "o4", "evaluar", "Encuentras en internet una explicación de una palabra hebrea sin ninguna fuente. ¿Qué haces?", "La compruebas en obras reconocidas antes de usarla", ["La enseñas enseguida", "La compartes porque suena bonita", "La aceptas porque tiene muchas visitas"], "«Examinadlo todo; retened lo bueno».", "1 Tesalonicenses 5:21"],
    // ---- lección 5: cómo hacer un estudio de palabras (10)
    ["f41", 5, "o5", "recordar", "¿Cuántas veces se repite en el Salmo 136 la frase porque para siempre es su misericordia?", "En cada uno de sus veintiséis versículos", ["Una sola vez", "Siete veces", "Cien veces"], "«Porque para siempre es su misericordia».", "Salmos 136:1"],
    ["f42", 5, "o5", "aplicar", "¿Qué haces después de encontrar la palabra original y su número?", "Miras dónde más aparece, sobre todo en el mismo libro y en el mismo autor", ["Concluyes enseguida", "Buscas la palabra en un diccionario de español", "Dejas de estudiar"], "Después lees cada uso en su contexto.", "Hechos 17:11"],
    ["f43", 5, "o5", "comprender", "¿Por qué hay que leer cada uso en su contexto?", "Porque la palabra puede tener sentidos distintos según el pasaje", ["Porque siempre significa lo mismo", "Para alargar el estudio", "No hace falta"], "«usa bien la palabra de verdad».", "2 Timoteo 2:15"],
    ["f44", 5, "o5", "recordar", "¿Cómo se reveló Dios a Moisés en Éxodo 34:6?", "Fuerte, misericordioso y piadoso, tardo para la ira y grande en misericordia y verdad", ["Como un juez sin misericordia", "Como un dios lejano", "Como un rey sin pacto"], "«¡Jehová! ¡Jehová! fuerte, misericordioso y piadoso; tardo para la ira, y grande en misericordia y verdad».", "Éxodo 34:6"],
    ["f45", 5, "o5", "comprender", "¿En qué relaciones aparece jésed, además de la relación de Dios con su pueblo?", "En la lealtad entre personas, como la de Rut", ["Solo en los sacrificios", "En las guerras", "En ninguna"], "Booz alabó la bondad de Rut (Rut 3:10).", "Rut 3:10"],
    ["f46", 5, "o5", "analizar", "¿Qué concluye el estudio de jésed?", "Que es el amor leal de Dios, que cumple sus promesas aunque su pueblo falle", ["Que es un sentimiento pasajero", "Que solo se refiere al perdón de un día", "Que significa lo mismo que ley"], "«Porque para siempre es su misericordia».", "Salmos 136:1"],
    ["f47", 5, "o5", "aplicar", "¿Cuál es el último paso de un estudio de palabras?", "Volver al pasaje y preguntar qué sentido usa allí el autor", ["Escoger el sentido que más nos guste", "Enseñar todos los sentidos a la vez", "Olvidar el pasaje"], "El contexto decide el sentido.", "2 Timoteo 2:15"],
    ["f48", 5, "o5", "aplicar", "Vas a estudiar la palabra arrepentíos en Hechos 3:19. ¿Por dónde empiezas?", "Buscas la palabra griega y su número en Strong o en un interlineal", ["Inventas un sentido", "Preguntas a alguien que no cita fuentes", "Buscas su origen en el español"], "«Así que, arrepentíos y convertíos».", "Hechos 3:19"],
    ["f49", 5, "o5", "evaluar", "Al enseñar un estudio de palabras, ¿qué conviene?", "Explicar con sencillez lo que descubriste y cómo cambia la lectura del pasaje", ["Mostrar muchas palabras griegas para impresionar", "Leer el diccionario completo", "No explicar nada"], "«y ponían el sentido, de modo que entendiesen la lectura».", "Nehemías 8:8"],
    ["f50", 5, "o5", "evaluar", "¿Qué estudio de palabras está mejor hecho?", "Uno que revisa los usos en su contexto, compara con un diccionario y vuelve al pasaje", ["Uno que toma el primer sentido del diccionario", "Uno que se basa solo en la raíz", "Uno que no lee el contexto"], "«escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
    // ---- lección 6: errores comunes y buen uso (10)
    ["f51", 6, "o6", "recordar", "¿En qué año se inventó la dinamita?", "En 1867", ["En el año 50", "En 1517", "En 1611"], "Pablo escribió más de mil ochocientos años antes.", "Romanos 1:16"],
    ["f52", 6, "o6", "comprender", "¿Qué es la falacia de la raíz?", "Creer que una palabra significa siempre lo que significaban sus partes", ["Estudiar el contexto", "Comparar traducciones", "Usar la concordancia"], "El sentido lo da el uso, no el origen de la palabra.", "2 Timoteo 2:15"],
    ["f53", 6, "o6", "comprender", "¿Qué es un anacronismo al leer la Biblia?", "Leer en una palabra antigua un sentido moderno", ["Leer la Biblia en voz alta", "Traducir con cuidado", "Usar un interlineal"], "Como decir que dýnamis es dinamita.", "Romanos 1:16"],
    ["f54", 6, "o6", "comprender", "¿Por qué no conviene cargar todos los sentidos de una palabra a la vez?", "Porque en cada pasaje el autor usa uno de ellos", ["Porque las palabras no tienen sentidos", "Porque así es más largo", "Sí conviene"], "El contexto decide cuál es.", "2 Timoteo 2:15"],
    ["f55", 6, "o6", "recordar", "¿Qué verbos griegos usa Jesús en Juan 21:15-17 al preguntar a Pedro si lo ama?", "Agapáo y filéo", ["Lógos y dýnamis", "Cháris y pístis", "Shalom y jésed"], "Juan usa los dos verbos también en otros pasajes.", "Juan 21:15"],
    ["f56", 6, "o6", "analizar", "¿Por qué no conviene basar la enseñanza en la diferencia entre agapáo y filéo en Juan 21?", "Porque Juan usa los dos verbos para el amor del Padre al Hijo", ["Porque Juan no escribió en griego", "Porque Pedro no respondió", "Porque los dos significan odio"], "«Porque el Padre ama al Hijo».", "Juan 5:20"],
    ["f57", 6, "o6", "comprender", "¿Cuál es el centro del pasaje de Juan 21:15-17?", "Pedro, que negó tres veces a Jesús, es restaurado y recibe el encargo de apacentar sus ovejas", ["Una lección de gramática griega", "La pesca de ese día", "Una discusión entre Pedro y Juan"], "«Apacienta mis ovejas».", "Juan 21:17"],
    ["f58", 6, "o6", "aplicar", "¿Cómo se usa bien una palabra original en un sermón?", "Se explica la idea en español sencillo y se menciona la palabra solo si ayuda", ["Se repiten muchas palabras griegas para impresionar", "Se corrige la traducción sin saber", "Se deja de lado la Biblia"], "El idioma original sirve al mensaje, no al predicador.", "2 Corintios 4:2"],
    ["f59", 6, "o6", "evaluar", "Un predicador dice que la Biblia está mal traducida, pero no conoce el griego. ¿Qué error comete?", "Corrige la traducción para lucirse, sin el conocimiento para hacerlo", ["Ninguno", "Usa demasiado el contexto", "Compara demasiadas traducciones"], "«no andando con astucia, ni adulterando la palabra de Dios».", "2 Corintios 4:2"],
    ["f60", 6, "o6", "evaluar", "¿Para qué sirve, al fin, el estudio de los idiomas bíblicos?", "Para ser más fieles al texto, no para impresionar", ["Para impresionar a la congregación", "Para no tener que orar", "Para desconfiar de las traducciones"], "«sino por la manifestación de la verdad».", "2 Corintios 4:2"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Desde dónde hasta dónde está escrito en arameo el libro de Daniel?", "Desde Daniel 2:4 hasta el final del capítulo 7", ["Todo el libro", "Solo el capítulo 12", "Ninguna parte"], "«Entonces hablaron los caldeos al rey en lengua aramea».", "Daniel 2:4"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué los autores del Nuevo Testamento citan muchas veces la Septuaginta?", "Porque era la traducción griega del Antiguo Testamento que se leía en su mundo", ["Porque no conocían el Antiguo Testamento", "Porque era la Biblia en latín", "Porque la escribió Pablo"], "El griego era la lengua común del Mediterráneo.", "Mateo 5:18"],
      ["m1-03", 1, "o1", "recordar", "¿Cuántos manuscritos griegos del Nuevo Testamento se conservan?", "Más de cinco mil", ["Uno solo", "Diez", "Cien"], "La Biblia se copió con gran cuidado durante siglos.", "Mateo 5:18"],
      ["m1-04", 1, "o1", "recordar", "¿De qué traducción viene la Reina-Valera?", "De la de Casiodoro de Reina (1569), revisada por Cipriano de Valera (1602)", ["De la de Martín Lutero", "De la de William Tyndale", "De la de James Strong"], "«mas la palabra del Dios nuestro permanece para siempre».", "Isaías 40:8"],
      ["m1-05", 1, "o1", "analizar", "¿Qué enseña Mateo 5:18 sobre la Palabra de Dios?", "Que Dios la cuida hasta el detalle más pequeño", ["Que la ley pasará pronto", "Que solo importa lo grande", "Que la Biblia cambiará"], "«ni una jota ni una tilde pasará de la ley».", "Mateo 5:18"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué actitud es la correcta al aprender los idiomas bíblicos?", "La humildad: estudiar para ver más detalles sin despreciar las traducciones fieles", ["El orgullo de saber más que otros", "Desconfiar de toda traducción", "Pensar que sin griego no se entiende nada"], "«El conocimiento envanece, pero el amor edifica».", "1 Corintios 8:1"],
      ["m1-07", 2, "o2", "recordar", "¿Qué son las vocales en el hebreo bíblico?", "Puntos y rayitas que añadieron los masoretas", ["Letras como las consonantes", "Números", "No existen"], "El alfabeto hebreo tiene 22 consonantes.", "Salmos 119:1"],
      ["m1-08", 2, "o2", "recordar", "¿Cuál es la última letra del alfabeto hebreo?", "Tav", ["Álef", "Bet", "Omega"], "La última estrofa del Salmo 119 lleva su nombre.", "Salmos 119:1"],
      ["m1-09", 2, "o2", "comprender", "¿Por qué la Reina-Valera dice Jehová?", "Porque así traduce el nombre propio de Dios, YHWH", ["Porque es un título como rey", "Porque es una palabra griega", "Porque es el nombre de un profeta"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
      ["m1-10", 2, "o2", "recordar", "¿Qué pide la bendición de los sacerdotes en Números 6:24?", "Que Jehová bendiga y guarde", ["Que Jehová castigue", "Que Jehová se aleje", "Que Jehová calle"], "«Jehová te bendiga, y te guarde».", "Números 6:24"],
      ["m1-11", 2, "o2", "analizar", "¿Qué tienen en común rúaj y néfesh?", "Son palabras hebreas con sentidos más amplios que su traducción habitual", ["Son nombres de ciudades", "Significan lo mismo", "Son palabras griegas"], "«y fue el hombre un ser viviente».", "Génesis 2:7"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué clase de imágenes de Dios prefiere el hebreo, según la lección?", "Imágenes concretas, como roca, escudo y pastor", ["Ideas abstractas sin imágenes", "Fórmulas matemáticas", "Ninguna imagen"], "«Jehová es mi pastor; nada me faltará».", "Salmos 23:1"],
      ["m1-13", 3, "o3", "recordar", "¿Cuál es la última letra del alfabeto griego?", "Omega", ["Alfa", "Tav", "Zeta"], "«Yo soy el Alfa y la Omega».", "Apocalipsis 1:8"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué muchas letras griegas se parecen a las nuestras?", "Porque nuestro alfabeto viene en parte del griego", ["Porque el griego viene del español", "Por casualidad", "No se parecen"], "Por eso se lee de izquierda a derecha, como el español.", "Apocalipsis 1:8"],
      ["m1-15", 3, "o3", "recordar", "¿Cómo presenta Juan a Jesús en Juan 1:14?", "Como el Verbo que fue hecho carne", ["Como un ángel", "Como un profeta más", "Como una idea"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["m1-16", 3, "o3", "comprender", "¿Qué significa la palabra griega que se traduce iglesia?", "Asamblea de los convocados", ["Edificio", "Templo pagano", "Escuela"], "Es ekklesía.", "Mateo 16:18"],
      ["m1-17", 3, "o3", "analizar", "¿Qué enseña que el arrepentimiento sea metánoia?", "Que no es solo sentir pena, sino cambiar de mente y de vida", ["Que es solo una emoción", "Que es un rito", "Que no hace falta cambiar"], "«arrepentíos y convertíos».", "Hechos 3:19"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas explicaciones de ágape es la más fiel?", "El amor que busca el bien del otro, como Dios nos amó en Cristo", ["Un sentimiento romántico", "El amor que espera algo a cambio", "La simpatía natural"], "«Dios es amor».", "1 Juan 4:8"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué número tiene lógos en el diccionario griego de Strong?", "El 3056", ["El 26", "El 2617", "El 7965"], "Ágape es el 26.", "Juan 1:1"],
      ["m2-02", 4, "o4", "recordar", "¿Quién hizo el Antiguo Testamento interlineal hebreo-español de CLIE?", "Ricardo Cerni", ["Francisco Lacueva", "James Strong", "Casiodoro de Reina"], "El del Nuevo Testamento es de Francisco Lacueva.", "Hechos 17:11"],
      ["m2-03", 4, "o4", "aplicar", "Quieres saber en qué otros lugares aparece shalom. ¿Qué haces?", "Buscas su número de Strong, el 7965, y revisas sus apariciones", ["Lees un diccionario de español", "Preguntas en las redes sociales", "Adivinas"], "«Jehová alce sobre ti su rostro, y ponga en ti paz».", "Números 6:26"],
      ["m2-04", 4, "o4", "comprender", "¿Por qué las herramientas no reemplazan el contexto?", "Porque el sentido de una palabra lo decide el pasaje donde está", ["Porque las herramientas siempre se equivocan", "Porque el contexto no importa", "Sí lo reemplazan"], "«usa bien la palabra de verdad».", "2 Timoteo 2:15"],
      ["m2-05", 4, "o4", "analizar", "¿Qué tienen en común Strong, el interlineal y el diccionario expositivo?", "Acercan al estudiante a las palabras originales sin necesidad de dominar la gramática", ["Reemplazan a la Biblia", "Son libros de historia", "No sirven para estudiar"], "Son herramientas para escudriñar mejor.", "Hechos 17:11"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué herramienta escogerías para empezar si no sabes griego?", "Una concordancia de Strong o una Biblia con sus números", ["Un léxico académico de griego clásico", "Ninguna", "Una gramática avanzada"], "El léxico sirve a quien ya conoce la gramática.", "2 Timoteo 2:15"],
      ["m2-07", 5, "o5", "recordar", "¿En qué texto se revela Dios a Moisés como grande en misericordia y verdad?", "Éxodo 34:6", ["Génesis 1:1", "Salmos 23:1", "Juan 3:16"], "«y grande en misericordia y verdad».", "Éxodo 34:6"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué conviene mirar primero los usos en el mismo libro y en el mismo autor?", "Porque cada autor suele usar la palabra con un sentido propio", ["Porque los demás libros no importan", "Porque es más corto", "No conviene"], "El contexto más cercano pesa más.", "2 Timoteo 2:15"],
      ["m2-09", 5, "o5", "aplicar", "Después de anotar los sentidos de una palabra, ¿qué consultas?", "Un diccionario expositivo, para comparar", ["Un horóscopo", "Una novela", "Nada más"], "Después vuelves al pasaje.", "Hechos 17:11"],
      ["m2-10", 5, "o5", "recordar", "¿Qué palabra repite el Salmo 136 en cada versículo?", "Misericordia, que traduce jésed", ["Ley, que traduce torá", "Paz, que traduce shalom", "Espíritu, que traduce rúaj"], "«Porque para siempre es su misericordia».", "Salmos 136:1"],
      ["m2-11", 5, "o5", "analizar", "¿Qué añade el estudio de jésed a la lectura del Salmo 136?", "Que celebra un amor fiel de Dios que no se acaba", ["Que habla de un enojo eterno", "Que no tiene relación con Dios", "Que es solo una canción sin sentido"], "«Alabad a Jehová, porque él es bueno».", "Salmos 136:1"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál es la mejor forma de compartir un estudio de palabras en una clase?", "Decir con palabras sencillas lo que descubriste y cómo cambia la lectura", ["Mostrar todos los pasos y las palabras técnicas", "Leer la entrada completa del diccionario", "No mencionarlo"], "«de modo que entendiesen la lectura».", "Nehemías 8:8"],
      ["m2-13", 6, "o6", "recordar", "¿Qué significa dýnamis?", "Poder, fuerza, capacidad", ["Dinamita", "Explosión", "Ruido"], "«es poder de Dios para salvación».", "Romanos 1:16"],
      ["m2-14", 6, "o6", "comprender", "¿Qué le da su sentido a una palabra, según la lección?", "El uso, no el origen de la palabra", ["Su raíz, siempre", "Su sonido", "Su longitud"], "Por eso la falacia de la raíz es un error.", "2 Timoteo 2:15"],
      ["m2-15", 6, "o6", "aplicar", "Antes de concluir el sentido de un versículo, ¿qué conviene hacer?", "Comparar varias traducciones fieles", ["Usar una sola palabra griega", "Buscar la explicación más sorprendente", "Nada"], "«escudriñando cada día las Escrituras».", "Hechos 17:11"],
      ["m2-16", 6, "o6", "recordar", "¿Qué no hacía Pablo con la palabra de Dios, según 2 Corintios 4:2?", "Adulterarla", ["Predicarla", "Leerla", "Enseñarla"], "«ni adulterando la palabra de Dios».", "2 Corintios 4:2"],
      ["m2-17", 6, "o6", "analizar", "¿Qué tienen en común la falacia de la raíz y el anacronismo?", "Los dos ponen en la palabra un sentido que el autor no quiso darle", ["Los dos son herramientas útiles", "Los dos son traducciones", "Nada"], "El contexto decide el sentido.", "2 Corintios 4:2"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué debe dejar en el estudiante conocer los idiomas originales?", "Más humildad y más fidelidad, no más orgullo", ["Más orgullo", "Desprecio por los que no saben", "Desconfianza de toda traducción"], "«El conocimiento envanece, pero el amor edifica».", "1 Corintios 8:1"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-idiomas-e1",
      tipo: "corta",
      pregunta: "Explica en qué idiomas se escribió la Biblia y cómo llegó el texto hasta nuestras traducciones.",
      ideas: [
        { id: "hebreo", peso: 25, texto: "El Antiguo Testamento en hebreo, con partes en arameo.", formas: ["hebreo", "arameo"] },
        { id: "griego", peso: 25, texto: "El Nuevo Testamento en griego koiné.", formas: ["griego", "koine"] },
        { id: "copias", peso: 25, texto: "Copias cuidadosas, los masoretas y los manuscritos.", formas: ["copi*", "manuscrit*", "masoret*", "leningrado"] },
        { id: "traduccion", peso: 15, texto: "Las traducciones, como la Reina-Valera.", formas: ["valera", "reina valera", "traduc*", "septuaginta"] },
      ],
      citas: ["Mateo 5:18", "Juan 19:20", "Daniel 2:4", "Isaías 40:8", "2 Timoteo 3:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El Antiguo Testamento se escribió en hebreo, con algunas partes en arameo, y el Nuevo Testamento en griego koiné. La Biblia se copió a mano con gran cuidado; los masoretas añadieron las vocales y se conservan miles de manuscritos. De ellos vienen traducciones como la Reina-Valera, porque Dios cuida su Palabra (Mateo 5:18).",
    },
    {
      id: "n5-idiomas-e2",
      tipo: "corta",
      pregunta: "Explica el sentido de dos palabras clave del hebreo o del griego y por qué ayudan a leer mejor la Biblia.",
      ideas: [
        { id: "shalom", peso: 25, texto: "Shalom: plenitud y bienestar, no solo ausencia de guerra.", formas: ["shalom", "plenitud"] },
        { id: "jesed", peso: 25, texto: "Jésed: el amor leal de Dios.", formas: ["jesed", "hesed", "amor leal"] },
        { id: "yhwh", peso: 25, texto: "YHWH: el nombre propio de Dios.", formas: ["yhwh", "adonai", "nombre propio"] },
        { id: "logos", peso: 25, texto: "Lógos: la palabra, el mensaje; Jesús es la Palabra.", formas: ["logos", "verbo"] },
        { id: "agape", peso: 25, texto: "Ágape: el amor que se da por el bien del otro.", formas: ["agape"] },
        { id: "otras", peso: 25, texto: "Otra palabra clave explicada.", formas: ["charis", "pistis", "metanoia", "koinonia", "ekklesia", "euangelion", "tora", "ruaj", "nefesh"] },
        { id: "porque", peso: 20, texto: "Por qué ayudan: muestran un sentido más rico que la traducción sola.", formas: ["mas rico", "riqueza", "mas que", "detalle*", "sentido"] },
      ],
      basta: 85,
      citas: ["Números 6:24-26", "Números 6:26", "Deuteronomio 6:4", "Salmos 136:1", "Éxodo 34:6", "Juan 1:1", "Juan 1:14", "1 Juan 4:8", "Efesios 2:8", "Hechos 3:19", "Hechos 2:42"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Shalom no es solo ausencia de guerra: es plenitud y bienestar con Dios y con los demás (Números 6:26). Lógos, que Juan 1:1 traduce Verbo, es la palabra y el mensaje: Jesús es la Palabra de Dios hecha carne. Conocer estas palabras muestra un sentido más rico del que da la traducción sola.",
    },
    {
      id: "n5-idiomas-e3",
      tipo: "corta",
      pregunta: "Explica dos errores comunes al usar el griego y el hebreo en la enseñanza, con un ejemplo.",
      ideas: [
        { id: "raiz", peso: 25, texto: "La falacia de la raíz.", formas: ["raiz", "etimolog*", "sus partes", "origen de la palabra"] },
        { id: "anacronismo", peso: 25, texto: "El anacronismo.", formas: ["anacron*", "sentido moderno", "dinamita"] },
        { id: "sentidos", peso: 25, texto: "Cargar todos los sentidos a la vez o exagerar los sinónimos.", formas: ["todos los sentidos", "varios sentidos", "sinonimo*", "agapao", "fileo"] },
        { id: "contexto", peso: 15, texto: "El contexto decide el sentido.", formas: ["contexto"] },
      ],
      basta: 85,
      citas: ["Romanos 1:16", "Juan 21:15-17", "Juan 3:35", "Juan 5:20", "2 Corintios 4:2", "2 Timoteo 2:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Un error es el anacronismo: decir que el poder de Romanos 1:16, dýnamis, es dinamita, que se inventó en 1867. Otro es la falacia de la raíz: creer que una palabra significa lo que significaban sus partes. También se exageran sinónimos, como agapáo y filéo. El contexto decide el sentido.",
    },
    {
      id: "n5-idiomas-e4",
      tipo: "breve",
      pregunta:
        "Haz el estudio de una palabra de la Biblia que escojas, siguiendo los pasos de la lección: la palabra original y su número de Strong, dónde más aparece, sus sentidos en el contexto y lo que aporta a la lectura del pasaje. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "palabra", peso: 15, texto: "La palabra escogida.", formas: ["escogi", "la palabra", "estudie"] },
        { id: "original", peso: 20, texto: "La palabra original y su número de Strong.", formas: ["strong", "numero", "original", "interlineal"] },
        { id: "usos", peso: 20, texto: "Dónde más aparece.", formas: ["aparece", "otros lugares", "otras veces", "tambien en", "concordancia"] },
        { id: "contexto", peso: 20, texto: "Sus sentidos en el contexto.", formas: ["contexto", "sentido*", "significa"] },
        { id: "aporte", peso: 25, texto: "Lo que aporta a la lectura del pasaje.", formas: ["aporta", "ayuda a", "cambia", "me enseña", "mas rico", "riqueza", "lectura"] },
      ],
      basta: 85,
      citas: ["Salmos 136:1", "Éxodo 34:6", "Rut 3:10", "Números 6:24-26", "Juan 1:1", "1 Juan 4:8", "Hechos 3:19", "Marcos 1:15", "Lucas 15:7", "Hechos 2:42", "Efesios 2:8", "Romanos 1:16", "Juan 14:16", "Mateo 16:18", "Génesis 1:2", "Génesis 2:7", "Deuteronomio 6:4", "2 Corintios 7:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escogí la palabra arrepentíos de Hechos 3:19. En un interlineal y en la concordancia de Strong encontré que la palabra original es griega, el verbo del que viene metánoia, y anoté su número para buscarla. Aparece también en el primer mensaje de Jesús: arrepentíos, y creed en el evangelio (Marcos 1:15), y en la parábola de la oveja perdida, donde hay gozo en el cielo por un pecador que se arrepiente (Lucas 15:7). En su contexto significa un cambio de mente que lleva a un cambio de vida, no solo sentir tristeza: por eso Pedro une arrepentirse con convertirse, volverse a Dios. Al compararlo con el diccionario expositivo de Vine, vi que la idea central es cambiar la manera de pensar. Este estudio me ayuda a leer Hechos 3:19 con más riqueza: el llamado de Pedro no es solo a sentir pena por el pecado, sino a dar media vuelta y volver a Dios, que borra los pecados y trae tiempos de refrigerio.",
    },
    {
      id: "n5-idiomas-e5",
      tipo: "breve",
      pregunta:
        "Prepara cómo explicarías en una clase o en un sermón una palabra hebrea o griega de un pasaje, evitando los errores comunes: qué dirías, qué no dirías y por qué. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "palabra", peso: 15, texto: "La palabra y el pasaje.", formas: ["escogi", "la palabra", "pasaje"] },
        { id: "sencillo", peso: 25, texto: "Explicarla con sencillez en español.", formas: ["sencill*", "en español", "claridad", "palabras simples"] },
        { id: "contexto", peso: 20, texto: "Respetar el contexto.", formas: ["contexto"] },
        { id: "errores", peso: 25, texto: "Evitar los errores: la raíz, el anacronismo, todos los sentidos, lucirse.", formas: ["no diria", "evitaria", "raiz", "anacron*", "dinamita", "lucir*", "impresionar", "todos los sentidos"] },
        { id: "humildad", peso: 15, texto: "Humildad y fidelidad al texto.", formas: ["humild*", "fiel*", "fidelidad"] },
      ],
      basta: 85,
      citas: ["Romanos 1:16", "2 Corintios 4:2", "2 Timoteo 2:15", "Nehemías 8:8", "Juan 1:1", "Salmos 136:1", "Números 6:26", "1 Corintios 8:1", "Hechos 17:11", "Juan 21:15-17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escogí explicar la palabra poder en Romanos 1:16, donde Pablo dice que el evangelio es poder de Dios para salvación. Diría, en español sencillo, que la palabra griega es dýnamis y significa poder, fuerza y capacidad: el evangelio no es solo una buena idea, sino el poder con que Dios salva a todo aquel que cree. Leería el contexto de la carta para mostrar que Pablo no se avergüenza de ese mensaje. No diría que dýnamis es dinamita, porque la dinamita se inventó en 1867 y eso sería un anacronismo; tampoco haría de la raíz de la palabra el centro de la enseñanza, ni la usaría para lucirme. Mencionaría la palabra original una sola vez y volvería enseguida al mensaje, como los levitas que ponían el sentido para que el pueblo entendiera (Nehemías 8:8). Así sería fiel al texto, como Pablo, que no anduvo adulterando la palabra de Dios (2 Corintios 4:2), y enseñaría con humildad.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 5
  breve: {
    id: "n5-idiomas-b1",
    tipo: "breve",
    pregunta:
      "Escoge una palabra clave del hebreo o del griego que hayas estudiado en esta materia y escribe una enseñanza breve sobre ella para tu iglesia: qué significa, dónde aparece, qué aporta a la lectura de un pasaje y cómo se aplica a la vida. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "palabra", peso: 15, texto: "La palabra escogida.", formas: ["escogi", "shalom", "jesed", "hesed", "logos", "agape", "charis", "pistis", "metanoia", "koinonia", "ekklesia", "euangelion", "tora", "ruaj", "nefesh", "yhwh", "elohim"] },
      { id: "significa", peso: 25, texto: "Qué significa.", formas: ["significa", "quiere decir", "se traduce", "traduce"] },
      { id: "aparece", peso: 15, texto: "Dónde aparece.", formas: ["aparece", "se usa", "tambien en", "otros lugares"] },
      { id: "aporte", peso: 20, texto: "Qué aporta a la lectura.", formas: ["aporta", "ayuda a", "mas rico", "mas que", "entender mejor", "lectura"] },
      { id: "vida", peso: 25, texto: "Cómo se aplica a la vida.", formas: ["en mi vida", "en nuestra vida", "esta semana", "voy a", "vamos a", "aplicamos", "podemos"] },
    ],
    basta: 85,
    citas: ["Números 6:24-26", "Números 6:26", "Isaías 9:6", "Juan 14:27", "Colosenses 1:20", "Salmos 136:1", "Éxodo 34:6", "Juan 1:1", "Juan 1:14", "1 Juan 4:8", "Efesios 2:8", "Hechos 3:19", "Hechos 2:42", "Deuteronomio 6:4", "Génesis 1:2", "Génesis 2:7", "Romanos 5:1"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí la palabra hebrea shalom. Se traduce paz, pero significa mucho más que la ausencia de guerra: es plenitud, bienestar y relaciones en orden con Dios, con uno mismo y con los demás. Aparece en la bendición de los sacerdotes, que termina pidiendo que Jehová alce sobre su pueblo su rostro y ponga en él paz (Números 6:26), y también en los profetas, que anuncian al Mesías como Príncipe de paz (Isaías 9:6). Conocer su sentido aporta mucho a la lectura: cuando Jesús dice la paz os dejo, mi paz os doy (Juan 14:27), no promete solo tranquilidad, sino una vida completa y reconciliada con Dios. Esa paz viene de Cristo, que hizo la paz mediante la sangre de su cruz. En nuestra vida la aplicamos cuando buscamos estar en paz con Dios y con los demás: esta semana podemos pedir perdón a alguien, visitar a un hermano que está solo o bendecir a nuestra familia con las palabras de Números 6. Así vivimos el shalom que Dios quiere para su pueblo.",
  },
};
