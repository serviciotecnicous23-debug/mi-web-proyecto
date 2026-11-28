/**
 * Las prácticas de la materia `alabanza-3` (especialidad Alabanza y adoración · Dirigir el ministerio de alabanza).
 * Hechas solo con lo que dice cada lección (server/academia/contenido/alabanza-3.ts), con la guía de
 * docs/academia-practicas.md. No repiten las de las materias de liderazgo de los niveles (n3-liderazgo-1,
 * n5-liderazgo-2) ni las de homilética: aquí todo pasa en el ministerio de alabanza (el director, el equipo, el ensayo
 * y el culto).
 *
 * Cuidado doctrinal: la lección 1 marca como punto de la declaración de fe por confirmar quién puede ejercer cada cargo
 * de la iglesia (su nota Quién puede dirigir). Ninguna actividad pregunta por eso ni usa esa nota: se practica lo que
 * la lección afirma sin reservas (el director es un siervo que guía, adora, conoce al pueblo, se prepara y sirve bajo
 * la dirección de sus pastores; Quenanías fue puesto y sabía de música). En la lección 5, de las citas de 1 Crónicas
 * 25:1 y 2 Timoteo 2:2 (hombres idóneos, hombres fieles) no se pregunta quién puede servir: solo lo que la lección pide
 * para servir en el equipo y cómo se forma; 2 Timoteo 2:2 no va como pasaje (ya lo practica n5-liderazgo-2). De los
 * estilos de música solo se pregunta lo que la lección afirma (la unidad de la iglesia vale más que el gusto de
 * cualquiera), nunca qué estilo es mejor o más bíblico.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_ALABANZA_3: PracticasMateria = {
  materia: "alabanza-3",
  mision: {
    titulo: "Un año al frente de la alabanza",
    intro: "Tu iglesia te pidió que ayudes a dirigir su ministerio de alabanza durante este año, bajo la dirección de tus pastores. Vas a recorrer todo el camino: guiar al pueblo como un siervo, escoger los cantos con criterios bíblicos, preparar el culto y el ensayo, dirigir con orden y sin manipular, formar al equipo y a los que vendrán después, y resolver los problemas con la Palabra. Repasa las seis lecciones para tener listo cada paso.",
    cierre: "Ya sabes dirigir como un siervo que guía al pueblo a Dios: escoger cantos que dicen la verdad y que toda la iglesia puede cantar, preparar el culto y el ensayo con excelencia y sin perfeccionismo, guiar con orden y sin trucos, formar a otros que sigan la obra y cuidar la unidad. El mejor director es el que menos se nota y más ayuda a cantar.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El director: un siervo que guía
    "alabanza-3-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué fue puesto Quenanías para dirigir el canto?", reverso: "Porque era entendido en ello: sabía de música.", apoyo: "Quenanías fue puesto para dirigir porque era entendido en ello" },
              { frente: "¿Quién es el modelo de todo líder?", reverso: "Jesús, que no vino para ser servido, sino para servir.", apoyo: "Jesús es el modelo de todo líder" },
              { frente: "¿A quiénes sirve el director de alabanza?", reverso: "A Dios y al pueblo.", apoyo: "El director sirve a Dios y al pueblo" },
              { frente: "¿Cuál es el mejor director, según la lección?", reverso: "El que menos se nota y más ayuda a cantar.", apoyo: "El mejor director es el que menos se nota y más ayuda a cantar" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Desde cuándo hubo directores de cantores en Israel?", reverso: "Desde el tiempo de David y de Asaf.", apoyo: "desde David hubo directores de cantores" },
              { frente: "¿Qué hizo el rey Josafat cuando Judá enfrentó a un gran ejército?", reverso: "Puso cantores que alabaran a Jehová mientras salía la gente armada.", apoyo: "el rey Josafat puso cantores que alabaran a Jehová mientras salía la gente armada" },
              { frente: "¿Era la alabanza de Josafat una fórmula para ganar batallas?", reverso: "No: era un pueblo que confiaba en Dios y lo alababa antes de ver la victoria.", apoyo: "No era una fórmula para ganar batallas" },
              { frente: "¿Bajo la dirección de quién sirve el director de alabanza?", reverso: "Bajo la dirección de sus pastores.", apoyo: "Obedece: sirve bajo la dirección de sus pastores" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Por qué fue puesto Quenanías para dirigir el canto? Toca las palabras que lo dicen.",
            texto: "Quenanías, principal de los levitas en la música, fue puesto para dirigir el canto, porque [[era entendido en ello]]",
            apoyo: "Dos cosas se dicen de él: fue puesto por los responsables, y sabía de música",
            ref: "1 Crónicas 15:22",
            explica: "Quenanías fue puesto para dirigir el canto «porque era entendido en ello»: sabía de música. Y no se puso él mismo: fue puesto por los responsables.",
          },
          {
            consigna: "En tiempos de Nehemías, el pueblo recordaba que desde David y Asaf alguien guiaba los cánticos. ¿Quién? Toca las palabras que lo dicen.",
            texto: "desde el tiempo de David y de Asaf, ya de antiguo, había [[un director de cantores]] para los cánticos y alabanzas y acción de gracias a Dios",
            apoyo: "Dirigir el canto del pueblo es un servicio antiguo en la Biblia",
            ref: "Nehemías 12:46",
            explica: "Desde el tiempo de David y de Asaf había «un director de cantores para los cánticos y alabanzas y acción de gracias a Dios»: dirigir el canto del pueblo es un servicio antiguo en la Biblia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Quenanías y los directores de cantores de Israel: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Quenanías fue puesto para dirigir el canto porque era entendido en ello.", verdad: true, explica: "Así lo dice la Biblia: «fue puesto para dirigir el canto, porque era entendido en ello».", apoyo: "Quenanías fue puesto para dirigir porque era entendido en ello", ref: "1 Crónicas 15:22" },
              { texto: "Quenanías se puso a dirigir el canto por su cuenta, sin que nadie lo pusiera.", verdad: false, explica: "Quenanías fue puesto por los responsables: no se puso él mismo.", apoyo: "fue puesto por los responsables, y sabía de música", ref: "1 Crónicas 15:22" },
              { texto: "Dirigir el canto del pueblo es un servicio antiguo en la Biblia.", verdad: true, explica: "Desde el tiempo de David y de Asaf había un director de cantores.", apoyo: "Dirigir el canto del pueblo es un servicio antiguo en la Biblia", ref: "Nehemías 12:46" },
            ],
          },
          {
            consigna: "Sobre los que dirigían el canto en Israel: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En tiempos de Nehemías se recordaba que desde David había un director de cantores.", verdad: true, explica: "El pueblo recordaba que «desde el tiempo de David y de Asaf, ya de antiguo, había un director de cantores».", apoyo: "desde David hubo directores de cantores", ref: "Nehemías 12:46" },
              { texto: "A Quenanías lo pusieron a dirigir el canto aunque no sabía nada de música.", verdad: false, explica: "Quenanías sabía de música: fue puesto porque era entendido en ello.", apoyo: "Dos cosas se dicen de él: fue puesto por los responsables, y sabía de música", ref: "1 Crónicas 15:22" },
              { texto: "Dirigir el canto del pueblo empezó con la iglesia, después de Cristo.", verdad: false, explica: "Es un servicio antiguo: desde el tiempo de David y de Asaf había un director de cantores.", apoyo: "Dirigir el canto del pueblo es un servicio antiguo en la Biblia", ref: "Nehemías 12:46" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre el papel del director.",
            texto: "El director es un [[siervo]], como Cristo, que vino a servir: [[guía]] al pueblo a [[mirar]] a Dios y a confiar en él.",
            distractores: ["artista", "obliga", "olvidar"],
            errores: {
              artista: "El director no es un artista: es un siervo, como Cristo, que vino a servir.",
              obliga: "El director guía: ayuda al pueblo a cantar y a responder a Dios.",
              olvidar: "El director guía al pueblo a mirar a Dios y a confiar en él.",
            },
            apoyo: "El director es un siervo, como Cristo, que vino a servir: guía al pueblo a mirar a Dios y a confiar en él",
            ref: "Marcos 10:45",
            explica: "Jesús es el modelo de todo líder: no vino para ser servido, sino para servir. Así el director es un siervo que guía al pueblo a mirar a Dios y a confiar en él.",
          },
          {
            consigna: "Completa lo que hace el director que sirve.",
            texto: "El director [[adora]] con sinceridad, [[conoce]] a la iglesia, se [[prepara]] y sirve bajo sus pastores.",
            distractores: ["finge", "ignora", "luce"],
            errores: {
              finge: "El director adora con sinceridad: es el primero en adorar.",
              ignora: "El director conoce al pueblo: sabe qué puede cantar y qué está viviendo la iglesia.",
              luce: "El director se prepara: llega con todo planeado y ensayado.",
            },
            apoyo: "adora con sinceridad, conoce a la iglesia, se prepara y sirve bajo sus pastores",
            explica: "El director adora: es el primero en adorar con sinceridad. Conoce al pueblo, se prepara con todo planeado y ensayado, y sirve bajo la dirección de sus pastores.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un director que adora delante del pueblo o uno que actúa como un artista? Lleva cada frase a su grupo.",
            grupos: ["Adora delante del pueblo", "Actúa como un artista"],
            frases: [
              { texto: "Es el primero en adorar con sinceridad", grupo: 0 },
              { texto: "Ayuda al pueblo a cantar y a responder a Dios", grupo: 0 },
              { texto: "Busca que todos miren a Cristo", grupo: 0 },
              { texto: "Ayuda a toda la iglesia a volver la mirada a Dios", grupo: 0 },
              { texto: "Actúa para el pueblo, como en un concierto", grupo: 1 },
              { texto: "Busca que la gente lo mire a él", grupo: 1 },
              { texto: "Se siente el cantante principal del culto", grupo: 1 },
              { texto: "Quiere notarse más que ayudar a cantar", grupo: 1 },
            ],
            apoyo: "El director de alabanza no es el cantante principal de un concierto",
            ref: "Marcos 10:45",
            explica: "El director adora delante del pueblo: es el primero en adorar con sinceridad y ayuda a todos a mirar a Cristo. No actúa para el pueblo, como un artista en un concierto.",
          },
          {
            consigna: "¿Qué muestra cada ejemplo: un director que adora delante del pueblo o uno que actúa como un artista? Lleva cada frase a su grupo.",
            grupos: ["Adora delante del pueblo", "Actúa como un artista"],
            frases: [
              { texto: "Escoge cantos que la iglesia sabe y puede cantar", grupo: 0 },
              { texto: "Se alegra si la iglesia cantó, aunque nadie lo felicite", grupo: 0 },
              { texto: "Canta con sinceridad, para que todos miren a Cristo", grupo: 0 },
              { texto: "Alarga sus solos para que lo aplaudan", grupo: 1 },
              { texto: "Elige cantos que lucen su voz, aunque nadie los pueda cantar", grupo: 1 },
              { texto: "Se molesta si la gente no lo mira mientras canta", grupo: 1 },
              { texto: "Prepara el culto como si fuera su propio concierto", grupo: 1 },
            ],
            apoyo: "El mejor director es el que menos se nota y más ayuda a cantar",
            explica: "El director que adora delante del pueblo ayuda a cantar y a mirar a Cristo; el que actúa como un artista busca que lo miren a él. El mejor director es el que menos se nota y más ayuda a cantar.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El director sirve a Dios y al pueblo: no busca que lo miren a él, sino que todos miren a Cristo",
            ref: "Marcos 10:45",
            situacion: "Eres el nuevo director de alabanza de tu iglesia, y este domingo diriges por primera vez. Tienes buena voz, y el equipo te admira.",
            escenas: [
              {
                id: "e1",
                narra: "El equipo te propone abrir el culto con un canto que luce tu voz, aunque la iglesia no lo conoce.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Abrir con un canto que la iglesia ya conoce y puede cantar.", valor: 2, explica: "El director conoce al pueblo: sabe qué puede cantar. No busca lucirse, sino ayudar a todos a cantar.", siguiente: "e2" },
                  { texto: "Abrir con el canto que luce tu voz, para que te conozcan.", valor: 0, explica: "El director no es el cantante principal de un concierto: no busca que lo miren a él.", siguiente: "e1b" },
                  { texto: "Abrir con ese canto, pero invitando a todos a cantar contigo.", valor: 1, explica: "Invitar a cantar está bien, pero el director conoce al pueblo y sabe qué puede cantar: la iglesia no conoce ese canto.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Mientras cantas, notas que la gente te mira, pero casi nadie canta.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Pasas a un canto conocido y animas a todos a cantar.", valor: 2, explica: "El director guía: ayuda al pueblo a cantar y a responder a Dios, no actúa para él.", siguiente: "e2" },
                  { texto: "Sigues igual: lo que importa es tu voz.", valor: 0, explica: "El mejor director es el que menos se nota y más ayuda a cantar.", siguiente: "e2" },
                  { texto: "Terminas ese canto como está, y después pasas a uno conocido.", valor: 1, explica: "Pasar a un canto conocido está bien, pero mejor hacerlo ya: el director ayuda al pueblo a cantar, no actúa para él.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la mitad del culto, el equipo quiere alargar un solo tuyo, porque a la gente le gusta mucho.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que no hace falta: tu tarea es que toda la iglesia cante.", valor: 2, explica: "El director guía: ayuda al pueblo a cantar y a responder a Dios, no actúa para él." },
                  { texto: "Que sí: si a la gente le gusta tu voz, el culto va muy bien.", valor: 0, explica: "El director no busca que lo miren a él, sino que todos miren a Cristo." },
                  { texto: "Que lo alarguen un poco, y después cantan todos.", valor: 1, explica: "Volver a cantar todos está bien, pero el director no busca que lo miren a él: el mejor director es el que menos se nota." },
                ],
              },
              {
                id: "e3",
                narra: "Después del culto, el pastor te pregunta cómo sabes si dirigiste bien.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Si la iglesia cantó y miró a Cristo, aunque no me notara.", valor: 2, explica: "El mejor director es el que menos se nota y más ayuda a cantar." },
                  { texto: "Si la gente me aplaudió y me felicitó al final.", valor: 0, explica: "El director no busca que lo miren a él, sino que todos miren a Cristo." },
                  { texto: "Si mi voz sonó perfecta en cada uno de los cantos del culto.", valor: 0, explica: "El director no es el cantante principal de un concierto: es un siervo que ayuda a la iglesia a volver la mirada a Dios." },
                ],
              },
            ],
          },
          {
            apoyo: "Adora: es el primero en adorar con sinceridad",
            ref: "Marcos 10:45",
            situacion: "Te piden dirigir la alabanza en un culto especial de tu iglesia, con muchos invitados. Varios te dicen que es tu gran oportunidad.",
            escenas: [
              {
                id: "e1",
                narra: "Un amigo del equipo te dice: Este es tu momento: luce tu voz, que todos te vean.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que tu tarea es ayudar a todos a volver la mirada a Dios.", valor: 2, explica: "El director es un siervo que ayuda a toda la iglesia a volver la mirada a Dios.", siguiente: "e2" },
                  { texto: "Que tiene razón: esta es la noche para que te conozcan.", valor: 0, explica: "El director de alabanza no es el cantante principal de un concierto.", siguiente: "e1b" },
                  { texto: "Que lucirás tu voz en un solo canto, y en los demás guiarás.", valor: 1, explica: "Guiar está bien, pero el director no busca que lo miren a él, sino que todos miren a Cristo.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "En el primer canto cantas para lucirte, y la iglesia se queda callada mirándote.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Vuelves a guiar: invitas a todos a cantar y adoras con ellos.", valor: 2, explica: "El director guía: ayuda al pueblo a cantar y a responder a Dios, no actúa para él.", siguiente: "e2" },
                  { texto: "Sigues así: si te miran, es porque lo estás haciendo muy bien.", valor: 0, explica: "El mejor director es el que menos se nota y más ayuda a cantar.", siguiente: "e2" },
                  { texto: "Te enojas con la iglesia porque no canta contigo.", valor: 0, explica: "Si la iglesia no canta, el director vuelve a guiar: ayuda al pueblo a cantar y a responder a Dios.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la mitad del culto, la iglesia canta con fuerza un canto de alabanza a Dios.",
                pregunta: "¿Qué haces tú?",
                opciones: [
                  { texto: "Adoras con sinceridad a Dios, como el primero en adorar.", valor: 2, explica: "Adora: es el primero en adorar con sinceridad." },
                  { texto: "Cantas encima de todos con adornos, para que se note tu voz.", valor: 0, explica: "El director no busca que lo miren a él, sino que todos miren a Cristo." },
                  { texto: "Dejas de cantar y miras a la gente, a ver si te aplauden.", valor: 0, explica: "El director es el primero en adorar con sinceridad: no actúa para el pueblo." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, alguien te dice: ¡Qué concierto! Eres todo un artista.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que no era un concierto: querías que todos miraran a Cristo.", valor: 2, explica: "El director de alabanza no es el cantante principal de un concierto: busca que todos miren a Cristo." },
                  { texto: "Que gracias: te preparaste mucho para que todos te admiraran.", valor: 0, explica: "El director no busca que lo miren a él, sino que todos miren a Cristo." },
                  { texto: "Que sí, y que el próximo culto cantarás más solos.", valor: 0, explica: "El mejor director es el que menos se nota y más ayuda a cantar." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El director es un siervo, como Cristo, que vino a servir",
            ref: "Marcos 10:45",
            clave: {
              id: "pr-alabanza-3-1-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué se dice que el director de alabanza es un siervo, y qué hace como siervo?",
              ideas: [
                { id: "cristo", peso: 50, texto: "Porque sigue a Cristo, el modelo de todo líder, que no vino para ser servido, sino para servir.", formas: ["como cristo", "como jesus", "vino (a|para) servir", "no vino para ser servido", "para ser servido", "modelo de todo lider", "(modelo|ejemplo) (es|de) (cristo|jesus)", "(sigue|imita|seguir|imitar) (a|al) (cristo|jesus|ejemplo|senor)"] },
                { id: "hace", peso: 50, texto: "Como siervo guía al pueblo a mirar a Dios y a confiar en él, adora con sinceridad, conoce a la iglesia, se prepara y sirve bajo sus pastores.", formas: ["guia al pueblo", "(guia|ayuda|lleva) (al|a) (pueblo|iglesia|todos|gente|congregacion)", "mir* a (dios|cristo|jesus)", "mirada a (dios|cristo)", "confi* en (dios|el)", "no busca que lo miren", "(volver|vuelva|vuelvan) la mirada", "sirve a dios", "sirve al pueblo", "servir a dios", "servir al pueblo", "dios y al pueblo", "ador* con sinceridad", "conoce (a|al|lo) (la|pueblo|iglesia|que)", "se prepara", "bajo (sus|los) pastores", "obedece (a|al) (sus|los|pastor|pastores)"] },
              ],
              errores: [
                { id: "lucirse", texto: "El director no es el cantante principal de un concierto: no busca que lo miren a él.", formas: ["(busca|buscar|quiere) que lo miren", "(busca|buscar|quiere) lucir*", "(es|ser) (un|el) artista"], anula: "hace" },
              ],
              modelo: "El director es un siervo porque sigue a Cristo, que no vino para ser servido, sino para servir. Guía al pueblo a mirar a Dios y a confiar en él, sirve a Dios y al pueblo, adora con sinceridad y se prepara.",
            },
          },
          {
            apoyo: "es un siervo que ayuda a toda la iglesia a volver la mirada a Dios",
            ref: "Marcos 10:45",
            clave: {
              id: "pr-alabanza-3-1-a7-2",
              tipo: "corta",
              pregunta: "Un joven del equipo te dice que el director de alabanza es como el cantante principal de un concierto. ¿Qué le explicas?",
              ideas: [
                { id: "siervo", peso: 50, texto: "Que no es el cantante principal de un concierto: es un siervo, como Cristo, que vino a servir.", formas: ["siervo", "servidor", "vino (a|para) servir", "como cristo", "como jesus", "sirve a dios", "sirve al pueblo", "servir a dios", "servir al pueblo"] },
                { id: "mirada", peso: 50, texto: "Que ayuda a toda la iglesia a volver la mirada a Dios: no busca que lo miren a él, sino que todos miren a Cristo.", formas: ["volver la mirada", "mirada a (dios|cristo)", "mir* a (dios|cristo|jesus)", "no busca que lo miren", "(ayuda|guia|lleva) (a|al) (toda|iglesia|pueblo|todos|gente|congregacion)", "ayud* a cantar", "todos miren", "menos se nota"] },
              ],
              errores: [
                { id: "razon", texto: "El director de alabanza no es el cantante principal de un concierto: es un siervo.", formas: ["tiene razon", "(es|son) (como|igual) (un|el|a) (cantante|artista)"], anula: "siervo" },
              ],
              modelo: "Le explico que el director no es el cantante principal de un concierto, sino un siervo, como Cristo, que vino a servir. Ayuda a toda la iglesia a volver la mirada a Dios: no busca que lo miren a él.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Escoger las canciones
    "alabanza-3-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué escoger los cantos es una de las tareas más importantes del director?", reverso: "Porque lo que se canta enseña, forma y ayuda a adorar.", apoyo: "Escoger los cantos de un culto es una de las tareas más importantes del director: lo que se canta enseña, forma y ayuda a adorar" },
              { frente: "Salmos, himnos y cánticos espirituales: ¿qué propósito tienen?", reverso: "Que la palabra de Cristo more en el pueblo.", apoyo: "Hay variedad de formas, pero un mismo propósito: que la palabra de Cristo more en el pueblo" },
              { frente: "¿Cuál es la regla para lo que se hace en la reunión de la iglesia?", reverso: "«Hágase todo para edificación».", apoyo: "En la reunión de la iglesia, la regla es clara: «Hágase todo para edificación»" },
              { frente: "En el culto, ¿de quién es el canto?", reverso: "De toda la congregación, no solo del equipo.", apoyo: "el canto es de toda la congregación, no solo del equipo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pide el salmista con las palabras «Cantad con inteligencia»?", reverso: "Que el pueblo entienda lo que canta.", apoyo: "El pueblo tiene que entender lo que canta" },
              { frente: "¿Hay lugar para los cantos nuevos en el culto?", reverso: "Sí: «Cantad a Jehová cántico nuevo».", apoyo: "También hay lugar para lo nuevo" },
              { frente: "¿Qué pasa si todos los cantos del culto son nuevos?", reverso: "El pueblo deja de cantar y solo escucha.", apoyo: "Si todo es nuevo, el pueblo deja de cantar y solo escucha" },
              { frente: "¿Cómo se mide un culto, según la lección?", reverso: "Por cuánto cantó la iglesia, no por cuánto cantó el equipo.", apoyo: "Un culto no se mide por cuánto cantó el equipo, sino por cuánto cantó la iglesia" },
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
            consigna: "Une cada una de las cinco preguntas para escoger un canto con lo que revisa.",
            pares: [
              ["¿Dice la verdad sobre Dios?", "Que su letra esté de acuerdo con la Biblia"],
              ["¿Pone a Cristo en el centro?", "Que Cristo y su obra sean lo principal"],
              ["¿La puede cantar el pueblo?", "Una melodía clara y un tono cómodo para la congregación"],
              ["¿Sirve al tema del culto?", "Que vaya con el mensaje de ese día"],
              ["¿Hay equilibrio?", "Entre lo nuevo y lo conocido, y entre generaciones"],
            ],
            apoyo: "Se escogen cantos que dicen la verdad, ponen a Cristo en el centro, el pueblo puede entender y cantar, sirven al tema del culto y edifican a la iglesia",
            ref: "1 Corintios 14:26",
            explica: "Cada canto se revisa con cinco preguntas: si dice la verdad sobre Dios según la Biblia, si pone a Cristo y su obra en el centro, si la puede cantar el pueblo, si sirve al tema del culto y si hay equilibrio entre lo nuevo y lo conocido.",
          },
          {
            consigna: "Te proponen varios cantos para el domingo. Une cada problema con la pregunta que ese canto no pasa.",
            pares: [
              ["Su letra dice algo de Dios que la Biblia no enseña", "¿Dice la verdad sobre Dios, según la Biblia?"],
              ["Casi no habla de Cristo ni de lo que él hizo", "¿Pone a Cristo y su obra en el centro?"],
              ["Su tono es tan alto que solo llega el cantante", "¿La puede cantar el pueblo?"],
              ["Es de Navidad, y el mensaje del día es sobre el perdón", "¿Sirve al tema del culto y al mensaje de ese día?"],
              ["Toda la lista es nueva, y la iglesia no conoce ninguno", "¿Hay equilibrio entre lo nuevo y lo conocido?"],
            ],
            apoyo: "Cinco preguntas para escoger un canto",
            explica: "Un canto que dice algo que la Biblia no enseña no pasa la primera pregunta; uno sin Cristo en el centro, la segunda; uno que solo llega el cantante, la tercera; uno que no va con el mensaje, la cuarta; y una lista toda nueva, la quinta.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Cómo pide el salmista que cante el pueblo? Toca las palabras que lo dicen.",
            texto: "Porque Dios es el Rey de toda la tierra; [[Cantad con inteligencia]]",
            apoyo: "El pueblo tiene que entender lo que canta",
            ref: "Salmos 47:7",
            explica: "El salmista pide: «Cantad con inteligencia». El pueblo tiene que entender lo que canta, y por eso se escogen cantos que pueda entender y cantar.",
          },
          {
            consigna: "¿A quiénes llama a cantar el salmo? Toca las palabras que lo dicen.",
            texto: "Cantad a Jehová cántico nuevo; Cantad a Jehová, [[toda la tierra]]",
            apoyo: "Y el canto es de toda la congregación, no solo del equipo",
            ref: "Salmos 96:1",
            explica: "El salmo llama a cantar a «toda la tierra»: el canto es de toda la congregación, no solo del equipo. Por eso el pueblo tiene que poder cantar lo que se escoge.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 0,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Escoger los cantos de un culto es una de las tareas más importantes del director",
            ref: "1 Corintios 14:26",
            titulo: "La lista del domingo",
            relato: [
              "Eres el director de alabanza. El domingo, el pastor predicará sobre la gracia de Dios que perdona, y te toca escoger los cantos.",
              "El equipo te propone tres: uno de moda que al equipo le encanta, pero en un tono tan alto que solo llega el cantante; un himno sobre la cruz de Cristo que la iglesia conoce bien; y uno nuevo cuya letra dice algo de Dios que la Biblia no enseña.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero con la lista que te propone el equipo?",
                opciones: [
                  { texto: "Reviso cada canto con las cinco preguntas de la lección.", bien: true, explica: "Un canto se escoge porque edifica a la iglesia, y las cinco preguntas ayudan a saber si lo hace." },
                  { texto: "Escojo los que más le gustan al equipo que canta.", explica: "Un canto se escoge porque edifica a la iglesia, no solo porque le gusta al equipo." },
                  { texto: "Escojo los que están de moda, para que la iglesia se anime.", explica: "Un canto no se escoge solo porque está de moda: se escoge porque edifica a la iglesia." },
                ],
                apoyo: "Un canto se escoge porque edifica a la iglesia, no solo porque está de moda o le gusta al equipo",
                explica: "En la reunión de la iglesia, la regla es clara: «Hágase todo para edificación».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el canto nuevo cuya letra dice algo de Dios que la Biblia no enseña?",
                opciones: [
                  { texto: "Lo dejo fuera: no dice la verdad sobre Dios, según la Biblia.", bien: true, explica: "La primera pregunta es: ¿dice la verdad sobre Dios, según la Biblia? Lo que se canta enseña y forma." },
                  { texto: "Lo canto igual, porque su melodía es muy bonita.", explica: "Lo que se canta enseña y forma: una melodía bonita no basta si la letra no dice la verdad sobre Dios." },
                  { texto: "Lo canto, pero le pido a la iglesia que no se fije en la letra.", explica: "El pueblo tiene que entender lo que canta, y lo que se canta enseña: la letra importa." },
                ],
                apoyo: "¿Dice la verdad sobre Dios, según la Biblia?",
                explica: "Lo que se canta enseña y forma: un canto que no dice la verdad sobre Dios no pasa la primera pregunta.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el canto de moda que solo el cantante puede cantar?",
                opciones: [
                  { texto: "Le busco un tono cómodo para la congregación, no solo para él.", bien: true, explica: "¿La puede cantar el pueblo? Una melodía clara y un tono cómodo para la congregación, no solo para el cantante." },
                  { texto: "Lo dejo así: la iglesia puede escuchar mientras el cantante canta.", explica: "El canto es de toda la congregación, no solo del equipo: si solo escucha, el pueblo deja de cantar." },
                  { texto: "Lo subo un poco más, para que el cantante se luzca.", explica: "El tono se escoge cómodo para la congregación, no para que se luzca el cantante." },
                ],
                apoyo: "Una melodía clara y un tono cómodo para la congregación, no solo para el cantante",
                explica: "El canto es de toda la congregación: se busca un tono cómodo para ella, no solo para el cantante.",
              },
              {
                tipo: "explica",
                apoyo: "Lo que se canta enseña y forma",
                clave: {
                  id: "pr-alabanza-3-2-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué cantos le presentas al pastor para el domingo, y por qué los escoges así?",
                  ideas: [
                    { id: "cristo", peso: 50, texto: "El himno sobre la cruz: pone a Cristo y su obra en el centro y sirve al tema de la gracia que perdona.", formas: ["himno", "la cruz", "cristo (en|al) (el|centro)", "su obra", "obra de cristo", "tema (del|de) (culto|gracia|mensaje|dia)", "sirv* al (tema|mensaje)", "va con el (tema|mensaje)"] },
                    { id: "edifica", peso: 50, texto: "Cantos que dicen la verdad sobre Dios, que la iglesia puede cantar en un tono cómodo y que la edifican, no solo porque están de moda.", formas: ["edific*", "dic* la verdad", "verdad sobre dios", "segun la biblia", "(pueda|puede|puedan|pueden) cantar", "tono comodo", "cinco preguntas"] },
                  ],
                  errores: [
                    { id: "moda", texto: "Un canto no se escoge solo porque está de moda o le gusta al equipo.", formas: ["porque (esta|estan) de moda", "porque (le|les) gusta* al equipo", "porque al equipo le gusta*"], anula: "edifica" },
                  ],
                  modelo: "Le presento el himno sobre la cruz, porque pone a Cristo y su obra en el centro y sirve al tema de la gracia. También el canto de moda en un tono cómodo, porque escojo cantos que dicen la verdad, que la iglesia puede cantar y que la edifican.",
                },
              },
            ],
          },
          {
            apoyo: "Se escogen cantos que dicen la verdad, ponen a Cristo en el centro, el pueblo puede entender y cantar, sirven al tema del culto y edifican a la iglesia",
            ref: "Salmos 96:1",
            titulo: "El culto de aniversario",
            relato: [
              "Eres el director de alabanza. La iglesia celebra su aniversario: vendrán los hermanos mayores que la fundaron y muchos jóvenes. El mensaje será sobre la fidelidad de Dios.",
              "El equipo te pasa una lista de cuatro cantos nuevos que solo conoce el equipo. Tú piensas también en un himno sobre la fidelidad de Dios que los mayores aman, y en un coro que conoce toda la iglesia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué problema tiene la lista de cuatro cantos nuevos?",
                opciones: [
                  { texto: "Si todo es nuevo, el pueblo deja de cantar y solo escucha.", bien: true, explica: "Un canto nuevo se enseña con paciencia y se acompaña con cantos que la iglesia ya conoce: si todo es nuevo, el pueblo solo escucha." },
                  { texto: "Ninguno: lo nuevo siempre edifica más que lo conocido.", explica: "Hay lugar para lo nuevo, pero en equilibrio con lo conocido: si todo es nuevo, el pueblo deja de cantar." },
                  { texto: "Que en un culto de la iglesia nunca se cantan cantos nuevos.", explica: "Hay lugar para lo nuevo: «Cantad a Jehová cántico nuevo». Lo que falta es equilibrio." },
                ],
                apoyo: "Si todo es nuevo, el pueblo deja de cantar y solo escucha",
                explica: "Hay lugar para el cántico nuevo, en equilibrio con lo conocido, para que toda la congregación cante.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pregunta te ayuda a pensar a la vez en los mayores y en los jóvenes?",
                opciones: [
                  { texto: "¿Hay equilibrio entre los cantos de distintas generaciones?", bien: true, explica: "La quinta pregunta busca equilibrio entre lo nuevo y lo conocido, y entre cantos de distintas generaciones." },
                  { texto: "¿Cuáles son los cantos que más le gustan a todo el equipo?", explica: "Un canto no se escoge solo porque le gusta al equipo: se escoge porque edifica a la iglesia." },
                  { texto: "¿Qué cantos están más de moda entre los jóvenes de la iglesia?", explica: "Un canto no se escoge solo porque está de moda: se escoge porque edifica a la iglesia." },
                ],
                apoyo: "¿Hay equilibrio entre lo nuevo y lo conocido, y entre cantos de distintas generaciones?",
                explica: "El canto es de toda la congregación: se busca equilibrio entre cantos de distintas generaciones.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el himno sobre la fidelidad de Dios?",
                opciones: [
                  { texto: "Lo incluyo: dice la verdad sobre Dios y sirve al mensaje del día.", bien: true, explica: "Pasa las preguntas: dice la verdad sobre Dios y sirve al tema del culto y al mensaje de ese día." },
                  { texto: "Lo quito, porque es antiguo y ya no está de moda entre los jóvenes.", explica: "Un canto no se escoge ni se quita solo por la moda: se escoge porque edifica a la iglesia." },
                  { texto: "Lo dejo para otro culto, solo para los mayores, sin los jóvenes.", explica: "El canto es de toda la congregación, y se busca equilibrio entre cantos de distintas generaciones." },
                ],
                apoyo: "¿Sirve al tema del culto y al mensaje de ese día?",
                explica: "Se escogen cantos que dicen la verdad, sirven al tema del culto y edifican a la iglesia.",
              },
              {
                tipo: "explica",
                apoyo: "Hay lugar para el cántico nuevo, en equilibrio con lo conocido, para que toda la congregación cante con inteligencia",
                clave: {
                  id: "pr-alabanza-3-2-a4-2",
                  tipo: "corta",
                  pregunta: "¿Cómo armas la lista de cantos del aniversario? Explica con qué criterios la armas.",
                  ideas: [
                    { id: "equilibrio", peso: 50, texto: "Con equilibrio entre lo nuevo y lo conocido, y entre cantos de distintas generaciones, para los mayores y los jóvenes.", formas: ["equilibri*", "lo nuevo y lo conocido", "nuevos y conocidos", "conocidos y nuevos", "distintas generaciones", "generacion*", "mayores y (los|jovenes)", "jovenes y (los|mayores)"] },
                    { id: "mensaje", peso: 50, texto: "Con cantos que dicen la verdad, que la iglesia puede cantar y que sirven al mensaje sobre la fidelidad de Dios.", formas: ["fidelidad de dios", "sirv* al (mensaje|tema)", "(va|vayan|van) con el (mensaje|tema)", "dic* la verdad", "verdad sobre dios", "(pueda|puede|puedan|pueden) cantar", "tono comodo", "melodia clara"] },
                  ],
                  errores: [
                    { id: "solo-nuevos", texto: "Si todo es nuevo, el pueblo deja de cantar y solo escucha: hace falta equilibrio.", formas: ["(solo|todos) (los|cantos) nuevos", "los cuatro (cantos|nuevos)", "quit* (el|los) (himno|coro|conocidos)"], anula: "equilibrio" },
                  ],
                  modelo: "Armo la lista con equilibrio entre lo nuevo y lo conocido, y entre cantos de distintas generaciones, para los mayores y los jóvenes. Escojo cantos que dicen la verdad, que la iglesia puede cantar y que sirven al mensaje sobre la fidelidad de Dios.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se enseña un canto nuevo.",
            texto: "Un canto nuevo se enseña con [[paciencia]]: se presenta, se [[repite]] algunos domingos seguidos y se acompaña con cantos que la iglesia ya [[conoce]].",
            distractores: ["prisa", "olvida", "ignora"],
            errores: {
              prisa: "Un canto nuevo se enseña con paciencia.",
              olvida: "Un canto nuevo se repite algunos domingos seguidos, para que la iglesia lo aprenda.",
              ignora: "Un canto nuevo se acompaña con cantos que la iglesia ya conoce.",
            },
            apoyo: "Un canto nuevo se enseña con paciencia: se presenta, se repite algunos domingos seguidos y se acompaña con cantos que la iglesia ya conoce",
            ref: "Salmos 96:1",
            explica: "Un canto nuevo se enseña con paciencia: se presenta, se repite algunos domingos seguidos y se acompaña con cantos conocidos. Si todo es nuevo, el pueblo deja de cantar y solo escucha.",
          },
          {
            consigna: "Completa lo que pasa cuando falta el equilibrio en los cantos del culto.",
            texto: "Si todo es [[nuevo]], el pueblo deja de [[cantar]] y solo [[escucha]].",
            distractores: ["conocido", "orar", "canta"],
            errores: {
              conocido: "Es cuando todo es nuevo que el pueblo deja de cantar y solo escucha.",
              orar: "Si todo es nuevo, el pueblo deja de cantar.",
              canta: "Si todo es nuevo, el pueblo deja de cantar y solo escucha.",
            },
            apoyo: "Si todo es nuevo, el pueblo deja de cantar y solo escucha",
            explica: "Hay lugar para el cántico nuevo, en equilibrio con lo conocido, para que toda la congregación cante. Si todo es nuevo, el pueblo deja de cantar y solo escucha.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "El cantante principal del equipo te dice: Quiero hacer este canto en un tono bien alto, porque así se luce mi voz.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo cantemos en un tono cómodo para toda la congregación.", bien: true, explica: "Una melodía clara y un tono cómodo para la congregación, no solo para el cantante: el canto es de toda la iglesia." },
              { texto: "Que está bien: la iglesia puede escucharlo mientras él lo canta.", explica: "Si el pueblo solo escucha, deja de cantar: el canto es de toda la congregación, no solo del equipo." },
              { texto: "Que lo suba todavía más, para que el culto impresione a todos.", explica: "Un canto se escoge porque edifica a la iglesia, y el tono es cómodo para la congregación." },
              { texto: "Que lo cante en su tono, y que el equipo cante bien fuerte.", explica: "El canto es de toda la congregación, no solo del equipo." },
            ],
            apoyo: "Una melodía clara y un tono cómodo para la congregación, no solo para el cantante",
            ref: "Salmos 47:7",
            explica: "El pueblo tiene que entender y poder cantar lo que se escoge: un tono cómodo para la congregación, no solo para el cantante.",
          },
          {
            caso: "Una hermana de la iglesia te dice: Los cantos del domingo tenían palabras tan raras que no entendí lo que cantaba.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que tiene razón: el pueblo tiene que entender lo que canta.", bien: true, explica: "El salmista pide: «Cantad con inteligencia». El pueblo tiene que entender lo que canta." },
              { texto: "Que no importa entenderlo: basta con que la música sea linda.", explica: "El salmista pide cantar con inteligencia: el pueblo tiene que entender lo que canta." },
              { texto: "Que basta con que el equipo entienda lo que canta.", explica: "El canto es de toda la congregación, no solo del equipo." },
              { texto: "Que esos cantos son para escucharlos, no para que ella cante.", explica: "El canto es de toda la congregación: si solo escucha, el pueblo deja de cantar." },
            ],
            apoyo: "El pueblo tiene que entender lo que canta",
            ref: "Salmos 47:7",
            explica: "Toda la congregación canta con inteligencia: el pueblo tiene que entender lo que canta.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Hay lugar para el cántico nuevo, en equilibrio con lo conocido, para que toda la congregación cante con inteligencia",
            ref: "Salmos 96:1",
            clave: {
              id: "pr-alabanza-3-2-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo se equilibran en un culto los cantos nuevos y los conocidos, y por qué?",
              ideas: [
                { id: "paciencia", peso: 50, texto: "Hay lugar para lo nuevo, pero un canto nuevo se enseña con paciencia: se presenta, se repite algunos domingos y se acompaña con cantos conocidos.", formas: ["paciencia", "repit*", "repet*", "(algunos|varios) domingos", "domingos seguidos", "acompan*", "se presenta", "presentar*", "lugar para lo nuevo"] },
                { id: "escucha", peso: 50, texto: "Porque si todo es nuevo, el pueblo deja de cantar y solo escucha: el canto es de toda la congregación.", formas: ["todo (es|fuera|sea|son) nuevo*", "deja* de cantar", "solo escuch*", "(nadie|pocos) (canta|cantaria|cantara|cantan)", "toda la (congregacion|iglesia)", "con inteligencia"] },
              ],
              modelo: "Hay lugar para lo nuevo, pero un canto nuevo se enseña con paciencia: se presenta, se repite algunos domingos seguidos y se acompaña con cantos conocidos. Porque si todo es nuevo, el pueblo deja de cantar y solo escucha.",
            },
          },
          {
            apoyo: "Si todo es nuevo, el pueblo deja de cantar y solo escucha",
            ref: "Salmos 96:1",
            clave: {
              id: "pr-alabanza-3-2-a7-2",
              tipo: "corta",
              pregunta: "Un músico del equipo quiere cantar solo cantos nuevos cada domingo. ¿Qué le aconsejas, según la lección?",
              ideas: [
                { id: "escucha", peso: 50, texto: "Que si todo es nuevo, el pueblo deja de cantar y solo escucha.", formas: ["todo (es|fuera|sea|son) nuevo*", "deja* de cantar", "solo escuch*", "(nadie|pocos) (canta|cantaria|cantara|cantan|cantaran)", "no (puede|pueden|podra|podran) cantar"] },
                { id: "paciencia", peso: 50, texto: "Que enseñe cada canto nuevo con paciencia: que lo repita algunos domingos y lo acompañe con cantos que la iglesia ya conoce.", formas: ["paciencia", "repit*", "repet*", "(algunos|varios) domingos", "domingos seguidos", "acompan*", "lo conocido", "(ya|iglesia) conoce", "equilibri*"] },
              ],
              modelo: "Le aconsejo que no ponga solo cantos nuevos, porque si todo es nuevo, el pueblo deja de cantar y solo escucha. Que enseñe cada canto nuevo con paciencia, lo repita algunos domingos y lo acompañe con cantos conocidos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Preparar el culto y el ensayo
    "alabanza-3-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué dos cosas pide Salmos 33:3, que van juntas?", reverso: "Hacerlo bien, con preparación y cuidado, y con júbilo, con un corazón alegre.", apoyo: "Pide dos cosas que van juntas: hacerlo bien, con preparación y cuidado, y con júbilo, con un corazón alegre delante de Dios" },
              { frente: "¿Cuándo empezó casi siempre lo que pasa en un buen culto?", reverso: "Días antes: en la oración, en la planificación y en el ensayo.", apoyo: "Lo que pasa en un buen culto casi siempre empezó días antes" },
              { frente: "¿Es más espiritual improvisar todo cada domingo?", reverso: "No: suele ser falta de preparación.", apoyo: "Improvisar todo cada domingo no es más espiritual: suele ser falta de preparación" },
              { frente: "¿Para qué se escogen los cantos y su orden?", reverso: "Para que el culto fluya con sentido.", apoyo: "Escoger los cantos y su orden, para que el culto fluya con sentido" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo eran los músicos del templo?", reverso: "Instruidos en el canto para Jehová, y aptos.", apoyo: "Los músicos del templo eran instruidos y aptos" },
              { frente: "¿Qué era la preparación para los músicos del templo?", reverso: "Parte de su servicio.", apoyo: "La preparación era parte de su servicio" },
              { frente: "¿Con cuánto tiempo se envían la lista y los recursos al equipo?", reverso: "Con días de anticipación.", apoyo: "Enviar la lista y los recursos al equipo con días de anticipación" },
              { frente: "¿En qué descansa la espontaneidad del domingo?", reverso: "En la preparación del sábado.", apoyo: "La espontaneidad del domingo descansa en la preparación del sábado" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los pasos para preparar el culto como los presenta la lección, del primero al último.",
            pasos: [
              "Orar por el culto y por la iglesia",
              "Hablar con el pastor sobre el tema y el mensaje del día",
              "Escoger los cantos y su orden, para que el culto fluya",
              "Decidir los tonos y quién canta cada parte",
              "Preparar las transiciones y los textos bíblicos que se leerán",
              "Enviar la lista y los recursos al equipo con días de anticipación",
            ],
            apoyo: "Se prepara el culto con oración, con el pastor, con los cantos, los tonos y las transiciones",
            ref: "Proverbios 21:5",
            explica: "Primero se ora por el culto y por la iglesia; después se habla con el pastor sobre el tema; se escogen los cantos y su orden; se deciden los tonos y quién canta; se preparan las transiciones y los textos; y se envía todo al equipo con días de anticipación.",
          },
          {
            consigna: "El domingo el pastor predicará sobre el perdón. Ordena cómo preparas el culto, como lo enseña la lección, del primer paso al último.",
            pasos: [
              "Oras por el culto del domingo y por la iglesia",
              "Le preguntas al pastor qué mensaje dará sobre el perdón",
              "Escoges cantos sobre el perdón y decides su orden",
              "Decides en qué tono va cada canto y quién canta cada parte",
              "Preparas cómo pasar de un canto a otro y qué textos se leerán",
              "Envías la lista al equipo con días de anticipación",
            ],
            apoyo: "Hablar con el pastor sobre el tema y el mensaje del día",
            ref: "Proverbios 21:5",
            explica: "Se ora, se habla con el pastor sobre el mensaje, se escogen los cantos y su orden, se deciden los tonos y quién canta, se preparan las transiciones y los textos, y la lista llega al equipo con días de anticipación.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿A qué tienden los pensamientos del diligente? Toca las palabras que lo dicen.",
            texto: "Los pensamientos del diligente ciertamente tienden [[a la abundancia]]; Mas todo el que se apresura alocadamente, de cierto va a la pobreza",
            apoyo: "La planificación también es sabiduría",
            ref: "Proverbios 21:5",
            explica: "Los pensamientos del diligente tienden a la abundancia, y el que se apresura alocadamente va a la pobreza: la planificación también es sabiduría.",
          },
          {
            consigna: "El versículo de memoria pide preparación y cuidado. ¿Con qué palabras lo pide? Toca las palabras que lo dicen.",
            texto: "Cantadle cántico nuevo; [[Hacedlo bien]], tañendo con júbilo",
            apoyo: "hacerlo bien, con preparación y cuidado",
            ref: "Salmos 33:3",
            explica: "«Hacedlo bien» pide preparación y cuidado, y «tañendo con júbilo», un corazón alegre delante de Dios: las dos cosas van juntas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Hace provechoso el ensayo o le quita provecho? Lleva cada frase a su grupo.",
            grupos: ["Hace provechoso el ensayo", "Le quita provecho al ensayo"],
            frases: [
              { texto: "Empezar a tiempo, con oración y una palabra breve", grupo: 0 },
              { texto: "Repasar lo difícil", grupo: 0 },
              { texto: "Ensayar los principios, los finales y las transiciones", grupo: 0 },
              { texto: "Probar el sonido con los técnicos", grupo: 0 },
              { texto: "Terminar a tiempo, cuidando a las familias del equipo", grupo: 0 },
              { texto: "Repasar solo lo que ya sale bien", grupo: 1 },
              { texto: "Empezar cuando llegue el último del equipo", grupo: 1 },
              { texto: "Alargar el ensayo sin pensar en las familias", grupo: 1 },
            ],
            apoyo: "el ensayo repasa lo difícil y termina a tiempo",
            ref: "1 Crónicas 25:7-8",
            explica: "Un ensayo provechoso empieza a tiempo con oración, repasa lo difícil, ensaya los principios, los finales y las transiciones, prueba el sonido y termina a tiempo, cuidando a las familias.",
          },
          {
            consigna: "¿Qué muestra cada ejemplo del ensayo del sábado: un ensayo provechoso o uno sin provecho? Lleva cada frase a su grupo.",
            grupos: ["Ensayo provechoso", "Ensayo sin provecho"],
            frases: [
              { texto: "Oran juntos y escuchan una palabra breve antes de tocar", grupo: 0 },
              { texto: "Repiten la parte del canto que todavía les cuesta", grupo: 0 },
              { texto: "Practican cómo pasar de un canto al siguiente", grupo: 0 },
              { texto: "Prueban el sonido junto con los técnicos", grupo: 0 },
              { texto: "Tocan solo los cantos que ya les salen bien", grupo: 1 },
              { texto: "Empiezan una hora tarde porque nadie llegó a tiempo", grupo: 1 },
              { texto: "Siguen hasta la medianoche sin pensar en las familias", grupo: 1 },
            ],
            apoyo: "Repasar lo difícil, no solo lo que ya sale bien",
            explica: "En un ensayo provechoso se ora, se repasa lo difícil, se ensayan las transiciones y se prueba el sonido; no se toca solo lo que ya sale bien, se empieza a tiempo y se termina a tiempo, cuidando a las familias.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Empezar a tiempo, con oración y una palabra breve",
            ref: "Proverbios 21:5",
            situacion: "Eres el director de alabanza, y el sábado tienes el ensayo para el culto del domingo.",
            escenas: [
              {
                id: "e1",
                narra: "Es la hora de empezar, pero todavía faltan dos músicos.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Empiezas a tiempo, con oración y con una palabra breve.", valor: 2, explica: "Un ensayo provechoso empieza a tiempo, con oración y una palabra breve.", siguiente: "e2" },
                  { texto: "Esperas a que lleguen, aunque tarden mucho.", valor: 0, explica: "Un ensayo provechoso empieza a tiempo, con oración y una palabra breve.", siguiente: "e1b" },
                  { texto: "Empiezas a tiempo, pero sin orar, para no perder minutos.", valor: 1, explica: "Empezar a tiempo está bien, pero el ensayo empieza con oración y una palabra breve.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Los músicos llegan cuarenta minutos tarde, y ya queda poco tiempo.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Oran juntos y se van directo a lo más difícil del culto.", valor: 2, explica: "Un ensayo provechoso repasa lo difícil, no solo lo que ya sale bien.", siguiente: "e2" },
                  { texto: "Repasan todo desde el principio, aunque terminen muy tarde.", valor: 0, explica: "El ensayo termina a tiempo, cuidando a las familias del equipo.", siguiente: "e2" },
                  { texto: "Van directo a lo difícil, sin orar, para ganar tiempo.", valor: 1, explica: "Ir a lo difícil está bien, pero el ensayo empieza con oración y una palabra breve.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El equipo quiere tocar otra vez el canto que ya sale bien, porque es el que más les gusta.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Repasar primero lo difícil, lo que todavía no les sale bien.", valor: 2, explica: "Un ensayo provechoso repasa lo difícil, no solo lo que ya sale bien." },
                  { texto: "Tocar el que les gusta, y lo difícil solo si queda tiempo.", valor: 1, explica: "Tocar lo que les gusta no está mal, pero el ensayo provechoso repasa primero lo difícil." },
                  { texto: "Tocar solo lo que ya sale bien, para que todos terminen contentos.", valor: 0, explica: "Un ensayo provechoso repasa lo difícil, no solo lo que ya sale bien." },
                ],
              },
              {
                id: "e3",
                narra: "Ya repasaron los cantos difíciles, y queda media hora.",
                pregunta: "¿Qué más ensayan?",
                opciones: [
                  { texto: "Los principios, los finales y cómo pasar de un canto a otro.", valor: 2, explica: "En el ensayo se ensayan los principios, los finales y las transiciones." },
                  { texto: "Nada más: el domingo verán cómo empezar y terminar.", valor: 0, explica: "Los principios, los finales y las transiciones se ensayan antes: no se dejan para el domingo." },
                  { texto: "Otra vez todos los cantos completos, aunque sea hasta la medianoche.", valor: 0, explica: "El ensayo termina a tiempo, cuidando a las familias del equipo." },
                ],
              },
            ],
          },
          {
            apoyo: "Terminar a tiempo, cuidando a las familias del equipo",
            ref: "1 Crónicas 25:7-8",
            situacion: "Diriges el ensayo del miércoles para el culto del domingo. Varios del equipo tienen hijos pequeños.",
            escenas: [
              {
                id: "e1",
                narra: "Al empezar, el equipo quiere tocar enseguida.",
                pregunta: "¿Cómo empiezas?",
                opciones: [
                  { texto: "Oran juntos, y luego les compartes una palabra breve.", valor: 2, explica: "El ensayo empieza a tiempo, con oración y una palabra breve.", siguiente: "e2" },
                  { texto: "Das un sermón largo antes de que empiecen a tocar.", valor: 0, explica: "Al empezar el ensayo, la palabra es breve.", siguiente: "e1b" },
                  { texto: "Empiezan a tocar de una vez, sin orar y sin decir nada.", valor: 1, explica: "Empezar a tiempo está bien, pero el ensayo empieza con oración y una palabra breve.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Ya pasó media hora y todavía no tocaron ninguna nota.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Cierras con una oración breve y pasan enseguida a ensayar.", valor: 2, explica: "La palabra del ensayo es breve: después se repasa lo difícil y se termina a tiempo.", siguiente: "e2" },
                  { texto: "Sigues hablando: el ensayo puede durar más.", valor: 0, explica: "El ensayo termina a tiempo, cuidando a las familias del equipo.", siguiente: "e2" },
                  { texto: "Cortas ahí mismo y empiezan a tocar, sin cerrar con oración.", valor: 1, explica: "Empezar a ensayar está bien, pero el ensayo va con oración y una palabra breve.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El técnico de sonido llega y pregunta si quieren probar el sonido.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que sí: prueban el sonido todos juntos antes del domingo.", valor: 2, explica: "Un ensayo provechoso prueba el sonido con los técnicos." },
                  { texto: "Que no hace falta: el domingo lo arreglan sobre la marcha.", valor: 0, explica: "El sonido se prueba en el ensayo, con los técnicos, y no se deja para el domingo." },
                  { texto: "Que lo pruebe él solo mientras ustedes siguen tocando.", valor: 1, explica: "Probar el sonido está bien, pero se prueba con los técnicos, juntos." },
                ],
              },
              {
                id: "e3",
                narra: "Ya es la hora acordada para terminar, y falta repasar un final.",
                pregunta: "¿Qué decides?",
                opciones: [
                  { texto: "Repasan ese final una sola vez y terminan a la hora.", valor: 2, explica: "Se ensayan los finales, y se termina a tiempo, cuidando a las familias del equipo." },
                  { texto: "Siguen una hora más, aunque los niños se duerman.", valor: 0, explica: "El ensayo termina a tiempo, cuidando a las familias del equipo." },
                  { texto: "Se van sin repasarlo, y que cada uno lo vea en su casa.", valor: 1, explica: "Terminar a tiempo está bien, pero en el ensayo también se ensayan los finales." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la excelencia y el perfeccionismo tiene un error. Tócala.",
            frases: [
              "La excelencia es dar lo mejor de corazón, como para el Señor.",
              "El perfeccionismo busca impresionar y no soporta un error.",
              "Dios solo recibe la ofrenda que sale perfecta.",
              "Hacerlo bien y con júbilo son dos cosas que van juntas.",
            ],
            malo: 2,
            correccion: "Dios recibe la ofrenda preparada con amor, aunque no sea perfecta.",
            apoyo: "Dios recibe la ofrenda preparada con amor, aunque no sea perfecta",
            ref: "Colosenses 3:23",
            explica: "La excelencia es dar lo mejor «de corazón, como para el Señor y no para los hombres»; el perfeccionismo busca impresionar y no soporta un error. Dios recibe la ofrenda preparada con amor, aunque no sea perfecta.",
          },
          {
            consigna: "Una de estas frases sobre dar lo mejor a Dios tiene un error. Tócala.",
            frases: [
              "Salmos 33:3 pide hacerlo bien, con preparación y cuidado.",
              "Tañer con júbilo es servir con un corazón alegre delante de Dios.",
              "La excelencia busca impresionar a la gente con un culto sin errores.",
              "El perfeccionismo no soporta un error.",
            ],
            malo: 2,
            correccion: "La excelencia es dar lo mejor para el Señor; el que busca impresionar es el perfeccionismo.",
            apoyo: "La excelencia es dar lo mejor para el Señor, no el perfeccionismo que busca impresionar",
            ref: "Salmos 33:3",
            explica: "«Hacedlo bien, tañendo con júbilo»: preparación y alegría van juntas. La excelencia es dar lo mejor para el Señor, no el perfeccionismo que busca impresionar.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La excelencia es dar lo mejor para el Señor, no el perfeccionismo que busca impresionar",
            ref: "Colosenses 3:23",
            clave: {
              id: "pr-alabanza-3-3-a7-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia la excelencia del perfeccionismo, según la lección?",
              ideas: [
                { id: "excelencia", peso: 50, texto: "La excelencia es dar lo mejor de corazón, como para el Señor y no para los hombres.", formas: ["dar lo mejor", "da lo mejor", "damos lo mejor", "dar (nuestro|tu|mi|su) mejor", "de corazon", "para el senor", "no para los hombres"] },
                { id: "perfeccionismo", peso: 50, texto: "El perfeccionismo busca impresionar y no soporta un error.", formas: ["busca impresionar", "buscan impresionar", "quiere impresionar", "quieren impresionar", "para impresionar", "no soporta (un|ningun|los|errores)", "no (acepta|tolera|perdona) (un|ningun|los|errores)", "no soporta"] },
              ],
              errores: [
                { id: "excelencia-impresiona", texto: "La excelencia no busca impresionar: es dar lo mejor para el Señor.", formas: ["excelencia (busca|es|quiere) impresionar"], anula: "excelencia" },
                { id: "perfeccion-mejor", texto: "El perfeccionismo no es dar lo mejor para el Señor: busca impresionar.", formas: ["perfeccionismo (es|da) lo mejor", "perfeccionismo es lo que (dios|el|senor)"], anula: "perfeccionismo" },
                { id: "excelencia-perfecta", texto: "La excelencia no busca que todo salga perfecto: es dar lo mejor para el Señor.", formas: ["excelencia (busca|quiere) todo perfect*", "excelencia (busca|es|quiere) (perfeccion|perfecto|perfecta)"], anula: "excelencia" },
                { id: "iguales", texto: "No son lo mismo: la excelencia da lo mejor para el Señor; el perfeccionismo busca impresionar.", formas: ["no hay diferencia", "son lo mismo", "(las|los) dos (buscan|quieren) impresionar"], anula: "perfeccionismo" },
                { id: "iguales-excelencia", texto: "No son lo mismo: la excelencia da lo mejor para el Señor; el perfeccionismo busca impresionar.", formas: ["no hay diferencia", "son lo mismo", "(las|los) dos (buscan|quieren) impresionar"], anula: "excelencia" },
              ],
              modelo: "La excelencia es dar lo mejor de corazón, como para el Señor y no para los hombres. El perfeccionismo, en cambio, busca impresionar y no soporta un error. Dios recibe la ofrenda preparada con amor, aunque no sea perfecta.",
            },
          },
          {
            apoyo: "Dios recibe la ofrenda preparada con amor, aunque no sea perfecta",
            ref: "Colosenses 3:23",
            clave: {
              id: "pr-alabanza-3-3-a7-2",
              tipo: "corta",
              pregunta: "Un músico del equipo se enoja consigo mismo y se desanima por cada error que comete en el culto. ¿Qué le dices?",
              ideas: [
                { id: "ofrenda", peso: 50, texto: "Que Dios recibe la ofrenda preparada con amor, aunque no sea perfecta.", formas: ["ofrenda", "preparad* con amor", "con amor", "aunque no (sea|salga|este|suene) perfect*", "no (tiene|necesita) que ser perfect*", "dios (recibe|acepta)"] },
                { id: "excelencia", peso: 50, texto: "Que la excelencia es dar lo mejor para el Señor, no el perfeccionismo que busca impresionar y no soporta un error.", formas: ["dar lo mejor", "da lo mejor", "damos lo mejor", "de corazon", "para el senor", "perfeccionismo", "busca impresionar", "no soporta"] },
              ],
              errores: [
                { id: "perfecto", texto: "Dios recibe la ofrenda preparada con amor, aunque no sea perfecta.", formas: ["(tiene|tienes|debe|debes) que ser perfect*", "(debe|debes) ser perfect*", "dios (rechaza|desprecia)"], anula: "ofrenda" },
              ],
              modelo: "Le digo que Dios recibe la ofrenda preparada con amor, aunque no sea perfecta. La excelencia es dar lo mejor de corazón para el Señor; el perfeccionismo busca impresionar y no soporta un error.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Dirigir con sencillez y orden
    "alabanza-3-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es la regla de Pablo para el culto?", reverso: "Que todo se haga decentemente y con orden.", apoyo: "La regla de Pablo para el culto es sencilla" },
              { frente: "¿Apaga el orden al Espíritu?", reverso: "No: el orden lo sirve.", apoyo: "El orden no apaga al Espíritu: lo sirve" },
              { frente: "¿Por qué se hace todo con orden, según 1 Corintios 14:33?", reverso: "Porque Dios no es Dios de confusión, sino de paz.", apoyo: "La razón está en Dios mismo" },
              { frente: "¿Qué hace un culto confuso, con silencios largos o cambios sin aviso?", reverso: "Distrae al pueblo.", apoyo: "Un culto confuso, con silencios largos, señales que nadie entiende o cambios sin aviso, distrae al pueblo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es la meta del director, como en Esdras 3:11?", reverso: "Que todo el pueblo participe.", apoyo: "La meta del director es esa: que todo el pueblo participe" },
              { frente: "¿Qué vale más que un sermón entre canto y canto?", reverso: "Una frase o un versículo.", apoyo: "una frase o un versículo valen más que un sermón entre canto y canto" },
              { frente: "¿Para qué lee la Escritura el director?", reverso: "Para centrar al pueblo en Dios.", apoyo: "Lee la Escritura para centrar al pueblo en Dios" },
              { frente: "¿Para qué da señales claras al equipo?", reverso: "Para repetir, terminar o seguir.", apoyo: "Da señales claras al equipo para repetir, terminar o seguir" },
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
            consigna: "¿Cómo pide Pablo que se haga todo en el culto? Toca las palabras que lo dicen.",
            texto: "hágase todo [[decentemente y con orden]]",
            apoyo: "Todo se hace decentemente y con orden, porque Dios no es Dios de confusión, sino de paz",
            ref: "1 Corintios 14:40",
            explica: "La regla de Pablo para el culto es sencilla: «hágase todo decentemente y con orden». El orden no apaga al Espíritu: lo sirve.",
          },
          {
            consigna: "Dios no es Dios de confusión. ¿De qué es Dios, según 1 Corintios 14:33? Toca las palabras que lo dicen.",
            texto: "pues Dios no es Dios de confusión, sino [[de paz]]",
            apoyo: "La razón está en Dios mismo",
            ref: "1 Corintios 14:33",
            explica: "Dios no es Dios de confusión, sino de paz: por eso el culto se hace con orden, y un culto confuso, con silencios largos o cambios sin aviso, distrae al pueblo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo habla el director entre canto y canto.",
            texto: "El director habla [[poco]] y [[claro]]: una frase o un [[versículo]] valen más que un sermón entre canto y canto.",
            distractores: ["mucho", "confuso", "discurso"],
            errores: {
              mucho: "El director habla poco: una frase o un versículo valen más que un sermón.",
              confuso: "El director habla claro: un culto confuso distrae al pueblo.",
              discurso: "Una frase o un versículo valen más que un sermón entre canto y canto.",
            },
            apoyo: "Habla poco y claro: una frase o un versículo valen más que un sermón entre canto y canto",
            ref: "1 Corintios 14:40",
            explica: "El director guía con pocas palabras: una frase o un versículo valen más que un sermón entre canto y canto.",
          },
          {
            consigna: "Completa lo que dice la lección sobre un culto sin orden.",
            texto: "Un culto [[confuso]], con silencios [[largos]], señales que nadie entiende o cambios sin aviso, [[distrae]] al pueblo.",
            distractores: ["ordenado", "breves", "centra"],
            errores: {
              ordenado: "Lo que distrae al pueblo es un culto confuso; el orden no apaga al Espíritu, lo sirve.",
              breves: "Lo que distrae al pueblo son los silencios largos.",
              centra: "Un culto confuso distrae al pueblo; la Escritura es la que centra al pueblo en Dios.",
            },
            apoyo: "Un culto confuso, con silencios largos, señales que nadie entiende o cambios sin aviso, distrae al pueblo",
            ref: "1 Corintios 14:33",
            explica: "Dios no es Dios de confusión, sino de paz: un culto confuso, con silencios largos, señales que nadie entiende o cambios sin aviso, distrae al pueblo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es guiar al pueblo o es manipularlo? Lleva cada frase a su grupo.",
            grupos: ["Guiar al pueblo", "Manipular al pueblo"],
            frases: [
              { texto: "Presentar la verdad de Dios", grupo: 0 },
              { texto: "Invitar sin presionar: explicar, animar y dejar libre", grupo: 0 },
              { texto: "Dejar que el Espíritu Santo obre en cada corazón", grupo: 0 },
              { texto: "Repetir un canto sin fin para provocar una emoción", grupo: 1 },
              { texto: "Subir el volumen para forzar una reacción", grupo: 1 },
              { texto: "Prometer cosas que Dios no prometió", grupo: 1 },
              { texto: "Hacer sentir culpable al que no responde", grupo: 1 },
            ],
            apoyo: "Manipular es usar trucos para provocar una emoción",
            explica: "Guiar es presentar la verdad de Dios y dejar que el Espíritu Santo obre en cada corazón; manipular es usar trucos para provocar una emoción, como repetir sin fin, subir el volumen, prometer lo que Dios no prometió o hacer sentir culpable.",
          },
          {
            consigna: "¿Qué hace cada director: guía al pueblo o lo manipula? Lleva cada frase a su grupo.",
            grupos: ["Guía al pueblo", "Manipula al pueblo"],
            frases: [
              { texto: "Lee un salmo y deja que cada uno responda a Dios", grupo: 0 },
              { texto: "Anima a cantar y deja libre a cada uno", grupo: 0 },
              { texto: "Explica en una frase la verdad que dice el canto", grupo: 0 },
              { texto: "Repite el coro sin fin hasta provocar el llanto", grupo: 1 },
              { texto: "Sube el volumen para forzar que la gente reaccione", grupo: 1 },
              { texto: "Hace sentir culpable al que no levanta las manos", grupo: 1 },
            ],
            apoyo: "Guiar es presentar la verdad de Dios y dejar que el Espíritu Santo obre en cada corazón",
            explica: "El que guía presenta la verdad de Dios, invita sin presionar y deja libre; el que manipula usa trucos para provocar una emoción: repetir sin fin, subir el volumen para forzar una reacción o hacer sentir culpable al que no responde.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "El bajista del equipo te dice: En el último canto subamos el volumen al máximo; así la gente reacciona.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que guiar es presentar la verdad y dejar que el Espíritu obre.", bien: true, explica: "Guiar es presentar la verdad de Dios y dejar que el Espíritu Santo obre en cada corazón; subir el volumen para forzar una reacción es manipular." },
              { texto: "Que sí: subir el volumen es la mejor manera de mover a la gente.", explica: "Subir el volumen para forzar una reacción es manipular." },
              { texto: "Que mejor repitamos el coro sin fin, que también sirve.", explica: "Repetir sin fin para provocar una emoción también es manipular." },
              { texto: "Que lo suba un poco, para que no se note que la estamos forzando.", explica: "Forzar una reacción es manipular, aunque no se note: Dios no necesita trucos para tocar un corazón." },
            ],
            apoyo: "Manipular es usar trucos para provocar una emoción",
            explica: "Dios no necesita trucos para tocar un corazón: guiar es presentar la verdad de Dios y dejar que el Espíritu Santo obre.",
          },
          {
            caso: "Una cantante del equipo te dice: Cuando la gente no responde, les digo que Dios está triste con ellos, y ahí sí responden.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que hacer sentir culpable a la gente es manipular, no es guiar.", bien: true, explica: "Hacer sentir culpable al que no responde es manipular. Guiar es presentar la verdad y dejar que el Espíritu obre." },
              { texto: "Que está bien, pero que además cante más fuerte que toda la iglesia.", explica: "Hacer sentir culpable al que no responde es manipular; y el director canta con la congregación, no para ella." },
              { texto: "Que lo diga solo a los que nunca levantan las manos en el culto.", explica: "Hacer sentir culpable al que no responde es manipular, sea quien sea." },
              { texto: "Que mejor repita el coro sin fin, hasta que todos respondan.", explica: "Repetir sin fin para provocar una emoción también es manipular." },
            ],
            apoyo: "hacer sentir culpable al que no responde",
            explica: "Manipular es usar trucos para provocar una emoción, como hacer sentir culpable al que no responde. Guiar es presentar la verdad de Dios y dejar que el Espíritu Santo obre en cada corazón.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Deja espacio a lo espontáneo, dentro del orden que preparó",
            ref: "1 Corintios 14:40",
            situacion: "Diriges la alabanza el domingo. Preparaste los cantos, una lectura del Salmo y las señales con el equipo.",
            escenas: [
              {
                id: "e1",
                narra: "En el tercer canto, la iglesia canta el coro con todo el corazón, y sientes que conviene cantarlo otra vez.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Das una señal clara al equipo para cantarlo otra vez.", valor: 2, explica: "Da señales claras al equipo para repetir, terminar o seguir, y deja espacio a lo espontáneo dentro del orden que preparó." },
                  { texto: "Sigues con la lista: lo que no está escrito no se canta.", valor: 0, explica: "El director deja espacio a lo espontáneo, dentro del orden que preparó." },
                  { texto: "Lo repites sin avisar, aunque el equipo se pierda.", valor: 1, explica: "Repetirlo está bien, pero los cambios sin aviso distraen: se dan señales claras al equipo." },
                ],
              },
              {
                id: "e2",
                narra: "Después de repetirlo, un músico propone seguir con el coro veinte veces más, para que la gente se emocione.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Das la señal de terminar y sigues con lo que preparaste.", valor: 2, explica: "Repetir sin fin para provocar una emoción es manipular; el director da señales claras para terminar o seguir." },
                  { texto: "Lo repiten sin fin, hasta que alguien llore.", valor: 0, explica: "Repetir sin fin para provocar una emoción es manipular." },
                  { texto: "Lo repiten una vez más y siguen, sin darle ninguna señal.", valor: 1, explica: "Seguir está bien, pero sin señales claras el equipo se pierde: se dan señales para repetir, terminar o seguir." },
                ],
              },
              {
                id: "e3",
                narra: "Antes del último canto, quieres decirle algo a la iglesia.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lees un versículo breve que centra a la iglesia en Dios.", valor: 2, explica: "Habla poco y claro: una frase o un versículo valen más que un sermón entre canto y canto." },
                  { texto: "Predicas un sermón largo antes del último canto del culto.", valor: 0, explica: "Una frase o un versículo valen más que un sermón entre canto y canto." },
                  { texto: "Te quedas en silencio largo rato, sin dar ninguna señal.", valor: 0, explica: "Un culto con silencios largos y señales que nadie entiende distrae al pueblo." },
                ],
              },
            ],
          },
          {
            apoyo: "El orden no apaga al Espíritu: lo sirve",
            ref: "1 Corintios 14:33",
            situacion: "Diriges la alabanza en una noche de oración. Preparaste el orden con el pastor y lo ensayaste con el equipo.",
            escenas: [
              {
                id: "e1",
                narra: "Al terminar un canto sobre el perdón, la iglesia está muy atenta, y sientes que conviene leer un versículo que no tenías planeado.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo lees breve y claro, y sigues con lo que preparaste.", valor: 2, explica: "El director deja espacio a lo espontáneo dentro del orden que preparó, y habla poco y claro." },
                  { texto: "No lo lees: lo que no está en la lista no pasa.", valor: 0, explica: "El director deja espacio a lo espontáneo, dentro del orden que preparó." },
                  { texto: "Lo lees y predicas veinte minutos más sobre ese versículo.", valor: 0, explica: "Una frase o un versículo valen más que un sermón entre canto y canto." },
                ],
              },
              {
                id: "e2",
                narra: "El equipo no sabe si repetir el coro o pasar al siguiente canto, y se miran unos a otros.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les das una señal clara para pasar al siguiente canto.", valor: 2, explica: "Da señales claras al equipo para repetir, terminar o seguir." },
                  { texto: "Esperas en silencio, a ver qué decide cada uno.", valor: 0, explica: "Los silencios largos y las señales que nadie entiende distraen al pueblo." },
                  { texto: "Cambias a otro canto sin aviso, para sorprender a todos.", valor: 0, explica: "Los cambios sin aviso distraen al pueblo: Dios no es Dios de confusión, sino de paz." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, un joven del equipo te dice: Para que el Espíritu se mueva, mejor no preparemos nada la próxima vez.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que el orden no apaga al Espíritu: al contrario, lo sirve.", valor: 2, explica: "El orden no apaga al Espíritu: lo sirve. Y Dios no es Dios de confusión, sino de paz." },
                  { texto: "Que tiene razón: preparar el culto estorba al Espíritu.", valor: 0, explica: "El orden no apaga al Espíritu: lo sirve." },
                  { texto: "Que preparen solo los cantos, y que lo demás vaya sin ningún orden.", valor: 1, explica: "Preparar los cantos está bien, pero todo se hace decentemente y con orden." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Deja espacio a lo espontáneo dentro del orden",
            ref: "1 Corintios 14:40",
            clave: {
              id: "pr-alabanza-3-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué relación hay entre el orden del culto y lo espontáneo, según la lección?",
              ideas: [
                { id: "sirve", peso: 50, texto: "El orden no apaga al Espíritu: lo sirve, porque Dios no es Dios de confusión, sino de paz.", formas: ["no apaga", "lo sirve", "sirve al espiritu", "dios de paz", "no es dios de confusion", "decentemente"] },
                { id: "espacio", peso: 50, texto: "El director deja espacio a lo espontáneo, dentro del orden que preparó.", formas: ["deja* espacio", "dar espacio", "da espacio", "espacio (a|para) lo espontaneo", "dentro del orden", "orden que prepar*", "lo que (preparo|preparamos|prepare|preparaste)"] },
              ],
              errores: [
                { id: "apaga", texto: "El orden no apaga al Espíritu: lo sirve.", formas: ["orden apaga", "(preparar|planear|planificar) (apaga|estorba)"], anula: "sirve" },
              ],
              modelo: "El orden no apaga al Espíritu: lo sirve, porque Dios no es Dios de confusión, sino de paz. Por eso el director deja espacio a lo espontáneo, dentro del orden que preparó.",
            },
          },
          {
            apoyo: "El orden no apaga al Espíritu: lo sirve",
            ref: "1 Corintios 14:33",
            clave: {
              id: "pr-alabanza-3-4-a7-2",
              tipo: "corta",
              pregunta: "Un hermano te dice que el orden y lo espontáneo no pueden ir juntos en un culto. ¿Qué le explicas?",
              ideas: [
                { id: "sirve", peso: 50, texto: "Que el orden no apaga al Espíritu: lo sirve, porque Dios no es Dios de confusión, sino de paz.", formas: ["no apaga", "lo sirve", "sirve al espiritu", "dios de paz", "no es dios de confusion", "decentemente"] },
                { id: "espacio", peso: 50, texto: "Que el director deja espacio a lo espontáneo, dentro del orden que preparó.", formas: ["deja* espacio", "dar espacio", "da espacio", "espacio (a|para) lo espontaneo", "dentro del orden", "orden que prepar*", "lo que (preparo|preparamos|prepare|preparaste)"] },
              ],
              errores: [
                { id: "razon", texto: "El orden no apaga al Espíritu: lo sirve.", formas: ["tiene razon", "orden apaga", "(preparar|planear|planificar) (apaga|estorba)"], anula: "sirve" },
              ],
              modelo: "Le explico que sí pueden ir juntos: el orden no apaga al Espíritu, lo sirve, porque Dios no es Dios de confusión, sino de paz. El director deja espacio a lo espontáneo, dentro del orden que preparó.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Formar el equipo
    "alabanza-3-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué hicieron David y los jefes con las familias de músicos?", reverso: "Las apartaron para el ministerio.", apoyo: "David y los jefes «apartaron para el ministerio» a familias de músicos" },
              { frente: "¿Cómo describe la Biblia a los músicos que David apartó?", reverso: "Como idóneos para la obra de su ministerio.", apoyo: "la Biblia los describe como «hombres idóneos para la obra de su ministerio»" },
              { frente: "¿De qué no depende un ministerio de alabanza sano?", reverso: "De una sola persona: forma un equipo y a los que vendrán después.", apoyo: "Un ministerio de alabanza sano no depende de una sola persona" },
              { frente: "¿Basta con estar en la plataforma para servir en el equipo?", reverso: "No: hay que ser parte de la iglesia y de su vida.", apoyo: "Ser parte de la iglesia y de su vida, no solo de la plataforma" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quiénes servían juntos en el templo?", reverso: "El pequeño con el grande, el maestro y el discípulo.", apoyo: "lo mismo el maestro que el discípulo" },
              { frente: "En un buen equipo, ¿quiénes enseñan a los que empiezan?", reverso: "Los que saben más.", apoyo: "En un buen equipo, los que saben más enseñan a los que empiezan, y todos sirven juntos" },
              { frente: "Si alguien todavía no tiene capacidad musical, ¿qué se le pide?", reverso: "Disposición a aprender.", apoyo: "Capacidad musical o técnica, o disposición a aprender" },
              { frente: "¿Qué hace un buen director, en vez de hacerse indispensable?", reverso: "Forma a otros.", apoyo: "Un buen director no se hace indispensable: forma a otros" },
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
            consigna: "¿Es algo que la lección pide para servir en el equipo, o no es lo que se pide? Lleva cada frase a su grupo.",
            grupos: ["Se pide para servir en el equipo", "No es lo que se pide"],
            frases: [
              { texto: "Un testimonio de vida cristiana", grupo: 0 },
              { texto: "Ser parte de la iglesia y de su vida", grupo: 0 },
              { texto: "Capacidad musical o técnica, o disposición a aprender", grupo: 0 },
              { texto: "Un corazón dispuesto a servir y a recibir corrección", grupo: 0 },
              { texto: "Tiempo para ensayar y servir con constancia", grupo: 0 },
              { texto: "Estar en la plataforma sin ser parte de la vida de la iglesia", grupo: 1 },
              { texto: "Tocar muy bien, aunque no acepte ninguna corrección", grupo: 1 },
              { texto: "Ser famoso como músico fuera de la iglesia", grupo: 1 },
            ],
            apoyo: "Se elige a los que sirven por su testimonio, su vida en la iglesia, su capacidad o disposición a aprender y su corazón dispuesto",
            ref: "1 Crónicas 25:1",
            explica: "Para servir en el equipo se pide un testimonio de vida cristiana, ser parte de la iglesia y de su vida, capacidad o disposición a aprender, un corazón dispuesto a servir y a recibir corrección, y tiempo para servir con constancia.",
          },
          {
            consigna: "¿El hermano muestra lo que se pide para servir, o le falta algo? Lleva cada frase a su grupo.",
            grupos: ["Muestra lo que se pide", "Le falta algo que se pide"],
            frases: [
              { texto: "Todavía toca poco, pero tiene muchas ganas de aprender", grupo: 0 },
              { texto: "Acepta con humildad cuando el director lo corrige", grupo: 0 },
              { texto: "Vive su fe en casa y en el trabajo, no solo el domingo", grupo: 0 },
              { texto: "Se organiza para llegar a cada ensayo con constancia", grupo: 0 },
              { texto: "Toca muy bien, pero se enoja cuando lo corrigen", grupo: 1 },
              { texto: "Solo viene a la iglesia el día que le toca tocar", grupo: 1 },
              { texto: "Quiere servir, pero casi nunca tiene tiempo para ensayar", grupo: 1 },
            ],
            apoyo: "Un corazón dispuesto a servir y a recibir corrección",
            explica: "Se pide un testimonio de vida cristiana, ser parte de la vida de la iglesia, capacidad o disposición a aprender, un corazón dispuesto a recibir corrección y tiempo para servir con constancia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se forma a alguien nuevo en el equipo, como lo enseña la lección, del primer paso al último.",
            pasos: [
              "Se lo invita y se conversa con él",
              "Se lo acompaña un tiempo junto a alguien con experiencia",
              "Se lo forma en lo técnico y en lo espiritual",
              "Se le dan responsabilidades poco a poco",
              "Se lo sigue acompañando y animando",
            ],
            apoyo: "Se los forma con acompañamiento, en lo técnico y en lo espiritual",
            ref: "1 Crónicas 25:8",
            explica: "Primero se invita y se conversa; después se acompaña un tiempo junto a alguien con experiencia; se forma en lo técnico y en lo espiritual; se le dan responsabilidades poco a poco; y se lo sigue acompañando y animando.",
          },
          {
            consigna: "Marcos, un hermano de la iglesia, quiere tocar la guitarra en el equipo. Ordena cómo lo formas, como lo enseña la lección, del primer paso al último.",
            pasos: [
              "Conversas con él: por qué quiere servir y cómo está con Dios",
              "Ensaya y sirve un tiempo junto a un guitarrista con experiencia",
              "Lo formas en lo técnico y en lo espiritual",
              "Le das responsabilidades poco a poco",
              "Lo sigues acompañando y animando",
            ],
            apoyo: "Se acompaña un tiempo: ensaya y sirve junto a alguien con experiencia",
            ref: "1 Crónicas 25:8",
            explica: "Con Marcos se conversa primero; después ensaya y sirve junto a alguien con experiencia, se forma en lo técnico y en lo espiritual, recibe responsabilidades poco a poco y se lo sigue acompañando y animando.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Se acompaña un tiempo: ensaya y sirve junto a alguien con experiencia",
            ref: "1 Crónicas 25:8",
            titulo: "Una nueva voz para el equipo",
            relato: [
              "Eres el director de alabanza. Sofía, una adolescente de 15 años de la iglesia, canta bien y quiere servir en el equipo.",
              "Sus padres son de la iglesia, pero todavía no saben que ella quiere entrar. Ella nunca ha cantado en un culto.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo empiezas con Sofía?",
                opciones: [
                  { texto: "La invito a conversar sobre por qué quiere servir y cómo está con Dios.", bien: true, explica: "Se invita y se conversa: por qué quiere servir y cómo está su vida con Dios." },
                  { texto: "La pongo a cantar sola el domingo, para ver qué tal le va en el culto.", explica: "Primero se invita y se conversa; después se acompaña un tiempo y se le dan responsabilidades poco a poco." },
                  { texto: "Le digo que espere a cantar mejor, y no vuelvo a hablar con ella del tema.", explica: "Se pide capacidad musical o disposición a aprender: se la invita y se conversa con ella." },
                ],
                apoyo: "Se invita y se conversa: por qué quiere servir y cómo está su vida con Dios",
                explica: "El primer paso para formar a alguien en el equipo es invitarlo y conversar con él.",
              },
              {
                tipo: "situacion",
                pregunta: "Como Sofía es menor de edad, ¿qué más hace falta para que sirva?",
                opciones: [
                  { texto: "Permiso de sus padres, y seguir las normas de protección de la iglesia.", bien: true, explica: "Los niños y adolescentes sirven con permiso de sus padres y se siguen las normas de protección de la iglesia." },
                  { texto: "Nada más: si canta bien, puede servir igual que cualquier adulto.", explica: "Los menores sirven con permiso de sus padres y con las normas de protección de la iglesia." },
                  { texto: "Que ella firme sola un compromiso con el equipo de alabanza de la iglesia.", explica: "Un menor sirve con permiso de sus padres, no con un compromiso firmado por él solo." },
                ],
                apoyo: "Si en el equipo hay niños o adolescentes, sirven con permiso de sus padres y se siguen las normas de protección de la iglesia",
                explica: "Si en el equipo hay niños o adolescentes, sirven con permiso de sus padres y se siguen las normas de protección de la iglesia.",
              },
              {
                tipo: "situacion",
                pregunta: "Un músico adulto se ofrece a ensayar con ella a solas en su casa. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que no: nunca a solas con un adulto; ensaya con el equipo, acompañada.", bien: true, explica: "Las normas de protección de la iglesia lo dicen: nunca a solas con un adulto, y siempre acompañados." },
                  { texto: "Que sí: así ella avanza más rápido y no le quita tiempo al ensayo del equipo.", explica: "Un menor nunca está a solas con un adulto: siempre acompañado." },
                  { texto: "Que sí, pero que sea solo una vez y que no se lo cuente a nadie más.", explica: "Las normas de protección de la iglesia lo dicen: nunca a solas con un adulto, y siempre acompañados." },
                ],
                apoyo: "nunca a solas con un adulto, y siempre acompañados",
                explica: "Los menores del equipo nunca están a solas con un adulto: siempre acompañados.",
              },
              {
                tipo: "explica",
                apoyo: "Se los forma con acompañamiento, en lo técnico y en lo espiritual",
                clave: {
                  id: "pr-alabanza-3-5-a4-1",
                  tipo: "corta",
                  pregunta: "¿Cómo vas a formar a Sofía en los próximos meses, según la lección?",
                  ideas: [
                    { id: "acompana", peso: 40, texto: "Ensayará y servirá un tiempo junto a alguien con experiencia, siempre acompañada.", formas: ["acompan*", "junto a (alguien|alguna|una|un)", "con experiencia", "a su lado", "con el equipo"] },
                    { id: "forma", peso: 30, texto: "La formaré en lo técnico y en lo espiritual.", formas: ["lo tecnico", "lo espiritual", "tecnic*", "espiritual*", "su vida con dios"] },
                    { id: "poco", peso: 30, texto: "Le daré responsabilidades poco a poco, y la seguiré animando.", formas: ["poco a poco", "responsabilidad*", "anim*", "de a poco", "paso a paso"] },
                  ],
                  errores: [
                    { id: "a-solas", texto: "Un menor nunca está a solas con un adulto: siempre acompañado.", formas: ["a solas con (el|ella|un|una)", "a solas en su casa", "solos en (su|la) casa"], anula: "acompana" },
                  ],
                  modelo: "Ensayará y servirá un tiempo junto a una cantante con experiencia, siempre acompañada. La formaré en lo técnico y en lo espiritual, le daré responsabilidades poco a poco y la seguiré animando.",
                },
              },
            ],
          },
          {
            apoyo: "Se le dan responsabilidades poco a poco",
            ref: "1 Crónicas 25:8",
            titulo: "Un técnico nuevo",
            relato: [
              "Eres el director de alabanza. Andrés, un hermano que llegó a la iglesia hace dos años, sabe mucho de sonido y quiere servir con el equipo.",
              "Es muy capaz, pero algunos dicen que se molesta cuando lo corrigen.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces antes de ponerlo a servir?",
                opciones: [
                  { texto: "Converso con él: por qué quiere servir y cómo está su vida con Dios.", bien: true, explica: "Se invita y se conversa: por qué quiere servir y cómo está su vida con Dios." },
                  { texto: "Lo pongo a cargo de todo el sonido este domingo, porque sabe muchísimo.", explica: "Primero se conversa, y después se le dan responsabilidades poco a poco." },
                  { texto: "Le digo que no, porque alguien me contó que no acepta la corrección.", explica: "Antes de decidir, se invita y se conversa con él sobre por qué quiere servir." },
                ],
                apoyo: "Se invita y se conversa: por qué quiere servir y cómo está su vida con Dios",
                explica: "El primer paso es invitar y conversar: por qué quiere servir y cómo está su vida con Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "En la conversación, ¿qué te importa además de que sepa de sonido?",
                opciones: [
                  { texto: "Un corazón dispuesto a servir y a recibir corrección.", bien: true, explica: "Para servir en el equipo se pide un corazón dispuesto a servir y a recibir corrección." },
                  { texto: "Que tenga el mejor equipo de sonido.", explica: "No se pide eso: se pide capacidad o disposición a aprender y un corazón dispuesto." },
                  { texto: "Que pueda arreglarlo todo solo, sin depender de nadie más.", explica: "En un buen equipo todos sirven juntos, y se pide un corazón dispuesto a recibir corrección." },
                ],
                apoyo: "Un corazón dispuesto a servir y a recibir corrección",
                explica: "Además de la capacidad técnica, se pide un testimonio, ser parte de la iglesia y un corazón dispuesto a servir y a recibir corrección.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés empieza a servir. ¿Cómo sigues con él?",
                opciones: [
                  { texto: "Sirve junto a un técnico con experiencia y recibe tareas poco a poco.", bien: true, explica: "Se acompaña un tiempo junto a alguien con experiencia, y se le dan responsabilidades poco a poco." },
                  { texto: "Le entrego todo el sonido desde el primer día, para no perder más tiempo.", explica: "Las responsabilidades se dan poco a poco, mientras se acompaña a la persona." },
                  { texto: "Lo dejo solo, para que aprenda equivocándose.", explica: "Se lo acompaña: ensaya y sirve junto a alguien con experiencia, y se lo sigue animando." },
                ],
                apoyo: "Se le dan responsabilidades poco a poco",
                explica: "Se acompaña a la persona un tiempo junto a alguien con experiencia, y se le dan responsabilidades poco a poco.",
              },
              {
                tipo: "explica",
                apoyo: "Se lo sigue acompañando y animando",
                clave: {
                  id: "pr-alabanza-3-5-a4-2",
                  tipo: "corta",
                  pregunta: "¿Cómo vas a acompañar a Andrés para que crezca en el equipo, según la lección?",
                  ideas: [
                    { id: "junto", peso: 40, texto: "Servirá un tiempo junto a alguien con experiencia.", formas: ["junto a (alguien|alguna|una|un|otro)", "con experiencia", "a su lado", "con (otro|un) tecnico"] },
                    { id: "forma", peso: 30, texto: "Lo formaré en lo técnico y en lo espiritual.", formas: ["lo tecnico", "lo espiritual", "espiritual*", "su vida con dios"] },
                    { id: "poco", peso: 30, texto: "Le daré responsabilidades poco a poco y lo seguiré acompañando y animando.", formas: ["poco a poco", "responsabilidad*", "anim*", "de a poco", "paso a paso", "segui* acompan*"] },
                  ],
                  modelo: "Servirá un tiempo junto a un técnico con experiencia. Lo formaré en lo técnico y en lo espiritual, le daré responsabilidades poco a poco y lo seguiré acompañando y animando.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hace un ministerio de alabanza sano.",
            texto: "Un ministerio de alabanza sano forma un [[equipo]] y forma a los que vendrán [[después]], para que la [[obra]] siga.",
            distractores: ["público", "antes", "fama"],
            errores: {
              "público": "Un ministerio sano forma un equipo: no depende de una sola persona.",
              antes: "Un ministerio sano forma a los que vendrán después, para que la obra siga.",
              fama: "El director forma a otros para que la obra siga.",
            },
            apoyo: "Un ministerio de alabanza sano no depende de una sola persona: forma un equipo y forma a los que vendrán después",
            explica: "Un ministerio de alabanza sano no depende de una sola persona: forma un equipo y forma a los que vendrán después. Un buen director no se hace indispensable: forma a otros.",
          },
          {
            consigna: "Completa lo que hace el director, como Pablo con Timoteo.",
            texto: "Como Pablo con Timoteo, el director [[forma]] a otros que puedan dirigir, tocar y [[enseñar]], para que la obra [[siga]].",
            distractores: ["reemplaza", "competir", "termine"],
            errores: {
              reemplaza: "El director forma a otros que puedan dirigir, tocar y enseñar.",
              competir: "El director forma a otros que puedan enseñar también a otros.",
              termine: "El director forma a otros para que la obra siga.",
            },
            apoyo: "El director forma a otros que puedan dirigir, tocar y enseñar, para que la obra siga",
            ref: "2 Timoteo 2:2",
            explica: "Pablo le pidió a Timoteo: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros». Así el director forma a otros que puedan dirigir, tocar y enseñar, para que la obra siga.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un director con muchos años en la iglesia te dice: Prefiero hacerlo todo yo; si enseño a otros, alguien me puede quitar el lugar.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que un buen director no se hace indispensable: forma a otros.", bien: true, explica: "Un buen director no se hace indispensable: forma a otros que puedan dirigir, tocar y enseñar, para que la obra siga." },
              { texto: "Que tiene razón: nadie debe aprender lo que solo él sabe hacer.", explica: "Un ministerio sano no depende de una sola persona: forma a los que vendrán después." },
              { texto: "Que enseñe a otros, pero sin dejarlos dirigir nunca un culto.", explica: "El director forma a otros que puedan dirigir, tocar y enseñar, para que la obra siga." },
              { texto: "Que espere a estar muy viejo para empezar a enseñar a alguien.", explica: "Un buen director forma a otros, y puede empezar a formar a alguien este año." },
            ],
            apoyo: "Un buen director no se hace indispensable: forma a otros",
            ref: "2 Timoteo 2:2",
            explica: "Un ministerio de alabanza sano no depende de una sola persona: forma un equipo y forma a los que vendrán después.",
          },
          {
            caso: "Una cantante joven del equipo te pregunta: ¿Por qué pierdes tiempo enseñando a los que empiezan, si tú lo haces mejor?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Porque el ministerio no depende de uno solo: así la obra sigue.", bien: true, explica: "Un ministerio sano no depende de una sola persona: el director forma a otros para que la obra siga." },
              { texto: "Porque así me deben un favor para cuando yo necesite algo de ellos.", explica: "El director forma a otros para que la obra siga, no para que le deban favores." },
              { texto: "Porque el pastor me obliga a hacerlo así.", explica: "Un buen director no se hace indispensable: forma a otros porque la obra tiene que seguir." },
              { texto: "Tienes razón: desde hoy lo haré todo yo, que lo hago mejor que nadie.", explica: "Un buen director no se hace indispensable: forma a otros." },
            ],
            apoyo: "El director forma a otros que puedan dirigir, tocar y enseñar, para que la obra siga",
            ref: "1 Crónicas 25:8",
            explica: "En un buen equipo, los que saben más enseñan a los que empiezan, y todos sirven juntos: así la obra sigue.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Se elige a los que sirven por su testimonio, su vida en la iglesia, su capacidad o disposición a aprender y su corazón dispuesto",
            ref: "1 Crónicas 25:1",
            clave: {
              id: "pr-alabanza-3-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué se busca en alguien para que sirva en el equipo de alabanza?",
              ideas: [
                { id: "testimonio", peso: 34, texto: "Un testimonio de vida cristiana, y que sea parte de la iglesia y de su vida, no solo de la plataforma.", formas: ["testimonio", "vida cristiana", "parte de la iglesia", "vida de la iglesia", "vida en la iglesia", "no solo de la plataforma"] },
                { id: "capacidad", peso: 33, texto: "Capacidad musical o técnica, o disposición a aprender.", formas: ["capacidad", "capaz", "disposicion a aprender", "dispuest* a aprender", "ganas de aprender", "quiera aprender", "(sepa|saber) (tocar|cantar)"] },
                { id: "corazon", peso: 33, texto: "Un corazón dispuesto a servir y a recibir corrección, y tiempo para servir con constancia.", formas: ["corazon dispuesto", "dispuest* a servir", "correccion", "constancia", "tiempo para (ensayar|servir)"] },
              ],
              modelo: "Se busca un testimonio de vida cristiana y que sea parte de la vida de la iglesia. También capacidad musical o técnica, o disposición a aprender, y un corazón dispuesto a servir y a recibir corrección.",
            },
          },
          {
            apoyo: "El servicio musical se tomaba en serio: se elegía y se apartaba a los que servirían",
            ref: "1 Crónicas 25:1",
            clave: {
              id: "pr-alabanza-3-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que para entrar al equipo de alabanza basta con tocar bien. ¿Qué le explicas?",
              ideas: [
                { id: "testimonio", peso: 50, texto: "Que también se pide un testimonio de vida cristiana y ser parte de la iglesia y de su vida, no solo de la plataforma.", formas: ["testimonio", "vida cristiana", "parte de la iglesia", "vida de la iglesia", "vida en la iglesia", "plataforma"] },
                { id: "corazon", peso: 50, texto: "Y un corazón dispuesto a servir y a recibir corrección, con tiempo para servir con constancia.", formas: ["corazon dispuesto", "dispuest* a servir", "correccion", "constancia", "tiempo para (ensayar|servir)", "humildad", "humildes"] },
              ],
              errores: [
                { id: "basta", texto: "No basta con tocar bien: se pide también testimonio, vida en la iglesia y un corazón dispuesto.", formas: ["tiene razon", "solo (importa|cuenta) (tocar|que)"], anula: "testimonio" },
              ],
              modelo: "Le explico que no basta con tocar bien. El servicio musical se toma en serio: se pide un testimonio de vida cristiana y ser parte de la iglesia, y un corazón dispuesto a servir y a recibir corrección.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Problemas comunes y cómo resolverlos
    "alabanza-3-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Santiago, ¿qué hay donde hay celos y contención?", reverso: "Perturbación y toda obra perversa.", apoyo: "Donde hay celos y contención hay perturbación" },
              { frente: "¿Qué se arregla en un ensayo, y qué no tanto?", reverso: "Una canción desafinada sí; una relación rota, no tanto.", apoyo: "Una canción desafinada se arregla en un ensayo; una relación rota, no tanto" },
              { frente: "¿Qué camino dio Jesús para un conflicto personal?", reverso: "Hablar primero a solas, sin chismes ni grupos de bandos.", apoyo: "Primero a solas, sin chismes ni grupos de bandos" },
              { frente: "Según Proverbios, ¿qué quita la ira?", reverso: "La blanda respuesta.", apoyo: "la blanda respuesta quita la ira" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué son muchos de los conflictos del equipo?", reverso: "Por gustos: el volumen, el estilo, los himnos o los coros nuevos.", apoyo: "Muchos conflictos son por gustos: el volumen, el estilo, los himnos o los coros nuevos" },
              { frente: "¿Qué vale más que el gusto de cualquiera?", reverso: "La unidad de la iglesia.", apoyo: "La unidad de la iglesia vale más que el gusto de cualquiera" },
              { frente: "¿Qué hizo Jesús con el cansancio de los suyos?", reverso: "Lo cuidó: les dijo que vinieran aparte y descansaran un poco.", apoyo: "Jesús también cuidó el cansancio de los suyos" },
              { frente: "¿Qué le hace falta a un equipo agotado?", reverso: "Turnos y descanso.", apoyo: "Un equipo agotado no sirve bien: hacen falta turnos y descanso" },
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
            consigna: "Une cada problema común del ministerio de alabanza con su solución.",
            pares: [
              ["Celos y competencia", "Servir por turnos y honrar a cada uno"],
              ["Conflictos personales", "Hablar primero a solas, como enseñó Jesús"],
              ["Quejas por el volumen o el estilo", "Escuchar con mansedumbre, ajustar lo razonable y enseñar"],
              ["Impuntualidad y falta de preparación", "Acuerdos claros y amor firme"],
              ["El músico estrella", "Una conversación honesta sobre humildad y servicio"],
            ],
            apoyo: "La Biblia da caminos para enfrentarlos",
            ref: "Santiago 3:16",
            explica: "Los celos se enfrentan con turnos y honrando a cada uno; los conflictos, hablando primero a solas; las quejas, escuchando con mansedumbre; la impuntualidad, con acuerdos claros y amor firme; y el músico estrella, con una conversación honesta sobre humildad y servicio.",
          },
          {
            consigna: "Une cada situación del equipo con lo que aconseja la lección.",
            pares: [
              ["Dos cantantes compiten por los solos", "Turnos para cantar, y honrar a cada una"],
              ["Un músico ofendió a otro en el ensayo", "Que hablen primero a solas, sin chismes"],
              ["Una hermana se queja del volumen", "Escucharla con mansedumbre y ajustar lo razonable"],
              ["El equipo llega siempre tarde al ensayo", "Acuerdos claros, con amor firme"],
              ["El equipo está agotado después de meses", "Descanso y cuidado de las familias del equipo"],
            ],
            apoyo: "Quejas por el volumen o el estilo: escuchar con mansedumbre, ajustar lo razonable y enseñar",
            ref: "Mateo 18:15",
            explica: "La competencia se enfrenta con turnos y honra; una ofensa, hablando primero a solas; una queja, escuchando con mansedumbre y ajustando lo razonable; la impuntualidad, con acuerdos claros y amor firme; y el cansancio, con descanso y cuidado de las familias.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Los conflictos se hablan primero a solas",
            ref: "Mateo 18:15",
            titulo: "Dos voces que no se hablan",
            relato: [
              "Eres el director de alabanza. Lucía y Carmen, dos cantantes del equipo, no se hablan desde hace un mes.",
              "Todo empezó cuando a Lucía le dieron el solo del domingo. Carmen se sintió ofendida, y ahora cada una tiene su grupo dentro del equipo y hablan una de la otra.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué problema hay detrás de lo que está pasando?",
                opciones: [
                  { texto: "Celos y competencia entre ellas, que destruyen un equipo.", bien: true, explica: "Los celos entre cantantes o músicos destruyen un equipo más rápido que cualquier error musical." },
                  { texto: "Un simple error musical, que se arregla en el próximo ensayo.", explica: "No es un error musical: son celos, y una relación rota no se arregla en un ensayo." },
                  { texto: "Una queja por el volumen o por el estilo de los cantos.", explica: "El problema empezó por un solo: son celos y competencia." },
                ],
                apoyo: "Los celos entre cantantes o músicos destruyen un equipo más rápido que cualquier error musical",
                explica: "Santiago advierte que donde hay celos y contención, allí hay perturbación y toda obra perversa.",
              },
              {
                tipo: "situacion",
                pregunta: "Carmen viene a contarte todo lo que dicen de ella. ¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que hable primero a solas con Lucía, como lo enseñó Jesús.", bien: true, explica: "Para los conflictos personales, Jesús dio un camino: primero a solas." },
                  { texto: "Que junte a los del equipo que la apoyan, para hacerse fuerte.", explica: "Primero a solas, sin chismes ni grupos de bandos." },
                  { texto: "Que no le hable hasta que Lucía le pida perdón.", explica: "Jesús enseñó a ir y hablar primero a solas: si te oyere, has ganado a tu hermano." },
                ],
                apoyo: "Conflictos personales: hablar primero a solas, como enseñó Jesús",
                explica: "Jesús dio un camino: «si tu hermano peca contra ti, ve y repréndele estando tú y él solos; si te oyere, has ganado a tu hermano».",
              },
              {
                tipo: "situacion",
                pregunta: "Para que no vuelva a pasar con los solos, ¿qué decides?",
                opciones: [
                  { texto: "Que sirvan por turnos en los solos, y honrar a cada una.", bien: true, explica: "Celos y competencia: servir por turnos y honrar a cada uno." },
                  { texto: "Que cante siempre la que tenga la mejor voz del equipo.", explica: "Eso alimenta la competencia: ante los celos, se sirve por turnos y se honra a cada uno." },
                  { texto: "Que nadie cante más solos, y que cada una se quede callada.", explica: "El camino de la lección es servir por turnos y honrar a cada uno." },
                ],
                apoyo: "Celos y competencia: servir por turnos y honrar a cada uno",
                explica: "Donde hay celos, el equipo cultiva la humildad: sirve por turnos y honra a cada uno.",
              },
              {
                tipo: "explica",
                apoyo: "Donde hay celos y contención hay perturbación, y por eso el equipo cultiva la humildad",
                clave: {
                  id: "pr-alabanza-3-6-a3-1",
                  tipo: "corta",
                  pregunta: "¿Qué le enseñarás al equipo con lo que pasó entre Lucía y Carmen?",
                  ideas: [
                    { id: "celos", peso: 50, texto: "Que donde hay celos y contención hay perturbación: los celos destruyen un equipo, y por eso cultivamos la humildad.", formas: ["celo*", "contencion", "perturbacion", "competencia", "envidia", "humildad", "humildes"] },
                    { id: "solas", peso: 50, texto: "Que los conflictos se hablan primero a solas, sin chismes ni grupos de bandos.", formas: ["a solas", "(estando|quedan|queden|esten|estar|hablen) solos", "sin chismes", "bandos", "cara a cara", "en privado", "personalmente"] },
                  ],
                  modelo: "Les enseñaré que donde hay celos y contención hay perturbación, y que los celos destruyen un equipo. Y que los conflictos se hablan primero a solas, sin chismes ni grupos de bandos, como enseñó Jesús.",
                },
              },
            ],
          },
          {
            apoyo: "Ante las quejas, ayuda el consejo de Proverbios",
            ref: "Proverbios 15:1",
            titulo: "La queja del volumen",
            relato: [
              "Eres el director de alabanza. Al salir del culto, don Ernesto, un hermano mayor, te reclama con enojo: La música está tan fuerte que no se entiende la letra.",
              "El baterista, que estaba cerca, le contesta de mal modo, y varios hermanos empiezan a tomar partido.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo le respondes a don Ernesto en ese momento?",
                opciones: [
                  { texto: "Con calma: lo escuchas con mansedumbre y le das las gracias.", bien: true, explica: "«La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor»." },
                  { texto: "Con firmeza: le dices que se acostumbre, que así se toca ahora.", explica: "La palabra áspera hace subir el furor: ante las quejas, se escucha con mansedumbre." },
                  { texto: "Le das la razón al baterista, para defender a tu equipo.", explica: "Ante las quejas ayuda la blanda respuesta, no tomar partido con palabras ásperas." },
                ],
                apoyo: "Quejas por el volumen o el estilo: escuchar con mansedumbre, ajustar lo razonable y enseñar",
                explica: "Ante las quejas, ayuda el consejo de Proverbios: la blanda respuesta quita la ira.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces después con la queja del volumen?",
                opciones: [
                  { texto: "Lo revisas con el equipo y ajustan juntos lo que sea razonable.", bien: true, explica: "Ante las quejas por el volumen se escucha con mansedumbre, se ajusta lo razonable y se enseña." },
                  { texto: "Nada: los que se quejan del volumen nunca tienen ninguna razón.", explica: "Se escucha con mansedumbre y se ajusta lo razonable." },
                  { texto: "Bajas todo al mínimo, para que nunca nadie más se vuelva a quejar.", explica: "Se ajusta lo razonable y se enseña: no se trata de dar a cada uno su gusto." },
                ],
                apoyo: "escuchar con mansedumbre, ajustar lo razonable y enseñar",
                explica: "Quejas por el volumen o el estilo: escuchar con mansedumbre, ajustar lo razonable y enseñar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con el baterista que contestó de mal modo?",
                opciones: [
                  { texto: "Hablas con él a solas, y le enseñas sobre la blanda respuesta.", bien: true, explica: "Los conflictos se hablan primero a solas, y la blanda respuesta quita la ira." },
                  { texto: "Lo corriges delante de todos, para que los demás aprendan de él.", explica: "Primero a solas, sin chismes ni grupos de bandos." },
                  { texto: "Lo felicitas por defender al equipo con valentía.", explica: "La palabra áspera hace subir el furor: no es un ejemplo para seguir." },
                ],
                apoyo: "Conflictos personales: hablar primero a solas, como enseñó Jesús",
                explica: "Se habla primero a solas con él, y se le enseña que la palabra áspera hace subir el furor.",
              },
              {
                tipo: "explica",
                apoyo: "Los conflictos se hablan primero a solas, y la blanda respuesta quita la ira",
                clave: {
                  id: "pr-alabanza-3-6-a3-2",
                  tipo: "corta",
                  pregunta: "¿Cómo vas a responder a las quejas de aquí en adelante, según la lección?",
                  ideas: [
                    { id: "blanda", peso: 50, texto: "Con una respuesta blanda, porque la blanda respuesta quita la ira y la palabra áspera hace subir el furor.", formas: ["blanda respuesta", "respuesta blanda", "respuesta (suave|amable|tranquila|calmada)", "quita la ira", "con calma", "sin enojo", "sin (enojarme|pelear|gritar)", "(contest*|respond*) con (suavidad|calma|mansedumbre)"] },
                    { id: "ajustar", peso: 50, texto: "Escuchando con mansedumbre, ajustando lo razonable y enseñando.", formas: ["escuch*", "ajus*", "razonable", "ensen*", "mansedumbre"] },
                  ],
                  errores: [
                    { id: "aspera", texto: "La palabra áspera hace subir el furor: ante las quejas ayuda la blanda respuesta.", formas: ["(con|usar|uso|usare|usando) (palabras|palabra) (aspera|asperas|duras|dura)", "(respond*|contest*) (fuerte|duro)"], anula: "blanda" },
                  ],
                  modelo: "Responderé con una respuesta blanda, porque la blanda respuesta quita la ira y la palabra áspera hace subir el furor. Escucharé con mansedumbre, ajustaré lo razonable y enseñaré.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Cuida la unidad de la iglesia o pone el gusto propio primero? Lleva cada frase a su grupo.",
            grupos: ["Cuida la unidad de la iglesia", "Pone el gusto propio primero"],
            frases: [
              { texto: "Cantar a una voz, para glorificar juntos a Dios", grupo: 0 },
              { texto: "Escuchar con mansedumbre al que se queja del estilo", grupo: 0 },
              { texto: "Ajustar lo razonable del volumen", grupo: 0 },
              { texto: "Exigir que solo se canten los cantos que me gustan", grupo: 1 },
              { texto: "Dejar de cantar porque el estilo no es de mi gusto", grupo: 1 },
              { texto: "Formar un grupo con los que piensan como yo sobre la música", grupo: 1 },
            ],
            apoyo: "La unidad de la iglesia vale más que el gusto de cualquiera",
            ref: "Romanos 15:5-6",
            explica: "Pablo ora para que la iglesia, unánime y a una voz, glorifique a Dios: la unidad de la iglesia vale más que el gusto de cualquiera.",
          },
          {
            consigna: "¿Qué muestra cada hermano: que valora la unidad o que pone su gusto musical primero? Lleva cada frase a su grupo.",
            grupos: ["Valora la unidad", "Pone su gusto musical primero"],
            frases: [
              { texto: "Al joven no le gustan los himnos, pero los canta con los mayores", grupo: 0 },
              { texto: "A la hermana mayor le cuestan los coros nuevos, y canta con la iglesia", grupo: 0 },
              { texto: "El músico prefiere otro estilo, pero sirve con alegría al pueblo", grupo: 0 },
              { texto: "Un hermano se va de la iglesia porque ya no cantan su himno favorito", grupo: 1 },
              { texto: "Una joven critica en el chat los cantos que piden los mayores", grupo: 1 },
              { texto: "El baterista toca más fuerte cuando le piden bajar el volumen", grupo: 1 },
            ],
            apoyo: "La unidad de la iglesia, que glorifica a Dios a una voz, vale más que los gustos musicales",
            ref: "Romanos 15:5-6",
            explica: "La unidad de la iglesia, que glorifica a Dios a una voz, vale más que los gustos musicales: el joven, la hermana mayor y el músico ponen la unidad primero, aunque el canto no sea de su gusto.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Santiago, ¿qué hay donde hay celos y contención? Toca las palabras que lo dicen.",
            texto: "Porque donde hay celos y contención, allí hay [[perturbación y toda obra perversa]]",
            apoyo: "Los celos entre cantantes o músicos destruyen un equipo más rápido que cualquier error musical",
            ref: "Santiago 3:16",
            explica: "Donde hay celos y contención, allí hay perturbación y toda obra perversa: por eso los celos destruyen un equipo más rápido que cualquier error musical.",
          },
          {
            consigna: "Jesús cuidó el cansancio de los suyos. ¿Qué les dijo que hicieran en el lugar desierto? Toca las palabras que lo dicen.",
            texto: "Venid vosotros aparte a un lugar desierto, y [[descansad un poco]]",
            apoyo: "Un equipo agotado no sirve bien: hacen falta turnos y descanso",
            ref: "Marcos 6:31",
            explica: "Jesús les dijo: «Venid vosotros aparte a un lugar desierto, y descansad un poco». Un equipo agotado no sirve bien: hacen falta turnos y descanso.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano mayor te dice: Si siguen cantando coros nuevos, me voy a otra iglesia donde canten himnos.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que lo escuchas, y que la unidad vale más que el gusto de cualquiera.", bien: true, explica: "La unidad de la iglesia vale más que el gusto de cualquiera; ante una queja por el estilo, se escucha con mansedumbre, se ajusta lo razonable y se enseña." },
              { texto: "Que se vaya si quiere: el estilo de los jóvenes es el que vale ahora.", explica: "Ningún gusto está por encima de la unidad: la unidad de la iglesia vale más que el gusto de cualquiera." },
              { texto: "Que tiene razón: desde hoy solo cantaremos los himnos que él quiere.", explica: "La unidad no es darle a uno su gusto: vale más que el gusto de cualquiera, también el suyo." },
              { texto: "Que no se preocupe: los coros nuevos son solo para los jóvenes de hoy.", explica: "Pablo ora para que la iglesia glorifique a Dios unánime, a una voz: el canto es de todos." },
            ],
            apoyo: "La unidad de la iglesia vale más que el gusto de cualquiera",
            ref: "Romanos 15:5-6",
            explica: "Muchos conflictos son por gustos, como los himnos o los coros nuevos; la unidad de la iglesia vale más que el gusto de cualquiera.",
          },
          {
            caso: "Un joven del equipo te dice: Los himnos son aburridos; no los toquemos más, aunque los mayores los pidan.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que glorificamos a Dios a una voz: la unidad vale más que el gusto.", bien: true, explica: "La unidad de la iglesia, que glorifica a Dios a una voz, vale más que los gustos musicales." },
              { texto: "Que tiene razón: lo que le gusta al equipo es lo que se debe tocar siempre.", explica: "El gusto del equipo no está por encima de la unidad de la iglesia." },
              { texto: "Que los toque, pero mal, para que los mayores dejen de pedirlos.", explica: "Eso rompe la unidad: la iglesia glorifica a Dios a una voz." },
              { texto: "Que los mayores se acostumbren, porque el estilo nuevo es el mejor.", explica: "Ningún gusto está por encima de la unidad: vale más que el gusto de cualquiera." },
            ],
            apoyo: "La unidad de la iglesia, que glorifica a Dios a una voz, vale más que los gustos musicales",
            ref: "Romanos 15:5-6",
            explica: "Pablo ora por un mismo sentir, para que la iglesia, unánime y a una voz, glorifique a Dios: la unidad vale más que el gusto de cualquiera.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los conflictos se hablan primero a solas, y la blanda respuesta quita la ira",
            ref: "Mateo 18:15",
            clave: {
              id: "pr-alabanza-3-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué caminos da la Biblia para resolver un conflicto o una queja en el equipo de alabanza?",
              ideas: [
                { id: "solas", peso: 50, texto: "Hablar primero a solas con el hermano, como enseñó Jesús, sin chismes ni grupos de bandos.", formas: ["a solas", "(estando|quedan|queden|esten|estar|hablen) solos", "sin chismes", "bandos", "cara a cara", "en privado", "personalmente"] },
                { id: "blanda", peso: 50, texto: "Responder con una respuesta blanda: la blanda respuesta quita la ira.", formas: ["blanda respuesta", "respuesta blanda", "respuesta (suave|amable|tranquila|calmada)", "quita la ira", "mansedumbre", "con calma", "sin enojo", "(contest*|respond*) con (suavidad|calma)"] },
              ],
              errores: [
                { id: "aspera", texto: "La palabra áspera hace subir el furor: ante las quejas ayuda la blanda respuesta.", formas: ["(con|usar|uso|usare|usando) (palabras|palabra) (aspera|asperas|duras|dura)", "(respond*|contest*) (fuerte|duro)"], anula: "blanda" },
                { id: "contar", texto: "Los conflictos se hablan primero a solas, sin chismes ni grupos de bandos.", formas: ["(contar|contarle|contarlo|decirle|decirlo) a todo el equipo", "(contar|contarle|contarlo|comentarlo|comentar) (a|con) (todos|los)"], anula: "solas" },
              ],
              modelo: "Primero, hablar a solas con el hermano, como enseñó Jesús, sin chismes ni grupos de bandos. Y ante las quejas, dar una respuesta blanda, porque la blanda respuesta quita la ira y la palabra áspera hace subir el furor.",
            },
          },
          {
            apoyo: "Primero a solas, sin chismes ni grupos de bandos",
            ref: "Mateo 18:15",
            clave: {
              id: "pr-alabanza-3-6-a7-2",
              tipo: "corta",
              pregunta: "Un guitarrista te cuenta que el tecladista lo humilló en el ensayo, y quiere que todo el equipo lo sepa. ¿Qué le aconsejas?",
              ideas: [
                { id: "solas", peso: 60, texto: "Que hable primero a solas con el tecladista, como enseñó Jesús.", formas: ["a solas", "(estando|quedan|queden|esten|estar|hablen) solos", "cara a cara", "en privado", "personalmente"] },
                { id: "chismes", peso: 40, texto: "Que no lo cuente a todo el equipo: sin chismes ni grupos de bandos; si lo oye, habrá ganado a su hermano.", formas: ["sin chismes", "chisme*", "bandos", "no (ande|andes|anden|andar) con chisme*", "nada de chisme*", "ni chisme*", "no (forme|formen|haga|hagan|arme|armen) bandos", "no (lo|le|se) (cuente|diga|cuentes|digas)", "no (cuente|diga|cuentes|digas)", "sin (contarlo|contar|contarselo|decirlo|decir)", "gan* a su hermano"] },
              ],
              errores: [
                { id: "contar-solas", texto: "Primero a solas, sin chismes ni grupos de bandos.", formas: ["(cuente|contarlo|contar|diga|decirlo|cuentes) a todo el equipo", "(cuente|contarlo|contar|diga|decirlo|cuentes) a todos", "que todos lo sepan", "que lo sepa todo el equipo"], anula: "solas" },
                { id: "contar-chismes", texto: "Primero a solas, sin chismes ni grupos de bandos.", formas: ["(cuente|contarlo|contar|diga|decirlo|cuentes) a todo el equipo", "(cuente|contarlo|contar|diga|decirlo|cuentes) a todos", "que todos lo sepan", "que lo sepa todo el equipo"], anula: "chismes" },
              ],
              modelo: "Le aconsejo que hable primero a solas con el tecladista, como enseñó Jesús, y que no lo cuente a todo el equipo: sin chismes ni grupos de bandos. Si lo escucha, habrá ganado a su hermano.",
            },
          },
        ],
      },
    ],
  },
};
