/**
 * El banco de «Ayuda humanitaria y desastres» (especialidad Obra social y misericordia, materia 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 Dios en el desastre y sus etapas · o2 los principios humanitarios · o3 las normas Esfera y la dignidad ·
 * o4 las donaciones que ayudan · o5 la coordinación y la recuperación · o6 la preparación y la acogida · o7 el versículo
 * de memoria (Lamentaciones 3:22-23).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `obra-social-4-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_OBRA_SOCIAL_4: BancoMateria = {
  materia: "obra-social-4",
  repaso: {
    "obra-social-4-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Por qué no hemos sido consumidos, según Lamentaciones 3:22?", "Por la misericordia de Jehová, porque nunca decayeron sus misericordias", ["Por nuestra fuerza", "Por suerte", "Por el rey"], "«Por la misericordia de Jehová no hemos sido consumidos».", "Lamentaciones 3:22-23"],
      ["1-r2", 1, "o1", "comprender", "¿Qué hace la iglesia en las primeras horas de un desastre, cuando el rescate es de los profesionales?", "Ora, avisa a los suyos y se pone a disposición, sin estorbar el rescate", ["Corre al lugar a rescatar por su cuenta", "No hace nada nunca", "Publica fotos de las víctimas"], "«Cuando pases por las aguas, yo estaré contigo».", "Isaías 43:2"],
      ["1-r3", 1, "o1", "aplicar", "Una inundación destruye casas en otra ciudad donde hay una iglesia hermana. ¿Qué haces primero?", "Orar, llamar al pastor de esa iglesia para saber qué necesitan y recoger una ofrenda, sin viajar por cuenta propia", ["Viajar enseguida con todos los hermanos", "Mandar un camión de ropa usada", "Esperar a que pase un año"], "«determinaron enviar socorro a los hermanos que habitaban en Judea».", "Hechos 11:28-29"],
    ] as P[]).map(p),
    "obra-social-4-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué comprendió Pedro en la casa de Cornelio, según Hechos 10:34?", "Que Dios no hace acepción de personas", ["Que Dios ama solo a Israel", "Que los romanos eran malos", "Que no debía entrar"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34"],
      ["2-r2", 2, "o2", "comprender", "¿Qué dice el principio humanitario de la imparcialidad?", "Que la ayuda se da según la necesidad, sin distinguir raza, religión, nacionalidad ni opinión", ["Que la ayuda es primero para los de la iglesia", "Que se ayuda al que vota bien", "Que se ayuda al que llega primero"], "«que vuestra fe en nuestro glorioso Señor Jesucristo sea sin acepción de personas».", "Santiago 2:1"],
      ["2-r3", 2, "o2", "aplicar", "Tu iglesia abre un albergue y llegan familias de varias religiones. ¿Cómo reparte la ayuda?", "Según la necesidad, primero a los más vulnerables, sin preguntar la religión y sin condicionar la ayuda", ["Primero a los miembros", "Solo a los que asistan al culto", "Al que llegue primero, sin orden"], "«que hace salir su sol sobre malos y buenos».", "Mateo 5:45"],
    ] as P[]).map(p),
    "obra-social-4-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué pide Isaías 58:7 hacer con el desnudo?", "Cubrirlo", ["Ignorarlo", "Juzgarlo", "Mandarlo lejos"], "«que cuando veas al desnudo, lo cubras».", "Isaías 58:7"],
      ["3-r2", 3, "o3", "comprender", "¿Cuánta agua por persona y por día pide como mínimo el Manual Esfera para beber y para la higiene?", "Al menos 15 litros, según el lugar y la etapa", ["Medio litro", "Un litro", "Siempre 100 litros"], "«Abre tu boca por el mudo».", "Proverbios 31:8"],
      ["3-r3", 3, "o3", "aplicar", "Tu iglesia recibirá a treinta personas en su salón durante una semana. ¿Qué cuidas?", "El agua, los baños limpios, las comidas con horario, la privacidad, la protección de los niños y un trato que honra a cada persona", ["Solo las camas", "Solo la comida", "Nada, es solo una semana"], "«Honrad a todos».", "1 Pedro 2:17"],
    ] as P[]).map(p),
    "obra-social-4-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Según qué es acepta la ofrenda, según 2 Corintios 8:12?", "Según lo que uno tiene, no según lo que no tiene", ["Según lo que dan los ricos", "Según lo que pide el pastor", "Según lo que sobra"], "«será acepta según lo que uno tiene, no según lo que no tiene».", "2 Corintios 8:12"],
      ["4-r2", 4, "o4", "comprender", "¿Qué enseña FEMA sobre la mejor manera de donar en un desastre?", "Que el dinero a organizaciones reconocidas es lo más rápido, flexible y eficaz, y que solo se donan los artículos que se piden", ["Que lo mejor es mandar ropa usada", "Que no hay que donar", "Que se dona a cualquiera que llame"], "«Macedonia y Acaya tuvieron a bien hacer una ofrenda para los pobres».", "Romanos 15:26"],
      ["4-r3", 4, "o4", "aplicar", "Un desconocido te llama pidiendo dinero urgente para las víctimas de un huracán. ¿Qué haces?", "No le das datos ni dinero, y das por medio de tu iglesia o de una organización reconocida", ["Le das tu tarjeta", "Le mandas efectivo", "Le das los datos de la iglesia"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ] as P[]).map(p),
    "obra-social-4-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Por qué son mejores dos que uno, según Eclesiastés 4:10?", "Porque si caen, el uno levanta a su compañero", ["Porque ganan más dinero", "Porque no trabajan", "Porque discuten menos"], "«Porque si cayeren, el uno levantará a su compañero».", "Eclesiastés 4:9-10"],
      ["5-r2", 5, "o5", "comprender", "¿Cuáles son las cuatro C de National VOAD?", "Cooperación, comunicación, coordinación y colaboración", ["Comida, casa, carro y cama", "Culto, canto, cena y clase", "Control, castigo, cobro y crédito"], "«Mejores son dos que uno».", "Eclesiastés 4:9-10"],
      ["5-r3", 5, "o5", "aplicar", "Tu ciudad formó un grupo de recuperación a largo plazo tres meses después de una inundación. ¿Qué hace tu iglesia?", "Participa, ofrece su salón y voluntarios capacitados, y conecta a las familias del barrio con el grupo", ["Nada, ya pasó la emergencia", "Abre su propio centro sin avisar a nadie", "Manda voluntarios sin preparación"], "«somos un cuerpo en Cristo».", "Romanos 12:4-5"],
    ] as P[]).map(p),
    "obra-social-4-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Para qué se guardó la provisión de los años buenos, según Génesis 41:36?", "Para los siete años de hambre, para que el país no pereciera", ["Para venderla cara", "Solo para el faraón", "Para una fiesta"], "«para los siete años de hambre que habrá en la tierra de Egipto».", "Génesis 41:35-36"],
      ["6-r2", 6, "o6", "comprender", "¿Cómo debía tratar Israel al extranjero, según Levítico 19:34?", "Como a un natural, amándolo como a sí mismo", ["Como a un enemigo", "Como a un siervo", "Con desconfianza"], "«lo amarás como a ti mismo».", "Levítico 19:34"],
      ["6-r3", 6, "o6", "aplicar", "Tu iglesia no tiene ningún plan para un desastre. ¿Qué propones?", "Formar un equipo, una cadena de llamadas, la lista de los más vulnerables, lo necesario guardado y el contacto con las organizaciones de la ciudad", ["Esperar a que pase algo", "Orar y no hacer nada más", "Comprar mucha comida sin un plan"], "«el país no perecerá de hambre».", "Génesis 41:35-36"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Dios en medio del desastre
    ["f01", 1, "o1", "recordar", "¿Cómo son las misericordias de Dios cada mañana, según Lamentaciones 3:23?", "Nuevas", ["Viejas", "Pocas", "Cansadas"], "«Nuevas son cada mañana».", "Lamentaciones 3:22-23"],
    ["f02", 1, "o1", "recordar", "¿Qué promete Dios para cuando pasemos por el fuego, según Isaías 43:2?", "Que no nos quemaremos ni la llama arderá en nosotros", ["Que no habrá fuego", "Que nos dejará solos", "Que nos quemaremos"], "«Cuando pases por el fuego, no te quemarás, ni la llama arderá en ti».", "Isaías 43:2"],
    ["f03", 1, "o1", "comprender", "¿Qué enseña Isaías 43:2 sobre los desastres?", "Que Dios no promete que no vendrán, sino que estará con nosotros en medio de ellos", ["Que los creyentes nunca sufren desastres", "Que los desastres siempre son castigo", "Que a Dios no le importan"], "«yo estaré contigo».", "Isaías 43:2"],
    ["f04", 1, "o1", "comprender", "¿Qué hace la iglesia en los primeros días de un desastre?", "El alivio: refugio, agua, comida, ropa y compañía, por medio de las organizaciones que coordinan", ["El rescate de las personas atrapadas", "Nada", "Reconstruir las casas"], "«determinaron enviar socorro».", "Hechos 11:28-29"],
    ["f05", 1, "o1", "comprender", "¿Por qué no se culpa a las víctimas de un desastre?", "Porque los desastres golpean a buenos y a malos, y la iglesia llora con los que lloran", ["Porque nunca tienen culpa de nada", "Porque así lo dice el gobierno", "Sí se las culpa"], "«llorad con los que lloran».", "Romanos 12:15"],
    ["f06", 1, "o1", "analizar", "¿Por qué la recuperación es la etapa en la que más falta hace la iglesia?", "Porque dura meses o años, cuando ya nadie habla del desastre y muchos se han ido", ["Porque es la más corta", "No hace falta", "Porque es la más fácil"], "«porque nunca decayeron sus misericordias».", "Lamentaciones 3:22-23"],
    ["f07", 1, "o1", "aplicar", "Un grupo de hermanos quiere viajar mañana a la zona del desastre para rescatar personas. ¿Qué les aconsejas?", "Que no vayan por cuenta propia: que se inscriban con una organización que coordina y esperen a que los llame", ["Que vayan enseguida", "Que lleven a sus hijos", "Que vayan de noche"], "«Cuando pases por las aguas, yo estaré contigo».", "Isaías 43:2"],
    ["f08", 1, "o1", "aplicar", "Tu iglesia ayudó mucho la primera semana después de un tornado, pero nadie volvió después. ¿Qué propones?", "Seguir acompañando a las familias en la recuperación, con un equipo y un plan para los meses siguientes", ["Nada, ya ayudaron", "Ayudar solo si hay otro tornado", "Mandar una tarjeta"], "«nunca decayeron sus misericordias».", "Lamentaciones 3:22-23"],
    ["f09", 1, "o1", "evaluar", "¿Qué respuesta de una iglesia a un desastre es la mejor?", "Orar, preguntar qué se necesita, dar por medio de quien coordina, inscribir voluntarios y acompañar en la recuperación", ["Correr al lugar sin avisar", "Mandar lo que sobra en las casas", "Ayudar solo el primer día"], "«cada uno conforme a lo que tenía».", "Hechos 11:28-29"],
    ["f10", 1, "o7", "recordar", "Completa Lamentaciones 3:22-23: Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias…", "Nuevas son cada mañana; grande es tu fidelidad", ["Pocas son cada día; grande es tu ira", "Lejos están de nosotros", "Solo son para los fuertes"], "«Nuevas son cada mañana; grande es tu fidelidad».", "Lamentaciones 3:22-23"],
    // Lección 2 · Los principios humanitarios
    ["f11", 2, "o2", "recordar", "¿Sobre quiénes hace salir su sol el Padre, según Mateo 5:45?", "Sobre malos y buenos", ["Solo sobre los buenos", "Solo sobre los suyos", "Sobre nadie"], "«que hace salir su sol sobre malos y buenos».", "Mateo 5:45"],
    ["f12", 2, "o2", "recordar", "¿Cómo debe ser la fe en nuestro Señor Jesucristo, según Santiago 2:1?", "Sin acepción de personas", ["Solo para los ricos", "Escondida", "Con preferencias"], "«sea sin acepción de personas».", "Santiago 2:1"],
    ["f13", 2, "o2", "recordar", "¿Sobre quiénes hace llover el Padre, según Mateo 5:45?", "Sobre justos e injustos", ["Solo sobre los justos", "Solo sobre Israel", "Sobre nadie"], "«y que hace llover sobre justos e injustos».", "Mateo 5:45"],
    ["f14", 2, "o2", "comprender", "¿Qué dice el principio de la neutralidad?", "Que los que ayudan no toman partido en los conflictos ni en las peleas políticas", ["Que no se ayuda a nadie", "Que se ayuda al bando ganador", "Que se ayuda sin orden"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34"],
    ["f15", 2, "o2", "comprender", "¿Qué resolución de la Asamblea General de la ONU agregó el principio de la independencia, según la OCHA?", "La resolución 58/114, de 2004", ["Una de 1945", "La resolución 46/182, de 1991", "Ninguna"], "«que vuestra fe en nuestro glorioso Señor Jesucristo sea sin acepción de personas».", "Santiago 2:1"],
    ["f16", 2, "o2", "analizar", "¿Por qué condicionar la ayuda a la fe va contra los principios humanitarios y contra la Biblia?", "Porque la ayuda se da según la necesidad, y el evangelio se ofrece con respeto: no se compra con ayuda", ["Porque la fe no importa", "No va contra nada", "Porque la ley siempre lo prohíbe"], "«Dios no hace acepción de personas».", "Hechos 10:34"],
    ["f17", 2, "o2", "aplicar", "Un hermano propone dar primero la comida del albergue a los miembros de la iglesia. ¿Qué le respondes?", "Que se da según la necesidad, primero a los más vulnerables, sin acepción de personas", ["Que tiene razón", "Que se dé al que llegue primero", "Que se sortee"], "«sea sin acepción de personas».", "Santiago 2:1"],
    ["f18", 2, "o2", "aplicar", "Un candidato quiere repartir ayuda en el albergue de la iglesia con su propaganda. ¿Qué haces?", "Recibes la ayuda si la da sin propaganda, porque la ayuda no se usa para la política", ["Dejas que reparta su propaganda", "Pones su foto en la puerta", "Pides votos para él"], "«que hace llover sobre justos e injustos».", "Mateo 5:45"],
    ["f19", 2, "o2", "aplicar", "Tienes que organizar un culto en un albergue donde hay familias de varias religiones. ¿Cómo lo haces?", "En un horario aparte, para quien quiera, sin obligar a nadie ni condicionar la ayuda", ["Obligatorio para recibir la cena", "En medio del reparto, para que todos oigan", "No se hace nunca"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34"],
    ["f20", 2, "o2", "evaluar", "¿Qué albergue de una iglesia sigue mejor los principios humanitarios?", "Uno que recibe a todos con respeto, ayuda según la necesidad, no hace política y ofrece la fe sin obligar", ["Uno que ayuda primero a los miembros", "Uno con propaganda política", "Uno donde el culto es obligatorio"], "«sea sin acepción de personas».", "Santiago 2:1"],
    // Lección 3 · Las normas Esfera: ayudar con dignidad
    ["f21", 3, "o3", "recordar", "¿Qué pide Isaías 58:7 hacer con los pobres errantes?", "Albergarlos en casa", ["Echarlos", "Ignorarlos", "Cobrarles"], "«y a los pobres errantes albergues en casa».", "Isaías 58:7"],
    ["f22", 3, "o3", "recordar", "¿Por quién pide Proverbios 31:8 abrir la boca?", "Por el mudo, en el juicio de todos los desvalidos", ["Por los ricos", "Por los jueces", "Por nadie"], "«Abre tu boca por el mudo».", "Proverbios 31:8"],
    ["f23", 3, "o3", "recordar", "¿A quiénes pide 1 Pedro 2:17 honrar?", "A todos", ["Solo a los ricos", "Solo a los hermanos", "Solo al rey"], "«Honrad a todos».", "1 Pedro 2:17"],
    ["f24", 3, "o3", "comprender", "¿Qué afirma la Carta Humanitaria del Manual Esfera?", "Que toda persona afectada por un desastre tiene derecho a vivir con dignidad y a recibir ayuda", ["Que solo los ciudadanos reciben ayuda", "Que la ayuda es un favor", "Que nadie tiene derechos"], "«Honrad a todos».", "1 Pedro 2:17"],
    ["f25", 3, "o3", "comprender", "¿Cuáles son las cuatro áreas técnicas del Manual Esfera?", "El agua, el saneamiento y la higiene; la seguridad alimentaria y la nutrición; el alojamiento; y la salud", ["La música, el arte, el deporte y la danza", "La política, la economía, la guerra y la paz", "La escuela, el trabajo, el banco y la iglesia"], "«que partas tu pan con el hambriento».", "Isaías 58:7"],
    ["f26", 3, "o3", "analizar", "¿Por qué el mínimo de 15 litros de agua del Manual Esfera nunca es un máximo?", "Porque es lo mínimo para vivir con dignidad, y según el lugar y la etapa puede hacer falta más", ["Porque el agua sobra", "Porque sí es un máximo", "Porque nadie la mide"], "«Abre tu boca por el mudo».", "Proverbios 31:8"],
    ["f27", 3, "o3", "aplicar", "Tienes que preparar los baños del albergue de la iglesia. ¿Qué cuidas?", "Que estén limpios, que haya baños separados y luz de noche, por la privacidad y la seguridad de las mujeres y de los niños", ["Que haya uno solo para todos", "Que se cierren de noche", "Nada"], "«Honrad a todos».", "1 Pedro 2:17"],
    ["f28", 3, "o3", "aplicar", "Un voluntario quiere tomar fotos de las familias del albergue para las redes. ¿Qué le dices?", "Que no se toman sin su permiso, para cuidar su dignidad y su seguridad", ["Que tome todas las que quiera", "Que las tome de noche", "Que las publique con sus nombres"], "«Honrad a todos».", "1 Pedro 2:17"],
    ["f29", 3, "o3", "aplicar", "Una madre del albergue se queja de que la comida no sirve para su bebé. ¿Qué haces?", "La escuchas, buscas con la organización la comida adecuada para el bebé y lo anotas para mejorar", ["Le dices que agradezca lo que hay", "La ignoras", "Le pides que se vaya"], "«Abre tu boca por el mudo».", "Proverbios 31:8"],
    ["f30", 3, "o3", "evaluar", "¿Qué manera de repartir la ayuda honra más a las personas?", "Con orden, en un lugar seguro, explicando lo que hay y dejando escoger cuando se puede", ["Tirar las cajas desde un camión", "Decidir por ellas sin preguntar", "Repartir con fotos para las redes"], "«Honrad a todos».", "1 Pedro 2:17"],
    // Lección 4 · Las donaciones que ayudan
    ["f31", 4, "o4", "recordar", "¿Para quiénes hicieron una ofrenda Macedonia y Acaya, según Romanos 15:26?", "Para los pobres que hay entre los santos que están en Jerusalén", ["Para el emperador", "Para el templo de Atenas", "Para Pablo"], "«para los pobres que hay entre los santos que están en Jerusalén».", "Romanos 15:26"],
    ["f32", 4, "o4", "recordar", "¿Qué hace el simple, según Proverbios 14:15?", "Todo lo cree", ["Mira bien sus pasos", "No cree nada", "Lo pregunta todo"], "«El simple todo lo cree».", "Proverbios 14:15"],
    ["f33", 4, "o4", "recordar", "¿Qué hace falta primero para que la ofrenda sea acepta, según 2 Corintios 8:12?", "La voluntad dispuesta", ["Mucho dinero", "Un permiso", "Un recibo"], "«Porque si primero hay la voluntad dispuesta».", "2 Corintios 8:12"],
    ["f34", 4, "o4", "comprender", "¿Por qué el dinero suele ayudar más que las cosas que nadie pidió?", "Porque permite comprar lo que de verdad falta y ayuda a los negocios del lugar a levantarse", ["Porque el dinero vale más que las personas", "No ayuda más", "Porque las cosas nunca sirven"], "«será acepta según lo que uno tiene».", "2 Corintios 8:12"],
    ["f35", 4, "o4", "comprender", "¿Qué ayuda inmediata permite la Publicación 3833 del IRS sin pedir pruebas de la necesidad?", "Cobijas o comidas calientes justo después del desastre", ["Una casa nueva", "Dinero para un carro", "Ninguna"], "«Macedonia y Acaya tuvieron a bien hacer una ofrenda».", "Romanos 15:26"],
    ["f36", 4, "o4", "analizar", "¿Por qué las cosas que nadie pidió pueden estorbar en un desastre?", "Porque llenan los almacenes y quitan tiempo a los voluntarios que tienen que ordenarlas", ["Porque son malas", "No estorban", "Porque son caras"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f37", 4, "o4", "aplicar", "Tu grupo quiere llenar un camión con ropa usada para la zona del desastre. ¿Qué le propones?", "Preguntar primero qué piden las organizaciones del lugar y, si no la piden, dar una ofrenda en dinero", ["Mandar el camión sin preguntar", "Tirar la ropa", "Venderla en la zona"], "«Porque si primero hay la voluntad dispuesta».", "2 Corintios 8:12"],
    ["f38", 4, "o4", "aplicar", "Un hermano quiere dar al fondo del huracán para una familia que él escoge. ¿Qué le explicas?", "Que, según la Publicación 3833, la ofrenda no se señala para una persona o una familia en particular, sino para la ayuda en el desastre", ["Que sí se puede", "Que la dé en efectivo a escondidas", "Que no dé nada"], "«Macedonia y Acaya tuvieron a bien hacer una ofrenda para los pobres».", "Romanos 15:26"],
    ["f39", 4, "o4", "aplicar", "Tienes que manejar el fondo de la iglesia para un desastre. ¿Qué haces?", "Escribes criterios según la necesidad, registras cada ayuda e informas a la iglesia en qué se usó", ["Das a quien más insista", "No registras nada", "Decides tú solo"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    ["f40", 4, "o4", "evaluar", "¿Qué manera de donar en un desastre es la mejor?", "Dar dinero a organizaciones reconocidas o a la iglesia del lugar, y solo los artículos que se piden", ["Mandar lo que sobra en casa", "Dar a cualquiera que llame", "Viajar a repartir por cuenta propia"], "«El simple todo lo cree; Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
    // Lección 5 · Responder juntos: la coordinación y la recuperación
    ["f41", 5, "o5", "recordar", "¿Cómo era la obra, según Nehemías 4:19?", "Grande y extensa", ["Pequeña y fácil", "Terminada", "Imposible"], "«La obra es grande y extensa».", "Nehemías 4:19-20"],
    ["f42", 5, "o5", "recordar", "¿Dónde debían reunirse al oír la trompeta, según Nehemías 4:20?", "En el lugar donde oyeran el sonido de la trompeta", ["En el palacio", "Siempre en el templo", "En sus casas"], "«En el lugar donde oyereis el sonido de la trompeta, reuníos allí con nosotros».", "Nehemías 4:19-20"],
    ["f43", 5, "o5", "recordar", "¿Qué tienen dos que trabajan juntos, según Eclesiastés 4:9?", "Mejor paga de su trabajo", ["Menos trabajo", "Más problemas", "Nada"], "«porque tienen mejor paga de su trabajo».", "Eclesiastés 4:9-10"],
    ["f44", 5, "o5", "comprender", "¿Qué es un grupo de recuperación a largo plazo, según National VOAD?", "Un grupo de organizaciones de fe, sin fines de lucro, del gobierno y de los negocios que ayuda a las familias a recuperarse", ["Un equipo de rescate", "Una oficina de impuestos", "Un club deportivo"], "«somos un cuerpo en Cristo».", "Romanos 12:4-5"],
    ["f45", 5, "o5", "comprender", "¿Qué pide FEMA a los que quieren servir de voluntarios en un desastre?", "Que no vayan por cuenta propia: que se inscriban con una organización y esperen a que los envíe", ["Que vayan solos enseguida", "Que lleven su propia comida y se queden", "Que no ayuden"], "«reuníos allí con nosotros».", "Nehemías 4:19-20"],
    ["f46", 5, "o5", "analizar", "¿Por qué una iglesia que se coordina con otras sirve mejor?", "Porque cubre lo que falta, no repite lo que otros dan y comparte la carga para seguir más tiempo", ["Porque pierde su identidad", "No sirve mejor", "Porque recibe más fama"], "«no todos los miembros tienen la misma función».", "Romanos 12:4-5"],
    ["f47", 5, "o5", "aplicar", "Tu iglesia quiere abrir un centro de ayuda después de un incendio. ¿Qué hace primero?", "Pregunta a la organización que coordina qué falta, para cubrir ese hueco y no repetir", ["Lo abre sin avisar a nadie", "Lo cierra a los que no son miembros", "Espera un año"], "«Mejores son dos que uno».", "Eclesiastés 4:9-10"],
    ["f48", 5, "o5", "aplicar", "Unos jóvenes quieren ayudar a limpiar casas inundadas. ¿Qué les pides?", "Que vayan con una organización, capacitados y con el equipo de protección", ["Que vayan solos sin equipo", "Que entren a cualquier casa", "Que no ayuden"], "«si cayeren, el uno levantará a su compañero».", "Eclesiastés 4:9-10"],
    ["f49", 5, "o5", "aplicar", "Tienes que representar a la iglesia en el grupo de recuperación de la ciudad. ¿Qué aportas?", "El salón, voluntarios capacitados, el conocimiento del barrio y la conexión con las familias que la iglesia conoce", ["Solo críticas", "Nada, solo escuchas", "Propaganda de la iglesia"], "«somos un cuerpo en Cristo, y todos miembros los unos de los otros».", "Romanos 12:4-5"],
    ["f50", 5, "o5", "evaluar", "¿Qué participación de una iglesia en la recuperación es la mejor?", "Sumarse al grupo de recuperación, aportar lo suyo con voluntarios capacitados y seguir hasta que las familias se recuperen", ["Ayudar sola, sin coordinarse", "Ayudar solo la primera semana", "Competir con otras organizaciones"], "«Mejores son dos que uno».", "Eclesiastés 4:9-10"],
    // Lección 6 · Prepararse y recibir al que huye
    ["f51", 6, "o6", "recordar", "¿Qué hizo José, el esposo de María, según Mateo 2:14?", "Tomó de noche al niño y a su madre y se fue a Egipto", ["Se quedó en Belén", "Se fue a Roma", "Volvió a Nazaret"], "«tomó de noche al niño y a su madre, y se fue a Egipto».", "Mateo 2:14"],
    ["f52", 6, "o6", "recordar", "¿Por qué debía Israel amar al extranjero, según Levítico 19:34?", "Porque ellos fueron extranjeros en la tierra de Egipto", ["Porque el extranjero era rico", "Porque lo mandó el faraón", "Porque eran pocos"], "«porque extranjeros fuisteis en la tierra de Egipto».", "Levítico 19:34"],
    ["f53", 6, "o6", "recordar", "¿Qué pasaría con el país gracias a la provisión guardada, según Génesis 41:36?", "No perecería de hambre", ["Se haría rico", "Sería conquistado", "Se quedaría sin trigo"], "«y el país no perecerá de hambre».", "Génesis 41:35-36"],
    ["f54", 6, "o6", "comprender", "¿Para qué sirve la cadena de llamadas de una iglesia en un desastre?", "Para saber pronto cómo está cada familia, sobre todo los más vulnerables", ["Para pedir ofrendas", "Para anunciar el culto", "Para nada"], "«Y junten toda la provisión de estos buenos años».", "Génesis 41:35-36"],
    ["f55", 6, "o6", "comprender", "¿Por qué prepararse para un desastre no es falta de fe?", "Porque es mayordomía, como José, que guardó en los años buenos para los años de hambre", ["Sí es falta de fe", "Porque Dios no ayuda", "Porque los desastres no existen"], "«Y esté aquella provisión en depósito para el país».", "Génesis 41:35-36"],
    ["f56", 6, "o6", "analizar", "¿Qué enseña que Jesús fuera llevado a Egipto cuando era niño?", "Que Jesús conoció lo que es huir para salvar la vida, y que la iglesia debe recibir con amor al que huye", ["Que Egipto era su país", "Que los niños deben viajar", "Nada"], "«y se fue a Egipto».", "Mateo 2:14"],
    ["f57", 6, "o6", "aplicar", "Una familia llega huyendo de la violencia y empieza a venir a la iglesia sin conocer a nadie. ¿Qué haces?", "La recibes con calidez, la ayudas con lo urgente y le presentas a una familia de la iglesia que la acompañe", ["La ignoras hasta que hable inglés", "Le pides sus papeles para ayudarla", "Le dices que busque otra iglesia"], "«lo amarás como a ti mismo».", "Levítico 19:34"],
    ["f58", 6, "o6", "aplicar", "Una familia recién llegada pide ayuda con sus trámites de inmigración. ¿A dónde la orientas?", "A un abogado o a un representante acreditado, nunca a un notario, porque la iglesia orienta pero no da consejos legales", ["A un notario del barrio", "A un hermano que sabe del tema", "A ningún lado"], "«Como a un natural de vosotros tendréis al extranjero».", "Levítico 19:34"],
    ["f59", 6, "o6", "aplicar", "Tienes que hacer la lista de los más vulnerables de la iglesia para un desastre. ¿A quiénes incluyes?", "A los ancianos solos, los enfermos, las personas con discapacidad y las familias sin carro", ["Solo a los líderes", "Solo a los jóvenes", "A nadie"], "«el país no perecerá de hambre».", "Génesis 41:35-36"],
    ["f60", 6, "o6", "evaluar", "¿Qué plan de una iglesia para un desastre es el más completo?", "Un equipo, una cadena de llamadas, la lista de los más vulnerables, lo necesario guardado, un plan para el templo y el contacto con las organizaciones de la ciudad", ["Solo orar cuando pase algo", "Solo comprar agua", "Esperar a que el gobierno lo haga todo"], "«para los siete años de hambre».", "Génesis 41:35-36"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué es grande, según Lamentaciones 3:23?", "La fidelidad de Dios", ["La ira del hombre", "El desastre", "El miedo"], "«grande es tu fidelidad».", "Lamentaciones 3:22-23"],
      ["m1-02", 1, "o1", "comprender", "¿Qué enseña la ayuda de Antioquía en tiempo de hambre?", "Que la iglesia se prepara y ayuda, cada uno según lo que tiene", ["Que solo los ricos ayudan", "Que no hay que ayudar a otras ciudades", "Que la ayuda es solo oración"], "«cada uno conforme a lo que tenía».", "Hechos 11:28-29"],
      ["m1-03", 1, "o1", "aplicar", "Tienes que planear qué hará la iglesia en los meses siguientes a un desastre. ¿Qué incluyes?", "Acompañar a las familias, ayudar a limpiar y reconstruir con las organizaciones, y prepararse mejor", ["Nada, la emergencia ya pasó", "Solo una reunión de oración", "Mandar ropa sin preguntar"], "«porque nunca decayeron sus misericordias».", "Lamentaciones 3:22-23"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué la iglesia no corre a la zona del desastre en las primeras horas?", "Porque el rescate es de los profesionales, y llegar sin coordinación estorba", ["Porque no le importa", "Porque tiene miedo", "Sí debe correr"], "«yo estaré contigo».", "Isaías 43:2"],
      ["m1-05", 1, "o1", "recordar", "¿Quién anunció una gran hambre en tiempo de Claudio, según Hechos 11:28?", "Agabo", ["Pedro", "Esteban", "Felipe"], "«llamado Agabo, daba a entender por el Espíritu, que vendría una gran hambre».", "Hechos 11:28-29"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué actitud de la iglesia ante un desastre refleja mejor la fidelidad de Dios?", "Estar presente con orden en cada etapa y acompañar hasta la recuperación", ["Ayudar solo cuando hay cámaras", "Culpar a las víctimas", "Esperar a que otros lo hagan"], "«grande es tu fidelidad».", "Lamentaciones 3:22-23"],
      ["m1-07", 2, "o2", "recordar", "¿Qué dijo Pedro al empezar a hablar en la casa de Cornelio, según Hechos 10:34?", "En verdad comprendo que Dios no hace acepción de personas", ["Esta casa es impura", "No puedo entrar aquí", "Solo los judíos se salvan"], "«En verdad comprendo que Dios no hace acepción de personas».", "Hechos 10:34"],
      ["m1-08", 2, "o2", "comprender", "¿Qué dice el principio de la humanidad?", "Que el sufrimiento humano debe atenderse dondequiera que esté, protegiendo la vida y la dignidad", ["Que solo se ayuda a las personas buenas", "Que no se ayuda a los extranjeros", "Que se ayuda por fama"], "«que hace salir su sol sobre malos y buenos».", "Mateo 5:45"],
      ["m1-09", 2, "o2", "aplicar", "Un voluntario del albergue pregunta a cada familia su religión antes de darle la cena. ¿Qué le dices?", "Que no pregunte eso para dar la ayuda: se da a todos según la necesidad", ["Que siga preguntando", "Que dé más a los evangélicos", "Que no dé la cena"], "«sea sin acepción de personas».", "Santiago 2:1"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué la imparcialidad hace creíble el testimonio de la iglesia?", "Porque muestra un amor sin acepción de personas, como el de Dios", ["Porque da fama", "No lo hace creíble", "Porque así se reciben donaciones"], "«Dios no hace acepción de personas».", "Hechos 10:34"],
      ["m1-11", 2, "o2", "comprender", "¿Qué dice el principio de la independencia?", "Que la ayuda no se pone al servicio de fines políticos, económicos o militares", ["Que cada uno ayuda como quiere", "Que no hay que coordinarse", "Que se ayuda sin dinero"], "«que vuestra fe en nuestro glorioso Señor Jesucristo sea sin acepción de personas».", "Santiago 2:1"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué manera de ofrecer la fe en un albergue respeta mejor a las personas?", "Un culto en un horario aparte, para quien quiera, sin condicionar la ayuda", ["Un sermón obligatorio antes de comer", "Ninguna: nunca se habla de Dios", "Repartir folletos a la fuerza con la comida"], "«que hace llover sobre justos e injustos».", "Mateo 5:45"],
      ["m1-13", 3, "o3", "recordar", "¿Qué no hay que hacer con el hermano, según Isaías 58:7?", "Esconderse de él", ["Ayudarlo", "Hablarle", "Visitarlo"], "«y no te escondas de tu hermano».", "Isaías 58:7"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es la Norma Humanitaria Esencial del Manual Esfera?", "Nueve compromisos sobre la calidad de la ayuda", ["Una lista de iglesias", "Una ley de Texas", "Un manual de cocina"], "«Honrad a todos».", "1 Pedro 2:17"],
      ["m1-15", 3, "o3", "aplicar", "Tu iglesia reparte comida en un albergue y algunos adultos se quedan a solas con los niños. ¿Qué corriges?", "Que nunca un adulto esté a solas con un niño, que los voluntarios estén identificados y que haya a quién reportar un abuso", ["Nada", "Que solo los hombres cuiden", "Que los niños se cuiden solos"], "«Abre tu boca por el mudo En el juicio de todos los desvalidos».", "Proverbios 31:8"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué los principios de protección importan tanto como la comida en un albergue?", "Porque en un desastre los más débiles corren más peligro de sufrir abusos", ["Porque la comida no importa", "No importan", "Porque lo pide el pastor"], "«Abre tu boca por el mudo».", "Proverbios 31:8"],
      ["m1-17", 3, "o3", "recordar", "¿Qué pide 1 Pedro 2:17 hacer con los hermanos?", "Amarlos", ["Juzgarlos", "Evitarlos", "Mandarlos"], "«Amad a los hermanos».", "1 Pedro 2:17"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué albergue cumple mejor con el Manual Esfera?", "Uno con agua suficiente, baños limpios y separados, comidas a sus horas, protección y un trato que honra", ["Uno con camas y nada más", "Uno sin luz de noche", "Uno donde se toman fotos sin permiso"], "«Honrad a todos».", "1 Pedro 2:17"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Según qué no es acepta la ofrenda, según 2 Corintios 8:12?", "Según lo que uno no tiene", ["Según la voluntad", "Según lo que uno tiene", "Según el amor"], "«no según lo que no tiene».", "2 Corintios 8:12"],
      ["m2-02", 4, "o4", "comprender", "¿Qué dice la Publicación 3833 sobre cómo ayuda una organización caritativa en un desastre?", "Que ayuda según la necesidad, con criterios objetivos y con registros", ["Que ayuda al que más insiste", "Que no lleva registros", "Que solo ayuda a sus miembros"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["m2-03", 4, "o4", "aplicar", "Tienes que anunciar a la iglesia una ofrenda para un huracán. ¿Cómo la anuncias?", "Como una ofrenda para la ayuda en el huracán, según la necesidad, y no para personas en particular", ["Como una ofrenda para el primo del tesorero", "Sin decir para qué es", "Pidiendo efectivo a escondidas"], "«tuvieron a bien hacer una ofrenda».", "Romanos 15:26"],
      ["m2-04", 4, "o4", "analizar", "¿Por qué hay que revisar a quién se le da después de un desastre?", "Porque aparecen engaños de personas que se aprovechan de la generosidad", ["Porque nadie necesita ayuda", "No hace falta", "Porque las organizaciones siempre mienten"], "«El simple todo lo cree».", "Proverbios 14:15"],
      ["m2-05", 4, "o4", "aplicar", "Un hermano quiere mandar agua embotellada a la zona del desastre, pero nadie la pidió. ¿Qué le aconsejas?", "Preguntar a las organizaciones del lugar qué necesitan y, si no la piden, dar una ofrenda en dinero", ["Mandarla sin preguntar", "Guardarla en su casa", "Venderla"], "«si primero hay la voluntad dispuesta».", "2 Corintios 8:12"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué fondo de una iglesia para un desastre está mejor manejado?", "Uno con criterios según la necesidad, registros de cada ayuda e informes a la iglesia", ["Uno que da al que más insiste", "Uno sin registros", "Uno que decide una sola persona"], "«Mas el avisado mira bien sus pasos».", "Proverbios 14:15"],
      ["m2-07", 5, "o5", "recordar", "¿Qué le pasa al que está solo cuando cae, según Eclesiastés 4:10?", "No hay segundo que lo levante", ["Se levanta enseguida", "Lo levanta el rey", "No le pasa nada"], "«que cuando cayere, no habrá segundo que lo levante».", "Eclesiastés 4:9-10"],
      ["m2-08", 5, "o5", "comprender", "¿Qué aporta una iglesia a la respuesta coordinada de su comunidad?", "Voluntarios, un salón, cocinas, el conocimiento del barrio y la confianza de los vecinos", ["Nada", "Solo críticas", "Solo dinero"], "«no todos los miembros tienen la misma función».", "Romanos 12:4-5"],
      ["m2-09", 5, "o5", "aplicar", "Tu iglesia quiere mandar voluntarios a limpiar casas inundadas que pueden ser peligrosas. ¿Qué cuidas?", "Que vayan con una organización que coordina, capacitados y con el equipo de protección", ["Que vayan solos", "Que lleven a los niños", "Que entren sin revisar"], "«Mejores son dos que uno».", "Eclesiastés 4:9-10"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué la iglesia que se queda en la recuperación da un gran testimonio?", "Porque acompaña cuando los demás ya se fueron y la noticia se olvidó", ["Porque recibe premios", "No da testimonio", "Porque así se hace famosa"], "«somos un cuerpo en Cristo».", "Romanos 12:4-5"],
      ["m2-11", 5, "o5", "comprender", "¿Con quién coordina la oficina de manejo de emergencias del estado la ayuda de los voluntarios?", "Con la red de organizaciones voluntarias activas en desastres del estado", ["Con los cultos de las iglesias", "Con la oficina de impuestos", "Con nadie"], "«En el lugar donde oyereis el sonido de la trompeta».", "Nehemías 4:19-20"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué manera de trabajar en un desastre sigue mejor las cuatro C de National VOAD?", "Cooperar, comunicarse, coordinarse y colaborar con las demás organizaciones", ["Competir para llegar primero", "Trabajar en secreto", "Esperar a que otros llamen"], "«Mejores son dos que uno».", "Eclesiastés 4:9-10"],
      ["m2-13", 6, "o6", "recordar", "¿Bajo la mano de quién se recogía el trigo, según Génesis 41:35?", "Del faraón", ["Solo de José", "De los sacerdotes", "De los extranjeros"], "«y recojan el trigo bajo la mano de Faraón».", "Génesis 41:35-36"],
      ["m2-14", 6, "o6", "comprender", "¿Qué debe tener guardado una iglesia para un desastre?", "Agua, alimentos, linternas, un botiquín y copias de sus documentos importantes", ["Solo sillas", "Nada", "Solo instrumentos"], "«y guárdenlo».", "Génesis 41:35-36"],
      ["m2-15", 6, "o6", "aplicar", "Un recién llegado te pide que la iglesia le diga qué hacer con su caso de inmigración. ¿Qué le respondes?", "Que la iglesia lo orienta a un abogado o a un representante acreditado, porque no da consejos legales", ["Que un hermano le llena los papeles", "Que vaya con un notario", "Que no haga nada"], "«y lo amarás como a ti mismo».", "Levítico 19:34"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué la iglesia enseña a cada familia a preparar su propio plan para un desastre?", "Porque en un desastre cada familia necesita saber qué hacer antes de que llegue la ayuda", ["Porque la iglesia no quiere ayudar", "No hace falta", "Porque lo manda el gobierno"], "«el país no perecerá de hambre».", "Génesis 41:35-36"],
      ["m2-17", 6, "o6", "comprender", "¿Qué hace un equipo de bienvenida con las familias que llegan huyendo?", "Las recibe por su nombre, las ayuda con lo urgente y las acompaña en los primeros meses", ["Les pide sus papeles", "Las manda a otra ciudad", "Las ignora"], "«Como a un natural de vosotros tendréis al extranjero».", "Levítico 19:34"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué manera de recibir a una familia que huye es la mejor?", "Recibirla con calidez, ayudarla con lo urgente, acompañarla, orientarla bien y ofrecer la fe sin condiciones", ["Pedirle que se convierta para ayudarla", "Ignorarla hasta que hable inglés", "Mandarla con un notario"], "«lo amarás como a ti mismo».", "Levítico 19:34"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "obra-social-4-e1",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cómo acompaña Dios a su pueblo en el desastre y qué hace la iglesia en cada etapa.",
      ideas: [
        { id: "dios", peso: 30, texto: "Dios está con su pueblo en medio del desastre y sus misericordias no decaen.", formas: ["estare contigo", "estara con nosotros", "esta con nosotros", "misericordia*", "fidelidad", "nos acompana"] },
        { id: "etapas", peso: 30, texto: "La preparación, el rescate, el alivio y la recuperación.", formas: ["preparacion", "rescate", "alivio", "recuperacion"] },
        { id: "orden", peso: 30, texto: "Con orden: sin estorbar el rescate, por medio de quien coordina y acompañando en la recuperación.", formas: ["sin estorbar", "con orden", "quien coordina", "organizacion*", "acompan*"] },
      ],
      citas: ["Lamentaciones 3:22-23", "Isaías 43:2", "Hechos 11:28-29", "Hechos 11:29", "Romanos 12:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios no promete que no vendrán desastres, pero sí que estará con nosotros en las aguas (Isaías 43:2), y sus misericordias nunca decaen. La iglesia se prepara antes, deja el rescate a los profesionales, da alivio en los primeros días y acompaña en la recuperación, siempre con orden y por medio de quien coordina.",
    },
    {
      id: "obra-social-4-e2",
      tipo: "corta",
      pregunta: "Explica, con un versículo, cuáles son los cuatro principios humanitarios y cómo los vive la iglesia.",
      ideas: [
        { id: "nombres", peso: 30, texto: "La humanidad, la neutralidad, la imparcialidad y la independencia.", formas: ["humanidad", "neutralidad", "imparcialidad", "independencia"] },
        { id: "necesidad", peso: 30, texto: "La ayuda se da según la necesidad, sin acepción de personas.", formas: ["segun la necesidad", "acepcion de personas", "sin distinguir", "los mas vulnerables"] },
        { id: "sin_condicion", peso: 30, negativa: true, texto: "La ayuda no se condiciona a la fe ni se usa para la política.", formas: ["condicion*", "la politica", "votos", "partido", "con respeto", "sin obligar"] },
      ],
      citas: ["Hechos 10:34", "Santiago 2:1", "Mateo 5:45", "Romanos 2:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los cuatro principios son la humanidad, la neutralidad, la imparcialidad y la independencia. La iglesia ayuda según la necesidad, sin acepción de personas, porque Dios no hace acepción de personas (Hechos 10:34). No condiciona la ayuda a la fe ni la usa para la política, y ofrece el evangelio con respeto.",
    },
    {
      id: "obra-social-4-e3",
      tipo: "corta",
      pregunta: "Explica, con un versículo, qué es el Manual Esfera y qué pide para ayudar con dignidad en un albergue.",
      ideas: [
        { id: "esfera", peso: 30, texto: "Las normas mínimas de la respuesta humanitaria, con la Carta Humanitaria.", formas: ["normas minimas", "carta humanitaria", "2018", "derecho a vivir con dignidad"] },
        { id: "areas", peso: 30, texto: "El agua, el saneamiento y la higiene, la comida, el alojamiento y la salud.", formas: ["15 litros", "agua", "saneamiento", "higiene", "alojamiento", "salud", "nutricion"] },
        { id: "trato", peso: 30, texto: "Un trato que honra: privacidad, protección de los niños, explicar y escuchar.", formas: ["privacidad", "protecc* de los ninos", "proteger a los ninos", "honra*", "escuchar*", "banos separados"] },
      ],
      citas: ["Isaías 58:7", "Proverbios 31:8", "Proverbios 31:8-9", "1 Pedro 2:17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El Manual Esfera reúne las normas mínimas de la respuesta humanitaria y parte de la Carta Humanitaria: toda persona tiene derecho a vivir con dignidad. Pide agua suficiente, al menos 15 litros por persona y día, saneamiento, comida, alojamiento y salud. En el albergue se cuida la privacidad y la protección de los niños, honrando a todos (1 Pedro 2:17).",
    },
    {
      id: "obra-social-4-e4",
      tipo: "breve",
      pregunta:
        "Después de un huracán en la costa, tu iglesia quiere ayudar a las familias afectadas, entre ellas algunas de una iglesia hermana. Explica cómo darían y manejarían la ayuda, con citas bíblicas.",
      ideas: [
        { id: "dinero", peso: 25, texto: "Dar dinero a organizaciones reconocidas o a la iglesia del lugar, y solo lo que se pide.", formas: ["organizacion* reconocida*", "dinero", "ofrenda", "lo que se pide", "lo que piden", "lo que pidan"] },
        { id: "necesidad", peso: 25, texto: "Ayudar según la necesidad, a todos, sin señalar la ayuda para una persona en particular.", formas: ["segun la necesidad", "criterio*", "3833", "sin acepcion", "la necesidad"] },
        { id: "registro", peso: 25, texto: "Registrar cada ayuda e informar a la iglesia.", formas: ["registr*", "recibo*", "inform*", "cuentas claras"] },
        { id: "fraude", peso: 25, negativa: true, texto: "Cuidarse de los engaños y no darle nada a desconocidos.", formas: ["engano*", "desconocido*", "fraude*"] },
      ],
      basta: 85,
      citas: ["2 Corintios 8:12", "Romanos 15:26", "Proverbios 14:15", "Hechos 11:29", "Hechos 11:28-29", "2 Corintios 8:20-21", "Gálatas 6:10"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Anunciaría una ofrenda especial para la ayuda en el huracán, cada uno según lo que tiene, porque la ofrenda es acepta según lo que uno tiene (2 Corintios 8:12). Daríamos el dinero a la iglesia del lugar o a una organización reconocida que trabaje allí, como Macedonia y Acaya enviaron su ofrenda a Jerusalén (Romanos 15:26), y solo mandaríamos los artículos que pidan las organizaciones. La ayuda sería según la necesidad, con criterios claros, para las familias afectadas sean o no de la iglesia, y no señalada para una persona en particular, como pide la Publicación 3833 del IRS. Registraríamos cada ayuda y le informaríamos a la iglesia en qué se usó. Y avisaríamos a los hermanos que tengan cuidado con los engaños de desconocidos que llamen en nombre de las víctimas pidiendo dinero o datos, porque el avisado mira bien sus pasos (Proverbios 14:15).",
    },
    {
      id: "obra-social-4-e5",
      tipo: "breve",
      pregunta:
        "Tu iglesia recibirá en su salón, durante una semana, a treinta personas que perdieron su casa en un incendio, de acuerdo con la organización que coordina la ayuda. Explica cómo prepararías el albergue para cuidar su dignidad y su protección, con citas bíblicas.",
      ideas: [
        { id: "basico", peso: 25, texto: "Agua, baños, camas y comidas con horario.", formas: ["agua", "15 litros", "banos", "camas", "comidas", "horario*"] },
        { id: "proteccion", peso: 25, negativa: true, texto: "Voluntarios identificados, nunca un adulto a solas con un niño, y el reporte del abuso.", formas: ["identificad*", "a solas", "report*", "24 horas", "de inmediato"] },
        { id: "dignidad", peso: 25, negativa: true, texto: "Privacidad, informar, escuchar y no tomar fotos sin permiso.", formas: ["privacidad", "intimidad", "informar*", "escuchar*", "fotos", "sin permiso"] },
        { id: "imparcial", peso: 25, texto: "A todos por igual, según la necesidad, primero a los más vulnerables.", formas: ["a todos por igual", "segun la necesidad", "los mas vulnerables", "sin acepcion", "ancianos", "embarazadas"] },
      ],
      basta: 85,
      citas: ["Isaías 58:7", "Proverbios 31:8", "1 Pedro 2:17", "Santiago 2:1", "Hechos 10:34", "Mateo 25:35"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Con la organización que coordina, prepararía el salón con camas, baños limpios y separados, luz de noche y un espacio para las familias con niños. Aseguraríamos el agua, al menos 15 litros por persona y por día, como pide el Manual Esfera, y comidas con horario, porque Dios pide partir el pan con el hambriento y albergar al que no tiene casa (Isaías 58:7). Atenderíamos según la necesidad, primero a los más vulnerables, a todos por igual, sin acepción de personas (Santiago 2:1). Cuidaríamos la protección: voluntarios identificados, nunca un adulto a solas con un niño, y el reporte de cualquier sospecha de abuso de inmediato, y en 24 horas los profesionales, porque hay que abrir la boca por el desvalido (Proverbios 31:8). Y honraríamos a cada persona (1 Pedro 2:17): les informaríamos de lo que hay, escucharíamos sus quejas y cuidaríamos su intimidad, sin fotos ni preguntas innecesarias.",
    },
  ],
  breve: {
    id: "obra-social-4-b1",
    tipo: "breve",
    pregunta: "Escribe cómo se prepararía y respondería tu iglesia ante un desastre en el próximo año, usando lo aprendido en esta materia, con citas bíblicas.",
    ideas: [
      { id: "preparar", peso: 20, texto: "Un plan: el equipo, la cadena de llamadas, la lista de los más vulnerables y lo necesario guardado.", formas: ["cadena de llamadas", "un plan", "el plan", "vulnerables", "guardad*", "botiquin"] },
      { id: "principios", peso: 15, texto: "La imparcialidad y los principios humanitarios.", formas: ["imparcial*", "segun la necesidad", "acepcion de personas", "neutral*", "principios humanitarios"] },
      { id: "esfera", peso: 15, texto: "La dignidad y las normas Esfera en el albergue.", formas: ["esfera", "15 litros", "dignidad", "albergue", "privacidad"] },
      { id: "donar", peso: 15, texto: "Donar bien: dinero a organizaciones reconocidas y un fondo con registros.", formas: ["organizacion* reconocida*", "dinero", "3833", "lo que se pida", "registr*"] },
      { id: "coordinar", peso: 20, texto: "Coordinarse con otros y seguir en la recuperación a largo plazo.", formas: ["coordin*", "voad", "por cuenta propia", "largo plazo", "recuperacion"] },
      { id: "acoger", peso: 15, texto: "Recibir con amor al que llega huyendo.", formas: ["extranjero*", "huye*", "recien llegad*", "refugiad*", "como a ti mismo"] },
    ],
    basta: 85,
    citas: ["Lamentaciones 3:22-23", "Isaías 43:2", "Hechos 11:28-29", "Hechos 10:34", "Santiago 2:1", "Mateo 5:45", "Isaías 58:7", "Proverbios 31:8", "1 Pedro 2:17", "2 Corintios 8:12", "Romanos 15:26", "Proverbios 14:15", "Eclesiastés 4:9-10", "Nehemías 4:19-20", "Romanos 12:4-5", "Génesis 41:35-36", "Levítico 19:34", "Mateo 2:14"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Confiando en que las misericordias de Dios son nuevas cada mañana (Lamentaciones 3:22-23), el próximo año la iglesia tendría un plan para los desastres, como José guardó la provisión para los años de hambre (Génesis 41:35-36): un equipo responsable, una cadena de llamadas, la lista de los más vulnerables, agua, alimentos y un botiquín guardados, y el contacto con las organizaciones de la ciudad. Si llegara un desastre, dejaríamos el rescate a los profesionales y no iríamos por cuenta propia, sino coordinados con la red de organizaciones voluntarias, porque mejores son dos que uno (Eclesiastés 4:9). En el albergue ayudaríamos según la necesidad, sin acepción de personas (Santiago 2:1), con las normas del Manual Esfera: al menos 15 litros de agua por persona y día, baños limpios, privacidad y protección para los niños, honrando a todos. Daríamos dinero a organizaciones reconocidas y solo los artículos que se pidan, con un fondo con criterios y registros, como pide la Publicación 3833. Seguiríamos en la recuperación a largo plazo, junto al grupo de la comunidad. Y a las familias que lleguen huyendo las recibiríamos con amor, como a nosotros mismos (Levítico 19:34).",
  },
};
