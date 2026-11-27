/**
 * Las prácticas de «Historia de la iglesia II» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-historia-2.ts), con la guía de docs/academia-practicas.md.
 * Cada actividad practica un objetivo de su lección, trae dos versiones y cita una frase copiada de la lección; su
 * consigna dice qué hacer y con qué criterio, para que se entienda en todas sus formas de jugar. Las líneas del tiempo
 * usan solo las fechas y las épocas como las da la lección (de Lutero a Olazábal), los casos y los escenarios llevan la
 * lección al servicio de hoy (el perdón que no se compra, el acceso a Dios por Cristo, el cuidado de los nuevos, la
 * oración unida y la historia de la iglesia hispana) y la respuesta católica de Trento se pregunta con las palabras de
 * la lección.
 *
 * La lección del movimiento pentecostal cuenta la historia; lo que enseña la Biblia sobre el bautismo en el Espíritu y
 * las lenguas se estudia en otra materia, según la declaración de fe (y si las lenguas son la señal de ese bautismo es un
 * punto por confirmar). Por eso ninguna actividad pregunta por esa doctrina ni por lo que Parham enseñó sobre las
 * lenguas: de Topeka solo se pregunta el hecho, con las palabras de la lección.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_HISTORIA_2: PracticasMateria = {
  materia: "n4-historia-2",
  mision: {
    titulo: "De Wittenberg a nuestra iglesia",
    intro: "Tu pastor te pidió que prepares una serie de clases para los nuevos líderes de tu iglesia hispana: la historia de la iglesia desde la Reforma hasta hoy. Te van a preguntar por Lutero y los principios de la Reforma, por la Biblia en español, por los avivamientos y las misiones, por el comienzo del movimiento pentecostal y por cómo llegó el evangelio a América Latina y a los hispanos de los Estados Unidos. Repasa las seis lecciones para tener cada clase lista.",
    cierre: "Ya puedes contar cómo Dios encendió la Reforma con el evangelio de la gracia, avivó a su iglesia, la envió a las naciones y llevó el evangelio hasta los hispanos de hoy: «Mas el justo por la fe vivirá». Ahora te toca escribir con fidelidad tu capítulo.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Lutero y la Reforma
    "n4-historia-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde era profesor de Biblia Martín Lutero?", reverso: "En Wittenberg: era monje y profesor de Biblia.", apoyo: "monje y profesor de Biblia en Wittenberg" },
              { frente: "¿Qué eran las indulgencias que se vendían en tiempos de Lutero?", reverso: "Documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero.", apoyo: "documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero" },
              { frente: "¿Qué publicó Lutero el 31 de octubre de 1517?", reverso: "Sus 95 tesis contra el abuso de las indulgencias.", apoyo: "El 31 de octubre de 1517, Lutero publicó sus 95 tesis contra ese abuso" },
              { frente: "¿Qué hizo Lutero en 1521, ante la Dieta de Worms?", reverso: "Se negó a retractarse si no lo convencían con la Escritura y con razones claras.", apoyo: "En 1521, ante la Dieta de Worms, se negó a retractarse si no lo convencían con la Escritura y con razones claras" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué no encontraba Lutero con sus esfuerzos religiosos?", reverso: "Paz: buscaba cómo encontrar a un Dios misericordioso.", apoyo: "no encontraba paz con sus esfuerzos religiosos" },
              { frente: "¿Qué entendió Lutero al estudiar la carta a los Romanos?", reverso: "Que el justo por la fe vivirá: la justicia que Dios pide, Dios mismo la da por gracia.", apoyo: "La justicia que Dios pide, Dios mismo la da por gracia a quien cree en Cristo" },
              { frente: "¿Dónde se escondió Lutero después de la Dieta de Worms?", reverso: "En el castillo de Wartburgo.", apoyo: "Escondido después en el castillo de Wartburgo" },
              { frente: "¿Qué tradujo Lutero al alemán mientras estaba escondido?", reverso: "El Nuevo Testamento, que se publicó en 1522.", apoyo: "tradujo el Nuevo Testamento al alemán, que se publicó en 1522" },
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
            consigna: "Ordena en el tiempo la vida de Martín Lutero, del primer hecho al último.",
            eventos: [
              { texto: "Nace Martín Lutero, que sería monje y profesor de Biblia", fecha: "1483" },
              { texto: "Lutero publica sus 95 tesis contra la venta de indulgencias", fecha: "31 de octubre de 1517" },
              { texto: "Ante la Dieta de Worms, Lutero se niega a retractarse", fecha: "1521" },
              { texto: "Se publica el Nuevo Testamento de Lutero en alemán", fecha: "1522" },
              { texto: "Muere Martín Lutero", fecha: "1546" },
            ],
            apoyo: "En 1517 publicó sus 95 tesis contra las indulgencias; en 1521 se negó en Worms a retractarse sin pruebas de la Escritura; y en 1522 publicó el Nuevo Testamento en alemán",
            ref: "Romanos 1:16-17",
            explica: "Lutero vivió de 1483 a 1546. El 31 de octubre de 1517 publicó sus 95 tesis; en 1521 se negó a retractarse ante la Dieta de Worms, y en 1522 se publicó su Nuevo Testamento en alemán.",
          },
          {
            consigna: "Ordena estos hechos de la Reforma de Lutero en el tiempo, del primero al último.",
            eventos: [
              { texto: "Nace el monje alemán que cambiaría la historia: Martín Lutero", fecha: "1483" },
              { texto: "Lutero escribe 95 tesis contra el abuso de las indulgencias", fecha: "31 de octubre de 1517" },
              { texto: "En Worms, Lutero pide que lo convenzan con la Escritura", fecha: "1521" },
              { texto: "Sale publicado el Nuevo Testamento que Lutero tradujo al alemán", fecha: "1522" },
              { texto: "Muere Lutero, el profesor de Biblia de Wittenberg", fecha: "1546" },
            ],
            apoyo: "Martín Lutero (1483-1546), monje y profesor de Biblia en Wittenberg",
            ref: "Romanos 1:16-17",
            explica: "Lutero nació en 1483. Publicó sus 95 tesis el 31 de octubre de 1517, se negó a retractarse en Worms en 1521, publicó el Nuevo Testamento en alemán en 1522 y murió en 1546.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada principio de la Reforma con lo que enseña.",
            pares: [
              ["Solo la Escritura", "La Biblia es la autoridad final, por encima de las tradiciones"],
              ["Solo la gracia", "La salvación es un regalo que no merecemos"],
              ["Solo la fe", "Somos justificados por la fe en Cristo, no por obras"],
              ["Solo Cristo", "Él es el único mediador entre Dios y los hombres"],
            ],
            apoyo: "La Reforma recuperó solo la Escritura, solo la gracia, solo la fe y solo Cristo",
            ref: "Efesios 2:8-9",
            explica: "Solo la Escritura: la Biblia es la autoridad final. Solo la gracia: la salvación es un regalo que no merecemos. Solo la fe: somos justificados por la fe en Cristo, no por obras. Solo Cristo: él es el único mediador.",
          },
          {
            consigna: "¿Qué principio de la Reforma responde a cada frase? Une cada frase con su principio.",
            pares: [
              ["Ninguna tradición está por encima de la Biblia", "Solo la Escritura"],
              ["No me gano la salvación: es un regalo que no merezco", "Solo la gracia"],
              ["Dios me justifica por la fe en Cristo, no por mis obras", "Solo la fe"],
              ["Entre Dios y los hombres hay un solo mediador", "Solo Cristo"],
              ["Cualquier creyente puede acercarse a Dios por medio de Cristo", "El sacerdocio de todos los creyentes"],
            ],
            apoyo: "Además, el sacerdocio de todos los creyentes: todo creyente tiene acceso a Dios por Cristo",
            ref: "1 Pedro 2:9",
            explica: "La Biblia está por encima de las tradiciones (solo la Escritura); la salvación es un regalo (solo la gracia) que se recibe por la fe, no por obras (solo la fe); Cristo es el único mediador (solo Cristo), y todo creyente tiene acceso a Dios por él.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Tu salvación no depende de tus obras, sino de la gracia de Dios en Cristo",
            ref: "Efesios 2:8-9",
            titulo: "Un perdón a cambio de una ofrenda",
            relato: [
              "Esteban lleva dos meses en la iglesia y va a la célula que tú diriges. Un pecado de su pasado no lo deja en paz.",
              "Un domingo te cuenta que oyó en la radio a un predicador que promete el perdón de los pecados a quien envíe una ofrenda grande. Esteban quiere enviarla, para que Dios por fin lo perdone.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A qué abuso del tiempo de Lutero se parece esa promesa?",
                opciones: [
                  { texto: "A la venta de indulgencias, contra la que Lutero publicó sus 95 tesis.", bien: true, explica: "Se vendían indulgencias: documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero." },
                  { texto: "A lo que pedían las 95 tesis de Lutero: ofrendas a cambio del perdón.", explica: "Fue al revés: Lutero publicó sus 95 tesis contra la venta de indulgencias." },
                  { texto: "A lo que Lutero defendió en Worms: que el perdón se paga con dinero.", explica: "En Worms, Lutero se negó a retractarse si no lo convencían con la Escritura, y en 1517 había publicado sus 95 tesis contra ese abuso." },
                  { texto: "A nada: en tiempos de Lutero nadie relacionaba el perdón con el dinero.", explica: "En aquel tiempo se vendían indulgencias, que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero." },
                ],
                apoyo: "En aquel tiempo se vendían indulgencias: documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero",
                explica: "En tiempos de Lutero se vendían indulgencias, y el 31 de octubre de 1517 Lutero publicó sus 95 tesis contra ese abuso.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué principio de la Reforma le muestras primero a Esteban?",
                opciones: [
                  { texto: "Solo la Escritura: que busque en la Biblia cuánto debe ofrendar.", explica: "La Biblia es la autoridad final, pero no pone un precio al perdón: la salvación es un regalo." },
                  { texto: "Solo la gracia: la salvación es un regalo que no merecemos.", bien: true, explica: "El perdón no se compra: la salvación es un regalo de Dios que no merecemos." },
                  { texto: "Solo la fe: que crea con fuerza que su ofrenda le comprará el perdón.", explica: "Somos justificados por la fe en Cristo, no por obras: la fe no está puesta en una ofrenda." },
                  { texto: "Ninguno todavía: que primero dé la ofrenda y después lo hablan.", explica: "La Reforma recuperó el corazón del evangelio: la salvación es un regalo que no merecemos." },
                ],
                apoyo: "Solo la gracia: la salvación es un regalo que no merecemos",
                explica: "La salvación es un regalo que no merecemos: no se compra con ofrendas ni se gana con obras.",
              },
              {
                tipo: "explica",
                apoyo: "La Reforma recuperó el corazón del evangelio",
                ref: "Efesios 2:8-9",
                clave: {
                  id: "pr-n4-historia-2-1-a4-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Esteban con Efesios 2:8-9.",
                  ideas: [
                    { id: "gracia", peso: 50, texto: "Que somos salvos por gracia: la salvación es un regalo, don de Dios, que no merecemos.", formas: ["por gracia", "gracia de dios", "un regalo", "regal*", "don de dios", "es don", "no (lo|la) merecemos", "no merecemos"] },
                    { id: "fe", peso: 50, texto: "Que se recibe por medio de la fe en Cristo, y no por obras ni por dinero.", formas: ["por medio de la fe", "por la fe", "fe en cristo", "cre* en cristo", "cre* en jesus", "no por obras", "no (es|son) por obras", "no por (dinero|ofrendas)"] },
                  ],
                  errores: [
                    { id: "comprar", texto: "El perdón no se compra: la salvación es un regalo que no merecemos.", formas: ["(se|lo|la) (compra|paga|gana) con (dinero|ofrenda*|obras)", "(comprar|pagar|ganar) (el|su|la) (perdon|salvacion)", "ofrenda (le|te|nos) (da|dara|compra|gana)"], anula: "gracia" },
                  ],
                  modelo: "Le diría que por gracia somos salvos por medio de la fe: la salvación es don de Dios y no se compra con ofrendas. No es por obras, para que nadie se gloríe; basta creer en Cristo, que lo perdona.",
                },
              },
            ],
          },
          {
            apoyo: "Solo Cristo: él es el único mediador entre Dios y los hombres",
            ref: "1 Timoteo 2:5",
            titulo: "Una joven que no se atreve a orar",
            relato: [
              "Lucía se entregó a Cristo hace poco y va a la clase de nuevos creyentes que tú enseñas.",
              "Te cuenta que no se atreve a orar sola. Siente que primero tiene que portarse mejor, y que necesita que una persona más santa ore por ella para que Dios la escuche.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Lucía cree que primero debe portarse mejor para que Dios la acepte. ¿Qué principio de la Reforma le muestras?",
                opciones: [
                  { texto: "Solo la Escritura: que lea la Biblia entera antes de atreverse a orar.", explica: "La Biblia es la autoridad final, pero no pide leerla entera para orar: somos justificados por la fe en Cristo." },
                  { texto: "Solo la gracia: que Dios la aceptará cuando haya hecho bastantes obras.", explica: "Eso contradice la gracia: la salvación es un regalo que no merecemos." },
                  { texto: "Solo la fe: somos justificados por la fe en Cristo, no por obras.", bien: true, explica: "Somos justificados por la fe en Cristo, no por obras: Lucía no tiene que ganarse la aceptación de Dios." },
                  { texto: "Ninguno: que primero cambie su conducta y después hablarán de eso.", explica: "La Reforma recuperó solo la fe: somos justificados por la fe en Cristo, no por obras." },
                ],
                apoyo: "Solo la fe: somos justificados por la fe en Cristo, no por obras",
                explica: "Somos justificados por la fe en Cristo, no por obras: la aceptación de Dios no depende de portarse mejor.",
              },
              {
                tipo: "situacion",
                pregunta: "Lucía piensa que necesita a alguien más santo para que Dios la escuche. ¿Qué le enseñas?",
                opciones: [
                  { texto: "Que tiene razón: sus oraciones solo llegan a Dios si un pastor las presenta.", explica: "Cristo es el único mediador entre Dios y los hombres, y todo creyente tiene acceso a Dios por él." },
                  { texto: "Que pida a un hermano mayor que ore por ella, porque Dios no oye a los nuevos.", explica: "Todo creyente tiene acceso a Dios por Cristo, también el que acaba de creer." },
                  { texto: "Que aprenda primero a orar con palabras bonitas, y así Dios sí la escuchará.", explica: "El acceso a Dios no depende de las palabras bonitas: todo creyente tiene acceso a Dios por Cristo." },
                  { texto: "Que Cristo es el único mediador, y todo creyente tiene acceso a Dios por él.", bien: true, explica: "Solo Cristo es el mediador entre Dios y los hombres, y por él todo creyente tiene acceso a Dios." },
                ],
                apoyo: "todo creyente tiene acceso a Dios por Cristo",
                explica: "Solo Cristo es el mediador entre Dios y los hombres, y por él todo creyente tiene acceso a Dios: Lucía puede orar.",
              },
              {
                tipo: "explica",
                apoyo: "Tu salvación no depende de tus obras, sino de la gracia de Dios en Cristo",
                ref: "1 Timoteo 2:5",
                clave: {
                  id: "pr-n4-historia-2-1-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Lucía para animarla a orar.",
                  ideas: [
                    { id: "acceso", peso: 50, texto: "Que Cristo es el único mediador, y que todo creyente tiene acceso a Dios por él.", formas: ["acceso a dios", "tiene acceso", "acceso directo", "unico mediador", "mediador", "por medio de cristo", "sacerdocio", "puede acercarse", "(cristo|jesus) es el unico", "(directo|directamente) a dios", "no necesita intermediari*", "no necesita a nadie"] },
                    { id: "obras", peso: 50, texto: "Que su salvación no depende de sus obras, sino de la gracia de Dios en Cristo.", formas: ["no depende de (sus|tus|nuestras|las) obras", "no (es|son) por obras", "no por obras", "por gracia", "gracia de dios", "de la gracia", "por (la|su) fe", "sin obras", "no depende de portarse", "no tiene que (portarse|ganar*)"] },
                  ],
                  modelo: "Le diría que Cristo es el único mediador y que todo creyente tiene acceso a Dios por él. Su salvación no depende de sus obras, sino de la gracia de Dios en Cristo: puede orar hoy mismo.",
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
            consigna: "Completa qué hizo Lutero después de la Dieta de Worms.",
            texto: "Escondido después en el [[castillo]] de Wartburgo, Lutero [[tradujo]] el Nuevo Testamento al [[alemán]], que se publicó en 1522.",
            distractores: ["monasterio", "quemó", "latín"],
            errores: {
              monasterio: "Lutero era monje, pero después de Worms se escondió en el castillo de Wartburgo.",
              "quemó": "Lutero tradujo el Nuevo Testamento al alemán, y se publicó en 1522.",
              "latín": "Lutero tradujo el Nuevo Testamento al alemán.",
            },
            apoyo: "Escondido después en el castillo de Wartburgo, tradujo el Nuevo Testamento al alemán, que se publicó en 1522",
            explica: "Después de Worms, Lutero se escondió en el castillo de Wartburgo y tradujo el Nuevo Testamento al alemán, que se publicó en 1522: la Biblia en la lengua del pueblo es fruto de la Reforma.",
          },
          {
            consigna: "Completa por qué valoramos la Biblia en nuestra lengua.",
            texto: "Tener la Biblia en la lengua del [[pueblo]] es un [[fruto]] de la Reforma, como el Nuevo Testamento que Lutero tradujo al [[alemán]].",
            distractores: ["clero", "error", "latín"],
            errores: {
              clero: "La Reforma valoró la Biblia en la lengua del pueblo.",
              error: "La Biblia en la lengua del pueblo es un fruto de la Reforma.",
              "latín": "Lutero tradujo el Nuevo Testamento al alemán.",
            },
            apoyo: "Valorar la Biblia en la lengua del pueblo como fruto de la Reforma",
            explica: "La Biblia en la lengua del pueblo es fruto de la Reforma: Lutero tradujo el Nuevo Testamento al alemán, y se publicó en 1522.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu célula te dice: ¿Para qué voy a leer la Biblia en mi casa, si el pastor ya nos la explica cada domingo?",
            pregunta: "¿Qué le respondes desde la historia de la Reforma?",
            opciones: [
              { texto: "Que tener la Biblia en su lengua es fruto de la Reforma, y que vale la pena leerla.", bien: true, explica: "Lutero tradujo el Nuevo Testamento al alemán, y se publicó en 1522: la Biblia en la lengua del pueblo es fruto de la Reforma." },
              { texto: "Que tiene razón: desde la Reforma, la Biblia es solo para que la lean los pastores.", explica: "Fue al revés: la Reforma valoró la Biblia en la lengua del pueblo, y todo creyente tiene acceso a Dios por Cristo." },
              { texto: "Que la lea solo si el pastor le dice qué pasaje, para que no se confunda leyendo.", explica: "Lutero llamó a la iglesia de su tiempo a volver a la Biblia, y tradujo el Nuevo Testamento al alemán." },
              { texto: "Que no hace falta: en la Reforma lo importante fue la doctrina, y no leer la Biblia.", explica: "La Reforma recuperó solo la Escritura: la Biblia es la autoridad final, por encima de las tradiciones." },
            ],
            apoyo: "Valorar la Biblia en la lengua del pueblo como fruto de la Reforma",
            explica: "La Biblia en la lengua del pueblo es fruto de la Reforma: Lutero tradujo el Nuevo Testamento al alemán, y todo creyente tiene acceso a Dios por Cristo.",
          },
          {
            caso: "Una hermana nueva te escribe: Me regalaron una Biblia en español, pero me da miedo leerla sola; ¿no es solo para los que estudian?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que tiene razón: la Biblia es para los que estudian, y que ella solo debe escuchar.", explica: "La Reforma valoró la Biblia en la lengua del pueblo, y todo creyente tiene acceso a Dios por Cristo." },
              { texto: "Que la Biblia en la lengua del pueblo es fruto de la Reforma: también es para ella.", bien: true, explica: "Lutero tradujo el Nuevo Testamento al alemán: la Biblia en la lengua del pueblo es fruto de la Reforma, y todo creyente tiene acceso a Dios por Cristo." },
              { texto: "Que la guarde hasta que termine un curso, porque antes no la va a entender bien.", explica: "Lutero llamó a la iglesia de su tiempo a volver a la Biblia, y tradujo el Nuevo Testamento al alemán." },
              { texto: "Que lea mejor libros sobre la Biblia, porque la Biblia misma es muy difícil de entender.", explica: "Solo la Escritura: la Biblia es la autoridad final, por encima de las tradiciones." },
            ],
            apoyo: "Lutero no quería fundar otra iglesia, sino llamar a la iglesia de su tiempo a volver a la Biblia",
            explica: "La Reforma llamó a volver a la Biblia y la puso en la lengua del pueblo: Lutero tradujo el Nuevo Testamento al alemán, y todo creyente tiene acceso a Dios por Cristo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El 31 de octubre de 1517, Lutero publicó sus 95 tesis contra ese abuso",
            clave: {
              id: "pr-n4-historia-2-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué eran las indulgencias y qué hizo Lutero contra ellas en 1517?",
              ideas: [
                { id: "indulgencias", peso: 50, texto: "Las indulgencias eran documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero.", formas: ["(reducian|reducia|quitaban|perdonaban|borraban) (el|los) (castigo|castigos|pecados)", "(reduc*|quit*|perdon*|borr*) castigo*", "castigo por (los|sus) pecados", "a cambio de dinero", "por dinero", "se (vendian|compraban)", "(vendian|vender|compraban|comprar) (perdon|perdones|indulgencias)", "documentos"] },
                { id: "tesis", peso: 50, texto: "El 31 de octubre de 1517, Lutero publicó sus 95 tesis contra ese abuso.", formas: ["95 tesis", "noventa y cinco tesis", "tesis"] },
              ],
              errores: [
                { id: "a-favor", texto: "Lutero publicó sus 95 tesis contra ese abuso, no a favor.", formas: ["a favor de (las|la) (indulgencias|venta)", "(apoyo|defendio|aprobo) (las|la) (indulgencias|venta)"], anula: "tesis" },
              ],
              modelo: "Las indulgencias eran documentos que, según se enseñaba, reducían el castigo por los pecados a cambio de dinero. El 31 de octubre de 1517, Lutero publicó sus 95 tesis contra ese abuso.",
            },
          },
          {
            apoyo: "En 1521, ante la Dieta de Worms, se negó a retractarse si no lo convencían con la Escritura y con razones claras",
            ref: "Romanos 1:17",
            clave: {
              id: "pr-n4-historia-2-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué descubrió Lutero al estudiar Romanos, y qué hizo en 1521 ante la Dieta de Worms?",
              ideas: [
                { id: "romanos", peso: 50, texto: "Descubrió que el justo por la fe vivirá: la justicia que Dios pide, Dios mismo la da por gracia a quien cree en Cristo.", formas: ["justo por la fe", "por la fe vivira", "justicia de dios", "da por gracia", "por gracia", "justifica* por (la|su) fe", "por fe"] },
                { id: "worms", peso: 50, texto: "En Worms se negó a retractarse si no lo convencían con la Escritura y con razones claras.", formas: ["nego retract*", "no (se|quiso) retract*", "no retract*", "sin retract*", "razones claras", "convenc* con la (escritura|biblia)", "prob* con la (escritura|biblia)", "pruebas de la (escritura|biblia)", "no quiso (cambiar|desdecirse)", "no se desdijo"] },
              ],
              errores: [
                { id: "retracto", texto: "Lutero no se retractó: se negó a hacerlo si no lo convencían con la Escritura.", formas: ["(se|lo) retracto", "acepto retract*"], anula: "worms" },
              ],
              modelo: "Al estudiar Romanos descubrió que el justo por la fe vivirá: Dios da por gracia la justicia que pide. En 1521, ante la Dieta de Worms, se negó a retractarse si no lo convencían con la Escritura y con razones claras.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 2. La Reforma se extiende
    "n4-historia-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Dónde y desde cuándo predicó Ulrico Zuinglio la Biblia libro por libro?", reverso: "En Zúrich, Suiza, desde 1519.", apoyo: "Ulrico Zuinglio comenzó en 1519 a predicar la Biblia libro por libro en Zúrich, Suiza" },
              { frente: "¿Qué obra publicó Juan Calvino en 1536?", reverso: "La Institución de la religión cristiana.", apoyo: "Juan Calvino publicó la Institución de la religión cristiana (1536)" },
              { frente: "¿A quiénes bautizaban los anabautistas?", reverso: "Solo a los creyentes que confesaban su fe.", apoyo: "bautizaron solo a los creyentes que confesaban su fe" },
              { frente: "¿Qué iglesias marcó la teología de Calvino?", reverso: "Las iglesias reformadas y presbiterianas.", apoyo: "su teología marcó a las iglesias reformadas y presbiterianas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué ciudad enseñó Juan Calvino?", reverso: "En Ginebra.", apoyo: "y enseñó en Ginebra" },
              { frente: "¿Qué pidieron los anabautistas sobre la iglesia y el Estado?", reverso: "Que la iglesia no dependiera del Estado.", apoyo: "pidieron que la iglesia no dependiera del Estado" },
              { frente: "¿Quiénes persiguieron a los anabautistas?", reverso: "Católicos y protestantes.", apoyo: "fueron perseguidos por católicos y protestantes" },
              { frente: "¿Cómo predicaba Zuinglio la Biblia en Zúrich?", reverso: "Libro por libro.", apoyo: "a predicar la Biblia libro por libro en Zúrich, Suiza" },
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
            consigna: "Une a cada reformador o grupo con lo que dice de él la lección.",
            pares: [
              ["Ulrico Zuinglio", "Desde 1519 predicó la Biblia libro por libro en Zúrich"],
              ["Juan Calvino", "Publicó la Institución de la religión cristiana (1536)"],
              ["Los anabautistas", "Bautizaron solo a los creyentes que confesaban su fe"],
              ["Los de Berea", "Escudriñaban cada día las Escrituras"],
            ],
            apoyo: "La Reforma se extendió con Zuinglio en Zúrich (1519), Calvino en Ginebra y los anabautistas (1525), que bautizaban a creyentes",
            ref: "Hechos 17:11",
            explica: "Como los de Berea, que escudriñaban cada día las Escrituras, los reformadores quisieron examinarlo todo a la luz de la Biblia: Zuinglio predicó la Biblia libro por libro en Zúrich desde 1519; Calvino publicó la Institución (1536), y los anabautistas bautizaron solo a creyentes.",
          },
          {
            consigna: "¿Qué pasó en cada lugar o fecha? Une cada uno con lo que le corresponde.",
            pares: [
              ["Zúrich, Suiza", "Zuinglio comenzó a predicar la Biblia libro por libro"],
              ["Ginebra", "La ciudad donde enseñó Juan Calvino"],
              ["Desde 1525", "Los anabautistas bautizaron solo a creyentes"],
              ["1536", "Calvino publicó la Institución de la religión cristiana"],
            ],
            apoyo: "Juan Calvino publicó la Institución de la religión cristiana (1536) y enseñó en Ginebra",
            explica: "En Zúrich, Suiza, Zuinglio predicó la Biblia libro por libro desde 1519; desde 1525 los anabautistas bautizaron solo a creyentes; en 1536 Calvino publicó la Institución, y enseñó en Ginebra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo cómo se extendió la Reforma, del primer hecho al último.",
            eventos: [
              { texto: "Zuinglio comienza a predicar la Biblia libro por libro en Zúrich", fecha: "1519" },
              { texto: "William Tyndale traduce el Nuevo Testamento al inglés", fecha: "1526" },
              { texto: "Tyndale muere ejecutado", fecha: "1536" },
              { texto: "Casiodoro de Reina publica la Biblia del Oso", fecha: "1569" },
              { texto: "Cipriano de Valera revisa la Biblia del Oso", fecha: "1602" },
            ],
            apoyo: "En España, Casiodoro de Reina publicó en 1569 la Biblia del Oso, revisada por Valera en 1602",
            ref: "Isaías 40:8",
            explica: "Zuinglio empezó a predicar en Zúrich en 1519; Tyndale tradujo el Nuevo Testamento al inglés en 1526 y murió ejecutado en 1536; Reina publicó la Biblia del Oso en 1569, y Valera la revisó en 1602.",
          },
          {
            consigna: "Ordena estos hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Los anabautistas empiezan a bautizar solo a creyentes", fecha: "Desde 1525" },
              { texto: "Sale el Nuevo Testamento en inglés de Tyndale", fecha: "1526" },
              { texto: "La Iglesia católica se reúne en el Concilio de Trento", fecha: "1545-1563" },
              { texto: "Reina publica la primera Biblia completa traducida al español de los originales", fecha: "1569" },
              { texto: "Valera revisa la traducción de Reina, de la que viene la Reina-Valera", fecha: "1602" },
            ],
            apoyo: "En Inglaterra, William Tyndale tradujo el Nuevo Testamento al inglés (1526) y murió ejecutado en 1536",
            ref: "Isaías 40:8",
            explica: "Los anabautistas bautizaban a creyentes desde 1525; el Nuevo Testamento de Tyndale salió en 1526; Trento se reunió de 1545 a 1563; Reina publicó en 1569 la primera Biblia completa traducida al español de los idiomas originales, y Valera la revisó en 1602.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo nació la Biblia en español de la que viene la Reina-Valera.",
            texto: "En España, Casiodoro de [[Reina]] publicó en 1569 la Biblia del Oso, y Cipriano de [[Valera]] la [[revisó]] en 1602.",
            distractores: ["Tyndale", "Calvino", "quemó"],
            errores: {
              Tyndale: "Tyndale tradujo el Nuevo Testamento al inglés; la Biblia del Oso la publicó Casiodoro de Reina.",
              Calvino: "Calvino enseñó en Ginebra; la Biblia del Oso la revisó Cipriano de Valera en 1602.",
              "quemó": "Valera no la quemó: la revisó en 1602, y de esa obra viene la Reina-Valera.",
            },
            apoyo: "Uno de ellos, Casiodoro de Reina, publicó en 1569 la primera Biblia completa traducida al español de los idiomas originales, la Biblia del Oso",
            ref: "Isaías 40:8",
            explica: "Casiodoro de Reina publicó en 1569 la primera Biblia completa traducida al español de los idiomas originales, la Biblia del Oso; Cipriano de Valera la revisó en 1602, y de esa obra viene la Reina-Valera.",
          },
          {
            consigna: "Completa lo que hizo William Tyndale en Inglaterra.",
            texto: "William [[Tyndale]] tradujo el Nuevo Testamento al [[inglés]] en 1526, y en 1536 murió [[ejecutado]].",
            distractores: ["Calvino", "latín", "anciano"],
            errores: {
              Calvino: "Calvino publicó la Institución y enseñó en Ginebra; el Nuevo Testamento en inglés lo tradujo Tyndale.",
              "latín": "Tyndale tradujo el Nuevo Testamento al inglés (1526).",
              anciano: "Tyndale murió ejecutado en 1536: la Biblia en nuestro idioma costó sangre.",
            },
            apoyo: "En Inglaterra, William Tyndale tradujo el Nuevo Testamento al inglés (1526) y murió ejecutado en 1536",
            explica: "En Inglaterra, William Tyndale tradujo el Nuevo Testamento al inglés en 1526 y murió ejecutado en 1536: la Biblia en nuestro idioma costó sangre.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana de tu célula te dice: Tengo tres Biblias en la casa y casi nunca abro ninguna; total, se consiguen en cualquier parte.",
            pregunta: "¿Qué le respondes desde la historia de la Reforma?",
            opciones: [
              { texto: "Que tiene razón: como hoy se consiguen en todas partes, ya no importa tanto leerlas.", explica: "Que haya tantas Biblias es un regalo que otros pagaron muy caro: vale la pena leerla con gratitud." },
              { texto: "Que regale dos de ellas, porque tener más de una Biblia en la casa es un desperdicio.", explica: "No se trata de cuántas Biblias tiene, sino de leerla: la Biblia en nuestro idioma costó sangre, y se lee con gratitud." },
              { texto: "Que la Biblia en su idioma costó sangre, como la de Tyndale: que la lea con gratitud.", bien: true, explica: "Tyndale, los anabautistas y los creyentes españoles perseguidos nos recuerdan que la Biblia en nuestro idioma costó sangre." },
              { texto: "Que la abra solo los domingos en la iglesia, porque en la casa no hace ninguna falta.", explica: "La Biblia en nuestro idioma costó sangre: leámosla con gratitud." },
            ],
            apoyo: "Tyndale, los anabautistas y los creyentes españoles perseguidos nos recuerdan que la Biblia en nuestro idioma costó sangre",
            explica: "La Biblia en nuestro idioma costó sangre: Tyndale murió ejecutado y muchos creyentes españoles fueron perseguidos. Leámosla con gratitud.",
          },
          {
            caso: "Un joven que discipulas te pregunta: La Reforma fue cosa de alemanes y suizos; ¿qué tiene que ver con nosotros, que hablamos español?",
            pregunta: "¿Qué le muestras de la lección?",
            opciones: [
              { texto: "Que en España también hubo creyentes de la Reforma, y de su Biblia viene la Reina-Valera.", bien: true, explica: "También en España hubo creyentes que abrazaron la Reforma: Casiodoro de Reina publicó la Biblia del Oso, y de esa obra viene la Reina-Valera." },
              { texto: "Que tiene razón: en aquel tiempo, la Reforma nunca llegó a ninguno de los que hablaban español.", explica: "También en España hubo creyentes que abrazaron la Reforma, y muchos fueron perseguidos por la Inquisición." },
              { texto: "Que la Biblia en español la tradujo William Tyndale, el inglés, para todos los hispanos.", explica: "Tyndale tradujo el Nuevo Testamento al inglés; la primera Biblia completa traducida al español de los idiomas originales la publicó Casiodoro de Reina." },
              { texto: "Que la Reina-Valera viene de una traducción que hizo Juan Calvino en la ciudad de Ginebra.", explica: "Calvino enseñó en Ginebra; la Reina-Valera viene de la Biblia del Oso, de Casiodoro de Reina, que Valera revisó en 1602." },
            ],
            apoyo: "También en España hubo creyentes que abrazaron la Reforma, y muchos fueron perseguidos por la Inquisición",
            explica: "La Reforma llegó también al mundo hispano: en España hubo creyentes que la abrazaron, y de la Biblia del Oso de Casiodoro de Reina viene la Reina-Valera.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el Concilio de Trento tiene un error. Tócala.",
            frases: [
              "La Iglesia católica respondió a la Reforma con el Concilio de Trento.",
              "El Concilio de Trento se reunió de 1545 a 1563.",
              "Trento corrigió algunos abusos.",
              "Trento aceptó la justificación solo por la fe.",
            ],
            malo: 3,
            correccion: "Trento rechazó la justificación solo por la fe.",
            apoyo: "La Iglesia católica respondió con el Concilio de Trento (1545-1563), que corrigió algunos abusos, pero rechazó la justificación solo por la fe",
            explica: "El Concilio de Trento (1545-1563) corrigió algunos abusos, pero rechazó la justificación solo por la fe.",
          },
          {
            consigna: "Una de estas frases sobre la respuesta católica tiene un error. Tócala.",
            frases: [
              "Trento rechazó la justificación solo por la fe.",
              "Trento declaró que la Escritura está por encima de la tradición.",
              "Desde Trento, católicos y protestantes siguieron caminos separados.",
              "Trento fue la respuesta de la Iglesia católica a la Reforma.",
            ],
            malo: 1,
            correccion: "Trento declaró que la tradición se recibe con la misma reverencia que la Escritura.",
            apoyo: "declaró que la tradición se recibe con la misma reverencia que la Escritura",
            explica: "Trento rechazó la justificación solo por la fe y declaró que la tradición se recibe con la misma reverencia que la Escritura. Desde entonces, católicos y protestantes siguieron caminos separados.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Los anabautistas, desde 1525, bautizaron solo a los creyentes que confesaban su fe y pidieron que la iglesia no dependiera del Estado",
            clave: {
              id: "pr-n4-historia-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué hicieron y qué pidieron los anabautistas desde 1525, y qué les pasó?",
              ideas: [
                { id: "bautismo", peso: 40, texto: "Bautizaron solo a los creyentes que confesaban su fe.", formas: ["solo a (los|quienes) creyentes", "creyentes que confesaban", "confesaban su fe", "confesar su fe", "bautiz* creyentes", "bautismo de creyentes"] },
                { id: "estado", peso: 30, texto: "Pidieron que la iglesia no dependiera del Estado.", formas: ["no depend* del estado", "separada del estado", "independiente del estado", "libre del estado", "aparte del estado"] },
                { id: "perseguidos", peso: 30, texto: "Fueron perseguidos por católicos y protestantes.", formas: ["persegui*", "catolicos y protestantes"] },
              ],
              errores: [
                { id: "depende", texto: "Pidieron lo contrario: que la iglesia no dependiera del Estado.", formas: ["(dependiera|dependa|depender|dependia) del estado"], anula: "estado" },
              ],
              modelo: "Desde 1525, los anabautistas bautizaron solo a los creyentes que confesaban su fe y pidieron que la iglesia no dependiera del Estado. Por eso fueron perseguidos por católicos y protestantes.",
            },
          },
          {
            apoyo: "Ulrico Zuinglio comenzó en 1519 a predicar la Biblia libro por libro en Zúrich, Suiza",
            clave: {
              id: "pr-n4-historia-2-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué hicieron Ulrico Zuinglio y Juan Calvino para extender la Reforma?",
              ideas: [
                { id: "zuinglio", peso: 50, texto: "Zuinglio comenzó en 1519 a predicar la Biblia libro por libro en Zúrich, Suiza.", formas: ["libro por libro", "zurich", "1519"] },
                { id: "calvino", peso: 50, texto: "Calvino publicó la Institución de la religión cristiana (1536) y enseñó en Ginebra; su teología marcó a las iglesias reformadas y presbiterianas.", formas: ["institucion", "ginebra", "reformadas", "presbiterian*", "1536"] },
              ],
              errores: [
                { id: "zuinglio-ginebra", texto: "Zuinglio predicó en Zúrich; en Ginebra enseñó Calvino.", formas: ["zuinglio (predico|enseno|estuvo|vivio) ginebra"], anula: "zuinglio" },
                { id: "calvino-zurich", texto: "Calvino enseñó en Ginebra; en Zúrich predicó Zuinglio.", formas: ["calvino (predico|enseno|estuvo|vivio) zurich"], anula: "calvino" },
              ],
              modelo: "Zuinglio comenzó en 1519 a predicar la Biblia libro por libro en Zúrich, Suiza. Calvino publicó la Institución de la religión cristiana en 1536 y enseñó en Ginebra; su teología marcó a las iglesias reformadas y presbiterianas.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 3. Puritanos, pietistas y el gran despertar
    "n4-historia-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué buscaron los puritanos en Inglaterra?", reverso: "Purificar la iglesia y vivir toda la vida bajo la Palabra.", apoyo: "buscaron purificar la iglesia y vivir toda la vida bajo la Palabra" },
              { frente: "¿Quiénes guiaron el pietismo alemán?", reverso: "Felipe Jacobo Spener y Augusto Francke.", apoyo: "El pietismo alemán, con Felipe Jacobo Spener y Augusto Francke" },
              { frente: "¿Qué comenzaron los moravos en Herrnhut en 1727?", reverso: "Una cadena de oración que duró unos cien años.", apoyo: "Los moravos, en Herrnhut, comenzaron en 1727 una cadena de oración que duró unos cien años" },
              { frente: "¿Qué oró Habacuc, según la lección?", reverso: "«Oh Jehová, aviva tu obra en medio de los tiempos».", apoyo: "Habacuc oró: «Oh Jehová, aviva tu obra en medio de los tiempos»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Dónde vivieron los puritanos, y adónde emigraron muchos de ellos?", reverso: "En Inglaterra; muchos emigraron a América.", apoyo: "Los puritanos, en Inglaterra, buscaron purificar la iglesia" },
              { frente: "¿A qué llamó el pietismo alemán?", reverso: "A la piedad personal, al estudio de la Biblia en grupos y a las obras de misericordia.", apoyo: "llamó a la piedad personal, al estudio de la Biblia en grupos y a las obras de misericordia" },
              { frente: "¿Qué hicieron los moravos, además de orar sin parar?", reverso: "Enviaron misioneros a muchos lugares del mundo.", apoyo: "y enviaron misioneros a muchos lugares del mundo" },
              { frente: "¿Qué tenían muchas iglesias después de la Reforma, según la lección?", reverso: "La doctrina correcta, pero poca vida.", apoyo: "muchas iglesias tenían la doctrina correcta, pero poca vida" },
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
            consigna: "¿De quiénes se dice: de los puritanos, de los pietistas o de los moravos? Lleva cada frase a su grupo.",
            grupos: ["Los puritanos", "Los pietistas", "Los moravos"],
            frases: [
              { texto: "Buscaron purificar la iglesia en Inglaterra", grupo: 0 },
              { texto: "Quisieron vivir toda la vida bajo la Palabra", grupo: 0 },
              { texto: "Muchos de ellos emigraron a América", grupo: 0 },
              { texto: "Felipe Jacobo Spener y Augusto Francke los guiaron", grupo: 1 },
              { texto: "Llamaron al estudio de la Biblia en grupos", grupo: 1 },
              { texto: "Llamaron a la piedad personal y a las obras de misericordia", grupo: 1 },
              { texto: "Desde 1727 oraron en cadena unos cien años, en Herrnhut", grupo: 2 },
              { texto: "Enviaron misioneros a muchos lugares del mundo", grupo: 2 },
            ],
            apoyo: "A lo largo de los siglos XVII y XVIII, Dios respondió oraciones así con movimientos de renovación",
            ref: "Habacuc 3:2",
            explica: "Los puritanos buscaron purificar la iglesia y vivir bajo la Palabra; los pietistas, con Spener y Francke, llamaron a la piedad, al estudio de la Biblia en grupos y a la misericordia; los moravos oraron unos cien años y enviaron misioneros.",
          },
          {
            consigna: "¿Fue el aporte de los pietistas o el de los moravos? Lleva cada frase a su grupo.",
            grupos: ["Los pietistas", "Los moravos"],
            frases: [
              { texto: "La piedad personal", grupo: 0 },
              { texto: "El estudio de la Biblia en grupos", grupo: 0 },
              { texto: "Las obras de misericordia", grupo: 0 },
              { texto: "Una cadena de oración desde 1727", grupo: 1 },
              { texto: "Misioneros a muchos lugares del mundo", grupo: 1 },
              { texto: "Herrnhut, donde oraron unos cien años", grupo: 1 },
            ],
            apoyo: "El pietismo alemán, con Felipe Jacobo Spener y Augusto Francke, llamó a la piedad personal, al estudio de la Biblia en grupos y a las obras de misericordia",
            ref: "Habacuc 3:2",
            explica: "El pietismo alemán llamó a la piedad personal, al estudio de la Biblia en grupos y a las obras de misericordia; los moravos, en Herrnhut, oraron unos cien años desde 1727 y enviaron misioneros a muchos lugares del mundo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo estos hechos del siglo XVIII, del primero al último.",
            eventos: [
              { texto: "Nace Juan Wesley, que sería ministro anglicano", fecha: "1703" },
              { texto: "Los moravos comienzan en Herrnhut una cadena de oración", fecha: "1727" },
              { texto: "Empieza un gran despertar en las colonias inglesas de América", fecha: "Desde la década de 1730" },
              { texto: "Wesley recibe en la calle Aldersgate la seguridad de su salvación", fecha: "24 de mayo de 1738" },
              { texto: "Muere Juan Wesley, después de predicar por décadas", fecha: "1791" },
            ],
            apoyo: "Juan Wesley recibió en 1738 la seguridad de su salvación y predicó por décadas",
            ref: "Romanos 8:16",
            explica: "Wesley vivió de 1703 a 1791. Los moravos empezaron a orar en 1727; el gran despertar comenzó desde la década de 1730, y el 24 de mayo de 1738 Wesley recibió la seguridad de su salvación.",
          },
          {
            consigna: "Ordena la historia de Juan Wesley y de su tiempo, del primer hecho al último.",
            eventos: [
              { texto: "Nace Juan Wesley, que serviría con disciplina, pero sin paz", fecha: "1703" },
              { texto: "Comienza la cadena de oración de los moravos, que duraría unos cien años", fecha: "1727" },
              { texto: "En las colonias inglesas de América comienza un gran despertar", fecha: "Desde la década de 1730" },
              { texto: "En Londres, Wesley siente que su corazón arde de una manera extraña", fecha: "24 de mayo de 1738" },
              { texto: "Muere Wesley, que predicó al aire libre durante décadas", fecha: "1791" },
            ],
            apoyo: "El 24 de mayo de 1738, en una reunión en la calle Aldersgate de Londres",
            ref: "Romanos 8:16",
            explica: "Wesley nació en 1703; los moravos comenzaron a orar en 1727; el gran despertar empezó desde la década de 1730; el 24 de mayo de 1738 Wesley recibió en Londres la seguridad de su salvación, y murió en 1791.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Juan Wesley (1703-1791), ministro anglicano, había servido con disciplina, pero sin paz",
            ref: "Romanos 8:16",
            situacion: "Eres pastor asistente. Mario sirve en la iglesia desde hace años: llega temprano, ayuda en todo y nunca falta. Un día te confiesa que no tiene paz.",
            escenas: [
              {
                id: "e1",
                narra: "Mario te dice: Sirvo con disciplina, pero no sé si Dios me ha perdonado; siento que nunca hago lo suficiente.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Le cuentas que Wesley sirvió así, sin paz, hasta que oyó leer el prefacio de Lutero a Romanos.", valor: 2, explica: "Wesley había servido con disciplina, pero sin paz, y recibió la seguridad mientras se leía el prefacio de Lutero a la carta a los Romanos.", siguiente: "e2" },
                  { texto: "Le pides que siga sirviendo con fidelidad y que ore, mientras buscan un momento para hablar con calma.", valor: 1, explica: "Servir y orar es bueno, pero Mario necesita más: Wesley recibió la paz cuando se leía el prefacio de Lutero a Romanos, no por servir más." },
                  { texto: "Le aconsejas que sirva todavía más, para que Dios vea su esfuerzo y le dé por fin la paz.", valor: 0, explica: "Wesley había servido con disciplina, pero sin paz: la seguridad no vino de servir más, sino de saber que Cristo había quitado sus pecados.", siguiente: "fin" },
                ],
              },
              {
                id: "e1b",
                narra: "Semanas después, Mario sigue sirviendo mucho y sin paz. Te dice que ya no sabe qué más hacer.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Lees con él la carta a los Romanos y oran juntos para que reciba esa seguridad.", valor: 2, explica: "En Aldersgate, mientras se leía el prefacio de Lutero a Romanos, Wesley recibió la seguridad de que Cristo había quitado sus pecados." },
                  { texto: "Le dices que la paz no es para todos, y que siga sirviendo aunque nunca la tenga.", valor: 0, explica: "Wesley recibió la seguridad de que Cristo había quitado sus pecados: «El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios».", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "Mario recibe con gozo la seguridad de que Cristo quitó sus pecados, y quiere contarlo a sus vecinos.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que no diga nada todavía, porque esas cosas se guardan para uno mismo.", valor: 0, explica: "Wesley no se lo guardó: predicó al aire libre durante décadas." },
                  { texto: "Que lo cuente, como Wesley, que después predicó al aire libre por décadas.", valor: 2, explica: "Wesley predicó al aire libre durante décadas, y los grupos metodistas cuidaron a miles de nuevos creyentes." },
                  { texto: "Que primero invite a sus vecinos al culto, y que allí escuchen el mensaje del pastor.", valor: 1, explica: "Invitar al culto es bueno, pero él también puede contar lo que Dios hizo, como Wesley, que predicó al aire libre durante décadas." },
                ],
              },
              {
                id: "e3",
                narra: "Varios vecinos de Mario se entregan a Cristo y empiezan a llegar a la iglesia.",
                pregunta: "¿Cómo los cuidan?",
                opciones: [
                  { texto: "Los invitas a todos los cultos y esperas que con eso crezcan solos en la fe.", valor: 1, explica: "Los cultos ayudan, pero los nuevos necesitan un cuidado cercano, como el de los grupos metodistas." },
                  { texto: "Los dejas tranquilos, porque ya se convirtieron y lo demás vendrá solo.", valor: 0, explica: "Wesley no los dejó solos: los grupos metodistas cuidaron a miles de nuevos creyentes." },
                  { texto: "Formas grupos que los cuiden, como los grupos metodistas con los nuevos.", valor: 2, explica: "Así lo hizo el avivamiento metodista: los grupos metodistas cuidaron a miles de nuevos creyentes." },
                ],
              },
            ],
          },
          {
            apoyo: "Predicó al aire libre durante décadas, y los grupos metodistas cuidaron a miles de nuevos creyentes",
            ref: "Romanos 8:16",
            situacion: "Eres pastor asistente. Tu iglesia predicó al aire libre en el parque del barrio, y muchas personas se entregaron a Cristo.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano de la iglesia se queja: Predicar en un parque no es serio; el evangelio se predica dentro del templo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que tiene razón, y que desde ahora solo predicarán dentro del templo, como se debe.", valor: 0, explica: "Wesley predicó al aire libre durante décadas: el evangelio también se lleva fuera del templo.", siguiente: "fin" },
                  { texto: "Que Wesley predicó al aire libre durante décadas, y Dios lo usó para alcanzar a miles.", valor: 2, explica: "Wesley predicó al aire libre durante décadas, y los grupos metodistas cuidaron a miles de nuevos creyentes." },
                  { texto: "Que tiene derecho a pensar así, y que la próxima vez lo hablarán con el pastor principal.", valor: 1, explica: "Escucharlo está bien, pero la historia ya responde: Wesley predicó al aire libre durante décadas." },
                ],
              },
              {
                id: "e2",
                narra: "Una joven que se entregó a Cristo en el parque te dice: Creo en Jesús, pero no estoy segura de ser hija de Dios.",
                pregunta: "¿Qué le muestras?",
                opciones: [
                  { texto: "Que nadie puede estar seguro de eso, y que lo sabrá solo al final de su vida.", valor: 0, explica: "Wesley recibió la seguridad de que Cristo había quitado sus pecados: «El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios»." },
                  { texto: "Que no se preocupe por eso ahora, y que siga viniendo a la iglesia cada domingo.", valor: 1, explica: "Seguir viniendo es bueno, pero puedes mostrarle lo que vivió Wesley: «El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios»." },
                  { texto: "Que el Espíritu da testimonio de que somos hijos de Dios, como lo vivió Wesley.", valor: 2, explica: "En Aldersgate, Wesley recibió la seguridad de que Cristo había quitado sus pecados, como dice Romanos 8:16." },
                ],
              },
              {
                id: "e3",
                narra: "Son más de treinta nuevos creyentes, y el pastor te pide un plan para cuidarlos.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Grupos pequeños que los cuiden, como cuidaban los grupos metodistas a los nuevos.", valor: 2, explica: "Los grupos metodistas cuidaron a miles de nuevos creyentes: el avivamiento metodista no los dejó solos." },
                  { texto: "Que todos vengan al culto del domingo, y que allí cada uno aprenda lo que necesita.", valor: 1, explica: "El culto ayuda, pero los grupos metodistas cuidaron de cerca a miles de nuevos creyentes." },
                  { texto: "Que cada uno se cuide solo, porque lo importante ya pasó: se convirtieron.", valor: 0, explica: "Wesley no los dejó solos: los grupos metodistas cuidaron a miles de nuevos creyentes." },
                ],
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
            consigna: "Completa qué pasó en el Gran Despertar.",
            texto: "Desde la década de 1730 hubo un gran [[despertar]] espiritual en las colonias [[inglesas]] de América, donde Jonathan [[Edwards]] predicaba con profundidad.",
            distractores: ["silencio", "españolas", "Wesley"],
            errores: {
              silencio: "Desde la década de 1730 hubo un gran despertar espiritual en las colonias inglesas de América.",
              "españolas": "El Gran Despertar fue en las colonias inglesas de América.",
              Wesley: "Wesley fue ministro anglicano en Inglaterra; en Massachusetts predicaba con profundidad Jonathan Edwards.",
            },
            apoyo: "En las colonias inglesas de América, desde la década de 1730, hubo un gran despertar espiritual",
            ref: "Habacuc 3:2",
            explica: "Desde la década de 1730 hubo un gran despertar espiritual en las colonias inglesas de América: Jonathan Edwards predicaba con profundidad en Massachusetts.",
          },
          {
            consigna: "Completa cómo predicó George Whitefield.",
            texto: "En el Gran Despertar, George Whitefield, [[amigo]] de Wesley, predicó al aire libre a multitudes a los dos lados del [[Atlántico]].",
            distractores: ["rival", "Pacífico"],
            errores: {
              rival: "George Whitefield era amigo de Wesley.",
              "Pacífico": "Whitefield predicó a multitudes a los dos lados del Atlántico.",
            },
            apoyo: "George Whitefield, amigo de Wesley, predicó al aire libre a multitudes a los dos lados del Atlántico",
            explica: "En el Gran Despertar, Jonathan Edwards predicaba con profundidad en Massachusetts, y George Whitefield, amigo de Wesley, predicó al aire libre a multitudes a los dos lados del Atlántico.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "y en el Gran Despertar predicaron Jonathan Edwards y George Whitefield",
            clave: {
              id: "pr-n4-historia-2-3-a6-1",
              tipo: "corta",
              pregunta: "¿Qué fue el Gran Despertar, dónde y desde cuándo lo hubo, y quiénes predicaron en él?",
              ideas: [
                { id: "donde", peso: 50, texto: "Fue un gran despertar espiritual en las colonias inglesas de América, desde la década de 1730.", formas: ["colonias inglesas", "colonias", "america", "1730"] },
                { id: "quienes", peso: 50, texto: "En él predicaron Jonathan Edwards y George Whitefield.", formas: ["edwards", "whitefield"] },
              ],
              modelo: "Fue un gran despertar espiritual que hubo desde la década de 1730 en las colonias inglesas de América. En él predicaron Jonathan Edwards, en Massachusetts, y George Whitefield, amigo de Wesley.",
            },
          },
          {
            apoyo: "Jonathan Edwards predicaba con profundidad en Massachusetts",
            clave: {
              id: "pr-n4-historia-2-3-a6-2",
              tipo: "corta",
              pregunta: "¿Cómo y dónde predicaban Jonathan Edwards y George Whitefield en el Gran Despertar?",
              ideas: [
                { id: "edwards", peso: 50, texto: "Jonathan Edwards predicaba con profundidad en Massachusetts.", formas: ["profund*", "massachusetts"] },
                { id: "whitefield", peso: 50, texto: "George Whitefield predicó al aire libre a multitudes a los dos lados del Atlántico.", formas: ["aire libre", "multitudes", "atlantico", "dos lados"] },
              ],
              errores: [
                { id: "whitefield-profundo", texto: "El que predicaba con profundidad en Massachusetts era Jonathan Edwards.", formas: ["whitefield profund*", "whitefield massachusetts"], anula: "edwards" },
                { id: "edwards-aire", texto: "El que predicó al aire libre a multitudes a los dos lados del Atlántico fue George Whitefield.", formas: ["edwards aire libre", "edwards multitudes", "edwards atlantico"], anula: "whitefield" },
              ],
              modelo: "Jonathan Edwards predicaba con profundidad en Massachusetts. George Whitefield, amigo de Wesley, predicó al aire libre a multitudes a los dos lados del Atlántico.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 4. Las misiones modernas y los avivamientos del siglo XIX
    "n4-historia-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A qué se dedicaba William Carey?", reverso: "Era zapatero y pastor bautista.", apoyo: "William Carey (1761-1834), zapatero y pastor bautista" },
              { frente: "¿Sobre qué pasaje predicó Carey en 1792?", reverso: "Sobre Isaías 54: «Ensancha el sitio de tu tienda».", apoyo: "En 1792 predicó sobre Isaías 54, «Ensancha el sitio de tu tienda»" },
              { frente: "¿Cuál fue el lema que hizo famoso William Carey?", reverso: "Esperar grandes cosas de Dios e intentar grandes cosas para Dios.", apoyo: "esperar grandes cosas de Dios e intentar grandes cosas para Dios" },
              { frente: "¿Adónde partió Carey, y en qué trabajó allí?", reverso: "A la India, donde trabajó en traducir la Biblia a varias lenguas.", apoyo: "Al año siguiente partió a la India, donde trabajó en traducir la Biblia a varias lenguas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué tenía el zapatero Carey junto a su banco de trabajo?", reverso: "Un mapa del mundo, para orar por las naciones que no conocían a Cristo.", apoyo: "tenía un mapa del mundo junto a su banco de trabajo y oraba por las naciones que no conocían a Cristo" },
              { frente: "¿Qué misión fundó Hudson Taylor en 1865?", reverso: "La Misión al Interior de China.", apoyo: "Hudson Taylor (1832-1905) fundó en 1865 la Misión al Interior de China" },
              { frente: "¿Qué hizo Hudson Taylor para acercarse a la gente de China?", reverso: "Se vistió como los chinos.", apoyo: "se vistió como los chinos para acercarse a ellos" },
              { frente: "¿En qué insistió Carey sobre la gran comisión?", reverso: "En que seguía vigente.", apoyo: "insistió en que la gran comisión seguía vigente" },
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
            consigna: "Ordena en el tiempo el comienzo de las misiones modernas, del primer hecho al último.",
            eventos: [
              { texto: "Nace William Carey, el zapatero que oraba por las naciones", fecha: "1761" },
              { texto: "Carey predica sobre Isaías 54: «Ensancha el sitio de tu tienda»", fecha: "1792" },
              { texto: "Carey parte a la India", fecha: "Al año siguiente" },
              { texto: "Nace Hudson Taylor", fecha: "1832" },
              { texto: "Taylor funda la Misión al Interior de China", fecha: "1865" },
            ],
            apoyo: "Las misiones modernas empezaron con William Carey, que en 1792 llamó a esperar grandes cosas de Dios e intentar grandes cosas para Dios y partió a la India, y siguieron con Hudson Taylor en China (1865)",
            ref: "Isaías 54:2-3",
            explica: "Carey nació en 1761; en 1792 predicó sobre Isaías 54 y al año siguiente partió a la India. Hudson Taylor nació en 1832 y fundó en 1865 la Misión al Interior de China.",
          },
          {
            consigna: "Ordena estos hechos de las misiones modernas en el tiempo, del primero al último.",
            eventos: [
              { texto: "Carey llama a esperar grandes cosas de Dios e intentar grandes cosas para Dios", fecha: "1792" },
              { texto: "Carey parte a la India, donde traducirá la Biblia a varias lenguas", fecha: "Al año siguiente" },
              { texto: "Muere William Carey", fecha: "1834" },
              { texto: "Hudson Taylor funda una misión para el interior de China", fecha: "1865" },
              { texto: "Muere Hudson Taylor", fecha: "1905" },
            ],
            apoyo: "Hudson Taylor (1832-1905) fundó en 1865 la Misión al Interior de China",
            ref: "Mateo 28:19-20",
            explica: "En 1792 Carey lanzó su lema y al año siguiente partió a la India; murió en 1834. Hudson Taylor fundó en 1865 la Misión al Interior de China y murió en 1905.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu grupo te dice: Yo solo soy mecánico y no estudié mucho; Dios no va a usar a alguien como yo en las misiones.",
            pregunta: "¿Qué le respondes desde la historia de las misiones?",
            opciones: [
              { texto: "Que tiene razón: las misiones son solo para quienes estudiaron muchos años.", explica: "William Carey era zapatero y pastor bautista: Dios usa a personas sencillas." },
              { texto: "Que William Carey era zapatero, y que Dios usa a personas sencillas que le creen.", bien: true, explica: "La historia de las misiones muestra que Dios usa a personas sencillas que creen sus promesas y obedecen la gran comisión." },
              { texto: "Que primero junte mucho dinero, porque sin riquezas Dios no usa a nadie en las misiones.", explica: "Carey era un zapatero: Dios usa a personas sencillas que creen sus promesas y obedecen la gran comisión." },
              { texto: "Que las misiones terminaron con los apóstoles, y que no se preocupe por eso.", explica: "Carey insistió en que la gran comisión seguía vigente, y miles de misioneros llevaron el evangelio a las naciones." },
            ],
            apoyo: "La historia de las misiones muestra que Dios usa a personas sencillas que creen sus promesas y obedecen la gran comisión",
            ref: "Mateo 28:19-20",
            explica: "Dios usa a personas sencillas que creen sus promesas y obedecen la gran comisión, como William Carey, zapatero y pastor bautista.",
          },
          {
            caso: "Una hermana de tu célula te dice: La gran comisión era para los apóstoles; hoy nosotros ya no tenemos que llevar el evangelio a las naciones.",
            pregunta: "¿Qué le muestras de la historia de las misiones?",
            opciones: [
              { texto: "Que tiene razón: desde los apóstoles nadie volvió a llevar el evangelio a otras naciones.", explica: "A lo largo del siglo XIX, miles de misioneros llevaron el evangelio a África, Asia y América Latina." },
              { texto: "Que la gran comisión sigue, pero solo para los pastores que tienen una iglesia grande.", explica: "Dios sigue usando a personas sencillas, como Carey, que era zapatero." },
              { texto: "Que basta con orar por las naciones: ir a ellas fue cosa de los misioneros de antes.", explica: "La gran comisión sigue vigente: Carey oraba por las naciones con su mapa, y también partió a la India." },
              { texto: "Que Carey insistió en que la gran comisión seguía vigente, y partió a la India.", bien: true, explica: "William Carey insistió en que la gran comisión seguía vigente, y al año siguiente de su sermón partió a la India." },
            ],
            apoyo: "La gran comisión sigue vigente, y Dios sigue usando a personas sencillas",
            ref: "Mateo 28:19-20",
            explica: "Carey insistió en que la gran comisión seguía vigente, y miles de misioneros llevaron el evangelio a muchas naciones: la gran comisión sigue vigente.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Fue del segundo gran despertar o del movimiento de santidad? Lleva cada frase a su grupo.",
            grupos: ["El segundo gran despertar", "El movimiento de santidad"],
            frases: [
              { texto: "Hubo grandes campamentos de oración y predicación", grupo: 0 },
              { texto: "Charles Finney y D. L. Moody llamaron a multitudes a la conversión", grupo: 0 },
              { texto: "Fue en los Estados Unidos, a comienzos del siglo XIX", grupo: 0 },
              { texto: "Nació del metodismo", grupo: 1 },
              { texto: "Buscaba una experiencia de consagración y de poder después de la conversión", grupo: 1 },
              { texto: "Tenía grupos que oraban por un nuevo derramamiento del Espíritu", grupo: 1 },
            ],
            apoyo: "En los Estados Unidos hubo un segundo gran despertar a comienzos del siglo XIX, con grandes campamentos de oración y predicación",
            explica: "El segundo gran despertar fue en los Estados Unidos a comienzos del siglo XIX, con campamentos de oración y predicación y evangelistas como Finney y Moody. El movimiento de santidad nació del metodismo, buscaba consagración y poder, y oraba por un nuevo derramamiento del Espíritu.",
          },
          {
            consigna: "¿Es del segundo gran despertar o del movimiento de santidad? Lleva cada frase a su grupo.",
            grupos: ["Segundo gran despertar", "Movimiento de santidad"],
            frases: [
              { texto: "Evangelistas como Finney y Moody", grupo: 0 },
              { texto: "Campamentos de oración y predicación", grupo: 0 },
              { texto: "Multitudes llamadas a la conversión", grupo: 0 },
              { texto: "Un movimiento nacido del metodismo", grupo: 1 },
              { texto: "Consagración y poder después de la conversión", grupo: 1 },
              { texto: "Oración por un nuevo derramamiento del Espíritu", grupo: 1 },
            ],
            apoyo: "El movimiento de santidad, nacido del metodismo, buscaba una experiencia de consagración y de poder después de la conversión",
            explica: "En el segundo gran despertar hubo campamentos de oración y predicación, y Finney y Moody llamaron a multitudes a la conversión. El movimiento de santidad nació del metodismo, buscaba consagración y poder después de la conversión, y muchos de sus grupos oraban por un nuevo derramamiento del Espíritu.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se preparó el camino del pentecostalismo? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pente", texto: "El pentecostalismo", x: 50, y: 10 },
              { id: "despertar", texto: "El segundo gran despertar", x: 20, y: 50 },
              { id: "santidad", texto: "El movimiento de santidad", x: 80, y: 50 },
              { id: "derrama", texto: "Un nuevo derramamiento del Espíritu", x: 40, y: 90 },
              { id: "metodismo", texto: "El metodismo", x: 85, y: 90 },
            ],
            enlaces: [
              { de: "despertar", a: "pente", relacion: "preparó el camino de" },
              { de: "santidad", a: "pente", relacion: "preparó el camino de" },
              { de: "santidad", a: "metodismo", relacion: "nació de" },
              { de: "santidad", a: "derrama", relacion: "oraba por" },
            ],
            distractores: ["se opuso a", "olvidó"],
            apoyo: "El segundo gran despertar, con Finney y Moody, y el movimiento de santidad, que oraba por un nuevo derramamiento del Espíritu, prepararon el pentecostalismo",
            explica: "El movimiento de santidad nació del metodismo y oraba por un nuevo derramamiento del Espíritu. Con el segundo gran despertar, preparó el camino del pentecostalismo.",
          },
          {
            consigna: "¿Qué hicieron estos movimientos? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pente", texto: "El pentecostalismo", x: 50, y: 50 },
              { id: "despertar", texto: "El segundo gran despertar", x: 20, y: 12 },
              { id: "campamentos", texto: "Campamentos de oración y predicación", x: 20, y: 88 },
              { id: "santidad", texto: "El movimiento de santidad", x: 80, y: 12 },
              { id: "consagracion", texto: "Consagración y poder", x: 80, y: 88 },
            ],
            enlaces: [
              { de: "despertar", a: "campamentos", relacion: "tuvo grandes" },
              { de: "santidad", a: "consagracion", relacion: "buscaba una experiencia de" },
              { de: "despertar", a: "pente", relacion: "preparó el camino de" },
              { de: "santidad", a: "pente", relacion: "preparó el camino de" },
            ],
            distractores: ["impidió", "rechazó"],
            apoyo: "muchos de sus grupos oraban por un nuevo derramamiento del Espíritu",
            explica: "El segundo gran despertar tuvo grandes campamentos de oración y predicación; el movimiento de santidad buscaba una experiencia de consagración y de poder, y muchos de sus grupos oraban por un nuevo derramamiento del Espíritu. Los dos prepararon el pentecostalismo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En los Estados Unidos hubo un segundo gran despertar a comienzos del siglo XIX",
            clave: {
              id: "pr-n4-historia-2-4-a6-1",
              tipo: "corta",
              pregunta: "¿Qué fue el segundo gran despertar y quiénes llamaron en él a la conversión?",
              ideas: [
                { id: "cuando", peso: 50, texto: "Fue un avivamiento en los Estados Unidos a comienzos del siglo XIX, con grandes campamentos de oración y predicación.", formas: ["estados unidos", "siglo xix", "siglo 19", "comienzos del siglo", "campament*"] },
                { id: "quienes", peso: 50, texto: "Evangelistas como Charles Finney y D. L. Moody llamaron a multitudes a la conversión.", formas: ["finney", "moody"] },
              ],
              modelo: "Fue un avivamiento en los Estados Unidos a comienzos del siglo XIX, con grandes campamentos de oración y predicación. Evangelistas como Charles Finney y D. L. Moody llamaron a multitudes a la conversión.",
            },
          },
          {
            apoyo: "El movimiento de santidad, nacido del metodismo, buscaba una experiencia de consagración y de poder después de la conversión",
            clave: {
              id: "pr-n4-historia-2-4-a6-2",
              tipo: "corta",
              pregunta: "¿De dónde nació el movimiento de santidad, qué buscaba y por qué oraban muchos de sus grupos?",
              ideas: [
                { id: "metodismo", peso: 30, texto: "Nació del metodismo.", formas: ["metodismo", "metodista", "metodistas"] },
                { id: "consagracion", peso: 35, texto: "Buscaba una experiencia de consagración y de poder después de la conversión.", formas: ["consagra*", "experiencia de poder", "poder despues", "despues de la conversion"] },
                { id: "derramamiento", peso: 35, texto: "Muchos de sus grupos oraban por un nuevo derramamiento del Espíritu.", formas: ["derram*", "nuevo pentecostes"] },
              ],
              modelo: "El movimiento de santidad nació del metodismo y buscaba una experiencia de consagración y de poder después de la conversión. Muchos de sus grupos oraban por un nuevo derramamiento del Espíritu.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 5. El movimiento pentecostal
    "n4-historia-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué oraban muchos creyentes del movimiento de santidad?", reverso: "Por un nuevo Pentecostés.", apoyo: "Muchos creyentes del movimiento de santidad oraban por un nuevo Pentecostés" },
              { frente: "¿Quién dirigía la escuela bíblica de Topeka, Kansas?", reverso: "Charles Parham.", apoyo: "en una escuela bíblica de Topeka, Kansas, dirigida por Charles Parham" },
              { frente: "¿Qué pasó el 1 de enero de 1901 en Topeka?", reverso: "Una estudiante, Agnes Ozman, habló en lenguas mientras oraban por ella.", apoyo: "una estudiante, Agnes Ozman, habló en lenguas mientras oraban por ella" },
              { frente: "¿Quién dirigió el avivamiento de la calle Azusa en 1906?", reverso: "William J. Seymour, un predicador afroamericano, hijo de antiguos esclavos.", apoyo: "William J. Seymour, un predicador afroamericano, hijo de antiguos esclavos" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué promesa recordaban los que oraban por un nuevo Pentecostés?", reverso: "«derramaré mi Espíritu sobre toda carne».", apoyo: "recordando la promesa: «derramaré mi Espíritu sobre toda carne»" },
              { frente: "¿Cuánto duró el avivamiento de la calle Azusa?", reverso: "Unos tres años.", apoyo: "dirigió en la calle Azusa de Los Ángeles un avivamiento que duró unos tres años" },
              { frente: "¿Quiénes oraban juntos en la calle Azusa?", reverso: "Negros, blancos, hispanos y personas de muchas naciones.", apoyo: "Negros, blancos, hispanos y personas de muchas naciones oraban juntos" },
              { frente: "¿Qué hicieron los misioneros que salieron de la calle Azusa?", reverso: "Llevaron el mensaje pentecostal a todo el mundo.", apoyo: "Desde allí, misioneros llevaron el mensaje pentecostal a todo el mundo" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo comenzó el avivamiento de la calle Azusa.",
            texto: "En 1906, William J. [[Seymour]], un predicador afroamericano, hijo de antiguos [[esclavos]], dirigió en la calle [[Azusa]] de Los Ángeles un avivamiento que duró unos tres años.",
            distractores: ["Parham", "reyes", "Topeka"],
            errores: {
              Parham: "Charles Parham dirigía la escuela bíblica de Topeka; el avivamiento de la calle Azusa lo dirigió William J. Seymour.",
              reyes: "Seymour era hijo de antiguos esclavos.",
              Topeka: "Topeka está en Kansas; el avivamiento de 1906 fue en la calle Azusa de Los Ángeles.",
            },
            apoyo: "En 1906, William J. Seymour, un predicador afroamericano, hijo de antiguos esclavos, dirigió en la calle Azusa de Los Ángeles un avivamiento que duró unos tres años",
            ref: "Hechos 2:1-4",
            explica: "En 1906, William J. Seymour, un predicador afroamericano, hijo de antiguos esclavos, dirigió en la calle Azusa de Los Ángeles un avivamiento que duró unos tres años.",
          },
          {
            consigna: "Completa cómo comenzó el movimiento pentecostal en Topeka.",
            texto: "El 1 de enero de 1901, en una escuela bíblica de [[Topeka]], Kansas, dirigida por Charles [[Parham]], una estudiante, Agnes [[Ozman]], habló en lenguas mientras oraban por ella.",
            distractores: ["Azusa", "Seymour", "Semple"],
            errores: {
              Azusa: "La calle Azusa estaba en Los Ángeles; la escuela bíblica estaba en Topeka, Kansas.",
              Seymour: "Seymour dirigió en 1906 el avivamiento de la calle Azusa; la escuela de Topeka la dirigía Charles Parham.",
              Semple: "Aimee Semple McPherson hizo su obra en Los Ángeles en la década de 1920; en Topeka, la estudiante era Agnes Ozman.",
            },
            apoyo: "El 1 de enero de 1901, en una escuela bíblica de Topeka, Kansas, dirigida por Charles Parham",
            ref: "Joel 2:28-29",
            explica: "El 1 de enero de 1901, en una escuela bíblica de Topeka, Kansas, dirigida por Charles Parham, una estudiante, Agnes Ozman, habló en lenguas mientras oraban por ella.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo cómo nació y se extendió el movimiento pentecostal.",
            eventos: [
              { texto: "En Topeka, Agnes Ozman habla en lenguas mientras oran por ella", fecha: "1 de enero de 1901" },
              { texto: "William J. Seymour dirige el avivamiento de la calle Azusa", fecha: "1906" },
              { texto: "Iglesias que ya existían se hacen pentecostales", fecha: "Entre 1907 y 1908" },
              { texto: "Se organizan las Asambleas de Dios en Hot Springs, Arkansas", fecha: "1914" },
              { texto: "Nace la Iglesia Internacional del Evangelio Cuadrangular", fecha: "Década de 1920" },
            ],
            apoyo: "Nacieron denominaciones como las Asambleas de Dios (1914), y desde 1960 la renovación carismática llegó a otras iglesias",
            ref: "Hechos 2:1-4",
            explica: "En Topeka, Agnes Ozman habló en lenguas el 1 de enero de 1901, y el avivamiento de la calle Azusa comenzó en 1906. Entre 1907 y 1908 se hicieron pentecostales iglesias que ya existían; las Asambleas de Dios se organizaron en 1914, y la Cuadrangular nació en la década de 1920.",
          },
          {
            consigna: "Ordena estos hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Comienza en Los Ángeles un avivamiento de todas las razas", fecha: "1906" },
              { texto: "La Iglesia de Dios de Cleveland, Tennessee, se hace pentecostal", fecha: "Entre 1907 y 1908" },
              { texto: "Las Asambleas de Dios se organizan", fecha: "1914" },
              { texto: "De la obra de Aimee Semple McPherson nace la Iglesia Cuadrangular", fecha: "Década de 1920" },
              { texto: "La experiencia pentecostal llega a iglesias históricas", fecha: "Desde 1960" },
            ],
            apoyo: "Desde 1960, la experiencia pentecostal llegó también a iglesias históricas, como la episcopal, la luterana y la católica",
            ref: "Joel 2:28-29",
            explica: "El avivamiento de la calle Azusa comenzó en 1906; iglesias como la de Cleveland se hicieron pentecostales entre 1907 y 1908; las Asambleas de Dios se organizaron en 1914; la Cuadrangular nació en la década de 1920, y la renovación carismática llegó desde 1960.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada iglesia o lugar con lo que dice de él la lección.",
            pares: [
              ["Las Asambleas de Dios", "Se organizaron en 1914, en Hot Springs, Arkansas"],
              ["La Iglesia Internacional del Evangelio Cuadrangular", "Nació de la obra de Aimee Semple McPherson"],
              ["La Iglesia de Dios de Cleveland, Tennessee", "Ya existía y se hizo pentecostal entre 1907 y 1908"],
              ["La calle Azusa", "Desde allí, misioneros llevaron el mensaje a todo el mundo"],
            ],
            apoyo: "Iglesias que ya existían, como la Iglesia de Dios en Cristo y la Iglesia de Dios de Cleveland, Tennessee, se hicieron pentecostales entre 1907 y 1908",
            explica: "Desde la calle Azusa, misioneros llevaron el mensaje a todo el mundo. Iglesias como la de Cleveland se hicieron pentecostales entre 1907 y 1908; las Asambleas de Dios se organizaron en 1914, y la Cuadrangular nació de la obra de Aimee Semple McPherson.",
          },
          {
            consigna: "¿Qué pasó en cada lugar o fecha? Une cada uno con lo que le corresponde.",
            pares: [
              ["Hot Springs, Arkansas, en 1914", "Se organizaron las Asambleas de Dios"],
              ["Los Ángeles, en la década de 1920", "Nació la Iglesia Internacional del Evangelio Cuadrangular"],
              ["Entre 1907 y 1908", "Iglesias que ya existían se hicieron pentecostales"],
              ["La calle Azusa, desde 1906", "Salieron misioneros con el mensaje pentecostal al mundo"],
            ],
            apoyo: "Las Asambleas de Dios se organizaron en 1914, en Hot Springs, Arkansas",
            explica: "Desde la calle Azusa (1906) salieron misioneros a todo el mundo; entre 1907 y 1908 iglesias que ya existían se hicieron pentecostales; en 1914 se organizaron las Asambleas de Dios, y en la década de 1920 nació en Los Ángeles la Cuadrangular.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Negros, blancos, hispanos y personas de muchas naciones oraban juntos, en una época de fuerte separación racial",
            ref: "Hechos 2:1-4",
            situacion: "Eres líder de oración en tu iglesia. En la congregación hay hermanos de muchos países y también algunos que no son hispanos.",
            escenas: [
              {
                id: "e1",
                narra: "Un hermano propone que cada grupo ore aparte, con los de su mismo país, para que todos estén más cómodos.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que en Azusa oraban juntos creyentes de muchas razas, y que aquí también se puede.", valor: 2, explica: "Negros, blancos, hispanos y personas de muchas naciones oraban juntos, en una época de fuerte separación racial.", siguiente: "e2" },
                  { texto: "Que lo piensen juntos, y que por ahora hagan una reunión unida solo una vez al mes.", valor: 1, explica: "Una reunión unida es un paso, pero el ejemplo de Azusa va más allá: oraban juntos, en una época de fuerte separación racial." },
                  { texto: "Que tiene razón: es mejor que cada grupo ore aparte, con los de su mismo origen.", valor: 0, explica: "En la calle Azusa, negros, blancos, hispanos y personas de muchas naciones oraban juntos.", siguiente: "fin" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa un mes. Los grupos casi no se conocen, y algunos empiezan a hablar mal de los otros.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Los reúnes a orar juntos cada semana, como oraban en Azusa los de distintas razas.", valor: 2, explica: "En la calle Azusa, creyentes de distintas razas oraban juntos, en una época de fuerte separación racial." },
                  { texto: "Los dejas así, porque las diferencias entre los grupos no tienen ninguna solución.", valor: 0, explica: "En Azusa, negros, blancos, hispanos y personas de muchas naciones oraban juntos.", siguiente: "fin" },
                ],
              },
              {
                id: "e2",
                narra: "En la primera reunión unida, alguien dice que el avivamiento solo vendrá si traen a un predicador famoso.",
                pregunta: "¿Qué les enseñas de la calle Azusa?",
                opciones: [
                  { texto: "Que tiene razón: sin un predicador famoso, Dios no va a obrar en una iglesia como esta.", valor: 0, explica: "En Azusa, creyentes de distintas razas oraban día y noche, y lo que allí comenzó se extendió por todo el mundo." },
                  { texto: "Que Azusa empezó en un viejo edificio de madera, con creyentes que oraban día y noche.", valor: 2, explica: "Así comenzó Azusa: creyentes de distintas razas oraban día y noche, y lo que allí comenzó se extendió por todo el mundo." },
                  { texto: "Que inviten a un buen predicador, pero que antes oren juntos para prepararse bien.", valor: 1, explica: "Invitar a un predicador puede ayudar, pero lo que enseña Azusa es la oración unida, día y noche." },
                ],
              },
              {
                id: "e3",
                narra: "Al terminar, un joven pregunta si lo que pasó en Azusa tiene algo que ver con su iglesia hispana de hoy.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que es una historia bonita, pero que pasó hace mucho tiempo y en un lugar muy distinto.", valor: 1, explica: "Es historia, pero sí tiene que ver: en Azusa también oraban hispanos, y desde allí el mensaje llegó a todo el mundo." },
                  { texto: "Que en Azusa también oraban hispanos, y que desde allí el mensaje llegó al mundo.", valor: 2, explica: "Negros, blancos, hispanos y personas de muchas naciones oraban juntos, y desde allí misioneros llevaron el mensaje pentecostal a todo el mundo." },
                  { texto: "Que no tiene nada que ver: en Azusa solo oraban personas de una misma raza.", valor: 0, explica: "En Azusa, negros, blancos, hispanos y personas de muchas naciones oraban juntos." },
                ],
              },
            ],
          },
          {
            apoyo: "A comienzos del siglo XX, en un viejo edificio de madera de Los Ángeles, creyentes de distintas razas oraban día y noche",
            ref: "Hechos 2:1-4",
            situacion: "Eres pastor asistente. Tu iglesia hispana y una iglesia afroamericana del mismo barrio quieren hacer juntas una noche de oración.",
            escenas: [
              {
                id: "e1",
                narra: "Algunos hermanos de tu iglesia dicen que no vale la pena orar con gente de otra raza y de otro idioma.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que lo intenten una sola vez, y que si no se sienten cómodos, ya no lo vuelvan a hacer.", valor: 1, explica: "Intentarlo es bueno, pero el ejemplo de Azusa es más claro: negros, blancos, hispanos y personas de muchas naciones oraban juntos." },
                  { texto: "Que tienen razón, y que cada iglesia ore sola en su propio templo con su gente.", valor: 0, explica: "En la calle Azusa, creyentes de distintas razas oraban juntos, en una época de fuerte separación racial.", siguiente: "fin" },
                  { texto: "Que en Azusa oraban juntos negros, blancos e hispanos, cuando todo los separaba.", valor: 2, explica: "Negros, blancos, hispanos y personas de muchas naciones oraban juntos, en una época de fuerte separación racial." },
                ],
              },
              {
                id: "e2",
                narra: "Durante la noche de oración, un hermano pregunta quién dirigió el avivamiento de la calle Azusa.",
                pregunta: "¿Qué le cuentas?",
                opciones: [
                  { texto: "Que lo dirigió William J. Seymour, un predicador hijo de antiguos esclavos.", valor: 2, explica: "En 1906, William J. Seymour, hijo de antiguos esclavos, dirigió en la calle Azusa un avivamiento que duró unos tres años." },
                  { texto: "Que lo dirigió un predicador hispano muy famoso que había llegado desde México.", valor: 0, explica: "El avivamiento de la calle Azusa lo dirigió William J. Seymour, un predicador afroamericano." },
                  { texto: "Que no lo recuerdas bien, pero que después lo pueden buscar juntos en la lección.", valor: 1, explica: "Buscarlo juntos está bien, pero la lección lo dice: lo dirigió William J. Seymour, un predicador afroamericano." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, los jóvenes de las dos iglesias quieren seguir orando juntos.",
                pregunta: "¿Qué les propones?",
                opciones: [
                  { texto: "Que oren juntos solo una vez al año, para no complicarles demasiado las cosas a todos.", valor: 1, explica: "Una vez al año es algo, pero en Azusa creyentes de distintas razas oraban día y noche." },
                  { texto: "Seguir orando juntos con frecuencia, como en Azusa, donde oraban día y noche.", valor: 2, explica: "En Azusa, creyentes de distintas razas oraban día y noche, y lo que allí comenzó se extendió por todo el mundo." },
                  { texto: "Que mejor no, porque cada iglesia debe mantenerse siempre por su lado, con su gente.", valor: 0, explica: "En Azusa, creyentes de distintas razas oraban juntos, y desde allí el mensaje llegó a todo el mundo." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la renovación carismática: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Desde 1960, la experiencia pentecostal llegó también a iglesias históricas, como la luterana y la católica.", verdad: true, explica: "Y también a la episcopal: a eso se le llamó la renovación carismática.", apoyo: "Desde 1960, la experiencia pentecostal llegó también a iglesias históricas, como la episcopal, la luterana y la católica" },
              { texto: "La renovación carismática se quedó solo dentro de las iglesias pentecostales.", verdad: false, explica: "Fue al revés: llegó a iglesias históricas, como la episcopal, la luterana y la católica.", apoyo: "en lo que se llamó la renovación carismática" },
              { texto: "Hoy los pentecostales y carismáticos son cientos de millones en el mundo.", verdad: true, explica: "Y están sobre todo en América Latina, África y Asia.", apoyo: "Hoy los pentecostales y carismáticos son cientos de millones en el mundo" },
            ],
          },
          {
            consigna: "Sobre el movimiento pentecostal hoy: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Hoy los pentecostales y carismáticos son un grupo pequeño en el mundo.", verdad: false, explica: "Son cientos de millones en el mundo, sobre todo en América Latina, África y Asia.", apoyo: "Hoy los pentecostales y carismáticos son cientos de millones en el mundo, sobre todo en América Latina, África y Asia" },
              { texto: "Los pentecostales y carismáticos de hoy están sobre todo en América Latina, África y Asia.", verdad: true, explica: "Son cientos de millones en el mundo, sobre todo en esas regiones.", apoyo: "sobre todo en América Latina, África y Asia" },
              { texto: "La renovación carismática comenzó en 1906, en la calle Azusa.", verdad: false, explica: "En 1906 comenzó el avivamiento de la calle Azusa; la renovación carismática llegó a otras iglesias desde 1960.", apoyo: "desde 1960 la renovación carismática llegó a otras iglesias" },
              { texto: "La llegada de la experiencia pentecostal a otras iglesias se llamó renovación carismática.", verdad: true, explica: "Desde 1960 llegó a iglesias históricas, como la episcopal, la luterana y la católica, en lo que se llamó la renovación carismática.", apoyo: "en lo que se llamó la renovación carismática" },
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
            apoyo: "Desde 1960, la experiencia pentecostal llegó también a iglesias históricas, como la episcopal, la luterana y la católica, en lo que se llamó la renovación carismática",
            clave: {
              id: "pr-n4-historia-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué fue la renovación carismática y desde cuándo se dio?",
              ideas: [
                { id: "historicas", peso: 60, texto: "La experiencia pentecostal llegó también a iglesias históricas, como la episcopal, la luterana y la católica.", formas: ["iglesias historicas", "(llego|entro|paso) iglesias", "(llego|entro|paso) otras iglesias", "luterana", "episcopal", "catolica"] },
                { id: "1960", peso: 40, texto: "Se dio desde 1960.", formas: ["1960", "sesenta"] },
              ],
              modelo: "Fue la llegada de la experiencia pentecostal a iglesias históricas, como la episcopal, la luterana y la católica. A eso se le llamó la renovación carismática, y se dio desde 1960.",
            },
          },
          {
            apoyo: "Hoy los pentecostales y carismáticos son cientos de millones en el mundo, sobre todo en América Latina, África y Asia",
            clave: {
              id: "pr-n4-historia-2-5-a7-2",
              tipo: "corta",
              pregunta: "¿Qué lugar tienen hoy en el mundo los pentecostales y carismáticos, y en qué regiones están sobre todo?",
              ideas: [
                { id: "millones", peso: 50, texto: "Hoy son cientos de millones en el mundo.", formas: ["cientos de millones", "millones"] },
                { id: "regiones", peso: 50, texto: "Están sobre todo en América Latina, África y Asia.", formas: ["america latina", "latinoamerica", "africa", "asia"] },
              ],
              modelo: "Hoy los pentecostales y carismáticos son cientos de millones en el mundo. Están sobre todo en América Latina, África y Asia, porque desde la calle Azusa los misioneros llevaron el mensaje a todo el mundo.",
            },
          },
        ],
      },
    ],

    // ------------------------------------------------------------ 6. La iglesia evangélica en América Latina
    "n4-historia-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Durante la colonia, ¿qué fe llegó a América?", reverso: "La católica; los protestantes casi no podían entrar.", apoyo: "Durante la colonia, la fe que llegó a América fue la católica, y los protestantes casi no podían entrar" },
              { frente: "¿Cómo se llamaba a los vendedores de Biblias del siglo XIX?", reverso: "Colportores.", apoyo: "llegaron vendedores de Biblias, llamados colportores, y misioneros" },
              { frente: "¿Qué hizo el escocés Diego Thomson hacia 1820?", reverso: "Repartió Biblias y promovió escuelas en varios países de América del Sur.", apoyo: "Uno de los primeros fue el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas en varios países de América del Sur" },
              { frente: "¿Cuándo llegaron los colportores y los misioneros?", reverso: "Con la independencia de los países, en el siglo XIX.", apoyo: "Con la independencia de los países, en el siglo XIX, llegaron vendedores de Biblias" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué pregunta de Romanos 10 abre la lección?", reverso: "«¿Y cómo oirán sin haber quien les predique?».", apoyo: "«¿Y cómo oirán sin haber quien les predique?»" },
              { frente: "¿De dónde era Diego Thomson?", reverso: "Era escocés.", apoyo: "el escocés Diego Thomson" },
              { frente: "¿Qué pasaba durante siglos con la Biblia en América Latina?", reverso: "Casi no circulaba en las manos del pueblo.", apoyo: "Durante siglos, en América Latina la Biblia casi no circulaba en las manos del pueblo" },
              { frente: "¿Qué hacen hoy millones de latinoamericanos con la Palabra?", reverso: "La leen y la predican en su idioma.", apoyo: "Hoy, millones de latinoamericanos leen la Palabra y la predican en su idioma" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que hizo uno de los primeros misioneros en América del Sur.",
            texto: "Uno de los primeros fue el [[escocés]] Diego Thomson, que hacia 1820 [[repartió]] Biblias y promovió [[escuelas]] en varios países de América del Sur.",
            distractores: ["español", "quemó", "cárceles"],
            errores: {
              "español": "Diego Thomson era escocés.",
              "quemó": "Thomson repartió Biblias en varios países de América del Sur.",
              "cárceles": "Thomson promovió escuelas en varios países de América del Sur.",
            },
            apoyo: "Uno de los primeros fue el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas en varios países de América del Sur",
            ref: "Romanos 10:14-15",
            explica: "Con la independencia llegaron colportores y misioneros. Uno de los primeros fue el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas en varios países de América del Sur.",
          },
          {
            consigna: "Completa qué fe llegó a América durante la colonia.",
            texto: "Durante la [[colonia]], la fe que llegó a América fue la [[católica]], y los protestantes casi no podían entrar.",
            distractores: ["independencia", "protestante"],
            errores: {
              independencia: "Con la independencia, en el siglo XIX, llegaron vendedores de Biblias y misioneros.",
              protestante: "Durante la colonia, la fe que llegó a América fue la católica.",
            },
            apoyo: "Durante la colonia, la fe que llegó a América fue la católica, y los protestantes casi no podían entrar",
            ref: "Romanos 10:14-15",
            explica: "Durante la colonia, la fe que llegó a América fue la católica y los protestantes casi no podían entrar. Con la independencia, en el siglo XIX, llegaron colportores y misioneros.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "linea",
        versiones: [
          {
            consigna: "Ordena en el tiempo cómo llegó y creció el evangelio en América Latina.",
            eventos: [
              { texto: "Los protestantes casi no pueden entrar en América", fecha: "Durante la colonia" },
              { texto: "El escocés Diego Thomson reparte Biblias en América del Sur", fecha: "Hacia 1820" },
              { texto: "Un avivamiento en Valparaíso da origen a la Iglesia Metodista Pentecostal", fecha: "1909" },
              { texto: "Berg y Vingren fundan en Belém la iglesia que llegaría a ser las Asambleas de Dios", fecha: "1911" },
              { texto: "Francisco Olazábal predica a miles en Estados Unidos, México y Puerto Rico", fecha: "Décadas de 1920 y 1930" },
            ],
            apoyo: "El pentecostalismo latinoamericano nació en Chile (1909, con Willis Hoover) y en Brasil (1911, con Berg y Vingren) y creció en todo el continente",
            ref: "Romanos 10:14-15",
            explica: "Durante la colonia los protestantes casi no podían entrar; hacia 1820 Diego Thomson repartió Biblias; el pentecostalismo nació en Chile en 1909 y en Brasil en 1911, y Olazábal predicó a miles en las décadas de 1920 y 1930.",
          },
          {
            consigna: "Ordena estos hechos de la iglesia evangélica latina en el tiempo, del primero al último.",
            eventos: [
              { texto: "Con la independencia llegan colportores y misioneros", fecha: "En el siglo XIX" },
              { texto: "El misionero Willis Hoover guía un avivamiento en la iglesia metodista de Valparaíso", fecha: "1909" },
              { texto: "Dos misioneros suecos fundan una iglesia en Belém, Brasil", fecha: "1911" },
              { texto: "Un evangelista mexicano predica a miles en Estados Unidos, México y Puerto Rico", fecha: "Décadas de 1920 y 1930" },
              { texto: "El evangelio sale de América Latina hacia otras naciones", fecha: "Hoy" },
            ],
            apoyo: "El evangelio que llegó a América Latina hoy sale de América Latina hacia otras naciones, con misioneros latinos en todo el mundo",
            ref: "Hechos 1:8",
            explica: "En el siglo XIX llegaron colportores y misioneros; en 1909 Hoover guió el avivamiento de Valparaíso; en 1911 Berg y Vingren fundaron la iglesia de Belém; en las décadas de 1920 y 1930 predicó Olazábal, y hoy el evangelio sale de América Latina.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Pasó en Chile o en Brasil? Lleva cada frase a su grupo.",
            grupos: ["En Chile", "En Brasil"],
            frases: [
              { texto: "Un avivamiento en la iglesia metodista de Valparaíso", grupo: 0 },
              { texto: "El misionero Willis Hoover guiaba la iglesia de Valparaíso", grupo: 0 },
              { texto: "Nació la Iglesia Metodista Pentecostal", grupo: 0 },
              { texto: "Dos misioneros suecos fundaron una iglesia en Belém", grupo: 1 },
              { texto: "Daniel Berg y Gunnar Vingren", grupo: 1 },
              { texto: "Nació la iglesia que llegaría a ser las Asambleas de Dios", grupo: 1 },
            ],
            apoyo: "En Chile, en 1909, un avivamiento en la iglesia metodista de Valparaíso, guiada por el misionero Willis Hoover, dio origen a la Iglesia Metodista Pentecostal",
            ref: "Hechos 1:8",
            explica: "En Chile, en 1909, un avivamiento en la iglesia metodista de Valparaíso, guiada por Willis Hoover, dio origen a la Iglesia Metodista Pentecostal. En Brasil, en 1911, Berg y Vingren fundaron en Belém la iglesia que llegaría a ser las Asambleas de Dios.",
          },
          {
            consigna: "¿Pasó en Chile, en Brasil o en todo el continente? Lleva cada frase a su grupo.",
            grupos: ["En Chile", "En Brasil", "En todo el continente"],
            frases: [
              { texto: "Willis Hoover guiaba la iglesia metodista de Valparaíso", grupo: 0 },
              { texto: "Nació la Iglesia Metodista Pentecostal en 1909", grupo: 0 },
              { texto: "Dos misioneros suecos fundaron una iglesia en Belém en 1911", grupo: 1 },
              { texto: "Nacieron las Asambleas de Dios, hoy de las iglesias más grandes del mundo", grupo: 1, explica: "La iglesia que fundaron en Belém llegó a ser las Asambleas de Dios, hoy una de las más grandes del mundo." },
              { texto: "El pentecostalismo creció sobre todo entre los pobres", grupo: 2 },
              { texto: "Creció con pastores del lugar y la Biblia en la mano", grupo: 2 },
              { texto: "Creció durante el siglo XX", grupo: 2 },
            ],
            apoyo: "Durante el siglo XX, el pentecostalismo creció en todo el continente, sobre todo entre los pobres, con pastores del lugar y la Biblia en la mano",
            ref: "Hechos 1:8",
            explica: "El pentecostalismo latinoamericano nació en Chile (1909) y en Brasil (1911), y durante el siglo XX creció en todo el continente, sobre todo entre los pobres, con pastores del lugar y la Biblia en la mano.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos, también en Texas",
            ref: "Hechos 1:8",
            titulo: "Una noche de historia para los jóvenes",
            relato: [
              "Tu pastor te pidió que prepares una noche de historia para los jóvenes de tu iglesia hispana, en Texas.",
              "Samuel, de diecisiete años, te dice que no piensa ir: según él, las iglesias hispanas son nuevas en este país, y la historia de verdad la escribieron otros.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le muestras primero a Samuel?",
                opciones: [
                  { texto: "Que los hispanos llegaron al pentecostalismo hace muy poco, en este siglo.", explica: "Desde la calle Azusa hubo hispanos entre los pentecostales." },
                  { texto: "Que desde la calle Azusa hubo hispanos entre los pentecostales.", bien: true, explica: "Desde la calle Azusa hubo hispanos entre los pentecostales, y hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos." },
                  { texto: "Que tiene razón: los hispanos no tuvieron ninguna parte en esa historia.", explica: "Desde la calle Azusa hubo hispanos entre los pentecostales, y Francisco Olazábal predicó a miles." },
                  { texto: "Que las iglesias hispanas de Texas las fundó el escocés Diego Thomson.", explica: "Diego Thomson repartió Biblias hacia 1820 en América del Sur; desde la calle Azusa hubo hispanos entre los pentecostales." },
                ],
                apoyo: "Desde la calle Azusa hubo hispanos entre los pentecostales",
                explica: "Desde la calle Azusa hubo hispanos entre los pentecostales: la iglesia hispana no es nueva en esta historia.",
              },
              {
                tipo: "situacion",
                pregunta: "Samuel pregunta si hubo algún predicador hispano importante. ¿De quién le hablas?",
                opciones: [
                  { texto: "De Willis Hoover, el evangelista mexicano que fundó las iglesias hispanas de Texas.", explica: "Willis Hoover fue el misionero que guiaba la iglesia metodista de Valparaíso, en Chile." },
                  { texto: "De Diego Thomson, el pastor mexicano que predicó en Texas a comienzos del siglo XX.", explica: "Diego Thomson era escocés, y hacia 1820 repartió Biblias en América del Sur." },
                  { texto: "De Daniel Berg, el evangelista que fundó en Texas el Concilio Latinoamericano.", explica: "Daniel Berg fue uno de los dos misioneros suecos que fundaron en Belém, Brasil, la iglesia que llegaría a ser las Asambleas de Dios." },
                  { texto: "De Francisco Olazábal, un evangelista mexicano que predicó a miles en este país.", bien: true, explica: "Francisco Olazábal predicó a miles en los Estados Unidos, México y Puerto Rico, y fundó el Concilio Latinoamericano de Iglesias Cristianas." },
                ],
                apoyo: "Francisco Olazábal, un evangelista mexicano, predicó a miles en los Estados Unidos, México y Puerto Rico en las décadas de 1920 y 1930",
                explica: "Francisco Olazábal, un evangelista mexicano, predicó a miles en las décadas de 1920 y 1930 y fundó el Concilio Latinoamericano de Iglesias Cristianas.",
              },
              {
                tipo: "explica",
                apoyo: "Eres parte de la historia del evangelio entre los hispanos: escribe con fidelidad tu capítulo",
                ref: "Hechos 1:8",
                clave: {
                  id: "pr-n4-historia-2-6-a5-1",
                  tipo: "corta",
                  pregunta: "Escribe lo que le dirías a Samuel sobre su lugar en esta historia y sobre lo que hacen hoy los latinos.",
                  ideas: [
                    { id: "parte", peso: 50, texto: "Que él es parte de la historia del evangelio entre los hispanos, y que le toca escribir con fidelidad su capítulo.", formas: ["(es|eres|somos|son) parte", "parte de la historia", "parte de esta historia", "su capitulo", "tu capitulo", "con fidelidad", "escrib* (su|tu) capitulo"] },
                    { id: "sale", peso: 50, texto: "Que hoy el evangelio sale de América Latina hacia otras naciones, con misioneros latinos en todo el mundo.", formas: ["sale de america latina", "salen de america latina", "misioneros latinos", "misioneros latinoamericanos", "hacia otras naciones", "a otras naciones"] },
                  ],
                  modelo: "Le diría que él es parte de la historia del evangelio entre los hispanos y que le toca escribir con fidelidad su capítulo. Hoy el evangelio sale de América Latina hacia otras naciones, con misioneros latinos en todo el mundo.",
                },
              },
            ],
          },
          {
            apoyo: "Nuestro ministerio es parte de esta historia: hispanos que predican a Cristo con el poder del Espíritu",
            ref: "Hechos 1:8",
            titulo: "La historia de una familia",
            relato: [
              "Doña Carmen llegó a Texas desde México hace muchos años y conoció a Cristo en una iglesia pentecostal hispana.",
              "Su nieto Andrés, a quien tú discipulas, no sabe cómo llegó el evangelio a su familia. Te pregunta si los hispanos tienen alguna historia en la iglesia de este país, y qué puede hacer él con su fe.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le cuentas a Andrés de Francisco Olazábal?",
                opciones: [
                  { texto: "Que fue un misionero escocés que repartió Biblias y promovió escuelas en Texas hacia 1820.", explica: "El escocés que repartió Biblias hacia 1820 fue Diego Thomson, en América del Sur." },
                  { texto: "Que fue uno de los dos misioneros suecos que fundaron una iglesia en Belém, en Brasil.", explica: "Los misioneros suecos de Belém fueron Daniel Berg y Gunnar Vingren." },
                  { texto: "Que fue un evangelista mexicano que predicó a miles y fundó un concilio de iglesias.", bien: true, explica: "Francisco Olazábal predicó a miles en los Estados Unidos, México y Puerto Rico, y fundó el Concilio Latinoamericano de Iglesias Cristianas." },
                  { texto: "Que fue el misionero que guiaba la iglesia metodista de Valparaíso, en Chile.", explica: "La iglesia metodista de Valparaíso la guiaba el misionero Willis Hoover." },
                ],
                apoyo: "Francisco Olazábal, un evangelista mexicano, predicó a miles en los Estados Unidos, México y Puerto Rico en las décadas de 1920 y 1930, y fundó el Concilio Latinoamericano de Iglesias Cristianas",
                explica: "Francisco Olazábal, un evangelista mexicano, predicó a miles en las décadas de 1920 y 1930 y fundó el Concilio Latinoamericano de Iglesias Cristianas.",
              },
              {
                tipo: "situacion",
                pregunta: "Andrés pregunta si las iglesias hispanas tienen hoy algún lugar en la iglesia de los Estados Unidos. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que son una parte pequeña que pronto va a desaparecer, porque los jóvenes se van.", explica: "Hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos, también en Texas." },
                  { texto: "Que hoy son una parte viva de la iglesia en los Estados Unidos, también en Texas.", bien: true, explica: "Así lo dice la lección: las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos, también en Texas." },
                  { texto: "Que solo cuentan las iglesias de América Latina, y no las hispanas de este país.", explica: "Hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos." },
                  { texto: "Que las iglesias hispanas existen en este país apenas desde hace pocos años.", explica: "Desde la calle Azusa hubo hispanos entre los pentecostales, y Olazábal predicó a miles en las décadas de 1920 y 1930." },
                ],
                apoyo: "Hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos, también en Texas",
                explica: "Hoy las iglesias hispanas son una parte viva de la iglesia en los Estados Unidos, también en Texas.",
              },
              {
                tipo: "explica",
                apoyo: "Conocerla nos ayuda a ser fieles en nuestra generación",
                ref: "Hechos 1:8",
                clave: {
                  id: "pr-n4-historia-2-6-a5-2",
                  tipo: "corta",
                  pregunta: "Escribe lo que le dirías a Andrés: ¿para qué le sirve conocer esta historia, y qué le toca hacer a él?",
                  ideas: [
                    { id: "fieles", peso: 50, texto: "Que conocer esta historia nos ayuda a ser fieles en nuestra generación.", formas: ["ser fieles", "ser fiel", "fiel* en (su|nuestra|esta|tu) generacion", "nuestra generacion", "su generacion", "tu generacion"] },
                    { id: "llevar", peso: 50, texto: "Que le toca llevar el evangelio a la siguiente generación, como parte de la historia del evangelio entre los hispanos.", formas: ["siguiente generacion", "proxima generacion", "(es|eres|somos) parte de (la|esta) historia", "su capitulo", "tu capitulo", "predic* a cristo"] },
                  ],
                  modelo: "Le diría que conocer esta historia nos ayuda a ser fieles en nuestra generación. Él es parte de la historia del evangelio entre los hispanos, y le toca llevar el evangelio a la siguiente generación.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El evangelio protestante llegó a América Latina en el siglo XIX con colportores y misioneros como Diego Thomson",
            ref: "Romanos 10:14-15",
            clave: {
              id: "pr-n4-historia-2-6-a6-1",
              tipo: "corta",
              pregunta: "¿Cómo llegó el evangelio protestante a América Latina?",
              ideas: [
                { id: "colonia", peso: 30, texto: "Durante la colonia, la fe que llegó fue la católica, y los protestantes casi no podían entrar.", formas: ["casi no podian entrar", "no (podian|pudieron) entrar", "fue la catolica", "fe catolica", "solo (la|fe) catolica"] },
                { id: "independencia", peso: 40, texto: "Con la independencia de los países, en el siglo XIX, llegaron vendedores de Biblias, llamados colportores, y misioneros.", formas: ["independencia", "siglo xix", "siglo 19", "colportores", "vendedores de biblias"] },
                { id: "thomson", peso: 30, texto: "Uno de los primeros fue el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas.", formas: ["thomson", "1820", "promov* escuelas", "repart* biblias"] },
              ],
              errores: [
                { id: "colonia-entraron", texto: "Durante la colonia, los protestantes casi no podían entrar: llegaron con la independencia.", formas: ["colonia (llegaron|entraron|vinieron) protestantes", "colonia (llegaron|entraron|vinieron) misioneros"], anula: "colonia" },
              ],
              modelo: "Durante la colonia los protestantes casi no podían entrar. Con la independencia, en el siglo XIX, llegaron colportores, que vendían Biblias, y misioneros, como el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas.",
            },
          },
          {
            apoyo: "Uno de los primeros fue el escocés Diego Thomson, que hacia 1820 repartió Biblias y promovió escuelas en varios países de América del Sur",
            clave: {
              id: "pr-n4-historia-2-6-a6-2",
              tipo: "corta",
              pregunta: "¿Qué eran los colportores, y qué hizo Diego Thomson hacia 1820?",
              ideas: [
                { id: "colportores", peso: 50, texto: "Los colportores eran vendedores de Biblias que llegaron con la independencia, en el siglo XIX.", formas: ["vendedores de biblias", "vend* biblias", "vend* la biblia", "vend* las biblias"] },
                { id: "thomson", peso: 50, texto: "Diego Thomson, un escocés, repartió Biblias y promovió escuelas en varios países de América del Sur.", formas: ["repart* biblias", "repart* la biblia", "repart* las biblias", "promov* escuelas", "escuelas", "regal* biblias"] },
              ],
              modelo: "Los colportores eran vendedores de Biblias que llegaron con la independencia, en el siglo XIX. Diego Thomson, un escocés, repartió Biblias y promovió escuelas en varios países de América del Sur.",
            },
          },
        ],
      },
    ],
  },
};
