/**
 * Especialidad Capellanía · Materia 5 — Marco legal y ético del capellán (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: la libertad religiosa y el lugar del
 * capellán (la Primera Enmienda, Katcoff v. Marsh de 1985 y la regla del ejército de realizar o facilitar, comprobados),
 * lo que se le cuenta al capellán (la regla 505 de las Reglas de Evidencia de Texas, con los límites del Código de
 * Familia 261.101 y del Código de Recursos Humanos 48.051, comprobados), la integridad del capellán (Código Penal 22.011,
 * comprobado), los registros, la privacidad y las redes, el aval, la supervisión y el código de ética (el de la
 * Asociación de Capellanes Profesionales, comprobado), y cuando la ley y la conciencia chocan. Lleva al capellán lo que
 * enseña Ética y límites del consejero, sin repetirla. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const CAPELLANIA_5: LeccionContenido[] = [
  {
    id: "capellania-5-1",
    objetivos: [
      "Explicar cómo protege la Primera Enmienda la libertad religiosa, y por qué hay capellanes en las instituciones públicas.",
      "Explicar, con Mateo 22:21 y Romanos 13:1, la relación del creyente con las autoridades.",
      "Servir en una institución pública respetando la fe de cada persona, sin presionar a nadie.",
    ],
    paraEmpezar:
      "En los Estados Unidos hay capellanes en el ejército, en las prisiones, en los hospitales, en la policía y en el Congreso. ¿Cómo puede haber ministros en instituciones del gobierno, si el gobierno no puede tener una religión oficial? La respuesta está en la libertad religiosa.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", minutos: 8 },
      { t: "versiculo", ref: "Mateo 22:21" },
      {
        t: "parrafo",
        texto:
          "Jesús enseñó a distinguir: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios». El creyente respeta a las autoridades, pero su conciencia le pertenece a Dios.",
      },
      { t: "versiculo", ref: "Romanos 13:1" },
      {
        t: "parrafo",
        texto:
          "Pablo pide: «Sométase toda persona a las autoridades superiores; porque no hay autoridad sino de parte de Dios».",
      },
      { t: "versiculo", ref: "1 Timoteo 2:1-2" },
      {
        t: "parrafo",
        texto:
          "Y pide orar por los que gobiernan, «para que vivamos quieta y reposadamente en toda piedad y honestidad».",
      },
      { t: "subtitulo", texto: "La libertad religiosa en la Constitución" },
      {
        t: "parrafo",
        texto:
          "La Primera Enmienda de la Constitución dice dos cosas sobre la religión: el gobierno no puede establecer una religión oficial, y no puede impedir que las personas practiquen libremente su fe. Los capellanes de las instituciones públicas existen por lo segundo: el soldado lejos de casa, el preso y el enfermo internado no pueden ir a su iglesia, y el capellán lleva hasta ellos la atención espiritual. En 1985, en el caso Katcoff v. Marsh, un tribunal federal de apelaciones rechazó una demanda contra los capellanes del ejército, porque sin ellos muchos soldados no podrían practicar su fe.",
      },
      { t: "subtitulo", texto: "Comparación: servir en una iglesia y servir en una institución pública" },
      {
        t: "lista",
        items: [
          "En la iglesia: sirve a los que comparten su fe. En la institución: sirve a todos, de todas las creencias o de ninguna.",
          "En la iglesia: predica e invita a la fe. En la institución: ofrece su ayuda, y habla de su fe cuando se lo piden.",
          "En la iglesia: rinde cuentas a su pastor y a su iglesia. En la institución: también a las normas y a la autoridad de la institución.",
        ],
      },
      { t: "subtitulo", texto: "Realizar o facilitar" },
      {
        t: "parrafo",
        texto:
          "Los capellanes del ejército de los Estados Unidos siguen una regla sencilla: realizan la atención religiosa que su fe y su conciencia les permiten, y facilitan la que no pueden dar, buscando a otro capellán o a una persona de la fe de quien la pide. Así nadie se queda sin atención, y nadie tiene que actuar contra su conciencia.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un paciente de otra fe" },
      {
        t: "parrafo",
        texto:
          "En el hospital del condado, un paciente musulmán le pide al capellán un lugar tranquilo para orar a su hora, y su hija pregunta si un imán de su comunidad puede visitarlo.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, saludarlo con respeto y preguntarle qué necesita para practicar su fe.",
          "Paso 2, ayudarlo a conseguir un lugar tranquilo para orar a su hora, según las normas del hospital.",
          "Paso 3, buscar con la hija, por los medios del hospital, a un imán de su comunidad que pueda visitarlo.",
          "Paso 4, no presionarlo a cambiar de religión ni aprovechar su enfermedad para hacerlo.",
          "Paso 5, si él le pregunta por su fe, responderle con mansedumbre y respeto.",
          "Paso 6, seguir visitándolo como a todos los pacientes, y ofrecerle su compañía.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Respetar la fe de otro no es negar la propia. El capellán sigue siendo cristiano y habla de Cristo cuando se lo piden, pero en la institución no usa su cargo para presionar a nadie. Lo legal de esta materia es una guía general, no un consejo legal.",
      },
    ],
    ideaClave:
      "Jesús enseñó a dar a César lo que es de César y a Dios lo que es de Dios, y la Biblia pide someterse a las autoridades y orar por ellas. La Primera Enmienda no permite una religión oficial y protege la libre práctica de la fe; por eso hay capellanes donde las personas no pueden ir a su iglesia, como reconoció el caso Katcoff v. Marsh en 1985. En una institución pública, el capellán sirve a todos, realiza lo que su fe le permite y facilita lo demás, sin presionar a nadie.",
    paraLaVida: {
      texto: "La libertad que defiendo para mí, la respeto en los demás.",
      pregunta: "¿Cómo puedes servir hoy a alguien que no comparte tu fe?",
    },
  },
  {
    id: "capellania-5-2",
    objetivos: [
      "Explicar qué protege la ley de Texas sobre lo que se le dice al clero en confianza.",
      "Explicar los límites de la confidencialidad, con el deber de defender al que no puede defenderse.",
      "Decidir qué se guarda y qué se reporta en un caso de capellanía.",
    ],
    paraEmpezar:
      "Las personas le cuentan al capellán lo que no le cuentan a nadie: pecados, miedos, secretos de familia. Esa confianza es sagrada y la ley la protege, pero tiene límites cuando hay una vida en peligro o un niño que sufre.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "«El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». El capellán es de espíritu fiel.",
      },
      { t: "versiculo", ref: "Santiago 5:16" },
      {
        t: "parrafo",
        texto:
          "La Biblia anima a confesar las faltas para recibir oración: «Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados».",
      },
      { t: "versiculo", ref: "Proverbios 31:8-9" },
      {
        t: "parrafo",
        texto:
          "Pero también manda defender al que no puede hablar por sí mismo: «Abre tu boca por el mudo En el juicio de todos los desvalidos».",
      },
      { t: "subtitulo", texto: "Lo que protege la ley de Texas" },
      {
        t: "parrafo",
        texto:
          "La regla 505 de las Reglas de Evidencia de Texas protege lo que una persona le dice en confianza a un ministro que la atiende como consejero espiritual: esa persona puede impedir que se revele en un juicio, y el ministro puede reclamar ese privilegio a su favor. No lo protege todo: los tribunales han dicho que no cubre las conversaciones que no buscaban consejo espiritual, como una reunión administrativa.",
      },
      { t: "subtitulo", texto: "Los límites de la confidencialidad" },
      {
        t: "lista",
        items: [
          "El abuso de un niño: en Texas, toda persona que tenga motivos para creer que un niño sufre abuso o negligencia debe reportarlo enseguida, también el clero, y los tribunales han dicho que el privilegio del clero no lo impide (Código de Familia, sección 261.101).",
          "El abuso de una persona mayor o con discapacidad: quien tenga motivos para creer que sufre abuso, negligencia o explotación debe reportarlo enseguida (Código de Recursos Humanos, sección 48.051).",
          "El peligro para una vida: si la persona piensa quitarse la vida o hacerle daño a otro, se busca ayuda de inmediato.",
          "Las reglas de la institución: en un hospital o en una prisión, el capellán reporta lo que la institución pide, como un plan de fuga o de violencia.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el secreto que se guarda y el que no" },
      {
        t: "lista",
        items: [
          "Se guarda: el pecado que la persona confiesa y del que se arrepiente. No se guarda: el abuso que está sufriendo un niño.",
          "Se guarda: sus dudas de fe y sus problemas de familia. No se guarda: el plan de quitarse la vida o de hacerle daño a alguien.",
          "Se guarda: lo que no pone a nadie en peligro. No se guarda: lo que la ley o la institución obligan a reportar.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: dos secretos en una visita" },
      {
        t: "parrafo",
        texto:
          "Un paciente le cuenta al capellán, en confianza, que hace años robó dinero de su trabajo y que se siente culpable. Luego, casi al despedirse, le dice que su sobrina de ocho años le contó que un adulto de la casa la toca.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar al paciente sin juzgarlo, y acompañarlo en su arrepentimiento por el robo.",
          "Paso 2, guardar esa confesión: no pone a nadie en peligro hoy, y le pertenece a él.",
          "Paso 3, explicarle con calma que lo de su sobrina no se puede callar, porque una niña está en peligro.",
          "Paso 4, reportarlo enseguida a la línea de abuso de Texas, y avisar a su supervisor según las normas del hospital.",
          "Paso 5, no investigar por su cuenta ni enfrentar al adulto de la casa.",
          "Paso 6, seguir acompañando al paciente, y anotar en el expediente solo lo que pide el hospital.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de que alguien le confíe algo, el capellán puede decirle con sencillez que guarda lo que le cuentan, salvo cuando hay una vida en peligro o un niño, un anciano o una persona con discapacidad que sufre abuso. Así nadie se siente traicionado después.",
      },
    ],
    ideaClave:
      "El de espíritu fiel guarda el secreto, la Biblia anima a confesar las faltas, y también manda abrir la boca por el que no puede defenderse. En Texas, la regla 505 protege lo que se le dice al clero en confianza como consejero espiritual, pero no impide reportar el abuso de un niño, que todos deben reportar enseguida, también el clero, ni el de una persona mayor o con discapacidad. El capellán guarda lo que no pone a nadie en peligro, y reporta lo que la ley y la institución piden.",
    paraLaVida: {
      texto: "La confianza se guarda; la vida se defiende.",
      pregunta: "¿Sabes a dónde llamar si un niño te cuenta que sufre abuso?",
    },
  },
  {
    id: "capellania-5-3",
    objetivos: [
      "Explicar por qué el capellán no recibe dinero ni regalos de valor de los que atiende.",
      "Reconocer los límites que protegen a las personas y al mismo capellán.",
      "Responder con integridad cuando le ofrecen dinero, regalos o un trato especial.",
    ],
    paraEmpezar:
      "El capellán atiende a las personas en su momento más débil. Por eso tiene que cuidar mucho su integridad: un regalo, un préstamo o una amistad mal llevada pueden convertirse en un abuso de confianza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Hechos 20:33-35" },
      {
        t: "parrafo",
        texto:
          "Pablo se despidió de los ancianos de Éfeso diciendo: «Ni plata ni oro ni vestido de nadie he codiciado», y les recordó las palabras de Jesús: «Más bienaventurado es dar que recibir».",
      },
      { t: "versiculo", ref: "1 Pedro 5:2-3" },
      {
        t: "parrafo",
        texto:
          "Pedro pide cuidar al rebaño «no por ganancia deshonesta, sino con ánimo pronto; no como teniendo señorío sobre los que están a vuestro cuidado».",
      },
      { t: "versiculo", ref: "2 Corintios 8:20-21" },
      {
        t: "parrafo",
        texto: "Pablo manejaba el dinero de las ofrendas «evitando que nadie nos censure».",
      },
      { t: "subtitulo", texto: "Los límites que protegen a todos" },
      {
        t: "lista",
        items: [
          "El dinero: no recibe dinero, préstamos ni regalos de valor de los que atiende, ni les vende nada; un detalle pequeño, como una tarjeta, se recibe según las normas de la institución.",
          "Los favores: no usa su cargo para conseguir clientes, votos, donaciones o miembros para su iglesia.",
          "El trato: no tiene relaciones románticas con los que atiende; en Texas, el ministro que se aprovecha de la dependencia emocional de alguien que lo tiene como consejero espiritual comete un delito (Código Penal, sección 22.011).",
          "El contacto físico: un apretón de manos o una mano en el hombro, solo con permiso, y nunca a solas con un menor.",
          "Los papeles dobles: no es a la vez el capellán y el abogado, el médico o el socio de la persona.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el servicio y el aprovechamiento" },
      {
        t: "lista",
        items: [
          "Servicio: da su tiempo sin esperar nada. Aprovechamiento: espera algo a cambio de su ayuda.",
          "Servicio: invita a la fe con respeto. Aprovechamiento: usa el dolor de la persona para presionarla.",
          "Servicio: cuida que todo sea transparente. Aprovechamiento: hace las cosas a escondidas.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el sobre con dinero" },
      {
        t: "parrafo",
        texto:
          "La familia de un paciente que murió quiere darle al capellán un sobre con quinientos dólares, en agradecimiento por su compañía.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecerles con cariño el gesto.",
          "Paso 2, explicarles con amabilidad que el capellán no recibe dinero de las familias que atiende.",
          "Paso 3, si desean dar, mencionarles que pueden donar al programa de capellanía o a una obra de ayuda, según las normas del hospital.",
          "Paso 4, no aceptar el sobre en privado ni guardarlo para después.",
          "Paso 5, contarle a su supervisor lo que pasó.",
          "Paso 6, seguir acompañando a la familia en su duelo, sin que el dinero cambie nada.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Una regla sencilla ayuda: si el capellán no se sentiría cómodo con que su supervisor o su iglesia lo supieran, no lo hace. La integridad no se mide por lo que se ve, sino por lo que se hace cuando nadie mira.",
      },
    ],
    ideaClave:
      "Pablo no codició plata ni oro de nadie, Pedro pide servir sin ganancia deshonesta ni señorío, y las ofrendas se manejaban sin dar lugar a censura. El capellán no recibe dinero ni regalos de valor, no usa su cargo para conseguir beneficios, no tiene relaciones románticas con los que atiende (en Texas, aprovecharse de la dependencia emocional de quien lo tiene como consejero espiritual es un delito), cuida el contacto físico y no mezcla papeles. Todo lo hace con transparencia.",
    paraLaVida: {
      texto: "Más bienaventurado es dar que recibir.",
      pregunta: "¿Qué límite necesitas cuidar mejor en tu servicio?",
    },
  },
  {
    id: "capellania-5-4",
    objetivos: [
      "Explicar qué escribe el capellán en un registro y qué no.",
      "Cuidar la privacidad de las personas en las conversaciones, en los sermones y en las redes.",
      "Pedir permiso antes de contar o publicar la historia de alguien.",
    ],
    paraEmpezar:
      "Hoy todo se escribe y todo se publica. Un capellán que cuenta en las redes la historia de un paciente, aunque sea para dar gloria a Dios, puede romper su privacidad y la confianza de toda una institución.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Lucas 16:10" },
      {
        t: "parrafo",
        texto:
          "«El que es fiel en lo muy poco, también en lo más es fiel». La fidelidad del capellán se ve también en los detalles: un papel, una foto, un comentario.",
      },
      { t: "versiculo", ref: "Proverbios 10:19" },
      {
        t: "parrafo",
        texto: "«En las muchas palabras no falta pecado; Mas el que refrena sus labios es prudente».",
      },
      { t: "versiculo", ref: "Efesios 4:29" },
      {
        t: "parrafo",
        texto:
          "Pablo pide que de nuestra boca salga solo la palabra que edifica: «la que sea buena para la necesaria edificación, a fin de dar gracia a los oyentes».",
      },
      { t: "subtitulo", texto: "Lo que escribe el capellán en un registro" },
      {
        t: "lista",
        items: [
          "Escribe: que hizo la visita, a petición de quién, y lo necesario para el cuidado, como si la persona pidió oración, la Santa Cena o la visita de su pastor.",
          "No escribe: lo que le confesaron, los detalles de su vida privada ni sus opiniones personales.",
          "Sigue las normas de la institución: en un hospital, sus notas forman parte del expediente que leen otros del equipo.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: contar con cuidado y contar sin cuidado" },
      {
        t: "lista",
        items: [
          "Con cuidado: pide permiso por escrito antes de contar una historia. Sin cuidado: la cuenta porque le parece hermosa.",
          "Con cuidado: cambia los detalles para que nadie reconozca a la persona. Sin cuidado: dice el nombre, el cuarto o el lugar.",
          "Con cuidado: no publica fotos de pacientes, presos o víctimas. Sin cuidado: sube una foto tomada en el hospital o en el albergue.",
          "Con cuidado: pide oración sin dar datos. Sin cuidado: pide oración por el paciente del cuarto 302.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el testimonio en las redes" },
      {
        t: "parrafo",
        texto:
          "Un paciente aceptó a Cristo antes de su cirugía. El capellán quiere publicar su historia y una foto en las redes de la iglesia.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, recordar que la historia le pertenece al paciente, y que el hospital tiene sus normas.",
          "Paso 2, no tomar fotos de pacientes ni publicar nada desde el hospital.",
          "Paso 3, si el paciente quiere dar su testimonio, dejar que lo cuente él mismo cuando esté listo.",
          "Paso 4, si se cuenta en la iglesia, pedirle permiso por escrito y cambiar los detalles que lo identifican, según las normas del hospital.",
          "Paso 5, dar gracias a Dios en oración, aunque nadie más se entere.",
          "Paso 6, en el expediente, anotar solo lo que pide el hospital.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La ley de privacidad de la salud (HIPAA), que se estudia en Capellanía hospitalaria, protege la información de los pacientes, y en una prisión o en un albergue también hay reglas. Ante la duda, el capellán no publica: pregunta primero.",
      },
    ],
    ideaClave:
      "El que es fiel en lo muy poco también en lo más es fiel, el que refrena sus labios es prudente, y nuestras palabras deben edificar. El capellán escribe en los registros solo lo necesario para el cuidado, nunca lo que le confesaron, y sigue las normas de la institución. No cuenta ni publica la historia de nadie sin su permiso, cambia los detalles que lo identifican, no publica fotos de los que atiende y pide oración sin dar datos.",
    paraLaVida: {
      texto: "La historia de otro no es mía para contarla.",
      pregunta: "¿Hay algo que publicaste que debas cuidar mejor?",
    },
  },
  {
    id: "capellania-5-5",
    objetivos: [
      "Explicar qué es el aval de la iglesia y por qué lo piden las instituciones.",
      "Explicar para qué sirven la supervisión y los códigos de ética de los capellanes.",
      "Responder con verdad y con amor cuando un compañero cruza un límite.",
    ],
    paraEmpezar:
      "Ningún capellán trabaja por su cuenta. Lo envía su iglesia, lo supervisa la institución y lo guía un código de ética. Rendir cuentas no es desconfianza: es lo que protege a las personas y al mismo capellán.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Hebreos 13:17" },
      {
        t: "parrafo",
        texto:
          "Los pastores velan por las almas «como quienes han de dar cuenta». El capellán también da cuenta de su servicio.",
      },
      { t: "versiculo", ref: "Gálatas 6:1" },
      {
        t: "parrafo",
        texto:
          "Cuando alguien cae en una falta, la Biblia pide: «restauradle con espíritu de mansedumbre, considerándote a ti mismo, no sea que tú también seas tentado».",
      },
      { t: "versiculo", ref: "Proverbios 27:17" },
      {
        t: "parrafo",
        texto:
          "Y los compañeros se ayudan a crecer: «Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo».",
      },
      { t: "subtitulo", texto: "Las tres maneras de rendir cuentas" },
      {
        t: "lista",
        items: [
          "El aval de su iglesia: su grupo de fe certifica que es un ministro en regla y lo envía. Lo piden las fuerzas armadas, muchos hospitales y la certificación profesional, y si su iglesia le retira el aval, pierde ese respaldo y muchas veces su puesto de capellán.",
          "La supervisión de la institución: tiene un supervisor, sigue sus normas y le informa lo que pasa.",
          "El código de ética: las asociaciones de capellanes, como la Asociación de Capellanes Profesionales, tienen un código de ética que sus miembros se comprometen a cumplir, y un proceso para atender las quejas.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: la supervisión que ayuda y la que se evita" },
      {
        t: "lista",
        items: [
          "Ayuda: le cuenta a su supervisor los casos difíciles. Se evita: decide solo y lo esconde.",
          "Ayuda: recibe la corrección con humildad. Se evita: se defiende de todo.",
          "Ayuda: sigue aprendiendo con cursos y lecturas. Se evita: cree que ya lo sabe todo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: un compañero que cruza un límite" },
      {
        t: "parrafo",
        texto:
          "La capellana Marta nota que un compañero voluntario le escribe mensajes privados a medianoche a una paciente joven, y que le regaló un teléfono.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, no ignorarlo, y tampoco contarlo como chisme a otros voluntarios.",
          "Paso 2, avisar enseguida a su supervisor, porque la seguridad de la paciente va primero.",
          "Paso 3, si la paciente es menor de edad, reportarlo también como pide la ley.",
          "Paso 4, no enfrentarlo con acusaciones ni investigar por su cuenta: la institución sigue su proceso.",
          "Paso 5, si se lo piden, contar con verdad solo lo que vio.",
          "Paso 6, orar por los dos y cuidar su propio corazón, considerándose a sí misma.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "La Biblia pide que una acusación contra un líder tenga dos o tres testigos, y también pide restaurar con mansedumbre al que cae. Por eso el capellán no acusa sin pruebas, pero tampoco calla lo que pone en peligro a alguien.",
      },
    ],
    ideaClave:
      "Los pastores velan por las almas como quienes han de dar cuenta, al que cae se le restaura con mansedumbre, y los compañeros se aguzan como el hierro. El capellán rinde cuentas de tres maneras: el aval de su iglesia, que lo envía y que piden las fuerzas armadas, muchos hospitales y la certificación profesional; la supervisión de la institución; y el código de ética de su asociación. Cuando un compañero cruza un límite, no lo calla ni lo divulga: avisa a su supervisor, protege a la persona y deja que la institución siga su proceso.",
    paraLaVida: {
      texto: "Rendir cuentas me protege.",
      pregunta: "¿A quién le rindes cuentas de tu servicio?",
    },
  },
  {
    id: "capellania-5-6",
    objetivos: [
      "Explicar, con Daniel y con los apóstoles, cuándo se obedece a Dios antes que a los hombres.",
      "Distinguir una norma que limita al capellán de una orden que lo obliga a pecar.",
      "Responder con respeto cuando la institución le pide algo contra su conciencia.",
    ],
    paraEmpezar:
      "A veces la institución pone reglas que incomodan al capellán, y muy pocas veces le pide algo que va contra su fe. No es lo mismo. El capellán sabio distingue una cosa de la otra, y responde con respeto y con firmeza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Hechos 4:19-20" },
      {
        t: "parrafo",
        texto:
          "Cuando les prohibieron predicar, Pedro y Juan respondieron: «Juzgad si es justo delante de Dios obedecer a vosotros antes que a Dios».",
      },
      { t: "versiculo", ref: "Daniel 6:10" },
      {
        t: "parrafo",
        texto:
          "Cuando el rey prohibió orar, Daniel siguió orando: «se arrodillaba tres veces al día, y oraba y daba gracias delante de su Dios, como lo solía hacer antes». No armó un escándalo: siguió siendo fiel y aceptó las consecuencias.",
      },
      { t: "versiculo", ref: "1 Timoteo 1:5" },
      {
        t: "parrafo",
        texto: "El servicio nace «de corazón limpio, y de buena conciencia, y de fe no fingida».",
      },
      { t: "subtitulo", texto: "Comparación: una norma que limita y una orden de pecar" },
      {
        t: "lista",
        items: [
          "Limita: no predicar en los pasillos ni repartir folletos sin permiso. Obliga a pecar: pedirle que niegue a Cristo o que deje de orar.",
          "Limita: visitar solo a los que aceptan la visita del capellán. Obliga a pecar: pedirle que dirija el culto de otra religión.",
          "Limita: no entrar a ciertas áreas o a ciertas horas. Obliga a pecar: pedirle que mienta en un informe o que esconda un abuso.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "Ante una norma que lo limita, el capellán obedece aunque le incomode, porque Dios pide someterse a las autoridades. Ante una orden de pecar, obedece a Dios antes que a los hombres, con respeto y aceptando las consecuencias, como Daniel.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la ceremonia de otra religión" },
      {
        t: "parrafo",
        texto:
          "El hospital le pide al capellán cristiano que dirija una ceremonia de bendición con los ritos de otra religión, porque el capellán de esa fe está de vacaciones.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecer la confianza y escuchar qué necesita la familia.",
          "Paso 2, explicar con respeto que su conciencia no le permite dirigir los ritos de otra religión.",
          "Paso 3, facilitar la atención: buscar con el hospital a un líder de esa fe en la comunidad.",
          "Paso 4, ofrecerle a la familia su compañía y su ayuda en lo que sí puede hacer.",
          "Paso 5, informar a su supervisor y anotar lo que se hizo.",
          "Paso 6, seguir sirviendo a esa familia con el mismo amor, sin criticar su fe.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Lo legal de esta materia es una guía general, no un consejo legal. Cuando tiene una duda legal, el capellán pregunta al departamento legal de la institución o a un abogado, y no decide solo.",
      },
    ],
    ideaClave:
      "Pedro y Juan obedecieron a Dios antes que a los hombres, Daniel siguió orando aunque el rey lo prohibió, y el servicio nace de buena conciencia. El capellán distingue una norma que lo limita, que obedece aunque le incomode, de una orden que lo obliga a pecar, que no cumple. Cuando su conciencia no le permite algo, lo dice con respeto, facilita que otro atienda a la persona y acepta las consecuencias, procurando tener siempre una conciencia sin ofensa ante Dios y ante los hombres.",
    paraLaVida: {
      texto: "Procuro tener una conciencia sin ofensa ante Dios y ante los hombres.",
      pregunta: "¿Hay alguna norma que te incomoda y que debes obedecer con humildad?",
    },
  },
];
