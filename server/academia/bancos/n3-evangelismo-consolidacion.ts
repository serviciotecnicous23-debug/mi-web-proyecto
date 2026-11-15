/**
 * El banco de «Evangelismo y consolidación» (Nivel 3). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el fundamento del evangelismo · o2 el equipo y la comunidad · o3 campañas, calle, radio y redes ·
 * o4 qué es consolidar · o5 el plan de consolidación y la prudencia · o6 los obstáculos, la restauración y el fruto que
 * permanece · o7 el versículo de memoria (Colosenses 1:28).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n3-evangelismo-consolidacion-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N3_EVANGELISMO_CONSOLIDACION: BancoMateria = {
  materia: "n3-evangelismo-consolidacion",
  repaso: {
    "n3-evangelismo-consolidacion-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué mueve al creyente a evangelizar, según 2 Corintios 5:14?", "El amor de Cristo", ["El miedo al castigo", "El deseo de fama", "La obligación de cumplir una cuota"], "«Porque el amor de Cristo nos constriñe».", "2 Corintios 5:14"],
      ["1-r2", 1, "o1", "comprender", "¿Para qué da Dios a algunos el don de evangelista, según Efesios 4:12?", "Para preparar a los santos para la obra del ministerio", ["Para que hagan el trabajo de todos", "Para que gobiernen la iglesia", "Para que los demás no evangelicen"], "«A fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:12"],
      ["1-r3", 1, "o1", "comprender", "¿Con qué actitud se presenta defensa de la esperanza, según 1 Pedro 3:15?", "Con mansedumbre y reverencia", ["Con enojo", "Con presión", "Con burla"], "«Estad siempre preparados para presentar defensa con mansedumbre y reverencia».", "1 Pedro 3:15"],
    ] as P[]).map(p),
    "n3-evangelismo-consolidacion-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cómo envió Jesús a los setenta?", "De dos en dos", ["Uno por uno", "Todos juntos en un grupo", "De diez en diez"], "Los envió de dos en dos delante de él a toda ciudad y lugar.", "Lucas 10:1"],
      ["2-r2", 2, "o2", "comprender", "¿Qué es el hijo de paz de Lucas 10:6?", "La persona que recibe el mensaje y abre su casa", ["El hijo de un pastor", "Un soldado romano", "Un ángel"], "«Y si hubiere allí algún hijo de paz, vuestra paz reposará sobre él».", "Lucas 10:6"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué norma se sigue con los menores de edad al evangelizar?", "Hablar solo con permiso de sus padres y nunca a solas", ["Hablar a solas para que se abran", "Pedirles sus datos sin avisar a nadie", "Llevarlos a la iglesia sin permiso"], "La manera de evangelizar también honra a Cristo: andad sabiamente para con los de afuera.", "Colosenses 4:5"],
    ] as P[]).map(p),
    "n3-evangelismo-consolidacion-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Dónde hablaba Pablo cada día en Atenas, además de la sinagoga?", "En la plaza", ["En el palacio del rey", "En el templo de Jerusalén", "En un barco"], "«Y en la plaza cada día con los que concurrían».", "Hechos 17:17"],
      ["3-r2", 3, "o3", "comprender", "¿Cómo se responde en las redes a quien ataca la fe?", "Con amabilidad, sin peleas, y si quiere conversar, en privado", ["Con insultos", "Bloqueando a todos", "Con largas discusiones públicas"], "«El siervo del Señor no debe ser contencioso, sino amable para con todos».", "2 Timoteo 2:24"],
      ["3-r3", 3, "o3", "evaluar", "¿Cómo se mide el fruto de una campaña o de una publicación?", "Por personas que conocen a Cristo y siguen creciendo en una iglesia", ["Por la cantidad de vistas", "Por el tamaño del escenario", "Por el dinero recaudado"], "Felipe predicó a Cristo, y la gente escuchaba atentamente.", "Hechos 8:5-6"],
    ] as P[]).map(p),
    "n3-evangelismo-consolidacion-4": ([
      ["4-r1", 4, "o4", "comprender", "¿Qué hacían Pablo y Bernabé al volver a las ciudades del primer viaje?", "Confirmaban a los discípulos y los exhortaban a permanecer en la fe", ["Cobraban ofrendas", "Elegían nuevos apóstoles", "Bautizaban otra vez a todos"], "«Confirmando los ánimos de los discípulos, exhortándoles a que permaneciesen en la fe».", "Hechos 14:22"],
      ["4-r2", 4, "o4", "comprender", "¿Qué le pasa a la semilla que cae en pedregales, según Mateo 13:21?", "No tiene raíz y es de corta duración", ["Da fruto al ciento por uno", "Se la comen las aves", "La ahogan los espinos"], "«Pero no tiene raíz en sí, sino que es de corta duración».", "Mateo 13:21"],
      ["4-r3", 4, "o4", "recordar", "¿Qué manda la gran comisión: conseguir decisiones o hacer discípulos?", "Hacer discípulos", ["Conseguir decisiones", "Construir templos", "Contar asistentes"], "Jesús mandó bautizarlos y enseñarles a guardar todo lo que él mandó.", "Mateo 28:19-20"],
    ] as P[]).map(p),
    "n3-evangelismo-consolidacion-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Cuándo conviene hacer el primer contacto con un nuevo creyente?", "En las primeras 24 a 48 horas", ["Después de un mes", "Cuando él venga a buscarnos", "Al año siguiente"], "Las primeras semanas son decisivas; Pablo y Bernabé volvieron a confirmar a los discípulos.", "Hechos 14:22"],
      ["5-r2", 5, "o5", "comprender", "¿En qué se apoya la seguridad de la salvación?", "En la promesa de Dios en su Palabra", ["En lo que la persona siente un día", "En las obras de la semana", "En lo que diga el consolidador"], "«Para que sepáis que tenéis vida eterna».", "1 Juan 5:13"],
      ["5-r3", 5, "o5", "aplicar", "¿Qué hicieron Priscila y Aquila con Apolos?", "Le tomaron aparte y le expusieron más exactamente el camino de Dios", ["Lo corrigieron en público", "Lo expulsaron de la sinagoga", "Lo ignoraron"], "«Le tomaron aparte y le expusieron más exactamente el camino de Dios».", "Hechos 18:26"],
    ] as P[]).map(p),
    "n3-evangelismo-consolidacion-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo se restaura al que cae, según Gálatas 6:1?", "Con espíritu de mansedumbre", ["Con dureza", "Con indiferencia", "Con burla"], "«Restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué el consolidador trabaja con esperanza?", "Porque Dios perfeccionará la buena obra que comenzó", ["Porque todo depende de él", "Porque los nuevos creyentes nunca caen", "Porque no hay obstáculos"], "«El que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo».", "Filipenses 1:6"],
      ["6-r3", 6, "o6", "comprender", "¿Para qué nos puso Jesús, según Juan 15:16?", "Para que vayamos, llevemos fruto y nuestro fruto permanezca", ["Para que nos quedemos quietos", "Para juzgar a otros", "Para buscar fama"], "«Para que vayáis y llevéis fruto, y vuestro fruto permanezca».", "Juan 15:16"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el fundamento del evangelismo (10)
    ["f01", 1, "o1", "recordar", "¿Cuál es el mensaje del evangelismo, según 1 Corintios 15:3-4?", "Que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día", ["Que hay que ser buenos para ir al cielo", "Que todas las religiones son iguales", "Que Dios quiere hacernos ricos"], "Murió y resucitó conforme a las Escrituras.", "1 Corintios 15:3-4"],
    ["f02", 1, "o1", "comprender", "¿Qué poder prometió Jesús para ser sus testigos?", "El del Espíritu Santo", ["El de la elocuencia humana", "El del dinero", "El de los gobiernos"], "Recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo.", "Hechos 1:8"],
    ["f03", 1, "o1", "comprender", "¿Qué significa que somos embajadores en nombre de Cristo?", "Que llevamos fielmente su mensaje y hablamos en su nombre, no en el nuestro", ["Que inventamos el mensaje", "Que representamos a un país", "Que tenemos privilegios especiales"], "«Somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros».", "2 Corintios 5:20"],
    ["f04", 1, "o1", "recordar", "¿Cómo llama Hechos 21:8 a Felipe?", "Felipe el evangelista", ["Felipe el pastor", "Felipe el apóstol de los gentiles", "Felipe el profeta"], "Entraron en casa de Felipe el evangelista, que era uno de los siete.", "Hechos 21:8"],
    ["f05", 1, "o1", "analizar", "¿Qué relación hay entre el evangelista y el resto de la iglesia?", "El evangelista prepara y anima a todos a evangelizar", ["El evangelista evangeliza para que los demás no lo hagan", "No hay ninguna relación", "Los demás solo deben pagar al evangelista"], "Los dones son para perfeccionar a los santos para la obra del ministerio.", "Efesios 4:11-12"],
    ["f06", 1, "o1", "recordar", "¿Qué le pidió Pablo a Timoteo en 2 Timoteo 4:5?", "Que hiciera obra de evangelista", ["Que dejara el ministerio", "Que buscara otro trabajo", "Que evitara a los incrédulos"], "«Haz obra de evangelista, cumple tu ministerio».", "2 Timoteo 4:5"],
    ["f07", 1, "o1", "comprender", "¿Qué enseña la cadena de preguntas de Romanos 10:14?", "Que la gente no puede creer si nadie le predica", ["Que cada uno descubre a Dios solo", "Que la predicación no hace falta", "Que solo algunos pueden oír"], "«¿Y cómo oirán sin haber quien les predique?».", "Romanos 10:14"],
    ["f08", 1, "o1", "aplicar", "Una persona dice que no quiere escuchar del evangelio. ¿Qué hace el que evangeliza?", "Respeta su decisión, la trata con amor y ora por ella", ["Insiste hasta que acepte", "La asusta con amenazas", "Le promete beneficios materiales"], "Se presenta la esperanza con mansedumbre y reverencia.", "1 Pedro 3:15"],
    ["f09", 1, "o1", "analizar", "¿Por qué evangelizar no es presionar?", "Porque es el Espíritu Santo quien convence, y la fe no nace del miedo ni del engaño", ["Porque no importa si creen o no", "Porque el evangelio no es urgente", "Porque solo los pastores deben hablar"], "El amor de Cristo nos mueve a hablar, no a manipular.", "2 Corintios 5:14"],
    ["f10", 1, "o7", "recordar", "Completa Colosenses 1:28: a quien anunciamos, amonestando a todo hombre, y enseñando a todo hombre en toda sabiduría, a fin de…", "presentar perfecto en Cristo Jesús a todo hombre", ["llenar los templos", "ganar todas las discusiones", "hacernos conocidos"], "Es el versículo de memoria de la materia.", "Colosenses 1:28"],
    // ---- lección 2: el equipo y la comunidad (10)
    ["f11", 2, "o2", "recordar", "¿Qué mandó Jesús a los setenta antes de enviarlos?", "Rogar al Señor de la mies que envíe obreros a su mies", ["Comprar provisiones", "Construir un templo", "Esperar un año"], "«Rogad al Señor de la mies que envíe obreros a su mies».", "Lucas 10:2"],
    ["f12", 2, "o2", "comprender", "¿Por qué envió Jesús a sus discípulos de dos en dos?", "Para que se animaran, se cuidaran y dieran un testimonio más firme", ["Para que pelearan entre ellos", "Porque no había suficientes caminos", "Para que uno vigilara al otro"], "Los envió de dos en dos delante de él.", "Lucas 10:1"],
    ["f13", 2, "o2", "aplicar", "¿Qué hacen los intercesores en un equipo de evangelismo?", "Oran antes, durante y después por las personas y por el equipo", ["Cuentan a los asistentes", "Solo reparten folletos", "Critican a los que hablan"], "El evangelismo empieza en la oración al Señor de la mies.", "Lucas 10:2"],
    ["f14", 2, "o2", "aplicar", "¿Qué hace el líder de un equipo de evangelismo?", "Prepara el plan, reparte las tareas, cuida la seguridad y reúne al equipo para orar y evaluar", ["Habla solo él", "Se queda en casa", "Decide sin escuchar a nadie"], "Hágase todo decentemente y con orden.", "1 Corintios 14:40"],
    ["f15", 2, "o2", "comprender", "¿Qué saludo enseñó Jesús al entrar en una casa?", "Paz sea a esta casa", ["Arrepentíos o pereceréis", "Dadnos de comer", "Escuchad nuestro mensaje"], "«Primeramente decid: Paz sea a esta casa».", "Lucas 10:5"],
    ["f16", 2, "o2", "recordar", "¿Cómo enseñaba Pablo en Éfeso, según Hechos 20:20?", "Públicamente y por las casas", ["Solo en la sinagoga", "Solo por cartas", "Solo a los líderes"], "«Públicamente y por las casas».", "Hechos 20:20"],
    ["f17", 2, "o2", "aplicar", "¿Qué hace falta antes de tomar una foto o anotar los datos de una persona?", "Pedir su permiso y guardar los datos solo para el seguimiento", ["Nada: se puede publicar todo", "Pedir permiso a un vecino", "Publicarla para que todos oren"], "Andad sabiamente para con los de afuera.", "Colosenses 4:5"],
    ["f18", 2, "o2", "comprender", "¿Cómo abre puertas el servicio a la comunidad?", "Mostrando el amor de Cristo con hechos, que preparan para escuchar el evangelio", ["Reemplazando la predicación", "Comprando la conversión de la gente", "Haciendo famosa a la iglesia"], "Sea vuestra palabra siempre con gracia: la manera de servir también predica.", "Colosenses 4:6"],
    ["f19", 2, "o2", "recordar", "¿Cómo debe ser nuestra palabra con los de afuera, según Colosenses 4:6?", "Siempre con gracia, sazonada con sal", ["Dura y cortante", "Llena de quejas", "Solo de doctrina"], "«Sea vuestra palabra siempre con gracia, sazonada con sal».", "Colosenses 4:6"],
    ["f20", 2, "o2", "aplicar", "¿Qué hace el equipo al terminar una salida de evangelismo?", "Ora por las personas, revisa los contactos y reparte quién llamará a cada una", ["Se va sin hablar", "Publica fotos de todos", "Olvida los contactos"], "Así se busca el fruto que permanece.", "Juan 15:16"],
    // ---- lección 3: campañas, calle, radio y redes (10)
    ["f21", 3, "o3", "recordar", "¿Cómo escuchó la gente a Felipe en Samaria?", "Unánime, escuchaba atentamente", ["Con burlas", "Sin interés", "Con violencia"], "«Y la gente, unánime, escuchaba atentamente las cosas que decía Felipe».", "Hechos 8:6"],
    ["f22", 3, "o3", "comprender", "¿Qué necesita una campaña de evangelismo bien preparada?", "Oración por semanas, una invitación clara, predicación centrada en Cristo y un equipo para atender a quienes responden", ["Solo un buen sonido", "Muchos artistas famosos", "Un llamado con presión"], "Felipe les predicaba a Cristo.", "Hechos 8:5"],
    ["f23", 3, "o3", "aplicar", "¿Qué pide el evangelismo en la calle?", "Un mensaje corto y claro, testimonios reales, permisos y disposición a conversar", ["Gritarle a la gente", "Discutir con todos", "Obligar a escuchar"], "Pablo conversaba en la plaza cada día con los que concurrían.", "Hechos 17:17"],
    ["f24", 3, "o3", "comprender", "¿Por qué la radio es un medio valioso para el evangelio?", "Porque entra en casas, carros, hospitales y cárceles donde ningún predicador podría entrar", ["Porque reemplaza a la iglesia", "Porque no necesita seguimiento", "Porque nadie la escucha"], "La palabra de Dios no está presa.", "2 Timoteo 2:9"],
    ["f25", 3, "o3", "aplicar", "¿Cómo es un buen contenido evangelístico en las redes?", "Breve, verdadero, centrado en Cristo y con respuestas llenas de amor", ["Largo, polémico y en busca de peleas", "Con datos de personas sin permiso", "Con promesas de milagros a cambio de dinero"], "El siervo del Señor no debe ser contencioso, sino amable para con todos.", "2 Timoteo 2:24"],
    ["f26", 3, "o3", "aplicar", "En una publicación alguien se burla del evangelio. ¿Qué haces?", "Respondo con amabilidad, sin pelear, y si quiere conversar lo invito a un mensaje privado", ["Lo insulto", "Respondo con burlas", "Publico sus datos"], "«El siervo del Señor no debe ser contencioso, sino amable para con todos».", "2 Timoteo 2:24"],
    ["f27", 3, "o3", "evaluar", "¿Cuál es una buena pregunta para evaluar una actividad de evangelismo?", "¿Se anunció con claridad que Cristo murió y resucitó, y se llamó al arrepentimiento y a la fe?", ["¿Cuánta comida sobró?", "¿Qué tan famoso fue el invitado?", "¿Cuántas fotos se tomaron?"], "El mensaje es el evangelio de la muerte y la resurrección de Cristo.", "1 Corintios 15:3-4"],
    ["f28", 3, "o3", "evaluar", "¿Por qué hay que contar los resultados con honestidad?", "Porque inflar los números es mentir y deshonra el evangelio", ["Porque así se consiguen más ofrendas", "Porque no importa contarlos", "Para competir con otras iglesias"], "Desechando la mentira, hablad verdad cada uno con su prójimo.", "Efesios 4:25"],
    ["f29", 3, "o3", "comprender", "¿Qué cambia y qué no cambia al evangelizar por distintos medios?", "Cambian los medios; el mensaje del evangelio no cambia", ["Cambia el mensaje según el medio", "No cambia nada", "El medio es más importante que el mensaje"], "Cristo murió y resucitó: ese es el mensaje en la plaza, en la radio o en las redes.", "1 Corintios 15:3-4"],
    ["f30", 3, "o3", "evaluar", "Una campaña reunió a mil personas, pero nadie tomó contactos para el seguimiento. ¿Qué le faltó?", "Un plan de seguimiento para que el fruto permanezca", ["Más gente", "Más música", "Nada: fue un éxito"], "Jesús nos puso para que llevemos fruto y nuestro fruto permanezca.", "Juan 15:16"],
    // ---- lección 4: qué es consolidar (10)
    ["f31", 4, "o4", "comprender", "¿Qué significa consolidar?", "Afirmar al nuevo creyente para que eche raíces en Cristo y en la iglesia", ["Contar a los convertidos", "Cobrar una cuota", "Darle un cargo en la iglesia"], "Pablo y Bernabé volvieron confirmando los ánimos de los discípulos.", "Hechos 14:22"],
    ["f32", 4, "o4", "recordar", "¿A qué ciudades volvieron Pablo y Bernabé para confirmar a los discípulos?", "A Listra, a Iconio y a Antioquía", ["A Roma, Atenas y Corinto", "A Jerusalén, Samaria y Damasco", "A Éfeso, Filipos y Tesalónica"], "Volvieron a Listra, a Iconio y a Antioquía, confirmando los ánimos de los discípulos.", "Hechos 14:21-22"],
    ["f33", 4, "o4", "analizar", "¿Qué enseña la semilla en pedregales sobre los nuevos creyentes?", "Que sin raíz la fe es de corta duración, y por eso necesitan cuidado", ["Que algunos nunca pueden creer", "Que el gozo es malo", "Que no hay que sembrar en ellos"], "«Pero no tiene raíz en sí, sino que es de corta duración».", "Mateo 13:21"],
    ["f34", 4, "o4", "comprender", "¿Con qué compara Pedro a los nuevos creyentes en 1 Pedro 2:2?", "Con niños recién nacidos que desean la leche espiritual", ["Con soldados", "Con ancianos", "Con siervos"], "Desead, como niños recién nacidos, la leche espiritual no adulterada.", "1 Pedro 2:2"],
    ["f35", 4, "o4", "recordar", "¿Cómo cuidó Pablo a los tesalonicenses?", "Como la nodriza que cuida con ternura a sus propios hijos", ["Como un juez severo", "Como un jefe distante", "Como un extraño"], "«Como la nodriza que cuida con ternura a sus propios hijos».", "1 Tesalonicenses 2:7"],
    ["f36", 4, "o4", "comprender", "¿Cuál es la meta de Pablo en Colosenses 1:28?", "Presentar perfecto en Cristo Jesús a todo hombre", ["Tener una iglesia grande", "Ganar todas las discusiones", "Ser reconocido"], "Amonestando y enseñando a todo hombre en toda sabiduría.", "Colosenses 1:28"],
    ["f37", 4, "o4", "analizar", "¿Qué diferencia hay entre conseguir decisiones y hacer discípulos?", "Hacer discípulos incluye bautizar y enseñar a guardar todo lo que Jesús mandó", ["No hay diferencia", "Las decisiones bastan", "Hacer discípulos es solo bautizar"], "Jesús mandó bautizarlos y enseñarles a guardar todo lo que él mandó.", "Mateo 28:19-20"],
    ["f38", 4, "o4", "comprender", "¿Por qué las primeras semanas del nuevo creyente son decisivas?", "Porque tiene preguntas y presiones, y todavía no conoce la Biblia ni la iglesia", ["Porque ya sabe todo", "Porque no enfrenta problemas", "Porque solo necesita asistir"], "La semilla sin raíz tropieza cuando llega la aflicción.", "Mateo 13:21"],
    ["f39", 4, "o4", "aplicar", "¿Qué imagen describe a una iglesia que evangeliza mucho y consolida poco?", "Una casa con la puerta de atrás abierta: entra mucha gente y se va otra tanta", ["Un templo lleno para siempre", "Una iglesia sin problemas", "Una fiesta permanente"], "Pablo y Bernabé no se fueron sin volver a confirmar a los discípulos.", "Hechos 14:22"],
    ["f40", 4, "o4", "aplicar", "¿Cuándo se planea el seguimiento de los nuevos creyentes?", "Al mismo tiempo que se planea el evangelismo", ["Solo si alguien lo pide", "Un año después", "Nunca"], "Consolidar es parte del mismo mandato de hacer discípulos.", "Mateo 28:19-20"],
    // ---- lección 5: el plan de consolidación (10)
    ["f41", 5, "o5", "recordar", "¿Cuál es el primer paso del plan de consolidación?", "El contacto en las primeras 24 a 48 horas", ["El bautismo inmediato", "Darle un cargo", "Esperar a que vuelva solo"], "Las primeras horas sirven para orar y escuchar; así se confirma el ánimo del nuevo creyente.", "Hechos 14:22"],
    ["f42", 5, "o5", "comprender", "¿Qué pasaje ayuda a dar seguridad de la salvación?", "1 Juan 5:11-13: el que tiene al Hijo tiene la vida", ["Jueces 21:25", "Eclesiastés 1:2", "Levítico 11:3"], "«Para que sepáis que tenéis vida eterna».", "1 Juan 5:13"],
    ["f43", 5, "o5", "recordar", "¿Qué hicieron los que recibieron la palabra en Pentecostés, según Hechos 2:41?", "Fueron bautizados", ["Volvieron a sus casas sin más", "Construyeron un templo", "Hicieron un voto de silencio"], "Los que recibieron su palabra fueron bautizados.", "Hechos 2:41"],
    ["f44", 5, "o5", "comprender", "¿En qué se integra el nuevo creyente, según Hechos 2:42?", "En la doctrina, la comunión, el partimiento del pan y las oraciones de la iglesia", ["En un club social", "En una empresa", "En un partido"], "«Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones».", "Hechos 2:42"],
    ["f45", 5, "o5", "aplicar", "¿Qué material puede usarse para el discipulado básico del nuevo creyente?", "El Nivel 1 de la academia, estudiado junto con él", ["Ninguno: aprende solo", "Solo videos al azar", "Una novela"], "Enseñándoles que guarden todo lo que Jesús mandó.", "Mateo 28:20"],
    ["f46", 5, "o5", "analizar", "¿Por qué el consolidador no debe hacer que el nuevo creyente dependa de él?", "Porque su tarea es llevarlo a Cristo y a la iglesia", ["Porque no le importa", "Porque así ahorra tiempo", "Porque la iglesia no sirve"], "Priscila y Aquila le expusieron a Apolos el camino de Dios, no un camino propio.", "Hechos 18:26"],
    ["f47", 5, "o5", "aplicar", "¿Qué norma de prudencia se sigue en el acompañamiento personal?", "Se hace entre personas del mismo sexo, o en pareja o en familia", ["Se hace a solas con cualquiera, sin avisar", "Se hace solo de noche", "No hay normas"], "Absteneos de toda especie de mal.", "1 Tesalonicenses 5:22"],
    ["f48", 5, "o5", "aplicar", "El nuevo creyente cuenta que tiene ideas de hacerse daño. ¿Qué hace el consolidador?", "Busca enseguida al pastor y la ayuda adecuada, sin dejarlo solo", ["Lo guarda en secreto", "Le dice que ore más y se va", "Lo ignora"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
    ["f49", 5, "o5", "recordar", "¿Qué requisito del Nivel 3 se relaciona con esta materia?", "Consolidar a un nuevo creyente", ["Predicar en una campaña nacional", "Escribir un libro", "Viajar como misionero"], "Lo que has oído, encárgalo a hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
    ["f50", 5, "o5", "comprender", "¿Qué cuatro generaciones aparecen en 2 Timoteo 2:2?", "Pablo, Timoteo, los hombres fieles y los otros a quienes ellos enseñarán", ["Abraham, Isaac, Jacob y José", "Pedro, Juan, Santiago y Andrés", "Moisés, Josué, Caleb y Aarón"], "«Esto encarga a hombres fieles que sean idóneos para enseñar también a otros».", "2 Timoteo 2:2"],
    // ---- lección 6: obstáculos, restauración y fruto (10)
    ["f51", 6, "o6", "aplicar", "El nuevo creyente enfrenta la oposición de su familia. ¿Cómo lo ayudas?", "Con ánimo, oración y sabiduría para que responda con amor", ["Diciéndole que abandone a su familia", "Discutiendo con su familia", "Ignorando el problema"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
    ["f52", 6, "o6", "comprender", "¿Qué necesita el nuevo creyente que vuelve a sus antiguas costumbres?", "Nuevas amistades en la iglesia y ayuda práctica para cambiar", ["Que lo expulsen", "Que nadie le hable", "Que lo avergüencen en público"], "Restauradle con espíritu de mansedumbre.", "Gálatas 6:1"],
    ["f53", 6, "o6", "comprender", "¿Qué significa restaurar al que cae?", "Ayudarlo a confesar, recibir el perdón y volver a caminar", ["Justificar su pecado", "Humillarlo", "Olvidarse de él"], "«Restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
    ["f54", 6, "o6", "recordar", "¿Qué advierte Gálatas 6:1 al que restaura?", "Que se cuide a sí mismo, no sea que él también sea tentado", ["Que no lo haga nunca", "Que lo haga con enojo", "Que lo cuente a todos"], "Considerándote a ti mismo, no sea que tú también seas tentado.", "Gálatas 6:1"],
    ["f55", 6, "o6", "comprender", "¿Quién da el crecimiento, según 1 Corintios 3:6?", "Dios", ["El que planta", "El que riega", "El pastor"], "Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios.", "1 Corintios 3:6"],
    ["f56", 6, "o6", "aplicar", "¿Qué hace el consolidador ante una adicción o violencia en el hogar del nuevo creyente?", "Avisa enseguida al pastor y busca la ayuda adecuada, también profesional o de las autoridades si hay peligro", ["Lo resuelve solo y en secreto", "No hace nada", "Le dice que es su culpa"], "Proteger al que sufre también es sobrellevar su carga.", "Gálatas 6:2"],
    ["f57", 6, "o6", "comprender", "¿Qué promete Filipenses 1:6?", "Que Dios perfeccionará la buena obra que comenzó", ["Que no habrá problemas", "Que todo depende de nosotros", "Que la obra terminará pronto"], "«El que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo».", "Filipenses 1:6"],
    ["f58", 6, "o6", "analizar", "¿Cuál es la meta de la consolidación según Juan 15:16?", "Fruto que permanece", ["Muchas decisiones en un día", "Una iglesia famosa", "Un registro lleno de nombres"], "«Para que vayáis y llevéis fruto, y vuestro fruto permanezca».", "Juan 15:16"],
    ["f59", 6, "o6", "analizar", "¿Cuándo se completa el círculo del evangelismo y la consolidación?", "Cuando el que fue acompañado empieza a acompañar a otro", ["Cuando se bautiza", "Cuando asiste un domingo", "Nunca"], "Hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
    ["f60", 6, "o6", "aplicar", "¿Cómo se responde a las dudas de un nuevo creyente?", "Con respuestas de la Palabra y con la paciencia de quien escucha sin juzgar", ["Con burlas", "Diciéndole que no pregunte", "Mandándolo a otra iglesia"], "Estad siempre preparados para presentar defensa con mansedumbre.", "1 Pedro 3:15"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué significa ser embajador de Cristo?", "Hablar en nombre de Cristo, como si Dios rogara por medio de nosotros", ["Ser un diplomático del gobierno", "Viajar por el mundo", "Tener un título"], "«Como si Dios rogase por medio de nosotros».", "2 Corintios 5:20"],
      ["m1-02", 1, "o1", "comprender", "¿Quiénes son llamados a ser testigos de Cristo?", "Todos los creyentes", ["Solo los pastores", "Solo los evangelistas", "Solo los misioneros"], "Me seréis testigos, dijo Jesús a sus discípulos.", "Hechos 1:8"],
      ["m1-03", 1, "o1", "recordar", "¿Cuál es el ruego final de 2 Corintios 5:20?", "Reconciliaos con Dios", ["Dad vuestras ofrendas", "Venid al templo", "Guardad la ley"], "«Os rogamos en nombre de Cristo: Reconciliaos con Dios».", "2 Corintios 5:20"],
      ["m1-04", 1, "o1", "aplicar", "¿Qué actitud muestra el que confía en que el Espíritu Santo convence?", "Habla con valor y deja que el Espíritu obre", ["Presiona para conseguir resultados", "Se rinde si no ve fruto", "Discute hasta ganar"], "El poder para ser testigos viene del Espíritu Santo.", "Hechos 1:8"],
      ["m1-05", 1, "o1", "comprender", "¿Por qué la iglesia no espera que la gente llegue sola?", "Porque nadie puede creer si no oye, y nadie oye si nadie le predica", ["Porque no le gusta esperar", "Porque así lo exige la ley", "Porque quiere más ofrendas"], "¿Y cómo creerán en aquel de quien no han oído?", "Romanos 10:14"],
      ["m1-06", 1, "o7", "recordar", "¿Qué cita empieza: a quien anunciamos, amonestando a todo hombre…?", "Colosenses 1:28", ["Romanos 1:16", "Marcos 16:15", "Hechos 1:8"], "Es el versículo de memoria de la materia.", "Colosenses 1:28"],
      ["m1-07", 2, "o2", "recordar", "¿Cuántos fueron enviados de dos en dos en Lucas 10?", "Setenta", ["Doce", "Tres", "Ciento veinte"], "Designó el Señor también a otros setenta.", "Lucas 10:1"],
      ["m1-08", 2, "o2", "comprender", "¿Qué dijo Jesús de la mies y de los obreros?", "Que la mies es mucha y los obreros pocos", ["Que la mies es poca", "Que sobran obreros", "Que no hay mies"], "«La mies a la verdad es mucha, mas los obreros pocos».", "Lucas 10:2"],
      ["m1-09", 2, "o2", "aplicar", "¿Por qué conviene salir a evangelizar con el conocimiento de los líderes?", "Por orden y cuidado, y para coordinar el seguimiento", ["Para pedir permiso de hablar de Cristo", "Para que ellos lo hagan", "No conviene"], "Hágase todo decentemente y con orden.", "1 Corintios 14:40"],
      ["m1-10", 2, "o2", "comprender", "Según Lucas 10:6, ¿qué pasa si en la casa no hay un hijo de paz?", "La paz se vuelve a los discípulos", ["Deben quedarse a discutir", "Deben maldecir la casa", "Deben insistir hasta que acepten"], "«Y si no, se volverá a vosotros».", "Lucas 10:6"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué se hace en un lugar público que exige permiso para las actividades?", "Pedir el permiso y respetar a los vecinos", ["Ignorar las reglas", "Hacerlo de noche para que no vean", "Discutir con la autoridad"], "Andad sabiamente para con los de afuera.", "Colosenses 4:5"],
      ["m1-12", 2, "o2", "analizar", "¿Por qué la manera de evangelizar también predica?", "Porque un equipo amable, puntual y respetuoso honra el mensaje", ["Porque las formas no importan", "Porque basta con hablar fuerte", "Porque la gente no se fija"], "Sea vuestra palabra siempre con gracia.", "Colosenses 4:6"],
      ["m1-13", 3, "o3", "recordar", "¿A quién predicaba Felipe en Samaria?", "A Cristo", ["La ley de Moisés", "Solo su propia historia", "Las tradiciones de los ancianos"], "«Les predicaba a Cristo».", "Hechos 8:5"],
      ["m1-14", 3, "o3", "comprender", "¿Cómo debe ser el llamado al final de una campaña?", "Claro y respetuoso, sin manipulación", ["Con mucha presión", "Con amenazas", "Con promesas de riqueza"], "El amor de Cristo nos mueve, no la manipulación.", "2 Corintios 5:14"],
      ["m1-15", 3, "o3", "aplicar", "¿Qué hace un programa de radio para evangelizar bien?", "Presenta a Cristo con claridad, cuenta vidas cambiadas, invita a llamar o escribir y da seguimiento", ["Solo pone música", "Pide dinero todo el tiempo", "Habla de política"], "La palabra de Dios no está presa.", "2 Timoteo 2:9"],
      ["m1-16", 3, "o3", "aplicar", "¿Dónde conviene seguir una conversación personal que empezó en las redes?", "En un mensaje privado y, si la persona quiere, en una iglesia cercana", ["En los comentarios públicos", "En otra red para pelear", "En ningún lado"], "Con mansedumbre corrija a los que se oponen.", "2 Timoteo 2:25"],
      ["m1-17", 3, "o3", "evaluar", "¿Cuál de estas campañas fue más fiel?", "La que anunció a Cristo con claridad y dejó un plan de seguimiento", ["La que tuvo más público sin anunciar el evangelio", "La que prometió milagros a cambio de ofrendas", "La que contó más asistentes de los que hubo"], "El mensaje es Cristo, y el fruto debe permanecer.", "Juan 15:16"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué falta en una publicación que muestra la foto de un nuevo creyente sin su permiso?", "El respeto a su privacidad", ["Más colores", "Más palabras", "Nada"], "Andad sabiamente para con los de afuera.", "Colosenses 4:5"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué significa la palabra consolidar?", "Afirmar, dar firmeza", ["Contar", "Cobrar", "Separar"], "Pablo y Bernabé confirmaban los ánimos de los discípulos.", "Hechos 14:22"],
      ["m2-02", 4, "o4", "comprender", "¿A qué exhortaban Pablo y Bernabé a los discípulos?", "A que permanecieran en la fe", ["A que se mudaran a Jerusalén", "A que dejaran de reunirse", "A que guardaran la ley de Moisés"], "«Exhortándoles a que permaneciesen en la fe».", "Hechos 14:22"],
      ["m2-03", 4, "o4", "comprender", "¿Qué le pasa a la semilla en pedregales cuando llega la aflicción?", "Tropieza, porque no tiene raíz", ["Da más fruto", "Se fortalece sola", "Nada"], "Al venir la aflicción o la persecución por causa de la palabra, luego tropieza.", "Mateo 13:21"],
      ["m2-04", 4, "o4", "recordar", "¿Qué desean los niños recién nacidos de 1 Pedro 2:2?", "La leche espiritual no adulterada", ["Alimento sólido", "Riquezas", "Fama"], "Para que por ella crezcáis para salvación.", "1 Pedro 2:2"],
      ["m2-05", 4, "o4", "comprender", "Además del evangelio, ¿qué quería entregar Pablo a los tesalonicenses?", "Su propia vida", ["Dinero", "Un templo", "Un cargo"], "Hubiéramos querido entregaros también nuestras propias vidas.", "1 Tesalonicenses 2:8"],
      ["m2-06", 4, "o4", "analizar", "¿Por qué la consolidación es parte del evangelismo?", "Porque la meta es hacer discípulos, no solo conseguir decisiones", ["Porque así se cuentan más personas", "Porque el evangelismo no importa", "Porque lo pide la ley"], "Presentar perfecto en Cristo Jesús a todo hombre.", "Colosenses 1:28"],
      ["m2-07", 5, "o5", "recordar", "¿Qué paso del plan viene después del bautismo?", "La integración a un grupo y a la iglesia", ["El primer contacto", "La seguridad de la salvación", "Nada más"], "Perseveraban en la comunión unos con otros.", "Hechos 2:42"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué la seguridad de la salvación no depende de lo que uno siente?", "Porque se apoya en la promesa de Dios", ["Porque los sentimientos son malos", "Porque nadie puede saberlo", "Porque depende de las obras"], "Estas cosas os he escrito para que sepáis que tenéis vida eterna.", "1 Juan 5:13"],
      ["m2-09", 5, "o5", "aplicar", "¿Qué haces con los datos de contacto de un nuevo creyente?", "Los anoto con su permiso, solo lo necesario, y los guardo con cuidado", ["Los publico en las redes", "Los comparto con cualquiera", "Los pierdo"], "Andad sabiamente para con los de afuera.", "Colosenses 4:5"],
      ["m2-10", 5, "o5", "aplicar", "¿Cómo se acompaña a un menor de edad que creyó?", "Siempre con conocimiento de sus padres y nunca a solas", ["A solas para que tenga confianza", "Sin avisar a nadie", "Solo con mensajes privados secretos"], "Absteneos de toda especie de mal.", "1 Tesalonicenses 5:22"],
      ["m2-11", 5, "o5", "comprender", "¿Cómo es un buen consolidador?", "Un creyente maduro que acompaña con paciencia y lleva a la persona a Cristo y a la iglesia", ["Alguien que busca seguidores propios", "Cualquiera que tenga tiempo libre", "Alguien que juzga"], "Priscila y Aquila le expusieron más exactamente el camino de Dios.", "Hechos 18:26"],
      ["m2-12", 5, "o5", "aplicar", "¿Qué haces si el nuevo creyente vive violencia en su hogar?", "Avisas al pastor y buscas protección y la ayuda adecuada", ["Lo guardas en secreto", "Le dices que aguante", "No haces nada"], "Sobrellevad los unos las cargas de los otros.", "Gálatas 6:2"],
      ["m2-13", 6, "o6", "recordar", "¿Qué ley se cumple al sobrellevar las cargas unos de otros?", "La ley de Cristo", ["La ley de Moisés", "La ley romana", "Ninguna"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
      ["m2-14", 6, "o6", "comprender", "¿Qué necesita el nuevo creyente que tiene dudas?", "Respuestas de la Palabra y alguien que lo escuche sin juzgar", ["Que se calle", "Que deje de preguntar", "Que estudie solo"], "Presentar defensa con mansedumbre y reverencia.", "1 Pedro 3:15"],
      ["m2-15", 6, "o6", "aplicar", "¿Qué ayuda al creyente al que le cuesta ser constante?", "Un plan sencillo y alguien que lo acompañe", ["Un regaño", "Más tareas difíciles", "Dejarlo solo"], "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras».", "Hebreos 10:24"],
      ["m2-16", 6, "o6", "comprender", "Según 1 Corintios 3:6, ¿quién plantó y quién regó en Corinto?", "Pablo plantó y Apolos regó", ["Pedro plantó y Juan regó", "Bernabé plantó y Silas regó", "Timoteo plantó y Tito regó"], "Pero el crecimiento lo ha dado Dios.", "1 Corintios 3:6"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué la meta no son los números?", "Porque lo que cuenta son discípulos que permanecen en Cristo y se multiplican", ["Porque los números no se pueden contar", "Porque no importa el fruto", "Porque solo cuenta el pastor"], "Para que vuestro fruto permanezca.", "Juan 15:16"],
      ["m2-18", 6, "o6", "aplicar", "¿Qué pasos completan el círculo de la misión?", "Evangelizar, consolidar, discipular y enviar", ["Invitar, cobrar y olvidar", "Predicar y desaparecer", "Esperar y juzgar"], "Encarga a hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
    ] as P[]).map(p),
  },
  // las escritas del examen final: una corta (de 3) y un escrito breve (de 2) por intento
  escritas: [
    {
      id: "n3-evangelismo-consolidacion-e1",
      tipo: "corta",
      pregunta: "Explica el mensaje, el poder y el motivo del evangelismo, con un texto bíblico.",
      ideas: [
        { id: "mensaje", peso: 30, texto: "El mensaje: Cristo murió por nuestros pecados y resucitó.", formas: ["murio", "resucito", "sepultado", "cruz"] },
        { id: "poder", peso: 30, texto: "El poder del Espíritu Santo.", formas: ["espiritu santo", "poder"] },
        { id: "motivo", peso: 30, texto: "El motivo: el amor de Cristo.", formas: ["amor de cristo", "amor", "constriñe", "constrine"] },
      ],
      citas: ["1 Corintios 15:3-4", "Hechos 1:8", "2 Corintios 5:14", "2 Corintios 5:20", "Romanos 10:14", "Romanos 1:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El mensaje es el evangelio: Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día (1 Corintios 15:3-4). El poder es el del Espíritu Santo, que Jesús prometió para que seamos sus testigos. Y el motivo es el amor, porque el amor de Cristo nos constriñe a hablar como embajadores suyos.",
    },
    {
      id: "n3-evangelismo-consolidacion-e2",
      tipo: "corta",
      pregunta: "Describe cómo se organiza un equipo de evangelismo y dos normas de respeto o de seguridad.",
      ideas: [
        { id: "dosendos", peso: 20, texto: "De dos en dos, en pareja o en equipo.", formas: ["dos en dos", "pareja", "equipo"] },
        { id: "oracion", peso: 20, texto: "La oración y los intercesores.", formas: ["orar", "oracion", "intercesor*", "oran"] },
        { id: "roles", peso: 20, texto: "Los papeles: los que hablan, los que acompañan y un líder.", formas: ["lider", "hablan", "acompañ*", "acompan*", "tareas"] },
        { id: "normas", peso: 30, texto: "Dos normas: respetar a quien no quiere escuchar, el permiso de los padres con los menores, la privacidad, la seguridad.", formas: ["permiso", "menores", "padres", "privacidad", "respet*", "seguridad"] },
      ],
      citas: ["Lucas 10:1-2", "Lucas 10:1", "Lucas 10:2", "Lucas 10:5-6", "Colosenses 4:5-6", "Hechos 20:20", "1 Corintios 14:40"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús envió a sus discípulos de dos en dos y les mandó orar al Señor de la mies (Lucas 10:1-2). Un equipo tiene intercesores que oran, personas que hablan, otras que acompañan y un líder que reparte las tareas. Normas: respetar a quien no quiere escuchar y, con los menores, hablar solo con permiso de sus padres.",
    },
    {
      id: "n3-evangelismo-consolidacion-e3",
      tipo: "corta",
      pregunta: "Explica qué es la consolidación y por qué la meta es hacer discípulos y no solo conseguir decisiones.",
      ideas: [
        { id: "consolidar", peso: 30, texto: "Consolidar es afirmar y acompañar al nuevo creyente para que eche raíces.", formas: ["afirmar", "firmeza", "raices", "acompañ*", "acompan*", "cuidar", "confirm*"] },
        { id: "discipulos", peso: 30, texto: "La meta es hacer discípulos: bautizar y enseñar.", formas: ["discipulos", "discipular", "enseñ*", "ensen*", "bautiz*"] },
        { id: "raiz", peso: 15, texto: "Sin raíz, la fe es de corta duración.", formas: ["corta duracion", "primeras semanas", "recien nacido*", "sin raiz", "se pierda", "se pierde"] },
        { id: "meta", peso: 15, texto: "Creyentes maduros que permanecen.", formas: ["perfecto en cristo", "madur*", "permanez*", "permanec*"] },
      ],
      citas: ["Hechos 14:21-22", "Hechos 14:22", "Mateo 13:20-21", "Mateo 28:19-20", "Colosenses 1:28", "1 Pedro 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Consolidar es afirmar al nuevo creyente para que eche raíces en Cristo y en la iglesia, como Pablo y Bernabé, que volvieron confirmando a los discípulos (Hechos 14:22). Sin raíz, la fe es de corta duración. La meta no son decisiones, sino discípulos bautizados y enseñados, maduros, que permanecen: presentar perfecto en Cristo a todo hombre.",
    },
    {
      id: "n3-evangelismo-consolidacion-e4",
      tipo: "breve",
      pregunta:
        "Diseña un plan de consolidación para un nuevo creyente: los pasos desde el primer contacto hasta el servicio, el papel del consolidador y dos normas de prudencia. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "contacto", peso: 15, texto: "El primer contacto en las primeras 24 a 48 horas.", formas: ["48 horas", "primer contacto", "llamada", "llamar"] },
        { id: "visita", peso: 10, texto: "La visita.", formas: ["visita", "visitar"] },
        { id: "seguridad", peso: 15, texto: "La seguridad de la salvación.", formas: ["seguridad", "vida eterna"] },
        { id: "bautismo", peso: 10, texto: "El bautismo.", formas: ["bautismo", "bautiz*"] },
        { id: "integracion", peso: 10, texto: "La integración a un grupo y a la iglesia.", formas: ["grupo", "integr*", "comunion"] },
        { id: "discipulado", peso: 10, texto: "El discipulado básico.", formas: ["discipulado", "nivel 1", "estudiar", "estudiariamos"] },
        { id: "servicio", peso: 10, texto: "El servicio y los dones.", formas: ["servir", "servicio", "dones"] },
        { id: "prudencia", peso: 20, texto: "El papel del consolidador y las normas de prudencia.", formas: ["mismo sexo", "menores", "padres", "pastor", "discrecion", "permiso", "no a depender"] },
      ],
      basta: 85,
      citas: ["1 Juan 5:11-13", "1 Juan 5:13", "Hechos 2:41-42", "Hechos 2:41", "Hechos 2:42", "Hechos 18:26", "Hechos 14:22", "Colosenses 1:28", "2 Timoteo 2:2"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Mi plan empieza con el primer contacto en las primeras 24 a 48 horas: una llamada para saludar a la persona, orar con ella y escuchar sus preguntas. Después haría una visita a su casa, con mi esposa, para conocer a su familia y orar juntos. En las primeras semanas estudiaríamos la seguridad de la salvación, porque Juan escribió para que sepamos que tenemos vida eterna (1 Juan 5:13). Luego la animaría al bautismo, como los que creyeron en Pentecostés (Hechos 2:41), y a integrarse a un grupo pequeño y a la iglesia, donde se persevera en la doctrina, la comunión y la oración (Hechos 2:42). Para el discipulado estudiaríamos juntos el Nivel 1 de la academia, y con el tiempo la ayudaría a descubrir sus dones y a servir. Como consolidador, mi papel es acompañar con paciencia, como Priscila y Aquila con Apolos, y llevarla a Cristo y a la iglesia, no a depender de mí. Dos normas de prudencia: el acompañamiento personal lo hago con alguien del mismo sexo o en familia, y si aparece una crisis grave aviso enseguida al pastor.",
    },
    {
      id: "n3-evangelismo-consolidacion-e5",
      tipo: "breve",
      pregunta:
        "Explica cómo usarías dos medios de evangelismo, el trabajo en equipo por las casas y las redes sociales, con fidelidad al mensaje, respeto a las personas y un plan de seguimiento. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "casas", peso: 20, texto: "El trabajo en equipo por las casas.", formas: ["casas", "casa en casa", "dos en dos", "hijo de paz", "pareja", "equipo"] },
        { id: "redes", peso: 20, texto: "Las redes sociales.", formas: ["redes", "publicacion*", "comentario*", "mensaje privado", "internet"] },
        { id: "mensaje", peso: 20, texto: "Fidelidad al mensaje: Cristo murió y resucitó.", formas: ["evangelio", "murio", "resucito", "centrad*"] },
        { id: "respeto", peso: 20, texto: "Respeto a las personas: sin presión, con amabilidad, con permiso.", formas: ["respet*", "amable*", "presion", "permiso", "contencioso"] },
        { id: "seguimiento", peso: 20, texto: "Un plan de seguimiento.", formas: ["seguimiento", "contacto*", "llamar", "llamarlos", "consolid*", "iglesia cercana"] },
      ],
      basta: 85,
      citas: ["Lucas 10:1-2", "Lucas 10:5-6", "Hechos 20:20", "2 Timoteo 2:24-25", "2 Timoteo 2:24", "Colosenses 4:5-6", "1 Corintios 15:3-4", "Juan 15:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero formaría un equipo para visitar las casas de mi barrio de dos en dos, como Jesús envió a los setenta después de orar al Señor de la mies (Lucas 10:1-2). Entraríamos con un saludo de paz, buscando al hijo de paz que abra su casa, y compartiríamos el evangelio: que Cristo murió por nuestros pecados y resucitó. Respetaríamos a quien no quiera escuchar, sin presión, y con los menores solo hablaríamos con permiso de sus padres. También usaría las redes sociales: publicaciones breves con testimonios reales y versículos, centradas en Cristo, y respuestas amables a los comentarios, porque el siervo del Señor no debe ser contencioso (2 Timoteo 2:24). Si alguien quiere conversar, seguiríamos en un mensaje privado y nunca publicaríamos datos de nadie sin permiso. En los dos medios tendría un plan de seguimiento: anotar con permiso el contacto de quienes respondan, llamarlos en las primeras 48 horas y conectarlos con una iglesia cercana o con un consolidador, para que el fruto permanezca.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 3
  breve: {
    id: "n3-evangelismo-consolidacion-b1",
    tipo: "breve",
    pregunta:
      "Escribe tu plan para el requisito del Nivel 3 de consolidar a un nuevo creyente: a quién podrías acompañar (sin dar su nombre completo), qué pasos seguirás, cómo cuidarás la prudencia y la privacidad, y qué esperas ver en su vida al final. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "persona", peso: 10, texto: "A quién acompañará.", formas: ["vecino", "vecina", "companero", "compañero", "companera", "compañera", "amigo", "amiga", "familiar", "joven", "persona que"] },
      { id: "pasos", peso: 30, texto: "Los pasos: contacto, visita, seguridad, bautismo, grupo y discipulado.", formas: ["contacto", "visita", "bautismo", "grupo", "nivel 1", "estudiaremos", "seguridad", "llamare"] },
      { id: "prudencia", peso: 20, texto: "La prudencia y la privacidad.", formas: ["mismo sexo", "entre hombres", "entre mujeres", "permiso", "privacidad", "discrecion", "pastor", "padres"] },
      { id: "meta", peso: 20, texto: "Lo que espera ver: que permanezca, madure, sirva y acompañe a otro.", formas: ["permanez*", "permanec*", "madur*", "servir", "acompañe a otro", "acompane a otro"] },
      { id: "oracion", peso: 10, texto: "La oración.", formas: ["orar", "oracion", "orare"] },
      { id: "iglesia", peso: 10, texto: "En coordinación con la iglesia.", formas: ["iglesia", "lideres", "coordinacion"] },
    ],
    basta: 85,
    citas: ["Colosenses 1:28", "Hechos 14:22", "1 Juan 5:13", "Hechos 2:41-42", "Hechos 18:26", "Gálatas 6:1", "Gálatas 6:1-2", "Juan 15:16", "2 Timoteo 2:2", "Filipenses 1:6"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Quiero acompañar a un compañero de trabajo, a quien llamaré J., que recibió a Cristo hace poco en una campaña de mi iglesia. En coordinación con mis líderes, lo llamaré en las primeras 48 horas para orar con él y escuchar sus preguntas, y después haré una visita a su casa con otro hermano. Estudiaremos juntos la seguridad de la salvación (1 Juan 5:13) y el Nivel 1 de la academia, lo animaré al bautismo y lo invitaré a mi grupo pequeño para que tenga amigos en la iglesia. Cuidaré la prudencia: el acompañamiento lo haremos entre hombres, guardaré con discreción lo que me cuente y no compartiré sus datos sin permiso; si aparece una crisis grave, avisaré enseguida al pastor. Si cae, lo restauraré con mansedumbre (Gálatas 6:1). Al final espero que permanezca en Cristo, que crezca en la Palabra, que empiece a servir y que algún día acompañe a otro, para que el fruto permanezca (Juan 15:16). Confío en que Dios terminará la obra que comenzó en él.",
  },
};
