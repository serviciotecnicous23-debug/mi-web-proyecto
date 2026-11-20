/**
 * El banco de «Voluntariado y alianzas» (especialidad Obra social y misericordia, materia 5). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 servir junto a otros · o2 las alianzas con otras iglesias · o3 las alianzas con escuelas, negocios y
 * organizaciones · o4 las alianzas con el gobierno · o5 los voluntarios de la comunidad · o6 cuidar la alianza · o7 el
 * versículo de memoria (Eclesiastés 4:12).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `obra-social-5-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_OBRA_SOCIAL_5: BancoMateria = {
  materia: "obra-social-5",
  repaso: {
    "obra-social-5-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué no se rompe pronto, según Eclesiastés 4:12?", "El cordón de tres dobleces", ["El hilo de uno solo", "La caña quebrada", "La cuerda vieja"], "«y cordón de tres dobleces no se rompe pronto».", "Eclesiastés 4:12"],
      ["1-r2", 1, "o1", "comprender", "¿Por qué la unidad de los creyentes es parte del testimonio, según Juan 17:21?", "Porque Jesús oró para que fueran uno, para que el mundo crea", ["Porque así la iglesia es más rica", "Porque la unidad no importa", "Porque lo pide el gobierno"], "«para que el mundo crea que tú me enviaste».", "Juan 17:21"],
      ["1-r3", 1, "o1", "aplicar", "Tu iglesia quiere abrir una despensa, pero ya hay otra a dos calles. ¿Qué haces?", "Hablas con la otra para ponerse de acuerdo, cubrir días distintos o sumarte a la suya", ["Abres la tuya el mismo día", "Criticas a la otra", "No haces nada"], "«Y si alguno prevaleciere contra uno, dos le resistirán».", "Eclesiastés 4:12"],
    ] as P[]).map(p),
    "obra-social-5-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué dijo Jesús del que no es contra nosotros, según Marcos 9:40?", "Que por nosotros es", ["Que es un enemigo", "Que hay que prohibírselo", "Que es un falso maestro"], "«Porque el que no es contra nosotros, por nosotros es».", "Marcos 9:39-40"],
      ["2-r2", 2, "o2", "comprender", "¿Qué muestra que los apóstoles dieran a Pablo y a Bernabé la diestra en señal de compañerismo?", "Que se reconocían como compañeros en la obra, aunque cada uno tuviera su campo", ["Que se peleaban", "Que Pablo mandaba a los apóstoles", "Que no se conocían"], "«nos dieron a mí y a Bernabé la diestra en señal de compañerismo».", "Gálatas 2:9"],
      ["2-r3", 2, "o2", "aplicar", "Tu iglesia y otras dos van a hacer juntas una despensa, pero no se ponen de acuerdo en si se predica durante el reparto. ¿Qué propones?", "Un reparto sin condiciones y un momento aparte, voluntario, de oración y testimonio", ["Que cada iglesia haga la suya sin hablar con las otras", "Predicarles a todos a la fuerza", "Cancelar la despensa"], "«nosotros somos colaboradores de Dios».", "1 Corintios 3:9"],
    ] as P[]).map(p),
    "obra-social-5-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pregunta Amós 3:3?", "Si andarán dos juntos si no están de acuerdo", ["Si dos pueden pelear", "Quién es el más fuerte", "Dónde está el camino"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
      ["3-r2", 3, "o3", "comprender", "¿Por qué los voluntarios de la iglesia no usan los programas de una escuela pública para evangelizar a los alumnos?", "Porque en una alianza se respetan las reglas del socio, y la escuela tiene las suyas", ["Porque la fe no importa", "Porque está prohibido orar", "Porque los alumnos no lo necesitan"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
      ["3-r3", 3, "o3", "aplicar", "Un supermercado ofrece donar alimentos a la despensa y quiere su nombre en los volantes. ¿Qué haces?", "Acuerdas por escrito lo que dona, cómo se recoge y cómo se le agradece, sin anunciar sus productos ni compartir los datos de las familias", ["Pones su propaganda en todo", "Le das los datos de las familias", "Rechazas la ayuda"], "«me lo concedió el rey, según la benéfica mano de mi Dios sobre mí».", "Nehemías 2:8"],
    ] as P[]).map(p),
    "obra-social-5-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué es la autoridad, según Romanos 13:4?", "Servidora de Dios para nuestro bien", ["Enemiga de Dios", "Dueña de la iglesia", "Algo que no importa"], "«porque es servidor de Dios para tu bien».", "Romanos 13:4"],
      ["4-r2", 4, "o4", "comprender", "¿Qué no se puede hacer con la ayuda federal directa, según la regla de 2024?", "Usarla para actividades explícitamente religiosas", ["Usarla para servir a la comunidad", "Competir por ella", "Recibirla siendo una iglesia"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
      ["4-r3", 4, "o4", "aplicar", "Tu iglesia recibirá un fondo federal para dar comidas a los ancianos. ¿Cómo maneja la oración y la prédica?", "Las ofrece por separado, en otro horario o en otro salón, y solo para quien quiera", ["Las hace obligatorias durante la comida", "Las prohíbe para siempre", "Las mezcla con el reparto"], "«dispuestos a toda buena obra».", "Tito 3:1"],
    ] as P[]).map(p),
    "obra-social-5-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué le dijeron los artesanos a Moisés, según Éxodo 36:5?", "Que el pueblo traía mucho más de lo que se necesitaba para la obra", ["Que no había nada", "Que el pueblo no quería dar", "Que faltaba oro"], "«El pueblo trae mucho más de lo que se necesita para la obra».", "Éxodo 36:5"],
      ["5-r2", 5, "o5", "comprender", "¿Qué enseña que los habitantes de Malta trataran a Pablo con humanidad?", "Que Dios pone bondad aun en los que no lo conocen, y la iglesia puede servir junto a ellos", ["Que solo los creyentes son buenos", "Que Pablo no necesitaba ayuda", "Nada"], "«los naturales nos trataron con no poca humanidad».", "Hechos 28:2"],
      ["5-r3", 5, "o5", "aplicar", "Una empresa quiere mandar a veinte empleados un sábado a ayudar en la despensa. ¿Qué preparas?", "Las tareas, un voluntario de la iglesia a cargo de cada grupo, una orientación corta y el cuidado de que nadie sin revisión quede con los niños", ["Nada, que lleguen y vean", "Que cuiden solos a los niños", "Que traigan su propaganda"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3"],
    ] as P[]).map(p),
    "obra-social-5-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pide Romanos 12:18 en cuanto dependa de nosotros?", "Estar en paz con todos los hombres", ["Ganar todas las discusiones", "Evitar a todos", "Tener la razón"], "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", "Romanos 12:18"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseña que Pablo pidiera a Marcos años después de separarse de Bernabé?", "Que las relaciones pueden restaurarse después de un desacuerdo", ["Que Pablo nunca se equivocó", "Que no hay que perdonar", "Que Marcos era apóstol"], "«Toma a Marcos y tráele contigo, porque me es útil para el ministerio».", "2 Timoteo 4:11"],
      ["6-r3", 6, "o6", "aplicar", "Una organización aliada empezó a pedirles a tus alumnos de inglés que firmen para un partido. ¿Qué haces primero?", "Hablas en privado con su encargado, le recuerdas el acuerdo y buscan una solución", ["Rompes la alianza en público", "Dejas que siga", "Lo publicas en las redes"], "«estad en paz con todos los hombres».", "Romanos 12:18"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Juntos por el bien de la ciudad
    ["f01", 1, "o1", "recordar", "¿Qué hacen dos contra el que prevalece contra uno, según Eclesiastés 4:12?", "Le resisten", ["Huyen", "Se rinden", "Lo ignoran"], "«dos le resistirán».", "Eclesiastés 4:12"],
    ["f02", 1, "o1", "recordar", "¿Por qué daba gracias Pablo por los filipenses, según Filipenses 1:5?", "Por su comunión en el evangelio, desde el primer día", ["Por su riqueza", "Por su fama", "Por su templo"], "«por vuestra comunión en el evangelio, desde el primer día hasta ahora».", "Filipenses 1:5"],
    ["f03", 1, "o1", "comprender", "¿Por qué servir con otros permite repetir menos?", "Porque cada socio cubre lo que falta, en vez de que todos den lo mismo el mismo día", ["Porque se hace menos", "No repite menos", "Porque se cobra"], "«dos le resistirán».", "Eclesiastés 4:12"],
    ["f04", 1, "o1", "comprender", "¿Qué cuida la iglesia al aliarse con otros?", "Su identidad: se une para servir sin dejar de ser iglesia ni callar el evangelio", ["Nada", "Esconder su fe", "Mandar a los demás"], "«para que todos sean uno».", "Juan 17:21"],
    ["f05", 1, "o1", "comprender", "¿Por qué hay que escoger con cuidado a un socio?", "Porque un socio que no comparte los valores del proyecto puede dañarlo", ["Porque todos son malos", "No hace falta", "Porque así se recibe más dinero"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
    ["f06", 1, "o1", "analizar", "¿Por qué sumarse a lo que otros ya hacen bien puede ser la mejor manera de servir?", "Porque se aprovecha lo que ya funciona y la iglesia aporta lo que a ellos les falta", ["Porque la iglesia no debe hacer nada", "No es buena idea", "Porque así no se trabaja"], "«cordón de tres dobleces no se rompe pronto».", "Eclesiastés 4:12"],
    ["f07", 1, "o1", "aplicar", "Tu iglesia quiere ayudar a los estudiantes del barrio, pero tiene pocos maestros. ¿Qué haces?", "Buscas socios, como la escuela, la biblioteca y otras iglesias, y acuerdan juntos un proyecto con tareas claras", ["Lo intentas sola aunque no alcance", "Abandonas la idea", "Contratas a cualquiera sin revisar"], "«por vuestra comunión en el evangelio».", "Filipenses 1:5"],
    ["f08", 1, "o1", "aplicar", "Un hermano dice que aliarse con otros es perder la identidad de la iglesia. ¿Qué le respondes?", "Que la iglesia se une para servir sin dejar de ser iglesia, y que la unidad ayuda a que el mundo crea", ["Que tiene razón", "Que hay que esconder la fe", "Que solo se sirve a solas"], "«para que el mundo crea que tú me enviaste».", "Juan 17:21"],
    ["f09", 1, "o1", "evaluar", "¿Qué alianza de una iglesia está mejor planteada?", "Una con socios que comparten los valores, un propósito acordado, tareas claras y un acuerdo por escrito", ["Una con cualquiera que ofrezca dinero", "Una sin acuerdos", "Una donde la iglesia esconde su fe"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
    ["f10", 1, "o7", "recordar", "Completa Eclesiastés 4:12: Y si alguno prevaleciere contra uno, dos le resistirán…", "y cordón de tres dobleces no se rompe pronto", ["y el que está solo vencerá", "y la fuerza es del más rico", "y nadie podrá ayudarlos"], "«Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto».", "Eclesiastés 4:12"],
    // Lección 2 · Alianzas con otras iglesias
    ["f11", 2, "o2", "recordar", "¿Qué les dijo Jesús a los discípulos sobre el que echaba fuera demonios en su nombre, según Marcos 9:39?", "No se lo prohibáis", ["Prohibídselo", "Traédmelo", "Castigadlo"], "«No se lo prohibáis».", "Marcos 9:39-40"],
    ["f12", 2, "o2", "recordar", "¿Qué somos, según 1 Corintios 3:9?", "Colaboradores de Dios", ["Dueños de Dios", "Competidores", "Jueces de los demás"], "«Porque nosotros somos colaboradores de Dios».", "1 Corintios 3:9"],
    ["f13", 2, "o2", "recordar", "¿Quiénes dieron a Pablo y a Bernabé la diestra en señal de compañerismo, según Gálatas 2:9?", "Jacobo, Cefas y Juan", ["Pedro, Andrés y Felipe", "Lucas y Marcos", "Timoteo y Tito"], "«Jacobo, Cefas y Juan, que eran considerados como columnas».", "Gálatas 2:9"],
    ["f14", 2, "o2", "comprender", "¿Qué significa que en una alianza cada iglesia sigue con su propia enseñanza?", "Que se sirve junto en lo que une, sin pedirle a nadie que cambie su doctrina", ["Que todas deben pensar igual", "Que la doctrina no importa", "Que una manda a las otras"], "«el que no es contra nosotros, por nosotros es».", "Marcos 9:39-40"],
    ["f15", 2, "o2", "comprender", "¿Por qué el proyecto común no lleva el nombre de una sola iglesia?", "Para compartir el mérito y dar la gloria a Dios", ["Porque nadie quiere el nombre", "Porque es ilegal", "Para esconderse"], "«nosotros somos colaboradores de Dios».", "1 Corintios 3:9"],
    ["f16", 2, "o2", "analizar", "¿Por qué la competencia entre iglesias daña su testimonio?", "Porque trata a los miembros como clientes y muestra división en vez de unidad", ["Porque las hace crecer", "No lo daña", "Porque las iglesias deben cerrar"], "«para que todos sean uno».", "Juan 17:21"],
    ["f17", 2, "o2", "aplicar", "Un pastor del barrio te invita a un proyecto común, pero su iglesia piensa distinto en algunas doctrinas. ¿Qué haces?", "Aceptas servir juntos en lo que los une, respetando las diferencias, con un acuerdo claro", ["Lo rechazas sin hablar", "Le exiges que cambie su doctrina", "Discutes la doctrina en el proyecto"], "«el que no es contra nosotros, por nosotros es».", "Marcos 9:39-40"],
    ["f18", 2, "o2", "aplicar", "En una alianza, otra iglesia critica en público a la tuya. ¿Qué haces?", "Hablas en privado con su pastor, con amor, y buscan la paz", ["La criticas más fuerte", "Rompes sin hablar", "Lo publicas en las redes"], "«estad en paz con todos los hombres».", "Romanos 12:18"],
    ["f19", 2, "o2", "aplicar", "Tienes que organizar con dos iglesias una despensa para las fiestas. ¿Cómo repartes las tareas?", "Una pone el lugar, otra los voluntarios y otra los alimentos con el banco de alimentos, con un coordinador de cada una", ["Que una lo haga todo", "Sin tareas, que cada uno vea", "Que mande el que llegue primero"], "«nosotros somos colaboradores de Dios».", "1 Corintios 3:9"],
    ["f20", 2, "o2", "evaluar", "¿Qué alianza entre iglesias se parece más a la de los apóstoles en Gálatas 2:9?", "Una que se reconoce como compañera, acuerda el propósito y respeta el campo de cada una", ["Una donde una iglesia manda", "Una que compite por los miembros", "Una sin acuerdos"], "«la diestra en señal de compañerismo».", "Gálatas 2:9"],
    // Lección 3 · Alianzas con escuelas, negocios y organizaciones
    ["f21", 3, "o3", "recordar", "¿Qué pidió Nehemías al guarda del bosque del rey, según Nehemías 2:8?", "Madera para las puertas, el muro y su casa", ["Soldados", "Oro", "Comida"], "«para que me dé madera».", "Nehemías 2:8"],
    ["f22", 3, "o3", "recordar", "¿Con qué debían ayudar los hombres del lugar, según Esdras 1:4?", "Con plata, oro, bienes y ganados", ["Con armas", "Con nada", "Con piedras"], "«con plata, oro, bienes y ganados».", "Esdras 1:4"],
    ["f23", 3, "o3", "recordar", "¿Según qué le concedió el rey a Nehemías lo que pidió, según Nehemías 2:8?", "Según la benéfica mano de Dios sobre él", ["Según su riqueza", "Según la suerte", "Según sus amigos"], "«según la benéfica mano de mi Dios sobre mí».", "Nehemías 2:8"],
    ["f24", 3, "o3", "comprender", "¿Qué cuida la iglesia al aliarse con un negocio?", "Que la alianza no sea solo propaganda y que la iglesia no anuncie sus productos", ["Que el negocio mande en la iglesia", "Nada", "Que la iglesia venda sus productos"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
    ["f25", 3, "o3", "comprender", "¿Qué dice un buen acuerdo de colaboración?", "Quién hace qué, quién paga qué, cómo se usan los nombres y cómo se termina", ["Solo el nombre de los socios", "Nada por escrito", "Solo la fecha"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
    ["f26", 3, "o3", "analizar", "¿Por qué un acuerdo de palabra suele fallar cuando cambia el encargado?", "Porque cada uno recuerda algo distinto y lo prometido se pierde sin un papel", ["Porque los acuerdos no sirven", "No falla", "Porque el nuevo encargado es malo"], "«si no estuvieren de acuerdo».", "Amós 3:3"],
    ["f27", 3, "o3", "aplicar", "Una escuela pública invita a la iglesia a dar tutorías. ¿Qué cuidas?", "Seguir las reglas de la escuela, pasar sus revisiones y no usar el programa para evangelizar a los alumnos", ["Repartir folletos en las clases", "Ir sin revisión", "Cambiar las reglas de la escuela"], "«me lo concedió el rey».", "Nehemías 2:8"],
    ["f28", 3, "o3", "aplicar", "Una organización quiere aliarse con la despensa y pide los datos de las familias. ¿Qué haces?", "No los compartes sin el permiso de cada familia, y lo dejas claro en el acuerdo", ["Se los das todos", "Los vendes", "Los publicas"], "«ayúdenle los hombres de su lugar».", "Esdras 1:4"],
    ["f29", 3, "o3", "aplicar", "Tienes que escribir un acuerdo con un negocio que donará alimentos. ¿Qué incluyes?", "Qué dona, cada cuánto, cómo se recoge, cómo se le agradece, la privacidad de las familias y cómo se termina", ["Solo su nombre", "Que la iglesia venda sus productos", "Nada por escrito"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
    ["f30", 3, "o3", "evaluar", "¿Qué alianza con un negocio está mejor hecha?", "Una con un acuerdo escrito, un agradecimiento sencillo, sin propaganda de sus productos y sin compartir datos", ["Una donde el negocio pone su publicidad en todo", "Una sin acuerdo", "Una donde se comparten los datos"], "«según la benéfica mano de mi Dios sobre mí».", "Nehemías 2:8"],
    // Lección 4 · Alianzas con el gobierno
    ["f31", 4, "o4", "recordar", "¿Qué propuso Daniel en su corazón, según Daniel 1:8?", "No contaminarse con la comida del rey", ["Dejar de servir al rey", "Huir de Babilonia", "Comer de todo"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
    ["f32", 4, "o4", "recordar", "¿Para qué pide Tito 3:1 que estemos dispuestos?", "Para toda buena obra", ["Para la guerra", "Para el descanso", "Para nada"], "«que estén dispuestos a toda buena obra».", "Tito 3:1"],
    ["f33", 4, "o4", "recordar", "¿A quién le pidió Daniel que no lo obligara a contaminarse, según Daniel 1:8?", "Al jefe de los eunucos", ["Al rey", "A los sacerdotes", "A sus amigos"], "«pidió, por tanto, al jefe de los eunucos que no se le obligase a contaminarse».", "Daniel 1:8"],
    ["f34", 4, "o4", "comprender", "¿Qué dice la regla federal de 2024 sobre el carácter religioso de una organización de fe?", "Que lo conserva y compite en igualdad por los fondos", ["Que debe perderlo", "Que no puede recibir fondos", "Que debe cambiar de nombre"], "«porque es servidor de Dios para tu bien».", "Romanos 13:4"],
    ["f35", 4, "o4", "comprender", "¿Qué dice la orden ejecutiva 13279 sobre las actividades explícitamente religiosas?", "Que se ofrecen por separado, en tiempo o en lugar, del programa con ayuda federal directa", ["Que siempre se prohíben", "Que se mezclan con el programa", "Que son obligatorias"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
    ["f36", 4, "o4", "analizar", "¿Por qué la iglesia lleva las cuentas de un fondo del gobierno separadas de las ofrendas?", "Para rendir cuentas con claridad y mostrar que el fondo se usó solo en el programa", ["Para esconder dinero", "No hace falta", "Porque las ofrendas no importan"], "«que se sujeten a los gobernantes y autoridades».", "Tito 3:1"],
    ["f37", 4, "o4", "aplicar", "Un programa del gobierno le pide a la iglesia esconder que es una iglesia para recibir un fondo. ¿Qué haces?", "Explicas con respeto que la regla permite conservar el carácter religioso y, si no se respeta, no aceptas el fondo", ["Escondes que eres iglesia", "Mientes en los papeles", "Aceptas cualquier condición"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
    ["f38", 4, "o4", "aplicar", "Tu iglesia recibe un fondo federal para una despensa. ¿Qué haces con la invitación al culto?", "La ofreces por separado, sin condicionar la comida, y con participación voluntaria", ["Exiges ir al culto para recibir comida", "Usas el fondo para el culto", "Escondes la invitación"], "«que estén dispuestos a toda buena obra».", "Tito 3:1"],
    ["f39", 4, "o4", "aplicar", "Tienes que decidir si la iglesia acepta un fondo del gobierno. ¿Qué haces primero?", "Leer las reglas del programa y la regla de 2024, y consultar a un abogado o a un contador si hay dudas", ["Aceptarlo sin leer", "Rechazarlo sin leer", "Firmar lo que te den"], "«porque es servidor de Dios para tu bien».", "Romanos 13:4"],
    ["f40", 4, "o4", "evaluar", "¿Qué manera de colaborar con el gobierno se parece más a la de Daniel?", "Servir con excelencia, cumplir las reglas del programa, ofrecer la fe por separado y en libertad, y no aceptar lo que obligue a pecar", ["Esconder la fe para recibir fondos", "Usar los fondos para el culto", "Negarse a toda colaboración"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
    // Lección 5 · Los voluntarios de la comunidad
    ["f41", 5, "o5", "recordar", "¿Cómo trataron los naturales de Malta a Pablo y a los suyos, según Hechos 28:2?", "Con no poca humanidad", ["Con desprecio", "Con violencia", "Con miedo"], "«nos trataron con no poca humanidad».", "Hechos 28:2"],
    ["f42", 5, "o5", "recordar", "¿Cómo llama Pablo a Priscila y a Aquila, según Romanos 16:3?", "Mis colaboradores en Cristo Jesús", ["Mis siervos", "Mis enemigos", "Mis jueces"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3"],
    ["f43", 5, "o5", "recordar", "¿Qué encendieron los habitantes de Malta, según Hechos 28:2?", "Un fuego", ["Una lámpara del templo", "Una antorcha de guerra", "Nada"], "«porque encendiendo un fuego, nos recibieron a todos».", "Hechos 28:2"],
    ["f44", 5, "o5", "comprender", "¿Qué incluye la orientación corta de un voluntario de la comunidad?", "El propósito del proyecto, las reglas, la seguridad y a quién preguntar", ["Un sermón obligatorio", "Nada", "Solo el horario"], "«El pueblo trae mucho más de lo que se necesita».", "Éxodo 36:5"],
    ["f45", 5, "o5", "comprender", "¿Qué se pide a los voluntarios que sirven con niños?", "La revisión de antecedentes, la capacitación y conocer el deber de reportar", ["Nada", "Solo su nombre", "Que sean de la iglesia"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3"],
    ["f46", 5, "o5", "analizar", "¿Por qué un voluntario al que nadie recibe no vuelve?", "Porque se siente perdido o usado, y no ve que su trabajo cambie algo", ["Porque no le gusta servir", "Sí vuelve", "Porque se le pagó poco"], "«nos recibieron a todos».", "Hechos 28:2"],
    ["f47", 5, "o5", "aplicar", "Un estudiante del barrio necesita horas de servicio para su escuela. ¿Qué haces?", "Lo invitas a servir en una tarea clara, junto a un voluntario de la iglesia, y le das su constancia de horas", ["Le dices que la iglesia no recibe a extraños", "Lo pones a cuidar niños solo", "Le firmas horas que no hizo"], "«El pueblo trae mucho más de lo que se necesita para la obra».", "Éxodo 36:5"],
    ["f48", 5, "o5", "aplicar", "Una voluntaria de la comunidad no es creyente y pregunta si debe orar con las familias. ¿Qué le dices?", "Que la invitan a servir y no a fingir: puede ayudar en su tarea, y otros orarán con quien lo quiera", ["Que debe orar aunque no crea", "Que se vaya", "Que no hable con nadie"], "«los naturales nos trataron con no poca humanidad».", "Hechos 28:2"],
    ["f49", 5, "o5", "aplicar", "Tienes que agradecer a una empresa que mandó voluntarios. ¿Qué haces?", "Le envías una carta de gracias con lo que se logró, sin datos de las familias, y la invitas otra vez", ["Nada", "Le mandas las fotos de las familias", "Le pides más dinero sin agradecer"], "«Saludad a Priscila y a Aquila, mis colaboradores».", "Romanos 16:3"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de recibir a los voluntarios de la comunidad es la mejor?", "Invitarlos con claridad, orientarlos, darles una tarea junto a alguien de la iglesia, cuidar a los niños, respetar su fe y agradecerles", ["Dejarlos llegar sin orientación", "Ponerlos con los niños sin revisión", "Presionarlos para que crean"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3"],
    // Lección 6 · Cuidar la alianza
    ["f51", 6, "o6", "recordar", "¿Con quién navegó Bernabé a Chipre, según Hechos 15:39?", "Con Marcos", ["Con Pablo", "Con Silas", "Con Timoteo"], "«Bernabé, tomando a Marcos, navegó a Chipre».", "Hechos 15:39-40"],
    ["f52", 6, "o6", "recordar", "¿A quién escogió Pablo después de separarse de Bernabé, según Hechos 15:40?", "A Silas", ["A Marcos", "A Pedro", "A Lucas"], "«y Pablo, escogiendo a Silas».", "Hechos 15:39-40"],
    ["f53", 6, "o6", "recordar", "¿Quién estaba con Pablo cuando escribió 2 Timoteo 4:11?", "Solo Lucas", ["Bernabé", "Pedro", "Nadie"], "«Sólo Lucas está conmigo».", "2 Timoteo 4:11"],
    ["f54", 6, "o6", "comprender", "¿Por qué los conflictos de una alianza se hablan primero en privado?", "Porque así se busca ganar al hermano y la paz, como enseña Mateo 18:15", ["Para esconderlos", "No hace falta hablar", "Para que nadie sepa nada nunca"], "«si te oyere, has ganado a tu hermano».", "Mateo 18:15"],
    ["f55", 6, "o6", "comprender", "¿Qué se evalúa en una alianza?", "Si se cumple el propósito, si cada uno hace su parte y si se cuidan los valores", ["Solo cuánto dinero dio cada uno", "Nada", "Quién tiene la razón"], "«Si es posible, en cuanto dependa de vosotros».", "Romanos 12:18"],
    ["f56", 6, "o6", "analizar", "¿Qué enseña la separación de Pablo y Bernabé sobre las alianzas?", "Que aun los buenos socios pueden tener desacuerdos, que la obra puede seguir y que la relación se puede restaurar", ["Que nunca hay que aliarse", "Que el desacuerdo siempre es pecado", "Que Bernabé dejó la fe"], "«Y hubo tal desacuerdo entre ellos, que se separaron el uno del otro».", "Hechos 15:39-40"],
    ["f57", 6, "o6", "aplicar", "Tu iglesia tiene una alianza que nadie revisa desde hace dos años. ¿Qué propones?", "Reunirse con el socio, evaluar juntos y decidir si se renueva, se cambia o se termina", ["Seguir igual sin revisar", "Romperla sin avisar", "Quejarse en público"], "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", "Romanos 12:18"],
    ["f58", 6, "o6", "aplicar", "Un socio no cumple lo que prometió en el acuerdo. ¿Qué haces primero?", "Hablas en privado con su encargado, le recuerdas el acuerdo y buscan juntos una solución", ["Lo acusas en público", "Haces tú todo sin decir nada", "Rompes la alianza enseguida"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15"],
    ["f59", 6, "o6", "aplicar", "Tienes que terminar una alianza que ya no sirve al propósito. ¿Cómo lo haces?", "En paz y por escrito, cumpliendo lo prometido, agradeciendo lo vivido y sin dejar sin servicio a las personas", ["Sin avisar", "Con enojo y en público", "Dejando a las familias sin ayuda"], "«estad en paz con todos los hombres».", "Romanos 12:18"],
    ["f60", 6, "o6", "evaluar", "¿Qué manera de cuidar una alianza es la mejor?", "Un contacto de cada socio, comunicación a tiempo, conflictos hablados en privado, evaluaciones y cuentas claras", ["No revisarla nunca", "Hablar mal del socio", "Romper al primer problema"], "«porque me es útil para el ministerio».", "2 Timoteo 4:11"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Para qué oró Jesús que todos fueran uno, según Juan 17:21?", "Para que el mundo crea que el Padre lo envió", ["Para que la iglesia sea rica", "Para que nadie trabaje", "Para que su pueblo gobierne"], "«para que el mundo crea que tú me enviaste».", "Juan 17:21"],
      ["m1-02", 1, "o1", "comprender", "¿Qué aportan las organizaciones sin fines de lucro a una alianza?", "Experiencia, recursos y capacitación", ["Solo problemas", "Nada", "Solo votos"], "«cordón de tres dobleces no se rompe pronto».", "Eclesiastés 4:12"],
      ["m1-03", 1, "o1", "aplicar", "Tienes que escoger un socio para una tutoría. ¿Qué buscas?", "Uno que comparta los valores del proyecto y aporte lo que a la iglesia le falta", ["El que dé más dinero, sin importar sus valores", "Ninguno", "El primero que pase"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué la iglesia aliada dura más que la aislada?", "Porque reparte la carga y suma los recursos de varios", ["Porque gasta más", "No dura más", "Porque trabaja menos"], "«dos le resistirán».", "Eclesiastés 4:12"],
      ["m1-05", 1, "o1", "recordar", "¿Desde cuándo tenían los filipenses comunión en el evangelio, según Filipenses 1:5?", "Desde el primer día hasta ahora", ["Desde hacía un año", "Desde nunca", "Desde la muerte de Pablo"], "«desde el primer día hasta ahora».", "Filipenses 1:5"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué primer paso hacia una alianza es el mejor?", "Preguntar quién ya hace algo bueno en el barrio y conversar para sumar esfuerzos", ["Empezar a solas algo que ya existe", "Esperar a que otros vengan", "Pedirles dinero a todos"], "«por vuestra comunión en el evangelio».", "Filipenses 1:5"],
      ["m1-07", 2, "o2", "recordar", "¿Qué no puede hacer luego el que hace milagros en el nombre de Jesús, según Marcos 9:39?", "Decir mal de él", ["Orar", "Servir", "Predicar"], "«que luego pueda decir mal de mí».", "Marcos 9:39-40"],
      ["m1-08", 2, "o2", "comprender", "¿Qué es empezar una alianza entre iglesias por lo que las une?", "Partir de la necesidad del barrio y del amor de Cristo, no de las diferencias", ["Discutir primero la doctrina", "Escoger quién manda", "Contar los miembros"], "«el que no es contra nosotros, por nosotros es».", "Marcos 9:39-40"],
      ["m1-09", 2, "o2", "aplicar", "Un hermano de tu iglesia no quiere servir con otra iglesia porque canta distinto. ¿Qué le dices?", "Que las diferencias de estilo no impiden servir juntos en lo que nos une", ["Que tiene razón", "Que la otra iglesia debe cambiar", "Que no sirva más"], "«No se lo prohibáis».", "Marcos 9:39-40"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué las iglesias que colaboran dan la gloria a Dios y no a sí mismas?", "Porque todas son colaboradoras de Dios y la obra es de él", ["Porque nadie las ve", "No le dan la gloria", "Porque son pequeñas"], "«Porque nosotros somos colaboradores de Dios».", "1 Corintios 3:9"],
      ["m1-11", 2, "o2", "comprender", "¿Cómo se resuelven los desacuerdos entre iglesias aliadas?", "Hablando directamente y con amor, buscando la paz", ["Con críticas en público", "Rompiendo la alianza enseguida", "Ignorándolos"], "«nos dieron a mí y a Bernabé la diestra en señal de compañerismo».", "Gálatas 2:9"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué proyecto entre iglesias está mejor planteado?", "Uno con un propósito común, tareas repartidas, un coordinador de cada iglesia y el nombre del barrio", ["Uno con el nombre de una sola iglesia", "Uno sin acuerdo", "Uno donde se discute la doctrina"], "«nosotros somos colaboradores de Dios».", "1 Corintios 3:9"],
      ["m1-13", 3, "o3", "recordar", "¿Para qué eran las ofrendas voluntarias de Esdras 1:4?", "Para la casa de Dios en Jerusalén", ["Para el palacio de Ciro", "Para Babilonia", "Para los soldados"], "«además de ofrendas voluntarias para la casa de Dios, la cual está en Jerusalén».", "Esdras 1:4"],
      ["m1-14", 3, "o3", "comprender", "¿Por qué no se comparten con un socio los datos de las personas servidas sin su permiso?", "Para proteger su privacidad y su confianza", ["Porque los datos no valen", "Sí se comparten", "Porque el socio no los quiere"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
      ["m1-15", 3, "o3", "aplicar", "Un negocio quiere que la iglesia anuncie sus productos a cambio de donar. ¿Qué haces?", "Le agradeces su ayuda, ofreces un reconocimiento sencillo y explicas que la iglesia no anuncia productos", ["Anuncias sus productos en el culto", "Rechazas toda ayuda", "Le das los datos de los miembros"], "«me lo concedió el rey».", "Nehemías 2:8"],
      ["m1-16", 3, "o3", "analizar", "¿Qué enseña que Dios usara las cartas del rey para que Nehemías reconstruyera?", "Que Dios puede abrir puertas con recursos de afuera del pueblo para su obra", ["Que Nehemías no confiaba en Dios", "Que el rey era creyente", "Nada"], "«según la benéfica mano de mi Dios sobre mí».", "Nehemías 2:8"],
      ["m1-17", 3, "o3", "recordar", "¿Para qué era la madera que pidió Nehemías, según Nehemías 2:8?", "Para las puertas del palacio, el muro de la ciudad y la casa donde él estaría", ["Para un barco", "Para el fuego", "Para venderla"], "«para enmaderar las puertas del palacio de la casa, y para el muro de la ciudad».", "Nehemías 2:8"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué alianza con una escuela está mejor hecha?", "Una donde los voluntarios siguen sus reglas y pasan sus revisiones, y el programa no se usa para evangelizar a los alumnos", ["Una donde se reparten folletos en clase", "Una sin revisión de los voluntarios", "Una sin acuerdo"], "«¿Andarán dos juntos, si no estuvieren de acuerdo?».", "Amós 3:3"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué no lleva en vano la autoridad, según Romanos 13:4?", "La espada", ["La corona", "El libro", "El cetro"], "«porque no en vano lleva la espada».", "Romanos 13:4"],
      ["m2-02", 4, "o4", "comprender", "¿Qué dice la orden ejecutiva 13559, según la regla de 2024?", "Que la participación de las personas en las actividades religiosas es voluntaria", ["Que es obligatoria", "Que está prohibida", "Que se paga"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
      ["m2-03", 4, "o4", "aplicar", "Tienes que darles su aviso por escrito a los participantes de un programa con fondos federales. ¿Qué haces?", "Les entregas el aviso de sus protecciones, como pide la regla, y les explicas que las actividades religiosas son voluntarias", ["No les das nada", "Les das un folleto de la iglesia", "Les pides que firmen que irán al culto"], "«que obedezcan, que estén dispuestos a toda buena obra».", "Tito 3:1"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué la iglesia puede decidir no aceptar un fondo del gobierno?", "Porque si las condiciones no la dejan servir con libertad y fidelidad, es mejor no recibirlo", ["Porque los fondos son pecado", "No puede decidir", "Porque así lo dice la regla"], "«pidió, por tanto, al jefe de los eunucos que no se le obligase a contaminarse».", "Daniel 1:8"],
      ["m2-05", 4, "o4", "aplicar", "Un hermano propone usar el fondo federal de la despensa para comprar Biblias. ¿Qué le respondes?", "Que la ayuda federal directa no se usa para actividades explícitamente religiosas; las Biblias se compran con las ofrendas", ["Que tiene razón", "Que lo esconda en las cuentas", "Que compre más"], "«Daniel propuso en su corazón no contaminarse».", "Daniel 1:8"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué manejo de un fondo federal está mejor hecho?", "Cuentas separadas, el programa abierto a todos, las actividades religiosas aparte y voluntarias, y el aviso por escrito", ["Mezclar el fondo con las ofrendas", "Exigir el culto para recibir la ayuda", "No leer las reglas"], "«porque es servidor de Dios para tu bien».", "Romanos 13:4"],
      ["m2-07", 5, "o5", "recordar", "¿Por qué encendieron un fuego los habitantes de Malta, según Hechos 28:2?", "Por la lluvia que caía y por el frío", ["Para una fiesta", "Para un sacrificio", "Para la guerra"], "«a causa de la lluvia que caía, y del frío».", "Hechos 28:2"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué se da a los estudiantes una constancia de sus horas de servicio?", "Porque muchos la necesitan para su escuela, y es una manera de agradecer y reconocer su servicio", ["Para cobrarles", "Para obligarlos a volver", "No se da"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3"],
      ["m2-09", 5, "o5", "aplicar", "Un vecino que no es de la iglesia quiere ayudar con los niños de la tutoría desde mañana. ¿Qué haces?", "Le agradeces y lo pones en otra tarea mientras pasa la revisión de antecedentes y la capacitación", ["Lo dejas solo con los niños mañana", "Lo rechazas para siempre", "Le pides que se convierta primero"], "«El pueblo trae mucho más de lo que se necesita».", "Éxodo 36:5"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué no se presiona a creer a los voluntarios de la comunidad?", "Porque se les invita a servir, y la fe se ofrece con respeto y en libertad", ["Porque la fe no importa", "Sí se los presiona", "Porque nunca creerán"], "«los naturales nos trataron con no poca humanidad».", "Hechos 28:2"],
      ["m2-11", 5, "o5", "comprender", "¿Qué muestra que el pueblo trajera más de lo necesario para la obra del tabernáculo?", "Que cuando la gente ve una causa buena, da con generosidad", ["Que el pueblo era rico", "Que Moisés exigía mucho", "Que nadie quería dar"], "«El pueblo trae mucho más de lo que se necesita para la obra».", "Éxodo 36:5"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué día de voluntariado con una empresa está mejor organizado?", "Uno con las tareas preparadas, un encargado por grupo, una orientación, el cuidado de los niños y un agradecimiento al final", ["Uno donde todos llegan sin saber qué hacer", "Uno donde cuidan niños sin revisión", "Uno solo para la foto"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3"],
      ["m2-13", 6, "o6", "recordar", "¿Por qué pidió Pablo que le llevaran a Marcos, según 2 Timoteo 4:11?", "Porque le era útil para el ministerio", ["Porque estaba enfermo", "Porque le debía dinero", "Porque era su hijo"], "«porque me es útil para el ministerio».", "2 Timoteo 4:11"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué una alianza se termina por escrito cuando hace falta?", "Para que quede claro lo que se cumple y cómo se cierra, en paz", ["Para acusar al socio", "No hace falta", "Para ir a juicio"], "«estad en paz con todos los hombres».", "Romanos 12:18"],
      ["m2-15", 6, "o6", "aplicar", "Una organización aliada se retira de las clases de inglés de un día para otro. ¿Qué haces?", "Conversas en paz con ella y sigues las clases con otro socio o por cuenta de la iglesia, para no dejar a los alumnos", ["Cancelas las clases", "La acusas en público", "No haces nada"], "«Si es posible, en cuanto dependa de vosotros».", "Romanos 12:18"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué no se habla mal de un socio a sus espaldas?", "Porque se le habla primero a él, en privado, para ganarlo y buscar la paz", ["Porque nadie se entera", "Sí se habla", "Porque el socio no importa"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15"],
      ["m2-17", 6, "o6", "comprender", "¿Cada cuánto conviene evaluar una alianza?", "Cada cierto tiempo, por ejemplo cada seis meses", ["Nunca", "Solo cuando hay un problema grave", "Cada diez años"], "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres».", "Romanos 12:18"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué final de una alianza honra más a Dios?", "Uno en paz y por escrito, cumpliendo lo prometido, agradeciendo y sin dejar sin servicio a las personas", ["Uno con enojo y sin aviso", "Uno con acusaciones en las redes", "Uno que deja a las familias sin ayuda"], "«porque me es útil para el ministerio».", "2 Timoteo 4:11"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "obra-social-5-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, por qué la iglesia sirve junto a otros y qué cuida al hacerlo.",
      ideas: [
        { id: "juntos", peso: 30, texto: "Juntos se llega más lejos, y la unidad es testimonio.", formas: ["tres dobleces", "mas lejos", "unidad", "para que el mundo crea", "repartir la carga", "dos le resistiran"] },
        { id: "socios", peso: 30, texto: "Los socios: otras iglesias, escuelas, negocios, organizaciones y el gobierno.", formas: ["otras iglesias", "escuelas", "negocios", "organizaciones", "gobierno"] },
        { id: "cuidar", peso: 30, negativa: true, texto: "Cuidar la identidad y los valores: escoger bien y no dejar de ser iglesia.", formas: ["identidad", "valores", "escoger bien", "dejar de ser iglesia", "callar el evangelio"] },
      ],
      citas: ["Eclesiastés 4:12", "Eclesiastés 4:9-12", "Juan 17:21", "Filipenses 1:5", "Amós 3:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Juntos se llega más lejos, porque cordón de tres dobleces no se rompe pronto (Eclesiastés 4:12), y la unidad ayuda a que el mundo crea. La iglesia puede aliarse con otras iglesias, escuelas, negocios, organizaciones y el gobierno. Al hacerlo cuida su identidad y los valores del proyecto: escoge bien y sirve sin dejar de ser iglesia.",
    },
    {
      id: "obra-social-5-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo se forma una alianza con otras iglesias aunque piensen distinto en algunas cosas.",
      ideas: [
        { id: "jesus", peso: 30, texto: "Jesús no prohibió al que servía en su nombre; las iglesias son colaboradoras de Dios.", formas: ["no se lo prohibais", "por nosotros es", "colaboradores", "companerismo", "en su nombre"] },
        { id: "une", peso: 30, texto: "Se empieza por lo que une y se acuerdan el propósito y las tareas.", formas: ["lo que nos une", "lo que une", "el proposito", "las tareas", "un acuerdo"] },
        { id: "respeto", peso: 30, negativa: true, texto: "Se respetan las diferencias y se comparte el mérito.", formas: ["respet*", "diferencias", "el merito", "su propia ensenanza", "la gloria es de dios"] },
      ],
      citas: ["Marcos 9:39-40", "Marcos 9:40", "Gálatas 2:9", "1 Corintios 3:9", "Juan 17:21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús dijo que no se prohibiera al que servía en su nombre, porque el que no es contra nosotros, por nosotros es (Marcos 9:40). La alianza empieza por lo que nos une y acuerda el propósito y las tareas. Se respetan las diferencias, cada iglesia sigue con su enseñanza y se comparte el mérito.",
    },
    {
      id: "obra-social-5-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué dice la regla federal de 2024 sobre las iglesias que reciben fondos del gobierno.",
      ideas: [
        { id: "igualdad", peso: 30, texto: "Compiten en igualdad y conservan su carácter religioso.", formas: ["igualdad", "caracter religioso", "compiten", "conservan"] },
        { id: "no_religioso", peso: 30, negativa: true, texto: "No usan la ayuda federal directa para actividades explícitamente religiosas.", formas: ["explicitamente religiosas", "actividades religiosas", "ayuda federal directa", "ayuda directa", "el culto"] },
        { id: "separado", peso: 30, texto: "Esas actividades se ofrecen por separado, en tiempo o en lugar, y son voluntarias.", formas: ["por separado", "en tiempo o en lugar", "en tiempo o lugar", "voluntaria*", "aparte"] },
      ],
      citas: ["Romanos 13:4", "Daniel 1:8", "Tito 3:1", "Mateo 22:21"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Según la regla de 2024, las organizaciones de fe compiten en igualdad por los fondos federales y conservan su carácter religioso. No usan la ayuda federal directa para actividades explícitamente religiosas, que se ofrecen por separado, en tiempo o en lugar, y son voluntarias. Así la iglesia sirve sin contaminarse, como Daniel (Daniel 1:8).",
    },
    {
      id: "obra-social-5-e4",
      tipo: "breve",
      pregunta:
        "La ciudad ofrece a tu iglesia un fondo federal para dar comidas a los ancianos en su salón, y algunos hermanos quieren orar y predicar durante la comida. Explica cómo manejarías la alianza con el gobierno, con citas bíblicas.",
      ideas: [
        { id: "leer", peso: 25, texto: "Leer las reglas del programa y la regla de 2024, y consultar a un abogado.", formas: ["leer las reglas", "las reglas del programa", "regla de 2024", "abogado", "contador"] },
        { id: "separar", peso: 25, texto: "La comida es para todos y sin condiciones; la oración y la prédica, por separado y voluntarias.", formas: ["por separado", "otro horario", "otro salon", "voluntari*", "para quien quiera", "sin condiciones"] },
        { id: "aviso", peso: 25, texto: "Dar el aviso por escrito de sus protecciones.", formas: ["aviso por escrito", "el aviso", "sus protecciones", "protecciones"] },
        { id: "cuentas", peso: 25, texto: "Cuentas separadas, y evaluar si se puede servir con libertad.", formas: ["cuentas separadas", "cuentas claras", "separadas de las ofrendas", "no aceptar", "con libertad"] },
      ],
      basta: 85,
      citas: ["Romanos 13:4", "Daniel 1:8", "Tito 3:1", "Mateo 22:21", "Romanos 13:7", "Mateo 25:35"],
      pesoCita: 10,
      errores: [
        { id: "e4-mezclar", anula: "separar", texto: "Mezclar la prédica con la comida del programa.", formas: ["que prediquen durante la comida", "predicaria durante la comida", "haria obligatorio", "seria obligatorio"] },
      ],
      modelo:
        "Primero leería con calma las reglas del programa y la regla federal de 2024, y consultaría a un abogado si hubiera dudas, porque la autoridad es servidora de Dios para nuestro bien (Romanos 13:4). Explicaría a los hermanos que la comida es para todos, sin condiciones, y que no podemos usar la ayuda federal directa para actividades explícitamente religiosas. Ofreceríamos un momento de oración o un estudio por separado, en otro horario o en otro salón, para quien quiera, porque la participación debe ser voluntaria. Daríamos a los ancianos el aviso por escrito de sus protecciones, como pide la regla, y llevaríamos cuentas separadas de las ofrendas de la iglesia. Y evaluaríamos si la alianza nos deja servir con libertad y fidelidad, como Daniel, que propuso no contaminarse (Daniel 1:8); si no fuera así, podríamos no aceptar el fondo, siempre dispuestos a toda buena obra (Tito 3:1).",
    },
    {
      id: "obra-social-5-e5",
      tipo: "breve",
      pregunta:
        "Una empresa del barrio quiere mandar a veinte empleados un sábado para ayudar en la despensa y en la tutoría de los niños. Explica cómo los recibirías y qué cuidados tendrías, con citas bíblicas.",
      ideas: [
        { id: "acordar", peso: 25, texto: "Acordar con la empresa la fecha, las tareas y el número de personas.", formas: ["acordar*", "la fecha", "las tareas", "el numero de personas"] },
        { id: "orientar", peso: 25, texto: "Una orientación y un encargado de la iglesia en cada grupo.", formas: ["orientacion", "un encargado", "a cargo de cada grupo", "voluntario de la iglesia", "explicar*"] },
        { id: "ninos", peso: 25, negativa: true, texto: "Nadie sin revisión ni capacitación queda a cargo de los niños, y se reporta el abuso.", formas: ["revisad*", "revision de antecedentes", "antecedentes", "capacitad*", "report*", "24 horas"] },
        { id: "agradecer", peso: 25, texto: "Respetar su fe y agradecerles después.", formas: ["agradec*", "carta de gracias", "dar las gracias", "respetar su fe", "sin presionar"] },
      ],
      basta: 85,
      citas: ["Éxodo 36:5", "Hechos 28:2", "Romanos 16:3", "Romanos 16:3-4", "Gálatas 6:10", "Eclesiastés 4:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero le agradecería a la empresa y acordaríamos la fecha, las tareas y el número de personas, porque cuando la gente ve una causa buena da con generosidad, como el pueblo que trajo más de lo necesario (Éxodo 36:5). Prepararía los materiales y pondría a un voluntario de la iglesia a cargo de cada grupo. Al llegar, les daría una orientación de quince minutos sobre el proyecto, la seguridad y el trato digno a las familias. Cuidaría que nadie que no esté revisado y capacitado quede a cargo de los niños, y recordaría que la sospecha de abuso se reporta de inmediato, y en 24 horas los profesionales. Respetaría su fe, sin presionar a nadie, como los habitantes de Malta, que sin conocer a Cristo trataron a Pablo con humanidad (Hechos 28:2). Al final les daríamos las gracias y enviaríamos a la empresa una carta de gracias con lo que se logró, sin datos de las familias, como Pablo agradecía a sus colaboradores (Romanos 16:3).",
    },
  ],
  breve: {
    id: "obra-social-5-b1",
    tipo: "breve",
    pregunta: "Escribe cómo formaría tu iglesia alianzas para servir mejor a su barrio en el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "juntos", peso: 15, texto: "Servir junto a otros llega más lejos y da testimonio de unidad.", formas: ["tres dobleces", "unidad", "mas lejos", "repartir la carga"] },
      { id: "iglesias", peso: 15, texto: "Las alianzas con otras iglesias.", formas: ["otras iglesias", "colaboradores de dios", "lo que nos une", "diferencias"] },
      { id: "socios", peso: 15, texto: "Las alianzas con escuelas, negocios y organizaciones.", formas: ["escuela*", "negocio*", "organizacion*", "banco de alimentos"] },
      { id: "gobierno", peso: 20, negativa: true, texto: "La alianza con el gobierno según la regla de 2024.", formas: ["gobierno", "fondos federales", "por separado", "explicitamente religiosas", "regla de 2024"] },
      { id: "voluntarios", peso: 15, negativa: true, texto: "Los voluntarios de la comunidad.", formas: ["voluntarios de la comunidad", "orientacion", "antecedentes", "agradec*", "empresa*"] },
      { id: "cuidar", peso: 20, texto: "Cuidar la alianza: acuerdos escritos, evaluar y resolver en paz.", formas: ["por escrito", "acuerdo", "evaluar*", "en paz", "en privado", "terminar"] },
    ],
    basta: 85,
    citas: ["Eclesiastés 4:12", "Juan 17:21", "Filipenses 1:5", "Marcos 9:39-40", "Gálatas 2:9", "1 Corintios 3:9", "Amós 3:3", "Nehemías 2:8", "Esdras 1:4", "Romanos 13:4", "Daniel 1:8", "Tito 3:1", "Éxodo 36:5", "Hechos 28:2", "Romanos 16:3", "Romanos 12:18", "Hechos 15:39-40", "2 Timoteo 4:11"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año buscaríamos socios para servir mejor a nuestro barrio, porque cordón de tres dobleces no se rompe pronto (Eclesiastés 4:12) y la unidad ayuda a que el mundo crea (Juan 17:21). Nos uniríamos con otras iglesias en lo que nos une, respetando las diferencias, porque somos colaboradores de Dios (1 Corintios 3:9). Haríamos alianzas con la escuela, con negocios del barrio y con el banco de alimentos, poniéndonos de acuerdo antes de caminar juntos (Amós 3:3) y cuidando las reglas de cada socio y los datos de las familias. Si colaboramos con el gobierno, seguiríamos la regla federal de 2024: competir en igualdad, ofrecer las actividades religiosas por separado y de forma voluntaria, y llevar cuentas separadas, sin contaminarnos, como Daniel (Daniel 1:8). Recibiríamos a los voluntarios de la comunidad con una orientación, con la revisión de antecedentes para los que sirvan con niños y con gratitud (Romanos 16:3). Y cada acuerdo quedaría por escrito; lo evaluaríamos cada seis meses, hablaríamos en privado de los problemas y, si hiciera falta, terminaríamos en paz (Romanos 12:18).",
  },
};
