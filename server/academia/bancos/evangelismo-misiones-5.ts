/**
 * El banco de «Plantación de iglesias» (especialidad Evangelismo y misiones, avanzada). SOLO SERVIDOR: respuestas y claves.
 * Los ids nunca se reusan. Cada pregunta del final y de las mini pruebas dice su lección, su objetivo y su nivel de Bloom.
 * Objetivos: o1 por qué plantar · o2 el plantador y su equipo · o3 conocer el lugar · o4 empezar en las casas · o5 formar
 * líderes y organizar · o6 una iglesia que se multiplica · o7 el versículo de memoria (Mateo 16:18).
 * Quién puede ejercer cada cargo no se evalúa aquí: es un punto de la declaración de fe por confirmar.
 */
import type { BancoMateria } from "../tipos";

type P = [id: string, leccion: number, objetivo: string, bloom: "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear", texto: string, correcta: string, falsas: [string, string, string], explica: string, ref: string];
const p = ([id, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref]: P) => ({ id: `evangelismo-misiones-5-${id}`, leccion, objetivo, bloom, texto, correcta, falsas, explica, ref });

export const BANCO_EVANGELISMO_MISIONES_5: BancoMateria = {
  materia: "evangelismo-misiones-5",
  repaso: {
    "evangelismo-misiones-5-1": ([
      ["1-r1", 1, "o1", "recordar", "¿Qué dijo Jesús en Mateo 16:18?", "Edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella", ["Destruiré este templo", "No edificaré nada", "Que cada uno edifique su propia iglesia"], "«edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella».", "Mateo 16:18"],
      ["1-r2", 1, "o1", "comprender", "¿Quién da el crecimiento, según 1 Corintios 3:6?", "Dios", ["El plantador", "Apolos", "La gente"], "«Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6-7"],
      ["1-r3", 1, "o1", "aplicar", "¿Sobre qué fundamento se planta una iglesia?", "Sobre Jesucristo y su evangelio", ["Sobre el carisma del plantador", "Sobre un edificio", "Sobre el dinero"], "«nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo».", "1 Corintios 3:10-11"],
    ] as P[]).map(p),
    "evangelismo-misiones-5-2": ([
      ["2-r1", 2, "o2", "recordar", "¿Qué hizo la iglesia de Antioquía antes de enviar a Bernabé y a Saulo?", "Ayunó, oró y les impuso las manos", ["Les dio dinero y nada más", "Les prohibió ir", "Votó sin orar"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
      ["2-r2", 2, "o2", "comprender", "¿Qué importa primero en el plantador, según la lección?", "Su carácter: su vida con Dios, su familia, su integridad y su perseverancia", ["Su fama", "Su dinero", "Su manera de hablar en público"], "Las cualidades que Pablo pide a los que guían la iglesia valen para el que la planta.", "Hechos 13:2-3"],
      ["2-r3", 2, "o2", "aplicar", "¿Cómo se sostenía Pablo en Corinto?", "Trabajando en el oficio de hacer tiendas", ["Con el dinero del templo", "Pidiendo limosna", "Con un salario del gobierno"], "«el oficio de ellos era hacer tiendas».", "Hechos 18:3-4"],
    ] as P[]).map(p),
    "evangelismo-misiones-5-3": ([
      ["3-r1", 3, "o3", "recordar", "¿Qué hizo Nehemías de noche, según Nehemías 2:13?", "Observó los muros derribados de Jerusalén", ["Durmió", "Huyó", "Celebró una fiesta"], "«observé los muros de Jerusalén que estaban derribados».", "Nehemías 2:12-13"],
      ["3-r2", 3, "o3", "comprender", "¿Qué respondió el pueblo a la invitación de Nehemías?", "Levantémonos y edifiquemos", ["No podemos", "Esperemos otro año", "Que lo hagan otros"], "«Levantémonos y edifiquemos».", "Nehemías 2:17-18"],
      ["3-r3", 3, "o3", "aplicar", "¿Qué se observa en el estudio de una comunidad?", "Quiénes viven allí, qué necesitan, qué iglesias hay y dónde se reúne la gente", ["Solo el precio de los alquileres", "Solo el clima", "Nada: se empieza sin mirar"], "Y quiénes están abiertos a conversar y a abrir su casa.", "Nehemías 2:12-13"],
    ] as P[]).map(p),
    "evangelismo-misiones-5-4": ([
      ["4-r1", 4, "o4", "recordar", "¿Dónde fue Pablo a orar en Filipos?", "Junto al río", ["Al templo", "A la sinagoga", "Al mercado"], "«salimos fuera de la puerta, junto al río, donde solía hacerse la oración».", "Hechos 16:13-15"],
      ["4-r2", 4, "o4", "comprender", "¿Qué hizo Lidia después de bautizarse?", "Abrió su casa a Pablo y a su equipo", ["Se fue de la ciudad", "Cerró su negocio", "Se escondió"], "«entrad en mi casa, y posad».", "Hechos 16:13-15"],
      ["4-r3", 4, "o4", "aplicar", "¿Con qué se empieza un grupo que puede llegar a ser iglesia?", "Con un grupo pequeño en una casa: la Biblia, la oración, una comida y la amistad", ["Con un templo grande", "Con una campaña de un día", "Con un anuncio en la radio y nada más"], "«partiendo el pan en las casas».", "Hechos 2:46-47"],
    ] as P[]).map(p),
    "evangelismo-misiones-5-5": ([
      ["5-r1", 5, "o5", "recordar", "¿Para qué dejó Pablo a Tito en Creta?", "Para corregir lo deficiente y establecer ancianos en cada ciudad", ["Para que descansara", "Para construir templos", "Para recoger ofrendas"], "«para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad».", "Tito 1:5"],
      ["5-r2", 5, "o5", "comprender", "¿Para qué dio Cristo ministerios a la iglesia, según Efesios 4:12?", "Para perfeccionar a los santos para la obra del ministerio", ["Para que unos pocos lo hagan todo", "Para tener títulos", "Para gobernar el mundo"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-12"],
      ["5-r3", 5, "o5", "aplicar", "¿Hacia dónde camina una iglesia nueva bien organizada?", "Hacia sostenerse, gobernarse y extenderse por sí misma", ["Hacia depender siempre del plantador", "Hacia cerrarse", "Hacia no tener líderes"], "Y mantiene la relación con la iglesia que la envió.", "Efesios 4:11-12"],
    ] as P[]).map(p),
    "evangelismo-misiones-5-6": ([
      ["6-r1", 6, "o6", "recordar", "¿Qué pasó con la palabra del Señor desde Tesalónica?", "Fue divulgada en Macedonia, en Acaya y en otros lugares", ["Se quedó solo allí", "Se perdió", "Nadie la oyó"], "«partiendo de vosotros ha sido divulgada la palabra del Señor, no sólo en Macedonia y Acaya».", "1 Tesalonicenses 1:8"],
      ["6-r2", 6, "o6", "comprender", "¿Por qué daba gracias Pablo por los filipenses?", "Por su comunión en el evangelio desde el primer día", ["Por su dinero", "Por su fama", "Por su edificio"], "«por vuestra comunión en el evangelio, desde el primer día hasta ahora».", "Filipenses 1:5-6"],
      ["6-r3", 6, "o6", "aplicar", "¿Cómo se relaciona una iglesia madre con su iglesia hija?", "Sigue unida con apoyo y amistad, sin controlarla", ["La controla en todo", "La abandona", "Compite con ella"], "Una iglesia sana da a luz otras iglesias.", "Filipenses 1:5-6"],
    ] as P[]).map(p),
  },
  final: ([
    // ---- lección 1: por qué plantar iglesias (10)
    ["f01", 1, "o1", "recordar", "¿Qué no prevalecerá contra la iglesia, según Mateo 16:18?", "Las puertas del Hades", ["Los apóstoles", "Los ángeles", "Los creyentes"], "«y las puertas del Hades no prevalecerán contra ella».", "Mateo 16:18"],
    ["f02", 1, "o1", "comprender", "¿De quién es la obra de edificar la iglesia?", "De Cristo", ["Del plantador", "De la mayoría", "Del gobierno"], "«edificaré mi iglesia».", "Mateo 16:18"],
    ["f03", 1, "o1", "recordar", "¿Qué hizo Apolos, según 1 Corintios 3:6?", "Regó", ["Plantó", "Dio el crecimiento", "Se fue sin hacer nada"], "«Yo planté, Apolos regó».", "1 Corintios 3:6-7"],
    ["f04", 1, "o1", "comprender", "¿Qué enseña 1 Corintios 3:7 sobre el que planta y el que riega?", "Que ni uno ni otro es algo, sino Dios, que da el crecimiento", ["Que el que planta es el más importante", "Que el que riega no sirve", "Que no hace falta Dios"], "«Así que ni el que planta es algo, ni el que riega, sino Dios, que da el crecimiento».", "1 Corintios 3:6-7"],
    ["f05", 1, "o1", "recordar", "¿Cómo se describe Pablo en 1 Corintios 3:10?", "Como un perito arquitecto que puso el fundamento", ["Como el dueño de la iglesia", "Como un albañil sin plan", "Como un rey"], "«yo como perito arquitecto puse el fundamento».", "1 Corintios 3:10-11"],
    ["f06", 1, "o1", "recordar", "¿Cuál es el único fundamento, según 1 Corintios 3:11?", "Jesucristo", ["Pablo", "Apolos", "La tradición"], "«nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo».", "1 Corintios 3:10-11"],
    ["f07", 1, "o1", "comprender", "¿Qué producía el evangelio en el Nuevo Testamento, según la lección?", "Iglesias en cada ciudad, y no solo creyentes sueltos", ["Solo creyentes sueltos", "Solo templos", "Nada visible"], "«edificaré mi iglesia».", "Mateo 16:18"],
    ["f08", 1, "o1", "aplicar", "¿Por qué una iglesia nueva puede alcanzar a más personas?", "Porque puede llegar a barrios y grupos que todavía no tienen una iglesia", ["Porque tiene más dinero", "Porque no necesita orar", "No puede"], "«el crecimiento lo ha dado Dios».", "1 Corintios 3:6-7"],
    ["f09", 1, "o1", "analizar", "¿Qué peligro evita plantar sobre Cristo y no sobre una persona?", "Que la iglesia dependa del plantador y se caiga sin él", ["Que la iglesia crezca", "Que la gente ore", "Ninguno"], "«el cual es Jesucristo».", "1 Corintios 3:10-11"],
    ["f10", 1, "o7", "recordar", "Completa Mateo 16:18: Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia…", "y las puertas del Hades no prevalecerán contra ella", ["y la gente la abandonará", "y durará solo un tiempo", "y será solo de Israel"], "Es el versículo de memoria de la materia.", "Mateo 16:18"],
    // ---- lección 2: el plantador y su equipo (10)
    ["f11", 2, "o2", "recordar", "¿Quién apartó a Bernabé y a Saulo para la obra?", "El Espíritu Santo", ["El emperador", "Los fariseos", "Una votación sin oración"], "«dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo».", "Hechos 13:2-3"],
    ["f12", 2, "o2", "comprender", "¿Con qué va el plantador, según el ejemplo de Antioquía?", "Con un llamado y con el respaldo de una iglesia", ["Solo con su entusiasmo", "Sin que nadie lo sepa", "Con un contrato comercial"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
    ["f13", 2, "o2", "recordar", "¿Cómo llamó Pablo a Priscila y a Aquila?", "Mis colaboradores en Cristo Jesús", ["Mis siervos", "Mis enemigos", "Mis alumnos"], "«mis colaboradores en Cristo Jesús».", "Romanos 16:3-5"],
    ["f14", 2, "o2", "recordar", "¿Dónde se reunía una iglesia, según Romanos 16:5?", "En la casa de Priscila y Aquila", ["En el templo de Jerusalén", "En la sinagoga", "En un teatro"], "«Saludad también a la iglesia de su casa».", "Romanos 16:3-5"],
    ["f15", 2, "o2", "recordar", "¿Cuál era el oficio de Priscila y Aquila?", "Hacer tiendas", ["Pescar", "Cobrar impuestos", "Construir barcos"], "«el oficio de ellos era hacer tiendas».", "Hechos 18:3-4"],
    ["f16", 2, "o2", "recordar", "¿Cuánto tiempo se quedó Pablo en Corinto, según Hechos 18:11?", "Un año y seis meses", ["Tres días", "Diez años", "Una semana"], "«Y se detuvo allí un año y seis meses, enseñándoles la palabra de Dios».", "Hechos 18:11"],
    ["f17", 2, "o2", "comprender", "¿Qué enseña el tiempo que Pablo pasó en Corinto?", "Que plantar una iglesia pide paciencia", ["Que hay que irse pronto", "Que una iglesia se planta en un día", "Que Corinto no le importaba"], "«un año y seis meses, enseñándoles la palabra de Dios».", "Hechos 18:11"],
    ["f18", 2, "o2", "aplicar", "Un plantador trabaja en un oficio mientras la iglesia crece. ¿Qué enseña el ejemplo de Pablo?", "Que es una forma digna de servir mientras la iglesia crece", ["Que es una falta de fe", "Que no debe evangelizar", "Que debe dejar la obra"], "«trabajaban juntos, pues el oficio de ellos era hacer tiendas».", "Hechos 18:3-4"],
    ["f19", 2, "o2", "analizar", "¿Por qué importa más el carácter que los dones en el plantador?", "Porque una iglesia se edifica con vidas íntegras y perseverantes, y no solo con talento", ["Porque los dones no sirven", "No importa más", "Porque así se recauda más"], "Las cualidades de 1 Timoteo 3:1-7 y Tito 1:5-9 valen también para el que planta.", "Hechos 13:2-3"],
    ["f20", 2, "o2", "evaluar", "¿Qué equipo de plantación está mejor formado?", "Uno llamado y enviado por su iglesia, de buen carácter, que trabaja unido y con paciencia", ["Una sola persona sin iglesia que la envíe", "Un grupo que no ora", "Un equipo que busca resultados en un mes"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
    // ---- lección 3: conocer el lugar y la gente (10)
    ["f21", 3, "o3", "recordar", "¿Con quiénes salió Nehemías de noche?", "Con unos pocos varones", ["Con todo el pueblo", "Con un ejército", "Con los sacerdotes del templo"], "«me levanté de noche, yo y unos pocos varones conmigo».", "Nehemías 2:12-13"],
    ["f22", 3, "o3", "comprender", "¿Qué hizo Nehemías antes de presentar su plan?", "Conoció la necesidad observando los muros", ["Empezó a construir sin mirar", "Pidió dinero a todos", "Se quejó"], "«observé los muros de Jerusalén que estaban derribados».", "Nehemías 2:12-13"],
    ["f23", 3, "o3", "recordar", "¿Qué invitación hizo Nehemías al pueblo?", "Venid, y edifiquemos el muro de Jerusalén", ["Volvamos a Babilonia", "Esperemos al rey", "Dejemos el muro así"], "«venid, y edifiquemos el muro de Jerusalén».", "Nehemías 2:17-18"],
    ["f24", 3, "o3", "recordar", "¿Qué le pasaba a Pablo al ver Atenas, según Hechos 17:16?", "Su espíritu se enardecía al verla entregada a la idolatría", ["Admiraba sus templos", "No sentía nada", "Tenía miedo"], "«su espíritu se enardecía viendo la ciudad entregada a la idolatría».", "Hechos 17:16-17"],
    ["f25", 3, "o3", "comprender", "¿Dónde discutía Pablo cada día en Atenas, además de la sinagoga?", "En la plaza, con los que concurrían", ["En el palacio", "En un barco", "En su casa, a solas"], "«y en la plaza cada día con los que concurrían».", "Hechos 17:16-17"],
    ["f26", 3, "o3", "aplicar", "¿Qué necesidades se buscan en el estudio de una comunidad?", "Soledad, pobreza, adicciones o falta de cuidado para los niños", ["Solo si hay estacionamiento", "Solo la música que les gusta", "Ninguna"], "«observé los muros de Jerusalén que estaban derribados».", "Nehemías 2:12-13"],
    ["f27", 3, "o3", "aplicar", "¿Para qué averiguar qué iglesias hay ya en el lugar?", "Para saber a quiénes alcanzan y a quiénes no", ["Para competir con ellas", "Para criticarlas", "No hace falta"], "Se conoce el lugar antes de plantar.", "Nehemías 2:12-13"],
    ["f28", 3, "o3", "aplicar", "¿Qué hacen muchos plantadores antes de empezar, según la lección?", "Recorren el barrio orando por sus calles, sus familias y sus autoridades", ["Ponen carteles sin orar", "Esperan sin salir", "Compran primero un edificio"], "«su espíritu se enardecía viendo la ciudad».", "Hechos 17:16-17"],
    ["f29", 3, "o3", "analizar", "¿Qué tienen en común Nehemías y Pablo en Atenas?", "Los dos observaron el lugar y su necesidad antes de actuar", ["Los dos construyeron muros", "Los dos evitaron a la gente", "Nada"], "«observé los muros de Jerusalén».", "Nehemías 2:12-13"],
    ["f30", 3, "o3", "evaluar", "¿Qué manera de empezar una plantación es más sabia?", "Estudiar el lugar en oración, conocer a la gente y sus necesidades, y después invitar a edificar juntos", ["Empezar con un gran evento sin conocer a nadie", "Copiar lo que hizo otra iglesia en otro país", "Esperar a tener un edificio"], "«Levantémonos y edifiquemos».", "Nehemías 2:17-18"],
    // ---- lección 4: empezar en las casas (10)
    ["f31", 4, "o4", "recordar", "¿A quiénes habló Pablo junto al río en Filipos?", "A las mujeres que se habían reunido para orar", ["A los soldados", "A los sacerdotes", "A los filósofos"], "«y sentándonos, hablamos a las mujeres que se habían reunido».", "Hechos 16:13-15"],
    ["f32", 4, "o4", "recordar", "¿De qué ciudad era Lidia, y a qué se dedicaba?", "Era de Tiatira y vendía púrpura", ["Era de Roma y pescaba", "Era de Atenas y enseñaba", "Era de Jerusalén y cobraba impuestos"], "«una mujer llamada Lidia, vendedora de púrpura, de la ciudad de Tiatira».", "Hechos 16:13-15"],
    ["f33", 4, "o4", "comprender", "¿Quién abrió el corazón de Lidia, según Hechos 16:14?", "El Señor", ["Pablo", "Su familia", "Ella misma"], "«el Señor abrió el corazón de ella para que estuviese atenta a lo que Pablo decía».", "Hechos 16:13-15"],
    ["f34", 4, "o4", "recordar", "¿Dónde partían el pan los creyentes de Jerusalén, según Hechos 2:46?", "En las casas", ["Solo en el templo", "En la plaza pública", "En el palacio"], "«y partiendo el pan en las casas».", "Hechos 2:46-47"],
    ["f35", 4, "o4", "comprender", "¿Qué hacía el Señor mientras los creyentes se reunían en las casas?", "Añadía cada día a la iglesia los que habían de ser salvos", ["Nada", "Los dispersaba", "Cerraba las casas"], "«Y el Señor añadía cada día a la iglesia los que habían de ser salvos».", "Hechos 2:46-47"],
    ["f36", 4, "o4", "recordar", "¿Cómo enseñaba Pablo, según Hechos 20:20?", "Públicamente y por las casas", ["Solo en secreto", "Solo en el templo", "Solo por cartas"], "«públicamente y por las casas».", "Hechos 20:20"],
    ["f37", 4, "o4", "aplicar", "¿Qué se hace con los que creen en el grupo de una casa?", "Se los bautiza y se les enseña a obedecer a Cristo", ["Se los deja solos", "Se los envía a otra ciudad", "Se les cobra"], "«públicamente y por las casas».", "Hechos 20:20"],
    ["f38", 4, "o4", "aplicar", "¿Qué se hace cuando el grupo de la casa crece?", "Se multiplica, formando nuevos líderes", ["Se cierra para que no entre nadie más", "Se espera a que se divida solo", "Se deja de reunir"], "«Y el Señor añadía cada día a la iglesia».", "Hechos 2:46-47"],
    ["f39", 4, "o4", "analizar", "¿Por qué tantas iglesias del Nuevo Testamento empezaron en casas?", "Porque una casa abierta permitía reunir a las familias, enseñar y crecer de cerca", ["Porque no tenían interés en reunirse", "Porque las casas eran más importantes que la iglesia", "No empezaron en casas"], "«partiendo el pan en las casas, comían juntos con alegría y sencillez de corazón».", "Hechos 2:46-47"],
    ["f40", 4, "o4", "evaluar", "¿Qué comienzo de una iglesia nueva sigue mejor el ejemplo de Hechos?", "Un grupo en una casa que ora, estudia la Biblia, evangeliza a las familias, bautiza y se multiplica", ["Un templo grande antes de tener discípulos", "Un evento sin seguimiento", "Una reunión solo para creyentes de otras iglesias"], "«públicamente y por las casas».", "Hechos 20:20"],
    // ---- lección 5: formar líderes y organizar la iglesia (10)
    ["f41", 5, "o5", "recordar", "¿Qué debía corregir Tito en Creta?", "Lo deficiente", ["Los libros", "Las cuentas del templo", "Nada"], "«para que corrigieses lo deficiente».", "Tito 1:5"],
    ["f42", 5, "o5", "comprender", "¿Qué tiene una iglesia madura, según la lección?", "Líderes del lugar", ["Un plantador que lo hace todo", "Un edificio grande", "Muchos visitantes"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
    ["f43", 5, "o5", "recordar", "¿Qué ministerios nombra Efesios 4:11?", "Apóstoles, profetas, evangelistas, pastores y maestros", ["Reyes y sacerdotes", "Jueces y escribas", "Soldados y gobernadores"], "«Y él mismo constituyó a unos, apóstoles; a otros, profetas; a otros, evangelistas; a otros, pastores y maestros».", "Efesios 4:11-12"],
    ["f44", 5, "o5", "comprender", "¿Qué hace el plantador con los creyentes, según Efesios 4:12?", "Los prepara para servir en la obra del ministerio", ["Lo hace todo por ellos", "Los deja sin tarea", "Les prohíbe servir"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-12"],
    ["f45", 5, "o5", "aplicar", "¿Cuándo se empieza a formar líderes en una iglesia nueva?", "Desde el principio", ["Cuando el plantador se va", "Después de diez años", "Nunca"], "Formar líderes del lugar desde el principio, como enseña 2 Timoteo 2:2.", "Tito 1:5"],
    ["f46", 5, "o5", "aplicar", "¿Qué orden necesita una iglesia nueva, según la lección?", "Un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras", ["Muchas reglas desde el primer día", "Ningún orden", "El orden copiado de una iglesia grande"], "«para que corrigieses lo deficiente».", "Tito 1:5"],
    ["f47", 5, "o5", "aplicar", "¿Qué relación mantiene una iglesia nueva con la iglesia que la envió?", "Apoyo y rendición de cuentas", ["Ninguna", "Control total", "Competencia"], "Mantener la relación con la iglesia que envió.", "Efesios 4:11-12"],
    ["f48", 5, "o5", "comprender", "¿Qué tres cosas busca lograr con el tiempo una iglesia nueva?", "Sostenerse, gobernarse y extenderse por sí misma", ["Crecer, cerrarse y quedarse igual", "Depender, esperar y pedir", "Construir, vender y mudarse"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-12"],
    ["f49", 5, "o5", "analizar", "¿Por qué el mejor plantador es el que un día ya no hace falta?", "Porque dejó una iglesia con líderes del lugar que sigue sin depender de él", ["Porque abandonó la obra", "Porque fracasó", "No es así"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
    ["f50", 5, "o5", "evaluar", "¿Qué iglesia nueva está mejor organizada?", "Una que forma líderes del lugar, reparte el servicio según los dones y tiene un orden sencillo", ["Una donde el plantador lo decide todo", "Una sin ningún orden", "Una con muchas reglas y pocos discípulos"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-12"],
    // ---- lección 6: una iglesia que se multiplica (10)
    ["f51", 6, "o6", "recordar", "¿Desde qué iglesia fue divulgada la palabra en Macedonia y Acaya, según 1 Tesalonicenses 1:8?", "Desde la iglesia de Tesalónica", ["Desde Roma", "Desde Jerusalén", "Desde Atenas"], "«partiendo de vosotros ha sido divulgada la palabra del Señor».", "1 Tesalonicenses 1:8"],
    ["f52", 6, "o6", "comprender", "¿Qué llegó a ser la iglesia joven de Tesalónica?", "Una iglesia que extiende el evangelio", ["Una iglesia cerrada", "Una iglesia dividida", "Una iglesia sin fe"], "«en todo lugar vuestra fe en Dios se ha extendido».", "1 Tesalonicenses 1:8"],
    ["f53", 6, "o6", "recordar", "¿Desde cuándo participaban los filipenses en el evangelio, según Filipenses 1:5?", "Desde el primer día", ["Desde hacía poco", "Nunca", "Desde el año siguiente"], "«por vuestra comunión en el evangelio, desde el primer día hasta ahora».", "Filipenses 1:5-6"],
    ["f54", 6, "o6", "comprender", "¿De qué estaba persuadido Pablo, según Filipenses 1:6?", "De que el que comenzó la buena obra la perfeccionará", ["De que la iglesia fracasaría", "De que no volvería a verlos", "De que todo dependía de él"], "«el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo».", "Filipenses 1:5-6"],
    ["f55", 6, "o6", "recordar", "¿Quiénes oyeron la palabra cuando Pablo enseñaba en Éfeso, según Hechos 19:10?", "Todos los que habitaban en Asia, judíos y griegos", ["Solo los efesios", "Solo los judíos", "Nadie"], "«todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús».", "Hechos 19:9-10"],
    ["f56", 6, "o6", "aplicar", "¿Qué enseña desde el primer día una iglesia que se multiplica?", "Que la iglesia existe para la misión", ["Que la iglesia existe para sí misma", "Que la misión es para otros", "Nada"], "«partiendo de vosotros ha sido divulgada la palabra del Señor».", "1 Tesalonicenses 1:8"],
    ["f57", 6, "o6", "aplicar", "¿Para qué formar futuros plantadores dentro de la iglesia?", "Para que un día la iglesia pueda enviar un equipo a otro lugar", ["Para que se queden siempre", "Para competir con el pastor", "No hace falta"], "«por vuestra comunión en el evangelio».", "Filipenses 1:5-6"],
    ["f58", 6, "o6", "aplicar", "¿Cómo envía una iglesia a un equipo de plantación?", "Con su bendición, como Antioquía", ["En secreto", "Sin oración", "Como castigo"], "Enviar un equipo con la bendición de la iglesia, como Antioquía.", "1 Tesalonicenses 1:8"],
    ["f59", 6, "o6", "analizar", "¿Por qué el fruto de una iglesia plantada es que plante otras?", "Porque así el evangelio sigue llegando a nuevos lugares", ["Porque así se divide", "Porque la iglesia madre quiere controlarlas", "No es su fruto"], "«todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús».", "Hechos 19:9-10"],
    ["f60", 6, "o6", "evaluar", "¿Qué iglesia sigue mejor el ejemplo de Tesalónica?", "Una que ora por nuevos lugares, forma plantadores, envía equipos y acompaña a sus iglesias hijas sin controlarlas", ["Una que solo cuida su propio crecimiento", "Una que envía equipos y los olvida", "Una que controla todo lo que hacen sus iglesias hijas"], "«partiendo de vosotros ha sido divulgada la palabra del Señor».", "1 Tesalonicenses 1:8"],
  ] as P[]).map(p),
  mini: {
    1: ([
      ["m1-01", 1, "o1", "recordar", "¿Qué dice Pablo de sí mismo y de Apolos en 1 Corintios 3:6?", "Yo planté, Apolos regó", ["Yo regué, Apolos plantó", "Los dos dimos el crecimiento", "Ninguno hizo nada"], "«Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6-7"],
      ["m1-02", 1, "o1", "comprender", "¿Qué es plantar una iglesia, según la lección?", "Formar una comunidad de discípulos en un lugar donde todavía no la hay", ["Construir un edificio", "Abrir una oficina", "Hacer una campaña de un día"], "«edificaré mi iglesia».", "Mateo 16:18"],
      ["m1-03", 1, "o1", "aplicar", "Un plantador quiere que todo gire en torno a su persona. ¿Qué le recuerda la lección?", "Que el único fundamento es Jesucristo", ["Que el fundamento es el plantador", "Que no hace falta fundamento", "Que el fundamento es el dinero"], "«nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo».", "1 Corintios 3:10-11"],
      ["m1-04", 1, "o1", "recordar", "¿Qué pide Pablo a cada uno en 1 Corintios 3:10?", "Que mire cómo sobreedifica", ["Que no edifique", "Que edifique sin cuidado", "Que derribe lo hecho"], "«pero cada uno mire cómo sobreedifica».", "1 Corintios 3:10-11"],
      ["m1-05", 1, "o1", "analizar", "¿Qué tienen en común Mateo 16:18 y 1 Corintios 3:6-7?", "Los dos muestran que la iglesia y su crecimiento son obra de Dios", ["Los dos hablan de dinero", "Los dos dicen que el plantador lo hace todo", "Nada"], "«pero el crecimiento lo ha dado Dios».", "1 Corintios 3:6-7"],
      ["m1-06", 1, "o1", "evaluar", "¿Qué motivo para plantar una iglesia es el mejor?", "Que haya discípulos de Cristo en un lugar donde todavía no hay iglesia", ["Tener una iglesia propia", "Competir con otras iglesias", "Ganar fama"], "«edificaré mi iglesia».", "Mateo 16:18"],
      ["m1-07", 2, "o2", "recordar", "¿Qué hacían los líderes de Antioquía cuando el Espíritu habló?", "Ministraban al Señor y ayunaban", ["Discutían", "Dormían", "Viajaban"], "«Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo».", "Hechos 13:2-3"],
      ["m1-08", 2, "o2", "comprender", "¿Por qué Pablo trabajó con Priscila y Aquila en Corinto?", "Porque eran del mismo oficio", ["Porque eran sus jefes", "Porque no tenía otra cosa que hacer", "Porque le pagaba el templo"], "«y como era del mismo oficio, se quedó con ellos, y trabajaban juntos».", "Hechos 18:3-4"],
      ["m1-09", 2, "o2", "aplicar", "Tu iglesia quiere enviar a alguien a plantar. ¿Qué hace primero?", "Orar, reconocer el llamado y enviarlo con respaldo", ["Enviar al primero que se ofrezca", "Esperar a que alguien se vaya solo", "Pedirle que lo haga sin apoyo"], "«habiendo ayunado y orado, les impusieron las manos y los despidieron».", "Hechos 13:2-3"],
      ["m1-10", 2, "o2", "recordar", "¿Qué hacía Pablo los días de reposo en Corinto?", "Discutía en la sinagoga y persuadía a judíos y a griegos", ["Descansaba sin hablar con nadie", "Viajaba a Atenas", "Hacía tiendas"], "«Y discutía en la sinagoga todos los días de reposo, y persuadía a judíos y a griegos».", "Hechos 18:3-4"],
      ["m1-11", 2, "o2", "analizar", "¿Qué muestra que una iglesia se reuniera en la casa de Priscila y Aquila?", "Que la obra se hizo en equipo y en las casas", ["Que no había creyentes", "Que no tenían iglesia", "Que la casa era un templo oficial"], "«Saludad también a la iglesia de su casa».", "Romanos 16:3-5"],
      ["m1-12", 2, "o2", "evaluar", "¿Qué plantador refleja mejor la lección?", "Uno de buen carácter, enviado por su iglesia, que trabaja en equipo y tiene paciencia", ["Uno brillante que trabaja solo", "Uno que busca resultados rápidos", "Uno sin iglesia que lo respalde"], "«un año y seis meses, enseñándoles la palabra de Dios».", "Hechos 18:11"],
      ["m1-13", 3, "o3", "recordar", "¿Cuándo salió Nehemías a observar los muros?", "De noche", ["Al mediodía", "En una fiesta", "Con todo el pueblo"], "«me levanté de noche».", "Nehemías 2:12-13"],
      ["m1-14", 3, "o3", "comprender", "¿Para qué observó Nehemías los muros antes de presentar su plan?", "Para conocer la necesidad", ["Para presumir", "Porque no tenía nada que hacer", "Para esconderse"], "«observé los muros de Jerusalén que estaban derribados».", "Nehemías 2:12-13"],
      ["m1-15", 3, "o3", "aplicar", "¿Dónde buscar a la gente de un barrio, según la lección?", "En plazas, escuelas, mercados y canchas", ["Solo dentro del templo", "Solo por internet", "En ninguna parte"], "«y en la plaza cada día con los que concurrían».", "Hechos 17:16-17"],
      ["m1-16", 3, "o3", "recordar", "¿Cómo respondió el pueblo a Nehemías?", "Levantémonos y edifiquemos", ["No podemos", "Esperemos", "Que lo haga el rey"], "«Y dijeron: Levantémonos y edifiquemos».", "Nehemías 2:17-18"],
      ["m1-17", 3, "o3", "analizar", "¿Por qué el estudio de la comunidad se acompaña de oración?", "Porque conocer el lugar es también buscar la dirección de Dios para alcanzarlo", ["Porque es una costumbre", "No se acompaña", "Para ocupar el tiempo"], "«su espíritu se enardecía viendo la ciudad entregada a la idolatría».", "Hechos 17:16-17"],
      ["m1-18", 3, "o3", "evaluar", "¿Qué estudio de la comunidad es más completo?", "Uno que conoce a la gente, sus necesidades, las iglesias que hay, los lugares de reunión y a los que están abiertos", ["Uno que solo cuenta casas", "Uno que solo mira el precio de los locales", "Uno hecho sin salir del templo"], "«observé los muros de Jerusalén».", "Nehemías 2:12-13"],
    ] as P[]).map(p),
    2: ([
      ["m2-01", 4, "o4", "recordar", "¿Qué le pidió Lidia a Pablo y a su equipo?", "Que entraran en su casa y se quedaran", ["Que se fueran", "Que le pagaran", "Que no volvieran"], "«entrad en mi casa, y posad».", "Hechos 16:13-15"],
      ["m2-02", 4, "o4", "comprender", "¿Qué muestra la historia de Lidia sobre el comienzo de una iglesia?", "Que una casa abierta puede ser el principio de una iglesia", ["Que hace falta un templo primero", "Que solo los ricos pueden empezar iglesias", "Nada"], "«Si habéis juzgado que yo sea fiel al Señor, entrad en mi casa, y posad».", "Hechos 16:13-15"],
      ["m2-03", 4, "o4", "aplicar", "Un nuevo creyente quiere que su familia conozca a Cristo. ¿Qué propone la lección?", "Un grupo en su casa con la Biblia, la oración, una comida y la amistad", ["Esperar a la próxima campaña", "No decir nada a su familia", "Mandarlos a una iglesia lejana"], "«partiendo el pan en las casas».", "Hechos 2:46-47"],
      ["m2-04", 4, "o4", "recordar", "¿Con qué ánimo comían juntos los creyentes de Jerusalén, según Hechos 2:46?", "Con alegría y sencillez de corazón", ["Con tristeza", "Con miedo", "Con orgullo"], "«comían juntos con alegría y sencillez de corazón».", "Hechos 2:46-47"],
      ["m2-05", 4, "o4", "analizar", "¿Por qué se complementan las reuniones públicas y las casas?", "Porque en público se anuncia a muchos y en las casas se cuida y se enseña de cerca", ["Porque una reemplaza a la otra", "Porque las casas no sirven", "No se complementan"], "«públicamente y por las casas».", "Hechos 20:20"],
      ["m2-06", 4, "o4", "evaluar", "¿Cuándo se pasa a reuniones públicas, según la lección?", "Cuando hay un grupo de discípulos", ["El primer día", "Nunca", "Cuando hay dinero para un local"], "«públicamente y por las casas».", "Hechos 20:20"],
      ["m2-07", 5, "o5", "recordar", "¿Dónde debía establecer ancianos Tito?", "En cada ciudad de Creta", ["Solo en Roma", "En Jerusalén", "En ninguna parte"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
      ["m2-08", 5, "o5", "comprender", "¿Por qué una iglesia nueva no debe depender siempre del plantador?", "Porque necesita líderes del lugar que la guíen", ["Porque el plantador no sirve", "Porque no hace falta liderazgo", "Sí debe depender"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
      ["m2-09", 5, "o5", "aplicar", "En una iglesia nueva, el plantador lo hace todo. ¿Qué enseña Efesios 4:12?", "Que debe preparar a cada creyente para servir", ["Que está bien así", "Que nadie más puede servir", "Que debe cerrar la iglesia"], "«a fin de perfeccionar a los santos para la obra del ministerio».", "Efesios 4:11-12"],
      ["m2-10", 5, "o5", "recordar", "¿Para qué es la obra del ministerio, según Efesios 4:12?", "Para la edificación del cuerpo de Cristo", ["Para la fama del líder", "Para juntar dinero", "Para dividir la iglesia"], "«para la edificación del cuerpo de Cristo».", "Efesios 4:11-12"],
      ["m2-11", 5, "o5", "analizar", "¿Qué cuestión sobre los líderes no decide esta materia?", "Quién puede ejercer cada cargo, que es un punto de la declaración de fe por confirmar", ["Que hay que formar líderes", "Que hay que repartir el servicio", "Que hay que tener cuentas claras"], "Aquí se estudia la tarea de formar líderes.", "Tito 1:5"],
      ["m2-12", 5, "o5", "evaluar", "¿Qué muestra mejor que una iglesia nueva madura?", "Que se sostiene, se gobierna y se extiende por sí misma, con líderes del lugar", ["Que el plantador sigue haciendo todo", "Que tiene un edificio", "Que nunca cambia"], "«y establecieses ancianos en cada ciudad».", "Tito 1:5"],
      ["m2-13", 6, "o6", "recordar", "¿Hasta dónde se extendió la fe de los tesalonicenses, según 1 Tesalonicenses 1:8?", "A todo lugar", ["Solo a su casa", "Solo a Tesalónica", "A ninguna parte"], "«en todo lugar vuestra fe en Dios se ha extendido».", "1 Tesalonicenses 1:8"],
      ["m2-14", 6, "o6", "comprender", "¿Qué confianza tenía Pablo sobre la iglesia de Filipos?", "Que Dios perfeccionaría la buena obra que comenzó en ellos", ["Que la iglesia se perdería", "Que todo dependía de su presencia", "Que no tenía futuro"], "«el que comenzó en vosotros la buena obra, la perfeccionará».", "Filipenses 1:5-6"],
      ["m2-15", 6, "o6", "aplicar", "Una iglesia de cinco años quiere crecer. ¿Qué propone la lección además de crecer?", "Orar por nuevos lugares y formar plantadores para enviar", ["Solo agrandar su edificio", "Cerrarse para cuidar a los suyos", "Esperar que otros planten"], "«partiendo de vosotros ha sido divulgada la palabra del Señor».", "1 Tesalonicenses 1:8"],
      ["m2-16", 6, "o6", "recordar", "¿Durante cuánto tiempo enseñó Pablo en la escuela de Tiranno?", "Dos años", ["Dos semanas", "Diez años", "Un día"], "«Así continuó por espacio de dos años».", "Hechos 19:9-10"],
      ["m2-17", 6, "o6", "analizar", "¿Por qué la iglesia madre no debe controlar a su iglesia hija?", "Porque la iglesia hija debe crecer hacia sostenerse, gobernarse y extenderse por sí misma", ["Porque no le importa", "Porque debe abandonarla", "Sí debe controlarla"], "Seguir unida con apoyo y amistad, sin controlarla.", "Filipenses 1:5-6"],
      ["m2-18", 6, "o6", "evaluar", "¿Qué iglesia ha dado el fruto que busca la plantación?", "Una que ya plantó otra iglesia y la acompaña", ["Una que creció mucho pero no envió a nadie", "Una que se dividió", "Una que dejó de evangelizar"], "«partiendo de vosotros ha sido divulgada la palabra del Señor».", "1 Tesalonicenses 1:8"],
    ] as P[]).map(p),
  },
  escritas: [
    {
      id: "evangelismo-misiones-5-e1",
      tipo: "corta",
      pregunta: "Explica por qué se plantan iglesias y quién edifica la iglesia y da el crecimiento.",
      ideas: [
        { id: "cristo", peso: 25, texto: "Cristo edifica su iglesia.", formas: ["edificare mi iglesia", "cristo edifica", "obra de cristo", "es de cristo"] },
        { id: "crecimiento", peso: 25, texto: "Dios da el crecimiento.", formas: ["da el crecimiento", "crecimiento", "planto", "rego"] },
        { id: "fundamento", peso: 20, texto: "Jesucristo es el único fundamento.", formas: ["fundamento"] },
        { id: "porque", peso: 20, texto: "Para llegar a lugares sin iglesia; así se extendió el evangelio.", formas: ["cada ciudad", "barrios", "sin iglesia", "todavia no", "nuevos creyentes", "nuevo testamento"] },
      ],
      citas: ["Mateo 16:18", "1 Corintios 3:6-7", "1 Corintios 3:6", "1 Corintios 3:10-11", "1 Corintios 3:11"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Plantamos iglesias porque así se extendió el evangelio en el Nuevo Testamento, y porque una iglesia nueva llega a barrios que todavía no tienen una. Pero la obra es de Cristo, que dijo: edificaré mi iglesia (Mateo 16:18). El plantador siembra y riega, Dios da el crecimiento, y el único fundamento es Jesucristo.",
    },
    {
      id: "evangelismo-misiones-5-e2",
      tipo: "corta",
      pregunta: "Explica, con Nehemías y con Pablo en Atenas, por qué hay que conocer un lugar antes de plantar una iglesia y qué se observa.",
      ideas: [
        { id: "nehemias", peso: 20, texto: "Nehemías observó los muros antes de edificar.", formas: ["nehemias", "muros", "de noche"] },
        { id: "pablo", peso: 20, texto: "Pablo observó Atenas y habló en la plaza.", formas: ["atenas", "plaza", "idolatria"] },
        { id: "necesidad", peso: 20, texto: "Se conoce la necesidad antes de actuar.", formas: ["necesidad*", "antes de actuar", "conoce la"] },
        { id: "observar", peso: 30, texto: "Quiénes viven, qué necesitan, qué iglesias hay, dónde se reúnen y quiénes están abiertos.", formas: ["quienes viven", "iglesias hay", "donde se reune", "abiertos", "familias", "lenguas"] },
      ],
      citas: ["Nehemías 2:12-13", "Nehemías 2:13", "Nehemías 2:17-18", "Hechos 17:16-17", "Hechos 17:16"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Nehemías salió de noche a observar los muros antes de invitar a edificar, y en Atenas Pablo vio la ciudad entregada a la idolatría y habló en la plaza (Hechos 17:16-17). Así se conoce la necesidad antes de actuar: quiénes viven allí, qué necesitan, qué iglesias hay, dónde se reúne la gente y quiénes están abiertos.",
    },
    {
      id: "evangelismo-misiones-5-e3",
      tipo: "corta",
      pregunta: "Explica cómo se forman líderes y se organiza una iglesia nueva para que no dependa del plantador.",
      ideas: [
        { id: "lideres", peso: 25, texto: "Líderes del lugar desde el principio.", formas: ["lideres del lugar", "ancianos", "desde el principio", "formar lideres"] },
        { id: "santos", peso: 25, texto: "Preparar a cada creyente para servir.", formas: ["perfeccionar", "santos", "cada creyente", "para servir", "dones"] },
        { id: "orden", peso: 20, texto: "Un orden sencillo, con reuniones y cuentas claras.", formas: ["orden", "cuentas claras", "reuniones", "sencillo"] },
        { id: "autonomia", peso: 20, texto: "Sostenerse, gobernarse y extenderse por sí misma.", formas: ["sostenerse", "gobernarse", "extenderse", "por si misma"] },
      ],
      citas: ["Tito 1:5", "Efesios 4:11-12", "Efesios 4:12", "2 Timoteo 2:2", "Hechos 14:23"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Desde el principio se forman líderes del lugar, como Tito, que estableció ancianos en cada ciudad (Tito 1:5). El plantador no hace todo: prepara a los santos para la obra del ministerio y reparte el servicio según los dones. La iglesia tiene un orden sencillo, con reuniones y cuentas claras, y camina hacia sostenerse, gobernarse y extenderse por sí misma.",
    },
    {
      id: "evangelismo-misiones-5-e4",
      tipo: "breve",
      pregunta:
        "Describe cómo empezarías a plantar una iglesia en un barrio que no tiene una: el equipo y la iglesia que te envía, el estudio del lugar, los primeros grupos en las casas, la formación de líderes y cómo sembrarías desde el principio la multiplicación. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "equipo", peso: 20, texto: "El equipo y la iglesia que envía.", formas: ["equipo", "me enviaria", "nos enviaria", "enviado", "iglesia madre"] },
        { id: "estudio", peso: 20, texto: "El estudio del lugar.", formas: ["estudio del barrio", "estudio", "observar*", "recorrer*", "necesidades"] },
        { id: "casas", peso: 20, texto: "Los primeros grupos en las casas.", formas: ["casa", "en casas", "grupo"] },
        { id: "lideres", peso: 20, texto: "La formación de líderes.", formas: ["lideres", "formariamos", "ancianos"] },
        { id: "multiplicar", peso: 20, texto: "La multiplicación desde el principio.", formas: ["multiplic*", "plantar otra", "otra iglesia", "nuevos lugares"] },
      ],
      basta: 85,
      citas: ["Hechos 13:2-3", "Nehemías 2:12-13", "Nehemías 2:17-18", "Hechos 17:16-17", "Hechos 16:13-15", "Hechos 2:46-47", "Hechos 20:20", "Tito 1:5", "Efesios 4:11-12", "1 Tesalonicenses 1:8", "Mateo 16:18", "1 Corintios 3:6-7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "Primero buscaría la confirmación del llamado con mi iglesia, que me enviaría con oración, como Antioquía envió a Bernabé y a Saulo (Hechos 13:2-3), y formaría un equipo de tres familias. Durante dos meses haríamos un estudio del barrio: recorreríamos sus calles orando, conoceríamos quiénes viven allí, qué necesidades tienen y qué iglesias hay cerca, como Nehemías, que observó los muros antes de edificar. Después abriríamos un grupo en la casa de una familia del equipo, con la Biblia, oración y comida, e invitaríamos a los vecinos que se muestren abiertos y a sus familias, como Lidia abrió su casa en Filipos. Bautizaríamos a los que crean y les enseñaríamos a obedecer a Cristo, y cuando el grupo creciera abriríamos otro. Desde el principio formaríamos líderes del barrio, para que la iglesia no dependa de nosotros (Tito 1:5). Y enseñaríamos desde el primer día que la iglesia existe para la misión, orando por nuevos lugares, para que un día pueda plantar otra iglesia, como Tesalónica, desde donde se divulgó la palabra del Señor.",
    },
    {
      id: "evangelismo-misiones-5-e5",
      tipo: "breve",
      pregunta:
        "Un hermano propone plantar una iglesia nueva alquilando primero un local grande y haciendo un culto con mucha publicidad, con él como único líder. Evalúa esta propuesta con lo aprendido en la materia y propón otro camino. Usa al menos dos citas bíblicas.",
      ideas: [
        { id: "fundamento", peso: 20, texto: "La obra es de Cristo y su fundamento, no una persona.", formas: ["fundamento", "edificare", "obra de cristo", "es de cristo"] },
        { id: "equipo", peso: 20, texto: "No un solo líder: un equipo y líderes del lugar.", formas: ["equipo", "ancianos", "lideres del lugar"] },
        { id: "estudio", peso: 20, texto: "Conocer el lugar primero.", formas: ["estudio", "observo", "observar", "necesidades"] },
        { id: "casas", peso: 20, texto: "Empezar en las casas, con discípulos.", formas: ["casa", "en casas", "grupo pequeño", "discipul*"] },
        { id: "alternativa", peso: 20, texto: "Una propuesta mejor.", formas: ["propongo", "propondria", "en su lugar", "otro camino"] },
      ],
      basta: 85,
      citas: ["Mateo 16:18", "1 Corintios 3:11", "1 Corintios 3:10-11", "Tito 1:5", "Nehemías 2:12-13", "Hechos 16:13-15", "Hechos 13:2-3", "Efesios 4:11-12", "Hechos 20:20", "1 Corintios 3:6-7"],
      pesoCita: 10,
      errores: [],
      modelo:
        "La propuesta tiene entusiasmo, pero se apoya demasiado en un local, en la publicidad y en una sola persona. Una iglesia es obra de Cristo, que dijo: edificaré mi iglesia (Mateo 16:18), y su único fundamento es Jesucristo, no un líder (1 Corintios 3:11). Si todo depende de un solo líder, la iglesia se cae cuando él falta; Pablo, en cambio, trabajaba en equipo y dejaba ancianos del lugar en cada ciudad (Tito 1:5). Además, empezar con un gran evento sin mirar el barrio es construir a ciegas, mientras que Nehemías observó los muros antes de edificar. En su lugar propongo otro camino: formar un equipo enviado por la iglesia, hacer primero un estudio del barrio con oración, empezar con un grupo pequeño en una casa, como en Filipos con Lidia, hacer discípulos y bautizarlos, y formar desde el principio líderes del lugar. Cuando haya un grupo de discípulos, podrán reunirse en público y, si hace falta, alquilar un local. Así la iglesia crecerá sobre Cristo y no sobre la publicidad.",
    },
  ],
  // el escrito breve de la materia (80 a 300 palabras)
  breve: {
    id: "evangelismo-misiones-5-b1",
    tipo: "breve",
    pregunta:
      "Escribe la visión y el plan de un año para que tu iglesia o tu grupo plante una iglesia hija: dónde, quiénes irán, cómo los enviarán, cómo empezarán y cómo seguirá unida la iglesia madre sin controlarla. Usa al menos dos citas bíblicas.",
    ideas: [
      { id: "donde", peso: 20, texto: "Dónde plantarán.", formas: ["el barrio de", "la colonia", "la ciudad de", "el pueblo de", "zona"] },
      { id: "quienes", peso: 20, texto: "Quiénes irán.", formas: ["equipo", "plantador", "tres familias", "dos familias", "iran"] },
      { id: "enviar", peso: 20, texto: "Cómo los enviarán.", formas: ["enviaremos", "enviar", "ayuno", "bendicion", "impondremos las manos"] },
      { id: "empezar", peso: 20, texto: "Cómo empezarán.", formas: ["casa", "en casas", "grupo", "grupos"] },
      { id: "madre", peso: 20, texto: "La iglesia madre sigue unida sin controlar.", formas: ["sin controlar*", "apoy*", "acompañ*", "amistad"] },
    ],
    basta: 85,
    citas: ["Hechos 13:2-3", "Filipenses 1:6", "Filipenses 1:5-6", "1 Tesalonicenses 1:8", "Nehemías 2:12-13", "Mateo 16:18", "Hechos 16:13-15", "Tito 1:5"],
    pesoCita: 10,
    errores: [],
    modelo:
      "Visión: que el barrio de Las Palmas, donde no hay ninguna iglesia, tenga una comunidad de discípulos de Cristo. Durante el primer trimestre oraremos cada semana por ese barrio y lo recorreremos para conocer a sus familias y sus necesidades, como hizo Nehemías antes de edificar. En el segundo trimestre escogeremos un equipo de tres familias de nuestra iglesia, de buen testimonio, y un plantador con un llamado confirmado; los enviaremos con ayuno y oración, como Antioquía envió a Bernabé y a Saulo (Hechos 13:2-3). En el tercer trimestre empezarán dos grupos en casas del barrio, con estudio de la Biblia, oración y comida, invitando a los vecinos y a sus familias. En el cuarto trimestre se bautizará a los que crean y se formarán los primeros líderes del lugar. Nuestra iglesia seguirá unida a la iglesia hija con oración, una ofrenda mensual y amistad, sin controlarla, para que llegue a sostenerse, gobernarse y extenderse por sí misma. Confiamos en que el que comenzó la buena obra la perfeccionará (Filipenses 1:6).",
  },
};
