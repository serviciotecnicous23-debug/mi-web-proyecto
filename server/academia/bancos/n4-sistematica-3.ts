/**
 * El banco de «Teología sistemática III: el hombre, el pecado y la salvación» (Nivel 4). SOLO SERVIDOR.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la imagen de Dios · o2 el pecado y Pelagio · o3 la gracia y la elección · o4 la conversión, la
 * regeneración y la justificación · o5 la adopción y la santificación · o6 la seguridad, la perseverancia y la
 * glorificación · o7 el versículo de memoria (Romanos 5:1). Sobre la elección y la perseverancia, las preguntas solo piden
 * reconocer las posiciones, nunca elegir una.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n4-sistematica-3-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N4_SISTEMATICA_3: BancoMateria = {
  materia: "n4-sistematica-3",
  repaso: {
    "n4-sistematica-3-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Cómo dijo Dios que haría al hombre, según Génesis 1:26?", "A su imagen, conforme a su semejanza", ["Como un ángel", "Como los animales", "Sin ninguna semejanza"], "«Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza».", "Génesis 1:26-28"],
      ["1-r2", 1, "o1", "comprender", "¿Qué significa ser imagen de Dios, según la lección?", "Poder conocer a Dios, amar, razonar, decidir y gobernar la creación como su representante", ["Parecerse físicamente a Dios", "Ser igual a Dios", "No tener cuerpo"], "«y señoree en los peces del mar, en las aves de los cielos».", "Génesis 1:26-28"],
      ["1-r3", 1, "o1", "aplicar", "¿Qué enseña Santiago 3:9 sobre el trato a las personas?", "Que no se debe maldecir a quienes están hechos a la semejanza de Dios", ["Que solo los creyentes merecen respeto", "Que la imagen de Dios se perdió del todo", "Que no importa cómo hablemos"], "«y con ella maldecimos a los hombres, que están hechos a la semejanza de Dios».", "Santiago 3:9"],
    ] as P[]).map(p),
    "n4-sistematica-3-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué es el pecado, según 1 Juan 3:4?", "Infracción de la ley", ["Un error sin importancia", "Una enfermedad", "Una costumbre cultural"], "«pues el pecado es infracción de la ley».", "1 Juan 3:4"],
      ["2-r2", 2, "o2", "comprender", "¿Qué enseñaba Pelagio?", "Que el ser humano nace sin inclinación al pecado y puede vivir sin pecar por su propio esfuerzo", ["Que todos necesitan la gracia", "Que Cristo es Dios", "Que la Biblia es inspirada"], "«No hay justo, ni aun uno».", "Romanos 3:10-12"],
      ["2-r3", 2, "o2", "aplicar", "Un creyente piensa que solo peca cuando hace algo malo. ¿Qué le enseña Santiago 4:17?", "Que también es pecado saber hacer lo bueno y no hacerlo", ["Que tiene razón", "Que omitir el bien no importa", "Que solo pecan los incrédulos"], "«y al que sabe hacer lo bueno, y no lo hace, le es pecado».", "Santiago 4:17"],
    ] as P[]).map(p),
    "n4-sistematica-3-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Para quiénes se ha manifestado la gracia de Dios, según Tito 2:11?", "Para salvación a todos los hombres", ["Solo para Israel", "Solo para los buenos", "Para nadie todavía"], "«Porque la gracia de Dios se ha manifestado para salvación a todos los hombres».", "Tito 2:11"],
      ["3-r2", 3, "o3", "comprender", "¿Qué enseña el arminianismo sobre la elección?", "Que Dios da a todos una gracia que les permite responder y elige a los que sabe que creerán", ["Que Dios no elige a nadie", "Que la salvación es por obras", "Que el ser humano se salva solo"], "«no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento».", "2 Pedro 3:9"],
      ["3-r3", 3, "o3", "aplicar", "Dos hermanos discuten sobre la elección. ¿Qué les recuerda la lección?", "Que coinciden en que la salvación es solo por gracia y en que el ser humano es responsable de creer", ["Que uno de los dos no es salvo", "Que la pregunta no tiene importancia", "Que deben dejar de congregarse juntos"], "«Ninguno puede venir a mí, si el Padre que me envió no le trajere».", "Juan 6:44"],
    ] as P[]).map(p),
    "n4-sistematica-3-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Qué predicaba Pablo, según Hechos 20:21?", "El arrepentimiento para con Dios y la fe en nuestro Señor Jesucristo", ["Solo el cumplimiento de la ley", "Solo los milagros", "La circuncisión"], "«acerca del arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo».", "Hechos 20:21"],
      ["4-r2", 4, "o4", "comprender", "¿Qué diferencia hay entre la regeneración y la justificación?", "La regeneración cambia la naturaleza; la justificación cambia la posición ante Dios", ["No hay diferencia", "La regeneración es por obras", "La justificación es un proceso de toda la vida"], "«De modo que si alguno está en Cristo, nueva criatura es».", "2 Corintios 5:17"],
      ["4-r3", 4, "o4", "aplicar", "Un nuevo creyente piensa que debe ganarse la aceptación de Dios. ¿Qué le enseña Romanos 3:28?", "Que es justificado por fe sin las obras de la ley", ["Que debe cumplir la ley para ser justificado", "Que debe esperar a ser perfecto", "Que Dios no justifica a nadie"], "«Concluimos, pues, que el hombre es justificado por fe sin las obras de la ley».", "Romanos 3:28"],
    ] as P[]).map(p),
    "n4-sistematica-3-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Qué recibimos por la venida del Hijo, según Gálatas 4:5?", "La adopción de hijos", ["Un nuevo templo", "Una nueva ley", "Un reino terrenal"], "«a fin de que recibiésemos la adopción de hijos».", "Gálatas 4:4-7"],
      ["5-r2", 5, "o5", "comprender", "¿Qué es la santificación posicional?", "Que en Cristo el creyente ya fue apartado para Dios por su ofrenda hecha una vez para siempre", ["Que el creyente ya no peca", "Que la santidad depende del lugar", "Que se logra al morir"], "«En esa voluntad somos santificados mediante la ofrenda del cuerpo de Jesucristo hecha una vez para siempre».", "Hebreos 10:10"],
      ["5-r3", 5, "o5", "aplicar", "Un líder se siente mal porque aún no es perfecto. ¿Qué le enseña Filipenses 3:12-14?", "Que Pablo tampoco lo había alcanzado y proseguía a la meta", ["Que debe dejar el ministerio", "Que ya debería ser perfecto", "Que la santidad no importa"], "«No que lo haya alcanzado ya, ni que ya sea perfecto; sino que prosigo».", "Filipenses 3:12-14"],
    ] as P[]).map(p),
    "n4-sistematica-3-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué no nos podrá separar del amor de Dios, según Romanos 8:39?", "Ninguna otra cosa creada", ["Solo algunas cosas", "Nada, excepto la muerte", "Nada, excepto los ángeles"], "«ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro».", "Romanos 8:38-39"],
      ["6-r2", 6, "o6", "comprender", "¿Qué enseñan los arminianos sobre la perseverancia, según la lección?", "Que el creyente puede apartarse de la fe de manera definitiva y perder la salvación", ["Que nadie puede ser salvo", "Que la salvación es por obras", "Que no hay que perseverar"], "«y recayeron, sean otra vez renovados para arrepentimiento».", "Hebreos 6:4-6"],
      ["6-r3", 6, "o6", "aplicar", "¿Qué llamado comparten las dos posiciones sobre la perseverancia, según 2 Pedro 1:10?", "Procurar hacer firme la vocación y elección", ["Dejar de preocuparse", "Vivir sin compromiso", "Buscar nuevas revelaciones"], "«Por lo cual, hermanos, tanto más procurad hacer firme vuestra vocación y elección».", "2 Pedro 1:10"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La imagen de Dios
    ["f01", 1, "o1", "recordar", "¿Cómo creó Dios al ser humano, según Génesis 1:27?", "A su imagen, varón y hembra", ["Solo al varón a su imagen", "Como un ser sin alma", "Como un ángel"], "«Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó».", "Génesis 1:26-28"],
    ["f02", 1, "o1", "recordar", "¿Qué tarea dio Dios al ser humano, según Génesis 1:28?", "Llenar la tierra y sojuzgarla", ["Destruir la tierra", "Abandonar la tierra", "Adorar a los animales"], "«llenad la tierra, y sojuzgadla».", "Génesis 1:26-28"],
    ["f03", 1, "o1", "recordar", "¿De qué formó Dios al hombre, según Génesis 2:7?", "Del polvo de la tierra, y sopló en su nariz aliento de vida", ["De la luz", "De agua y fuego", "De nada"], "«Entonces Jehová Dios formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida».", "Génesis 2:7"],
    ["f04", 1, "o1", "comprender", "¿Qué enseña Génesis 2:7 sobre el cuerpo?", "Que el cuerpo no es malo: la persona entera es obra de Dios", ["Que el cuerpo es una cárcel", "Que solo el alma importa", "Que el cuerpo no existe"], "«y fue el hombre un ser viviente».", "Génesis 2:7"],
    ["f05", 1, "o1", "recordar", "¿De qué coronó Dios al ser humano, según Salmos 8:5?", "De gloria y de honra", ["De oro y plata", "De vergüenza", "De poder sobre Dios"], "«Y lo coronaste de gloria y de honra».", "Salmos 8:4-6"],
    ["f06", 1, "o1", "comprender", "¿Qué enseña la tricotomía?", "Que el ser humano tiene tres partes: espíritu, alma y cuerpo", ["Que tiene una sola parte", "Que tiene dos partes", "Que no tiene alma"], "«y todo vuestro ser, espíritu, alma y cuerpo, sea guardado irreprensible».", "1 Tesalonicenses 5:23"],
    ["f07", 1, "o1", "comprender", "¿Qué enseña la dicotomía?", "Que el ser humano tiene dos partes: lo material y lo inmaterial", ["Que tiene tres partes", "Que no tiene cuerpo", "Que el alma muere con el cuerpo"], "«temed más bien a aquel que puede destruir el alma y el cuerpo en el infierno».", "Mateo 10:28"],
    ["f08", 1, "o1", "analizar", "¿En qué coinciden la tricotomía y la dicotomía, según la lección?", "En que la persona es una unidad que Dios quiere santificar por completo", ["En que el cuerpo es malo", "En que el alma no existe", "En que son herejías"], "«Y el mismo Dios de paz os santifique por completo».", "1 Tesalonicenses 5:23"],
    ["f09", 1, "o1", "evaluar", "¿Por qué toda persona merece respeto, según la lección?", "Porque sigue llevando la imagen de Dios, aunque el pecado la haya dañado", ["Porque todos son buenos", "Porque todos son salvos", "Porque así lo dice la ley del país"], "«que están hechos a la semejanza de Dios».", "Santiago 3:9"],
    ["f10", 1, "o7", "recordar", "Completa Romanos 5:1: Justificados, pues, por la fe…", "tenemos paz para con Dios por medio de nuestro Señor Jesucristo", ["tenemos riquezas en este mundo", "ya no tenemos que orar", "somos mejores que los demás"], "«Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo».", "Romanos 5:1"],
    // Lección 2 · El pecado
    ["f11", 2, "o2", "recordar", "¿Qué vio la mujer en el árbol, según Génesis 3:6?", "Que era bueno para comer, agradable a los ojos y codiciable para alcanzar la sabiduría", ["Que era venenoso", "Que no tenía fruto", "Que era feo"], "«y árbol codiciable para alcanzar la sabiduría».", "Génesis 3:6-8"],
    ["f12", 2, "o2", "comprender", "¿Qué hicieron Adán y Eva después de pecar, según Génesis 3:8?", "Se escondieron de la presencia de Jehová Dios", ["Buscaron a Dios", "Celebraron", "Se fueron del huerto por su cuenta"], "«y el hombre y su mujer se escondieron de la presencia de Jehová Dios».", "Génesis 3:6-8"],
    ["f13", 2, "o2", "recordar", "¿Qué pasó por la desobediencia de un hombre, según Romanos 5:19?", "Los muchos fueron constituidos pecadores", ["Nada cambió", "Solo Adán fue pecador", "Todos fueron justos"], "«Porque así como por la desobediencia de un hombre los muchos fueron constituidos pecadores».", "Romanos 5:18-19"],
    ["f14", 2, "o2", "comprender", "¿Qué es el pecado original, según la lección?", "El efecto del pecado de Adán sobre toda la humanidad", ["El primer pecado de cada persona", "Un pecado que se comete una sola vez", "Un pecado sin consecuencias"], "«como por la transgresión de uno vino la condenación a todos los hombres».", "Romanos 5:18-19"],
    ["f15", 2, "o2", "analizar", "¿Qué esperanza anuncia Romanos 5:19 junto con el pecado de Adán?", "Que por la obediencia de uno, los muchos serán constituidos justos", ["Que nadie será justo", "Que cada uno se salva solo", "Que el pecado no importa"], "«así también por la obediencia de uno, los muchos serán constituidos justos».", "Romanos 5:18-19"],
    ["f16", 2, "o2", "recordar", "¿Quién respondió a Pelagio con la Escritura?", "Agustín de Hipona", ["Martín Lutero", "Juan Wesley", "Arrio"], "«No hay quien entienda, no hay quien busque a Dios».", "Romanos 3:10-12"],
    ["f17", 2, "o2", "comprender", "¿Cómo estábamos sin Cristo, según Efesios 2:1?", "Muertos en delitos y pecados", ["Un poco enfermos", "Sanos pero confundidos", "Buenos, aunque sin religión"], "«cuando estabais muertos en vuestros delitos y pecados».", "Efesios 2:1-3"],
    ["f18", 2, "o2", "recordar", "¿Qué dice Jeremías 17:9 del corazón?", "Que es engañoso más que todas las cosas, y perverso", ["Que siempre dice la verdad", "Que es bueno por naturaleza", "Que no tiene importancia"], "«Engañoso es el corazón más que todas las cosas, y perverso».", "Jeremías 17:9"],
    ["f19", 2, "o2", "analizar", "¿Qué significa que el pecado alcanza a toda la persona, según la lección?", "Que ninguna parte del ser humano quedó libre del pecado, aunque no sea tan malo como podría ser", ["Que el ser humano es tan malo como podría ser", "Que solo el cuerpo es pecador", "Que solo la mente es pecadora"], "«y éramos por naturaleza hijos de ira, lo mismo que los demás».", "Efesios 2:1-3"],
    ["f20", 2, "o2", "evaluar", "¿Por qué la iglesia rechazó la enseñanza de Pelagio?", "Porque nadie puede salvarse sin la gracia de Dios", ["Porque era muy estricta", "Porque hablaba de la gracia", "Porque citaba la Biblia"], "«No hay justo, ni aun uno».", "Romanos 3:10-12"],
    // Lección 3 · La gracia y la elección
    ["f21", 3, "o3", "recordar", "¿Quién puede venir a Cristo, según Juan 6:44?", "Ninguno, si el Padre no le trae", ["Todos por su propio esfuerzo", "Solo los sabios", "Solo los de Israel"], "«Ninguno puede venir a mí, si el Padre que me envió no le trajere».", "Juan 6:44"],
    ["f22", 3, "o3", "recordar", "¿Cuándo nos escogió Dios en Cristo, según Efesios 1:4?", "Antes de la fundación del mundo", ["Al nacer", "Al bautizarnos", "Al morir"], "«según nos escogió en él antes de la fundación del mundo».", "Efesios 1:4-6"],
    ["f23", 3, "o3", "comprender", "¿Para qué nos escogió Dios, según Efesios 1:4-5?", "Para que fuésemos santos y sin mancha, y adoptados hijos suyos", ["Para ser famosos", "Para no tener problemas", "Para gobernar el mundo"], "«para que fuésemos santos y sin mancha delante de él, en amor habiéndonos predestinado para ser adoptados hijos suyos».", "Efesios 1:4-6"],
    ["f24", 3, "o3", "recordar", "¿Qué cadena presenta Romanos 8:30?", "Predestinó, llamó, justificó y glorificó", ["Creó, juzgó y condenó", "Llamó, olvidó y castigó", "Prometió y no cumplió"], "«Y a los que predestinó, a éstos también llamó; y a los que llamó, a éstos también justificó; y a los que justificó, a éstos también glorificó».", "Romanos 8:29-30"],
    ["f25", 3, "o3", "comprender", "¿Qué enseña el calvinismo sobre la elección?", "Que Dios elige a quienes salvará sin depender de nada en ellos", ["Que Dios elige a los que se esfuerzan más", "Que nadie es elegido", "Que todos se salvan"], "«Porque a los que antes conoció, también los predestinó».", "Romanos 8:29-30"],
    ["f26", 3, "o3", "recordar", "¿Con qué sínodo se asocia el calvinismo, según la lección?", "Con el Sínodo de Dort, en 1618 y 1619", ["Con el concilio de Nicea", "Con el concilio de Calcedonia", "Con el concilio de Jerusalén"], "«según nos escogió en él antes de la fundación del mundo».", "Efesios 1:4-6"],
    ["f27", 3, "o3", "recordar", "¿Qué quiere Dios, según 1 Timoteo 2:4?", "Que todos los hombres sean salvos y vengan al conocimiento de la verdad", ["Que solo algunos se salven", "Que nadie conozca la verdad", "Que cada uno busque su camino"], "«el cual quiere que todos los hombres sean salvos y vengan al conocimiento de la verdad».", "1 Timoteo 2:3-4"],
    ["f28", 3, "o3", "analizar", "¿Qué línea ha seguido la mayoría de las iglesias pentecostales, según la lección?", "Una línea arminiana", ["Una línea pelagiana", "Una línea arriana", "Ninguna"], "«no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento».", "2 Pedro 3:9"],
    ["f29", 3, "o3", "comprender", "¿Qué dice la declaración de fe del ministerio sobre la elección?", "No entra en la pregunta entre calvinismo y arminianismo", ["Que es calvinista", "Que la salvación es por obras", "Que nadie es elegido"], "«Porque la gracia de Dios se ha manifestado para salvación a todos los hombres».", "Tito 2:11"],
    ["f30", 3, "o3", "evaluar", "¿En qué coinciden calvinistas y arminianos evangélicos?", "En que la salvación es solo por gracia, Dios toma la iniciativa y el ser humano es responsable de creer", ["En que la salvación es por obras", "En que no hay que evangelizar", "En que Dios no elige"], "«Ninguno puede venir a mí, si el Padre que me envió no le trajere».", "Juan 6:44"],
    // Lección 4 · Conversión, regeneración y justificación
    ["f31", 4, "o4", "comprender", "¿Cuáles son las dos caras de la conversión?", "El arrepentimiento y la fe", ["El bautismo y la ofrenda", "El ayuno y la oración", "La ley y los profetas"], "«acerca del arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo».", "Hechos 20:21"],
    ["f32", 4, "o4", "recordar", "¿Qué es el que está en Cristo, según 2 Corintios 5:17?", "Una nueva criatura", ["Un religioso más", "Una persona mejorada", "Un ángel"], "«De modo que si alguno está en Cristo, nueva criatura es».", "2 Corintios 5:17"],
    ["f33", 4, "o4", "comprender", "¿Qué es la regeneración, según la lección?", "El nuevo nacimiento que obra el Espíritu y que cambia la naturaleza", ["Una decisión de mejorar", "Un rito religioso", "La declaración de un juez"], "«las cosas viejas pasaron; he aquí todas son hechas nuevas».", "2 Corintios 5:17"],
    ["f34", 4, "o4", "comprender", "¿Qué es la justificación, según la lección?", "Una declaración de Dios, como la sentencia de un juez, de que el pecador es justo", ["Un cambio gradual del carácter", "Un premio por buenas obras", "Un sentimiento de paz"], "«Concluimos, pues, que el hombre es justificado por fe sin las obras de la ley».", "Romanos 3:28"],
    ["f35", 4, "o4", "recordar", "¿Qué le fue contado a Abraham por justicia, según Romanos 4:3?", "Que creyó a Dios", ["Que se circuncidó", "Que ofreció a Isaac", "Que dio el diezmo"], "«Creyó Abraham a Dios, y le fue contado por justicia».", "Romanos 4:3-5"],
    ["f36", 4, "o4", "analizar", "¿Qué contraste hace Romanos 4:4-5?", "Al que obra se le cuenta como deuda; al que cree se le cuenta su fe por justicia", ["Que las obras y la fe son lo mismo", "Que la deuda es gracia", "Que nadie puede creer"], "«Pero al que obra, no se le cuenta el salario como gracia, sino como deuda».", "Romanos 4:3-5"],
    ["f37", 4, "o4", "recordar", "¿A quién justifica Dios, según Romanos 4:5?", "Al impío que cree", ["Al que nunca pecó", "Al que cumple la ley", "A nadie"], "«mas al que no obra, sino cree en aquel que justifica al impío, su fe le es contada por justicia».", "Romanos 4:3-5"],
    ["f38", 4, "o4", "recordar", "¿Quién redescubrió en la Reforma del siglo XVI la justificación solo por la fe?", "Martín Lutero", ["Agustín de Hipona", "Arrio", "Pelagio"], "«por cuanto por las obras de la ley nadie será justificado».", "Gálatas 2:16"],
    ["f39", 4, "o4", "comprender", "¿Qué tenemos al ser justificados por la fe, según Romanos 5:1?", "Paz para con Dios por medio de nuestro Señor Jesucristo", ["Riquezas", "Ausencia de problemas", "Ninguna tentación"], "«tenemos paz para con Dios por medio de nuestro Señor Jesucristo».", "Romanos 5:1"],
    ["f40", 4, "o4", "evaluar", "Alguien dice que se justifica a medida que mejora su conducta. ¿Qué corrige Gálatas 2:16?", "Que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo", ["Que tiene razón", "Que hay que mezclar la fe y las obras para justificarse", "Que la justificación no existe"], "«sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo».", "Gálatas 2:16"],
    // Lección 5 · La adopción y la santificación
    ["f41", 5, "o5", "recordar", "¿Qué clama el Espíritu en el corazón de los hijos, según Gálatas 4:6?", "¡Abba, Padre!", ["¡Señor, ten piedad!", "¡Santo, santo!", "¡Aleluya!"], "«Dios envió a vuestros corazones el Espíritu de su Hijo, el cual clama: ¡Abba, Padre!».", "Gálatas 4:4-7"],
    ["f42", 5, "o5", "comprender", "¿Qué cambio de identidad describe Gálatas 4:7?", "Ya no eres esclavo, sino hijo y heredero de Dios", ["De rico a pobre", "De judío a gentil", "De hijo a siervo"], "«Así que ya no eres esclavo, sino hijo; y si hijo, también heredero de Dios por medio de Cristo».", "Gálatas 4:4-7"],
    ["f43", 5, "o5", "recordar", "¿Qué amor nos ha dado el Padre, según 1 Juan 3:1?", "Que seamos llamados hijos de Dios", ["Que seamos llamados ángeles", "Que el mundo nos conozca", "Que seamos famosos"], "«Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios».", "1 Juan 3:1-2"],
    ["f44", 5, "o5", "recordar", "¿Qué seremos cuando Cristo se manifieste, según 1 Juan 3:2?", "Semejantes a él, porque le veremos tal como él es", ["Iguales a los ángeles", "Lo mismo que ahora", "Dioses"], "«seremos semejantes a él, porque le veremos tal como él es».", "1 Juan 3:1-2"],
    ["f45", 5, "o5", "comprender", "¿Qué es la santificación progresiva?", "El crecimiento diario del creyente a la imagen de Cristo", ["Algo que ocurre de una vez y para siempre", "La salvación por obras", "Un premio en el cielo"], "«prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús».", "Filipenses 3:12-14"],
    ["f46", 5, "o5", "analizar", "¿Qué une Hebreos 10:14 al decir que hizo perfectos para siempre a los santificados?", "La santificación posicional y la progresiva: ya somos santos en Cristo y estamos llegando a serlo", ["Que ya nadie peca", "Que no hay que crecer", "Que la ofrenda debe repetirse"], "«porque con una sola ofrenda hizo perfectos para siempre a los santificados».", "Hebreos 10:14"],
    ["f47", 5, "o5", "recordar", "¿Qué hacía Pablo con lo que quedaba atrás, según Filipenses 3:13?", "Lo olvidaba y se extendía a lo que estaba delante", ["Lo repetía", "Lo lamentaba siempre", "Lo escribía en un diario"], "«olvidando ciertamente lo que queda atrás, y extendiéndome a lo que está delante».", "Filipenses 3:12-14"],
    ["f48", 5, "o5", "comprender", "¿Qué enseñó Juan Wesley sobre la santificación, según la nota de la lección?", "Una perfección cristiana", ["Que la santidad no importa", "Que la santidad es por obras", "Que nadie puede crecer"], "«No que lo haya alcanzado ya, ni que ya sea perfecto».", "Filipenses 3:12-14"],
    ["f49", 5, "o5", "aplicar", "¿Cómo presenta la santificación el artículo 7 de la declaración de fe?", "Como una posición en Cristo y un crecimiento diario por el Espíritu, la Palabra, la oración y la obediencia", ["Como una sola experiencia para siempre", "Como algo que no importa", "Como un premio por obras"], "«En esa voluntad somos santificados».", "Hebreos 10:10"],
    ["f50", 5, "o5", "evaluar", "¿Cuál es la base del crecimiento en santidad del creyente, según la lección?", "La seguridad del amor del Padre: es hijo antes de ser maduro", ["El miedo al castigo", "La comparación con otros", "El esfuerzo sin gracia"], "«Amados, ahora somos hijos de Dios».", "1 Juan 3:1-2"],
    // Lección 6 · Seguridad, perseverancia y glorificación
    ["f51", 6, "o6", "recordar", "¿De qué estaba seguro Pablo, según Romanos 8:38-39?", "De que nada creado nos podrá separar del amor de Dios en Cristo", ["De que nunca sufriría", "De que sería rico", "De que no moriría"], "«Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles».", "Romanos 8:38-39"],
    ["f52", 6, "o6", "comprender", "¿En qué descansa la seguridad de la salvación, según la lección?", "En las promesas de Dios y en su amor, no en los sentimientos", ["En los sentimientos", "En las obras", "En la opinión de los demás"], "«ni ninguna otra cosa creada nos podrá separar del amor de Dios».", "Romanos 8:38-39"],
    ["f53", 6, "o6", "recordar", "¿Qué dice Jesús de sus ovejas en Juan 10:28?", "Que no perecerán jamás, ni nadie las arrebatará de su mano", ["Que algunas se perderán", "Que deben salvarse solas", "Que no las conoce"], "«y no perecerán jamás, ni nadie las arrebatará de mi mano».", "Juan 10:28-29"],
    ["f54", 6, "o6", "comprender", "¿Qué enseñan los calvinistas sobre la perseverancia?", "Que quien de verdad nació de nuevo nunca pierde la salvación", ["Que todos pierden la salvación", "Que la salvación es por obras", "Que no hay seguridad"], "«Mi Padre que me las dio, es mayor que todos».", "Juan 10:28-29"],
    ["f55", 6, "o6", "analizar", "¿Cómo leen los arminianos Hebreos 6:4-6?", "Como una advertencia de que un creyente puede apartarse de manera definitiva", ["Como un texto sobre los ángeles", "Como una promesa de riqueza", "Como un texto sin importancia"], "«y recayeron, sean otra vez renovados para arrepentimiento».", "Hebreos 6:4-6"],
    ["f56", 6, "o6", "evaluar", "¿Cuál es la posición del ministerio sobre la perseverancia?", "Es un punto de la declaración de fe por confirmar", ["Es calvinista", "Es arminiana", "No tiene importancia"], "«Por lo cual, hermanos, tanto más procurad hacer firme vuestra vocación y elección».", "2 Pedro 1:10"],
    ["f57", 6, "o6", "aplicar", "¿Qué promete 2 Pedro 1:10 a los que hacen firme su vocación y elección?", "Que no caerán jamás", ["Que serán ricos", "Que no tendrán pruebas", "Que serán famosos"], "«porque haciendo estas cosas, no caeréis jamás».", "2 Pedro 1:10"],
    ["f58", 6, "o6", "recordar", "¿Qué hizo Dios con los que justificó, según Romanos 8:30?", "Los glorificó", ["Los olvidó", "Los condenó", "Los dejó solos"], "«y a los que justificó, a éstos también glorificó».", "Romanos 8:29-30"],
    ["f59", 6, "o6", "comprender", "¿Qué es la glorificación, según la lección?", "El final de la salvación: un cuerpo glorioso y la libertad del pecado para siempre", ["Recibir fama en la iglesia", "Ser reconocido por los hombres", "Una experiencia emocional"], "«para que fuesen hechos conformes a la imagen de su Hijo».", "Romanos 8:29-30"],
    ["f60", 6, "o6", "aplicar", "Un hermano duda de su salvación. ¿Qué le recuerda primero el líder, según la lección?", "Que su seguridad descansa en Cristo y en sus promesas, no en cómo se siente", ["Que nunca podrá saberlo", "Que debe hacer más obras", "Que debe esperar una señal"], "«Mi Padre que me las dio, es mayor que todos, y nadie las puede arrebatar de la mano de mi Padre».", "Juan 10:28-29"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Sobre qué debía señorear el ser humano, según Génesis 1:26?", "Sobre los peces del mar, las aves de los cielos, las bestias y toda la tierra", ["Sobre los ángeles", "Sobre otros seres humanos", "Sobre nada"], "«y señoree en los peces del mar, en las aves de los cielos, en las bestias, en toda la tierra».", "Génesis 1:26-28"],
      ["m1-02", 1, "o1", "comprender", "¿Qué fue el hombre cuando Dios sopló en él aliento de vida?", "Un ser viviente", ["Un ángel", "Un espíritu sin cuerpo", "Un dios"], "«y fue el hombre un ser viviente».", "Génesis 2:7"],
      ["m1-03", 1, "o1", "recordar", "¿Cómo hizo Dios al hombre en relación con los ángeles, según Salmos 8:5?", "Poco menor que los ángeles", ["Mayor que los ángeles", "Igual a los ángeles", "Sin relación"], "«Le has hecho poco menor que los ángeles».", "Salmos 8:4-6"],
      ["m1-04", 1, "o1", "aplicar", "¿Cómo debe tratar el líder a una persona que vive en pecado?", "Con respeto, porque está hecha a la semejanza de Dios", ["Con desprecio", "Ignorándola", "Maldiciéndola"], "«que están hechos a la semejanza de Dios».", "Santiago 3:9"],
      ["m1-05", 1, "o1", "analizar", "¿Qué muestra que Dios creara al ser humano varón y hembra?", "Que hombre y mujer llevan por igual la imagen de Dios", ["Que solo el varón es imagen de Dios", "Que la mujer es inferior", "Que la imagen de Dios es física"], "«a imagen de Dios lo creó; varón y hembra los creó».", "Génesis 1:26-28"],
      ["m1-06", 1, "o1", "evaluar", "¿Son evangélicas la tricotomía y la dicotomía, según la lección?", "Sí, las dos son posiciones evangélicas", ["Solo la tricotomía", "Solo la dicotomía", "Ninguna"], "«y todo vuestro ser, espíritu, alma y cuerpo».", "1 Tesalonicenses 5:23"],
      ["m1-07", 2, "o2", "recordar", "¿A quién dio del fruto la mujer, según Génesis 3:6?", "A su marido, que comió así como ella", ["A la serpiente", "A sus hijos", "A nadie"], "«y dio también a su marido, el cual comió así como ella».", "Génesis 3:6-8"],
      ["m1-08", 2, "o2", "comprender", "¿Qué conocieron Adán y Eva cuando fueron abiertos sus ojos?", "Que estaban desnudos", ["Que eran dioses", "Que eran sabios", "Que eran inmortales"], "«Entonces fueron abiertos los ojos de ambos, y conocieron que estaban desnudos».", "Génesis 3:6-8"],
      ["m1-09", 2, "o2", "recordar", "¿Cuántos son justos, según Romanos 3:10?", "Ni aun uno", ["Muchos", "Los que van a la iglesia", "Los que hacen el bien"], "«No hay justo, ni aun uno».", "Romanos 3:10-12"],
      ["m1-10", 2, "o2", "comprender", "¿A quién seguíamos antes de Cristo, según Efesios 2:2?", "La corriente de este mundo y al príncipe de la potestad del aire", ["A los profetas", "A la ley de Dios", "A nadie"], "«siguiendo la corriente de este mundo, conforme al príncipe de la potestad del aire».", "Efesios 2:1-3"],
      ["m1-11", 2, "o2", "aplicar", "¿Por qué el líder no puede confiar solo en lo que siente su corazón, según Jeremías 17:9?", "Porque el corazón es engañoso más que todas las cosas", ["Porque el corazón siempre acierta", "Porque los sentimientos son malos", "Porque no tiene corazón"], "«Engañoso es el corazón más que todas las cosas».", "Jeremías 17:9"],
      ["m1-12", 2, "o2", "evaluar", "¿Cuál de estas frases resume el error de Pelagio?", "Que el ser humano puede vivir sin pecar por su propio esfuerzo", ["Que todos necesitan la gracia", "Que el pecado de Adán afectó a todos", "Que Cristo salva"], "«No hay quien haga lo bueno, no hay ni siquiera uno».", "Romanos 3:10-12"],
      ["m1-13", 3, "o3", "recordar", "¿Para qué nos predestinó Dios, según Efesios 1:5?", "Para ser adoptados hijos suyos por medio de Jesucristo", ["Para ser condenados", "Para ser ángeles", "Para no tener libertad"], "«en amor habiéndonos predestinado para ser adoptados hijos suyos por medio de Jesucristo».", "Efesios 1:4-6"],
      ["m1-14", 3, "o3", "comprender", "¿Qué es la gracia, según la lección?", "El favor de Dios que no merecemos", ["Un premio por buenas obras", "Un sentimiento", "Un rito"], "«Porque la gracia de Dios se ha manifestado para salvación a todos los hombres».", "Tito 2:11"],
      ["m1-15", 3, "o3", "recordar", "¿Para qué fueron predestinados los que Dios conoció, según Romanos 8:29?", "Para ser hechos conformes a la imagen de su Hijo", ["Para ser ricos", "Para gobernar", "Para ser profetas"], "«también los predestinó para que fuesen hechos conformes a la imagen de su Hijo».", "Romanos 8:29-30"],
      ["m1-16", 3, "o3", "aplicar", "¿Qué hace el líder con la diferencia entre calvinistas y arminianos, según la nota de la lección?", "Enseña con firmeza lo que todos comparten y trata con respeto a los que piensan distinto", ["Rompe la comunión con los que piensan distinto", "Prohíbe hablar del tema", "Obliga a todos a pensar igual"], "«el cual quiere que todos los hombres sean salvos».", "1 Timoteo 2:3-4"],
      ["m1-17", 3, "o3", "analizar", "¿Qué subrayan los arminianos de 2 Pedro 3:9?", "Que Dios es paciente, no queriendo que ninguno perezca", ["Que Dios no tiene paciencia", "Que solo algunos pueden arrepentirse", "Que nadie perece"], "«sino que es paciente para con nosotros, no queriendo que ninguno perezca».", "2 Pedro 3:9"],
      ["m1-18", 3, "o3", "evaluar", "¿Con qué teólogos se asocia la línea arminiana, según la lección?", "Con Jacobo Arminio y luego con Juan Wesley", ["Con Juan Calvino", "Con Pelagio", "Con Arrio"], "«no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento».", "2 Pedro 3:9"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué hizo Pablo con judíos y gentiles, según Hechos 20:21?", "Les testificó acerca del arrepentimiento y de la fe en Jesucristo", ["Los separó", "Les enseñó solo la ley", "No les habló"], "«testificando a judíos y a gentiles acerca del arrepentimiento para con Dios».", "Hechos 20:21"],
      ["m2-02", 4, "o4", "comprender", "¿Qué pasó con las cosas viejas del que está en Cristo, según 2 Corintios 5:17?", "Pasaron, y todas son hechas nuevas", ["Siguen igual", "Se mejoraron un poco", "Se esconden"], "«las cosas viejas pasaron; he aquí todas son hechas nuevas».", "2 Corintios 5:17"],
      ["m2-03", 4, "o4", "recordar", "¿Cómo es justificado el hombre, según Romanos 3:28?", "Por fe sin las obras de la ley", ["Por las obras de la ley", "Por la fe y la circuncisión", "Por los sacrificios"], "«el hombre es justificado por fe sin las obras de la ley».", "Romanos 3:28"],
      ["m2-04", 4, "o4", "aplicar", "Al explicar la justificación, ¿qué imagen usa la lección?", "La sentencia de un juez que declara justo al pecador", ["Un médico que cura poco a poco", "Un maestro que enseña", "Un rey que conquista"], "«mas al que no obra, sino cree en aquel que justifica al impío».", "Romanos 4:3-5"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué la justificación es tan importante para la paz del creyente?", "Porque al ser declarado justo por la fe, tiene paz para con Dios", ["Porque depende de su conducta diaria", "Porque lo hace sentir mejor", "Porque lo libra de toda prueba"], "«Justificados, pues, por la fe, tenemos paz para con Dios».", "Romanos 5:1"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuál de estas afirmaciones es correcta?", "La regeneración cambia la naturaleza y la justificación cambia la posición ante Dios", ["La justificación cambia la naturaleza", "La regeneración es una declaración legal", "Las dos son por obras"], "«De modo que si alguno está en Cristo, nueva criatura es».", "2 Corintios 5:17"],
      ["m2-07", 5, "o5", "recordar", "¿Cuándo envió Dios a su Hijo, según Gálatas 4:4?", "Cuando vino el cumplimiento del tiempo", ["Al principio de la creación", "En el tiempo de Moisés", "Nunca"], "«Pero cuando vino el cumplimiento del tiempo, Dios envió a su Hijo».", "Gálatas 4:4-7"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué el mundo no conoce a los hijos de Dios, según 1 Juan 3:1?", "Porque no le conoció a él", ["Porque los hijos se esconden", "Porque son pocos", "Porque no existen"], "«por esto el mundo no nos conoce, porque no le conoció a él».", "1 Juan 3:1-2"],
      ["m2-09", 5, "o5", "recordar", "¿Cómo somos santificados, según Hebreos 10:10?", "Mediante la ofrenda del cuerpo de Jesucristo hecha una vez para siempre", ["Mediante nuestros sacrificios", "Mediante el templo", "Mediante la ley"], "«somos santificados mediante la ofrenda del cuerpo de Jesucristo hecha una vez para siempre».", "Hebreos 10:10"],
      ["m2-10", 5, "o5", "aplicar", "¿Qué aprende el líder de que Pablo prosiguiera a la meta?", "Que el crecimiento en santidad dura toda la vida", ["Que la meta se alcanza pronto", "Que no hay que esforzarse", "Que la santidad es solo para Pablo"], "«prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús».", "Filipenses 3:12-14"],
      ["m2-11", 5, "o5", "analizar", "¿Qué es la santificación final?", "Ser semejantes a Cristo cuando él se manifieste", ["Ser perfectos desde la conversión", "Ser reconocidos por la iglesia", "Tener todos los dones"], "«pero sabemos que cuando él se manifieste, seremos semejantes a él».", "1 Juan 3:1-2"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué hablan algunas iglesias pentecostales de tradición de santidad, según la nota de la lección?", "De una santificación completa como una experiencia definida", ["De que la santidad no importa", "De la salvación por obras", "De que nadie puede ser santo"], "«No que lo haya alcanzado ya».", "Filipenses 3:12-14"],
      ["m2-13", 6, "o6", "recordar", "¿Quién es mayor que todos, según Juan 10:29?", "El Padre que dio las ovejas a Cristo", ["Los apóstoles", "Los ángeles", "El creyente"], "«Mi Padre que me las dio, es mayor que todos».", "Juan 10:28-29"],
      ["m2-14", 6, "o6", "comprender", "¿Qué habían gustado los que recayeron, según Hebreos 6:4-5?", "El don celestial y la buena palabra de Dios", ["Solo la ley", "Nada espiritual", "Las riquezas"], "«y gustaron del don celestial».", "Hebreos 6:4-6"],
      ["m2-15", 6, "o6", "recordar", "¿Qué nombra Pablo entre lo que no nos separa del amor de Dios?", "La muerte, la vida, los ángeles, los principados y las potestades", ["Solo el pecado", "Solo la iglesia", "Solo la ley"], "«ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades».", "Romanos 8:38-39"],
      ["m2-16", 6, "o6", "aplicar", "¿Cómo acompaña el líder a un hermano que duda, según la lección?", "Le muestra las promesas de Cristo y lo anima a permanecer firme", ["Le dice que nunca sabrá si es salvo", "Le pide más obras", "Lo deja solo"], "«porque haciendo estas cosas, no caeréis jamás».", "2 Pedro 1:10"],
      ["m2-17", 6, "o6", "analizar", "¿En qué coinciden las dos posiciones sobre la perseverancia, según la nota?", "En que la seguridad descansa en Cristo y en que hay que permanecer firme", ["En que la salvación es por obras", "En que nadie puede estar seguro", "En que no hay que perseverar"], "«procurad hacer firme vuestra vocación y elección».", "2 Pedro 1:10"],
      ["m2-18", 6, "o6", "evaluar", "¿Cuál es el último eslabón de la cadena de Romanos 8:30?", "La glorificación", ["La justificación", "El llamado", "La predestinación"], "«y a los que justificó, a éstos también glorificó».", "Romanos 8:29-30"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "n4-sistematica-3-e1",
      tipo: "corta",
      pregunta: "Explica qué significa que el ser humano fue creado a imagen de Dios y por qué eso importa en el ministerio.",
      ideas: [
        { id: "imagen", peso: 30, texto: "Creado a imagen y semejanza de Dios, varón y hembra.", formas: ["a su imagen", "imagen de dios", "semejanza", "varon y hembra"] },
        { id: "significa", peso: 30, texto: "Puede conocer a Dios, amar, razonar, decidir y gobernar la creación.", formas: ["conocer a dios", "razonar", "decidir", "gobernar", "representante", "senoree", "amar"] },
        { id: "respeto", peso: 30, texto: "Toda persona merece respeto y dignidad.", formas: ["respeto", "dignidad", "merece", "no maldecir", "valor"] },
      ],
      citas: ["Génesis 1:26-28", "Génesis 1:26", "Génesis 1:27", "Génesis 2:7", "Salmos 8:4-6", "Santiago 3:9"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Dios creó al ser humano a su imagen y semejanza, varón y hembra (Génesis 1:27). Eso significa que puede conocer a Dios, amar, razonar, decidir y gobernar la creación como su representante. En el ministerio importa porque toda persona merece respeto y dignidad, aun la que está lejos de Dios, como enseña Santiago 3:9.",
    },
    {
      id: "n4-sistematica-3-e2",
      tipo: "corta",
      pregunta: "Explica qué es la justificación por la fe y en qué se diferencia de la regeneración.",
      ideas: [
        { id: "declaracion", peso: 30, texto: "La justificación es una declaración de Dios: el pecador es declarado justo.", formas: ["declara", "declarado justo", "sentencia", "juez", "posicion"] },
        { id: "fe", peso: 30, texto: "Por la fe, sin las obras de la ley.", formas: ["por la fe", "por fe", "sin las obras", "no por obras", "creyo abraham"] },
        { id: "regeneracion", peso: 30, texto: "La regeneración es el nuevo nacimiento: cambia la naturaleza.", formas: ["regenera*", "nuevo nacimiento", "nueva criatura", "naturaleza", "nacer de nuevo"] },
      ],
      citas: ["Romanos 3:28", "Romanos 4:3-5", "Romanos 4:3", "Romanos 5:1", "Gálatas 2:16", "2 Corintios 5:17"],
      pesoCita: 10,
      errores: [{ id: "por_obras", anula: "fe", texto: "La justificación no es por obras: es por la fe sin las obras de la ley (Romanos 3:28).", formas: ["por las obras", "por nuestras obras", "por buenas obras"] }],
      modelo:
        "La justificación es una declaración de Dios, como la sentencia de un juez: el pecador que cree es declarado justo. Es por la fe sin las obras de la ley (Romanos 3:28), como Abraham, que creyó a Dios. La regeneración es distinta: es el nuevo nacimiento que obra el Espíritu y que cambia la naturaleza.",
    },
    {
      id: "n4-sistematica-3-e3",
      tipo: "corta",
      pregunta: "Explica con respeto las dos posiciones evangélicas sobre la elección y en qué coinciden.",
      ideas: [
        { id: "calvinismo", peso: 30, texto: "El calvinismo: Dios elige sin depender de nada en el ser humano.", formas: ["calvin*", "sin depender", "eleccion incondicional", "dort"] },
        { id: "arminianismo", peso: 30, texto: "El arminianismo: Dios da a todos una gracia que permite responder y elige a los que sabe que creerán.", formas: ["arminian*", "arminio", "wesley", "permite responder", "sabe que creeran", "presciencia"] },
        { id: "coinciden", peso: 30, texto: "Coinciden: solo por gracia, Dios toma la iniciativa y el ser humano es responsable de creer.", formas: ["solo por gracia", "por gracia", "iniciativa", "responsable", "coinciden"] },
      ],
      citas: ["Efesios 1:4-6", "Efesios 1:4", "Romanos 8:29-30", "Juan 6:44", "1 Timoteo 2:4", "2 Pedro 3:9", "Tito 2:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "El calvinismo enseña que Dios elige sin depender de nada en el ser humano (Efesios 1:4). El arminianismo, de Arminio y Wesley, enseña que Dios da a todos una gracia que les permite responder. Las dos coinciden: la salvación es solo por gracia, Dios toma la iniciativa y el ser humano es responsable de creer.",
    },
    {
      id: "n4-sistematica-3-e4",
      tipo: "breve",
      pregunta:
        "Explica a un grupo de maestros de tu iglesia la doctrina del pecado: su origen, el pecado original, el error de Pelagio y el alcance del pecado en el ser humano, con citas bíblicas.",
      ideas: [
        { id: "origen", peso: 20, texto: "El origen: la desobediencia de Adán y Eva en el huerto.", formas: ["adan", "eva", "huerto", "desobediencia", "genesis 3"] },
        { id: "original", peso: 25, texto: "El pecado original: por un hombre los muchos fueron constituidos pecadores.", formas: ["pecado original", "por un hombre", "constituidos pecadores", "toda la humanidad"] },
        { id: "pelagio", peso: 20, texto: "Pelagio negó el pecado original y la necesidad de la gracia; Agustín le respondió.", formas: ["pelagio", "agustin", "propio esfuerzo"] },
        { id: "alcance", peso: 20, texto: "El alcance: no hay justo, muertos en delitos y pecados, ninguna parte quedó libre.", formas: ["no hay justo", "muertos en", "toda la persona", "ninguna parte", "engañoso", "enganoso"] },
        { id: "esperanza", peso: 15, texto: "La esperanza: por la obediencia de Cristo, los muchos serán justos; se necesita la gracia.", formas: ["obediencia de uno", "seran constituidos justos", "gracia", "cristo"] },
      ],
      basta: 85,
      citas: ["Génesis 3:6-8", "Romanos 5:12", "Romanos 5:18-19", "Romanos 5:19", "Romanos 3:10-12", "Romanos 3:23", "Efesios 2:1-3", "Jeremías 17:9", "1 Juan 3:4", "Santiago 4:17"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Hermanos, el pecado entró en el mundo por la desobediencia de Adán y Eva en el huerto: vieron el árbol codiciable, comieron y se escondieron de la presencia de Dios. Desde entonces el pecado es infracción de la ley y también omisión del bien. Pablo enseña el pecado original: por la desobediencia de un hombre los muchos fueron constituidos pecadores (Romanos 5:19), es decir, el pecado de Adán afectó a toda la humanidad. A comienzos del siglo V, Pelagio negó esto y enseñó que el ser humano podía vivir sin pecar por su propio esfuerzo; Agustín le respondió con la Escritura, y la iglesia lo rechazó. El alcance del pecado es total: no hay justo, ni aun uno (Romanos 3:10), y sin Cristo estábamos muertos en delitos y pecados. No significa que seamos tan malos como podríamos ser, sino que ninguna parte de nosotros quedó libre. Por eso la esperanza está en Cristo: por la obediencia de uno, los muchos serán constituidos justos. Nadie se salva sin la gracia de Dios.",
    },
    {
      id: "n4-sistematica-3-e5",
      tipo: "breve",
      pregunta:
        "Un hermano te pregunta si puede perder la salvación. Explícale con respeto las dos posiciones evangélicas sobre la perseverancia, lo que el ministerio todavía debe confirmar y en qué descansa su seguridad, con citas bíblicas.",
      ideas: [
        { id: "calvinista", peso: 25, texto: "Los calvinistas: quien nació de nuevo nunca la pierde.", formas: ["calvin*", "nunca la pierde", "no perecera", "no pereceran", "nadie las arrebatara", "perseverancia de los santos"] },
        { id: "arminiana", peso: 25, texto: "Los arminianos: puede perderla quien se aparta de manera definitiva.", formas: ["arminian*", "asambleas de dios", "apartarse", "se aparta", "recayeron", "perderla"] },
        { id: "confirmar", peso: 20, texto: "La posición del ministerio está por confirmar.", formas: ["por confirmar", "el ministerio", "declaracion de fe"] },
        { id: "seguridad", peso: 20, texto: "La seguridad descansa en Cristo y en sus promesas, no en los sentimientos.", formas: ["promesas", "no en los sentimientos", "en cristo", "amor de dios", "nada nos podra separar", "seguridad"] },
        { id: "firmes", peso: 10, texto: "Permanecer firmes.", formas: ["firme", "permanecer", "persever*"] },
      ],
      basta: 85,
      citas: ["Juan 10:28-29", "Juan 10:28", "Hebreos 6:4-6", "Hebreos 3:12-14", "2 Pedro 1:10", "Romanos 8:38-39", "1 Juan 5:13", "Filipenses 1:6"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Querido hermano, es una pregunta en la que los evangélicos difieren. Los calvinistas enseñan la perseverancia de los santos: quien de verdad nació de nuevo nunca pierde la salvación, porque Jesús dijo de sus ovejas que no perecerán jamás, ni nadie las arrebatará de su mano (Juan 10:28). Los arminianos, como las Asambleas de Dios, enseñan que el creyente puede apartarse de la fe de manera definitiva y perderla, y leen así la advertencia de Hebreos 6:4-6 sobre los que recayeron. Nuestro ministerio todavía debe confirmar su posición en la declaración de fe. Pero las dos posiciones coinciden en lo que más te importa hoy: tu seguridad descansa en Cristo y en sus promesas, no en lo que sientes, porque nada nos podrá separar del amor de Dios que es en Cristo Jesús (Romanos 8:38-39). Y las dos te llaman a lo mismo: a permanecer firme y a hacer firme tu vocación y elección, como dice 2 Pedro 1:10.",
    },
  ],
  breve: {
    id: "n4-sistematica-3-b1",
    tipo: "breve",
    pregunta:
      "Escribe cómo enseñarías la salvación a un grupo de nuevos líderes, desde el pecado hasta la glorificación: qué hace Dios, qué responde el ser humano y qué verdades no pueden faltar, con citas bíblicas.",
    ideas: [
      { id: "pecado", peso: 15, texto: "El punto de partida: todos pecaron.", formas: ["todos pecaron", "no hay justo", "pecado", "muertos en"] },
      { id: "gracia", peso: 20, texto: "La gracia de Dios toma la iniciativa.", formas: ["gracia", "iniciativa", "el padre le trae", "si el padre"] },
      { id: "respuesta", peso: 15, texto: "La respuesta humana: arrepentimiento y fe.", formas: ["arrepent*", "arrepient*", "arrepint*", "fe en", "creer", "cree en", "se convierte", "convertirse"] },
      { id: "obra", peso: 30, texto: "La obra de Dios: regeneración, justificación, adopción y santificación.", formas: ["regenera*", "justifica*", "adopcion", "adoptados", "santifica*", "nueva criatura"] },
      { id: "final", peso: 20, texto: "La seguridad y la glorificación.", formas: ["glorifica*", "semejantes a el", "seguridad", "nada nos podra separar", "paz para con dios"] },
    ],
    basta: 85,
    citas: ["Romanos 5:1", "Romanos 3:23", "Romanos 3:10-12", "Efesios 2:1-3", "Tito 2:11", "Juan 6:44", "Hechos 20:21", "2 Corintios 5:17", "Romanos 3:28", "Gálatas 4:4-7", "Hebreos 10:10", "Filipenses 3:12-14", "Romanos 8:29-30", "Romanos 8:38-39", "1 Juan 3:2"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Empezaría por el pecado: no hay justo, ni aun uno (Romanos 3:10), y sin Cristo estábamos muertos en delitos y pecados. Por eso la salvación empieza en Dios: su gracia se ha manifestado para salvación a todos los hombres (Tito 2:11), y nadie viene a Cristo si el Padre no lo trae. El ser humano responde con arrepentimiento para con Dios y fe en Jesucristo. Entonces Dios obra: lo regenera, y es una nueva criatura; lo justifica, y lo declara justo por la fe sin las obras de la ley; lo adopta como hijo y heredero; y lo santifica, porque ya fue apartado por la ofrenda de Cristo y crece cada día. Justificados por la fe, tenemos paz para con Dios (Romanos 5:1). El creyente tiene seguridad, porque nada lo podrá separar del amor de Dios, y espera la glorificación, cuando seremos semejantes a Cristo. No pueden faltar dos verdades: que todo es por gracia, y que el creyente es llamado a permanecer firme.",
  },
};
