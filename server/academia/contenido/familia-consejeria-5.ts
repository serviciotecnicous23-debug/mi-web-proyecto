/**
 * Especialidad Familia y consejería · Materia 5 — Ética y límites del consejero (sílabo en shared/academia.ts).
 *
 * Texto original de la academia. Los versículos van solo con su referencia (el texto sale de la RV1960 de la web).
 * Las frases entre comillas «…» son literales de la RV1960 (scripts/academia/verificar.ts).
 * Una materia práctica, con un ejemplo resuelto paso a paso en cada lección: el lugar y los límites del consejero
 * (con el Código de Ocupaciones de Texas, capítulo 503, comprobado), la confidencialidad y sus límites (Código de Familia
 * 261.101 y Código de Recursos Humanos 48.051, comprobados), los límites con el otro sexo (Código Penal 22.011(b)(10),
 * comprobado), el poder del consejero y la política de consejería, derivar y trabajar en red, y el cuidado del
 * consejero. Lo legal es una guía general, no un consejo legal.
 */
import type { LeccionContenido } from "../tipos";

export const FAMILIA_CONSEJERIA_5: LeccionContenido[] = [
  {
    id: "familia-consejeria-5-1",
    objetivos: [
      "Explicar lo que puede hacer y lo que no le corresponde al consejero de la iglesia.",
      "Distinguir la consejería pastoral de la atención profesional.",
      "Reconocer cuándo un caso pasa los límites del consejero.",
    ],
    paraEmpezar:
      "El consejero de la iglesia hace un bien enorme: escucha, ora, aconseja con la Palabra y acompaña. Pero no es médico, ni psicólogo, ni abogado. Conocer sus límites no le quita valor: lo hace digno de confianza.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Romanos 15:14" },
      {
        t: "parrafo",
        texto:
          "Pablo confiaba en la iglesia: «estáis llenos de bondad, llenos de todo conocimiento, de tal manera que podéis amonestaros los unos a los otros». Aconsejar es parte de la vida de la iglesia.",
      },
      { t: "versiculo", ref: "2 Corintios 3:5" },
      {
        t: "parrafo",
        texto:
          "Pero nadie aconseja con sus propias fuerzas: «no que seamos competentes por nosotros mismos para pensar algo como de nosotros mismos, sino que nuestra competencia proviene de Dios».",
      },
      { t: "versiculo", ref: "Santiago 3:1" },
      {
        t: "parrafo",
        texto:
          "Y el que enseña y aconseja carga una responsabilidad mayor: «no os hagáis maestros muchos de vosotros, sabiendo que recibiremos mayor condenación».",
      },
      { t: "subtitulo", texto: "Comparación: lo que hace el consejero de la iglesia y lo que no le corresponde" },
      {
        t: "lista",
        items: [
          "Hace: escuchar, orar y aconsejar con la Palabra. No le corresponde: diagnosticar una enfermedad mental.",
          "Hace: acompañar en las crisis y en el duelo. No le corresponde: tratar un trauma profundo o una depresión grave.",
          "Hace: animar a seguir el tratamiento. No le corresponde: recetar o quitar medicinas.",
          "Hace: orientar en lo práctico. No le corresponde: dar consejo legal o de inmigración.",
          "Hace: derivar a tiempo y seguir acompañando. No le corresponde: quedarse con un caso que lo supera.",
        ],
      },
      { t: "subtitulo", texto: "Lo que dice la ley en Texas" },
      {
        t: "parrafo",
        texto:
          "En Texas, la ley que regula a los consejeros profesionales con licencia no se aplica a los ministros religiosos reconocidos, siempre que no se presenten con el título de consejero profesional con licencia (Código de Ocupaciones, sección 503.054). Por eso el consejero de la iglesia nunca usa ese título si no lo tiene. Lo legal es una guía general, no un consejo legal.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: ¿me toca a mí o a otro?" },
      {
        t: "parrafo",
        texto:
          "Una hermana le cuenta al consejero que desde hace meses no duerme, casi no come, llora todo el día y piensa que su familia estaría mejor sin ella.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, escuchar con calma y agradecerle que lo cuente.",
          "Paso 2, preguntarle directamente si ha pensado en quitarse la vida, y si tiene un plan.",
          "Paso 3, si hay peligro, no dejarla sola y llamar con ella al 988, o al 911 si el peligro es inmediato.",
          "Paso 4, reconocer el límite: esto pide un médico o un profesional de la salud mental, no solo consejería pastoral.",
          "Paso 5, ayudarla a conseguir la cita y, con su permiso, avisar a alguien de su familia.",
          "Paso 6, seguir acompañando: llamarla, orar con ella y ver que siga el tratamiento.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Derivar no es abandonar. El consejero que deriva sigue siendo pastor: ora, llama y acompaña, mientras el profesional hace su parte.",
      },
    ],
    ideaClave:
      "La iglesia está llamada a amonestarse unos a otros, y la competencia del consejero viene de Dios; por eso sirve con responsabilidad. El consejero de la iglesia escucha, ora, aconseja con la Palabra y acompaña, pero no diagnostica, no receta ni da consejo legal, y no usa el título de consejero profesional con licencia si no lo tiene. Cuando un caso lo supera, deriva y sigue acompañando.",
    paraLaVida: {
      texto: "Conocer los límites hace al consejero digno de confianza.",
      pregunta: "¿Qué caso que conoces necesita hoy una ayuda que tú no puedes dar?",
    },
  },
  {
    id: "familia-consejeria-5-2",
    objetivos: [
      "Explicar por qué el consejero guarda la confianza.",
      "Reconocer los límites de la confidencialidad en Texas.",
      "Explicar los límites de la confidencialidad al empezar una consejería.",
    ],
    paraEmpezar:
      "La gente abre su corazón cuando sabe que lo que dice no se va a contar. Un consejero que cuenta lo que oye destruye la confianza y hiere a las personas. Pero hay casos en que callar pondría en peligro una vida.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 11:13" },
      {
        t: "parrafo",
        texto:
          "El sabio lo dice así: «El que anda en chismes descubre el secreto; Mas el de espíritu fiel lo guarda todo». El consejero es, ante todo, una persona de espíritu fiel.",
      },
      { t: "versiculo", ref: "Proverbios 20:19" },
      {
        t: "parrafo",
        texto:
          "Y advierte sobre el que habla de más: «No te entremetas, pues, con el suelto de lengua». Nadie confía en un consejero que cuenta las historias de otros.",
      },
      { t: "versiculo", ref: "Proverbios 25:9" },
      {
        t: "parrafo",
        texto:
          "Los problemas se tratan con quien corresponde: «Trata tu causa con tu compañero, Y no descubras el secreto a otro».",
      },
      { t: "subtitulo", texto: "Los límites de la confidencialidad" },
      {
        t: "lista",
        items: [
          "El peligro para una vida: si la persona piensa quitarse la vida o hacerle daño a otro.",
          "El abuso de un niño: en Texas, toda persona que tenga motivos para creer que un niño sufre abuso o negligencia debe reportarlo enseguida, también el clero (Código de Familia, sección 261.101).",
          "El abuso de una persona mayor o con discapacidad: en Texas, quien tenga motivos para creer que sufre abuso, negligencia o explotación debe reportarlo enseguida, aunque lo haya sabido en una conversación confidencial (Código de Recursos Humanos, sección 48.051).",
          "La orden de un juez.",
        ],
      },
      {
        t: "parrafo",
        texto:
          "En Texas, el abuso de un niño, de una persona mayor o de alguien con discapacidad se reporta a la línea 1-800-252-5400, y al 911 si hay un peligro inmediato. Lo legal es una guía general, no un consejo legal.",
      },
      { t: "subtitulo", texto: "Comparación: lo que se guarda y lo que no se guarda" },
      {
        t: "lista",
        items: [
          "Se guarda: los pecados, las luchas y las historias que la persona confía. No se guarda: el peligro de quitarse la vida o de dañar a otro.",
          "Se guarda: los problemas del matrimonio y de la familia. No se guarda: el abuso de un niño, de una persona mayor o de alguien con discapacidad.",
          "Se guarda: el nombre de la persona en las peticiones de oración, si no dio permiso. No se usa: ninguna historia de consejería en una predicación.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: explicar los límites en la primera reunión" },
      {
        t: "lista",
        items: [
          "Paso 1, dar la bienvenida y explicar para qué es la consejería.",
          "Paso 2, decir con claridad: lo que me cuentes queda entre nosotros, con algunas excepciones.",
          "Paso 3, nombrar las excepciones: si hay peligro para tu vida o la de otro, si un niño, una persona mayor o alguien con discapacidad sufre abuso, o si un juez lo ordena.",
          "Paso 4, explicar quién más podría saber algo: por ejemplo, el pastor, si el consejero necesita consejo, y solo lo necesario.",
          "Paso 5, preguntarle si tiene dudas y si está de acuerdo.",
          "Paso 6, cuidar las notas: pocas, sin detalles innecesarios y guardadas bajo llave o con contraseña.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Nunca uses una historia de consejería en una predicación ni en una petición de oración, aunque cambies el nombre. Si la persona se reconoce, se rompe la confianza para siempre.",
      },
    ],
    ideaClave:
      "El de espíritu fiel guarda el secreto, y el chisme destruye la confianza. El consejero guarda lo que le confían, pero la confidencialidad tiene límites: el peligro para una vida, el abuso de un niño (Código de Familia, sección 261.101) y el de una persona mayor o con discapacidad (Código de Recursos Humanos, sección 48.051), que en Texas se reportan aunque se sepan en confianza, y la orden de un juez. Esos límites se explican desde la primera reunión.",
    paraLaVida: {
      texto: "La confianza se gana callando lo que no es nuestro.",
      pregunta: "¿Hay algo que te contaron en confianza y que no debías repetir?",
    },
  },
  {
    id: "familia-consejeria-5-3",
    objetivos: [
      "Explicar por qué el consejero pone límites claros en su trato con el otro sexo.",
      "Reconocer las señales de un apego que pone en peligro la consejería.",
      "Aplicar las reglas que protegen al aconsejado y al consejero.",
    ],
    paraEmpezar:
      "Muchos ministerios se han caído por una relación que empezó en la consejería. Nadie piensa que le va a pasar. Por eso los límites se ponen antes, cuando todo está bien, y no cuando ya hay un problema.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", minutos: 9 },
      { t: "versiculo", ref: "Proverbios 4:23" },
      {
        t: "parrafo",
        texto:
          "Todo empieza adentro: «Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida».",
      },
      { t: "versiculo", ref: "2 Timoteo 2:22" },
      {
        t: "parrafo",
        texto:
          "Pablo no le pidió a Timoteo que resistiera la tentación de cerca, sino que huyera: «Huye también de las pasiones juveniles, y sigue la justicia, la fe, el amor y la paz».",
      },
      { t: "versiculo", ref: "Génesis 39:11-12" },
      {
        t: "parrafo",
        texto:
          "José estaba solo en la casa cuando llegó la tentación, y no se quedó a discutir: «él dejó su ropa en las manos de ella, y huyó y salió».",
      },
      { t: "versiculo", ref: "1 Tesalonicenses 5:22" },
      {
        t: "parrafo",
        texto:
          "Y Pablo pide cuidar también lo que se ve: «Absteneos de toda especie de mal».",
      },
      { t: "subtitulo", texto: "Las reglas que protegen" },
      {
        t: "lista",
        items: [
          "No aconsejar a solas a una persona del otro sexo en un lugar privado: una puerta con ventana, otra persona cerca o un consejero del mismo sexo.",
          "Las conversaciones largas y repetidas con alguien del otro sexo se hacen con el cónyuge o con otro consejero.",
          "No hablar de la propia vida íntima ni de los problemas del propio matrimonio con el aconsejado.",
          "No escribirse mensajes personales de noche ni fuera del propósito de la consejería.",
          "No tocar, salvo un saludo apropiado.",
          "Contarle al cónyuge y a otro líder con quién se está aconsejando, sin los detalles.",
        ],
      },
      { t: "subtitulo", texto: "Las señales de un apego peligroso" },
      {
        t: "lista",
        items: [
          "El aconsejado dice que solo el consejero lo entiende, o que nunca nadie lo había escuchado así.",
          "El consejero espera con ganas esas reuniones, o se arregla de manera especial para ellas.",
          "Las conversaciones se alargan, se vuelven personales o pasan a los mensajes privados.",
          "El consejero empieza a esconderle algo de esas reuniones a su cónyuge.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: cuando aparece la señal" },
      {
        t: "parrafo",
        texto:
          "Una mujer casada que recibe consejería le dice al consejero: usted es el único hombre que me ha comprendido.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, reconocer la señal sin halagarse: es una alerta, no un cumplido.",
          "Paso 2, responder con respeto y con claridad: me alegra que te sientas escuchada, y por eso quiero que tu esposo y tú reciban ayuda juntos.",
          "Paso 3, cambiar el marco: que la consejería siga con una consejera, o con la esposa del consejero presente.",
          "Paso 4, contárselo al pastor o a otro líder, para rendir cuentas.",
          "Paso 5, contárselo a su propio cónyuge, sin los detalles de la consejería.",
          "Paso 6, revisar su propio corazón delante de Dios.",
        ],
      },
      {
        t: "nota",
        titulo: "Lo que nunca es una aventura",
        texto:
          "Si un ministro lleva a alguien que aconseja a tener relaciones sexuales, eso no es una aventura ni un pecado entre dos adultos: es un abuso de confianza y de poder. En Texas, la ley penal lo trata como agresión sexual cuando un ministro se aprovecha de la dependencia emocional de alguien que lo tiene como consejero espiritual (Código Penal, sección 22.011).",
      },
    ],
    ideaClave:
      "Sobre toda cosa hay que guardar el corazón, y José huyó cuando llegó la tentación. Los límites se ponen antes: nunca a solas con una persona del otro sexo en un lugar privado, sin hablar de la propia intimidad, sin mensajes personales y rindiendo cuentas al cónyuge y a otro líder. Cuando aparece la señal de un apego, se cambia el marco y se rinden cuentas. Que un ministro se aproveche de quien aconseja es un abuso, y en Texas, un delito.",
    paraLaVida: {
      texto: "Los límites se ponen antes de necesitarlos.",
      pregunta: "¿Qué límite necesitas poner hoy para guardar tu corazón?",
    },
  },
  {
    id: "familia-consejeria-5-4",
    objetivos: [
      "Reconocer el poder que tiene el consejero y cómo se puede abusar de él.",
      "Distinguir la consejería que libera de la que controla.",
      "Proponer una política de consejería que proteja a todos.",
    ],
    paraEmpezar:
      "El que viene a pedir consejo llega herido y confía. Eso le da al consejero un poder grande sobre su vida. Jesús enseñó que ese poder es para servir, nunca para dominar.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", minutos: 10 },
      { t: "versiculo", ref: "Mateo 20:25-26" },
      {
        t: "parrafo",
        texto:
          "Jesús lo comparó con el poder del mundo: «los gobernantes de las naciones se enseñorean de ellas», pero «entre vosotros no será así, sino que el que quiera hacerse grande entre vosotros será vuestro servidor».",
      },
      { t: "versiculo", ref: "1 Pedro 5:2-3" },
      {
        t: "parrafo",
        texto:
          "Pedro les pidió a los ancianos cuidar la grey «no por fuerza, sino voluntariamente; no por ganancia deshonesta», y «no como teniendo señorío sobre los que están a vuestro cuidado, sino siendo ejemplos de la grey».",
      },
      { t: "versiculo", ref: "Ezequiel 34:4" },
      {
        t: "parrafo",
        texto:
          "Dios reprendió a los pastores que se servían de las ovejas: «No fortalecisteis las débiles, ni curasteis la enferma», «sino que os habéis enseñoreado de ellas con dureza y con violencia».",
      },
      { t: "versiculo", ref: "2 Corintios 4:2" },
      {
        t: "parrafo",
        texto:
          "Pablo, en cambio, servía a la luz: «renunciamos a lo oculto y vergonzoso, no andando con astucia, ni adulterando la palabra de Dios».",
      },
      { t: "subtitulo", texto: "Comparación: la consejería que libera y la que controla" },
      {
        t: "lista",
        items: [
          "Libera: ayuda a la persona a decidir delante de Dios. Controla: decide por ella.",
          "Libera: usa la Biblia para sanar. Controla: usa la Biblia para callar o para culpar.",
          "Libera: anima a tener otras amistades y otros consejeros. Controla: aísla y crea dependencia.",
          "Libera: se deja corregir y rinde cuentas. Controla: nadie le puede preguntar nada.",
          "Libera: no pide nada a cambio. Controla: pide dinero, favores o lealtad.",
        ],
      },
      { t: "subtitulo", texto: "Las relaciones dobles" },
      {
        t: "parrafo",
        texto:
          "Hay una relación doble cuando el consejero tiene otra relación con el aconsejado: es su jefe, su socio, su prestamista o algo más. Esas relaciones mezclan intereses y pueden hacer daño. Lo sano es evitarlas y, si no se puede, pasar la consejería a otro.",
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: la política de consejería de la iglesia" },
      {
        t: "lista",
        items: [
          "Paso 1, quién aconseja: personas preparadas y aprobadas por los pastores, con sus antecedentes revisados.",
          "Paso 2, dónde y cuándo: en la iglesia, en horarios conocidos y con las reglas de los límites con el otro sexo.",
          "Paso 3, la confidencialidad y sus límites, por escrito y explicados al empezar.",
          "Paso 4, sin cobro y sin relaciones dobles.",
          "Paso 5, cuándo derivar, con la lista de profesionales y de recursos.",
          "Paso 6, cómo presentar una queja: ante quién, y que se atiende sin represalias.",
          "Paso 7, la revisión de la política cada año.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Si alguien denuncia un abuso de un consejero o de un líder, la iglesia lo escucha, protege a la persona, no lo encubre y, si es un delito, lo reporta a las autoridades.",
      },
    ],
    ideaClave:
      "Jesús enseñó que entre los suyos el grande es el que sirve, y Pedro pidió apacentar sin tener señorío. El consejero tiene poder sobre el que llega herido, y ese poder es para servir. La consejería que libera ayuda a decidir delante de Dios, no aísla, rinde cuentas y no pide nada a cambio; la que controla decide por el otro y usa la Biblia para callar. Una política escrita protege a todos.",
    paraLaVida: {
      texto: "El poder del consejero es para servir.",
      pregunta: "¿A quién le rindes cuentas de tu manera de aconsejar?",
    },
  },
  {
    id: "familia-consejeria-5-5",
    objetivos: [
      "Reconocer cuándo derivar a un profesional.",
      "Armar la lista de recursos de la iglesia.",
      "Derivar a una persona sin que se sienta abandonada.",
    ],
    paraEmpezar:
      "El buen samaritano curó al herido y, después, lo llevó al mesón y pagó para que lo cuidaran. Así es derivar bien: hacer lo que uno puede y buscar a otros que puedan hacer lo que falta.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=y9pED55wMM4", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", minutos: 7 },
      { t: "versiculo", ref: "Éxodo 18:21-22" },
      {
        t: "parrafo",
        texto:
          "Jetró le enseñó a Moisés a repartir la carga: «todo asunto grave lo traerán a ti, y ellos juzgarán todo asunto pequeño. Así aliviarás la carga de sobre ti, y la llevarán ellos contigo». Nadie puede atenderlo todo solo.",
      },
      { t: "versiculo", ref: "Proverbios 15:22" },
      {
        t: "parrafo",
        texto:
          "«Los pensamientos son frustrados donde no hay consejo; Mas en la multitud de consejeros se afirman». Trabajar en red no es debilidad: es sabiduría.",
      },
      { t: "versiculo", ref: "Lucas 10:33-35" },
      {
        t: "parrafo",
        texto:
          "El samaritano hizo lo que pudo: «vendó sus heridas», «lo llevó al mesón, y cuidó de él». Y después encargó a otro lo que faltaba: «Cuídamele; y todo lo que gastes de más, yo te lo pagaré cuando regrese».",
      },
      { t: "subtitulo", texto: "Cuándo derivar" },
      {
        t: "lista",
        items: [
          "Cuando hay riesgo de suicidio o de hacerle daño a otro.",
          "Cuando hay señales de una enfermedad mental: una depresión grave, crisis de ansiedad, o ver o escuchar cosas que no están.",
          "Cuando hay una adicción que necesita tratamiento médico.",
          "Cuando hay un trauma profundo, como un abuso sexual.",
          "Cuando hace falta un abogado, un médico o un servicio social.",
          "Cuando, después de varias conversaciones, no hay avance, o el caso supera al consejero.",
        ],
      },
      { t: "subtitulo", texto: "La lista de recursos de la iglesia" },
      {
        t: "lista",
        items: [
          "Los números de emergencia: el 911 y la línea 988.",
          "Las líneas de ayuda: SAMHSA (1-800-662-4357), la Línea Nacional sobre la Violencia Doméstica (1-800-799-7233) y la línea de reportes de abuso de Texas (1-800-252-5400).",
          "Profesionales de confianza que respeten la fe: médicos, psicólogos, terapeutas matrimoniales y familiares, y consejeros con licencia, de preferencia que atiendan en español.",
          "Abogados con licencia y representantes acreditados para los asuntos de inmigración.",
          "Los servicios sociales de la zona: comida, vivienda y ayuda para las familias.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: derivar sin abandonar" },
      {
        t: "parrafo",
        texto:
          "Un joven que recibe consejería cuenta que sufrió abuso sexual de niño y que tiene pesadillas cada noche.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, agradecerle su confianza y creerle.",
          "Paso 2, explicarle por qué conviene un profesional: no porque su caso sea demasiado, sino porque merece la mejor ayuda.",
          "Paso 3, darle dos o tres nombres de la lista y ofrecerle ayuda para hacer la llamada.",
          "Paso 4, preguntarle si el que abusó de él sigue cerca de niños: si es así, se consulta enseguida con el pastor cómo reportarlo, para proteger a otros niños.",
          "Paso 5, con su permiso, mantener el contacto: seguir orando y viéndose, sin hacer la parte del terapeuta.",
          "Paso 6, preguntarle en unas semanas cómo le va con la ayuda, y seguir acompañando.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Antes de compartir información con un profesional, pide permiso a la persona, salvo en los casos en que la ley obliga a reportar.",
      },
    ],
    ideaClave:
      "Jetró le enseñó a Moisés a no cargar solo con todo, y en la multitud de consejeros se afirman los planes; el buen samaritano hizo lo que pudo y llevó al herido al mesón. Se deriva ante el riesgo, la enfermedad mental, la adicción, el trauma profundo o la falta de avance. La iglesia tiene lista su red de recursos, y deriva sin abandonar: con permiso, con nombres concretos y siguiendo al lado de la persona.",
    paraLaVida: {
      texto: "Derivar no es abandonar.",
      pregunta: "¿Qué recurso le falta todavía a la lista de tu iglesia?",
    },
  },
  {
    id: "familia-consejeria-5-6",
    objetivos: [
      "Explicar por qué el consejero debe cuidar su vida con Dios y su familia.",
      "Reconocer las señales de agotamiento en el consejero.",
      "Armar un plan de supervisión y de rendición de cuentas.",
    ],
    paraEmpezar:
      "El consejero escucha muchas historias de dolor. Si no cuida su alma, su familia y su descanso, termina agotado, amargado o en peligro de caer. Cuidarse es parte de su llamado.",
    bloques: [
      { t: "video", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", minutos: 11 },
      { t: "versiculo", ref: "Hechos 20:28" },
      {
        t: "parrafo",
        texto:
          "Pablo les pidió a los ancianos de Éfeso que se cuidaran primero a sí mismos: «Por tanto, mirad por vosotros, y por todo el rebaño».",
      },
      { t: "versiculo", ref: "1 Timoteo 4:16" },
      {
        t: "parrafo",
        texto:
          "Y a Timoteo: «Ten cuidado de ti mismo y de la doctrina; persiste en ello, pues haciendo esto, te salvarás a ti mismo y a los que te oyeren».",
      },
      { t: "versiculo", ref: "Proverbios 27:17" },
      {
        t: "parrafo",
        texto:
          "Nadie se cuida solo: «Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo». El consejero también necesita quien lo aconseje.",
      },
      { t: "versiculo", ref: "2 Corintios 8:21" },
      {
        t: "parrafo",
        texto:
          "La meta es una vida íntegra a la vista de todos: «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres».",
      },
      { t: "subtitulo", texto: "Las señales del consejero agotado" },
      {
        t: "lista",
        items: [
          "Está irritable o impaciente con las personas que aconseja.",
          "No puede dejar de pensar en los casos, ni siquiera en su casa.",
          "Duerme mal y descuida su salud.",
          "Descuida a su propia familia y su vida con Dios.",
          "Siente que nada de lo que hace sirve, o deja de sentir compasión.",
          "Se aísla, y las tentaciones se vuelven más fuertes.",
        ],
      },
      { t: "subtitulo", texto: "Comparación: el consejero que se cuida y el que no" },
      {
        t: "lista",
        items: [
          "Se cuida: tiene a alguien que lo supervisa y le pregunta. No se cuida: no le rinde cuentas a nadie.",
          "Se cuida: atiende pocos casos a la vez. No se cuida: dice que sí a todos.",
          "Se cuida: guarda un día de reposo y el tiempo con su familia. No se cuida: está disponible a toda hora.",
          "Se cuida: sigue aprendiendo. No se cuida: cree que ya lo sabe todo.",
        ],
      },
      { t: "subtitulo", texto: "Ejemplo resuelto: el plan de cuidado de un consejero" },
      {
        t: "parrafo",
        texto:
          "Mario aconseja en su iglesia desde hace cinco años. Últimamente está cansado y su esposa le dice que nunca está en casa.",
      },
      {
        t: "lista",
        items: [
          "Paso 1, su vida con Dios: un tiempo diario de oración y de lectura de la Palabra que no se negocia.",
          "Paso 2, su familia: una noche a la semana sin consejería y un día de reposo.",
          "Paso 3, un límite de casos: no más de los que puede atender bien, y los demás a otros consejeros.",
          "Paso 4, la supervisión: una reunión al mes con el pastor o con un consejero con experiencia, para revisar los casos difíciles sin detalles innecesarios.",
          "Paso 5, la rendición de cuentas de su vida: un amigo que le pregunte por su matrimonio, su descanso y sus tentaciones.",
          "Paso 6, seguir aprendiendo: una capacitación cada año y, si la necesita, su propia consejería.",
        ],
      },
      {
        t: "nota",
        titulo: "Para el líder",
        texto:
          "Un consejero que no se deja aconsejar es un peligro para sí mismo y para los demás.",
      },
    ],
    ideaClave:
      "Pablo pidió a los ancianos mirar primero por sí mismos, y a Timoteo cuidar de sí mismo y de la doctrina; hierro con hierro se aguza. El consejero agotado se vuelve irritable, descuida a su familia y se aísla. El que se cuida tiene supervisión y rendición de cuentas, atiende pocos casos a la vez, guarda su día de reposo y sigue aprendiendo, para hacer las cosas honradamente delante del Señor y delante de los hombres.",
    paraLaVida: {
      texto: "El consejero también necesita quien lo aconseje.",
      pregunta: "¿Quién te aconseja a ti?",
    },
  },
];
