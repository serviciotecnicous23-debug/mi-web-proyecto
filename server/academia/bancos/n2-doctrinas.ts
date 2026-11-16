/**
 * El banco de «Doctrinas fundamentales» (Nivel 2). SOLO SERVIDOR: respuestas y claves de corrección.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 la Biblia, el Dios trino y Jesucristo · o2 el pecado y la salvación · o3 el Espíritu Santo, su bautismo,
 * sus dones y la sanidad · o4 la santidad, las ordenanzas, la iglesia, el ministerio, la familia y la esperanza ·
 * o5 el versículo de memoria (2 Timoteo 1:13). En los puntos por confirmar de la declaración, las preguntas solo piden
 * reconocer que están por confirmar o cuáles son las posiciones, nunca elegir una.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `n2-doctrinas-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_N2_DOCTRINAS: BancoMateria = {
  materia: "n2-doctrinas",
  repaso: {
    "n2-doctrinas-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dice 2 Timoteo 3:16 de toda la Escritura?", "Que es inspirada por Dios", ["Que la escribieron solo los apóstoles", "Que es una buena tradición humana", "Que solo sirve para los sacerdotes"], "«Toda la Escritura es inspirada por Dios, y útil para enseñar».", "2 Timoteo 3:16-17"],
      ["1-r2", 1, "o1", "comprender", "¿Qué enseña la iglesia sobre Dios, según la declaración de fe?", "Que hay un solo Dios, que existe eternamente en tres personas", ["Que hay tres dioses", "Que Dios es una sola persona con tres nombres", "Que Jesús es un dios menor"], "«bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo».", "Mateo 28:19"],
      ["1-r3", 1, "o1", "aplicar", "Un amigo dice que la Biblia es solo un libro humano. ¿Qué responde 2 Pedro 1:21?", "Que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo", ["Que tiene razón", "Que la escribieron los ángeles", "Que solo el Nuevo Testamento es de Dios"], "«sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo».", "2 Pedro 1:20-21"],
    ] as P[]).map(p),
    "n2-doctrinas-2": ([
      ["2-r1", 2, "o1", "recordar", "¿Qué dice Juan 1:14 del Verbo?", "Que fue hecho carne y habitó entre nosotros", ["Que nunca fue hombre", "Que fue un ángel", "Que vino solo en espíritu"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["2-r2", 2, "o1", "comprender", "¿Qué significa que Jesucristo es verdadero Dios y verdadero hombre?", "Que es el Hijo eterno de Dios y se hizo hombre, en una sola persona", ["Que fue un hombre que llegó a ser Dios", "Que es mitad Dios y mitad hombre", "Que solo parecía hombre"], "«En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios».", "Juan 1:1"],
      ["2-r3", 2, "o1", "aplicar", "¿Qué consuelo da Hebreos 4:15 al creyente tentado?", "Que Cristo fue tentado en todo, pero sin pecado, y puede compadecerse de él", ["Que Cristo nunca fue tentado", "Que la tentación es pecado", "Que debe vencer solo"], "«sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado».", "Hebreos 4:15"],
    ] as P[]).map(p),
    "n2-doctrinas-3": ([
      ["3-r1", 3, "o2", "recordar", "¿Cuántos pecaron, según Romanos 3:23?", "Todos", ["Solo los malos", "Casi todos", "Solo los que no van a la iglesia"], "«por cuanto todos pecaron, y están destituidos de la gloria de Dios».", "Romanos 3:23"],
      ["3-r2", 3, "o2", "comprender", "¿Cómo se recibe la salvación, según Efesios 2:8-9?", "Por gracia, por medio de la fe, y no por obras", ["Por las buenas obras", "Por ir a la iglesia", "Por el bautismo solamente"], "«Porque por gracia sois salvos por medio de la fe».", "Efesios 2:8-9"],
      ["3-r3", 3, "o2", "aplicar", "¿Qué punto de la salvación queda por confirmar en la declaración de fe?", "Si el que se aparta de la fe de manera definitiva puede perder la salvación", ["Si la salvación es por gracia", "Si hay que nacer de nuevo", "Si Jesús murió por nuestros pecados"], "«y yo les doy vida eterna; y no perecerán jamás».", "Juan 10:28-29"],
    ] as P[]).map(p),
    "n2-doctrinas-4": ([
      ["4-r1", 4, "o3", "recordar", "¿Qué prometió Jesús en Hechos 1:8?", "Poder, cuando viniera sobre ellos el Espíritu Santo, para ser sus testigos", ["Riquezas para la iglesia", "Un reino terrenal inmediato", "Que nunca sufrirían"], "«pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo».", "Hechos 1:8"],
      ["4-r2", 4, "o3", "comprender", "¿Para qué da Dios los dones del Espíritu, según la declaración de fe?", "Para edificar a la iglesia y alcanzar al mundo", ["Para que algunos se sientan superiores", "Para entretener a la iglesia", "Para reemplazar la Palabra"], "«Pero a cada uno le es dada la manifestación del Espíritu para provecho».", "1 Corintios 12:7"],
      ["4-r3", 4, "o3", "aplicar", "Un hermano enfermo pregunta si buscar la sanidad de Dios significa dejar al médico. ¿Qué dice la declaración de fe?", "Que buscar la sanidad de Dios no se opone a recibir atención médica", ["Que debe dejar al médico", "Que Dios ya no sana", "Que no debe orar"], "«Llame a los ancianos de la iglesia, y oren por él».", "Santiago 5:14-15"],
    ] as P[]).map(p),
    "n2-doctrinas-5": ([
      ["5-r1", 5, "o4", "recordar", "¿Cuál es la voluntad de Dios, según 1 Tesalonicenses 4:3?", "Nuestra santificación", ["Nuestra riqueza", "Nuestra fama", "Nuestro descanso"], "«pues la voluntad de Dios es vuestra santificación».", "1 Tesalonicenses 4:3"],
      ["5-r2", 5, "o4", "comprender", "¿Qué representa el bautismo en agua, según Romanos 6:4?", "Que morimos al pecado y resucitamos para andar en vida nueva", ["Que el agua lava los pecados", "Que ya no podemos pecar", "Que entramos a una familia de sangre"], "«a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva».", "Romanos 6:4"],
      ["5-r3", 5, "o4", "aplicar", "¿Qué debe hacer el creyente antes de tomar la Santa Cena, según 1 Corintios 11:28?", "Probarse a sí mismo", ["Ayunar tres días", "Pedir permiso al gobierno", "Nada"], "«Por tanto, pruébese cada uno a sí mismo, y coma así del pan».", "1 Corintios 11:28"],
    ] as P[]).map(p),
    "n2-doctrinas-6": ([
      ["6-r1", 6, "o4", "recordar", "¿Cómo volverá Jesús, según Hechos 1:11?", "Así como lo vieron ir al cielo", ["En secreto, sin que nadie lo vea", "Solo en espíritu", "Nunca volverá"], "«así vendrá como le habéis visto ir al cielo».", "Hechos 1:11"],
      ["6-r2", 6, "o4", "comprender", "¿Qué dice la declaración de fe sobre el matrimonio?", "Que Dios lo instituyó entre un hombre y una mujer, como un pacto para toda la vida", ["Que es un contrato que se renueva cada año", "Que no tiene importancia para Dios", "Que lo inventó el gobierno"], "«y se unirá a su mujer, y serán una sola carne».", "Génesis 2:24"],
      ["6-r3", 6, "o4", "aplicar", "¿Qué punto de los últimos tiempos queda por confirmar en la declaración de fe?", "El orden de los acontecimientos: el arrebatamiento antes de la tribulación y el reino de mil años", ["Si Cristo vuelve", "Si habrá un juicio final", "Si los muertos en Cristo resucitarán"], "«y así estaremos siempre con el Señor».", "1 Tesalonicenses 4:16-17"],
    ] as P[]).map(p),
  },
  final: ([
    // Lección 1 · La Biblia y el Dios trino
    ["f01", 1, "o1", "recordar", "¿Para qué es útil la Escritura, según 2 Timoteo 3:16?", "Para enseñar, redargüir, corregir e instruir en justicia", ["Para adivinar el futuro", "Para ganar discusiones", "Para nada práctico"], "«y útil para enseñar, para redargüir, para corregir, para instruir en justicia».", "2 Timoteo 3:16-17"],
    ["f02", 1, "o1", "comprender", "¿Qué significa que la Biblia es suficiente, según la declaración de fe?", "Que basta para la fe y la conducta", ["Que no hace falta leerla", "Que se le pueden agregar nuevas revelaciones con la misma autoridad", "Que solo sirve para los nuevos creyentes"], "«a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra».", "2 Timoteo 3:16-17"],
    ["f03", 1, "o1", "recordar", "¿Cómo llegó la profecía de la Escritura, según 2 Pedro 1:21?", "Los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo", ["Por voluntad humana", "Por un concilio de sabios", "Por casualidad"], "«porque nunca la profecía fue traída por voluntad humana».", "2 Pedro 1:20-21"],
    ["f04", 1, "o1", "recordar", "¿Qué confesaba Israel en Deuteronomio 6:4?", "Jehová nuestro Dios, Jehová uno es", ["Hay muchos dioses", "Cada pueblo tiene su dios", "Dios está lejos"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
    ["f05", 1, "o1", "comprender", "¿En qué nombre mandó Jesús bautizar, según Mateo 28:19?", "En el nombre del Padre, y del Hijo, y del Espíritu Santo", ["Solo en el nombre del Padre", "En el nombre de los apóstoles", "En el nombre de la iglesia"], "«bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo».", "Mateo 28:19"],
    ["f06", 1, "o1", "analizar", "¿Qué error corrige la doctrina de la Trinidad?", "Pensar que son tres dioses, o que Dios es una sola persona con tres nombres", ["Pensar que Dios existe", "Pensar que Dios es santo", "Pensar que Dios es Creador"], "«La gracia del Señor Jesucristo, el amor de Dios, y la comunión del Espíritu Santo».", "2 Corintios 13:14"],
    ["f07", 1, "o1", "aplicar", "Un nuevo creyente pregunta qué tiene la última palabra cuando una enseñanza le parece dudosa. ¿Qué dice la declaración de fe?", "La Biblia, que es la autoridad final de lo que creemos y hacemos", ["Lo que diga la mayoría", "Lo que sienta en el momento", "Lo que diga cualquier predicador famoso"], "«Toda la Escritura es inspirada por Dios».", "2 Timoteo 3:16-17"],
    ["f08", 1, "o5", "recordar", "Completa 2 Timoteo 1:13: Retén la forma de las sanas palabras que de mí oíste…", "en la fe y amor que es en Cristo Jesús", ["en la ley y los profetas de Israel", "en el poder y la gloria de los reyes", "en la sabiduría de los griegos"], "«Retén la forma de las sanas palabras que de mí oíste, en la fe y amor que es en Cristo Jesús».", "2 Timoteo 1:13"],
    // Lección 2 · Jesucristo
    ["f09", 2, "o1", "recordar", "¿Qué dice Juan 1:1 del Verbo?", "Que era Dios", ["Que fue creado al principio", "Que era un ángel", "Que era solo una idea"], "«y el Verbo era Dios».", "Juan 1:1"],
    ["f10", 2, "o1", "recordar", "¿De quién era lo que estaba engendrado en María, según Mateo 1:20?", "Del Espíritu Santo", ["De José", "De un ángel", "De un rey"], "«porque lo que en ella es engendrado, del Espíritu Santo es».", "Mateo 1:20-23"],
    ["f11", 2, "o1", "comprender", "¿Por qué se llama Jesús, según Mateo 1:21?", "Porque él salvará a su pueblo de sus pecados", ["Porque era un nombre de reyes", "Porque así se llamaba su abuelo", "Porque sería un gran maestro"], "«porque él salvará a su pueblo de sus pecados».", "Mateo 1:20-23"],
    ["f12", 2, "o1", "recordar", "¿Qué significa Emanuel?", "Dios con nosotros", ["Dios lejos", "Hijo de David", "Rey de Israel"], "«Emanuel, que traducido es: Dios con nosotros».", "Mateo 1:20-23"],
    ["f13", 2, "o1", "comprender", "¿Qué dice Hebreos 4:15 de la vida de Jesús?", "Que fue tentado en todo, pero sin pecado", ["Que nunca fue tentado", "Que pecó como todos", "Que no conoció la debilidad humana"], "«fue tentado en todo según nuestra semejanza, pero sin pecado».", "Hebreos 4:15"],
    ["f14", 2, "o1", "recordar", "¿Qué enseñó Pablo como lo primero, según 1 Corintios 15:3-4?", "Que Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día", ["Que Cristo fue un buen ejemplo", "Que hay que guardar la ley para salvarse", "Que la resurrección es un símbolo"], "«Que Cristo murió por nuestros pecados, conforme a las Escrituras».", "1 Corintios 15:3-4"],
    ["f15", 2, "o1", "analizar", "¿Por qué importa que Jesús resucitara corporalmente?", "Porque confirma que su muerte en nuestro lugar fue aceptada y que venció a la muerte", ["Porque así lo creían los romanos", "Porque no importa: es un símbolo", "Porque así empezó una religión nueva"], "«y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras».", "1 Corintios 15:3-4"],
    ["f16", 2, "o1", "aplicar", "Alguien dice que Jesús fue solo un buen maestro. ¿Qué responde la declaración de fe?", "Que es el Hijo eterno de Dios, verdadero Dios y verdadero hombre", ["Que tiene razón", "Que fue solo un profeta", "Que fue un ángel"], "«Y aquel Verbo fue hecho carne».", "Juan 1:14"],
    // Lección 3 · El pecado y la salvación
    ["f17", 3, "o2", "recordar", "¿Cómo creó Dios al ser humano, según Génesis 1:27?", "A su imagen, varón y hembra", ["Como un animal más", "Sin ninguna dignidad", "Solo al varón a su imagen"], "«Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó».", "Génesis 1:27"],
    ["f18", 3, "o2", "recordar", "¿Cómo entró el pecado en el mundo, según Romanos 5:12?", "Por un hombre, y por el pecado la muerte", ["Por los animales", "Por los ángeles buenos", "Por Dios"], "«como el pecado entró en el mundo por un hombre, y por el pecado la muerte».", "Romanos 5:12"],
    ["f19", 3, "o2", "comprender", "¿Puede el ser humano salvarse a sí mismo, según la declaración de fe?", "No: está separado de Dios y necesita la salvación que Dios da", ["Sí, con buenas obras", "Sí, si se esfuerza", "Sí, si va a la iglesia"], "«por cuanto todos pecaron, y están destituidos de la gloria de Dios».", "Romanos 3:23"],
    ["f20", 3, "o2", "recordar", "¿De quién es la salvación, según Efesios 2:8?", "Es don de Dios", ["Es mérito nuestro", "Es premio por buenas obras", "Es de los que nacen en una familia cristiana"], "«y esto no de vosotros, pues es don de Dios».", "Efesios 2:8-9"],
    ["f21", 3, "o2", "comprender", "¿Por qué la salvación no es por obras, según Efesios 2:9?", "Para que nadie se gloríe", ["Porque las obras están prohibidas", "Porque Dios no ve las obras", "Porque las obras no existen"], "«no por obras, para que nadie se gloríe».", "Efesios 2:8-9"],
    ["f22", 3, "o2", "recordar", "¿Qué dijo Jesús a Nicodemo en Juan 3:3?", "Que el que no naciere de nuevo, no puede ver el reino de Dios", ["Que bastaba con ser buen judío", "Que el reino de Dios es solo para sacerdotes", "Que todos verán el reino"], "«el que no naciere de nuevo, no puede ver el reino de Dios».", "Juan 3:3"],
    ["f23", 3, "o2", "analizar", "¿En qué se apoya la seguridad de la salvación, según 1 Juan 5:13?", "En lo que Dios escribió: para que sepamos que tenemos vida eterna", ["En los sentimientos de cada día", "En las buenas obras", "En la opinión de los demás"], "«para que sepáis que tenéis vida eterna».", "1 Juan 5:11-13"],
    ["f24", 3, "o2", "comprender", "¿Qué enseñan sobre la perseverancia los que dicen que el creyente puede perder la salvación?", "Que el que se aparta de la fe de manera definitiva la puede perder, y citan advertencias como Hebreos 3:12", ["Que nadie puede ser salvo", "Que la salvación es por obras", "Que no hace falta creer"], "«Mirad, hermanos, que no haya en ninguno de vosotros corazón malo de incredulidad para apartarse del Dios vivo».", "Hebreos 3:12-14"],
    // Lección 4 · El Espíritu Santo, su bautismo, sus dones y la sanidad
    ["f25", 4, "o3", "comprender", "¿Qué es el Espíritu Santo, según la declaración de fe?", "Una persona divina", ["Una fuerza impersonal", "Un ángel", "Un sentimiento"], "«Pero yo os digo la verdad: Os conviene que yo me vaya; porque si no me fuera, el Consolador no vendría a vosotros».", "Juan 16:7-8"],
    ["f26", 4, "o3", "recordar", "¿De qué convence el Espíritu Santo al mundo, según Juan 16:8?", "De pecado, de justicia y de juicio", ["De riqueza y fama", "De la ley de Moisés", "De nada"], "«convencerá al mundo de pecado, de justicia y de juicio».", "Juan 16:7-8"],
    ["f27", 4, "o3", "recordar", "¿Qué da testimonio el Espíritu a nuestro espíritu, según Romanos 8:16?", "De que somos hijos de Dios", ["De que somos mejores que otros", "De que nunca pecaremos", "De que somos ángeles"], "«El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».", "Romanos 8:16"],
    ["f28", 4, "o3", "comprender", "¿Para qué es el bautismo en el Espíritu Santo, según la declaración de fe?", "Para dar poder para testificar y servir", ["Para salvar al que no cree", "Para reemplazar el nuevo nacimiento", "Para hacer famoso al creyente"], "«y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra».", "Hechos 1:8"],
    ["f29", 4, "o3", "recordar", "¿Qué pasó en Pentecostés, según Hechos 2:4?", "Fueron todos llenos del Espíritu Santo y comenzaron a hablar en otras lenguas", ["Se fueron a sus casas", "Construyeron un templo", "Discutieron entre ellos"], "«Y fueron todos llenos del Espíritu Santo, y comenzaron a hablar en otras lenguas».", "Hechos 2:4"],
    ["f30", 4, "o3", "comprender", "¿Para quiénes es la promesa del Espíritu, según Hechos 2:39?", "Para ellos, para sus hijos y para todos los que están lejos", ["Solo para los apóstoles", "Solo para el primer siglo", "Solo para los judíos"], "«Porque para vosotros es la promesa, y para vuestros hijos, y para todos los que están lejos».", "Hechos 2:38-39"],
    ["f31", 4, "o3", "analizar", "¿En qué difieren las iglesias pentecostales sobre las lenguas, según la nota de la lección?", "En si hablar en lenguas es la señal inicial y necesaria del bautismo en el Espíritu o una manifestación que se espera sin ser la única señal", ["En si el Espíritu Santo existe", "En si se debe orar", "En si Pentecostés ocurrió"], "«¿hablan todos lenguas? ¿interpretan todos?».", "1 Corintios 12:30"],
    ["f32", 4, "o3", "aplicar", "¿Cómo se ejercen los dones del Espíritu, según la declaración de fe?", "Con amor, con orden y bajo la autoridad de la Palabra", ["Sin ningún orden", "Para competir entre hermanos", "Sin tener en cuenta la Biblia"], "«pero hágase todo decentemente y con orden».", "1 Corintios 14:40"],
    // Lección 5 · La santidad, las ordenanzas, la iglesia y el ministerio
    ["f33", 5, "o4", "recordar", "¿Cómo somos transformados, según 2 Corintios 3:18?", "De gloria en gloria en la misma imagen, por el Espíritu del Señor", ["De un día para otro y para siempre", "Por nuestro propio esfuerzo", "Solo al morir"], "«somos transformados de gloria en gloria en la misma imagen, como por el Espíritu del Señor».", "2 Corintios 3:18"],
    ["f34", 5, "o4", "comprender", "¿Cuáles son las dos ordenanzas que el Señor dejó a su iglesia?", "El bautismo en agua y la Santa Cena", ["El ayuno y el diezmo", "La confirmación y la confesión", "La boda y el funeral"], "«haced esto en memoria de mí».", "1 Corintios 11:23-26"],
    ["f35", 5, "o4", "recordar", "¿Cómo se hace el bautismo en agua, según la declaración de fe?", "Por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo", ["Rociando a los recién nacidos", "Sin agua", "En el nombre del pastor"], "«Porque somos sepultados juntamente con él para muerte por el bautismo».", "Romanos 6:4"],
    ["f36", 5, "o4", "recordar", "¿Qué anunciamos al tomar la Santa Cena, según 1 Corintios 11:26?", "La muerte del Señor hasta que él venga", ["Nuestra propia justicia", "El fin de la iglesia", "Nada"], "«la muerte del Señor anunciáis hasta que él venga».", "1 Corintios 11:23-26"],
    ["f37", 5, "o4", "comprender", "¿Qué no podrá vencer a la iglesia, según Mateo 16:18?", "Las puertas del Hades", ["Las persecuciones de un día", "Las preguntas de los incrédulos", "Los cambios de gobierno"], "«y las puertas del Hades no prevalecerán contra ella».", "Mateo 16:18"],
    ["f38", 5, "o4", "comprender", "¿Para qué da Cristo apóstoles, profetas, evangelistas, pastores y maestros, según Efesios 4:12?", "Para perfeccionar a los santos para la obra del ministerio", ["Para que solo ellos sirvan", "Para gobernar la ciudad", "Para recibir honra"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-12"],
    ["f39", 5, "o4", "analizar", "¿Qué punto sobre el ministerio queda por confirmar en la declaración de fe?", "El ministerio de la mujer: si puede ejercer el pastorado y la predicación, o con qué límites", ["Si hay que servir con los dones", "Si Cristo da ministerios a la iglesia", "Si los líderes deben tener buen carácter"], "«y vuestros hijos y vuestras hijas profetizarán».", "Hechos 2:17-18"],
    // Lección 6 · La familia, el avivamiento y la esperanza
    ["f40", 6, "o4", "recordar", "¿Qué dice Hebreos 13:4 del matrimonio?", "Que sea honroso en todos", ["Que es opcional para Dios", "Que es solo un contrato", "Que no importa la fidelidad"], "«Honroso sea en todos el matrimonio, y el lecho sin mancilla».", "Hebreos 13:4"],
    ["f41", 6, "o4", "comprender", "¿Qué es la familia, según la declaración de fe?", "El lugar donde se ama, se enseña la fe y se forma a los hijos", ["Un grupo que no tiene que ver con la fe", "Solo una institución del gobierno", "Algo que reemplaza a la iglesia"], "«Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer».", "Génesis 2:24"],
    ["f42", 6, "o4", "recordar", "¿Qué pasará con los muertos en Cristo cuando el Señor descienda del cielo, según 1 Tesalonicenses 4:16?", "Resucitarán primero", ["Seguirán en el sepulcro", "Serán olvidados", "Volverán a vivir como antes"], "«y los muertos en Cristo resucitarán primero».", "1 Tesalonicenses 4:16-17"],
    ["f43", 6, "o4", "comprender", "¿En qué coinciden todos los creyentes sobre la venida de Cristo, según la lección?", "En que Cristo vuelve, personal y visiblemente", ["En el día exacto de su venida", "En que no volverá", "En que ya volvió en secreto"], "«Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo».", "Hechos 1:11"],
    ["f44", 6, "o4", "recordar", "¿Qué no habrá en los cielos nuevos y la tierra nueva, según Apocalipsis 21:4?", "Muerte, llanto, clamor ni dolor", ["Alegría", "Adoración", "Vida"], "«y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor».", "Apocalipsis 21:4"],
    ["f45", 6, "o4", "aplicar", "¿Cómo cambia la vida de hoy la esperanza de la venida de Cristo, según la lección?", "El que espera a Cristo vive distinto: en santidad y con esperanza", ["No cambia nada", "Hace que dejemos de trabajar", "Hace que vivamos con miedo"], "«y así estaremos siempre con el Señor».", "1 Tesalonicenses 4:16-17"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Para qué prepara la Escritura al hombre de Dios, según 2 Timoteo 3:17?", "Para toda buena obra", ["Para hacerse rico", "Para dominar a otros", "Para nada en especial"], "«a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra».", "2 Timoteo 3:16-17"],
      ["m1-02", 1, "o1", "comprender", "¿Qué significa que la Biblia es la autoridad final?", "Que todo lo que creemos y hacemos se mide por ella", ["Que solo vale el Antiguo Testamento", "Que la tradición vale más", "Que cada uno decide lo que es verdad"], "«Toda la Escritura es inspirada por Dios, y útil para enseñar».", "2 Timoteo 3:16-17"],
      ["m1-03", 1, "o1", "recordar", "¿Qué no es ninguna profecía de la Escritura, según 2 Pedro 1:20?", "De interpretación privada", ["Verdadera", "Útil", "De Dios"], "«que ninguna profecía de la Escritura es de interpretación privada».", "2 Pedro 1:20-21"],
      ["m1-04", 1, "o1", "comprender", "¿Qué tres personas nombra Pablo en 2 Corintios 13:14?", "El Señor Jesucristo, Dios Padre y el Espíritu Santo", ["Pedro, Santiago y Juan", "Abraham, Isaac y Jacob", "Moisés, Elías y David"], "«La gracia del Señor Jesucristo, el amor de Dios, y la comunión del Espíritu Santo».", "2 Corintios 13:14"],
      ["m1-05", 1, "o1", "aplicar", "Alguien dice que los cristianos adoran a tres dioses. ¿Qué responde la declaración de fe?", "Que hay un solo Dios, que existe en tres personas iguales en esencia", ["Que tiene razón", "Que Jesús no es Dios", "Que el Espíritu Santo es una fuerza"], "«Oye, Israel: Jehová nuestro Dios, Jehová uno es».", "Deuteronomio 6:4"],
      ["m1-06", 1, "o1", "analizar", "¿Por qué Pablo pide retener la forma de las sanas palabras?", "Porque la sana doctrina guía la fe y la vida del creyente", ["Porque la doctrina no importa", "Porque solo importan las palabras bonitas", "Porque así lo pedía la ley romana"], "«Retén la forma de las sanas palabras que de mí oíste».", "2 Timoteo 1:13"],
      ["m1-07", 2, "o1", "recordar", "¿Con quién era el Verbo en el principio, según Juan 1:1?", "Con Dios", ["Con los ángeles", "Con Moisés", "Con nadie"], "«y el Verbo era con Dios».", "Juan 1:1"],
      ["m1-08", 2, "o1", "comprender", "¿De qué estaba lleno el Verbo hecho carne, según Juan 1:14?", "De gracia y de verdad", ["De ira y de juicio", "De riquezas", "De fama"], "«lleno de gracia y de verdad».", "Juan 1:14"],
      ["m1-09", 2, "o1", "recordar", "¿Quién concebiría y daría a luz un hijo, según la profecía que cita Mateo 1:23?", "Una virgen", ["Una reina", "Una profetisa anciana", "Una sacerdotisa"], "«He aquí, una virgen concebirá y dará a luz un hijo».", "Mateo 1:20-23"],
      ["m1-10", 2, "o1", "comprender", "¿Por qué Cristo puede compadecerse de nuestras debilidades, según Hebreos 4:15?", "Porque fue tentado en todo según nuestra semejanza", ["Porque nunca fue hombre", "Porque pecó como nosotros", "Porque no conoció el dolor"], "«Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades».", "Hebreos 4:15"],
      ["m1-11", 2, "o1", "aplicar", "¿Qué hace Cristo hoy a la diestra del Padre, según la declaración de fe?", "Intercede por nosotros", ["Descansa sin hacer nada", "Espera que nos salvemos solos", "Juzga sin misericordia"], "«viviendo siempre para interceder por ellos».", "Hebreos 7:25"],
      ["m1-12", 2, "o1", "analizar", "¿Qué tienen en común Juan 1:1 y Juan 1:14?", "Que el mismo Verbo que era Dios fue hecho carne", ["Que hablan de dos personas distintas", "Que hablan de un ángel", "Que no tienen relación"], "«Y aquel Verbo fue hecho carne, y habitó entre nosotros».", "Juan 1:14"],
      ["m1-13", 3, "o2", "recordar", "¿Qué pasó a todos los hombres por el pecado, según Romanos 5:12?", "La muerte", ["La riqueza", "La sabiduría", "La salvación"], "«así la muerte pasó a todos los hombres, por cuanto todos pecaron».", "Romanos 5:12"],
      ["m1-14", 3, "o2", "comprender", "¿Qué significa estar destituidos de la gloria de Dios?", "Estar separados de Dios por el pecado", ["Estar cansados", "No tener trabajo", "Ser pobres"], "«por cuanto todos pecaron, y están destituidos de la gloria de Dios».", "Romanos 3:23"],
      ["m1-15", 3, "o2", "recordar", "¿Qué tiene el que tiene al Hijo, según 1 Juan 5:12?", "La vida", ["Riquezas", "Fama", "Poder político"], "«El que tiene al Hijo, tiene la vida».", "1 Juan 5:11-13"],
      ["m1-16", 3, "o2", "aplicar", "Un nuevo creyente piensa que debe hacer muchas obras para que Dios lo acepte. ¿Qué le enseña Efesios 2:8-9?", "Que la salvación es por gracia, por medio de la fe, y es don de Dios", ["Que tiene razón", "Que debe hacer más obras", "Que Dios no acepta a nadie"], "«Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios».", "Efesios 2:8-9"],
      ["m1-17", 3, "o2", "comprender", "¿Qué promesa citan los que enseñan que quien nació de nuevo nunca pierde la salvación?", "No perecerán jamás, ni nadie las arrebatará de mi mano", ["Bienaventurados los pobres en espíritu", "Amarás a tu prójimo", "Id y haced discípulos"], "«y no perecerán jamás, ni nadie las arrebatará de mi mano».", "Juan 10:28-29"],
      ["m1-18", 3, "o2", "analizar", "¿En qué coinciden todos sobre la perseverancia, según la nota de la lección?", "En que la seguridad descansa en las promesas de Dios y en que la Biblia llama a permanecer firmes", ["En que la salvación es por obras", "En que no hay que perseverar", "En que nadie puede estar seguro"], "«con tal que retengamos firme hasta el fin nuestra confianza del principio».", "Hebreos 3:12-14"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o3", "recordar", "¿Cómo llama Jesús al Espíritu Santo en Juan 16:7?", "El Consolador", ["El Juez", "El Rey", "El Sacerdote"], "«el Consolador no vendría a vosotros; mas si me fuere, os lo enviaré».", "Juan 16:7-8"],
      ["m2-02", 4, "o3", "comprender", "¿Qué hizo Pedro al anunciar la promesa del Espíritu en Hechos 2:38?", "Llamó a arrepentirse y a bautizarse, y prometió el don del Espíritu Santo", ["Llamó a construir un templo", "Pidió dinero", "Dijo que la promesa era solo para él"], "«Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados; y recibiréis el don del Espíritu Santo».", "Hechos 2:38-39"],
      ["m2-03", 4, "o3", "recordar", "¿Qué oyeron los creyentes judíos en casa de Cornelio, según Hechos 10:46?", "Que hablaban en lenguas y magnificaban a Dios", ["Que lloraban sin parar", "Que discutían", "Que callaban"], "«Porque los oían que hablaban en lenguas, y que magnificaban a Dios».", "Hechos 10:44-46"],
      ["m2-04", 4, "o3", "comprender", "¿Siguen vigentes hoy los dones del Espíritu, según la declaración de fe?", "Sí: Dios los da hoy para edificar a la iglesia y alcanzar al mundo", ["No: terminaron con los apóstoles", "Solo para los pastores", "Solo en el cielo"], "«Pero a cada uno le es dada la manifestación del Espíritu para provecho».", "1 Corintios 12:7"],
      ["m2-05", 4, "o3", "aplicar", "¿Qué hace la iglesia por un hermano enfermo, según Santiago 5:14?", "Los ancianos oran por él y lo ungen con aceite en el nombre del Señor", ["Lo aleja de la iglesia", "Le dice que no tiene fe", "No hace nada"], "«Llame a los ancianos de la iglesia, y oren por él, ungiéndole con aceite en el nombre del Señor».", "Santiago 5:14-15"],
      ["m2-06", 4, "o3", "analizar", "¿Qué queda por confirmar sobre la sanidad divina en la declaración de fe?", "Si la sanidad está provista en la expiación o se presenta solo como una promesa en respuesta a la oración", ["Si Dios sana hoy", "Si hay que orar por los enfermos", "Si se puede ir al médico"], "«El mismo tomó nuestras enfermedades, y llevó nuestras dolencias».", "Mateo 8:16-17"],
      ["m2-07", 5, "o4", "recordar", "¿Sin qué nadie verá al Señor, según Hebreos 12:14?", "Sin la santidad", ["Sin riquezas", "Sin fama", "Sin estudios"], "«Seguid la paz con todos, y la santidad, sin la cual nadie verá al Señor».", "Hebreos 12:14"],
      ["m2-08", 5, "o4", "comprender", "¿Quiénes se bautizan, según la declaración de fe?", "Los que se arrepintieron y creyeron", ["Todos los recién nacidos", "Solo los pastores", "Los que pagan una ofrenda"], "«a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva».", "Romanos 6:4"],
      ["m2-09", 5, "o4", "recordar", "¿Qué dijo Jesús de la copa en 1 Corintios 11:25?", "Esta copa es el nuevo pacto en mi sangre", ["Esta copa es para los sacerdotes", "Esta copa es solo vino", "Esta copa es un premio"], "«Esta copa es el nuevo pacto en mi sangre».", "1 Corintios 11:23-26"],
      ["m2-10", 5, "o4", "comprender", "¿Qué es la iglesia, según la declaración de fe?", "El cuerpo de Cristo, formado por todos los que han creído en él", ["Un edificio", "Una organización política", "Un club social"], "«edificaré mi iglesia».", "Mateo 16:18"],
      ["m2-11", 5, "o4", "aplicar", "¿Quién está llamado a servir en la iglesia, según la declaración de fe?", "Todo creyente, con sus dones", ["Solo los pastores", "Solo los que estudiaron", "Nadie"], "«a fin de perfeccionar a los santos para la obra del ministerio, para la edificación del cuerpo de Cristo».", "Efesios 4:11-12"],
      ["m2-12", 5, "o4", "analizar", "¿Qué texto citan las iglesias que ponen límites al ministerio de la mujer?", "1 Timoteo 2:12", ["Génesis 1:1", "Juan 3:16", "Salmos 23:1"], "«Porque no permito a la mujer enseñar, ni ejercer dominio sobre el hombre».", "1 Timoteo 2:12"],
      ["m2-13", 6, "o4", "recordar", "¿En qué se convierten el hombre y la mujer en el matrimonio, según Génesis 2:24?", "En una sola carne", ["En dos familias", "En socios de negocio", "En hermanos"], "«y serán una sola carne».", "Génesis 2:24"],
      ["m2-14", 6, "o4", "comprender", "¿Qué es el avivamiento, según la declaración de fe?", "La obra del Espíritu que despierta a la iglesia a la santidad, la oración y el primer amor, y alcanza a los perdidos", ["Un concierto con muchas luces", "Una campaña de publicidad", "Algo que ya no ocurre"], "«Derramaré de mi Espíritu sobre toda carne».", "Hechos 2:17-18"],
      ["m2-15", 6, "o4", "recordar", "¿Cómo descenderá el Señor del cielo, según 1 Tesalonicenses 4:16?", "Con voz de mando, con voz de arcángel y con trompeta de Dios", ["En silencio", "Sin que nadie lo note", "Solo en espíritu"], "«Porque el Señor mismo con voz de mando, con voz de arcángel, y con trompeta de Dios, descenderá del cielo».", "1 Tesalonicenses 4:16-17"],
      ["m2-16", 6, "o4", "comprender", "¿Qué oirán todos los que están en los sepulcros, según Juan 5:28?", "La voz del Hijo", ["Una música", "Nada", "La voz de los ángeles solamente"], "«vendrá hora cuando todos los que están en los sepulcros oirán su voz».", "Juan 5:28-29"],
      ["m2-17", 6, "o4", "aplicar", "Un hermano está triste por la muerte de un ser querido creyente. ¿Qué esperanza le da 1 Tesalonicenses 4:16-17?", "Que los muertos en Cristo resucitarán, y estaremos siempre con el Señor", ["Que no volverá a verlo nunca", "Que todo termina con la muerte", "Que debe olvidarlo"], "«y así estaremos siempre con el Señor».", "1 Tesalonicenses 4:16-17"],
      ["m2-18", 6, "o4", "analizar", "¿Qué enseñan las Asambleas de Dios sobre el orden de los últimos tiempos, según la nota de la lección?", "Que la iglesia será arrebatada antes de la gran tribulación y que habrá un reino de mil años", ["Que Cristo no volverá", "Que no habrá juicio", "Que el reino ya terminó"], "«y vivieron y reinaron con Cristo mil años».", "Apocalipsis 20:4"],
    ] as P[]).map(p),
  },
  // las escritas del examen final (2 por intento, de 4)
  escritas: [
    {
      id: "n2-doctrinas-e1",
      tipo: "corta",
      pregunta: "Explica qué cree la iglesia sobre la Biblia y sobre Dios, según la declaración de fe.",
      ideas: [
        { id: "inspirada", peso: 25, texto: "Que la Biblia es la Palabra de Dios inspirada.", formas: ["inspirada", "inspiracion", "palabra de dios", "inspirados por el espiritu"] },
        { id: "autoridad", peso: 20, texto: "Que es sin error, suficiente y la autoridad final.", formas: ["autoridad", "sin error", "suficiente"] },
        { id: "un_dios", peso: 20, texto: "Que hay un solo Dios.", formas: ["un solo dios", "uno es", "unico dios"] },
        { id: "trinidad", peso: 25, texto: "Que existe en tres personas: el Padre, el Hijo y el Espíritu Santo.", formas: ["tres personas", "trinidad", "trino"] },
      ],
      citas: ["2 Timoteo 3:16-17", "2 Timoteo 3:16", "2 Pedro 1:20-21", "2 Pedro 1:21", "Deuteronomio 6:4", "Mateo 28:19", "2 Corintios 13:14"],
      pesoCita: 10,
      errores: [{ id: "tres_dioses", anula: "trinidad", texto: "No son tres dioses: es un solo Dios en tres personas (Deuteronomio 6:4; Mateo 28:19).", formas: ["tres dioses"] }],
      modelo:
        "La Biblia es la Palabra de Dios inspirada (2 Timoteo 3:16), sin error en lo que enseña, suficiente y la autoridad final de lo que creemos. Hay un solo Dios verdadero, que existe eternamente en tres personas: el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria.",
    },
    {
      id: "n2-doctrinas-e2",
      tipo: "corta",
      pregunta: "Explica quién es Jesucristo según la declaración de fe.",
      ideas: [
        { id: "dios", peso: 25, texto: "Que es el Hijo eterno de Dios, verdadero Dios.", formas: ["verdadero dios", "hijo eterno", "el verbo era dios", "es dios"] },
        { id: "hombre", peso: 20, texto: "Que es verdadero hombre: el Verbo fue hecho carne.", formas: ["verdadero hombre", "hecho carne", "se hizo hombre"] },
        { id: "virgen", peso: 10, texto: "Que fue concebido por el Espíritu Santo y nació de la virgen María.", formas: ["virgen", "concebido"] },
        { id: "cruz", peso: 25, texto: "Que murió en nuestro lugar y resucitó al tercer día.", formas: ["murio", "en nuestro lugar", "por nuestros pecados", "resucito", "tercer dia"] },
        { id: "ahora", peso: 10, texto: "Que subió al cielo y hoy intercede por nosotros.", formas: ["intercede", "a la diestra", "subio al cielo"] },
      ],
      citas: ["Juan 1:1", "Juan 1:14", "Mateo 1:20-23", "Mateo 1:23", "Hebreos 4:15", "1 Corintios 15:3-4", "Hebreos 7:25"],
      pesoCita: 10,
      errores: [{ id: "solo_hombre", anula: "dios", texto: "Jesús no fue solo un hombre o un profeta: es el Hijo eterno de Dios, verdadero Dios (Juan 1:1).", formas: ["solo un hombre", "solo un profeta", "solo un maestro"] }],
      modelo:
        "Jesucristo es el Hijo eterno de Dios, verdadero Dios y verdadero hombre: el Verbo fue hecho carne (Juan 1:14). Fue concebido por el Espíritu Santo y nació de la virgen María, vivió sin pecado, murió por nuestros pecados, resucitó al tercer día y hoy intercede por nosotros a la diestra del Padre.",
    },
    {
      id: "n2-doctrinas-e3",
      tipo: "corta",
      pregunta: "Explica cómo se salva una persona, según la Biblia y la declaración de fe.",
      ideas: [
        { id: "pecado", peso: 20, texto: "Que todos pecaron y están separados de Dios.", formas: ["todos pecaron", "pecado", "separados de dios", "destituidos"] },
        { id: "gracia", peso: 35, texto: "Que la salvación es por gracia, un regalo de Dios.", formas: ["por gracia", "gracia", "regalo", "don de dios"] },
        { id: "fe", peso: 20, texto: "Que se recibe por medio de la fe en Cristo, con arrepentimiento.", formas: ["por medio de la fe", "fe en cristo", "creer", "cree", "arrepent*"] },
        { id: "nuevo", peso: 15, texto: "Que quien cree nace de nuevo, es perdonado y adoptado como hijo de Dios.", formas: ["nace de nuevo", "nacer de nuevo", "naciere de nuevo", "justificado", "adoptado", "perdonado", "hijo de dios"] },
      ],
      citas: ["Efesios 2:8-9", "Efesios 2:8", "Romanos 3:23", "Romanos 5:12", "Juan 3:3", "Juan 3:3-7", "Hechos 3:19", "Romanos 10:9-10", "1 Juan 5:11-13"],
      pesoCita: 10,
      errores: [{ id: "obras", anula: "gracia", texto: "La salvación no es por obras: es por gracia, por medio de la fe (Efesios 2:8-9).", formas: ["por obras", "por nuestras obras", "por buenas obras", "ganar la salvacion", "ganarse la salvacion"] }],
      modelo:
        "Todos pecaron y están separados de Dios (Romanos 3:23). La salvación es un regalo: por gracia, por medio de la fe en Cristo, y no por obras (Efesios 2:8-9). Quien se arrepiente y cree nace de nuevo, es perdonado, justificado y adoptado como hijo de Dios.",
    },
    {
      id: "n2-doctrinas-e4",
      tipo: "corta",
      pregunta: "Explica qué son el bautismo en agua y la Santa Cena, las dos ordenanzas de la iglesia.",
      ideas: [
        { id: "bautismo", peso: 30, texto: "Que el bautismo, por inmersión, es el testimonio de que morimos al pecado y vivimos una vida nueva.", formas: ["inmersion", "sepultados", "vida nueva", "murieron al pecado", "morimos al pecado", "testimonio"] },
        { id: "quienes", peso: 15, texto: "Que se bautizan los que se arrepintieron y creyeron.", formas: ["creyeron", "se arrepintieron", "creyentes", "los que creen"] },
        { id: "cena", peso: 30, texto: "Que la Santa Cena es un memorial de la muerte del Señor.", formas: ["memoria", "memorial", "su muerte", "muerte del senor", "el pan", "la copa"] },
        { id: "examen", peso: 15, texto: "Que la toman los creyentes que se examinan, y anuncia su venida.", formas: ["examin*", "pruebese", "probarse", "hasta que el venga", "comunion"] },
      ],
      citas: ["Romanos 6:4", "Mateo 28:19", "Hechos 2:38-41", "1 Corintios 11:23-26", "1 Corintios 11:23-29", "1 Corintios 11:26", "1 Corintios 11:28"],
      pesoCita: 10,
      errores: [{ id: "salva", anula: "bautismo", texto: "El bautismo no salva: es el testimonio de quien ya se arrepintió y creyó (Romanos 6:4).", formas: ["el bautismo salva", "el bautismo nos salva", "nos salva el bautismo"] }],
      modelo:
        "El bautismo en agua, por inmersión, es para los que se arrepintieron y creyeron: un testimonio de que murieron al pecado y viven una vida nueva (Romanos 6:4). La Santa Cena es un memorial de la muerte del Señor y comunión con él, para los creyentes que se examinan, hasta que él venga.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras): cuenta el 15 % de la nota del Nivel 2
  breve: {
    id: "n2-doctrinas-b1",
    tipo: "breve",
    pregunta:
      "Escribe con tus palabras cuáles de las doctrinas fundamentales son más importantes para tu vida y por qué: qué crees sobre la Biblia, sobre Dios y sobre Cristo, cómo es la salvación y qué esperas para el futuro. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "biblia", peso: 15, texto: "Qué cree sobre la Biblia.", formas: ["la biblia", "palabra de dios", "inspirada", "autoridad"] },
      { id: "dios", peso: 15, texto: "Qué cree sobre Dios: uno en tres personas.", formas: ["trinidad", "tres personas", "un solo dios", "dios trino"] },
      { id: "cristo", peso: 15, texto: "Qué cree sobre Cristo.", formas: ["verdadero dios", "hecho carne", "resucito", "murio por"] },
      { id: "salvacion", peso: 20, texto: "Que la salvación es por gracia, por medio de la fe.", formas: ["por gracia", "gracia", "por medio de la fe", "nacer de nuevo", "naci de nuevo"] },
      { id: "espiritu", peso: 10, texto: "La obra del Espíritu Santo.", formas: ["espiritu santo", "poder para", "sus dones", "mis dones"] },
      { id: "esperanza", peso: 15, texto: "La esperanza de la venida de Cristo.", formas: ["volvera", "su venida", "vendra", "eternidad", "vida eterna", "con el senor"] },
      { id: "vida", peso: 10, texto: "Cómo esas verdades cambian su vida.", formas: ["mi vida", "me ayuda", "me ayudan", "voy a", "quiero vivir", "santidad"] },
    ],
    basta: 85,
    citas: ["2 Timoteo 1:13", "2 Timoteo 3:16", "2 Timoteo 3:16-17", "Deuteronomio 6:4", "Mateo 28:19", "Juan 1:1", "Juan 1:14", "1 Corintios 15:3-4", "Efesios 2:8-9", "Juan 3:3", "1 Juan 5:13", "Hechos 1:8", "Hechos 1:11", "1 Tesalonicenses 4:16-17"],
    pesoCita: 10,
    errores: [{ id: "obras", anula: "salvacion", texto: "La salvación no es por obras: es por gracia, por medio de la fe (Efesios 2:8-9).", formas: ["por obras", "por mis obras", "ganar la salvacion", "ganarme la salvacion"] }],
    modelo:
      "De todo lo que estudié, hay verdades que sostienen mi vida. Creo que la Biblia es la Palabra de Dios inspirada (2 Timoteo 3:16), y por eso quiero que sea la autoridad de mis decisiones. Creo en un solo Dios en tres personas, el Padre, el Hijo y el Espíritu Santo, y oro sabiendo que el Padre me oye, que Cristo intercede por mí y que el Espíritu vive en mí. Creo que Jesucristo es verdadero Dios y verdadero hombre, que murió por mis pecados y resucitó. Lo más importante para mí es que la salvación es por gracia, por medio de la fe, y no por obras (Efesios 2:8-9): no tengo que ganarme el amor de Dios. El Espíritu Santo me da poder para servir con mis dones. Y espero con gozo que Cristo volverá, como fue visto ir al cielo, y que estaré siempre con el Señor. Estas verdades me ayudan a vivir en santidad y con esperanza.",
  },
};
