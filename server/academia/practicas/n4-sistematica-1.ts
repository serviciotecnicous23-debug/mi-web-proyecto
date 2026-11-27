/**
 * Las prácticas de «Teología sistemática I: la Biblia y Dios» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-sistematica-1.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: sigue los artículos 1 y 2 de la declaración de fe, que no tienen puntos por confirmar. Cada
 * actividad pregunta solo lo que la lección afirma, con sus mismas palabras clave: la revelación, la inspiración, la
 * Biblia sin error en lo que enseña, su suficiencia y su claridad, los nombres y los atributos de Dios, la Trinidad y
 * sus errores, la creación y la providencia. Ninguna toma posición donde las iglesias difieren: de las visiones, los
 * sueños y las profecías de hoy se pregunta solo lo que dice la lección (que ninguna está a la altura de la Escritura
 * ni puede contradecirla, y que todo se examina a la luz de la Biblia). Los grupos que la lección nombra al hablar del
 * modalismo y del arrianismo se nombran solo como ella lo hace, y los escenarios piden responder con respeto y con los
 * pasajes de la lección.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_SISTEMATICA_1: PracticasMateria = {
  materia: "n4-sistematica-1",
  mision: {
    titulo: "Dios ha hablado",
    intro: "Tu pastor te pidió que prepares un curso de doctrina para los nuevos líderes de la iglesia. Te van a preguntar cómo se da a conocer Dios, qué significa que la Biblia es inspirada y sin error en lo que enseña, cómo nos llegó y por qué basta, cómo se puede conocer a Dios, qué revelan sus nombres y sus atributos, y cómo se confiesa la Trinidad sin caer en errores. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes enseñar que Dios se dio a conocer en la creación, en su Palabra y sobre todo en su Hijo; que toda la Escritura es inspirada por Dios, sin error en lo que enseña y suficiente; que Dios es eterno, santo, justo, fiel y amor; y que adoramos a un solo Dios en tres personas, que creó todo de la nada y lo sostiene en su mano.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. La revelación de Dios
    "n4-sistematica-1-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la revelación general?", reverso: "Lo que Dios muestra de sí mismo a todas las personas, por la creación y la conciencia.", apoyo: "A esto se le llama revelación general: lo que Dios muestra de sí mismo a todas las personas, en todo lugar, por medio de la creación y de la conciencia" },
              { frente: "¿Qué muestra la conciencia, según Romanos 2:14-15?", reverso: "Que la ley de Dios está escrita en el corazón humano.", apoyo: "Y la ley de Dios está escrita en el corazón humano, como lo muestra la conciencia" },
              { frente: "¿Por qué la revelación general no basta para salvar?", reverso: "Porque muestra que Dios existe y que somos culpables, pero no anuncia el evangelio.", apoyo: "Pero la revelación general no basta para salvar: muestra que Dios existe y que somos culpables, pero no anuncia el evangelio" },
              { frente: "¿Dónde quedó escrita la revelación especial?", reverso: "En la Biblia.", apoyo: "Esa revelación quedó escrita en la Biblia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué hace la teología sistemática?", reverso: "Ordena por temas lo que toda la Biblia enseña.", apoyo: "La teología sistemática ordena por temas lo que toda la Biblia enseña" },
              { frente: "Según Pablo, ¿por qué nadie tiene excusa?", reverso: "Porque el eterno poder y la deidad de Dios se ven claramente desde la creación.", apoyo: "Pablo afirma que «las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo», de modo que nadie tiene excusa" },
              { frente: "Según Hebreos 1:1-2, ¿por medio de quiénes habló Dios de manera especial?", reverso: "Por los profetas y, en estos postreros días, por el Hijo.", apoyo: "Dios también habló de manera especial: «muchas veces y de muchas maneras» por medio de los profetas, y en estos postreros días «nos ha hablado por el Hijo»" },
              { frente: "¿A la luz de quién se entiende la Biblia?", reverso: "A la luz de Cristo: en él conocemos a Dios como Padre.", apoyo: "Por eso la Biblia se entiende a la luz de Cristo, y en Cristo conocemos a Dios como Padre" },
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
            consigna: "¿Es revelación general o revelación especial? Lleva cada frase a su grupo.",
            grupos: ["Revelación general", "Revelación especial"],
            frases: [
              { texto: "La creación muestra su eterno poder y deidad", grupo: 0 },
              { texto: "La conciencia muestra la ley escrita en el corazón", grupo: 0 },
              { texto: "Llega a todas las personas, en todo lugar", grupo: 0 },
              { texto: "Muestra que Dios existe, pero no basta para salvar", grupo: 0 },
              { texto: "Los hechos de Dios en la historia", grupo: 1, explica: "La lección los pone en la revelación especial, junto con la palabra de Dios a los profetas y a los apóstoles." },
              { texto: "La palabra de Dios a los profetas y a los apóstoles", grupo: 1 },
              { texto: "Dios nos ha hablado por el Hijo", grupo: 1 },
              { texto: "Quedó escrita en la Biblia", grupo: 1 },
            ],
            apoyo: "En la revelación general, la creación y la conciencia muestran a todos su poder y su deidad, pero no bastan para salvar",
            ref: "Romanos 1:19-20; Hebreos 1:1-2",
            explica: "La revelación general es lo que Dios muestra a todos por la creación y la conciencia, y no basta para salvar. La revelación especial incluye los hechos de Dios en la historia, su palabra a los profetas y a los apóstoles y, sobre todo, a Jesucristo, y quedó escrita en la Biblia.",
          },
          {
            consigna: "¿Lo muestra la revelación general o solo lo da la revelación especial? Lleva cada frase a su grupo.",
            grupos: ["Lo muestra la revelación general", "Solo lo da la revelación especial"],
            frases: [
              { texto: "Que Dios existe", grupo: 0 },
              { texto: "Su eterno poder y su deidad", grupo: 0 },
              { texto: "Que somos culpables", grupo: 0, explica: "La revelación general muestra que Dios existe y que somos culpables, pero no anuncia el evangelio." },
              { texto: "El evangelio", grupo: 1 },
              { texto: "Lo que Dios habló por medio de su Hijo", grupo: 1 },
              { texto: "A Dios como Padre, conocido en Cristo", grupo: 1 },
              { texto: "Lo que Dios dijo a los profetas y a los apóstoles", grupo: 1 },
            ],
            apoyo: "muestra que Dios existe y que somos culpables, pero no anuncia el evangelio",
            ref: "Romanos 1:19-20",
            explica: "La creación y la conciencia muestran que Dios existe, su eterno poder y deidad, y que somos culpables, pero no anuncian el evangelio. Eso lo da la revelación especial: Dios habló por los profetas y sobre todo por su Hijo, y en Cristo conocemos a Dios como Padre.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Romanos 1:20, ¿qué se hace claramente visible desde la creación? Toca las palabras que lo dicen.",
            texto: "las cosas invisibles de él, [[su eterno poder y deidad]], se hacen claramente visibles desde la creación del mundo",
            apoyo: "Pablo afirma que «las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo», de modo que nadie tiene excusa",
            ref: "Romanos 1:20",
            explica: "Desde la creación del mundo se hacen claramente visibles el eterno poder y la deidad de Dios, de modo que nadie tiene excusa.",
          },
          {
            consigna: "Según Salmos 19:1, ¿qué cuentan los cielos y qué anuncia el firmamento? Toca las palabras que lo dicen.",
            texto: "Los cielos cuentan [[la gloria de Dios]], Y el firmamento anuncia [[la obra de sus manos]]",
            apoyo: "A esto se le llama revelación general",
            ref: "Salmos 19:1",
            explica: "Los cielos cuentan la gloria de Dios y el firmamento anuncia la obra de sus manos: es la revelación general, lo que Dios muestra de sí mismo a todas las personas, en todo lugar.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre lo que la creación revela de Dios: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Desde la creación del mundo se ven claramente el eterno poder y la deidad de Dios.", verdad: true, explica: "Pablo afirma que su eterno poder y deidad se hacen claramente visibles desde la creación del mundo, de modo que nadie tiene excusa.", apoyo: "de modo que nadie tiene excusa", ref: "Romanos 1:20" },
              { texto: "Quien mira la creación con atención conoce el evangelio y se salva.", verdad: false, explica: "La revelación general no basta para salvar: muestra que Dios existe y que somos culpables, pero no anuncia el evangelio.", apoyo: "Pero la revelación general no basta para salvar" },
              { texto: "La conciencia muestra que la ley de Dios está escrita en el corazón humano.", verdad: true, explica: "La ley de Dios está escrita en el corazón humano, como lo muestra la conciencia.", apoyo: "Y la ley de Dios está escrita en el corazón humano, como lo muestra la conciencia", ref: "Romanos 2:14-15" },
            ],
          },
          {
            consigna: "Sobre Salmos 19 y Romanos 1: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La revelación general llega solo a quienes leen la Biblia.", verdad: false, explica: "La revelación general es lo que Dios muestra de sí mismo a todas las personas, en todo lugar, por medio de la creación y de la conciencia.", apoyo: "lo que Dios muestra de sí mismo a todas las personas, en todo lugar", ref: "Salmos 19:1-4" },
              { texto: "La revelación general muestra que Dios existe y que somos culpables.", verdad: true, explica: "Muestra que Dios existe y que somos culpables, pero no anuncia el evangelio.", apoyo: "muestra que Dios existe y que somos culpables, pero no anuncia el evangelio", ref: "Romanos 1:19-20" },
              { texto: "Por lo que muestra la creación, algunas personas tienen excusa delante de Dios.", verdad: false, explica: "Pablo dice que el eterno poder y la deidad de Dios se ven claramente desde la creación, de modo que nadie tiene excusa.", apoyo: "Pablo afirma que «las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo», de modo que nadie tiene excusa", ref: "Romanos 1:20" },
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
            apoyo: "Jesucristo es la revelación suprema de Dios",
            ref: "Juan 1:18; Juan 14:9",
            titulo: "Con la naturaleza me basta",
            relato: [
              "Andrés es un compañero de trabajo que a veces conversa contigo. Los domingos sale al campo a mirar las montañas y el cielo.",
              "Un lunes te dice: Allá siento que Dios existe. No necesito la Biblia ni a Jesús: con la naturaleza me basta.",
              "Eres líder de una célula y quieres responderle con lo que enseña la Biblia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿En qué tiene razón Andrés?",
                opciones: [
                  { texto: "En que la creación muestra a todos el poder y la deidad de Dios.", bien: true, explica: "Es la revelación general: los cielos cuentan la gloria de Dios, y su eterno poder y deidad se ven claramente desde la creación." },
                  { texto: "En nada: la naturaleza no muestra absolutamente nada de Dios.", explica: "La creación sí muestra a Dios: su eterno poder y deidad se hacen claramente visibles desde la creación del mundo." },
                  { texto: "En todo: con mirar la creación basta para conocer a Dios y salvarse.", explica: "La revelación general no basta para salvar: muestra que Dios existe y que somos culpables, pero no anuncia el evangelio." },
                  { texto: "En que Dios se muestra en el campo, pero nunca en la conciencia humana.", explica: "La revelación general llega por medio de la creación y de la conciencia: la ley de Dios está escrita en el corazón humano." },
                ],
                apoyo: "lo que Dios muestra de sí mismo a todas las personas, en todo lugar, por medio de la creación y de la conciencia",
                ref: "Romanos 1:20",
                explica: "La creación muestra a todas las personas el eterno poder y la deidad de Dios: es la revelación general.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Por qué no le basta la naturaleza?",
                opciones: [
                  { texto: "Porque muestra que Dios existe y que somos culpables, pero no anuncia el evangelio.", bien: true, explica: "La revelación general no basta para salvar: no anuncia el evangelio." },
                  { texto: "Porque la naturaleza engaña y enseña cosas falsas sobre cómo es Dios en realidad.", explica: "Los cielos cuentan la gloria de Dios y el firmamento anuncia la obra de sus manos; lo que le falta a la creación es que no anuncia el evangelio." },
                  { texto: "Porque Dios solo se muestra en la creación a las personas que ya van a la iglesia.", explica: "La revelación general es para todas las personas, en todo lugar." },
                  { texto: "Porque Dios se esconde y no quiere que nadie lo conozca por las obras de sus manos.", explica: "Dios se da a conocer: el firmamento anuncia la obra de sus manos." },
                ],
                apoyo: "Pero la revelación general no basta para salvar: muestra que Dios existe y que somos culpables, pero no anuncia el evangelio",
                explica: "La revelación general no basta para salvar: muestra que Dios existe y que somos culpables, pero no anuncia el evangelio.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Hacia quién lo diriges para que conozca a Dios de verdad?",
                opciones: [
                  { texto: "Hacia Jesucristo: el que lo ha visto a él, ha visto al Padre.", bien: true, explica: "Jesucristo es la revelación suprema de Dios. Jesús dijo: «El que me ha visto a mí, ha visto al Padre»." },
                  { texto: "Hacia una montaña más alta, donde podrá sentir a Dios más cerca.", explica: "La creación muestra el poder de Dios, pero no basta para salvar. Dios habló sobre todo por su Hijo." },
                  { texto: "Hacia su propio corazón, que le dirá todo lo que necesita saber.", explica: "La conciencia muestra la ley de Dios, pero no anuncia el evangelio: en Cristo conocemos a Dios como Padre." },
                  { texto: "Hacia los sabios de su ciudad, que saben más de Dios que la Biblia.", explica: "La revelación especial quedó escrita en la Biblia, y Jesucristo es la revelación suprema de Dios." },
                ],
                apoyo: "Jesucristo es la revelación suprema de Dios",
                ref: "Juan 14:9",
                explica: "A Dios nadie le vio jamás; el unigénito Hijo le ha dado a conocer. Jesucristo es la revelación suprema de Dios.",
              },
              {
                tipo: "explica",
                apoyo: "Esa revelación quedó escrita en la Biblia",
                ref: "Hebreos 1:1-2",
                clave: {
                  id: "pr-n4-sistematica-1-1-a5-1",
                  tipo: "corta",
                  pregunta: "Andrés te pregunta: ¿Y para qué tendría que leer la Biblia? Escribe lo que le responderías.",
                  ideas: [
                    { id: "especial", peso: 50, texto: "En la Biblia quedó escrita la revelación especial: Dios habló por los profetas y sobre todo por su Hijo.", formas: ["quedo escrita", "esta escrita", "revelacion especial", "por los profetas", "por medio de los profetas", "nos ha hablado", "dios (hablo|habla|hablado) por", "(habla|hablo) dios", "dios (nos|te|le) habla", "palabra de dios"] },
                    { id: "cristo", peso: 50, texto: "En ella conocemos a Jesucristo, la revelación suprema: en Cristo conocemos a Dios como Padre.", formas: ["jesucristo", "a cristo", "a jesus", "en cristo", "al hijo", "por el hijo", "su hijo", "dios como padre", "al padre", "revelacion suprema", "el evangelio"] },
                  ],
                  modelo: "Porque en la Biblia quedó escrita la revelación especial: Dios habló por los profetas y sobre todo por su Hijo. Ahí conoces a Jesucristo, y en Cristo conocemos a Dios como Padre.",
                },
              },
            ],
          },
          {
            apoyo: "Por eso la Biblia se entiende a la luz de Cristo, y en Cristo conocemos a Dios como Padre",
            ref: "Juan 1:18",
            titulo: "La pregunta de Sofía",
            relato: [
              "Sofía es una joven de tu grupo que estudia biología. Le encanta ver cómo funciona la vida, y dice que ahí ve la mano de Dios.",
              "Una noche te pregunta: Si la creación ya me muestra a Dios, ¿por qué en la iglesia insisten tanto en Jesús?",
              "Eres maestro de jóvenes y quieres responderle con lo que enseña la Biblia.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices primero sobre lo que ella ve en la creación?",
                opciones: [
                  { texto: "Que tiene razón: la creación muestra su eterno poder y deidad.", bien: true, explica: "Es la revelación general: desde la creación del mundo se hacen claramente visibles su eterno poder y deidad." },
                  { texto: "Que se equivoca: en la creación no se puede ver nada de Dios.", explica: "La creación sí muestra a Dios: los cielos cuentan su gloria, y su eterno poder y deidad se ven desde la creación." },
                  { texto: "Que lo que ve en la creación ya le basta para conocer el evangelio.", explica: "La revelación general no basta para salvar: no anuncia el evangelio." },
                  { texto: "Que eso solo lo pueden ver los creyentes que estudian la Biblia.", explica: "La revelación general es lo que Dios muestra de sí mismo a todas las personas, en todo lugar." },
                ],
                apoyo: "En la revelación general, la creación y la conciencia muestran a todos su poder y su deidad, pero no bastan para salvar",
                ref: "Romanos 1:20",
                explica: "La creación muestra a todos el poder y la deidad de Dios, pero no basta para salvar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Por qué insistimos tanto en Jesús?",
                opciones: [
                  { texto: "Porque a Dios nadie le vio jamás, y el Hijo le ha dado a conocer.", bien: true, explica: "Jesucristo es la revelación suprema de Dios: el unigénito Hijo, que está en el seno del Padre, le ha dado a conocer." },
                  { texto: "Porque Jesús fue un buen maestro, uno más de los que hablaron de Dios.", explica: "Jesucristo no es uno más: es la revelación suprema de Dios." },
                  { texto: "Porque así lo decidió la iglesia, aunque la Biblia no hable de eso.", explica: "Hebreos dice que en estos postreros días Dios nos ha hablado por el Hijo." },
                  { texto: "Porque Jesús vino a borrar todo lo que Dios muestra en la creación.", explica: "La creación sigue mostrando la gloria de Dios; pero no basta para salvar, y Dios habló sobre todo por su Hijo." },
                ],
                apoyo: "«A Dios nadie le vio jamás; el unigénito Hijo, que está en el seno del Padre, él le ha dado a conocer»",
                ref: "Juan 1:18",
                explica: "A Dios nadie le vio jamás; el unigénito Hijo le ha dado a conocer. Jesucristo es la revelación suprema de Dios.",
              },
              {
                tipo: "situacion",
                pregunta: "Sofía pregunta: ¿Y cómo debo leer la Biblia, entonces?",
                opciones: [
                  { texto: "A la luz de Cristo, porque en él conocemos a Dios como Padre.", bien: true, explica: "La Biblia se entiende a la luz de Cristo, y en Cristo conocemos a Dios como Padre." },
                  { texto: "Saltando lo que habla de Jesús, para ir a lo que dice de la creación.", explica: "La Biblia se entiende a la luz de Cristo: él es la revelación suprema de Dios." },
                  { texto: "Solo en las partes que coinciden con lo que ella ya ve en la naturaleza.", explica: "La creación no basta para salvar; la revelación especial quedó escrita en la Biblia y se entiende a la luz de Cristo." },
                  { texto: "Como un libro de datos sobre la vida, sin buscar en él a nadie.", explica: "La Biblia se entiende a la luz de Cristo: en él conocemos a Dios como Padre." },
                ],
                apoyo: "Por eso la Biblia se entiende a la luz de Cristo, y en Cristo conocemos a Dios como Padre",
                explica: "La Biblia se entiende a la luz de Cristo, y en Cristo conocemos a Dios como Padre.",
              },
              {
                tipo: "explica",
                apoyo: "Jesucristo es la revelación suprema de Dios",
                ref: "Juan 14:9",
                clave: {
                  id: "pr-n4-sistematica-1-1-a5-2",
                  tipo: "corta",
                  pregunta: "Sofía te pregunta: ¿por qué decimos que Jesús es la revelación suprema de Dios, por encima de los profetas? Escribe lo que le dirías.",
                  ideas: [
                    { id: "hijo", peso: 50, texto: "Dios habló muchas veces por los profetas, pero en estos postreros días nos ha hablado por el Hijo.", formas: ["nos ha hablado", "(hablo|habla|hablado) por (el|su) hijo", "(hablo|habla|hablado) por medio (de|del) (el|su|jesus|cristo|hijo)", "postreros dias", "por medio del hijo", "es el hijo", "es su hijo", "hijo de dios", "unigenito"] },
                    { id: "visto", peso: 50, texto: "A Dios nadie le vio jamás; el Hijo le ha dado a conocer: el que ha visto a Jesús, ha visto al Padre.", formas: ["visto al padre", "ve al padre", "ver al padre", "dado a conocer", "da a conocer", "dio a conocer", "(revela|revelo|muestra|mostro|enseno) al padre", "(revela|revelo|muestra|mostro|enseno) * padre", "nadie (le|lo) (vio|visto)", "seno del padre"] },
                  ],
                  modelo: "Porque Dios habló muchas veces por los profetas, pero en estos postreros días nos ha hablado por el Hijo. A Dios nadie le vio jamás, y el Hijo le ha dado a conocer: el que ha visto a Jesús, ha visto al Padre.",
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
            apoyo: "Dios se da a conocer",
            ref: "Salmos 19:1-4; Hebreos 1:1-2",
            clave: {
              id: "pr-n4-sistematica-1-1-a6-1",
              tipo: "corta",
              pregunta: "¿En qué se diferencia la revelación general de la revelación especial?",
              ideas: [
                { id: "general", peso: 40, texto: "La revelación general es lo que Dios muestra de sí mismo a todas las personas, por medio de la creación y de la conciencia.", formas: ["creacion", "naturaleza", "conciencia", "los cielos", "todas las personas", "a todos", "todo lugar"] },
                { id: "basta", peso: 20, negativa: true, texto: "La revelación general no basta para salvar: no anuncia el evangelio.", formas: ["no basta", "no alcanza", "no es suficiente", "no salva", "no (anuncia|trae|da|dice|muestra) el evangelio", "no puede salvar", "no sirve para salvar"] },
                { id: "especial", peso: 40, texto: "La revelación especial es la palabra de Dios por los profetas y sobre todo por su Hijo, y quedó escrita en la Biblia.", formas: ["profetas", "apostoles", "hijo", "jesus", "jesucristo", "cristo", "biblia", "escritura", "quedo escrita"] },
              ],
              errores: [
                { id: "general-biblia", texto: "La revelación general llega por la creación y la conciencia; la especial quedó escrita en la Biblia.", formas: ["general (es|son|esta|seria) (la|el) (biblia|escritura|palabra)", "especial (es|son|esta|seria) (la|el) (naturaleza|creacion|conciencia)", "general (jesus|cristo|hijo|profetas|apostoles|biblia|escritura)", "general * * (jesus|cristo|hijo|profetas|apostoles|biblia|escritura)", "especial (naturaleza|creacion|conciencia|cielos)", "especial * * (naturaleza|creacion|conciencia|cielos)"], anula: "general" },
                { id: "general-salva", texto: "La revelación general no basta para salvar.", formas: ["general (basta|alcanza|sirve) para salvar", "general salva", "creacion salva", "creacion basta para salvar"], anula: "basta" },
              ],
              modelo: "La revelación general es lo que Dios muestra a todas las personas por la creación y la conciencia, pero no basta para salvar. La revelación especial es la palabra de Dios por los profetas y sobre todo por su Hijo, y quedó escrita en la Biblia.",
            },
          },
          {
            apoyo: "¿Qué te muestra de Dios la creación, y qué solo puedes conocer por la Biblia?",
            ref: "Romanos 1:20; Juan 14:9",
            clave: {
              id: "pr-n4-sistematica-1-1-a6-2",
              tipo: "corta",
              pregunta: "¿Qué te muestra de Dios la creación, y qué solo puedes conocer por la Biblia?",
              ideas: [
                { id: "creacion", peso: 50, texto: "La creación muestra que Dios existe, su eterno poder y su deidad; la conciencia muestra que somos culpables.", formas: ["eterno poder", "(su|gran|el) poder", "poderoso", "deidad", "existe", "existencia", "su gloria", "culpables", "creador"] },
                { id: "biblia", peso: 50, texto: "Solo por la Biblia conocemos el evangelio y a Dios como Padre, en Cristo.", formas: ["evangelio", "dios como padre", "a cristo", "en cristo", "a jesus", "jesucristo", "salvacion", "por el hijo", "su hijo", "salvar"] },
              ],
              errores: [
                { id: "creacion-evangelio", texto: "La creación muestra el poder y la deidad de Dios, pero no anuncia el evangelio.", formas: ["creacion (anuncia|muestra|ensena|da) evangelio", "naturaleza (anuncia|muestra|ensena|da) evangelio"], anula: "biblia" },
              ],
              modelo: "La creación me muestra que Dios existe, su eterno poder y su deidad, y la conciencia muestra que somos culpables. Pero solo por la Biblia conozco el evangelio y a Dios como Padre, en Cristo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. La inspiración y la autoridad de la Biblia
    "n4-sistematica-1-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué significa, literalmente, la palabra griega que se traduce inspirada?", reverso: "Exhalada por Dios: sale de Dios como el aliento sale de la boca.", apoyo: "La palabra griega que se traduce así significa, literalmente, exhalada por Dios" },
              { frente: "¿Para qué es útil la Escritura, según 2 Timoteo 3:16?", reverso: "Para enseñar, para redargüir, para corregir y para instruir en justicia.", apoyo: "Por eso es útil «para enseñar, para redargüir, para corregir, para instruir en justicia»" },
              { frente: "Según Pedro, ¿cómo hablaron los santos hombres de Dios?", reverso: "Siendo inspirados por el Espíritu Santo.", apoyo: "sino que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo" },
              { frente: "¿Cuál es el versículo de memoria de esta materia?", reverso: "2 Timoteo 3:16.", apoyo: "Es el versículo de memoria de esta materia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuántos autores escribieron la Biblia, más o menos?", reverso: "Unos cuarenta, a lo largo de unos mil quinientos años.", apoyo: "La Biblia fue escrita por unos cuarenta autores a lo largo de unos mil quinientos años" },
              { frente: "¿Por qué la Biblia tiene un solo mensaje?", reverso: "Porque detrás de los autores humanos hay un solo Autor.", apoyo: "Porque detrás de los autores humanos hay un solo Autor" },
              { frente: "Según Lucas 1:3, ¿cómo trabajó Lucas al escribir?", reverso: "Investigó con cuidado.", apoyo: "Lucas investigó con cuidado (Lucas 1:3)" },
              { frente: "¿Qué es la Escritura para lo que creemos y hacemos?", reverso: "La autoridad final.", apoyo: "ella es la autoridad final de lo que creemos y hacemos" },
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
            consigna: "Según 2 Pedro 1:21, ¿cómo hablaron los santos hombres de Dios? Toca las palabras que lo dicen.",
            texto: "nunca la profecía fue traída por voluntad humana, sino que los santos hombres de Dios hablaron [[siendo inspirados por el Espíritu Santo]]",
            apoyo: "Dios guió a los autores de tal manera que lo que escribieron fue su Palabra, sin anular su personalidad",
            ref: "2 Pedro 1:20-21",
            explica: "Pedro explica cómo ocurrió: la profecía nunca fue traída por voluntad humana; los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo.",
          },
          {
            consigna: "Según 2 Timoteo 3:16, ¿para qué es útil la Escritura inspirada por Dios? Toca las cuatro palabras que lo dicen.",
            texto: "para [[enseñar]], para [[redargüir]], para [[corregir]], para [[instruir]] en justicia",
            apoyo: "Por eso es útil «para enseñar, para redargüir, para corregir, para instruir en justicia»",
            ref: "2 Timoteo 3:16-17",
            explica: "Toda la Escritura es inspirada por Dios, y por eso es útil para enseñar, para redargüir, para corregir y para instruir en justicia.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que significa que la Escritura es inspirada por Dios.",
            texto: "La palabra griega que se traduce inspirada significa, literalmente, [[exhalada]] por Dios: la Escritura sale de Dios como el [[aliento]] sale de la [[boca]].",
            distractores: ["copiada", "agua", "mano"],
            errores: {
              copiada: "La palabra griega significa, literalmente, exhalada por Dios.",
              agua: "La Escritura sale de Dios como el aliento sale de la boca.",
              mano: "La imagen es la del aliento, que sale de la boca.",
            },
            apoyo: "la Escritura sale de Dios como el aliento sale de la boca",
            ref: "2 Timoteo 3:16",
            explica: "Inspirada significa, literalmente, exhalada por Dios: la Escritura sale de Dios como el aliento sale de la boca.",
          },
          {
            consigna: "Completa cómo explica Pedro la inspiración.",
            texto: "Pedro explica cómo ocurrió: el [[Espíritu]] Santo guió a los [[autores]] de tal manera que lo que escribieron fue su [[Palabra]].",
            distractores: ["pueblo", "lectores", "opinión"],
            errores: {
              pueblo: "La profecía nunca fue traída por voluntad humana: el Espíritu Santo guió a los autores.",
              lectores: "El Espíritu Santo guió a los autores: los santos hombres de Dios que hablaron.",
              "opinión": "Lo que escribieron fue la Palabra de Dios, no una opinión humana.",
            },
            apoyo: "El Espíritu Santo guió a los autores humanos, con su propio estilo, para que escribieran la Palabra de Dios",
            ref: "2 Pedro 1:20-21",
            explica: "Los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo: Dios los guió de tal manera que lo que escribieron fue su Palabra.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada palabra sobre la inspiración con lo que enseña la lección.",
            pares: [
              ["Plenaria", "Toda la Escritura es inspirada, no solo algunas partes"],
              ["Verbal", "La inspiración llega a las palabras, no solo a las ideas"],
              ["Los escritos originales", "Lo que Dios inspiró cuando escribieron los autores"],
              ["Las copias y las traducciones", "Son Palabra de Dios si reproducen fielmente el original"],
            ],
            apoyo: "Plenaria: toda la Escritura es inspirada, no solo algunas partes",
            explica: "La inspiración es plenaria, porque toda la Escritura es inspirada, y verbal, porque llega a las palabras. Dios inspiró los escritos originales, y las copias y las traducciones son Palabra de Dios en la medida en que reproducen fielmente ese texto.",
          },
          {
            consigna: "Une a cada uno con lo que hizo cuando se escribió la Biblia, según la lección.",
            pares: [
              ["Lucas", "Investigó con cuidado"],
              ["Pablo", "Escribió con su estilo"],
              ["David", "Cantó con su propio estilo"],
              ["El Espíritu Santo", "Guió a los autores sin anular su personalidad"],
            ],
            apoyo: "Lucas investigó con cuidado (Lucas 1:3), Pablo escribió con su estilo y David cantó con el suyo",
            ref: "2 Pedro 1:20-21",
            explica: "Dios guió a los autores sin anular su personalidad: Lucas investigó con cuidado, Pablo escribió con su estilo y David cantó con el suyo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Si Jesús es nuestro Señor, su manera de ver la Escritura es la nuestra: ella es la autoridad final de lo que creemos y hacemos",
            ref: "Mateo 5:17-18; Juan 10:35",
            situacion: "Eres maestro de los jóvenes de tu iglesia. Hoy la clase trata de la autoridad de la Biblia, y los jóvenes empiezan a opinar.",
            escenas: [
              {
                id: "e1",
                narra: "Un joven dice: La Biblia es un buen libro, pero en mi vida la última palabra la tengo yo.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que Jesús enseñó que la Escritura no puede ser quebrantada: ella tiene la última palabra.", valor: 2, explica: "Si Jesús es nuestro Señor, su manera de ver la Escritura es la nuestra: ella es la autoridad final de lo que creemos y hacemos." },
                  { texto: "Que hace bien en verla como un buen libro, y que la lea un poco cada día de la semana.", valor: 1, explica: "Leerla es bueno, pero falta lo principal: si la Biblia es la Palabra de Dios, merece tu obediencia, no solo tu admiración." },
                  { texto: "Que tiene razón: cada uno decide qué partes de la Biblia quiere seguir y cuáles no sigue.", valor: 0, explica: "Jesús afirmó que la Escritura no puede ser quebrantada: ella es la autoridad final, no lo que cada uno decide." },
                ],
              },
              {
                id: "e2",
                narra: "Una joven pregunta: ¿Jesús no vino a quitar la ley y los profetas?",
                pregunta: "¿Qué le contestas?",
                opciones: [
                  { texto: "Que Jesús dijo que no vino a abrogar la ley ni los profetas, sino a cumplir.", valor: 2, explica: "Jesús dijo que no vino a abrogar la ley ni los profetas, sino a cumplir, y que ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido." },
                  { texto: "Que es una buena pregunta y que la van a estudiar juntos en la próxima clase.", valor: 1, explica: "Estudiarla es bueno, pero la lección ya lo responde: Jesús no vino a abrogar la ley ni los profetas, sino a cumplir." },
                  { texto: "Que sí: desde que vino Jesús, la ley y los profetas ya no tienen ninguna autoridad.", valor: 0, explica: "Jesús dijo lo contrario: no vino a abrogar la ley ni los profetas, sino a cumplir, y la Escritura no puede ser quebrantada." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, un joven comenta: Yo admiro mucho la Biblia; es un libro muy bonito.",
                pregunta: "¿Qué le propones para cerrar la clase?",
                opciones: [
                  { texto: "Que piense en qué área de su vida necesita que la Biblia tenga la última palabra.", valor: 2, explica: "Si la Biblia es la Palabra de Dios, merece tu obediencia, no solo tu admiración." },
                  { texto: "Que la siga admirando y que esta semana lea con calma un capítulo cada mañana.", valor: 1, explica: "Leerla es bueno, pero la Biblia merece tu obediencia, no solo tu admiración." },
                  { texto: "Que con admirarla basta, porque obedecerla al pie de la letra es solo para los pastores.", valor: 0, explica: "La Escritura es la autoridad final de lo que creemos y hacemos: merece la obediencia de todos, no solo la admiración." },
                ],
              },
            ],
          },
          {
            apoyo: "Si la Biblia es la Palabra de Dios, merece tu obediencia, no solo tu admiración",
            ref: "2 Pedro 1:20-21; Juan 10:35",
            situacion: "Eres pastor asistente. Un hermano de la iglesia te pide consejo: tiene que tomar una decisión importante, sabe lo que dice la Biblia sobre el tema, pero no le gusta.",
            escenas: [
              {
                id: "e1",
                narra: "Te dice: Sé lo que dice la Biblia, pero mi corazón me dice otra cosa.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que la Escritura es la autoridad final de lo que creemos y hacemos, también en esto.", valor: 2, explica: "La Escritura es la autoridad final de lo que creemos y hacemos: también en esta decisión necesita tener la última palabra." },
                  { texto: "Que ore y lea otra vez con calma lo que dice la Biblia, antes de decidir cualquier cosa.", valor: 1, explica: "Orar y leer es bueno, pero recuérdale lo principal: la Escritura es la autoridad final de lo que creemos y hacemos." },
                  { texto: "Que siga a su corazón: Dios entiende que a veces lo que dice la Biblia no se aplica.", valor: 0, explica: "Jesús enseñó que la Escritura no puede ser quebrantada: ella es la autoridad final de lo que creemos y hacemos." },
                ],
              },
              {
                id: "e2",
                narra: "Te dice: Al fin y al cabo, la Biblia la escribieron hombres; pudieron equivocarse en esto.",
                pregunta: "¿Qué le contestas?",
                opciones: [
                  { texto: "Que los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo.", valor: 2, explica: "Dios guió a los autores de tal manera que lo que escribieron fue su Palabra, y Jesús enseñó que la Escritura no puede ser quebrantada." },
                  { texto: "Que la escribieron unos cuarenta autores a lo largo de unos mil quinientos años.", valor: 1, explica: "Es verdad, pero falta lo principal: detrás de los autores humanos hay un solo Autor, y los santos hombres de Dios hablaron siendo inspirados por el Espíritu Santo." },
                  { texto: "Que tiene razón: en los temas difíciles los autores escribieron solo su opinión personal.", valor: 0, explica: "Lo que escribieron fue la Palabra de Dios: nunca la profecía fue traída por voluntad humana." },
                ],
              },
              {
                id: "e3",
                narra: "Al final te pregunta: Entonces, ¿qué hago ahora?",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que obedezca lo que dice la Biblia, aunque le cueste: merece su obediencia.", valor: 2, explica: "Si la Biblia es la Palabra de Dios, merece tu obediencia, no solo tu admiración." },
                  { texto: "Que lo piense unos días más, mientras lee otra vez lo que dice la Biblia del tema.", valor: 1, explica: "Pensarlo con la Biblia es bueno, pero no debe quedarse ahí: la Biblia merece su obediencia." },
                  { texto: "Que haga lo que le parezca mejor, porque la Biblia es solo un consejo entre muchos.", valor: 0, explica: "La Escritura no es un consejo más: es la autoridad final de lo que creemos y hacemos." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Verbal: la inspiración llega a las palabras, no solo a las ideas",
            ref: "2 Timoteo 3:16",
            clave: {
              id: "pr-n4-sistematica-1-2-a6-1",
              tipo: "corta",
              pregunta: "¿Qué significa que la inspiración de la Biblia es plenaria y verbal?",
              ideas: [
                { id: "plenaria", peso: 50, texto: "Plenaria: toda la Escritura es inspirada, no solo algunas partes.", formas: ["toda la (escritura|biblia|palabra)", "todas (sus|las) partes", "no solo algunas", "toda ella", "toda es inspirada", "todos (sus|los) libros", "cada parte", "(escritura|biblia) (completa|entera)"] },
                { id: "verbal", peso: 50, texto: "Verbal: la inspiración llega a las palabras, no solo a las ideas.", formas: ["llega a las palabras", "(las|sus) palabras", "cada palabra", "palabra por palabra", "no solo ideas"] },
              ],
              errores: [
                { id: "algunas", texto: "La inspiración es plenaria: toda la Escritura es inspirada, no solo algunas partes.", formas: ["solo (unas|algunas|ciertas) partes", "algunas partes (son|estan|fueron) inspirad*"], anula: "plenaria" },
                { id: "ideas", texto: "La inspiración es verbal: llega a las palabras, no solo a las ideas.", formas: ["solo ideas", "no (a|en) las palabras", "palabras no (son|estan|fueron)"], anula: "verbal" },
              ],
              modelo: "Plenaria quiere decir que toda la Escritura es inspirada, no solo algunas partes. Verbal quiere decir que la inspiración llega a las palabras que escribieron los autores, no solo a las ideas.",
            },
          },
          {
            apoyo: "Dios guió a los autores de tal manera que lo que escribieron fue su Palabra, sin anular su personalidad",
            ref: "2 Pedro 1:20-21",
            clave: {
              id: "pr-n4-sistematica-1-2-a6-2",
              tipo: "corta",
              pregunta: "¿Qué papel tuvieron los autores humanos cuando se escribió la Biblia?",
              ideas: [
                { id: "guio", peso: 50, texto: "El Espíritu Santo los guió de tal manera que lo que escribieron fue la Palabra de Dios.", formas: ["gui*", "inspirad*", "inspiro", "espiritu santo", "palabra de dios", "su palabra", "exhalad*"] },
                { id: "estilo", peso: 50, negativa: true, texto: "Dios no anuló su personalidad: cada uno escribió con su propio estilo, como Lucas, Pablo y David.", formas: ["estilo", "personalidad", "su manera", "a su modo", "investigo", "investigar", "con cuidado"] },
              ],
              errores: [
                { id: "anulo", texto: "Dios guió a los autores sin anular su personalidad: cada uno escribió con su estilo.", formas: ["(anulo|anula|borro|quito) (su|la|sus) personalidad*", "sin (su|ningun|propio) estilo"], anula: "estilo" },
              ],
              modelo: "Los autores escribieron con su propio estilo: Lucas investigó con cuidado y Pablo escribió a su manera. Pero el Espíritu Santo los guió, y lo que escribieron fue la Palabra de Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Una Biblia sin error, clara y suficiente
    "n4-sistematica-1-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Por qué lo que enseña la Palabra de Dios es verdad?", reverso: "Porque Dios no miente (Tito 1:2).", apoyo: "Porque Dios no miente (Tito 1:2), lo que su Palabra enseña es verdad" },
              { frente: "¿Cómo se interpreta bien la Biblia, según la lección?", reverso: "Según su sentido y su género.", apoyo: "cuando se interpreta bien, según su sentido y su género, todo lo que afirma es verdad" },
              { frente: "¿Cuántos manuscritos en griego del Nuevo Testamento se conservan?", reverso: "Más de cinco mil.", apoyo: "Del Nuevo Testamento se conservan más de cinco mil manuscritos en griego" },
              { frente: "¿Qué hace la iluminación del Espíritu?", reverso: "Abre el corazón para comprender y obedecer lo que ya está escrito.", apoyo: "abre el corazón para comprender y obedecer lo que ya está escrito" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué es verdad todo lo que la Biblia afirma?", reverso: "En la fe, en la conducta y en los hechos que narra.", apoyo: "todo lo que afirma es verdad, en la fe, en la conducta y en los hechos que narra" },
              { frente: "¿Qué se encontró en 1947 junto al mar Muerto?", reverso: "Rollos de libros del Antiguo Testamento, entre ellos Isaías completo.", apoyo: "En 1947 se encontraron, junto al mar Muerto, rollos de libros del Antiguo Testamento" },
              { frente: "¿Qué contiene la Escritura, que es suficiente?", reverso: "Todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios.", apoyo: "contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios" },
              { frente: "¿Cómo se examina una visión, un sueño o una profecía de hoy?", reverso: "A la luz de la Biblia, que nada puede contradecir.", apoyo: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura ni puede contradecirla: todo se examina a la luz de la Biblia (1 Tesalonicenses 5:20-21)" },
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
            consigna: "Sobre la Biblia sin error en lo que enseña: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cuando la Biblia dice que el sol sale y se pone, describe el mundo como lo ve quien lo observa.", verdad: true, explica: "La Biblia no habla como un libro de ciencia moderna: describe el mundo como lo ve quien lo observa, y eso no es un error.", apoyo: "describe el mundo como lo ve quien lo observa, como cuando dice que el sol sale y se pone" },
              { texto: "Que la Biblia sea sin error significa que habla como un libro de ciencia moderna.", verdad: false, explica: "Esto no significa que la Biblia hable como un libro de ciencia moderna: describe el mundo como lo ve quien lo observa.", apoyo: "Esto no significa que la Biblia hable como un libro de ciencia moderna" },
              { texto: "Bien interpretado según su sentido y su género, todo lo que la Biblia afirma es verdad.", verdad: true, explica: "Cuando se interpreta bien, según su sentido y su género, todo lo que afirma es verdad, en la fe, en la conducta y en los hechos que narra.", apoyo: "cuando se interpreta bien, según su sentido y su género, todo lo que afirma es verdad", ref: "Proverbios 30:5" },
            ],
          },
          {
            consigna: "Sobre lo que significa que la Biblia no tiene error: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Que la Biblia sea sin error anula sus figuras, su poesía y sus números redondos.", verdad: false, explica: "Ser sin error tampoco anula las figuras, la poesía ni los números redondos.", apoyo: "Tampoco anula las figuras, la poesía ni los números redondos" },
              { texto: "Dios no nos engaña en nada de lo que su Palabra afirma.", verdad: true, explica: "Eso significa que la Biblia es sin error: porque Dios no miente, lo que su Palabra enseña es verdad.", apoyo: "Significa que Dios no nos engaña en nada de lo que su Palabra afirma", ref: "Tito 1:2" },
              { texto: "La Biblia es verdad en la fe y en la conducta, pero puede fallar en los hechos que narra.", verdad: false, explica: "Todo lo que afirma es verdad, en la fe, en la conducta y en los hechos que narra.", apoyo: "Decimos que la Biblia es sin error en lo que enseña" },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada dato sobre cómo nos llegó la Biblia con lo que le corresponde.",
            pares: [
              ["Los escritos originales", "No los tenemos, pero sí miles de copias antiguas"],
              ["Más de cinco mil", "Los manuscritos en griego del Nuevo Testamento que se conservan"],
              ["1947", "El año en que se encontraron los rollos junto al mar Muerto"],
              ["Comparar las copias", "Permite recuperar el texto con gran seguridad"],
            ],
            apoyo: "No tenemos los escritos originales, pero sí miles de copias antiguas",
            ref: "Isaías 40:8",
            explica: "No tenemos los escritos originales, pero sí miles de copias antiguas: más de cinco mil manuscritos en griego del Nuevo Testamento y los rollos encontrados en 1947 junto al mar Muerto. Comparando las copias, los estudiosos recuperan el texto con gran seguridad.",
          },
          {
            consigna: "Une cada pregunta sobre los rollos del mar Muerto con su respuesta.",
            pares: [
              ["¿Cuándo se encontraron?", "En 1947"],
              ["¿Dónde se encontraron?", "Junto al mar Muerto"],
              ["¿Cuánto más antiguos eran que las copias conocidas?", "Unos mil años"],
              ["¿Qué libro estaba completo entre ellos?", "Isaías"],
              ["¿Cómo es su texto, comparado con las copias de antes?", "Coincide en lo esencial"],
            ],
            apoyo: "entre ellos el libro de Isaías completo, y su texto coincide en lo esencial",
            ref: "Isaías 40:8",
            explica: "En 1947 se encontraron, junto al mar Muerto, rollos unos mil años más antiguos que las copias que se conocían, entre ellos el libro de Isaías completo, y su texto coincide en lo esencial.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que la lección enseña sobre la Escritura suficiente y clara.",
            texto: "La Escritura contiene todo lo que necesitamos saber para la [[salvación]], y es [[clara]] en lo esencial: un creyente [[sencillo]] puede entender el evangelio.",
            distractores: ["ciencia", "oscura", "experto"],
            errores: {
              ciencia: "La Escritura contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios; no habla como un libro de ciencia moderna.",
              oscura: "La Escritura es clara en lo esencial.",
              experto: "No hace falta ser experto: un creyente sencillo puede entender el evangelio y lo que Dios le pide.",
            },
            apoyo: "Y es clara en lo esencial: un creyente sencillo puede entender el evangelio y lo que Dios le pide",
            ref: "Salmos 19:7-8",
            explica: "La Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios. Y es clara en lo esencial: un creyente sencillo puede entender el evangelio.",
          },
          {
            consigna: "Completa lo que hace la iluminación del Espíritu.",
            texto: "La iluminación del Espíritu no añade revelaciones nuevas a la Biblia: abre el [[corazón]] para comprender y [[obedecer]] lo que ya está [[escrito]].",
            distractores: ["cielo", "olvidar", "oculto"],
            errores: {
              cielo: "La iluminación no trae revelaciones nuevas: abre el corazón para comprender lo que ya está escrito.",
              olvidar: "El Espíritu ayuda al creyente a comprender y obedecer lo que ya está escrito.",
              oculto: "La iluminación no añade nada: ayuda a comprender lo que ya está escrito.",
            },
            apoyo: "La iluminación no añade revelaciones nuevas a la Biblia: abre el corazón para comprender y obedecer lo que ya está escrito",
            ref: "1 Corintios 2:12-14",
            explica: "El mismo Espíritu que inspiró la Escritura ayuda al creyente a entenderla: la iluminación no añade revelaciones nuevas, sino que abre el corazón para comprender y obedecer lo que ya está escrito.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Puedes apoyar toda tu vida en la Palabra de Dios: no te va a fallar",
            ref: "Proverbios 30:5; 2 Timoteo 3:16-17",
            titulo: "Las dudas de Marta",
            relato: [
              "Marta es nueva en la fe y va a tu célula. En el trabajo, una compañera le dijo que la Biblia está llena de errores y que ya nadie sabe lo que decía al principio.",
              "Marta te escribe preocupada. También te cuenta que lee la Biblia y a veces siente que no entiende nada.",
              "Eres su líder de célula y quieres ayudarla con lo que enseña la Biblia sobre sí misma.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "La compañera dice que la Biblia se equivoca porque dice que el sol sale y se pone. ¿Qué le explicas a Marta?",
                opciones: [
                  { texto: "Que así la Biblia describe el mundo como lo ve quien lo observa, y eso no es un error.", bien: true, explica: "La Biblia no habla como un libro de ciencia moderna: describe el mundo como lo ve quien lo observa." },
                  { texto: "Que es cierto: en lo que dice de la naturaleza, la Biblia sí tiene muchos errores.", explica: "Bien interpretada, todo lo que la Biblia afirma es verdad; decir que el sol sale es describir el mundo como lo ve quien lo observa." },
                  { texto: "Que la Biblia es un libro de ciencia moderna y que lo explica todo como lo hace la ciencia.", explica: "La Biblia no habla como un libro de ciencia moderna: describe el mundo como lo ve quien lo observa." },
                  { texto: "Que no le responda nada, porque esas preguntas sobre la Biblia no tienen ninguna respuesta.", explica: "Esas dudas se responden con lo que enseña la Biblia: cuando se interpreta bien, todo lo que afirma es verdad." },
                ],
                apoyo: "describe el mundo como lo ve quien lo observa, como cuando dice que el sol sale y se pone",
                explica: "La Biblia no habla como un libro de ciencia moderna: describe el mundo como lo ve quien lo observa, como cuando dice que el sol sale y se pone.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre lo que decía la Biblia al principio?",
                opciones: [
                  { texto: "Que hay miles de copias antiguas, y al compararlas se recupera el texto con gran seguridad.", bien: true, explica: "No tenemos los escritos originales, pero sí miles de copias antiguas, y comparándolas se recupera el texto con gran seguridad." },
                  { texto: "Que tiene razón: como no tenemos los escritos originales, ya no sabemos lo que decían.", explica: "No tenemos los originales, pero sí miles de copias antiguas: comparándolas, los estudiosos recuperan el texto con gran seguridad." },
                  { texto: "Que todas las copias antiguas se perdieron, pero que hay que creer de todos modos en la Biblia.", explica: "Se conservan miles de copias antiguas: del Nuevo Testamento, más de cinco mil manuscritos en griego." },
                  { texto: "Que los rollos del mar Muerto mostraron que el texto cambió mucho con el paso de los años.", explica: "Los rollos del mar Muerto, unos mil años más antiguos que las copias que se conocían, coinciden en lo esencial." },
                ],
                apoyo: "Comparando las copias, los estudiosos recuperan el texto con gran seguridad, y ninguna doctrina depende de un pasaje dudoso",
                explica: "No tenemos los escritos originales, pero sí miles de copias antiguas; comparándolas, se recupera el texto con gran seguridad.",
              },
              {
                tipo: "situacion",
                pregunta: "Marta te dice que no entiende nada de la Biblia. ¿Qué le respondes?",
                opciones: [
                  { texto: "Que es clara en lo esencial, y que el Espíritu la ayuda a entenderla y a obedecerla.", bien: true, explica: "La Escritura es clara en lo esencial, y el mismo Espíritu que la inspiró ayuda al creyente a entenderla y a recibirla." },
                  { texto: "Que la Biblia es solo para los que estudiaron teología durante muchos años en un seminario.", explica: "La Escritura es clara en lo esencial: un creyente sencillo puede entender el evangelio y lo que Dios le pide." },
                  { texto: "Que espere a que Dios le dé una revelación nueva que le explique lo que dice la Biblia.", explica: "La iluminación no añade revelaciones nuevas a la Biblia: abre el corazón para comprender lo que ya está escrito." },
                  { texto: "Que la deje por un tiempo y que solo escuche lo que se predica los domingos en el culto.", explica: "Un creyente sencillo puede entender el evangelio, y el Espíritu ayuda al creyente a entender la Escritura." },
                ],
                apoyo: "Y es clara en lo esencial: un creyente sencillo puede entender el evangelio y lo que Dios le pide",
                explica: "La Escritura es clara en lo esencial, y el mismo Espíritu que la inspiró ayuda al creyente a entenderla y a recibirla.",
              },
              {
                tipo: "explica",
                apoyo: "La Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios",
                ref: "2 Timoteo 3:17",
                clave: {
                  id: "pr-n4-sistematica-1-3-a5-1",
                  tipo: "corta",
                  pregunta: "Marta quiere saber qué necesita para conocer cómo agradar a Dios. ¿Qué le enseñas sobre la Escritura?",
                  ideas: [
                    { id: "suficiente", peso: 50, texto: "La Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios.", formas: ["suficiente", "basta", "contiene todo", "todo lo que hace falta", "todo lo necesario", "todo lo que (necesitamos|necesitas|necesito|necesita)", "enteramente preparad*", "toda buena obra"] },
                    { id: "ilumina", peso: 50, texto: "El Espíritu la ilumina para entenderla y obedecerla, sin añadirle revelaciones nuevas.", formas: ["ilumin*", "espiritu (la|le|te|me|nos|lo) (ayuda|abre|ensena|guia)", "espiritu santo", "el espiritu", "abre el corazon"] },
                  ],
                  modelo: "Le enseño que la Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios. Y el Espíritu la ilumina para entenderla y obedecerla, sin añadirle nada.",
                },
              },
            ],
          },
          {
            apoyo: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura ni puede contradecirla: todo se examina a la luz de la Biblia (1 Tesalonicenses 5:20-21)",
            ref: "1 Tesalonicenses 5:20-21",
            titulo: "Un sueño para el grupo",
            relato: [
              "Diriges un grupo de oración. Una noche, Lidia, una hermana del grupo, cuenta que tuvo un sueño con un mensaje para todos.",
              "El mensaje dice algo distinto de lo que enseña la Biblia. Algunos le creen enseguida; otros no saben qué pensar.",
              "Todos te miran a ti, y quieres guiarlos con lo que enseña la Biblia sobre sí misma.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le propones al grupo que haga con el mensaje de Lidia?",
                opciones: [
                  { texto: "Que lo examinen a la luz de la Biblia, que ningún sueño puede contradecir.", bien: true, explica: "Todo se examina a la luz de la Biblia: ninguna visión, sueño o profecía de hoy puede contradecirla." },
                  { texto: "Que lo acepten enseguida, porque un sueño así vale más que lo que está escrito.", explica: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura." },
                  { texto: "Que lo acepten sin examinarlo, para que Lidia no se sienta ofendida delante de todos.", explica: "Todo se examina a la luz de la Biblia." },
                  { texto: "Que lo pongan al mismo nivel que la Biblia y que cada uno elija cuál de los dos prefiere.", explica: "Nada está por encima de la Escritura: ninguna visión, sueño o profecía de hoy está a su altura." },
                ],
                apoyo: "todo se examina a la luz de la Biblia",
                explica: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura ni puede contradecirla: todo se examina a la luz de la Biblia.",
              },
              {
                tipo: "situacion",
                pregunta: "Lidia dice: El Espíritu me iluminó con algo nuevo que no está en la Biblia. ¿Qué le enseñas?",
                opciones: [
                  { texto: "Que la iluminación no añade revelaciones nuevas: abre el corazón a lo escrito.", bien: true, explica: "La iluminación no añade revelaciones nuevas a la Biblia: abre el corazón para comprender y obedecer lo que ya está escrito." },
                  { texto: "Que la iluminación del Espíritu sirve para escribir partes nuevas de la Biblia hoy.", explica: "La iluminación no añade revelaciones nuevas a la Biblia." },
                  { texto: "Que el Espíritu que inspiró la Escritura ahora enseña cosas contrarias a lo que ella dice.", explica: "El mismo Espíritu que inspiró la Escritura ayuda a entenderla y a recibirla; nada puede contradecirla." },
                  { texto: "Que lo nuevo que ella recibió reemplaza lo que la Biblia enseña sobre ese mismo tema.", explica: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura." },
                ],
                apoyo: "La iluminación no añade revelaciones nuevas a la Biblia: abre el corazón para comprender y obedecer lo que ya está escrito",
                ref: "1 Corintios 2:12-14",
                explica: "El mismo Espíritu que inspiró la Escritura ayuda al creyente a entenderla y a recibirla, sin añadirle nada.",
              },
              {
                tipo: "situacion",
                pregunta: "Un joven del grupo pregunta: Entonces, ¿dónde encontramos lo que agrada a Dios?",
                opciones: [
                  { texto: "En la Escritura: tiene todo lo que necesitamos para vivir como agrada a Dios.", bien: true, explica: "La Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios." },
                  { texto: "En los sueños de cada uno, porque la Biblia ya no alcanza para la vida de hoy.", explica: "La Escritura es suficiente, para que el creyente esté enteramente preparado para toda buena obra." },
                  { texto: "En lo que diga la persona que tenga más sueños en todo el grupo de oración.", explica: "Lo que agrada a Dios está en la Escritura, y todo se examina a la luz de la Biblia." },
                  { texto: "En lo que sienta cada uno, porque la Biblia es demasiado difícil de entender.", explica: "La Escritura es clara en lo esencial: un creyente sencillo puede entender lo que Dios le pide." },
                ],
                apoyo: "La Escritura es suficiente: contiene todo lo que necesitamos saber para la salvación y para vivir como agrada a Dios",
                ref: "2 Timoteo 3:17",
                explica: "La Escritura es suficiente: contiene todo lo que necesitamos saber para vivir como agrada a Dios, y es clara en lo esencial.",
              },
              {
                tipo: "explica",
                apoyo: "Nada está por encima de la Escritura",
                ref: "1 Tesalonicenses 5:20-21",
                clave: {
                  id: "pr-n4-sistematica-1-3-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirías al grupo sobre la Biblia y los sueños, las visiones o las profecías de hoy?",
                  ideas: [
                    { id: "altura", peso: 50, negativa: true, texto: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura ni puede contradecirla.", formas: ["a la altura", "por encima", "contradec*", "al mismo nivel", "(vale|valen) mas que la (biblia|escritura)"] },
                    { id: "examina", peso: 50, texto: "Todo se examina a la luz de la Biblia.", formas: ["examin*", "a la luz de la (biblia|escritura|palabra)", "(comparar|compararlo|compararlos|comparamos) con la (biblia|escritura|palabra)", "(probar|probarlo|probamos|probarlos)", "(revisar|revisarlo|revisamos|revisarlos)"] },
                  ],
                  errores: [
                    { id: "encima", texto: "Ninguna visión, sueño o profecía de hoy está a la altura de la Escritura.", formas: ["(un|el|ese|este|su|los|sus|esos|estos|mi|tu) (sueno|suenos|vision|visiones|profecia|profecias) (esta|estan) por encima", "(un|el|ese|este|su|los|sus|esos|estos|mi|tu) (sueno|suenos|vision|visiones|profecia|profecias) (vale|valen) mas", "(un|el|ese|este|su|los|sus|esos|estos|mi|tu) (sueno|suenos|vision|visiones|profecia|profecias) (esta|estan) a la altura", "(un|el|ese|este|su|los|sus|esos|estos|mi|tu) (sueno|suenos|vision|visiones|profecia|profecias) (esta|estan) al mismo nivel", "(un|el|ese|este|su|los|sus|esos|estos|mi|tu) (sueno|suenos|vision|visiones|profecia|profecias) (puede|pueden) contradec*"], anula: "altura" },
                  ],
                  modelo: "Le diría al grupo que ninguna visión, sueño o profecía de hoy está a la altura de la Escritura ni puede contradecirla. Todo lo que recibimos se examina a la luz de la Biblia.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Tenemos miles de copias antiguas que permiten recuperar el texto con gran seguridad",
            ref: "Isaías 40:8",
            clave: {
              id: "pr-n4-sistematica-1-3-a6-1",
              tipo: "corta",
              pregunta: "Si no tenemos los escritos originales, ¿por qué podemos confiar en el texto de la Biblia que tenemos?",
              ideas: [
                { id: "copias", peso: 50, texto: "Tenemos miles de copias antiguas: del Nuevo Testamento, más de cinco mil manuscritos en griego, y los rollos del mar Muerto.", formas: ["miles de copias", "copias antiguas", "(muchas|miles|tantas|muchisimas) copias", "manuscritos", "cinco mil", "mar muerto", "rollos"] },
                { id: "comparar", peso: 50, texto: "Comparando las copias, los estudiosos recuperan el texto con gran seguridad, y ninguna doctrina depende de un pasaje dudoso.", formas: ["comparan*", "comparar*", "comparaci*", "coincid*", "gran seguridad", "recuper*", "pasaje dudoso", "ninguna doctrina"] },
              ],
              modelo: "Porque tenemos miles de copias antiguas, como más de cinco mil manuscritos en griego del Nuevo Testamento y los rollos del mar Muerto. Comparándolas, los estudiosos recuperan el texto con gran seguridad.",
            },
          },
          {
            apoyo: "En 1947 se encontraron, junto al mar Muerto, rollos de libros del Antiguo Testamento unos mil años más antiguos que las copias que se conocían",
            ref: "Isaías 40:8",
            clave: {
              id: "pr-n4-sistematica-1-3-a6-2",
              tipo: "corta",
              pregunta: "¿Qué mostraron los rollos encontrados en 1947 junto al mar Muerto sobre el texto del Antiguo Testamento?",
              ideas: [
                { id: "antiguos", peso: 50, texto: "Eran unos mil años más antiguos que las copias que se conocían, y entre ellos estaba Isaías completo.", formas: ["mil anos", "mas antiguos", "mas viejos", "isaias", "anteriores"] },
                { id: "coincide", peso: 50, texto: "Su texto coincide en lo esencial con esas copias: el texto se conservó con fidelidad.", formas: ["coincid*", "lo esencial", "es el mismo", "era el mismo", "igual", "iguales", "se conservo", "fidelidad", "fielmente", "no cambio", "no ha cambiado"] },
              ],
              modelo: "Mostraron que el texto se copió con fidelidad: eran unos mil años más antiguos que las copias que se conocían, entre ellos Isaías completo, y su texto coincide en lo esencial.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. El Dios que existe y tiene nombre
    "n4-sistematica-1-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo empieza la Biblia?", reverso: "Así: En el principio creó Dios.", apoyo: "Empieza así: En el principio creó Dios" },
              { frente: "Según Hebreos 11:6, ¿qué es necesario para acercarse a Dios?", reverso: "Creer que le hay, y que es galardonador de los que le buscan.", apoyo: "«Es necesario que el que se acerca a Dios crea que le hay, y que es galardonador de los que le buscan»" },
              { frente: "¿A quién llama necio la Biblia?", reverso: "Al que dice en su corazón que no hay Dios.", apoyo: "La Biblia llama necio al que dice en su corazón que no hay Dios (Salmos 14:1)" },
              { frente: "¿Por qué la buena teología termina en adoración?", reverso: "Porque Dios es infinito: lo conocemos de verdad, pero nunca del todo.", apoyo: "Podemos conocer a Dios de verdad, porque él se ha revelado, pero nunca del todo, porque es infinito" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es Dios para la Biblia, desde su primera página?", reverso: "El punto de partida de todo.", apoyo: "Dios es el punto de partida de todo" },
              { frente: "¿Por qué la Biblia llama necio al que niega a Dios?", reverso: "Porque cierra los ojos a la evidencia que Dios ha dado.", apoyo: "no por falta de inteligencia, sino porque cierra los ojos a la evidencia que Dios ha dado" },
              { frente: "¿Qué respondió Dios cuando Moisés preguntó por su nombre?", reverso: "«YO SOY EL QUE SOY»", apoyo: "Cuando Moisés preguntó por su nombre, Dios respondió: «YO SOY EL QUE SOY»" },
              { frente: "¿Cómo traduce casi siempre la Reina-Valera el nombre YHWH?", reverso: "Como Jehová.", apoyo: "la Reina-Valera lo traduce casi siempre como Jehová" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la existencia de Dios tiene un error. Tócala.",
            frases: [
              "La Biblia da por sentado que Dios existe.",
              "La Biblia empieza con argumentos para probar que Dios existe.",
              "Dios es el punto de partida de todo.",
              "Para acercarse a Dios es necesario creer que le hay.",
            ],
            malo: 1,
            correccion: "La Biblia no empieza con argumentos para probar que Dios existe. Empieza así: En el principio creó Dios.",
            apoyo: "La Biblia no empieza con argumentos para probar que Dios existe",
            ref: "Génesis 1:1",
            explica: "La Biblia da por sentado que Dios existe: no empieza con argumentos, sino así: En el principio creó Dios.",
          },
          {
            consigna: "Una de estas frases sobre el que niega a Dios tiene un error. Tócala.",
            frases: [
              "La Biblia llama necio al que dice en su corazón que no hay Dios.",
              "La Biblia llama necio al que niega a Dios por su falta de inteligencia.",
              "El necio cierra los ojos a la evidencia que Dios ha dado.",
              "El que se acerca a Dios necesita creer que le hay.",
            ],
            malo: 1,
            correccion: "No lo llama necio por falta de inteligencia, sino porque cierra los ojos a la evidencia que Dios ha dado.",
            apoyo: "no por falta de inteligencia, sino porque cierra los ojos a la evidencia que Dios ha dado",
            ref: "Salmos 14:1",
            explica: "La Biblia llama necio al que dice en su corazón que no hay Dios, no por falta de inteligencia, sino porque cierra los ojos a la evidencia que Dios ha dado.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que enseña la lección sobre conocer a Dios.",
            texto: "Podemos conocer a Dios de verdad, porque él se ha [[revelado]], pero nunca del todo, porque es [[infinito]]: por eso la buena teología termina en [[adoración]].",
            distractores: ["escondido", "pequeño", "discusión"],
            errores: {
              escondido: "Podemos conocer a Dios de verdad porque él se ha revelado.",
              "pequeño": "No lo conocemos del todo porque es infinito.",
              "discusión": "La buena teología termina en adoración.",
            },
            apoyo: "Podemos conocer a Dios de verdad, porque él se ha revelado, pero nunca del todo, porque es infinito",
            ref: "Romanos 11:33-36",
            explica: "Podemos conocer a Dios de verdad, porque él se ha revelado, pero nunca del todo, porque es infinito. Por eso la buena teología termina en adoración.",
          },
          {
            consigna: "Completa por qué la buena teología termina en adoración.",
            texto: "Lo conocemos de [[verdad]], porque él se ha revelado; pero sus [[caminos]] son más altos que los nuestros, y por eso la buena [[teología]] termina en adoración.",
            distractores: ["oídas", "pecados", "polémica"],
            errores: {
              "oídas": "Podemos conocer a Dios de verdad, porque él se ha revelado.",
              pecados: "Lo que es más alto que lo nuestro son los caminos de Dios.",
              "polémica": "La buena teología termina en adoración.",
            },
            apoyo: "Por eso la buena teología termina en adoración",
            ref: "Isaías 55:8-9",
            explica: "Podemos conocer a Dios de verdad, porque se ha revelado, pero nunca del todo: «como son más altos los cielos que la tierra, así son mis caminos más altos que vuestros caminos». Por eso la buena teología termina en adoración.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada nombre de Dios con lo que significa.",
            pares: [
              ["Elohim", "Dios, el Creador poderoso"],
              ["Jehová (YHWH)", "El que es, el Dios del pacto"],
              ["Adonai", "Señor, el que tiene autoridad"],
              ["El Shaddai", "El Dios Todopoderoso"],
              ["Jehová proveerá", "El nombre que Abraham dio al monte donde Dios proveyó"],
            ],
            apoyo: "Elohim: Dios, el Creador poderoso (Génesis 1:1)",
            ref: "Éxodo 3:13-15",
            explica: "Elohim es Dios, el Creador poderoso; Jehová, el que es, el Dios del pacto; Adonai, Señor, el que tiene autoridad; El Shaddai, el Dios Todopoderoso; y Jehová proveerá es el nombre que Abraham dio al monte donde Dios proveyó el sacrificio.",
          },
          {
            consigna: "¿Qué nombre de Dios te ayuda a recordar cada verdad? Une cada verdad con su nombre.",
            pares: [
              ["Que Dios es el Creador poderoso", "Elohim"],
              ["Que Dios es el que es, fiel a su pacto", "Jehová"],
              ["Que Dios es el Señor, el que tiene autoridad", "Adonai"],
              ["Que Dios es el Todopoderoso", "El Shaddai"],
              ["Que Dios proveyó el sacrificio en el monte", "Jehová proveerá"],
            ],
            apoyo: "Sus nombres lo revelan: Elohim, el Creador; Jehová, YO SOY EL QUE SOY, el Dios fiel a su pacto; Adonai, el Señor; y el Dios Todopoderoso",
            ref: "Génesis 17:1; Génesis 22:14",
            explica: "Elohim recuerda que Dios es el Creador poderoso; Jehová, que es el que es, fiel a su pacto; Adonai, que es el Señor; El Shaddai, que es el Todopoderoso; y Jehová proveerá, que proveyó el sacrificio en el monte.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven de tu clase te pregunta: ¿Por qué tomaron piedras contra Jesús cuando dijo «Antes que Abraham fuese, yo soy»?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que entendieron que se identificaba con el Dios que habló a Moisés.", bien: true, explica: "Los que lo oyeron tomaron piedras para arrojárselas: entendieron que se identificaba con el Dios que habló a Moisés en Éxodo 3, el YO SOY EL QUE SOY." },
              { texto: "Que pensaron que Jesús se burlaba de la edad que tenía Abraham.", explica: "No fue por la edad de Abraham: entendieron que Jesús se identificaba con el Dios que habló a Moisés en Éxodo 3." },
              { texto: "Que creyeron que Jesús negaba que Abraham hubiera existido de verdad.", explica: "Jesús no negó a Abraham: dijo «Antes que Abraham fuese, yo soy», y los que lo oyeron entendieron que se identificaba con el Dios que habló a Moisés." },
              { texto: "Que se cansaron de escucharlo y ya no querían que siguiera hablando.", explica: "Tomaron piedras porque entendieron que Jesús se identificaba con el Dios que habló a Moisés." },
            ],
            apoyo: "entendieron que se identificaba con el Dios que habló a Moisés en Éxodo 3",
            ref: "Juan 8:58-59",
            explica: "Jesús dijo: «Antes que Abraham fuese, yo soy». Los que lo oyeron entendieron que se identificaba con el Dios que habló a Moisés en Éxodo 3.",
          },
          {
            caso: "Una hermana que pasa por una prueba te escribe: Siento que Dios está lejos. ¿Qué nombre de Dios me puede ayudar esta semana?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Jehová, el YO SOY: siempre está presente con su pueblo, fiel a su pacto.", bien: true, explica: "El nombre Jehová expresa que Dios existe por sí mismo, que es eterno y que siempre está presente con su pueblo, fiel a su pacto." },
              { texto: "Ninguno: los nombres de Dios son palabras antiguas que hoy ya no dicen nada.", explica: "Los nombres de Dios lo revelan: el Dios que se llama YO SOY está presente en tu vida hoy." },
              { texto: "Adonai, porque quiere decir que Dios se queda lejos, en su trono, y espera.", explica: "Adonai significa Señor, el que tiene autoridad; no quiere decir que Dios esté lejos." },
              { texto: "Elohim, porque enseña que Dios creó todo y después se alejó de su obra.", explica: "Elohim significa Dios, el Creador poderoso; y el nombre Jehová expresa que Dios siempre está presente con su pueblo." },
            ],
            apoyo: "El Dios que se llama YO SOY está presente en tu vida hoy",
            ref: "Éxodo 3:14-15",
            explica: "Su nombre propio, Jehová, expresa que Dios existe por sí mismo, que es eterno y que siempre está presente con su pueblo, fiel a su pacto.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Dios se puede conocer de verdad porque se ha revelado, aunque nunca del todo, porque es infinito",
            ref: "Romanos 11:33; Isaías 55:8-9",
            clave: {
              id: "pr-n4-sistematica-1-4-a6-1",
              tipo: "corta",
              pregunta: "¿Se puede conocer a Dios de verdad? Explica por qué sí, y por qué nunca del todo.",
              ideas: [
                { id: "revelado", peso: 50, texto: "Podemos conocer a Dios de verdad, porque él se ha revelado.", formas: ["revelado", "revelo", "revela", "revelarse", "revelacion", "se dio a conocer", "se da a conocer", "dado a conocer", "se ha mostrado", "se mostro"] },
                { id: "infinito", peso: 50, texto: "Pero nunca del todo, porque es infinito: sus caminos son más altos que los nuestros.", formas: ["infinit*", "nunca del todo", "no del todo", "mas altos", "profundidad", "no completamente", "no totalmente", "nunca completamente", "nunca totalmente"] },
              ],
              modelo: "Sí, podemos conocer a Dios de verdad, porque él se ha revelado. Pero nunca lo conocemos del todo, porque es infinito: sus caminos son más altos que los nuestros, y por eso lo adoramos.",
            },
          },
          {
            apoyo: "Por eso la buena teología termina en adoración",
            ref: "Romanos 11:33-36",
            clave: {
              id: "pr-n4-sistematica-1-4-a6-2",
              tipo: "corta",
              pregunta: "¿Por qué dice la lección que la buena teología termina en adoración?",
              ideas: [
                { id: "infinito", peso: 50, texto: "Porque Dios es infinito: nunca lo conocemos del todo, y sus caminos son más altos que los nuestros.", formas: ["infinit*", "nunca del todo", "no del todo", "mas altos", "profundidad", "no completamente", "no totalmente", "nunca completamente", "nunca totalmente"] },
                { id: "verdad", peso: 50, texto: "Pero lo conocemos de verdad, porque se ha revelado, y lo que conocemos nos lleva a adorarlo.", formas: ["revelado", "revelo", "revela", "revelarse", "revelacion", "de verdad", "se dio a conocer", "se da a conocer", "dado a conocer"] },
              ],
              modelo: "Porque Dios es infinito: sus caminos son más altos que los nuestros, y nunca lo conocemos del todo. Aun así lo conocemos de verdad, porque se ha revelado, y eso nos lleva a adorarlo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. Los atributos de Dios
    "n4-sistematica-1-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué son los atributos de Dios?", reverso: "Las perfecciones de su ser que la Biblia revela.", apoyo: "Los atributos de Dios son las perfecciones de su ser que la Biblia revela" },
              { frente: "¿Qué atributos son solo de Dios?", reverso: "Es eterno, inmutable, omnipresente, omnisciente y omnipotente.", apoyo: "Algunos son solo de él: es eterno, inmutable, omnipresente, omnisciente y omnipotente" },
              { frente: "¿Qué atributos comparte Dios en parte con nosotros?", reverso: "Es santo, amor, justo y fiel.", apoyo: "Otros los comparte en parte con nosotros: es santo, amor, justo y fiel" },
              { frente: "¿Qué proclamaban los serafines en Isaías 6:3?", reverso: "«Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria»", apoyo: "Los serafines proclamaban: «Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria»" },
            ],
          },
          {
            tarjetas: [
              { frente: "Para confiar en alguien, ¿qué necesitas saber?", reverso: "Cómo es.", apoyo: "Para confiar en alguien necesitas saber cómo es" },
              { frente: "¿Por qué es una gran noticia que Dios no cambie?", reverso: "Porque sus promesas de hoy son tan firmes como las que hizo a Abraham.", apoyo: "Sus promesas de hoy son tan firmes como las que hizo a Abraham" },
              { frente: "¿Qué es la santidad de Dios?", reverso: "Su perfección moral y su separación de todo lo malo.", apoyo: "La santidad de Dios es su perfección moral y su separación de todo lo malo" },
              { frente: "Si Dios está en todo lugar, ¿qué consuelo te da?", reverso: "Que nunca estás solo.", apoyo: "si está en todo lugar, nunca estás solo" },
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
            consigna: "¿Es un atributo que solo Dios tiene o uno que comparte en parte con nosotros? Lleva cada frase a su grupo.",
            grupos: ["Solo Dios lo tiene", "Lo comparte en parte con nosotros"],
            frases: [
              { texto: "Eterno", grupo: 0 },
              { texto: "Inmutable", grupo: 0 },
              { texto: "Omnipresente", grupo: 0 },
              { texto: "Omnisciente", grupo: 0 },
              { texto: "Santo", grupo: 1 },
              { texto: "Amor", grupo: 1 },
              { texto: "Justo", grupo: 1 },
              { texto: "Fiel", grupo: 1 },
            ],
            apoyo: "Los atributos de Dios son las perfecciones de su ser",
            ref: "Salmos 90:2; Isaías 6:3",
            explica: "Algunos atributos son solo de Dios: es eterno, inmutable, omnipresente, omnisciente y omnipotente. Otros los comparte en parte con nosotros: es santo, amor, justo y fiel.",
          },
          {
            consigna: "¿Describe un atributo que solo Dios tiene o uno que comparte en parte con nosotros? Lleva cada frase a su grupo.",
            grupos: ["Solo Dios lo tiene", "Lo comparte en parte con nosotros"],
            frases: [
              { texto: "Desde el siglo y hasta el siglo es Dios", grupo: 0 },
              { texto: "Nada es difícil para él", grupo: 0 },
              { texto: "Conoce aun lo que pensamos", grupo: 0 },
              { texto: "Su amor da sin que lo merezcamos", grupo: 1 },
              { texto: "Todos sus caminos son rectitud", grupo: 1 },
              { texto: "Sus misericordias son nuevas cada mañana", grupo: 1 },
              { texto: "Su perfección moral lo separa de todo lo malo", grupo: 1 },
            ],
            apoyo: "Algunos son solo de él: es eterno, inmutable, omnipresente, omnisciente y omnipotente",
            ref: "Jeremías 32:17; Lamentaciones 3:22-23",
            explica: "Solo Dios es eterno, omnipotente y omnisciente: desde el siglo y hasta el siglo él es Dios, nada es difícil para él y lo sabe todo. En parte comparte con nosotros su amor, su justicia, su fidelidad y su santidad.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada atributo que solo Dios tiene con lo que significa.",
            pares: [
              ["Eterno", "No tiene principio ni fin"],
              ["Inmutable", "No cambia en su ser, en su carácter ni en sus promesas"],
              ["Omnipresente", "Está en todo lugar con todo su ser"],
              ["Omnisciente", "Lo sabe todo, también lo que pensamos"],
              ["Omnipotente", "Puede hacer todo lo que quiere, de acuerdo con su naturaleza"],
            ],
            apoyo: "Omnipresente: está en todo lugar con todo su ser (Salmos 139:7-10)",
            ref: "Salmos 90:2; Malaquías 3:6",
            explica: "Eterno: no tiene principio ni fin. Inmutable: no cambia. Omnipresente: está en todo lugar con todo su ser. Omnisciente: lo sabe todo. Omnipotente: puede hacer todo lo que quiere, de acuerdo con su naturaleza.",
          },
          {
            consigna: "Une cada atributo con el pasaje que lo enseña, según la lección.",
            pares: [
              ["Eterno", "Salmos 90:2"],
              ["Inmutable", "Malaquías 3:6"],
              ["Omnipresente", "Salmos 139:7-10"],
              ["Omnisciente", "Salmos 139:1-4"],
              ["Omnipotente", "Jeremías 32:17"],
            ],
            apoyo: "Inmutable: no cambia en su ser, en su carácter ni en sus promesas (Malaquías 3:6)",
            explica: "Salmos 90:2 enseña que es eterno; Malaquías 3:6, que no cambia; Salmos 139:7-10, que está en todo lugar; Salmos 139:1-4, que lo sabe todo; y Jeremías 32:17, que nada es difícil para él.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que la lección enseña sobre la cruz.",
            texto: "La [[santidad]] y la justicia de Dios exigen que el pecado sea [[castigado]]; su amor busca [[salvar]] al pecador.",
            distractores: ["debilidad", "ignorado", "condenar"],
            errores: {
              debilidad: "Lo que exige que el pecado sea castigado es la santidad de Dios, junto con su justicia.",
              ignorado: "La santidad y la justicia de Dios exigen que el pecado sea castigado.",
              condenar: "El amor de Dios busca salvar al pecador.",
            },
            apoyo: "La santidad y la justicia de Dios exigen que el pecado sea castigado; su amor busca salvar al pecador",
            ref: "Romanos 3:25-26",
            explica: "La santidad y la justicia de Dios exigen que el pecado sea castigado, y su amor busca salvar al pecador: en la cruz se encuentran.",
          },
          {
            consigna: "Completa cómo se unen los atributos de Dios en la cruz.",
            texto: "En la [[cruz]] se unen su santidad, su [[justicia]] y su [[amor]], y ningún atributo contradice a otro.",
            distractores: ["ley", "olvido", "capricho"],
            errores: {
              ley: "Es en la cruz donde se unen su santidad, su justicia y su amor.",
              olvido: "En la cruz se unen la santidad, la justicia y el amor de Dios.",
              capricho: "En la cruz se une también el amor de Dios, que busca salvar al pecador.",
            },
            apoyo: "En la cruz se unen su santidad, su justicia y su amor, y ningún atributo contradice a otro",
            ref: "Romanos 3:25-26",
            explica: "En la cruz se unen la santidad, la justicia y el amor de Dios: Dios puso a Cristo como propiciación, «a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús». Ningún atributo contradice a otro.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Ningún atributo de Dios contradice a otro",
            ref: "Romanos 3:25-26",
            titulo: "¿Un Dios que solo ama?",
            relato: [
              "Diego es un joven de tu célula. Un día dice: Si Dios es amor, no puede castigar el pecado; eso sería contradecirse.",
              "Ana, otra joven del grupo, piensa al revés: cree que Dios es tan santo y tan justo que nunca podría perdonarla.",
              "Eres el líder de la célula y quieres mostrarles cómo se unen los atributos de Dios en la cruz.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué exigen la santidad y la justicia de Dios?",
                opciones: [
                  { texto: "Que el pecado sea castigado, porque Dios es santo y justo.", bien: true, explica: "La santidad y la justicia de Dios exigen que el pecado sea castigado." },
                  { texto: "Que el pecado se olvide sin más, como si nunca hubiera pasado.", explica: "La santidad y la justicia de Dios exigen que el pecado sea castigado." },
                  { texto: "Nada: la santidad de Dios no tiene nada que ver con el pecado.", explica: "La santidad de Dios es su perfección moral y su separación de todo lo malo." },
                  { texto: "Que Dios deje de amar al pecador hasta que empiece a portarse mejor.", explica: "El amor de Dios busca salvar al pecador, y da sin que lo merezcamos." },
                ],
                apoyo: "La santidad y la justicia de Dios exigen que el pecado sea castigado",
                explica: "La santidad de Dios es su perfección moral y su separación de todo lo malo; con su justicia, exige que el pecado sea castigado.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué busca el amor de Dios?",
                opciones: [
                  { texto: "Salvar al pecador: su amor da sin que lo merezcamos.", bien: true, explica: "«Dios es amor», y su amor da sin que lo merezcamos: busca salvar al pecador." },
                  { texto: "Que el pecado deje de importar, para que nadie tenga que sufrir.", explica: "Ningún atributo de Dios contradice a otro: la santidad y la justicia exigen que el pecado sea castigado, y su amor busca salvar al pecador." },
                  { texto: "Premiar solo a los que ya son buenos y se lo han merecido.", explica: "El amor de Dios da sin que lo merezcamos." },
                  { texto: "Castigar al pecador, porque su amor y su enojo son lo mismo.", explica: "Su amor busca salvar al pecador." },
                ],
                apoyo: "«Dios es amor», y su amor da sin que lo merezcamos",
                ref: "1 Juan 4:8-10",
                explica: "«Dios es amor», y su amor da sin que lo merezcamos: busca salvar al pecador.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Dónde se encuentran la justicia y el amor de Dios?",
                opciones: [
                  { texto: "En la cruz, donde Dios puso a Cristo como propiciación.", bien: true, explica: "En la cruz se encuentran: Dios puso a Cristo como propiciación, «a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús»." },
                  { texto: "En ningún lugar: la justicia y el amor de Dios se contradicen.", explica: "Ningún atributo de Dios contradice a otro: en la cruz se encuentran." },
                  { texto: "En las buenas obras de cada uno, que pagan lo que debe.", explica: "Dios justifica al que es de la fe de Jesús: en la cruz puso a Cristo como propiciación." },
                  { texto: "En la ley: Dios cambió de carácter de un Testamento a otro.", explica: "Dios es inmutable: no cambia en su ser ni en su carácter. Su justicia y su amor se encuentran en la cruz." },
                ],
                apoyo: "En la cruz se encuentran: Dios puso a Cristo como propiciación",
                ref: "Romanos 3:25-26",
                explica: "En la cruz se encuentran: Dios puso a Cristo como propiciación, «a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús».",
              },
              {
                tipo: "explica",
                apoyo: "En la cruz se unen su santidad, su justicia y su amor, y ningún atributo contradice a otro",
                ref: "Romanos 3:25-26",
                clave: {
                  id: "pr-n4-sistematica-1-5-a5-1",
                  tipo: "corta",
                  pregunta: "Escribe lo que les dirías a Diego y a Ana sobre la cruz.",
                  ideas: [
                    { id: "castigo", peso: 35, texto: "La santidad y la justicia de Dios exigen que el pecado sea castigado.", formas: ["castig*", "exig*"] },
                    { id: "salvar", peso: 30, texto: "Su amor busca salvar al pecador.", formas: ["salvar*", "salvo", "salva", "salvacion", "perdon*", "rescat*"] },
                    { id: "cruz", peso: 35, texto: "En la cruz se unen: Dios es el justo y el que justifica, y ningún atributo contradice a otro.", formas: ["propiciacion", "justific*", "se unen", "se encuentran", "se juntan", "no se contradic*", "ningun atributo", "no contradic*"] },
                  ],
                  modelo: "Les diría que la santidad y la justicia de Dios exigen que el pecado sea castigado, y que su amor busca salvar al pecador. En la cruz se unen: Dios es el justo y el que justifica, y ningún atributo contradice a otro.",
                },
              },
            ],
          },
          {
            apoyo: "Los atributos de Dios son las perfecciones de su ser",
            ref: "Isaías 6:3; 1 Juan 4:8-10",
            titulo: "El sermón de Raúl",
            relato: [
              "Raúl es un joven que está aprendiendo a predicar. El domingo predicará en el culto de jóvenes sobre cómo es Dios.",
              "Te dice: Quiero hablar del amor de Dios, pero no de su santidad ni de su justicia, porque eso asusta a la gente.",
              "Eres pastor asistente, y Raúl te pidió ayuda para preparar su mensaje.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre hablar solo del amor de Dios?",
                opciones: [
                  { texto: "Que Dios es santo, amor, justo y fiel, y que ningún atributo contradice a otro.", bien: true, explica: "Dios es santo, amor, justo y fiel, y ningún atributo de Dios contradice a otro." },
                  { texto: "Que hace bien: la santidad de Dios es un tema viejo que ya no hace falta predicar.", explica: "Dios es santo, y cada atributo es un consuelo y un llamado: si es santo, vale la pena vivir en santidad." },
                  { texto: "Que mejor hable solo de la justicia, porque el amor de Dios es un tema para niños.", explica: "«Dios es amor»: su amor da sin que lo merezcamos. Ningún atributo de Dios contradice a otro." },
                  { texto: "Que diga que Dios cambió: antes era santo y justo, y ahora es solo amor.", explica: "Dios es inmutable: no cambia en su ser ni en su carácter." },
                ],
                apoyo: "Otros los comparte en parte con nosotros: es santo, amor, justo y fiel",
                explica: "Dios es santo, amor, justo y fiel, y ningún atributo de Dios contradice a otro.",
              },
              {
                tipo: "situacion",
                pregunta: "Raúl pregunta: ¿Qué es, entonces, la santidad de Dios?",
                opciones: [
                  { texto: "Su perfección moral y su separación de todo lo malo.", bien: true, explica: "La santidad de Dios es su perfección moral y su separación de todo lo malo." },
                  { texto: "Su costumbre de alejarse de las personas que sufren mucho.", explica: "La santidad de Dios es su perfección moral y su separación de todo lo malo; y como está en todo lugar, nunca estás solo." },
                  { texto: "Una regla que Dios puso para que nadie pueda acercarse a él.", explica: "La santidad de Dios es su perfección moral y su separación de todo lo malo." },
                  { texto: "Otra manera de decir exactamente lo mismo que su amor.", explica: "La santidad es su perfección moral y su separación de todo lo malo; su amor da sin que lo merezcamos." },
                ],
                apoyo: "La santidad de Dios es su perfección moral y su separación de todo lo malo",
                ref: "Isaías 6:3",
                explica: "Los serafines proclamaban: «Santo, santo, santo». La santidad de Dios es su perfección moral y su separación de todo lo malo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué pasaje le propones para mostrar que la justicia y el amor de Dios se unen?",
                opciones: [
                  { texto: "Romanos 3:25-26: Dios puso a Cristo como propiciación en la cruz.", bien: true, explica: "En la cruz se encuentran: Dios puso a Cristo como propiciación, a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús." },
                  { texto: "Salmos 90:2: desde el siglo y hasta el siglo él es Dios, sin principio ni fin.", explica: "Salmos 90:2 enseña que Dios es eterno; la justicia y el amor se unen en la cruz, en Romanos 3:25-26." },
                  { texto: "Malaquías 3:6: como Dios no cambia, nunca castiga el pecado de nadie.", explica: "Malaquías 3:6 enseña que Dios no cambia; y la santidad y la justicia de Dios exigen que el pecado sea castigado." },
                  { texto: "Salmos 139:1-4: Dios lo sabe todo, también lo que pensamos cada día.", explica: "Ese pasaje enseña que Dios es omnisciente; la cruz, en Romanos 3:25-26, muestra que su justicia y su amor se unen." },
                ],
                apoyo: "En la cruz se encuentran: Dios puso a Cristo como propiciación",
                ref: "Romanos 3:25-26",
                explica: "En la cruz se encuentran la justicia y el amor de Dios: Dios puso a Cristo como propiciación.",
              },
              {
                tipo: "explica",
                apoyo: "La santidad y la justicia de Dios exigen que el pecado sea castigado; su amor busca salvar al pecador",
                ref: "Romanos 3:25-26",
                clave: {
                  id: "pr-n4-sistematica-1-5-a5-2",
                  tipo: "corta",
                  pregunta: "Raúl te pide una idea para el cierre de su sermón: ¿cómo se unen en la cruz la justicia y el amor de Dios?",
                  ideas: [
                    { id: "castigo", peso: 35, texto: "La santidad y la justicia de Dios exigen que el pecado sea castigado.", formas: ["castig*", "exig*"] },
                    { id: "salvar", peso: 30, texto: "Su amor busca salvar al pecador.", formas: ["salvar*", "salvo", "salva", "salvacion", "perdon*", "rescat*"] },
                    { id: "cruz", peso: 35, texto: "En la cruz se encuentran: Dios puso a Cristo como propiciación, y es el justo y el que justifica.", formas: ["propiciacion", "justific*", "el justo", "se encuentran", "se juntan", "no se contradic*", "ningun atributo", "no contradic*"] },
                  ],
                  modelo: "La santidad y la justicia de Dios exigen que el pecado sea castigado, y su amor busca salvar al pecador. En la cruz se encuentran: Dios puso a Cristo como propiciación, y así es el justo y el que justifica.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "Que Dios no cambie es una gran noticia",
            ref: "Malaquías 3:6",
            clave: {
              id: "pr-n4-sistematica-1-5-a6-1",
              tipo: "corta",
              pregunta: "¿Qué significa que Dios es inmutable, y por qué es una buena noticia?",
              ideas: [
                { id: "cambia", peso: 50, negativa: true, texto: "Dios no cambia en su ser, en su carácter ni en sus promesas (Malaquías 3:6).", formas: ["no cambia", "nunca cambia", "no ha cambiado", "no cambio", "no cambiara", "jamas cambia", "es el mismo", "sigue siendo el mismo", "siempre es igual"] },
                { id: "promesas", peso: 50, texto: "Sus promesas de hoy son tan firmes como las que hizo a Abraham.", formas: ["firmes", "abraham", "se cumplen", "se cumpliran", "cumple sus promesas", "podemos confiar", "puedo confiar", "confiar en (el|sus|dios)", "confiable", "seguros", "seguridad"] },
              ],
              modelo: "Significa que Dios no cambia en su ser, en su carácter ni en sus promesas, como dice Malaquías 3:6. Es una buena noticia, porque sus promesas de hoy son tan firmes como las que hizo a Abraham.",
            },
          },
          {
            apoyo: "No hay lugar donde Dios no esté",
            ref: "Salmos 139:7-10",
            clave: {
              id: "pr-n4-sistematica-1-5-a6-2",
              tipo: "corta",
              pregunta: "Explica con un pasaje de la lección que Dios es omnipresente, y qué consuelo te da eso.",
              ideas: [
                { id: "lugar", peso: 50, texto: "Dios está en todo lugar con todo su ser: David preguntó a dónde huiría de su presencia (Salmos 139:7-10).", formas: ["todo lugar", "todas partes", "todo su ser", "salmo* 139", "huir*", "huire", "tu presencia", "su presencia", "no hay lugar"] },
                { id: "solo", peso: 50, negativa: true, texto: "Por eso nunca estás solo.", formas: ["nunca (estas|estoy|estamos|esta|estare|estaras|estaremos) solo*", "no (estas|estoy|estamos|esta|estare|estaras|estaremos) solo*", "jamas (estas|estoy|estamos|esta) solo*", "nunca solo*", "siempre (esta|estara|estuvo) (conmigo|contigo|con)", "me acompana", "nos acompana", "te acompana"] },
              ],
              modelo: "Dios está en todo lugar con todo su ser. David lo dice en el Salmo 139: ¿a dónde huiré de tu presencia? No hay lugar donde Dios no esté, y por eso nunca estoy solo.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La Trinidad, la creación y la providencia
    "n4-sistematica-1-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué enseña con fuerza la Biblia, según Deuteronomio 6:4?", reverso: "Que hay un solo Dios.", apoyo: "La Biblia enseña con fuerza que hay un solo Dios" },
              { frente: "¿Qué muestra Hechos 5:3-4 del Espíritu Santo?", reverso: "Que es Dios: mentirle al Espíritu Santo es mentirle a Dios.", apoyo: "mentirle al Espíritu Santo es mentirle a Dios (Hechos 5:3-4)" },
              { frente: "¿Qué pasa en el bautismo de Jesús con las tres personas?", reverso: "Aparecen a la vez: el Hijo sale del agua, el Espíritu desciende y el Padre habla.", apoyo: "En el bautismo de Jesús aparecen los tres a la vez" },
              { frente: "¿Qué es la providencia?", reverso: "Que Dios no abandonó su creación: la sostiene y la gobierna.", apoyo: "Y no abandonó su creación: la sostiene y la gobierna" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿En qué son iguales el Padre, el Hijo y el Espíritu Santo?", reverso: "En esencia, poder y gloria.", apoyo: "un solo Dios que existe eternamente en tres personas, iguales en esencia, poder y gloria" },
              { frente: "¿Qué dice el arrianismo del Hijo?", reverso: "Que es una criatura y no Dios eterno.", apoyo: "El arrianismo: dice que el Hijo es una criatura y no Dios eterno" },
              { frente: "¿Qué dice el triteísmo?", reverso: "Habla de tres dioses separados.", apoyo: "El triteísmo: habla de tres dioses separados" },
              { frente: "¿Qué pasa con las comparaciones del agua, el huevo o el trébol?", reverso: "Terminan pareciéndose a algún error.", apoyo: "el agua, el huevo o el trébol terminan pareciéndose a algún error" },
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
            consigna: "¿En qué nombre mandó Jesús bautizar? Toca las palabras que nombran a las tres personas.",
            texto: "en el nombre del [[Padre]], y del [[Hijo]], y del [[Espíritu Santo]]",
            apoyo: "Jesús mandó bautizar «en el nombre del Padre, y del Hijo, y del Espíritu Santo»: un solo nombre, tres personas",
            ref: "Mateo 28:19",
            explica: "Jesús mandó bautizar en el nombre del Padre, y del Hijo, y del Espíritu Santo: un solo nombre, tres personas.",
          },
          {
            consigna: "¿Qué dice Deuteronomio 6:4 de Jehová nuestro Dios? Toca la palabra que lo dice.",
            texto: "Oye, Israel: Jehová nuestro Dios, Jehová [[uno]] es",
            apoyo: "La Biblia enseña con fuerza que hay un solo Dios",
            ref: "Deuteronomio 6:4",
            explica: "«Oye, Israel: Jehová nuestro Dios, Jehová uno es»: la Biblia enseña con fuerza que hay un solo Dios.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la Trinidad tiene un error. Tócala.",
            frases: [
              "Hay un solo Dios.",
              "El Padre, el Hijo y el Espíritu Santo son personas distintas.",
              "El Hijo es una criatura y no Dios eterno.",
              "Los tres son iguales en esencia, poder y gloria.",
            ],
            malo: 2,
            correccion: "El Hijo es Dios (Juan 1:1). Decir que es una criatura y no Dios eterno es el error del arrianismo.",
            apoyo: "El arrianismo: dice que el Hijo es una criatura y no Dios eterno",
            ref: "Juan 1:1",
            explica: "El Nuevo Testamento muestra que el Hijo es Dios (Juan 1:1). Decir que el Hijo es una criatura y no Dios eterno es el arrianismo.",
          },
          {
            consigna: "Una de estas frases sobre las tres personas tiene un error. Tócala.",
            frases: [
              "En el bautismo de Jesús, los tres aparecen a la vez.",
              "Dios es una sola persona que a veces se muestra como Padre y a veces como Hijo.",
              "Mentirle al Espíritu Santo es mentirle a Dios.",
              "Jesús mandó bautizar en un solo nombre: el del Padre, el del Hijo y el del Espíritu Santo.",
            ],
            malo: 1,
            correccion: "Hay un solo Dios en tres personas distintas, que en el bautismo de Jesús están a la vez. Lo otro es el error del modalismo.",
            apoyo: "Lo contradice el bautismo de Jesús, donde los tres están a la vez",
            ref: "Mateo 3:16-17",
            explica: "El modalismo dice que Dios es una sola persona que a veces se muestra como Padre, a veces como Hijo y a veces como Espíritu. Lo contradice el bautismo de Jesús, donde los tres están a la vez.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Confesamos lo que la Biblia enseña y adoramos al Padre, al Hijo y al Espíritu Santo (2 Corintios 13:14)",
            ref: "Mateo 3:16-17; Mateo 28:19",
            situacion: "Eres líder de una célula. Carlos, un vecino que asiste a un grupo unicitario, acepta conversar contigo sobre quién es Dios.",
            escenas: [
              {
                id: "e1",
                narra: "Carlos te dice: Dios es una sola persona; a veces se muestra como Padre, a veces como Hijo y a veces como Espíritu.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Le muestras el bautismo de Jesús, donde el Padre, el Hijo y el Espíritu están a la vez.", valor: 2, explica: "Lo que dice Carlos es el modalismo, y lo contradice el bautismo de Jesús, donde los tres están a la vez." },
                  { texto: "Le dices con respeto que tú lo ves distinto, pero no le muestras ningún pasaje de la Biblia.", valor: 1, explica: "El respeto es bueno, pero conviene mostrar lo que la Biblia enseña: en el bautismo de Jesús los tres aparecen a la vez." },
                  { texto: "Le dices que eso es lo mismo que tú crees, para no discutir con él en su primera visita.", valor: 0, explica: "No es lo mismo: es el modalismo, un error que hay que evitar. La Biblia muestra tres personas distintas." },
                ],
              },
              {
                id: "e2",
                narra: "Carlos pregunta: ¿Entonces ustedes creen en tres dioses?",
                pregunta: "¿Qué le contestas?",
                opciones: [
                  { texto: "Que no: hay un solo Dios, que existe eternamente en tres personas.", valor: 2, explica: "Hablar de tres dioses separados es el triteísmo, que contradice que Dios es uno: «Jehová nuestro Dios, Jehová uno es»." },
                  { texto: "Que es un misterio muy difícil, y que mejor lo hablan otro día con calma.", valor: 1, explica: "Es un misterio para adorar, pero se puede confesar lo que la Biblia enseña: un solo Dios en tres personas." },
                  { texto: "Que sí: el Padre, el Hijo y el Espíritu Santo son tres dioses separados.", valor: 0, explica: "Eso es el triteísmo, que habla de tres dioses separados: contradice que Dios es uno." },
                ],
              },
              {
                id: "e3",
                narra: "Carlos te pide una comparación sencilla para entenderlo.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le dices que ninguna comparación lo explica del todo, y le lees Mateo 28:19.", valor: 2, explica: "Ninguna comparación explica del todo la Trinidad: se confiesa lo que la Biblia enseña, como el mandato de bautizar en el nombre del Padre, y del Hijo, y del Espíritu Santo." },
                  { texto: "Le pones el ejemplo del trébol, pero le aclaras que esa comparación no es perfecta.", valor: 1, explica: "El agua, el huevo o el trébol terminan pareciéndose a algún error; mejor confesar lo que la Biblia enseña." },
                  { texto: "Le dices que Dios es como el agua: a veces hielo, a veces líquido y a veces vapor.", valor: 0, explica: "El agua, el huevo o el trébol terminan pareciéndose a algún error: ninguna comparación explica del todo la Trinidad." },
                ],
              },
            ],
          },
          {
            apoyo: "Hay un solo Dios que existe eternamente en tres personas, el Padre, el Hijo y el Espíritu Santo, iguales en esencia, poder y gloria",
            ref: "Juan 1:1; Hechos 5:3-4",
            situacion: "Eres maestro de la escuela dominical. Dos Testigos de Jehová llegan a la puerta de tu casa y, con amabilidad, te hablan de Jesús.",
            escenas: [
              {
                id: "e1",
                narra: "Te dicen: Jesús fue el primero que Dios creó; es una criatura muy grande, pero no es Dios eterno.",
                pregunta: "¿Cómo reconoces lo que te dicen?",
                opciones: [
                  { texto: "Es el arrianismo: dice que el Hijo es una criatura y no Dios eterno.", valor: 2, explica: "El arrianismo dice que el Hijo es una criatura y no Dios eterno; la lección dice que hoy lo enseñan, por ejemplo, los Testigos de Jehová." },
                  { texto: "Es una idea distinta de la tuya, aunque todavía no sabes bien cómo se llama.", valor: 1, explica: "Notas que es distinto, y eso es bueno; conviene reconocer el error: es el arrianismo." },
                  { texto: "Es el triteísmo: dice que hay tres dioses separados y no uno solo.", valor: 0, explica: "El triteísmo habla de tres dioses separados; decir que el Hijo es una criatura es el arrianismo." },
                ],
              },
              {
                id: "e2",
                narra: "Te preguntan: ¿Dónde dice la Biblia que el Hijo es Dios?",
                pregunta: "¿Qué pasaje les muestras?",
                opciones: [
                  { texto: "Juan 1:1, donde el Nuevo Testamento muestra que el Hijo es Dios.", valor: 2, explica: "El Nuevo Testamento muestra que el Hijo es Dios (Juan 1:1)." },
                  { texto: "Mateo 3:16-17, donde aparecen el Padre, el Hijo y el Espíritu a la vez.", valor: 1, explica: "Ese pasaje muestra a los tres a la vez, pero el que la lección cita para mostrar que el Hijo es Dios es Juan 1:1." },
                  { texto: "Ninguno: les dices que eso no se puede mostrar con la Biblia.", valor: 0, explica: "Sí se muestra: el Nuevo Testamento enseña que el Hijo es Dios (Juan 1:1)." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de irse, uno de ellos dice: El Espíritu Santo es solo una fuerza de Dios.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que mentirle al Espíritu Santo es mentirle a Dios, como muestra Hechos 5.", valor: 2, explica: "Mentirle al Espíritu Santo es mentirle a Dios (Hechos 5:3-4), y los tres son personas distintas que se relacionan entre sí." },
                  { texto: "Que tú sientes que el Espíritu Santo es mucho más que una fuerza, aunque no sabes por qué.", valor: 1, explica: "Tienes razón en que es más que una fuerza, pero conviene mostrarlo con la Biblia: mentirle al Espíritu Santo es mentirle a Dios." },
                  { texto: "Que tiene razón: solo el Padre y el Hijo son personas, y el Espíritu no lo es.", valor: 0, explica: "El Espíritu Santo es Dios: mentirle es mentirle a Dios. Los tres son personas distintas que se relacionan entre sí." },
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
            consigna: "Completa lo que la lección enseña sobre la creación y la providencia.",
            texto: "Dios creó todo de la [[nada]], por su [[palabra]], y no abandonó su creación: la sostiene y la [[gobierna]].",
            distractores: ["materia", "espada", "olvida"],
            errores: {
              materia: "Dios creó todo de la nada: lo que se ve fue hecho de lo que no se veía.",
              espada: "Dios creó todo por su palabra.",
              olvida: "Dios no abandonó su creación: la sostiene y la gobierna.",
            },
            apoyo: "Dios creó todo de la nada, por su palabra",
            ref: "Hebreos 11:3; Colosenses 1:16-17",
            explica: "Dios creó todo de la nada, por su palabra, y no abandonó su creación: la sostiene y la gobierna. A esto se le llama providencia.",
          },
          {
            consigna: "Completa por qué el creyente puede descansar.",
            texto: "Dios [[sostiene]] y gobierna su creación, y por eso el creyente puede [[descansar]]: todo está en la [[mano]] de Dios.",
            distractores: ["abandona", "temer", "duda"],
            errores: {
              abandona: "Dios no abandonó su creación: la sostiene y la gobierna.",
              temer: "Por eso el creyente puede descansar.",
              duda: "La providencia asegura que nada escapa de la mano de Dios.",
            },
            apoyo: "Por eso el creyente puede descansar",
            ref: "Romanos 8:28",
            explica: "Dios no abandonó su creación: la sostiene y la gobierna. Por eso el creyente puede descansar: la providencia asegura que nada escapa de su mano.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué enseña la lección sobre la providencia de Dios? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 50, y: 50 },
              { id: "creacion", texto: "Su creación", x: 16, y: 12 },
              { id: "mal", texto: "El mal", x: 84, y: 12 },
              { id: "resp", texto: "La responsabilidad humana", x: 82, y: 88 },
              { id: "creyente", texto: "El creyente", x: 18, y: 88 },
            ],
            enlaces: [
              { de: "dios", a: "creacion", relacion: "sostiene y gobierna" },
              { de: "dios", a: "mal", relacion: "no es el autor de" },
              { de: "dios", a: "resp", relacion: "no quita" },
              { de: "creyente", a: "dios", relacion: "puede descansar en" },
            ],
            distractores: ["abandonó", "es el autor de", "anula"],
            apoyo: "La providencia no hace a Dios autor del mal ni quita la responsabilidad humana, pero asegura que nada escapa de su mano",
            ref: "Mateo 10:29; Romanos 8:28",
            explica: "Dios no abandonó su creación: la sostiene y la gobierna. La providencia no hace a Dios autor del mal ni quita la responsabilidad humana, y por eso el creyente puede descansar: nada escapa de su mano.",
          },
          {
            consigna: "¿Qué dicen los pasajes de la lección sobre la creación y la providencia? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "dios", texto: "Dios", x: 50, y: 10 },
              { id: "todo", texto: "Todo lo que existe", x: 18, y: 50 },
              { id: "cristo", texto: "Cristo", x: 82, y: 50 },
              { id: "pajarillo", texto: "Un pajarillo", x: 18, y: 90 },
              { id: "padre", texto: "El Padre", x: 82, y: 90 },
            ],
            enlaces: [
              { de: "dios", a: "todo", relacion: "creó de la nada" },
              { de: "todo", a: "cristo", relacion: "subsiste en" },
              { de: "pajarillo", a: "padre", relacion: "no cae a tierra sin" },
            ],
            distractores: ["abandonó", "existe lejos de", "cae a tierra sin"],
            apoyo: "en Cristo «todas las cosas en él subsisten», y ni un pajarillo cae a tierra sin el Padre (Mateo 10:29)",
            ref: "Hebreos 11:3; Colosenses 1:16-17; Mateo 10:29",
            explica: "Dios creó todo de la nada, por su palabra; en Cristo todas las cosas subsisten, y ni un pajarillo cae a tierra sin el Padre.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "¿Cómo le explicarías a un amigo, con la Biblia, que adoramos a un solo Dios en tres personas?",
            ref: "Deuteronomio 6:4; Mateo 28:19",
            clave: {
              id: "pr-n4-sistematica-1-6-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo le explicarías a un amigo, con la Biblia, que adoramos a un solo Dios en tres personas?",
              ideas: [
                { id: "uno", peso: 35, texto: "Hay un solo Dios: «Jehová nuestro Dios, Jehová uno es» (Deuteronomio 6:4).", formas: ["uno es", "jehova uno", "dios es uno", "deuteronomio", "oye israel"] },
                { id: "tres", peso: 35, texto: "El Padre es Dios, el Hijo es Dios y el Espíritu Santo es Dios, y son personas distintas.", formas: ["personas distintas", "hijo es dios", "espiritu es dios", "espiritu santo es dios", "padre es dios", "juan 1", "hechos 5", "bautismo de jesus", "mateo 3", "paloma", "se relacionan"] },
                { id: "nombre", peso: 30, texto: "Jesús mandó bautizar en un solo nombre: del Padre, y del Hijo, y del Espíritu Santo (Mateo 28:19).", formas: ["un solo nombre", "en el nombre", "mateo 28", "bautizar en", "bautiza* en el nombre"] },
              ],
              errores: [
                { id: "criatura", texto: "El Hijo es Dios (Juan 1:1): decir que es una criatura es el error del arrianismo.", formas: ["hijo es (una|un) criatura", "hijo (fue|es) creado"], anula: "tres" },
                { id: "tres-dioses", texto: "Hay un solo Dios: hablar de tres dioses separados es el error del triteísmo.", formas: ["tres dioses"], anula: "uno" },
                { id: "una-persona", texto: "Dios no es una sola persona que se muestra de tres maneras: eso es el modalismo.", formas: ["una sola persona"], anula: "tres" },
              ],
              modelo: "Le leería Deuteronomio 6:4: Jehová nuestro Dios, Jehová uno es; hay un solo Dios. Pero el Padre es Dios, el Hijo es Dios y el Espíritu Santo es Dios, y Jesús mandó bautizar en un solo nombre: del Padre, del Hijo y del Espíritu Santo.",
            },
          },
          {
            apoyo: "Pero el Nuevo Testamento muestra que el Padre es Dios, que el Hijo es Dios (Juan 1:1) y que el Espíritu Santo es Dios",
            ref: "Mateo 3:16-17",
            clave: {
              id: "pr-n4-sistematica-1-6-a7-2",
              tipo: "corta",
              pregunta: "¿Qué muestra el bautismo de Jesús sobre el Padre, el Hijo y el Espíritu Santo?",
              ideas: [
                { id: "vez", peso: 50, texto: "En el bautismo de Jesús aparecen los tres a la vez: el Hijo sale del agua, el Espíritu desciende como paloma y el Padre habla desde el cielo.", formas: ["a la vez", "al mismo tiempo", "los tres (aparecen|estan|juntos)", "paloma", "desde el cielo", "voz del cielo", "sale del agua", "salio del agua"] },
                { id: "distintas", peso: 50, texto: "Son tres personas distintas que se relacionan entre sí, y un solo Dios.", formas: ["personas distintas", "distintas personas", "tres personas", "se relacionan", "un solo dios"] },
              ],
              errores: [
                { id: "una-persona", texto: "En el bautismo de Jesús los tres están a la vez: no es una sola persona que se muestra de tres maneras (el modalismo).", formas: ["una sola persona", "una persona que (cambia|aparece|se)"], anula: "distintas" },
                { id: "una-persona-vez", texto: "En el bautismo de Jesús los tres están a la vez: no es una sola persona que se muestra de tres maneras (el modalismo).", formas: ["una sola persona", "una persona que (cambia|aparece|se)"], anula: "vez" },
              ],
              modelo: "Muestra que los tres aparecen a la vez: el Hijo sale del agua, el Espíritu desciende como paloma y el Padre habla desde el cielo. Son tres personas distintas que se relacionan entre sí, y un solo Dios.",
            },
          },
        ],
      },
    ],
  },
};
