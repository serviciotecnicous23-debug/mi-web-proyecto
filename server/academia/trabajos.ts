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

/** El trabajo final de cada especialidad que ya lo tiene. */
export const TRABAJOS = new Map<EspecialidadId, ClaveEscrita>([["evangelismo-misiones", TRABAJO_EVANGELISMO_MISIONES]]);
