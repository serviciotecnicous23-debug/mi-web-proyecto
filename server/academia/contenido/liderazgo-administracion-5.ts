/**
 * Especialidad Liderazgo y administración · Materia 5 (avanzada) — Marco legal de las organizaciones religiosas
 * (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas, con los datos comprobados:
 * la libertad religiosa (la Primera Enmienda, la ley de Texas del capítulo 110 de 1999 y la enmienda Johnson, que sigue
 * vigente), la forma legal de la iglesia (el Formulario 202 de Texas y el capítulo 22 del Código de Organizaciones
 * Comerciales), los impuestos (la Publicación 1828 del IRS, el Formulario AP-209 y el Código Tributario 11.20 de Texas),
 * la iglesia como empleador (Hosanna-Tabor, 2012; Our Lady of Guadalupe, 2020; la sección 702 del Título VII), la
 * responsabilidad y la protección (el Código de Familia 261.101: toda persona reporta de inmediato y los profesionales a más
 * tardar en 24 horas) y la propiedad (la ley RLUIPA y la exención del título III de la ADA). Profundiza lo legal básico de
 * Administración y gobierno de la iglesia (Nivel 5) sin repetirlo. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const LIDERAZGO_ADMINISTRACION_5: LeccionContenido[] = [
  {
    id: "liderazgo-administracion-5-1",
    objetivos: [
      "Explicar, con Mateo 22:21 y Hechos 5:29, la relación entre la iglesia y el Estado.",
      "Reconocer lo que protegen la Primera Enmienda y la ley de libertad religiosa de Texas, y lo que pide la enmienda Johnson.",
      "Responder a una pregunta sobre la política en la iglesia durante una elección.",
    ],
    paraEmpezar:
      "La iglesia vive en dos reinos: obedece a Dios por encima de todo, y respeta a las autoridades que Dios estableció. En los Estados Unidos, la ley protege la libertad de la iglesia para creer, reunirse y enseñar, y también le pone algunos límites. Conocerlos ayuda a la iglesia a usar bien su libertad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 22:21" },
      {
        t: "parrafo",
        texto: "Jesús respondió: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios». Hay cosas que se le deben al Estado, y hay cosas que solo son de Dios.",
      },
      { t: "versiculo", ref: "Hechos 5:29" },
      {
        t: "parrafo",
        texto: "Cuando les prohibieron predicar, los apóstoles dijeron: «Es necesario obedecer a Dios antes que a los hombres». La conciencia ante Dios va primero.",
      },
      { t: "versiculo", ref: "1 Timoteo 2:1-2" },
      {
        t: "parrafo",
        texto:
          "Pablo pidió orar «por los reyes y por todos los que están en eminencia, para que vivamos quieta y reposadamente en toda piedad y honestidad». La iglesia ora por las autoridades, sean del partido que sean.",
      },
      { t: "subtitulo", texto: "Lo que dice la ley" },
      {
        t: "lista",
        items: [
          "La Primera Enmienda protege el libre ejercicio de la religión y prohíbe que el gobierno establezca una religión oficial.",
          "En Texas, la ley de libertad religiosa de 1999 (Código de Práctica y Remedios Civiles, capítulo 110) dice que una agencia del gobierno no puede imponer una carga sustancial al libre ejercicio de la religión de una persona, salvo en lo que la misma ley permite; y desde 2021 prohíbe ordenar el cierre de los lugares de culto.",
          "La enmienda Johnson, del código de impuestos, prohíbe que una iglesia exenta apoye o ataque a candidatos en una campaña; sigue vigente: un acuerdo de 2025 que la limitaba no llegó a tomar efecto, y el caso sigue en los tribunales.",
          "La iglesia sí puede enseñar lo que la Biblia dice de los temas morales, orar por las autoridades y animar a votar sin decir por quién.",
          "El pastor puede opinar como persona, aclarando que habla a título personal, pero no en los cultos, en las publicaciones ni con los recursos de la iglesia.",
          "Si una ley mandara pecar, la iglesia obedece a Dios con respeto y acepta las consecuencias, como los apóstoles.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la voz de la iglesia y la campaña de un partido" },
      {
        t: "lista",
        items: [
          "Voz de la iglesia: predicar sobre la vida, la justicia y la familia según la Biblia. Campaña: decir desde el púlpito por qué candidato votar.",
          "Voz de la iglesia: orar por todos los candidatos. Campaña: poner en el boletín la propaganda de uno.",
          "Voz de la iglesia: invitar a todos los candidatos por igual a un foro. Campaña: prestar el templo solo a uno para su acto.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la elección y el boletín" },
      {
        t: "parrafo",
        texto:
          "Faltan dos semanas para una elección, y un hermano quiere poner en el boletín de la iglesia la propaganda de su candidato favorito y pide que el pastor lo apoye en el culto.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecerle su interés por el bien de la ciudad y escucharlo con respeto.",
          "Paso 2, explicarle que la iglesia exenta no puede apoyar ni atacar a candidatos en sus cultos, sus publicaciones o con sus recursos.",
          "Paso 3, ofrecerle lo que sí se puede: orar por todas las autoridades y animar a la iglesia a votar con conciencia.",
          "Paso 4, si se habla de temas morales, enseñarlos desde la Biblia sin nombrar partidos ni candidatos.",
          "Paso 5, recordar que cada hermano puede apoyar a quien quiera como persona, fuera de las actividades de la iglesia.",
          "Paso 6, escribir esta regla en la política de comunicación de la iglesia para las próximas elecciones.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo legal de esta materia es una guía general, no un consejo legal: las leyes y los casos de los tribunales cambian. Ante una duda concreta, se consulta a un abogado.",
      },
      {
        t: "cuadro",
        titulo: "La iglesia y las elecciones: lo que puede y lo que no",
        columnas: ["La iglesia puede", "La iglesia no puede"],
        filas: [
          ["Enseñar lo que la Biblia dice de los temas morales", "Apoyar o atacar a un candidato en sus cultos o publicaciones"],
          ["Orar por las autoridades y por todos los candidatos", "Usar su dinero, su templo o su boletín para una campaña"],
          ["Animar a votar, sin decir por quién", "Decir por quién votar en nombre de la iglesia"],
          ["Que el pastor opine como persona, aclarando que es a título personal", "Que el pastor apoye a un candidato desde el púlpito"],
        ],
      },
    ],
    ideaClave:
      "Jesús mandó dar a César lo que es de César y a Dios lo que es de Dios, los apóstoles obedecieron a Dios antes que a los hombres, y Pablo pidió orar por todas las autoridades. La Primera Enmienda y la ley de Texas del capítulo 110 protegen la libertad religiosa; la enmienda Johnson, que sigue vigente, prohíbe que la iglesia apoye o ataque a candidatos. La iglesia enseña los temas morales, ora por todos y anima a votar, y el pastor opina como persona fuera de los cultos y las publicaciones de la iglesia.",
    paraLaVida: {
      texto: "Obedezco a Dios primero y respeto a las autoridades.",
      pregunta: "¿Oras por las autoridades de tu ciudad, también por las que no votaste?",
    },
  },
  {
    id: "liderazgo-administracion-5-2",
    objetivos: [
      "Explicar, con 1 Corintios 14:40 y Proverbios 11:14, por qué la iglesia se ordena también ante la ley.",
      "Reconocer la forma legal de una iglesia en Texas y lo que deben decir sus estatutos.",
      "Revisar los estatutos de una iglesia.",
    ],
    paraEmpezar:
      "Una iglesia puede reunirse sin papeles, pero cuando compra un terreno, abre una cuenta, contrata a alguien o firma un contrato, necesita una forma legal clara. Esa forma protege los bienes de la iglesia y a sus líderes, y ordena cómo se toman las decisiones.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "1 Corintios 14:40" },
      {
        t: "parrafo",
        texto: "«pero hágase todo decentemente y con orden». El orden también incluye la forma legal de la iglesia.",
      },
      { t: "versiculo", ref: "Proverbios 11:14" },
      {
        t: "parrafo",
        texto: "«Donde no hay dirección sabia, caerá el pueblo; Mas en la multitud de consejeros hay seguridad». Los estatutos dan esa dirección.",
      },
      { t: "versiculo", ref: "Romanos 12:17" },
      {
        t: "parrafo",
        texto: "«procurad lo bueno delante de todos los hombres». Cumplir bien la ley es parte del testimonio de la iglesia.",
      },
      { t: "subtitulo", texto: "La forma legal de una iglesia en Texas" },
      {
        t: "lista",
        items: [
          "Muchas iglesias se forman como corporación sin fines de lucro, con el certificado de formación (Formulario 202) ante la Secretaría de Estado de Texas, que cobra 25 dólares.",
          "Esas corporaciones se rigen por el Código de Organizaciones Comerciales de Texas, cuyo capítulo 22 trata de las corporaciones sin fines de lucro.",
          "Si la corporación tiene junta directiva, no puede tener menos de tres directores (sección 22.204).",
          "La corporación protege los bienes de la iglesia y separa sus deudas de las de sus líderes.",
          "La propiedad y las cuentas quedan a nombre de la iglesia, nunca a nombre del pastor ni de un miembro.",
          "La iglesia tiene su número de identificación del empleador (EIN), que da el IRS, para su cuenta del banco y su nómina.",
        ],
      },
      { t: "subtitulo", texto: "Lo que deben decir los estatutos" },
      {
        t: "lista",
        items: [
          "La declaración de fe y el propósito de la iglesia.",
          "Quiénes son miembros, cómo entran y cómo dejan de serlo.",
          "Cómo se gobierna: el pastor, el consejo o la junta, cómo se eligen y cuánto duran.",
          "Las reuniones: cada cuánto, quién convoca, el quórum y cómo se vota.",
          "Las finanzas: quién aprueba el presupuesto, las compras grandes y la venta de bienes.",
          "Los conflictos de interés, cómo se cambian los estatutos y qué pasa con los bienes si la iglesia se disuelve.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una iglesia con orden legal y una sin él" },
      {
        t: "lista",
        items: [
          "Con orden: el templo está a nombre de la corporación. Sin orden: está a nombre del pastor, y al morir él la iglesia no sabe de quién es.",
          "Con orden: los estatutos dicen cómo se elige el consejo. Sin orden: cada elección termina en discusión.",
          "Con orden: hay una cuenta de la iglesia con su EIN. Sin orden: las ofrendas van a la cuenta de un hermano.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: revisar los estatutos de la iglesia" },
      {
        t: "parrafo",
        texto: "La iglesia creció, y sus estatutos tienen veinte años sin revisarse. El consejo forma una comisión para revisarlos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, leer los estatutos vigentes y anotar lo que ya no se cumple o lo que falta.",
          "Paso 2, revisar que estén la declaración de fe, la membresía, el gobierno, las reuniones, las finanzas y la disolución.",
          "Paso 3, agregar una política de conflictos de interés y la regla de cómo se cambian los estatutos.",
          "Paso 4, revisar con un abogado que conozca a las iglesias que el texto cumpla la ley de Texas.",
          "Paso 5, presentar los cambios a la iglesia y aprobarlos como dicen los estatutos vigentes.",
          "Paso 6, guardar la versión aprobada en el archivo con el acta, y avisar a la Secretaría de Estado si cambió algo que deba informarse.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las formas de gobierno de la iglesia se estudian en Administración y gobierno de la iglesia, del Nivel 5. Aquí se trata su forma ante la ley de Texas. Lo legal es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "Todo se hace decentemente y con orden, en la multitud de consejeros hay seguridad, y la iglesia procura lo bueno delante de todos. En Texas, muchas iglesias se forman como corporación sin fines de lucro con el Formulario 202, que cuesta 25 dólares, bajo el capítulo 22 del Código de Organizaciones Comerciales; si tienen junta, son al menos tres directores. La propiedad y las cuentas están a nombre de la iglesia, con su EIN, y los estatutos dicen la fe, la membresía, el gobierno, las reuniones, las finanzas, los conflictos de interés y la disolución.",
    paraLaVida: {
      texto: "El orden legal también protege la obra de Dios.",
      pregunta: "¿Sabes a nombre de quién está la propiedad de tu iglesia?",
    },
  },
  {
    id: "liderazgo-administracion-5-3",
    objetivos: [
      "Explicar, con Romanos 13:7 y Mateo 17:27, por qué la iglesia cumple sus obligaciones tributarias.",
      "Reconocer los impuestos de una iglesia en los Estados Unidos y en Texas, y cómo se piden sus exenciones.",
      "Revisar si una iglesia tiene en regla sus exenciones.",
    ],
    paraEmpezar:
      "Muchas personas creen que una iglesia no tiene nada que ver con los impuestos. En realidad, la iglesia está exenta de varios, pero tiene que cumplir algunas reglas y pedir algunas exenciones. Hacerlo bien es dar a César lo que es de César.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 13:7" },
      {
        t: "parrafo",
        texto: "«Pagad a todos lo que debéis: al que tributo, tributo; al que impuesto, impuesto; al que respeto, respeto; al que honra, honra».",
      },
      { t: "versiculo", ref: "Mateo 17:27" },
      {
        t: "parrafo",
        texto: "Jesús pagó el impuesto del templo y dijo: «Sin embargo, para no ofenderles». La iglesia cumple también para no dar mal testimonio.",
      },
      { t: "versiculo", ref: "Marcos 12:17" },
      {
        t: "parrafo",
        texto: "«Dad a César lo que es de César, y a Dios lo que es de Dios. Y se maravillaron de él».",
      },
      { t: "subtitulo", texto: "Los impuestos de una iglesia" },
      {
        t: "lista",
        items: [
          "El impuesto federal sobre la renta: la iglesia que cumple los requisitos de la sección 501(c)(3) queda exenta automáticamente, sin tener que pedirlo, aunque puede pedir la carta del IRS que lo reconoce (Publicación 1828).",
          "La declaración anual: las iglesias no tienen que presentar el Formulario 990.",
          "Los fondos: no pueden beneficiar a personas en particular; los ingresos de un negocio que no tiene que ver con su propósito pueden pagar impuesto.",
          "En Texas, la iglesia pide a la Contraloría la exención del impuesto de franquicia y del impuesto sobre las ventas con el Formulario AP-209, y da el certificado de exención a los vendedores.",
          "El impuesto a la propiedad: el lugar de culto que es de la iglesia puede quedar exento (Código Tributario, sección 11.20); se pide al distrito de tasación del condado.",
          "La nómina: si tiene empleados, la iglesia retiene y paga sus impuestos; el pastor, por sus servicios de ministro, paga su Seguro Social por cuenta propia.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: creer que no hay nada que hacer y tener todo en regla" },
      {
        t: "lista",
        items: [
          "Creerlo: la iglesia compra sillas y paga el impuesto de las ventas sin saber que podía estar exenta. En regla: tiene su exención y da el certificado.",
          "Creerlo: el templo nuevo paga impuesto a la propiedad porque nadie pidió la exención. En regla: se pidió al distrito de tasación.",
          "Creerlo: se rentó el estacionamiento todo el año sin preguntar. En regla: se consultó a un contador si ese ingreso paga impuesto.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: revisar las exenciones de la iglesia" },
      {
        t: "parrafo",
        texto: "La iglesia compró su primer edificio, y el tesorero quiere saber si tiene en regla sus exenciones.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, confirmar que la iglesia tiene su EIN y que cumple los requisitos de la 501(c)(3); si conviene, pedir la carta del IRS.",
          "Paso 2, revisar si ya tiene la exención de Texas del impuesto de franquicia y de las ventas; si no, presentar el Formulario AP-209.",
          "Paso 3, pedir la exención del impuesto a la propiedad del templo al distrito de tasación del condado, con su formulario.",
          "Paso 4, revisar si la iglesia tiene algún ingreso que no tenga que ver con su propósito, y consultarlo con un contador.",
          "Paso 5, revisar que la nómina de los empleados se pague y se presente a tiempo.",
          "Paso 6, guardar todas las cartas y aprobaciones en el archivo de la iglesia, con un calendario de lo que hay que renovar.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las reglas de los impuestos cambian y tienen detalles: cada iglesia debe tener un contador que conozca a las organizaciones religiosas. Lo de esta lección es una guía general, no un consejo legal ni contable.",
      },
      {
        t: "cuadro",
        titulo: "Los impuestos de una iglesia en Texas",
        columnas: ["Impuesto", "Qué pasa con la iglesia", "Cómo se pide o se cumple"],
        filas: [
          ["Sobre la renta (federal)", "Exenta si cumple la 501(c)(3); no presenta el 990", "Automático; puede pedir la carta del IRS"],
          ["Negocios sin relación con su propósito", "Esos ingresos pueden pagar impuesto", "Se consulta a un contador"],
          ["Franquicia y ventas (Texas)", "Puede estar exenta", "Formulario AP-209 ante la Contraloría"],
          ["Propiedad", "El lugar de culto puede quedar exento", "Se pide al distrito de tasación del condado"],
          ["Nómina", "Retiene y paga los impuestos de sus empleados", "El pastor paga su Seguro Social por cuenta propia"],
        ],
      },
    ],
    ideaClave:
      "La Biblia manda pagar a todos lo que se debe, y Jesús pagó el impuesto para no ofender. La iglesia que cumple la 501(c)(3) está exenta del impuesto federal sobre la renta sin pedirlo y no presenta el Formulario 990, pero sus fondos no benefician a personas y los ingresos de un negocio sin relación con su propósito pueden pagar impuesto. En Texas pide la exención de franquicia y de ventas con el Formulario AP-209, y la del impuesto a la propiedad al distrito de tasación; y cumple la nómina de sus empleados.",
    paraLaVida: {
      texto: "Dar a César lo que es de César también es testimonio.",
      pregunta: "¿Tu iglesia sabe qué exenciones tiene y cuáles le faltan?",
    },
  },
  {
    id: "liderazgo-administracion-5-4",
    objetivos: [
      "Explicar, con Colosenses 4:1 y Levítico 19:13, cómo la iglesia trata con justicia a los que trabajan para ella.",
      "Reconocer la excepción ministerial, la sección 702 del Título VII y las obligaciones básicas de un empleador.",
      "Contratar a un empleado de la iglesia con orden.",
    ],
    paraEmpezar:
      "Cuando la iglesia contrata a alguien, se vuelve empleadora. La ley le da a la iglesia libertades especiales para elegir a sus ministros, pero también le pide cumplir con los demás empleados. La Biblia pide algo más: tratar a todos con justicia.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Colosenses 4:1" },
      {
        t: "parrafo",
        texto: "«Amos, haced lo que es justo y recto con vuestros siervos, sabiendo que también vosotros tenéis un Amo en los cielos».",
      },
      { t: "versiculo", ref: "Levítico 19:13" },
      {
        t: "parrafo",
        texto: "«No retendrás el salario del jornalero en tu casa hasta la mañana». El que trabaja recibe a tiempo lo que se le debe.",
      },
      { t: "versiculo", ref: "Santiago 5:4" },
      {
        t: "parrafo",
        texto: "Santiago advierte que «clama el jornal de los obreros», el que no les fue pagado, y que sus clamores «han entrado en los oídos del Señor de los ejércitos».",
      },
      { t: "subtitulo", texto: "Lo que conviene saber" },
      {
        t: "lista",
        items: [
          "La excepción ministerial: en Hosanna-Tabor contra la EEOC (2012), la Corte Suprema reconoció que la Primera Enmienda impide las demandas por discriminación laboral de los ministros contra su iglesia.",
          "En Our Lady of Guadalupe School contra Morrissey-Berru (2020), la Corte aclaró que lo que más pesa son las funciones religiosas de la persona, aunque no tenga título ni estudios religiosos.",
          "La sección 702 del Título VII permite que una organización religiosa prefiera a personas de su misma fe al emplear.",
          "Con todos los empleados, la iglesia cumple lo que pide la ley al contratar, como el Formulario I-9 que verifica que la persona puede trabajar en el país, la nómina y sus impuestos.",
          "En Texas, un empleador privado puede no tener seguro de compensación laboral, pero entonces debe avisar a sus empleados y presentar el aviso de no cobertura.",
          "Por escrito: la descripción del puesto, el salario, el horario, las vacaciones y las políticas que debe cumplir.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: contratar con orden y contratar de palabra" },
      {
        t: "lista",
        items: [
          "Con orden: hay una descripción del puesto y una carta con el salario y el horario. De palabra: cada uno recuerda algo distinto.",
          "Con orden: se pagan la nómina y sus impuestos. De palabra: se le paga en efectivo sin registros.",
          "Con orden: el empleado conoce las políticas y la declaración de fe que debe seguir. De palabra: se le exige lo que nunca se le dijo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: contratar a una secretaria" },
      {
        t: "parrafo",
        texto: "La iglesia va a contratar a una secretaria de medio tiempo para la oficina.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escribir la descripción del puesto: las tareas, el horario, a quién rinde cuentas y si debe compartir la fe de la iglesia.",
          "Paso 2, aprobar el salario en el presupuesto y en el consejo.",
          "Paso 3, entrevistar a las candidatas, pedir referencias y elegir con oración.",
          "Paso 4, darle una carta con el salario, el horario, las vacaciones y las políticas, y completar los formularios de contratación, como el I-9.",
          "Paso 5, ponerla en la nómina y pagar a tiempo su salario y sus impuestos.",
          "Paso 6, guardar su expediente en privado, con llave, y revisar su trabajo con amor cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La excepción ministerial no es permiso para tratar mal a nadie: la iglesia trata a sus ministros y a sus empleados con la justicia que pide la Palabra. Ante un despido o un conflicto laboral, se consulta a un abogado. Lo legal es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "La Biblia manda hacer lo justo y recto con los que trabajan para nosotros, no retener el salario del jornalero, y advierte que el jornal no pagado clama a los oídos del Señor. Hosanna-Tabor (2012) reconoció la excepción ministerial, Our Lady of Guadalupe (2020) aclaró que pesan las funciones religiosas, y la sección 702 del Título VII permite preferir a personas de la misma fe. Con todos los empleados, la iglesia cumple el Formulario I-9, la nómina y sus impuestos, y escribe el puesto, el salario y las políticas.",
    paraLaVida: {
      texto: "La justicia con el que trabaja también es adoración.",
      pregunta: "¿Los que trabajan para tu iglesia saben por escrito qué se espera de ellos y qué recibirán?",
    },
  },
  {
    id: "liderazgo-administracion-5-5",
    objetivos: [
      "Explicar, con Deuteronomio 22:8 y Lucas 17:1-2, por qué la iglesia cuida de que nadie sufra daño en ella.",
      "Reconocer la responsabilidad de la iglesia ante un daño, los seguros y lo que pide la ley de Texas para el abuso de un menor.",
      "Actuar después de un accidente en el templo.",
    ],
    paraEmpezar:
      "Si alguien se lastima en el templo, si un niño sufre un daño o si un líder abusa de su posición, la iglesia puede ser responsable ante la ley, y sobre todo ante Dios. Prevenir, actuar bien cuando algo pasa y cumplir la ley de Texas son parte del cuidado del rebaño.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Deuteronomio 22:8" },
      {
        t: "parrafo",
        texto:
          "La ley de Moisés pedía: «Cuando edifiques casa nueva, harás pretil a tu terrado, para que no eches culpa de sangre sobre tu casa, si de él cayere alguno». Prevenir el daño era parte de la justicia.",
      },
      { t: "versiculo", ref: "Lucas 17:1-2" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «Imposible es que no vengan tropiezos; mas ¡ay de aquel por quien vienen!», y que sería mejor otra suerte «que hacer tropezar a uno de estos pequeñitos».",
      },
      { t: "versiculo", ref: "Proverbios 22:3" },
      {
        t: "parrafo",
        texto: "«El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño».",
      },
      { t: "subtitulo", texto: "La responsabilidad y la protección" },
      {
        t: "lista",
        items: [
          "El deber de cuidado: la iglesia cuida que su edificio y sus actividades no pongan en peligro a nadie; si descuida un peligro que conocía, puede responder por el daño.",
          "Las leyes de los voluntarios protegen al voluntario, pero no cambian la responsabilidad de la iglesia, como se estudia en Equipos y voluntarios.",
          "Los seguros de la propiedad, de responsabilidad, de los vehículos y del abuso ayudan a responder, y se revisan con un agente, como se estudia en Administración eclesiástica.",
          "En Texas, toda persona que sospeche el abuso o el descuido de un menor debe reportarlo de inmediato; los profesionales, como los maestros y las enfermeras, a más tardar en 24 horas, y no pueden pedirle a otro que lo haga por ellos.",
          "El Código de Familia (sección 261.101) no exceptúa al clero: también los pastores reportan.",
          "Después de un incidente se anota lo que pasó, con hechos y testigos, sin culpar a nadie, y se avisa a la aseguradora.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: prevenir y cubrir" },
      {
        t: "lista",
        items: [
          "Prevenir: se arregla la escalera floja. Cubrir: se pone un cartel y se espera que nadie se caiga.",
          "Prevenir: ante la sospecha de abuso, se reporta a las autoridades. Cubrir: se arregla en privado para cuidar la imagen de la iglesia.",
          "Prevenir: se anota el incidente con la verdad. Cubrir: se borra lo que pasó para que no haya problemas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un accidente en el templo" },
      {
        t: "parrafo",
        texto: "Una hermana mayor se resbaló en el pasillo mojado del templo después del culto y se lastimó la muñeca.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, atenderla enseguida, darle primeros auxilios y llamar al 911 si hace falta.",
          "Paso 2, avisar a su familia y al pastor, y acompañarla con amor.",
          "Paso 3, anotar en el reporte del incidente qué pasó, cuándo, dónde y quiénes lo vieron, con hechos y sin culpar a nadie.",
          "Paso 4, avisar a la aseguradora de la iglesia y guardar el reporte en el archivo.",
          "Paso 5, visitarla y seguir cuidándola, sin prometer nada que deba decidir la aseguradora.",
          "Paso 6, corregir la causa: secar el pasillo, poner un tapete y avisar cuando el piso esté mojado.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca se tapa un abuso para cuidar el nombre de la iglesia: se reporta a las autoridades y se cuida a la víctima. Lo legal es una guía general, no un consejo legal; ante una demanda o un caso grave, se consulta a un abogado.",
      },
      {
        t: "pasos",
        titulo: "Qué hacer después de un accidente en el templo",
        pasos: [
          { titulo: "Atender", texto: "Primeros auxilios enseguida, y el 911 si hace falta." },
          { titulo: "Avisar", texto: "A la familia y al pastor, acompañando a la persona con amor." },
          { titulo: "Anotar", texto: "El reporte del incidente: qué pasó, cuándo, dónde y los testigos, sin culpar a nadie." },
          { titulo: "Informar a la aseguradora", texto: "Avisarle y guardar el reporte en el archivo de la iglesia." },
          { titulo: "Seguir cuidando", texto: "Visitar a la persona sin prometer lo que debe decidir la aseguradora." },
          { titulo: "Corregir la causa", texto: "Arreglar lo que provocó el accidente para que no se repita." },
        ],
      },
    ],
    ideaClave:
      "La ley de Moisés pedía hacer pretil al terrado para que nadie cayera, Jesús advirtió contra el que hace tropezar a los pequeños, y el avisado ve el mal y se esconde. La iglesia tiene un deber de cuidado y puede responder por un daño que descuidó; las leyes de los voluntarios no cambian su responsabilidad, y los seguros la ayudan a responder. En Texas toda persona reporta de inmediato la sospecha de abuso de un menor, los profesionales a más tardar en 24 horas, y el clero no está exceptuado. Después de un incidente se atiende, se anota con la verdad, se avisa a la aseguradora y se corrige la causa.",
    paraLaVida: {
      texto: "Prevenir el daño es amar al prójimo.",
      pregunta: "¿Qué peligro de tu templo o de tu ministerio puedes corregir esta semana?",
    },
  },
  {
    id: "liderazgo-administracion-5-6",
    objetivos: [
      "Explicar, con Jeremías 32:9-10 y Génesis 23:16, por qué la iglesia adquiere y cuida su propiedad con orden y a la luz.",
      "Reconocer lo que protege la ley RLUIPA en la zonificación y lo que dice la ADA de las iglesias.",
      "Preparar la compra de un terreno para la iglesia.",
    ],
    paraEmpezar:
      "Comprar un terreno o un edificio es una de las decisiones más grandes de una iglesia. Hacerlo con orden evita conflictos, deudas que ahogan y propiedades a nombre de la persona equivocada. La ley también protege a la iglesia cuando una ciudad le pone trabas para reunirse.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=_Nf4IcDuyTc", titulo: "Resumen del libro de Jeremías", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Jeremías 32:9-10" },
      {
        t: "parrafo",
        texto:
          "Jeremías compró un campo con todo orden: «Y escribí la carta y la sellé, y la hice certificar con testigos, y pesé el dinero en balanza».",
      },
      { t: "versiculo", ref: "Génesis 23:16" },
      {
        t: "parrafo",
        texto:
          "Abraham compró la cueva para sepultar a Sara a la vista de todos: «pesó Abraham a Efrón el dinero que dijo, en presencia de los hijos de Het». Las compras se hacen a la luz y con testigos.",
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto: "Jesús preguntó: «¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».",
      },
      { t: "subtitulo", texto: "La propiedad de la iglesia y la ley" },
      {
        t: "lista",
        items: [
          "El título: la propiedad se compra a nombre de la corporación de la iglesia, nunca a nombre del pastor ni de un miembro.",
          "La decisión: la aprueba quien dicen los estatutos, con el acta y el presupuesto.",
          "La zonificación: antes de comprar, se averigua en la ciudad si en ese terreno se permite una iglesia y qué permisos hacen falta.",
          "La ley RLUIPA (42 U.S.C. 2000cc) dice que el gobierno no puede imponer una regla de zonificación que ponga una carga sustancial al ejercicio religioso, salvo que pruebe un interés apremiante, y que no puede tratar a una iglesia peor que a una asamblea no religiosa.",
          "La ADA: su título III no se aplica a las organizaciones religiosas ni a sus lugares de culto (42 U.S.C. 12187), pero el acceso para las personas con discapacidad sigue siendo un acto de amor.",
          "El impuesto a la propiedad: el lugar de culto puede quedar exento si se pide al distrito de tasación.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: comprar con orden y comprar con prisa" },
      {
        t: "lista",
        items: [
          "Con orden: se averigua la zonificación antes de firmar. Con prisa: se compra y después la ciudad no da el permiso.",
          "Con orden: la iglesia aprueba la compra como dicen los estatutos. Con prisa: la decide una persona.",
          "Con orden: la deuda cabe en el presupuesto. Con prisa: la hipoteca ahoga a la iglesia por años.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: comprar un terreno para la iglesia" },
      {
        t: "parrafo",
        texto: "La iglesia ha ahorrado durante cinco años y encontró un terreno para construir su templo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y presentar la idea al consejo, con el plan de cómo se pagaría la compra y la construcción.",
          "Paso 2, averiguar en la ciudad la zonificación del terreno, si se permite una iglesia y qué permisos hacen falta.",
          "Paso 3, pedir la revisión del título y una inspección del terreno, con un abogado y un agente de confianza.",
          "Paso 4, presentar la compra a la iglesia y aprobarla como dicen los estatutos, con su acta.",
          "Paso 5, comprar a nombre de la corporación de la iglesia, con la escritura registrada en el condado.",
          "Paso 6, pedir la exención del impuesto a la propiedad cuando se use como lugar de culto, y guardar todo en el archivo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si una ciudad niega un permiso a la iglesia de una manera que parezca injusta, se consulta a un abogado que conozca la ley RLUIPA antes de pelear o de rendirse. Lo legal es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "Jeremías compró su campo con una carta sellada, testigos y el dinero pesado en balanza, Abraham compró a la vista de todos, y el que edifica calcula primero los gastos. La propiedad se compra a nombre de la corporación de la iglesia, con la aprobación que piden los estatutos y después de averiguar la zonificación. La ley RLUIPA impide que una regla de zonificación ponga una carga sustancial al ejercicio religioso sin un interés apremiante, la ADA no se aplica a los lugares de culto, y el templo puede quedar exento del impuesto a la propiedad.",
    paraLaVida: {
      texto: "Lo que es de Dios se compra y se cuida a la luz.",
      pregunta: "¿Qué decisión grande de tu ministerio necesita más orden antes de tomarla?",
    },
  },
];
