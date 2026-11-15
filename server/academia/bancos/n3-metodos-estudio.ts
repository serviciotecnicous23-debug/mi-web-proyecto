/**
 * El banco de «Métodos de estudio bíblico» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el estudio inductivo y sus tres pasos · o2 observar · o3 interpretar con referencias cruzadas y aplicar
 * de manera concreta · o4 las herramientas: versiones, concordancia, diccionario, Biblia de estudio, atlas, historia y
 * comentarios · o5 las cuatro maneras de estudiar y el plan personal · o6 el versículo de memoria (Salmos 119:18).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-metodos-estudio-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_METODOS_ESTUDIO: BancoMateria = {
  materia: "n3-metodos-estudio",
  repaso: {
    "n3-metodos-estudio-1": ([
      ["1-r1", 1, "o1", "comprender", "¿Qué es estudiar la Biblia de forma inductiva?", "Ir de los detalles del texto a sus conclusiones, dejando que el pasaje diga lo que dice", ["Buscar versículos que apoyen lo que ya pensamos", "Leer solo lo que nos gusta", "Abrir la Biblia al azar"], "Los de Berea iban «escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
      ["1-r2", 1, "o1", "recordar", "¿Cuáles son los tres pasos del estudio inductivo, en orden?", "Observar, interpretar y aplicar", ["Aplicar, observar e interpretar", "Interpretar, aplicar y observar", "Leer, cantar y orar"], "Primero qué dice, después qué significa y al final qué pide, como Esdras: inquirir, cumplir y enseñar.", "Esdras 7:10"],
      ["1-r3", 1, "o1", "recordar", "¿Qué pide el salmista antes de mirar la ley de Dios?", "Que Dios le abra los ojos", ["Que Dios le dé riquezas", "Que la ley sea más corta", "Que nadie lo vea leer"], "«Abre mis ojos, y miraré Las maravillas de tu ley».", "Salmos 119:18"],
    ] as P[]).map(p),
    "n3-metodos-estudio-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué pregunta responde la observación?", "¿Qué dice el texto?", ["¿Cómo lo aplico?", "¿Qué opina mi pastor?", "¿Qué versión es mejor?"], "Antes de preguntar qué significa, se mira con cuidado lo que dice, como cuando se leía la ley claramente.", "Nehemías 8:8"],
      ["2-r2", 2, "o2", "comprender", "¿Qué contraste central hay en Efesios 2:1-4?", "Estábamos muertos en pecados, pero Dios, rico en misericordia, nos dio vida", ["Éramos buenos y Dios nos premió", "Dios estaba enojado y siguió enojado", "No hay ningún contraste"], "«Pero Dios, que es rico en misericordia, por su gran amor con que nos amó».", "Efesios 2:4"],
      ["2-r3", 2, "o2", "comprender", "¿Qué indica un conector como así que o por tanto?", "Una conclusión que se saca de lo anterior", ["Una pregunta", "Un cambio de tema sin relación", "Una promesa"], "Romanos 12:1 empieza con «Así que, hermanos, os ruego por las misericordias de Dios».", "Romanos 12:1"],
    ] as P[]).map(p),
    "n3-metodos-estudio-3": ([
      ["3-r1", 3, "o3", "comprender", "¿Para qué sirven las referencias cruzadas?", "Para encontrar otros pasajes que tratan lo mismo y dejar que la Escritura explique la Escritura", ["Para saltarse los pasajes difíciles", "Para contar las páginas", "Para elegir la mejor versión"], "Toda la Escritura es «útil para enseñar».", "2 Timoteo 3:16"],
      ["3-r2", 3, "o3", "aplicar", "¿Cuál es una aplicación concreta de Efesios 2:10?", "Esta semana voy a visitar a la hermana enferma y a llevarle algo de comer", ["Voy a ser mejor persona", "Algún día haré más buenas obras", "Voy a pensar en las buenas obras"], "Fuimos «creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
      ["3-r3", 3, "o3", "recordar", "¿Cuál de estas NO es una de las cinco preguntas de aplicación?", "¿Qué opina la mayoría?", ["¿Hay un pecado que debo dejar?", "¿Hay una promesa que debo creer?", "¿Hay un mandato que debo obedecer?"], "Las cinco preguntas buscan un pecado, una promesa, un ejemplo, un mandato y una verdad sobre Dios, para ser hacedores de la palabra.", "Santiago 1:22"],
    ] as P[]).map(p),
    "n3-metodos-estudio-4": ([
      ["4-r1", 4, "o4", "comprender", "¿Qué es una traducción de equivalencia formal?", "Una que sigue de cerca las palabras y el orden del original, como la Reina-Valera 1960", ["Una que inventa palabras nuevas", "Una que resume la Biblia", "Una que solo traduce el Nuevo Testamento"], "Las versiones fieles ayudan a escudriñar lo que Dios dijo.", "Proverbios 25:2"],
      ["4-r2", 4, "o4", "recordar", "¿Para qué sirve una concordancia?", "Para encontrar todos los versículos donde aparece una palabra", ["Para traducir la Biblia", "Para saber la fecha de cada libro", "Para cantar los salmos"], "Con ella se escudriñan las Escrituras palabra por palabra.", "Juan 5:39"],
      ["4-r3", 4, "o4", "comprender", "¿Cómo se leen las notas de una Biblia de estudio?", "Con gratitud y discernimiento: son ayudas humanas que no reemplazan al texto", ["Como si fueran la Escritura", "No se deben leer nunca", "Solo las pueden leer los pastores"], "Lucas investigó «con diligencia todas las cosas desde su origen»: la investigación sirve a la verdad.", "Lucas 1:3"],
    ] as P[]).map(p),
    "n3-metodos-estudio-5": ([
      ["5-r1", 5, "o4", "comprender", "¿Por qué el hombre de la parábola descendía de Jerusalén a Jericó?", "Porque Jericó está mucho más abajo: el camino baja cerca de mil metros", ["Porque Jericó estaba en un monte", "Porque el camino subía", "Porque iba por mar"], "«Un hombre descendía de Jerusalén a Jericó»: un atlas muestra el terreno.", "Lucas 10:30"],
      ["5-r2", 5, "o4", "aplicar", "¿Cuándo conviene leer un comentario bíblico?", "Después de observar e interpretar por cuenta propia", ["Antes de abrir la Biblia", "En lugar de leer el texto", "Nunca"], "Y lo que dice se examina con la Escritura, como hacían los de Berea.", "Hechos 17:11"],
      ["5-r3", 5, "o4", "comprender", "¿Qué ayuda a ver una línea de tiempo bíblica?", "En qué momento de la historia sucedió o se escribió cada libro", ["Cuántas palabras tiene cada libro", "Qué versión es más antigua", "Quién imprimió la Biblia"], "Amós profetizó en días de Uzías y de Jeroboam: su tiempo explica su mensaje.", "Amós 1:1"],
    ] as P[]).map(p),
    "n3-metodos-estudio-6": ([
      ["6-r1", 6, "o5", "recordar", "¿Qué significa el nombre Bernabé, según Hechos 4:36?", "Hijo de consolación", ["Hijo del trueno", "Varón de guerra", "Siervo del rey"], "«Que traducido es, Hijo de consolación».", "Hechos 4:36"],
      ["6-r2", 6, "o5", "comprender", "¿Cuál es la manera más completa de estudiar la Biblia?", "Por libro: leerlo entero, ver su tema y su estructura y estudiar sus partes", ["Abrir al azar cada día", "Leer solo los versículos conocidos", "Estudiar solo palabras sueltas"], "Así cada parte se ve a la luz del todo, como quien medita de día y de noche.", "Salmos 1:2"],
      ["6-r3", 6, "o5", "aplicar", "En un estudio por tema, ¿qué cuidado hay que tener?", "Leer cada pasaje en su contexto y no armar doctrinas con frases sueltas", ["Usar solo un versículo", "No usar la concordancia", "Escoger temas que nadie conoce"], "Toda la Escritura es útil para enseñar cuando se lee bien.", "2 Timoteo 3:16"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el estudio inductivo (10)
    ["f01", 1, "o1", "comprender", "¿Qué hacían los de Berea con la palabra que recibían?", "Escudriñaban cada día las Escrituras para ver si era así", ["La aceptaban sin examinarla", "La escribían en piedras", "La comentaban solo los sábados"], "Iban «escudriñando cada día las Escrituras para ver si estas cosas eran así».", "Hechos 17:11"],
    ["f02", 1, "o1", "comprender", "¿Qué peligro tiene leer la Biblia solo buscando apoyo para lo que ya pensamos?", "Que la Biblia termina diciendo siempre lo que ya pensábamos", ["Que se aprende demasiado", "Que se lee muy rápido", "Ninguno"], "El estudio inductivo deja que el texto hable primero.", "Hechos 17:11"],
    ["f03", 1, "o1", "recordar", "¿Cuál es el primer paso del estudio inductivo?", "Observar: ver qué dice el texto", ["Aplicar", "Interpretar", "Predicar"], "Sin una buena observación, la interpretación y la aplicación se tuercen.", "Salmos 119:18"],
    ["f04", 1, "o1", "comprender", "¿Qué pregunta responde la interpretación?", "¿Qué significa?", ["¿Qué dice?", "¿Qué hago?", "¿Quién lo imprimió?"], "Se busca lo que el autor quiso decir, poniendo el sentido para que se entienda.", "Nehemías 8:8"],
    ["f05", 1, "o1", "comprender", "¿Qué pregunta responde la aplicación?", "¿Qué hago con esto?", ["¿Qué dice?", "¿Qué significa?", "¿Cuántos versículos tiene?"], "La meta es obedecer: ser hacedores de la palabra.", "Santiago 1:22"],
    ["f06", 1, "o1", "analizar", "¿Qué le pasa a quien observa sin aplicar?", "Se llena de datos y no cambia", ["Se vuelve más santo", "Entiende todo", "Nada"], "Esdras preparó su corazón para inquirir la ley y para cumplirla.", "Esdras 7:10"],
    ["f07", 1, "o1", "analizar", "¿Qué le pasa a quien aplica sin observar?", "Termina obedeciendo lo que el texto no dice", ["Obedece mejor que nadie", "Ahorra tiempo sin perder nada", "Entiende sin estudiar"], "La observación cuidadosa es la base de la aplicación fiel.", "Esdras 7:10"],
    ["f08", 1, "o1", "aplicar", "¿Qué necesita un tiempo de estudio bíblico, además de la Biblia?", "Oración, un tiempo fijo, un lugar tranquilo y un cuaderno", ["Música a todo volumen", "Muchos libros abiertos a la vez", "Solo buena voluntad"], "El estudio empieza pidiendo a Dios que abra los ojos.", "Salmos 119:18"],
    ["f09", 1, "o1", "aplicar", "Antes de estudiar un pasaje en detalle, ¿qué aconsejan los buenos maestros?", "Leer el libro completo para ver el conjunto", ["Leer solo ese versículo muchas veces", "Buscar primero un comentario", "Escoger un pasaje al azar"], "Ver el todo evita perderse en los detalles; Lucas escribió todo por orden.", "Lucas 1:3"],
    ["f10", 1, "o6", "recordar", "Completa Salmos 119:18: Abre mis ojos, y miraré…", "las maravillas de tu ley", ["la luz del día", "los cielos abiertos", "el camino de mi casa"], "Es el versículo de memoria de la materia.", "Salmos 119:18"],
    // ---- lección 2: observar (10)
    ["f11", 2, "o2", "recordar", "¿Cuáles son las preguntas del observador?", "Quién, qué, cuándo, dónde, por qué y cómo", ["Solo cuánto y cuál", "Solo qué significa", "Solo cómo lo aplico"], "Se observa con cuidado, como Esdras y los levitas leían claramente.", "Nehemías 8:8"],
    ["f12", 2, "o2", "comprender", "¿Qué indica que el autor repita una palabra o una frase?", "Que la quiere subrayar", ["Que se equivocó", "Que no tenía más palabras", "Nada importante"], "En Efesios 2, la frase por gracia sois salvos aparece dos veces.", "Efesios 2:5"],
    ["f13", 2, "o2", "recordar", "¿Cuántas veces aparece la palabra gracia en Efesios 2:1-10?", "Tres veces, en los versículos 5, 7 y 8", ["Una vez", "Diez veces", "Ninguna"], "«Porque por gracia sois salvos por medio de la fe».", "Efesios 2:8"],
    ["f14", 2, "o2", "comprender", "¿Qué tipo de palabra es el pero de Efesios 2:4?", "Un contraste", ["Una comparación", "Una conclusión", "Una promesa"], "Marca el giro: estábamos muertos, pero Dios nos dio vida.", "Efesios 2:4"],
    ["f15", 2, "o2", "comprender", "¿Qué indica el conector para que?", "Un propósito", ["Una causa", "Un contraste", "Una pregunta"], "Como en «no por obras, para que nadie se gloríe».", "Efesios 2:9"],
    ["f16", 2, "o2", "comprender", "¿Qué indica el conector porque?", "Una causa o una razón", ["Un propósito", "Una comparación", "Un mandato"], "«Porque por gracia sois salvos por medio de la fe».", "Efesios 2:8"],
    ["f17", 2, "o2", "aplicar", "Romanos 12 empieza con así que. ¿Qué debe hacer quien observa?", "Mirar atrás, a lo que Pablo explicó antes", ["Ignorarlo porque es una palabra pequeña", "Empezar a leer en Romanos 13", "Pensar que es otra carta"], "«Así que, hermanos, os ruego por las misericordias de Dios».", "Romanos 12:1"],
    ["f18", 2, "o2", "analizar", "¿Cuál de estas es una observación, y no una interpretación, de Efesios 2:10?", "El versículo dice que fuimos creados en Cristo Jesús para buenas obras", ["Dios quiere que yo sirva en la iglesia los domingos", "Las buenas obras nos salvan", "Pablo estaba cansado cuando lo escribió"], "«Creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ["f19", 2, "o2", "comprender", "¿Qué palabras marcan una comparación?", "Como, así como y semejante a", ["Pero, sino y en cambio", "Porque y pues", "Así que y por tanto"], "El justo será como árbol plantado junto a corrientes de aguas.", "Salmos 1:3"],
    ["f20", 2, "o2", "aplicar", "¿Para qué sirve escribir las observaciones en un cuaderno?", "Para ver más, recordar lo visto y tenerlo para enseñar", ["Para no tener que leer la Biblia", "Para presumir", "Para no orar"], "Esdras estudió para cumplir y para enseñar.", "Esdras 7:10"],
    // ---- lección 3: interpretar y aplicar (10)
    ["f21", 3, "o3", "comprender", "¿Cómo se convierte una observación en una pregunta de interpretación?", "Preguntando qué significa, por qué se dice ahí y qué relación tiene con lo anterior", ["Repitiéndola en voz alta", "Buscando una canción", "Saltándola"], "La interpretación busca el sentido que el autor quiso dar.", "Nehemías 8:8"],
    ["f22", 3, "o3", "recordar", "¿Dónde traen muchas Biblias las referencias cruzadas?", "Al margen o al pie de la página", ["En la portada", "Solo en los mapas", "En el índice de canciones"], "Llevan a otros pasajes que tratan lo mismo.", "2 Timoteo 3:16"],
    ["f23", 3, "o3", "aplicar", "¿Qué pasaje ayuda a entender la gracia de Efesios 2:8?", "Romanos 3:24, que dice que somos justificados gratuitamente por su gracia", ["Levítico 11, sobre los animales limpios", "Ester 1, sobre el banquete del rey", "Jueces 15, sobre Sansón"], "Así la Escritura explica la Escritura.", "Romanos 3:24"],
    ["f24", 3, "o3", "comprender", "¿Qué indica que alguien no puede resumir un pasaje en una frase?", "Que todavía no lo entendió del todo", ["Que el pasaje no tiene sentido", "Que es muy inteligente", "Que leyó demasiado"], "Escribir la idea central es una prueba de comprensión.", "Efesios 2:8-10"],
    ["f25", 3, "o3", "analizar", "¿Cuál es la mejor idea central de Efesios 2:1-10?", "Dios, por su gracia, nos dio vida en Cristo para que vivamos haciendo las buenas obras que preparó", ["Las buenas obras nos ganan la salvación", "Pablo estaba triste por los efesios", "Hay que ser buenos para que Dios nos ame"], "«No por obras, para que nadie se gloríe».", "Efesios 2:9"],
    ["f26", 3, "o3", "recordar", "¿Cuál es una de las cinco preguntas de aplicación?", "¿Hay un ejemplo que debo seguir?", ["¿Cuántas páginas leí?", "¿Qué opina la mayoría?", "¿Quién escribió el comentario?"], "Las otras buscan un pecado, una promesa, un mandato y una verdad sobre Dios.", "Santiago 1:22"],
    ["f27", 3, "o3", "evaluar", "¿Cuál de estas aplicaciones es personal, concreta y medible?", "El jueves voy a llamar a mi vecino para invitarlo al estudio bíblico", ["Voy a ser más evangelista", "Debemos evangelizar más", "Algún día hablaré de Cristo"], "Ser hacedores de la palabra pide pasos concretos.", "Santiago 1:22"],
    ["f28", 3, "o3", "comprender", "¿Para qué es útil toda la Escritura, según 2 Timoteo 3:16?", "Para enseñar, redargüir, corregir e instruir en justicia", ["Solo para consolar", "Para adivinar el futuro", "Para ganar discusiones"], "Toda la Escritura es inspirada por Dios y «útil para enseñar, para redargüir, para corregir, para instruir en justicia».", "2 Timoteo 3:16"],
    ["f29", 3, "o3", "comprender", "¿Cuál es la meta del estudio bíblico?", "Conocer a Dios y obedecerle, no solo acumular datos", ["Saber más que los demás", "Terminar libros rápido", "Ganar concursos"], "«Sed hacedores de la palabra, y no tan solamente oidores».", "Santiago 1:22"],
    ["f30", 3, "o3", "aplicar", "¿Qué hace el estudiante cuando encuentra una promesa en un pasaje?", "La cree y la recibe para su vida, entendiendo a quién y para qué se dio", ["La ignora", "La aplica a otros pero no a sí mismo", "La cambia por otra"], "Lo que se escribió antes, para nuestra enseñanza se escribió, para que tengamos esperanza.", "Romanos 15:4"],
    // ---- lección 4: versiones, concordancia y diccionario (10)
    ["f31", 4, "o4", "comprender", "¿Qué hace una traducción de equivalencia dinámica?", "Traduce el sentido con palabras de hoy, como Dios Habla Hoy", ["Copia las palabras del original sin traducirlas", "Agrega libros a la Biblia", "Resume cada capítulo"], "Comparar versiones ayuda a ver matices; lo importante es poner el sentido para que se entienda.", "Nehemías 8:8"],
    ["f32", 4, "o4", "recordar", "¿Qué tipo de traducción es la Reina-Valera 1960?", "De equivalencia formal: sigue de cerca las palabras del original", ["Una paráfrasis libre", "Un resumen", "Una traducción solo del Nuevo Testamento"], "Es la que usa la academia y la más usada en las iglesias evangélicas de habla hispana.", "Salmos 119:18"],
    ["f33", 4, "o4", "recordar", "¿Quién publicó en 1569 la traducción de la que nace la Reina-Valera?", "Casiodoro de Reina", ["Martín Lutero", "Cipriano de Valera", "Juan Calvino"], "Su Biblia del Oso fue revisada por Cipriano de Valera en 1602.", "Salmos 119:105"],
    ["f34", 4, "o4", "comprender", "¿Para qué sirve comparar dos o tres versiones?", "Para ver matices del texto", ["Para elegir la que dice lo que quiero", "Para dejar de leer la Biblia", "Para inventar una nueva doctrina"], "La doctrina se estudia en una traducción fiel.", "Proverbios 25:2"],
    ["f35", 4, "o4", "aplicar", "Recuerdas solo la frase la paz de Dios, que sobrepasa todo entendimiento. ¿Qué herramienta usas para encontrar el versículo?", "Una concordancia", ["Un atlas", "Un himnario", "Una línea de tiempo"], "La concordancia lista las palabras de la Biblia con sus versículos.", "Filipenses 4:7"],
    ["f36", 4, "o4", "comprender", "¿Qué tiene de especial la concordancia de Strong?", "Asigna un número a cada palabra hebrea o griega para ver qué hay detrás de la traducción", ["Trae mapas a color", "Solo tiene los evangelios", "Explica cada versículo"], "Así, sin saber esos idiomas, se puede estudiar una palabra del original.", "Juan 5:39"],
    ["f37", 4, "o4", "recordar", "¿Qué explica un diccionario bíblico?", "Personas, lugares, costumbres, objetos y palabras de la Biblia", ["Solo la gramática del español", "Las noticias de hoy", "Solo los nombres de Dios"], "Por ejemplo, qué era un denario o quiénes eran los fariseos.", "Lucas 1:3"],
    ["f38", 4, "o4", "analizar", "¿Qué autoridad tienen las notas de una Biblia de estudio?", "La de una ayuda humana: se leen con discernimiento y no reemplazan al texto", ["La misma que la Escritura", "Ninguna utilidad", "Más que el texto"], "Toda nota se examina con la Palabra.", "Hechos 17:11"],
    ["f39", 4, "o4", "comprender", "Según Proverbios 25:2, ¿qué es honra del rey?", "Escudriñar el asunto que Dios encubrió", ["Encubrir la verdad", "Ignorar lo difícil", "Mandar sin pensar"], "«Gloria de Dios es encubrir un asunto; Pero honra del rey es escudriñarlo».", "Proverbios 25:2"],
    ["f40", 4, "o4", "evaluar", "¿Qué herramienta en línea conviene usar?", "Una que diga quién la escribió y de dónde saca lo que enseña", ["Cualquiera que salga primero", "Las que no dicen sus fuentes", "Las que tienen más colores"], "Lucas investigó con diligencia: las fuentes importan.", "Lucas 1:3"],
    // ---- lección 5: mapas, historia y comentarios (10)
    ["f41", 5, "o4", "recordar", "¿A qué altura aproximada está Jerusalén?", "A unos 750 metros sobre el nivel del mar", ["Al nivel del mar", "A unos 250 metros bajo el nivel del mar", "A más de 3.000 metros"], "Por eso de Jerusalén se descendía a Jericó.", "Lucas 10:30"],
    ["f42", 5, "o4", "comprender", "¿Qué muestra un atlas sobre el camino de Jerusalén a Jericó?", "Que bajaba cerca de mil metros por un desierto con barrancos, peligroso por los ladrones", ["Que era plano y seguro", "Que pasaba por el mar", "Que era muy corto y concurrido"], "«Un hombre descendía de Jerusalén a Jericó, y cayó en manos de ladrones».", "Lucas 10:30"],
    ["f43", 5, "o4", "recordar", "¿A quiénes apartó el Espíritu Santo para el primer viaje misionero?", "A Bernabé y a Saulo", ["A Pedro y a Juan", "A Pablo y a Silas", "A Timoteo y a Tito"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2"],
    ["f44", 5, "o4", "recordar", "¿De qué ciudad salieron Bernabé y Saulo en el primer viaje?", "De Antioquía de Siria", ["De Roma", "De Jerusalén", "De Atenas"], "Navegaron a Chipre y siguieron por el sur de la actual Turquía.", "Hechos 13:1-4"],
    ["f45", 5, "o4", "comprender", "¿Para qué sirve una línea de tiempo bíblica?", "Para ubicar cada libro y cada suceso en la historia", ["Para medir cuánto se tarda en leer", "Para elegir versiones", "Para buscar palabras"], "Saber cuándo profetizó Amós explica su mensaje.", "Amós 1:1"],
    ["f46", 5, "o4", "analizar", "¿Por qué ayuda saber que Amós profetizó en una época de prosperidad?", "Porque explica su denuncia del lujo y de la injusticia", ["Porque prueba que era rico", "Porque no tiene relación con su mensaje", "Porque así se sabe su edad"], "Profetizó en días de Uzías, rey de Judá, y de Jeroboam, rey de Israel.", "Amós 1:1"],
    ["f47", 5, "o4", "recordar", "¿Qué es un comentario bíblico?", "El estudio de un maestro sobre un libro, versículo por versículo", ["Una traducción nueva", "Un mapa de Israel", "Una lista de palabras"], "Es un consejo valioso, no una autoridad igual a la Escritura.", "Hechos 17:11"],
    ["f48", 5, "o4", "aplicar", "¿Por qué no conviene empezar el estudio leyendo un comentario?", "Porque uno repetiría lo que otro vio sin haber observado nada uno mismo", ["Porque los comentarios están prohibidos", "Porque los comentarios no sirven", "Porque son muy caros"], "Primero la Biblia y tus observaciones; después las ayudas.", "Salmos 119:18"],
    ["f49", 5, "o4", "evaluar", "Un comentario y el texto bíblico no coinciden. ¿Qué haces?", "Me quedo con el texto y examino el comentario con la Escritura", ["Me quedo con el comentario", "Dejo de estudiar ese pasaje", "Busco el comentario más famoso"], "Los de Berea examinaban todo con las Escrituras.", "Hechos 17:11"],
    ["f50", 5, "o4", "aplicar", "¿Cuál es el orden recomendado para usar las herramientas?", "La Biblia y la oración, tus observaciones, luego la concordancia, el diccionario y el atlas, y al final los comentarios", ["Primero los comentarios y después la Biblia", "Solo los comentarios", "El orden no importa"], "Así las ayudas iluminan tu estudio en lugar de reemplazarlo.", "Salmos 119:18"],
    // ---- lección 6: cuatro maneras de estudiar (10)
    ["f51", 6, "o5", "comprender", "¿Qué se hace en el estudio por libro?", "Leer el libro entero varias veces, ver su tema y su estructura y estudiar sus partes", ["Leer un versículo suelto", "Estudiar solo una palabra", "Leer solo los títulos"], "Cada parte se ve a la luz del todo.", "Salmos 1:2"],
    ["f52", 6, "o5", "aplicar", "Quieres saber lo que la Biblia enseña sobre la generosidad. ¿Qué estudio haces?", "Un estudio por tema, con la concordancia y leyendo cada pasaje en su contexto", ["Un estudio biográfico de Sansón", "Un estudio del libro de Ester", "Ninguno: basta un versículo"], "El estudio por tema se apoya en el estudio por libro.", "2 Corintios 9:7"],
    ["f53", 6, "o5", "recordar", "¿Qué palabra griega traduce gracia en el Nuevo Testamento?", "Charis", ["Logos", "Agapē", "Ekklēsia"], "En la concordancia de Strong lleva el número 5485.", "Efesios 2:8"],
    ["f54", 6, "o5", "recordar", "¿Qué hizo Bernabé con su heredad, según Hechos 4:37?", "La vendió y puso el precio a los pies de los apóstoles", ["La regaló a su familia", "La guardó para él", "La cambió por un barco"], "Fue un ejemplo de generosidad en la primera iglesia.", "Hechos 4:37"],
    ["f55", 6, "o5", "recordar", "¿Qué hizo Bernabé cuando los discípulos temían a Saulo?", "Lo llevó a los apóstoles y les contó cómo había visto al Señor", ["Lo denunció", "Se fue de Jerusalén", "Lo ignoró"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:27"],
    ["f56", 6, "o5", "recordar", "¿Cómo describe Hechos 11:24 a Bernabé?", "Varón bueno, y lleno del Espíritu Santo y de fe", ["Hombre rico y famoso", "Gran guerrero", "Sacerdote del templo"], "«Porque era varón bueno, y lleno del Espíritu Santo y de fe».", "Hechos 11:24"],
    ["f57", 6, "o5", "analizar", "¿Qué lección deja la historia de Bernabé y Juan Marcos?", "La paciencia con los que fallan: Marcos llegó a ser útil para el ministerio", ["Que nunca hay que perdonar", "Que Pablo y Bernabé se odiaron", "Que Marcos dejó la fe"], "Pablo escribió después de Marcos: «me es útil para el ministerio».", "2 Timoteo 4:11"],
    ["f58", 6, "o5", "comprender", "¿Qué es un estudio biográfico?", "Seguir a una persona por todos los pasajes donde aparece", ["Leer la biografía de un predicador moderno", "Estudiar solo los nombres de una genealogía", "Escribir la propia historia"], "Con la concordancia se encuentra cada aparición, como las de Bernabé en Hechos.", "Hechos 11:22-26"],
    ["f59", 6, "o5", "recordar", "¿Qué hace el bienaventurado del Salmo 1?", "Medita en la ley de Jehová de día y de noche", ["Se sienta con los escarnecedores", "Lee solo los domingos", "Escucha el consejo de los malos"], "«Y en su ley medita de día y de noche».", "Salmos 1:2"],
    ["f60", 6, "o5", "crear", "¿Qué incluye un buen plan personal de estudio bíblico?", "Un libro para leer completo, un tiempo fijo, un cuaderno y estudios por tema, palabra o personaje", ["Leer cuando haya ganas", "Un solo versículo al año", "Solo escuchar predicaciones"], "El que medita de día y de noche será como árbol plantado junto a corrientes de aguas.", "Salmos 1:2-3"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué significa escudriñar las Escrituras?", "Examinarlas con cuidado, como quien busca algo valioso", ["Leerlas por encima", "Repetirlas sin pensar", "Discutir sobre ellas"], "Jesús dijo: «Escudriñad las Escrituras».", "Juan 5:39"],
      ["m1-02", 1, "o1", "comprender", "¿Para qué preparó Esdras su corazón?", "Para inquirir la ley, cumplirla y enseñarla", ["Para enseñarla sin estudiarla", "Para cumplirla sin entenderla", "Para guardarla en un cofre"], "«Para inquirir la ley de Jehová y para cumplirla, y para enseñar».", "Esdras 7:10"],
      ["m1-03", 1, "o1", "comprender", "¿Qué lugar tiene la oración en el estudio bíblico?", "Es el comienzo: se pide a Dios que abra los ojos", ["Ninguno: el estudio es solo técnico", "Se ora solo si el texto es difícil", "Se ora una vez al año"], "«Abre mis ojos, y miraré Las maravillas de tu ley».", "Salmos 119:18"],
      ["m1-04", 1, "o1", "aplicar", "Un amigo quiere empezar a estudiar la Biblia. ¿Qué le aconsejas primero?", "Orar, fijar un tiempo y un lugar, y leer un libro completo", ["Comprar diez comentarios", "Leer al azar", "Esperar a sentir ganas"], "Los de Berea escudriñaban cada día.", "Hechos 17:11"],
      ["m1-05", 1, "o1", "analizar", "¿Por qué conviene ver el libro completo antes de los detalles?", "Para no perderse en los detalles y entender cada parte en el conjunto", ["Porque los detalles no importan", "Para terminar más rápido", "Porque así lo exige la ley"], "Lucas escribió su evangelio por orden, después de investigarlo todo.", "Lucas 1:3"],
      ["m1-06", 1, "o6", "recordar", "¿Qué cita dice: Abre mis ojos, y miraré las maravillas de tu ley?", "Salmos 119:18", ["Salmos 23:1", "Proverbios 3:5", "Isaías 40:8"], "Es el versículo de memoria de la materia.", "Salmos 119:18"],
      ["m1-07", 2, "o2", "recordar", "¿Qué busca la pregunta dónde?", "El lugar en que ocurre lo que cuenta el texto", ["La razón", "La persona", "La manera"], "Los lugares dan sentido a los relatos, como el camino de Jerusalén a Jericó.", "Lucas 10:30"],
      ["m1-08", 2, "o2", "comprender", "¿Qué palabras marcan un contraste?", "Pero, sino y en cambio", ["Como y así como", "Porque y pues", "Y y también"], "«Pero Dios, que es rico en misericordia».", "Efesios 2:4"],
      ["m1-09", 2, "o2", "recordar", "¿Cómo describe Efesios 2:1 nuestra condición antes de Cristo?", "Muertos en delitos y pecados", ["Buenos pero débiles", "Enfermos pero vivos", "Dormidos pero salvos"], "«Cuando estabais muertos en vuestros delitos y pecados».", "Efesios 2:1"],
      ["m1-10", 2, "o2", "comprender", "¿Qué se observa en Efesios 2:9?", "Que la salvación no es por obras, para que nadie se gloríe", ["Que las obras salvan", "Que hay que gloriarse", "Que Pablo hablaba de comida"], "«No por obras, para que nadie se gloríe».", "Efesios 2:9"],
      ["m1-11", 2, "o2", "aplicar", "Al observar un pasaje, ¿qué conviene marcar?", "Las palabras repetidas, los contrastes y los conectores", ["Solo los versículos que ya conozco", "Solo los números", "Nada: basta con leer rápido"], "Lo que el autor repite y conecta muestra su mensaje; así se leía la ley claramente.", "Nehemías 8:8"],
      ["m1-12", 2, "o2", "analizar", "¿Por qué la observación es el paso que más se salta?", "Porque parece fácil y uno quiere llegar pronto a la aplicación", ["Porque no sirve", "Porque solo es para expertos", "Porque la Biblia no tiene detalles"], "Sin ella lo demás se tuerce; por eso el salmista pide que Dios le abra los ojos.", "Salmos 119:18"],
      ["m1-13", 3, "o3", "comprender", "¿Dónde se buscan primero las respuestas de la interpretación?", "En el mismo pasaje y en su contexto", ["En las redes sociales", "En la opinión de un amigo", "En un diccionario de español"], "La Escritura se explica a sí misma.", "2 Timoteo 3:16"],
      ["m1-14", 3, "o3", "recordar", "¿Qué dice Tito 3:5 sobre cómo nos salvó Dios?", "No por obras de justicia que hubiéramos hecho, sino por su misericordia", ["Por nuestras buenas obras", "Por la ley de Moisés", "Por los sacrificios"], "Es una referencia cruzada de Efesios 2:8-9.", "Tito 3:5"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué hace que una aplicación sea medible?", "Que dice qué se hará, cuándo y cómo", ["Que suena bonita", "Que es muy general", "Que la hace otro"], "Ser hacedores pide pasos concretos.", "Santiago 1:22"],
      ["m1-16", 3, "o3", "recordar", "¿Qué pregunta de aplicación lleva a la adoración?", "¿Qué me enseña sobre Dios?", ["¿Qué pecado debo dejar?", "¿Qué mandato debo obedecer?", "¿Qué ejemplo debo seguir?"], "Conocer a Dios lleva a adorarlo; el salmista pide ver las maravillas de su ley.", "Salmos 119:18"],
      ["m1-17", 3, "o3", "comprender", "Según Efesios 2:10, ¿para qué preparó Dios de antemano las buenas obras?", "Para que anduviésemos en ellas", ["Para que nos salven", "Para que otros las hagan", "Para que solo las admiremos"], "«Las cuales Dios preparó de antemano para que anduviésemos en ellas».", "Efesios 2:10"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué es una buena idea central de un pasaje?", "Una frase que resume con fidelidad lo que dice todo el pasaje", ["Una lista de todos los versículos", "Una opinión personal sin relación con el texto", "El versículo más corto"], "Resumir bien muestra que se entendió, como cuando se pone el sentido para que se entienda la lectura.", "Nehemías 8:8"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Quién revisó en 1602 la traducción de Casiodoro de Reina?", "Cipriano de Valera", ["Martín Lutero", "Erasmo de Rotterdam", "Jerónimo"], "De ahí el nombre Reina-Valera.", "Salmos 119:105"],
      ["m2-02", 4, "o4", "comprender", "¿Qué es una concordancia?", "Una lista alfabética de las palabras de la Biblia con los versículos donde aparecen", ["Un comentario de cada versículo", "Un mapa de Israel", "Una historia de la iglesia"], "Ayuda a escudriñar palabra por palabra.", "Juan 5:39"],
      ["m2-03", 4, "o4", "aplicar", "Quieres saber qué era un denario. ¿Qué herramienta usas?", "Un diccionario bíblico", ["Una concordancia de canciones", "Un atlas del clima", "Un calendario"], "El diccionario bíblico explica objetos, costumbres y palabras.", "Mateo 20:2"],
      ["m2-04", 4, "o4", "comprender", "¿Qué reúne una Biblia de estudio?", "Introducciones, notas, mapas y referencias cruzadas", ["Solo el Nuevo Testamento", "Canciones y juegos", "Las opiniones de un solo lector"], "Sus notas son ayudas humanas.", "Lucas 1:3"],
      ["m2-05", 4, "o4", "evaluar", "¿En qué tipo de traducción conviene estudiar una doctrina?", "En una traducción fiel, no en una paráfrasis libre", ["En la que diga lo que quiero", "En cualquier resumen", "En una que quite los pasajes difíciles"], "Toda palabra de Dios es limpia, y merece una traducción cuidadosa.", "Proverbios 30:5"],
      ["m2-06", 4, "o4", "recordar", "¿Cómo se conoce la Biblia de Casiodoro de Reina de 1569?", "Como la Biblia del Oso", ["Como la Biblia del León", "Como la Vulgata", "Como la Biblia de Ginebra"], "Por el oso del grabado de su portada.", "Salmos 119:105"],
      ["m2-07", 5, "o4", "recordar", "¿Qué distancia tenía aproximadamente el camino de Jerusalén a Jericó?", "Unos 27 kilómetros", ["Unos 2 kilómetros", "Unos 300 kilómetros", "Unos 1.000 kilómetros"], "Bajaba cerca de mil metros por el desierto.", "Lucas 10:30"],
      ["m2-08", 5, "o4", "recordar", "¿A qué isla navegaron Bernabé y Saulo en el primer viaje?", "A Chipre", ["A Creta", "A Malta", "A Patmos"], "Descendieron a Seleucia y de allí navegaron a Chipre.", "Hechos 13:4"],
      ["m2-09", 5, "o4", "comprender", "En la línea de tiempo, ¿qué viene entre el exilio y el tiempo de Jesús?", "El regreso del exilio y los siglos entre los dos testamentos", ["El éxodo y los jueces", "La creación y el diluvio", "La Reforma y los avivamientos"], "Ubicar cada libro en su época ayuda a entenderlo; lo escrito antes, para nuestra enseñanza se escribió.", "Romanos 15:4"],
      ["m2-10", 5, "o4", "aplicar", "¿Cuántos comentarios conviene comparar?", "Dos o más, prefiriendo los que explican el texto en su contexto", ["Uno solo, el primero que encuentre", "Ninguno nunca", "Solo los que confirman lo que ya pienso"], "Y todos se examinan con la Escritura.", "Hechos 17:11"],
      ["m2-11", 5, "o4", "evaluar", "¿Cuál es la autoridad final en el estudio?", "La Escritura", ["El comentario más famoso", "La nota de la Biblia de estudio", "La opinión de la mayoría"], "Los de Berea examinaban todo con las Escrituras.", "Hechos 17:11"],
      ["m2-12", 5, "o4", "comprender", "¿Qué hace más vivo el relato del buen samaritano?", "Conocer el terreno del camino de Jerusalén a Jericó", ["Saber el nombre de los ladrones", "Leerlo en voz alta", "Cambiarle el final"], "Era un camino solitario y en bajada, entre barrancos.", "Lucas 10:30"],
      ["m2-13", 6, "o5", "comprender", "¿En qué se apoya el estudio por tema?", "En el estudio por libro y en el contexto de cada pasaje", ["En frases sueltas", "En la opinión del grupo", "En un solo versículo"], "Toda la Escritura es útil para enseñar cuando se lee bien.", "2 Timoteo 3:16"],
      ["m2-14", 6, "o5", "recordar", "¿A qué ciudad fue Bernabé a buscar a Saulo?", "A Tarso", ["A Roma", "A Éfeso", "A Corinto"], "«Después fue Bernabé a Tarso para buscar a Saulo».", "Hechos 11:25"],
      ["m2-15", 6, "o5", "recordar", "¿Por qué se separaron Pablo y Bernabé?", "Porque Bernabé quería llevar otra vez a Juan Marcos", ["Porque Bernabé dejó la fe", "Por una deuda", "Porque Pablo se enfermó"], "Hubo tal desacuerdo entre ellos que se separaron el uno del otro.", "Hechos 15:39"],
      ["m2-16", 6, "o5", "comprender", "¿Qué enseña un estudio por palabra?", "La riqueza de una palabra en todos sus usos y en cada contexto", ["El origen de todas las lenguas", "Solo la ortografía", "Nada útil"], "Por ejemplo, gracia, que traduce la palabra griega charis.", "Efesios 2:8"],
      ["m2-17", 6, "o5", "aplicar", "¿Dónde conviene guardar tus estudios bíblicos?", "En un cuaderno, para usarlos al enseñar", ["En ningún lado", "Solo en la memoria", "En papeles sueltos que se pierden"], "Lo que se estudia con cuidado sirve para enseñar también a otros.", "2 Timoteo 2:2"],
      ["m2-18", 6, "o5", "evaluar", "¿Qué transforma más la vida: un día de estudio con entusiasmo o un plan constante?", "Un plan constante, como el de quien medita de día y de noche", ["Un día de entusiasmo", "Ninguno de los dos", "Estudiar solo cuando hay problemas"], "«Y en su ley medita de día y de noche».", "Salmos 1:2"],
    ] as P[]).map(p),
  },
  // las escritas del examen final: una corta (de 3) y un escrito breve (de 2) por intento
  escritas: [
    {
      id: "n3-metodos-estudio-e1",
      tipo: "corta",
      pregunta: "Explica los tres pasos del estudio inductivo y por qué importa su orden.",
      ideas: [
        { id: "observar", peso: 25, texto: "Observar: ver qué dice el texto.", formas: ["observ*", "que dice", "lo que dice"] },
        { id: "interpretar", peso: 25, texto: "Interpretar: entender qué significa.", formas: ["interpret*", "que significa", "significado"] },
        { id: "aplicar", peso: 25, texto: "Aplicar: obedecer lo que pide.", formas: ["aplic*", "que hago", "obedec*", "hacedor*"] },
        { id: "orden", peso: 15, texto: "Por qué importa el orden: saltarse un paso lleva a obedecer lo que el texto no dice o a llenarse de datos sin cambiar.", formas: ["orden", "primero", "saltar*", "se tuerce", "datos", "lo que no dice", "lo que el texto no dice"] },
      ],
      citas: ["Esdras 7:10", "Hechos 17:11", "Salmos 119:18", "Santiago 1:22", "Nehemías 8:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El estudio inductivo tiene tres pasos: observar lo que dice el texto, interpretar lo que significa y aplicar lo que pide. El orden importa: si aplico sin observar, obedezco lo que el texto no dice, y si observo sin aplicar, me lleno de datos y no cambio. Esdras primero inquirió la ley, después la cumplió y la enseñó (Esdras 7:10).",
    },
    {
      id: "n3-metodos-estudio-e2",
      tipo: "corta",
      pregunta: "¿Qué busca el observador en un texto? Da un ejemplo de Efesios 2:1-10.",
      ideas: [
        { id: "preguntas", peso: 20, texto: "Las preguntas: quién, qué, cuándo, dónde, por qué y cómo.", formas: ["quien", "cuando", "donde", "preguntas"] },
        { id: "repeticion", peso: 20, texto: "Las palabras clave y repetidas.", formas: ["repet*", "repite*", "clave"] },
        { id: "contraste", peso: 20, texto: "Los contrastes y las comparaciones.", formas: ["contraste*", "comparacion*", "pero dios"] },
        { id: "conectores", peso: 10, texto: "Los conectores: porque, para que, así que.", formas: ["conector*", "para que", "asi que", "por tanto"] },
        { id: "ejemplo", peso: 20, texto: "Un ejemplo de Efesios 2: la gracia repetida, el contraste muertos y Pero Dios, las buenas obras.", formas: ["gracia", "muertos", "pero dios", "buenas obras", "no por obras"] },
      ],
      citas: ["Efesios 2:1-10", "Efesios 2:1", "Efesios 2:4", "Efesios 2:5", "Efesios 2:8", "Efesios 2:9", "Efesios 2:10", "Efesios 2:8-10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El observador pregunta quién, qué, cuándo, dónde, por qué y cómo, y busca palabras repetidas, contrastes, comparaciones y conectores. En Efesios 2 se repite la gracia, que aparece tres veces, y hay un gran contraste: estábamos muertos en pecados, pero Dios, rico en misericordia, nos dio vida (Efesios 2:4). El conector para que muestra el propósito.",
    },
    {
      id: "n3-metodos-estudio-e3",
      tipo: "corta",
      pregunta: "Nombra tres herramientas de estudio bíblico, di para qué sirve cada una y cuándo conviene usar los comentarios.",
      ideas: [
        { id: "concordancia", peso: 20, texto: "La concordancia, para encontrar los versículos donde aparece una palabra.", formas: ["concordancia", "strong"] },
        { id: "diccionario", peso: 20, texto: "El diccionario bíblico, para personas, lugares y costumbres.", formas: ["diccionario"] },
        { id: "otra", peso: 15, texto: "Otra herramienta: el atlas, las versiones, la Biblia de estudio o la línea de tiempo.", formas: ["atlas", "mapa*", "version*", "biblia de estudio", "linea de tiempo", "traduccion*"] },
        { id: "comentarios", peso: 25, texto: "Los comentarios, después del estudio propio y no antes.", formas: ["despues", "al final", "por cuenta propia", "no antes"] },
        { id: "examinar", peso: 10, texto: "Lo que dicen se examina con la Escritura.", formas: ["examin*", "con la escritura", "discern*", "berea"] },
      ],
      citas: ["Hechos 17:11", "Proverbios 25:2", "Lucas 1:3", "Juan 5:39", "Lucas 10:30"],
      pesoCita: 10,
      errores: [
        { id: "antes", anula: "comentarios", texto: "Los comentarios se leen después de observar e interpretar por cuenta propia, no antes.", formas: ["leer primero el comentario", "primero los comentarios", "empezar por el comentario", "antes de leer la biblia"] },
      ],
      modelo:
        "La concordancia sirve para encontrar todos los versículos donde aparece una palabra; el diccionario bíblico explica personas, lugares y costumbres; y el atlas muestra los lugares y las distancias. Los comentarios conviene usarlos después de observar e interpretar por cuenta propia, y lo que dicen se examina con la Escritura, como hacían los de Berea (Hechos 17:11).",
    },
    {
      id: "n3-metodos-estudio-e4",
      tipo: "breve",
      pregunta:
        "Haz un estudio inductivo breve de Efesios 2:8-10: escribe al menos tres observaciones, la idea central en una frase y una aplicación personal, concreta y medible. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "observaciones", peso: 25, texto: "Al menos tres observaciones del texto: conectores, contrastes o repeticiones.", formas: ["observ*", "repite*", "contraste*", "conector*", "aparece"] },
        { id: "gracia", peso: 15, texto: "La salvación por gracia, don de Dios.", formas: ["gracia", "don de dios", "regalo"] },
        { id: "fe", peso: 10, texto: "Por medio de la fe.", formas: ["por medio de la fe", "fe"] },
        { id: "obras", peso: 15, texto: "No por obras, y creados para buenas obras.", formas: ["buenas obras", "hechura", "creados", "anduviesemos"] },
        { id: "ideacentral", peso: 15, texto: "La idea central en una frase.", formas: ["idea central", "en una frase", "resumen", "resumi*"] },
        { id: "aplicacion", peso: 20, texto: "Una aplicación personal, concreta y medible.", formas: ["aplic*", "esta semana", "voy a", "el jueves", "el sabado", "el domingo", "concreta"] },
      ],
      basta: 85,
      citas: ["Efesios 2:8-10", "Efesios 2:8", "Efesios 2:9", "Efesios 2:10", "Romanos 3:24", "Tito 3:5", "Santiago 1:22"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Al observar Efesios 2:8-10 veo varias cosas. Primero, el conector porque da la razón de lo anterior: somos salvos por gracia por medio de la fe (Efesios 2:8). Segundo, hay un contraste claro: la salvación no es de nosotros, sino don de Dios, y no es por obras, para que nadie se gloríe. Tercero, el versículo 10 dice que somos hechura suya, creados en Cristo Jesús para buenas obras que Dios preparó de antemano. También observo que la palabra obras aparece dos veces, con sentidos distintos: las obras no nos salvan, y sin embargo fuimos creados para hacerlas. Una referencia cruzada, Tito 3:5, confirma que Dios nos salvó por su misericordia. La idea central en una frase es esta: Dios nos salva por gracia, por medio de la fe, para que vivamos haciendo las buenas obras que él preparó. Mi aplicación concreta es que esta semana, el jueves, voy a visitar a mi vecina que está sola, para ayudarla con sus compras y orar con ella.",
    },
    {
      id: "n3-metodos-estudio-e5",
      tipo: "breve",
      pregunta:
        "Describe cómo harías un estudio biográfico de un personaje de la Biblia: qué herramientas usarías, qué pasos seguirías y qué preguntas harías. Usa como ejemplo a Bernabé u otro personaje, con al menos dos citas bíblicas.",
      ideas: [
        { id: "concordancia", peso: 15, texto: "Buscar con la concordancia todos los pasajes donde aparece.", formas: ["concordancia", "todos los pasajes", "buscar todos"] },
        { id: "pasos", peso: 15, texto: "Leer cada pasaje en orden y en su contexto, y anotar.", formas: ["en su contexto", "en orden", "anota*", "cuaderno"] },
        { id: "preguntas", peso: 15, texto: "Las preguntas: quién era, qué hizo, por qué y cómo.", formas: ["quien era", "que hizo", "por que", "preguntas"] },
        { id: "personaje", peso: 20, texto: "Datos del personaje sacados de los pasajes.", formas: ["bernabe", "hijo de consolacion", "saulo", "marcos", "pedro", "rut", "david", "moises", "ester", "jose", "daniel", "maria"] },
        { id: "lecciones", peso: 20, texto: "Las lecciones para la vida.", formas: ["leccion*", "aprendo", "aprender", "ejemplo", "imitar", "para mi vida"] },
        { id: "herramientas", peso: 15, texto: "Otras herramientas: diccionario, atlas o Biblia de estudio.", formas: ["diccionario", "atlas", "mapa*", "biblia de estudio"] },
      ],
      basta: 85,
      citas: ["Hechos 4:36-37", "Hechos 4:36", "Hechos 9:27", "Hechos 11:22-26", "Hechos 11:24", "Hechos 13:2", "Hechos 15:37-39", "2 Timoteo 4:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Para un estudio biográfico de Bernabé, primero buscaría en una concordancia todos los pasajes donde aparece su nombre, y los leería en orden y en su contexto, anotando en mi cuaderno lo que encuentro. Me haría preguntas: quién era, de dónde venía, qué hizo, por qué lo hizo y cómo lo usó Dios. Así descubriría que era levita, natural de Chipre, y que los apóstoles lo llamaron Hijo de consolación (Hechos 4:36). Vendió una heredad y dio el dinero, presentó a Saulo a los apóstoles cuando todos le temían (Hechos 9:27), animó a la iglesia de Antioquía y fue a buscar a Saulo a Tarso, porque era varón bueno y lleno del Espíritu Santo y de fe (Hechos 11:24). También usaría un diccionario bíblico y un atlas para conocer Chipre, Antioquía y Tarso. De su vida aprendo lecciones para mí: ser generoso, recibir a los nuevos y tener paciencia con los que fallan, como la tuvo con Juan Marcos.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-metodos-estudio-b1",
    tipo: "breve",
    pregunta:
      "Prepara tu plan personal de estudio bíblico para el próximo mes: qué libro leerás completo, qué estudio por tema, por palabra o biográfico harás, qué herramientas usarás, cuándo y dónde estudiarás, y cómo aplicarás lo que aprendas. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "libro", peso: 15, texto: "Un libro para leer completo.", formas: ["libro completo", "completo", "evangelio de", "carta a", "capitulo cada"] },
      { id: "estudio", peso: 15, texto: "Un estudio por tema, por palabra o biográfico.", formas: ["por tema", "por palabra", "biografic*", "personaje"] },
      { id: "herramientas", peso: 15, texto: "Las herramientas que usará.", formas: ["concordancia", "diccionario", "atlas", "comentario*", "biblia de estudio"] },
      { id: "tiempo", peso: 15, texto: "Cuándo y dónde estudiará.", formas: ["cada dia", "cada manana", "cada noche", "de lunes", "a las", "minutos", "lugar"] },
      { id: "metodo", peso: 15, texto: "Los tres pasos: observar, interpretar y aplicar.", formas: ["observ*", "interpret*", "tres pasos"] },
      { id: "oracion", peso: 10, texto: "La oración al empezar.", formas: ["orar", "oracion", "abre mis ojos"] },
      { id: "aplicacion", peso: 15, texto: "Cómo aplicará lo que aprenda.", formas: ["aplic*", "obedec*", "hacedor*", "practic*"] },
    ],
    basta: 85,
    citas: ["Salmos 119:18", "Salmos 1:2", "Salmos 1:2-3", "Josué 1:8", "Hechos 17:11", "Esdras 7:10", "Santiago 1:22", "2 Timoteo 2:15"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Durante el próximo mes voy a leer completo el Evangelio de Marcos, un capítulo cada mañana, de lunes a sábado, a las seis, en la mesa de la cocina antes de que todos se levanten. Empezaré cada día con la oración del salmista: Abre mis ojos, y miraré las maravillas de tu ley (Salmos 119:18). En cada capítulo seguiré los tres pasos: observaré lo que dice el texto y lo anotaré en mi cuaderno, interpretaré lo que significa con las referencias cruzadas y escribiré una aplicación concreta. Los sábados haré un estudio biográfico de Pedro: con la concordancia buscaré los pasajes donde aparece, usaré un diccionario bíblico y un atlas para conocer Galilea y Capernaum, y al final leeré un comentario. No quiero solo saber más, sino ser hacedor de la palabra (Santiago 1:22). Le pediré a un hermano de la iglesia que me pregunte cada domingo cómo voy, para ser constante como el que medita en la ley de Jehová de día y de noche (Salmos 1:2).",
  },
};
