/**
 * El banco de «El ayuno bíblico» (especialidad Intercesión y oración). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 qué es el ayuno bíblico · o2 el ayuno en el Antiguo Testamento · o3 Jesús y la iglesia ayunan ·
 * o4 el ayuno que Dios escogió · o5 cómo ayunar con sabiduría · o6 los peligros y los frutos del ayuno ·
 * o7 el versículo de memoria (Isaías 58:6).
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `intercesion-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_INTERCESION_3: BancoMateria = {
  materia: "intercesion-3",
  repaso: {
    "intercesion-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo empieza Jesús su enseñanza sobre el ayuno en Mateo 6:16?", "Cuando ayunéis", ["Si alguna vez ayunáis", "No ayunéis nunca", "Ayunad cada día"], "«Cuando ayunéis, no seáis austeros, como los hipócritas».", "Mateo 6:16-18"],
      ["1-r2", 1, "o1", "comprender", "¿Qué es ayunar, según la lección?", "Dejar de comer por un tiempo para buscar a Dios", ["Hacer dieta para bajar de peso", "Hacer una huelga de hambre para obligar a Dios", "Comer solo una vez por semana"], "«sino a tu Padre que está en secreto».", "Mateo 6:16-18"],
      ["1-r3", 1, "o1", "aplicar", "Un hermano ayuna y les cuenta a todos que está ayunando. ¿Qué le enseña Mateo 6:17-18?", "Que ayune delante del Padre, sin mostrarlo a los hombres", ["Que lo anuncie más fuerte", "Que deje de ayunar", "Que ayune solo en la iglesia"], "«para no mostrar a los hombres que ayunas, sino a tu Padre que está en secreto».", "Mateo 6:16-18"],
    ] as P[]).map(p),
    "intercesion-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cuánto tiempo estuvo Moisés con Jehová sin comer pan ni beber agua?", "Cuarenta días y cuarenta noches", ["Tres días", "Siete días", "Un año"], "«Y él estuvo allí con Jehová cuarenta días y cuarenta noches; no comió pan, ni bebió agua».", "Éxodo 34:28"],
      ["2-r2", 2, "o2", "comprender", "¿Para qué proclamó Esdras ayuno junto al río Ahava?", "Para pedir a Dios camino derecho para el pueblo, los niños y los bienes", ["Para celebrar una fiesta", "Para pedir soldados al rey", "Para castigar al pueblo"], "«para solicitar de él camino derecho para nosotros, y para nuestros niños, y para todos nuestros bienes».", "Esdras 8:21-23"],
      ["2-r3", 2, "o2", "aplicar", "¿Qué clase de ayuno hizo Daniel durante tres semanas?", "Un ayuno parcial: no comió manjar delicado, ni carne ni vino", ["Un ayuno sin agua de tres semanas", "Un ayuno de una sola comida", "Ningún ayuno"], "«No comí manjar delicado, ni entró en mi boca carne ni vino».", "Daniel 10:2-3"],
    ] as P[]).map(p),
    "intercesion-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Quién llevó a Jesús al desierto antes de su ayuno?", "El Espíritu", ["Juan el Bautista", "Los discípulos", "Los fariseos"], "«Entonces Jesús fue llevado por el Espíritu al desierto».", "Mateo 4:1-4"],
      ["3-r2", 3, "o3", "comprender", "¿Qué respondió Jesús cuando el tentador le propuso convertir las piedras en pan?", "No sólo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios", ["Que no tenía hambre", "Que lo haría al día siguiente", "Que los ángeles le traerían comida"], "«No sólo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios».", "Mateo 4:1-4"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué hacía la iglesia de Antioquía cuando el Espíritu Santo le habló?", "Ministraba al Señor y ayunaba", ["Celebraba una fiesta", "Discutía", "Construía un templo"], "«Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo».", "Hechos 13:2-3"],
    ] as P[]).map(p),
    "intercesion-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿De qué se quejaba el pueblo en Isaías 58:3?", "De que ayunaba y Dios no le hacía caso", ["De que no tenía comida", "De que no tenía templo", "De que el rey lo oprimía"], "«¿Por qué, dicen, ayunamos, y no hiciste caso?».", "Isaías 58:3-7"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hacía el pueblo en el día de su ayuno, según Isaías 58:3?", "Buscaba su propio gusto y oprimía a sus trabajadores", ["Ayudaba a los pobres", "Leía la ley", "Perdonaba a sus enemigos"], "«en el día de vuestro ayuno buscáis vuestro propio gusto, y oprimís a todos vuestros trabajadores».", "Isaías 58:3-7"],
      ["4-r3", 4, "o4", "aplicar", "Quieres que tu ayuno agrade a Dios. ¿Qué te enseña Isaías 58:7?", "Que lo acompañes con misericordia, como partir tu pan con el hambriento", ["Que lo hagas más largo", "Que lo anuncies a todos", "Que no te ocupes de los demás"], "«que partas tu pan con el hambriento».", "Isaías 58:3-7"],
    ] as P[]).map(p),
    "intercesion-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué manda proclamar Joel 2:15 en Sion?", "Ayuno y asamblea", ["Una guerra", "Una fiesta de cosecha", "Un censo del pueblo"], "«Tocad trompeta en Sion, proclamad ayuno, convocad asamblea».", "Joel 2:15"],
      ["5-r2", 5, "o5", "comprender", "¿Por qué hay que ayunar cuidando el cuerpo, según la lección?", "Porque el cuerpo es templo del Espíritu Santo", ["Porque el cuerpo no importa", "Porque el ayuno es malo", "Porque así se ayuna más"], "«vuestro cuerpo es templo del Espíritu Santo».", "1 Corintios 6:19-20"],
      ["5-r3", 5, "o5", "aplicar", "Una hermana con diabetes quiere ayunar. ¿Qué le aconseja la lección?", "Que primero consulte a su médico y busque una forma prudente, como un ayuno parcial", ["Que ayune sin agua tres días", "Que ayune igual que todos sin decirle a nadie", "Que deje sus medicinas para ayunar mejor"], "«glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu».", "1 Corintios 6:19-20"],
    ] as P[]).map(p),
    "intercesion-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué dijo Jesús de los hipócritas que mostraban su ayuno?", "Que ya tienen su recompensa", ["Que Dios los premiará más", "Que debían ayunar más", "Que eran un buen ejemplo"], "«de cierto os digo que ya tienen su recompensa».", "Mateo 6:16"],
      ["6-r2", 6, "o6", "comprender", "¿Qué dice Colosenses 2:23 de las reglas de duro trato del cuerpo?", "Que no tienen valor alguno contra los apetitos de la carne", ["Que nos hacen santos", "Que reemplazan la obediencia", "Que son el mejor camino a Dios"], "«pero no tienen valor alguno contra los apetitos de la carne».", "Colosenses 2:23"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué vio Dios en Acab cuando ayunó y anduvo humillado?", "Que se había humillado delante de él", ["Que era un hombre justo", "Que quería ser alabado", "Nada, porque Dios no lo miró"], "«¿No has visto cómo Acab se ha humillado delante de mí?».", "1 Reyes 21:27-29"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · ¿Qué es el ayuno bíblico?
    ["f01", 1, "o1", "recordar", "¿Cómo no deben ayunar los discípulos, según Mateo 6:16?", "Austeros, como los hipócritas que demudan sus rostros", ["En secreto", "Delante del Padre", "Con el rostro lavado"], "«Cuando ayunéis, no seáis austeros, como los hipócritas».", "Mateo 6:16-18"],
    ["f02", 1, "o1", "recordar", "¿Qué manda Jesús hacer al que ayuna, según Mateo 6:17?", "Ungir su cabeza y lavar su rostro", ["Vestirse de cilicio", "Anunciarlo en la sinagoga", "Ponerse ceniza en la cabeza"], "«Pero tú, cuando ayunes, unge tu cabeza y lava tu rostro».", "Mateo 6:16-18"],
    ["f03", 1, "o1", "comprender", "¿Qué promete el Padre al que ayuna en secreto?", "Que lo recompensará en público", ["Que lo hará famoso", "Que no tendrá hambre", "Que le dará riquezas"], "«y tu Padre que ve en lo secreto te recompensará en público».", "Mateo 6:16-18"],
    ["f04", 1, "o1", "comprender", "¿Qué muestra que Jesús dijera cuando ayunéis y no si ayunáis?", "Que daba por hecho que sus discípulos ayunarían", ["Que el ayuno estaba prohibido", "Que solo ayunaban los fariseos", "Que había que ayunar todos los días"], "«Cuando ayunéis, no seáis austeros».", "Mateo 6:16-18"],
    ["f05", 1, "o1", "recordar", "¿Qué le preguntaron a Jesús los discípulos de Juan?", "Por qué sus discípulos no ayunaban", ["Por qué no oraban", "Por qué no iban al templo", "Por qué comían con pecadores"], "«¿Por qué nosotros y los fariseos ayunamos muchas veces, y tus discípulos no ayunan?».", "Mateo 9:14-15"],
    ["f06", 1, "o1", "comprender", "¿Cuándo dijo Jesús que sus discípulos ayunarían?", "Cuando el esposo les fuera quitado", ["Nunca", "Solo en las fiestas", "Cuando se hicieran fariseos"], "«Pero vendrán días cuando el esposo les será quitado, y entonces ayunarán».", "Mateo 9:14-15"],
    ["f07", 1, "o1", "analizar", "¿En qué se diferencia el ayuno bíblico de una dieta?", "En que el ayuno se hace para buscar a Dios, no para cuidar la figura", ["En que la dieta es más espiritual", "En que no hay diferencia", "En que el ayuno siempre es más corto"], "«sino a tu Padre que está en secreto».", "Mateo 6:16-18"],
    ["f08", 1, "o1", "recordar", "¿Cómo llama Dios a convertirse a él en Joel 2:12?", "Con todo el corazón, con ayuno y lloro y lamento", ["Con sacrificios de animales", "Con fiestas y cantos", "Con muchas riquezas"], "«convertíos a mí con todo vuestro corazón, con ayuno y lloro y lamento».", "Joel 2:12-13"],
    ["f09", 1, "o1", "evaluar", "¿Qué importa más en el ayuno, según Joel 2:13?", "Rasgar el corazón, no los vestidos", ["Rasgar los vestidos", "Ayunar muchos días", "Que todos lo vean"], "«Rasgad vuestro corazón, y no vuestros vestidos».", "Joel 2:12-13"],
    ["f10", 1, "o7", "recordar", "Completa Isaías 58:6: ¿No es más bien el ayuno que yo escogí, desatar las ligaduras de impiedad…", "soltar las cargas de opresión, y dejar ir libres a los quebrantados, y que rompáis todo yugo?", ["y no comer pan ni beber agua cuarenta días?", "y vestirse de cilicio y de ceniza?", "y orar en las esquinas de las calles?"], "«¿No es más bien el ayuno que yo escogí, desatar las ligaduras de impiedad, soltar las cargas de opresión, y dejar ir libres a los quebrantados, y que rompáis todo yugo?».", "Isaías 58:6"],
    // Lección 2 · El ayuno en el Antiguo Testamento
    ["f11", 2, "o2", "recordar", "¿Qué escribió Moisés durante sus cuarenta días con Jehová?", "Las palabras del pacto, los diez mandamientos", ["El libro de Génesis", "Los salmos", "Una carta a Faraón"], "«y escribió en tablas las palabras del pacto, los diez mandamientos».", "Éxodo 34:28"],
    ["f12", 2, "o2", "analizar", "¿Por qué el ayuno de Moisés no es un modelo para imitar, según la lección?", "Porque fue extraordinario: no bebió agua en cuarenta días, sostenido por Dios", ["Porque Moisés pecó al ayunar", "Porque fue demasiado corto", "Porque no oró"], "«no comió pan, ni bebió agua».", "Éxodo 34:28"],
    ["f13", 2, "o2", "recordar", "¿Por quién rogó y ayunó David en 2 Samuel 12:16?", "Por el niño, su hijo enfermo", ["Por Saúl", "Por Jonatán", "Por el pueblo en la guerra"], "«Entonces David rogó a Dios por el niño; y ayunó David».", "2 Samuel 12:16"],
    ["f14", 2, "o2", "recordar", "¿De qué tuvo vergüenza Esdras?", "De pedir al rey tropa y gente de a caballo", ["De ayunar", "De orar en público", "De ser sacerdote"], "«Porque tuve vergüenza de pedir al rey tropa y gente de a caballo».", "Esdras 8:21-23"],
    ["f15", 2, "o2", "comprender", "¿Qué resultado tuvo el ayuno de Esdras?", "Dios les fue propicio", ["El rey los castigó", "No pasó nada", "Tuvieron que volver atrás"], "«Ayunamos, pues, y pedimos a nuestro Dios sobre esto, y él nos fue propicio».", "Esdras 8:21-23"],
    ["f16", 2, "o2", "recordar", "¿Cuántos días pidió Ester que ayunaran por ella sin comer ni beber?", "Tres días, noche y día", ["Cuarenta días", "Un día", "Siete días"], "«y no comáis ni bebáis en tres días, noche y día».", "Ester 4:16"],
    ["f17", 2, "o2", "comprender", "¿Qué clase de ayuno hizo Nínive?", "Un ayuno de arrepentimiento, en que cada uno se volvía de su mal camino", ["Un ayuno para ganar una guerra", "Un ayuno para ser vistos", "Un ayuno de celebración"], "«y conviértase cada uno de su mal camino, de la rapiña que hay en sus manos».", "Jonás 3:5-10"],
    ["f18", 2, "o2", "recordar", "¿Qué hizo Dios cuando vio que Nínive se convirtió de su mal camino?", "Se arrepintió del mal que había dicho que les haría, y no lo hizo", ["Destruyó la ciudad igual", "Castigó a Jonás", "Se olvidó de ellos"], "«y se arrepintió del mal que había dicho que les haría, y no lo hizo».", "Jonás 3:5-10"],
    ["f19", 2, "o2", "aplicar", "¿Qué enseña el ayuno de Daniel al que no puede dejar todo alimento?", "Que existe el ayuno parcial: dejar lo agradable para buscar a Dios", ["Que no puede ayunar nunca", "Que debe dejar también el agua", "Que solo vale el ayuno total"], "«No comí manjar delicado, ni entró en mi boca carne ni vino».", "Daniel 10:2-3"],
    ["f20", 2, "o2", "evaluar", "¿Qué tienen en común los ayunos del Antiguo Testamento?", "Acompañaban momentos decisivos en que el pueblo buscaba a Dios", ["Se hacían para bajar de peso", "Eran fiestas", "Se hacían para que todos los vieran"], "«Ayunamos, pues, y pedimos a nuestro Dios sobre esto».", "Esdras 8:21-23"],
    // Lección 3 · Jesús y la iglesia ayunan
    ["f21", 3, "o3", "recordar", "¿Cuánto tiempo ayunó Jesús en el desierto?", "Cuarenta días y cuarenta noches", ["Tres días", "Siete días", "Doce días"], "«Y después de haber ayunado cuarenta días y cuarenta noches, tuvo hambre».", "Mateo 4:1-4"],
    ["f22", 3, "o3", "recordar", "¿Qué le propuso el tentador a Jesús?", "Que convirtiera las piedras en pan", ["Que se fuera del desierto", "Que comiera con los fariseos", "Que dejara de orar"], "«di que estas piedras se conviertan en pan».", "Mateo 4:1-4"],
    ["f23", 3, "o3", "comprender", "¿De qué libro tomó Jesús su respuesta al tentador?", "De Deuteronomio", ["De Isaías", "De los Salmos", "De Génesis"], "«no sólo de pan vivirá el hombre, mas de todo lo que sale de la boca de Jehová vivirá el hombre».", "Deuteronomio 8:3"],
    ["f24", 3, "o3", "analizar", "¿Cuál es la lección más profunda del ayuno, según la respuesta de Jesús?", "Que nuestra vida depende de Dios y de su Palabra más que del pan", ["Que comer es pecado", "Que el cuerpo no importa", "Que siempre hay que ayunar cuarenta días"], "«No sólo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios».", "Mateo 4:1-4"],
    ["f25", 3, "o3", "recordar", "¿Cómo servía Ana a Dios en el templo?", "De noche y de día con ayunos y oraciones", ["Con sacrificios", "Enseñando la ley", "Cantando en el coro"], "«sirviendo de noche y de día con ayunos y oraciones».", "Lucas 2:37"],
    ["f26", 3, "o3", "recordar", "¿Qué dijo el Espíritu Santo mientras la iglesia de Antioquía ministraba y ayunaba?", "Apartadme a Bernabé y a Saulo para la obra a que los he llamado", ["Id todos a Jerusalén", "Dejad de ayunar", "Construid un templo"], "«Apartadme a Bernabé y a Saulo para la obra a que los he llamado».", "Hechos 13:2-3"],
    ["f27", 3, "o3", "comprender", "¿Qué hizo la iglesia antes de despedir a Bernabé y a Saulo?", "Ayunó, oró y les impuso las manos", ["Les dio dinero", "Hizo una fiesta", "Votó en asamblea"], "«Entonces, habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
    ["f28", 3, "o3", "recordar", "¿Cómo encomendaron al Señor a los ancianos de las iglesias nuevas?", "Habiendo orado con ayunos", ["Con una votación", "Con una carta", "Con una ofrenda"], "«y habiendo orado con ayunos, los encomendaron al Señor en quien habían creído».", "Hechos 14:23"],
    ["f29", 3, "o3", "recordar", "¿Qué menciona Pablo entre sus trabajos por el evangelio en 2 Corintios 11:27?", "Muchos ayunos", ["Muchas fiestas", "Muchos viajes de descanso", "Muchas riquezas"], "«en hambre y sed, en muchos ayunos, en frío y en desnudez».", "2 Corintios 11:27"],
    ["f30", 3, "o3", "evaluar", "¿Qué enseña la iglesia primitiva sobre el ayuno y las decisiones?", "Que las decisiones importantes se tomaban buscando a Dios con oración y ayuno", ["Que las decisiones se tomaban solo por votos", "Que el ayuno no tenía que ver con el servicio", "Que solo los apóstoles ayunaban"], "«Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo».", "Hechos 13:2-3"],
    // Lección 4 · El ayuno que Dios escogió
    ["f31", 4, "o4", "recordar", "¿Para qué ayunaba el pueblo, según Isaías 58:4?", "Para contiendas y debates", ["Para ayudar al pobre", "Para buscar a Dios de corazón", "Para perdonar"], "«He aquí que para contiendas y debates ayunáis».", "Isaías 58:3-7"],
    ["f32", 4, "o4", "comprender", "¿Qué rechaza Dios en Isaías 58?", "El ayuno vacío, que convive con la injusticia", ["Todo ayuno", "El ayuno en secreto", "El ayuno con oración"], "«¿Es tal el ayuno que yo escogí, que de día aflija el hombre su alma?».", "Isaías 58:3-7"],
    ["f33", 4, "o4", "recordar", "¿Qué incluye el ayuno que Dios escogió, según Isaías 58:6?", "Desatar las ligaduras de impiedad y soltar las cargas de opresión", ["Comer solo pan y agua", "Vestirse de cilicio y ceniza", "Inclinar la cabeza como junco"], "«desatar las ligaduras de impiedad, soltar las cargas de opresión».", "Isaías 58:3-7"],
    ["f34", 4, "o4", "recordar", "¿Qué hace con el hambriento el que ayuna como Dios quiere?", "Parte su pan con él", ["Lo despide", "Le pide que ayune también", "Lo ignora"], "«que partas tu pan con el hambriento».", "Isaías 58:3-7"],
    ["f35", 4, "o4", "comprender", "¿Qué promete Dios al que ayuna como él escogió, según Isaías 58:9?", "Invocarás, y te oirá Jehová; clamarás, y dirá él: Heme aquí", ["Que nunca tendrá hambre", "Que será rico", "Que ya no tendrá que orar"], "«Entonces invocarás, y te oirá Jehová; clamarás, y dirá él: Heme aquí».", "Isaías 58:8-9"],
    ["f36", 4, "o4", "recordar", "¿Qué pregunta hizo Dios al pueblo por medio de Zacarías?", "¿Habéis ayunado para mí?", ["¿Habéis comido lo suficiente?", "¿Habéis construido el templo?", "¿Habéis pagado el diezmo?"], "«¿habéis ayunado para mí?».", "Zacarías 7:5"],
    ["f37", 4, "o4", "analizar", "¿Qué peligro muestra la pregunta de Zacarías 7:5?", "Que el ayuno se vuelva una costumbre religiosa sin Dios en el centro", ["Que se ayune demasiado poco", "Que se ayune en secreto", "Que se ayune con oración"], "«Cuando ayunasteis y llorasteis en el quinto y en el séptimo mes estos setenta años, ¿habéis ayunado para mí?».", "Zacarías 7:5"],
    ["f38", 4, "o4", "recordar", "¿Cuántas veces a la semana decía ayunar el fariseo de la parábola?", "Dos veces", ["Una vez", "Siete veces", "Ninguna"], "«ayuno dos veces a la semana, doy diezmos de todo lo que gano».", "Lucas 18:11-12"],
    ["f39", 4, "o4", "aplicar", "Un creyente ayuna mucho y mira con desprecio a los que no ayunan. ¿Qué le enseña el fariseo de Lucas 18?", "Que el ayuno con orgullo no acerca a Dios", ["Que hace bien en compararse", "Que debe ayunar más para ser mejor", "Que Dios premia al que ayuna más"], "«Dios, te doy gracias porque no soy como los otros hombres».", "Lucas 18:11-12"],
    ["f40", 4, "o4", "evaluar", "¿Qué ayuno agrada a Dios, según Isaías 58?", "El que va unido a la justicia y a la misericordia", ["El que se hace para contiendas", "El que oprime a los trabajadores", "El que busca el propio gusto"], "«y a los pobres errantes albergues en casa».", "Isaías 58:3-7"],
    // Lección 5 · Cómo ayunar con sabiduría
    ["f41", 5, "o5", "recordar", "¿Qué es un ayuno parcial, según la lección?", "Dejar ciertos alimentos por un tiempo, como hizo Daniel", ["Dejar el agua", "Comer el doble", "Ayunar solo una hora"], "«No comí manjar delicado, ni entró en mi boca carne ni vino».", "Daniel 10:2-3"],
    ["f42", 5, "o5", "comprender", "¿Por qué el ayuno sin agua es excepcional, según la lección?", "Porque puede ser peligroso para la salud", ["Porque es el más espiritual", "Porque es el que Dios manda siempre", "Porque es el más fácil"], "«y no comáis ni bebáis en tres días, noche y día».", "Ester 4:16"],
    ["f43", 5, "o5", "recordar", "¿Qué manda Joel 2:15 además de proclamar ayuno?", "Tocar trompeta y convocar asamblea", ["Ofrecer sacrificios", "Salir a la guerra", "Construir un altar"], "«Tocad trompeta en Sion, proclamad ayuno, convocad asamblea».", "Joel 2:15"],
    ["f44", 5, "o5", "comprender", "¿Cómo participa cada uno en un ayuno de toda la iglesia, según la lección?", "Según su salud, con sabiduría pastoral", ["Todos igual, sin excepción", "Solo los líderes", "Sin agua, para que valga más"], "«proclamad ayuno, convocad asamblea».", "Joel 2:15"],
    ["f45", 5, "o5", "recordar", "¿Qué hace el que ayuna en secreto, según Mateo 6:17-18?", "Unge su cabeza y lava su rostro para no mostrar que ayuna", ["Se viste de luto", "Anuncia su ayuno", "Deja de trabajar"], "«unge tu cabeza y lava tu rostro, para no mostrar a los hombres que ayunas».", "Mateo 6:17-18"],
    ["f46", 5, "o5", "aplicar", "Es tu primer ayuno. ¿Cómo conviene empezar, según la lección?", "Con poco, por ejemplo una comida o un día, y con un propósito claro", ["Con cuarenta días sin agua", "Sin propósito, solo para probar", "Con tres días sin comer ni beber"], "«Pero tú, cuando ayunes, unge tu cabeza y lava tu rostro».", "Mateo 6:17-18"],
    ["f47", 5, "o5", "aplicar", "¿Qué se hace con el tiempo de las comidas durante el ayuno, según la lección?", "Se usa para orar y leer la Biblia", ["Se usa para dormir", "Se usa para ver televisión", "Se usa para trabajar más"], "«para no mostrar a los hombres que ayunas, sino a tu Padre que está en secreto».", "Mateo 6:17-18"],
    ["f48", 5, "o5", "evaluar", "¿Quiénes deben consultar a su médico antes de ayunar, según la lección?", "Los que tienen una enfermedad o toman medicinas, las embarazadas o las que amamantan, los mayores y los menores de edad", ["Nadie", "Solo los pastores", "Solo los que ayunan más de cuarenta días"], "«vuestro cuerpo es templo del Espíritu Santo».", "1 Corintios 6:19-20"],
    ["f49", 5, "o5", "comprender", "¿Qué hay que hacer si durante el ayuno aparece mareo fuerte, dolor o confusión?", "Suspender el ayuno y buscar ayuda", ["Seguir hasta el final", "Ayunar también sin agua", "No decirle a nadie"], "«glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu».", "1 Corintios 6:19-20"],
    ["f50", 5, "o5", "analizar", "¿Qué relación hay entre ayunar con sabiduría y 1 Corintios 6:19-20?", "Que cuidar la salud al ayunar honra a Dios en el cuerpo, que es templo del Espíritu", ["Que el cuerpo no importa al ayunar", "Que hay que castigar el cuerpo", "Que el ayuno es solo del cuerpo"], "«glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu, los cuales son de Dios».", "1 Corintios 6:19-20"],
    // Lección 6 · Los peligros y los frutos del ayuno
    ["f51", 6, "o6", "recordar", "¿Qué hacían los hipócritas para mostrar que ayunaban?", "Demudaban sus rostros", ["Lavaban su rostro", "Ungían su cabeza", "Ayunaban en secreto"], "«porque ellos demudan sus rostros para mostrar a los hombres que ayunan».", "Mateo 6:16"],
    ["f52", 6, "o6", "comprender", "¿Qué recibe el que ayuna para ser visto?", "Solo el aplauso: ya tiene su recompensa", ["Más bendición de Dios", "Una recompensa mayor en el cielo", "La respuesta a su oración"], "«de cierto os digo que ya tienen su recompensa».", "Mateo 6:16"],
    ["f53", 6, "o6", "analizar", "¿Por qué el ayuno no es una huelga de hambre para obligar a Dios?", "Porque con él no compramos nada: ayunamos para humillarnos y buscar a Dios", ["Porque Dios no oye al que ayuna", "Porque el ayuno es malo", "Porque hay que ayunar sin orar"], "«Afligí con ayuno mi alma».", "Salmos 35:13"],
    ["f54", 6, "o6", "recordar", "¿Qué fama tienen las reglas de duro trato del cuerpo, según Colosenses 2:23?", "Cierta reputación de sabiduría", ["Fama de locura", "Ninguna fama", "Fama de ser del diablo"], "«Tales cosas tienen a la verdad cierta reputación de sabiduría en culto voluntario».", "Colosenses 2:23"],
    ["f55", 6, "o6", "comprender", "¿Qué no puede hacer la dureza con el cuerpo, según Colosenses 2:23?", "Vencer los apetitos de la carne", ["Cansar el cuerpo", "Dar fama", "Parecer sabio"], "«pero no tienen valor alguno contra los apetitos de la carne».", "Colosenses 2:23"],
    ["f56", 6, "o6", "recordar", "¿Cómo dice el salmista que afligió su alma?", "Con ayuno", ["Con vino", "Con riquezas", "Con fiestas"], "«Afligí con ayuno mi alma».", "Salmos 35:13"],
    ["f57", 6, "o6", "recordar", "¿Qué hizo Acab cuando oyó las palabras de juicio?", "Rasgó sus vestidos, se puso cilicio, ayunó y anduvo humillado", ["Mandó matar a Elías", "Se rió", "Se fue de Israel"], "«rasgó sus vestidos y puso cilicio sobre su carne, ayunó, y durmió en cilicio, y anduvo humillado».", "1 Reyes 21:27-29"],
    ["f58", 6, "o6", "analizar", "¿Qué muestra la respuesta de Dios a Acab?", "Que Dios mira al que se humilla", ["Que Dios no oye a los reyes", "Que el ayuno no sirve", "Que Acab era justo"], "«Pues por cuanto se ha humillado delante de mí, no traeré el mal en sus días».", "1 Reyes 21:27-29"],
    ["f59", 6, "o6", "aplicar", "Después de un ayuno, ¿cómo saber si dio fruto, según la lección?", "Por la humildad, la dependencia de Dios, el hambre de su Palabra y la compasión por otros", ["Por los kilos que se bajaron", "Por cuántos se enteraron", "Por lo largo que fue"], "«No sólo de pan vivirá el hombre».", "Mateo 4:1-4"],
    ["f60", 6, "o6", "evaluar", "¿Cuál de estas actitudes es correcta al ayunar?", "Humillarse delante de Dios y buscarlo, en secreto y con misericordia", ["Mostrar el ayuno para ser admirado", "Pensar que el ayuno gana méritos", "Castigar el cuerpo para ser santo"], "«Afligí con ayuno mi alma».", "Salmos 35:13"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿A quién se muestra el ayuno, según Mateo 6:18?", "Al Padre que está en secreto", ["A los hombres", "A los líderes", "A la familia"], "«sino a tu Padre que está en secreto».", "Mateo 6:16-18"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué no ayunaban los discípulos mientras Jesús estaba con ellos?", "Porque era tiempo de fiesta, como en una boda con el esposo presente", ["Porque Jesús lo prohibió para siempre", "Porque no les gustaba", "Porque eran fariseos"], "«¿Acaso pueden los que están de bodas tener luto entre tanto que el esposo está con ellos?».", "Mateo 9:14-15"],
      ["m1-03", 1, "o1", "aplicar", "Alguien quiere hacer dieta para bajar de peso y llamarla ayuno espiritual. ¿Qué le enseña la lección?", "Que el ayuno bíblico es para buscar a Dios, no una dieta", ["Que está bien", "Que así el ayuno vale más", "Que Dios premia la dieta"], "«para no mostrar a los hombres que ayunas, sino a tu Padre que está en secreto».", "Mateo 6:16-18"],
      ["m1-04", 1, "o1", "recordar", "¿Qué acompaña el ayuno en Joel 2:12?", "El lloro, el lamento y un corazón que se vuelve a Dios", ["La fiesta, la música y la danza", "El oro, la plata y el bronce", "El sacrificio, el incienso y el aceite"], "«convertíos a mí con todo vuestro corazón, con ayuno y lloro y lamento».", "Joel 2:12-13"],
      ["m1-05", 1, "o1", "comprender", "¿Cómo describe Joel a Dios al llamar al ayuno?", "Misericordioso y clemente, tardo para la ira y grande en misericordia", ["Duro y lejano", "Indiferente", "Siempre airado"], "«porque misericordioso es y clemente, tardo para la ira y grande en misericordia».", "Joel 2:12-13"],
      ["m1-06", 1, "o1", "analizar", "¿Qué muestra la frase rasgad vuestro corazón, y no vuestros vestidos?", "Que Dios mira el corazón y no solo lo exterior", ["Que hay que romper la ropa", "Que el ayuno es solo exterior", "Que no importa el corazón"], "«Rasgad vuestro corazón, y no vuestros vestidos».", "Joel 2:12-13"],
      ["m1-07", 2, "o2", "recordar", "¿Qué hizo David por el niño, además de rogar y ayunar?", "Pasó la noche acostado en tierra", ["Hizo una fiesta", "Salió a la guerra", "Viajó a Egipto"], "«y entró, y pasó la noche acostado en tierra».", "2 Samuel 12:16"],
      ["m1-08", 2, "o2", "comprender", "¿Qué le habían dicho Esdras y los suyos al rey?", "Que la mano de Dios es para bien sobre los que le buscan", ["Que necesitaban un ejército", "Que no creían en Dios", "Que volverían pronto"], "«La mano de nuestro Dios es para bien sobre todos los que le buscan».", "Esdras 8:21-23"],
      ["m1-09", 2, "o2", "recordar", "¿Qué dijo Ester que haría después de ayunar?", "Entrar a ver al rey, aunque no fuera conforme a la ley", ["Huir de Susa", "Esconderse", "Volver a su casa"], "«y entonces entraré a ver al rey, aunque no sea conforme a la ley».", "Ester 4:16"],
      ["m1-10", 2, "o2", "recordar", "¿Quiénes creyeron a Dios y proclamaron ayuno en Jonás 3:5?", "Los hombres de Nínive", ["Los de Jerusalén", "Los egipcios", "Los filisteos"], "«Y los hombres de Nínive creyeron a Dios, y proclamaron ayuno».", "Jonás 3:5-10"],
      ["m1-11", 2, "o2", "aplicar", "¿Qué enseña Nínive sobre el ayuno y el arrepentimiento?", "Que el ayuno acompaña el volverse del mal camino", ["Que basta con no comer", "Que no hace falta cambiar", "Que solo los profetas ayunan"], "«y conviértase cada uno de su mal camino».", "Jonás 3:5-10"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estos ayunos fue extraordinario y no es un modelo para imitar?", "Los cuarenta días de Moisés sin comer ni beber agua", ["El ayuno parcial de Daniel", "El ayuno de Esdras por el camino", "El ayuno de David por el niño"], "«no comió pan, ni bebió agua».", "Éxodo 34:28"],
      ["m1-13", 3, "o3", "recordar", "¿Qué tuvo Jesús después de ayunar cuarenta días?", "Hambre", ["Sueño", "Miedo", "Frío"], "«Y después de haber ayunado cuarenta días y cuarenta noches, tuvo hambre».", "Mateo 4:1-4"],
      ["m1-14", 3, "o3", "comprender", "¿Con qué venció Jesús al tentador en el desierto?", "Con la Escritura: escrito está", ["Con un milagro", "Con los ángeles", "Con su silencio"], "«Él respondió y dijo: Escrito está».", "Mateo 4:1-4"],
      ["m1-15", 3, "o3", "recordar", "¿Dónde servía Ana con ayunos y oraciones?", "En el templo", ["En la sinagoga de Nazaret", "En el desierto", "Solo en su casa"], "«y no se apartaba del templo, sirviendo de noche y de día con ayunos y oraciones».", "Lucas 2:37"],
      ["m1-16", 3, "o3", "aplicar", "Tu iglesia va a enviar a un misionero. ¿Qué ejemplo da Hechos 13:3?", "Ayunar, orar e imponerle las manos antes de despedirlo", ["Despedirlo sin orar", "Esperar a que se vaya solo", "Hacer solo una fiesta"], "«Entonces, habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
      ["m1-17", 3, "o3", "analizar", "¿Qué relación muestra Hechos 13:2 entre ayunar y oír a Dios?", "Que mientras la iglesia ministraba y ayunaba, el Espíritu Santo habló", ["Que el ayuno impide oír a Dios", "Que Dios solo habla en las fiestas", "Que no hay relación"], "«Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo».", "Hechos 13:2-3"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué muestra la mención de muchos ayunos en la vida de Pablo?", "Que el ayuno era parte de la vida de los que servían al evangelio", ["Que Pablo no comía nunca", "Que el ayuno era un castigo", "Que solo Pablo ayunaba"], "«en hambre y sed, en muchos ayunos».", "2 Corintios 11:27"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hacía el pueblo con el puño en sus días de ayuno?", "Herir inicuamente", ["Orar", "Dar limosna", "Trabajar"], "«y para herir con el puño inicuamente».", "Isaías 58:3-7"],
      ["m2-02", 4, "o4", "comprender", "¿Por qué Dios no hacía caso del ayuno de Israel?", "Porque ayunaban mientras buscaban su gusto y oprimían a otros", ["Porque ayunaban poco", "Porque no tenían templo", "Porque Dios no oye"], "«en el día de vuestro ayuno buscáis vuestro propio gusto, y oprimís a todos vuestros trabajadores».", "Isaías 58:3-7"],
      ["m2-03", 4, "o4", "recordar", "¿Qué hace con el desnudo el que ayuna como Dios escogió?", "Lo cubre", ["Lo ignora", "Lo juzga", "Lo despide"], "«que cuando veas al desnudo, lo cubras».", "Isaías 58:3-7"],
      ["m2-04", 4, "o4", "comprender", "¿Qué nacerá como el alba, según Isaías 58:8?", "Tu luz", ["Tu riqueza", "Tu fama", "Tu casa"], "«Entonces nacerá tu luz como el alba».", "Isaías 58:8-9"],
      ["m2-05", 4, "o4", "aplicar", "¿Cómo puede un intercesor aplicar Isaías 58 a su ayuno?", "Acompañándolo con justicia y con ayuda a los necesitados", ["Ayunando más días para impresionar", "Ayunando solo por sus intereses", "Dejando de ayudar mientras ayuna"], "«y a los pobres errantes albergues en casa».", "Isaías 58:3-7"],
      ["m2-06", 4, "o4", "evaluar", "¿Qué pregunta debe hacerse el que ayuna, según Zacarías 7:5?", "Si de verdad ayuna para Dios", ["Si los demás lo ven", "Si ayunó más que otros", "Si bajó de peso"], "«¿habéis ayunado para mí?».", "Zacarías 7:5"],
      ["m2-07", 5, "o5", "recordar", "¿Qué es el ayuno normal, según la lección?", "Dejar de comer por un tiempo, bebiendo agua", ["Dejar el agua por tres días", "Comer solo pan", "Ayunar sin orar"], "«Pero tú, cuando ayunes, unge tu cabeza y lava tu rostro».", "Mateo 6:17-18"],
      ["m2-08", 5, "o5", "comprender", "¿En qué se diferencian el ayuno personal y el congregacional?", "El personal es en secreto entre el creyente y Dios; el congregacional, cuando la iglesia lo proclama", ["Son lo mismo", "Uno es sin agua y el otro con agua", "Uno es para los pastores y el otro para los niños"], "«proclamad ayuno, convocad asamblea».", "Joel 2:15"],
      ["m2-09", 5, "o5", "aplicar", "¿Cuál es el primer paso para un ayuno con propósito, según la lección?", "Definir por qué vas a ayunar y por quién vas a orar", ["Contárselo a todos", "Elegir el ayuno más largo", "Dejar el agua"], "«sino a tu Padre que está en secreto».", "Mateo 6:17-18"],
      ["m2-10", 5, "o5", "aplicar", "¿Cómo conviene terminar un ayuno, según la lección?", "Con una comida liviana", ["Con una comida muy abundante", "Con otro ayuno sin agua", "Sin comer por otro día más"], "«glorificad, pues, a Dios en vuestro cuerpo».", "1 Corintios 6:19-20"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué un menor de edad o una embarazada deben consultar antes de ayunar?", "Porque su salud necesita un cuidado especial, y el cuerpo es templo del Espíritu Santo", ["Porque no pueden orar", "Porque Dios no los oye", "Porque el ayuno es solo para pastores"], "«vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros».", "1 Corintios 6:19-20"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué dice la lección sobre dejar por un tiempo las redes sociales o la televisión?", "Que es una práctica útil, aunque en la Biblia el ayuno es dejar el alimento", ["Que es el único ayuno bíblico", "Que está prohibido", "Que reemplaza la oración"], "«glorificad, pues, a Dios en vuestro cuerpo y en vuestro espíritu».", "1 Corintios 6:19-20"],
      ["m2-13", 6, "o6", "recordar", "¿Qué peligro del ayuno señala Mateo 6:16?", "Ayunar para que los hombres nos vean", ["Ayunar en secreto", "Ayunar con oración", "Ayunar con el rostro lavado"], "«para mostrar a los hombres que ayunan».", "Mateo 6:16"],
      ["m2-14", 6, "o6", "comprender", "¿Qué no reemplaza el ayuno, según la lección?", "La obra del Espíritu ni la obediencia", ["La comida", "El sueño", "El trabajo"], "«pero no tienen valor alguno contra los apetitos de la carne».", "Colosenses 2:23"],
      ["m2-15", 6, "o6", "recordar", "¿Cuándo se vistió de cilicio el salmista y afligió con ayuno su alma?", "Cuando otros enfermaron", ["Cuando ganó una guerra", "Cuando fue coronado", "Cuando celebró una fiesta"], "«Pero yo, cuando ellos enfermaron, me vestí de cilicio».", "Salmos 35:13"],
      ["m2-16", 6, "o6", "aplicar", "Un hermano dice que si ayuna suficientes días, Dios tendrá que darle lo que pide. ¿Qué le enseña la lección?", "Que el ayuno no obliga a Dios: es humillarse y buscarlo", ["Que tiene razón", "Que debe ayunar sin agua", "Que Dios premia al que ayuna más días"], "«Afligí con ayuno mi alma».", "Salmos 35:13"],
      ["m2-17", 6, "o6", "analizar", "¿Qué le dijo Dios a Elías sobre Acab?", "Que no traería el mal en sus días, porque se había humillado", ["Que lo castigaría enseguida", "Que lo haría profeta", "Que no le importaba"], "«Pues por cuanto se ha humillado delante de mí, no traeré el mal en sus días».", "1 Reyes 21:27-29"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál de estos es un fruto del ayuno bien vivido?", "Más humildad y más hambre de Dios y de su Palabra", ["Más orgullo espiritual", "Más fama", "Más méritos para la salvación"], "«Afligí con ayuno mi alma».", "Salmos 35:13"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "intercesion-3-e1",
      tipo: "corta",
      pregunta: "Explica qué es el ayuno bíblico y cómo enseñó Jesús a practicarlo.",
      ideas: [
        { id: "definicion", peso: 30, texto: "Dejar de comer por un tiempo para buscar a Dios y humillarse delante de él.", formas: ["dejar de comer", "abstener*", "no comer", "sin comer", "buscar a dios", "humillarse"], negativa: true },
        { id: "cuando", peso: 20, texto: "Jesús dijo cuando ayunéis: espera que sus discípulos ayunen.", formas: ["cuando ayuneis", "cuando ayunes", "da por hecho", "entonces ayunaran", "espera que"] },
        { id: "secreto", peso: 30, texto: "En secreto, delante del Padre, no para ser vistos.", formas: ["en secreto", "en lo secreto", "para ser vistos", "lava tu rostro", "rostro lavado", "unge tu cabeza", "sin mostrar"] },
        { id: "no_dieta", peso: 10, texto: "No es una dieta ni una forma de presionar a Dios.", formas: ["no es una dieta", "ni una dieta", "no es dieta", "no es hacer dieta", "no es para bajar", "presionar*", "obligar a dios", "huelga de hambre"], negativa: true },
      ],
      citas: ["Mateo 6:16-18", "Mateo 6:16", "Mateo 6:17-18", "Mateo 6:18", "Mateo 9:14-15", "Mateo 9:15", "Joel 2:12-13", "Joel 2:13"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Ayunar es dejar de comer por un tiempo para buscar a Dios y humillarse delante de él; no es una dieta ni una forma de presionarlo. Jesús dijo cuando ayunéis: da por hecho que sus discípulos ayunarán. Y enseñó a hacerlo en secreto, con el rostro lavado, delante del Padre que ve en lo secreto (Mateo 6:17-18).",
    },
    {
      id: "intercesion-3-e2",
      tipo: "corta",
      pregunta: "Explica cuál es el ayuno que Dios escogió, según Isaías 58.",
      ideas: [
        { id: "vacio", peso: 25, texto: "Dios rechazó el ayuno que buscaba el propio gusto y oprimía a otros.", formas: ["propio gusto", "oprim*", "contiendas", "injusticia", "ayuno vacio", "rechaz*"] },
        { id: "justicia", peso: 35, texto: "Desatar las ligaduras de impiedad, soltar las cargas de opresión y romper todo yugo.", formas: ["ligaduras", "cargas de opresion", "todo yugo", "dejar ir libres", "quebrantados", "justicia"] },
        { id: "misericordia", peso: 20, texto: "Partir el pan con el hambriento, recibir al pobre y cubrir al desnudo.", formas: ["partir el pan", "partas tu pan", "hambriento", "pobres", "desnudo", "misericordia"] },
        { id: "promesa", peso: 10, texto: "Dios oye: invocarás, y te oirá Jehová.", formas: ["te oira", "heme aqui", "invocaras", "nos oye", "dios oye"] },
      ],
      citas: ["Isaías 58:3-7", "Isaías 58:6", "Isaías 58:7", "Isaías 58:6-7", "Isaías 58:8-9", "Isaías 58:9", "Zacarías 7:5"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Israel ayunaba mientras buscaba su propio gusto y oprimía a sus trabajadores, y Dios rechazó ese ayuno vacío. El ayuno que él escogió es desatar las ligaduras de impiedad, soltar las cargas de opresión y romper todo yugo (Isaías 58:6), y partir el pan con el hambriento. A ese ayuno, Dios promete: invocarás, y te oirá Jehová.",
    },
    {
      id: "intercesion-3-e3",
      tipo: "corta",
      pregunta: "Explica cómo ayunaron Jesús y la iglesia primitiva, y qué enseña su ejemplo.",
      ideas: [
        { id: "jesus", peso: 25, texto: "Jesús ayunó cuarenta días, llevado por el Espíritu al desierto.", formas: ["cuarenta dias", "en el desierto", "al desierto", "llevado por el espiritu", "guiado por el espiritu"] },
        { id: "palabra", peso: 25, texto: "Respondió: no sólo de pan vivirá el hombre; dependemos de Dios y de su Palabra.", formas: ["no solo de pan", "de toda palabra", "con la palabra", "su palabra", "escrito esta", "depend*"], negativa: true },
        { id: "iglesia", peso: 30, texto: "La iglesia ayunaba al servir, al recibir la dirección del Espíritu, al enviar y al encomendar a sus líderes.", formas: ["antioquia", "bernabe", "saulo", "ministrando", "envio", "enviar", "ancianos", "encomendaron", "lideres"] },
        { id: "decisiones", peso: 10, texto: "Las decisiones importantes se toman buscando a Dios con ayuno.", formas: ["decision*", "decidir", "nos guie", "guia de dios", "direccion"] },
      ],
      citas: ["Mateo 4:1-4", "Mateo 4:4", "Mateo 4:2", "Deuteronomio 8:3", "Hechos 13:2-3", "Hechos 13:2", "Hechos 14:23", "Lucas 2:37", "2 Corintios 11:27"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Jesús, llevado por el Espíritu al desierto, ayunó cuarenta días y venció al tentador con la Palabra: no sólo de pan vivirá el hombre (Mateo 4:4). La iglesia de Antioquía ayunaba mientras servía, recibió del Espíritu el llamado de Bernabé y Saulo, y los envió con ayuno. Su ejemplo enseña a tomar las decisiones importantes buscando a Dios.",
    },
    {
      id: "intercesion-3-e4",
      tipo: "breve",
      pregunta:
        "Una hermana nueva te pregunta si debe ayunar y cómo hacerlo. Escríbele un consejo, con la Biblia, sobre cómo ayunar con propósito y con sabiduría, cuidando su salud.",
      ideas: [
        { id: "proposito", peso: 20, texto: "Ayunar con un propósito, para buscar a Dios, con oración y la Palabra.", formas: ["proposito", "orar y leer", "la palabra", "la biblia", "buscar a dios"] },
        { id: "secreto", peso: 15, texto: "En secreto, delante del Padre.", formas: ["en secreto", "lo secreto", "lava tu rostro", "rostro lavado", "unge tu cabeza", "sin mostrar"] },
        { id: "empezar", peso: 20, texto: "Empezar con poco, beber agua y terminar con una comida liviana.", formas: ["empezar con poco", "empieza con poco", "una comida", "un dia", "beber agua", "bebe agua", "comida liviana"] },
        { id: "salud", peso: 30, texto: "Cuidar la salud: consultar al médico si tiene una enfermedad, toma medicinas o está embarazada; el cuerpo es templo.", formas: ["medico", "salud", "medicinas", "embarazada", "templo del espiritu", "diabetes", "enfermedad"] },
        { id: "clases", peso: 15, texto: "Hay ayuno normal, parcial (como Daniel) y de toda la iglesia.", formas: ["parcial", "como daniel", "ayuno normal", "congregacional", "toda la iglesia"] },
      ],
      basta: 85,
      citas: ["Mateo 6:16-18", "Mateo 6:17-18", "Mateo 6:17", "Mateo 6:18", "Daniel 10:2-3", "Daniel 10:3", "1 Corintios 6:19-20", "1 Corintios 6:19", "Joel 2:15", "Isaías 58:6", "Mateo 4:4"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querida hermana: sí, el ayuno es parte de la vida cristiana. Jesús dijo cuando ayunes, y enseñó a hacerlo en secreto, con el rostro lavado, delante del Padre que ve en lo secreto (Mateo 6:17-18). Antes de empezar, define tu propósito: por qué vas a ayunar y por quién vas a orar, y usa el tiempo de las comidas para orar y leer la Biblia. Empieza con poco, una comida o un día, bebe agua y termina con una comida liviana. También puedes hacer un ayuno parcial, como Daniel, que dejó la carne, el vino y los manjares delicados. Y cuida tu salud: si tienes alguna enfermedad, tomas medicinas o estás embarazada, consulta primero a tu médico, porque tu cuerpo es templo del Espíritu Santo (1 Corintios 6:19). Si sientes mareo fuerte o dolor, suspende el ayuno. Lo importante no es cuánto aguantas, sino buscar a Dios con humildad.",
    },
    {
      id: "intercesion-3-e5",
      tipo: "breve",
      pregunta: "Explica a un grupo de intercesores los peligros del ayuno y los frutos que da cuando se vive bien, con citas bíblicas.",
      ideas: [
        { id: "visto", peso: 20, texto: "Peligro: ayunar para ser visto; ya tienen su recompensa.", formas: ["ser vistos", "ser visto", "su recompensa", "hipocrit*", "para que nos vean", "aplauso"] },
        { id: "meritos", peso: 20, texto: "Peligro: pensar que gana méritos o que obliga a Dios.", formas: ["merito*", "obligar a dios", "obliga a dios", "presionar*", "huelga de hambre", "no se compra"], negativa: true },
        { id: "cuerpo", peso: 15, texto: "Peligro: creer que la dureza con el cuerpo vence a la carne.", formas: ["duro trato", "apetitos de la carne", "castigar el cuerpo", "dureza"] },
        { id: "injusticia", peso: 10, texto: "Peligro: ayunar y seguir en la injusticia.", formas: ["injusticia", "oprim*", "propio gusto"] },
        { id: "frutos", peso: 35, texto: "Frutos: humildad, dependencia, hambre de oración y de la Palabra, dirección y compasión.", formas: ["humildad", "humill*", "dependencia", "depend*", "direccion", "compasion", "no solo de pan"] },
      ],
      basta: 85,
      citas: ["Mateo 6:16", "Mateo 6:16-18", "Colosenses 2:23", "Salmos 35:13", "1 Reyes 21:29", "1 Reyes 21:27-29", "Isaías 58:3-7", "Isaías 58:3", "Mateo 4:4", "Hechos 13:2-3", "Lucas 18:12"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, el ayuno es una práctica bíblica, pero se puede torcer. El primer peligro es ayunar para ser vistos: de los hipócritas que mostraban su ayuno, Jesús dijo que ya tienen su recompensa (Mateo 6:16). El segundo es pensar que el ayuno gana méritos o que obliga a Dios, como una huelga de hambre; la gracia no se compra. El tercero es creer que el duro trato del cuerpo nos hace santos: Pablo dice que esas reglas no tienen valor alguno contra los apetitos de la carne (Colosenses 2:23). Y el cuarto es ayunar mientras se sigue en la injusticia, como Israel, que buscaba su propio gusto en el día de su ayuno. Pero bien vivido, el ayuno da frutos. Nos humilla delante de Dios, como al salmista que afligió con ayuno su alma; nos enseña dependencia, porque no sólo de pan vivirá el hombre; aumenta el hambre de oración y de la Palabra; trae dirección, como en Antioquía; y nos llena de compasión por los demás. Dios mira al que se humilla.",
    },
  ],
  breve: {
    id: "intercesion-3-b1",
    tipo: "breve",
    pregunta:
      "Escribe tu plan para incorporar el ayuno a tu vida de intercesión: con qué propósito, de qué forma, cómo cuidarás tu salud y qué peligros evitarás, con citas bíblicas.",
    ideas: [
      { id: "proposito", peso: 25, texto: "Dice con qué propósito o por quién ayunará.", formas: ["proposito", "por mi familia", "por mi iglesia", "para pedir", "para buscar", "direccion", "por los perdidos", "intercesion"] },
      { id: "forma", peso: 20, texto: "Dice cómo: frecuencia, clase de ayuno y tiempo de oración y Palabra.", formas: ["una comida", "un dia", "cada semana", "cada mes", "parcial", "orar y leer", "la biblia", "la palabra"] },
      { id: "salud", peso: 20, texto: "Dice cómo cuidará su salud.", formas: ["salud", "medico", "agua", "comida liviana", "templo del espiritu", "medicina*"] },
      { id: "peligros", peso: 20, texto: "Dice qué peligros evitará.", formas: ["en secreto", "ser visto", "ser vista", "merito*", "orgullo", "obligar a dios", "presionar*", "para que me vean"], negativa: true },
      { id: "misericordia", peso: 15, texto: "Une el ayuno a la misericordia.", formas: ["misericordia", "hambriento", "compartir", "ayudar", "los pobres", "necesitad*"] },
    ],
    basta: 85,
    citas: ["Isaías 58:6", "Isaías 58:6-7", "Isaías 58:7", "Mateo 6:16-18", "Mateo 6:17-18", "Mateo 6:18", "Mateo 4:4", "Hechos 13:2-3", "Joel 2:12-13", "Daniel 10:2-3", "1 Corintios 6:19-20", "Colosenses 2:23", "Salmos 35:13"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Antes pensaba que el ayuno era solo para algunos hermanos muy espirituales. Ahora entiendo que Jesús dijo cuando ayunéis, y quiero incorporarlo a mi vida de intercesión. Mi propósito será buscar a Dios por mi familia y por mi iglesia, y pedir dirección para las decisiones importantes, como la iglesia de Antioquía (Hechos 13:2-3). Voy a ayunar una comida cada semana y un día completo cada mes, bebiendo agua, y usaré ese tiempo para orar y leer la Biblia. Como tomo una medicina, primero hablaré con mi médico, porque mi cuerpo es templo del Espíritu Santo; si hace falta, haré un ayuno parcial, como Daniel. Evitaré ayunar para ser visto: lo haré en secreto, delante del Padre (Mateo 6:18), y no pensaré que gano méritos. Y como el ayuno que Dios escogió va unido a la misericordia, el dinero de esas comidas lo usaré para ayudar a una familia necesitada (Isaías 58:7).",
  },
};
