/**
 * Especialidad Obra social y misericordia · Materia 4 — Ayuda humanitaria y desastres (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección y tres esquemas, con los datos comprobados:
 * los principios humanitarios de la ONU (resoluciones 46/182 de 1991 y 58/114 de 2004, según la OCHA), el Manual Esfera
 * 2018 (con el mínimo de 15 litros de agua por persona y día), las donaciones que ayudan (FEMA: el dinero a organizaciones
 * reconocidas es lo mejor y solo se donan los artículos que piden las organizaciones; IRS, Publicación 3833), la
 * coordinación (las cuatro C de National VOAD y los grupos de recuperación a largo plazo) y la preparación de la iglesia.
 * No repite Emergencias y desastres de la especialidad Capellanía (la primera ayuda psicológica, el aviso de una muerte y
 * la guía Listo). Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const OBRA_SOCIAL_4: LeccionContenido[] = [
  {
    id: "obra-social-4-1",
    objetivos: [
      "Explicar, con Lamentaciones 3:22-23 e Isaías 43:2, cómo acompaña Dios a su pueblo en el desastre.",
      "Reconocer las etapas de un desastre y lo que hace la iglesia en cada una.",
      "Responder a un desastre como la iglesia de Antioquía, cada uno según lo que tiene.",
    ],
    paraEmpezar:
      "Huracanes, inundaciones, incendios, sequías y hambres: los desastres golpean a ricos y a pobres, pero los más pobres son los que más tardan en levantarse. La Biblia no promete que no vendrán, pero sí que Dios estará con su pueblo en medio de ellos, y muestra a una iglesia que se organizó para ayudar en tiempo de hambre.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=_AIvRQj8kHs", titulo: "Resumen de la historia de Job: ¿por qué la vida de Job se volvió tan difícil?", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Lamentaciones 3:22-23" },
      {
        t: "parrafo",
        texto:
          "En medio de la ruina de Jerusalén, el profeta escribió: «Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias». Aun en el desastre, la fidelidad de Dios sigue en pie.",
      },
      { t: "versiculo", ref: "Isaías 43:2" },
      {
        t: "parrafo",
        texto:
          "Dios promete: «Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te anegarán». No promete que no habrá aguas, sino que no estaremos solos en ellas.",
      },
      { t: "versiculo", ref: "Hechos 11:28-29" },
      {
        t: "parrafo",
        texto:
          "Cuando Agabo anunció una gran hambre, los discípulos de Antioquía, «cada uno conforme a lo que tenía, determinaron enviar socorro a los hermanos que habitaban en Judea». La iglesia se preparó y ayudó.",
      },
      { t: "subtitulo", texto: "Las etapas de un desastre" },
      {
        t: "lista",
        items: [
          "Antes: la preparación, con un plan, una lista de las personas más vulnerables y lo necesario guardado.",
          "Las primeras horas: el rescate lo hacen los bomberos, la policía y los equipos de emergencia; la iglesia ora y se pone a disposición.",
          "Los primeros días: el alivio, con refugio, agua, comida, ropa y compañía.",
          "Las semanas siguientes: limpiar las casas, reponer lo básico y acompañar a las familias.",
          "Los meses y los años siguientes: la recuperación, reconstruir y prepararse mejor, con otras organizaciones.",
          "En todas: no culpar a las víctimas, llorar con los que lloran (Romanos 12:15) y servir con orden.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: responder por impulso y responder con orden" },
      {
        t: "lista",
        items: [
          "Por impulso: todos corren al lugar el primer día y estorban el rescate. Con orden: la iglesia se pone a disposición de las organizaciones que coordinan.",
          "Por impulso: se ayuda mucho la primera semana y luego nadie vuelve. Con orden: se acompaña también en los meses de la recuperación.",
          "Por impulso: se manda lo que sobra en las casas. Con orden: se da lo que de verdad se necesita, sobre todo dinero a organizaciones reconocidas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la inundación en otra ciudad" },
      {
        t: "parrafo",
        texto:
          "Una inundación destruye cientos de casas en una ciudad a tres horas de distancia, donde hay una iglesia hermana. Los hermanos quieren ayudar enseguida.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar por la ciudad y llamar al pastor de la iglesia hermana para saber cómo están y qué necesitan.",
          "Paso 2, no viajar al lugar por cuenta propia mientras dura el rescate.",
          "Paso 3, recoger una ofrenda especial, cada uno según lo que tiene, como la iglesia de Antioquía.",
          "Paso 4, enviar el dinero a la iglesia hermana o a una organización reconocida que trabaja en el lugar, con cuentas claras.",
          "Paso 5, inscribir a los voluntarios con una organización que coordina, para ir cuando ella los llame.",
          "Paso 6, seguir en contacto en los meses siguientes, cuando empiece la reconstrucción.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En un desastre, el amor necesita orden. Antes de mover a la iglesia, pregunta qué se necesita y quién coordina; y recuerda que la recuperación dura meses, cuando ya nadie habla del desastre.",
      },
      {
        t: "linea",
        titulo: "Las etapas de un desastre y lo que hace la iglesia",
        eventos: [
          { fecha: "Antes", texto: "Preparar el plan de la iglesia, la lista de los más vulnerables y lo necesario guardado.", ref: "Génesis 41:35-36" },
          { fecha: "Las primeras horas", texto: "El rescate es de los profesionales: la iglesia ora, avisa a los suyos y se pone a disposición." },
          { fecha: "Los primeros días", texto: "El alivio: refugio, agua, comida, ropa y compañía, por medio de las organizaciones que coordinan.", ref: "Isaías 58:7" },
          { fecha: "Las semanas después", texto: "Limpiar las casas con seguridad, reponer lo básico y acompañar a las familias." },
          { fecha: "Los meses siguientes", texto: "La recuperación junto al grupo de recuperación a largo plazo de la comunidad.", ref: "Nehemías 2:17-18" },
          { fecha: "Después", texto: "Evaluar, dar gracias y prepararse mejor para el próximo desastre." },
        ],
      },
    ],
    ideaClave:
      "Las misericordias de Dios nunca decaen, aun en el desastre (Lamentaciones 3:22-23), y él promete estar con nosotros en las aguas (Isaías 43:2). La iglesia de Antioquía ayudó en el hambre, cada uno según lo que tenía (Hechos 11:29). Un desastre tiene etapas, la preparación, el rescate, el alivio y la recuperación, y la iglesia sirve en cada una con orden, sin estorbar el rescate y sin abandonar a las familias cuando pasa la noticia.",
    paraLaVida: {
      texto: "Confío en las misericordias de Dios y estoy listo para servir con orden.",
      pregunta: "¿Sabría tu iglesia qué hacer en las primeras horas y en los primeros meses de un desastre?",
    },
  },
  {
    id: "obra-social-4-2",
    objetivos: [
      "Nombrar los cuatro principios humanitarios: humanidad, neutralidad, imparcialidad e independencia.",
      "Relacionar la imparcialidad con la Biblia, que enseña que Dios no hace acepción de personas.",
      "Aplicar los principios cuando la iglesia reparte ayuda después de un desastre.",
    ],
    paraEmpezar:
      "Las organizaciones que ayudan en los desastres siguen cuatro principios que la Asamblea General de la ONU reconoció: la humanidad, la neutralidad y la imparcialidad, en 1991, y la independencia, agregada en 2004. Mucho antes, la Biblia ya enseñaba a ayudar sin acepción de personas, como Dios, que hace llover sobre justos e injustos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 10:34" },
      {
        t: "parrafo",
        texto:
          "En la casa de Cornelio, Pedro dijo: «En verdad comprendo que Dios no hace acepción de personas». Dios no mira la raza ni la nación para amar.",
      },
      { t: "versiculo", ref: "Santiago 2:1" },
      {
        t: "parrafo",
        texto:
          "Santiago pide: «que vuestra fe en nuestro glorioso Señor Jesucristo sea sin acepción de personas». La iglesia no trata mejor al rico ni al conocido.",
      },
      { t: "versiculo", ref: "Mateo 5:45" },
      {
        t: "parrafo",
        texto:
          "El Padre «hace salir su sol sobre malos y buenos, y que hace llover sobre justos e injustos». Su bondad llega a todos, y así debe llegar la ayuda de sus hijos.",
      },
      { t: "subtitulo", texto: "Los cuatro principios humanitarios" },
      {
        t: "lista",
        items: [
          "Humanidad: el sufrimiento humano debe atenderse dondequiera que esté, protegiendo la vida y la dignidad.",
          "Neutralidad: los que ayudan no toman partido en los conflictos ni en las peleas políticas.",
          "Imparcialidad: la ayuda se da según la necesidad, primero a los más urgentes, sin distinguir raza, religión, nacionalidad ni opinión.",
          "Independencia: la ayuda no se pone al servicio de fines políticos, económicos o militares.",
          "La OCHA, la oficina de la ONU que coordina la ayuda humanitaria, recuerda que los tres primeros están en la resolución 46/182, de 1991, y que el cuarto se agregó con la resolución 58/114, de 2004.",
          "Para la iglesia: la ayuda no se condiciona a la fe ni se usa para ganar votos o fama, y el evangelio se ofrece con respeto, sin presionar a nadie.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ayuda con acepción de personas y la ayuda imparcial" },
      {
        t: "lista",
        items: [
          "Con acepción: primero los hermanos de la iglesia, aunque otros estén peor. Imparcial: primero los que están más graves, sean quienes sean.",
          "Con acepción: más ayuda a los que votan por el candidato del pastor. Imparcial: la ayuda no tiene partido.",
          "Con acepción: ayuda solo a los que oyen el sermón. Imparcial: la ayuda es para todos, y el sermón es para quien quiera oírlo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el albergue en el templo" },
      {
        t: "parrafo",
        texto:
          "Después de un huracán, la iglesia abre su salón como albergue junto con la organización que coordina en la ciudad. Llegan familias de varias religiones y algunas sin papeles.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recibir a todos con el mismo respeto, sin preguntar la religión ni la situación de sus papeles para darles ayuda.",
          "Paso 2, atender primero a los más vulnerables: niños, ancianos, enfermos y embarazadas.",
          "Paso 3, repartir el agua, la comida y las cobijas según la necesidad, con un registro sencillo.",
          "Paso 4, ofrecer oración y un culto en un horario aparte, para quien quiera, sin obligar a nadie.",
          "Paso 5, no usar el albergue para hacer campaña política ni para tomar fotos de las familias sin su permiso.",
          "Paso 6, coordinar todo con la organización que dirige la respuesta en la ciudad.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La imparcialidad es amor sin acepción de personas. Cuando la iglesia ayuda a todos por igual y según la necesidad, su testimonio se vuelve creíble y el evangelio se oye mejor.",
      },
      {
        t: "cuadro",
        titulo: "Los cuatro principios humanitarios",
        columnas: ["Principio", "Qué significa", "En la iglesia"],
        filas: [
          ["Humanidad", "Atender el sufrimiento dondequiera que esté, con dignidad", "Servir a cada persona como imagen de Dios"],
          ["Neutralidad", "No tomar partido en los conflictos", "No usar la ayuda para la política"],
          ["Imparcialidad", "Dar según la necesidad, sin distinguir raza, religión ni opinión", "Primero los más graves, sin acepción de personas"],
          ["Independencia", "No servir a fines políticos, económicos o militares", "No condicionar la ayuda a la fe ni a los votos"],
        ],
      },
    ],
    ideaClave:
      "Dios no hace acepción de personas (Hechos 10:34) y hace llover sobre justos e injustos (Mateo 5:45), y la fe de la iglesia debe ser sin acepción de personas (Santiago 2:1). Los cuatro principios humanitarios, reconocidos por la ONU en 1991 y en 2004, son la humanidad, la neutralidad, la imparcialidad y la independencia: la ayuda se da según la necesidad, a todos, sin condicionarla a la fe y sin usarla para la política.",
    paraLaVida: {
      texto: "Ayudo a todos según su necesidad, sin acepción de personas.",
      pregunta: "¿A quién te costaría ayudar por ser de otra religión, de otro país o de otro partido?",
    },
  },
  {
    id: "obra-social-4-3",
    objetivos: [
      "Explicar qué es el Manual Esfera y por qué la ayuda debe respetar la dignidad.",
      "Reconocer las cuatro áreas técnicas de Esfera y un ejemplo de sus normas mínimas.",
      "Organizar la ayuda en un albergue cuidando la dignidad y la protección de las personas.",
    ],
    paraEmpezar:
      "Ayudar en un desastre no es solo repartir cosas: es cuidar que las personas vivan con dignidad mientras se recuperan. El Manual Esfera, que usan miles de organizaciones, reúne las normas mínimas para hacerlo bien. La Biblia ya pedía partir el pan, albergar al que no tiene casa y cubrir al desnudo, y honrar a todos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=s-K5s7YpUC8", titulo: "Resumen del libro de Isaías (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Isaías 58:7" },
      {
        t: "parrafo",
        texto:
          "Dios pide «que partas tu pan con el hambriento, y a los pobres errantes albergues en casa; que cuando veas al desnudo, lo cubras». Comida, techo y ropa: lo básico para vivir.",
      },
      { t: "versiculo", ref: "Proverbios 31:8" },
      {
        t: "parrafo",
        texto:
          "«Abre tu boca por el mudo En el juicio de todos los desvalidos». En un desastre, los más débiles corren más peligro, y alguien tiene que defenderlos.",
      },
      { t: "versiculo", ref: "1 Pedro 2:17" },
      {
        t: "parrafo",
        texto: "«Honrad a todos». La ayuda honra a la persona: la trata con respeto, le explica, la escucha y la deja decidir.",
      },
      { t: "subtitulo", texto: "Qué es el Manual Esfera" },
      {
        t: "lista",
        items: [
          "Su nombre completo es El Manual Esfera: Carta Humanitaria y normas mínimas para la respuesta humanitaria, y su cuarta edición es de 2018.",
          "Parte de la Carta Humanitaria: toda persona afectada por un desastre tiene derecho a vivir con dignidad y a recibir ayuda.",
          "Tiene cuatro principios de protección: no exponer a las personas a más daño y cuidar a los más vulnerables.",
          "Incluye la Norma Humanitaria Esencial, con nueve compromisos sobre la calidad de la ayuda.",
          "Sus cuatro capítulos técnicos son el agua, el saneamiento y la higiene; la seguridad alimentaria y la nutrición; el alojamiento y el asentamiento; y la salud.",
          "Un ejemplo de norma mínima: al menos 15 litros de agua por persona y por día para beber y para la higiene, según el lugar y la etapa; es un mínimo, nunca un máximo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la ayuda que humilla y la ayuda que honra" },
      {
        t: "lista",
        items: [
          "Humilla: tirar las cajas desde un camión. Honra: repartir con orden, en un lugar seguro y con explicación.",
          "Humilla: decidir por la familia lo que necesita. Honra: preguntarle y dejarla escoger cuando se puede.",
          "Humilla: un albergue sin baños separados ni luz de noche. Honra: un lugar que cuida la privacidad y la seguridad de las mujeres y los niños.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el albergue de la iglesia" },
      {
        t: "parrafo",
        texto:
          "Tu iglesia recibirá a treinta personas en su salón durante una semana, después de un incendio forestal, de acuerdo con la organización que coordina la ayuda en la ciudad.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, preparar el lugar con la organización: camas, baños limpios, luz de noche y un espacio para las familias con niños.",
          "Paso 2, asegurar el agua para beber y para la higiene, por lo menos los 15 litros por persona y por día de Esfera.",
          "Paso 3, organizar las comidas con horarios, cuidando a los niños, a los ancianos y a los que tienen alguna dieta especial.",
          "Paso 4, cuidar la protección: voluntarios identificados, nunca un adulto a solas con un niño y un lugar para reportar cualquier abuso.",
          "Paso 5, informar a las familias de lo que hay, de los horarios y de a quién pedir ayuda, y escuchar sus quejas.",
          "Paso 6, respetar su intimidad: nada de fotos sin permiso ni de preguntas innecesarias.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En un albergue, la protección es tan importante como la comida. Si alguien sospecha que un menor sufre abuso, en Texas toda persona lo reporta de inmediato, y los profesionales a más tardar en 24 horas, a la línea 1-800-252-5400 o al 911 si hay peligro.",
      },
      {
        t: "cuadro",
        titulo: "Las cuatro áreas técnicas de Esfera",
        columnas: ["Área", "Qué cuida", "Un ejemplo para la iglesia"],
        filas: [
          ["Agua, saneamiento e higiene", "El agua segura, los baños y la limpieza", "Al menos 15 litros de agua por persona y día en el albergue"],
          ["Seguridad alimentaria y nutrición", "Que haya comida suficiente y adecuada", "Comidas a sus horas y atención a los niños pequeños"],
          ["Alojamiento y asentamiento", "Un techo seguro y digno", "Espacios para las familias y privacidad para las mujeres"],
          ["Salud", "La atención médica y la prevención", "Coordinar con los equipos de salud, sin dar consejos médicos"],
        ],
      },
    ],
    ideaClave:
      "Dios pide partir el pan, albergar al que no tiene casa y cubrir al desnudo (Isaías 58:7), defender al desvalido (Proverbios 31:8) y honrar a todos (1 Pedro 2:17). El Manual Esfera de 2018 reúne las normas mínimas de la ayuda humanitaria: la Carta Humanitaria y el derecho a vivir con dignidad, los principios de protección, la Norma Humanitaria Esencial y cuatro áreas técnicas, como el mínimo de 15 litros de agua por persona y por día.",
    paraLaVida: {
      texto: "Ayudo de manera que la persona se sienta honrada y protegida.",
      pregunta: "¿Cómo podría tu iglesia ayudar sin humillar a nadie en una emergencia?",
    },
  },
  {
    id: "obra-social-4-4",
    objetivos: [
      "Explicar, con 2 Corintios 8:12 y Romanos 15:26, cómo daba la iglesia para los necesitados de otro lugar.",
      "Reconocer por qué el dinero a organizaciones reconocidas suele ser la mejor donación en un desastre.",
      "Manejar un fondo para un desastre como pide la Publicación 3833 del IRS.",
    ],
    paraEmpezar:
      "Después de un desastre todos quieren ayudar, y muchos mandan ropa, agua y cosas que nadie pidió. Pero la ayuda que más sirve suele ser otra. Las iglesias de Macedonia y de Acaya enviaron una ofrenda a los pobres de Jerusalén; hoy también se puede dar con sabiduría, sin caer en engaños.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Corintios 8:12" },
      {
        t: "parrafo",
        texto:
          "«Porque si primero hay la voluntad dispuesta, será acepta según lo que uno tiene, no según lo que no tiene». Dios recibe la ofrenda según lo que cada uno puede dar.",
      },
      { t: "versiculo", ref: "Romanos 15:26" },
      {
        t: "parrafo",
        texto:
          "«Macedonia y Acaya tuvieron a bien hacer una ofrenda para los pobres que hay entre los santos que están en Jerusalén». La ayuda viajó en forma de ofrenda, llevada por hermanos de confianza.",
      },
      { t: "versiculo", ref: "Proverbios 14:15" },
      {
        t: "parrafo",
        texto:
          "«El simple todo lo cree; Mas el avisado mira bien sus pasos». Después de un desastre aparecen también los engaños: el que da con sabiduría revisa a quién le da.",
      },
      { t: "subtitulo", texto: "Las donaciones que ayudan" },
      {
        t: "lista",
        items: [
          "FEMA enseña que el dinero en efectivo a organizaciones reconocidas de ayuda en desastres es la forma de donar más rápida, flexible y eficaz.",
          "Con dinero, los que están en el lugar compran lo que de verdad falta, y además ayudan a los negocios de la zona a levantarse.",
          "Solo se donan los artículos que piden las organizaciones de ayuda: las cosas que nadie pidió llenan los almacenes y quitan tiempo a los voluntarios.",
          "Antes de dar, se revisa que la organización sea conocida y confiable, y se desconfía de los pedidos urgentes de desconocidos.",
          "Según la Publicación 3833 del IRS, una organización caritativa ayuda según la necesidad, con criterios objetivos y con registros, y puede dar ayuda inmediata, como cobijas o comidas calientes, sin pedir pruebas de la necesidad.",
          "La misma publicación dice que el donante puede dar para la ayuda en un desastre, pero no puede señalar su ofrenda para una persona o una familia en particular.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la donación que estorba y la donación que ayuda" },
      {
        t: "lista",
        items: [
          "Estorba: un camión de ropa usada que nadie pidió. Ayuda: una ofrenda enviada a una organización que trabaja en el lugar.",
          "Estorba: darle dinero a un desconocido que llama pidiendo ayuda urgente. Ayuda: dar por medio de la iglesia hermana o de una organización reconocida.",
          "Estorba: un fondo sin reglas en el que decide uno solo. Ayuda: un fondo con criterios, registros y un equipo que decide.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el fondo para el huracán" },
      {
        t: "parrafo",
        texto:
          "Después de un huracán en la costa, tu iglesia quiere recoger dinero para ayudar a las familias afectadas, entre ellas algunas de la iglesia hermana de la zona.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, anunciar una ofrenda especial para la ayuda en el huracán, no para personas en particular.",
          "Paso 2, escribir los criterios: ayudar según la necesidad a las familias afectadas, sean o no de la iglesia.",
          "Paso 3, enviar el dinero a la iglesia hermana o a una organización reconocida en el lugar, con un recibo.",
          "Paso 4, si la iglesia ayuda directamente, registrar a quién se ayudó, por qué y con cuánto.",
          "Paso 5, informar a la iglesia en qué se usó la ofrenda y dar gracias a los que dieron.",
          "Paso 6, avisar a los hermanos que no den datos ni dinero a desconocidos que llamen en nombre de las víctimas.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo legal de esta materia es una guía general, no un consejo legal. Antes de manejar un fondo grande para un desastre, lee la Publicación 3833 del IRS o consulta a un contador.",
      },
    ],
    ideaClave:
      "Dios recibe la ofrenda según lo que cada uno tiene (2 Corintios 8:12), y las iglesias de Macedonia y Acaya enviaron una ofrenda a los pobres de Jerusalén (Romanos 15:26), con prudencia, porque el avisado mira bien sus pasos (Proverbios 14:15). FEMA enseña que el dinero a organizaciones reconocidas es la mejor donación y que solo se donan los artículos que se piden. Según la Publicación 3833 del IRS, la ayuda se da según la necesidad, con criterios y registros, y no se señala para una persona en particular.",
    paraLaVida: {
      texto: "Doy con generosidad y con sabiduría.",
      pregunta: "La próxima vez que haya un desastre, ¿a quién y cómo vas a dar tu ayuda?",
    },
  },
  {
    id: "obra-social-4-5",
    objetivos: [
      "Explicar, con Eclesiastés 4:9-10 y Romanos 12:4-5, por qué en un desastre se trabaja con otros.",
      "Reconocer las cuatro C de National VOAD y qué es un grupo de recuperación a largo plazo.",
      "Ubicar a la iglesia dentro de la respuesta coordinada de su comunidad.",
    ],
    paraEmpezar:
      "En un desastre nadie puede hacerlo todo solo, ni siquiera el gobierno. Por eso las organizaciones de ayuda se coordinan, y las iglesias que se suman a esa coordinación sirven mejor y por más tiempo. Nehemías organizó al pueblo para que, al sonido de la trompeta, todos se reunieran donde hacía falta.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Eclesiastés 4:9-10" },
      {
        t: "parrafo",
        texto:
          "«Mejores son dos que uno», porque «si cayeren, el uno levantará a su compañero». En la ayuda, trabajar juntos es más fuerte y más seguro.",
      },
      { t: "versiculo", ref: "Nehemías 4:19-20" },
      {
        t: "parrafo",
        texto:
          "Nehemías dijo: «La obra es grande y extensa», y pidió: «En el lugar donde oyereis el sonido de la trompeta, reuníos allí con nosotros». La coordinación lleva la ayuda adonde se necesita.",
      },
      { t: "versiculo", ref: "Romanos 12:4-5" },
      {
        t: "parrafo",
        texto:
          "«No todos los miembros tienen la misma función», pero «somos un cuerpo en Cristo». En un desastre, cada iglesia y cada organización aporta lo suyo.",
      },
      { t: "subtitulo", texto: "Cómo se coordina la ayuda" },
      {
        t: "lista",
        items: [
          "National VOAD, la red de organizaciones voluntarias activas en desastres de los Estados Unidos, promueve sus cuatro C: cooperación, comunicación, coordinación y colaboración.",
          "Cada estado tiene su propia red de organizaciones voluntarias activas en desastres, y la oficina de manejo de emergencias del estado coordina con ellas.",
          "FEMA pide no ir por cuenta propia a una zona de desastre: los voluntarios se inscriben con una organización y esperan a que ella los envíe.",
          "Según la guía de National VOAD de 2023, un grupo de recuperación a largo plazo reúne a representantes de organizaciones de fe, sin fines de lucro, del gobierno, de los negocios y otras, para ayudar a las familias a recuperarse.",
          "La iglesia aporta lo que tiene: voluntarios, un salón, cocinas, conocimiento del barrio y la confianza de los vecinos.",
          "La recuperación dura meses o años: la iglesia que se queda acompaña cuando los demás ya se fueron.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia sola y la iglesia coordinada" },
      {
        t: "lista",
        items: [
          "Sola: abre un centro de ayuda sin avisar a nadie y repite lo que otros ya dan. Coordinada: pregunta qué falta y cubre ese hueco.",
          "Sola: manda voluntarios sin preparación a casas inseguras. Coordinada: sus voluntarios van capacitados y con el equipo de protección.",
          "Sola: se cansa en un mes. Coordinada: comparte la carga y sigue en la recuperación.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la iglesia en la recuperación" },
      {
        t: "parrafo",
        texto:
          "Tres meses después de una inundación en tu ciudad, se forma un grupo de recuperación a largo plazo, y el pastor quiere que la iglesia participe.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, asistir a la reunión del grupo y presentar lo que la iglesia puede aportar.",
          "Paso 2, ofrecer el salón para las reuniones o para un centro de ayuda, si hace falta.",
          "Paso 3, formar un equipo de voluntarios capacitados para la limpieza y las reparaciones, con el equipo de protección.",
          "Paso 4, conectar a las familias del barrio con el grupo, para que reciban el acompañamiento de un caso.",
          "Paso 5, compartir con el grupo, con permiso, las necesidades que la iglesia conoce de primera mano.",
          "Paso 6, seguir participando en las reuniones hasta que la recuperación termine.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La iglesia no compite con otras organizaciones: suma. Coordinarse no le quita su identidad; le da la oportunidad de servir mejor, por más tiempo y donde de verdad hace falta.",
      },
    ],
    ideaClave:
      "Mejores son dos que uno, porque si uno cae el otro lo levanta (Eclesiastés 4:9-10), y somos un cuerpo con muchas funciones (Romanos 12:4-5). National VOAD promueve sus cuatro C, cooperación, comunicación, coordinación y colaboración; FEMA pide no ir por cuenta propia, sino con una organización; y el grupo de recuperación a largo plazo reúne a las organizaciones de fe, sin fines de lucro, del gobierno y de los negocios para acompañar a las familias hasta que se recuperen.",
    paraLaVida: {
      texto: "Sirvo junto a otros y me sumo a la ayuda coordinada.",
      pregunta: "¿Sabes qué organizaciones coordinan la ayuda en los desastres de tu ciudad?",
    },
  },
  {
    id: "obra-social-4-6",
    objetivos: [
      "Explicar, con Génesis 41:35-36, por qué la iglesia se prepara antes del desastre.",
      "Escribir los puntos principales del plan de la iglesia para un desastre.",
      "Recibir con amor y con prudencia a las personas que llegan huyendo de un desastre o de la violencia.",
    ],
    paraEmpezar:
      "José guardó el trigo en los años buenos para los años de hambre, y Egipto no pereció. Prepararse no es falta de fe: es mayordomía. Y cuando llegan familias que huyen de un desastre o de la violencia, la Biblia pide amarlas como a uno mismo, recordando que Jesús también fue llevado a Egipto cuando era niño.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Génesis 41:35-36" },
      {
        t: "parrafo",
        texto:
          "José aconsejó que se juntara la provisión de los años buenos y que estuviera «en depósito para el país, para los siete años de hambre». Por haberse preparado, «el país no perecerá de hambre».",
      },
      { t: "versiculo", ref: "Levítico 19:34" },
      {
        t: "parrafo",
        texto:
          "La ley decía: «Como a un natural de vosotros tendréis al extranjero que more entre vosotros, y lo amarás como a ti mismo». El que llega huyendo no es una carga: es un prójimo.",
      },
      { t: "versiculo", ref: "Mateo 2:14" },
      {
        t: "parrafo",
        texto:
          "José, el esposo de María, «tomó de noche al niño y a su madre, y se fue a Egipto». Jesús conoció en su infancia lo que es huir para salvar la vida.",
      },
      { t: "subtitulo", texto: "El plan de la iglesia para un desastre" },
      {
        t: "lista",
        items: [
          "Un equipo responsable y una cadena de llamadas para saber cómo está cada familia de la iglesia.",
          "La lista de los más vulnerables: ancianos solos, enfermos, personas con discapacidad y familias sin carro.",
          "Lo necesario guardado: agua, alimentos, linternas, un botiquín y copias de los documentos importantes de la iglesia.",
          "El plan para el templo: qué se protege, quién lo revisa después y cómo se usaría como albergue, de acuerdo con la organización que coordina.",
          "El contacto con las organizaciones de ayuda de la ciudad antes de que llegue el desastre.",
          "Enseñar a las familias a preparar su propio plan, como lo propone la guía Cómo prepararnos para los desastres, de Tearfund.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la iglesia que improvisa y la iglesia preparada" },
      {
        t: "lista",
        items: [
          "Improvisa: después del desastre nadie sabe cómo están los ancianos. Preparada: la cadena de llamadas los encuentra en una hora.",
          "Improvisa: busca agua cuando ya no hay. Preparada: tiene lo necesario guardado.",
          "Improvisa: recibe a las familias que llegan sin saber qué hacer. Preparada: tiene un equipo de bienvenida y una lista de recursos.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: las familias que llegan" },
      {
        t: "parrafo",
        texto:
          "Varias familias llegan a tu ciudad huyendo de un desastre en su país y de la violencia. Algunas empiezan a venir a la iglesia y no conocen a nadie.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recibirlas con calidez, por su nombre, y escuchar su historia sin forzarlas a contarla.",
          "Paso 2, ayudarlas con lo urgente: comida, ropa de temporada y orientación sobre la escuela de los niños y las clínicas.",
          "Paso 3, presentarles a una familia de la iglesia que las acompañe durante los primeros meses.",
          "Paso 4, orientarlas a las organizaciones que ayudan a los recién llegados y, para los trámites de inmigración, solo a un abogado o a un representante acreditado, nunca a un notario.",
          "Paso 5, ofrecer clases de inglés y una bolsa de trabajo, para que salgan adelante con dignidad.",
          "Paso 6, invitarlas con amor a la vida de la iglesia, sin poner la fe como condición de la ayuda.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Prepararse es mayordomía, y recibir al que huye es obediencia. Lo legal es una guía general, no un consejo legal: en los temas de inmigración, la iglesia orienta, pero no da consejos legales.",
      },
    ],
    ideaClave:
      "José guardó la provisión de los años buenos y el país no pereció de hambre (Génesis 41:35-36): prepararse es mayordomía. La iglesia preparada tiene un equipo, una cadena de llamadas, la lista de los más vulnerables, lo necesario guardado, un plan para el templo y el contacto con las organizaciones de la ciudad. Y a las familias que llegan huyendo las ama como a sí misma (Levítico 19:34), recordando que Jesús también fue llevado a Egipto (Mateo 2:14).",
    paraLaVida: {
      texto: "Me preparo con sabiduría y recibo al que llega con amor.",
      pregunta: "¿Tiene tu familia, y tu iglesia, un plan para un desastre?",
    },
  },
];
