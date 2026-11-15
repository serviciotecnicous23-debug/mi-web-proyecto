/**
 * El banco de «Evangelismo personal» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el mensaje, la obra del Espíritu y los embajadores · o2 iniciar conversaciones como Jesús y Pablo ·
 * o3 responder objeciones · o4 invitar a una decisión y acompañar · o5 el versículo de memoria (Romanos 1:16).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-evangelismo-personal-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_EVANGELISMO_PERSONAL: BancoMateria = {
  materia: "n2-evangelismo-personal",
  repaso: {
    "n2-evangelismo-personal-1": ([
      ["1-r1", 1, "o1", "recordar", "Según 1 Corintios 15:3-4, ¿qué es lo primero del evangelio?", "Que Cristo murió por nuestros pecados, fue sepultado y resucitó", ["Que hay que ser buenas personas", "Que Dios premia a los que cumplen la ley", "Que Jesús fue un gran maestro moral"], "Cristo murió por nuestros pecados, conforme a las Escrituras; fue sepultado y resucitó al tercer día.", "1 Corintios 15:3-4"],
      ["1-r2", 1, "o1", "comprender", "¿Quién convence al mundo de pecado, según Juan 16:8?", "El Espíritu Santo", ["El evangelista más elocuente", "La ley de Moisés", "La propia conciencia, sin Dios"], "Cuando él venga, convencerá al mundo de pecado, de justicia y de juicio.", "Juan 16:8"],
      ["1-r3", 1, "o1", "recordar", "¿Qué somos, según 2 Corintios 5:20?", "Embajadores en nombre de Cristo", ["Jueces del mundo", "Dueños del mensaje", "Espectadores del reino"], "Así que, somos embajadores en nombre de Cristo.", "2 Corintios 5:20"],
    ] as P[]).map(p),
    "n2-evangelismo-personal-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Con qué palabras empezó Jesús a hablar con la samaritana?", "Dame de beber", ["Arrepiéntete de tus pecados", "¿Sabes quién soy yo?", "Ve y no peques más"], "Vino una mujer de Samaria a sacar agua; y Jesús le dijo: Dame de beber.", "Juan 4:7"],
      ["2-r2", 2, "o2", "comprender", "¿Qué barreras cruzó Jesús al hablar con la samaritana?", "La de pueblo, la de ser hombre y mujer, y la de su vida quebrantada", ["Ninguna, porque ya eran amigos", "Solo la del idioma", "Solo la de la distancia"], "Judíos y samaritanos no se tratan entre sí.", "Juan 4:9"],
      ["2-r3", 2, "o2", "comprender", "¿Qué le ofreció Jesús a la samaritana?", "Agua viva que salta para vida eterna", ["Dinero para su casa", "Un lugar en el templo", "Un trabajo en la ciudad"], "El agua que yo le daré será en él una fuente de agua que salte para vida eterna.", "Juan 4:14"],
    ] as P[]).map(p),
    "n2-evangelismo-personal-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Qué inscripción encontró Pablo en un altar de Atenas?", "Al Dios no conocido", ["Al dios de la guerra", "Al César, nuestro señor", "Al Dios de Israel"], "Hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO.", "Hechos 17:23"],
      ["3-r2", 3, "o2", "comprender", "¿Cómo debe ser nuestra palabra, según Colosenses 4:6?", "Siempre con gracia, sazonada con sal", ["Dura, para que se arrepientan", "Larga, para explicarlo todo", "Escasa, para no molestar"], "Sea vuestra palabra siempre con gracia, sazonada con sal.", "Colosenses 4:6"],
      ["3-r3", 3, "o2", "aplicar", "¿Cuál es una buena pregunta para abrir una conversación espiritual?", "¿Qué piensas que pasa después de la muerte?", ["¿Por qué no vas a la iglesia?", "¿Sabías que vas camino al infierno?", "¿Cuánto das de ofrenda?"], "Una pregunta sincera abre la conversación: hay que saber responder a cada uno.", "Colosenses 4:6"],
    ] as P[]).map(p),
    "n2-evangelismo-personal-4": ([
      ["4-r1", 4, "o3", "recordar", "¿Qué dijo Jesús de sí mismo en Juan 14:6?", "Yo soy el camino, y la verdad, y la vida", ["Yo soy uno de muchos caminos", "Yo soy un profeta más", "Yo soy el maestro de la ley"], "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.", "Juan 14:6"],
      ["4-r2", 4, "o3", "comprender", "¿Qué responderías a alguien que dice ser buena persona?", "Que todos pecamos y somos salvos por gracia, no por ser buenos", ["Que tiene razón y no necesita a Cristo", "Que debe hacer más obras", "Que no se puede hablar con él"], "Todos pecaron, y están destituidos de la gloria de Dios, siendo justificados gratuitamente por su gracia.", "Romanos 3:23-24"],
      ["4-r3", 4, "o3", "aplicar", "¿Qué hacer cuando no sabes responder una pregunta?", "Decirlo con humildad, estudiarlo y volver a conversar", ["Inventar una respuesta", "Cambiar de tema y no volver", "Decir que la pregunta es pecado"], "Estad siempre preparados para presentar defensa con mansedumbre y reverencia.", "1 Pedro 3:15"],
    ] as P[]).map(p),
    "n2-evangelismo-personal-5": ([
      ["5-r1", 5, "o4", "recordar", "¿Qué respondió Pedro cuando le preguntaron qué debían hacer?", "Arrepentíos", ["Esperad otra señal", "Haced muchas obras", "Volved al templo"], "Pedro les dijo: Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo.", "Hechos 2:38"],
      ["5-r2", 5, "o4", "comprender", "¿Qué enseña Romanos 10:9 sobre cómo recibir la salvación?", "Confesar con la boca que Jesús es el Señor y creer en el corazón que resucitó", ["Repetir una oración exacta", "Prometer portarse bien", "Bautizarse sin creer"], "Si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.", "Romanos 10:9"],
      ["5-r3", 5, "o4", "comprender", "¿En qué se basa la seguridad de la salvación, según 1 Juan 5:11-13?", "En la promesa de Dios: el que tiene al Hijo tiene la vida", ["En lo que uno siente cada día", "En no volver a fallar nunca", "En la opinión del pastor"], "El que tiene al Hijo, tiene la vida.", "1 Juan 5:12"],
    ] as P[]).map(p),
    "n2-evangelismo-personal-6": ([
      ["6-r1", 6, "o4", "recordar", "¿Qué mandó Jesús en Mateo 28:19?", "Haced discípulos a todas las naciones", ["Haced templos en todas las naciones", "Esperad en Jerusalén para siempre", "Juzgad a todas las naciones"], "Por tanto, id, y haced discípulos a todas las naciones.", "Mateo 28:19"],
      ["6-r2", 6, "o4", "comprender", "¿Cómo cuidaba Pablo a los nuevos creyentes, según 1 Tesalonicenses 2:7?", "Con ternura, como una nodriza a sus hijos", ["Con dureza, para que crecieran", "De lejos, sin conocerlos", "Solo con cartas de corrección"], "Fuimos tiernos entre vosotros, como la nodriza que cuida con ternura a sus propios hijos.", "1 Tesalonicenses 2:7"],
      ["6-r3", 6, "o4", "aplicar", "¿Qué conviene hacer en las primeras 48 horas con un nuevo creyente?", "Llamarlo, responder sus dudas y darle una Biblia", ["Esperar a que vuelva solo", "Pedirle que enseñe en la iglesia", "Dejarlo tranquilo un mes"], "Los que recibieron la palabra perseveraban en la doctrina de los apóstoles y en las oraciones.", "Hechos 2:41-42"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el evangelio y el evangelista (8)
    ["f01", 1, "o1", "recordar", "¿Qué significa la palabra evangelio?", "Buena noticia", ["Ley nueva", "Libro sagrado", "Consejo sabio"], "Pablo declara el evangelio: la buena noticia de que Cristo murió por nuestros pecados y resucitó.", "1 Corintios 15:1-4"],
    ["f02", 1, "o1", "recordar", "Según 1 Corintios 15:4, ¿cuándo resucitó Cristo?", "Al tercer día, conforme a las Escrituras", ["Al séptimo día", "A los cuarenta días", "Nadie lo sabe"], "Y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras.", "1 Corintios 15:4"],
    ["f03", 1, "o1", "comprender", "¿Por qué el evangelio no es solo un consejo para vivir mejor?", "Porque es la noticia de lo que Dios hizo en Cristo para salvarnos", ["Porque no tiene que ver con la vida diaria", "Porque es solo para el más allá", "Porque es una filosofía antigua"], "Que Cristo murió por nuestros pecados, conforme a las Escrituras.", "1 Corintios 15:3"],
    ["f04", 1, "o1", "comprender", "¿De qué convence el Espíritu Santo al mundo, según Juan 16:8?", "De pecado, de justicia y de juicio", ["De riqueza, de fama y de poder", "De la ley y de los profetas", "De la historia de Israel"], "Convencerá al mundo de pecado, de justicia y de juicio.", "Juan 16:8"],
    ["f05", 1, "o1", "comprender", "¿Qué nos mueve a evangelizar, según 2 Corintios 5:14?", "El amor de Cristo", ["El miedo al castigo", "La obligación de una regla", "El deseo de llenar el templo"], "Porque el amor de Cristo nos constriñe.", "2 Corintios 5:14"],
    ["f06", 1, "o1", "recordar", "¿Qué ministerio nos dio Dios, según 2 Corintios 5:18?", "El ministerio de la reconciliación", ["El ministerio del juicio", "El ministerio de la ley", "El ministerio del templo"], "Nos dio el ministerio de la reconciliación.", "2 Corintios 5:18"],
    ["f07", 1, "o1", "aplicar", "Un creyente no comparte su fe porque teme no convencer a nadie. ¿Qué le dirías?", "Que su parte es ser fiel; convencer es obra del Espíritu Santo", ["Que no comparta hasta saberlo todo", "Que presione con más fuerza", "Que evangelizar es solo para pastores"], "Recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos.", "Hechos 1:8"],
    ["f08", 1, "o5", "recordar", "¿Cómo termina Romanos 1:16, el versículo de memoria de esta materia?", "Es poder de Dios para salvación a todo aquel que cree", ["Es sabiduría de los hombres para el mundo", "Es una ley solo para los judíos", "Es un consejo para el que quiera"], "Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree.", "Romanos 1:16"],
    // ---- lección 2: Jesús y la samaritana (8)
    ["f09", 2, "o2", "recordar", "¿Dónde estaba Jesús cuando habló con la samaritana?", "Junto a un pozo", ["En el templo", "En una barca", "En el monte"], "Vino una mujer de Samaria a sacar agua.", "Juan 4:6-7"],
    ["f10", 2, "o2", "recordar", "¿Por qué se sorprendió la mujer de que Jesús le pidiera agua?", "Porque judíos y samaritanos no se trataban entre sí", ["Porque el pozo estaba seco", "Porque no tenía cántaro", "Porque era de noche"], "¿Cómo tú, siendo judío, me pides a mí de beber, que soy mujer samaritana? Porque judíos y samaritanos no se tratan entre sí.", "Juan 4:9"],
    ["f11", 2, "o2", "comprender", "¿Qué enseña que Jesús empezara pidiendo agua?", "A empezar con algo cotidiano y pasar a lo espiritual", ["Que no le importaba lo espiritual", "Que solo tenía sed", "Que hay que pedir favores a todos"], "Si conocieras el don de Dios, y quién es el que te dice: Dame de beber.", "Juan 4:10"],
    ["f12", 2, "o2", "comprender", "¿Qué hizo Jesús cuando la mujer desvió la conversación hacia el lugar de la adoración?", "Respondió con verdad y volvió a lo central: adorar en espíritu y en verdad", ["Discutió hasta ganarle", "Se enojó y se fue", "Le dio la razón para no incomodarla"], "Los verdaderos adoradores adorarán al Padre en espíritu y en verdad.", "Juan 4:21-24"],
    ["f13", 2, "o2", "recordar", "¿Cómo se reveló Jesús a la samaritana?", "Como el Mesías: Yo soy, el que habla contigo", ["Como un profeta más", "Como un rabino de Jerusalén", "No se reveló"], "Jesús le dijo: Yo soy, el que habla contigo.", "Juan 4:26"],
    ["f14", 2, "o2", "recordar", "¿Qué hizo la mujer después de hablar con Jesús?", "Dejó su cántaro y fue a contarlo en la ciudad", ["Volvió a su casa en silencio", "Se escondió de la gente", "Siguió sacando agua"], "La mujer dejó su cántaro, y fue a la ciudad, y dijo a los hombres: Venid, ved a un hombre.", "Juan 4:28-29"],
    ["f15", 2, "o2", "comprender", "¿Qué es un puente en el evangelismo personal?", "Algo que nos acerca: un interés común, una necesidad o una amistad", ["Un argumento para ganar la discusión", "Un folleto para dejar y huir", "Una regla para apartarnos del mundo"], "Jesús se acercó a la samaritana desde una necesidad común.", "Juan 4:7"],
    ["f16", 2, "o2", "aplicar", "A tu vecino y a ti les gusta el fútbol. ¿Cómo puedes usar ese puente?", "Cultivar la amistad y, con el tiempo, conversar de la vida y de Dios", ["Evitarlo hasta que vaya a la iglesia", "Hablarle del infierno durante el partido", "No mezclar nunca la amistad con la fe"], "Jesús empezó con algo cotidiano y pasó a lo espiritual.", "Juan 4:7-10"],
    // ---- lección 3: preguntas que abren conversaciones (8)
    ["f17", 3, "o2", "recordar", "¿Dónde habló Pablo a los atenienses?", "En medio del Areópago", ["En la sinagoga de Corinto", "En el templo de Jerusalén", "En una cárcel de Roma"], "Pablo, puesto en pie en medio del Areópago, dijo: Varones atenienses.", "Hechos 17:22"],
    ["f18", 3, "o2", "comprender", "¿Por qué empezó Pablo hablando del altar al Dios no conocido?", "Porque partió de lo que ellos ya conocían", ["Porque quería adorar a sus dioses", "Porque no conocía el evangelio", "Porque quería burlarse de ellos"], "Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio.", "Hechos 17:23"],
    ["f19", 3, "o2", "recordar", "Según Colosenses 4:5, ¿cómo debemos andar con los de afuera?", "Sabiamente, redimiendo el tiempo", ["Con desconfianza", "Sin hablarles", "Con prisa"], "Andad sabiamente para con los de afuera, redimiendo el tiempo.", "Colosenses 4:5"],
    ["f20", 3, "o2", "comprender", "¿Qué significa una palabra sazonada con sal?", "Una palabra con gracia, que da buen sabor y se adapta a cada persona", ["Una palabra dura que duele", "Una palabra muy larga", "Una palabra llena de citas"], "Para que sepáis cómo debéis responder a cada uno.", "Colosenses 4:6"],
    ["f21", 3, "o2", "recordar", "¿Cómo debemos presentar defensa de nuestra esperanza, según 1 Pedro 3:15?", "Con mansedumbre y reverencia", ["Con gritos y enojo", "Con burlas", "Con miedo y en secreto"], "Estad siempre preparados para presentar defensa con mansedumbre y reverencia.", "1 Pedro 3:15"],
    ["f22", 3, "o2", "comprender", "¿Por qué escuchar es importante en el evangelismo?", "Porque muestra respeto y gana el derecho a ser escuchado", ["Porque así no hay que hablar del evangelio", "Porque la otra persona siempre tiene razón", "Porque evita las conversaciones difíciles"], "Todo hombre sea pronto para oír, tardo para hablar.", "Santiago 1:19"],
    ["f23", 3, "o2", "aplicar", "¿Cuál de estas preguntas abre mejor una conversación espiritual?", "Si pudieras preguntarle algo a Dios, ¿qué le preguntarías?", ["¿Por qué vives en pecado?", "¿No te da vergüenza no ir a la iglesia?", "¿Cuántos versículos sabes?"], "Sea vuestra palabra siempre con gracia.", "Colosenses 4:6"],
    ["f24", 3, "o2", "aplicar", "Una conversación sobre la fe se convierte en pelea. ¿Qué es lo mejor?", "Calmarse, orar, dejar una pregunta y seguir con la amistad", ["Ganar la discusión a toda costa", "Cortar la amistad", "Burlarse de sus ideas"], "Con mansedumbre y reverencia.", "1 Pedro 3:15"],
    // ---- lección 4: responder las objeciones comunes (7)
    ["f25", 4, "o3", "recordar", "¿Qué afirmó Pedro en Hechos 4:12 sobre la salvación?", "Que en ningún otro hay salvación", ["Que hay salvación en todas las religiones", "Que la salvación es por las obras", "Que solo los judíos se salvan"], "Y en ningún otro hay salvación.", "Hechos 4:12"],
    ["f26", 4, "o3", "comprender", "¿Cómo responder con respeto a quien dice que todos los caminos llevan a Dios?", "Sin despreciar a nadie, explicar que solo Jesús murió y resucitó por nuestros pecados", ["Diciéndole que es un ignorante", "Dándole la razón para no incomodar", "Evitando hablar del tema"], "Yo soy el camino, y la verdad, y la vida.", "Juan 14:6"],
    ["f27", 4, "o3", "recordar", "Según Romanos 3:23, ¿quiénes pecaron?", "Todos", ["Solo los paganos", "Solo los malvados", "Solo los que no van a la iglesia"], "Por cuanto todos pecaron, y están destituidos de la gloria de Dios.", "Romanos 3:23"],
    ["f28", 4, "o3", "comprender", "¿Qué hay que hacer primero cuando alguien pregunta por el sufrimiento después de una pérdida?", "Acompañar y escuchar antes de explicar", ["Darle una explicación teológica larga", "Decirle que es castigo de Dios", "Cambiar de tema"], "En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.", "Juan 16:33"],
    ["f29", 4, "o3", "recordar", "¿Qué promete Dios en Apocalipsis 21:4?", "Enjugar toda lágrima", ["Dar riquezas a todos", "Quitar la libertad", "Repetir la historia"], "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte.", "Apocalipsis 21:4"],
    ["f30", 4, "o3", "comprender", "¿Qué responder a quien dice que la iglesia está llena de hipócritas?", "Que hay creyentes que fallan, pero seguimos a Cristo, que nunca pecó", ["Que eso es mentira y nadie falla", "Que tiene razón y no vale la pena", "Que él también es hipócrita"], "Fue tentado en todo según nuestra semejanza, pero sin pecado.", "Hebreos 4:15"],
    ["f31", 4, "o3", "analizar", "¿En qué se diferencia una pregunta sincera de una excusa?", "La pregunta busca entender; la excusa busca evitar la decisión", ["No hay ninguna diferencia", "La excusa siempre es más inteligente", "La pregunta sincera nunca es difícil"], "Hoy es el día de salvación: algunas objeciones solo buscan aplazar la decisión.", "2 Corintios 6:2"],
    // ---- lección 5: invitar a una decisión (7)
    ["f32", 5, "o4", "recordar", "¿Qué preguntaron los oyentes de Pedro en Pentecostés?", "¿Qué haremos?", ["¿Quién eres tú?", "¿Dónde está Jesús?", "¿Cuándo vendrá el reino?"], "Se compungieron de corazón, y dijeron a Pedro y a los otros apóstoles: Varones hermanos, ¿qué haremos?", "Hechos 2:37"],
    ["f33", 5, "o4", "comprender", "¿Qué significa arrepentirse?", "Cambiar de mente y de dirección: dejar el pecado y volverse a Dios", ["Sentir tristeza un momento", "Prometer que nunca más se fallará", "Pagar los pecados con obras"], "Arrepentíos y convertíos, para que sean borrados vuestros pecados.", "Hechos 3:19"],
    ["f34", 5, "o4", "comprender", "¿Hay palabras mágicas para recibir a Cristo?", "No: Dios mira el corazón que se arrepiente y cree", ["Sí: hay que repetir una oración exacta", "Sí: solo valen en latín", "Sí: solo las dice un pastor"], "Con el corazón se cree para justicia, pero con la boca se confiesa para salvación.", "Romanos 10:10"],
    ["f35", 5, "o4", "aplicar", "¿Qué hacer si la persona todavía no quiere recibir a Cristo?", "Respetar su decisión, seguir siendo su amigo y seguir orando", ["Presionarla hasta que acepte", "Dejar de hablarle", "Decirle que ya no tiene esperanza"], "El Señor es paciente para con nosotros, no queriendo que ninguno perezca.", "2 Pedro 3:9"],
    ["f36", 5, "o4", "recordar", "Según Juan 1:12, ¿qué reciben los que reciben a Cristo?", "La potestad de ser hechos hijos de Dios", ["Riquezas y salud", "Un cargo en la iglesia", "Fama ante los hombres"], "A todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios.", "Juan 1:12"],
    ["f37", 5, "o4", "recordar", "¿Para qué escribió Juan su primera carta, según 1 Juan 5:13?", "Para que sepamos que tenemos vida eterna", ["Para que dudemos de la salvación", "Para corregir a los apóstoles", "Para contar la historia de Israel"], "Para que sepáis que tenéis vida eterna.", "1 Juan 5:13"],
    ["f38", 5, "o4", "aplicar", "Un nuevo creyente dice que hoy no siente nada y teme haber perdido la salvación. ¿Qué le dirías?", "Que la seguridad está en la promesa de Dios, no en lo que siente", ["Que vuelva a convertirse cada día", "Que seguramente no era sincero", "Que espere a sentir algo fuerte"], "El que tiene al Hijo, tiene la vida.", "1 Juan 5:12"],
    // ---- lección 6: acompañar al que cree (7)
    ["f39", 6, "o4", "recordar", "Según Mateo 28:20, ¿qué hay que enseñar a los discípulos?", "Que guarden todas las cosas que Jesús mandó", ["Solo las tradiciones de la iglesia", "Solo el Antiguo Testamento", "Lo que cada uno prefiera"], "Enseñándoles que guarden todas las cosas que os he mandado.", "Mateo 28:20"],
    ["f40", 6, "o4", "recordar", "¿Qué promete Jesús a los que hacen discípulos, según Mateo 28:20?", "Estar con ellos todos los días, hasta el fin del mundo", ["Que nunca tendrán problemas", "Que todos creerán", "Que serán ricos"], "He aquí yo estoy con vosotros todos los días, hasta el fin del mundo.", "Mateo 28:20"],
    ["f41", 6, "o4", "comprender", "¿Qué quiso entregar Pablo a los tesalonicenses además del evangelio?", "Su propia vida", ["Dinero", "Un templo", "Una ley nueva"], "Hubiéramos querido entregaros no solo el evangelio de Dios, sino también nuestras propias vidas.", "1 Tesalonicenses 2:8"],
    ["f42", 6, "o4", "recordar", "¿En qué perseveraban los primeros creyentes, según Hechos 2:42?", "En la doctrina, la comunión, el partimiento del pan y las oraciones", ["En las fiestas, los ayunos y los sacrificios", "En el comercio y la política", "Solo en la oración"], "Perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones.", "Hechos 2:42"],
    ["f43", 6, "o4", "comprender", "¿Por qué el seguimiento es parte de la gran comisión?", "Porque Jesús mandó hacer discípulos, no solo lograr decisiones", ["Porque así crece la lista de la iglesia", "Porque evangelizar no sirve", "Porque es una tradición"], "Id, y haced discípulos a todas las naciones.", "Mateo 28:19"],
    ["f44", 6, "o4", "aplicar", "¿Qué incluye un buen plan para el primer mes de un nuevo creyente?", "Presentarle hermanos, acompañarlo hacia el bautismo y empezar con él el Nivel 1", ["Pedirle que predique el domingo", "Dejarlo solo para que madure", "Darle muchos libros y no volver a verlo"], "Los que recibieron su palabra fueron bautizados, y perseveraban en la doctrina y en la comunión.", "Hechos 2:41-42"],
    ["f45", 6, "o4", "analizar", "¿Qué enseña 2 Timoteo 2:2 sobre el fruto del evangelismo?", "Que el discípulo debe formarse para enseñar también a otros", ["Que solo los pastores enseñan", "Que basta con la decisión inicial", "Que no hay que formar a nadie"], "Esto encarga a hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
  ] as P[]).map(p),
  // las mini pruebas: 6 de 18 por intento; la 1 sale de las lecciones 1 a 3 y la 2 de las lecciones 4 a 6
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿De qué no se avergonzaba Pablo, según Romanos 1:16?", "Del evangelio", ["De la ley", "De su pasado", "De Roma"], "Porque no me avergüenzo del evangelio.", "Romanos 1:16"],
      ["m1-02", 1, "o1", "comprender", "¿Qué parte del mensaje explica por qué necesitamos a Cristo?", "Que todos pecamos y estamos separados de Dios", ["Que Dios nos creó", "Que hay muchas iglesias", "Que Jesús hizo milagros"], "Por cuanto todos pecaron, y están destituidos de la gloria de Dios.", "Romanos 3:23"],
      ["m1-03", 1, "o1", "recordar", "¿Qué recibimos cuando viene el Espíritu Santo, según Hechos 1:8?", "Poder para ser testigos", ["Riquezas", "Un templo nuevo", "La ley escrita"], "Recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos.", "Hechos 1:8"],
      ["m1-04", 1, "o1", "comprender", "¿Qué hace un embajador?", "Habla en nombre de su rey", ["Habla en su propio nombre", "Cambia el mensaje a su gusto", "Solo vive en el extranjero"], "Somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros.", "2 Corintios 5:20"],
      ["m1-05", 1, "o1", "recordar", "¿Cuál es el ruego de los embajadores de Cristo, según 2 Corintios 5:20?", "Reconciliaos con Dios", ["Obedeced la ley", "Venid a nuestra iglesia", "Dad vuestras ofrendas"], "Os rogamos en nombre de Cristo: Reconciliaos con Dios.", "2 Corintios 5:20"],
      ["m1-06", 1, "o1", "aplicar", "¿Por qué hay que orar antes y después de evangelizar?", "Porque el Espíritu Santo es quien convence y salva", ["Porque así hablamos mejor", "Porque es una costumbre", "Porque la oración reemplaza el compartir"], "Convencerá al mundo de pecado, de justicia y de juicio.", "Juan 16:8"],
      ["m1-07", 2, "o2", "recordar", "¿Adónde habían ido los discípulos mientras Jesús hablaba con la samaritana?", "A la ciudad a comprar de comer", ["A pescar", "Al templo", "A otra aldea a predicar"], "Pues sus discípulos habían ido a la ciudad a comprar de comer.", "Juan 4:8"],
      ["m1-08", 2, "o2", "comprender", "¿Qué dijo Jesús de quien bebe del agua que Él da?", "Que no tendrá sed jamás", ["Que tendrá que volver cada día", "Que será rico", "Que nunca morirá en la tierra"], "El que bebiere del agua que yo le daré, no tendrá sed jamás.", "Juan 4:14"],
      ["m1-09", 2, "o2", "comprender", "¿Cómo tocó Jesús la vida de la samaritana?", "Con verdad y sin desprecio, al hablar de los maridos que había tenido", ["Con burlas", "Ignorando su pasado", "Con una larga lista de reglas"], "Jesús le habló con verdad de los maridos que había tenido.", "Juan 4:16-18"],
      ["m1-10", 2, "o2", "recordar", "¿Qué esperaba la samaritana del Mesías?", "Que les declararía todas las cosas", ["Que reconstruiría el templo", "Que vencería a Roma", "Que daría agua a todos"], "Sé que ha de venir el Mesías, llamado el Cristo; cuando él venga nos declarará todas las cosas.", "Juan 4:25"],
      ["m1-11", 2, "o2", "recordar", "¿Qué pasó en Samaria después de la conversación?", "Muchos samaritanos creyeron en Jesús", ["Expulsaron a Jesús", "Nadie creyó", "La mujer se fue de la ciudad"], "Muchos de los samaritanos de aquella ciudad creyeron en él.", "Juan 4:39"],
      ["m1-12", 2, "o2", "aplicar", "¿Qué barrera debe quitar un creyente que siempre tiene prisa?", "La prisa: dedicar tiempo a escuchar a las personas", ["Ninguna: la prisa ayuda", "La amistad", "La oración"], "Jesús se detuvo junto al pozo para conversar.", "Juan 4:6-7"],
      ["m1-13", 3, "o2", "recordar", "¿Qué observó Pablo en los atenienses?", "Que eran muy religiosos", ["Que no tenían dioses", "Que todos eran cristianos", "Que no tenían templos"], "Varones atenienses, en todo observo que sois muy religiosos.", "Hechos 17:22"],
      ["m1-14", 3, "o2", "comprender", "¿De qué les habló Pablo a los atenienses después del altar?", "Del Dios creador, del arrepentimiento y de Jesús resucitado", ["De los dioses griegos", "Solo de la ley de Moisés", "De la política de Roma"], "Dios manda a todos los hombres en todo lugar que se arrepientan, y levantó a Jesús de los muertos.", "Hechos 17:30-31"],
      ["m1-15", 3, "o2", "recordar", "¿A quién hay que estar preparados para responder, según 1 Pedro 3:15?", "A todo el que nos pida razón de nuestra esperanza", ["Solo a los pastores", "Solo a los que van a la iglesia", "A nadie"], "Ante todo el que os demande razón de la esperanza que hay en vosotros.", "1 Pedro 3:15"],
      ["m1-16", 3, "o2", "comprender", "¿Qué significa santificar a Dios en el corazón antes de responder?", "Darle a Él el primer lugar y confiar en Él al hablar", ["Memorizar todas las respuestas", "Hablar en voz baja", "Evitar las preguntas"], "Santificad a Dios el Señor en vuestros corazones, y estad siempre preparados.", "1 Pedro 3:15"],
      ["m1-17", 3, "o2", "recordar", "Según Santiago 1:19, ¿cómo debemos ser?", "Prontos para oír, tardos para hablar", ["Prontos para hablar", "Tardos para oír", "Rápidos para enojarnos"], "Todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.", "Santiago 1:19"],
      ["m1-18", 3, "o2", "aplicar", "¿Qué pregunta ofrece ayuda práctica y abre el corazón?", "¿Puedo orar por ti por algo que estés viviendo?", ["¿Por qué no lees la Biblia?", "¿Sabes cuántos pecados tienes?", "¿Por qué tu familia no va a la iglesia?"], "Andad sabiamente para con los de afuera.", "Colosenses 4:5"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿Quién viene al Padre, según Juan 14:6?", "Nadie, sino por Jesús", ["Todos, por cualquier camino", "Los que hacen buenas obras", "Los que nacen en una familia cristiana"], "Nadie viene al Padre, sino por mí.", "Juan 14:6"],
      ["m2-02", 4, "o3", "comprender", "¿Cómo somos justificados, según Romanos 3:24?", "Gratuitamente por su gracia, mediante la redención en Cristo", ["Por ser mejores que otros", "Por cumplir la ley", "Por nuestras ofrendas"], "Siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús.", "Romanos 3:24"],
      ["m2-03", 4, "o3", "recordar", "Según Romanos 5:12, ¿por quién entró el pecado en el mundo?", "Por un hombre", ["Por los ángeles", "Por Dios", "Por la naturaleza"], "Como el pecado entró en el mundo por un hombre, y por el pecado la muerte.", "Romanos 5:12"],
      ["m2-04", 4, "o3", "comprender", "¿Qué dice Jesús sobre la aflicción en Juan 16:33?", "Que la tendremos, pero Él venció al mundo", ["Que los creyentes no sufren", "Que todo sufrimiento es castigo", "Que Dios no ve el dolor"], "En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.", "Juan 16:33"],
      ["m2-05", 4, "o3", "recordar", "¿Cómo investigó Lucas lo que escribió, según Lucas 1:3?", "Con diligencia, desde su origen", ["De oídas, sin cuidado", "Inventando lo que faltaba", "Copiando a los romanos"], "Me ha parecido también a mí, después de haber investigado con diligencia todas las cosas desde su origen.", "Lucas 1:3"],
      ["m2-06", 4, "o3", "aplicar", "¿Qué responder a alguien que dice que se ocupará de Dios más adelante?", "Que nadie sabe si tendrá un mañana y que hoy es el día de salvación", ["Que tiene razón y no hay prisa", "Que ya es tarde para él", "Que se olvide del tema"], "He aquí ahora el tiempo aceptable; he aquí ahora el día de salvación.", "2 Corintios 6:2"],
      ["m2-07", 5, "o4", "recordar", "¿Qué prometió Pedro a los que se arrepintieran y se bautizaran?", "El don del Espíritu Santo", ["Riquezas", "Un cargo en la iglesia", "Una vida sin problemas"], "Y recibiréis el don del Espíritu Santo.", "Hechos 2:38"],
      ["m2-08", 5, "o4", "recordar", "Según Romanos 10:13, ¿quién será salvo?", "Todo aquel que invocare el nombre del Señor", ["Solo los judíos", "Solo los que nunca pecaron", "Solo los sacerdotes"], "Porque todo aquel que invocare el nombre del Señor, será salvo.", "Romanos 10:13"],
      ["m2-09", 5, "o4", "comprender", "¿Qué significa creer en Jesús?", "Confiar en Él como Salvador y Señor", ["Saber que existió", "Admirar sus enseñanzas", "Ir a la iglesia de vez en cuando"], "Si creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.", "Romanos 10:9"],
      ["m2-10", 5, "o4", "comprender", "¿Por qué nunca hay que presionar ni manipular a alguien para que reciba a Cristo?", "Porque la decisión es entre la persona y Dios, que es quien la atrae", ["Porque no importa si cree", "Porque la presión siempre funciona", "Porque el evangelio es opcional"], "Ninguno puede venir a mí, si el Padre que me envió no le trajere.", "Juan 6:44"],
      ["m2-11", 5, "o4", "recordar", "Según 1 Juan 5:11, ¿dónde está la vida eterna?", "En el Hijo de Dios", ["En la iglesia", "En las buenas obras", "En la ley"], "Dios nos ha dado vida eterna; y esta vida está en su Hijo.", "1 Juan 5:11"],
      ["m2-12", 5, "o4", "aplicar", "¿Qué puedes ofrecer a quien todavía no está listo para decidir?", "Leer juntos el Evangelio de Juan o invitarlo a la iglesia", ["Una amenaza", "El silencio para siempre", "Un ultimátum"], "Estas se han escrito para que creáis que Jesús es el Cristo, el Hijo de Dios.", "Juan 20:31"],
      ["m2-13", 6, "o4", "recordar", "¿En el nombre de quién se bautiza a los discípulos, según Mateo 28:19?", "Del Padre, del Hijo y del Espíritu Santo", ["Solo de los apóstoles", "De la iglesia local", "De Moisés"], "Bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.", "Mateo 28:19"],
      ["m2-14", 6, "o4", "recordar", "¿Cuántas personas se añadieron el día de Pentecostés?", "Como tres mil", ["Doce", "Ciento veinte", "Como cinco mil hombres"], "Y se añadieron aquel día como tres mil personas.", "Hechos 2:41"],
      ["m2-15", 6, "o4", "comprender", "¿Por qué un nuevo creyente necesita acompañamiento?", "Porque, como un recién nacido, necesita cuidado para crecer", ["Porque no puede leer la Biblia", "Porque la iglesia lo exige", "Porque todavía no es salvo"], "Desead, como niños recién nacidos, la leche espiritual no adulterada, para que por ella crezcáis.", "1 Pedro 2:2"],
      ["m2-16", 6, "o4", "recordar", "¿A quiénes pidió Pablo encargar la enseñanza, según 2 Timoteo 2:2?", "A hombres fieles idóneos para enseñar también a otros", ["A los más ricos", "Solo a los ancianos", "A cualquiera, aunque no sea fiel"], "Esto encarga a hombres fieles que sean idóneos para enseñar también a otros.", "2 Timoteo 2:2"],
      ["m2-17", 6, "o4", "comprender", "¿Qué parte de la academia ayuda al nuevo creyente en su primer mes?", "El Nivel 1, Fundamentos de la fe", ["El examen integral del Nivel 5", "Una especialidad avanzada", "Ninguna: debe esperar un año"], "Los nuevos creyentes perseveraban en la doctrina de los apóstoles.", "Hechos 2:42"],
      ["m2-18", 6, "o4", "aplicar", "¿Cuál es una buena actividad para la primera semana con un nuevo creyente?", "Leer juntos un pasaje, orar y llevarlo a la iglesia", ["Tomarle un examen de doctrina", "Dejarlo solo para que decida", "Pedirle que dirija la alabanza"], "Perseveraban en la comunión unos con otros y en las oraciones.", "Hechos 2:42"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-evangelismo-personal-e1",
      tipo: "corta",
      pregunta: "Resume el evangelio y explica qué papel tienen el Espíritu Santo y el creyente al compartirlo.",
      ideas: [
        { id: "murio", peso: 30, texto: "Que Cristo murió por nuestros pecados.", formas: ["murio", "cruz"] },
        { id: "resucito", peso: 20, texto: "Que resucitó al tercer día.", formas: ["resucit*", "tercer dia"] },
        { id: "espiritu", peso: 25, texto: "Que el Espíritu Santo convence y da vida nueva.", formas: ["espiritu santo", "convence*"] },
        { id: "embajador", peso: 15, texto: "Que el creyente es embajador o testigo y comparte con amor.", formas: ["embajador*", "testigo*", "compart*", "anunci*", "reconcili*"] },
      ],
      citas: ["1 Corintios 15:3-4", "1 Corintios 15:1-4", "Juan 16:8", "2 Corintios 5:20", "Hechos 1:8"],
      pesoCita: 10,
      errores: [
        { id: "obras", anula: "murio", texto: "El evangelio no es lo que hacemos para ganarnos a Dios, sino lo que Cristo hizo: murió por nuestros pecados y resucitó (1 Corintios 15:3-4).", formas: ["salvos por nuestras obras", "salvos por las obras", "ganar el cielo con obras"] },
      ],
      modelo:
        "El evangelio es la buena noticia de que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día (1 Corintios 15:3-4). El Espíritu Santo es quien convence al mundo de pecado y da vida nueva (Juan 16:8). El creyente es embajador de Cristo: comparte el mensaje con amor y con oración.",
    },
    {
      id: "n2-evangelismo-personal-e2",
      tipo: "corta",
      pregunta: "Explica cómo evangelizó Jesús a la mujer samaritana y qué aprendes de su ejemplo.",
      ideas: [
        { id: "cotidiano", peso: 25, texto: "Que empezó con algo cotidiano: le pidió agua.", formas: ["beber", "pozo", "cotidian*", "necesidad", "pidio agua"] },
        { id: "barreras", peso: 25, texto: "Que cruzó barreras.", formas: ["barrera*", "samaritan*", "prejuicio*", "judio*"] },
        { id: "espiritual", peso: 20, texto: "Que pasó a lo espiritual: el agua viva.", formas: ["agua viva", "vida eterna", "espiritual"] },
        { id: "verdad", peso: 20, texto: "Que habló con verdad y se reveló como el Mesías.", formas: ["verdad", "mesias", "cristo", "maridos", "yo soy"] },
      ],
      citas: ["Juan 4:7-26", "Juan 4:7", "Juan 4:10", "Juan 4:14", "Juan 4:26"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús empezó con algo cotidiano: le pidió de beber junto al pozo (Juan 4:7). Cruzó las barreras entre judíos y samaritanos, y pasó de lo cotidiano a lo espiritual al ofrecerle agua viva. Le habló con verdad sobre su vida y se reveló como el Mesías. Aprendo a tomar la iniciativa, buscar puentes y hablar con amor y con verdad.",
    },
    {
      id: "n2-evangelismo-personal-e3",
      tipo: "corta",
      pregunta: "Elige una objeción común contra la fe y explica cómo la responderías con la Biblia y con una buena actitud.",
      ideas: [
        { id: "objecion", peso: 20, texto: "Nombrar una objeción: los caminos, ser buena persona, el sufrimiento, la Biblia cambiada, los hipócritas o el tiempo.", formas: ["caminos", "buena persona", "sufrimiento", "dolor", "cambiada", "manuscritos", "hipocrita*", "religiones", "mas adelante"] },
        { id: "respuesta", peso: 40, texto: "Una respuesta bíblica: Jesús es el camino; todos pecaron y somos salvos por gracia; Cristo venció al mundo.", formas: ["el camino", "unico camino", "todos pecaron", "gracia", "vencido al mundo", "vencio", "lagrima", "investig*", "nunca peco", "dia de salvacion", "murio y resucito"] },
        { id: "actitud", peso: 30, texto: "Con mansedumbre y respeto, escuchando, o con humildad si no sabe.", formas: ["mansedumbre", "respeto", "escuch*", "humild*", "amor", "reverencia"] },
      ],
      citas: ["Juan 14:6", "Hechos 4:12", "Romanos 3:23-24", "Juan 16:33", "1 Pedro 3:15", "Lucas 1:1-4", "2 Corintios 6:2", "Hebreos 4:15"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Una objeción común es que todos los caminos llevan a Dios. Respondería con respeto y mansedumbre, escuchando primero (1 Pedro 3:15). Le explicaría que Jesús dijo: Yo soy el camino, y la verdad, y la vida (Juan 14:6), y que solo Él murió y resucitó por nuestros pecados. Si no supiera algo, lo diría con humildad y lo estudiaría.",
    },
    {
      id: "n2-evangelismo-personal-e4",
      tipo: "corta",
      pregunta: "¿Cómo guiarías a una persona a recibir a Cristo y cómo la acompañarías después?",
      ideas: [
        { id: "arrepentir", peso: 25, texto: "Arrepentirse y creer en Jesús como Salvador y Señor.", formas: ["arrepent*", "arrepient*", "creer", "cree", "crea", "creas", "creyendo", "confiar", "confie", "confes*"] },
        { id: "sinpresion", peso: 20, texto: "Sin presión ni palabras mágicas: Dios mira el corazón.", formas: ["sin presion", "no presion*", "palabras magicas", "corazon", "sus propias palabras"], negativa: true },
        { id: "seguridad", peso: 15, texto: "La seguridad de la salvación en la promesa de Dios.", formas: ["seguridad", "vida eterna", "promesa", "tiene al hijo"] },
        { id: "acompanar", peso: 30, texto: "Acompañarla: la Palabra, la oración, la iglesia, el bautismo y el discipulado.", formas: ["acompañ*", "acompan*", "iglesia", "bautis*", "bautiz*", "discipul*", "biblia", "nivel 1"] },
      ],
      citas: ["Romanos 10:9-10", "Hechos 2:38", "1 Juan 5:11-13", "1 Juan 5:12", "Mateo 28:19-20", "Hechos 2:41-42", "Juan 1:12"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Le explicaría que debe arrepentirse y creer en Jesús como Salvador y Señor (Romanos 10:9-10). La invitaría a orar con sus propias palabras, sin presión, y le mostraría la seguridad de la salvación en la promesa de Dios (1 Juan 5:12). Después la acompañaría: leeríamos la Biblia, la llevaría a la iglesia y empezaríamos juntos el Nivel 1.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-evangelismo-personal-b1",
    tipo: "breve",
    pregunta:
      "Escribe tu plan para compartir a Cristo con una persona concreta de tu vida (sin decir su nombre): cómo empezarás la conversación, qué mensaje le darás, cómo responderías una objeción y cómo la acompañarías. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "orar", peso: 10, texto: "Orar por la persona y depender del Espíritu Santo.", formas: ["orar", "orare", "oracion", "espiritu santo"] },
      { id: "puente", peso: 15, texto: "Un puente o una pregunta para empezar.", formas: ["puente*", "pregunt*", "amistad", "conversacion", "interes"] },
      { id: "mensaje", peso: 20, texto: "El mensaje: Cristo murió por nuestros pecados y resucitó.", formas: ["murio", "resucit*", "cruz"] },
      { id: "gracia", peso: 10, texto: "La salvación por gracia: arrepentirse y creer.", formas: ["gracia", "arrepent*", "arrepient*", "creer", "cree", "crea", "creyendo"] },
      { id: "objecion", peso: 15, texto: "Cómo respondería una objeción, con mansedumbre.", formas: ["objecion*", "mansedumbre", "respeto", "escuch*", "humild*"] },
      { id: "acompanar", peso: 20, texto: "Cómo la acompañaría después.", formas: ["acompañ*", "acompan*", "iglesia", "bautis*", "discipul*", "biblia"] },
      { id: "amor", peso: 10, texto: "El amor y la paciencia.", formas: ["amor", "paciencia", "embajador*", "amigo"] },
    ],
    basta: 85,
    citas: ["Romanos 1:16", "1 Corintios 15:3-4", "Juan 4:7", "Colosenses 4:6", "1 Pedro 3:15", "Juan 14:6", "Romanos 10:9", "Mateo 28:19-20", "2 Corintios 5:20", "Juan 16:8"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Quiero compartir a Cristo con un compañero de trabajo. Primero voy a orar por él cada día, porque el Espíritu Santo es quien convence (Juan 16:8). Tenemos un puente: los dos somos padres y hablamos de nuestros hijos. Un día le preguntaré qué piensa que pasa después de la muerte, y lo escucharé con respeto. Después le contaré mi testimonio y el mensaje del evangelio: que Cristo murió por nuestros pecados y resucitó al tercer día (1 Corintios 15:3-4), y que la salvación es por gracia, cuando uno se arrepiente y cree. Si me dice que todos los caminos llevan a Dios, le responderé con mansedumbre que Jesús dijo: Yo soy el camino, y la verdad, y la vida (Juan 14:6). Si recibe a Cristo, lo acompañaré: leeremos juntos la Biblia, lo llevaré a la iglesia, caminaremos hacia el bautismo y empezaremos el Nivel 1 de la academia. Si todavía no quiere, seguiré siendo su amigo, con amor y paciencia, porque no me avergüenzo del evangelio (Romanos 1:16).",
  },
};
