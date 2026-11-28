/**
 * Las prácticas de la materia `evangelismo-misiones-1` (especialidad). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/evangelismo-misiones-1.ts), con la guía de docs/academia-practicas.md.
 *
 * «Evangelismo personal avanzado» sigue a «Evangelismo personal» (Nivel 2) y a «Evangelismo y consolidación» (Nivel 3):
 * no repite sus actividades (el embajador en un mapa de ideas, el resumen de 1 Corintios 15, el orden de Pablo en Atenas,
 * el envío de dos en dos, el círculo de la consolidación), sino que practica lo nuevo de cada lección con otras piezas.
 * Las lecciones no marcan nada por confirmar. Las distorsiones del evangelio y la promesa al carcelero («tú y tu casa»)
 * se preguntan solo con las palabras de la lección.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_EVANGELISMO_MISIONES_1: PracticasMateria = {
  materia: "evangelismo-misiones-1",
  mision: {
    titulo: "El que gana almas es sabio",
    intro: "Tu pastor te encargó el equipo de evangelismo personal de la iglesia, y quiere que este año sus miembros compartan su fe con más fruto. Vas a prepararlos paso a paso: que oren cada día por personas con nombre, que tengan claro el evangelio y reconozcan sus distorsiones, que hablen según la historia de cada persona sin cambiar el mensaje, que empiecen por su casa y sus amigos, que pidan valor en oración y que formen a otros para evangelizar. Repasa las seis lecciones para tener cada paso listo.",
    cierre: "Ya sabes evangelizar con un corazón movido por el amor de Cristo: como embajador que ruega, con el evangelio claro y sin distorsiones, escuchando la historia de cada persona, empezando por los tuyos, con el valor que se pide en oración y formando a otros que enseñen también a otros. «El fruto del justo es árbol de vida; Y el que gana almas es sabio».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El corazón del evangelista
    "evangelismo-misiones-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué decía Pablo que lo movía a evangelizar?", reverso: "«Porque el amor de Cristo nos constriñe»: el amor de Cristo lo empujaba.", apoyo: "Pablo explica qué lo movía: «Porque el amor de Cristo nos constriñe»" },
              { frente: "¿Por qué dos cosas no evangelizaba Pablo?", reverso: "Ni por obligación ni por ganar discusiones.", apoyo: "No evangelizaba por obligación ni por ganar discusiones, sino porque el amor de Cristo lo empujaba" },
              { frente: "¿Habla el embajador en su propio nombre?", reverso: "No: lleva el mensaje del que lo envió.", apoyo: "El embajador no habla en su propio nombre, sino que lleva el mensaje del que lo envió" },
              { frente: "¿Qué ruega el embajador a las personas en nombre de Cristo?", reverso: "«Reconciliaos con Dios».", apoyo: "y lo hace rogando: «Reconciliaos con Dios»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuál es el versículo de memoria de esta materia?", reverso: "Proverbios 11:30: «El fruto del justo es árbol de vida; Y el que gana almas es sabio».", apoyo: "Es el versículo de memoria de esta materia" },
              { frente: "¿Cómo se veía Pablo al anunciar el evangelio?", reverso: "Como un enviado: «somos embajadores en nombre de Cristo».", apoyo: "Por eso se veía como un enviado: «somos embajadores en nombre de Cristo»" },
              { frente: "¿Cómo ve el evangelista a las personas, si no las ve como números?", reverso: "Como gente que Dios ama y que necesita a Cristo.", apoyo: "El evangelista no ve a las personas como números, sino como gente que Dios ama y que necesita a Cristo" },
              { frente: "¿Dónde empieza el evangelismo, según la lección?", reverso: "De rodillas.", apoyo: "El evangelismo empieza de rodillas" },
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
            consigna: "Completa qué movía a Pablo a evangelizar.",
            texto: "Pablo [[anunciaba]] a Cristo porque el [[amor]] de Cristo lo [[empujaba]], y no por obligación ni por ganar discusiones.",
            distractores: ["negaba", "miedo", "frenaba"],
            errores: {
              negaba: "Pablo anunciaba a Cristo: «somos embajadores en nombre de Cristo».",
              miedo: "Lo que movía a Pablo era el amor de Cristo: «Porque el amor de Cristo nos constriñe».",
              frenaba: "El amor de Cristo no frenaba a Pablo: lo empujaba a anunciar el evangelio.",
            },
            apoyo: "No evangelizaba por obligación ni por ganar discusiones, sino porque el amor de Cristo lo empujaba",
            ref: "2 Corintios 5:14",
            explica: "Pablo no evangelizaba por obligación ni por ganar discusiones: el amor de Cristo lo empujaba. Él mismo lo dice: «Porque el amor de Cristo nos constriñe».",
          },
          {
            consigna: "Completa cómo anunciaba Pablo el evangelio como embajador.",
            texto: "Como [[embajador]], Pablo llevaba el [[mensaje]] del que lo envió y lo hacía [[rogando]] a las personas que se reconciliaran con Dios.",
            distractores: ["vendedor", "enojo", "obligando"],
            errores: {
              vendedor: "Pablo se veía como un enviado: «somos embajadores en nombre de Cristo».",
              enojo: "El embajador lleva el mensaje del que lo envió.",
              obligando: "El embajador no obliga a nadie: ruega, «Reconciliaos con Dios».",
            },
            apoyo: "El embajador no habla en su propio nombre, sino que lleva el mensaje del que lo envió, y lo hace rogando",
            ref: "2 Corintios 5:20",
            explica: "Pablo se veía como un embajador: no hablaba en su propio nombre, sino que llevaba el mensaje de Cristo y lo hacía rogando: «Reconciliaos con Dios».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Pablo escribió de los suyos. ¿Qué dos cosas suyas eran para la salvación de Israel? Toca las dos palabras.",
            texto: "el [[anhelo]] de mi corazón, y mi [[oración]] a Dios por Israel, es para salvación",
            apoyo: "El evangelista no ve a las personas como números, sino como gente que Dios ama y que necesita a Cristo",
            ref: "Romanos 10:1",
            explica: "Pablo escribió: «el anhelo de mi corazón, y mi oración a Dios por Israel, es para salvación». Así es la carga por los perdidos: el evangelista no ve a las personas como números, sino como gente que Dios ama.",
          },
          {
            consigna: "Pablo pide orar por todos. ¿Qué quiere Dios para todos los hombres? Toca las palabras que lo dicen.",
            texto: "quiere que todos los hombres sean [[salvos]] y vengan al [[conocimiento de la verdad]]",
            apoyo: "porque Dios quiere que todos sean salvos",
            ref: "1 Timoteo 2:4",
            explica: "Dios «quiere que todos los hombres sean salvos y vengan al conocimiento de la verdad». Por eso el evangelista siente carga por los perdidos y ora por ellos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un hermano de tu equipo de evangelismo te dice: Lo importante es llegar a 500 contactos este año; no hay tiempo para conocer a cada uno.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no son números: son gente que Dios ama y que necesita a Cristo.", bien: true, explica: "El evangelista no ve a las personas como números, sino como gente que Dios ama y que necesita a Cristo." },
              { texto: "Que tiene razón: cuantos más contactos sumen, más fruto van a tener.", explica: "Sumar contactos no es la meta: cada persona es alguien que Dios ama y que necesita a Cristo." },
              { texto: "Que bajen la meta a 300, para que sea más fácil cumplirla a tiempo.", explica: "Cambiar la cifra no cambia el corazón: el evangelista no ve a las personas como números." },
              { texto: "Que conocerlos no importa, si al final del año el informe sale bien.", explica: "Lo que importa no es el informe: Pablo oraba con anhelo por la salvación de los suyos." },
            ],
            apoyo: "El evangelista no ve a las personas como números, sino como gente que Dios ama y que necesita a Cristo",
            ref: "Romanos 10:1",
            explica: "Como Pablo, el evangelista siente carga por los perdidos: no los ve como números, sino como gente que Dios ama y que necesita a Cristo.",
          },
          {
            caso: "Una joven del equipo te dice: Mis compañeros de clase no conocen a Cristo, pero eso no me preocupa; cada uno verá.",
            pregunta: "¿Qué le respondes con la lección?",
            opciones: [
              { texto: "Que Dios quiere que todos sean salvos; que empiece a orar por ellos.", bien: true, explica: "Como Pablo, el evangelista siente carga por los perdidos y ora por ellos, porque Dios quiere que todos sean salvos." },
              { texto: "Que tiene razón: si ellos no buscan a Dios, eso ya no es asunto suyo.", explica: "Dios quiere que todos los hombres sean salvos: por eso el evangelista siente carga por los perdidos." },
              { texto: "Que ore solo por los que ya van a la iglesia, porque son de los suyos.", explica: "Pablo pide que se ore «por todos los hombres», no solo por los que ya creen." },
              { texto: "Que no ore por ellos hasta que sienta algo muy especial en su corazón.", explica: "El evangelismo empieza de rodillas: se empieza orando por ellos cada día." },
            ],
            apoyo: "Como Pablo, el evangelista siente carga por los perdidos y ora por ellos, porque Dios quiere que todos sean salvos",
            ref: "1 Timoteo 2:1-4",
            explica: "Pablo oraba por la salvación de los suyos. El evangelista siente esa carga y ora por los perdidos, porque Dios quiere que todos sean salvos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se lleva una lista de oración, del primer paso al último.",
            pasos: [
              "Escribir los nombres de tres a cinco personas que no conocen a Cristo",
              "Orar cada día por esas personas, y también por uno mismo",
              "Aprovechar la oportunidad que Dios da de hablarles",
              "Anotar la oportunidad y cómo se respondió",
            ],
            apoyo: "Una lista corta de personas por las que se ora cada día es el primer paso",
            ref: "1 Timoteo 2:1-4",
            explica: "Primero se escriben de tres a cinco nombres; después se ora cada día por ellos y por uno mismo; cuando Dios da una oportunidad, se habla, y luego se anota cómo se respondió.",
          },
          {
            consigna: "Marta empieza su lista de oración. Ordena lo que hace, del primer paso al último.",
            pasos: [
              "Escribe los nombres de su vecina, de su primo y de dos compañeros",
              "Cada mañana ora por ellos, y también por ella misma",
              "El jueves su vecina le cuenta un problema, y Marta le habla de Cristo",
              "Esa noche anota la oportunidad y cómo respondió",
            ],
            apoyo: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona",
            explica: "Marta escribe los nombres, ora por ellos cada día y, cuando llega la oportunidad, habla y luego la anota. Antes de hablarle a alguien de Dios, se le habla a Dios de esa persona.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Escribe los nombres de tres a cinco personas que no conocen a Cristo",
            ref: "1 Timoteo 2:1-4",
            situacion: "Eres el líder del equipo de evangelismo de tu iglesia. Esta semana quieres que cada miembro empiece su lista de oración.",
            escenas: [
              {
                id: "e1",
                narra: "Reúnes al equipo para empezar.",
                pregunta: "¿Qué les pides primero?",
                opciones: [
                  { texto: "Que escriban de tres a cinco nombres de personas que no conocen a Cristo.", valor: 2, explica: "Así empieza la lista: con los nombres de tres a cinco personas que no conocen a Cristo.", siguiente: "e2" },
                  { texto: "Que oren por toda la ciudad en general, aunque no escriban ni un solo nombre.", valor: 1, explica: "Pablo pide orar «por todos los hombres», pero la lista empieza con personas con nombre: de tres a cinco.", siguiente: "e2" },
                  { texto: "Que salgan hoy mismo a hablar con la gente, sin orar antes por nadie en particular.", valor: 0, explica: "El evangelismo empieza de rodillas: antes de hablarle a alguien de Dios, háblale a Dios de esa persona.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Un joven vuelve desanimado: nadie lo quiso escuchar, y él no había orado por nadie.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Que empiece de rodillas: que escriba unos nombres y ore cada día por ellos.", valor: 2, explica: "El evangelismo empieza de rodillas: una lista corta de personas por las que se ora cada día es el primer paso.", siguiente: "e2" },
                  { texto: "Que mañana insista con más fuerza y por más tiempo, hasta que alguien lo escuche.", valor: 0, explica: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El equipo pregunta qué pedir cada día por las personas de su lista.",
                pregunta: "¿Qué les dices?",
                opciones: [
                  { texto: "Que Dios abra su corazón y les dé oportunidades de hablarles.", valor: 2, explica: "Ora por ellas cada día: que Dios abra su corazón y te dé oportunidades de hablarles." },
                  { texto: "Que Dios los bendiga mucho, sin pedir ocasiones para hablarles de Cristo.", valor: 1, explica: "Pedir bendición es bueno, pero también se pide que Dios abra su corazón y dé oportunidades de hablarles." },
                  { texto: "Que Dios los convenza él solo, para no tener que hablarles nunca de Cristo.", valor: 0, explica: "Se ora para que Dios dé oportunidades de hablarles, no para evitar hablarles." },
                ],
              },
              {
                id: "e3",
                narra: "Una semana después, una joven te cuenta que su vecina le habló de un problema y ella le habló de Cristo.",
                pregunta: "¿Qué le pides ahora?",
                opciones: [
                  { texto: "Que anote la oportunidad y cómo respondió, y siga orando por ella.", valor: 2, explica: "Anota las oportunidades que Dios te da y cómo respondiste, y sigue orando cada día." },
                  { texto: "Que se lo cuente a todo el equipo, aunque no lo anote en ninguna parte.", valor: 1, explica: "Contarlo anima al equipo, pero la lección pide anotar las oportunidades y cómo respondiste." },
                  { texto: "Que borre a su vecina de la lista, porque ya cumplió con hablarle.", valor: 0, explica: "Se sigue orando por ella cada día: la lista no se acaba porque hubo una oportunidad." },
                ],
              },
            ],
          },
          {
            apoyo: "Ora también por ti: amor, valentía y palabras sabias",
            ref: "1 Timoteo 2:1-4",
            situacion: "Acompañas a Julián, un hermano nuevo en el equipo de evangelismo. Quiere aprender a orar por los que no conocen a Cristo.",
            escenas: [
              {
                id: "e1",
                narra: "Julián te dice: Quiero orar por los perdidos, pero no sé por quién empezar.",
                pregunta: "¿Qué le propones?",
                opciones: [
                  { texto: "Que piense en tres a cinco personas que conoce y escriba sus nombres.", valor: 2, explica: "Escribe los nombres de tres a cinco personas que no conocen a Cristo: así se ora por personas con nombre.", siguiente: "e2" },
                  { texto: "Que ore por todos los perdidos del mundo, sin pensar en nadie en especial.", valor: 1, explica: "Pablo pide orar «por todos los hombres», pero la lista empieza con personas con nombre.", siguiente: "e2" },
                  { texto: "Que espere a sentirse listo para orar por otros, aunque pasen varios meses.", valor: 0, explica: "Una lista corta de personas por las que se ora cada día es el primer paso: se empieza ya.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasa un mes, y Julián todavía no ora por nadie en particular.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo ayudas a escribir su lista hoy, y oran juntos por esos nombres.", valor: 2, explica: "Antes de hablarle a alguien de Dios, háblale a Dios de esa persona: la lista empieza hoy.", siguiente: "e2" },
                  { texto: "Lo dejas tranquilo: algún día se va a sentir listo para empezar a orar.", valor: 0, explica: "El evangelismo empieza de rodillas: la lista corta de personas es el primer paso.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Julián ya tiene su lista y pregunta si también debe orar por él mismo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que sí: que pida amor, valentía y palabras sabias.", valor: 2, explica: "Ora también por ti: amor, valentía y palabras sabias." },
                  { texto: "Que sí, pero solo los días en que le toque salir a evangelizar.", valor: 1, explica: "Orar por sí mismo está bien, pero la lista se ora cada día." },
                  { texto: "Que no hace falta: la lista es solo para los que no creen.", valor: 0, explica: "La lección pide orar también por ti: amor, valentía y palabras sabias." },
                ],
              },
              {
                id: "e3",
                narra: "Julián te cuenta que un compañero le preguntó por qué está siempre en paz, y él le habló de Cristo.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que anote esa oportunidad y cómo respondió, y siga orando por él.", valor: 2, explica: "Anota las oportunidades que Dios te da y cómo respondiste." },
                  { texto: "Que siga orando por su compañero, aunque no anote nada de lo que pasó.", valor: 1, explica: "Seguir orando es bueno, pero también se anotan las oportunidades y cómo se respondió." },
                  { texto: "Que lo saque de la lista, porque ya le habló de Cristo una vez.", valor: 0, explica: "Por las personas de la lista se ora cada día: una conversación no termina la oración." },
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
            apoyo: "No evangelizaba por obligación ni por ganar discusiones, sino porque el amor de Cristo lo empujaba",
            ref: "2 Corintios 5:14",
            clave: {
              id: "pr-evangelismo-misiones-1-1-a7-1",
              tipo: "corta",
              pregunta: "Un compañero del equipo dice que evangeliza porque es su obligación y porque le gusta ganar discusiones. ¿Qué movía a Pablo, según 2 Corintios 5?",
              ideas: [
                { id: "amor", peso: 40, texto: "Lo movía el amor de Cristo, que lo empujaba: «Porque el amor de Cristo nos constriñe».", formas: ["amor de cristo", "amor (de|del) (dios|jesus|senor|jesucristo)", "constri*", "constre*", "(lo|le|nos|me|te) empuj*", "por amor", "el amor"] },
                { id: "obligacion", peso: 20, negativa: true, texto: "No evangelizaba por obligación ni por ganar discusiones.", formas: ["no por obligacion", "ni por obligacion", "nunca por obligacion", "no (era|es) (una|por) obligacion", "no (por|para) ganar", "ni (por|para) ganar", "sin (ganar|discutir)"] },
                { id: "embajador", peso: 40, texto: "Se veía como embajador en nombre de Cristo, que ruega: «Reconciliaos con Dios».", formas: ["embajador*", "enviado*", "en (nombre|lugar) de (cristo|dios|jesus)", "rog*", "rueg*", "reconcili*"] },
              ],
              errores: [
                { id: "deber", texto: "Pablo no evangelizaba por obligación ni por ganar discusiones: lo movía el amor de Cristo.", formas: ["por obligacion", "(para|por) ganar (discusiones|la discusion|las discusiones)", "(es|era) (su|una|mi) obligacion"], anula: "amor" },
              ],
              modelo: "A Pablo lo movía el amor de Cristo, que lo empujaba: el amor de Cristo nos constriñe. No evangelizaba por obligación ni por ganar discusiones. Se veía como embajador en nombre de Cristo, que ruega a las personas: reconciliaos con Dios.",
            },
          },
          {
            apoyo: "somos embajadores que ruegan en su nombre que las personas se reconcilien con Dios",
            ref: "2 Corintios 5:20",
            clave: {
              id: "pr-evangelismo-misiones-1-1-a7-2",
              tipo: "corta",
              pregunta: "Un joven del equipo te pregunta para qué evangelizar, si a mucha gente no le gusta oír de Dios. ¿Qué le respondes con lo que movía a Pablo?",
              ideas: [
                { id: "amor", peso: 50, texto: "Nos mueve el amor de Cristo, que nos empuja a hablar: «Porque el amor de Cristo nos constriñe».", formas: ["amor de cristo", "amor (de|del) (dios|jesus|senor|jesucristo)", "constri*", "constre*", "(lo|le|nos|me|te) empuj*", "por amor", "el amor"] },
                { id: "embajador", peso: 50, texto: "Somos embajadores en nombre de Cristo, que ruegan a las personas que se reconcilien con Dios.", formas: ["embajador*", "enviado*", "en (nombre|lugar) de (cristo|dios|jesus)", "rog*", "rueg*", "reconcili*"] },
              ],
              errores: [
                { id: "propio", texto: "El embajador no habla en su propio nombre: lleva el mensaje del que lo envió.", formas: ["en (mi|su|nuestro|tu) propio nombre"], anula: "embajador" },
              ],
              modelo: "Le diría que nos mueve el amor de Cristo, que nos empuja a hablar aunque a algunos no les guste. Somos embajadores en nombre de Cristo: llevamos su mensaje y rogamos a las personas que se reconcilien con Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El evangelio y sus distorsiones
    "evangelismo-misiones-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es el centro del evangelio?", reverso: "Cristo, su muerte por nuestros pecados y su resurrección.", apoyo: "El centro del evangelio es Cristo, su muerte por nuestros pecados y su resurrección" },
              { frente: "¿A qué llamó Jesús al anunciar el evangelio en Marcos 1:15?", reverso: "«arrepentíos, y creed en el evangelio».", apoyo: "Jesús llamó a responder: «arrepentíos, y creed en el evangelio»" },
              { frente: "¿Qué advirtió Pablo a los gálatas que algunos querían hacer?", reverso: "«pervertir el evangelio de Cristo».", apoyo: "Pablo advirtió a los gálatas que algunos querían «pervertir el evangelio de Cristo»" },
              { frente: "¿Qué pasa si se cambia el mensaje del evangelio?", reverso: "Se pierde: no hay otro evangelio.", apoyo: "No hay otro evangelio: cambiar el mensaje es perderlo" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué anuncia el evangelio, y a qué llama?", reverso: "Anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él.", apoyo: "El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él" },
              { frente: "¿Puede un mensaje usar palabras cristianas y no ser el evangelio?", reverso: "Sí: por eso el evangelista necesita tener muy claro lo que anuncia.", apoyo: "Un mensaje puede usar palabras cristianas y, aun así, no ser el evangelio" },
              { frente: "¿Qué distorsión presenta la salvación como premio por portarse bien?", reverso: "La de las obras: la salvación es por gracia, por medio de la fe.", apoyo: "Las obras: presentar la salvación como premio por portarse bien, cuando es por gracia, por medio de la fe (Efesios 2:8-9)" },
              { frente: "¿Qué hace un mensaje claro?", reverso: "Protege a la persona y honra a Cristo.", apoyo: "Un mensaje claro protege a la persona y honra a Cristo" },
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
            consigna: "Jesús llamó a responder al evangelio. ¿A qué dos cosas llamó? Toca las dos palabras.",
            texto: "[[arrepentíos]], y [[creed]] en el evangelio",
            apoyo: "El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él",
            ref: "Marcos 1:15",
            explica: "Jesús llamó: «arrepentíos, y creed en el evangelio». El evangelio llama a volverse del pecado y confiar en Cristo.",
          },
          {
            consigna: "Pablo resume lo que enseñó primero. ¿Qué tres cosas pasaron con Cristo? Toca las tres palabras.",
            texto: "Que Cristo [[murió]] por nuestros pecados, conforme a las Escrituras; y que fue [[sepultado]], y que [[resucitó]] al tercer día",
            apoyo: "El centro del evangelio es Cristo, su muerte por nuestros pecados y su resurrección",
            ref: "1 Corintios 15:3-4",
            explica: "Pablo resume: «Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día». Ese es el centro del evangelio.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada distorsión del evangelio con lo que hace.",
            pares: [
              ["Las obras", "Presenta la salvación como premio por portarse bien"],
              ["La prosperidad", "Promete dinero, salud o éxito seguros a cambio de la fe"],
              ["Un Jesús sin cruz", "Ofrece una vida mejor sin hablar del pecado ni del arrepentimiento"],
              ["Una oración sin cambio", "Da por salvo a alguien solo porque repitió unas palabras"],
            ],
            apoyo: "las obras, la prosperidad, un Jesús sin cruz o una oración sin arrepentimiento lo distorsionan",
            ref: "Gálatas 1:6-7",
            explica: "Las obras presentan la salvación como premio; la prosperidad promete dinero, salud o éxito seguros; un Jesús sin cruz calla el pecado, el arrepentimiento y la cruz; y una oración sin cambio da por salvo a alguien solo porque repitió unas palabras.",
          },
          {
            consigna: "¿Qué distorsión del evangelio hay en cada frase? Une cada frase con su distorsión.",
            pares: [
              ["Si te portas bien, Dios te dará la salvación de premio", "Las obras"],
              ["Da una ofrenda y tendrás éxito seguro este año", "La prosperidad"],
              ["Ven a Jesús y tendrás una vida mejor; del pecado no hablemos", "Un Jesús sin cruz"],
              ["Ya repetiste las palabras: eres salvo, aunque nada cambie", "Una oración sin cambio"],
            ],
            apoyo: "Un mensaje puede usar palabras cristianas y, aun así, no ser el evangelio",
            ref: "Gálatas 1:6-7",
            explica: "Cada frase usa palabras cristianas, pero distorsiona el evangelio: la salvación es por gracia, por medio de la fe; no se prometen dinero ni éxito seguros; no se calla el pecado ni la cruz, y salva Cristo, por medio de una fe que se arrepiente.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Un mensaje claro protege a la persona y honra a Cristo",
            ref: "Gálatas 1:6-7",
            titulo: "El folleto de la campaña",
            relato: [
              "Eres parte del equipo de evangelismo de tu iglesia, y el sábado harán una campaña en el parque. Un hermano nuevo preparó el folleto que van a repartir.",
              "El folleto dice: Da una ofrenda y Dios te dará salud y dinero seguros. Repite esta oración y ya eres salvo para siempre; no hace falta nada más.",
              "El líder del equipo te pide revisarlo antes de imprimir cien copias.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué distorsión hay en la primera frase del folleto?",
                opciones: [
                  { texto: "La prosperidad: promete salud y dinero seguros a cambio de una ofrenda.", bien: true, explica: "Prometer dinero, salud o éxito seguros a cambio de la fe o de una ofrenda distorsiona el evangelio." },
                  { texto: "Las obras: presenta la salvación como un premio por portarse bien siempre.", explica: "La frase no habla de portarse bien: promete salud y dinero seguros a cambio de una ofrenda." },
                  { texto: "Ninguna: si la persona da su ofrenda con fe, Dios le dará salud y dinero.", explica: "Prometer salud y dinero seguros a cambio de una ofrenda es la distorsión de la prosperidad." },
                ],
                apoyo: "La prosperidad: prometer dinero, salud o éxito seguros a cambio de la fe o de una ofrenda",
                explica: "La primera frase promete salud y dinero seguros a cambio de una ofrenda: es la distorsión de la prosperidad.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué distorsión hay en la segunda frase?",
                opciones: [
                  { texto: "Una oración sin cambio: da por salvo a alguien solo por repetir palabras.", bien: true, explica: "La oración expresa la fe, pero salva Cristo, por medio de una fe que se arrepiente." },
                  { texto: "Las obras: dice que la salvación se gana con esfuerzo, portándose bien toda la vida.", explica: "La frase no habla de obras: da por salvo a alguien solo porque repitió unas palabras." },
                  { texto: "Ninguna: repetir esa oración una vez ya basta para ser salvo para siempre.", explica: "Dar por salvo a alguien solo porque repitió unas palabras es una oración sin cambio." },
                ],
                apoyo: "Una oración sin cambio: dar por salvo a alguien solo porque repitió unas palabras",
                explica: "La oración expresa la fe, pero salva Cristo, por medio de una fe que se arrepiente.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué debe anunciar el folleto, en vez de eso?",
                opciones: [
                  { texto: "Que Cristo murió por nuestros pecados y resucitó, y llama a arrepentirse y creer.", bien: true, explica: "Ese es el evangelio: Cristo murió por nuestros pecados y resucitó, y llama a arrepentirse y creer." },
                  { texto: "Que Jesús te dará una vida mejor, sin hablar del pecado para no asustar a la gente.", explica: "Ofrecer una vida mejor sin hablar del pecado, del arrepentimiento ni de la cruz es un Jesús sin cruz." },
                  { texto: "Que quien se porte bien y vaya a la iglesia ganará la salvación como premio seguro.", explica: "Presentar la salvación como premio por portarse bien es la distorsión de las obras: es por gracia, por medio de la fe." },
                ],
                apoyo: "El evangelio es Cristo, que murió por nuestros pecados y resucitó, y llama a arrepentirse y creer",
                explica: "Ese es el evangelio: Cristo murió por nuestros pecados y resucitó, y llama a arrepentirse y creer. No hay otro evangelio.",
              },
              {
                tipo: "explica",
                apoyo: "No hay otro evangelio: cambiar el mensaje es perderlo",
                clave: {
                  id: "pr-evangelismo-misiones-1-2-a4-1",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías al hermano que preparó el folleto, para que entienda por qué hay que cambiarlo?",
                  ideas: [
                    { id: "otro", peso: 40, texto: "Que no hay otro evangelio: cambiar el mensaje es perderlo.", formas: ["no hay otro evangelio", "otro evangelio", "cambiar el mensaje", "perder* (el|su) (mensaje|evangelio)", "es perderlo", "pervert*", "distorsion*"] },
                    { id: "mensaje", peso: 40, texto: "Que el evangelio es Cristo, que murió por nuestros pecados y resucitó, y llama a arrepentirse y creer.", formas: ["murio", "muerte", "cruz", "resucit*", "arrepent*", "arrepient*"] },
                    { id: "claro", peso: 20, texto: "Que un mensaje claro protege a la persona y honra a Cristo.", formas: ["proteg*", "honra*", "mensaje claro", "claridad"] },
                  ],
                  modelo: "Le diría que no hay otro evangelio: cambiar el mensaje es perderlo. El evangelio es Cristo, que murió por nuestros pecados y resucitó, y llama a arrepentirse y creer. Además, un mensaje claro protege a la persona y honra a Cristo.",
                },
              },
            ],
          },
          {
            apoyo: "Un mensaje puede usar palabras cristianas y, aun así, no ser el evangelio",
            ref: "Gálatas 1:6-7",
            titulo: "Un mensaje para la plaza",
            relato: [
              "Tu iglesia te pidió coordinar la predicación al aire libre en la plaza del barrio. Un joven del equipo te pasa el mensaje corto que piensa decir.",
              "El mensaje dice: Dios quiere que te vaya bien. Si te portas bien y vienes a la iglesia, él te dará el cielo como premio. Para no asustar a nadie, no voy a hablar del pecado ni de la cruz.",
              "Antes del sábado, te sientas a revisarlo con él.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué distorsión hay en la frase del cielo como premio?",
                opciones: [
                  { texto: "La de las obras: la salvación es por gracia, por medio de la fe.", bien: true, explica: "Presentar la salvación como premio por portarse bien es la distorsión de las obras: es por gracia, por medio de la fe (Efesios 2:8-9)." },
                  { texto: "La de la prosperidad: promete dinero o éxito seguros por una ofrenda.", explica: "La frase no habla de dinero ni de ofrendas: presenta la salvación como premio por portarse bien." },
                  { texto: "Ninguna: es bueno decir que Dios premia con el cielo a los que se portan bien.", explica: "La salvación no es un premio por portarse bien: es por gracia, por medio de la fe." },
                ],
                apoyo: "Las obras: presentar la salvación como premio por portarse bien, cuando es por gracia, por medio de la fe (Efesios 2:8-9)",
                explica: "El cielo como premio por portarse bien es la distorsión de las obras: la salvación es por gracia, por medio de la fe.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué distorsión hay en no hablar del pecado ni de la cruz?",
                opciones: [
                  { texto: "Un Jesús sin cruz: ofrece una vida mejor y calla el pecado y la cruz.", bien: true, explica: "Ofrecer una vida mejor sin hablar del pecado, del arrepentimiento ni de la cruz es un Jesús sin cruz." },
                  { texto: "Una oración sin cambio: da por salvo a alguien que solo repitió palabras.", explica: "El mensaje no pide repetir una oración: lo que hace es callar el pecado y la cruz." },
                  { texto: "Ninguna: el pecado y la cruz se pueden dejar para otro día, en la iglesia.", explica: "Callar el pecado, el arrepentimiento y la cruz es un Jesús sin cruz: así el mensaje deja de ser el evangelio." },
                ],
                apoyo: "Un Jesús sin cruz: ofrecer una vida mejor sin hablar del pecado, del arrepentimiento ni de la cruz",
                explica: "Ofrecer una vida mejor sin hablar del pecado, del arrepentimiento ni de la cruz es un Jesús sin cruz.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le pides que anuncie, entonces?",
                opciones: [
                  { texto: "Lo que Dios hizo en Cristo, y el llamado a arrepentirse y creer.", bien: true, explica: "El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él." },
                  { texto: "Una vida mejor con Dios, y que la cruz la explique otro día en la iglesia.", explica: "Sin el pecado, el arrepentimiento y la cruz, el mensaje es un Jesús sin cruz." },
                  { texto: "Que se porten bien desde hoy, para que Dios les dé el cielo como premio.", explica: "La salvación no es premio por portarse bien: es por gracia, por medio de la fe." },
                ],
                apoyo: "El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él",
                explica: "El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él.",
              },
              {
                tipo: "explica",
                apoyo: "Jesús llamó a responder: «arrepentíos, y creed en el evangelio»",
                clave: {
                  id: "pr-evangelismo-misiones-1-2-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en dos o tres frases el mensaje corto que podría decir el joven en la plaza, sin distorsionar el evangelio.",
                  ideas: [
                    { id: "cristo", peso: 50, texto: "Que Cristo murió por nuestros pecados y resucitó al tercer día.", formas: ["murio", "muerte", "cruz", "resucit*", "tercer dia", "sepult*"] },
                    { id: "llamado", peso: 50, texto: "Que Jesús llama a arrepentirse y creer: a volverse del pecado y confiar en él.", formas: ["arrepent*", "arrepient*", "arrepint*", "(creer|creed|crean|cree|creas|creen)", "confi*", "volver* del pecado", "vuelvete", "vuelvanse"] },
                  ],
                  errores: [
                    { id: "premio", texto: "La salvación no es premio por portarse bien: es por gracia, por medio de la fe.", formas: ["si te portas bien", "(cielo|salvacion) (como|de) premio", "(ganar|ganas|gana|ganan) (el|la) (cielo|salvacion)"], anula: "llamado" },
                  ],
                  modelo: "Cristo murió por nuestros pecados, fue sepultado y resucitó al tercer día. Por eso hoy Jesús te llama: arrepiéntete y cree en el evangelio. Vuélvete del pecado y confía en él.",
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
            consigna: "Completa a qué invita un evangelismo fiel.",
            texto: "Un evangelismo fiel invita a [[seguir]] a Cristo, [[cargando]] su [[cruz]].",
            distractores: ["aplaudir", "olvidando", "orgullo"],
            errores: {
              aplaudir: "Un evangelismo fiel invita a seguir a Cristo, no solo a levantar la mano.",
              olvidando: "El discípulo lleva su cruz y viene en pos de Cristo.",
              orgullo: "Jesús habló de llevar la cruz: «el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo».",
            },
            apoyo: "Un evangelismo fiel invita a seguir a Cristo, cargando su cruz",
            ref: "Lucas 14:27",
            explica: "Jesús fue honesto con las multitudes: «el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo». Por eso se invita a seguir a Cristo, y no solo a tomar una decisión.",
          },
          {
            consigna: "Completa lo que Jesús les dijo con honestidad a las multitudes.",
            texto: "Jesús fue [[honesto]] con las multitudes: para ser su [[discípulo]], hay que llevar la cruz y [[venir]] en pos de él.",
            distractores: ["ambiguo", "enemigo", "huir"],
            errores: {
              ambiguo: "Jesús fue honesto: dijo con claridad lo que pide ser su discípulo.",
              enemigo: "Jesús habló de lo que pide ser su discípulo.",
              huir: "El discípulo viene en pos de Cristo, llevando su cruz.",
            },
            apoyo: "Jesús fue honesto con las multitudes",
            ref: "Lucas 14:27",
            explica: "Jesús dijo: «el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo». Un evangelismo fiel invita a seguir a Cristo, no solo a levantar la mano.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la invitación del evangelio tiene un error. Tócala.",
            frases: [
              "Jesús fue honesto con las multitudes.",
              "Un evangelismo fiel invita a seguir a Cristo.",
              "Levantar la mano ya basta para ser discípulo de Cristo.",
              "El discípulo lleva su cruz y viene en pos de Cristo.",
            ],
            malo: 2,
            correccion: "Un evangelismo fiel invita a seguir a Cristo, no solo a levantar la mano.",
            apoyo: "Un evangelismo fiel invita a seguir a Cristo, no solo a levantar la mano",
            ref: "Lucas 14:27",
            explica: "Levantar la mano no basta: «el que no lleva su cruz y viene en pos de mí, no puede ser mi discípulo».",
          },
          {
            consigna: "Una de estas frases sobre la oración y la salvación tiene un error. Tócala.",
            frases: [
              "La oración expresa la fe.",
              "Salva Cristo, por medio de una fe que se arrepiente.",
              "Quien repitió unas palabras ya es salvo, aunque nada cambie.",
              "El evangelio llama a seguir a Cristo, no solo a tomar una decisión.",
            ],
            malo: 2,
            correccion: "Dar por salvo a alguien solo porque repitió unas palabras distorsiona el evangelio: salva Cristo, por medio de una fe que se arrepiente.",
            apoyo: "La oración expresa la fe, pero salva Cristo, por medio de una fe que se arrepiente",
            explica: "La oración expresa la fe, pero salva Cristo, por medio de una fe que se arrepiente. Dar por salvo a alguien solo porque repitió unas palabras es una oración sin cambio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El evangelio es Cristo, que murió por nuestros pecados y resucitó, y llama a arrepentirse y creer",
            ref: "1 Corintios 15:3-4",
            clave: {
              id: "pr-evangelismo-misiones-1-2-a7-1",
              tipo: "corta",
              pregunta: "Con 1 Corintios 15:3-4 y Marcos 1:15, resume el evangelio: ¿qué anuncia y a qué llama?",
              ideas: [
                { id: "anuncia", peso: 50, texto: "Anuncia lo que Dios hizo en Cristo: murió por nuestros pecados, fue sepultado y resucitó al tercer día.", formas: ["murio", "muerte", "cruz", "resucit*", "sepult*", "tercer dia"] },
                { id: "llama", peso: 50, texto: "Llama a arrepentirse y creer: a volverse del pecado y confiar en él.", formas: ["arrepent*", "arrepient*", "arrepint*", "(creer|creed|crean|cree|creas|creen|creamos)", "confi*", "volver* del pecado"] },
              ],
              errores: [
                { id: "premio", texto: "La salvación no es premio por portarse bien: es por gracia, por medio de la fe.", formas: ["premio por portar*", "(ganar|gana|ganamos|ganan) la salvacion", "salv* por (las|nuestras|buenas) obras"], anula: "llama" },
              ],
              modelo: "El evangelio anuncia lo que Dios hizo en Cristo: murió por nuestros pecados, fue sepultado y resucitó al tercer día. Y llama a responder: arrepentíos y creed en el evangelio, es decir, volverse del pecado y confiar en él.",
            },
          },
          {
            apoyo: "El evangelio anuncia lo que Dios hizo en Cristo y llama a volverse del pecado y confiar en él",
            ref: "Marcos 1:15",
            clave: {
              id: "pr-evangelismo-misiones-1-2-a7-2",
              tipo: "corta",
              pregunta: "Una vecina te dice que el evangelio es ser buena persona y ayudar a los demás. ¿Qué le explicas, según 1 Corintios 15:3-4 y Marcos 1:15?",
              ideas: [
                { id: "cristo", peso: 50, texto: "Que el evangelio anuncia lo que Dios hizo en Cristo: murió por nuestros pecados y resucitó.", formas: ["murio", "muerte", "cruz", "resucit*", "sepult*", "tercer dia", "lo que dios hizo"] },
                { id: "responder", peso: 50, texto: "Y que llama a arrepentirse y creer: a volverse del pecado y confiar en Cristo.", formas: ["arrepent*", "arrepient*", "arrepint*", "(creer|creed|crean|cree|creas|creen|creamos)", "confi*", "volver* del pecado"] },
              ],
              errores: [
                { id: "buena", texto: "El evangelio no es ser buena persona: anuncia lo que Dios hizo en Cristo.", formas: ["(es|sea) ser (buena|buenas|buenos) (persona|personas|gente)", "(es|sea) ayudar a los demas"], anula: "cristo" },
              ],
              modelo: "Le explico que el evangelio no es ser buena persona, sino lo que Dios hizo en Cristo: murió por nuestros pecados, fue sepultado y resucitó al tercer día. Y Jesús nos llama a arrepentirnos y a creer en el evangelio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Hablar según la persona
    "evangelismo-misiones-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿De qué partió Pablo con los judíos de Tesalónica?", reverso: "De las Escrituras, que ellos conocían.", apoyo: "con los que conocían las Escrituras partía de ellas" },
              { frente: "¿Qué les declaraba Pablo por medio de las Escrituras?", reverso: "«que era necesario que el Cristo padeciese, y resucitase de los muertos».", apoyo: "Pablo fue «declarando y exponiendo por medio de las Escrituras, que era necesario que el Cristo padeciese, y resucitase de los muertos»" },
              { frente: "En Atenas, ante los que no conocían la Biblia, ¿por dónde empezó Pablo?", reverso: "Por algo que veían cada día: un altar «AL DIOS NO CONOCIDO».", apoyo: "empezó por algo que ellos veían cada día: un altar «AL DIOS NO CONOCIDO»" },
              { frente: "Según la persona, ¿qué cambiaba Pablo y qué no cambiaba?", reverso: "Cambiaba el punto de partida, pero no el mensaje.", apoyo: "Pablo cambiaba el punto de partida, pero no el mensaje" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Con quiénes habló Pablo en la sinagoga de Tesalónica?", reverso: "Con judíos que conocían las Escrituras.", apoyo: "Con los judíos de Tesalónica, que conocían las Escrituras" },
              { frente: "¿Ante quiénes habló Pablo en el Areópago de Atenas?", reverso: "Ante personas que no conocían la Biblia.", apoyo: "En Atenas, ante personas que no conocían la Biblia" },
              { frente: "¿Qué dice Pablo que se hizo, para salvar a algunos?", reverso: "«a todos me he hecho de todo»: se acercaba a cada grupo para ganarlo.", apoyo: "Pablo lo explica así: «a todos me he hecho de todo, para que de todos modos salve a algunos»" },
              { frente: "Al hablar según la persona, ¿qué se adapta?", reverso: "El lenguaje, los ejemplos y el punto de partida; el evangelio no cambia.", apoyo: "Se adaptan el lenguaje, los ejemplos y el punto de partida; el evangelio no cambia" },
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
            consigna: "¿Pasó en la sinagoga de Tesalónica, en el Areópago de Atenas o en los dos lugares? Lleva cada frase a su grupo.",
            grupos: ["En la sinagoga de Tesalónica", "En el Areópago de Atenas", "En los dos lugares"],
            frases: [
              { texto: "Pablo les habló a judíos que conocían las Escrituras", grupo: 0 },
              { texto: "Partió de las Escrituras para hablar del Cristo", grupo: 0 },
              { texto: "Pablo les habló a personas que no conocían la Biblia", grupo: 1 },
              { texto: "Empezó por un altar que la gente veía cada día", grupo: 1 },
              { texto: "Desde el altar, les anunció al Dios creador", grupo: 1 },
              { texto: "Anunció que Cristo resucitó de los muertos", grupo: 2, explica: "Lo hizo en los dos lugares: en Tesalónica, por las Escrituras; en el Areópago, desde el altar." },
              { texto: "Pablo no cambió el mensaje del evangelio", grupo: 2 },
            ],
            apoyo: "Pablo cambiaba el punto de partida según la persona",
            ref: "Hechos 17:2-3, 22-23",
            explica: "En la sinagoga de Tesalónica partió de las Escrituras, con judíos que las conocían; en el Areópago de Atenas partió de un altar que veían cada día, ante personas que no conocían la Biblia. En los dos lugares anunció a Cristo resucitado: cambió el punto de partida, no el mensaje.",
          },
          {
            consigna: "¿Pablo partió de las Escrituras o de algo que la gente veía cada día? Lleva cada frase a su grupo.",
            grupos: ["Partió de las Escrituras", "Partió de lo que veían cada día"],
            frases: [
              { texto: "Con los judíos de Tesalónica", grupo: 0 },
              { texto: "Con quienes ya conocían las Escrituras", grupo: 0 },
              { texto: "Al mostrar que el Cristo debía padecer y resucitar", grupo: 0, explica: "En Tesalónica lo declaraba y exponía por medio de las Escrituras." },
              { texto: "En el Areópago de Atenas", grupo: 1 },
              { texto: "Ante personas que nunca abrieron la Biblia", grupo: 1 },
              { texto: "Ante el altar al Dios no conocido", grupo: 1 },
            ],
            apoyo: "con los que conocían las Escrituras partía de ellas, y en Atenas partió de un altar al Dios no conocido",
            ref: "Hechos 17:2-3, 22-23",
            explica: "Con los que conocían las Escrituras, Pablo partía de ellas; en el Areópago de Atenas, ante personas que no conocían la Biblia, partió de un altar que veían cada día.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué se adapta al hablar según la persona.",
            texto: "Se adaptan el [[lenguaje]], los [[ejemplos]] y el punto de [[partida]]; el evangelio no cambia.",
            distractores: ["mensaje", "pecados", "llegada"],
            errores: {
              mensaje: "El mensaje no se adapta: el evangelio no cambia.",
              pecados: "Adaptarse no es callar el pecado ni la cruz.",
              llegada: "Se adapta el punto de partida; la conversación siempre se lleva a Cristo.",
            },
            apoyo: "Se adaptan el lenguaje, los ejemplos y el punto de partida; el evangelio no cambia",
            ref: "1 Corintios 9:22",
            explica: "Pablo dice: «a todos me he hecho de todo, para que de todos modos salve a algunos». Se adaptan el lenguaje, los ejemplos y el punto de partida, pero el evangelio no cambia.",
          },
          {
            consigna: "Completa cómo se acercaba Pablo a cada grupo sin cambiar el mensaje.",
            texto: "Pablo se acercaba a cada [[grupo]] para [[ganarlo]], pero siempre anunció a [[Cristo]] crucificado y resucitado.",
            distractores: ["ídolo", "juzgarlo", "Moisés"],
            errores: {
              "ídolo": "Pablo se acercaba a cada grupo de personas para ganarlo.",
              juzgarlo: "Pablo se hizo de todo para que de todos modos salvara a algunos: se acercaba para ganarlos.",
              "Moisés": "Pablo siempre anunció a Cristo crucificado y resucitado (1 Corintios 2:2).",
            },
            apoyo: "Pablo se acercaba a cada grupo para ganarlo, pero siempre anunció a Cristo crucificado y resucitado",
            ref: "1 Corintios 2:2",
            explica: "Adaptarse no es callar el pecado ni la cruz: Pablo se acercaba a cada grupo para ganarlo, pero siempre anunció a Cristo crucificado y resucitado.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Adaptarse no es callar el pecado ni la cruz",
            ref: "1 Corintios 9:22",
            situacion: "Tu equipo de evangelismo va a visitar un parque donde se reúnen jóvenes que nunca abrieron la Biblia. Te toca preparar cómo les van a hablar.",
            escenas: [
              {
                id: "e1",
                narra: "El equipo piensa por dónde empezar la conversación.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Empezar por algo que ellos viven cada día, y desde ahí llegar a Cristo.", valor: 2, explica: "Así hizo Pablo en Atenas: empezó por algo que veían cada día y desde allí les anunció a Cristo resucitado.", siguiente: "e2" },
                  { texto: "Empezar leyéndoles un capítulo entero de la Biblia, como se hace en el culto.", valor: 1, explica: "Partir de las Escrituras sirvió con quienes las conocían; con quien nunca abrió la Biblia, Pablo partió de algo que veía cada día.", siguiente: "e2" },
                  { texto: "Dejar a Cristo para otro día y hablar solo de lo que a ellos más les gusta.", valor: 0, explica: "Se adapta el punto de partida, pero el evangelio no cambia: siempre se anuncia a Cristo.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Un joven del equipo insiste: Si hablamos de Cristo, se van a ir.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que se adapta el punto de partida, pero siempre se llega a Cristo.", valor: 2, explica: "Pablo se acercaba a cada grupo para ganarlo, pero siempre anunció a Cristo crucificado y resucitado.", siguiente: "e2" },
                  { texto: "Que tiene razón, y que esta vez mejor no mencionen a Cristo en toda la tarde.", valor: 0, explica: "Adaptarse no es callar el pecado ni la cruz: el evangelio no cambia.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Ya conversan con un grupo, y uno de los jóvenes pregunta qué piensan ustedes del pecado.",
                pregunta: "¿Cómo le responden?",
                opciones: [
                  { texto: "Con palabras sencillas, sin callar el pecado ni la cruz.", valor: 2, explica: "Se adapta el lenguaje, pero adaptarse no es callar el pecado ni la cruz." },
                  { texto: "Con palabras difíciles de la iglesia, aunque no las entiendan bien.", valor: 1, explica: "No callan la verdad, pero el lenguaje también se adapta a quien escucha." },
                  { texto: "Cambiando de tema enseguida, para que nadie se sienta incómodo.", valor: 0, explica: "Adaptarse no es callar el pecado ni la cruz." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, uno de los jóvenes dice que quiere saber más.",
                pregunta: "¿Qué le anuncian?",
                opciones: [
                  { texto: "A Cristo crucificado y resucitado, con palabras que entienda.", valor: 2, explica: "El evangelio no cambia: Pablo siempre anunció a Cristo crucificado y resucitado." },
                  { texto: "Un mensaje distinto, hecho a su medida, sin cruz y sin pecado.", valor: 0, explica: "Cambiar el mensaje no es adaptarse: el evangelio no cambia." },
                  { texto: "Que vaya a la iglesia el domingo, sin hablarle hoy de Cristo.", valor: 1, explica: "Invitarlo es bueno, pero hoy ya se le puede anunciar a Cristo con palabras que entienda." },
                ],
              },
            ],
          },
          {
            apoyo: "Se hizo de todo para salvar a algunos, pero nunca cambió el mensaje",
            ref: "1 Corintios 9:22",
            situacion: "Te invitaron a compartir el evangelio en una reunión de vecinos. Hay personas que crecieron en la iglesia, otras de otra religión y algunas que dudan de todo.",
            escenas: [
              {
                id: "e1",
                narra: "Antes de hablar, piensas cómo empezar.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Escuchas la historia de algunos de ellos antes de hablar.", valor: 2, explica: "El evangelista escucha primero la historia de cada persona: escuchar bien es la mitad de una buena conversación sobre Cristo.", siguiente: "e2" },
                  { texto: "Preparas un buen mensaje, pero el mismo para todos, sin preguntarles nada.", valor: 1, explica: "Un buen mensaje ayuda, pero se adaptan el lenguaje, los ejemplos y el punto de partida a cada persona.", siguiente: "e2" },
                  { texto: "Hablas una hora sin parar, para que nadie te haga preguntas difíciles.", valor: 0, explica: "Escuchar bien es la mitad de una buena conversación sobre Cristo.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Al terminar, nadie dice nada, y un vecino te pregunta si alguna vez escuchas a la gente.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides disculpas y escuchas su historia con atención.", valor: 2, explica: "El evangelista escucha primero la historia de cada persona.", siguiente: "e2" },
                  { texto: "Le dices que tú viniste a hablar, no a escuchar a nadie esta noche.", valor: 0, explica: "Escuchar bien es la mitad de una buena conversación sobre Cristo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Una vecina de otra religión te dice que ella también cree en Dios.",
                pregunta: "¿Cómo sigues la conversación?",
                opciones: [
                  { texto: "Partes con respeto de lo que comparten y llevas la charla a Cristo.", valor: 2, explica: "Con quien tiene otra religión: con respeto, partir de lo que comparten y llevar la conversación a Cristo." },
                  { texto: "Partes de lo que comparten, pero no llegas a hablarle de Cristo nunca.", valor: 1, explica: "Partir de lo que comparten está bien, pero la conversación se lleva a Cristo: el mensaje no cambia." },
                  { texto: "Te burlas un poco de su religión, para que ella vea su error.", valor: 0, explica: "Con quien tiene otra religión se habla con respeto, sin burlas ni ataques." },
                ],
              },
              {
                id: "e3",
                narra: "Un vecino que creció en la iglesia dice que él ya sabe todo eso.",
                pregunta: "¿Qué le muestras?",
                opciones: [
                  { texto: "Que necesita la gracia de Cristo, y no solo la religión.", valor: 2, explica: "Quien creció en la iglesia puede saber mucho, pero necesita la gracia de Cristo y no solo la religión." },
                  { texto: "Que con saber tanto de la Biblia ya está bien con Dios para siempre.", valor: 0, explica: "Saber mucho no basta: necesita la gracia de Cristo y no solo la religión." },
                  { texto: "Que vuelva a la iglesia, aunque no le hables de la gracia.", valor: 1, explica: "Volver a la iglesia es bueno, pero lo que necesita es la gracia de Cristo y no solo la religión." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada persona con lo que necesita al hablarle de Cristo.",
            pares: [
              ["Quien creció en la iglesia", "La gracia de Cristo, y no solo la religión"],
              ["Quien tiene otra religión", "Partir con respeto de lo que comparten y llevar la charla a Cristo"],
              ["Quien duda o no cree", "Que escuchen sus preguntas y le ofrezcan leer juntos un evangelio"],
              ["Quien fue herido en una iglesia", "Que reconozcan el daño y le muestren que Cristo es distinto"],
            ],
            apoyo: "Por eso el evangelista escucha primero la historia de cada persona",
            explica: "Quien creció en la iglesia necesita la gracia y no solo la religión; con quien tiene otra religión se parte con respeto de lo que comparten; a quien duda se le escuchan sus preguntas y se le ofrece leer un evangelio; y a quien fue herido se le reconoce el daño.",
          },
          {
            consigna: "¿Qué conviene hacer con cada persona? Une cada caso con lo que conviene hacer.",
            pares: [
              ["Tu compañero dice que Dios no existe y tiene muchas preguntas", "Escuchar sus preguntas y ofrecerle leer juntos un evangelio"],
              ["Tu vecina dice que en una iglesia la trataron muy mal", "Reconocer el daño que vivió y mostrarle que Cristo es distinto"],
              ["Tu primo va a la iglesia desde niño y cree que con eso basta", "Mostrarle que necesita la gracia de Cristo, no solo la religión"],
              ["Tu amigo practica otra religión con mucha devoción", "Partir con respeto de lo que comparten, sin burlas ni ataques"],
            ],
            apoyo: "Escuchar bien es la mitad de una buena conversación sobre Cristo",
            explica: "Cada persona tiene su historia: a quien duda se le escuchan sus preguntas; a quien fue herido se le reconoce el daño; a quien creció en la iglesia se le muestra la gracia; y con quien tiene otra religión se parte con respeto de lo que comparten.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una vecina te dice: En la iglesia donde estaba me trataron muy mal; no quiero saber nada de Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Siento lo que viviste. Cristo es distinto de los errores de los creyentes.", bien: true, explica: "Quien fue herido en una iglesia necesita que reconozcas el daño que vivió y que le muestres que Cristo es distinto de los errores de los creyentes." },
              { texto: "Eso ya pasó y no importa: lo que tienes que hacer es volver a la iglesia el domingo.", explica: "Primero hay que reconocer el daño que vivió: apurarla a volver no la ayuda." },
              { texto: "Seguro que tú también tuviste algo de culpa; nadie trata mal a otro porque sí.", explica: "Culparla no reconoce el daño que vivió." },
              { texto: "Esa iglesia era falsa; en la mía eso nunca le pasa a nadie, te lo aseguro.", explica: "No se trata de defender una iglesia: hay que mostrarle que Cristo es distinto de los errores de los creyentes." },
            ],
            apoyo: "Quien fue herido en una iglesia: reconocer el daño que vivió y mostrar que Cristo es distinto de los errores de los creyentes",
            explica: "Escuchar antes de hablar: con quien fue herido en una iglesia se reconoce el daño que vivió y se le muestra que Cristo es distinto de los errores de los creyentes.",
          },
          {
            caso: "Un compañero de trabajo te dice: Yo no creo en nada, pero tengo muchas preguntas. ¿Tú de verdad crees que la Biblia dice la verdad?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Me alegra que preguntes. ¿Quieres que leamos juntos un evangelio?", bien: true, explica: "Con quien duda o no cree: escuchar sus preguntas, responder con honestidad y ofrecer leer juntos un evangelio." },
              { texto: "Si no crees en nada, la verdad es que no tiene sentido que hablemos de esto.", explica: "Sus preguntas son una puerta: se escuchan y se responden con honestidad." },
              { texto: "La Biblia no se discute: tienes que creer sin hacer ninguna pregunta.", explica: "Con quien duda se escuchan sus preguntas y se responde con honestidad." },
              { texto: "Ven al culto el domingo, y el pastor te responderá todo lo que preguntes.", explica: "Invitarlo puede servir, pero primero se escuchan sus preguntas y se le ofrece leer juntos un evangelio." },
            ],
            apoyo: "Quien duda o no cree: escuchar sus preguntas, responder con honestidad y ofrecer leer juntos un evangelio",
            explica: "Con quien duda o no cree se escuchan sus preguntas, se responde con honestidad y se le ofrece leer juntos un evangelio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Por eso el evangelista escucha primero la historia de cada persona",
            ref: "1 Corintios 9:22",
            clave: {
              id: "pr-evangelismo-misiones-1-3-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué el evangelista escucha antes de hablar, y qué cambia y qué no cambia al adaptarse a cada persona?",
              ideas: [
                { id: "historia", peso: 30, texto: "Porque cada persona tiene su historia: escuchar bien es la mitad de una buena conversación sobre Cristo.", formas: ["su historia", "la historia", "cada persona", "la mitad", "distint*", "sus preguntas"] },
                { id: "adapta", peso: 35, texto: "Cambian el lenguaje, los ejemplos y el punto de partida.", formas: ["lenguaje", "ejemplo*", "punto de partida", "las palabras"] },
                { id: "mensaje", peso: 35, negativa: true, texto: "El evangelio no cambia: no se calla el pecado ni la cruz.", formas: ["(evangelio|mensaje) no cambia", "(evangelio|mensaje) nunca cambia", "no cambia el (mensaje|evangelio)", "(sin|no) (cambiar|cambia|cambiamos) (el|su) (mensaje|evangelio)", "(mismo|igual) (mensaje|evangelio)", "no se calla el pecado", "no (calla|callar|callamos) el pecado", "sin callar el pecado"] },
              ],
              errores: [
                { id: "cambiar", texto: "Se adapta el punto de partida, pero el evangelio no cambia.", formas: ["(cambia|cambiar|cambiamos|cambian|adapta|adaptar|adaptamos|adaptan) el (mensaje|evangelio)", "callar el pecado"], anula: "mensaje" },
              ],
              modelo: "Porque cada persona tiene su historia, y escuchar bien es la mitad de una buena conversación sobre Cristo. Al adaptarse cambian el lenguaje, los ejemplos y el punto de partida, pero el evangelio no cambia: no se calla el pecado ni la cruz.",
            },
          },
          {
            apoyo: "Escuchar bien es la mitad de una buena conversación sobre Cristo",
            clave: {
              id: "pr-evangelismo-misiones-1-3-a7-2",
              tipo: "corta",
              pregunta: "Tu amigo fue herido en una iglesia y ahora duda de todo. ¿Cómo adaptarías la conversación a su historia, según la lección?",
              ideas: [
                { id: "dano", peso: 35, texto: "Reconocer el daño que vivió.", formas: ["reconoc*", "el dano", "su dano", "dano que", "lo siento", "lamento"] },
                { id: "distinto", peso: 35, texto: "Mostrarle que Cristo es distinto de los errores de los creyentes.", formas: ["cristo es distinto", "distint*", "errores de los creyentes", "cristo no es como"] },
                { id: "preguntas", peso: 30, texto: "Escuchar sus preguntas, responder con honestidad y ofrecerle leer juntos un evangelio.", formas: ["escuch*", "sus preguntas", "honest*", "leer juntos", "un evangelio", "leamos"] },
              ],
              modelo: "Primero escucharía sus preguntas y reconocería el daño que vivió en esa iglesia. Le mostraría que Cristo es distinto de los errores de los creyentes, le respondería con honestidad y le ofrecería leer juntos un evangelio.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La familia y los amigos
    "evangelismo-misiones-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por medio de quién llegan a Cristo muchas personas?", reverso: "De alguien que ya conocen: un familiar, un amigo o un compañero de trabajo.", apoyo: "Muchas personas llegan a Cristo por medio de alguien que ya conocen: un familiar, un amigo o un compañero de trabajo" },
              { frente: "¿Adónde envió Jesús al hombre que liberó en Gadara?", reverso: "A su casa, a los suyos, a contarles lo que el Señor hizo con él.", apoyo: "Su primer campo misionero fue su propia casa" },
              { frente: "¿Qué hizo Cornelio mientras esperaba a Pedro en Cesarea?", reverso: "Convocó a sus parientes y amigos más íntimos.", apoyo: "Cornelio lo estaba esperando, «habiendo convocado a sus parientes y amigos más íntimos»" },
              { frente: "¿Qué le dijo Felipe a su amigo Natanael cuando dudó?", reverso: "«Ven y ve»: no discutió con él.", apoyo: "Cuando su amigo Natanael dudó, Felipe no discutió: le dijo «Ven y ve»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le dijeron al carcelero de Filipos?", reverso: "«Cree en el Señor Jesucristo, y serás salvo, tú y tu casa».", apoyo: "Al carcelero de Filipos le dijeron: «Cree en el Señor Jesucristo, y serás salvo, tú y tu casa»" },
              { frente: "¿Se salva la familia por la fe de uno solo?", reverso: "No: todos oyeron la palabra, y cada persona necesita creer.", apoyo: "La promesa no quiere decir que la familia se salva por la fe de uno solo" },
              { frente: "¿Qué habla antes que tus palabras?", reverso: "El cambio en tu vida.", apoyo: "Vive lo que crees: el cambio en tu vida habla antes que tus palabras" },
              { frente: "¿Cuál es tu primer campo misionero?", reverso: "Tu casa y tus amigos.", apoyo: "Tu casa y tus amigos son tu primer campo misionero" },
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
            consigna: "Completa por medio de quién llegan a Cristo muchas personas.",
            texto: "Muchas personas llegan a Cristo por medio de alguien que ya [[conocen]]: un [[familiar]], un amigo o un [[compañero]] de trabajo.",
            distractores: ["ignoran", "extraño", "enemigo"],
            errores: {
              ignoran: "Muchas personas llegan a Cristo por medio de alguien que ya conocen.",
              "extraño": "Muchas llegan por un familiar, un amigo o un compañero: alguien que ya conocen.",
              enemigo: "Muchas llegan por medio de un compañero de trabajo, alguien que ya conocen.",
            },
            apoyo: "Muchas personas llegan a Cristo por medio de alguien que ya conocen",
            explica: "Muchas personas llegan a Cristo por medio de alguien que ya conocen: un familiar, un amigo o un compañero de trabajo. Por eso tu casa y tus amigos son tu primer campo misionero.",
          },
          {
            consigna: "Completa por qué los tuyos son tu primer campo misionero.",
            texto: "Muchas personas llegan a Cristo por alguien que conocen: por eso tu [[casa]] y tus [[amigos]] son tu primer [[campo]] misionero.",
            distractores: ["dinero", "enemigos", "premio"],
            errores: {
              dinero: "Tu casa y tus amigos son tu primer campo misionero.",
              enemigos: "Son tus amigos: muchas personas llegan a Cristo por alguien que conocen.",
              premio: "Tu casa y tus amigos son tu primer campo misionero: allí empiezas a compartir tu fe.",
            },
            apoyo: "Tu casa y tus amigos son tu primer campo misionero",
            ref: "Marcos 5:19",
            explica: "Muchas personas llegan a Cristo por alguien que conocen. Por eso tu casa y tus amigos son tu primer campo misionero, como la casa del hombre que Jesús liberó en Gadara.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une a cada uno con lo que pasó con los suyos.",
            pares: [
              ["El hombre liberado en Gadara", "Jesús lo envió a contar a los suyos lo que el Señor hizo"],
              ["Cornelio", "Convocó a sus parientes y amigos para oír a Pedro"],
              ["El carcelero de Filipos", "Oyó la palabra con todos los de su casa"],
              ["Felipe", "Invitó a su amigo Natanael a venir y ver"],
            ],
            apoyo: "Jesús envió al hombre liberado a contar a los suyos lo que el Señor hizo; Cornelio reunió a sus parientes y amigos; el carcelero oyó la palabra con toda su casa, y Felipe invitó a su amigo a ver",
            ref: "Marcos 5:19; Hechos 10:24",
            explica: "Jesús envió al hombre liberado a contar a los suyos lo que el Señor hizo; Cornelio convocó a sus parientes y amigos; el carcelero oyó la palabra con toda su casa; y Felipe invitó a Natanael a ver.",
          },
          {
            consigna: "¿Qué ejemplo sigues en cada caso? Une cada caso con su ejemplo.",
            pares: [
              ["Dios te liberó de un vicio, y vas a tu casa a contarlo", "El hombre liberado en Gadara"],
              ["Reúnes en tu casa a parientes y amigos para que oigan el evangelio", "Cornelio"],
              ["Tu amigo duda, y en vez de discutir lo invitas a ver por sí mismo", "Felipe"],
              ["Toda tu familia escucha la palabra del Señor en tu casa", "El carcelero de Filipos"],
            ],
            apoyo: "Aplicar los ejemplos del gadareno, de Cornelio, del carcelero de Filipos y de Felipe",
            explica: "Contar en casa lo que el Señor hizo es el ejemplo del hombre de Gadara; reunir a los tuyos para oír el evangelio, el de Cornelio; invitar a ver sin discutir, el de Felipe; y que toda la casa oiga la palabra, el del carcelero.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los ejemplos de la lección: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cornelio abrió su casa para que los suyos oyeran el evangelio.", verdad: true, explica: "Cuando Pedro llegó a Cesarea, Cornelio lo esperaba «habiendo convocado a sus parientes y amigos más íntimos».", apoyo: "Abrió su casa para que los suyos oyeran el evangelio", ref: "Hechos 10:24" },
              { texto: "Cuando Natanael dudó, Felipe discutió con él hasta convencerlo.", verdad: false, explica: "Felipe no discutió: le dijo «Ven y ve».", apoyo: "Cuando su amigo Natanael dudó, Felipe no discutió: le dijo «Ven y ve»", ref: "Juan 1:45-46" },
              { texto: "El carcelero de Filipos se regocijó con toda su familia.", verdad: true, explica: "Le hablaron la palabra del Señor a él y a todos los de su casa, y él se regocijó con toda su familia.", apoyo: "él se regocijó con toda su familia", ref: "Hechos 16:31-34" },
            ],
          },
          {
            consigna: "Sobre la promesa al carcelero y el hombre de Gadara: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La promesa al carcelero quiere decir que su familia se salvaba por la fe de él solo.", verdad: false, explica: "La promesa no quiere decir que la familia se salva por la fe de uno solo: todos oyeron la palabra, y cada persona necesita creer.", apoyo: "La promesa no quiere decir que la familia se salva por la fe de uno solo", ref: "Hechos 16:31-34" },
              { texto: "Todos los de la casa del carcelero oyeron la palabra del Señor.", verdad: true, explica: "Le hablaron la palabra del Señor a él y a todos los de su casa: cada persona necesita creer.", apoyo: "todos los de la casa oyeron la palabra, y cada persona necesita creer", ref: "Hechos 16:32" },
              { texto: "Jesús envió al hombre que liberó en Gadara lejos de los suyos.", verdad: false, explica: "Jesús le dijo: «Vete a tu casa, a los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo».", apoyo: "Su primer campo misionero fue su propia casa", ref: "Marcos 5:19" },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Con la familia y los amigos se evangeliza con la vida, la oración, el testimonio y la paciencia",
            ref: "Juan 1:45-46",
            titulo: "La familia de Andrés",
            relato: [
              "Andrés creyó en Cristo hace dos meses, y tú lo acompañas desde el equipo de evangelismo. Quiere que su familia también conozca a Cristo.",
              "Su papá se burla de su fe, su hermana dice que todo eso es un cuento, y su tía es amable, pero nunca ha ido a una iglesia.",
              "Andrés te pregunta por dónde empezar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le aconsejas primero?",
                opciones: [
                  { texto: "Que viva lo que cree: el cambio en su vida hablará antes que sus palabras.", bien: true, explica: "Vive lo que crees: el cambio en tu vida habla antes que tus palabras." },
                  { texto: "Que les predique a todos en la cena del domingo, aunque no quieran oírlo nada.", explica: "Se cuenta lo que Dios hizo con humildad y sin sermones; no se presiona." },
                  { texto: "Que deje de visitarlos por un buen tiempo, hasta que ellos acepten su nueva fe.", explica: "No presiones ni discutas: respeta su tiempo y sigue amándolos." },
                ],
                apoyo: "Vive lo que crees: el cambio en tu vida habla antes que tus palabras",
                explica: "Con los tuyos se empieza por la vida: el cambio en tu vida habla antes que tus palabras.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo puede orar Andrés por su familia?",
                opciones: [
                  { texto: "Por cada uno por su nombre, esperando las oportunidades de hablarles.", bien: true, explica: "Ora por cada uno por su nombre y espera las oportunidades." },
                  { texto: "Por todos juntos una sola vez, y después no volver a pensar en el tema.", explica: "Se ora por cada uno por su nombre, y se siguen esperando las oportunidades." },
                  { texto: "Solo por su papá, que es el que más se burla de su fe en la familia.", explica: "Se ora por cada uno de los suyos por su nombre." },
                ],
                apoyo: "Ora por cada uno por su nombre y espera las oportunidades",
                explica: "Con los tuyos, se ora por cada uno por su nombre y se esperan las oportunidades.",
              },
              {
                tipo: "situacion",
                pregunta: "Su hermana le dice que todo eso es un cuento. ¿Qué ejemplo le recomiendas seguir?",
                opciones: [
                  { texto: "El de Felipe con Natanael: no discutir, e invitarla a venir y ver.", bien: true, explica: "Cuando Natanael dudó, Felipe no discutió: le dijo «Ven y ve»." },
                  { texto: "Discutir con ella hasta ganarle, para que vea que él tiene la razón.", explica: "No presiones ni discutas: respeta su tiempo y sigue amándolos." },
                  { texto: "No hablarle más de Cristo, porque ella ya decidió que no va a creer.", explica: "Con paciencia se siguen esperando las oportunidades, como Felipe invitó a Natanael a ver." },
                ],
                apoyo: "Cuando su amigo Natanael dudó, Felipe no discutió: le dijo «Ven y ve»",
                explica: "Cuando su amigo dudó, Felipe no discutió: lo invitó a venir y ver.",
              },
              {
                tipo: "explica",
                apoyo: "Invita a los tuyos a una comida, a un estudio en casa o a una actividad de la iglesia",
                clave: {
                  id: "pr-evangelismo-misiones-1-4-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué plan le propones a Andrés para su tía, que es amable pero nunca ha ido a una iglesia?",
                  ideas: [
                    { id: "invitar", peso: 40, texto: "Invitarla a una comida, a un estudio en casa o a una actividad de la iglesia.", formas: ["invit*", "comida", "cena", "almuerzo", "estudio", "actividad"] },
                    { id: "contar", peso: 30, texto: "Contarle lo que Dios hizo con él, con humildad y sin sermones.", formas: ["(contar|contarle|cuente|cuenta|contara|contaria)", "testimonio", "lo que dios hizo", "lo que (cristo|jesus) hizo", "sin sermones", "humild*"] },
                    { id: "paciencia", peso: 30, texto: "Orar por ella y tener paciencia, sin presionarla.", formas: ["paciencia", "sin presion*", "no (la|lo) presion*", "no presion*", "respet* su tiempo", "(orar|ore|orando|orara|oraria) por (ella|su)"] },
                  ],
                  errores: [
                    { id: "presion", texto: "Con los tuyos no se presiona ni se discute: se respeta su tiempo y se los sigue amando.", formas: ["obligar*", "presionar* hasta", "discutir* hasta"], anula: "paciencia" },
                  ],
                  modelo: "Le propongo que ore por su tía cada día y le cuente con humildad lo que Dios hizo con él, sin sermones. Después, que la invite a una comida en su casa o a un estudio, con paciencia y sin presionarla.",
                },
              },
            ],
          },
          {
            apoyo: "No presiones ni discutas: respeta su tiempo y sigue amándolos",
            ref: "Hechos 10:24",
            titulo: "Las amigas de Sara",
            relato: [
              "Sara sirve en tu equipo de evangelismo. Tiene tres amigas de la universidad que no conocen a Cristo, y quiere compartir su fe con ellas.",
              "Una de ellas le preguntó por qué está tan cambiada desde hace un año. Otra le pidió que no le hable de religión.",
              "Sara te pide ayuda para hacer un plan.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Su amiga le preguntó por qué está tan cambiada. ¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que le cuente lo que Dios hizo con ella, con humildad y sin sermones.", bien: true, explica: "Cuenta lo que Dios hizo contigo, con humildad y sin sermones." },
                  { texto: "Que le dé un sermón largo sobre el pecado, ahora que tiene la oportunidad.", explica: "Se cuenta lo que Dios hizo, con humildad y sin sermones." },
                  { texto: "Que le diga que no es nada, para no parecer una fanática de la religión.", explica: "Su pregunta es una oportunidad: se cuenta lo que Dios hizo, con humildad." },
                ],
                apoyo: "Cuenta lo que Dios hizo contigo, con humildad y sin sermones",
                explica: "Como el hombre de Gadara, se cuenta lo que el Señor hizo, con humildad y sin sermones.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué hace con la amiga que le pidió que no le hable de religión?",
                opciones: [
                  { texto: "No la presiona: respeta su tiempo y sigue amándola.", bien: true, explica: "No presiones ni discutas: respeta su tiempo y sigue amándolos." },
                  { texto: "Le insiste un poco cada día, porque pronto va a cambiar de idea.", explica: "Insistir es presionar: se respeta su tiempo." },
                  { texto: "Deja esa amistad, porque ella no quiere oír hablar de Cristo.", explica: "Se la sigue amando, con paciencia." },
                ],
                apoyo: "No presiones ni discutas: respeta su tiempo y sigue amándolos",
                explica: "No se presiona ni se discute: se respeta su tiempo y se la sigue amando.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué ejemplo puede seguir Sara para que sus amigas oigan el evangelio?",
                opciones: [
                  { texto: "El de Cornelio: abrir su casa para que oigan la palabra.", bien: true, explica: "Cornelio abrió su casa para que los suyos oyeran el evangelio." },
                  { texto: "El de quien discute hasta ganar, para que vean que tiene razón.", explica: "Con los amigos no se discute: Felipe tampoco discutió con Natanael." },
                  { texto: "Ninguno: con las amigas es mejor no mezclar nunca la fe y la amistad.", explica: "Muchas personas llegan a Cristo por medio de alguien que ya conocen, como un amigo." },
                ],
                apoyo: "Abrió su casa para que los suyos oyeran el evangelio",
                explica: "Cornelio convocó a sus parientes y amigos más íntimos: Sara puede invitar a sus amigas a una comida o a un estudio en su casa.",
              },
              {
                tipo: "explica",
                apoyo: "Con la familia y los amigos se evangeliza con la vida, la oración, el testimonio y la paciencia",
                clave: {
                  id: "pr-evangelismo-misiones-1-4-a5-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras el plan de Sara para compartir su fe con sus tres amigas.",
                  ideas: [
                    { id: "vida", peso: 35, texto: "Vivir lo que cree y orar por cada una por su nombre.", formas: ["(vivir|vive|viva|vivira|viviendo) lo que cree", "su vida", "el cambio", "(orar|ore|orara|orando|ora) por (ellas|cada)", "por su nombre"] },
                    { id: "invitar", peso: 35, texto: "Contarles lo que Dios hizo e invitarlas a una comida o a un estudio en casa.", formas: ["invit*", "comida", "cena", "estudio", "(contar|contarles|cuente|contara|contaria)", "testimonio", "lo que dios hizo"] },
                    { id: "paciencia", peso: 30, texto: "Con paciencia: sin presionar ni discutir, respetando su tiempo.", formas: ["paciencia", "sin presion*", "no presion*", "no las presion*", "respet* su tiempo", "sin discutir", "no discut*", "segu* amando*", "sig* amando*"] },
                  ],
                  errores: [
                    { id: "presion", texto: "Con los amigos no se presiona ni se discute: se respeta su tiempo y se los sigue amando.", formas: ["obligar*", "presionar* hasta", "discutir* hasta"], anula: "paciencia" },
                  ],
                  modelo: "Sara va a vivir lo que cree y orar cada día por cada una por su nombre. Les contará lo que Dios hizo con ella y las invitará a un estudio en su casa, con paciencia, sin presionar ni discutir.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Así se comparte la fe con los tuyos, o así no? Lleva cada frase a su grupo.",
            grupos: ["Así se comparte con los tuyos", "Así no se comparte"],
            frases: [
              { texto: "Vivir lo que crees antes de hablar", grupo: 0 },
              { texto: "Orar por cada uno por su nombre", grupo: 0 },
              { texto: "Contar lo que Dios hizo contigo, con humildad", grupo: 0 },
              { texto: "Invitarlos a una comida o a un estudio en casa", grupo: 0 },
              { texto: "Presionarlos hasta que digan que sí", grupo: 1 },
              { texto: "Discutir con ellos en cada reunión familiar", grupo: 1 },
              { texto: "Darles un sermón cada vez que los ves", grupo: 1 },
              { texto: "Dejar de amarlos si no responden", grupo: 1 },
            ],
            apoyo: "Con la familia y los amigos se evangeliza con la vida, la oración, el testimonio y la paciencia",
            explica: "Con los tuyos se evangeliza con la vida, la oración, el testimonio y la paciencia; no se presiona ni se discute, y se los sigue amando.",
          },
          {
            consigna: "Tu hermano todavía no cree. ¿Esto es tener paciencia con él, o no lo es? Lleva cada frase a su grupo.",
            grupos: ["Es tener paciencia", "No es tener paciencia"],
            frases: [
              { texto: "Respetar su tiempo y seguir amándolo", grupo: 0 },
              { texto: "Esperar las oportunidades mientras oras por él", grupo: 0 },
              { texto: "Invitarlo a una actividad de la iglesia, sin insistir", grupo: 0 },
              { texto: "Exigirle una respuesta esta misma semana", grupo: 1 },
              { texto: "Ganarle cada discusión sobre Dios", grupo: 1 },
              { texto: "Dejar de hablarle porque no quiere creer", grupo: 1 },
            ],
            apoyo: "No presiones ni discutas: respeta su tiempo y sigue amándolos",
            explica: "Con paciencia se respeta su tiempo, se ora y se esperan las oportunidades; no se presiona, no se discute y se lo sigue amando.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Tu casa y tus amigos son tu primer campo misionero",
            ref: "Marcos 5:19",
            clave: {
              id: "pr-evangelismo-misiones-1-4-a7-1",
              tipo: "corta",
              pregunta: "¿A quién de tu familia o de tus amigos vas a invitar este mes, y cómo le vas a compartir tu fe con paciencia?",
              ideas: [
                { id: "persona", peso: 20, texto: "Una persona concreta de tu familia o de tus amigos.", formas: ["mi (papa|mama|padre|madre|hermano|hermana|tio|tia|primo|prima|abuelo|abuela|hijo|hija|esposo|esposa|amigo|amiga|vecino|vecina|companero|companera|suegro|suegra|cunado|cunada|sobrino|sobrina|novio|novia)"] },
                { id: "invitar", peso: 40, texto: "Invitarla a una comida, a un estudio en casa o a una actividad de la iglesia, y contarle lo que Dios hizo.", formas: ["invit*", "comida", "cena", "almuerzo", "estudio", "actividad"] },
                { id: "paciencia", peso: 40, texto: "Con paciencia: orando por ella, sin presionar ni discutir, respetando su tiempo.", formas: ["paciencia", "pacient*", "sin presion*", "no (lo|la) presion*", "no presion*", "respet* su tiempo", "sin discutir", "no discut*", "(orar|orare|orando|oro|ore) por (el|ella)"] },
              ],
              errores: [
                { id: "presion", texto: "Con los tuyos no se presiona ni se discute: se respeta su tiempo y se los sigue amando.", formas: ["obligar*", "presionar* hasta", "discutir* hasta"], anula: "paciencia" },
              ],
              modelo: "Este mes voy a invitar a mi hermano a una comida en mi casa. Le contaré lo que Dios hizo conmigo, con humildad, y seguiré orando por él con paciencia, sin presionar ni discutir.",
            },
          },
          {
            apoyo: "No presiones ni discutas: respeta su tiempo y sigue amándolos",
            ref: "Juan 1:45-46",
            clave: {
              id: "pr-evangelismo-misiones-1-4-a7-2",
              tipo: "corta",
              pregunta: "Tu tío no quiere saber nada de Dios. ¿Cómo lo vas a evangelizar con paciencia, según la lección?",
              ideas: [
                { id: "vida", peso: 35, texto: "Viviendo lo que creo y orando por él por su nombre.", formas: ["(vivir|vivire|vivo|viviendo) lo que creo", "mi vida", "el cambio", "mi ejemplo", "(orar|orare|orando|oro|ore) por (el|mi)", "por su nombre"] },
                { id: "testimonio", peso: 30, texto: "Contándole lo que Dios hizo conmigo, con humildad y sin sermones, e invitándolo cuando haya oportunidad.", formas: ["(contar|contarle|contare|contaria|cuento|cuente)", "testimonio", "lo que dios hizo", "sin sermones", "humild*", "invit*"] },
                { id: "paciencia", peso: 35, texto: "Sin presionar ni discutir: respetando su tiempo y siguiendo amándolo.", formas: ["paciencia", "sin presion*", "no presion*", "no lo presion*", "respet* su tiempo", "sin discutir", "no discut*", "segu* amando*", "amandolo"] },
              ],
              errores: [
                { id: "presion", texto: "Con los tuyos no se presiona ni se discute: se respeta su tiempo y se los sigue amando.", formas: ["obligar*", "presionar* hasta", "discutir* hasta"], anula: "paciencia" },
              ],
              modelo: "Viviré lo que creo y oraré por mi tío cada día, por su nombre. Cuando haya oportunidad, le contaré con humildad lo que Dios hizo conmigo, sin sermones. No lo presionaré ni discutiré con él: respetaré su tiempo y seguiré amándolo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Valentía y oración
    "evangelismo-misiones-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Quiénes amenazaban a los creyentes en Hechos 4?", reverso: "Las autoridades.", apoyo: "Amenazados por las autoridades" },
              { frente: "¿Qué pidieron a Dios los creyentes amenazados en Hechos 4?", reverso: "«concede a tus siervos que con todo denuedo hablen tu palabra».", apoyo: "sino esto: «concede a tus siervos que con todo denuedo hablen tu palabra»" },
              { frente: "¿Qué respondió Dios a la oración de Hechos 4?", reverso: "«todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».", apoyo: "la respuesta fue que «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios»" },
              { frente: "¿Conoció el miedo la iglesia de los primeros días?", reverso: "Sí: también conoció el miedo y las amenazas.", apoyo: "La iglesia de los primeros días también conoció el miedo y las amenazas" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por qué tres miedos muchos creyentes no evangelizan?", reverso: "Al rechazo, a no saber qué decir o a perder amistades.", apoyo: "Muchos creyentes no evangelizan por miedo: al rechazo, a no saber qué decir o a perder amistades" },
              { frente: "¿Para qué pedía oración Pablo?", reverso: "Para tener valor: para dar a conocer con denuedo el misterio del evangelio.", apoyo: "Aun Pablo pedía oración para tener valor" },
              { frente: "¿Cómo veía Pablo su vida, según Hechos 20:24?", reverso: "Al servicio de la misión: quería acabar su carrera con gozo.", apoyo: "Pablo veía su vida al servicio de la misión" },
              { frente: "¿Tiene el miedo la última palabra?", reverso: "No: el miedo es común, pero no tiene la última palabra.", apoyo: "El miedo es común, pero no tiene la última palabra" },
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
            consigna: "Amenazados, ¿qué pidieron los creyentes? Toca la palabra que dice cómo querían hablar.",
            texto: "concede a tus siervos que con todo [[denuedo]] hablen tu palabra",
            apoyo: "Amenazada, la iglesia de Hechos 4 pidió denuedo para hablar la palabra y fue llena del Espíritu Santo",
            ref: "Hechos 4:29",
            explica: "No pidieron que las amenazas pasaran, sino esto: «concede a tus siervos que con todo denuedo hablen tu palabra».",
          },
          {
            consigna: "¿Qué respondió Dios a la oración de la iglesia amenazada? Toca de qué fueron llenos y cómo hablaban.",
            texto: "todos fueron llenos del [[Espíritu Santo]], y hablaban con [[denuedo]] la palabra de Dios",
            apoyo: "la respuesta fue que «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios»",
            ref: "Hechos 4:31",
            explica: "Dios respondió a la oración: «todos fueron llenos del Espíritu Santo, y hablaban con denuedo la palabra de Dios».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada temor con la verdad que lo enfrenta.",
            pares: [
              ["El miedo al rechazo", "Muchas veces se rechaza el mensaje y no a ti; el fruto lo da Dios"],
              ["El miedo a no saber qué decir", "Cuenta lo que Cristo hizo contigo y ofrece buscar juntos la respuesta"],
              ["El miedo a perder la amistad", "Habla con respeto y amor: una amistad verdadera lo soporta"],
            ],
            apoyo: "El evangelista ora antes de hablar, enfrenta sus temores con la verdad y recuerda que el fruto lo da Dios",
            explica: "Ante el miedo al rechazo: se rechaza el mensaje y no a ti, y el fruto lo da Dios. Ante el miedo a no saber qué decir: cuenta lo que Cristo hizo contigo. Ante el miedo a perder la amistad: habla con respeto y con amor.",
          },
          {
            consigna: "¿Qué temor hay detrás de cada pensamiento? Une cada pensamiento con su temor.",
            pares: [
              ["¿Y si se ríe de mí y me dice que no?", "El miedo al rechazo"],
              ["¿Y si me pregunta algo y no sé qué contestar?", "El miedo a no saber qué decir"],
              ["¿Y si por esto deja de ser mi amiga?", "El miedo a perder la amistad"],
            ],
            apoyo: "Muchos creyentes no evangelizan por miedo: al rechazo, a no saber qué decir o a perder amistades",
            explica: "Son los tres miedos que frenan a muchos creyentes: al rechazo, a no saber qué decir o a perder amistades. Cada uno se enfrenta con la verdad.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El miedo es común, pero no tiene la última palabra",
            ref: "Hechos 4:29-31",
            situacion: "El sábado sales con tu equipo a evangelizar en el mercado del barrio. Eres el líder del equipo, y desde el jueves sientes miedo.",
            escenas: [
              {
                id: "e1",
                narra: "El viernes en la noche piensas en todo lo que podría salir mal.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras y pides denuedo para hablar, como la iglesia de Hechos 4.", valor: 2, explica: "Antes de hablar, ora: pide denuedo, como la iglesia de Hechos 4.", siguiente: "e2" },
                  { texto: "Repasas otra vez lo que vas a decir, aunque no oras por la salida.", valor: 1, explica: "Prepararse ayuda, pero el valor para hablar de Cristo se pide en oración.", siguiente: "e2" },
                  { texto: "Cancelas la salida: con tanto miedo, es mejor no evangelizar mañana.", valor: 0, explica: "El miedo es común, pero no tiene la última palabra.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Un hermano del equipo te escribe: Yo también tenía miedo, pero oré y quiero ir.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oran juntos por denuedo y mantienen la salida del sábado.", valor: 2, explica: "La iglesia de Hechos 4 conoció las amenazas y pidió denuedo: el miedo no tiene la última palabra.", siguiente: "e2" },
                  { texto: "Le dices que sin ti no van, y que esperen a otra fecha más tranquila.", valor: 0, explica: "El miedo es común, pero no tiene la última palabra: el valor se pide en oración.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En el mercado, una señora rechaza el folleto con mala cara.",
                pregunta: "¿Qué piensas?",
                opciones: [
                  { texto: "Que muchas veces se rechaza el mensaje y no a ti.", valor: 2, explica: "El miedo al rechazo: muchas veces se rechaza el mensaje y no a ti, y el fruto lo da Dios." },
                  { texto: "Que no fue nada, pero ya no le ofreces un folleto a nadie más.", valor: 1, explica: "No tomarlo como algo personal está bien, pero el fruto lo da Dios: se sigue ofreciendo el mensaje." },
                  { texto: "Que fallaste, y que ya no sirves para evangelizar a nadie.", valor: 0, explica: "Muchas veces se rechaza el mensaje y no a ti, y el fruto lo da Dios." },
                ],
              },
              {
                id: "e3",
                narra: "Un joven te pregunta algo de la Biblia que no sabes responder.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Le cuentas lo que Cristo hizo contigo y ofreces buscar juntos la respuesta.", valor: 2, explica: "El miedo a no saber qué decir: cuenta lo que Cristo hizo contigo y ofrece buscar juntos la respuesta." },
                  { texto: "Le inventas una respuesta rápida para no quedar mal delante de todo el equipo.", valor: 0, explica: "No hace falta inventar: cuenta lo que Cristo hizo contigo y ofrece buscar juntos la respuesta." },
                  { texto: "Le dices que no sabes y te despides, sin darle ninguna forma de contactarte.", valor: 1, explica: "Decir que no sabes es honesto, pero también se ofrece buscar juntos la respuesta." },
                ],
              },
            ],
          },
          {
            apoyo: "El miedo a perder la amistad: habla con respeto y con amor; una amistad verdadera soporta una conversación sincera",
            ref: "Efesios 6:19-20",
            situacion: "Hace años que eres amigo de Tomás, un compañero de trabajo que no conoce a Cristo. Sientes que es el momento de hablarle, pero tienes miedo de perder su amistad.",
            escenas: [
              {
                id: "e1",
                narra: "Te preguntas qué hacer con ese miedo.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Oras, y les pides a otros que oren por ti, como lo hacía Pablo.", valor: 2, explica: "Aun Pablo pedía oración para tener valor: el valor para hablar de Cristo se pide en oración.", siguiente: "e2" },
                  { texto: "Decides hablarle esta semana, pero sin orar antes por esa conversación.", valor: 1, explica: "Decidirte es bueno, pero antes de hablar, ora: pide denuedo.", siguiente: "e2" },
                  { texto: "Decides no hablarle nunca de Cristo, para no arriesgar la amistad.", valor: 0, explica: "Una amistad verdadera soporta una conversación sincera: el miedo no tiene la última palabra.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Semanas después, Tomás te cuenta que está pasando por un momento muy difícil.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Oras por denuedo y le hablas de Cristo con respeto y con amor.", valor: 2, explica: "Habla con respeto y con amor: una amistad verdadera soporta una conversación sincera.", siguiente: "e2" },
                  { texto: "Lo escuchas, pero sigues callando lo que Cristo hizo en tu vida.", valor: 0, explica: "El miedo no tiene la última palabra: cuenta lo que Cristo hizo contigo.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Por fin le hablas. Tomás te escucha, pero te hace una pregunta que no sabes responder.",
                pregunta: "¿Qué le dices?",
                opciones: [
                  { texto: "Le cuentas lo que Cristo hizo contigo y le ofreces buscar juntos la respuesta.", valor: 2, explica: "Cuenta lo que Cristo hizo contigo y ofrece buscar juntos la respuesta." },
                  { texto: "Le dices con sinceridad que no sabes, y enseguida cambias de tema de conversación.", valor: 1, explica: "Ser sincero está bien, pero también se ofrece buscar juntos la respuesta." },
                  { texto: "Le das una respuesta inventada, para que no note que no sabes qué decirle.", valor: 0, explica: "No hace falta inventar: cuenta lo que Cristo hizo contigo y ofrece buscar juntos la respuesta." },
                ],
              },
              {
                id: "e3",
                narra: "Al día siguiente, Tomás te saluda como siempre, aunque todavía no cree.",
                pregunta: "¿Qué recuerdas?",
                opciones: [
                  { texto: "Que la amistad sigue, y que el fruto lo da Dios.", valor: 2, explica: "Una amistad verdadera soporta una conversación sincera, y el fruto lo da Dios." },
                  { texto: "Que hablarle fue un error, porque no creyó enseguida en Cristo.", valor: 0, explica: "El fruto lo da Dios: hablarle con respeto y con amor no fue un error." },
                  { texto: "Que ya no debes hablarle más de Cristo, por si acaso se cansa.", valor: 0, explica: "Una amistad verdadera soporta una conversación sincera." },
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
            consigna: "Completa qué hace el evangelista con sus temores.",
            texto: "El evangelista [[ora]] antes de hablar, enfrenta sus [[temores]] con la verdad y recuerda que el [[fruto]] lo da Dios.",
            distractores: ["duda", "amigos", "miedo"],
            errores: {
              duda: "El evangelista ora antes de hablar: pide denuedo, como la iglesia de Hechos 4.",
              amigos: "Lo que se enfrenta con la verdad son los temores.",
              miedo: "Dios no da el miedo: el fruto lo da Dios, y el valor se pide en oración.",
            },
            apoyo: "El evangelista ora antes de hablar, enfrenta sus temores con la verdad y recuerda que el fruto lo da Dios",
            ref: "Hechos 4:29-31",
            explica: "El miedo es común, pero no tiene la última palabra: el evangelista ora antes de hablar, enfrenta sus temores con la verdad y recuerda que el fruto lo da Dios.",
          },
          {
            consigna: "Completa qué se hace antes de hablar de Cristo.",
            texto: "Antes de hablar, [[ora]]: pide [[denuedo]], como la [[iglesia]] de Hechos 4.",
            distractores: ["discute", "dinero", "sinagoga"],
            errores: {
              discute: "Antes de hablar, se ora y se pide denuedo.",
              dinero: "La iglesia de Hechos 4 pidió denuedo para hablar la palabra.",
              sinagoga: "Fue la iglesia amenazada la que pidió denuedo en Hechos 4.",
            },
            apoyo: "Antes de hablar, ora: pide denuedo, como la iglesia de Hechos 4",
            ref: "Hechos 4:29",
            explica: "Antes de hablar, el evangelista ora y pide denuedo, como la iglesia de Hechos 4: el valor para hablar de Cristo se pide en oración.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven del equipo te dice antes de salir a evangelizar: Tengo mucho miedo; creo que hoy mejor me quedo.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Oremos juntos ahora y pidamos denuedo, como la iglesia de Hechos 4.", bien: true, explica: "Antes de hablar, ora: pide denuedo, como la iglesia de Hechos 4." },
              { texto: "Si tienes miedo, quédate: Dios solo usa a los que nunca sienten miedo.", explica: "La iglesia de los primeros días también conoció el miedo y las amenazas, y pidió denuedo." },
              { texto: "Ve igual y no pienses en eso; orar antes de salir no cambia gran cosa.", explica: "El valor para hablar de Cristo se pide en oración: antes de hablar, ora." },
              { texto: "Quédate hoy y espera a que se te pase el miedo; ya saldrás otro día.", explica: "El miedo es común, pero no tiene la última palabra: el valor se pide en oración." },
            ],
            apoyo: "Antes de hablar, ora: pide denuedo, como la iglesia de Hechos 4",
            ref: "Hechos 4:29-31",
            explica: "El miedo es común, pero no tiene la última palabra: el valor para hablar de Cristo se pide en oración.",
          },
          {
            caso: "Una hermana de tu célula te escribe: Mañana voy a hablarle de Cristo a mi jefe y estoy temblando. ¿Qué hago?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que hoy pida en oración valor para hablar, como lo pedía Pablo.", bien: true, explica: "Aun Pablo pedía oración para tener valor: el valor para hablar de Cristo se pide en oración." },
              { texto: "Que no le hable nada mañana, porque con miedo es mejor no compartir la fe.", explica: "El miedo es común, pero no tiene la última palabra." },
              { texto: "Que prepare un discurso perfecto, y así ya no necesitará orar.", explica: "Prepararse ayuda, pero el valor para hablar de Cristo se pide en oración." },
              { texto: "Que espere a que su jefe le pregunte primero algo sobre Dios.", explica: "No hace falta esperar: antes de hablar, ora y pide denuedo." },
            ],
            apoyo: "El valor para hablar de Cristo se pide en oración",
            ref: "Efesios 6:19-20",
            explica: "Aun Pablo pedía oración para tener valor: que «al abrir mi boca me sea dada palabra para dar a conocer con denuedo el misterio del evangelio».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Amenazados por las autoridades, los creyentes no pidieron que las amenazas pasaran",
            ref: "Hechos 4:29-31",
            clave: {
              id: "pr-evangelismo-misiones-1-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo oró la iglesia de Hechos 4 cuando la amenazaron, y qué pasó después?",
              ideas: [
                { id: "denuedo", peso: 50, texto: "No pidieron que las amenazas pasaran: pidieron denuedo para hablar la palabra.", formas: ["denuedo", "valor", "valentia", "coraje", "(hablar|hablen|anunciar|predicar) (la|tu|su) palabra"] },
                { id: "llenos", peso: 50, texto: "Todos fueron llenos del Espíritu Santo y hablaban con denuedo la palabra de Dios.", formas: ["llen* del espiritu", "espiritu santo", "llenos"] },
              ],
              errores: [
                { id: "quitar", texto: "No pidieron que las amenazas pasaran, sino denuedo para hablar la palabra.", formas: ["(pidieron|pidio) que (las|se|dios) (amenazas|quitaran|pasaran|quitara)"], anula: "denuedo" },
              ],
              modelo: "Cuando los amenazaron, no pidieron que las amenazas pasaran, sino denuedo para hablar la palabra de Dios. Y Dios respondió: todos fueron llenos del Espíritu Santo y hablaban con denuedo la palabra.",
            },
          },
          {
            apoyo: "Amenazada, la iglesia de Hechos 4 pidió denuedo para hablar la palabra y fue llena del Espíritu Santo",
            ref: "Hechos 4:29-31",
            clave: {
              id: "pr-evangelismo-misiones-1-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Cuando hay amenazas, hay que pedirle a Dios que las quite y esperar. ¿Qué enseña la oración de la iglesia en Hechos 4?",
              ideas: [
                { id: "denuedo", peso: 50, texto: "Que la iglesia no pidió que las amenazas pasaran, sino denuedo para hablar la palabra.", formas: ["denuedo", "valor", "valentia", "coraje", "(hablar|hablen|anunciar|predicar) (la|tu|su) palabra", "segu* hablando"] },
                { id: "espiritu", peso: 50, texto: "Que Dios respondió: todos fueron llenos del Espíritu Santo y hablaban con denuedo.", formas: ["llen* del espiritu", "espiritu santo", "llenos"] },
              ],
              errores: [
                { id: "quitar", texto: "La iglesia de Hechos 4 no pidió que las amenazas pasaran.", formas: ["(pidieron|pidio) que (las|se|dios) (amenazas|quitaran|pasaran|quitara)", "hay que esperar"], anula: "denuedo" },
              ],
              modelo: "Enseña que la iglesia amenazada no pidió que las amenazas pasaran, sino denuedo para hablar la palabra. Dios respondió: todos fueron llenos del Espíritu Santo y hablaban con denuedo la palabra de Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Formar a otros para evangelizar
    "evangelismo-misiones-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Envió Jesús a sus discípulos sin preparación?", reverso: "No: los mandó «de dos en dos», con instrucciones.", apoyo: "Jesús no envió a sus discípulos sin preparación" },
              { frente: "¿Por qué les pidió Jesús orar al Señor de la mies?", reverso: "Porque «La mies a la verdad es mucha, mas los obreros pocos».", apoyo: "les pidió orar al Señor de la mies, porque «La mies a la verdad es mucha, mas los obreros pocos»" },
              { frente: "¿Qué hace con la obra quien forma a otros para evangelizar?", reverso: "La multiplica.", apoyo: "uno que forma a otros para evangelizar multiplica la obra" },
              { frente: "¿Qué hay en el cielo por un pecador que se arrepiente?", reverso: "Más gozo: «habrá más gozo en el cielo por un pecador que se arrepiente».", apoyo: "En todo esto hay gozo" },
            ],
          },
          {
            tarjetas: [
              { frente: "Cuando la persecución dispersó a la iglesia, ¿quiénes anunciaban el evangelio?", reverso: "No solo los apóstoles: todos los que fueron esparcidos.", apoyo: "no solo hablaban los apóstoles" },
              { frente: "¿Qué pidió Pablo a Timoteo en 2 Timoteo 2:2?", reverso: "Que formara a otros: que lo encargara a hombres fieles, idóneos para enseñar.", apoyo: "Pablo pidió a Timoteo que formara a otros" },
              { frente: "Si los fieles enseñan también a otros, ¿de dónde a dónde pasa el evangelio?", reverso: "De una generación a otra.", apoyo: "Así el evangelio pasa de una generación a otra" },
              { frente: "¿Qué era cada creyente en Hechos 8?", reverso: "Un testigo.", apoyo: "Cada creyente era un testigo" },
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
            consigna: "Sobre cómo preparó y envió Jesús a sus discípulos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús envió a sus discípulos sin preparación, para que aprendieran solos.", verdad: false, explica: "Jesús no envió a sus discípulos sin preparación: los mandó «de dos en dos», con instrucciones.", apoyo: "Jesús no envió a sus discípulos sin preparación", ref: "Lucas 10:1-2" },
              { texto: "Jesús mandó a sus discípulos de dos en dos, con instrucciones.", verdad: true, explica: "Los mandó «de dos en dos», con instrucciones, y les pidió orar al Señor de la mies.", apoyo: "los mandó «de dos en dos», con instrucciones", ref: "Lucas 10:1" },
              { texto: "Jesús pidió a sus discípulos orar al Señor de la mies.", verdad: true, explica: "Les pidió orar al Señor de la mies, porque «La mies a la verdad es mucha, mas los obreros pocos».", apoyo: "les pidió orar al Señor de la mies", ref: "Lucas 10:2" },
            ],
          },
          {
            consigna: "Sobre la mies, los obreros y el envío: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jesús dijo que la mies era poca y que los obreros eran muchos.", verdad: false, explica: "Jesús dijo: «La mies a la verdad es mucha, mas los obreros pocos».", apoyo: "porque «La mies a la verdad es mucha, mas los obreros pocos»", ref: "Lucas 10:2" },
              { texto: "Jesús envió a sus discípulos de uno en uno, cada cual por su lado.", verdad: false, explica: "Los mandó «de dos en dos», con instrucciones.", apoyo: "los mandó «de dos en dos», con instrucciones", ref: "Lucas 10:1" },
              { texto: "Jesús pidió orar por más obreros, porque los obreros eran pocos.", verdad: true, explica: "Jesús preparó y envió a sus discípulos de dos en dos, y pidió orar por más obreros.", apoyo: "Jesús preparó y envió a sus discípulos de dos en dos, y pidió orar por más obreros", ref: "Lucas 10:2" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué le pide Pablo a Timoteo en 2 Timoteo 2:2? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "timoteo", texto: "Timoteo", x: 20, y: 12 },
              { id: "fieles", texto: "Hombres fieles", x: 50, y: 50 },
              { id: "idoneos", texto: "Idóneos para enseñar", x: 80, y: 16 },
              { id: "otros", texto: "Otros", x: 50, y: 90 },
            ],
            enlaces: [
              { de: "timoteo", a: "fieles", relacion: "les encarga esto" },
              { de: "fieles", a: "idoneos", relacion: "deben ser" },
              { de: "fieles", a: "otros", relacion: "enseñan también a" },
            ],
            distractores: ["discuten con", "reemplazan a"],
            apoyo: "Pablo pidió a Timoteo que formara a otros",
            ref: "2 Timoteo 2:2",
            explica: "Pablo pidió a Timoteo que formara a otros: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros». Así el evangelio pasa de una generación a otra.",
          },
          {
            consigna: "Aplicas 2 Timoteo 2:2 en tu equipo de evangelismo. Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "tu", texto: "Tú, que diriges el equipo", x: 20, y: 10 },
              { id: "raul", texto: "Raúl, fiel y disponible", x: 72, y: 34 },
              { id: "otros", texto: "Otros creyentes", x: 22, y: 64 },
              { id: "formar", texto: "Formar a otros", x: 78, y: 66 },
              { id: "obra", texto: "La obra", x: 55, y: 92 },
            ],
            enlaces: [
              { de: "tu", a: "raul", relacion: "lo escoges y lo formas" },
              { de: "raul", a: "otros", relacion: "les enseñará también" },
              { de: "formar", a: "obra", relacion: "multiplica" },
            ],
            distractores: ["compite con", "reemplaza a"],
            apoyo: "Pablo pidió a Timoteo formar a fieles que enseñaran a otros",
            ref: "2 Timoteo 2:2",
            explica: "Así se aplica 2 Timoteo 2:2: escoges a alguien fiel y lo formas, y él enseñará también a otros. Uno que forma a otros para evangelizar multiplica la obra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros»",
            ref: "2 Timoteo 2:2",
            titulo: "Nuevos evangelistas para el barrio",
            relato: [
              "Eres el líder del equipo de evangelismo de tu iglesia. El pastor te pide formar nuevos evangelistas este año, porque el equipo es pequeño y el barrio es grande.",
              "Varios hermanos se ofrecen: unos son fieles y constantes; otros quieren ir solo cuando hay una campaña grande.",
              "Quieres hacerlo como Pablo se lo pidió a Timoteo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A quiénes escoges primero para formarlos?",
                opciones: [
                  { texto: "A hermanos fieles y disponibles, que puedan enseñar también a otros.", bien: true, explica: "Pablo pidió encargarlo «a hombres fieles que sean idóneos para enseñar también a otros»." },
                  { texto: "A los que solo vienen a las campañas grandes, porque tienen más entusiasmo.", explica: "El entusiasmo de un día no basta: se escoge a una persona fiel y disponible." },
                  { texto: "A nadie: es más rápido que tú solo hagas todo el trabajo de evangelizar.", explica: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros multiplica la obra." },
                ],
                apoyo: "Escoge a una persona fiel y disponible",
                explica: "Se escoge a una persona fiel y disponible, como pidió Pablo: hombres fieles que sean idóneos para enseñar también a otros.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cuál es la meta de formarlos, según 2 Timoteo 2:2?",
                opciones: [
                  { texto: "Que ellos también enseñen a otros, y el evangelio pase a otra generación.", bien: true, explica: "Los fieles enseñan también a otros: así el evangelio pasa de una generación a otra." },
                  { texto: "Que te ayuden por un tiempo, aunque después nunca lleguen a formar a nadie más.", explica: "Pablo pidió formar a fieles que enseñen también a otros." },
                  { texto: "Que te admiren como su gran maestro y que nunca dejen de depender de ti.", explica: "La meta es que enseñen también a otros, no que dependan de ti." },
                ],
                apoyo: "Así el evangelio pasa de una generación a otra",
                explica: "Los fieles enseñan también a otros: así el evangelio pasa de una generación a otra.",
              },
              {
                tipo: "situacion",
                pregunta: "Un hermano te dice: Si tú lo haces mejor, ¿para qué formar a otros? ¿Qué le respondes?",
                opciones: [
                  { texto: "Que uno que forma a otros para evangelizar multiplica la obra.", bien: true, explica: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra." },
                  { texto: "Que tiene razón: es mejor que tú solo evangelices por todos ellos.", explica: "Uno solo puede alcanzar a algunos: formar a otros multiplica la obra." },
                  { texto: "Que formar a otros sirve solo si en la iglesia no hay un evangelista.", explica: "Pablo pidió a Timoteo que formara a otros: así el evangelio pasa de una generación a otra." },
                ],
                apoyo: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra",
                explica: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra.",
              },
              {
                tipo: "explica",
                apoyo: "Así el evangelio pasa de una generación a otra",
                clave: {
                  id: "pr-evangelismo-misiones-1-6-a4-1",
                  tipo: "corta",
                  pregunta: "Explícale al equipo por qué vas a formar nuevos evangelistas, según 2 Timoteo 2:2.",
                  ideas: [
                    { id: "fieles", peso: 35, texto: "Pablo pidió encargarlo a hombres fieles, idóneos para enseñar también a otros.", formas: ["fiel*", "idone*", "disponible*"] },
                    { id: "otros", peso: 35, texto: "Para que ellos enseñen también a otros: así el evangelio pasa de una generación a otra.", formas: ["ensen* a otros", "ensen* tambien", "formen a otros", "generacion*"] },
                    { id: "multiplica", peso: 30, texto: "Quien forma a otros para evangelizar multiplica la obra.", formas: ["multiplic*"] },
                  ],
                  modelo: "Pablo pidió a Timoteo encargar el evangelio a hombres fieles, idóneos para enseñar también a otros. Así el evangelio pasa de una generación a otra, y quien forma a otros para evangelizar multiplica la obra.",
                },
              },
            ],
          },
          {
            apoyo: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra",
            ref: "2 Timoteo 2:2",
            titulo: "El evangelista que hacía todo solo",
            relato: [
              "Ramón es el evangelista de una iglesia pequeña. Desde hace diez años predica en las campañas, visita las casas y habla en la radio, siempre solo.",
              "Está cansado, y la obra casi no crece. Te pide consejo porque estudias la especialidad de Evangelismo y misiones.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le muestras primero?",
                opciones: [
                  { texto: "Que quien forma a otros para evangelizar multiplica la obra.", bien: true, explica: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra." },
                  { texto: "Que siga solo, pero que trabaje todavía más horas cada semana.", explica: "Uno solo puede alcanzar a algunos: formar a otros multiplica la obra." },
                  { texto: "Que deje de evangelizar, porque ya hizo su parte durante diez años.", explica: "La solución no es dejar la obra, sino formar a otros para evangelizar." },
                ],
                apoyo: "uno que forma a otros para evangelizar multiplica la obra",
                explica: "Un creyente que evangeliza puede alcanzar a algunos; uno que forma a otros para evangelizar multiplica la obra.",
              },
              {
                tipo: "situacion",
                pregunta: "Ramón pregunta qué le pidió Pablo a Timoteo. ¿Qué le dices?",
                opciones: [
                  { texto: "Que lo encargara a hombres fieles, idóneos para enseñar a otros.", bien: true, explica: "«esto encarga a hombres fieles que sean idóneos para enseñar también a otros»." },
                  { texto: "Que hiciera él solo toda la obra, sin confiar en nadie de su iglesia.", explica: "Pablo pidió a Timoteo que formara a otros." },
                  { texto: "Que esperara a que llegaran evangelistas preparados de otras ciudades.", explica: "Pablo pidió a Timoteo formar a fieles que enseñaran a otros." },
                ],
                apoyo: "Pablo pidió a Timoteo que formara a otros",
                explica: "Pablo pidió a Timoteo que formara a otros: «esto encarga a hombres fieles que sean idóneos para enseñar también a otros».",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo puede empezar Ramón esta misma semana?",
                opciones: [
                  { texto: "Invitando a un hermano fiel a acompañarlo cuando comparta su fe.", bien: true, explica: "Muéstrale: que te acompañe cuando compartes tu fe." },
                  { texto: "Dando una clase larga a toda la iglesia, sin practicar con nadie.", explica: "Para formar a otro: mostrarle, hacerlo juntos y dejarlo hacer." },
                  { texto: "Esperando a tener veinte voluntarios para empezar a formar a alguno.", explica: "Se empieza con una persona fiel y disponible." },
                ],
                apoyo: "Muéstrale: que te acompañe cuando compartes tu fe",
                explica: "El plan empieza así: escoger a una persona fiel y disponible, y que te acompañe cuando compartes tu fe.",
              },
              {
                tipo: "explica",
                apoyo: "Pablo pidió a Timoteo formar a fieles que enseñaran a otros",
                clave: {
                  id: "pr-evangelismo-misiones-1-6-a4-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras el consejo que le das a Ramón con 2 Timoteo 2:2.",
                  ideas: [
                    { id: "fieles", peso: 35, texto: "Que escoja a hermanos fieles y disponibles.", formas: ["fiel*", "idone*", "disponible*"] },
                    { id: "formar", peso: 35, texto: "Que los forme para que enseñen también a otros.", formas: ["form* a (otros|hermanos|alguien|ellos)", "los forme", "ensen* a otros", "ensen* tambien", "acompan*"] },
                    { id: "multiplica", peso: 30, texto: "Así la obra se multiplica y el evangelio pasa de una generación a otra.", formas: ["multiplic*", "generacion*"] },
                  ],
                  modelo: "Le aconsejo que escoja a hermanos fieles y disponibles y los forme, para que ellos enseñen también a otros, como Pablo pidió a Timoteo. Así la obra se multiplica y el evangelio pasa de una generación a otra.",
                },
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
            consigna: "Ordena el plan para formar a otro creyente, del primer paso al último.",
            pasos: [
              "Escoger a una persona fiel y disponible",
              "Mostrarle: que te acompañe cuando compartes tu fe",
              "Hacerlo juntos: preparar su testimonio y el evangelio en pocas palabras",
              "Dejarla hacerlo: que ella hable y tú la acompañes",
              "Evaluar juntos, orar y celebrar lo que Dios hace",
              "Animarla a formar a otra persona",
            ],
            apoyo: "Para formar a otro: escoger a alguien fiel, mostrarle, hacerlo juntos, dejarlo hacer, evaluar y animarlo a multiplicar",
            ref: "2 Timoteo 2:2",
            explica: "Para formar a otro: escoger a alguien fiel, mostrarle, hacerlo juntos, dejarlo hacer, evaluar y animarlo a multiplicar.",
          },
          {
            consigna: "Inés va a formar a Paula para evangelizar. Ordena lo que hacen, del primer paso al último.",
            pasos: [
              "Inés escoge a Paula, que es fiel y tiene tiempo",
              "Paula acompaña a Inés cuando le habla de Cristo a una vecina",
              "Juntas preparan el testimonio de Paula y el evangelio en pocas palabras",
              "Paula le habla de Cristo a una compañera, e Inés la acompaña",
              "Las dos evalúan, oran y celebran lo que Dios hizo",
              "Paula empieza a formar a otra joven de la iglesia",
            ],
            apoyo: "El evangelismo que se enseña se multiplica",
            explica: "Inés escoge a alguien fiel, le muestra, lo hacen juntas, la deja hacerlo, evalúan y la anima a formar a otra. El evangelismo que se enseña se multiplica.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el plan para formar a otro tiene un error. Tócala.",
            frases: [
              "Escoge a una persona fiel y disponible.",
              "Muéstrale: que te acompañe cuando compartes tu fe.",
              "Déjala hacerlo: tú hablas siempre y ella solo mira.",
              "Evalúen juntos, oren y celebren lo que Dios hace.",
            ],
            malo: 2,
            correccion: "Déjala hacerlo: que ella hable y tú la acompañes.",
            apoyo: "Déjala hacerlo: que ella hable y tú la acompañes",
            explica: "En el plan llega el momento en que la persona habla y tú la acompañas: así aprende a hacerlo.",
          },
          {
            consigna: "Una de estas frases sobre formar a otro creyente tiene un error. Tócala.",
            frases: [
              "Háganlo juntos: preparen su testimonio y el evangelio en pocas palabras.",
              "El evangelismo que se enseña se multiplica.",
              "Cuando ya sabe hacerlo, no hace falta animarla a formar a nadie.",
              "Al formar a otro, también se evalúa, se ora y se celebra.",
            ],
            malo: 2,
            correccion: "Anímala a formar a otra persona: así el evangelismo se multiplica.",
            apoyo: "Anímala a formar a otra persona",
            ref: "2 Timoteo 2:2",
            explica: "El último paso del plan es animarla a formar a otra persona: así el evangelio pasa de una generación a otra.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Para formar a otro: escoger a alguien fiel, mostrarle, hacerlo juntos, dejarlo hacer, evaluar y animarlo a multiplicar",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-evangelismo-misiones-1-6-a7-1",
              tipo: "corta",
              pregunta: "Diseña un plan sencillo para formar a otro creyente en el evangelismo. ¿Qué harías, paso a paso?",
              ideas: [
                { id: "escoger", peso: 30, texto: "Escoger a una persona fiel y disponible.", formas: ["escog*", "elegir*", "elijo", "fiel*", "disponible*"] },
                { id: "juntos", peso: 40, texto: "Mostrarle, hacerlo juntos y dejarla hacerlo mientras la acompaño.", formas: ["mostr*", "muestr*", "acompan*", "juntos", "juntas", "dej* hablar", "dej* hacer*", "que (ella|el) hable", "prepar* (su|el) testimonio"] },
                { id: "multiplicar", peso: 30, texto: "Evaluar, orar, celebrar y animarla a formar a otra persona.", formas: ["evalu*", "celebr*", "form* a otr*", "multiplic*", "anim* a (formar|ensenar)"] },
              ],
              modelo: "Primero escogería a una persona fiel y disponible. Le mostraría cómo comparto mi fe, después lo haríamos juntos y luego la dejaría hablar mientras la acompaño. Al final evaluaríamos, oraríamos, celebraríamos y la animaría a formar a otra persona.",
            },
          },
          {
            apoyo: "¿A quién podrías invitar a acompañarte la próxima vez que compartas tu fe?",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-evangelismo-misiones-1-6-a7-2",
              tipo: "corta",
              pregunta: "¿A quién podrías invitar a acompañarte la próxima vez que compartas tu fe, y cómo seguirías después para formarlo?",
              ideas: [
                { id: "persona", peso: 30, texto: "Una persona fiel y disponible, a la que invito a acompañarme.", formas: ["fiel*", "disponible*", "mi (hermano|hermana|amigo|amiga|primo|prima|esposo|esposa|hijo|hija|companero|companera|vecino|vecina)", "un (hermano|joven|amigo)", "una (hermana|joven|amiga)"] },
                { id: "juntos", peso: 40, texto: "Después preparamos juntos su testimonio y el evangelio en pocas palabras, y la dejo hablar mientras la acompaño.", formas: ["juntos", "juntas", "testimonio", "pocas palabras", "dej* hablar", "que (ella|el) hable", "(la|lo) acompan*", "mostr*", "muestr*"] },
                { id: "evaluar", peso: 30, texto: "Al final evaluamos, oramos, celebramos y la animo a formar a otro.", formas: ["evalu*", "celebr*", "form* a otr*", "multiplic*", "anim*"] },
              ],
              modelo: "Invitaría a mi hermano Ernesto, que es fiel y disponible, a acompañarme. Después prepararíamos juntos su testimonio y el evangelio en pocas palabras, y lo dejaría hablar mientras lo acompaño. Al final evaluaríamos, oraríamos, celebraríamos y lo animaría a formar a otro.",
            },
          },
        ],
      },
    ],
  },
};
