/**
 * Los estudios de Jerusalén en línea: estudios bíblicos por camino (sacerdocio, profetas, reyes y
 * para todos). Cada estudio tiene secciones (lectura, versículos, la idea clave y preguntas de
 * práctica) y un examen final que corrige el servidor (server/estudios-examen.ts, sin las
 * respuestas aquí). Un estudio aprobado queda para siempre: no se borra con las temporadas, lo ve la
 * comunidad y algunos cargos lo piden.
 *
 * Los versículos son de la RV1960, copiados de la Biblia del sitio (comprobar con verificar_citas.py).
 */

export type CaminoEstudio = "sacerdocio" | "profecia" | "realeza" | "comun";

export type PreguntaPractica = { p: string; ops: string[]; ok: number; por: string };

export type SeccionEstudio = {
  id: string;
  titulo: string;
  lectura: string[];
  versos: { text: string; ref: string }[];
  clave: string;
  preguntas: PreguntaPractica[];
};

export type Estudio = {
  id: string;
  camino: CaminoEstudio;
  nivel: 1 | 2;
  titulo: string;
  resumen: string;
  icono: string;
  /** Otro estudio que hay que aprobar antes. */
  requiere?: string;
  /** Para qué sirve aprobarlo (además del logro). */
  abre?: string;
  secciones: SeccionEstudio[];
};

export const CAMINOS_ESTUDIO: Record<CaminoEstudio, { nombre: string; icono: string }> = {
  sacerdocio: { nombre: "Sacerdocio", icono: "🔥" },
  profecia: { nombre: "Escuela de los profetas", icono: "📯" },
  realeza: { nombre: "Palacio del rey", icono: "👑" },
  comun: { nombre: "Para todos", icono: "📖" },
};

/** Mérito de la temporada por cada sección terminada (una vez) y por aprobar el estudio (una vez). */
export const MERITO_SECCION = 10;
export const MERITO_ESTUDIO = 100;
/** Preguntas del examen y cuántas hay que acertar. */
export const EXAMEN_PREGUNTAS = 6;
export const EXAMEN_APRUEBA = 5;
/** Espera corta entre un intento y el siguiente (segundos): para leer las correcciones. */
export const EXAMEN_ESPERA = 15;
/**
 * Intentos por estudio (de la persona, no de cada personaje). Cada intento trae preguntas que todavía
 * no le salieron. Con 5 de 6 se aprueba; se puede seguir intentando hasta sacar 6 de 6 (perfecto) o
 * hasta usar los intentos: lo que quede es su registro, y la comunidad lo ve.
 */
export const EXAMEN_INTENTOS = 5;
/** Si después de los intentos todavía no aprobó, puede volver a intentarlo cada tanto (segundos): nadie queda trabado. */
export const EXAMEN_ESPERA_LARGA = 1800;

/** Los estudios que piden los cargos de la temporada. */
export const ESTUDIO_PRINCIPAL = "sacerdocio-aaron";
export const ESTUDIO_SUMO = "expiacion";

export const ESTUDIOS: Estudio[] = [
  {
    id: "sacerdocio-aaron",
    camino: "sacerdocio",
    nivel: 1,
    titulo: "El sacerdocio de Aarón",
    resumen: "Quién llama al sacerdote, qué enseñan sus vestiduras, su servicio de cada día y su deber de enseñar.",
    icono: "🔥",
    abre: "Lo pide el cargo de principal sacerdote.",
    secciones: [
      {
        id: "llamados",
        titulo: "Llamados por Dios",
        lectura: [
          "El sacerdocio no era un oficio que alguien escogía por su cuenta: Dios llamó a Aarón y a sus hijos para que le sirvieran. Su trabajo era acercar al pueblo a Dios por medio de las ofrendas, la oración y la enseñanza.",
          "Para empezar a servir, Moisés los lavó con agua, los vistió y los ungió con aceite. El agua hablaba de limpieza; el aceite, de ser apartados para Dios.",
        ],
        versos: [
          { text: "Harás llegar delante de ti a Aarón tu hermano, y a sus hijos consigo, de entre los hijos de Israel, para que sean mis sacerdotes; a Aarón y a Nadab, Abiú, Eleazar e Itamar hijos de Aarón.", ref: "Éxodo 28:1" },
          { text: "Y derramó del aceite de la unción sobre la cabeza de Aarón, y lo ungió para santificarlo.", ref: "Levítico 8:12" },
        ],
        clave: "El sacerdote es llamado por Dios, limpiado y apartado para servirle.",
        preguntas: [
          { p: "¿Quién escogió a Aarón y a sus hijos para ser sacerdotes?", ops: ["Dios", "El pueblo, por votación", "Ellos mismos", "El rey"], ok: 0, por: "Dios mandó a Moisés hacer llegar a Aarón y a sus hijos «para que sean mis sacerdotes» (Éxodo 28:1)." },
          { p: "¿Qué derramó Moisés sobre la cabeza de Aarón para santificarlo?", ops: ["Agua del mar de bronce", "Aceite de la unción", "Vino", "Ceniza del altar"], ok: 1, por: "Levítico 8:12: lo ungió con el aceite de la unción." },
        ],
      },
      {
        id: "vestiduras",
        titulo: "Vestiduras para honra y hermosura",
        lectura: [
          "Dios mandó hacer vestiduras sagradas para Aarón. No eran un adorno vacío: cada pieza enseñaba algo. En el pectoral llevaba los nombres de las doce tribus sobre su corazón, porque el sacerdote representaba al pueblo delante de Dios.",
          "En la mitra llevaba una lámina de oro que decía «SANTIDAD A JEHOVÁ»: quien sirve a Dios debe vivir apartado para Él.",
        ],
        versos: [
          { text: "Y harás vestiduras sagradas a Aarón tu hermano, para honra y hermosura.", ref: "Éxodo 28:2" },
          { text: "Y llevará Aarón los nombres de los hijos de Israel en el pectoral del juicio sobre su corazón, cuando entre en el santuario, por memorial delante de Jehová continuamente.", ref: "Éxodo 28:29" },
          { text: "Harás además una lámina de oro fino, y grabarás en ella como grabadura de sello, SANTIDAD A JEHOVÁ.", ref: "Éxodo 28:36" },
        ],
        clave: "El sacerdote lleva al pueblo en su corazón y vive en santidad.",
        preguntas: [
          { p: "¿Qué llevaba Aarón en el pectoral, sobre su corazón?", ops: ["Los nombres de los hijos de Israel", "Las tablas de la ley", "Un frasco de aceite", "El nombre del rey"], ok: 0, por: "Éxodo 28:29: los nombres de los hijos de Israel, por memorial delante de Jehová." },
          { p: "¿Qué estaba grabado en la lámina de oro de la mitra?", ops: ["GLORIA A ISRAEL", "SANTIDAD A JEHOVÁ", "CASA DE ORACIÓN", "PAZ Y BIEN"], ok: 1, por: "Éxodo 28:36." },
        ],
      },
      {
        id: "servicio",
        titulo: "El servicio de cada día",
        lectura: [
          "El servicio del sacerdote tenía horarios: cada mañana ponía leña en el altar para que el fuego no se apagara, y mañana y tarde quemaba el incienso cuando preparaba las lámparas.",
          "Era un trabajo constante y humilde. Por eso en el juego cada deber cuenta: el fuego, las lámparas, los panes y el incienso son el corazón del servicio.",
        ],
        versos: [
          { text: "Y Aarón quemará incienso aromático sobre él; cada mañana cuando aliste las lámparas lo quemará. Y cuando Aarón encienda las lámparas al anochecer, quemará el incienso; rito perpetuo delante de Jehová por vuestras generaciones.", ref: "Éxodo 30:7-8" },
          { text: "El fuego arderá continuamente en el altar; no se apagará.", ref: "Levítico 6:13" },
        ],
        clave: "Servir a Dios es fidelidad de cada día, no solo en los días grandes.",
        preguntas: [
          { p: "¿Cuándo quemaba Aarón el incienso?", ops: ["Solo en la Pascua", "Cada mañana y al anochecer", "Una vez al año", "Cuando el rey lo pedía"], ok: 1, por: "Éxodo 30:7-8: cada mañana y al anochecer, al preparar las lámparas." },
          { p: "Según Levítico 6:13, ¿qué no debía pasar con el fuego del altar?", ops: ["Que se apagara", "Que lo viera el pueblo", "Que se usara de noche", "Que creciera"], ok: 0, por: "«El fuego arderá continuamente en el altar; no se apagará»." },
        ],
      },
      {
        id: "ensenar",
        titulo: "Enseñar al pueblo",
        lectura: [
          "El sacerdote también era maestro: debía distinguir entre lo santo y lo común, y enseñar al pueblo los estatutos de Dios. Por eso el pueblo buscaba la ley de su boca.",
          "Hoy, en Cristo, todos los creyentes somos «real sacerdocio»: también nos toca anunciar las virtudes de Dios con lo que decimos y hacemos.",
        ],
        versos: [
          { text: "para poder discernir entre lo santo y lo profano, y entre lo inmundo y lo limpio, y para enseñar a los hijos de Israel todos los estatutos que Jehová les ha dicho por medio de Moisés.", ref: "Levítico 10:10-11" },
          { text: "Porque los labios del sacerdote han de guardar la sabiduría, y de su boca el pueblo buscará la ley; porque mensajero es de Jehová de los ejércitos.", ref: "Malaquías 2:7" },
          { text: "Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable;", ref: "1 Pedro 2:9" },
        ],
        clave: "El sacerdote guarda la Palabra y la enseña.",
        preguntas: [
          { p: "¿Qué debían guardar los labios del sacerdote según Malaquías 2:7?", ops: ["El oro", "La sabiduría", "Los secretos del rey", "Los diezmos"], ok: 1, por: "«Los labios del sacerdote han de guardar la sabiduría»." },
          { p: "Según 1 Pedro 2:9, ¿qué somos los creyentes?", ops: ["Siervos del rey", "Real sacerdocio", "Levitas del templo", "Extranjeros"], ok: 1, por: "«Linaje escogido, real sacerdocio, nación santa»." },
        ],
      },
    ],
  },
  {
    id: "ofrendas-levitico",
    camino: "sacerdocio",
    nivel: 1,
    titulo: "Las ofrendas de Levítico",
    resumen: "El holocausto, la oblación, el sacrificio de paz, el sacrificio por el pecado y el sacrificio perfecto de Cristo.",
    icono: "🐑",
    secciones: [
      {
        id: "holocausto",
        titulo: "El holocausto",
        lectura: [
          "El holocausto se quemaba entero sobre el altar: era entregar todo a Dios. El animal debía ser sin defecto, lo mejor del rebaño.",
          "Quien lo traía ponía su mano sobre la cabeza del animal, como diciendo «este muere en mi lugar», y era aceptado para expiación suya.",
        ],
        versos: [
          { text: "Si su ofrenda fuere holocausto vacuno, macho sin defecto lo ofrecerá; de su voluntad lo ofrecerá a la puerta del tabernáculo de reunión delante de Jehová. Y pondrá su mano sobre la cabeza del holocausto, y será aceptado para expiación suya.", ref: "Levítico 1:3-4" },
        ],
        clave: "El holocausto es entrega completa a Dios.",
        preguntas: [
          { p: "¿Cómo debía ser el animal del holocausto?", ops: ["Sin defecto", "El más viejo", "Cualquiera", "El más pequeño"], ok: 0, por: "Levítico 1:3: «macho sin defecto»." },
          { p: "¿Qué hacía quien traía el holocausto?", ops: ["Ponía su mano sobre su cabeza", "Le echaba agua", "Le ponía incienso", "Lo vendía al sacerdote"], ok: 0, por: "Levítico 1:4." },
        ],
      },
      {
        id: "oblacion",
        titulo: "La oblación y el sacrificio de paz",
        lectura: [
          "No todas las ofrendas eran animales: la oblación era flor de harina con aceite e incienso, fruto del trabajo del campo.",
          "El sacrificio de paz celebraba la comunión con Dios: una parte se quemaba en el altar y otra se comía en familia, delante de Él.",
        ],
        versos: [
          { text: "Cuando alguna persona ofreciere oblación a Jehová, su ofrenda será flor de harina, sobre la cual echará aceite, y pondrá sobre ella incienso,", ref: "Levítico 2:1" },
          { text: "Si su ofrenda fuere sacrificio de paz, si hubiere de ofrecerla de ganado vacuno, sea macho o hembra, sin defecto la ofrecerá delante de Jehová.", ref: "Levítico 3:1" },
        ],
        clave: "Dios recibe el fruto de nuestro trabajo y nos invita a su mesa.",
        preguntas: [
          { p: "¿Qué se echaba sobre la flor de harina de la oblación?", ops: ["Aceite, y encima incienso", "Sal y vinagre", "Miel y levadura", "Agua y ceniza"], ok: 0, por: "Levítico 2:1." },
          { p: "¿Cómo debía ser el animal del sacrificio de paz?", ops: ["Sin defecto", "Solo macho", "Herido", "El más flaco"], ok: 0, por: "Levítico 3:1: «sea macho o hembra, sin defecto»." },
        ],
      },
      {
        id: "pecado",
        titulo: "Por el pecado, y la ofrenda del pobre",
        lectura: [
          "Cuando alguien pecaba, traía su sacrificio por el pecado y el sacerdote hacía expiación por él: «y será perdonado».",
          "Y si era pobre, podía traer dos tórtolas o dos palominos. El perdón de Dios no era solo para los ricos.",
        ],
        versos: [
          { text: "Y le quitará toda su grosura, como fue quitada la grosura del sacrificio de paz, y el sacerdote la hará arder en el altar sobre la ofrenda encendida a Jehová; y le hará el sacerdote expiación de su pecado que habrá cometido, y será perdonado.", ref: "Levítico 4:35" },
          { text: "Y si no tuviere lo suficiente para un cordero, traerá a Jehová en expiación por su pecado que cometió, dos tórtolas o dos palominos, el uno para expiación, y el otro para holocausto.", ref: "Levítico 5:7" },
        ],
        clave: "Dios provee perdón para todos, ricos y pobres.",
        preguntas: [
          { p: "¿Qué recibía quien traía su sacrificio por el pecado?", ops: ["Perdón", "Una tierra", "Un cargo en el templo", "Oro"], ok: 0, por: "Levítico 4:35: «y será perdonado»." },
          { p: "¿Qué podía traer quien no tenía para un cordero?", ops: ["Dos tórtolas o dos palominos", "Nada", "Una moneda de plata", "Un buey"], ok: 0, por: "Levítico 5:7." },
        ],
      },
      {
        id: "perfecto",
        titulo: "El sacrificio perfecto",
        lectura: [
          "Todas estas ofrendas se repetían una y otra vez. La carta a los Hebreos enseña que señalaban a Jesús, que se ofreció una vez para siempre.",
          "Ahora nuestra ofrenda es presentar nuestra vida a Dios como sacrificio vivo: lo que hacemos cada día, hecho para Él.",
        ],
        versos: [
          { text: "En esa voluntad somos santificados mediante la ofrenda del cuerpo de Jesucristo hecha una vez para siempre.", ref: "Hebreos 10:10" },
          { text: "Así que, hermanos, os ruego por las misericordias de Dios, que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional.", ref: "Romanos 12:1" },
        ],
        clave: "Las ofrendas señalaban a Cristo; hoy ofrecemos nuestra vida.",
        preguntas: [
          { p: "¿Cuántas veces se ofreció Cristo según Hebreos 10:10?", ops: ["Una vez para siempre", "Cada año", "Siete veces", "Cada sábado"], ok: 0, por: "«Hecha una vez para siempre»." },
          { p: "¿Cómo nos pide Romanos 12:1 presentar nuestros cuerpos?", ops: ["En sacrificio vivo, santo, agradable a Dios", "Con oro y plata", "Solo en el templo", "En ayuno de cuarenta días"], ok: 0, por: "Romanos 12:1." },
        ],
      },
    ],
  },
  {
    id: "expiacion",
    camino: "sacerdocio",
    nivel: 2,
    titulo: "El Día de la Expiación",
    resumen: "El Lugar Santísimo, el día en que todo el pueblo quedaba limpio y cómo Cristo entró una vez para siempre.",
    icono: "🕊️",
    requiere: "sacerdocio-aaron",
    abre: "Lo pide el cargo de sumo sacerdote.",
    secciones: [
      {
        id: "velo",
        titulo: "Detrás del velo",
        lectura: [
          "El Lugar Santísimo era el lugar más santo: allí estaba el arca con el propiciatorio, donde Dios se manifestaba.",
          "Dios mandó que Aarón no entrara en todo tiempo detrás del velo. Solo el sumo sacerdote entraba, una vez al año.",
        ],
        versos: [
          { text: "Y Jehová dijo a Moisés: Di a Aarón tu hermano, que no en todo tiempo entre en el santuario detrás del velo, delante del propiciatorio que está sobre el arca, para que no muera; porque yo apareceré en la nube sobre el propiciatorio.", ref: "Levítico 16:2" },
          { text: "pero en la segunda parte, sólo el sumo sacerdote una vez al año, no sin sangre, la cual ofrece por sí mismo y por los pecados de ignorancia del pueblo;", ref: "Hebreos 9:7" },
        ],
        clave: "Solo el sumo sacerdote entraba al Lugar Santísimo, una vez al año.",
        preguntas: [
          { p: "¿Qué estaba detrás del velo?", ops: ["El propiciatorio sobre el arca", "El altar de bronce", "La mesa de los panes", "El candelero"], ok: 0, por: "Levítico 16:2." },
          { p: "¿Cuántas veces al año entraba el sumo sacerdote?", ops: ["Una vez", "Cada mes", "Siete veces", "Nunca"], ok: 0, por: "Hebreos 9:7: «una vez al año»." },
        ],
      },
      {
        id: "limpios",
        titulo: "Limpios delante de Jehová",
        lectura: [
          "En ese día se hacía expiación por todo el pueblo, y todos quedaban limpios de sus pecados delante de Dios.",
          "Era un estatuto perpetuo, una vez al año: Israel nunca debía olvidar que necesitaba el perdón de Dios.",
        ],
        versos: [
          { text: "Porque en este día se hará expiación por vosotros, y seréis limpios de todos vuestros pecados delante de Jehová.", ref: "Levítico 16:30" },
          { text: "Y esto tendréis como estatuto perpetuo, para hacer expiación una vez al año por todos los pecados de Israel. Y Moisés lo hizo como Jehová le mandó.", ref: "Levítico 16:34" },
        ],
        clave: "La expiación quita el pecado y nos deja limpios ante Dios.",
        preguntas: [
          { p: "¿Qué pasaba con el pueblo en el Día de la Expiación?", ops: ["Quedaba limpio de sus pecados", "Recibía tierras", "Elegía un rey", "Salía a la guerra"], ok: 0, por: "Levítico 16:30." },
          { p: "¿Cada cuánto se hacía la expiación por todos los pecados de Israel?", ops: ["Una vez al año", "Cada semana", "Cada siete años", "Una vez en la vida"], ok: 0, por: "Levítico 16:34." },
        ],
      },
      {
        id: "cristo",
        titulo: "Cristo entró una vez para siempre",
        lectura: [
          "Hebreos enseña que Jesús es el sumo sacerdote perfecto: no entró con sangre de animales, sino con su propia sangre.",
          "Y no entró en un santuario hecho por manos, sino en el cielo mismo, para presentarse por nosotros delante de Dios.",
        ],
        versos: [
          { text: "Pero estando ya presente Cristo, sumo sacerdote de los bienes venideros, por el más amplio y más perfecto tabernáculo, no hecho de manos, es decir, no de esta creación, y no por sangre de machos cabríos ni de becerros, sino por su propia sangre, entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención.", ref: "Hebreos 9:11-12" },
          { text: "Porque no entró Cristo en el santuario hecho de mano, figura del verdadero, sino en el cielo mismo para presentarse ahora por nosotros ante Dios;", ref: "Hebreos 9:24" },
        ],
        clave: "Cristo obtuvo eterna redención.",
        preguntas: [
          { p: "¿Con qué sangre entró Cristo al Lugar Santísimo?", ops: ["Con su propia sangre", "Con sangre de machos cabríos", "Con sangre de becerros", "Sin sangre"], ok: 0, por: "Hebreos 9:12." },
          { p: "¿Dónde entró Cristo para presentarse por nosotros?", ops: ["En el cielo mismo", "En el templo de Herodes", "En el tabernáculo de Moisés", "En el palacio del rey"], ok: 0, por: "Hebreos 9:24." },
        ],
      },
      {
        id: "rasgado",
        titulo: "El velo rasgado",
        lectura: [
          "Cuando Jesús murió, el velo del templo se rasgó en dos, de arriba abajo.",
          "Ahora tenemos libertad para acercarnos a Dios por el camino nuevo y vivo que Él nos abrió.",
        ],
        versos: [
          { text: "Y he aquí, el velo del templo se rasgó en dos, de arriba abajo; y la tierra tembló, y las rocas se partieron;", ref: "Mateo 27:51" },
          { text: "Así que, hermanos, teniendo libertad para entrar en el Lugar Santísimo por la sangre de Jesucristo, por el camino nuevo y vivo que él nos abrió a través del velo, esto es, de su carne,", ref: "Hebreos 10:19-20" },
        ],
        clave: "El camino a Dios está abierto por Jesús.",
        preguntas: [
          { p: "¿Cómo se rasgó el velo del templo?", ops: ["En dos, de arriba abajo", "De abajo arriba", "Solo en una esquina", "No se rasgó"], ok: 0, por: "Mateo 27:51." },
          { p: "¿Por medio de qué tenemos libertad para entrar al Lugar Santísimo?", ops: ["Por la sangre de Jesucristo", "Por nuestras obras", "Por los diezmos", "Por ser hijos de Aarón"], ok: 0, por: "Hebreos 10:19." },
        ],
      },
    ],
  },
  {
    id: "llamado-profeta",
    camino: "profecia",
    nivel: 1,
    titulo: "El llamado del profeta",
    resumen: "Cómo llama Dios a sus profetas, por qué escuchar es mejor que los sacrificios y cómo aprendían juntos.",
    icono: "📯",
    abre: "Es el primer estudio de la escuela de los profetas.",
    secciones: [
      {
        id: "heme-aqui",
        titulo: "Heme aquí, envíame a mí",
        lectura: [
          "Isaías vio la gloria de Dios y oyó su voz preguntando a quién enviaría. Su respuesta fue ponerse a disposición: «Heme aquí, envíame a mí».",
          "A Jeremías, Dios le dijo que lo conocía antes de formarlo en el vientre. El profeta no se elige a sí mismo: Dios lo llama y lo envía.",
        ],
        versos: [
          { text: "Después oí la voz del Señor, que decía: ¿A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí.", ref: "Isaías 6:8" },
          { text: "Antes que te formase en el vientre te conocí, y antes que nacieses te santifiqué, te di por profeta a las naciones.", ref: "Jeremías 1:5" },
        ],
        clave: "El profeta es llamado y enviado por Dios.",
        preguntas: [
          { p: "¿Qué respondió Isaías a la voz del Señor?", ops: ["Heme aquí, envíame a mí", "Envía a otro", "No sé hablar", "Mañana iré"], ok: 0, por: "Isaías 6:8." },
          { p: "¿Desde cuándo conocía Dios a Jeremías?", ops: ["Antes de formarlo en el vientre", "Desde que fue sacerdote", "Desde que el rey lo llamó", "Desde su vejez"], ok: 0, por: "Jeremías 1:5." },
        ],
      },
      {
        id: "escuchar",
        titulo: "Habla, porque tu siervo oye",
        lectura: [
          "Samuel era un niño que servía en el tabernáculo cuando Dios lo llamó por su nombre. Aprendió a responder: «Habla, porque tu siervo oye».",
          "Años después, Samuel enseñó al rey Saúl que obedecer a Dios vale más que muchos sacrificios.",
        ],
        versos: [
          { text: "Y vino Jehová y se paró, y llamó como las otras veces: ¡Samuel, Samuel! Entonces Samuel dijo: Habla, porque tu siervo oye.", ref: "1 Samuel 3:10" },
          { text: "Y Samuel dijo: ¿Se complace Jehová tanto en los holocaustos y víctimas, como en que se obedezca a las palabras de Jehová? Ciertamente el obedecer es mejor que los sacrificios, y el prestar atención que la grosura de los carneros.", ref: "1 Samuel 15:22" },
        ],
        clave: "Escuchar y obedecer es mejor que los sacrificios.",
        preguntas: [
          { p: "¿Qué dijo Samuel cuando Dios lo llamó?", ops: ["Habla, porque tu siervo oye", "¿Quién eres?", "Déjame dormir", "Llama a otro"], ok: 0, por: "1 Samuel 3:10." },
          { p: "Según 1 Samuel 15:22, ¿qué es mejor que los sacrificios?", ops: ["Obedecer", "Dar más ofrendas", "Construir altares", "Tener muchos carneros"], ok: 0, por: "«Ciertamente el obedecer es mejor que los sacrificios»." },
        ],
      },
      {
        id: "palabras",
        titulo: "Las palabras de Dios en su boca",
        lectura: [
          "El profeta no habla por su cuenta: Dios pone sus palabras en su boca.",
          "Por eso la profecía verdadera no nace de la voluntad humana: los santos hombres de Dios hablaron inspirados por el Espíritu Santo.",
        ],
        versos: [
          { text: "Y extendió Jehová su mano y tocó mi boca, y me dijo Jehová: He aquí he puesto mis palabras en tu boca.", ref: "Jeremías 1:9" },
          { text: "porque nunca la profecía fue traída por voluntad humana, sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo.", ref: "2 Pedro 1:21" },
        ],
        clave: "El profeta dice lo que Dios dice, no lo que él quiere.",
        preguntas: [
          { p: "¿Qué hizo Jehová con la boca de Jeremías?", ops: ["La tocó y puso sus palabras en ella", "La cerró para siempre", "La llenó de miel", "La lavó con agua"], ok: 0, por: "Jeremías 1:9." },
          { p: "¿Cómo hablaban los santos hombres de Dios según 2 Pedro 1:21?", ops: ["Inspirados por el Espíritu Santo", "Por su propia voluntad", "Por orden del rey", "Mirando las estrellas"], ok: 0, por: "2 Pedro 1:21." },
        ],
      },
      {
        id: "hijos-profetas",
        titulo: "Los hijos de los profetas",
        lectura: [
          "En tiempos de Eliseo había grupos de «hijos de los profetas» que vivían y aprendían juntos con su maestro.",
          "Cuando el lugar les quedó chico, construyeron uno nuevo con sus propias manos. Así es la escuela de los profetas de Jerusalén: se aprende juntos.",
        ],
        versos: [
          { text: "Los hijos de los profetas dijeron a Eliseo: He aquí, el lugar en que moramos contigo nos es estrecho. Vamos ahora al Jordán, y tomemos de allí cada uno una viga, y hagamos allí lugar en que habitemos. Y él dijo: Andad.", ref: "2 Reyes 6:1-2" },
          { text: "Porque no hará nada Jehová el Señor, sin que revele su secreto a sus siervos los profetas.", ref: "Amós 3:7" },
        ],
        clave: "Los profetas aprendían juntos, con un maestro.",
        preguntas: [
          { p: "¿Qué le dijeron los hijos de los profetas a Eliseo?", ops: ["Que el lugar donde vivían les era estrecho", "Que querían ser reyes", "Que tenían hambre", "Que se iban a Egipto"], ok: 0, por: "2 Reyes 6:1." },
          { p: "Según Amós 3:7, ¿a quiénes revela Dios su secreto?", ops: ["A sus siervos los profetas", "A los reyes", "A los sabios de Babilonia", "A nadie"], ok: 0, por: "Amós 3:7." },
        ],
      },
    ],
  },
  {
    id: "rey-justo",
    camino: "realeza",
    nivel: 1,
    titulo: "El rey según el corazón de Dios",
    resumen: "La ley en las manos del rey, un corazón entendido, el ejemplo de Ezequías y gobernar con justicia y misericordia.",
    icono: "👑",
    abre: "Es el primer estudio del palacio del rey.",
    secciones: [
      {
        id: "ley",
        titulo: "La ley en las manos del rey",
        lectura: [
          "Dios mandó que el rey de Israel escribiera para sí una copia de la ley y la leyera todos los días de su vida.",
          "Un buen rey gobierna con la Palabra en la mano, no según su capricho.",
        ],
        versos: [
          { text: "Y cuando se siente sobre el trono de su reino, entonces escribirá para sí en un libro una copia de esta ley, del original que está al cuidado de los sacerdotes levitas; y lo tendrá consigo, y leerá en él todos los días de su vida, para que aprenda a temer a Jehová su Dios, para guardar todas las palabras de esta ley y estos estatutos, para ponerlos por obra;", ref: "Deuteronomio 17:18-19" },
        ],
        clave: "El rey se sujeta a la Palabra de Dios.",
        preguntas: [
          { p: "¿Qué debía escribir el rey al sentarse en el trono?", ops: ["Una copia de la ley", "Una carta a los reyes vecinos", "La lista de sus riquezas", "Un canto de victoria"], ok: 0, por: "Deuteronomio 17:18." },
          { p: "¿Cada cuánto debía leer el rey la ley?", ops: ["Todos los días de su vida", "Una vez al año", "Solo en las fiestas", "Cuando había guerra"], ok: 0, por: "Deuteronomio 17:19." },
        ],
      },
      {
        id: "entendido",
        titulo: "Un corazón entendido",
        lectura: [
          "Cuando Dios le preguntó a Salomón qué quería, no pidió riquezas ni larga vida: pidió un corazón entendido para juzgar al pueblo.",
          "Juzgar con verdad y defender al pobre afirma el trono del rey.",
        ],
        versos: [
          { text: "Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo; porque ¿quién podrá gobernar este tu pueblo tan grande?", ref: "1 Reyes 3:9" },
          { text: "Del rey que juzga con verdad a los pobres, El trono será firme para siempre.", ref: "Proverbios 29:14" },
        ],
        clave: "El rey sabio pide entendimiento para servir al pueblo.",
        preguntas: [
          { p: "¿Qué le pidió Salomón a Dios?", ops: ["Corazón entendido para juzgar al pueblo", "Riquezas y fama", "La muerte de sus enemigos", "Un palacio más grande"], ok: 0, por: "1 Reyes 3:9." },
          { p: "Según Proverbios 29:14, ¿qué rey tiene el trono firme?", ops: ["El que juzga con verdad a los pobres", "El más rico", "El que tiene más soldados", "El más joven"], ok: 0, por: "Proverbios 29:14." },
        ],
      },
      {
        id: "ezequias",
        titulo: "Ezequías hizo lo recto",
        lectura: [
          "Ezequías, el rey de nuestro juego, hizo lo recto ante Dios: abrió el templo, restauró el servicio y llamó al pueblo a la Pascua.",
          "Cuando vino el rey de Asiria, Ezequías animó al pueblo a confiar en Dios, y el pueblo confió en sus palabras.",
        ],
        versos: [
          { text: "E hizo lo recto ante los ojos de Jehová, conforme a todas las cosas que había hecho David su padre.", ref: "2 Crónicas 29:2" },
          { text: "Esforzaos y animaos; no temáis, ni tengáis miedo del rey de Asiria, ni de toda la multitud que con él viene; porque más hay con nosotros que con él. Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios para ayudarnos, y pelear nuestras batallas. Y el pueblo tuvo confianza en las palabras de Ezequías rey de Judá.", ref: "2 Crónicas 32:7-8" },
        ],
        clave: "Un buen rey guía al pueblo a confiar en Dios.",
        preguntas: [
          { p: "¿Cómo hizo las cosas Ezequías ante los ojos de Jehová?", ops: ["Hizo lo recto", "Hizo lo malo", "Dejó todo igual", "Siguió a los reyes de Asiria"], ok: 0, por: "2 Crónicas 29:2." },
          { p: "¿Quién dijo Ezequías que estaba con ellos contra el rey de Asiria?", ops: ["Jehová nuestro Dios", "Un ejército de Egipto", "Unos muros muy altos", "Mucho oro"], ok: 0, por: "2 Crónicas 32:8." },
        ],
      },
      {
        id: "justicia",
        titulo: "Justicia, misericordia y humildad",
        lectura: [
          "Dios no le pide al rey solo victorias: le pide hacer justicia, amar misericordia y humillarse ante Él.",
          "La misericordia y la verdad guardan al rey, y su trono se sostiene con clemencia.",
        ],
        versos: [
          { text: "Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.", ref: "Miqueas 6:8" },
          { text: "Misericordia y verdad guardan al rey, Y con clemencia se sustenta su trono.", ref: "Proverbios 20:28" },
        ],
        clave: "Gobernar es servir con justicia y misericordia.",
        preguntas: [
          { p: "¿Qué pide Jehová según Miqueas 6:8?", ops: ["Hacer justicia, amar misericordia y humillarse ante Dios", "Ganar todas las guerras", "Construir templos de oro", "Ofrecer mil holocaustos"], ok: 0, por: "Miqueas 6:8." },
          { p: "¿Qué guardan al rey según Proverbios 20:28?", ops: ["Misericordia y verdad", "Sus soldados", "Sus riquezas", "Sus caballos"], ok: 0, por: "Proverbios 20:28." },
        ],
      },
    ],
  },
  {
    id: "fiestas",
    camino: "comun",
    nivel: 1,
    titulo: "Las fiestas solemnes de Jehová",
    resumen: "Las fiestas de Levítico 23 que se celebran en Jerusalén en línea, y lo que anuncian de Cristo.",
    icono: "🎺",
    secciones: [
      {
        id: "pascua",
        titulo: "Pascua y panes sin levadura",
        lectura: [
          "La Pascua recordaba la noche en que Dios sacó a Israel de Egipto. Al día siguiente empezaba la fiesta de los panes sin levadura, siete días.",
          "El apóstol Pablo enseña que nuestra Pascua es Cristo, sacrificado por nosotros.",
        ],
        versos: [
          { text: "En el mes primero, a los catorce del mes, entre las dos tardes, pascua es de Jehová.", ref: "Levítico 23:5" },
          { text: "Y a los quince días de este mes es la fiesta solemne de los panes sin levadura a Jehová; siete días comeréis panes sin levadura.", ref: "Levítico 23:6" },
          { text: "Limpiaos, pues, de la vieja levadura, para que seáis nueva masa, sin levadura como sois; porque nuestra pascua, que es Cristo, ya fue sacrificada por nosotros.", ref: "1 Corintios 5:7" },
        ],
        clave: "La Pascua anuncia a Cristo, el Cordero sacrificado.",
        preguntas: [
          { p: "¿Qué día del mes primero era la Pascua?", ops: ["El día catorce", "El día primero", "El día diez", "El día veinte"], ok: 0, por: "Levítico 23:5." },
          { p: "Según 1 Corintios 5:7, ¿quién es nuestra pascua?", ops: ["Cristo", "Moisés", "El cordero de Abel", "El rey David"], ok: 0, por: "1 Corintios 5:7." },
        ],
      },
      {
        id: "primicias",
        titulo: "Primicias y Pentecostés",
        lectura: [
          "Al cosechar, el pueblo traía al sacerdote la primera gavilla: lo primero era para Dios.",
          "Cincuenta días después se celebraba Pentecostés con el grano nuevo. En ese día, siglos después, los discípulos estaban unánimes juntos y vino el Espíritu Santo.",
        ],
        versos: [
          { text: "Habla a los hijos de Israel y diles: Cuando hayáis entrado en la tierra que yo os doy, y seguéis su mies, traeréis al sacerdote una gavilla por primicia de los primeros frutos de vuestra siega.", ref: "Levítico 23:10" },
          { text: "Hasta el día siguiente del séptimo día de reposo contaréis cincuenta días; entonces ofreceréis el nuevo grano a Jehová.", ref: "Levítico 23:16" },
          { text: "Cuando llegó el día de Pentecostés, estaban todos unánimes juntos.", ref: "Hechos 2:1" },
        ],
        clave: "Lo primero es para Dios.",
        preguntas: [
          { p: "¿Qué llevaban al sacerdote en las primicias?", ops: ["Una gavilla de los primeros frutos", "Un cordero", "Oro", "Incienso"], ok: 0, por: "Levítico 23:10." },
          { p: "¿Cuántos días se contaban hasta Pentecostés?", ops: ["Cincuenta", "Cuarenta", "Siete", "Doce"], ok: 0, por: "Levítico 23:16." },
        ],
      },
      {
        id: "septimo",
        titulo: "Trompetas, Expiación y Tabernáculos",
        lectura: [
          "En el mes séptimo había tres fiestas: el primer día, las trompetas; el día diez, la Expiación; y desde el día quince, siete días en tabernáculos de ramas.",
          "Los tabernáculos recordaban cómo Dios hizo habitar a su pueblo en tiendas al sacarlo de Egipto.",
        ],
        versos: [
          { text: "Habla a los hijos de Israel y diles: En el mes séptimo, al primero del mes tendréis día de reposo, una conmemoración al son de trompetas, y una santa convocación.", ref: "Levítico 23:24" },
          { text: "A los diez días de este mes séptimo será el día de expiación; tendréis santa convocación, y afligiréis vuestras almas, y ofreceréis ofrenda encendida a Jehová.", ref: "Levítico 23:27" },
          { text: "En tabernáculos habitaréis siete días; todo natural de Israel habitará en tabernáculos, para que sepan vuestros descendientes que en tabernáculos hice yo habitar a los hijos de Israel cuando los saqué de la tierra de Egipto. Yo Jehová vuestro Dios.", ref: "Levítico 23:42-43" },
        ],
        clave: "Las fiestas del mes séptimo llaman a recordar, arrepentirse y agradecer.",
        preguntas: [
          { p: "¿Dónde habitaba el pueblo en la fiesta de los tabernáculos?", ops: ["En tabernáculos, siete días", "En el templo", "En el palacio", "En cuevas"], ok: 0, por: "Levítico 23:42." },
          { p: "¿Qué se tocaba el primer día del mes séptimo?", ops: ["Trompetas", "Arpas", "Címbalos", "Flautas"], ok: 0, por: "Levítico 23:24." },
        ],
      },
    ],
  },
];

export function estudioPorId(id: string): Estudio | undefined {
  return ESTUDIOS.find((e) => e.id === id);
}

// ---------------------------------------------------------------- el orden de las opciones
/**
 * El orden en que se muestran las opciones de una pregunta: `orden[i]` es la opción original que va en
 * el lugar i. Con la misma semilla sale siempre el mismo orden (así, pedirla otra vez no lo cambia), y
 * entre semillas distintas la buena cae en cualquier lugar por igual.
 *
 * La práctica de las secciones tiene la buena casi siempre primera (41 de 46): todo lo que muestre
 * preguntas de práctica (la sección, las reuniones en las casas) las revuelve con esto.
 */
export function ordenDeOpciones(n: number, semilla: number): number[] {
  const out = Array.from({ length: Math.max(0, Math.floor(n)) }, (_, i) => i);
  // se mezcla la semilla antes, para que semillas seguidas (1, 2, 3…) no den órdenes parecidos
  let x = (Math.imul((semilla | 0) ^ 0x5bd1e995, 2654435761) ^ 0x9e3779b9) >>> 0 || 1;
  const paso = () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    x >>>= 0;
    return x;
  };
  paso();
  paso();
  for (let i = out.length - 1; i > 0; i--) {
    const j = paso() % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** La pregunta de práctica con sus opciones en el orden de la semilla y la buena en su nuevo lugar. */
export function opcionesEnOrden(q: PreguntaPractica, semilla: number): { ops: string[]; ok: number; orden: number[] } {
  const orden = ordenDeOpciones(q.ops.length, semilla);
  return { ops: orden.map((k) => q.ops[k]), ok: orden.indexOf(q.ok), orden };
}

// ---------------------------------------------------------------- respuestas de la API
export type IntentoExamen = { aciertos: number; de: number; fecha: string };
export type MiEstudio = {
  id: string;
  secciones: string[];
  aprobado: string | null;
  mejor: number;
  puedeExamen: boolean;
  esperaExamen: number;
  /** Intentos usados (de EXAMEN_INTENTOS). */
  intentos: number;
  /** Sacó 6 de 6. */
  perfecto: boolean;
  historial: IntentoExamen[];
};
export type EstudiosEstado = { mios: MiEstudio[]; aprobados: number };
export type PreguntaExamen = { id: string; pregunta: string; opciones: string[] };
export type ExamenResultado = {
  aciertos: number;
  de: number;
  aprobado: boolean;
  primeraVez: boolean;
  premio: number;
  correcciones: { id: string; correcta: string; explica: string; ref: string; bien: boolean }[];
  estado: EstudiosEstado;
};
/** Lo que ve la comunidad de una persona (con cualquiera de sus personajes): sus estudios y su registro. */
export type EstudiosDe = {
  personajeId: number;
  nombre: string;
  aprobados: { id: string; titulo: string; icono: string; fecha: string }[];
  /** El registro de cada examen dado: la mejor nota, los intentos y si fue perfecto. */
  registros: { id: string; titulo: string; icono: string; mejor: number; de: number; intentos: number; aprobado: boolean; perfecto: boolean }[];
};
