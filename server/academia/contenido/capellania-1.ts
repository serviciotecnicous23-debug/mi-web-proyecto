/**
 * Especialidad Capellanía · Materia 1 — Fundamentos de la capellanía (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: qué es la capellanía, el ministerio de la
 * presencia, servir a personas de todas las creencias, el llamado y la formación del capellán (con los requisitos de la
 * certificación de la Asociación de Capellanes Profesionales, comprobados), la visita paso a paso y el capellán dentro
 * de la institución.
 */
import type { LeccionContenido } from "../tipos";

export const CAPELLANIA_1: LeccionContenido[] = [
  {
    id: "capellania-1-1",
    objetivos: [
      "Explicar qué es un capellán y dónde sirve.",
      "Fundamentar la capellanía en las palabras de Jesús y de los profetas.",
      "Distinguir la capellanía del pastorado de una iglesia local.",
    ],
    paraEmpezar:
      "Muchas personas nunca entrarán a una iglesia, pero un día estarán en un hospital, en una cárcel, en una estación de policía o en medio de un desastre. El capellán es el ministro que la iglesia envía a esos lugares, para estar con las personas donde ellas están.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 25:35-36" },
      {
        t: "parrafo",
        texto:
          "Jesús describió así a los que heredan el reino: «fui forastero, y me recogisteis; estuve desnudo, y me cubristeis; enfermo, y me visitasteis; en la cárcel, y vinisteis a mí». La capellanía nace de estas palabras.",
      },
      { t: "versiculo", ref: "Mateo 25:40" },
      {
        t: "parrafo",
        texto:
          "Y explicó por qué importa tanto: «en cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis». En el enfermo y en el preso, el capellán sirve a Cristo.",
      },
      { t: "versiculo", ref: "Jeremías 29:7" },
      {
        t: "parrafo",
        texto:
          "Cuando el pueblo estaba en el exilio, Dios le pidió servir en una tierra ajena: «procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová». El capellán sirve en instituciones que no son de la iglesia, buscando el bien de todos.",
      },
      { t: "subtitulo", texto: "Dónde sirve un capellán" },
      {
        t: "lista",
        items: [
          "En los hospitales y en los centros de cuidado de ancianos.",
          "En las cárceles y en los centros de detención de menores.",
          "Con la policía, los bomberos y los servicios de emergencia.",
          "En las fuerzas armadas.",
          "En las escuelas y las universidades.",
          "En las empresas, los equipos deportivos y los aeropuertos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el pastor de una iglesia y el capellán" },
      {
        t: "lista",
        items: [
          "El pastor: cuida a una congregación que viene a la iglesia. El capellán: va a donde está la gente, a un lugar que no es de la iglesia.",
          "El pastor: la mayoría de su congregación comparte su fe. El capellán: sirve a personas de muchas creencias, y también a las que no creen.",
          "El pastor: sigue las normas de su iglesia. El capellán: sigue también las normas de la institución donde sirve.",
          "Los dos: son enviados por Dios y por su iglesia, y sirven con la Palabra, la oración y el amor.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un día del capellán" },
      {
        t: "parrafo",
        texto:
          "Raúl es capellán voluntario de un hospital de su ciudad todos los martes.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, llegar, orar y pasar por la oficina de capellanía para recibir la lista de los pacientes que pidieron una visita.",
          "Paso 2, visitar a los pacientes de la lista, y a otros que el personal le pide ver.",
          "Paso 3, acompañar en la sala de espera a una familia que acaba de recibir una mala noticia.",
          "Paso 4, conversar un momento con una enfermera cansada después de un turno difícil.",
          "Paso 5, anotar lo necesario según las reglas del hospital, y avisar si alguien pidió la visita de su propio pastor o sacerdote.",
          "Paso 6, terminar orando por las personas que visitó, y descansar.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán no va a la institución a llenar su iglesia, sino a servir. Muchas veces sembrará, y otro cosechará.",
      },
    ],
    ideaClave:
      "Jesús dijo que, cuando visitamos al enfermo y al preso, lo visitamos a él, y Dios pidió a su pueblo procurar la paz de la ciudad donde vivía. El capellán es el ministro que la iglesia envía a los hospitales, las cárceles, las emergencias y otras instituciones, para estar con las personas donde ellas están; sirve a personas de muchas creencias y sigue también las normas de la institución.",
    paraLaVida: {
      texto: "En el enfermo y en el preso, servimos a Cristo.",
      pregunta: "¿Qué institución de tu ciudad necesita la presencia de un capellán?",
    },
  },
  {
    id: "capellania-1-2",
    objetivos: [
      "Explicar el ministerio de la presencia a partir de la encarnación de Cristo.",
      "Practicar la escucha que acompaña.",
      "Acompañar a una persona en un momento difícil sin apurarla.",
    ],
    paraEmpezar:
      "Muchas veces el capellán no puede cambiar nada: no cura al enfermo ni saca al preso de la cárcel. Pero puede estar, escuchar y llevar la presencia de Dios. Ese es el centro de su ministerio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 1:14" },
      {
        t: "parrafo",
        texto:
          "Dios no nos ayudó desde lejos: «Y aquel Verbo fue hecho carne, y habitó entre nosotros». El capellán sigue ese camino: va y se queda con las personas.",
      },
      { t: "versiculo", ref: "Lucas 24:15" },
      {
        t: "parrafo",
        texto:
          "A los dos discípulos tristes que iban a Emaús, Jesús primero los acompañó: «Jesús mismo se acercó, y caminaba con ellos». Les preguntó y los escuchó, y después les explicó las Escrituras.",
      },
      { t: "versiculo", ref: "Mateo 28:20" },
      {
        t: "parrafo",
        texto:
          "Y el capellán no va solo: «he aquí yo estoy con vosotros todos los días, hasta el fin del mundo». Cristo está con él y con la persona que visita.",
      },
      { t: "subtitulo", texto: "La escucha que acompaña" },
      {
        t: "lista",
        items: [
          "Mirar a la persona y, si es posible, sentarse a su altura.",
          "Hacer preguntas abiertas, como ¿cómo está viviendo esto?",
          "Dejar silencios, sin llenarlos de consejos.",
          "Repetir con otras palabras lo que la persona dijo, para que se sienta comprendida.",
          "Respetar sus lágrimas, su enojo y sus dudas.",
          "Ofrecer la oración, sin imponerla.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: estar presente y estar de paso" },
      {
        t: "lista",
        items: [
          "De paso: mira el reloj. Presente: da su tiempo completo, aunque sea poco.",
          "De paso: habla de sí mismo. Presente: deja que la persona hable de lo que vive.",
          "De paso: da respuestas rápidas. Presente: acepta que hay preguntas sin respuesta.",
          "De paso: se va igual que llegó. Presente: se deja tocar por el dolor del otro.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un paciente que no quiere hablar" },
      {
        t: "parrafo",
        texto:
          "Don Julio, de setenta años, acaba de saber que tiene cáncer. Cuando entra el capellán, mira hacia la ventana y no dice nada.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, presentarse con sencillez y preguntarle si puede quedarse un momento.",
          "Paso 2, si acepta, sentarse y acompañarlo en silencio, sin apurarlo.",
          "Paso 3, hacer una pregunta abierta y suave: ¿cómo se siente hoy?",
          "Paso 4, escuchar lo que diga, aunque sea enojo o miedo, sin corregirlo.",
          "Paso 5, ofrecerle una oración corta, y respetar si dice que no.",
          "Paso 6, despedirse diciéndole cuándo puede volver, y cumplirlo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si el paciente no quiere la visita, el capellán lo respeta con gusto y se despide con amabilidad. Respetar su decisión también es una forma de amor.",
      },
    ],
    ideaClave:
      "El Verbo se hizo carne y habitó entre nosotros, Jesús caminó con los discípulos tristes antes de explicarles, y prometió estar con nosotros todos los días. El ministerio de la presencia es estar, escuchar y llevar la presencia de Dios: preguntas abiertas, silencios, respeto por las lágrimas y las dudas, y la oración ofrecida sin imponerla.",
    paraLaVida: {
      texto: "A veces lo único que puedes hacer es estar, y eso basta.",
      pregunta: "¿Quién necesita hoy que te sientes a su lado sin apurarlo?",
    },
  },
  {
    id: "capellania-1-3",
    objetivos: [
      "Explicar por qué el capellán sirve a personas de todas las creencias.",
      "Distinguir el testimonio respetuoso de la presión que se aprovecha del dolor.",
      "Atender a una persona de otra fe según lo que ella necesita.",
    ],
    paraEmpezar:
      "En un hospital o en una cárcel, el capellán se encuentra con evangélicos, católicos, judíos, musulmanes, personas de otras religiones y personas que no creen. A todas las sirve con el amor de Cristo, y sin aprovecharse de su debilidad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 17:22-23" },
      {
        t: "parrafo",
        texto:
          "En Atenas, Pablo empezó con respeto: «en todo observo que sois muy religiosos». Y desde allí les anunció al Dios verdadero: «Al que vosotros adoráis, pues, sin conocerle, es a quien yo os anuncio».",
      },
      { t: "versiculo", ref: "1 Pedro 3:15-16" },
      {
        t: "parrafo",
        texto:
          "Pedro pide estar «siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros». El capellán habla de su esperanza cuando se la piden, y lo hace con mansedumbre.",
      },
      { t: "versiculo", ref: "Colosenses 4:5-6" },
      {
        t: "parrafo",
        texto:
          "Y Pablo añade: «Andad sabiamente para con los de afuera», «Sea vuestra palabra siempre con gracia, sazonada con sal».",
      },
      { t: "subtitulo", texto: "Comparación: el testimonio respetuoso y la presión" },
      {
        t: "lista",
        items: [
          "Respetuoso: escucha primero lo que la persona cree. Presión: habla sin escuchar.",
          "Respetuoso: habla de su fe cuando la persona lo pide o lo permite. Presión: insiste aunque la persona diga que no.",
          "Respetuoso: ofrece la oración. Presión: aprovecha el miedo o el dolor para arrancar una decisión.",
          "Respetuoso: ayuda igual a todos. Presión: condiciona la ayuda a que la persona crea.",
        ],
      },
      { t: "subtitulo", texto: "Lo que puede hacer el capellán por una persona de otra fe" },
      {
        t: "lista",
        items: [
          "Preguntarle qué le da fuerza y qué necesita en este momento.",
          "Avisar a su propio líder religioso, si lo pide.",
          "Ayudarle a tener lo que su fe le pide, como un tiempo de oración o una comida especial, si la institución lo permite.",
          "Acompañarla con respeto, sin fingir que cree lo que no cree.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un paciente musulmán" },
      {
        t: "parrafo",
        texto:
          "En el hospital, el capellán visita a Omar, un paciente musulmán, que le cuenta que extraña ir a la mezquita.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, saludarlo con respeto y preguntarle cómo se siente.",
          "Paso 2, escuchar lo que su fe significa para él en este momento.",
          "Paso 3, preguntarle si quiere que avise a alguien de su comunidad, y hacerlo si lo pide.",
          "Paso 4, preguntar al personal si se puede facilitar un lugar tranquilo para que ore.",
          "Paso 5, si Omar le pregunta por su fe, contarle con sencillez y con mansedumbre la esperanza que tiene en Cristo.",
          "Paso 6, despedirse con amabilidad y ofrecerle volver.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán nunca miente sobre su propia fe ni finge otra. Sirve a todos con el amor de Cristo, y deja que su vida y su respeto hablen.",
      },
    ],
    ideaClave:
      "Pablo empezó en Atenas reconociendo lo que la gente creía, y Pedro pide dar razón de la esperanza con mansedumbre y reverencia. El capellán sirve a personas de todas las creencias: escucha primero, habla de su fe cuando se lo piden o lo permiten, ofrece la oración sin aprovecharse del dolor, ayuda igual a todos y facilita los recursos de la fe de cada persona.",
    paraLaVida: {
      texto: "El respeto abre puertas que la presión cierra.",
      pregunta: "¿Cómo puedes mostrar el amor de Cristo a alguien que no comparte tu fe?",
    },
  },
  {
    id: "capellania-1-4",
    objetivos: [
      "Explicar el llamado del capellán y el envío de su iglesia.",
      "Describir la formación que piden los hospitales, las cárceles y otras instituciones.",
      "Armar un plan personal para prepararse como capellán.",
    ],
    paraEmpezar:
      "Para ser capellán no basta con tener buen corazón. Hace falta un llamado de Dios, el respaldo de la iglesia y una buena preparación, porque el capellán sirve en lugares delicados, junto a profesionales de otras áreas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 13:2-3" },
      {
        t: "parrafo",
        texto:
          "El Espíritu Santo dijo: «Apartadme a Bernabé y a Saulo para la obra a que los he llamado». Y la iglesia, después de ayunar y orar, «les impusieron las manos y los despidieron». El llamado es de Dios, y la iglesia lo confirma y envía.",
      },
      { t: "versiculo", ref: "2 Timoteo 2:15" },
      {
        t: "parrafo",
        texto:
          "La preparación también es parte del llamado: «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad».",
      },
      { t: "versiculo", ref: "1 Timoteo 3:7" },
      {
        t: "parrafo",
        texto:
          "Y el testimonio cuenta: «También es necesario que tenga buen testimonio de los de afuera». En una institución, todos miran al capellán.",
      },
      { t: "subtitulo", texto: "El aval de la iglesia" },
      {
        t: "parrafo",
        texto:
          "Muchas instituciones piden que el capellán tenga el aval de su iglesia o de su organización religiosa: una carta que confirma que es un ministro en buen orden y que la iglesia lo envía. Sin ese respaldo, el capellán sirve solo.",
      },
      { t: "subtitulo", texto: "La formación" },
      {
        t: "lista",
        items: [
          "Los capellanes voluntarios reciben la capacitación que pide cada hospital o cárcel, y pasan una revisión de antecedentes.",
          "Muchos capellanes se forman con la educación pastoral clínica (CPE), que une la práctica en un hospital con la reflexión supervisada.",
          "Para la certificación profesional de la Asociación de Capellanes Profesionales (APC) se pide una maestría, cuatro unidades de educación pastoral clínica, el aval de su grupo de fe y 2,000 horas de experiencia como capellán.",
          "En todos los casos, el capellán sigue aprendiendo: sobre el duelo, las crisis, las otras religiones y las normas de su institución.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el capellán voluntario y el capellán profesional" },
      {
        t: "lista",
        items: [
          "El voluntario: sirve algunas horas, con la capacitación de la institución. El profesional: trabaja como parte del equipo, con una formación larga y supervisada.",
          "El voluntario: suele visitar a los que lo piden. El profesional: atiende las crisis, asesora al personal y coordina a los voluntarios.",
          "Los dos: necesitan el llamado, el aval de su iglesia y un buen testimonio.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de Ana para prepararse" },
      {
        t: "parrafo",
        texto:
          "Ana siente el llamado a servir como capellana en un hospital, y habla con su pastor para empezar.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y confirmar el llamado con su pastor y con los líderes de la iglesia.",
          "Paso 2, terminar su formación en la Academia, sobre todo las materias de consejería, de duelo y de ética.",
          "Paso 3, pedir información al departamento de capellanía del hospital sobre su programa de voluntarios.",
          "Paso 4, pedir a su iglesia la carta de aval.",
          "Paso 5, hacer la capacitación del hospital y la revisión de antecedentes.",
          "Paso 6, empezar con pocas horas, acompañada por un capellán con experiencia, y evaluar con su pastor.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si un día Ana quiere servir como capellana profesional, necesitará estudios de posgrado y la educación pastoral clínica. Conviene informarse con tiempo.",
      },
    ],
    ideaClave:
      "El Espíritu Santo llamó a Bernabé y a Saulo, y la iglesia los apartó y los envió. El capellán necesita el llamado de Dios, el aval de su iglesia, un buen testimonio y una buena preparación: la capacitación de cada institución, muchas veces la educación pastoral clínica (CPE) y, para la certificación profesional de la APC, una maestría, cuatro unidades de CPE, el aval de su grupo de fe y 2,000 horas de experiencia.",
    paraLaVida: {
      texto: "El llamado se confirma en la iglesia y se prepara con diligencia.",
      pregunta: "¿Qué paso concreto puedes dar este mes para prepararte para servir?",
    },
  },
  {
    id: "capellania-1-5",
    objetivos: [
      "Preparar y dirigir una visita de capellanía.",
      "Preguntar con respeto por las necesidades espirituales de una persona.",
      "Cerrar y registrar una visita según las reglas de la institución.",
    ],
    paraEmpezar:
      "Una visita del capellán puede durar diez minutos o una hora. En ese tiempo, la persona debe sentirse respetada, escuchada y acompañada. Para eso sirve tener un camino claro.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Santiago 1:19" },
      {
        t: "parrafo",
        texto:
          "La regla de oro de la visita es de Santiago: «todo hombre sea pronto para oír, tardo para hablar, tardo para airarse».",
      },
      { t: "versiculo", ref: "Santiago 5:13-14" },
      {
        t: "parrafo",
        texto:
          "La oración por el enfermo es parte de la vida de la iglesia: «¿Está alguno enfermo entre vosotros? Llame a los ancianos de la iglesia, y oren por él». El capellán la ofrece con respeto.",
      },
      { t: "versiculo", ref: "Hebreos 13:3" },
      {
        t: "parrafo",
        texto:
          "Y se pone en el lugar del otro: «Acordaos de los presos, como si estuvierais presos juntamente con ellos; y de los maltratados, como que también vosotros mismos estáis en el cuerpo».",
      },
      { t: "subtitulo", texto: "Los pasos de una visita" },
      {
        t: "lista",
        items: [
          "Prepararse: orar, revisar la información que da la institución y lavarse las manos.",
          "Entrar: tocar la puerta, presentarse por su nombre y su función, y preguntar si es un buen momento.",
          "Escuchar: dejar que la persona cuente lo que vive.",
          "Conocer sus necesidades espirituales: qué le da fuerza, si tiene una fe o una comunidad, y qué le gustaría recibir del capellán.",
          "Ofrecer: una oración, una lectura de la Biblia o avisar a su propio pastor, según lo que la persona quiera.",
          "Cerrar: despedirse, decir si va a volver y lavarse las manos otra vez.",
          "Registrar: anotar solo lo que pide la institución, y avisar al personal si algo le preocupa.",
        ],
      },
      { t: "subtitulo", texto: "Preguntas que ayudan" },
      {
        t: "lista",
        items: [
          "¿Qué le ha dado fuerza en los momentos difíciles de su vida?",
          "¿La fe es importante para usted en este momento?",
          "¿Tiene una iglesia o una comunidad que lo acompañe?",
          "¿Hay algo que le preocupe y de lo que quiera hablar?",
          "¿Cómo le gustaría que lo acompañe hoy?",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una visita en el hospital" },
      {
        t: "parrafo",
        texto:
          "La enfermera le pide al capellán que visite a doña Rosa, de ochenta años, que llora mucho desde que la internaron.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, prepararse: orar en el pasillo, leer lo que dice la lista y lavarse las manos.",
          "Paso 2, entrar: tocar, presentarse y preguntar si puede pasar.",
          "Paso 3, escuchar: doña Rosa cuenta que tiene miedo de no volver a su casa.",
          "Paso 4, preguntar con cuidado qué le ha dado fuerza en otros momentos difíciles: doña Rosa habla de su fe y de su iglesia.",
          "Paso 5, ofrecer una oración y la lectura de un salmo; doña Rosa pide que avisen a su pastor, y el capellán lo hace con su permiso.",
          "Paso 6, cerrar y registrar: despedirse, lavarse las manos, anotar lo que pide el hospital y contarle a la enfermera que doña Rosa está muy angustiada.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si al llegar ve que el paciente duerme, recibe un tratamiento o tiene visitas, el capellán vuelve más tarde. Y si hay una señal de aislamiento en la puerta, sigue las indicaciones del personal antes de entrar.",
      },
    ],
    ideaClave:
      "Santiago pide ser pronto para oír y tardo para hablar, y orar por el enfermo; Hebreos pide acordarse del preso como si estuviéramos con él. La visita del capellán sigue un camino: prepararse, entrar con respeto, escuchar, conocer las necesidades espirituales de la persona, ofrecer sin imponer, cerrar y registrar según las reglas de la institución.",
    paraLaVida: {
      texto: "Pronto para oír, tardo para hablar.",
      pregunta: "¿A quién puedes visitar esta semana?",
    },
  },
  {
    id: "capellania-1-6",
    objetivos: [
      "Explicar cómo trabaja el capellán con el personal y con las normas de una institución.",
      "Cuidar también al personal de la institución.",
      "Resolver con sabiduría un conflicto entre una petición y las normas de la institución.",
    ],
    paraEmpezar:
      "El capellán es un invitado en una casa ajena. El hospital, la cárcel o la estación de policía tienen sus normas, su personal y sus horarios. Un buen capellán se gana la confianza de todos sirviendo con humildad y con integridad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Daniel 6:3-4" },
      {
        t: "parrafo",
        texto:
          "Daniel servía en la corte de un rey extranjero, y sus enemigos «no podían hallar ocasión alguna o falta, porque él era fiel, y ningún vicio ni falta fue hallado en él».",
      },
      { t: "versiculo", ref: "Tito 3:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo pide «que se sujeten a los gobernantes y autoridades, que obedezcan, que estén dispuestos a toda buena obra», «mostrando toda mansedumbre para con todos los hombres».",
      },
      { t: "versiculo", ref: "Colosenses 3:23" },
      {
        t: "parrafo",
        texto:
          "Y el capellán trabaja para el Señor, aunque nadie lo vea: «Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres».",
      },
      { t: "subtitulo", texto: "Cómo trabaja el capellán dentro de la institución" },
      {
        t: "lista",
        items: [
          "Conoce y respeta las normas: los horarios, la seguridad, la privacidad y lo que puede llevar o no.",
          "Trabaja en equipo con el personal: avisa lo que necesitan saber y pide ayuda cuando hace falta.",
          "Guarda la confianza de las personas, con los límites que piden la ley y la institución.",
          "Cuida también al personal: las enfermeras, los guardias y los médicos también sufren.",
          "No se mete en lo que no le toca: el tratamiento médico, las decisiones legales o la disciplina de la cárcel.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el capellán que se gana la confianza y el que la pierde" },
      {
        t: "lista",
        items: [
          "Se la gana: cumple las normas aunque nadie lo vea. La pierde: busca atajos.",
          "Se la gana: sirve a todos por igual. La pierde: solo atiende a los de su iglesia.",
          "Se la gana: habla bien del personal. La pierde: critica a la institución delante de los pacientes o de los presos.",
          "Se la gana: avisa cuando no puede venir. La pierde: falta sin avisar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una petición fuera de las normas" },
      {
        t: "parrafo",
        texto:
          "En la cárcel, un preso le pide al capellán que le lleve una carta a su familia sin pasarla por la revisión.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar al preso y entender por qué lo pide.",
          "Paso 2, explicarle con amabilidad que el capellán sigue las normas de la cárcel y no puede llevar nada a escondidas.",
          "Paso 3, ofrecerle el camino permitido: ayudarlo a escribir la carta y enviarla por el medio oficial.",
          "Paso 4, si el preso insiste o lo presiona, poner el límite con calma.",
          "Paso 5, seguir sirviéndole con el mismo amor, sin rencor.",
          "Paso 6, contarle el caso a su supervisor de capellanía, para que sepa lo que pasó.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si una norma de la institución le pidiera algo contra su conciencia, el capellán lo habla con respeto con su supervisor y con su iglesia, en lugar de desobedecer a escondidas.",
      },
    ],
    ideaClave:
      "Daniel sirvió en la corte de un rey extranjero con tanta fidelidad que no le hallaron falta, y Pablo pide sujetarse a las autoridades, estar dispuestos a toda buena obra y ser mansos con todos. El capellán es un invitado en una casa ajena: respeta las normas, trabaja en equipo, guarda la confianza con sus límites, cuida también al personal y no se mete en lo que no le toca.",
    paraLaVida: {
      texto: "La integridad abre más puertas que el carisma.",
      pregunta: "¿Cómo puedes servir con integridad en tu lugar de trabajo esta semana?",
    },
  },
];
