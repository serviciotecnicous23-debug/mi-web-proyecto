/**
 * El banco de «Teología de la compasión» (especialidad Obra social y misericordia, materia 1). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el Dios que ve al necesitado · o2 la justicia para el pobre en la ley y los profetas · o3 la compasión de
 * Jesús · o4 el buen samaritano y el prójimo · o5 la primera iglesia y los pobres · o6 la palabra y la obra juntas · o7 el
 * versículo de memoria (Lucas 6:36).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `obra-social-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_OBRA_SOCIAL_1: BancoMateria = {
  materia: "obra-social-1",
  repaso: {
    "obra-social-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dijo Dios a Moisés sobre su pueblo en Egipto, según Éxodo 3:7?", "Que había visto su aflicción, había oído su clamor y conocía sus angustias", ["Que el pueblo merecía su sufrimiento", "Que no quería saber nada de Egipto", "Que el pueblo debía librarse solo"], "«Bien he visto la aflicción de mi pueblo que está en Egipto, y he oído su clamor».", "Éxodo 3:7"],
      ["1-r2", 1, "o1", "comprender", "¿Quiénes son los cuatro vulnerables que la Biblia nombra una y otra vez en la ley y los profetas?", "La viuda, el huérfano, el extranjero y el pobre", ["Los sacerdotes, los levitas, los reyes y los jueces", "Los ricos, los sabios, los fuertes y los nobles", "Los soldados, los pastores, los mercaderes y los escribas"], "«no oprimáis a la viuda, al huérfano, al extranjero ni al pobre».", "Zacarías 7:10"],
      ["1-r3", 1, "o1", "aplicar", "Una familia acaba de llegar de otro país y vive cerca del templo. ¿Qué haces, como enseña la ley de Dios sobre el extranjero?", "La recibes con respeto y le ofreces ayuda práctica, porque Dios ama al extranjero", ["La ignoras hasta que aprenda el idioma", "Le pides que busque otra iglesia", "Esperas a que ella pida ayuda primero"], "«que ama también al extranjero dándole pan y vestido».", "Deuteronomio 10:18"],
    ] as P[]).map(p),
    "obra-social-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué no debía hacer el campesino al segar su campo, según Levítico 19:9?", "Segar hasta el último rincón y espigar su tierra segada", ["Dar el diezmo", "Descansar el sábado", "Vender su cosecha"], "«no segarás hasta el último rincón de ella, ni espigarás tu tierra segada».", "Levítico 19:9-10"],
      ["2-r2", 2, "o2", "comprender", "¿Qué enseña Deuteronomio 15:11 sobre los pobres que siempre habrá?", "Que por eso hay que abrir la mano al hermano pobre y menesteroso", ["Que no vale la pena ayudarlos", "Que su pobreza es un castigo de Dios", "Que solo el rey debe ayudarlos"], "«no faltarán menesterosos en medio de la tierra; por eso yo te mando, diciendo: Abrirás tu mano a tu hermano».", "Deuteronomio 15:11"],
      ["2-r3", 2, "o2", "aplicar", "Tu iglesia reparte despensas y siempre vienen las mismas familias. ¿Qué haces, según el principio de la espiga?", "Sigues dando la despensa y además abres oportunidades, como clases o una bolsa de trabajo", ["Dejas de dar la despensa", "Les pides que no vuelvan", "Solo das más comida"], "«para el pobre y para el extranjero lo dejarás».", "Levítico 19:9-10"],
    ] as P[]).map(p),
    "obra-social-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Por qué tuvo compasión Jesús de las multitudes, según Mateo 9:36?", "Porque estaban desamparadas y dispersas como ovejas que no tienen pastor", ["Porque eran muy ricas", "Porque cantaban mal", "Porque no querían oírlo"], "«porque estaban desamparadas y dispersas como ovejas que no tienen pastor».", "Mateo 9:36"],
      ["3-r2", 3, "o3", "comprender", "¿En qué se diferencia la compasión de la lástima?", "La lástima mira de lejos; la compasión se acerca, acompaña y trata a la persona con dignidad", ["No hay ninguna diferencia", "La lástima ayuda más que la compasión", "La compasión solo siente y no hace nada"], "«Y al ver las multitudes, tuvo compasión de ellas».", "Mateo 9:36"],
      ["3-r3", 3, "o3", "aplicar", "Una vecina que no es de la iglesia acaba de enviudar y no sabe cómo pagará la renta. ¿Qué haces, como Jesús con la viuda de Naín?", "Vas a verla, la escuchas, cubres lo urgente con el fondo de ayuda y la acompañas sin condiciones", ["Le mandas un mensaje y nada más", "La ayudas solo si viene a la iglesia", "Esperas a que ella llame"], "«cuando el Señor la vio, se compadeció de ella, y le dijo: No llores».", "Lucas 7:13"],
    ] as P[]).map(p),
    "obra-social-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué hizo el samaritano cuando vio al herido, según Lucas 10:33-34?", "Fue movido a misericordia, se acercó y vendó sus heridas", ["Pasó de largo", "Llamó a los sacerdotes", "Le pidió dinero"], "«fue movido a misericordia; y acercándose, vendó sus heridas».", "Lucas 10:33-34"],
      ["4-r2", 4, "o4", "comprender", "¿Qué pregunta le cambió Jesús al intérprete de la ley con la parábola del buen samaritano?", "De quién es mi prójimo a quién se portó como prójimo", ["De quién es Dios a quién es el rey", "De cuánto dar a cuándo dar", "De dónde orar a cómo orar"], "«¿Quién, pues, de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones?».", "Lucas 10:36-37"],
      ["4-r3", 4, "o4", "aplicar", "Un hombre sin hogar duerme en la entrada del templo y unos hermanos quieren sacarlo. ¿Qué propones?", "Acercarse con respeto, cubrir lo urgente, conectarlo con un albergue y seguir acompañándolo con reglas de seguridad", ["Llamar para que lo saquen sin hablarle", "Ignorarlo y entrar por otra puerta", "Darle dinero para que se vaya"], "«Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
    ] as P[]).map(p),
    "obra-social-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cómo se repartía en la iglesia de Jerusalén, según Hechos 4:35?", "A cada uno según su necesidad", ["Solo a los apóstoles", "A cada uno según su rango", "Solo a los que daban más"], "«y se repartía a cada uno según su necesidad».", "Hechos 4:34-35"],
      ["5-r2", 5, "o5", "comprender", "¿Qué hizo la iglesia de Jerusalén cuando las viudas de los griegos eran desatendidas, según Hechos 6?", "Escogió a siete de buen testimonio, llenos del Espíritu y de sabiduría, para servir", ["Dejó de ayudar a las viudas", "Puso a los apóstoles a servir las mesas", "Echó a los que se quejaban"], "«Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».", "Hechos 6:3"],
      ["5-r3", 5, "o5", "aplicar", "En tu iglesia, algunas hermanas mayores que viven solas nunca reciben visitas. ¿Qué propones, como en Hechos 6?", "Escoger un equipo de buen testimonio que las atienda y repartir las visitas para que ninguna quede olvidada", ["Decirles que busquen amigos", "Que el pastor las visite a todas él solo", "Esperar a que se quejen más"], "«llenos del Espíritu Santo y de sabiduría».", "Hechos 6:3"],
    ] as P[]).map(p),
    "obra-social-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué dice Santiago 2:17 de la fe que no tiene obras?", "Que es muerta en sí misma", ["Que es más pura", "Que es suficiente", "Que es la más fuerte"], "«Así también la fe, si no tiene obras, es muerta en sí misma».", "Santiago 2:15-17"],
      ["6-r2", 6, "o6", "comprender", "¿Qué distinguen Corbett y Fikkert al ayudar a los pobres?", "El alivio, para una crisis, de la rehabilitación y el desarrollo, que se hacen con la persona", ["Los pobres buenos de los malos", "La ayuda en dinero de la ayuda en comida", "La ayuda de la iglesia de la del gobierno"], "«no amemos de palabra ni de lengua, sino de hecho y en verdad».", "1 Juan 3:17-18"],
      ["6-r3", 6, "o6", "aplicar", "Tu iglesia regala juguetes cada Navidad, y un padre dice que se siente avergonzado delante de sus hijos. ¿Qué propones?", "Una venta de juguetes a precios muy bajos donde los padres compran para sus hijos, con una celebración con el mensaje", ["Seguir igual sin escucharlo", "Dejar de celebrar la Navidad", "Regalarle a él un juguete más"], "«creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · El Dios que ve al necesitado
    ["f01", 1, "o1", "recordar", "¿Qué hace Dios por el huérfano y la viuda, según Deuteronomio 10:18?", "Les hace justicia", ["Los olvida", "Los castiga", "Los deja solos"], "«que hace justicia al huérfano y a la viuda».", "Deuteronomio 10:18"],
    ["f02", 1, "o1", "recordar", "¿Qué le da Dios al extranjero, según Deuteronomio 10:18?", "Pan y vestido", ["Oro y plata", "Tierras y casas", "Nada"], "«que ama también al extranjero dándole pan y vestido».", "Deuteronomio 10:18"],
    ["f03", 1, "o1", "comprender", "¿Qué muestra Éxodo 3:7-8 sobre Dios ante el sufrimiento?", "Que ve, oye y conoce el sufrimiento, y actúa para librar", ["Que no le importa", "Que solo ve a los fuertes", "Que espera a que el pueblo se libre solo"], "«Bien he visto la aflicción de mi pueblo».", "Éxodo 3:7"],
    ["f04", 1, "o1", "comprender", "¿Por qué la dignidad de una persona pobre no depende de lo que tiene?", "Porque cada persona lleva la imagen de Dios", ["Porque los pobres son mejores que los ricos", "Porque la pobreza es una virtud", "Porque el dinero no existe para Dios"], "«Y creó Dios al hombre a su imagen».", "Génesis 1:27"],
    ["f05", 1, "o1", "comprender", "¿Por qué debía Israel amar al extranjero, según Deuteronomio 10:19?", "Porque ellos también fueron extranjeros en la tierra de Egipto", ["Porque el extranjero era más rico", "Porque así lo pedía el faraón", "Porque el extranjero era sacerdote"], "«Amaréis, pues, al extranjero; porque extranjeros fuisteis en la tierra de Egipto».", "Deuteronomio 10:19"],
    ["f06", 1, "o1", "analizar", "¿Por qué es un error pensar que todo pobre tiene lo que se merece?", "Porque muchos sufren por la opresión, la enfermedad o un desastre, y la Biblia no permite despreciar al pobre", ["Porque nadie es pobre de verdad", "No es un error", "Porque el pobre siempre tiene la culpa"], "«El que oprime al pobre afrenta a su Hacedor».", "Proverbios 14:31"],
    ["f07", 1, "o1", "aplicar", "Tu grupo de misericordia quiere empezar a servir en el barrio. ¿Qué hace primero?", "Orar, caminar el barrio, escuchar a los vecinos y poner nombre a las personas que sufren", ["Organizar un gran evento sin conocer a nadie", "Esperar a que los necesitados vengan al templo", "Copiar el programa de otra iglesia"], "«y he oído su clamor».", "Éxodo 3:7"],
    ["f08", 1, "o1", "aplicar", "Un hermano dice que los pobres de su cuadra son flojos y que no merecen ayuda. ¿Qué le respondes?", "Que muchos sufren por causas que no eligieron, que cada uno lleva la imagen de Dios y que Dios defiende al pobre", ["Que tiene razón", "Que solo se ayude a los que van a la iglesia", "Que la pobreza es un castigo"], "«Mas el que tiene misericordia del pobre, lo honra».", "Proverbios 14:31"],
    ["f09", 1, "o1", "evaluar", "¿Qué manera de empezar un ministerio de misericordia refleja mejor el corazón de Dios?", "Mirar a las personas con su nombre, escuchar su historia y actuar con justicia y amor", ["Ayudar solo a los que nos caen bien", "Dar algo una vez para la foto", "Esperar a que alguien lo pida en el culto"], "«Al huérfano y a la viuda sostiene».", "Salmos 146:9"],
    ["f10", 1, "o7", "recordar", "Completa Lucas 6:36: Sed, pues, misericordiosos…", "como también vuestro Padre es misericordioso", ["como lo son los ricos", "cuando os convenga", "con los que os aman"], "«Sed, pues, misericordiosos, como también vuestro Padre es misericordioso».", "Lucas 6:36"],
    // Lección 2 · La ley y los profetas: justicia para el pobre
    ["f11", 2, "o2", "recordar", "¿Para quiénes debía dejar el campesino el fruto caído de su viña, según Levítico 19:10?", "Para el pobre y para el extranjero", ["Para los sacerdotes", "Para el rey", "Para sus animales"], "«para el pobre y para el extranjero lo dejarás».", "Levítico 19:9-10"],
    ["f12", 2, "o2", "recordar", "¿Qué es parte del ayuno que Dios escogió, según Isaías 58:7?", "Partir el pan con el hambriento y albergar a los pobres errantes", ["No comer durante cuarenta días", "Cantar en el templo", "Ofrecer sacrificios"], "«que partas tu pan con el hambriento».", "Isaías 58:6-7"],
    ["f13", 2, "o2", "recordar", "¿Qué pide Amós 5:24 que corra como las aguas?", "El juicio", ["El vino", "El oro", "El aceite"], "«Pero corra el juicio como las aguas».", "Amós 5:24"],
    ["f14", 2, "o2", "comprender", "¿Para quiénes era el diezmo del tercer año, según Deuteronomio 14:28-29?", "Para el levita, el extranjero, el huérfano y la viuda", ["Solo para el rey", "Para los ricos de la ciudad", "Para los soldados"], "«y el extranjero, el huérfano y la viuda que hubiere en tus poblaciones».", "Deuteronomio 14:28-29"],
    ["f15", 2, "o2", "comprender", "¿Qué pasaba en el año de remisión, según Deuteronomio 15:1-2?", "Se perdonaban las deudas entre hermanos", ["Se cobraban todas las deudas", "Se vendían los campos", "Se dejaba de orar"], "«Cada siete años harás remisión».", "Deuteronomio 15:1-2"],
    ["f16", 2, "o2", "analizar", "¿Por qué la espiga daba más dignidad que un simple regalo?", "Porque el pobre trabajaba y recogía con sus manos su propio alimento", ["Porque era más barata", "No daba más dignidad", "Porque la daba el rey"], "«ni espigarás tu tierra segada».", "Levítico 19:9-10"],
    ["f17", 2, "o2", "aplicar", "Tienes que planear la despensa de la iglesia para el año. ¿Qué agregas al reparto de comida?", "Oportunidades para salir adelante: clases, ayuda para buscar trabajo y la invitación a servir como voluntarios", ["Nada más", "Una regla para que no vuelvan", "Un sermón obligatorio para recibir la despensa"], "«para el pobre y para el extranjero lo dejarás».", "Levítico 19:9-10"],
    ["f18", 2, "o2", "aplicar", "Un hermano empresario quiere ayudar a una familia sin trabajo. ¿Qué le propones, como enseña la ley?", "Ofrecerle un trabajo con un jornal justo y pagado a tiempo, o enseñarle un oficio", ["Darle dinero cada semana para siempre", "Prestarle con mucho interés", "Pagarle cuando pueda"], "«En su día le darás su jornal».", "Deuteronomio 24:14-15"],
    ["f19", 2, "o2", "aplicar", "En tu iglesia hay cultos muy hermosos, pero nadie se ocupa de los hermanos que pasan hambre. ¿Qué propones, como enseña Isaías 58?", "Unir el culto con la justicia: organizar ayuda para los que pasan hambre y partir el pan con ellos", ["Hacer más cultos", "Ayunar más días", "Dejar el tema para otro año"], "«¿No es que partas tu pan con el hambriento».", "Isaías 58:6-7"],
    ["f20", 2, "o2", "evaluar", "¿Qué ayuda a una familia pobre está más cerca de lo que enseñaba la ley de Moisés?", "Dar lo urgente y abrir una oportunidad para que trabaje y salga adelante con dignidad", ["Darle todo hecho para siempre", "No darle nada para que aprenda", "Prestarle con interés"], "«Abrirás tu mano a tu hermano».", "Deuteronomio 15:11"],
    // Lección 3 · Jesús, movido a compasión
    ["f21", 3, "o3", "recordar", "¿Qué le dijo Jesús a la viuda de Naín, según Lucas 7:13?", "No llores", ["Vete en paz", "Ten fe", "Sígueme"], "«y le dijo: No llores».", "Lucas 7:13"],
    ["f22", 3, "o3", "recordar", "¿Para qué fue ungido Jesús, según Lucas 4:18?", "Para dar buenas nuevas a los pobres", ["Para ser rey de Roma", "Para juzgar a los pobres", "Para reunir riquezas"], "«me ha ungido para dar buenas nuevas a los pobres».", "Lucas 4:18-19"],
    ["f23", 3, "o3", "recordar", "¿Cómo estaban las multitudes que vio Jesús, según Mateo 9:36?", "Desamparadas y dispersas como ovejas que no tienen pastor", ["Alegres y satisfechas", "Ricas y fuertes", "Enojadas con él"], "«porque estaban desamparadas y dispersas».", "Mateo 9:36"],
    ["f24", 3, "o3", "comprender", "¿Qué hizo Jesús con el leproso, según Marcos 1:41?", "Extendió la mano y lo tocó", ["Lo mandó lejos", "Lo miró de lejos", "Le pidió dinero"], "«extendió la mano y le tocó».", "Marcos 1:41"],
    ["f25", 3, "o3", "comprender", "¿Qué hacía Jesús, además de sanar, según Mateo 9:35?", "Enseñaba y predicaba el evangelio del reino", ["Solo sanaba", "Juntaba dinero", "Se apartaba de la gente"], "«enseñando en las sinagogas de ellos, y predicando el evangelio del reino».", "Mateo 9:35"],
    ["f26", 3, "o3", "analizar", "¿Por qué la compasión de Jesús no reemplazaba la Palabra?", "Porque sanaba y daba de comer, pero también enseñaba y anunciaba el reino", ["Porque nunca ayudaba a nadie", "Porque solo predicaba", "Sí la reemplazaba"], "«y sanando toda enfermedad y toda dolencia en el pueblo».", "Mateo 9:35"],
    ["f27", 3, "o3", "aplicar", "Una vecina acaba de perder a su esposo y tiene tres hijos. ¿Qué haces primero?", "Ir a verla en persona, escucharla y preguntarle qué necesita primero", ["Explicarle por qué pasó", "Mandarle un versículo y nada más", "Esperar a que venga a la iglesia"], "«se compadeció de ella».", "Lucas 7:13"],
    ["f28", 3, "o3", "aplicar", "Tu grupo ayuda a un señor enfermo, pero solo le deja la comida y nunca se queda a conversar. ¿Qué propones?", "Acercarse, escucharlo y acompañarlo, además de llevarle la comida", ["Dejar de llevarle comida", "Llevarle más comida", "Mandarle la comida con un desconocido"], "«Y al ver las multitudes, tuvo compasión de ellas».", "Mateo 9:36"],
    ["f29", 3, "o3", "aplicar", "Alguien propone ayudar a una familia solo si promete venir al culto. ¿Qué respondes?", "Que la ayuda se da por amor, sin condiciones, y el evangelio se ofrece con respeto", ["Que es buena idea", "Que firmen un compromiso", "Que la ayuda sea solo para miembros"], "«me ha ungido para dar buenas nuevas a los pobres».", "Lucas 4:18-19"],
    ["f30", 3, "o3", "evaluar", "¿Qué respuesta a una persona que sufre se parece más a la compasión de Jesús?", "Acercarse, escuchar, cubrir lo urgente y acompañar, ofreciendo también la buena noticia", ["Darle algo de lejos para quitarse la culpa", "Decirle pobrecito y seguir", "Darle un sermón sobre sus errores"], "«se compadeció de ella, y le dijo: No llores».", "Lucas 7:13"],
    // Lección 4 · ¿Quién es mi prójimo?
    ["f31", 4, "o4", "recordar", "¿Qué le dijo Jesús al intérprete de la ley al final de la parábola, según Lucas 10:37?", "Ve, y haz tú lo mismo", ["Quédate aquí", "Pregunta al sacerdote", "No hagas nada"], "«Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
    ["f32", 4, "o4", "recordar", "¿Qué echó el samaritano en las heridas del hombre, según Lucas 10:34?", "Aceite y vino", ["Agua y sal", "Miel y leche", "Nada"], "«vendó sus heridas, echándoles aceite y vino».", "Lucas 10:33-34"],
    ["f33", 4, "o4", "recordar", "¿A quién se le hace lo que se hace a uno de los hermanos más pequeños, según Mateo 25:40?", "A Cristo", ["A los ángeles", "Al rey de la tierra", "A nadie"], "«a mí lo hicisteis».", "Mateo 25:40"],
    ["f34", 4, "o4", "comprender", "¿Por qué sorprendía que el que ayudó al herido fuera un samaritano?", "Porque judíos y samaritanos no se trataban entre sí", ["Porque los samaritanos eran sacerdotes", "Porque el samaritano era rico", "No sorprendía"], "«Porque judíos y samaritanos no se tratan entre sí».", "Juan 4:9"],
    ["f35", 4, "o4", "comprender", "¿Qué enseña Gálatas 6:10 sobre a quién hacer bien?", "Hacer bien a todos, y mayormente a los de la familia de la fe", ["Solo a los de la iglesia", "Solo a los que nos devuelven el favor", "A nadie fuera de la familia"], "«hagamos bien a todos, y mayormente a los de la familia de la fe».", "Gálatas 6:10"],
    ["f36", 4, "o4", "analizar", "¿Por qué el sacerdote y el levita de la parábola son una advertencia para la iglesia?", "Porque conocían la ley y pasaron de largo: la religión sin misericordia no agrada a Dios", ["Porque eran samaritanos", "Porque ayudaron demasiado", "No son una advertencia"], "«fue movido a misericordia».", "Lucas 10:33-34"],
    ["f37", 4, "o4", "aplicar", "Un hombre sin hogar pide ayuda en la puerta del templo antes del culto. ¿Qué haces?", "Lo saludas, cubres lo urgente, oras con él si lo acepta y buscas cómo conectarlo con un albergue", ["Lo ignoras para no llegar tarde", "Llamas para que lo saquen", "Le das dinero sin hablarle"], "«y acercándose, vendó sus heridas».", "Lucas 10:33-34"],
    ["f38", 4, "o4", "aplicar", "Tu iglesia ayuda solo a sus miembros, y un vecino de otra religión pierde su casa en un incendio. ¿Qué propones?", "Ayudarlo también, porque el prójimo es cualquiera que está en necesidad en nuestro camino", ["No ayudarlo porque no es de la iglesia", "Mandarlo a su propia religión", "Ayudarlo solo si se convierte"], "«hagamos bien a todos».", "Gálatas 6:10"],
    ["f39", 4, "o4", "aplicar", "Tienes que organizar visitas a un hogar de ancianos de la ciudad. ¿Qué tienes en cuenta, como en Mateo 25?", "Que al servirlos servimos a Cristo, y que hay que ir con permiso, con orden y con constancia", ["Que basta con ir una vez para la foto", "Que solo se visita a los evangélicos", "Que no hace falta pedir permiso"], "«en cuanto lo hicisteis a uno de estos mis hermanos más pequeños».", "Mateo 25:40"],
    ["f40", 4, "o4", "evaluar", "¿Qué respuesta refleja mejor la parábola del buen samaritano?", "Detenerse ante el necesitado aunque sea diferente, ayudarlo aunque cueste y seguir acompañándolo", ["Ayudar solo a los de mi grupo", "Esperar a que otro se detenga", "Dar consejos sin ayudar"], "«El que usó de misericordia con él».", "Lucas 10:36-37"],
    // Lección 5 · La primera iglesia y los pobres
    ["f41", 5, "o5", "recordar", "¿Qué pidieron los apóstoles a Pablo, según Gálatas 2:10?", "Que se acordaran de los pobres", ["Que dejara de predicar", "Que fuera a Roma", "Que bautizara a todos"], "«Solamente nos pidieron que nos acordásemos de los pobres».", "Gálatas 2:10"],
    ["f42", 5, "o5", "recordar", "¿Qué no había entre los creyentes de Jerusalén, según Hechos 4:34?", "Ningún necesitado", ["Ningún apóstol", "Ningún templo", "Ninguna oración"], "«Así que no había entre ellos ningún necesitado».", "Hechos 4:34-35"],
    ["f43", 5, "o5", "recordar", "¿Qué buscaba Pablo con la ofrenda para Jerusalén, según 2 Corintios 8:14?", "Que hubiera igualdad", ["Que unos quedaran en estrechez", "Que la iglesia se hiciera rica", "Que él tuviera fama"], "«para que haya igualdad».", "2 Corintios 8:13-14"],
    ["f44", 5, "o5", "comprender", "¿Qué cualidades debían tener los siete que sirvieron a las viudas, según Hechos 6:3?", "Buen testimonio, llenos del Espíritu Santo y de sabiduría", ["Riqueza y fama", "Juventud y fuerza", "Estudios en Roma"], "«siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría».", "Hechos 6:3"],
    ["f45", 5, "o5", "comprender", "¿Qué hizo la iglesia de Antioquía en tiempo de hambre, según Hechos 11:29?", "Envió socorro a los hermanos de Judea, cada uno conforme a lo que tenía", ["Pidió ayuda a Roma", "No hizo nada", "Vendió el templo"], "«cada uno conforme a lo que tenía, determinaron enviar socorro a los hermanos que habitaban en Judea».", "Hechos 11:29-30"],
    ["f46", 5, "o5", "analizar", "¿Por qué escoger a los siete ayudó también a que la palabra creciera?", "Porque los apóstoles pudieron seguir en la oración y en el ministerio de la palabra", ["Porque los siete predicaban más", "Porque las viudas se fueron", "No ayudó"], "«Y nosotros persistiremos en la oración y en el ministerio de la palabra».", "Hechos 6:4"],
    ["f47", 5, "o5", "aplicar", "En tu iglesia cada grupo ayuda a sus amigos, y algunas hermanas solas quedan olvidadas. ¿Qué propones?", "Formar un equipo de buen testimonio que vele por todas y repartir la ayuda con orden", ["Que cada uno siga igual", "Que las olvidadas busquen un grupo", "Que el pastor lo haga todo"], "«Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».", "Hechos 6:3"],
    ["f48", 5, "o5", "aplicar", "Una iglesia hermana de otra ciudad perdió su templo en una inundación. ¿Qué propones a tu iglesia?", "Recoger una ofrenda especial, cada uno según lo que tiene, y enviarla con cuentas claras", ["No hacer nada porque es de otra ciudad", "Dar solo si sobra al final del año", "Enviar la ayuda sin registro"], "«determinaron enviar socorro a los hermanos».", "Hechos 11:29-30"],
    ["f49", 5, "o5", "aplicar", "Tienes que manejar una ofrenda especial para una familia en crisis. ¿Qué cuidas, como Pablo?", "Que la ofrenda se maneje con transparencia y se informe en qué se usó", ["Que solo tú sepas cuánto se recogió", "Que se guarde en tu casa", "Que no se informe nada"], "«evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos».", "2 Corintios 8:20-21"],
    ["f50", 5, "o5", "evaluar", "¿Qué manera de organizar la ayuda en la iglesia se parece más a la de la primera iglesia?", "Un equipo de buen testimonio, ayuda según la necesidad, cuentas claras y pastores dedicados a la Palabra", ["Que cada uno ayude a sus amigos", "Que el pastor lo haga todo", "Ayudar sin orden ni cuentas"], "«y se repartía a cada uno según su necesidad».", "Hechos 4:34-35"],
    // Lección 6 · La palabra y la obra juntas
    ["f51", 6, "o6", "recordar", "¿Cómo pide 1 Juan 3:18 que amemos?", "De hecho y en verdad", ["De palabra y de lengua", "Solo con la oración", "De lejos"], "«no amemos de palabra ni de lengua, sino de hecho y en verdad».", "1 Juan 3:17-18"],
    ["f52", 6, "o6", "recordar", "¿Para qué fuimos creados en Cristo Jesús, según Efesios 2:10?", "Para buenas obras", ["Para ser ricos", "Para no hacer nada", "Para juzgar a otros"], "«creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ["f53", 6, "o6", "recordar", "¿Qué le dice al necesitado el que no le da lo necesario, según Santiago 2:16?", "Id en paz, calentaos y saciaos", ["Ven a mi casa", "Toma lo que necesites", "Te acompaño"], "«Id en paz, calentaos y saciaos».", "Santiago 2:15-17"],
    ["f54", 6, "o6", "comprender", "¿Qué afirma el artículo 5 del Pacto de Lausana (1974)?", "Que la evangelización y la participación sociopolítica son parte del deber cristiano", ["Que la iglesia no debe ayudar a los pobres", "Que la acción social reemplaza al evangelio", "Que solo los gobiernos deben ayudar"], "«Así también la fe, si no tiene obras, es muerta en sí misma».", "Santiago 2:15-17"],
    ["f55", 6, "o6", "comprender", "¿Qué es el alivio, según Corbett y Fikkert?", "La ayuda urgente y por poco tiempo para aliviar el sufrimiento en una crisis", ["La ayuda que dura toda la vida", "Un préstamo con interés", "Un programa de estudios"], "«y tienen necesidad del mantenimiento de cada día».", "Santiago 2:15-17"],
    ["f56", 6, "o6", "analizar", "¿Por qué dar alivio donde hace falta desarrollo puede hacer daño?", "Porque crea dependencia y le quita a la persona la dignidad de salir adelante", ["Porque cuesta poco", "No puede hacer daño", "Porque el alivio es pecado"], "«no amemos de palabra ni de lengua, sino de hecho y en verdad».", "1 Juan 3:17-18"],
    ["f57", 6, "o6", "aplicar", "Un hermano dice que la iglesia solo debe predicar y no ayudar a los pobres. ¿Qué le respondes?", "Que la fe sin obras está muerta y que Jesús predicaba y sanaba: la palabra y la obra van juntas", ["Que tiene razón", "Que solo hay que ayudar y no predicar", "Que eso lo hace el gobierno"], "«Así también la fe, si no tiene obras, es muerta en sí misma».", "Santiago 2:15-17"],
    ["f58", 6, "o6", "aplicar", "Una familia del barrio pierde su casa en un incendio. ¿Qué tipo de ayuda le das primero?", "Alivio: comida, ropa y un lugar para dormir, porque es una crisis", ["Un curso de finanzas", "Nada hasta que pida un préstamo", "Un sermón sobre el ahorro"], "«y tienen necesidad del mantenimiento de cada día».", "Santiago 2:15-17"],
    ["f59", 6, "o6", "aplicar", "Tienes que ayudar a un hermano que lleva un año sin trabajo y recibe la despensa cada semana. ¿Qué haces?", "Pasar al desarrollo: caminar con él, ayudarlo a buscar trabajo o a aprender un oficio, con su participación", ["Seguir solo con la despensa para siempre", "Quitarle la despensa sin hablar", "Darle dinero sin conversar"], "«creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan de ayuda de una iglesia une mejor la palabra y la obra?", "Servir según la necesidad, distinguir el alivio del desarrollo y ofrecer el evangelio con respeto, sin condicionar la ayuda", ["Ayudar solo a los que se convierten", "Predicar sin ayudar nunca", "Ayudar sin hablar nunca de Cristo"], "«sino de hecho y en verdad».", "1 Juan 3:17-18"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué hace Jehová con los extranjeros, según Salmos 146:9?", "Los guarda", ["Los rechaza", "Los olvida", "Los castiga"], "«Jehová guarda a los extranjeros».", "Salmos 146:9"],
      ["m1-02", 1, "o1", "comprender", "¿Qué dice Proverbios 14:31 del que oprime al pobre?", "Que afrenta a su Hacedor", ["Que hace bien", "Que será rico", "Que nada le pasa"], "«El que oprime al pobre afrenta a su Hacedor».", "Proverbios 14:31"],
      ["m1-03", 1, "o1", "aplicar", "Tienes que hacer el mapa de los necesitados del barrio. ¿Qué anotas?", "Las personas con su nombre y su situación: ancianos solos, familias que llegan, madres solas y personas sin trabajo", ["Solo cuántas casas hay", "Solo a los que van a la iglesia", "Nada, es mejor no saber"], "«Bien he visto la aflicción de mi pueblo».", "Éxodo 3:7"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué la Biblia nombra tantas veces a la viuda, al huérfano y al extranjero?", "Porque no tenían quién los defendiera, y Dios se presenta como su defensor", ["Porque eran los más ricos", "Porque eran sacerdotes", "Porque así lo pedía el rey"], "«Al huérfano y a la viuda sostiene».", "Salmos 146:9"],
      ["m1-05", 1, "o1", "recordar", "¿Qué oyó Dios, según Éxodo 3:7?", "El clamor de su pueblo a causa de sus exactores", ["Los cantos de Egipto", "La voz del faraón", "El ruido de la guerra"], "«y he oído su clamor a causa de sus exactores».", "Éxodo 3:7"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué actitud ante los necesitados refleja mejor a Dios?", "Verlos con su nombre, escucharlos y actuar con justicia y amor", ["Verlos como un número", "Pensar que se merecen lo que tienen", "Ayudar solo a los que agradecen"], "«que hace justicia al huérfano y a la viuda».", "Deuteronomio 10:18"],
      ["m1-07", 2, "o2", "recordar", "¿Qué mandaba Deuteronomio 15:11 hacer con el hermano pobre?", "Abrirle la mano", ["Cerrarle la puerta", "Cobrarle intereses", "Mandarlo lejos"], "«Abrirás tu mano a tu hermano, al pobre y al menesteroso en tu tierra».", "Deuteronomio 15:11"],
      ["m1-08", 2, "o2", "comprender", "¿Qué enseñaron los profetas sobre el culto y la justicia?", "Que el culto sin justicia no agrada a Dios", ["Que basta con el culto", "Que la justicia es solo para los jueces", "Que Dios no ve la injusticia"], "«Pero corra el juicio como las aguas, y la justicia como impetuoso arroyo».", "Amós 5:24"],
      ["m1-09", 2, "o2", "aplicar", "Alguien de tu iglesia quiere ayudar a una madre sola que no tiene trabajo. ¿Qué le propones, como la espiga?", "Cubrir lo urgente y ayudarla a conseguir trabajo o a aprender un oficio", ["Darle dinero cada semana sin hablar con ella", "Decirle que busque sola", "Esperar a que pida otra vez"], "«para el pobre y para el extranjero lo dejarás».", "Levítico 19:9-10"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué que siempre vaya a haber pobres no es una excusa para no ayudar?", "Porque Dios dice que por eso mismo hay que abrir la mano", ["Porque ya no habrá pobres", "Sí es una excusa", "Porque los pobres no necesitan ayuda"], "«no faltarán menesterosos en medio de la tierra».", "Deuteronomio 15:11"],
      ["m1-11", 2, "o2", "comprender", "¿Cómo pensaba conseguir Rut su alimento en el campo, según Rut 2:2?", "Recogiendo espigas detrás de los segadores, como permitía la ley", ["Comprando el grano", "Robando de noche", "Pidiéndoselo al rey"], "«Te ruego que me dejes ir al campo, y recogeré espigas».", "Rut 2:2"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué plan de ayuda se parece más a la ley de Moisés?", "Dar con generosidad lo urgente y abrir oportunidades para trabajar con dignidad", ["Dar solo cuando sobra", "Prestar con interés alto", "No ayudar para que aprendan"], "«que partas tu pan con el hambriento».", "Isaías 58:6-7"],
      ["m1-13", 3, "o3", "recordar", "¿Qué pidió Jesús que se rogara al Señor de la mies, según Mateo 9:38?", "Que envíe obreros a su mies", ["Que haga llover", "Que castigue a los malos", "Que dé riquezas"], "«Rogad, pues, al Señor de la mies, que envíe obreros a su mies».", "Mateo 9:37-38"],
      ["m1-14", 3, "o3", "comprender", "¿Qué hizo Jesús cuando tuvo compasión de la multitud, según Mateo 14:14?", "Sanó a los enfermos", ["Se fue a otro lugar", "Les pidió una ofrenda", "Los reprendió"], "«y tuvo compasión de ellos, y sanó a los que de ellos estaban enfermos».", "Mateo 14:14"],
      ["m1-15", 3, "o3", "aplicar", "Un enfermo del barrio está solo y nadie lo visita. ¿Qué haces?", "Lo visitas, lo escuchas, oras con él si lo acepta y ves qué necesita", ["Le mandas un mensaje y nada más", "Esperas a que venga al templo", "Le dices pobrecito y sigues"], "«Y al ver las multitudes, tuvo compasión de ellas».", "Mateo 9:36"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué Jesús tocó al leproso, si podía sanarlo con una palabra?", "Porque además de sanarlo le devolvió la dignidad de ser tocado, cuando nadie lo tocaba", ["Porque no podía sanarlo de otra forma", "Por costumbre", "Para enfermarse"], "«extendió la mano y le tocó».", "Marcos 1:41"],
      ["m1-17", 3, "o3", "recordar", "¿Qué leyó Jesús en la sinagoga de Nazaret, según Lucas 4:18?", "Que el Señor lo había ungido para dar buenas nuevas a los pobres", ["La lista de los reyes", "La ley de los sacrificios", "Un salmo de guerra"], "«me ha ungido para dar buenas nuevas a los pobres».", "Lucas 4:18-19"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué forma de ayudar se parece más a la de Jesús?", "Acercarse con respeto, escuchar, servir en lo que hace falta y anunciar la buena noticia", ["Ayudar de lejos sin hablar", "Predicar sin ayudar", "Ayudar solo a los fieles"], "«tuvo compasión de ellas».", "Mateo 9:36"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Cuánto dio el samaritano al mesonero, según Lucas 10:35?", "Dos denarios", ["Diez monedas de oro", "Su capa", "Nada"], "«sacó dos denarios, y los dio al mesonero».", "Lucas 10:35"],
      ["m2-02", 4, "o4", "comprender", "¿Qué muestra que el samaritano prometiera volver a pagar lo que faltara?", "Que la misericordia sigue y acompaña, y no ayuda una sola vez", ["Que tenía prisa", "Que no confiaba en el mesonero", "Que quería fama"], "«y todo lo que gastes de más, yo te lo pagaré cuando regrese».", "Lucas 10:35"],
      ["m2-03", 4, "o4", "aplicar", "Una familia de otra religión del barrio necesita ayuda después de un accidente. ¿Qué haces?", "La ayudas con lo que necesita, porque es tu prójimo", ["No la ayudas porque no es evangélica", "La ayudas solo si se convierte", "Esperas a que otra iglesia la ayude"], "«Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué Jesús hizo de un samaritano el que ayudó en la parábola?", "Para enseñar que el prójimo no se define por la raza ni la religión, y que lo que cuenta es la misericordia", ["Porque los samaritanos eran sacerdotes", "Porque no conocía a otros", "Para burlarse de los judíos"], "«Pero un samaritano, que iba de camino, vino cerca de él».", "Lucas 10:33-34"],
      ["m2-05", 4, "o4", "aplicar", "Tienes que enseñar la parábola del buen samaritano a los jóvenes. ¿Qué aplicación les pides?", "Que esta semana se detengan a ayudar a alguien en necesidad, aunque sea diferente", ["Que la aprendan de memoria y nada más", "Que critiquen a los sacerdotes", "Que esperen a ser mayores"], "«Ve, y haz tú lo mismo».", "Lucas 10:36-37"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué iglesia vive mejor Gálatas 6:10?", "La que cuida a sus hermanos y también hace bien a los vecinos que no son de la iglesia", ["La que solo ayuda a sus miembros", "La que solo ayuda a los de afuera", "La que no ayuda a nadie"], "«hagamos bien a todos, y mayormente a los de la familia de la fe».", "Gálatas 6:10"],
      ["m2-07", 5, "o5", "recordar", "¿Qué hacía Dorcas, según Hechos 9:36?", "Abundaba en buenas obras y en limosnas", ["Predicaba en las sinagogas", "Era reina de Jope", "Cobraba impuestos"], "«Esta abundaba en buenas obras y en limosnas que hacía».", "Hechos 9:36"],
      ["m2-08", 5, "o5", "comprender", "¿Cómo dieron las iglesias de Macedonia, según 2 Corintios 8:3?", "Conforme a sus fuerzas, y aun más allá de sus fuerzas", ["Solo lo que les sobraba", "Obligadas por Pablo", "Nada"], "«con agrado han dado conforme a sus fuerzas, y aun más allá de sus fuerzas».", "2 Corintios 8:3"],
      ["m2-09", 5, "o5", "aplicar", "Tu iglesia quiere ayudar a una iglesia hermana después de un huracán. ¿Qué haces, como la iglesia de Antioquía?", "Recoges una ofrenda, cada uno según lo que tiene, y la envías por medio de personas de confianza", ["Esperas a que pase un año", "Mandas lo que sobre", "No haces nada"], "«enviándolo a los ancianos por mano de Bernabé y de Saulo».", "Hechos 11:29-30"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué Pablo cuidó tanto la transparencia de la ofrenda para Jerusalén?", "Para que nadie pudiera censurarlos y la ofrenda diera buen testimonio", ["Porque no confiaba en nadie", "Porque era una ley romana", "No la cuidó"], "«evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos».", "2 Corintios 8:20-21"],
      ["m2-11", 5, "o5", "comprender", "¿Era obligatorio vender las propiedades en la iglesia de Jerusalén, según Hechos 5:4?", "No: lo hacían libremente, y lo vendido estaba en su poder", ["Sí, era obligatorio", "Solo para los apóstoles", "Solo para los ricos"], "«y vendida, ¿no estaba en tu poder?».", "Hechos 5:4"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué manera de responder a una iglesia que sufre es la mejor?", "Dar cada uno según lo que tiene, enviar la ayuda por personas de confianza y rendir cuentas", ["Dar solo si nos lo devuelven", "Esperar a que pidan varias veces", "Mandar la ayuda sin registro"], "«cada uno conforme a lo que tenía».", "Hechos 11:29-30"],
      ["m2-13", 6, "o6", "recordar", "¿Qué pregunta 1 Juan 3:17 sobre el que cierra su corazón al hermano necesitado?", "Cómo mora el amor de Dios en él", ["Cuánto dinero tiene", "Dónde vive", "Qué piensa el pastor"], "«¿cómo mora el amor de Dios en él?».", "1 Juan 3:17-18"],
      ["m2-14", 6, "o6", "comprender", "¿Qué es el desarrollo, según Corbett y Fikkert?", "Un camino en el que la persona crece más allá de donde estaba, con su participación", ["Dar comida en una emergencia", "Un préstamo con interés", "Una sola visita"], "«creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
      ["m2-15", 6, "o6", "aplicar", "Un grupo de tu iglesia quiere regalar despensas para siempre a las mismas familias. ¿Qué propones?", "Seguir con la ayuda urgente y abrir un camino de desarrollo con la participación de las familias", ["Dejar todo como está", "Quitar la ayuda de golpe", "Pedirles que firmen un compromiso de fe"], "«sino de hecho y en verdad».", "1 Juan 3:17-18"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la ayuda no se condiciona a que la persona venga al culto?", "Porque se da por amor, y el evangelio se ofrece con respeto: no se compra con ayuda", ["Porque el evangelio no importa", "Porque la persona nunca vendrá", "Sí se condiciona"], "«no amemos de palabra ni de lengua».", "1 Juan 3:17-18"],
      ["m2-17", 6, "o6", "comprender", "¿Qué afirma el artículo 6 del Pacto de Lausana sobre la evangelización?", "Que en la misión de servicio sacrificial de la iglesia la evangelización es primordial", ["Que la evangelización ya no es necesaria", "Que solo importa la acción social", "Que solo los pastores evangelizan"], "«Así también la fe, si no tiene obras, es muerta en sí misma».", "Santiago 2:15-17"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué ministerio de misericordia sigue mejor la misión integral?", "El que ayuda con obras, distingue el alivio del desarrollo y anuncia a Cristo con respeto", ["El que solo reparte cosas", "El que solo predica", "El que ayuda para tener fama"], "«creados en Cristo Jesús para buenas obras».", "Efesios 2:10"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "obra-social-1-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo se presenta Dios ante el sufrimiento y a qué personas cuida en especial la ley de Moisés.",
      ideas: [
        { id: "ve", peso: 30, texto: "Dios ve, oye y conoce el sufrimiento, y actúa para librar.", formas: ["ve el sufrimiento", "ve la afliccion", "oye el clamor", "escucha el clamor", "he visto", "conoce sus angustias", "conoce las angustias", "a librar", "a rescatar"] },
        { id: "vulnerables", peso: 30, texto: "La viuda, el huérfano, el extranjero y el pobre.", formas: ["huerfano*", "viuda*", "extranjero*"] },
        { id: "defensor", peso: 30, texto: "Dios es su defensor: les hace justicia y les da pan y vestido.", formas: ["hace justicia", "pan y vestido", "defensor", "defiende", "los sostiene", "los guarda", "su causa"] },
      ],
      citas: ["Éxodo 3:7", "Éxodo 3:7-8", "Deuteronomio 10:18", "Deuteronomio 10:18-19", "Salmos 146:9", "Zacarías 7:10", "Proverbios 14:31"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios ve la aflicción, oye el clamor y conoce las angustias de los que sufren, y baja a librarlos (Éxodo 3:7). La ley cuida en especial a la viuda, al huérfano, al extranjero y al pobre. Dios es su defensor: les hace justicia y les da pan y vestido (Deuteronomio 10:18).",
    },
    {
      id: "obra-social-1-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo cuidaba la ley de Moisés al pobre y qué enseñaron los profetas sobre el culto y la justicia.",
      ideas: [
        { id: "espiga", peso: 30, texto: "La espiga: dejar los bordes del campo y lo que caía para el pobre.", formas: ["espiga*", "los bordes", "ultimo rincon", "el rincon", "rebuscar", "gavilla*"] },
        { id: "otras", peso: 30, texto: "El diezmo del tercer año, el año de remisión, el préstamo sin interés o el jornal a tiempo.", formas: ["tercer ano", "remision", "sin interes", "sin usura", "el jornal", "perdonar las deudas", "perdonaban las deudas", "abrir la mano", "abriras tu mano"] },
        { id: "profetas", peso: 30, texto: "El culto sin justicia no agrada a Dios: el ayuno que él escogió es partir el pan con el hambriento.", formas: ["ayuno", "culto sin justicia", "hambriento*", "partir el pan", "partas tu pan", "corra el juicio"] },
      ],
      citas: ["Levítico 19:9-10", "Levítico 19:9", "Levítico 19:10", "Deuteronomio 15:11", "Deuteronomio 14:28-29", "Deuteronomio 15:1-2", "Isaías 58:6-7", "Isaías 58:7", "Amós 5:24", "Rut 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La ley mandaba dejar la espiga y los bordes del campo para el pobre (Levítico 19:9-10), guardar el diezmo del tercer año, perdonar las deudas en el año de remisión y prestar sin interés. Los profetas enseñaron que el culto sin justicia no agrada a Dios: el ayuno que él escogió es partir el pan con el hambriento.",
    },
    {
      id: "obra-social-1-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo se veía la compasión de Jesús y en qué se diferencia de la lástima.",
      ideas: [
        { id: "veia", peso: 30, texto: "Jesús veía a las personas y sentía compasión por dentro.", formas: ["vio", "veia", "al ver", "tuvo compasion", "sintio", "sentia", "se compadecio", "entranas"] },
        { id: "actuaba", peso: 30, texto: "Se acercaba, tocaba, sanaba, daba de comer y anunciaba el reino.", formas: ["se acercaba", "se acerco", "toco", "tocaba", "sanaba", "dio de comer", "daba de comer", "alimento", "anunciaba", "predicaba"] },
        { id: "lastima", peso: 30, texto: "La lástima mira de lejos; la compasión se acerca y acompaña con dignidad.", formas: ["de lejos", "acompana*", "dignidad", "humilla*", "pobrecito"] },
      ],
      citas: ["Mateo 9:36", "Lucas 4:18-19", "Lucas 4:18", "Lucas 7:13", "Marcos 1:41", "Mateo 14:14", "Mateo 9:35"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús veía a las multitudes desamparadas y tuvo compasión de ellas (Mateo 9:36). Su compasión se acercaba, tocaba al leproso, sanaba, daba de comer y anunciaba el reino. La lástima mira de lejos y humilla; la compasión se acerca, acompaña y trata a la persona con dignidad.",
    },
    {
      id: "obra-social-1-e4",
      tipo: "breve",
      pregunta:
        "Un hombre sin hogar duerme algunas noches en la entrada del templo, y unos hermanos quieren que lo saquen. Explica cómo responderías como enseña la parábola del buen samaritano, con citas bíblicas.",
      ideas: [
        { id: "acercarse", peso: 25, texto: "Acercarse, saludarlo por su nombre y escucharlo, sin desprecio.", formas: ["acercar*", "su nombre", "saludar*", "escuchar*", "lo escucharia"] },
        { id: "urgente", peso: 25, texto: "Cubrir lo urgente: comida, agua, una cobija, y orar con él si lo acepta.", formas: ["comida", "agua", "cobija", "frazada", "manta", "lo urgente", "algo de comer"] },
        { id: "conectar", peso: 25, texto: "Conectarlo con un albergue o una organización de la ciudad.", formas: ["albergue", "refugio", "organizacion", "servicios de la ciudad", "trabajador social"] },
        { id: "seguir", peso: 25, texto: "Seguir acompañándolo, con orden y seguridad, como el samaritano prometió volver.", formas: ["volver a verlo", "volveria", "seguir* acompan*", "en pareja", "dos voluntarios", "seguridad"] },
      ],
      basta: 85,
      citas: ["Lucas 10:33-34", "Lucas 10:33", "Lucas 10:34", "Lucas 10:35", "Lucas 10:36-37", "Lucas 10:37", "Mateo 25:40", "Mateo 25:35-36", "Gálatas 6:10"],
      pesoCita: 10,
      errores: [
        { id: "e4-sacarlo", anula: "acercarse", texto: "Sacarlo sin acercarse a él.", formas: ["lo sacaria", "lo echaria", "sacarlo de ahi", "echarlo de ahi"] },
      ],
      modelo:
        "Me acercaría a saludarlo, le preguntaría su nombre y lo escucharía sin prisa, porque el samaritano fue movido a misericordia y se acercó al herido (Lucas 10:33-34). Primero cubriría lo urgente: una comida caliente, agua y una cobija, y oraría con él si lo acepta. Después lo ayudaría a llegar a un albergue o a una organización de la ciudad que atiende a las personas sin hogar. Organizaría al equipo para servir con seguridad: dos voluntarios juntos, un horario y un responsable. Y seguiría acompañándolo, volviendo a verlo como el samaritano prometió volver, porque lo que hacemos al más pequeño se lo hacemos a Cristo (Mateo 25:40). A los hermanos les explicaría la parábola con amor, para que nadie pase de largo por miedo.",
    },
    {
      id: "obra-social-1-e5",
      tipo: "breve",
      pregunta:
        "En tu iglesia, varias hermanas mayores que viven solas se quejan de que nadie las visita, mientras otras reciben ayuda de sus amigos. Explica cómo lo resolverías siguiendo el ejemplo de la primera iglesia, con citas bíblicas.",
      ideas: [
        { id: "escuchar", peso: 25, texto: "Escuchar la queja sin defenderse y hacer la lista de las necesidades.", formas: ["escuchar*", "la queja", "sin defender*", "la lista", "hacer una lista"] },
        { id: "equipo", peso: 25, texto: "Escoger un equipo de buen testimonio, lleno del Espíritu y de sabiduría.", formas: ["buen testimonio", "un equipo", "siete", "llenos del espiritu", "lleno del espiritu", "encargad*"] },
        { id: "visitas", peso: 25, texto: "Repartir las visitas para que cada hermana tenga quien la llame y la visite.", formas: ["cada hermana", "las visitaria", "visitarlas", "turnos", "repartir* las visitas"] },
        { id: "fondo", peso: 25, texto: "Usar el fondo de ayuda con reglas claras e informar a la iglesia.", formas: ["fondo de ayuda", "reglas claras", "informar*", "transparen*", "cuentas claras"] },
      ],
      basta: 85,
      citas: ["Hechos 6:1-3", "Hechos 6:1", "Hechos 6:2", "Hechos 6:3", "Hechos 6:1-7", "Hechos 4:34-35", "Hechos 2:44-45", "Gálatas 6:10", "Santiago 1:27", "1 Timoteo 5:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero escucharía la queja sin defenderme, como los apóstoles atendieron la murmuración de los griegos por sus viudas (Hechos 6:1). Haría la lista de las hermanas mayores que viven solas y de lo que necesita cada una. Después, con el pastor, escogeríamos un equipo de buen testimonio, lleno del Espíritu Santo y de sabiduría, para atenderlas, como en Hechos 6:3. Repartiríamos las visitas para que cada hermana tenga a alguien que la llame cada semana y la visite, porque visitar a las viudas en sus tribulaciones es religión pura (Santiago 1:27). Las necesidades que el equipo encuentre se cubrirían con el fondo de ayuda de la iglesia, con reglas claras, y le informaríamos a la iglesia lo que se hace, para que nadie quede olvidado y la palabra siga creciendo.",
    },
  ],
  breve: {
    id: "obra-social-1-b1",
    tipo: "breve",
    pregunta: "Escribe cómo viviría tu iglesia la compasión de Dios en el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "ver", peso: 15, texto: "Ver a los necesitados como Dios: el huérfano, la viuda, el extranjero y el pobre, con su nombre.", formas: ["huerfano*", "viuda*", "extranjero*", "con su nombre", "imagen de dios"] },
      { id: "ley", peso: 15, texto: "La espiga: abrir oportunidades con dignidad.", formas: ["espiga*", "dignidad", "oportunidad*", "abrir la mano"] },
      { id: "jesus", peso: 20, texto: "Acercarse con compasión, como Jesús y el buen samaritano.", formas: ["compasion", "samaritano", "acercar*", "projimo"] },
      { id: "iglesia", peso: 20, texto: "Organizar la ayuda como la primera iglesia: un equipo, un fondo con reglas y cuentas claras.", formas: ["fondo de ayuda", "un equipo", "buen testimonio", "transparen*", "reglas claras"] },
      { id: "integral", peso: 15, texto: "Unir la palabra y la obra, sin condicionar la ayuda.", formas: ["evangelio", "la palabra y la obra", "mision integral", "de hecho y en verdad"] },
      { id: "sin_dano", peso: 15, texto: "Ayudar sin hacer daño: el alivio, la rehabilitación y el desarrollo.", formas: ["alivio", "rehabilitacion", "desarrollo", "sin hacer dano"] },
    ],
    basta: 85,
    citas: ["Lucas 6:36", "Éxodo 3:7", "Deuteronomio 10:18", "Salmos 146:9", "Levítico 19:9-10", "Deuteronomio 15:11", "Isaías 58:6-7", "Mateo 9:36", "Lucas 4:18-19", "Lucas 7:13", "Lucas 10:33-34", "Lucas 10:36-37", "Mateo 25:40", "Gálatas 6:10", "Hechos 4:34-35", "Hechos 6:1-3", "Gálatas 2:10", "2 Corintios 8:13-14", "Santiago 2:15-17", "1 Juan 3:17-18", "Efesios 2:10"],
    pesoCita: 10,
    errores: [],
    modelo:
      "El próximo año le pediríamos a Dios ojos para ver como él ve, porque él vio la aflicción de su pueblo (Éxodo 3:7): haríamos el mapa del barrio, con el huérfano, la viuda, el extranjero y el pobre, cada uno con su nombre. Ayudaríamos como enseña la ley, abriendo espigas: clases, una bolsa de trabajo y oportunidades para salir adelante con dignidad (Levítico 19:9-10). Nos acercaríamos con compasión, como Jesús y como el buen samaritano, que se detuvo ante el herido (Lucas 10:33-34). Organizaríamos la ayuda como la primera iglesia: un equipo de buen testimonio y un fondo de ayuda con reglas claras y cuentas transparentes, para que nadie quede olvidado (Hechos 6:1-3). Uniríamos la palabra y la obra, amando de hecho y en verdad (1 Juan 3:18), y ofreceríamos el evangelio con respeto, sin condicionar la ayuda. Y antes de cada ayuda nos preguntaríamos si es una crisis, para dar alivio, o si hace falta la rehabilitación o el desarrollo, para no crear dependencia. Así seríamos misericordiosos, como también nuestro Padre es misericordioso (Lucas 6:36).",
  },
};
