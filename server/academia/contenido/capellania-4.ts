/**
 * Especialidad Capellanía · Materia 4 — Emergencias y desastres (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el capellán en las emergencias (con la
 * guía de FEMA de no ir por cuenta propia, comprobada), la primera ayuda psicológica de la OMS (observar, escuchar y
 * conectar, comprobada), la fe en medio del desastre, el aviso de una muerte (los cinco principios del manual de Iowa,
 * comprobados), los niños y los más vulnerables (con los CDC, comprobado), y el cuidado del que cuida con la preparación
 * de la iglesia (con la guía Listo y la línea de SAMHSA para los afectados por catástrofes, comprobadas).
 */
import type { LeccionContenido } from "../tipos";

export const CAPELLANIA_4: LeccionContenido[] = [
  {
    id: "capellania-4-1",
    objetivos: [
      "Explicar dónde sirve el capellán en las emergencias y los desastres.",
      "Explicar, con Salmos 46 e Isaías 43, que Dios está con los suyos en la tribulación.",
      "Llegar a una emergencia como parte de un equipo, y no por su cuenta.",
    ],
    paraEmpezar:
      "Un incendio, una inundación, un huracán, un accidente grave o un tiroteo cambian la vida de una comunidad en minutos. Allí llegan los bomberos, la policía y los paramédicos, y también hacen falta personas que acompañen el dolor. El capellán de emergencias sirve en esos momentos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Salmos 46:1-3" },
      {
        t: "parrafo",
        texto:
          "El salmo empieza con una confesión de fe: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones». Por eso puede decir: «no temeremos, aunque la tierra sea removida».",
      },
      { t: "versiculo", ref: "Isaías 43:2" },
      {
        t: "parrafo",
        texto:
          "Dios no promete que nunca pasaremos por el agua o por el fuego, sino que estará con nosotros: «Cuando pases por las aguas, yo estaré contigo».",
      },
      { t: "versiculo", ref: "Lucas 10:33-34" },
      {
        t: "parrafo",
        texto:
          "El samaritano no pasó de largo: se acercó al herido, vendó sus heridas y «cuidó de él». El capellán se acerca al que sufre y lo cuida.",
      },
      { t: "subtitulo", texto: "Dónde sirve el capellán de emergencias" },
      {
        t: "lista",
        items: [
          "Con los bomberos, la policía y los paramédicos, como capellán de su departamento.",
          "En los desastres, con una organización de ayuda: en los albergues, en los centros de comida y en los centros de ayuda a las familias.",
          "En los hospitales, cuando llegan los heridos de un accidente o de una tragedia.",
          "En su propia comunidad, cuando la iglesia abre sus puertas para ayudar.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: llegar por su cuenta y llegar con un equipo" },
      {
        t: "lista",
        items: [
          "Por su cuenta: llega sin que lo llamen, estorba a los rescatistas y se pone en peligro. Con un equipo: llega cuando lo llaman y se reporta con quien está a cargo.",
          "Por su cuenta: no sabe a dónde ir ni qué se necesita. Con un equipo: recibe una tarea y sabe a quién rendirle cuentas.",
          "Por su cuenta: nadie lo cuida a él. Con un equipo: trabaja por turnos, con compañeros y con descanso.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "FEMA, la agencia federal para el manejo de emergencias, pide a los voluntarios que no vayan por su cuenta a la zona de un desastre, porque llegar sin aviso es una carga más para los rescatistas, y que se unan antes del desastre a una organización reconocida. Muchas de esas organizaciones trabajan juntas en National VOAD, la red nacional de organizaciones voluntarias que sirven en los desastres.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el incendio de un edificio de apartamentos" },
      {
        t: "parrafo",
        texto:
          "A las once de la noche se incendia un edificio de apartamentos de tu ciudad. El departamento de bomberos, donde sirves como capellán voluntario, te llama.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, orar y salir con tu identificación y tu chaleco de capellán.",
          "Paso 2, presentarte con el jefe a cargo y esperar a que te asigne una tarea.",
          "Paso 3, quedarte fuera de la zona de peligro, sin estorbar el trabajo de los bomberos.",
          "Paso 4, acercarte a las familias que salieron del edificio: preguntarles su nombre, si alguien está herido y qué necesitan.",
          "Paso 5, ayudarles a conseguir agua, una manta y un lugar seguro, y a comunicarse con los suyos.",
          "Paso 6, ofrecer una oración a quien la quiera y, al terminar, reportarte con el jefe antes de irte.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En una emergencia, la seguridad va primero. El capellán nunca entra a una zona de peligro ni toma las decisiones que les tocan a los rescatistas: sirve dentro del equipo y bajo la autoridad de quien está a cargo.",
      },
    ],
    ideaClave:
      "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones, y está con los suyos en el agua y en el fuego. El capellán de emergencias sirve con los bomberos, la policía y los paramédicos, en los desastres y en su comunidad. No llega por su cuenta: se une antes a una organización, llega cuando lo llaman, se reporta con quien está a cargo y cuida a las personas como el samaritano.",
    paraLaVida: {
      texto: "Dios es nuestro pronto auxilio en las tribulaciones.",
      pregunta: "¿Con qué organización podría servir tu iglesia cuando llegue una emergencia?",
    },
  },
  {
    id: "capellania-4-2",
    objetivos: [
      "Explicar qué es la primera ayuda psicológica y sus tres pasos: observar, escuchar y conectar.",
      "Atender primero las necesidades básicas, como el ángel con Elías y Pablo en el naufragio.",
      "Acompañar a una persona en crisis sin presionarla a contar lo que vivió.",
    ],
    paraEmpezar:
      "Después de una tragedia, una persona puede estar en shock, llorar sin parar, temblar o no sentir nada. En ese momento no necesita un sermón largo: necesita a alguien que la ayude a estar a salvo, a calmarse y a encontrar a los suyos.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jWG-433qdWM", titulo: "Hechos 21 a 28", fuente: "Proyecto Biblia", minutos: 5 },
      { t: "versiculo", ref: "1 Reyes 19:5-7" },
      {
        t: "parrafo",
        texto:
          "Elías estaba agotado y desanimado. Antes de hablarle de su misión, el ángel lo dejó dormir y le dio de comer: «Levántate y come, porque largo camino te resta».",
      },
      { t: "versiculo", ref: "Hechos 27:33-36" },
      {
        t: "parrafo",
        texto:
          "En medio del naufragio, Pablo animó a todos a comer: «os ruego que comáis por vuestra salud». Dio gracias a Dios, comió delante de todos, y «todos, teniendo ya mejor ánimo, comieron también».",
      },
      { t: "versiculo", ref: "Santiago 2:15-16" },
      {
        t: "parrafo",
        texto:
          "La fe no se queda en palabras. Santiago pregunta de qué sirve decir «Id en paz, calentaos y saciaos», si no damos lo que el cuerpo necesita.",
      },
      { t: "subtitulo", texto: "Los tres pasos de la primera ayuda psicológica" },
      {
        t: "parrafo",
        texto:
          "La Organización Mundial de la Salud publicó una guía de primera ayuda psicológica para los que ayudan en las crisis. La resume en tres pasos:",
      },
      {
        t: "lista",
        items: [
          "Observar: ver si el lugar es seguro, quién necesita ayuda urgente y quién está muy angustiado.",
          "Escuchar: acercarse con respeto, preguntar qué necesita la persona y escucharla con calma, sin presionarla a contar lo que vivió.",
          "Conectar: ayudarla a conseguir lo básico, como agua, comida, abrigo o un médico, a encontrar a su familia y a recibir otros servicios.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que ayuda y lo que no ayuda" },
      {
        t: "lista",
        items: [
          "Ayuda: preguntar qué necesita. No ayuda: decirle lo que tiene que sentir.",
          "Ayuda: dejar que cuente lo que quiera, cuando quiera. No ayuda: presionarla a contar todos los detalles.",
          "Ayuda: dar información verdadera. No ayuda: prometer lo que no sabemos, como que todos están bien.",
          "Ayuda: ofrecer una oración, si la quiere. No ayuda: aprovechar su dolor para presionarla a cambiar de religión.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: una madre después de la inundación" },
      {
        t: "parrafo",
        texto:
          "Rosa, de cuarenta años, perdió su casa en una inundación. Está en un albergue, mojada, con sus dos hijos, y no sabe dónde está su esposo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, observar: Rosa y sus hijos están a salvo, pero tienen frío, y ella tiembla.",
          "Paso 2, acercarte con calma, decirle tu nombre y que eres capellán del albergue.",
          "Paso 3, preguntarle qué necesita primero, y conseguirle mantas, ropa seca y algo de comer para ella y los niños.",
          "Paso 4, escucharla sin presionarla, y no prometerle que su esposo está bien.",
          "Paso 5, conectarla con el personal del albergue que ayuda a encontrar a los familiares.",
          "Paso 6, preguntarle si quiere que oren juntos, y decirle cuándo volverás a verla.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La primera ayuda psicológica no es una terapia, y no obliga a nadie a contar lo que vivió. Si alguien habla de quitarse la vida, no se le deja solo: se busca ayuda enseguida, y en los Estados Unidos se puede llamar o enviar un mensaje de texto al 988.",
      },
    ],
    ideaClave:
      "Antes de hablarle, el ángel dejó dormir a Elías y le dio de comer; en el naufragio, Pablo animó a todos a comer; y la fe da lo que el cuerpo necesita. La primera ayuda psicológica de la OMS tiene tres pasos: observar, escuchar y conectar. El capellán atiende primero lo básico, escucha sin presionar, no promete lo que no sabe y ayuda a la persona a encontrar a los suyos.",
    paraLaVida: {
      texto: "A veces la mejor ayuda empieza con un vaso de agua y una manta.",
      pregunta: "¿A quién podrías acompañar esta semana con algo práctico?",
    },
  },
  {
    id: "capellania-4-3",
    objetivos: [
      "Explicar, con la torre de Siloé, que un desastre no prueba que sus víctimas fueran más culpables.",
      "Acompañar con presencia y en silencio, como los amigos de Job al principio.",
      "Responder con compasión al que pregunta si Dios lo castigó.",
    ],
    paraEmpezar:
      "Después de un desastre, muchos preguntan por qué pasó, o si Dios los castigó. Otros se enojan con Dios. El capellán no tiene todas las respuestas, pero puede acompañar con fe, con humildad y con amor.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=_AIvRQj8kHs", titulo: "Resumen de la historia de Job: ¿por qué la vida de Job se volvió tan difícil?", fuente: "Proyecto Biblia", minutos: 6 },
      { t: "versiculo", ref: "Lucas 13:4-5" },
      {
        t: "parrafo",
        texto:
          "Jesús habló de los dieciocho que murieron cuando cayó la torre de Siloé, y preguntó: «¿pensáis que eran más culpables que todos los hombres que habitan en Jerusalén?». Él mismo respondió: «Os digo: No».",
      },
      { t: "versiculo", ref: "Job 2:11-13" },
      {
        t: "parrafo",
        texto:
          "Los amigos de Job empezaron bien: vinieron «para condolerse de él y para consolarle», y se sentaron con él siete días en silencio, «porque veían que su dolor era muy grande». Después se equivocaron, cuando quisieron explicar su sufrimiento como un castigo.",
      },
      { t: "versiculo", ref: "Lamentaciones 3:22-23" },
      {
        t: "parrafo",
        texto:
          "Jeremías lloró sobre las ruinas de Jerusalén, y aun allí pudo decir: «Nuevas son cada mañana; grande es tu fidelidad».",
      },
      { t: "subtitulo", texto: "Lo que el capellán no dice" },
      {
        t: "lista",
        items: [
          "Que el desastre fue un castigo por los pecados de las víctimas.",
          "Que Dios necesitaba otro ángel en el cielo.",
          "Que todo pasa por algo, cuando la persona todavía está en shock.",
          "Que no debe llorar ni enojarse, porque eso es falta de fe.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: los amigos de Job al principio y al final" },
      {
        t: "lista",
        items: [
          "Al principio: vinieron juntos a consolarlo. Al final: lo acusaron.",
          "Al principio: lloraron con él y se sentaron en silencio. Al final: hablaron mucho y no lo escucharon.",
          "Al principio: vieron que su dolor era muy grande. Al final: quisieron explicarlo todo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ¿Dios me castigó?" },
      {
        t: "parrafo",
        texto:
          "Después del tornado, don Manuel, de setenta años, mira lo que quedó de su casa y te pregunta si Dios lo castigó.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, quedarte a su lado y escuchar lo que siente, sin apurarte a responder.",
          "Paso 2, reconocer su dolor: perder su casa a esta edad es muy duro.",
          "Paso 3, decirle con amor que Jesús enseñó que los que mueren en una tragedia no eran más culpables que los demás.",
          "Paso 4, recordarle que Dios no lo abandona y que está cerca de los que sufren.",
          "Paso 5, ofrecerle orar juntos, aunque quiera decirle a Dios lo que le duele.",
          "Paso 6, conectarlo con la ayuda práctica que necesita, y volver a visitarlo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán no tiene que explicar por qué pasó un desastre. La Biblia permite el lamento: los salmos y las Lamentaciones le dicen a Dios lo que duele. A veces lo más sabio es acompañar en silencio, como los amigos de Job los primeros siete días.",
      },
    ],
    ideaClave:
      "Jesús enseñó que los que murieron cuando cayó la torre de Siloé no eran más culpables que los demás. Los amigos de Job consolaron bien mientras se sentaron con él en silencio, y se equivocaron cuando quisieron explicar su dolor como un castigo. El capellán no culpa a las víctimas ni usa frases que lastiman: acompaña, escucha el lamento y recuerda que las misericordias de Dios son nuevas cada mañana.",
    paraLaVida: {
      texto: "Las misericordias de Dios son nuevas cada mañana.",
      pregunta: "¿Qué frase dejarías de decirle a alguien que sufre?",
    },
  },
  {
    id: "capellania-4-4",
    objetivos: [
      "Explicar los cinco principios para avisar una muerte: en persona, a tiempo, en pareja, con palabras claras y con compasión.",
      "Llorar con los que lloran, como Jesús ante la tumba de Lázaro.",
      "Acompañar a una familia que recibe la noticia de una muerte repentina.",
    ],
    paraEmpezar:
      "Una de las tareas más difíciles del capellán de la policía o de los bomberos es acompañar al oficial que le avisa a una familia que uno de los suyos murió. Ese momento quedará grabado para siempre en su memoria, y por eso se hace con mucho cuidado.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Juan 11:33-35" },
      {
        t: "parrafo",
        texto:
          "Jesús sabía que iba a resucitar a Lázaro, y aun así, al ver llorar a María, «se estremeció en espíritu y se conmovió». Y dice el versículo más corto de la Biblia: «Jesús lloró».",
      },
      { t: "versiculo", ref: "Romanos 12:15" },
      {
        t: "parrafo",
        texto: "La Biblia nos pide acompañar el dolor de los demás: «llorad con los que lloran».",
      },
      { t: "versiculo", ref: "Proverbios 25:20" },
      {
        t: "parrafo",
        texto:
          "Las palabras alegres a destiempo lastiman: «El que canta canciones al corazón afligido Es como el que quita la ropa en tiempo de frío».",
      },
      { t: "subtitulo", texto: "Los cinco principios para avisar una muerte" },
      {
        t: "parrafo",
        texto:
          "Un manual publicado en Iowa en 1992, que hoy usan muchos departamentos de policía y de bomberos, resume la manera correcta de avisar una muerte en cinco principios:",
      },
      {
        t: "lista",
        items: [
          "En persona: nunca por teléfono, salvo que no haya otra opción.",
          "A tiempo: pronto, antes de que la familia se entere por las noticias o por las redes.",
          "En pareja: van dos personas, como un oficial y un capellán, para que uno hable y el otro acompañe.",
          "Con palabras claras: se dice que la persona murió, sin frases que confunden.",
          "Con compasión: nadie da la noticia y se va; se queda a acompañar.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: palabras que confunden y palabras claras" },
      {
        t: "lista",
        items: [
          "Confunde: se nos fue. Es claro: murió.",
          "Confunde: tuvo un problema en la carretera. Es claro: tuvo un accidente de auto y murió en el lugar.",
          "Confunde: hicimos todo lo posible, pero… Es claro: los médicos trataron de salvarlo, pero murió.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: acompañar al oficial a avisar a una madre" },
      {
        t: "parrafo",
        texto:
          "Un joven de diecinueve años murió en un accidente de auto. La policía te pide, como capellán, que acompañes al oficial a avisarle a su madre.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, confirmar con el oficial quién murió, qué pasó y que la identificación es segura.",
          "Paso 2, orar antes de tocar la puerta, y decidir quién de los dos hablará.",
          "Paso 3, presentarse, confirmar que hablan con la madre y pedirle entrar y sentarse.",
          "Paso 4, darle la noticia con palabras claras: su hijo tuvo un accidente de auto y murió.",
          "Paso 5, quedarse con ella, permitir el llanto, responder sus preguntas con la verdad y no decir frases hechas.",
          "Paso 6, ayudarla a llamar a alguien de confianza, no dejarla sola y explicarle los pasos que siguen.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán nunca da por su cuenta la noticia de una muerte: la da junto con la autoridad que la confirmó. Si el que murió es un bombero o un policía, el capellán acompaña también a su familia y a sus compañeros en los días que siguen.",
      },
    ],
    ideaClave:
      "Jesús lloró ante la tumba de Lázaro, y la Biblia nos pide llorar con los que lloran, sin cantar canciones al corazón afligido. Una muerte se avisa en persona, a tiempo, en pareja, con palabras claras y con compasión. El capellán acompaña a la autoridad que da la noticia, dice la verdad sin frases que confunden y no deja sola a la familia.",
    paraLaVida: {
      texto: "Jesús lloró con los que lloraban.",
      pregunta: "¿Cómo puedes acompañar a alguien que perdió a un ser querido?",
    },
  },
  {
    id: "capellania-4-5",
    objetivos: [
      "Describir cómo reaccionan los niños ante un desastre según su edad.",
      "Explicar, con el ejemplo de Jesús, el cuidado especial de los niños y de los más débiles.",
      "Ayudar a una familia a cuidar a sus hijos después de un desastre.",
    ],
    paraEmpezar:
      "En un desastre, los niños, los ancianos, las personas con discapacidad y los que no hablan inglés sufren más y piden menos. El capellán los busca y los cuida de una manera especial.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Marcos 10:14-16" },
      {
        t: "parrafo",
        texto:
          "Cuando los discípulos quisieron alejar a los niños, Jesús se indignó y dijo: «Dejad a los niños venir a mí, y no se lo impidáis». Después, «tomándolos en los brazos, poniendo las manos sobre ellos, los bendecía».",
      },
      { t: "versiculo", ref: "Isaías 40:11" },
      {
        t: "parrafo",
        texto:
          "Dios cuida a los más débiles: «en su brazo llevará los corderos, y en su seno los llevará; pastoreará suavemente a las recién paridas».",
      },
      { t: "versiculo", ref: "Levítico 19:34" },
      {
        t: "parrafo",
        texto:
          "Y pide amar al extranjero: «lo amarás como a ti mismo; porque extranjeros fuisteis en la tierra de Egipto».",
      },
      { t: "subtitulo", texto: "Cómo reaccionan los niños" },
      {
        t: "parrafo",
        texto:
          "Los Centros para el Control y la Prevención de Enfermedades (CDC) explican que cada niño reacciona según su edad y lo que ha vivido. Algunas reacciones comunes:",
      },
      {
        t: "lista",
        items: [
          "Los más pequeños: lloran más, se pegan a sus padres, tienen miedo de separarse o vuelven a conductas de cuando eran más chicos.",
          "Los de primaria: tienen pesadillas, miedo de que vuelva a pasar, dolores de estómago o de cabeza, o les cuesta poner atención en la escuela.",
          "Los adolescentes: se enojan, se aíslan, se sienten culpables o se arriesgan sin pensar.",
          "Todos: necesitan sentirse seguros, cuidados y amados, y volver poco a poco a sus rutinas.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: lo que ayuda y lo que no ayuda a un niño" },
      {
        t: "lista",
        items: [
          "Ayuda: decirle la verdad con palabras sencillas. No ayuda: mentirle o callarlo todo.",
          "Ayuda: volver a las rutinas de comer, dormir y estudiar. No ayuda: dejarlo frente a las noticias del desastre todo el día.",
          "Ayuda: que los padres cuiden su propia calma. No ayuda: que vea a los adultos perder el control a cada rato.",
        ],
      },
      { t: "subtitulo", texto: "Los más vulnerables" },
      {
        t: "lista",
        items: [
          "Los ancianos y las personas con discapacidad: pueden necesitar sus medicinas, sus aparatos o ayuda para moverse.",
          "Los que no hablan inglés: necesitan a alguien que les explique en su idioma qué ayuda hay y cómo pedirla.",
          "Las familias que tienen miedo de pedir ayuda: necesitan a alguien de confianza que las acompañe a buscarla.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un niño que no quiere dormir" },
      {
        t: "parrafo",
        texto:
          "Tres semanas después del huracán, Ana te cuenta que su hijo Mateo, de seis años, no quiere dormir solo, se despierta llorando y pregunta si el viento va a volver.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar a Ana, y decirle que esas reacciones son comunes en los niños después de un desastre.",
          "Paso 2, animarla a darle seguridad: estar cerca de él en la noche y explicarle con palabras sencillas que ahora están a salvo.",
          "Paso 3, ayudarla a volver a las rutinas de la casa: comer, jugar, dormir y orar a la misma hora.",
          "Paso 4, sugerirle que aleje a Mateo de las noticias del huracán, y que lo deje dibujar o jugar lo que siente.",
          "Paso 5, orar con los dos, y enseñarle a Mateo una oración corta para la noche.",
          "Paso 6, si después de varias semanas no mejora, ayudar a Ana a buscar a un profesional de la salud mental para niños.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "El capellán nunca se queda a solas con un niño que no es suyo, ni siquiera en un albergue. Trabaja con los padres y con el equipo, y sigue las reglas de protección de menores de su organización.",
      },
    ],
    ideaClave:
      "Jesús recibió a los niños en sus brazos, Dios lleva en su brazo a los corderos, y nos pide amar al extranjero. Cada niño reacciona al desastre según su edad, y todos necesitan sentirse seguros, cuidados y amados, y volver a sus rutinas. El capellán busca a los más vulnerables, ayuda a los padres a cuidar a sus hijos y nunca se queda a solas con un niño.",
    paraLaVida: {
      texto: "Jesús tomaba a los niños en sus brazos.",
      pregunta: "¿Qué niño o qué anciano de tu comunidad necesita hoy un cuidado especial?",
    },
  },
  {
    id: "capellania-4-6",
    objetivos: [
      "Reconocer el cansancio del que ayuda en los desastres, y cuidarse a tiempo.",
      "Explicar, con el consejo de Jetro a Moisés, por qué nadie debe servir solo.",
      "Preparar a la iglesia para servir antes, durante y después de un desastre.",
    ],
    paraEmpezar:
      "Los que ayudan en una emergencia ven mucho dolor en poco tiempo. Si no se cuidan, se agotan, se enferman o dejan de servir. Y una iglesia que se prepara antes puede ayudar mucho mejor cuando llega el desastre.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "2 Corintios 1:3-4" },
      {
        t: "parrafo",
        texto:
          "Pablo llama a Dios «Dios de toda consolación, el cual nos consuela en todas nuestras tribulaciones, para que podamos también nosotros consolar a los que están en cualquier tribulación». El capellán también necesita ser consolado.",
      },
      { t: "versiculo", ref: "Marcos 6:31" },
      {
        t: "parrafo",
        texto:
          "Después de servir, Jesús llevó a sus discípulos a descansar: «Venid vosotros aparte a un lugar desierto, y descansad un poco».",
      },
      { t: "versiculo", ref: "Éxodo 18:17-18" },
      {
        t: "parrafo",
        texto:
          "Jetro vio a Moisés atender solo al pueblo de la mañana a la tarde, y le advirtió: «el trabajo es demasiado pesado para ti; no podrás hacerlo tú solo».",
      },
      { t: "versiculo", ref: "Proverbios 22:3" },
      {
        t: "parrafo",
        texto: "Y la sabiduría se prepara antes: «El avisado ve el mal y se esconde; Mas los simples pasan y reciben el daño».",
      },
      { t: "subtitulo", texto: "Las señales del cansancio del que ayuda" },
      {
        t: "lista",
        items: [
          "No puede dormir, o duerme y no descansa.",
          "Se irrita fácilmente, o se siente vacío por dentro.",
          "Las imágenes de lo que vio vuelven a su mente una y otra vez.",
          "Ya no siente compasión, o siente que solo él puede ayudar.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el que sirve solo y el que sirve en equipo" },
      {
        t: "lista",
        items: [
          "Solo: trabaja sin descanso hasta que se agota. En equipo: trabaja por turnos y descansa.",
          "Solo: se guarda lo que vio. En equipo: habla con su supervisor y con un compañero de confianza.",
          "Solo: deja de orar y de congregarse. En equipo: cuida su vida con Dios y con su familia.",
        ],
      },
      { t: "subtitulo", texto: "Cómo se prepara la iglesia" },
      {
        t: "lista",
        items: [
          "Antes: hacer un plan de emergencia para el templo y para las familias, y animar a cada casa a guardar agua para al menos tres días, un galón por persona por día, como recomienda la guía Listo del gobierno.",
          "Antes: unirse a una organización de ayuda en los desastres y capacitar a sus voluntarios.",
          "Durante: servir cuando lo pidan las autoridades o la organización, por ejemplo como albergue o como centro de comida.",
          "Después: acompañar a las familias durante meses, porque la recuperación tarda.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el capellán agotado" },
      {
        t: "parrafo",
        texto:
          "Después de dos semanas sirviendo en los albergues del huracán, el hermano Daniel no duerme, se enoja con todos y no deja de pensar en lo que vio.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reconocer las señales: el cansancio y las imágenes que vuelven son una alarma.",
          "Paso 2, hablar con su supervisor y tomar unos días de descanso.",
          "Paso 3, contarle a un compañero de confianza o a su pastor lo que está viviendo.",
          "Paso 4, volver a sus rutinas de sueño, comida y ejercicio, y pasar tiempo con su familia.",
          "Paso 5, llevarle a Dios su carga en oración, y dejarse consolar por la iglesia.",
          "Paso 6, si las señales siguen, buscar a un profesional de la salud mental, y volver a servir cuando esté listo.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "En los Estados Unidos, la Línea de Ayuda para los Afectados por Catástrofes, de SAMHSA, atiende las 24 horas a quien sufre por un desastre, también a los rescatistas y a los que ayudan: se llama o se envía un mensaje de texto al 1-800-985-5990, y se marca el 2 para español.",
      },
    ],
    ideaClave:
      "Dios nos consuela para que podamos consolar a otros, Jesús llevó a sus discípulos a descansar, Jetro le advirtió a Moisés que no podría hacerlo solo, y el avisado ve el mal y se prepara. El que ayuda en los desastres reconoce las señales de su cansancio, trabaja en equipo, descansa y pide ayuda. La iglesia se prepara antes, sirve durante el desastre cuando se lo piden y acompaña a las familias en la larga recuperación.",
    paraLaVida: {
      texto: "Dios nos consuela para que podamos consolar a otros.",
      pregunta: "¿Qué harás esta semana para descansar y cuidar tu vida con Dios?",
    },
  },
];
