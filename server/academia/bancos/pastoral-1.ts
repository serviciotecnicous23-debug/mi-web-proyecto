/**
 * El banco de «El ministerio pastoral» (especialidad Ministerio pastoral, materia 1, avanzada). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 los nombres y las tareas del oficio · o2 la autoridad que sirve · o3 el equipo pastoral · o4 la disciplina
 * que restaura · o5 la protección del rebaño · o6 la salud del pastor · o7 el versículo de memoria (Hechos 20:28).
 * Sigue el estándar de docs/academia-auditoria.md: no más del 30 % de memoria, al menos un 20 % de casos, y preguntas de
 * repaso que se entienden solas en el «Repaso del día».
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `pastoral-1-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_PASTORAL_1: BancoMateria = {
  materia: "pastoral-1",
  repaso: {
    "pastoral-1-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué nombres del oficio pastoral aparecen en Hechos 20:17 y 28?", "Ancianos, obispos y la tarea de apacentar", ["Reyes, sacerdotes y profetas", "Apóstoles, levitas y jueces", "Diáconos, cantores y porteros"], "«Por tanto, mirad por vosotros, y por todo el rebaño en que el Espíritu Santo os ha puesto por obispos, para apacentar la iglesia del Señor».", "Hechos 20:28"],
      ["1-r2", 1, "o1", "comprender", "¿De quién es la iglesia, según Hechos 20:28?", "Del Señor, que la ganó por su propia sangre", ["Del pastor que la fundó", "De la familia más antigua", "Del concilio"], "«la iglesia del Señor, la cual él ganó por su propia sangre».", "Hechos 20:28"],
      ["1-r3", 1, "o1", "aplicar", "Un pastor dice que su iglesia es suya porque él la fundó. ¿Qué le enseña Tito 1:7?", "Que el obispo es administrador de Dios, no dueño", ["Que tiene razón", "Que puede venderla", "Que la iglesia es de la denominación"], "«Porque es necesario que el obispo sea irreprensible, como administrador de Dios».", "Tito 1:7-9"],
    ] as P[]).map(p),
    "pastoral-1-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hacen los gobernantes de las naciones, según Mateo 20:25?", "Se enseñorean de ellas", ["Las sirven", "Las ignoran", "Las aman"], "«Sabéis que los gobernantes de las naciones se enseñorean de ellas».", "Mateo 20:25-28"],
      ["2-r2", 2, "o2", "comprender", "¿Cómo se mide la grandeza en el reino de Dios, según Mateo 20:26?", "Por el servicio: el que quiera ser grande será servidor", ["Por el poder", "Por la riqueza", "Por la fama"], "«el que quiera hacerse grande entre vosotros será vuestro servidor».", "Mateo 20:25-28"],
      ["2-r3", 2, "o2", "aplicar", "Un anciano exige que todos le obedezcan sin hacer preguntas. ¿Qué le enseña 1 Pedro 5:3?", "Que no debe tener señorío sobre los que cuida, sino ser ejemplo", ["Que tiene derecho a exigir", "Que la obediencia ciega es bíblica", "Que debe castigar al que pregunta"], "«no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey».", "1 Pedro 5:2-3"],
    ] as P[]).map(p),
    "pastoral-1-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué le dijo Jetro a Moisés, según Éxodo 18:18?", "Que el trabajo era demasiado pesado y no podría hacerlo solo", ["Que trabajara más", "Que dejara de guiar al pueblo", "Que todo estaba bien"], "«porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", "Éxodo 18:17-18"],
      ["3-r2", 3, "o3", "comprender", "¿Qué muestra que Pablo pidiera a Tito establecer ancianos en cada ciudad?", "Que las iglesias eran guiadas por un grupo de ancianos, no por una sola persona", ["Que cada ciudad tenía un rey", "Que los ancianos eran solo de honor", "Que Tito debía hacerlo todo"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
      ["3-r3", 3, "o3", "aplicar", "Un pastor quiere formar nuevos líderes, pero solo les da clases. ¿Qué le enseña el ejemplo de Pablo con Timoteo?", "Que formar líderes es caminar juntos y servir a su lado", ["Que basta con dar clases", "Que hay que esperar a que maduren solos", "Que el liderazgo no se forma"], "«que como hijo a padre ha servido conmigo en el evangelio».", "Filipenses 2:19-22"],
    ] as P[]).map(p),
    "pastoral-1-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Cuál es el primer paso de Mateo 18:15 cuando un hermano peca contra ti?", "Ir y reprenderlo estando tú y él solos", ["Decirlo a toda la iglesia", "Publicarlo en las redes", "Ignorarlo para siempre"], "«Por tanto, si tu hermano peca contra ti, ve y repréndele estando tú y él solos».", "Mateo 18:15-17"],
      ["4-r2", 4, "o4", "comprender", "¿Cuál es la meta de la corrección, según Mateo 18:15?", "Ganar al hermano", ["Humillarlo", "Expulsarlo", "Tener la razón"], "«si te oyere, has ganado a tu hermano».", "Mateo 18:15-17"],
      ["4-r3", 4, "o4", "aplicar", "Un hermano se arrepiente después de una disciplina, pero la iglesia lo sigue tratando con frialdad. ¿Qué enseña 2 Corintios 2:7-8?", "Que deben perdonarlo, consolarlo y confirmarle su amor", ["Que lo sigan castigando", "Que lo expulsen", "Que hagan como si nada hubiera pasado"], "«así que, al contrario, vosotros más bien debéis perdonarle y consolarle».", "2 Corintios 2:6-8"],
    ] as P[]).map(p),
    "pastoral-1-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué dos peligros anunció Pablo en Hechos 20:29-30?", "Lobos rapaces de afuera, y hombres de adentro que hablarían cosas perversas", ["La pobreza y el hambre", "La persecución y la cárcel", "El cansancio y la vejez"], "«Porque yo sé que después de mi partida entrarán en medio de vosotros lobos rapaces».", "Hechos 20:29-31"],
      ["5-r2", 5, "o5", "comprender", "¿Qué suelen ir juntos en los falsos maestros, según 2 Pedro 2:1-3?", "El error en la doctrina y la avaricia", ["La humildad y el servicio", "La pobreza y la oración", "La verdad y el amor"], "«y por avaricia harán mercadería de vosotros con palabras fingidas».", "2 Pedro 2:1-3"],
      ["5-r3", 5, "o5", "aplicar", "Un voluntario nuevo quiere servir con los niños desde el primer domingo. ¿Qué medida de protección aplicas?", "Revisarlo y capacitarlo antes, y nunca dejarlo solo con un menor", ["Dejarlo servir enseguida", "Ponerlo solo para que gane experiencia", "No pedirle nada porque es cristiano"], "«Y cualquiera que haga tropezar a alguno de estos pequeños que creen en mí».", "Mateo 18:6"],
    ] as P[]).map(p),
    "pastoral-1-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué le dijo el ángel a Elías bajo el enebro, según 1 Reyes 19:5?", "Levántate, come", ["Vuelve a la batalla", "Huye más lejos", "Ayuna cuarenta días"], "«y he aquí luego un ángel le tocó, y le dijo: Levántate, come».", "1 Reyes 19:4-5"],
      ["6-r2", 6, "o6", "comprender", "¿Qué significa llevar el tesoro en vasos de barro, según 2 Corintios 4:7?", "Que el poder es de Dios y no de nosotros, que somos frágiles", ["Que el ministerio no vale nada", "Que el pastor es de hierro", "Que el tesoro es dinero"], "«Pero tenemos este tesoro en vasos de barro, para que la excelencia del poder sea de Dios, y no de nosotros».", "2 Corintios 4:7-10"],
      ["6-r3", 6, "o6", "aplicar", "Un pastor de tu red está agotado y dice que pedir ayuda es falta de fe. ¿Qué le dices?", "Que pedir ayuda no es falta de fe, y que hable con su pastor o con un profesional de la salud", ["Que tiene razón", "Que ore más y no hable con nadie", "Que deje el ministerio de inmediato"], "«Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo».", "Gálatas 6:2"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · Anciano, obispo y pastor
    ["f01", 1, "o1", "recordar", "¿Desde dónde mandó llamar Pablo a los ancianos de Éfeso, según Hechos 20:17?", "Desde Mileto", ["Desde Jerusalén", "Desde Roma", "Desde Antioquía"], "«Enviando, pues, desde Mileto a Efeso, hizo llamar a los ancianos de la iglesia».", "Hechos 20:17"],
    ["f02", 1, "o1", "comprender", "¿Qué destaca cada uno de los tres nombres del oficio pastoral: anciano, obispo y pastor?", "Anciano, la madurez; obispo, la supervisión; pastor, el apacentar", ["Anciano, la edad; obispo, el poder; pastor, el sueldo", "Los tres son títulos de honor sin tarea", "Anciano, el dinero; obispo, el templo; pastor, la música"], "Anciano destaca la madurez; obispo, la supervisión; pastor, el apacentar. Son tres caras de una misma tarea, como en Hechos 20:17 y 28, donde Pablo llama ancianos a los mismos que el Espíritu puso por obispos para apacentar.", "Hechos 20:28"],
    ["f03", 1, "o1", "analizar", "¿Por qué Pablo pide a los ancianos mirar primero por sí mismos?", "Porque el cuidado del rebaño empieza por la vida del pastor", ["Porque los ancianos no importan", "Porque el rebaño no necesita cuidado", "Porque deben pensar solo en ellos"], "«Por tanto, mirad por vosotros, y por todo el rebaño».", "Hechos 20:28"],
    ["f04", 1, "o1", "recordar", "¿Cómo llama Tito 1:7 al obispo?", "Administrador de Dios", ["Dueño de la iglesia", "Rey del pueblo", "Juez de las naciones"], "«como administrador de Dios».", "Tito 1:7-9"],
    ["f05", 1, "o1", "comprender", "¿Qué doble tarea con la Palabra le da Tito 1:9 al pastor?", "Exhortar con sana enseñanza y convencer a los que contradicen", ["Leer sin explicar y callar ante el error", "Hablar de sí mismo y entretener", "Predicar solo en las fiestas"], "«para que también pueda exhortar con sana enseñanza y convencer a los que contradicen».", "Tito 1:7-9"],
    ["f06", 1, "o1", "aplicar", "Un nuevo pastor solo predica temas de ánimo y nunca corrige los errores. ¿Qué le enseña Tito 1:9?", "Que también debe convencer con la sana enseñanza a los que contradicen", ["Que está bien así", "Que corregir no es parte del ministerio", "Que solo los ancianos corrigen"], "«y convencer a los que contradicen».", "Tito 1:7-9"],
    ["f07", 1, "o1", "aplicar", "Una iglesia elige a su pastor solo por su carisma, sin mirar si conoce la Palabra. ¿Qué requisito de Tito 1:9 olvida?", "Que sea retenedor de la palabra fiel tal como ha sido enseñada", ["Que tenga buena voz", "Que sea joven", "Que tenga muchos seguidores"], "«retenedor de la palabra fiel tal como ha sido enseñada».", "Tito 1:7-9"],
    ["f08", 1, "o1", "evaluar", "¿Cuál de estas no es una tarea del pastor según el Nuevo Testamento?", "Hacerse dueño del rebaño", ["Apacentar con la Palabra", "Supervisar la vida espiritual", "Proteger de los errores y de los abusos"], "El pastor apacienta, supervisa y protege, pero el rebaño no es suyo: es «la iglesia del Señor, la cual él ganó por su propia sangre».", "Hechos 20:28"],
    ["f09", 1, "o1", "evaluar", "En la Academia Avivando el Fuego, ¿cómo se trata la pregunta de quién puede ejercer el pastorado?", "Que es parte del ministerio de la mujer, un punto de la declaración de fe por confirmar", ["Que solo pueden los mayores de cincuenta años", "Que puede cualquiera, sin requisitos", "Que la Biblia no dice nada del pastor"], "Quién puede ejercer el pastorado es parte del ministerio de la mujer, un punto de la declaración de fe por confirmar (artículo 13); las dos posiciones evangélicas se presentan con respeto en Teología sistemática IV.", "Hechos 20:28"],
    ["f10", 1, "o7", "recordar", "Completa Hechos 20:28: Por tanto, mirad por vosotros, y por todo el rebaño en que el Espíritu Santo os ha puesto por obispos…", "para apacentar la iglesia del Señor, la cual él ganó por su propia sangre", ["para gobernar la ciudad con poder", "para recibir honra de los hombres", "para cobrar los diezmos"], "«Por tanto, mirad por vosotros, y por todo el rebaño en que el Espíritu Santo os ha puesto por obispos, para apacentar la iglesia del Señor, la cual él ganó por su propia sangre».", "Hechos 20:28"],
    // Lección 2 · Supervisar sin señorear
    ["f11", 2, "o2", "recordar", "¿Para qué vino el Hijo del Hombre, según Mateo 20:28?", "Para servir y dar su vida en rescate por muchos", ["Para ser servido", "Para gobernar Roma", "Para juzgar a los pobres"], "«como el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».", "Mateo 20:25-28"],
    ["f12", 2, "o2", "comprender", "¿Cómo deben apacentar los ancianos, según 1 Pedro 5:2?", "De buena voluntad y con ánimo pronto, no por fuerza ni por ganancia deshonesta", ["Por obligación y por dinero", "Solo cuando tienen tiempo", "Con dureza"], "«no por fuerza, sino voluntariamente; no por ganancia deshonesta, sino con ánimo pronto».", "1 Pedro 5:2-3"],
    ["f13", 2, "o2", "recordar", "¿Qué le gustaba a Diótrefes, según 3 Juan 9?", "Tener el primer lugar", ["Servir a los pobres", "Recibir a los hermanos", "Orar por todos"], "«pero Diótrefes, al cual le gusta tener el primer lugar entre ellos, no nos recibe».", "3 Juan 1:9-10"],
    ["f14", 2, "o2", "analizar", "¿Qué hacía Diótrefes con los que querían recibir a los hermanos, según 3 Juan 10?", "Se lo prohibía y los expulsaba de la iglesia", ["Los felicitaba", "Los ayudaba", "Los nombraba ancianos"], "«y a los que quieren recibirlos se lo prohibe, y los expulsa de la iglesia».", "3 Juan 1:9-10"],
    ["f15", 2, "o2", "aplicar", "Un pastor no permite que nadie disienta con respeto y aísla al que se va. ¿Qué muestran esas conductas?", "Que son señales de un liderazgo que domina, como el de Diótrefes", ["Que es una forma sana de liderazgo", "Que así se protege la unidad", "Que los que se van no importan"], "Son señales de un liderazgo que domina, como el de Diótrefes, que no recibía a los hermanos, a los que quieren recibirlos se lo prohibía, «y los expulsa de la iglesia».", "3 Juan 1:9-10"],
    ["f16", 2, "o2", "aplicar", "Una hermana duda de obedecer a sus pastores porque teme que abusen. ¿Qué equilibrio le enseñas?", "Que la autoridad pastoral es real y se respeta, pero se ejerce con el ejemplo, bajo la Palabra y rindiendo cuentas", ["Que nunca debe obedecer a nadie", "Que debe obedecer sin pensar", "Que la autoridad pastoral no existe"], "La Biblia pide obedecer a los que guían la iglesia (Hebreos 13:17), y a ellos les pide no señorear (1 Pedro 5:3).", "1 Pedro 5:2-3"],
    ["f17", 2, "o2", "evaluar", "¿Cuál de estas es una señal de alerta de un liderazgo que domina?", "Que no rinde cuentas a nadie", ["Que ora con su equipo", "Que acepta preguntas", "Que explica sus decisiones con la Palabra"], "No rendir cuentas a nadie es una señal de alerta, como lo son exigir obediencia sin razones y aislar a quien piensa distinto; Diótrefes, «al cual le gusta tener el primer lugar», es el ejemplo bíblico.", "3 Juan 1:9-10"],
    ["f18", 2, "o2", "comprender", "¿Qué modelo de autoridad dio Jesús con su propia vida?", "El de quien no vino para ser servido, sino para servir", ["El de los gobernantes de las naciones", "El de quien ejerce potestad sobre otros", "El de quien busca el primer lugar"], "«no vino para ser servido, sino para servir».", "Mateo 20:25-28"],
    ["f19", 2, "o2", "aplicar", "En tu iglesia, el destino de las ofrendas lo decide solo el pastor, sin informar a nadie. ¿Qué señal de alerta ves?", "Que el líder no rinde cuentas y el dinero pesa más que el bien de las ovejas", ["Ninguna", "Que el pastor trabaja mucho", "Que la iglesia confía en él"], "«no por ganancia deshonesta, sino con ánimo pronto».", "1 Pedro 5:2-3"],
    ["f20", 2, "o2", "evaluar", "¿Cómo es la autoridad del pastor según 1 Pedro 5:2-3?", "Real, pero delegada por Cristo: se ejerce con el ejemplo, bajo la Palabra y rindiendo cuentas", ["Absoluta y sin límites", "Inexistente", "Igual a la de los gobernantes del mundo"], "Es real, pero delegada por Cristo. Pedro manda apacentar «no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey».", "1 Pedro 5:2-3"],
    // Lección 3 · Formar el equipo pastoral
    ["f21", 3, "o3", "recordar", "¿Para qué dejó Pablo a Tito en Creta, según Tito 1:5?", "Para corregir lo deficiente y establecer ancianos en cada ciudad", ["Para descansar", "Para escribir libros", "Para construir templos"], "«para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad».", "Tito 1:5"],
    ["f22", 3, "o3", "comprender", "¿Por qué valoraba tanto Pablo a Timoteo, según Filipenses 2:20-21?", "Porque se interesaba sinceramente por los hermanos, mientras otros buscaban lo suyo", ["Porque era rico", "Porque era famoso", "Porque era mayor que Pablo"], "«pues a ninguno tengo del mismo ánimo, y que tan sinceramente se interese por vosotros».", "Filipenses 2:19-22"],
    ["f23", 3, "o3", "recordar", "¿Cómo llama Pablo a Tíquico en Colosenses 4:7?", "Amado hermano, fiel ministro y consiervo en el Señor", ["Mi siervo", "Mi juez", "Mi rival"], "«amado hermano y fiel ministro y consiervo en el Señor».", "Colosenses 4:7-9"],
    ["f24", 3, "o3", "analizar", "¿Qué muestran los nombres al final de las cartas de Pablo?", "Que su ministerio fue un trabajo en equipo", ["Que escribía solo para sus amigos", "Que no tenía colaboradores", "Que le gustaba hacer listas"], "«Todo lo que a mí se refiere, os lo hará saber Tíquico».", "Colosenses 4:7-9"],
    ["f25", 3, "o3", "aplicar", "Tu iglesia elige a sus nuevos líderes mirando solo sus talentos. ¿Qué principio para formar líderes falta?", "Buscar a los fieles, no solo a los talentosos", ["Elegir a los más ricos", "Elegir a los que hablan mejor", "No elegir a nadie"], "Hay que buscar a los fieles, no solo a los talentosos, como Pablo con Timoteo: «pues a ninguno tengo del mismo ánimo, y que tan sinceramente se interese por vosotros».", "Filipenses 2:19-22"],
    ["f26", 3, "o3", "aplicar", "Un pastor dirige todo él solo y está agotado. ¿Qué le diría Jetro?", "No está bien lo que haces: no podrás hacerlo tú solo", ["Sigue así, es tu deber", "Deja la iglesia", "Trabaja también de noche"], "«Entonces el suegro de Moisés le dijo: No está bien lo que haces».", "Éxodo 18:17-18"],
    ["f27", 3, "o3", "comprender", "¿Qué conviene enseñarle primero a un nuevo líder del equipo pastoral?", "El carácter que pide la Palabra, antes que las habilidades", ["Las técnicas para hablar en público", "El manejo del dinero", "La música"], "Primero el carácter que pide la Palabra y después las habilidades, porque los requisitos del líder en Tito 1 y 1 Timoteo 3 son sobre todo de carácter.", "Tito 1:5"],
    ["f28", 3, "o3", "evaluar", "¿Qué le pasa a una iglesia cuyo pastor lo hace todo solo, según el consejo de Jetro a Moisés?", "El pastor se agota y la iglesia se debilita", ["La iglesia crece más", "Todos descansan", "No pasa nada"], "El pastor se agota y el pueblo se debilita: «Desfallecerás del todo, tú, y también este pueblo que está contigo; porque el trabajo es demasiado pesado para ti».", "Éxodo 18:17-18"],
    ["f29", 3, "o3", "evaluar", "¿Cuál es el último paso para formar un equipo pastoral?", "Reconocer ante la iglesia a los que están listos y soltarlos para servir", ["Retenerlos siempre bajo control", "Hacerles un examen escrito", "Pagarles un sueldo"], "Después de orar y observar, invitar a servir, enseñar el carácter y evaluar juntos, se reconoce ante la iglesia a los que están listos y se los suelta para servir, como Tito estableció ancianos en cada ciudad.", "Tito 1:5"],
    ["f30", 3, "o3", "recordar", "¿Con quién envió Pablo a Tíquico a Colosas, según Colosenses 4:9?", "Con Onésimo", ["Con Pedro", "Con Bernabé", "Con Lucas"], "«con Onésimo, amado y fiel hermano, que es uno de vosotros».", "Colosenses 4:7-9"],
    // Lección 4 · La disciplina que restaura
    ["f31", 4, "o4", "recordar", "¿Qué se hace si el hermano no escucha en privado, según Mateo 18:16?", "Tomar contigo a uno o dos testigos", ["Dejarlo para siempre", "Hablar mal de él", "Expulsarlo enseguida"], "«Mas si no te oyere, toma aún contigo a uno o dos».", "Mateo 18:15-17"],
    ["f32", 4, "o4", "comprender", "¿Con qué espíritu se restaura al que cae, según Gálatas 6:1?", "Con espíritu de mansedumbre, considerándose a sí mismo", ["Con dureza", "Con orgullo", "Con prisa"], "«restauradle con espíritu de mansedumbre, considerándote a ti mismo».", "Gálatas 6:1"],
    ["f33", 4, "o4", "analizar", "¿Por qué Gálatas 6:1 pide al que restaura considerarse a sí mismo?", "Porque él también puede ser tentado", ["Porque nunca peca", "Porque debe juzgar mejor", "Porque es superior"], "«no sea que tú también seas tentado».", "Gálatas 6:1"],
    ["f34", 4, "o4", "recordar", "¿Por qué pide Pablo perdonar y consolar al disciplinado, según 2 Corintios 2:7?", "Para que no sea consumido de demasiada tristeza", ["Para que vuelva a pecar", "Para que pague una multa", "Para que se vaya"], "«para que no sea consumido de demasiada tristeza».", "2 Corintios 2:6-8"],
    ["f35", 4, "o4", "aplicar", "Un líder corrige a un joven delante de toda la iglesia por una falta que nadie conocía. ¿Qué principio olvidó?", "Empezar por lo más privado, como enseña Mateo 18:15", ["Ninguno", "Que la corrección pública siempre va primero", "Que no hay que corregir"], "«ve y repréndele estando tú y él solos».", "Mateo 18:15-17"],
    ["f36", 4, "o4", "aplicar", "En tu iglesia, dos hermanos discuten por el color de las sillas y uno pide disciplinar al otro. ¿Qué principio aplicas?", "Distinguir el pecado de las diferencias de opinión", ["Disciplinar a los dos", "Expulsar al que perdió", "Votar en la iglesia"], "La disciplina es para el pecado, no para las preferencias.", "Mateo 18:15-17"],
    ["f37", 4, "o4", "evaluar", "Un diácono abusó de un menor y dice que se arrepiente. ¿Qué hace el pastor?", "Protege primero a la víctima y lo denuncia a las autoridades, además de la disciplina de la iglesia", ["Lo perdona y no dice nada", "Lo cambia de ministerio en secreto", "Espera a ver si vuelve a pasar"], "La disciplina de la iglesia no reemplaza a la justicia.", "Mateo 18:15-17"],
    ["f38", 4, "o4", "comprender", "¿Qué se hace al final si el hermano no escucha a los testigos, según Mateo 18:17?", "Decirlo a la iglesia", ["Olvidarlo", "Escribir una carta anónima", "Castigarlo físicamente"], "«Si no los oyere a ellos, dilo a la iglesia».", "Mateo 18:15-17"],
    ["f39", 4, "o4", "evaluar", "¿Qué distingue la disciplina bíblica de una iglesia del control sobre las personas?", "Que busca restaurar, no castigar ni humillar", ["Que es más dura", "Que es secreta", "Que la decide una sola persona"], "La disciplina bíblica busca restaurar, no castigar ni humillar; su meta es ganar al hermano: «si te oyere, has ganado a tu hermano».", "Mateo 18:15-17"],
    ["f40", 4, "o4", "analizar", "¿Por qué el pastor actúa junto con otros líderes al disciplinar?", "Para no decidir solo y para cuidar la justicia y la discreción", ["Para tener más poder", "Para humillar más", "Para que nadie sepa nada"], "«para que en boca de dos o tres testigos conste toda palabra».", "Mateo 18:15-17"],
    // Lección 5 · Proteger al rebaño
    ["f41", 5, "o5", "recordar", "¿Qué pidió Pablo a los ancianos ante los peligros, según Hechos 20:31?", "Que velaran", ["Que huyeran", "Que callaran", "Que se rindieran"], "«Por tanto, velad».", "Hechos 20:29-31"],
    ["f42", 5, "o5", "comprender", "¿Qué introducen los falsos maestros, según 2 Pedro 2:1?", "Herejías destructoras, de manera encubierta", ["Sana doctrina", "Más oración", "Ayuda a los pobres"], "«que introducirán encubiertamente herejías destructoras».", "2 Pedro 2:1-3"],
    ["f43", 5, "o5", "recordar", "¿Qué reprochó Dios a los pastores de Israel, según Ezequiel 34:4?", "Que no cuidaron a las débiles y se enseñorearon de ellas con dureza y con violencia", ["Que trabajaron demasiado", "Que dieron mucho de comer", "Que buscaron a las perdidas"], "«sino que os habéis enseñoreado de ellas con dureza y con violencia».", "Ezequiel 34:4"],
    ["f44", 5, "o5", "analizar", "¿Qué muestra Ezequiel 34:4 sobre el abuso de poder en el rebaño?", "Que es uno de los pecados que Dios más condena", ["Que no importa", "Que es necesario para guiar", "Que es un error menor"], "«No fortalecisteis las débiles, ni curasteis la enferma».", "Ezequiel 34:4"],
    ["f45", 5, "o5", "aplicar", "Un predicador visitante promete milagros a cambio de grandes ofrendas. ¿Qué advertencia de 2 Pedro 2 recuerdas?", "Que los falsos maestros, por avaricia, hacen mercadería del pueblo con palabras fingidas", ["Que es una muestra de fe", "Que hay que dar más", "Que el dinero compra milagros"], "«y por avaricia harán mercadería de vosotros con palabras fingidas».", "2 Pedro 2:1-3"],
    ["f46", 5, "o5", "aplicar", "Un niño de tu iglesia cuenta que un adulto lo tocó de manera indebida. ¿Qué haces en Texas?", "Lo protejo y denuncio la sospecha a las autoridades, como manda la ley", ["Hablo solo con el adulto", "Espero a tener pruebas", "No digo nada para cuidar a la iglesia"], "«mejor le fuera que se le colgase al cuello una piedra de molino de asno».", "Mateo 18:6"],
    ["f47", 5, "o5", "comprender", "¿Qué dijo Jesús de quien hace tropezar a los pequeños, según Mateo 18:6?", "Que mejor le fuera que le colgaran al cuello una piedra de molino y lo hundieran en el mar", ["Que no tiene importancia", "Que lo perdonen sin más", "Que le den un cargo"], "«mejor le fuera que se le colgase al cuello una piedra de molino de asno, y que se le hundiese en lo profundo del mar».", "Mateo 18:6"],
    ["f48", 5, "o5", "evaluar", "¿Por qué las reglas para proteger a los niños en la iglesia no son desconfianza?", "Porque protegen a los niños, a los débiles y también a los que sirven", ["Porque nadie las cumple", "Porque son solo papeles", "Porque desconfiar es bíblico"], "Protegen a los niños y a los débiles, y también a los que sirven. Jesús fue muy severo con quien hace «tropezar a alguno de estos pequeños»: proteger al rebaño es amar lo suficiente para poner cercos.", "Mateo 18:6"],
    ["f49", 5, "o5", "aplicar", "Tu iglesia deja que el tesorero cuente y deposite solo las ofrendas. ¿Qué medida de protección falta?", "Manejar el dinero entre dos personas y con cuentas claras", ["Ninguna", "Que lo haga el pastor solo", "Que no se cuenten las ofrendas"], "El dinero transparente protege a la iglesia y al que sirve.", "2 Pedro 2:1-3"],
    ["f50", 5, "o5", "evaluar", "¿Qué medida permite que cualquier persona de la iglesia denuncie un abuso?", "Tener un camino seguro para denunciar sin miedo", ["Prohibir hablar del tema", "Que solo el pastor reciba las quejas en secreto", "Esperar a que el abuso pase solo"], "Un camino seguro para denunciar sin miedo, que no dependa de una sola persona. Dios condena a los pastores que no cuidan a las débiles y se enseñorean «con dureza y con violencia».", "Ezequiel 34:4"],
    // Lección 6 · La salud del pastor
    ["f51", 6, "o6", "recordar", "¿Qué deseó Elías bajo el enebro, según 1 Reyes 19:4?", "Morirse", ["Volver a Israel", "Ser rey", "Hacer más milagros"], "«y deseando morirse, dijo: Basta ya, oh Jehová, quítame la vida».", "1 Reyes 19:4-5"],
    ["f52", 6, "o6", "comprender", "¿Qué hizo Dios primero con Elías cuando estaba agotado bajo el enebro?", "Cuidó su cuerpo: lo dejó dormir y le dio de comer", ["Lo reprendió", "Lo castigó", "Lo reemplazó enseguida"], "Cuidó su cuerpo antes de hablarle: Elías se quedó dormido, y luego un ángel le tocó y le dijo: «Levántate, come».", "1 Reyes 19:4-5"],
    ["f53", 6, "o6", "comprender", "¿Cómo describe Pablo su situación en 2 Corintios 4:8?", "Atribulado en todo, mas no angustiado; en apuros, mas no desesperado", ["Sin problemas", "Desesperado y vencido", "Rico y tranquilo"], "«que estamos atribulados en todo, mas no angustiados; en apuros, mas no desesperados».", "2 Corintios 4:7-10"],
    ["f54", 6, "o6", "aplicar", "Un pastor ya solo ora y lee la Biblia para preparar sermones. ¿Qué señal muestra?", "Una señal de agotamiento: su vida con Dios se volvió solo trabajo", ["Ninguna", "Que es muy dedicado", "Que es más espiritual"], "Cuando la oración y la lectura solo sirven para preparar sermones, la vida con Dios se volvió trabajo: es una señal de agotamiento, como el cansancio que no se va, la irritación y el aislamiento.", "2 Corintios 4:7-10"],
    ["f55", 6, "o6", "aplicar", "Un pastor no se ha tomado ningún día libre en un año. ¿Qué le aconsejas?", "Que tenga un día de descanso y deje que otros lleven parte de la carga", ["Que siga igual", "Que trabaje más", "Que deje la iglesia"], "«Sobrellevad los unos las cargas de los otros».", "Gálatas 6:2"],
    ["f56", 6, "o6", "analizar", "¿Qué enseña que la Biblia no esconda la debilidad de Elías ni la de Pablo?", "Que los siervos de Dios también se agotan, y que Dios los cuida", ["Que eran malos siervos", "Que la debilidad es pecado", "Que no confiaban en Dios"], "«Pero tenemos este tesoro en vasos de barro».", "2 Corintios 4:7-10"],
    ["f57", 6, "o6", "evaluar", "¿Qué tiene en su vida un pastor sano?", "Un día de descanso, amigos sinceros, alguien a quien rendir cuentas y ayuda profesional cuando hace falta", ["Trabajo sin descanso", "Ningún amigo en la iglesia", "Ninguna rendición de cuentas"], "Un día de descanso, amigos sinceros, alguien a quien rendir cuentas y ayuda profesional cuando hace falta; el pastor también necesita que otros le ayuden: «Sobrellevad los unos las cargas de los otros».", "Gálatas 6:2"],
    ["f58", 6, "o6", "aplicar", "Un líder te confiesa que ha pensado en hacerse daño. ¿Qué haces?", "Lo acompaño a buscar ayuda de inmediato; en Estados Unidos se puede llamar o escribir al 988", ["Le digo que ore y se le pasará", "Le pido que no lo cuente", "Lo dejo solo para que descanse"], "Pedir ayuda no es falta de fe; en una crisis, la ayuda es inmediata.", "Gálatas 6:2"],
    ["f59", 6, "o6", "evaluar", "¿Cuál de estas es una señal de agotamiento en un pastor?", "Pensar que nadie más puede hacer lo que uno hace", ["Descansar un día a la semana", "Pedir ayuda", "Delegar tareas"], "Pensar que nadie más puede hacerlo es una señal, como lo fue en Elías; otras son el cansancio que no se va, la irritación y el aislamiento.", "1 Reyes 19:4-5"],
    ["f60", 6, "o6", "comprender", "¿Para qué está el poder de Dios en vasos de barro, según 2 Corintios 4:7?", "Para que la excelencia del poder sea de Dios, y no de nosotros", ["Para humillarnos sin razón", "Para que dudemos de él", "Para que dejemos de servir"], "«para que la excelencia del poder sea de Dios, y no de nosotros».", "2 Corintios 4:7-10"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Quién puso a los obispos sobre el rebaño, según Hechos 20:28?", "El Espíritu Santo", ["La asamblea", "El gobierno", "Ellos mismos"], "«en que el Espíritu Santo os ha puesto por obispos».", "Hechos 20:28"],
      ["m1-02", 1, "o1", "comprender", "¿Qué significa apacentar?", "Alimentar y cuidar al rebaño, como un pastor", ["Castigar al rebaño", "Vender el rebaño", "Contar el rebaño"], "«para apacentar la iglesia del Señor».", "Hechos 20:28"],
      ["m1-03", 1, "o1", "aplicar", "Un anciano de tu iglesia piensa que su único trabajo es dirigir las reuniones. ¿Qué tareas le muestras?", "Apacentar, supervisar, proteger, equipar e interceder", ["Solo anunciar las actividades", "Solo recoger la ofrenda", "Solo abrir el templo"], "El pastor apacienta con la Palabra, supervisa la vida espiritual, protege del error, equipa a los santos para servir e intercede por el rebaño; dirigir las reuniones es solo una parte.", "Hechos 20:28"],
      ["m1-04", 1, "o1", "analizar", "¿Por qué el pastor no es dueño de la iglesia?", "Porque la iglesia es del Señor y el pastor es su administrador", ["Porque la iglesia no tiene dueño", "Porque es de los miembros más antiguos", "Porque el pastor siempre es nuevo"], "«como administrador de Dios».", "Tito 1:7-9"],
      ["m1-05", 1, "o1", "recordar", "¿Qué virtudes pide Tito 1:8 al obispo?", "Hospedador, amante de lo bueno, sobrio, justo, santo y dueño de sí mismo", ["Rico, famoso y elocuente", "Joven, alto y fuerte", "Callado, solitario y estricto"], "«sino hospedador, amante de lo bueno, sobrio, justo, santo, dueño de sí mismo».", "Tito 1:7-9"],
      ["m1-06", 1, "o1", "evaluar", "Un líder quiere ser pastor para tener reconocimiento. ¿Qué le muestras?", "Que el pastorado es una tarea al servicio de Cristo, no un título", ["Que el título es lo importante", "Que el reconocimiento es la meta", "Que no hace falta servir"], "El pastorado es una tarea al servicio de Cristo, no un título: el Espíritu Santo pone a los obispos «para apacentar la iglesia del Señor».", "Hechos 20:28"],
      ["m1-07", 2, "o2", "recordar", "¿Qué será el que quiera ser el primero, según Mateo 20:27?", "Siervo de los demás", ["El rey", "El más rico", "El juez"], "«y el que quiera ser el primero entre vosotros será vuestro siervo».", "Mateo 20:25-28"],
      ["m1-08", 2, "o2", "comprender", "¿Qué significa ser ejemplo de la grey, según 1 Pedro 5:3?", "Guiar con la propia vida en lugar de imponerse", ["Exigir obediencia", "Mostrar riqueza", "Vivir aparte del rebaño"], "«sino siendo ejemplos de la grey».", "1 Pedro 5:2-3"],
      ["m1-09", 2, "o2", "aplicar", "Un joven líder quiere que lo respeten. ¿Qué camino le enseña Jesús en Mateo 20?", "Servir a los demás", ["Imponerse con firmeza", "Buscar títulos", "Hacerse amigo de los poderosos"], "«el que quiera hacerse grande entre vosotros será vuestro servidor».", "Mateo 20:25-28"],
      ["m1-10", 2, "o2", "analizar", "¿Por qué menciona Pedro la ganancia deshonesta al hablar a los ancianos?", "Porque el dinero puede corromper el motivo del ministerio", ["Porque los ancianos no deben trabajar", "Porque la ofrenda es pecado", "Porque el dinero no importa"], "«no por ganancia deshonesta, sino con ánimo pronto».", "1 Pedro 5:2-3"],
      ["m1-11", 2, "o2", "recordar", "¿A quiénes no recibía Diótrefes, según 3 Juan 10?", "A los hermanos", ["A los ricos", "A los gobernantes", "A los fariseos"], "«y no contento con estas cosas, no recibe a los hermanos».", "3 Juan 1:9-10"],
      ["m1-12", 2, "o2", "evaluar", "Un líder explica sus decisiones con la Palabra, escucha las preguntas y rinde cuentas a su equipo. ¿Qué muestra?", "Una autoridad que sirve, como la que enseñó Jesús", ["Debilidad", "Falta de liderazgo", "Señorío sobre la grey"], "«Mas entre vosotros no será así».", "Mateo 20:25-28"],
      ["m1-13", 3, "o3", "recordar", "¿Qué buscaban todos, menos Timoteo, según Filipenses 2:21?", "Lo suyo propio, no lo que es de Cristo Jesús", ["Lo de Cristo", "El bien de la iglesia", "La verdad"], "«Porque todos buscan lo suyo propio, no lo que es de Cristo Jesús».", "Filipenses 2:19-22"],
      ["m1-14", 3, "o3", "comprender", "¿Qué significa formar líderes caminando juntos?", "Invitar a servir al lado, dar responsabilidades y acompañar", ["Dar un solo curso", "Dejar que aprendan solos", "Esperar a que se ofrezcan"], "«que como hijo a padre ha servido conmigo en el evangelio».", "Filipenses 2:19-22"],
      ["m1-15", 3, "o3", "aplicar", "Una líder de jóvenes ya está lista para servir sin supervisión diaria. ¿Qué hace el pastor?", "La reconoce ante la iglesia y la suelta para servir", ["La retiene para que no se vaya", "Le prohíbe crecer", "Espera diez años más"], "Es el último paso para formar el equipo.", "Colosenses 4:7-9"],
      ["m1-16", 3, "o3", "analizar", "¿Por qué el liderazgo en plural protege a la iglesia?", "Porque reparte la carga y evita que todo dependa de una persona", ["Porque nadie decide nada", "Porque elimina toda autoridad", "Porque hace más lentas las cosas"], "«no podrás hacerlo tú solo».", "Éxodo 18:17-18"],
      ["m1-17", 3, "o3", "recordar", "¿Para qué envió Pablo a Tíquico, según Colosenses 4:8?", "Para conocer la situación de ellos y confortar sus corazones", ["Para cobrar una ofrenda", "Para juzgarlos", "Para traer a Pablo"], "«para que conozca lo que a vosotros se refiere, y conforte vuestros corazones».", "Colosenses 4:7-9"],
      ["m1-18", 3, "o3", "evaluar", "Un pastor dice que si forma a otros perderá su lugar. ¿Qué le respondes?", "Que un pastor que forma un equipo multiplica el cuidado del rebaño", ["Que tiene razón", "Que no debe formar a nadie", "Que el lugar es lo importante"], "Un pastor que forma un equipo multiplica el cuidado del rebaño. Jetro se lo dijo a Moisés: «porque el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».", "Éxodo 18:17-18"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué consta en boca de dos o tres testigos, según Mateo 18:16?", "Toda palabra", ["Una sentencia de muerte", "Un contrato", "Nada"], "«para que en boca de dos o tres testigos conste toda palabra».", "Mateo 18:15-17"],
      ["m2-02", 4, "o4", "comprender", "¿Quiénes deben restaurar al que cae, según Gálatas 6:1?", "Los que son espirituales", ["Los que nunca han caído", "Los más ricos", "Los recién llegados"], "«vosotros que sois espirituales, restauradle».", "Gálatas 6:1"],
      ["m2-03", 4, "o4", "aplicar", "Una hermana fue sorprendida en una falta y está avergonzada. ¿Cómo la restaura el líder?", "Con mansedumbre, sabiendo que él también puede ser tentado", ["Con gritos", "Contándolo a todos", "Ignorándola"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
      ["m2-04", 4, "o4", "analizar", "¿Qué muestra 2 Corintios 2:6 sobre la disciplina?", "Que tiene un límite: cuando basta, se perdona", ["Que nunca termina", "Que es eterna", "Que no sirve"], "«Le basta a tal persona esta reprensión hecha por muchos».", "2 Corintios 2:6-8"],
      ["m2-05", 4, "o4", "recordar", "¿Qué pide Pablo confirmar hacia el disciplinado arrepentido, según 2 Corintios 2:8?", "El amor", ["La sospecha", "La distancia", "El castigo"], "«Por lo cual os ruego que confirméis el amor para con él».", "2 Corintios 2:6-8"],
      ["m2-06", 4, "o4", "evaluar", "¿Por qué la disciplina de la iglesia no reemplaza a la justicia ante un posible delito?", "Porque ante un posible delito hay que proteger a la víctima y denunciar a las autoridades", ["Porque la iglesia no tiene autoridad", "Porque la justicia es más importante que Dios", "Porque no hay que corregir"], "Ante un posible delito, como el abuso de un menor, hay que proteger a la víctima y denunciar a las autoridades; la disciplina de la iglesia corre aparte y no la sustituye.", "Mateo 18:15-17"],
      ["m2-07", 5, "o5", "recordar", "¿Qué harían los lobos rapaces, según Hechos 20:29?", "No perdonarían al rebaño", ["Cuidarían al rebaño", "Se irían lejos", "Ayudarían a los pastores"], "«que no perdonarán al rebaño».", "Hechos 20:29-31"],
      ["m2-08", 5, "o5", "comprender", "¿Qué harían los que se levantaran de adentro, según Hechos 20:30?", "Hablarían cosas perversas para arrastrar tras sí a los discípulos", ["Predicarían la verdad", "Servirían en silencio", "Ofrendarían más"], "«para arrastrar tras sí a los discípulos».", "Hechos 20:29-31"],
      ["m2-09", 5, "o5", "aplicar", "Un miembro antiguo empieza a enseñar en las casas que ya no hace falta congregarse ni escuchar a los pastores. ¿Qué te recuerda Hechos 20:30?", "Que también de adentro se levantan los que arrastran a los discípulos tras sí", ["Que es una opinión inocente", "Que no hay que hacer nada", "Que todos deben seguirlo"], "«Y de vosotros mismos se levantarán hombres que hablen cosas perversas».", "Hechos 20:29-31"],
      ["m2-10", 5, "o5", "analizar", "¿Por qué el error en la doctrina y el abuso económico suelen ir juntos?", "Porque el falso maestro usa la doctrina para aprovecharse del rebaño", ["Porque la doctrina no importa", "Porque todos los maestros cobran", "Porque el dinero corrige la doctrina"], "«y por avaricia harán mercadería de vosotros».", "2 Pedro 2:1-3"],
      ["m2-11", 5, "o5", "recordar", "¿Durante cuánto tiempo amonestó Pablo a los efesios, según Hechos 20:31?", "Tres años, de noche y de día", ["Un mes", "Diez años", "Un solo día"], "«acordándoos que por tres años, de noche y de día, no he cesado de amonestar con lágrimas a cada uno».", "Hechos 20:29-31"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué forma parte de la protección del rebaño en una iglesia?", "Enseñar la sana doctrina, cuidar a los niños, transparentar el dinero y cumplir la ley", ["Solo orar", "Solo cerrar las puertas", "Solo confiar en todos"], "Enseñar la sana doctrina, cuidar a los niños, llevar el dinero con transparencia y cumplir la ley, como pidió Pablo a los ancianos: «Por tanto, velad».", "Hechos 20:29-31"],
      ["m2-13", 6, "o6", "recordar", "¿Dónde se sentó Elías, según 1 Reyes 19:4?", "Debajo de un enebro", ["En el templo", "En el palacio", "A la orilla del mar"], "«y vino y se sentó debajo de un enebro».", "1 Reyes 19:4-5"],
      ["m2-14", 6, "o6", "comprender", "¿Qué se manifiesta en el cuerpo de Pablo, según 2 Corintios 4:10?", "La muerte de Jesús, para que también su vida se manifieste", ["Su propia fuerza", "Su riqueza", "Su fama"], "«para que también la vida de Jesús se manifieste en nuestros cuerpos».", "2 Corintios 4:7-10"],
      ["m2-15", 6, "o6", "aplicar", "Una hermana, esposa de un pastor, te cuenta que él está irritable y aislado. ¿Qué haces?", "Animo al pastor a descansar y a buscar apoyo, porque son señales de agotamiento", ["Le digo que no se meta", "Lo critico ante la iglesia", "No hago nada"], "«Sobrellevad los unos las cargas de los otros».", "Gálatas 6:2"],
      ["m2-16", 6, "o6", "analizar", "¿Por qué el pastor necesita rendir cuentas a alguien?", "Porque nadie se cuida bien solo, y otros pueden ver lo que él no ve", ["Porque no es de confianza", "Porque la iglesia es su jefe", "Porque es una costumbre"], "«y cumplid así la ley de Cristo».", "Gálatas 6:2"],
      ["m2-17", 6, "o6", "recordar", "¿Cómo estaba Pablo, según 2 Corintios 4:9?", "Perseguido, mas no desamparado; derribado, pero no destruido", ["Libre de toda prueba", "Vencido y solo", "Rico y famoso"], "«perseguidos, mas no desamparados; derribados, pero no destruidos».", "2 Corintios 4:7-10"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué resume la frase cuidarte también es parte de cuidar al rebaño?", "Que la salud del pastor es parte de su ministerio", ["Que el pastor es más importante que el rebaño", "Que hay que dejar de servir", "Que el rebaño no importa"], "«Por tanto, mirad por vosotros, y por todo el rebaño».", "Hechos 20:28"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "pastoral-1-e1",
      tipo: "corta",
      pregunta: "Explica los tres nombres del oficio pastoral en Hechos 20 y de quién es la iglesia.",
      ideas: [
        { id: "nombres", peso: 30, texto: "Anciano, obispo y pastor.", formas: ["anciano", "obispo", "presbitero", "supervisor"] },
        { id: "tarea", peso: 30, texto: "Son una misma tarea: madurez, supervisión y apacentar.", formas: ["apacentar", "misma tarea", "madurez", "supervisar", "cuidar"] },
        { id: "del_senor", peso: 30, texto: "La iglesia es del Señor, que la ganó con su sangre; el pastor es administrador.", formas: ["del senor", "su propia sangre", "su sangre", "administrador"] },
      ],
      citas: ["Hechos 20:28", "Hechos 20:17", "Tito 1:7-9", "Tito 1:7", "1 Pedro 5:2-3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En Hechos 20 aparecen tres nombres de una misma tarea: anciano, que habla de madurez; obispo, que habla de supervisar; y pastor, que habla de apacentar. La iglesia no le pertenece al pastor: es la iglesia del Señor, que la ganó por su propia sangre (Hechos 20:28), y el pastor es su administrador.",
    },
    {
      id: "pastoral-1-e2",
      tipo: "corta",
      pregunta: "Explica la diferencia entre la autoridad que enseñó Jesús y la de los gobernantes del mundo.",
      ideas: [
        { id: "mundo", peso: 30, texto: "Los gobernantes se enseñorean y ejercen potestad.", formas: ["se ensenorean", "ensenorean", "ejercen potestad", "dominan", "imponen"] },
        { id: "servicio", peso: 30, texto: "En el reino, el grande es el que sirve.", formas: ["servidor", "siervo", "servir", "el que sirve"] },
        { id: "ejemplo", peso: 30, texto: "Jesús vino a servir; el pastor guía con el ejemplo, sin señorear.", formas: ["no vino para ser servido", "dar su vida", "ejemplo", "ejemplos de la grey", "sin senorear"] },
      ],
      citas: ["Mateo 20:25-28", "Mateo 20:26", "Mateo 20:28", "1 Pedro 5:2-3", "1 Pedro 5:3"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Los gobernantes de las naciones se enseñorean de ellas y ejercen potestad. Jesús dijo que entre nosotros no será así: el que quiera ser grande será servidor (Mateo 20:26), como él, que no vino para ser servido, sino para servir. Por eso el pastor guía siendo ejemplo, sin señorear sobre los que cuida.",
    },
    {
      id: "pastoral-1-e3",
      tipo: "corta",
      pregunta: "Explica los pasos de Mateo 18:15-17 y su propósito.",
      ideas: [
        { id: "pasos", peso: 30, texto: "En privado, con uno o dos testigos y, al final, ante la iglesia.", formas: ["solos", "en privado", "uno o dos", "testigos", "dilo a la iglesia", "ante la iglesia"] },
        { id: "meta", peso: 30, texto: "La meta es ganar al hermano y restaurarlo.", formas: ["ganar al hermano", "has ganado", "restaurar", "restaurarlo", "restauracion"] },
        { id: "espiritu", peso: 30, texto: "Con mansedumbre, y con perdón para el que se arrepiente.", formas: ["mansedumbre", "perdon", "perdonar", "perdona", "consolar", "amor"] },
      ],
      citas: ["Mateo 18:15-17", "Mateo 18:15", "Gálatas 6:1", "2 Corintios 2:6-8", "2 Corintios 2:7"],
      pesoCita: 10,
      errores: [{ id: "castigo", anula: "meta", texto: "La meta de la disciplina no es castigar ni humillar, sino ganar al hermano (Mateo 18:15).", formas: ["para castigar", "para humillar", "castigarlo"] }],
      modelo:
        "Jesús enseñó a corregir paso a paso: primero estando tú y él solos; si no escucha, con uno o dos testigos; y solo al final, ante la iglesia. La meta es ganar al hermano y restaurarlo (Mateo 18:15), con espíritu de mansedumbre, y cuando se arrepiente, se le perdona y se le confirma el amor.",
    },
    {
      id: "pastoral-1-e4",
      tipo: "breve",
      pregunta:
        "Un pastor de tu red está agotado. Explícale con la Escritura las señales del agotamiento y lo que puede hacer para cuidarse, con citas bíblicas.",
      ideas: [
        { id: "biblia", peso: 25, texto: "Elías y Pablo: Dios cuida a sus siervos en la debilidad.", formas: ["elias", "enebro", "vasos de barro", "levantate come", "pablo"] },
        { id: "senales", peso: 25, texto: "Señales: cansancio, irritación, aislamiento, orar solo para los sermones, descuido de la familia.", formas: ["cansancio", "irritacion", "irritable", "aislamiento", "aislado", "cinismo", "descuido", "solo para preparar"] },
        { id: "descanso", peso: 20, texto: "El descanso.", formas: ["descanso", "descansar", "dia libre", "dormir"] },
        { id: "apoyo", peso: 30, texto: "El apoyo: llevar las cargas juntos, rendir cuentas y pedir ayuda profesional.", formas: ["cargas", "rendir cuentas", "rinda cuentas", "consejero", "medico", "profesional", "pedir ayuda", "988"] },
      ],
      basta: 85,
      citas: ["1 Reyes 19:4-5", "1 Reyes 19:5", "2 Corintios 4:7-10", "2 Corintios 4:7", "Gálatas 6:2", "Marcos 6:31", "Éxodo 18:18"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano, la Biblia no esconde el cansancio de los siervos de Dios. Elías se sentó bajo un enebro deseando morirse, y Dios primero lo dejó dormir y le dijo: levántate, come (1 Reyes 19:5). Pablo sabía que llevamos el tesoro en vasos de barro, para que el poder sea de Dios. Las señales del agotamiento son un cansancio que dura, la irritación, el aislamiento, orar solo para preparar sermones y el descuido de la familia. Te animo a tomar un día de descanso cada semana, a dejar que otros te ayuden a llevar las cargas (Gálatas 6:2), a rendir cuentas a alguien de confianza y a buscar un consejero o un médico si hace falta. Pedir ayuda es parte de la fe.",
    },
    {
      id: "pastoral-1-e5",
      tipo: "breve",
      pregunta:
        "Tu iglesia quiere proteger mejor al rebaño. Explica con la Escritura los peligros que debe vigilar y las medidas que pondrías en marcha, con citas bíblicas.",
      ideas: [
        { id: "peligros", peso: 25, texto: "Los lobos de afuera y los de adentro: falsos maestros con avaricia.", formas: ["lobos", "falsos maestros", "de adentro", "avaricia", "herejias", "cosas perversas"] },
        { id: "abuso", peso: 20, texto: "El abuso de poder y el daño a los pequeños, que Dios condena.", formas: ["abuso", "con dureza", "pequenos", "piedra de molino", "ensenorean", "ensenoreado"] },
        { id: "ninos", peso: 20, texto: "Cuidar a los niños: revisar, capacitar y nunca un adulto solo con un menor.", formas: ["con ninos", "con los ninos", "un menor", "menores", "revisar", "capacitar"] },
        { id: "dinero", peso: 15, texto: "El dinero entre dos personas y con cuentas claras.", formas: ["dos personas", "cuentas claras", "el dinero", "transparen*"] },
        { id: "denuncia", peso: 20, texto: "Un camino para denunciar, y cumplir la ley.", formas: ["denunciar", "denuncia", "la ley", "autoridades"] },
      ],
      basta: 85,
      citas: ["Hechos 20:29-31", "Hechos 20:29", "2 Pedro 2:1-3", "2 Pedro 2:3", "Ezequiel 34:4", "Mateo 18:6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Pablo advirtió que entrarían lobos rapaces de afuera y que de adentro se levantarían hombres con cosas perversas, y nos mandó velar (Hechos 20:29-31). Pedro avisa que los falsos maestros, por avaricia, hacen mercadería del pueblo. Dios condena a los pastores que se enseñorean con dureza, y Jesús advierte a los que dañan a los pequeños (Mateo 18:6). Por eso pondría en marcha cinco medidas: enseñar la sana doctrina y advertir sobre los errores; revisar y capacitar a todos los que sirven con niños, sin dejar nunca a un adulto solo con un menor; manejar el dinero entre dos personas y con cuentas claras; abrir un camino para denunciar un abuso sin miedo; y cumplir la ley, denunciando a las autoridades toda sospecha de abuso de un menor.",
    },
  ],
  breve: {
    id: "pastoral-1-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo describirías a un pastor que cumple bien su ministerio, desde su tarea hasta su manera de liderar, corregir, proteger y cuidarse, con citas bíblicas.",
    ideas: [
      { id: "tarea", peso: 20, texto: "Apacienta con la Palabra la iglesia del Señor, como administrador.", formas: ["apacienta", "apacentar", "la palabra", "administrador", "del senor"] },
      { id: "servicio", peso: 20, texto: "Lidera sirviendo, con el ejemplo, sin señorear.", formas: ["servir", "servidor", "sirviendo", "ejemplo", "sin senorear"] },
      { id: "equipo", peso: 15, texto: "Forma un equipo.", formas: ["equipo", "ancianos", "formar lideres", "forma lideres", "timoteo"] },
      { id: "corregir", peso: 15, texto: "Corrige para restaurar.", formas: ["restaurar", "restaura", "mansedumbre", "mateo 18"] },
      { id: "proteger", peso: 15, texto: "Protege al rebaño.", formas: ["protege", "proteger", "lobos", "velar", "vela"] },
      { id: "cuidarse", peso: 15, texto: "Se cuida a sí mismo.", formas: ["descanso", "descansa", "rinde cuentas", "cargas", "vasos de barro", "vaso de barro"] },
    ],
    basta: 85,
    citas: ["Hechos 20:28", "Tito 1:7-9", "Mateo 20:26", "1 Pedro 5:2-3", "Tito 1:5", "Mateo 18:15-17", "Gálatas 6:1", "Hechos 20:29-31", "2 Corintios 4:7", "Gálatas 6:2"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Un buen pastor sabe que la iglesia es del Señor, que la ganó con su sangre, y la apacienta con la Palabra como administrador de Dios (Hechos 20:28). Lidera sirviendo, como Jesús, que no vino para ser servido, y es ejemplo de la grey sin señorear. No trabaja solo: forma un equipo de ancianos y colaboradores fieles, como Pablo con Timoteo. Cuando alguien cae, corrige paso a paso para restaurar, con mansedumbre, y perdona al que se arrepiente. Vela por el rebaño ante los lobos y los falsos maestros, cuida a los niños y maneja el dinero con transparencia. Y mira también por sí mismo: descansa, deja que otros lleven sus cargas y rinde cuentas, porque es un vaso de barro.",
  },
};
