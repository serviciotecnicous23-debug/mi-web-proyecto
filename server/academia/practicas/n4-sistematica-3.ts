/**
 * Las prácticas de «Teología sistemática III: el hombre, el pecado y la salvación» (Nivel 4). Hechas solo con lo que dice cada lección
 * (server/academia/contenido/n4-sistematica-3.ts), con la guía de docs/academia-practicas.md.
 *
 * Materia doctrinal: cada afirmación sigue la lección con sus mismas palabras. Donde las tradiciones difieren (las dos
 * maneras de describir al ser humano, el calvinismo y el arminianismo sobre la elección, la santificación completa), se
 * pregunta solo lo que la lección dice de cada una, con esa misma atribución, y nunca cuál tiene razón. La perseverancia
 * es un punto de la declaración de fe por confirmar: ninguna actividad pregunta por ese punto ni por las dos posiciones.
 * El objetivo 2 de la lección 6, que trata de ese punto, se practica solo con lo que la lección afirma sin reservas: la
 * seguridad descansa en Cristo y no en los sentimientos, y la Biblia llama a cada creyente a permanecer firme (2 Pedro 1:10).
 */
import type { PracticasMateria } from "./tipos";

export const PRACTICAS_N4_SISTEMATICA_3: PracticasMateria = {
  materia: "n4-sistematica-3",
  mision: {
    titulo: "La salvación, de principio a fin",
    intro: "Tu pastor te encargó preparar a los maestros de la escuela dominical para una serie sobre la salvación. Te van a hacer muchas preguntas: qué significa ser imagen de Dios, cómo entró el pecado y hasta dónde llega, qué es la gracia y qué enseñan con respeto el calvinismo y el arminianismo, qué son la conversión, la regeneración y la justificación, qué regalos son la adopción y la santificación, y en qué descansa la seguridad del creyente. Repasa las seis lecciones para tener cada respuesta lista.",
    cierre: "Ya puedes enseñar a otros que Dios creó al ser humano a su imagen, que el pecado alcanza a todos y a toda la persona, que la salvación es solo por gracia y que somos justificados por la fe sin las obras de la ley, que el creyente es hijo de Dios y crece en santidad, y que su seguridad descansa en Cristo: «Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo».",
  },
  lecciones: {
    // ------------------------------------------------------------ 1. El ser humano, creado a imagen de Dios
    "n4-sistematica-3-1": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Si la imagen de Dios no es un parecido físico, ¿qué es?", reverso: "Que el ser humano puede conocer a Dios, amar, razonar y decidir.", apoyo: "La imagen de Dios no es un parecido físico" },
              { frente: "¿Qué tarea recibió el ser humano en Génesis 1?", reverso: "Llenar la tierra y sojuzgarla.", apoyo: "Y recibió una tarea: «llenad la tierra, y sojuzgadla»" },
              { frente: "Según Génesis 2:7, ¿de qué está hecho el ser humano?", reverso: "Del polvo de la tierra y del aliento de vida que Dios sopló.", apoyo: "Es polvo y aliento a la vez" },
              { frente: "Según el Salmo 8, ¿de qué coronó Dios al hombre?", reverso: "De gloria y de honra.", apoyo: "«lo coronaste de gloria y de honra»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo gobierna el ser humano la creación?", reverso: "Como representante de Dios, varón y hembra.", apoyo: "gobernar la creación como su representante, «varón y hembra»" },
              { frente: "¿Qué parte del ser humano es obra de Dios?", reverso: "La persona entera: el cuerpo no es malo.", apoyo: "El cuerpo no es malo; la persona entera es obra de Dios" },
              { frente: "¿Qué pregunta se hace el salmista, asombrado?", reverso: "«¿Qué es el hombre, para que tengas de él memoria?»", apoyo: "El salmista se asombra: «¿Qué es el hombre, para que tengas de él memoria?»" },
              { frente: "¿Qué merece toda persona, sea cual sea su condición?", reverso: "Respeto, porque lleva la imagen de Dios.", apoyo: "Por eso toda persona merece respeto, sea cual sea su origen, su condición o su pecado" },
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
            consigna: "Completa para qué creó Dios al ser humano.",
            texto: "Dios creó al ser humano a su [[imagen]], varón y hembra, para [[conocerlo]], amar y [[gobernar]] la creación como su representante.",
            distractores: ["capricho", "olvidarlo", "adorar"],
            errores: {
              capricho: "Dios creó al ser humano a su imagen: puede conocer a Dios, amar, razonar y decidir.",
              olvidarlo: "Dios lo creó para conocerlo: el ser humano puede conocer a Dios.",
              adorar: "El ser humano recibió la tarea de gobernar la creación como representante de Dios.",
            },
            apoyo: "Dios creó al ser humano a su imagen, varón y hembra, para conocerlo, amar y gobernar la creación como su representante",
            ref: "Génesis 1:26-28",
            explica: "La imagen de Dios no es un parecido físico: el ser humano puede conocer a Dios, amar, razonar, decidir y gobernar la creación como su representante.",
          },
          {
            consigna: "Completa lo que dicen Génesis 2:7 y el Salmo 8 del ser humano.",
            texto: "El ser humano es [[polvo]] y aliento de [[vida]], y Dios lo coronó de [[gloria]] y de honra.",
            distractores: ["fuego", "muerte", "vergüenza"],
            errores: {
              fuego: "Dios formó al hombre del polvo de la tierra.",
              muerte: "Dios sopló en su nariz aliento de vida.",
              "vergüenza": "El salmista dice que Dios lo coronó de gloria y de honra.",
            },
            apoyo: "Es polvo y aliento de vida, y Dios lo coronó de gloria y de honra",
            ref: "Salmos 8:4-6",
            explica: "Dios «formó al hombre del polvo de la tierra, y sopló en su nariz aliento de vida», y el salmista dice: «lo coronaste de gloria y de honra».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Lo enseña solo la tricotomía, solo la dicotomía, o en eso coinciden las dos? Lleva cada frase a su grupo.",
            grupos: ["Solo la tricotomía", "Solo la dicotomía", "En eso coinciden las dos"],
            frases: [
              { texto: "Ve tres partes en el ser humano", grupo: 0 },
              { texto: "Cita «todo vuestro ser, espíritu, alma y cuerpo»", grupo: 0 },
              { texto: "Ve dos partes en el ser humano", grupo: 1 },
              { texto: "Distingue lo material de lo inmaterial", grupo: 1 },
              { texto: "Cita «temed más bien a aquel que puede destruir el alma y el cuerpo»", grupo: 1 },
              { texto: "Es una posición evangélica", grupo: 2, explica: "La lección dice que las dos posiciones son evangélicas." },
              { texto: "Ve a la persona como una unidad", grupo: 2 },
              { texto: "Dios quiere santificar a la persona por completo", grupo: 2 },
            ],
            apoyo: "Las dos posiciones son evangélicas y coinciden en que la persona es una unidad que Dios quiere santificar por completo",
            explica: "La tricotomía habla de tres partes y cita 1 Tesalonicenses 5:23; la dicotomía, de dos, lo material y lo inmaterial, y cita Mateo 10:28. Las dos son evangélicas y ven a la persona como una unidad.",
          },
          {
            consigna: "¿Lo dice la tricotomía o la dicotomía? Lleva cada frase a su grupo.",
            grupos: ["La tricotomía", "La dicotomía"],
            frases: [
              { texto: "Describe al ser humano en tres partes", grupo: 0 },
              { texto: "Habla de espíritu, alma y cuerpo", grupo: 0 },
              { texto: "Se apoya en 1 Tesalonicenses 5:23", grupo: 0 },
              { texto: "Describe al ser humano en dos partes", grupo: 1 },
              { texto: "Habla de lo material y lo inmaterial", grupo: 1 },
              { texto: "Se apoya en Mateo 10:28", grupo: 1 },
              { texto: "Cita unas palabras de Jesús sobre el alma y el cuerpo", grupo: 1 },
            ],
            apoyo: "La tricotomía habla de tres partes, y cita «todo vuestro ser, espíritu, alma y cuerpo»",
            explica: "La tricotomía habla de tres partes y cita 1 Tesalonicenses 5:23; la dicotomía habla de dos, lo material y lo inmaterial, y cita a Jesús en Mateo 10:28. Las dos posiciones son evangélicas.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "¿Qué tres partes nombra el texto que cita la tricotomía? Toca las palabras que lo dicen.",
            texto: "todo vuestro ser, [[espíritu]], [[alma]] y [[cuerpo]]",
            apoyo: "La tricotomía habla de tres partes, y cita «todo vuestro ser, espíritu, alma y cuerpo»",
            ref: "1 Tesalonicenses 5:23",
            explica: "La tricotomía habla de tres partes y cita 1 Tesalonicenses 5:23: «todo vuestro ser, espíritu, alma y cuerpo».",
          },
          {
            consigna: "¿Qué dos partes nombra Jesús en el texto que cita la dicotomía? Toca las palabras que lo dicen.",
            texto: "temed más bien a aquel que puede destruir el [[alma]] y el [[cuerpo]]",
            apoyo: "La dicotomía habla de dos, lo material y lo inmaterial, y cita a Jesús",
            ref: "Mateo 10:28",
            explica: "La dicotomía habla de dos partes, lo material y lo inmaterial, y cita a Jesús: «temed más bien a aquel que puede destruir el alma y el cuerpo».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un servidor del equipo de bienvenida te dice: A ese vecino que vive en pecado no le doy la mano; no merece que lo trate con respeto.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que toda persona merece respeto, sea cual sea su pecado: lleva la imagen de Dios.", bien: true, explica: "Es lo que enseña la lección: la imagen de Dios no se perdió del todo, y por eso toda persona merece respeto." },
              { texto: "Que tiene razón: en quien vive en pecado, la imagen de Dios ya se perdió del todo.", explica: "La imagen de Dios no se perdió del todo con el pecado: Santiago reprende a los que maldicen a los hombres." },
              { texto: "Que lo salude solo si su vecino promete antes dejar su pecado ese mismo día.", explica: "Toda persona merece respeto, sea cual sea su origen, su condición o su pecado." },
              { texto: "Que el respeto es solo para los creyentes, porque solo ellos son obra de Dios.", explica: "Cada persona lleva la imagen de Dios: toda persona merece respeto." },
            ],
            apoyo: "Por eso toda persona merece respeto, sea cual sea su origen, su condición o su pecado",
            ref: "Santiago 3:9",
            explica: "La imagen de Dios no se perdió del todo con el pecado: Santiago reprende a los que maldicen a los hombres, «que están hechos a la semejanza de Dios». Por eso toda persona merece respeto.",
          },
          {
            caso: "Una maestra de niños te dice: En mi clase hay un niño de otro país, y algunos se burlan de él. ¿Le doy importancia?",
            pregunta: "¿Qué le aconsejas?",
            opciones: [
              { texto: "Que sí: ese niño lleva la imagen de Dios y merece respeto, venga de donde venga.", bien: true, explica: "Toda persona merece respeto, sea cual sea su origen: cada una lleva la imagen de Dios." },
              { texto: "Que no: son cosas de niños, y la dignidad de las personas no es tema para la clase.", explica: "Cada persona que atiendes lleva la imagen de Dios, también cada niño de la clase." },
              { texto: "Que sí, pero solo si el niño ya es creyente, porque la imagen es de los salvos.", explica: "La imagen de Dios no se perdió del todo con el pecado: toda persona la lleva y merece respeto." },
              { texto: "Que no: cada niño debe juntarse solo con los de su mismo origen y su idioma.", explica: "Toda persona merece respeto, sea cual sea su origen o su condición." },
            ],
            apoyo: "Cada persona que atiendes lleva la imagen de Dios",
            ref: "Santiago 3:9",
            explica: "Cada persona que atiendes lleva la imagen de Dios, y por eso merece respeto, sea cual sea su origen, su condición o su pecado.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "Cada persona que atiendes lleva la imagen de Dios",
            ref: "Santiago 3:9",
            situacion: "Eres pastor asistente. Un hombre llega enojado a la oficina de la iglesia y le grita a la secretaria porque no le dieron la ayuda que pidió.",
            escenas: [
              {
                id: "e1",
                narra: "La secretaria te mira asustada, y el hombre sigue gritando.",
                pregunta: "¿Qué haces primero?",
                opciones: [
                  { texto: "Lo saludas con calma, le preguntas su nombre y lo escuchas.", valor: 2, explica: "Cada persona que atiendes lleva la imagen de Dios: aun enojado, merece respeto.", siguiente: "e2" },
                  { texto: "Le explicas las reglas de la ayuda antes de saber qué necesita.", valor: 1, explica: "Explicar las reglas no es malo, pero primero hay que tratarlo con el respeto que merece toda persona.", siguiente: "e2" },
                  { texto: "Le respondes con dureza que quien grita así no merece atención.", valor: 0, explica: "Toda persona merece respeto, sea cual sea su condición: también la que llega enojada.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "El hombre se ofende todavía más y camina hacia la puerta.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Le pides perdón por tu respuesta y lo invitas a sentarse.", valor: 2, explica: "Reconocer tu falta y tratarlo con respeto honra la imagen de Dios que él lleva.", siguiente: "e2" },
                  { texto: "Lo dejas ir: una persona así no vale el tiempo de la iglesia.", valor: 0, explica: "Toda persona lleva la imagen de Dios y merece respeto, sea cual sea su condición.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "En la reunión del equipo, un servidor dice: Ese hombre no tiene remedio; mejor que no vuelva.",
                pregunta: "¿Qué respondes?",
                opciones: [
                  { texto: "Que también él está hecho a la semejanza de Dios y merece respeto.", valor: 2, explica: "Santiago reprende a los que maldicen a los hombres, «que están hechos a la semejanza de Dios»." },
                  { texto: "Que mejor no hablen de él, y pasas enseguida al tema que sigue.", valor: 1, explica: "Evitar la crítica es bueno, pero pierdes la ocasión de enseñar que toda persona merece respeto." },
                  { texto: "Que tiene razón: en algunos, la imagen de Dios ya se perdió del todo.", valor: 0, explica: "La imagen de Dios no se perdió del todo con el pecado: por eso toda persona merece respeto." },
                ],
              },
              {
                id: "e3",
                narra: "A la semana siguiente, el hombre vuelve más tranquilo y pide perdón.",
                pregunta: "¿Cómo lo recibes?",
                opciones: [
                  { texto: "Con respeto: lo escuchas y buscas con él la ayuda que necesita.", valor: 2, explica: "Cada persona que atiendes lleva la imagen de Dios, y así se la honra." },
                  { texto: "Aceptas su perdón, pero le pides que no vuelva a la oficina sin cita.", valor: 1, explica: "Poner orden no es malo, pero recibirlo con todo el respeto que merece honra la imagen de Dios que lleva." },
                  { texto: "Con frialdad: le recuerdas lo mal que se portó la vez anterior.", valor: 0, explica: "Toda persona merece respeto, sea cual sea su condición o su pecado." },
                ],
              },
            ],
          },
          {
            apoyo: "Por eso toda persona merece respeto, sea cual sea su origen, su condición o su pecado",
            ref: "Santiago 3:9",
            situacion: "Eres líder de jóvenes. Llega por primera vez al grupo un muchacho de un barrio pobre, y algunos jóvenes se burlan de su ropa.",
            escenas: [
              {
                id: "e1",
                narra: "Nadie lo saluda, y él se queda solo en un rincón.",
                pregunta: "¿Qué haces?",
                opciones: [
                  { texto: "Te acercas, le preguntas su nombre y lo sientas con el grupo.", valor: 2, explica: "Toda persona merece respeto, sea cual sea su origen o su condición: recibirlo así honra la imagen de Dios que lleva." },
                  { texto: "Sigues con la reunión y decides saludarlo al final, si se queda.", valor: 1, explica: "Saludarlo al final es bueno, pero dejarlo solo mientras se burlan de él no lo trata con el respeto que merece." },
                  { texto: "Lo dejas solo: si quiere ser del grupo, que se acerque él mismo.", valor: 0, explica: "Cada persona que atiendes lleva la imagen de Dios, también el que llega por primera vez." },
                ],
              },
              {
                id: "e2",
                narra: "Al terminar, un joven te dice en voz baja: Ese muchacho no es como nosotros.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que ese muchacho también está hecho a la semejanza de Dios.", valor: 2, explica: "Santiago reprende a los que maldicen a los hombres, «que están hechos a la semejanza de Dios»." },
                  { texto: "Que lo deje en paz y no se meta con él, sin decirle más.", valor: 1, explica: "Frenar la burla es bueno, pero conviene enseñarle por qué toda persona merece respeto." },
                  { texto: "Que tiene razón, y que cada uno busque amigos de su misma clase.", valor: 0, explica: "Toda persona merece respeto, sea cual sea su origen o su condición." },
                ],
              },
              {
                id: "e3",
                narra: "La próxima semana te toca enseñar al grupo.",
                pregunta: "¿Qué les enseñas?",
                opciones: [
                  { texto: "Que toda persona lleva la imagen de Dios y merece respeto.", valor: 2, explica: "La imagen de Dios no se perdió del todo, y por eso toda persona merece respeto." },
                  { texto: "Que hay que ser amables con los nuevos para que el grupo crezca.", valor: 1, explica: "Ser amables está bien, pero la razón más profunda es que cada persona lleva la imagen de Dios." },
                  { texto: "Que cada uno se junte con los de su origen, para que nadie se incomode.", valor: 0, explica: "Toda persona merece respeto, sea cual sea su origen, su condición o su pecado." },
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
            apoyo: "el ser humano puede conocer a Dios, amar, razonar, decidir y gobernar la creación como su representante",
            ref: "Génesis 1:26-28",
            clave: {
              id: "pr-n4-sistematica-3-1-a7-1",
              tipo: "corta",
              pregunta: "¿Qué significa que el ser humano fue creado a imagen de Dios?",
              ideas: [
                { id: "capacidades", peso: 50, texto: "Que puede conocer a Dios, amar, razonar y decidir: la imagen de Dios no es un parecido físico.", formas: ["conoce* a dios", "conocerlo", "amar", "razon*", "decidir", "decide", "decision*", "pensar", "relacion* con dios"] },
                { id: "gobernar", peso: 50, texto: "Y que gobierna la creación como su representante, varón y hembra.", formas: ["gobern*", "gobiern*", "represent*", "sojuzg*", "dominar", "domina", "administr*", "cuidar la creacion", "llenar la tierra", "llenad la tierra"] },
              ],
              errores: [
                { id: "fisico", texto: "La imagen de Dios no es un parecido físico.", formas: ["parecido fisico", "parec* fisicamente", "(su|el) aspecto fisico", "(la|su) apariencia"], anula: "capacidades" },
              ],
              modelo: "Significa que el ser humano puede conocer a Dios, amar, razonar y decidir, y que gobierna la creación como su representante, varón y hembra. No es un parecido físico.",
            },
          },
          {
            apoyo: "Es polvo y aliento a la vez",
            ref: "Génesis 2:7",
            clave: {
              id: "pr-n4-sistematica-3-1-a7-2",
              tipo: "corta",
              pregunta: "¿Qué dice Génesis 2:7 de cómo Dios formó al ser humano, y qué enseña eso sobre el cuerpo?",
              ideas: [
                { id: "polvo", peso: 50, texto: "Que es polvo y aliento a la vez: Dios lo formó del polvo de la tierra y sopló en su nariz aliento de vida.", formas: ["polvo", "aliento", "sopl*", "barro"] },
                { id: "cuerpo", peso: 50, texto: "Que el cuerpo no es malo: la persona entera es obra de Dios.", formas: ["persona entera", "toda la persona", "obra de dios", "no es malo", "(es|son) bueno*", "creacion de dios"] },
              ],
              errores: [
                { id: "malo", texto: "El cuerpo no es malo; la persona entera es obra de Dios.", formas: ["cuerpo es malo", "cuerpo (es|son) (malo|pecado|pecaminoso)", "el cuerpo no (vale|importa)"], anula: "cuerpo" },
              ],
              modelo: "Dice que Dios formó al hombre del polvo de la tierra y sopló en su nariz aliento de vida: es polvo y aliento a la vez. Por eso el cuerpo no es malo; la persona entera es obra de Dios.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 2. El pecado: origen, naturaleza y alcance
    "n4-sistematica-3-2": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Con qué empezó la primera desobediencia?", reverso: "Con un deseo y una decisión.", apoyo: "La primera desobediencia empezó con un deseo y una decisión" },
              { frente: "¿Qué consecuencias inmediatas trajo el primer pecado?", reverso: "La vergüenza y el escondite.", apoyo: "Las consecuencias fueron inmediatas: la vergüenza y el escondite" },
              { frente: "Según 1 Juan 3:4, ¿qué es el pecado?", reverso: "«el pecado es infracción de la ley»", apoyo: "El pecado es transgresión: «el pecado es infracción de la ley»" },
              { frente: "Según Santiago 4:17, ¿cuándo hay pecado de omisión?", reverso: "Cuando uno sabe hacer lo bueno y no lo hace.", apoyo: "Y también omisión: «al que sabe hacer lo bueno, y no lo hace, le es pecado»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Cómo trata la Biblia el pecado?", reverso: "Como la raíz de todo lo que está mal, no como un error pequeño.", apoyo: "La Biblia no trata el pecado como un error pequeño, sino como la raíz de todo lo que está mal en el mundo y en el corazón humano" },
              { frente: "¿Cómo vio la mujer el árbol, según Génesis 3:6?", reverso: "«codiciable para alcanzar la sabiduría»", apoyo: "la mujer vio que el árbol era «codiciable para alcanzar la sabiduría»" },
              { frente: "¿Qué se llama pecado original?", reverso: "Que el pecado de Adán afectó a toda la humanidad.", apoyo: "Pablo enseña que el pecado de Adán afectó a toda la humanidad" },
              { frente: "¿Quién respondió a Pelagio con la Escritura?", reverso: "Agustín de Hipona.", apoyo: "Agustín de Hipona le respondió con la Escritura" },
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
            consigna: "Ordena cómo fue la primera desobediencia, según Génesis 3, del primer paso al último.",
            pasos: ["La mujer ve que el árbol es codiciable", "Come del fruto del árbol", "Da del fruto a su marido", "Sienten vergüenza", "Se esconden de la presencia de Dios"],
            apoyo: "la mujer vio que el árbol era «codiciable para alcanzar la sabiduría», comió, y dio a su marido",
            ref: "Génesis 3:6-8",
            explica: "La mujer vio que el árbol era codiciable, comió y dio a su marido. Las consecuencias fueron inmediatas: la vergüenza y el escondite, porque «se escondieron de la presencia de Jehová Dios».",
          },
          {
            consigna: "La primera desobediencia empezó con un deseo y terminó en el escondite. Ordena los pasos, del primero al último.",
            pasos: ["Nace un deseo: el árbol parece codiciable", "Llega la decisión: come del fruto", "Da del fruto a su marido", "Llegan la vergüenza y el escondite"],
            apoyo: "La primera desobediencia empezó con un deseo y una decisión",
            ref: "Génesis 3:6-8",
            explica: "La primera desobediencia empezó con un deseo y una decisión: la mujer comió y dio a su marido. Las consecuencias fueron inmediatas: la vergüenza y el escondite.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es un pecado de transgresión o de omisión? Lleva cada frase a su grupo.",
            grupos: ["Transgresión: hacer lo prohibido", "Omisión: no hacer el bien"],
            frases: [
              { texto: "Robar lo que es de otro", grupo: 0 },
              { texto: "Mentir para salir de un problema", grupo: 0 },
              { texto: "Hacer lo que la ley de Dios prohíbe", grupo: 0 },
              { texto: "Saber hacer lo bueno y no hacerlo", grupo: 1 },
              { texto: "Ver al hermano en necesidad y no ayudarlo", grupo: 1 },
              { texto: "Saber que debes pedir perdón y no pedirlo", grupo: 1 },
            ],
            apoyo: "Es infracción de la ley y también omisión del bien",
            ref: "1 Juan 3:4; Santiago 4:17",
            explica: "El pecado es transgresión, «infracción de la ley», y también omisión: «al que sabe hacer lo bueno, y no lo hace, le es pecado».",
          },
          {
            consigna: "¿Es infracción de la ley o es omisión del bien? Lleva cada frase a su grupo.",
            grupos: ["Infracción de la ley", "Omisión del bien"],
            frases: [
              { texto: "Insultar a tu prójimo", grupo: 0 },
              { texto: "Tomar algo que no es tuyo", grupo: 0 },
              { texto: "Desobedecer un mandato claro de Dios", grupo: 0 },
              { texto: "«al que sabe hacer lo bueno, y no lo hace, le es pecado»", grupo: 1 },
              { texto: "Saber que un enfermo te espera y no visitarlo", grupo: 1 },
              { texto: "Tener con qué ayudar a un necesitado y no hacerlo", grupo: 1 },
            ],
            apoyo: "El pecado es transgresión: «el pecado es infracción de la ley». Y también omisión: «al que sabe hacer lo bueno, y no lo hace, le es pecado»",
            ref: "1 Juan 3:4; Santiago 4:17",
            explica: "El pecado no es solo hacer lo que la ley prohíbe: también es omisión, saber hacer lo bueno y no hacerlo.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre el pecado original tiene un error. Tócala.",
            frases: [
              "Pablo enseña que el pecado de Adán afectó a toda la humanidad.",
              "Por la desobediencia de un hombre, los muchos fueron constituidos pecadores.",
              "Que el pecado de Adán afectara a todos se llama pecado original.",
              "El mismo pasaje de Romanos 5 no anuncia ninguna esperanza.",
            ],
            malo: 3,
            correccion: "El mismo pasaje anuncia la esperanza: «por la obediencia de uno, los muchos serán constituidos justos».",
            apoyo: "Pero el mismo pasaje anuncia la esperanza: «por la obediencia de uno, los muchos serán constituidos justos»",
            ref: "Romanos 5:18-19",
            explica: "Por la desobediencia de un hombre los muchos fueron constituidos pecadores: es el pecado original. Pero el mismo pasaje anuncia que por la obediencia de uno los muchos serán constituidos justos.",
          },
          {
            consigna: "Una de estas frases sobre Pelagio y Agustín tiene un error. Tócala.",
            frases: [
              "Pelagio enseñó a comienzos del siglo V.",
              "Pelagio enseñó que el ser humano nace sin inclinación al pecado.",
              "Agustín de Hipona respondió a Pelagio con la Escritura.",
              "La iglesia aceptó que se puede vivir sin pecar por el propio esfuerzo.",
            ],
            malo: 3,
            correccion: "La iglesia rechazó la enseñanza de Pelagio: nadie puede salvarse sin la gracia de Dios.",
            apoyo: "la iglesia rechazó la enseñanza de Pelagio: nadie puede salvarse sin la gracia de Dios",
            explica: "A comienzos del siglo V, Pelagio enseñó que el ser humano nace sin inclinación al pecado y puede vivir sin pecar por su propio esfuerzo. Agustín le respondió con la Escritura, y la iglesia rechazó esa enseñanza.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre el alcance del pecado: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "El pecado alcanza a todos y a toda la persona.", verdad: true, explica: "Así lo dice la lección: «No hay justo, ni aun uno».", apoyo: "El pecado alcanza a todos y a toda la persona", ref: "Romanos 3:10-12" },
              { texto: "Que el pecado alcance a toda la persona significa que el ser humano es tan malo como podría ser.", verdad: false, explica: "No significa que el ser humano sea tan malo como podría ser, sino que ninguna parte de él quedó libre del pecado.", apoyo: "No significa que el ser humano sea tan malo como podría ser, sino que ninguna parte de él quedó libre del pecado" },
              { texto: "Sin Cristo estábamos muertos en delitos y pecados.", verdad: true, explica: "Efesios 2:1 lo dice así: «muertos en vuestros delitos y pecados».", apoyo: "Sin Cristo estábamos «muertos en vuestros delitos y pecados»", ref: "Efesios 2:1-3" },
            ],
          },
          {
            consigna: "Sobre el corazón humano y el pecado: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Algunas personas son tan buenas que quedaron libres del pecado.", verdad: false, explica: "El pecado alcanza a todos: «No hay justo, ni aun uno».", apoyo: "«No hay justo, ni aun uno»", ref: "Romanos 3:10" },
              { texto: "Aun el corazón humano engaña.", verdad: true, explica: "Jeremías lo dice así: «Engañoso es el corazón más que todas las cosas».", apoyo: "Aun el corazón engaña: «Engañoso es el corazón más que todas las cosas»", ref: "Jeremías 17:9" },
              { texto: "Alguna parte del ser humano quedó libre del pecado.", verdad: false, explica: "El pecado alcanza a toda la persona: ninguna parte de él quedó libre del pecado.", apoyo: "ninguna parte de él quedó libre del pecado" },
              { texto: "Sin Cristo éramos por naturaleza hijos de ira.", verdad: true, explica: "Efesios 2:3 dice: «éramos por naturaleza hijos de ira».", apoyo: "y «éramos por naturaleza hijos de ira»", ref: "Efesios 2:3" },
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
            caso: "Un compañero de trabajo te dice: Yo no necesito a Cristo; soy buena persona y nunca le he hecho daño a nadie.",
            pregunta: "¿Qué le respondes, según la lección?",
            opciones: [
              { texto: "Que la Biblia dice «No hay justo, ni aun uno»: el pecado alcanza a todos.", bien: true, explica: "El pecado alcanza a todos y a toda la persona, también a quien se ve como buena persona." },
              { texto: "Que tiene razón: el pecado solo alcanza a los que le hacen daño a los demás.", explica: "El pecado alcanza a todos: «No hay justo, ni aun uno»." },
              { texto: "Que el pecado solo afecta lo que uno hace, y no su corazón ni lo que piensa.", explica: "El pecado alcanza a toda la persona: aun el corazón engaña." },
              { texto: "Que siga esforzándose, y así podrá vivir sin pecar con sus propias fuerzas.", explica: "Eso enseñó Pelagio, y la iglesia lo rechazó: nadie puede salvarse sin la gracia de Dios." },
            ],
            apoyo: "El pecado alcanza a todos y a toda la persona",
            ref: "Romanos 3:10-12",
            explica: "El pecado alcanza a todos y a toda la persona: «No hay justo, ni aun uno». Aun el corazón engaña, y nadie puede salvarse sin la gracia de Dios.",
          },
          {
            caso: "Una joven de tu célula te dice: Mi corazón nunca me engaña; si siento que algo está bien, es porque está bien.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que la Biblia dice: «Engañoso es el corazón más que todas las cosas».", bien: true, explica: "Aun el corazón engaña: el pecado alcanza a toda la persona." },
              { texto: "Que tiene razón: el pecado alcanzó el cuerpo, pero dejó intacto el corazón.", explica: "Ninguna parte del ser humano quedó libre del pecado: aun el corazón engaña." },
              { texto: "Que el corazón solo engaña a los que no van a la iglesia los domingos.", explica: "El pecado alcanza a todos y a toda la persona." },
              { texto: "Que confíe en lo que siente, porque los sentimientos no se equivocan.", explica: "Jeremías dice: «Engañoso es el corazón más que todas las cosas»." },
            ],
            apoyo: "Aun el corazón engaña: «Engañoso es el corazón más que todas las cosas»",
            ref: "Jeremías 17:9",
            explica: "El pecado alcanza a toda la persona, y aun el corazón engaña: no significa que el ser humano sea tan malo como podría ser, sino que ninguna parte de él quedó libre del pecado.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "A comienzos del siglo V, Pelagio enseñó que el ser humano nace sin inclinación al pecado y puede vivir sin pecar por su propio esfuerzo",
            ref: "Romanos 5:18-19",
            clave: {
              id: "pr-n4-sistematica-3-2-a7-1",
              tipo: "corta",
              pregunta: "¿Qué es el pecado original, y qué enseñó Pelagio en contra?",
              ideas: [
                { id: "original", peso: 50, texto: "Por la desobediencia de Adán, los muchos fueron constituidos pecadores: su pecado afectó a toda la humanidad.", formas: ["toda la humanidad", "a todos los (hombres|seres humanos)", "constituidos pecadores", "los muchos fueron", "pecado de adan", "desobediencia de (adan|un hombre)", "por (un|adan) hombre", "todos (somos|son|fuimos|nacemos) pecadores"] },
                { id: "pelagio", peso: 50, texto: "Pelagio enseñó que el ser humano nace sin inclinación al pecado y puede vivir sin pecar por su propio esfuerzo.", formas: ["sin inclinacion", "nace* sin", "propio esfuerzo", "sus propias fuerzas", "sus fuerzas", "su esfuerzo", "vivir sin pecar", "nace* (bueno|buenos|limpio|limpios|puro|puros|inocente*)"] },
              ],
              errores: [
                { id: "solo-adan", texto: "Pablo enseña que el pecado de Adán afectó a toda la humanidad.", formas: ["solo (afecto|dano|alcanzo) a adan", "solo (lo|le) afecto a (el|adan)"], anula: "original" },
              ],
              modelo: "El pecado original es que, por la desobediencia de Adán, los muchos fueron constituidos pecadores: su pecado afectó a toda la humanidad. Pelagio enseñó lo contrario: que el ser humano nace sin inclinación al pecado y puede vivir sin pecar por su propio esfuerzo.",
            },
          },
          {
            apoyo: "Pero el mismo pasaje anuncia la esperanza: «por la obediencia de uno, los muchos serán constituidos justos»",
            ref: "Romanos 5:18-19",
            clave: {
              id: "pr-n4-sistematica-3-2-a7-2",
              tipo: "corta",
              pregunta: "¿Qué enseña Romanos 5:18-19 sobre la desobediencia de Adán, y qué esperanza anuncia el mismo pasaje?",
              ideas: [
                { id: "pecadores", peso: 50, texto: "Por la desobediencia de un hombre, los muchos fueron constituidos pecadores: es el pecado original.", formas: ["constituidos pecadores", "fueron (hechos|constituidos) pecadores", "(somos|son|fuimos|nacemos) pecadores", "pecado original", "toda la humanidad", "a todos los (hombres|seres humanos)"] },
                { id: "justos", peso: 50, texto: "Por la obediencia de uno, los muchos serán constituidos justos.", formas: ["constituidos justos", "seran (hechos|constituidos|declarados) justos", "seremos (hechos|constituidos|declarados) justos", "seremos justos", "obediencia de (uno|cristo|jesus|jesucristo)", "por (la|su) obediencia", "hechos justos"] },
              ],
              modelo: "Enseña que por la desobediencia de un hombre, Adán, los muchos fueron constituidos pecadores: es el pecado original. Pero anuncia la esperanza: por la obediencia de uno, los muchos serán constituidos justos.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 3. La gracia y la elección
    "n4-sistematica-3-3": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Qué es la gracia, según la lección?", reverso: "El favor que no merecemos.", apoyo: "Gracia es el favor que no merecemos" },
              { frente: "Según Tito 2:11, ¿a quiénes se ha manifestado la gracia para salvación?", reverso: "A todos los hombres.", apoyo: "«la gracia de Dios se ha manifestado para salvación a todos los hombres»" },
              { frente: "Según Juan 6:44, ¿quién trae a los que vienen a Jesús?", reverso: "El Padre que lo envió.", apoyo: "Jesús dijo: «Ninguno puede venir a mí, si el Padre que me envió no le trajere»" },
              { frente: "¿Qué ha dividido a buenos cristianos por siglos?", reverso: "Cómo se relacionan la gracia y la decisión humana.", apoyo: "Cómo se relacionan la gracia y la decisión humana ha dividido a buenos cristianos por siglos" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según Efesios 1:4, ¿cuándo nos escogió Dios en Cristo?", reverso: "Antes de la fundación del mundo.", apoyo: "Pablo habla de un Dios que «nos escogió en él antes de la fundación del mundo»" },
              { frente: "¿Qué cadena describe Pablo en Romanos 8:29-30?", reverso: "Conoció, predestinó, llamó, justificó y glorificó.", apoyo: "«a los que antes conoció, también los predestinó», los llamó, los justificó y los glorificó" },
              { frente: "¿Qué línea ha seguido la mayoría de las iglesias pentecostales?", reverso: "Una línea arminiana.", apoyo: "La mayoría de las iglesias pentecostales ha seguido una línea arminiana" },
              { frente: "¿Cómo trata el líder a los hermanos que piensan distinto en lo demás?", reverso: "Con respeto.", apoyo: "El líder enseña estas verdades con firmeza y trata con respeto a los hermanos que piensan distinto en lo demás" },
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
            consigna: "Completa lo que enseñan Tito 2:11 y Juan 6:44.",
            texto: "La [[gracia]] de Dios se manifestó para [[salvación]] a [[todos]]: nadie viene a Cristo si el Padre no lo trae.",
            distractores: ["ley", "castigo", "pocos"],
            errores: {
              ley: "Tito 2:11 habla de la gracia de Dios, que se ha manifestado para salvación.",
              castigo: "La gracia de Dios se manifestó para salvación.",
              pocos: "Se ha manifestado para salvación a todos los hombres.",
            },
            apoyo: "La gracia de Dios se manifestó para salvación a todos: nadie viene a Cristo si el Padre no lo trae",
            ref: "Tito 2:11; Juan 6:44",
            explica: "La gracia toma la iniciativa: «la gracia de Dios se ha manifestado para salvación a todos los hombres», y Jesús dijo: «Ninguno puede venir a mí, si el Padre que me envió no le trajere».",
          },
          {
            consigna: "Completa qué es la gracia y quién da el primer paso.",
            texto: "Gracia es el [[favor]] que no merecemos, y antes de que tú buscaras a Dios, él ya te [[buscaba]].",
            distractores: ["premio", "olvidaba"],
            errores: {
              premio: "Gracia es el favor que no merecemos: no es un premio.",
              olvidaba: "Antes de que tú buscaras a Dios, él ya te buscaba: nadie busca a Dios si Dios no lo busca primero.",
            },
            apoyo: "Antes de que tú buscaras a Dios, él ya te buscaba",
            ref: "Tito 2:11",
            explica: "Gracia es el favor que no merecemos, y toma la iniciativa: nadie busca a Dios si Dios no lo busca primero.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 0,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Une cada texto con lo que dice.",
            pares: [
              ["Tito 2:11", "«la gracia de Dios se ha manifestado para salvación a todos los hombres»"],
              ["Juan 6:44", "«Ninguno puede venir a mí, si el Padre que me envió no le trajere»"],
              ["Efesios 1:4", "Dios «nos escogió en él antes de la fundación del mundo»"],
              ["Romanos 8:29", "«a los que antes conoció, también los predestinó»"],
            ],
            apoyo: "Pablo habla de un Dios que «nos escogió en él antes de la fundación del mundo»",
            explica: "Tito 2:11 dice que la gracia se ha manifestado para salvación a todos; en Juan 6:44 Jesús dice que nadie viene a él si el Padre no lo trae; Pablo habla de elección en Efesios 1:4 y de predestinación en Romanos 8:29.",
          },
          {
            consigna: "Une cada texto con lo que enseña.",
            pares: [
              ["Tito 2:11", "La gracia de Dios se manifestó para salvación a todos"],
              ["Juan 6:44", "Nadie viene a Cristo si el Padre no lo trae"],
              ["1 Timoteo 2:3-4", "Dios «quiere que todos los hombres sean salvos»"],
              ["2 Pedro 3:9", "Dios es paciente, «no queriendo que ninguno perezca»"],
            ],
            apoyo: "La gracia de Dios se manifestó para salvación a todos: nadie viene a Cristo si el Padre no lo trae",
            explica: "Tito 2:11 y Juan 6:44 muestran que la gracia toma la iniciativa; 1 Timoteo 2:4 dice que Dios quiere que todos los hombres sean salvos, y 2 Pedro 3:9, que es paciente, no queriendo que ninguno perezca.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es del calvinismo o del arminianismo, según la lección? Lleva cada frase a su grupo.",
            grupos: ["El calvinismo", "El arminianismo"],
            frases: [
              { texto: "Dios elige a quienes salvará sin depender de nada en ellos", grupo: 0 },
              { texto: "Su gracia lleva a los elegidos con seguridad a la fe", grupo: 0 },
              { texto: "Subraya que la salvación es toda de Dios", grupo: 0 },
              { texto: "Sigue la línea del Sínodo de Dort", grupo: 0 },
              { texto: "Dios da a todos una gracia que les permite responder", grupo: 1 },
              { texto: "Dios elige a los que sabe de antemano que creerán", grupo: 1 },
              { texto: "Subraya que Dios «quiere que todos los hombres sean salvos»", grupo: 1 },
              { texto: "Está en la línea de Juan Wesley", grupo: 1 },
            ],
            apoyo: "El calvinismo, en la línea de Juan Calvino y del Sínodo de Dort (1618 y 1619), enseña que Dios elige a quienes salvará sin depender de nada en ellos, y que su gracia los lleva con seguridad a la fe",
            explica: "El calvinismo enseña una elección que no depende de nada en el ser humano; el arminianismo, una gracia que permite a todos responder. La declaración de fe del ministerio no entra en esta pregunta.",
          },
          {
            consigna: "¿Lo enseña el calvinismo o el arminianismo? Lleva cada frase a su grupo.",
            grupos: ["Calvinismo", "Arminianismo"],
            frases: [
              { texto: "Una elección que no depende de nada en el ser humano", grupo: 0 },
              { texto: "Pone el acento en que la salvación es toda de Dios", grupo: 0 },
              { texto: "La línea del Sínodo de Dort, en 1618 y 1619", grupo: 0 },
              { texto: "Una gracia que permite a todos responder", grupo: 1 },
              { texto: "Subraya que Dios es paciente, «no queriendo que ninguno perezca»", grupo: 1 },
              { texto: "La línea que ha seguido la mayoría de los pentecostales", grupo: 1 },
              { texto: "Dios elige a quienes sabe de antemano que creerán", grupo: 1 },
            ],
            apoyo: "El arminianismo, en la línea de Jacobo Arminio y luego de Juan Wesley, enseña que Dios da a todos una gracia que les permite responder, y que elige a los que sabe de antemano que creerán",
            explica: "El calvinismo, en la línea de Calvino y del Sínodo de Dort, enseña una elección que no depende de nada en el ser humano; el arminianismo, que ha seguido la mayoría de los pentecostales, enseña una gracia que permite a todos responder.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 1,
        pieza: "caso",
        versiones: [
          {
            apoyo: "El líder enseña estas verdades con firmeza y trata con respeto a los hermanos que piensan distinto en lo demás",
            ref: "Efesios 1:4-6",
            titulo: "Una discusión sobre la elección en la célula",
            relato: [
              "Diriges una célula de jóvenes. Esta semana leyeron Efesios 1, donde Pablo dice que Dios «nos escogió en él antes de la fundación del mundo».",
              "Andrés dice que Dios elige a quienes salvará sin mirar nada en ellos. Sofía responde que Dios elige a los que sabe de antemano que creerán.",
              "La discusión sube de tono, y los dos te miran para que digas quién tiene razón.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué línea sigue lo que dice Andrés?",
                opciones: [
                  { texto: "La del calvinismo, que enseña una elección que no depende de nada en el ser humano.", bien: true, explica: "El calvinismo enseña que Dios elige a quienes salvará sin depender de nada en ellos." },
                  { texto: "La del arminianismo, que enseña que Dios elige sin depender de nada en el ser humano.", explica: "El arminianismo enseña que Dios elige a los que sabe de antemano que creerán." },
                  { texto: "La de ninguna iglesia evangélica: nadie enseña eso hoy entre los hermanos.", explica: "Es lo que enseña el calvinismo, en la línea de Juan Calvino y del Sínodo de Dort." },
                  { texto: "La de la declaración de fe del ministerio, que ya decidió esa pregunta.", explica: "La declaración de fe del ministerio no entra en esta pregunta." },
                ],
                apoyo: "El calvinismo enseña una elección que no depende de nada en el ser humano",
                explica: "Andrés sigue la línea del calvinismo: Dios elige a quienes salvará sin depender de nada en ellos, y su gracia los lleva con seguridad a la fe.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Y qué línea sigue lo que dice Sofía?",
                opciones: [
                  { texto: "La del arminianismo, que ha seguido la mayoría de las iglesias pentecostales.", bien: true, explica: "El arminianismo enseña que Dios da a todos una gracia que les permite responder, y que elige a los que sabe de antemano que creerán." },
                  { texto: "La del calvinismo, que enseña que Dios elige a los que sabe de antemano que creerán.", explica: "El calvinismo enseña una elección que no depende de nada en el ser humano." },
                  { texto: "La de Juan Calvino y del Sínodo de Dort, de los años 1618 y 1619.", explica: "Esa es la línea del calvinismo; Sofía sigue la del arminianismo, de Jacobo Arminio y luego de Juan Wesley." },
                  { texto: "Ninguna: elegir a los que van a creer no lo enseña ninguna tradición.", explica: "Lo enseña el arminianismo, en la línea de Jacobo Arminio y luego de Juan Wesley." },
                ],
                apoyo: "El arminianismo, en la línea de Jacobo Arminio y luego de Juan Wesley, enseña que Dios da a todos una gracia que les permite responder, y que elige a los que sabe de antemano que creerán",
                explica: "Sofía sigue la línea del arminianismo: Dios da a todos una gracia que les permite responder, y elige a los que sabe de antemano que creerán.",
              },
              {
                tipo: "situacion",
                pregunta: "Los dos te piden que digas cuál es la posición del ministerio. ¿Qué les respondes?",
                opciones: [
                  { texto: "Que el ministerio enseña el arminianismo, porque lo sigue la mayoría de los pentecostales.", explica: "La mayoría de las iglesias pentecostales ha seguido una línea arminiana, pero la declaración de fe del ministerio no entra en esta pregunta." },
                  { texto: "Que la declaración de fe del ministerio enseña el calvinismo y rechaza lo demás.", explica: "La declaración de fe del ministerio no entra en esta pregunta." },
                  { texto: "Que la declaración de fe del ministerio no entra en esta pregunta.", bien: true, explica: "Así lo dice la lección: la declaración de fe del ministerio no entra en esta pregunta." },
                  { texto: "Que cada líder de célula decide cuál de las dos posiciones se enseña.", explica: "La declaración de fe no entra en esta pregunta, y el líder trata con respeto a los hermanos que piensan distinto." },
                ],
                apoyo: "La declaración de fe del ministerio no entra en esta pregunta",
                explica: "La declaración de fe del ministerio no entra en esta pregunta. El líder enseña con firmeza lo que todos coinciden y trata con respeto a los hermanos que piensan distinto en lo demás.",
              },
              {
                tipo: "explica",
                apoyo: "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia, que Dios toma la iniciativa, que el ser humano es responsable de arrepentirse y creer, y que el evangelio se anuncia a todos",
                ref: "Tito 2:11",
                clave: {
                  id: "pr-n4-sistematica-3-3-a5-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras cómo cerrarías la discusión con Andrés y Sofía.",
                  ideas: [
                    { id: "coinciden", peso: 50, texto: "Recordando en lo que todos coinciden: la salvación es solo por gracia, Dios toma la iniciativa y el ser humano es responsable de arrepentirse y creer.", formas: ["solo por gracia", "por gracia", "por (la|su) gracia", "toma la iniciativa", "iniciativa", "primer paso", "responsab*", "(debe|deben|debemos) (arrepentirse|creer)", "arrepentirse y creer", "coincid*", "de acuerdo", "evangelio (se anuncia|a todos|para todos)"] },
                    { id: "respeto", peso: 50, texto: "Pidiendo que se traten con respeto, como hermanos que piensan distinto en lo demás.", formas: ["trat* con (respeto|amor|carino)", "(se|nos|los|las|lo|la|le) (respeten|respetemos|respetamos|respetaria|respetaremos)", "respetar*", "respetand*", "con amor", "como hermano*", "como a un hermano", "piens* distinto", "sin (pelear|discutir|division*|despreciar*)", "no (pelear|peleen|discutir|discutan|despreciar*)"] },
                  ],
                  errores: [
                    { id: "lado", texto: "La declaración de fe del ministerio no entra en esta pregunta: el líder trata con respeto a los dos.", formas: ["(andres|sofia) tiene (la|toda la) razon", "(el|ella) tiene (la|toda la) razon", "(calvinismo|arminianismo) (es|esta) (correcto|en lo cierto)"], anula: "respeto" },
                  ],
                  modelo: "Les recordaría en lo que todos coinciden: la salvación es solo por gracia, Dios toma la iniciativa y cada uno es responsable de creer. Y les pediría que se respeten como hermanos que piensan distinto en lo demás.",
                },
              },
            ],
          },
          {
            apoyo: "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia",
            ref: "Tito 2:11",
            titulo: "Un hermano que piensa distinto sobre la elección",
            relato: [
              "Enseñas la clase de adultos. Llega a la iglesia Tomás, un hermano que viene de una iglesia de línea calvinista.",
              "Algunos de tu clase le dicen que está equivocado y lo miran con desconfianza. Tomás se siente rechazado y te pide hablar.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "Para entender a Tomás, ¿qué enseña el calvinismo sobre la elección?",
                opciones: [
                  { texto: "Que Dios elige a quienes salvará sin depender de nada en ellos.", bien: true, explica: "Así lo presenta la lección: el calvinismo enseña una elección que no depende de nada en el ser humano." },
                  { texto: "Que Dios elige a los que sabe de antemano que van a creer en él.", explica: "Eso enseña el arminianismo." },
                  { texto: "Que la salvación depende de las buenas obras que haga cada persona.", explica: "Los calvinistas subrayan que la salvación es toda de Dios." },
                  { texto: "Que el evangelio no se debe anunciar a todas las personas del mundo.", explica: "Calvinistas y arminianos evangélicos coinciden en que el evangelio se anuncia a todos." },
                ],
                apoyo: "El calvinismo, en la línea de Juan Calvino y del Sínodo de Dort (1618 y 1619), enseña que Dios elige a quienes salvará sin depender de nada en ellos, y que su gracia los lleva con seguridad a la fe",
                explica: "El calvinismo enseña que Dios elige a quienes salvará sin depender de nada en ellos, y que su gracia los lleva con seguridad a la fe.",
              },
              {
                tipo: "situacion",
                pregunta: "¿En qué coincides con Tomás, aunque piensen distinto sobre la elección?",
                opciones: [
                  { texto: "En que la salvación es solo por gracia y el evangelio se anuncia a todos.", bien: true, explica: "Es lo que coinciden calvinistas y arminianos evangélicos." },
                  { texto: "En nada: un calvinista y un arminiano no comparten ninguna verdad de la fe.", explica: "Coinciden en que la salvación es solo por gracia, que Dios toma la iniciativa y que el ser humano es responsable de creer." },
                  { texto: "Solo en que los dos asisten a una iglesia cristiana cada domingo.", explica: "Coinciden en mucho más: en que la salvación es solo por gracia y el evangelio se anuncia a todos." },
                  { texto: "En que el ser humano no tiene ninguna responsabilidad de arrepentirse ni de creer.", explica: "Coinciden en que el ser humano es responsable de arrepentirse y creer." },
                ],
                apoyo: "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia, que Dios toma la iniciativa, que el ser humano es responsable de arrepentirse y creer, y que el evangelio se anuncia a todos",
                explica: "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia, que Dios toma la iniciativa, que el ser humano es responsable de arrepentirse y creer, y que el evangelio se anuncia a todos.",
              },
              {
                tipo: "situacion",
                pregunta: "La clase te pide que digas qué enseña el ministerio sobre la elección. ¿Qué respondes?",
                opciones: [
                  { texto: "Que el ministerio no recibe en sus iglesias a quien siga la línea calvinista.", explica: "La declaración de fe no entra en esta pregunta, y el líder trata con respeto a los hermanos que piensan distinto." },
                  { texto: "Que la declaración de fe del ministerio no entra en esta pregunta.", bien: true, explica: "Así lo dice la lección: la declaración de fe del ministerio no entra en esta pregunta." },
                  { texto: "Que el ministerio enseña lo que diga la mayoría de los alumnos de la clase.", explica: "La declaración de fe del ministerio no entra en esta pregunta." },
                  { texto: "Que la declaración de fe obliga a todos a pensar como Tomás.", explica: "La declaración de fe del ministerio no entra en esta pregunta." },
                ],
                apoyo: "La declaración de fe del ministerio no entra en esta pregunta",
                explica: "La declaración de fe del ministerio no entra en esta pregunta: el líder enseña con firmeza lo que todos coinciden y trata con respeto a los que piensan distinto en lo demás.",
              },
              {
                tipo: "explica",
                apoyo: "El líder enseña estas verdades con firmeza y trata con respeto a los hermanos que piensan distinto en lo demás",
                ref: "Tito 2:11",
                clave: {
                  id: "pr-n4-sistematica-3-3-a5-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a tu clase sobre cómo recibir a Tomás.",
                  ideas: [
                    { id: "coinciden", peso: 50, texto: "Que coincidimos en lo principal: la salvación es solo por gracia, Dios toma la iniciativa y el evangelio se anuncia a todos.", formas: ["solo por gracia", "por gracia", "por (la|su) gracia", "toma la iniciativa", "iniciativa", "primer paso", "responsab*", "(debe|deben|debemos) (arrepentirse|creer)", "arrepentirse y creer", "coincid*", "de acuerdo", "evangelio (se anuncia|a todos|para todos)"] },
                    { id: "respeto", peso: 50, texto: "Que lo traten con respeto, como a un hermano que piensa distinto en lo demás.", formas: ["trat* con (respeto|amor|carino)", "(se|nos|los|las|lo|la|le) (respeten|respetemos|respetamos|respetaria|respetaremos)", "respetar*", "respetand*", "con amor", "como hermano*", "como a un hermano", "piens* distinto", "sin (pelear|discutir|division*|despreciar*|rechaz*)", "no (pelear|peleen|discutir|discutan|despreciar*|rechaz*)", "recib*"] },
                  ],
                  errores: [
                    { id: "rechazo", texto: "El líder trata con respeto a los hermanos que piensan distinto en lo demás.", formas: ["(esta|estas) equivocado", "(debe|tiene que) cambiar de (idea|posicion)", "que se vaya"], anula: "respeto" },
                  ],
                  modelo: "Les diría que coincidimos en lo principal: la salvación es solo por gracia, Dios toma la iniciativa y el evangelio se anuncia a todos. Por eso lo vamos a recibir y a tratar con respeto, como a un hermano que piensa distinto en lo demás.",
                },
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
            consigna: "Sobre lo que creen todos los evangélicos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia.", verdad: true, explica: "Coinciden en que la salvación es solo por gracia y en que Dios toma la iniciativa.", apoyo: "Calvinistas y arminianos evangélicos coinciden en que la salvación es solo por gracia" },
              { texto: "Solo los arminianos creen que el ser humano es responsable de arrepentirse y creer.", verdad: false, explica: "Calvinistas y arminianos evangélicos coinciden en que el ser humano es responsable de arrepentirse y creer.", apoyo: "que el ser humano es responsable de arrepentirse y creer" },
              { texto: "Calvinistas y arminianos evangélicos coinciden en que el evangelio se anuncia a todos.", verdad: true, explica: "Es una de las verdades en que todos coinciden.", apoyo: "y que el evangelio se anuncia a todos" },
            ],
          },
          {
            consigna: "Sobre la gracia y el respeto entre hermanos: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "Todos los evangélicos coinciden en que Dios toma la iniciativa en la salvación.", verdad: true, explica: "Calvinistas y arminianos coinciden en que Dios toma la iniciativa.", apoyo: "que Dios toma la iniciativa" },
              { texto: "La declaración de fe del ministerio decide entre el calvinismo y el arminianismo.", verdad: false, explica: "La declaración de fe del ministerio no entra en esta pregunta.", apoyo: "La declaración de fe del ministerio no entra en esta pregunta" },
              { texto: "El líder trata con respeto a los hermanos que piensan distinto sobre la elección.", verdad: true, explica: "El líder enseña con firmeza lo que todos coinciden y trata con respeto a los que piensan distinto en lo demás.", apoyo: "El líder enseña estas verdades con firmeza y trata con respeto a los hermanos que piensan distinto en lo demás" },
              { texto: "Quien entiende la elección de otra manera deja de ser un hermano en la fe.", verdad: false, explica: "La lección los llama hermanos que piensan distinto en lo demás, y pide tratarlos con respeto.", apoyo: "trata con respeto a los hermanos que piensan distinto en lo demás" },
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
            apoyo: "Todos coinciden en que la salvación es solo por gracia y el ser humano es responsable de creer",
            ref: "Tito 2:11",
            clave: {
              id: "pr-n4-sistematica-3-3-a7-1",
              tipo: "corta",
              pregunta: "¿En qué coinciden calvinistas y arminianos evangélicos sobre la salvación?",
              ideas: [
                { id: "gracia", peso: 50, texto: "En que la salvación es solo por gracia y Dios toma la iniciativa.", formas: ["solo por gracia", "por gracia", "por (la|su) gracia", "toma la iniciativa", "iniciativa", "primer paso", "dios (busca|llama|empieza) primero"] },
                { id: "responsable", peso: 50, texto: "En que el ser humano es responsable de arrepentirse y creer, y el evangelio se anuncia a todos.", formas: ["responsab*", "(debe|deben|debemos) (arrepentirse|creer)", "arrepentirse y creer", "tiene que (arrepentirse|creer)", "evangelio (se anuncia|a todos|para todos)", "anunci* (el evangelio|a todos)", "predic* a todos"] },
              ],
              errores: [
                { id: "obras", texto: "Todos coinciden en que la salvación es solo por gracia.", formas: ["salv* por (las|sus|nuestras|buenas) obras", "(ganar*|merec*) la salvacion"], anula: "gracia" },
              ],
              modelo: "Coinciden en que la salvación es solo por gracia y que Dios toma la iniciativa, en que el ser humano es responsable de arrepentirse y creer, y en que el evangelio se anuncia a todos.",
            },
          },
          {
            apoyo: "¿Cómo tratarías con respeto a un hermano que entiende la elección de otra manera?",
            ref: "Tito 2:11",
            clave: {
              id: "pr-n4-sistematica-3-3-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo tratarías con respeto a un hermano que entiende la elección de otra manera?",
              ideas: [
                { id: "firmeza", peso: 50, texto: "Enseñando con firmeza lo que todos coinciden: la salvación es solo por gracia y el ser humano es responsable de creer.", formas: ["solo por gracia", "por gracia", "por (la|su) gracia", "coincid*", "de acuerdo", "con firmeza", "iniciativa", "responsab*"] },
                { id: "respeto", peso: 50, texto: "Tratándolo con respeto, como a un hermano que piensa distinto en lo demás.", formas: ["trat* con (respeto|amor|carino)", "(se|nos|los|las|lo|la|le) (respeten|respetemos|respetamos|respetaria|respetaremos)", "respetar*", "respetand*", "con amor", "como hermano*", "como a un hermano", "piens* distinto", "sin (pelear|discutir|division*|despreciar*)", "no (pelear|peleen|discutir|discutan|despreciar*)", "escuch*"] },
              ],
              modelo: "Lo trataría con respeto, como a un hermano que piensa distinto en lo demás. Y enseñaría con firmeza lo que todos coinciden: la salvación es solo por gracia y cada uno es responsable de creer.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 4. La conversión, la regeneración y la justificación
    "n4-sistematica-3-4": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "¿Cuál es el lado humano de la salvación?", reverso: "La conversión.", apoyo: "La salvación tiene un lado humano, la conversión" },
              { frente: "¿Qué es arrepentirse?", reverso: "Dar la espalda al pecado.", apoyo: "Arrepentirse es dar la espalda al pecado" },
              { frente: "¿Qué es creer, según la lección?", reverso: "Volverse a Cristo y confiar en él.", apoyo: "creer es volverse a Cristo y confiar en él" },
              { frente: "Según Hechos 20:21, ¿qué dos cosas predicaba Pablo?", reverso: "«el arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo»", apoyo: "Pablo predicaba «el arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué cambia la regeneración?", reverso: "La naturaleza del creyente: le da una vida nueva desde adentro.", apoyo: "Cambia la naturaleza del creyente: le da una vida nueva desde adentro" },
              { frente: "¿Qué cambia la justificación?", reverso: "La posición ante Dios: el pecador es declarado justo.", apoyo: "la justificación, que cambia la posición ante Dios" },
              { frente: "¿Quién obra el nuevo nacimiento?", reverso: "El Espíritu.", apoyo: "La regeneración es el nuevo nacimiento que obra el Espíritu" },
              { frente: "¿Qué redescubrió Martín Lutero en el siglo XVI?", reverso: "Que somos justificados solo por la fe.", apoyo: "Fue la gran verdad de la Reforma del siglo XVI, cuando Martín Lutero redescubrió que somos justificados solo por la fe" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "mapa-ideas",
        versiones: [
          {
            consigna: "¿Qué es cada cara de la conversión? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "conv", texto: "La conversión", x: 50, y: 10 },
              { id: "arr", texto: "El arrepentimiento", x: 22, y: 48 },
              { id: "fe", texto: "La fe", x: 78, y: 48 },
              { id: "pec", texto: "El pecado", x: 22, y: 88 },
              { id: "cri", texto: "Cristo", x: 78, y: 88 },
            ],
            enlaces: [
              { de: "conv", a: "arr", relacion: "incluye" },
              { de: "conv", a: "fe", relacion: "incluye" },
              { de: "arr", a: "pec", relacion: "da la espalda a" },
              { de: "fe", a: "cri", relacion: "se vuelve y confía en" },
            ],
            distractores: ["compra el favor de", "reemplaza a"],
            apoyo: "Arrepentirse es dar la espalda al pecado; creer es volverse a Cristo y confiar en él",
            ref: "Hechos 20:21",
            explica: "La conversión tiene dos caras inseparables: arrepentirse es dar la espalda al pecado, y creer es volverse a Cristo y confiar en él.",
          },
          {
            consigna: "¿Qué predicaba Pablo, según Hechos 20:21? Elige cómo se une cada idea con la otra.",
            nodos: [
              { id: "pab", texto: "Pablo", x: 50, y: 10 },
              { id: "arr", texto: "El arrepentimiento", x: 22, y: 48 },
              { id: "fe", texto: "La fe", x: 78, y: 48 },
              { id: "dios", texto: "Dios", x: 22, y: 88 },
              { id: "cri", texto: "Nuestro Señor Jesucristo", x: 78, y: 88 },
            ],
            enlaces: [
              { de: "pab", a: "arr", relacion: "predicaba" },
              { de: "pab", a: "fe", relacion: "predicaba" },
              { de: "arr", a: "dios", relacion: "es para con" },
              { de: "fe", a: "cri", relacion: "está puesta en" },
            ],
            distractores: ["se gana con", "reemplaza a"],
            apoyo: "Pablo predicaba «el arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo»",
            ref: "Hechos 20:21",
            explica: "Pablo predicaba «el arrepentimiento para con Dios, y de la fe en nuestro Señor Jesucristo»: la conversión tiene dos caras inseparables.",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Es de la regeneración o de la justificación? Lleva cada frase a su grupo.",
            grupos: ["La regeneración", "La justificación"],
            frases: [
              { texto: "Cambia la naturaleza del creyente", grupo: 0 },
              { texto: "Es el nuevo nacimiento que obra el Espíritu", grupo: 0 },
              { texto: "Hace del creyente una nueva criatura", grupo: 0 },
              { texto: "Le da una vida nueva desde adentro", grupo: 0 },
              { texto: "Cambia la posición ante Dios", grupo: 1 },
              { texto: "Es una declaración, como la sentencia de un juez", grupo: 1 },
              { texto: "El pecador es declarado justo", grupo: 1 },
              { texto: "A Abraham la fe le fue contada por justicia", grupo: 1 },
            ],
            apoyo: "En la regeneración el Espíritu hace del creyente una nueva criatura: cambia su naturaleza. En la justificación Dios lo declara justo: cambia su posición",
            explica: "La regeneración es el nuevo nacimiento que obra el Espíritu: cambia la naturaleza. La justificación es una declaración de Dios, como la sentencia de un juez: cambia la posición ante Dios.",
          },
          {
            consigna: "¿Habla de la regeneración o de la justificación? Lleva cada frase a su grupo.",
            grupos: ["Regeneración: nueva naturaleza", "Justificación: nueva posición"],
            frases: [
              { texto: "«si alguno está en Cristo, nueva criatura es»", grupo: 0 },
              { texto: "«las cosas viejas pasaron»", grupo: 0 },
              { texto: "Nacer de nuevo por obra del Espíritu", grupo: 0 },
              { texto: "«el hombre es justificado por fe sin las obras de la ley»", grupo: 1 },
              { texto: "Dios «justifica al impío» que cree", grupo: 1 },
              { texto: "Delante de Dios, el que cree ya está declarado justo", grupo: 1 },
            ],
            apoyo: "La regeneración es el nuevo nacimiento que obra el Espíritu: «si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron»",
            explica: "2 Corintios 5:17 habla de la regeneración: el creyente es una nueva criatura. Romanos 3:28 y 4:5 hablan de la justificación: Dios declara justo al que cree.",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa qué es la justificación.",
            texto: "La justificación es como la [[sentencia]] de un [[juez]]: Dios declara [[justo]] al pecador que cree.",
            distractores: ["cirugía", "médico", "culpable"],
            errores: {
              "cirugía": "La justificación es una declaración de Dios, como la sentencia de un juez.",
              "médico": "La lección la compara con la sentencia de un juez.",
              culpable: "Dios «justifica al impío» que cree: lo declara justo.",
            },
            apoyo: "La justificación es una declaración de Dios, como la sentencia de un juez: el pecador es declarado justo",
            ref: "Romanos 4:3-5",
            explica: "La justificación es una declaración de Dios, como la sentencia de un juez: el pecador que cree es declarado justo. Cambia su posición ante Dios.",
          },
          {
            consigna: "Completa el ejemplo que da Pablo en Romanos 4:3.",
            texto: "Somos justificados por la fe sin las obras de la ley, como [[Abraham]]: él [[creyó]] a Dios, y le fue contado por [[justicia]].",
            distractores: ["Moisés", "pagó", "pecado"],
            errores: {
              "Moisés": "El ejemplo de la lección es Abraham: «Creyó Abraham a Dios, y le fue contado por justicia».",
              "pagó": "Abraham creyó a Dios: fue justificado por la fe, sin las obras de la ley.",
              pecado: "A Abraham la fe le fue contada por justicia.",
            },
            apoyo: "Somos justificados por la fe sin las obras de la ley, como Abraham",
            ref: "Romanos 4:3-5",
            explica: "Pablo concluye: «el hombre es justificado por fe sin las obras de la ley». Así fue con Abraham: «Creyó Abraham a Dios, y le fue contado por justicia».",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Gálatas 2:16, ¿por medio de qué nadie será justificado? Toca las palabras que lo dicen.",
            texto: "por las [[obras de la ley]] nadie será justificado",
            apoyo: "Pablo es claro: «por las obras de la ley nadie será justificado»",
            ref: "Gálatas 2:16",
            explica: "Pablo es claro: «por las obras de la ley nadie será justificado». Somos justificados solo por la fe.",
          },
          {
            consigna: "Según Romanos 5:1, ¿qué tenemos para con Dios los justificados por la fe? Toca la palabra que lo dice.",
            texto: "Justificados, pues, por la fe, tenemos [[paz]] para con Dios por medio de nuestro Señor Jesucristo",
            apoyo: "Y el fruto es la paz",
            ref: "Romanos 5:1",
            explica: "El fruto de la justificación es la paz: «Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo». Es el versículo de memoria de esta materia.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "caso",
        versiones: [
          {
            apoyo: "Delante de Dios, el que cree en Cristo ya está declarado justo",
            ref: "Romanos 4:3-5",
            titulo: "Un nuevo creyente que quiere ganarse el perdón",
            relato: [
              "Martín se entregó a Cristo hace un mes y va a la clase de nuevos creyentes que tú enseñas.",
              "Te cuenta que no se siente justo delante de Dios. Piensa que primero tiene que hacer muchas obras buenas para que Dios lo acepte, y que solo entonces tendrá paz.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿Qué es la justificación, para explicárselo a Martín?",
                opciones: [
                  { texto: "Una declaración de Dios, como la sentencia de un juez: el pecador es declarado justo.", bien: true, explica: "La justificación es una declaración de Dios: cambia la posición del pecador ante Dios." },
                  { texto: "Un premio que Dios da al final de la vida a quien hizo bastantes obras buenas.", explica: "Somos justificados por la fe sin las obras de la ley." },
                  { texto: "Lo mismo que la regeneración: un cambio de naturaleza que se siente por dentro.", explica: "La regeneración cambia la naturaleza; la justificación es una declaración que cambia la posición ante Dios." },
                  { texto: "Un esfuerzo de cada día para llegar a ser justo con las propias fuerzas, sin ayuda de nadie.", explica: "Dios «justifica al impío» que cree: no es un logro de nuestras fuerzas." },
                ],
                apoyo: "La justificación es una declaración de Dios, como la sentencia de un juez: el pecador es declarado justo",
                explica: "La justificación es una declaración de Dios, como la sentencia de un juez: el pecador que cree es declarado justo.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué ejemplo de la Biblia le muestras a Martín?",
                opciones: [
                  { texto: "Moisés: cumplió la ley con cuidado, y por eso Dios lo declaró justo.", explica: "Pablo es claro: «por las obras de la ley nadie será justificado»." },
                  { texto: "Abraham: creyó a Dios, y le fue contado por justicia.", bien: true, explica: "Así fue con Abraham: «Creyó Abraham a Dios, y le fue contado por justicia»." },
                  { texto: "Ninguno: la Biblia no da ejemplos de alguien justificado por la fe.", explica: "Pablo da el ejemplo de Abraham, a quien la fe le fue contada por justicia." },
                  { texto: "Martín Lutero: se ganó la justicia con sus muchas obras en la Reforma.", explica: "Lutero redescubrió que somos justificados solo por la fe." },
                ],
                apoyo: "Así fue con Abraham: «Creyó Abraham a Dios, y le fue contado por justicia»",
                ref: "Romanos 4:3-5",
                explica: "Abraham creyó a Dios, y le fue contado por justicia: fue justificado por la fe, sin las obras de la ley.",
              },
              {
                tipo: "situacion",
                pregunta: "Martín dice que solo tendrá paz cuando haya hecho bastantes obras. ¿Qué le muestras?",
                opciones: [
                  { texto: "Romanos 5:1: justificados por la fe, tenemos paz para con Dios.", bien: true, explica: "El fruto de la justificación por la fe es la paz para con Dios." },
                  { texto: "Que la paz con Dios llega cuando uno cumple todas las obras de la ley.", explica: "La paz es el fruto de ser justificados por la fe, no por las obras de la ley." },
                  { texto: "Que la paz con Dios depende de cuánto amor de Dios sienta cada día.", explica: "La paz es el fruto de la justificación por la fe: «tenemos paz para con Dios»." },
                  { texto: "Que nadie puede tener paz con Dios mientras siga viviendo en este mundo.", explica: "Romanos 5:1 dice «tenemos paz»: los justificados por la fe ya la tienen." },
                ],
                apoyo: "Y el fruto es la paz",
                ref: "Romanos 5:1",
                explica: "El fruto de la justificación es la paz: «Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo».",
              },
              {
                tipo: "explica",
                apoyo: "Somos justificados por la fe sin las obras de la ley, como Abraham",
                ref: "Romanos 3:28",
                clave: {
                  id: "pr-n4-sistematica-3-4-a6-1",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Martín sobre cómo somos justificados.",
                  ideas: [
                    { id: "fe", peso: 50, texto: "Que somos justificados por la fe en Cristo, sin las obras de la ley.", formas: ["por (la|su) fe", "por medio de la fe", "solo por (la|su) fe", "cree* en (cristo|jesus|jesucristo)", "sin (las|nuestras|sus|tus) obras", "no por (las|sus|tus|nuestras) obras", "no por obras", "no (es|son) por obras"] },
                    { id: "declarado", peso: 50, texto: "Que Dios ya lo declaró justo, como la sentencia de un juez, y justificado por la fe tiene paz para con Dios.", formas: ["declar* justo", "(lo|te|nos|ya) declar*", "(es|eres|esta|estas) declarado", "ya (es|eres) justo", "tiene* paz", "tenemos paz", "ya (tiene|tienes|tenemos) paz", "sentencia", "juez"] },
                  ],
                  errores: [
                    { id: "obras", texto: "Somos justificados por la fe sin las obras de la ley.", formas: ["(ganar*|merec*) (el|su|tu|la) (perdon|salvacion|justificacion)", "justific* por (las|sus|tus|nuestras|buenas) obras", "salv* por (las|sus|tus|nuestras|buenas) obras", "primero (las|sus|tus|hacer) obras"], anula: "fe" },
                  ],
                  modelo: "Le diría que somos justificados por la fe en Cristo, sin las obras de la ley, como Abraham. Dios ya lo declaró justo, como la sentencia de un juez, y justificado por la fe tiene paz para con Dios.",
                },
              },
            ],
          },
          {
            apoyo: "Dios «justifica al impío» que cree",
            ref: "Romanos 4:3-5",
            titulo: "Una hermana que se siente demasiado mala para Dios",
            relato: [
              "Rosa llegó a la iglesia después de una vida muy desordenada, y ahora quiere seguir a Cristo.",
              "Te dice que Dios solo justifica a la gente buena, y que ella primero tiene que cumplir la ley por años para que Dios la declare justa.",
            ],
            pasos: [
              {
                tipo: "situacion",
                pregunta: "¿A quién justifica Dios, según Romanos 4:5?",
                opciones: [
                  { texto: "Al impío que cree: Dios justifica al impío.", bien: true, explica: "Dios «justifica al impío» que cree: también a Rosa, si cree." },
                  { texto: "Solo a quien ya cumplió la ley durante muchos años de su vida.", explica: "Pablo es claro: «por las obras de la ley nadie será justificado»." },
                  { texto: "Solo a los que nunca tuvieron una vida desordenada antes de creer.", explica: "Dios «justifica al impío» que cree." },
                  { texto: "A todos por igual, crean o no crean en nuestro Señor Jesucristo.", explica: "Dios justifica al impío que cree: la justificación es por la fe." },
                ],
                apoyo: "Dios «justifica al impío» que cree",
                explica: "Dios «justifica al impío» que cree: así fue con Abraham, a quien la fe le fue contada por justicia.",
              },
              {
                tipo: "situacion",
                pregunta: "¿Qué dice Pablo sobre cumplir la ley para ser justificado?",
                opciones: [
                  { texto: "Que por las obras de la ley nadie será justificado.", bien: true, explica: "Pablo es claro: «por las obras de la ley nadie será justificado»." },
                  { texto: "Que solo los que cumplen toda la ley serán justificados al final.", explica: "Pablo concluye: «el hombre es justificado por fe sin las obras de la ley»." },
                  { texto: "Que la ley justifica a quien la cumple con mucho esfuerzo y constancia.", explica: "«por las obras de la ley nadie será justificado»." },
                  { texto: "Que la fe sirve solo para quien primero cumplió todas las obras de la ley.", explica: "Somos justificados por la fe sin las obras de la ley." },
                ],
                apoyo: "Pablo es claro: «por las obras de la ley nadie será justificado»",
                ref: "Gálatas 2:16",
                explica: "Pablo concluye: «el hombre es justificado por fe sin las obras de la ley», y es claro: «por las obras de la ley nadie será justificado».",
              },
              {
                tipo: "situacion",
                pregunta: "Rosa pregunta si esta enseñanza es una idea nueva. ¿Qué le cuentas?",
                opciones: [
                  { texto: "Que fue la gran verdad de la Reforma del siglo XVI, con Martín Lutero.", bien: true, explica: "En la Reforma del siglo XVI, Martín Lutero redescubrió que somos justificados solo por la fe." },
                  { texto: "Que es una idea de estos tiempos, que nadie enseñó antes en la iglesia.", explica: "Fue la gran verdad de la Reforma del siglo XVI, y Pablo ya la enseñaba." },
                  { texto: "Que la Reforma enseñó lo contrario: que somos justificados por las obras.", explica: "Lutero redescubrió que somos justificados solo por la fe." },
                  { texto: "Que Martín Lutero la rechazó, porque pensaba que la fe no basta.", explica: "Lutero redescubrió que somos justificados solo por la fe." },
                ],
                apoyo: "Fue la gran verdad de la Reforma del siglo XVI, cuando Martín Lutero redescubrió que somos justificados solo por la fe",
                explica: "La justificación por la fe fue la gran verdad de la Reforma del siglo XVI, cuando Martín Lutero redescubrió que somos justificados solo por la fe.",
              },
              {
                tipo: "explica",
                apoyo: "Delante de Dios, el que cree en Cristo ya está declarado justo",
                ref: "Romanos 4:3-5",
                clave: {
                  id: "pr-n4-sistematica-3-4-a6-2",
                  tipo: "corta",
                  pregunta: "Escribe en pocas palabras lo que le dirías a Rosa.",
                  ideas: [
                    { id: "impio", peso: 50, texto: "Que Dios justifica al impío que cree: es justificada por la fe, sin las obras de la ley.", formas: ["justifica al impio", "impio*", "por (la|su) fe", "por medio de la fe", "solo por (la|su) fe", "cree* en (cristo|jesus|jesucristo)", "sin (las|nuestras|sus|tus) obras", "no por (las|sus|tus|nuestras) obras", "no por obras"] },
                    { id: "declarada", peso: 50, texto: "Que, si cree en Cristo, Dios ya la declara justa y tiene paz para con Dios.", formas: ["declar* just*", "(la|te|nos|ya) declar*", "(es|eres|esta|estas) declarada", "ya (es|eres) justa", "tiene* paz", "tenemos paz", "ya (tiene|tienes|tenemos) paz", "sentencia", "juez"] },
                  ],
                  errores: [
                    { id: "ley", texto: "Por las obras de la ley nadie será justificado.", formas: ["debe cumplir la ley", "tiene que cumplir la ley", "primero cumpl*", "justific* por (las|sus|tus|nuestras|buenas) obras", "(ganar*|merec*) (el|su|tu|la) (perdon|salvacion|justificacion)"], anula: "impio" },
                  ],
                  modelo: "Le diría que Dios justifica al impío que cree: ella es justificada por la fe en Cristo, sin las obras de la ley. Si cree, Dios ya la declara justa, y tiene paz para con Dios.",
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
            apoyo: "¿Cómo explicarías a un nuevo creyente la diferencia entre ser justificado y ser regenerado?",
            ref: "2 Corintios 5:17",
            clave: {
              id: "pr-n4-sistematica-3-4-a7-1",
              tipo: "corta",
              pregunta: "¿Cómo explicarías a un nuevo creyente la diferencia entre ser justificado y ser regenerado?",
              ideas: [
                { id: "regeneracion", peso: 50, texto: "La regeneración es el nuevo nacimiento que obra el Espíritu: cambia la naturaleza y hace del creyente una nueva criatura.", formas: ["cambia (la|su|nuestra|tu) naturaleza", "nueva naturaleza", "nueva criatura", "nuevo nacimiento", "nac* de nuevo", "vida nueva", "nueva vida", "desde adentro", "por dentro"] },
                { id: "justificacion", peso: 50, texto: "La justificación es una declaración de Dios, como la sentencia de un juez: cambia la posición y declara justo al pecador.", formas: ["cambia (la|su|nuestra|tu) posicion", "nueva posicion", "posicion ante dios", "declar* justo*", "(nos|lo|te|le) declara", "declaracion", "sentencia", "juez"] },
              ],
              errores: [
                { id: "justif-naturaleza", texto: "La justificación cambia la posición ante Dios; la que cambia la naturaleza es la regeneración.", formas: ["justifica* cambia (la|su|nuestra|tu) naturaleza"], anula: "justificacion" },
                { id: "regen-posicion", texto: "La regeneración cambia la naturaleza; la que cambia la posición es la justificación.", formas: ["regenera* cambia (la|su|nuestra|tu) posicion"], anula: "regeneracion" },
              ],
              modelo: "Le diría que la regeneración es el nuevo nacimiento que obra el Espíritu: cambia su naturaleza y lo hace nueva criatura. La justificación es una declaración de Dios, como la sentencia de un juez: cambia su posición y lo declara justo.",
            },
          },
          {
            apoyo: "La salvación tiene un lado humano, la conversión, y una obra de Dios en dos aspectos: la regeneración, que cambia la naturaleza, y la justificación, que cambia la posición ante Dios",
            ref: "Romanos 3:28",
            clave: {
              id: "pr-n4-sistematica-3-4-a7-2",
              tipo: "corta",
              pregunta: "Un hermano dice que ser regenerado y ser justificado son lo mismo. ¿Qué le respondes?",
              ideas: [
                { id: "regeneracion", peso: 50, texto: "La regeneración es el nuevo nacimiento que obra el Espíritu: cambia la naturaleza.", formas: ["cambia (la|su|nuestra|tu) naturaleza", "nueva naturaleza", "nueva criatura", "nuevo nacimiento", "nac* de nuevo", "vida nueva", "nueva vida", "desde adentro", "por dentro"] },
                { id: "justificacion", peso: 50, texto: "La justificación es una declaración de Dios: cambia la posición y declara justo al pecador.", formas: ["cambia (la|su|nuestra|tu) posicion", "nueva posicion", "posicion ante dios", "declar* justo*", "(nos|lo|te|le) declara", "declaracion", "sentencia", "juez"] },
              ],
              errores: [
                { id: "mismo-1", texto: "Son dos aspectos de la obra de Dios: la regeneración cambia la naturaleza y la justificación, la posición.", formas: ["(son|es) lo mismo", "(son|es) iguales", "misma cosa"], anula: "regeneracion" },
                { id: "mismo-2", texto: "Son dos aspectos de la obra de Dios: la regeneración cambia la naturaleza y la justificación, la posición.", formas: ["(son|es) lo mismo", "(son|es) iguales", "misma cosa"], anula: "justificacion" },
                { id: "justif-naturaleza", texto: "La justificación cambia la posición ante Dios; la que cambia la naturaleza es la regeneración.", formas: ["justifica* cambia (la|su|nuestra|tu) naturaleza"], anula: "justificacion" },
                { id: "regen-posicion", texto: "La regeneración cambia la naturaleza; la que cambia la posición es la justificación.", formas: ["regenera* cambia (la|su|nuestra|tu) posicion"], anula: "regeneracion" },
              ],
              modelo: "Le respondería que no son lo mismo: son dos aspectos de la obra de Dios. La regeneración es el nuevo nacimiento que obra el Espíritu y cambia la naturaleza. La justificación es una declaración de Dios: cambia la posición y declara justo al pecador.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 5. La adopción y la santificación
    "n4-sistematica-3-5": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Gálatas 4:5, ¿para qué vino Cristo?", reverso: "«a fin de que recibiésemos la adopción de hijos»", apoyo: "Cristo vino «a fin de que recibiésemos la adopción de hijos»" },
              { frente: "¿Qué clama el Espíritu en el corazón del creyente?", reverso: "«¡Abba, Padre!»", apoyo: "El Espíritu en el corazón clama «¡Abba, Padre!»" },
              { frente: "¿Qué cambio trae la adopción?", reverso: "Un cambio de identidad: ya no esclavo, sino hijo y heredero.", apoyo: "el resultado es un cambio de identidad" },
              { frente: "¿De qué se asombra Juan en 1 Juan 3:1?", reverso: "Del amor del Padre, que nos llama hijos de Dios.", apoyo: "Juan se asombra: «Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios»" },
            ],
          },
          {
            tarjetas: [
              { frente: "¿Qué dos regalos más de la salvación estudia esta lección?", reverso: "La adopción y la santificación.", apoyo: "La adopción y la santificación son dos regalos más de la salvación" },
              { frente: "Además de declararlo justo, ¿qué hace Dios con el pecador?", reverso: "Lo recibe en su familia y empieza a hacerlo santo.", apoyo: "Dios no solo declara justo al pecador: lo recibe en su familia y empieza a hacerlo santo" },
              { frente: "Si el creyente es hijo, ¿qué más es, según Gálatas 4:7?", reverso: "Heredero de Dios por medio de Cristo.", apoyo: "«ya no eres esclavo, sino hijo; y si hijo, también heredero de Dios por medio de Cristo»" },
              { frente: "¿Desde dónde crece el hijo de Dios hacia la madurez?", reverso: "Desde la seguridad del amor del Padre.", apoyo: "Eres hijo antes de ser maduro: crece desde la seguridad del amor del Padre" },
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
            consigna: "Completa lo que trae la adopción.",
            texto: "Por la adopción, el creyente es [[hijo]] y [[heredero]] de Dios, y el Espíritu clama en él: Abba, [[Padre]].",
            distractores: ["esclavo", "deudor", "juez"],
            errores: {
              esclavo: "Por la adopción, el creyente ya no es esclavo, sino hijo.",
              deudor: "Si hijo, también heredero de Dios por medio de Cristo.",
              juez: "El Espíritu en el corazón clama: Abba, Padre.",
            },
            apoyo: "Por la adopción, el creyente ya no es esclavo, sino hijo y heredero de Dios, y el Espíritu clama en él: Abba, Padre",
            ref: "Gálatas 4:4-7",
            explica: "Por la adopción, el creyente ya no es esclavo, sino hijo y heredero de Dios, y el Espíritu clama en su corazón: «¡Abba, Padre!».",
          },
          {
            consigna: "Completa qué resultado trae la obra de Cristo según Gálatas 4.",
            texto: "Cristo vino para que recibiéramos la [[adopción]] de [[hijos]], y el resultado es un cambio de [[identidad]].",
            distractores: ["condena", "siervos", "ánimo"],
            errores: {
              condena: "Cristo vino «a fin de que recibiésemos la adopción de hijos».",
              siervos: "Es la adopción de hijos: «ya no eres esclavo, sino hijo».",
              "ánimo": "La adopción trae un cambio de identidad: de esclavo a hijo.",
            },
            apoyo: "el resultado es un cambio de identidad",
            ref: "Gálatas 4:4-7",
            explica: "Cristo vino «a fin de que recibiésemos la adopción de hijos», y el resultado es un cambio de identidad: «ya no eres esclavo, sino hijo».",
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "clasifica",
        versiones: [
          {
            consigna: "¿Qué aspecto de la santificación es: posicional, progresiva o final? Lleva cada frase a su grupo.",
            grupos: ["Posicional", "Progresiva", "Final"],
            frases: [
              { texto: "En Cristo ya fue apartado para Dios", grupo: 0 },
              { texto: "Santificado por la ofrenda de Cristo, hecha una vez para siempre", grupo: 0 },
              { texto: "Ya somos santos en Cristo", grupo: 0 },
              { texto: "Crece cada día", grupo: 1 },
              { texto: "Pablo dice: «No que lo haya alcanzado ya»", grupo: 1 },
              { texto: "Estamos llegando a ser santos en la vida diaria", grupo: 1 },
              { texto: "Cuando Cristo se manifieste", grupo: 2 },
              { texto: "«seremos semejantes a él»", grupo: 2 },
            ],
            apoyo: "La santificación tiene tres aspectos: posicional, porque ya fuimos santificados por la ofrenda de Cristo hecha una vez para siempre; progresiva, porque proseguimos a la meta; y final, porque seremos semejantes a él",
            explica: "Posicional: en Cristo el creyente ya fue apartado para Dios. Progresiva: crece cada día y prosigue a la meta. Final: cuando Cristo se manifieste, seremos semejantes a él.",
          },
          {
            consigna: "¿Es la santificación posicional, la progresiva o la final? Lleva cada frase a su grupo.",
            grupos: ["Posicional: ya en Cristo", "Progresiva: cada día", "Final: cuando Cristo se manifieste"],
            frases: [
              { texto: "Ya fuimos santificados por la ofrenda de Cristo", grupo: 0 },
              { texto: "Apartados para Dios desde que estamos en Cristo", grupo: 0 },
              { texto: "«prosigo a la meta»", grupo: 1 },
              { texto: "Crecer en santidad paso a paso", grupo: 1 },
              { texto: "Pablo reconoce que todavía no lo ha alcanzado", grupo: 1 },
              { texto: "El creyente será semejante a Cristo", grupo: 2 },
              { texto: "Lo que el creyente espera para el día en que Cristo se manifieste", grupo: 2 },
            ],
            apoyo: "Ya somos santos en Cristo, y estamos llegando a serlo en la vida diaria",
            explica: "Ya fuimos santificados por la ofrenda de Cristo (posicional), proseguimos a la meta cada día (progresiva) y, cuando Cristo se manifieste, seremos semejantes a él (final).",
          },
        ],
      },
      {
        id: "a4",
        objetivo: 1,
        pieza: "pasaje",
        versiones: [
          {
            consigna: "Según Hebreos 10:14, ¿con qué hizo perfectos para siempre a los santificados? Toca las palabras que lo dicen.",
            texto: "con [[una sola ofrenda]] hizo perfectos para siempre a los santificados",
            apoyo: "Hebreos une los dos primeros aspectos: «con una sola ofrenda hizo perfectos para siempre a los santificados», es decir, a los que están siendo santificados",
            ref: "Hebreos 10:14",
            explica: "Hebreos une los dos primeros aspectos: «con una sola ofrenda hizo perfectos para siempre a los santificados», es decir, a los que están siendo santificados.",
          },
          {
            consigna: "Según Hebreos 10:10, ¿cuántas veces se hizo la ofrenda que nos santifica? Toca las palabras que lo dicen.",
            texto: "somos santificados mediante la ofrenda del cuerpo de Jesucristo hecha [[una vez para siempre]]",
            apoyo: "Posicional: en Cristo el creyente ya fue apartado para Dios: «somos santificados mediante la ofrenda del cuerpo de Jesucristo hecha una vez para siempre»",
            ref: "Hebreos 10:10",
            explica: "Es la santificación posicional: en Cristo el creyente ya fue apartado para Dios por la ofrenda de Jesucristo, hecha una vez para siempre.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "relaciona",
        versiones: [
          {
            consigna: "Según la lección, ¿qué enseña cada uno sobre la santificación completa? Une cada uno con lo que enseña.",
            pares: [
              ["Juan Wesley", "Enseñó una perfección cristiana"],
              ["Algunas iglesias pentecostales de tradición de santidad", "Hablan de una santificación completa como una experiencia definida"],
              ["Otras iglesias", "La ven como un proceso que dura toda la vida"],
              ["El artículo 7 de la declaración de fe", "La presenta como una posición en Cristo y un crecimiento diario"],
            ],
            apoyo: "Juan Wesley enseñó una perfección cristiana, y algunas iglesias pentecostales de tradición de santidad hablan de una santificación completa como una experiencia definida",
            explica: "Juan Wesley enseñó una perfección cristiana; algunas iglesias de tradición de santidad hablan de una santificación completa como una experiencia definida, y otras la ven como un proceso. El artículo 7 la presenta como posición en Cristo y crecimiento diario.",
          },
          {
            consigna: "Une cada manera de ver la santificación con quien la enseña, según la lección.",
            pares: [
              ["Una perfección cristiana", "La enseñó Juan Wesley"],
              ["Una experiencia definida", "De ella hablan algunas iglesias pentecostales de santidad"],
              ["Un proceso que dura toda la vida", "Así la ven otras iglesias"],
              ["Una posición en Cristo y un crecimiento diario", "Así la presenta el artículo 7 de la declaración de fe"],
            ],
            apoyo: "El artículo 7 de la declaración de fe la presenta como una posición en Cristo y un crecimiento diario por el Espíritu, la Palabra, la oración y la obediencia",
            explica: "La lección presenta las posiciones con respeto: Wesley enseñó una perfección cristiana, algunas iglesias de santidad hablan de una experiencia definida y otras, de un proceso de toda la vida. El artículo 7 habla de posición en Cristo y crecimiento diario.",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 0,
        pieza: "situacion",
        versiones: [
          {
            caso: "Un joven que discipulas te dice: Todavía fallo mucho; no me siento digno de llamar Padre a Dios hasta que sea maduro.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que es hijo antes de ser maduro, y que crezca desde la seguridad del amor del Padre.", bien: true, explica: "Es lo que enseña la lección: eres hijo antes de ser maduro." },
              { texto: "Que tiene razón: primero debe madurar del todo, y solo después Dios lo recibirá como hijo.", explica: "Por la adopción, el creyente ya es hijo, y el Espíritu clama en él: Abba, Padre." },
              { texto: "Que no se preocupe por crecer, porque su santificación ya está terminada.", explica: "La santificación también es progresiva: crece cada día y prosigue a la meta." },
              { texto: "Que espere a sentirse digno, y que mientras tanto no le hable a Dios como Padre.", explica: "El Espíritu en el corazón del hijo clama «¡Abba, Padre!»." },
            ],
            apoyo: "Eres hijo antes de ser maduro: crece desde la seguridad del amor del Padre",
            ref: "Gálatas 4:4-7",
            explica: "Por la adopción, el creyente ya no es esclavo, sino hijo, y el Espíritu clama en él: Abba, Padre. Es hijo antes de ser maduro, y crece desde la seguridad del amor del Padre.",
          },
          {
            caso: "Una hermana nueva te dice: Siento que Dios me trata como a una esclava, y que tengo que ganarme su cariño.",
            pregunta: "¿Qué le respondes?",
            opciones: [
              { texto: "Que por la adopción ya no es esclava, sino hija y heredera de Dios.", bien: true, explica: "Es lo que enseña Gálatas 4:7: ya no eres esclavo, sino hijo, y también heredero." },
              { texto: "Que sí: los creyentes son siervos que deben ganarse el cariño de Dios.", explica: "La adopción es un regalo de la salvación: el creyente ya no es esclavo, sino hijo." },
              { texto: "Que Dios la ama solo cuando hace todo bien, como un patrón muy exigente.", explica: "«Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios»." },
              { texto: "Que la adopción es solo para los creyentes que llevan muchos años en la fe.", explica: "Por la adopción, el creyente ya es hijo: no hace falta llevar muchos años." },
            ],
            apoyo: "Por la adopción, el creyente ya no es esclavo, sino hijo y heredero de Dios",
            ref: "Gálatas 4:4-7",
            explica: "El resultado de la adopción es un cambio de identidad: «ya no eres esclavo, sino hijo; y si hijo, también heredero de Dios por medio de Cristo».",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 1,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La santificación tiene tres aspectos: posicional, porque ya fuimos santificados por la ofrenda de Cristo hecha una vez para siempre; progresiva, porque proseguimos a la meta; y final, porque seremos semejantes a él",
            ref: "Hebreos 10:10; Filipenses 3:12-14",
            clave: {
              id: "pr-n4-sistematica-3-5-a7-1",
              tipo: "corta",
              pregunta: "¿Cuáles son los tres aspectos de la santificación, y qué dice cada uno?",
              ideas: [
                { id: "posicional", peso: 34, texto: "Posicional: en Cristo el creyente ya fue apartado para Dios, por la ofrenda de Cristo hecha una vez para siempre.", formas: ["posicional", "ya (fue|fuimos|somos|estamos) (apartado*|santificado*|santos)", "apartado* para dios", "una vez para siempre", "ya somos santos"] },
                { id: "progresiva", peso: 33, texto: "Progresiva: crece cada día y prosigue a la meta.", formas: ["progresiv*", "prosig*", "a la meta", "crec* en santidad", "va creciendo", "vamos creciendo", "seguimos creciendo", "estamos llegando", "siendo santificados", "en la vida diaria"] },
                { id: "final", peso: 33, texto: "Final: cuando Cristo se manifieste, seremos semejantes a él.", formas: ["final", "semejantes a (el|cristo)", "se manifieste", "seremos semejantes", "seremos como (el|cristo)"] },
              ],
              modelo: "Posicional: en Cristo ya fuimos apartados para Dios por la ofrenda hecha una vez para siempre. Progresiva: crecemos cada día y proseguimos a la meta. Final: cuando Cristo se manifieste, seremos semejantes a él.",
            },
          },
          {
            apoyo: "Ya somos santos en Cristo, y estamos llegando a serlo en la vida diaria",
            ref: "Hebreos 10:14",
            clave: {
              id: "pr-n4-sistematica-3-5-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo une Hebreos los dos primeros aspectos de la santificación?",
              ideas: [
                { id: "ya", peso: 50, texto: "Ya somos santos en Cristo: con una sola ofrenda hizo perfectos para siempre a los santificados.", formas: ["ya somos santos", "ya (fuimos|fue|somos|estamos) (santificado*|apartado*|santos)", "una sola ofrenda", "perfectos para siempre", "hizo perfectos", "posicional"] },
                { id: "llegando", peso: 50, texto: "Y estamos llegando a serlo en la vida diaria: son los que están siendo santificados.", formas: ["estamos llegando", "llegando a ser*", "en la vida diaria", "siendo santificados", "progresiv*", "crec* en santidad", "vamos creciendo", "seguimos creciendo"] },
              ],
              modelo: "Hebreos dice que con una sola ofrenda hizo perfectos para siempre a los santificados: ya somos santos en Cristo. Y son los que están siendo santificados: estamos llegando a serlo en la vida diaria.",
            },
          },
        ],
      },
    ],
    // ------------------------------------------------------------ 6. La seguridad, la perseverancia y la glorificación
    // (la perseverancia es un punto por confirmar: no se pregunta por ese punto ni por sus dos posiciones)
    "n4-sistematica-3-6": [
      {
        id: "a1",
        objetivo: 0,
        pieza: "tarjetas",
        versiones: [
          {
            tarjetas: [
              { frente: "Según Romanos 8, ¿en qué descansa la seguridad del creyente?", reverso: "En el amor de Dios, del que nada creado nos puede separar.", apoyo: "La seguridad del creyente descansa en el amor de Dios, del que nada creado nos puede separar" },
              { frente: "¿Qué enseña el artículo 6 de la declaración de fe sobre la vida eterna?", reverso: "Que se puede tener su seguridad por las promesas de la Palabra.", apoyo: "El artículo 6 de la declaración de fe enseña que se puede tener la seguridad de la vida eterna por las promesas de la Palabra" },
              { frente: "¿En qué termina la salvación?", reverso: "En la glorificación.", apoyo: "La salvación termina en la glorificación" },
              { frente: "¿Qué recibirá el creyente en la venida de Cristo?", reverso: "Un cuerpo glorioso, y será libre del pecado para siempre.", apoyo: "En la venida de Cristo el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre" },
            ],
          },
          {
            tarjetas: [
              { frente: "Según la lección, ¿tu seguridad está en lo que sientes o en Cristo?", reverso: "En lo fiel que es Cristo, no en lo fuerte que te sientes.", apoyo: "Tu seguridad no está en lo fuerte que te sientes, sino en lo fiel que es Cristo" },
              { frente: "Según 2 Pedro 1:10, ¿a qué llama la Biblia a cada creyente?", reverso: "A permanecer firme: «procurad hacer firme vuestra vocación y elección».", apoyo: "la Biblia llama a cada creyente a permanecer firme: «procurad hacer firme vuestra vocación y elección»" },
              { frente: "¿Qué dice Romanos 8:30 de los que Dios justificó?", reverso: "«a éstos también glorificó»", apoyo: "«a los que justificó, a éstos también glorificó»" },
              { frente: "¿Conforme a qué imagen será hecho el creyente?", reverso: "Conforme a la imagen de su Hijo.", apoyo: "hecho conforme «a la imagen de su Hijo»" },
            ],
          },
        ],
      },
      {
        id: "a2",
        objetivo: 0,
        pieza: "escenario",
        versiones: [
          {
            apoyo: "la seguridad descansa en Cristo y no en los sentimientos",
            ref: "Romanos 8:38-39",
            situacion: "Eres pastor asistente. Después del culto, Julio, un hermano fiel de la iglesia, te cuenta que lleva semanas dudando de su salvación.",
            escenas: [
              {
                id: "e1",
                narra: "Julio te dice: Antes sentía mucho gozo; ahora no siento nada, y tengo miedo de no ser salvo.",
                pregunta: "¿Qué le dices primero?",
                opciones: [
                  { texto: "Que su seguridad descansa en Cristo y no en lo que siente.", valor: 2, explica: "La seguridad descansa en Cristo y no en los sentimientos: no en lo fuerte que te sientes, sino en lo fiel que es Cristo.", siguiente: "e2" },
                  { texto: "Que ore más esta semana, para volver a sentir el gozo de antes.", valor: 1, explica: "Orar es bueno, pero su seguridad no depende de volver a sentir: descansa en Cristo.", siguiente: "e2" },
                  { texto: "Que si no siente nada, nadie puede saber si de verdad es salvo.", valor: 0, explica: "El artículo 6 de la declaración de fe enseña que se puede tener la seguridad de la vida eterna por las promesas de la Palabra.", siguiente: "e1b" },
                ],
              },
              {
                id: "e1b",
                narra: "Julio se queda más angustiado que antes.",
                pregunta: "¿Qué haces ahora?",
                opciones: [
                  { texto: "Corriges lo que dijiste: la Palabra da seguridad de la vida eterna.", valor: 2, explica: "Se puede tener la seguridad de la vida eterna por las promesas de la Palabra.", siguiente: "e2" },
                  { texto: "Le dices que siga así, esperando sentir algo para quedarse tranquilo.", valor: 0, explica: "La seguridad descansa en Cristo y no en los sentimientos.", siguiente: "e2" },
                ],
              },
              {
                id: "e2",
                narra: "Julio te pregunta: ¿Hay algo en la Biblia que me dé seguridad?",
                pregunta: "¿Qué texto le muestras?",
                opciones: [
                  { texto: "Romanos 8:38-39: nada creado nos podrá separar del amor de Dios.", valor: 2, explica: "La seguridad del creyente descansa en el amor de Dios: «ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro»." },
                  { texto: "Le cuentas cómo sentiste tú el amor de Dios en un momento difícil.", valor: 1, explica: "Un testimonio puede animar, pero la seguridad descansa en las promesas de la Palabra." },
                  { texto: "Le dices que la seguridad solo llega cuando vuelve la emoción.", valor: 0, explica: "La seguridad descansa en Cristo y no en los sentimientos." },
                ],
              },
              {
                id: "e3",
                narra: "Antes de irse, Julio te pregunta qué hacer en adelante.",
                pregunta: "¿Qué le aconsejas?",
                opciones: [
                  { texto: "Que se apoye en las promesas de la Palabra y permanezca firme.", valor: 2, explica: "La seguridad descansa en las promesas de la Palabra, y la Biblia llama a cada creyente a permanecer firme." },
                  { texto: "Que lea la Biblia cuando tenga ganas, y que espere a sentirse mejor.", valor: 1, explica: "Leer la Biblia es bueno, pero su seguridad no depende de sentirse mejor: descansa en Cristo." },
                  { texto: "Que mida su salvación cada mañana por lo que siente al levantarse.", valor: 0, explica: "Tu seguridad no está en lo fuerte que te sientes, sino en lo fiel que es Cristo." },
                ],
              },
            ],
          },
          {
            apoyo: "El artículo 6 de la declaración de fe enseña que se puede tener la seguridad de la vida eterna por las promesas de la Palabra",
            ref: "Romanos 8:38-39",
            situacion: "Eres maestra de nuevos creyentes. Carla, que se bautizó hace poco, te dice después de la clase que no sabe si de verdad es salva.",
            escenas: [
              {
                id: "e1",
                narra: "Carla te dice: Mi tía dice que nadie puede estar seguro de su salvación en esta vida.",
                pregunta: "¿Qué le respondes?",
                opciones: [
                  { texto: "Que se puede tener seguridad de la vida eterna por las promesas de la Palabra.", valor: 2, explica: "El artículo 6 de la declaración de fe enseña que se puede tener la seguridad de la vida eterna por las promesas de la Palabra." },
                  { texto: "Que respete a su tía, y que lo piense con calma durante toda la semana.", valor: 1, explica: "Respetar a su tía está bien, pero la Palabra da una respuesta clara: se puede tener seguridad de la vida eterna." },
                  { texto: "Que su tía tiene razón: la salvación solo se puede saber al final, cuando uno muere.", valor: 0, explica: "Si el creyente puede saber que es salvo tiene una respuesta clara: se puede tener esa seguridad por las promesas de la Palabra." },
                ],
              },
              {
                id: "e2",
                narra: "Carla agrega: Es que hay días en que me siento muy lejos de Dios.",
                pregunta: "¿Qué le explicas?",
                opciones: [
                  { texto: "Que su seguridad no está en lo que siente, sino en lo fiel que es Cristo.", valor: 2, explica: "Tu seguridad no está en lo fuerte que te sientes, sino en lo fiel que es Cristo." },
                  { texto: "Que eso le pasa a todos los creyentes, y que pronto se le va a pasar.", valor: 1, explica: "Animarla es bueno, pero conviene mostrarle que la seguridad descansa en Cristo y no en los sentimientos." },
                  { texto: "Que, si se siente lejos, es porque Dios ya dejó de amarla como la amaba antes.", valor: 0, explica: "Nada creado nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro." },
                ],
              },
              {
                id: "e3",
                narra: "Al final, Carla te pide un versículo para recordar en esos días.",
                pregunta: "¿Cuál le das?",
                opciones: [
                  { texto: "Romanos 8:39: nada creado nos podrá separar del amor de Dios en Cristo.", valor: 2, explica: "La seguridad del creyente descansa en el amor de Dios, del que nada creado nos puede separar." },
                  { texto: "Uno que hable del gozo del Señor, para que pueda volver a sentirlo pronto.", valor: 1, explica: "El gozo es bueno, pero la seguridad descansa en Cristo y no en los sentimientos." },
                  { texto: "Ninguno: que mejor espere a sentir algo antes de volver a leer la Biblia.", valor: 0, explica: "Se puede tener la seguridad de la vida eterna por las promesas de la Palabra: conviene leerlas." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a3",
        objetivo: 1,
        pieza: "verdad",
        versiones: [
          {
            consigna: "Sobre la seguridad y la firmeza del creyente: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "La seguridad del creyente descansa en Cristo y no en los sentimientos.", verdad: true, explica: "Así lo dice la lección: la seguridad descansa en Cristo y no en los sentimientos.", apoyo: "la seguridad descansa en Cristo y no en los sentimientos" },
              { texto: "La seguridad del creyente sube y baja según lo que siente cada día.", verdad: false, explica: "Tu seguridad no está en lo fuerte que te sientes, sino en lo fiel que es Cristo.", apoyo: "Tu seguridad no está en lo fuerte que te sientes, sino en lo fiel que es Cristo" },
              { texto: "La Biblia llama a cada creyente a permanecer firme.", verdad: true, explica: "2 Pedro 1:10 dice: «procurad hacer firme vuestra vocación y elección».", apoyo: "la Biblia llama a cada creyente a permanecer firme", ref: "2 Pedro 1:10" },
            ],
          },
          {
            consigna: "Sobre lo que pide 2 Pedro 1:10 y en qué descansa la seguridad: ¿es verdad o es un error?",
            afirmaciones: [
              { texto: "2 Pedro 1:10 dice: «procurad hacer firme vuestra vocación y elección».", verdad: true, explica: "Con ese texto, la Biblia llama a cada creyente a permanecer firme.", apoyo: "«procurad hacer firme vuestra vocación y elección»", ref: "2 Pedro 1:10" },
              { texto: "Permanecer firme es tarea solo de los pastores y los líderes.", verdad: false, explica: "La Biblia llama a cada creyente a permanecer firme.", apoyo: "la Biblia llama a cada creyente a permanecer firme" },
              { texto: "Lo que uno siente es la base de su seguridad delante de Dios.", verdad: false, explica: "La seguridad descansa en Cristo y no en los sentimientos.", apoyo: "la seguridad descansa en Cristo y no en los sentimientos" },
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
            consigna: "Según 2 Pedro 1:10, ¿qué debe procurar cada creyente con su vocación y elección? Toca las palabras que lo dicen.",
            texto: "procurad [[hacer firme]] vuestra vocación y elección",
            apoyo: "la Biblia llama a cada creyente a permanecer firme: «procurad hacer firme vuestra vocación y elección»",
            ref: "2 Pedro 1:10",
            explica: "La Biblia llama a cada creyente a permanecer firme: «procurad hacer firme vuestra vocación y elección».",
          },
          {
            consigna: "¿Qué dos cosas pide 2 Pedro 1:10 hacer firmes? Toca las palabras que lo dicen.",
            texto: "procurad hacer firme vuestra [[vocación]] y [[elección]]",
            apoyo: "la Biblia llama a cada creyente a permanecer firme",
            ref: "2 Pedro 1:10",
            explica: "2 Pedro 1:10 dice: «procurad hacer firme vuestra vocación y elección». Así la Biblia llama a cada creyente a permanecer firme.",
          },
        ],
      },
      {
        id: "a5",
        objetivo: 2,
        pieza: "completa",
        versiones: [
          {
            consigna: "Completa lo que pasará en la venida de Cristo.",
            texto: "En la venida de Cristo el creyente recibirá un [[cuerpo]] glorioso y será [[libre]] del [[pecado]] para siempre.",
            distractores: ["castigo", "esclavo", "gozo"],
            errores: {
              castigo: "En la venida de Cristo el creyente recibirá un cuerpo glorioso.",
              esclavo: "En la glorificación el creyente será libre del pecado para siempre.",
              gozo: "Será libre del pecado para siempre.",
            },
            apoyo: "En la venida de Cristo el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre",
            ref: "Romanos 8:29-30",
            explica: "La salvación termina en la glorificación: en la venida de Cristo el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre.",
          },
          {
            consigna: "Completa cómo termina la salvación.",
            texto: "La salvación termina en la glorificación, cuando seremos [[conformes]] a la [[imagen]] del [[Hijo]].",
            distractores: ["ajenos", "sombra", "mundo"],
            errores: {
              ajenos: "Seremos hechos conformes a la imagen del Hijo.",
              sombra: "La lección dice que seremos hechos conformes «a la imagen de su Hijo».",
              mundo: "La meta de la glorificación es la imagen del Hijo.",
            },
            apoyo: "La salvación termina en la glorificación, cuando seremos conformes a la imagen del Hijo",
            ref: "Romanos 8:29-30",
            explica: "La salvación termina en la glorificación: «a los que justificó, a éstos también glorificó», y el creyente será hecho conforme «a la imagen de su Hijo».",
          },
        ],
      },
      {
        id: "a6",
        objetivo: 2,
        pieza: "error",
        versiones: [
          {
            consigna: "Una de estas frases sobre la glorificación tiene un error. Tócala.",
            frases: [
              "La salvación termina en la glorificación.",
              "A los que Dios justificó, a éstos también glorificó.",
              "En la venida de Cristo el creyente recibirá un cuerpo glorioso.",
              "En la glorificación el creyente seguirá luchando con el pecado para siempre.",
            ],
            malo: 3,
            correccion: "En la venida de Cristo el creyente será libre del pecado para siempre.",
            apoyo: "En la venida de Cristo el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre",
            ref: "Romanos 8:29-30",
            explica: "La salvación termina en la glorificación: el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre.",
          },
          {
            consigna: "Una de estas frases sobre el final de la salvación tiene un error. Tócala.",
            frases: [
              "La glorificación es el final de la salvación.",
              "El creyente será hecho conforme a la imagen del Hijo.",
              "La glorificación llegará en la venida de Cristo.",
              "En la glorificación el creyente recibirá un cuerpo más débil que el de ahora.",
            ],
            malo: 3,
            correccion: "En la venida de Cristo el creyente recibirá un cuerpo glorioso.",
            apoyo: "La salvación termina en la glorificación: «a los que justificó, a éstos también glorificó»",
            ref: "Romanos 8:29-30",
            explica: "En la venida de Cristo el creyente recibirá un cuerpo glorioso y será libre del pecado para siempre, hecho conforme a la imagen del Hijo.",
          },
        ],
      },
      {
        id: "a7",
        objetivo: 0,
        pieza: "explica",
        versiones: [
          {
            apoyo: "La seguridad del creyente descansa en el amor de Dios, del que nada creado nos puede separar, y en las promesas de su Palabra",
            ref: "Romanos 8:38-39",
            clave: {
              id: "pr-n4-sistematica-3-6-a7-1",
              tipo: "corta",
              pregunta: "¿En qué descansa la seguridad de la salvación, según Romanos 8:38-39 y el artículo 6 de la declaración de fe?",
              ideas: [
                { id: "amor", peso: 50, texto: "En el amor de Dios, del que nada creado nos puede separar.", formas: ["amor de dios", "su amor", "amor del padre", "nada (creado|nos|podra|puede)", "ninguna (otra|cosa)", "separar*", "ni la muerte"] },
                { id: "promesas", peso: 50, texto: "Y en las promesas de su Palabra: se puede tener la seguridad de la vida eterna.", formas: ["promesa*", "su palabra", "la palabra", "la biblia", "vida eterna"] },
              ],
              errores: [
                { id: "sentir", texto: "La seguridad descansa en Cristo y no en los sentimientos.", formas: ["(descansa|depende|esta) en (lo|los|mis|sus|tus|nuestros) (sentimientos|emociones)", "(descansa|depende) de (lo|los|mis|sus|tus|nuestros) (sentimientos|emociones)", "(descansa|depende) de lo que (siente*|sentimos)", "(descansa|depende) en lo que (siente*|sentimos)"], anula: "amor" },
              ],
              modelo: "Descansa en el amor de Dios, del que nada creado nos puede separar: ni la muerte, ni la vida, ni ángeles. Y en las promesas de su Palabra, por las que se puede tener la seguridad de la vida eterna.",
            },
          },
          {
            apoyo: "¿Cómo acompañarías a un hermano que duda de su salvación?",
            ref: "Romanos 8:38-39",
            clave: {
              id: "pr-n4-sistematica-3-6-a7-2",
              tipo: "corta",
              pregunta: "¿Cómo acompañarías a un hermano que duda de su salvación?",
              ideas: [
                { id: "cristo", peso: 50, texto: "Mostrándole que su seguridad descansa en Cristo y no en los sentimientos: no en lo fuerte que se siente, sino en lo fiel que es Cristo.", formas: ["fiel que es (cristo|dios)", "fidelidad de (cristo|dios)", "(cristo|dios) es fiel", "descansa en (cristo|dios)", "no en (los|sus|lo) (sentimientos|siente*|emociones)", "no en lo que (siente*|sentimos)", "no (depende|esta) (en|de) (lo|los|sus) (sentimientos|emociones)", "no (depende|esta) (en|de) lo que (siente*|sentimos)"] },
                { id: "promesas", peso: 50, texto: "Y llevándolo a las promesas de la Palabra, como Romanos 8:38-39: nada creado nos podrá separar del amor de Dios.", formas: ["promesa*", "la palabra", "romanos 8", "amor de dios", "separar*", "la biblia", "vida eterna"] },
              ],
              errores: [
                { id: "sentir", texto: "La seguridad descansa en Cristo y no en los sentimientos.", formas: ["(descansa|depende|esta) en (lo|los|mis|sus|tus|nuestros) (sentimientos|emociones)", "(descansa|depende) de (lo|los|mis|sus|tus|nuestros) (sentimientos|emociones)", "(descansa|depende) de lo que (siente*|sentimos)", "(descansa|depende) en lo que (siente*|sentimos)"], anula: "cristo" },
              ],
              modelo: "Lo escucharía y le mostraría que su seguridad descansa en Cristo y no en los sentimientos: no en lo fuerte que se siente, sino en lo fiel que es Cristo. Y leería con él las promesas de la Palabra, como Romanos 8:38-39.",
            },
          },
        ],
      },
    ],
  },
};
