/**
 * El banco de «Disciplinas espirituales» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué son las disciplinas y la gracia · o2 la Palabra, la oración y el ayuno · o3 la adoración, el día del
 * Señor, el silencio y el diario espiritual · o4 el servicio, la generosidad y un plan personal · o5 el versículo de
 * memoria (1 Timoteo 4:8).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-disciplinas-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_DISCIPLINAS: BancoMateria = {
  materia: "n2-disciplinas",
  repaso: {
    "n2-disciplinas-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué le dice Pablo a Timoteo en 1 Timoteo 4:7?", "Que se ejercite para la piedad", ["Que deje de orar en público", "Que ayune cuarenta días", "Que se aparte de la iglesia"], "Pablo le pide a Timoteo que deseche las fábulas y se ejercite para la piedad.", "1 Timoteo 4:7"],
      ["1-r2", 1, "o1", "comprender", "¿Las disciplinas espirituales nos hacen ganar el amor de Dios?", "No: son medios de gracia para conocerlo y ser transformados", ["Sí: cuanto más hacemos, más nos ama", "Sí: son el precio de la salvación", "Solo si las practican los pastores"], "Somos salvos por gracia, por medio de la fe; las disciplinas son caminos para estar con Dios, no méritos.", "Efesios 2:8-9"],
      ["1-r3", 1, "o1", "recordar", "Según Lucas 5:16, ¿qué hacía Jesús?", "Se apartaba a lugares desiertos para orar", ["Evitaba orar para no cansarse", "Oraba solo en el templo", "Mandaba a otros a orar por Él"], "Aun con las multitudes buscándolo, Jesús se apartaba a lugares desiertos y oraba.", "Lucas 5:16"],
    ] as P[]).map(p),
    "n2-disciplinas-2": ([
      ["2-r1", 2, "o2", "recordar", "¿A qué se parece el que medita en la ley de Jehová, según el Salmo 1?", "A un árbol plantado junto a corrientes de aguas", ["A una casa sobre la arena", "A una nube sin lluvia", "A un barco sin timón"], "Es como árbol plantado junto a corrientes de aguas, que da su fruto a su tiempo.", "Salmos 1:3"],
      ["2-r2", 2, "o2", "comprender", "¿Qué es la meditación bíblica?", "Llenar la mente con la Palabra de Dios para obedecerla", ["Dejar la mente en blanco", "Repetir una palabra sin sentido", "Leer muchos capítulos sin pensar"], "Dios le dijo a Josué que meditara en la ley de día y de noche para hacer conforme a lo escrito.", "Josué 1:8"],
      ["2-r3", 2, "o2", "recordar", "Según Salmos 119:11, ¿para qué guardamos la Palabra en el corazón?", "Para no pecar contra Dios", ["Para ganar discusiones", "Para parecer sabios", "Para no tener que leerla más"], "En mi corazón he guardado tus dichos, para no pecar contra ti.", "Salmos 119:11"],
    ] as P[]).map(p),
    "n2-disciplinas-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Dónde enseñó Jesús a orar al Padre, según Mateo 6:6?", "En lo secreto, en el aposento", ["En las esquinas de las calles", "Solo en el templo", "Delante de mucha gente"], "Jesús enseñó a entrar en el aposento, cerrar la puerta y orar al Padre que está en secreto.", "Mateo 6:6"],
      ["3-r2", 3, "o2", "comprender", "¿Qué es ayunar, según la Biblia?", "Abstenerse de comida por un tiempo para buscar a Dios con más intensidad", ["Dejar de comer para bajar de peso", "Castigarse para pagar los pecados", "Comer solo pan durante un año"], "El ayuno bíblico es buscar a Dios con más intensidad, delante del Padre y no para ser vistos.", "Mateo 6:16-18"],
      ["3-r3", 3, "o2", "comprender", "¿Qué ayuno escogió Dios, según Isaías 58:6-7?", "El que va unido a liberar al oprimido y compartir el pan con el hambriento", ["El que se hace para que todos lo vean", "El que dura más días", "El que no tiene relación con el prójimo"], "Dios escogió un ayuno unido a soltar las cargas de opresión y compartir el pan con el hambriento.", "Isaías 58:6-7"],
    ] as P[]).map(p),
    "n2-disciplinas-4": ([
      ["4-r1", 4, "o3", "comprender", "¿Qué significa adorar en espíritu y en verdad?", "Con todo el corazón y conforme a lo que Dios reveló en su Palabra", ["Solo en un monte o un templo especial", "Con emociones, aunque contradigan la Biblia", "Solo con la mente, sin el corazón"], "El Padre busca adoradores que lo adoren con el corazón guiado por el Espíritu y conforme a la verdad.", "Juan 4:23-24"],
      ["4-r2", 4, "o3", "recordar", "Según Romanos 12:1, ¿cuál es nuestro culto racional?", "Presentar el cuerpo en sacrificio vivo, santo, agradable a Dios", ["Ofrecer animales en el altar", "Cantar una vez a la semana", "Dar una ofrenda grande"], "Pablo ruega presentar nuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", "Romanos 12:1"],
      ["4-r3", 4, "o3", "recordar", "¿Qué día se reunían los primeros cristianos para partir el pan, según Hechos 20:7?", "El primer día de la semana", ["El séptimo día", "Solo en las fiestas judías", "Una vez al año"], "El primer día de la semana, reunidos los discípulos para partir el pan, Pablo les enseñaba.", "Hechos 20:7"],
    ] as P[]).map(p),
    "n2-disciplinas-5": ([
      ["5-r1", 5, "o3", "recordar", "¿Qué hizo Jesús muy de mañana, según Marcos 1:35?", "Fue a un lugar desierto y allí oraba", ["Predicó a las multitudes", "Durmió hasta tarde", "Fue al mercado"], "Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a un lugar desierto, y allí oraba.", "Marcos 1:35"],
      ["5-r2", 5, "o3", "comprender", "¿Para qué sirve un diario espiritual?", "Para recordar lo que Dios enseña, las oraciones y sus respuestas", ["Para contar los pecados de otros", "Para reemplazar la lectura de la Biblia", "Para tener reglas que salvan"], "El salmista se acordaba de las obras de Jehová y meditaba en ellas: escribirlas ayuda a recordarlas.", "Salmos 77:11-12"],
      ["5-r3", 5, "o3", "comprender", "¿Qué le pide David a Dios en Salmos 139:23-24?", "Que lo examine, conozca su corazón y lo guíe", ["Que le dé riquezas", "Que castigue a sus enemigos", "Que lo deje solo"], "David pide que Dios lo examine, conozca su corazón y lo guíe en el camino eterno.", "Salmos 139:23-24"],
    ] as P[]).map(p),
    "n2-disciplinas-6": ([
      ["6-r1", 6, "o4", "comprender", "Según Marcos 10:45, ¿a qué vino el Hijo del Hombre?", "A servir y dar su vida en rescate por muchos", ["A ser servido por todos", "A gobernar Roma", "A juzgar sin misericordia"], "El Hijo del Hombre no vino para ser servido, sino para servir y dar su vida en rescate por muchos.", "Marcos 10:45"],
      ["6-r2", 6, "o4", "recordar", "¿A quién ama Dios, según 2 Corintios 9:7?", "Al dador alegre", ["Al que da por obligación", "Al que da para que lo vean", "Al que da con tristeza"], "Cada uno dé como propuso en su corazón, porque Dios ama al dador alegre.", "2 Corintios 9:7"],
      ["6-r3", 6, "o4", "aplicar", "¿Qué es una regla de vida?", "Un plan con ritmos diarios, semanales y anuales para crecer en Cristo", ["Una lista de prohibiciones para ser salvo", "Un reglamento de la iglesia para castigar", "Un horario sin lugar para Dios"], "Un plan sencillo ayuda a perseverar sin cansarse de hacer el bien.", "Gálatas 6:9"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: qué son las disciplinas espirituales (8)
    ["f01", 1, "o1", "recordar", "¿Qué imagen usa Pablo para hablar de la vida espiritual en 1 Timoteo 4:7-8?", "El ejercicio, el entrenamiento", ["La agricultura", "La construcción de un templo", "La pesca"], "Pablo compara la piedad con el ejercicio: se cultiva con constancia, como se entrena el cuerpo.", "1 Timoteo 4:7-8"],
    ["f02", 1, "o1", "comprender", "Según 1 Timoteo 4:8, ¿por qué la piedad vale más que el ejercicio corporal?", "Porque tiene promesa de esta vida y de la venidera", ["Porque cansa menos", "Porque se hace una vez al año", "Porque la ven los demás"], "El ejercicio corporal para poco es provechoso; la piedad para todo aprovecha, con promesa de esta vida y de la venidera.", "1 Timoteo 4:8"],
    ["f03", 1, "o1", "comprender", "¿Cuál es la diferencia entre la disciplina espiritual y el legalismo?", "La disciplina busca a Dios por gracia; el legalismo busca ganar aceptación o aparentar", ["No hay ninguna diferencia", "El legalismo es más bíblico", "La disciplina es solo para los pastores"], "Jesús advirtió contra hacer la justicia para ser vistos: eso es lo que hace el legalismo.", "Mateo 6:1"],
    ["f04", 1, "o1", "recordar", "¿Qué advirtió Jesús en Mateo 6:1?", "Que no hagamos nuestra justicia para ser vistos por los hombres", ["Que no demos ofrendas", "Que no oremos nunca", "Que no vayamos al templo"], "Guardaos de hacer vuestra justicia delante de los hombres, para ser vistos de ellos.", "Mateo 6:1"],
    ["f05", 1, "o1", "comprender", "¿Cómo nos transforma Dios mientras lo contemplamos, según 2 Corintios 3:18?", "Por su Espíritu, de gloria en gloria, a la imagen del Señor", ["Solo por nuestro esfuerzo", "De un día para otro, sin proceso", "Por las reglas de los hombres"], "Mirando la gloria del Señor, somos transformados de gloria en gloria en la misma imagen, por el Espíritu.", "2 Corintios 3:18"],
    ["f06", 1, "o1", "recordar", "¿Qué hacía Jesús aunque lo buscaban las multitudes?", "Se apartaba a orar en lugares desiertos", ["Evitaba a la gente para descansar", "Organizaba fiestas", "Dejaba de enseñar"], "Mas él se apartaba a lugares desiertos, y oraba.", "Lucas 5:16"],
    ["f07", 1, "o1", "aplicar", "Un creyente dice: «Si oro una hora cada día, Dios me amará más». ¿Qué le responderías?", "Que Dios ya lo ama en Cristo; la oración es para estar con Él, no para ganar su amor", ["Que tiene razón: hay que ganarse el amor de Dios", "Que deje de orar", "Que ore solo cuando tenga problemas"], "Dios muestra su amor para con nosotros en que, siendo aún pecadores, Cristo murió por nosotros.", "Romanos 5:8"],
    ["f08", 1, "o1", "comprender", "¿Para qué sirven las disciplinas espirituales?", "Para conocer a Dios, crecer en Cristo y ser transformados", ["Para ser mejores que los demás", "Para pagar los pecados", "Para tener éxito económico"], "Pedro nos llama a crecer en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo.", "2 Pedro 3:18"],
    // ---- lección 2: la Palabra (8)
    ["f09", 2, "o2", "recordar", "¿Qué hacían los de Berea, según Hechos 17:11?", "Escudriñaban cada día las Escrituras", ["Rechazaban la predicación", "Leían solo los domingos", "Guardaban la Biblia sin abrirla"], "Los de Berea recibieron la palabra con solicitud, escudriñando cada día las Escrituras.", "Hechos 17:11"],
    ["f10", 2, "o2", "recordar", "¿Qué le mandó Dios a Josué sobre el libro de la ley?", "Que meditara en él de día y de noche para hacer conforme a lo escrito", ["Que lo guardara en el arca sin leerlo", "Que lo leyera una vez al año", "Que se lo dejara a los sacerdotes"], "Dios le dijo que de día y de noche meditara en él, para que guardara y hiciera conforme a lo escrito.", "Josué 1:8"],
    ["f11", 2, "o2", "comprender", "Según 2 Timoteo 3:16-17, ¿para qué es útil la Escritura?", "Para enseñar, redargüir, corregir e instruir en justicia", ["Solo para la historia antigua", "Para adivinar el futuro", "Solo para los teólogos"], "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.", "2 Timoteo 3:16-17"],
    ["f12", 2, "o2", "comprender", "¿Qué diferencia hay entre leer y meditar la Biblia?", "Leer recorre el texto; meditar se detiene a pensar en él y en cómo obedecerlo", ["Ninguna: son lo mismo", "Meditar es dejar la mente en blanco", "Leer es solo para los niños"], "El bienaventurado medita en la ley de día y de noche: se detiene en ella y la hace suya.", "Salmos 1:2"],
    ["f13", 2, "o2", "aplicar", "¿Cuál es un buen plan para leer la Biblia con constancia?", "Leer un pasaje cada día, a una hora fija y con un orden", ["Abrirla al azar cuando haya tiempo", "Leerla toda en un fin de semana y no volver", "Leer solo lo que otros publican"], "La delicia del bienaventurado está en la ley de Jehová, y en ella medita de día y de noche: con constancia.", "Salmos 1:2"],
    ["f14", 2, "o2", "recordar", "Según el Salmo 1, ¿en qué está la delicia del bienaventurado?", "En la ley de Jehová", ["En el consejo de los malos", "En las riquezas", "En la silla de los escarnecedores"], "En la ley de Jehová está su delicia, y en su ley medita de día y de noche.", "Salmos 1:2"],
    ["f15", 2, "o2", "comprender", "¿Para qué memorizar versículos?", "Para guardar la Palabra en el corazón y no pecar contra Dios", ["Para presumir de lo que sabemos", "Para no tener que leer más", "Porque es una regla para ser salvo"], "En mi corazón he guardado tus dichos, para no pecar contra ti.", "Salmos 119:11"],
    ["f16", 2, "o5", "recordar", "¿Cómo termina 1 Timoteo 4:8, el versículo de memoria de esta materia?", "Pues tiene promesa de esta vida presente, y de la venidera", ["Y el que persevere hasta el fin será salvo", "Porque de tal manera amó Dios al mundo", "Y la paz de Dios guardará vuestros corazones"], "Porque el ejercicio corporal para poco es provechoso, pero la piedad para todo aprovecha, pues tiene promesa de esta vida presente, y de la venidera.", "1 Timoteo 4:8"],
    // ---- lección 3: la oración y el ayuno (8)
    ["f17", 3, "o2", "recordar", "¿Qué no debemos hacer al orar, según Mateo 6:5?", "Orar para ser vistos por los hombres", ["Orar en lo secreto", "Orar al Padre", "Orar con fe"], "Jesús dijo que no seamos como los hipócritas, que aman orar en las esquinas para ser vistos.", "Mateo 6:5"],
    ["f18", 3, "o2", "recordar", "Según Mateo 6:7, ¿qué no hay que usar al orar?", "Vanas repeticiones", ["Palabras sinceras", "El nombre de Jesús", "La Escritura"], "Y orando, no uséis vanas repeticiones, como los gentiles.", "Mateo 6:7"],
    ["f19", 3, "o2", "comprender", "¿Qué nos enseña el Padre Nuestro?", "A adorar, pedir su reino, el pan, el perdón y la protección", ["A pedir solo cosas materiales", "A repetir palabras sin pensar", "A orar solo por nosotros mismos"], "El Padre Nuestro empieza con el nombre de Dios y su reino, y sigue con el pan, el perdón y la protección del mal.", "Mateo 6:9-13"],
    ["f20", 3, "o2", "recordar", "¿Qué mandó Jesús hacer al que ayuna, según Mateo 6:17-18?", "Ungir la cabeza y lavar el rostro, para no mostrar que ayuna", ["Poner cara triste", "Contarlo a todos", "Ayunar solo en el templo"], "Cuando ayunes, unge tu cabeza y lava tu rostro, para no mostrar a los hombres que ayunas, sino a tu Padre.", "Mateo 6:17-18"],
    ["f21", 3, "o2", "recordar", "¿Qué hacía la iglesia de Antioquía cuando el Espíritu apartó a Bernabé y a Saulo?", "Ministraba al Señor y ayunaba", ["Celebraba una fiesta", "Discutía sobre la ley", "Construía un templo"], "Ministrando estos al Señor, y ayunando, dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo.", "Hechos 13:2"],
    ["f22", 3, "o2", "comprender", "¿Cuál es un propósito del ayuno bíblico?", "Humillarse delante de Dios y buscar su dirección", ["Demostrar que somos más santos", "Obligar a Dios a hacer nuestra voluntad", "Bajar de peso"], "Esdras proclamó ayuno para humillarse delante de Dios y pedirle camino derecho.", "Esdras 8:21"],
    ["f23", 3, "o2", "aplicar", "Una hermana con diabetes quiere ayunar. ¿Qué le aconsejarías?", "Que consulte a su médico y que puede ayunar de otras cosas, como del entretenimiento", ["Que ayune muchos días sin comer para tener más fe", "Que deje de buscar a Dios", "Que el ayuno es solo para los sanos"], "El cuerpo es templo del Espíritu Santo: buscar a Dios no pide poner en peligro la salud.", "1 Corintios 6:19"],
    ["f24", 3, "o2", "comprender", "¿Por qué reprendió Dios el ayuno de su pueblo en Isaías 58?", "Porque ayunaban mientras oprimían a otros", ["Porque ayunaban demasiado poco", "Porque no tenían templo", "Porque ayunaban en secreto"], "En el día de su ayuno buscaban su propio gusto y oprimían a sus trabajadores.", "Isaías 58:3-4"],
    // ---- lección 4: la adoración y el día del Señor (7)
    ["f25", 4, "o3", "recordar", "¿A quién le habló Jesús de adorar en espíritu y en verdad?", "A la mujer samaritana", ["A Nicodemo", "A Pedro", "A Poncio Pilato"], "Junto al pozo de Sicar, Jesús le enseñó a la mujer samaritana que el Padre busca adoradores en espíritu y en verdad.", "Juan 4:23-24"],
    ["f26", 4, "o3", "comprender", "¿Qué busca el Padre, según Juan 4:23?", "Adoradores que lo adoren en espíritu y en verdad", ["Templos más grandes", "Sacrificios de animales", "Cantantes famosos"], "El Padre tales adoradores busca que le adoren en espíritu y en verdad.", "Juan 4:23"],
    ["f27", 4, "o3", "recordar", "Según Salmos 34:1, ¿cuándo bendecía David a Jehová?", "En todo tiempo", ["Solo los sábados", "Solo cuando le iba bien", "Una vez al año"], "Bendeciré a Jehová en todo tiempo; su alabanza estará de continuo en mi boca.", "Salmos 34:1"],
    ["f28", 4, "o3", "comprender", "¿Para qué congregarse, según Hebreos 10:24-25?", "Para estimularnos al amor y a las buenas obras, y exhortarnos", ["Para cumplir un requisito y nada más", "Para criticar a los demás", "No hace falta congregarse"], "Considerémonos unos a otros para estimularnos al amor y a las buenas obras, sin dejar de congregarnos.", "Hebreos 10:24-25"],
    ["f29", 4, "o3", "recordar", "¿Cómo llama Juan al día en que recibió la revelación, en Apocalipsis 1:10?", "El día del Señor", ["El día de reposo judío", "El día de la expiación", "El último día del año"], "Juan dice que estaba en el Espíritu en el día del Señor.", "Apocalipsis 1:10"],
    ["f30", 4, "o3", "comprender", "Según Marcos 2:27, ¿para quién fue hecho el día de reposo?", "Por causa del hombre", ["Por causa de los sacerdotes", "Solo para los animales", "Para castigar al pueblo"], "Jesús dijo que el día de reposo fue hecho por causa del hombre, y no el hombre por causa del día de reposo.", "Marcos 2:27"],
    ["f31", 4, "o3", "aplicar", "¿Cuál de estas es una forma de adoración en la vida diaria?", "Dar gracias a Dios y obedecerlo en el trabajo y en la casa", ["Cantar solo cuando estamos en el templo", "Esperar a sentir emociones fuertes", "Dejar la adoración a los músicos"], "Todo lo que hacéis, de palabra o de hecho, hacedlo en el nombre del Señor Jesús, dando gracias a Dios.", "Colosenses 3:17"],
    // ---- lección 5: el silencio, la soledad y el diario espiritual (7)
    ["f32", 5, "o3", "comprender", "¿Por qué el silencio y la soledad son disciplinas bíblicas?", "Porque apartan un tiempo para estar con Dios, como hacía Jesús", ["Porque hay que huir de la gente para siempre", "Porque Dios no está en la iglesia", "Porque así se vacía la mente"], "Jesús se levantaba muy de mañana y se iba a un lugar desierto a orar.", "Marcos 1:35"],
    ["f33", 5, "o3", "recordar", "Según Salmos 46:10, ¿qué dice Dios?", "Estad quietos, y conoced que yo soy Dios", ["Corred y no os detengáis", "Gritad hasta que os oiga", "Callad para siempre"], "Estad quietos, y conoced que yo soy Dios.", "Salmos 46:10"],
    ["f34", 5, "o3", "comprender", "¿En qué se diferencia el silencio bíblico de dejar la mente en blanco?", "El silencio bíblico es una mente atenta a Dios y a su Palabra", ["No hay ninguna diferencia", "El silencio bíblico prohíbe pensar", "El silencio bíblico es dormir"], "Dios llama a estar quietos para conocerlo: es una quietud llena de Él.", "Salmos 46:10"],
    ["f35", 5, "o3", "recordar", "¿Qué hacía el salmista para animarse, según Salmos 77:11-12?", "Se acordaba de las obras de Jehová y meditaba en ellas", ["Olvidaba el pasado", "Buscaba consejo en los astros", "Dejaba de orar"], "Me acordaré de las obras de Jehová; sí, haré yo memoria de tus maravillas antiguas.", "Salmos 77:11-12"],
    ["f36", 5, "o3", "aplicar", "¿Qué puede escribir alguien en su diario espiritual?", "Lo que Dios le enseña, sus oraciones y las respuestas que recibe", ["Los defectos de sus hermanos", "Solo sus compras", "Reglas para ganarse la salvación"], "Dios le dijo a Habacuc que escribiera la visión y la declarara en tablas: escribir ayuda a recordar.", "Habacuc 2:2"],
    ["f37", 5, "o3", "comprender", "¿Qué incluye el examen del corazón al final del día?", "Dar gracias, confesar lo malo y pedir la guía de Dios", ["Contar el dinero, dormir y olvidar", "Culpar a otros, quejarse y callar", "Solo pedir cosas para mañana"], "David pide que Dios examine su corazón, vea si hay camino de perversidad y lo guíe en el camino eterno.", "Salmos 139:23-24"],
    ["f38", 5, "o3", "recordar", "¿Cuándo salió Jesús a orar en Marcos 1:35?", "Muy de mañana, siendo aún muy oscuro", ["Al mediodía", "A medianoche, después de cenar", "Por la tarde, al terminar de predicar"], "Levantándose muy de mañana, siendo aún muy oscuro, salió y se fue a un lugar desierto.", "Marcos 1:35"],
    // ---- lección 6: el servicio, la generosidad y una regla de vida (7)
    ["f39", 6, "o4", "comprender", "¿Por qué el servicio es una disciplina espiritual?", "Porque va contra el orgullo y nos hace parecidos a Jesús", ["Porque nos hace más importantes", "Porque así no hace falta orar", "Porque es solo para los diáconos"], "Jesús vino a servir: servir como Él nos libra del orgullo.", "Marcos 10:45"],
    ["f40", 6, "o4", "recordar", "Según Gálatas 5:13, ¿cómo debemos usar nuestra libertad?", "Para servirnos por amor los unos a los otros", ["Para hacer lo que queramos", "Para juzgar a los demás", "Para dejar de congregarnos"], "No uséis la libertad como ocasión para la carne, sino servíos por amor los unos a los otros.", "Gálatas 5:13"],
    ["f41", 6, "o4", "comprender", "¿Cómo debe dar el creyente, según 2 Corintios 9:7?", "Como propuso en su corazón, sin tristeza ni obligación", ["Lo que le exijan, aunque sea con tristeza", "Solo cuando le sobra", "Para que lo vean"], "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.", "2 Corintios 9:7"],
    ["f42", 6, "o4", "aplicar", "¿Cuál de estos es un buen ritmo diario de una regla de vida?", "Un tiempo con la Palabra y la oración, y el examen del corazón al final", ["Un ayuno largo todos los días", "Leer la Biblia solo en las vacaciones", "Orar solo cuando hay problemas"], "De mañana oirás mi voz; de mañana me presentaré delante de ti.", "Salmos 5:3"],
    ["f43", 6, "o4", "comprender", "¿Por qué conviene vivir las disciplinas en comunidad?", "Porque nos animamos unos a otros a perseverar, como la primera iglesia", ["Porque solos no podemos orar", "Porque así nos vigilan para castigarnos", "No conviene: la fe es solo privada"], "La primera iglesia perseveraba junta en la doctrina, la comunión, el partimiento del pan y las oraciones.", "Hechos 2:42"],
    ["f44", 6, "o4", "recordar", "Según Gálatas 6:9, ¿qué no debemos hacer?", "Cansarnos de hacer el bien", ["Descansar el día del Señor", "Pedir ayuda", "Orar por otros"], "No nos cansemos de hacer bien; porque a su tiempo segaremos, si no desmayamos.", "Gálatas 6:9"],
    ["f45", 6, "o4", "aplicar", "¿Qué hacer si uno abandona su plan de disciplinas por un tiempo?", "Volver a empezar con un plan sencillo, confiando en la gracia de Dios", ["Rendirse para siempre", "Castigarse con un ayuno largo", "Pensar que Dios ya no lo ama"], "Las misericordias de Dios son nuevas cada mañana; grande es su fidelidad.", "Lamentaciones 3:22-23"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué es la piedad?", "Una vida que agrada a Dios", ["Un sentimiento de tristeza", "Un rito para los sacerdotes", "Un premio para los ricos"], "Pablo llama a ejercitarse para la piedad: una vida que agrada a Dios.", "1 Timoteo 4:7"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué Jesús es nuestro modelo en las disciplinas?", "Porque oraba, conocía las Escrituras, ayunaba, se congregaba y servía", ["Porque nunca las necesitó", "Porque solo las practicaba en público", "Porque las prohibió"], "Jesús entraba en la sinagoga el día de reposo, conforme a su costumbre, y leía las Escrituras.", "Lucas 4:16"],
      ["m1-03", 1, "o1", "recordar", "¿Por medio de qué somos salvos, según Efesios 2:8?", "Por gracia, por medio de la fe", ["Por las disciplinas", "Por el ayuno", "Por ir a la iglesia"], "Por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.", "Efesios 2:8"],
      ["m1-04", 1, "o1", "comprender", "¿Qué hace el legalismo con las disciplinas?", "Las convierte en reglas para ser aceptados o para aparentar", ["Las hace más gozosas", "Las une a la gracia", "Las enseña con amor"], "Jesús advirtió contra hacer la justicia para ser vistos.", "Mateo 6:1"],
      ["m1-05", 1, "o1", "recordar", "¿En qué debemos crecer, según 2 Pedro 3:18?", "En la gracia y el conocimiento de nuestro Señor Jesucristo", ["En fama", "En riquezas", "En poder político"], "Creced en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo.", "2 Pedro 3:18"],
      ["m1-06", 1, "o1", "aplicar", "¿Cuál es la mejor razón para leer la Biblia cada día?", "Conocer a Dios y ser transformado por Él", ["Que el pastor nos vea", "Ganar puntos con Dios", "Cumplir una obligación sin sentido"], "La vida eterna es conocer al único Dios verdadero y a Jesucristo, a quien Él envió.", "Juan 17:3"],
      ["m1-07", 2, "o2", "recordar", "¿Qué cuatro maneras de recibir la Palabra se estudian en la lección 2?", "Leer, estudiar, meditar y memorizar", ["Ver, oír, cantar y bailar", "Copiar, pegar, borrar y guardar", "Predicar, discutir, votar y juzgar"], "La Palabra se recibe leyéndola, estudiándola, meditándola y guardándola en el corazón.", "Salmos 1:2"],
      ["m1-08", 2, "o2", "comprender", "¿Qué significa escudriñar las Escrituras?", "Examinarlas con cuidado para ver si lo que se enseña es así", ["Leerlas de prisa", "Esconderlas", "Leer solo los títulos"], "Los de Berea escudriñaban cada día las Escrituras para ver si estas cosas eran así.", "Hechos 17:11"],
      ["m1-09", 2, "o2", "recordar", "¿Qué fruto da el árbol del Salmo 1?", "Da su fruto a su tiempo, y su hoja no cae", ["Da frutos amargos", "No da ningún fruto", "Da fruto solo un día"], "Es como árbol que da su fruto en su tiempo, y su hoja no cae.", "Salmos 1:3"],
      ["m1-10", 2, "o2", "comprender", "¿Para qué meditaba Josué en la ley, según Josué 1:8?", "Para hacer conforme a todo lo que en ella está escrito", ["Para ganar debates", "Para escribir un libro nuevo", "Para olvidarla"], "Meditar de día y de noche era para guardar y hacer conforme a todo lo escrito.", "Josué 1:8"],
      ["m1-11", 2, "o2", "aplicar", "¿Cuál es una pregunta útil para meditar un pasaje?", "¿Qué me enseña de Dios y qué me pide a mí?", ["¿Cuántas letras tiene?", "¿Qué dicen las noticias?", "¿Cómo lo uso contra otros?"], "El salmista pedía: Abre mis ojos, y miraré las maravillas de tu ley.", "Salmos 119:18"],
      ["m1-12", 2, "o2", "recordar", "Según 2 Timoteo 3:16, ¿cómo es dada toda la Escritura?", "Inspirada por Dios", ["Inventada por los hombres", "Copiada de otros libros", "Dictada por los reyes"], "Toda la Escritura es inspirada por Dios.", "2 Timoteo 3:16"],
      ["m1-13", 3, "o2", "recordar", "¿Cómo empieza el Padre Nuestro?", "Padre nuestro que estás en los cielos", ["Señor, ten piedad", "Gloria a Dios en las alturas", "Bendito el que viene"], "Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos.", "Mateo 6:9"],
      ["m1-14", 3, "o2", "comprender", "¿Qué dice Jesús sobre el ayuno en Mateo 6?", "Que se ayune delante del Padre, sin mostrarlo a los hombres", ["Que ayunar está prohibido", "Que hay que ayunar para presumir", "Que solo ayunen los fariseos"], "Cuando ayunes, que no lo vean los hombres, sino tu Padre que está en secreto.", "Mateo 6:16-18"],
      ["m1-15", 3, "o2", "recordar", "¿A quiénes apartó el Espíritu Santo en Antioquía mientras ayunaban?", "A Bernabé y a Saulo", ["A Pedro y a Juan", "A Timoteo y a Tito", "A Felipe y a Esteban"], "Dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra.", "Hechos 13:2"],
      ["m1-16", 3, "o2", "comprender", "¿Qué es un ayuno parcial?", "Dejar algunos alimentos por un tiempo para buscar a Dios", ["Comer el doble", "Ayunar solo de palabra", "Ayunar sin orar"], "Daniel no comió manjar delicado, ni carne ni vino, durante tres semanas.", "Daniel 10:3"],
      ["m1-17", 3, "o2", "recordar", "Según Isaías 58:7, ¿qué incluye el ayuno que Dios escogió?", "Compartir el pan con el hambriento", ["Encerrarse lejos de todos", "Dejar de trabajar para siempre", "Ofrecer animales en sacrificio"], "El ayuno que Dios escogió incluye partir el pan con el hambriento y acoger al pobre.", "Isaías 58:7"],
      ["m1-18", 3, "o2", "aplicar", "¿Cómo unir la oración y el ayuno esta semana?", "Elegir un tiempo y una necesidad, y dedicar a orar el tiempo de la comida", ["Ayunar sin orar", "Contarlo en las redes para que lo vean", "Ayunar para castigarse"], "El ayuno es delante del Padre que ve en lo secreto.", "Mateo 6:18"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿Qué significa adorar en verdad?", "Conforme a lo que Dios reveló de sí mismo en su Palabra", ["Con mucho volumen", "En un lugar especial", "Sin pensar en lo que se canta"], "Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren.", "Juan 4:24"],
      ["m2-02", 4, "o3", "recordar", "¿Qué hacían los primeros cristianos el primer día de la semana?", "Se reunían para partir el pan", ["Trabajaban sin descanso", "Iban a los templos de los gentiles", "No se reunían"], "El primer día de la semana, reunidos los discípulos para partir el pan, Pablo les enseñaba.", "Hechos 20:7"],
      ["m2-03", 4, "o3", "comprender", "¿Por qué los cristianos se reúnen el primer día de la semana?", "Porque es el día en que Jesús resucitó", ["Porque lo ordenó Moisés", "Porque era día de mercado", "Porque lo eligió Roma"], "Pasado el día de reposo, al amanecer del primer día de la semana, las mujeres hallaron la tumba vacía.", "Mateo 28:1"],
      ["m2-04", 4, "o3", "recordar", "¿Qué partes tiene la adoración con la iglesia?", "Alabar, orar, escuchar la Palabra y la Cena del Señor", ["Solo anuncios", "Solo música", "Solo ofrendas"], "La primera iglesia perseveraba en la doctrina, la comunión, el partimiento del pan y las oraciones.", "Hechos 2:42"],
      ["m2-05", 4, "o3", "comprender", "Según Romanos 12:1, ¿qué presentamos a Dios como culto?", "Nuestros cuerpos en sacrificio vivo", ["Un cordero cada semana", "Solo nuestras palabras", "Solo nuestras posesiones"], "Presentad vuestros cuerpos en sacrificio vivo, santo, agradable a Dios.", "Romanos 12:1"],
      ["m2-06", 4, "o3", "aplicar", "¿Cómo vivir el día del Señor como un regalo?", "Adorar con la iglesia, descansar y hacer el bien", ["Trabajar más que nunca", "Quedarse en casa sin buscar a Dios", "Llenarlo de reglas pesadas"], "El día de reposo fue hecho por causa del hombre: es un regalo de Dios.", "Marcos 2:27"],
      ["m2-07", 5, "o3", "recordar", "¿Qué es el silencio en las disciplinas?", "Apartarse un tiempo del ruido para estar atentos a Dios", ["No hablar nunca más", "Dejar la mente en blanco", "Enojarse con todos"], "Estad quietos, y conoced que yo soy Dios.", "Salmos 46:10"],
      ["m2-08", 5, "o3", "comprender", "¿Por qué el teléfono puede estorbar la vida espiritual?", "Porque llena de ruido y distrae del tiempo con Dios", ["Porque es pecado tenerlo", "Porque Dios no escucha a quien lo usa", "Nunca estorba"], "Mirad con diligencia cómo andéis, aprovechando bien el tiempo.", "Efesios 5:15-16"],
      ["m2-09", 5, "o3", "recordar", "¿Qué hizo Jesús después de un día de mucho trabajo, según Marcos 1:35?", "Se levantó muy de mañana para orar a solas", ["Se fue de viaje con sus amigos", "Dejó de predicar", "Se quedó durmiendo"], "Después de sanar a muchos, se levantó muy de mañana y se fue a un lugar desierto a orar.", "Marcos 1:35"],
      ["m2-10", 5, "o3", "comprender", "¿Qué ganamos al escribir lo que Dios hace en nuestra vida?", "Recordar sus obras y su fidelidad", ["Tener de qué presumir", "No tener que orar más", "Ganar la salvación"], "Me acordaré de las obras de Jehová; haré memoria de tus maravillas antiguas.", "Salmos 77:11"],
      ["m2-11", 5, "o3", "recordar", "¿Qué pide David en Salmos 139:24?", "Que Dios vea si hay en él camino de perversidad y lo guíe en el camino eterno", ["Que Dios lo haga rico", "Que Dios lo deje en paz", "Que Dios castigue a sus vecinos"], "Y ve si hay en mí camino de perversidad, y guíame en el camino eterno.", "Salmos 139:24"],
      ["m2-12", 5, "o3", "aplicar", "¿Cuándo es un buen momento para el examen del corazón?", "Al final del día, repasando lo vivido delante de Dios", ["Solo una vez al año", "Nunca: no hace falta", "Solo cuando otros nos acusan"], "Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová.", "Lamentaciones 3:40"],
      ["m2-13", 6, "o4", "recordar", "¿Quién vino no para ser servido sino para servir?", "El Hijo del Hombre, Jesús", ["Moisés", "El rey David", "Los fariseos"], "El Hijo del Hombre no vino para ser servido, sino para servir.", "Marcos 10:45"],
      ["m2-14", 6, "o4", "comprender", "¿De qué nos libra la generosidad?", "Del amor al dinero", ["De la necesidad de trabajar", "De la iglesia", "De ayudar a otros"], "Raíz de todos los males es el amor al dinero.", "1 Timoteo 6:10"],
      ["m2-15", 6, "o4", "recordar", "¿En qué perseveraba la primera iglesia, según Hechos 2:42?", "En la doctrina de los apóstoles, la comunión, el partimiento del pan y las oraciones", ["En los sacrificios, la circuncisión, las fiestas y los ayunos", "En la política, el comercio, la guerra y el deporte", "Solo en la oración"], "Perseveraban en la doctrina de los apóstoles, en la comunión, en el partimiento del pan y en las oraciones.", "Hechos 2:42"],
      ["m2-16", 6, "o4", "aplicar", "¿Qué incluiría un buen ritmo semanal?", "La adoración con la iglesia, un tiempo de servicio y, si se puede, un ayuno", ["Nada: solo importa el ritmo diario", "Faltar a la iglesia para descansar", "Ayunar los siete días"], "No dejando de congregarnos: la semana tiene su lugar para la iglesia.", "Hebreos 10:25"],
      ["m2-17", 6, "o4", "comprender", "¿Qué promete Gálatas 6:9 a quien no se cansa de hacer el bien?", "Que a su tiempo segará, si no desmaya", ["Que nunca tendrá problemas", "Que será famoso", "Que no tendrá que orar más"], "A su tiempo segaremos, si no desmayamos.", "Gálatas 6:9"],
      ["m2-18", 6, "o4", "aplicar", "¿Por qué conviene un plan sencillo?", "Porque un plan que se cumple ayuda a perseverar más que uno grande que se abandona", ["Porque Dios prefiere poco esfuerzo", "Porque las disciplinas no importan", "Porque así no hace falta la gracia"], "El que es fiel en lo muy poco, también en lo más es fiel.", "Lucas 16:10"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-disciplinas-e1",
      tipo: "corta",
      pregunta: "¿Qué son las disciplinas espirituales y por qué no son una forma de ganar el amor de Dios?",
      ideas: [
        { id: "habitos", peso: 20, texto: "Que son hábitos o prácticas que enseña la Biblia.", formas: ["habito*", "practica*", "ejercicio*", "ejercit*"] },
        { id: "crecer", peso: 25, texto: "Que sirven para conocer a Dios, crecer en la piedad y ser transformados.", formas: ["piedad", "crecer", "conocer a dios", "transform*", "acercar*"] },
        { id: "gracia", peso: 35, texto: "Que son medios de gracia: Dios ya nos ama en Cristo y somos salvos por gracia.", formas: ["gracia", "regalo", "ya nos ama", "no son meritos", "no se gana"] },
        { id: "jesus", peso: 10, texto: "Que Jesús las practicaba: es nuestro modelo.", formas: ["jesus", "cristo"] },
      ],
      citas: ["1 Timoteo 4:7-8", "Efesios 2:8-9", "Lucas 5:16", "2 Corintios 3:18", "Romanos 5:8"],
      pesoCita: 10,
      errores: [
        { id: "meritos", anula: "gracia", texto: "Las disciplinas no compran el amor de Dios: somos salvos por gracia, por medio de la fe (Efesios 2:8-9).", formas: ["ganar el amor de dios", "ganarse el amor", "ganar la salvacion", "ganarnos la salvacion"] },
      ],
      modelo:
        "Las disciplinas espirituales son hábitos bíblicos, como la oración y la lectura de la Palabra, que nos ayudan a conocer a Dios y crecer en la piedad (1 Timoteo 4:7-8). Son medios de gracia: Dios ya nos ama en Cristo y somos salvos por gracia, por eso las practicamos como Jesús, por amor.",
    },
    {
      id: "n2-disciplinas-e2",
      tipo: "corta",
      pregunta: "Explica lo que Jesús enseñó sobre la oración y el ayuno en Mateo 6.",
      ideas: [
        { id: "secreto", peso: 30, texto: "Que se ora al Padre en lo secreto, sin buscar ser vistos.", formas: ["secreto", "aposento", "a solas"] },
        { id: "padre", peso: 20, texto: "Que oramos a un Padre que escucha.", formas: ["padre"] },
        { id: "ayuno", peso: 30, texto: "Que el ayuno se hace con discreción, delante del Padre.", formas: ["ayun*", "unge*", "lava* rostro", "discre*"] },
        { id: "recompensa", peso: 10, texto: "Que el Padre que ve en lo secreto recompensa.", formas: ["recompens*"] },
      ],
      citas: ["Mateo 6:6", "Mateo 6:5-7", "Mateo 6:9-13", "Mateo 6:16-18", "Mateo 6:17-18"],
      pesoCita: 10,
      errores: [
        { id: "aparentar", anula: "secreto", texto: "Jesús enseñó lo contrario: orar y ayunar en lo secreto, sin buscar que nos vean (Mateo 6:5-6, 16-18).", formas: ["para que nos vean", "para que lo vean", "delante de todos para"] },
      ],
      modelo:
        "Jesús enseñó a orar al Padre en lo secreto, en el aposento, y prometió que el Padre que ve en lo secreto recompensará (Mateo 6:6). También enseñó a ayunar con discreción: ungir la cabeza y lavar el rostro, para que el ayuno sea delante del Padre (Mateo 6:17-18).",
    },
    {
      id: "n2-disciplinas-e3",
      tipo: "corta",
      pregunta: "¿Qué significa adorar a Dios en espíritu y en verdad, y cómo se vive la adoración fuera del templo?",
      ideas: [
        { id: "espiritu", peso: 25, texto: "En espíritu: con todo el corazón, guiados por el Espíritu Santo.", formas: ["corazon", "espiritu"] },
        { id: "verdad", peso: 25, texto: "En verdad: conforme a lo que Dios reveló en su Palabra.", formas: ["verdad", "palabra", "biblia", "revel*"] },
        { id: "vida", peso: 30, texto: "Que la adoración se vive en toda la vida: en la casa, en el trabajo, obedeciendo.", formas: ["toda la vida", "cada dia", "trabajo", "casa", "sacrificio vivo", "obedec*"] },
        { id: "iglesia", peso: 10, texto: "Que también se adora con la iglesia, el día del Señor.", formas: ["iglesia", "congreg*", "dia del senor"] },
      ],
      citas: ["Juan 4:23-24", "Romanos 12:1", "Colosenses 3:17", "Salmos 34:1", "Hebreos 10:24-25"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Adorar en espíritu es adorar con todo el corazón, guiados por el Espíritu Santo, y en verdad es adorar conforme a lo que Dios reveló en su Palabra (Juan 4:23-24). La adoración se vive en toda la vida, en la casa y en el trabajo, como sacrificio vivo, y también con la iglesia.",
    },
    {
      id: "n2-disciplinas-e4",
      tipo: "corta",
      pregunta: "Describe tu plan de disciplinas (tu regla de vida): qué harás cada día y cada semana, e incluye el servicio a otros.",
      ideas: [
        { id: "diario", peso: 30, texto: "Lo que hará cada día.", formas: ["cada dia", "diari*", "todos los dias", "manana", "noche"] },
        { id: "palabra", peso: 20, texto: "La Palabra y la oración.", formas: ["palabra", "biblia", "orar", "orare", "oracion"] },
        { id: "semana", peso: 20, texto: "Lo que hará cada semana: la iglesia, el día del Señor.", formas: ["cada semana", "semanal", "domingo", "dia del senor", "iglesia", "congreg*"] },
        { id: "servicio", peso: 20, texto: "El servicio a otros.", formas: ["servir", "servire", "servicio", "ayudar", "ayudando", "generos*"] },
      ],
      citas: ["Gálatas 6:9", "Salmos 5:3", "Hebreos 10:25", "Marcos 10:45", "Hechos 2:42"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Cada día leeré la Biblia y oraré por la mañana, y en la noche haré el examen del corazón. Cada semana adoraré con la iglesia el día del Señor y serviré ayudando en el ministerio de niños. Así perseveraré haciendo el bien (Gálatas 6:9).",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-disciplinas-b1",
    tipo: "breve",
    pregunta:
      "Escribe con tus palabras cómo cultivarás tu vida con Dios en los próximos meses: qué disciplinas practicarás, por qué son medios de gracia y no méritos, y cómo te ayudarán a parecerte a Jesús. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "gracia", peso: 15, texto: "Que las disciplinas son medios de gracia, no méritos.", formas: ["gracia", "regalo", "medios de gracia"] },
      { id: "palabra", peso: 15, texto: "La Palabra: leer, estudiar, meditar o memorizar.", formas: ["palabra", "biblia", "leer", "meditar", "memoriz*"] },
      { id: "oracion", peso: 15, texto: "La oración y el ayuno.", formas: ["orar", "oracion", "ayun*"] },
      { id: "adoracion", peso: 15, texto: "La adoración y la iglesia.", formas: ["adorar", "adoracion", "iglesia", "congreg*", "dia del senor"] },
      { id: "silencio", peso: 10, texto: "El silencio, la soledad o el diario espiritual.", formas: ["silencio", "soledad", "diario", "a solas"] },
      { id: "servicio", peso: 15, texto: "El servicio y la generosidad.", formas: ["servir", "servicio", "generos*", "dar"] },
      { id: "plan", peso: 10, texto: "Un plan para perseverar.", formas: ["plan", "cada dia", "cada semana", "persever*", "ritmo*", "regla de vida"] },
      { id: "jesus", peso: 10, texto: "Parecerse a Jesús.", formas: ["jesus", "cristo", "parecerme", "imagen"] },
    ],
    basta: 85,
    citas: ["1 Timoteo 4:7-8", "Efesios 2:8-9", "Lucas 5:16", "Josué 1:8", "Mateo 6:6", "Juan 4:23-24", "Marcos 1:35", "Marcos 10:45", "Gálatas 6:9", "2 Corintios 3:18"],
    pesoCita: 10,
    errores: [],
    modelo:
      "En los próximos meses quiero cultivar mi vida con Dios con un plan sencillo. Las disciplinas son medios de gracia: Dios ya me ama en Cristo y por gracia soy salvo (Efesios 2:8-9), así que las practico para conocerlo, como dice 1 Timoteo 4:7-8, que me llama a ejercitarme para la piedad. Cada día leeré la Biblia por la mañana y meditaré en un versículo, como Josué meditaba en la ley de día y de noche. Oraré al Padre en lo secreto, y una vez al mes haré un ayuno para buscarlo con más intensidad. Cada semana adoraré con la iglesia el día del Señor y serviré en el ministerio de niños, porque Jesús vino a servir (Marcos 10:45). También apartaré un rato a solas para escribir en mi diario lo que Dios me enseña. Con este plan, y perseverando sin cansarme, el Espíritu me irá transformando a la imagen de Jesús, de gloria en gloria (2 Corintios 3:18).",
  },
};
