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

/** El trabajo final de cada especialidad que ya lo tiene. */
export const TRABAJOS = new Map<EspecialidadId, ClaveEscrita>([
  ["evangelismo-misiones", TRABAJO_EVANGELISMO_MISIONES],
  ["alabanza", TRABAJO_ALABANZA],
]);
