/**
 * El banco de «Familia y relaciones» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el diseño de Dios para el matrimonio y la familia · o2 el amor, el respeto y la crianza (la autoridad
 * que sirve, nunca la violencia) · o3 la soltería, la amistad y la pureza · o4 el perdón, los conflictos y pedir ayuda ·
 * o5 el versículo de memoria (Salmos 127:1).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-familia-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_FAMILIA: BancoMateria = {
  materia: "n2-familia",
  repaso: {
    "n2-familia-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dijo Dios en Génesis 2:18?", "No es bueno que el hombre esté solo", ["Es mejor que el hombre viva solo", "El hombre debe trabajar sin descanso", "La mujer debe servir al hombre en todo"], "No es bueno que el hombre esté solo; le haré ayuda idónea para él.", "Génesis 2:18"],
      ["1-r2", 1, "o1", "comprender", "¿Qué significa ayuda idónea?", "Una compañera que le corresponde, igual en dignidad", ["Una sirvienta", "Alguien inferior", "Una ayudante por un tiempo"], "Hombre y mujer fueron creados a imagen de Dios.", "Génesis 1:27"],
      ["1-r3", 1, "o1", "recordar", "¿Qué dijo Jesús sobre lo que Dios juntó?", "Que no lo separe el hombre", ["Que se puede separar cuando se quiera", "Que solo los sacerdotes lo separan", "Que dura solo unos años"], "Lo que Dios juntó, no lo separe el hombre.", "Mateo 19:6"],
    ] as P[]).map(p),
    "n2-familia-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cómo deben amar los maridos a sus esposas, según Efesios 5:25?", "Así como Cristo amó a la iglesia y se entregó por ella", ["Cuando ellas lo merezcan", "Con palabras solamente", "Mandándoles en todo"], "Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella.", "Efesios 5:25"],
      ["2-r2", 2, "o2", "comprender", "¿Qué pide Efesios 5:21 a todos los creyentes?", "Someterse unos a otros en el temor de Dios", ["Que manden los más fuertes", "Que cada uno haga lo que quiera", "Que solo obedezcan los jóvenes"], "Someteos unos a otros en el temor de Dios.", "Efesios 5:21"],
      ["2-r3", 2, "o2", "analizar", "¿Justifica la autoridad del esposo el control o la violencia?", "No: la autoridad bíblica es para servir, y ante la violencia se busca protección", ["Sí, si la esposa no obedece", "Sí, en los casos graves", "Depende de la cultura"], "El modelo es Cristo, que amó a la iglesia y se entregó por ella.", "Efesios 5:25"],
    ] as P[]).map(p),
    "n2-familia-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Dónde deben enseñar los padres la Palabra, según Deuteronomio 6:7?", "En la casa, en el camino, al acostarse y al levantarse", ["Solo en el templo", "Solo los sábados", "Solo cuando los hijos sean mayores"], "Las repetirás a tus hijos, y hablarás de ellas estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes.", "Deuteronomio 6:7"],
      ["3-r2", 3, "o2", "recordar", "¿Qué pide Efesios 6:1 a los hijos?", "Obedecer a sus padres en el Señor", ["Obedecer solo cuando quieran", "Mandar a sus padres", "Irse de casa pronto"], "Hijos, obedeced en el Señor a vuestros padres, porque esto es justo.", "Efesios 6:1"],
      ["3-r3", 3, "o2", "comprender", "¿Qué no deben hacer los padres, según Efesios 6:4?", "Provocar a ira a sus hijos", ["Corregir a sus hijos", "Enseñarles la Biblia", "Ponerles límites"], "Padres, no provoquéis a ira a vuestros hijos, sino criadlos en disciplina y amonestación del Señor.", "Efesios 6:4"],
    ] as P[]).map(p),
    "n2-familia-4": ([
      ["4-r1", 4, "o3", "comprender", "¿Qué ventaja tiene el soltero, según 1 Corintios 7:32?", "Puede ocuparse de las cosas del Señor con menos distracciones", ["No tiene que servir a Dios", "Es más santo que el casado", "No tiene responsabilidades"], "El soltero tiene cuidado de las cosas del Señor, de cómo agradar al Señor.", "1 Corintios 7:32"],
      ["4-r2", 4, "o3", "recordar", "Según Proverbios 17:17, ¿cuándo ama el amigo?", "En todo tiempo", ["Solo cuando le conviene", "Solo en la alegría", "Una vez al año"], "En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia.", "Proverbios 17:17"],
      ["4-r3", 4, "o3", "comprender", "¿Qué enseña Proverbios 27:17 sobre la amistad?", "Que un buen amigo nos afila: nos anima y nos corrige", ["Que los amigos deben pensar igual en todo", "Que la amistad no sirve", "Que hay que tener muchos amigos"], "Hierro con hierro se aguza; y así el hombre aguza el rostro de su amigo.", "Proverbios 27:17"],
    ] as P[]).map(p),
    "n2-familia-5": ([
      ["5-r1", 5, "o3", "recordar", "¿Cuál es la voluntad de Dios, según 1 Tesalonicenses 4:3?", "Nuestra santificación: que nos apartemos de fornicación", ["Que hagamos lo que sintamos", "Que nadie se case", "Que vivamos sin reglas"], "La voluntad de Dios es vuestra santificación; que os apartéis de fornicación.", "1 Tesalonicenses 4:3"],
      ["5-r2", 5, "o3", "recordar", "¿Qué manda 1 Corintios 6:18?", "Huir de la fornicación", ["Discutir con la tentación", "Esconder el pecado", "Probar para saber"], "Huid de la fornicación.", "1 Corintios 6:18"],
      ["5-r3", 5, "o3", "comprender", "¿Qué hace Dios con quien confiesa su pecado, según 1 Juan 1:9?", "Lo perdona y lo limpia", ["Lo rechaza para siempre", "Lo obliga a pagar primero", "Lo ignora"], "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.", "1 Juan 1:9"],
    ] as P[]).map(p),
    "n2-familia-6": ([
      ["6-r1", 6, "o4", "recordar", "¿Cómo debemos perdonar, según Colosenses 3:13?", "De la manera que Cristo nos perdonó", ["Solo si nos piden perdón tres veces", "Solo a los que lo merecen", "Con condiciones"], "De la manera que Cristo os perdonó, así también hacedlo vosotros.", "Colosenses 3:13"],
      ["6-r2", 6, "o4", "recordar", "¿Qué es el vínculo perfecto, según Colosenses 3:14?", "El amor", ["La ley", "El dinero", "La costumbre"], "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.", "Colosenses 3:14"],
      ["6-r3", 6, "o4", "aplicar", "¿Qué hacer cuando en una familia hay violencia o peligro?", "Buscar protección y ayuda: el pastor, un consejero y, si hace falta, las autoridades", ["Callar para no avergonzar a la familia", "Esperar a que pase solo", "Responder con violencia"], "Dios puso autoridades para castigar el mal: proteger a los que sufren es parte de amar.", "Romanos 13:4"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el diseño de Dios para la familia (8)
    ["f01", 1, "o1", "recordar", "¿A imagen de quién creó Dios al hombre y a la mujer?", "A imagen de Dios", ["A imagen de los ángeles", "A imagen de los animales", "A imagen de Adán solamente"], "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.", "Génesis 1:27"],
    ["f02", 1, "o1", "recordar", "Según Génesis 2:24, ¿qué hace el hombre al casarse?", "Deja a su padre y a su madre y se une a su mujer", ["Se queda a vivir con sus padres", "Deja a su mujer por sus padres", "Vive solo"], "Dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.", "Génesis 2:24"],
    ["f03", 1, "o1", "comprender", "¿Qué significa ser una sola carne?", "Una unión completa y para toda la vida", ["Un contrato por un tiempo", "Una amistad sin compromiso", "Solo vivir en la misma casa"], "Así que no son ya más dos, sino una sola carne.", "Mateo 19:6"],
    ["f04", 1, "o1", "comprender", "¿En qué se diferencia un pacto de un contrato?", "El pacto es un compromiso de fidelidad; el contrato se rompe cuando conviene", ["No hay ninguna diferencia", "El contrato es más santo", "El pacto se renueva cada año"], "Lo que Dios juntó, no lo separe el hombre.", "Mateo 19:6"],
    ["f05", 1, "o1", "recordar", "¿A qué pasaje volvió Jesús cuando le preguntaron por el matrimonio?", "Al principio, en Génesis", ["A las leyes de Roma", "A las tradiciones de los ancianos", "A los Salmos"], "¿No habéis leído que el que los hizo al principio, varón y hembra los hizo?", "Mateo 19:4"],
    ["f06", 1, "o1", "comprender", "¿Cómo ve Dios a las familias que no tienen padre y madre juntos?", "Las ama y quiere ser el centro de cada una", ["No las acepta", "Las ignora", "Las castiga"], "Padre de huérfanos y defensor de viudas es Dios en su santa morada.", "Salmos 68:5"],
    ["f07", 1, "o1", "aplicar", "Una pareja recién casada deja que los padres de él decidan todo en su hogar. ¿Qué enseña Génesis 2:24?", "Que el matrimonio forma un hogar nuevo que toma sus propias decisiones", ["Que los padres deben decidir por ellos", "Que el matrimonio no cambia nada", "Que deben dejar de ver a sus padres"], "Dejará el hombre a su padre y a su madre, y se unirá a su mujer.", "Génesis 2:24"],
    ["f08", 1, "o5", "recordar", "¿Cómo empieza Salmos 127:1, el versículo de memoria de esta materia?", "Si Jehová no edificare la casa, en vano trabajan los que la edifican", ["Yo y mi casa serviremos a Jehová", "Instruye al niño en su camino", "Mejor es lo poco del justo"], "Si Jehová no edificare la casa, en vano trabajan los que la edifican.", "Salmos 127:1"],
    // ---- lección 2: el matrimonio, amor y respeto (8)
    ["f09", 2, "o2", "recordar", "¿Qué hizo Cristo por la iglesia, según Efesios 5:25?", "Se entregó a sí mismo por ella", ["La dejó sola", "Le dio una ley", "La juzgó"], "Así como Cristo amó a la iglesia, y se entregó a sí mismo por ella.", "Efesios 5:25"],
    ["f10", 2, "o2", "recordar", "Según Efesios 5:28, ¿cómo deben amar los maridos a sus mujeres?", "Como a sus mismos cuerpos", ["Menos que a sí mismos", "Solo con palabras", "Como a sus siervos"], "Los maridos deben amar a sus mujeres como a sus mismos cuerpos.", "Efesios 5:28"],
    ["f11", 2, "o2", "recordar", "¿Qué pide Efesios 5:33 a la esposa?", "Que respete a su marido", ["Que mande en la casa", "Que no hable nunca", "Que trabaje sola"], "Y la mujer respete a su marido.", "Efesios 5:33"],
    ["f12", 2, "o2", "comprender", "¿Cómo deben tratar los maridos a sus esposas, según 1 Pedro 3:7?", "Con sabiduría y honor, como coherederas de la gracia", ["Con dureza", "Con indiferencia", "Como inferiores"], "Dando honor a la mujer como a vaso más frágil, y como a coherederas de la gracia de la vida.", "1 Pedro 3:7"],
    ["f13", 2, "o2", "analizar", "¿En qué se diferencia la autoridad que sirve del control que domina?", "La autoridad bíblica cuida y se entrega; el control humilla y oprime", ["En nada: mandar es lo mismo", "El control es más bíblico", "En el hogar no hay autoridad"], "Cristo amó a la iglesia y se entregó por ella: ese es el modelo de la autoridad.", "Efesios 5:25"],
    ["f14", 2, "o2", "aplicar", "¿Qué debe hacer una persona que sufre violencia en su matrimonio?", "Buscar protección y ayuda: el pastor, la familia y, si hace falta, las autoridades", ["Aguantar en silencio", "Culparse a sí misma", "Responder con violencia"], "Dios puso autoridades para castigar el mal: nadie debe quedarse en peligro.", "Romanos 13:4"],
    ["f15", 2, "o2", "aplicar", "¿Cómo hablar en un desacuerdo de pareja, según Efesios 4:29?", "Sin palabras corrompidas, solo con lo que edifica", ["Gritando para ganar", "Callando por días", "Sacando el pasado"], "Ninguna palabra corrompida salga de vuestra boca, sino la que sea buena para la necesaria edificación.", "Efesios 4:29"],
    ["f16", 2, "o2", "comprender", "¿Por qué conviene que la pareja ore y lea la Biblia junta?", "Porque Dios en el centro fortalece la unión", ["Porque es una regla de la iglesia", "Porque así no hablan de otras cosas", "No conviene: la fe es solo privada"], "Cordón de tres dobleces no se rompe pronto.", "Eclesiastés 4:12"],
    // ---- lección 3: padres e hijos (8)
    ["f17", 3, "o2", "recordar", "¿Dónde deben estar primero las palabras de Dios, según Deuteronomio 6:6?", "En el corazón de los padres", ["En las paredes de la casa", "Solo en el templo", "Solo en la mente de los hijos"], "Y estas palabras que yo te mando hoy, estarán sobre tu corazón.", "Deuteronomio 6:6"],
    ["f18", 3, "o2", "recordar", "¿Qué mandamiento tiene promesa, según Efesios 6:2?", "Honrar a padre y madre", ["No matar", "No robar", "Guardar el día de reposo"], "Honra a tu padre y a tu madre, que es el primer mandamiento con promesa.", "Efesios 6:2"],
    ["f19", 3, "o2", "recordar", "¿Qué dice Proverbios 22:6 del niño instruido en su camino?", "Que aun de viejo no se apartará de él", ["Que nunca fallará", "Que será rico", "Que sus padres no tendrán problemas"], "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.", "Proverbios 22:6"],
    ["f20", 3, "o2", "comprender", "¿Qué significa criar en disciplina y amonestación del Señor?", "Con amor, límites claros, enseñanza y corrección sin violencia", ["Con castigos duros y sin explicación", "Sin ninguna regla", "Dejándolo todo a la escuela"], "Criadlos en disciplina y amonestación del Señor.", "Efesios 6:4"],
    ["f21", 3, "o2", "comprender", "¿Cómo se provoca a ira a los hijos?", "Con dureza, burlas, injusticia o promesas incumplidas", ["Poniéndoles límites con amor", "Enseñándoles la Biblia", "Escuchándolos"], "Padres, no exasperéis a vuestros hijos, para que no se desalienten.", "Colosenses 3:21"],
    ["f22", 3, "o2", "comprender", "¿Por qué la fe no se hereda como el apellido?", "Porque se transmite con palabras y con ejemplo, y cada uno debe creer", ["Porque los hijos no pueden creer", "Porque es solo para adultos", "Porque se hereda sola"], "Las repetirás a tus hijos: la fe se enseña en la vida diaria.", "Deuteronomio 6:7"],
    ["f23", 3, "o2", "aplicar", "¿Cuál es una buena forma de enseñar la fe en casa?", "Orar juntos, leer una historia bíblica y servir juntos a alguien", ["Hablar de Dios solo cuando se portan mal", "Dejarlo todo a la escuela dominical", "Hacerles memorizar sin explicar"], "Hablarás de ellas estando en tu casa, y andando por el camino.", "Deuteronomio 6:7"],
    ["f24", 3, "o2", "aplicar", "Un padre se equivoca y trata injustamente a su hijo. ¿Qué es lo más bíblico?", "Pedirle perdón: así le enseña humildad y gracia", ["No reconocerlo para no perder autoridad", "Castigarlo más", "Fingir que no pasó nada"], "Confesaos vuestras ofensas unos a otros.", "Santiago 5:16"],
    // ---- lección 4: la soltería y la amistad (7)
    ["f25", 4, "o3", "recordar", "Según 1 Corintios 7:7, ¿qué tiene cada uno?", "Su propio don de Dios", ["El mismo llamado que todos", "La obligación de casarse", "La obligación de quedarse soltero"], "Cada uno tiene su propio don de Dios, uno a la verdad de un modo, y otro de otro.", "1 Corintios 7:7"],
    ["f26", 4, "o3", "comprender", "¿La soltería es una vida incompleta?", "No: es una etapa o un llamado para servir a Dios con libertad", ["Sí: solo el casado está completo", "Sí: es un castigo", "Sí: hay que salir de ella rápido"], "El soltero tiene cuidado de las cosas del Señor.", "1 Corintios 7:32"],
    ["f27", 4, "o3", "recordar", "¿Cómo llamó Jesús a sus discípulos en Juan 15:15?", "Amigos", ["Siervos para siempre", "Extraños", "Simples alumnos"], "Os he llamado amigos, porque todas las cosas que oí de mi Padre, os las he dado a conocer.", "Juan 15:15"],
    ["f28", 4, "o3", "recordar", "Según Juan 15:13, ¿cuál es el amor más grande?", "Poner la vida por los amigos", ["Dar regalos caros", "Decir palabras bonitas", "Estar siempre de acuerdo"], "Nadie tiene mayor amor que este, que uno ponga su vida por sus amigos.", "Juan 15:13"],
    ["f29", 4, "o3", "comprender", "¿Qué advierte 1 Corintios 15:33 sobre las compañías?", "Que las malas conversaciones corrompen las buenas costumbres", ["Que no hay que tener amigos", "Que las compañías no importan", "Que hay que juzgar a todos"], "No erréis; las malas conversaciones corrompen las buenas costumbres.", "1 Corintios 15:33"],
    ["f30", 4, "o3", "comprender", "¿Por qué la pareja debe compartir la fe, según 2 Corintios 6:14?", "Porque no conviene unirse en yugo desigual con los incrédulos", ["Por una simple costumbre de la iglesia", "Porque los no creyentes son malos", "No importa la fe de la pareja"], "No os unáis en yugo desigual con los incrédulos.", "2 Corintios 6:14"],
    ["f31", 4, "o3", "aplicar", "Un joven siente que su vida no tendrá sentido hasta que se case. ¿Qué le enseña esta lección?", "Que puede servir a Dios con libertad y propósito ahora mismo", ["Que debe casarse pronto con cualquiera", "Que tiene razón", "Que Dios no lo usará hasta que se case"], "El soltero tiene cuidado de las cosas del Señor, de cómo agradar al Señor.", "1 Corintios 7:32"],
    // ---- lección 5: la pureza sexual (7)
    ["f32", 5, "o3", "recordar", "¿Qué hizo José ante la mujer de Potifar?", "Huyó", ["Discutió con ella", "Cedió a la tentación", "Se escondió en la casa"], "Él dejó su ropa en las manos de ella, y huyó y salió.", "Génesis 39:12"],
    ["f33", 5, "o3", "comprender", "Según 1 Corintios 6:19-20, ¿por qué el cuerpo del creyente se guarda en pureza?", "Porque es templo del Espíritu Santo, comprado por precio", ["Porque el cuerpo es malo", "Porque el cuerpo no importa", "Porque así lo dice la cultura"], "Vuestro cuerpo es templo del Espíritu Santo; habéis sido comprados por precio.", "1 Corintios 6:19-20"],
    ["f34", 5, "o3", "recordar", "¿Qué dice Hebreos 13:4 del matrimonio?", "Que sea honroso en todos, y el lecho sin mancilla", ["Que es opcional para todos", "Que es una costumbre antigua", "Que es solo para los ricos"], "Honroso sea en todos el matrimonio, y el lecho sin mancilla.", "Hebreos 13:4"],
    ["f35", 5, "o3", "comprender", "¿Por qué la pornografía es un peligro para el creyente?", "Porque daña el corazón, la mente y las relaciones", ["Porque es solo una mala costumbre", "No es un peligro si es en privado", "Porque cuesta dinero"], "Cualquiera que mira a una mujer para codiciarla, ya adulteró con ella en su corazón.", "Mateo 5:28"],
    ["f36", 5, "o3", "aplicar", "¿Cuál es una forma práctica de cuidar la pureza en el noviazgo?", "Poner límites claros y evitar las situaciones de tentación", ["Probar para conocerse mejor", "No hablar nunca del tema", "Confiar solo en la fuerza de voluntad"], "Huid de la fornicación.", "1 Corintios 6:18"],
    ["f37", 5, "o3", "recordar", "Según Filipenses 4:8, ¿en qué debemos pensar?", "En todo lo verdadero, honesto, justo y puro", ["En lo que nos guste", "En los errores de otros", "En las riquezas"], "Todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, en esto pensad.", "Filipenses 4:8"],
    ["f38", 5, "o3", "aplicar", "Un hermano cayó en pecado sexual y cree que Dios ya no lo puede usar. ¿Qué le dirías?", "Que si confiesa, Dios perdona y restaura, y que busque ayuda pastoral", ["Que ya no tiene remedio", "Que lo esconda", "Que no fue tan grave"], "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.", "1 Juan 1:9"],
    // ---- lección 6: perdón, conflictos y restauración (7)
    ["f39", 6, "o4", "recordar", "Según Efesios 4:26, ¿qué no debe pasar con el enojo?", "Que se ponga el sol sobre nuestro enojo", ["Que se exprese", "Que se reconozca", "Que se hable"], "Airaos, pero no pequéis; no se ponga el sol sobre vuestro enojo.", "Efesios 4:26"],
    ["f40", 6, "o4", "recordar", "¿Cuántas veces dijo Jesús que hay que perdonar, en Mateo 18:22?", "Hasta setenta veces siete", ["Hasta siete veces", "Solo una vez", "Tres veces"], "No te digo hasta siete, sino aun hasta setenta veces siete.", "Mateo 18:22"],
    ["f41", 6, "o4", "comprender", "¿Por qué permitió Moisés el divorcio, según Jesús?", "Por la dureza del corazón; al principio no fue así", ["Porque era el plan de Dios", "Porque el matrimonio no importa", "Porque así lo quería el pueblo"], "Por la dureza de vuestro corazón Moisés os permitió repudiar a vuestras mujeres; mas al principio no fue así.", "Mateo 19:8"],
    ["f42", 6, "o4", "comprender", "¿Cuál es el mejor camino ante un caso de divorcio o de nuevo matrimonio?", "Tratarlo con el pastor, con la Biblia abierta y con gracia", ["Decidirlo solo, sin consejo", "Seguir lo que diga la mayoría", "Ignorar lo que dice la Biblia"], "Jesús habló del divorcio en Mateo 19 y Pablo del abandono en 1 Corintios 7: cada caso pide consejo pastoral.", "1 Corintios 7:10-15"],
    ["f43", 6, "o4", "aplicar", "¿Cuál es una buena regla para resolver un conflicto en casa?", "Hablar del problema sin atacar a la persona", ["Gritar más fuerte", "Dejar de hablarse por días", "Contarlo a todos menos al afectado"], "Todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.", "Santiago 1:19"],
    ["f44", 6, "o4", "aplicar", "¿Por qué pedir ayuda no es fracasar?", "Porque proteger y sanar a la familia es parte de amar como Cristo", ["Porque los problemas se resuelven solos", "Porque nadie debe saber lo que pasa en casa", "Porque pedir ayuda es pecado"], "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.", "Gálatas 6:2"],
    ["f45", 6, "o4", "comprender", "¿De qué deben vestirse los creyentes en la familia, según Colosenses 3:12?", "De misericordia, benignidad, humildad, mansedumbre y paciencia", ["De ropa cara", "De orgullo y dureza", "De indiferencia"], "Vestíos, pues, como escogidos de Dios, santos y amados, de entrañable misericordia, de benignidad, de humildad, de mansedumbre, de paciencia.", "Colosenses 3:12"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Cómo creó Dios al ser humano, según Génesis 1:27?", "Varón y hembra", ["Solo al varón", "Igual que a los animales", "Sin diferencia alguna"], "Varón y hembra los creó.", "Génesis 1:27"],
      ["m1-02", 1, "o1", "recordar", "¿Qué dijo Dios que haría por Adán, según Génesis 2:18?", "Le haría ayuda idónea", ["Le daría muchos animales", "Lo dejaría solo", "Le daría un trabajo"], "Le haré ayuda idónea para él.", "Génesis 2:18"],
      ["m1-03", 1, "o1", "comprender", "¿Qué significa dejar padre y madre al casarse?", "Formar un hogar nuevo, sin dejar de honrar a los padres", ["Dejar de hablar con los padres", "Desobedecer a los padres", "Vivir siempre con ellos"], "Dejará el hombre a su padre y a su madre, y se unirá a su mujer.", "Génesis 2:24"],
      ["m1-04", 1, "o1", "recordar", "Según Mateo 19:6, ¿cuántos son ya los casados?", "Ya no son dos, sino una sola carne", ["Siguen siendo dos", "Son tres con Dios", "Depende de ellos"], "Así que no son ya más dos, sino una sola carne.", "Mateo 19:6"],
      ["m1-05", 1, "o1", "comprender", "Según el diseño de Dios, ¿entre quiénes es el matrimonio?", "Entre un hombre y una mujer", ["Entre quienes se quieran, sin importar más", "Entre varios a la vez", "Solo entre creyentes ricos"], "El que los hizo al principio, varón y hembra los hizo.", "Mateo 19:4"],
      ["m1-06", 1, "o1", "aplicar", "¿Cuál es un primer paso para que Dios sea el centro del hogar?", "Orar juntos y leer la Biblia en familia", ["Comprar una casa más grande", "Ir a la iglesia solo en las fiestas", "Dejar la fe para los domingos"], "Si Jehová no edificare la casa, en vano trabajan los que la edifican.", "Salmos 127:1"],
      ["m1-07", 2, "o2", "recordar", "¿Cómo debe la esposa sujetarse a su marido, según Efesios 5:22?", "Como al Señor", ["Como una esclava", "Sin ningún límite, aun para pecar", "Solo cuando le convenga"], "Las casadas estén sujetas a sus propios maridos, como al Señor.", "Efesios 5:22"],
      ["m1-08", 2, "o2", "comprender", "¿Qué modelo de amor se le pide al esposo?", "El de Cristo, que se entregó por la iglesia", ["El de los reyes de la tierra", "El de la cultura", "El de sus padres"], "Así como Cristo amó a la iglesia, y se entregó a sí mismo por ella.", "Efesios 5:25"],
      ["m1-09", 2, "o2", "recordar", "Según Colosenses 3:19, ¿cómo no deben ser los maridos con sus mujeres?", "Ásperos", ["Cariñosos", "Pacientes", "Generosos"], "Maridos, amad a vuestras mujeres, y no seáis ásperos con ellas.", "Colosenses 3:19"],
      ["m1-10", 2, "o2", "comprender", "¿Qué pasa con las oraciones del marido que no honra a su esposa, según 1 Pedro 3:7?", "Tienen estorbo", ["Son más fuertes", "No cambian en nada", "Dios las responde primero"], "Para que vuestras oraciones no tengan estorbo.", "1 Pedro 3:7"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué pide 1 Corintios 7:3 a los esposos sobre la intimidad?", "Cumplir con amor el deber conyugal el uno con el otro", ["Vivir separados para ser más santos", "No hablar nunca del tema", "Buscar afuera lo que falta"], "El marido cumpla con la mujer el deber conyugal, y asimismo la mujer con el marido.", "1 Corintios 7:3"],
      ["m1-12", 2, "o2", "aplicar", "En una pareja, uno grita y humilla al otro cada vez que discuten. ¿Qué enseña la Biblia?", "Que es pecado y que deben buscar ayuda para cambiar", ["Que es normal en el matrimonio", "Que el que grita tiene la autoridad", "Que no hay que decir nada"], "Quítense de vosotros toda amargura, enojo, ira, gritería y maledicencia.", "Efesios 4:31"],
      ["m1-13", 3, "o2", "recordar", "¿Qué dice Efesios 6:1 de obedecer a los padres?", "Que es justo", ["Que es opcional", "Que es solo para niños pequeños", "Que no importa"], "Hijos, obedeced en el Señor a vuestros padres, porque esto es justo.", "Efesios 6:1"],
      ["m1-14", 3, "o2", "recordar", "Según Proverbios 22:6, ¿qué hará el niño instruido en su camino cuando sea viejo?", "No se apartará de él", ["Nunca tendrá problemas", "Será famoso", "Se apartará pronto"], "Aun cuando fuere viejo no se apartará de él.", "Proverbios 22:6"],
      ["m1-15", 3, "o2", "comprender", "¿Qué les pasa a los hijos exasperados, según Colosenses 3:21?", "Se desalientan", ["Se vuelven más obedientes", "Se hacen más fuertes", "No les afecta"], "Padres, no exasperéis a vuestros hijos, para que no se desalienten.", "Colosenses 3:21"],
      ["m1-16", 3, "o2", "comprender", "¿Por qué los padres son los primeros maestros de la fe?", "Porque Dios les encargó enseñar a sus hijos en la vida diaria", ["Porque saben más que el pastor", "Porque la iglesia no enseña", "Porque así lo dice la ley civil"], "Las repetirás a tus hijos.", "Deuteronomio 6:7"],
      ["m1-17", 3, "o2", "recordar", "¿Qué debe acompañar a la corrección de los hijos?", "El amor y la enseñanza del Señor", ["La violencia", "La burla", "El silencio"], "Criadlos en disciplina y amonestación del Señor.", "Efesios 6:4"],
      ["m1-18", 3, "o2", "aplicar", "¿Qué hábito de fe es sencillo para empezar en casa?", "Orar juntos antes de comer o al acostarse", ["Leer toda la Biblia en una semana", "Ayunar cuarenta días en familia", "Esperar a que los hijos crezcan"], "Al acostarte, y cuando te levantes.", "Deuteronomio 6:7"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿De qué tiene cuidado el soltero, según 1 Corintios 7:32?", "De las cosas del Señor", ["De las cosas del mundo", "Solo de su trabajo", "De nada"], "El soltero tiene cuidado de las cosas del Señor, de cómo agradar al Señor.", "1 Corintios 7:32"],
      ["m2-02", 4, "o3", "comprender", "¿Por qué dice Pablo que el soltero puede servir sin impedimento?", "Porque tiene menos distracciones para servir al Señor", ["Porque el casado no puede servir", "Porque el matrimonio es malo", "Porque los solteros son mejores"], "Para que sin impedimento os acerquéis al Señor.", "1 Corintios 7:35"],
      ["m2-03", 4, "o3", "recordar", "¿Cómo es el amigo en tiempo de angustia, según Proverbios 17:17?", "Como un hermano", ["Como un extraño", "Como un juez", "Como un enemigo"], "Es como un hermano en tiempo de angustia.", "Proverbios 17:17"],
      ["m2-04", 4, "o3", "comprender", "¿Qué significa que el hierro con hierro se aguza?", "Que los amigos se ayudan a mejorar", ["Que los amigos se pelean", "Que hay que ser duro", "Que el trabajo es importante"], "Hierro con hierro se aguza; y así el hombre aguza el rostro de su amigo.", "Proverbios 27:17"],
      ["m2-05", 4, "o3", "recordar", "Según Eclesiastés 4:10, ¿qué pasa si uno cae y está acompañado?", "Su compañero lo levanta", ["Se quedan los dos en el suelo", "Nadie lo ayuda", "Se ríen de él"], "Si cayeren, el uno levantará a su compañero.", "Eclesiastés 4:10"],
      ["m2-06", 4, "o3", "aplicar", "¿Cómo ser buena influencia con amigos que no conocen a Cristo?", "Siendo luz y amándolos, sin perder las propias convicciones", ["Haciendo todo lo que ellos hacen", "Evitándolos por completo", "Juzgándolos en público"], "Las malas conversaciones corrompen las buenas costumbres: se ama sin perder el rumbo.", "1 Corintios 15:33"],
      ["m2-07", 5, "o3", "recordar", "¿Cómo pide 1 Tesalonicenses 4:4-5 que vivamos?", "En santidad y honor, no en pasión de concupiscencia", ["Como los gentiles que no conocen a Dios", "Según lo que sintamos", "Sin ninguna regla"], "Que cada uno de vosotros sepa tener su propia esposa en santidad y honor; no en pasión de concupiscencia.", "1 Tesalonicenses 4:4-5"],
      ["m2-08", 5, "o3", "comprender", "¿Qué distingue al pecado sexual, según 1 Corintios 6:18?", "Que se peca contra el propio cuerpo", ["Que no es pecado", "Que solo afecta a otros", "Que no tiene consecuencias"], "Mas el que fornica, contra su propio cuerpo peca.", "1 Corintios 6:18"],
      ["m2-09", 5, "o3", "recordar", "¿A quiénes juzgará Dios, según Hebreos 13:4?", "A los fornicarios y a los adúlteros", ["A los casados", "A los solteros", "A nadie"], "Pero a los fornicarios y a los adúlteros los juzgará Dios.", "Hebreos 13:4"],
      ["m2-10", 5, "o3", "comprender", "¿Por qué ayuda tener a alguien a quien rendir cuentas?", "Porque nos anima, nos corrige y nos ayuda a no caer", ["Porque así nos vigilan para castigarnos", "No ayuda: es mejor estar solo", "Porque es una regla de la iglesia"], "Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados.", "Santiago 5:16"],
      ["m2-11", 5, "o3", "aplicar", "¿Qué hacer con lo que te lleva a caer, como ciertas aplicaciones o lugares?", "Cortar con ello con firmeza", ["Usarlo con más cuidado", "Esconderlo mejor", "No pensar en eso"], "Huid de la fornicación.", "1 Corintios 6:18"],
      ["m2-12", 5, "o3", "comprender", "¿Qué significa que la pureza es decir sí a algo mejor?", "Que guardarse honra a Dios y prepara para un amor fiel", ["Que la pureza es solo prohibir", "Que la pureza no importa", "Que es una costumbre antigua"], "Honroso sea en todos el matrimonio, y el lecho sin mancilla.", "Hebreos 13:4"],
      ["m2-13", 6, "o4", "recordar", "¿Qué pide quitar Efesios 4:31?", "Toda amargura, enojo, ira, gritería y maledicencia", ["Toda alegría", "Toda conversación", "Todo trabajo"], "Quítense de vosotros toda amargura, enojo, ira, gritería y maledicencia, y toda malicia.", "Efesios 4:31"],
      ["m2-14", 6, "o4", "recordar", "Según Efesios 4:32, ¿cómo debemos perdonarnos?", "Como Dios nos perdonó en Cristo", ["Solo una vez", "Cuando lo merezcan", "Con condiciones"], "Perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.", "Efesios 4:32"],
      ["m2-15", 6, "o4", "comprender", "¿Qué menciona Jesús como excepción en Mateo 19:9?", "La fornicación", ["Las peleas", "La falta de dinero", "El cansancio"], "Cualquiera que repudia a su mujer, salvo por causa de fornicación, y se casa con otra, adultera.", "Mateo 19:9"],
      ["m2-16", 6, "o4", "comprender", "¿De qué caso habla Pablo en 1 Corintios 7:15?", "Del creyente abandonado por un cónyuge que no cree", ["Del que se aburre del matrimonio", "Del que quiere casarse otra vez sin motivo", "De los que nunca se casaron"], "Si el incrédulo se separa, sepárese; pues no está el hermano o la hermana sujeto a servidumbre en semejante caso.", "1 Corintios 7:15"],
      ["m2-17", 6, "o4", "aplicar", "¿Qué hacer cuando un conflicto familiar no se resuelve solo?", "Buscar ayuda: el pastor o un consejero cristiano", ["Callarlo para siempre", "Romper la relación sin hablar", "Publicarlo en las redes"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
      ["m2-18", 6, "o4", "aplicar", "¿Cuál es un buen primer paso para reconciliarse con un familiar?", "Pedir perdón sin excusas", ["Esperar siempre a que el otro dé el primer paso", "Recordarle todos sus errores", "Fingir que no pasó nada"], "Confesaos vuestras ofensas unos a otros.", "Santiago 5:16"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-familia-e1",
      tipo: "corta",
      pregunta: "Describe el diseño de Dios para el matrimonio según Génesis 2 y lo que enseñó Jesús en Mateo 19.",
      ideas: [
        { id: "hombremujer", peso: 25, texto: "Que es entre un hombre y una mujer.", formas: ["hombre y una mujer", "hombre y mujer", "varon y hembra"] },
        { id: "dejar", peso: 20, texto: "Que el hombre deja a su padre y a su madre y se une a su mujer.", formas: ["deja", "dejan", "dejar*", "une", "unen", "unir*"] },
        { id: "unacarne", peso: 25, texto: "Que son una sola carne, en un pacto para toda la vida.", formas: ["sola carne", "toda la vida", "pacto"] },
        { id: "jesus", peso: 20, texto: "Que lo que Dios juntó no lo separe el hombre.", formas: ["no lo separe", "separe el hombre", "dios junto"], negativa: true },
      ],
      citas: ["Génesis 2:24", "Génesis 2:18", "Mateo 19:4-6", "Mateo 19:6", "Génesis 1:27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El matrimonio es entre un hombre y una mujer: el hombre deja a su padre y a su madre, se une a su mujer y son una sola carne (Génesis 2:24), un pacto para toda la vida. Jesús confirmó ese diseño de la creación: lo que Dios juntó, no lo separe el hombre (Mateo 19:6).",
    },
    {
      id: "n2-familia-e2",
      tipo: "corta",
      pregunta: "Explica qué enseña Efesios 5 sobre el amor y el respeto en el matrimonio, y por qué la autoridad nunca justifica la violencia.",
      ideas: [
        { id: "mutua", peso: 15, texto: "Que todos se someten unos a otros en el temor de Dios.", formas: ["unos a otros", "mutu*", "someteos"] },
        { id: "amor", peso: 30, texto: "Que el esposo ama a su esposa como Cristo amó a la iglesia y se entregó por ella.", formas: ["como cristo amo", "se entrego", "entregarse", "sacrifici*"] },
        { id: "respeto", peso: 20, texto: "Que la esposa respeta a su marido.", formas: ["respet*"] },
        { id: "violencia", peso: 25, texto: "Que la autoridad es para servir, y ante la violencia se busca protección y ayuda.", formas: ["servir", "proteccion", "ayuda", "no justifica", "nunca justifica", "no da permiso", "autoridades"], negativa: true },
      ],
      citas: ["Efesios 5:21-33", "Efesios 5:25", "Efesios 5:33", "Efesios 5:21", "1 Pedro 3:7", "Colosenses 3:19"],
      pesoCita: 10,
      errores: [
        { id: "golpe", anula: "violencia", texto: "La autoridad del esposo es para servir, como Cristo; nunca justifica el control ni la violencia (Efesios 5:25).", formas: ["puede pegarle", "puede golpearla", "derecho a pegar", "corregirla con golpes", "para corregirla", "con golpes", "a golpes"] },
      ],
      modelo:
        "Efesios 5 empieza con someterse unos a otros en el temor de Dios. El esposo ama a su esposa así como Cristo amó a la iglesia y se entregó por ella (Efesios 5:25), y la esposa respeta a su marido. La autoridad es para servir y cuidar: nunca justifica la violencia, y quien la sufre busca protección y ayuda.",
    },
    {
      id: "n2-familia-e3",
      tipo: "corta",
      pregunta: "¿Qué enseña la Biblia sobre la soltería, la amistad y la pureza?",
      ideas: [
        { id: "solteria", peso: 30, texto: "Que la soltería es un regalo para servir al Señor, no una vida incompleta.", formas: ["soltero*", "solteria", "cosas del senor"] },
        { id: "amistad", peso: 25, texto: "Que el amigo ama en todo tiempo y nos afila.", formas: ["amigo*", "amistad", "afila", "aguza", "todo tiempo"] },
        { id: "pureza", peso: 35, texto: "Que Dios llama a huir de la fornicación, porque el cuerpo es templo del Espíritu y la sexualidad es para el matrimonio.", formas: ["pureza", "huir", "huid", "fornicacion", "templo", "santidad"] },
      ],
      citas: ["1 Corintios 7:32-35", "1 Corintios 7:32", "1 Corintios 7:7", "Proverbios 17:17", "Proverbios 27:17", "1 Tesalonicenses 4:3", "1 Corintios 6:18-20", "Hebreos 13:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La soltería no es una vida incompleta: el soltero tiene cuidado de las cosas del Señor (1 Corintios 7:32). El buen amigo ama en todo tiempo y nos afila, como el hierro al hierro. Dios nos llama a la pureza: huir de la fornicación, porque el cuerpo es templo del Espíritu Santo y la sexualidad es para el matrimonio.",
    },
    {
      id: "n2-familia-e4",
      tipo: "corta",
      pregunta: "¿Cómo se deben enfrentar los conflictos en la familia, y qué hacer cuando hay violencia o un dolor que no se puede manejar?",
      ideas: [
        { id: "perdon", peso: 30, texto: "Perdonar como Cristo nos perdonó.", formas: ["perdon*", "como cristo"] },
        { id: "hablar", peso: 20, texto: "Hablar con respeto, escuchar y no dejar que el enojo dure.", formas: ["hablar", "escuch*", "enojo", "respeto"] },
        { id: "ayuda", peso: 30, texto: "Buscar ayuda y protección: el pastor, un consejero o las autoridades.", formas: ["ayuda", "pastor", "consejer*", "proteccion", "proteger", "autoridades"] },
        { id: "amor", peso: 10, texto: "El amor, que es el vínculo perfecto.", formas: ["amor", "vinculo", "misericordia", "paciencia"] },
      ],
      citas: ["Colosenses 3:12-14", "Colosenses 3:13", "Efesios 4:26", "Efesios 4:31-32", "Mateo 18:21-22", "Gálatas 6:2", "Santiago 1:19"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los conflictos se enfrentan con misericordia y perdón: de la manera que Cristo nos perdonó, así perdonamos (Colosenses 3:13). Hay que hablar con respeto, escuchar y no dejar que el enojo dure. Cuando hay violencia o un dolor que no se puede manejar, se busca ayuda y protección: el pastor, un consejero y, si hay peligro, las autoridades.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-familia-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo quieres edificar tu hogar y tus relaciones sobre el fundamento de Dios, seas casado, soltero, padre o hijo: qué principios de esta materia vas a practicar y qué paso concreto darás. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "dios", peso: 15, texto: "Dios como fundamento y centro del hogar.", formas: ["edific*", "centro", "fundamento", "jehova"] },
      { id: "matrimonio", peso: 15, texto: "El matrimonio como pacto, o la preparación para él.", formas: ["matrimonio", "pacto", "sola carne", "esposa", "esposo", "conyuge"] },
      { id: "amor", peso: 15, texto: "El amor que sirve y el respeto.", formas: ["amor", "amar", "respet*", "servir"] },
      { id: "hijos", peso: 10, texto: "La relación entre padres e hijos.", formas: ["hijos", "padres", "crianza", "enseñar", "ensenar"] },
      { id: "solteria", peso: 10, texto: "La soltería o la amistad.", formas: ["soltero*", "solteria", "amigo*", "amistad"] },
      { id: "pureza", peso: 10, texto: "La pureza y la fidelidad.", formas: ["pureza", "puro", "santidad", "fidelidad", "fiel"] },
      { id: "perdon", peso: 15, texto: "El perdón y la reconciliación.", formas: ["perdon*", "reconcili*", "paciencia"] },
      { id: "paso", peso: 10, texto: "Un paso concreto.", formas: ["paso", "voy a", "empezare", "esta semana", "cada noche", "cada dia"] },
    ],
    basta: 85,
    citas: ["Salmos 127:1", "Génesis 2:24", "Mateo 19:6", "Efesios 5:25", "Efesios 5:33", "Efesios 6:1-4", "Deuteronomio 6:6-7", "1 Corintios 7:32", "Colosenses 3:13", "Hebreos 13:4"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Quiero que Dios sea el centro de mi hogar, porque si Jehová no edificare la casa, en vano trabajan los que la edifican (Salmos 127:1). Estoy casado, y quiero vivir el matrimonio como un pacto para toda la vida: amar a mi esposa como Cristo amó a la iglesia y se entregó por ella (Efesios 5:25), servirla y respetarla, y guardar la fidelidad y la pureza. Con mis hijos, quiero enseñar la Palabra en la vida diaria, en la casa y en el camino (Deuteronomio 6:6-7), criarlos con amor y límites, y nunca provocarlos a ira. También quiero cuidar mis amistades y ser un amigo que ama en todo tiempo. Cuando haya conflictos, voy a pedir perdón pronto y perdonar como Cristo me perdonó (Colosenses 3:13). El paso concreto que voy a dar es empezar esta semana un tiempo de oración en familia cada noche antes de dormir, y si algún día no podemos resolver algo solos, buscaremos la ayuda del pastor.",
  },
};
