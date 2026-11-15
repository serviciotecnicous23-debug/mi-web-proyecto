/**
 * El banco de «Teología bíblica de las misiones» (especialidad Evangelismo y misiones, avanzada). SOLO SERVIDOR:
 * respuestas y claves. Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su
 * objetivo y su nivel de Bloom.
 * Objetivos: o1 el Dios que envía · o2 la misión en el Antiguo Testamento · o3 Jesús y las naciones · o4 el Espíritu y
 * la iglesia que envía · o5 la estrategia de Pablo · o6 la meta y cómo participar · o7 el versículo de memoria (Juan 20:21).
 * El orden de los acontecimientos del fin no se evalúa: es un punto de la declaración de fe por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `evangelismo-misiones-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_EVANGELISMO_MISIONES_3: BancoMateria = {
  materia: "evangelismo-misiones-3",
  repaso: {
    "evangelismo-misiones-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dijo Jesús resucitado en Juan 20:21?", "Como me envió el Padre, así también yo os envío", ["Quedaos en Jerusalén para siempre", "No digáis nada a nadie", "Volved a vuestras redes"], "«Como me envió el Padre, así también yo os envío».", "Juan 20:21"],
      ["1-r2", 1, "o1", "comprender", "¿Dónde empieza la misión, según la lección?", "En Dios, que ama al mundo y envía", ["En un programa de la iglesia", "En los misioneros", "En los gobiernos"], "«Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito».", "Juan 3:16"],
      ["1-r3", 1, "o1", "aplicar", "¿Qué respondió Isaías a la pregunta de Dios?", "Heme aquí, envíame a mí", ["Envía a otro", "No sé hablar", "Déjame pensarlo"], "«Heme aquí, envíame a mí».", "Isaías 6:8"],
    ] as P[]).map(p),
    "evangelismo-misiones-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué prometió Dios a Abram en Génesis 12:3?", "Que en él serían benditas todas las familias de la tierra", ["Que sería rey de Egipto", "Que nunca sufriría", "Que conquistaría todas las naciones"], "«serán benditas en ti todas las familias de la tierra».", "Génesis 12:1-3"],
      ["2-r2", 2, "o2", "comprender", "¿Cómo llama Pablo a la promesa hecha a Abraham, según Gálatas 3:8?", "La buena nueva anunciada de antemano", ["Una ley", "Un mito", "Una promesa solo para Israel"], "«dio de antemano la buena nueva a Abraham».", "Gálatas 3:8"],
      ["2-r3", 2, "o2", "aplicar", "¿Por qué huyó Jonás, según la lección?", "Porque no quería que Nínive recibiera la misericordia de Dios", ["Porque tenía miedo del mar", "Porque estaba enfermo", "Porque Dios no lo había enviado"], "El corazón de Dios es más grande que nuestros prejuicios.", "Jonás 4:1-2"],
    ] as P[]).map(p),
    "evangelismo-misiones-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué dijo Jesús antes de la gran comisión, según Mateo 28:18?", "Toda potestad me es dada en el cielo y en la tierra", ["Pronto me iré y no volveré", "Esperad sin hacer nada", "Id solo a Israel"], "«Toda potestad me es dada en el cielo y en la tierra».", "Mateo 28:18-20"],
      ["3-r2", 3, "o3", "comprender", "¿Qué quiere decir naciones en la gran comisión, según la lección?", "Pueblos con su propia lengua y su propia cultura", ["Países con fronteras", "Solo Israel", "Las grandes ciudades"], "«id, y haced discípulos a todas las naciones».", "Mateo 28:18-20"],
      ["3-r3", 3, "o3", "aplicar", "¿Desde dónde debía comenzar la predicación, según Lucas 24:47?", "Desde Jerusalén", ["Desde Roma", "Desde Atenas", "Desde Egipto"], "«en todas las naciones, comenzando desde Jerusalén».", "Lucas 24:46-48"],
    ] as P[]).map(p),
    "evangelismo-misiones-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Hasta dónde serían testigos los discípulos, según Hechos 1:8?", "Hasta lo último de la tierra", ["Solo en Jerusalén", "Solo en Judea", "Solo hasta Samaria"], "«y hasta lo último de la tierra».", "Hechos 1:8"],
      ["4-r2", 4, "o4", "comprender", "¿Quiénes llevaron el evangelio a los griegos de Antioquía?", "Creyentes comunes de Chipre y de Cirene", ["Los doce apóstoles", "Los sacerdotes del templo", "Los soldados romanos"], "«había entre ellos unos varones de Chipre y de Cirene».", "Hechos 11:19-21"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué hizo la iglesia de Antioquía antes de despedir a Bernabé y a Saulo?", "Ayunó, oró y les impuso las manos", ["Les dio un ejército", "Les prohibió ir", "Esperó a que volvieran"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:1-3"],
    ] as P[]).map(p),
    "evangelismo-misiones-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Dónde se esforzó Pablo por predicar, según Romanos 15:20?", "Donde Cristo no había sido nombrado", ["Donde ya había iglesias fuertes", "Solo en Jerusalén", "Solo entre los judíos"], "«no donde Cristo ya hubiese sido nombrado».", "Romanos 15:20-21"],
      ["5-r2", 5, "o5", "comprender", "¿Qué hizo Pablo al volver a las ciudades de su primer viaje?", "Confirmó a los discípulos y constituyó ancianos", ["Cerró las iglesias", "Recogió ofrendas para sí", "Se quedó a vivir allí"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:21-23"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué parte de la estrategia de Pablo permite que una iglesia siga sin el misionero?", "Formar líderes locales y dejarles la obra", ["Quedarse para siempre", "Mandar desde lejos sin visitar", "No formar a nadie"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:21-23"],
    ] as P[]).map(p),
    "evangelismo-misiones-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿De dónde viene la multitud que vio Juan en Apocalipsis 7:9?", "De todas naciones y tribus y pueblos y lenguas", ["Solo de Israel", "Solo de Roma", "De un solo pueblo"], "«de todas naciones y tribus y pueblos y lenguas».", "Apocalipsis 7:9-10"],
      ["6-r2", 6, "o6", "comprender", "¿Qué debemos hacer con los que viajan por el evangelio, según 3 Juan 1:8?", "Acogerlos, para cooperar con la verdad", ["Ignorarlos", "Cobrarles", "Enviarlos de vuelta"], "«Nosotros, pues, debemos acoger a tales personas, para que cooperemos con la verdad».", "3 Juan 1:5-8"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué forma de participar en la misión está a la puerta de casa?", "Recibir a los extranjeros que viven cerca", ["Viajar a otro continente", "Escribir un libro", "Ninguna"], "Los extranjeros que viven cerca son un campo misionero a la puerta de casa.", "3 Juan 1:5-8"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el Dios que envía (10)
    ["f01", 1, "o1", "recordar", "¿Qué dio Dios por amor al mundo, según Juan 3:16?", "A su Hijo unigénito", ["Una ley nueva", "Un templo", "Riquezas"], "«que ha dado a su Hijo unigénito».", "Juan 3:16"],
    ["f02", 1, "o1", "comprender", "¿Qué relación hay entre el envío del Hijo y el de la iglesia?", "Como el Padre envió al Hijo, así el Hijo envía a la iglesia", ["No hay relación", "La iglesia envía al Hijo", "El Hijo no envía a nadie"], "«Como me envió el Padre, así también yo os envío».", "Juan 20:21"],
    ["f03", 1, "o1", "recordar", "¿Qué preguntó Dios en Isaías 6:8?", "¿A quién enviaré, y quién irá por nosotros?", ["¿Quién es mi prójimo?", "¿Dónde estás?", "¿Qué haces aquí?"], "«¿A quién enviaré, y quién irá por nosotros?».", "Isaías 6:8"],
    ["f04", 1, "o1", "comprender", "¿Qué es la misión, según la lección?", "La obra de Dios en el mundo, en la que él invita a participar a su pueblo", ["Un programa anual de la iglesia", "Un viaje turístico", "Una tarea solo de los pastores"], "«Como me envió el Padre, así también yo os envío».", "Juan 20:21"],
    ["f05", 1, "o1", "comprender", "¿Qué son las misiones, en plural?", "Las formas concretas de la misión: enviar obreros, plantar iglesias, traducir la Biblia y servir", ["Las vacaciones de la iglesia", "Las reuniones de oración", "Los cargos de la iglesia"], "Las misiones son las formas concretas de la obra de Dios.", "Juan 20:21"],
    ["f06", 1, "o1", "recordar", "¿Qué dijo Jesús a sus discípulos antes de enviarlos en Juan 20:21?", "Paz a vosotros", ["Temed", "Callad", "Huid"], "«Entonces Jesús les dijo otra vez: Paz a vosotros».", "Juan 20:21"],
    ["f07", 1, "o1", "aplicar", "Un creyente dice que las misiones son un programa más de la iglesia. ¿Qué le respondes?", "Que la misión empieza en Dios, que ama al mundo y envía", ["Que tiene razón", "Que las misiones no existen", "Que solo importan los programas"], "«Porque de tal manera amó Dios al mundo».", "Juan 3:16"],
    ["f08", 1, "o1", "analizar", "¿Por qué importa que la misión empiece en Dios y no en la iglesia?", "Porque la iglesia no inventa la misión: participa en la obra de Dios", ["Porque así la iglesia no tiene que hacer nada", "Porque Dios no envía a nadie", "No importa"], "«Como me envió el Padre, así también yo os envío».", "Juan 20:21"],
    ["f09", 1, "o1", "evaluar", "¿Qué respuesta al llamado de Dios se parece más a la de Isaías?", "Ponerse a disposición de Dios para ir adonde él envíe", ["Esperar a que otro vaya", "Pedir una señal tras otra sin hacer nada", "Decir que la misión no es para mí"], "«Heme aquí, envíame a mí».", "Isaías 6:8"],
    ["f10", 1, "o7", "recordar", "Completa Juan 20:21: Entonces Jesús les dijo otra vez: Paz a vosotros…", "Como me envió el Padre, así también yo os envío", ["Quedaos aquí hasta que vuelva", "Id a vuestras casas y descansad", "No temáis, porque yo me voy"], "Es el versículo de memoria de la materia.", "Juan 20:21"],
    // ---- lección 2: la promesa a Abraham y la misión de Israel (10)
    ["f11", 2, "o2", "recordar", "¿Qué le dijo Dios a Abram en Génesis 12:1?", "Vete de tu tierra y de tu parentela", ["Quédate en tu tierra", "Construye una torre", "Vuelve a Egipto"], "«Vete de tu tierra y de tu parentela, y de la casa de tu padre».", "Génesis 12:1-3"],
    ["f12", 2, "o2", "comprender", "¿Para qué escogió Dios a Abraham, según la lección?", "Para bendecir por medio de él a todos los pueblos", ["Para que solo su familia fuera bendecida", "Para castigar a las naciones", "Para que fuera rico"], "«serán benditas en ti todas las familias de la tierra».", "Génesis 12:1-3"],
    ["f13", 2, "o2", "recordar", "¿Qué previó la Escritura, según Gálatas 3:8?", "Que Dios había de justificar por la fe a los gentiles", ["Que Israel sería destruido", "Que la ley salvaría", "Que nadie creería"], "«previendo que Dios había de justificar por la fe a los gentiles».", "Gálatas 3:8"],
    ["f14", 2, "o2", "recordar", "¿Qué sería Israel para Dios, según Éxodo 19:6?", "Un reino de sacerdotes, y gente santa", ["Un imperio", "Un pueblo sin ley", "Un ejército"], "«vosotros me seréis un reino de sacerdotes, y gente santa».", "Éxodo 19:5-6"],
    ["f15", 2, "o2", "comprender", "¿Qué debía hacer Israel como reino de sacerdotes?", "Mostrar a Dios a las naciones", ["Alejarse de todas las naciones", "Gobernar el mundo", "Guardar a Dios solo para sí"], "«porque mía es toda la tierra».", "Éxodo 19:5-6"],
    ["f16", 2, "o2", "recordar", "¿Qué le dio Dios a su Siervo, según Isaías 49:6?", "Ser luz de las naciones", ["Ser rey de Israel solamente", "Ser juez de Egipto", "Ser profeta de Babilonia"], "«también te di por luz de las naciones».", "Isaías 49:6"],
    ["f17", 2, "o2", "comprender", "¿Quiénes aplicaron Isaías 49:6 a su misión, según la lección?", "Pablo y Bernabé", ["Pedro y Juan", "Moisés y Aarón", "Elías y Eliseo"], "Lo hicieron en Hechos 13:47.", "Isaías 49:6"],
    ["f18", 2, "o2", "comprender", "¿Para qué pide el salmista la bendición de Dios en el Salmo 67?", "Para que sea conocido en la tierra su camino y en todas las naciones su salvación", ["Para que Israel sea rico", "Para vencer a los enemigos", "Para que nadie más sea bendecido"], "«Para que sea conocido en la tierra tu camino, En todas las naciones tu salvación».", "Salmos 67:1-2"],
    ["f19", 2, "o2", "analizar", "¿Qué enseña el libro de Jonás sobre la misión?", "Que la compasión de Dios alcanza aun a una ciudad enemiga", ["Que Dios solo ama a Israel", "Que hay que huir de Dios", "Que Nínive no tenía remedio"], "El corazón de Dios es más grande que nuestros prejuicios.", "Jonás 4:11"],
    ["f20", 2, "o2", "evaluar", "¿Qué afirmación resume mejor la misión en el Antiguo Testamento?", "Dios bendijo a Abraham y a Israel para que fueran bendición a todas las naciones", ["Dios se olvidó de las naciones hasta el Nuevo Testamento", "Israel debía cerrarse a los demás pueblos", "La misión empezó recién con Pablo"], "«Y haré de ti una nación grande, y te bendeciré, y engrandeceré tu nombre, y serás bendición».", "Génesis 12:1-3"],
    // ---- lección 3: Jesús y las naciones (10)
    ["f21", 3, "o3", "recordar", "¿Qué mandó Jesús en Mateo 28:19?", "Id, y haced discípulos a todas las naciones", ["Quedaos en Jerusalén", "Construid templos", "Esperad en silencio"], "«id, y haced discípulos a todas las naciones».", "Mateo 28:18-20"],
    ["f22", 3, "o3", "comprender", "¿En qué se apoya la gran comisión, según Mateo 28:18?", "En la autoridad de Cristo en el cielo y en la tierra", ["En la fuerza de la iglesia", "En el dinero de los misioneros", "En las leyes del país"], "«Toda potestad me es dada en el cielo y en la tierra».", "Mateo 28:18-20"],
    ["f23", 3, "o3", "recordar", "¿Qué promesa acompaña la gran comisión?", "Yo estoy con vosotros todos los días, hasta el fin del mundo", ["Nunca tendréis problemas", "Seréis ricos", "Os haré reyes"], "«yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:18-20"],
    ["f24", 3, "o3", "comprender", "¿Qué incluye hacer discípulos, según Mateo 28:19-20?", "Bautizarlos y enseñarles a guardar lo que Jesús mandó", ["Solo conseguir que levanten la mano", "Darles regalos", "Pedirles dinero"], "«enseñándoles que guarden todas las cosas que os he mandado».", "Mateo 28:18-20"],
    ["f25", 3, "o3", "recordar", "¿Qué debía predicarse en su nombre a todas las naciones, según Lucas 24:47?", "El arrepentimiento y el perdón de pecados", ["Una nueva ley", "La riqueza", "La venganza"], "«que se predicase en su nombre el arrepentimiento y el perdón de pecados en todas las naciones».", "Lucas 24:46-48"],
    ["f26", 3, "o3", "comprender", "¿Qué estaba escrito sobre el Cristo, según Lucas 24:46?", "Que debía padecer y resucitar al tercer día", ["Que sería rey de Roma", "Que no moriría", "Que vendría solo para Israel"], "«así fue necesario que el Cristo padeciese, y resucitase de los muertos al tercer día».", "Lucas 24:46-48"],
    ["f27", 3, "o3", "recordar", "¿Qué son los discípulos, según Lucas 24:48?", "Testigos de estas cosas", ["Jueces", "Reyes", "Espectadores"], "«Y vosotros sois testigos de estas cosas».", "Lucas 24:46-48"],
    ["f28", 3, "o3", "aplicar", "En tu región vive un pueblo indígena con su propia lengua. ¿Cómo se aplica la gran comisión?", "Hay que procurar que haya discípulos de Cristo también en ese pueblo", ["No hace falta: ya viven en un país con iglesias", "Primero deben aprender otra lengua", "La gran comisión no habla de pueblos"], "«id, y haced discípulos a todas las naciones».", "Mateo 28:18-20"],
    ["f29", 3, "o3", "analizar", "¿Por qué la gran comisión es la conclusión de la promesa a Abraham?", "Porque llevar el evangelio a todas las naciones cumple la bendición prometida a todas las familias de la tierra", ["Porque Abraham fue misionero en Roma", "No tiene relación", "Porque anula la promesa"], "«serán benditas en ti todas las familias de la tierra».", "Génesis 12:1-3"],
    ["f30", 3, "o3", "evaluar", "¿Qué iglesia obedece mejor la gran comisión?", "Una que hace discípulos que aprenden a obedecer a Cristo, también entre otros pueblos", ["Una que solo cuenta decisiones", "Una que solo cuida a los que ya tiene", "Una que piensa que es tarea de otros"], "«enseñándoles que guarden todas las cosas que os he mandado».", "Mateo 28:18-20"],
    // ---- lección 4: el Espíritu y la iglesia que envía (10)
    ["f31", 4, "o4", "recordar", "¿Qué recibirían los discípulos, según Hechos 1:8?", "Poder, cuando viniera sobre ellos el Espíritu Santo", ["Riquezas", "Un reino terrenal", "Armas"], "«pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo».", "Hechos 1:8"],
    ["f32", 4, "o4", "comprender", "¿Qué camino sigue el libro de Hechos, según la lección?", "De Jerusalén a Judea, Samaria y lo último de la tierra", ["De Roma a Jerusalén", "Solo dentro de Jerusalén", "De Egipto a Babilonia"], "«me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
    ["f33", 4, "o4", "recordar", "¿Por qué fueron esparcidos los creyentes que llegaron a Antioquía?", "Por la persecución que hubo con motivo de Esteban", ["Por una hambruna", "Por un viaje de negocios", "Por orden de los apóstoles"], "«a causa de la persecución que hubo con motivo de Esteban».", "Hechos 11:19-21"],
    ["f34", 4, "o4", "comprender", "¿Qué frontera cruzaron los creyentes en Antioquía?", "Hablaron también a los griegos, y no solo a los judíos", ["Cruzaron el mar hasta Roma", "Dejaron de predicar", "Hablaron solo a los sacerdotes"], "«hablaron también a los griegos, anunciando el evangelio del Señor Jesús».", "Hechos 11:19-21"],
    ["f35", 4, "o4", "recordar", "¿Qué pasó en Antioquía, según Hechos 11:21?", "Gran número creyó y se convirtió al Señor", ["Nadie creyó", "Los expulsaron", "Se cerró la iglesia"], "«y gran número creyó y se convirtió al Señor».", "Hechos 11:19-21"],
    ["f36", 4, "o4", "recordar", "¿Qué hacían los líderes de Antioquía cuando habló el Espíritu Santo?", "Ministraban al Señor y ayunaban", ["Discutían", "Dormían", "Viajaban"], "«Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo».", "Hechos 13:1-3"],
    ["f37", 4, "o4", "comprender", "¿A quiénes apartó el Espíritu Santo en Antioquía?", "A Bernabé y a Saulo", ["A Pedro y a Juan", "A Simón y a Lucio", "A Felipe y a Esteban"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:1-3"],
    ["f38", 4, "o4", "aplicar", "¿Qué hace una iglesia que envía con sus misioneros, además de enviarlos?", "Los sostiene con oración, comunicación y ofrendas, y celebra sus informes", ["Los olvida", "Les pide que no vuelvan", "Les cobra"], "Recibe sus informes y celebra lo que Dios hace (Hechos 14:26-27).", "Hechos 13:1-3"],
    ["f39", 4, "o4", "analizar", "¿Qué enseña que creyentes comunes llevaran el evangelio a los griegos?", "Que la misión no es solo tarea de los apóstoles o de los líderes", ["Que los apóstoles no servían", "Que los griegos no necesitaban el evangelio", "Nada"], "«hablaron también a los griegos».", "Hechos 11:19-21"],
    ["f40", 4, "o4", "evaluar", "¿Qué iglesia se parece más a Antioquía?", "Una que ora y ayuna, reconoce a los llamados, los envía y los sostiene", ["Una que guarda a sus mejores líderes para sí", "Una que no ora por las misiones", "Una que envía sin sostener"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:1-3"],
    // ---- lección 5: Pablo, el misionero (10)
    ["f41", 5, "o5", "recordar", "¿Sobre qué no quería edificar Pablo, según Romanos 15:20?", "Sobre fundamento ajeno", ["Sobre la roca", "Sobre Cristo", "Sobre la Escritura"], "«para no edificar sobre fundamento ajeno».", "Romanos 15:20-21"],
    ["f42", 5, "o5", "comprender", "¿A quiénes buscaba Pablo, según Romanos 15:21?", "A los que nunca habían oído de Cristo", ["A los que ya eran cristianos", "A los ricos", "A los gobernantes"], "«Y los que nunca han oído de él, entenderán».", "Romanos 15:20-21"],
    ["f43", 5, "o5", "recordar", "¿Qué decía Pablo a los discípulos al confirmarlos, según Hechos 14:22?", "Que a través de muchas tribulaciones entremos en el reino de Dios", ["Que nunca sufrirían", "Que debían volver atrás", "Que pronto serían ricos"], "«Es necesario que a través de muchas tribulaciones entremos en el reino de Dios».", "Hechos 14:21-23"],
    ["f44", 5, "o5", "comprender", "¿Qué tres acciones resumen el trabajo de Pablo en su primer viaje?", "Plantar, fortalecer y dejar líderes", ["Visitar, cobrar y partir", "Construir, vender y volver", "Predicar, castigar y gobernar"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:21-23"],
    ["f45", 5, "o5", "recordar", "¿Qué dice Pablo en 1 Corintios 9:19?", "Que se hizo siervo de todos para ganar a mayor número", ["Que era dueño de todos", "Que no servía a nadie", "Que solo servía a los judíos"], "«me he hecho siervo de todos para ganar a mayor número».", "1 Corintios 9:19"],
    ["f46", 5, "o5", "aplicar", "¿Por qué Pablo empezaba en ciudades importantes?", "Porque desde allí el evangelio se extendía a toda la región", ["Porque eran más cómodas", "Porque allí no había peligro", "Por casualidad"], "Así pasó en Hechos 19:10.", "Hechos 19:10"],
    ["f47", 5, "o5", "aplicar", "¿Con quiénes trabajó Pablo en equipo, según la lección?", "Con Bernabé, Silas, Timoteo, Priscila y Aquila", ["Siempre solo", "Con los sacerdotes del templo", "Con los soldados romanos"], "La misión no se hace en solitario.", "Hechos 14:21-23"],
    ["f48", 5, "o5", "aplicar", "¿Cómo seguía Pablo cuidando a las iglesias?", "Con visitas y cartas", ["No las cuidaba", "Solo con dinero", "Mandando soldados"], "Llevaba la preocupación por todas las iglesias (2 Corintios 11:28).", "Hechos 14:21-23"],
    ["f49", 5, "o5", "analizar", "¿Qué hizo Pablo al terminar su primer viaje, y qué enseña eso?", "Volvió a Antioquía y contó lo que Dios había hecho: el misionero rinde cuentas a la iglesia que lo envía", ["Se quedó lejos sin avisar a nadie", "Fundó otra iglesia y olvidó a Antioquía", "Dejó la obra"], "Lo cuenta Hechos 14:26-27.", "Hechos 14:21-23"],
    ["f50", 5, "o5", "evaluar", "¿Qué misión sigue mejor el ejemplo de Pablo?", "Una que planta iglesias donde Cristo no es conocido, forma líderes locales y sigue cuidándolas", ["Una que se queda para siempre y no forma líderes", "Una que va solo adonde ya hay muchas iglesias", "Una que cambia el evangelio para encajar"], "«no donde Cristo ya hubiese sido nombrado».", "Romanos 15:20-21"],
    // ---- lección 6: toda nación, tribu y lengua (10)
    ["f51", 6, "o6", "recordar", "¿Qué clamaba la multitud de Apocalipsis 7:10?", "La salvación pertenece a nuestro Dios que está sentado en el trono, y al Cordero", ["La victoria es de los fuertes", "Nadie puede ser salvo", "La salvación es por nuestras obras"], "«La salvación pertenece a nuestro Dios que está sentado en el trono, y al Cordero».", "Apocalipsis 7:9-10"],
    ["f52", 6, "o6", "comprender", "¿Cuál es la meta de la misión, según la lección?", "Adoradores de Cristo de todos los pueblos", ["Iglesias grandes en pocos países", "Una sola cultura para todos", "Muchos edificios"], "«una gran multitud, la cual nadie podía contar, de todas naciones y tribus y pueblos y lenguas».", "Apocalipsis 7:9-10"],
    ["f53", 6, "o6", "recordar", "¿Con qué nos redimió el Cordero, según Apocalipsis 5:9?", "Con su sangre", ["Con oro", "Con la ley", "Con nuestras obras"], "«con tu sangre nos has redimido para Dios».", "Apocalipsis 5:9"],
    ["f54", 6, "o6", "recordar", "¿A quién elogió Juan por recibir a los hermanos que viajaban por el evangelio?", "A Gayo", ["A Diótrefes", "A Pedro", "A Tito"], "«Amado, fielmente te conduces cuando prestas algún servicio a los hermanos».", "3 Juan 1:5-8"],
    ["f55", 6, "o6", "comprender", "¿Para qué acogemos a los que viajan por el evangelio, según 3 Juan 1:8?", "Para cooperar con la verdad", ["Para recibir algo a cambio", "Para que nos alaben", "Por obligación legal"], "«para que cooperemos con la verdad».", "3 Juan 1:5-8"],
    ["f56", 6, "o6", "recordar", "¿Qué iglesia participó con Pablo en razón de dar y recibir al principio?", "La de Filipos", ["La de Corinto", "La de Jerusalén", "La de Roma"], "«ninguna iglesia participó conmigo en razón de dar y recibir, sino vosotros solos».", "Filipenses 4:15-16"],
    ["f57", 6, "o6", "aplicar", "No puedes viajar como misionero. ¿Cómo participas en la misión?", "Orando, enviando y sosteniendo, dando y recibiendo a los extranjeros que viven cerca", ["No puedes participar", "Solo mirando videos", "Esperando a ser rico"], "«Nosotros, pues, debemos acoger a tales personas, para que cooperemos con la verdad».", "3 Juan 1:5-8"],
    ["f58", 6, "o6", "recordar", "¿Dónde y cuándo se celebró el primer Congreso Misionero Iberoamericano (COMIBAM)?", "En São Paulo, Brasil, en 1987", ["En Modesto, California, en 1948", "En Lausana, Suiza, en 1974", "En Antioquía, en el siglo I"], "Animó a las iglesias de habla hispana y portuguesa a ser también fuerza misionera.", "Apocalipsis 7:9-10"],
    ["f59", 6, "o6", "analizar", "¿Qué cambio animó COMIBAM en las iglesias de América Latina?", "Pasar de ser campo misionero a ser también fuerza misionera", ["Dejar de enviar misioneros", "Recibir solo misioneros extranjeros", "Cerrarse a otras culturas"], "Durante mucho tiempo, América Latina recibió misioneros de otros continentes.", "Apocalipsis 7:9-10"],
    ["f60", 6, "o6", "evaluar", "¿Qué iglesia participa mejor en la misión de Dios?", "Una que ora por los pueblos, envía y sostiene misioneros, da y recibe a los extranjeros", ["Una que espera que otros continentes envíen", "Una que solo ora una vez al año", "Una que piensa que la misión es solo para los misioneros"], "«con tu sangre nos has redimido para Dios, de todo linaje y lengua y pueblo y nación».", "Apocalipsis 5:9"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿A quién dio Dios por amor al mundo, según Juan 3:16?", "A su Hijo unigénito", ["A un ángel", "A Moisés", "A un rey"], "«que ha dado a su Hijo unigénito».", "Juan 3:16"],
      ["m1-02", 1, "o1", "comprender", "¿Cuál es la diferencia entre la misión y las misiones?", "La misión es la obra de Dios; las misiones son sus formas concretas", ["No hay diferencia", "Las misiones son de Dios y la misión es de la iglesia", "La misión es solo viajar"], "Las misiones son enviar obreros, plantar iglesias, traducir la Biblia y servir.", "Juan 20:21"],
      ["m1-03", 1, "o1", "aplicar", "Sientes que Dios te llama a servir entre otro pueblo. ¿Qué respuesta modela Isaías?", "Ponerse a disposición: heme aquí, envíame a mí", ["Esperar a que el llamado pase", "Pedir que vaya otro", "Ignorarlo"], "«Heme aquí, envíame a mí».", "Isaías 6:8"],
      ["m1-04", 1, "o1", "recordar", "¿Quién dijo: Como me envió el Padre, así también yo os envío?", "Jesús resucitado", ["Pablo", "Pedro", "Isaías"], "«Como me envió el Padre, así también yo os envío».", "Juan 20:21"],
      ["m1-05", 1, "o1", "analizar", "¿Qué muestra Juan 3:16 sobre el motivo de la misión?", "Que la misión nace del amor de Dios por el mundo", ["Que nace del deseo de poder", "Que nace del miedo", "Que nace de una tradición"], "«Porque de tal manera amó Dios al mundo».", "Juan 3:16"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué frase expresa mejor el corazón de esta materia?", "La misión empieza en Dios, y él invita a su pueblo a participar", ["La misión empieza cuando la iglesia tiene dinero", "La misión es solo para especialistas", "La misión terminó con los apóstoles"], "«Como me envió el Padre, así también yo os envío».", "Juan 20:21"],
      ["m1-07", 2, "o2", "recordar", "¿Qué haría Dios con Abram, según Génesis 12:2?", "Haría de él una nación grande y lo bendeciría", ["Lo dejaría solo", "Lo haría rey de Egipto", "Lo castigaría"], "«Y haré de ti una nación grande, y te bendeciré».", "Génesis 12:1-3"],
      ["m1-08", 2, "o2", "comprender", "¿Qué dice Éxodo 19:5 de toda la tierra?", "Que es de Dios", ["Que es de Israel", "Que no importa", "Que es de los reyes"], "«porque mía es toda la tierra».", "Éxodo 19:5-6"],
      ["m1-09", 2, "o2", "aplicar", "Tu iglesia ha sido muy bendecida. ¿Qué enseña la promesa a Abraham?", "Que Dios la bendice para que sea bendición a otros", ["Que la bendición es solo para disfrutarla", "Que no debe compartir nada", "Que la bendición es un premio a sus méritos"], "«y te bendeciré, y engrandeceré tu nombre, y serás bendición».", "Génesis 12:1-3"],
      ["m1-10", 2, "o2", "recordar", "¿Hasta dónde llegaría la salvación por medio del Siervo, según Isaías 49:6?", "Hasta lo postrero de la tierra", ["Solo hasta Jerusalén", "Solo a Israel", "Hasta Egipto"], "«para que seas mi salvación hasta lo postrero de la tierra».", "Isaías 49:6"],
      ["m1-11", 2, "o2", "analizar", "¿Qué relación hay entre Génesis 12:3 y Gálatas 3:8?", "Pablo enseña que la promesa a Abraham anunciaba el evangelio para todas las naciones", ["Se contradicen", "No tienen relación", "Gálatas anula la promesa"], "«En ti serán benditas todas las naciones».", "Gálatas 3:8"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué actitud hacia otro pueblo refleja mejor la compasión de Dios en Jonás?", "Desear que también ellos reciban la misericordia de Dios", ["Desear que sean castigados", "Ignorarlos", "Pensar que no tienen remedio"], "El corazón de Dios es más grande que nuestros prejuicios.", "Jonás 4:11"],
      ["m1-13", 3, "o3", "recordar", "¿Cuánto tiempo prometió Jesús estar con los suyos, según Mateo 28:20?", "Todos los días, hasta el fin del mundo", ["Solo cuarenta días", "Hasta que terminaran la tarea", "Solo los domingos"], "«yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:18-20"],
      ["m1-14", 3, "o3", "comprender", "¿Qué horizonte tiene la misión, según Mateo 24:14?", "Que el evangelio sea predicado en todo el mundo, para testimonio a todas las naciones", ["Predicar solo en el propio país", "Esperar sin predicar", "Predicar solo a los que ya creen"], "«será predicado este evangelio del reino en todo el mundo, para testimonio a todas las naciones».", "Mateo 24:14"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué significa para tu iglesia la palabra naciones en la gran comisión?", "Buscar que haya discípulos en cada pueblo, con su lengua y su cultura", ["Solo enviar misioneros a otros países", "Solo trabajar con su propio grupo", "Nada: es una palabra antigua"], "«id, y haced discípulos a todas las naciones».", "Mateo 28:18-20"],
      ["m1-16", 3, "o3", "recordar", "¿En nombre de quién se predica el arrepentimiento y el perdón, según Lucas 24:47?", "En el nombre de Cristo", ["En el nombre de Moisés", "En el nombre de la iglesia", "En el nombre del evangelista"], "«que se predicase en su nombre el arrepentimiento y el perdón de pecados».", "Lucas 24:46-48"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué esta materia no enseña el orden de los acontecimientos del fin?", "Porque es un punto de la declaración de fe del ministerio por confirmar", ["Porque la Biblia no habla del fin", "Porque no importa", "Porque solo lo saben los pastores"], "Aquí se estudia la tarea que Jesús dio a su iglesia.", "Mateo 24:14"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué resume mejor la gran comisión?", "Con la autoridad de Cristo y su presencia, hacer discípulos de todos los pueblos", ["Conseguir decisiones rápidas", "Ganar discusiones con otras religiones", "Construir edificios"], "«Toda potestad me es dada en el cielo y en la tierra».", "Mateo 28:18-20"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Dónde comenzaría el testimonio, según Hechos 1:8?", "En Jerusalén", ["En Roma", "En Atenas", "En Antioquía"], "«me seréis testigos en Jerusalén».", "Hechos 1:8"],
      ["m2-02", 4, "o4", "comprender", "¿Quién apartó a Bernabé y a Saulo para la obra?", "El Espíritu Santo", ["El concilio de Jerusalén", "Pedro", "El emperador"], "«dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo».", "Hechos 13:1-3"],
      ["m2-03", 4, "o4", "aplicar", "Un joven de tu iglesia siente el llamado a las misiones. ¿Qué haría una iglesia como Antioquía?", "Orar, reconocer el llamado, prepararlo, enviarlo con respaldo y sostenerlo", ["Desanimarlo", "Dejarlo ir solo, sin apoyo", "Pedirle que espere veinte años"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:1-3"],
      ["m2-04", 4, "o4", "recordar", "¿De dónde eran los varones que hablaron a los griegos en Antioquía?", "De Chipre y de Cirene", ["De Roma y de Atenas", "De Egipto y de Babilonia", "De Galilea y de Judea"], "«había entre ellos unos varones de Chipre y de Cirene».", "Hechos 11:19-21"],
      ["m2-05", 4, "o4", "analizar", "¿Qué papel tiene el Espíritu Santo en la misión, según Hechos?", "Da poder para ser testigos y guía a la iglesia a enviar", ["Ninguno", "Solo consuela a los que se quedan", "Reemplaza a los misioneros"], "«recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo».", "Hechos 1:8"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué muestra mejor que una iglesia es misionera?", "Que envía y sostiene a los que Dios llama", ["Que tiene un edificio grande", "Que habla de misiones sin enviar a nadie", "Que solo recibe misioneros"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:1-3"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hizo Pablo en la ciudad después de anunciar el evangelio, según Hechos 14:21?", "Hizo muchos discípulos", ["Solo contó a los que escuchaban", "Se fue sin volver", "Pidió dinero"], "«después de anunciar el evangelio a aquella ciudad y de hacer muchos discípulos».", "Hechos 14:21-23"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué Pablo no quería edificar sobre fundamento ajeno?", "Porque buscaba a los que nunca habían oído de Cristo", ["Porque no quería trabajar con otros", "Porque era orgulloso", "Porque no le gustaban las iglesias"], "«Aquellos a quienes nunca les fue anunciado acerca de él, verán».", "Romanos 15:20-21"],
      ["m2-09", 5, "o5", "aplicar", "Tu iglesia plantó un grupo en otro barrio. ¿Qué paso de Pablo debe seguir?", "Formar líderes locales y seguir cuidándolos con visitas", ["Dejarlo solo enseguida", "Controlarlo para siempre", "Cerrarlo si no crece rápido"], "«Y constituyeron ancianos en cada iglesia».", "Hechos 14:21-23"],
      ["m2-10", 5, "o5", "recordar", "¿Qué hicieron Pablo y Bernabé al constituir ancianos, según Hechos 14:23?", "Oraron con ayunos y los encomendaron al Señor", ["Les cobraron", "Se quedaron a gobernar", "Los dejaron sin orar"], "«habiendo orado con ayunos, los encomendaron al Señor en quien habían creído».", "Hechos 14:21-23"],
      ["m2-11", 5, "o5", "analizar", "¿Qué relación hay entre 1 Corintios 9:19 y la estrategia de Pablo?", "Se adaptaba como siervo de todos para ganar a más, sin cambiar el evangelio", ["Cambiaba el evangelio en cada ciudad", "Servía solo a los poderosos", "No tiene relación"], "«me he hecho siervo de todos para ganar a mayor número».", "1 Corintios 9:19"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué plan misionero se parece más al de Pablo?", "Ir donde Cristo no es conocido, trabajar en equipo, formar líderes y rendir cuentas a la iglesia que envía", ["Ir solo y sin rendir cuentas", "Quedarse siempre en el mismo lugar", "Hacer un viaje corto sin seguimiento"], "«no donde Cristo ya hubiese sido nombrado».", "Romanos 15:20-21"],
      ["m2-13", 6, "o6", "recordar", "¿Qué tenían en las manos los de la gran multitud, según Apocalipsis 7:9?", "Palmas", ["Espadas", "Coronas de oro", "Libros"], "«vestidos de ropas blancas, y con palmas en las manos».", "Apocalipsis 7:9-10"],
      ["m2-14", 6, "o6", "comprender", "¿De quiénes redimió el Cordero, según Apocalipsis 5:9?", "De todo linaje y lengua y pueblo y nación", ["Solo de Israel", "Solo de los ricos", "De un solo pueblo"], "«de todo linaje y lengua y pueblo y nación».", "Apocalipsis 5:9"],
      ["m2-15", 6, "o6", "aplicar", "Llega a tu barrio una familia de otro país. ¿Cómo participas en la misión?", "Recibiéndola con amor, ayudándola y compartiendo a Cristo", ["Ignorándola", "Esperando que se vaya", "Dejando que otro lo haga"], "«Nosotros, pues, debemos acoger a tales personas».", "3 Juan 1:5-8"],
      ["m2-16", 6, "o6", "recordar", "¿Qué teólogo peruano ha escrito sobre el tiempo de misión desde América Latina, según la lección?", "Samuel Escobar", ["Orlando E. Costas", "Justo L. González", "Billy Graham"], "Escribió Tiempo de misión.", "Apocalipsis 7:9-10"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué los que dan y los que van comparten la misma obra?", "Porque los que sostienen participan en la misión, como los filipenses con Pablo", ["Porque dar reemplaza a ir", "Porque ir no hace falta", "No la comparten"], "«en razón de dar y recibir».", "Filipenses 4:15-16"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué visión de la misión es la más bíblica?", "Una multitud de todos los pueblos que adora al Cordero, alcanzada con la participación de todos", ["Una iglesia grande en una sola ciudad", "Una cultura que se impone a las demás", "Unos pocos especialistas que hacen todo"], "«una gran multitud, la cual nadie podía contar».", "Apocalipsis 7:9-10"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "evangelismo-misiones-3-e1",
      tipo: "corta",
      pregunta: "Explica por qué se dice que la misión empieza en Dios, con Juan 3:16 y Juan 20:21.",
      ideas: [
        { id: "amor", peso: 25, texto: "Nace del amor de Dios por el mundo.", formas: ["amor", "amo al mundo", "de tal manera"] },
        { id: "envia", peso: 30, texto: "El Padre envía al Hijo, y el Hijo envía a la iglesia.", formas: ["envio al hijo", "envia", "envio", "enviados", "os envio"] },
        { id: "participa", peso: 20, texto: "La iglesia no inventa la misión: participa en ella.", formas: ["particip*", "obra de dios", "invita"] },
        { id: "misiones", peso: 15, texto: "Las misiones son sus formas concretas.", formas: ["misiones", "formas concretas", "plantar", "traducir"] },
      ],
      citas: ["Juan 3:16", "Juan 20:21", "Isaías 6:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La misión empieza en Dios porque nace de su amor: de tal manera amó al mundo que dio a su Hijo (Juan 3:16). El Padre envió al Hijo, y Jesús envía a la iglesia: como me envió el Padre, así os envío. La iglesia no inventa la misión, sino que participa en ella; las misiones son sus formas concretas.",
    },
    {
      id: "evangelismo-misiones-3-e2",
      tipo: "corta",
      pregunta: "Explica cómo aparece la misión de Dios en el Antiguo Testamento, con dos ejemplos.",
      ideas: [
        { id: "general", peso: 25, texto: "Desde Génesis, Dios piensa en todas las naciones.", formas: ["todas las naciones", "todas las familias", "todos los pueblos"] },
        { id: "abraham", peso: 25, texto: "La promesa a Abraham.", formas: ["abraham", "abram", "benditas"] },
        { id: "israel", peso: 20, texto: "Israel, reino de sacerdotes.", formas: ["reino de sacerdotes", "sacerdotes"] },
        { id: "siervo", peso: 20, texto: "El Siervo, luz de las naciones.", formas: ["luz de las naciones", "siervo"] },
        { id: "salmo", peso: 15, texto: "El Salmo 67.", formas: ["salmo", "salmos", "sea conocido"] },
        { id: "jonas", peso: 20, texto: "Jonás y la compasión por Nínive.", formas: ["jonas", "ninive"] },
      ],
      basta: 80,
      citas: ["Génesis 12:1-3", "Génesis 12:3", "Gálatas 3:8", "Éxodo 19:5-6", "Isaías 49:6", "Salmos 67:1-2", "Jonás 4:11", "Jonás 4:1-2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Desde Génesis, Dios piensa en todas las naciones. Prometió a Abraham que en él serían benditas todas las familias de la tierra (Génesis 12:3), y Pablo lo llama el evangelio anunciado de antemano. Además, en Jonás, Dios muestra compasión por Nínive, una ciudad enemiga: su corazón alcanza también a otros pueblos.",
    },
    {
      id: "evangelismo-misiones-3-e3",
      tipo: "corta",
      pregunta: "Explica cómo llegó a ser Antioquía una iglesia que envía y qué puede aprender de ella una iglesia local.",
      ideas: [
        { id: "comunes", peso: 20, texto: "Creyentes comunes llevaron el evangelio a los griegos.", formas: ["griegos", "creyentes comunes", "chipre", "cirene", "esparcidos"] },
        { id: "espiritu", peso: 25, texto: "El Espíritu Santo apartó a Bernabé y a Saulo.", formas: ["espiritu santo", "apartadme", "bernabe", "saulo"] },
        { id: "envio", peso: 25, texto: "Ayunaron, oraron, impusieron las manos y los enviaron.", formas: ["ayun*", "impusieron las manos", "despidieron", "enviaron"] },
        { id: "aprender", peso: 20, texto: "La iglesia local ora, reconoce, envía y sostiene.", formas: ["sosten*", "reconoc*", "ofrendas", "informes"] },
      ],
      citas: ["Hechos 11:19-21", "Hechos 13:1-3", "Hechos 13:3", "Hechos 14:26-27", "Hechos 1:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En Antioquía, creyentes comunes de Chipre y de Cirene hablaron también a los griegos, y muchos creyeron. Mientras la iglesia ministraba y ayunaba, el Espíritu Santo apartó a Bernabé y a Saulo, y ellos, habiendo ayunado y orado, les impusieron las manos y los enviaron (Hechos 13:3). Hoy una iglesia puede orar, reconocer a los llamados, enviarlos y sostenerlos.",
    },
    {
      id: "evangelismo-misiones-3-e4",
      tipo: "breve",
      pregunta:
        "Explica el plan de la misión de Dios en toda la Biblia: desde la promesa a Abraham hasta la multitud de Apocalipsis, pasando por Israel, Jesús, Hechos y Pablo. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "abraham", peso: 20, texto: "La promesa a Abraham.", formas: ["abraham", "abram", "benditas", "todas las familias"] },
        { id: "israel", peso: 15, texto: "Israel y los profetas.", formas: ["reino de sacerdotes", "luz de las naciones", "jonas", "siervo"] },
        { id: "jesus", peso: 20, texto: "Jesús y la gran comisión.", formas: ["gran comision", "hacer discipulos", "haced discipulos", "todas las naciones", "me envio"] },
        { id: "hechos", peso: 15, texto: "El Espíritu y la iglesia en Hechos.", formas: ["espiritu santo", "antioquia", "testigos"] },
        { id: "pablo", peso: 15, texto: "La estrategia de Pablo.", formas: ["pablo", "nombrado", "fundamento ajeno", "ancianos", "lideres locales"] },
        { id: "meta", peso: 15, texto: "La meta: todos los pueblos ante el Cordero.", formas: ["multitud", "cordero", "tribus", "lenguas"] },
      ],
      basta: 85,
      citas: ["Génesis 12:1-3", "Génesis 12:3", "Gálatas 3:8", "Éxodo 19:5-6", "Isaías 49:6", "Salmos 67:1-2", "Juan 3:16", "Juan 20:21", "Mateo 28:18-20", "Lucas 24:46-48", "Hechos 1:8", "Hechos 11:19-21", "Hechos 13:1-3", "Romanos 15:20-21", "Hechos 14:21-23", "Apocalipsis 7:9", "Apocalipsis 7:9-10", "Apocalipsis 5:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La misión de Dios recorre toda la Biblia. Empieza con la promesa a Abraham: en él serían benditas todas las familias de la tierra (Génesis 12:3), y Pablo dice que esa promesa era el evangelio anunciado de antemano. Dios llamó a Israel a ser un reino de sacerdotes, y su Siervo sería luz de las naciones; aun en Jonás vemos su compasión por una ciudad enemiga. En Jesús la misión llega a su centro: el Padre lo envió, y él envía a la iglesia; con toda autoridad mandó hacer discípulos a todas las naciones, es decir, a todos los pueblos, y prometió estar con nosotros todos los días (Mateo 28:18-20). En Hechos, el Espíritu Santo da poder para ser testigos desde Jerusalén hasta lo último de la tierra, y la iglesia de Antioquía envía a Bernabé y a Saulo. Pablo predicó donde Cristo no había sido nombrado, plantó iglesias y dejó ancianos en cada una. La meta es la gran multitud de Apocalipsis 7:9, de todas naciones, tribus, pueblos y lenguas, que adora a Dios y al Cordero. Por eso hoy todos participamos: orando, yendo, enviando, dando y recibiendo.",
    },
    {
      id: "evangelismo-misiones-3-e5",
      tipo: "breve",
      pregunta:
        "Un hermano dice que su iglesia no debe pensar en misiones porque es pequeña y pobre, y porque eso les toca a los países ricos. Respóndele con base bíblica: qué enseña la Biblia sobre la misión y cómo puede participar una iglesia pequeña. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "todos", peso: 25, texto: "La misión es de Dios y de toda la iglesia, no solo de los ricos.", formas: ["toda la iglesia", "todos los creyentes", "cada creyente", "cada iglesia", "creyentes comunes", "no solo"], negativa: true },
        { id: "ejemplo", peso: 20, texto: "Antioquía o los filipenses.", formas: ["antioquia", "filipenses", "dar y recibir"] },
        { id: "formas", peso: 25, texto: "Orar, enviar, dar y recibir a los extranjeros.", formas: ["orar", "enviar", "sostener", "ofrenda", "extranjeros", "acoger", "recibir"] },
        { id: "latina", peso: 15, texto: "Las iglesias de América Latina también envían.", formas: ["comibam", "america latina", "fuerza misionera"] },
        { id: "meta", peso: 15, texto: "La meta: todos los pueblos.", formas: ["todos los pueblos", "todas las naciones", "multitud", "cordero"] },
      ],
      basta: 85,
      citas: ["Juan 20:21", "Hechos 13:1-3", "Hechos 11:19-21", "Filipenses 4:15-16", "3 Juan 1:5-8", "3 Juan 1:8", "Apocalipsis 7:9-10", "Apocalipsis 7:9", "Mateo 28:18-20", "Hechos 1:8"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Entiendo la preocupación, pero la Biblia muestra que la misión es de Dios y de toda la iglesia, no solo de los países ricos. Jesús resucitado dijo a sus discípulos, que no eran ricos ni poderosos: Como me envió el Padre, así también yo os envío (Juan 20:21). En Antioquía, creyentes comunes llevaron el evangelio a los griegos, y esa iglesia envió a Bernabé y a Saulo después de orar y ayunar (Hechos 13:1-3). Los filipenses fueron los únicos que, al principio, participaron con Pablo en razón de dar y recibir (Filipenses 4:15-16). Además, desde COMIBAM, en 1987, muchas iglesias de América Latina se animaron a pasar de ser campo misionero a ser también fuerza misionera. Una iglesia pequeña puede orar cada semana por un pueblo que no conoce a Cristo, sostener con una ofrenda mensual a un misionero, recibir con amor a los extranjeros del barrio y preparar a quien Dios llame. La meta es una multitud de todas las naciones que adora al Cordero, y cada iglesia tiene un lugar en esa obra.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras)
  breve: {
    id: "evangelismo-misiones-3-b1",
    tipo: "breve",
    pregunta:
      "Escribe un plan de un año para que tu iglesia o tu grupo participe en la misión de Dios: cómo orarán, a qué pueblo o a quién apoyarán, cómo enviarán o sostendrán, cómo darán, cómo recibirán a los extranjeros y cómo enseñarán la base bíblica de la misión. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "orar", peso: 20, texto: "Cómo orarán.", formas: ["oraremos", "orar", "oracion", "orando"] },
      { id: "pueblo", peso: 15, texto: "A qué pueblo o a quién apoyarán.", formas: ["pueblo", "misionera", "misionero", "nacion"] },
      { id: "enviar", peso: 20, texto: "Cómo enviarán o sostendrán.", formas: ["enviar", "enviaremos", "sosten*", "apoyaremos", "apoyar"] },
      { id: "dar", peso: 15, texto: "Cómo darán.", formas: ["ofrenda*", "daremos", "presupuesto"] },
      { id: "recibir", peso: 15, texto: "Cómo recibirán a los extranjeros.", formas: ["extranjeros", "inmigrantes", "recibiremos", "acoger"] },
      { id: "ensenar", peso: 15, texto: "Cómo enseñarán la base bíblica.", formas: ["enseñar*", "estudios", "estudio", "base biblica", "serie"] },
    ],
    basta: 85,
    citas: ["Juan 20:21", "Filipenses 4:15-16", "3 Juan 1:8", "3 Juan 1:5-8", "Hechos 13:1-3", "Apocalipsis 7:9", "Apocalipsis 7:9-10", "Mateo 9:38", "Génesis 12:3", "Mateo 28:18-20"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Nuestro grupo de jóvenes participará este año en la misión de Dios, porque Jesús nos envía como el Padre lo envió a él (Juan 20:21). Primero, oraremos: cada viernes dedicaremos diez minutos a orar por un pueblo que no conoce a Cristo y por una familia misionera de nuestra denominación, y cada mes leeremos sus noticias. Segundo, apoyaremos a esa familia misionera: le escribiremos cada mes y la sostendremos con una ofrenda mensual que separaremos de nuestro presupuesto, como los filipenses, que participaron con Pablo en razón de dar y recibir (Filipenses 4:15-16). Tercero, si alguno siente el llamado a ir, lo acompañaremos en oración y le ayudaremos a prepararse, como la iglesia de Antioquía con Bernabé y Saulo. Cuarto, recibiremos a los extranjeros de nuestro barrio: organizaremos una comida cada trimestre e invitaremos a las familias inmigrantes, porque debemos acoger a otros para cooperar con la verdad (3 Juan 1:8). Quinto, enseñaremos la base bíblica de la misión con una serie de seis estudios, de Abraham a Apocalipsis 7:9. Al terminar el año evaluaremos lo que hicimos y lo que Dios hizo.",
  },
};
