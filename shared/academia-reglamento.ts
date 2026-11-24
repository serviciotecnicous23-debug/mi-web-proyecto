/**
 * El reglamento académico y el código de honor de la academia: los muestran la página /academia/reglamento y la
 * inscripción, y el servidor guarda su versión en cada matrícula. Van aparte del catálogo (shared/academia.ts) y de lo
 * liviano (shared/academia-base.ts): solo los bajan esas dos páginas. Sus números salen de las mismas reglas que usa el
 * sistema, así que nunca dicen otra cosa.
 */

import {
  ACTIVIDADES_NIVEL, APRUEBA_PROYECTO, APRUEBA_SERMON, LIMITES_ACTIVIDAD, MINUTOS_ENSENANZA, MINUTOS_SERMON,
  PARTES_PLAN, PASOS_CONSOLIDACION, PASOS_MINIMOS, PROFESORES_DEFENSA, RUBRICA_PROYECTO, RUBRICA_SERMON,
} from "./academia-actividades";
import {
  ACLARACION_DOCUMENTOS, APRUEBA, APRUEBA_INTEGRAL, DIAS_APELACION, DIAS_PAUSA, ESPERA_FINAL_MIN, ETAPAS,
  FALLOS_PARA_REPASAR, HONORES, LEMA, NIVELES_N, NOMBRE_ACADEMIA, PESOS_NIVEL,
} from "./academia-base";
import { PESOS_CON_PRACTICAS } from "./practicas";

/** El código de honor que se acepta al inscribirse (y antes de cada examen). */
export const CODIGO_HONOR =
  "Me comprometo a estudiar y a hacer cada examen yo solo, sin ayuda de otras personas, sin copiar ni pegar textos ajenos, con sinceridad, de corazón, como para el Señor y no para los hombres (Colosenses 3:23).";

export type SeccionReglamento = { titulo: string; puntos: string[] };

const ordinal = (n: number) => (n === 3 ? "tercer" : n === 2 ? "segundo" : `${n}.º`);
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/** Lo que pide cada nivel en la vida de la iglesia (sección 11 del reglamento), con los números del sistema. */
function actividadesDelReglamento(): string[] {
  const n2 = ACTIVIDADES_NIVEL[2]!;
  const n3 = ACTIVIDADES_NIVEL[3]!;
  const n4 = ACTIVIDADES_NIVEL[4]!;
  const n5 = ACTIVIDADES_NIVEL[5]!;
  const anios = Math.round(LIMITES_ACTIVIDAD.diasAtras / 365);
  const enFrase = (t: string) => (t.startsWith("Cristo") ? t : minuscula(t));
  return [
    `Desde el Nivel 2, cada nivel pide también actividades en la vida de la iglesia. Se registran en la página del nivel, después de completar el nivel anterior, y pueden ser de los últimos ${anios} años.`,
    "Las confirma la Administración de la academia con el líder o el pastor que el alumno nombra, o las devuelve con un motivo para corregirlas. Cuentan las confirmadas y lo confirmado ya no cambia. Nadie confirma lo suyo.",
    `Nivel 2: ${n2.evangelismo} conversaciones de evangelismo y servir 1 mes (${n2.servicioDias} días) en un ministerio de la iglesia.`,
    `Nivel 3: ${n3.practicaHoras} horas de práctica ministerial supervisada por un líder de la iglesia, una enseñanza grabada aprobada y consolidar a ${n3.consolidacion} nuevo creyente.`,
    `Nivel 4: ${n4.practicaHoras} horas de práctica ministerial supervisada y un sermón evaluado con rúbrica.`,
    `Nivel 5: el proyecto final con defensa en vivo y acompañar a ${n5.acompanar} personas hasta que terminen el Nivel 1.`,
    `La práctica se registra por día o por período, con el ministerio, quién la supervisó y sus horas: hasta ${LIMITES_ACTIVIDAD.horasDia} en un día y ${LIMITES_ACTIVIDAD.horasPeriodo} en un período. La Administración puede confirmar menos horas de las registradas.`,
    `La enseñanza grabada dura de ${MINUTOS_ENSENANZA.min} a ${MINUTOS_ENSENANZA.max} minutos y se prepara con los pasos de Homilética I. Se comparte con un enlace que la Administración pueda abrir, sin hacerla pública, y se aprueba si explica un pasaje en su contexto con una idea central y un propósito claros, un bosquejo que sale del texto, una ilustración, una aplicación y a Cristo en el centro.`,
    `Consolidar es acompañar a un nuevo creyente, en coordinación con la iglesia, al menos en ${PASOS_MINIMOS} de los ${PASOS_CONSOLIDACION.length} pasos del plan de consolidación de la materia Evangelismo y consolidación.`,
    `El sermón dura de ${MINUTOS_SERMON.min} a ${MINUTOS_SERMON.max} minutos y se presenta grabado, con un enlace que la Administración pueda abrir, o en vivo, ante un maestro de la academia. Un maestro lo evalúa con la rúbrica de Homilética II (${RUBRICA_SERMON.map((c) => `${enFrase(c.corto)}, ${c.max}`).join("; ")}) y se aprueba con ${APRUEBA_SERMON} de 100; si no llega, se prepara otra vez con lo que debe mejorar.`,
    `El proyecto final es un plan de ministerio con las ${PARTES_PLAN.length} partes de la materia Seminario de liderazgo ministerial, escrito con el pastor o el mentor y entregado con un enlace. La Administración programa su defensa en vivo, en persona o en línea, ante ${PROFESORES_DEFENSA} profesores; después de ella, cada uno lo evalúa con su rúbrica (${RUBRICA_PROYECTO.map((c) => `${enFrase(c.corto)}, ${c.max}`).join("; ")}). La nota es el promedio de los dos y se aprueba con ${APRUEBA_PROYECTO} de 100; si no llega, se mejora y se defiende otra vez.`,
    "Para acompañar, la Administración elige al alumno como mentor de personas que empiezan el Nivel 1: cuenta cada una que termina el Nivel 1 mientras la acompaña. No hace falta registrarlo, y desde la página del nivel se le puede pedir a la Administración a quién acompañar.",
    "De las personas con quienes hablas o a quienes acompañas se anota solo la relación o sus iniciales, nunca su nombre completo ni sus datos.",
    "Las normas de prudencia de las materias se cumplen siempre: con menores de edad, con conocimiento de sus padres y nunca a solas. Si aparece un abuso o un peligro, se avisa de inmediato al pastor y a las autoridades.",
  ];
}

/**
 * El reglamento académico (página pública /academia/reglamento). Sus números salen de las mismas reglas que usa el
 * sistema, así que nunca dicen otra cosa. Si cambia algo de fondo, sube la versión: queda guardada en cada matrícula.
 */
export const REGLAMENTO: { version: string; titulo: string; base: string; intro: string; secciones: SeccionReglamento[] } = {
  version: "2026-11-23",
  titulo: "Reglamento académico",
  base: LEMA.ref,
  intro: `Este reglamento ordena la vida académica de la ${NOMBRE_ACADEMIA}. Al inscribirte lo aceptas, junto con el código de honor.`,
  secciones: [
    {
      titulo: "1. La academia",
      puntos: [
        `La ${NOMBRE_ACADEMIA} es el instituto de formación ministerial del Ministerio Avivando el Fuego: forma en la Palabra de Dios a creyentes, obreros, maestros y pastores, por niveles y a su propio ritmo.`,
        "Es gratuita y se cursa en la web, desde la computadora o el teléfono.",
        `Sus certificados y diplomas son formación ministerial. ${ACLARACION_DOCUMENTOS}`,
      ],
    },
    {
      titulo: "2. La inscripción",
      puntos: [
        "Para estudiar se necesita una cuenta en la web e inscribirse en la academia: llenar la ficha de inscripción y aceptar este reglamento y el código de honor. La inscripción es gratuita y queda aprobada al instante.",
        "La inscripción da un número de matrícula personal (AAF-año-número) y una promoción, que es el año en que ingresaste. El carné digital la acredita.",
        "Cada materia tiene su propia inscripción, desde su página, donde se ve lo que se aprende, cómo es y cómo se evalúa. La primera lección de cada materia del Nivel 1 se puede leer sin inscribirse; las demás, el versículo de memoria y el examen piden estar inscrito.",
        "Tus certificados llevan el nombre de tu ficha. Una vez emitido un certificado, ese nombre solo lo corrige la Administración de la academia.",
        "La inscripción es personal: cada alumno estudia con su propia cuenta.",
      ],
    },
    {
      titulo: "3. Los niveles y el avance",
      puntos: [
        `La academia tiene ${NIVELES_N.length} niveles en ${ETAPAS.length} etapas. Cada nivel tiene materias, y cada materia, lecciones cortas con su repaso, un versículo de memoria y un examen final.`,
        `Cada alumno avanza a su ritmo. Una materia se aprueba con el examen final aprobado y una nota de ${APRUEBA} o más.`,
        "Un nivel se cierra con todas sus materias aprobadas, el examen integral, los versículos de memoria que pide, el pacto en el Nivel 1 y las actividades que pide en la vida de la iglesia (sección 11). Las especialidades se abren al terminar el Nivel 2.",
      ],
    },
    {
      titulo: "4. La evaluación",
      puntos: [
        `Las notas van de 0 a 100. Una materia se aprueba con ${APRUEBA}; el examen integral de un nivel, con ${APRUEBA_INTEGRAL}.`,
        `En el Nivel 1, la nota de la materia sale del examen final (${PESOS_CON_PRACTICAS[1].final} %), las prácticas de las lecciones (${PESOS_CON_PRACTICAS[1].practicas} %), los repasos de las lecciones (${PESOS_CON_PRACTICAS[1].repasos} %) y el versículo de memoria (${PESOS_CON_PRACTICAS[1].versiculo} %). En las materias que todavía no tienen prácticas, el examen final pesa ${PESOS_NIVEL[1].final} %.`,
        "Cada lección tiene su práctica: primero la guiada y luego la que cuenta, que se puede repetir hasta 3 veces por día (vale la mejor). En las materias que ya las tienen, las prácticas son obligatorias: sin la práctica que cuenta de cada lección no se presenta el examen final. Quien ya aprobó una materia puede practicar cuando quiera sin que su nota cambie.",
        "El examen final tiene una parte objetiva, con un tiempo para cada pregunta que lleva el servidor, y una parte escrita que el sistema corrige al instante, idea por idea.",
        `Si no apruebas, puedes intentarlo otra vez después de ${ESPERA_FINAL_MIN[0]} minutos y, desde el segundo fallo, después de ${ESPERA_FINAL_MIN[1] / 60} horas. Desde el ${ordinal(FALLOS_PARA_REPASAR)} fallo hay que volver a leer las lecciones antes de intentarlo. Cada intento trae preguntas distintas.`,
        `Un nivel se cierra con honores cuando el promedio de sus materias es de ${HONORES} o más.`,
      ],
    },
    {
      titulo: "5. El código de honor",
      puntos: [
        CODIGO_HONOR,
        "Las respuestas pegadas o dudosas quedan marcadas para que las revise la Administración de la academia.",
        "Hacer trampa, copiar o dar el examen por otra persona anula el examen y puede anular los documentos obtenidos.",
      ],
    },
    {
      titulo: "6. La revisión de las notas",
      puntos: [
        "Todo lo corrige el sistema. Solo la Administración de la academia puede revisar una respuesta y cambiar la nota, siempre con un motivo que queda registrado.",
        `Si no estás de acuerdo con una nota, puedes pedir que se revise, una vez por examen y dentro de los ${DIAS_APELACION} días.`,
      ],
    },
    {
      titulo: "7. El estatus del alumno",
      puntos: [
        "Aspirante: te inscribiste y aún no terminas tu primera lección.",
        "Estudiante activo: estudias con regularidad.",
        `Estudiante en pausa: pasaron ${DIAS_PAUSA} días sin estudiar. Vuelves a estar activo en cuanto estudias.`,
        "Egresado del nivel: completaste un nivel y el siguiente todavía no está disponible.",
        "Graduado de la Academia: completaste el Nivel 5.",
        "Cuadro de honor: cerraste un nivel con honores.",
      ],
    },
    {
      titulo: "8. Los documentos",
      puntos: [
        "Cada materia aprobada te da su insignia: queda en tu vitrina, con tu nota y tu medalla. Los certificados quedan para los logros mayores: cada nivel completo, cada especialidad y la graduación. Llevan un código y un QR, y cualquiera puede verificarlos en la web, sin ver las notas.",
        "El carné digital acredita tu matrícula y también se verifica con su QR.",
        "Solo la Administración de la academia puede corregir o revocar un documento, siempre con un motivo.",
      ],
    },
    {
      titulo: "9. La privacidad",
      puntos: [
        "Tus notas las ven tú y la Administración de la academia; los maestros del ministerio y los líderes de tu iglesia aliada pueden consultarlas, sin cambiar nada. En tu carné y en tu perfil se muestran tu estatus y tu nivel, sin notas.",
        "Los datos de tu ficha (nombre, país, iglesia y contacto) los ven la Administración de la academia y, si elegiste una iglesia aliada, quienes la dirigen. Se usan solo para acompañarte en tus estudios y para tus documentos: no se publican ni se comparten con nadie más.",
        "Puedes corregir los datos de tu ficha cuando quieras, desde tu inscripción.",
        "Si borras tu cuenta, se borra todo tu avance en la academia, también tu ficha, y tus documentos dejan de verificarse.",
      ],
    },
    {
      titulo: "10. La doctrina",
      puntos: [
        "La academia enseña conforme a la Biblia (Reina-Valera 1960) y a la declaración de fe del Ministerio Avivando el Fuego.",
        "Donde los cristianos tienen posturas distintas, se presentan con respeto y se indica la posición del ministerio.",
      ],
    },
    { titulo: "11. Las actividades de los niveles", puntos: actividadesDelReglamento() },
  ],
};
