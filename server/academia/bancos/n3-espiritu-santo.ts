/**
 * El banco de «La persona y obra del Espíritu Santo» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 una persona divina · o2 el Espíritu en el Antiguo Testamento y en Jesús · o3 el Espíritu en la salvación ·
 * o4 el bautismo en el Espíritu Santo · o5 los dones y el fruto · o6 andar en el Espíritu · o7 el versículo de memoria
 * (Zacarías 4:6). Sobre las lenguas como señal, las preguntas solo piden reconocer las posiciones, nunca elegir una.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-espiritu-santo-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_ESPIRITU_SANTO: BancoMateria = {
  materia: "n3-espiritu-santo",
  repaso: {
    "n3-espiritu-santo-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo llama Jesús al Espíritu Santo en Juan 14:16?", "Otro Consolador", ["Una fuerza", "Un ángel", "Un profeta"], "«y os dará otro Consolador, para que esté con vosotros para siempre».", "Juan 14:16-17"],
      ["1-r2", 1, "o1", "comprender", "¿Qué muestra Efesios 4:30 sobre el Espíritu Santo?", "Que es una persona, porque puede ser entristecido", ["Que es una energía", "Que no siente nada", "Que es un sentimiento humano"], "«Y no contristéis al Espíritu Santo de Dios».", "Efesios 4:30"],
      ["1-r3", 1, "o1", "aplicar", "Alguien dice que el Espíritu Santo es solo el poder de Dios. ¿Qué responde Hechos 5:3-4?", "Que mentirle al Espíritu Santo es mentirle a Dios, porque el Espíritu es Dios", ["Que tiene razón", "Que el Espíritu es un ángel", "Que no se le puede mentir a nadie"], "«No has mentido a los hombres, sino a Dios».", "Hechos 5:3-4"],
    ] as P[]).map(p),
    "n3-espiritu-santo-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hacía el Espíritu de Dios en la creación, según Génesis 1:2?", "Se movía sobre la faz de las aguas", ["Descansaba", "Destruía la tierra", "No estaba"], "«y el Espíritu de Dios se movía sobre la faz de las aguas».", "Génesis 1:2"],
      ["2-r2", 2, "o2", "comprender", "¿Qué prometió Dios por medio de Joel?", "Derramar su Espíritu sobre toda carne", ["Dar el Espíritu solo a los reyes", "Quitar el Espíritu de Israel", "Enviar un ejército"], "«derramaré mi Espíritu sobre toda carne».", "Joel 2:28-29"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué enseña Hechos 10:38 al obrero sobre el servicio?", "Que si Jesús sirvió ungido con el Espíritu y con poder, el obrero no puede servir con sus propias fuerzas", ["Que el poder no importa", "Que Jesús sirvió sin el Espíritu", "Que el servicio depende del talento"], "«cómo Dios ungió con el Espíritu Santo y con poder a Jesús de Nazaret».", "Hechos 10:38"],
    ] as P[]).map(p),
    "n3-espiritu-santo-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Por qué medio nos salvó Dios, según Tito 3:5?", "Por el lavamiento de la regeneración y la renovación en el Espíritu Santo", ["Por obras de justicia", "Por la ley", "Por nuestro esfuerzo"], "«por el lavamiento de la regeneración y por la renovación en el Espíritu Santo».", "Tito 3:5"],
      ["3-r2", 3, "o3", "comprender", "¿Qué dice Romanos 8:9 del que no tiene el Espíritu de Cristo?", "Que no es de él", ["Que es un creyente débil", "Que es un nuevo creyente", "Que no importa"], "«Y si alguno no tiene el Espíritu de Cristo, no es de él».", "Romanos 8:9"],
      ["3-r3", 3, "o3", "aplicar", "Un creyente duda de que sea hijo de Dios. ¿Qué consuelo da Romanos 8:16?", "Que el Espíritu mismo da testimonio a su espíritu de que es hijo de Dios", ["Que debe esperar a sentirlo", "Que nadie puede saberlo", "Que depende de sus obras"], "«El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».", "Romanos 8:14-16"],
    ] as P[]).map(p),
    "n3-espiritu-santo-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué mandó Jesús esperar a los discípulos en Hechos 1:4?", "La promesa del Padre", ["El regreso de Juan el Bautista", "Una señal en el cielo", "Un nuevo templo"], "«que esperasen la promesa del Padre».", "Hechos 1:4-5"],
      ["4-r2", 4, "o4", "comprender", "¿Qué muestra el relato de Samaria en Hechos 8?", "Que habían creído y sido bautizados, pero aún no habían recibido el Espíritu", ["Que no habían creído", "Que el bautismo en agua es el Espíritu", "Que el Espíritu no vino nunca"], "«porque aún no había descendido sobre ninguno de ellos».", "Hechos 8:14-17"],
      ["4-r3", 4, "o4", "aplicar", "Un joven quiere recibir el bautismo en el Espíritu. ¿Qué le enseña Lucas 11:13?", "Que lo pida con fe al Padre, que da el Espíritu a los que se lo piden", ["Que debe ganarlo con obras", "Que ya no es para hoy", "Que solo lo reciben los pastores"], "«¿cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?».", "Lucas 11:13"],
    ] as P[]).map(p),
    "n3-espiritu-santo-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué es el que habla en lenguas sin amor, según 1 Corintios 13:1?", "Como metal que resuena, o címbalo que retiñe", ["Un gran profeta", "Un sabio", "Un buen líder"], "«vengo a ser como metal que resuena, o címbalo que retiñe».", "1 Corintios 13:1-2"],
      ["5-r2", 5, "o5", "comprender", "¿Qué es el fruto del Espíritu, según la lección?", "El carácter de Cristo que el Espíritu forma en el creyente", ["Un don para unos pocos", "Un premio por servir", "Una manifestación pública"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia».", "Gálatas 5:22-25"],
      ["5-r3", 5, "o5", "aplicar", "Un obrero tiene dones visibles, pero trata mal a los demás. ¿Qué enseña la lección?", "Que es una señal de alarma: el ministerio se evalúa por el fruto, no solo por los dones", ["Que no importa si tiene dones", "Que los dones prueban su madurez", "Que debe dejar de servir para siempre"], "«y no tengo amor, nada soy».", "1 Corintios 13:1-2"],
    ] as P[]).map(p),
    "n3-espiritu-santo-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué manda Pablo en Efesios 5:18?", "Sed llenos del Espíritu", ["Sed ricos", "Sed famosos", "Sed fuertes en vosotros mismos"], "«antes bien sed llenos del Espíritu».", "Efesios 5:18"],
      ["6-r2", 6, "o6", "comprender", "¿Qué hizo el Espíritu con los planes de Pablo en Hechos 16:6-7?", "Le impidió hablar en Asia e ir a Bitinia, porque lo llevaba a otro lugar", ["Los aprobó todos", "No intervino", "Le mandó volver a casa"], "«les fue prohibido por el Espíritu Santo hablar la palabra en Asia».", "Hechos 16:6-7"],
      ["6-r3", 6, "o6", "aplicar", "¿Cómo vence el creyente los deseos de la carne, según Gálatas 5:16?", "Andando en el Espíritu", ["Con su solo esfuerzo", "Ignorándolos", "Alejándose de la iglesia"], "«Andad en el Espíritu, y no satisfagáis los deseos de la carne».", "Gálatas 5:16-17"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Una persona divina
    ["f01", 1, "o1", "recordar", "¿Qué le dijo Dios a Zorobabel, según Zacarías 4:6?", "No con ejército, ni con fuerza, sino con mi Espíritu", ["Con ejército y con fuerza", "Solo con dinero", "Con la ayuda de los reyes"], "«No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos».", "Zacarías 4:6"],
    ["f02", 1, "o1", "comprender", "¿Qué muestra que Jesús llame al Espíritu otro Consolador?", "Que el Espíritu es alguien como él, una persona", ["Que es una fuerza", "Que es inferior a los ángeles", "Que es un recuerdo de Jesús"], "«y os dará otro Consolador».", "Juan 14:16-17"],
    ["f03", 1, "o1", "recordar", "¿Dónde mora el Espíritu, según Juan 14:17?", "Con los discípulos y en ellos", ["Solo en el templo", "Solo en el cielo", "En los lugares sagrados"], "«porque mora con vosotros, y estará en vosotros».", "Juan 14:16-17"],
    ["f04", 1, "o1", "recordar", "¿A qué guía el Espíritu de verdad, según Juan 16:13?", "A toda la verdad", ["A la riqueza", "A nuevas escrituras", "A la fama"], "«él os guiará a toda la verdad».", "Juan 16:13-14"],
    ["f05", 1, "o1", "comprender", "¿A quién glorifica el Espíritu, según Juan 16:14?", "A Cristo", ["A sí mismo", "Al creyente", "A la iglesia"], "«El me glorificará; porque tomará de lo mío, y os lo hará saber».", "Juan 16:13-14"],
    ["f06", 1, "o1", "analizar", "¿Qué muestra 1 Corintios 12:11 sobre el Espíritu?", "Que tiene voluntad: reparte los dones como él quiere", ["Que reparte los dones al azar", "Que no tiene voluntad", "Que los dones los decide el creyente"], "«repartiendo a cada uno en particular como él quiere».", "1 Corintios 12:11"],
    ["f07", 1, "o1", "analizar", "¿Por qué Hechos 5:3-4 muestra que el Espíritu es Dios?", "Porque mentirle al Espíritu Santo es mentirle a Dios", ["Porque Ananías era sacerdote", "Porque Pedro era apóstol", "Porque el dinero era del templo"], "«No has mentido a los hombres, sino a Dios».", "Hechos 5:3-4"],
    ["f08", 1, "o1", "recordar", "¿Cómo llama Hebreos 9:14 al Espíritu?", "El Espíritu eterno", ["El espíritu humano", "El espíritu del templo", "Un espíritu creado"], "«el cual mediante el Espíritu eterno se ofreció a sí mismo sin mancha a Dios».", "Hebreos 9:14"],
    ["f09", 1, "o1", "evaluar", "¿Cuál de estas frases describe mejor al Espíritu Santo?", "Una persona divina, igual al Padre y al Hijo", ["Una energía de Dios", "Un ángel poderoso", "Un sentimiento del creyente"], "«Y no contristéis al Espíritu Santo de Dios».", "Efesios 4:30"],
    ["f10", 1, "o7", "recordar", "Completa Zacarías 4:6: No con ejército, ni con fuerza…", "sino con mi Espíritu, ha dicho Jehová de los ejércitos", ["sino con oro y plata, ha dicho el rey", "sino con muchos soldados, ha dicho Zorobabel", "sino con sabiduría humana, ha dicho el profeta"], "«No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos».", "Zacarías 4:6"],
    // Lección 2 · El Espíritu en el Antiguo Testamento y en Jesús
    ["f11", 2, "o2", "recordar", "¿Qué pasó desde el día en que Samuel ungió a David?", "El Espíritu de Jehová vino sobre David", ["David dejó de ser pastor", "David se fue a Egipto", "El Espíritu se apartó de David"], "«y desde aquel día en adelante el Espíritu de Jehová vino sobre David».", "1 Samuel 16:13"],
    ["f12", 2, "o2", "comprender", "¿Cómo obraba el Espíritu en el Antiguo Testamento, según la lección?", "Venía sobre algunas personas para una tarea", ["Vivía en todo el pueblo", "No obraba", "Solo obraba en los sacerdotes"], "«y desde aquel día en adelante el Espíritu de Jehová vino sobre David».", "1 Samuel 16:13"],
    ["f13", 2, "o2", "recordar", "¿Qué prometió Dios por medio de Ezequiel?", "Poner su Espíritu dentro de su pueblo para que anduviera en sus estatutos", ["Destruir a su pueblo", "Darles un rey extranjero", "Quitarles la ley"], "«Y pondré dentro de vosotros mi Espíritu, y haré que andéis en mis estatutos».", "Ezequiel 36:26-27"],
    ["f14", 2, "o2", "analizar", "¿Qué tenía de nuevo la promesa de Joel?", "Que el Espíritu sería para todo el pueblo: hijos e hijas, jóvenes y ancianos, siervos y siervas", ["Que sería solo para los reyes", "Que sería solo para los profetas", "Que ya no habría Espíritu"], "«Y también sobre los siervos y sobre las siervas derramaré mi Espíritu en aquellos días».", "Joel 2:28-29"],
    ["f15", 2, "o2", "recordar", "¿Qué le dijo el ángel a María en Lucas 1:35?", "El Espíritu Santo vendrá sobre ti, y el poder del Altísimo te cubrirá con su sombra", ["Que José sería el padre", "Que debía irse a Egipto", "Que el niño sería un profeta más"], "«El Espíritu Santo vendrá sobre ti, y el poder del Altísimo te cubrirá con su sombra».", "Lucas 1:35"],
    ["f16", 2, "o2", "recordar", "¿Qué hacía Jesús cuando descendió el Espíritu sobre él en su bautismo?", "Oraba", ["Predicaba", "Dormía", "Comía"], "«y orando, el cielo se abrió».", "Lucas 3:21-22"],
    ["f17", 2, "o2", "recordar", "¿Cómo volvió Jesús del Jordán, según Lucas 4:1?", "Lleno del Espíritu Santo", ["Cansado y sin fuerzas", "Solo", "Con miedo"], "«Jesús, lleno del Espíritu Santo, volvió del Jordán».", "Lucas 4:1"],
    ["f18", 2, "o2", "comprender", "¿Para qué fue ungido Jesús, según Lucas 4:18?", "Para dar buenas nuevas a los pobres y sanar a los quebrantados de corazón", ["Para ser rey de Roma", "Para condenar al mundo", "Para hacerse rico"], "«Por cuanto me ha ungido para dar buenas nuevas a los pobres».", "Lucas 4:18"],
    ["f19", 2, "o2", "recordar", "¿Qué hizo Jesús, ungido con el Espíritu y con poder, según Hechos 10:38?", "Anduvo haciendo bienes y sanando a todos los oprimidos por el diablo", ["Se quedó en el templo", "Reunió un ejército", "Escribió libros"], "«y cómo éste anduvo haciendo bienes y sanando a todos los oprimidos por el diablo».", "Hechos 10:38"],
    ["f20", 2, "o2", "evaluar", "¿Qué lección deja al obrero la vida de Jesús en el Espíritu?", "Que no puede servir con sus propias fuerzas, sino en el poder del Espíritu", ["Que el talento basta", "Que el Espíritu era solo para Jesús", "Que el poder no importa"], "«porque Dios estaba con él».", "Hechos 10:38"],
    // Lección 3 · El Espíritu en la salvación
    ["f21", 3, "o3", "recordar", "¿De qué convence el Espíritu al mundo, según Juan 16:8?", "De pecado, de justicia y de juicio", ["De riqueza", "De fama", "De nada"], "«convencerá al mundo de pecado, de justicia y de juicio».", "Juan 16:8"],
    ["f22", 3, "o3", "aplicar", "¿Por qué ora el obrero antes de evangelizar, según la lección?", "Porque la convicción de pecado la produce el Espíritu", ["Porque así lo manda la tradición", "Porque así convence mejor con argumentos", "Porque es una costumbre"], "«Y cuando él venga, convencerá al mundo de pecado».", "Juan 16:8"],
    ["f23", 3, "o3", "recordar", "¿Qué necesita una persona para entrar en el reino de Dios, según Juan 3:5?", "Nacer de agua y del Espíritu", ["Nacer en Israel", "Ser buena persona", "Ir al templo"], "«el que no naciere de agua y del Espíritu, no puede entrar en el reino de Dios».", "Juan 3:5-6"],
    ["f24", 3, "o3", "comprender", "¿Por qué nos salvó Dios, según Tito 3:5?", "Por su misericordia, no por obras de justicia que hubiéramos hecho", ["Por nuestras obras", "Por nuestra fama", "Por nuestro linaje"], "«nos salvó, no por obras de justicia que nosotros hubiéramos hecho, sino por su misericordia».", "Tito 3:5"],
    ["f25", 3, "o3", "recordar", "¿Quiénes son hijos de Dios, según Romanos 8:14?", "Los que son guiados por el Espíritu de Dios", ["Los que nacen en una familia cristiana", "Los que tienen más dones", "Los que nunca dudan"], "«Porque todos los que son guiados por el Espíritu de Dios, éstos son hijos de Dios».", "Romanos 8:14-16"],
    ["f26", 3, "o3", "comprender", "¿Qué espíritu recibimos, según Romanos 8:15?", "El espíritu de adopción, por el cual clamamos: Abba, Padre", ["El espíritu de esclavitud", "El espíritu del temor", "Un espíritu de duda"], "«sino que habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre!».", "Romanos 8:14-16"],
    ["f27", 3, "o3", "recordar", "¿Con qué fueron sellados los que creyeron, según Efesios 1:13?", "Con el Espíritu Santo de la promesa", ["Con aceite", "Con una marca en la frente", "Con agua"], "«fuisteis sellados con el Espíritu Santo de la promesa».", "Efesios 1:13-14"],
    ["f28", 3, "o3", "analizar", "¿Qué significa que el Espíritu sea las arras de nuestra herencia?", "Que es el adelanto y la garantía de lo que vendrá", ["Que la herencia ya terminó", "Que la herencia es dinero", "Que no hay herencia"], "«que es las arras de nuestra herencia hasta la redención de la posesión adquirida».", "Efesios 1:13-14"],
    ["f29", 3, "o3", "comprender", "¿Qué hace el Espíritu según 1 Corintios 12:13?", "Une a todos los creyentes en un solo cuerpo", ["Separa a los creyentes por razas", "Da poder solo a los líderes", "Reemplaza a la iglesia"], "«Porque por un solo Espíritu fuimos todos bautizados en un cuerpo».", "1 Corintios 12:13"],
    ["f30", 3, "o3", "analizar", "¿Qué distingue la tradición pentecostal en la obra del Espíritu, según la lección?", "La obra del Espíritu en la salvación, que es para todo creyente, del bautismo en el Espíritu para recibir poder", ["Que el Espíritu no vive en todos los creyentes", "Que la salvación es por obras", "Que el bautismo en agua es el Espíritu"], "«Porque por un solo Espíritu fuimos todos bautizados en un cuerpo».", "1 Corintios 12:13"],
    // Lección 4 · El bautismo en el Espíritu Santo
    ["f31", 4, "o4", "recordar", "¿Qué dijo Jesús en Hechos 1:5?", "Vosotros seréis bautizados con el Espíritu Santo dentro de no muchos días", ["Vosotros seréis bautizados en el Jordán", "Ya no habrá bautismo", "Esperad mil años"], "«mas vosotros seréis bautizados con el Espíritu Santo dentro de no muchos días».", "Hechos 1:4-5"],
    ["f32", 4, "o4", "comprender", "¿Qué tenían ya los discípulos antes de Pentecostés, según la lección?", "La fe en Jesús, pero todavía tenían que recibir la promesa", ["Nada", "El bautismo en el Espíritu", "Todos los dones"], "«que esperasen la promesa del Padre».", "Hechos 1:4-5"],
    ["f33", 4, "o4", "recordar", "¿Qué pasó en Pentecostés, según Hechos 2:4?", "Fueron todos llenos del Espíritu Santo y comenzaron a hablar en otras lenguas", ["Se fueron a sus casas", "Discutieron", "Durmieron"], "«Y fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas».", "Hechos 2:1-4"],
    ["f34", 4, "o4", "comprender", "¿Para qué es el bautismo en el Espíritu, según la lección?", "Para recibir poder y ser testigos de Cristo", ["Para salvarse", "Para ser famoso", "Para reemplazar la Biblia"], "«Y fueron todos llenos del Espíritu Santo».", "Hechos 2:1-4"],
    ["f35", 4, "o4", "recordar", "¿Qué hicieron Pedro y Juan en Samaria para que recibieran el Espíritu?", "Oraron por ellos y les impusieron las manos", ["Los bautizaron otra vez en agua", "Les cobraron dinero", "Los enviaron a Jerusalén"], "«Entonces les imponían las manos, y recibían el Espíritu Santo».", "Hechos 8:14-17"],
    ["f36", 4, "o4", "recordar", "¿Qué preguntó Pablo a los discípulos de Éfeso?", "¿Recibisteis el Espíritu Santo cuando creísteis?", ["¿Quién es vuestro maestro?", "¿Cuánto ofrendáis?", "¿Dónde está vuestro templo?"], "«¿Recibisteis el Espíritu Santo cuando creísteis?».", "Hechos 19:1-6"],
    ["f37", 4, "o4", "recordar", "¿Qué pasó cuando Pablo impuso las manos a los de Éfeso?", "Vino sobre ellos el Espíritu Santo; y hablaban en lenguas, y profetizaban", ["No pasó nada", "Se enfermaron", "Se fueron de la ciudad"], "«vino sobre ellos el Espíritu Santo; y hablaban en lenguas, y profetizaban».", "Hechos 19:1-6"],
    ["f38", 4, "o4", "analizar", "¿Por qué la declaración de fe enseña que el bautismo en el Espíritu es distinto del nuevo nacimiento?", "Porque en Hechos hubo creyentes que recibieron el Espíritu después de creer, como en Samaria y Éfeso", ["Porque el nuevo nacimiento no existe", "Porque solo los apóstoles lo recibieron", "Porque así lo decidió un concilio"], "«porque aún no había descendido sobre ninguno de ellos, sino que solamente habían sido bautizados en el nombre de Jesús».", "Hechos 8:14-17"],
    ["f39", 4, "o4", "aplicar", "¿Cómo se recibe el bautismo en el Espíritu, según la lección?", "Con fe, pidiéndolo al Padre con un corazón dispuesto", ["Ganándolo con obras", "Comprándolo", "Esperando sin pedir"], "«¿cuánto más vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?».", "Lucas 11:13"],
    ["f40", 4, "o4", "evaluar", "¿Cuáles son las dos posiciones pentecostales sobre las lenguas, según la nota de la lección?", "Que son la señal inicial y necesaria del bautismo en el Espíritu, o una manifestación que se espera sin ser la única señal", ["Que están prohibidas o que son obligatorias para salvarse", "Que son solo para los apóstoles o solo para los pastores", "Que son un idioma aprendido o una emoción"], "«¿hablan todos lenguas? ¿interpretan todos?».", "1 Corintios 12:30"],
    // Lección 5 · Los dones y el fruto
    ["f41", 5, "o5", "recordar", "¿Quién hace todos los dones, según 1 Corintios 12:11?", "Uno y el mismo Espíritu", ["Cada creyente por su cuenta", "Los pastores", "Los ángeles"], "«Pero todas estas cosas las hace uno y el mismo Espíritu».", "1 Corintios 12:11"],
    ["f42", 5, "o5", "comprender", "¿Qué enseña que los dones sean del Espíritu y no del creyente?", "Que nadie tiene de qué gloriarse", ["Que el creyente puede presumir", "Que los dones se compran", "Que todos tienen los mismos dones"], "«repartiendo a cada uno en particular como él quiere».", "1 Corintios 12:11"],
    ["f43", 5, "o5", "recordar", "¿Qué es el que tiene toda la fe para trasladar montes, si no tiene amor, según 1 Corintios 13:2?", "Nada", ["Un apóstol", "Un gran líder", "Un hombre de fe"], "«de tal manera que trasladase los montes, y no tengo amor, nada soy».", "1 Corintios 13:1-2"],
    ["f44", 5, "o5", "comprender", "¿Qué orden da 1 Corintios 14:1?", "Seguir el amor y procurar los dones espirituales", ["Seguir los dones y olvidar el amor", "No procurar ningún don", "Procurar solo las lenguas"], "«Seguid el amor; y procurad los dones espirituales».", "1 Corintios 14:1"],
    ["f45", 5, "o5", "recordar", "¿Cuál es el fruto del Espíritu, según Gálatas 5:22-23?", "Amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre y templanza", ["Lenguas, profecía y sanidad", "Riqueza, fama y poder", "Ayuno, oración y ofrenda"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe».", "Gálatas 5:22-25"],
    ["f46", 5, "o5", "analizar", "¿Qué significa que Gálatas diga fruto, en singular?", "Que no se escoge una parte: todo crece junto", ["Que solo hay una virtud", "Que es solo para unos pocos", "Que es un error de traducción"], "«Mas el fruto del Espíritu es amor».", "Gálatas 5:22-25"],
    ["f47", 5, "o5", "analizar", "¿En qué se diferencian los dones y el fruto, según la lección?", "Los dones son lo que el Espíritu hace por medio del creyente; el fruto, lo que hace en él", ["No se diferencian", "Los dones crecen y el fruto se recibe de golpe", "El fruto es para el público y los dones para el creyente"], "«contra tales cosas no hay ley».", "Gálatas 5:22-25"],
    ["f48", 5, "o5", "recordar", "¿Qué han hecho con la carne los que son de Cristo, según Gálatas 5:24?", "La han crucificado con sus pasiones y deseos", ["La han satisfecho", "La han ignorado", "La han fortalecido"], "«Pero los que son de Cristo han crucificado la carne con sus pasiones y deseos».", "Gálatas 5:22-25"],
    ["f49", 5, "o5", "aplicar", "¿Cómo debe valorar la iglesia a sus obreros, según la nota de la lección?", "Por su carácter, no solo por lo que pueden hacer en público", ["Solo por sus dones", "Por su fama", "Por sus estudios"], "«Seguid el amor».", "1 Corintios 14:1"],
    ["f50", 5, "o5", "evaluar", "¿Cuál de estos obreros muestra mejor la obra del Espíritu?", "El que sirve con sus dones y muestra amor, paciencia y templanza", ["El que tiene dones visibles y trata mal a los demás", "El que no tiene ningún fruto", "El que busca ser visto"], "«y no tengo amor, vengo a ser como metal que resuena».", "1 Corintios 13:1-2"],
    // Lección 6 · Andar en el Espíritu
    ["f51", 6, "o6", "recordar", "¿Qué se oponen entre sí, según Gálatas 5:17?", "El deseo de la carne y el del Espíritu", ["La fe y la razón", "El cuerpo y el alma", "La iglesia y el mundo"], "«Porque el deseo de la carne es contra el Espíritu, y el del Espíritu es contra la carne».", "Gálatas 5:16-17"],
    ["f52", 6, "o6", "comprender", "¿Qué pasa si por el Espíritu se hacen morir las obras de la carne, según Romanos 8:13?", "Viviréis", ["Moriréis", "Nada", "Sufriréis más"], "«mas si por el Espíritu hacéis morir las obras de la carne, viviréis».", "Romanos 8:13"],
    ["f53", 6, "o6", "comprender", "¿Qué clase de mandato es sed llenos del Espíritu, según la lección?", "Un mandato para todos los días, no una experiencia de una sola vez", ["Una experiencia de una sola vez", "Un mandato solo para pastores", "Una sugerencia sin importancia"], "«antes bien sed llenos del Espíritu».", "Efesios 5:18"],
    ["f54", 6, "o6", "recordar", "¿Con qué contrasta Efesios 5:18 la llenura del Espíritu?", "Con embriagarse con vino", ["Con ayunar", "Con orar", "Con cantar"], "«No os embriaguéis con vino, en lo cual hay disolución».", "Efesios 5:18"],
    ["f55", 6, "o6", "recordar", "¿Qué no permitió el Espíritu a Pablo cuando intentó ir a Bitinia?", "Ir allí", ["Predicar en ningún lugar", "Orar", "Escribir cartas"], "«intentaron ir a Bitinia, pero el Espíritu no se lo permitió».", "Hechos 16:6-7"],
    ["f56", 6, "o6", "aplicar", "¿Qué aprende el obrero de Hechos 16:6-7 sobre sus planes?", "A planificar y orar, dispuesto a que el Espíritu cambie sus planes", ["A no planificar nunca", "A no cambiar nunca sus planes", "A ignorar al Espíritu"], "«les fue prohibido por el Espíritu Santo hablar la palabra en Asia».", "Hechos 16:6-7"],
    ["f57", 6, "o6", "comprender", "¿Qué entristece al Espíritu, según el pasaje de Efesios 4?", "La mentira, el enojo que no se resuelve y las palabras que hieren", ["La oración", "El servicio", "La alegría"], "«Y no contristéis al Espíritu Santo de Dios».", "Efesios 4:30"],
    ["f58", 6, "o6", "recordar", "¿Qué correrá del interior del que cree, según Juan 7:38?", "Ríos de agua viva", ["Riquezas", "Miedo", "Palabras vanas"], "«de su interior correrán ríos de agua viva».", "Juan 7:37-39"],
    ["f59", 6, "o6", "comprender", "¿De qué hablaba Jesús con los ríos de agua viva, según Juan 7:39?", "Del Espíritu que habían de recibir los que creyesen en él", ["Del río Jordán", "Del bautismo en agua", "De la lluvia"], "«Esto dijo del Espíritu que habían de recibir los que creyesen en él».", "Juan 7:37-39"],
    ["f60", 6, "o6", "evaluar", "¿Cómo busca el obrero el avivamiento, según el artículo 15 de la declaración de fe?", "Con oración, arrepentimiento y obediencia a la Palabra", ["Con espectáculo y emociones", "Con publicidad", "Esperando sin hacer nada"], "«El que cree en mí, como dice la Escritura, de su interior correrán ríos de agua viva».", "Juan 7:37-39"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿A quién no puede recibir el mundo, según Juan 14:17?", "Al Espíritu de verdad", ["A los ángeles", "A los profetas", "A los reyes"], "«el Espíritu de verdad, al cual el mundo no puede recibir».", "Juan 14:16-17"],
      ["m1-02", 1, "o1", "comprender", "¿Qué tiene que ver que el Espíritu tenga voluntad con que sea una persona?", "Que solo una persona decide y reparte como quiere", ["Nada", "Que es una máquina", "Que obedece al creyente"], "«repartiendo a cada uno en particular como él quiere».", "1 Corintios 12:11"],
      ["m1-03", 1, "o1", "recordar", "¿A quién le mintió Ananías, según Pedro?", "Al Espíritu Santo, es decir, a Dios", ["Solo a los apóstoles", "A su esposa", "A los pobres"], "«para que mintieses al Espíritu Santo».", "Hechos 5:3-4"],
      ["m1-04", 1, "o1", "aplicar", "¿Cómo se relaciona el obrero con el Espíritu, según la lección?", "Como con una persona a la que conoce y obedece", ["Como con una fuerza que usa", "Como con un recuerdo", "Como con una costumbre"], "«pero vosotros le conocéis».", "Juan 14:16-17"],
      ["m1-05", 1, "o1", "comprender", "¿Para cuánto tiempo prometió Jesús al Consolador?", "Para siempre", ["Para un año", "Para los apóstoles nada más", "Hasta el fin del primer siglo"], "«para que esté con vosotros para siempre».", "Juan 14:16-17"],
      ["m1-06", 1, "o1", "analizar", "¿Qué tienen en común Juan 16:14 y la obra del Espíritu?", "Que el Espíritu no se glorifica a sí mismo: glorifica a Cristo", ["Que el Espíritu busca su propia gloria", "Que el Espíritu glorifica al creyente", "Que el Espíritu no habla de Cristo"], "«El me glorificará».", "Juan 16:13-14"],
      ["m1-07", 2, "o2", "recordar", "¿Cómo estaba la tierra cuando el Espíritu se movía sobre las aguas, según Génesis 1:2?", "Desordenada y vacía", ["Llena de ciudades", "Llena de animales", "Perfecta"], "«Y la tierra estaba desordenada y vacía».", "Génesis 1:2"],
      ["m1-08", 2, "o2", "comprender", "¿Qué corazón promete Dios en Ezequiel 36:26?", "Un corazón nuevo, de carne", ["Un corazón de piedra", "Un corazón cansado", "Ningún corazón"], "«Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros».", "Ezequiel 36:26-27"],
      ["m1-09", 2, "o2", "recordar", "¿Quiénes profetizarán, según Joel 2:28?", "Vuestros hijos y vuestras hijas", ["Solo los sacerdotes", "Solo los ancianos", "Nadie"], "«y profetizarán vuestros hijos y vuestras hijas».", "Joel 2:28-29"],
      ["m1-10", 2, "o2", "recordar", "¿En qué forma descendió el Espíritu sobre Jesús en su bautismo?", "En forma corporal, como paloma", ["Como fuego", "Como viento", "Como una nube"], "«y descendió el Espíritu Santo sobre él en forma corporal, como paloma».", "Lucas 3:21-22"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué muestra al obrero que Jesús orara cuando recibió el Espíritu?", "Que la oración y el Espíritu van juntos en el ministerio", ["Que no hace falta orar", "Que el Espíritu no tiene que ver con la oración", "Que solo Jesús podía orar"], "«y orando, el cielo se abrió».", "Lucas 3:21-22"],
      ["m1-12", 2, "o2", "analizar", "¿Qué diferencia hay entre el Espíritu en el Antiguo Testamento y la promesa de Joel?", "Antes venía sobre algunos para una tarea; la promesa era para todo el pueblo", ["No hay diferencia", "En el Antiguo Testamento no había Espíritu", "La promesa era solo para los reyes"], "«derramaré mi Espíritu sobre toda carne».", "Joel 2:28-29"],
      ["m1-13", 3, "o3", "recordar", "¿Qué es lo nacido del Espíritu, según Juan 3:6?", "Espíritu", ["Carne", "Agua", "Ley"], "«y lo que es nacido del Espíritu, espíritu es».", "Juan 3:5-6"],
      ["m1-14", 3, "o3", "comprender", "¿Qué significa la regeneración de Tito 3:5?", "El nuevo nacimiento que obra el Espíritu Santo", ["Un nuevo esfuerzo humano", "Un bautismo en agua solamente", "Una mejora de la vida vieja"], "«por el lavamiento de la regeneración y por la renovación en el Espíritu Santo».", "Tito 3:5"],
      ["m1-15", 3, "o3", "recordar", "¿Qué no hemos recibido, según Romanos 8:15?", "El espíritu de esclavitud para estar otra vez en temor", ["El espíritu de adopción", "El Espíritu Santo", "La salvación"], "«Pues no habéis recibido el espíritu de esclavitud para estar otra vez en temor».", "Romanos 8:14-16"],
      ["m1-16", 3, "o3", "aplicar", "Un nuevo creyente piensa que el Espíritu solo vive en los pastores. ¿Qué le enseña Romanos 8:9?", "Que el Espíritu vive en todo el que es de Cristo", ["Que tiene razón", "Que el Espíritu vive solo en el templo", "Que hay que ganarlo"], "«si es que el Espíritu de Dios mora en vosotros».", "Romanos 8:9"],
      ["m1-17", 3, "o3", "comprender", "¿Qué habían hecho los efesios antes de ser sellados, según Efesios 1:13?", "Habían oído el evangelio y creído en él", ["Habían ayunado cuarenta días", "Habían dado una ofrenda", "Habían peregrinado a Jerusalén"], "«habiendo oído la palabra de verdad, el evangelio de vuestra salvación, y habiendo creído en él».", "Efesios 1:13-14"],
      ["m1-18", 3, "o3", "evaluar", "¿Cuál de estas obras del Espíritu es para todo creyente desde que cree?", "Vivir en él, sellarlo y unirlo al cuerpo de Cristo", ["Darle todos los dones", "Hacerlo pastor", "Quitarle toda tentación"], "«Porque por un solo Espíritu fuimos todos bautizados en un cuerpo».", "1 Corintios 12:13"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Con qué bautizó Juan, según Hechos 1:5?", "Con agua", ["Con fuego", "Con aceite", "Con el Espíritu"], "«Porque Juan ciertamente bautizó con agua».", "Hechos 1:4-5"],
      ["m2-02", 4, "o4", "comprender", "¿Qué habían recibido los de Samaria antes de que llegaran Pedro y Juan?", "La palabra de Dios y el bautismo en el nombre de Jesús", ["El bautismo en el Espíritu", "Nada", "Una carta de Pablo"], "«Cuando los apóstoles que estaban en Jerusalén oyeron que Samaria había recibido la palabra de Dios».", "Hechos 8:14-17"],
      ["m2-03", 4, "o4", "recordar", "¿Qué respondieron los discípulos de Éfeso a la pregunta de Pablo?", "Ni siquiera hemos oído si hay Espíritu Santo", ["Sí, lo recibimos", "No queremos recibirlo", "No sabemos quién eres"], "«Ni siquiera hemos oído si hay Espíritu Santo».", "Hechos 19:1-6"],
      ["m2-04", 4, "o4", "aplicar", "¿Qué actitud pide la lección al que busca el bautismo en el Espíritu?", "Pedirlo al Padre con fe y un corazón dispuesto, sin querer fabricarlo", ["Imitar a otros", "Forzar una experiencia", "Dejar de orar"], "«dará el Espíritu Santo a los que se lo pidan».", "Lucas 11:13"],
      ["m2-05", 4, "o4", "analizar", "¿Qué tienen en común Pentecostés, Samaria y Éfeso?", "Que el Espíritu vino sobre personas que ya creían", ["Que nadie creía", "Que no pasó nada", "Que solo hubo bautismo en agua"], "«Y habiéndoles impuesto Pablo las manos, vino sobre ellos el Espíritu Santo».", "Hechos 19:1-6"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué enseñan las Asambleas de Dios sobre las lenguas, según la nota de la lección?", "Que son la señal física inicial y necesaria del bautismo en el Espíritu", ["Que están prohibidas", "Que ya no existen", "Que son solo un idioma aprendido"], "«y comenzaron a hablar en otras lenguas, según el Espíritu les daba que hablasen».", "Hechos 2:1-4"],
      ["m2-07", 5, "o5", "recordar", "¿Qué entiende el que tiene profecía y todos los misterios, pero no amor, según 1 Corintios 13:2?", "Que nada es", ["Que es el más grande", "Que es un apóstol", "Que no necesita a nadie"], "«y no tengo amor, nada soy».", "1 Corintios 13:1-2"],
      ["m2-08", 5, "o5", "comprender", "¿Qué no hay contra el fruto del Espíritu, según Gálatas 5:23?", "Ley", ["Enemigos", "Pruebas", "Tentaciones"], "«contra tales cosas no hay ley».", "Gálatas 5:22-25"],
      ["m2-09", 5, "o5", "recordar", "¿Qué pide Gálatas 5:25 a los que viven por el Espíritu?", "Que anden también por el Espíritu", ["Que descansen", "Que se aparten de la iglesia", "Que busquen solo dones"], "«Si vivimos por el Espíritu, andemos también por el Espíritu».", "Gálatas 5:22-25"],
      ["m2-10", 5, "o5", "aplicar", "Un líder quiere elegir a un nuevo obrero. ¿Qué debe mirar, según la lección?", "Su carácter y su fruto, además de sus dones", ["Solo sus dones públicos", "Solo su fama", "Solo su dinero"], "«Mas el fruto del Espíritu es amor, gozo, paz».", "Gálatas 5:22-25"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué un don puede usarse sin madurez, según la lección?", "Porque el don se recibe, pero el fruto crece con el tiempo", ["Porque los dones no vienen de Dios", "Porque el fruto no existe", "Porque la madurez no importa"], "«repartiendo a cada uno en particular como él quiere».", "1 Corintios 12:11"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué es una señal de alarma en un ministerio, según la nota de la lección?", "Dones visibles sin fruto", ["Fruto sin fama", "Servir en lo escondido", "Orar mucho"], "«vengo a ser como metal que resuena, o címbalo que retiñe».", "1 Corintios 13:1-2"],
      ["m2-13", 6, "o6", "recordar", "¿Qué no debemos satisfacer si andamos en el Espíritu, según Gálatas 5:16?", "Los deseos de la carne", ["El hambre de la Palabra", "La sed de Dios", "El deseo de servir"], "«y no satisfagáis los deseos de la carne».", "Gálatas 5:16-17"],
      ["m2-14", 6, "o6", "comprender", "¿Qué pasa si se vive conforme a la carne, según Romanos 8:13?", "Moriréis", ["Viviréis", "Seréis ricos", "Nada"], "«porque si vivís conforme a la carne, moriréis».", "Romanos 8:13"],
      ["m2-15", 6, "o6", "recordar", "¿Por qué regiones pasaron Pablo y los suyos cuando el Espíritu les prohibió hablar en Asia?", "Por Frigia y la provincia de Galacia", ["Por Egipto y Etiopía", "Por Roma y Grecia", "Por Babilonia"], "«Y atravesando Frigia y la provincia de Galacia».", "Hechos 16:6-7"],
      ["m2-16", 6, "o6", "aplicar", "¿Qué hace el obrero que quiere ser lleno del Espíritu cada día, según la lección?", "Lo pide cada día y cuida de no contristarlo", ["Espera que pase solo una vez", "No hace nada", "Lo busca solo en los cultos especiales"], "«antes bien sed llenos del Espíritu».", "Efesios 5:18"],
      ["m2-17", 6, "o6", "comprender", "¿Para qué día fuimos sellados con el Espíritu, según Efesios 4:30?", "Para el día de la redención", ["Para el día del juicio de los ángeles", "Para el día de reposo", "Para el día de la cosecha"], "«con el cual fuisteis sellados para el día de la redención».", "Efesios 4:30"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué resume mejor la vida del obrero en el Espíritu?", "Andar en el Espíritu, ser lleno de él, dejarse guiar y no contristarlo", ["Recibir el Espíritu una vez y olvidarlo", "Buscar solo experiencias", "Servir con sus propias fuerzas"], "«Si vivimos por el Espíritu, andemos también por el Espíritu».", "Gálatas 5:22-25"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n3-espiritu-santo-e1",
      tipo: "corta",
      pregunta: "Explica, con la Biblia, por qué el Espíritu Santo es una persona y por qué es Dios.",
      ideas: [
        { id: "persona", peso: 35, texto: "Es una persona: es otro Consolador, guía, tiene voluntad y puede ser entristecido.", formas: ["otro consolador", "persona", "guia", "voluntad", "entristec*", "contrist*", "como el quiere"] },
        { id: "no_fuerza", peso: 15, texto: "No es una fuerza o energía.", formas: ["no es una fuerza", "no una fuerza", "no es una energia", "no es un poder"], negativa: true },
        { id: "dios", peso: 40, texto: "Es Dios: mentirle a él es mentirle a Dios, y es el Espíritu eterno.", formas: ["es dios", "mentido a dios", "mentirle a dios", "espiritu eterno", "tres personas", "igual al padre"] },
      ],
      citas: ["Juan 14:16-17", "Juan 14:16", "Juan 16:13-14", "Juan 16:13", "1 Corintios 12:11", "Efesios 4:30", "Hechos 5:3-4", "Hechos 5:4", "Hebreos 9:14"],
      pesoCita: 10,
      errores: [{ id: "solo_fuerza", anula: "persona", texto: "El Espíritu no es solo una fuerza: es una persona divina (Juan 14:16-17; Efesios 4:30).", formas: ["es solo una fuerza", "es solo el poder de dios", "es solo una energia"] }],
      modelo:
        "El Espíritu Santo es una persona y no una fuerza: Jesús lo llama otro Consolador, nos guía a toda la verdad, reparte los dones como él quiere y puede ser entristecido (Efesios 4:30). Y es Dios: mentirle al Espíritu Santo es mentirle a Dios (Hechos 5:3-4), y Hebreos lo llama el Espíritu eterno.",
    },
    {
      id: "n3-espiritu-santo-e2",
      tipo: "corta",
      pregunta: "Explica qué hace el Espíritu Santo en la salvación de una persona.",
      ideas: [
        { id: "convence", peso: 20, texto: "Convence de pecado, de justicia y de juicio.", formas: ["convence", "conviccion", "pecado"] },
        { id: "regenera", peso: 25, texto: "Hace nacer de nuevo: la regeneración.", formas: ["nacer de nuevo", "nace de nuevo", "regenera*", "nuevo nacimiento", "nacido del espiritu"] },
        { id: "mora", peso: 20, texto: "Vive en todo creyente y da testimonio de que somos hijos de Dios.", formas: ["vive en", "vivir en", "mora en", "testimonio", "hijos de dios", "hijo de dios", "hija de dios", "adopcion", "abba", "seguridad"] },
        { id: "sella", peso: 25, texto: "Sella al creyente y es las arras de su herencia.", formas: ["sella*", "sello", "arras", "garantia"] },
      ],
      citas: ["Juan 16:8", "Juan 3:5-6", "Juan 3:5", "Tito 3:5", "Romanos 8:9", "Romanos 8:14-16", "Romanos 8:16", "Efesios 1:13-14", "Efesios 1:13", "1 Corintios 12:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El Espíritu Santo convence de pecado, de justicia y de juicio (Juan 16:8). Hace nacer de nuevo a quien cree, por la regeneración. Desde entonces vive en el creyente y da testimonio de que es hijo de Dios, y lo sella como las arras de su herencia.",
    },
    {
      id: "n3-espiritu-santo-e3",
      tipo: "corta",
      pregunta: "Explica la diferencia entre los dones y el fruto del Espíritu, y cuál de los dos muestra la madurez del obrero.",
      ideas: [
        { id: "dones", peso: 25, texto: "Los dones son lo que el Espíritu hace por medio del creyente; los reparte como él quiere.", formas: ["por medio del", "como el quiere", "los reparte", "capacidad*", "para servir", "edificar"] },
        { id: "fruto", peso: 25, texto: "El fruto es el carácter de Cristo que el Espíritu forma en el creyente.", formas: ["caracter", "en el creyente", "amor, gozo", "amor gozo", "mansedumbre", "templanza"] },
        { id: "amor", peso: 20, texto: "Sin amor, los dones no valen.", formas: ["sin amor", "nada soy", "metal que resuena", "seguid el amor"] },
        { id: "madurez", peso: 20, texto: "El fruto muestra la madurez.", formas: ["madurez", "maduro", "el fruto muestra", "por su fruto", "por sus frutos"], negativa: true },
      ],
      citas: ["Gálatas 5:22-23", "Gálatas 5:22-25", "Gálatas 5:22", "1 Corintios 13:1-2", "1 Corintios 13:2", "1 Corintios 12:11", "1 Corintios 14:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los dones son lo que el Espíritu hace por medio del creyente, y los reparte como él quiere. El fruto es el carácter de Cristo que forma en él: amor, gozo, paz, paciencia y templanza (Gálatas 5:22-23). Sin amor, los dones no valen: nada soy. Por eso el fruto muestra la madurez.",
    },
    {
      id: "n3-espiritu-santo-e4",
      tipo: "breve",
      pregunta:
        "Un nuevo obrero de tu iglesia te pregunta qué es el bautismo en el Espíritu Santo y cómo puede recibirlo. Explícale, con la Biblia, qué enseña el libro de los Hechos, para qué es, cómo se recibe y qué queda por confirmar sobre las lenguas.",
      ideas: [
        { id: "promesa", peso: 20, texto: "Es la promesa del Padre: Jesús dijo que serían bautizados con el Espíritu.", formas: ["promesa del padre", "la promesa", "bautizados con el espiritu", "pentecostes"] },
        { id: "poder", peso: 20, texto: "Es para recibir poder y ser testigos.", formas: ["poder", "testigos", "testificar", "para servir"] },
        { id: "distinto", peso: 20, texto: "Es distinto del nuevo nacimiento y puede seguirlo, como en Samaria y Éfeso.", formas: ["distinto", "despues de creer", "samaria", "efeso", "ya creian", "puede seguirlo"] },
        { id: "recibir", peso: 20, texto: "Se recibe con fe, pidiéndolo al Padre.", formas: ["pidiendo", "pedirlo", "pidelo", "con fe", "a los que se lo pidan", "pide"] },
        { id: "lenguas", peso: 20, texto: "Si las lenguas son la señal inicial y necesaria es un punto por confirmar.", formas: ["por confirmar", "senal inicial", "la unica senal", "las posiciones", "asambleas de dios"] },
      ],
      basta: 85,
      citas: ["Hechos 1:4-5", "Hechos 1:5", "Hechos 1:8", "Hechos 2:1-4", "Hechos 2:4", "Hechos 8:14-17", "Hechos 19:1-6", "Hechos 19:6", "Lucas 11:13", "1 Corintios 12:30", "Hechos 2:38-39"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermano, el bautismo en el Espíritu Santo es la promesa del Padre. Jesús dijo a sus discípulos, que ya creían en él: vosotros seréis bautizados con el Espíritu Santo dentro de no muchos días (Hechos 1:5), y en Pentecostés fueron todos llenos del Espíritu. Es para recibir poder y ser testigos de Cristo, como prometió en Hechos 1:8. En Samaria y en Éfeso, el Espíritu vino sobre personas que ya habían creído, y por eso nuestra declaración de fe enseña que es distinto del nuevo nacimiento y puede seguirlo. ¿Cómo se recibe? Con fe, pidiéndolo al Padre, que da el Espíritu Santo a los que se lo pidan (Lucas 11:13), con un corazón dispuesto y sin querer fabricarlo. En Hechos, los que lo recibieron hablaron en lenguas. Si las lenguas son la señal inicial y necesaria, como enseñan las Asambleas de Dios, o una manifestación que se espera sin ser la única señal, es un punto por confirmar en la declaración de fe del ministerio.",
    },
    {
      id: "n3-espiritu-santo-e5",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de obreros qué significa andar en el Espíritu en el servicio de cada día, con citas bíblicas: la lucha con la carne, ser llenos del Espíritu, dejarse guiar y lo que contrista al Espíritu.",
      ideas: [
        { id: "carne", peso: 25, texto: "Andar en el Espíritu vence los deseos de la carne.", formas: ["deseos de la carne", "la carne", "hacer morir", "vencer"] },
        { id: "llenos", peso: 25, texto: "Ser llenos del Espíritu cada día, no una sola vez.", formas: ["llenos del espiritu", "lleno del espiritu", "cada dia", "una y otra vez", "no una sola vez"], negativa: true },
        { id: "guia", peso: 25, texto: "Dejarse guiar en el servicio, como Pablo en Hechos 16.", formas: ["guia*", "bitinia", "asia", "cambie sus planes", "cambiar los planes", "dirigido"] },
        { id: "contristar", peso: 25, texto: "No contristar al Espíritu: la mentira, el enojo, las palabras que hieren.", formas: ["contrist*", "entristec*", "apagar", "la mentira", "el enojo"], negativa: true },
      ],
      basta: 85,
      citas: ["Gálatas 5:16-17", "Gálatas 5:16", "Gálatas 5:25", "Romanos 8:13", "Efesios 5:18", "Hechos 16:6-7", "Efesios 4:30", "Hechos 4:31", "Romanos 8:14"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, andar en el Espíritu es vivir cada día bajo su guía. Hay una lucha real: el deseo de la carne es contra el Espíritu, pero Pablo nos da la salida: andad en el Espíritu, y no satisfagáis los deseos de la carne (Gálatas 5:16); y si por el Espíritu hacemos morir las obras de la carne, viviremos. En segundo lugar, Efesios 5:18 nos manda ser llenos del Espíritu, y es un mandato para cada día, no una experiencia de una sola vez: los discípulos fueron llenos otra vez cuando oraron. Tercero, el Espíritu guía nuestro servicio: a Pablo le impidió hablar en Asia y no le permitió ir a Bitinia, porque lo llevaba a Macedonia (Hechos 16:6-7). Por eso planificamos y oramos, dispuestos a que él cambie nuestros planes. Y cuarto, cuidamos de no contristar al Espíritu Santo (Efesios 4:30): lo entristecen la mentira, el enojo que no se resuelve y las palabras que hieren. Así servimos no con fuerza, sino con su Espíritu.",
    },
  ],
  breve: {
    id: "n3-espiritu-santo-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo cambió tu relación con el Espíritu Santo con esta materia: quién es para ti, qué hizo en tu salvación, cómo buscarás ser lleno de él para servir y cómo cuidarás el fruto en tu vida, con citas bíblicas.",
    ideas: [
      { id: "persona", peso: 20, texto: "Lo reconoce como persona divina.", formas: ["persona", "es dios", "consolador", "no una fuerza", "no es una fuerza"], negativa: true },
      { id: "salvacion", peso: 20, texto: "Reconoce su obra en la salvación.", formas: ["nacer de nuevo", "naci de nuevo", "regenera*", "me sello", "sellado", "vive en mi", "hijo de dios", "testimonio"] },
      { id: "llenura", peso: 25, texto: "Buscará ser lleno o bautizado para servir.", formas: ["lleno del espiritu", "llena del espiritu", "ser lleno", "bautismo en el espiritu", "poder para", "pedire", "pedirle"] },
      { id: "fruto", peso: 20, texto: "Cuidará el fruto.", formas: ["fruto", "amor", "paciencia", "templanza", "caracter"] },
      { id: "cambio", peso: 15, texto: "Dice qué cambió.", formas: ["antes hablaba", "antes pensaba", "antes creia", "ahora entiendo", "aprendi", "voy a (pedir|cuidar|servir|orar|buscar)", "me comprometo"] },
    ],
    basta: 85,
    citas: ["Zacarías 4:6", "Juan 14:16-17", "Juan 16:13", "Efesios 4:30", "Hechos 5:3-4", "Tito 3:5", "Romanos 8:16", "Efesios 1:13", "Hechos 1:8", "Lucas 11:13", "Efesios 5:18", "Gálatas 5:22-23", "Gálatas 5:25"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Antes hablaba del Espíritu Santo como de una fuerza. Ahora entiendo que es una persona divina, otro Consolador que vive en mí (Juan 14:16-17), y que no debo contristarlo. Aprendí que él me hizo nacer de nuevo y me selló como hijo de Dios: su testimonio me da seguridad (Romanos 8:16). Para servir, voy a pedirle cada día al Padre que me llene del Espíritu, porque él da el Espíritu Santo a los que se lo piden (Lucas 11:13), y quiero el poder para ser testigo que Jesús prometió. También voy a cuidar el fruto en mi vida: amor, paciencia y templanza (Gálatas 5:22-23), porque sin amor los dones no valen nada. Mi servicio no será con ejército, ni con fuerza, sino con su Espíritu (Zacarías 4:6).",
  },
};
