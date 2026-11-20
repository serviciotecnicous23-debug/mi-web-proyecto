/**
 * El banco de «Planificación y proyectos ministeriales» (especialidad Liderazgo y administración, materia 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 planificar con fe · o2 la visión, la misión y los valores · o3 las metas y el plan del año · o4 un proyecto
 * de principio a fin · o5 el cronograma, los riesgos y el presupuesto · o6 evaluar y aprender · o7 el versículo de memoria
 * (Proverbios 16:9). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de
 * casos, y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `liderazgo-administracion-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_LIDERAZGO_ADMINISTRACION_4: BancoMateria = {
  materia: "liderazgo-administracion-4",
  repaso: {
    "liderazgo-administracion-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué hace Jehová con los pasos del que piensa su camino, según Proverbios 16:9?", "Los endereza", ["Los detiene", "Los ignora", "Los borra"], "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
      ["1-r2", 1, "o1", "comprender", "¿Qué corrige Santiago 4:13-15 al que hace planes?", "El orgullo de planear sin Dios, y enseña a decir si el Señor quiere", ["Que haga planes", "Que trabaje", "Que viaje"], "«En lugar de lo cual deberíais decir: Si el Señor quiere, viviremos y haremos esto o aquello».", "Santiago 4:13-15"],
      ["1-r3", 1, "o1", "aplicar", "Tu consejo quiere planear el año que viene, pero cada uno trae una lista de cosas que le gustan. ¿Cómo empiezas?", "Con oración, repasando el año que termina y escuchando las necesidades antes de elegir pocas metas", ["Votando la lista más larga", "Dejando que el pastor decida solo", "Sin planear nada"], "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
    ] as P[]).map(p),
    "liderazgo-administracion-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué le mandó Dios hacer con la visión, según Habacuc 2:2?", "Escribirla y declararla en tablas, para que corra el que la leyere", ["Guardarla en secreto", "Olvidarla", "Decirla solo al rey"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
      ["2-r2", 2, "o2", "comprender", "¿Qué diferencia hay entre la misión y la visión de un ministerio?", "La misión dice para qué existe; la visión muestra cómo se verá en unos años", ["Son lo mismo", "La misión es un sueño y la visión una ley", "La visión es el presupuesto"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19-20"],
      ["2-r3", 2, "o2", "aplicar", "Tu ministerio tiene una visión escrita en un cuadro, pero nadie la recuerda. ¿Qué haces?", "La acortas para que se diga de memoria y la repites en las reuniones y al tomar decisiones", ["La quitas", "La alargas", "La dejas igual"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ] as P[]).map(p),
    "liderazgo-administracion-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Hacia qué proseguía Pablo, según Filipenses 3:14?", "A la meta, al premio del supremo llamamiento de Dios en Cristo Jesús", ["A la fama", "A una ciudad", "Al descanso"], "«prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús».", "Filipenses 3:13-14"],
      ["3-r2", 3, "o3", "comprender", "¿Qué significa que una meta sea SMART?", "Que es específica, medible, asignable, realista y con tiempo", ["Que es fácil", "Que es secreta", "Que no tiene fecha"], "«Así que, yo de esta manera corro, no como a la ventura».", "1 Corintios 9:26"],
      ["3-r3", 3, "o3", "aplicar", "Un líder dice que su meta para el año es crecer. ¿Cómo lo ayudas?", "Lo ayudas a decir qué, cuánto, quién y para cuándo, por ejemplo 15 jóvenes nuevos para julio", ["Le dices que está bien así", "Le pides que no ponga metas", "Le das tu propia meta"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    ] as P[]).map(p),
    "liderazgo-administracion-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿En cuántos días se terminó el muro, según Nehemías 6:15?", "En cincuenta y dos días", ["En siete días", "En un año", "En cuarenta años"], "«Fue terminado, pues, el muro, el veinticinco del mes de Elul, en cincuenta y dos días».", "Nehemías 6:15"],
      ["4-r2", 4, "o4", "comprender", "¿Qué es un proyecto, según la guía PMBOK?", "Un esfuerzo temporal para crear un producto, un servicio o un resultado único", ["Una tarea de todos los días", "Un sueño sin fecha", "Una reunión"], "El muro tuvo comienzo y final: «Fue terminado, pues, el muro».", "Nehemías 6:15"],
      ["4-r3", 4, "o4", "aplicar", "Tu iglesia remodela el salón: empezó con pintar y ya quieren cambiar el piso, el techo y los baños. ¿Qué haces?", "Vuelves al alcance aprobado, y cualquier cambio se decide con el consejo con su costo", ["Agregas todo", "Paras la obra para siempre", "Dejas que cada uno decida"], "Cada grupo sabía su parte: «edificaron la puerta de las Ovejas».", "Nehemías 3:1"],
    ] as P[]).map(p),
    "liderazgo-administracion-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué dirán del que empezó a edificar sin calcular, según Lucas 14:30?", "Este hombre comenzó a edificar, y no pudo acabar", ["Qué gran obra", "Qué hombre tan rico", "Nada"], "«diciendo: Este hombre comenzó a edificar, y no pudo acabar».", "Lucas 14:29-30"],
      ["5-r2", 5, "o5", "comprender", "¿Qué lleva el cronograma de un proyecto?", "Las tareas, su responsable, sus fechas y las que dependen de otras", ["Solo la fecha final", "Los nombres de los que no ayudan", "Nada escrito"], "«Porque con ingenio harás la guerra».", "Proverbios 24:6"],
      ["5-r3", 5, "o5", "aplicar", "Tienes la escuela bíblica en dos semanas y el material no ha llegado. ¿Qué haces?", "Usas el plan B que se previó, como un material sencillo hecho en la iglesia, y avisas al equipo", ["Cancelas todo", "Esperas sin hacer nada", "Culpas al proveedor en público"], "La mitad de los siervos «tenía lanzas, escudos, arcos y corazas»: un plan ante el peligro.", "Nehemías 4:16"],
    ] as P[]).map(p),
    "liderazgo-administracion-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué refirieron Pablo y Bernabé a la iglesia, según Hechos 14:27?", "Cuán grandes cosas había hecho Dios con ellos", ["Lo cansados que estaban", "Lo que les costó el viaje", "Sus quejas"], "«refirieron cuán grandes cosas había hecho Dios con ellos».", "Hechos 14:27"],
      ["6-r2", 6, "o6", "comprender", "¿Qué cuatro preguntas ayudan a evaluar un proyecto?", "Qué funcionó, qué no, qué aprendimos y qué cambiaremos", ["Quién tuvo la culpa", "Cuánto nos aplaudieron", "Ninguna"], "«Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová».", "Lamentaciones 3:40"],
      ["6-r3", 6, "o6", "aplicar", "Tu escuela bíblica tuvo 65 niños de los 80 que se esperaban. ¿Qué pones en el informe?", "Los números honestos, lo que funcionó, lo que no y lo que se cambiará el próximo año", ["Que vinieron 100", "Que fue un fracaso total", "Nada, para no desanimar"], "«Examinaos a vosotros mismos».", "2 Corintios 13:5"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Planificar con fe
    ["f01", 1, "o1", "recordar", "¿Qué piensa el corazón del hombre, según Proverbios 16:9?", "Su camino", ["Su riqueza", "Su fama", "Nada"], "«El corazón del hombre piensa su camino».", "Proverbios 16:9"],
    ["f02", 1, "o1", "recordar", "¿Qué es nuestra vida, según Santiago 4:14?", "Neblina que se aparece por un poco de tiempo, y luego se desvanece", ["Una roca firme", "Un río sin fin", "Una torre alta"], "«Ciertamente es neblina que se aparece por un poco de tiempo, y luego se desvanece».", "Santiago 4:13-15"],
    ["f03", 1, "o1", "comprender", "¿Planear es falta de fe?", "No: la Biblia guía al que planea con humildad y pone su plan delante de Dios", ["Sí, siempre", "Solo si el plan es largo", "Solo para los pastores"], "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
    ["f04", 1, "o1", "comprender", "¿Cuál es el ciclo de la planificación?", "Orar, mirar dónde estamos, decidir adónde vamos, cómo llegar y con qué, y revisar", ["Gastar, pedir y esperar", "Copiar el plan de otra iglesia", "Decidir solo y avisar"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    ["f05", 1, "o1", "comprender", "¿Por qué la planificación empieza con oración?", "Porque se busca primero la voluntad de Dios y no solo lo que nos gusta", ["Porque así es la costumbre", "Para que dure más", "No empieza con oración"], "«Si el Señor quiere, viviremos y haremos esto o aquello».", "Santiago 4:13-15"],
    ["f06", 1, "o1", "analizar", "¿Qué pasa cuando el plan se vuelve más importante que la obediencia?", "Se planea sin Dios, con orgullo, y se resiste a lo que él va mostrando", ["Todo sale mejor", "Nada", "La iglesia crece siempre"], "«¡Vamos ahora! los que decís: Hoy y mañana iremos a tal ciudad».", "Santiago 4:13-15"],
    ["f07", 1, "o1", "aplicar", "Un líder hizo solo el plan del año y lo presentó terminado. ¿Qué le sugieres?", "Que lo revise con el equipo y el pastor, en oración, y lo ajuste con su consejo", ["Que lo imponga", "Que lo tire", "Que no planee más"], "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
    ["f08", 1, "o1", "aplicar", "Tu consejo ve, a mitad de año, que Dios abre una puerta que no estaba en el plan. ¿Qué hace?", "La pones en oración con el consejo y ajustas el plan con humildad", ["La ignoras porque no estaba en el plan", "Cambias todo sin consultar", "Esperas al año siguiente sin pensarlo"], "«Si el Señor quiere, viviremos y haremos esto o aquello».", "Santiago 4:13-15"],
    ["f09", 1, "o1", "evaluar", "¿Qué retiro de planificación está mejor hecho?", "Uno que ora, repasa el año, escucha las necesidades, recuerda la visión, elige tres metas con responsables y fija fechas de revisión", ["Uno que hace una lista de deseos", "Uno donde decide solo el que habla más", "Uno sin oración ni fechas"], "«Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
    ["f10", 1, "o7", "recordar", "Completa Proverbios 16:9: El corazón del hombre piensa su camino…", "Mas Jehová endereza sus pasos", ["Y el hombre llega a su destino", "Mas el viento lo lleva lejos", "Y nadie lo detiene"], "«El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
    // Lección 2 · La visión, la misión y los valores
    ["f11", 2, "o2", "recordar", "¿Qué mandó Jesús hacer en todas las naciones, según Mateo 28:19?", "Hacer discípulos", ["Construir templos", "Fundar escuelas", "Juntar dinero"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19-20"],
    ["f12", 2, "o2", "recordar", "¿Qué respondió el pueblo a Nehemías, según Nehemías 2:18?", "Levantémonos y edifiquemos", ["Volvamos a Babilonia", "No podemos", "Que lo haga el rey"], "«Y dijeron: Levantémonos y edifiquemos. Así esforzaron sus manos para bien».", "Nehemías 2:17-18"],
    ["f13", 2, "o2", "recordar", "¿Con quién está Jesús todos los días, según Mateo 28:20?", "Con sus discípulos, hasta el fin del mundo", ["Con los reyes", "Con nadie", "Solo con los apóstoles"], "«y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo».", "Mateo 28:19-20"],
    ["f14", 2, "o2", "comprender", "¿Qué son los valores de un ministerio?", "Lo que guía cómo se trabaja, como la Palabra, la protección, el servicio y el trabajo en equipo", ["El dinero que tiene", "Los muebles del salón", "Las metas del año"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f15", 2, "o2", "comprender", "¿Por qué la misión, la visión y los valores se escriben cortos?", "Para que el equipo los diga de memoria y los use al decidir", ["Para gastar menos papel", "Porque no importan", "Para esconderlos"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f16", 2, "o2", "analizar", "¿Por qué una visión clara ayuda a decir que no?", "Porque muestra qué sirve a la dirección del ministerio y qué la distrae", ["Porque todo es igual", "No ayuda", "Porque prohíbe todo"], "«Escribe la visión, y declárala en tablas, para que corra el que leyere en ella».", "Habacuc 2:2"],
    ["f17", 2, "o2", "aplicar", "Un ministerio escribió como visión: queremos ser un ministerio de impacto. ¿Qué le sugieres?", "Que diga cómo se verá en unos años, por ejemplo, que cada joven tenga un mentor en dos años", ["Que la deje así", "Que la haga más larga", "Que no tenga visión"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
    ["f18", 2, "o2", "aplicar", "Tienes que presentar la visión del ministerio a todo el grupo. ¿Cómo lo haces?", "Con una historia que la ilustre y repitiéndola en cada reunión", ["Leyéndola una sola vez", "Mandándola por correo y ya", "Sin explicarla"], "Nehemías «les declaré cómo la mano de mi Dios había sido buena sobre mí».", "Nehemías 2:17-18"],
    ["f19", 2, "o2", "aplicar", "Un ministerio quiere ir en una dirección distinta de la visión de la iglesia. ¿Qué haces?", "Lo conversas con el pastor, para que la visión del ministerio se alinee con la de la iglesia", ["Lo dejas ir solo", "Lo cierras sin hablar", "Cambias la visión de la iglesia"], "«enseñándoles que guarden todas las cosas que os he mandado».", "Mateo 28:19-20"],
    ["f20", 2, "o2", "evaluar", "¿Qué manera de escribir la visión de un ministerio es la mejor?", "Con el equipo y el pastor, en oración, corta, clara, alineada con la iglesia y repetida", ["La escribe uno solo y la impone", "Una larga que nadie recuerda", "Una copiada de otra iglesia"], "«Levantémonos y edifiquemos».", "Nehemías 2:17-18"],
    // Lección 3 · Las metas y el plan del año
    ["f21", 3, "o3", "recordar", "¿Cómo no corría Pablo, según 1 Corintios 9:26?", "Como a la ventura", ["Con fe", "Con esfuerzo", "Con otros"], "«Así que, yo de esta manera corro, no como a la ventura».", "1 Corintios 9:26"],
    ["f22", 3, "o3", "recordar", "¿Qué olvidaba Pablo, según Filipenses 3:13?", "Lo que queda atrás", ["A sus amigos", "La Palabra", "A Dios"], "«olvidando ciertamente lo que queda atrás, y extendiéndome a lo que está delante».", "Filipenses 3:13-14"],
    ["f23", 3, "o3", "recordar", "¿Cómo no pelea Pablo, según 1 Corintios 9:26?", "Como quien golpea el aire", ["Con fuerza", "Con fe", "En equipo"], "«de esta manera peleo, no como quien golpea el aire».", "1 Corintios 9:26"],
    ["f24", 3, "o3", "comprender", "¿Quién propuso las metas SMART y cuándo?", "George T. Doran, en la revista Management Review, en 1981", ["Moisés en el desierto", "Un rey de Babilonia", "Nadie sabe"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    ["f25", 3, "o3", "comprender", "¿Cuántas metas suele bastar a un ministerio para un año?", "Pocas, de tres a cinco, bien cumplidas", ["Treinta o más", "Ninguna", "Una por semana"], "«yo de esta manera corro, no como a la ventura».", "1 Corintios 9:26"],
    ["f26", 3, "o3", "analizar", "¿Por qué una meta en la iglesia mide lo que podemos hacer, pero no el fruto espiritual?", "Porque el fruto lo da Dios, y la meta ordena nuestro trabajo", ["Porque Dios no da fruto", "Porque las metas lo miden todo", "No hay diferencia"], "«prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús».", "Filipenses 3:13-14"],
    ["f27", 3, "o3", "aplicar", "Tu ministerio de niños quiere que los niños conozcan mejor la Biblia. ¿Cómo lo vuelves una meta?", "Que los niños de 6 a 11 años memoricen 20 versículos de enero a noviembre, a cargo de una coordinadora", ["Que lean más", "Que conozcan todo", "Que sean buenos"], "«Así que, yo de esta manera corro, no como a la ventura».", "1 Corintios 9:26"],
    ["f28", 3, "o3", "aplicar", "Un equipo se puso diez metas y no cumplió ninguna. ¿Qué le aconsejas para el próximo año?", "Elegir pocas metas, de tres a cinco, con responsables y fechas, y revisarlas cada trimestre", ["Ponerse veinte", "No ponerse metas", "Repetir las diez"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
    ["f29", 3, "o3", "aplicar", "Tienes una meta y necesitas ponerla en el plan del año. ¿Qué agregas?", "El calendario, los materiales, su costo en el presupuesto y una revisión cada trimestre", ["Solo la fecha final", "Nada más", "Una oración y listo"], "«Mas todo el que se apresura alocadamente, de cierto va a la pobreza».", "Proverbios 21:5"],
    ["f30", 3, "o3", "evaluar", "¿Qué meta está mejor escrita?", "Repartir 100 despensas en noviembre, con un equipo de 12 voluntarios a cargo de la diaconisa Ana", ["Servir más al barrio", "Ayudar a muchos algún día", "Hacer algo bueno"], "«prosigo a la meta».", "Filipenses 3:13-14"],
    // Lección 4 · Un proyecto de principio a fin
    ["f31", 4, "o4", "recordar", "¿Qué hizo Nehemías cuando el rey le preguntó qué pedía, según Nehemías 2:4?", "Oró al Dios de los cielos", ["Se fue corriendo", "Pidió oro", "Se quedó callado"], "«Me dijo el rey: ¿Qué cosa pides? Entonces oré al Dios de los cielos».", "Nehemías 2:4-5"],
    ["f32", 4, "o4", "recordar", "¿Qué puerta edificó el sumo sacerdote Eliasib con sus hermanos, según Nehemías 3:1?", "La puerta de las Ovejas", ["La puerta del Pescado", "La puerta del Valle", "La puerta del Muladar"], "«y edificaron la puerta de las Ovejas».", "Nehemías 3:1"],
    ["f33", 4, "o4", "recordar", "¿Qué le pidió Nehemías al rey, según Nehemías 2:5?", "Que lo enviara a Judá para reedificar la ciudad", ["Que le diera un palacio", "Que lo hiciera general", "Que lo dejara descansar"], "«envíame a Judá, a la ciudad de los sepulcros de mis padres, y la reedificaré».", "Nehemías 2:4-5"],
    ["f34", 4, "o4", "comprender", "¿Cuáles son las etapas de un proyecto?", "Iniciar, planear, ejecutar, controlar y cerrar", ["Empezar y olvidar", "Gastar y esperar", "Soñar y hablar"], "«Fue terminado, pues, el muro».", "Nehemías 6:15"],
    ["f35", 4, "o4", "comprender", "¿Qué es el alcance de un proyecto?", "Lo que entra y lo que no entra en el proyecto", ["El dinero del proyecto", "La fecha final", "El nombre del responsable"], "Cada grupo sabía qué parte le tocaba: «edificaron la puerta de las Ovejas».", "Nehemías 3:1"],
    ["f36", 4, "o4", "analizar", "¿Por qué un proyecto sin alcance claro tiende a no terminar?", "Porque se le van agregando trabajos, crecen los gastos y nadie sabe cuándo termina", ["Porque los proyectos nunca terminan", "Porque falta oración", "No es así"], "«Fue terminado, pues, el muro, el veinticinco del mes de Elul».", "Nehemías 6:15"],
    ["f37", 4, "o4", "aplicar", "Te nombran responsable de una campaña en el barrio. ¿Qué haces primero?", "Escribes el propósito, el resultado que se espera y el alcance, y formas el equipo", ["Compras materiales", "Anuncias la fecha sin planear", "Trabajas solo"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4-5"],
    ["f38", 4, "o4", "aplicar", "Alguien propone, en medio del proyecto, agregar comida completa para los niños. ¿Qué haces?", "Lo llevas al consejo con su costo y su efecto en el tiempo, y se decide si entra en el alcance", ["Lo agregas sin decir nada", "Lo rechazas sin pensar", "Dejas que lo decida cualquiera"], "Cada grupo edificó su tramo: «edificaron la puerta de las Ovejas».", "Nehemías 3:1"],
    ["f39", 4, "o4", "aplicar", "Un proyecto terminó y todos quieren pasar al siguiente. ¿Qué le falta?", "Cerrarlo: agradecer, evaluar y guardar lo aprendido", ["Nada", "Empezar otro igual", "Borrar los papeles"], "«Fue terminado, pues, el muro».", "Nehemías 6:15"],
    ["f40", 4, "o4", "evaluar", "¿Qué manera de llevar un proyecto ministerial es la mejor?", "Con propósito y alcance claros, un responsable, tareas, cronograma, presupuesto y riesgos, revisión cada semana y un cierre con evaluación", ["Empezar y ver qué pasa", "Que todo lo haga una persona", "Planear sin revisar nunca"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4-5"],
    // Lección 5 · El cronograma, los riesgos y el presupuesto
    ["f41", 5, "o5", "recordar", "¿Qué tenía la mitad de los siervos de Nehemías, según Nehemías 4:16?", "Lanzas, escudos, arcos y corazas", ["Palas y martillos", "Oro y plata", "Nada"], "«y la otra mitad tenía lanzas, escudos, arcos y corazas».", "Nehemías 4:16"],
    ["f42", 5, "o5", "recordar", "¿Dónde está la victoria, según Proverbios 24:6?", "En la multitud de consejeros", ["En la fuerza", "En el dinero", "En la soledad"], "«Y en la multitud de consejeros está la victoria».", "Proverbios 24:6"],
    ["f43", 5, "o5", "recordar", "¿Qué harán los que vean una obra sin terminar, según Lucas 14:29?", "Comenzarán a hacer burla de él", ["Lo ayudarán", "Lo aplaudirán", "No dirán nada"], "«todos los que lo vean comiencen a hacer burla de él».", "Lucas 14:29-30"],
    ["f44", 5, "o5", "comprender", "¿Qué lleva la lista de riesgos de un proyecto?", "Qué puede retrasarlo o encarecerlo, qué tan probable es, cómo se previene y el plan B", ["Los nombres de los culpables", "Solo los costos", "Nada"], "La mitad de los siervos vigilaba: un plan ante el peligro.", "Nehemías 4:16"],
    ["f45", 5, "o5", "comprender", "¿Para qué sirve el margen para los imprevistos en el presupuesto del proyecto?", "Para que un gasto inesperado no detenga la obra", ["Para gastarlo en lo que sea", "No sirve", "Para pagar al responsable"], "«no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».", "Lucas 14:28"],
    ["f46", 5, "o5", "analizar", "¿Por qué el cronograma marca las tareas que dependen de otras?", "Porque si una se atrasa, atrasa a las que vienen después", ["Para que se vea bonito", "No hace falta", "Para que todos trabajen al mismo tiempo"], "«Porque con ingenio harás la guerra».", "Proverbios 24:6"],
    ["f47", 5, "o5", "aplicar", "Tienes un electricista que avisa que llegará dos semanas tarde a la remodelación. ¿Qué haces?", "Revisas qué tareas dependen de él, ajustas el cronograma y avisas al consejo", ["Lo dejas y no avisas", "Cambias las luces tú sin licencia", "Cancelas toda la obra"], "«Y en la multitud de consejeros está la victoria».", "Proverbios 24:6"],
    ["f48", 5, "o5", "aplicar", "Tu proyecto ya gastó el ochenta por ciento del presupuesto y va por la mitad. ¿Qué haces?", "Lo informas con tiempo y decides con el consejo si se recorta, se mueve la fecha o se busca más dinero", ["Lo escondes", "Pides un préstamo sin decir nada", "Sigues gastando igual"], "«Este hombre comenzó a edificar, y no pudo acabar».", "Lucas 14:29-30"],
    ["f49", 5, "o5", "aplicar", "Tienes que armar la lista de riesgos de un evento al aire libre. ¿Qué pones?", "Que llueva, que falten voluntarios o que algo se atrase, con un plan B para cada uno", ["Nada, porque Dios cuida", "Solo el clima", "Los nombres de los que pueden fallar"], "La mitad trabajaba y «la otra mitad tenía lanzas, escudos, arcos y corazas».", "Nehemías 4:16"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de seguir un proyecto es la mejor?", "Un cronograma con dependencias, una lista de riesgos con plan B, un presupuesto con margen, revisión cada semana y los cambios decididos con el consejo", ["Revisarlo al final", "Improvisar en cada crisis", "Que lo siga cada uno por su lado"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
    // Lección 6 · Evaluar y aprender
    ["f51", 6, "o6", "recordar", "¿Qué pide Lamentaciones 3:40 que escudriñemos?", "Nuestros caminos", ["Los caminos de otros", "Las estrellas", "Las riquezas"], "«Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová».", "Lamentaciones 3:40"],
    ["f52", 6, "o6", "recordar", "¿Qué pide examinar 2 Corintios 13:5?", "Si estamos en la fe", ["Si tenemos dinero", "Si somos famosos", "Si los demás fallan"], "«Examinaos a vosotros mismos si estáis en la fe».", "2 Corintios 13:5"],
    ["f53", 6, "o6", "recordar", "¿Qué había abierto Dios a los gentiles, según Hechos 14:27?", "La puerta de la fe", ["La puerta del templo", "Una ciudad", "Un camino al mar"], "«y cómo había abierto la puerta de la fe a los gentiles».", "Hechos 14:27"],
    ["f54", 6, "o6", "comprender", "¿Qué se revisa al evaluar un proyecto?", "Las metas con números honestos, el tiempo, el dinero y el trabajo del equipo", ["Solo quién falló", "Solo los aplausos", "Nada"], "«Escudriñemos nuestros caminos».", "Lamentaciones 3:40"],
    ["f55", 6, "o6", "comprender", "¿Por qué se cuenta a la iglesia lo que Dios hizo en un proyecto?", "Para dar gracias a Dios y animar a la iglesia, como Pablo y Bernabé en Antioquía", ["Para presumir", "No se cuenta", "Para pedir más dinero"], "«refirieron cuán grandes cosas había hecho Dios con ellos».", "Hechos 14:27"],
    ["f56", 6, "o6", "analizar", "¿Por qué una evaluación que busca culpables no ayuda?", "Porque la gente esconde los errores, y así no se aprende ni se mejora", ["Porque los culpables no existen", "Sí ayuda", "Porque es muy rápida"], "«Examinaos a vosotros mismos».", "2 Corintios 13:5"],
    ["f57", 6, "o6", "aplicar", "Un líder quiere decir en el informe que vinieron 100 niños, pero vinieron 65. ¿Qué le dices?", "Que los números se cuentan con verdad, sin inflarlos, y se ponen delante de Dios", ["Que ponga 100", "Que no ponga números", "Que ponga 200"], "«Examinaos a vosotros mismos si estáis en la fe».", "2 Corintios 13:5"],
    ["f58", 6, "o6", "aplicar", "Tu equipo terminó un proyecto y quiere pasar enseguida al siguiente. ¿Qué propones?", "Reunirse una semana después a evaluar con las cuatro preguntas y guardar lo aprendido", ["Pasar al siguiente sin mirar atrás", "Cancelar el siguiente", "Que evalúe solo el pastor"], "«Escudriñemos nuestros caminos, y busquemos, y volvámonos a Jehová».", "Lamentaciones 3:40"],
    ["f59", 6, "o6", "aplicar", "Tienes la historia de una familia que llegó por la escuela bíblica y quieres contarla en el culto. ¿Qué haces antes?", "Le pides permiso a la familia para contar su historia", ["La cuentas sin preguntar", "Inventas los detalles", "Pones su foto sin avisar"], "«refirieron cuán grandes cosas había hecho Dios con ellos».", "Hechos 14:27"],
    ["f60", 6, "o6", "evaluar", "¿Qué evaluación de un proyecto está mejor hecha?", "Una con oración y gratitud, números honestos, las cuatro preguntas, un informe breve guardado y la celebración de lo que Dios hizo", ["Una que busca culpables", "Una que infla los números", "Ninguna, para ahorrar tiempo"], "«Escudriñemos nuestros caminos».", "Lamentaciones 3:40"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué no sabemos, según Santiago 4:14?", "Lo que será mañana", ["Quién es Dios", "Dónde vivimos", "Cómo orar"], "«cuando no sabéis lo que será mañana».", "Santiago 4:13-15"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué se planea con el equipo y no a solas?", "Porque en la multitud de consejeros los planes se afirman, y el equipo se une a lo que ayudó a decidir", ["Porque el líder no sabe", "No hace falta el equipo", "Para que tarde más"], "«El corazón del hombre piensa su camino».", "Proverbios 16:9"],
      ["m1-03", 1, "o1", "aplicar", "Un hermano dice que planear el año es no confiar en Dios. ¿Qué le respondes?", "Que la Biblia guía al que planea con humildad, diciendo si el Señor quiere", ["Que tiene razón", "Que no hay que orar", "Que solo planean los incrédulos"], "«Si el Señor quiere, viviremos y haremos esto o aquello».", "Santiago 4:13-15"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué se mira primero dónde estamos antes de decidir adónde vamos?", "Porque sin saber qué funciona y qué falta, el plan no responde a la realidad", ["Para no hacer nada", "No hace falta", "Para criticar"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["m1-05", 1, "o1", "recordar", "¿Qué decían los que planeaban sin Dios, según Santiago 4:13?", "Hoy y mañana iremos a tal ciudad, y estaremos allá un año", ["Si el Señor quiere", "Oremos primero", "Nada"], "«los que decís: Hoy y mañana iremos a tal ciudad, y estaremos allá un año».", "Santiago 4:13-15"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué manera de planear en la iglesia es la mejor?", "Con oración, con el equipo, mirando la realidad, con pocas metas y revisando con humildad", ["Sin oración y con muchas metas", "Uno solo, sin consultar", "Sin plan, para dejar todo a Dios"], "«Mas Jehová endereza sus pasos».", "Proverbios 16:9"],
      ["m1-07", 2, "o2", "recordar", "¿Qué mandó Jesús enseñar a los discípulos, según Mateo 28:20?", "Que guarden todas las cosas que él les mandó", ["Que guarden sus riquezas", "Que se queden en casa", "Que no hablen"], "«enseñándoles que guarden todas las cosas que os he mandado».", "Mateo 28:19-20"],
      ["m1-08", 2, "o2", "comprender", "¿Qué hace la visión de un ministerio?", "Muestra cómo se verá en unos años si Dios bendice", ["Dice cuánto dinero hay", "Describe el edificio", "Nada"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
      ["m1-09", 2, "o2", "aplicar", "Tu ministerio va a escribir sus valores. ¿Cuántos eliges?", "Tres o cuatro, que guíen cómo trabaja el equipo", ["Veinte", "Ninguno", "Los que tenga otra iglesia"], "«para que corra el que leyere en ella».", "Habacuc 2:2"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué Nehemías contó lo que Dios había hecho antes de pedir que edificaran?", "Porque recordar la mano de Dios da ánimo para emprender la obra", ["Para presumir", "Por costumbre", "No lo contó"], "«Entonces les declaré cómo la mano de mi Dios había sido buena sobre mí».", "Nehemías 2:17-18"],
      ["m1-11", 2, "o2", "comprender", "¿De dónde viene la misión de la iglesia?", "De Jesús, que mandó hacer discípulos a todas las naciones", ["De una encuesta", "Del pastor solo", "De otra iglesia"], "«Por tanto, id, y haced discípulos a todas las naciones».", "Mateo 28:19-20"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué visión de un ministerio de jóvenes está mejor escrita?", "Que en tres años cada joven tenga un mentor y sirva en un ministerio", ["Ser el mejor ministerio", "Tener impacto", "Crecer mucho"], "«Escribe la visión, y declárala en tablas».", "Habacuc 2:2"],
      ["m1-13", 3, "o3", "recordar", "¿A qué se extendía Pablo, según Filipenses 3:13?", "A lo que está delante", ["A lo que queda atrás", "A su ciudad", "A sus amigos"], "«y extendiéndome a lo que está delante».", "Filipenses 3:13-14"],
      ["m1-14", 3, "o3", "comprender", "¿Qué quiere decir que una meta sea asignable?", "Que tiene un responsable", ["Que es secreta", "Que no tiene fecha", "Que la hacen todos sin orden"], "«yo de esta manera corro, no como a la ventura».", "1 Corintios 9:26"],
      ["m1-15", 3, "o3", "aplicar", "Un ministerio quiere repartir despensas, pero no dice cuántas ni cuándo. ¿Qué le sugieres?", "Que diga cuántas, cuándo y con cuántos voluntarios, por ejemplo 100 en noviembre con 12", ["Que reparta las que pueda", "Que no ponga números", "Que lo decida el día"], "«Los pensamientos del diligente ciertamente tienden a la abundancia».", "Proverbios 21:5"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué una meta debe ser realista?", "Porque una meta imposible desanima al equipo, y una realista se cumple con fe y esfuerzo", ["Porque Dios no hace milagros", "No importa", "Para no esforzarse"], "«Mas todo el que se apresura alocadamente, de cierto va a la pobreza».", "Proverbios 21:5"],
      ["m1-17", 3, "o3", "recordar", "¿Qué hacía Pablo, en vez de pretender haberlo alcanzado, según Filipenses 3:13?", "Una cosa: olvidar lo que queda atrás y extenderse a lo que está delante", ["Descansar", "Quejarse", "Rendirse"], "«pero una cosa hago: olvidando ciertamente lo que queda atrás».", "Filipenses 3:13-14"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué plan del año de un ministerio está mejor hecho?", "Pocas metas SMART con su calendario, sus materiales, su costo en el presupuesto y una revisión cada trimestre", ["Una lista de deseos", "Muchas metas sin fecha", "Un plan sin presupuesto"], "«prosigo a la meta».", "Filipenses 3:13-14"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué día se terminó el muro, según Nehemías 6:15?", "El veinticinco del mes de Elul", ["El primer día del año", "El día de reposo", "En la fiesta de las cabañas"], "«Fue terminado, pues, el muro, el veinticinco del mes de Elul».", "Nehemías 6:15"],
      ["m2-02", 4, "o4", "comprender", "¿Qué hace el responsable de un proyecto?", "Coordina todo, se reúne con los encargados y rinde cuentas al consejo", ["Hace todo él solo", "Solo pone su nombre", "Nada"], "«Entonces oré al Dios de los cielos».", "Nehemías 2:4-5"],
      ["m2-03", 4, "o4", "aplicar", "Tu iglesia va a construir un salón nuevo. ¿Qué necesita además del plan?", "Los permisos de la ciudad, contratistas con licencia y la aprobación de la iglesia según sus estatutos", ["Nada más", "Solo voluntarios", "Solo el dinero"], "«envíame a Judá, a la ciudad de los sepulcros de mis padres, y la reedificaré».", "Nehemías 2:4-5"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué Nehemías repartió el muro por tramos?", "Porque así cada grupo sabía su parte y la obra avanzaba al mismo tiempo", ["Para que nadie trabajara", "Por casualidad", "Para pelear"], "«se levantó el sumo sacerdote Eliasib con sus hermanos los sacerdotes, y edificaron la puerta de las Ovejas».", "Nehemías 3:1"],
      ["m2-05", 4, "o4", "aplicar", "Una escuela bíblica de vacaciones no tiene a nadie encargado de la seguridad de los niños. ¿Qué haces?", "Nombras a un encargado de la seguridad dentro del equipo del proyecto", ["Lo dejas así", "Pides a los niños que se cuiden", "Cancelas la escuela"], "Cada grupo sabía su parte: «edificaron la puerta de las Ovejas».", "Nehemías 3:1"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué inicio de un proyecto es el mejor?", "Uno con oración, el propósito, el resultado, el alcance claro y un responsable", ["Uno que compra materiales primero", "Uno sin responsable", "Uno que empieza el mismo día del evento"], "«Me dijo el rey: ¿Qué cosa pides? Entonces oré al Dios de los cielos».", "Nehemías 2:4-5"],
      ["m2-07", 5, "o5", "recordar", "¿Quiénes estaban detrás de los que trabajaban y vigilaban, según Nehemías 4:16?", "Los jefes de toda la casa de Judá", ["Los enemigos", "Los sacerdotes de Baal", "Nadie"], "«y detrás de ellos estaban los jefes de toda la casa de Judá».", "Nehemías 4:16"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué los cambios del alcance, del tiempo o del costo se deciden con el consejo?", "Porque afectan a toda la iglesia y deben decidirse con orden y transparencia", ["Para que nadie cambie nada", "No hace falta", "Para que el responsable no trabaje"], "«Y en la multitud de consejeros está la victoria».", "Proverbios 24:6"],
      ["m2-09", 5, "o5", "aplicar", "Tienes que presupuestar una remodelación de 4,000 dólares. ¿Qué agregas?", "Un margen para los imprevistos, por ejemplo unos 400 dólares", ["Nada más", "El doble por si acaso", "Un préstamo"], "«no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».", "Lucas 14:28"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué se revisa el proyecto cada semana y no solo al final?", "Porque los atrasos y los gastos de más se ven a tiempo para corregirlos", ["Para cansar al equipo", "No hace falta", "Para cambiar al responsable cada semana"], "«Este hombre comenzó a edificar, y no pudo acabar».", "Lucas 14:29-30"],
      ["m2-11", 5, "o5", "comprender", "¿Qué es un plan B en un proyecto?", "Lo que se hará si un riesgo ocurre, pensado de antemano", ["Un segundo proyecto", "Una excusa", "Nada"], "La mitad trabajaba en la obra y «la otra mitad tenía lanzas».", "Nehemías 4:16"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué presupuesto de un proyecto está mejor hecho?", "Uno con cada costo, de dónde sale el dinero y un margen para los imprevistos, revisado cada semana", ["Uno con un solo número", "Uno sin margen", "Uno que se hace al final"], "«no se sienta primero y calcula los gastos».", "Lucas 14:28"],
      ["m2-13", 6, "o6", "recordar", "¿Qué hicieron Pablo y Bernabé al llegar a Antioquía, según Hechos 14:27?", "Reunieron a la iglesia", ["Se fueron a descansar", "Escribieron una carta", "Visitaron al rey"], "«Y habiendo llegado, y reunido a la iglesia».", "Hechos 14:27"],
      ["m2-14", 6, "o6", "comprender", "¿Para qué se guarda el informe de la evaluación con el plan del proyecto?", "Para que el próximo equipo aprenda de lo que funcionó y de lo que no", ["Para llenar el archivo", "No se guarda", "Para culpar a alguien"], "«Escudriñemos nuestros caminos».", "Lamentaciones 3:40"],
      ["m2-15", 6, "o6", "aplicar", "Un voluntario culpa a otro, en la evaluación, de todo lo que salió mal. ¿Qué haces?", "Llevas la conversación a qué mejorar, sin buscar culpables", ["Le das la razón", "Expones al otro", "Terminas la reunión"], "«Examinaos a vosotros mismos».", "2 Corintios 13:5"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué los números no miden todo lo que Dios hace en un proyecto?", "Porque la obra de Dios en un corazón no se ve en una cifra", ["Porque los números mienten", "Sí lo miden todo", "Porque nadie cuenta"], "«refirieron cuán grandes cosas había hecho Dios con ellos».", "Hechos 14:27"],
      ["m2-17", 6, "o6", "comprender", "¿Qué pregunta de la evaluación ayuda a planear mejor el próximo año?", "Qué cambiaremos", ["Quién falló", "Cuánto nos aplaudieron", "Cuántas fotos hay"], "«Escudriñemos nuestros caminos, y busquemos».", "Lamentaciones 3:40"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué cierre de un proyecto es el mejor?", "Agradecer, evaluar con números honestos y las cuatro preguntas, guardar lo aprendido y contar lo que Dios hizo", ["Pasar al siguiente sin evaluar", "Evaluar buscando culpables", "Inflar los resultados"], "«refirieron cuán grandes cosas había hecho Dios con ellos».", "Hechos 14:27"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "liderazgo-administracion-4-e1",
      tipo: "corta",
      pregunta: "Explica cómo se planea con fe y cuál es el ciclo de la planificación, con un versículo.",
      ideas: [
        { id: "fe", peso: 30, texto: "Orar, buscar la voluntad de Dios y planear con humildad, si el Señor quiere.", formas: ["orar", "oracion", "si el senor quiere", "endereza", "voluntad de dios", "humildad"] },
        { id: "rumbo", peso: 30, texto: "Mirar dónde estamos y decidir adónde vamos, con la visión.", formas: ["donde estamos", "adonde vamos", "la vision", "diagnostic*"] },
        { id: "llegar", peso: 30, texto: "Pocas metas, los proyectos, los recursos y la revisión.", formas: ["metas", "proyectos", "recursos", "revis*"] },
      ],
      citas: ["Proverbios 16:9", "Santiago 4:15", "Santiago 4:13-15", "Lucas 14:28"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Se planea con fe orando y diciendo si el Señor quiere, porque el corazón del hombre piensa su camino, pero Jehová endereza sus pasos (Proverbios 16:9). Primero se mira dónde estamos y se decide adónde vamos con la visión. Después se eligen pocas metas y los proyectos, se ven los recursos y se revisa con humildad.",
    },
    {
      id: "liderazgo-administracion-4-e2",
      tipo: "corta",
      pregunta: "Explica la diferencia entre la misión, la visión y los valores de un ministerio, con un versículo.",
      ideas: [
        { id: "mision", peso: 30, texto: "La misión dice para qué existe, dentro de la Gran Comisión.", formas: ["para que existe", "gran comision", "haced discipulos", "hacer discipulos"] },
        { id: "vision", peso: 30, texto: "La visión muestra cómo se verá en unos años.", formas: ["en unos anos", "como se vera", "adonde vamos", "en tres anos", "en cinco anos"] },
        { id: "valores", peso: 30, texto: "Los valores guían cómo se trabaja; todo se escribe corto y se repite.", formas: ["como se trabaja", "como trabajamos", "lo que guia", "de memoria", "repet*", "cortas"] },
      ],
      citas: ["Habacuc 2:2", "Mateo 28:19-20", "Mateo 28:19", "Nehemías 2:18", "Nehemías 2:17-18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La misión dice para qué existe el ministerio, dentro de la Gran Comisión de hacer discípulos (Mateo 28:19). La visión muestra cómo se verá en unos años si Dios bendice. Los valores dicen cómo se trabaja. Se escriben cortas, para decirlas de memoria, y se repiten en el equipo.",
    },
    {
      id: "liderazgo-administracion-4-e3",
      tipo: "corta",
      pregunta: "Explica qué es una meta SMART y da un ejemplo de un ministerio, con un versículo.",
      ideas: [
        { id: "medible", peso: 30, texto: "Específica y medible.", formas: ["especifica", "medible"] },
        { id: "responsable", peso: 30, texto: "Asignable, realista y con tiempo.", formas: ["asignable", "responsable", "realista", "con tiempo", "una fecha"] },
        { id: "ejemplo", peso: 30, texto: "Un ejemplo con un número, un responsable y una fecha.", formas: ["por ejemplo", "versiculos", "jovenes", "despensas", "voluntarios"] },
      ],
      citas: ["Filipenses 3:14", "Filipenses 3:13-14", "1 Corintios 9:26", "Proverbios 21:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Es una meta específica, medible, asignable a un responsable, realista y con tiempo, para no correr a la ventura (1 Corintios 9:26). Por ejemplo: que 40 hermanos terminen el plan de lectura del Nuevo Testamento antes de diciembre, a cargo del maestro de la escuela dominical.",
    },
    {
      id: "liderazgo-administracion-4-e4",
      tipo: "breve",
      pregunta:
        "Tu iglesia quiere hacer una escuela bíblica de vacaciones de cinco días en julio, para 80 niños del barrio. Explica cómo la llevarías como proyecto, de principio a fin, con citas bíblicas.",
      ideas: [
        { id: "iniciar", peso: 25, texto: "El propósito, el resultado y el alcance, con una responsable del proyecto.", formas: ["proposito", "alcance", "responsable del proyecto", "resultado"] },
        { id: "planear", peso: 25, texto: "Las tareas con fechas, el cronograma, el presupuesto, los riesgos y los encargados.", formas: ["cronograma", "tareas", "presupuesto", "riesgos", "encargados"] },
        { id: "controlar", peso: 25, texto: "Revisar cada semana el avance y decidir los cambios con el consejo.", formas: ["cada semana", "control*", "avance", "con el consejo"] },
        { id: "cerrar", peso: 25, texto: "Agradecer, seguir a las familias, evaluar y guardar lo aprendido.", formas: ["cerrar", "evalu*", "lo aprendido", "seguimiento", "dar las gracias", "agradec*"] },
      ],
      basta: 85,
      citas: ["Nehemías 2:4-5", "Nehemías 2:4", "Nehemías 3:1", "Nehemías 6:15", "Lucas 14:28", "Proverbios 24:6", "Proverbios 16:9", "Hechos 14:27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Empezaría orando con el equipo, como Nehemías, que oró antes de presentar su pedido (Nehemías 2:4). Escribiríamos el propósito, que los niños del barrio conozcan a Jesús; el resultado, cinco mañanas con 80 niños; y el alcance, sin viajes ni comidas completas. Nombraría a una responsable del proyecto y a los encargados de la enseñanza, la música, las manualidades, la seguridad y la inscripción, repartiendo el trabajo como el muro se repartió por tramos (Nehemías 3:1). Después haríamos el cronograma con las tareas y sus fechas desde marzo, el presupuesto y la lista de riesgos con su plan B. Durante la preparación, la responsable revisaría cada semana el avance y el gasto, y cualquier cambio del alcance se decidiría con el consejo. Al terminar, daríamos las gracias a los voluntarios, haríamos el seguimiento de las familias nuevas, evaluaríamos con números honestos y guardaríamos lo aprendido, y contaríamos a la iglesia lo que Dios hizo (Hechos 14:27).",
    },
    {
      id: "liderazgo-administracion-4-e5",
      tipo: "breve",
      pregunta:
        "La remodelación del salón de tu iglesia lleva dos meses de atraso y ya gastó más de lo previsto, porque se le fueron agregando trabajos. Explica cómo la pondrías en orden, con citas bíblicas.",
      ideas: [
        { id: "alcance", peso: 25, texto: "Volver al alcance aprobado y decidir los cambios con el consejo.", formas: ["alcance", "con el consejo", "aprob*"] },
        { id: "cronograma", peso: 25, texto: "Un cronograma con tareas, fechas, responsables y dependencias.", formas: ["cronograma", "tareas", "fechas", "depend*"] },
        { id: "dinero", peso: 25, texto: "Revisar el presupuesto, lo gastado y dejar un margen.", formas: ["presupuesto", "margen", "lo gastado", "costo*"] },
        { id: "informar", peso: 25, texto: "Informar con verdad a la iglesia y tener un plan B.", formas: ["inform*", "plan b", "con verdad", "la iglesia sepa"] },
      ],
      basta: 85,
      citas: ["Lucas 14:28", "Lucas 14:29-30", "Lucas 14:30", "Nehemías 4:16", "Proverbios 24:6", "Nehemías 3:1"],
      pesoCita: 10,
      errores: [
        { id: "e5-seguir", anula: "alcance", texto: "Seguir agregando trabajos sin decidirlo.", formas: ["seguir agregando", "agregar mas trabajos", "ya que estamos"] },
      ],
      modelo:
        "Primero me reuniría con el responsable y el consejo para volver al alcance aprobado: lo que entra y lo que no. Cada trabajo que se agregó lo revisaríamos con su costo, y el consejo decidiría si se queda o se deja para después, porque en la multitud de consejeros está la victoria (Proverbios 24:6). Después haríamos un cronograma nuevo con las tareas que faltan, sus fechas, sus responsables y las que dependen de otras. Revisaríamos el presupuesto con lo gastado y lo que falta, y dejaríamos un margen para los imprevistos, porque Jesús enseñó a calcular los gastos antes de edificar, para no comenzar y no poder acabar (Lucas 14:28-30). También pensaríamos un plan B para los riesgos que quedan, como hizo Nehemías ante el peligro (Nehemías 4:16). Y le informaríamos a la iglesia con verdad cómo va la obra, qué se ajustó y cuándo terminará, revisando el avance cada semana hasta el final.",
    },
  ],
  breve: {
    id: "liderazgo-administracion-4-b1",
    tipo: "breve",
    pregunta: "Escribe cómo planearía tu iglesia su próximo año y sus proyectos, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "fe", peso: 15, texto: "Planear con fe: orar y el ciclo de la planificación.", formas: ["orar", "oracion", "si el senor quiere", "humildad"] },
      { id: "vision", peso: 15, texto: "La misión, la visión y los valores.", formas: ["la mision", "la vision", "los valores"] },
      { id: "metas", peso: 20, texto: "Pocas metas SMART en el plan del año.", formas: ["metas", "smart", "medible*", "con fecha"] },
      { id: "proyecto", peso: 15, texto: "Los proyectos con sus etapas y su alcance.", formas: ["proyecto*", "alcance", "responsable del proyecto"] },
      { id: "herramientas", peso: 20, texto: "El cronograma, los riesgos y el presupuesto.", formas: ["cronograma", "riesgos", "presupuesto", "plan b"] },
      { id: "evaluar", peso: 15, texto: "Evaluar y contar lo que Dios hizo.", formas: ["evalu*", "lo aprendido", "lo que dios hizo"] },
    ],
    basta: 85,
    citas: ["Proverbios 16:9", "Santiago 4:15", "Lucas 14:28", "Habacuc 2:2", "Mateo 28:19", "Nehemías 2:18", "Filipenses 3:14", "1 Corintios 9:26", "Proverbios 21:5", "Nehemías 2:4", "Nehemías 3:1", "Nehemías 6:15", "Lucas 14:30", "Nehemías 4:16", "Proverbios 24:6", "Lamentaciones 3:40", "2 Corintios 13:5", "Hechos 14:27"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaríamos con un retiro de oración del consejo, porque el corazón del hombre piensa su camino, pero Jehová endereza sus pasos (Proverbios 16:9), y planearíamos con humildad, diciendo si el Señor quiere (Santiago 4:15). Recordaríamos la misión de hacer discípulos (Mateo 28:19), escribiríamos la visión de cómo queremos ver la iglesia en tres años y los valores que nos guían, cortos y claros, como pide Habacuc 2:2. Elegiríamos tres metas SMART, medibles y con fecha, cada una con un responsable, para no correr a la ventura (1 Corintios 9:26). Cada meta tendría sus proyectos, con un responsable del proyecto, el alcance claro y sus etapas, como Nehemías, que repartió la obra y la terminó en cincuenta y dos días (Nehemías 6:15). Cada proyecto tendría su cronograma, su lista de riesgos con plan B y su presupuesto con margen, porque el que edifica calcula primero los gastos (Lucas 14:28). Y al cerrar cada proyecto lo evaluaríamos con números honestos, guardaríamos lo aprendido y contaríamos a la iglesia lo que Dios hizo (Hechos 14:27).",
  },
};
