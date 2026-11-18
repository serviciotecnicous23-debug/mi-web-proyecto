/**
 * Los trabajos finales de las especialidades (docs/academia.md, «El certificado de especialidad»). SOLO SERVIDOR: la
 * consigna, la clave de corrección y la respuesta modelo. Cada especialidad tiene el suyo cuando sus cinco materias
 * están publicadas; integra lo aprendido en todas. Los ids nunca se reusan.
 */
import type { EspecialidadId } from "@shared/academia";
import type { ClaveEscrita } from "../academia-correccion";

const TRABAJO_EVANGELISMO_MISIONES: ClaveEscrita = {
  id: "trabajo-evangelismo-misiones",
  tipo: "trabajo",
  pregunta:
    "Escribe un plan de evangelismo y misiones de un año para tu iglesia o tu grupo que use lo aprendido en las cinco materias de la especialidad: el corazón y el mensaje del evangelista, una campaña o un evento evangelístico con su seguimiento, la base bíblica de la misión, cómo alcanzarán a personas de otra cultura y cómo plantarán o apoyarán una iglesia nueva. Explica cada parte con citas bíblicas y di cómo evaluarán el fruto.",
  ideas: [
    { id: "corazon", peso: 15, texto: "El corazón y el mensaje del evangelista: el amor de Cristo, la oración y el evangelio claro.", formas: ["amor de cristo", "embajador*", "oraremos por", "orar por", "lista de oracion", "una lista", "murio por", "arrepent*"] },
    { id: "campana", peso: 20, texto: "Una campaña o un evento, con preparación, un llamado honesto y seguimiento.", formas: ["campaña", "cruzada", "evento evangel*", "consejeros", "seguimiento", "llamado honesto"] },
    { id: "mision", peso: 15, texto: "La base bíblica: la misión empieza en Dios y es para todas las naciones.", formas: ["todas las naciones", "todas las familias", "me envio", "abraham", "gran comision", "mision de dios"] },
    { id: "cultura", peso: 20, texto: "Alcanzar a personas de otra cultura: servir, hablar su lengua y formar líderes de esa cultura.", formas: ["otra cultura", "inmigrantes", "extranjero*", "su lengua", "otra lengua", "idioma"] },
    { id: "plantar", peso: 20, texto: "Plantar o apoyar una iglesia nueva.", formas: ["plantaremos", "plantar una", "plantar iglesia*", "plantacion de", "iglesia hija", "iglesia nueva", "nueva iglesia", "nueva congregacion"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el fruto con integridad.", formas: ["evaluaremos", "evaluar", "fruto que permanezca", "integridad", "rendir cuentas", "rendiremos cuentas"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "2 Corintios 5:14", "2 Corintios 5:20", "2 Corintios 5:14-20", "Proverbios 11:30", "1 Corintios 15:3-4", "Marcos 1:15", "1 Corintios 9:22",
    "Hechos 4:29-31", "2 Timoteo 2:2", "2 Timoteo 4:5", "Mateo 9:35-38", "Lucas 14:28", "Juan 17:21", "1 Corintios 2:1-5", "Juan 15:16",
    "1 Tesalonicenses 2:3-5", "2 Corintios 8:21", "Juan 20:21", "Génesis 12:3", "Mateo 28:18-20", "Hechos 1:8", "Hechos 13:1-3", "Hechos 13:3",
    "Romanos 15:20", "Apocalipsis 7:9", "Hechos 10:34-35", "Juan 1:14", "Hechos 15:19-20", "Deuteronomio 10:18-19", "Mateo 25:35",
    "Mateo 16:18", "1 Corintios 3:6", "1 Corintios 3:6-7", "Nehemías 2:17-18", "Hechos 16:13-15", "Tito 1:5", "1 Tesalonicenses 1:8",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan de evangelismo y misiones para nuestra iglesia durante el próximo año. Primero, el corazón: queremos evangelizar movidos por el amor de Cristo, que nos constriñe, como embajadores que ruegan a las personas que se reconcilien con Dios (2 Corintios 5:14-20). Cada miembro escribirá una lista de tres a cinco personas y oraremos por ellas cada semana. En enero daremos un taller para que todos sepan explicar el evangelio con claridad: Cristo murió por nuestros pecados y resucitó, y nos llama a arrepentirnos y creer (1 Corintios 15:3-4), sin prometer riquezas y sin dar por salvo a nadie solo porque repitió unas palabras. Segundo, una campaña: en junio haremos con otras dos iglesias una campaña evangelística en el parque del barrio. Nos prepararemos con tres meses de oración unida y un comité, calcularemos el presupuesto (Lucas 14:28) y pediremos los permisos de la ciudad. El llamado será honesto, sin presión, y prepararemos a veinte consejeros. Cada persona que responda recibirá una visita en los días siguientes y entrará en un grupo de nuevos creyentes, porque buscamos un fruto que permanezca (Juan 15:16). Tercero, la base bíblica: en febrero enseñaremos una serie sobre la misión de Dios, desde la promesa a Abraham de que en él serían benditas todas las familias de la tierra (Génesis 12:3) hasta la multitud de todas las naciones que adora al Cordero (Apocalipsis 7:9), recordando que Jesús nos envía como el Padre lo envió (Juan 20:21). Cuarto, otra cultura: en nuestra ciudad viven familias inmigrantes que hablan otra lengua. Las conoceremos, abriremos clases de idioma, las ayudaremos con trámites y ofreceremos un estudio bíblico en su lengua, porque Dios ama al extranjero (Deuteronomio 10:18-19). Con el tiempo formaremos líderes de su propia cultura. Quinto, una iglesia nueva: oraremos por el barrio de Las Flores, donde no hay iglesia, y lo recorreremos para conocer sus necesidades, como Nehemías observó los muros antes de edificar. En el segundo semestre enviaremos con ayuno y oración a un equipo de dos familias para abrir un grupo en una casa (Hechos 13:3), que con el tiempo llegue a ser una iglesia hija con líderes del lugar. Por último, evaluaremos cada trimestre con integridad cuántas personas siguen en la iglesia meses después, si las cuentas están claras y qué aprendimos, porque procuramos hacer las cosas honradamente delante de Dios y de los hombres (2 Corintios 8:21). Todo lo encomendamos al Señor, que es quien da el crecimiento (1 Corintios 3:6).",
};

const TRABAJO_ALABANZA: ClaveEscrita = {
  id: "trabajo-alabanza",
  tipo: "trabajo",
  pregunta:
    "Escribe el plan de un año para el ministerio de alabanza de tu iglesia que use lo aprendido en las cinco materias de la especialidad: la base bíblica de la adoración, la vida de los que sirven, cómo escogerán los cantos y prepararán los cultos, los ensayos y el equipo, qué aprenderán de la historia del canto de la iglesia y cómo cuidarán el sonido y la técnica. Explica cada parte con citas bíblicas y di cómo evaluarán el ministerio.",
  ideas: [
    { id: "teologia", peso: 15, texto: "La base: adorar en espíritu y en verdad, con Dios en el centro y con toda la vida.", formas: ["espiritu y en verdad", "en espiritu", "sacrificio vivo", "dios en el centro", "toda la vida"] },
    { id: "vida", peso: 20, texto: "La vida de los que sirven: santidad, humildad y vida devocional.", formas: ["vida devocional", "santidad", "humildad", "manos limpias", "corazon puro", "a solas con dios"] },
    { id: "dirigir", peso: 20, texto: "Escoger los cantos y preparar el culto, los ensayos y el equipo.", formas: ["escogeremos", "escoger los cantos", "los ensayos", "con el pastor", "formaremos"] },
    { id: "historia", peso: 15, texto: "Aprender de la historia: cantos antiguos y nuevos, en la lengua del pueblo.", formas: ["himnos", "lo antiguo y lo nuevo", "antiguos y nuevos", "la historia", "la reforma", "generacion a generacion"] },
    { id: "tecnica", peso: 20, texto: "El sonido y la técnica: claridad, volumen pensado en todos, seguridad y licencias.", formas: ["el sonido", "tecnicos", "el volumen", "licencias", "seguridad", "proyeccion"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el ministerio.", formas: ["evaluaremos", "evaluar", "cada trimestre", "rendiremos cuentas", "revisaremos"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "Juan 4:23-24", "Juan 4:24", "Romanos 12:1", "Romanos 12:1-2", "Apocalipsis 4:11", "Colosenses 3:16", "Salmos 24:3-4", "Salmos 24:4",
    "1 Samuel 16:7", "Juan 3:30", "Marcos 1:35", "Lucas 10:42", "1 Corintios 12:12", "Hebreos 13:17", "Salmos 33:3", "1 Crónicas 15:22",
    "1 Corintios 14:26", "1 Corintios 14:40", "1 Crónicas 25:7-8", "2 Timoteo 2:2", "Santiago 3:16", "Mateo 18:15", "Salmos 145:4",
    "Salmos 78:4", "Apocalipsis 15:3", "1 Corintios 14:15", "1 Corintios 14:8", "1 Corintios 14:9", "Éxodo 31:3", "Filipenses 2:4",
    "Romanos 13:7", "Habacuc 2:2", "Lucas 16:10", "Colosenses 3:23", "Proverbios 21:5",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan del ministerio de alabanza para el próximo año. Primero, la base: queremos adorar en espíritu y en verdad, porque el Padre busca adoradores así (Juan 4:23-24). En enero enseñaremos al equipo y a la iglesia que Dios es el centro del culto, que lo que cantamos tiene que decir lo que la Biblia dice de él y que la adoración abarca toda la vida, como un sacrificio vivo (Romanos 12:1). Segundo, la vida de los que sirven: antes que la música cuidaremos el corazón, porque Dios busca manos limpias y corazón puro (Salmos 24:4). Cada miembro del equipo tendrá una vida devocional constante, con un tiempo a solas con Dios cada día, como Jesús, que oraba muy de mañana (Marcos 1:35), y cultivaremos la humildad: es necesario que Cristo crezca y que nosotros menguemos. Si alguno cae, lo acompañaremos con los pastores para su restauración. Tercero, la dirección: escogeremos los cantos con cinco preguntas, si dicen la verdad, si ponen a Cristo en el centro, si el pueblo puede cantarlos, si sirven al tema y si hay equilibrio, para que todo sea para edificación. Prepararemos cada culto con el pastor y enviaremos la lista al equipo con anticipación; los ensayos empezarán con oración y terminarán a tiempo, para hacerlo bien y con júbilo (Salmos 33:3). Formaremos a dos nuevos músicos y a un nuevo director junto a los que tienen experiencia, para que puedan enseñar a otros (2 Timoteo 2:2), y los conflictos se hablarán a solas. Cuarto, la historia: cantaremos himnos antiguos y cantos nuevos, porque en el cielo se canta el cántico de Moisés y el del Cordero (Apocalipsis 15:3). Una vez al mes explicaremos la historia de un himno, como los de la Reforma o los de los avivamientos, para que la herencia pase de generación a generación (Salmos 145:4). Quinto, el sonido: los técnicos llegarán temprano para la prueba de sonido y cuidarán que la letra y la voz que guía se entiendan, porque una trompeta con sonido incierto no prepara a nadie (1 Corintios 14:8). Decidiremos el volumen pensando en todos, también en los ancianos y en los niños (Filipenses 2:4), seguiremos normas de seguridad con los cables y los enchufes, y la iglesia tendrá las licencias para proyectar y transmitir los cantos, porque hay que pagar a todos lo que se debe (Romanos 13:7). Por último, evaluaremos el ministerio cada trimestre con los pastores: si el pueblo canta, si el equipo crece en su vida con Dios y si el sonido ayuda, y rendiremos cuentas con humildad. Todo lo haremos de corazón, como para el Señor (Colosenses 3:23).",
};

const TRABAJO_INTERCESION: ClaveEscrita = {
  id: "trabajo-intercesion",
  tipo: "trabajo",
  pregunta:
    "Escribe el plan de un año para el ministerio de intercesión de tu iglesia que use lo aprendido en las cinco materias de la especialidad: la base bíblica de la oración, por quiénes y cómo intercederán, cómo practicarán el ayuno cuidando la salud, cómo enfrentarán la guerra espiritual con equilibrio, cómo orarán por avivamiento y cómo cuidarán lo que se les confía. Explica cada parte con citas bíblicas y di cómo evaluarán el ministerio.",
  ideas: [
    { id: "teologia", peso: 15, texto: "La base: orar al Padre, por Cristo, con la ayuda del Espíritu, conforme a la voluntad de Dios.", formas: ["al padre", "por medio de cristo", "en el nombre de jesus", "su voluntad", "voluntad de dios", "clama a mi", "dios que oye"] },
    { id: "intercesion", peso: 20, texto: "Por quiénes y cómo: las autoridades, la iglesia, los perdidos y los enfermos, con una lista y con perseverancia.", formas: ["autoridades", "por todos los hombres", "en la brecha", "lista de oracion", "por los perdidos", "persever*", "por los enfermos"] },
    { id: "ayuno", peso: 15, texto: "El ayuno con propósito, en secreto y cuidando la salud.", formas: ["ayuno", "ayunaremos", "ayunar", "medico"] },
    { id: "guerra", peso: 15, texto: "La guerra espiritual con equilibrio: sometidos a Dios, con la Palabra, bajo los pastores y sin miedo.", formas: ["guerra espiritual", "resistid al diablo", "resistiremos", "la armadura", "someteos", "sangre y carne", "bajo los pastores", "con equilibrio"] },
    { id: "avivamiento", peso: 15, texto: "Orar por avivamiento con humildad y confesión, y reconocerlo por sus frutos.", formas: ["avivamiento", "se humillare", "por sus frutos", "buscar su rostro"] },
    { id: "cuidado", peso: 10, texto: "Guardar lo que se confía en oración y cuidar a los intercesores.", formas: ["confidencial*", "guardaremos", "chisme*", "lo que se nos confie", "secreto", "discre*"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el ministerio.", formas: ["evaluaremos", "evaluar", "cada trimestre", "rendiremos cuentas", "revisaremos"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "Jeremías 33:3", "Efesios 2:18", "1 Juan 5:14", "1 Juan 5:14-15", "Mateo 6:9-10", "Mateo 26:39", "Lucas 18:1", "1 Timoteo 2:1",
    "1 Timoteo 2:1-2", "Ezequiel 22:30", "Santiago 5:16", "Colosenses 4:12", "Mateo 9:38", "Mateo 5:44", "Proverbios 11:13",
    "Isaías 58:6", "Isaías 58:6-7", "Mateo 6:16-18", "Mateo 6:17-18", "1 Corintios 6:19-20", "Santiago 4:7", "Efesios 6:12",
    "Efesios 6:18", "Efesios 6:10-18", "2 Timoteo 1:7", "1 Juan 4:1", "2 Crónicas 7:14", "Mateo 7:16", "Hechos 4:31",
    "Hechos 4:29-31", "Isaías 62:6-7", "Mateo 18:19-20", "Hebreos 7:25",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan del ministerio de intercesión para el próximo año. Primero, la base: enseñaremos al equipo que oramos a un Dios que oye y que nos invita: clama a mí, y yo te responderé (Jeremías 33:3). Oraremos al Padre, por medio de Cristo y con la ayuda del Espíritu (Efesios 2:18), buscando su voluntad más que la nuestra, como Jesús en Getsemaní, y sin desmayar cuando la respuesta tarde (Lucas 18:1). Segundo, la intercesión: nos pondremos en la brecha (Ezequiel 22:30) por todos los hombres, como pide 1 Timoteo 2:1-2: por las autoridades de la ciudad, por los pastores y los obreros, por los enfermos, por los que no conocen a Cristo y aun por los que nos persiguen. Tendremos una lista de oración que se actualizará cada mes, y oraremos con perseverancia y con peticiones concretas, como Epafras (Colosenses 4:12). Habrá una reunión de intercesión cada semana y una cadena de oración por turnos el primer sábado de cada mes. Tercero, el ayuno: una vez al mes invitaremos a la iglesia a un día de ayuno con propósito, en secreto y unido a la misericordia, porque el ayuno que Dios escogió es desatar las ligaduras de impiedad y partir el pan con el hambriento (Isaías 58:6-7); lo que se ahorre en comida irá a familias necesitadas. Cada uno ayunará según su salud: quien tenga una enfermedad, tome medicinas o esté embarazada consultará primero a su médico, porque el cuerpo es templo del Espíritu Santo (1 Corintios 6:19-20). Cuarto, la guerra espiritual: la enfrentaremos con equilibrio, sabiendo que no tenemos lucha contra sangre y carne (Efesios 6:12) y que la victoria es de Cristo. Primero nos someteremos a Dios y después resistiremos al diablo (Santiago 4:7), con la armadura de Dios y la Palabra, sin miedo y sin arrogancia, porque no nos ha dado Dios espíritu de cobardía (2 Timoteo 1:7). No usaremos métodos que la Biblia no enseña, lo probaremos todo por la Escritura, y cualquier caso de lucha espiritual se atenderá bajo los pastores, sin espectáculo y nunca a solas con un menor; a quien necesite un médico o consejería lo animaremos a buscarlo. Quinto, el avivamiento: como los moravos y la calle Fulton, oraremos juntos por un avivamiento, empezando por nosotros mismos, porque si se humillare mi pueblo y orare, Dios oirá (2 Crónicas 7:14). Pediremos valor para anunciar a Cristo, como la iglesia de Hechos 4, y no fabricaremos emociones: por sus frutos los conoceréis (Mateo 7:16). Sexto, el cuidado: lo que se nos confíe en oración lo guardaremos con fidelidad, porque el que anda en chismes descubre el secreto (Proverbios 11:13), y cuidaremos a los intercesores para que no se agoten, con descanso y acompañamiento. Por último, evaluaremos el ministerio cada trimestre con los pastores: cuántos participan, qué respuestas de oración anotamos y cómo crecen el amor y la santidad, y rendiremos cuentas con humildad, sabiendo que Cristo vive siempre para interceder por los suyos (Hebreos 7:25).",
};

const TRABAJO_PASTORAL: ClaveEscrita = {
  id: "trabajo-pastoral",
  tipo: "trabajo",
  pregunta:
    "Escribe el plan de un año para el cuidado pastoral de tu iglesia que use lo aprendido en las cinco materias de la especialidad: cómo ejercerás el oficio de pastor, sirviendo y con un equipo; cómo aconsejarás y cuándo derivarás; cómo celebrarás las ordenanzas y las ceremonias; cómo visitarás y cuidarás al rebaño; y cómo planificarás la predicación. Explica cada parte con citas bíblicas y di cómo evaluarás el plan.",
  ideas: [
    { id: "oficio", peso: 15, texto: "El oficio pastoral: apacentar sin señorear, con un equipo y rindiendo cuentas.", formas: ["apacentar", "apacentare", "sin senorear", "no como teniendo senorio", "siervo", "equipo pastoral", "un equipo", "rendire cuentas", "rendir cuentas", "la iglesia del senor"] },
    { id: "consejeria", peso: 20, texto: "Aconsejar con la Palabra, guardar la confidencia con sus límites y derivar cuando haga falta.", formas: ["consejeria", "aconsejar*", "aconsejare", "derivar*", "derivare", "confidencia*", "profesional", "988"] },
    { id: "ordenanzas", peso: 15, texto: "Celebrar el bautismo y la Santa Cena con orden, y también las ceremonias.", formas: ["bautismo", "bautizaremos", "santa cena", "la cena", "ordenanzas", "boda", "funeral", "presentacion de ninos"] },
    { id: "visitacion", peso: 20, texto: "Visitar y cuidar al rebaño: el mapa, los enfermos, los ancianos, los presos y los que se alejan.", formas: ["visita*", "mapa del rebano", "enfermos", "hospital", "ancianos", "presos", "oveja perdida", "los que se alejan", "plan de cuidado"] },
    { id: "predicacion", peso: 20, texto: "Planificar la predicación para anunciar todo el consejo de Dios.", formas: ["predicacion", "predicare", "todo el consejo", "plan de predicacion", "series"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el plan.", formas: ["evaluaremos", "evaluare", "evaluar", "cada trimestre", "revisaremos", "revisare"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "Hechos 20:28", "1 Pedro 5:2-3", "Mateo 20:28", "Éxodo 18:17-18", "Mateo 18:15", "Gálatas 6:1", "Hechos 20:29-31",
    "Colosenses 1:28", "Isaías 50:4", "Proverbios 11:13", "Proverbios 11:14", "Proverbios 24:11", "Juan 4:7-10", "1 Juan 1:9",
    "Mateo 5:23-24", "Romanos 12:18", "Mateo 28:19", "Romanos 6:4", "1 Corintios 11:23-26", "1 Corintios 11:26",
    "1 Corintios 14:40", "Marcos 10:13-16", "Mateo 19:6", "Juan 11:25-26", "1 Tesalonicenses 4:13", "Proverbios 27:23",
    "Juan 10:11", "Juan 10:14", "Mateo 25:36", "Santiago 5:14", "Santiago 1:27", "Hebreos 13:3", "Lucas 15:4", "Hechos 6:1-4",
    "Hechos 20:27", "2 Timoteo 4:2", "Efesios 4:15",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan de cuidado pastoral para el próximo año. Primero, el oficio: recordaré que la iglesia no es mía, sino la iglesia del Señor, que él ganó por su propia sangre (Hechos 20:28), y que debo apacentarla no como teniendo señorío, sino siendo ejemplo de la grey (1 Pedro 5:2-3). No lo haré todo solo: como Jetro le aconsejó a Moisés (Éxodo 18:17-18), formaré un equipo pastoral con ancianos y diáconos, rendiré cuentas a otros y cuidaré mi salud con un día de descanso por semana. Si alguien cae, lo corregiremos con los pasos de Mateo 18:15 para restaurarlo con mansedumbre (Gálatas 6:1), y protegeremos al rebaño con reglas claras para los que sirven con niños y con el dinero contado entre dos personas. Segundo, la consejería: aconsejaré con la Palabra para presentar a cada uno perfecto en Cristo (Colosenses 1:28), escuchando primero, como el siervo que tiene lengua de sabios (Isaías 50:4) y como Jesús con la samaritana. Guardaré la confidencia, porque el de espíritu fiel lo guarda todo (Proverbios 11:13), pero explicaré sus límites desde el principio: si hay riesgo para la vida o el abuso de un menor, avisaré a las autoridades, como pide la ley en Texas. Cuando haga falta, derivaré a un profesional sin dejar de acompañar, y daré a conocer el 988 para las crisis. Tercero, las ordenanzas y las ceremonias: tendremos una clase de bautismo cada trimestre y bautizaremos por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo (Mateo 28:19), cuidando la seguridad en el agua. Celebraremos la Santa Cena cada mes con un tiempo de examen, anunciando la muerte del Señor hasta que él venga (1 Corintios 11:26), y la llevaremos a los enfermos. Prepararemos con entrevistas las presentaciones de niños, las bodas, con su consejería prematrimonial y la licencia del condado, y los funerales, con la esperanza en Cristo, haciéndolo todo decentemente y con orden (1 Corintios 14:40). Cuarto, la visitación: seré diligente en conocer el estado de mis ovejas (Proverbios 27:23). Armaremos un mapa del rebaño, con cada persona a cargo de un líder, y un plan de cuidado como el de Hechos 6:1-4, con los diáconos, un equipo de visitación y otro de oración. Visitaremos a los enfermos en el hospital y oraremos con fe, ungiendo con aceite cuando lo pidan (Santiago 5:14); no olvidaremos a los ancianos, a las viudas ni a los presos (Santiago 1:27; Hebreos 13:3), y buscaremos a la oveja perdida hasta encontrarla (Lucas 15:4), llamando a quien falte dos o tres semanas. Quinto, la predicación: haré un plan de predicación para anunciar todo el consejo de Dios (Hechos 20:27), con series por libros, de doctrina y de temas, y con las fechas de la Semana Santa, Pentecostés y la Navidad, dejándolo en lápiz para las crisis. Predicaré la verdad en amor (Efesios 4:15), corrigiendo y consolando según la necesidad, y pediré retroalimentación a personas de confianza. Por último, evaluaremos el plan cada trimestre con el equipo pastoral: cuántas personas tienen un líder, cuántas visitas hicimos, quiénes volvieron y cómo crece el rebaño en la Palabra, y rendiremos cuentas con humildad ante el Príncipe de los pastores.",
};

const TRABAJO_NINEZ: ClaveEscrita = {
  id: "trabajo-ninez",
  tipo: "trabajo",
  pregunta:
    "Escribe un plan para el ministerio de niños de tu iglesia que use lo aprendido en las cinco materias de la especialidad: por qué y para qué enseñarán a los niños, junto con las familias; cómo acompañarán la fe de cada edad y cómo guiarán a un niño a Cristo sin presión; cómo enseñarán, con sus métodos y su disciplina; cómo protegerán a los niños, con su política, sus reglas y el reporte; y cómo organizarán el equipo, los grupos, el currículo y el calendario. Explica cada parte con citas bíblicas y di cómo evaluarás el plan.",
  ideas: [
    { id: "proposito", peso: 15, texto: "Por qué y para qué enseñar a los niños, junto con las familias.", formas: ["generacion venidera", "discipulos", "amen a dios", "aman a dios", "con las familias", "con sus familias", "los padres", "primeros maestros"] },
    { id: "fe", peso: 20, texto: "Acompañar la fe según la edad y guiar a un niño a Cristo sin presión.", formas: ["cada edad", "su edad", "etapas", "a un nino a cristo", "guiaremos", "sin presion", "sin presionar", "recibir a jesus"] },
    { id: "metodos", peso: 15, texto: "Enseñar con buenos métodos: las siete leyes, las historias, las actividades y la disciplina.", formas: ["siete leyes", "historias", "actividades", "juegos", "disciplina", "cada clase", "objetivo"] },
    { id: "proteccion", peso: 25, texto: "Proteger a los niños: la política, la selección, las reglas de cada domingo y el reporte.", formas: ["proteccion", "politica", "dos adultos", "registro de entrada", "antecedentes", "report*", "252-5400", "autoridades"] },
    { id: "organizar", peso: 15, texto: "Organizar el equipo, los grupos, el currículo y el calendario.", formas: ["equipo", "voluntarios", "grupos por edad", "curriculo", "calendario", "escuela biblica de vacaciones"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el plan.", formas: ["evaluaremos", "evaluare", "evaluar", "cada trimestre", "revisaremos", "revisare"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "Salmos 78:4", "Salmos 78:4-7", "Deuteronomio 6:6-7", "Mateo 19:14", "Marcos 10:14", "Marcos 10:13-16", "Mateo 18:2-5",
    "Mateo 22:37-39", "Proverbios 22:6", "2 Timoteo 3:14-15", "Lucas 2:52", "Lucas 2:40", "1 Pedro 2:2", "Juan 1:12",
    "Juan 3:16", "Romanos 10:9", "Nehemías 8:8", "Esdras 7:10", "2 Timoteo 2:2", "Marcos 4:33", "Santiago 1:22",
    "Proverbios 15:1", "Colosenses 3:21", "1 Corintios 11:1", "Mateo 18:6", "Mateo 18:14", "Salmos 82:3", "Salmos 82:3-4",
    "1 Timoteo 5:22", "2 Corintios 8:21", "Proverbios 31:8", "Proverbios 31:8-9", "Romanos 13:4", "Habacuc 2:2",
    "Éxodo 18:18", "Éxodo 18:17-18", "1 Corintios 14:40", "2 Timoteo 3:16", "Lucas 14:23", "Lucas 14:28",
    "Proverbios 15:22", "Lamentaciones 3:40",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan para el ministerio de niños de nuestra iglesia. Primero, el propósito: enseñaremos a los niños porque Dios manda contar a la generación venidera las alabanzas de Jehová y las maravillas que hizo (Salmos 78:4), y porque Jesús dijo que dejáramos a los niños venir a él (Mateo 19:14). Nuestra meta será formar discípulos que amen a Dios y al prójimo (Mateo 22:37-39), y trabajaremos junto con las familias, porque los padres son los primeros maestros y deben enseñar la Palabra en casa (Deuteronomio 6:6-7). Cada mes les daremos a los padres una hoja con lo que aprendieron sus hijos y una pregunta para conversar en casa. Segundo, la fe de cada edad: hablaremos de Dios con palabras que cada edad entiende, con historias y gestos para los pequeños y con preguntas abiertas para los preadolescentes, porque la fe crece como Jesús crecía en sabiduría y en gracia (Lucas 2:52). Guiaremos a un niño a Cristo con claridad y sin presión, con el evangelio de Juan 3:16 y la promesa de que a todos los que le recibieron les dio potestad de ser hechos hijos de Dios (Juan 1:12), y conversaremos con sus padres. Tercero, los métodos: capacitaremos a los maestros en las siete leyes de la enseñanza, para que lean la Palabra claramente y pongan el sentido, como en tiempos de Nehemías (Nehemías 8:8). Contarán las historias con fidelidad y las llevarán a Jesús, usarán preguntas, actividades y juegos según la edad para que los niños sean hacedores de la palabra (Santiago 1:22), y planificarán cada clase con un objetivo de saber, sentir y hacer. La disciplina será con calma y sin humillar, porque la blanda respuesta quita la ira (Proverbios 15:1). Cuarto, la protección: tendremos una política de protección escrita, porque Jesús advirtió contra quien hace tropezar a uno de estos pequeños (Mateo 18:6). Cada voluntario asistirá unos seis meses, llenará una solicitud, dará referencias, tendrá una entrevista y una verificación de antecedentes, y empezará acompañado, porque no se imponen las manos con ligereza (1 Timoteo 5:22). Cada domingo aplicaremos la regla de los dos adultos, las puertas con ventana y el registro de entrada y salida con etiquetas. Si un niño cuenta un abuso, lo escucharemos con calma, no le prometeremos el secreto y lo reportaremos de inmediato a las autoridades, a la línea 1-800-252-5400, como pide la ley en Texas, porque hay que abrir la boca por el mudo (Proverbios 31:8). Quinto, la organización: escribiremos la misión del ministerio, porque Dios mandó escribir la visión (Habacuc 2:2), y formaremos un equipo con un coordinador, maestros, ayudantes, registro y oración, con turnos para que nadie se agote, como aconsejó Jetro a Moisés (Éxodo 18:18). Organizaremos los grupos por edad con salas seguras, elegiremos un currículo que recorra toda la Biblia y armaremos un calendario con la Navidad, la Semana Santa y una Escuela Bíblica de Vacaciones para alcanzar a las familias del barrio. Por último, evaluaremos el plan cada trimestre con el pastor: miraremos la asistencia y los voluntarios, pero también si los niños oran, conocen la Biblia y sirven; escucharemos a los maestros, a los padres y a los niños, y pondremos metas con fecha y responsable, porque en la multitud de consejeros se afirman los pensamientos (Proverbios 15:22).",
};

const TRABAJO_JUVENTUD: ClaveEscrita = {
  id: "trabajo-juventud",
  tipo: "trabajo",
  pregunta:
    "Escribe un plan de un año para el ministerio juvenil de tu iglesia que use lo aprendido en las cinco materias de la especialidad: cómo formarás discípulos, con grupos pequeños y mentores; cómo ayudarás a los jóvenes a pensar con una cosmovisión cristiana; cómo aconsejarás y cuándo derivarás; cómo formarás a los líderes y organizarás las reuniones y las salidas con seguridad; y cómo alcanzarán los jóvenes a sus amigos con el evangelio. Explica cada parte con citas bíblicas y di cómo evaluarás el plan.",
  ideas: [
    { id: "discipulado", peso: 20, texto: "Formar discípulos con grupos pequeños, mentores y un camino de discipulado.", formas: ["discipul*", "grupos pequenos", "grupo pequeno", "mentor*", "camino de discipulado"] },
    { id: "cosmovision", peso: 15, texto: "Pensar con una cosmovisión cristiana: los cuatro actos, la identidad y el discernimiento.", formas: ["cosmovision", "cuatro actos", "identidad", "discern*", "examinandolo todo"] },
    { id: "consejeria", peso: 20, texto: "Aconsejar escuchando, actuar ante el riesgo, reportar y derivar.", formas: ["aconsej*", "consejeria", "988", "deriv*", "report*"] },
    { id: "liderazgo", peso: 15, texto: "Formar líderes que sirven y organizar reuniones y salidas seguras.", formas: ["lideres", "liderazgo", "para servir", "equipo", "campamento"] },
    { id: "evangelismo", peso: 20, texto: "Alcanzar a los amigos con el evangelio y dar seguimiento.", formas: ["mapa de amigos", "evangel*", "noche de amigos", "sus amigos", "seguimiento"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el plan.", formas: ["evaluaremos", "evaluare", "evaluar", "cada trimestre", "revisaremos", "revisare"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "1 Timoteo 4:12", "Marcos 3:14", "Marcos 3:13-14", "Mateo 4:19", "2 Timoteo 3:10", "Proverbios 27:17", "Salmos 119:9",
    "1 Timoteo 4:7-8", "2 Timoteo 2:2", "Mateo 28:19-20", "Colosenses 2:8", "Romanos 12:2", "2 Corintios 5:17",
    "Efesios 5:16", "1 Tesalonicenses 5:21", "Filipenses 4:8", "1 Pedro 3:15", "Efesios 4:15", "Proverbios 20:5",
    "Santiago 1:19", "1 Reyes 19:4-8", "Efesios 6:4", "2 Timoteo 2:22", "Proverbios 11:13", "Proverbios 11:14",
    "Marcos 10:45", "Marcos 10:43-45", "Juan 13:15", "1 Samuel 16:7", "Nehemías 2:18", "Josué 1:9", "Romanos 10:14",
    "Juan 1:41", "1 Corintios 9:22", "1 Corintios 15:3-4", "Efesios 2:8", "Mateo 5:14", "Hechos 2:42", "Gálatas 6:9",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan de un año para el ministerio juvenil de nuestra iglesia. Primero, el discipulado: no queremos solo entretener a los jóvenes, sino formar discípulos, porque nadie debe tener en poco su juventud y pueden ser ejemplo de los creyentes (1 Timoteo 4:12). Como Jesús, que estableció a doce para que estuviesen con él (Marcos 3:14), cada líder acompañará de cerca a un grupo pequeño de cuatro a ocho jóvenes, con la Palabra, preguntas, rendición de cuentas y oración, y algunos jóvenes tendrán un mentor, como Timoteo tuvo a Pablo, siempre en lugares visibles y con el permiso de los padres. Armaremos un camino de discipulado, conocer, crecer, servir y multiplicar, para que los jóvenes enseñen también a otros (2 Timoteo 2:2). Segundo, la cosmovisión: en los meses de la escuela haremos una serie para enseñarles a pensar con la historia de la Biblia en cuatro actos, creación, caída, redención y consumación, para que nadie los engañe con filosofías que no son según Cristo (Colosenses 2:8). Hablaremos de su identidad en Cristo, de las redes sociales, con un acuerdo de tecnología para cada familia, y de cómo discernir la música y las series, examinándolo todo y reteniendo lo bueno (1 Tesalonicenses 5:21). Tercero, la consejería: los líderes aprenderán a escuchar, siendo prontos para oír y tardos para hablar (Santiago 1:19), y a reconocer las señales de la tristeza profunda y del riesgo de suicidio; ante un joven en peligro no lo dejaremos solo, llamaremos al 988 y avisaremos a sus padres. Explicaremos desde el principio los límites de la confidencialidad, reportaremos el abuso de un menor como pide la ley en Texas y derivaremos a profesionales con una lista de ayuda. Cuarto, el liderazgo: formaremos un equipo de adultos y jóvenes líderes que sirvan como Jesús, que no vino para ser servido sino para servir (Marcos 10:45), y cuidaremos el carácter antes que el talento. Nos reuniremos cada mes para orar, planear y capacitarnos; planearemos las reuniones de los viernes con bienvenida, alabanza, la Palabra y grupos pequeños, y en el verano haremos un campamento con permisos firmados, adultos seleccionados de los dos sexos y dormitorios separados. Prepararemos a los que vendrán después, esforzándonos y siendo valientes, porque Dios está con nosotros (Josué 1:9). Quinto, el evangelismo: cada joven hará su mapa de amigos y orará por tres que no conocen a Cristo, porque nadie puede creer si no hay quien le hable (Romanos 10:14). Aprenderán a explicar el evangelio en cuatro partes y a contar su testimonio, y haremos una noche de amigos cada trimestre, con una invitación clara y sin presión y un seguimiento en la semana, para que los nuevos perseveren en la doctrina y la comunión (Hechos 2:42). Por último, evaluaremos el plan cada trimestre con el pastor: cuántos jóvenes están en un grupo pequeño, cuántos sirven, cuántos amigos nuevos llegaron y siguen viniendo, y si están creciendo en su fe, y ajustaremos lo necesario.",
};

const TRABAJO_FAMILIA: ClaveEscrita = {
  id: "trabajo-familia-consejeria",
  tipo: "trabajo",
  pregunta:
    "Escribe un plan de un año para un ministerio de familia y consejería en tu iglesia que use lo aprendido en las cinco materias de la especialidad: cómo prepararás y acompañarás a los matrimonios; cómo ayudarás a las familias en la crianza, en sus etapas y en sus crisis; cómo consolarás en el duelo y en las emergencias; cómo acompañarás a los que luchan con una adicción y a sus familias; y qué reglas éticas seguirán los consejeros, con sus límites y su cuidado. Explica cada parte con citas bíblicas y di cómo evaluarás el plan.",
  ideas: [
    { id: "matrimonios", peso: 20, texto: "Preparar y acompañar a los matrimonios: la consejería prematrimonial, los conflictos, la restauración y la seguridad ante la violencia.", formas: ["matrimonio*", "prematrimonial", "parejas", "mentores"] },
    { id: "familias", peso: 15, texto: "Ayudar a las familias en la crianza, en sus etapas y en sus crisis.", formas: ["crianza", "criar", "ensamblada*", "adolescentes", "hijos adultos"] },
    { id: "duelo", peso: 15, texto: "Consolar en el duelo y en las emergencias.", formas: ["duelo", "consuelo", "primera ayuda", "emergencia*"] },
    { id: "adicciones", peso: 20, texto: "Acompañar a los que luchan con una adicción y a sus familias.", formas: ["adiccion*", "recuperacion", "rendicion de cuentas", "recaida*"] },
    { id: "etica", peso: 20, texto: "Las reglas éticas: la confidencialidad y sus límites, reportar, derivar y los límites con el otro sexo.", formas: ["confidencialidad", "report*", "deriv*", "otro sexo", "politica de consejeria"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el plan.", formas: ["evaluaremos", "evaluare", "evaluar", "cada trimestre", "revisaremos", "revisare"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "Salmos 127:1", "Mateo 19:6", "Mateo 19:4-6", "Amós 3:3", "Efesios 4:26", "Efesios 5:25", "Eclesiastés 4:12", "Colosenses 3:13",
    "Colosenses 3:19", "Salmos 11:5", "Malaquías 4:6", "Deuteronomio 6:7", "Efesios 6:4", "Colosenses 3:21", "Lucas 15:20",
    "Salmos 68:6", "Santiago 1:27", "Salmos 46:1", "Romanos 12:18", "Salmos 34:18", "Juan 11:35", "Romanos 12:15", "Gálatas 6:2",
    "Job 2:13", "Isaías 43:2", "1 Tesalonicenses 4:13", "Juan 8:36", "Gálatas 6:1", "Gálatas 6:5", "Santiago 5:16",
    "Proverbios 24:16", "Job 31:1", "2 Corintios 8:21", "Proverbios 11:13", "Proverbios 4:23", "Mateo 20:26", "Proverbios 15:22",
    "Lucas 10:34", "Hechos 20:28", "1 Timoteo 4:16", "Proverbios 27:17",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan de un año para el ministerio de familia y consejería de nuestra iglesia. Su base es la promesa de Dios: si Jehová no edificare la casa, en vano trabajan los que la edifican (Salmos 127:1). " +
    "Primero, los matrimonios. Toda pareja que quiera casarse hará seis conversaciones de consejería prematrimonial, porque dos no andan juntos si no están de acuerdo (Amós 3:3). Daremos dos talleres al año sobre la comunicación y los conflictos, para que los esposos aprendan a no dejar que el sol se ponga sobre su enojo (Efesios 4:26), y formaremos matrimonios mentores para acompañar a los más jóvenes, porque cordón de tres dobleces no se rompe pronto (Eclesiastés 4:12). Los consejeros acompañarán con verdad y esperanza a los matrimonios heridos por la infidelidad, y ante la violencia en el hogar la seguridad de la víctima irá primero, con el 911 y la Línea Nacional sobre la Violencia Doméstica. " +
    "Segundo, las familias. Haremos un taller de crianza con amor y con límites, sin exasperar a los hijos (Colosenses 3:21); acompañaremos a los padres de adolescentes y de hijos adultos, y tendremos ayuda práctica y mentores para las familias ensambladas y para los que crían solos, porque Dios hace habitar en familia a los desamparados (Salmos 68:6). En las crisis, como una enfermedad o la migración, la iglesia estará presente y buscará una ayuda segura. " +
    "Tercero, el duelo. Un equipo de consuelo acompañará a cada familia en duelo durante el primer año, con visitas, ayuda práctica y las fechas difíciles anotadas, para llorar con los que lloran (Romanos 12:15). Ante una emergencia o un desastre, el equipo aplicará la primera ayuda psicológica: observar, escuchar y conectar, porque Dios está cercano a los quebrantados de corazón (Salmos 34:18). " +
    "Cuarto, las adicciones. Abriremos un grupo de recuperación, con un programa probado, para que los que luchan con el alcohol, las drogas, la pornografía o el juego encuentren la libertad que da Cristo (Juan 8:36). Habrá rendición de cuentas, gracia para el que tenga una recaída, apoyo para las familias y una red con los médicos y la línea de SAMHSA. " +
    "Quinto, la ética. Los consejeros firmarán una política de consejería: guardarán la confianza, pero explicarán desde el principio sus límites y reportarán el abuso de un niño, de una persona mayor o de alguien con discapacidad, como pide la ley en Texas; nunca aconsejarán a solas a una persona del otro sexo en un lugar privado; no diagnosticarán ni darán consejo legal, y derivarán a un profesional cuando un caso los supere; y tendrán supervisión cada mes y rendirán cuentas, para hacer las cosas honradamente delante del Señor y delante de los hombres (2 Corintios 8:21). " +
    "Cada trimestre evaluaremos el plan con el pastor: cuántas parejas hicieron la consejería prematrimonial, cuántas familias en duelo fueron acompañadas, cuántas personas siguen en el grupo de recuperación, si la política se cumple y cómo están los consejeros, y cambiaremos lo que haga falta.",
};

const TRABAJO_CAPELLANIA: ClaveEscrita = {
  id: "trabajo-capellania",
  tipo: "trabajo",
  pregunta:
    "Escribe un plan de un año para un ministerio de capellanía en tu iglesia que use lo aprendido en las cinco materias de la especialidad: cómo formarás y enviarás a los capellanes y cómo harán sus visitas; cómo servirán en los hospitales; cómo servirán en las cárceles y a las familias de los presos; cómo servirán en las emergencias y los desastres; y qué marco legal y ético seguirán, con sus límites y su rendición de cuentas. Explica cada parte con citas bíblicas y di cómo evaluarás el plan.",
  ideas: [
    { id: "fundamentos", peso: 15, texto: "Formar y enviar a los capellanes: el llamado, el aval, la formación y la presencia en la visita.", formas: ["aval", "presencia", "llamado", "formacion", "capacitacion", "certificacion"] },
    { id: "hospital", peso: 20, texto: "Servir en los hospitales: orar por los enfermos, la privacidad, el que muere y su familia.", formas: ["hospital*", "enfermo*", "cuidados paliativos", "hipaa", "hospicio"] },
    { id: "carcel", peso: 20, texto: "Servir en las cárceles y a las familias de los presos, con prudencia, y recibir a los que salen.", formas: ["carcel*", "prision*", "presos", "angel tree", "salen libres", "salen de la carcel"] },
    { id: "emergencias", peso: 20, texto: "Servir en las emergencias con una organización, con la primera ayuda psicológica y el aviso de una muerte.", formas: ["emergencia*", "desastre*", "primera ayuda", "huracan*", "inundacion*", "bomberos"] },
    { id: "etica", peso: 15, texto: "El marco legal y ético: la libertad religiosa, la confidencialidad y sus límites, la integridad y la rendición de cuentas.", formas: ["confidencialidad", "report*", "libertad religiosa", "integridad", "codigo de etica", "rendir cuentas", "rendiran cuentas"] },
    { id: "evaluar", peso: 10, texto: "Evaluar el plan.", formas: ["evaluaremos", "evaluare", "evaluar", "cada trimestre", "revisaremos", "revisare"] },
  ],
  // casi todas las partes para la nota completa: un trabajo que une las cinco materias no puede dejar fuera dos
  basta: 95,
  citas: [
    "Mateo 25:36", "Mateo 25:35-36", "Jeremías 29:7", "Juan 1:14", "Lucas 24:15", "1 Pedro 3:15", "Hechos 13:2", "2 Timoteo 2:15",
    "Santiago 1:19", "Santiago 5:14", "Daniel 6:4", "Salmos 41:3", "Marcos 1:41", "Santiago 5:15", "Salmos 23:4", "Juan 14:2",
    "Salmos 139:16", "Isaías 49:15", "Gálatas 6:2", "Hebreos 13:3", "Génesis 39:21", "Hechos 16:25", "2 Timoteo 2:9", "Lucas 23:43",
    "Miqueas 6:8", "Salmos 68:5", "Isaías 1:17", "Mateo 10:16", "Hechos 9:27", "Filemón 1:17", "Salmos 46:1", "Isaías 43:2",
    "Lucas 10:34", "1 Reyes 19:7", "Lucas 13:5", "Job 2:13", "Juan 11:35", "Romanos 12:15", "Marcos 10:16", "2 Corintios 1:4",
    "Marcos 6:31", "Éxodo 18:18", "Proverbios 22:3", "Hechos 24:16", "Mateo 22:21", "Romanos 13:1", "Proverbios 11:13",
    "Proverbios 31:8", "Hechos 20:33", "Lucas 16:10", "Hebreos 13:17", "Hechos 5:29",
  ],
  pesoCita: 10,
  errores: [],
  modelo:
    "Plan de un año para el ministerio de capellanía de nuestra iglesia. Su base es la palabra de Jesús: enfermo, y me visitasteis; en la cárcel, y vinisteis a mí (Mateo 25:36). " +
    "Primero, los capellanes. Buscaremos a hermanos con el llamado confirmado, como Bernabé y Saulo (Hechos 13:2), y la iglesia les dará su aval por escrito. Cada mes tendrán formación: el ministerio de la presencia, escuchar más que hablar, porque debemos ser prontos para oír (Santiago 1:19), servir con respeto a personas de todas las creencias y hacer una visita paso a paso. Los que quieran servir como profesionales seguirán el camino de la certificación, y todos harán la capacitación que pida cada institución. " +
    "Segundo, los hospitales. Un equipo visitará cada semana el hospital del condado, de acuerdo con su capellanía. Orarán por los enfermos con fe, porque Dios sana hoy en respuesta a la oración de fe (Santiago 5:15), sin prometer ni culpar a nadie. Cuidarán la privacidad que protege la ley HIPAA, se lavarán las manos en cada visita y acompañarán a los que mueren y a sus familias con el Salmo 23, aunque andemos en valle de sombra de muerte (Salmos 23:4), conociendo los cuidados paliativos y el hospicio. A los padres que pierdan un bebé los acompañaremos con ternura (Isaías 49:15), y en las decisiones difíciles acompañaremos sin decidir por la familia. " +
    "Tercero, las cárceles. Nos acordaremos de los presos como si estuviéramos presos con ellos (Hebreos 13:3). Los voluntarios harán la capacitación y la revisión de antecedentes del sistema penitenciario, y tendremos un estudio bíblico cada semana con el capellán de la unidad, porque la palabra de Dios no está presa (2 Timoteo 2:9). Acompañaremos la culpa con el perdón de Cristo, recordando que la sentencia sigue y que hay víctimas (Miqueas 6:8); ayudaremos a las familias de los presos y, en Navidad, a sus hijos con el programa Angel Tree; enseñaremos a ser prudentes como serpientes y sencillos como palomas (Mateo 10:16); y recibiremos a los que salen de la cárcel con un mentor, como Bernabé recibió a Saulo (Hechos 9:27). " +
    "Cuarto, las emergencias. Nos uniremos a una organización de ayuda para no ir por nuestra cuenta, y los capellanes se reportarán con quien esté a cargo. En los albergues darán la primera ayuda psicológica: observar, escuchar y conectar, empezando por lo básico, como el ángel con Elías (1 Reyes 19:7). No culparemos a las víctimas, porque Jesús enseñó que los de la torre de Siloé no eran más culpables (Lucas 13:5). Si hay que avisar una muerte, el capellán acompañará a la autoridad en persona, con palabras claras y con compasión, llorando con los que lloran (Romanos 12:15). Buscaremos a los niños y a los más débiles, y cuidaremos a los voluntarios con turnos y descanso, porque nadie puede hacerlo solo (Éxodo 18:18). La iglesia tendrá su plan de emergencia, porque el avisado ve el mal y se esconde (Proverbios 22:3). " +
    "Quinto, el marco legal y ético. Respetaremos la libertad religiosa: los capellanes servirán a todos, realizarán lo que su fe les permite y facilitarán lo demás, sin presionar a nadie (Mateo 22:21). Guardarán la confidencialidad con sus límites: lo que se les confía como consejeros espirituales se guarda, pero reportarán enseguida el abuso de un niño, de una persona mayor o con discapacidad, como pide la ley en Texas (Proverbios 31:8). Cuidarán su integridad sin recibir dinero ni regalos de valor (Hechos 20:33), escribirán registros breves y no publicarán fotos ni historias sin permiso. Rendirán cuentas con el aval de la iglesia, la supervisión de cada institución y el código de ética, y si alguna vez les ordenan pecar, obedecerán a Dios antes que a los hombres, con respeto (Hechos 5:29), procurando tener siempre una conciencia sin ofensa ante Dios y ante los hombres (Hechos 24:16). " +
    "Cada trimestre evaluaremos el plan con el pastor: cuántos capellanes tienen su aval y su capacitación, cuántas visitas se hicieron en los hospitales y en las cárceles, cuántas familias de presos y cuántas personas que salieron de la cárcel acompañamos, si estamos listos para la próxima emergencia y cómo están los capellanes, y cambiaremos lo que haga falta.",
};

/** El trabajo final de cada especialidad que ya lo tiene. */
export const TRABAJOS = new Map<EspecialidadId, ClaveEscrita>([
  ["evangelismo-misiones", TRABAJO_EVANGELISMO_MISIONES],
  ["alabanza", TRABAJO_ALABANZA],
  ["intercesion", TRABAJO_INTERCESION],
  ["pastoral", TRABAJO_PASTORAL],
  ["ninez", TRABAJO_NINEZ],
  ["juventud", TRABAJO_JUVENTUD],
  ["familia-consejeria", TRABAJO_FAMILIA],
  ["capellania", TRABAJO_CAPELLANIA],
]);
