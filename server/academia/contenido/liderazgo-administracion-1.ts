/**
 * Especialidad Liderazgo y administración · Materia 1 — Administración eclesiástica (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: la administración al servicio
 * del reino, los registros y el archivo (con lo que el IRS pide guardar de la nómina, comprobado), las reuniones y las
 * actas, el templo y los bienes, los riesgos y los seguros (con la opción de Texas de no tener seguro de compensación
 * laboral, comprobada con el Departamento de Seguros de Texas) y los procesos y los manuales. No repite Administración y
 * gobierno de la iglesia (Nivel 5): la da por sabida y baja a la práctica. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const LIDERAZGO_ADMINISTRACION_1: LeccionContenido[] = [
  {
    id: "liderazgo-administracion-1-1",
    objetivos: [
      "Explicar, con Hechos 6:2-4, por qué la administración sirve al ministerio de la Palabra.",
      "Reconocer las áreas de la administración de una iglesia.",
      "Hacer el diagnóstico administrativo de una iglesia.",
    ],
    paraEmpezar:
      "En una iglesia que crece aparecen preguntas prácticas: quién abre el templo, dónde están las actas, quién paga la luz, a quién se llama si se rompe el aire acondicionado. Cuando nadie responde, el pastor termina haciéndolo todo y le queda poco tiempo para la oración y la Palabra. La administración existe para que eso no pase.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 6:2-4" },
      {
        t: "parrafo",
        texto:
          "Cuando faltó la atención de las viudas, los apóstoles dijeron: «No es justo que nosotros dejemos la palabra de Dios, para servir a las mesas». Buscaron «siete varones de buen testimonio, llenos del Espíritu Santo y de sabiduría», y ellos siguieron así: «nosotros persistiremos en la oración y en el ministerio de la palabra».",
      },
      { t: "versiculo", ref: "1 Corintios 12:28" },
      {
        t: "parrafo",
        texto: "Entre los dones que Dios puso en la iglesia, Pablo nombra a «los que ayudan, los que administran». Administrar también es un don para servir.",
      },
      { t: "versiculo", ref: "Tito 1:5" },
      {
        t: "parrafo",
        texto: "Pablo dejó a Tito en Creta «para que corrigieses lo deficiente». Una parte de la administración es ver lo que falta y ordenarlo.",
      },
      { t: "subtitulo", texto: "Las áreas de la administración de una iglesia" },
      {
        t: "lista",
        items: [
          "Las personas: la membresía, los voluntarios y, si los hay, los empleados.",
          "Los registros: las actas, la membresía, los contratos y los documentos legales.",
          "El edificio y los bienes: el mantenimiento, el inventario, la seguridad y el uso de los espacios.",
          "El dinero: el presupuesto, las ofrendas y los pagos, que se estudian en Finanzas y transparencia.",
          "El calendario y las reuniones: qué pasa, cuándo y quién lo prepara.",
          "La comunicación interna: que cada líder sepa lo que se decidió y lo que le toca.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una iglesia que administra y una que improvisa" },
      {
        t: "lista",
        items: [
          "Administra: cada área tiene un responsable. Improvisa: todo depende del pastor.",
          "Administra: las decisiones quedan escritas y se cumplen. Improvisa: nadie recuerda qué se decidió.",
          "Administra: los problemas se ven a tiempo. Improvisa: se descubren cuando ya hacen daño.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el diagnóstico administrativo de una iglesia" },
      {
        t: "parrafo",
        texto:
          "Una iglesia de 120 miembros tiene al pastor ocupado en todo: abre el templo, paga las cuentas, hace los anuncios y guarda las llaves. El consejo le pide a una hermana con el don de administrar que ayude a ordenar la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reunirse con el pastor y el consejo, orar y escuchar qué les preocupa.",
          "Paso 2, hacer una lista de las seis áreas: las personas, los registros, el edificio, el dinero, el calendario y la comunicación.",
          "Paso 3, en cada área, escribir qué funciona, qué falta y quién es el responsable hoy.",
          "Paso 4, elegir solo tres prioridades para los próximos tres meses, como ordenar las actas y hacer un calendario.",
          "Paso 5, nombrar a un responsable y una fecha para cada prioridad, con la aprobación del consejo.",
          "Paso 6, revisar el avance a los tres meses y elegir las siguientes prioridades.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Administrar no es mandar: es servir para que otros sirvan. El que administra no reemplaza al pastor ni al consejo: hace que sus decisiones se cumplan con orden. Las formas de gobierno de la iglesia se estudian en Administración y gobierno de la iglesia, del Nivel 5.",
      },
      {
        t: "cuadro",
        titulo: "Las áreas de la administración y su pregunta clave",
        columnas: ["Área", "Qué incluye", "Pregunta para el diagnóstico"],
        filas: [
          ["Las personas", "La membresía, los voluntarios y los empleados", "¿Cada persona sabe a quién rinde cuentas?"],
          ["Los registros", "Las actas, la membresía, los contratos y los documentos legales", "¿Encontramos cualquier documento en cinco minutos?"],
          ["El edificio y los bienes", "El mantenimiento, el inventario y la seguridad", "¿Sabemos qué hay que reparar este año?"],
          ["El dinero", "El presupuesto, las ofrendas y los pagos", "¿Hay controles y un informe cada mes?"],
          ["El calendario y las reuniones", "Las actividades del año y las reuniones del consejo", "¿Todos conocen las fechas con tiempo?"],
          ["La comunicación interna", "Lo que se decide y a quién le toca", "¿Cada líder sabe lo que se decidió?"],
        ],
      },
    ],
    ideaClave:
      "Los apóstoles no dejaron la Palabra para servir a las mesas: buscaron siete hombres de buen testimonio y siguieron en la oración y el ministerio de la Palabra. Administrar es un don, y una parte de él es corregir lo deficiente. La administración de una iglesia abarca las personas, los registros, el edificio y los bienes, el dinero, el calendario y la comunicación interna. Se empieza con un diagnóstico: qué funciona, qué falta y quién es el responsable, con pocas prioridades y fechas.",
    paraLaVida: {
      texto: "Administrar es servir para que otros sirvan.",
      pregunta: "¿Qué área de tu iglesia o de tu ministerio necesita hoy un responsable?",
    },
  },
  {
    id: "liderazgo-administracion-1-2",
    objetivos: [
      "Explicar, con Esdras 2:62 y Jeremías 32:14, por qué la iglesia guarda bien sus registros.",
      "Reconocer qué registros guarda una iglesia, por cuánto tiempo y con qué cuidado.",
      "Ordenar el archivo de una iglesia.",
    ],
    paraEmpezar:
      "Un día alguien pide una constancia de bautismo, el banco pide el acta donde se nombró al tesorero o la aseguradora pide el inventario. Si los papeles están en cajas sin nombre o en la casa de un hermano que se mudó, la iglesia pasa vergüenza o pierde lo que le corresponde. Un buen archivo protege a la iglesia y a su gente.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=_Nf4IcDuyTc", titulo: "Resumen del libro de Jeremías", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Esdras 2:62" },
      {
        t: "parrafo",
        texto:
          "Al volver del exilio, algunos sacerdotes «buscaron su registro de genealogías, y no fue hallado; y fueron excluidos del sacerdocio». Un registro perdido tuvo consecuencias.",
      },
      { t: "versiculo", ref: "Jeremías 32:14" },
      {
        t: "parrafo",
        texto:
          "Dios mandó guardar la carta de venta del campo de Jeremías: «ponlas en una vasija de barro, para que se conserven muchos días». Lo importante se guarda en un lugar seguro.",
      },
      { t: "versiculo", ref: "Esdras 8:33-34" },
      {
        t: "parrafo",
        texto: "Al entregar el tesoro en el templo, «Por cuenta y por peso se entregó todo, y se apuntó todo aquel peso en aquel tiempo».",
      },
      { t: "subtitulo", texto: "Los registros de una iglesia" },
      {
        t: "lista",
        items: [
          "Los legales: el certificado de formación, los estatutos y sus cambios, las actas del consejo y de las asambleas y el número de identificación del empleador.",
          "La membresía: las altas y las bajas, los bautismos, las presentaciones de niños y las bodas.",
          "Los bienes: las escrituras, los contratos, las pólizas de seguro, el inventario y las garantías.",
          "El dinero: los presupuestos, los informes, los comprobantes, los estados de cuenta y los recibos de las donaciones.",
          "El personal: los contratos y los registros de la nómina y sus impuestos.",
          "La protección: los permisos de los padres y los registros de los voluntarios que sirven con niños.",
        ],
      },
      { t: "subtitulo", texto: "Cuánto tiempo se guardan" },
      {
        t: "parrafo",
        texto:
          "Si la iglesia tiene empleados, el IRS pide guardar los registros de los impuestos de la nómina al menos 4 años después de que el impuesto vence o se paga; para los demás registros que respaldan los impuestos, el IRS sugiere en general 3 años. Los estatutos, las actas y las escrituras conviene guardarlos siempre. Lo legal es una guía general, no un consejo legal: ante una duda, se consulta a un contador.",
      },
      { t: "subtitulo", texto: "Comparación: un archivo ordenado y uno perdido" },
      {
        t: "lista",
        items: [
          "Ordenado: cada documento tiene su carpeta y su lugar. Perdido: cajas sin nombre en un cuarto.",
          "Ordenado: hay una copia digital con respaldo. Perdido: el único papel se mojó en una gotera.",
          "Ordenado: se sabe quién puede verlo. Perdido: cualquiera abre la gaveta de las actas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ordenar el archivo de la iglesia" },
      {
        t: "parrafo",
        texto: "La iglesia guarda sus papeles en tres cajas, en la casa de un diácono y en la oficina, sin ningún orden.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reunir todos los documentos en un solo lugar, con la ayuda de dos personas de confianza.",
          "Paso 2, separarlos por tipo: legales, membresía, bienes, dinero, personal y protección.",
          "Paso 3, guardarlos en un gabinete con llave en la iglesia, y escanear los importantes en una cuenta de la iglesia con respaldo.",
          "Paso 4, decidir quién tiene acceso a cada tipo: por ejemplo, el secretario a las actas y el tesorero a las finanzas.",
          "Paso 5, hacer un índice y una tabla de cuánto tiempo se guarda cada cosa.",
          "Paso 6, revisar el archivo cada año y destruir con cuidado lo vencido, por ejemplo con una trituradora.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los registros con datos privados, como los de la consejería o los teléfonos de los miembros, no se dejan a la vista ni se guardan en cuentas personales. Su cuidado en internet se estudia en Ética y seguridad digital, de la especialidad Comunicaciones y medios.",
      },
    ],
    ideaClave:
      "Los sacerdotes que no hallaron su registro fueron excluidos del sacerdocio, Dios mandó guardar la carta de venta para que se conservara muchos días, y el tesoro se entregó por cuenta y por peso, apuntándolo todo. La iglesia guarda sus registros legales, de membresía, de bienes, de dinero, de personal y de protección. Los de la nómina se guardan al menos 4 años, y los estatutos, las actas y las escrituras, siempre. Un archivo ordenado tiene su lugar con llave, una copia digital, un índice y personas responsables.",
    paraLaVida: {
      texto: "Lo que se guarda bien, sirve muchos días.",
      pregunta: "¿Qué documento importante de tu ministerio no sabrías encontrar hoy?",
    },
  },
  {
    id: "liderazgo-administracion-1-3",
    objetivos: [
      "Explicar, con Hechos 15, cómo la iglesia se reúne, decide y deja por escrito lo que decide.",
      "Preparar y dirigir una reunión que sirva, con su agenda y su quórum.",
      "Escribir el acta de una reunión del consejo.",
    ],
    paraEmpezar:
      "Muchas reuniones de iglesia empiezan tarde, se alargan, dan vueltas sobre lo mismo y terminan sin saber qué se decidió. Una buena reunión ahorra tiempo, une al equipo y deja todo claro. Y lo que se decide queda escrito en el acta.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 15:6" },
      {
        t: "parrafo",
        texto: "Ante una pregunta difícil, «se reunieron los apóstoles y los ancianos para conocer de este asunto». Escucharon a todos antes de decidir.",
      },
      { t: "versiculo", ref: "Hechos 15:22" },
      {
        t: "parrafo",
        texto: "La decisión fue clara: «pareció bien a los apóstoles y a los ancianos, con toda la iglesia, elegir de entre ellos varones y enviarlos a Antioquía».",
      },
      { t: "versiculo", ref: "Hechos 15:28" },
      {
        t: "parrafo",
        texto: "Y la pusieron por escrito en una carta: «ha parecido bien al Espíritu Santo, y a nosotros». Lo que se decidió llegó a todos.",
      },
      { t: "subtitulo", texto: "Una reunión que sirve" },
      {
        t: "lista",
        items: [
          "Un propósito claro: decidir, planear o informar.",
          "Una agenda enviada antes, con los temas y los documentos que hay que leer.",
          "Empezar con oración, a la hora, y terminar a tiempo.",
          "El quórum que piden los estatutos, para que las decisiones valgan.",
          "Escuchar a todos y decidir según los estatutos de la iglesia.",
          "Terminar cada tema con una decisión clara: qué se hará, quién lo hará y para cuándo.",
        ],
      },
      { t: "subtitulo", texto: "Lo que lleva un acta" },
      {
        t: "lista",
        items: [
          "La fecha, la hora y el lugar.",
          "Quiénes estuvieron y si hubo quórum.",
          "Los temas tratados.",
          "Las decisiones y, si las hubo, las votaciones, sin copiar toda la discusión.",
          "Los responsables y las fechas de cada tarea.",
          "La firma del secretario y la aprobación en la reunión siguiente.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: una reunión con rumbo y una sin rumbo" },
      {
        t: "lista",
        items: [
          "Con rumbo: una agenda de cinco temas. Sin rumbo: se habla de lo que vaya saliendo.",
          "Con rumbo: cada tema termina con un responsable. Sin rumbo: todos están de acuerdo, pero nadie lo hace.",
          "Con rumbo: el acta llega en la semana. Sin rumbo: en la próxima reunión se discute lo mismo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el acta de una reunión del consejo" },
      {
        t: "parrafo",
        texto:
          "El consejo se reúne para decidir la fecha del aniversario, aprobar la compra de un equipo de sonido y nombrar a quien coordinará la escuela bíblica de vacaciones.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, anotar la fecha, la hora, el lugar, los presentes y que hubo quórum.",
          "Paso 2, escribir cada tema con su decisión: el aniversario será el domingo 12 de octubre.",
          "Paso 3, anotar la votación cuando la hay: se aprobó la compra del equipo, hasta 1,500 dólares, por cinco votos contra uno.",
          "Paso 4, poner el responsable y la fecha: la hermana Rosa coordinará la escuela bíblica y presentará su plan el 15 de mayo.",
          "Paso 5, enviar el borrador al pastor y al consejo en la semana, para que lo revisen.",
          "Paso 6, aprobarlo en la reunión siguiente, firmarlo y guardarlo en el archivo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El acta guarda lo que se decidió, no lo que cada uno opinó. Los temas delicados, como la disciplina o la consejería, se anotan sin detalles que expongan a nadie. Muchas iglesias usan un reglamento de debates, como las Reglas de orden de Robert, para dirigir las asambleas.",
      },
      {
        t: "pasos",
        titulo: "De la reunión al acta",
        pasos: [
          { titulo: "Antes", texto: "Definir el propósito, enviar la agenda y los documentos, y confirmar que habrá quórum." },
          { titulo: "Al empezar", texto: "Orar, empezar a la hora y repasar la agenda y las tareas de la reunión anterior." },
          { titulo: "Durante", texto: "Escuchar a todos y cerrar cada tema con una decisión: qué, quién y para cuándo." },
          { titulo: "Al terminar", texto: "Leer en voz alta las decisiones y las tareas, y terminar a tiempo con oración." },
          { titulo: "Después", texto: "Enviar el borrador del acta en la semana, aprobarlo en la próxima reunión, firmarlo y archivarlo." },
        ],
      },
    ],
    ideaClave:
      "En Jerusalén se reunieron los apóstoles y los ancianos para conocer el asunto, decidieron con toda la iglesia y lo pusieron por escrito: ha parecido bien al Espíritu Santo y a nosotros. Una reunión que sirve tiene propósito, agenda, oración, hora de empezar y de terminar, quórum y decisiones claras con responsables y fechas. El acta guarda la fecha, los presentes y el quórum, los temas, las decisiones y las votaciones, los responsables, la firma del secretario y su aprobación.",
    paraLaVida: {
      texto: "Lo que se decide en orden, se cumple.",
      pregunta: "¿Qué decisión de tu equipo necesita un responsable y una fecha?",
    },
  },
  {
    id: "liderazgo-administracion-1-4",
    objetivos: [
      "Explicar, con 2 Reyes 12:5 y 2 Crónicas 24:13, por qué la iglesia cuida a tiempo su edificio y sus bienes.",
      "Organizar el mantenimiento, el inventario, la seguridad y el uso de los espacios.",
      "Hacer el plan de mantenimiento del año.",
    ],
    paraEmpezar:
      "El templo es la casa donde la iglesia se reúne, y sus bienes son ofrendas del pueblo de Dios. Una gotera que nadie arregla, una salida bloqueada o un equipo que se pierde cuestan más que cuidarlos a tiempo. Cuidar lo que Dios confió también es servirle.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "2 Reyes 12:5" },
      {
        t: "parrafo",
        texto: "El rey Joás mandó a los sacerdotes que «reparen los portillos del templo dondequiera que se hallen grietas». Se revisó y se reparó lo que hacía falta.",
      },
      { t: "versiculo", ref: "2 Crónicas 24:13" },
      {
        t: "parrafo",
        texto: "Los artesanos trabajaron, «y restituyeron la casa de Dios a su antigua condición, y la consolidaron».",
      },
      { t: "versiculo", ref: "Proverbios 27:23" },
      {
        t: "parrafo",
        texto: "«Sé diligente en conocer el estado de tus ovejas». El que administra conoce el estado de lo que tiene a su cargo.",
      },
      { t: "subtitulo", texto: "Cuidar el edificio y los bienes" },
      {
        t: "lista",
        items: [
          "El mantenimiento a tiempo: el techo, el aire acondicionado, la plomería y la electricidad, con un calendario de revisiones.",
          "El inventario: cada equipo, instrumento o mueble con su número, su lugar, su valor aproximado y su responsable.",
          "La limpieza y el orden: turnos claros y los materiales a mano.",
          "La seguridad: las salidas libres y señaladas, los extintores revisados, un botiquín y un plan para salir en una emergencia.",
          "El acceso: rampas, asientos y baños pensados para las personas con discapacidad y los mayores.",
          "El uso por otros: un acuerdo escrito con los horarios, las reglas y el depósito, y el seguro de quien lo usa si hace falta.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: cuidar a tiempo y reparar tarde" },
      {
        t: "lista",
        items: [
          "A tiempo: se limpia el desagüe del techo cada otoño. Tarde: la gotera daña el techo y el piso.",
          "A tiempo: el inventario dice dónde está cada micrófono. Tarde: un equipo se pierde y nadie sabe cuándo.",
          "A tiempo: se revisan los extintores. Tarde: se descubre en la emergencia que no sirven.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de mantenimiento del año" },
      {
        t: "parrafo",
        texto: "El consejo nombra a un hermano como encargado del edificio, y le pide un plan para el año que empieza.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recorrer el templo con dos personas y anotar el estado de cada parte: el techo, el aire, la plomería, la electricidad, los baños y el estacionamiento.",
          "Paso 2, separar lo urgente, lo que puede esperar y lo que se revisa cada cierto tiempo.",
          "Paso 3, armar un calendario: los filtros del aire cada pocos meses, el techo antes de la temporada de lluvias y los extintores una vez al año.",
          "Paso 4, pedir dos o tres presupuestos para los trabajos grandes y presentarlos al consejo.",
          "Paso 5, formar un equipo de voluntarios para lo sencillo, y contratar a profesionales con licencia para la electricidad y el gas.",
          "Paso 6, anotar cada trabajo hecho, con su fecha y su costo, e informar al consejo cada tres meses.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de prestar o rentar el templo, se firma un acuerdo escrito y se consulta a la aseguradora de la iglesia. Los trabajos de electricidad, gas o estructura los hacen profesionales con licencia, no voluntarios sin preparación.",
      },
    ],
    ideaClave:
      "Joás mandó reparar las grietas del templo, los artesanos restituyeron la casa de Dios y la consolidaron, y el sabio conoce el estado de lo que tiene a su cargo. La iglesia cuida a tiempo su edificio: el mantenimiento con calendario, el inventario de los bienes, la limpieza, la seguridad con salidas libres y extintores revisados, el acceso para todos y un acuerdo escrito cuando otros usan el templo. El plan del año revisa, separa lo urgente, programa, pide presupuestos, reparte el trabajo y lo anota.",
    paraLaVida: {
      texto: "Cuidar a tiempo es más barato que reparar tarde.",
      pregunta: "¿Qué reparación del templo o de tu casa estás dejando para después?",
    },
  },
  {
    id: "liderazgo-administracion-1-5",
    objetivos: [
      "Explicar, con Proverbios 22:3 y Lucas 14:28, por qué la iglesia prevé los riesgos.",
      "Manejar los riesgos: identificarlos, medirlos, reducirlos, transferirlos y prepararse.",
      "Hacer el inventario de riesgos de una actividad.",
    ],
    paraEmpezar:
      "Un niño se cae en el patio, un hermano se lastima al subir una escalera, se roban el equipo o un incendio daña el salón. La fe no nos hace descuidados: el sabio ve el peligro y se prepara. Prever los riesgos es una forma de amar a las personas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 22:3" },
      {
        t: "parrafo",
        texto: "«El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño».",
      },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús preguntó: «¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».",
      },
      { t: "versiculo", ref: "Eclesiastés 11:2" },
      {
        t: "parrafo",
        texto: "«Reparte a siete, y aun a ocho; porque no sabes el mal que vendrá sobre la tierra». El sabio no pone todo en un solo lugar.",
      },
      { t: "subtitulo", texto: "Cómo se manejan los riesgos" },
      {
        t: "lista",
        items: [
          "Identificar: preguntarse qué puede salir mal en las personas, el edificio, las actividades, los vehículos, el dinero y los datos.",
          "Medir: qué tan probable es y qué tan grave sería.",
          "Reducir: con reglas, capacitación y revisiones, como dos adultos con los niños o una lista antes de salir de viaje.",
          "Transferir: con seguros y con acuerdos escritos.",
          "Prepararse: un plan para las emergencias, con los teléfonos y las tareas de cada uno.",
          "Revisar: después de cada actividad y una vez al año.",
        ],
      },
      { t: "subtitulo", texto: "Los seguros que muchas iglesias consideran" },
      {
        t: "lista",
        items: [
          "El de la propiedad: el edificio y los bienes, ante un incendio, una tormenta o un robo.",
          "El de responsabilidad general: si alguien se lesiona en el templo o en una actividad.",
          "El de los vehículos de la iglesia.",
          "El que cubre las denuncias de abuso o de conducta sexual indebida.",
          "El de los directores y los oficiales de la junta.",
          "El de compensación laboral, si hay empleados: en Texas, un empleador privado puede elegir no tenerlo, pero entonces debe avisar a sus empleados y presentar el aviso de no cobertura (formulario DWC-005).",
        ],
      },
      { t: "subtitulo", texto: "Comparación: prevenir y reaccionar" },
      {
        t: "lista",
        items: [
          "Prevenir: se piden los permisos médicos antes del campamento. Reaccionar: se buscan los teléfonos de los padres durante la emergencia.",
          "Prevenir: el chofer tiene licencia y el vehículo, su revisión. Reaccionar: se averigua después del accidente.",
          "Prevenir: se revisa la póliza cada año. Reaccionar: se descubre que el seguro no cubría lo que se dañó.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el inventario de riesgos de un campamento" },
      {
        t: "parrafo",
        texto: "El ministerio de jóvenes prepara un campamento de tres días a dos horas de la ciudad, con 40 jóvenes y 8 adultos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reunirse con los líderes y anotar todo lo que puede salir mal: el viaje, el agua, las caminatas, las alergias, la comida y la supervisión.",
          "Paso 2, marcar cuáles son más probables y cuáles serían más graves.",
          "Paso 3, para cada riesgo, escribir cómo se reduce: los permisos y las fichas médicas, los choferes con licencia, nadar solo con un salvavidas y dos adultos con cada grupo.",
          "Paso 4, revisar con la aseguradora que la actividad esté cubierta y pedir el seguro del lugar del campamento.",
          "Paso 5, escribir el plan de emergencia: el hospital más cercano, los teléfonos de los padres y quién llama a quién.",
          "Paso 6, al volver, anotar lo que pasó y lo que se debe cambiar para el próximo campamento.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los seguros se eligen con un agente de confianza, leyendo lo que cubre cada póliza y lo que no. Lo legal de esta lección es una guía general, no un consejo legal. La protección de los niños se estudia a fondo en Protección de menores, de la especialidad Niñez.",
      },
      {
        t: "cuadro",
        titulo: "El inventario de riesgos de un campamento",
        columnas: ["Riesgo", "Cómo se reduce", "Quién responde"],
        filas: [
          ["El viaje", "Choferes con licencia, vehículos revisados y cinturón para todos", "El coordinador del transporte"],
          ["El agua", "Nadar solo con un salvavidas presente y con dos adultos mirando", "El encargado de las actividades"],
          ["La salud", "Fichas médicas con las alergias y los permisos firmados por los padres", "La persona del botiquín"],
          ["La supervisión", "Dos adultos con cada grupo y nadie a solas con un menor", "Cada líder de grupo"],
          ["Una emergencia", "El plan con el hospital cercano y los teléfonos de los padres", "El director del campamento"],
        ],
      },
    ],
    ideaClave:
      "El avisado ve el mal y se esconde, el que edifica calcula primero los gastos, y el sabio reparte porque no sabe el mal que vendrá. Los riesgos se manejan identificándolos, midiéndolos, reduciéndolos con reglas y capacitación, transfiriéndolos con seguros y acuerdos, preparándose con un plan de emergencia y revisando. Muchas iglesias consideran los seguros de la propiedad, de responsabilidad general, de los vehículos, de abuso, de los directores y, si hay empleados, de compensación laboral, que en Texas un empleador privado puede elegir no tener si avisa como pide la ley.",
    paraLaVida: {
      texto: "Prever también es una forma de amar.",
      pregunta: "¿Qué riesgo de la próxima actividad de tu ministerio puedes reducir esta semana?",
    },
  },
  {
    id: "liderazgo-administracion-1-6",
    objetivos: [
      "Explicar, con Éxodo 18:20 y 1 Corintios 14:33, por qué la iglesia escribe sus procesos.",
      "Escribir un procedimiento y armar el manual de la iglesia.",
      "Mejorar un proceso que no funciona.",
    ],
    paraEmpezar:
      "En muchas iglesias, las cosas funcionan porque una persona sabe cómo hacerlas. Cuando esa persona se enferma, se muda o se cansa, todo se detiene. Un proceso escrito permite que otros sirvan con confianza y que la obra siga.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=y9pED55wMM4", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 18:20-21" },
      {
        t: "parrafo",
        texto:
          "Jetro le aconsejó a Moisés: «enseña a ellos las ordenanzas y las leyes, y muéstrales el camino por donde deben andar, y lo que han de hacer». Después, que escogiera a hombres de verdad para que lo ayudaran.",
      },
      { t: "versiculo", ref: "1 Corintios 14:33" },
      {
        t: "parrafo",
        texto: "«pues Dios no es Dios de confusión, sino de paz». El orden en la iglesia refleja quién es Dios.",
      },
      { t: "versiculo", ref: "Proverbios 24:3" },
      {
        t: "parrafo",
        texto: "«Con sabiduría se edificará la casa, Y con prudencia se afirmará». Los procesos son una forma de edificar con sabiduría.",
      },
      { t: "subtitulo", texto: "Lo que tiene un buen procedimiento" },
      {
        t: "lista",
        items: [
          "Un nombre y un propósito: para qué sirve.",
          "Quién lo hace y quién lo aprueba.",
          "Los pasos en orden, con palabras sencillas.",
          "Los formularios o las listas que se usan.",
          "Qué hacer si algo falla y a quién avisar.",
          "La fecha de la última revisión.",
        ],
      },
      { t: "subtitulo", texto: "El manual de la iglesia" },
      {
        t: "parrafo",
        texto:
          "El manual junta en un solo lugar las descripciones de las funciones de cada servidor, los procedimientos, como abrir y cerrar el templo o reservar un salón, y las políticas de la iglesia, como la protección de menores, las redes y las finanzas. Lo aprueba el consejo, se les entrega a los que sirven y se revisa cada año.",
      },
      { t: "subtitulo", texto: "Comparación: un proceso escrito y uno en la cabeza de alguien" },
      {
        t: "lista",
        items: [
          "Escrito: cualquier voluntario preparado puede hacerlo. En la cabeza: solo una persona sabe, y si falta, nadie puede.",
          "Escrito: se hace igual cada vez. En la cabeza: cada uno lo hace a su manera.",
          "Escrito: se puede mejorar. En la cabeza: los errores se repiten sin que nadie los vea.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el procedimiento para reservar el templo" },
      {
        t: "parrafo",
        texto:
          "Dos ministerios llegaron el mismo sábado al salón, porque los dos habían hablado con personas distintas. El consejo pide un procedimiento para reservar los espacios.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, nombrar a una sola persona que lleva el calendario de los espacios, y a un suplente.",
          "Paso 2, hacer un formulario sencillo: el ministerio, el responsable, el espacio, la fecha, la hora de entrada y de salida y lo que se necesita.",
          "Paso 3, fijar las reglas: pedir con dos semanas de anticipación, dejar limpio y devolver las llaves.",
          "Paso 4, decidir qué tiene prioridad cuando dos piden lo mismo, como los cultos y las actividades del calendario anual.",
          "Paso 5, escribir el procedimiento en una página, aprobarlo en el consejo y explicarlo a todos los líderes.",
          "Paso 6, revisarlo a los tres meses y corregir lo que no funcionó.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un procedimiento no reemplaza al amor ni al buen juicio: sirve para que la obra siga en orden y para que nadie cargue solo con todo. Si un proceso ya no sirve, se cambia.",
      },
    ],
    ideaClave:
      "Jetro le aconsejó a Moisés enseñar las ordenanzas y mostrar el camino y lo que había que hacer; Dios no es Dios de confusión, sino de paz, y con sabiduría se edifica la casa. Un buen procedimiento tiene nombre y propósito, responsables, pasos en orden, formularios, qué hacer si algo falla y la fecha de su revisión. El manual junta las funciones, los procedimientos y las políticas, lo aprueba el consejo y se revisa cada año. Un proceso escrito permite que la obra siga aunque falte una persona.",
    paraLaVida: {
      texto: "Lo que se escribe, otros lo pueden continuar.",
      pregunta: "¿Qué tarea que solo tú sabes hacer podrías escribir paso a paso para otro?",
    },
  },
];
