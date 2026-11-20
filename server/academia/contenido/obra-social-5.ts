/**
 * Especialidad Obra social y misericordia · Materia 5 — Voluntariado y alianzas (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas: servir junto a otros, las
 * alianzas con otras iglesias, con escuelas, negocios y organizaciones, y con el gobierno (la regla de nueve agencias
 * federales publicada el 4 de marzo de 2024, 89 FR 15671, vigente desde el 3 de abril de 2024, con las órdenes
 * ejecutivas 13279 y 13559, comprobadas), los voluntarios de la comunidad y cómo cuidar una alianza. No repite Equipos y
 * voluntarios de la especialidad Liderazgo y administración. Con los niños, el reporte del abuso: toda persona de
 * inmediato, y los profesionales a más tardar en 24 horas. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const OBRA_SOCIAL_5: LeccionContenido[] = [
  {
    id: "obra-social-5-1",
    objetivos: [
      "Explicar, con Eclesiastés 4:12 y Juan 17:21, por qué la iglesia sirve junto a otros.",
      "Reconocer los socios posibles de una iglesia y lo que aporta cada uno.",
      "Escoger un socio para un proyecto del barrio.",
    ],
    paraEmpezar:
      "Ninguna iglesia puede atender sola todas las necesidades de su ciudad. Cuando se une a otras iglesias, a escuelas, a negocios, a organizaciones y aun al gobierno, su servicio llega más lejos, se repite menos y da testimonio de unidad. Pero una alianza también se cuida: hay que escoger bien, ponerse de acuerdo y rendir cuentas.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Eclesiastés 4:12" },
      {
        t: "parrafo",
        texto: "«Cordón de tres dobleces no se rompe pronto». Lo que uno solo no puede, varios juntos lo resisten.",
      },
      { t: "versiculo", ref: "Juan 17:21" },
      {
        t: "parrafo",
        texto:
          "Jesús oró por los suyos «para que todos sean uno», y dijo para qué: «para que el mundo crea que tú me enviaste». La unidad de los creyentes es parte del testimonio.",
      },
      { t: "versiculo", ref: "Filipenses 1:5" },
      {
        t: "parrafo",
        texto:
          "Pablo daba gracias por los filipenses, «por vuestra comunión en el evangelio, desde el primer día hasta ahora». Eran sus socios en la misión.",
      },
      { t: "subtitulo", texto: "Por qué servir con otros" },
      {
        t: "lista",
        items: [
          "Se llega más lejos: cada socio aporta lo que tiene, y juntos atienden lo que nadie podría solo.",
          "Se repite menos: en vez de que tres iglesias den despensa el mismo sábado, cada una cubre lo que falta.",
          "Se aprende: los socios con experiencia enseñan a los que empiezan.",
          "Se da testimonio: la unidad de los creyentes ayuda a que el mundo crea (Juan 17:21).",
          "Se cuida la identidad: la iglesia se une para servir sin dejar de ser iglesia ni callar el evangelio.",
          "Se escoge con cuidado: un socio que no comparte los valores del proyecto puede dañarlo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia aislada y la iglesia aliada" },
      {
        t: "lista",
        items: [
          "Aislada: abre su despensa sin saber que hay otra a dos calles. Aliada: se pone de acuerdo con la otra y cubren días distintos.",
          "Aislada: busca sola todo el dinero. Aliada: el banco de alimentos, un negocio y otra iglesia aportan.",
          "Aislada: se agota pronto. Aliada: reparte la carga y dura más.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la tutoría con socios" },
      {
        t: "parrafo",
        texto: "Tu iglesia quiere ayudar a los estudiantes del barrio que van mal en la escuela, pero tiene pocos maestros.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y preguntar quién más trabaja con estudiantes en el barrio.",
          "Paso 2, visitar la escuela, la biblioteca y otras iglesias para conocer lo que ya hacen.",
          "Paso 3, ver qué aporta cada uno: la escuela conoce a los alumnos, la biblioteca tiene libros y un salón, y otra iglesia tiene maestros.",
          "Paso 4, acordar juntos un solo proyecto de tutoría, con una tarea clara para cada socio.",
          "Paso 5, escribir el acuerdo y nombrar a una persona de contacto de cada socio.",
          "Paso 6, empezar en pequeño y reunirse cada mes para ver cómo va.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de empezar algo nuevo, pregunta quién ya lo está haciendo. Muchas veces la mejor manera de servir es sumarse a lo que otros ya hacen bien, aportando lo que a ellos les falta.",
      },
      {
        t: "cuadro",
        titulo: "Los socios de una iglesia y lo que aporta cada uno",
        columnas: ["Socio", "Qué puede aportar", "Qué cuidar"],
        filas: [
          ["Otras iglesias", "Voluntarios, salones y oración", "Acordar el propósito y respetar las diferencias"],
          ["Escuelas", "El conocimiento de los alumnos y de sus familias", "Seguir las reglas de la escuela"],
          ["Negocios", "Donaciones, empleos y voluntarios", "Que la alianza no sea solo propaganda"],
          ["Organizaciones sin fines de lucro", "Experiencia, recursos y capacitación", "Que compartan los valores del proyecto"],
          ["Gobierno", "Programas, fondos y coordinación", "Las reglas para las organizaciones de fe"],
        ],
      },
    ],
    ideaClave:
      "Cordón de tres dobleces no se rompe pronto (Eclesiastés 4:12), y la unidad de los creyentes ayuda a que el mundo crea (Juan 17:21). Servir con otros permite llegar más lejos, repetir menos, aprender y dar testimonio, como los filipenses, socios de Pablo en el evangelio (Filipenses 1:5). La iglesia puede aliarse con otras iglesias, escuelas, negocios, organizaciones y el gobierno, escogiendo bien y sin dejar de ser iglesia.",
    paraLaVida: {
      texto: "Sirvo junto a otros y sumo lo que tengo a lo que ellos hacen.",
      pregunta: "¿Quién en tu barrio ya está haciendo algo bueno a lo que tu iglesia podría sumarse?",
    },
  },
  {
    id: "obra-social-5-2",
    objetivos: [
      "Explicar, con Marcos 9:39-40, por qué Jesús no prohibió a uno que servía en su nombre.",
      "Acordar con otras iglesias un proyecto común, respetando sus diferencias.",
      "Resolver un desacuerdo entre iglesias aliadas sin romper la unidad.",
    ],
    paraEmpezar:
      "Los discípulos quisieron prohibir a uno que echaba fuera demonios en el nombre de Jesús porque no andaba con ellos, y Jesús les dijo que no se lo prohibieran. Las iglesias de una ciudad no piensan igual en todo, pero pueden servir juntas en lo que las une: amar al prójimo y anunciar a Cristo.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 9:39-40" },
      {
        t: "parrafo",
        texto:
          "Jesús dijo: «No se lo prohibáis», porque «el que no es contra nosotros, por nosotros es». No hace falta ser del mismo grupo para servir a Cristo.",
      },
      { t: "versiculo", ref: "Gálatas 2:9" },
      {
        t: "parrafo",
        texto:
          "Los apóstoles de Jerusalén dieron a Pablo y a Bernabé «la diestra en señal de compañerismo». Cada uno tenía su campo, pero se reconocían como compañeros.",
      },
      { t: "versiculo", ref: "1 Corintios 3:9" },
      {
        t: "parrafo",
        texto: "Pablo escribe: «nosotros somos colaboradores de Dios». Las iglesias no compiten: colaboran en la misma obra.",
      },
      { t: "subtitulo", texto: "Cómo se forma una alianza entre iglesias" },
      {
        t: "lista",
        items: [
          "Empezar por lo que nos une: la necesidad del barrio y el amor de Cristo.",
          "Acordar el propósito del proyecto y lo que cada iglesia aporta.",
          "Respetar las diferencias de doctrina y de estilo, sin discutirlas en el proyecto.",
          "Dejar claro que cada iglesia sigue con su propia enseñanza y su propio gobierno.",
          "Compartir el mérito: el proyecto no lleva el nombre de una sola iglesia.",
          "Resolver los desacuerdos hablando directamente y con amor, buscando la paz.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la competencia y la colaboración" },
      {
        t: "lista",
        items: [
          "Competencia: cada iglesia cuida a sus miembros como si fueran clientes. Colaboración: todas sirven al mismo Señor y al mismo barrio.",
          "Competencia: se critica a la otra iglesia en público. Colaboración: se ora por ella y se le da la mano.",
          "Competencia: el proyecto lleva el nombre de una iglesia. Colaboración: lleva el nombre del barrio, y la gloria es de Dios.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: tres iglesias y una despensa" },
      {
        t: "parrafo",
        texto:
          "Tres iglesias del barrio quieren organizar juntas una despensa para las fiestas, pero no se ponen de acuerdo en si se predica durante el reparto.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reunir a los pastores para orar juntos y recordar el propósito: dar de comer a las familias del barrio.",
          "Paso 2, escuchar a cada iglesia y entender sus razones.",
          "Paso 3, acordar una solución que respete a todos: un reparto sin condiciones y un momento aparte, voluntario, de oración y testimonio.",
          "Paso 4, repartir las tareas: una iglesia el lugar, otra los voluntarios y otra los alimentos con el banco de alimentos.",
          "Paso 5, escribir el acuerdo y nombrar a un coordinador de cada iglesia.",
          "Paso 6, evaluar juntos al terminar y dar gracias a Dios por la unidad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Servir con otras iglesias no es negociar la doctrina: es amar juntos al prójimo. Lo que cada iglesia cree y enseña sigue siendo suyo; en el proyecto se sirve en lo que une.",
      },
    ],
    ideaClave:
      "Jesús dijo que no se prohibiera al que servía en su nombre, porque el que no es contra nosotros, por nosotros es (Marcos 9:39-40). Los apóstoles se dieron la diestra en señal de compañerismo (Gálatas 2:9), y las iglesias son colaboradoras de Dios (1 Corintios 3:9). Una alianza entre iglesias empieza por lo que las une, acuerda el propósito y las tareas, respeta las diferencias, comparte el mérito y resuelve los desacuerdos con amor.",
    paraLaVida: {
      texto: "Colaboro con otras iglesias en lo que nos une.",
      pregunta: "¿Con qué iglesia de tu barrio podría servir la tuya este año?",
    },
  },
  {
    id: "obra-social-5-3",
    objetivos: [
      "Explicar, con Amós 3:3, por qué una alianza necesita estar de acuerdo.",
      "Reconocer lo que aportan las escuelas, los negocios y las organizaciones, y lo que se cuida con cada uno.",
      "Escribir los puntos de un acuerdo de colaboración.",
    ],
    paraEmpezar:
      "Nehemías pidió al rey cartas y madera para reconstruir, y el decreto de Ciro mandó que los vecinos ayudaran con plata, oro y bienes. Dios usó recursos de afuera del pueblo para su obra. Hoy una iglesia puede aliarse con escuelas, negocios y organizaciones para el bien del barrio, siempre que estén de acuerdo en lo que van a hacer.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", titulo: "Resumen de los libros de Esdras y Nehemías: un líder que ora y trabaja", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Amós 3:3" },
      {
        t: "parrafo",
        texto:
          "«¿Andarán dos juntos, si no estuvieren de acuerdo?». Una alianza empieza por ponerse de acuerdo en el propósito y en la manera de trabajar.",
      },
      { t: "versiculo", ref: "Nehemías 2:8" },
      {
        t: "parrafo",
        texto:
          "Nehemías pidió una carta para el guarda del bosque del rey, «para que me dé madera», y cuenta: «me lo concedió el rey, según la benéfica mano de mi Dios sobre mí». Dios abrió puertas fuera del pueblo.",
      },
      { t: "versiculo", ref: "Esdras 1:4" },
      {
        t: "parrafo",
        texto:
          "El decreto de Ciro decía: «ayúdenle los hombres de su lugar con plata, oro, bienes y ganados». Los vecinos colaboraron con la obra de Dios.",
      },
      { t: "subtitulo", texto: "Cada socio y su cuidado" },
      {
        t: "lista",
        items: [
          "Las escuelas: conocen a los alumnos y a sus familias; los voluntarios siguen las reglas de la escuela, pasan sus revisiones y no usan sus programas para evangelizar a los alumnos.",
          "Los negocios: pueden donar, ofrecer empleos o mandar voluntarios; se cuida que la alianza no sea solo propaganda y que la iglesia no anuncie sus productos.",
          "Las organizaciones sin fines de lucro: traen experiencia y recursos, como el banco de alimentos o una clínica; se cuida que compartan los valores del proyecto.",
          "Los datos de las personas servidas no se comparten con ningún socio sin su permiso.",
          "Todo acuerdo importante se escribe: quién hace qué, quién paga qué, cómo se usan los nombres y cómo se termina.",
          "La iglesia no esconde su fe, pero en cada alianza respeta las reglas del socio.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el acuerdo de palabra y el acuerdo por escrito" },
      {
        t: "lista",
        items: [
          "De palabra: cada uno recuerda algo distinto. Por escrito: todos saben lo que prometieron.",
          "De palabra: nadie sabe quién paga lo que falta. Por escrito: queda claro quién aporta qué.",
          "De palabra: cuando cambia el encargado, se pierde el acuerdo. Por escrito: la alianza sigue.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el supermercado y la despensa" },
      {
        t: "parrafo",
        texto:
          "Un supermercado del barrio ofrece donar alimentos cada semana a la despensa de la iglesia y quiere poner su nombre en los volantes.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecer la oferta y conversar con el gerente sobre lo que quiere y lo que puede dar.",
          "Paso 2, acordar qué alimentos, cada cuánto y cómo se recogen.",
          "Paso 3, acordar cómo se menciona su nombre: con un agradecimiento sencillo y sin anunciar sus productos.",
          "Paso 4, explicar que la despensa es gratis para todos y que los datos de las familias no se comparten.",
          "Paso 5, escribir el acuerdo en una página y firmarlo los dos.",
          "Paso 6, revisarlo cada seis meses y dar las gracias en público.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una alianza sana se escribe. Un acuerdo de una página, con lo que cada uno hace, lo que se cuida y cómo se termina, evita la mayoría de los malentendidos.",
      },
    ],
    ideaClave:
      "Dos no andan juntos si no están de acuerdo (Amós 3:3), y Dios usó las cartas del rey y la ayuda de los vecinos para reconstruir (Nehemías 2:8; Esdras 1:4). Las escuelas, los negocios y las organizaciones pueden aportar mucho al barrio; con cada uno se cuidan sus reglas, los valores del proyecto, los datos de las personas y el uso de los nombres. Todo acuerdo importante se escribe: quién hace qué, quién paga qué y cómo se termina.",
    paraLaVida: {
      texto: "Me pongo de acuerdo antes de caminar con otros.",
      pregunta: "¿Qué escuela, negocio u organización de tu barrio podría ser socia de tu iglesia?",
    },
  },
  {
    id: "obra-social-5-4",
    objetivos: [
      "Explicar, con Romanos 13:4 y Tito 3:1, la actitud de la iglesia ante las autoridades.",
      "Reconocer lo que permite y lo que no la regla federal de 2024 para las organizaciones de fe.",
      "Decidir, como Daniel, cómo colaborar sin perder las propias convicciones.",
    ],
    paraEmpezar:
      "El gobierno también busca el bien de la ciudad, y a veces invita a las iglesias a colaborar con programas o con fondos. La Biblia llama a la autoridad servidora de Dios para nuestro bien, y Daniel sirvió en el reino de Babilonia sin contaminarse. Hay reglas claras para que una iglesia colabore sin perder su identidad.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 13:4" },
      {
        t: "parrafo",
        texto:
          "Pablo dice que la autoridad «es servidor de Dios para tu bien». La iglesia respeta a las autoridades y puede colaborar con ellas en lo bueno.",
      },
      { t: "versiculo", ref: "Daniel 1:8" },
      {
        t: "parrafo",
        texto:
          "«Daniel propuso en su corazón no contaminarse». Sirvió al rey con excelencia, pero cuidó sus convicciones, y lo pidió con respeto.",
      },
      { t: "versiculo", ref: "Tito 3:1" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que los creyentes se sujeten a las autoridades y que estén «dispuestos a toda buena obra». Colaborar en el bien de la ciudad es parte de esa buena obra.",
      },
      { t: "subtitulo", texto: "Lo que dice la regla federal de 2024" },
      {
        t: "lista",
        items: [
          "Nueve agencias federales publicaron en el Registro Federal, el 4 de marzo de 2024, la regla sobre las alianzas con las organizaciones de fe y de los barrios (89 FR 15671), vigente desde el 3 de abril de 2024.",
          "Las organizaciones de fe compiten en igualdad por los fondos federales y conservan su carácter religioso.",
          "No pueden usar la ayuda federal directa para actividades explícitamente religiosas.",
          "Según la orden ejecutiva 13279, esas actividades se ofrecen por separado, en tiempo o en lugar, del programa que recibe la ayuda federal directa.",
          "Según la orden ejecutiva 13559, la participación de las personas en esas actividades es voluntaria, y la regla trae protecciones para ellas y un aviso por escrito.",
          "Lo legal es una guía general, no un consejo legal: antes de recibir fondos del gobierno, la iglesia lee las reglas del programa y consulta a un abogado o a un contador.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: colaborar perdiendo la identidad y colaborar como Daniel" },
      {
        t: "lista",
        items: [
          "Perdiendo la identidad: esconder la fe para recibir fondos. Como Daniel: ser claros en lo que creemos y cumplir las reglas del programa.",
          "Perdiendo la identidad: usar los fondos del gobierno para el culto. Como Daniel: separar en tiempo o en lugar las actividades religiosas, que son voluntarias.",
          "Perdiendo la identidad: aceptar cualquier condición. Como Daniel: pedir con respeto lo que la conciencia necesita, o no aceptar el fondo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: las comidas para los ancianos" },
      {
        t: "parrafo",
        texto:
          "La ciudad ofrece a tu iglesia un fondo federal para dar comidas a los ancianos en su salón, y algunos hermanos quieren orar y predicar durante la comida.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, leer con calma las reglas del programa y la regla federal de 2024, y consultar a un abogado si hay dudas.",
          "Paso 2, separar el programa de las actividades religiosas: la comida es para todos, sin condiciones.",
          "Paso 3, ofrecer un momento de oración o un estudio en otro horario o en otro salón, para quien quiera.",
          "Paso 4, dar a los participantes el aviso por escrito de sus protecciones, como pide la regla.",
          "Paso 5, llevar cuentas claras del fondo, separadas de las ofrendas de la iglesia.",
          "Paso 6, evaluar si la alianza deja servir con libertad y con fidelidad; si no, la iglesia puede no aceptar el fondo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Colaborar con el gobierno puede abrir puertas para servir, pero pide orden: cuentas separadas, reglas leídas y la fe ofrecida en libertad. Lo legal es una guía general, no un consejo legal.",
      },
      {
        t: "cuadro",
        titulo: "La ayuda federal directa: lo que se puede y lo que no",
        columnas: ["Se puede", "No se puede"],
        filas: [
          ["Competir por los fondos en igualdad con las demás organizaciones", "Usar la ayuda directa para actividades explícitamente religiosas"],
          ["Conservar el carácter religioso de la iglesia", "Mezclar el culto con el programa que recibe la ayuda"],
          ["Ofrecer actividades religiosas por separado, en tiempo o en lugar", "Obligar a los participantes a asistir a ellas"],
          ["Servir a todos y dar el aviso por escrito de sus protecciones", "Condicionar la ayuda a la fe de las personas"],
        ],
      },
    ],
    ideaClave:
      "La autoridad es servidora de Dios para nuestro bien (Romanos 13:4), y la iglesia está dispuesta a toda buena obra (Tito 3:1), sin contaminarse, como Daniel (Daniel 1:8). Según la regla federal de 2024, las organizaciones de fe compiten en igualdad por los fondos y conservan su carácter religioso, pero no usan la ayuda federal directa para actividades explícitamente religiosas, que se ofrecen por separado, en tiempo o en lugar, y con participación voluntaria.",
    paraLaVida: {
      texto: "Colaboro con las autoridades en lo bueno sin perder mis convicciones.",
      pregunta: "¿Qué harías si un programa del gobierno te pidiera esconder tu fe para servir?",
    },
  },
  {
    id: "obra-social-5-5",
    objetivos: [
      "Explicar, con Éxodo 36:5 y Hechos 28:2, que Dios mueve a muchos a ayudar, también fuera de la iglesia.",
      "Recibir y orientar a voluntarios que no son de la iglesia, con los cuidados debidos.",
      "Reconocer y agradecer a los voluntarios de la comunidad.",
    ],
    paraEmpezar:
      "Cuando se construyó el tabernáculo, el pueblo trajo tanto que hubo que pedirle que no trajera más. Y en Malta, los habitantes de la isla, que no conocían a Cristo, recibieron a Pablo con gran humanidad. Muchas personas del barrio quieren ayudar: estudiantes, empleados de empresas y vecinos. La iglesia puede abrirles la puerta para servir juntos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 36:5" },
      {
        t: "parrafo",
        texto:
          "Los artesanos le dijeron a Moisés: «El pueblo trae mucho más de lo que se necesita para la obra». Cuando la gente ve una causa buena, da con generosidad.",
      },
      { t: "versiculo", ref: "Hechos 28:2" },
      {
        t: "parrafo",
        texto:
          "Lucas cuenta que «los naturales nos trataron con no poca humanidad». Dios pone bondad aun en personas que no lo conocen, y la iglesia puede servir junto a ellas.",
      },
      { t: "versiculo", ref: "Romanos 16:3" },
      {
        t: "parrafo",
        texto:
          "Pablo saluda a Priscila y a Aquila, «mis colaboradores en Cristo Jesús». Los que sirven a nuestro lado merecen nuestra gratitud.",
      },
      { t: "subtitulo", texto: "Cómo recibir a los voluntarios de la comunidad" },
      {
        t: "lista",
        items: [
          "Invitar con claridad: qué se necesita, cuándo y por cuánto tiempo, en un anuncio sencillo.",
          "Dar una orientación corta: el propósito del proyecto, las reglas, la seguridad y a quién preguntar.",
          "Poner a cada uno en una tarea clara, junto a un voluntario de la iglesia.",
          "Cuidar a los niños: los que sirven con menores pasan la revisión de antecedentes y la capacitación, y conocen el deber de reportar.",
          "Respetar su fe o su falta de fe: se les invita a servir, no se les presiona para que crean.",
          "Agradecer y reconocer su servicio, y dar una constancia de horas a los estudiantes que la necesitan.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el voluntario que se pierde y el voluntario que vuelve" },
      {
        t: "lista",
        items: [
          "Se pierde: llega y nadie lo saluda ni le dice qué hacer. Vuelve: lo recibe alguien, le explica y lo acompaña.",
          "Se pierde: siente que lo usan para la foto. Vuelve: ve que su trabajo cambia algo.",
          "Se pierde: nadie le da las gracias. Vuelve: lo reconocen y lo invitan otra vez.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la empresa que quiere ayudar" },
      {
        t: "parrafo",
        texto:
          "Una empresa del barrio quiere mandar a veinte empleados un sábado para ayudar en la despensa y pintar el salón de la tutoría.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecer y acordar con la empresa la fecha, las tareas y el número de personas.",
          "Paso 2, preparar las tareas y los materiales, con un voluntario de la iglesia a cargo de cada grupo.",
          "Paso 3, dar una orientación de quince minutos sobre el proyecto, la seguridad y el trato a las familias.",
          "Paso 4, cuidar que nadie que no esté revisado y capacitado quede a cargo de los niños.",
          "Paso 5, terminar con un tiempo de agradecimiento, contar lo que se logró y orar por quien lo quiera.",
          "Paso 6, enviar después una carta de gracias a la empresa con lo que se hizo, sin datos de las familias.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Los voluntarios de la comunidad son una bendición y una puerta para el evangelio. Recíbelos bien, cuídalos y cuida a los demás: en Texas, toda persona reporta de inmediato la sospecha de abuso de un menor, y los profesionales a más tardar en 24 horas.",
      },
    ],
    ideaClave:
      "Dios mueve a muchos a dar y a servir, como al pueblo que trajo más de lo necesario para la obra (Éxodo 36:5), y pone bondad aun en los que no lo conocen, como en los habitantes de Malta (Hechos 28:2). La iglesia recibe a los voluntarios de la comunidad con una invitación clara, una orientación, una tarea junto a alguien de la iglesia y los cuidados con los niños, respeta su fe y les agradece como Pablo a sus colaboradores (Romanos 16:3).",
    paraLaVida: {
      texto: "Abro la puerta a los que quieren ayudar y les agradezco su servicio.",
      pregunta: "¿Quién de tu barrio que no va a la iglesia podría servir contigo en un proyecto?",
    },
  },
  {
    id: "obra-social-5-6",
    objetivos: [
      "Explicar, con Hechos 15:39-40 y 2 Timoteo 4:11, que aun los buenos socios tienen desacuerdos y pueden reconciliarse.",
      "Evaluar una alianza y decidir si se renueva, se cambia o se termina.",
      "Terminar una alianza en paz cuando hace falta.",
    ],
    paraEmpezar:
      "Pablo y Bernabé fueron grandes compañeros, pero un día tuvieron un desacuerdo tan fuerte que se separaron. Años después, Pablo pidió que le llevaran a Marcos, el joven por el que habían discutido, porque le era útil. Las alianzas se cuidan, se evalúan y, si hace falta, se terminan en paz.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Romanos 12:18" },
      {
        t: "parrafo",
        texto:
          "«Si es posible, en cuanto dependa de vosotros, estad en paz con todos los hombres». En cada alianza, la iglesia hace su parte para que haya paz.",
      },
      { t: "versiculo", ref: "Hechos 15:39-40" },
      {
        t: "parrafo",
        texto:
          "«Hubo tal desacuerdo entre ellos, que se separaron el uno del otro». Bernabé siguió con Marcos y Pablo con Silas, y la obra siguió por dos caminos.",
      },
      { t: "versiculo", ref: "2 Timoteo 4:11" },
      {
        t: "parrafo",
        texto:
          "Años después, Pablo escribió: «Toma a Marcos y tráele contigo, porque me es útil para el ministerio». La relación se había restaurado.",
      },
      { t: "subtitulo", texto: "Cómo se cuida una alianza" },
      {
        t: "lista",
        items: [
          "Una persona de contacto de cada socio y reuniones regulares para ver cómo va.",
          "Comunicar pronto los problemas, sin dejar que crezcan.",
          "Resolver los conflictos hablando directamente y en privado primero, como enseña Mateo 18:15.",
          "Evaluar juntos cada cierto tiempo: si se cumple el propósito, si cada uno hace su parte y si se cuidan los valores.",
          "Rendir cuentas del dinero y de los resultados a cada socio y a la iglesia.",
          "Si hace falta, terminar en paz, cumpliendo lo prometido y agradeciendo lo vivido.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la alianza descuidada y la alianza cuidada" },
      {
        t: "lista",
        items: [
          "Descuidada: nadie revisa nada hasta que estalla un problema. Cuidada: se evalúa cada seis meses.",
          "Descuidada: se habla mal del socio a sus espaldas. Cuidada: se le habla primero a él, con respeto.",
          "Descuidada: se rompe con enojo y sin aviso. Cuidada: se termina en paz y por escrito, si hace falta.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el socio que cambió las reglas" },
      {
        t: "parrafo",
        texto:
          "Tu iglesia se alió con una organización para dar clases de inglés, pero la organización empezó a pedirles a los alumnos que firmen para un partido político.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, hablar en privado con el encargado de la organización y explicarle la preocupación.",
          "Paso 2, recordar el acuerdo escrito: las clases son para todos y sin fines políticos.",
          "Paso 3, buscar una solución: que la organización deje de pedir firmas en las clases.",
          "Paso 4, si no hay cambio, informar al pastor y al consejo, y decidir juntos.",
          "Paso 5, si hace falta, terminar la alianza en paz y por escrito, cumpliendo lo que se prometió a los alumnos.",
          "Paso 6, seguir con las clases con otro socio o por cuenta de la iglesia, para no dejar a los alumnos sin servicio.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Las alianzas se parecen a las amistades: necesitan tiempo, verdad y perdón. A veces se cambian o se terminan, pero siempre se puede actuar en paz, y Dios puede restaurar las relaciones con el tiempo.",
      },
      {
        t: "pasos",
        titulo: "Cómo se forma y se cuida una alianza",
        pasos: [
          { titulo: "Conocerse", texto: "Visitarse, orar juntos y conocer lo que cada uno hace y cree." },
          { titulo: "Acordar el propósito", texto: "Decidir juntos qué necesidad atenderán y qué aporta cada uno." },
          { titulo: "Escribir el acuerdo", texto: "Una página con las tareas, el dinero, los nombres, los datos y cómo se termina." },
          { titulo: "Empezar en pequeño", texto: "Probar con un proyecto corto antes de comprometerse a más." },
          { titulo: "Evaluar juntos", texto: "Reunirse cada cierto tiempo para ver si se cumple el propósito." },
          { titulo: "Renovar o terminar en paz", texto: "Seguir, cambiar o cerrar la alianza con respeto y por escrito." },
        ],
      },
    ],
    ideaClave:
      "En cuanto dependa de nosotros, estamos en paz con todos (Romanos 12:18). Pablo y Bernabé se separaron por un desacuerdo (Hechos 15:39-40), y años después Pablo pidió a Marcos porque le era útil (2 Timoteo 4:11). Una alianza se cuida con un contacto de cada socio, la comunicación a tiempo, los conflictos hablados primero en privado, las evaluaciones y las cuentas claras, y si hace falta se termina en paz y por escrito, sin dejar sin servicio a las personas.",
    paraLaVida: {
      texto: "Cuido mis alianzas con verdad, con paz y con perdón.",
      pregunta: "¿Hay una relación de servicio que necesites hablar, sanar o terminar en paz?",
    },
  },
];
