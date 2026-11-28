/**
 * Las prácticas de la materia `evangelismo-misiones-5` (especialidad Evangelismo y misiones · Plantación de iglesias).
 * Hechas solo con lo que dice cada lección (server/academia/contenido/evangelismo-misiones-5.ts), con la guía de
 * docs/academia-practicas.md. No repite las de «Evangelismo personal» (Nivel 2) ni las de «Evangelismo y consolidación»
 * (Nivel 3): aquí se planta una iglesia, desde el porqué hasta la iglesia hija.
 *
 * Cuidado doctrinal: las lecciones 2 y 5 marcan como punto de la declaración de fe por confirmar quién puede ejercer cada
 * cargo de la iglesia. Ninguna actividad pregunta por eso: se practican el carácter y la tarea del que planta (lección 2)
 * y la tarea de formar líderes (lección 5). De Tito 1:5 solo se pregunta lo que dice la cita (para qué dejó Pablo a Tito
 * en Creta), sin hablar de quién puede ser anciano; de Efesios 4:11-12, solo lo que la lección afirma (Cristo dio
 * ministerios para preparar a los santos para la obra del ministerio), sin nombrar esos ministerios. Del bautismo de
 * Lidia con su familia y del pan partido en las casas se dice solo lo que dice la lección, sin sacar conclusiones.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_EVANGELISMO_MISIONES_5: PracticasMateria = {
  materia: "evangelismo-misiones-5",
  mision: {
    titulo: "Una iglesia nueva para el barrio",
    intro: "Tu iglesia decidió plantar una iglesia en un barrio de tu ciudad que todavía no tiene una, y te pidió que formes parte del equipo. Vas a recorrer todo el camino: saber por qué se planta y sobre qué fundamento, preparar al plantador y a su equipo, conocer el barrio y orar por él, empezar en una casa, formar líderes del lugar y soñar desde el primer día con la iglesia hija que un día nacerá de ella. Repasa las seis lecciones para que cada paso salga bien.",
    cierre: "Ya sabes plantar una iglesia como en el Nuevo Testamento: sobre Cristo, el único fundamento; con un llamado confirmado y un equipo; conociendo el lugar y orando por él; empezando en las casas; formando líderes para que la iglesia no dependa del plantador; y enseñando desde el principio que existe para la misión. Cristo sigue edificando su iglesia, y te invita a sembrar con él.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Por qué plantar iglesias
    "evangelismo-misiones-5-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "En el Nuevo Testamento, ¿el evangelio producía solo creyentes sueltos?", reverso: "No: producía iglesias.", apoyo: "En el Nuevo Testamento, el evangelio no solo producía creyentes sueltos: producía iglesias" },
              { frente: "¿Qué es plantar una iglesia?", reverso: "Formar una comunidad de discípulos en un lugar donde todavía no la hay.", apoyo: "Plantar una iglesia es formar una comunidad de discípulos en un lugar donde todavía no la hay" },
              { frente: "¿Qué necesitan los nuevos creyentes para crecer?", reverso: "Una familia donde crecer.", apoyo: "Porque los nuevos creyentes necesitan una familia donde crecer" },
              { frente: "¿A quiénes puede alcanzar una iglesia cercana?", reverso: "A personas que una iglesia lejana no alcanza.", apoyo: "Porque una iglesia cercana puede alcanzar a personas que una iglesia lejana no alcanza" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo se extendió el evangelio en el Nuevo Testamento?", reverso: "En cada ciudad nacían iglesias.", apoyo: "Porque así se extendió el evangelio en el Nuevo Testamento: en cada ciudad nacían iglesias" },
              { frente: "¿Adónde puede llegar una iglesia nueva?", reverso: "A barrios y grupos que todavía no tienen una.", apoyo: "Porque una iglesia nueva puede llegar a barrios y grupos que todavía no tienen una" },
              { frente: "Cristo sigue edificando su iglesia. ¿A qué te invita?", reverso: "A sembrar con él.", apoyo: "Cristo sigue edificando su iglesia, y te invita a sembrar con él" },
              { frente: "¿Cuál es el versículo de memoria de esta materia?", reverso: "Mateo 16:18: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella».", apoyo: "Jesús dijo: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella»" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada uno con la razón para plantar iglesias que da la lección.",
            pares: [
              ["En el Nuevo Testamento", "El evangelio se extendió así: en cada ciudad nacían iglesias"],
              ["Una iglesia cercana", "Alcanza a personas que una iglesia lejana no alcanza"],
              ["Los nuevos creyentes", "Necesitan una familia donde crecer"],
              ["Los barrios y grupos sin iglesia", "Una iglesia nueva puede llegar a ellos"],
            ],
            apoyo: "Porque una iglesia cercana puede alcanzar a personas que una iglesia lejana no alcanza",
            explica: "Se plantan iglesias porque así se extendió el evangelio en el Nuevo Testamento, porque una iglesia cercana alcanza a quien una lejana no alcanza, porque los nuevos creyentes necesitan una familia donde crecer y porque una iglesia nueva llega a barrios y grupos que todavía no tienen una.",
          },
          {
            consigna: "¿Qué razón para plantar una iglesia muestra cada caso? Une cada caso con su razón.",
            pares: [
              ["Una colonia nueva donde todavía no hay ninguna iglesia", "Una iglesia nueva llega a barrios que todavía no tienen una"],
              ["Una familia que vive muy lejos de la única iglesia", "Una iglesia cercana alcanza a quien una lejana no alcanza"],
              ["Un matrimonio que acaba de creer y no tiene con quién crecer", "Los nuevos creyentes necesitan una familia donde crecer"],
              ["Las ciudades adonde llegaba el evangelio en el Nuevo Testamento", "En cada ciudad nacían iglesias"],
            ],
            apoyo: "Porque los nuevos creyentes necesitan una familia donde crecer",
            explica: "Cada caso muestra una razón de la lección: una iglesia nueva llega a los barrios que no tienen una, una iglesia cercana alcanza a quien una lejana no alcanza, los nuevos creyentes necesitan una familia y, en el Nuevo Testamento, en cada ciudad nacían iglesias.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Quién hace cada parte en la obra de la iglesia? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "cristo", texto: "Cristo", x: 50, y: 10 },
              { id: "iglesia", texto: "La iglesia", x: 50, y: 50 },
              { id: "hades", texto: "Las puertas del Hades", x: 85, y: 22 },
              { id: "plantador", texto: "El plantador", x: 15, y: 88 },
              { id: "dios", texto: "Dios", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "cristo", a: "iglesia", relacion: "la edifica" },
              { de: "hades", a: "iglesia", relacion: "no prevalecerán contra ella" },
              { de: "plantador", a: "iglesia", relacion: "la siembra y la cuida" },
              { de: "dios", a: "iglesia", relacion: "le da el crecimiento" },
            ],
            distractores: ["la detiene", "le pone otro fundamento"],
            apoyo: "La iglesia es obra de Cristo, y nada puede detenerla",
            ref: "Mateo 16:18; 1 Corintios 3:6-7",
            explica: "Cristo edifica su iglesia, y las puertas del Hades no prevalecerán contra ella. El plantador siembra y cuida, pero el crecimiento viene de Dios.",
          },
          {
            consigna: "¿Qué enseña Pablo sobre el fruto en 1 Corintios 3? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pablo", texto: "Pablo", x: 12, y: 15 },
              { id: "apolos", texto: "Apolos", x: 50, y: 15 },
              { id: "dios", texto: "Dios", x: 88, y: 15 },
              { id: "iglesia", texto: "La iglesia", x: 50, y: 58 },
              { id: "cristo", texto: "Jesucristo", x: 50, y: 92 },
            ],
            enlaces: [
              { de: "pablo", a: "iglesia", relacion: "la plantó" },
              { de: "apolos", a: "iglesia", relacion: "la regó" },
              { de: "dios", a: "iglesia", relacion: "le dio el crecimiento" },
              { de: "iglesia", a: "cristo", relacion: "se planta sobre" },
            ],
            distractores: ["la detuvo", "le puso otro fundamento"],
            apoyo: "Pablo explica de dónde viene el fruto",
            ref: "1 Corintios 3:6-11",
            explica: "«Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios». Y nadie puede poner otro fundamento: una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa de dónde viene el fruto de una iglesia nueva.",
            texto: "El plantador [[siembra]] y [[cuida]], pero el crecimiento viene de [[Dios]].",
            distractores: ["cosecha", "olvida", "nosotros"],
            errores: {
              cosecha: "El plantador siembra: «Yo planté, Apolos regó».",
              olvida: "El plantador siembra y cuida lo que sembró.",
              nosotros: "El crecimiento no lo da el plantador: lo ha dado Dios.",
            },
            apoyo: "El plantador siembra y cuida, pero el crecimiento viene de Dios",
            ref: "1 Corintios 3:6-7",
            explica: "Pablo explica de dónde viene el fruto: el plantador siembra y cuida, pero el crecimiento lo ha dado Dios.",
          },
          {
            consigna: "Completa lo que enseña la lección sobre la iglesia.",
            texto: "La iglesia es [[obra]] de [[Cristo]], y nada puede detenerla.",
            distractores: ["negocio", "hombres", "Pablo"],
            errores: {
              negocio: "La iglesia es obra de Cristo.",
              hombres: "La iglesia es obra de Cristo, y no se planta sobre una persona.",
              Pablo: "Pablo plantó, pero la iglesia es obra de Cristo, y el crecimiento lo ha dado Dios.",
            },
            apoyo: "La iglesia es obra de Cristo, y nada puede detenerla",
            ref: "Mateo 16:18",
            explica: "Jesús dijo: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella». La iglesia es obra de Cristo, y nada puede detenerla.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            ref: "1 Corintios 3:11",
            consigna: "¿Cuál es el único fundamento que está puesto? Toca la palabra que lo dice.",
            texto: "nadie puede poner otro fundamento que el que está puesto, el cual es [[Jesucristo]]",
            apoyo: "Una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona",
            explica: "«nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo»: una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona.",
          },
          {
            ref: "1 Corintios 3:11",
            consigna: "Según Pablo, ¿qué es lo que nadie puede poner? Toca las palabras que lo dicen.",
            texto: "nadie puede poner [[otro fundamento]] que el que está puesto, el cual es Jesucristo",
            apoyo: "El fundamento no lo pone el plantador",
            explica: "El fundamento no lo pone el plantador: nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano del equipo te dice: Si el pastor Ramiro dirige la iglesia nueva, todos vendrán por él; es tan carismático que crecerá sola.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que una iglesia se planta sobre Cristo y su evangelio, no sobre una persona.", bien: true, explica: "Es lo que enseña la lección: el único fundamento es Jesucristo, y el crecimiento lo da Dios." },
              { texto: "Que tiene razón: una iglesia nueva crece por el carisma de quien la dirige.", explica: "El plantador siembra y cuida, pero el crecimiento viene de Dios." },
              { texto: "Que mejor busquen a un pastor todavía más conocido, para que venga más gente.", explica: "Una iglesia no se planta sobre una persona, por conocida que sea, sino sobre Cristo y su evangelio." },
              { texto: "Que el fundamento lo pone el plantador, y por eso hay que escogerlo muy bien.", explica: "El fundamento no lo pone el plantador: el que está puesto es Jesucristo." },
            ],
            apoyo: "Una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona",
            ref: "1 Corintios 3:11",
            explica: "El fundamento no lo pone el plantador: «nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo».",
          },
          {
            caso: "Una líder de la iglesia madre te escribe: La iglesia nueva llevará el nombre de su fundador, y todo girará alrededor de él para que no se pierda.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el único fundamento es Jesucristo, y la iglesia se planta sobre él.", bien: true, explica: "Nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo." },
              { texto: "Que está bien, porque el que planta es el fundamento de la iglesia nueva.", explica: "El fundamento no lo pone el plantador: el fundamento es Jesucristo." },
              { texto: "Que conviene, porque la gente sigue más a una persona que a un mensaje.", explica: "Una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona." },
              { texto: "Que lo hagan así, y que cambien el nombre cuando el fundador ya no esté.", explica: "No es cuestión del nombre: una iglesia no se planta sobre una persona, sino sobre Cristo." },
            ],
            apoyo: "El fundamento no lo pone el plantador",
            ref: "1 Corintios 3:10-11",
            explica: "Una iglesia se planta sobre Cristo y su evangelio, y no sobre una persona: el único fundamento es Jesucristo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Porque así se extendió el evangelio en el Nuevo Testamento: en cada ciudad nacían iglesias",
            ref: "1 Corintios 3:6",
            clave: {
              id: "pr-evangelismo-misiones-5-1-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se extendió el evangelio en el Nuevo Testamento, y por qué conviene plantar hoy una iglesia en un barrio que no tiene una?",
              ideas: [
                { id: "ciudades", peso: 50, texto: "En el Nuevo Testamento, el evangelio producía iglesias: en cada ciudad nacían iglesias.", formas: ["cada ciudad", "en (las|todas|muchas) (ciudades|ciudad)", "nac* iglesias", "produc* iglesias", "(formaba|formaban|surgian|surgieron|nacieron|creaba|creaban|levantaba|levantaban|plantaba|plantaban|formaron) iglesias", "comunidad* de discipulos"] },
                { id: "cerca", peso: 50, texto: "Una iglesia cercana alcanza a personas que una iglesia lejana no alcanza, y los nuevos creyentes necesitan una familia donde crecer.", formas: ["iglesia cercana", "cercana", "(esta|este|quede|queda|estar|tener|tenga|tengan) cerca", "cerca de (la|su|sus|ellos|ellas|casa|donde)", "iglesia lejana", "familia donde crecer", "necesit* una familia", "(una|su|nueva) familia (para|donde|en) crecer"] },
              ],
              modelo: "En el Nuevo Testamento el evangelio producía iglesias: en cada ciudad nacían iglesias. Hoy conviene plantar en ese barrio porque una iglesia cercana alcanza a personas que una lejana no alcanza, y los nuevos creyentes necesitan una familia donde crecer.",
            },
          },
          {
            apoyo: "Porque una iglesia nueva puede llegar a barrios y grupos que todavía no tienen una",
            ref: "Mateo 16:18",
            clave: {
              id: "pr-evangelismo-misiones-5-1-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que basta con una iglesia grande en el centro de la ciudad. ¿Qué le respondes con lo que enseña la lección?",
              ideas: [
                { id: "cercana", peso: 50, texto: "Una iglesia cercana puede alcanzar a personas que una iglesia lejana no alcanza.", formas: ["iglesia cercana", "cercana", "(esta|este|quede|queda|estar|tener|tenga|tengan) cerca", "cerca de (la|su|sus|ellos|ellas|casa|donde)", "iglesia lejana", "lejana"] },
                { id: "barrios", peso: 50, texto: "Una iglesia nueva puede llegar a barrios y grupos que todavía no tienen una.", formas: ["(barrios|barrio|grupos|colonias) que (todavia|aun) no (tienen|tiene)", "todavia no (tienen|tiene) (una|iglesia)", "(barrios|grupos|colonias) sin iglesia", "lleg* a (barrios|grupos|colonias)", "iglesia nueva (puede|pueda|podria) llegar"] },
              ],
              modelo: "Le respondo que una iglesia cercana puede alcanzar a personas que una iglesia lejana no alcanza, y que una iglesia nueva puede llegar a barrios y grupos que todavía no tienen una.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El plantador y su equipo
    "evangelismo-misiones-5-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por quién fueron apartados Bernabé y Saulo, y quién los envió?", reverso: "Los apartó el Espíritu Santo, y los envió su iglesia.", apoyo: "Bernabé y Saulo fueron apartados por el Espíritu Santo y enviados por su iglesia" },
              { frente: "¿Con qué dos cosas va el plantador?", reverso: "Con un llamado y con el respaldo de una iglesia.", apoyo: "El plantador va con un llamado y con el respaldo de una iglesia" },
              { frente: "¿Qué importa antes que los dones del plantador?", reverso: "Su vida: su relación con Dios, su familia, su integridad y su perseverancia.", apoyo: "Antes que sus dones, importa la vida del plantador: su relación con Dios, su familia, su integridad y su perseverancia" },
              { frente: "Las cualidades que Pablo pide a los que guían la iglesia, ¿para quién valen también?", reverso: "Para el que la planta.", apoyo: "valen también para el que la planta" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo llamó Pablo a Priscila y a Aquila?", reverso: "«mis colaboradores en Cristo Jesús».", apoyo: "Pablo llamó a Priscila y a Aquila «mis colaboradores en Cristo Jesús»" },
              { frente: "¿Cuál era el oficio de Priscila y Aquila, con quienes trabajó Pablo?", reverso: "Hacer tiendas.", apoyo: "En Corinto, Pablo trabajó con ellos, porque «el oficio de ellos era hacer tiendas»" },
              { frente: "¿Cuánto tiempo se quedó Pablo en Corinto?", reverso: "Un año y seis meses, enseñándoles la palabra de Dios.", apoyo: "Pablo se quedó allí «un año y seis meses, enseñándoles la palabra de Dios»" },
              { frente: "Si nadie planta solo, ¿quién forma los equipos?", reverso: "Dios.", apoyo: "Nadie planta solo: Dios forma equipos" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así va el plantador, según la lección, o así no va? Lleva cada frase a su grupo.",
            grupos: ["Así va el plantador", "Así no va el plantador"],
            frases: [
              { texto: "Con un llamado confirmado", grupo: 0 },
              { texto: "Enviado y respaldado por su iglesia", grupo: 0 },
              { texto: "Cuidando su vida con Dios y a su familia", grupo: 0 },
              { texto: "Con integridad y con perseverancia", grupo: 0 },
              { texto: "Como una persona brillante que no necesita a nadie", grupo: 1, explica: "Plantar una iglesia no es tarea de una sola persona brillante." },
              { texto: "Por su cuenta, sin una iglesia que lo envíe", grupo: 1 },
              { texto: "Confiando en sus dones más que en su vida", grupo: 1, explica: "Antes que sus dones, importa la vida del plantador." },
              { texto: "Dejando para después a su familia", grupo: 1 },
            ],
            apoyo: "El plantador va con un llamado confirmado y enviado por una iglesia, como Bernabé y Saulo",
            ref: "Hechos 13:2-3",
            explica: "El plantador va con un llamado confirmado y enviado por una iglesia; y antes que sus dones importa su vida: su relación con Dios, su familia, su integridad y su perseverancia.",
          },
          {
            consigna: "¿Muestra el carácter que la lección pide al plantador, o no lo muestra? Lleva cada frase a su grupo.",
            grupos: ["Así es el carácter del plantador", "Así no es el carácter del plantador"],
            frases: [
              { texto: "Ora y cuida cada día su relación con Dios", grupo: 0 },
              { texto: "Cuida a su familia mientras planta", grupo: 0 },
              { texto: "Dice la verdad aunque le cueste", grupo: 0, explica: "Es parte de su integridad." },
              { texto: "Sigue adelante aunque el grupo crezca despacio", grupo: 0, explica: "Es parte de su perseverancia: plantar una iglesia pide paciencia." },
              { texto: "Abandona la obra al primer problema", grupo: 1 },
              { texto: "Descuida a su familia por el proyecto", grupo: 1 },
              { texto: "Exagera los resultados para impresionar", grupo: 1, explica: "Eso va contra la integridad que se pide al plantador." },
              { texto: "Solo quiere mostrar lo bien que predica", grupo: 1 },
            ],
            apoyo: "Primero importa su carácter: su vida con Dios, su familia, su integridad y su perseverancia",
            explica: "Antes que sus dones importa la vida del plantador: su relación con Dios, su familia, su integridad y su perseverancia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El plantador va con un llamado y con el respaldo de una iglesia",
            ref: "Hechos 13:2-3",
            situacion: "Sientes el llamado a plantar una iglesia en un pueblo cercano que no tiene una, y quieres empezar este año.",
            escenas: [
              {
                id: "e1",
                narra: "Todavía no se lo has contado a nadie de tu iglesia.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lo hablas con tu iglesia, para que confirme el llamado y te envíe.", valor: 2, explica: "El plantador va con un llamado confirmado y con el respaldo de una iglesia, como Bernabé y Saulo.", siguiente: "e2" },
                  { texto: "Oras tú solo un tiempo más, y después ya se lo cuentas a la iglesia.", valor: 1, explica: "Orar es bueno, pero el llamado se confirma y el plantador va enviado por su iglesia.", siguiente: "e2" },
                  { texto: "Te vas por tu cuenta: si Dios te llamó, no necesitas a nadie más.", valor: 0, explica: "Bernabé y Saulo fueron apartados por el Espíritu Santo y enviados por su iglesia.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "A las pocas semanas en el pueblo te sientes solo, sin nadie que ore por ti ni te respalde.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Vuelves a tu iglesia y le pides que te respalde y te envíe.", valor: 2, explica: "El plantador va con un llamado y con el respaldo de una iglesia.", siguiente: "e2" },
                  { texto: "Sigues solo, aunque ya no tengas fuerzas ni a nadie a tu lado.", valor: 0, explica: "Nadie planta solo: Dios forma equipos, y la iglesia envía y respalda.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Tu iglesia confirma tu llamado y prepara tu envío.",
                pregunta: "¿Cómo te despide, como la iglesia de Bernabé y Saulo?",
                opciones: [
                  { texto: "Ayuna y ora, te impone las manos y te despide.", valor: 2, explica: "Así envió su iglesia a Bernabé y a Saulo: «habiendo ayunado y orado, les impusieron las manos y los despidieron»." },
                  { texto: "Te hace una fiesta de despedida, pero sin orar por ti.", valor: 1, explica: "Despedirte con cariño está bien, pero la iglesia de Bernabé y Saulo ayunó y oró antes de enviarlos." },
                  { texto: "Te deja ir sin despedirte, porque el llamado es tuyo.", valor: 0, explica: "El plantador va con el respaldo de una iglesia, que ora por él y lo envía." },
                ],
              },
              {
                id: "e3",
                narra: "Ya en el pueblo, un matrimonio creyente te ofrece trabajar contigo en la obra.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Los recibes como colaboradores: la obra se hace en equipo.", valor: 2, explica: "Pablo llamó a Priscila y a Aquila «mis colaboradores en Cristo Jesús»: la obra se hizo en equipo." },
                  { texto: "Les pides que solo oren por ti, para no complicar más la obra.", valor: 1, explica: "Su oración ayuda, pero la obra se hace en equipo, como Pablo con Priscila y Aquila." },
                  { texto: "Les dices que no: prefieres hacerlo todo tú, a tu manera.", valor: 0, explica: "Plantar una iglesia no es tarea de una sola persona brillante, sino de un equipo que trabaja junto." },
                ],
              },
            ],
          },
          {
            apoyo: "Nadie planta solo: Dios forma equipos",
            ref: "Romanos 16:3-5",
            situacion: "Eres parte del equipo de misiones de tu iglesia. Daniel, un joven de la iglesia, quiere plantar una iglesia en otra ciudad.",
            escenas: [
              {
                id: "e1",
                narra: "Daniel te dice: Voy a ir solo; un equipo solo me haría ir más lento.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que nadie planta solo: Dios forma equipos, como el de Pablo.", valor: 2, explica: "Pablo trabajó con Priscila y Aquila, sus colaboradores: la obra se hizo en equipo.", siguiente: "e2" },
                  { texto: "Que vaya solo al principio y busque a alguien después.", valor: 1, explica: "Es mejor que solo, pero plantar es tarea de un equipo que trabaja junto desde el principio.", siguiente: "e2" },
                  { texto: "Que tiene razón: alguien brillante trabaja mejor sin nadie al lado.", valor: 0, explica: "Plantar una iglesia no es tarea de una sola persona brillante.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Daniel decide irse solo y sin decirle nada a la iglesia.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Que lo hable con la iglesia, para ir con su respaldo y en equipo.", valor: 2, explica: "El plantador va con un llamado confirmado y enviado por una iglesia, como Bernabé y Saulo.", siguiente: "e2" },
                  { texto: "Que se vaya así: la iglesia no tiene nada que ver con su propio llamado.", valor: 0, explica: "Bernabé y Saulo fueron apartados por el Espíritu Santo y enviados por su iglesia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "La iglesia confirma el llamado de Daniel y de dos hermanos que irán con él.",
                pregunta: "¿Qué hace la iglesia antes de enviarlos?",
                opciones: [
                  { texto: "Ayuna y ora, les impone las manos y los despide.", valor: 2, explica: "Así lo hizo la iglesia de Bernabé y Saulo: «habiendo ayunado y orado, les impusieron las manos y los despidieron»." },
                  { texto: "Ora por ellos en el culto, pero sin despedirlos.", valor: 1, explica: "Orar por ellos está bien; la iglesia de Bernabé y Saulo también ayunó, les impuso las manos y los despidió." },
                  { texto: "Les da una lista de tareas y los deja ir sin orar.", valor: 0, explica: "La iglesia que envía ora por los que van: «habiendo ayunado y orado, les impusieron las manos»." },
                ],
              },
              {
                id: "e3",
                narra: "Ya en la ciudad, el equipo empieza a reunirse en la casa de una familia.",
                pregunta: "¿Qué muestra eso?",
                opciones: [
                  { texto: "Que la obra se hace en equipo y en las casas.", valor: 2, explica: "Pablo saludó a Priscila y a Aquila y «a la iglesia de su casa»: la obra se hizo en equipo y en las casas." },
                  { texto: "Que por ahora usan la casa mientras hallan un local.", valor: 1, explica: "Puede venir un local después, pero la obra del Nuevo Testamento se hizo en equipo y en las casas." },
                  { texto: "Que fracasaron, porque una iglesia no va en casas.", valor: 0, explica: "Pablo saludó «a la iglesia de su casa»: la obra se hizo en equipo y en las casas." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Hechos 13:3",
            consigna: "¿Qué hizo la iglesia antes de imponerles las manos a Bernabé y a Saulo? Toca las dos palabras que lo dicen.",
            texto: "habiendo [[ayunado]] y [[orado]], les impusieron las manos y los despidieron",
            apoyo: "El plantador va con un llamado y con el respaldo de una iglesia",
            explica: "La iglesia los envió «habiendo ayunado y orado»: les impusieron las manos y los despidieron. El plantador va con un llamado y con el respaldo de una iglesia.",
          },
          {
            ref: "Romanos 16:3",
            consigna: "¿Qué eran Priscila y Aquila para Pablo? Toca la palabra que lo dice.",
            texto: "mis [[colaboradores]] en Cristo Jesús",
            apoyo: "La obra se hizo en equipo y en las casas",
            explica: "Pablo llamó a Priscila y a Aquila «mis colaboradores en Cristo Jesús»: la obra se hizo en equipo y en las casas.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un plantador te dice: Me da vergüenza trabajar de albañil mientras planto la iglesia; no parece cosa de un siervo de Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que Pablo también hacía tiendas en Corinto mientras enseñaba.", bien: true, explica: "En Corinto, Pablo trabajó con Priscila y Aquila, porque «el oficio de ellos era hacer tiendas»." },
              { texto: "Que tiene razón: trabajar en un oficio no es digno de un plantador.", explica: "Muchos plantadores trabajan en un oficio mientras la iglesia crece, como Pablo en Corinto." },
              { texto: "Que deje la obra hasta que la iglesia nueva pueda pagarle un sueldo.", explica: "El plantador puede sostenerse con un oficio mientras la iglesia crece: no tiene que dejar la obra." },
              { texto: "Que esconda su trabajo, para que nadie en la iglesia piense mal de él.", explica: "No hay nada que esconder: Pablo trabajó en un oficio en Corinto." },
            ],
            apoyo: "Muchos plantadores trabajan en un oficio mientras la iglesia crece",
            ref: "Hechos 18:3-4",
            explica: "En Corinto, Pablo trabajó con Priscila y Aquila, porque «el oficio de ellos era hacer tiendas», y cada día de reposo discutía en la sinagoga.",
          },
          {
            caso: "Una pareja que va a plantar una iglesia te pregunta: ¿Podemos seguir con nuestra panadería mientras empezamos, o tenemos que cerrarla?",
            pregunta: "¿Qué les respondes?",
            opciones: [
              { texto: "Que pueden seguir: muchos plantadores trabajan en un oficio, como Pablo.", bien: true, explica: "El plantador puede sostenerse con un oficio, como Pablo en Corinto." },
              { texto: "Que tienen que cerrarla, porque quien planta no puede trabajar en otra cosa.", explica: "Muchos plantadores trabajan en un oficio mientras la iglesia crece." },
              { texto: "Que pueden seguir, pero sin dedicar ningún día a enseñar ni a la gente.", explica: "Pablo trabajaba, y cada día de reposo discutía en la sinagoga y enseñaba la palabra de Dios." },
              { texto: "Que deben dejarla, porque un oficio le quita valor al llamado de Dios.", explica: "Trabajar en un oficio no le quita valor al llamado: Pablo lo hizo en Corinto." },
            ],
            apoyo: "puede sostenerse con un oficio, como Pablo en Corinto",
            ref: "Hechos 18:3",
            explica: "Muchos plantadores trabajan en un oficio mientras la iglesia crece, como Pablo en Corinto, que hacía tiendas y cada día de reposo discutía en la sinagoga.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se sostuvo Pablo en Corinto.",
            texto: "Como Pablo en Corinto, el plantador puede sostenerse con un [[oficio]], como hacer [[tiendas]], y tener [[paciencia]] mientras la iglesia crece.",
            distractores: ["préstamo", "redes", "prisa"],
            errores: {
              "préstamo": "El plantador puede sostenerse con un oficio, como Pablo, que trabajaba haciendo tiendas.",
              redes: "El oficio de Priscila y Aquila, con quienes trabajó Pablo, era hacer tiendas.",
              prisa: "Plantar una iglesia pide paciencia: Pablo se quedó allí un año y seis meses.",
            },
            apoyo: "puede sostenerse con un oficio, como Pablo en Corinto",
            ref: "Hechos 18:3",
            explica: "En Corinto, Pablo trabajó con Priscila y Aquila, porque «el oficio de ellos era hacer tiendas». Muchos plantadores trabajan en un oficio mientras la iglesia crece, y plantar una iglesia pide paciencia.",
          },
          {
            consigna: "Completa lo que hacía Pablo en Corinto, además de trabajar.",
            texto: "En Corinto, Pablo trabajaba con Priscila y Aquila, y cada día de [[reposo]] discutía en la [[sinagoga]]; allí enseñó un año y seis [[meses]].",
            distractores: ["mercado", "plaza", "semanas"],
            errores: {
              mercado: "Pablo discutía en la sinagoga cada día de reposo.",
              plaza: "En Corinto discutía en la sinagoga; en Atenas lo hacía en la plaza.",
              semanas: "Pablo se quedó allí «un año y seis meses, enseñándoles la palabra de Dios».",
            },
            apoyo: "En Corinto, Pablo trabajó con ellos, porque «el oficio de ellos era hacer tiendas», y cada día de reposo discutía en la sinagoga",
            ref: "Hechos 18:4",
            explica: "Pablo trabajaba con Priscila y Aquila y cada día de reposo discutía en la sinagoga; se quedó allí «un año y seis meses, enseñándoles la palabra de Dios». Plantar una iglesia pide paciencia.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Antes que sus dones, importa la vida del plantador: su relación con Dios, su familia, su integridad y su perseverancia",
            ref: "Hechos 13:2-3",
            clave: {
              id: "pr-evangelismo-misiones-5-2-a7-1",
              tipo: "corta",
              pregunta: "¿Con qué va el plantador a su campo, y qué importa primero en él, antes que sus dones?",
              ideas: [
                { id: "llamado", peso: 50, texto: "Va con un llamado confirmado y con el respaldo de una iglesia que lo envía.", formas: ["llamado", "confirmad*", "confirm* (el|su|tu) llamado", "respald*", "enviado", "enviada", "lo (envia|envio|manda|mando)", "iglesia lo (envia|envio|manda|mando|respalda)"] },
                { id: "vida", peso: 50, texto: "Antes que sus dones importa su vida: su relación con Dios, su familia, su integridad y su perseverancia.", formas: ["relacion con dios", "vida con dios", "su familia", "integridad", "persever*", "caracter", "importa (su|la) vida"] },
              ],
              modelo: "El plantador va con un llamado confirmado y con el respaldo de una iglesia que lo envía. Antes que sus dones importa su vida: su relación con Dios, su familia, su integridad y su perseverancia.",
            },
          },
          {
            apoyo: "Plantar una iglesia no es tarea de una sola persona brillante, sino de un llamado confirmado y de un equipo que trabaja junto",
            ref: "Romanos 16:3-5",
            clave: {
              id: "pr-evangelismo-misiones-5-2-a7-2",
              tipo: "corta",
              pregunta: "Un joven te dice que, con los dones que tiene, ya está listo para plantar una iglesia él solo. ¿Qué le aconsejas según la lección?",
              ideas: [
                { id: "vida", peso: 50, texto: "Que antes que sus dones importa su vida: su relación con Dios, su familia, su integridad y su perseverancia.", formas: ["relacion con dios", "vida con dios", "su familia", "integridad", "persever*", "caracter", "importa (su|la) vida"] },
                { id: "equipo", peso: 50, texto: "Que vaya con un llamado confirmado, enviado por su iglesia y en equipo: nadie planta solo.", formas: ["llamado", "confirmad*", "confirm* (el|su|tu) llamado", "respald*", "enviado", "(lo|te) (envie|envia|mande)", "equipo", "nadie planta solo", "colaborador*"] },
              ],
              modelo: "Le aconsejo que, antes que sus dones, cuide su vida: su relación con Dios, su familia, su integridad y su perseverancia. Y que vaya con un llamado confirmado, enviado por su iglesia y en equipo, porque nadie planta solo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Conocer el lugar y su gente
    "evangelismo-misiones-5-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hizo Nehemías antes de reconstruir el muro?", reverso: "Salió de noche a mirarlo.", apoyo: "Antes de reconstruir el muro, Nehemías salió de noche a mirarlo" },
              { frente: "¿Qué conoció Nehemías antes de presentar su plan?", reverso: "La necesidad: los muros estaban derribados.", apoyo: "Conoció la necesidad antes de presentar su plan" },
              { frente: "¿Qué respondió el pueblo cuando Nehemías lo invitó a edificar?", reverso: "«Levantémonos y edifiquemos».", apoyo: "y ellos respondieron: «Levantémonos y edifiquemos»" },
              { frente: "¿Con qué se acompaña todo el estudio del lugar?", reverso: "Con oración.", apoyo: "y todo se acompaña de oración" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le pasaba a Pablo al ver Atenas entregada a la idolatría?", reverso: "Su espíritu se enardecía.", apoyo: "En Atenas, el espíritu de Pablo «se enardecía viendo la ciudad entregada a la idolatría»" },
              { frente: "Después de observar Atenas, ¿adónde fue Pablo?", reverso: "Adonde estaba la gente.", apoyo: "Observó la ciudad y fue adonde estaba la gente" },
              { frente: "¿Qué hacen muchos plantadores antes de empezar?", reverso: "Recorren el barrio orando por sus calles, sus familias y sus autoridades.", apoyo: "Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar" },
              { frente: "¿Cuál es la primera forma de amar a la gente?", reverso: "Conocerla.", apoyo: "Conocer a la gente es la primera forma de amarla" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "linea",
        versiones: [
          {
            consigna: "Sigue a Nehemías antes de reconstruir el muro. Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Sale de noche con unos pocos hombres", fecha: "Nehemías 2:12" },
              { texto: "Observa los muros de Jerusalén, que estaban derribados", fecha: "Nehemías 2:13" },
              { texto: "Invita al pueblo a edificar el muro de Jerusalén", fecha: "Nehemías 2:17" },
              { texto: "El pueblo responde: «Levantémonos y edifiquemos»", fecha: "Nehemías 2:18" },
            ],
            apoyo: "Conoció la necesidad antes de presentar su plan",
            ref: "Nehemías 2:12-18",
            explica: "Nehemías salió de noche con unos pocos hombres y observó los muros derribados: conoció la necesidad antes de presentar su plan. Después invitó al pueblo a edificar, y ellos respondieron: «Levantémonos y edifiquemos».",
          },
          {
            consigna: "¿En qué orden obró Nehemías? Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Sale de noche, con unos pocos hombres, a mirar el muro", fecha: "Nehemías 2:12" },
              { texto: "Conoce la necesidad: los muros están derribados", fecha: "Nehemías 2:13" },
              { texto: "Presenta su plan: «venid, y edifiquemos el muro de Jerusalén»", fecha: "Nehemías 2:17" },
              { texto: "El pueblo acepta la invitación y se dispone a edificar", fecha: "Nehemías 2:18" },
            ],
            apoyo: "Antes de construir, Nehemías salió de noche a observar los muros, y después invitó a edificar",
            ref: "Nehemías 2:12-18",
            explica: "Antes de construir, Nehemías salió de noche a observar los muros y conoció la necesidad; después presentó su plan e invitó a edificar, y el pueblo respondió: «Levantémonos y edifiquemos».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué parte del estudio de la comunidad responde cada dato? Lleva cada frase a su grupo.",
            grupos: ["Quiénes viven allí", "Qué necesidades tienen", "Dónde se reúne la gente"],
            frases: [
              { texto: "La mayoría son familias jóvenes con niños pequeños", grupo: 0 },
              { texto: "Varias familias hablan otra lengua en casa", grupo: 0 },
              { texto: "Casi todos trabajan en la fábrica o en el campo", grupo: 0 },
              { texto: "Muchos se sienten solos y no tienen con quién hablar", grupo: 1 },
              { texto: "Varios jóvenes luchan con las drogas", grupo: 1 },
              { texto: "Muchos niños pasan la tarde sin nadie que los cuide", grupo: 1 },
              { texto: "Los sábados, todo el barrio va a la cancha", grupo: 2 },
              { texto: "En la mañana, la plaza se llena de gente", grupo: 2 },
            ],
            apoyo: "Antes de plantar se conoce el lugar: quiénes viven allí, qué necesitan, qué iglesias hay, dónde se reúne la gente y quiénes están abiertos",
            explica: "El estudio de la comunidad mira quiénes viven allí (edades, familias, lenguas y trabajos), qué necesidades tienen (soledad, pobreza, adicciones, falta de cuidado para los niños) y dónde se reúne la gente (plazas, escuelas, mercados y canchas).",
          },
          {
            consigna: "¿Qué pregunta del estudio responde cada nota que tomaste en el barrio? Lleva cada frase a su grupo.",
            grupos: ["Qué iglesias hay y a quiénes alcanzan", "Quiénes están abiertos a conversar", "Dónde se reúne la gente"],
            frases: [
              { texto: "La única iglesia del barrio alcanza sobre todo a los ancianos", grupo: 0 },
              { texto: "Ninguna iglesia de la zona tiene reuniones para los jóvenes", grupo: 0 },
              { texto: "Hay una iglesia cerca, pero casi nadie del barrio va a ella", grupo: 0 },
              { texto: "Doña Marta quiere conversar y ofrece su sala para un estudio", grupo: 1 },
              { texto: "Un vecino pidió oración y quiere volver a conversar", grupo: 1 },
              { texto: "Las mamás se juntan a la salida de la escuela", grupo: 2 },
              { texto: "Los domingos hay un mercado en la calle principal", grupo: 2 },
            ],
            apoyo: "Quiénes están abiertos a conversar y a abrir su casa",
            explica: "También se observa qué iglesias hay ya y a quiénes alcanzan, quiénes están abiertos a conversar y a abrir su casa, y dónde se reúne la gente: plazas, escuelas, mercados y canchas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Antes de plantar una iglesia, hay que conocer el lugar y su gente",
            ref: "Nehemías 2:12-13; Hechos 17:16-17",
            titulo: "El barrio de la estación",
            relato: [
              "Tu iglesia quiere plantar una iglesia en el barrio de la estación, al otro lado de la ciudad, y te pusieron en el equipo.",
              "Nadie del equipo vive allí. Un hermano propone: Alquilemos un local y empecemos el culto el próximo domingo; ya veremos quién llega.",
              "Antes de decidir, recuerdas lo que hicieron Nehemías en Jerusalén y Pablo en Atenas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propones hacer primero?",
                opciones: [
                  { texto: "Recorrer el barrio para conocer la necesidad antes del plan.", bien: true, explica: "Nehemías salió de noche a observar los muros antes de presentar su plan: antes de plantar se conoce el lugar." },
                  { texto: "Abrir el local el domingo e ir conociendo el barrio con el tiempo.", explica: "Nehemías conoció la necesidad antes de presentar su plan, no después." },
                  { texto: "Repartir folletos en todas las casas para que el local se llene.", explica: "Antes de plantar una iglesia, hay que conocer el lugar y su gente." },
                ],
                apoyo: "Conoció la necesidad antes de presentar su plan",
                explica: "Antes de construir, Nehemías salió de noche a observar los muros, y después invitó a edificar: primero se conoce el lugar y su gente.",
              },
              {
                tipo: "situacion",
                pregunta: "En el recorrido, ¿qué van a observar y anotar?",
                opciones: [
                  { texto: "Quiénes viven allí, qué necesitan y qué iglesias hay ya.", bien: true, explica: "El estudio de la comunidad mira quiénes viven allí, qué necesidades tienen, qué iglesias hay, dónde se reúne la gente y quiénes están abiertos." },
                  { texto: "Solo cuántas casas hay, para saber cuántos folletos imprimir.", explica: "Se observa mucho más: quiénes viven allí, qué necesitan y qué iglesias hay." },
                  { texto: "Solo qué locales se alquilan y cuánto cuesta cada uno de ellos.", explica: "Lo primero es conocer a la gente: quiénes viven allí y qué necesidades tienen." },
                ],
                apoyo: "Qué iglesias hay ya y a quiénes alcanzan",
                explica: "Se observa quiénes viven allí, qué necesidades tienen, qué iglesias hay ya y a quiénes alcanzan, dónde se reúne la gente y quiénes están abiertos.",
              },
              {
                tipo: "situacion",
                pregunta: "Como Pablo en Atenas, ¿adónde van para conocer a la gente?",
                opciones: [
                  { texto: "A la plaza, la escuela, el mercado y la cancha del barrio.", bien: true, explica: "Pablo observó la ciudad y fue adonde estaba la gente: hoy la gente se reúne en plazas, escuelas, mercados y canchas." },
                  { texto: "A ningún lado: esperan en el local a que la gente llegue sola.", explica: "Pablo no esperó: fue adonde estaba la gente, y hablaba en la plaza cada día." },
                  { texto: "Solo a las casas de los creyentes que ya conocen en el barrio.", explica: "Pablo fue adonde estaba la gente: a la plaza, con los que concurrían." },
                ],
                apoyo: "Observó la ciudad y fue adonde estaba la gente",
                explica: "En Atenas, Pablo discutía «en la plaza cada día con los que concurrían»: observó la ciudad y fue adonde estaba la gente.",
              },
              {
                tipo: "explica",
                apoyo: "Antes de construir, Nehemías salió de noche a observar los muros, y después invitó a edificar",
                clave: {
                  id: "pr-evangelismo-misiones-5-3-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué le respondes al hermano que quería abrir el local el domingo sin conocer el barrio?",
                  ideas: [
                    { id: "conocer", peso: 50, texto: "Que antes de plantar hay que conocer el lugar y su gente, y conocer la necesidad antes de presentar un plan, como Nehemías.", formas: ["conoc* (lugar|gente|necesidad|necesidades|personas|vecinos|zona|barrio|colonia)", "antes de (presentar|hacer|empezar|abrir|plantar)", "primero (conocer|conozcamos|recorrer|recorramos|observar|observemos|estudiar|estudiemos)", "nehemias", "observ* (el|los|la) (barrio|muros|lugar|ciudad|zona)"] },
                    { id: "gente", peso: 50, texto: "Que hay que ir adonde está la gente, como Pablo en Atenas, en vez de esperar a que llegue.", formas: ["adonde (esta|estan) la gente", "donde (esta|estan) (gente|personas)", "donde se (reune|reunen)", "(la|las|una|a) (plaza|plazas)", "escuela*", "mercado*", "cancha*", "atenas", "salir a (buscar|conocer)", "ir a (buscar|donde|las)"] },
                  ],
                  modelo: "Le respondo que antes de plantar hay que conocer el lugar y su gente: como Nehemías, conocer la necesidad antes de presentar un plan. Y como Pablo en Atenas, ir adonde está la gente: a la plaza, la escuela y la cancha.",
                },
              },
            ],
          },
          {
            apoyo: "Antes de plantar se conoce el lugar: quiénes viven allí, qué necesitan, qué iglesias hay, dónde se reúne la gente y quiénes están abiertos",
            ref: "Nehemías 2:12-13",
            titulo: "Una colonia que nadie conoce",
            relato: [
              "Tu pastor te pide que coordines el estudio de una colonia nueva de la ciudad, donde la iglesia quiere plantar dentro de un año.",
              "Una hermana del equipo te dice: ¿Para qué tanto estudio? Las necesidades son las mismas en todas partes.",
              "Tienen tres meses para conocer la colonia antes de presentar un plan.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a la hermana?",
                opciones: [
                  { texto: "Que Nehemías conoció la necesidad antes de presentar su plan.", bien: true, explica: "Nehemías salió de noche a observar los muros: conoció la necesidad antes de presentar su plan." },
                  { texto: "Que tiene razón, y que basta con copiar el plan de otra colonia.", explica: "Antes de plantar se conoce el lugar: cada lugar tiene su gente y sus necesidades." },
                  { texto: "Que estudiar el lugar les quita el tiempo que es para la oración.", explica: "El estudio no quita la oración: todo se acompaña de oración." },
                ],
                apoyo: "Conoció la necesidad antes de presentar su plan",
                explica: "Antes de plantar una iglesia hay que conocer el lugar y su gente, como Nehemías, que conoció la necesidad antes de presentar su plan.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué necesidades buscan conocer en la colonia?",
                opciones: [
                  { texto: "Si hay soledad, pobreza, adicciones o niños sin cuidado.", bien: true, explica: "El estudio mira qué necesidades tienen: soledad, pobreza, adicciones, falta de cuidado para los niños." },
                  { texto: "Solo qué estilo de música le gusta más a la gente de allí.", explica: "Se buscan las necesidades de la gente: soledad, pobreza, adicciones, falta de cuidado para los niños." },
                  { texto: "Solo cuánto dinero podría dar cada familia a la iglesia.", explica: "El estudio busca las necesidades de la gente para amarla, no lo que podría dar." },
                ],
                apoyo: "Qué necesidades tienen: soledad, pobreza, adicciones, falta de cuidado para los niños",
                explica: "Conocer a la gente es la primera forma de amarla: por eso se buscan sus necesidades, como la soledad, la pobreza, las adicciones o la falta de cuidado para los niños.",
              },
              {
                tipo: "situacion",
                pregunta: "¿A quiénes buscan para empezar a conversar?",
                opciones: [
                  { texto: "A los que están abiertos a conversar y a abrir su casa.", bien: true, explica: "El estudio busca quiénes están abiertos a conversar y a abrir su casa." },
                  { texto: "A los que ya van a otra iglesia, para traerlos a la nueva.", explica: "Se mira qué iglesias hay ya y a quiénes alcanzan, para llegar a quienes todavía no tienen una." },
                  { texto: "A nadie todavía: primero alquilan un local y después verán.", explica: "Antes de plantar se conoce a la gente, y se busca a quienes están abiertos a conversar." },
                ],
                apoyo: "Quiénes están abiertos a conversar y a abrir su casa",
                explica: "El estudio de la comunidad también busca quiénes están abiertos a conversar y a abrir su casa.",
              },
              {
                tipo: "explica",
                apoyo: "Conocer a la gente es la primera forma de amarla",
                clave: {
                  id: "pr-evangelismo-misiones-5-3-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué harán en estos tres meses, y por qué conviene hacerlo antes de presentar un plan?",
                  ideas: [
                    { id: "observar", peso: 50, texto: "Recorrer la colonia y observar quiénes viven allí, qué necesitan, qué iglesias hay, dónde se reúne la gente y quiénes están abiertos.", formas: ["quienes viven", "que necesitan", "(sus|las) necesidades", "que iglesias", "iglesias hay", "donde se reune", "quienes estan abiertos", "recorr* (la|el) (colonia|barrio|zona|lugar)", "observ* (la|el|a|quienes|que|donde|sus)"] },
                    { id: "porque", peso: 50, texto: "Porque, como Nehemías, se conoce la necesidad antes de presentar el plan: conocer a la gente es la primera forma de amarla.", formas: ["nehemias", "conoc* la necesidad", "primera forma de amar*", "forma de amar*", "amar* a la gente", "para amar*"] },
                  ],
                  modelo: "Vamos a recorrer la colonia y observar quiénes viven allí, qué necesitan, qué iglesias hay y quiénes están abiertos. Conviene hacerlo antes, porque Nehemías conoció la necesidad antes de presentar su plan, y conocer a la gente es la primera forma de amarla.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la oración en el estudio del barrio tiene un error. Tócala.",
            frases: [
              "Muchos plantadores recorren el barrio orando antes de empezar.",
              "Oran por las calles, las familias y las autoridades del barrio.",
              "La oración queda para después, cuando la iglesia ya esté abierta.",
              "Todo el estudio de la comunidad se acompaña de oración.",
            ],
            malo: 2,
            correccion: "La oración no queda para después: muchos plantadores recorren el barrio orando antes de empezar, y todo el estudio se acompaña de oración.",
            apoyo: "Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar",
            explica: "El estudio del lugar se acompaña de oración: muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar.",
          },
          {
            consigna: "Una de estas frases sobre cómo se conoce un barrio tiene un error. Tócala.",
            frases: [
              "Nehemías salió de noche a observar los muros antes de presentar su plan.",
              "En Atenas, Pablo observó la ciudad y fue adonde estaba la gente.",
              "Orar por el barrio le quita al equipo el tiempo que necesita para estudiarlo.",
              "Conocer a la gente es la primera forma de amarla.",
            ],
            malo: 2,
            correccion: "Orar es parte del estudio: todo se acompaña de oración, y muchos plantadores recorren el barrio orando antes de empezar.",
            apoyo: "y todo se acompaña de oración",
            explica: "Conocer el lugar y orar van juntos: el estudio de la comunidad se acompaña de oración por sus calles, sus familias y sus autoridades.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar",
            ref: "Nehemías 2:12",
            clave: {
              id: "pr-evangelismo-misiones-5-3-a6-1",
              tipo: "corta",
              pregunta: "¿Qué lugar tiene la oración cuando se estudia un barrio, y cómo lo hacen muchos plantadores?",
              ideas: [
                { id: "acompana", peso: 50, texto: "Todo el estudio del lugar se acompaña de oración.", formas: ["acompan* (de|con) oracion", "acompan* de la oracion", "acompan* con la oracion", "todo se acompan*", "(es|forma) parte del estudio", "van juntos", "va junto"] },
                { id: "recorren", peso: 50, texto: "Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar.", formas: ["recorr* (el|la|las|los|sus) (barrio|calles|colonia|zona)", "(sus|las) calles", "autoridades", "camin* orando", "orando por (sus|las|el|la)"] },
              ],
              modelo: "Todo el estudio del lugar se acompaña de oración. Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar.",
            },
          },
          {
            apoyo: "y todo se acompaña de oración",
            ref: "Nehemías 2:12",
            clave: {
              id: "pr-evangelismo-misiones-5-3-a6-2",
              tipo: "corta",
              pregunta: "Tu equipo terminó de estudiar la colonia, y un hermano dice: Ya sabemos todo; orar por ella ahora sobra. ¿Qué le respondes?",
              ideas: [
                { id: "acompana", peso: 50, texto: "Que todo el estudio se acompaña de oración: orar es parte de conocer el lugar.", formas: ["acompan* (de|con) oracion", "acompan* de la oracion", "acompan* con la oracion", "todo se acompan*", "(es|forma) parte del estudio", "(orar|oracion) (es|forma) parte", "van juntos", "va junto"] },
                { id: "recorren", peso: 50, texto: "Que muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar.", formas: ["recorr* (el|la|las|los|sus) (barrio|calles|colonia|zona)", "(sus|las) calles", "autoridades", "camin* orando", "orando por (sus|las|el|la)"] },
              ],
              modelo: "Le respondo que todo el estudio se acompaña de oración: orar es parte de conocer el lugar. Muchos plantadores recorren el barrio orando por sus calles, sus familias y sus autoridades antes de empezar.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Empezar en las casas
    "evangelismo-misiones-5-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde empezaron la mayoría de las iglesias del Nuevo Testamento?", reverso: "No en un templo, sino en una casa.", apoyo: "La mayoría de las iglesias del Nuevo Testamento no empezaron en un templo, sino en una casa" },
              { frente: "En Filipos, ¿adónde fue Pablo a orar?", reverso: "«junto al río».", apoyo: "En Filipos, Pablo fue a orar «junto al río»" },
              { frente: "¿Qué hizo Lidia después de que el Señor abrió su corazón?", reverso: "Se bautizó con su familia y abrió su casa.", apoyo: "Ella se bautizó con su familia y abrió su casa" },
              { frente: "¿En la casa de quién se reunía después la iglesia de Filipos?", reverso: "En la de Lidia (Hechos 16:40).", apoyo: "Así empezó la iglesia de Filipos, que después se reunía en su casa (Hechos 16:40)" },
            ],
          },
          {
            tarjetas: [
              { frente: "En Jerusalén, ¿dónde partían el pan los creyentes?", reverso: "En las casas; y también iban al templo.", apoyo: "En Jerusalén, los creyentes iban al templo y se reunían «partiendo el pan en las casas»" },
              { frente: "¿Qué hacía el Señor cada día en Jerusalén?", reverso: "Añadía a la iglesia los que habían de ser salvos.", apoyo: "«el Señor añadía cada día a la iglesia los que habían de ser salvos»" },
              { frente: "¿Cómo se llevan las reuniones públicas y las de las casas?", reverso: "Se complementan.", apoyo: "Las reuniones públicas y las casas se complementan" },
              { frente: "¿Qué puede ser una casa abierta?", reverso: "El principio de una iglesia.", apoyo: "Una casa abierta puede ser el principio de una iglesia" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada uno con lo que dice la lección sobre las iglesias que empezaron en las casas.",
            pares: [
              ["En Filipos", "La iglesia nació cuando Lidia creyó y abrió su casa"],
              ["En Jerusalén", "Partían el pan en las casas mientras el Señor añadía a los salvos"],
              ["Pablo", "Enseñaba en público y por las casas"],
              ["La mayoría de las iglesias del Nuevo Testamento", "No empezaron en un templo, sino en una casa"],
            ],
            apoyo: "Las iglesias del Nuevo Testamento empezaron en las casas",
            explica: "La mayoría de las iglesias del Nuevo Testamento empezaron en una casa: en Filipos, la iglesia nació cuando Lidia creyó y abrió su casa; en Jerusalén partían el pan en las casas mientras el Señor añadía a los salvos; y Pablo enseñaba en público y por las casas.",
          },
          {
            consigna: "¿Qué pasó en Filipos? Une cada parte de la historia con lo que dice la lección.",
            pares: [
              ["Junto al río", "Pablo fue a orar"],
              ["El corazón de Lidia", "El Señor lo abrió"],
              ["Lidia y su familia", "Se bautizaron"],
              ["La casa de Lidia", "Allí se reunía después la iglesia de Filipos"],
            ],
            apoyo: "Así empezó la iglesia de Filipos",
            ref: "Hechos 16:13-15, 40",
            explica: "En Filipos, Pablo fue a orar junto al río, el Señor abrió el corazón de Lidia, ella se bautizó con su familia y abrió su casa, y después la iglesia se reunía en su casa.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Una casa abierta puede ser el principio de una iglesia",
            ref: "Hechos 16:13-15",
            situacion: "Tu equipo planta una iglesia en un barrio nuevo. Cada sábado se reúnen a orar en el parque, junto a la cancha.",
            escenas: [
              {
                id: "e1",
                narra: "Una vecina, Elena, se acerca a escuchar, y en unas semanas cree en Cristo.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le enseñas a obedecer a Cristo y evangelizan juntos a su familia.", valor: 2, explica: "Lidia creyó y se bautizó con su familia: se evangeliza a las personas abiertas y a sus familias.", siguiente: "e2" },
                  { texto: "La invitas al culto de la iglesia madre, al otro lado de la ciudad.", valor: 1, explica: "Invitarla está bien, pero el ejemplo de Lidia muestra que la iglesia puede nacer allí, en su casa.", siguiente: "e2" },
                  { texto: "La felicitas y la dejas seguir sola, porque ya creyó en Cristo.", valor: 0, explica: "A los que creen se les bautiza y se les enseña a obedecer a Cristo, y se evangeliza también a sus familias.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Semanas después, Elena te cuenta que su esposo y sus hijos le preguntan por su fe.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vas con ella a su casa para hablarles a todos del evangelio.", valor: 2, explica: "Se evangeliza a las personas abiertas y a sus familias, como en la casa de Lidia.", siguiente: "e2" },
                  { texto: "Le dices que eso es cosa suya, porque tú ya hiciste tu parte.", valor: 0, explica: "Los primeros pasos incluyen evangelizar a las personas abiertas y a sus familias.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Elena y su familia creen y se bautizan. Ella te dice: Entren en mi casa; aquí podemos reunirnos.",
                pregunta: "¿Qué haces con su invitación?",
                opciones: [
                  { texto: "La aceptas: una casa abierta puede ser el principio de una iglesia.", valor: 2, explica: "Así empezó la iglesia de Filipos: Lidia abrió su casa, y la iglesia se reunía allí." },
                  { texto: "La aceptas, pero solo para tomar un café juntos, sin abrir allí la Biblia.", valor: 1, explica: "La amistad ayuda, pero el grupo en la casa lleva la Biblia, la oración, una comida y la amistad." },
                  { texto: "Le dices que no, porque una iglesia de verdad empieza en un templo.", valor: 0, explica: "La mayoría de las iglesias del Nuevo Testamento no empezaron en un templo, sino en una casa." },
                ],
              },
              {
                id: "e3",
                narra: "En la primera reunión, alguien te felicita: ¡Qué bien convenciste a Elena!",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que fue el Señor quien abrió su corazón, como el de Lidia.", valor: 2, explica: "En Filipos, «el Señor abrió el corazón» de Lidia: el fruto viene de Dios." },
                  { texto: "Que se lo agradeces, y que el equipo trabajó mucho con ella.", valor: 1, explica: "El equipo sembró y cuidó, pero fue el Señor quien abrió su corazón, como el de Lidia." },
                  { texto: "Que fue tu manera de hablar la que de verdad la convenció de creer.", valor: 0, explica: "En Filipos fue «el Señor» quien abrió el corazón de Lidia." },
                ],
              },
            ],
          },
          {
            apoyo: "Ella se bautizó con su familia y abrió su casa",
            ref: "Hechos 16:14-15",
            situacion: "Te mudaste con tu familia a un pueblo sin iglesia para plantar una. Cada mañana vas al mercado a comprar y a conversar.",
            escenas: [
              {
                id: "e1",
                narra: "Carmen, la señora del puesto de frutas, cree en Cristo y te dice: Quiero que mi familia también lo conozca.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le propones ir a su casa para hablarles a todos del evangelio.", valor: 2, explica: "Se evangeliza a las personas abiertas y a sus familias, como pasó con Lidia y su casa.", siguiente: "e2" },
                  { texto: "Le das un folleto para que ella misma se lo pase a su familia.", valor: 1, explica: "El folleto ayuda, pero los primeros pasos piden evangelizar a las personas abiertas y a sus familias.", siguiente: "e2" },
                  { texto: "Le dices que su familia ya escuchará un día, cuando haya templo.", valor: 0, explica: "No hace falta esperar un templo: las iglesias del Nuevo Testamento empezaron en las casas.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan dos meses, y la familia de Carmen sigue sin escuchar el evangelio.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Visitas su casa con ella para evangelizar a su familia.", valor: 2, explica: "Se evangeliza a las personas abiertas y a sus familias.", siguiente: "e2" },
                  { texto: "Esperas a que ellos vengan solos, algún día, a buscar a la iglesia.", valor: 0, explica: "Lidia abrió su casa, y así empezó la iglesia de Filipos: la familia se alcanza en la casa.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "La familia de Carmen cree y se bautiza. Ella ofrece su patio para reunirse cada jueves.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Empiezas allí un grupo con la Biblia, la oración y una comida.", valor: 2, explica: "Se empieza con un grupo pequeño en una casa: la Biblia, la oración, una comida y la amistad." },
                  { texto: "Aceptas, pero solo para orar juntos, sin estudiar nunca la Biblia.", valor: 1, explica: "Orar es parte, pero el grupo en la casa también lleva la Biblia, una comida y la amistad." },
                  { texto: "No aceptas, porque reunirse en un patio no puede ser una iglesia.", valor: 0, explica: "Así empezó la iglesia de Filipos: en la casa de Lidia." },
                ],
              },
              {
                id: "e3",
                narra: "El grupo del patio crece. Un vecino pregunta por qué Carmen abrió su casa a la iglesia.",
                pregunta: "¿Qué le cuentas?",
                opciones: [
                  { texto: "Que hizo como Lidia: creyó, se bautizó y abrió su casa.", valor: 2, explica: "Lidia se bautizó con su familia y abrió su casa: «entrad en mi casa, y posad»." },
                  { texto: "Que lo hizo mientras juntan dinero para comprar un templo.", valor: 1, explica: "Puede haber reuniones públicas después, pero una casa abierta puede ser el principio de una iglesia." },
                  { texto: "Que la obligaron, porque era la única casa con patio grande.", valor: 0, explica: "Lidia abrió su casa porque el Señor abrió su corazón." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            ref: "Hechos 16:14",
            consigna: "En Filipos, ¿quién abrió el corazón de Lidia? Toca las palabras que lo dicen.",
            texto: "[[el Señor]] abrió el corazón",
            apoyo: "En Filipos, la iglesia nació cuando Lidia creyó y abrió su casa",
            explica: "Pablo fue a orar «junto al río», y allí «el Señor abrió el corazón» de Lidia. Ella se bautizó con su familia y abrió su casa.",
          },
          {
            ref: "Hechos 16:15",
            consigna: "¿Con qué palabras abrió Lidia su casa a Pablo y a los que iban con él? Toca las palabras que lo dicen.",
            texto: "[[entrad en mi casa]], y posad",
            apoyo: "Ella se bautizó con su familia y abrió su casa",
            explica: "Lidia se bautizó con su familia y abrió su casa: «entrad en mi casa, y posad». Así empezó la iglesia de Filipos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los primeros pasos de un grupo que puede llegar a ser iglesia, como los presenta la lección.",
            pasos: [
              "Empezar con un grupo pequeño en una casa",
              "Evangelizar a las personas abiertas y a sus familias",
              "Bautizar a los que creen y enseñarles a obedecer a Cristo",
              "Multiplicar el grupo cuando crece, formando nuevos líderes",
              "Pasar a reuniones públicas cuando haya un grupo de discípulos",
            ],
            apoyo: "Los primeros pasos son un grupo pequeño, evangelizar a las personas abiertas y a sus familias, bautizar y enseñar, multiplicar los grupos y después reunirse en público",
            explica: "Primero, un grupo pequeño en una casa; después se evangeliza a las personas abiertas y a sus familias, se bautiza y se enseña a los que creen, se multiplica el grupo formando nuevos líderes y, cuando hay un grupo de discípulos, se pasa a reuniones públicas.",
          },
          {
            consigna: "El equipo empieza en la casa de los Ramírez. Ordena su plan como lo enseña la lección, del primer paso al último.",
            pasos: [
              "Reunirse cada semana en su sala con la Biblia, la oración y una comida",
              "Hablar de Cristo a los vecinos abiertos y a sus familias",
              "Bautizar a los vecinos que creen y enseñarles a obedecer",
              "Formar nuevos líderes y abrir un segundo grupo en otra casa",
              "Empezar reuniones públicas cuando ya hay un grupo de discípulos",
            ],
            apoyo: "Empezar con un grupo pequeño en una casa: la Biblia, la oración, una comida y la amistad",
            explica: "El grupo empieza pequeño en una casa, con la Biblia, la oración, una comida y la amistad; evangeliza a los vecinos abiertos y a sus familias; bautiza y enseña a los que creen; se multiplica formando nuevos líderes, y después pasa a reuniones públicas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los primeros pasos son un grupo pequeño, evangelizar a las personas abiertas y a sus familias, bautizar y enseñar, multiplicar los grupos y después reunirse en público",
            ref: "Hechos 2:46-47",
            clave: {
              id: "pr-evangelismo-misiones-5-4-a6-1",
              tipo: "corta",
              pregunta: "Escribe un plan corto con los primeros pasos de un grupo en una casa que puede llegar a ser iglesia.",
              ideas: [
                { id: "grupo", peso: 34, texto: "Empezar con un grupo pequeño en una casa: la Biblia, la oración, una comida y la amistad.", formas: ["grupo pequeno", "comida", "amistad", "comer juntos", "biblia oracion"] },
                { id: "evangelizar", peso: 33, texto: "Evangelizar a las personas abiertas y a sus familias, bautizar a los que creen y enseñarles a obedecer a Cristo.", formas: ["(evangelizar|evangelizamos|evangelizaremos|evangelizan|evangelizando|evangelizara|evangelizaran)", "personas abiertas", "vecinos abiertos", "bautiz*", "ensen* a obedecer", "obedecer a cristo"] },
                { id: "multiplicar", peso: 33, texto: "Multiplicar el grupo formando nuevos líderes y, después, pasar a reuniones públicas.", formas: ["multiplic*", "nuevos lideres", "form* lideres", "reuniones publicas", "en publico", "(otro|segundo|nuevo) grupo"] },
              ],
              modelo: "Primero, un grupo pequeño en una casa, con la Biblia, la oración, una comida y amistad. Después, evangelizar a las personas abiertas y a sus familias, bautizar a los que creen y enseñarles a obedecer. Al crecer, multiplicar el grupo formando nuevos líderes y pasar a reuniones públicas.",
            },
          },
          {
            apoyo: "Una casa abierta puede ser el principio de una iglesia",
            ref: "Hechos 16:15",
            clave: {
              id: "pr-evangelismo-misiones-5-4-a6-2",
              tipo: "corta",
              pregunta: "Tu vecina abrió su casa para un estudio de la Biblia. ¿Qué pasos seguirán para que ese grupo pueda llegar a ser una iglesia?",
              ideas: [
                { id: "grupo", peso: 34, texto: "Reunirse como grupo pequeño con la Biblia, la oración, una comida y la amistad.", formas: ["grupo pequeno", "comida", "amistad", "comer juntos", "(orar|oracion|oramos|orando|oraremos)"] },
                { id: "evangelizar", peso: 33, texto: "Evangelizar a las personas abiertas y a sus familias, bautizar a los que creen y enseñarles a obedecer a Cristo.", formas: ["(evangelizar|evangelizamos|evangelizaremos|evangelizan|evangelizando|evangelizara|evangelizaran)", "personas abiertas", "vecinos abiertos", "bautiz*", "ensen* a obedecer", "obedecer a cristo"] },
                { id: "multiplicar", peso: 33, texto: "Multiplicar el grupo con nuevos líderes y, después, pasar a reuniones públicas.", formas: ["multiplic*", "nuevos lideres", "form* lideres", "reuniones publicas", "en publico", "(otro|segundo|nuevo) grupo"] },
              ],
              modelo: "Nos reuniremos como grupo pequeño con la Biblia, la oración, una comida y amistad. Evangelizaremos a los vecinos abiertos y a sus familias, bautizaremos a los que crean y les enseñaremos a obedecer. Al crecer, multiplicaremos el grupo con nuevos líderes y pasaremos a reuniones públicas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Formar líderes y organizar
    "evangelismo-misiones-5-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Puede una iglesia nueva depender para siempre del plantador?", reverso: "No: desde el principio hay que formar a los que van a guiarla.", apoyo: "Una iglesia nueva no puede depender para siempre del plantador. Desde el principio hay que formar a los que van a guiarla" },
              { frente: "¿Para qué dejó Pablo a Tito en Creta?", reverso: "Para que corrigiera lo deficiente y estableciera ancianos en cada ciudad.", apoyo: "Pablo dejó a Tito en Creta «para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad»" },
              { frente: "¿Qué tiene una iglesia madura?", reverso: "Líderes del lugar.", apoyo: "Una iglesia madura tiene líderes del lugar" },
              { frente: "¿Quién es el mejor plantador?", reverso: "El que un día ya no hace falta.", apoyo: "El mejor plantador es el que un día ya no hace falta" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué dio Cristo ministerios a la iglesia?", reverso: "«a fin de perfeccionar a los santos para la obra del ministerio».", apoyo: "Cristo dio ministerios a la iglesia «a fin de perfeccionar a los santos para la obra del ministerio»" },
              { frente: "¿Cómo mantiene la iglesia nueva su relación con la iglesia que la envió?", reverso: "Con apoyo y rendición de cuentas.", apoyo: "Mantener la relación con la iglesia que envió, con apoyo y rendición de cuentas" },
              { frente: "¿Cuándo se empieza a formar a los líderes del lugar?", reverso: "Desde el principio, como enseña 2 Timoteo 2:2.", apoyo: "Formar líderes del lugar desde el principio, como enseña 2 Timoteo 2:2" },
              { frente: "¿Qué orden necesita una iglesia nueva?", reverso: "Uno sencillo: reuniones, cuidado de los nuevos y cuentas claras.", apoyo: "Dar a la iglesia un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los líderes del lugar: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Pablo dejó a Tito en Creta para que estableciera ancianos en cada ciudad.", verdad: true, explica: "Lo dejó allí «para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad».", apoyo: "Pablo dejó a Tito en Creta «para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad»", ref: "Tito 1:5" },
              { texto: "Una iglesia madura sigue dependiendo para siempre del plantador.", verdad: false, explica: "Una iglesia madura tiene líderes del lugar: una iglesia nueva no puede depender para siempre del plantador.", apoyo: "Una iglesia madura tiene líderes del lugar" },
              { texto: "Desde el principio hay que formar a los que van a guiar la iglesia nueva.", verdad: true, explica: "Una iglesia nueva no puede depender para siempre del plantador: desde el principio se forma a los que van a guiarla.", apoyo: "Desde el principio hay que formar a los que van a guiarla" },
            ],
          },
          {
            consigna: "Sobre el plantador y los líderes de la iglesia nueva: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El mejor plantador es el que un día ya no hace falta.", verdad: true, explica: "Así lo dice la lección: la iglesia nueva no puede depender para siempre del plantador.", apoyo: "El mejor plantador es el que un día ya no hace falta" },
              { texto: "Los líderes del lugar se forman cuando el plantador ya se fue.", verdad: false, explica: "Los líderes del lugar se forman desde el principio, como enseña 2 Timoteo 2:2.", apoyo: "Formar líderes del lugar desde el principio, como enseña 2 Timoteo 2:2" },
              { texto: "Pablo hacía él mismo toda la obra en cada iglesia, sin dejar líderes en ella.", verdad: false, explica: "Pablo dejaba líderes del lugar en cada iglesia, como cuando dejó a Tito en Creta.", apoyo: "Pablo dejaba líderes del lugar en cada iglesia" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un plantador te dice: Yo predico, dirijo el canto, visito a todos y llevo las cuentas; si no lo hago yo, nadie lo hace bien.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que prepare a cada creyente para servir, como enseña Efesios 4:12.", bien: true, explica: "Cristo dio ministerios a la iglesia para preparar a los santos para la obra del ministerio: el plantador no hace todo." },
              { texto: "Que siga así, porque el plantador es quien mejor hace toda la obra.", explica: "El plantador no hace todo: prepara a cada creyente para servir." },
              { texto: "Que traiga a alguien de afuera para que haga lo que él no alcanza.", explica: "La lección pide formar a los creyentes del lugar para servir, no depender de otros de afuera." },
              { texto: "Que haga menos, aunque la iglesia se quede sin quien haga cada cosa.", explica: "No se trata de dejar la obra sin hacer, sino de preparar a cada creyente para servir." },
            ],
            apoyo: "El plantador no hace todo: prepara a cada creyente para servir",
            ref: "Efesios 4:11-12",
            explica: "Cristo dio ministerios a la iglesia «a fin de perfeccionar a los santos para la obra del ministerio»: el plantador no hace todo, sino que prepara a cada creyente para servir.",
          },
          {
            caso: "Una hermana nueva te dice: Yo solo vengo a escuchar; servir les toca al plantador y a su equipo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el plantador prepara a cada creyente para servir, también a ella.", bien: true, explica: "Cristo dio ministerios para preparar a los santos para la obra del ministerio: cada creyente se prepara para servir." },
              { texto: "Que tiene razón: la obra del ministerio es solo del plantador y su equipo.", explica: "Cristo dio ministerios para preparar a los santos, es decir, a los creyentes, para la obra del ministerio." },
              { texto: "Que está bien, con tal de que ofrende cada semana para que otros sirvan.", explica: "El plantador prepara a cada creyente para servir, no solo a unos pocos." },
              { texto: "Que sirva cuando ya sepa toda la Biblia, dentro de unos cuantos años.", explica: "El plantador prepara a cada creyente para servir desde el principio." },
            ],
            apoyo: "Cristo dio ministerios a la iglesia «a fin de perfeccionar a los santos para la obra del ministerio»",
            ref: "Efesios 4:12",
            explica: "Cristo dio ministerios para preparar a los santos para la obra del ministerio, así que el plantador no lo hace todo: prepara a cada creyente para servir.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Una iglesia nueva no puede depender para siempre del plantador",
            ref: "Tito 1:5; 2 Timoteo 2:2",
            titulo: "Cuando el plantador se vaya",
            relato: [
              "Hace dos años, tu iglesia plantó una iglesia en la colonia Esperanza. El plantador, Tomás, se mudará a otra ciudad dentro de un año.",
              "Hoy Tomás predica, abre el local, cuida a los nuevos y guarda el dinero. Nadie más sabe hacerlo.",
              "La iglesia que envió a Tomás te pide ayudar a que la iglesia nueva no dependa de él.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propones primero?",
                opciones: [
                  { texto: "Que Tomás forme desde ya a líderes del lugar, como en 2 Timoteo 2:2.", bien: true, explica: "Se forman líderes del lugar desde el principio: una iglesia madura tiene líderes del lugar." },
                  { texto: "Que la iglesia madre mande a otro plantador para reemplazar a Tomás.", explica: "Eso la deja dependiendo de otro plantador: una iglesia madura tiene líderes del lugar." },
                  { texto: "Que Tomás siga haciendo todo, igual que siempre, hasta el día en que se mude.", explica: "Una iglesia nueva no puede depender para siempre del plantador." },
                ],
                apoyo: "Formar líderes del lugar desde el principio, como enseña 2 Timoteo 2:2",
                explica: "Una iglesia nueva no puede depender para siempre del plantador: desde el principio hay que formar a los que van a guiarla.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo repartirán el servicio de la iglesia?",
                opciones: [
                  { texto: "Reconociendo los dones de cada uno y repartiendo las tareas.", bien: true, explica: "Se reconocen los dones de cada uno y se reparte el servicio." },
                  { texto: "Dándole todas las tareas a la familia que más ayuda en la iglesia.", explica: "El servicio se reparte según los dones de cada uno, no se carga en unos pocos." },
                  { texto: "Esperando a que alguien se ofrezca solo para cada una de las tareas.", explica: "El plantador prepara a cada creyente: reconoce sus dones y reparte el servicio." },
                ],
                apoyo: "Reconocer los dones de cada uno y repartir el servicio",
                explica: "El plantador no hace todo: reconoce los dones de cada uno y reparte el servicio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué orden le darán a la iglesia?",
                opciones: [
                  { texto: "Uno sencillo: reuniones, cuidado de los nuevos y cuentas claras.", bien: true, explica: "Se organiza sin ahogar: un orden sencillo, con reuniones, cuidado de los nuevos y cuentas claras." },
                  { texto: "Un reglamento largo, con un comité distinto para cada cosa pequeña.", explica: "La lección pide organizar sin ahogar: un orden sencillo." },
                  { texto: "Ninguno: cada uno hará lo que le parezca mejor en cada reunión.", explica: "La iglesia necesita un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras." },
                ],
                apoyo: "Dar a la iglesia un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras",
                explica: "Organizar sin ahogar es dar un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras.",
              },
              {
                tipo: "explica",
                apoyo: "Buscar que la iglesia llegue a sostenerse, gobernarse y extenderse por sí misma",
                clave: {
                  id: "pr-evangelismo-misiones-5-5-a4-1",
                  tipo: "corta",
                  pregunta: "¿Hacia dónde debe caminar la iglesia de la colonia Esperanza, y qué relación tendrá con la iglesia que la envió?",
                  ideas: [
                    { id: "por-si", peso: 50, texto: "Hacia sostenerse, gobernarse y extenderse por sí misma.", formas: ["por si misma", "por si sola", "por ella misma", "(sostenerse|sostenga|sostener) sola", "se (sostenga|gobierne|extienda) sola", "sin depender"] },
                    { id: "relacion", peso: 50, texto: "Mantendrá la relación con la iglesia que la envió, con apoyo y rendición de cuentas.", formas: ["rendicion de cuentas", "rend* cuentas", "dar cuentas", "con apoyo", "(su|el|un) apoyo", "apoyo (y|mutuo)", "(la|le) (apoya|apoyara|apoye|ayuda|ayudara|acompana|acompanara)"] },
                  ],
                  errores: [
                    { id: "depender", texto: "Una iglesia nueva no puede depender para siempre: camina hacia sostenerse, gobernarse y extenderse por sí misma.", formas: ["depend* siempre", "siempre depend*", "(madre|tomas|plantador) (la|le) (siga|sigan) (sosteniendo|gobernando|mandando)", "(madre|plantador|tomas) (decida|decide|decidira|mande|manda|mandara) todo"], anula: "por-si" },
                  ],
                  modelo: "Debe caminar hacia sostenerse, gobernarse y extenderse por sí misma. Y mantendrá la relación con la iglesia que la envió, con apoyo y rendición de cuentas.",
                },
              },
            ],
          },
          {
            apoyo: "Organizar sin ahogar",
            ref: "Efesios 4:11-12",
            titulo: "Todo pasa por el plantador",
            relato: [
              "Eres parte del equipo que plantó una iglesia en un pueblo hace un año. Ya se reúnen cuarenta personas.",
              "El plantador, Julio, decide todo, predica todos los domingos y guarda las ofrendas en su casa sin que nadie las cuente.",
              "La iglesia que los envió les pide un plan para organizar la iglesia sin ahogarla.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen con las ofrendas?",
                opciones: [
                  { texto: "Llevan cuentas claras, como parte de un orden sencillo.", bien: true, explica: "Un orden sencillo incluye reuniones, cuidado de los nuevos y cuentas claras." },
                  { texto: "Las sigue guardando Julio, porque él es el que plantó la iglesia.", explica: "La lección pide cuentas claras y rendición de cuentas, no que todo pase por una persona." },
                  { texto: "Las reparten cada domingo entre los hermanos que más ayudan.", explica: "La iglesia necesita un orden sencillo con cuentas claras." },
                ],
                apoyo: "Dar a la iglesia un orden sencillo: reuniones, cuidado de los nuevos y cuentas claras",
                explica: "Un orden sencillo incluye cuentas claras, y la iglesia nueva rinde cuentas a la iglesia que la envió.",
              },
              {
                tipo: "situacion",
                pregunta: "Julio lo hace todo. ¿Qué le proponen?",
                opciones: [
                  { texto: "Que forme desde ya a líderes del lugar, como enseña 2 Timoteo 2:2.", bien: true, explica: "Se forman líderes del lugar desde el principio: una iglesia madura tiene líderes del lugar." },
                  { texto: "Que siga solo, porque nadie más del pueblo podría hacer lo que él hace.", explica: "Una iglesia nueva no puede depender para siempre del plantador." },
                  { texto: "Que traiga cada domingo a alguien de la ciudad para que lo ayude.", explica: "La lección pide formar líderes del lugar, no depender de los de afuera." },
                ],
                apoyo: "Formar líderes del lugar desde el principio, como enseña 2 Timoteo 2:2",
                explica: "El plantador forma líderes del lugar desde el principio, para que la iglesia no dependa de él.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué meta le ponen a la iglesia para los próximos años?",
                opciones: [
                  { texto: "Que llegue a sostenerse, gobernarse y extenderse por sí misma.", bien: true, explica: "Es la meta que da la lección para una iglesia nueva." },
                  { texto: "Que siga siempre bajo el control de Julio y de toda su familia.", explica: "Una iglesia nueva no puede depender para siempre del plantador." },
                  { texto: "Que cada año reciba todavía más ayuda de la iglesia que la envió.", explica: "La iglesia nueva sigue unida a la que la envió, pero busca llegar a sostenerse por sí misma." },
                ],
                apoyo: "Buscar que la iglesia llegue a sostenerse, gobernarse y extenderse por sí misma",
                explica: "La meta es que la iglesia nueva llegue a sostenerse, gobernarse y extenderse por sí misma, sin dejar la relación con la iglesia que la envió.",
              },
              {
                tipo: "explica",
                apoyo: "El mejor plantador es el que un día ya no hace falta",
                clave: {
                  id: "pr-evangelismo-misiones-5-5-a4-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías a Julio sobre su tarea como plantador?",
                  ideas: [
                    { id: "preparar", peso: 50, texto: "Que no lo haga todo: que prepare a cada creyente para servir, porque Cristo dio ministerios para preparar a los santos.", formas: ["prepar* a (cada|los|todos|otros|la)", "cada creyente", "a los santos", "obra del ministerio", "(form*|capacit*|entren*) a (otros|los|lideres|cada|todos)", "form* lideres", "repart* (el|las|los) (servicio|tareas|trabajo)"] },
                    { id: "falta", peso: 50, texto: "Que el mejor plantador es el que un día ya no hace falta: la iglesia no puede depender de él para siempre.", formas: ["mejor plantador es el que", "un dia ya no (hace|haga|hara) falta", "no (dependa|depender|dependan|depende|dependera) (el|plantador|julio|siempre)", "sin depender (el|plantador|julio)"] },
                  ],
                  errores: [
                    { id: "no-formar", texto: "El plantador forma a otros: prepara a cada creyente para servir.", formas: ["no hace falta (formar|preparar|forme|prepare|lideres|nadie)", "no (forme|prepare|formar|preparar) a nadie"], anula: "falta" },
                  ],
                  modelo: "Le diría que no lo haga todo, sino que prepare a cada creyente para servir, porque Cristo dio ministerios para preparar a los santos. El mejor plantador es el que un día ya no hace falta.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda a que la iglesia nueva no dependa del plantador, o la hace depender de él? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a no depender del plantador", "La hace depender del plantador"],
            frases: [
              { texto: "Se forman líderes del lugar desde el principio", grupo: 0 },
              { texto: "Se reconocen los dones de cada uno y se reparte el servicio", grupo: 0 },
              { texto: "Se llevan cuentas claras", grupo: 0 },
              { texto: "La iglesia busca sostenerse por sí misma", grupo: 0 },
              { texto: "El plantador decide todo él solo", grupo: 1 },
              { texto: "No se forma a nadie, porque el plantador lo hace mejor", grupo: 1 },
              { texto: "Nadie más que el plantador sabe cuánto dinero hay", grupo: 1 },
              { texto: "Se buscan líderes solo cuando el plantador ya se va", grupo: 1, explica: "Los líderes del lugar se forman desde el principio." },
            ],
            apoyo: "Una iglesia nueva forma líderes desde el principio, reparte el servicio, tiene un orden sencillo y camina hacia sostenerse, gobernarse y extenderse por sí misma",
            explica: "Una iglesia nueva no depende del plantador cuando forma líderes desde el principio, reparte el servicio según los dones, tiene un orden sencillo con cuentas claras y camina hacia sostenerse, gobernarse y extenderse por sí misma.",
          },
          {
            consigna: "¿Es parte del plan de la lección para organizar una iglesia nueva, o va contra ese plan? Lleva cada frase a su grupo.",
            grupos: ["Es parte del plan", "Va contra el plan"],
            frases: [
              { texto: "Mantener la relación con la iglesia que envió", grupo: 0 },
              { texto: "Dar un orden sencillo a las reuniones y al cuidado de los nuevos", grupo: 0 },
              { texto: "Rendir cuentas a la iglesia que envió", grupo: 0 },
              { texto: "Que la iglesia aprenda a extenderse por sí misma", grupo: 0 },
              { texto: "Cortar toda relación con la iglesia que envió", grupo: 1 },
              { texto: "Depender siempre del dinero de la iglesia que envió", grupo: 1, explica: "La iglesia nueva busca llegar a sostenerse por sí misma." },
              { texto: "Manejar las ofrendas sin que nadie vea las cuentas", grupo: 1 },
              { texto: "Llenar la iglesia de reglas para cada detalle", grupo: 1, explica: "Se organiza sin ahogar: con un orden sencillo." },
            ],
            apoyo: "Mantener la relación con la iglesia que envió, con apoyo y rendición de cuentas",
            explica: "El plan de la lección: formar líderes, repartir el servicio, un orden sencillo con cuentas claras, caminar hacia sostenerse, gobernarse y extenderse por sí misma, y mantener la relación con la iglesia que envió, con apoyo y rendición de cuentas.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Pablo dejaba líderes del lugar en cada iglesia: dejó a Tito en Creta para establecer ancianos en cada ciudad",
            ref: "Tito 1:5",
            clave: {
              id: "pr-evangelismo-misiones-5-5-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué Pablo dejaba líderes del lugar en cada iglesia? Usa el ejemplo de Tito en Creta.",
              ideas: [
                { id: "tito", peso: 50, texto: "Pablo dejó a Tito en Creta para que corrigiera lo deficiente y estableciera ancianos en cada ciudad.", formas: ["establec* ancianos", "ancianos en cada ciudad", "(poner|pusiera|nombrar|nombrara|establecer|estableciera) (ancianos|lideres)", "lo deficiente", "corrig* (lo|deficiente)"] },
                { id: "madura", peso: 50, texto: "Porque una iglesia madura tiene líderes del lugar: no puede depender para siempre del plantador.", formas: ["iglesia madura", "(iglesia|iglesias) (madure|maduren|madura|maduras)", "no (dependa|depender|dependiera|depende|dependan|dependieran)", "sin depender"] },
              ],
              modelo: "Pablo dejó a Tito en Creta para que corrigiera lo deficiente y estableciera ancianos en cada ciudad. Lo hacía porque una iglesia madura tiene líderes del lugar y no puede depender para siempre del plantador.",
            },
          },
          {
            apoyo: "Una iglesia nueva no puede depender para siempre del plantador",
            ref: "Tito 1:5",
            clave: {
              id: "pr-evangelismo-misiones-5-5-a6-2",
              tipo: "corta",
              pregunta: "Un plantador dice: Voy a formar líderes cuando la iglesia ya esté grande. ¿Qué le respondes con la lección?",
              ideas: [
                { id: "principio", peso: 50, texto: "Que los líderes del lugar se forman desde el principio, como enseña 2 Timoteo 2:2.", formas: ["desde el (principio|comienzo|inicio)", "desde el primer dia", "desde (ya|ahora|hoy)", "2 timoteo", "timoteo"] },
                { id: "madura", peso: 50, texto: "Que una iglesia madura tiene líderes del lugar: no puede depender para siempre del plantador, y el mejor plantador es el que un día ya no hace falta.", formas: ["iglesia madura", "lideres del lugar", "no (dependa|depender|dependiera|depende|dependan) (plantador|el|siempre)", "sin depender (plantador|el)"] },
              ],
              modelo: "Le respondo que los líderes del lugar se forman desde el principio, como enseña 2 Timoteo 2:2, porque una iglesia nueva no puede depender para siempre del plantador. El mejor plantador es el que un día ya no hace falta.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Una iglesia que se multiplica
    "evangelismo-misiones-5-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es el fruto de una iglesia plantada, además de crecer?", reverso: "Que un día plante otras.", apoyo: "El fruto de una iglesia plantada no es solo que crezca, sino que un día plante otras" },
              { frente: "¿Qué escribió Pablo de la iglesia de Tesalónica?", reverso: "«partiendo de vosotros ha sido divulgada la palabra del Señor».", apoyo: "De la iglesia de Tesalónica, Pablo escribió: «partiendo de vosotros ha sido divulgada la palabra del Señor, no sólo en Macedonia y Acaya»" },
              { frente: "¿En qué se convirtió la iglesia joven de Tesalónica?", reverso: "En una iglesia que extiende el evangelio.", apoyo: "Una iglesia joven se convirtió en una iglesia que extiende el evangelio" },
              { frente: "¿Hasta dónde llegó la palabra desde Éfeso?", reverso: "A toda la región: todos los que habitaban en Asia la oyeron.", apoyo: "Desde Éfeso, la palabra llegó a toda la región" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué daba gracias Pablo por la iglesia de Filipos?", reverso: "«por vuestra comunión en el evangelio, desde el primer día hasta ahora».", apoyo: "Pablo daba gracias por la iglesia de Filipos «por vuestra comunión en el evangelio, desde el primer día hasta ahora»" },
              { frente: "¿Qué se enseña desde el primer día en una iglesia que se multiplica?", reverso: "Que la iglesia existe para la misión.", apoyo: "Enseñar desde el primer día que la iglesia existe para la misión" },
              { frente: "¿Cómo envió Antioquía a su equipo?", reverso: "Con la bendición de la iglesia.", apoyo: "Enviar un equipo con la bendición de la iglesia, como Antioquía" },
              { frente: "¿Cómo acompaña una iglesia que se multiplica a sus iglesias hijas?", reverso: "Sin controlarlas.", apoyo: "acompaña a sus iglesias hijas sin controlarlas" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            ref: "1 Tesalonicenses 1:8",
            consigna: "¿Qué fue divulgado partiendo de la iglesia de Tesalónica? Toca las palabras que lo dicen.",
            texto: "partiendo de vosotros ha sido divulgada [[la palabra del Señor]], no sólo en Macedonia y Acaya",
            apoyo: "Una iglesia joven se convirtió en una iglesia que extiende el evangelio",
            explica: "De la iglesia de Tesalónica, Pablo escribió: «partiendo de vosotros ha sido divulgada la palabra del Señor, no sólo en Macedonia y Acaya». Una iglesia joven se convirtió en una iglesia que extiende el evangelio.",
          },
          {
            ref: "1 Tesalonicenses 1:8",
            consigna: "¿En qué dos regiones, y aun más allá, se divulgó la palabra desde Tesalónica? Toca las dos regiones.",
            texto: "partiendo de vosotros ha sido divulgada la palabra del Señor, no sólo en [[Macedonia]] y [[Acaya]]",
            apoyo: "De Tesalónica salió la palabra del Señor a otras regiones",
            explica: "La palabra del Señor salió de Tesalónica y fue divulgada «no sólo en Macedonia y Acaya»: de Tesalónica salió la palabra del Señor a otras regiones.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre por qué una iglesia sana planta otras: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El fruto de una iglesia plantada no es solo que crezca, sino que un día plante otras.", verdad: true, explica: "Así lo dice la lección: una iglesia sana no solo crece, da a luz otras iglesias.", apoyo: "El fruto de una iglesia plantada no es solo que crezca, sino que un día plante otras" },
              { texto: "Una iglesia sana solo necesita crecer en número de miembros.", verdad: false, explica: "Una iglesia sana no solo crece: da a luz otras iglesias.", apoyo: "Una iglesia sana no solo crece: da a luz otras iglesias" },
              { texto: "Una iglesia joven tiene que esperar muchos años para extender el evangelio.", verdad: false, explica: "La iglesia de Tesalónica era joven y se convirtió en una iglesia que extiende el evangelio.", apoyo: "Una iglesia joven se convirtió en una iglesia que extiende el evangelio", ref: "1 Tesalonicenses 1:8" },
            ],
          },
          {
            consigna: "Sobre las iglesias que extendieron la palabra: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Desde Éfeso, la palabra del Señor llegó a toda Asia.", verdad: true, explica: "«todos los que habitaban en Asia, judíos y griegos, oyeron la palabra del Señor Jesús».", apoyo: "Desde Éfeso, la palabra llegó a toda la región", ref: "Hechos 19:10" },
              { texto: "Pablo daba gracias por la comunión de los filipenses en el evangelio.", verdad: true, explica: "Daba gracias «por vuestra comunión en el evangelio, desde el primer día hasta ahora».", apoyo: "Pablo daba gracias por la comunión de los filipenses en el evangelio", ref: "Filipenses 1:5" },
              { texto: "Una iglesia que se multiplica enseña que existe para la misión solo cuando ya es grande.", verdad: false, explica: "Lo enseña desde el principio, desde el primer día.", apoyo: "Enseñar desde el primer día que la iglesia existe para la misión" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Formar a futuros plantadores dentro de la iglesia",
            ref: "Hechos 13:2-3",
            situacion: "Tu iglesia se plantó hace tres años en tu barrio. Ya tiene líderes del lugar, y quieren que un día nazca de ella una iglesia hija.",
            escenas: [
              {
                id: "e1",
                narra: "Es la primera reunión para pensar en la iglesia hija.",
                pregunta: "¿Qué propones primero?",
                opciones: [
                  { texto: "Orar juntos por nuevos barrios, ciudades y pueblos.", valor: 2, explica: "Una iglesia que se multiplica ora por nuevos lugares.", siguiente: "e2" },
                  { texto: "Escoger hoy mismo el barrio y la fecha del primer culto.", valor: 1, explica: "Llegará el momento de escoger, pero primero se ora por nuevos barrios, ciudades y pueblos.", siguiente: "e2" },
                  { texto: "Esperar a ser una iglesia grande antes de pensar en eso.", valor: 0, explica: "Desde el primer día se enseña que la iglesia existe para la misión.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa un año, y nadie vuelve a hablar de plantar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Recuerdas a todos que la iglesia existe para la misión, y oran.", valor: 2, explica: "Una iglesia que se multiplica enseña que existe para la misión y ora por nuevos lugares.", siguiente: "e2" },
                  { texto: "Lo dejas así: ya habrá tiempo cuando la iglesia sea mucho más grande.", valor: 0, explica: "Una iglesia joven, como la de Tesalónica, ya puede extender el evangelio.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Dios pone en el corazón de la iglesia un pueblo cercano que no tiene iglesia.",
                pregunta: "¿Cómo preparan a los que irán?",
                opciones: [
                  { texto: "Forman dentro de la iglesia a futuros plantadores.", valor: 2, explica: "Una iglesia que se multiplica forma a futuros plantadores dentro de la iglesia." },
                  { texto: "Forman a uno solo, y lo mandan sin ningún equipo.", valor: 1, explica: "Formarlo está bien, pero se envía un equipo, como Antioquía." },
                  { texto: "Mandan a cualquiera que quiera ir, sin formarlo antes.", valor: 0, explica: "Se forma a futuros plantadores dentro de la iglesia antes de enviarlos." },
                ],
              },
              {
                id: "e3",
                narra: "El equipo ya está listo para ir al pueblo.",
                pregunta: "¿Cómo lo envía la iglesia?",
                opciones: [
                  { texto: "Con su bendición, como Antioquía envió a los suyos.", valor: 2, explica: "Se envía un equipo con la bendición de la iglesia, como Antioquía." },
                  { texto: "Con una ofrenda, pero sin orar por ellos ni despedirlos.", valor: 1, explica: "La ofrenda ayuda, pero el equipo se envía con la bendición de la iglesia." },
                  { texto: "En silencio, para que nadie más quiera irse con ellos.", valor: 0, explica: "La iglesia envía al equipo con su bendición: existe para la misión." },
                ],
              },
            ],
          },
          {
            apoyo: "Seguir unida a la iglesia hija con apoyo y amistad, sin controlarla",
            ref: "Filipenses 1:5-6",
            situacion: "Hace dos años tu iglesia envió un equipo a plantar una iglesia hija en un pueblo cercano. Hoy esa iglesia crece y tiene sus propios líderes.",
            escenas: [
              {
                id: "e1",
                narra: "La iglesia hija quiere cambiar el horario de su reunión.",
                pregunta: "¿Qué hace tu iglesia?",
                opciones: [
                  { texto: "La deja decidir, y le ofrece apoyo si lo necesita.", valor: 2, explica: "Se sigue unida a la iglesia hija con apoyo y amistad, sin controlarla.", siguiente: "e2" },
                  { texto: "Le da su opinión, aunque nadie se la haya pedido.", valor: 1, explica: "Opinar no es malo, pero se acompaña a la iglesia hija sin controlarla.", siguiente: "e2" },
                  { texto: "Le exige que le pida permiso para cualquier cambio.", valor: 0, explica: "Se acompaña a la iglesia hija sin controlarla.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Los líderes de la iglesia hija se sienten controlados y dejan de llamar.",
                pregunta: "¿Qué hacen ahora?",
                opciones: [
                  { texto: "Les piden perdón y siguen unidos con apoyo y amistad.", valor: 2, explica: "Se sigue unida a la iglesia hija con apoyo y amistad, sin controlarla.", siguiente: "e2" },
                  { texto: "Les recuerdan que la iglesia que los envió manda en todo.", valor: 0, explica: "Una iglesia que se multiplica acompaña a sus iglesias hijas sin controlarlas.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "La iglesia hija pasa por un tiempo difícil y pide ayuda.",
                pregunta: "¿Qué hace tu iglesia?",
                opciones: [
                  { texto: "La apoya y la acompaña con amistad, sin controlarla.", valor: 2, explica: "Se sigue unida a la iglesia hija con apoyo y amistad, sin controlarla." },
                  { texto: "Le manda una ayuda, pero no vuelve a visitarla.", valor: 1, explica: "La ayuda sirve, pero también se sigue unida a ella con amistad." },
                  { texto: "Le dice que se las arregle sola, porque ya es grande.", valor: 0, explica: "La iglesia que envía sigue unida a la iglesia hija con apoyo y amistad." },
                ],
              },
              {
                id: "e3",
                narra: "Ahora la iglesia hija habla de plantar otra iglesia en un pueblo vecino.",
                pregunta: "¿Qué piensas?",
                opciones: [
                  { texto: "Que es el fruto: una iglesia sana da a luz otras.", valor: 2, explica: "El fruto de una iglesia plantada es que plante otras: una iglesia sana da a luz otras iglesias." },
                  { texto: "Que está bien, si antes lo consulta con tu iglesia.", valor: 1, explica: "Conversarlo puede ayudar, pero lo importante es que una iglesia sana da a luz otras, y se la acompaña sin controlarla." },
                  { texto: "Que es muy pronto: una iglesia hija no planta otras.", valor: 0, explica: "Una iglesia joven, como la de Tesalónica, ya extendió el evangelio: una iglesia sana da a luz otras." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para que una iglesia nueva llegue a plantar otra, del primero al último.",
            pasos: [
              "Enseñar desde el primer día que la iglesia existe para la misión",
              "Formar a futuros plantadores dentro de la iglesia",
              "Enviar un equipo con la bendición de la iglesia",
              "Seguir unida a la iglesia hija con apoyo y amistad",
            ],
            apoyo: "Una iglesia que se multiplica enseña desde el principio que existe para la misión, ora por nuevos lugares, forma plantadores, envía equipos y acompaña a sus iglesias hijas sin controlarlas",
            explica: "Desde el primer día se enseña que la iglesia existe para la misión; después se forman plantadores dentro de la iglesia, se envía un equipo con la bendición de la iglesia y se sigue unida a la iglesia hija con apoyo y amistad, sin controlarla.",
          },
          {
            consigna: "La iglesia de la colonia Esperanza quiere plantar una iglesia hija. Ordena sus pasos, del primero al último.",
            pasos: [
              "Desde su primer culto, enseña que existe para la misión",
              "Forma a varios hermanos como futuros plantadores",
              "Los envía como equipo, con la bendición de toda la iglesia",
              "Sigue unida a la nueva iglesia, con apoyo y sin controlarla",
            ],
            apoyo: "Formar a futuros plantadores dentro de la iglesia",
            explica: "Primero se enseña desde el principio que la iglesia existe para la misión; luego se forma a futuros plantadores, se los envía como equipo con la bendición de la iglesia y se sigue unida a la iglesia hija, con apoyo y amistad, sin controlarla.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El fruto de una iglesia plantada es que plante otras",
            ref: "1 Tesalonicenses 1:8",
            clave: {
              id: "pr-evangelismo-misiones-5-6-a6-1",
              tipo: "corta",
              pregunta: "¿Por qué una iglesia sana planta nuevas iglesias? Da un ejemplo del Nuevo Testamento.",
              ideas: [
                { id: "fruto", peso: 50, texto: "Porque el fruto de una iglesia plantada no es solo que crezca, sino que plante otras: la iglesia existe para la misión.", formas: ["un dia plante otras", "da a luz", "dar a luz", "existe para la mision", "para la mision", "no solo (crece|crezca|crecer)", "se multiplic*"] },
                { id: "ejemplo", peso: 50, texto: "Como Tesalónica, de donde salió la palabra a otras regiones, o Éfeso, de donde llegó a toda Asia.", formas: ["tesalonic*", "efeso", "asia", "macedonia", "acaya", "antioquia", "filipos", "filipenses"] },
              ],
              modelo: "Porque el fruto de una iglesia plantada no es solo que crezca, sino que un día plante otras: la iglesia existe para la misión. Así fue Tesalónica: de ella salió la palabra del Señor a otras regiones.",
            },
          },
          {
            apoyo: "Una iglesia sana no solo crece: da a luz otras iglesias",
            ref: "1 Tesalonicenses 1:8",
            clave: {
              id: "pr-evangelismo-misiones-5-6-a6-2",
              tipo: "corta",
              pregunta: "Un hermano dice que la iglesia nueva primero tiene que crecer mucho, y que plantar otras será para dentro de muchos años. ¿Qué le respondes?",
              ideas: [
                { id: "principio", peso: 50, texto: "Que desde el primer día se enseña que la iglesia existe para la misión.", formas: ["desde el (principio|comienzo|inicio)", "desde el primer dia", "desde (ya|ahora|hoy)", "existe para la mision", "para la mision"] },
                { id: "joven", peso: 50, texto: "Que una iglesia joven, como la de Tesalónica, ya puede extender el evangelio: una iglesia sana da a luz otras.", formas: ["iglesia joven", "tesalonic*", "efeso", "da a luz", "dar a luz", "un dia plante otras"] },
              ],
              modelo: "Le respondo que desde el primer día se enseña que la iglesia existe para la misión. Una iglesia joven, como la de Tesalónica, ya extendió el evangelio: una iglesia sana no solo crece, da a luz otras iglesias.",
            },
          },
        ],
      },
    ],
  },
};
