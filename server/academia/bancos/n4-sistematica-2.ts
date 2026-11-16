/**
 * El banco de «Teología sistemática II: Cristo y el Espíritu Santo» (Nivel 4). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la deidad de Cristo y Nicea · o2 su humanidad y Calcedonia · o3 la obra de la cruz · o4 sus oficios, su
 * resurrección y su intercesión · o5 la deidad y la personalidad del Espíritu y Constantinopla · o6 los dones, el bautismo
 * en el Espíritu y el discernimiento · o7 el versículo de memoria (Colosenses 2:9). En los puntos por confirmar, las
 * preguntas solo piden reconocer las posiciones.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-sistematica-2-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_SISTEMATICA_2: BancoMateria = {
  materia: "n4-sistematica-2",
  repaso: {
    "n4-sistematica-2-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué habita en Cristo corporalmente, según Colosenses 2:9?", "Toda la plenitud de la Deidad", ["Una parte de Dios", "Un reflejo de Dios", "La sabiduría de los ángeles"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
      ["1-r2", 1, "o1", "comprender", "¿Qué enseñaba Arrio?", "Que el Hijo era la primera y más alta criatura, pero no Dios eterno", ["Que el Hijo es de la misma sustancia que el Padre", "Que Jesús no fue hombre", "Que hay tres dioses"], "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1-3"],
      ["1-r3", 1, "o1", "aplicar", "Alguien dice que Jesús fue creado por Dios. ¿Qué responde Juan 1:3?", "Que todas las cosas fueron hechas por él, así que él no fue hecho", ["Que tiene razón", "Que fue creado antes del mundo", "Que no importa"], "«Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho».", "Juan 1:1-3"],
    ] as P[]).map(p),
    "n4-sistematica-2-2": ([
      ["2-r1", 2, "o2", "recordar", "¿En qué crecía Jesús, según Lucas 2:52?", "En sabiduría, en estatura y en gracia para con Dios y los hombres", ["Solo en poder", "En riquezas", "En fama política"], "«Y Jesús crecía en sabiduría y en estatura, y en gracia para con Dios y los hombres».", "Lucas 2:52"],
      ["2-r2", 2, "o2", "comprender", "¿Qué afirmó el concilio de Calcedonia en el año 451?", "Que Cristo es una sola persona en dos naturalezas, sin mezcla ni división", ["Que Cristo tiene una sola naturaleza mezclada", "Que Cristo es dos personas", "Que Cristo solo parecía hombre"], "«Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre».", "1 Timoteo 2:5"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué error niega que Jesús fuera hombre de verdad?", "El docetismo", ["El arrianismo", "El nestorianismo", "El eutiquianismo"], "«por cuanto los hijos participaron de carne y sangre, él también participó de lo mismo».", "Hebreos 2:14-17"],
    ] as P[]).map(p),
    "n4-sistematica-2-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué cargó Jehová en el Siervo, según Isaías 53:6?", "El pecado de todos nosotros", ["Las riquezas del mundo", "La ley de Moisés", "El juicio de los ángeles"], "«mas Jehová cargó en él el pecado de todos nosotros».", "Isaías 53:5-6"],
      ["3-r2", 3, "o3", "comprender", "¿Qué significa que Cristo es la propiciación, según Romanos 3:25?", "Que en su sangre queda satisfecha la justicia de Dios", ["Que Cristo fue un buen ejemplo", "Que Dios dejó de ser justo", "Que el pecado no importa"], "«a quien Dios puso como propiciación por medio de la fe en su sangre, para manifestar su justicia».", "Romanos 3:24-26"],
      ["3-r3", 3, "o3", "aplicar", "Un creyente piensa que tiene que añadir méritos a la obra de Cristo. ¿Qué le enseña Hebreos 9:12?", "Que Cristo entró una vez para siempre y obtuvo eterna redención", ["Que debe pagar parte de su deuda", "Que la cruz fue incompleta", "Que debe repetir el sacrificio"], "«entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención».", "Hebreos 9:12"],
    ] as P[]).map(p),
    "n4-sistematica-2-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cuáles son los tres oficios de Cristo?", "Profeta, sacerdote y rey", ["Juez, abogado y testigo", "Pastor, maestro y evangelista", "Apóstol, profeta y obispo"], "«a él oiréis».", "Deuteronomio 18:15"],
      ["4-r2", 4, "o4", "comprender", "¿Qué pasaría si Cristo no hubiera resucitado, según 1 Corintios 15:17?", "Nuestra fe sería vana y aún estaríamos en nuestros pecados", ["Nada cambiaría", "La fe sería más fuerte", "Solo sería un símbolo"], "«y si Cristo no resucitó, vuestra fe es vana; aún estáis en vuestros pecados».", "1 Corintios 15:17-20"],
      ["4-r3", 4, "o4", "aplicar", "Un creyente se siente acusado por su pasado. ¿Qué responde Romanos 8:34?", "Que Cristo murió, resucitó, está a la diestra de Dios e intercede por él", ["Que debe acusarse más", "Que Dios lo condena", "Que no hay perdón"], "«¿Quién es el que condenará? Cristo es el que murió».", "Romanos 8:34"],
    ] as P[]).map(p),
    "n4-sistematica-2-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué escudriña el Espíritu, según 1 Corintios 2:10?", "Todo, aun lo profundo de Dios", ["Solo el corazón humano", "Solo la ley", "Solo el futuro"], "«porque el Espíritu todo lo escudriña, aun lo profundo de Dios».", "1 Corintios 2:10-11"],
      ["5-r2", 5, "o5", "comprender", "¿Qué afirmó el concilio de Constantinopla en el año 381?", "Que el Espíritu es Señor y dador de vida, adorado con el Padre y el Hijo", ["Que el Espíritu es una fuerza", "Que el Espíritu es un ángel", "Que el Espíritu no es Dios"], "«¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?».", "Salmos 139:7-8"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué muestra Hechos 13:2 sobre el Espíritu Santo?", "Que es una persona que habla, llama y envía", ["Que es una energía", "Que solo obra en los cultos", "Que no tiene voluntad"], "«dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo».", "Hechos 13:2"],
    ] as P[]).map(p),
    "n4-sistematica-2-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Para qué es dada la manifestación del Espíritu, según 1 Corintios 12:7?", "Para provecho", ["Para la fama", "Para competir", "Para el castigo"], "«Pero a cada uno le es dada la manifestación del Espíritu para provecho».", "1 Corintios 12:7-11"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseñan los cesacionistas?", "Que ciertos dones terminaron con los apóstoles, al completarse la Biblia", ["Que los dones siguen hoy", "Que nunca hubo dones", "Que los dones son solo para pastores"], "«mas cuando venga lo perfecto, entonces lo que es en parte se acabará».", "1 Corintios 13:8-10"],
      ["6-r3", 6, "o6", "aplicar", "En una reunión alguien profetiza algo que niega que Jesús vino en carne. ¿Qué enseña 1 Juan 4:2-3?", "Que ese espíritu no es de Dios", ["Que hay que creerle", "Que no importa", "Que es una nueva revelación"], "«y todo espíritu que no confiesa que Jesucristo ha venido en carne, no es de Dios».", "1 Juan 4:1-3"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La deidad de Cristo
    ["f01", 1, "o1", "recordar", "¿Cómo habita la plenitud de la Deidad en Cristo, según Colosenses 2:9?", "Corporalmente", ["Solo en espíritu", "Por un tiempo", "En parte"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
    ["f02", 1, "o1", "recordar", "¿Qué era el Verbo en el principio, según Juan 1:1?", "Dios", ["Un ángel", "Una idea", "Un profeta"], "«y el Verbo era Dios».", "Juan 1:1-3"],
    ["f03", 1, "o1", "comprender", "¿Qué significa que Jesús dijera Antes que Abraham fuese, yo soy?", "Que afirmaba su eternidad y usaba el nombre con que Dios se reveló a Moisés", ["Que era más viejo que Abraham por unos años", "Que no conocía a Abraham", "Que era un profeta más"], "«De cierto, de cierto os digo: Antes que Abraham fuese, yo soy».", "Juan 8:58"],
    ["f04", 1, "o1", "recordar", "¿Cómo llama Hebreos 1:3 al Hijo?", "El resplandor de su gloria y la imagen misma de su sustancia", ["Un mensajero celestial", "El mayor de los ángeles", "Un reflejo lejano de Dios"], "«el cual, siendo el resplandor de su gloria, y la imagen misma de su sustancia».", "Hebreos 1:3"],
    ["f05", 1, "o1", "recordar", "¿Qué le dice Dios al Hijo en Hebreos 1:8?", "Tu trono, oh Dios, por el siglo del siglo", ["Tú eres el mayor de mis siervos", "Tú eres un profeta", "Tú serás un rey por un tiempo"], "«Mas del Hijo dice: Tu trono, oh Dios, por el siglo del siglo».", "Hebreos 1:8"],
    ["f06", 1, "o1", "recordar", "¿Qué confesó Tomás ante el Cristo resucitado?", "¡Señor mío, y Dios mío!", ["Eres un buen maestro", "Eres un profeta", "Eres un ángel"], "«Entonces Tomás respondió y le dijo: ¡Señor mío, y Dios mío!».", "Juan 20:28"],
    ["f07", 1, "o1", "comprender", "¿Qué afirmó el concilio de Nicea en el año 325?", "Que el Hijo es de la misma sustancia que el Padre", ["Que el Hijo es la primera criatura", "Que el Hijo es un ángel", "Que hay tres dioses"], "«Todas las cosas por él fueron hechas».", "Juan 1:1-3"],
    ["f08", 1, "o1", "analizar", "¿Por qué la deidad de Cristo es necesaria para la salvación, según la lección?", "Porque solo Dios puede salvar y solo un sacrificio de valor infinito paga por los pecados del mundo", ["Porque así lo decidió un concilio", "Porque no tiene relación con la salvación", "Porque los ángeles no podían venir"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
    ["f09", 1, "o1", "evaluar", "¿Qué grupos repiten hoy la idea de Arrio, según la lección?", "Los que enseñan que Jesús fue una criatura y no Dios eterno", ["Los que confiesan la Trinidad", "Los que adoran a Cristo", "Los que siguen el credo de Nicea"], "«y el Verbo era Dios».", "Juan 1:1-3"],
    ["f10", 1, "o7", "recordar", "Completa Colosenses 2:9: Porque en él habita corporalmente…", "toda la plenitud de la Deidad", ["una parte del poder de Dios", "la sabiduría de los profetas", "el espíritu de los ángeles"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
    // Lección 2 · La humanidad de Cristo y Calcedonia
    ["f11", 2, "o2", "recordar", "¿De qué participó el Hijo, según Hebreos 2:14?", "De carne y sangre", ["Solo de espíritu", "De la naturaleza de los ángeles", "De nada humano"], "«por cuanto los hijos participaron de carne y sangre, él también participó de lo mismo».", "Hebreos 2:14-17"],
    ["f12", 2, "o2", "comprender", "¿Por qué debía Cristo ser en todo semejante a sus hermanos, según Hebreos 2:17?", "Para ser misericordioso y fiel sumo sacerdote y expiar los pecados del pueblo", ["Para ser famoso", "Para dejar de ser Dios", "Para gobernar Israel"], "«para venir a ser misericordioso y fiel sumo sacerdote en lo que a Dios se refiere, para expiar los pecados del pueblo».", "Hebreos 2:14-17"],
    ["f13", 2, "o2", "comprender", "¿Qué significa que Cristo se despojó a sí mismo, según Filipenses 2:7?", "Que tomó forma de siervo sin dejar de ser Dios", ["Que dejó de ser Dios", "Que se hizo ángel", "Que perdió su poder para siempre"], "«sino que se despojó a sí mismo, tomando forma de siervo».", "Filipenses 2:5-11"],
    ["f14", 2, "o2", "recordar", "¿Hasta dónde se humilló Cristo, según Filipenses 2:8?", "Hasta la muerte, y muerte de cruz", ["Hasta el bautismo", "Hasta la pobreza solamente", "Hasta el templo"], "«haciéndose obediente hasta la muerte, y muerte de cruz».", "Filipenses 2:5-11"],
    ["f15", 2, "o2", "recordar", "¿Qué confesará toda lengua, según Filipenses 2:11?", "Que Jesucristo es el Señor, para gloria de Dios Padre", ["Que Jesús fue un buen hombre", "Que no hay Dios", "Que todos los caminos llevan a Dios"], "«y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre».", "Filipenses 2:5-11"],
    ["f16", 2, "o2", "analizar", "¿Qué error dividía a Cristo en dos personas?", "El nestorianismo", ["El docetismo", "El arrianismo", "El eutiquianismo"], "«Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre».", "1 Timoteo 2:5"],
    ["f17", 2, "o2", "analizar", "¿Qué error mezclaba las dos naturalezas de Cristo en una sola?", "El eutiquianismo", ["El nestorianismo", "El docetismo", "El arrianismo"], "«Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre».", "1 Timoteo 2:5"],
    ["f18", 2, "o2", "recordar", "¿Cómo se llama la unión de las dos naturalezas en la persona de Cristo?", "La unión hipostática", ["La transfiguración", "La kénosis completa", "La encarnación parcial"], "«y estando en la condición de hombre, se humilló a sí mismo».", "Filipenses 2:5-11"],
    ["f19", 2, "o2", "comprender", "¿Por qué Cristo puede ser el único mediador, según la lección?", "Porque como hombre nos representa y como Dios su obra tiene valor infinito", ["Porque fue el mejor de los hombres", "Porque fue un ángel", "Porque así lo decidió la iglesia"], "«y un solo mediador entre Dios y los hombres, Jesucristo hombre».", "1 Timoteo 2:5"],
    ["f20", 2, "o2", "evaluar", "¿Cuál de estas frases expresa la fe de Calcedonia?", "Un solo Cristo, verdadero Dios y verdadero hombre, en dos naturalezas sin mezcla ni división", ["Dos Cristos, uno divino y otro humano", "Un Cristo solo divino", "Un Cristo solo humano"], "«Por lo cual debía ser en todo semejante a sus hermanos».", "Hebreos 2:14-17"],
    // Lección 3 · La obra de la cruz
    ["f21", 3, "o3", "recordar", "¿Por qué fue herido el Siervo, según Isaías 53:5?", "Por nuestras rebeliones", ["Por sus propios pecados", "Por un error", "Por los romanos solamente"], "«Mas él herido fue por nuestras rebeliones, molido por nuestros pecados».", "Isaías 53:5-6"],
    ["f22", 3, "o3", "comprender", "¿Qué enseña 2 Corintios 5:21 sobre la sustitución?", "Que Dios hizo pecado al que no conoció pecado, para que fuésemos justicia de Dios en él", ["Que Cristo pecó", "Que no hay sustitución", "Que nos hacemos justos por nuestras obras"], "«Al que no conoció pecado, por nosotros lo hizo pecado».", "2 Corintios 5:21"],
    ["f23", 3, "o3", "recordar", "¿Para qué vino el Hijo del Hombre, según Marcos 10:45?", "Para servir y dar su vida en rescate por muchos", ["Para ser servido", "Para fundar un reino terrenal", "Para juzgar en ese momento"], "«sino para servir, y para dar su vida en rescate por muchos».", "Marcos 10:45"],
    ["f24", 3, "o3", "comprender", "¿Qué significa la redención, según la lección?", "El pago que nos libera, hecho por Cristo", ["Una mejora moral", "Un rito religioso", "Un premio por obras"], "«siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús».", "Romanos 3:24-26"],
    ["f25", 3, "o3", "analizar", "¿Cómo puede Dios ser justo y a la vez justificar al pecador, según Romanos 3:26?", "Porque en la cruz manifestó su justicia: Cristo pagó, y Dios justifica al que es de la fe de Jesús", ["Porque Dios ignora el pecado", "Porque el pecador se esfuerza", "Porque la justicia no importa"], "«a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús».", "Romanos 3:24-26"],
    ["f26", 3, "o3", "recordar", "¿Cuántas veces entró Cristo en el Lugar Santísimo con su sangre, según Hebreos 9:12?", "Una vez para siempre", ["Cada año", "Cada día", "Muchas veces"], "«entró una vez para siempre en el Lugar Santísimo».", "Hebreos 9:12"],
    ["f27", 3, "o3", "recordar", "¿Qué llevó Cristo en su cuerpo sobre el madero, según 1 Pedro 2:24?", "Nuestros pecados", ["Sus propios pecados", "La ley", "Nada"], "«quien llevó él mismo nuestros pecados en su cuerpo sobre el madero».", "1 Pedro 2:24"],
    ["f28", 3, "o3", "analizar", "¿Qué enseña el pentecostalismo clásico sobre la sanidad, según la nota de la lección?", "Que la sanidad del cuerpo está provista en la cruz", ["Que Dios ya no sana", "Que la sanidad depende solo del médico", "Que la cruz no tiene relación con nada"], "«y por cuya herida fuisteis sanados».", "1 Pedro 2:24"],
    ["f29", 3, "o3", "evaluar", "¿Cómo leen 1 Pedro 2:24 los que no enseñan la sanidad en la expiación?", "Como la sanidad del pecado, por su contexto, y presentan la sanidad como promesa en respuesta a la oración", ["Como una prohibición de orar por los enfermos", "Como un error de la Biblia", "Como una promesa de riqueza"], "«para que nosotros, estando muertos a los pecados, vivamos a la justicia».", "1 Pedro 2:24"],
    ["f30", 3, "o3", "aplicar", "Al explicar el evangelio, ¿qué palabra usarías para decir que Cristo ocupó nuestro lugar?", "Sustitución", ["Imitación", "Ejemplo solamente", "Tradición"], "«mas Jehová cargó en él el pecado de todos nosotros».", "Isaías 53:5-6"],
    // Lección 4 · Oficios, resurrección e intercesión
    ["f31", 4, "o4", "recordar", "¿Qué profeta anunció Moisés en Deuteronomio 18:15?", "Un profeta como él, al que el pueblo debía oír", ["Un rey extranjero", "Un sacerdote de Egipto", "Ninguno"], "«Profeta de en medio de ti, de tus hermanos, como yo, te levantará Jehová tu Dios; a él oiréis».", "Deuteronomio 18:15"],
    ["f32", 4, "o4", "comprender", "¿Qué significa que Cristo es nuestro gran sumo sacerdote?", "Que se ofreció a sí mismo por nosotros y traspasó los cielos", ["Que sirvió en el templo de Jerusalén", "Que fue de la tribu de Leví", "Que ofreció sacrificios de animales"], "«teniendo un gran sumo sacerdote que traspasó los cielos, Jesús el Hijo de Dios».", "Hebreos 4:14"],
    ["f33", 4, "o4", "recordar", "¿Qué nombre tiene escrito Cristo en su vestidura, según Apocalipsis 19:16?", "Rey de reyes y Señor de señores", ["Profeta de Israel", "Hijo de David", "Maestro de la ley"], "«Y en su vestidura y en su muslo tiene escrito este nombre: REY DE REYES Y SEÑOR DE SEÑORES».", "Apocalipsis 19:16"],
    ["f34", 4, "o4", "recordar", "¿A cuántos hermanos a la vez se apareció Cristo resucitado, según 1 Corintios 15:6?", "A más de quinientos", ["A doce", "A setenta", "A tres"], "«Después apareció a más de quinientos hermanos a la vez».", "1 Corintios 15:3-8"],
    ["f35", 4, "o4", "analizar", "¿Por qué Pablo menciona que muchos de los testigos vivían aún?", "Porque la resurrección era un hecho que se podía comprobar preguntándoles", ["Porque quería esconder la verdad", "Porque no había testigos", "Porque era una leyenda"], "«de los cuales muchos viven aún, y otros ya duermen».", "1 Corintios 15:3-8"],
    ["f36", 4, "o4", "comprender", "¿Qué significa que Cristo es primicias de los que durmieron?", "Que su resurrección garantiza la resurrección de los suyos", ["Que fue el único que resucitará", "Que la muerte no existe", "Que resucitó en espíritu"], "«Mas ahora Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho».", "1 Corintios 15:17-20"],
    ["f37", 4, "o4", "recordar", "¿Qué pasó en la ascensión, según Hechos 1:9?", "Cristo fue alzado y le recibió una nube que le ocultó de sus ojos", ["Cristo desapareció sin testigos", "Cristo se fue a Galilea", "Cristo murió otra vez"], "«Y habiendo dicho estas cosas, viéndolo ellos, fue alzado, y le recibió una nube que le ocultó de sus ojos».", "Hechos 1:9-11"],
    ["f38", 4, "o4", "comprender", "¿Qué prometieron los dos varones con vestiduras blancas?", "Que Jesús vendrá así como lo vieron ir al cielo", ["Que no volvería", "Que volvería en secreto", "Que enviaría a otro"], "«Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo».", "Hechos 1:9-11"],
    ["f39", 4, "o4", "aplicar", "¿Qué seguridad da Hebreos 7:25 al creyente?", "Que Cristo puede salvar perpetuamente porque vive siempre para interceder", ["Que debe salvarse solo", "Que Cristo ya no intercede", "Que la salvación depende de sus obras"], "«por lo cual puede también salvar perpetuamente a los que por él se acercan a Dios».", "Hebreos 7:25"],
    ["f40", 4, "o4", "evaluar", "¿Qué resume mejor la obra presente de Cristo?", "Reina a la diestra de Dios e intercede por los suyos", ["Descansa sin hacer nada", "Espera sin intervenir", "Juzga sin misericordia"], "«el que además está a la diestra de Dios, el que también intercede por nosotros».", "Romanos 8:34"],
    // Lección 5 · La deidad y la personalidad del Espíritu
    ["f41", 5, "o5", "recordar", "¿Quién conoce las cosas de Dios, según 1 Corintios 2:11?", "El Espíritu de Dios", ["Los sabios del mundo", "Los ángeles", "Nadie"], "«Así tampoco nadie conoció las cosas de Dios, sino el Espíritu de Dios».", "1 Corintios 2:10-11"],
    ["f42", 5, "o5", "comprender", "¿Qué atributo divino del Espíritu muestra Salmos 139:7?", "Que está en todo lugar", ["Que es creado", "Que está lejos", "Que solo está en el templo"], "«¿A dónde me iré de tu Espíritu? ¿Y a dónde huiré de tu presencia?».", "Salmos 139:7-8"],
    ["f43", 5, "o5", "recordar", "¿De quién procede el Espíritu, según Juan 15:26?", "Del Padre", ["De los ángeles", "De la iglesia", "De los profetas"], "«el Espíritu de verdad, el cual procede del Padre».", "Juan 15:26"],
    ["f44", 5, "o5", "comprender", "¿Quién envía al Consolador, según Juan 15:26?", "El Hijo, desde el Padre", ["Los apóstoles", "Moisés", "Nadie"], "«a quien yo os enviaré del Padre».", "Juan 15:26"],
    ["f45", 5, "o5", "recordar", "¿De qué da testimonio el Espíritu, según Juan 15:26?", "De Cristo", ["De sí mismo", "De los profetas", "De la ley"], "«él dará testimonio acerca de mí».", "Juan 15:26"],
    ["f46", 5, "o5", "analizar", "¿Qué discutieron las iglesias de Oriente y de Occidente sobre el Espíritu?", "Si procede también del Hijo", ["Si el Espíritu es Dios", "Si el Espíritu existe", "Si se debe orar"], "«el cual procede del Padre».", "Juan 15:26"],
    ["f47", 5, "o5", "recordar", "¿Qué dijo el Espíritu Santo en Antioquía?", "Apartadme a Bernabé y a Saulo para la obra a que los he llamado", ["Id todos a Jerusalén", "Dejad de ayunar", "Construid un templo"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2"],
    ["f48", 5, "o5", "comprender", "¿Por qué el concilio de Constantinopla habló del Espíritu en el año 381?", "Porque algunos negaban que el Espíritu fuera Dios", ["Porque se discutía el bautismo en agua", "Porque se elegía un emperador", "Porque se traducía la Biblia"], "«porque el Espíritu todo lo escudriña, aun lo profundo de Dios».", "1 Corintios 2:10-11"],
    ["f49", 5, "o5", "aplicar", "¿Qué implica para la adoración que el Espíritu sea Dios?", "Que también se le adora y glorifica, con el Padre y el Hijo", ["Que no se le debe mencionar", "Que solo se le pide poder", "Que se le adora más que al Padre"], "«Si subiere a los cielos, allí estás tú».", "Salmos 139:7-8"],
    ["f50", 5, "o5", "evaluar", "¿Cuál de estas afirmaciones sobre el Espíritu es correcta?", "Es una persona divina que procede del Padre y es enviada por el Hijo", ["Es una fuerza creada por Dios", "Es otro nombre del Padre", "Es un ángel superior"], "«Pero cuando venga el Consolador, a quien yo os enviaré del Padre».", "Juan 15:26"],
    // Lección 6 · Los dones, el bautismo en el Espíritu y el discernimiento
    ["f51", 6, "o6", "recordar", "¿Cuáles son los dones de revelación, según la clasificación de la lección?", "Palabra de sabiduría, palabra de ciencia y discernimiento de espíritus", ["Fe, sanidades y milagros", "Profecía, lenguas e interpretación", "Enseñanza, servicio y misericordia"], "«porque a éste es dada por el Espíritu palabra de sabiduría; a otro, palabra de ciencia».", "1 Corintios 12:7-11"],
    ["f52", 6, "o6", "recordar", "¿Cuáles son los dones de poder, según la clasificación de la lección?", "Fe, dones de sanidades y el hacer milagros", ["Profecía, lenguas e interpretación", "Sabiduría, ciencia y discernimiento", "Liderazgo, ayuda y administración"], "«a otro, fe por el mismo Espíritu; y a otro, dones de sanidades por el mismo Espíritu. A otro, el hacer milagros».", "1 Corintios 12:7-11"],
    ["f53", 6, "o6", "recordar", "¿Cuáles son los dones de expresión, según la clasificación de la lección?", "Profecía, diversos géneros de lenguas e interpretación de lenguas", ["Fe, sanidades y milagros", "Sabiduría, ciencia y discernimiento", "Enseñanza, exhortación y misericordia"], "«a otro, profecía; a otro, discernimiento de espíritus; a otro, diversos géneros de lenguas; y a otro, interpretación de lenguas».", "1 Corintios 12:7-11"],
    ["f54", 6, "o6", "comprender", "¿Qué entienden los continuistas por lo perfecto de 1 Corintios 13:10?", "La venida de Cristo: hasta entonces los dones siguen", ["La Biblia completa", "La muerte de los apóstoles", "El fin del primer siglo"], "«mas cuando venga lo perfecto, entonces lo que es en parte se acabará».", "1 Corintios 13:8-10"],
    ["f55", 6, "o6", "comprender", "¿Qué enseña el artículo 10 de la declaración de fe sobre los dones?", "Que siguen vigentes hoy", ["Que terminaron con los apóstoles", "Que son solo para pastores", "Que no existen"], "«El amor nunca deja de ser; pero las profecías se acabarán».", "1 Corintios 13:8-10"],
    ["f56", 6, "o6", "recordar", "¿Qué manda Pablo en 1 Corintios 14:39 sobre las lenguas?", "Que no se impida el hablar lenguas", ["Que se prohíban", "Que todos hablen a la vez", "Que solo hablen los pastores"], "«Así que, hermanos, procurad profetizar, y no impidáis el hablar lenguas».", "1 Corintios 14:39-40"],
    ["f57", 6, "o6", "aplicar", "¿Qué equilibrio pide 1 Corintios 14:39-40 al líder?", "Procurar los dones y hacerlo todo decentemente y con orden", ["Prohibir los dones para evitar desorden", "Permitir cualquier cosa", "Dejar que cada uno haga lo que quiera"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:39-40"],
    ["f58", 6, "o6", "comprender", "¿Qué enseña el artículo 9 de la declaración de fe sobre el bautismo en el Espíritu?", "Que es distinto del nuevo nacimiento, puede seguirlo y da poder para testificar y servir", ["Que es lo mismo que el bautismo en agua", "Que ya no ocurre", "Que es necesario para salvarse"], "«Porque para vosotros es la promesa, y para vuestros hijos».", "Hechos 2:38-39"],
    ["f59", 6, "o6", "analizar", "¿Cuál es la primera prueba de un espíritu, según 1 Juan 4:2?", "Si confiesa que Jesucristo ha venido en carne", ["Si hace milagros", "Si emociona a la gente", "Si atrae multitudes"], "«Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios».", "1 Juan 4:1-3"],
    ["f60", 6, "o6", "evaluar", "¿Cuáles son las posiciones sobre las lenguas que el ministerio debe confirmar?", "Si son la señal física inicial y necesaria del bautismo en el Espíritu, o una manifestación que se espera sin ser la única señal", ["Si están prohibidas o son obligatorias para salvarse", "Si son para los pastores o para los niños", "Si son un idioma o una música"], "«a otro, diversos géneros de lenguas; y a otro, interpretación de lenguas».", "1 Corintios 12:7-11"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Con quién era el Verbo en el principio, según Juan 1:2?", "Con Dios", ["Con los ángeles", "Con Moisés", "Con nadie"], "«Este era en el principio con Dios».", "Juan 1:1-3"],
      ["m1-02", 1, "o1", "comprender", "¿Qué muestra que Jesús aceptara la adoración de Tomás?", "Que es Dios, porque solo a Dios se adora", ["Que Tomás se equivocó", "Que Jesús no oyó", "Que era costumbre adorar a los maestros"], "«¡Señor mío, y Dios mío!».", "Juan 20:28"],
      ["m1-03", 1, "o1", "recordar", "¿Qué hizo el Hijo con los pecados, según Hebreos 1:3?", "Efectuó la purificación de nuestros pecados por medio de sí mismo", ["Los ignoró", "Los castigó en otros", "Los dejó para el juicio"], "«habiendo efectuado la purificación de nuestros pecados por medio de sí mismo».", "Hebreos 1:3"],
      ["m1-04", 1, "o1", "aplicar", "Un grupo enseña que Jesús es un dios menor. ¿Qué texto de la lección lo corrige con más fuerza?", "Colosenses 2:9: en él habita corporalmente toda la plenitud de la Deidad", ["Lucas 2:52", "Marcos 10:45", "Hebreos 4:14"], "«Porque en él habita corporalmente toda la plenitud de la Deidad».", "Colosenses 2:9"],
      ["m1-05", 1, "o1", "analizar", "¿Qué relación hay entre Juan 1:3 y la deidad de Cristo?", "Que si todo fue hecho por él, él no es una criatura", ["Que él fue hecho primero", "Que solo hizo algunas cosas", "Que no tiene relación"], "«y sin él nada de lo que ha sido hecho, fue hecho».", "Juan 1:1-3"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué concilio respondió a Arrio?", "El concilio de Nicea, en el año 325", ["El de Calcedonia, en el año 451", "El de Constantinopla, en el año 381", "El de Jerusalén, en Hechos 15"], "«En el principio era el Verbo».", "Juan 1:1-3"],
      ["m1-07", 2, "o2", "recordar", "¿A quiénes socorrió Cristo, según Hebreos 2:16?", "A la descendencia de Abraham", ["A los ángeles", "A los romanos solamente", "A nadie"], "«Porque ciertamente no socorrió a los ángeles, sino que socorrió a la descendencia de Abraham».", "Hebreos 2:14-17"],
      ["m1-08", 2, "o2", "comprender", "¿Qué muestra que Jesús tuviera hambre, se cansara y llorara?", "Que su humanidad fue completa", ["Que no era Dios", "Que fingía", "Que estaba enfermo"], "«Y Jesús crecía en sabiduría y en estatura».", "Lucas 2:52"],
      ["m1-09", 2, "o2", "recordar", "¿Cómo era Cristo antes de tomar forma de siervo, según Filipenses 2:6?", "Siendo en forma de Dios", ["Un ángel", "Un profeta", "Un hombre común"], "«el cual, siendo en forma de Dios, no estimó el ser igual a Dios como cosa a que aferrarse».", "Filipenses 2:5-11"],
      ["m1-10", 2, "o2", "comprender", "¿Qué le dio Dios a Cristo al exaltarlo, según Filipenses 2:9?", "Un nombre que es sobre todo nombre", ["Un reino terrenal", "Una corona de oro", "Un templo"], "«y le dio un nombre que es sobre todo nombre».", "Filipenses 2:5-11"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué actitud pide Filipenses 2:5 al líder?", "Tener el mismo sentir de Cristo, que se humilló", ["Buscar el primer lugar", "Exigir honra", "Servir solo a los importantes"], "«Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús».", "Filipenses 2:5-11"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estos errores negaba la deidad de Cristo?", "El arrianismo", ["El docetismo", "El nestorianismo", "El eutiquianismo"], "«Porque hay un solo Dios, y un solo mediador».", "1 Timoteo 2:5"],
      ["m1-13", 3, "o3", "recordar", "¿Qué fue sobre el Siervo, según Isaías 53:5?", "El castigo de nuestra paz", ["La gloria de los reyes", "La riqueza del mundo", "El juicio de los ángeles"], "«el castigo de nuestra paz fue sobre él».", "Isaías 53:5-6"],
      ["m1-14", 3, "o3", "comprender", "¿Cómo somos justificados, según Romanos 3:24?", "Gratuitamente por su gracia, mediante la redención en Cristo", ["Por nuestras obras", "Por la ley", "Por el bautismo solamente"], "«siendo justificados gratuitamente por su gracia».", "Romanos 3:24-26"],
      ["m1-15", 3, "o3", "recordar", "¿Con qué sangre entró Cristo en el Lugar Santísimo, según Hebreos 9:12?", "Con su propia sangre", ["Con sangre de machos cabríos", "Con sangre de becerros", "Sin sangre"], "«sino por su propia sangre, entró una vez para siempre».", "Hebreos 9:12"],
      ["m1-16", 3, "o3", "aplicar", "¿Qué palabra de la cruz explica que Dios declara justo al que cree?", "Justificación", ["Glorificación", "Encarnación", "Ascensión"], "«y el que justifica al que es de la fe de Jesús».", "Romanos 3:24-26"],
      ["m1-17", 3, "o3", "analizar", "¿Qué tienen en común Isaías 53 y 2 Corintios 5:21?", "Que los dos enseñan que Cristo ocupó nuestro lugar", ["Que hablan de un juicio sin perdón", "Que hablan de un profeta cualquiera", "Que no tienen relación"], "«por nosotros lo hizo pecado».", "2 Corintios 5:21"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué queda por confirmar sobre la cruz en la declaración de fe?", "Si la sanidad del cuerpo está provista en la expiación", ["Si Cristo murió por nuestros pecados", "Si la salvación es por gracia", "Si Cristo resucitó"], "«y por su llaga fuimos nosotros curados».", "Isaías 53:5-6"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿A quiénes se apareció Cristo, según 1 Corintios 15:5?", "A Cefas, y después a los doce", ["Solo a María", "A Pilato", "A nadie"], "«y que apareció a Cefas, y después a los doce».", "1 Corintios 15:3-8"],
      ["m2-02", 4, "o4", "comprender", "¿Qué serían los creyentes si solo esperaran en Cristo en esta vida, según 1 Corintios 15:19?", "Los más dignos de conmiseración de todos los hombres", ["Los más felices", "Los más sabios", "Los más ricos"], "«somos los más dignos de conmiseración de todos los hombres».", "1 Corintios 15:17-20"],
      ["m2-03", 4, "o4", "recordar", "¿Qué hacían los discípulos mientras Jesús subía al cielo?", "Tenían los ojos puestos en el cielo", ["Dormían", "Se habían ido", "Discutían"], "«Y estando ellos con los ojos puestos en el cielo, entre tanto que él se iba».", "Hechos 1:9-11"],
      ["m2-04", 4, "o4", "aplicar", "¿Qué pide Hebreos 4:14 a los que tienen a Jesús como sumo sacerdote?", "Que retengan su profesión", ["Que dejen la fe", "Que busquen otro sacerdote", "Que ofrezcan sacrificios"], "«retengamos nuestra profesión».", "Hebreos 4:14"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué el oficio de rey de Cristo da esperanza a la iglesia perseguida?", "Porque Cristo es Rey de reyes y Señor de señores", ["Porque los reyes de la tierra son buenos", "Porque la iglesia gobierna el mundo", "Porque no habrá persecución"], "«REY DE REYES Y SEÑOR DE SEÑORES».", "Apocalipsis 19:16"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál de estos hechos de Cristo es la base de la esperanza de nuestra resurrección?", "Que él resucitó como primicias de los que durmieron", ["Que fue un buen maestro", "Que hizo milagros", "Que murió"], "«primicias de los que durmieron es hecho».", "1 Corintios 15:17-20"],
      ["m2-07", 5, "o5", "recordar", "¿Por medio de quién nos reveló Dios sus cosas, según 1 Corintios 2:10?", "Por el Espíritu", ["Por los sabios", "Por los ángeles", "Por la filosofía"], "«Pero Dios nos las reveló a nosotros por el Espíritu».", "1 Corintios 2:10-11"],
      ["m2-08", 5, "o5", "comprender", "¿Qué muestra Salmos 139:8 sobre el Espíritu?", "Que no hay lugar donde no esté presente", ["Que solo está en el cielo", "Que se ausenta del Seol", "Que no conoce al hombre"], "«Si subiere a los cielos, allí estás tú; Y si en el Seol hiciere mi estrado, he aquí, allí tú estás».", "Salmos 139:7-8"],
      ["m2-09", 5, "o5", "recordar", "¿Cómo se llama al Espíritu en Juan 15:26?", "El Consolador y el Espíritu de verdad", ["El juez y el rey", "El ángel y el mensajero", "El profeta y el sacerdote"], "«Pero cuando venga el Consolador, a quien yo os enviaré del Padre, el Espíritu de verdad».", "Juan 15:26"],
      ["m2-10", 5, "o5", "aplicar", "Alguien dice que el Espíritu es solo una fuerza. ¿Qué versículo de la lección muestra que habla y envía?", "Hechos 13:2", ["Lucas 2:52", "Hebreos 9:12", "Marcos 10:45"], "«dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo».", "Hechos 13:2"],
      ["m2-11", 5, "o5", "analizar", "¿Qué completó la iglesia con el concilio de Constantinopla?", "Su confesión de la Trinidad", ["Su lista de libros", "Su calendario", "Su gobierno"], "«el Espíritu de verdad, el cual procede del Padre».", "Juan 15:26"],
      ["m2-12", 5, "o5", "evaluar", "¿Cuál de estas frases describe mejor al Espíritu Santo?", "Señor y dador de vida, adorado con el Padre y el Hijo", ["Un poder impersonal", "Un recuerdo de Jesús", "Un ángel enviado"], "«Así tampoco nadie conoció las cosas de Dios, sino el Espíritu de Dios».", "1 Corintios 2:10-11"],
      ["m2-13", 6, "o6", "recordar", "¿Quién hace todos los dones, según 1 Corintios 12:11?", "Uno y el mismo Espíritu", ["Cada creyente", "Los pastores", "Los ángeles"], "«Pero todas estas cosas las hace uno y el mismo Espíritu».", "1 Corintios 12:7-11"],
      ["m2-14", 6, "o6", "comprender", "¿Qué nunca deja de ser, según 1 Corintios 13:8?", "El amor", ["La profecía", "Las lenguas", "La ciencia"], "«El amor nunca deja de ser».", "1 Corintios 13:8-10"],
      ["m2-15", 6, "o6", "recordar", "¿Qué pide Pablo procurar en 1 Corintios 14:39?", "Profetizar", ["El silencio total", "La fama", "Las riquezas"], "«procurad profetizar».", "1 Corintios 14:39-40"],
      ["m2-16", 6, "o6", "aplicar", "¿Cómo debe responder un líder a una manifestación espiritual nueva en su iglesia?", "Examinarla por la Escritura y por su confesión de Cristo", ["Aceptarla sin preguntar", "Prohibirla sin examinarla", "Publicarla enseguida"], "«no creáis a todo espíritu, sino probad los espíritus si son de Dios».", "1 Juan 4:1-3"],
      ["m2-17", 6, "o6", "analizar", "¿En qué se diferencian el continuismo y el cesacionismo?", "En si ciertos dones siguen hoy o terminaron con los apóstoles", ["En si existe Dios", "En si se debe orar", "En si Cristo resucitó"], "«las profecías se acabarán, y cesarán las lenguas».", "1 Corintios 13:8-10"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál es la posición de la declaración de fe del ministerio sobre los dones?", "Que siguen vigentes hoy y se ejercen con amor y orden", ["Que terminaron con los apóstoles", "Que son solo para un grupo", "Que no tienen importancia"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:39-40"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-sistematica-2-e1",
      tipo: "corta",
      pregunta: "Explica con la Escritura por qué Jesucristo es verdadero Dios y qué respondió el concilio de Nicea al error de Arrio.",
      ideas: [
        { id: "textos", peso: 35, texto: "Textos de la deidad: la plenitud de la Deidad, el Verbo era Dios, yo soy, Señor mío y Dios mío.", formas: ["plenitud de la deidad", "el verbo era dios", "yo soy", "dios mio", "tu trono oh dios", "imagen misma de su sustancia"] },
        { id: "arrio", peso: 25, texto: "Arrio decía que el Hijo era una criatura.", formas: ["arrio", "arrian*"] },
        { id: "nicea", peso: 30, texto: "Nicea afirmó que el Hijo es de la misma sustancia que el Padre.", formas: ["misma sustancia", "nicea", "325", "verdadero dios de verdadero dios"] },
      ],
      citas: ["Colosenses 2:9", "Juan 1:1", "Juan 1:1-3", "Juan 8:58", "Hebreos 1:3", "Hebreos 1:8", "Juan 20:28", "Tito 2:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesucristo es verdadero Dios: en él habita corporalmente toda la plenitud de la Deidad (Colosenses 2:9), el Verbo era Dios, y Tomás lo adoró diciendo Señor mío y Dios mío. Arrio enseñaba que el Hijo era una criatura; el concilio de Nicea, en el año 325, afirmó que es de la misma sustancia que el Padre.",
    },
    {
      id: "n4-sistematica-2-e2",
      tipo: "corta",
      pregunta: "Explica qué enseña la Biblia sobre la humanidad de Cristo y qué confesó el concilio de Calcedonia.",
      ideas: [
        { id: "humano", peso: 30, texto: "Cristo es verdadero hombre: participó de carne y sangre y crecía.", formas: ["carne y sangre", "verdadero hombre", "crecia", "se despojo", "forma de siervo", "semejante a sus hermanos"] },
        { id: "calcedonia", peso: 35, texto: "Una sola persona en dos naturalezas, sin mezcla ni división.", formas: ["una sola persona", "dos naturalezas", "calcedonia", "451", "union hipostatica"] },
        { id: "mediador", peso: 25, texto: "Por eso es el único mediador.", formas: ["mediador", "nos representa", "valor infinito"] },
      ],
      citas: ["Hebreos 2:14-17", "Hebreos 2:14", "Hebreos 2:17", "Lucas 2:52", "Filipenses 2:5-11", "Filipenses 2:7", "1 Timoteo 2:5"],
      pesoCita: 10,
      errores: [{ id: "dos_personas", anula: "calcedonia", texto: "Cristo no es dos personas: es una sola persona en dos naturalezas.", formas: ["son dos personas", "es dos personas"] }],
      modelo:
        "Cristo es verdadero hombre: participó de carne y sangre y crecía en sabiduría y en estatura (Hebreos 2:14; Lucas 2:52). El concilio de Calcedonia, en el año 451, confesó que es una sola persona en dos naturalezas, la divina y la humana, sin mezcla ni división. Por eso es el único mediador entre Dios y los hombres.",
    },
    {
      id: "n4-sistematica-2-e3",
      tipo: "corta",
      pregunta: "Explica qué hizo Cristo en la cruz usando las palabras sustitución, redención y propiciación.",
      ideas: [
        { id: "sustitucion", peso: 30, texto: "Sustitución: murió en nuestro lugar.", formas: ["sustitu*", "en nuestro lugar", "por nosotros lo hizo pecado", "cargo en el"] },
        { id: "redencion", peso: 30, texto: "Redención o rescate: el pago que nos libera.", formas: ["redencion", "rescate", "el pago", "nos libera", "libertad"] },
        { id: "propiciacion", peso: 30, texto: "Propiciación: la justicia de Dios queda satisfecha.", formas: ["propiciacion", "satisfecha", "satisface", "su justicia"] },
      ],
      citas: ["Isaías 53:5-6", "2 Corintios 5:21", "Marcos 10:45", "Romanos 3:24-26", "Romanos 3:25", "Hebreos 9:12", "1 Pedro 2:24"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En la cruz, Cristo murió en nuestro lugar: es la sustitución, pues Dios lo hizo pecado por nosotros (2 Corintios 5:21). Su muerte es la redención, el rescate o pago que nos libera del pecado. Y es la propiciación: en su sangre queda satisfecha la justicia de Dios, que justifica al que cree.",
    },
    {
      id: "n4-sistematica-2-e4",
      tipo: "breve",
      pregunta:
        "Un joven de tu iglesia te dice que el Espíritu Santo es solo una fuerza de Dios. Escríbele una explicación bíblica de la deidad y la personalidad del Espíritu, y de cómo lo confesó la iglesia.",
      ideas: [
        { id: "persona", peso: 25, texto: "Es una persona: habla, llama, envía, enseña y da testimonio.", formas: ["persona", "habla", "llama", "envia", "dijo el espiritu", "da testimonio", "voluntad"] },
        { id: "dios", peso: 30, texto: "Es Dios: conoce todo y está en todo lugar.", formas: ["es dios", "omnisc*", "omnipresen*", "escudrina", "todo lugar", "lo profundo de dios", "huire de tu presencia"] },
        { id: "relacion", peso: 15, texto: "Procede del Padre y es enviado por el Hijo.", formas: ["procede del padre", "enviado por el hijo", "lo envia", "os enviare"] },
        { id: "concilio", peso: 20, texto: "Constantinopla lo confesó Señor y dador de vida, adorado con el Padre y el Hijo.", formas: ["constantinopla", "381", "dador de vida", "adorado", "glorificado"] },
        { id: "no_fuerza", peso: 10, texto: "No es solo una fuerza.", formas: ["no es una fuerza", "no es solo una fuerza", "no una fuerza", "no es una energia"], negativa: true },
      ],
      basta: 85,
      citas: ["1 Corintios 2:10-11", "1 Corintios 2:10", "Salmos 139:7-8", "Salmos 139:7", "Juan 15:26", "Hechos 13:2", "Hechos 5:3-4", "Juan 14:16-17", "Efesios 4:30", "Mateo 28:19"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano, el Espíritu Santo no es una fuerza: es una persona divina. Habla, llama y envía, como en Antioquía, cuando dijo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado (Hechos 13:2). Jesús lo llama el Consolador y dice que da testimonio de él. Además es Dios: tiene atributos que solo tiene Dios. Escudriña todo, aun lo profundo de Dios (1 Corintios 2:10), y está en todo lugar, porque nadie puede huir de su presencia (Salmos 139:7). Procede del Padre y es enviado por el Hijo, según Juan 15:26. Cuando algunos negaron su deidad, la iglesia lo confesó en el concilio de Constantinopla, en el año 381, como el Señor y dador de vida, que con el Padre y el Hijo es adorado y glorificado. Por eso también lo adoramos, y no solo le pedimos poder.",
    },
    {
      id: "n4-sistematica-2-e5",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de líderes por qué la declaración de fe enseña que los dones del Espíritu siguen vigentes, cómo se ejercen y cómo se disciernen las manifestaciones, con citas bíblicas.",
      ideas: [
        { id: "dones", peso: 15, texto: "Nombra o clasifica los dones de 1 Corintios 12.", formas: ["revelacion", "de poder", "de expresion", "profecia", "sanidades", "lenguas", "palabra de sabiduria"] },
        { id: "vigentes", peso: 30, texto: "Siguen vigentes hasta que venga lo perfecto, la venida de Cristo, contra el cesacionismo.", formas: ["vigentes", "siguen hoy", "lo perfecto", "venida de cristo", "cesacion*", "continu*"], negativa: true },
        { id: "orden", peso: 25, texto: "Se ejercen con amor y con orden.", formas: ["con orden", "decentemente", "amor", "no impidais"] },
        { id: "discernir", peso: 30, texto: "Se prueban los espíritus: confesar a Cristo venido en carne.", formas: ["probad los espiritus", "probar los espiritus", "examin*", "venido en carne", "discern*"] },
      ],
      basta: 85,
      citas: ["1 Corintios 12:7-11", "1 Corintios 12:7", "1 Corintios 13:8-10", "1 Corintios 13:10", "1 Corintios 14:39-40", "1 Corintios 14:40", "1 Juan 4:1-3", "1 Juan 4:1", "Hechos 2:38-39", "1 Tesalonicenses 5:19-21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, Pablo nombra en 1 Corintios 12 nueve manifestaciones del Espíritu, que muchos agrupan en dones de revelación, de poder y de expresión, y todas las hace el mismo Espíritu para provecho. ¿Siguen vigentes? Los cesacionistas creen que ciertos dones terminaron con los apóstoles, cuando se completó la Biblia. Pero 1 Corintios 13:10 dice que cesarán cuando venga lo perfecto, y la tradición pentecostal entiende que eso es la venida de Cristo; por eso nuestra declaración de fe enseña que siguen vigentes hoy. Se ejercen con amor, que nunca deja de ser, y con orden: procurad profetizar, y no impidáis el hablar lenguas; pero hágase todo decentemente y con orden (1 Corintios 14:39-40). Y toda manifestación se discierne: no creáis a todo espíritu, sino probad los espíritus si son de Dios (1 Juan 4:1). La primera prueba es Cristo: el espíritu que confiesa que Jesucristo ha venido en carne es de Dios. Así deseamos los dones sin perder la verdad.",
    },
  ],
  breve: {
    id: "n4-sistematica-2-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo enseñarías en tu iglesia la persona y la obra de Cristo y del Espíritu Santo: qué verdades no pueden faltar, qué errores corregirías y cómo cambian estas doctrinas la vida de la iglesia, con citas bíblicas.",
    ideas: [
      { id: "cristo", peso: 25, texto: "La deidad y la humanidad de Cristo.", formas: ["verdadero dios", "verdadero hombre", "plenitud de la deidad", "dos naturalezas", "hecho carne", "una sola persona"] },
      { id: "obra", peso: 20, texto: "La obra de Cristo: la cruz, la resurrección y la intercesión.", formas: ["en nuestro lugar", "sustitu*", "resucito", "resurreccion", "intercede", "propiciacion"] },
      { id: "espiritu", peso: 20, texto: "La deidad y la personalidad del Espíritu.", formas: ["persona divina", "el espiritu es dios", "espiritu santo es dios", "habla", "omnipresen*", "consolador"] },
      { id: "errores", peso: 20, texto: "Los errores que corregiría.", formas: ["arrio", "arrian*", "docet*", "nestori*", "eutiqu*", "criatura", "solo una fuerza", "cesacion*"] },
      { id: "vida", peso: 15, texto: "Cómo cambian la vida de la iglesia.", formas: ["adorar", "adoracion", "seguridad", "dependemos", "servir", "nuestra vida", "nuestra iglesia", "mi iglesia", "la vida de la iglesia"] },
    ],
    basta: 85,
    citas: ["Colosenses 2:9", "Juan 1:1", "Juan 1:14", "Hebreos 2:14-17", "Filipenses 2:5-11", "2 Corintios 5:21", "Romanos 3:25", "1 Corintios 15:17-20", "Hebreos 7:25", "1 Corintios 2:10", "Juan 15:26", "Hechos 13:2", "1 Corintios 12:7", "1 Juan 4:1-3"],
    pesoCita: 10,
    errores: [],
    modelo:
      "En mi iglesia enseñaría primero que Jesucristo es verdadero Dios y verdadero hombre: en él habita corporalmente toda la plenitud de la Deidad (Colosenses 2:9), y el Verbo fue hecho carne. Es una sola persona en dos naturalezas, como confesó Calcedonia. Corregiría el error de Arrio, que lo hace una criatura, y el docetismo, que niega su humanidad. Explicaría su obra: murió en nuestro lugar, porque Dios lo hizo pecado por nosotros (2 Corintios 5:21), resucitó corporalmente y hoy intercede por los suyos. También enseñaría que el Espíritu Santo es una persona divina, no solo una fuerza: escudriña lo profundo de Dios, habla y envía, como en Antioquía (Hechos 13:2), y procede del Padre. Sus dones siguen vigentes y se prueban por la confesión de Cristo. Estas doctrinas cambian la vida de la iglesia: adoramos a Cristo y al Espíritu con el Padre, vivimos con la seguridad de un Salvador que intercede, y servimos dependiendo del Espíritu y no de nuestras fuerzas.",
  },
};
