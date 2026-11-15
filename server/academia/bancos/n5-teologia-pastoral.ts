/**
 * El banco de «Teología pastoral» (Nivel 5). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el buen pastor y el llamado · o2 la vida del pastor con Dios · o3 el pastor y su familia ·
 * o4 apacentar con la Palabra · o5 cuidar y visitar al rebaño · o6 acompañar en las crisis y terminar bien ·
 * o7 el versículo de memoria (Juan 10:11). Quién puede ejercer el pastorado no se evalúa aquí: es un punto de la
 * declaración de fe por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n5-teologia-pastoral-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N5_TEOLOGIA_PASTORAL: BancoMateria = {
  materia: "n5-teologia-pastoral",
  repaso: {
    "n5-teologia-pastoral-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dice Jesús del buen pastor en Juan 10:11?", "Que su vida da por las ovejas", ["Que vive de las ovejas", "Que manda sobre las ovejas sin cuidarlas", "Que deja a las ovejas cuando hay peligro"], "«Yo soy el buen pastor; el buen pastor su vida da por las ovejas».", "Juan 10:11"],
      ["1-r2", 1, "o1", "comprender", "¿De quién es la grey que cuida el pastor, según 1 Pedro 5:2?", "De Dios", ["Del pastor", "De la denominación", "De los que más dan"], "«Apacentad la grey de Dios que está entre vosotros».", "1 Pedro 5:2"],
      ["1-r3", 1, "o1", "comprender", "¿Qué tres nombres reciben en el Nuevo Testamento los que cuidan la iglesia?", "Ancianos, obispos y pastores", ["Reyes, sacerdotes y jueces", "Profetas, escribas y levitas", "Tribunos, cónsules y senadores"], "Pablo llama ancianos a los líderes de Éfeso y les dice que el Espíritu los puso por obispos para apacentar la iglesia.", "Hechos 20:28"],
    ] as P[]).map(p),
    "n5-teologia-pastoral-2": ([
      ["2-r1", 2, "o2", "recordar", "¿En qué dos cosas persistirían los apóstoles, según Hechos 6:4?", "En la oración y en el ministerio de la palabra", ["En la administración y las finanzas", "En los viajes y las reuniones", "En la política y los negocios"], "«Y nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
      ["2-r2", 2, "o2", "recordar", "¿Qué hacía Jesús muy de mañana, según Marcos 1:35?", "Se iba a un lugar desierto a orar", ["Se reunía con los fariseos", "Preparaba la comida de los discípulos", "Viajaba a Jerusalén"], "«salió y se fue a un lugar desierto, y allí oraba».", "Marcos 1:35"],
      ["2-r3", 2, "o2", "comprender", "¿Qué dijo Jesús a los apóstoles cansados, según Marcos 6:31?", "Que vinieran aparte a un lugar desierto y descansaran un poco", ["Que trabajaran más", "Que no se quejaran", "Que se fueran a sus casas para siempre"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ] as P[]).map(p),
    "n5-teologia-pastoral-3": ([
      ["3-r1", 3, "o3", "comprender", "¿Qué pregunta Pablo en 1 Timoteo 3:5?", "Cómo cuidará de la iglesia de Dios el que no sabe gobernar su propia casa", ["Cuánto dinero tiene el pastor", "Cuántos hijos debe tener el pastor", "Dónde debe vivir el pastor"], "«pues el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?».", "1 Timoteo 3:5"],
      ["3-r2", 3, "o3", "recordar", "¿Qué dijo Josué delante del pueblo, según Josué 24:15?", "Yo y mi casa serviremos a Jehová", ["Yo solo serviré a Jehová", "Mi casa servirá a otros dioses", "Que cada uno decida sin Dios"], "«pero yo y mi casa serviremos a Jehová».", "Josué 24:15"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué no debe hacer el pastor con lo que le confían en la consejería?", "Cargar a su familia con esos problemas", ["Orar por esas personas", "Guardar la confidencialidad", "Buscar ayuda si hay peligro"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ] as P[]).map(p),
    "n5-teologia-pastoral-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué le encargó Jesús a Pedro en Juan 21?", "Apacentar sus ovejas", ["Pescar más", "Construir un templo", "Volver a Galilea"], "«Apacienta mis ovejas».", "Juan 21:17"],
      ["4-r2", 4, "o4", "recordar", "¿Qué encargó Pablo a Timoteo en 2 Timoteo 4:2?", "Que predicara la palabra a tiempo y fuera de tiempo", ["Que escribiera libros", "Que evitara predicar", "Que solo predicara en las fiestas"], "«que prediques la palabra; que instes a tiempo y fuera de tiempo».", "2 Timoteo 4:2"],
      ["4-r3", 4, "o4", "comprender", "¿Para qué puso el Espíritu Santo por obispos a los ancianos de Éfeso, según Hechos 20:28?", "Para apacentar la iglesia del Señor", ["Para gobernar la ciudad", "Para cobrar los diezmos", "Para escribir leyes nuevas"], "«para apacentar la iglesia del Señor, la cual él ganó por su propia sangre».", "Hechos 20:28"],
    ] as P[]).map(p),
    "n5-teologia-pastoral-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué reprochó Dios a los pastores de Israel en Ezequiel 34:4?", "Que no fortalecieron a las débiles ni buscaron a la perdida", ["Que cuidaban demasiado a las ovejas", "Que oraban mucho", "Que visitaban a los enfermos"], "«No fortalecisteis las débiles, ni curasteis la enferma».", "Ezequiel 34:4"],
      ["5-r2", 5, "o5", "recordar", "¿Cómo llama el buen pastor a sus ovejas, según Juan 10:3?", "Por nombre", ["Con un silbido", "Por número", "No las llama"], "«y a sus ovejas llama por nombre».", "Juan 10:3"],
      ["5-r3", 5, "o5", "comprender", "¿Qué pide Santiago 5:14 al que está enfermo?", "Que llame a los ancianos de la iglesia para que oren por él", ["Que no diga nada", "Que espere sin orar", "Que deje de congregarse"], "«Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:14"],
    ] as P[]).map(p),
    "n5-teologia-pastoral-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo llama Pablo a Dios en 2 Corintios 1:3?", "Padre de misericordias y Dios de toda consolación", ["Juez sin misericordia", "Dios lejano", "Señor de los castigos"], "«Padre de misericordias y Dios de toda consolación».", "2 Corintios 1:3"],
      ["6-r2", 6, "o6", "comprender", "¿Qué advierte 1 Corintios 10:12?", "Que el que piensa estar firme mire que no caiga", ["Que los líderes nunca caen", "Que caer no importa", "Que solo caen los nuevos"], "«Así que, el que piensa estar firme, mire que no caiga».", "1 Corintios 10:12"],
      ["6-r3", 6, "o6", "recordar", "¿Qué pudo decir Pablo al final de su vida, según 2 Timoteo 4:7?", "He peleado la buena batalla, he acabado la carrera, he guardado la fe", ["Me arrepiento de haber servido", "No terminé lo que empecé", "Abandoné la fe"], "«He peleado la buena batalla, he acabado la carrera, he guardado la fe».", "2 Timoteo 4:7"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el buen pastor y el llamado (10)
    ["f01", 1, "o1", "recordar", "¿Qué da el buen pastor por las ovejas, según Juan 10:11?", "Su vida", ["Su dinero", "Sus órdenes", "Nada"], "«el buen pastor su vida da por las ovejas».", "Juan 10:11"],
    ["f02", 1, "o1", "comprender", "¿Qué significa que todo pastor es, ante todo, una oveja?", "Que pertenece al rebaño de Cristo y sirve bajo el Pastor verdadero", ["Que no debe guiar a nadie", "Que no necesita a Cristo", "Que es igual a los demás animales"], "«Yo soy el buen pastor».", "Juan 10:11"],
    ["f03", 1, "o1", "recordar", "¿Cómo llama Pedro a Cristo en 1 Pedro 5:4?", "El Príncipe de los pastores", ["El rey de Roma", "El sumo sacerdote del templo", "Un profeta más"], "«Y cuando aparezca el Príncipe de los pastores».", "1 Pedro 5:4"],
    ["f04", 1, "o1", "comprender", "¿Cómo debe apacentarse la grey, según 1 Pedro 5:2?", "Voluntariamente y con ánimo pronto, no por fuerza ni por ganancia deshonesta", ["Por obligación y con pesar", "Por ganancia", "Solo cuando haya tiempo"], "«no por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto».", "1 Pedro 5:2"],
    ["f05", 1, "o1", "recordar", "¿Qué dice Pablo a los ancianos de Éfeso sobre su tarea, en Hechos 20:28?", "Que el Espíritu Santo los puso por obispos para apacentar la iglesia", ["Que eran apóstoles como él", "Que debían servir en el templo", "Que debían atender solo las mesas"], "«en que el Espíritu Santo os ha puesto por obispos».", "Hechos 20:28"],
    ["f06", 1, "o1", "comprender", "¿Qué indica el nombre de pastor?", "Su cuidado del rebaño", ["Su riqueza", "Su edad", "Su título académico"], "«Apacentad la grey de Dios».", "1 Pedro 5:2"],
    ["f07", 1, "o1", "recordar", "¿Qué dice 1 Timoteo 3:1 del que anhela obispado?", "Que buena obra desea", ["Que busca fama", "Que debe ser rechazado", "Que es orgulloso"], "«Si alguno anhela obispado, buena obra desea».", "1 Timoteo 3:1"],
    ["f08", 1, "o1", "aplicar", "¿Cuál de estas señales ayuda a confirmar un llamado pastoral?", "Que la iglesia y sus líderes vean el fruto y lo confirmen", ["Que la persona quiera un título", "Que tenga mucho dinero", "Que nadie la conozca"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2"],
    ["f09", 1, "o1", "analizar", "¿Por qué el carácter es lo primero que pide la Palabra al que dirige?", "Porque el pastor cuida a otros con su vida, no solo con sus palabras", ["Porque los dones no importan", "Porque así es más fácil escoger", "No es lo primero"], "«Pero es necesario que el obispo sea irreprensible».", "1 Timoteo 3:2"],
    ["f10", 1, "o7", "recordar", "Completa Juan 10:11: Yo soy el buen pastor…", "el buen pastor su vida da por las ovejas", ["el buen pastor manda sobre las ovejas", "el buen pastor vive de las ovejas", "el buen pastor huye del lobo"], "Es el versículo de memoria de la materia.", "Juan 10:11"],
    // ---- lección 2: la vida del pastor con Dios (10)
    ["f11", 2, "o2", "recordar", "¿Qué prioridad definieron los apóstoles en Hechos 6:4?", "La oración y el ministerio de la palabra", ["Las finanzas", "Los edificios", "Las fiestas"], "«Y nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
    ["f12", 2, "o2", "recordar", "¿Cuándo salió Jesús a orar en Marcos 1:35?", "Muy de mañana, siendo aún muy oscuro", ["Al mediodía", "Solo los sábados", "Después de cenar con la multitud"], "«Levantándose muy de mañana, siendo aún muy oscuro».", "Marcos 1:35"],
    ["f13", 2, "o2", "comprender", "¿Qué es el profesionalismo en el ministerio?", "Predicar y orar por oficio, sin un corazón encendido", ["Prepararse bien", "Estudiar la Biblia", "Llegar a tiempo"], "«Ten cuidado de ti mismo y de la doctrina».", "1 Timoteo 4:16"],
    ["f14", 2, "o2", "comprender", "¿Por qué el aislamiento es un peligro para el pastor?", "Porque sin nadie a quien rendir cuentas es más fácil caer", ["Porque el pastor debe estar siempre rodeado de gente", "No es un peligro", "Porque así trabaja menos"], "«Mejores son dos que uno».", "Eclesiastés 4:9"],
    ["f15", 2, "o2", "recordar", "¿Qué orden muestra 1 Timoteo 4:16?", "Primero cuidar de sí mismo, después la doctrina", ["Primero los demás, nunca uno mismo", "Primero la doctrina, sin importar la vida", "Ninguno"], "«Ten cuidado de ti mismo y de la doctrina».", "1 Timoteo 4:16"],
    ["f16", 2, "o2", "aplicar", "¿Qué necesita también el pastor, según Marcos 6:31?", "Tiempo para descansar", ["Trabajar sin parar", "Más reuniones", "Menos oración"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ["f17", 2, "o2", "comprender", "¿Por qué no tenían tiempo ni para comer los discípulos, según Marcos 6:31?", "Porque eran muchos los que iban y venían", ["Porque ayunaban", "Porque no tenían comida", "Porque estaban enfermos"], "«Porque eran muchos los que iban y venían, de manera que ni aun tenían tiempo para comer».", "Marcos 6:31"],
    ["f18", 2, "o2", "aplicar", "¿Qué preguntas debería hacerle al pastor la persona a quien rinde cuentas?", "Cómo está su vida con Dios, su vida familiar y su manejo del dinero", ["Cuántos asistieron el domingo", "Cuánto dura su sermón", "De qué color pintará el templo"], "«Hierro con hierro se aguza».", "Proverbios 27:17"],
    ["f19", 2, "o2", "analizar", "¿Qué tienen en común el orgullo y la doble vida en el ministerio?", "Los dos alejan al pastor de Dios aunque siga activo", ["Los dos son virtudes", "Ninguno afecta al ministerio", "Los dos ayudan a crecer"], "«Así que, el que piensa estar firme, mire que no caiga».", "1 Corintios 10:12"],
    ["f20", 2, "o2", "evaluar", "¿Cuál de estas agendas cuida mejor la vida del pastor?", "Una con tiempo diario de oración y Palabra, un día de descanso y tiempo con su familia", ["Una llena de reuniones sin descanso", "Una sin tiempo para orar", "Una que deja a la familia para el final"], "«y allí oraba».", "Marcos 1:35"],
    // ---- lección 3: el pastor y su familia (10)
    ["f21", 3, "o3", "recordar", "¿Qué muestra la forma en que alguien cuida a los suyos, según 1 Timoteo 3:5?", "Cómo cuidará de la iglesia de Dios", ["Cuánto dinero gana", "Cuánto sabe de teología", "Nada"], "«¿cómo cuidará de la iglesia de Dios?».", "1 Timoteo 3:5"],
    ["f22", 3, "o3", "aplicar", "¿Qué práctica protege la vida familiar del pastor?", "Reservar en la agenda tiempo de calidad con el cónyuge y los hijos", ["Atender visitas en la casa a toda hora", "Contar en casa los problemas de la consejería", "Exigir a los hijos ser ejemplo de toda la iglesia"], "«pero yo y mi casa serviremos a Jehová».", "Josué 24:15"],
    ["f23", 3, "o3", "comprender", "¿Por qué no se debe exigir a los hijos del pastor que sean ejemplo de toda la iglesia?", "Porque son niños que necesitan crecer en la fe, no cargar con un papel", ["Porque no importa cómo vivan", "Porque deben alejarse de la iglesia", "Sí se les debe exigir"], "«Padres, no exasperéis a vuestros hijos, para que no se desalienten».", "Colosenses 3:21"],
    ["f24", 3, "o3", "recordar", "¿Qué pide 1 Pedro 4:9?", "Hospedarse los unos a los otros sin murmuraciones", ["Cerrar la casa a todos", "Cobrar por la hospitalidad", "Hospedar solo a los ricos"], "«Hospedaos los unos a los otros sin murmuraciones».", "1 Pedro 4:9"],
    ["f25", 3, "o3", "comprender", "¿Qué equilibrio pide la hospitalidad del pastor?", "Abrir la casa con generosidad, pero con límites sanos", ["Vivir sin ningún límite", "No abrir nunca la casa", "Abrir la casa solo a los líderes"], "«sin murmuraciones».", "1 Pedro 4:9"],
    ["f26", 3, "o3", "recordar", "¿Qué decidió Josué para su casa?", "Servir a Jehová", ["Servir a los dioses de Egipto", "Que cada uno decidiera", "Volver a Egipto"], "«pero yo y mi casa serviremos a Jehová».", "Josué 24:15"],
    ["f27", 3, "o3", "aplicar", "¿Qué hace el pastor en su casa con lo que se confía en la consejería?", "Lo guarda y no carga a su familia con esos problemas", ["Lo cuenta todo en la mesa", "Lo comenta con los hijos", "Lo publica para pedir oración"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f28", 3, "o3", "comprender", "¿Qué enseña 1 Corintios 7:32-35 sobre el que sirve sin casarse?", "Que la soltería no es un ministerio de segunda clase", ["Que el soltero no puede servir", "Que debe casarse para servir", "Nada"], "«El soltero tiene cuidado de las cosas del Señor».", "1 Corintios 7:32"],
    ["f29", 3, "o3", "analizar", "¿Por qué el hogar se llama el primer ministerio del pastor?", "Porque allí se ve si vive lo que predica y se forman los suyos en la fe", ["Porque la iglesia no importa", "Porque la casa es la oficina", "No es el primer ministerio"], "«pues el que no sabe gobernar su propia casa, ¿cómo cuidará de la iglesia de Dios?».", "1 Timoteo 3:5"],
    ["f30", 3, "o3", "evaluar", "¿Qué decisión cuida mejor el hogar de un pastor muy ocupado?", "Proteger una noche por semana para su familia y respetarla", ["Atender todas las llamadas a cualquier hora", "Dejar a la familia para las vacaciones", "Llevar a la familia a todas las reuniones sin preguntar"], "«pero yo y mi casa serviremos a Jehová».", "Josué 24:15"],
    // ---- lección 4: apacentar con la Palabra (10)
    ["f31", 4, "o4", "recordar", "¿Cuántas veces le preguntó Jesús a Pedro si lo amaba, en Juan 21?", "Tres veces", ["Una vez", "Siete veces", "Ninguna"], "«Apacienta mis ovejas».", "Juan 21:17"],
    ["f32", 4, "o4", "comprender", "¿Cómo se demuestra el amor por Cristo, según Juan 21:15-17?", "Cuidando a sus ovejas", ["Solo con palabras", "Con milagros", "Con un título"], "«Apacienta mis ovejas».", "Juan 21:17"],
    ["f33", 4, "o4", "recordar", "¿Cuándo pide 2 Timoteo 4:2 que se predique la palabra?", "A tiempo y fuera de tiempo", ["Solo cuando todos quieran oír", "Solo en las fiestas", "Nunca"], "«que instes a tiempo y fuera de tiempo».", "2 Timoteo 4:2"],
    ["f34", 4, "o4", "comprender", "¿Por qué conviene predicar libros completos de la Biblia?", "Para que la iglesia reciba todo el consejo de Dios", ["Para terminar más rápido", "Para evitar los temas difíciles", "Para no estudiar"], "«porque no he rehuido anunciaros todo el consejo de Dios».", "Hechos 20:27"],
    ["f35", 4, "o4", "recordar", "¿Dónde enseñó Pablo en Éfeso, según Hechos 20:20?", "En público y por las casas", ["Solo en la sinagoga", "Solo en el mercado", "Solo por cartas"], "«públicamente y por las casas».", "Hechos 20:20"],
    ["f36", 4, "o4", "recordar", "¿Quiénes vendrían contra el rebaño, según la advertencia de Pablo en Hechos 20:29?", "Lobos rapaces", ["Ángeles", "Pastores fieles", "Nadie"], "«entrarán en medio de vosotros lobos rapaces».", "Hechos 20:29"],
    ["f37", 4, "o4", "aplicar", "¿Cómo protege el pastor al rebaño de la falsa doctrina?", "Enseñando la sana doctrina y corrigiendo con mansedumbre a los que se oponen", ["Prohibiendo leer la Biblia", "Evitando hablar de doctrina", "Insultando a los que se equivocan"], "«que con mansedumbre corrija a los que se oponen».", "2 Timoteo 2:25"],
    ["f38", 4, "o4", "aplicar", "¿Qué ayuda a que la enseñanza llegue a todos en una iglesia?", "Formar maestros y grupos pequeños", ["Que solo enseñe el pastor", "Suspender las clases", "Enseñar solo a los líderes"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    ["f39", 4, "o4", "analizar", "¿Por qué un pastor sabio planifica qué enseñará durante el año?", "Para no predicar siempre sus temas favoritos y alimentar a la iglesia con toda la Escritura", ["Para trabajar menos", "Para impresionar", "No hace falta planificar"], "«Toda la Escritura es inspirada por Dios, y útil para enseñar».", "2 Timoteo 3:16"],
    ["f40", 4, "o4", "evaluar", "¿Qué plan de enseñanza anual es mejor para una iglesia?", "Un evangelio, una carta, un libro del Antiguo Testamento y los temas que la iglesia necesita", ["El mismo tema todo el año", "Solo los temas que más gustan", "Ningún plan"], "«porque no he rehuido anunciaros todo el consejo de Dios».", "Hechos 20:27"],
    // ---- lección 5: cuidar y visitar al rebaño (10)
    ["f41", 5, "o5", "recordar", "¿Qué reprocha Ezequiel 34:2 a los pastores de Israel?", "Que se apacentaban a sí mismos", ["Que cuidaban demasiado al rebaño", "Que oraban mucho", "Que visitaban a los enfermos"], "«¡Ay de los pastores de Israel, que se apacientan a sí mismos!».", "Ezequiel 34:2"],
    ["f42", 5, "o5", "comprender", "¿Qué espera Dios de los pastores, según lo que reprende en Ezequiel 34:4?", "Que fortalezcan, curen, venden, traigan de vuelta y busquen a las ovejas", ["Que solo prediquen los domingos", "Que cobren a las ovejas", "Que dejen que las ovejas se cuiden solas"], "«no volvisteis al redil la descarriada, ni buscasteis la perdida».", "Ezequiel 34:4"],
    ["f43", 5, "o5", "recordar", "¿Qué sabe el buen pastor de sus ovejas, según Juan 10:3?", "Sus nombres", ["Solo cuántas son", "Nada", "Solo su precio"], "«y a sus ovejas llama por nombre».", "Juan 10:3"],
    ["f44", 5, "o5", "aplicar", "¿Cómo debe ser una visita a un enfermo en el hospital?", "Breve, con una lectura, una oración y respeto por el lugar y el tiempo", ["Larga y ruidosa", "Sin orar", "Para hablar de los problemas de la iglesia"], "«Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:14"],
    ["f45", 5, "o5", "aplicar", "¿Cómo se busca al que dejó de venir a la iglesia?", "Sin reproches, como el pastor que busca la oveja perdida", ["Con reproches públicos", "Esperando a que vuelva solo", "Borrándolo de la lista"], "«va tras la que se perdió, hasta encontrarla».", "Lucas 15:4"],
    ["f46", 5, "o5", "recordar", "¿Qué hacen los ancianos por el enfermo, según Santiago 5:14?", "Oran por él, ungiéndolo con aceite en el nombre del Señor", ["Lo dejan solo", "Le cobran la visita", "Solo le dan consejos"], "«y oren por él, ungiéndole con aceite en el nombre del Señor».", "Santiago 5:14"],
    ["f47", 5, "o5", "comprender", "¿Qué significa referir a tiempo?", "Reconocer cuándo alguien necesita además un médico, un psicólogo, un abogado o la ayuda de las autoridades", ["Atenderlo todo solo", "Despedir a la persona", "Contar el caso a otros"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f48", 5, "o5", "evaluar", "En una visita, una persona dice que quiere quitarse la vida. ¿Qué hace el pastor?", "Busca ayuda de inmediato y no la deja sola", ["Ora y se va", "Espera a la próxima visita", "Le dice que no exagere"], "«Abre tu boca por el mudo En el juicio de todos los desvalidos».", "Proverbios 31:8"],
    ["f49", 5, "o5", "aplicar", "¿Cómo puede un pastor cuidar a todos si la iglesia crece?", "Formando un equipo de hermanos que visiten, oren y avisen", ["Visitando a todos solo", "Dejando de visitar", "Visitando solo a los que dan más"], "«Mejores son dos que uno».", "Eclesiastés 4:9"],
    ["f50", 5, "o5", "evaluar", "¿Qué pastor refleja mejor el cuidado que pide Ezequiel 34?", "Uno que conoce a sus ovejas, visita a las débiles y busca a las alejadas", ["Uno que solo predica y se va", "Uno que atiende solo a los líderes", "Uno que nunca sale de su oficina"], "«ni buscasteis la perdida».", "Ezequiel 34:4"],
    // ---- lección 6: acompañar en las crisis y terminar bien (10)
    ["f51", 6, "o6", "recordar", "¿Para qué nos consuela Dios, según 2 Corintios 1:4?", "Para que podamos consolar a los que están en cualquier tribulación", ["Para que no suframos nunca", "Para que olvidemos a los demás", "Para que nos alejemos del dolor ajeno"], "«para que podamos también nosotros consolar a los que están en cualquier tribulación».", "2 Corintios 1:4"],
    ["f52", 6, "o6", "aplicar", "¿Qué es lo más importante al acompañar a alguien en el dolor?", "Estar presente y escuchar más que hablar", ["Dar explicaciones rápidas del sufrimiento", "Hablar mucho", "Irse pronto"], "«Gozaos con los que se gozan; llorad con los que lloran».", "Romanos 12:15"],
    ["f53", 6, "o6", "comprender", "¿Por qué el pastor vuelve días y semanas después de una pérdida?", "Porque el dolor sigue cuando los demás ya se fueron", ["Por obligación", "Para pedir ofrendas", "No hace falta volver"], "«llorad con los que lloran».", "Romanos 12:15"],
    ["f54", 6, "o6", "recordar", "¿Qué señales muestran el agotamiento, según la lección?", "Cansancio que no se quita, irritación, falta de gozo y deseo de huir", ["Más energía y alegría", "Mucho tiempo libre", "Ninguna"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
    ["f55", 6, "o6", "analizar", "¿Por dónde empiezan muchas caídas morales de líderes?", "Por un líder agotado, aislado y sin rendir cuentas", ["Por orar demasiado", "Por tener amigos", "Por descansar"], "«Así que, el que piensa estar firme, mire que no caiga».", "1 Corintios 10:12"],
    ["f56", 6, "o6", "aplicar", "¿Qué protege al pastor de caer?", "Descanso, amistades, un mentor y límites claros", ["Trabajar sin parar", "Aislarse para concentrarse", "No rendir cuentas a nadie"], "«mire que no caiga».", "1 Corintios 10:12"],
    ["f57", 6, "o6", "recordar", "¿Qué guardó Pablo, según 2 Timoteo 4:7?", "La fe", ["Su dinero", "Su fama", "Sus títulos"], "«he guardado la fe».", "2 Timoteo 4:7"],
    ["f58", 6, "o6", "comprender", "¿Qué significa terminar bien el ministerio?", "Perseverar fiel hasta el final, no solo empezar con fuerza", ["Tener la iglesia más grande", "Retirarse temprano", "No equivocarse nunca"], "«He peleado la buena batalla, he acabado la carrera».", "2 Timoteo 4:7"],
    ["f59", 6, "o6", "evaluar", "¿Qué respuesta es mejor ante una familia que perdió a un hijo?", "Acompañarla, orar con pocas palabras y volver después, sin explicaciones fáciles", ["Explicarle por qué Dios lo permitió", "Decirle que no llore", "Visitarla una sola vez"], "«Padre de misericordias y Dios de toda consolación».", "2 Corintios 1:3"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estos pastores tiene más probabilidad de terminar bien?", "Uno que ora, descansa, cuida a su familia, tiene amigos y rinde cuentas", ["Uno que trabaja sin descanso y solo", "Uno que no rinde cuentas a nadie", "Uno que descuida su vida con Dios"], "«he acabado la carrera, he guardado la fe».", "2 Timoteo 4:7"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué recibirán los pastores fieles cuando aparezca el Príncipe de los pastores?", "La corona incorruptible de gloria", ["Una casa grande", "Dinero", "Un título"], "«vosotros recibiréis la corona incorruptible de gloria».", "1 Pedro 5:4"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué el pastorado es un servicio y no un puesto?", "Porque se cuida una grey que es de Dios, siguiendo a Cristo, que dio su vida", ["Porque da poder", "Porque es solo un empleo", "Porque no requiere carácter"], "«el buen pastor su vida da por las ovejas».", "Juan 10:11"],
      ["m1-03", 1, "o1", "aplicar", "Alguien quiere ser pastor para tener un título. ¿Qué le falta?", "Un deseo de servir que venga de Dios, no la búsqueda de un título", ["Nada, eso basta", "Más dinero", "Más fama"], "«Si alguno anhela obispado, buena obra desea».", "1 Timoteo 3:1"],
      ["m1-04", 1, "o1", "recordar", "¿Quién apartó a Bernabé y a Saulo para la obra, según Hechos 13:2?", "El Espíritu Santo", ["El rey", "Los fariseos", "Ellos mismos"], "«dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2"],
      ["m1-05", 1, "o1", "analizar", "¿Qué muestra que anciano, obispo y pastor nombren el mismo servicio en el Nuevo Testamento?", "Que Pablo llama ancianos a los líderes de Éfeso y les dice que son obispos para apacentar", ["Que eran tres cargos enemigos", "Que solo uno de ellos importaba", "Nada"], "«para apacentar la iglesia del Señor».", "Hechos 20:28"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué candidato al pastorado muestra mejores señales de llamado?", "Uno de carácter probado, con dones visibles y confirmado por la iglesia", ["Uno que se nombra a sí mismo", "Uno muy talentoso, pero sin carácter", "Uno que nadie conoce"], "«Pero es necesario que el obispo sea irreprensible».", "1 Timoteo 3:2"],
      ["m1-07", 2, "o2", "recordar", "¿A dónde se fue Jesús a orar en Marcos 1:35?", "A un lugar desierto", ["Al templo", "A la plaza", "A una fiesta"], "«se fue a un lugar desierto, y allí oraba».", "Marcos 1:35"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué la oración y la Palabra son la prioridad del pastor?", "Porque sin ellas el ministerio se vuelve una actividad más", ["Porque no hay nada más que hacer", "Porque así trabaja menos", "No son la prioridad"], "«Y nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
      ["m1-09", 2, "o2", "aplicar", "Un pastor lleva un mes sin un día libre. ¿Qué le aconsejarías?", "Que descanse, como Jesús invitó a sus discípulos", ["Que trabaje más", "Que ore menos", "Que no se queje"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
      ["m1-10", 2, "o2", "recordar", "¿Qué logra el que persiste en el cuidado de sí mismo y de la doctrina, según 1 Timoteo 4:16?", "Se salva a sí mismo y a los que le oyen", ["Se hace rico", "Se hace famoso", "Nada"], "«pues haciendo esto, te salvarás a ti mismo y a los que te oyeren».", "1 Timoteo 4:16"],
      ["m1-11", 2, "o2", "analizar", "¿Qué diferencia hay entre un pastor solo ocupado y un pastor con vida espiritual?", "El ocupado hace mucho para Dios; el otro primero está con Dios y de ahí sirve", ["No hay diferencia", "El ocupado ora más", "La vida espiritual no importa"], "«y allí oraba».", "Marcos 1:35"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué rendición de cuentas es la más sana para un pastor?", "Una persona de confianza que pregunta por su vida con Dios, su familia y su dinero, y le dice la verdad", ["Nadie", "Solo su propia conciencia", "Alguien que le dice solo lo que quiere oír"], "«Hierro con hierro se aguza».", "Proverbios 27:17"],
      ["m1-13", 3, "o3", "recordar", "¿Qué debe saber gobernar el que cuida la iglesia, según 1 Timoteo 3:5?", "Su propia casa", ["Una empresa", "Una ciudad", "Nada"], "«pues el que no sabe gobernar su propia casa».", "1 Timoteo 3:5"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué la casa del pastor no debe ser una oficina abierta todo el día?", "Porque la familia necesita intimidad y tiempo propio", ["Porque el pastor no debe ayudar a nadie", "Porque la iglesia no importa", "Sí debe serlo"], "«pero yo y mi casa serviremos a Jehová».", "Josué 24:15"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué práctica espiritual se recomienda para la familia del pastor?", "Orar y leer la Biblia en familia", ["Que solo el pastor ore", "Evitar la Biblia en casa", "Dejar la fe para la iglesia"], "«y las repetirás a tus hijos».", "Deuteronomio 6:7"],
      ["m1-16", 3, "o3", "recordar", "¿Cómo pide 1 Pedro 4:9 que se practique la hospitalidad?", "Sin murmuraciones", ["Con quejas", "Solo con los ricos", "Una vez al año"], "«Hospedaos los unos a los otros sin murmuraciones».", "1 Pedro 4:9"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué muchos hijos de pastores aman la iglesia?", "Porque vieron a sus padres vivir lo que predicaban", ["Porque nunca vieron a sus padres", "Porque la iglesia siempre fue primero", "Por obligación"], "«pero yo y mi casa serviremos a Jehová».", "Josué 24:15"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué necesita también el que sirve soltero?", "Amistades cercanas, descanso y personas que lo cuiden", ["Nada: el soltero no necesita a nadie", "Trabajar más que los demás", "Casarse para poder servir"], "«El soltero tiene cuidado de las cosas del Señor».", "1 Corintios 7:32"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué respondió Pedro cuando Jesús le preguntó si lo amaba, en Juan 21:15?", "Sí, Señor; tú sabes que te amo", ["No te conozco", "Déjame en paz", "No lo sé"], "«Sí, Señor; tú sabes que te amo».", "Juan 21:15"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué la predicación es el corazón del encargo pastoral?", "Porque la Palabra es el alimento del rebaño", ["Porque es lo más fácil", "Porque llena el tiempo del culto", "No lo es"], "«que prediques la palabra».", "2 Timoteo 4:2"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué recurso de esta misma academia puede usar el pastor para formar a la iglesia?", "Los niveles de la academia, que forman a los creyentes paso a paso", ["Ninguno", "Solo los anuncios", "Las redes sociales sin enseñanza"], "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
      ["m2-04", 4, "o4", "recordar", "¿Con qué ganó el Señor la iglesia, según Hechos 20:28?", "Con su propia sangre", ["Con oro", "Con la ley", "Con ejércitos"], "«la cual él ganó por su propia sangre».", "Hechos 20:28"],
      ["m2-05", 4, "o4", "analizar", "¿Qué relación hay entre enseñar bien y proteger al rebaño?", "Una iglesia bien alimentada con la Palabra resiste mejor el error", ["No hay relación", "Enseñar debilita a la iglesia", "Solo los líderes necesitan doctrina"], "«para que también pueda exhortar con sana enseñanza y convencer a los que contradicen».", "Tito 1:9"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué hace un pastor sabio ante un maestro que enseña un error en la iglesia?", "Lo corrige con mansedumbre y enseña la sana doctrina a la iglesia", ["Lo ignora", "Lo humilla en público", "Le da más clases"], "«que con mansedumbre corrija a los que se oponen».", "2 Timoteo 2:25"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hace el pastor de la parábola con la oveja perdida, según Lucas 15:4?", "Va tras ella hasta encontrarla", ["La olvida", "Espera a que vuelva", "Compra otra"], "«va tras la que se perdió, hasta encontrarla».", "Lucas 15:4"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué el cuidado pastoral es más que el culto del domingo?", "Porque las ovejas necesitan ser conocidas, visitadas y buscadas durante la semana", ["Porque el culto no importa", "Porque así se recauda más", "No es más que el culto"], "«No fortalecisteis las débiles, ni curasteis la enferma».", "Ezequiel 34:4"],
      ["m2-09", 5, "o5", "aplicar", "¿A quiénes conviene visitar primero?", "A los enfermos, los ancianos, los que viven solos, los alejados y los nuevos", ["Solo a los líderes", "Solo a los que más dan", "A nadie"], "«enfermo, y me visitasteis».", "Mateo 25:36"],
      ["m2-10", 5, "o5", "recordar", "¿En nombre de quién se unge al enfermo, según Santiago 5:14?", "En el nombre del Señor", ["En nombre del pastor", "En nombre de la iglesia local", "En nombre de un santo"], "«ungiéndole con aceite en el nombre del Señor».", "Santiago 5:14"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué referir a un profesional también es cuidar?", "Porque algunas necesidades requieren además ayuda médica, psicológica, legal o de las autoridades", ["Porque el pastor no quiere ayudar", "Porque la oración no sirve", "No es cuidar"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué hace mejor un equipo de visitación?", "Visita, ora y avisa al pastor cuando alguien lo necesita", ["Reemplaza al pastor en todo", "Solo cuenta chismes", "No hace nada"], "«Mejores son dos que uno».", "Eclesiastés 4:9"],
      ["m2-13", 6, "o6", "recordar", "¿Qué pide Romanos 12:15?", "Gozarse con los que se gozan y llorar con los que lloran", ["Llorar solo por uno mismo", "Evitar a los que sufren", "Reírse de los que lloran"], "«Gozaos con los que se gozan; llorad con los que lloran».", "Romanos 12:15"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué se acompaña con pocas palabras en el duelo?", "Porque la presencia y la oración consuelan más que las explicaciones", ["Porque no hay nada que decir de Dios", "Porque es mejor no ir", "No es así"], "«Padre de misericordias y Dios de toda consolación».", "2 Corintios 1:3"],
      ["m2-15", 6, "o6", "aplicar", "Un pastor siente un cansancio que no se quita y ganas de huir. ¿Qué hace?", "Lo habla con su mentor, descansa y busca ayuda", ["Lo esconde y sigue igual", "Trabaja más para olvidarlo", "Renuncia sin hablar con nadie"], "«Venid vosotros aparte a un lugar desierto, y descansad un poco».", "Marcos 6:31"],
      ["m2-16", 6, "o6", "recordar", "¿Qué tres cosas dice Pablo haber cumplido en 2 Timoteo 4:7?", "Pelear la buena batalla, acabar la carrera y guardar la fe", ["Ganar dinero, fama y poder", "Fundar mil iglesias", "Nada"], "«He peleado la buena batalla, he acabado la carrera, he guardado la fe».", "2 Timoteo 4:7"],
      ["m2-17", 6, "o6", "analizar", "¿Qué relación hay entre el agotamiento y la caída moral?", "Un pastor agotado, aislado y sin rendir cuentas es más vulnerable a caer", ["No tienen relación", "El agotamiento protege de caer", "Solo caen los que descansan"], "«el que piensa estar firme, mire que no caiga».", "1 Corintios 10:12"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué hábito ayuda más a terminar bien el ministerio?", "Tomar cada día pequeñas decisiones de fidelidad, descanso y rendición de cuentas", ["Esperar a que lleguen las grandes pruebas", "Confiar en la propia fuerza", "No pensar en el final"], "«he guardado la fe».", "2 Timoteo 4:7"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n5-teologia-pastoral-e1",
      tipo: "corta",
      pregunta: "Explica qué es el ministerio pastoral a partir de Cristo, el buen pastor, y cómo se reconoce un llamado.",
      ideas: [
        { id: "cristo", peso: 30, texto: "Cristo es el buen pastor que da su vida; el pastor sirve bajo él.", formas: ["buen pastor", "da su vida", "su vida da", "principe de los pastores"] },
        { id: "grey", peso: 20, texto: "La grey es de Dios y se cuida voluntariamente.", formas: ["grey de dios", "voluntariamente", "apacentar", "cuidando"] },
        { id: "llamado", peso: 30, texto: "El llamado: un deseo que viene de Dios, carácter, dones y la confirmación de la iglesia.", formas: ["llamado", "caracter", "dones", "confirm*", "deseo"] },
        { id: "servicio", peso: 10, texto: "Es un servicio, no un puesto.", formas: ["servicio", "servir", "no un puesto", "no un titulo"] },
      ],
      citas: ["Juan 10:11", "Juan 10:11-14", "1 Pedro 5:1-4", "1 Pedro 5:2", "1 Timoteo 3:1", "1 Timoteo 3:1-7", "Hechos 20:28", "Hechos 13:2-3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Cristo es el buen pastor que da su vida por las ovejas (Juan 10:11), y el pastor sirve bajo él cuidando una grey que es de Dios, voluntariamente. El llamado se reconoce por un deseo que viene de Dios, un carácter probado, dones visibles y la confirmación de la iglesia. Es un servicio, no un puesto.",
    },
    {
      id: "n5-teologia-pastoral-e2",
      tipo: "corta",
      pregunta: "Explica por qué el pastor debe cuidar su vida con Dios y su familia, y cómo hacerlo.",
      ideas: [
        { id: "dios", peso: 30, texto: "La oración y la Palabra como prioridad.", formas: ["oracion", "orar", "la palabra", "con dios"] },
        { id: "peligros", peso: 20, texto: "Los peligros: el profesionalismo, el orgullo, el aislamiento y la doble vida.", formas: ["profesional*", "orgullo", "aislamiento", "aislado", "doble vida"] },
        { id: "familia", peso: 25, texto: "El hogar es el primer ministerio.", formas: ["familia", "hogar", "su casa", "conyuge", "hijos", "primer ministerio"] },
        { id: "descanso", peso: 15, texto: "El descanso y la rendición de cuentas.", formas: ["descans*", "rendir cuentas", "rinde cuentas", "mentor"] },
      ],
      citas: ["Hechos 6:4", "Marcos 1:35", "1 Timoteo 4:16", "Marcos 6:31", "1 Timoteo 3:4-5", "1 Timoteo 3:5", "Josué 24:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El pastor necesita oración y la Palabra cada día (Hechos 6:4), porque nadie da lo que no recibe, y debe cuidarse del profesionalismo, del orgullo y del aislamiento. Su familia es su primer ministerio: quien no cuida su casa no cuidará la iglesia. Por eso descansa, protege tiempo para los suyos y rinde cuentas.",
    },
    {
      id: "n5-teologia-pastoral-e3",
      tipo: "corta",
      pregunta: "Explica cómo cuida el pastor al rebaño según Ezequiel 34 y Juan 10, y cuándo debe referir a un profesional.",
      ideas: [
        { id: "ezequiel", peso: 30, texto: "Fortalecer, curar, vendar, traer de vuelta y buscar.", formas: ["fortalec*", "curar", "cura", "vendar", "venda", "busca", "debiles"] },
        { id: "conocer", peso: 20, texto: "Conocer a las ovejas por nombre.", formas: ["por nombre", "conoce", "conocer"] },
        { id: "visitar", peso: 20, texto: "Visitar y orar por los enfermos.", formas: ["visit*", "enfermos", "orar por", "ora por"] },
        { id: "referir", peso: 20, texto: "Referir a tiempo a un profesional.", formas: ["referir", "refiere", "medico", "psicolog*", "abogado", "autoridades", "profesional"] },
      ],
      citas: ["Ezequiel 34:2-4", "Ezequiel 34:4", "Juan 10:3", "Juan 10:11", "Santiago 5:14", "Lucas 15:4", "Mateo 25:36"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Según Ezequiel 34:4, el pastor fortalece a las débiles, cura, venda, trae de vuelta a las descarriadas y busca a la perdida. Como en Juan 10, conoce a sus ovejas por nombre, las visita y ora por los enfermos. Cuando alguien necesita un médico, un psicólogo o las autoridades, lo refiere a tiempo.",
    },
    {
      id: "n5-teologia-pastoral-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo organizarías el cuidado pastoral de una iglesia o de un grupo durante un año: la enseñanza de la Palabra, las visitas, el acompañamiento en las crisis y el cuidado de tu propia vida y de tu familia. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "ensenanza", peso: 20, texto: "El plan de enseñanza de la Palabra.", formas: ["predic*", "enseñ*", "la palabra", "plan de enseñanza", "grupos pequeños"] },
        { id: "visitas", peso: 20, texto: "Las visitas y el equipo de cuidado.", formas: ["visit*", "equipo", "enfermos", "alejados", "nuevos"] },
        { id: "crisis", peso: 20, texto: "El acompañamiento en las crisis.", formas: ["crisis", "duelo", "dolor", "acompañ*", "consol*", "referir*"] },
        { id: "vida", peso: 20, texto: "El cuidado de la propia vida con Dios.", formas: ["oracion", "orar", "descans*", "rendir cuentas", "mentor"] },
        { id: "familia", peso: 20, texto: "El cuidado de la familia.", formas: ["familia", "hogar", "hijos", "conyuge", "mi casa"] },
      ],
      basta: 85,
      citas: ["Juan 21:15-17", "Juan 21:17", "2 Timoteo 4:2", "Hechos 20:20", "Hechos 20:27", "Hechos 20:28", "Ezequiel 34:4", "Juan 10:3", "Juan 10:11", "Santiago 5:14", "Lucas 15:4", "2 Corintios 1:3-4", "Romanos 12:15", "Hechos 6:4", "Marcos 1:35", "Marcos 6:31", "1 Timoteo 4:16", "1 Timoteo 3:4-5", "Josué 24:15", "1 Pedro 5:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Para un año, primero haría un plan de enseñanza: predicaría el Evangelio de Marcos en el primer semestre y la carta a los Filipenses en el segundo, y formaría tres maestros para los grupos pequeños, porque Jesús me encarga apacentar sus ovejas (Juan 21:17). Formaría un equipo de visitación de seis hermanos: cada semana visitaríamos a los enfermos, a los ancianos, a los nuevos y a los que dejaron de venir, y oraríamos por los enfermos, como enseña Santiago 5:14. En las crisis, alguien del equipo acompañaría a la familia el mismo día, yo estaría presente para escuchar y orar, y volveríamos semanas después; si alguien necesitara un médico, un psicólogo o un abogado, lo referiríamos a tiempo. Para mi propia vida, cada mañana tendría un tiempo de oración y Palabra, como Jesús en Marcos 1:35, tomaría un día de descanso por semana y me reuniría cada mes con un mentor para rendir cuentas. Para mi familia, guardaría una noche por semana sin reuniones y no llevaría a casa los problemas de la consejería, porque quien no cuida su casa no puede cuidar la iglesia.",
    },
    {
      id: "n5-teologia-pastoral-e5",
      tipo: "breve",
      pregunta:
        "Una familia de tu iglesia acaba de perder a un ser querido. Describe cómo la acompañarías en los primeros días y en las semanas siguientes, qué dirías y qué no dirías, y cómo cuidarías de ti mismo en ese tiempo. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "presencia", peso: 25, texto: "Estar presente y escuchar.", formas: ["presente", "escuch*", "estar con ellos", "acompañ*"] },
        { id: "palabras", peso: 20, texto: "Pocas palabras, sin explicaciones fáciles.", formas: ["pocas palabras", "no diria", "explicaciones", "no explicaria"] },
        { id: "oracion", peso: 15, texto: "Leer un salmo y orar.", formas: ["salmo", "orar", "oracion", "oraria"] },
        { id: "despues", peso: 20, texto: "Volver en las semanas siguientes y ayudar en lo práctico.", formas: ["las semanas", "semanas despues", "volver*", "volveria", "practico", "comidas"] },
        { id: "cuidado", peso: 20, texto: "Cuidar de sí mismo.", formas: ["descans*", "mentor", "cuidaria de mi", "rendir cuentas", "mi familia"] },
      ],
      basta: 85,
      citas: ["2 Corintios 1:3-4", "2 Corintios 1:3", "Romanos 12:15", "Juan 11:35", "Salmos 23:4", "Salmos 23:1-6", "Salmos 34:18", "Mateo 5:4", "1 Tesalonicenses 4:13-14", "Juan 14:1-3", "Marcos 6:31", "Gálatas 6:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Al enterarme, iría ese mismo día a la casa de la familia. No llegaría con discursos: estaría presente, escucharía y lloraría con ellos, como pide Romanos 12:15, porque Jesús también lloró ante la tumba de su amigo. No diría frases como que Dios lo necesitaba más que ellos ni daría explicaciones fáciles del sufrimiento; con pocas palabras leería un salmo, como el Salmo 23, y oraría por ellos. Ayudaría en lo práctico junto con la iglesia: organizar comidas, acompañar en el funeral y estar atentos a los niños. En las semanas siguientes volvería a visitarlos y los llamaría, porque el dolor sigue cuando los demás ya se fueron, y les recordaría que Dios es el Padre de misericordias y Dios de toda consolación (2 Corintios 1:3-4). Si viera señales de una tristeza que no mejora con el tiempo, los animaría a buscar también ayuda profesional. En ese tiempo cuidaría de mí mismo: descansaría, hablaría con mi mentor sobre lo que siento y no dejaría de pasar tiempo con mi familia.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 5
  breve: {
    id: "n5-teologia-pastoral-b1",
    tipo: "breve",
    pregunta:
      "Escribe una carta breve a un pastor joven que está empezando: qué le dirías sobre su vida con Dios, su familia, la enseñanza de la Palabra y el cuidado de las ovejas, para que termine bien su ministerio. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "dios", peso: 20, texto: "Su vida con Dios.", formas: ["oracion", "orar", "la palabra", "con dios"] },
      { id: "familia", peso: 20, texto: "Su familia.", formas: ["familia", "hijos", "hogar", "conyuge", "tu casa"] },
      { id: "ensenanza", peso: 20, texto: "La enseñanza de la Palabra.", formas: ["predic*", "enseñ*", "apacienta", "todo el consejo"] },
      { id: "ovejas", peso: 20, texto: "El cuidado de las ovejas.", formas: ["ovejas", "visit*", "rebaño", "grey"] },
      { id: "terminar", peso: 20, texto: "Terminar bien: descanso, rendición de cuentas y perseverancia.", formas: ["terminar bien", "termina bien", "carrera", "descans*", "rendir cuentas", "mentor", "persever*"] },
    ],
    basta: 85,
    citas: ["Juan 10:11", "1 Pedro 5:2-4", "1 Pedro 5:2", "Hechos 6:4", "Marcos 1:35", "1 Timoteo 4:12", "1 Timoteo 4:16", "1 Timoteo 3:5", "Josué 24:15", "Juan 21:17", "2 Timoteo 4:2", "2 Timoteo 4:7", "Hechos 20:28", "Ezequiel 34:4", "Juan 10:3", "Marcos 6:31"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Querido hermano: empiezas una obra hermosa, y quiero animarte. Primero, cuida tu vida con Dios: no dejes que la agenda te robe el tiempo de oración y de la Palabra, como los apóstoles, que persistieron en la oración y en el ministerio de la palabra (Hechos 6:4). Segundo, cuida a tu familia: tu cónyuge y tus hijos son tu primer ministerio; protege una noche por semana para ellos y no lleves a casa las cargas de la consejería. Tercero, predica la Palabra a tiempo y fuera de tiempo (2 Timoteo 4:2): enseña libros completos y forma maestros, para que la iglesia reciba todo el consejo de Dios. Cuarto, conoce a tus ovejas por nombre, visita a los enfermos y busca a los que se alejan, recordando que la grey es de Dios y no tuya. Y para terminar bien, descansa un día por semana, busca un mentor a quien rendir cuentas y no camines solo. Así, al final, podrás decir como Pablo que acabaste la carrera y guardaste la fe. Con cariño, tu hermano en Cristo.",
  },
};
