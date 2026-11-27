/**
 * Las prácticas de «Liderazgo II: formar líderes y equipos» (Nivel 5). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n5-liderazgo-2.ts), con la guía de docs/academia-practicas.md.
 * Quién puede ejercer cada cargo, también el ministerio de la mujer, es un punto de la declaración de fe por confirmar:
 * aquí no se pregunta. Sigue a Liderazgo cristiano I sin repetir sus actividades.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N5_LIDERAZGO_2: PracticasMateria = {
  materia: "n5-liderazgo-2",
  mision: {
    titulo: "Formar a los que formarán a otros",
    intro:
      "Tu pastor te pidió que acompañes durante un año a los coordinadores de las células y de los ministerios, para que dejen de hacerlo todo solos y empiecen a formar a otros. Te van a preguntar cómo multiplicar líderes, cómo reconocerlos y formarlos paso a paso, cómo delegar, cómo dirigir un equipo, qué hacer con los conflictos y cómo preparar a quien seguirá la obra. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre:
      "Ya puedes acompañar a otros líderes a multiplicarse: formar en la cercanía y enviar, mirar el corazón y dar segundas oportunidades, delegar con claridad y autoridad, trabajar como un cuerpo, resolver los conflictos como enseñó Jesús y servir con visión mientras preparas a quien seguirá la obra. Tu ministerio se mide también por los que siguen sirviendo cuando tú no estás.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. Multiplicar líderes
    "n5-liderazgo-2-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Para qué dos cosas estableció Jesús a los doce?", reverso: "Para que estuvieran con él y para enviarlos a predicar.", apoyo: "Jesús «estableció a doce, para que estuviesen con él, y para enviarlos a predicar»" },
              { frente: "¿Dónde se forman los líderes, según la lección?", reverso: "En la cercanía, no solo en las clases.", apoyo: "Los líderes se forman en la cercanía, no solo en las clases" },
              { frente: "¿Cuánto tiempo pasó Jesús con los doce?", reverso: "Unos tres años.", apoyo: "Jesús pasó unos tres años con doce, y hoy su iglesia está en todo el mundo" },
              { frente: "¿Qué alcanza a hacer el líder que lo hace todo solo?", reverso: "Solo puede sumar.", apoyo: "Un líder que lo hace todo solo puede sumar" },
            ],
          },
          {
            tarjetas: [
              { frente: "En el modelo de Jesús, ¿qué va primero: estar con él o ser enviados?", reverso: "Primero estar con él; después ser enviados.", apoyo: "Primero estar con él; después ser enviados" },
              { frente: "¿Qué hace el líder que forma a otros?", reverso: "Multiplica.", apoyo: "un líder que forma a otros multiplica" },
              { frente: "Jesús empezó con doce. ¿Dónde está hoy su iglesia?", reverso: "En todo el mundo.", apoyo: "Jesús pasó unos tres años con doce, y hoy su iglesia está en todo el mundo" },
              { frente: "¿Qué deja cuando se va el líder que no forma a otros?", reverso: "Un vacío.", apoyo: "El líder que no forma a otros deja un vacío cuando se va" },
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
            consigna: "Completa cómo formó Jesús a los doce.",
            texto: "Jesús formó a los doce en dos tiempos: primero los tuvo [[cerca]] de él y después los [[envió]] a predicar.",
            distractores: ["lejos", "escondió"],
            errores: {
              lejos: "Jesús estableció a los doce para que estuviesen con él: los líderes se forman en la cercanía.",
              "escondió": "Después de tenerlos con él, Jesús los envió a predicar.",
            },
            apoyo: "Primero estar con él; después ser enviados",
            ref: "Marcos 3:14",
            explica: "Jesús «estableció a doce, para que estuviesen con él, y para enviarlos a predicar»: primero estar con él; después ser enviados.",
          },
          {
            consigna: "Completa dónde se forman los líderes.",
            texto: "Los líderes se forman en la [[cercanía]], no solo en las clases: por eso Jesús quiso que los doce estuvieran con él antes de [[enviarlos]].",
            distractores: ["distancia", "olvidarlos"],
            errores: {
              distancia: "Los líderes se forman en la cercanía, no solo en las clases.",
              olvidarlos: "Jesús estableció a los doce para que estuviesen con él, y para enviarlos a predicar.",
            },
            apoyo: "Los líderes se forman en la cercanía, no solo en las clases",
            ref: "Marcos 3:14",
            explica: "Jesús estableció a doce para que estuviesen con él, y para enviarlos a predicar: los líderes se forman en la cercanía, no solo en las clases.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un maestro de la academia te dice: Ya di todas las clases del curso para nuevos líderes. No hace falta que pase tiempo con ellos fuera del aula.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que los líderes se forman en la cercanía, no solo en las clases.", bien: true, explica: "Jesús estableció a los doce para que estuviesen con él: los líderes se forman en la cercanía, no solo en las clases." },
              { texto: "Que tiene razón: con buenas clases, los líderes ya quedan formados.", explica: "Las clases ayudan, pero no bastan: los líderes se forman en la cercanía, no solo en las clases." },
              { texto: "Que los mande ya a dirigir solos, sin acompañarlos ni verlos más.", explica: "Jesús primero los tuvo con él y después los envió: primero estar con él; después ser enviados." },
              { texto: "Que pase tiempo con ellos solo si alguno se lo pide por escrito.", explica: "En el modelo de Jesús la cercanía es parte de la formación: estableció a doce para que estuviesen con él." },
            ],
            apoyo: "Los líderes se forman en la cercanía, no solo en las clases",
            ref: "Marcos 3:14",
            explica: "Jesús formó líderes estando con ellos y enviándolos: los líderes se forman en la cercanía, no solo en las clases.",
          },
          {
            caso: "Un líder de jóvenes te dice: Hace un año que mis tres aprendices me acompañan a todo, pero todavía no les doy nada que hacer.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que ahora los envíe: después de estar con él, viene el envío.", bien: true, explica: "Así formó Jesús a los doce: los estableció para que estuviesen con él, y para enviarlos a predicar." },
              { texto: "Que siga igual unos años más, hasta que ya no se equivoquen en nada.", explica: "Primero estar con él; después ser enviados: la formación no se queda solo en acompañar." },
              { texto: "Que deje de llevarlos con él, porque estar cerca no sirve para formar.", explica: "Los líderes se forman en la cercanía: estar con ellos es la primera parte del modelo de Jesús." },
              { texto: "Que los mande a otra iglesia para que allí les den una tarea a cada uno.", explica: "En el modelo de Jesús, el mismo que los tuvo cerca es el que los envió a predicar." },
            ],
            apoyo: "Jesús formó líderes estando con ellos y enviándolos",
            ref: "Marcos 3:14",
            explica: "Jesús formó líderes estando con ellos y enviándolos: primero estar con él; después ser enviados.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "En 2 Timoteo 2:2, ¿a quiénes encarga Timoteo lo que oyó, y a quiénes enseñarán ellos? Toca las palabras que lo dicen.",
            texto: "esto encarga a [[hombres fieles]] que sean idóneos para enseñar también a [[otros]]",
            apoyo: "En un solo versículo hay cuatro generaciones: Pablo, Timoteo, los hombres fieles y los otros",
            ref: "2 Timoteo 2:2",
            explica: "Timoteo encarga lo que oyó de Pablo a hombres fieles, y ellos serán idóneos para enseñar también a otros: son la tercera y la cuarta generación.",
          },
          {
            consigna: "Para que la cadena de 2 Timoteo 2:2 siga, ¿qué deben ser los fieles? Toca las palabras que lo dicen.",
            texto: "esto encarga a hombres fieles que sean [[idóneos para enseñar]] también a otros",
            apoyo: "2 Timoteo 2:2 muestra cuatro generaciones que se forman unas a otras: Pablo, Timoteo, los hombres fieles y los otros",
            ref: "2 Timoteo 2:2",
            explica: "Los fieles deben ser idóneos para enseñar también a otros: así la enseñanza pasa de Pablo a Timoteo, de Timoteo a los fieles y de los fieles a otros.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena las cuatro generaciones de 2 Timoteo 2:2, de la primera a la última.",
            pasos: [
              "Pablo, el que enseñó primero",
              "Timoteo, el que oyó a Pablo",
              "Los hombres fieles, a quienes Timoteo encarga lo que oyó",
              "Los otros, a quienes enseñarán los fieles",
            ],
            apoyo: "En un solo versículo hay cuatro generaciones: Pablo, Timoteo, los hombres fieles y los otros",
            ref: "2 Timoteo 2:2",
            explica: "Pablo enseñó ante muchos testigos; Timoteo lo oyó y lo encarga a hombres fieles, que serán idóneos para enseñar también a otros: cuatro generaciones que se forman unas a otras.",
          },
          {
            consigna: "Como en 2 Timoteo 2:2, tu pastor te formó a ti. Ordena la cadena, de la primera generación a la última.",
            pasos: [
              "Tu pastor, que te enseñó a ti",
              "Tú, que oíste lo que te enseñó",
              "Los hermanos fieles a quienes encargas lo que oíste",
              "Los otros, a quienes ellos enseñarán",
            ],
            apoyo: "2 Timoteo 2:2 muestra cuatro generaciones que se forman unas a otras: Pablo, Timoteo, los hombres fieles y los otros",
            ref: "2 Timoteo 2:2",
            explica: "Es la misma cadena de 2 Timoteo 2:2: Pablo enseñó a Timoteo, Timoteo lo encargó a hombres fieles y ellos lo enseñarían también a otros. Así se forman unas generaciones a otras.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es sumar o es multiplicar? Lleva cada frase a su grupo.",
            grupos: ["Así se suma", "Así se multiplica"],
            frases: [
              { texto: "Hacerlo todo uno mismo", grupo: 0 },
              { texto: "Ganar a una persona por año: en diez años, diez", grupo: 0 },
              { texto: "Dejar un vacío cuando el líder se va", grupo: 0 },
              { texto: "Formar a otros que formen a otros", grupo: 1 },
              { texto: "Que cada año cada uno forme a otra persona que hace lo mismo", grupo: 1 },
              { texto: "Dejar una obra que sigue sin el líder", grupo: 1 },
              { texto: "Reunirse con tres o cuatro que después formarán cada uno su grupo", grupo: 1 },
            ],
            apoyo: "Sumar es hacerlo todo uno mismo; multiplicar es formar a otros que formen a otros, por ejemplo en grupos de tres o cuatro",
            explica: "Sumar es hacerlo todo uno mismo, y deja un vacío cuando el líder se va. Multiplicar es formar a otros que formen a otros: el grupo se duplica cada año y la obra sigue sin el líder.",
          },
          {
            consigna: "¿Este líder suma o multiplica? Lleva cada frase a su grupo.",
            grupos: ["Este líder suma", "Este líder multiplica"],
            frases: [
              { texto: "Predica, visita y organiza todo él solo", grupo: 0 },
              { texto: "En diez años ganó a diez personas, una por año", grupo: 0 },
              { texto: "Cuando se va, su ministerio queda vacío", grupo: 0 },
              { texto: "Forma a otros que después forman a otros", grupo: 1 },
              { texto: "Se reúne con tres o cuatro que se comprometen a formar su propio grupo", grupo: 1 },
              { texto: "Otros siguen sirviendo cuando él no está", grupo: 1 },
              { texto: "Empezó despacio, y su obra llegó mucho más lejos", grupo: 1 },
            ],
            apoyo: "La multiplicación empieza despacio, pero llega mucho más lejos",
            explica: "El que lo hace todo solo suma: su obra llega hasta donde él alcanza y deja un vacío cuando se va. El que forma a otros que formen a otros multiplica: empieza despacio, pero llega mucho más lejos.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 2,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Sumar es hacerlo todo uno mismo; multiplicar es formar a otros que formen a otros, por ejemplo en grupos de tres o cuatro",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n5-liderazgo-2-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué diferencia hay entre sumar y multiplicar en el ministerio? Usa el ejemplo de los diez años.",
              ideas: [
                { id: "sumar", peso: 50, texto: "Sumar es hacerlo todo uno mismo: quien gana a una persona cada año, en diez años habrá sumado diez.", formas: ["(hace|hacer|hago|haga|hacia|hacerlo|hacemos) todo", "todo (solo|sola)", "uno mismo", "gan* una persona", "gan* (uno|una) (cada|por|al) ano", "(sumado|suma|sumar|sumaria|tiene|tendra|habra|hay|son|serian|seran) diez", "diez en diez"] },
                { id: "multiplicar", peso: 50, texto: "Multiplicar es formar a otros que formen a otros: el grupo se duplica cada año y en diez años son más de mil.", formas: ["form* a otros", "form* a otro", "ensen* a otros", "otros que (formen|forman|formaran|ensenen|ensenan|hagan|hacen)", "duplic*", "mas de mil", "cada uno form*"] },
              ],
              errores: [
                { id: "multiplicar-solo", texto: "Multiplicar no es hacerlo todo uno mismo: es formar a otros que formen a otros.", formas: ["multiplicar es (hacer|hacerlo|hacerlos)", "multiplica (el|quien|cuando) (hace|lo)"], anula: "multiplicar" },
                { id: "sumar-formar", texto: "Sumar no es formar a otros: es hacerlo todo uno mismo.", formas: ["sumar es (formar|ensenar)", "suma (el|quien) (forma|ensena)"], anula: "sumar" },
              ],
              modelo: "Sumar es hacerlo todo uno mismo: si gano a una persona cada año, en diez años habré sumado diez. Multiplicar es formar a otros que formen a otros: el grupo se duplica cada año y en diez años son más de mil.",
            },
          },
          {
            apoyo: "El que multiplica deja una obra que sigue sin él",
            ref: "2 Timoteo 2:2",
            clave: {
              id: "pr-n5-liderazgo-2-1-a7-2",
              tipo: "corta",
              pregunta: "Un líder dice: Prefiero hacerlo todo yo. ¿Qué deja ese líder cuando se va, y qué deja el que multiplica?",
              ideas: [
                { id: "vacio", peso: 50, texto: "El líder que no forma a otros deja un vacío cuando se va.", formas: ["vacio", "hueco", "(se|todo) (acaba|termina|cae|detiene|derrumba|pierde)", "no (queda|hay) nadie", "nadie (sigue|siga|continua|continue|queda)"] },
                { id: "obra", peso: 50, texto: "El que multiplica deja una obra que sigue sin él: otros siguen sirviendo cuando él no está.", formas: ["obra que (sigue|continua)", "sigue sin (el|ella|mi|ti)", "siguen sirviendo", "sigan sirviendo", "(sigue|continua|siga|continue|sigan|siguen|continuan|continuen) (la|su) (obra|ministerio|trabajo)", "otros (siguen|sigan|continuan|continuen)", "(deja|dejo) (otros|lideres|personas|gente|a otros) (formados|preparados)"] },
              ],
              modelo: "El que lo hace todo solo deja un vacío cuando se va, porque no formó a nadie. El que multiplica forma a otros y deja una obra que sigue sin él: otros siguen sirviendo cuando él no está.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. Reconocer y formar líderes
    "n5-liderazgo-2-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué vio Bernabé en Saulo, el antiguo perseguidor?", reverso: "A un futuro apóstol.", apoyo: "Bernabé vio en Saulo, el antiguo perseguidor, a un futuro apóstol" },
              { frente: "¿Cómo se ve el carácter probado de un líder en formación?", reverso: "Es fiel en lo poco.", apoyo: "Carácter probado: es fiel en lo poco (Lucas 16:10)" },
              { frente: "¿Cómo se ve la disposición para aprender?", reverso: "Recibe la corrección sin ofenderse.", apoyo: "Disposición para aprender: recibe la corrección sin ofenderse" },
              { frente: "¿Por qué siguen otros al que ama a las personas?", reverso: "Porque los cuida.", apoyo: "Amor por las personas: otros lo siguen porque los cuida" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Por dónde empieza formar líderes?", reverso: "Por saber mirar.", apoyo: "Formar líderes empieza por saber mirar" },
              { frente: "¿Cómo se ve el corazón de siervo?", reverso: "Sirve aunque nadie lo vea.", apoyo: "Corazón de siervo: sirve aunque nadie lo vea" },
              { frente: "Además del carácter, ¿qué dones se miran en un líder en formación?", reverso: "Los dones que la iglesia reconoce.", apoyo: "Dones que la iglesia reconoce" },
              { frente: "Samuel creyó que Eliab sería el rey. ¿Qué le dijo Dios?", reverso: "Que él mira el corazón.", apoyo: "Samuel creyó que Eliab sería el rey por su aspecto, pero Dios le dijo que él mira el corazón" },
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
            consigna: "Une cada señal de un líder en formación con cómo se ve.",
            pares: [
              ["Carácter probado", "Es fiel en lo poco"],
              ["Disposición para aprender", "Recibe la corrección sin ofenderse"],
              ["Corazón de siervo", "Sirve aunque nadie lo vea"],
              ["Amor por las personas", "Otros lo siguen porque los cuida"],
            ],
            apoyo: "Un líder en formación muestra carácter probado, disposición para aprender, corazón de siervo y amor por las personas",
            ref: "Lucas 16:10",
            explica: "El carácter probado se ve en ser fiel en lo poco; la disposición para aprender, en recibir la corrección sin ofenderse; el corazón de siervo, en servir aunque nadie lo vea; y el amor por las personas, en que otros lo siguen porque los cuida.",
          },
          {
            consigna: "Observas a unos jóvenes de tu iglesia. ¿Qué señal muestra cada uno? Une cada ejemplo con su señal.",
            pares: [
              ["Cumple bien cada tarea pequeña que se le da", "Carácter probado"],
              ["Le corrigen un error, escucha y cambia sin enojarse", "Disposición para aprender"],
              ["Limpia el salón después del culto, sin que nadie lo note", "Corazón de siervo"],
              ["Los adolescentes lo buscan, porque él se ocupa de ellos", "Amor por las personas"],
              ["Los hermanos ven que Dios lo usa cuando enseña", "Dones que la iglesia reconoce"],
            ],
            apoyo: "Mira a las personas como Dios las mira: por su corazón y por lo que pueden llegar a ser",
            explica: "Ser fiel en lo poco muestra carácter probado; recibir la corrección sin ofenderse, disposición para aprender; servir aunque nadie lo vea, corazón de siervo; que otros lo sigan porque los cuida, amor por las personas; y los dones, cuando la iglesia los reconoce.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un pastor de jóvenes te dice: Para dirigir la alabanza escogí al que mejor canta y al que todos quieren. De su carácter no sé mucho.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que mire también su carácter: no se escoge líder solo por talento o simpatía.", bien: true, explica: "Samuel creyó que Eliab sería el rey por su aspecto, pero Dios mira el corazón: no escojas líderes solo por su talento o su simpatía." },
              { texto: "Que está bien: si canta bien y cae bien, ya tiene lo que necesita un líder.", explica: "El talento y la simpatía no bastan: un líder en formación muestra carácter probado, disposición para aprender, corazón de siervo y amor por las personas." },
              { texto: "Que le dé la tarea ya y que, si un día falla, entonces revise su carácter.", explica: "Pablo pide que los que van a servir «sean sometidos a prueba primero»: el carácter se mira antes." },
              { texto: "Que mejor escoja al que tenga más años en la iglesia, aunque no sirva a nadie.", explica: "Los años no están en la lista de señales: el corazón de siervo sirve aunque nadie lo vea." },
            ],
            apoyo: "No escojas líderes solo por su talento o su simpatía",
            ref: "1 Samuel 16:7",
            explica: "Dios mira el corazón: no escojas líderes solo por su talento o su simpatía, sino por las señales de un líder en formación.",
          },
          {
            caso: "Un coordinador de células que acompañas te dice: Tengo dos candidatos para ayudarme. Uno es muy simpático; el otro es callado, pero fiel en lo poco.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que mire el corazón: ser fiel en lo poco pesa más que la simpatía.", bien: true, explica: "El carácter probado se ve en ser fiel en lo poco, y Dios mira el corazón: no se escoge solo por la simpatía." },
              { texto: "Que escoja al simpático, porque la gente sigue a quien le cae bien.", explica: "Otros siguen al líder porque los cuida, no por su simpatía: no escojas líderes solo por su simpatía." },
              { texto: "Que escoja al que hable mejor en público, aunque no sea fiel en lo poco.", explica: "No escojas líderes solo por su talento: el carácter probado es ser fiel en lo poco." },
              { texto: "Que no escoja a ninguno hasta encontrar a alguien que ya sepa hacerlo todo.", explica: "Un líder se forma poco a poco: la responsabilidad se da poco a poco, y se observa cómo la maneja cada uno." },
            ],
            apoyo: "Mira a las personas como Dios las mira: por su corazón y por lo que pueden llegar a ser",
            ref: "1 Samuel 16:7",
            explica: "Formar líderes empieza por saber mirar: el carácter probado, ser fiel en lo poco, pesa más que la simpatía, porque Dios mira el corazón.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena los cuatro pasos para formar a un líder, del primero al último.",
            pasos: ["Yo lo hago y tú miras", "Yo lo hago y tú me ayudas", "Tú lo haces y yo te ayudo", "Tú lo haces y yo miro; después, tú formas a otro"],
            apoyo: "Se forma poco a poco, con responsabilidades que crecen: yo lo hago y tú miras, hasta que tú lo haces y yo miro",
            ref: "Marcos 6:7, 30",
            explica: "Se forma poco a poco: yo lo hago y tú miras; yo lo hago y tú me ayudas; tú lo haces y yo te ayudo; y tú lo haces y yo miro. Después, tú formas a otro.",
          },
          {
            consigna: "Vas a formar a un joven para que dirija la oración del culto. Ordena los pasos, del primero al último.",
            pasos: [
              "Tú diriges la oración y él mira",
              "Tú diriges la oración y él te ayuda",
              "Él dirige la oración y tú lo ayudas",
              "Él la dirige y tú miras; después, él forma a otro",
            ],
            apoyo: "Describir los pasos para formar a un líder, de mirar a hacer",
            explica: "Son los cuatro pasos de la lección: primero él mira, después te ayuda, después lo hace con tu ayuda y al final lo hace mientras tú miras. Después, él forma a otro.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Quien falló puede ser restaurado y volver a ser útil",
            ref: "2 Timoteo 4:11",
            titulo: "El que dejó el campamento",
            relato: [
              "Eres pastor de jóvenes. El año pasado, Esteban se comprometió a ayudar en el campamento y lo dejó a mitad de camino, sin avisar.",
              "Hoy te pide perdón y quiere volver a servir. Algunos líderes dicen que ya no se puede confiar en él.",
              "Te acuerdas de Bernabé con Juan Marcos, y piensas cómo seguir.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te enseña la historia de Juan Marcos para este caso?",
                opciones: [
                  { texto: "Que quien falló puede ser restaurado y volver a ser útil.", bien: true, explica: "Años después, Pablo escribió: «Toma a Marcos y tráele contigo, porque me es útil para el ministerio»." },
                  { texto: "Que el que abandona una vez ya no puede volver a servir.", explica: "Quien falló puede ser restaurado y volver a ser útil, como Marcos." },
                  { texto: "Que Pablo nunca quiso volver a trabajar con Marcos en su vida.", explica: "Años después, Pablo reconoció que Marcos le era útil para el ministerio." },
                  { texto: "Que hay que hacer como si nada hubiera pasado y darle todo.", explica: "La segunda oportunidad no salta los pasos: la responsabilidad se da poco a poco." },
                ],
                apoyo: "Quien falló puede ser restaurado y volver a ser útil",
                explica: "Juan Marcos había dejado a Pablo y a Bernabé en el primer viaje, pero años después Pablo dijo que le era útil para el ministerio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo le das otra vez una responsabilidad?",
                opciones: [
                  { texto: "Poco a poco, y observando cómo maneja cada una.", bien: true, explica: "Pablo pide que los que van a servir «sean sometidos a prueba primero»: la responsabilidad se da poco a poco." },
                  { texto: "Le das el campamento entero, para que demuestre que cambió.", explica: "La responsabilidad se da poco a poco, y se observa cómo la maneja cada uno." },
                  { texto: "No le das ninguna hasta que pasen cinco años sin que falle.", explica: "Bernabé dio a Marcos una segunda oportunidad: el que forma líderes da segundas oportunidades." },
                  { texto: "Le das una tarea y no vuelves a ver cómo la hace.", explica: "La responsabilidad se da poco a poco, pero también se observa cómo la maneja." },
                ],
                apoyo: "La responsabilidad se da poco a poco, y se observa cómo la maneja cada uno",
                explica: "Los que van a servir son sometidos a prueba primero: la responsabilidad se da poco a poco, y se observa cómo la maneja cada uno.",
              },
              {
                tipo: "situacion",
                pregunta: "Esteban vuelve a ayudar a tu lado. ¿Hasta dónde lo acompañas en su formación?",
                opciones: [
                  { texto: "Hasta que él lo haga y tú solo mires; después, que forme a otro.", bien: true, explica: "Los pasos van de mirar a hacer: tú lo haces y yo miro; después, tú formas a otro." },
                  { texto: "Hasta que te ayude bien una vez; después lo dejas solo para siempre.", explica: "Después de ayudar vienen dos pasos más: tú lo haces y yo te ayudo, y tú lo haces y yo miro." },
                  { texto: "Siempre a tu lado: nunca debería hacer nada sin que tú lo hagas con él.", explica: "La meta es que él lo haga: tú lo haces y yo miro; después, tú formas a otro." },
                  { texto: "Hasta el campamento; después ya no hace falta seguir formándolo.", explica: "El último paso no termina en él: después, tú formas a otro." },
                ],
                apoyo: "Tú lo haces y yo miro; después, tú formas a otro",
                explica: "Se forma poco a poco, con responsabilidades que crecen, hasta que él lo hace y tú miras; y después él forma a otro.",
              },
              {
                tipo: "explica",
                apoyo: "Como Bernabé con Saulo y con Marcos, el que forma líderes sabe ver lo que la persona puede llegar a ser y da segundas oportunidades",
                clave: {
                  id: "pr-n5-liderazgo-2-2-a5-1",
                  tipo: "corta",
                  pregunta: "¿Qué les dirás a los líderes que ya no confían en Esteban? Usa el ejemplo de Juan Marcos.",
                  ideas: [
                    { id: "restaurar", peso: 50, texto: "Quien falló puede ser restaurado y volver a ser útil.", formas: ["restaur*", "volver a ser util", "vuelva a ser util", "puede volver", "segunda* oportunidad*", "otra oportunidad", "puede ser util", "ser util otra vez"] },
                    { id: "marcos", peso: 50, texto: "Marcos dejó a Pablo y a Bernabé, pero años después Pablo escribió que le era útil para el ministerio.", formas: ["anos despues", "toma a marcos", "util para el ministerio", "(le|me) (era|es|fue) util", "pablo (pidio|llamo|escribio|dijo|reconocio)", "bernabe (dio|confio|llevo)"] },
                  ],
                  errores: [
                    { id: "sin-vuelta", texto: "Quien falló puede ser restaurado y volver a ser útil.", formas: ["no (puede|podra|debe) volver", "nunca (puede|podra|debe) volver"], anula: "restaurar" },
                  ],
                  modelo: "Les diré que quien falló puede ser restaurado y volver a ser útil. Juan Marcos dejó a Pablo y a Bernabé en el primer viaje, pero años después Pablo escribió que Marcos le era útil para el ministerio.",
                },
              },
            ],
          },
          {
            apoyo: "Bernabé vio en Saulo, el antiguo perseguidor, a un futuro apóstol",
            ref: "Hechos 9:26-27",
            titulo: "El que antes perseguía",
            relato: [
              "Eres líder de líderes en tu iglesia. Hace un año se convirtió Rubén, que antes se burlaba de los creyentes y hasta amenazó a algunos.",
              "Hoy sirve con fidelidad en lo poco y quiere aprender a dirigir un grupo, pero varios hermanos todavía le temen.",
              "Recuerdas lo que hizo Bernabé con Saulo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué hizo Bernabé cuando los discípulos de Jerusalén todavía temían a Saulo?",
                opciones: [
                  { texto: "Lo presentó a los apóstoles.", bien: true, explica: "Bernabé lo presentó a los apóstoles (Hechos 9:26-27), y más tarde fue a buscarlo a Tarso y lo llevó a Antioquía." },
                  { texto: "Le pidió que esperara solo en Tarso unos diez años.", explica: "Bernabé no lo dejó esperando: lo presentó a los apóstoles, y más tarde fue a buscarlo a Tarso." },
                  { texto: "Lo dejó de lado hasta que los discípulos perdieran el miedo.", explica: "Cuando los discípulos todavía temían a Saulo, Bernabé lo presentó a los apóstoles." },
                  { texto: "Lo mandó a predicar solo, sin presentarlo a nadie.", explica: "Bernabé lo presentó a los apóstoles y después enseñó con él todo un año en Antioquía." },
                ],
                apoyo: "Cuando los discípulos de Jerusalén todavía temían a Saulo, Bernabé lo presentó a los apóstoles (Hechos 9:26-27)",
                explica: "Bernabé vio en Saulo, el antiguo perseguidor, a un futuro apóstol, y lo presentó a los apóstoles cuando los demás todavía le temían.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué miras en Rubén para saber si es un líder en formación?",
                opciones: [
                  { texto: "Su carácter, si aprende, si sirve y si ama a las personas.", bien: true, explica: "Un líder en formación muestra carácter probado, disposición para aprender, corazón de siervo y amor por las personas." },
                  { texto: "Solo lo que hizo antes de convertirse, para no correr riesgos.", explica: "Bernabé vio en Saulo, el antiguo perseguidor, a un futuro apóstol: el que forma líderes sabe ver lo que la persona puede llegar a ser." },
                  { texto: "Solo si habla bien en público y si cae bien a los demás.", explica: "No escojas líderes solo por su talento o su simpatía." },
                  { texto: "Cuánto tiempo lleva en la iglesia, y nada más que eso.", explica: "Las señales de la lección no hablan del tiempo en la iglesia: hablan de carácter, de aprender, de servir y de amar." },
                ],
                apoyo: "Un líder en formación muestra carácter probado, disposición para aprender, corazón de siervo y amor por las personas",
                explica: "Formar líderes empieza por saber mirar: se buscan las señales de un líder en formación, no su pasado ni su apariencia.",
              },
              {
                tipo: "situacion",
                pregunta: "Unos hermanos te dicen que Rubén nunca va a cambiar del todo. ¿Qué les respondes?",
                opciones: [
                  { texto: "Que miren lo que Rubén puede llegar a ser, como Bernabé con Saulo.", bien: true, explica: "Como Bernabé con Saulo, el que forma líderes sabe ver lo que la persona puede llegar a ser." },
                  { texto: "Que tienen razón, y que Rubén se quede sin servir para siempre.", explica: "El que forma líderes da segundas oportunidades." },
                  { texto: "Que no importa lo que piensen: Rubén dirigirá un grupo desde mañana.", explica: "La responsabilidad se da poco a poco, y se observa cómo la maneja cada uno." },
                  { texto: "Que lo vigilen en secreto y le cuenten a todos lo que hizo antes.", explica: "Bernabé no lo dejó solo: lo presentó a los apóstoles y después lo llevó a Antioquía." },
                ],
                apoyo: "Mira a las personas como Dios las mira: por su corazón y por lo que pueden llegar a ser",
                explica: "Mira a las personas como Dios las mira: por su corazón y por lo que pueden llegar a ser.",
              },
              {
                tipo: "explica",
                apoyo: "el que forma líderes sabe ver lo que la persona puede llegar a ser y da segundas oportunidades",
                clave: {
                  id: "pr-n5-liderazgo-2-2-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué te enseña Bernabé para acompañar a Rubén? Escribe dos cosas que harás.",
                  ideas: [
                    { id: "ver", peso: 50, texto: "Mirar lo que Rubén puede llegar a ser, como Bernabé vio en Saulo a un futuro apóstol.", formas: ["llegar a ser", "lo que (puede|podra|podria) ser", "futuro apostol", "lo que dios (puede|podra|quiere)", "(vio|ve|ver|veo|mira|mirar|miro) futuro", "su corazon", "saber mirar"] },
                    { id: "acompanar", peso: 50, texto: "Presentarlo y acompañarlo, como Bernabé presentó a Saulo a los apóstoles y lo llevó a enseñar con él en Antioquía.", formas: ["present*", "acompan*", "llev* (con|conmigo)", "a mi lado", "ensen* con", "tarso", "antioquia", "poco a poco", "segunda* oportunidad*", "otra oportunidad"] },
                  ],
                  modelo: "Voy a mirar lo que Rubén puede llegar a ser, como Bernabé vio en Saulo a un futuro apóstol. Y lo voy a presentar y acompañar, como Bernabé lo presentó a los apóstoles y lo llevó a enseñar con él.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "linea",
        versiones: [
          {
            consigna: "Bernabé dio su oportunidad a Saulo y a Marcos. Ordena los hechos en el tiempo, del primero al último.",
            eventos: [
              { texto: "Bernabé presenta a Saulo a los apóstoles, que todavía le temen", fecha: "Hechos 9:26-27" },
              { texto: "Bernabé va a buscar a Saulo a Tarso y lo lleva a Antioquía", fecha: "Más tarde" },
              { texto: "Bernabé y Saulo enseñan a mucha gente con la iglesia de Antioquía", fecha: "Todo un año" },
              { texto: "Pablo y Bernabé se separan por causa de Juan Marcos", fecha: "Hechos 15:37-39" },
              { texto: "Pablo escribe de Marcos: «me es útil para el ministerio»", fecha: "Años después" },
            ],
            apoyo: "Como Bernabé con Saulo y con Marcos, el que forma líderes sabe ver lo que la persona puede llegar a ser y da segundas oportunidades",
            explica: "Bernabé presentó a Saulo a los apóstoles, más tarde lo buscó en Tarso y enseñaron todo un año en Antioquía. Después Pablo y Bernabé se separaron por Juan Marcos, pero años después Pablo escribió que Marcos le era útil.",
          },
          {
            consigna: "Sigue la historia de Juan Marcos y de Saulo con Bernabé. Ordena los hechos, del primero al último.",
            eventos: [
              { texto: "Bernabé recibe a Saulo cuando los discípulos le tienen miedo", fecha: "Hechos 9:26-27" },
              { texto: "Juan Marcos deja a Pablo y a Bernabé", fecha: "En el primer viaje" },
              { texto: "Bernabé y Pablo se separan por causa de Marcos", fecha: "Hechos 15:37-39" },
              { texto: "Pablo pide: «Toma a Marcos y tráele contigo»", fecha: "Años después" },
            ],
            apoyo: "Quien falló puede ser restaurado y volver a ser útil",
            explica: "Bernabé recibió a Saulo cuando otros le temían. Juan Marcos los dejó en el primer viaje, y por él se separaron Pablo y Bernabé; pero años después Pablo pidió a Marcos, porque le era útil para el ministerio.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un líder en formación muestra carácter probado, disposición para aprender, corazón de siervo y amor por las personas",
            ref: "Lucas 16:10",
            clave: {
              id: "pr-n5-liderazgo-2-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué señales muestra un líder en formación? Nombra tres y di cómo se ve cada una.",
              ideas: [
                { id: "caracter", peso: 34, texto: "Carácter probado: es fiel en lo poco.", formas: ["caracter", "fiel en lo poco", "fiel en (las|lo) (cosas|poco|pequeno|pequenas)", "fiel*", "en lo poco", "cumpl* (lo|las|cada) (poco|pequenas|tarea)"] },
                { id: "aprender", peso: 33, texto: "Disposición para aprender: recibe la corrección sin ofenderse.", formas: ["aprend*", "correccion", "corrig*", "correg*", "sin ofender*", "sin enojar*"] },
                { id: "siervo", peso: 33, texto: "Corazón de siervo, que sirve aunque nadie lo vea, y amor por las personas, que lo siguen porque los cuida.", formas: ["siervo", "sirve aunque", "aunque nadie (lo|le) (vea|ve|mire)", "amor por las personas", "ama a (las|los) (personas|demas|hermanos|otros)", "los cuida", "cuida a (los|las|otros)", "servicial"] },
              ],
              modelo: "Muestra carácter probado: es fiel en lo poco. Tiene disposición para aprender: recibe la corrección sin ofenderse. Y tiene corazón de siervo, porque sirve aunque nadie lo vea, y ama a las personas, que lo siguen porque los cuida.",
            },
          },
          {
            apoyo: "No escojas líderes solo por su talento o su simpatía",
            ref: "1 Samuel 16:7",
            clave: {
              id: "pr-n5-liderazgo-2-2-a7-2",
              tipo: "corta",
              pregunta: "Samuel creyó que Eliab sería el rey por su aspecto. ¿Qué enseña eso para escoger líderes, y qué debes mirar en ellos?",
              ideas: [
                { id: "corazon", peso: 50, texto: "Dios mira el corazón: no se escoge a los líderes solo por su talento o su simpatía.", formas: ["mira el corazon", "(mira|mirar|miro|mire|mirando|ve|ver|veo|fija|fijarse|conoce) corazon"] },
                { id: "senales", peso: 50, texto: "Hay que mirar las señales de un líder en formación: carácter probado, disposición para aprender, corazón de siervo y amor por las personas.", formas: ["caracter", "fiel en lo poco", "aprend*", "correccion", "corrig*", "siervo", "sirve aunque", "amor por las personas", "los cuida", "senales"] },
              ],
              modelo: "Enseña que Dios mira el corazón: no se escoge a los líderes solo por su talento o su simpatía. Hay que mirar su carácter probado, su disposición para aprender, su corazón de siervo y su amor por las personas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Delegar
    "n5-liderazgo-2-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Desde cuándo y hasta cuándo atendía Moisés al pueblo?", reverso: "Desde la mañana hasta la tarde.", apoyo: "Moisés atendía al pueblo desde la mañana hasta la tarde" },
              { frente: "¿Qué le pasa al líder que no delega?", reverso: "Se agota y frena a los demás.", apoyo: "El líder que no delega se agota y frena a los demás" },
              { frente: "Según Jetro, ¿qué asuntos seguirían llegando a Moisés?", reverso: "Los graves.", apoyo: "Ellas atienden los asuntos pequeños, y los graves llegan a Moisés" },
              { frente: "¿Qué debía enseñar Moisés a todos?", reverso: "Las leyes y el camino por donde deben andar.", apoyo: "Moisés enseña a todos las leyes y el camino por donde deben andar" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Quién le enseñó a Moisés a delegar?", reverso: "Jetro, su suegro.", apoyo: "Jetro enseñó a Moisés a delegar" },
              { frente: "¿Sobre qué grupos debía Moisés poner jefes?", reverso: "Sobre grupos de mil, de cien, de cincuenta y de diez.", apoyo: "Las pone como jefes de grupos de mil, de cien, de cincuenta y de diez" },
              { frente: "¿Qué resultado le anunció Jetro a Moisés si delegaba?", reverso: "Que aliviaría su carga, y otros la llevarían con él.", apoyo: "El resultado lo anunció Jetro: «Así aliviarás la carga de sobre ti, y la llevarán ellos contigo»" },
              { frente: "¿Qué no es delegar, según la lección?", reverso: "Soltar una carga sobre otro y desaparecer.", apoyo: "Delegar no es soltar una carga sobre otro y desaparecer" },
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
            consigna: "Une cada parte del consejo de Jetro con lo que pedía.",
            pares: [
              ["Enseñar a todos", "Las leyes y el camino por donde deben andar"],
              ["Escoger de entre el pueblo", "Personas capaces, temerosas de Dios y de verdad"],
              ["Ponerlas como jefes", "De grupos de mil, de cien, de cincuenta y de diez"],
              ["Los asuntos pequeños", "Los atienden los jefes de cada grupo"],
              ["Los asuntos graves", "Llegan a Moisés"],
            ],
            apoyo: "Jetro enseñó a Moisés a delegar: enseñar a todos, escoger personas capaces y temerosas de Dios, ponerlas sobre grupos y atender solo lo grave",
            ref: "Éxodo 18:17-23",
            explica: "Jetro le aconsejó a Moisés enseñar a todos las leyes y el camino, escoger personas capaces, temerosas de Dios y de verdad, ponerlas como jefes de grupos de mil, de cien, de cincuenta y de diez, y dejar que ellas atiendan lo pequeño mientras lo grave llega a él.",
          },
          {
            consigna: "¿Qué quieren decir las palabras de Jetro? Une cada frase con su sentido.",
            pares: [
              ["«No está bien lo que haces»", "Moisés lo atendía todo él solo"],
              ["«Desfallecerás del todo, tú»", "El líder que no delega se agota"],
              ["«y también este pueblo que está contigo»", "El que no delega frena a los demás"],
              ["«la llevarán ellos contigo»", "Otros comparten la carga del líder"],
            ],
            apoyo: "El líder que no delega se agota y frena a los demás",
            ref: "Éxodo 18:17-23",
            explica: "Jetro le dijo a Moisés que no estaba bien hacerlo todo solo: desfallecería él y también el pueblo. El líder que no delega se agota y frena a los demás; el que delega comparte la carga con otros.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el consejo de Jetro: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jetro le advirtió a Moisés que el trabajo era demasiado pesado para él.", verdad: true, explica: "Jetro le dijo: «porque el trabajo es demasiado pesado para ti».", apoyo: "porque el trabajo es demasiado pesado para ti", ref: "Éxodo 18:17-18" },
              { texto: "Jetro le aconsejó a Moisés escoger a las personas por su simpatía.", verdad: false, explica: "Le aconsejó escoger personas capaces, temerosas de Dios, de verdad, que aborrezcan la avaricia.", apoyo: "personas capaces, temerosas de Dios, de verdad, que aborrezcan la avaricia", ref: "Éxodo 18:21" },
              { texto: "Según Jetro, los asuntos graves seguirían llegando a Moisés.", verdad: true, explica: "Las personas escogidas atenderían los asuntos pequeños, y los graves llegarían a Moisés.", apoyo: "Ellas atienden los asuntos pequeños, y los graves llegan a Moisés", ref: "Éxodo 18:22" },
            ],
          },
          {
            consigna: "Sobre Moisés y el consejo de Jetro: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Jetro le aconsejó a Moisés que siguiera atendiendo él solo todos los asuntos.", verdad: false, explica: "Jetro le dijo: «No está bien lo que haces». El líder que no delega se agota y frena a los demás.", apoyo: "El líder que no delega se agota y frena a los demás", ref: "Éxodo 18:17-18" },
              { texto: "Jetro le aconsejó a Moisés enseñar a todos las leyes y el camino por donde deben andar.", verdad: true, explica: "Es la primera parte de su consejo, antes de escoger y poner a los jefes.", apoyo: "Moisés enseña a todos las leyes y el camino por donde deben andar", ref: "Éxodo 18:20" },
              { texto: "Según Jetro, al delegar Moisés ya no tendría que responder por nada.", verdad: false, explica: "Los asuntos graves seguirían llegando a Moisés: delegar no es abandonar, y el líder responde por el resultado.", apoyo: "El líder sigue cerca, enseña, apoya y responde por el resultado" },
              { texto: "Jetro le anunció a Moisés que, al delegar, aliviaría su carga.", verdad: true, explica: "Le dijo: «Así aliviarás la carga de sobre ti, y la llevarán ellos contigo».", apoyo: "El resultado lo anunció Jetro: «Así aliviarás la carga de sobre ti, y la llevarán ellos contigo»", ref: "Éxodo 18:22" },
            ],
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo delegaron los apóstoles en Hechos 6 y cuál fue el resultado.",
            texto: "Los apóstoles delegaron el servicio de las [[mesas]] y siguieron en la [[oración]] y en el ministerio de la palabra; el resultado fue que la palabra del Señor [[crecía]].",
            distractores: ["ofrendas", "cocina", "faltaba"],
            errores: {
              ofrendas: "Los apóstoles delegaron el servicio de las mesas: la atención de las viudas que eran desatendidas.",
              cocina: "Los apóstoles no dejaron la palabra para servir a las mesas: siguieron en la oración y en el ministerio de la palabra.",
              faltaba: "El resultado fue que «crecía la palabra del Señor».",
            },
            apoyo: "En Hechos 6, los apóstoles delegaron el servicio de las mesas y la palabra del Señor crecía",
            ref: "Hechos 6:1-7",
            explica: "Cuando las viudas de los griegos eran desatendidas, los apóstoles delegaron el servicio de las mesas y siguieron en la oración y en el ministerio de la palabra. El resultado: «crecía la palabra del Señor».",
          },
          {
            consigna: "Completa a quiénes escogió la iglesia en Hechos 6 y para qué.",
            texto: "Para atender a las [[viudas]] desatendidas, la iglesia escogió a [[siete]] de buen testimonio, llenos del Espíritu Santo y de [[sabiduría]].",
            distractores: ["visitas", "doce", "riquezas"],
            errores: {
              visitas: "Las que eran desatendidas eran las viudas de los griegos.",
              doce: "La iglesia escogió a siete para ese servicio.",
              riquezas: "Debían ser «de buen testimonio, llenos del Espíritu Santo y de sabiduría».",
            },
            apoyo: "Cuando las viudas de los griegos eran desatendidas",
            ref: "Hechos 6:1-7",
            explica: "Cuando las viudas de los griegos eran desatendidas, la iglesia escogió a siete «de buen testimonio, llenos del Espíritu Santo y de sabiduría», y los apóstoles siguieron en la oración y en el ministerio de la palabra.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Cómo se delega bien? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "lider", texto: "El líder que delega", x: 50, y: 10 },
              { id: "persona", texto: "La persona adecuada", x: 15, y: 38 },
              { id: "espera", texto: "Lo que se espera", x: 85, y: 38 },
              { id: "trabajo", texto: "El trabajo hecho", x: 50, y: 62 },
              { id: "autoridad", texto: "La autoridad para hacerlo", x: 15, y: 88 },
              { id: "fechas", texto: "Fechas acordadas", x: 85, y: 88 },
            ],
            enlaces: [
              { de: "lider", a: "persona", relacion: "delega en" },
              { de: "lider", a: "espera", relacion: "explica con claridad" },
              { de: "lider", a: "autoridad", relacion: "da también" },
              { de: "lider", a: "fechas", relacion: "pide cuentas en" },
              { de: "lider", a: "trabajo", relacion: "reconoce" },
            ],
            distractores: ["suelta y olvida", "esconde"],
            apoyo: "Delegar bien es dar la tarea con claridad y autoridad, acompañar y pedir cuentas",
            explica: "Para delegar bien, el líder delega en la persona adecuada, explica con claridad qué se espera, da también la autoridad para hacerlo, pide cuentas en fechas acordadas y reconoce el trabajo.",
          },
          {
            consigna: "Delegar no es abandonar. Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "lider", texto: "El líder que delega", x: 50, y: 10 },
              { id: "otro", texto: "Quien recibe la tarea", x: 15, y: 50 },
              { id: "resultado", texto: "El resultado", x: 85, y: 50 },
              { id: "autoridad", texto: "La autoridad, no solo la tarea", x: 28, y: 90 },
              { id: "cuentas", texto: "Las cuentas, en fechas acordadas", x: 75, y: 90 },
            ],
            enlaces: [
              { de: "lider", a: "otro", relacion: "enseña y apoya a" },
              { de: "lider", a: "resultado", relacion: "responde por" },
              { de: "lider", a: "autoridad", relacion: "da también" },
              { de: "lider", a: "cuentas", relacion: "pide" },
            ],
            distractores: ["desaparece de", "suelta la carga en"],
            apoyo: "El líder sigue cerca, enseña, apoya y responde por el resultado",
            explica: "Delegar no es soltar una carga sobre otro y desaparecer: el líder enseña y apoya a quien recibe la tarea, le da también la autoridad, pide cuentas en fechas acordadas y responde por el resultado.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Explica con claridad qué se espera, para cuándo y con qué recursos",
            ref: "Éxodo 18:21",
            titulo: "Las visitas a los enfermos",
            relato: [
              "Eres pastor de una iglesia que creció. Visitas tú solo a todos los enfermos, y ya no te alcanza el tiempo para orar ni para preparar la enseñanza.",
              "Decides delegar las visitas. En la iglesia hay un hermano lleno de misericordia, fiel desde hace años, que ya te acompaña a visitar.",
              "Te propones delegar bien, como enseña la lección.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿En quién delegas las visitas?",
                opciones: [
                  { texto: "En el hermano que ya visita contigo, por su carácter y sus dones.", bien: true, explica: "Delega en la persona adecuada, según su carácter y sus dones." },
                  { texto: "En el primero que levante la mano el domingo, aunque no lo conozcas.", explica: "Se delega en la persona adecuada, según su carácter y sus dones, no en el primero que aparezca." },
                  { texto: "En un joven que busca un lugar, para que se sienta importante.", explica: "Se escogen personas capaces y temerosas de Dios: no se delega para dar importancia a alguien." },
                  { texto: "En nadie: si no vas tú, los enfermos no van a quedar bien atendidos.", explica: "El líder que no delega se agota y frena a los demás." },
                ],
                apoyo: "Delega en la persona adecuada, según su carácter y sus dones",
                explica: "Jetro aconsejó escoger personas capaces y temerosas de Dios, y la lección pide delegar en la persona adecuada, según su carácter y sus dones.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le explicas al hermano?",
                opciones: [
                  { texto: "Qué se espera de él, para cuándo y con qué recursos cuenta.", bien: true, explica: "Explica con claridad qué se espera, para cuándo y con qué recursos." },
                  { texto: "Nada: él ya sabe visitar, y todo lo demás lo irá viendo él solo.", explica: "Delegar no es soltar una carga sobre otro y desaparecer: se explica con claridad qué se espera." },
                  { texto: "Que visite a quien quiera, cuando pueda, sin avisarte nada.", explica: "Delegar bien es dar la tarea con claridad: qué se espera, para cuándo y con qué recursos." },
                  { texto: "Todo, pero le pides que no decida nada sin llamarte antes.", explica: "Se da también la autoridad para hacerlo, no solo la tarea." },
                ],
                apoyo: "Explica con claridad qué se espera, para cuándo y con qué recursos",
                explica: "Delegar bien es dar la tarea con claridad: qué se espera, para cuándo y con qué recursos.",
              },
              {
                tipo: "situacion",
                pregunta: "Otro servidor le dice al hermano que no puede decidir a quién visitar sin preguntarte todo a ti. ¿Qué haces?",
                opciones: [
                  { texto: "Aclaras ante todos que el hermano tiene la autoridad para hacerlo.", bien: true, explica: "Da también la autoridad para hacerlo, no solo la tarea: el líder respalda a quien delegó." },
                  { texto: "Le das la razón al servidor: el hermano debe consultarte cada visita.", explica: "Si tiene que consultarlo todo, recibió la tarea pero no la autoridad: se da también la autoridad para hacerlo." },
                  { texto: "No dices nada, para no meterte en un problema que no es tuyo.", explica: "Delegar no es desaparecer: el líder sigue cerca, apoya y responde por el resultado." },
                  { texto: "Le quitas la tarea al hermano para que no haya más roces.", explica: "Quitarle la tarea no ayuda: el líder que no delega se agota y frena a los demás." },
                ],
                apoyo: "Da también la autoridad para hacerlo, no solo la tarea",
                explica: "Delegar bien es dar la tarea con claridad y autoridad: quien recibe la tarea necesita también la autoridad para hacerla.",
              },
              {
                tipo: "explica",
                apoyo: "Acompaña y pide cuentas en fechas acordadas",
                clave: {
                  id: "pr-n5-liderazgo-2-3-a6-1",
                  tipo: "corta",
                  pregunta: "¿Cómo acompañarás al hermano en los próximos meses, para que delegar no sea abandonar?",
                  ideas: [
                    { id: "cuentas", peso: 50, texto: "Acompañarlo y pedirle cuentas en fechas acordadas.", formas: ["pid* cuentas", "rend* cuentas", "fechas acordadas", "(fecha|fechas|dia|dias) (acordad*|fij*)", "cada (semana|mes|quince)", "acompan*", "reun* (con el|cada)"] },
                    { id: "reconocer", peso: 50, texto: "Reconocer su trabajo y corregir con paciencia.", formas: ["reconoc*", "agradec*", "felicit*", "gracias", "elogi*", "valor* (su|el) trabajo", "corrig* con paciencia", "correg* con paciencia", "paciencia"] },
                  ],
                  errores: [
                    { id: "desaparecer", texto: "Delegar no es soltar una carga sobre otro y desaparecer.", formas: ["(lo|le) dejo solo", "me desaparezco", "no (lo|le) (veo|vuelvo|pregunto) mas"], anula: "cuentas" },
                  ],
                  modelo: "Lo voy a acompañar de cerca y le pediré cuentas en fechas acordadas, por ejemplo cada mes. Y voy a reconocer su trabajo delante de la iglesia y a corregirlo con paciencia cuando haga falta.",
                },
              },
            ],
          },
          {
            apoyo: "Delegar no es soltar una carga sobre otro y desaparecer",
            ref: "Hechos 6:1-7",
            titulo: "La comida del retiro",
            relato: [
              "Eres el coordinador del retiro anual de la iglesia. Siempre organizaste tú solo la comida, y el año pasado terminaste agotado y sin tiempo para enseñar.",
              "Este año decides delegar la comida en un equipo, como los apóstoles delegaron el servicio de las mesas.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A quiénes escoges para el equipo de la comida?",
                opciones: [
                  { texto: "A hermanos de buen carácter y con dones para ese servicio.", bien: true, explica: "Delega en la persona adecuada, según su carácter y sus dones, como la iglesia escogió a siete de buen testimonio." },
                  { texto: "A los que tienen más tiempo libre, aunque no los conozcas bien.", explica: "Se delega según el carácter y los dones de cada uno, no solo según el tiempo libre." },
                  { texto: "A tus amigos, para estar tranquilo de que te van a hacer caso.", explica: "En Hechos 6 se escogió a siete de buen testimonio, llenos del Espíritu Santo y de sabiduría: no se escoge por amistad." },
                  { texto: "A cualquiera que se ofrezca: lo importante es no hacerlo tú.", explica: "Delegar no es soltar una carga sobre otro: se delega en la persona adecuada." },
                ],
                apoyo: "Delega en la persona adecuada, según su carácter y sus dones",
                explica: "En Hechos 6 la iglesia escogió a siete de buen testimonio, llenos del Espíritu Santo y de sabiduría: se delega en la persona adecuada, según su carácter y sus dones.",
              },
              {
                tipo: "situacion",
                pregunta: "El equipo te pregunta qué tiene que hacer. ¿Qué le das?",
                opciones: [
                  { texto: "Lo que se espera, para cuándo, los recursos y la autoridad.", bien: true, explica: "Explica con claridad qué se espera, para cuándo y con qué recursos, y da también la autoridad para hacerlo." },
                  { texto: "Solo la lista de compras, y que te llamen para cada decisión.", explica: "Si tienen que llamarte para cada decisión, tienen la tarea pero no la autoridad." },
                  { texto: "Nada más que la fecha del retiro: lo demás que lo adivinen ellos.", explica: "Se explica con claridad qué se espera: delegar no es soltar una carga y desaparecer." },
                  { texto: "La tarea, pero sin dinero ni permiso para comprar nada todavía.", explica: "Sin recursos ni autoridad no pueden hacerlo: se da también la autoridad, no solo la tarea." },
                ],
                apoyo: "Da también la autoridad para hacerlo, no solo la tarea",
                explica: "Delegar bien es dar la tarea con claridad y autoridad: qué se espera, para cuándo, con qué recursos y la autoridad para hacerlo.",
              },
              {
                tipo: "situacion",
                pregunta: "Faltan dos semanas para el retiro. ¿Qué haces?",
                opciones: [
                  { texto: "Te reúnes con el equipo en la fecha acordada para ver cómo van.", bien: true, explica: "Acompaña y pide cuentas en fechas acordadas: el líder sigue cerca." },
                  { texto: "Te desentiendes: ya delegaste, y ahora la comida es problema de ellos.", explica: "Delegar no es soltar una carga sobre otro y desaparecer: el líder sigue cerca y responde por el resultado." },
                  { texto: "Vuelves a hacer tú todas las compras, por si acaso.", explica: "Quitarles la tarea es volver a hacerlo todo solo: el líder que no delega se agota." },
                  { texto: "Esperas al día del retiro para ver si hicieron todo bien.", explica: "Se pide cuentas en fechas acordadas, no solo al final." },
                ],
                apoyo: "Acompaña y pide cuentas en fechas acordadas",
                explica: "El líder sigue cerca, enseña y apoya: acompaña y pide cuentas en fechas acordadas.",
              },
              {
                tipo: "explica",
                apoyo: "Lo que haces tú solo termina contigo; lo que delegas bien, se multiplica",
                clave: {
                  id: "pr-n5-liderazgo-2-3-a6-2",
                  tipo: "corta",
                  pregunta: "Después del retiro, ¿qué haces con el trabajo del equipo, y por qué vale la pena delegar así?",
                  ideas: [
                    { id: "reconocer", peso: 50, texto: "Reconocer el trabajo y corregir con paciencia lo que haga falta.", formas: ["reconoc*", "agradec*", "felicit*", "gracias", "elogi*", "valor* (su|el) trabajo", "corrig*", "correg*", "paciencia"] },
                    { id: "multiplica", peso: 50, texto: "Porque lo que delegas bien se multiplica, y el líder no se agota: otros llevan la carga con él.", formas: ["multiplic*", "agot*", "alivi*", "(la|mi|su|nuestra) carga", "termina conmigo", "otros (crecen|aprenden|sirven)"] },
                  ],
                  modelo: "Voy a reconocer el trabajo del equipo y a corregir con paciencia lo que haga falta. Vale la pena porque lo que delego bien se multiplica: ellos llevan la carga conmigo y yo no me agoto.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "En Hechos 6, los apóstoles delegaron el servicio de las mesas y la palabra del Señor crecía",
            ref: "Hechos 6:1-7",
            clave: {
              id: "pr-n5-liderazgo-2-3-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo delegaron los apóstoles en Hechos 6, y cuál fue el resultado?",
              ideas: [
                { id: "delegaron", peso: 40, texto: "Delegaron el servicio de las mesas: la iglesia escogió a siete de buen testimonio, llenos del Espíritu Santo y de sabiduría.", formas: ["deleg*", "(a|los) siete", "siete (de|hombres|varones|servidores|personas|escogidos|llenos)", "servicio de las mesas", "servir a las mesas", "las mesas", "buen testimonio", "llenos del espiritu", "escog*"] },
                { id: "palabra", peso: 30, negativa: true, texto: "Ellos siguieron en la oración y en el ministerio de la palabra.", formas: ["oracion", "orando", "orar", "oraban", "ministerio de la palabra", "siguieron en", "(predic*|ensen*|anunci*) la palabra"] },
                { id: "crecia", peso: 30, texto: "El resultado: crecía la palabra del Señor.", formas: ["crec*", "multiplic*", "se extend*"] },
              ],
              errores: [
                { id: "abandonaron", texto: "Los apóstoles no abandonaron a las viudas: delegaron el servicio de las mesas.", formas: ["(dejaron|abandonaron|olvidaron|ignoraron) a las viudas"], anula: "delegaron" },
                { id: "dejaron-palabra", texto: "Los apóstoles no dejaron la palabra: siguieron en la oración y en el ministerio de la palabra.", formas: ["(dejaron|abandonaron|descuidaron) la (oracion|palabra)"], anula: "palabra" },
              ],
              modelo: "Cuando las viudas eran desatendidas, los apóstoles delegaron el servicio de las mesas: la iglesia escogió a siete de buen testimonio, llenos del Espíritu y de sabiduría. Ellos siguieron en la oración y la palabra, y la palabra del Señor crecía.",
            },
          },
          {
            apoyo: "y los apóstoles siguieron en la oración y en el ministerio de la palabra",
            ref: "Hechos 6:1-7",
            clave: {
              id: "pr-n5-liderazgo-2-3-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que en Hechos 6 los apóstoles no quisieron ocuparse de las viudas. ¿Qué le respondes?",
              ideas: [
                { id: "delegaron", peso: 40, texto: "Sí se ocuparon: delegaron el servicio de las mesas en siete que escogió la iglesia.", formas: ["deleg*", "(a|los) siete", "siete (de|hombres|varones|servidores|personas|escogidos|llenos)", "servicio de las mesas", "servir a las mesas", "las mesas", "buen testimonio", "escog*", "encarg*"] },
                { id: "palabra", peso: 30, negativa: true, texto: "Así siguieron en la oración y en el ministerio de la palabra.", formas: ["oracion", "orando", "orar", "oraban", "ministerio de la palabra", "siguieron en", "(predic*|ensen*|anunci*) la palabra"] },
                { id: "crecia", peso: 30, texto: "Y el resultado fue que la palabra del Señor crecía.", formas: ["crec*", "multiplic*", "se extend*"] },
              ],
              errores: [
                { id: "abandonaron", texto: "Los apóstoles no abandonaron a las viudas: delegaron el servicio de las mesas.", formas: ["(dejaron|abandonaron|olvidaron|ignoraron) a las viudas"], anula: "delegaron" },
                { id: "dejaron-palabra", texto: "Los apóstoles no dejaron la palabra: siguieron en la oración y en el ministerio de la palabra.", formas: ["(dejaron|abandonaron|descuidaron) la (oracion|palabra)"], anula: "palabra" },
              ],
              modelo: "Le respondo que sí se ocuparon: delegaron el servicio de las mesas en siete escogidos por la iglesia, de buen testimonio. Así siguieron en la oración y en el ministerio de la palabra, y la palabra del Señor crecía.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Trabajar en equipo
    "n5-liderazgo-2-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿En cuántos días terminaron el muro en tiempos de Nehemías?", reverso: "En cincuenta y dos días.", apoyo: "juntos terminaron el muro en cincuenta y dos días (Nehemías 6:15)" },
              { frente: "¿Por qué la muralla llegó a la mitad de su altura?", reverso: "Porque el pueblo tuvo ánimo para trabajar.", apoyo: "porque el pueblo tuvo ánimo para trabajar" },
              { frente: "¿Qué aporta cada uno en un equipo cristiano?", reverso: "Sus dones; y nadie sobra.", apoyo: "En un equipo cristiano, cada uno aporta sus dones y nadie sobra" },
              { frente: "Según Eclesiastés 4, ¿qué hacen unos por otros en un equipo?", reverso: "Se sostienen: si uno cae, el otro lo levanta.", apoyo: "En un equipo, unos sostienen a otros" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es la iglesia, según la lección?", reverso: "Un cuerpo con muchos miembros.", apoyo: "La iglesia es un cuerpo con muchos miembros, y cada uno aporta sus dones" },
              { frente: "¿Cómo repararon el muro en tiempos de Nehemías?", reverso: "Cada grupo reparó su tramo, algunos frente a su casa.", apoyo: "Cada grupo reparó su tramo, algunos frente a su propia casa (Nehemías 3)" },
              { frente: "Como en tiempos de Nehemías, ¿cuándo se termina la obra?", reverso: "Cuando el pueblo tiene ánimo para trabajar juntos.", apoyo: "cuando el pueblo tiene ánimo para trabajar juntos, la obra se termina" },
              { frente: "Según Eclesiastés 4:9, ¿qué tienen dos que trabajan juntos?", reverso: "Mejor paga de su trabajo.", apoyo: "porque tienen mejor paga de su trabajo" },
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
            consigna: "Completa lo que enseña la lección sobre la iglesia y el equipo cristiano.",
            texto: "La iglesia es un [[cuerpo]] con muchos [[miembros]]: en un equipo cristiano, cada uno aporta sus [[dones]] y nadie sobra.",
            distractores: ["edificio", "jefes", "quejas"],
            errores: {
              edificio: "La iglesia es un cuerpo: así como el cuerpo es uno y tiene muchos miembros, así también Cristo.",
              jefes: "El cuerpo tiene muchos miembros, y cada uno aporta sus dones.",
              quejas: "En un equipo cristiano, cada uno aporta sus dones y nadie sobra.",
            },
            apoyo: "La iglesia es un cuerpo con muchos miembros, y cada uno aporta sus dones",
            ref: "1 Corintios 12:12",
            explica: "Como el cuerpo es uno y tiene muchos miembros, así es la iglesia: en un equipo cristiano cada uno aporta sus dones y nadie sobra (1 Corintios 12:21-22).",
          },
          {
            consigna: "Completa lo que enseña 1 Corintios 12:12 para el trabajo en equipo.",
            texto: "Los miembros del cuerpo, siendo [[muchos]], son un solo cuerpo; así, en un equipo cristiano, cada uno [[aporta]] sus dones.",
            distractores: ["pocos", "esconde"],
            errores: {
              pocos: "«todos los miembros del cuerpo, siendo muchos, son un solo cuerpo»",
              esconde: "En un equipo cristiano, cada uno aporta sus dones y nadie sobra.",
            },
            apoyo: "En un equipo cristiano, cada uno aporta sus dones y nadie sobra",
            ref: "1 Corintios 12:12",
            explica: "Todos los miembros del cuerpo, siendo muchos, son un solo cuerpo, así también Cristo: en un equipo cristiano, cada uno aporta sus dones y nadie sobra.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada marca de un equipo sano con lo que significa.",
            pares: [
              ["Un propósito común", "Todos lo conocen"],
              ["Roles claros", "Cada uno sabe qué le toca"],
              ["Unidad y humildad", "Cada uno estima a los demás como superiores a sí mismo"],
              ["Confianza", "Decir la verdad con amor y pedir ayuda"],
              ["Rendición de cuentas", "Se cumple lo acordado"],
            ],
            apoyo: "Un equipo sano tiene un propósito común, roles claros, unidad y humildad, confianza y rendición de cuentas",
            ref: "Filipenses 2:3",
            explica: "Un equipo sano tiene un propósito común que todos conocen, roles claros, unidad y humildad, confianza para decir la verdad con amor y para pedir ayuda, y rendición de cuentas: se cumple lo acordado.",
          },
          {
            consigna: "¿Qué marca de un equipo sano muestra cada ejemplo? Une cada ejemplo con su marca.",
            pares: [
              ["Todos saben para qué existe el equipo de bienvenida", "Un propósito común"],
              ["Cada servidor sabe qué le toca el domingo", "Roles claros"],
              ["Cada uno trata a los otros como más importantes que él", "Unidad y humildad"],
              ["Un servidor admite que no puede solo y pide ayuda", "Confianza"],
              ["Lo que se acordó el lunes se cumple el domingo", "Rendición de cuentas"],
            ],
            apoyo: "Describir las marcas de un equipo sano: propósito común, roles claros, unidad, confianza y rendición de cuentas",
            ref: "Filipenses 2:3",
            explica: "Saber para qué existe el equipo es tener un propósito común; saber qué le toca a cada uno, roles claros; estimar a los demás como superiores, unidad y humildad; pedir ayuda, confianza; y cumplir lo acordado, rendición de cuentas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre las marcas de un equipo sano: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En un equipo sano, cada uno sabe qué le toca.", verdad: true, explica: "Es una de sus marcas: roles claros.", apoyo: "Roles claros: cada uno sabe qué le toca" },
              { texto: "En un equipo sano, el propósito lo conoce solo el líder.", verdad: false, explica: "Un equipo sano tiene un propósito común que todos conocen.", apoyo: "Un propósito común que todos conocen" },
              { texto: "Las divisiones casi siempre empiezan por el orgullo y la crítica a escondidas.", verdad: true, explica: "Por eso el líder guarda la unidad hablando de frente y con amor.", apoyo: "Las divisiones casi siempre empiezan por el orgullo y la crítica a escondidas", ref: "Efesios 4:3" },
            ],
          },
          {
            consigna: "Sobre la unidad y la confianza en el equipo: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "En un equipo sano, pedir ayuda es una debilidad que conviene esconder.", verdad: false, explica: "Un equipo sano tiene confianza para decir la verdad con amor y para pedir ayuda.", apoyo: "Confianza para decir la verdad con amor y para pedir ayuda" },
              { texto: "En un equipo sano, cada uno estima a los demás como superiores a sí mismo.", verdad: true, explica: "Es la marca de la unidad y la humildad.", apoyo: "cada uno estima a los demás como superiores a sí mismo", ref: "Filipenses 2:3" },
              { texto: "El líder guarda la unidad callando los problemas y criticando en privado.", verdad: false, explica: "El líder guarda la unidad hablando de frente y con amor.", apoyo: "El líder guarda la unidad hablando de frente y con amor", ref: "Efesios 4:3" },
              { texto: "Rendir cuentas en un equipo es cumplir lo acordado.", verdad: true, explica: "Es otra de las marcas de un equipo sano.", apoyo: "Rendición de cuentas: se cumple lo acordado" },
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
            consigna: "¿Ayuda a que la reunión del equipo sirva o no? Lleva cada frase a su grupo.",
            grupos: ["Así la reunión sirve", "Así no sirve"],
            frases: [
              { texto: "Empezar con la Palabra y la oración", grupo: 0 },
              { texto: "Una agenda conocida de antemano", grupo: 0 },
              { texto: "Un horario que se respeta", grupo: 0 },
              { texto: "Terminar con acuerdos claros", grupo: 0 },
              { texto: "Que uno solo hable todo el tiempo", grupo: 1 },
              { texto: "Decidir el tema al llegar, sin agenda", grupo: 1 },
              { texto: "Terminar sin saber quién hará qué", grupo: 1 },
            ],
            apoyo: "Que todos puedan hablar y que nadie domine la reunión",
            explica: "Una reunión que sirve empieza con la Palabra y la oración, tiene una agenda conocida de antemano y un horario que se respeta, deja hablar a todos y termina con acuerdos claros: qué se hará, quién lo hará y para cuándo.",
          },
          {
            consigna: "Preparas la reunión mensual de tu equipo. ¿Esto la hará servir o no? Lleva cada frase a su grupo.",
            grupos: ["La hará servir", "No la hará servir"],
            frases: [
              { texto: "Mandar la agenda a todos unos días antes", grupo: 0 },
              { texto: "Abrir con un pasaje de la Biblia y orar juntos", grupo: 0 },
              { texto: "Pedir la opinión del que casi nunca habla", grupo: 0 },
              { texto: "Anotar qué se hará, quién lo hará y para cuándo", grupo: 0 },
              { texto: "Alargarla una hora más de lo anunciado", grupo: 1 },
              { texto: "Dejar que el que más habla decida por todos", grupo: 1 },
              { texto: "Cerrar con un ya veremos, sin acuerdos", grupo: 1 },
            ],
            apoyo: "Terminar con acuerdos claros: qué se hará, quién lo hará y para cuándo",
            explica: "La reunión sirve si la agenda se conoce de antemano, empieza con la Palabra y la oración, todos pueden hablar, el horario se respeta y termina con acuerdos claros: qué se hará, quién lo hará y para cuándo.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "sus reuniones terminan en acuerdos claros",
            situacion: "Eres coordinador del ministerio de jóvenes. Tienes la reunión mensual con los seis líderes de grupo, y las últimas fueron largas y sirvieron de poco.",
            escenas: [
              {
                id: "e1",
                narra: "Faltan tres días para la reunión.",
                pregunta: "¿Cómo la preparas?",
                opciones: [
                  { texto: "Mandas a todos la agenda y la hora de inicio y de fin.", valor: 2, explica: "Una reunión que sirve tiene una agenda conocida de antemano y un horario que se respeta.", siguiente: "e2" },
                  { texto: "Piensas los temas, pero se los dirás a todos al llegar.", valor: 1, explica: "Tener los temas ayuda, pero la agenda se conoce de antemano.", siguiente: "e2" },
                  { texto: "No preparas nada: los temas saldrán solos en la reunión.", valor: 0, explica: "Sin una agenda conocida de antemano, la reunión no sirve.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "La reunión empieza y nadie sabe de qué se va a hablar. Se va media hora en charlas sueltas.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Propones una agenda corta y quedan en mandarla antes.", valor: 2, explica: "Una agenda conocida de antemano y un horario que se respeta hacen que la reunión sirva.", siguiente: "e2" },
                  { texto: "Sigues igual: de todos modos ya se perdió toda la reunión.", valor: 0, explica: "Todavía puede servir: la agenda se conoce de antemano y el horario se respeta.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Están todos reunidos.",
                pregunta: "¿Con qué empiezas?",
                opciones: [
                  { texto: "Con la Palabra y la oración.", valor: 2, explica: "Las reuniones que sirven empiezan con la Palabra y la oración." },
                  { texto: "Con los anuncios, y oran al final si queda tiempo.", valor: 1, explica: "Orar es bueno, pero la reunión empieza con la Palabra y la oración, no al final." },
                  { texto: "Directo con los problemas, que es para lo que vinieron.", valor: 0, explica: "Antes de los problemas, se empieza con la Palabra y la oración." },
                ],
              },
              {
                id: "e3",
                narra: "Se acaba el tiempo de la reunión.",
                pregunta: "¿Cómo terminan?",
                opciones: [
                  { texto: "Anotan qué se hará, quién lo hará y para cuándo.", valor: 2, explica: "Las reuniones terminan con acuerdos claros: qué se hará, quién lo hará y para cuándo." },
                  { texto: "Con una lista de ideas buenas, sin decidir quién las hará.", valor: 1, explica: "Las ideas sirven si terminan en acuerdos claros: quién lo hará y para cuándo." },
                  { texto: "Siguen hablando una hora más, aunque ya pasó la hora de salir.", valor: 0, explica: "El horario se respeta, y la reunión termina con acuerdos claros." },
                ],
              },
            ],
          },
          {
            apoyo: "Que todos puedan hablar y que nadie domine la reunión",
            situacion: "Eres pastor y diriges la reunión semanal del equipo de servidores: ocho hermanos de distintos ministerios.",
            escenas: [
              {
                id: "e1",
                narra: "La reunión es de siete a ocho de la noche, pero siempre empieza tarde.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Empiezas a la hora anunciada y terminas a la hora prometida.", valor: 2, explica: "Una reunión que sirve tiene un horario que se respeta." },
                  { texto: "Empiezas tarde, pero cortas algunos temas para salir a tiempo.", valor: 1, explica: "Salir a tiempo ayuda, pero el horario también se respeta al empezar." },
                  { texto: "Esperas a que lleguen todos, aunque se alargue hasta las diez.", valor: 0, explica: "Un horario que se respeta es parte de una reunión que sirve." },
                ],
              },
              {
                id: "e2",
                narra: "Al hablar de un cambio en el culto, un hermano con muchos años en la iglesia opina de todo y los nuevos no dicen nada.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Pides la opinión de cada uno, empezando por los que callan.", valor: 2, explica: "Que todos puedan hablar y que nadie domine la reunión.", siguiente: "e3" },
                  { texto: "Le pides con amor que sea breve, y sigues con los demás temas.", valor: 1, explica: "Cuidas el tiempo, pero también hace falta que todos puedan hablar.", siguiente: "e3" },
                  { texto: "Decides lo que él dice, porque tiene más años en la iglesia.", valor: 0, explica: "Que nadie domine la reunión: en un equipo cristiano cada uno aporta sus dones y nadie sobra.", siguiente: "e2b" },
                ],
              },
              {
                id: "e2b",
                narra: "Días después, dos servidores nuevos te dicen que en las reuniones nadie los escucha.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Les pides perdón, y en la próxima reunión todos hablarán.", valor: 2, explica: "En un equipo cristiano, cada uno aporta sus dones y nadie sobra: todos pueden hablar." },
                  { texto: "Les dices que esperen su turno: en unos años podrán opinar.", valor: 0, explica: "Que todos puedan hablar y que nadie domine la reunión." },
                ],
              },
              {
                id: "e3",
                narra: "Llega la hora de terminar.",
                pregunta: "¿Cómo cierras?",
                opciones: [
                  { texto: "Repasan qué se hará, quién lo hará y para cuándo.", valor: 2, explica: "Las reuniones terminan con acuerdos claros: qué se hará, quién lo hará y para cuándo." },
                  { texto: "Oran juntos y dejan las decisiones para otra reunión.", valor: 1, explica: "Orar juntos es bueno, pero la reunión termina con acuerdos claros." },
                  { texto: "Cada uno se va con su idea, sin acordar nada en concreto.", valor: 0, explica: "Sin acuerdos claros no hay rendición de cuentas: no se sabe qué se cumplirá." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Un equipo sano tiene un propósito común, roles claros, unidad y humildad, confianza y rendición de cuentas",
            ref: "Filipenses 2:3",
            clave: {
              id: "pr-n5-liderazgo-2-4-a7-1",
              tipo: "corta",
              pregunta: "¿Qué marcas tiene un equipo sano? Nombra al menos tres y explica qué quiere decir una de ellas.",
              ideas: [
                { id: "proposito", peso: 34, texto: "Un propósito común que todos conocen.", formas: ["proposito*", "meta comun", "objetivo comun", "(misma|una) meta", "para que existe", "que todos conocen"] },
                { id: "roles", peso: 33, texto: "Roles claros: cada uno sabe qué le toca.", formas: ["roles", "rol", "que le toca", "su (parte|tarea|funcion)", "funciones claras", "tareas claras"] },
                { id: "unidad", peso: 33, texto: "Unidad y humildad, confianza y rendición de cuentas.", formas: ["unidad", "humild*", "confianza", "confia*", "rendicion de cuentas", "rend* cuentas", "rind* cuentas", "cumpl* lo acordado"] },
              ],
              modelo: "Un equipo sano tiene un propósito común que todos conocen y roles claros, porque cada uno sabe qué le toca. También tiene unidad y humildad, confianza para decir la verdad con amor y rendición de cuentas.",
            },
          },
          {
            apoyo: "Roles claros: cada uno sabe qué le toca",
            clave: {
              id: "pr-n5-liderazgo-2-4-a7-2",
              tipo: "corta",
              pregunta: "Tu equipo tiene buenos servidores, pero nadie sabe qué le toca y lo acordado no se cumple. ¿Qué marcas de un equipo sano le faltan, y qué harás?",
              ideas: [
                { id: "roles", peso: 50, texto: "Le faltan roles claros: que cada uno sepa qué le toca.", formas: ["roles", "rol", "que le toca", "su (parte|tarea|funcion)", "cada uno (sepa|sabe|tenga|tiene) (su|que)", "funciones", "tareas claras"] },
                { id: "cuentas", peso: 50, texto: "Y rendición de cuentas: que se cumpla lo acordado.", formas: ["rendicion de cuentas", "rend* cuentas", "rind* cuentas", "cumpl* lo acordado", "se cumpla", "pid* cuentas", "acuerdos claros"] },
              ],
              modelo: "Le faltan roles claros y rendición de cuentas. Voy a dar a cada uno su tarea para que sepa qué le toca, y terminaremos cada reunión con acuerdos claros para que se cumpla lo acordado.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Resolver conflictos
    "n5-liderazgo-2-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Mateo 18:15, ¿cómo se habla primero con el hermano que peca contra ti?", reverso: "A solas: estando tú y él solos.", apoyo: "Primero a solas; si no escucha, con uno o dos más; y solo después ante la iglesia" },
              { frente: "Si el hermano no escucha a solas, ¿qué sigue?", reverso: "Volver con uno o dos más.", apoyo: "si no escucha, con uno o dos más" },
              { frente: "Si tu hermano te oye, ¿qué has ganado?", reverso: "Has ganado a tu hermano.", apoyo: "si te oyere, has ganado a tu hermano" },
              { frente: "Según Mateo 5:23-24, ¿qué es lo que no puede esperar?", reverso: "La reconciliación.", apoyo: "La reconciliación no puede esperar" },
            ],
          },
          {
            tarjetas: [
              { frente: "Si eres tú el que ofendió, ¿qué te pide Jesús que hagas con tu ofrenda?", reverso: "Dejarla ante el altar e ir primero a reconciliarte.", apoyo: "deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano" },
              { frente: "¿Cuál es el último paso de Mateo 18:15-17?", reverso: "Llevarlo ante la iglesia.", apoyo: "y solo después ante la iglesia" },
              { frente: "¿Cómo se llama el libro en que Ken Sande resume el camino del pacificador?", reverso: "Pacificadores.", apoyo: "Ken Sande, en su libro Pacificadores, resume el camino en cuatro pasos" },
              { frente: "¿Para qué ofensas es el camino de Mateo 18?", reverso: "Para las ofensas entre hermanos.", apoyo: "El camino de Mateo 18 es para las ofensas entre hermanos" },
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
            consigna: "Según Mateo 18:15-17, ordena los pasos con el hermano que peca contra ti, del primero al último.",
            pasos: ["Ir y hablar con él a solas", "Si no escucha, volver con uno o dos más", "Solo después, llevarlo ante la iglesia"],
            apoyo: "Primero a solas; si no escucha, con uno o dos más; y solo después ante la iglesia",
            ref: "Mateo 18:15-17",
            explica: "Jesús enseñó a hablar primero a solas; si no escucha, con uno o dos más; y solo al final ante la iglesia.",
          },
          {
            consigna: "Si eres tú el que ofendió, ¿qué pide Jesús en Mateo 5:23-24? Ordena los pasos, del primero al último.",
            pasos: ["Dejar la ofrenda delante del altar", "Ir y reconciliarse primero con el hermano", "Volver y presentar la ofrenda"],
            apoyo: "La reconciliación no puede esperar",
            ref: "Mateo 5:23-24",
            explica: "Jesús dijo: «deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano, y entonces ven y presenta tu ofrenda». La reconciliación no puede esperar.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una madre de la iglesia te dice: Creo que un servidor abusó de mi hija. ¿Tengo que hablar primero a solas con él, como dice Mateo 18?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que no: si hay abuso, primero se protege a la víctima y se acude a las autoridades.", bien: true, explica: "El camino de Mateo 18 es para las ofensas entre hermanos. Si hay abuso o un delito, primero se protege a la víctima y se acude a las autoridades." },
              { texto: "Que sí: primero a solas con él y, si no escucha, con uno o dos hermanos más.", explica: "Mateo 18 es para las ofensas entre hermanos: si hay abuso, primero se protege a la víctima y se acude a las autoridades." },
              { texto: "Que lo hable en la próxima reunión de la iglesia, para que todos lo sepan.", explica: "Con un abuso no se espera a una reunión: primero se protege a la víctima y se acude a las autoridades." },
              { texto: "Que lo perdone y no diga nada, para cuidar la unidad y el buen nombre de la iglesia.", explica: "Un abuso no se calla: primero se protege a la víctima y se acude a las autoridades." },
            ],
            apoyo: "Si hay abuso o un delito, primero se protege a la víctima y se acude a las autoridades",
            explica: "El camino de Mateo 18 es para las ofensas entre hermanos; si hay abuso o un delito, primero se protege a la víctima y se acude a las autoridades, como enseña la materia de ética.",
          },
          {
            caso: "Un líder de célula que acompañas te dice: Un hermano del grupo habló mal de mí con otros. Voy a contarlo en la reunión para que todos sepan cómo es.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que hable primero a solas con él; si no escucha, con uno o dos más.", bien: true, explica: "Jesús enseñó: primero a solas; si no escucha, con uno o dos más; y solo después ante la iglesia." },
              { texto: "Que lo cuente en la reunión, así el hermano aprende a no hablar de nadie.", explica: "Jesús enseñó a ir primero a solas: «ve y repréndele estando tú y él solos»." },
              { texto: "Que no le hable nunca más y que busque otro grupo para él y su familia.", explica: "El camino busca la reconciliación: si te oye, has ganado a tu hermano." },
              { texto: "Que hable de él con los demás del grupo, para que vean cómo es en verdad.", explica: "Habla en privado y de frente, no a espaldas." },
            ],
            apoyo: "Primero a solas; si no escucha, con uno o dos más; y solo después ante la iglesia",
            ref: "Mateo 18:15",
            explica: "Es una ofensa entre hermanos: se habla primero a solas; si no escucha, con uno o dos más; y solo después ante la iglesia.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el camino del pacificador tiene un error. Tócala.",
            frases: [
              "El pacificador busca ante todo la gloria de Dios.",
              "El pacificador saca primero la viga de su propio ojo.",
              "El pacificador restaura al otro con dureza, para que aprenda.",
              "El pacificador va a reconciliarse con su hermano.",
            ],
            malo: 2,
            correccion: "El pacificador restaura al otro con mansedumbre (Gálatas 6:1).",
            apoyo: "restaurar al otro con mansedumbre (Gálatas 6:1)",
            explica: "Ken Sande resume el camino en cuatro pasos: buscar ante todo la gloria de Dios, sacar primero la viga del propio ojo, restaurar al otro con mansedumbre e ir a reconciliarse.",
          },
          {
            consigna: "Una de estas frases sobre cómo tratar un conflicto tiene un error. Tócala.",
            frases: [
              "Para tratar un conflicto, escucha antes de responder.",
              "Habla en privado y de frente, no a espaldas.",
              "Busca ganar la discusión, aunque pierdas al hermano.",
              "Responde con calma: la blanda respuesta quita la ira.",
              "Perdona como Cristo te perdonó.",
            ],
            malo: 2,
            correccion: "Ataca el problema, no a la persona: busca la solución, no ganar la discusión.",
            apoyo: "Ataca el problema, no a la persona: busca la solución, no ganar la discusión",
            explica: "Para tratar un conflicto con humildad y verdad: escucha antes de responder, habla en privado y de frente, responde con calma, ataca el problema y no a la persona, y perdona como Cristo te perdonó.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El pacificador busca la gloria de Dios, saca primero la viga de su propio ojo, restaura con mansedumbre y va a reconciliarse; escucha, habla de frente y perdona",
            ref: "Mateo 7:5",
            titulo: "Dos voces en el equipo de alabanza",
            relato: [
              "Eres pastor. Andrés, que dirige la alabanza, te escribe enojado: Lucía cambió los cantos sin consultarme y me dejó mal delante de todo el equipo.",
              "Cuando hablas con Lucía, te dice que Andrés nunca escucha a nadie y que lo hizo para que el culto saliera bien.",
              "Los dos son servidores fieles, y el resto del equipo ya empieza a tomar partido.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué haces primero con cada uno?",
                opciones: [
                  { texto: "Escuchar con calma a cada uno antes de decir nada.", bien: true, explica: "Escucha antes de responder (Santiago 1:19)." },
                  { texto: "Darle la razón a Andrés, porque él es el que dirige el equipo.", explica: "Escucha antes de responder: el pacificador no toma partido antes de oír a los dos." },
                  { texto: "Responderle a Andrés en el grupo del equipo, para que todos lo lean.", explica: "Habla en privado y de frente, no delante de todos." },
                  { texto: "Decirles que lo arreglen entre ellos y no volver a preguntar.", explica: "El pacificador va a reconciliarse y ayuda a otros a hacerlo: no se desentiende del conflicto." },
                ],
                apoyo: "Escucha antes de responder (Santiago 1:19)",
                explica: "El que escucha antes de responder puede ayudar a los dos a buscar la solución.",
              },
              {
                tipo: "situacion",
                pregunta: "Antes de reunirlos, Andrés te dice que él no hizo nada mal. ¿Qué le ayudas a ver?",
                opciones: [
                  { texto: "Que mire primero su parte: la viga de su propio ojo.", bien: true, explica: "El pacificador saca primero la viga del propio ojo (Mateo 7:5)." },
                  { texto: "Que tiene toda la razón y que Lucía es la única culpable.", explica: "Cada uno mira primero su propia parte: sacar primero la viga del propio ojo." },
                  { texto: "Que no hace falta mirar su parte si él es el que dirige.", explica: "Dirigir no libra de mirar la propia parte: el pacificador saca primero la viga de su ojo." },
                  { texto: "Que deje el equipo, porque los conflictos no se arreglan.", explica: "Un conflicto bien resuelto puede dejar a un equipo más unido que antes." },
                ],
                apoyo: "sacar primero la viga del propio ojo (Mateo 7:5)",
                explica: "El pacificador saca primero la viga de su propio ojo: mira su parte antes de señalar la del otro.",
              },
              {
                tipo: "situacion",
                pregunta: "Ya reunidos los tres, Lucía levanta la voz. ¿Cómo sigues?",
                opciones: [
                  { texto: "Respondes con calma y atacas el problema, no a la persona.", bien: true, explica: "La blanda respuesta quita la ira (Proverbios 15:1): ataca el problema, no a la persona." },
                  { texto: "Le respondes más fuerte, para que entienda quién manda aquí.", explica: "Responde con calma: la blanda respuesta quita la ira." },
                  { texto: "Terminas la reunión y no vuelves a tocar el tema con nadie.", explica: "El pacificador va a reconciliarse: un conflicto bien resuelto puede dejar al equipo más unido." },
                  { texto: "Le recuerdas todos los errores que ha cometido en el equipo.", explica: "Ataca el problema, no a la persona: busca la solución, no ganar la discusión." },
                ],
                apoyo: "Responde con calma: la blanda respuesta quita la ira (Proverbios 15:1)",
                explica: "El pacificador responde con calma y ataca el problema, no a la persona: busca la solución, no ganar la discusión.",
              },
              {
                tipo: "explica",
                apoyo: "Un conflicto bien resuelto puede dejar a un equipo más unido que antes",
                clave: {
                  id: "pr-n5-liderazgo-2-5-a5-1",
                  tipo: "corta",
                  pregunta: "Al final, ¿a qué animas a Andrés y a Lucía para cerrar bien este conflicto?",
                  ideas: [
                    { id: "perdon", peso: 50, texto: "A perdonarse como Cristo los perdonó.", formas: ["perdon*", "como cristo (los|nos|te|me|les) perdono"] },
                    { id: "reconciliacion", peso: 50, texto: "A reconciliarse y a buscar juntos la solución, no ganar la discusión.", formas: ["reconcili*", "solucion", "(hacer|hagan|haya|hacen) paces", "mas unido*", "unidos", "acuerdo"] },
                  ],
                  modelo: "Los animo a perdonarse como Cristo los perdonó y a reconciliarse, buscando juntos la solución y no ganar la discusión. Un conflicto bien resuelto puede dejar al equipo más unido que antes.",
                },
              },
            ],
          },
          {
            apoyo: "Habla en privado y de frente, no a espaldas",
            ref: "Mateo 5:23-24",
            titulo: "La corrección del sábado",
            relato: [
              "Eres maestro de la academia en tu iglesia. En la clase del sábado corregiste a un alumno, Martín, con palabras duras delante de todos.",
              "Después supiste que Martín se fue dolido y que comentó con otros que no piensa volver.",
              "El domingo, antes de presentar tu ofrenda en el culto, te acuerdas de él.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te pide Jesús en Mateo 5:23-24?",
                opciones: [
                  { texto: "Que vaya primero a reconciliarme con él, sin demora.", bien: true, explica: "«deja allí tu ofrenda delante del altar, y anda, reconcíliate primero con tu hermano»: la reconciliación no puede esperar." },
                  { texto: "Que presente la ofrenda y espere a que él venga a buscarme.", explica: "Si eres tú el que ofendió, vas tú primero a reconciliarte: no esperas a que venga él." },
                  { texto: "Que espere unos meses, a ver si a él se le pasa el enojo.", explica: "La reconciliación no puede esperar." },
                  { texto: "Que pida a otro alumno que le diga a Martín que no fue para tanto.", explica: "Habla en privado y de frente, no por medio de otros." },
                ],
                apoyo: "Y si eres tú el que ofendió",
                explica: "Jesús enseñó a buscar la reconciliación sin demora cuando uno ofendió: primero reconciliarse y después presentar la ofrenda.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Cómo hablas con Martín?",
                opciones: [
                  { texto: "En privado y de frente, reconociendo primero mi falta.", bien: true, explica: "Habla en privado y de frente, no a espaldas, y saca primero la viga de tu propio ojo." },
                  { texto: "Delante de la clase, para que todos vean que tengo razón.", explica: "Habla en privado y de frente: el pacificador no busca ganar la discusión." },
                  { texto: "Por mensaje, explicando todo lo que él hizo mal en clase.", explica: "Sacar primero la viga del propio ojo es reconocer tu parte antes de señalar la del otro." },
                  { texto: "Por medio de otro maestro, para no tener que verlo en persona.", explica: "Habla en privado y de frente, no a espaldas ni por medio de otros." },
                ],
                apoyo: "Habla en privado y de frente, no a espaldas",
                explica: "El pacificador habla en privado y de frente, y saca primero la viga de su propio ojo.",
              },
              {
                tipo: "situacion",
                pregunta: "Martín te escucha y te dice que también él respondió mal. ¿Qué haces?",
                opciones: [
                  { texto: "Lo perdono como Cristo me perdonó, y nos reconciliamos.", bien: true, explica: "Perdona como Cristo te perdonó (Colosenses 3:13)." },
                  { texto: "Le recuerdo que su falta fue peor que la mía.", explica: "Ataca el problema, no a la persona: no se trata de ganar la discusión." },
                  { texto: "Acepto sus disculpas, pero no le vuelvo a dar la palabra.", explica: "El pacificador restaura al otro con mansedumbre." },
                  { texto: "Le digo que ya no importa, y sigo como si nada hubiera pasado.", explica: "La reconciliación se busca de verdad: se perdona como Cristo perdonó." },
                ],
                apoyo: "Perdona como Cristo te perdonó (Colosenses 3:13)",
                explica: "El pacificador perdona como Cristo lo perdonó y va a reconciliarse.",
              },
              {
                tipo: "explica",
                apoyo: "y a buscar la reconciliación sin demora cuando uno ofendió",
                clave: {
                  id: "pr-n5-liderazgo-2-5-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué aprendiste de este conflicto para tu manera de enseñar y de corregir? Escribe dos ideas de la lección.",
                  ideas: [
                    { id: "reconciliar", peso: 50, texto: "Si yo ofendí, voy primero a reconciliarme: la reconciliación no puede esperar.", formas: ["reconcili*", "no puede esperar", "sin demora", "sin esperar", "(voy|ir|fui|vaya) primero", "pedir perdon", "pedi perdon", "pido perdon"] },
                    { id: "viga", peso: 50, texto: "Saco primero la viga de mi propio ojo y corrijo con mansedumbre, en privado y de frente.", formas: ["viga", "propio ojo", "mansedumbre", "en privado", "de frente", "con calma"] },
                  ],
                  modelo: "Aprendí que si yo ofendí, voy primero a reconciliarme, porque la reconciliación no puede esperar. Y que debo sacar primero la viga de mi propio ojo y corregir con mansedumbre, en privado y de frente.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada conflicto de la Biblia con cómo se resolvió.",
            pares: [
              ["Evodia y Síntique", "Pablo pidió a un compañero fiel que las ayudara"],
              ["El conflicto sobre la doctrina en Hechos 15", "Escucharon a todos, examinaron la Escritura y buscaron al Espíritu"],
              ["Pablo y Bernabé", "Se separaron, y años después Pablo reconoció que Marcos le era útil"],
            ],
            apoyo: "a veces hace falta alguien que medie",
            ref: "Filipenses 4:2-3",
            explica: "Pablo rogó a Evodia y a Síntique que fueran de un mismo sentir y pidió a un compañero fiel que las ayudara; en Hechos 15 la iglesia escuchó a todos, examinó la Escritura y buscó la dirección del Espíritu Santo; y Pablo y Bernabé se separaron, pero años después Pablo reconoció que Marcos le era útil.",
          },
          {
            consigna: "Une cada parte de los ejemplos bíblicos con lo que muestra.",
            pares: [
              ["Pablo ruega a Evodia y a Síntique", "«que sean de un mismo sentir en el Señor»"],
              ["El compañero fiel", "A veces hace falta alguien que medie"],
              ["La iglesia en Hechos 15", "Buscó la dirección del Espíritu Santo"],
              ["Pablo, años después", "Reconoció que Marcos le era útil"],
            ],
            apoyo: "Describir ejemplos bíblicos de conflictos y de cómo se resolvieron",
            ref: "Filipenses 4:2-3",
            explica: "Pablo rogó a Evodia y a Síntique que fueran de un mismo sentir en el Señor y pidió a un compañero fiel que las ayudara: a veces hace falta alguien que medie. La iglesia de Hechos 15 buscó la dirección del Espíritu, y años después Pablo reconoció que Marcos le era útil.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Jesús enseñó a resolver los conflictos hablando primero a solas, después con uno o dos más y solo al final ante la iglesia",
            ref: "Mateo 18:15-17",
            clave: {
              id: "pr-n5-liderazgo-2-5-a7-1",
              tipo: "corta",
              pregunta: "¿Qué pasos enseñó Jesús en Mateo 18 para resolver un conflicto, y qué pide Mateo 5 si fuiste tú el que ofendió?",
              ideas: [
                { id: "mateo18", peso: 50, texto: "Primero a solas; si no escucha, con uno o dos más; y solo al final ante la iglesia.", formas: ["a solas", "(tu|el) y (el|yo) solos", "uno o dos", "ante la iglesia", "delante de la iglesia", "en privado"] },
                { id: "mateo5", peso: 50, texto: "Si uno ofendió, deja la ofrenda y va primero a reconciliarse, sin demora.", formas: ["reconcili*", "deja* (la|tu) ofrenda", "no puede esperar", "sin demora", "primero (ir|va|vaya|voy) a"] },
              ],
              errores: [
                { id: "iglesia-primero", texto: "Primero se habla a solas; solo después, ante la iglesia.", formas: ["primero (ante|a|delante) (la|de) iglesia", "primero (contar|contarlo|decirlo|cuenta|dice) (a|en) (todos|la)"], anula: "mateo18" },
              ],
              modelo: "Jesús enseñó a hablar primero a solas con el hermano; si no escucha, con uno o dos más; y solo al final ante la iglesia. Y si yo ofendí, dejo la ofrenda y voy primero a reconciliarme, porque no puede esperar.",
            },
          },
          {
            apoyo: "La reconciliación no puede esperar",
            ref: "Mateo 5:23-24",
            clave: {
              id: "pr-n5-liderazgo-2-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Si alguien me ofende, espero a que venga a pedirme perdón. ¿Qué le enseñarías con Mateo 18 y Mateo 5?",
              ideas: [
                { id: "ir", peso: 50, texto: "Que Jesús enseñó a ir y hablar primero a solas con el hermano que pecó contra nosotros.", formas: ["a solas", "ir a hablar", "ve y repr*", "ir y hablar", "(tu|el) y (el|yo) solos", "uno o dos", "en privado", "de frente"] },
                { id: "reconciliar", peso: 50, texto: "Y si él fue el que ofendió, Mateo 5 pide reconciliarse primero: la reconciliación no puede esperar.", formas: ["reconcili*", "no puede esperar", "sin demora", "sin esperar", "primero (ir|va|vaya|voy)"] },
              ],
              errores: [
                { id: "esperar", texto: "La reconciliación no puede esperar: Jesús enseñó a ir a hablar a solas.", formas: ["hay que esperar", "esperar a que (venga|vengan|el)"], anula: "reconciliar" },
              ],
              modelo: "Le enseñaría que Jesús pide ir y hablar primero a solas con el hermano que pecó contra él, sin esperar. Y si él fue el que ofendió, Mateo 5 pide reconciliarse primero: la reconciliación no puede esperar.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. Visión, servicio y sucesión
    "n5-liderazgo-2-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A qué pregunta responde la visión?", reverso: "¿Hacia dónde nos lleva Dios?", apoyo: "La visión responde a la pregunta: ¿hacia dónde nos lleva Dios?" },
              { frente: "¿Qué dicen las metas?", reverso: "Qué se logrará y para cuándo.", apoyo: "Las metas dicen qué se logrará y para cuándo" },
              { frente: "¿Qué dice el plan?", reverso: "Quién hará qué, con qué recursos y en qué orden.", apoyo: "El plan dice quién hará qué, con qué recursos y en qué orden" },
              { frente: "¿Qué hace un líder sin visión?", reverso: "Solo mantiene lo que hay.", apoyo: "Un líder sin visión solo mantiene lo que hay" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué le dijo Dios a Habacuc que hiciera con la visión?", reverso: "Que la escribiera y la declarara en tablas.", apoyo: "Dios le dijo a Habacuc: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella»" },
              { frente: "En su contexto, ¿a qué se refiere Habacuc 2:2?", reverso: "Al mensaje que Dios dio al profeta.", apoyo: "En su contexto se refiere al mensaje que Dios dio al profeta" },
              { frente: "¿Qué hizo Nehemías antes de compartir la visión con el pueblo?", reverso: "Oró, pidió cartas y madera y recorrió los muros de noche.", apoyo: "Nehemías oró, pidió al rey cartas y madera para la obra, recorrió los muros de noche y solo entonces compartió la visión con el pueblo" },
              { frente: "Según Proverbios 16:3, ¿a quién se encomienda todo?", reverso: "A Dios.", apoyo: "Todo se encomienda a Dios (Proverbios 16:3)" },
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
            consigna: "Ordena cómo se pasa de la visión al plan, del primer paso al último.",
            pasos: [
              "Preguntar: ¿hacia dónde nos lleva Dios?",
              "Escribir la visión y explicarla con claridad",
              "Poner las metas: qué se logrará y para cuándo",
              "Hacer el plan: quién hará qué, con qué recursos y en qué orden",
            ],
            apoyo: "La visión responde hacia dónde nos lleva Dios, se escribe con claridad y se convierte en metas y planes, como hizo Nehemías",
            ref: "Habacuc 2:2",
            explica: "La visión responde hacia dónde nos lleva Dios; se escribe y se explica con claridad; y se convierte en metas, que dicen qué se logrará y para cuándo, y en un plan: quién hará qué, con qué recursos y en qué orden. Todo se encomienda a Dios.",
          },
          {
            consigna: "Ordena lo que hizo Nehemías hasta compartir la visión con el pueblo, del primer paso al último.",
            pasos: ["Oró", "Pidió al rey cartas y madera para la obra", "Recorrió los muros de noche", "Compartió la visión con el pueblo"],
            apoyo: "Nehemías oró, pidió al rey cartas y madera para la obra, recorrió los muros de noche y solo entonces compartió la visión con el pueblo",
            ref: "Nehemías 2",
            explica: "Nehemías oró, pidió al rey cartas y madera para la obra, recorrió los muros de noche y solo entonces compartió la visión con el pueblo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es la visión, una meta o el plan? Lleva cada frase a su grupo.",
            grupos: ["La visión", "Una meta", "El plan"],
            frases: [
              { texto: "Hacia dónde nos lleva Dios", grupo: 0 },
              { texto: "Lo que Dios pone en el corazón, escrito con claridad", grupo: 0 },
              { texto: "Qué se logrará", grupo: 1 },
              { texto: "Para cuándo se logrará", grupo: 1 },
              { texto: "Quién hará qué", grupo: 2 },
              { texto: "Con qué recursos se hará", grupo: 2 },
              { texto: "En qué orden se hará", grupo: 2 },
            ],
            apoyo: "Las metas dicen qué se logrará y para cuándo",
            explica: "La visión responde hacia dónde nos lleva Dios; las metas dicen qué se logrará y para cuándo; y el plan dice quién hará qué, con qué recursos y en qué orden.",
          },
          {
            consigna: "En el ministerio de jóvenes, ¿cada frase es la visión, una meta o el plan? Lleva cada frase a su grupo.",
            grupos: ["La visión", "Una meta", "El plan"],
            frases: [
              { texto: "Creemos que Dios nos lleva a alcanzar a los jóvenes del barrio", grupo: 0 },
              { texto: "Lo que Dios puso en el corazón para los jóvenes, escrito con claridad", grupo: 0 },
              { texto: "Abrir dos grupos de estudio antes de diciembre", grupo: 1 },
              { texto: "Que cuarenta jóvenes nuevos visiten la iglesia este año", grupo: 1 },
              { texto: "Pedro dirigirá el grupo del martes", grupo: 2 },
              { texto: "Primero se forma a los líderes y después se abren los grupos", grupo: 2 },
              { texto: "Se usará el salón de abajo y los libros que ya tenemos", grupo: 2 },
            ],
            apoyo: "El plan dice quién hará qué, con qué recursos y en qué orden",
            explica: "Hacia dónde nos lleva Dios es la visión; lo que se logrará y para cuándo son las metas; y quién hará qué, con qué recursos y en qué orden es el plan.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Marcos 10:43, ¿cómo se hace grande alguien entre los discípulos de Jesús? Toca las palabras que lo dicen.",
            texto: "el que quiera hacerse grande entre vosotros será [[vuestro servidor]]",
            apoyo: "Jesús enseñó que el grande es el que sirve",
            ref: "Marcos 10:43-45",
            explica: "Jesús dijo: «el que quiera hacerse grande entre vosotros será vuestro servidor»: el grande es el que sirve.",
          },
          {
            consigna: "¿Para qué vino Jesús, según Marcos 10:45? Toca las palabras que lo dicen.",
            texto: "no vino para ser servido, sino [[para servir]], y [[para dar su vida en rescate por muchos]]",
            apoyo: "él mismo vino a servir y a dar su vida",
            ref: "Marcos 10:45",
            explica: "Jesús mismo «no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un líder de líderes que acompañas te dice: Ahora que dirijo a los coordinadores, ya no me toca servir las mesas ni acomodar las sillas.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que el grande es el que sirve, como Jesús, que vino a servir.", bien: true, explica: "Jesús enseñó que el grande es el que sirve, y él mismo vino a servir y a dar su vida." },
              { texto: "Que tiene razón: el que dirige a muchos ya no tiene que servir.", explica: "Jesús dijo: «el que quiera hacerse grande entre vosotros será vuestro servidor»." },
              { texto: "Que sirva solo cuando lo vea la iglesia, para dar buen ejemplo.", explica: "Jesús mismo «no vino para ser servido, sino para servir»: el servicio no es para que lo vean." },
              { texto: "Que deje de dirigir, porque un siervo no debe guiar a nadie.", explica: "El líder con visión lleva a otros hacia lo que Dios quiere hacer, y lo hace sirviendo." },
            ],
            apoyo: "Jesús enseñó que el grande es el que sirve, y él mismo vino a servir y a dar su vida",
            ref: "Marcos 10:43-45",
            explica: "Jesús enseñó que el grande es el que sirve, y él mismo vino a servir y a dar su vida en rescate por muchos.",
          },
          {
            caso: "Un pastor joven te dice: Tengo una gran visión para la iglesia. Los demás tienen que ponerse a mi servicio para que se cumpla.",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que la visión de Jesús incluía una toalla y una cruz: vino a servir.", bien: true, explica: "La visión de Jesús incluía una toalla y una cruz: el que quiera hacerse grande será servidor." },
              { texto: "Que está bien: con una visión tan grande, los demás deben servirle a él.", explica: "Jesús «no vino para ser servido, sino para servir»: el líder con visión sirve." },
              { texto: "Que guarde su visión en secreto, para que nadie se la cambie.", explica: "Lo que Dios pone en el corazón se escribe y se explica con claridad, para que otros puedan avanzar con ello." },
              { texto: "Que se olvide de la visión y solo mantenga lo que ya hay.", explica: "Un líder sin visión solo mantiene lo que hay: la visión no se abandona, se sirve." },
            ],
            apoyo: "Pero la visión de Jesús incluía una toalla y una cruz",
            ref: "Marcos 10:45",
            explica: "Un líder con visión lleva a otros hacia lo que Dios quiere hacer, pero la visión de Jesús incluía una toalla y una cruz: él vino a servir.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "El líder sabio prepara a quien seguirá la obra cuando él ya no esté",
            ref: "Deuteronomio 31:7-8",
            situacion: "Eres pastor de una iglesia pequeña. Sabes que dentro de unos años tendrás que dejar el ministerio en esa ciudad, y quieres que la obra siga.",
            escenas: [
              {
                id: "e1",
                narra: "Todavía faltan varios años para tu partida.",
                pregunta: "¿Cuándo empiezas a preparar a quien te seguirá?",
                opciones: [
                  { texto: "Desde ahora: Moisés preparó a Josué durante años.", valor: 2, explica: "Moisés preparó a Josué durante años: el líder sabio prepara a quien seguirá la obra." },
                  { texto: "El último año, cuando ya esté cerca la partida.", valor: 1, explica: "Preparar es bueno, pero Moisés lo hizo durante años, no solo al final." },
                  { texto: "Nunca: cuando te vayas, la iglesia ya verá qué hace sin ti.", valor: 0, explica: "El líder sabio prepara a quien seguirá la obra cuando él ya no esté." },
                ],
              },
              {
                id: "e2",
                narra: "Un joven fiel sirve contigo desde hace tiempo, y ves en él a alguien que podría seguir la obra.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Lo llamas a acompañarte de cerca y a servir contigo en la obra.", valor: 2, explica: "Elías llamó a Eliseo echando sobre él su manto (1 Reyes 19:19): lo llamó a seguirlo." },
                  { texto: "Le das un curso y esperas a ver si después se ofrece solo.", valor: 1, explica: "Un curso ayuda, pero Elías mismo llamó a Eliseo a seguirlo." },
                  { texto: "Lo dejas como está: si lo llamas, otros se pueden poner celosos.", valor: 0, explica: "El líder sabio prepara a quien seguirá la obra: no deja de llamarlo por miedo." },
                ],
              },
              {
                id: "e3",
                narra: "Llega el tiempo de tu partida.",
                pregunta: "¿Cómo presentas a quien seguirá la obra?",
                opciones: [
                  { texto: "Delante de toda la iglesia, y lo animas a esforzarse.", valor: 2, explica: "Moisés, delante de todo Israel, le dijo a Josué: «Esfuérzate y anímate»." },
                  { texto: "Lo presentas en una reunión pequeña con los líderes.", valor: 1, explica: "Los líderes deben saberlo, pero Moisés animó a Josué delante de todo Israel." },
                  { texto: "Te vas sin decir nada, para que él se gane solo su lugar.", valor: 0, explica: "Moisés no se fue en silencio: animó a Josué delante de todo Israel." },
                ],
              },
            ],
          },
          {
            apoyo: "La mejor visión es la que se cumple también por medio de los que tú formaste",
            ref: "2 Reyes 2:13-15",
            situacion: "Coordinas el ministerio de niños desde hace diez años. Tu pastor te pide que pienses en quién seguirá ese ministerio cuando tú ya no puedas.",
            escenas: [
              {
                id: "e1",
                narra: "Nadie más sabe cómo funciona el ministerio: todo lo haces tú.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Escoges a alguien fiel y empiezas a prepararlo a tu lado.", valor: 2, explica: "El líder sabio prepara a quien seguirá la obra cuando él ya no esté.", siguiente: "e2" },
                  { texto: "Escribes un manual con todo lo que haces, por si algún día faltas.", valor: 1, explica: "Un manual ayuda, pero la obra la sigue una persona preparada, como Josué o Eliseo.", siguiente: "e2" },
                  { texto: "Sigues igual: mientras tú estés, el ministerio funciona bien.", valor: 0, explica: "La mejor visión es la que se cumple también por medio de los que tú formaste.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Un año después te enfermas y debes parar tres meses. Nadie sabe qué hacer con los niños.",
                pregunta: "¿Qué aprendes de esto?",
                opciones: [
                  { texto: "Que debes preparar a quien siga la obra cuando tú no estés.", valor: 2, explica: "El líder sabio prepara a quien seguirá la obra cuando él ya no esté." },
                  { texto: "Que ya no puedes faltar nunca, porque sin ti todo se detiene.", valor: 0, explica: "La mejor visión es la que se cumple también por medio de los que tú formaste." },
                ],
              },
              {
                id: "e2",
                narra: "Ya preparas a un hermano fiel, y cada vez hace más cosas solo.",
                pregunta: "¿Qué haces con el ministerio?",
                opciones: [
                  { texto: "Le vas dejando la obra, para que siga cuando tú no estés.", valor: 2, explica: "Eliseo recogió el manto de Elías y siguió su obra: el líder sabio prepara a quien seguirá la obra." },
                  { texto: "Le dejas las tareas, pero todas las decisiones las sigues tomando tú.", valor: 1, explica: "Dejar tareas ayuda, pero quien seguirá la obra tiene que poder llevarla cuando tú ya no estés." },
                  { texto: "Le quitas tareas, para que no crea que ya puede hacerlo sin ti.", valor: 0, explica: "La mejor visión es la que se cumple también por medio de los que tú formaste." },
                ],
              },
              {
                id: "e3",
                narra: "Llega el día en que entregas el ministerio.",
                pregunta: "¿Qué le dices a quien sigue la obra?",
                opciones: [
                  { texto: "Lo animas, como Moisés a Josué: «Esfuérzate y anímate».", valor: 2, explica: "Moisés, delante de todo Israel, le dijo a Josué: «Esfuérzate y anímate»." },
                  { texto: "Le das la lista de tareas y le deseas buena suerte.", valor: 1, explica: "La lista ayuda, pero el líder sabio también anima, como Moisés animó a Josué." },
                  { texto: "Le adviertes que nunca lo hará tan bien como lo hacías tú.", valor: 0, explica: "Moisés no desanimó a Josué: le dijo «Esfuérzate y anímate»." },
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
            apoyo: "El líder sabio prepara a quien seguirá la obra, como Moisés con Josué y Elías con Eliseo",
            ref: "Deuteronomio 31:7-8",
            clave: {
              id: "pr-n5-liderazgo-2-6-a7-1",
              tipo: "corta",
              pregunta: "¿Qué enseñan Moisés con Josué y Elías con Eliseo sobre la sucesión en el ministerio?",
              ideas: [
                { id: "moises", peso: 35, texto: "Moisés preparó a Josué durante años y lo animó delante de todo Israel.", formas: ["(prepar*|form*|ensen*|entren*|anim*) josue", "durante anos", "esfuerzate", "delante de todo israel", "josue (sigu*|reemplaz*|continu*)"] },
                { id: "elias", peso: 35, texto: "Elías llamó a Eliseo con su manto, y Eliseo siguió su obra.", formas: ["manto eliseo", "eliseo manto", "manto (de|del) (elias|profeta)", "(llam*|form*|prepar*|ensen*) eliseo", "eliseo (sigu*|continu*|recog*)", "siguio su obra"] },
                { id: "prepara", peso: 30, texto: "El líder sabio prepara a quien seguirá la obra cuando él ya no esté.", formas: ["prepar* a quien", "prepar* (al|a su|un) (sucesor|siguiente|reemplazo)", "quien (seguira|siga|continue|continuara)", "(siga|seguira|continue|continuara) la obra", "ya no (este|estara)", "sucesor*"] },
              ],
              modelo: "Enseñan que el líder sabio prepara a quien seguirá la obra cuando él ya no esté. Moisés preparó a Josué durante años y lo animó delante de todo Israel, y Elías llamó a Eliseo con su manto; Eliseo siguió su obra.",
            },
          },
          {
            apoyo: "¿Quién podría seguir tu ministerio si mañana tuvieras que dejarlo, y qué harás para prepararlo?",
            ref: "Deuteronomio 31:7-8",
            clave: {
              id: "pr-n5-liderazgo-2-6-a7-2",
              tipo: "corta",
              pregunta: "Si mañana tuvieras que dejar tu ministerio, ¿quién podría seguirlo? ¿Qué harás desde ahora para prepararlo, según la lección?",
              ideas: [
                { id: "preparar", peso: 50, texto: "Preparar desde ahora a quien seguirá la obra, como Moisés preparó a Josué durante años.", formas: ["prepar*", "ensen*", "acompan*", "durante anos", "desde ahora"] },
                { id: "animar", peso: 50, texto: "Animarlo y presentarlo ante la iglesia, como Moisés a Josué, o llamarlo a servir a mi lado, como Elías a Eliseo.", formas: ["anim*", "esfuerzate", "present*", "delante de (la|toda)", "llam*", "manto", "conmigo", "a mi lado"] },
              ],
              modelo: "Podría seguirlo un hermano fiel que ya sirve conmigo. Desde ahora lo voy a preparar a mi lado, como Moisés preparó a Josué durante años, y lo animaré y presentaré delante de la iglesia cuando llegue el momento.",
            },
          },
        ],
      },
    ],
  },
};
