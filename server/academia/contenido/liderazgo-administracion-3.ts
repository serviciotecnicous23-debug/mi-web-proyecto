/**
 * Especialidad Liderazgo y administración · Materia 3 — Equipos y voluntarios (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: el cuerpo que sirve y el
 * ciclo del voluntario, invitar y ubicar, seleccionar con cuidado, capacitar y acompañar, cuidar, reconocer y renovar, y la
 * ley y los voluntarios (la Ley de Protección del Voluntario de 1997, 42 U.S.C. 14503, comprobada en su texto; la Ley de
 * Inmunidad y Responsabilidad de las Organizaciones Benéficas de Texas, capítulo 84; los 14 centavos por milla de la
 * sección 170(i); y el reporte del abuso de un menor en Texas, de inmediato, y los profesionales a más tardar en 24 horas).
 * No repite Liderazgo II (formar líderes, delegar y resolver conflictos): se ocupa de la gestión de los voluntarios. Lo
 * legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const LIDERAZGO_ADMINISTRACION_3: LeccionContenido[] = [
  {
    id: "liderazgo-administracion-3-1",
    objetivos: [
      "Explicar, con 1 Corintios 12:18-21 y 1 Pedro 4:10, por qué cada creyente tiene un lugar para servir.",
      "Reconocer el ciclo del voluntario: invitar, ubicar, preparar, acompañar, reconocer y renovar.",
      "Hacer el mapa de servicio de una iglesia.",
    ],
    paraEmpezar:
      "En muchas iglesias, pocos hermanos hacen casi todo, y muchos no saben dónde servir. No es que falten manos: falta un camino claro para que cada uno encuentre su lugar. Organizar a los voluntarios es ayudar al cuerpo de Cristo a funcionar como Dios lo diseñó.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 12:18-21" },
      {
        t: "parrafo",
        texto:
          "«Mas ahora Dios ha colocado los miembros cada uno de ellos en el cuerpo, como él quiso», y ninguno sobra: «Ni el ojo puede decir a la mano: No te necesito».",
      },
      { t: "versiculo", ref: "1 Pedro 4:10" },
      {
        t: "parrafo",
        texto:
          "«Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios». Servir es administrar lo que Dios nos dio.",
      },
      { t: "versiculo", ref: "Romanos 12:6-8" },
      {
        t: "parrafo",
        texto: "Tenemos «diferentes dones, según la gracia que nos es dada»: unos sirven, otros enseñan, otros reparten, y el que hace misericordia, «con alegría».",
      },
      { t: "subtitulo", texto: "El ciclo del voluntario" },
      {
        t: "lista",
        items: [
          "Invitar: en persona, con una tarea concreta, y no solo con un anuncio general.",
          "Ubicar: según los dones, el gusto y el tiempo de cada uno.",
          "Preparar: una orientación y una capacitación para su tarea.",
          "Acompañar: un líder que lo conoce, le avisa a tiempo y pregunta cómo está.",
          "Reconocer: dar las gracias en persona y celebrar lo que Dios hizo por medio del equipo.",
          "Renovar: cada año, conversar si sigue, si cambia de lugar o si descansa.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un equipo de voluntarios cuidado y uno descuidado" },
      {
        t: "lista",
        items: [
          "Cuidado: cada voluntario sabe qué hace y a quién avisar. Descuidado: llega y pregunta qué le toca.",
          "Cuidado: los turnos se reparten entre muchos. Descuidado: los mismos cinco hacen todo hasta cansarse.",
          "Cuidado: se le dan las gracias. Descuidado: solo se le habla cuando falta.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el mapa de servicio de la iglesia" },
      {
        t: "parrafo",
        texto: "El consejo quiere saber cuántos voluntarios necesita la iglesia y dónde, para invitar con orden.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, hacer la lista de los ministerios: la bienvenida, la alabanza, el sonido, los niños, los jóvenes, la limpieza y los demás.",
          "Paso 2, escribir en cada uno los puestos que tiene y cuántas personas necesita cada domingo y cada mes.",
          "Paso 3, anotar cuántos voluntarios hay hoy y cuántos faltan.",
          "Paso 4, marcar los puestos que piden cuidado especial, como los niños, el dinero y el transporte.",
          "Paso 5, nombrar a un coordinador de voluntarios que lleve el mapa al día.",
          "Paso 6, usar el mapa para invitar en persona a los que faltan, empezando por lo más urgente.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Formar líderes, delegar y resolver conflictos se estudia en Liderazgo II, del Nivel 5. Esta materia se ocupa de organizar a todos los que sirven, desde el que acomoda las sillas hasta el que enseña a los niños.",
      },
      {
        t: "pasos",
        titulo: "El ciclo del voluntario",
        pasos: [
          { titulo: "Invitar", texto: "En persona, con una tarea concreta y el tiempo que pide." },
          { titulo: "Ubicar", texto: "Según sus dones, su gusto y su tiempo, empezando con un paso pequeño." },
          { titulo: "Preparar", texto: "Una orientación con la visión y las políticas, y una capacitación para su tarea." },
          { titulo: "Acompañar", texto: "Un líder que lo conoce, le avisa a tiempo y pregunta cómo está." },
          { titulo: "Reconocer", texto: "Las gracias en persona y una celebración de lo que Dios hizo por medio del equipo." },
          { titulo: "Renovar", texto: "Cada año, conversar si sigue, si cambia de lugar o si descansa." },
        ],
      },
    ],
    ideaClave:
      "Dios colocó cada miembro en el cuerpo como él quiso, ninguno puede decirle al otro que no lo necesita, y cada uno sirve según el don que recibió, como buen administrador de la gracia de Dios. Por eso la iglesia organiza a sus voluntarios con un ciclo: invitar en persona, ubicar según los dones, preparar, acompañar, reconocer y renovar cada año. El mapa de servicio muestra cuántos se necesitan, dónde y cuáles puestos piden cuidado especial.",
    paraLaVida: {
      texto: "En el cuerpo de Cristo nadie sobra.",
      pregunta: "¿Dónde sirves hoy, y a quién podrías invitar a servir contigo?",
    },
  },
  {
    id: "liderazgo-administracion-3-2",
    objetivos: [
      "Explicar, con Éxodo 35:21 y Marcos 3:14, cómo Dios mueve y llama a los que sirven.",
      "Invitar en persona y escribir la descripción de un puesto de servicio.",
      "Ubicar a un voluntario según sus dones, su gusto y su tiempo.",
    ],
    paraEmpezar:
      "Un anuncio que dice se necesitan voluntarios casi nunca funciona. Lo que funciona es que alguien te mire a los ojos y te diga: creo que Dios te dio un don para esto, ¿te gustaría probar un mes? Una invitación clara y personal abre la puerta al servicio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 35:21" },
      {
        t: "parrafo",
        texto:
          "Para el tabernáculo, «vino todo varón a quien su corazón estimuló, y todo aquel a quien su espíritu le dio voluntad». El servicio nace de un corazón dispuesto.",
      },
      { t: "versiculo", ref: "Marcos 3:14" },
      {
        t: "parrafo",
        texto: "Jesús «estableció a doce, para que estuviesen con él, y para enviarlos a predicar». Primero los llamó a estar con él, y después los envió.",
      },
      { t: "versiculo", ref: "Hechos 6:2-4" },
      {
        t: "parrafo",
        texto: "La iglesia buscó a personas para una tarea concreta: «Buscad, pues, hermanos, de entre vosotros a siete varones de buen testimonio».",
      },
      { t: "subtitulo", texto: "La descripción de un puesto" },
      {
        t: "lista",
        items: [
          "El nombre y el propósito: para qué sirve el puesto.",
          "Las tareas: qué hace, con palabras sencillas.",
          "El tiempo: cuántas horas, cada cuánto y por cuánto tiempo se compromete.",
          "Los requisitos: lo que se pide, como ser miembro, tener una capacitación o, con los niños, la revisión de antecedentes.",
          "A quién rinde cuentas y con quién trabaja.",
          "La capacitación que va a recibir.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una invitación personal y un anuncio general" },
      {
        t: "lista",
        items: [
          "Personal: te vi servir el café con alegría, ¿te gustaría estar en la bienvenida un mes? General: se necesitan voluntarios.",
          "Personal: dice qué hará, cuánto tiempo y quién lo acompañará. General: no dice nada de eso.",
          "Personal: empieza con un paso pequeño, una prueba de un mes. General: pide un compromiso para siempre.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la descripción del puesto de bienvenida" },
      {
        t: "parrafo",
        texto: "El ministerio de bienvenida necesita cuatro voluntarios más para los domingos, y la coordinadora prepara la descripción del puesto.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escribir el propósito: que cada persona que llegue se sienta esperada y amada.",
          "Paso 2, escribir las tareas: saludar en la puerta, acompañar a los nuevos a un asiento y anotar, con permiso, sus datos para el seguimiento.",
          "Paso 3, poner el tiempo: un domingo al mes, de 9:30 a 11:30, por seis meses.",
          "Paso 4, poner los requisitos: asistir a la iglesia, ser amable y tomar la orientación de una hora.",
          "Paso 5, decir a quién rinde cuentas: a la coordinadora, que le avisará los turnos con un mes de anticipación.",
          "Paso 6, usar la descripción para invitar en persona a los hermanos que tienen ese don.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "No se pone a nadie en un puesto solo porque falta gente. Si alguien no tiene el don, el tiempo o el testimonio para un puesto, se le ayuda a encontrar otro lugar con cariño.",
      },
    ],
    ideaClave:
      "Para el tabernáculo vino todo aquel a quien su corazón estimuló, Jesús llamó a los doce para que estuvieran con él y para enviarlos, y la iglesia buscó a personas de buen testimonio para una tarea concreta. La descripción de un puesto dice su propósito, las tareas, el tiempo, los requisitos, a quién rinde cuentas y la capacitación. La invitación personal, con una tarea clara y un primer paso pequeño, funciona mejor que un anuncio general.",
    paraLaVida: {
      texto: "Invitar en persona es reconocer el don del otro.",
      pregunta: "¿A quién viste servir con alegría, y a quién podrías invitar esta semana?",
    },
  },
  {
    id: "liderazgo-administracion-3-3",
    objetivos: [
      "Explicar, con 1 Timoteo 3:10 y 1 Timoteo 5:22, por qué se selecciona con cuidado a los que sirven.",
      "Aplicar los pasos de la selección: la solicitud, la entrevista, las referencias y la revisión de antecedentes.",
      "Seleccionar a un voluntario para un puesto que pide cuidado especial.",
    ],
    paraEmpezar:
      "No todos los puestos son iguales. Para acomodar sillas basta un corazón dispuesto; para servir con niños, con el dinero o al volante de la camioneta de la iglesia, se pide más. Seleccionar con cuidado no es desconfiar: es proteger a los más débiles y al mismo voluntario.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "1 Timoteo 3:10" },
      {
        t: "parrafo",
        texto: "Pablo pidió de los diáconos: «Y éstos también sean sometidos a prueba primero, y entonces ejerzan el diaconado, si son irreprensibles».",
      },
      { t: "versiculo", ref: "1 Timoteo 5:22" },
      {
        t: "parrafo",
        texto: "Y advirtió: «No impongas con ligereza las manos a ninguno, ni participes en pecados ajenos». Confiar una tarea sin conocer a la persona es una ligereza.",
      },
      { t: "versiculo", ref: "Proverbios 20:6" },
      {
        t: "parrafo",
        texto: "«Muchos hombres proclaman cada uno su propia bondad, Pero hombre de verdad, ¿quién lo hallará?». No basta con lo que alguien dice de sí mismo.",
      },
      { t: "subtitulo", texto: "Los pasos de la selección" },
      {
        t: "lista",
        items: [
          "La solicitud: los datos, los lugares donde sirvió antes y su permiso para revisar sus referencias y sus antecedentes.",
          "El tiempo en la iglesia: muchas iglesias piden, por ejemplo, unos seis meses antes de servir con niños.",
          "La entrevista: conversar sobre su fe, su experiencia y por qué quiere servir.",
          "Las referencias: llamar a dos o tres personas que lo conozcan, de preferencia de otra iglesia o de su trabajo.",
          "La revisión de antecedentes: para los que sirven con niños, con el dinero o manejan vehículos.",
          "La capacitación de protección antes de empezar, y la prueba de un tiempo con un líder cerca.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: seleccionar con cuidado y llenar huecos" },
      {
        t: "lista",
        items: [
          "Con cuidado: el nuevo sirve primero en la bienvenida y después, si se ve su testimonio, con los niños. Llenar huecos: el que llegó ayer enseña a los niños el domingo.",
          "Con cuidado: se llaman las referencias. Llenar huecos: se confía en lo que la persona dice.",
          "Con cuidado: la información de la selección se guarda en privado. Llenar huecos: se comenta en el pasillo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un voluntario para el ministerio de niños" },
      {
        t: "parrafo",
        texto: "Un hermano que llegó hace dos meses de otra ciudad quiere enseñar en la clase de los niños.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecerle con alegría su deseo de servir y explicarle que todos los que sirven con niños siguen los mismos pasos.",
          "Paso 2, darle la solicitud y pedirle su permiso por escrito para la revisión de antecedentes.",
          "Paso 3, entrevistarlo sobre su fe, su experiencia con niños y su iglesia anterior.",
          "Paso 4, llamar a su pastor anterior y a otras dos referencias.",
          "Paso 5, mientras tanto, invitarlo a servir en otra área, como la bienvenida, hasta cumplir el tiempo que pide la política.",
          "Paso 6, si todo está bien, darle la capacitación de protección y ponerlo a servir junto a un maestro con experiencia.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las reglas de cada domingo con los niños, como la de los dos adultos, se estudian en Protección de menores, de la especialidad Niñez. La información de la selección es privada y la guarda solo el coordinador.",
      },
      {
        t: "cuadro",
        titulo: "Lo que se pide según dónde sirve el voluntario",
        columnas: ["Dónde sirve", "Lo que se pide", "Por qué"],
        filas: [
          ["La bienvenida o la limpieza", "Un corazón dispuesto y una orientación breve", "Son puertas de entrada para servir"],
          ["La alabanza o el sonido", "La entrevista, una prueba y el compromiso con los ensayos", "Sirven frente a toda la iglesia"],
          ["Los niños y los jóvenes", "La solicitud, las referencias, la revisión de antecedentes y la capacitación de protección", "Cuidan a los más vulnerables"],
          ["El dinero", "Las referencias, la revisión de antecedentes y la regla de los dos", "Manejan lo que es de Dios"],
          ["El transporte", "La licencia vigente, el seguro y un buen historial de manejo", "Llevan la vida de otros en sus manos"],
        ],
      },
    ],
    ideaClave:
      "Pablo pidió que los diáconos fueran sometidos a prueba primero, advirtió no imponer con ligereza las manos a nadie, y los Proverbios recuerdan que muchos proclaman su propia bondad. La selección sigue pasos según el puesto: la solicitud, el tiempo en la iglesia, la entrevista, las referencias, la revisión de antecedentes para los que sirven con niños, con el dinero o al volante, y la capacitación de protección. Seleccionar con cuidado protege a los más débiles y al mismo voluntario.",
    paraLaVida: {
      texto: "Cuidar la puerta del servicio es cuidar a los pequeños.",
      pregunta: "¿Tu ministerio sigue los mismos pasos con todos los que sirven con niños?",
    },
  },
  {
    id: "liderazgo-administracion-3-4",
    objetivos: [
      "Explicar, con Marcos 6:7 y Lucas 10:17, cómo Jesús preparó y acompañó a los que envió.",
      "Organizar la orientación, la capacitación práctica y el acompañamiento de los voluntarios.",
      "Hacer el plan de capacitación de un equipo.",
    ],
    paraEmpezar:
      "Un voluntario sin preparación se siente perdido y comete errores que lo desaniman. Uno bien preparado sirve con confianza y alegría. Jesús no envió a sus discípulos sin enseñarles, y tampoco los dejó solos después.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 6:7" },
      {
        t: "parrafo",
        texto: "Jesús «llamó a los doce, y comenzó a enviarlos de dos en dos; y les dio autoridad». Los envió acompañados y con lo que necesitaban.",
      },
      { t: "versiculo", ref: "Lucas 10:17" },
      {
        t: "parrafo",
        texto: "«Volvieron los setenta con gozo», y le contaron a Jesús lo que pasó. Después de servir, se vuelve a conversar con el líder.",
      },
      { t: "versiculo", ref: "Hebreos 10:24" },
      {
        t: "parrafo",
        texto: "«Y considerémonos unos a otros para estimularnos al amor y a las buenas obras». El equipo se anima mutuamente.",
      },
      { t: "subtitulo", texto: "Preparar y acompañar" },
      {
        t: "lista",
        items: [
          "La orientación: la visión de la iglesia, las políticas que debe conocer y el manual de su ministerio.",
          "La capacitación práctica: primero ve cómo se hace, después lo hace con ayuda, luego solo, y al final enseña a otro.",
          "Los recursos: lo que necesita a mano, como las listas, los materiales y a quién llamar.",
          "El acompañamiento: un líder para cada grupo pequeño, que pregunta cómo está y no solo qué hizo.",
          "La comunicación: los turnos con tiempo, los cambios avisados y un grupo para avisos, sin llenarlo de mensajes.",
          "La conversación después de servir: qué salió bien, qué fue difícil y qué aprendimos.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un voluntario preparado y uno improvisado" },
      {
        t: "lista",
        items: [
          "Preparado: conoce la política de protección antes de entrar al salón de los niños. Improvisado: la descubre cuando ya se equivocó.",
          "Preparado: sirvió dos veces junto a alguien con experiencia. Improvisado: lo dejaron solo el primer día.",
          "Preparado: sabe a quién llamar si algo falla. Improvisado: no sabe qué hacer.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de capacitación del equipo de bienvenida" },
      {
        t: "parrafo",
        texto: "Cuatro hermanos nuevos se unieron al equipo de bienvenida, y la coordinadora prepara su capacitación.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, darles una orientación de una hora: la visión de la iglesia, la política de privacidad de los datos y el manual de la bienvenida.",
          "Paso 2, el primer domingo, que cada uno acompañe a un voluntario con experiencia y solo observe.",
          "Paso 3, el segundo domingo, que sirva con ayuda: salude y acompañe a los nuevos con su compañero al lado.",
          "Paso 4, el tercer domingo, que sirva solo, con la coordinadora cerca para cualquier pregunta.",
          "Paso 5, al terminar cada domingo, conversar diez minutos: qué salió bien y qué fue difícil.",
          "Paso 6, al mes, preguntarle a cada uno si quiere seguir y, más adelante, invitarlo a enseñar a otro nuevo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La capacitación no termina el primer mes: un repaso al año, sobre todo de las políticas de protección y de seguridad, mantiene al equipo al día.",
      },
    ],
    ideaClave:
      "Jesús envió a los doce de dos en dos y con autoridad, los setenta volvieron a contarle lo que pasó, y la Biblia pide estimularnos unos a otros al amor y a las buenas obras. Al voluntario se le da una orientación con la visión, las políticas y el manual; una capacitación práctica, en la que primero ve, después hace con ayuda, luego solo y al final enseña a otro; los recursos que necesita; un líder que lo acompaña; una comunicación clara; y una conversación después de servir.",
    paraLaVida: {
      texto: "Nadie debería servir solo y sin preparación.",
      pregunta: "¿A quién nuevo podrías acompañar en su primer día de servicio?",
    },
  },
  {
    id: "liderazgo-administracion-3-5",
    objetivos: [
      "Explicar, con Éxodo 18:17-18 y Romanos 16:1-4, por qué se cuida y se reconoce a los que sirven.",
      "Prevenir el cansancio de los voluntarios, reconocer su trabajo y renovar su compromiso cada año.",
      "Tener la conversación anual con un voluntario cansado.",
    ],
    paraEmpezar:
      "Muchos voluntarios no dejan de servir porque se enojaron, sino porque se cansaron sin que nadie lo notara. Cuidar al que sirve es tan importante como invitarlo. Un equipo cuidado sirve por años; uno descuidado se quema y se va en silencio.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Jetro le dijo a Moisés: «No está bien lo que haces. Desfallecerás del todo, tú, y también este pueblo que está contigo». El exceso de trabajo cansa al que sirve y al pueblo.",
      },
      { t: "versiculo", ref: "Romanos 16:1-4" },
      {
        t: "parrafo",
        texto:
          "Pablo reconocía en público a los que servían: de Febe dijo que «ella ha ayudado a muchos, y a mí mismo», y de Priscila y Aquila, que «no sólo yo doy gracias, sino también todas las iglesias de los gentiles».",
      },
      { t: "versiculo", ref: "Filipenses 2:29-30" },
      {
        t: "parrafo",
        texto: "Sobre Epafrodito pidió: «Recibidle, pues, en el Señor, con todo gozo, y tened en estima a los que son como él».",
      },
      { t: "subtitulo", texto: "Cuidar, reconocer y renovar" },
      {
        t: "lista",
        items: [
          "Repartir la carga: turnos rotativos, para que nadie sirva todos los domingos sin descanso.",
          "Poner límites: que una persona no cargue con muchos ministerios a la vez.",
          "Notar las señales del cansancio: llegar tarde, faltar, perder la alegría o contestar con enojo.",
          "Reconocer: dar las gracias en persona, una nota escrita y una celebración al año.",
          "Escuchar: preguntar cada cierto tiempo qué le ayuda y qué le pesa.",
          "Renovar: un compromiso por un tiempo, por ejemplo un año, y al terminar conversar si sigue, cambia o descansa, y despedirlo con gratitud si se va.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un equipo que se cuida y uno que se quema" },
      {
        t: "lista",
        items: [
          "Se cuida: el líder pregunta cómo está su familia. Se quema: solo pregunta si vendrá el domingo.",
          "Se cuida: se celebra lo que Dios hizo. Se quema: solo se habla de lo que salió mal.",
          "Se cuida: el que necesita descansar, descansa sin culpa. Se quema: el que descansa es visto como poco comprometido.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la conversación anual con un voluntario cansado" },
      {
        t: "parrafo",
        texto:
          "Una hermana sirve desde hace cuatro años en el ministerio de niños todos los domingos, y últimamente llega tarde y sin ánimo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, invitarla a conversar a solas, sin prisa, y empezar dándole las gracias por sus años de servicio.",
          "Paso 2, preguntarle cómo está ella y su familia, y escucharla sin juzgar.",
          "Paso 3, preguntarle qué le pesa y qué le ayudaría.",
          "Paso 4, ofrecerle opciones: servir dos domingos al mes, cambiar de lugar o tomar un descanso de unos meses.",
          "Paso 5, acordar lo que ella elija, ajustar los turnos del equipo y orar juntas.",
          "Paso 6, volver a conversar en unos meses, y reconocer su servicio delante del equipo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si un voluntario no cumple o falla, se habla con él en privado y con mansedumbre, como enseña Gálatas 6:1. Si el problema es serio o toca a los niños, se aparta del puesto mientras se aclara, como dice la política.",
      },
    ],
    ideaClave:
      "Jetro le advirtió a Moisés que desfallecería si seguía solo, Pablo reconocía en público a Febe, a Priscila y a Aquila, y pidió tener en estima a los que sirven como Epafrodito. Al voluntario se le cuida repartiendo la carga, poniendo límites, notando las señales del cansancio, reconociendo su trabajo, escuchándolo y renovando su compromiso cada cierto tiempo, con la libertad de seguir, cambiar o descansar, y despidiéndolo con gratitud si se va.",
    paraLaVida: {
      texto: "Al que sirve también hay que servirle.",
      pregunta: "¿A qué voluntario de tu iglesia podrías darle las gracias esta semana?",
    },
  },
  {
    id: "liderazgo-administracion-3-6",
    objetivos: [
      "Explicar, con Tito 3:1 y Romanos 13:1, por qué la iglesia cumple las leyes que tocan a sus voluntarios.",
      "Reconocer lo que protegen la Ley de Protección del Voluntario y la ley de Texas, y lo que no.",
      "Revisar la protección legal de un programa de voluntarios.",
    ],
    paraEmpezar:
      "Los voluntarios sirven por amor, pero también están bajo las leyes del país. Conocerlas ayuda a la iglesia a protegerlos, a proteger a las personas a las que sirven y a no pensar que todo está cubierto cuando no lo está.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Tito 3:1" },
      {
        t: "parrafo",
        texto: "«Recuérdales que se sujeten a los gobernantes y autoridades, que obedezcan, que estén dispuestos a toda buena obra».",
      },
      { t: "versiculo", ref: "Romanos 13:1" },
      {
        t: "parrafo",
        texto: "«Sométase toda persona a las autoridades superiores; porque no hay autoridad sino de parte de Dios».",
      },
      { t: "versiculo", ref: "Proverbios 22:3" },
      {
        t: "parrafo",
        texto: "«El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño». Conocer la ley es parte de ver el mal a tiempo.",
      },
      { t: "subtitulo", texto: "Las leyes que conviene conocer" },
      {
        t: "lista",
        items: [
          "La Ley de Protección del Voluntario de 1997 (42 U.S.C. 14503): el voluntario de una organización sin fines de lucro no responde por un daño si actuaba dentro de sus funciones, tenía la licencia que hiciera falta y el daño no vino de una conducta dolosa, de una negligencia grave o de una imprudencia temeraria.",
          "Lo que esa ley no cubre: el daño causado al manejar un vehículo para el que el estado pide licencia o seguro; y no cambia la responsabilidad de la organización.",
          "La ley de Texas (Código de Práctica y Remedios Civiles, capítulo 84): también protege al voluntario de una organización benéfica que actúa en sus funciones, con excepciones como manejar equipo motorizado; la protección de la organización depende de tener el seguro que pide la ley.",
          "Las millas del voluntario: el que usa su carro para servir puede deducir 14 centavos por milla que no le reembolsaron, si detalla sus deducciones, y la iglesia puede reembolsarle hasta esa cantidad sin que pague impuesto.",
          "El reporte del abuso de un menor en Texas: toda persona que lo sospeche debe reportarlo de inmediato a la línea 1-800-252-5400, o al 911 si hay peligro; y los profesionales, como los maestros o las enfermeras, a más tardar en 24 horas.",
          "Los menores que sirven: con el permiso de sus padres y con un adulto responsable cerca.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: creer que todo está cubierto y saberlo de verdad" },
      {
        t: "lista",
        items: [
          "Creerlo: los voluntarios llevan a los jóvenes en sus carros sin preguntar por su seguro. Saberlo: se revisa la licencia y el seguro de cada chofer.",
          "Creerlo: la ley del voluntario protege también a la iglesia. Saberlo: la iglesia tiene su propio seguro de responsabilidad.",
          "Creerlo: si alguien sospecha un abuso, se lo cuenta al pastor y listo. Saberlo: se reporta a la línea de Texas, como pide la ley.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: revisar la protección legal del programa de voluntarios" },
      {
        t: "parrafo",
        texto: "El consejo le pide al coordinador de voluntarios que revise si el programa está en regla antes del verano.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, revisar con el agente de seguros que la póliza de responsabilidad de la iglesia cubra las actividades de los voluntarios.",
          "Paso 2, pedir la licencia vigente y el seguro de cada voluntario que maneja, y guardar una copia en su expediente.",
          "Paso 3, confirmar que los que sirven con niños tienen su selección completa y su capacitación de protección, con el reporte de 24 horas para los profesionales.",
          "Paso 4, preparar un formulario para que los voluntarios anoten sus millas, y decidir si la iglesia las reembolsa.",
          "Paso 5, pedir el permiso de los padres para los menores que sirven en el campamento.",
          "Paso 6, escribir lo revisado en un informe para el consejo, y consultar a un abogado lo que no esté claro.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo legal de esta lección es una guía general, no un consejo legal: las leyes cambian y cada caso es distinto. Si a un voluntario se le empieza a pagar por su servicio, puede dejar de ser voluntario ante la ley: se consulta a un contador.",
      },
      {
        t: "cuadro",
        titulo: "Las leyes que tocan a los voluntarios",
        columnas: ["Ley", "Qué protege o pide", "Lo que no cubre"],
        filas: [
          ["Protección del Voluntario de 1997", "Al voluntario que actúa en sus funciones y sin negligencia grave", "Manejar un vehículo que pide licencia o seguro; la responsabilidad de la iglesia"],
          ["Texas, capítulo 84", "Al voluntario de una organización benéfica en sus funciones", "Algunas excepciones, como el equipo motorizado"],
          ["Las millas, sección 170(i)", "14 centavos por milla que no se reembolsaron", "Más de esa cantidad sin pagar impuesto"],
          ["El reporte del abuso en Texas", "Toda persona reporta de inmediato; los profesionales, en 24 horas", "Nunca se tapa ni se deja solo en manos del pastor"],
        ],
      },
    ],
    ideaClave:
      "La Biblia manda sujetarse a las autoridades, estar dispuestos a toda buena obra y ver el mal a tiempo. La Ley de Protección del Voluntario de 1997 protege al voluntario que actúa en sus funciones y sin negligencia grave, pero no cubre el manejo de vehículos que piden licencia o seguro ni la responsabilidad de la iglesia; la ley de Texas también protege al voluntario. Las millas se deducen a 14 centavos, y en Texas toda persona reporta de inmediato la sospecha de abuso de un menor, y los profesionales, a más tardar en 24 horas.",
    paraLaVida: {
      texto: "Servir con amor también es servir en regla.",
      pregunta: "¿Qué punto de la protección de los voluntarios de tu iglesia nadie ha revisado?",
    },
  },
];
