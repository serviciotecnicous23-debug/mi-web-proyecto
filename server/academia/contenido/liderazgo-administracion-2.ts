/**
 * Especialidad Liderazgo y administración · Materia 2 — Finanzas y transparencia (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: el dinero de Dios en manos de
 * la iglesia, el presupuesto, los controles internos (la regla de los dos, comprobada en guías de aseguradoras de
 * iglesias), las ofrendas y sus recibos (la Publicación 1771 del IRS), los informes y la revisión (las iglesias no
 * presentan el Formulario 990) y el sostén del pastor y de los empleados (la asignación para vivienda de la sección 107,
 * el Seguro Social por SECA y el plan de reembolsos de 26 CFR 1.62-2). No repite el dinero de la iglesia de
 * Administración y gobierno de la iglesia (Nivel 5) ni la Mayordomía cristiana (Nivel 2). Lo legal y lo tributario son
 * una guía general, no un consejo legal ni contable.
 */
import type { LeccionContenido } from "../tipos";

export const LIDERAZGO_ADMINISTRACION_2: LeccionContenido[] = [
  {
    id: "liderazgo-administracion-2-1",
    objetivos: [
      "Explicar, con 2 Corintios 8:20-21, por qué la iglesia maneja el dinero con transparencia.",
      "Reconocer los principios de las finanzas de una iglesia: mayordomía, propósito, controles y rendición de cuentas.",
      "Escribir la política financiera de una iglesia.",
    ],
    paraEmpezar:
      "Pocas cosas dañan tanto a una iglesia como una sospecha sobre el dinero. Aunque nadie haya robado nada, el desorden abre la puerta al chisme y a la desconfianza. Las finanzas claras protegen el testimonio de la iglesia y a los hermanos que sirven con el dinero.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Corintios 8:20-21" },
      {
        t: "parrafo",
        texto:
          "Al llevar la ofrenda a Jerusalén, Pablo cuidaba el manejo del dinero: «evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos, procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
      },
      { t: "versiculo", ref: "Lucas 16:10-11" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó: «El que es fiel en lo muy poco, también en lo más es fiel», y preguntó: «Pues si en las riquezas injustas no fuisteis fieles, ¿quién os confiará lo verdadero?».",
      },
      { t: "versiculo", ref: "1 Corintios 4:2" },
      {
        t: "parrafo",
        texto: "«Ahora bien, se requiere de los administradores, que cada uno sea hallado fiel». El dinero de la iglesia no es de quien lo maneja: es de Dios, confiado a la iglesia.",
      },
      { t: "subtitulo", texto: "Los principios de las finanzas de una iglesia" },
      {
        t: "lista",
        items: [
          "La mayordomía: el dinero es de Dios, y la iglesia lo administra para su obra.",
          "El propósito: cada ofrenda se usa para lo que se dio; lo designado para las misiones va a las misiones.",
          "El presupuesto: se planea antes de gastar, y lo aprueba quien piden los estatutos.",
          "Los controles: ninguna persona maneja sola el dinero de principio a fin.",
          "La rendición de cuentas: informes claros al consejo y a la iglesia, y una revisión cada año.",
          "La transparencia sin exponer a nadie: se informan los números, no lo que da cada hermano.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: unas finanzas claras y unas finanzas oscuras" },
      {
        t: "lista",
        items: [
          "Claras: dos personas cuentan la ofrenda y la firman. Oscuras: el tesorero la cuenta solo en su casa.",
          "Claras: cada gasto tiene su comprobante. Oscuras: se paga en efectivo sin recibo.",
          "Claras: la iglesia recibe un informe cada trimestre. Oscuras: nadie sabe cuánto hay ni en qué se gasta.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la política financiera de la iglesia" },
      {
        t: "parrafo",
        texto:
          "La iglesia nunca ha tenido reglas escritas para el dinero. El consejo le pide al tesorero y a otros dos hermanos que preparen una política financiera de dos páginas.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escribir el propósito: administrar con fidelidad las ofrendas para la obra de Dios.",
          "Paso 2, decir quiénes manejan el dinero y qué hace cada uno: los que cuentan, el que registra, el que deposita y los que firman.",
          "Paso 3, fijar las reglas del conteo, del depósito, de los pagos y de los comprobantes.",
          "Paso 4, poner los límites: cuánto puede aprobar el tesorero, cuánto el pastor y desde cuánto decide el consejo.",
          "Paso 5, fijar los informes: cada mes al consejo, cada trimestre a la iglesia y una revisión al año.",
          "Paso 6, aprobarla en el consejo, firmarla, entregarla a los que sirven con el dinero y revisarla cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los controles no son desconfianza: protegen a los que sirven con el dinero de cualquier sospecha. Un tesorero honrado pide controles; el que los rechaza da una señal de alarma. Lo tributario de esta materia es una guía general, no un consejo legal ni contable.",
      },
    ],
    ideaClave:
      "Pablo cuidaba la ofrenda para que nadie los censurara y procuraba hacer las cosas honradamente delante del Señor y de los hombres; el fiel en lo poco es fiel en lo mucho, y a los administradores se les pide fidelidad. Las finanzas de una iglesia se rigen por la mayordomía, el propósito de cada ofrenda, el presupuesto, los controles, la rendición de cuentas y una transparencia que informa los números sin exponer a nadie. La política financiera escribe quién hace qué, las reglas, los límites y los informes.",
    paraLaVida: {
      texto: "Lo que es de Dios se maneja a la luz.",
      pregunta: "¿Qué parte del manejo del dinero de tu ministerio necesita más claridad?",
    },
  },
  {
    id: "liderazgo-administracion-2-2",
    objetivos: [
      "Explicar, con Lucas 14:28 y Proverbios 21:5, por qué la iglesia planea su dinero antes de gastarlo.",
      "Armar el presupuesto anual de una iglesia y seguirlo cada mes.",
      "Ajustar el presupuesto cuando las ofrendas bajan.",
    ],
    paraEmpezar:
      "Sin presupuesto, la iglesia gasta en lo que se pide primero y se queda sin dinero para lo importante. Con presupuesto, el consejo decide de antemano, con oración, cómo servirá el dinero a la misión del año.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=CxiSs-SHTuI", titulo: "Resumen del libro de Lucas (parte 2)", fuente: "Proyecto Biblia" },
      { t: "versiculo", ref: "Lucas 14:28" },
      {
        t: "parrafo",
        texto:
          "Jesús preguntó: «¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?».",
      },
      { t: "versiculo", ref: "Proverbios 21:5" },
      {
        t: "parrafo",
        texto:
          "«Los pensamientos del diligente ciertamente tienden a la abundancia; Mas todo el que se apresura alocadamente, de cierto va a la pobreza».",
      },
      { t: "versiculo", ref: "Proverbios 22:7" },
      {
        t: "parrafo",
        texto: "«el que toma prestado es siervo del que presta». Una iglesia que gasta más de lo que entra termina atada a sus deudas.",
      },
      { t: "subtitulo", texto: "Cómo se arma el presupuesto" },
      {
        t: "lista",
        items: [
          "Los ingresos esperados: se calculan con lo que entró en los últimos doce meses, sin contar con lo que se espera de milagro.",
          "Los gastos fijos: el alquiler o la hipoteca, la luz, el agua, el seguro y los salarios.",
          "Los ministerios: lo que necesita cada uno, según su plan del año.",
          "Las misiones y la ayuda a los necesitados, con su parte desde el principio.",
          "Una reserva para las emergencias, que crece poco a poco.",
          "La aprobación: la da quien piden los estatutos, y se informa a la iglesia.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un presupuesto real y uno de deseos" },
      {
        t: "lista",
        items: [
          "Real: se basa en lo que entró el año pasado. De deseos: cuenta con que las ofrendas se dupliquen.",
          "Real: se compara cada mes lo presupuestado con lo gastado. De deseos: se mira en diciembre, cuando ya no hay remedio.",
          "Real: deja una reserva. De deseos: gasta todo y pide prestado cuando algo se rompe.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el presupuesto del año" },
      {
        t: "parrafo",
        texto:
          "En los últimos doce meses entraron 120,000 dólares a la iglesia. El consejo prepara el presupuesto del año que viene.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar juntos y repasar el plan del año de la iglesia y de cada ministerio.",
          "Paso 2, calcular los ingresos con lo que entró: unos 120,000 dólares, sin inflarlos.",
          "Paso 3, poner primero los gastos fijos, y después las misiones y la ayuda a los necesitados.",
          "Paso 4, repartir lo que queda entre los ministerios según sus planes, y apartar una parte para la reserva.",
          "Paso 5, si los gastos pasan de los ingresos, recortar o posponer, en vez de presupuestar con deudas.",
          "Paso 6, aprobarlo según los estatutos, informarlo a la iglesia y compararlo cada mes con lo gastado de verdad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si las ofrendas bajan a mitad de año, el consejo no espera a diciembre: revisa el presupuesto, pospone lo que puede esperar, protege lo esencial y lo informa con claridad a la iglesia.",
      },
      {
        t: "cuadro",
        titulo: "El presupuesto de una iglesia, partida por partida",
        columnas: ["Partida", "Qué incluye", "De dónde sale el número"],
        filas: [
          ["Los ingresos", "Los diezmos, las ofrendas y otros ingresos", "Lo que entró en los últimos doce meses"],
          ["Los gastos fijos", "El local, la luz, el agua, el seguro y los salarios", "Las facturas y los contratos del año"],
          ["Los ministerios", "Niños, jóvenes, alabanza y los demás", "El plan del año de cada ministerio"],
          ["Las misiones y la ayuda", "Los misioneros y la ayuda a los necesitados", "Lo que el consejo aparta desde el principio"],
          ["La reserva", "Lo que se guarda para las emergencias", "Una parte de cada mes, poco a poco"],
        ],
      },
    ],
    ideaClave:
      "El que edifica se sienta primero y calcula los gastos, los planes del diligente tienden a la abundancia, y el que toma prestado es siervo del que presta. El presupuesto calcula los ingresos con lo que entró en los últimos doce meses, pone primero los gastos fijos, aparta las misiones y la ayuda, reparte a los ministerios según sus planes y guarda una reserva. Lo aprueba quien piden los estatutos, se informa a la iglesia y se compara cada mes con lo gastado.",
    paraLaVida: {
      texto: "Planear el dinero también es un acto de fe.",
      pregunta: "¿Tienes un presupuesto para tu casa o tu ministerio? ¿Cuándo lo revisaste por última vez?",
    },
  },
  {
    id: "liderazgo-administracion-2-3",
    objetivos: [
      "Explicar, con 2 Reyes 12:10 y Deuteronomio 19:15, por qué el dinero lo manejan siempre dos o más personas.",
      "Aplicar los controles internos: el conteo, el depósito, los pagos y la conciliación.",
      "Organizar el conteo de la ofrenda del domingo.",
    ],
    paraEmpezar:
      "Los controles internos son las reglas sencillas que hacen difícil equivocarse o robar, y fácil ver un error a tiempo. Protegen el dinero de Dios y, sobre todo, protegen a las personas honradas que lo manejan.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Reyes 12:10-11" },
      {
        t: "parrafo",
        texto:
          "En tiempos de Joás, cuando había mucho dinero en el arca, «venía el secretario del rey y el sumo sacerdote, y contaban el dinero que hallaban en el templo de Jehová, y lo guardaban». Lo contaban dos responsables, y el dinero se usaba para la obra.",
      },
      { t: "versiculo", ref: "Deuteronomio 19:15" },
      {
        t: "parrafo",
        texto:
          "La ley pedía más de un testigo: «Sólo por el testimonio de dos o tres testigos se mantendrá la acusación». En el dinero, dos personas también se protegen la una a la otra.",
      },
      { t: "versiculo", ref: "2 Corintios 8:20-21" },
      {
        t: "parrafo",
        texto: "Pablo procuraba «hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
      },
      { t: "subtitulo", texto: "Los controles internos de una iglesia" },
      {
        t: "lista",
        items: [
          "La regla de los dos: al menos dos personas, sin parentesco entre sí, recogen y cuentan la ofrenda, y la llevan juntas al lugar del conteo.",
          "La hoja de conteo: anota el efectivo, los cheques y las ofrendas designadas, y la firman los que contaron.",
          "Las tareas separadas: el que cuenta no es el que registra, ni el que deposita, ni el que firma los cheques.",
          "La custodia: la ofrenda queda en manos de dos hasta el depósito o la caja fuerte, y nunca se lleva a una casa para contarla.",
          "Los pagos: con cheque o transferencia, con su factura o recibo, y dos firmas desde cierta cantidad.",
          "La conciliación: cada mes, una persona que no firma los cheques compara el estado del banco con los registros.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: con controles y sin controles" },
      {
        t: "lista",
        items: [
          "Con controles: los equipos de conteo se rotan. Sin controles: la misma persona cuenta sola desde hace diez años.",
          "Con controles: si hay una diferencia, se ve en la conciliación del mes. Sin controles: se descubre años después.",
          "Con controles: el tesorero honrado nunca queda bajo sospecha. Sin controles: cualquier error se vuelve un chisme.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el conteo del domingo" },
      {
        t: "parrafo",
        texto: "La iglesia recoge la ofrenda en el culto del domingo, y quiere un conteo ordenado.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, al terminar la ofrenda, dos ujieres sin parentesco llevan juntos las bolsas al cuarto de conteo.",
          "Paso 2, dos contadores del equipo de esa semana cuentan el efectivo y los cheques, separando las ofrendas designadas.",
          "Paso 3, llenan la hoja de conteo con los totales, y los dos la firman.",
          "Paso 4, guardan el dinero en una bolsa sellada en la caja fuerte, o lo llevan juntos al depósito nocturno del banco.",
          "Paso 5, el tesorero, que no contó, registra los totales con la copia de la hoja y el comprobante del depósito.",
          "Paso 6, cada mes, otra persona compara los depósitos del banco con las hojas de conteo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si falta dinero o aparece una diferencia, no se acusa a nadie en público: se revisan los registros con dos personas, se habla en privado con los responsables y, si hay un delito, se procede con verdad, como se estudia en Redacción y comunicación (comunicar en una crisis).",
      },
      {
        t: "pasos",
        titulo: "El camino de la ofrenda, del culto al banco",
        pasos: [
          { titulo: "Recoger", texto: "Dos ujieres sin parentesco recogen la ofrenda y la llevan juntos al cuarto de conteo." },
          { titulo: "Contar", texto: "Dos contadores cuentan el efectivo y los cheques, y separan las ofrendas designadas." },
          { titulo: "Firmar", texto: "Llenan la hoja de conteo con los totales, y los dos la firman." },
          { titulo: "Guardar o depositar", texto: "La bolsa sellada va a la caja fuerte o, con los dos, al depósito del banco." },
          { titulo: "Registrar", texto: "El tesorero, que no contó, registra los totales con la hoja y el comprobante del depósito." },
          { titulo: "Conciliar", texto: "Cada mes, alguien que no firma los cheques compara el banco con los registros." },
        ],
      },
    ],
    ideaClave:
      "En el templo de Joás, el secretario del rey y el sumo sacerdote contaban juntos el dinero, la ley pedía dos o tres testigos, y Pablo procuraba hacer las cosas honradamente delante de Dios y de los hombres. Los controles internos son la regla de los dos para recoger y contar, la hoja de conteo firmada, las tareas separadas, la custodia de dos hasta el depósito, los pagos con comprobante y dos firmas, y la conciliación del banco cada mes. No son desconfianza: protegen al que sirve.",
    paraLaVida: {
      texto: "Dos que cuentan se protegen el uno al otro.",
      pregunta: "¿Qué control sencillo falta en el manejo del dinero de tu ministerio?",
    },
  },
  {
    id: "liderazgo-administracion-2-4",
    objetivos: [
      "Explicar, con Marcos 12:41-44 y 2 Corintios 9:7, el valor de cada ofrenda y del dador alegre.",
      "Explicar los recibos de las donaciones que pide el IRS y el uso de las ofrendas designadas.",
      "Preparar el estado anual de donaciones de un hermano.",
    ],
    paraEmpezar:
      "Detrás de cada ofrenda hay una persona que confía en la iglesia. Esa confianza se honra usando cada ofrenda para lo que se dio y dando a cada donante la constancia que necesita, sin juzgar cuánto da cada uno.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 12:41-44" },
      {
        t: "parrafo",
        texto:
          "Jesús miraba cómo el pueblo echaba dinero en el arca, y dijo de la viuda: «esta viuda pobre echó más que todos los que han echado en el arca». Dios no mide la ofrenda por su tamaño.",
      },
      { t: "versiculo", ref: "2 Corintios 9:7" },
      {
        t: "parrafo",
        texto: "«Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre».",
      },
      { t: "versiculo", ref: "1 Corintios 16:2-3" },
      {
        t: "parrafo",
        texto:
          "La ofrenda se apartaba con orden, «Cada primer día de la semana», y la llevaban personas designadas: «a quienes hubiereis designado por carta, a éstos enviaré para que lleven vuestro donativo a Jerusalén».",
      },
      { t: "subtitulo", texto: "Los recibos y las ofrendas designadas" },
      {
        t: "lista",
        items: [
          "Para deducir una sola donación de 250 dólares o más, el donante necesita un reconocimiento escrito de la iglesia (IRS, Publicación 1771).",
          "Ese reconocimiento lleva el nombre de la iglesia, la cantidad y la fecha, y dice si se dio algo a cambio; si solo hubo beneficios religiosos, lo dice así.",
          "No hay un formulario fijo: puede ser una carta o un resumen anual, y muchas iglesias lo envían antes del 31 de enero.",
          "Las ofrendas designadas, como las de las misiones o el edificio, se usan para lo que se dieron.",
          "Lo que se da señalado para una persona en particular no se deduce como donación; la ayuda a los necesitados se da por medio de un fondo con criterios que decide la iglesia.",
          "Lo que cada hermano da es privado: lo saben solo los que llevan los registros.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: honrar la confianza del donante y traicionarla" },
      {
        t: "lista",
        items: [
          "Honrarla: la ofrenda para las misiones llega a las misiones. Traicionarla: se usa para pagar la luz sin avisar.",
          "Honrarla: el estado anual llega a tiempo y sin errores. Traicionarla: nadie responde cuando un hermano lo pide.",
          "Honrarla: lo que da cada uno es privado. Traicionarla: se comenta quién da poco o mucho.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el estado anual de donaciones" },
      {
        t: "parrafo",
        texto:
          "Un hermano dio durante el año sus diezmos y una ofrenda de 500 dólares para el edificio, y en enero pide su constancia para sus impuestos.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, buscar en los registros todas sus ofrendas del año, con sus fechas y cantidades.",
          "Paso 2, separar las ofrendas generales de las designadas, como la del edificio.",
          "Paso 3, preparar la carta con el nombre de la iglesia, el nombre del hermano, cada cantidad y su fecha, y el total.",
          "Paso 4, agregar la frase de que la iglesia no le dio bienes ni servicios a cambio, fuera de los beneficios religiosos.",
          "Paso 5, que la revise otra persona del equipo de finanzas y la firme el tesorero.",
          "Paso 6, enviársela antes del 31 de enero y guardar una copia en el archivo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La iglesia no le pone valor a una donación de bienes, como un carro o un terreno: describe lo que recibió, y el valor lo calcula el donante con su contador. Ante una duda, se consulta a un contador. Es una guía general, no un consejo contable.",
      },
    ],
    ideaClave:
      "Jesús vio que la viuda pobre dio más que todos, Dios ama al dador alegre, y la ofrenda de Corinto se apartaba con orden y la llevaban personas designadas. Para deducir una donación de 250 dólares o más, el donante necesita un reconocimiento escrito de la iglesia con su nombre, la cantidad, la fecha y si se dio algo a cambio. Las ofrendas designadas se usan para lo que se dieron, lo señalado para una persona no se deduce, y lo que da cada hermano es privado.",
    paraLaVida: {
      texto: "Cada ofrenda es confianza que se honra.",
      pregunta: "¿Das con alegría, como propusiste en tu corazón?",
    },
  },
  {
    id: "liderazgo-administracion-2-5",
    objetivos: [
      "Explicar, con Nehemías 13:13 y 2 Corintios 8:21, por qué la iglesia rinde cuentas de su dinero.",
      "Preparar los informes al consejo y a la iglesia, y organizar la revisión anual.",
      "Presentar el informe trimestral de una iglesia.",
    ],
    paraEmpezar:
      "Rendir cuentas no es un trámite: es la manera en que la iglesia ve que su dinero sirve a la obra. Un informe claro responde las preguntas antes de que nazcan las sospechas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Nehemías 13:13" },
      {
        t: "parrafo",
        texto:
          "Nehemías puso mayordomos sobre los almacenes del templo «porque eran tenidos por fieles, y ellos tenían que repartir a sus hermanos». Los elegidos para el dinero eran conocidos por su fidelidad.",
      },
      { t: "versiculo", ref: "Lucas 16:2" },
      {
        t: "parrafo",
        texto: "En la parábola, el señor le pidió al mayordomo: «Da cuenta de tu mayordomía». Todo el que administra da cuentas.",
      },
      { t: "versiculo", ref: "Romanos 13:8" },
      {
        t: "parrafo",
        texto: "«No debáis a nadie nada, sino el amaros unos a otros». Los informes muestran también si la iglesia paga a tiempo lo que debe.",
      },
      { t: "subtitulo", texto: "Los informes y la revisión" },
      {
        t: "lista",
        items: [
          "Cada mes, al consejo: lo que entró, lo que se gastó, el saldo de cada cuenta y la comparación con el presupuesto.",
          "Cada trimestre o cada año, a la iglesia: un resumen claro, con gráficas sencillas y sin datos de lo que da cada uno.",
          "Los fondos designados, aparte: cuánto entró para cada uno y cuánto se usó.",
          "La revisión anual: personas que no manejan el dinero revisan los registros, o un contador independiente hace una revisión o una auditoría.",
          "Los hallazgos: lo que se encuentra se informa al consejo con un plan para corregirlo.",
          "Las iglesias no tienen que presentar al IRS la declaración anual (Formulario 990), y por eso los informes a la iglesia importan todavía más.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un informe que aclara y uno que confunde" },
      {
        t: "lista",
        items: [
          "Aclara: una página con los totales y la comparación con el presupuesto. Confunde: veinte páginas de números sin explicar.",
          "Aclara: explica por qué un gasto subió. Confunde: deja que cada uno adivine.",
          "Aclara: responde las preguntas con calma. Confunde: se molesta cuando alguien pregunta.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el informe trimestral a la iglesia" },
      {
        t: "parrafo",
        texto: "El tesorero prepara el informe del segundo trimestre para presentarlo en la reunión de la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, sacar los totales de entradas y salidas del trimestre, por partida del presupuesto.",
          "Paso 2, compararlos con el presupuesto y marcar las diferencias grandes.",
          "Paso 3, explicar cada diferencia en una frase: por ejemplo, el aire acondicionado se reparó y costó más de lo previsto.",
          "Paso 4, mostrar aparte los fondos designados, como el del edificio y el de las misiones.",
          "Paso 5, revisarlo con el pastor y con otra persona del equipo de finanzas antes de presentarlo.",
          "Paso 6, presentarlo con una página sencilla, responder las preguntas con calma y guardar el informe en el archivo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La revisión anual no es para buscar culpables, sino para mejorar los controles. Si una iglesia crece o maneja mucho dinero, conviene que un contador público independiente revise sus estados financieros.",
      },
      {
        t: "cuadro",
        titulo: "Quién recibe cada informe y qué lleva",
        columnas: ["Informe", "Para quién", "Qué lleva"],
        filas: [
          ["El mensual", "El consejo", "Entradas, gastos, saldos y la comparación con el presupuesto"],
          ["El trimestral o anual", "La iglesia", "Un resumen claro, con gráficas y sin lo que da cada uno"],
          ["El de los fondos designados", "El consejo y la iglesia", "Cuánto entró para cada fondo y cuánto se usó"],
          ["La revisión anual", "El consejo", "Lo que encontraron los revisores y el plan para corregirlo"],
        ],
      },
    ],
    ideaClave:
      "Nehemías eligió mayordomos tenidos por fieles, el señor de la parábola pidió que el mayordomo diera cuenta de su mayordomía, y la Biblia manda no deber nada a nadie. La iglesia informa cada mes al consejo, cada trimestre o cada año a la iglesia, aparte los fondos designados, y cada año personas que no manejan el dinero, o un contador independiente, revisan sus registros. Como las iglesias no presentan el Formulario 990, los informes claros a la congregación importan todavía más.",
    paraLaVida: {
      texto: "Rendir cuentas edifica la confianza.",
      pregunta: "¿Ante quién rindes cuentas de lo que administras?",
    },
  },
  {
    id: "liderazgo-administracion-2-6",
    objetivos: [
      "Explicar, con 1 Timoteo 5:17-18 y Gálatas 6:6, por qué la iglesia sostiene con dignidad a su pastor y a sus obreros.",
      "Reconocer las reglas del IRS para el pastor: la asignación para vivienda, el Seguro Social y los reembolsos de gastos.",
      "Armar el paquete de compensación del pastor.",
    ],
    paraEmpezar:
      "Una iglesia que no cuida a su pastor lo deja con deudas y preocupaciones; una que lo paga sin orden lo expone a problemas con los impuestos. La Biblia pide sostener con dignidad al que trabaja en la Palabra, y la ley pide hacerlo bien.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "1 Timoteo 5:17-18" },
      {
        t: "parrafo",
        texto:
          "Pablo enseñó: «Los ancianos que gobiernan bien, sean tenidos por dignos de doble honor, mayormente los que trabajan en predicar y enseñar», porque «Digno es el obrero de su salario».",
      },
      { t: "versiculo", ref: "Gálatas 6:6" },
      {
        t: "parrafo",
        texto: "«El que es enseñado en la palabra, haga partícipe de toda cosa buena al que lo instruye».",
      },
      { t: "versiculo", ref: "Lucas 10:7" },
      {
        t: "parrafo",
        texto: "Jesús dijo a los que enviaba: «el obrero es digno de su salario».",
      },
      { t: "subtitulo", texto: "Las reglas que hay que conocer" },
      {
        t: "lista",
        items: [
          "La asignación para vivienda (sección 107): la parte del pago del pastor designada para su vivienda no paga impuesto sobre la renta, pero la iglesia debe designarla por escrito antes de pagarla.",
          "El Seguro Social del pastor: por sus servicios de ministro lo paga como trabajador por cuenta propia (SECA), no por la nómina, salvo que haya pedido a tiempo la exención; y la asignación para vivienda sí entra en ese cálculo.",
          "Los reembolsos de gastos: con un plan que pida que el gasto sea del ministerio, que tenga su comprobante y que se devuelva lo que sobre, lo reembolsado no es salario.",
          "Los empleados que no son ministros: la iglesia retiene sus impuestos, presenta sus formularios de la nómina y guarda esos registros al menos 4 años.",
          "Los conflictos de interés: nadie decide su propio salario, ni el de un familiar.",
          "Los detalles cambian con los años: se revisan cada año en la Publicación 517 del IRS o con un contador.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: un sostén ordenado y uno improvisado" },
      {
        t: "lista",
        items: [
          "Ordenado: el consejo aprueba cada año el paquete del pastor por escrito. Improvisado: se le da lo que sobra cada mes.",
          "Ordenado: la asignación para vivienda se designa antes de pagarla. Improvisado: se decide en abril, cuando ya se pagó todo el año.",
          "Ordenado: los gastos del ministerio se reembolsan con comprobantes. Improvisado: se le da una cantidad fija sin cuentas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el paquete del pastor" },
      {
        t: "parrafo",
        texto: "La iglesia va a tener su primer pastor con un salario de tiempo completo, y el consejo prepara su paquete de compensación.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y mirar lo que la iglesia puede dar según su presupuesto, sin olvidar las demás partidas.",
          "Paso 2, definir el salario y, por escrito y antes de pagar, la parte designada como asignación para vivienda.",
          "Paso 3, agregar lo demás: el seguro médico si se puede, el ahorro para el retiro, las vacaciones y los días de descanso.",
          "Paso 4, aprobar un plan de reembolsos para los gastos del ministerio, con comprobantes y devolución de lo que sobre.",
          "Paso 5, recordar al pastor que su Seguro Social lo paga como trabajador por cuenta propia, y sugerirle un contador que conozca las reglas de los ministros.",
          "Paso 6, aprobar todo en el consejo sin que el pastor vote su propio salario, escribirlo en el acta y revisarlo cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo tributario de esta lección es una guía general, no un consejo legal ni contable: las reglas de los ministros son especiales y cambian, y cada iglesia debe consultar a un contador que las conozca.",
      },
    ],
    ideaClave:
      "Los que trabajan en predicar y enseñar son dignos de doble honor, el obrero es digno de su salario, y el que es enseñado comparte lo bueno con el que lo instruye. La iglesia arma por escrito el paquete del pastor: el salario, la asignación para vivienda designada antes de pagarla, que no paga impuesto sobre la renta pero sí entra en el Seguro Social del ministro, que él paga por cuenta propia, y un plan de reembolsos con comprobantes. Nadie decide su propio salario, y todo se revisa cada año con un contador.",
    paraLaVida: {
      texto: "Cuidar al que nos enseña también es obedecer a Dios.",
      pregunta: "¿De qué manera tu iglesia podría cuidar mejor a su pastor y a sus obreros?",
    },
  },
];
