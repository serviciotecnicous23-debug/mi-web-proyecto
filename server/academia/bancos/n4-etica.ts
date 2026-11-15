/**
 * El banco de «Ética cristiana y ministerial» (Nivel 4). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 el fundamento de la ética cristiana · o2 cómo tomar decisiones morales · o3 la vida y la dignidad humana ·
 * o4 la sexualidad, el matrimonio y la pureza · o5 el dinero, el trabajo y la verdad · o6 la ética del ministro y la
 * protección de menores · o7 el versículo de memoria (Romanos 12:2).
 * Quién puede ejercer cada cargo (también el ministerio de la mujer) no se evalúa aquí: es un punto de la declaración de
 * fe por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-etica-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_ETICA: BancoMateria = {
  materia: "n4-etica",
  repaso: {
    "n4-etica-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué pide Romanos 12:2?", "No conformarse a este siglo, sino transformarse por la renovación del entendimiento", ["Seguir la opinión de la mayoría", "Vivir sin ninguna regla", "Obedecer solo los sentimientos"], "«No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:2"],
      ["1-r2", 1, "o1", "comprender", "¿En qué se funda la ética cristiana?", "En el carácter de Dios, su Palabra, el ejemplo de Cristo y la obra del Espíritu", ["En la opinión de cada uno", "En lo que dicte la mayoría", "En las costumbres del lugar"], "«sed también vosotros santos en toda vuestra manera de vivir».", "1 Pedro 1:15"],
      ["1-r3", 1, "o1", "comprender", "¿Qué pasó en tiempos de los jueces, cuando cada uno hacía lo que bien le parecía?", "Hubo caos", ["Hubo paz y justicia", "Todos obedecieron a Dios", "Nada cambió"], "«cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
    ] as P[]).map(p),
    "n4-etica-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Cuál es el primer paso para tomar una decisión moral, según la lección?", "Preguntar qué manda o prohíbe la Biblia sobre eso", ["Hacer lo que uno sienta", "Preguntar qué hace la mayoría", "Esperar una señal"], "«Lámpara es a mis pies tu palabra, Y lumbrera a mi camino».", "Salmos 119:105"],
      ["2-r2", 2, "o2", "comprender", "¿Qué enseña 1 Corintios 10:23 sobre lo que la Biblia no prohíbe?", "Que no todo lo lícito conviene ni edifica", ["Que todo está permitido sin límites", "Que todo está prohibido", "Que no importa lo que se haga"], "«Todo me es lícito, pero no todo conviene; todo me es lícito, pero no todo edifica».", "1 Corintios 10:23"],
      ["2-r3", 2, "o2", "recordar", "¿Qué promete Santiago 1:5 al que pide sabiduría a Dios?", "Que se la dará abundantemente y sin reproche", ["Que se la negará", "Que tendrá que ganársela", "Que solo la tendrán los pastores"], "«pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada».", "Santiago 1:5"],
    ] as P[]).map(p),
    "n4-etica-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Por qué la vida humana es sagrada?", "Porque toda persona fue creada a imagen de Dios", ["Porque algunas personas son más útiles", "Solo porque lo dice la ley del país", "Solo si la persona está sana"], "«Y creó Dios al hombre a su imagen, a imagen de Dios lo creó».", "Génesis 1:27"],
      ["3-r2", 3, "o3", "comprender", "¿De qué depende la dignidad de una persona?", "De haber sido creada a imagen de Dios, no de su utilidad, su salud ni su edad", ["De su utilidad", "De su riqueza", "De su nación"], "La dignidad la da Dios, y nadie la puede quitar.", "Génesis 1:27"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué enseña Hechos 17:26 contra el racismo?", "Que Dios de una sangre hizo todo el linaje de los hombres", ["Que hay razas superiores", "Que cada nación tiene su propio Dios", "Nada"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26"],
    ] as P[]).map(p),
    "n4-etica-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué dice Génesis 2:24 sobre el matrimonio?", "Que el hombre deja a su padre y a su madre, se une a su mujer, y son una sola carne", ["Que el matrimonio es un contrato por un tiempo", "Que no hace falta casarse", "Que los padres deciden siempre"], "«y se unirá a su mujer, y serán una sola carne».", "Génesis 2:24"],
      ["4-r2", 4, "o4", "comprender", "¿Dónde empieza la pureza, según Jesús en Mateo 5:27-28?", "En el corazón", ["Solo en los actos", "En la ropa", "En la ley del país"], "«ya adulteró con ella en su corazón».", "Mateo 5:28"],
      ["4-r3", 4, "o4", "aplicar", "¿Qué promete 1 Juan 1:9 al que confiesa su pecado?", "Que Dios es fiel y justo para perdonarlo y limpiarlo de toda maldad", ["Que primero debe pagar", "Que nunca será perdonado", "Que debe esconderlo"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad».", "1 Juan 1:9"],
    ] as P[]).map(p),
    "n4-etica-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué dice Proverbios 11:1 sobre el peso falso?", "Que es abominación a Jehová", ["Que es aceptable en los negocios", "Que es una buena estrategia", "Nada"], "«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada».", "Proverbios 11:1"],
      ["5-r2", 5, "o5", "comprender", "¿Cómo debe trabajar el creyente, según Colosenses 3:23?", "De corazón, como para el Señor y no para los hombres", ["Solo cuando lo miran", "Lo menos posible", "Solo por el dinero"], "«Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
      ["5-r3", 5, "o5", "recordar", "¿Qué es raíz de todos los males, según 1 Timoteo 6:10?", "El amor al dinero", ["El dinero", "El trabajo", "La pobreza"], "«porque raíz de todos los males es el amor al dinero».", "1 Timoteo 6:10"],
    ] as P[]).map(p),
    "n4-etica-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Cómo debe ser quien dirige, según 1 Timoteo 3:2-3?", "Irreprensible, sobrio, prudente y no codicioso de ganancias deshonestas", ["Rico y famoso", "Elocuente aunque no sea íntegro", "Joven y fuerte"], "«no codicioso de ganancias deshonestas».", "1 Timoteo 3:3"],
      ["6-r2", 6, "o6", "aplicar", "¿Qué debe hacer la iglesia ante una sospecha de abuso de un menor?", "Reportarla a las autoridades", ["Encubrirla para cuidar la imagen de la iglesia", "Esperar a ver si se repite", "Resolverla solo en privado"], "«Y cualquiera que haga tropezar a alguno de estos pequeños que creen en mí».", "Mateo 18:6"],
      ["6-r3", 6, "o6", "comprender", "¿Cómo se restaura a un líder que cae, según la lección?", "Con espíritu de mansedumbre, pero sin volver enseguida al cargo", ["Con burla y desprecio", "Devolviéndolo de inmediato al púlpito", "Encubriendo lo que pasó"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: el fundamento de la ética cristiana (10)
    ["f01", 1, "o1", "recordar", "¿Qué es la ética cristiana, según la lección?", "Una vida transformada que busca agradar a Dios, no una lista de prohibiciones", ["Una lista de prohibiciones", "Una opinión personal", "Las costumbres de cada cultura"], "«para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta».", "Romanos 12:2"],
    ["f02", 1, "o1", "recordar", "¿Cuál es el primero de los fundamentos de la ética cristiana, según la lección?", "El carácter de Dios, que es santo, justo y amor", ["La opinión de la mayoría", "Las leyes del país", "Los sentimientos"], "«Sed santos, porque yo soy santo».", "1 Pedro 1:16"],
    ["f03", 1, "o1", "comprender", "¿Para qué sirve la Escritura en la ética, según 2 Timoteo 3:16-17?", "Para enseñar lo que agrada a Dios y preparar para toda buena obra", ["Solo para conocer la historia", "Para condenar a los demás", "Para nada"], "«a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra».", "2 Timoteo 3:17"],
    ["f04", 1, "o1", "recordar", "¿Qué nos dejó Cristo, según 1 Pedro 2:21?", "Ejemplo, para que sigamos sus pisadas", ["Una lista de reglas", "Una tradición", "Nada"], "«dejándonos ejemplo, para que sigáis sus pisadas».", "1 Pedro 2:21"],
    ["f05", 1, "o1", "comprender", "¿Qué hace el Espíritu Santo en la ética del creyente?", "Produce en nosotros el fruto que agrada a Dios", ["Nos deja solos", "Nos da permiso para todo", "Reemplaza a la Biblia"], "«Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe».", "Gálatas 5:22"],
    ["f06", 1, "o1", "recordar", "¿En qué dos mandamientos resumió Jesús la ley?", "Amar a Dios con todo el corazón y al prójimo como a uno mismo", ["No matar y no robar", "Guardar el sábado y diezmar", "Orar y ayunar"], "«Amarás a tu prójimo como a ti mismo».", "Mateo 22:39"],
    ["f07", 1, "o1", "comprender", "¿Qué dice el relativismo moral?", "Que no hay verdades morales para todos", ["Que Dios ha hablado", "Que hay un bien y un mal reales", "Que la Biblia es la autoridad"], "«cada uno hacía lo que bien le parecía».", "Jueces 21:25"],
    ["f08", 1, "o1", "analizar", "¿Qué problema tiene el relativismo, según la lección?", "Si fuera cierto, nadie podría decir que la injusticia o el abuso están mal", ["Que es demasiado estricto", "Que obliga a leer la Biblia", "Ninguno"], "La ética cristiana afirma que hay un bien y un mal reales, porque Dios existe y ha hablado.", "Jueces 21:25"],
    ["f09", 1, "o1", "evaluar", "¿Por qué obedece el creyente, según la lección?", "Porque ya fue amado y salvado por gracia, no para ganarse el amor de Dios", ["Para ganarse el amor de Dios", "Solo por miedo al castigo", "Para que lo vean"], "«Porque la gracia de Dios se ha manifestado para salvación a todos los hombres».", "Tito 2:11"],
    ["f10", 1, "o7", "recordar", "Completa Romanos 12:2: No os conforméis a este siglo, sino transformaos…", "por medio de la renovación de vuestro entendimiento", ["por medio de vuestras buenas obras", "por medio de la ley de Moisés", "por medio de la opinión de los sabios"], "Es el versículo de memoria de la materia.", "Romanos 12:2"],
    // ---- lección 2: cómo tomar decisiones morales (10)
    ["f11", 2, "o2", "recordar", "¿Qué se hace cuando la Biblia dice algo claramente sobre una decisión?", "Se obedece", ["Se discute hasta que cambie", "Se ignora", "Se somete a votación"], "«Lámpara es a mis pies tu palabra».", "Salmos 119:105"],
    ["f12", 2, "o2", "comprender", "¿Qué principios bíblicos se aplican cuando no hay un mandato directo?", "Por ejemplo, el amor al prójimo, la santidad y la verdad", ["La comodidad y el gusto", "La moda", "Lo que más gane"], "«Amarás a tu prójimo como a ti mismo».", "Mateo 22:39"],
    ["f13", 2, "o2", "recordar", "¿Qué dice Romanos 14:23 de lo que no proviene de fe?", "Que es pecado", ["Que está permitido", "Que da lo mismo", "Que es bueno"], "«y todo lo que no proviene de fe, es pecado».", "Romanos 14:23"],
    ["f14", 2, "o2", "recordar", "¿Dónde hay seguridad, según Proverbios 11:14?", "En la multitud de consejeros", ["En decidir solo", "En la mucha riqueza", "En la fuerza"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
    ["f15", 2, "o2", "aplicar", "¿Qué tres preguntas ayudan a decidir en lo que la Biblia no menciona?", "¿Glorifica a Dios? ¿Edifica a otros? ¿Me esclaviza?", ["¿Es divertido? ¿Es barato? ¿Es popular?", "¿Lo hace todo el mundo? ¿Me conviene a mí? ¿Me verán?", "¿Es nuevo? ¿Es moderno? ¿Es rápido?"], "«Si, pues, coméis o bebéis, o hacéis otra cosa, hacedlo todo para la gloria de Dios».", "1 Corintios 10:31"],
    ["f16", 2, "o2", "recordar", "¿Qué dice Pablo en 1 Corintios 6:12 sobre las cosas lícitas?", "Que no se dejará dominar de ninguna", ["Que todas le convienen", "Que ninguna es lícita", "Que se dejará llevar por todas"], "«mas yo no me dejaré dominar de ninguna».", "1 Corintios 6:12"],
    ["f17", 2, "o2", "aplicar", "¿Cómo usa el creyente su libertad en lo que la Biblia no regula?", "Con amor: busca lo que edifica y no hace tropezar al hermano débil", ["Sin pensar en los demás", "Prohibiéndose todo", "Haciendo lo que quiere"], "«Ninguno busque su propio bien, sino el del otro».", "1 Corintios 10:24"],
    ["f18", 2, "o2", "comprender", "¿Qué es la conciencia, según la lección?", "Una alarma valiosa que puede estar mal entrenada y se educa con la Palabra", ["Una voz que nunca se equivoca", "Algo sin ningún valor", "Lo mismo que la Biblia"], "Nunca se pasa por encima de ella a la ligera.", "Romanos 14:23"],
    ["f19", 2, "o2", "evaluar", "Un joven debe decidir si acepta un trabajo que le ofrecen. ¿Qué camino es el más sabio?", "Seguir los pasos: lo que dice la Biblia, los principios, su conciencia, el consejo de creyentes maduros y la oración", ["Decidir solo por el dinero", "Hacer lo que digan sus amigos", "No pensarlo"], "«Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios».", "Santiago 1:5"],
    ["f20", 2, "o2", "evaluar", "¿Cuál es la pregunta final para toda decisión, según Pablo?", "Si se hace para la gloria de Dios", ["Si me hace feliz", "Si es legal", "Si nadie se entera"], "«hacedlo todo para la gloria de Dios».", "1 Corintios 10:31"],
    // ---- lección 3: la vida y la dignidad humana (10)
    ["f21", 3, "o3", "recordar", "¿Qué dice Génesis 1:27?", "Que Dios creó al hombre a su imagen, varón y hembra", ["Que el hombre se hizo solo", "Que solo algunos llevan la imagen de Dios", "Que el hombre es igual a los animales"], "«a imagen de Dios lo creó; varón y hembra los creó».", "Génesis 1:27"],
    ["f22", 3, "o3", "recordar", "¿Qué mandamiento protege la vida humana, según Éxodo 20:13?", "No matarás", ["No robarás", "No codiciarás", "Honra a tu padre"], "«No matarás».", "Éxodo 20:13"],
    ["f23", 3, "o3", "comprender", "¿Qué enseña Salmos 139:13 sobre la vida antes de nacer?", "Que Dios forma a la persona en el vientre de su madre", ["Que la vida empieza al nacer", "Que a Dios no le importa el niño antes de nacer", "Nada"], "«Tú me hiciste en el vientre de mi madre».", "Salmos 139:13"],
    ["f24", 3, "o3", "recordar", "¿Qué le dijo Dios a Jeremías, según Jeremías 1:5?", "Antes que te formase en el vientre te conocí", ["Te conoceré cuando seas adulto", "No te conozco", "Te elegí por tus obras"], "«Antes que te formase en el vientre te conocí».", "Jeremías 1:5"],
    ["f25", 3, "o3", "aplicar", "¿Cómo trata la iglesia a quien ya abortó y busca el perdón de Dios?", "La acompaña con compasión y sin condenación", ["La expulsa", "La humilla en público", "La ignora"], "«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados».", "1 Juan 1:9"],
    ["f26", 3, "o3", "recordar", "¿Qué pide Proverbios 31:8?", "Abrir la boca por el mudo en el juicio de todos los desvalidos", ["Callar ante la injusticia", "Defender solo a los ricos", "No meterse en problemas"], "«Abre tu boca por el mudo En el juicio de todos los desvalidos».", "Proverbios 31:8"],
    ["f27", 3, "o3", "aplicar", "¿A quiénes pide la Biblia proteger, según la lección?", "A los niños, los ancianos, los enfermos, los pobres, los inmigrantes y las víctimas de la violencia", ["Solo a los miembros de la iglesia", "Solo a los ricos", "Solo a los de mi nación"], "«Abre tu boca, juzga con justicia, Y defiende la causa del pobre y del menesteroso».", "Proverbios 31:9"],
    ["f28", 3, "o3", "evaluar", "¿Se justifica alguna vez la violencia en la familia?", "Nunca", ["Sí, si hay enojo", "Sí, para corregir al cónyuge", "A veces"], "«Maridos, amad a vuestras mujeres, y no seáis ásperos con ellas».", "Colosenses 3:19"],
    ["f29", 3, "o3", "analizar", "¿Por qué el racismo contradice el evangelio?", "Porque Dios hizo de una sangre a todos y en Cristo nos une en un solo cuerpo", ["No lo contradice", "Porque la Biblia no habla de las naciones", "Porque solo importa la iglesia"], "«porque todos vosotros sois uno en Cristo Jesús».", "Gálatas 3:28"],
    ["f30", 3, "o3", "evaluar", "¿Qué significa defender la vida con la verdad y con compasión?", "Afirmar el valor de toda vida sin condenar a las personas, sino amándolas como Dios las ama", ["Condenar a quien piensa distinto", "Callar la verdad para no ofender", "Ser indiferente"], "«siguiendo la verdad en amor».", "Efesios 4:15"],
    // ---- lección 4: la sexualidad, el matrimonio y la pureza (10)
    ["f31", 4, "o4", "recordar", "¿Quién confirmó el diseño de Génesis 2:24, según la lección?", "Jesús, en Mateo 19:4-6", ["Moisés, en Levítico", "Pablo, en Gálatas", "Nadie"], "«por tanto, lo que Dios juntó, no lo separe el hombre».", "Mateo 19:6"],
    ["f32", 4, "o4", "comprender", "¿Qué enseña la declaración de fe del ministerio sobre el matrimonio?", "Que Dios lo instituyó entre un hombre y una mujer, como un pacto de amor y fidelidad para toda la vida", ["Que es un contrato que se rompe cuando se quiere", "Que no es necesario", "Que lo define cada cultura"], "«y se unirá a su mujer, y serán una sola carne».", "Génesis 2:24"],
    ["f33", 4, "o4", "recordar", "¿Qué dice Hebreos 13:4?", "Honroso sea en todos el matrimonio, y el lecho sin mancilla", ["Que el matrimonio no importa", "Que solo los líderes deben casarse", "Que el lecho no tiene que ver con Dios"], "«Honroso sea en todos el matrimonio, y el lecho sin mancilla».", "Hebreos 13:4"],
    ["f34", 4, "o4", "recordar", "¿Qué manda 1 Corintios 6:18?", "Huir de la fornicación", ["Discutir con la tentación", "Acercarse a ella para vencerla", "Ignorarla"], "«Huid de la fornicación».", "1 Corintios 6:18"],
    ["f35", 4, "o4", "comprender", "¿Qué dice Jesús, en Mateo 5:28, de quien mira a una mujer para codiciarla?", "Que ya adulteró con ella en su corazón", ["Que no ha hecho nada malo", "Que solo es pecado si actúa", "Que es normal"], "«cualquiera que mira a una mujer para codiciarla, ya adulteró con ella en su corazón».", "Mateo 5:28"],
    ["f36", 4, "o4", "aplicar", "¿Qué hace la pornografía, según la lección?", "Destruye la intimidad, explota a personas y esclaviza", ["Ayuda al matrimonio", "No hace daño", "Solo afecta a los jóvenes"], "«mas yo no me dejaré dominar de ninguna».", "1 Corintios 6:12"],
    ["f37", 4, "o4", "aplicar", "¿Qué incluye la salida de la pornografía, según la lección?", "Confesar, pedir ayuda, poner límites prácticos y rendir cuentas a alguien de confianza", ["Esconderlo y luchar solo", "Esperar a que se pase", "Negarlo"], "«Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados».", "Santiago 5:16"],
    ["f38", 4, "o4", "comprender", "¿Qué recuerda 1 Corintios 6:19 sobre el cuerpo del creyente?", "Que es templo del Espíritu Santo", ["Que no importa lo que haga con él", "Que es malo en sí mismo", "Que le pertenece solo a él"], "«vuestro cuerpo es templo del Espíritu Santo».", "1 Corintios 6:19"],
    ["f39", 4, "o4", "evaluar", "¿Cómo debe hablar la iglesia sobre la sexualidad?", "Con verdad y sin burla, acompañando a quien quiere ser libre", ["Con burlas y chistes", "No debe hablar nunca del tema", "Solo para condenar"], "«siguiendo la verdad en amor».", "Efesios 4:15"],
    ["f40", 4, "o4", "evaluar", "¿Cómo trata la iglesia a toda persona, cualquiera que sea su lucha?", "Con respeto: enseña el diseño de Dios con claridad y no humilla ni maltrata a nadie", ["La humilla para que cambie", "La rechaza", "Cambia el diseño de Dios para no ofender"], "«Y creó Dios al hombre a su imagen».", "Génesis 1:27"],
    // ---- lección 5: el dinero, el trabajo y la verdad (10)
    ["f41", 5, "o5", "recordar", "¿Qué agrada a Jehová, según Proverbios 11:1?", "La pesa cabal", ["El peso falso", "La ganancia rápida", "El engaño hábil"], "«Mas la pesa cabal le agrada».", "Proverbios 11:1"],
    ["f42", 5, "o5", "aplicar", "¿Qué enseña Romanos 13:7 sobre los impuestos?", "Que hay que pagar a todos lo que se debe, también el impuesto", ["Que el creyente no paga impuestos", "Que se pueden esconder los ingresos", "Nada"], "«Pagad a todos lo que debéis: al que tributo, tributo; al que impuesto, impuesto».", "Romanos 13:7"],
    ["f43", 5, "o5", "recordar", "¿Desde cuándo es el trabajo parte del plan de Dios?", "Desde el Edén", ["Desde la caída", "Desde la ley de Moisés", "Desde que existen las fábricas"], "«y lo puso en el huerto de Edén, para que lo labrara y lo guardase».", "Génesis 2:15"],
    ["f44", 5, "o5", "comprender", "¿Qué denuncia Santiago 5:4?", "El jornal de los obreros que no les fue pagado", ["La pereza de los obreros", "El descanso", "La oración"], "«clama el jornal de los obreros que han cosechado vuestras tierras».", "Santiago 5:4"],
    ["f45", 5, "o5", "aplicar", "¿Cómo trabaja el creyente?", "Con diligencia, sin pereza y sin explotar a otros", ["Lo menos posible", "Solo cuando lo vigilan", "Explotando a otros para ganar más"], "«hacedlo de corazón, como para el Señor y no para los hombres».", "Colosenses 3:23"],
    ["f46", 5, "o5", "recordar", "¿Qué pide Efesios 4:25?", "Desechar la mentira y hablar verdad cada uno con su prójimo", ["Mentir solo un poco", "Callar siempre", "Decir solo lo que agrada"], "«Por lo cual, desechando la mentira, hablad verdad cada uno con su prójimo».", "Efesios 4:25"],
    ["f47", 5, "o5", "comprender", "¿Qué enseñó Jesús en Mateo 5:37?", "Que nuestro sí sea sí y nuestro no sea no", ["Que se puede jurar por todo", "Que hay mentiras buenas", "Que no hay que prometer nada"], "«Pero sea vuestro hablar: Sí, sí; no, no».", "Mateo 5:37"],
    ["f48", 5, "o5", "analizar", "¿Cuál es el problema con el dinero, según 1 Timoteo 6:10?", "No el dinero, sino amarlo", ["Tener dinero es pecado", "No hay ningún problema", "El problema es darlo"], "«porque raíz de todos los males es el amor al dinero».", "1 Timoteo 6:10"],
    ["f49", 5, "o5", "aplicar", "¿Qué hace el creyente para no amar el dinero, según la lección?", "Da con generosidad, se contenta con lo que tiene y no se deja comprar", ["Acumula todo lo que puede", "Deja de trabajar", "Pide prestado sin pagar"], "«Pero gran ganancia es la piedad acompañada de contentamiento».", "1 Timoteo 6:6"],
    ["f50", 5, "o5", "evaluar", "¿Dónde se construye la integridad, según la lección?", "En lo pequeño: una factura honesta, una hora bien trabajada, una promesa cumplida", ["Solo en las grandes decisiones", "En lo que los demás ven", "En los discursos"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
    // ---- lección 6: la ética del ministro (10)
    ["f51", 6, "o6", "recordar", "¿Qué son, ante todo, los requisitos del liderazgo en 1 Timoteo 3?", "Requisitos de carácter", ["Requisitos de riqueza", "Requisitos de fama", "Requisitos de estudios universitarios"], "«Pero es necesario que el obispo sea irreprensible».", "1 Timoteo 3:2"],
    ["f52", 6, "o6", "aplicar", "¿Cómo se manejan las ofrendas con transparencia, según la lección?", "Las cuentan al menos dos personas, se registran y se rinden cuentas a la iglesia", ["Las cuenta una sola persona en secreto", "No se registran", "Las guarda el pastor sin informar"], "«evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos».", "2 Corintios 8:20"],
    ["f53", 6, "o6", "recordar", "¿Cómo procuraba Pablo hacer las cosas, según 2 Corintios 8:21?", "Honradamente, no solo delante del Señor sino también delante de los hombres", ["Solo delante del Señor", "Solo delante de los hombres", "Como le pareciera"], "«procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».", "2 Corintios 8:21"],
    ["f54", 6, "o6", "comprender", "¿Qué es la autoridad sin abuso, según 1 Pedro 5:3?", "Dirigir siendo ejemplo, no como teniendo señorío sobre los demás", ["Mandar sin rendir cuentas", "Hacer que todos obedezcan sin preguntar", "Usar el cargo para beneficio propio"], "«no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey».", "1 Pedro 5:3"],
    ["f55", 6, "o6", "aplicar", "¿Qué norma de relaciones apropiadas enseña la lección?", "No aconsejar a solas a alguien del otro sexo en un lugar cerrado y evitar toda apariencia de mal", ["Aconsejar siempre a solas y en secreto", "No aconsejar nunca a nadie", "Visitar de noche sin avisar"], "«Absteneos de toda especie de mal».", "1 Tesalonicenses 5:22"],
    ["f56", 6, "o6", "comprender", "¿Cuándo no se guarda la confidencialidad?", "Cuando hay peligro para la vida o abuso", ["Nunca se guarda", "Cuando el pastor quiere contarlo", "Cuando es un chisme interesante"], "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo».", "Proverbios 11:13"],
    ["f57", 6, "o6", "aplicar", "¿Qué normas protegen a los menores en el ministerio?", "Al menos dos adultos, verificar a quienes sirven, puertas con ventana o abiertas, y reportar toda sospecha de abuso", ["Un solo adulto a solas con los niños", "No verificar a nadie", "Resolver las sospechas en privado"], "«cualquiera que haga tropezar a alguno de estos pequeños que creen en mí».", "Mateo 18:6"],
    ["f58", 6, "o6", "recordar", "¿Qué dice la ley de Texas sobre la sospecha de abuso de un menor, según la lección?", "Que toda persona debe reportarla, sin excepción para los ministros", ["Que los ministros no tienen que reportar", "Que solo la policía puede reportar", "Que no hay que reportar"], "«Sométase toda persona a las autoridades superiores».", "Romanos 13:1"],
    ["f59", 6, "o6", "evaluar", "Un líder cae en un pecado grave. ¿Qué es lo correcto?", "Que deje el ministerio por un tiempo, reciba disciplina y acompañamiento y repare el daño", ["Que vuelva al púlpito el domingo siguiente", "Que se encubra para cuidar la imagen de la iglesia", "Que se le abandone sin ayuda"], "«restauradle con espíritu de mansedumbre, considerándote a ti mismo».", "Gálatas 6:1"],
    ["f60", 6, "o6", "evaluar", "Si se descubre un abuso en la iglesia, ¿qué va primero?", "Proteger a la víctima", ["Cuidar la imagen de la iglesia", "Proteger al líder", "Guardar silencio"], "«Y cualquiera que haga tropezar a alguno de estos pequeños que creen en mí, mejor le fuera que se le colgase al cuello una piedra de molino de asno».", "Mateo 18:6"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué pide 1 Pedro 1:15?", "Ser santos en toda nuestra manera de vivir", ["Ser santos solo en la iglesia", "Ser santos solo los domingos", "Ser perfectos sin ayuda de Dios"], "«sed también vosotros santos en toda vuestra manera de vivir».", "1 Pedro 1:15"],
      ["m1-02", 1, "o1", "comprender", "¿Por qué la ética cristiana no es relativa?", "Porque Dios existe y ha hablado, y hay un bien y un mal reales", ["Porque lo decide la mayoría", "Porque cambia con la cultura", "Porque cada uno tiene su verdad"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16"],
      ["m1-03", 1, "o1", "aplicar", "¿Con qué se mide toda decisión moral, según la lección?", "Con el doble amor: a Dios y al prójimo", ["Con el gusto personal", "Con la conveniencia", "Con lo que digan las redes"], "«Amarás al Señor tu Dios con todo tu corazón».", "Mateo 22:37"],
      ["m1-04", 1, "o1", "recordar", "¿Cómo nos enseña a vivir la gracia de Dios, según Tito 2:12?", "Sobria, justa y piadosamente", ["Sin ninguna regla", "Como el mundo", "Juzgando a los demás"], "«vivamos en este siglo sobria, justa y piadosamente».", "Tito 2:12"],
      ["m1-05", 1, "o1", "analizar", "¿Qué diferencia hay entre una lista de prohibiciones y la ética cristiana?", "La ética cristiana es una mente renovada que busca agradar a Dios, no solo cumplir reglas", ["Ninguna", "La ética cristiana no tiene mandamientos", "La lista es mejor"], "«transformaos por medio de la renovación de vuestro entendimiento».", "Romanos 12:2"],
      ["m1-06", 1, "o1", "evaluar", "Alguien dice que lo bueno para ti no tiene que ser bueno para él. ¿Qué responde la ética cristiana?", "Que hay un bien y un mal reales para todos, porque Dios ha hablado", ["Que tiene razón", "Que nada importa", "Que cada cultura inventa su moral"], "Cuando «cada uno hacía lo que bien le parecía», el resultado fue el caos.", "Jueces 21:25"],
      ["m1-07", 2, "o2", "recordar", "¿Qué es la Palabra de Dios para el camino, según Salmos 119:105?", "Lámpara a mis pies y lumbrera a mi camino", ["Un libro de historia", "Un adorno", "Una carga"], "«Lámpara es a mis pies tu palabra, Y lumbrera a mi camino».", "Salmos 119:105"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué conviene pedir consejo a creyentes maduros?", "Porque en la multitud de consejeros hay seguridad", ["Para que decidan por mí", "Para tener a quién culpar", "No conviene"], "«Mas en la multitud de consejeros hay seguridad».", "Proverbios 11:14"],
      ["m1-09", 2, "o2", "aplicar", "Un creyente siente que algo está mal, pero no está seguro. ¿Qué hace?", "No pasa por encima de su conciencia a la ligera: la examina con la Palabra y pide consejo", ["Lo hace igual", "Ignora su conciencia", "Espera a que se le pase"], "«y todo lo que no proviene de fe, es pecado».", "Romanos 14:23"],
      ["m1-10", 2, "o2", "recordar", "¿Qué dice 1 Corintios 10:23 de todo lo lícito?", "Que no todo conviene y no todo edifica", ["Que todo es caro", "Que todo divierte", "Que todo está prohibido"], "«Todo me es lícito, pero no todo conviene; todo me es lícito, pero no todo edifica».", "1 Corintios 10:23"],
      ["m1-11", 2, "o2", "analizar", "La Biblia no menciona cada tema de hoy, como las redes sociales. ¿Cómo se decide entonces?", "Con los principios que da la Biblia, que se aplican a todo, y con la sabiduría que Dios da al que la pide", ["Haciendo lo que uno quiera", "Pensando que la Biblia ya no sirve", "Prohibiéndolo todo"], "«Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios».", "Santiago 1:5"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué decisión honra mejor 1 Corintios 10:24?", "La que busca también el bien del otro, no solo el propio", ["La que busca solo mi bien", "La que ignora a los demás", "La que más gana"], "«Ninguno busque su propio bien, sino el del otro».", "1 Corintios 10:24"],
      ["m1-13", 3, "o3", "recordar", "¿A quiénes creó Dios a su imagen, según Génesis 1:27?", "Al varón y a la hembra", ["Solo al varón", "Solo a los fuertes", "Solo a los de una nación"], "«varón y hembra los creó».", "Génesis 1:27"],
      ["m1-14", 3, "o3", "comprender", "¿Desde cuándo defienden la vida los cristianos, según la lección?", "Desde el vientre materno", ["Desde los 18 años", "Desde que la persona es útil", "Solo después de nacer"], "«Antes que te formase en el vientre te conocí».", "Jeremías 1:5"],
      ["m1-15", 3, "o3", "aplicar", "¿Cómo acompaña la iglesia a una mujer en un embarazo difícil?", "Con compasión y sin condenación", ["Con juicio y rechazo", "Ignorándola", "Señalándola en público"], "«siguiendo la verdad en amor».", "Efesios 4:15"],
      ["m1-16", 3, "o3", "analizar", "¿Qué contradice el desprecio por el origen, el color o la nación de una persona?", "La creación y el evangelio", ["Solo la ley del país", "Nada", "Solo las buenas costumbres"], "«Y de una sangre ha hecho todo el linaje de los hombres».", "Hechos 17:26"],
      ["m1-17", 3, "o3", "recordar", "¿Qué pide Proverbios 31:9?", "Juzgar con justicia y defender la causa del pobre y del menesteroso", ["Defender solo a los poderosos", "No juzgar nunca", "Callar"], "«Abre tu boca, juzga con justicia, Y defiende la causa del pobre y del menesteroso».", "Proverbios 31:9"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué actitud refleja mejor la dignidad humana en la iglesia?", "Tratar a cada persona como portadora de la imagen de Dios", ["Tratar mejor a los que más aportan", "Ignorar a los inmigrantes", "Preferir a los de mi grupo"], "«Y creó Dios al hombre a su imagen».", "Génesis 1:27"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué no debe hacer el hombre con lo que Dios juntó, según Mateo 19:6?", "Separarlo", ["Honrarlo", "Cuidarlo", "Bendecirlo"], "«por tanto, lo que Dios juntó, no lo separe el hombre».", "Mateo 19:6"],
      ["m2-02", 4, "o4", "comprender", "¿Para dónde diseñó Dios la intimidad sexual?", "Para el matrimonio", ["Para cualquier relación", "Para el noviazgo", "Para cuando uno quiera"], "«Honroso sea en todos el matrimonio, y el lecho sin mancilla».", "Hebreos 13:4"],
      ["m2-03", 4, "o4", "aplicar", "¿Qué ayuda a cuidar la pureza, según la lección?", "Poner límites prácticos y rendir cuentas a alguien de confianza", ["Esconder el problema", "Confiar solo en la fuerza de voluntad", "No hablar con nadie"], "«Confesaos vuestras ofensas unos a otros».", "Santiago 5:16"],
      ["m2-04", 4, "o4", "recordar", "¿Por qué el creyente glorifica a Dios en su cuerpo, según 1 Corintios 6:20?", "Porque fue comprado por precio", ["Porque su cuerpo es malo", "Para que lo admiren", "Porque así lo pide la cultura"], "«Porque habéis sido comprados por precio; glorificad, pues, a Dios en vuestro cuerpo».", "1 Corintios 6:20"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué la sexualidad no es algo sucio, según la lección?", "Porque es un regalo de Dios, con un diseño y un lugar", ["Porque no tiene reglas", "Porque es lo más importante de la vida", "Sí es algo sucio"], "«y serán una sola carne».", "Génesis 2:24"],
      ["m2-06", 4, "o4", "evaluar", "Un hermano confiesa que lucha con la pornografía. ¿Cuál es la mejor respuesta?", "Escucharlo sin burla, recordarle el perdón de Dios y ayudarle a buscar ayuda y a rendir cuentas", ["Contarlo a todos", "Decirle que no tiene remedio", "Ignorarlo"], "«él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad».", "1 Juan 1:9"],
      ["m2-07", 5, "o5", "recordar", "¿Qué recibirá el que trabaja como para el Señor, según Colosenses 3:24?", "La recompensa de la herencia", ["Nada", "Solo su salario", "Un castigo"], "«sabiendo que del Señor recibiréis la recompensa de la herencia».", "Colosenses 3:24"],
      ["m2-08", 5, "o5", "comprender", "¿Qué rompe la mentira, aunque parezca pequeña?", "La confianza", ["Nada", "Solo la ley", "La tradición"], "«desechando la mentira, hablad verdad cada uno con su prójimo».", "Efesios 4:25"],
      ["m2-09", 5, "o5", "aplicar", "Un comerciante creyente podría ganar más engañando en el precio. ¿Qué hace?", "Es honrado, porque el peso falso es abominación a Jehová", ["Engaña un poco", "Engaña solo a los ricos", "Lo hace si nadie se entera"], "«El peso falso es abominación a Jehová».", "Proverbios 11:1"],
      ["m2-10", 5, "o5", "recordar", "¿Qué dice Lucas 16:10 del que es fiel en lo muy poco?", "Que también en lo más es fiel", ["Que no importa", "Que nunca tendrá más", "Que será rico"], "«El que es fiel en lo muy poco, también en lo más es fiel».", "Lucas 16:10"],
      ["m2-11", 5, "o5", "analizar", "¿Por qué el creyente cumple su palabra aunque le cueste?", "Porque su sí es sí y su no es no, y la verdad refleja a Dios", ["Para que lo admiren", "Solo si hay contrato", "No hace falta cumplir"], "«Pero sea vuestro hablar: Sí, sí; no, no».", "Mateo 5:37"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué predica más que las palabras, según la lección?", "La manera de trabajar y de usar el dinero", ["La ropa", "El título", "El volumen de la voz"], "«Y todo lo que hagáis, hacedlo de corazón».", "Colosenses 3:23"],
      ["m2-13", 6, "o6", "recordar", "¿Qué no hace el que predica con honestidad?", "No inventa testimonios ni usa sermones ajenos sin decirlo", ["No ora", "No estudia", "No usa la Biblia"], "«Por lo cual, desechando la mentira, hablad verdad».", "Efesios 4:25"],
      ["m2-14", 6, "o6", "comprender", "¿Por qué la restauración no es lo mismo que volver enseguida al cargo?", "Porque el líder necesita tiempo, disciplina, acompañamiento y reparar el daño", ["Porque nunca hay perdón", "Porque el cargo es lo más importante", "Sí es lo mismo"], "«restauradle con espíritu de mansedumbre».", "Gálatas 6:1"],
      ["m2-15", 6, "o6", "aplicar", "¿Cuántos adultos debe haber, como mínimo, en el ministerio con niños?", "Dos", ["Uno", "Ninguno", "Diez"], "Así se protege a los pequeños y a quienes sirven.", "Mateo 18:6"],
      ["m2-16", 6, "o6", "recordar", "¿Qué necesita todo ministro, según la lección?", "Alguien a quien rendir cuentas", ["Nada", "Solo su familia", "Seguidores en las redes"], "«Hierro con hierro se aguza».", "Proverbios 27:17"],
      ["m2-17", 6, "o6", "analizar", "¿A quiénes protege la ética ministerial, según la lección?", "A la iglesia, a los débiles y al propio ministro", ["Solo al ministro", "Solo a los ricos", "A nadie"], "«procurando hacer las cosas honradamente».", "2 Corintios 8:21"],
      ["m2-18", 6, "o6", "evaluar", "A un líder le cuentan en confidencia el abuso de un menor. ¿Qué hace un líder íntegro?", "Lo reporta a las autoridades, porque la confidencialidad tiene límites", ["Guarda el secreto", "Habla solo con el acusado", "Espera más pruebas sin reportar"], "«mejor le fuera que se le colgase al cuello una piedra de molino de asno».", "Mateo 18:6"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-etica-e1",
      tipo: "corta",
      pregunta: "Explica en qué se funda la ética cristiana y por qué no es relativa.",
      ideas: [
        { id: "dios", peso: 25, texto: "El carácter santo de Dios y su Palabra.", formas: ["caracter de dios", "dios es santo", "santo", "palabra de dios", "su palabra", "la escritura", "la biblia"] },
        { id: "cristo", peso: 25, texto: "El ejemplo de Cristo y la obra del Espíritu.", formas: ["ejemplo de cristo", "cristo", "jesus", "espiritu santo", "obra del espiritu", "fruto del espiritu"] },
        { id: "real", peso: 25, texto: "No es relativa: hay un bien y un mal reales, porque Dios ha hablado.", formas: ["bien y mal", "bien y un mal", "no es relativa", "verdades morales", "ha hablado", "mal reales"] },
        { id: "amor", peso: 15, texto: "Se resume en amar a Dios y al prójimo.", formas: ["amar a dios", "amor a dios", "projimo", "doble amor", "amaras"] },
      ],
      citas: ["Romanos 12:1-2", "Romanos 12:2", "Mateo 22:37-40", "Mateo 22:37-39", "Jueces 21:25", "1 Pedro 1:15-16", "1 Pedro 1:16", "2 Timoteo 3:16-17", "1 Pedro 2:21", "Gálatas 5:22-23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La ética cristiana se funda en el carácter santo de Dios, en su Palabra, en el ejemplo de Cristo y en la obra del Espíritu Santo, y se resume en amar a Dios y al prójimo (Mateo 22:37-40). No es relativa: hay un bien y un mal reales, porque Dios existe y ha hablado.",
    },
    {
      id: "n4-etica-e2",
      tipo: "corta",
      pregunta: "Explica los pasos para tomar una decisión moral cuando la Biblia no menciona el tema directamente.",
      ideas: [
        { id: "principios", peso: 25, texto: "Buscar los principios bíblicos que se aplican.", formas: ["principio*", "amor al projimo", "santidad", "que manda"] },
        { id: "conciencia", peso: 25, texto: "La conciencia iluminada por la Palabra y el consejo de creyentes maduros.", formas: ["conciencia", "consejo", "consejeros", "creyentes maduros", "hermanos maduros"] },
        { id: "preguntas", peso: 25, texto: "¿Glorifica a Dios? ¿Edifica? ¿Me esclaviza?", formas: ["gloria de dios", "glorifica", "edifica", "esclaviz*", "dominar", "conviene", "tropezar"] },
        { id: "oracion", peso: 15, texto: "Orar y pedir sabiduría.", formas: ["orar", "oro", "oracion", "sabiduria", "pedir a dios", "pido a dios"] },
      ],
      citas: ["1 Corintios 10:23-24", "1 Corintios 10:23", "1 Corintios 10:31", "1 Corintios 6:12", "Santiago 1:5", "Romanos 14:23", "Proverbios 11:14", "Salmos 119:105"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero busco los principios bíblicos que se aplican, como el amor al prójimo y la santidad. Luego escucho mi conciencia iluminada por la Palabra y pido consejo a creyentes maduros. Me pregunto si glorifica a Dios, si edifica a otros y si me esclaviza (1 Corintios 10:23-31). Y oro pidiendo sabiduría, que Dios da sin reproche.",
    },
    {
      id: "n4-etica-e3",
      tipo: "corta",
      pregunta: "Explica qué normas protegen a los menores en el ministerio y qué se hace ante una sospecha de abuso.",
      ideas: [
        { id: "adultos", peso: 25, texto: "Siempre al menos dos adultos.", formas: ["dos adultos", "dos personas", "nunca a solas", "nunca solo"] },
        { id: "verificar", peso: 20, texto: "Se verifica a quienes sirven.", formas: ["verific*", "antecedentes"] },
        { id: "puertas", peso: 15, texto: "Las puertas tienen ventana o quedan abiertas.", formas: ["puerta*", "ventana*"] },
        { id: "reportar", peso: 30, texto: "Toda sospecha se reporta a las autoridades, como manda la ley de Texas.", formas: ["report*", "denunci*", "autoridades", "policia"] },
      ],
      citas: ["Mateo 18:6", "Mateo 18:10", "Marcos 9:42", "Proverbios 31:8-9", "Romanos 13:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "En el ministerio infantil siempre hay al menos dos adultos, se verifica a quienes sirven y las puertas tienen ventana o quedan abiertas. Toda sospecha de abuso se reporta a las autoridades, como manda la ley de Texas, y primero se protege a la víctima, porque Jesús advirtió contra quien haga tropezar a estos pequeños (Mateo 18:6).",
    },
    {
      id: "n4-etica-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo tomarías una decisión moral sobre un tema que la Biblia no menciona directamente (por ejemplo, el uso de las redes sociales o una oferta de trabajo): sigue los pasos de la lección y explica tu respuesta. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "tema", peso: 10, texto: "El tema escogido.", formas: ["escogi", "el tema", "mi caso", "redes", "trabajo"] },
        { id: "biblia", peso: 20, texto: "Lo que manda la Biblia y los principios que se aplican.", formas: ["principio*", "que manda", "amor al projimo", "santidad"] },
        { id: "conciencia", peso: 15, texto: "La conciencia iluminada por la Palabra.", formas: ["conciencia"] },
        { id: "consejo", peso: 15, texto: "El consejo de creyentes maduros.", formas: ["consejo", "consejeros", "creyentes maduros", "hermanos maduros", "pastor"] },
        { id: "preguntas", peso: 25, texto: "¿Glorifica a Dios? ¿Edifica? ¿Me esclaviza?", formas: ["gloria de dios", "glorifica", "edifica", "esclaviz*", "dominar", "conviene", "tropezar"] },
        { id: "oracion", peso: 15, texto: "La oración pidiendo sabiduría.", formas: ["oracion", "orar", "oro", "sabiduria", "pido a dios", "pedir a dios"] },
      ],
      basta: 85,
      citas: ["Salmos 119:105", "1 Corintios 10:23-24", "1 Corintios 10:23", "1 Corintios 10:31", "1 Corintios 6:12", "Santiago 1:5", "Romanos 14:23", "Proverbios 11:14", "Romanos 12:2", "Mateo 22:37-40", "Colosenses 3:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Escogí el tema de las redes sociales. Primero pregunto qué manda la Biblia: no menciona las redes, pero sí da principios, como el amor al prójimo, la santidad y la verdad. Por eso no publicaría chismes ni burlas, y cuidaría lo que miro. Luego escucho mi conciencia, iluminada por la Palabra: si algo me quita la paz, me detengo, porque todo lo que no proviene de fe, es pecado (Romanos 14:23). También pido consejo a creyentes maduros, como mi pastor, porque en la multitud de consejeros hay seguridad. Después me hago las preguntas de Pablo: ¿glorifica a Dios?, ¿edifica a otros?, ¿me esclaviza? Todo me es lícito, pero no todo conviene ni todo edifica (1 Corintios 10:23), y no me dejaré dominar de nada; por eso pondría un límite de tiempo. Finalmente oro y pido sabiduría a Dios, que la da abundantemente y sin reproche (Santiago 1:5). Así decido usar las redes para la gloria de Dios: con tiempo limitado, para animar a otros y sin dejar que me dominen.",
    },
    {
      id: "n4-etica-e5",
      tipo: "breve",
      pregunta:
        "Un líder de tu iglesia te pide consejo sobre una situación ética del ministerio (por ejemplo, el manejo de las ofrendas, una consejería, una sospecha de abuso o un líder que cayó). Describe la situación y explica qué harías según la ética ministerial. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "caso", peso: 10, texto: "La situación.", formas: ["imagin*", "escogi", "el caso", "me cuenta"] },
        { id: "integridad", peso: 15, texto: "La integridad que pide la Palabra a quien dirige.", formas: ["irreprensible", "integridad", "integro", "caracter", "ganancias deshonestas"] },
        { id: "transparencia", peso: 20, texto: "La transparencia y la rendición de cuentas.", formas: ["transparen*", "rendir cuentas", "rindan cuentas", "dos personas", "registr*", "honradamente"] },
        { id: "proteger", peso: 25, texto: "Proteger a los débiles y reportar el abuso.", formas: ["report*", "autoridades", "la victima", "denunci*"] },
        { id: "restaurar", peso: 15, texto: "Restaurar con mansedumbre, sin encubrir.", formas: ["mansedumbre", "restaur*", "disciplina", "acompaña*"] },
        { id: "limites", peso: 15, texto: "Relaciones apropiadas y confidencialidad con límites.", formas: ["a solas", "apariencia de mal", "confidencial*", "dos adultos", "puertas abiertas"] },
      ],
      basta: 85,
      citas: ["1 Timoteo 3:2-3", "1 Timoteo 3:2", "1 Timoteo 3:3", "2 Corintios 8:20-21", "2 Corintios 8:21", "Mateo 18:6", "Gálatas 6:1", "1 Pedro 5:2-3", "1 Tesalonicenses 5:22", "Proverbios 27:17", "Romanos 13:1"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Imaginé este caso: un líder me cuenta que un maestro de niños tuvo un trato sospechoso con un menor, y que el tesorero cuenta solo las ofrendas. Primero le recordaría que quien dirige debe ser irreprensible y no codicioso de ganancias deshonestas (1 Timoteo 3:2-3). Sobre las ofrendas, le pediría transparencia: que las cuenten al menos dos personas, que se registren y que se rindan cuentas a la iglesia, procurando hacer las cosas honradamente delante del Señor y de los hombres (2 Corintios 8:21). Sobre el menor, le diría que la confidencialidad tiene límites: toda sospecha de abuso se reporta a las autoridades, como manda la ley de Texas, y primero se protege a la víctima, porque Jesús advirtió contra quien haga tropezar a uno de estos pequeños (Mateo 18:6). Mientras tanto, ese maestro no sirve con niños, y desde ahora siempre habrá dos adultos y puertas abiertas. Si el maestro cayó en pecado, se le acompaña y se le restaura con espíritu de mansedumbre (Gálatas 6:1), pero sin devolverlo al cargo y sin encubrir nada para cuidar la imagen de la iglesia.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 30 % de la nota del Nivel 4
  breve: {
    id: "n4-etica-b1",
    tipo: "breve",
    pregunta:
      "Escoge un tema de la ética cristiana (la vida y la dignidad humana, la sexualidad y el matrimonio, o el dinero, el trabajo y la verdad) y explica qué enseña la Biblia sobre él, cómo lo aplicarías en tu vida y cómo lo enseñarías con verdad y compasión. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "tema", peso: 10, texto: "El tema escogido.", formas: ["escogi", "el tema", "mi tema"] },
      { id: "biblia", peso: 30, texto: "Lo que enseña la Biblia sobre el tema.", formas: ["imagen de dios", "a su imagen", "no mataras", "una sola carne", "un hombre y una mujer", "pureza", "peso falso", "de corazon", "amor al dinero", "hablad verdad", "la biblia enseña", "dios creo"] },
      { id: "vida", peso: 25, texto: "Cómo lo aplicaría en su vida.", formas: ["voy a", "en mi vida", "aplicaria", "me comprometo", "esta semana", "mi trabajo", "mi familia"] },
      { id: "compasion", peso: 25, texto: "Cómo lo enseñaría con verdad y compasión.", formas: ["compasion", "sin condena*", "con amor", "respeto", "misericordia", "verdad en amor", "sin burla"] },
      { id: "gracia", peso: 10, texto: "La gracia y la restauración para quien ha caído.", formas: ["gracia", "perdon", "perdonar", "restaur*", "confesamos", "confesar"] },
    ],
    basta: 85,
    citas: ["Génesis 1:27", "Éxodo 20:13", "Salmos 139:13-16", "Salmos 139:13", "Jeremías 1:5", "Proverbios 31:8-9", "Hechos 17:26", "Gálatas 3:28", "Génesis 2:24", "Hebreos 13:4", "Mateo 5:27-28", "1 Corintios 6:18-20", "1 Juan 1:9", "Proverbios 11:1", "Romanos 13:7", "Colosenses 3:23-24", "Efesios 4:25", "1 Timoteo 6:9-10", "Efesios 4:15", "Romanos 12:2"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Escogí el tema de la vida y la dignidad humana. La Biblia enseña que Dios creó al hombre a su imagen, varón y hembra (Génesis 1:27); por eso toda vida es sagrada y su valor no depende de su utilidad, su salud ni su edad. Dios conoce a cada persona desde el vientre (Jeremías 1:5) y nos manda abrir la boca por los desvalidos (Proverbios 31:8-9). Además, de una sangre hizo todo el linaje de los hombres, así que el racismo contradice la creación y el evangelio. En mi vida voy a tratar con respeto a los inmigrantes de mi barrio, visitar a los ancianos de la iglesia y no burlarme de nadie por su origen. Lo enseñaría con verdad y con compasión: defendería la vida desde el vientre materno, pero acompañaría sin condenación a la mujer en un embarazo difícil y a quien ya abortó y busca a Dios, recordándole que hay perdón, porque si confesamos nuestros pecados, él es fiel y justo para perdonar (1 Juan 1:9). Así la iglesia sigue la verdad en amor.",
  },
};
