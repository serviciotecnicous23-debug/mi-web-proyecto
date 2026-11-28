/**
 * Las prácticas de la materia `alabanza-5` (especialidad «Alabanza y adoración»), «Sonido y técnica al servicio del
 * culto». Hechas solo con lo que dice cada lección (server/academia/contenido/alabanza-5.ts), con la guía de
 * docs/academia-practicas.md.
 *
 * Todo se mira desde la consola del que sirve en el sonido, la proyección y la transmisión. Lo técnico se pregunta solo
 * con lo básico que da la lección (cada sistema tiene su manual): nada de datos propios ni de marcas. Nada se pregunta
 * sobre estilos de música ni sobre qué instrumentos usar en el culto. De los derechos de autor solo se pregunta lo que
 * la lección afirma: que puede hacer falta un permiso o una licencia y que cada iglesia debe informarse.
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_ALABANZA_5: PracticasMateria = {
  materia: "alabanza-5",
  mision: {
    titulo: "Un culto que se oye, se lee y se entiende",
    intro:
      "Tu pastor te pidió que formes y guíes al equipo técnico de la iglesia: el sonido, las pantallas y la transmisión. Vas a servir como Bezaleel, con el don que recibiste; cuidar que todo se entienda en la sala; preparar los micrófonos y la mezcla para que la congregación cante; evitar el acople y decidir el volumen pensando en todos; proyectar y transmitir con claridad, cuidado e integridad; y trabajar con seguridad, con orden y como un solo equipo con los músicos. Repasa las seis lecciones para tener lista cada respuesta.",
    cierre:
      "Ya sabes servir detrás de la consola como un ministerio: con el don que Dios te dio, para que la Palabra se entienda y la iglesia cante unida; con una mezcla que acompaña y un volumen pensado en todos; con pantallas claras, transmisiones cuidadosas y respeto por los que escriben los cantos; y cuidando a las personas, el equipo y la unidad con los músicos. Detrás de la consola también se adora.",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El técnico como servidor
    "alabanza-5-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿A quién llamó Dios por nombre para construir el tabernáculo?", reverso: "A Bezaleel, un artesano.", apoyo: "Para construir el tabernáculo, Dios llamó a un artesano" },
              { frente: "Según la lección, ¿qué es el trabajo técnico hecho para Dios?", reverso: "Un llamado y un don.", apoyo: "El trabajo técnico, hecho para Dios, también es un llamado y un don" },
              { frente: "¿Con quiénes de la iglesia compara la lección al técnico que ministra con su don?", reverso: "Con el que canta y con el que predica.", apoyo: "El técnico ministra a la iglesia con su don, igual que el que canta o el que predica" },
              { frente: "¿Qué pasa con la predicación si no hay un buen sonido?", reverso: "No se entiende, y la iglesia no puede cantar unida.", apoyo: "Sin un buen sonido, la predicación no se entiende y la iglesia no puede cantar unida" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cuándo nota todo el mundo al que maneja el sonido?", reverso: "Cuando algo falla; si todo sale bien, nadie aplaude.", apoyo: "Nadie aplaude al que maneja el sonido cuando todo sale bien, pero todos lo notan cuando algo falla" },
              { frente: "¿Qué es la habilidad técnica, según la lección?", reverso: "Un regalo de Dios para servir a su pueblo.", apoyo: "La habilidad técnica es un regalo de Dios para servir a su pueblo" },
              { frente: "En el cuerpo de Cristo, ¿cómo son los miembros que parecen más débiles?", reverso: "Son los más necesarios.", apoyo: "los miembros que parecen más débiles son los más necesarios" },
              { frente: "¿Se puede adorar detrás de la consola?", reverso: "Sí: detrás de la consola también se adora.", apoyo: "Detrás de la consola también se adora" },
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
            consigna: "Completa lo que enseña la lección sobre el técnico y su don.",
            texto: "El técnico [[ministra]] a la iglesia con su don, igual que el que [[canta]] o el que [[predica]].",
            distractores: ["estorba", "mira", "aplaude"],
            errores: {
              estorba: "El técnico no estorba al culto: ministra a la iglesia con su don, como enseña Pedro: «Cada uno según el don que ha recibido, minístrelo a los otros».",
              mira: "La lección compara al técnico con el que canta y con el que predica: todos ministran con su don.",
              aplaude: "La lección compara al técnico con el que canta y con el que predica: todos ministran con su don.",
            },
            apoyo: "El técnico ministra a la iglesia con su don, igual que el que canta o el que predica",
            ref: "1 Pedro 4:10",
            explica: "Pedro enseña que cada uno ministra a los otros con el don que ha recibido: el técnico ministra a la iglesia con su don, igual que el que canta o el que predica.",
          },
          {
            consigna: "Completa lo que dice la lección sobre la habilidad técnica.",
            texto: "La habilidad técnica es un [[regalo]] de [[Dios]] para [[servir]] a su pueblo.",
            distractores: ["salario", "Moisés", "dominar"],
            errores: {
              salario: "La lección dice que la habilidad técnica es un regalo de Dios.",
              "Moisés": "Fue Dios quien llenó a los artesanos de sabiduría de corazón: la habilidad técnica es un regalo de Dios.",
              dominar: "La habilidad técnica es para servir a su pueblo.",
            },
            apoyo: "La habilidad técnica es un regalo de Dios para servir a su pueblo",
            ref: "Éxodo 35:35",
            explica: "Dios llenó a los artesanos del tabernáculo de sabiduría de corazón: la habilidad técnica es un regalo de Dios para servir a su pueblo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Dios llenó a Bezaleel del Espíritu de Dios. ¿En qué cosas lo llenó? Toca las palabras que lo dicen.",
            texto: "lo he llenado del Espíritu de Dios, en [[sabiduría]] y en [[inteligencia]], en [[ciencia]] y en [[todo arte]]",
            apoyo: "Dios llamó a Bezaleel y lo llenó de su Espíritu, en sabiduría y en todo arte, para el tabernáculo",
            ref: "Éxodo 31:2-5",
            explica: "Dios llamó por nombre a Bezaleel y lo llenó del Espíritu de Dios, en sabiduría y en inteligencia, en ciencia y en todo arte, para construir el tabernáculo.",
          },
          {
            consigna: "¿Cómo llamó Dios a Bezaleel? Toca las palabras que lo dicen.",
            texto: "Mira, yo he llamado [[por nombre]] a Bezaleel",
            apoyo: "Para construir el tabernáculo, Dios llamó a un artesano",
            ref: "Éxodo 31:2-5",
            explica: "Dios dijo: «Mira, yo he llamado por nombre a Bezaleel». El trabajo técnico, hecho para Dios, también es un llamado y un don.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre Bezaleel y el trabajo técnico: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios llamó por nombre a Bezaleel para construir el tabernáculo.", verdad: true, explica: "Dios dijo: «Mira, yo he llamado por nombre a Bezaleel».", apoyo: "Para construir el tabernáculo, Dios llamó a un artesano", ref: "Éxodo 31:2-5" },
              { texto: "Bezaleel hizo su trabajo sin el Espíritu de Dios, solo con lo que él sabía.", verdad: false, explica: "Dios lo llenó del Espíritu de Dios, en sabiduría y en inteligencia, en ciencia y en todo arte.", apoyo: "Dios llamó a Bezaleel y lo llenó de su Espíritu, en sabiduría y en todo arte, para el tabernáculo", ref: "Éxodo 31:2-5" },
              { texto: "El trabajo técnico hecho para Dios también es un llamado y un don.", verdad: true, explica: "Así lo dice la lección, con el ejemplo de Bezaleel.", apoyo: "El trabajo técnico, hecho para Dios, también es un llamado y un don" },
            ],
          },
          {
            consigna: "Sobre lo que Dios dio a los artesanos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Dios llenó a los artesanos de sabiduría de corazón para hacer toda obra de arte.", verdad: true, explica: "Dios los llenó «de sabiduría de corazón, para que hagan toda obra de arte y de invención».", apoyo: "La Biblia insiste: Dios llenó a esos artesanos «de sabiduría de corazón, para que hagan toda obra de arte y de invención»", ref: "Éxodo 35:35" },
              { texto: "La habilidad técnica es solo un talento humano, que no tiene que ver con Dios.", verdad: false, explica: "La habilidad técnica es un regalo de Dios para servir a su pueblo.", apoyo: "La habilidad técnica es un regalo de Dios para servir a su pueblo" },
              { texto: "Para construir el tabernáculo, Dios llamó a un cantor.", verdad: false, explica: "Dios llamó a un artesano: Bezaleel.", apoyo: "Para construir el tabernáculo, Dios llamó a un artesano", ref: "Éxodo 31:2-5" },
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
            consigna: "¿Sirve como para el Señor, o no? Lleva cada frase a su grupo.",
            grupos: ["Sirve como para el Señor", "No sirve como para el Señor"],
            frases: [
              { texto: "Ora por el culto, aunque esté detrás de la consola", grupo: 0 },
              { texto: "Llega temprano y prepara con cuidado", grupo: 0 },
              { texto: "Se mantiene atento todo el culto, también en la predicación", grupo: 0 },
              { texto: "Se distrae con el teléfono cuando empieza la predicación", grupo: 1 },
              { texto: "Solo prepara con cuidado si lo van a felicitar", grupo: 1 },
              { texto: "Llega justo a la hora, porque nadie ve lo que hace", grupo: 1 },
            ],
            apoyo: "Sirve «de corazón, como para el Señor y no para los hombres»",
            ref: "Colosenses 3:23",
            explica: "El técnico sirve de corazón, como para el Señor y no para los hombres: ora por el culto, llega temprano, prepara con cuidado y se mantiene atento todo el culto, también en la predicación.",
          },
          {
            consigna: "¿Sirve aunque nadie lo vea, o busca que lo vean? Lleva cada frase a su grupo.",
            grupos: ["Sirve aunque nadie lo vea", "Busca que lo vean"],
            frases: [
              { texto: "Sirve con el mismo cuidado aunque nadie lo vea", grupo: 0 },
              { texto: "Ora por el culto desde la consola, sin que nadie lo sepa", grupo: 0 },
              { texto: "Llega temprano a preparar, cuando la sala está vacía", grupo: 0 },
              { texto: "Se enoja cuando nadie le aplaude al final del culto", grupo: 1 },
              { texto: "Solo se esmera cuando el pastor lo está mirando", grupo: 1 },
              { texto: "Quiere que lo nombren cada domingo desde el púlpito", grupo: 1 },
            ],
            apoyo: "El técnico sirve de corazón, como para el Señor, aunque nadie lo vea",
            ref: "Colosenses 3:23",
            explica: "Nadie aplaude al que maneja el sonido cuando todo sale bien: es un servicio escondido, y es un ministerio. El técnico sirve de corazón, como para el Señor, aunque nadie lo vea.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Es un servicio escondido, y es un ministerio",
            ref: "Colosenses 3:23",
            situacion: "Eres el técnico de sonido de tu iglesia. Este domingo hay un culto especial, con la iglesia llena y una predicación importante.",
            escenas: [
              {
                id: "e1",
                narra: "El culto empieza a las diez.",
                pregunta: "¿Cuándo llegas?",
                opciones: [
                  { texto: "Temprano, para preparar con cuidado el equipo.", valor: 2, explica: "El técnico llega temprano y prepara con cuidado.", siguiente: "e2" },
                  { texto: "Justo a las diez: nadie se fija en lo que haces.", valor: 0, explica: "Es un servicio escondido, pero es un ministerio: el técnico llega temprano y prepara con cuidado.", siguiente: "e1b" },
                  { texto: "A las diez menos cinco, para probar solo un micrófono.", valor: 1, explica: "Llegar antes ayuda, pero el técnico llega temprano y prepara todo con cuidado.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Llegas con el tiempo justo, y el primer canto empieza con un micrófono apagado.",
                pregunta: "¿Qué aprendes para el próximo domingo?",
                opciones: [
                  { texto: "Llegar temprano y preparar con cuidado, aunque nadie lo vea.", valor: 2, explica: "El técnico sirve de corazón, como para el Señor, aunque nadie lo vea: llega temprano y prepara con cuidado.", siguiente: "e2" },
                  { texto: "Que la culpa fue del cantante, que no revisó su micrófono antes de subir.", valor: 0, explica: "Preparar con cuidado es parte del servicio del técnico: llega temprano y prepara.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Empieza la predicación y todo suena bien. Un amigo te escribe para conversar por el teléfono.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Sigues atento a la consola hasta el final.", valor: 2, explica: "El técnico se mantiene atento todo el culto, también en la predicación." },
                  { texto: "Le contestas: en la predicación ya no hay nada que hacer.", valor: 0, explica: "El técnico se mantiene atento todo el culto, también en la predicación." },
                  { texto: "Le contestas rápido y vuelves a mirar la consola de vez en cuando.", valor: 1, explica: "Volver a mirar ayuda, pero el técnico se mantiene atento todo el culto, también en la predicación." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, el pastor agradece a los músicos y al predicador, pero nadie te nombra a ti.",
                pregunta: "¿Qué piensas?",
                opciones: [
                  { texto: "Que tu servicio es ministerio, aunque nadie lo vea.", valor: 2, explica: "Es un servicio escondido, y es un ministerio: el técnico sirve de corazón, como para el Señor, aunque nadie lo vea." },
                  { texto: "Que la próxima vez no vendrás, si nadie te da las gracias.", valor: 0, explica: "El técnico sirve «de corazón, como para el Señor y no para los hombres»." },
                  { texto: "Que tu servicio vale menos que el de quien canta o predica.", valor: 0, explica: "El técnico ministra con su don, igual que el que canta o el que predica, y los miembros que parecen más débiles son los más necesarios." },
                ],
              },
            ],
          },
          {
            apoyo: "Detrás de la consola también se adora",
            ref: "1 Corintios 12:21-22",
            situacion: "Eres el encargado de la consola en tu iglesia. Este mes, además, te piden enseñar a un joven que quiere aprender a servir en el sonido.",
            escenas: [
              {
                id: "e1",
                narra: "El joven llega el primer domingo con muchas ganas, pero no sabe nada de la consola.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Le enseñas con paciencia lo que tú ya aprendiste.", valor: 2, explica: "El técnico aprende siempre y enseña a otros.", siguiente: "e2" },
                  { texto: "Le pides que solo mire, para que no te quite tu lugar.", valor: 0, explica: "El técnico aprende siempre y enseña a otros: no guarda lo que sabe.", siguiente: "e1b" },
                  { texto: "Le das el manual y le dices que lo lea él solo en su casa.", valor: 1, explica: "Leer el manual ayuda, pero el técnico también enseña a otros.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "Pasan dos semanas y el joven ya no viene; dice que nadie le enseña.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Lo buscas y le ofreces enseñarle tú cada domingo.", valor: 2, explica: "El técnico aprende siempre y enseña a otros.", siguiente: "e2" },
                  { texto: "Lo dejas ir: así nadie más toca la consola de la iglesia.", valor: 0, explica: "El técnico aprende siempre y enseña a otros.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "El culto está por empezar, y tú ya estás detrás de la consola.",
                pregunta: "¿Qué haces mientras empieza?",
                opciones: [
                  { texto: "Oras por el culto desde la consola.", valor: 2, explica: "El técnico ora por el culto, aunque esté detrás de la consola." },
                  { texto: "Miras el teléfono: orar les toca a los que están en la plataforma.", valor: 0, explica: "El técnico también ora por el culto, aunque esté detrás de la consola." },
                  { texto: "Esperas a que termine el culto para orar en tu casa.", valor: 1, explica: "Orar siempre es bueno, pero el técnico ora por el culto, aunque esté detrás de la consola." },
                ],
              },
              {
                id: "e3",
                narra: "El joven te pregunta: ¿Por qué hacemos esto con tanto cuidado, si nadie nos ve?",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que detrás de la consola también se adora.", valor: 2, explica: "Detrás de la consola también se adora: el técnico sirve de corazón, como para el Señor, aunque nadie lo vea." },
                  { texto: "Que lo hacemos así para que el pastor nos felicite.", valor: 0, explica: "El técnico sirve «de corazón, como para el Señor y no para los hombres»." },
                  { texto: "Que el sonido no importa tanto como el canto y la predicación.", valor: 0, explica: "Sin un buen sonido, la predicación no se entiende y la iglesia no puede cantar unida." },
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
            apoyo: "El trabajo técnico, hecho para Dios, también es un llamado y un don",
            ref: "Éxodo 31:2-5",
            clave: {
              id: "pr-alabanza-5-1-a7-1",
              tipo: "corta",
              pregunta: "Un hermano dice que manejar el sonido es solo una tarea técnica, no un ministerio. ¿Qué le respondes con lo que enseña la lección?",
              ideas: [
                { id: "llamado", peso: 40, texto: "Dios llamó a Bezaleel y lo llenó de su Espíritu para el tabernáculo: el trabajo técnico hecho para Dios es un llamado y un don.", formas: ["bezaleel", "tabernaculo", "un llamado", "es llamado", "llamado de dios", "dios (lo|los|nos|me|te) (llamo|lleno|llama)", "espiritu de dios", "lleno espiritu"] },
                { id: "don", peso: 30, texto: "Cada uno ministra a los otros con el don que recibió, igual que el que canta o el que predica.", formas: ["(su|un|el|sus|los|cada) (don|dones)", "don que recib*", "ministra", "ministrelo", "ministran", "igual que el que (canta|predica)", "como el que (canta|predica)"] },
                { id: "corazon", peso: 30, texto: "Se sirve de corazón, como para el Señor, aunque nadie lo vea: los miembros que parecen más débiles son los más necesarios.", formas: ["de corazon", "para el senor", "mas necesarios", "son necesarios", "aunque nadie (lo|nos|me|te) (vea|ve|vean)", "(tambien|se) adora"] },
              ],
              modelo: "Le respondo que sí es un ministerio. Dios llamó a Bezaleel y lo llenó de su Espíritu para el tabernáculo. Cada uno ministra a los otros con el don que recibió, y el técnico sirve de corazón, como para el Señor.",
            },
          },
          {
            apoyo: "Cada uno ministra a los otros con el don que recibió, y los miembros que parecen más débiles son los más necesarios",
            ref: "1 Pedro 4:10",
            clave: {
              id: "pr-alabanza-5-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseñan Pedro y Pablo sobre el don y sobre los miembros del cuerpo, y qué tiene que ver eso con el que maneja el sonido?",
              ideas: [
                { id: "don", peso: 50, texto: "Cada uno ministra a los otros con el don que ha recibido: el técnico ministra con su don, igual que el que canta o el que predica.", formas: ["(su|un|el|sus|los|cada) (don|dones)", "don que recib*", "ministra", "ministrelo", "ministran", "igual que el que (canta|predica)", "como el que (canta|predica)"] },
                { id: "necesarios", peso: 50, texto: "Los miembros que parecen más débiles son los más necesarios: sin un buen sonido la predicación no se entiende y la iglesia no canta unida.", formas: ["mas necesarios", "(son|es|somos) necesari*", "parecen debiles", "no se entiende", "(cantar|canta|cante) unida", "sin buen sonido"] },
              ],
              modelo: "Pedro enseña que cada uno ministra a los otros con el don que ha recibido, y el técnico ministra con su don igual que el que canta. Pablo dice que los miembros que parecen más débiles son los más necesarios: sin buen sonido la predicación no se entiende.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El propósito del sonido y la sala
    "alabanza-5-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué propósito tiene el sonido de la iglesia?", reverso: "Que la Palabra se entienda y que el pueblo pueda cantar unido.", apoyo: "El sonido de la iglesia tiene un propósito: que la Palabra se entienda y que el pueblo pueda cantar unido" },
              { frente: "¿Cuál es el versículo de memoria de esta materia?", reverso: "1 Corintios 14:8, el de la trompeta que da sonido incierto.", apoyo: "Pablo usa una imagen sonora: «Y si la trompeta diere sonido incierto, ¿quién se preparará para la batalla?»" },
              { frente: "¿Qué prepararon para que todos vieran y oyeran a Esdras?", reverso: "Un lugar alto: un púlpito de madera.", apoyo: "Prepararon un lugar alto para que todos vieran y oyeran: un cuidado técnico al servicio de la Palabra" },
              { frente: "Según Pablo, ¿qué pasa si no se da palabra bien comprensible?", reverso: "Nadie entiende lo que se dice.", apoyo: "sin palabra bien comprensible nadie entiende" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Para qué existe el sonido, según la lección?", reverso: "Para que se entienda.", apoyo: "El sonido existe para que se entienda" },
              { frente: "¿Cómo es el mejor sonido?", reverso: "El que nadie nota porque todo se entiende.", apoyo: "El mejor sonido es el que nadie nota porque todo se entiende" },
              { frente: "Cuando Esdras leyó la ley, ¿cómo estaban los oídos del pueblo?", reverso: "Atentos al libro de la ley.", apoyo: "Cuando Esdras leyó la ley, «los oídos de todo el pueblo estaban atentos al libro de la ley»" },
              { frente: "Según la imagen que usa Pablo, ¿qué no sirve?", reverso: "Una trompeta que da sonido incierto.", apoyo: "una trompeta que da sonido incierto no sirve" },
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
            consigna: "¿Qué clase de sonido de la trompeta no prepara a nadie para la batalla? Toca las palabras que lo dicen.",
            texto: "Y si la trompeta diere [[sonido incierto]], ¿quién se preparará para la batalla?",
            apoyo: "una trompeta que da sonido incierto no sirve",
            ref: "1 Corintios 14:8",
            explica: "Pablo usa una imagen sonora: si la trompeta da sonido incierto, nadie se prepara para la batalla. El primer propósito del sonido es que se entienda.",
          },
          {
            consigna: "Pablo lo aplica a lo que se dice en la iglesia. ¿Qué hace falta dar para que se entienda? Toca las palabras que lo dicen.",
            texto: "[[palabra bien comprensible]], ¿cómo se entenderá lo que decís?",
            apoyo: "El sonido existe para que se entienda",
            ref: "1 Corintios 14:9",
            explica: "Si no se da palabra bien comprensible, nadie entiende lo que se dice: el sonido existe para que se entienda.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena el camino del sonido en la iglesia, desde donde sale hasta la sala.",
            pasos: [
              "Sale de la fuente: la voz o el instrumento",
              "Lo capta el micrófono",
              "La consola lo envía a los parlantes",
              "En la sala, rebota en las paredes, el piso y el techo",
            ],
            apoyo: "El sonido sale de la fuente (la voz o el instrumento), lo capta el micrófono y la consola lo envía a los parlantes",
            explica: "El sonido sale de la fuente, lo capta el micrófono y la consola lo envía a los parlantes; en la sala rebota en las paredes, el piso y el techo.",
          },
          {
            consigna: "Una hermana canta en la plataforma. Ordena el camino de su voz, del primer paso al último.",
            pasos: [
              "La hermana canta: su voz es la fuente del sonido",
              "El micrófono capta su voz",
              "La consola envía su voz a los parlantes",
              "Los parlantes, que apuntan a la gente, la llevan a la sala",
            ],
            apoyo: "El técnico conoce lo básico de cómo viaja el sonido en la sala",
            explica: "La voz es la fuente: el micrófono la capta y la consola la envía a los parlantes, que deben apuntar a la gente, no a las paredes ni a los micrófonos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué pasa con el sonido en la sala? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "sonido", texto: "El sonido", x: 50, y: 8 },
              { id: "sala", texto: "Paredes, piso y techo", x: 50, y: 38 },
              { id: "duras", texto: "Superficies duras y vacías", x: 14, y: 62 },
              { id: "blandas", texto: "Cortinas, alfombras y gente", x: 86, y: 62 },
              { id: "eco", texto: "El eco", x: 50, y: 92 },
            ],
            enlaces: [
              { de: "sonido", a: "sala", relacion: "rebota en" },
              { de: "duras", a: "eco", relacion: "hacen más" },
              { de: "blandas", a: "eco", relacion: "absorben" },
            ],
            distractores: ["nunca llega a", "apuntan a"],
            apoyo: "Las superficies duras y vacías hacen más eco; las cortinas, las alfombras y la gente lo absorben",
            explica: "En la sala, el sonido rebota en las paredes, el piso y el techo; las superficies duras y vacías hacen más eco, y las cortinas, las alfombras y la gente lo absorben.",
          },
          {
            consigna: "¿Hacia dónde apuntan los parlantes y desde dónde escucha el técnico? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "parlantes", texto: "Los parlantes", x: 50, y: 10 },
              { id: "gente", texto: "La gente", x: 14, y: 50 },
              { id: "paredes", texto: "Las paredes", x: 86, y: 50 },
              { id: "tecnico", texto: "El técnico", x: 22, y: 90 },
              { id: "puntos", texto: "Varios puntos de la sala", x: 78, y: 90 },
            ],
            enlaces: [
              { de: "parlantes", a: "gente", relacion: "deben apuntar a" },
              { de: "parlantes", a: "paredes", relacion: "no deben apuntar a" },
              { de: "tecnico", a: "puntos", relacion: "escucha desde" },
            ],
            distractores: ["rebota en", "absorbe"],
            apoyo: "Los parlantes deben apuntar a la gente, no a las paredes ni a los micrófonos",
            explica: "Los parlantes deben apuntar a la gente, no a las paredes ni a los micrófonos; y como el sonido no se oye igual en todos los lugares, el técnico camina la sala y escucha desde varios puntos.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda a que todos entiendan o lo estorba? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a que todos entiendan", "Estorba a que todos entiendan"],
            frases: [
              { texto: "Parlantes que apuntan a la gente", grupo: 0 },
              { texto: "Cortinas y alfombras que absorben el eco", grupo: 0 },
              { texto: "Caminar la sala y escuchar desde varios puntos", grupo: 0 },
              { texto: "Un sonido que rebota demasiado y se mezcla", grupo: 1 },
              { texto: "Parlantes que apuntan a las paredes", grupo: 1 },
              { texto: "Una sala con superficies duras y vacías", grupo: 1 },
            ],
            apoyo: "En la sala, el sonido rebota en las paredes, el piso y el techo; si rebota demasiado, se mezcla y cuesta entender",
            explica: "Si el sonido rebota demasiado, se mezcla y cuesta entender. Ayudan las cortinas, las alfombras y la gente, que absorben el eco, los parlantes que apuntan a la gente y escuchar desde varios puntos.",
          },
          {
            consigna: "¿Ayuda a que todos entiendan o lo estorba? Lleva cada frase a su grupo.",
            grupos: ["Ayuda a que todos entiendan", "Estorba a que todos entiendan"],
            frases: [
              { texto: "Una palabra bien comprensible", grupo: 0 },
              { texto: "Un púlpito alto para que todos vean y oigan", grupo: 0 },
              { texto: "Leer con claridad, para que entiendan la lectura", grupo: 0 },
              { texto: "Una trompeta que da sonido incierto", grupo: 1 },
              { texto: "Escuchar el culto siempre desde el mismo lugar", grupo: 1 },
              { texto: "Un eco fuerte que mezcla las palabras", grupo: 1 },
            ],
            apoyo: "Prepararon un lugar alto para que todos vieran y oyeran: un cuidado técnico al servicio de la Palabra",
            explica: "Ayudan la palabra bien comprensible, el púlpito alto de Esdras y la lectura clara; estorban el sonido incierto, el eco que mezcla y escuchar desde un solo lugar, porque el sonido no se oye igual en todos los lugares.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Una hermana que se sienta al fondo te dice: Desde aquí atrás la voz del pastor retumba y se mezcla; casi no entiendo la predicación.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Voy al fondo a escuchar desde allí y ajusto.", bien: true, explica: "El sonido no se oye igual en todos los lugares: hay que caminar la sala y escuchar desde varios puntos." },
              { texto: "Le digo que desde la consola se oye perfecto.", explica: "El sonido no se oye igual en todos los lugares: desde la consola no se oye lo mismo que al fondo." },
              { texto: "Subo mucho el volumen para que el sonido le llegue.", explica: "Si el sonido rebota demasiado, se mezcla y cuesta entender: hay que escuchar desde donde está ella." },
              { texto: "Le pido que se cambie de lugar, cerca de la consola.", explica: "La meta del técnico es que todos entiendan, también los que se sientan al fondo." },
            ],
            apoyo: "El sonido no se oye igual en todos los lugares: hay que caminar la sala y escuchar desde varios puntos",
            explica: "El técnico conoce lo básico de cómo viaja el sonido en la sala y escucha desde varios lugares: la meta es que todos entiendan.",
          },
          {
            caso: "El encargado de mantenimiento te dice: Voy a girar los parlantes hacia las paredes, para que el sonido llene más la sala.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que deben apuntar a la gente, no a las paredes.", bien: true, explica: "Los parlantes deben apuntar a la gente, no a las paredes ni a los micrófonos." },
              { texto: "Que está bien: así rebota más y todo suena más lleno.", explica: "Si el sonido rebota demasiado, se mezcla y cuesta entender." },
              { texto: "Que mejor los apunte hacia los micrófonos de la plataforma.", explica: "Los parlantes no deben apuntar a las paredes ni a los micrófonos: deben apuntar a la gente." },
              { texto: "Que da igual, porque el sonido se oye igual en todos lados.", explica: "El sonido no se oye igual en todos los lugares: hay que caminar la sala y escuchar desde varios puntos." },
            ],
            apoyo: "Los parlantes deben apuntar a la gente, no a las paredes ni a los micrófonos",
            explica: "En la sala, el sonido rebota en las paredes, el piso y el techo; si rebota demasiado, se mezcla y cuesta entender. Por eso los parlantes apuntan a la gente.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El primer propósito del sonido es que se entienda: una trompeta que da sonido incierto no sirve",
            ref: "1 Corintios 14:8-9",
            clave: {
              id: "pr-alabanza-5-2-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué la claridad es el primer propósito del sonido en la iglesia? Usa la imagen de la trompeta.",
              ideas: [
                { id: "entender", peso: 50, texto: "El sonido existe para que la Palabra se entienda y el pueblo pueda cantar unido.", formas: ["se entienda", "(entiendan|entendamos|entienda|entender|entiende|entenderse|comprenda|comprendan|comprender)", "comprensible", "cantar unid*", "(canta|cante|canten) unid*", "cantar (juntos|junta|juntas)", "(sonido|suene|oiga) claro"] },
                { id: "trompeta", peso: 50, texto: "Una trompeta que da sonido incierto no prepara a nadie para la batalla: un sonido que no se entiende no sirve.", formas: ["sonido incierto", "(trompeta|sonido) (confuso|confusa|incierta|dudoso)", "(suena|sonara|suene|sonaba) mal", "nadie se (prepara|preparara|preparaba|alista)", "prepar* para la batalla", "batalla", "no sirve", "no le sirve"] },
              ],
              modelo: "Porque el sonido existe para que la Palabra se entienda y el pueblo pueda cantar unido. Si la trompeta da sonido incierto, nadie se prepara para la batalla: un sonido que no se entiende no sirve.",
            },
          },
          {
            apoyo: "En tiempos de Esdras prepararon un púlpito para que todos oyeran, y leían claramente para que entendieran",
            ref: "Nehemías 8:3-8",
            clave: {
              id: "pr-alabanza-5-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña lo que pasó en tiempos de Esdras sobre la meta del que sirve en el sonido?",
              ideas: [
                { id: "pulpito", peso: 50, texto: "Prepararon un púlpito de madera, un lugar alto, para que todos vieran y oyeran.", formas: ["pulpito", "lugar alto", "(vieran|oyeran|oigan|vean|escuchen|escucharan|oir|escuchar) todos", "todos (vieran|oyeran|oigan|vean|escuchen|escucharan|oir|escuchar)", "cuidado tecnico"] },
                { id: "entiendan", peso: 50, texto: "La meta del técnico es la misma: que todos entiendan, como cuando leían claramente.", formas: ["todos entiend*", "que entiend*", "que se entienda", "para entender", "claramente", "con claridad", "pon* el sentido", "comprensible"] },
              ],
              modelo: "En tiempos de Esdras prepararon un púlpito de madera, un lugar alto, para que todos vieran y oyeran. Y leían claramente para que entendieran. La meta del técnico es la misma: que todos entiendan.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. Los micrófonos y la consola
    "alabanza-5-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cómo son los micrófonos dinámicos?", reverso: "Resistentes y menos sensibles.", apoyo: "Dinámicos: resistentes y menos sensibles" },
              { frente: "¿Para qué se usan más los micrófonos dinámicos?", reverso: "Para las voces en la plataforma y para muchos instrumentos.", apoyo: "son los más usados para las voces en la plataforma y para muchos instrumentos" },
              { frente: "¿Qué necesitan los micrófonos de condensador?", reverso: "Alimentación de la consola, la llamada alimentación fantasma.", apoyo: "necesitan alimentación de la consola (la llamada alimentación fantasma)" },
              { frente: "¿Qué pasa cuando el micrófono está cerca de la boca?", reverso: "Suena más claro y capta menos ruido de la sala.", apoyo: "La distancia importa: cerca de la boca suenan más claros y captan menos ruido de la sala" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo son los micrófonos de condensador?", reverso: "Más sensibles y detallados.", apoyo: "De condensador: más sensibles y detallados" },
              { frente: "¿Para qué se usan, por ejemplo, los de condensador?", reverso: "Para coros o instrumentos acústicos.", apoyo: "se usan, por ejemplo, para coros o instrumentos acústicos" },
              { frente: "¿Hacia dónde se apunta un micrófono?", reverso: "A la fuente, lejos de los parlantes y de los monitores.", apoyo: "Se apuntan a la fuente y lejos de los parlantes y de los monitores" },
              { frente: "Según Proverbios 22:29, ¿qué valora la Biblia?", reverso: "El trabajo bien hecho.", apoyo: "La Biblia valora el trabajo bien hecho" },
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
            consigna: "¿Es un micrófono dinámico o de condensador? Lleva cada frase a su grupo.",
            grupos: ["Micrófono dinámico", "Micrófono de condensador"],
            frases: [
              { texto: "Resistente y menos sensible", grupo: 0 },
              { texto: "El más usado para las voces en la plataforma", grupo: 0 },
              { texto: "Se usa también para muchos instrumentos", grupo: 0 },
              { texto: "Más sensible y detallado", grupo: 1 },
              { texto: "Necesita la alimentación fantasma de la consola", grupo: 1 },
              { texto: "Se usa, por ejemplo, para coros", grupo: 1 },
            ],
            apoyo: "Los micrófonos dinámicos son resistentes y comunes en las voces; los de condensador son más sensibles y necesitan alimentación fantasma",
            explica: "Los dinámicos son resistentes y menos sensibles, y son los más usados para las voces en la plataforma y para muchos instrumentos; los de condensador son más sensibles y detallados, necesitan alimentación fantasma y se usan, por ejemplo, para coros.",
          },
          {
            consigna: "¿De qué micrófono habla cada frase: dinámico o de condensador? Lleva cada frase a su grupo.",
            grupos: ["Micrófono dinámico", "Micrófono de condensador"],
            frases: [
              { texto: "Aguanta bien el uso de cada domingo", grupo: 0 },
              { texto: "Capta menos detalle que el otro tipo", grupo: 0 },
              { texto: "Es el más común para cantar en la plataforma", grupo: 0 },
              { texto: "Capta más detalle del sonido", grupo: 1 },
              { texto: "No funciona sin la alimentación de la consola", grupo: 1 },
              { texto: "Sirve, por ejemplo, para un coro o un instrumento acústico", grupo: 1 },
            ],
            apoyo: "De condensador: más sensibles y detallados; necesitan alimentación de la consola (la llamada alimentación fantasma) y se usan, por ejemplo, para coros o instrumentos acústicos",
            explica: "El dinámico es resistente, menos sensible y el más usado para las voces en la plataforma; el de condensador es más sensible y detallado, necesita la alimentación fantasma de la consola y se usa, por ejemplo, para coros o instrumentos acústicos.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre los micrófonos tiene un error. Tócala.",
            frases: [
              "Los dinámicos son resistentes y menos sensibles.",
              "Los de condensador necesitan la alimentación fantasma de la consola.",
              "Lejos de la boca, el micrófono suena más claro y capta menos ruido.",
              "El micrófono se apunta a la fuente, lejos de los parlantes.",
            ],
            malo: 2,
            correccion: "Cerca de la boca, el micrófono suena más claro y capta menos ruido de la sala.",
            apoyo: "La distancia importa: cerca de la boca suenan más claros y captan menos ruido de la sala",
            explica: "La distancia importa: cerca de la boca, los micrófonos suenan más claros y captan menos ruido de la sala.",
          },
          {
            consigna: "Una de estas frases sobre los tipos de micrófonos tiene un error. Tócala.",
            frases: [
              "Los dinámicos son los más usados para las voces en la plataforma.",
              "Los de condensador son menos sensibles que los dinámicos.",
              "Los de condensador se usan, por ejemplo, para coros.",
              "Los micrófonos se apuntan lejos de los monitores.",
            ],
            malo: 1,
            correccion: "Los de condensador son más sensibles y detallados; los dinámicos son los menos sensibles.",
            apoyo: "De condensador: más sensibles y detallados",
            explica: "Los dinámicos son resistentes y menos sensibles; los de condensador son más sensibles y detallados, y necesitan alimentación fantasma.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada parte de la consola con lo que hace.",
            pares: [
              ["Ganancia", "Ajusta cuánta señal entra de cada micrófono"],
              ["Ecualización", "Realza o recorta graves, medios y agudos"],
              ["Mezcla", "El volumen de cada canal en relación con los otros"],
              ["Envíos", "Mandan una mezcla distinta a los monitores"],
            ],
            apoyo: "La ganancia se ajusta primero, la ecualización aclara cada sonido y la mezcla los equilibra",
            explica: "La ganancia ajusta cuánta señal entra de cada micrófono; la ecualización realza o recorta graves, medios y agudos; la mezcla es el volumen de cada canal en relación con los otros; y los envíos mandan una mezcla distinta a los monitores de la plataforma.",
          },
          {
            consigna: "Une cada parte de la consola con lo que logra o cuándo se usa.",
            pares: [
              ["La ganancia", "Se ajusta primero, con la persona cantando como en el culto"],
              ["La ecualización", "Que cada voz e instrumento suene claro, sin estorbar"],
              ["La mezcla", "Que el conjunto suene equilibrado"],
              ["Los envíos", "Que la plataforma tenga otra mezcla en los monitores"],
            ],
            apoyo: "Ecualización: realza o recorta graves, medios y agudos para que cada voz e instrumento suene claro, sin estorbar a los demás",
            explica: "La ganancia se ajusta primero, con la persona cantando o hablando como lo hará en el culto; la ecualización hace que cada voz e instrumento suene claro; la mezcla, que el conjunto suene equilibrado; y los envíos mandan otra mezcla a los monitores.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa cómo se ajusta la ganancia.",
            texto: "La ganancia se ajusta [[primero]], con la persona [[cantando]] o hablando como lo hará en el [[culto]].",
            distractores: ["último", "callada", "concierto"],
            errores: {
              "último": "La ganancia se ajusta primero, antes que lo demás.",
              callada: "Se ajusta con la persona cantando o hablando, como lo hará en el culto.",
              concierto: "Se ajusta como la persona cantará o hablará en el culto: y en el culto, la mezcla no es un concierto.",
            },
            apoyo: "Se ajusta primero, con la persona cantando o hablando como lo hará en el culto",
            explica: "La ganancia ajusta cuánta señal entra de cada micrófono, y se ajusta primero, con la persona cantando o hablando como lo hará en el culto.",
          },
          {
            consigna: "Completa qué es la mezcla.",
            texto: "La [[mezcla]] es el volumen de cada [[canal]] en relación con los otros, para que el [[conjunto]] suene equilibrado.",
            distractores: ["ganancia", "parlante", "solista"],
            errores: {
              ganancia: "La ganancia ajusta cuánta señal entra de cada micrófono; el volumen de cada canal en relación con los otros es la mezcla.",
              parlante: "La mezcla es el volumen de cada canal en relación con los otros.",
              solista: "La mezcla busca que el conjunto suene equilibrado, no una sola voz.",
            },
            apoyo: "Mezcla: el volumen de cada canal en relación con los otros, para que el conjunto suene equilibrado",
            explica: "La mezcla es el volumen de cada canal en relación con los otros, para que el conjunto suene equilibrado.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "La congregación tiene que poder oírse cantar",
            titulo: "La banda quiere más volumen",
            relato: [
              "Eres el técnico de sonido de tu iglesia. El domingo, el baterista y el guitarrista te piden que subas mucho sus instrumentos, porque así se sienten mejor tocando.",
              "Después del culto, una hermana de la última fila te cuenta que no entendió la letra de los cantos nuevos.",
              "Esta semana quieres preparar la mezcla como enseña la lección.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué meta tiene la mezcla del culto?",
                opciones: [
                  { texto: "Que la iglesia pueda cantar y entender la letra.", bien: true, explica: "En el culto, la mezcla no es un concierto: la letra debe entenderse y la congregación tiene que poder oírse cantar." },
                  { texto: "Que la banda suene tan fuerte como en un concierto.", explica: "En el culto, la mezcla no es un concierto." },
                  { texto: "Que cada músico oiga en la sala lo que él prefiera.", explica: "La mezcla sirve a la congregación; los músicos se oyen en los monitores, con los envíos." },
                ],
                apoyo: "En el culto, la mezcla no es un concierto",
                explica: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué haces con los instrumentos?",
                opciones: [
                  { texto: "Los dejo acompañar, sin tapar la voz que guía.", bien: true, explica: "Los instrumentos deben acompañar, no tapar, y la voz que guía debe oírse clara." },
                  { texto: "Los subo por encima de todo, como me lo pidieron ellos.", explica: "Los instrumentos deben acompañar, no tapar." },
                  { texto: "Los bajo tanto que casi no se oyen desde la sala.", explica: "Los instrumentos acompañan: la mezcla busca que el conjunto suene equilibrado." },
                ],
                apoyo: "los instrumentos deben acompañar, no tapar",
                explica: "La voz que guía debe oírse clara, la letra debe entenderse y los instrumentos deben acompañar, no tapar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué cuidas por la hermana que no entendió la letra?",
                opciones: [
                  { texto: "Que la voz que guía y la letra se entiendan.", bien: true, explica: "La voz que guía debe oírse clara y la letra debe entenderse." },
                  { texto: "Que ella se siente más cerca de la banda.", explica: "La mezcla sirve a toda la congregación: la letra debe entenderse en toda la sala." },
                  { texto: "Que aprenda los cantos nuevos con el tiempo, en su casa.", explica: "La letra debe entenderse: es parte de lo que cuida la mezcla del culto." },
                ],
                apoyo: "Todo sirve para que la letra se entienda y la congregación pueda cantar",
                explica: "En el culto, la voz que guía debe oírse clara y la letra debe entenderse.",
              },
              {
                tipo: "explica",
                apoyo: "La congregación tiene que poder oírse cantar",
                clave: {
                  id: "pr-alabanza-5-3-a6-1",
                  tipo: "corta",
                  pregunta: "¿Qué les explicarás a los músicos sobre cómo prepararás la mezcla del culto?",
                  ideas: [
                    { id: "concierto", peso: 50, texto: "Que en el culto la mezcla no es un concierto: los instrumentos acompañan y no tapan.", formas: ["no es un concierto", "no es concierto", "no es como un concierto", "acompan*", "no tap*", "sin tapar"] },
                    { id: "cantar", peso: 50, texto: "Que la voz que guía y la letra se entiendan, para que la congregación pueda oírse cantar.", formas: ["voz que guia", "letra se entienda", "letra se entiende", "entiend* la letra", "letra debe entenderse", "oirse cantar", "(se|nos) oiga cantar", "(iglesia|congregacion|gente|pueblo) (cante|canta|pueda|puede|cantar)", "cante mejor", "cantar mejor"] },
                  ],
                  errores: [
                    { id: "concierto", texto: "En el culto, la mezcla no es un concierto.", formas: ["es un concierto", "es como un concierto"], anula: "concierto" },
                  ],
                  modelo: "Les explicaré que en el culto la mezcla no es un concierto: los instrumentos acompañan y no tapan. La voz que guía y la letra deben entenderse, para que la congregación pueda oírse cantar.",
                },
              },
            ],
          },
          {
            apoyo: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor",
            titulo: "El culto de jóvenes",
            relato: [
              "Te toca el sonido en el culto de jóvenes. La directora del grupo de alabanza te pide: Que suene fuerte, como en los conciertos.",
              "Durante el primer canto notas que en la sala casi nadie está cantando, y la voz de la directora casi no se distingue.",
              "Decides ajustar la mezcla para que sirva a la congregación.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué te muestra que casi nadie esté cantando?",
                opciones: [
                  { texto: "Que la mezcla tapa el canto de la iglesia.", bien: true, explica: "La congregación tiene que poder oírse cantar: si no se oye, la mezcla no le está sirviendo." },
                  { texto: "Que los jóvenes todavía no conocen los cantos.", explica: "Aquí la voz que guía casi no se distingue: la mezcla debe dejar que la congregación se oiga cantar." },
                  { texto: "Que hay que subir más los instrumentos para animar.", explica: "Los instrumentos deben acompañar, no tapar." },
                ],
                apoyo: "La congregación tiene que poder oírse cantar",
                explica: "En el culto, la mezcla no es un concierto: la congregación tiene que poder oírse cantar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué cuidas en la mezcla?",
                opciones: [
                  { texto: "Que la voz que guía se oiga clara.", bien: true, explica: "En el culto, la voz que guía debe oírse clara." },
                  { texto: "Que la batería suene más que todo lo demás.", explica: "Los instrumentos deben acompañar, no tapar." },
                  { texto: "Que todo suba al máximo, para que haya energía.", explica: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor." },
                ],
                apoyo: "la voz que guía debe oírse clara",
                explica: "La voz que guía debe oírse clara, la letra debe entenderse y los instrumentos deben acompañar, no tapar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes a la directora que pidió que sonara como en un concierto?",
                opciones: [
                  { texto: "Que la mezcla del culto no es un concierto.", bien: true, explica: "En el culto, la mezcla no es un concierto: la congregación tiene que poder oírse cantar." },
                  { texto: "Que sí: en el culto de jóvenes todo debe sonar fuerte.", explica: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor." },
                  { texto: "Que lo hará así, pero solo durante el último canto.", explica: "En todo el culto, la mezcla sirve a la congregación: no es un concierto." },
                ],
                apoyo: "En el culto, la mezcla no es un concierto",
                explica: "La mezcla sirve a la congregación: la voz que guía se oye clara y la congregación puede oírse cantar.",
              },
              {
                tipo: "explica",
                apoyo: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor",
                clave: {
                  id: "pr-alabanza-5-3-a6-2",
                  tipo: "corta",
                  pregunta: "¿Cómo le explicarías a la directora para qué sirve la mezcla en el culto?",
                  ideas: [
                    { id: "cantar", peso: 50, texto: "Para que la iglesia cante mejor: la congregación tiene que poder oírse cantar.", formas: ["iglesia cante", "cante mejor", "cantar mejor", "canten mejor", "oirse cantar", "(se|nos) oiga cantar", "(iglesia|congregacion|gente|pueblo) (pueda|puede|pueden) cantar"] },
                    { id: "acompanar", peso: 50, texto: "No es un concierto: la voz que guía se oye clara y los instrumentos acompañan, sin tapar.", formas: ["voz que guia", "acompan*", "no tap*", "sin tapar", "no es un concierto", "no es concierto", "no es como un concierto"] },
                  ],
                  errores: [
                    { id: "concierto", texto: "En el culto, la mezcla no es un concierto.", formas: ["es un concierto", "es como un concierto"], anula: "acompanar" },
                  ],
                  modelo: "La mezcla sirve para que la iglesia cante mejor y pueda oírse cantar. No es un concierto: la voz que guía se oye clara y los instrumentos acompañan, sin tapar.",
                },
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
            apoyo: "Un buen técnico no hace que la banda suene más fuerte, sino que la iglesia cante mejor",
            clave: {
              id: "pr-alabanza-5-3-a7-1",
              tipo: "corta",
              pregunta: "La lección dice que un buen técnico no hace que la banda suene más fuerte. ¿Qué hace entonces, y cómo lo logra con la mezcla?",
              ideas: [
                { id: "cante", peso: 40, texto: "Hace que la iglesia cante mejor: la congregación tiene que poder oírse cantar.", formas: ["iglesia cante", "cante mejor", "cantar mejor", "canten mejor", "oirse cantar", "(se|nos) oiga cantar", "(iglesia|congregacion|gente|pueblo) (pueda|puede|pueden) cantar"] },
                { id: "voz", peso: 30, texto: "La voz que guía se oye clara y la letra se entiende.", formas: ["voz que guia", "letra se entienda", "letra se entiende", "entiend* la letra", "letra debe entenderse", "letra (clara|entendible)"] },
                { id: "acompanar", peso: 30, texto: "Los instrumentos acompañan, no tapan.", formas: ["acompan*", "no tap*", "sin tapar"] },
              ],
              errores: [
                { id: "concierto", texto: "En el culto, la mezcla no es un concierto.", formas: ["es un concierto", "es como un concierto"], anula: "cante" },
              ],
              modelo: "Hace que la iglesia cante mejor, porque la congregación tiene que poder oírse cantar. En la mezcla, la voz que guía se oye clara, la letra se entiende y los instrumentos acompañan, sin tapar.",
            },
          },
          {
            apoyo: "La congregación tiene que poder oírse cantar",
            clave: {
              id: "pr-alabanza-5-3-a7-2",
              tipo: "corta",
              pregunta: "Una cantante te dice: Súbenos más, que así la iglesia nos sigue mejor. Pero en la sala ya nadie oye su propio canto. ¿Qué le explicas sobre la mezcla del culto?",
              ideas: [
                { id: "congregacion", peso: 50, texto: "La mezcla sirve a la congregación: la iglesia tiene que poder oírse cantar.", formas: ["sirve a la congregacion", "iglesia cante", "cante mejor", "cantar mejor", "oirse cantar", "(se|nos) oiga cantar", "(iglesia|congregacion|gente|pueblo) (pueda|puede|pueden) cantar"] },
                { id: "acompanar", peso: 50, texto: "Los instrumentos acompañan sin tapar, y la voz que guía se oye clara.", formas: ["acompan*", "no tap*", "sin tapar", "voz que guia", "no es un concierto", "no es concierto", "no es como un concierto"] },
              ],
              errores: [
                { id: "concierto", texto: "En el culto, la mezcla no es un concierto.", formas: ["es un concierto", "es como un concierto"], anula: "acompanar" },
                { id: "subir", texto: "Los instrumentos deben acompañar, no tapar: la congregación tiene que poder oírse cantar.", formas: ["(los|las|te|les) (subo|subire|subimos|subiremos)", "(subirlos|subirlas|subirte|subirles) mas", "voy a subir*"], anula: "congregacion" },
              ],
              modelo: "Le explico que la mezcla sirve a la congregación: la iglesia tiene que poder oírse cantar. En el culto no es un concierto: los instrumentos acompañan sin tapar y la voz que guía se oye clara.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. Los monitores, el acople y el volumen
    "alabanza-5-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué otro nombre tiene el acople?", reverso: "Retroalimentación.", apoyo: "El acople, o retroalimentación" },
              { frente: "¿Cuándo ocurre el acople?", reverso: "Cuando un micrófono capta el sonido de un parlante o de un monitor y lo vuelve a enviar.", apoyo: "ocurre cuando un micrófono capta el sonido de un parlante o de un monitor, lo vuelve a enviar y se forma un círculo que produce un pitido o un zumbido" },
              { frente: "¿Qué produce el círculo del acople?", reverso: "Un pitido o un zumbido.", apoyo: "se forma un círculo que produce un pitido o un zumbido" },
              { frente: "Si aparece el acople, ¿qué se hace enseguida?", reverso: "Bajar el canal o el envío que lo provoca.", apoyo: "Si aparece el acople, bajar enseguida el canal o el envío que lo provoca" },
            ],
          },
          {
            tarjetas: [
              { frente: "Para evitar el acople, ¿dónde no se ponen los micrófonos?", reverso: "Frente a los parlantes, ni demasiado cerca de los monitores.", apoyo: "No poner los micrófonos frente a los parlantes ni demasiado cerca de los monitores" },
              { frente: "¿Qué se le pide a quien habla o canta, en lugar de subir mucho el volumen?", reverso: "Que se acerque al micrófono.", apoyo: "Pedir a quien habla o canta que se acerque al micrófono, en lugar de subir mucho el volumen" },
              { frente: "¿Qué se hace con los micrófonos que no se están usando?", reverso: "Se bajan o se silencian.", apoyo: "Bajar o silenciar los micrófonos que no se están usando" },
              { frente: "¿Qué se recorta con la ecualización para prevenir el acople?", reverso: "La frecuencia que se dispara.", apoyo: "recortando con la ecualización la frecuencia que se dispara" },
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
            consigna: "Ordena cómo se forma el acople, del primer paso al último.",
            pasos: [
              "Un parlante o un monitor suena cerca del micrófono",
              "El micrófono capta ese sonido",
              "Ese sonido se vuelve a enviar",
              "Se forma un círculo",
              "Se oye un pitido o un zumbido",
            ],
            apoyo: "El acople, o retroalimentación, ocurre cuando un micrófono capta el sonido de un parlante o de un monitor, lo vuelve a enviar y se forma un círculo que produce un pitido o un zumbido",
            explica: "El acople ocurre cuando un micrófono capta el sonido de un parlante o de un monitor, lo vuelve a enviar y se forma un círculo que produce un pitido o un zumbido.",
          },
          {
            consigna: "En medio de la oración se oye un chillido agudo. Ordena lo que pasó, del primer paso al último.",
            pasos: [
              "Un monitor suena demasiado fuerte en la plataforma",
              "Un micrófono capta el sonido del monitor",
              "Ese sonido vuelve a salir y el micrófono lo capta otra vez",
              "Se forma un círculo y se oye un chillido agudo",
            ],
            apoyo: "El acople nace cuando un micrófono capta el sonido de un parlante y se forma un círculo",
            explica: "Si los monitores suenan demasiado fuerte, un micrófono capta su sonido, lo vuelve a enviar y se forma un círculo: es el acople.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Ayuda contra el acople o lo favorece? Lleva cada frase a su grupo.",
            grupos: ["Ayuda contra el acople", "Favorece el acople"],
            frases: [
              { texto: "Pedir al que canta que se acerque al micrófono", grupo: 0 },
              { texto: "Silenciar los micrófonos que no se usan", grupo: 0 },
              { texto: "Recortar con la ecualización la frecuencia que se dispara", grupo: 0 },
              { texto: "Ubicar bien micrófonos y parlantes", grupo: 0 },
              { texto: "Poner un micrófono frente a un parlante", grupo: 1 },
              { texto: "Subir demasiado la ganancia", grupo: 1 },
              { texto: "Monitores que suenan demasiado fuerte", grupo: 1 },
            ],
            apoyo: "Se previene ubicando bien micrófonos y parlantes, sin subir demasiado la ganancia y recortando con la ecualización la frecuencia que se dispara",
            explica: "El acople se previene ubicando bien micrófonos y parlantes, sin subir demasiado la ganancia y recortando con la ecualización la frecuencia que se dispara; lo favorecen el micrófono frente al parlante, la ganancia muy alta y los monitores demasiado fuertes.",
          },
          {
            consigna: "¿Ayuda contra el acople o lo favorece? Lleva cada frase a su grupo.",
            grupos: ["Ayuda contra el acople", "Favorece el acople"],
            frases: [
              { texto: "Mantener los micrófonos lejos de los monitores", grupo: 0 },
              { texto: "Bajar enseguida el canal que lo provoca", grupo: 0 },
              { texto: "Pedir que se acerquen al micrófono, en vez de subir el volumen", grupo: 0 },
              { texto: "Dejar abiertos los micrófonos que nadie usa", grupo: 1 },
              { texto: "Poner el micrófono demasiado cerca del monitor", grupo: 1 },
              { texto: "Subir mucho el volumen porque el que habla está lejos", grupo: 1 },
            ],
            apoyo: "Bajar o silenciar los micrófonos que no se están usando",
            explica: "Contra el acople: micrófonos lejos de los monitores, pedir que se acerquen al micrófono, silenciar los que no se usan y, si aparece, bajar enseguida el canal que lo provoca.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "situacion",
        versiones: [
          {
            caso: "El pianista te dice: No me oigo nada en el monitor. Súbelo todo al máximo, por favor.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Le pregunto qué necesita oír y se lo preparo.", bien: true, explica: "Cada uno pide lo que necesita, y el técnico prepara esas mezclas, en su justa medida." },
              { texto: "Subo todo al máximo en su monitor, como me pidió.", explica: "Si los monitores suenan demasiado fuerte, también llegan a la sala y provocan acople." },
              { texto: "Le digo que los monitores son solo para los cantantes.", explica: "Los monitores son para que los músicos y los cantantes se oigan." },
              { texto: "Apago su monitor para que no haya ningún acople.", explica: "Los monitores sirven para que los músicos y los cantantes se oigan: se usan en su justa medida." },
            ],
            apoyo: "Los monitores ayudan a que la plataforma se oiga, en su justa medida",
            explica: "Los monitores son los parlantes que miran a la plataforma, para que los músicos y los cantantes se oigan: el técnico prepara lo que cada uno necesita, en su justa medida.",
          },
          {
            caso: "Una cantante del coro te dice: En el monitor solo oigo la batería; no oigo mi voz ni el teclado.",
            pregunta: "¿Qué haces?",
            opciones: [
              { texto: "Preparo en su monitor la mezcla que ella necesita.", bien: true, explica: "Cada uno pide lo que necesita (su voz, el teclado, el ritmo), y el técnico prepara esas mezclas." },
              { texto: "Subo toda la sala, para que ella se oiga desde allí.", explica: "Los monitores son los parlantes que miran a la plataforma, para que los músicos y los cantantes se oigan." },
              { texto: "Le digo que cante más fuerte, sin cambiar nada.", explica: "El técnico prepara las mezclas de los monitores según lo que cada uno necesita." },
              { texto: "Subo su monitor al máximo, aunque llegue a la sala.", explica: "Si los monitores suenan demasiado fuerte, también llegan a la sala y provocan acople." },
            ],
            apoyo: "Cada uno pide lo que necesita (su voz, el teclado, el ritmo), y el técnico prepara esas mezclas",
            explica: "Con los envíos, el técnico manda a cada monitor la mezcla que pide cada uno: su voz, el teclado, el ritmo.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los monitores de la plataforma: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los monitores son los parlantes que miran a la plataforma.", verdad: true, explica: "Miran a la plataforma, para que los músicos y los cantantes se oigan.", apoyo: "Los monitores son los parlantes que miran a la plataforma, para que los músicos y los cantantes se oigan" },
              { texto: "Los monitores demasiado fuertes también llegan a la sala y provocan acople.", verdad: true, explica: "Por eso los monitores se usan en su justa medida.", apoyo: "si los monitores suenan demasiado fuerte, también llegan a la sala y provocan acople" },
              { texto: "Todos los músicos necesitan oír lo mismo en su monitor.", verdad: false, explica: "Cada uno pide lo que necesita (su voz, el teclado, el ritmo), y el técnico prepara esas mezclas.", apoyo: "Cada uno pide lo que necesita (su voz, el teclado, el ritmo)" },
            ],
          },
          {
            consigna: "Sobre los monitores y sus mezclas: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Los monitores son para que la congregación oiga mejor la predicación.", verdad: false, explica: "Los monitores miran a la plataforma, para que los músicos y los cantantes se oigan.", apoyo: "Los monitores son los parlantes que miran a la plataforma" },
              { texto: "El técnico prepara las mezclas que piden los de la plataforma.", verdad: true, explica: "Cada uno pide lo que necesita, y el técnico prepara esas mezclas.", apoyo: "y el técnico prepara esas mezclas" },
              { texto: "Mientras más fuerte suenen los monitores, mejor para todos.", verdad: false, explica: "Lo justo: si los monitores suenan demasiado fuerte, también llegan a la sala y provocan acople.", apoyo: "Lo justo: si los monitores suenan demasiado fuerte, también llegan a la sala y provocan acople" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El volumen se decide mirando por lo de los otros: que nadie sufra y que la congregación pueda oírse cantar",
            ref: "Filipenses 2:4",
            titulo: "La queja del anciano",
            relato: [
              "Eres el técnico del culto del domingo. Desde hace semanas, la música suena cada vez más fuerte.",
              "Un anciano que usa audífonos te dice que sale del culto con dolor de oído, y una madre comenta que sus niños se tapan las orejas.",
              "Además, durante los cantos ya casi nadie en la sala canta.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Cómo se decide el volumen del culto?",
                opciones: [
                  { texto: "Pensando en todos los que están en la sala.", bien: true, explica: "El volumen se decide pensando en todos: «no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros»." },
                  { texto: "Según lo que piden los músicos de la plataforma.", explica: "El volumen se decide pensando en todos, no solo en los de la plataforma." },
                  { texto: "Como suene más emocionante para los jóvenes.", explica: "Hay ancianos, niños, visitas y personas con audífonos: el volumen se decide pensando en todos." },
                ],
                apoyo: "El volumen se decide pensando en todos",
                explica: "Hay ancianos, niños, visitas y personas con audífonos: el volumen se decide mirando por lo de los otros.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué te dice que casi nadie cante en la sala?",
                opciones: [
                  { texto: "Que la música está tapando a la congregación.", bien: true, explica: "Si la música tapa a la congregación, el pueblo deja de cantar." },
                  { texto: "Que la gente está cansada y hoy no tiene ganas.", explica: "El caso muestra otra cosa: si la música tapa a la congregación, el pueblo deja de cantar." },
                  { texto: "Que hay que subir más para animar a cantar.", explica: "Si la música tapa a la congregación, el pueblo deja de cantar." },
                ],
                apoyo: "si la música tapa a la congregación, el pueblo deja de cantar",
                explica: "El volumen se decide para que la congregación pueda oírse cantar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al anciano del dolor de oído?",
                opciones: [
                  { texto: "Que tiene razón: tanto volumen puede dañar el oído.", bien: true, explica: "Un volumen muy alto durante mucho tiempo puede dañar el oído." },
                  { texto: "Que se siente más atrás, lejos de los parlantes.", explica: "El volumen se decide pensando en todos: hay ancianos y personas con audífonos." },
                  { texto: "Que el volumen alto ayuda a que todos se concentren.", explica: "Un volumen muy alto durante mucho tiempo puede dañar el oído." },
                ],
                apoyo: "Un volumen muy alto durante mucho tiempo puede dañar el oído",
                explica: "El volumen se decide pensando en todos, para que nadie sufra.",
              },
              {
                tipo: "explica",
                apoyo: "El volumen se decide mirando por lo de los otros: que nadie sufra y que la congregación pueda oírse cantar",
                clave: {
                  id: "pr-alabanza-5-4-a6-1",
                  tipo: "corta",
                  pregunta: "¿Qué harás desde el próximo domingo con el volumen, y por qué?",
                  ideas: [
                    { id: "todos", peso: 50, texto: "Decidir el volumen pensando en todos, mirando por lo de los otros: ancianos, niños, visitas y personas con audífonos.", formas: ["pensando en todos", "pensar en todos", "por lo de los otros", "lo de los demas", "ancianos", "abuel*", "ninos", "visitas", "audifonos", "hermanos mayores"] },
                    { id: "cantar", peso: 50, texto: "Bajarlo, para que la música no tape a la congregación y el pueblo pueda cantar, sin dañar el oído.", formas: ["baj* volumen", "baj* (la|el) (musica|sonido)", "bajar*", "bajare", "lo bajo", "no tape", "sin tapar", "(pueda|puedan|pueden|podamos) cantar", "oirse cantar", "(oir|oirse|oiga|oigan) cantando", "mas suave", "volumen (suave|moderado|justo)", "(dane|danar|dano|dana|lastime|lastimar) (el|los|su|sus) (oido|oidos)"] },
                  ],
                  errores: [
                    { id: "subir", texto: "Si la música tapa a la congregación, el pueblo deja de cantar: el volumen se decide pensando en todos.", formas: ["sub* volumen", "mas fuerte", "mas volumen"], anula: "cantar" },
                  ],
                  modelo: "Desde el domingo decidiré el volumen pensando en todos, mirando por lo de los otros: ancianos, niños y personas con audífonos. Lo bajaré para que la música no tape a la congregación y el pueblo pueda cantar.",
                },
              },
            ],
          },
          {
            apoyo: "El volumen correcto es el que ayuda a cantar a la abuela y al joven",
            ref: "1 Corintios 13:1",
            titulo: "El culto con visitas",
            relato: [
              "Este sábado hay un culto especial con muchas visitas, niños de la escuela dominical y hermanos mayores.",
              "El director de alabanza te dice: Hoy hay que sonar con todo; sube el volumen al máximo desde el primer canto.",
              "Tú quieres decidir el volumen como enseña la lección.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué tienes en cuenta para decidir el volumen?",
                opciones: [
                  { texto: "Que hay ancianos, niños, visitas y gente con audífonos.", bien: true, explica: "Hay ancianos, niños, visitas y personas con audífonos: el volumen se decide pensando en todos." },
                  { texto: "Que el director es el que decide cuánto se sube.", explica: "El volumen se decide pensando en todos, no mirando cada uno por lo suyo propio." },
                  { texto: "Que con más volumen las visitas se van a emocionar mucho más.", explica: "El volumen se decide pensando en todos, y el ruido sin amor no edifica." },
                ],
                apoyo: "Hay ancianos, niños, visitas y personas con audífonos",
                explica: "El volumen se decide pensando en todos los que están en el culto.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le respondes al director?",
                opciones: [
                  { texto: "Que el volumen se decide mirando por lo de los otros.", bien: true, explica: "«no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros»." },
                  { texto: "Que sí, porque en un culto especial todo vale.", explica: "El volumen se decide pensando en todos, también en un culto especial." },
                  { texto: "Que mejor suba todo al máximo solo en el último canto.", explica: "Si la música tapa a la congregación, el pueblo deja de cantar, también en el último canto." },
                ],
                apoyo: "El volumen se decide pensando en todos: «no mirando cada uno por lo suyo propio, sino cada cual también por lo de los otros»",
                explica: "El volumen se decide pensando en todos, no en lo que cada uno prefiere.",
              },
              {
                tipo: "situacion",
                pregunta: "Pablo dice que sin amor somos como metal que resuena. ¿Qué enseña eso sobre el sonido del culto?",
                opciones: [
                  { texto: "Que el ruido sin amor no edifica.", bien: true, explica: "El ruido sin amor no edifica; el sonido pensado con amor por todos, sí." },
                  { texto: "Que el volumen solo depende del gusto del técnico.", explica: "El volumen se decide pensando en todos: el sonido pensado con amor por todos edifica." },
                  { texto: "Que mientras más fuerte, más se edifica la iglesia.", explica: "El ruido sin amor no edifica; el sonido pensado con amor por todos, sí." },
                ],
                apoyo: "El ruido sin amor no edifica; el sonido pensado con amor por todos, sí",
                explica: "Pablo dice que sin amor somos «como metal que resuena, o címbalo que retiñe»: el sonido se piensa con amor por todos.",
              },
              {
                tipo: "explica",
                apoyo: "El volumen correcto es el que ayuda a cantar a la abuela y al joven",
                clave: {
                  id: "pr-alabanza-5-4-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe lo que le dirás al director sobre el volumen del culto con visitas.",
                  ideas: [
                    { id: "otros", peso: 50, texto: "Que el volumen se decide pensando en todos, mirando por lo de los otros: ancianos, niños y visitas.", formas: ["pensando en todos", "pensar en todos", "por lo de los otros", "lo de los demas", "ancianos", "abuel*", "ninos", "visitas", "audifonos", "hermanos mayores"] },
                    { id: "amor", peso: 50, texto: "Que el ruido sin amor no edifica: un volumen muy alto puede dañar el oído y hacer que el pueblo deje de cantar.", formas: ["sin amor", "no edific*", "(dane|danar|dano|dana|lastime|lastimar) (el|los|su|sus) (oido|oidos)", "deja de cantar", "dej* de cantar", "no tape", "sin tapar", "(pueda|puedan|pueden|podamos) cantar", "oirse cantar"] },
                  ],
                  modelo: "Le diré que el volumen se decide pensando en todos, mirando por lo de los otros: hay ancianos, niños y visitas. El ruido sin amor no edifica, y un volumen muy alto puede dañar el oído.",
                },
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
            apoyo: "Se previene ubicando bien micrófonos y parlantes, sin subir demasiado la ganancia y recortando con la ecualización la frecuencia que se dispara",
            clave: {
              id: "pr-alabanza-5-4-a7-1",
              tipo: "corta",
              pregunta: "En medio de la oración se oye un chillido agudo. ¿Qué está pasando, y qué harás para que no vuelva a pasar?",
              ideas: [
                { id: "circulo", peso: 40, texto: "Es el acople: un micrófono capta el sonido de un parlante o de un monitor, lo vuelve a enviar y se forma un círculo.", formas: ["acople", "retroaliment*", "capta el sonido", "capta su sonido", "circulo", "vuelve a enviar", "lo vuelve a (enviar|mandar|sacar)"] },
                { id: "prevenir", peso: 60, texto: "Ubicar bien micrófonos, parlantes y monitores, no subir demasiado la ganancia, recortar con la ecualización la frecuencia que se dispara y silenciar los micrófonos que no se usan.", formas: ["ubic* bien", "lejos de (los|el|las)", "no (poner|pongo|pondre|ponga|ponerlos) (el|los) microfono*", "no (subir|subo|subire|suba) demasiado", "no (subir|subo|subire|suba) mucho", "sin subir", "baj* ganancia", "cuid* ganancia", "ecualiz*", "recort*", "frecuencia", "acerque*", "acerc*", "silenci*", "baj* canal", "baj* envio"] },
              ],
              errores: [
                { id: "subir", texto: "Subir la ganancia no evita el acople: se previene sin subir demasiado la ganancia.", formas: ["subir* la ganancia", "subo la ganancia", "subire la ganancia", "mas ganancia"], anula: "prevenir" },
              ],
              modelo: "Es el acople: un micrófono capta el sonido de un parlante o de un monitor, lo vuelve a enviar y se forma un círculo. Para prevenirlo ubicaré bien los micrófonos, lejos de los parlantes, y no subiré demasiado la ganancia.",
            },
          },
          {
            apoyo: "Si aparece el acople, bajar enseguida el canal o el envío que lo provoca",
            clave: {
              id: "pr-alabanza-5-4-a7-2",
              tipo: "corta",
              pregunta: "Un joven que empieza en el sonido te pregunta qué hacer si aparece un pitido en pleno culto, y cómo evitarlo la próxima vez. ¿Qué le explicas?",
              ideas: [
                { id: "bajar", peso: 50, texto: "Si aparece el acople, bajar enseguida el canal o el envío que lo provoca.", formas: ["baj* enseguida", "baj* canal", "baj* envio", "baj* rapido", "baj* inmediato", "silenci* canal"] },
                { id: "evitar", peso: 50, texto: "Ubicar los micrófonos lejos de los parlantes y de los monitores, pedir que se acerquen al micrófono y silenciar los que no se usan.", formas: ["lejos de (los|el|las)", "ubic* bien", "no (subir|subo|subire|suba) demasiado", "no (subir|subo|subire|suba) mucho", "sin subir", "ecualiz*", "recort*", "acerque*", "acerc*", "silenci* microfono*", "que no se (usan|usen|estan)", "baj* ganancia", "cuid* ganancia"] },
              ],
              errores: [
                { id: "subir", texto: "Subir la ganancia no evita el acople: se previene sin subir demasiado la ganancia.", formas: ["subir* la ganancia", "subo la ganancia", "subire la ganancia", "mas ganancia"], anula: "evitar" },
              ],
              modelo: "Le explico que si aparece el acople hay que bajar enseguida el canal o el envío que lo provoca. Para evitarlo, se ubican los micrófonos lejos de los parlantes y de los monitores, y se silencian los que no se usan.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La proyección, la transmisión y los derechos de autor
    "alabanza-5-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué le dijo Dios a Habacuc que hiciera con la visión?", reverso: "Que la escribiera y la declarara en tablas, para que corra el que la lee.", apoyo: "Dios le dijo a Habacuc: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella»" },
              { frente: "¿Cuántas líneas conviene poner en cada pantalla?", reverso: "Pocas, y sin faltas de ortografía.", apoyo: "Pocas líneas por pantalla y sin faltas de ortografía" },
              { frente: "¿Cómo debe ser la letra en la pantalla?", reverso: "Grande, clara y con buen contraste con el fondo.", apoyo: "Letra grande, clara y con buen contraste con el fondo" },
              { frente: "¿Cuándo se cambia la diapositiva?", reverso: "Un poco antes de que se cante la línea.", apoyo: "Cambiar la diapositiva un poco antes de que se cante la línea" },
            ],
          },
          {
            tarjetas: [
              { frente: "Antes del culto, ¿qué hay que revisar en lo que se va a proyectar?", reverso: "Los textos bíblicos y las letras.", apoyo: "Revisar los textos bíblicos y las letras antes del culto" },
              { frente: "¿Qué incluye hoy también el ministerio técnico?", reverso: "Las pantallas y las transmisiones.", apoyo: "Hoy el ministerio técnico también incluye las pantallas y las transmisiones" },
              { frente: "Ahora que más gente puede seguir el culto, ¿qué trae eso para el técnico?", reverso: "Nuevas responsabilidades.", apoyo: "más gente puede seguir el culto, y eso trae nuevas responsabilidades" },
              { frente: "¿Cómo tiene que leerse lo que se proyecta?", reverso: "Fácil y a tiempo.", apoyo: "Lo que se proyecta tiene que leerse fácil y a tiempo" },
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
            consigna: "¿Es una proyección clara o una que estorba? Lleva cada frase a su grupo.",
            grupos: ["Proyección clara", "Proyección que estorba"],
            frases: [
              { texto: "Letra grande sobre un fondo con buen contraste", grupo: 0 },
              { texto: "Pocas líneas en cada pantalla", grupo: 0 },
              { texto: "La diapositiva cambia un poco antes de cantar la línea", grupo: 0 },
              { texto: "Letra pequeña sobre un fondo de colores parecidos", grupo: 1 },
              { texto: "Diez líneas apretadas en una sola pantalla", grupo: 1 },
              { texto: "La diapositiva cambia cuando ya se cantó la línea", grupo: 1 },
            ],
            apoyo: "Lo que se proyecta se escribe claro, como en tablas, para que corra el que lee: letra grande, pocas líneas, sin faltas y a tiempo",
            explica: "Lo que se proyecta tiene que leerse fácil y a tiempo: letra grande, clara y con buen contraste, pocas líneas por pantalla y la diapositiva un poco antes de que se cante la línea.",
          },
          {
            consigna: "¿Es una proyección clara o una que estorba? Lleva cada frase a su grupo.",
            grupos: ["Proyección clara", "Proyección que estorba"],
            frases: [
              { texto: "Letras revisadas antes del culto, sin faltas", grupo: 0 },
              { texto: "Un texto bíblico revisado antes de proyectarlo", grupo: 0 },
              { texto: "Una letra grande y clara", grupo: 0 },
              { texto: "Una letra con faltas de ortografía", grupo: 1 },
              { texto: "Un canto que se proyecta sin revisarlo antes", grupo: 1 },
              { texto: "Un fondo que no deja ver bien la letra", grupo: 1 },
            ],
            apoyo: "Revisar los textos bíblicos y las letras antes del culto",
            explica: "Los textos bíblicos y las letras se revisan antes del culto, sin faltas de ortografía, con letra grande, clara y con buen contraste con el fondo.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Dios le dijo a Habacuc qué hacer con la visión. ¿Dónde debía declararla? Toca las palabras que lo dicen.",
            texto: "Escribe la visión, y declárala [[en tablas]], para que corra el que leyere en ella",
            apoyo: "Lo que se proyecta tiene que leerse fácil y a tiempo",
            ref: "Habacuc 2:2",
            explica: "Dios le dijo a Habacuc: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella». Lo que se proyecta tiene que leerse fácil y a tiempo.",
          },
          {
            consigna: "¿Para qué debía Habacuc declarar la visión en tablas? Toca las palabras que lo dicen.",
            texto: "Escribe la visión, y declárala en tablas, para que [[corra el que leyere en ella]]",
            apoyo: "Lo que se proyecta se escribe claro, como en tablas, para que corra el que lee",
            ref: "Habacuc 2:2",
            explica: "La visión se declaraba en tablas para que corriera el que la leyera: lo que se proyecta se escribe claro, para que se lea fácil y a tiempo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Probar la conexión, el audio y la cámara antes de empezar",
            situacion: "Eres el encargado de la transmisión en vivo del culto del domingo por internet.",
            escenas: [
              {
                id: "e1",
                narra: "Faltan veinte minutos para empezar.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Pruebas la conexión, el audio y la cámara.", valor: 2, explica: "Hay que probar la conexión, el audio y la cámara antes de empezar.", siguiente: "e2" },
                  { texto: "Esperas a que empiece el culto para conectar todo.", valor: 0, explica: "La conexión, el audio y la cámara se prueban antes de empezar.", siguiente: "e1b" },
                  { texto: "Pruebas solo la cámara, porque el audio siempre anda.", valor: 1, explica: "Probar la cámara ayuda, pero también se prueban la conexión y el audio antes de empezar.", siguiente: "e2" },
                ],
              },
              {
                id: "e1b",
                narra: "El culto empieza y la transmisión sale sin sonido durante los primeros cantos.",
                pregunta: "¿Qué aprendes para la próxima vez?",
                opciones: [
                  { texto: "Probar todo antes de empezar.", valor: 2, explica: "Hay que probar la conexión, el audio y la cámara antes de empezar.", siguiente: "e2" },
                  { texto: "Que el sonido de la transmisión no es tan importante.", valor: 0, explica: "Hoy el ministerio técnico también incluye las transmisiones: se prueban la conexión, el audio y la cámara antes de empezar.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Al comenzar, el pastor da la bienvenida.",
                pregunta: "¿Qué cuidas en ese momento?",
                opciones: [
                  { texto: "Que se avise que el culto se transmite.", valor: 2, explica: "Hay que avisar que el culto se transmite." },
                  { texto: "Nada: es mejor que nadie sepa que hay cámaras.", valor: 0, explica: "Hay que avisar que el culto se transmite." },
                  { texto: "Que la cámara muestre de cerca a cada familia.", valor: 0, explica: "No se muestra a niños ni a personas que no lo autorizaron." },
                ],
              },
              {
                id: "e3",
                narra: "Pasan al frente los niños para cantar, y después se ora por una hermana que contó una situación privada.",
                pregunta: "¿Qué haces con la cámara?",
                opciones: [
                  { texto: "No muestras a los niños ni esa oración.", valor: 2, explica: "No se muestra a niños ni a personas que no lo autorizaron, y se cuidan los momentos de oración por personas y situaciones privadas." },
                  { texto: "Los muestras de cerca: es lo más bonito del culto.", valor: 0, explica: "No se muestra a niños ni a personas que no lo autorizaron, y se cuidan los momentos de oración por personas y situaciones privadas." },
                  { texto: "Sigues transmitiendo todo igual, sin pensarlo.", valor: 0, explica: "No se muestra a niños ni a personas que no lo autorizaron, y se cuidan los momentos de oración por personas y situaciones privadas." },
                ],
              },
            ],
          },
          {
            apoyo: "Recordar que la transmisión no reemplaza la comunión de la iglesia reunida",
            situacion: "Tu iglesia empieza a transmitir sus cultos, y te piden organizar el equipo de la transmisión.",
            escenas: [
              {
                id: "e1",
                narra: "Antes del primer culto transmitido, el pastor te pregunta qué deben saber los hermanos.",
                pregunta: "¿Qué propones?",
                opciones: [
                  { texto: "Avisar a la iglesia que el culto se transmite.", valor: 2, explica: "Hay que avisar que el culto se transmite." },
                  { texto: "No decir nada, para que todos se porten con naturalidad.", valor: 0, explica: "Hay que avisar que el culto se transmite." },
                  { texto: "Transmitir sin avisar y explicarlo después si alguien pregunta.", valor: 0, explica: "Hay que avisar que el culto se transmite." },
                ],
              },
              {
                id: "e2",
                narra: "Una madre te pide que su hijo no aparezca en la transmisión.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Cuidas que la cámara no lo muestre.", valor: 2, explica: "No se muestra a niños ni a personas que no lo autorizaron." },
                  { texto: "Le dices que en la iglesia todos salen en la cámara.", valor: 0, explica: "No se muestra a niños ni a personas que no lo autorizaron." },
                  { texto: "Lo muestras solo de lejos, para que no se note mucho.", valor: 0, explica: "No se muestra a niños ni a personas que no lo autorizaron." },
                ],
              },
              {
                id: "e3",
                narra: "Un hermano te dice: Ya no voy a ir a los cultos; los veo desde mi casa por la transmisión.",
                pregunta: "¿Qué le recuerdas?",
                opciones: [
                  { texto: "Que la transmisión no reemplaza a la iglesia reunida.", valor: 2, explica: "La transmisión no reemplaza la comunión de la iglesia reunida." },
                  { texto: "Que está bien: verla en casa es igual que estar en el culto.", valor: 0, explica: "La transmisión no reemplaza la comunión de la iglesia reunida." },
                  { texto: "Que la transmisión es solo para los que no son de la iglesia.", valor: 0, explica: "Más gente puede seguir el culto, pero la transmisión no reemplaza la comunión de la iglesia reunida." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre los derechos de autor de los cantos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias.", verdad: true, explica: "Por eso cada iglesia debe informarse y tener los permisos que le correspondan.", apoyo: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias", ref: "Romanos 13:7" },
              { texto: "Como los cantos son para adorar, no tienen autores a quienes honrar.", verdad: false, explica: "Los cantos tienen autores, y respetar sus derechos es honrar el trabajo de los hermanos que los escriben.", apoyo: "Los cantos tienen autores" },
              { texto: "Existen licencias para iglesias, como las de CCLI.", verdad: true, explica: "Así lo dice la lección; cada iglesia debe informarse y tener los permisos que le correspondan.", apoyo: "Existen licencias para iglesias, como las de CCLI" },
            ],
          },
          {
            consigna: "Sobre la integridad con los cantos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Cada iglesia debe informarse y tener los permisos que le correspondan.", verdad: true, explica: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias.", apoyo: "cada iglesia debe informarse y tener los permisos que le correspondan" },
              { texto: "Respetar los derechos de autor no tiene que ver con el testimonio de la iglesia.", verdad: false, explica: "Respetar los derechos de autor es también dar buen testimonio de integridad.", apoyo: "Respetar los derechos de autor es honrar el trabajo de los hermanos que escriben los cantos que nos ayudan a adorar, y dar buen testimonio de integridad" },
              { texto: "En la iglesia, cualquier canto se puede grabar y transmitir sin pensar en permisos.", verdad: false, explica: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias.", apoyo: "Y como hay que pagar a todos lo que se debe, la iglesia respeta los derechos de autor y tiene sus licencias", ref: "Romanos 13:7" },
            ],
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "El encargado de multimedia te dice: No hace falta pedir permisos para los cantos; total, los usamos para adorar a Dios.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la iglesia debe informarse y tener sus permisos.", bien: true, explica: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias: cada iglesia debe informarse y tener los permisos que le correspondan." },
              { texto: "Que tiene razón: lo que es para Dios no necesita permiso.", explica: "La Biblia manda: «Pagad a todos lo que debéis»; respetar los derechos de autor es honrar el trabajo de los que escriben los cantos." },
              { texto: "Que deje de proyectar letras, para no tener problemas.", explica: "La lección no pide dejar de proyectar: pide informarse y tener los permisos que correspondan." },
              { texto: "Que los permisos son un asunto solo del autor del canto.", explica: "Cada iglesia debe informarse y tener los permisos que le correspondan." },
            ],
            apoyo: "cada iglesia debe informarse y tener los permisos que le correspondan",
            ref: "Romanos 13:7",
            explica: "Como hay que pagar a todos lo que se debe, la iglesia respeta los derechos de autor y tiene sus licencias.",
          },
          {
            caso: "Un músico de tu iglesia te dice: ¿Para qué respetar los derechos de autor, si los hermanos que escriben cantos lo hacen para el Señor?",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que respetarlos es honrar el trabajo de esos hermanos.", bien: true, explica: "Respetar los derechos de autor es honrar el trabajo de los hermanos que escriben los cantos que nos ayudan a adorar." },
              { texto: "Que tiene razón, y que todo se puede usar como queramos.", explica: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias." },
              { texto: "Que eso solo importa en los conciertos, no en la iglesia.", explica: "Proyectar letras, grabar o transmitir cantos puede requerir permisos o licencias, también en la iglesia." },
              { texto: "Que respetarlos no tiene nada que ver con la integridad.", explica: "Respetar los derechos de autor es también dar buen testimonio de integridad." },
            ],
            apoyo: "Respetar los derechos de autor es honrar el trabajo de los hermanos que escriben los cantos que nos ayudan a adorar, y dar buen testimonio de integridad",
            ref: "Romanos 13:7",
            explica: "Los cantos tienen autores, y la Biblia manda pagar a todos lo que se debe: al que honra, honra.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La transmisión se avisa, cuida la privacidad de los niños y de quienes no lo autorizaron, y no reemplaza a la iglesia reunida",
            clave: {
              id: "pr-alabanza-5-5-a7-1",
              tipo: "corta",
              pregunta: "Tu iglesia va a transmitir el culto por primera vez. ¿Qué cuidados vas a tener?",
              ideas: [
                { id: "avisar", peso: 34, texto: "Avisar que el culto se transmite y probar la conexión, el audio y la cámara antes de empezar.", formas: ["avis*", "prob* conexion", "prob* audio", "prob* camara", "prob* todo", "antes de empezar"] },
                { id: "privacidad", peso: 33, texto: "No mostrar a niños ni a personas que no lo autorizaron, y cuidar la oración por situaciones privadas.", formas: ["no mostr* ninos", "sin mostr* ninos", "evit* mostr*", "no enfoc* ninos", "no grab* ninos", "no film* ninos", "no quier* salir", "no quier* aparecer", "cuid* ninos", "proteg* ninos", "privad*", "privacidad", "autoriz*", "sin permiso", "sin su permiso", "cuid* momentos"] },
                { id: "reunida", peso: 33, texto: "Recordar que la transmisión no reemplaza la comunión de la iglesia reunida.", formas: ["no reemplaza", "no sustituye", "nada sustituye", "nada reemplaza", "iglesia reunida", "comunion", "reunirse", "congregarse"] },
              ],
              errores: [
                { id: "reemplaza", texto: "La transmisión no reemplaza la comunión de la iglesia reunida.", formas: ["transmision reemplaza", "reemplaza iglesia", "es igual que ir", "es lo mismo que ir", "ya no hace falta ir"], anula: "reunida" },
              ],
              modelo: "Voy a avisar que el culto se transmite y probaré la conexión, el audio y la cámara antes de empezar. No mostraré a los niños ni a quienes no lo autorizaron, y recordaré que la transmisión no reemplaza a la iglesia reunida.",
            },
          },
          {
            apoyo: "No mostrar a niños ni a personas que no lo autorizaron, y cuidar los momentos de oración por personas y situaciones privadas",
            clave: {
              id: "pr-alabanza-5-5-a7-2",
              tipo: "corta",
              pregunta: "Un hermano propone transmitir el culto tal como pasa, sin avisar a nadie y mostrando a todos, también a los niños. ¿Qué cuidados le explicas?",
              ideas: [
                { id: "avisar", peso: 50, texto: "Hay que avisar que el culto se transmite.", formas: ["avis*"] },
                { id: "privacidad", peso: 50, texto: "No se muestra a niños ni a personas que no lo autorizaron, y se cuidan los momentos de oración privados.", formas: ["no mostr* ninos", "sin mostr* ninos", "evit* mostr*", "no enfoc* ninos", "no grab* ninos", "no film* ninos", "no quier* salir", "no quier* aparecer", "cuid* ninos", "proteg* ninos", "privad*", "privacidad", "autoriz*", "sin permiso", "sin su permiso", "cuid* momentos"] },
              ],
              modelo: "Le explico que hay que avisar que el culto se transmite. No se muestra a los niños ni a las personas que no lo autorizaron, y se cuidan los momentos de oración por situaciones privadas.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La seguridad, el cuidado del equipo y el trabajo en equipo
    "alabanza-5-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué vale más: el equipo o las personas que lo usan?", reverso: "Las personas: son más valiosas que el equipo.", apoyo: "las personas que lo usan son más valiosas que el equipo" },
              { frente: "¿Para qué se ordenan y aseguran los cables?", reverso: "Para que nadie tropiece.", apoyo: "Cables ordenados y asegurados, para que nadie tropiece" },
              { frente: "¿Qué se mantiene lejos de la consola?", reverso: "El agua y las bebidas.", apoyo: "Mantener el agua y las bebidas lejos de la consola" },
              { frente: "¿Qué hay que saber dónde está?", reverso: "Los interruptores y la salida de emergencia.", apoyo: "Saber dónde están los interruptores y la salida de emergencia" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué es el equipo de sonido para la iglesia?", reverso: "Una ofrenda de la iglesia.", apoyo: "El equipo de sonido es una ofrenda de la iglesia" },
              { frente: "¿Qué no se hace con los enchufes y las extensiones?", reverso: "Sobrecargar los enchufes o usar extensiones dañadas.", apoyo: "No sobrecargar los enchufes ni usar extensiones dañadas" },
              { frente: "Al encender el equipo, ¿cuándo se encienden los parlantes?", reverso: "Al final, después del resto.", apoyo: "los parlantes se encienden al final y se apagan primero" },
              { frente: "Y al apagar el equipo, ¿cuándo se apagan los parlantes?", reverso: "Primero, antes del resto.", apoyo: "Encender el equipo en orden y apagarlo al revés: los parlantes se encienden al final y se apagan primero" },
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
            consigna: "¿Es una práctica segura o un peligro? Lleva cada frase a su grupo.",
            grupos: ["Es una práctica segura", "Es un peligro"],
            frases: [
              { texto: "Cables ordenados y asegurados en el piso", grupo: 0 },
              { texto: "El agua lejos de la consola", grupo: 0 },
              { texto: "Saber dónde está la salida de emergencia", grupo: 0 },
              { texto: "Un cable suelto donde pasa la gente", grupo: 1 },
              { texto: "Una extensión dañada que todavía se usa", grupo: 1 },
              { texto: "Muchos aparatos en un mismo enchufe", grupo: 1 },
              { texto: "Un vaso de café junto a la consola", grupo: 1 },
            ],
            apoyo: "Cables ordenados y asegurados, para que nadie tropiece",
            explica: "La seguridad va primero: cables ordenados y asegurados, enchufes sin sobrecargar y sin extensiones dañadas, el agua y las bebidas lejos de la consola y saber dónde está la salida de emergencia.",
          },
          {
            consigna: "¿Es una práctica segura o un peligro? Lleva cada frase a su grupo.",
            grupos: ["Es una práctica segura", "Es un peligro"],
            frases: [
              { texto: "Saber dónde están los interruptores", grupo: 0 },
              { texto: "Encender los parlantes al final", grupo: 0 },
              { texto: "Usar los enchufes sin sobrecargarlos", grupo: 0 },
              { texto: "Encender los parlantes antes que el resto", grupo: 1 },
              { texto: "Dejar las bebidas sobre la mesa de la consola", grupo: 1 },
              { texto: "Cables cruzados en el pasillo, sin asegurar", grupo: 1 },
            ],
            apoyo: "Las personas valen más que el equipo, por eso la seguridad va primero",
            explica: "Las personas valen más que el equipo: se saben los interruptores, los parlantes se encienden al final, los enchufes no se sobrecargan, las bebidas van lejos de la consola y los cables se aseguran.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "ordena",
        versiones: [
          {
            consigna: "Ordena cómo se enciende y se apaga el equipo de sonido, del primer paso al último.",
            pasos: [
              "Encender el resto del equipo, en orden",
              "Encender los parlantes al final",
              "Al terminar, apagar primero los parlantes",
              "Apagar después el resto del equipo",
            ],
            apoyo: "Encender el equipo en orden y apagarlo al revés: los parlantes se encienden al final y se apagan primero",
            explica: "El equipo se enciende en orden y se apaga al revés: los parlantes se encienden al final y se apagan primero.",
          },
          {
            consigna: "Llegas el domingo a preparar el sonido. Ordena lo que haces, del primer paso al último.",
            pasos: [
              "Llegar temprano para la prueba de sonido",
              "Encender el equipo, con los parlantes al final",
              "Al terminar el culto, apagar primero los parlantes",
              "Guardar los cables enrollados, sin torcerlos",
            ],
            apoyo: "la seguridad va primero: cables ordenados, enchufes sin sobrecargar y el encendido en orden",
            explica: "Se llega temprano para la prueba de sonido, se enciende el equipo en orden, con los parlantes al final; al terminar se apagan primero los parlantes, y los cables se guardan enrollados, sin torcerlos.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa dónde se ve la fidelidad del técnico.",
            texto: "La [[fidelidad]] se ve en lo [[pequeño]]: un cable bien [[guardado]], una pila cambiada a tiempo.",
            distractores: ["rapidez", "grande", "tirado"],
            errores: {
              rapidez: "Lo que se ve en lo pequeño es la fidelidad: «El que es fiel en lo muy poco, también en lo más es fiel».",
              grande: "La fidelidad se ve en lo pequeño, en lo muy poco.",
              tirado: "La lección pone el ejemplo de un cable bien guardado.",
            },
            apoyo: "La fidelidad se ve en lo pequeño: un cable bien guardado, una pila cambiada a tiempo",
            ref: "Lucas 16:10",
            explica: "Jesús enseñó: «El que es fiel en lo muy poco, también en lo más es fiel». La fidelidad se ve en lo pequeño: un cable bien guardado, una pila cambiada a tiempo.",
          },
          {
            consigna: "Completa cómo cuida el técnico su equipo.",
            texto: "Como el pastor sabio con sus ovejas, el técnico conoce el [[estado]] de su equipo: [[limpia]], [[revisa]] y lleva un inventario.",
            distractores: ["precio", "ensucia", "esconde"],
            errores: {
              precio: "El técnico conoce el estado de su equipo, como el pastor sabio sabe cómo están sus animales.",
              ensucia: "El técnico limpia y revisa su equipo.",
              esconde: "El técnico revisa su equipo y lleva un inventario.",
            },
            apoyo: "Del mismo modo, el técnico conoce el estado de su equipo: guarda los cables enrollados sin torcerlos, limpia, revisa y lleva un inventario",
            ref: "Proverbios 27:23",
            explica: "Como el pastor sabio conoce el estado de sus ovejas, el técnico conoce el estado de su equipo: guarda los cables enrollados sin torcerlos, limpia, revisa y lleva un inventario.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Técnicos y músicos son un solo equipo: llegan temprano, se ponen de acuerdo en las señales, oran juntos y forman a otros",
            ref: "1 Corintios 14:40",
            titulo: "La prueba de sonido del domingo",
            relato: [
              "Eres el técnico de sonido. El director de alabanza llega diez minutos antes del culto, cuando ya no hay tiempo para la prueba de sonido.",
              "Durante el primer canto te hace gestos con la mano que no entiendes, y al final te grita delante de todos que el sonido estuvo mal.",
              "Quieres hablar con él esta semana para que trabajen como un solo equipo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué le propones para el próximo domingo?",
                opciones: [
                  { texto: "Llegar todos temprano para la prueba de sonido.", bien: true, explica: "Técnicos y músicos llegan temprano para la prueba de sonido." },
                  { texto: "Hacer la prueba durante el primer canto, para ganar tiempo.", explica: "La prueba de sonido se hace antes del culto: hay que llegar temprano." },
                  { texto: "Que él llegue cuando quiera, y tú lo arreglas en el culto.", explica: "Técnicos y músicos son un solo equipo: llegan temprano para la prueba de sonido." },
                ],
                apoyo: "Llegar temprano para la prueba de sonido",
                explica: "Técnicos y músicos son un solo equipo: llegan temprano para la prueba de sonido.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué hacen con los gestos que no entendiste?",
                opciones: [
                  { texto: "Se ponen de acuerdo en las señales antes del culto.", bien: true, explica: "Hay que ponerse de acuerdo con el director en las señales: más volumen, menos, repetir o terminar." },
                  { texto: "Tú tratas de adivinar lo que quiere decir con cada gesto.", explica: "Lo que ayuda es ponerse de acuerdo antes en las señales." },
                  { texto: "Él te manda mensajes al teléfono durante los cantos.", explica: "Lo que ayuda es ponerse de acuerdo antes en las señales: más volumen, menos, repetir o terminar." },
                ],
                apoyo: "Ponerse de acuerdo con el director en las señales: más volumen, menos, repetir o terminar",
                explica: "Las señales se acuerdan antes del culto: más volumen, menos, repetir o terminar.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué le dices sobre el grito delante de todos?",
                opciones: [
                  { texto: "Que se pidan las cosas con amabilidad, nunca con gritos.", bien: true, explica: "Hay que pedir y dar indicaciones con amabilidad, nunca con gritos ni gestos de enojo." },
                  { texto: "Que tú también le vas a gritar la próxima vez que se equivoque.", explica: "Las indicaciones se piden y se dan con amabilidad, nunca con gritos ni gestos de enojo." },
                  { texto: "Nada: es mejor callarte y dejar de servir en el sonido.", explica: "Un equipo técnico ordenado, que se comunica bien, sirve con paz." },
                ],
                apoyo: "Pedir y dar indicaciones con amabilidad, nunca con gritos ni gestos de enojo",
                explica: "Un equipo técnico ordenado, que se comunica bien, sirve con paz.",
              },
              {
                tipo: "explica",
                apoyo: "Técnicos y músicos son un solo equipo: llegan temprano, se ponen de acuerdo en las señales, oran juntos y forman a otros",
                clave: {
                  id: "pr-alabanza-5-6-a5-1",
                  tipo: "corta",
                  pregunta: "Además de las señales y de llegar temprano, ¿qué otras dos cosas enseña la lección para que técnicos y músicos sean un solo equipo?",
                  ideas: [
                    { id: "orar", peso: 50, texto: "Orar juntos antes del culto, porque técnicos y músicos sirven al mismo Señor.", formas: ["(orar|oremos|oraremos|oramos|ore|oren|orando|oracion) juntos", "(orar|oremos|oraremos|oramos|ore|oren|orando) antes", "juntos (orar|oremos|oraremos|oramos|ore|oren)", "mismo senor"] },
                    { id: "formar", peso: 50, texto: "Formar a nuevos técnicos, para que el servicio no dependa de una sola persona.", formas: ["form* nuevos", "nuevos tecnicos", "form* otros", "ensen* otros", "ensen* nuevos", "no dependa"] },
                  ],
                  modelo: "Le propondría orar juntos antes del culto, porque técnicos y músicos sirven al mismo Señor. Y formar a nuevos técnicos, para que el servicio no dependa de una sola persona.",
                },
              },
            ],
          },
          {
            apoyo: "Formar a nuevos técnicos, para que el servicio no dependa de una sola persona",
            ref: "1 Corintios 14:40",
            titulo: "Un solo técnico para todo",
            relato: [
              "En tu iglesia, solo un hermano sabe manejar la consola. Este mes se enfermó, y nadie supo encender el equipo para el culto.",
              "Además, los músicos y los técnicos casi no se hablan: cada grupo llega por su lado y nunca oran juntos.",
              "El pastor te pide que ayudes a que todos sirvan como un solo equipo.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué propones para que no vuelva a pasar lo de la consola?",
                opciones: [
                  { texto: "Formar a nuevos técnicos para el sonido.", bien: true, explica: "Hay que formar a nuevos técnicos, para que el servicio no dependa de una sola persona." },
                  { texto: "Esperar a que el hermano se recupere y vuelva.", explica: "El servicio no debe depender de una sola persona: hay que formar a nuevos técnicos." },
                  { texto: "Dejar el sonido apagado hasta que él regrese.", explica: "El servicio no debe depender de una sola persona: hay que formar a nuevos técnicos." },
                ],
                apoyo: "Formar a nuevos técnicos, para que el servicio no dependa de una sola persona",
                explica: "Así el servicio no depende de una sola persona.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué propones para unir a músicos y técnicos antes del culto?",
                opciones: [
                  { texto: "Orar juntos, porque sirven al mismo Señor.", bien: true, explica: "Técnicos y músicos oran juntos antes del culto: sirven al mismo Señor." },
                  { texto: "Que cada grupo ore aparte, en su propio lugar.", explica: "Lo que enseña la lección es orar juntos antes del culto: técnicos y músicos sirven al mismo Señor." },
                  { texto: "Que los técnicos no oren, para no perder tiempo.", explica: "Técnicos y músicos oran juntos antes del culto." },
                ],
                apoyo: "Orar juntos antes del culto: técnicos y músicos sirven al mismo Señor",
                explica: "Técnicos y músicos son un solo equipo: oran juntos antes del culto.",
              },
              {
                tipo: "situacion",
                pregunta: "Pablo da una regla para el culto. ¿Cómo se aplica detrás de la consola?",
                opciones: [
                  { texto: "Todo se hace decentemente y con orden.", bien: true, explica: "La regla del culto vale también detrás de la consola: «hágase todo decentemente y con orden»." },
                  { texto: "Detrás de la consola cada uno hace lo que quiere.", explica: "La regla del culto vale también detrás de la consola: «hágase todo decentemente y con orden»." },
                  { texto: "El orden solo importa en la plataforma, no en la consola.", explica: "La regla del culto vale también detrás de la consola: «hágase todo decentemente y con orden»." },
                ],
                apoyo: "La regla del culto vale también detrás de la consola: «hágase todo decentemente y con orden»",
                explica: "Un equipo técnico ordenado, que se comunica bien, sirve con paz.",
              },
              {
                tipo: "explica",
                apoyo: "Técnicos y músicos son un solo equipo: llegan temprano, se ponen de acuerdo en las señales, oran juntos y forman a otros",
                clave: {
                  id: "pr-alabanza-5-6-a5-2",
                  tipo: "corta",
                  pregunta: "¿Qué le dirás al pastor que harán para que técnicos y músicos sirvan como un solo equipo?",
                  ideas: [
                    { id: "formar", peso: 34, texto: "Formar a nuevos técnicos, para que el servicio no dependa de una sola persona.", formas: ["form* nuevos", "nuevos tecnicos", "form* otros", "ensen* otros", "ensen* nuevos", "no dependa"] },
                    { id: "orar", peso: 33, texto: "Orar juntos antes del culto, porque sirven al mismo Señor.", formas: ["(orar|oremos|oraremos|oramos|ore|oren|orando|oracion) juntos", "(orar|oremos|oraremos|oramos|ore|oren|orando) antes", "juntos (orar|oremos|oraremos|oramos|ore|oren)", "mismo senor"] },
                    { id: "senales", peso: 33, texto: "Llegar temprano para la prueba y ponerse de acuerdo en las señales, con amabilidad.", formas: ["senal*", "temprano", "prueba de sonido", "amabilidad", "amable*", "de acuerdo", "sin gritos", "comunic*"] },
                  ],
                  modelo: "Le diré que formaremos a nuevos técnicos, para que el servicio no dependa de una sola persona. Oraremos juntos antes del culto, porque servimos al mismo Señor, y nos pondremos de acuerdo en las señales.",
                },
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
            consigna: "Una de estas frases sobre el trabajo en equipo tiene un error. Tócala.",
            frases: [
              "Técnicos y músicos llegan temprano para la prueba de sonido.",
              "Se ponen de acuerdo en las señales: más volumen, menos, repetir o terminar.",
              "Si algo sale mal, está bien dar indicaciones con gestos de enojo.",
              "Antes del culto oran juntos, porque sirven al mismo Señor.",
            ],
            malo: 2,
            correccion: "Las indicaciones se piden y se dan con amabilidad, nunca con gritos ni gestos de enojo.",
            apoyo: "Pedir y dar indicaciones con amabilidad, nunca con gritos ni gestos de enojo",
            explica: "Técnicos y músicos son un solo equipo: se comunican con amabilidad, nunca con gritos ni gestos de enojo.",
          },
          {
            consigna: "Una de estas frases sobre el equipo técnico tiene un error. Tócala.",
            frases: [
              "Un equipo técnico ordenado, que se comunica bien, sirve con paz.",
              "Lo mejor es que el sonido dependa siempre de una sola persona.",
              "La regla de hacerlo todo con orden vale también detrás de la consola.",
              "Los técnicos forman a otros para el servicio.",
            ],
            malo: 1,
            correccion: "Se forma a nuevos técnicos, para que el servicio no dependa de una sola persona.",
            apoyo: "Formar a nuevos técnicos, para que el servicio no dependa de una sola persona",
            explica: "Técnicos y músicos forman a otros, para que el servicio no dependa de una sola persona.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "El equipo se cuida como mayordomía, conociendo su estado como el pastor conoce sus ovejas, con fidelidad en lo poco",
            ref: "Proverbios 27:23",
            clave: {
              id: "pr-alabanza-5-6-a7-1",
              tipo: "corta",
              pregunta: "¿Por qué cuidar el equipo de sonido es mayordomía, y cómo lo cuida el técnico?",
              ideas: [
                { id: "ovejas", peso: 40, texto: "Como el pastor sabio conoce el estado de sus ovejas, el técnico conoce el estado de su equipo, que es una ofrenda de la iglesia.", formas: ["estado equipo", "estado ovejas", "sus ovejas", "rebanos", "pastor sabio", "es una ofrenda", "ofrenda de la iglesia", "es de dios"] },
                { id: "cuida", peso: 30, texto: "Guarda los cables enrollados sin torcerlos, limpia, revisa y lleva un inventario.", formas: ["enroll*", "sin torcer*", "limpi*", "revis*", "inventario"] },
                { id: "fiel", peso: 30, texto: "Con fidelidad en lo poco: el que es fiel en lo muy poco, también en lo más es fiel.", formas: ["fiel*", "fidelidad", "lo poco", "lo pequeno", "cosas pequenas"] },
              ],
              modelo: "Porque el equipo es una ofrenda de la iglesia. Como el pastor sabio conoce el estado de sus ovejas, el técnico conoce el estado de su equipo: guarda los cables enrollados, limpia, revisa y lleva un inventario. Y es fiel en lo poco.",
            },
          },
          {
            apoyo: "Un cable bien guardado también es fidelidad",
            ref: "Lucas 16:10",
            clave: {
              id: "pr-alabanza-5-6-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice: Un cable mal guardado no tiene importancia; Dios mira cosas más grandes. ¿Qué le respondes?",
              ideas: [
                { id: "fiel", peso: 50, texto: "Jesús enseñó que el que es fiel en lo muy poco, también en lo más es fiel: la fidelidad se ve en lo pequeño.", formas: ["fiel*", "fidelidad", "lo poco", "lo pequeno", "cosas pequenas"] },
                { id: "cuidado", peso: 50, texto: "Un cable bien guardado también es fidelidad: el técnico conoce el estado de su equipo y lo cuida.", formas: ["bien guardado", "cable guardado", "guard* bien", "cables bien", "cuid* cables", "cuid* iglesia", "enroll*", "sin torcer*", "estado equipo", "cuid* equipo", "inventario", "limpi*", "revis*", "mayordomia"] },
              ],
              modelo: "Le respondo que Jesús enseñó que el que es fiel en lo muy poco, también en lo más es fiel. Un cable bien guardado también es fidelidad: el técnico conoce el estado de su equipo y lo cuida como mayordomía.",
            },
          },
        ],
      },
    ],
  },
};
