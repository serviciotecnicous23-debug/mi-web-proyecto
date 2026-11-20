/**
 * El banco de «Capellanía penitenciaria» (especialidad Capellanía, materia 3, avanzada). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la cárcel y el preso · o2 el evangelio tras las rejas · o3 la culpa, el perdón y la justicia · o4 las
 * familias de los presos · o5 la prudencia y los límites · o6 el regreso a la comunidad · o7 el versículo de memoria
 * (Hebreos 13:3). Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos,
 * y preguntas de repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `capellania-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_CAPELLANIA_3: BancoMateria = {
  materia: "capellania-3",
  repaso: {
    "capellania-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Quién estaba con José en la cárcel, según Génesis 39:21?", "Jehová", ["Nadie", "Su padre", "El faraón"], "«Pero Jehová estaba con José y le extendió su misericordia».", "Génesis 39:20-23"],
      ["1-r2", 1, "o1", "comprender", "¿Qué vive muchas veces una persona presa?", "La pérdida de la libertad, la separación de su familia, la culpa o el enojo, y la vergüenza", ["Solo descanso", "Nada especial", "Solo alegría"], "Dios oye su dolor: «Para oír el gemido de los presos».", "Salmos 102:19-20"],
      ["1-r3", 1, "o1", "aplicar", "Un preso que espera su juicio te pregunta si va a salir libre. ¿Qué le respondes?", "Que no puedes prometerle nada sobre su caso, que hable con su abogado, y que Dios está con él", ["Que seguro saldrá libre", "Que seguro lo van a condenar", "Que tú hablarás con el juez"], "Como con José, Dios está con él en la cárcel: «Pero Jehová estaba con José».", "Génesis 39:20-23"],
    ] as P[]).map(p),
    "capellania-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hacían Pablo y Silas a medianoche en la cárcel, según Hechos 16:25?", "Oraban y cantaban himnos a Dios", ["Dormían", "Se quejaban", "Planeaban escapar"], "«Pero a medianoche, orando Pablo y Silas, cantaban himnos a Dios; y los presos los oían».", "Hechos 16:25-26"],
      ["2-r2", 2, "o2", "comprender", "¿Qué protege la ley federal RLUIPA en las cárceles?", "La práctica religiosa de los presos, que no puede recibir una carga sustancial salvo por un interés apremiante y con el medio menos restrictivo", ["Solo la religión de los guardias", "Nada", "El derecho a salir de la cárcel para ir al templo"], "La Palabra llega aun tras las rejas: «mas la palabra de Dios no está presa».", "2 Timoteo 2:9"],
      ["2-r3", 2, "o2", "aplicar", "Tu iglesia quiere empezar un estudio bíblico en una prisión de Texas. ¿Qué es lo primero?", "Que los voluntarios hagan la capacitación y la revisión de antecedentes que pide el sistema penitenciario", ["Ir el domingo sin avisar", "Llevar materiales sin que los revisen", "Esperar a que los presos los llamen"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
    ] as P[]).map(p),
    "capellania-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué reconoció el ladrón arrepentido en la cruz, según Lucas 23:41?", "Que padecían justamente, porque recibían lo que merecían sus hechos", ["Que era inocente", "Que Jesús merecía la cruz", "Que nadie los entendía"], "«Nosotros, a la verdad, justamente padecemos, porque recibimos lo que merecieron nuestros hechos».", "Lucas 23:40-41"],
      ["3-r2", 3, "o3", "comprender", "¿Qué diferencia hay entre el perdón de Dios y las consecuencias de un delito?", "El perdón limpia la culpa delante de Dios; las consecuencias, como la sentencia, siguen su curso", ["Son lo mismo", "El perdón quita la sentencia", "No hay perdón para los presos"], "El ladrón fue perdonado y siguió en la cruz: «De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
      ["3-r3", 3, "o3", "aplicar", "Un preso arrepentido quiere buscar a su víctima para pedirle perdón. ¿Qué le aconsejas?", "Que no la busque por su cuenta, y que si quiere reparar lo haga solo por los caminos que permite la ley", ["Que la busque enseguida", "Que le escriba una carta sin permiso", "Que se olvide de la víctima"], "La reparación mira al dañado: «Y si en algo te dañó, o te debe, ponlo a mi cuenta».", "Filemón 1:15-18"],
    ] as P[]).map(p),
    "capellania-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué pide Isaías 1:17 hacer con el huérfano y la viuda?", "Hacer justicia al huérfano y amparar a la viuda", ["Olvidarlos", "Juzgarlos", "Pedirles ayuda"], "«haced justicia al huérfano, amparad a la viuda».", "Isaías 1:17"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hace el programa Angel Tree, de Prison Fellowship?", "Lleva regalos de Navidad a los hijos de los presos en nombre de su papá o de su mamá", ["Saca a los presos de la cárcel", "Da comida a los guardias", "Organiza juicios"], "Dios es «Padre de huérfanos y defensor de viudas».", "Salmos 68:5-6"],
      ["4-r3", 4, "o4", "aplicar", "Una hermana de tu iglesia cuenta que su esposo está preso y que no le alcanza para la renta. ¿Qué haces?", "La escuchas, guardas su confianza y organizas ayuda práctica con la iglesia", ["Cuentas su caso en el culto", "Le dices que es su culpa", "Le pides que deje a su esposo"], "«Que da pan a los hambrientos. Jehová liberta a los cautivos».", "Salmos 146:7"],
    ] as P[]).map(p),
    "capellania-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cómo pidió Jesús que fueran los suyos, según Mateo 10:16?", "Prudentes como serpientes y sencillos como palomas", ["Duros como piedras", "Rápidos como leones", "Callados como ovejas"], "«sed, pues, prudentes como serpientes, y sencillos como palomas».", "Mateo 10:16"],
      ["5-r2", 5, "o5", "comprender", "¿Cuál es una señal de que un preso intenta manipular a un voluntario?", "Pedirle pequeños favores que van creciendo, o sus datos personales", ["Pedirle que ore por él", "Darle las gracias por la visita", "Hacerle una pregunta sobre la Biblia"], "«El simple todo lo cree; Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["5-r3", 5, "o5", "aplicar", "Un preso te pide tu número de teléfono para que su familia te llame. ¿Qué haces?", "No le das tu número, le explicas las reglas y le ofreces el camino oficial con el capellán de la unidad", ["Se lo das", "Le das el de un amigo", "Dejas de visitarlo"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ] as P[]).map(p),
    "capellania-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué hizo Bernabé con Saulo cuando todos le tenían miedo, según Hechos 9:27?", "Lo tomó y lo llevó a los apóstoles", ["Lo echó de Jerusalén", "Lo denunció", "Lo ignoró"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:26-27"],
      ["6-r2", 6, "o6", "comprender", "¿Qué desafíos enfrenta una persona que sale de la cárcel?", "Sacar sus documentos, encontrar casa y trabajo, cumplir sus condiciones y volver a su familia", ["Ninguno", "Solo descansar", "Solo buscar a sus amigos de antes"], "Necesita quien la reciba: «recíbele como a mí mismo».", "Filemón 1:15-18"],
      ["6-r3", 6, "o6", "aplicar", "Un hombre que salió de prisión quiere congregarse en tu iglesia, y algunos hermanos tienen miedo. ¿Qué haces?", "Lo recibes con amor y con prudencia, y le asignas un mentor, como Bernabé con Saulo", ["Le pides que busque otra iglesia", "Le cuentas su pasado a todos", "Lo dejas solo"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:26-27"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La cárcel y el preso
    ["f01", 1, "o1", "recordar", "¿Qué le dio Jehová a José en los ojos del jefe de la cárcel, según Génesis 39:21?", "Gracia", ["Miedo", "Riquezas", "Castigo"], "«y le dio gracia en los ojos del jefe de la cárcel».", "Génesis 39:20-23"],
    ["f02", 1, "o1", "recordar", "¿Para qué miró Jehová desde los cielos, según Salmos 102:20?", "Para oír el gemido de los presos", ["Para castigar a los presos", "Para contar las estrellas", "Para juzgar a los reyes"], "«Para oír el gemido de los presos, Para soltar a los sentenciados a muerte».", "Salmos 102:19-20"],
    ["f03", 1, "o1", "comprender", "¿Qué enseña la historia de José en la cárcel al capellán?", "Que Dios está con los presos y puede bendecirlos aun allí", ["Que los presos no le importan a Dios", "Que José era culpable", "Que hay que huir de la cárcel"], "«porque Jehová estaba con José, y lo que él hacía, Jehová lo prosperaba».", "Génesis 39:20-23"],
    ["f04", 1, "o1", "comprender", "¿Qué diferencia hay entre una cárcel del condado y una prisión del estado?", "En la cárcel muchos esperan su juicio o cumplen penas cortas; en la prisión, los condenados cumplen penas más largas", ["Ninguna", "En la prisión nadie está condenado", "En la cárcel solo hay mujeres"], "En las dos, Dios oye: «Para oír el gemido de los presos».", "Salmos 102:19-20"],
    ["f05", 1, "o1", "comprender", "¿Por qué el capellán no le promete nada al preso sobre su sentencia?", "Porque no es abogado ni juez, y no le corresponde", ["Porque no le importa", "Porque no sabe hablar", "Sí debe prometerle"], "«Acordaos de los presos», pero sin ocupar un lugar que no es el suyo.", "Hebreos 13:3"],
    ["f06", 1, "o1", "analizar", "¿Por qué el capellán no le pregunta al preso por su delito si él no quiere hablar de eso?", "Porque va a acompañar a la persona, no a investigar su caso, y respeta su dignidad", ["Porque ya lo sabe", "Porque no le interesa la persona", "Sí debe preguntárselo siempre"], "«Acordaos de los presos, como si estuvierais presos juntamente con ellos».", "Hebreos 13:3"],
    ["f07", 1, "o1", "aplicar", "Un preso te dice que siente que su vida ya no vale nada. ¿Qué haces?", "Lo escuchas, le recuerdas que Dios no se olvidó de él y oras con él si lo quiere", ["Le dices que es verdad", "Le hablas de su delito", "Cambias de tema"], "«Pero Jehová estaba con José y le extendió su misericordia».", "Génesis 39:20-23"],
    ["f08", 1, "o1", "aplicar", "Un preso te pide una Biblia. ¿Qué haces?", "Se la haces llegar por el medio que permite la cárcel", ["Se la das a escondidas", "Le dices que no se puede", "Le llevas una con dinero adentro"], "La Palabra entra por los caminos correctos: «mas la palabra de Dios no está presa».", "2 Timoteo 2:9"],
    ["f09", 1, "o1", "aplicar", "Vas a visitar a un preso por primera vez. ¿Qué haces al llegar?", "Te registras, pasas la revisión y llevas solo lo permitido", ["Entras por otra puerta", "Llevas regalos sin avisar", "Pides que no te revisen porque eres pastor"], "«Acordaos de los presos».", "Hebreos 13:3"],
    ["f10", 1, "o7", "recordar", "Completa Hebreos 13:3: Acordaos de los presos, como si estuvierais presos juntamente con ellos…", "y de los maltratados, como que también vosotros mismos estáis en el cuerpo", ["y olvidad a los que sufren", "y juzgad a los culpables", "pero no los visitéis"], "«Acordaos de los presos, como si estuvierais presos juntamente con ellos; y de los maltratados, como que también vosotros mismos estáis en el cuerpo».", "Hebreos 13:3"],
    // Lección 2 · El evangelio tras las rejas
    ["f11", 2, "o2", "recordar", "¿Qué preguntó el carcelero de Filipos, según Hechos 16:30?", "Señores, ¿qué debo hacer para ser salvo?", ["¿Quién abrió las puertas?", "¿Dónde están los presos?", "¿Por qué cantan?"], "«Señores, ¿qué debo hacer para ser salvo?».", "Hechos 16:30-31"],
    ["f12", 2, "o2", "recordar", "¿Qué le respondieron Pablo y Silas al carcelero, según Hechos 16:31?", "Cree en el Señor Jesucristo, y serás salvo, tú y tu casa", ["Haz buenas obras", "Suéltanos", "Ve al templo"], "«Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».", "Hechos 16:30-31"],
    ["f13", 2, "o2", "recordar", "¿Qué no está presa, según 2 Timoteo 2:9?", "La palabra de Dios", ["Pablo", "Los creyentes", "La iglesia"], "«mas la palabra de Dios no está presa».", "2 Timoteo 2:9"],
    ["f14", 2, "o2", "comprender", "¿Qué dijo Pablo que lograron sus prisiones, según Filipenses 1:12?", "El progreso del evangelio", ["Que nadie creyera", "Que la iglesia se cerrara", "Que él dejara de predicar"], "«las cosas que me han sucedido, han redundado más bien para el progreso del evangelio».", "Filipenses 1:12-14"],
    ["f15", 2, "o2", "comprender", "¿Qué confirmó la Corte Suprema en 2005, en el caso Cutter v. Wilkinson?", "La ley RLUIPA, que protege la práctica religiosa de los presos", ["Que los presos no tienen derechos religiosos", "Que solo se puede predicar los domingos", "Que los capellanes deben ser del gobierno"], "Dios llega también a la cárcel: «mas la palabra de Dios no está presa».", "2 Timoteo 2:9"],
    ["f16", 2, "o2", "analizar", "¿Por qué el capellán sirve a presos de todas las creencias?", "Porque la libertad religiosa los protege a todos, y el capellán sirve a cada persona con el amor de Cristo", ["Porque todas las religiones son iguales", "Porque no tiene fe propia", "No debe servir a todos"], "«Acordaos de los presos».", "Hebreos 13:3"],
    ["f17", 2, "o2", "aplicar", "La cárcel cambia a última hora el horario del culto por razones de seguridad. ¿Qué hace el equipo de la iglesia?", "Lo acepta con paciencia y coordina otra fecha con el capellán", ["Se queja con los presos", "Entra igual", "Deja de ir"], "«Andad sabiamente para con los de afuera, redimiendo el tiempo».", "Colosenses 4:5-6"],
    ["f18", 2, "o2", "aplicar", "Un preso de otra religión pide un libro de su fe. ¿Qué hace el capellán?", "Lo ayuda a conseguirlo por los medios que permite la institución, respetando su libertad religiosa", ["Le dice que solo hay Biblias", "Ignora su pedido", "Se lo niega para que se convierta"], "«Sea vuestra palabra siempre con gracia».", "Colosenses 4:5-6"],
    ["f19", 2, "o2", "aplicar", "Un voluntario quiere entrar a la prisión con dulces para regalar después del estudio bíblico. ¿Qué le dices?", "Que no lleve nada que no esté permitido y revisado por la institución", ["Que los lleve escondidos", "Que lleve más", "Que los reparta antes de que lo vean"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f20", 2, "o2", "evaluar", "¿Qué estudio bíblico en una prisión está mejor organizado?", "Con voluntarios capacitados, día y materiales acordados con el capellán, un estudio sencillo, reglas cumplidas y seguimiento", ["Uno sin capacitación ni permisos", "Uno con materiales no revisados", "Uno sin seguimiento"], "«Pero a medianoche, orando Pablo y Silas, cantaban himnos a Dios; y los presos los oían».", "Hechos 16:25-26"],
    // Lección 3 · La culpa, el perdón y la justicia
    ["f21", 3, "o3", "recordar", "¿Qué le pidió el ladrón a Jesús, según Lucas 23:42?", "Acuérdate de mí cuando vengas en tu reino", ["Sálvate a ti mismo", "Bájame de la cruz", "Castiga a los soldados"], "«Acuérdate de mí cuando vengas en tu reino».", "Lucas 23:42-43"],
    ["f22", 3, "o3", "recordar", "¿Qué escribió Pablo a Filemón sobre lo que Onésimo debía, según Filemón 1:18?", "Ponlo a mi cuenta", ["Cóbraselo a él", "Olvídalo", "Denúncialo"], "«Y si en algo te dañó, o te debe, ponlo a mi cuenta».", "Filemón 1:15-18"],
    ["f23", 3, "o3", "recordar", "¿Qué pide Jehová, según Miqueas 6:8?", "Hacer justicia, amar misericordia y humillarse ante Dios", ["Ofrecer sacrificios", "Ser rico", "Castigar a todos"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
    ["f24", 3, "o3", "comprender", "¿Qué muestra que el ladrón arrepentido siguiera en la cruz después de ser perdonado?", "Que el perdón de Dios no siempre quita las consecuencias", ["Que no fue perdonado", "Que Jesús no tenía poder", "Nada"], "«De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
    ["f25", 3, "o3", "comprender", "¿Por qué el capellán no le dice a un preso si es inocente o culpable en su caso?", "Porque eso lo deciden los tribunales; él lo acompaña como persona delante de Dios", ["Porque no le importa", "Porque todos son culpables", "Sí debe decírselo"], "«solamente hacer justicia, y amar misericordia».", "Miqueas 6:8"],
    ["f26", 3, "o3", "analizar", "¿Por qué el capellán tiene presentes a las víctimas al acompañar a un preso?", "Porque el delito hizo un daño real, y la justicia y la misericordia van juntas", ["Porque las víctimas no importan", "Para culpar al preso", "No debe pensar en ellas"], "«Y si en algo te dañó, o te debe, ponlo a mi cuenta».", "Filemón 1:15-18"],
    ["f27", 3, "o3", "aplicar", "Un preso que reconoce su delito te dice que no puede dormir por la culpa. ¿Qué haces?", "Lo escuchas, le muestras el perdón de Cristo para el que se arrepiente y oras con él", ["Le dices que no fue tan grave", "Le dices que no tiene perdón", "Cambias de tema"], "«Acuérdate de mí cuando vengas en tu reino».", "Lucas 23:42-43"],
    ["f28", 3, "o3", "aplicar", "Un preso que se convirtió te pregunta si ahora deberían soltarlo. ¿Qué le respondes?", "Que el perdón de Dios es real, pero no quita la sentencia, y lo animas a cumplirla con un corazón nuevo", ["Que sí, que pida su libertad por su fe", "Que su conversión no vale", "Que hable con el juez sobre su fe"], "El ladrón fue perdonado en la cruz: «hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
    ["f29", 3, "o3", "aplicar", "Un preso dice que no hizo nada malo y que todos lo acusan. ¿Qué haces?", "Lo escuchas sin juzgar su caso, y lo acompañas delante de Dios", ["Le dices que miente", "Le das la razón y criticas al juez", "Dejas de visitarlo"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
    ["f30", 3, "o3", "evaluar", "¿Qué acompañamiento a un preso que reconoce su culpa es el mejor?", "Escucharlo sin justificar ni condenar, mostrarle el perdón de Cristo, orar, explicarle que la sentencia sigue y discipularlo", ["Decirle que su delito no importa", "Decirle que no hay perdón para él", "Prometerle que lo soltarán"], "«Nosotros, a la verdad, justamente padecemos».", "Lucas 23:40-41"],
    // Lección 4 · Las familias de los presos
    ["f31", 4, "o4", "recordar", "¿A quiénes saca Dios a prosperidad, según Salmos 68:6?", "A los cautivos", ["A los rebeldes", "A los ricos", "A los orgullosos"], "«Saca a los cautivos a prosperidad».", "Salmos 68:5-6"],
    ["f32", 4, "o4", "recordar", "¿Qué da Jehová a los hambrientos, según Salmos 146:7?", "Pan", ["Castigo", "Silencio", "Deudas"], "«Que da pan a los hambrientos».", "Salmos 146:7"],
    ["f33", 4, "o4", "recordar", "¿Qué pide Isaías 1:17 que aprendamos?", "A hacer el bien", ["A juzgar", "A callar", "A acumular"], "«aprended a hacer el bien».", "Isaías 1:17"],
    ["f34", 4, "o4", "comprender", "¿Qué viven muchas veces los hijos de los presos?", "Extrañan a su papá o a su mamá, y a veces se culpan, se enojan o sienten vergüenza", ["Nada especial", "Solo alegría", "Mucho dinero"], "Dios es «Padre de huérfanos y defensor de viudas».", "Salmos 68:5-6"],
    ["f35", 4, "o4", "comprender", "¿Cómo trabaja el programa Angel Tree?", "Con los capellanes y las iglesias, que hacen llegar a los hijos un regalo en nombre de su papá o de su mamá presos", ["Comprando la libertad de los presos", "Dando dinero a los guardias", "Solo con el gobierno"], "«haced justicia al huérfano, amparad a la viuda».", "Isaías 1:17"],
    ["f36", 4, "o4", "analizar", "¿Por qué la iglesia no debe contar que un niño tiene a su papá en la cárcel?", "Porque esa información le pertenece a la familia, y contarla puede avergonzar y herir al niño", ["Porque no importa", "Para que nadie le ayude", "Sí debe contarlo"], "«Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f37", 4, "o4", "aplicar", "Un niño de tu grupo dice que no quiere visitar a su papá en la cárcel. ¿Qué haces?", "Lo escuchas con cariño y hablas con su mamá para que lo acompañe en lo que siente", ["Le dices que es su obligación", "Le dices que su papá es malo", "Lo ignoras"], "Dios es «Padre de huérfanos».", "Salmos 68:5-6"],
    ["f38", 4, "o4", "aplicar", "La esposa de un preso deja de venir a la iglesia por vergüenza. ¿Qué haces?", "La buscas, le muestras cariño sin juzgar y le ofreces ayuda y compañía", ["Esperas a que vuelva sola", "Le dices que es por el pecado de su esposo", "Hablas de su caso con otros"], "«amparad a la viuda».", "Isaías 1:17"],
    ["f39", 4, "o4", "aplicar", "Tu iglesia quiere ayudar a los hijos de los presos en Navidad. ¿Qué es lo primero?", "Informarse en el programa Angel Tree o coordinar con el capellán de la cárcel", ["Pedir las direcciones a los presos", "Ir a las casas sin avisar", "Publicar los nombres de los niños"], "«haced justicia al huérfano».", "Isaías 1:17"],
    ["f40", 4, "o4", "evaluar", "¿Qué acompañamiento a la familia de un preso es el mejor?", "Guardar su confianza, ayudar en lo práctico, dar mentores a los niños, orar con ellos y seguir en contacto todo el año", ["Hablar del delito en la iglesia", "Alejar a los hijos de la iglesia", "Ayudar solo en Navidad"], "«Padre de huérfanos y defensor de viudas Es Dios en su santa morada».", "Salmos 68:5-6"],
    // Lección 5 · Prudencia, límites y seguridad
    ["f41", 5, "o5", "recordar", "¿Cómo envió Jesús a los suyos, según Mateo 10:16?", "Como a ovejas en medio de lobos", ["Como a reyes", "Como a soldados", "Como a jueces"], "«He aquí, yo os envío como a ovejas en medio de lobos».", "Mateo 10:16"],
    ["f42", 5, "o5", "recordar", "¿Qué hace el avisado, según Proverbios 14:15?", "Mira bien sus pasos", ["Lo cree todo", "Corre sin pensar", "No mira nada"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f43", 5, "o5", "recordar", "¿Qué hace el simple, según Proverbios 14:15?", "Todo lo cree", ["Mira bien sus pasos", "Nada cree", "Pregunta siempre"], "«El simple todo lo cree».", "Proverbios 14:15"],
    ["f44", 5, "o5", "comprender", "¿Qué significa ser prudente como serpiente y sencillo como paloma en la cárcel?", "Amar a los presos sin ser ingenuo: seguir las reglas y no dejarse manipular", ["Desconfiar de todos y no amar a nadie", "Hacer todo lo que piden", "No ir a la cárcel"], "«sed, pues, prudentes como serpientes, y sencillos como palomas».", "Mateo 10:16"],
    ["f45", 5, "o5", "comprender", "¿Qué se avisa enseguida al capellán supervisor, aunque se haya contado en confianza en la cárcel?", "Un plan de fuga o de violencia, el peligro para una vida y el abuso de un niño o de una persona mayor", ["Los pecados del preso", "Sus problemas de familia", "Sus dudas de fe"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f46", 5, "o5", "analizar", "¿Por qué una sola regla rota puede costar mucho en la cárcel?", "Porque pone en peligro la seguridad de todos y puede cerrar el programa de la iglesia en esa cárcel", ["Porque las reglas no importan", "Porque nadie se entera", "No cuesta nada"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f47", 5, "o5", "aplicar", "Un preso le dice a un voluntario que es el único que lo entiende y le pide que le lleve una carta. ¿Qué hace el voluntario?", "Reconoce la señal, no lleva la carta, le ofrece el camino oficial y se lo cuenta al capellán", ["Lleva la carta porque lo aprecia", "Deja de hablarle", "Lleva la carta solo esa vez"], "«El simple todo lo cree; Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f48", 5, "o5", "aplicar", "Un preso le pide dinero a una voluntaria para su familia. ¿Qué hace ella?", "No le da dinero, le explica las reglas y lo orienta al capellán de la unidad", ["Le da dinero a escondidas", "Le pide la dirección de su familia", "Se enoja con él"], "«sed, pues, prudentes como serpientes, y sencillos como palomas».", "Mateo 10:16"],
    ["f49", 5, "o5", "aplicar", "Un preso le cuenta al capellán que otros planean una pelea en el patio. ¿Qué hace el capellán?", "Avisa enseguida a su supervisor y a la institución, según sus reglas", ["Lo guarda en secreto", "Espera a ver qué pasa", "Va al patio a detenerlos solo"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f50", 5, "o5", "evaluar", "¿Qué actitud del voluntario en la cárcel es la mejor?", "Escuchar y orar, seguir las reglas, no dar sus datos, avisar al capellán cuando algo lo incomoda y saber decir que no", ["Hacer favores para ganar la confianza", "Dar su teléfono a todos", "Desconfiar de todos y no hablar con nadie"], "«sed, pues, prudentes como serpientes, y sencillos como palomas».", "Mateo 10:16"],
    // Lección 6 · El regreso a la comunidad
    ["f51", 6, "o6", "recordar", "¿Por qué los discípulos de Jerusalén tenían miedo de Saulo, según Hechos 9:26?", "Porque no creían que fuese discípulo", ["Porque era muy alto", "Porque era rico", "Porque no hablaba su idioma"], "«pero todos le tenían miedo, no creyendo que fuese discípulo».", "Hechos 9:26-27"],
    ["f52", 6, "o6", "recordar", "¿Cómo pidió Pablo que Filemón recibiera a Onésimo, según Filemón 1:17?", "Como a él mismo", ["Como a un esclavo", "Como a un extraño", "Con castigo"], "«Así que, si me tienes por compañero, recíbele como a mí mismo».", "Filemón 1:15-18"],
    ["f53", 6, "o6", "recordar", "¿Qué dijo Pablo de Onésimo, según Filemón 1:11?", "Que antes fue inútil, pero ahora era útil", ["Que siempre fue inútil", "Que no tenía remedio", "Que debía volver a la cárcel"], "«el cual en otro tiempo te fue inútil, pero ahora a ti y a mí nos es útil».", "Filemón 1:10-11"],
    ["f54", 6, "o6", "comprender", "¿Qué enseña el ejemplo de Bernabé con Saulo a la iglesia?", "Que alguien tiene que dar la cara por el que viene de un pasado difícil y ayudarlo a integrarse", ["Que hay que alejarse de los nuevos", "Que el pasado nunca cambia", "Que solo los apóstoles reciben"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:26-27"],
    ["f55", 6, "o6", "comprender", "¿Por qué la persona que sale de la cárcel necesita alejarse de sus viejas amistades?", "Porque los amigos y los lugares que lo llevaron al delito pueden hacerlo caer otra vez", ["Porque no debe tener amigos", "Porque la iglesia lo prohíbe", "No necesita alejarse"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f56", 6, "o6", "analizar", "¿Por qué la iglesia recibe al que sale de la cárcel con amor y también con prudencia?", "Porque cree en su vida nueva, y al mismo tiempo cuida a todos, sobre todo a los niños", ["Porque desconfía de todos", "Porque no cree en el cambio", "No necesita prudencia"], "«no ya como esclavo, sino como más que esclavo, como hermano amado».", "Filemón 1:15-18"],
    ["f57", 6, "o6", "aplicar", "Un hombre sale de prisión en un mes y quiere congregarse en tu iglesia. ¿Qué es lo primero?", "Conocerlo antes de su salida, con el capellán de la prisión si se puede, y buscarle un mentor", ["Esperar a ver si llega", "Contarle su historia a toda la iglesia", "Pedirle que busque otra iglesia"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:26-27"],
    ["f58", 6, "o6", "aplicar", "Un hombre que salió de la cárcel no tiene identificación y no puede trabajar. ¿Qué hace su mentor?", "Lo ayuda a sacar sus documentos y a buscar trabajo", ["Le dice que se arregle solo", "Le da dinero cada mes sin más", "Lo deja de ver"], "«recíbele como a mí mismo».", "Filemón 1:15-18"],
    ["f59", 6, "o6", "aplicar", "Una persona que cumplió una condena por un delito contra un niño quiere congregarse. ¿Qué hace la iglesia?", "La recibe con amor, pero con reglas claras: nunca a solas con menores ni en los ministerios de niños, y cumpliendo la ley", ["La pone a servir con los niños para mostrarle confianza", "No la deja entrar nunca", "No dice nada a los líderes"], "La iglesia ama y protege: «Defended al débil y al huérfano».", "Salmos 82:3"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan para el regreso de alguien que sale de la cárcel es el mejor?", "Conocerlo antes, darle un mentor, ayudarlo con documentos, casa y trabajo, animarlo a cumplir sus condiciones, recibirlo en un grupo pequeño y revisar cada mes", ["Dejarlo solo para que demuestre su cambio", "Darle dinero y nada más", "Recibirlo sin ningún cuidado"], "«Así que, si me tienes por compañero, recíbele como a mí mismo».", "Filemón 1:15-18"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué le entregó el jefe de la cárcel a José, según Génesis 39:22?", "El cuidado de todos los presos", ["Las llaves de la ciudad", "Una espada", "Su libertad"], "«Y el jefe de la cárcel entregó en mano de José el cuidado de todos los presos que había en aquella prisión».", "Génesis 39:20-23"],
      ["m1-02", 1, "o1", "comprender", "¿Qué pide Hebreos 13:3 a los creyentes?", "Acordarse de los presos como si estuvieran presos con ellos", ["Olvidarse de los presos", "Juzgar a los presos", "Alejarse de las cárceles"], "«Acordaos de los presos, como si estuvierais presos juntamente con ellos».", "Hebreos 13:3"],
      ["m1-03", 1, "o1", "aplicar", "Un preso te pide que hables con su abogado sobre su caso. ¿Qué haces?", "Le explicas que no te corresponde intervenir en su caso legal, y sigues acompañándolo como capellán", ["Llamas al abogado y le das tu opinión", "Le dices que cambie de abogado", "Le prometes hablar con el juez"], "«Acordaos de los presos».", "Hebreos 13:3"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué en la cárcel muchas personas buscan a Dios por primera vez?", "Porque allí enfrentan su culpa, su soledad y su necesidad, y Dios oye su gemido", ["Porque no tienen otra cosa que hacer", "Porque los obligan", "No lo buscan"], "«Jehová miró desde los cielos a la tierra, Para oír el gemido de los presos».", "Salmos 102:19-20"],
      ["m1-05", 1, "o1", "recordar", "¿Qué hacía Jehová con lo que José hacía, según Génesis 39:23?", "Lo prosperaba", ["Lo castigaba", "Lo ignoraba", "Lo deshacía"], "«y lo que él hacía, Jehová lo prosperaba».", "Génesis 39:20-23"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué primera visita a un preso es la mejor?", "Seguir el procedimiento, presentarse con respeto, escuchar sin preguntar por el delito, ofrecer oración y no prometer favores", ["Preguntar primero por su delito", "Prometerle ayuda en su caso", "Entrar sin registrarse"], "«Acordaos de los presos, como si estuvierais presos juntamente con ellos».", "Hebreos 13:3"],
      ["m1-07", 2, "o2", "recordar", "¿Qué pasó en la cárcel de Filipos mientras Pablo y Silas cantaban, según Hechos 16:26?", "Hubo un gran terremoto y se abrieron las puertas", ["Llegó el rey", "Se fueron a dormir", "Se apagaron las luces"], "«Entonces sobrevino de repente un gran terremoto, de tal manera que los cimientos de la cárcel se sacudían; y al instante se abrieron todas las puertas».", "Hechos 16:25-26"],
      ["m1-08", 2, "o2", "comprender", "¿Qué hicieron los hermanos al ver las prisiones de Pablo, según Filipenses 1:14?", "Se atrevieron mucho más a hablar la palabra sin temor", ["Dejaron de predicar", "Se escondieron", "Se fueron de la ciudad"], "«se atreven mucho más a hablar la palabra sin temor».", "Filipenses 1:12-14"],
      ["m1-09", 2, "o2", "aplicar", "En Texas, un hermano de 17 años quiere ser voluntario en una prisión del estado. ¿Qué le dices?", "Que el sistema penitenciario pide tener al menos 18 años, y que mientras tanto puede orar y servir de otra manera", ["Que vaya sin decir su edad", "Que lleve una carta de su pastor y entre igual", "Que no puede servir nunca"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué los voluntarios del sistema penitenciario de Texas renuevan su capacitación cada dos años?", "Para seguir conociendo las reglas y los riesgos, y servir con seguridad", ["Para cobrar más", "Porque no confían en ellos", "No necesitan renovarla"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["m1-11", 2, "o2", "comprender", "¿Qué enseña que el carcelero creyera con toda su casa?", "Que el evangelio en la cárcel alcanza también a los que trabajan allí y a sus familias", ["Que solo los presos se salvan", "Que el carcelero no creyó", "Nada"], "«Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».", "Hechos 16:30-31"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué hace mejor el capellán ante un preso de otra fe?", "Respeta su libertad religiosa y lo ayuda a practicar su fe dentro de las reglas", ["Le niega todo hasta que se convierta", "Lo ignora", "Le dice que su fe está prohibida"], "«Andad sabiamente para con los de afuera».", "Colosenses 4:5-6"],
      ["m1-13", 3, "o3", "recordar", "¿Qué le prometió Jesús al ladrón arrepentido, según Lucas 23:43?", "Hoy estarás conmigo en el paraíso", ["Saldrás de la cruz", "Serás rico", "Mañana te perdonaré"], "«De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
      ["m1-14", 3, "o3", "comprender", "¿Qué enseña Miqueas 6:8 al capellán penitenciario?", "Que la justicia y la misericordia van juntas, con humildad delante de Dios", ["Que solo importa la justicia", "Que solo importa la misericordia", "Que no hay que juzgar nada"], "«solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios».", "Miqueas 6:8"],
      ["m1-15", 3, "o3", "aplicar", "Un preso te pide que le digas a la familia de su víctima que él está arrepentido. ¿Qué haces?", "Le explicas que no buscarás a la víctima por tu cuenta, y que cualquier reparación va por los caminos que permite la ley", ["Buscas a la familia enseguida", "Le dices que la víctima debe perdonarlo", "Le dices que no se arrepienta"], "«Y si en algo te dañó, o te debe, ponlo a mi cuenta».", "Filemón 1:15-18"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué el perdón de Dios no se gana?", "Porque es un regalo de su gracia que se recibe por la fe en Cristo", ["Porque se compra", "Porque se gana con buenas obras", "Porque no existe"], "El ladrón no tenía nada que ofrecer: «Acuérdate de mí cuando vengas en tu reino».", "Lucas 23:42-43"],
      ["m1-17", 3, "o3", "recordar", "¿Qué le dijo un ladrón al otro en la cruz, según Lucas 23:40?", "¿Ni aun temes tú a Dios, estando en la misma condenación?", ["Sálvate tú", "Pide ayuda a los soldados", "No digas nada"], "«¿Ni aun temes tú a Dios, estando en la misma condenación?».", "Lucas 23:40-41"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué respuesta a un preso que se convirtió y pregunta si ahora lo soltarán es la mejor?", "El perdón de Dios es real, pero no quita la sentencia; vive tu condena con un corazón nuevo", ["Sí, Dios hará que te suelten", "Tu conversión no cuenta", "Pide que te suelten por tu fe"], "«De cierto te digo que hoy estarás conmigo en el paraíso».", "Lucas 23:42-43"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué pide Isaías 1:17 hacer con el agraviado?", "Restituirlo", ["Olvidarlo", "Castigarlo", "Ignorarlo"], "«buscad el juicio, restituid al agraviado».", "Isaías 1:17"],
      ["m2-02", 4, "o4", "comprender", "¿Qué cuesta a la familia de un preso mantenerse en contacto con él?", "Las visitas, las llamadas y las cuentas de la cárcel, que cuestan tiempo y dinero", ["Nada", "Solo una carta al año", "Lo paga siempre el gobierno"], "«Que da pan a los hambrientos».", "Salmos 146:7"],
      ["m2-03", 4, "o4", "aplicar", "Los hijos de un preso empiezan a venir a la escuela dominical. ¿Qué haces?", "Los recibes con cariño, guardas su historia en confianza y les buscas un mentor", ["Les preguntas delante de todos por su papá", "Les dices que su papá es malo", "No los dejas participar"], "«haced justicia al huérfano».", "Isaías 1:17"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué la ayuda a la familia de un preso debe seguir todo el año y no solo en Navidad?", "Porque sus necesidades y su soledad siguen todo el año", ["Porque en Navidad no se necesita", "No debe seguir", "Para quedar bien"], "«Padre de huérfanos y defensor de viudas».", "Salmos 68:5-6"],
      ["m2-05", 4, "o4", "aplicar", "Una madre con su esposo preso no sabe cómo explicarles a sus hijos dónde está su papá. ¿Qué le aconsejas?", "Decirles la verdad con palabras sencillas y según su edad, y asegurarles que no es su culpa", ["Que les mienta", "Que no les diga nada nunca", "Que les diga que su papá ya no los quiere"], "Dios cuida a los niños: «Padre de huérfanos».", "Salmos 68:5-6"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué ayuda de Navidad a los hijos de los presos está mejor organizada?", "Coordinar con Angel Tree o con el capellán, comprar los regalos en nombre de sus padres, entregarlos con permiso y seguir en contacto", ["Repartir regalos en la puerta de la cárcel", "Publicar las fotos de los niños", "Pedir dinero a los presos"], "«aprended a hacer el bien».", "Isaías 1:17"],
      ["m2-07", 5, "o5", "recordar", "¿Cómo deben ser los enviados de Jesús, además de prudentes, según Mateo 10:16?", "Sencillos como palomas", ["Astutos como zorros", "Fuertes como leones", "Callados como peces"], "«y sencillos como palomas».", "Mateo 10:16"],
      ["m2-08", 5, "o5", "comprender", "¿Qué diferencia hay entre la compasión prudente y la ingenuidad?", "La prudente escucha y sigue las reglas; la ingenua lo cree todo y hace favores a escondidas", ["Ninguna", "La ingenua es más amorosa", "La prudente no ama"], "«El simple todo lo cree; Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["m2-09", 5, "o5", "aplicar", "Un preso le pide a un voluntario que le pase un mensaje a otro preso de otra unidad. ¿Qué hace?", "No lo pasa, le explica las reglas y se lo cuenta al capellán", ["Lo pasa porque es un mensaje corto", "Lo pasa la próxima vez", "Le pide dinero a cambio"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué los halagos de un preso pueden ser una señal de alarma?", "Porque a veces buscan ganar la confianza del voluntario para pedirle después que rompa una regla", ["Porque los presos no pueden agradecer", "No son una señal", "Porque el voluntario es mejor"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["m2-11", 5, "o5", "aplicar", "Una voluntaria se siente incómoda porque un preso le hace preguntas sobre su vida personal. ¿Qué hace?", "No responde lo personal, pone el límite con calma y se lo cuenta al capellán", ["Le cuenta todo para no ser grosera", "Deja de ir sin decir nada", "Le da su dirección"], "«sed, pues, prudentes como serpientes».", "Mateo 10:16"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué voluntario cuida mejor la seguridad de todos en la cárcel?", "El que sigue cada regla, no entra ni saca nada sin permiso, no da sus datos y avisa al capellán", ["El que hace pequeños favores", "El que cree todo lo que oye", "El que guarda los secretos peligrosos"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
      ["m2-13", 6, "o6", "recordar", "¿Cómo pidió Pablo que recibieran a Onésimo, según Filemón 1:16?", "No ya como esclavo, sino como hermano amado", ["Como un esclavo", "Como un enemigo", "Como un extraño"], "«no ya como esclavo, sino como más que esclavo, como hermano amado».", "Filemón 1:15-18"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué un mentor ayuda tanto al que sale de la cárcel?", "Porque lo acompaña en lo práctico y en su fe, y le ayuda a no volver a caer", ["Porque lo vigila", "Porque le da dinero", "No ayuda"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:26-27"],
      ["m2-15", 6, "o6", "aplicar", "Un hermano que salió de la cárcel tiene que presentarse a su oficial de libertad cada mes. ¿Qué hace su mentor?", "Lo anima a cumplir sus condiciones y lo acompaña", ["Le dice que no hace falta", "Lo ayuda a esconderse", "No se mete"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la iglesia que cierra la puerta al que sale de la cárcel hace daño?", "Porque lo deja solo cuando más necesita apoyo, y aumenta el peligro de que vuelva a caer", ["Porque protege a todos", "No hace daño", "Porque es lo correcto"], "«recíbele como a mí mismo».", "Filemón 1:15-18"],
      ["m2-17", 6, "o6", "comprender", "¿Qué enseña la historia de Onésimo sobre las personas que vienen de un pasado difícil?", "Que en Cristo pueden cambiar y volver a ser útiles", ["Que nunca cambian", "Que no merecen ayuda", "Que deben volver a la cárcel"], "«el cual en otro tiempo te fue inútil, pero ahora a ti y a mí nos es útil».", "Filemón 1:10-11"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué iglesia se parece más a Bernabé con alguien que sale de la cárcel?", "La que lo recibe con amor y prudencia, le da un mentor y lo ayuda en lo práctico", ["La que le tiene miedo y no lo deja acercarse", "La que le recuerda su pasado", "La que lo deja solo con sus problemas"], "«Entonces Bernabé, tomándole, lo trajo a los apóstoles».", "Hechos 9:26-27"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "capellania-3-e1",
      tipo: "corta",
      pregunta: "Explica lo que vive un preso y cómo lo acompaña el capellán.",
      ideas: [
        { id: "vive", peso: 30, texto: "La pérdida de la libertad, la separación de su familia, la culpa o el enojo.", formas: ["libertad", "su familia", "culpa", "enojo", "verguenza"] },
        { id: "dios", peso: 30, texto: "Dios está con los presos, como con José.", formas: ["jose", "dios esta con", "gemido de los presos", "no se olvido", "acordaos de los presos"] },
        { id: "acompana", peso: 30, texto: "Escucha sin juzgar, ora y no se mete en su caso legal.", formas: ["escuch*", "sin juzgar", "su caso", "su abogado", "orar", "ora"] },
      ],
      citas: ["Génesis 39:21", "Génesis 39:20-23", "Salmos 102:20", "Salmos 102:19-20", "Hebreos 13:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El preso pierde su libertad y su intimidad, vive lejos de su familia y carga culpa, enojo o vergüenza. Pero Dios está con él, como estuvo con José en la cárcel (Génesis 39:21). El capellán lo visita siguiendo las reglas, lo escucha sin juzgar, ora con él y no se mete en su caso legal.",
    },
    {
      id: "capellania-3-e2",
      tipo: "corta",
      pregunta: "Explica cómo llega el evangelio a la cárcel y qué libertad religiosa tienen los presos.",
      ideas: [
        { id: "evangelio", peso: 30, texto: "La Palabra no está presa: Pablo y Silas, el carcelero.", formas: ["no esta presa", "pablo y silas", "carcelero", "progreso del evangelio"] },
        { id: "rluipa", peso: 30, texto: "La ley RLUIPA protege la práctica religiosa de los presos.", formas: ["rluipa", "libertad religiosa", "practica religiosa", "carga sustancial"] },
        { id: "reglas", peso: 30, texto: "Se sirve a todos dentro de las reglas, con voluntarios capacitados.", formas: ["las reglas", "capacita*", "antecedentes", "a todos"] },
      ],
      citas: ["2 Timoteo 2:9", "Hechos 16:25", "Hechos 16:25-26", "Hechos 16:31", "Filipenses 1:12"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La palabra de Dios no está presa (2 Timoteo 2:9): Pablo y Silas cantaban en la cárcel, y el carcelero creyó. En los Estados Unidos, la ley RLUIPA protege la práctica religiosa de los presos, y por eso el capellán sirve a todos, dentro de las reglas, con voluntarios capacitados y con la revisión de antecedentes.",
    },
    {
      id: "capellania-3-e3",
      tipo: "corta",
      pregunta: "Explica la diferencia entre el perdón de Dios y las consecuencias de un delito.",
      ideas: [
        { id: "perdon", peso: 30, texto: "El perdón de Dios se recibe por la fe y limpia la culpa.", formas: ["perdon de dios", "por la fe", "arrepent*", "arrepient*", "limpia", "lo perdona", "perdonado"] },
        { id: "consecuencias", peso: 30, texto: "Las consecuencias, como la sentencia, siguen.", formas: ["sentencia", "consecuencias", "condena"], negativa: true },
        { id: "victimas", peso: 30, texto: "Las víctimas, y la reparación por caminos legales.", formas: ["victima*", "repar*", "ponlo a mi cuenta"] },
      ],
      citas: ["Lucas 23:41", "Lucas 23:40-41", "Lucas 23:43", "Lucas 23:42-43", "Filemón 1:18", "Filemón 1:15-18", "Miqueas 6:8"],
      pesoCita: 10,
      errores: [
        { id: "e3-libre", anula: "consecuencias", texto: "Decir que el perdón de Dios quita la sentencia.", formas: ["ya no tiene que cumplir", "ya no cumple", "sale libre", "lo sueltan", "quita la sentencia", "quita la condena", "borra la sentencia"] },
      ],
      modelo:
        "El perdón de Dios se recibe por la fe, con arrepentimiento, y limpia la culpa delante de él, como al ladrón en la cruz (Lucas 23:43). Pero no quita las consecuencias: la sentencia sigue. Y hay víctimas que sufren: si el preso quiere reparar el daño, lo hace por los caminos que permite la ley.",
    },
    {
      id: "capellania-3-e4",
      tipo: "breve",
      pregunta:
        "Un preso le pide a una voluntaria de tu iglesia su número de teléfono y le dice que ella es la única que lo entiende. Explica cómo debe responder ella y qué límites protegen a todos en la cárcel, con citas bíblicas.",
      ideas: [
        { id: "senal", peso: 25, texto: "Reconocer la señal de la manipulación.", formas: ["senal", "halago*", "manipul*", "engan*", "la unica que lo entiende"], negativa: true },
        { id: "datos", peso: 25, texto: "No dar sus datos ni hacer favores a escondidas.", formas: ["su numero", "datos", "favores", "a escondidas"], negativa: true },
        { id: "capellan", peso: 25, texto: "Ofrecer el camino oficial y avisar al capellán.", formas: ["capellan", "camino oficial", "supervisor"] },
        { id: "seguir", peso: 25, texto: "Seguir sirviendo con amor y con prudencia.", formas: ["seguir sirviendo", "sigue sirviendo", "con el mismo amor", "prudente*", "prudencia"] },
      ],
      basta: 85,
      citas: ["Mateo 10:16", "Proverbios 14:15", "2 Corintios 8:21"],
      pesoCita: 10,
      errores: [
        { id: "e4-da", anula: "datos", texto: "Darle su número de teléfono.", formas: ["le daria su numero", "darle su numero", "le da su numero", "le doy mi numero", "le daria mi numero"] },
      ],
      modelo:
        "Primero la voluntaria debería reconocer la señal: los halagos, como decirle que ella es la única que lo entiende, a veces buscan ganar su confianza para pedirle algo fuera de las reglas. Jesús nos envía como ovejas en medio de lobos, prudentes como serpientes y sencillos como palomas (Mateo 10:16). Por eso no le daría su número ni ningún dato personal, y no haría favores a escondidas, porque el simple todo lo cree, pero el avisado mira bien sus pasos (Proverbios 14:15). Le explicaría con amabilidad que las reglas no lo permiten y le ofrecería el camino oficial: hablar con el capellán de la unidad. Después le contaría el pedido a su capellán supervisor. Y seguiría sirviendo a ese preso con el mismo amor, con prudencia y sin rencor. En la cárcel nadie entra ni saca nada sin permiso, y todo se hace honradamente delante del Señor y delante de los hombres (2 Corintios 8:21), porque una regla rota pone en peligro a todos.",
    },
    {
      id: "capellania-3-e5",
      tipo: "breve",
      pregunta:
        "Un hombre sale de prisión el próximo mes. Conoció a Cristo en la cárcel y quiere congregarse en tu iglesia, pero algunos hermanos tienen miedo. Explica cómo lo recibiría la iglesia, con citas bíblicas.",
      ideas: [
        { id: "recibir", peso: 25, texto: "Recibirlo con amor, como Bernabé a Saulo.", formas: ["bernabe", "recib*", "acog*"] },
        { id: "mentor", peso: 25, texto: "Un mentor que lo acompañe.", formas: ["mentor"] },
        { id: "practico", peso: 25, texto: "Ayuda práctica: documentos, casa, trabajo y sus condiciones.", formas: ["documentos", "trabajo", "donde vivir", "condiciones"] },
        { id: "prudencia", peso: 25, texto: "Prudencia y un grupo pequeño.", formas: ["prudencia", "grupo pequeno", "con prudencia", "reglas claras"] },
      ],
      basta: 85,
      citas: ["Hechos 9:26-27", "Hechos 9:27", "Filemón 1:17", "Filemón 1:15-18", "Filemón 1:10-11", "2 Corintios 5:17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero hablaría con los hermanos que tienen miedo y les recordaría que, cuando todos le tenían miedo a Saulo, Bernabé lo tomó y lo llevó a los apóstoles (Hechos 9:27). Si se puede, lo conoceríamos antes de su salida, con el capellán de la prisión. Le asignaríamos un mentor maduro, del mismo sexo, que lo acompañe el primer año. Lo ayudaríamos en lo práctico: sacar sus documentos, buscar un lugar donde vivir y un trabajo, y le recordaríamos que cumpla las condiciones de su libertad. Lo recibiríamos en un grupo pequeño, con amor y con prudencia, como Pablo pidió que recibieran a Onésimo: recíbele como a mí mismo (Filemón 1:17), porque el que antes fue inútil, en Cristo ahora es útil. Si su delito hubiera sido contra niños, pondríamos reglas claras para cuidarlos. Y cada mes revisaríamos con él y con su mentor cómo va, y celebraríamos sus avances.",
    },
  ],
  breve: {
    id: "capellania-3-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo organizaría tu iglesia un ministerio en una cárcel o prisión de tu ciudad, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "preso", peso: 15, texto: "El preso y la presencia de Dios en la cárcel.", formas: ["jose", "acordaos de los presos", "gemido de los presos", "los presos"] },
      { id: "evangelio", peso: 20, texto: "Llevar la Palabra respetando la libertad religiosa.", formas: ["no esta presa", "estudio biblico", "rluipa", "libertad religiosa"] },
      { id: "perdon", peso: 15, texto: "El perdón y las consecuencias, y las víctimas.", formas: ["perdon", "sentencia", "victima*"] },
      { id: "familias", peso: 15, texto: "Las familias de los presos.", formas: ["familias", "sus hijos", "angel tree", "arbol de angeles"] },
      { id: "prudencia", peso: 15, texto: "La prudencia y las reglas.", formas: ["prudentes", "prudencia", "las reglas", "capacitacion"] },
      { id: "salida", peso: 20, texto: "El regreso a la comunidad.", formas: ["salen", "salida", "mentor", "bernabe"] },
    ],
    basta: 85,
    citas: ["Hebreos 13:3", "Génesis 39:21", "Hechos 16:25", "2 Timoteo 2:9", "Lucas 23:43", "Miqueas 6:8", "Salmos 68:5", "Isaías 1:17", "Mateo 10:16", "Hechos 9:27", "Filemón 1:17"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría recordando a la iglesia que debemos acordarnos de los presos como si estuviéramos presos con ellos (Hebreos 13:3), y que Dios estaba con José en la cárcel (Génesis 39:21). Formaríamos un equipo de voluntarios que haga la capacitación y la revisión de antecedentes del sistema penitenciario, y coordinaríamos con el capellán un estudio bíblico cada semana, porque la palabra de Dios no está presa (2 Timoteo 2:9), respetando la libertad religiosa de cada preso. Acompañaríamos a los que reconocen su culpa con el perdón de Cristo, como al ladrón en la cruz (Lucas 23:43), recordándoles que la sentencia sigue y teniendo presentes a las víctimas, porque Dios pide justicia y misericordia (Miqueas 6:8). Ayudaríamos a las familias de los presos y a sus hijos, también en Navidad con el programa Angel Tree, porque Dios es padre de huérfanos (Salmos 68:5). Enseñaríamos a los voluntarios a ser prudentes como serpientes y sencillos como palomas (Mateo 10:16), siguiendo todas las reglas. Y recibiríamos a los que salen con un mentor y con ayuda práctica, como Bernabé recibió a Saulo (Hechos 9:27).",
  },
};
